# /guide 인벤토리

> DataForge 가이드·아티클 15개(교육 콘텐츠 페이지). 전부 정적 HTML — `fetch(`·`XMLHttpRequest`·`.php`·`api/` 호출 없음(전 파일 grep 확인). 서버 복구 대상 아님. 아래 "연결 도구"는 페이지 내부 `<a href>` 링크 기준.

### /guide/index — 가이드·아티클 (가이드 랜딩/인덱스 페이지)
- **주제**: DataForge 가이드의 목차 페이지. "도구 사용 가이드"와 "개념 아티클" 두 섹션으로 글을 분류해 링크.
- **연결 도구**: 도구 가이드 글로 링크: /guide/prep_edit, prep_interpolate, prep_missing, prep_normalize, prep_onehot, prep_split, sim_deep, sim_ml, sim_timeseries (직접적인 /sim·/prep 도구 페이지 링크는 없음).
- **서버 의존**: 없음

### /guide/accuracy_trap — 정확도 98%의 함정
- **주제**: 정확도만 높은 모델이 불량 121개 중 110개를 놓치는 사례. 혼동행렬 네 칸, 정밀도·재현율의 차이, 불균형 데이터에서 정확도가 무의미해지는 이유.
- **연결 도구**: /sim/ml (metrics 앵커)
- **서버 의존**: 없음

### /guide/correlation_trap — 상관계수가 같아도 데이터는 다르다
- **주제**: 앤스콤 4중주로 같은 상관계수·다른 분포. 이상치가 만든 허위 유의성, 허위상관, 심슨의 역설로 부호가 뒤집히는 현상.
- **연결 도구**: /sim/stat
- **서버 의존**: 없음

### /guide/data_gen — 실습용 데이터 생성기 사용법
- **주제**: 제조·경영·광고·텍스트 네 가지 생성기가 만드는 데이터 소개. 공통 사용 흐름과 교육 활용법.
- **연결 도구**: /prep/missing (그 외 관련 가이드로 prep_interpolate, prep_missing, sim_ml 링크)
- **서버 의존**: 없음

### /guide/data_leakage — AUC 0.987은 축하가 아니라 경고다
- **주제**: 비정상적으로 높은 AUC를 데이터 누수 신호로 해석. 타깃 누수 제거 시 0.987→0.888로 하락, 전처리는 분할 뒤에 해야 한다는 원칙.
- **연결 도구**: /sim/ml
- **서버 의존**: 없음

### /guide/imbalance_smote — 없는 불량 17,272개를 지어냈다 (SMOTE와 리샘플링)
- **주제**: 재현율 0.091 출발점에서 SMOTE·언더샘플링의 부작용(헛경보, 깨진 확률). 임계값 조정 대안, 진짜 문제는 비율이 아니라 개수라는 결론.
- **연결 도구**: /sim/ml (metrics 앵커)
- **서버 의존**: 없음

### /guide/prep_edit — CSV 편집 도구 사용법
- **주제**: 빈 행 삭제·값 필터·날짜 분리·데이터 차분 기능. 탭별 단계 안내와 도구별 팁.
- **연결 도구**: /prep/edit (관련 가이드 prep_interpolate, prep_missing 링크)
- **서버 의존**: 없음

### /guide/prep_interpolate — CSV 보간·병합 사용법
- **주제**: 결측을 실제로 채우는 보간과 파일 병합. 단계별 사용법과 결과 읽는 법.
- **연결 도구**: /prep/interpolate (관련 가이드 prep_edit, prep_missing 링크)
- **서버 의존**: 없음

### /guide/prep_missing — 결측치·이상치 시뮬레이터 사용법
- **주제**: 빠진 값과 튀는 값을 먼저 파악하는 도구. 단계별 사용법과 결과 해석.
- **연결 도구**: /prep/missing (관련 가이드 prep_edit, prep_interpolate 링크)
- **서버 의존**: 없음

### /guide/prep_normalize — 정규화·표준화 사용법
- **주제**: 스케일이 다른 변수를 같은 눈금으로 맞추는 이유. 단계별 사용법과 상황별 방법 선택 기준.
- **연결 도구**: /prep/normalize (관련 가이드 prep_onehot, sim_ml 링크)
- **서버 의존**: 없음

### /guide/prep_onehot — 원-핫 인코딩 사용법
- **주제**: 문자 데이터를 모델이 읽는 숫자로 변환. 단계별 사용법과 컬럼 수 폭발 주의.
- **연결 도구**: /prep/onehot (관련 가이드 prep_edit, prep_normalize, sim_ml 링크)
- **서버 의존**: 없음

