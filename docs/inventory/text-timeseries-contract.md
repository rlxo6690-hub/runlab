# DataForge 서버 계약서 — text.html · timeseries.html

프론트 JS를 정독해 서버 응답이 읽히는 필드를 역설계한 문서. 프론트는 고정, 이 계약대로 Python 백엔드를 재구현한다.

- 출처: `site/sim/text.html` (1040줄), `site/sim/timeseries.html` (1207줄)
- 근거 표기: 모든 필드는 실제 렌더/파싱 코드 라인 인용으로 뒷받침. 추측한 부분은 명시.

---

## JOB 1 — text.html

### 엔드포인트
- **URL**: `/sim/api/text_proxy.php` (절대경로) — text.html:619, 813
- **메서드**: `POST`, 본문은 `FormData` (multipart) — text.html:605~617
- 프론트 설명상 PHP는 프록시이고 실제 실행은 **FastAPI + KoNLPy·scikit-learn·wordcloud** (text.html:182~183 인트로). 계약상 중요한 건 아래 필드.

### 호출 지점 2곳
1. **전체 분석** `runAnalysis()` — text.html:598~629. 모든 필드 전송, `include_*`는 체크박스 상태대로.
2. **워드클라우드만 재생성** `_requestWC()` — text.html:791~820. 모양(shape)·배경(bg) 버튼을 바꿀 때 호출(setWcShape/setWcBg, text.html:822~835). 이때 **`include_tfidf='false'`, `include_ngram='false'`, `include_wordcloud='true'` 로 강제**하고 나머지 파라미터는 현재 UI 값 그대로. 응답에서 `wordcloud_b64` 만 읽는다(text.html:816).

### 요청 필드 (FormData)

| 필드 | 타입(전송) | 기본값 | 가능한 값 / 의미 | 근거 |
|---|---|---|---|---|
| `text` | string | — | 문서들을 `\n`으로 join한 하나의 문자열. **줄바꿈 = 문서 구분자** (TF-IDF는 문서 2개 이상일 때 의미) | 606: `state.texts.join('\n')` |
| `tokenizer` | string | `okt` | `okt` = KoNLPy **Okt**(빠름/기본), `kkma` = KoNLPy **Kkma**(정확/느림). ※Komoran/Mecab 아님 — UI 라벨·인트로태그가 Okt/Kkma만 명시 | 282~285, 185~186 |
| `pos_filter` | string | `noun` | `noun`=명사만 / `noun_adj`=명사+형용사 / `noun_verb`=명사+동사 / `all`=전체(조사·어미 제외) | 289~294 |
| `min_len` | string(정수) | `2` | 최소 글자 수, min 1 max 8. 이 길이 미만 토큰 제거 | 298 |
| `max_words` | string(정수) | `50` | 최대 단어 수, min 10 max 200. freq/wordcloud 상위 N 컷 | 302 |
| `user_stops` | string | `''` | 추가 불용어, **쉼표 구분** (예: `이것, 그것, 회사`) | 306, 611 |
| `include_tfidf` | `'true'`/`'false'` (문자열) | 체크박스 off | TF-IDF 계산 여부. 체크박스 `opt-tfidf` 기본 미체크 | 310, 612 |
| `include_ngram` | `'true'`/`'false'` | 체크박스 **on** | 바이그램 계산 여부. `opt-ngram` 기본 checked | 311, 613 |
| `include_wordcloud` | `'true'`/`'false'` | 체크박스 **on** | 워드클라우드 생성 여부. `opt-wc` 기본 checked | 312, 614 |
| `wordcloud_bg` | string(hex) | `#0a0e17` | 배경색. 버튼: `#0a0e17`(다크·기본) / `#ffffff`(밝게) | 615, 409~410, 771 |
| `wordcloud_shape` | string | `square` | `square`(네모·기본) / `circle`(원) / `heart`(하트). ※circle·heart는 500×500 정사각 PNG로 반환된다고 프론트 주석이 가정(text.html:777) | 616, 404~406, 772 |

