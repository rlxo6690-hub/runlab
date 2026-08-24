# /manage 섹션 인벤토리 — 경영·비즈니스 분석 도구

## 섹션 요약

- **총 페이지 수**: 17개 (3c, bep, bizmodel, bmc, dashboard, elasticity, financial, journey, kpi, market, npv, onepager, persona, pest, problem, scenario, swot)
- **클라이언트 전용 17 / 서버 필요 0** — 모든 페이지가 브라우저 안에서 계산·캔버스·내보내기까지 완결된다. 서버를 부르는 유일한 코드는 방문 로그용 `traffic_log.php` 단 하나이며, 이건 분석 통계용 fire-and-forget 비콘이라 죽어도 도구 기능은 정상 동작한다.
- **백엔드 PHP 엔드포인트 (dedup)**: `/mfg/api/traffic_log.php` — 1개뿐.
  - 주의: `bizmodel.html·bmc.html·journey.html·market.html·onepager.html·persona.html` 안에 `bep.php` / `scenario.php` 문자열이 보이는데, 이건 전부 **한글 주석 안의 "스펙 참고" 문구**(예: "bep.php와 동일", "scenario.php와 동일")다. 실제 fetch 대상이 아니다. `grep fetch` 결과에도 traffic_log.php 외에는 없음. [확인]
- **외부 CDN/라이브러리 (dedup)**:
  - Google Fonts CSS — `fonts.googleapis.com` (Noto Sans KR, Space Mono) + preconnect `fonts.gstatic.com` → **전 페이지 공통**
  - Chart.js 4.4.0 — `https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js` → **8개 페이지** (bep, dashboard, elasticity, financial, journey, kpi, npv, scenario)
  - 그 외 외부 라이브러리 없음. jspdf·xlsx·html2canvas **안 씀** — PDF/PNG/엑셀류는 전부 브라우저 네이티브(Canvas `toDataURL`/`toBlob`, `Blob`, `URL.createObjectURL`)로 자체 구현.
  - `chatgpt.com` / `claude.ai` / `gemini.google.com`는 라이브러리가 아니라 "생성한 프롬프트 붙여넣기" 안내용 아웃바운드 링크.

**공통 패턴 (전 페이지 동일)**
- 상단에 `/mfg/api/traffic_log.php`로 방문 비콘 POST (`service=manage&page=<경로>`, `x-www-form-urlencoded`). [확인]
- **내보내기**: 모든 페이지 PNG(캔버스 렌더 후 다운로드) + 마크다운(`.md`, `text/markdown` Blob). 일부는 HTML/SVG/CSV 추가.
- 대부분 "🤖 분석 프롬프트" 모달에서 입력값을 프롬프트 텍스트로 조립 → 복사 → 외부 LLM(ChatGPT/Claude/Gemini)에 붙여넣는 흐름.
- 저장이 있는 페이지는 `localStorage`(키 `df_*_v1`)에 자동 저장/복원. 서버 저장 아님.

---

### /manage/3c  — 3C 분석(고객·경쟁사·자사) 캔버스 + AI 프롬프트 생성기
- **기능**: 고객(Customer)·경쟁사(Competitor)·자사(Company) 3영역에 항목을 자유 입력하는 프레임워크 캔버스.
- "✨ 예시 채우기"로 샘플(동네 로스터리 카페 등) 자동 입력, "🔍 내 작성 내용 검토"로 빈칸/약한 항목 점검, "📝 작성법 템플릿" 안내 제공.
- "🤖 분석 프롬프트" → 입력 내용을 LLM용 프롬프트로 조립 후 복사.
- 계산 로직은 없음(정성 프레임워크). 출력은 캔버스 시각화 + 텍스트.
- **클라이언트/서버**: `클라이언트 전용`. fetch는 traffic_log.php(비콘)뿐, 계산·저장 모두 브라우저 내부. [확인]
- **서버 의존 (있으면)**: 없음 (traffic_log.php 비콘 제외).
- **외부 CDN/라이브러리**: Google Fonts(Noto Sans KR, Space Mono). Chart.js 미사용.
- **특이사항**: localStorage 키 `df_3c_v1` 자동저장. 내보내기 = PNG + 마크다운(.md) + "💾 HTML로 저장"(단독 열람용 HTML Blob). LLM 링크(ChatGPT/Claude/Gemini) 아웃바운드.