### /guide/prep_split — 데이터 분할 도구 사용법
- **주제**: 학습·테스트 세트를 올바르게 나누는 법. 단계별 사용법과 결과 읽는 법.
- **연결 도구**: /prep/split (관련 가이드 sim_timeseries 링크)
- **서버 의존**: 없음

### /guide/sim_deep — 딥러닝 시뮬레이션 사용법
- **주제**: 뉴런부터 과적합까지 눈으로 보는 신경망. 탭별 조절·관찰 요소와 추천 진행 순서.
- **연결 도구**: /sim/deep (관련 가이드 sim_ml 링크)
- **서버 의존**: 없음

### /guide/sim_ml — 머신러닝 시뮬레이션 사용법
- **주제**: K-Means·KNN·로지스틱 회귀·트리 계열·선형 회귀·평가지표를 코드 없이 관찰. 값을 바꿔가며 원리를 보는 사용법.
- **연결 도구**: /sim/ml (관련 가이드 sim_deep 링크)
- **서버 의존**: 없음

### /guide/sim_timeseries — 시계열 분석 시뮬레이터 사용법
- **주제**: 추세·계절성·예측을 눈으로 확인. 단계별 사용법과 결과 읽는 법.
- **연결 도구**: /sim/timeseries (관련 가이드 prep_split, sim_ml 링크)
- **서버 의존**: 없음

---

# 백엔드 API 맵

> 잃어버린 PHP 백엔드를 복구하기 위한 지도. 스크랩된 전체 사이트에서 `fetch()`/XHR 호출을 forensic하게 추출해, 프론트 JS가 각 엔드포인트를 어떻게 쓰는지로 계약(요청/응답)을 역설계했다. 인용된 코드는 실제 소스다.
>
> **엔드포인트 그룹 4개:**
> 1. **`/api/*`** — 관리자 백엔드. 거의 전부 `admin/index.html`(관리 콘솔)에서만 호출. `BASE_URL + '/api/...'`.
> 2. **`/mfg/api/*`** — 공개 허브·제조 데모 백엔드. 리뷰/프롬프트/피드백/로그인/트래픽로그. 공개 페이지·mfg/ads/biz 데모가 호출.
> 3. **`/sim/api/*`, `/work/api/*`** — 파이썬 계산·파일 처리 프록시(FastAPI 백엔드로 프록시하는 얇은 PHP).
> 4. **`/factory_lab/sensor/api.php`** — 센서 목데이터.
>
> **공통 관찰:**
> - 관리자 쓰기 API는 대부분 `POST` + `FormData`(`_method` 파트 + `payload`(Blob JSON) 파트) 패턴 — 주석에 "mod_security 우회: 쓰기 요청은 multipart 파일 파트 + `_method`"라고 명시. 진짜 HTTP 메서드를 `_method` 폼필드로 흉내낸다.
> - 관리자 쓰기 API는 `X-CSRF-Token: CSRF_TOKEN` 헤더를 실음.
> - 성공 응답은 대부분 `{ok:true, ...}`, 실패는 `{ok:false, msg:'...'}` (혹은 프록시는 `{error:'...'}`).
> - `/mfg/api/*`와 `/api/*`에 **각각** prompt_lib.php / reviews.php / feedback.php / login.php 가 있다(경로가 다른 별개 구현으로 보임 — 공개용=mfg, 관리자용=api).

## /api/* (관리자 백엔드 — 호출처 대부분 `admin/index.html`)

### /api/login.php
- **호출하는 곳**: `admin/index.html` `doLogin()`.
- **요청**: `POST`, JSON body `{password}`. `Content-Type: application/json`.
- **응답 (추정)**: `{ok, admin, msg}`. 소비 코드: `if(d.ok&&d.admin) location.reload(); else ...= d.msg||'비밀번호가 틀렸습니다'`.
- **추정 역할**: 관리자 비밀번호 인증. 성공 시 세션 쿠키 설정(이후 `isAdmin` 판정·서버렌더 반영).
- **DB/스토리지 흔적**: 관리자 세션 쿠키. 로그아웃은 `/admin/?logout=1` (index.php 자체 처리).

### /api/sessions.php
- **호출하는 곳**: `admin/index.html` `loadSessions()`/`createSession()`/`saveSessionPeriod()`/`deleteSession()`.
- **요청**:
  - `GET` → 세션 목록.
  - `POST` JSON `{name,startDate,endDate,headcount}` → 생성.
  - `POST` **FormData** `_method=PERIOD` + `payload`(Blob JSON `{id,startDate,endDate}`) → 기간 연장.
  - `POST` **FormData** `_method=PUT` + `payload`(Blob JSON `{id, modules}`) → 커리큘럼 저장 (`saveCurriculum`).
  - `DELETE` JSON `{id}` → 삭제.
