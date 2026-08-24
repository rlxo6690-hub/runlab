"""제조 스트리밍 데모 — /mfg/api/stream_state.php · db_write.php + factory_lab 센서.

구조: 관리자 브라우저가 데이터를 생성(generators.js)해 서버로 broadcast → 서버는 공유
버퍼에 쌓고 → 교육생 뷰어들이 GET으로 poll해 수신. 서버는 데이터를 만들지 않고 중계·보관만.
"""
import json
import random
from django.views.decorators.csrf import csrf_exempt
from .apiutil import ok, err
from .models import StreamState, StreamRow

BUFFER = 60  # recentMsgs 최대 보관 수


def _cls(row):
    """행의 상태 → 뷰어 색상 클래스. ALARM/STOP/NG=err, WARNING=warn, 그 외 normal."""
    for k in ("process_status", "operation_status", "status", "result", "inspection_result"):
        v = str(row.get(k, "")).upper()
        if v in ("ALARM", "STOP", "NG", "FAIL", "DANGER"):
            return "err"
        if v in ("WARNING", "WARN"):
            return "warn"
    return "normal"


@csrf_exempt
def stream_state(request):
    st = StreamState.get()
    if request.method == "GET":
        return ok(running=st.running, config=st.config, topic=st.topic,
                  rate=st.rate, dbEnabled=st.db_enabled,
                  recentMsgs=st.recent_msgs, msgCount=st.msg_count)

    # POST — 관리자 제어(action 기반)
    try:
        data = json.loads(request.body or b"{}")
    except (ValueError, TypeError):
        data = {}
    action = data.get("action")

    if action == "start":
        st.running = True
        st.topic = data.get("topic", "")[:80]
        st.rate = float(data.get("rate") or 1)
        st.db_enabled = bool(data.get("dbEnabled"))
        st.config = data.get("config") or {}
        st.recent_msgs = []
        st.msg_count = 0
        st.save()
        return ok()

    if action == "stop":
        st.running = False
        st.save()
        return ok()

    if action == "broadcast":
        msgs = data.get("msgs") or []
        # raw row dict → 뷰어용 {ts,msg,cls}
        display = [{"ts": str(r.get("timestamp", "")),
                    "msg": json.dumps(r, ensure_ascii=False),
                    "cls": _cls(r)} for r in msgs]
        st.recent_msgs = (st.recent_msgs + display)[-BUFFER:]
        st.msg_count = int(data.get("msgCount") or (st.msg_count + len(msgs)))
        if data.get("topic"):
            st.topic = data["topic"][:80]
        st.save()
        return ok()

    return err("알 수 없는 action")


@csrf_exempt
def db_write(request):
    """POST {topic, rows} → 행 적재. {ok, written}."""
    try:
        data = json.loads(request.body or b"{}")
    except (ValueError, TypeError):
        data = {}
    topic = (data.get("topic") or "")[:80]
    rows = data.get("rows") or []
    StreamRow.objects.bulk_create([StreamRow(topic=topic, data=r) for r in rows])
    return ok(written=len(rows))


def sensor_api(request):
    """factory_lab 센서 대시보드용 목데이터. GET → {sensors:[{sensor_code,value,status}]}."""
    codes = [("TEMP_01", 20, 80, "℃"), ("PRESS_02", 1, 10, "bar"),
             ("VIB_03", 0, 5, "mm/s"), ("RPM_04", 1000, 3000, "rpm"),
             ("FLOW_05", 10, 100, "L/min"), ("CURR_06", 5, 30, "A")]
    sensors = []
    for code, lo, hi, _unit in codes:
        v = round(random.uniform(lo, hi), 1)
        span = hi - lo
        status = "danger" if v > lo + span * 0.9 else "warning" if v > lo + span * 0.75 else "normal"
        sensors.append({"sensor_code": code, "value": v, "status": status})
    from django.http import JsonResponse
    return JsonResponse({"sensors": sensors})
