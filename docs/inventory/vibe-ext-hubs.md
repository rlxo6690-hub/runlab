# DataForge 복구 인벤토리 — vibe(바이브 빌더) · extension(크롬 확장) · HUB/포털

> 대상 스크랩본: `/Users/user/Desktop/태태/dataforge-복구/site/`
> 조사 방식: 각 HTML/JS 전수 grep + 핵심 파일 정독. 근거 표시 — [확인]=이번에 직접 파일에서 본 것.

---

## 섹션 요약

- **총 페이지/앱**: 이 섹션 대상 = 20개 단위
  - vibe 5 (firestore, push, pwa, split, telegram)
  - extension 3 (capture, imagegrab, textgrab) + 각 `_ext/dist/*.zip` 배포본 3개
  - HUB 미니앱 5 (biz, ads, mfg, text, sheet)
  - 포털/문서 페이지 4 (index, about, privacy, factory_lab 허브)
  - factory_lab 하위 5 (catalog, news, sensor, production, maintenance)
  - lms 1, admin 1
  - (참고) `index__*.html` 30여 개는 `index.html`과 **바이트 동일한 중복 스크랩본**(쿼리스트링별 저장). 내용상 1개.

- **클라이언트 전용 vs 서버 필요**
  - **클라이언트 전용(정적/브라우저 계산만, 로깅 제외)**: vibe 5개 전부, extension 3개 전부, biz, ads, text, sheet, index(허브), about, privacy, factory_lab 허브, factory_lab catalog/news/production/maintenance(정적 스크랩), lms 로그인화면 → **≈ 18**
  - **서버 필요(핵심 기능이 백엔드 의존)**: mfg(실시간 스트리밍), admin(관리 콘솔 전체), factory_lab(login·crawl_lab·sensor api), lms(수강 인증 후 콘텐츠) → **핵심 4** (+ 모든 페이지가 traffic_log.php 를 화면진입 로깅용으로 1회 호출하지만 이건 없어도 화면은 동작)

- **백엔드 PHP 엔드포인트 (deduped, 전수)** — 대부분 `BASE_URL='/mfg'` 기준이라 실제 경로는 `/mfg/api/…`
  1. `/mfg/api/traffic_log.php` — POST `service=<hub|mfg|biz|ads|man|sim|pre>&page=<path>`. 방문 로깅. **거의 모든 페이지가 세션당 1회 호출** (sessionStorage 가드).
  2. `/mfg/api/traffic_stats.php` — GET. 트래픽 집계 (admin 트래픽 현황).
  3. `/mfg/api/reviews.php` — GET(후기 목록 JSON) / POST(후기 등록 `{name,org,text,website(허니팟)}`). index 후기 티커 + admin 후기 관리.
  4. `/mfg/api/feedback.php` — POST(개선의견, X-CSRF-Token). promo.js 피드백 모달 + admin.
  5. `/mfg/api/prompt_lib.php` — `?action=categories`(카테고리 카드), `?action=all`(전체). index/builder/admin 프롬프트 관리.
  6. `/mfg/api/courses.php` — GET `?id=`, POST(X-CSRF). 과정 관리(admin), 교육 콘텐츠.
  7. `/mfg/api/content_lib.php` — CL_API. 컨텐츠 라이브러리(admin).
  8. `/mfg/api/sessions.php` — POST/DELETE. 교육 세션 관리(admin).
  9. `/mfg/api/stream_state.php` — GET(실시간 스트림 running/topic/msgCount/messages), POST. mfg 실시간 뷰어 + admin 스트리밍 제어.
  10. `/mfg/api/login.php` — POST `{password}` (JSON). mfg 스트리밍 제어 로그인 + admin 로그인.
  11. `/mfg/api/logout.php` — mfg/admin 로그아웃.
  12. `/mfg/api/db_write.php` — POST. DB 관리(admin) — `action=db_setup`, `action=truncate&table=`, `action=stats` 등.
  13. `/mfg/api/drive.php` — DV_API. 파일 보관함/드라이브(admin).
  14. `/mfg/api/upload_file.php` — FILE_API. multipart 업로드, X-CSRF-Token(admin 파일 보관함).
  15. `/mfg/api/upload_pdf.php` — PDF_API. PDF 업로드(admin, lms 교재용).
  16. `/mfg/api/short_url.php` — SU_API. 짧은 주소·QR 생성(admin).
  17. `/mfg/api/hub_tools.php` — 허브 도구 목록 관리(admin).
  18. `/mfg/api/grafana_queries.php` — Grafana 연동 쿼리(admin API 수집 / mfg.html).
  19. `/factory_lab/login.php` — 포털 로그인(HTML form POST, 자기 자신 처리).
  20. `/factory_lab/crawl_lab.php` — 크롤링 실습 랩. 단건 크롤은 자기 자신에 `?ajax=1&offset=&result=` POST.
  21. `/factory_lab/crawl_batch.php` — 다중(배치) 크롤링 엔드포인트 (crawl_lab.php가 fetch).
  22. `/factory_lab/sensor/api.php` — GET. 센서 15종 현재값 JSON(`{sensors:[…],timestamp}`). 스크랩본은 정적 스냅샷.
  23. `/factory_lab/catalog/detail.php?id=1..30` — 부품 카탈로그 상세(서버 렌더). 스크랩본은 id별 정적 파일.
  24. `/factory_lab/news/detail.php?id=1..30` — 공지 상세(서버 렌더). 동일.
  - **(이 섹션 밖 참고)** sim: `/sim/api/text_proxy.php`, `/sim/api/ml_proxy.php?algo=` · work: `/work/api/youtube_dl.php`, `/work/api/ppt_proxy.php`, `/work/api/ppt_pdf_proxy.php`, `/work/api/ocr_proxy.php` — 이 문서 범위(vibe/ext/hub) 밖 페이지들이 참조.

