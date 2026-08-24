# /work 섹션 인벤토리 — DataForge 업무 생산성 도구

> 소스: `/Users/user/Desktop/태태/dataforge-복구/site/work/*.html` (13개, 전부 인라인 JS 자체 완결형)
> 도메인: `https://dataforge.ai.kr` · 근거는 모두 **[확인]** (파일 직접 열람)

## 섹션 요약

- **총 페이지 수: 13개**
- **클라이언트 전용: 9개** — char_count, markdown, image_resize, pdf_compress, pdf_maker, pdf_splitter, pdf_unlock, pdf_ppt, proposal
- **서버 필요: 4개** — ocr, youtube_dl, ppt_pdf, ppt_font
- 주의: 클라이언트 전용 9개도 **모두** 분석용 비콘 `/mfg/api/traffic_log.php`를 1회 호출하지만, 이는 통계용일 뿐 **도구 기능과 무관**(없어도 도구는 동작). 위 분류는 "도구의 핵심 기능이 백엔드를 필요로 하는가" 기준.

### 백엔드 PHP 엔드포인트 (dedup)
| 엔드포인트 | 쓰는 페이지 | 역할 |
|---|---|---|
| `/mfg/api/traffic_log.php` | **전 페이지(13)** | 세션당 1회 방문 로그 (POST `service=work&page=<경로>`). 기능과 무관 |
| `/work/api/ocr_proxy.php` | ocr | 이미지 업로드 → OCR 처리 → JSON 반환 |
| `/work/api/youtube_dl.php` | youtube_dl | `?action=info|start|status|fetch` — yt-dlp 잡 오케스트레이션 |
| `/work/api/ppt_pdf_proxy.php` | ppt_pdf | `?action=fonts|chunk|finalize|download` — PPT→PDF 변환(LibreOffice 계열 추정) |
| `/work/api/ppt_proxy.php` | ppt_font | `?action=chunk|finalize|download` — PPT 폰트 일괄 교체 |

### 외부 CDN / 라이브러리 (dedup, 버전 포함)
| 라이브러리·버전 | 호스트 | 쓰는 페이지 |
|---|---|---|
| Google Fonts (Noto Sans KR, Space Mono) | fonts.googleapis / fonts.gstatic | **전 페이지** |
| marked **@9** (`marked.min.js`) | cdn.jsdelivr.net | markdown |
| JSZip **3.10.1** | cdnjs.cloudflare.com | image_resize, pdf_splitter, pdf_maker, ppt_pdf |
| pdf.js **3.4.120** (`pdf.min.js` + `pdf.worker.min.js`) | cdnjs.cloudflare.com | pdf_ppt, pdf_compress, pdf_splitter, pdf_maker, pdf_unlock, proposal |
| pptxgenjs **3.12.0** (`pptxgen.bundle.js`) | cdn.jsdelivr.net | pdf_ppt |
| pdf-lib **1.17.1** (`pdf-lib.min.js`) | unpkg.com | pdf_compress, pdf_splitter, pdf_maker, proposal |

### 자체 호스팅 에셋 (CDN 아님 — 서버에 파일 존재해야 함)
- `/work/vendor/qpdf.js` + `/work/vendor/qpdf.wasm` — pdf_unlock 전용 WASM 엔진 (약 1.3MB, 최초 1회 지연 로드)
- `/mfg/js/promo.js` — **전 페이지** 공통 프로모 스크립트 (`defer`)
- `/img/mfg.png` (favicon), `/img/OG_IMAGE.jpg` (OG) — 전 페이지

---

### /work/char_count — 실시간 글자수·바이트·원고지 카운터
- **기능**:
  - textarea에 입력/붙여넣기 시 **띄어쓰기 포함/제외 글자수**를 실시간 표시 (코드포인트 단위 → 이모지·조합문자 1자 처리).
  - 보조 통계: 공백 개수, 단어 수, 줄 수, 문단 수, 문장 수, 원고지 매수(200자 올림), **2바이트(EUC-KR) 바이트**, **UTF-8 바이트** 동시 표시.
  - 목표 글자수 입력 → 기준 선택(포함/제외/2바이트/UTF-8)별 진행바 + 남음/초과 안내.
  - 선택 영역 글자수 표시, 전체 복사, 모두 지우기, `.txt/.md/.csv` 파일 불러오기(FileReader UTF-8).
