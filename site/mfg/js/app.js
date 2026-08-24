// ===================== AUTH STATE =====================
let authState = { authed: false };
const DEMO_LIMIT = window.MFG_DEMO_LIMIT || 500;

function setAuthed(val) {
  authState.authed = val;
  renderBanner();
}

function renderBanner() {
  const banner = document.getElementById('demo-banner');
  if (authState.authed) {
    banner.style.background = 'rgba(57,255,20,0.08)';
    banner.style.borderBottom = '1px solid var(--accent3)';
    banner.innerHTML = `<span style="color:var(--accent3)">● 인증됨 — 전체 데이터 생성 가능</span>
      <button onclick="doLogout()" class="btn btn-outline" style="padding:4px 12px;font-size:11px;border-color:var(--border);color:var(--text-dim)">나가기</button>`;
  } else {
    banner.style.background = 'rgba(255,107,53,0.1)';
    banner.style.borderBottom = '1px solid var(--accent2)';
    banner.innerHTML = `<div style="display:flex;align-items:center;gap:12px;min-width:0;flex-wrap:wrap"><span style="color:var(--accent2);white-space:nowrap">⚠ DEMO 모드 — 최대 ${DEMO_LIMIT}행 제한</span><span style="color:var(--text-dim);font-size:11px;word-break:break-all">이용문의 : 빌드업랩 / <a href="mailto:jhlee@builduplab.co.kr" style="color:var(--text-dim)">jhlee@builduplab.co.kr</a></span></div>
      <button onclick="document.getElementById('login-modal').classList.add('show')" class="btn" style="padding:4px 14px;font-size:11px;background:var(--accent2);color:#fff;flex-shrink:0">로그인</button>`;
  }
}

async function doLogout() {
  await fetch('api/logout.php');
  setAuthed(false);
}

// ===================== LOGIN MODAL =====================
async function submitLogin() {
  const code = document.getElementById('login-pw').value.trim().toUpperCase();
  const errEl = document.getElementById('login-err');
  errEl.textContent = '';
  if (!code) { errEl.textContent = '코드를 입력해주세요'; return; }
  try {
    const res = await fetch('api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    if (data.ok) {
      document.getElementById('login-modal').classList.remove('show');
      document.getElementById('login-pw').value = '';
      setAuthed(true);
    } else {
      errEl.textContent = data.msg || '유효하지 않은 코드입니다';
    }
  } catch {
    errEl.textContent = '서버 오류';
  }
}

// ===================== TAB SWITCHING =====================
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  document.querySelectorAll('.tab-panel').forEach(p => p.style.display = p.id === 'tab-' + id ? '' : 'none');
  const sel = document.getElementById('tab-select-mobile');
  if (sel) sel.value = id;
}