- **응답 (추정)**: GET = 배열. 각 원소 `{id,name,code,startDate,endDate,headcount,createdAt,modules[]}` — 소비: `sessions.forEach(s=>{ SESSIONS_MAP[s.id]=s; })`, `s.code`(교육 코드), `s.modules`, `daysLeft(s.endDate)`. 쓰기 응답 `{ok, msg}`.
- **추정 역할**: 교육 세션 CRUD (교육명·기간·정원·교육코드·커리큘럼 모듈 목록). 코드로 수강생 로그인 연동.
- **DB/스토리지 흔적**: `code`(고유 교육 코드), `createdAt`, 세션당 `modules[]` 배열. DB 테이블 또는 JSON 파일.

### /api/hub_tools.php
- **호출하는 곳**: `admin/index.html` `loadHubTools()`.
- **요청**: `GET`.
- **응답 (추정)**: 도구 객체 배열. 소비: `data.forEach(t => HUB_TOOLS.push(t))`. 주석 "실습도구 (hub_tools.json 에서 자동 로드)".
- **추정 역할**: 커리큘럼 편집기가 붙일 수 있는 실습 도구 카탈로그 읽기(읽기 전용).
- **DB/스토리지 흔적**: `hub_tools.json` 파일 백엔드로 추정.

### /api/courses.php
- **호출하는 곳**: `admin/index.html` `crsLoad()`, `csSend()`, 과정 최신화 로직, 커리큘럼 동기화.
- **요청**:
  - `GET` → 과정 목록 (배열 `{id,name,...}`).
  - `GET ?id=<id>` → 단일 과정 `{ok, course:{modules[]}}`.
  - `POST` FormData `_method`(PUT 등) + `payload`(Blob JSON) → 과정 저장.
- **응답 (추정)**: 목록=`[{id,name}]` (`new Map(list.map(c=>[c.name,c.id]))`). 단일=`{ok, course:{modules:[...]}}` — 소비: `if(!d.ok || !Array.isArray(d.course?.modules))`, `d.course.modules.map(...)`.
- **추정 역할**: "1 JSON = 1 과정" (주석 "data/courses/"). 과정 파일 CRUD. 세션 커리큘럼이 여기서 모듈을 승계.
- **DB/스토리지 흔적**: `data/courses/` 디렉터리, 과정당 JSON 파일.

### /api/content_lib.php
- **호출하는 곳**: `admin/index.html` `clSend()`, `clLoadAll()`, `clExport()`, `clImport()`.
- **요청**:
  - `GET` → 컨텐츠 아이템 배열.
  - `POST` FormData `_method=PATCH` + `payload`(Blob JSON `{items, mode:'append'}` 또는 `{items}`(전체 교체)) → 일괄 저장/가져오기.
- **응답 (추정)**: GET=배열(`clItems = items`, `it.attachments`, `it.category`, `it.examples`). PATCH=`{ok, count, total}` — 소비: `alert('✓ '+d.count+'개 추가 완료 (라이브러리 전체 '+d.total+'개)')`.
- **추정 역할**: 실습 컨텐츠 라이브러리(예제·첨부·카테고리) 저장소. append/전체교체 지원, "기존 데이터는 서버에 .bak으로 백업"(주석).
- **DB/스토리지 흔적**: `.bak` 백업 파일 언급. 첨부는 `it.attachments[]`(upload_file/upload_pdf가 만든 url).

### /api/upload_file.php
- **호출하는 곳**: `admin/index.html` `uploadAttach()`(첨부), `insertImages()`(마크다운 이미지 붙여넣기/드롭).
- **요청**: `POST` FormData, 필드 `file` (단일 파일). 헤더 `X-CSRF-Token`.
- **응답 (추정)**: `{ok, url, name, size, type}` — 소비: `currModules[...].attachments.push({url:d.url, name:d.name, size:d.size, type:d.type})`, 이미지 삽입은 `![..](${d.url})`.
- **추정 역할**: 일반 파일/이미지 업로드 → 공개 URL 반환. 이미지는 클라에서 리사이즈 후 업로드.
- **DB/스토리지 흔적**: 업로드 디렉터리, 반환 `url`은 웹 접근 경로.

### /api/upload_pdf.php
- **호출하는 곳**: `admin/index.html` `uploadPdf()`(모듈 PDF), `clUploadPdf()`(컨텐츠 라이브러리 PDF).
- **요청**: `POST` FormData, 필드 `pdf`. 헤더 `X-CSRF-Token`.
- **응답 (추정)**: `{ok, url, name}` — 소비: `currModules[...].pdfUrl=d.url; ...pdfName=d.name`.
- **추정 역할**: PDF 전용 업로드 → 공개 URL. (별도 엔드포인트인 이유: 크기 제한·검증 차이 추정.)
- **DB/스토리지 흔적**: PDF 저장 디렉터리.