> 참고: 프론트에 별도 `include_pos`·`n(gram 차수)` 필드는 없다. 품사 분포(`pos_distribution`)는 항상 반환된다고 가정하고 무조건 렌더한다(renderAll이 조건 없이 renderPOS 호출, text.html:638).

### 응답 (JSON) — 실제로 읽히는 키 전부

렌더 진입점 `renderAll(data)` — text.html:635~652.

#### 실패 규격
```js
const data = await resp.json();
if (data.error) throw new Error(data.error);   // text.html:621
```
- **`error`** (string): 존재하면 에러로 처리. 성공 응답엔 없어야 함. (timeseries의 `ok:false`와 형식이 다름 — text는 `error` 키 방식.)

#### `data.stats` (object) — 지표 5개, text.html:654~662
전부 숫자. `.toLocaleString()` / `.toFixed()` 로 표시.
```
stats.n_docs         // 문서 수 (정수)
stats.total_tokens   // 총 토큰 (정수) — 완료 메시지에도 사용(text.html:624)
stats.unique_words   // 고유 단어 (정수)
stats.avg_chars      // 평균 문서 길이(자) — .toFixed(0), 실수 허용
stats.total_chars    // 총 문자 수 (정수)
```

#### `data.word_freq` (array) — **튜플 배열** `[[word, count], ...]`
빈도 내림차순 정렬 가정. text.html:664~693, 687(`([w,c], i)`), 672(`([,c])`).
- 각 원소 = `[단어:string, 빈도:number]`
- 상위 20개를 막대차트(686: `wordFreq[0][1]`가 최댓값), 전체를 테이블로.
- CSV 저장도 이 구조 사용 — downloadCSV, text.html:849.

#### `data.pos_distribution` (object) — `{품사라벨: 개수}`
text.html:747~768. `Object.keys` / `Object.values`.
- 예: `{"명사": 1234, "형용사": 210, ...}` — 키는 한국어 품사명(도넛 범례에 그대로 표기, 764).
- 값은 정수. 항상 반환(조건 없이 렌더).

#### `data.tfidf` (array) — **객체 배열** `[{word, score}, ...]`  *(조건부)*
`data.tfidf?.length` 있을 때만 탭 표시·렌더 — text.html:641, 645, 695~722.
- 각 원소 = `{ word:string, score:number }`
- `d.score.toFixed(4)` 로 표시(720) → score는 실수.
- 내림차순 정렬 가정, 상위 20 차트.

#### `data.bigrams` (array) — **튜플 배열** `[[word, count], ...]`  *(조건부)*
`data.bigrams?.length` 있을 때만 — text.html:642, 646, 724~745.
- 각 원소 = `[바이그램문자열:string, 빈도:number]`. `([w]) / ([,c])` 로 분해(731~732).
- 바이그램 문자열은 "연속 2-단어 쌍"(라벨 377). 두 단어를 어떻게 이어붙일지(공백?)는 서버 결정 — 프론트는 문자열 그대로 라벨로 표시.

#### `data.wordcloud_b64` (string) — **base64 PNG 본문만**  *(조건부)*
`data.wordcloud_b64` 있을 때만 탭 표시 — text.html:643, 647, 774~789.
```js
img.src = 'data:image/png;base64,' + b64;   // text.html:785
```
- **`data:image/png;base64,` 접두사는 프론트가 붙임** → 서버는 **순수 base64 문자열만** 반환.
- 워드클라우드 전용 재호출(_requestWC)도 같은 키를 읽음(816).

#### 성공 상태 메시지가 참조하는 필드
```js
`분석 완료 · 총 토큰 ${data.stats.total_tokens...} · 고유 단어 ${data.stats.unique_words...}`  // 624
```
→ `stats.total_tokens`, `stats.unique_words` 는 성공 시 항상 존재해야 함.