function initMobileTabSelect() {
  const tabBar = document.querySelector('.tab-bar');
  if (!tabBar) return;
  const buttons = tabBar.querySelectorAll('.tab-btn');
  if (!buttons.length) return;

  const select = document.createElement('select');
  select.id = 'tab-select-mobile';
  select.className = 'tab-select-mobile';

  buttons.forEach(btn => {
    const opt = document.createElement('option');
    opt.value = btn.dataset.tab;
    // 이모지 + 텍스트 (버튼 전체 텍스트 정리)
    opt.textContent = btn.textContent.trim().replace(/\s+/g, ' ');
    if (btn.classList.contains('active')) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => switchTab(select.value));
  tabBar.parentNode.insertBefore(select, tabBar);
}

// ===================== TERMINAL HELPERS =====================
function makeLogger(termId) {
  const el = document.getElementById(termId);
  return (msg, cls = '') => {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    line.innerHTML = `<span class="t-dim">[${time}]</span> <span class="${cls}">${msg}</span>`;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
  };
}
function clearTerminal(termId) {
  document.getElementById(termId).innerHTML = '';
}
function setProgress(barId, wrapId, pct) {
  document.getElementById(wrapId).style.display = pct > 0 && pct < 100 ? '' : pct === 100 ? '' : 'none';
  document.getElementById(barId).style.width = pct + '%';
}

// ===================== DATA TABLE =====================
function renderTable(tableId, headers, records) {
  const wrap = document.getElementById(tableId);
  if (!records.length) { wrap.innerHTML = ''; return; }
  const preview = records.slice(0, 50);
  let html = '<div class="table-wrap"><table class="data-table"><thead><tr>';
  headers.forEach(h => { html += `<th>${h}</th>`; });
  html += '</tr></thead><tbody>';
  preview.forEach(row => {
    html += '<tr>';
    headers.forEach(h => { html += `<td>${row[h] === null || row[h] === undefined || row[h] === '' ? '<span style="color:var(--text-dim)">NULL</span>' : row[h]}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table></div>';
  wrap.innerHTML = html;
}

// ===================== DIFFICULTY SELECTOR =====================
const DIFF_LEVELS = [
  { level: 'easy',   label: 'Easy',   color: '#16a34a', acc: '~99%',  desc: '단순 스파이크 이상치' },
  { level: 'medium', label: 'Medium', color: '#0284c7', acc: '~85%',  desc: 'AR 노이즈 + 센서 간 공분산' },
  { level: 'hard',   label: 'Hard',   color: '#d97706', acc: '~70%',  desc: '비정상 분산 + 문맥 이상치' },
  { level: 'expert', label: 'Expert', color: '#dc2626', acc: '~60%↓', desc: '열화 + 레이블 노이즈 + 레짐 변환' },
];
function renderDifficultySelector(containerId, currentLevel, onChange) {
  const el = document.getElementById(containerId);
  el.className = 'difficulty-grid';
  el.innerHTML = DIFF_LEVELS.map(d => `
    <div class="diff-btn ${d.level === currentLevel ? 'active' : ''}"
         style="${d.level === currentLevel ? 'border-color:' + d.color + ';background:rgba(0,0,0,0.3)' : ''}"
         onclick="(${onChange.toString()})('${d.level}')">
      <div class="diff-name" style="color:${d.color}">${d.label}</div>
      <div class="diff-acc" style="color:${d.color}">ML Acc ${d.acc}</div>
      <div class="diff-desc">${d.desc}</div>
    </div>`).join('');
}

// ===================== FORMAT SELECTOR =====================
function renderFormatSelector(containerId, current, onChange) {
  const el = document.getElementById(containerId);
  el.className = 'format-btns';
  el.innerHTML = ['csv','json','jsonl','sql'].map(f =>
    `<button class="fmt-btn ${f === current ? 'active' : ''}" onclick="(${onChange.toString()})('${f}')">${f.toUpperCase()}</button>`
  ).join('');
}

// ===================== TOGGLE SWITCH =====================
function renderToggle(id, enabled, onChange) {
  const el = document.getElementById(id);
  el.innerHTML = `
    <div class="toggle-track" style="background:${enabled ? 'rgba(0,212,255,0.3)' : 'var(--border)'}">
      <div class="toggle-thumb" style="left:${enabled ? '19px' : '3px'};background:${enabled ? 'var(--accent)' : 'var(--text-dim)'}"></div>
    </div>`;
  el.onclick = onChange;
}

// ========================================================
//  SENSOR TAB
// ========================================================
const sensorState = {
  processType: 'automotive',
  factories: 2, lines: 3,
  period: '7d', customRows: 10000, customInterval: 1, customIntervalUnit: 'm',
  selectedCols: new Set(['temperature_c','pressure_bar','vibration_mm_s','current_a','voltage_v','speed_rpm']),
  anomalies: {
    spike:   { enabled: true, rate: 1 },
    drift:   { enabled: true, rate: 1 },
    missing: { enabled: true, rate: 2 },
    stuck:   { enabled: true, rate: 1 },
    noise:   { enabled: true, rate: 1 },
  },
  difficulty: 'easy',
  corrGroups: [],
  defect: { enabled: false, rate: 5, format: 'int', linkToStatus: true, causal: false, noiseStd: 1.0, weights: {} },
  causalFormula: null,
  format: 'csv',
  records: [], headers: [], outputData: '', generated: false,
};

function renderDefectConfig() {
  const el = document.getElementById('sensor-defect');
  if (!el) return;
  const d = sensorState.defect;
  const { enabled, rate, linkToStatus, format, causal, weights, noiseStd } = d;
  const cols = [...sensorState.selectedCols];

  const trackStyle = (on) => {
    const bg  = on ? 'rgba(0,212,255,0.3)' : 'rgba(255,255,255,0.1)';
    const bdr = on ? 'var(--accent)' : 'var(--border)';
    const tb  = on ? 'var(--accent)' : 'var(--text-dim)';
    const tl  = on ? '17px' : '3px';
    return { bg, bdr, tb, tl };
  };
  const outer = trackStyle(enabled);
  const inner = trackStyle(causal);

  let html = `<div style="display:flex;align-items:center;gap:12px">
    <div onclick="toggleDefectEnabled()" style="cursor:pointer;position:relative;width:38px;height:22px;border-radius:11px;background:${outer.bg};border:1px solid ${outer.bdr};flex-shrink:0">
      <div style="position:absolute;top:3px;left:${outer.tl};width:14px;height:14px;border-radius:50%;background:${outer.tb};transition:left .15s"></div>
    </div>
    <span style="font-size:.85rem;color:${enabled ? 'var(--text)' : 'var(--text-dim)'}">
      불량 컬럼 생성
      <span style="font-size:.75rem;color:var(--text-dim);font-family:monospace"> defect_yn${causal && enabled ? ' · defect_score' : ''}</span>
    </span>
  </div>`;

  if (enabled) {
    html += `<div style="display:grid;gap:10px;margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:.78rem;color:var(--text-dim);min-width:70px">불량률</span>
        <input type="number" class="input-field" style="width:80px" value="${rate}" min="0.1" max="50" step="0.5"
          onchange="sensorState.defect.rate=+this.value">
        <span style="font-size:.78rem;color:var(--text-dim)">%</span>
        <span style="font-size:.75rem;color:var(--text-dim)">${causal ? 'defect_score 상위 N%가 불량으로 판정됩니다' : '전체 행 기준 기본 불량 확률'}</span>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:.78rem;color:var(--text-dim);min-width:70px">컬럼 형식</span>
        <select class="input-field" style="width:200px;padding:3px 6px;font-size:11px"
          onchange="sensorState.defect.format=this.value">
          <option value="int" ${format === 'int' ? 'selected' : ''}>숫자 — 0(양품) / 1(불량)</option>
          <option value="str" ${format === 'str' ? 'selected' : ''}>문자열 — OK / NG</option>
        </select>
      </div>
      ${!causal ? `<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <span style="font-size:.78rem;color:var(--text-dim);min-width:70px">상태 연동</span>
        <label style="display:flex;align-items:center;gap:6px;font-size:.78rem;cursor:pointer;color:var(--text-dim)">
          <input type="checkbox" style="width:auto" ${linkToStatus ? 'checked' : ''}
            onchange="sensorState.defect.linkToStatus=this.checked">
          process_status 연동 &nbsp;<span style="font-family:monospace;color:var(--danger)">ALARM → ×8</span>&nbsp;
          <span style="font-family:monospace;color:var(--warning)">WARNING → ×3</span>
        </label>
      </div>` : ''}
    </div>

    <div style="margin-top:14px;padding-top:12px;border-top:1px solid var(--border)">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:${causal ? '12px' : '0'}">
        <div onclick="toggleCausalSub()" style="cursor:pointer;position:relative;width:38px;height:22px;border-radius:11px;background:${inner.bg};border:1px solid ${inner.bdr};flex-shrink:0">
          <div style="position:absolute;top:3px;left:${inner.tl};width:14px;height:14px;border-radius:50%;background:${inner.tb};transition:left .15s"></div>
        </div>
        <span style="font-size:.82rem;color:${causal ? 'var(--text)' : 'var(--text-dim)'}">
          인과 분석 (센서 → 불량 가중치 설정)
          <span style="font-size:.75rem;color:var(--text-dim);font-family:monospace"> + defect_score</span>
        </span>
      </div>`;

    if (causal) {
      html += `<div style="font-size:.78rem;color:var(--text-dim);margin-bottom:8px">
        각 센서가 불량에 미치는 영향을 설정하세요.
        <strong style="color:var(--accent)">정답 공식은 생성 완료 후 확인할 수 있습니다.</strong>
      </div>`;
      if (!cols.length) {
        html += '<p style="font-size:.82rem;color:var(--text-dim)">컬럼을 먼저 선택하세요.</p>';
      } else {
        html += `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:5px;margin-bottom:10px">`;
        cols.forEach(col => {
          const w = weights[col] ?? 0;
          const label = SENSOR_COL_LABELS[col] || col;
          html += `<div style="display:flex;align-items:center;gap:8px;padding:3px 0">
            <span style="font-size:.78rem;color:var(--text-dim);flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${label}">${label}</span>
            <select class="input-field" style="width:170px;padding:3px 5px;font-size:11px;flex-shrink:0"
              onchange="setDefectWeight('${col}',+this.value)">
              <option value="0"    ${w===0    ?'selected':''}>영향 없음</option>
              <option value="0.5"  ${w===0.5  ?'selected':''}>양의 영향 약 (+0.5)</option>
              <option value="1.0"  ${w===1.0  ?'selected':''}>양의 영향 중 (+1.0)</option>
              <option value="1.5"  ${w===1.5  ?'selected':''}>양의 영향 강 (+1.5)</option>
              <option value="-0.5" ${w===-0.5 ?'selected':''}>음의 영향 약 (−0.5)</option>
              <option value="-1.0" ${w===-1.0 ?'selected':''}>음의 영향 중 (−1.0)</option>
              <option value="-1.5" ${w===-1.5 ?'selected':''}>음의 영향 강 (−1.5)</option>
            </select>
          </div>`;
        });
        html += `</div>`;
      }
      const signalVar = Object.values(weights).reduce((s, w) => s + w * w, 0);
      const nActive = Object.values(weights).filter(w => w !== 0).length;
      const maxW = Object.values(weights).reduce((m, w) => Math.max(m, Math.abs(w)), 0);
      const expectedR = signalVar > 0 ? (maxW / Math.sqrt(signalVar + noiseStd * noiseStd)).toFixed(2) : '-';
      const rColor = signalVar > 0 ? (parseFloat(expectedR) >= 0.7 ? 'var(--accent3)' : parseFloat(expectedR) >= 0.5 ? 'var(--warning)' : 'var(--danger)') : 'var(--text-dim)';
      html += `<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding-top:8px;border-top:1px solid var(--border)">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:.78rem;color:var(--text-dim)">노이즈 강도</span>
          <select class="input-field" style="width:115px;padding:3px 6px;font-size:11px"
            onchange="sensorState.defect.noiseStd=+this.value;renderDefectConfig()">
            <option value="0.5" ${noiseStd===0.5?'selected':''}>낮음</option>
            <option value="1.0" ${noiseStd===1.0?'selected':''}>중간</option>
            <option value="1.5" ${noiseStd===1.5?'selected':''}>높음</option>
          </select>
        </div>
        <span style="font-size:.78rem;color:var(--text-dim)">활성 컬럼 <strong style="color:var(--text)">${nActive}개</strong> 기준 예상 r =
          <strong style="color:${rColor}">${expectedR}</strong>
          ${nActive > 3 ? '<span style="color:var(--warning);font-size:.72rem"> ※ 컬럼 수가 많으면 개별 r이 낮아집니다</span>' : ''}
        </span>
        <button onclick="resetDefectWeights()" class="btn btn-outline" style="padding:3px 10px;font-size:11px;border-color:var(--border);color:var(--text-dim)">공정 기본값 적용</button>
      </div>`;
    }
    html += `</div>`;
  }

  el.innerHTML = html;
}

function toggleDefectEnabled() {
  sensorState.defect.enabled = !sensorState.defect.enabled;
  if (sensorState.defect.enabled && sensorState.defect.causal && !Object.keys(sensorState.defect.weights).length) initDefectWeights();
  renderDefectConfig();
}

function toggleCausalSub() {
  sensorState.defect.causal = !sensorState.defect.causal;
  if (sensorState.defect.causal && !Object.keys(sensorState.defect.weights).length) initDefectWeights();
  renderDefectConfig();
}

function setDefectWeight(col, val) {
  sensorState.defect.weights[col] = val;
}

function resetDefectWeights() {
  initDefectWeights();
  renderDefectConfig();
}

function initSensorTab() {
  renderSensorColPills();
  renderSensorAnomalies();
  renderDefectConfig();
  renderCorrGroups();
  renderDifficultySelector('sensor-diff', sensorState.difficulty, sensorDiffChanged);
  renderFormatSelector('sensor-fmt', sensorState.format, sensorFormatChanged);
  document.getElementById('sensor-process').value = sensorState.processType;
  document.getElementById('sensor-factories').value = sensorState.factories;
  document.getElementById('sensor-lines').value = sensorState.lines;
  document.getElementById('sensor-period').value = sensorState.period;
  toggleCustomPeriod();
}

function renderCorrGroups() {
  const cols = SENSOR_COLS_BY_TYPE[sensorState.processType] || [];
  const el = document.getElementById('sensor-corr');
  if (!sensorState.corrGroups.length) {
    el.innerHTML = '<p style="font-size:.82rem;color:var(--text-dim);padding:8px 0">상관 그룹이 없습니다. 위 버튼으로 그룹을 추가하면 특정 컬럼끼리 높은 상관관계를 갖도록 생성됩니다.</p>';
    return;
  }
  el.innerHTML = sensorState.corrGroups.map((g, gi) => `
    <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <span style="font-size:.82rem;font-weight:600;color:var(--text)">그룹 ${gi+1}</span>
        <select class="input-field" style="width:140px;padding:3px 6px;font-size:11px" onchange="sensorState.corrGroups[${gi}].strength=this.value">
          <option value="high" ${g.strength==='high'?'selected':''}>강한 상관 (r≈0.85)</option>
          <option value="medium" ${g.strength==='medium'?'selected':''}>중간 상관 (r≈0.55)</option>
          <option value="low" ${g.strength==='low'?'selected':''}>약한 상관 (r≈0.30)</option>
        </select>
        <select class="input-field" style="width:100px;padding:3px 6px;font-size:11px" onchange="sensorState.corrGroups[${gi}].direction=this.value">
          <option value="positive" ${g.direction==='positive'?'selected':''}>양의 상관</option>
          <option value="negative" ${g.direction==='negative'?'selected':''}>음의 상관</option>
        </select>
        <button onclick="removeCorrGroup(${gi})" style="margin-left:auto;background:none;border:none;color:var(--danger);cursor:pointer;font-size:14px;padding:0 4px">✕</button>
      </div>
      <div style="font-size:.78rem;color:var(--text-dim);margin-bottom:6px">포함할 컬럼 선택 (2개 이상 권장):</div>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${cols.map(col => `<label style="font-size:.78rem;display:flex;align-items:center;gap:4px;cursor:pointer;white-space:nowrap">
          <input type="checkbox" style="width:auto" ${g.cols.includes(col)?'checked':''} onchange="toggleCorrCol(${gi},'${col}')">
          ${SENSOR_COL_LABELS[col]||col}
        </label>`).join('')}
      </div>
    </div>
  `).join('');
}

function addCorrGroup() {
  sensorState.corrGroups.push({ cols: [], strength: 'high', direction: 'positive' });
  renderCorrGroups();
}

function removeCorrGroup(gi) {
  sensorState.corrGroups.splice(gi, 1);
  renderCorrGroups();
}

function toggleCorrCol(gi, col) {
  const g = sensorState.corrGroups[gi];
  const idx = g.cols.indexOf(col);
  if (idx >= 0) g.cols.splice(idx, 1);
  else g.cols.push(col);
}

function renderSensorColPills() {
  const cols = SENSOR_COLS_BY_TYPE[sensorState.processType] || [];
  const el = document.getElementById('sensor-cols');
  el.className = 'col-grid';
  el.innerHTML = cols.map(col => {
    const sel = sensorState.selectedCols.has(col);
    return `<label class="col-pill ${sel ? 'selected' : ''}" onclick="toggleSensorCol('${col}')">
      <input type="checkbox" ${sel ? 'checked' : ''} style="width:auto" onclick="event.stopPropagation();toggleSensorCol('${col}')">
      ${(SENSOR_COL_LABELS[col] || col).replace(/ /g,'&nbsp;')}
    </label>`;
  }).join('');
}

function toggleSensorCol(col) {
  if (sensorState.selectedCols.has(col)) sensorState.selectedCols.delete(col);
  else sensorState.selectedCols.add(col);
  renderSensorColPills();
  if (sensorState.defect.causal) renderDefectConfig();
}

function changeSensorProcess(val) {
  sensorState.processType = val;
  sensorState.selectedCols = new Set((SENSOR_COLS_BY_TYPE[val] || []).slice(0, 6));
  sensorState.corrGroups = [];
  // 발전 유형이면 식별 단위를 발전소/호기 용어로 바꾼다 (출력 컬럼도 plant_id·unit_id로 나간다)
  const power = typeof POWER_PROCESS_TYPES !== 'undefined' && POWER_PROCESS_TYPES.has(val);
  const setTxt = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
  setTxt('sensor-site-label', power ? '발전소 / 호기 수' : '공장 / 라인 수');
  setTxt('sensor-site-unit1', power ? '개 발전소' : '개 공장');
  setTxt('sensor-site-unit2', power ? '개 호기'   : '개 라인');
  initDefectWeights();
  renderSensorColPills();
  renderCorrGroups();
  renderDefectConfig();
}

function toggleCustomPeriod() {
  const period = document.getElementById('sensor-period').value;
  document.getElementById('sensor-custom-period').style.display = period === 'custom' ? '' : 'none';
}

const ANOMALY_TYPES = [
  { id: 'spike',   label: '🔴 스파이크 이상치 (급격한 값 변동)' },
  { id: 'drift',   label: '📈 드리프트 (서서히 증가/감소)' },
  { id: 'missing', label: '⬜ 결측치 (NULL/NaN)' },
  { id: 'stuck',   label: '📌 고착값 (동일값 반복)' },
  { id: 'noise',   label: '📡 노이즈 증가 (분산 폭발)' },
];

function renderSensorAnomalies() {
  const el = document.getElementById('sensor-anomalies');
  el.innerHTML = ANOMALY_TYPES.map(at => {
    const a = sensorState.anomalies[at.id];
    return `<div class="anomaly-row">
      <div class="toggle-wrap" id="toggle-${at.id}"></div>
      <span style="flex:1">${at.label}</span>
      <label style="font-size:11px;color:var(--text-dim);white-space:nowrap">비율 %</label>
      <input type="number" class="input-field" style="width:80px" value="${a.rate}" min="0" max="20" step="0.5"
        onchange="sensorState.anomalies['${at.id}'].rate=+this.value">
    </div>`;
  }).join('');
  ANOMALY_TYPES.forEach(at => {
    const a = sensorState.anomalies[at.id];
    renderToggle(`toggle-${at.id}`, a.enabled, () => {
      sensorState.anomalies[at.id].enabled = !sensorState.anomalies[at.id].enabled;
      renderSensorAnomalies();
    });
  });
}

function selectAllSensorCols() {
  const cols = SENSOR_COLS_BY_TYPE[sensorState.processType] || [];
  cols.forEach(c => sensorState.selectedCols.add(c));
  renderSensorColPills();
  if (sensorState.defect.causal) renderDefectConfig();
}
function deselectAllSensorCols() {
  sensorState.selectedCols.clear();
  renderSensorColPills();
  if (sensorState.defect.causal) renderDefectConfig();
}

async function generateSensor() {
  clearTerminal('sensor-log');
  const log = makeLogger('sensor-log');
  setProgress('sensor-bar', 'sensor-progress', 1);
  sensorState.generated = false;
  document.getElementById('sensor-results').style.display = 'none';

  const cols = [...sensorState.selectedCols];
  if (!cols.length) { log('❌ 최소 1개 이상의 센서 컬럼을 선택하세요.', 't-err'); return; }

  const demoMode = !authState.authed;
  sensorState.processType = document.getElementById('sensor-process').value;
  sensorState.factories   = +document.getElementById('sensor-factories').value;
  sensorState.lines       = +document.getElementById('sensor-lines').value;
  const period = demoMode ? 'custom' : document.getElementById('sensor-period').value;
  const customRows = demoMode ? DEMO_LIMIT : +document.getElementById('sensor-custom-rows').value;
  const customIntervalVal = +document.getElementById('sensor-custom-interval').value || 1;
  const customIntervalUnit = document.getElementById('sensor-custom-interval-unit').value;
  const intervalSec = customIntervalVal * (customIntervalUnit === 's' ? 1 : customIntervalUnit === 'm' ? 60 : 3600);

  if (demoMode) log(`⚠️ DEMO 모드: 최대 ${DEMO_LIMIT}행으로 제한됩니다.`, 't-warn');

  const defectCfg = sensorState.defect.enabled ? { ...sensorState.defect, weights: { ...sensorState.defect.weights } } : null;
  sensorState.causalFormula = null;

  try {
    const { records, headers } = await generateSensorData(
      sensorState.processType, sensorState.factories, sensorState.lines,
      period, customRows, cols, sensorState.anomalies,
      pct => setProgress('sensor-bar', 'sensor-progress', pct),
      log, intervalSec, sensorState.difficulty, sensorState.corrGroups, defectCfg
    );
    sensorState.records = records;
    sensorState.headers = headers;
    if (defectCfg && defectCfg.causal) {
      sensorState.causalFormula = { weights: { ...sensorState.defect.weights }, noiseStd: sensorState.defect.noiseStd, rate: sensorState.defect.rate };
    }
    sensorState.outputData = toFormat(records, headers, sensorState.format, 'sensor_data');
    sensorState.generated = true;
    renderSensorResults();
  } catch (e) {
    log('❌ 오류: ' + e.message, 't-err');
  }
  setProgress('sensor-bar', 'sensor-progress', 100);
}

function renderSensorResults() {
  const { records, headers, outputData, causalFormula } = sensorState;
  const firstCol = [...sensorState.selectedCols][0] || '';
  const vals = records.map(r => r[firstCol]).filter(v => v !== '' && v !== null && typeof v === 'number');
  const avg = vals.length ? (vals.reduce((a,b) => a+b,0) / vals.length).toFixed(2) : '-';
  const maxV = vals.length ? Math.max(...vals).toFixed(2) : '-';
  const minV = vals.length ? Math.min(...vals).toFixed(2) : '-';
  const nullCnt = records.filter(r => r[firstCol] === '' || r[firstCol] === null).length;

  document.getElementById('sensor-stat-total').textContent = records.length.toLocaleString();
  document.getElementById('sensor-stat-avg').textContent   = avg;
  document.getElementById('sensor-stat-max').textContent   = maxV;
  document.getElementById('sensor-stat-min').textContent   = minV;
  document.getElementById('sensor-stat-null').textContent  = nullCnt;

  const defectWrap = document.getElementById('sensor-stat-defect-wrap');
  const defectEl   = document.getElementById('sensor-stat-defect');
  if (sensorState.defect && sensorState.defect.enabled && defectWrap && defectEl) {
    const defectKey = sensorState.defect.format === 'str' ? 'NG' : 1;
    const dc = records.filter(r => r.defect_yn === defectKey).length;
    defectWrap.style.display = '';
    defectEl.textContent = dc.toLocaleString() + ` (${records.length ? (dc / records.length * 100).toFixed(1) : 0}%)`;
  } else if (defectWrap) {
    defectWrap.style.display = 'none';
  }

  const causalEl = document.getElementById('sensor-causal-result');
  if (causalEl) {
    if (causalFormula) {
      const defectKey = sensorState.defect.format === 'str' ? 'NG' : 1;
      const defectCount = records.filter(r => r.defect_yn === defectKey).length;
      const defectRate = records.length ? (defectCount / records.length * 100).toFixed(1) : '0';
      const activeW = Object.entries(causalFormula.weights).filter(([, w]) => w !== 0);
      const weightRows = activeW.map(([col, w]) => {
        const label = SENSOR_COL_LABELS[col] || col;
        const dir = w > 0 ? '▲ 높을수록 불량↑' : '▼ 높을수록 불량↓';
        const c = w > 0 ? 'var(--danger)' : 'var(--accent3)';
        return `<tr>
          <td style="padding:5px 8px;font-size:.8rem;color:var(--text-dim)">${label}</td>
          <td style="padding:5px 8px;font-size:.8rem;font-family:monospace;color:${c};text-align:center">${w > 0 ? '+' : ''}${w}</td>
          <td style="padding:5px 8px;font-size:.78rem;color:${c}">${dir}</td>
        </tr>`;
      }).join('');

      causalEl.style.display = '';
      causalEl.innerHTML = `
        <div class="stat-grid" style="margin-bottom:12px">
          <div class="stat-box"><div class="stat-value" style="color:var(--danger)">${defectCount.toLocaleString()}</div><div class="stat-label">실제 불량 건수</div></div>
          <div class="stat-box"><div class="stat-value" style="color:var(--warning)">${defectRate}%</div><div class="stat-label">실제 불량률</div></div>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="card-title" style="color:var(--accent2)">인과 분석 — 정답 공식</span>
            <button onclick="var b=document.getElementById('formula-body');var open=b.style.display!=='none';b.style.display=open?'none':'';this.textContent=open?'공식 보기 ▼':'접기 ▲';"
              class="btn btn-outline" style="padding:3px 12px;font-size:11px">공식 보기 ▼</button>
          </div>
          <div id="formula-body" style="display:none;padding:10px 0">
            <div style="font-family:monospace;font-size:.8rem;background:rgba(0,0,0,0.3);padding:10px 14px;border-radius:6px;border:1px solid var(--border);margin-bottom:12px;line-height:1.8">
              signal = Σ wᵢ·zᵢ + ε &nbsp;&nbsp; scale = 4·√(Σwᵢ² + noiseStd²)<br>
              <span style="color:var(--accent)">defect_score</span> = clamp(0.5 + signal / scale, 0, 1)<br>
              <span style="color:var(--accent)">defect_yn</span> = 1 if defect_score &gt; threshold &nbsp;(threshold = Φ⁻¹(${(1 - causalFormula.rate/100).toFixed(2)}) × 0.25 + 0.5)<br>
              <span style="color:var(--text-dim)">zᵢ = (센서값 − 정상 중앙값) / 정상 표준편차 &nbsp;|&nbsp; ε ~ N(0, ${causalFormula.noiseStd}) &nbsp;|&nbsp; 목표 불량률 ${causalFormula.rate}%</span>
            </div>
            <table style="width:100%;border-collapse:collapse">
              <thead><tr style="border-bottom:1px solid var(--border)">
                <th style="text-align:left;padding:5px 8px;font-size:.75rem;color:var(--text-dim)">센서 컬럼</th>
                <th style="text-align:center;padding:5px 8px;font-size:.75rem;color:var(--text-dim)">가중치 w</th>
                <th style="text-align:left;padding:5px 8px;font-size:.75rem;color:var(--text-dim)">인과 방향</th>
              </tr></thead>
              <tbody>${weightRows || '<tr><td colspan="3" style="padding:8px;font-size:.8rem;color:var(--text-dim)">설정된 가중치 없음</td></tr>'}</tbody>
            </table>
            <p style="font-size:.75rem;color:var(--text-dim);margin-top:10px">상관 분석 또는 로지스틱 회귀로 이 공식을 역추론해 보세요.</p>
          </div>
        </div>`;
    } else {
      causalEl.style.display = 'none';
      causalEl.innerHTML = '';
    }
  }

  renderTable('sensor-table', headers, records);
  document.getElementById('sensor-results').style.display = '';
}

function initDefectWeights() {
  const defaults = CAUSAL_WEIGHT_DEFAULTS[sensorState.processType] || {};
  const snapped = {};
  Object.entries(defaults).forEach(([col, w]) => {
    const abs = Math.abs(w);
    const s = abs >= 1.3 ? 1.5 : abs >= 0.7 ? 1.0 : 0.5;
    snapped[col] = w < 0 ? -s : s;
  });
  sensorState.defect.weights = snapped;
}

function sensorFormatChanged(fmt) {
  sensorState.format = fmt;
  renderFormatSelector('sensor-fmt', fmt, sensorFormatChanged);
  if (sensorState.generated) {
    sensorState.outputData = toFormat(sensorState.records, sensorState.headers, fmt, 'sensor_data');
  }
}

function sensorDiffChanged(d) {
  sensorState.difficulty = d;
  renderDifficultySelector('sensor-diff', d, sensorDiffChanged);
}

function downloadSensor() {
  if (!sensorState.generated) return;
  downloadData(sensorState.outputData, sensorState.format, 'sensor');
}
function copySensor() {
  navigator.clipboard.writeText(sensorState.outputData).catch(() => {});
}

// ========================================================
//  QUALITY TAB
// ========================================================
const qualityState = {
  product: 'pcb', count: 2000, defectRate: 0.035,
  defectTypes: new Set(['dimensional','surface','electrical']),
  difficulty: 'easy', format: 'csv',
  records: [], headers: [], outputData: '', generated: false, defectCount: 0,
};
const MFG_DEFECT_TYPES = [
  { value:'dimensional', label:'치수불량', food:false },
  { value:'surface',     label:'표면불량', food:false },
  { value:'electrical',  label:'전기불량', food:false },
  { value:'assembly',    label:'조립불량', food:false },
  { value:'contamination',label:'이물불량',food:false },
  { value:'weight',      label:'중량불량', food:true  },
  { value:'foreign_matter',label:'이물혼입',food:true },
  { value:'microbial',   label:'미생물오염',food:true },
  { value:'packaging',   label:'포장불량', food:true  },
  { value:'color_odor',  label:'색·향 이상',food:true },
  { value:'labeling',    label:'라벨오류', food:true  },
];

function initQualityTab() {
  renderQualityDefectTypes();
  renderQualityMeasures();
  renderDifficultySelector('quality-diff', qualityState.difficulty, qualityDiffChanged);
  renderFormatSelector('quality-fmt', qualityState.format, qualityFmtChanged);
}

function changeQualityProduct(val) {
  qualityState.product = val;
  const isFood = val.startsWith('food_');
  const defaults = MFG_DEFECT_TYPES.filter(d => d.food === isFood).slice(0, 3).map(d => d.value);
  qualityState.defectTypes = new Set(defaults);
  renderQualityDefectTypes();
  renderQualityMeasures();
}

function renderQualityDefectTypes() {
  const isFood = qualityState.product.startsWith('food_');
  const types = MFG_DEFECT_TYPES.filter(d => d.food === isFood);
  const el = document.getElementById('quality-defect-types');
  el.className = 'col-grid';
  el.innerHTML = types.map(d => {
    const sel = qualityState.defectTypes.has(d.value);
    return `<label class="col-pill ${sel ? 'selected' : ''}" onclick="toggleQualityDefect('${d.value}')">
      <input type="checkbox" ${sel ? 'checked' : ''} style="width:auto" onclick="event.stopPropagation();toggleQualityDefect('${d.value}')">
      ${d.label}
    </label>`;
  }).join('');
}

function toggleQualityDefect(val) {
  if (qualityState.defectTypes.has(val)) qualityState.defectTypes.delete(val);
  else qualityState.defectTypes.add(val);
  renderQualityDefectTypes();
}

function renderQualityMeasures() {
  const measures = MEASURES_BY_PRODUCT[qualityState.product] || MEASURES_BY_PRODUCT['pcb'];
  const el = document.getElementById('quality-measures');
  el.innerHTML = measures.map((m, idx) => `
    <div class="form-group">
      <label class="input-label">${m.label}</label>
      <div class="inline-row">
        <input type="number" class="input-field" id="qm${idx}-mean" value="${m.mean}" step="any" style="flex:1">
        <span style="color:var(--text-dim);font-size:12px">±</span>
        <input type="number" class="input-field" id="qm${idx}-std"  value="${m.std}"  step="any" style="flex:1">
      </div>
    </div>`).join('');
}

async function generateQuality() {
  clearTerminal('quality-log');
  const log = makeLogger('quality-log');
  setProgress('quality-bar', 'quality-progress', 1);
  qualityState.generated = false;
  document.getElementById('quality-results').style.display = 'none';

  const demoMode = !authState.authed;
  const count = demoMode ? DEMO_LIMIT : +document.getElementById('quality-count').value;
  const defectRate = +document.getElementById('quality-defect-rate').value / 100;
  const measures = (MEASURES_BY_PRODUCT[qualityState.product] || MEASURES_BY_PRODUCT['pcb']).map((m, idx) => ({
    ...m,
    mean: +document.getElementById(`qm${idx}-mean`).value,
    std:  +document.getElementById(`qm${idx}-std`).value,
  }));

  if (demoMode) log(`⚠️ DEMO 모드: 최대 ${DEMO_LIMIT}행으로 제한됩니다.`, 't-warn');

  try {
    const { records, headers, defectCount } = await generateQualityData(
      qualityState.product, count, defectRate, [...qualityState.defectTypes],
      measures, pct => setProgress('quality-bar', 'quality-progress', pct), log, qualityState.difficulty
    );
    qualityState.records = records;
    qualityState.headers = headers;
    qualityState.defectCount = defectCount;
    qualityState.outputData = toFormat(records, headers, qualityState.format, 'quality_data');
    qualityState.generated = true;
    renderQualityResults(count, defectCount);
  } catch (e) { log('❌ 오류: ' + e.message, 't-err'); }
  setProgress('quality-bar', 'quality-progress', 100);
}

function renderQualityResults(total, defects) {
  document.getElementById('quality-stat-total').textContent  = total.toLocaleString();
  document.getElementById('quality-stat-defects').textContent = defects.toLocaleString();
  document.getElementById('quality-stat-rate').textContent   = total ? (defects/total*100).toFixed(2) + '%' : '-';
  document.getElementById('quality-stat-ok').textContent     = (total - defects).toLocaleString();
  renderTable('quality-table', qualityState.headers, qualityState.records);
  document.getElementById('quality-results').style.display = '';
}

function qualityDiffChanged(d) { qualityState.difficulty = d; renderDifficultySelector('quality-diff', d, qualityDiffChanged); }
function qualityFmtChanged(f) { qualityState.format = f; renderFormatSelector('quality-fmt', f, qualityFmtChanged); if (qualityState.generated) qualityState.outputData = toFormat(qualityState.records, qualityState.headers, f, 'quality_data'); }
function downloadQuality() { if (qualityState.generated) downloadData(qualityState.outputData, qualityState.format, 'quality'); }
function copyQuality() { navigator.clipboard.writeText(qualityState.outputData).catch(() => {}); }

// ========================================================
//  EQUIPMENT TAB
// ========================================================
const equipState = {
  eqCount: 5, days: 30, eqType: 'PRESS', mtbf: 720,
  difficulty: 'easy', format: 'csv',
  records: [], headers: [], outputData: '', generated: false,
};

function initEquipTab() {
  renderDifficultySelector('equip-diff', equipState.difficulty, equipDiffChanged);
  renderFormatSelector('equip-fmt', equipState.format, equipFmtChanged);
}

async function generateEquip() {
  clearTerminal('equip-log');
  const log = makeLogger('equip-log');
  setProgress('equip-bar', 'equip-progress', 1);
  equipState.generated = false;
  document.getElementById('equip-results').style.display = 'none';

  const demoMode = !authState.authed;
  const eqCount = demoMode ? 2 : +document.getElementById('equip-count').value;
  const days    = demoMode ? 7 : +document.getElementById('equip-days').value;
  const eqType  = document.getElementById('equip-type').value;
  const mtbf    = +document.getElementById('equip-mtbf').value;
  if (demoMode) log(`⚠️ DEMO 모드: 설비 2개 × 7일 제한됩니다.`, 't-warn');

  try {
    const { records, headers } = await generateEquipmentData(
      eqCount, days, eqType, mtbf,
      pct => setProgress('equip-bar', 'equip-progress', pct), log, equipState.difficulty
    );
    equipState.records = records;
    equipState.headers = headers;
    equipState.outputData = toFormat(records, headers, equipState.format, 'equipment_data');
    equipState.generated = true;
    renderEquipResults();
  } catch (e) { log('❌ 오류: ' + e.message, 't-err'); }
  setProgress('equip-bar', 'equip-progress', 100);
}

function renderEquipResults() {
  const failCount = equipState.records.filter(r => r.maintenance_label === 'FAILURE').length;
  document.getElementById('equip-stat-total').textContent  = equipState.records.length.toLocaleString();
  document.getElementById('equip-stat-fail').textContent   = failCount.toLocaleString();
  document.getElementById('equip-stat-flag1').textContent  = equipState.records.filter(r => r.failure_within_24h === 1).length.toLocaleString();
  renderTable('equip-table', equipState.headers, equipState.records);
  document.getElementById('equip-results').style.display = '';
}

function equipDiffChanged(d) { equipState.difficulty = d; renderDifficultySelector('equip-diff', d, equipDiffChanged); }
function equipFmtChanged(f) { equipState.format = f; renderFormatSelector('equip-fmt', f, equipFmtChanged); if (equipState.generated) equipState.outputData = toFormat(equipState.records, equipState.headers, f, 'equipment_data'); }
function downloadEquip() { if (equipState.generated) downloadData(equipState.outputData, equipState.format, 'equipment'); }
function copyEquip() { navigator.clipboard.writeText(equipState.outputData).catch(() => {}); }

// ========================================================
//  PRODUCTION (KPI) TAB
// ========================================================
const kpiState = {
  factories: 2, lines: 3, months: 3,
  grain: 'day', seasonal: 'mild', trend: 'none',
  difficulty: 'easy', format: 'csv',
  records: [], headers: [], outputData: '', generated: false,
};

function initKpiTab() {
  renderDifficultySelector('kpi-diff', kpiState.difficulty, kpiDiffChanged);
  renderFormatSelector('kpi-fmt', kpiState.format, kpiFmtChanged);
}

async function generateKpi() {
  clearTerminal('kpi-log');
  const log = makeLogger('kpi-log');
  setProgress('kpi-bar', 'kpi-progress', 1);
  kpiState.generated = false;
  document.getElementById('kpi-results').style.display = 'none';

  const demoMode = !authState.authed;
  const factories = +document.getElementById('kpi-factories').value;
  const lines     = +document.getElementById('kpi-lines').value;
  const months    = demoMode ? 1 : +document.getElementById('kpi-months').value;
  const grain     = document.getElementById('kpi-grain').value;
  const seasonal  = document.getElementById('kpi-seasonal').value;
  const trend     = document.getElementById('kpi-trend').value;
  if (demoMode) log(`⚠️ DEMO 모드: 1개월로 제한됩니다.`, 't-warn');

  try {
    const { records, headers } = await generateKPIData(
      factories, lines, months, grain, seasonal, trend,
      pct => setProgress('kpi-bar', 'kpi-progress', pct), log, kpiState.difficulty
    );
    kpiState.records = records; kpiState.headers = headers;
    kpiState.outputData = toFormat(records, headers, kpiState.format, 'kpi_data');
    kpiState.generated = true;
    renderKpiResults();
  } catch (e) { log('❌ 오류: ' + e.message, 't-err'); }
  setProgress('kpi-bar', 'kpi-progress', 100);
}

function renderKpiResults() {
  const r = kpiState.records;
  const avgOee = r.length ? (r.reduce((a,b) => a + (b.oee_pct || 0), 0) / r.length).toFixed(1) + '%' : '-';
  const totalActual = r.reduce((a,b) => a + (b.actual_qty || 0), 0);
  document.getElementById('kpi-stat-total').textContent  = r.length.toLocaleString();
  document.getElementById('kpi-stat-oee').textContent    = avgOee;
  document.getElementById('kpi-stat-actual').textContent = totalActual.toLocaleString();
  renderTable('kpi-table', kpiState.headers, kpiState.records);
  document.getElementById('kpi-results').style.display = '';
}

function kpiDiffChanged(d) { kpiState.difficulty = d; renderDifficultySelector('kpi-diff', d, kpiDiffChanged); }
function kpiFmtChanged(f) { kpiState.format = f; renderFormatSelector('kpi-fmt', f, kpiFmtChanged); if (kpiState.generated) kpiState.outputData = toFormat(kpiState.records, kpiState.headers, f, 'kpi_data'); }
function downloadKpi() { if (kpiState.generated) downloadData(kpiState.outputData, kpiState.format, 'kpi'); }
function copyKpi() { navigator.clipboard.writeText(kpiState.outputData).catch(() => {}); }

// ========================================================
//  STREAM TAB  (교육생 뷰어 전용 — 1초 폴링)
// ========================================================
const GS_SCRIPT = `// ═══════════════════════════════════════════════════════════
//  MFG DataForge → Google Sheets 실시간 수신 스크립트
//  [배포 방법] 배포 → 새 배포 → 유형: 웹 앱
//             실행 계정: 나 / 액세스 권한: 모든 사용자
//             → 배포 후 생성된 웹 앱 URL을 사이트에 등록
// ═══════════════════════════════════════════════════════════

const SHEET_NAMES = {
  sensor:  'MFG_센서',
  alarm:   'MFG_알람',
  quality: 'MFG_품질',
  energy:  'MFG_에너지',
};

// 서버가 ~3초마다 JSON을 POST 전송 → 이 함수가 수신
function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const topic   = payload.topic  || 'sensor';
    const rows    = payload.rows   || [];
    if (rows.length === 0) return ok('no rows');

    const sheetName = SHEET_NAMES[topic] || 'MFG_Data';
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    let   sheet = ss.getSheetByName(sheetName);
    if (!sheet) sheet = ss.insertSheet(sheetName);

    // 헤더 행 자동 생성
    if (sheet.getLastRow() === 0) {
      const headers = Object.keys(rows[0]);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    const keys     = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const dataRows = rows.map(r => keys.map(k => r[k] !== undefined ? r[k] : ''));
    sheet.getRange(sheet.getLastRow() + 1, 1, dataRows.length, keys.length)
         .setValues(dataRows);

    return ok(dataRows.length + ' rows added');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err.message);
  }
}

function ok(msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', msg }))
    .setMimeType(ContentService.MimeType.JSON);
}`;

const STREAM_COL_LABELS = {
  temperature_c:'온도 (°C)', pressure_bar:'압력 (bar)', vibration_mm_s:'진동 (mm/s)',
  current_a:'전류 (A)', voltage_v:'전압 (V)', speed_rpm:'회전수 (RPM)',
  torque_nm:'토크 (N·m)', cycle_time_s:'사이클 시간 (s)', oil_temp_c:'오일 온도 (°C)',
  air_flow_lmin:'공기 유량 (L/min)', chamber_temp_c:'챔버 온도 (°C)',
  chamber_pressure_pa:'챔버 압력 (Pa)', rf_power_w:'RF 전력 (W)',
  gas_flow_sccm:'가스 유량 (sccm)', etch_rate_nm_min:'식각 속도 (nm/min)',
  wafer_temp_c:'웨이퍼 온도 (°C)', humidity_pct:'습도 (%)', particle_count:'파티클 수',
  cell_voltage_v:'셀 전압 (V)', cell_temp_c:'셀 온도 (°C)', charge_current_a:'충전 전류 (A)',
  discharge_current_a:'방전 전류 (A)', soc_pct:'충전 상태 SOC (%)',
  internal_resistance_mohm:'내부저항 (mΩ)', capacity_ah:'용량 (Ah)', cycle_count:'사이클 횟수',
  furnace_temp_c:'가열로 온도 (°C)', roll_speed_mpm:'압연 속도 (m/min)',
  roll_force_kn:'압연 하중 (kN)', strip_thickness_mm:'강판 두께 (mm)',
  cooling_water_temp_c:'냉각수 온도 (°C)', tension_kn:'장력 (kN)', surface_roughness_um:'표면 조도 (μm)',
  solder_temp_c:'솔더 온도 (°C)', conveyor_speed_cm_min:'컨베이어 속도 (cm/min)',
  flux_volume_ul:'플럭스 도포량 (μL)', preheat_temp_c:'예열 온도 (°C)',
  peak_temp_c:'피크 온도 (°C)', cooling_rate_c_s:'냉각 속도 (°C/s)', board_warp_mm:'기판 휨 (mm)',
  cell_efficiency_pct:'셀 변환효율 (%)', pmax_w:'최대출력 Pmax (W)', voc_v:'개방전압 Voc (V)',
  isc_a:'단락전류 Isc (A)', fill_factor_pct:'충전율 FF (%)', iv_current_a:'IV 측정 전류 (A)',
  iv_voltage_v:'IV 측정 전압 (V)', laminate_temp_c:'라미네이션 온도 (°C)',
  laminate_pressure_bar:'라미네이션 압력 (bar)', cure_time_s:'경화 시간 (s)',
  el_defect_pct:'EL 결함률 (%)', series_resistance_mohm:'직렬저항 Rs (mΩ)',
  igbt_temp_c:'IGBT 온도 (°C)', inductor_temp_c:'인덕터 온도 (°C)',
  dc_input_voltage_v:'DC 입력전압 (V)', ac_output_voltage_v:'AC 출력전압 (V)',
  output_current_a:'출력 전류 (A)', output_power_w:'출력 전력 (W)',
  conversion_efficiency_pct:'변환효율 (%)', thd_pct:'전고조파왜율 THD (%)',
  power_factor:'역률 PF', insulation_resistance_mohm:'절연저항 (MΩ)',
  switching_freq_khz:'스위칭주파수 (kHz)', capacitor_esr_mohm:'커패시터 ESR (mΩ)',
  pasteur_temp_c:'살균 온도 (°C)', pasteur_time_s:'살균 시간 (s)',
  fill_volume_ml:'충전 용량 (mL)', fill_temp_c:'충전 온도 (°C)',
  co2_pressure_bar:'CO₂ 압력 (bar)', brix_degree:'당도 Brix (°Bx)',
  ph_level:'pH', turbidity_ntu:'탁도 (NTU)', conveyor_speed_bpm:'컨베이어 속도 (bpm)',
  cip_conductivity_ms:'CIP 전도도 (mS)', dough_temp_c:'반죽 온도 (°C)',
  dough_moisture_pct:'반죽 수분 (%)', oven_temp_c:'오븐 온도 (°C)',
  oven_humidity_pct:'오븐 습도 (%)', bake_time_s:'굽기 시간 (s)',
  conveyor_speed_mpm:'컨베이어 속도 (m/min)', weight_g:'제품 중량 (g)',
  color_l_value:'색도 L값', cooling_temp_c:'냉각 온도 (°C)', co2_ppm:'CO₂ 농도 (ppm)',
  raw_milk_temp_c:'원유 온도 (°C)', homogen_pressure_bar:'균질 압력 (bar)',
  culture_temp_c:'배양 온도 (°C)', ferment_ph:'발효 pH', ferment_time_min:'발효 시간 (min)',
  fat_pct:'지방 함량 (%)', protein_pct:'단백질 함량 (%)', fill_weight_g:'충전 중량 (g)',
  cold_storage_temp_c:'냉장 온도 (°C)', inlet_temp_c:'투입 온도 (°C)',
  cutting_speed_rpm:'절단 속도 (RPM)', blade_pressure_bar:'칼날 압력 (bar)',
  marinate_conc_pct:'절임 농도 (%)', smoke_temp_c:'훈연 온도 (°C)',
  smoke_time_min:'훈연 시간 (min)', core_temp_c:'심부 온도 (°C)',
  freezer_temp_c:'냉동 온도 (°C)', freeze_time_min:'냉동 시간 (min)', moisture_pct:'수분 함량 (%)',
  retort_temp_c:'레토르트 온도 (°C)', retort_pressure_bar:'레토르트 압력 (bar)',
  sterilize_time_min:'살균 시간 (min)', headspace_mm:'헤드스페이스 (mm)',
  seam_tightness_pct:'밀봉 강도 (%)', vacuum_kpa:'진공도 (kPa)', fo_value:'F₀ 값',
  alarm_type:'알람 유형', severity:'심각도', value:'측정값', ack:'확인 여부',
  product_id:'제품 ID', line_id:'라인 ID', m1:'측정값 1', m2:'측정값 2', result:'결과(OK/NG)',
  meter_id:'미터 ID', power_kw:'전력 (kW)', pf:'역률', frequency_hz:'주파수 (Hz)',
};

const STREAM_SENSOR_COLS_BY_PROCESS = {
  automotive:     ['temperature_c','pressure_bar','vibration_mm_s','current_a','voltage_v','speed_rpm','torque_nm','cycle_time_s','oil_temp_c','air_flow_lmin'],
  semiconductor:  ['chamber_temp_c','chamber_pressure_pa','rf_power_w','gas_flow_sccm','etch_rate_nm_min','wafer_temp_c','humidity_pct','particle_count'],
  battery:        ['cell_voltage_v','cell_temp_c','charge_current_a','discharge_current_a','soc_pct','internal_resistance_mohm','capacity_ah','cycle_count'],
  steel:          ['furnace_temp_c','roll_speed_mpm','roll_force_kn','strip_thickness_mm','cooling_water_temp_c','tension_kn','surface_roughness_um'],
  pcb:            ['solder_temp_c','conveyor_speed_cm_min','flux_volume_ul','preheat_temp_c','peak_temp_c','cooling_rate_c_s','board_warp_mm'],
  solar_module:   ['cell_efficiency_pct','pmax_w','voc_v','isc_a','fill_factor_pct','iv_current_a','iv_voltage_v','laminate_temp_c','laminate_pressure_bar','cure_time_s','el_defect_pct','series_resistance_mohm'],
  solar_inverter: ['igbt_temp_c','inductor_temp_c','dc_input_voltage_v','ac_output_voltage_v','output_current_a','output_power_w','conversion_efficiency_pct','thd_pct','power_factor','insulation_resistance_mohm','switching_freq_khz','capacitor_esr_mohm'],
  food_beverage:  ['pasteur_temp_c','pasteur_time_s','fill_volume_ml','fill_temp_c','co2_pressure_bar','brix_degree','ph_level','turbidity_ntu','conveyor_speed_bpm','cip_conductivity_ms'],
  food_baking:    ['dough_temp_c','dough_moisture_pct','oven_temp_c','oven_humidity_pct','bake_time_s','conveyor_speed_mpm','weight_g','color_l_value','cooling_temp_c','co2_ppm'],
  food_dairy:     ['raw_milk_temp_c','pasteur_temp_c','homogen_pressure_bar','culture_temp_c','ferment_ph','ferment_time_min','fat_pct','protein_pct','fill_weight_g','cold_storage_temp_c'],
  food_meat:      ['inlet_temp_c','cutting_speed_rpm','blade_pressure_bar','marinate_conc_pct','smoke_temp_c','smoke_time_min','core_temp_c','freezer_temp_c','freeze_time_min','moisture_pct'],
  food_retort:    ['retort_temp_c','retort_pressure_bar','sterilize_time_min','fill_weight_g','headspace_mm','seam_tightness_pct','vacuum_kpa','cooling_water_temp_c','fo_value','ph_level'],
  coal_thermal:   ['active_power_mw','main_steam_temp_c','main_steam_pressure_bar','coal_flow_th','turbine_vibration_um','bearing_temp_c','flue_gas_o2_pct','nox_ppm','sox_ppm','heat_rate_kcal_kwh'],
  lng_combined:   ['active_power_mw','gt_output_mw','st_output_mw','turbine_inlet_temp_c','exhaust_gas_temp_c','bearing_vibration_mm_s','nox_ppm','co_ppm','lube_oil_temp_c','thermal_efficiency_pct'],
};

const STREAM_TOPIC_COLUMNS_FIXED = {
  alarm:   ['alarm_type','severity','value','ack'],
  quality: ['product_id','line_id','m1','m2','result'],
  energy:  ['meter_id','power_kw','voltage_v','pf','frequency_hz'],
};

const POLL_MS_ACTIVE = 5000;   // 스트림 실행 중
const POLL_MS_IDLE   = 30000;  // 스트림 멈춤

const streamViewer = {
  pollTimer: null,
  lastMsgCount: 0,
  isRunning: false,
  webhookUrl: localStorage.getItem('mfg_webhook_url') || '',
  webhookBatch: [],
  webhookTimer: null,
  powerBiUrl: localStorage.getItem('mfg_pbi_url') || '',
  powerBiBatch: [],
  powerBiTimer: null,
};

function initStreamTab() {
  const ta = document.getElementById('gs-script');
  if (ta) ta.value = GS_SCRIPT;
  renderWebhookStatus();
  renderPowerBiStatus();
  startStreamPoll();
  // 탭 비활성화 시 폴링 중단, 복귀 시 재개
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearTimeout(streamViewer.pollTimer);
    } else {
      pollStreamState();
      schedulePoll();
    }
  });
}

