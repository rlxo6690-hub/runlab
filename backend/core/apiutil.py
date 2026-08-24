"""프론트가 쓰는 관례를 서버에서 되받는 공용 헬퍼.

원본 프론트는 mod_security 우회를 위해 쓰기 요청을 이렇게 보낸다(우리가 바꿀 수 없음, 프론트 고정):
  - 진짜 메서드(PUT/DELETE/PERIOD/PATCH…)를 FormData의 `_method` 파트에 담고,
  - 본문 JSON을 `payload` 라는 Blob 파트로 담아 POST 한다.
  - 관리자 쓰기는 헤더 `X-CSRF-Token`을 함께 싣는다.
또는 단순 JSON POST(`Content-Type: application/json`)로 보내는 곳도 있다.
`read_request()`가 이 두 형태를 모두 흡수해서 (효과적 메서드, dict 바디)를 돌려준다.
"""
import json
from functools import wraps
from django.http import JsonResponse


def read_request(request):
    """(effective_method, data:dict) 반환.

    - FormData(_method+payload) → (_method 값 대문자, payload JSON을 파싱한 dict)
    - JSON 본문 → (실제 HTTP 메서드, 파싱한 dict)
    - urlencoded/그 외 → (실제 메서드, request.POST를 dict로)
    파일이 있으면 data['_files']에 request.FILES를 실어 준다.
    """
    ctype = request.content_type or ""
    method = request.method.upper()

    if "multipart/form-data" in ctype:
        override = (request.POST.get("_method") or "").upper()
        if override:
            method = override
        data = {}
        payload = request.POST.get("payload")
        if payload:
            try:
                data = json.loads(payload)
            except (ValueError, TypeError):
                data = {}
        # payload 외의 평범한 폼필드도 합쳐 준다(chunk 업로드 등)
        for k, v in request.POST.items():
            if k not in ("_method", "payload"):
                data.setdefault(k, v)
        if request.FILES:
            data["_files"] = request.FILES
        return method, data

    if "application/json" in ctype:
        try:
            return method, json.loads(request.body or b"{}")
        except (ValueError, TypeError):
            return method, {}

    # urlencoded 또는 빈 본문
    data = {k: v for k, v in request.POST.items()}
    if request.FILES:
        data["_files"] = request.FILES
    return method, data


def ok(**kw):
    kw.setdefault("ok", True)
    return JsonResponse(kw)


def err(msg, status=200, **kw):
    """실패 응답. 프론트는 대개 200 본문의 ok:false를 보므로 기본 status=200."""
    kw.update(ok=False, msg=msg)
    return JsonResponse(kw, status=status)


def admin_required(view):
    """관리자 세션 필요. 아니면 403 {ok:false}."""
    @wraps(view)
    def wrapped(request, *a, **kw):
        if not request.session.get("is_admin"):
            return err("관리자 인증이 필요합니다", status=403)
        return view(request, *a, **kw)
    return wrapped