### JOB1에서 서버가 관여하지 않는 것 (구현 불필요)
- **IPC 코드 분석** 탭 — 전부 클라이언트 JS (`runIpcAnalysis`, text.html:905~944). XLSX 파싱·집계 모두 브라우저. 서버 호출 없음.
- 파일/PDF 파싱(XLSX.js, pdf.js)도 전부 클라이언트. 서버엔 최종 `text` 문자열만 전달.

---

## JOB 2 — timeseries.html

### 엔드포인트
- **URL**: `api/timeseries_calc.php` (상대경로 → 실제 `/sim/api/timeseries_calc.php`) — timeseries.html:647
- **메서드**: `POST`, `Content-Type: application/json`
- **본문**: `JSON.stringify({ action, data, params })` — timeseries.html:647

```js
body: JSON.stringify({ action, data: state.data, params })
```
- `data`: number[] — 원본 시계열 값 배열 (state.data). 라벨은 클라이언트가 `t1..tN`로 생성하므로 전송 안 함.
- `params`: action별 파라미터 객체(아래).

### ★ 서버로 가는 action은 6개뿐
디스패처 `runModel()` — timeseries.html:625~630:
```js
if (m === 'arima') await runARIMA();   // ← Pyodide(클라), 서버 아님
else await runPHP(m);                  // ← 서버
```
`runPHP(action)` 이 보내는 action: **`sma`, `ema`, `ses`, `holt`, `holt_winters`, `ar`** — timeseries.html:635~657.

**서버로 가지 않는 것 (명시):**
- **ARIMA** — 클라이언트 **Pyodide**(브라우저 내 statsmodels). ARIMA_PY 스크립트가 브라우저에서 ADF·ACF·PACF·fit·forecast·AIC·BIC를 다 계산. timeseries.html:678~735. **서버 구현 대상 아님.**
- **ACF / PACF 패널** (하단 "상관 분석" → ACF/PACF 탭) — 순수 JS `computeACF`/`computePACF`(Durbin-Levinson). timeseries.html:983~1015, 1035~1067. 서버 호출 없음.
- **CCF 패널** (교차상관) — 순수 JS `computeCCF`. timeseries.html:1018~1033, 1069~1111. 서버 호출 없음.
- **분해(decomposition)** — 프론트에 해당 기능·action 자체가 없음.

### action별 `params` 구조 — timeseries.html:637~644

공통: `params.forecast` = 예측 스텝 수(정수, UI `forecast-h` 기본 20, 없으면 10). timeseries.html:637.

| action | params 필드 | 기본값(UI) | 근거 |
|---|---|---|---|
| `sma` | `window`(정수), `forecast` | window 5 | 639, 232 |
| `ema` | `span`(정수), `forecast` | span 5 | 640, 237 |
| `ses` | `alpha`(실수), `forecast` | α 0.3 | 641, 242 |
| `holt` | `alpha`, `beta`(실수), `forecast` | α 0.3, β 0.1 | 642, 247~248 |
| `holt_winters` | `alpha`, `beta`, `gamma`, `period`(정수), `forecast` | α 0.3, β 0.1, γ 0.2, m 12 | 643, 253~256 |
| `ar` | `p`(정수), `forecast` | p 2 | 644, 261 |

> 모든 숫자는 `+document.getElementById(...).value` 로 number 변환 후 전송 → JSON에서 number.

### 응답 (JSON) — runPHP가 읽는 필드, timeseries.html:648~654

```js
const d = await res.json();
if (!d.ok) { setStatus(d.msg || '오류 발생', 'err'); return; }   // 649
updateMainChart(d.fitted, d.forecast);   // 650
showMetrics(d.metrics, null);            // 651
showMeta(d.meta || {});                  // 652
showDetailTable(d.fitted, d.forecast);   // 653
```