function startStreamPoll() {
  pollStreamState();
  schedulePoll();
}

function schedulePoll() {
  clearTimeout(streamViewer.pollTimer);
  if (document.hidden) return;
  const ms = streamViewer.isRunning ? POLL_MS_ACTIVE : POLL_MS_IDLE;
  streamViewer.pollTimer = setTimeout(async () => {
    await pollStreamState();
    schedulePoll();
  }, ms);
}

async function pollStreamState() {
  try {
    const res = await fetch('api/stream_state.php');
    const d = await res.json();
    streamViewer.isRunning = !!d.running;
    renderViewerStatus(d);

    // 새 메시지 표시 — recentMsgs는 {ts, msg, cls} 형식
    const msgs = d.recentMsgs || [];
    const logEl = document.getElementById('stream-log');
    // 스트림 재시작 감지 (msgCount가 줄었거나 첫 폴링)
    const restarted = d.msgCount < streamViewer.lastMsgCount;
    if (msgs.length > 0 && (d.msgCount !== streamViewer.lastMsgCount || restarted)) {
      if (streamViewer.lastMsgCount === 0 || restarted) {
        logEl.innerHTML = '';
      }
      const newCount = restarted ? msgs.length : Math.max(d.msgCount - streamViewer.lastMsgCount, 1);
      const newMsgs = msgs.slice(-newCount);
      newMsgs.forEach(m => {
        const line = document.createElement('div');
        const color = m.cls === 'err' ? 'var(--danger)' : m.cls === 'warn' ? '#ffb347' : 'var(--accent3)';
        line.innerHTML = `<span style="color:var(--text-dim)">${m.ts}</span> <span style="color:${color}">${m.msg}</span>`;
        logEl.appendChild(line);
        if (logEl.children.length > 200) logEl.removeChild(logEl.firstChild);

        // Google Sheets webhook 전송
        if (streamViewer.webhookUrl) {
          try { streamViewer.webhookBatch.push(JSON.parse(m.msg)); } catch(e) {}
          if (!streamViewer.webhookTimer) {
            streamViewer.webhookTimer = setTimeout(() => {
              if (streamViewer.webhookBatch.length) {
                fetch(streamViewer.webhookUrl, {
                  method: 'POST', mode: 'no-cors',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ topic: d.topic, rows: streamViewer.webhookBatch }),
                }).catch(() => {});
                streamViewer.webhookBatch = [];
              }
              streamViewer.webhookTimer = null;
            }, 3000);
          }
        }

        // Power BI Streaming Dataset 전송 (rows 배열 직접 전송)
        if (streamViewer.powerBiUrl) {
          try { streamViewer.powerBiBatch.push(JSON.parse(m.msg)); } catch(e) {}
          if (!streamViewer.powerBiTimer) {
            streamViewer.powerBiTimer = setTimeout(() => {
              if (streamViewer.powerBiBatch.length) {
                fetch(streamViewer.powerBiUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(streamViewer.powerBiBatch),
                }).catch(() => {});
                streamViewer.powerBiBatch = [];
              }
              streamViewer.powerBiTimer = null;
            }, 3000);
          }
        }
      });
      logEl.scrollTop = logEl.scrollHeight;
      streamViewer.lastMsgCount = d.msgCount;
    }

    // 스트림이 중지되면 카운터 초기화
    if (!d.running && streamViewer.lastMsgCount > 0 && (d.msgCount || 0) === 0) {
      streamViewer.lastMsgCount = 0;
    }
  } catch(e) {}
}

