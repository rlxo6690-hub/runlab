"""공개 백엔드 — /mfg/api/*.

거의 모든 페이지가 로드 때 부르는 것들: traffic_log(방문로그), reviews(후기 티커),
prompt_lib(프롬프트 라이브러리 읽기), feedback(개선의견 제출), login/logout(데모 게이트).
프론트 계약은 docs/inventory/guide-and-backend.md 참조.
"""
import hashlib
from datetime import date
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from .apiutil import read_request, ok, err
from .models import (Review, Feedback, PromptCategory, Prompt, TrafficLog,
                     TrainingSession)


def _visitor_key(request):
    ip = request.META.get("HTTP_X_FORWARDED_FOR", request.META.get("REMOTE_ADDR", "")).split(",")[0].strip()
    ua = request.META.get("HTTP_USER_AGENT", "")
    return hashlib.sha256(f"{ip}|{ua}".encode()).hexdigest()[:64]


@csrf_exempt
def traffic_log(request):
    """POST service=<..>&page=<..>. fire-and-forget, 응답 미사용."""
    if request.method != "POST":
        return err("POST only", status=405)
    service = (request.POST.get("service") or "")[:40]
    page = (request.POST.get("page") or "")[:400]
    if service or page:
        TrafficLog.objects.create(
            service=service, page=page, day=timezone.localdate(),
            visitor=_visitor_key(request),
        )
    return ok()


@csrf_exempt
def reviews(request):
    """GET → 승인된 후기 배열. POST {name,org,text,website} → 미승인 등록."""
    if request.method == "GET":
        items = Review.objects.filter(approved=True)[:100]
        return JsonList([{"text": r.text, "name": r.name, "org": r.org} for r in items])
    method, data = read_request(request)
    if method == "POST":
        if data.get("website"):  # 허니팟 — 봇
            return ok()  # 조용히 성공인 척
        text = (data.get("text") or "").strip()
        name = (data.get("name") or "").strip()
        if len(text) < 2 or not name:
            return err("이름과 후기를 입력해 주세요")
        Review.objects.create(name=name[:100], org=(data.get("org") or "")[:200],
                              text=text, approved=False)
        return ok(msg="등록되었습니다. 검토 후 게시됩니다.")
    return err("지원하지 않는 요청", status=405)


@csrf_exempt
def prompt_lib(request):
    """GET ?action=categories → 카테고리만 / ?action=all → 전체."""
    action = request.GET.get("action", "all")
    cats = [{"id": c.id, "icon": c.icon, "name": c.name,
             "description": c.description, "sort_order": c.sort_order}
            for c in PromptCategory.objects.all()]
    if action == "categories":
        return ok(categories=cats)
    items = [{"id": p.id, "title": p.title, "content": p.content,
              "description": p.description, "category_id": p.category_id,
              "difficulty": p.difficulty, "is_featured": p.is_featured,
              "sort_order": p.sort_order}
             for p in Prompt.objects.select_related("category").all()]
    return ok(categories=cats, items=items)


@csrf_exempt
def feedback(request):
    """POST {text,contact,page,website} → 개선의견 접수."""
    method, data = read_request(request)
    if method != "POST":
        return err("POST only", status=405)
    if data.get("website"):  # 허니팟
        return ok(msg="소중한 의견 감사합니다!")
    text = (data.get("text") or "").strip()
    if len(text) < 10:
        return err("의견을 10자 이상 입력해 주세요")
    Feedback.objects.create(text=text, contact=(data.get("contact") or "")[:200],
                            page=(data.get("page") or "")[:300])
    return ok(msg="소중한 의견 감사합니다!")


@csrf_exempt
def login(request):
    """데모 게이트. mfg는 {code}(교육코드), ads/biz는 {password}."""
    method, data = read_request(request)
    if method != "POST":
        return err("POST only", status=405)
    code = (data.get("code") or "").strip().upper()
    password = (data.get("password") or "").strip()
    if code:
        if TrainingSession.objects.filter(code=code).exists():
            request.session["demo_authed"] = True
            return ok(msg="인증되었습니다")
        return err("유효하지 않은 코드입니다")
    if password:
        from django.conf import settings
        if password == settings.DEMO_PASSWORD:
            request.session["demo_authed"] = True
            return ok(msg="인증되었습니다")
        return err("비밀번호가 올바르지 않습니다")
    return err("코드를 입력해 주세요")


@csrf_exempt
def logout(request):
    request.session.pop("demo_authed", None)
    return ok()


# --- 배열을 그대로 반환해야 하는 응답용(프론트가 배열을 기대) ---
from django.http import JsonResponse
def JsonList(arr):
    return JsonResponse(arr, safe=False)
