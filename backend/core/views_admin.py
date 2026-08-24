"""관리자 백엔드 — admin/index.html(BASE_URL='/mfg')가 부르는 /mfg/api/* 쓰기·관리 엔드포인트.

계약: docs/inventory/guide-and-backend.md. 인증은 세션(is_admin). 원본은 X-CSRF-Token을
실었으나 스크랩본의 CSRF_TOKEN이 빈 문자열 → 우리 서버에선 세션 쿠키가 실제 인증이고
CSRF 헤더는 무시(csrf_exempt). 쓰기 관례: POST + FormData(_method + payload Blob).
"""
import os
import uuid
from datetime import date
from django.conf import settings
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .apiutil import read_request, ok, err, admin_required
from .models import (Review, Feedback, PromptCategory, Prompt, TrafficLog,
                     TrainingSession, Course, ContentItem, DriveItem, ShortURL)


def _list(arr):
    return JsonResponse(arr, safe=False)


# ─────────────────────────── 프롬프트 CRUD(관리자측) ───────────────────────────
@csrf_exempt
def prompt_lib_write(request):
    """POST JSON {action:...} — 카테고리·프롬프트 CRUD. GET은 공개뷰가 처리."""
    if not request.session.get("is_admin"):
        return err("관리자 인증이 필요합니다", status=403)
    _, data = read_request(request)
    action = data.get("action")
    if action == "add_category":
        c = PromptCategory.objects.create(
            name=data.get("name", ""), icon=data.get("icon", ""),
            description=data.get("description", ""), sort_order=int(data.get("sort_order") or 0))
        return ok(id=c.id)
    if action == "delete_category":
        PromptCategory.objects.filter(id=data.get("id")).delete()
        return ok()
    if action in ("add_prompt", "update_prompt"):
        fields = dict(category_id=data.get("category_id"), title=data.get("title", ""),
                      content=data.get("content", ""), description=data.get("description", ""),
                      difficulty=data.get("difficulty", ""),
                      is_featured=bool(data.get("is_featured")),
                      sort_order=int(data.get("sort_order") or 0))
        if action == "update_prompt":
            Prompt.objects.filter(id=data.get("id")).update(**fields)
            return ok()
        p = Prompt.objects.create(**fields)
        return ok(id=p.id)
    if action == "delete_prompt":
        Prompt.objects.filter(id=data.get("id")).delete()
        return ok()
    return err("알 수 없는 action")


# ─────────────────────────── 교육 세션 ───────────────────────────
def _session_json(s):
    return {"id": s.id, "name": s.name, "code": s.code,
            "startDate": s.start_date.isoformat() if s.start_date else None,
            "endDate": s.end_date.isoformat() if s.end_date else None,
            "headcount": s.headcount, "createdAt": s.created_at.isoformat(),
            "modules": s.modules or []}


@csrf_exempt
@admin_required
def sessions(request):
    if request.method == "GET":
        return _list([_session_json(s) for s in TrainingSession.objects.all()])
    method, data = read_request(request)
    if method == "POST":  # 생성
        s = TrainingSession.objects.create(
            name=data.get("name", ""), code=get_random_string(6).upper(),
            start_date=data.get("startDate") or None, end_date=data.get("endDate") or None,
            headcount=int(data.get("headcount") or 0))
        return ok(id=s.id, code=s.code)
    if method == "PERIOD":  # 기간 연장
        TrainingSession.objects.filter(id=data.get("id")).update(
            start_date=data.get("startDate") or None, end_date=data.get("endDate") or None)
        return ok()
    if method == "PUT":  # 커리큘럼 저장
        TrainingSession.objects.filter(id=data.get("id")).update(modules=data.get("modules") or [])
        return ok()
    if method == "DELETE":
        TrainingSession.objects.filter(id=data.get("id")).delete()
        return ok()
    return err("지원하지 않는 요청")


# ─────────────────────────── 과정(1 JSON = 1 과정) ───────────────────────────
@csrf_exempt
@admin_required
def courses(request):
    cid = request.GET.get("id")
    if request.method == "GET" and cid:
        try:
            c = Course.objects.get(id=cid)
        except Course.DoesNotExist:
            return err("과정을 찾을 수 없습니다")
        return ok(course={"id": c.id, "name": c.name, "modules": c.modules or []})
    if request.method == "GET":
        return _list([{"id": c.id, "name": c.name} for c in Course.objects.all()])
    method, data = read_request(request)
    if method in ("PUT", "POST", "PATCH"):
        if data.get("id"):
            Course.objects.filter(id=data["id"]).update(
                name=data.get("name", ""), modules=data.get("modules") or [])
            return ok(id=data["id"])
        c = Course.objects.create(name=data.get("name", ""), modules=data.get("modules") or [])
        return ok(id=c.id)
    if method == "DELETE":
        Course.objects.filter(id=data.get("id")).delete()
        return ok()
    return err("지원하지 않는 요청")