const TOPIC_MAP = { sensor: '공정 센서', alarm: '알람/이벤트', quality: '품질 측정', energy: '에너지' };

function renderStreamColumns(d) {
  const row = document.getElementById('si-columns-row');
  const el  = document.getElementById('si-columns');
  if (!row || !el) return;
  if (!d.running || !d.config) { row.style.display = 'none'; return; }

  let selectedIds = d.config.columns && d.config.columns.length ? d.config.columns : null;
  if (!selectedIds) {
    if (d.topic === 'sensor') {
      const process = d.config.process || 'automotive';
      selectedIds = STREAM_SENSOR_COLS_BY_PROCESS[process] || STREAM_SENSOR_COLS_BY_PROCESS.automotive;
    } else {
      selectedIds = STREAM_TOPIC_COLUMNS_FIXED[d.topic] || [];
    }
  }

  el.innerHTML = selectedIds.map(id => {
    const label = STREAM_COL_LABELS[id] || id;
    return `<span style="display:inline-block;padding:2px 8px;background:rgba(0,212,255,0.08);border:1px solid rgba(0,212,255,0.25);border-radius:3px;font-size:11px;color:var(--accent);white-space:nowrap">${label}</span>`;
  }).join('');

  row.style.display = '';
  renderPowerBiSchema(selectedIds.map(id => STREAM_COL_LABELS[id] || id));
}

