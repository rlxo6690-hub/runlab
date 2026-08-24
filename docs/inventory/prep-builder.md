# DataForge 복구 인벤토리 — `/prep` · `/builder`

> 스크랩본(인라인 JS 포함 self-contained HTML) 17개를 전수 분석한 재구현용 명세.
> 근거 표기: [확인] = 이번에 파일에서 직접 확인 / [짐작] = 코드 정황 기반 추론.

## 섹션 요약

- **총 페이지**: 17개 (`/prep` 8개 + `/builder` 9개). `prompt_lib__cat=...` 같은 쿼리 변형 파일은 **디렉터리에 없음** — `?cat=` 는 같은 `prompt_lib.html`이 URL 파라미터로 처리한다(별도 파일 아님). [확인]
- **클라이언트/서버 구성**:
  - **핵심 기능이 서버를 필요로 하는 페이지: 1개** → `builder/prompt_lib.html` (프롬프트 데이터를 `/mfg/api/prompt_lib.php?action=all`에서 받아옴).
  - **나머지 16개**: 도구 자체는 100% 클라이언트 전용. 공통으로 붙어 있는 `traffic_log.php`(방문 로그)와 `promo.js`(프로모 배너)는 **기능에 필수가 아닌 부가 요소**라 서버 없이도 도구는 동작함.
- **백엔드 `.php` 엔드포인트 (deduped)**:
  1. `/mfg/api/traffic_log.php` — **POST**, 17개 전 페이지. `Content-Type: application/x-www-form-urlencoded`, body=`service=<prep|builder|sim>&page=<pathname>`. 세션당 1회(`sessionStorage` 가드), 응답값 사용 안 함(fire-and-forget 방문 집계). 기능 무관. [확인]
  2. `/mfg/api/prompt_lib.php?action=all` — **GET**, `prompt_lib.html` 전용. JSON 응답 `{ ok:bool, msg, categories:[{id,icon,name}], items:[{title,content,description,category_id}] }`. **유일하게 기능상 필수인 백엔드.** 저장/추가 API는 없음(프롬프트 등록은 "관리자 페이지"에서 한다고 안내 문구만 존재 — 별도 admin 엔드포인트 [짐작]). [확인]
  - 참고: `link.html`에는 단축URL 서버(`short_url.php`)가 **없음** — 링크/허브 페이지를 클라이언트에서 HTML 파일로 만들어 다운로드하는 방식. `defense_*`도 서버 방어처리 아님(순수 프롬프트 텍스트 생성기). [확인]
- **외부 JS 리소스 (기능 무관 공통)**: `/mfg/js/promo.js` (defer, 17개 전 페이지 — 자체 서버 파일).
- **외부 CDN / 라이브러리 (deduped)**:
  - Google Fonts: `fonts.googleapis.com` + `fonts.gstatic.com` (Noto Sans KR, Space Mono / 일부 JetBrains Mono) — 17개 전 페이지.
  - Chart.js — `jsdelivr chart.js@4.4.3` (edit, interpolate, missing, normalize, type_convert) / `chart.js@4.4.0` (chart.html). **버전 혼재 주의.**
  - SheetJS(xlsx) — **소스·버전 혼재**: `cdn.sheetjs.com xlsx-latest`(edit) / `jsdelivr xlsx@0.18.5`(missing, normalize, type_convert) / `cdnjs xlsx 0.18.5`(chart).
  - JSZip — `cdnjs jszip@3.10.1` (edit, split).
  - PapaParse — `cdnjs PapaParse@5.4.1` (chart).
  - Leaflet — `unpkg leaflet@1.9.4` (boundary, location) + `unpkg leaflet-draw@1.0.4` (boundary만).
  - CodeMirror — `cdnjs codemirror@5.65.17` (JS/CSS/XML/htmlmixed 모드 + material-darker 테마) (html.html).
  - OpenStreetMap 타일 `tile.openstreetmap.org` (boundary, location) + **Nominatim** 지오코딩 API `nominatim.openstreetmap.org/search` (location) — 외부 서비스 의존.
  - 외부 링크(의존 아님, 단순 앵커): `chatgpt.com`, `claude.ai`, `gemini.google.com` (prompt, prompt_lib, defense_*), `dataforge.ai.kr`(로고/홈 링크 다수).