### /api/drive.php
- **호출하는 곳**: `admin/index.html` `DV_API`, `dvSend()`, 목록 로더.
- **요청**: `GET` → 목록. `POST` FormData `_method` + `payload`(Blob JSON) → 저장. 헤더 `X-CSRF-Token`.
- **응답 (추정)**: `{ok, items, categories, site}` — 소비: `dvItems=d.items||[]; dvCats=d.categories||[]; dvSite=d.site||location.origin`.
- **추정 역할**: "자료실(드라이브)" — 카테고리별 자료 링크 관리. `site`는 공개 링크 베이스 URL.
- **DB/스토리지 흔적**: 아이템/카테고리 컬렉션, 사이트 베이스 URL 설정.

### /api/feedback.php
- **호출하는 곳**: `admin/index.html` `FB_API`(읽기·상태변경). ※ 공개 제출은 별개인 `/mfg/api/feedback.php`.
- **요청**: `GET` → 의견 목록. `POST` FormData `_method` + `payload`(Blob JSON) → 읽음 처리/삭제 등.
- **응답 (추정)**: GET=배열, `it.read` 플래그로 미읽음 계산: `fbItems.filter(it=>!it.read).length`.
- **추정 역할**: 사용자 개선 의견 조회·관리(관리자측).
- **DB/스토리지 흔적**: 의견 레코드 `{text, contact, page, read, ...}`.

### /api/reviews.php
- **호출하는 곳**: `admin/index.html` `RV_API`(관리자 승인). ※ 공개 조회/작성은 `/mfg/api/reviews.php`.
- **요청**: `GET ?all=1` → 승인 대기 포함 전체. `POST` FormData `_method` + `payload`(Blob JSON) → 승인/삭제.
- **응답 (추정)**: 배열, `it.approved` 플래그로 대기 계산: `rvItems.filter(it=>!it.approved).length`.
- **추정 역할**: 후기 승인 큐 관리(관리자측). 공개측은 승인된 것만 노출.
- **DB/스토리지 흔적**: 후기 레코드 `{name, org, text, approved}`.

### /api/short_url.php
- **호출하는 곳**: `admin/index.html` `SU_API`, 목록 로더.
- **요청**: `GET` → 단축URL 목록. `POST` FormData `_method` + `payload`(Blob JSON) → 생성/삭제.
- **응답 (추정)**: 배열(`suItems = items`). 각 원소는 단축코드↔원본URL 매핑으로 추정.
- **추정 역할**: 단축 URL 생성·관리(교육 자료 공유용 추정).
- **DB/스토리지 흔적**: 단축코드 테이블/파일.

### /api/stream_state.php
- **호출하는 곳**: 관리자측 `admin/index.html`(제어: start/stop/broadcast, 자동재개 GET). 뷰어측 `mfg/js/app.js` `pollStreamState()`(폴링 GET).
- **요청**:
  - `GET` → 현재 스트림 상태.
  - `POST` JSON `{action:'start', topic, rate, dbEnabled, config}`.
  - `POST` JSON `{action:'stop'}`.
  - `POST` JSON `{action:'broadcast', msgs, msgCount, topic}`.
- **응답 (추정)**: `{running, config, topic, rate, dbEnabled, recentMsgs:[{ts,msg,cls}], msgCount}`. 관리자 자동재개 소비: `if(!d.running) return; const cfg=d.config||{...}`. 뷰어 소비: `streamViewer.isRunning=!!d.running; d.recentMsgs; d.msgCount`.
- **추정 역할**: 실시간 제조 스트리밍 데모의 **서버측 공유 상태**(관리자가 broadcast하면 뷰어들이 poll로 수신). 관리자→서버→다수 뷰어 fan-out.
- **DB/스토리지 흔적**: 서버 사이드 상태 저장(최근 메시지 버퍼, running 플래그, config). 뷰어는 이 데이터를 Google Sheets webhook·Power BI로 재전송.

### /api/db_write.php
- **호출하는 곳**: `admin/index.html` 스트림 broadcast 시 `adm.dbSave`가 켜져 있을 때.
- **요청**: `POST` JSON `{topic, rows}` (rows = 스트림 메시지 배열, 선택 컬럼만 추림).
- **응답 (추정)**: `{ok, written}` — 소비: `statusEl.textContent = d.ok ? '+'+d.written+'행' : '오류'`.
- **추정 역할**: 스트리밍 데이터를 DB에 적재(행 삽입). `written`=삽입된 행 수.
- **DB/스토리지 흔적**: topic별 테이블. `ALWAYS` 컬럼 목록이 스키마 힌트: `timestamp, equipment_id, factory_id, line_id, process_type, process_status, status, result, maintenance_label, meter_id, product_id`.