function renderViewerStatus(d) {
  const running = d.running;

  const pulse = document.getElementById('stream-pulse');
  const statusText = document.getElementById('stream-status-text');
  const countEl = document.getElementById('stream-msg-count');
  const siTopic = document.getElementById('si-topic');
  const siRate  = document.getElementById('si-rate');
  const siCount = document.getElementById('si-count');
  const siDb    = document.getElementById('si-db');

  if (pulse) pulse.className = 'pulse ' + (running ? 'on' : 'off');
  if (statusText) {
    statusText.textContent = running ? 'STREAMING' : 'STOPPED';
    statusText.style.color = running ? 'var(--accent3)' : 'var(--text-dim)';
  }
  if (countEl) countEl.textContent = (d.msgCount || 0).toLocaleString() + ' msg';
  if (siTopic) siTopic.textContent = d.topic ? (TOPIC_MAP[d.topic] || d.topic) : '-';
  if (siRate)  siRate.textContent  = d.rate  ? d.rate + ' msg/s' : '-';
  if (siCount) siCount.textContent = d.msgCount != null ? d.msgCount.toLocaleString() : '-';
  if (siDb)    siDb.textContent    = running ? (d.dbEnabled ? '활성화' : '비활성화') : '-';
  renderStreamColumns(d);
}

