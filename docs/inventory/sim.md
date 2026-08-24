# /sim 섹션 인벤토리 — DataForge 데이터분석·ML/DL 시뮬레이터

> 대상: `/Users/user/Desktop/태태/dataforge-복구/site/sim/*.html` (스크랩본, 인라인 JS)
> 작성: 복구용 역설계 인벤토리. 각 페이지는 인라인 `<style>` + 인라인 `<script>`로 자립 동작하는 단일 HTML.

## 섹션 요약

- **총 페이지: 16개** (`__` 쿼리스트링 변형 파일은 `/sim/` 안에 **없음** — `__` 파일들은 사이트 루트/`factory_lab`에만 존재. `/sim/`의 탭·화면 전환은 전부 클라이언트 JS(`location.hash`, `switchTab()` 등)로 처리됨. 예: `/sim/deep#neuron`, `/sim/stat#ttest`는 실제 파일이 아니라 해시 라우팅.)
- **클라이언트 전용: 13개** — aitest, basicstat, chart, deep, geo, gradient, hyperparam, lightgbm, network, neuron, randomforest, stat, xgboost
- **서버 필요: 3개** — ml, text, timeseries (핵심 계산을 FastAPI 백엔드에 PHP 프록시로 위임)
  - 주의: `traffic_log.php`(방문 로그 비콘)는 16개 중 10개가 호출하지만 **기능과 무관한 애널리틱스**라 서버 의존으로 분류하지 않음. 이 비콘이 죽어도 시뮬레이터는 정상 동작.

### 전체 PHP 엔드포인트 (deduped)
| 엔드포인트 | 호출 페이지 | 용도 |
|---|---|---|
| `/mfg/api/traffic_log.php` | aitest, basicstat, chart, deep, geo, ml, network, stat, text, timeseries (10개) | 방문 로그 비콘 (POST `application/x-www-form-urlencoded`, body `service=sim&page=<pathname>`, `sessionStorage` 가드로 세션당 1회). 기능 무관. |
| `/sim/api/ml_proxy.php?algo=<algo>` | ml | FastAPI ML 서버 프록시. train/val/test 파일 업로드 → 학습·평가 → JSON 지표 반환. **핵심 기능.** |
| `/sim/api/text_proxy.php` | text | FastAPI NLP 서버 프록시. 형태소분석(Okt 등)·빈도·TF-IDF·n-gram·워드클라우드 PNG 생성. **핵심 기능.** |
| `/sim/api/timeseries_calc.php` (코드상 상대경로 `api/timeseries_calc.php`) | timeseries | 시계열 모델 계산 서버(SMA/EMA/SES/Holt/Holt-Winters/AR/ACF/PACF/CCF). POST JSON `{action,data,params}`. **ARIMA만 예외적으로 클라이언트 Pyodide로 계산.** |

### 전체 외부 CDN/라이브러리 (deduped)
- **Google Fonts** (`fonts.googleapis.com`, `fonts.gstatic.com`) — Noto Sans KR + Space Mono. 전 페이지.
- **Tailwind Play CDN v3** (`cdn.tailwindcss.com`) — gradient, lightgbm, neuron, randomforest, xgboost
- **Tailwind Browser v4** (`cdn.jsdelivr.net/npm/@tailwindcss/browser@4`) — hyperparam
- **Chart.js** — 버전 혼재: `chart.js`(무버전, 최신) → hyperparam·lightgbm·neuron / `chart.js@4.4.3/dist/chart.umd.min.js` → ml·text / `chart.js@4.4.0/dist/chart.umd.min.js` → timeseries
- **MathJax 3** (`cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js`) — gradient, xgboost
- **Font Awesome 6.4.0** (`cdnjs`) — gradient, lightgbm, neuron, randomforest, xgboost
- **SheetJS / xlsx** — `xlsx 0.18.5`(cdnjs) → stat·geo / `xlsx@0.18.5`(jsdelivr, 동적 로드) → network / `xlsx-latest`(cdn.sheetjs.com) → timeseries
- **PapaParse 5.4.1** (`cdnjs`) — geo
- **PDF.js 3.4.120** (`cdnjs`, worker 포함) — text
- **Leaflet 1.9.4** (css+js, `unpkg`) + **leaflet-image 0.4.0** + **shpjs@latest** (`unpkg`) — geo
- **Pyodide v0.27.0** (`cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js`, 동적 로드, 패키지 `pandas`·`statsmodels`·`scipy`) — timeseries (ARIMA 전용)
- **공유 자산**: `/mfg/js/promo.js` (defer, 프로모 배너 스크립트) — 10개 페이지에서 로드. `/img/mfg.png` 파비콘.

