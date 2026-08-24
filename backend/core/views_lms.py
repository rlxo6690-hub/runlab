"""LMS(교육 커리큘럼) — /lms/.

★복구 한계: 스크랩본에는 **로그인 게이트만** 있다. 유효한 교육 코드로 로그인한 뒤 서버가
렌더하던 강의 뷰어(사이드바 트리·모듈 콘텐츠·진도)는 캡처되지 못했다(코드가 없어 못 긁음).
따라서 여기서는 **코드 인증(백엔드)** 까지 복구하고, 인증 성공 시 세션에 교육 코드를 심는다.
로그인 후 뷰어 UI는 6단계(UI 재디자인)에서 커리큘럼 데이터(TrainingSession.modules /
Course.modules)를 근거로 새로 구성한다 — 이건 스크랩 복원이 아니라 재설계다.
"""
import os
import re
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt
from .models import TrainingSession


@csrf_exempt
def lms(request):
    if request.method == "POST":
        code = (request.POST.get("code") or "").strip().upper()
        sess = TrainingSession.objects.filter(code=code).first()
        if sess:
            request.session["lms_code"] = code
            return HttpResponseRedirect("/lms/")
        # 실패 → 게이트 다시 렌더(에러 표시는 프론트 쿼리로)
        return HttpResponseRedirect("/lms/?err=1")

    # GET
    if request.GET.get("logout"):
        request.session.pop("lms_code", None)
        return HttpResponseRedirect("/lms/")
    authed = request.session.get("lms_code")
    sess = TrainingSession.objects.filter(code=authed).first() if authed else None
    if sess:
        return HttpResponse(_render_viewer(sess), content_type="text/html; charset=utf-8")
    # 미인증 → 로그인 게이트(스크랩본 그대로)
    html = os.path.join(settings.SITE_DIR, "lms", "index.html")
    return HttpResponse(open(html, encoding="utf-8").read(), content_type="text/html; charset=utf-8")


def _render_viewer(sess):
    """세션 커리큘럼(modules)으로 강의 뷰어를 렌더. 원본 뷰어가 스크랩에 없어 재구성한 것.
    모듈 필드: title·content·pdfUrl·pdfName·attachments·examples·tools (관리자 편집기 규격)."""
    import html as _h
    import json as _j
    mods = sess.modules or []
    # 사이드바
    nav = "".join(
        f"<button class='m' onclick='pick({i})'>{_h.escape(m.get('title') or f'모듈 {i+1}')}</button>"
        for i, m in enumerate(mods)) or "<div class='empty'>등록된 커리큘럼이 없습니다</div>"
    data = _j.dumps([{
        "title": m.get("title", ""), "content": m.get("content", ""),
        "pdfUrl": m.get("pdfUrl", ""), "pdfName": m.get("pdfName", ""),
        "attachments": m.get("attachments", []), "examples": m.get("examples", []),
        "tools": m.get("tools", []),
    } for m in mods], ensure_ascii=False)
    return f"""<!doctype html><html lang=ko><head><meta charset=utf-8>
<meta name=viewport content="width=device-width,initial-scale=1">
<title>{_h.escape(sess.name)} · RunLab LMS</title>
<style>
:root{{--bg:#0f172a;--side:#1e293b;--card:#fff;--accent:#2563eb;--text:#1e293b;--dim:#64748b}}
*{{box-sizing:border-box;margin:0;padding:0}}
body{{font-family:'Noto Sans KR',system-ui,sans-serif;display:flex;min-height:100vh;color:var(--text)}}
.side{{width:280px;background:var(--side);color:#e2e8f0;padding:20px 12px;overflow-y:auto}}
.side h1{{font-size:14px;color:#93c5fd;margin-bottom:4px}}
.side .code{{font-size:11px;color:#64748b;margin-bottom:20px;font-family:monospace}}
.m{{display:block;width:100%;text-align:left;background:none;border:none;color:#cbd5e1;
   padding:11px 12px;border-radius:8px;cursor:pointer;font-size:13px;margin-bottom:2px}}
.m:hover,.m.on{{background:rgba(37,99,235,.25);color:#fff}}
.empty{{color:#64748b;font-size:12px;padding:12px}}
main{{flex:1;background:#f8fafc;padding:40px;overflow-y:auto}}
.content{{max-width:760px;margin:0 auto;background:var(--card);border-radius:14px;padding:36px;
   box-shadow:0 4px 20px rgba(0,0,0,.06);line-height:1.8}}
.content h2{{margin-bottom:18px}}
.pill{{display:inline-block;background:#eff6ff;color:var(--accent);border-radius:6px;
   padding:6px 12px;font-size:13px;margin:4px 6px 4px 0;text-decoration:none}}
</style></head><body>
<nav class=side><h1>{_h.escape(sess.name)}</h1><div class=code>CODE {_h.escape(sess.code)}</div>{nav}
<a href='/lms/?logout=1' class=m style='margin-top:20px;color:#64748b'>로그아웃</a></nav>
<main><div class=content id=view><h2>모듈을 선택하세요</h2><p style='color:var(--dim)'>왼쪽에서 학습할 모듈을 고르면 여기에 표시됩니다.</p></div></main>
<script>
const MODS={data};
function esc(s){{return String(s||'').replace(/[&<>]/g,c=>({{'&':'&amp;','<':'&lt;','>':'&gt;'}}[c]))}}
function pick(i){{
  document.querySelectorAll('.m').forEach((b,j)=>b.classList.toggle('on',j===i));
  const m=MODS[i];let h='<h2>'+esc(m.title)+'</h2>';
  if(m.content)h+='<div>'+esc(m.content).replace(/\\n/g,'<br>')+'</div>';
  if(m.pdfUrl)h+='<p><a class=pill href="'+esc(m.pdfUrl)+'" target=_blank>📄 '+esc(m.pdfName||'PDF 자료')+'</a></p>';
  (m.attachments||[]).forEach(a=>h+='<a class=pill href="'+esc(a.url)+'" target=_blank>📎 '+esc(a.name||'첨부')+'</a>');
  (m.tools||[]).forEach(t=>{{const id=typeof t==='string'?t:(t.id||t.url||'');h+='<a class=pill href="'+esc(id)+'" target=_blank>🛠 실습도구</a>';}});
  (m.examples||[]).forEach(x=>h+='<p class=pill>💡 '+esc(typeof x==='string'?x:(x.title||''))+'</p>');
  document.getElementById('view').innerHTML=h;
}}
</script></body></html>"""