- **외부 CDN/라이브러리 (deduped, 이 섹션에서 실제 사용)**
  - Google Fonts: `fonts.googleapis.com` / `fonts.gstatic.com` — Noto Sans KR, Space Mono (전 페이지 공통)
  - `cdnjs … jszip 3.10.1` — vibe push/pwa/split (zip 다운로드 생성)
  - `www.gstatic.com/firebasejs/*` firebase-app/auth/firestore — vibe firestore (생성 결과물이 로드)
  - `cdn.jsdelivr.net … chart.js 4.4.0 / 4.4.3` — mfg, admin 차트
  - `cdnjs … pdf.js 3.4.120` / `jsdelivr pdfjs-dist 3.11.174` — lms 교재 뷰어, admin
  - `cdn.jsdelivr.net … qrcode-generator 1.4.4` — admin short_url QR
  - `cdnjs … font-awesome 6.4.0` — admin
  - `cdn.tailwindcss.com`, `@tailwindcss/browser@4` — 일부 페이지
  - `xlsx (sheetjs) 0.18.5`, `PapaParse 5.4.1` — 데이터 내보내기/CSV (admin·생성기)
  - `cdnjs … codemirror 5.65.17` — factory_lab crawl_lab 코드 에디터
  - `marked 9`, `mathjax 3` — admin/문서 렌더
  - (참고, 이 섹션 밖에서 주로 쓰임) leaflet 1.9.4 + leaflet-draw/-image + shpjs, pptxgenjs 3.12.0
  - **외부 API 직접 호출**: `api.telegram.org/bot…`(vibe telegram), `mfg.flex-link.co.kr/ollama/api/generate`(admin AI), `open.jejudatahub.net/api/proxy/…`(admin API 수집)

---

## vibe/ — 바이브 코딩 빌더 (전부 클라이언트 전용 코드 생성기)

> 공통: 상단 폰트 CDN, 하단에 `fetch('/mfg/api/traffic_log.php', … body:'service=…&page=…')` 1회 로깅. 그 외 서버 의존 없음. 사용자가 입력→브라우저에서 코드/파일을 생성하고 zip 또는 복사로 내보냄.

### vibe/firestore.html — Firebase/Firestore 앱을 브라우저에서 조립해 내보내는 빌더
- **기능**:
  - 사용자가 자신의 `firebaseConfig`(apiKey 등)를 붙여넣으면 그걸 끼운 완성 앱 코드를 생성.
  - `firebase-app.js`+`firebase-auth.js`+`firebase-firestore.js`(gstatic CDN) 로드 코드, `firebase.initializeApp()`, `firebase.firestore()` 초기화 스캐폴딩 생성.
  - 결과물을 Netlify Drop(`app.netlify.com/drop`)에 끌어다 배포하도록 안내.
  - Firebase 콘솔(`console.firebase.google.com`) 링크로 config 발급 유도.