function copyGsScript() {
  const ta = document.getElementById('gs-script');
  if (!ta) return;
  navigator.clipboard.writeText(ta.value).then(() => {
    const btn = document.getElementById('gs-copy-btn');
    if (btn) {
      btn.textContent = '✓ COPIED';
      btn.style.background = 'var(--accent3)';
      btn.style.borderColor = 'var(--accent3)';
      btn.style.color = 'var(--bg)';
      setTimeout(() => {
        btn.textContent = 'COPY';
        btn.style.background = 'transparent';
        btn.style.borderColor = 'var(--border)';
        btn.style.color = 'var(--text-dim)';
      }, 2000);
    }
  }).catch(() => { ta.select(); document.execCommand('copy'); });
}

function renderPowerBiSchema(cols) {
  const el = document.getElementById('pbi-schema-hint');
  if (!el || !cols || !cols.length) return;
  const typeMap = c => {
    if (c.includes('time') || c.includes('ts') || c.includes('date')) return 'DateTime';
    if (c.includes('id') || c.includes('count') || c.includes('num')) return 'Int64';
    return 'Number';
  };
  el.innerHTML = cols.map(c =>
    `<span style="color:var(--text-dim)">컬럼명:</span> <span style="color:#f59e0b">${c}</span>  <span style="color:var(--text-dim)">형식:</span> <span style="color:var(--accent4)">${typeMap(c)}</span>`
  ).join('<br>');
}

