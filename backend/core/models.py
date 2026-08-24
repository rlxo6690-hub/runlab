"""DataForge 데이터 모델.

스키마는 `docs/inventory/guide-and-backend.md`의 프론트 역설계 계약에서 뽑았다.
잃어버린 원본 DB 스키마는 없으므로, 프론트 JS가 각 필드를 어떻게 읽는지가 유일한 근거다.
필드명은 프론트가 기대하는 JSON 키(camelCase)와 맞추되, 파이썬 관례상 snake_case로 두고
직렬화 시 매핑한다(views에서).
"""
from django.db import models


class Review(models.Model):
    """후기. 공개 제출은 미승인, 관리자가 승인하면 공개 티커에 노출."""
    name = models.CharField(max_length=100)
    org = models.CharField(max_length=200, blank=True)
    text = models.TextField()
    approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class Feedback(models.Model):
    """방문자 개선 의견. 관리자 콘솔에서 읽음 처리."""
    text = models.TextField()
    contact = models.CharField(max_length=200, blank=True)
    page = models.CharField(max_length=300, blank=True)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class PromptCategory(models.Model):
    name = models.CharField(max_length=100)
    icon = models.CharField(max_length=20, blank=True)
    description = models.CharField(max_length=300, blank=True)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]


class Prompt(models.Model):
    category = models.ForeignKey(PromptCategory, on_delete=models.CASCADE, related_name="prompts")
    title = models.CharField(max_length=200)
    content = models.TextField()
    description = models.CharField(max_length=500, blank=True)
    difficulty = models.CharField(max_length=20, blank=True)
    is_featured = models.BooleanField(default=False)
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]


class TrafficLog(models.Model):
    """방문 로그 원장. traffic_stats가 일자별로 집계."""
    service = models.CharField(max_length=40)
    page = models.CharField(max_length=400)
    day = models.DateField()  # 집계 편의를 위해 날짜만 별도 보관
    visitor = models.CharField(max_length=64)  # 쿠키/IP 해시 — unique 집계용
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["day"]), models.Index(fields=["day", "visitor"])]


class TrainingSession(models.Model):
    """교육 세션. code로 수강생(mfg/ads/biz 데모) 로그인 연동."""
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=40, unique=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    headcount = models.IntegerField(default=0)
    modules = models.JSONField(default=list)  # 커리큘럼 모듈 배열
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class Course(models.Model):
    """1 과정 = 1 JSON. 세션 커리큘럼이 여기서 모듈을 승계."""
    name = models.CharField(max_length=200)
    modules = models.JSONField(default=list)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]


class ContentItem(models.Model):
    """실습 컨텐츠 라이브러리 아이템(예제·첨부·카테고리)."""
    category = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=300, blank=True)
    body = models.TextField(blank=True)
    examples = models.JSONField(default=list)
    attachments = models.JSONField(default=list)  # [{url,name,size,type}]
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class DriveItem(models.Model):
    """자료실(드라이브) 링크."""
    category = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=300)
    url = models.URLField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class ShortURL(models.Model):
    code = models.CharField(max_length=30, unique=True)
    target = models.URLField(max_length=1000)
    hits = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]


class StreamState(models.Model):
    """제조 스트리밍 데모의 서버측 공유 상태(싱글턴 id=1).
    관리자가 broadcast → 여기 buffer에 쌓임 → 교육생 뷰어가 poll로 수신."""
    running = models.BooleanField(default=False)
    topic = models.CharField(max_length=80, blank=True)
    rate = models.FloatField(default=1)
    db_enabled = models.BooleanField(default=False)
    config = models.JSONField(default=dict)
    recent_msgs = models.JSONField(default=list)  # [{ts,msg,cls}] 최근 N개
    msg_count = models.IntegerField(default=0)

    @classmethod
    def get(cls):
        obj, _ = cls.objects.get_or_create(id=1)
        return obj


class StreamRow(models.Model):
    """db_write로 적재되는 스트리밍 행. 동적 컬럼이라 payload는 JSON."""
    topic = models.CharField(max_length=80, db_index=True)
    data = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