- **클라이언트/서버**: `클라이언트 전용`. 모든 계산이 브라우저 JS. 백엔드 호출은 traffic_log 비콘뿐.
- **서버 의존**: 없음 (traffic_log 제외).
- **외부 CDN/라이브러리**: Google Fonts만.
- **특이사항**: 입력 5만자 초과 시 120ms 디바운스. 2바이트 계산은 codePoint>127 판정(단순 규칙). 복사 실패 시 `execCommand('copy')` 폴백.

### /work/markdown — 마크다운 → 한글(HWP) 서식 유지 변환기
- **기능**:
  - 좌측 마크다운 입력 → 우측 실시간 HTML 프리뷰(marked, `breaks:true, gfm:true`).
  - **한글용 복사**: 프리뷰를 인라인 스타일로 재구성한 HTML을 클립보드에 `text/html`+`text/plain` 동시 기록 → HWP에 Ctrl+V 시 서식 유지.
  - **텍스트 복사**: 마크다운 기호 제거한 순수 텍스트(innerText).
  - 표 컬럼 폭을 렌더된 실제 px 비율로 환산해 고정(HWP 붙여넣기 대응), 리스트 불릿을 depth별 문자(•◦▸)/번호로 수동 전개.
  - Ctrl+Enter 빠른 복사, 지우기.
- **클라이언트/서버**: `클라이언트 전용`. 변환·클립보드 처리 전부 브라우저.
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: **marked@9** (jsdelivr), Google Fonts.
- **특이사항**: `ClipboardItem`로 리치 HTML 클립보드 write, 미지원 시 hidden div + Range 선택 + `execCommand('copy')` 폴백. 인라인 스타일 재구성 로직(buildInlinedHTML)이 핵심 — 재구현 시 이 스타일 매핑을 그대로 옮겨야 HWP 결과가 같음.

### /work/image_resize — 이미지 리사이즈·형식 변환·이어붙이기
- **기능**:
  - 여러 이미지 동시 업로드 → 크기 변경 + **JPG/PNG/WEBP** 형식 변환(canvas `toBlob`).
  - 개별 저장, **ZIP 일괄 저장**(JSZip), 여러 장을 **한 장으로 이어붙여**(stitch/merge) 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. "서버 업로드 없이 브라우저에서 직접 처리" 명시. canvas + JSZip.
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: **JSZip 3.10.1** (cdnjs), Google Fonts.
- **특이사항**: canvas `toDataURL/toBlob` 기반이라 대용량·다량 처리 시 메모리 주의. 형식별 품질/투명도 처리(PNG 투명, JPG 배경) 재현 필요.

### /work/pdf_compress — PDF 용량 축소 (래스터 재압축)
- **기능**:
  - PDF 각 페이지를 pdf.js로 렌더 → canvas → **JPEG로 재인코딩**(품질 슬라이더) → pdf-lib로 새 PDF 조립.
  - 이미지 비율 높은 PDF에 효과적, 텍스트 위주 PDF는 효율 낮음(안내 문구 있음).
- **클라이언트/서버**: `클라이언트 전용`. "서버 업로드 없이 브라우저에서 직접" 명시.
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: **pdf-lib 1.17.1** (unpkg), **pdf.js 3.4.120** + worker (cdnjs), Google Fonts.
- **특이사항**: pdf.js **worker를 CDN(cdnjs)에서 로드** — 오프라인/CSP 재구현 시 worker 경로 확인 필수. 렌더 scale × JPEG quality가 압축률 결정. 텍스트가 이미지화되어 검색·복사 불가로 바뀜.

### /work/pdf_maker — PDF 도구 (이미지↔PDF 양방향, 탭 UI)
- **기능**:
  - **이미지 → PDF** 탭: 여러 이미지를 한 PDF로 병합(pdf-lib `embedJpg/embedPng` + `addPage`).
  - **PDF → 이미지** 탭: PDF 페이지를 pdf.js로 렌더 → canvas `toBlob` → 이미지 저장, 다중은 **ZIP**(JSZip).