function registerPowerBi() {
  const url = document.getElementById('pbi-url-input').value.trim();
  const msgEl = document.getElementById('pbi-msg');
  if (!url.startsWith('https://api.powerbi.com')) {
    msgEl.style.display = ''; msgEl.style.color = 'var(--danger)';
    msgEl.textContent = '✗ https://api.powerbi.com 으로 시작하는 Push URL을 입력하세요.';
    setTimeout(() => { msgEl.style.display = 'none'; }, 3000);
    return;
  }
  streamViewer.powerBiUrl = url;
  localStorage.setItem('mfg_pbi_url', url);
  document.getElementById('pbi-url-input').value = '';
  renderPowerBiStatus();
  msgEl.style.display = ''; msgEl.style.color = '#f59e0b';
  msgEl.textContent = '✓ 등록 완료 — 스트리밍 시작 시 3초마다 Power BI로 데이터가 전송됩니다.';
  setTimeout(() => { msgEl.style.display = 'none'; }, 4000);
}

function unregisterPowerBi() {
  streamViewer.powerBiUrl = '';
  localStorage.removeItem('mfg_pbi_url');
  renderPowerBiStatus();
}

function renderPowerBiStatus() {
  const registered = !!streamViewer.powerBiUrl;
  const reg = document.getElementById('pbi-reg-section');
  const act = document.getElementById('pbi-active-section');
  const urlEl = document.getElementById('pbi-active-url');
  if (reg) reg.style.display = registered ? 'none' : '';
  if (act) act.style.display = registered ? '' : 'none';
  if (registered && urlEl) urlEl.textContent = streamViewer.powerBiUrl;
}

