"""/admin/ 페이지 자체 — 정적 HTML 서빙 + self-router(POST action=...).

admin/index.html은 DB관리(stats/db_setup/truncate)와 외부 오픈API 수집기(ac_*)를
location.pathname(즉 /admin/)으로 POST한다. 이 둘은 제조 스트리밍 DB·수집기에 딸린
기능이라 뒤 슬라이스(스트리밍)에서 채운다. 지금은 콘솔이 하드에러 나지 않게 정중히 응답한다.
로그아웃 /admin/?logout=1 은 여기서 처리.
"""
import os
import re
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def admin_page(request):
    if request.method == "GET":
        if request.GET.get("logout"):
            request.session.pop("is_admin", None)
        html = os.path.join(settings.SITE_DIR, "admin", "index.html")
        if not os.path.exists(html):
            html = os.path.join(settings.SITE_DIR, "admin", "index.php")
        body = open(html, encoding="utf-8").read()
        # 리브랜드: 관리자 콘솔도 RunLab 표기로(원본 site/admin은 그대로 두고 서빙 시 치환)
        import re as _re
        body = _re.sub(r"DATA(<(?:em|span|b|strong)>)FORGE(</(?:em|span|b|strong)>)",
                       lambda m: "RUN" + m.group(1) + "LAB" + m.group(2), body)
        for a, b in (("DATA FORGE", "RUN LAB"), ("DATAFORGE", "RUNLAB"),
                     ("DataForge", "RunLab"), ("dataforge.ai.kr", "runlab.kr")):
            body = body.replace(a, b)
        # 노트북 스킨 주입 (인라인 <style> 뒤에 오도록 </head> 직전)
        skin = ('<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">'
                '<link rel="stylesheet" href="/assets/df-skin.css">')
        if "df-skin.css" not in body and "</head>" in body:
            body = body.replace("</head>", skin + "</head>", 1)
        authed = bool(request.session.get("is_admin"))
        # 원본 PHP가 서버에서 주입하던 값. 세션 로그인 상태를 여기서 주입한다.
        body = re.sub(r"const isAdmin\s*=\s*(true|false)\s*;",
                      f"const isAdmin = {'true' if authed else 'false'};", body, count=1)
        # 원본 PHP는 관리자일 때 로그인 모달을 아예 렌더링하지 않았다. 우리도 제거한다.
        if authed:
            body = re.sub(r'<div class="modal">.*?</div>\s*</div>\s*',
                          "", body, count=1, flags=re.S)
        return HttpResponse(body, content_type="text/html; charset=utf-8")

    # POST — self-router
    if not request.session.get("is_admin"):
        return JsonResponse({"ok": False, "msg": "관리자 인증이 필요합니다"}, status=403)
    action = request.POST.get("action", "")
    if action == "stats":
        from .models import StreamRow
        from django.db.models import Count
        per = {r["topic"]: r["n"] for r in
               StreamRow.objects.values("topic").annotate(n=Count("id"))}
        return JsonResponse({"ok": True, "total": StreamRow.objects.count(), "tables": per})
    if action == "db_setup":
        return JsonResponse({"ok": True, "msg": "준비 완료"})  # 마이그레이션이 테이블 담당
    if action == "truncate":
        from .models import StreamRow
        table = request.POST.get("table", "")
        qs = StreamRow.objects.all() if not table else StreamRow.objects.filter(topic=table)
        n = qs.count(); qs.delete()
        return JsonResponse({"ok": True, "deleted": n})
    if action.startswith("ac_"):
        # 외부 오픈API 수집기 — 스트리밍/수집 슬라이스에서 구현
        return JsonResponse({"ok": True, "total": 0, "pages": 0,
                             "msg": "수집기는 다음 단계에서 활성화됩니다", "data": []})
    return JsonResponse({"ok": False, "msg": f"알 수 없는 action: {action}"})