### /manage/bep  — 손익분기점(BEP) 시뮬레이터
- **기능**: 판매가·변동비·고정비·(다품목) 항목을 입력하면 공헌이익(기여마진), 공헌이익률, 손익분기 판매량·매출을 계산.
- "+ 항목 추가"로 다품목 구성, 목표이익 반영 필요매출 계산.
- Chart.js로 매출/비용/이익 손익분기 그래프(선형 + 교차점 scatter) 시각화.
- "📝 입력값 준비 / 🔍 결과 해석 / 🤖 분석 프롬프트" 모달 제공.
- **클라이언트/서버**: `클라이언트 전용`. 모든 계산 JS 내부, 서버 호출은 비콘뿐. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (line/scatter).
- **특이사항**: localStorage 저장 없음(휘발성). 내보내기 = PNG + 마크다운. 이 페이지가 다른 도구들 주석에서 "PHP 공통 규격" 레퍼런스로 인용됨.

### /manage/bizmodel  — 비즈니스 모델 도식화(구조도) 빌더
- **기능**: 사업 구조(수익원·제공가치·흐름 등)를 노드/블록으로 도식화하는 캔버스.
- "🧩 BMC에서 초안 불러오기"로 bmc 페이지가 저장한 데이터를 가져와 초안 생성.
- "↺ 템플릿 기본값으로" 리셋.
- 계산 없음. 출력은 벡터/래스터 도식.
- **클라이언트/서버**: `클라이언트 전용`. bep.php/scenario.php 언급은 주석일 뿐, fetch는 비콘뿐. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용.
- **특이사항**: localStorage 키 `df_bizmodel_v1`(자체 저장) + `df_bmc_v1` **읽기**(BMC 연동). 내보내기가 가장 풍부: **마크다운 / HTML / SVG(벡터) / PNG(2배 확대)**.

### /manage/bmc  — 비즈니스 모델 캔버스(9블록)
- **기능**: 오스터왈더 BMC 9개 블록(고객세그먼트·가치제안·채널·고객관계·수익원·핵심자원·핵심활동·핵심파트너·비용구조) 입력 캔버스.
- "✨ 예시 채우기", "🗑 전체 지우기".
- 계산 없음(정성). 출력은 9블록 캔버스.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용.
- **특이사항**: localStorage 키 **`df_bmc_v1`**(이 값이 bizmodel·market·onepager로 넘겨지는 허브 데이터). 내보내기 = 마크다운 + "💾 HTML로 저장" + PNG.

### /manage/dashboard  — 대시보드 빌더(CSV → 차트 위젯)
- **기능**: `.csv/.tsv` 파일을 업로드(브라우저 FileReader 파싱)하거나 샘플 데이터를 불러와 데이터 소스로 사용.
- "+ 위젯 추가"로 위젯 구성: 차트 타입 bar/line/pie/doughnut + 숫자카드/테이블.
- 집계 방식 선택: 합계(sum)·평균(avg)·개수(count)·최대(max)·최소(min).
- 위젯 드래그 정렬(↕), 필터/기간 선택, Chart.js 렌더.
- **클라이언트/서버**: `클라이언트 전용`. CSV는 서버 업로드 아님, 로컬 파싱. 이 페이지는 traffic_log 비콘조차 없음. [확인]
- **서버 의존**: 없음 (fetch 자체가 0건).
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (bar/line/pie/doughnut).
- **특이사항**: localStorage 저장 없음. 내보내기 = **CSV** + PNG. 입력이 파일이라는 점이 이 섹션에서 유일.

### /manage/elasticity  — 가격탄력성 시뮬레이터
- **기능**: 가격·판매량 데이터 행(+ 행 추가)을 입력하면 가격탄력성 계수, 가격 변화에 따른 판매량·매출 변화를 계산.
- 탄력성 곡선/수요곡선을 Chart.js line으로 시각화.
- "📝 입력값 준비 / 🔍 결과 해석 / 🤖 분석 프롬프트" 모달.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (line).
- **특이사항**: localStorage 저장 없음. 내보내기 = PNG + 마크다운. LLM 링크 아웃바운드.

