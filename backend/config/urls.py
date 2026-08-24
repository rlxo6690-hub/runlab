"""URL 라우팅.

백엔드 경로(.php로 끝나는 원본 주소)를 먼저 잡고, 나머지는 전부 정적 프론트로 보낸다.
프론트 JS가 `/mfg/api/xxx.php` 를 하드코딩해 부르므로 우리도 그 주소 그대로 받는다
(`.php`는 URL 속 글자일 뿐, Python이 처리한다).
"""
from django.urls import path, re_path
from core import views_public as pub
from core import frontend

urlpatterns = [
    # --- 공개 백엔드 /mfg/api/* ---
    path("mfg/api/traffic_log.php", pub.traffic_log),
    path("mfg/api/reviews.php", pub.reviews),
    path("mfg/api/prompt_lib.php", pub.prompt_lib),
    path("mfg/api/feedback.php", pub.feedback),
    path("mfg/api/login.php", pub.login),
    path("mfg/api/logout.php", pub.logout),

    # --- 정적 프론트 (깔끔한 URL) : 맨 마지막 캐치올 ---
    re_path(r"^(?P<path>.*)$", frontend.serve_site),
]
