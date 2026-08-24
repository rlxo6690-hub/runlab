"""factory_lab 서브포털 — 카탈로그/뉴스 상세 + 크롤러 + 유지보수 AJAX.

★복구 메모: 상세페이지(detail.php)·크롤러(crawl_lab.php) 원본은 소실. 목록에서 복구한
데이터(CatalogItem/NewsItem)로 상세를 재구성하고, 크롤러는 제조 뉴스 RSS를 가져오는 형태로
재건한다. 상세 HTML 템플릿은 스크랩에 없어 기능형으로 새로 그린다(디자인 시스템 롤아웃 때 재스타일).
"""
import html
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound
from django.views.decorators.csrf import csrf_exempt
from .apiutil import admin_required
from .models import CatalogItem, NewsItem


def _page(title, body):
    return HttpResponse(
        f"<!doctype html><meta charset=utf-8><title>{html.escape(title)}</title>"
        "<link rel=stylesheet href='/factory_lab/style.css'>"
        "<div style='max-width:760px;margin:40px auto;padding:0 20px;"
        "font-family:system-ui,-apple-system,sans-serif;line-height:1.7'>"
        f"{body}<p style='margin-top:30px'><a href='javascript:history.back()'>← 뒤로</a></p></div>",
        content_type="text/html; charset=utf-8")


def catalog_detail(request):
    try:
        it = CatalogItem.objects.get(id=request.GET.get("id"))
    except (CatalogItem.DoesNotExist, ValueError):
        return HttpResponseNotFound("장비를 찾을 수 없습니다")
    e = html.escape
    body = (f"<div style='color:#0284c7;font-size:13px'>{e(it.category)}</div>"
            f"<h1>{e(it.name)}</h1>"
            f"<p><b>제조사·모델</b> {e(it.maker)}</p>"
            f"<p><b>가격</b> {e(it.price)}</p>"
            f"<p><b>재고</b> {e(it.stock) or '문의'}</p>"
            f"<p>{e(it.description) or '상세 사양은 문의해 주세요.'}</p>")
    return _page(it.name, body)


def news_detail(request):
    try:
        n = NewsItem.objects.get(id=request.GET.get("id"))
    except (NewsItem.DoesNotExist, ValueError):
        return HttpResponseNotFound("게시글을 찾을 수 없습니다")
    n.views += 1
    n.save(update_fields=["views"])
    e = html.escape
    body = (f"<div style='color:#0284c7;font-size:13px'>{e(n.category)}</div>"
            f"<h1>{e(n.title)}</h1>"
            f"<p style='color:#64748b;font-size:13px'>{e(n.author)} · {e(n.date)} · 조회 {n.views}</p>"
            f"<hr><p>{e(n.body) or (e(n.title) + ' — 상세 본문은 크롤러가 채웁니다.')}</p>"
            + (f"<p><a href='{e(n.source_url)}' target=_blank>원문 보기 →</a></p>" if n.source_url else ""))
    return _page(n.title, body)


def maintenance_api(request):
    """유지보수 페이지: 일반 GET → 정적 HTML, ?ajax=1 → 목록 JSON, ?detail= → 상세 JSON."""
    if not (request.GET.get("ajax") or request.GET.get("detail")):
        import os
        from django.conf import settings
        p = os.path.join(settings.SITE_DIR, "factory_lab", "maintenance", "index.html")
        return HttpResponse(open(p, encoding="utf-8").read(), content_type="text/html; charset=utf-8")
    if request.GET.get("detail"):
        try:
            n = NewsItem.objects.get(id=request.GET.get("detail"))
            return JsonResponse({"ok": True, "id": n.id, "title": n.title, "body": n.body})
        except (NewsItem.DoesNotExist, ValueError):
            return JsonResponse({"ok": False})
    offset = int(request.GET.get("offset") or 0)
    q = request.GET.get("q", "")
    qs = NewsItem.objects.all()
    if q:
        qs = qs.filter(title__icontains=q)
    items = [{"id": n.id, "title": n.title, "category": n.category, "date": n.date}
             for n in qs[offset:offset + 20]]
    return JsonResponse({"items": items, "has_more": qs.count() > offset + 20})


@csrf_exempt
@admin_required
def crawl_lab(request):
    """제조 뉴스 크롤러 재건. POST action=crawl&feed=<rss url> → NewsItem 적재."""
    if request.method != "POST":
        return JsonResponse({"ok": False, "msg": "POST only"})
    feed = request.POST.get("feed", "")
    if not feed:
        return JsonResponse({"ok": False, "msg": "RSS 피드 URL을 입력해 주세요"})
    try:
        import urllib.request as ur
        import defusedxml.ElementTree as ET  # 외부 RSS = 신뢰불가 → XXE/폭탄 방어
        with ur.urlopen(feed, timeout=30) as r:
            root = ET.fromstring(r.read())
        added = 0
        for item in root.iter("item"):
            title = (item.findtext("title") or "").strip()
            link = (item.findtext("link") or "").strip()
            desc = (item.findtext("description") or "").strip()
            date = (item.findtext("pubDate") or "").strip()[:40]
            if title and not NewsItem.objects.filter(title=title).exists():
                NewsItem.objects.create(title=title[:300], category="크롤링", author="RSS",
                                        date=date, body=desc[:2000], source_url=link[:600])
                added += 1
        return JsonResponse({"ok": True, "added": added, "total": NewsItem.objects.count()})
    except Exception as e:
        return JsonResponse({"ok": False, "msg": f"크롤링 실패: {e}"})
