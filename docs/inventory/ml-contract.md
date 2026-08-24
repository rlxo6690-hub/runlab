# ML 시뮬레이터 서버 응답 계약서 (`sim/ml.html`)

> 출처: `/Users/user/Desktop/태태/dataforge-복구/site/sim/ml.html` 인라인 JS 정독.
> 요청: `POST /sim/api/ml_proxy.php?algo=<algo>`, `multipart/form-data`.
> 이 문서의 모든 필드는 **renderResults / metricsCompareHtml / dataCountsHtml / featureImportanceChart / getParams** 실제 코드에서 확인한 것 [확인].

---

## ⚠️ 먼저 — "9종" 중 실제 서버 호출은 7종뿐

프론트가 서버로 `fetch` 하는 경로는 **파일 전체에서 딱 하나** (ml.html:1716, `runAlgo` 내부)이고, 그 요청 본문은 `getParams(algo)`가 만든다. `getParams`의 `switch`는 **7개 케이스만** 있다:

`kmeans, knn, linear, logistic, dtree, rforest, xgboost` — 이 7종만 서버 응답 계약이 존재한다. [확인]

- **`lightgbm`** (`panel-lightgbm`) — 서버 호출 없음. 순수 클라이언트 인터랙티브 데모(결정경계 시각화)이고, 실제 학습은 별도 페이지 `/sim/lightgbm`으로 링크만 걸어둠(ml.html:1580). `getParams`에 케이스 없음, `renderResults`가 처리하지 않음. **재구현할 응답 계약 없음.** (서버에 lightgbm을 새로 추가한다면 응답 형태는 xgboost와 동일하게 만들면 됨 — feature_importances + 분류/회귀 metrics.)
- **`metrics`** (`panel-metrics`, "평가지표 시뮬레이터") — 서버 호출 없음. 사용자가 TP/FP/FN/TN을 입력하면 **브라우저에서** confusion matrix·Precision·Recall·Specificity·F1·ROC/AUC를 계산해 그리는 교육용 계산기(`cmUpdate`/`cmRenderBars`/`cmDrawROC`, ml.html:3786~). `getParams`·`renderResults` 무관. **재구현할 응답 계약 없음.**

> 참고: 현재 ml.html은 "[실습 폴딩]"(ml.html:1663) 상태라 업로드/파라미터 입력 UI(`train-file-*`, `km-k`, `knn-k` 등 `<input>`)와 실행 버튼이 `_archive/ml_upload/`로 이관되어 **이 파일에는 없다.** 하지만 계약을 정의하는 JS 함수(`runAlgo`/`getParams`/`renderResults`)는 그대로 남아 있어 계약서 작성에 필요한 정보는 전부 확보됨. 파라미터 **기본값**은 입력 엘리먼트와 함께 archive로 빠져 이 파일에서 복구 불가 → 아래 기본값은 sklearn 표준값 기준 [짐작]으로 표기(Python 코드 템플릿 `buildPyCode`로 교차확인한 것은 [확인]).

---

## 공통 응답 골격 (7종 전부 공유)

`runAlgo`(1716~1719): 응답을 `data`로 파싱 → **`data.error`가 있으면 즉시 throw**(그 문자열이 사용자에게 표시됨). 없으면 `renderResults(algo, data, container)` 호출.

| 필드 | 타입 | 용도 (코드 위치) |
|---|---|---|
| `error` | string \| 없음 | 있으면 실행 중단·오류 표시. 정상 응답엔 없어야 함 (1718) |
| `algorithm` | string | 상태바 표시용 라벨. 예 `"K-Means"`, `"XGBoost"` (1800) |
| `n_train` | int | TRAIN 행 수 pill + 상태바 (1778, 1800) |
| `n_val` | int (0 또는 생략 = 검증셋 없음) | `>0`일 때만 VAL 관련 UI 표시 (1776, 1799) |
| `n_test` | int | TEST 행 수 pill + 상태바 (1780, 1801) |
| `train_metrics` | object `{metricKey: number}` | 지표표 TRAIN 열. **표시할 지표 키의 원천**(여기 있는 키만 표에 뜸) (1742, 1746) |
| `val_metrics` | object \| null | 지표표 VAL 열. `n_val>0`이면 채움, 아니면 null (1743) |
| `test_metrics` | object `{metricKey: number}` | 지표표 TEST 열 (1744) |

