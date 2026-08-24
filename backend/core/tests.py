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


class StreamTests(TestCase):
    def test_stream_fanout_and_classification(self):
        admin = Client()
        from django.conf import settings
        admin.post("/mfg/api/login.php",
                   data=json.dumps({"password": settings.ADMIN_PASSWORD}),
                   content_type="application/json")
        admin.post("/mfg/api/stream_state.php",
                   data=json.dumps({"action": "start", "topic": "T", "rate": 1,
                                    "dbEnabled": True, "config": {}}),
                   content_type="application/json")
        rows = [{"timestamp": "1", "process_status": "RUNNING"},
                {"timestamp": "2", "process_status": "ALARM"},
                {"timestamp": "3", "process_status": "WARNING"}]
        admin.post("/mfg/api/stream_state.php",
                   data=json.dumps({"action": "broadcast", "msgs": rows, "msgCount": 3, "topic": "T"}),
                   content_type="application/json")
        admin.post("/mfg/api/db_write.php",
                   data=json.dumps({"topic": "T", "rows": rows}),
                   content_type="application/json")
        # 뷰어(비로그인)도 poll 가능
        viewer = Client()
        d = viewer.get("/mfg/api/stream_state.php").json()
        self.assertTrue(d["running"])
        self.assertEqual(d["msgCount"], 3)
        self.assertEqual([m["cls"] for m in d["recentMsgs"]], ["normal", "err", "warn"])
        from .models import StreamRow
        self.assertEqual(StreamRow.objects.count(), 3)

    def test_sensor_api_shape(self):
        d = Client().get("/factory_lab/sensor/api.php").json()
        self.assertTrue(all({"sensor_code", "value", "status"} <= set(s) for s in d["sensors"]))


class ComputeProxyTests(TestCase):
    """ML/텍스트/시계열 프록시 — 계약 형태 스모크."""
    def test_timeseries_models(self):
        import json
        data = [10, 12, 13, 12, 15, 16, 18, 17, 19, 22, 21, 23]
        for action, params in [("sma", {"window": 3}), ("holt", {"alpha": .3, "beta": .1}),
                               ("ar", {"p": 2})]:
            r = self.client.post("/sim/api/timeseries_calc.php",
                                 data=json.dumps({"action": action, "data": data,
                                                  "params": {**params, "forecast": 3}}),
                                 content_type="application/json").json()
            self.assertTrue(r["ok"], action)
            self.assertEqual(len(r["fitted"]), len(data))
            self.assertEqual(len(r["forecast"]), 3)
            self.assertIn("rmse", r["metrics"])

    def test_text_mining(self):
        r = self.client.post("/sim/api/text_proxy.php", {
            "text": "데이터 분석 좋아요\n머신러닝 데이터 재밌어요",
            "pos_filter": "noun", "min_len": "2", "max_words": "20",
            "include_tfidf": "true", "include_ngram": "true", "include_wordcloud": "false",
        }).json()
        self.assertNotIn("error", r)
        self.assertEqual(r["word_freq"][0], ["데이터", 2])  # 최빈 단어
        self.assertTrue(all(isinstance(k, str) and not k.isascii() or k == "기타"
                            for k in r["pos_distribution"]))  # 라벨 한글화

    def test_ml_kmeans_and_classifier(self):
        import io
        from sklearn.datasets import load_iris
        df = load_iris(as_frame=True).frame
        df.columns = ["a", "b", "c", "d", "target"]
        csv = df.to_csv(index=False)

        def up(name):
            from django.core.files.uploadedfile import SimpleUploadedFile
            return SimpleUploadedFile(f"{name}.csv", csv.encode(), content_type="text/csv")

        km = self.client.post("/sim/api/ml_proxy.php?algo=kmeans",
                              {"train_file": up("train"), "test_file": up("test"),
                               "n_clusters": "3", "scale": "true"}).json()
        self.assertNotIn("error", km)
        self.assertEqual(len(km["cluster_counts"]), 3)
        self.assertIn("silhouette_score", km["train_metrics"])

        rf = self.client.post("/sim/api/ml_proxy.php?algo=rforest",
                              {"train_file": up("train"), "test_file": up("test"),
                               "target": "target", "n_estimators": "20"}).json()
        self.assertNotIn("error", rf)
        self.assertIn("accuracy", rf["test_metrics"])
        self.assertEqual(len(rf["feature_importances"]), 4)


class WorkProxyTests(TestCase):
    def test_ocr_structure(self):
        # 빈 이미지 → 에러 없이 {lines, full_text} 구조
        import io
        try:
            from PIL import Image
        except ImportError:
            return
        buf = io.BytesIO(); Image.new("RGB", (60, 30), "white").save(buf, "PNG")
        from django.core.files.uploadedfile import SimpleUploadedFile
        img = SimpleUploadedFile("t.png", buf.getvalue(), content_type="image/png")
        r = self.client.post("/work/api/ocr_proxy.php", {"image": img}).json()
        self.assertIn("lines", r); self.assertIn("full_text", r)

    def test_youtube_status_missing_job(self):
        r = self.client.get("/work/api/youtube_dl.php?action=status&job=nope").json()
        self.assertEqual(r["status"], "error")

    def test_ppt_chunk_assembly(self):
        # 청크 저장 → 조립이 원본 바이트를 복원하는지 (soffice 없이 로직만)
        from django.core.files.uploadedfile import SimpleUploadedFile
        import os
        from core import views_work as w
        uid = "testchunkasm"
        for i, part in enumerate([b"AAAA", b"BBBB", b"CCCC"]):
            c = SimpleUploadedFile("c", part)
            self.client.post("/work/api/ppt_pdf_proxy.php?action=chunk",
                             {"upload_id": uid, "chunk_index": str(i),
                              "total_chunks": "3", "chunk": c})
        out = os.path.join(w.TMP, "assembled_test.bin")
        w._assemble(uid, out)
        self.assertEqual(open(out, "rb").read(), b"AAAABBBBCCCC")
        os.remove(out)