### /api/traffic_stats.php
- **호출하는 곳**: `admin/index.html` `loadTraffic()`.
- **요청**: `GET`.
- **응답 (추정)**: `{ok, totals:{today_visits, today_unique, week_visits, month_visits}, daily:[{date, visits, unique}]}` — 소비: `const t=d.totals; ...t.today_visits; (d.daily||[]).forEach(r=>{dateMap[r.date]=r})`, `r.visits`, `r.unique`.
- **추정 역할**: traffic_log가 쌓은 방문 로그를 집계해 KPI·30일 일별 차트로 반환(읽기).
- **DB/스토리지 흔적**: 방문 로그 테이블(일자별 방문수·유니크). traffic_log.php와 한 쌍.

### /api/prompt_lib.php  (관리자측)
- **호출하는 곳**: `admin/index.html` `pLoadAll()` + 카테고리/프롬프트 CRUD.
- **요청**:
  - `GET ?action=all` → `{ok, categories, items}`.
  - `POST` JSON `{action:'add_category', name, icon, description, sort_order}`.
  - `POST` JSON `{action:'delete_category', id}`.
  - `POST` JSON `{action:'add_prompt'|'update_prompt', category_id, title, content, description, difficulty, is_featured, sort_order, (id)}`.
  - `POST` JSON `{action:'delete_prompt', id}`.
- **응답 (추정)**: `{ok, categories, items}` / 쓰기 `{ok, msg}`. 소비: `_pCategories=d.categories||[]; _pItems=d.items||[]`.
- **추정 역할**: 프롬프트 라이브러리 CRUD(카테고리 + 프롬프트). 공개측(`/mfg/api/prompt_lib.php`)이 읽는 같은 데이터로 추정.
- **DB/스토리지 흔적**: `categories`(name,icon,description,sort_order) + `prompts`(category_id, title, content, difficulty, is_featured, sort_order) 두 테이블.

### /admin/ (index.php 자체 — `fetch('', ...)` / `fetch(location.pathname, ...)`)
- **호출하는 곳**: `admin/index.html` DB 관리(`loadStats`,`runSetup`,`truncateTable`) + API 수집기(autocollect) `acPost()`.
- **요청**: `POST` `application/x-www-form-urlencoded`, 페이지 자기 자신(URL='' 또는 location.pathname)으로. `action` 필드로 분기:
  - `action=stats` → DB 통계.
  - `action=db_setup` → 테이블 생성.
  - `action=truncate&table=<t>` → 테이블 비우기.
  - `action=ac_list` / `ac_save`(config 전체: `name,url,appkey,start_param,end_param,date_format,extra_params,page_param,size_param,page_size,data_key,total_key,has_more_key`) / `ac_delete&id=` / `ac_run`(외부 오픈API 페이지네이션 수집) / `ac_history` / `ac_download&filename=` / `ac_delete_file&filename=`.
- **응답 (추정)**: JSON. `stats` → 테이블별 카운트. `db_setup` → `{ok}`. `ac_run` → `{ok, total, pages, filename, msg}` — 소비: `d.total.toLocaleString()+'건 수집 · '+d.pages+'페이지 · 파일: '+d.filename`. `ac_download` → `{ok, data:[...]}`(JSON/CSV로 내려받음).
- **추정 역할**: 관리자 페이지 PHP 라우터. DB 셋업/통계/truncate + **외부 공공데이터 오픈API 수집기**(제주데이터허브 등 프록시 수집, 결과를 서버 파일로 저장 후 다운로드).
- **DB/스토리지 흔적**: 수집 결과 파일(`filename`, JSON), 여러 DB 테이블. 기본 수집 URL 예: `open.jejudatahub.net/api/proxy/.../{appkey}`.

## /mfg/api/* (공개 허브·제조 데모 백엔드)

### /mfg/api/login.php
- **호출하는 곳**: `mfg/js/app.js` `submitLogin()`(교육 코드), `ads/js/app.js`·`biz/js/app.js`(비밀번호).
- **요청**: `POST` JSON. mfg는 `{code}`(대문자 교육코드), ads/biz는 `{password}`.
- **응답 (추정)**: `{ok, msg}` — 소비: `if(data.ok){setAuthed(true)} else errEl.textContent=data.msg||'유효하지 않은 코드입니다'`.
- **추정 역할**: 데모 도구(제조/광고/경영)의 교육코드·비밀번호 게이트. 성공 시 데모 제한(DEMO_LIMIT 행) 해제.
- **DB/스토리지 흔적**: 교육 코드 검증(=sessions.php의 code와 연동 추정). 인증 쿠키.

