"""프론트 서빙 — 재디자인(redesign/) 우선, 없으면 원본(site/).

원본 nginx는 /sim/ml 같은 확장자 없는 주소를 썼다. 긁을 때는 /sim/ml.html 로 저장했으므로
파일이 없으면 .html 을 붙여 찾는다. /api/, /mfg/api/ 등 백엔드 경로는 urls.py가 먼저
가로챈다. 재디자인은 redesign/에 점진 반영 — 재구성한 페이지는 즉시 라이브, 나머지는 원본으로
그대로 동작(롤아웃 중 아무것도 안 깨짐).
"""
import os
import posixpath
from django.conf import settings
from django.http import FileResponse, HttpResponseNotFound
from django.views.static import serve as static_serve

SITE = settings.SITE_DIR
REDESIGN = getattr(settings, "REDESIGN_DIR", None)
# 우선순위: redesign/ 먼저, 그다음 site/
ROOTS = [r for r in (REDESIGN, SITE) if r and os.path.isdir(r)]


def _resolve(path):
    """path에 대응하는 실제 파일 경로를 ROOTS 우선순위로 찾는다. (root, relpath) 반환."""
    for root in ROOTS:
        full = os.path.join(root, path)
        if path == "" or os.path.isdir(full):
            idx = os.path.join(full, "index.html")
            if os.path.exists(idx):
                return root, os.path.relpath(idx, root)
        if os.path.isfile(full):
            return root, os.path.relpath(full, root)
        if os.path.exists(full + ".html"):  # 깔끔한 URL → .html
            return root, os.path.relpath(full + ".html", root)
    return None, None


def serve_site(request, path=""):
    path = posixpath.normpath(path).lstrip("/")
    root, rel = _resolve(path)
    if root is None:
        return HttpResponseNotFound("Not Found")
    if rel.endswith(".html"):
        return FileResponse(open(os.path.join(root, rel), "rb"),
                            content_type="text/html; charset=utf-8")
    return static_serve(request, rel, document_root=root)
