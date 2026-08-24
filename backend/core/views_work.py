"""업무 생산성 프록시 — /work/api/{ocr_proxy,youtube_dl,ppt_pdf_proxy,ppt_proxy}.php.

외부 바이너리에 위임: OCR=tesseract, 유튜브=yt-dlp, PPT변환/폰트=soffice(LibreOffice).
비동기 작업(유튜브)은 스레드 + 인메모리 레지스트리로 처리(단일 서버 교육용이라 충분).
청크 업로드(ppt): upload_id별 청크를 임시폴더에 모아 finalize에서 조립→변환→토큰 다운로드.
"""
import os
import re
import json
import shutil
import tempfile
import threading
import subprocess
import uuid
from django.conf import settings
from django.http import JsonResponse, FileResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt

TMP = os.path.join(tempfile.gettempdir(), "dataforge_work")
os.makedirs(TMP, exist_ok=True)


# ═══════════════════════ OCR ═══════════════════════
@csrf_exempt
def ocr_proxy(request):
    """POST FormData image → {lines:[...], full_text:"..."} | {error}."""
    if request.method != "POST" or "image" not in request.FILES:
        return JsonResponse({"error": "이미지를 업로드해 주세요"})
    if not shutil.which("tesseract"):
        return JsonResponse({"error": "서버에 tesseract가 설치되어 있지 않습니다"})
    img = request.FILES["image"]
    d = tempfile.mkdtemp(dir=TMP)
    try:
        p = os.path.join(d, "in" + os.path.splitext(img.name)[1][:6])
        with open(p, "wb") as f:
            for c in img.chunks():
                f.write(c)
        r = subprocess.run(["tesseract", p, "stdout", "-l", "kor+eng"],
                           capture_output=True, timeout=120)
        text = r.stdout.decode("utf-8", "replace")
        lines = [ln for ln in (l.strip() for l in text.splitlines()) if ln]
        return JsonResponse({"lines": lines, "full_text": text.strip()})
    except subprocess.TimeoutExpired:
        return JsonResponse({"error": "인식 시간이 초과되었습니다"})
    except Exception as e:
        return JsonResponse({"error": str(e)})
    finally:
        shutil.rmtree(d, ignore_errors=True)


# ═══════════════════════ 유튜브 다운로드(비동기 잡) ═══════════════════════
_JOBS = {}          # job_id → {status, percent, speed, eta, size, message, path}
_JOBS_LOCK = threading.Lock()


def _yt_progress(job_id):
    def hook(d):
        with _JOBS_LOCK:
            j = _JOBS.get(job_id)
            if not j:
                return
            if d["status"] == "downloading":
                total = d.get("total_bytes") or d.get("total_bytes_estimate") or 0
                done = d.get("downloaded_bytes") or 0
                j.update(status="processing",
                         percent=(done / total * 100) if total else 0,
                         speed=_fmt_speed(d.get("speed")), eta=_fmt_eta(d.get("eta")))
            elif d["status"] == "finished":
                j["status"] = "merging"
    return hook


def _fmt_speed(s):
    return f"{s/1024/1024:.1f} MB/s" if s else ""


def _fmt_eta(e):
    return f"{int(e)//60}:{int(e)%60:02d}" if e else ""


def _run_ytdl(job_id, url, fmt):
    d = tempfile.mkdtemp(dir=TMP)
    try:
        import yt_dlp
        outtmpl = os.path.join(d, "%(title).80s.%(ext)s")
        opts = {"outtmpl": outtmpl, "progress_hooks": [_yt_progress(job_id)],
                "noplaylist": True, "quiet": True, "no_warnings": True}
        if fmt == "mp3":
            opts.update(format="bestaudio/best",
                        postprocessors=[{"key": "FFmpegExtractAudio", "preferredcodec": "mp3"}])
        elif fmt == "720p":
            opts["format"] = "bestvideo[height<=720]+bestaudio/best[height<=720]"
            opts["merge_output_format"] = "mp4"
        else:  # best
            opts["format"] = "bestvideo+bestaudio/best"
            opts["merge_output_format"] = "mp4"
        with yt_dlp.YoutubeDL(opts) as ydl:
            ydl.download([url])
        files = [os.path.join(d, f) for f in os.listdir(d)]
        path = max(files, key=os.path.getsize) if files else None
        with _JOBS_LOCK:
            _JOBS[job_id].update(status="done", percent=100,
                                 size=os.path.getsize(path) if path else 0, path=path)
    except Exception as e:
        with _JOBS_LOCK:
            _JOBS[job_id].update(status="error", message=str(e))
        shutil.rmtree(d, ignore_errors=True)


@csrf_exempt
def youtube_dl(request):
    action = request.GET.get("action")
    if action == "info":
        url = request.POST.get("url", "")
        if not url:
            return JsonResponse({"error": "URL을 입력해 주세요"})
        try:
            import yt_dlp
            with yt_dlp.YoutubeDL({"quiet": True, "no_warnings": True, "noplaylist": True}) as ydl:
                i = ydl.extract_info(url, download=False)
            has720 = any((f.get("height") or 0) >= 720 for f in i.get("formats", []))
            return JsonResponse({"thumbnail": i.get("thumbnail", ""), "title": i.get("title", ""),
                                 "duration": i.get("duration", 0), "uploader": i.get("uploader", ""),
                                 "view_count": i.get("view_count", 0), "has720": has720})
        except Exception as e:
            return JsonResponse({"error": f"영상 정보를 가져오지 못했습니다: {e}"})
    if action == "start":
        url = request.POST.get("url", ""); fmt = request.POST.get("format", "best")
        if not url:
            return JsonResponse({"error": "URL이 없습니다"})
        job_id = uuid.uuid4().hex
        with _JOBS_LOCK:
            _JOBS[job_id] = {"status": "processing", "percent": 0, "speed": "", "eta": "", "size": 0}
        threading.Thread(target=_run_ytdl, args=(job_id, url, fmt), daemon=True).start()
        return JsonResponse({"job": job_id})
    if action == "status":
        with _JOBS_LOCK:
            j = _JOBS.get(request.GET.get("job", ""))
            if not j:
                return JsonResponse({"status": "error", "message": "작업을 찾을 수 없습니다"})
            return JsonResponse({k: v for k, v in j.items() if k != "path"})
    if action == "fetch":
        with _JOBS_LOCK:
            j = _JOBS.get(request.GET.get("job", ""))
        if not j or j.get("status") != "done" or not j.get("path"):
            return HttpResponseNotFound("파일이 준비되지 않았습니다")
        return FileResponse(open(j["path"], "rb"), as_attachment=True,
                            filename=os.path.basename(j["path"]))
    return JsonResponse({"error": "알 수 없는 action"})