---

## /sim/aitest — AI 활용 역량 진단 테스트 (20문항 퀴즈 → 등급 리포트)
- **기능**:
  - 인트로 폼 화면(SCREEN 1) → 문항 풀이(SCREEN 2) → 결과 리포트(SCREEN 3) 3단 화면 전환.
  - 총 20문항, 4개 카테고리 각 5문항: `AI 기초 개념`·`컨텍스트 & 토큰`·`프롬프트 작성법`·`하이퍼파라미터`.
  - 문항마다 정답 선택 후 즉시 피드백(`q-feedback`), `← 이전` / `다음 →` / `다시 시도` 네비게이션.
  - 결과: 총점·등급(S/A/B/C/D/F letter grade), 카테고리별 점수 카드, 문항 리뷰, 레벨 안내.
- **클라이언트/서버**: `클라이언트 전용`. 문항 데이터·채점·등급 산출 전부 인라인 JS. 서버 호출은 방문 로그 비콘뿐.
- **서버 의존**: `/mfg/api/traffic_log.php` (방문 로그, 기능 무관)
- **외부 CDN/라이브러리**: Google Fonts(Noto Sans KR, Space Mono). `/mfg/js/promo.js`.
- **특이사항**: 라이브러리 0개(폰트 제외)로 완전 자립. `localStorage` 미사용(새로고침 시 초기화). CTA 링크는 `/`(홈)·`https://dataforge.ai.kr/`. 문항/정답이 JS 배열(`cat:'...'`)에 하드코딩 — 그대로 복구 가능.

## /sim/basicstat — 기초 통계 개념 인터랙티브 시뮬레이터 (9개 탭)
- **기능**:
  - `switchTab()`로 9개 개념 탭 전환: ⚖️평균 vs 중앙값, 📏분산·표준편차, 📐정규분포·표준화, 📦사분위수, 🔔분포 모양, 🎯신뢰구간, ⛰️중심극한정리, 🪙큰 수의 법칙, 🎲p-값.
  - 각 탭에 조작 버튼: 이상치 추가, 점 제거, 뭉친/퍼진 데이터, 신뢰수준(90/95/99%), 표본크기(n=1/5/30), 재추출(100~5000회), 리셋 등. 실시간으로 캔버스 그래프·수치 갱신.
- **클라이언트/서버**: `클라이언트 전용`. 난수 생성·통계 계산·캔버스 렌더링 전부 브라우저 JS.
- **서버 의존**: `/mfg/api/traffic_log.php` (방문 로그)
- **외부 CDN/라이브러리**: Google Fonts. `/mfg/js/promo.js`.
- **특이사항**: `location.hash`로 진입 탭 지정 가능(해시 라우팅). 외부 차트 라이브러리 없이 raw canvas로 직접 그림.

## /sim/chart — 차트 유형 가이드 & 인터랙티브 빌더 (3개 탭)
- **기능**:
  - 3개 탭(`showTab`): 📋차트 가이드, 🎨인터랙티브 빌더, 🔄유형 비교.
  - 빌더: 6종 차트 유형 전환(`setBChart`) — 막대/꺾은선/산점도/파이/히스토그램/박스플롯. 샘플 데이터셋(월별 불량률, 제품별 판매량, 온도-불량 관계, 공정 변수 분포 등) 선택 → 캔버스에 렌더.
  - 유형별 언제 어떤 차트를 쓰는지 가이드(비교/추세/관계/구성/분포).
- **클라이언트/서버**: `클라이언트 전용`.
- **서버 의존**: `/mfg/api/traffic_log.php`
- **외부 CDN/라이브러리**: Google Fonts만. **Chart.js 미사용** — 모든 차트를 `<canvas>` 2D `getContext`로 직접 그림(커스텀 렌더러, `builderChart` 상태 변수). `/mfg/js/promo.js`.
- **특이사항**: 외부 차트 라이브러리 의존이 전혀 없어 오프라인 복구가 가장 쉬운 축. 샘플 데이터는 JS 하드코딩.