- **클라이언트/서버**: `클라이언트 전용` — 서버 코드 없음, 전부 문자열 템플릿 생성. [확인]
- **서버 의존**: 없음 (traffic_log.php 로깅 제외).
- **외부 CDN/라이브러리**: Google Fonts. 생성 결과물이 `gstatic firebasejs`(버전 문자열은 config에 포함) 로드.
- **특이사항**: 재구현 시 백엔드 불필요. Firebase 프로젝트는 사용자 소유(우리 서버 아님). 순수 정적 페이지로 복원 가능.

### vibe/push.html — 웹 푸시(PWA Push) 빌더
- **기능**:
  - VAPID 공개/개인키(`VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`) 입력 기반 푸시 구독 코드 생성.
  - 서비스워커 등록(`serviceWorker.register`) + `manifest.json` 템플릿 생성.
  - 프론트: `fetch('/api/subscribe')` 구독 등록 코드 / 서버(Node) 측: `webpush.setVapidDetails` + `webpush.sendNotification` + `firebase-admin` 예시 코드를 **문자열로** 생성.
  - JSZip으로 결과 묶음 zip 다운로드.
- **클라이언트/서버**: `클라이언트 전용`(빌더 자체). 단, 생성되는 결과물은 사용자가 별도 배포할 Node 백엔드(`/api/subscribe`, `/api/send`)를 상정 — 우리 서버 아님. [확인]
- **서버 의존**: 없음 (빌더 동작에는). 로깅만.
- **외부 CDN/라이브러리**: JSZip 3.10.1, Google Fonts.
- **특이사항**: `/api/subscribe`·`https://<유저도메인>/api/send`는 **생성 코드 안의 예시 경로**이지 DataForge 백엔드가 아님. 정적 복원 가능.

### vibe/pwa.html — PWA(오프라인 앱) 빌더
- **기능**:
  - 서비스워커(`fetch(e.request)` 캐시 전략 포함), `manifest.json`, 아이콘 설정 생성.
  - 앱 껍데기(HTML/JS) + 오프라인 캐싱 스캐폴딩 생성.
  - JSZip으로 zip 내보내기.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음. 로깅만.
- **외부 CDN/라이브러리**: JSZip 3.10.1, Google Fonts.
- **특이사항**: 정적 복원 가능.

### vibe/split.html — HTML 파일 분리기
- **기능**:
  - 하나의 큰 HTML을 여러 파일(예: 페이지/컴포넌트)로 분할.
  - 분할 결과를 JSZip zip 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음. 로깅만.
- **외부 CDN/라이브러리**: JSZip 3.10.1, Google Fonts.
- **특이사항**: 정적 복원 가능.

### vibe/telegram.html — 텔레그램 봇 연결 도우미
- **기능**:
  - 봇 토큰 입력 → `api.telegram.org/bot<TOKEN>/getMe`로 봇 검증.
  - `deleteWebhook`, `getUpdates`(채팅ID 확보), `sendMessage`(테스트 발송)까지 브라우저에서 직접 텔레그램 API 호출.
  - BotFather(`t.me/BotFather`) 안내, 전송용 `sendMessage` URL 스니펫 생성.
- **클라이언트/서버**: `클라이언트 전용` — 텔레그램 공개 API를 브라우저에서 직접 호출(우리 서버 경유 X). [확인]
- **서버 의존**: 없음(우리 백엔드). 외부 `api.telegram.org` 의존. 로깅만.
- **외부 CDN/라이브러리**: Google Fonts. 외부 API: `api.telegram.org`.
- **특이사항**: 토큰이 클라이언트에 노출되는 구조라 원래도 프록시 없음. 정적 복원 가능.

---

## extension/ — 크롬 확장 배포 페이지 (전부 정적 랜딩 + zip 다운로드)

> 각 페이지는 확장 설명 + 설치법 + `/extension/<name>_ext/dist/<name>.zip` 다운로드 링크. traffic_log.php 로깅만. 확장 소스는 `<name>_ext/src/`(icons 등), 배포본은 `<name>_ext/dist/*.zip`에 존재.

### extension/capture.html — 영역 캡처 확장(PixelShot Capture)
- **기능**: 화면 영역을 드래그로 캡처하는 크롬 확장 소개/설치 안내, `pixelshot-capture.zip` 다운로드 제공.
- **클라이언트/서버**: `클라이언트 전용`(정적). [확인]
- **서버 의존**: 없음. 로깅만.
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: 배포 파일 `/extension/capture_ext/dist/pixelshot-capture.zip` (+ `src/icons/icon128.png`). zip 원본 보존됨 → 그대로 재배포 가능.

