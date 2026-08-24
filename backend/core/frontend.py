"""회수한 정적 프론트(site/)를 원본과 같은 '깔끔한 URL'로 서빙.

원본 nginx는 /sim/ml 같은 확장자 없는 주소를 썼다. 긁을 때는 /sim/ml.html 로 저장했으므로
파일이 없으면 .html 을 붙여 찾는다. /api/, /mfg/api/ 등 백엔드 경로는 urls.py가 먼저
가로채므로 여기까지 오지 않는다(여기 오면 정적 파일이 없다는 뜻 → 404).
"""
import os
import posixpath
from django.conf import settings
from django.http import FileResponse, HttpResponseNotFound
from django.views.static import serve as static_serve

SITE = settings.SITE_DIR


def serve_site(request, path=""):
    path = posixpath.normpath(path).lstrip("/")
    full = os.path.join(SITE, path)

    if path == "" or os.path.isdir(full):
        idx = os.path.join(full, "index.html")
        if os.path.exists(idx):
            return FileResponse(open(idx, "rb"), content_type="text/html")

    if os.path.exists(full) and os.path.isfile(full):
        # 정적 파일: django.views.static이 mime·range·조건부 GET을 처리
        rel = os.path.relpath(full, SITE)
        return static_serve(request, rel, document_root=SITE)

    # 확장자 없는 깔끔한 URL → .html
    if os.path.exists(full + ".html"):
        return FileResponse(open(full + ".html", "rb"), content_type="text/html")

    return HttpResponseNotFound("Not Found")
