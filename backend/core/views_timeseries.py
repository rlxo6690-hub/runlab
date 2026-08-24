"""시계열 계산 — /sim/api/timeseries_calc.php.

계약: docs/inventory/text-timeseries-contract.md (JOB2).
서버 action 6개: sma·ema·ses·holt·holt_winters·ar. ARIMA·ACF/PACF·CCF는 클라이언트 계산.
응답: {ok, fitted[](워밍업 null 허용), forecast[], metrics{rmse,mae,mape}, meta{}}.
"""
import json
import numpy as np
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


def _metrics(actual, fitted):
    a, f = [], []
    for x, y in zip(actual, fitted):
        if y is None or (isinstance(y, float) and np.isnan(y)):
            continue
        a.append(x); f.append(y)
    if not a:
        return {"rmse": None, "mae": None, "mape": None}
    a = np.array(a, float); f = np.array(f, float)
    rmse = float(np.sqrt(np.mean((a - f) ** 2)))
    mae = float(np.mean(np.abs(a - f)))
    nz = a != 0
    mape = float(np.mean(np.abs((a[nz] - f[nz]) / a[nz])) * 100) if nz.any() else None
    return {"rmse": round(rmse, 4), "mae": round(mae, 4),
            "mape": round(mape, 2) if mape is not None else None}


def _sma(data, window, h):
    n = len(data)
    fitted = [None] * n
    for i in range(window - 1, n):
        fitted[i] = float(np.mean(data[i - window + 1:i + 1]))
    last = float(np.mean(data[-window:]))
    return fitted, [last] * h, {"window": window}


def _ema(data, span, h):
    alpha = 2 / (span + 1)
    fitted = [float(data[0])]
    for i in range(1, len(data)):
        fitted.append(alpha * data[i] + (1 - alpha) * fitted[-1])
    return fitted, [fitted[-1]] * h, {"span": span, "alpha": round(alpha, 4)}


def _ses(data, alpha, h):
    level = float(data[0])
    fitted = [level]
    for i in range(1, len(data)):
        level = alpha * data[i] + (1 - alpha) * level
        fitted.append(level)
    return fitted, [level] * h, {"alpha": alpha}


def _holt(data, alpha, beta, h):
    level = float(data[0]); trend = float(data[1] - data[0]) if len(data) > 1 else 0.0
    fitted = [level]
    for i in range(1, len(data)):
        prev = level
        level = alpha * data[i] + (1 - alpha) * (level + trend)
        trend = beta * (level - prev) + (1 - beta) * trend
        fitted.append(level)
    fcst = [level + (k + 1) * trend for k in range(h)]
    return fitted, fcst, {"alpha": alpha, "beta": beta}


def _holt_winters(data, alpha, beta, gamma, period, h):
    n = len(data)
    if n < 2 * period:
        raise ValueError(f"Holt-Winters는 데이터가 최소 {2 * period}개 필요합니다(주기 {period}).")
    season = [data[i] - np.mean(data[:period]) for i in range(period)]
    level = float(np.mean(data[:period])); trend = 0.0
    fitted = [None] * n
    for i in range(n):
        s = season[i % period]
        if i >= period:
            prev = level
            level = alpha * (data[i] - s) + (1 - alpha) * (level + trend)
            trend = beta * (level - prev) + (1 - beta) * trend
            season[i % period] = gamma * (data[i] - level) + (1 - gamma) * s
        fitted[i] = float(level + trend + season[i % period]) if i >= period else None
    fcst = [float(level + (k + 1) * trend + season[(n + k) % period]) for k in range(h)]
    return fitted, fcst, {"alpha": alpha, "beta": beta, "gamma": gamma, "period": period}


def _ar(data, p, h):
    from statsmodels.tsa.ar_model import AutoReg
    model = AutoReg(np.asarray(data, float), lags=p, old_names=False).fit()
    pred = model.predict(start=0, end=len(data) - 1)
    fitted = [None] * p + [float(x) for x in pred[p:]] if len(pred) >= p else [float(x) for x in pred]
    fcst = [float(x) for x in model.predict(start=len(data), end=len(data) + h - 1)]
    return fitted, fcst, {"p": p, "coef": [round(float(c), 4) for c in model.params]}


@csrf_exempt
def timeseries_calc(request):
    try:
        body = json.loads(request.body or b"{}")
    except (ValueError, TypeError):
        return JsonResponse({"ok": False, "msg": "잘못된 요청"})
    action = body.get("action")
    data = body.get("data") or []
    params = body.get("params") or {}
    h = int(params.get("forecast") or 10)
    try:
        data = [float(x) for x in data]
        if len(data) < 3:
            return JsonResponse({"ok": False, "msg": "데이터가 너무 짧습니다"})
        if action == "sma":
            fitted, fcst, meta = _sma(data, int(params.get("window") or 5), h)
        elif action == "ema":
            fitted, fcst, meta = _ema(data, int(params.get("span") or 5), h)
        elif action == "ses":
            fitted, fcst, meta = _ses(data, float(params.get("alpha") or 0.3), h)
        elif action == "holt":
            fitted, fcst, meta = _holt(data, float(params.get("alpha") or 0.3),
                                       float(params.get("beta") or 0.1), h)
        elif action == "holt_winters":
            fitted, fcst, meta = _holt_winters(data, float(params.get("alpha") or 0.3),
                                               float(params.get("beta") or 0.1),
                                               float(params.get("gamma") or 0.2),
                                               int(params.get("period") or 12), h)
        elif action == "ar":
            fitted, fcst, meta = _ar(data, int(params.get("p") or 2), h)
        else:
            return JsonResponse({"ok": False, "msg": f"알 수 없는 모델: {action}"})
    except Exception as e:
        return JsonResponse({"ok": False, "msg": str(e)})
    return JsonResponse({"ok": True, "fitted": fitted, "forecast": fcst,
                         "metrics": _metrics(data, fitted), "meta": meta})