### extension/imagegrab.html — 영역 이미지 저장 확장
- **기능**: 웹페이지 특정 영역의 이미지를 저장하는 확장 소개, `imagegrab.zip` 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음. 로깅만.
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: `/extension/imagegrab_ext/dist/imagegrab.zip` 보존.

### extension/textgrab.html — 영역 텍스트 추출 확장
- **기능**: 선택 영역의 텍스트를 추출/복사하는 확장 소개, `textgrab.zip` 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음. 로깅만.
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: `/extension/textgrab_ext/dist/textgrab.zip` 보존.

---

## HUB 미니앱 (biz / ads / mfg / text / sheet)

> 공통 로드: `js/formatters.js`(41줄, 숫자/CSV 포맷 유틸), `js/generators.js`, `js/app.js`, 그리고 `/mfg/js/promo.js`(개선의견 모달 → feedback.php). biz/ads/text/sheet는 데이터 생성이 전부 브라우저 계산(`Math.random`) → **클라이언트 전용**. mfg만 실시간 스트리밍으로 서버 의존.

### biz.html (site/biz/js/*) — 경영 데이터 생성기 (클라이언트 전용)
- **기능**: 5종 합성 데이터셋을 브라우저에서 생성해 CSV/JSON 내보내기.
- **generators.js가 만드는 데이터 종류** [확인]:
  1. **수요예측**(`generateDemandData`): 업종(retail/ecommerce/food/manufacturing/fashion)별 상품×일자 매출 — 계절성·트렌드·주말·프로모션 반영. 컬럼: date, product_id/name, category, sales_qty, sales_amount, unit_price, promo_flag/type, stock_qty, day_of_week, is_weekend.
  2. **재무 P&L**(`generateFinanceData`): 규모(small/medium/large)×업종×사업부×월. revenue/cogs/gross_profit/opex/ebit/net_income + 각 margin%, headcount, revenue_per_head.
  3. **고객분석 RFM/Churn**(`generateCustomerData`): 7세그먼트(Champions…Lost), recency/frequency/monetary + R/F/M 점수, rfm_score, segment, churn_probability/label, clv_estimate, 계약유형.
  4. **공급망**(`generateSupplyData`): SKU×일자, 창고, 재고, 재주문점, 리드타임/지연, 결품 플래그, 재고가치.
  5. **HR**(`generateHRData`): 부서/직급/급여/성과/만족도/초과근무/이직위험도(turnover_risk/label).
- **클라이언트/서버**: `클라이언트 전용` — 전부 순수 JS 난수. [확인]
- **서버 의존**: 없음 (traffic_log `service=biz`, promo feedback만).
- **외부 CDN/라이브러리**: Google Fonts (+CSV/xlsx 내보내기 유틸).
- **특이사항**: 재구현 = generators.js 그대로 재사용. 백엔드 불필요.

### ads.html (site/ads/js/*) — 광고 데이터 생성기 (클라이언트 전용)
- **generators.js가 만드는 데이터 종류** [확인]:
  1. **캠페인 성과**(`generateCampaignData`): 플랫폼(meta/google/kakao/naver/tiktok/multichannel)×캠페인×일자. impressions/clicks/ctr/spend/cpm/cpc/conversions/cvr/cpa/roas/revenue.
  2. **소재 분석**(`generateCreativeData`): 채널×소재(image/video/carousel/text)×포맷. CTR·CPC·CPA·품질점수·영상 조회율·썸네일 스탑율·frequency·reach.
  3. **A/B 테스트**(`generateABTestData`): 그룹 A~D, 기준 CVR·효과크기, 디바이스 가중치, user별 converted/시간/revenue. 테스트유형(landing/email/push/price/cta).
  4. **전환 분석**(`generateConversionData`): 일별/시간별, 지역·채널·디바이스 가중 분포, 시간대 가중치, 전환유형(purchase/signup/lead/install/view).
  5. **멀티터치 어트리뷰션**(`generateAttributionData`): 고객 여정(터치 2~10), first/last/linear/position-based 크레딧 계산, 채널 포지션 가중치.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: 없음 (traffic_log `service=ads`, feedback).
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: generators.js 재사용. `weightedPick` 헬퍼 포함.

