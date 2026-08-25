"""원본 dataforge.ai.kr 공개 API에서 받아둔 프롬프트 라이브러리를 DB에 시딩. 멱등.

원본 서버가 살아있어 공개 API(prompt_lib.php?action=all)로 데이터를 꺼내 seed에 저장해뒀다.
카테고리·프롬프트 원래 id를 그대로 보존한다(category_id 참조 유지).
"""
import json
import os
from django.core.management.base import BaseCommand
from django.conf import settings
from core.models import PromptCategory, Prompt

SEED = os.path.join(settings.BASE_DIR, "core", "seed", "prompt_lib.json")


class Command(BaseCommand):
    help = "프롬프트 라이브러리 복구 시딩 (원본 API에서 받아둔 것)"

    def handle(self, *a, **k):
        if not os.path.exists(SEED):
            self.stdout.write("prompt_lib.json 없음, 건너뜀")
            return
        d = json.load(open(SEED, encoding="utf-8"))
        for c in d.get("categories", []):
            PromptCategory.objects.update_or_create(id=c["id"], defaults={
                "name": c.get("name", ""), "icon": c.get("icon", ""),
                "description": c.get("description", ""), "sort_order": c.get("sort_order") or 0})
        for it in d.get("items", []):
            Prompt.objects.update_or_create(id=it["id"], defaults={
                "category_id": it.get("category_id"), "title": it.get("title", ""),
                "content": it.get("content", ""), "description": it.get("description", ""),
                "difficulty": it.get("difficulty", "") or "",
                "is_featured": bool(it.get("is_featured")), "sort_order": it.get("sort_order") or 0})
        self.stdout.write(f"프롬프트 시딩: 카테고리 {PromptCategory.objects.count()} · 프롬프트 {Prompt.objects.count()}")