### 지표(metric) 키 규약 — `train_metrics`/`val_metrics`/`test_metrics` 안의 키

표는 `train_metrics`의 키를 순회(`Object.keys(tm)`)하고, 같은 키로 val/test를 조회한다. 특정 열에 그 키가 없으면 `—` 표시. 코드가 **라벨을 아는 키**(metricLabel, 1734):

| 키 | 라벨 | 높을수록 좋음? (색상 규칙) |
|---|---|---|
| `accuracy` | Accuracy | ✅ (test 열: ≥0.9 정상 / ≥0.7 warn / 그외 bad) |
| `f1_score` | F1 Score (weighted) | ✅ |
| `r2_score` | R² Score | ✅ |
| `rmse` | RMSE | — (색상 없음) |
| `mae` | MAE | — |
| `inertia` | Inertia | — |
| `silhouette_score` | Silhouette Score | ✅ |

- 모르는 키를 보내도 표엔 뜬다(라벨은 키 원문 그대로). 색상 강조(warn/bad)는 `higherBetter` 집합(`accuracy,f1_score,r2_score,silhouette_score`)에만, **TEST 열에만** 적용(1739, 1752, 1769).
- 값은 `Number(v).toLocaleString(maximumFractionDigits:4)`로 포맷(1731). 숫자여야 함. null/undefined → `—`.

### 분류 vs 회귀 자동 판정 (지표 종류를 결정)

`knn, dtree, rforest, xgboost`는 타깃의 고유값 수로 분기(`buildPyCode` 기준 [확인], ml.html:1990/2115/2172/2228):

```
is_clf = y_train.nunique() <= 20   # 20 이하 → 분류, 초과 → 회귀
```

- **분류**면 metrics = `{accuracy, f1_score}` (f1은 `average='weighted'`).
- **회귀**면 metrics = `{r2_score, rmse}` (rmse = √mse).

`logistic`은 항상 분류(`{accuracy, f1_score}`), `linear`은 항상 회귀(`{r2_score, rmse, mae}`), `kmeans`는 `{inertia, silhouette_score}`(단 test엔 inertia 없이 silhouette만 오는 게 자연스러움).

### 데이터 카운트 pill (`dataCountsHtml`, 1775)
`n_train`, `n_val`(>0일 때만), `n_test` — 위 공통 필드 재사용. 추가 필드 없음.

---

## algo=kmeans

### 요청 파라미터 (`getParams`, 1670)
| 필드 | 소스 | 타입 | 기본값 | 비고 |
|---|---|---|---|---|
| `n_clusters` | `km-k` | int(문자열로 전송) | 3~5 [짐작] | KMeans `n_clusters` |
| `max_iter` | `km-iter` | int | 300 [짐작] | |
| `n_init` | `km-ninit` | int | 10 [확인, 툴팁 명시] | |
| `scale` | `km-scale`(체크박스) | bool→`'true'`/`'false'` | — | true면 StandardScaler 적용 |

- **타깃 없음**(비지도). 수치형 컬럼 전체 사용(`select_dtypes(include='number')`, 1945).
- 파일: **train 필수 + test 필수**, val 선택(공통).