### /manage/financial  — 재무비율 분석 시뮬레이터
- **기능**: 재무제표 항목(자산·부채·자본·매출·이익 등, + 항목 추가) 입력.
- 산출: 유동비율·당좌비율·부채비율(안정성), 영업이익률·순이익률(수익성), ROE·ROA(자본효율).
- "자산·자본 구조" 도넛 차트 + "재무비율 레이더" 차트(Chart.js doughnut/radar).
- "📝 입력값 준비 / 🔍 결과 해석 / 🤖 분석 프롬프트" 모달.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (doughnut, radar).
- **특이사항**: localStorage 저장 없음. 내보내기 = PNG + 마크다운. LLM 링크.

### /manage/journey  — 고객 여정 맵(Customer Journey Map)
- **기능**: 세그먼트·고객 목표를 정하고 "+ 단계 추가"로 여정 단계를 구성(단계명·채널·행동·터치포인트).
- 각 단계의 감정 점수로 **감정 곡선**을 Chart.js line으로 그림. Pain point/기회 표기.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (line, 감정 곡선).
- **특이사항**: localStorage 저장 없음. 내보내기 = PNG + 마크다운.

### /manage/kpi  — KPI 대시보드 설계
- **기능**: KPI 항목(+ 추가)마다 현재값·목표값·가중치를 입력하면 **달성률**을 계산.
- 대시보드 설정 영역에서 지표를 묶어 관리, Chart.js bar로 달성률 시각화.
- "📝 입력값 준비 / 🔍 결과 해석 / 🤖 KPI 설계 프롬프트" 모달.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (bar).
- **특이사항**: localStorage 저장 없음. 내보내기 = PNG + 마크다운. LLM 링크.

### /manage/market  — TAM · SAM · SOM 시장 규모 빌더
- **기능**: 하향식(top-down)·상향식(bottom-up) 두 방식으로 TAM/SAM/SOM 계산.
- 인구·단가·전환율·점유율 등 숫자 필드 입력(예시 자동 채우기 지원)으로 시장 규모 산출.
- "🧩 BMC에서 가져오기"로 bmc 데이터 참조.
- **클라이언트/서버**: `클라이언트 전용`. scenario.php/bep.php 언급은 주석. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용(수치·바 형태는 자체 렌더).
- **특이사항**: localStorage 키 **`df_tamsamsom_v1`**(자체 저장) + `df_bmc_v1` **읽기**. 내보내기 = PNG + 마크다운. "✨ 예시 채우기 / 🗑 전체 지우기".

### /manage/npv  — NPV · IRR 투자 분석 시뮬레이터
- **기능**: 연도별 현금흐름("+ 연도 추가")과 할인율을 입력하면 순현재가치(NPV)·내부수익률(IRR)·수익성지수(PI)·회수기간을 계산.
- "누적 현금흐름" 차트 + "NPV 민감도(할인율)" 차트(Chart.js line/scatter). 낙관/비관 가정.
- "📝 입력값 준비 / 🔍 결과 해석 / 🤖 분석 프롬프트" 모달.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (line, scatter).
- **특이사항**: localStorage 저장 없음. 내보내기 = PNG + 마크다운. LLM 링크.

### /manage/onepager  — 원페이지 아이디어 기획서
- **기능**: 문제·솔루션·시장·수익모델·팀·마일스톤 등 사업 기획 항목을 한 장으로 정리하는 폼(개정 이력 토글 UI 포함).
- "🧩 BMC에서 가져오기"로 bmc 데이터 자동 반영, "✨ 예시 채우기 / 🗑 전체 지우기".
- 계산 없음. 출력은 한 장짜리 기획서 레이아웃.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용.
- **특이사항**: localStorage 키 **`df_onepager_v1`**(자체 저장) + `df_bmc_v1` **읽기**. 내보내기 = PNG + 마크다운.