function registerWebhook() {
  const url = document.getElementById('stream-webhook-input').value.trim();
  const msgEl = document.getElementById('stream-webhook-msg');
  if (!url.startsWith('https://')) {
    if (msgEl) { msgEl.style.display = ''; msgEl.style.color = 'var(--danger)'; msgEl.textContent = '✗ 등록 실패 — https://script.google.com 으로 시작하는 웹 앱 URL을 입력하세요.'; }
    setTimeout(() => { if (msgEl) msgEl.style.display = 'none'; }, 3000);
    return;
  }
  streamViewer.webhookUrl = url;
  localStorage.setItem('mfg_webhook_url', url);
  document.getElementById('stream-webhook-input').value = '';
  renderWebhookStatus();
  if (msgEl) {
    msgEl.style.display = '';
    msgEl.style.color = 'var(--accent3)';
    msgEl.textContent = '✓ 등록 완료 — 관리자가 스트리밍을 시작하면 3초마다 내 시트로 데이터가 전송됩니다.';
    setTimeout(() => { msgEl.style.display = 'none'; }, 4000);
  }
}

function unregisterWebhook() {
  streamViewer.webhookUrl = '';
  localStorage.removeItem('mfg_webhook_url');
  renderWebhookStatus();
}

function renderWebhookStatus() {
  const registered = !!streamViewer.webhookUrl;
  document.getElementById('stream-webhook-reg-section').style.display = registered ? 'none' : '';
  document.getElementById('stream-webhook-active-section').style.display = registered ? '' : 'none';
  if (registered) document.getElementById('stream-webhook-active-url').textContent = '✓ ' + streamViewer.webhookUrl;
}

// ========================================================
//  INIT
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
  renderBanner();
  initSensorTab();
  initQualityTab();
  initEquipTab();
  initKpiTab();
  initStreamTab();
  renderWebhookStatus();
  initMobileTabSelect();
  // 로그인 엔터키
  document.getElementById('login-pw').addEventListener('keydown', e => { if (e.key === 'Enter') submitLogin(); });
});