- **클라이언트/서버**: `클라이언트 전용`. "모든 처리는 브라우저에서, 파일 외부 전송 없음" 명시.
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: **pdf-lib 1.17.1** (unpkg), **pdf.js 3.4.120** + worker (cdnjs), **JSZip 3.10.1** (cdnjs), Google Fonts.
- **특이사항**: pdf.js worker CDN 로드(라인 507). 페이지 크기/이미지 맞춤 로직 재현 필요.

### /work/pdf_splitter — PDF 페이지 분할
- **기능**:
  - PDF 업로드 → pdf.js로 페이지 썸네일 렌더 → 클릭 선택 / 범위 입력 / 전체 1장씩 분리.
  - pdf-lib `PDFDocument.load` → 새 문서에 `copyPages` → `save()`. 다중 결과는 **ZIP**(JSZip).
- **클라이언트/서버**: `클라이언트 전용`. "서버 업로드 없이 브라우저에서 직접" 명시.
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: **pdf-lib 1.17.1** (unpkg), **pdf.js 3.4.120** + worker (cdnjs), **JSZip 3.10.1** (cdnjs), Google Fonts.
- **특이사항**: pdf.js worker CDN 로드(라인 482). 원본 텍스트·벡터 유지(래스터화 아님) — pdf_compress와 달리 copyPages로 구조 보존.

### /work/pdf_unlock — PDF 암호·제한 제거 (qpdf WASM)
- **기능**:
  - PDF 업로드 → 열기 암호 입력(필요 시) → **qpdf(WASM) `--decrypt`**로 암호화 제거, 문서 구조는 그대로 유지.
  - 절차: pdf.js로 암호 검증 → qpdf 로드 → 복호화 → 결과를 pdf.js로 재검증(numPages·getPermissions) + 미리보기 → 다운로드.
- **클라이언트/서버**: `클라이언트 전용`. "서버 업로드 없이 브라우저에서" 명시. 처리는 **WASM 로컬 실행**.
- **서버 의존**: 백엔드 API 없음. 단, **정적 에셋 `/work/vendor/qpdf.js` + `/work/vendor/qpdf.wasm`가 서버에 존재해야 함**(자체 호스팅).
- **외부 CDN/라이브러리**: **pdf.js 3.4.120** + worker (cdnjs), Google Fonts. + 자체호스팅 qpdf WASM.
- **특이사항**: **재구현 시 qpdf.js(UMD, 전역 `Module` 팩토리) + qpdf.wasm 번들을 반드시 복구·재배치**해야 함(현재 소실된 백엔드와 별개의 정적 파일). 최초 1회 script 태그 동적 삽입으로 지연 로드. `PasswordException` 처리, qpdf 종료코드로 실패 판정. pdf-lib은 안 씀(pdf.js만).

### /work/pdf_ppt — PDF → PPT(PPTX) 변환 (페이지=슬라이드 이미지)
- **기능**:
  - PDF 각 페이지를 pdf.js로 렌더 → canvas `toDataURL` → **pptxgenjs**로 슬라이드마다 전체화면 이미지 배치 → `.pptx` 생성.
  - 페이지 비율에 맞춘 커스텀 레이아웃(defineLayout) 사용.
- **클라이언트/서버**: `클라이언트 전용`. "서버 업로드 없이 브라우저에서 직접 PDF를 PPTX로" 명시.
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: **pdf.js 3.4.120** + worker (cdnjs), **pptxgenjs 3.12.0** (jsdelivr), Google Fonts.
- **특이사항**: 각 슬라이드는 **이미지**(편집 불가 텍스트 아님). pdf.js worker CDN. 렌더 해상도가 결과 슬라이드 화질 결정.

