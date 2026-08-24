// ============================================================
//  ADS DataForge — App Logic
// ============================================================

const DEMO_LIMIT = window.ADS_DEMO_LIMIT || 100;
let authed = window.ADS_AUTHED || false;

const stored = { campaign: null, creative: null, abtest: null, conv: null, attr: null };
let currentFmt = { campaign:'csv', creative:'csv', abtest:'csv', conv:'csv', attr:'csv' };

function log(id, msg) {
  const el = document.getElementById(id+'-log');
  if (!el) return;
  const ts = new Date().toLocaleTimeString('ko-KR');
  el.innerHTML += `\n<span>[${ts}] ${msg}</span>`;
  el.scrollTop = el.scrollHeight;
}
function setProgress(id, pct) {
  const wrap = document.getElementById(id+'-progress');
  const bar  = document.getElementById(id+'-bar');
  if (!wrap || !bar) return;
  if (pct === null) { wrap.style.display='none'; return; }
  wrap.style.display='block';
  bar.style.width = pct+'%';
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
      <button onclick="document.getElementById('login-modal').classList.add('show')" class="btn" style="padding:4px 16px;font-size:11px;background:#a855f7;border-color:#a855f7;color:#fff">교육 코드 입력</button>`;
    banner.style.background='rgba(255,165,0,0.05)';
    banner.style.borderBottom='1px solid rgba(255,165,0,0.2)';
  }
}
function fmtN(n) { return Number(n).toLocaleString('ko-KR'); }

function switchTab(name) {
  document.querySelectorAll('.tab-panel').forEach(p => p.style.display='none');
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const p = document.getElementById('tab-'+name);
  if (p) p.style.display='';
  const b = document.querySelector(`[data-tab="${name}"]`);
  if (b) b.classList.add('active');
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

async function submitLogin() {
  const pw = document.getElementById('login-pw').value;
  const err = document.getElementById('login-err');
  err.textContent = '';
  try {
    const res = await fetch('/mfg/api/login.php', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({password: pw}),
    });
    const data = await res.json();
    if (data.ok) { setAuthed(true); document.getElementById('login-modal').classList.remove('show'); }
    else err.textContent = '코드가 올바르지 않습니다.';
  } catch(e) { err.textContent = '오류가 발생했습니다.'; }
}

function renderFmt(tabId) {
  const el = document.getElementById(tabId+'-fmt');
  if (!el) return;
  el.innerHTML = ['csv','json','tsv'].map(f=>`
    <label style="display:inline-flex;align-items:center;gap:6px;cursor:pointer;font-size:13px;margin-right:16px">
      <input type="radio" name="${tabId}-fmt" value="${f}" ${currentFmt[tabId]===f?'checked':''} onchange="currentFmt['${tabId}']=this.value">
      <span style="font-family:'Space Mono',monospace;text-transform:uppercase">${f}</span>
    </label>`).join('');
}

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

function renderTable(containerId, rows) {
  if (!rows || !rows.length) return;
  const preview = rows.slice(0,20);
  const keys = Object.keys(preview[0]);
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = `<div class="table-wrap"><table class="schema-table">
    <thead><tr>${keys.map(k=>`<th>${k}</th>`).join('')}</tr></thead>
    <tbody>${preview.map(r=>`<tr>${keys.map(k=>`<td style="font-size:11px;white-space:nowrap">${r[k]??''}</td>`).join('')}</tr>`).join('')}</tbody>
  </table></div>
  <div style="font-size:11px;color:var(--text-dim);margin-top:6px">상위 ${preview.length}행 미리보기 / 전체 ${fmtN(rows.length)}행</div>`;
}

function toCSV(rows) {
  if (!rows||!rows.length) return '';
  const keys = Object.keys(rows[0]);
  return [keys.join(','), ...rows.map(r=>keys.map(k=>{
    const v=r[k]??'';
    return String(v).includes(',')||String(v).includes('"')?`"${String(v).replace(/"/g,'""')}"`:v;
  }).join(','))].join('\n');
}
function toJSON(rows) { return JSON.stringify(rows,null,2); }
function toTSV(rows) {
  if (!rows||!rows.length) return '';
  const keys=Object.keys(rows[0]);
  return [keys.join('\t'),...rows.map(r=>keys.map(k=>r[k]??'').join('\t'))].join('\n');
}
function convertRows(rows, fmt) {
  if (fmt==='json') return toJSON(rows);
  if (fmt==='tsv')  return toTSV(rows);
  return toCSV(rows);
}
function downloadData(tabId) {
  const rows = stored[tabId];
  if (!rows) return alert('먼저 데이터를 생성하세요.');
  const fmt = currentFmt[tabId]||'csv';
  const ext = fmt==='json'?'json':fmt==='tsv'?'tsv':'csv';
  const content = convertRows(rows,fmt);
  const bom = (fmt==='csv'||fmt==='tsv') ? '\ufeff' : '';
  const blob = new Blob([bom+content],{type:'text/plain;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `dataforge_ads_${tabId}_${Date.now()}.${ext}`;
  a.click();
}
function copyData(tabId) {
  const rows = stored[tabId];
  if (!rows) return alert('먼저 데이터를 생성하세요.');
  navigator.clipboard.writeText(convertRows(rows, currentFmt[tabId]||'csv'))
    .then(()=>alert(`${rows.length}행이 클립보드에 복사되었습니다.`));
}

// ══════════════════════════════════════════════════════════════
//  캠페인 성과 생성
// ══════════════════════════════════════════════════════════════
async function generateCampaign() {
  document.getElementById('campaign-log').innerHTML='';
  document.getElementById('campaign-results').style.display='none';

  const platform   = document.getElementById('campaign-platform').value;
  let   numCampaigns = parseInt(document.getElementById('campaign-count').value);
  let   days       = parseInt(document.getElementById('campaign-days').value);
  const objective  = document.getElementById('campaign-objective').value;
  const budgetMin  = parseInt(document.getElementById('campaign-budget-min').value);
  const budgetMax  = parseInt(document.getElementById('campaign-budget-max').value);

  if (!authed && numCampaigns * days > DEMO_LIMIT) days = Math.max(1, Math.floor(DEMO_LIMIT / numCampaigns));

  setProgress('campaign',10);
  log('campaign',`▶ 캠페인 성과 데이터 생성 (${platform}, ${numCampaigns}개 캠페인, ${days}일)`);
  await new Promise(r=>setTimeout(r,10));

  setProgress('campaign',50);
  const rows = generateCampaignData({platform, numCampaigns, days, objective, budgetMin, budgetMax});
  setProgress('campaign',90);
  log('campaign',`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.campaign = rows;
  setProgress('campaign',100);
  setTimeout(()=>setProgress('campaign',null),600);

  const avgCtr  = rows.reduce((s,r)=>s+parseFloat(r.ctr_pct),0)/rows.length;
  const avgRoas = rows.reduce((s,r)=>s+parseFloat(r.roas),0)/rows.length;
  const totalSpend = rows.reduce((s,r)=>s+r.spend,0);

  document.getElementById('campaign-stat-total').textContent = fmtN(rows.length);
  document.getElementById('campaign-stat-ctr').textContent   = avgCtr.toFixed(2)+'%';
  document.getElementById('campaign-stat-roas').textContent  = avgRoas.toFixed(2)+'x';
  document.getElementById('campaign-stat-spend').textContent = (totalSpend/1e8).toFixed(1)+'억원';

  renderTable('campaign-table', rows);
  document.getElementById('campaign-results').style.display='';
  log('campaign','✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  소재 분석 생성
// ══════════════════════════════════════════════════════════════
async function generateCreative() {
  document.getElementById('creative-log').innerHTML='';
  document.getElementById('creative-results').style.display='none';

  const creativeTypes = document.getElementById('creative-types').value;
  const numChannels   = parseInt(document.getElementById('creative-channels').value);
  let   numCreatives  = parseInt(document.getElementById('creative-count').value);
  const days          = parseInt(document.getElementById('creative-days').value);

  if (!authed && numChannels * numCreatives > DEMO_LIMIT)
    numCreatives = Math.max(1, Math.floor(DEMO_LIMIT / numChannels));

  setProgress('creative',10);
  log('creative',`▶ 소재 분석 데이터 생성 (${numChannels}채널, 채널당 ${numCreatives}개)`);
  await new Promise(r=>setTimeout(r,10));

  setProgress('creative',50);
  const rows = generateCreativeData({creativeTypes, numChannels, numCreatives, days});
  setProgress('creative',90);
  log('creative',`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.creative = rows;
  setProgress('creative',100);
  setTimeout(()=>setProgress('creative',null),600);

  const bestCreative = rows.reduce((b,r)=>parseFloat(r.ctr_pct)>parseFloat(b.ctr_pct)?r:b,rows[0]);
  const videoRows  = rows.filter(r=>r.creative_type==='video');
  const imageRows  = rows.filter(r=>r.creative_type==='image');
  const avgVideoCtr = videoRows.length ? videoRows.reduce((s,r)=>s+parseFloat(r.ctr_pct),0)/videoRows.length : 0;
  const avgImgCtr   = imageRows.length ? imageRows.reduce((s,r)=>s+parseFloat(r.ctr_pct),0)/imageRows.length : 0;

  document.getElementById('creative-stat-total').textContent  = fmtN(rows.length);
  document.getElementById('creative-stat-best').textContent   = bestCreative.creative_id+' ('+bestCreative.ctr_pct+'%)';
  document.getElementById('creative-stat-video').textContent  = avgVideoCtr.toFixed(2)+'%';
  document.getElementById('creative-stat-image').textContent  = avgImgCtr.toFixed(2)+'%';

  renderTable('creative-table', rows);
  document.getElementById('creative-results').style.display='';
  log('creative','✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  A/B 테스트 생성
// ══════════════════════════════════════════════════════════════
async function generateABTest() {
  document.getElementById('abtest-log').innerHTML='';
  document.getElementById('abtest-results').style.display='none';

  const testType  = document.getElementById('ab-type').value;
  const numGroups = parseInt(document.getElementById('ab-groups').value);
  let   totalSamples = parseInt(document.getElementById('ab-samples').value);
  const baseCvr   = parseFloat(document.getElementById('ab-base-cvr').value);
  const effectPct = parseFloat(document.getElementById('ab-effect').value);

  if (!authed && totalSamples > DEMO_LIMIT) totalSamples = DEMO_LIMIT;

  setProgress('abtest',10);
  log('abtest',`▶ A/B 테스트 데이터 생성 (${numGroups}그룹, ${fmtN(totalSamples)}샘플)`);
  await new Promise(r=>setTimeout(r,10));

  setProgress('abtest',50);
  const rows = generateABTestData({testType, numGroups, totalSamples, baseCvr, effectPct});
  setProgress('abtest',90);
  log('abtest',`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.abtest = rows;
  setProgress('abtest',100);
  setTimeout(()=>setProgress('abtest',null),600);

  const aRows = rows.filter(r=>r.group==='A');
  const bRows = rows.filter(r=>r.group==='B');
  const aCvr = aRows.filter(r=>r.converted).length / aRows.length * 100;
  const bCvr = bRows.filter(r=>r.converted).length / bRows.length * 100;
  const lift = aCvr > 0 ? ((bCvr - aCvr) / aCvr * 100) : 0;

  document.getElementById('abtest-stat-total').textContent = fmtN(rows.length);
  document.getElementById('abtest-stat-a').textContent     = aCvr.toFixed(2)+'%';
  document.getElementById('abtest-stat-b').textContent     = bCvr.toFixed(2)+'%';
  document.getElementById('abtest-stat-lift').textContent  = (lift>=0?'+':'')+lift.toFixed(1)+'%';

  renderTable('abtest-table', rows);
  document.getElementById('abtest-results').style.display='';
  log('abtest','✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  전환 분석 생성
// ══════════════════════════════════════════════════════════════
async function generateConversion() {
  document.getElementById('conv-log').innerHTML='';
  document.getElementById('conv-results').style.display='none';

  const convType      = document.getElementById('conv-type').value;
  let   days          = parseInt(document.getElementById('conv-days').value);
  const dailyConvBase = parseInt(document.getElementById('conv-daily-cvr').value);
  const grain         = document.getElementById('conv-grain').value;

  if (!authed) days = Math.min(days, Math.floor(DEMO_LIMIT / (grain==='hourly'?24:1)) || 1);

  setProgress('conv',10);
  log('conv',`▶ 전환 분석 데이터 생성 (${convType}, ${days}일, ${grain})`);
  await new Promise(r=>setTimeout(r,10));

  setProgress('conv',50);
  const rows = generateConversionData({convType, days, dailyConvBase, grain});
  setProgress('conv',90);
  log('conv',`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.conv = rows;
  setProgress('conv',100);
  setTimeout(()=>setProgress('conv',null),600);

  const totalImpr = rows.reduce((s,r)=>s+r.impressions,0);
  const totalConv = rows.reduce((s,r)=>s+r.conversions,0);
  const avgCvr    = totalImpr>0?(totalConv/totalImpr*100):0;

  // 시간대 피크 (hourly)
  let peakHour = '-';
  if (rows[0] && rows[0].hour !== undefined) {
    const hourTotals = {};
    rows.forEach(r=>{ hourTotals[r.hour]=(hourTotals[r.hour]||0)+r.conversions; });
    const maxH = Object.entries(hourTotals).reduce((b,e)=>e[1]>b[1]?e:b,['-1',0]);
    peakHour = maxH[0]+'시';
  }

  const mobileRows = rows.filter(r=>r.device==='mobile');
  const mobileRatio = rows.length > 0 ? (mobileRows.length/rows.length*100) : 0;

  document.getElementById('conv-stat-total').textContent  = fmtN(rows.length);
  document.getElementById('conv-stat-cvr').textContent    = avgCvr.toFixed(2)+'%';
  document.getElementById('conv-stat-peak').textContent   = peakHour;
  document.getElementById('conv-stat-mobile').textContent = mobileRatio.toFixed(0)+'%';

  renderTable('conv-table', rows);
  document.getElementById('conv-results').style.display='';
  log('conv','✅ 완료');
}

// ══════════════════════════════════════════════════════════════
//  어트리뷰션 생성
// ══════════════════════════════════════════════════════════════
async function generateAttribution() {
  document.getElementById('attr-log').innerHTML='';
  document.getElementById('attr-results').style.display='none';

  let numCustomers   = parseInt(document.getElementById('attr-customers').value);
  const avgTouchpoints = parseInt(document.getElementById('attr-touchpoints').value);
  const channelSet   = document.getElementById('attr-channels').value;
  const windowDays   = parseInt(document.getElementById('attr-window').value);

  if (!authed && numCustomers > Math.floor(DEMO_LIMIT/avgTouchpoints))
    numCustomers = Math.max(1, Math.floor(DEMO_LIMIT/avgTouchpoints));

  setProgress('attr',10);
  log('attr',`▶ 어트리뷰션 데이터 생성 (${fmtN(numCustomers)}명, 평균 ${avgTouchpoints}터치)`);
  await new Promise(r=>setTimeout(r,10));

  setProgress('attr',50);
  const rows = generateAttributionData({numCustomers, avgTouchpoints, channelSet, windowDays});
  setProgress('attr',90);
  log('attr',`✓ ${fmtN(rows.length)}행 생성 완료`);

  stored.attr = rows;
  setProgress('attr',100);
  setTimeout(()=>setProgress('attr',null),600);

  const lastTouches = rows.filter(r=>r.is_conversion===1);
  const channelCounts = {};
  lastTouches.forEach(r=>{ channelCounts[r.touch_channel]=(channelCounts[r.touch_channel]||0)+1; });
  const topChannel = Object.entries(channelCounts).sort((a,b)=>b[1]-a[1])[0];
  const avgTP = rows.length > 0 ? (rows.length/numCustomers).toFixed(1) : '-';

  document.getElementById('attr-stat-total').textContent    = fmtN(rows.length);
  document.getElementById('attr-stat-customers').textContent = fmtN(numCustomers);
  document.getElementById('attr-stat-top').textContent      = topChannel ? topChannel[0] : '-';
  document.getElementById('attr-stat-avg').textContent      = avgTP;

  renderTable('attr-table', rows);
  document.getElementById('attr-results').style.display='';
  log('attr','✅ 완료');
}

// ── 초기화 ──────────────────────────────────────────────────
function initAdsPage() {
  setAuthed(authed);
  initMobileTabSelect();
  ['campaign','creative','abtest','conv','attr'].forEach(t => {
    renderFmt(t);
    currentFmt[t]='csv';
  });

  renderDiff('campaign', [
    ['normal', '🟢 Normal — 일반 성과 패턴', '합리적 노이즈, 명확한 트렌드', true],
    ['hard',   '🟡 Hard — 성과 변동성 높음', '예산 변화, 피로도 반영', false],
    ['expert', '🔴 Expert — 멀티채널 복합', '채널 간 상호작용, 계절 충격', false],
  ]);
  renderDiff('creative', [
    ['normal', '🟢 Normal', '소재 유형 간 명확한 성과 차이', true],
    ['hard',   '🟡 Hard',   '유형 간 성과 분포 겹침', false],
  ]);
  renderDiff('conv', [
    ['normal', '🟢 Normal', '명확한 시간대·디바이스 패턴', true],
    ['hard',   '🟡 Hard',   '불규칙 패턴, 이상 전환 포함', false],
  ]);
  renderDiff('attr', [
    ['normal', '🟢 Normal', '단순 선형 여정', true],
    ['hard',   '🟡 Hard',   '복잡한 멀티채널 교차', false],
  ]);

  // A/B 출력 레벨
  const abLevelEl = document.getElementById('ab-level');
  if (abLevelEl) {
    abLevelEl.innerHTML = [
      ['user', '사용자 레벨 (1행=1사용자)', '개인별 전환 여부 포함', true],
      ['summary', '요약 레벨 (그룹별 집계)', '그룹별 전환율 통계만', false],
    ].map(([id, label, desc, chk]) => `
      <div style="margin-bottom:10px">
        <label style="display:flex;gap:10px;align-items:flex-start;cursor:pointer">
          <input type="radio" name="ab-level" value="${id}" ${chk?'checked':''} style="margin-top:3px">
          <div>
            <div style="font-size:13px;font-weight:600">${label}</div>
            <div style="font-size:11px;color:var(--text-dim);margin-top:2px">${desc}</div>
          </div>
        </label>
      </div>`).join('');
  }

  // 캠페인 컬럼 선택
  const camColEl = document.getElementById('campaign-cols');
  if (camColEl) {
    camColEl.innerHTML = [
      ['impressions','노출수',true],['clicks','클릭수',true],['ctr_pct','CTR(%)',true],
      ['spend','광고비',true],['cpm','CPM',true],['cpc','CPC',false],
      ['conversions','전환수',true],['cpa','CPA',true],['roas','ROAS',true],
      ['revenue','매출',false],['day_of_week','요일',false],
    ].map(([id,label,chk])=>`
      <label style="display:flex;align-items:center;gap:8px;margin-bottom:8px;cursor:pointer;font-size:12px">
        <input type="checkbox" id="camp-col-${id}" ${chk?'checked':''}>
        <span style="font-family:'Space Mono',monospace;font-size:11px;color:#a855f7">${id}</span>
        <span style="color:var(--text-dim)">${label}</span>
      </label>`).join('');
  }
}
