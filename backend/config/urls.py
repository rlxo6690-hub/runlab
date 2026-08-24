"""URL 라우팅.

백엔드 경로(.php로 끝나는 원본 주소)를 먼저 잡고, 나머지는 전부 정적 프론트로 보낸다.
프론트 JS가 `/mfg/api/xxx.php` 를 하드코딩해 부르므로 우리도 그 주소 그대로 받는다
(`.php`는 URL 속 글자일 뿐, Python이 처리한다). admin(BASE_URL='/mfg')·공개 모두 /mfg/api/*.
"""
from django.conf import settings
from django.urls import path, re_path
from django.views.static import serve as media_serve
from core import views_public as pub
from core import views_admin as adm
from core import views_adminpage as apage
from core import views_stream as strm
from core import views_timeseries as ts
from core import views_text as txt
from core import views_ml as ml
from core import views_work as work
from core import views_lms as lms
from core import views_factory as fac
from core import frontend

urlpatterns = [
    # ── 공개 API (로드 때 호출) ──
    path("mfg/api/traffic_log.php", pub.traffic_log),
    path("mfg/api/reviews.php", pub.reviews),        # GET 공개 / POST는 아래 admin과 경로 겹침→쿼리로 구분
    path("mfg/api/prompt_lib.php", pub.prompt_lib),  # GET 읽기 / POST 관리자 CRUD 위임
    path("mfg/api/feedback.php", pub.feedback),      # 공개 제출
    path("mfg/api/login.php", pub.login),            # 관리자·데모 통합 로그인
    path("mfg/api/logout.php", pub.logout),

    # ── 관리자 API (후기·의견은 공개와 URL 공유 → 위 pub 뷰가 세션으로 분기) ──
    path("mfg/api/sessions.php", adm.sessions),
    path("mfg/api/courses.php", adm.courses),
    path("mfg/api/content_lib.php", adm.content_lib),
    path("mfg/api/hub_tools.php", adm.hub_tools),
    path("mfg/api/drive.php", adm.drive),
    path("mfg/api/short_url.php", adm.short_url),
    path("mfg/api/upload_file.php", adm.upload_file),
    path("mfg/api/upload_pdf.php", adm.upload_pdf),
    path("mfg/api/traffic_stats.php", adm.traffic_stats),

    # ── 제조 스트리밍 데모 ──
    path("mfg/api/stream_state.php", strm.stream_state),
    path("mfg/api/db_write.php", strm.db_write),
    path("factory_lab/sensor/api.php", strm.sensor_api),
    path("factory_lab/catalog/detail.php", fac.catalog_detail),
    path("factory_lab/news/detail.php", fac.news_detail),
    path("factory_lab/maintenance/", fac.maintenance_api),  # ?ajax=1 일 때만 JSON, 아니면 아래 캐치올
    path("factory_lab/crawl_lab.php", fac.crawl_lab),

    # ── ML/계산 프록시 (Python 통합) ──
    path("sim/api/timeseries_calc.php", ts.timeseries_calc),
    path("sim/api/text_proxy.php", txt.text_proxy),
    path("sim/api/ml_proxy.php", ml.ml_proxy),

    # ── work 프록시(외부 바이너리 위임) ──
    path("work/api/ocr_proxy.php", work.ocr_proxy),
    path("work/api/youtube_dl.php", work.youtube_dl),
    path("work/api/ppt_pdf_proxy.php", work.ppt_pdf_proxy),
    path("work/api/ppt_proxy.php", work.ppt_proxy),

    # ── 관리자 페이지(self-router + 로그아웃) ──
    path("admin/", apage.admin_page),
    path("admin", apage.admin_page),

    # ── LMS 교육 코드 게이트(로그인 후 뷰어는 6단계 재설계) ──
    path("lms/", lms.lms),

    # ── 업로드된 미디어 ──
    re_path(r"^media/(?P<path>.*)$", media_serve, {"document_root": settings.MEDIA_ROOT}),

    # ── 정적 프론트 (깔끔한 URL) : 맨 마지막 캐치올 ──
    re_path(r"^(?P<path>.*)$", frontend.serve_site),
]
