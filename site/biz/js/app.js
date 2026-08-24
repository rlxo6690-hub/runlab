// ============================================================
//  BIZ DataForge — App Logic
// ============================================================

const DEMO_LIMIT = window.BIZ_DEMO_LIMIT || 100;
let authed = window.BIZ_AUTHED || false;

// ── 저장소 ──────────────────────────────────────────────────
const stored = { demand: null, finance: null, customer: null, supply: null, hr: null };
let currentFmt = { demand: 'csv', finance: 'csv', customer: 'csv', supply: 'csv', hr: 'csv' };

// ── 유틸 ────────────────────────────────────────────────────
function log(id, msg, cls='') {
  const el = document.getElementById(id+'-log');
  if (!el) return;
  const ts = new Date().toLocaleTimeString('ko-KR');
  el.innerHTML += `\n<span class="${cls}">[${ts}] ${msg}</span>`;
  el.scrollTop = el.scrollHeight;
}
function setProgress(id, pct) {
  const wrap = document.getElementById(id+'-progress');
  const bar  = document.getElementById(id+'-bar');
  if (!wrap || !bar) return;
  if (pct === null) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  bar.style.width = pct + '%';
}
function setAuthed(v) {
  authed = v;
  const banner = document.getElementById('demo-banner');
  if (v) {
    banner.innerHTML = '<span style="color:var(--accent3)">✓ 인증됨 — 전체 행 생성 제한 해제</span>';
    banner.style.background = 'rgba(57,255,20,0.05)';
    banner.style.borderBottom = '1px solid rgba(57,255,20,0.2)';
  } else {
    banner.innerHTML = `<span style="color:var(--warning)">⚠ 데모 모드 — 최대 ${DEMO_LIMIT}행으로 제한됩니다.</span>
      <button onclick="document.getElementById('login-modal').classList.add('show')" class="btn" style="padding:4px 16px;font-size:11px;background:var(--accent2);border-color:var(--accent2);color:#fff">교육 코드 입력</button>`;
    banner.style.background = 'rgba(255,165,0,0.05)';
    banner.style.borderBottom = '1px solid rgba(255,165,0,0.2)';
  }
}
function fmtN(n) { return Number(n).toLocaleString('ko-KR'); }

// ── 탭 전환 ─────────────────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-'+name);
  if (panel) panel.style.display = '';
  const btn = document.querySelector(`[data-tab="${name}"]`);
  if (btn) btn.classList.add('active');
  const sel = document.getElementById('tab-select-mobile');
  if (sel) sel.value = name;
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
    opt.textContent = btn.textContent.trim().replace(/\s+/g, ' ');
    if (btn.classList.contains('active')) opt.selected = true;
    select.appendChild(opt);
  });

  select.addEventListener('change', () => switchTab(select.value));
  tabBar.parentNode.insertBefore(select, tabBar);
}

// ── 로그인 ──────────────────────────────────────────────────
async function submitLogin() {
  const pw = document.getElementById('login-pw').value;
  const err = document.getElementById('login-err');
  err.textContent = '';
  try {
    const res = await fetch('/mfg/api/login.php', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ password: pw }),
    });
    const data = await res.json();
    if (data.ok) {
      setAuthed(true);
      document.getElementById('login-modal').classList.remove('show');
    } else {
      err.textContent = '코드가 올바르지 않습니다.';
    }
  } catch(e) {
    err.textContent = '오류가 발생했습니다.';
  }
}

// ── 포맷 렌더 ────────────────────────────────────────────────
function renderFmt(tabId) {
  const el = document.getElementById(tabId+'-fmt');
  if (!el) return;
  el.innerHTML = `
    <div style="display:flex;gap:12px;flex-wrap:wrap">
      ${['csv','json','tsv'].map(f=>`
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:13px">
          <input type="radio" name="${tabId}-fmt" value="${f}" ${currentFmt[tabId]===f?'checked':''} onchange="currentFmt['${tabId}']=this.value">
          <span style="font-family:'Space Mono',monospace;text-transform:uppercase">${f}</span>
        </label>`).join('')}
    </div>`;
}

