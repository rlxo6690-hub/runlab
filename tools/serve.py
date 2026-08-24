"""정적 미리보기 서버. 긁은 site/ 를 원본과 같은 '깔끔한 URL'로 서빙한다.

원본은 /sim/ml 처럼 확장자 없는 주소를 쓴다(nginx가 .php/라우팅으로 처리).
긁을 때는 /sim/ml.html 로 저장했으므로, 요청 경로에 파일이 없으면 .html 을 붙여 찾는다.
쿼리스트링 변형(?cat=..)은 원본이 같은 파일을 파라미터로 처리하므로 무시하고 base 파일을 준다.

    python3 tools/serve.py            # http://127.0.0.1:8899
    python3 tools/serve.py 9000       # 포트 지정

백엔드(.php)는 없다 — 그런 요청은 501을 돌려준다. 방문로그 비콘(traffic_log.php)이
501을 받아도 도구는 정상 동작한다(fire-and-forget). 서버 필요 도구(ml/ocr 등)만 여기서 안 돈다.
"""
import os, sys, posixpath, urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "site")
ROOT = os.path.abspath(ROOT)


class H(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        # 쿼리·프래그먼트 제거
        path = urllib.parse.urlsplit(path).path
        path = urllib.parse.unquote(path)
        rel = posixpath.normpath(path).lstrip("/")
        full = os.path.join(ROOT, rel)
        if os.path.isdir(full):
            idx = os.path.join(full, "index.html")
            return idx if os.path.exists(idx) else full
        if not os.path.exists(full):
            if os.path.exists(full + ".html"):
                return full + ".html"
        return full

    def do_GET(self):
        if ".php" in self.path:  # 백엔드 없음 — 조용히 501
            self.send_response(501); self.end_headers()
            self.wfile.write(b"backend not implemented (static preview)")
            return
        return super().do_GET()

    def do_POST(self):
        self.send_response(501); self.end_headers()  # traffic_log 등

    def log_message(self, *a):
        pass  # 조용히


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
    os.chdir(ROOT)
    print(f"serving {ROOT} at http://127.0.0.1:{port}")
    HTTPServer(("127.0.0.1", port), H).serve_forever()