### /mfg/api/logout.php
- **호출하는 곳**: `mfg/js/app.js` `doLogout()`.
- **요청**: `GET` (`await fetch('api/logout.php')`).
- **응답 (추정)**: 응답 본문 미사용. 호출 후 `setAuthed(false)`.
- **추정 역할**: 데모 로그인 세션 파기.
- **DB/스토리지 흔적**: 세션 쿠키 제거.

### /mfg/api/reviews.php  (공개측)
- **호출하는 곳**: 공개 허브 `index.html`(및 index__* 사본 전부), 티커 표시 + 작성 모달.
- **요청**: `GET` → 승인된 후기 배열. `POST` JSON `{name, org, text, website}` (`website`=허니팟).
- **응답 (추정)**: GET=배열 `[{text,name,org}]` — 소비: `` `💬 <b>${escRv(it.text)}</b>...— ${escRv(it.name)}${it.org?' · '+escRv(it.org):''}` ``. POST=`{ok, msg}` — 소비: `if(!d.ok){show(d.msg||'등록 실패')}`.
- **추정 역할**: 공개 후기 조회(승인분만) + 신규 후기 제출(미승인 상태로 저장, 관리자 `/api/reviews.php?all=1`이 승인).
- **DB/스토리지 흔적**: 후기 테이블 `{name,org,text,approved}`. `website` 필드는 스팸 봇 트랩.

### /mfg/api/prompt_lib.php  (공개측)
- **호출하는 곳**: 공개 허브 `index.html`(`?action=categories`), `builder/prompt_lib.html`(`?action=all`).
- **요청**: `GET ?action=categories` → 카테고리만. `GET ?action=all` → 전체.
- **응답 (추정)**: `{ok, categories, items}` — 소비: `if(!d.ok||!Array.isArray(d.categories)) return`(허브), `_cats=d.categories||[]; _items=d.items||[]`(빌더).
- **추정 역할**: 프롬프트 라이브러리 공개 읽기(관리자 CRUD와 같은 데이터).
- **DB/스토리지 흔적**: 관리자 `/api/prompt_lib.php`와 동일 저장소 추정.

### /mfg/api/feedback.php  (공개 제출)
- **호출하는 곳**: `mfg/js/promo.js`(전 사이트 지연로드되는 개선의견 모달). 허브 `openFeedback()`가 이 모달 재사용.
- **요청**: `POST` JSON `{text, contact, page, website}` (`website`=허니팟, `text`≥10자 클라 검증).
- **응답 (추정)**: `{ok, msg}` — 소비: `if(!d.ok){show(d.msg||'전송 실패')} else show(d.msg,true)`. 주석: "저장: /mfg/api/feedback.php → admin 운영 > 개선 의견".
- **추정 역할**: 방문자 개선의견 접수 → 관리자 `/api/feedback.php`에서 조회.
- **DB/스토리지 흔적**: 의견 레코드 `{text, contact, page, read}`.

