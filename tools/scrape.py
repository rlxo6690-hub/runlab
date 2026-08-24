"""dataforge.ai.kr 원본 회수기.

살아있는 사이트를 통째로 내려받아 site/ 아래 원래 경로 그대로 저장한다.
사이트가 내려가면 두 번 다시 못 얻는 자료이므로 이 스크립트의 유일한 목적은 "보존"이다.
가공·정리는 여기서 하지 않는다 — 긁은 건 손대지 않고 원본으로 남긴다.

- sitemap.xml + 홈에서 시작해 내부 링크를 따라간다(같은 도메인만).
- HTML 안에서 참조하는 css/js/img/폰트도 같이 받는다.
- 확장자 없는 경로(/sim/ml)는 디렉터리 충돌을 피해 `ml.html` 로 저장한다.
- 모든 요청 결과를 manifest.tsv 에 남긴다 — 실패한 URL을 나중에 찾을 수 있어야 한다.

    python3 tools/scrape.py            # 이어받기(이미 받은 건 건너뜀)
    python3 tools/scrape.py --fresh    # 처음부터 다시
"""

import os
import re
import sys
import time
import html
import urllib.parse as up
import urllib.request as ur
import urllib.error

ROOT = "https://dataforge.ai.kr"
HOST = "dataforge.ai.kr"
BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
OUT = os.path.join(BASE, "site")
MANIFEST = os.path.join(BASE, "manifest.tsv")
DELAY = 0.25  # 대표님 서버다. 천천히.
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36"

ASSET_RE = re.compile(
    r'(?:href|src)\s*=\s*["\']([^"\'>]+)["\']|url\(\s*["\']?([^)"\']+)["\']?\s*\)',
    re.I,
)
SKIP_EXT = (".zip", ".exe", ".dmg", ".mp4", ".mov", ".crx")


def clean(u):
    """URL 정규화. 같은 페이지를 두 번 받지 않기 위한 것."""
    u = html.unescape(u.strip())
    if not u or u.startswith(("data:", "javascript:", "mailto:", "tel:", "#")):
        return None
    if "${" in u:  # 템플릿 리터럴이 그대로 박힌 링크 — 실제 주소가 아니다
        return None
    u = up.urljoin(ROOT + "/", u)
    p = up.urlsplit(u)
    if p.scheme not in ("http", "https") or p.netloc != HOST:
        return None
    if p.path.lower().endswith(SKIP_EXT):
        return None
    return up.urlunsplit((p.scheme, p.netloc, p.path, p.query, ""))  # 프래그먼트 제거


def local_path(u):
    """URL → 저장 경로. 쿼리는 파일명에 녹여 서로 안 덮어쓰게 한다."""
    p = up.urlsplit(u)
    path = up.unquote(p.path)
    if path.endswith("/") or not path:
        path += "index.html"
    elif "." not in os.path.basename(path):
        path += ".html"  # /sim/ml → /sim/ml.html (디렉터리와 파일 충돌 방지)
    if p.query:
        stem, ext = os.path.splitext(path)
        safe = re.sub(r"[^A-Za-z0-9._=-]", "_", p.query)[:60]
        path = f"{stem}__{safe}{ext}"
    return os.path.join(OUT, path.lstrip("/"))


def fetch(u):
    req = ur.Request(u, headers={"User-Agent": UA, "Accept-Language": "ko,en;q=0.8"})
    with ur.urlopen(req, timeout=45) as r:
        return r.status, r.headers.get("Content-Type", ""), r.read()


def sitemap_urls():
    try:
        _, _, body = fetch(ROOT + "/sitemap.xml")
        return [clean(m) for m in re.findall(r"<loc>([^<]+)</loc>", body.decode("utf-8", "replace"))]
    except Exception as e:
        print(f"  sitemap 못 읽음: {e}")
        return []


def main():
    fresh = "--fresh" in sys.argv
    if fresh and os.path.exists(MANIFEST):
        os.remove(MANIFEST)

    done = {}
    if os.path.exists(MANIFEST):
        for line in open(MANIFEST, encoding="utf-8"):
            parts = line.rstrip("\n").split("\t")
            if len(parts) >= 2:
                done[parts[0]] = parts[1]

    queue = [ROOT + "/"] + [u for u in sitemap_urls() if u]
    seen = set(queue)
    log = open(MANIFEST, "a", encoding="utf-8")
    ok = fail = skip = 0

    while queue:
        u = queue.pop(0)
        dest = local_path(u)

        if u in done and done[u] == "200" and os.path.exists(dest) and not fresh:
            skip += 1
            body = open(dest, "rb").read()
            ctype = "text/html" if dest.endswith(".html") else ""
        else:
            time.sleep(DELAY)
            try:
                status, ctype, body = fetch(u)
            except urllib.error.HTTPError as e:
                status, ctype, body = e.code, "", b""
            except Exception as e:
                print(f"  ✗ {u} — {e}")
                log.write(f"{u}\tERR\t{e}\n")
                log.flush()
                fail += 1
                continue

            log.write(f"{u}\t{status}\t{ctype}\t{len(body)}\n")
            log.flush()
            if status != 200:
                print(f"  ✗ {status} {u}")
                fail += 1
                continue

            os.makedirs(os.path.dirname(dest), exist_ok=True)
            with open(dest, "wb") as f:
                f.write(body)
            ok += 1
            print(f"  ✓ {len(body):>8,}  {u}")

        # HTML 이면 그 안의 링크·자원을 큐에 넣는다
        if "html" in ctype.lower() or dest.endswith(".html"):
            text = body.decode("utf-8", "replace")
            for a, b in ASSET_RE.findall(text):
                nu = clean(a or b)
                if nu and nu not in seen:
                    seen.add(nu)
                    queue.append(nu)

    log.close()
    print(f"\n받음 {ok} · 건너뜀 {skip} · 실패 {fail} · 전체시도 {len(seen)}")
    print(f"저장 위치: {OUT}")
    print(f"기록: {MANIFEST}")


if __name__ == "__main__":
    main()
