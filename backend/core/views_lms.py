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
    html = os.path.join(settings.SITE_DIR, "lms", "index.html")
    body = open(html, encoding="utf-8").read()
    authed = request.session.get("lms_code")
    if authed and TrainingSession.objects.filter(code=authed).exists():
        # 인증됨 — 하지만 뷰어 템플릿은 스크랩에 없음. 6단계 재설계 전까지 안내 배너.
        note = ("<div style='position:fixed;top:0;left:0;right:0;z-index:9999;"
                "background:#1e3a5f;color:#fff;padding:14px;text-align:center;"
                "font-family:sans-serif;font-size:14px'>교육 코드 <b>%s</b> 인증됨 · "
                "강의 뷰어는 UI 재설계 단계에서 커리큘럼 데이터로 복원됩니다.</div>" % authed)
        body = re.sub(r"<body([^>]*)>", r"<body\1>" + note, body, count=1)
    return HttpResponse(body, content_type="text/html; charset=utf-8")