### 응답 필드 (공통 골격 + 아래 kmeans 전용)
| 필드 | 구조 | 용도 (코드) |
|---|---|---|
| `train_metrics` | `{inertia:float, silhouette_score:float}` | 지표표 |
| `test_metrics` | `{silhouette_score:float}` (inertia는 test에 없음이 자연) | 지표표 |
| `columns` | `[str]` (수치형 컬럼명 배열, ≥2여야 산점도 그림) | 산점도 축 = `columns[0]` vs `columns[1]` (1815, 1872) |
| `sample` | `[ {<col0>:num, <col1>:num, …, cluster:int} ]` | 산점도 점. 각 원소는 컬럼값 키 + `cluster` 정수 키. `r[columns[0]]`=x, `r[columns[1]]`=y, `r.cluster`로 필터 (1872) |
| `cluster_counts` | object `{"0":int,"1":int,…}` | 클러스터 개수 → 도넛차트 + 산점도 클러스터 개수(`Object.keys(...).length`) (1868, 1886) |
| `centers` | `[ {<col>:num, …} ]` (클러스터별 1행, 원본 스케일) | 중심값 표. `Object.keys(centers[0])`=컬럼명, 각 행 값 `.toFixed(3)` (1824~1829) |

### 차트/시각화
- **산점도(scatter)** `scatter-kmeans`: `d.sample`을 `cluster`별로 그룹화, `x=r[columns[0]] y=r[columns[1]]`. 클러스터 수 = `Object.keys(cluster_counts).length`. `columns.length>=2`일 때만 (1867~1883).
- **도넛(doughnut)** `pie-kmeans`: 라벨=`Cluster {키}`, 값=`Object.values(cluster_counts)` (1885~1896).
- **표**: 클러스터 중심값 표(`centers`).
- feature_importances / coefficients 없음 → 그 차트들은 안 뜸.

---

## algo=knn

### 요청 파라미터 (`getParams`, 1671)
| 필드 | 소스 | 타입 | 기본값 | 비고 |
|---|---|---|---|---|
| `target` | `knn-target` | str (컬럼명) | 마지막 컬럼 [짐작] | 예측 대상 |
| `n_neighbors` | `knn-k` | int | 5 [짐작] | |
| `weights` | `knn-weights` | str | `uniform` | `uniform`\|`distance` |
| `metric` | `knn-metric` | str | `minkowski` [짐작] | 거리 척도 |

- 파일: train 필수 + test 필수, val 선택.
- 분류/회귀는 `target` 고유값 ≤20으로 서버가 판정.

### 응답 필드
- 공통 골격만. 분류면 `*_metrics = {accuracy, f1_score}`, 회귀면 `{r2_score, rmse}`.
- **feature_importances 없음, coefficients 없음, centers/sample 없음** → 지표표 + 데이터 카운트만 렌더. 차트 영역(`chart-row`)은 비어 표시됨.

### 차트/시각화
- 서버 응답 기반 차트 **없음**. (지표표만.)

---

## algo=linear

### 요청 파라미터 (`getParams`, 1672)
| 필드 | 소스 | 타입 | 기본값 | 비고 |
|---|---|---|---|---|
| `target` | `linear-target` | str | 마지막 컬럼 [짐작] | |
| `model_type` | `linear-type` | str | `linear` | `linear`(LinearRegression)\|`ridge`\|`lasso` |
| `alpha` | `linear-alpha` | float | 1.0 [짐작] | ridge/lasso에서만 사용 |

- 파일: train 필수 + test 필수, val 선택. **항상 회귀.**

### 응답 필드 (공통 + 전용)
| 필드 | 구조 | 용도 |
|---|---|---|
| `train_metrics`/`test_metrics` | `{r2_score, rmse, mae}` | 지표표 |
| `coefficients` | **flat object** `{featureName: number}` | 회귀계수 (1) 가로 막대차트, (2) 정렬 표 |
| `intercept` | float | 계수 표 카드 제목의 "절편: …" (1834) |

- `coefficients`는 **배열이 아니어야** 함(`!Array.isArray`, 1812)—객체여야 차트가 뜸.
- 표: `Object.entries(coefficients)`를 `|값|` 내림차순 정렬, 양수=초록/음수=빨강 (1832~1839). 값은 숫자.