// ── 난이도 렌더 ──────────────────────────────────────────────
function renderDiff(tabId, levels) {
  const el = document.getElementById(tabId+'-diff');
  if (!el) return;
  el.innerHTML = levels.map(([id, label, desc, checked]) => `
    <div style="margin-bottom:10px">
      <label style="display:flex;gap:10px;align-items:flex-start;cursor:pointer">
        <input type="radio" name="${tabId}-diff" value="${id}" ${checked?'checked':''} style="margin-top:3px">
        <div>
          <div style="font-size:13px;font-weight:600">${label}</div>
          <div style="font-size:11px;color:var(--text-dim);margin-top:2px">${desc}</div>
        </div>
      </label>
    </div>`).join('');
}

// ── 컬럼 체크박스 렌더 ───────────────────────────────────────
function renderCols(tabId, cols) {
  const el = document.getElementById(tabId+'-cols');
  if (!el) return;
  el.innerHTML = cols.map(([id, label, checked]) => `
    <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;font-size:13px">
      <input type="checkbox" id="${tabId}-col-${id}" ${checked?'checked':''}>
      <span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--accent3)">${id}</span>
      <span style="color:var(--text-dim);font-size:12px">${label}</span>
    </label>`).join('');
}

// ── 테이블 렌더 ─────────────────────────────────────────────
function renderTable(containerId, rows) {
  if (!rows || !rows.length) return;
  const preview = rows.slice(0, 20);
  const keys = Object.keys(preview[0]);
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = `<div class="table-wrap"><table class="schema-table">
    <thead><tr>${keys.map(k=>`<th>${k}</th>`).join('')}</tr></thead>
    <tbody>${preview.map(r=>`<tr>${keys.map(k=>`<td style="font-size:11px;white-space:nowrap">${r[k]??''}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div><div style="font-size:11px;color:var(--text-dim);margin-top:6px">상위 ${preview.length}행 미리보기 / 전체 ${fmtN(rows.length)}행</div>`;
}

// ── 데이터 변환 ─────────────────────────────────────────────
function toCSV(rows) {
  if (!rows || !rows.length) return '';
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(',')];
  for (const r of rows) lines.push(keys.map(k => {
    const v = r[k] ?? '';
    return String(v).includes(',') || String(v).includes('"') ? `"${String(v).replace(/"/g,'""')}"` : v;
  }).join(','));
  return lines.join('\n');
}
function toJSON(rows) { return JSON.stringify(rows, null, 2); }
function toTSV(rows) {
  if (!rows || !rows.length) return '';
  const keys = Object.keys(rows[0]);
  return [keys.join('\t'), ...rows.map(r => keys.map(k => r[k]??'').join('\t'))].join('\n');
}
function convertRows(rows, fmt) {
  if (fmt === 'json') return toJSON(rows);
  if (fmt === 'tsv')  return toTSV(rows);
  return toCSV(rows);
}

// ── 다운로드 / 복사 ─────────────────────────────────────────
function downloadData(tabId) {
  const rows = stored[tabId];
  if (!rows) return alert('먼저 데이터를 생성하세요.');
  const fmt = currentFmt[tabId] || 'csv';
  const ext = fmt === 'json' ? 'json' : fmt === 'tsv' ? 'tsv' : 'csv';
  const text = convertRows(rows, fmt);
  const blob = new Blob([text], {type:'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `dataforge_biz_${tabId}_${Date.now()}.${ext}`;
  a.click();
}
function copyData(tabId) {
  const rows = stored[tabId];
  if (!rows) return alert('먼저 데이터를 생성하세요.');
  const fmt = currentFmt[tabId] || 'csv';
  navigator.clipboard.writeText(convertRows(rows, fmt)).then(() => {
    alert(`${rows.length}행이 클립보드에 복사되었습니다.`);
  });
}

// ══════════════════════════════════════════════════════════════
//  수요 예측 생성
// ══════════════════════════════════════════════════════════════
async function generateDemand() {
  const log_ = msg => log('demand', msg);
  document.getElementById('demand-log').innerHTML = '';
  document.getElementById('demand-results').style.display = 'none';

  const industry  = document.getElementById('demand-industry').value;
  const nProducts = parseInt(document.getElementById('demand-products').value);
  const period    = document.getElementById('demand-period').value;
  const seasonal  = document.getElementById('demand-seasonal').value;
  const trend     = document.getElementById('demand-trend').value;
  const promo     = document.getElementById('demand-promo').value;

  const daysMap = { '90d':90, '365d':365, '730d':730, '36m':1095 };
  let days = daysMap[period] || 365;
  if (!authed && days * nProducts > DEMO_LIMIT) days = Math.floor(DEMO_LIMIT / nProducts) || 1;

  setProgress('demand', 10);
  log_(`▶ 수요 예측 데이터 생성 시작 (${industry}, 제품${nProducts}개, ${days}일)`);
  await new Promise(r => setTimeout(r, 10));

  setProgress('demand', 40);
  const rows = generateDemandData({ industry, numProducts: nProducts, days, seasonal, trend, promo });
  setProgress('demand', 80);
  log_(`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.demand = rows;
  setProgress('demand', 100);
  setTimeout(() => setProgress('demand', null), 600);

  // 통계
  const totalSales = rows.reduce((s,r) => s + r.sales_qty, 0);
  const promoEvents = [...new Set(rows.filter(r=>r.promo_flag).map(r=>r.date))].length;
  document.getElementById('demand-stat-total').textContent = fmtN(rows.length);
  document.getElementById('demand-stat-avg').textContent   = fmtN(Math.round(totalSales / rows.length));
  document.getElementById('demand-stat-max').textContent   = fmtN(Math.max(...rows.map(r=>r.sales_qty)));
  document.getElementById('demand-stat-promo').textContent = fmtN(promoEvents) + '일';

  renderTable('demand-table', rows);
  document.getElementById('demand-results').style.display = '';
  log_('✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  재무 P&L 생성
// ══════════════════════════════════════════════════════════════
async function generateFinance() {
  const log_ = msg => log('finance', msg);
  document.getElementById('finance-log').innerHTML = '';
  document.getElementById('finance-results').style.display = 'none';

  const size      = document.getElementById('finance-size').value;
  const divisions = parseInt(document.getElementById('finance-divisions').value);
  let   months    = parseInt(document.getElementById('finance-months').value);
  const industry  = document.getElementById('finance-industry').value;

  if (!authed && months * divisions > DEMO_LIMIT) months = Math.floor(DEMO_LIMIT / divisions) || 1;

  setProgress('finance', 10);
  log_(`▶ 재무 P&L 생성 시작 (${size}, ${divisions}부문, ${months}개월)`);
  await new Promise(r => setTimeout(r, 10));

  setProgress('finance', 50);
  const rows = generateFinanceData({ size, divisions, months, industry });
  setProgress('finance', 90);
  log_(`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.finance = rows;
  setProgress('finance', 100);
  setTimeout(() => setProgress('finance', null), 600);

  const avgRev   = rows.reduce((s,r) => s + r.revenue, 0) / rows.length;
  const avgMargin = rows.reduce((s,r) => s + parseFloat(r.ebit_margin_pct), 0) / rows.length;
  const lossMths = rows.filter(r => r.ebit < 0).length;

  document.getElementById('finance-stat-total').textContent   = fmtN(rows.length);
  document.getElementById('finance-stat-revenue').textContent = (avgRev / 1e8).toFixed(1) + '억';
  document.getElementById('finance-stat-profit').textContent  = avgMargin.toFixed(1) + '%';
  document.getElementById('finance-stat-loss').textContent    = fmtN(lossMths) + '개월';

  renderTable('finance-table', rows);
  document.getElementById('finance-results').style.display = '';
  log_('✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  고객 분석 생성
// ══════════════════════════════════════════════════════════════
async function generateCustomer() {
  const log_ = msg => log('customer', msg);
  document.getElementById('customer-log').innerHTML = '';
  document.getElementById('customer-results').style.display = 'none';

  let count     = parseInt(document.getElementById('customer-count').value);
  const months  = parseInt(document.getElementById('customer-months').value);
  const churnRate = parseFloat(document.getElementById('customer-churn-rate').value);

  if (!authed && count > DEMO_LIMIT) count = DEMO_LIMIT;

  setProgress('customer', 10);
  log_(`▶ 고객 분석 데이터 생성 (${fmtN(count)}명, 이탈률 ${churnRate}%)`);
  await new Promise(r => setTimeout(r, 10));

  setProgress('customer', 50);
  const rows = generateCustomerData({ count, months, churnRate });
  setProgress('customer', 90);
  log_(`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.customer = rows;
  setProgress('customer', 100);
  setTimeout(() => setProgress('customer', null), 600);

  const churnCount = rows.filter(r => r.churn_label === 1).length;
  const avgClv = rows.reduce((s,r) => s + r.clv_estimate, 0) / rows.length;
  const vipCount = rows.filter(r => r.segment === 'Champions').length;

  document.getElementById('customer-stat-total').textContent   = fmtN(rows.length);
  document.getElementById('customer-stat-churn').textContent   = fmtN(churnCount);
  document.getElementById('customer-stat-clv').textContent     = fmtN(Math.round(avgClv)) + '원';
  document.getElementById('customer-stat-vip').textContent     = fmtN(vipCount);

  renderTable('customer-table', rows);
  document.getElementById('customer-results').style.display = '';
  log_('✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  공급망 생성
// ══════════════════════════════════════════════════════════════
async function generateSupply() {
  const log_ = msg => log('supply', msg);
  document.getElementById('supply-log').innerHTML = '';
  document.getElementById('supply-results').style.display = 'none';

  const numSkus    = parseInt(document.getElementById('supply-skus').value);
  let   days       = parseInt(document.getElementById('supply-days').value);
  const delayRate  = parseFloat(document.getElementById('supply-delay-rate').value);
  const stockoutRate = parseFloat(document.getElementById('supply-stockout-rate').value);

  if (!authed) days = Math.min(days, Math.floor(DEMO_LIMIT / numSkus) || 1);

  setProgress('supply', 10);
  log_(`▶ 공급망 데이터 생성 (SKU ${numSkus}개, ${days}일)`);
  await new Promise(r => setTimeout(r, 10));

  setProgress('supply', 50);
  const rows = generateSupplyData({ numSkus, days, delayRate, stockoutRate });
  setProgress('supply', 90);
  log_(`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.supply = rows;
  setProgress('supply', 100);
  setTimeout(() => setProgress('supply', null), 600);

  const delayCount    = rows.filter(r => r.delay_days > 0).length;
  const stockoutCount = rows.filter(r => r.stockout_flag === 1).length;
  const avgLead       = rows.reduce((s,r) => s + r.actual_lead_days, 0) / rows.length;

  document.getElementById('supply-stat-total').textContent    = fmtN(rows.length);
  document.getElementById('supply-stat-delay').textContent    = fmtN(delayCount);
  document.getElementById('supply-stat-stockout').textContent = fmtN(stockoutCount);
  document.getElementById('supply-stat-lead').textContent     = avgLead.toFixed(1) + '일';

  renderTable('supply-table', rows);
  document.getElementById('supply-results').style.display = '';
  log_('✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  HR 생성
// ══════════════════════════════════════════════════════════════
async function generateHR() {
  const log_ = msg => log('hr', msg);
  document.getElementById('hr-log').innerHTML = '';
  document.getElementById('hr-results').style.display = 'none';

  let count       = parseInt(document.getElementById('hr-employees').value);
  const numDepts  = parseInt(document.getElementById('hr-depts').value);
  const turnoverRate = parseFloat(document.getElementById('hr-turnover-rate').value);

  if (!authed && count > DEMO_LIMIT) count = DEMO_LIMIT;

  setProgress('hr', 10);
  log_(`▶ HR 데이터 생성 (직원 ${fmtN(count)}명, 부서 ${numDepts}개)`);
  await new Promise(r => setTimeout(r, 10));

  setProgress('hr', 50);
  const rows = generateHRData({ count, numDepts, turnoverRate });
  setProgress('hr', 90);
  log_(`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.hr = rows;
  setProgress('hr', 100);
  setTimeout(() => setProgress('hr', null), 600);

  const turnoverCount = rows.filter(r => r.turnover_label === 1).length;
  const avgSalary = rows.reduce((s,r) => s + r.annual_salary, 0) / rows.length;
  const avgTenure = rows.reduce((s,r) => s + parseFloat(r.tenure_years), 0) / rows.length;

  document.getElementById('hr-stat-total').textContent    = fmtN(rows.length);
  document.getElementById('hr-stat-turnover').textContent = fmtN(turnoverCount);
  document.getElementById('hr-stat-salary').textContent   = fmtN(Math.round(avgSalary)) + '만원';
  document.getElementById('hr-stat-tenure').textContent   = avgTenure.toFixed(1) + '년';

  renderTable('hr-table', rows);
  document.getElementById('hr-results').style.display = '';
  log_('✅ 완료');
}

// ── 초기화 ──────────────────────────────────────────────────
function initBizPage() {
  setAuthed(authed);
  initMobileTabSelect();
  ['demand','finance','customer','supply','hr'].forEach(t => {
    renderFmt(t);
    currentFmt[t] = 'csv';
  });
  renderDiff('demand', [
    ['normal', '🟢 Normal — 노이즈 보통',  '실무 수준의 노이즈, 결측치 ~2%', true],
    ['hard',   '🟡 Hard — 노이즈 높음',    '이상값 5%, 결측치 5%, 불규칙 패턴', false],
    ['expert', '🔴 Expert — 복합 이상',    '다중 계절성, 이벤트 충격, 결측 구간', false],
  ]);
  renderDiff('customer', [
    ['normal', '🟢 Normal', '명확한 세그먼트 구분', true],
    ['hard',   '🟡 Hard',   '세그먼트 경계 모호, 클래스 불균형', false],
    ['expert', '🔴 Expert', '데이터 불균형 심각, 다중 공선성', false],
  ]);
  renderDiff('supply', [
    ['normal', '🟢 Normal', '단순 재고 패턴', true],
    ['hard',   '🟡 Hard',   '계절 수요 + 공급 충격', false],
  ]);
  renderDiff('hr', [
    ['normal', '🟢 Normal', '일반적 이직 패턴', true],
    ['hard',   '🟡 Hard',   '클래스 불균형, 부서별 특성 차이', false],
  ]);

  // 고객 세그먼트 설정
  const segEl = document.getElementById('customer-segments');
  if (segEl) {
    segEl.innerHTML = [
      ['Champions','전체의 10%','성과 최상위'],
      ['Loyal','전체의 15%','지속 구매'],
      ['At_Risk','전체의 20%','이탈 위험'],
      ['Hibernating','전체의 15%','휴면 고객'],
    ].map(([seg, pct, desc]) => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px">
        <span style="font-family:'Space Mono',monospace;color:var(--accent2)">${seg}</span>
        <span style="color:var(--text-dim)">${pct} · ${desc}</span>
      </div>`).join('');
  }

  // 재무 컬럼 체크
  const finColEl = document.getElementById('finance-cols');
  if (finColEl) {
    finColEl.innerHTML = [
      ['revenue','매출',true],['cogs','매출원가',true],['gross_profit','매출총이익',true],
      ['opex','판관비',true],['ebit','영업이익',true],['ebit_margin_pct','영업이익률',true],
      ['net_income','순이익',false],['headcount','임직원수',false],
    ].map(([id,label,chk]) => `
      <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;font-size:12px">
        <input type="checkbox" id="finance-col-${id}" ${chk?'checked':''}>
        <span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--accent3)">${id}</span>
        <span style="color:var(--text-dim)">${label}</span>
      </label>`).join('');
  }

  // 수요 컬럼 체크
  renderCols('demand', [
    ['date','날짜',true],['product_id','제품ID',true],['category','카테고리',true],
    ['sales_qty','판매수량',true],['sales_amount','판매금액',true],
    ['promo_flag','프로모션여부',true],['promo_type','프로모션유형',true],
    ['stock_qty','재고수량',false],['day_of_week','요일',false],
  ]);
}