### mfg.html (site/mfg/js/*) — 제조 데이터 생성기 + **실시간 스트리밍**(서버 필요)
- **generators.js가 만드는 데이터 종류** [확인]:
  1. **센서 데이터**(`generateSensorData`): 공정별 센서 컬럼 사전(`SENSOR_COL_LABELS`, ~50종) — CNC(온도/압력/진동/전류/토크…), 반도체 식각(chamber/RF/gas/etch_rate/wafer), 배터리(cell_voltage/soc/internal_resistance/capacity), 압연(furnace/roll_speed/strip_thickness), 솔더 리플로우(solder/preheat/peak/board_warp), 태양광 셀(efficiency/Pmax/Voc/Isc/FF/IV) 등.
  2. **품질 데이터**(`generateQualityData`): 제품/라인/측정값1·2/결과(OK/NG).
  3. **설비 데이터**(`generateEquipmentData`).
  4. **KPI 데이터**(`generateKPIData`): OEE 등.
  5. **스트림 메시지**(`generateStreamMsg`): 실시간 토픽 메시지 1건 생성기.
- **app.js 서버 호출** [확인]:
  - `api/login.php`(스트리밍 제어 로그인), `api/logout.php`
  - `api/stream_state.php`(GET: `{running, topic, msgCount, messages[]}` 폴링. POLL_MS active/idle 전환)
  - 수신 메시지를 사용자가 설정한 **외부** `webhookUrl`(localStorage `mfg_webhook_url`) 및 **Power BI 스트리밍** `powerBiUrl`(`mfg_pbi_url`)로 배치 전송.
  - Google Sheets 실시간 수신 Apps Script 코드 생성 섹션 포함, Grafana 연동(`grafana_queries.php`) 안내.
- **클라이언트/서버**: `서버 필요` — 실시간 스트리밍(생성기→서버 버퍼→폴링 뷰어) 파이프라인이 stream_state.php/login.php에 의존. 데이터 생성기 자체는 클라이언트. [확인]
- **서버 의존**: `/mfg/api/login.php`, `/mfg/api/logout.php`, `/mfg/api/stream_state.php`, `/mfg/api/grafana_queries.php`, `/mfg/api/traffic_log.php`, `/mfg/api/feedback.php`.
- **외부 CDN/라이브러리**: Google Fonts, chart.js. 외부: `mfg.flex-link.co.kr/ollama`(이 서브도메인에 실 스트리밍 백엔드가 있었을 가능성), 사용자 지정 Power BI/webhook URL.
- **특이사항**: 재구현 핵심 = stream_state.php(서버가 running 상태 + 메시지 링버퍼를 보관, 클라 폴링)와 login.php 세션. webhook/PowerBI/Sheets/Grafana는 아웃바운드 연동(선택).

### text.html — 텍스트 데이터 생성기 (클라이언트 전용)
- **기능**: 텍스트/프롬프트류 더미 데이터 생성(`generatePrompt` 등), 복사/내보내기. `/mfg/js/promo.js`만 로드.
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: **없음** — 이 페이지는 traffic_log.php조차 직접 호출 없음(promo.js는 feedback 모달용). [확인]
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: 순수 정적. 백엔드 불필요.

### sheet.html — 구글 시트 크롤링 도우미 (클라이언트 전용, 코드 생성형)
- **기능**:
  - 공개 구글 시트/웹표 크롤링 방법 안내 + **Google Apps Script 코드 생성**(`fetch(url, {muteHttpExceptions:true})` 는 GAS 전용 옵션 → 실행이 아니라 사용자가 붙여넣을 스니펫).
  - `querySelector`/DOMParser 기반 셀렉터 실습.
  - 실습 대상 예시 링크로 `//dataforge.ai.kr/factory_lab/sensor/api.php`를 **가리키기만** 함(직접 fetch 아님).
- **클라이언트/서버**: `클라이언트 전용`. [확인]
- **서버 의존**: `/mfg/api/traffic_log.php`(로깅)만. sensor/api.php는 예시 링크.
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: 생성물(GAS)은 사용자 환경에서 돌아감. 정적 복원 가능.

---

## 포털/문서 페이지