### 차트/시각화
- **계수 막대차트** `coef-chart-linear`: 라벨=피처명(앞 15개), 값=계수. 양수 초록/음수 빨강, `indexAxis:'y'` (1851~1864).
- **계수 표**: 전체 피처, 절댓값 정렬.

---

## algo=logistic

### 요청 파라미터 (`getParams`, 1673)
| 필드 | 소스 | 타입 | 기본값 | 비고 |
|---|---|---|---|---|
| `target` | `logistic-target` | str | 마지막 컬럼 [짐작] | |
| `C` | `logistic-c` | float | 1.0 [짐작] | 규제 역수 |
| `max_iter` | `logistic-iter` | int | 100 [짐작] | |
| `solver` | `logistic-solver` | str | `lbfgs` [짐작] | |

- 파일: train 필수 + test 필수, val 선택. **항상 분류.**

### 응답 필드
| 필드 | 구조 | 용도 |
|---|---|---|
| `*_metrics` | `{accuracy, f1_score}` | 지표표 |
| `coefficients` | object. **이진** → flat `{feature:number}`; **다중분류** → nested `{classLabel: {feature:number}}` | 계수 막대차트 |

- 차트 코드(1852)가 nested를 처리: `Object.values(coefficients)[0]`가 객체면 **첫 클래스의 계수 dict**를 사용, 아니면 flat 그대로.
- `intercept`를 보내도 **표시 안 됨**(절편 카드·계수 표는 `algo==='linear'` 전용, 1832). 로지스틱은 계수 **차트만**.

### 차트/시각화
- **계수 막대차트** `coef-chart-logistic`만 (linear과 동일 스타일).

---

## algo=dtree

### 요청 파라미터 (`getParams`, 1674)
| 필드 | 소스 | 타입 | 기본값 | 비고 |
|---|---|---|---|---|
| `target` | `dtree-target` | str | 마지막 컬럼 [짐작] | |
| `max_depth` | `dtree-depth` | int (`0`=제한없음→None, 2116) | 0 [짐작] | |
| `min_samples_split` | `dtree-split` | int | 2 [짐작] | |
| `min_samples_leaf` | `dtree-leaf` | int | 1 [짐작] | |
| `criterion` | `dtree-crit` | str | `gini`(분류)/`squared_error`(회귀) [짐작] | |

- 파일: train 필수 + test 필수, val 선택. 분류/회귀 자동판정(≤20).

### 응답 필드
| 필드 | 구조 | 용도 |
|---|---|---|
| `*_metrics` | 분류 `{accuracy,f1_score}` / 회귀 `{r2_score,rmse}` | 지표표 |
| `feature_importances` | object `{featureName: number}` (**중요도 내림차순으로 보낼 것** — 앞 15개만 slice) | 피처중요도 가로막대 |
| `tree_depth` | int | 트리정보 카드 "실제 깊이" (1842) |
| `n_leaves` | int | 트리정보 카드 "리프 노드" (1843) |

- ⚠️ 필드명은 **`feature_importances`(복수, s 있음)**. `feature_importance`(단수) 아님.
- `tree_depth`는 `!== undefined`면 카드 표시. dtree만 이 두 필드를 보냄(rforest/xgboost는 안 보냄 — `buildPyCode`상 dtree만 get_depth/get_n_leaves 출력).

### 차트/시각화
- **피처중요도 가로막대** `fi-chart-dtree`: 라벨=피처명(앞 15), 값=중요도, `indexAxis:'y'` (1784~1794).
- **트리 정보 카드**(깊이/리프 텍스트).

---

## algo=rforest

### 요청 파라미터 (`getParams`, 1675)
| 필드 | 소스 | 타입 | 기본값 | 비고 |
|---|---|---|---|---|
| `target` | `rforest-target` | str | 마지막 컬럼 [짐작] | |
| `n_estimators` | `rf-n` | int | 100 [짐작] | |
| `max_depth` | `rf-depth` | int (`0`=None) | 0 [짐작] | |
| `min_samples_split` | `rf-split` | int | 2 [짐작] | |
| `max_features` | `rf-feat` | str/float (`'1.0'`은 float로, 그 외 문자열, 2155) | `sqrt` [짐작] | |

