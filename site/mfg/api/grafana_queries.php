<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grafana MySQL 샘플 쿼리</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
  body { font-family: 'Noto Sans KR', 'Segoe UI', system-ui, -apple-system, sans-serif; background: #0a0e17; color: #e2e8f0; margin: 0; }
  .gq-wrap { max-width: 900px; margin: 0 auto; padding: 32px; }
  /* 헤더 — prep 페이지(/prep/missing)와 동일 스펙 */
  .site-header { position: sticky; top: 0; z-index: 100; background: rgba(248,250,252,.95); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(0,0,0,.1); padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
  .logo { font-size: 15px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 12px; }
  .logo-brand { font-family: 'Space Mono', monospace; font-size: 18px; font-weight: 700; color: #2563eb; letter-spacing: 2px; text-decoration: none; }
  .logo-brand em { color: #ea580c; font-style: normal; }
  .logo-sep { width: 1px; height: 16px; background: rgba(0,0,0,.15); flex-shrink: 0; }
  .logo-title { font-size: 14px; font-weight: 600; color: #1e293b; }
  .header-back { font-size: 12px; color: #64748b; text-decoration: none; border: 1px solid rgba(0,0,0,.15); padding: 5px 14px; border-radius: 8px; transition: .2s; }
  .header-back:hover { color: #1e293b; border-color: rgba(0,0,0,.3); }
  @media (max-width: 640px) { .site-header { padding: 10px 16px; } .logo-sep, .logo-title { display: none; } }
  h1 { color: #00d4ff; font-size: 18px; margin-bottom: 8px; }
  h2 { color: #39ff14; font-size: 14px; margin: 28px 0 8px; border-left: 3px solid #39ff14; padding-left: 10px; }
  pre { background: #111827; border: 1px solid #1e3a5f; border-radius: 4px; padding: 16px; overflow-x: auto; font-family: 'Space Mono', monospace; font-size: 13px; line-height: 1.7; color: #e2e8f0; }
  .kw  { color: #00d4ff; }
  .cm  { color: #64748b; }
  .fn  { color: #ffa502; }
  .str { color: #39ff14; }
  p    { color: #64748b; font-size: 12px; line-height: 1.7; margin: 6px 0 12px; }
  a    { color: #00d4ff; }
</style>
</head>
<body>
<header class="site-header">
  <div class="logo">
    <a href="/" class="logo-brand">DATA<em>FORGE</em></a>
    <div class="logo-sep"></div>
    <div class="logo-title">Grafana MySQL 샘플 쿼리</div>
  </div>
  <a href="/" class="header-back">← DataForge 홈</a>
</header>
<div class="gq-wrap">
<h1>📊 Grafana × MySQL 샘플 쿼리</h1>
<p>Grafana에서 MySQL Data Source 연결 후 아래 쿼리를 패널에 붙여넣으세요.<br>
<strong>Time series 패널</strong>에서는 첫 번째 컬럼이 DATETIME, 나머지가 수치여야 합니다.</p>

<h2>① 센서 — 실시간 온도/압력 시계열</h2>
<p>mfg_sensor.values_json 에서 특정 센서값을 추출하는 방법</p>
<pre>
<span class="kw">SELECT</span>
    ts                                                   <span class="cm">-- Grafana Time 컬럼</span>
  , <span class="fn">JSON_EXTRACT</span>(values_json, <span class="str">'$.temperature_c'</span>)  <span class="kw">AS</span> temperature_c
  , <span class="fn">JSON_EXTRACT</span>(values_json, <span class="str">'$.pressure_bar'</span>)   <span class="kw">AS</span> pressure_bar
  , <span class="fn">JSON_EXTRACT</span>(values_json, <span class="str">'$.vibration_mm_s'</span>) <span class="kw">AS</span> vibration_mm_s
<span class="kw">FROM</span>  mfg_sensor
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
  <span class="kw">AND</span>  factory_id = <span class="str">'F01'</span>           <span class="cm">-- 공장 필터 (선택)</span>
<span class="kw">ORDER BY</span> ts
</pre>

<h2>② 센서 — 공정 상태별 건수 (Pie Chart)</h2>
<pre>
<span class="kw">SELECT</span>
    process_status             <span class="kw">AS</span> status
  , <span class="fn">COUNT</span>(*)                   <span class="kw">AS</span> count
<span class="kw">FROM</span>  mfg_sensor
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
<span class="kw">GROUP BY</span> process_status
</pre>

<h2>③ 센서 — 1분 평균 집계 (Time series)</h2>
<pre>
<span class="kw">SELECT</span>
    <span class="fn">DATE_FORMAT</span>(ts, <span class="str">'%Y-%m-%d %H:%i:00'</span>)          <span class="kw">AS</span> ts
  , <span class="fn">AVG</span>(<span class="fn">JSON_EXTRACT</span>(values_json, <span class="str">'$.temperature_c'</span>)) <span class="kw">AS</span> avg_temp
  , <span class="fn">AVG</span>(<span class="fn">JSON_EXTRACT</span>(values_json, <span class="str">'$.pressure_bar'</span>))  <span class="kw">AS</span> avg_pressure
<span class="kw">FROM</span>  mfg_sensor
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
<span class="kw">GROUP BY</span> <span class="fn">DATE_FORMAT</span>(ts, <span class="str">'%Y-%m-%d %H:%i:00'</span>)
<span class="kw">ORDER BY</span> ts
</pre>

<h2>④ 알람 — 심각도별 시계열 (알람 발생 추이)</h2>
<pre>
<span class="kw">SELECT</span>
    ts
  , <span class="kw">CASE</span> severity
      <span class="kw">WHEN</span> <span class="str">'CRITICAL'</span> <span class="kw">THEN</span> 3
      <span class="kw">WHEN</span> <span class="str">'WARNING'</span>  <span class="kw">THEN</span> 2
      <span class="kw">ELSE</span>               1
    <span class="kw">END</span>                  <span class="kw">AS</span> severity_level
  , value
<span class="kw">FROM</span>  mfg_alarm
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
<span class="kw">ORDER BY</span> ts
</pre>

<h2>⑤ 알람 — 유형별 건수 (Bar chart)</h2>
<pre>
<span class="kw">SELECT</span>
    alarm_type
  , <span class="fn">COUNT</span>(*)  <span class="kw">AS</span> cnt
  , <span class="fn">SUM</span>(<span class="kw">CASE</span> <span class="kw">WHEN</span> severity = <span class="str">'CRITICAL'</span> <span class="kw">THEN</span> 1 <span class="kw">ELSE</span> 0 <span class="kw">END</span>) <span class="kw">AS</span> critical
<span class="kw">FROM</span>  mfg_alarm
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
<span class="kw">GROUP BY</span> alarm_type
<span class="kw">ORDER BY</span> cnt <span class="kw">DESC</span>
</pre>

<h2>⑥ 품질 — OK/NG 불량률 (1분 집계)</h2>
<pre>
<span class="kw">SELECT</span>
    <span class="fn">DATE_FORMAT</span>(ts, <span class="str">'%Y-%m-%d %H:%i:00'</span>)          <span class="kw">AS</span> ts
  , <span class="fn">ROUND</span>(<span class="fn">AVG</span>(<span class="kw">CASE</span> <span class="kw">WHEN</span> result = <span class="str">'NG'</span> <span class="kw">THEN</span> 100.0 <span class="kw">ELSE</span> 0 <span class="kw">END</span>), 2) <span class="kw">AS</span> defect_rate_pct
  , <span class="fn">COUNT</span>(*)                                          <span class="kw">AS</span> total
<span class="kw">FROM</span>  mfg_quality
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
<span class="kw">GROUP BY</span> <span class="fn">DATE_FORMAT</span>(ts, <span class="str">'%Y-%m-%d %H:%i:00'</span>)
<span class="kw">ORDER BY</span> ts
</pre>

<h2>⑦ 에너지 — 전력/전압 시계열</h2>
<pre>
<span class="kw">SELECT</span>
    ts
  , power_kw
  , voltage_v
  , pf
  , frequency_hz
<span class="kw">FROM</span>  mfg_energy
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
<span class="kw">ORDER BY</span> ts
</pre>

<h2>⑧ 에너지 — 미터별 평균 전력 (Stat 패널)</h2>
<pre>
<span class="kw">SELECT</span>
    meter_id
  , <span class="fn">ROUND</span>(<span class="fn">AVG</span>(power_kw), 2) <span class="kw">AS</span> avg_power_kw
  , <span class="fn">ROUND</span>(<span class="fn">MAX</span>(power_kw), 2) <span class="kw">AS</span> max_power_kw
<span class="kw">FROM</span>  mfg_energy
<span class="kw">WHERE</span> ts <span class="kw">BETWEEN</span> <span class="str">$__timeFrom()</span> <span class="kw">AND</span> <span class="str">$__timeTo()</span>
<span class="kw">GROUP BY</span> meter_id
</pre>

<hr style="border-color:#1e3a5f;margin:32px 0">
<p style="color:#64748b">
  <strong style="color:#00d4ff">Grafana 설정 팁:</strong><br>
  • Time series 패널: 첫 컬럼을 <code>$__timeFrom()/$__timeTo()</code> 필터 사용<br>
  • Grafana의 <code>$__timeGroup(ts, '1m')</code> 매크로로 자동 집계 가능<br>
  • 변수(Variable) 기능으로 factory_id, equipment_id를 드롭다운으로 만들 수 있음
</p>
</div><!-- .gq-wrap -->
</body>
</html>