# ─────────────────────────── 컨텐츠 라이브러리 ───────────────────────────
@csrf_exempt
@admin_required
def content_lib(request):
    if request.method == "GET":
        return _list([{"id": it.id, "category": it.category, "title": it.title,
                       "body": it.body, "examples": it.examples,
                       "attachments": it.attachments} for it in ContentItem.objects.all()])
    method, data = read_request(request)
    if method == "PATCH":
        items = data.get("items") or []
        mode = data.get("mode")
        if mode != "append":  # 전체 교체
            ContentItem.objects.all().delete()
        for it in items:
            ContentItem.objects.create(
                category=it.get("category", ""), title=it.get("title", ""),
                body=it.get("body", ""), examples=it.get("examples") or [],
                attachments=it.get("attachments") or [])
        return ok(count=len(items), total=ContentItem.objects.count())
    return err("지원하지 않는 요청")


# ─────────────────────────── 실습도구 카탈로그(읽기) ───────────────────────────
def hub_tools(request):
    """커리큘럼 편집기가 붙일 실습 도구 목록. site/hub_tools.json 있으면 그걸, 없으면 빈 목록."""
    import json
    path = os.path.join(settings.SITE_DIR, "hub_tools.json")
    if os.path.exists(path):
        try:
            return _list(json.load(open(path, encoding="utf-8")))
        except (ValueError, OSError):
            pass
    return _list([])


# ─────────────────────────── 자료실(드라이브) ───────────────────────────
@csrf_exempt
@admin_required
def drive(request):
    if request.method == "GET":
        items = [{"id": d.id, "category": d.category, "title": d.title, "url": d.url}
                 for d in DriveItem.objects.all()]
        cats = sorted({d.category for d in DriveItem.objects.all() if d.category})
        return ok(items=items, categories=cats, site=request.build_absolute_uri("/").rstrip("/"))
    method, data = read_request(request)
    if method in ("POST", "PUT"):
        if data.get("id"):
            DriveItem.objects.filter(id=data["id"]).update(
                category=data.get("category", ""), title=data.get("title", ""), url=data.get("url", ""))
            return ok(id=data["id"])
        d = DriveItem.objects.create(category=data.get("category", ""),
                                     title=data.get("title", ""), url=data.get("url", ""))
        return ok(id=d.id)
    if method == "DELETE":
        DriveItem.objects.filter(id=data.get("id")).delete()
        return ok()
    return err("지원하지 않는 요청")


# ─────────────────────────── 단축 URL ───────────────────────────
@csrf_exempt
@admin_required
def short_url(request):
    if request.method == "GET":
        return _list([{"id": s.id, "code": s.code, "target": s.target, "hits": s.hits}
                      for s in ShortURL.objects.all()])
    method, data = read_request(request)
    if method in ("POST", "PUT"):
        code = (data.get("code") or get_random_string(5)).strip()
        s, _created = ShortURL.objects.update_or_create(
            code=code, defaults={"target": data.get("target", "")})
        return ok(id=s.id, code=s.code)
    if method == "DELETE":
        ShortURL.objects.filter(id=data.get("id")).delete()
        return ok()
    return err("지원하지 않는 요청")


# ─────────────────────────── 파일/PDF 업로드 ───────────────────────────
def _save_upload(f):
    ext = os.path.splitext(f.name)[1][:10]
    name = f"{uuid.uuid4().hex}{ext}"
    updir = os.path.join(settings.MEDIA_ROOT, "uploads")
    os.makedirs(updir, exist_ok=True)
    with open(os.path.join(updir, name), "wb") as out:
        for chunk in f.chunks():
            out.write(chunk)
    return name


@csrf_exempt
@admin_required
def upload_file(request):
    f = request.FILES.get("file")
    if not f:
        return err("파일이 없습니다")
    name = _save_upload(f)
    url = settings.MEDIA_URL + "uploads/" + name
    return ok(url=url, name=f.name, size=f.size, type=f.content_type or "")


@csrf_exempt
@admin_required
def upload_pdf(request):
    f = request.FILES.get("pdf")
    if not f:
        return err("PDF가 없습니다")
    if not (f.content_type == "application/pdf" or f.name.lower().endswith(".pdf")):
        return err("PDF 파일만 업로드할 수 있습니다")
    name = _save_upload(f)
    return ok(url=settings.MEDIA_URL + "uploads/" + name, name=f.name)


# ─────────────────────────── 트래픽 집계(관리자) ───────────────────────────
@admin_required
def traffic_stats(request):
    from django.db.models import Count
    today = timezone.localdate()
    qs = TrafficLog.objects
    daily = {}
    for row in (qs.values("day").annotate(v=Count("id"), u=Count("visitor", distinct=True))
                  .order_by("-day")[:30]):
        daily[row["day"].isoformat()] = {"date": row["day"].isoformat(),
                                         "visits": row["v"], "unique": row["u"]}

    def span(days):
        from datetime import timedelta
        start = today - timedelta(days=days)
        s = qs.filter(day__gte=start)
        return s.count(), s.values("visitor").distinct().count()

    tv, tu = span(0)
    wv, _ = span(6)
    mv, _ = span(29)
    return ok(totals={"today_visits": tv, "today_unique": tu,
                      "week_visits": wv, "month_visits": mv},
              daily=list(daily.values()))