---

# /prep

### /prep/edit — CSV 편집 다기능 도구(빈 행 삭제·필터·날짜분리·차분·중복제거)
- **기능**:
  - CSV/XLSX 업로드 후 5개 탭 작업: ① 빈 행 삭제(모든 셀 빈 행 / 하나라도 빈 행 / 특정 컬럼 빈 행), ② 값 필터(다중 조건 AND/OR), ③ 날짜 분리(년·월·일·시·분·초 컬럼 추출, 원본 유지/삭제), ④ 데이터 차분(1·2차, 계절 주기 4/7/12/24/52, ID별 패널 차분, NaN 행 제거), ⑤ 중복 제거.
  - 각 작업 결과를 표로 미리보기.
  - 작업별 "결과 CSV 다운로드" 제공(차분/필터/날짜 등 개별).
- **클라이언트/서버**: `클라이언트 전용`. 근거: 파일 파싱(SheetJS)·가공·Blob 다운로드 전부 인라인 JS. 서버 호출은 `traffic_log.php`(POST, 로그)뿐. [확인]
- **서버 의존 (있으면)**: `/mfg/api/traffic_log.php` (POST, 방문 로그, 기능 무관). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; Chart.js@4.4.3(jsdelivr); SheetJS `cdn.sheetjs.com/xlsx-latest`; JSZip@3.10.1(cdnjs); `/mfg/js/promo.js`.
- **특이사항**: SheetJS를 `xlsx-latest`(버전 미고정)로 부름 — 재현성 위해 고정 버전 권장. ZIP(JSZip)은 다중 결과 묶음 다운로드용. 차분의 계절 주기·패널(ID별) 로직이 핵심 — 누락 주의.

### /prep/interpolate — CSV 결측 보간 + 파일 병합(join) 도구
- **기능**:
  - 결측 보간 탭: 컬럼 선택(전체/결측 컬럼만) 후 8종 방법 — 평균·중앙값·전진(ffill)·후진(bfill)·선형·스플라인·다항식·이동평균.
  - 파일 병합 탭: 두 CSV를 세로 결합(Concat), Inner/Left/Outer Join(키 컬럼 기준).
  - 결과 표 미리보기 + "보간/병합 결과 CSV 다운로드", 전체 화면 보기.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 보간·조인 연산과 CSV 파싱 모두 인라인 JS, 서버 호출은 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; Chart.js@4.4.3(jsdelivr); SheetJS xlsx@0.18.5(jsdelivr); `/mfg/js/promo.js`.
- **특이사항**: 스플라인·다항식·이동평균 보간 알고리즘 구현이 핵심. Join은 키 매칭 로직 재현 필요.

### /prep/missing — 결측치·이상치 학습형 시뮬레이터
- **기능**:
  - 샘플 데이터(제조 센서/기상/판매) 또는 CSV/XLSX 업로드.
  - 결측치 탐지(무작위/연속구간/컬럼집중 패턴 주입) → 보간(평균·중앙값·ffill·bfill·선형·스플라인) → **방법별 RMSE 비교 차트**로 정확도 학습.
  - 이상치 탐지: Z-Score / IQR / 둘 다, 판정 표 + **박스플롯 단계별 학습**(Min·Q1·Median·Q3·Max 요소를 버튼으로 하나씩 추가).
  - "실제 CSV 일괄 보간은 interpolate 도구로" 유도 링크.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 시뮬레이션·차트·통계 전부 브라우저 계산, 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; Chart.js@4.4.3(jsdelivr); SheetJS xlsx@0.18.5(jsdelivr); `/mfg/js/promo.js`. (다운로드/Blob 없음 — 학습용이라 결과 저장 기능 미탑재.)
