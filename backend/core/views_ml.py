"""머신러닝 시뮬레이터 — /sim/api/ml_proxy.php?algo=<algo>.

계약: docs/inventory/ml-contract.md. 서버 계약은 7종(kmeans·knn·linear·logistic·dtree·
rforest·xgboost). lightgbm·metrics는 클라이언트 전용이라 서버 대상 아님.
공통 골격: {error?|algorithm, n_train, n_val, n_test, train_metrics, val_metrics, test_metrics}.
분류/회귀 자동판정: 타깃 고유값 ≤20 → 분류.
요청: multipart FormData(train_file 필수, test_file 필수, val_file 선택) + 파라미터.
"""
import io
import numpy as np
import pandas as pd
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

ALGO_LABEL = {"kmeans": "K-Means", "knn": "KNN", "linear": "Linear Regression",
              "logistic": "Logistic Regression", "dtree": "Decision Tree",
              "rforest": "Random Forest", "xgboost": "XGBoost"}


def _read_csv(f):
    return pd.read_csv(io.BytesIO(f.read()))


def _num(v, cast=float, default=None):
    try:
        return cast(v)
    except (TypeError, ValueError):
        return default


def _features(df, target):
    X = df.drop(columns=[target]) if target in df.columns else df.copy()
    X = pd.get_dummies(X, drop_first=False)
    return X.select_dtypes(include="number").fillna(0)


def _clf_metrics(y_true, y_pred):
    from sklearn.metrics import accuracy_score, f1_score
    return {"accuracy": round(float(accuracy_score(y_true, y_pred)), 4),
            "f1_score": round(float(f1_score(y_true, y_pred, average="weighted", zero_division=0)), 4)}


def _reg_metrics(y_true, y_pred, with_mae=False):
    from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
    m = {"r2_score": round(float(r2_score(y_true, y_pred)), 4),
         "rmse": round(float(np.sqrt(mean_squared_error(y_true, y_pred))), 4)}
    if with_mae:
        m["mae"] = round(float(mean_absolute_error(y_true, y_pred)), 4)
    return m


@csrf_exempt
def ml_proxy(request):
    algo = request.GET.get("algo", "")
    if algo not in ALGO_LABEL:
        return JsonResponse({"error": f"지원하지 않는 알고리즘: {algo}"})
    if "train_file" not in request.FILES:
        return JsonResponse({"error": "학습 데이터(train)를 업로드해 주세요"})
    try:
        train = _read_csv(request.FILES["train_file"])
        test = _read_csv(request.FILES["test_file"]) if "test_file" in request.FILES else train.copy()
        val = _read_csv(request.FILES["val_file"]) if "val_file" in request.FILES else None
        P = request.POST
        out = {"algorithm": ALGO_LABEL[algo], "n_train": len(train),
               "n_val": len(val) if val is not None else 0, "n_test": len(test)}
        if algo == "kmeans":
            out.update(_kmeans(train, test, P))
        else:
            out.update(_supervised(algo, train, val, test, P))
        return JsonResponse(out)
    except Exception as e:
        return JsonResponse({"error": str(e)})


def _kmeans(train, test, P):
    from sklearn.cluster import KMeans
    from sklearn.preprocessing import StandardScaler
    from sklearn.metrics import silhouette_score
    cols = list(train.select_dtypes(include="number").columns)
    if len(cols) < 1:
        raise ValueError("수치형 컬럼이 없습니다")
    Xtr = train[cols].fillna(0).to_numpy(float)
    Xte = test[cols].fillna(0).to_numpy(float)
    if str(P.get("scale")).lower() == "true":
        sc = StandardScaler().fit(Xtr)
        Xtr_s, Xte_s = sc.transform(Xtr), sc.transform(Xte)
    else:
        Xtr_s, Xte_s = Xtr, Xte
    k = _num(P.get("n_clusters"), int, 3)
    km = KMeans(n_clusters=k, max_iter=_num(P.get("max_iter"), int, 300),
                n_init=_num(P.get("n_init"), int, 10), random_state=42)
    labels = km.fit_predict(Xtr_s)
    test_labels = km.predict(Xte_s)
    train_m = {"inertia": round(float(km.inertia_), 4)}
    if 1 < k < len(Xtr_s):
        train_m["silhouette_score"] = round(float(silhouette_score(Xtr_s, labels)), 4)
    test_m = {}
    if 1 < k < len(Xte_s):
        test_m["silhouette_score"] = round(float(silhouette_score(Xte_s, test_labels)), 4)
    # 산점도 샘플(원본 스케일, 최대 500점)
    sample = []
    for i in range(min(len(Xtr), 500)):
        row = {c: float(Xtr[i][j]) for j, c in enumerate(cols)}
        row["cluster"] = int(labels[i])
        sample.append(row)
    counts = {str(c): int((labels == c).sum()) for c in range(k)}
    # 중심값(원본 스케일)
    centers_raw = km.cluster_centers_
    if str(P.get("scale")).lower() == "true":
        centers_raw = sc.inverse_transform(centers_raw)
    centers = [{c: round(float(centers_raw[ci][j]), 4) for j, c in enumerate(cols)} for ci in range(k)]
    return {"train_metrics": train_m, "val_metrics": None, "test_metrics": test_m,
            "columns": cols, "sample": sample, "cluster_counts": counts, "centers": centers}


