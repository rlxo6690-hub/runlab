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
    """공개·관리자 공용(admin RV_API도 같은 /mfg/api/reviews.php).
    - GET ?all=1 (+관리자 세션) → 대기 포함 전체
    - GET → 승인된 후기만
    - POST + 관리자 _method(APPROVE/DELETE) → 승인/삭제
    - POST (일반) → 미승인 등록(허니팟 차단)
    """
    is_admin = request.session.get("is_admin")
    if request.method == "GET":
        if request.GET.get("all") and is_admin:
            return JsonList([{"id": r.id, "name": r.name, "org": r.org, "text": r.text,
                              "approved": r.approved, "createdAt": r.created_at.isoformat()}
                             for r in Review.objects.all()])
        items = Review.objects.filter(approved=True)[:100]
        return JsonList([{"text": r.text, "name": r.name, "org": r.org} for r in items])

    method, data = read_request(request)
    # 관리자 관리 동작
    if is_admin and method in ("APPROVE", "PUT", "PATCH", "DELETE"):
        rid = data.get("id")
        if method == "DELETE":
            Review.objects.filter(id=rid).delete()
        else:
            Review.objects.filter(id=rid).update(approved=bool(data.get("approved", True)))
        return ok()
    # 공개 등록
    if data.get("website"):  # 허니팟 — 봇
        return ok()
    text = (data.get("text") or "").strip()
    name = (data.get("name") or "").strip()
    if len(text) < 2 or not name:
        return err("이름과 후기를 입력해 주세요")
    Review.objects.create(name=name[:100], org=(data.get("org") or "")[:200],
                          text=text, approved=False)
    return ok(msg="등록되었습니다. 검토 후 게시됩니다.")


@csrf_exempt
def prompt_lib(request):
    """GET ?action=categories/all(공개 읽기). POST {action:...}는 관리자 CRUD로 위임."""
    if request.method == "POST":
        from .views_admin import prompt_lib_write
        return prompt_lib_write(request)
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
    """공개·관리자 공용(admin FB_API도 같은 /mfg/api/feedback.php).
    - GET (+관리자) → 의견 목록
    - POST + 관리자 _method(READ/DELETE) → 읽음/삭제
    - POST (일반) {text,contact,page,website} → 개선의견 접수
    """
    is_admin = request.session.get("is_admin")
    if request.method == "GET":
        if not is_admin:
            return err("관리자 인증이 필요합니다", status=403)
        return JsonList([{"id": f.id, "text": f.text, "contact": f.contact, "page": f.page,
                          "read": f.read, "createdAt": f.created_at.isoformat()}
                         for f in Feedback.objects.all()])
    method, data = read_request(request)
    if is_admin and method in ("READ", "PUT", "PATCH", "DELETE"):
        fid = data.get("id")
        if method == "DELETE":
            Feedback.objects.filter(id=fid).delete()
        else:
            Feedback.objects.filter(id=fid).update(read=bool(data.get("read", True)))
        return ok()
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
    """단일 로그인 엔드포인트(/mfg/api/login.php). 세 종류 호출을 한곳에서 받는다:
      - 관리자 콘솔: {password}==ADMIN_PASSWORD → is_admin 세션, {ok,admin:true}
      - ads/biz 데모: {password}==DEMO_PASSWORD → demo 세션
      - mfg 데모: {code}==교육세션코드 → demo 세션
    """
    from django.conf import settings
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
        if password == settings.ADMIN_PASSWORD:
            request.session["is_admin"] = True
            return ok(admin=True, msg="관리자로 로그인했습니다")
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