- **특이사항**: RMSE 비교(현재/최우수/최저 방법)와 박스플롯 단계 애니메이션이 이 페이지의 정체성 — 순수 계산이라 서버 불필요.

### /prep/normalize — 정규화·표준화 시뮬레이터 + CSV 변환/저장
- **기능**:
  - 시뮬레이터 탭: 샘플 분포(기본/치우침/음수포함/넓은범위/센서) 선택, 이상치 ON/OFF, Min-Max·Z-Score·Robust 3종 변환을 시각 비교.
  - CSV 변환·저장 탭: 업로드 CSV에 변환 적용 후 CSV/XLSX로 저장.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 변환 수식·차트·파일 저장 인라인 JS, 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; Chart.js@4.4.3(jsdelivr); SheetJS xlsx@0.18.5(jsdelivr); `/mfg/js/promo.js`.
- **특이사항**: Robust(median/IQR) 표준화 포함 3종 수식 정확도 유지. XLSX 저장에 SheetJS `writeFile` 사용.

### /prep/onehot — 원-핫 인코딩 시뮬레이터 + CSV 변환/저장
- **기능**:
  - 시뮬레이터 탭: 샘플 범주형(색상/날씨/사이즈/등급/지역) 원-핫 인코딩 결과 시각화.
  - CSV 변환·저장 탭: 업로드 CSV의 선택 열 원-핫 인코딩, 원본 열 유지 옵션, **최대 카디널리티 초과 시 건너뜀** 옵션, CSV 저장.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 인코딩·저장 인라인 JS, 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; `/mfg/js/promo.js`. (Chart.js·SheetJS `<script>` 미검출 — CSV 텍스트 직접 생성/Blob 다운로드 방식 [확인].)
- **특이사항**: 카디널리티 상한 건너뛰기 로직이 핵심. XLSX 없이 CSV만 저장.

### /prep/quality_check — 데이터 품질 체크리스트 리포트
- **기능**:
  - CSV 업로드 후 컬럼별 품질 진단 표: 타입, 완전성(결측률), 유효성, 정확성, 결측 수, 이상치 수, 고유값 수.
  - 종합 품질 점수/진단 결과 표시.
  - "보고서 다운로드 (CSV)"로 결과 내보내기.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 프로파일링·리포트 생성·CSV 다운로드 인라인 JS, 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; `/mfg/js/promo.js`. (외부 차트/시트 라이브러리 미검출.)
- **특이사항**: 완전성·유효성·정확성 판정 기준(임계값) 로직을 원본 JS에서 그대로 옮겨야 결과 일치.

### /prep/split — 데이터 분할(Train/Val/Test)
- **기능**:
  - CSV 업로드 후 train/val/test 비율 분할.
  - 층화(stratify) 기준 컬럼 선택(또는 무작위), 셔플 옵션, `_original_index` 열 추가 옵션.
  - 결과를 Train/Val/Test CSV 개별 다운로드 + 전체 ZIP 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 분할·셔플·ZIP 묶음 인라인 JS, 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; JSZip@3.10.1(cdnjs); `/mfg/js/promo.js`.
- **특이사항**: 층화 분할(클래스 비율 유지) 로직과 셔플 시드 처리 확인. ZIP 묶음은 JSZip 의존.

### /prep/type_convert — 타입 변환 + 로그 변환 시뮬레이터
- **기능**:
  - 시뮬레이터 탭: 샘플 분포(소득/지수성장/웹트래픽/센서로그/약물농도)에 로그 변환(ln, log₁₀, log(1+x)) 적용 결과 시각화.
  - CSV 변환·저장 탭: 업로드 CSV에 타입/로그 변환 적용, CSV/XLSX 저장.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 변환·차트·저장 인라인 JS, 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; Chart.js@4.4.3(jsdelivr); SheetJS xlsx@0.18.5(jsdelivr); `/mfg/js/promo.js`.