def _supervised(algo, train, val, test, P):
    target = P.get("target") or train.columns[-1]
    if target not in train.columns:
        raise ValueError(f"타깃 컬럼 '{target}'이 없습니다")
    Xtr = _features(train, target)
    feat_names = list(Xtr.columns)
    ytr = train[target]

    def align(df):
        X = _features(df, target).reindex(columns=feat_names, fill_value=0)
        return X, df[target] if target in df.columns else None

    Xte, yte = align(test)
    Xva, yva = align(val) if val is not None else (None, None)

    is_clf = (algo == "logistic") or (algo != "linear" and ytr.nunique() <= 20)
    model, extra = _fit_model(algo, P, is_clf, feat_names)

    if algo == "xgboost" and is_clf:
        from sklearn.preprocessing import LabelEncoder
        le = LabelEncoder().fit(ytr)
        model.fit(Xtr, le.transform(ytr))
        pred = lambda X: le.inverse_transform(model.predict(X))
    else:
        model.fit(Xtr, ytr)
        pred = model.predict

    def metrics(X, y):
        if X is None or y is None:
            return None
        p = pred(X)
        if algo == "linear":
            return _reg_metrics(y, p, with_mae=True)
        return _clf_metrics(y, p) if is_clf else _reg_metrics(y, p)

    out = {"train_metrics": metrics(Xtr, ytr), "val_metrics": metrics(Xva, yva),
           "test_metrics": metrics(Xte, yte)}

    # 알고리즘별 전용 필드
    if algo == "linear":
        out["coefficients"] = {n: round(float(c), 6) for n, c in zip(feat_names, np.ravel(model.coef_))}
        out["intercept"] = round(float(np.ravel(model.intercept_)[0]) if np.ndim(model.intercept_) else float(model.intercept_), 6)
    elif algo == "logistic":
        coef = model.coef_
        if coef.shape[0] == 1:
            out["coefficients"] = {n: round(float(c), 6) for n, c in zip(feat_names, coef[0])}
        else:  # 다중분류 → nested
            out["coefficients"] = {str(cl): {n: round(float(c), 6) for n, c in zip(feat_names, coef[i])}
                                   for i, cl in enumerate(model.classes_)}
    elif algo in ("dtree", "rforest", "xgboost"):
        imp = model.feature_importances_
        pairs = sorted(zip(feat_names, imp), key=lambda t: -t[1])
        out["feature_importances"] = {n: round(float(v), 6) for n, v in pairs}
        if algo == "dtree" and hasattr(model, "get_depth"):
            out["tree_depth"] = int(model.get_depth())
            out["n_leaves"] = int(model.get_n_leaves())
    return out


def _fit_model(algo, P, is_clf, feat_names):
    if algo == "knn":
        from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
        kw = dict(n_neighbors=_num(P.get("n_neighbors"), int, 5),
                  weights=P.get("weights") or "uniform", metric=P.get("metric") or "minkowski")
        return (KNeighborsClassifier(**kw) if is_clf else KNeighborsRegressor(**kw)), {}
    if algo == "linear":
        from sklearn.linear_model import LinearRegression, Ridge, Lasso
        mt = P.get("model_type") or "linear"; alpha = _num(P.get("alpha"), float, 1.0)
        return ({"ridge": Ridge(alpha=alpha), "lasso": Lasso(alpha=alpha)}.get(mt, LinearRegression())), {}
    if algo == "logistic":
        from sklearn.linear_model import LogisticRegression
        return LogisticRegression(C=_num(P.get("C"), float, 1.0),
                                  max_iter=_num(P.get("max_iter"), int, 1000),
                                  solver=P.get("solver") or "lbfgs"), {}
    if algo in ("dtree", "rforest"):
        from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
        from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
        depth = _num(P.get("max_depth"), int, 0) or None
        if algo == "dtree":
            kw = dict(max_depth=depth, min_samples_split=_num(P.get("min_samples_split"), int, 2),
                      min_samples_leaf=_num(P.get("min_samples_leaf"), int, 1), random_state=42)
            crit = P.get("criterion")
            if crit:
                kw["criterion"] = crit
            return (DecisionTreeClassifier(**kw) if is_clf else DecisionTreeRegressor(**kw)), {}
        mf = P.get("max_features") or "sqrt"
        mf = 1.0 if mf == "1.0" else mf
        kw = dict(n_estimators=_num(P.get("n_estimators"), int, 100), max_depth=depth,
                  min_samples_split=_num(P.get("min_samples_split"), int, 2),
                  max_features=mf, random_state=42, n_jobs=-1)
        return (RandomForestClassifier(**kw) if is_clf else RandomForestRegressor(**kw)), {}
    if algo == "xgboost":
        import xgboost as xgb
        kw = dict(n_estimators=_num(P.get("n_estimators"), int, 100),
                  max_depth=_num(P.get("max_depth"), int, 6),
                  learning_rate=_num(P.get("learning_rate"), float, 0.3),
                  subsample=_num(P.get("subsample"), float, 1.0),
                  colsample_bytree=_num(P.get("colsample_bytree"), float, 1.0),
                  reg_alpha=_num(P.get("reg_alpha"), float, 0),
                  reg_lambda=_num(P.get("reg_lambda"), float, 1),
                  verbosity=0, random_state=42)
        return (xgb.XGBClassifier(**kw) if is_clf else xgb.XGBRegressor(**kw)), {}
    raise ValueError(algo)