### /work/proposal — 문서 작성기 (제안서/타임테이블 + 디자인 위 텍스트 배치)
- **기능**:
  - **제안서 탭**: A4 세로 / PPT 가로 포맷, 템플릿(사업 제안서·기획안·보고서·빈 양식) 선택, 문서정보(제목·제출처·담당자 등)+내용(배경·목표·추진·기대효과·예산) 입력 → 실시간 프리뷰. 타임테이블(시작/종료/시간단위/탭구분 컬럼) 자동 표 생성. **`printProposal()` = 브라우저 인쇄(Ctrl+P) 로 PDF 저장**.
  - **디자인 업로드 탭**: 이미지/PDF(pdf.js로 렌더) 배경 위에 드래그·리사이즈 가능한 **contenteditable 텍스트 박스** 자유 배치(글자크기·색·굵기·폰트·배경). → **PDF 내보내기**(pdf-lib: 배경 embed + `drawText`) / **PNG 내보내기**(canvas `fillText`).
- **클라이언트/서버**: `클라이언트 전용`. 서버 호출 없음(라인 788 `fetch`는 **data: URL을 arrayBuffer로 읽는 용도**이지 네트워크 아님).
- **서버 의존**: 없음.
- **외부 CDN/라이브러리**: **pdf-lib 1.17.1** (unpkg), **pdf.js 3.4.120** + worker (cdnjs), Google Fonts.
- **특이사항 (중요)**: pdf-lib `drawText`는 **기본 StandardFont라 한글 미지원** — 디자인 PDF 내보내기에서 한글 줄은 `try/catch`로 **조용히 누락**됨. **한글은 PNG 내보내기(canvas)에서만 정상 렌더**. 재구현 시 한글 PDF가 필요하면 pdf-lib에 한글 폰트 embed(fontkit) 추가 필요. 제안서 PDF는 별도 라이브러리 없이 `window.print` 의존.

---

