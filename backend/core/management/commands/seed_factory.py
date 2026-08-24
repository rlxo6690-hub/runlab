"""긁힌 factory 데이터를 DB에 시딩. 멱등(있으면 갱신)."""
import json, os, re
from django.core.management.base import BaseCommand
from django.conf import settings
from core.models import CatalogItem, NewsItem

SEED = os.path.join(settings.BASE_DIR, "core", "seed")


class Command(BaseCommand):
    help = "factory_lab 카탈로그·뉴스 복구 시딩"

    def handle(self, *a, **k):
        cats = json.load(open(os.path.join(SEED, "factory_catalog.json"), encoding="utf-8"))
        for c in cats:
            CatalogItem.objects.update_or_create(id=c["id"], defaults={
                "name": c["name"], "category": c["category"], "maker": c["maker"],
                "price": c["price"], "stock": c["stock"]})
        news = json.load(open(os.path.join(SEED, "factory_news.json"), encoding="utf-8"))
        for n in news:
            v = int(re.sub(r"[^0-9]", "", n.get("views", "")) or 0)
            NewsItem.objects.update_or_create(id=n["id"], defaults={
                "title": n["title"], "category": n["category"], "author": n["author"],
                "date": n["date"], "views": v})
        self.stdout.write(f"catalog {CatalogItem.objects.count()} · news {NewsItem.objects.count()} 시딩 완료")