### index.html — 메인 허브/랜딩 (도구 카탈로그 + 후기 + 카테고리 + 로깅)
- **기능**:
  - **도구 카드 ~85개**를 HTML에 정적 렌더(`card-title/desc/tags/icon/footer`, 대부분 `status-live`). 원본은 서버 렌더였고 스크랩본은 그 결과.
  - **프롬프트 카테고리 카드 자동 추가**: `fetch('/mfg/api/prompt_lib.php?action=categories')` → `/builder/prompt_lib?cat=<id>` 카드 생성. `HIDDEN_CATS`(이메일/공공기관/시장조사/취업준비/보고서 작성)는 허브에서 숨김.
  - **교육 후기 티커**: `fetch('/mfg/api/reviews.php')` → 무한 롤링. 비면 rv-empty 표시.
  - **후기 등록 모달**(`rvSubmit`): `POST /mfg/api/reviews.php` `{name,org,text,website(허니팟)}`.
  - **개선의견**: `/mfg/js/promo.js` 지연 로드가 만든 `dffb` 모달 재사용(→ feedback.php).
  - **트래픽 로깅**: 세션당 1회 `POST /mfg/api/traffic_log.php service=hub`.
- **클라이언트/서버**: `클라이언트 전용`으로 화면은 뜨지만, 카테고리·후기·후기등록·피드백은 서버 필요. 도구 카드 자체는 정적. [확인]
- **서버 의존**: `/mfg/api/prompt_lib.php?action=categories`, `/mfg/api/reviews.php`(GET/POST), `/mfg/api/traffic_log.php`, (promo.js) `/mfg/api/feedback.php`.
- **외부 CDN/라이브러리**: Google Fonts. (도구 카드가 링크로 chart.js 등 내부 앱을 가리킴)
- **특이사항**: 재구현 우선순위 = prompt_lib(카테고리), reviews(목록+등록+스팸/허니팟), traffic_log, feedback. 도구 목록은 원래 DB/서버였을 수 있으나 지금은 정적 HTML로 확보됨 → hub_tools.php는 admin에서 이 목록을 관리.