# ═══════════════════════ 청크 업로드 공용 ═══════════════════════
def _save_chunk(request):
    uid = request.POST.get("upload_id", "")
    idx = request.POST.get("chunk_index", "0")
    if not re.fullmatch(r"[A-Za-z0-9_-]+", uid or ""):
        return None
    d = os.path.join(TMP, "up_" + uid)
    os.makedirs(d, exist_ok=True)
    chunk = request.FILES.get("chunk")
    if chunk:
        with open(os.path.join(d, f"{int(idx):06d}.part"), "wb") as f:
            for c in chunk.chunks():
                f.write(c)
    return d


def _assemble(uid, out_path):
    d = os.path.join(TMP, "up_" + uid)
    with open(out_path, "wb") as out:
        for part in sorted(os.listdir(d)):
            if part.endswith(".part"):
                with open(os.path.join(d, part), "rb") as p:
                    shutil.copyfileobj(p, out)
    shutil.rmtree(d, ignore_errors=True)


_TOKENS = {}  # token → result file path


def _soffice(src, outdir, target):
    if not shutil.which("soffice"):
        raise RuntimeError("서버에 LibreOffice(soffice)가 설치되어 있지 않습니다")
    subprocess.run(["soffice", "--headless", "--convert-to", target, "--outdir", outdir, src],
                   capture_output=True, timeout=300, check=True)


# ═══════════════════════ PPT → PDF ═══════════════════════
@csrf_exempt
def ppt_pdf_proxy(request):
    action = request.GET.get("action")
    if action == "fonts":
        fonts = _system_fonts()
        probe = request.GET.get("probe")
        if probe:
            names = probe.split("|")
            resolved = {n: (n if n in fonts else "Liberation Sans") for n in names}
            return JsonResponse({"resolved": resolved, "default": "Liberation Sans"})
        return JsonResponse({"fonts": sorted(fonts), "default": "Liberation Sans"})
    if action == "chunk":
        return JsonResponse({"ok": bool(_save_chunk(request))})
    if action == "finalize":
        return _finalize_convert(request, "pdf")
    if action == "download":
        return _download_token(request)
    return JsonResponse({"error": "알 수 없는 action"})


# ═══════════════════════ PPT 폰트 임베딩 ═══════════════════════
@csrf_exempt
def ppt_proxy(request):
    action = request.GET.get("action")
    if action == "chunk":
        return JsonResponse({"ok": bool(_save_chunk(request))})
    if action == "finalize":
        # 폰트 임베딩 = soffice로 pptx 재저장(EmbedFonts 필터 옵션)
        return _finalize_convert(request, 'pptx:"Impress MS PowerPoint 2007 XML":EmbedFonts', ext="pptx")
    if action == "download":
        return _download_token(request)
    return JsonResponse({"error": "알 수 없는 action"})


def _finalize_convert(request, target, ext="pdf"):
    uid = request.POST.get("upload_id", "")
    fname = request.POST.get("filename", "output.pptx")
    if not re.fullmatch(r"[A-Za-z0-9_-]+", uid or ""):
        return JsonResponse({"error": "잘못된 업로드 ID"}, status=400)
    d = tempfile.mkdtemp(dir=TMP)
    try:
        src = os.path.join(d, "in.pptx")
        _assemble(uid, src)
        _soffice(src, d, target)
        results = [f for f in os.listdir(d) if f.lower().endswith("." + ext) and f != "in.pptx"]
        if not results:
            return JsonResponse({"error": "변환 결과가 없습니다"}, status=500)
        result_path = os.path.join(d, results[0])
        token = uuid.uuid4().hex
        _TOKENS[token] = result_path
        base = os.path.splitext(os.path.basename(fname))[0]
        return JsonResponse({"token": token, "filename": f"{base}.{ext}"})
    except subprocess.CalledProcessError:
        return JsonResponse({"error": "변환에 실패했습니다"}, status=500)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def _download_token(request):
    path = _TOKENS.get(request.GET.get("token", ""))
    if not path or not os.path.exists(path):
        return HttpResponseNotFound("파일을 찾을 수 없습니다")
    return FileResponse(open(path, "rb"), as_attachment=True, filename=os.path.basename(path))


def _system_fonts():
    try:
        r = subprocess.run(["fc-list", ":", "family"], capture_output=True, timeout=10)
        fams = set()
        for line in r.stdout.decode("utf-8", "replace").splitlines():
            for fam in line.split(","):
                fam = fam.strip()
                if fam:
                    fams.add(fam)
        return fams or {"Liberation Sans", "Noto Sans CJK KR"}
    except Exception:
        return {"Liberation Sans", "Noto Sans CJK KR"}