#### 실패 규격
```json
{ "ok": false, "msg": "에러 메시지" }
```
- **`ok`** (bool): `false`면 실패 처리. `msg` 없으면 "오류 발생" 기본 표시. — timeseries.html:649
- 성공 시 `ok: true` 필요.

#### 성공 응답 필드

**`fitted`** (array, 길이 = `data.length`) — 적합값
- 원본과 1:1 정렬. **워밍업 구간은 `null` 허용** (예: SMA 앞 window-1개). showDetailTable이 `null/undefined/NaN`을 "—"로 처리 — timeseries.html:871~876.
- 차트에서 원본과 같은 x축에 겹쳐 그림 — 785(`fittedPad`).

**`forecast`** (array, 길이 = `params.forecast`) — 미래 예측값
- 전부 유효 숫자. 차트에서 마지막 실제값에 이어 그림 — 786(`fcstPad = [...null(n-1), data[n-1], ...forecast]`).
- 상세 테이블 예측 구간에 f1..fH로 표시 — 897~904.

**`metrics`** (object) — 지표, showMetrics, timeseries.html:840~846
```
metrics.rmse   // 숫자, 그대로 표시
metrics.mae    // 숫자, 그대로 표시
metrics.mape   // 숫자(%값), 표시 시 '%' 붙임: m.mape+'%'
```
- 셋 다 `?? '-'` 널가드 있음 → 없으면 '-' 표시되지만, 정상 응답이면 채울 것.
- **AIC는 PHP 모델에서 서버가 주지 않음** — `showMetrics(d.metrics, null)` 로 aic 자리에 `null` 고정(651). AIC 칸은 '-'로 표시됨. (AIC는 ARIMA(Pyodide) 전용.)

**`meta`** (object, optional) — 모델 파라미터 요약 표, showMeta, timeseries.html:847~853
```js
Object.entries(meta).map(([k,v]) =>
  `<tr><td>${k}</td><td>${Array.isArray(v) ? v.join(', ') : v}</td></tr>`)
```
- `{키: 값}` 자유 형식. **값이 배열이면 `', '`로 join**. 비어있으면(`{}`) 표 숨김.
- 무엇을 넣을지는 서버 자유 (예: 사용한 계수, window, 모델식 등). 프론트는 있는 그대로 key/value 나열만 함.

> 상세 오차 테이블(RMSE/MAE/MAPE 재계산)과 예측차트 padding은 전부 `fitted`+`forecast`+원본 `data`만으로 클라이언트가 계산 — 서버는 위 4개 키(ok, fitted, forecast, metrics)+선택 meta 만 정확히 주면 됨. `msg`는 실패 시.

### 참고: ARIMA(Pyodide) 응답 형태 — 서버 아님, 재구현 대상 아니나 대조용
ARIMA_PY가 브라우저에서 만드는 dict (timeseries.html:682~708): `ok`, `error`, `fitted`, `forecast`, `aic`, `bic`, `adf`{statistic,pvalue,critical_1,critical_5,is_stationary}, `acf`[], `pacf`[]. 이건 클라이언트가 자체 생성하므로 백엔드와 무관.

---

## 두 엔드포인트 요약

| | text_proxy.php | timeseries_calc.php |
|---|---|---|
| 본문 | FormData (multipart) | JSON `{action,data,params}` |
| 성공 판정 | `data.error` 없음 | `data.ok === true` |
| 실패 형식 | `{error: "..."}` | `{ok:false, msg:"..."}` |
| 핵심 응답 | stats, word_freq[[w,c]], pos_distribution{}, tfidf[{word,score}], bigrams[[w,c]], wordcloud_b64 | fitted[], forecast[], metrics{rmse,mae,mape}, meta{} |
| action/모드 | 단일(옵션 플래그로 분기) + wordcloud 전용 재호출 | sma/ema/ses/holt/holt_winters/ar (6개) |