- 파일: train 필수 + test 필수, val 선택. 분류/회귀 자동판정(≤20).

### 응답 필드
| 필드 | 구조 | 용도 |
|---|---|---|
| `*_metrics` | 분류/회귀 지표 | 지표표 |
| `feature_importances` | object `{featureName: number}` (내림차순) | 피처중요도 가로막대 |

- `tree_depth`/`n_leaves` 안 보냄(랜덤포레스트는 단일 깊이 개념 없음).

### 차트/시각화
- **피처중요도 가로막대** `fi-chart-rforest`.

---

## algo=xgboost

### 요청 파라미터 (`getParams`, 1676)
| 필드 | 소스 | 타입 | 기본값 | 비고 |
|---|---|---|---|---|
| `target` | `xgb-target` | str | 마지막 컬럼 [짐작] | |
| `n_estimators` | `xgb-n` | int | 100~300 [짐작] | |
| `max_depth` | `xgb-depth` | int | 6 [짐작] | |
| `learning_rate` | `xgb-lr` | float | 0.1~0.3 [짐작] | |
| `subsample` | `xgb-sub` | float | 1.0 [짐작] | |
| `colsample_bytree` | `xgb-col` | float | 1.0 [짐작] | |
| `reg_alpha` | `xgb-alpha` | float | 0 [짐작] | L1 |
| `reg_lambda` | `xgb-lambda` | float | 1 [짐작] | L2 |

- 파일: train 필수 + test 필수, val 선택. 분류/회귀 자동판정(≤20).
- 분류 시 서버는 `LabelEncoder`로 타깃 인코딩(XGBoost 요구, 2231).

### 응답 필드
| 필드 | 구조 | 용도 |
|---|---|---|
| `*_metrics` | 분류 `{accuracy,f1_score}` / 회귀 `{r2_score,rmse}` | 지표표 |
| `feature_importances` | object `{featureName: number}` (내림차순) | 피처중요도 가로막대 |

### 차트/시각화
- **피처중요도 가로막대** `fi-chart-xgboost`.

---

## 부록 A — `renderResults`가 읽는 `data.*` 필드 전수 (grep 검증, 1729~1898)

```
d.algorithm  d.n_train  d.n_val  d.n_test
d.train_metrics  d.val_metrics  d.test_metrics
d.feature_importances
d.coefficients  d.intercept
d.tree_depth  d.n_leaves
d.columns  d.sample  d.centers  d.cluster_counts
```
그리고 `runAlgo`에서 `data.error`. — **이게 프론트가 읽는 전부.** 여기 없는 키는 프론트가 무시한다.

## 부록 B — 조건부 렌더 트리거 요약

| 조건 (코드) | 렌더 결과 |
|---|---|
| `d.feature_importances` 존재 | 피처중요도 차트 (dtree/rforest/xgboost) |
| `d.coefficients` 존재 && 배열 아님 | 계수 차트 (linear/logistic) |
| `d.coefficients` && `algo==='linear'` | 계수 표 + 절편(`d.intercept`) |
| `algo==='kmeans'` && `d.sample` && `d.columns.length>=2` | 클러스터 산점도 |
| `algo==='kmeans'` (항상) | 도넛(`cluster_counts`) — `cluster_counts` 없으면 JS 에러 위험, 반드시 포함 |
| `algo==='kmeans'` && `d.centers` | 중심값 표 |
| `d.tree_depth !== undefined` | 트리정보 카드(`tree_depth`+`n_leaves`) |

> ⚠️ 재구현 주의: kmeans 응답에는 `cluster_counts`가 **반드시** 있어야 한다(도넛·산점도 둘 다 `Object.keys/values(d.cluster_counts)`를 무조건 호출, 1868/1886/1887). 없으면 렌더 중 throw.