### /mfg/api/traffic_log.php
- **호출하는 곳**: **거의 모든 페이지**(허브, mfg/ads/biz, builder/*, extension/*, manage/*, prep/*, sim/*, vibe/*, work/*, lms 등 100+). 세션당 1회(`sessionStorage` 가드).
- **요청**: `POST` `application/x-www-form-urlencoded`, body `service=<hub|sim|work|...>&page=<pathname>`.
- **응답 (추정)**: 미사용(fire-and-forget). 예: `fetch('/mfg/api/traffic_log.php',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'service=hub&page='+encodeURIComponent(location.pathname)})`.
- **추정 역할**: 방문 로그 적재(서비스·페이지·시각·유니크). 관리자 `/api/traffic_stats.php`가 이걸 집계.
- **DB/스토리지 흔적**: 방문 로그 테이블(일자·service·page·IP/쿠키 기반 unique). traffic_stats.php와 한 쌍.

### /mfg/api/grafana_queries.php  (참고 — API 아님)
- **호출하는 곳**: `mfg.html`, `admin/index.html` — `<a href target="_blank">`(fetch 아님, 링크).
- **추정 역할**: 샘플 Grafana SQL 쿼리를 텍스트로 보여주는 정적/반정적 페이지. 복구 우선순위 낮음.

## /sim/api/*, /work/api/* (파이썬 계산·파일 처리 프록시)

### /sim/api/ml_proxy.php
- **호출하는 곳**: `sim/ml.html`(머신러닝 시뮬레이터, 알고리즘 실행 버튼).
- **요청**: `POST ?algo=<kmeans|knn|linear|logistic|dtree|rforest|xgboost|lightgbm|metrics>`, FormData: `train_file`, (선택)`val_file`, `test_file`, + 알고리즘별 파라미터(`getParams(algo)`가 true/false/값을 append).
- **응답 (추정)**: JSON. 실패 시 `{error}` — 소비: `if(data.error) throw new Error(data.error); renderResults(algo, data, res)`. 성공 shape는 algo별(모델 지표·예측·시각화 데이터). UI 문구 "FastAPI ML 서버에서 분석 중".
- **추정 역할**: 업로드한 CSV로 실제 scikit-learn/xgboost 학습·평가를 FastAPI 백엔드에 프록시하고 결과 반환.
- **DB/스토리지 흔적**: 없음(스테이트리스 계산 프록시). 뒤에 FastAPI ML 서비스 존재.

### /sim/api/text_proxy.php
- **호출하는 곳**: `sim/text.html`(텍스트 마이닝: 분석 + 워드클라우드).
- **요청**: `POST` FormData: `text`, `tokenizer`, `pos_filter`, `min_len`, `max_words`, `user_stops`, `include_tfidf`, `include_ngram`, `include_wordcloud`, `wordcloud_bg`, `wordcloud_shape`.
- **응답 (추정)**: JSON(`const data = await resp.json()`) — 토큰 빈도·TF-IDF·n-gram·워드클라우드 이미지(base64 추정). 별도 호출로 워드클라우드만 재생성.
- **추정 역할**: 한국어 형태소 분석(pos_filter·tokenizer 인자로 보아 KoNLPy 등) + 워드클라우드 렌더를 파이썬 백엔드에 프록시.
- **DB/스토리지 흔적**: 없음(계산 프록시).

### /sim/timeseries.html — timeseries_calc.php (주의: timeseries.php는 API 아님)
- **호출하는 곳**: `sim/timeseries.html` (경로 `api/timeseries_calc.php`, 즉 `/sim/api/timeseries_calc.php`).
- **요청**: `POST` JSON `{action, data:state.data, params}`. `Content-Type: application/json`.
- **응답 (추정)**: `{ok, msg, ...결과}` — 소비: `if(!d.ok){setStatus(d.msg||'오류 발생','err')}`.
- **추정 역할**: 시계열 분해·통계 계산(추세/계절성 등)을 서버에서. **단, ARIMA는 서버가 아니라 클라 Pyodide(statsmodels)로 계산** — `runARIMA()`는 fetch 없이 `py.runPythonAsync(ARIMA_PY)`.
- **주의**: `timeseries.php`는 `<meta property="og:url">` 값(페이지의 원래 PHP URL)일 뿐 백엔드 호출 아님. 복구 대상 아님.
- **DB/스토리지 흔적**: 없음(계산 프록시).

### /work/api/ocr_proxy.php
- **호출하는 곳**: `work/ocr.html`(이미지 OCR).
- **요청**: `POST`(XHR, 진행률 표시용) FormData 필드 `image`(blob, filename).
- **응답 (추정)**: `{lines, full_text, error}` — 소비: `if(xhr.status!==200||d.error) showError(d.error||'인식에 실패했습니다'); const lines=d.lines||[]; const full=d.full_text||''`.
- **추정 역할**: 이미지 → OCR 텍스트(라인 단위 + 전체). 파이썬 OCR 백엔드 프록시.
- **DB/스토리지 흔적**: 없음(계산 프록시).

### /work/api/ppt_proxy.php
- **호출하는 곳**: `work/ppt_font.html`(PPT 폰트 임베딩/변환).
- **요청**: 청크 업로드 방식.
  - `POST ?action=chunk` FormData: `upload_id`, `chunk_index`, `total_chunks`, `chunk`(blob).
  - `POST ?action=finalize` FormData(fd2) → 처리 시작.
  - `GET ?action=download&token=<token>` → 결과 파일 다운로드.
- **응답 (추정)**: chunk/finalize JSON, 실패 `{error}`. finalize가 `{token}` 반환 → 다운로드 URL에 사용: `a.href='/work/api/ppt_proxy.php?action=download&token='+data.token`.
- **추정 역할**: 대용량 PPTX를 청크로 업로드 → 서버에서 폰트 임베딩 처리 → 토큰으로 결과 내려받기.
- **DB/스토리지 흔적**: 임시 업로드 저장(upload_id별 청크 조립), 결과 파일 토큰 매핑.

### /work/api/ppt_pdf_proxy.php
- **호출하는 곳**: `work/ppt_pdf.html`(PPT→PDF 변환, 폰트 검사 포함).
- **요청**:
  - `GET ?action=fonts` → 서버 사용 가능 폰트 목록.
  - `GET ?action=fonts&probe=<name1|name2>` → 특정 폰트 설치 여부.
  - `POST ?action=chunk` FormData(청크 업로드).
  - `POST ?action=finalize` FormData(fd2) → 변환 실행.
- **응답 (추정)**: JSON. 실패 시 `!res.ok` 분기. finalize가 결과(다운로드 정보/PDF) 반환.
- **추정 역할**: PPTX 청크 업로드 → 서버에서 PDF 변환. 폰트 존재 확인 API 부가.
- **DB/스토리지 흔적**: 청크 임시 저장, 서버 폰트 목록.

### /work/api/youtube_dl.php
- **호출하는 곳**: `work/youtube_dl.html`(유튜브 다운로더).
- **요청**:
  - `POST ?action=info` urlencoded `url=<url>` → 메타 조회.
  - `POST ?action=start` urlencoded `url=<url>&format=<fmt>` → 다운로드 작업 시작.
  - `GET ?action=status&job=<job>` → 진행 상태 폴링.
  - `GET ?action=fetch&job=<job>` → 완성 파일 다운로드(`a.href`).
- **응답 (추정)**: info=`{thumbnail, title, duration, uploader, view_count, has720, error}`. start=`{job, error}` — `currentJob=data.job`. status=`{status:'processing'|'merging'|'done', percent, speed, eta, size}`.
- **추정 역할**: 서버측 yt-dlp 작업 큐(비동기 job). info→start→status 폴링→fetch 다운로드 파이프라인.
- **DB/스토리지 흔적**: job별 상태·다운로드 산출 파일(job id로 관리).

## /factory_lab/* (공장 실습 랩)

### /factory_lab/sensor/api.php
- **호출하는 곳**: `factory_lab/sensor/index.html` `updateSensors()`(주기적 폴링).
- **요청**: `GET`.
- **응답 (추정)**: `{sensors:[{sensor_code, value, status:'normal'|'warning'|'danger'}]}` — 소비: `data.sensors.forEach(s=>{ ...'sensor-'+s.sensor_code; s.value.toLocaleString(...); 'status-'+s.status })`.
- **추정 역할**: 실시간 센서 값 목데이터/시뮬 공급(대시보드 갱신용).
- **DB/스토리지 흔적**: 없거나 간단한 상태 파일. `//dataforge.ai.kr/factory_lab/sensor/api.php` 절대경로 참조도 존재.

### /factory_lab/* (링크만 — fetch 아님, 참고)
- `crawl_lab.php`, `login.php`, `news/detail.php?id=N`, `catalog/detail.php?id=N` 는 전부 `<a href>` 네비게이션 링크(서버렌더 PHP 페이지). fetch API 아님. 복구는 별개 트랙(정적/PHP 페이지 재구성).

## 오해 주의 (엔드포인트로 착각 금지)
- **`bep.php` / `scenario.php`** — `manage/*.html`의 **주석**에만 등장("bep.php와 동일 규격"). 실제 호출 없음. 해당 버튼은 클라이언트에서 `Blob`으로 `.md`/`.html` 파일을 만들어 내려받는 순수 클라 기능. **백엔드 복구 불필요.**
- **`timeseries.php`** — og:url 메타값(페이지 원래 주소). API 아님.
- **`grafana_queries.php`** — `<a>` 링크 대상(샘플 SQL 뷰). fetch 아님.
- **외부 URL(복구 대상 아님)**: `https://mfg.flex-link.co.kr/ollama/api/generate`(admin AI 생성, Ollama qwen2.5-coder:32b), Google Sheets webhook·Power BI(뷰어가 직접 전송), `open.jejudatahub.net`(수집기 대상).

## 복구 우선순위 요약
1. **인증·세션**: `/api/login.php`, `/mfg/api/login.php`, `/mfg/api/logout.php` (+ `/admin/` 세션·`isAdmin`).
2. **교육 데이터 코어**: `/api/sessions.php`, `/api/courses.php`, `/api/content_lib.php`, `/api/hub_tools.php` (교육 세션·과정·컨텐츠).
3. **공개 참여**: `/mfg/api/reviews.php`, `/mfg/api/feedback.php`, `/mfg/api/prompt_lib.php`, `/mfg/api/traffic_log.php` (+ 관리자측 `/api/reviews.php`,`/api/feedback.php`,`/api/prompt_lib.php`,`/api/traffic_stats.php`).
4. **파일/업로드**: `/api/upload_file.php`, `/api/upload_pdf.php`, `/api/drive.php`, `/api/short_url.php`.
5. **스트리밍 데모**: `/api/stream_state.php`(공유 상태), `/api/db_write.php`, `/admin/` autocollect·DB셋업.
6. **계산·파일 프록시**(FastAPI/파이썬 뒤에 있음): `/sim/api/ml_proxy.php`, `/sim/api/text_proxy.php`, `/sim/api/timeseries_calc.php`, `/work/api/ocr_proxy.php`, `/work/api/ppt_proxy.php`, `/work/api/ppt_pdf_proxy.php`, `/work/api/youtube_dl.php`.
7. **목데이터**: `/factory_lab/sensor/api.php`.
