"""공개 API 슬라이스 회귀 방지 자체검증.

핵심 로직만 지킨다: 방문로그 200, 후기 승인게이트, 허니팟 차단, _method 관례 파싱.
    ../.venv/bin/python manage.py test core
"""
import json
from django.test import TestCase, Client
from .models import Review, Feedback, TrainingSession
from .apiutil import read_request


class PublicApiTests(TestCase):
    def setUp(self):
        self.c = Client()

    def test_traffic_log_ok(self):
        r = self.c.post("/mfg/api/traffic_log.php",
                        {"service": "hub", "page": "/"})
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json()["ok"])

    def test_review_needs_approval_and_honeypot(self):
        # 정상 등록 → 미승인 저장, 공개 GET엔 안 보임
        self.c.post("/mfg/api/reviews.php",
                    data=json.dumps({"name": "김", "text": "좋아요"}),
                    content_type="application/json")
        self.assertEqual(Review.objects.count(), 1)
        self.assertFalse(Review.objects.first().approved)
        self.assertEqual(self.c.get("/mfg/api/reviews.php").json(), [])
        # 승인하면 공개 GET에 노출
        Review.objects.update(approved=True)
        self.assertEqual(len(self.c.get("/mfg/api/reviews.php").json()), 1)
        # 허니팟(website 채워짐) → 저장 안 됨
        self.c.post("/mfg/api/reviews.php",
                    data=json.dumps({"name": "봇", "text": "스팸", "website": "x"}),
                    content_type="application/json")
        self.assertEqual(Review.objects.count(), 1)

    def test_feedback_min_length(self):
        short = self.c.post("/mfg/api/feedback.php",
                            data=json.dumps({"text": "굿"}),
                            content_type="application/json")
        self.assertFalse(short.json()["ok"])
        self.assertEqual(Feedback.objects.count(), 0)

    def test_demo_login_by_code(self):
        TrainingSession.objects.create(name="8월 과정", code="AUG2026")
        bad = self.c.post("/mfg/api/login.php",
                          data=json.dumps({"code": "NOPE"}),
                          content_type="application/json")
        self.assertFalse(bad.json()["ok"])
        good = self.c.post("/mfg/api/login.php",
                           data=json.dumps({"code": "aug2026"}),  # 소문자도 대문자로 정규화
                           content_type="application/json")
        self.assertTrue(good.json()["ok"])

    def test_method_override_convention(self):
        # FormData의 _method 파트가 효과적 메서드를 결정
        from django.test import RequestFactory
        import io
        rf = RequestFactory()
        payload = json.dumps({"id": 7, "modules": ["a"]})
        req = rf.post("/x", {"_method": "PUT", "payload": payload})
        method, data = read_request(req)
        self.assertEqual(method, "PUT")
        self.assertEqual(data["id"], 7)


class AdminApiTests(TestCase):
    def setUp(self):
        self.c = Client()

    def _login_admin(self):
        from django.conf import settings
        r = self.c.post("/mfg/api/login.php",
                        data=json.dumps({"password": settings.ADMIN_PASSWORD}),
                        content_type="application/json")
        self.assertTrue(r.json().get("admin"))

    def test_admin_gate(self):
        # 비로그인은 관리자 API 403
        self.assertEqual(self.c.get("/mfg/api/sessions.php").status_code, 403)

    def test_session_crud_and_curriculum_put(self):
        self._login_admin()
        # 생성
        r = self.c.post("/mfg/api/sessions.php",
                        data=json.dumps({"name": "AX교육", "headcount": 20}),
                        content_type="application/json")
        sid = r.json()["id"]
        self.assertTrue(r.json()["code"])
        # 커리큘럼 저장 — _method=PUT + payload Blob(파일 파트)
        from django.core.files.uploadedfile import SimpleUploadedFile
        payload = SimpleUploadedFile("payload.json",
                                     json.dumps({"id": sid, "modules": [{"t": "1교시"}]}).encode(),
                                     content_type="application/json")
        r2 = self.c.post("/mfg/api/sessions.php", {"_method": "PUT", "payload": payload})
        self.assertTrue(r2.json()["ok"])
        from .models import TrainingSession
        self.assertEqual(TrainingSession.objects.get(id=sid).modules, [{"t": "1교시"}])

    def test_prompt_crud_reflects_in_public_read(self):
        self._login_admin()
        self.c.post("/mfg/api/prompt_lib.php",
                    data=json.dumps({"action": "add_category", "name": "AX", "icon": "🤖"}),
                    content_type="application/json")
        self.c.post("/mfg/api/prompt_lib.php",
                    data=json.dumps({"action": "add_prompt", "category_id": 1,
                                     "title": "자동화", "content": "x"}),
                    content_type="application/json")
        # 공개 읽기에 반영
        pub = Client().get("/mfg/api/prompt_lib.php?action=all").json()
        self.assertEqual(len(pub["categories"]), 1)
        self.assertEqual(len(pub["items"]), 1)

    def test_review_approve_flow(self):
        # 공개 등록 → 관리자 승인 → 공개 노출
        Client().post("/mfg/api/reviews.php",
                      data=json.dumps({"name": "김", "text": "좋아요"}),
                      content_type="application/json")
        self._login_admin()
        allrv = self.c.get("/mfg/api/reviews.php?all=1").json()
        rid = allrv[0]["id"]
        from django.core.files.uploadedfile import SimpleUploadedFile
        payload = SimpleUploadedFile("payload.json",
                                     json.dumps({"id": rid, "approved": True}).encode(),
                                     content_type="application/json")
        self.c.post("/mfg/api/reviews.php", {"_method": "APPROVE", "payload": payload})
        self.assertEqual(len(Client().get("/mfg/api/reviews.php").json()), 1)
