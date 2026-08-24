# DataForge 복구 (dataforge.ai.kr)

남기태(태태)의 데이터·AI 실습 교육 플랫폼. 강의 실습 교보재. 서버 원본 소실 →
살아있는 프론트를 전수 회수하고 백엔드를 역설계 중. 콘모아(hoomcha) 복구와 같은 방식.

## 폴더
- `site/`   — 회수한 원본 프론트 245파일(수정 금지, 보존)
- `tools/scrape.py` — 회수 스크립트 (`python3 tools/scrape.py`, 이어받기 지원)
- `docs/00-복원지도.md` — **여기부터 읽기.** 전체 지도 + 백엔드 API 맵 + 재건 순서
- `docs/inventory/*.md` — 섹션별 페이지 전수 명세(sim·work·prep-builder·manage·vibe-ext-hubs·guide-and-backend)
- `docs/_backend-groundtruth.txt` — 백엔드 호출 근거표(전수 grep)
- `manifest.tsv` — 회수한 URL·상태코드 전 기록

## 현재 상태
1. 긁기 완료(78페이지 전부 + 자산) · 크로스체크 완료
2. 인벤토리 완료(도구 71개 + 허브/관리자)
3. 다음: 정적 63개 먼저 세우기 → 백엔드 재구현 → UI 재디자인(맨 마지막)