### /work/ocr — 사진 텍스트 추출 (OCR, 서버 프록시)
- **기능**:
  - 이미지 업로드(파일선택/드래그/**Ctrl+V 붙여넣기**) → 서버 OCR → 한글·영문·숫자 인식.
  - 결과: 전체 텍스트(편집 가능 textarea), 인식 줄 수·글자 수·**평균 신뢰도**·처리시간, 원본 위에 **인식 영역 박스**(canvas) 오버레이, **줄별 신뢰도** 목록(high/mid/low 배지).
  - 복사, TXT 다운로드, 새 이미지.
- **클라이언트/서버**: **`서버 필요`**. 브라우저는 전처리(리사이즈·JPEG 재인코딩)만, 실제 인식은 백엔드 프록시가 수행.
- **서버 의존**:
  - `POST /work/api/ocr_proxy.php` — `multipart/form-data`, 필드 `image`(blob). XHR, timeout 180s.
  - 기대 응답(JSON): `{ full_text, lines:[{text, score(0~1), box:[x1,y1,x2,y2]}], width, height, elapsed, error? }`. `error` 있으면 실패 표시.
- **외부 CDN/라이브러리**: Google Fonts만(인식은 서버).
- **특이사항**: 업로드 전 클라이언트 축소 — `MAX_SIDE=3200px` 초과 또는 4MB 초과 시 canvas로 JPEG(0.92) 재인코딩, 미리보기 좌표계도 축소본 기준. 상한 25MB. HEIC(아이폰) 디코드 실패 시 전용 안내. **박스 좌표는 서버가 돌려준 width/height 기준** — 재구현 시 프록시가 이 스키마를 그대로 반환해야 프론트가 동작.

### /work/youtube_dl — 유튜브 영상 다운로드 (yt-dlp 잡, 서버)
- **기능**:
  - URL 입력 → 정보 조회(썸네일·제목·길이·업로더·조회수, 720p 가용여부) → 형식 선택(**최고화질 MP4 / 720p MP4 / MP3**) → 다운로드.
  - 진행 폴링(퍼센트·속도·ETA), "파일 병합 중" 단계, 완료 후 파일 크기 표시 → 저장.
- **클라이언트/서버**: **`서버 필요`**. yt-dlp류 백엔드 필수.
- **서버 의존** (`/work/api/youtube_dl.php`, 전부 form-urlencoded):
  - `POST ?action=info` body `url=` → `{ thumbnail, title, duration(초), uploader, view_count, has720, error? }`.
  - `POST ?action=start` body `url=&format=(best|720p|mp3)` → `{ job, error? }`.
  - `GET ?action=status&job=<id>` → `{ status:'processing'|'merging'|'done'|'error', percent, speed, eta, size, message }`.
  - `GET ?action=fetch&job=<id>` → 실제 파일 스트리밍(다운로드 트리거, `<a>.click()`).
- **외부 CDN/라이브러리**: Google Fonts만.
- **특이사항**: 프론트는 1.5s 간격 폴링. 재구현 시 잡 큐 + status 스키마(percent/merging/done/size) 그대로 맞춰야 함. (저작권/약관 이슈는 별개 검토 필요.)

### /work/ppt_pdf — PPT → PDF 변환 (원본 폰트 유지, 서버 변환)
- **기능**:
  - `.pptx/.ppt/.ppsx/.pps/.odp` 업로드 → 서버에서 PDF 변환. **원본/임베드 폰트 유지, 한글 안 깨짐** 강조.
  - 업로드 전 브라우저에서 **PPTX 내부 폰트 스캔**(JSZip으로 zip 열어 슬라이드/테마 XML의 `typeface=` 수집, 테마 script 폰트·`+`시작 제외, 임베드 `.fntdata` 카운트) → 서버 폰트 목록과 대조해 **그대로/호환폰트/파일포함/대체** 상태를 칩으로 사전 표시.
  - 옵션: 대체 폰트, 이미지 품질, 임베드 폰트 사용, 발표자 노트 내보내기, 자간 보정.
- **클라이언트/서버**: **`서버 필요`**. 변환은 백엔드(LibreOffice/headless 계열 추정), 폰트 스캔만 클라이언트.
- **서버 의존** (`/work/api/ppt_pdf_proxy.php`):
  - `GET ?action=fonts` → `{ fonts:[...], default:'<fontconfig 기본>' }` (설치 폰트 목록).
  - `GET ?action=fonts&probe=<name1|name2...>` → `{ resolved:{name:실제렌더폰트}, default }`.
  - `POST ?action=chunk` (multipart) `upload_id, chunk_index, total_chunks, chunk` — **10MB 청크 업로드**(카페24 post_max_size 25M 대응).
  - `POST ?action=finalize` (multipart) `upload_id, filename, fallback_font, image_quality, use_embedded, export_notes, fix_spacing` → `{ token, filename, size, error? }`.
  - `GET ?action=download&token=<t>` → PDF 스트리밍.
- **외부 CDN/라이브러리**: **JSZip 3.10.1** (cdnjs, 폰트 스캔용), Google Fonts.
- **특이사항**: 파일 상한 200MB, 청크 10MB. 결과물·업로드 10분 후 만료·자동삭제 안내. 서버 폰트 세트가 변환 품질을 좌우 — 재구현 시 fonts/probe 두 액션과 청크 프로토콜을 반드시 재현.

### /work/ppt_font — PPT 폰트 일괄 변경 (서버, "ML 서버")
- **기능**:
  - PPT 업로드 → 프리셋 폰트 라디오 선택 또는 커스텀 폰트명 입력 → 파일 전체 폰트를 그 폰트로 일괄 교체한 PPT 다운로드.
- **클라이언트/서버**: **`서버 필요`**. 코드 주석상 "폰트 변환(ML 서버)" — 백엔드가 실제 교체 수행.
- **서버 의존** (`/work/api/ppt_proxy.php`, ppt_pdf와 동일한 청크 패턴):
  - `POST ?action=chunk` (multipart) `upload_id, chunk_index, total_chunks, chunk` — 10MB 청크 업로드.
  - `POST ?action=finalize` (multipart) `upload_id, font_name, filename` → `{ token, filename, error? }`.
  - `GET ?action=download&token=<t>` → 변경된 파일 스트리밍.
- **외부 CDN/라이브러리**: Google Fonts만. (JSZip 스크립트 태그는 없음 — `setFile`/`fmtSize`/청크 로직만 사용.)
- **특이사항**: ppt_pdf와 프록시 구조(청크→finalize→token 다운로드)가 쌍둥이. `CHUNK_SIZE=10MB`. 재구현 시 finalize의 `font_name` 처리 + 원본 서식 유지가 핵심.