### /manage/persona  — 페르소나 시뮬레이터
- **기능**: 사용자 페르소나 카드 작성 — 이름·사진(업로드/삭제)·인구통계·목표·가치관 한 줄·태그·니즈(예: 신뢰성/사용 편의성/가성비) 입력.
- "+ 추가"로 다수 페르소나 관리. 사진은 로컬 이미지 → Canvas `toDataURL`로 카드에 삽입.
- 계산 없음. 출력은 페르소나 카드.
- **클라이언트/서버**: `클라이언트 전용`. 사진 업로드도 서버 아님(로컬 dataURL). [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용.
- **특이사항**: localStorage 저장 없음. 내보내기 = PNG(카드 캔버스) + 마크다운. 사진은 `toDataURL`로 인라인 임베드.

### /manage/pest  — PEST 분석(정치·경제·사회·기술)
- **기능**: Political·Economic·Social·Technological 4영역 항목 입력 캔버스.
- "✨ 예시 채우기 / 🔍 내 작성 내용 검토 / 📝 작성법 템플릿 / 🤖 분석 프롬프트".
- 계산 없음(정성 프레임워크).
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용.
- **특이사항**: localStorage 키 `df_pest_v1`. 내보내기 = 마크다운 + "💾 HTML로 저장" + PNG. LLM 링크. (3c/swot/problem과 동일 엔진 계열.)

### /manage/problem  — 문제 분석(현상·원인·목표·액션)
- **기능**: 현상/문제 정의, 목표(As-Is → To-Be), 원인 분류(외부·방법·사람·설비), 액션 아이템을 구조화 입력. 상세 플레이스홀더로 작성 가이드 제공.
- "✨ 예시 채우기 / 🔍 내 작성 내용 검토 / 📝 작성법 템플릿 / 🤖 분석 프롬프트".
- 계산 없음(정성).
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용.
- **특이사항**: localStorage 키 `df_problem_v1`. 내보내기 = 마크다운 + "💾 HTML로 저장" + PNG. LLM 링크.

### /manage/scenario  — 시나리오 분석 시뮬레이터(낙관/기본/비관)
- **기능**: BEP 기반으로 낙관·기본·비관 시나리오 변수를 입력해 공헌이익·손익분기·**안전한계율**·판매량을 시나리오별로 계산.
- "지표 비교" / "BEP·안전한계" 차트(Chart.js bar)로 시나리오 대조.
- "📝 입력값 준비 / 🔍 결과 해석 / 🤖 분석 프롬프트" 모달.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts + **Chart.js 4.4.0** (bar).
- **특이사항**: localStorage 저장 없음. 내보내기 = PNG + 마크다운. 다른 페이지 주석의 "scenario.php 공통 규격" 레퍼런스 원본.

### /manage/swot  — SWOT 분석(강점·약점·기회·위협)
- **기능**: Strengths·Weaknesses·Opportunities·Threats 4사분면 항목 입력 캔버스. (SO/WO/ST/WT 교차전략 도출 안내.)
- "✨ 예시 채우기 / 🔍 내 작성 내용 검토 / 📝 작성법 템플릿 / 🤖 분석 프롬프트".
- 계산 없음(정성).
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts. Chart.js 미사용.
- **특이사항**: localStorage 키 `df_swot_v1`. 내보내기 = 마크다운 + "💾 HTML로 저장" + PNG. LLM 링크. (3c/pest/problem과 동일 엔진 계열.)

---

## 복구 관점 핵심 (한 줄 요약)

**이 섹션은 서버 없이 100% 정적 호스팅으로 복구 가능하다.** 유일한 서버 코드는 방문 통계 비콘 `/mfg/api/traffic_log.php` 하나이고, 이건 없어도 도구가 정상 작동한다(통계만 안 쌓임). 저장은 전부 브라우저 `localStorage`(`df_*_v1` 키)라 서버 DB 재구현 불필요. 유일한 외부 런타임 의존은 Chart.js 4.4.0(CDN, 8개 페이지)과 Google Fonts뿐. df_bmc_v1(BMC 캔버스)이 bizmodel·market·onepager로 넘어가는 브라우저 로컬 연동 관계만 유지하면 된다.
