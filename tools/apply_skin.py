"""노트북 스킨을 도구 페이지에 입힌다 — site/ 원본을 redesign/으로 복사하며 주입.

각 도구 HTML의 </head> 앞에 (1) IBM Plex Mono 폰트 링크, (2) /assets/df-skin.css 링크를
넣는다. df-skin.css가 도구의 인라인 <style> "뒤"에 오도록 </head> 직전에 붙여
카스케이드에서 이기게 한다. 마크업·JS·인라인 CSS는 그대로 둔다(무손상 재색).

  python3 tools/apply_skin.py            # 전 도구 섹션에 적용
  python3 tools/apply_skin.py sim/ml.html prep/missing.html   # 특정 파일만
"""
import os
import re
import sys
import shutil

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SITE = os.path.join(BASE, "site")
REDES = os.path.join(BASE, "redesign")

INJECT = (
    '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">\n'
    '<link rel="stylesheet" href="/assets/df-skin.css">\n'
)
SECTIONS = ["prep", "sim", "manage", "work", "builder", "vibe", "extension",
            "guide", "factory_lab"]
ROOT_PAGES = ["about.html", "biz.html", "ads.html", "text.html", "sheet.html", "mfg.html",
              "factory_lab.html"]
MARK = "df-skin.css"


def targets(argv):
    if argv:
        return [os.path.join(SITE, a) for a in argv]
    out = [os.path.join(SITE, p) for p in ROOT_PAGES]
    for sec in SECTIONS:
        d = os.path.join(SITE, sec)
        for dp, _, fns in os.walk(d) if os.path.isdir(d) else []:
            out += [os.path.join(dp, f) for f in fns if f.endswith(".html")]
    return out


def apply(src):
    html = open(src, encoding="utf-8").read()
    rel = os.path.relpath(src, SITE)
    dst = os.path.join(REDES, rel)
    if MARK in html:  # 이미 스킨됨
        skinned = html
    elif "</head>" in html:
        skinned = html.replace("</head>", INJECT + "</head>", 1)
    else:  # <head> 없는 페이지 — 맨 앞에
        skinned = INJECT + html
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    open(dst, "w", encoding="utf-8").write(skinned)
    return rel


def main():
    done = [apply(t) for t in targets(sys.argv[1:]) if os.path.exists(t)]
    print(f"스킨 적용 {len(done)}개 → redesign/")
    for r in sorted(done)[:8]:
        print("  ", r)
    if len(done) > 8:
        print(f"   … 외 {len(done)-8}개")


if __name__ == "__main__":
    main()