## /sim/deep — 딥러닝 종합 시뮬레이터 (5개 대단원 + 서브탭, 해시 라우팅)
- **기능**:
  - 상단 5개 대단원 탭(`dpxTab`): 🔵1.뉴런과 퍼셉트론, 🧠2.신경망 구조, 📉3.학습의 원리, 🎛️4.하이퍼파라미터, 🎯5.과적합과 일반화. 이전/다음 단계 네비게이션.
  - 1단원 내부 서브탭(`nxSub`): 🧬뉴런 구조 비교, 📈활성화 함수, 🎚️논리 게이트 실습, 🔗퍼셉트론 시뮬레이터.
  - 조작: 옵티마이저(SGD/Momentum/Adam), 활성화 함수(ReLU/tanh/계단), 학습률(0.0001~1.0), 배치크기(8/32/128), 논리게이트(AND/OR/NAND/XOR), 손실 지형(굴곡 지형), ▶학습 실행/한 스텝/자동 실행/리셋.
- **클라이언트/서버**: `클라이언트 전용`. 순전파·경사하강·시각화 전부 브라우저에서 계산.
- **서버 의존**: `/mfg/api/traffic_log.php`
- **외부 CDN/라이브러리**: Google Fonts만. **Chart.js·MathJax 미사용** — `<canvas>` 21개를 raw 2D + `requestAnimationFrame` 애니메이션으로 직접 렌더.
- **특이사항**: `location.hash`(#neuron 등)로 대단원 진입 지정. 127KB 최대 용량 파일, 애니메이션 루프 다수. 순수 canvas라 라이브러리 복구 부담 없음.

## /sim/geo — 위치/공간 데이터 분석 (Leaflet 지도)
- **기능**:
  - CSV/Excel/Shapefile(.shp) 업로드 → 지도 위 마커/GeoJSON 표시(`🗺️ 지도에 표시`).
  - 레이어 관리(개별 ✕제거/모두 제거), GeoJSON 다운로드(`↓ GeoJSON`), 지도 PNG 캡처(`📷 캡처`).
  - OpenStreetMap 타일 기반 Leaflet 지도.
- **클라이언트/서버**: `클라이언트 전용`. 파싱·지오코딩 없는 좌표 플로팅·공간 표시 전부 브라우저.
- **서버 의존**: `/mfg/api/traffic_log.php`
- **외부 CDN/라이브러리**: Leaflet 1.9.4(css+js, unpkg), leaflet-image 0.4.0(PNG 캡처), shpjs@latest(Shapefile 파싱), PapaParse 5.4.1(CSV), xlsx 0.18.5(Excel), Google Fonts. `/mfg/js/promo.js`.
- **특이사항**: OSM 타일은 외부 네트워크 필요(`openstreetmap.org`). `shpjs@latest`는 버전 미고정 — 복구 시 특정 버전 핀 권장. 지도 저작권 링크 `openstreetmap.org/copyright`.

## /sim/gradient — 경사하강법 개념 애니메이션 ("언덕 굴러 내려가는 공")
- **기능**: 학습률/시작점 등을 조절하며 공이 손실 지형을 굴러 최소점으로 수렴하는 과정을 애니메이션으로 시각화. 수식은 MathJax로 렌더.
- **클라이언트/서버**: `클라이언트 전용`.
- **서버 의존**: `없음` (traffic_log 비콘도 없음 — 완전 오프라인 자립)
- **외부 CDN/라이브러리**: Tailwind Play CDN v3(`cdn.tailwindcss.com`), MathJax 3, Font Awesome 6.4.0, Google Fonts.
- **특이사항**: 방문 로그 비콘 없음. 교육용 단일 개념 데모.

## /sim/hyperparam — 하이퍼파라미터 튜닝 시뮬레이터 (Loss Curve)
- **기능**: 하이퍼파라미터(학습률·에폭 등) 슬라이더 조절 → 손실 곡선(Loss Curve)을 Chart.js로 실시간 갱신. "원리 빠르게 이해하기" 설명 카드.
- **클라이언트/서버**: `클라이언트 전용`.
- **서버 의존**: `없음` (traffic_log 없음)
- **외부 CDN/라이브러리**: Tailwind Browser v4(`@tailwindcss/browser@4`), Chart.js(무버전), Google Fonts.
- **특이사항**: 269줄로 섹션 내 최소 규모. Tailwind가 다른 페이지(v3 play CDN)와 달리 **v4 browser 빌드** — 복구 시 버전 차이 주의.

## /sim/lightgbm — LightGBM 인터랙티브 튜토리얼 (개념 + 결정경계 시뮬레이터)
- **기능**:
  - 개념 설명: 리프 중심(leaf-wise) 트리 성장 vs 레벨 중심 비교, GOSS(그래디언트 기반 단측 샘플링), EFB(배타적 피처 번들링).
  - 단계별 시뮬레이터(`lgxTab('basic')`) + 인터랙티브 가이드(확률·임계값·경계). 하이퍼파라미터 조절 → 결정경계 Chart.js 시각화. FAQ 섹션.
- **클라이언트/서버**: `클라이언트 전용`. (주의: 여기 LightGBM은 **교육용 개념 데모**로 실제 학습 아님. 실데이터 학습은 `/sim/ml`의 lightgbm 탭에서 서버로 처리.)
- **서버 의존**: `없음` (traffic_log 없음)
- **외부 CDN/라이브러리**: Tailwind Play CDN v3, Chart.js(무버전), Font Awesome 6.4.0, Google Fonts.
- **특이사항**: 결정경계·트리 성장은 JS 시뮬레이션(근사 시각화). 상단 nav에서 `/sim/xgboost`, `/sim/randomforest` 등과 상호 링크.

## /sim/ml — 머신러닝 실습 (9개 알고리즘, 실데이터 학습 = 서버)
- **기능**:
  - 9개 알고리즘 탭(`switchAlgo`): 🔵K-Means, 🌿결정 트리, 🟣KNN, 📈선형 회귀, 🔀로지스틱 회귀, 🌲랜덤 포레스트, ⚡XGBoost, 🌗LightGBM, 📊평가지표.
  - 각 알고리즘마다 **두 모드**: (1) `단계별 시뮬레이터`/`인터랙티브 가이드` = 클라이언트 Chart.js 애니메이션(할당→갱신, 한 단계 실행, 수렴까지 실행 등 교육용), (2) **실데이터 실행** = Train/Val/Test 파일 업로드 → 서버 학습·평가.
  - 하이퍼파라미터 조절 UI, 결과 렌더(train/val/test 지표 비교표: accuracy, f1_score, r2_score, rmse, mae, inertia, silhouette_score).
- **클라이언트/서버**: `서버 필요`. 교육용 시각화는 클라이언트지만 **"실행"(실제 학습/추론)은 FastAPI ML 서버 필수**.
- **서버 의존**:
  - `/sim/api/ml_proxy.php?algo=<algo>` — `runAlgo(algo)`(줄 1687~)에서 `FormData`에 `train_file`/`val_file`(옵션)/`test_file` + 하이퍼파라미터(`getParams(algo)`, bool은 'true'/'false' 문자열) 담아 POST. 응답: `{train_metrics, val_metrics, test_metrics, ...}` JSON, 에러 시 `{error}`. UI에 "FastAPI ML 서버에서 분석 중" 표기.
  - `/mfg/api/traffic_log.php` (방문 로그)
- **외부 CDN/라이브러리**: Chart.js 4.4.3(`chart.umd.min.js`), Google Fonts. `/mfg/js/promo.js`.
- **특이사항**: 316KB로 섹션 최대(5425줄). `algoNames`·`getParams`·`renderResults` 등 JS에 알고리즘별 파라미터 스키마가 전부 있어 **서버 API 계약을 이 파일에서 역설계 가능**(알고리즘별 필드명·기대 응답키). `location.hash`로 알고리즘 진입 지정. **백엔드 재구축의 핵심 대상.**

## /sim/network — 네트워크(동시출현) 분석 (그래프 중심성)
- **기능**:
  - 입력 3방식 탭(`switchTab`): 엑셀/CSV 업로드, 직접 입력(붙여넣기), 샘플 데이터. 쉼표/세미콜론 구분 코드 컬럼 자동 감지(예: `G05D,G01S,G08G`).
  - `분석 실행 ▶` → 행별 코드 동시출현으로 엣지(가중치) 생성 → 4종 중심성 계산: 연결(Degree)·매개(Betweenness)·근접(Closeness)·고유벡터(Eigenvector).
  - 캔버스 포스 레이아웃 그래프 렌더, Top-N/최소가중치 필터, 재배치/전체보기, PNG 저장, CSV(노드/엣지리스트) 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. 중심성 계산·레이아웃 전부 JS.
- **서버 의존**: `/mfg/api/traffic_log.php`
- **외부 CDN/라이브러리**: xlsx 0.18.5 — **파일 업로드 시 `ensureXLSX()`로 jsdelivr에서 동적 로드**(`cdn.jsdelivr.net/npm/xlsx@0.18.5`). Google Fonts. `/mfg/js/promo.js`.
- **특이사항**: 라이브러리를 항상 로드하지 않고 파일 파싱 시점에만 지연 로드. 그래프 렌더러(`_vis`)와 상태(`state.nodes/edges/rowStrings`)는 자체 구현. 특허 IPC 코드 네트워크 분석 용도.

## /sim/neuron — 뉴런·퍼셉트론·활성화 함수 시각화
- **기능**: 생물학적 뉴런 영감 설명, 2D 결정경계 시각화, 활성화 함수 선택·실시간 입출력 추적 그래프, 논리 게이트 문제(AND/OR/...), 퍼셉트론 트레이닝·결정경계선 애니메이션.
- **클라이언트/서버**: `클라이언트 전용`.
- **서버 의존**: `없음` (traffic_log 없음)
- **외부 CDN/라이브러리**: Tailwind Play CDN v3, Chart.js(무버전), Font Awesome 6.4.0, Google Fonts.
- **특이사항**: `/sim/deep`의 1단원과 주제 중복(뉴런/퍼셉트론)이나 별도 독립 페이지. 교육용.

## /sim/randomforest — 랜덤포레스트 알고리즘 인터랙티브 가이드
- **기능**: 3단계 개념 시각화 — 1.부트스트랩(배깅), 2.무작위 피처 선택, 3.집단지성(다수결). 동작 원리 요약.
- **클라이언트/서버**: `클라이언트 전용`. (실데이터 학습은 `/sim/ml`의 랜덤포레스트 탭.)
- **서버 의존**: `없음` (traffic_log 없음)
- **외부 CDN/라이브러리**: Tailwind Play CDN v3, Font Awesome 6.4.0, Google Fonts. (Chart.js·MathJax 미로드)
- **특이사항**: 개념 데모 위주. `/sim/xgboost`·`/sim/lightgbm`과 형제 페이지.

## /sim/stat — 통계 분석 시뮬레이터 (5개 분석 탭, 파일 업로드)
- **기능**:
  - 5개 탭(`showTab`): 🔗상관분석(피어슨 r/스피어만 ρ/켄달 τ), 📉회귀분석, 🎯로지스틱 회귀분석, 🔬T-검정(독립/대응표본, `showTTestType`), 🎲가설검정 시뮬레이션.
  - 샘플 데이터셋 다수(광고비→매출, 경험연수→연봉, 온도→불량률, 교육 전/후 성과, 고객이탈, 공정 A vs B 등) 또는 📂내 파일 업로드(xlsx).
  - `분석 실행`/`▶시뮬레이션 실행` → 통계량·산점도·회귀선 캔버스 렌더.
- **클라이언트/서버**: `클라이언트 전용`. 상관·회귀·t-검정·로지스틱 계산 전부 JS.
- **서버 의존**: `/mfg/api/traffic_log.php`
- **외부 CDN/라이브러리**: xlsx 0.18.5(cdnjs, 파일 업로드용), Google Fonts. `/mfg/js/promo.js`.
- **특이사항**: `location.hash`(#ttest 등)로 진입 탭 지정 — 다른 sim 페이지에서 `/sim/stat#ttest`로 링크. 샘플 데이터 하드코딩. 라이브러리는 xlsx 하나뿐.

## /sim/text — 텍스트 전처리·분석 실습 (한국어 NLP = 서버)
- **기능**:
  - 입력 4방식 탭(`switchInputTab`): 엑셀/CSV 업로드, 직접 입력, PDF 업로드, IPC 코드 분석.
  - 형태소분석기 선택(`Okt` 기본/빠름 등), `▶ 분석 실행`.
  - 결과 5개 탭(`switchResTab`): 📊빈도 분석, 🏷️품사 분포, 🔗바이그램, 🔢TF-IDF, ☁️워드클라우드(모양 원/네모/하트, 밝게/다크, PNG/CSV 저장).
- **클라이언트/서버**: `서버 필요`. 파일/PDF 파싱만 클라이언트, **형태소분석·빈도·TF-IDF·n-gram·워드클라우드 이미지 생성은 FastAPI 서버**. 코드 주석 명시: "Pyodide 없이 FastAPI 서버에서 실행되어 빠릅니다"(줄 183) — 여기서 Pyodide는 **쓰지 않는다는** 서술.
- **서버 의존**:
  - `/sim/api/text_proxy.php` — `FormData` POST(줄 619, 813). 분석 요청 + 워드클라우드 이미지 요청 모두 이 엔드포인트. 워드클라우드는 서버가 PNG 반환(실패 시 '워드클라우드 생성 실패').
  - `/mfg/api/traffic_log.php`
- **외부 CDN/라이브러리**: PDF.js 3.4.120(`pdf.min.js` + `pdf.worker.min.js`, cdnjs), Chart.js 4.4.3, Google Fonts. `/mfg/js/promo.js`.
- **특이사항**: PDF 파싱은 클라이언트 pdf.js(`pdfjsLib.getDocument`), 파일 파싱은 xlsx/papa 계열이나 실제 텍스트 분석은 서버 의존. 한국어 형태소분석기(Okt 등)는 서버(KoNLPy/FastAPI) 필요 — **백엔드 재구축 대상.** IPC 코드 분석은 별도 입력 경로.

## /sim/timeseries — 시계열 분석 실습 (7개 예측모델 + ACF/PACF/CCF)
- **기능**:
  - 데이터 입력 탭(`switchDataTab`): 샘플/CSV·XLSX 업로드/직접 입력.
  - 모델 탭(`selectModel`) 7종: SMA(단순 이동평균), EMA(지수가중), SES(단순 지수평활), Holt(이중 지수평활), Holt-Winters(삼중), AR(p)(자기회귀), ARIMA(차분 자기회귀).
  - 상관 분석 탭(`switchCorrTab`): ACF/PACF, CCF. `▶ 계산`/`▶ 분석 실행`.
- **클라이언트/서버**: `서버 필요` (혼합). SMA·EMA·SES·Holt·Holt-Winters·AR·ACF/PACF/CCF는 **서버 계산**. **ARIMA만 클라이언트 Pyodide(statsmodels)로 계산.**
- **서버 의존**:
  - `api/timeseries_calc.php`(→ `/sim/api/timeseries_calc.php`) — POST JSON `{action, data:state.data, params}`(줄 647), `Content-Type: application/json`. 통신 실패 시 "서버 통신 오류".
  - `/mfg/api/traffic_log.php`
- **외부 CDN/라이브러리**: Chart.js 4.4.0, SheetJS xlsx-latest(`cdn.sheetjs.com`), Google Fonts. + **Pyodide v0.27.0**(`cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js`) — `ensurePyodide()`(줄 663)에서 동적 script 삽입 후 `loadPyodide()` → `loadPackage(['pandas','statsmodels','scipy'])`. `/mfg/js/promo.js`.
- **특이사항**: **하이브리드 구조** — 대부분 모델은 PHP 서버 필요하지만 ARIMA는 브라우저에서 pandas/statsmodels/scipy로 직접 계산(최초 1회 Pyodide 초기화 오버레이 "분석 엔진 초기화 중"). 복구 시 timeseries_calc.php 백엔드가 있어야 ARIMA 외 전 모델 동작. `xlsx-latest`는 버전 미고정.