- **특이사항**: `log(1+x)`(0 포함 안전) 등 변환 수식 세트 유지. XLSX 저장 SheetJS 사용.

---

# /builder

### /builder/boundary — 한국 행정경계 지도 드로잉·GeoJSON 도구
- **기능**:
  - Leaflet 지도에 시도/시군구 행정경계 표시·숨기기, 선택 지역 경계 다운로드.
  - 폴리곤·사각형 직접 드로잉(leaflet-draw), 레이어 이름 지정.
  - GeoJSON 내보내기 / 불러오기, 전체 삭제.
- **클라이언트/서버**: `클라이언트 전용`. 근거: **시도/시군구 경계 GeoJSON이 파일에 인라인 상수로 내장**(`SIDO_DATA`, `SIGUNGU_DATA` FeatureCollection — 파일이 490KB인 이유). 서버 호출은 로그뿐, 지도 타일만 외부 OSM. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`(경계 데이터는 자체 내장).
- **외부 CDN/라이브러리**: Google Fonts; Leaflet@1.9.4 + leaflet-draw@1.0.4(unpkg, CSS+JS); OSM 타일 `tile.openstreetmap.org`; `/mfg/js/promo.js`.
- **특이사항**: 재구현 시 **내장 GeoJSON 상수(`SIDO_DATA`/`SIGUNGU_DATA`)를 반드시 보존** — 서버 없이 이게 데이터 소스. 지도 표시엔 인터넷(OSM 타일) 필요.

### /builder/chart — 맞춤형 차트 시각화 빌더
- **기능**:
  - CSV/XLSX 업로드(PapaParse/SheetJS), X축·다중 Y축 컬럼 선택, 집계(합계/평균/개수/최소/최대).
  - 8종 차트(세로/가로 막대, 선, 영역, 파이, 도넛, 산점도, 레이더).
  - 제목·축 라벨·min/max·간격·글자크기·모서리·포인트/선 곡률·투명도·배경색 등 상세 스타일링.
  - PNG/JPG 이미지로 내보내기.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 파싱·렌더·이미지 export 인라인 JS, 서버는 로그뿐. traffic body가 `service=sim`으로 다름. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그, `service=sim`). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; **Chart.js@4.4.0**(jsdelivr — 다른 prep 페이지의 4.4.3과 버전 다름); PapaParse@5.4.1(cdnjs); SheetJS xlsx 0.18.5(cdnjs); `/mfg/js/promo.js`.
- **특이사항**: 이미지 저장은 canvas `toDataURL` 기반(Blob 아님). Chart.js 버전(4.4.0) 고정 필요.

### /builder/defense_image — 방위산업 이미지 프롬프트 생성기
- **기능**:
  - 항목 체크박스 조합으로 방산 이미지 프롬프트(예: 정찰 드론/장갑차/레이더) 자동 조립.
  - 언어 토글(한글/English), 출력 포맷(한 줄형/블록형).
  - 프리셋 3종, 커스텀 입력, 프롬프트 복사 / TXT 저장 / 전체 초기화.
  - 선택·커스텀·언어·포맷을 localStorage에 저장(재방문 복원).
- **클라이언트/서버**: `클라이언트 전용`. 근거: 프롬프트 텍스트 조립·복사·TXT 저장 전부 인라인 JS + localStorage. **"방어처리"는 서버 이미지 처리가 아니라 방위(defense)산업용 프롬프트 텍스트 생성기**임. 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; `/mfg/js/promo.js`.
- **특이사항**: 상태 저장 키 `STORE`(localStorage) — `{sel, custom, lang, fmt}`. TXT는 Blob 다운로드.

### /builder/defense_video — 방위산업 영상 프롬프트 생성기
- **기능**:
  - 항목 조합으로 방산 영상 프롬프트(무인 정찰 드론/무인지상차량/지휘통제센터 등) 조립.
  - 언어 토글(한글/English), 섹션 모두 접기/펼치기, 프리셋, 커스텀.
  - 프롬프트 복사 / TXT 저장 / 전체 초기화, localStorage 저장.
- **클라이언트/서버**: `클라이언트 전용`. 근거: image판과 동일 구조(텍스트 조립+localStorage+Blob), 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; `/mfg/js/promo.js`.
- **특이사항**: 저장 키 `STORE` = `{sel, custom, lang}`(image판과 달리 fmt 없음). 영상용 항목 세트가 다름.

### /builder/html — 인라인 편집형 HTML 빌더
- **기능**:
  - HTML 업로드 → 미리보기에서 텍스트/링크/이미지 직접 편집: 링크 주소 지정·해제, 이미지 경로 교체 또는 파일 내장(base64), alt 지정.
  - 글자 색·배경색·크기·굵기(5단계)·줄간격·정렬(좌/중/우) 스타일 편집.
  - 반응형 미리보기(전체/태블릿/모바일), 새로고침, 새 탭 열기, 코드 보기(CodeMirror), 편집본 HTML 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. 근거: DOM 편집·이미지 base64 내장·다운로드 인라인 JS, 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; CodeMirror@5.65.17(cdnjs — codemirror.min, htmlmixed/xml/css/javascript 모드, material-darker 테마); `/mfg/js/promo.js`.
- **특이사항**: 이미지 "파일로 교체(HTML에 내장)" = base64 data URI 임베드 → 단일 HTML 자립. CodeMirror 4개 모드+테마 CSS 모두 필요.

### /builder/link — 링크/허브 페이지 빌더 (서버 단축URL 아님)
- **기능**:
  - 여러 링크(파일)를 카드로 모아 "허브 페이지"를 구성: 페이지 제목·부제, 카드 열 수(2/3/4), 카드별 아이콘·제목·설명·색상, 순서 이동(▲▼)·삭제.
  - 단일 파일 저장 또는 허브 전체를 **완성된 HTML 파일로 다운로드**(Blob).
- **클라이언트/서버**: `클라이언트 전용`. 근거: 허브 HTML을 클라이언트에서 문자열로 생성해 Blob 다운로드. **단축URL/`short_url.php` 서버 호출 없음** — 태스크 힌트와 달리 실제 파일엔 그런 API가 없다. 서버는 로그뿐. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts; `/mfg/js/promo.js`.
- **특이사항**: 생성 HTML에 `escHtml`/`escAttr` 이스케이프 사용. 결과물은 자립형 정적 HTML(허브 페이지) — 배포는 사용자가 별도로.

### /builder/location — 위치 좌표 추출 빌더 (외부 지오코딩 의존)
- **기능**:
  - 주소 검색(Nominatim) 또는 구글맵 URL에서 좌표 추출, 지도 클릭으로도 좌표 지정(Leaflet).
  - 위도/경도/`위도,경도`/쉼표형식 개별 복사, 목록에 저장.
  - 저장 목록을 CSV/JSON 내보내기, 전체 삭제. 목록은 localStorage(`df_locations`) 보관.
- **클라이언트/서버**: `클라이언트 전용`(단, 외부 지오코딩 API 의존). 근거: 검색 결과 파싱·좌표 처리·저장·export 인라인 JS. DataForge 자체 서버는 로그뿐이나, **주소 검색은 외부 `nominatim.openstreetmap.org` 필요**. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그). 자체 백엔드는 `없음`. **외부 의존: Nominatim 지오코딩 API + OSM 타일**.
- **외부 CDN/라이브러리**: Google Fonts; Leaflet@1.9.4(unpkg); OSM 타일 `tile.openstreetmap.org`; Nominatim `nominatim.openstreetmap.org/search?...&format=json`(Accept-Language: ko,en); `/mfg/js/promo.js`.
- **특이사항**: 주소 검색은 인터넷·Nominatim 정책(rate limit) 의존 — 오프라인 재구현 시 지도 클릭/구글맵 URL 파싱만 동작. 저장 키 `df_locations`.

### /builder/prompt — 프롬프트 작성 학습/빌더 (오프라인)
- **기능**:
  - "나쁜 vs 좋은" 비교 예시, 프롬프트 빌더 폼: 시스템 프롬프트·역할·대상 독자·작업 지시·출력 형식(불릿/번호/표/산문/JSON)·분량 제한·어조·제외 조건·추가 맥락.
  - 예시 프리셋(이메일/보고서/사업분석/콘텐츠/코드/데이터분석/번역 등), CoT·Few-shot·시스템 프롬프트 패턴.
  - 조립 결과 클립보드 복사, ChatGPT/Claude/Gemini 열기 링크.
- **클라이언트/서버**: `클라이언트 전용`. 근거: 폼→문자열 조립·복사 전부 인라인 JS. localStorage/다운로드/서버 저장 없음(traffic만, `service=sim`). [확인]
- **서버 의존**: `/mfg/api/traffic_log.php` (POST 로그, `service=sim`). 그 외 `없음`.
- **외부 CDN/라이브러리**: Google Fonts(Space Mono, JetBrains Mono, Noto Sans KR); 앵커 링크 chatgpt.com/claude.ai/gemini.google.com; `/mfg/js/promo.js`.
- **특이사항**: `prompt_lib.html`의 빌더 탭과 폼 구조가 거의 동일(공유 UI). 이쪽은 서버 데이터 없이 순수 빌더.

### /builder/prompt_lib — 프롬프트 모음(서버 데이터) + 프롬프트 빌더 ★유일 서버필수
- **기능**:
  - "프롬프트 모음" 탭: `prompt_lib.php`에서 카테고리·아이템을 받아 카드 그리드로 렌더, 카테고리 탭 필터·검색, 카드별 복사. URL `?cat=<id>`로 특정 카테고리 진입 지원.
  - "프롬프트 빌더" 탭: prompt.html과 동일한 폼(역할·대상·지시·출력형식·분량·어조·제외·입력자료·출력예시)으로 프롬프트 조립·복사.
  - 빌더 초안 자동 저장(`df_pb_draft`), 사용자가 만든 프롬프트를 로컬 저장(`PB_STORE`, 클라이언트 전용).
- **클라이언트/서버**: `서버 필요`. 근거: 모음 데이터를 `fetch('/mfg/api/prompt_lib.php?action=all')`로 로드, 실패 시 "로드 실패" 상태 박스 표시. 이것이 핵심 콘텐츠원. (빌더/로컬저장은 클라이언트.) [확인]
- **서버 의존**: 
  - `/mfg/api/prompt_lib.php?action=all` — **GET**, JSON `{ok, msg, categories:[{id,icon,name}], items:[{title, content, description, category_id}]}`. 필수. 저장/추가용 엔드포인트는 이 페이지에 없음(등록은 별도 관리자 페이지 안내 문구만). [확인]
  - `/mfg/api/traffic_log.php` — POST 로그(`service=sim`).
- **외부 CDN/라이브러리**: Google Fonts; 앵커 chatgpt.com/claude.ai/gemini.google.com; `/mfg/js/promo.js`.
- **특이사항**: 재구현 시 `prompt_lib.php`가 `{ok, categories, items}` 형태 JSON을 돌려주도록 복원해야 모음 탭이 산다(응답 스키마는 위 필드명 그대로 사용). `CSS.escape`로 `?cat` 매칭. localStorage 키: `df_pb_draft`(초안), `PB_STORE`(내 프롬프트 목록).