### about.html — 소개·문의
- **기능**: 브랜드 소개, 연락처(문의) 섹션.
- **클라이언트/서버**: `클라이언트 전용`(정적). [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: 없음.

### privacy.html — 개인정보처리방침
- **기능**: 개인정보 처리방침 정적 문서.
- **클라이언트/서버**: `클라이언트 전용`(정적). [확인]
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: Google Fonts.
- **특이사항**: 없음.

---

## factory_lab — 스마트 팩토리 포털 (서브 포털, 서버 의존 큼)

### factory_lab.html (루트) + factory_lab/index.html — 포털 허브
- **기능**: 하위 메뉴 허브 — catalog(부품 카탈로그), news(공지), sensor(센서 모니터링), production(생산실적), maintenance(설비점검), crawl_lab.php(크롤링 실습), login.php(포털 로그인)로 연결.
- **클라이언트/서버**: 허브 자체는 `클라이언트 전용`(정적 링크 모음). 하위 기능이 서버 의존. [확인]
- **서버 의존**: 링크로 login.php/crawl_lab.php/sensor api/detail.php 연결.
- **외부 CDN/라이브러리**: Google Fonts, `/factory_lab/css/style.css`.
- **특이사항**: 크롤링 교육용으로 설계된 "가짜 기업 사이트". 하위가 실제 백엔드.

### factory_lab/login.php — 포털 로그인
- **기능**: 아이디/비밀번호 `<form method="post">` 자기 자신 POST 처리. 크롤링 실습에서 인증 우회/세션 연습용으로 추정.
- **클라이언트/서버**: `서버 필요`(PHP 세션/인증). 스크랩본은 로그인 폼 HTML만. [확인]
- **서버 의존**: 자기 자신(login.php) POST.
- **외부 CDN/라이브러리**: Google Fonts, style.css.
- **특이사항**: 재구현 시 세션 기반 로그인 필요.

### factory_lab/crawl_lab.php — 크롤링 실습 랩
- **기능**: 탭 2개 — 🕷 실습 모드(단건 크롤: CSS 셀렉터로 요소 추출, 자기 자신에 `?ajax=1&offset=&result=` POST), 📋 다중 크롤링(`fetch('crawl_batch.php')`).
- **클라이언트/서버**: `서버 필요` — 크롤 프록시/실행이 PHP. [확인]
- **서버 의존**: `factory_lab/crawl_lab.php`(자기 ajax), `factory_lab/crawl_batch.php`.
- **외부 CDN/라이브러리**: Google Fonts, style.css, CodeMirror 5.65.17(코드/셀렉터 에디터).
- **특이사항**: crawl_batch.php 원본 없음(스크랩 누락) → 재구현 필요. 대상은 factory_lab 하위 페이지들.

### factory_lab/sensor/index.html + sensor/api.php — 센서 모니터링
- **기능**: `setInterval`로 `fetch('/factory_lab/sensor/api.php')` 폴링, 센서 15종(온도/습도/압력/진동/유량/전력/VOC/소음) 현재값·정상범위·status(normal/warning) 대시보드.
- **클라이언트/서버**: `서버 필요` — api.php가 실시간 값 반환(스크랩본은 정적 JSON 스냅샷). [확인]
- **서버 의존**: `/factory_lab/sensor/api.php`(GET JSON `{sensors:[{id,sensor_code,name,location,type,value,unit,status,min_normal,max_normal,updated_at}], timestamp}`).
- **외부 CDN/라이브러리**: Google Fonts, style.css.
- **특이사항**: 재구현 = 15개 센서 난수 생성 + 정상범위 대비 status 계산해 JSON 서빙(간단). 스냅샷에 스키마 그대로 있음.

### factory_lab/catalog/ (index + detail.php?id=1..30) — 부품 카탈로그
- **기능**: 카테고리별(제어기기/식별·트래킹/공구류/환경설비/공압기기/IT기기/네트워크/구동기기/검사장비/안전장치/물류장비/센서류) 부품 목록 + 상세(예: "산업용 온도 센서 PT100").
- **클라이언트/서버**: 원본 `서버 필요`(detail.php 동적) — 스크랩본은 id별 정적 .php/.html로 확보. [확인]
- **서버 의존**: `/factory_lab/catalog/detail.php?id=N` (N=1~30).
- **외부 CDN/라이브러리**: Google Fonts, style.css.
- **특이사항**: 크롤링 실습 타깃 데이터. 정적 파일로 그대로 복원 가능(DB 없이도).

### factory_lab/news/ (index + detail.php?id=1..30) — 공지사항
- **기능**: 카테고리별(설비/생산/안전/HR) 공지 목록 + 상세.
- **클라이언트/서버**: 원본 `서버 필요`(detail.php), 스크랩본 정적 확보. [확인]
- **서버 의존**: `/factory_lab/news/detail.php?id=N` (N=1~30).
- **외부 CDN/라이브러리**: Google Fonts, style.css.
- **특이사항**: 정적 복원 가능.

### factory_lab/production/index.html — 생산 실적
- **기능**: 라인별 생산 실적/수율 표·차트(정적 스크랩).
- **클라이언트/서버**: `클라이언트 전용`(스크랩 정적). 원본은 서버 렌더였을 수 있음. [확인]
- **서버 의존**: 없음(스크랩본 기준).
- **외부 CDN/라이브러리**: Google Fonts, style.css.
- **특이사항**: 없음.

### factory_lab/maintenance/index.html — 설비 점검 이력
- **기능**: 설비 점검/보전 이력 표(정적 스크랩).
- **클라이언트/서버**: `클라이언트 전용`(스크랩 정적). [확인]
- **서버 의존**: 없음(스크랩본 기준).
- **외부 CDN/라이브러리**: Google Fonts, style.css.
- **특이사항**: 없음.

---

## lms/index.html — 교육생 포털 (수강 인증 게이트)
- **기능**:
  - **접근 코드 로그인**(monospace 대문자 코드 입력 `login-input`, `login-card`). 인증 후 커리큘럼 노출.
  - 인증 후: 과정/모듈(mod) 목록, 각 모듈에 **문제(mod-problem) + 정답 토글(mod-answer, 잠금 가능)**, **교육 내용**, **PDF 교재 뷰어**(pdf.js 렌더, `mod-pdf-page`), **예제 배지**(prompt/code/formula/pivot) 복사 버튼, 스크린샷 라이트박스, 파이썬 문법 강조.
  - 진입 시 `POST /mfg/api/traffic_log.php`(로깅).
- **클라이언트/서버**: `서버 필요` — 수강 콘텐츠/PDF/과정 데이터는 인증 후 서버(courses.php/upload_pdf.php 등)에서 옴. 스크랩본은 **로그인 화면 + 뷰어 스켈레톤**만 확보(실 콘텐츠 미포함). [확인]
- **서버 의존**: `/mfg/api/traffic_log.php`(확인). 콘텐츠는 admin의 courses.php/content_lib.php/upload_pdf.php와 연동(추정 — lms HTML엔 fetch 코드가 스크랩 누락).
- **외부 CDN/라이브러리**: Google Fonts, pdf.js(교재 렌더).
- **특이사항**: 재구현 핵심 = 접근코드 검증 + 과정/모듈/PDF 서빙. 스크랩엔 코드검증 로직·강의 데이터가 안 잡힘 → admin 백엔드에서 복원해야.

---

## admin/index.html (=index.php, index__logout=1.html 동일본) — 관리자 콘솔 (백엔드 총집합)
- **기능(사이드바 섹션 = 참조하는 엔드포인트)** [확인]:
  - ⚡ **스트리밍 제어** → `stream_state.php` (mfg 실시간 on/off·토픽)
  - 🎓 **교육 세션 관리** → `sessions.php`
  - 💬 **교육 후기 관리** → `reviews.php`
  - 💡 **개선 의견** → `feedback.php`
  - 📦 **과정 관리** → `courses.php`
  - 📚 **컨텐츠 라이브러리** → `content_lib.php`
  - 💬 **프롬프트 관리** → `prompt_lib.php?action=all`
  - 🗄 **DB 관리** → `db_write.php` (`action=db_setup|truncate&table=|stats`)
  - 🌐 **API 수집** → 외부 `open.jejudatahub.net` 프록시(`AC_DEFAULT_URL`), `grafana_queries.php`, ollama(`mfg.flex-link.co.kr/ollama/api/generate`)
  - 📁 **파일 보관함** → `upload_file.php`, `upload_pdf.php`, `drive.php`
  - 🔗 **짧은 주소·QR** → `short_url.php` (qrcode-generator)
  - 📊 **트래픽 현황** → `traffic_stats.php` (+ traffic_log)
  - (허브 도구 목록) → `hub_tools.php`
  - 로그인 게이트: `login.php`(비밀번호), `logout.php`. `CSRF_TOKEN`(스크랩본은 빈 문자열) 을 업로드/쓰기 요청 `X-CSRF-Token` 헤더로 사용.
- **API 상수** [확인]: `BASE_URL='/mfg'`; `FILE_API=/mfg/api/upload_file.php`, `PDF_API=/mfg/api/upload_pdf.php`, `CL_API=/mfg/api/content_lib.php`, `COURSES_API=/mfg/api/courses.php`, `DV_API=/mfg/api/drive.php`, `FB_API=/mfg/api/feedback.php`, `RV_API=/mfg/api/reviews.php`, `SU_API=/mfg/api/short_url.php`.
- **클라이언트/서버**: `서버 필요` — 전 기능이 위 PHP에 의존. 로그인 게이트. [확인]
- **서버 의존**: 위 §섹션요약의 PHP 1~18 전부 + login/logout. **DataForge 백엔드의 사실상 전체 표면이 여기 모임.**
- **외부 CDN/라이브러리**: Google Fonts, chart.js, pdf.js/pdfjs-dist, qrcode-generator 1.4.4, xlsx/PapaParse, marked, mathjax. 외부 API: jejudatahub 프록시, ollama.
- **특이사항**: **재구현 로드맵의 1순위 문서.** `db_write.php action=db_setup`이 스키마 부트스트랩을 담당 → 여기서 테이블 구조 역설계 가능. `index.php`와 `index.html`이 완전 동일(스크랩이 렌더 결과 저장), `index__logout=1.html`도 동일본.

---

## 재구현 관점 정리 (핵심)

1. **정적으로 즉시 복원 가능(백엔드 0)**: vibe 5, extension 3(+zip 보존), biz, ads, text, sheet, about, privacy, factory_lab 정적 하위(catalog/news/production/maintenance 스크랩본). generators.js 3종은 그대로 재사용.
2. **가벼운 백엔드로 복원**: `traffic_log.php`(로깅), `reviews.php`(목록/등록+허니팟), `feedback.php`, `prompt_lib.php`(카테고리/전체), `sensor/api.php`(15센서 난수), `short_url.php`.
3. **본격 백엔드 필요**: `stream_state.php`+`login.php`(mfg 실시간), `courses.php`/`content_lib.php`/`upload_pdf.php`(lms 강의), `sessions.php`, `drive.php`/`upload_file.php`, `db_write.php`(스키마), `crawl_lab.php`+`crawl_batch.php`, factory_lab `login.php`, `hub_tools.php`, `traffic_stats.php`, `grafana_queries.php`.
4. **admin/index.html이 전체 DB·엔드포인트 계약의 단일 참조본** → 스키마·요청/응답 역설계는 여기서 시작.
