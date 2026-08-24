<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>크롤링 실습 랩 — DataForge</title>
<link rel="icon" type="image/png" href="/img/mfg.png">
<meta property="og:title" content="크롤링 실습 랩 — DataForge">
<meta property="og:description" content="스마트 팩토리 포털을 대상으로 CSS 셀렉터 실습·다중 크롤링을 체험하는 교육용 랩">
<meta property="og:image" content="https://dataforge.ai.kr/img/OG_IMAGE.jpg">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet">
<style>
:root {
  --bg:#f8fafc;--card:#ffffff;--card2:#f1f5f9;
  --border:rgba(0,0,0,0.09);--border2:rgba(0,0,0,0.15);
  --text:#1e293b;--muted:#64748b;--dim:#94a3b8;
  --accent:#0284c7;
  --green:#059669;--red:#dc2626;--amber:#d97706;--purple:#7c3aed;
  --r:12px;
}
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Noto Sans KR',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;font-size:14px;line-height:1.6;}
.page-wrap{max-width:1400px;margin:0 auto;}

/* ── Header ── */
.site-header{padding:14px 24px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:#fff;}
.logo{display:flex;align-items:center;gap:12px;}
.logo-brand{font-family:'Space Mono',monospace;font-size:18px;font-weight:700;color:var(--accent);letter-spacing:2px;text-decoration:none;}
.logo-brand em{color:#ea580c;font-style:normal;}
.logo-sep{width:1px;height:16px;background:var(--border2);flex-shrink:0;}
.logo-title{font-size:15px;font-weight:700;color:var(--text);}
.logo-title span{color:var(--accent);}
.header-back{font-size:12px;color:var(--muted);text-decoration:none;border:1px solid var(--border2);padding:5px 14px;border-radius:8px;transition:.2s;font-family:'Noto Sans KR', sans-serif;}
.header-back:hover{color:var(--text);border-color:rgba(0,0,0,0.3);text-decoration:none;}

/* ── Page ── */
.page{padding:24px 24px 80px;}

/* ── Mode tabs ── */
.mode-tabs{display:flex;gap:0;border-bottom:1px solid var(--border);margin-bottom:24px;}
.mode-tab{padding:14px 22px;font-size:13px;font-weight:600;background:none;border:none;border-bottom:2px solid transparent;color:var(--muted);cursor:pointer;transition:all .2s;font-family:'Noto Sans KR',sans-serif;white-space:nowrap;}
.mode-tab:hover{color:var(--text);}
.mode-tab.active{color:var(--accent);border-bottom-color:var(--accent);}

/* ── Lab layout ── */
.lab-layout{display:grid;grid-template-columns:1fr 360px;gap:16px;align-items:start;min-height:600px;}

/* ── iframe: browser chrome feel intentionally dark ── */
.iframe-wrap{position:relative;height:700px;min-height:600px;border:1px solid var(--border2);border-radius:var(--r);overflow:hidden;background:#fff;}
.iframe-bar{display:flex;align-items:center;gap:8px;padding:8px 14px;background:#1e293b;border-bottom:1px solid rgba(0,0,0,.2);font-family:'Space Mono',monospace;font-size:.75rem;color:#64748b;}
.iframe-dot{width:8px;height:8px;border-radius:50%;}
#site-iframe{width:100%;height:calc(100% - 36px);border:none;background:#fff;}

/* ── Control panel ── */
.control-panel{display:flex;flex-direction:column;gap:12px;position:sticky;top:20px;max-height:700px;overflow-y:auto;}

/* ── Panel card ── */
.panel-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:18px;}
.panel-card h3{font-family:'Space Mono',monospace;font-size:.72rem;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:14px;}

/* ── Form ── */
.field-label{font-size:.75rem;color:var(--muted);margin-bottom:5px;font-family:'Noto Sans KR', sans-serif;}
.field-group{margin-bottom:12px;}
select,.sel-input{
  width:100%;background:var(--card2);border:1px solid var(--border2);border-radius:8px;
  color:var(--text);font-size:.88rem;padding:9px 12px;
  font-family:'Noto Sans KR',sans-serif;outline:none;box-sizing:border-box;
}
select:focus,.sel-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(2,132,199,.1);}
#parse-hint{display:none;font-family:'Space Mono',monospace;font-size:.72rem;margin-top:6px;color:var(--accent);}

.btn-run{
  width:100%;background:var(--accent);color:#fff;border:none;border-radius:8px;
  padding:11px;font-family:'Noto Sans KR', sans-serif;font-size:.85rem;letter-spacing:1px;
  cursor:pointer;transition:background .15s;
}
.btn-run:hover{background:#0369a1;}

/* ── Quick tags ── */
.quick-tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px;}
.qtag{
  font-size:.7rem;font-family:'Space Mono',monospace;
  background:var(--card2);border:1px solid var(--border2);
  color:var(--muted);padding:3px 8px;border-radius:4px;cursor:pointer;
  transition:border-color .15s,color .15s;
}
.qtag:hover,.qtag.active{border-color:var(--accent);color:var(--accent);}

/* ── Results ── */
.result-count{font-family:'Space Mono',monospace;font-size:.8rem;color:var(--muted);margin-bottom:10px;}
.result-count strong{color:var(--accent);}
.result-list{display:flex;flex-direction:column;gap:5px;}
.result-row{
  display:flex;align-items:baseline;gap:10px;
  padding:8px 12px;background:var(--card2);border-radius:8px;
  cursor:pointer;border:1px solid transparent;transition:border-color .15s;
}
.result-row:hover{border-color:var(--border2);}
.result-row.focused{border-color:var(--accent);background:rgba(2,132,199,.06);}
.r-idx{font-family:'Space Mono',monospace;font-size:.7rem;color:var(--dim);min-width:20px;}
.r-val{font-family:'Space Mono',monospace;font-size:.88rem;color:var(--green);font-weight:700;flex:1;}
.r-id {font-family:'Space Mono',monospace;font-size:.68rem;color:var(--purple);}
.empty-msg{font-family:'Noto Sans KR', sans-serif;font-size:.82rem;color:var(--dim);text-align:center;padding:24px 0;}

/* ── Code box: keep dark for readability ── */
.code-wrap{background:#1e293b;border-radius:8px;overflow:hidden;border:1px solid rgba(0,0,0,.15);}
.code-header{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,.07);}
.code-lang{font-family:'Space Mono',monospace;font-size:.7rem;color:#475569;letter-spacing:1px;}
.btn-copy{font-family:'Noto Sans KR', sans-serif;font-size:.68rem;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#94a3b8;padding:3px 8px;border-radius:4px;cursor:pointer;}
.btn-copy:hover{color:#e2e8f0;}
.code-body{padding:12px;font-family:'Space Mono',monospace;font-size:.78rem;color:#cbd5e1;line-height:1.8;white-space:pre;overflow-x:auto;}
.kw{color:#c084fc;}.fn{color:#38bdf8;}.str{color:#34d399;}.cm{color:#475569;font-style:italic;}

/* ── Batch mode ── */
.opt-bar{display:flex;align-items:center;gap:16px;flex-wrap:wrap;}
.batch-tbl{width:100%;border-collapse:collapse;}
.batch-tbl th{font-family:'Space Mono',monospace;font-size:.7rem;letter-spacing:1px;color:var(--muted);text-transform:uppercase;padding:8px 8px 8px 0;border-bottom:1px solid var(--border);text-align:left;white-space:nowrap;}
.batch-tbl td{padding:4px 6px 4px 0;vertical-align:middle;}
.btn-secondary{background:var(--card2);color:var(--muted);border:1px solid var(--border2);border-radius:8px;padding:9px 16px;font-family:'Noto Sans KR', sans-serif;font-size:.82rem;cursor:pointer;transition:.15s;white-space:nowrap;}
.btn-secondary:hover{border-color:var(--accent);color:var(--text);}
.btn-csv{background:var(--green);color:#fff;border:none;border-radius:8px;padding:9px 16px;font-family:'Noto Sans KR', sans-serif;font-size:.82rem;cursor:pointer;transition:.15s;white-space:nowrap;}
.btn-csv:hover{background:#047857;}
.task-ok  {font-family:'Space Mono',monospace;font-size:.82rem;color:var(--green);}
.task-err {font-family:'Noto Sans KR', sans-serif;font-size:.82rem;color:var(--red);}
.task-meta{font-family:'Space Mono',monospace;font-size:.72rem;color:var(--muted);}
.running-msg{font-family:'Space Mono',monospace;font-size:.82rem;color:var(--amber);}
.status-bar-batch{font-family:'Noto Sans KR', sans-serif;font-size:.78rem;color:var(--muted);margin-top:10px;min-height:18px;}
.opt-label{font-family:'Noto Sans KR', sans-serif;font-size:.82rem;color:var(--muted);display:flex;align-items:center;gap:8px;cursor:pointer;}
.opt-label input[type=checkbox]{accent-color:var(--accent);width:14px;height:14px;}
.opt-timeout-label{font-family:'Space Mono',monospace;font-size:.78rem;color:var(--muted);}

/* ── JS Banner ── */
.js-banner{background:rgba(217,119,6,0.07);border:1px solid rgba(217,119,6,0.22);border-radius:8px;padding:14px 16px;margin-bottom:12px;}
.js-banner-title{font-family:'Noto Sans KR', sans-serif;font-size:.75rem;font-weight:700;color:var(--amber);margin-bottom:6px;}
.js-banner-desc{font-size:12px;color:var(--muted);margin-bottom:12px;line-height:1.6;}
.code-lang-tabs{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;}
.code-lang-tab{font-family:'Space Mono',monospace;font-size:.68rem;padding:4px 10px;border:1px solid var(--border2);border-radius:4px;background:var(--card2);color:var(--muted);cursor:pointer;transition:.15s;}
.code-lang-tab.active{border-color:var(--accent);color:var(--accent);background:rgba(2,132,199,.08);}
.install-hint{font-family:'Noto Sans KR', sans-serif;font-size:.68rem;color:var(--dim);margin-top:8px;}
.install-hint code{background:rgba(0,0,0,.04);border:1px solid var(--border);padding:2px 6px;border-radius:3px;color:var(--muted);}

@media(max-width:900px){
  .lab-layout{grid-template-columns:1fr;}
  .iframe-wrap{height:50vh;}
  .control-panel{position:static;max-height:none;}
}
</style>
</head>
<body>
<div class="page-wrap">

<header class="site-header">
  <div class="logo">
    <a href="/" class="logo-brand">DATA<em>FORGE</em></a>
    <span class="logo-sep"></span>
    <div class="logo-title"><span>크롤링</span> 실습 랩</div>
  </div>
  <a href="/factory_lab/" class="header-back">← Factory Lab</a>
</header>

<div class="page">

  <!-- ── Mode tabs ── -->
  <div class="mode-tabs">
    <button class="mode-tab active" onclick="switchMode('lab')">🕷 실습 모드</button>
    <button class="mode-tab" onclick="openBatch()">📋 다중 크롤링</button>
  </div>

  <!-- ══ 실습 모드 ══ -->
  <div id="mode-lab">
  <div class="lab-layout">

    <!-- 왼쪽: 대상 페이지 iframe -->
    <div class="iframe-wrap">
      <div class="iframe-bar">
        <div class="iframe-dot" style="background:#ef4444;"></div>
        <div class="iframe-dot" style="background:#f59e0b;"></div>
        <div class="iframe-dot" style="background:#22c55e;"></div>
        <span id="iframe-url" style="margin-left:6px;">페이지를 선택하세요</span>
      </div>
      <iframe id="site-iframe" src="about:blank"></iframe>
    </div>

    <!-- 오른쪽: 컨트롤 + 결과 -->
    <div class="control-panel">

      <!-- 컨트롤 -->
      <div class="panel-card">
        <h3>// 셀렉터 입력</h3>

        <div class="field-group">
          <div class="field-label">대상 페이지</div>
          <select id="target-select" onchange="loadPage()">
            <option value="">-- 페이지 선택 --</option>
            <option value="/factory_lab/sensor/">센서 모니터링</option>
            <option value="/factory_lab/news/">공지사항</option>
            <option value="/factory_lab/catalog/">부품 카탈로그</option>
            <option value="/factory_lab/production/">생산 실적</option>
            <option value="/factory_lab/maintenance/">설비 점검</option>
          </select>
        </div>

        <div class="field-group">
          <div class="field-label">CSS 셀렉터</div>
          <input type="text" id="sel-input" class="sel-input"
                 placeholder="예: div.st-value  또는 HTML 태그 붙여넣기"
                 autocomplete="off" spellcheck="false" />
          <div id="parse-hint"></div>
          <div class="quick-tags" id="quick-tags"></div>
        </div>

        <button class="btn-run" onclick="runQuery()">▶ 실행</button>
      </div>

      <!-- 결과 -->
      <div class="panel-card" id="result-card" style="display:none;">
        <h3>// 결과</h3>
        <div class="result-count" id="result-count"></div>
        <div class="result-list" id="result-list"></div>
      </div>

      <!-- Python 코드 -->
      <div class="panel-card" id="code-card" style="display:none;">
        <h3>// Python 코드</h3>
        <div class="code-wrap">
          <div class="code-header">
            <span class="code-lang">BEAUTIFULSOUP</span>
            <button class="btn-copy" onclick="copyCode()">복사</button>
          </div>
          <div class="code-body" id="code-body"></div>
        </div>
      </div>

    </div>
  </div>
  </div><!-- /#mode-lab -->

  <!-- ══ 다중 크롤링 모드 ══ -->
  <div id="mode-batch" style="display:none">

    <!-- 옵션 & 실행 버튼 -->
    <div class="panel-card opt-bar" style="margin-bottom:14px">
      <label class="opt-label">
        <input type="checkbox" id="opt-ua" checked>
        User-Agent 사용
      </label>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="opt-timeout-label">Timeout(초)</span>
        <input type="number" id="opt-timeout" value="10" min="3" max="30"
               class="sel-input" style="width:68px;padding:6px 10px">
      </div>
      <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn-run" style="width:auto;padding:9px 20px" onclick="runBatch()">▶ 순차 실행</button>
        <button class="btn-secondary" onclick="clearBatch()">결과 지우기</button>
        <button class="btn-csv" id="csv-btn" style="display:none" onclick="downloadCSV()">↓ CSV 저장</button>
      </div>
    </div>

    <!-- 작업 테이블 -->
    <div class="panel-card" style="margin-bottom:14px">
      <h3>// 크롤링 작업 목록 — 최대 10개</h3>
      <div style="overflow-x:auto">
        <table class="batch-tbl">
          <thead>
            <tr>
              <th style="width:32px">No</th>
              <th>URL &nbsp;<span style="color:var(--dim);font-size:.65rem">전체 URL(https://…) 또는 경로(/factory_lab/…) 모두 가능</span></th>
              <th style="width:190px">CSS 선택자</th>
              <th style="width:130px">항목명</th>
            </tr>
          </thead>
          <tbody id="batch-tbody"></tbody>
        </table>
      </div>
      <div class="status-bar-batch" id="batch-status">대기 중</div>
    </div>

    <!-- 결과 -->
    <div id="batch-results"></div>

  </div><!-- /#mode-batch -->

</div><!-- /.page -->
</div><!-- /.page-wrap -->

<script>
const QUICK = {
  '/factory_lab/sensor/':      ['.st-value','#count-total','.s-name','.s-value','.s-status','.sensor-card'],
  '/factory_lab/news/':        ['.notice-title','.notice-category','.notice-date','td','h1'],
  '/factory_lab/catalog/':     ['.product-name','.product-code','.product-price','.product-card'],
  '/factory_lab/production/':  ['.kpi-value','.kpi-label','td'],
  '/factory_lab/maintenance/': ['.maint-status','td'],
};
const URL_LABELS = {
  '/factory_lab/sensor/':      'dataforge.ai.kr/factory_lab/sensor/',
  '/factory_lab/news/':        'dataforge.ai.kr/factory_lab/news/',
  '/factory_lab/catalog/':     'dataforge.ai.kr/factory_lab/catalog/',
  '/factory_lab/production/':  'dataforge.ai.kr/factory_lab/production/',
  '/factory_lab/maintenance/': 'dataforge.ai.kr/factory_lab/maintenance/',
};

function loadPage() {
  const val   = document.getElementById('target-select').value;
  const iframe = document.getElementById('site-iframe');
  if (!val) return;
  iframe.src = val;
  document.getElementById('iframe-url').textContent = URL_LABELS[val] || val;
  document.getElementById('result-card').style.display = 'none';
  document.getElementById('code-card').style.display   = 'none';
  document.getElementById('sel-input').value = '';
  const tags = QUICK[val] || [];
  document.getElementById('quick-tags').innerHTML = tags
    .map(t => `<span class="qtag" onclick="setQ(this,'${t}')">${t}</span>`)
    .join('');
}

function setQ(el, val) {
  document.querySelectorAll('.qtag').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('sel-input').value = val;
  runQuery();
}

function htmlToSelector(raw) {
  raw = raw.trim();
  if (!raw.startsWith('<')) return raw;
  const m = raw.match(/^<([a-zA-Z][a-zA-Z0-9]*)/);
  if (!m) return raw;
  const tag  = m[1].toLowerCase();
  const idM  = raw.match(/\bid="([^"]+)"/);
  const clsM = raw.match(/\bclass="([^"]+)"/);
  if (idM)  return '#' + idM[1].trim();
  if (clsM) return tag + clsM[1].trim().split(/\s+/).map(c => '.' + c).join('');
  return tag;
}

document.getElementById('sel-input').addEventListener('input', function() {
  const hint = document.getElementById('parse-hint');
  if (this.value.trim().startsWith('<')) {
    hint.textContent = '→ ' + htmlToSelector(this.value);
    hint.style.display = '';
  } else {
    hint.style.display = 'none';
  }
});

document.getElementById('sel-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const val = document.getElementById('sel-input').value.trim();
    if (val.startsWith('<')) {
      document.getElementById('sel-input').value = htmlToSelector(val);
      document.getElementById('parse-hint').style.display = 'none';
    }
    runQuery();
  }
});

function runQuery() {
  const raw      = document.getElementById('sel-input').value.trim();
  const selector = htmlToSelector(raw);
  if (selector !== raw) {
    document.getElementById('sel-input').value = selector;
    document.getElementById('parse-hint').style.display = 'none';
  }
  const target = document.getElementById('target-select').value;
  if (!target)   { alert('페이지를 먼저 선택하세요.'); return; }
  if (!selector) { alert('셀렉터를 입력하세요.'); return; }

  let doc;
  try {
    doc = document.getElementById('site-iframe').contentDocument
       || document.getElementById('site-iframe').contentWindow.document;
  } catch(e) {
    alert('페이지가 아직 로드 중입니다. 잠시 후 다시 시도하세요.');
    return;
  }

  doc.querySelectorAll('[data-crawl-hl]').forEach(el => {
    el.style.outline = '';
    el.removeAttribute('data-crawl-hl');
  });

  let nodes;
  try {
    nodes = Array.from(doc.querySelectorAll(selector));
  } catch(e) {
    showResult([], selector, target);
    return;
  }

  nodes.forEach(el => {
    el.style.outline = '2px solid #0284c7';
    el.style.outlineOffset = '2px';
    el.setAttribute('data-crawl-hl', '1');
  });

  showResult(nodes, selector, target);
}

function showResult(nodes, selector, target) {
  const resultCard = document.getElementById('result-card');
  const codeCard   = document.getElementById('code-card');
  const countEl    = document.getElementById('result-count');
  const listEl     = document.getElementById('result-list');

  resultCard.style.display = '';
  countEl.innerHTML = `<strong>${nodes.length}</strong>개 매칭`;

  if (nodes.length === 0) {
    listEl.innerHTML = '<div class="empty-msg">매칭된 요소가 없습니다</div>';
    codeCard.style.display = 'none';
    return;
  }

  listEl.innerHTML = nodes.map((el, i) => {
    const text = el.textContent.trim().replace(/\s+/g,' ').slice(0, 60);
    const id   = el.id ? `#${el.id}` : '';
    return `<div class="result-row" onclick="focusEl(${i})" data-idx="${i}">
      <span class="r-idx">[${i}]</span>
      <span class="r-val">${escHtml(text) || '<span style="color:var(--dim)">(빈값)</span>'}</span>
      ${id ? `<span class="r-id">${escHtml(id)}</span>` : ''}
    </div>`;
  }).join('');

  const pubUrl = 'https://dataforge.ai.kr' + target;
  const sample = nodes.slice(0,3).map(el => el.textContent.trim().replace(/\s+/g,' ').slice(0,20)).join('", "');
  document.getElementById('code-body').innerHTML =
`<span class="kw">import</span> requests
<span class="kw">from</span> bs4 <span class="kw">import</span> BeautifulSoup

res  = requests.<span class="fn">get</span>(<span class="str">"${pubUrl}"</span>)
soup = BeautifulSoup(res.text, <span class="str">"html.parser"</span>)

<span class="kw">for</span> el <span class="kw">in</span> soup.<span class="fn">select</span>(<span class="str">"${selector}"</span>):
    <span class="fn">print</span>(el.<span class="fn">get_text</span>(strip=<span class="kw">True</span>))

<span class="cm"># 출력 예시: "${sample}"</span>`;

  codeCard.style.display = '';
}

function focusEl(idx) {
  const doc   = document.getElementById('site-iframe').contentDocument;
  const nodes = Array.from(doc.querySelectorAll('[data-crawl-hl]'));
  if (!nodes[idx]) return;
  document.querySelectorAll('.result-row').forEach((r, i) =>
    r.classList.toggle('focused', i === idx));
  nodes.forEach(el => el.style.outline = '2px solid #0284c7');
  nodes[idx].style.outline = '3px solid #059669';
  nodes[idx].scrollIntoView({ behavior:'smooth', block:'center' });
}

function copyCode() {
  const text = document.getElementById('code-body').innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('.btn-copy');
    btn.textContent = '✔ 복사됨';
    setTimeout(() => btn.textContent = '복사', 1500);
  });
}

function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ── 모드 전환 ── */
function switchMode(m) {
  document.querySelectorAll('.mode-tab').forEach((t, i) =>
    t.classList.toggle('active', ['lab','batch'][i] === m));
  document.getElementById('mode-lab').style.display   = m === 'lab'   ? '' : 'none';
  document.getElementById('mode-batch').style.display = m === 'batch' ? '' : 'none';
}

function openBatch() {
  window.open(location.pathname + '?mode=batch', '_blank');
}

if (new URLSearchParams(location.search).get('mode') === 'batch') {
  document.addEventListener('DOMContentLoaded', () => switchMode('batch'));
}

/* ── 배치 테이블 초기화 ── */
(function(){
  let html = '';
  for (let i = 1; i <= 10; i++) {
    html += `<tr>
      <td style="font-family:'Space Mono',monospace;font-size:.75rem;color:var(--dim);text-align:center;padding-right:8px">${i}</td>
      <td><input type="text" class="sel-input batch-url"  style="width:100%"></td>
      <td><input type="text" class="sel-input batch-sel"  style="width:100%"></td>
      <td><input type="text" class="sel-input batch-name" style="width:100%"></td>
    </tr>`;
  }
  document.getElementById('batch-tbody').innerHTML = html;
})();

let batchCSVData = [];

async function runBatch() {
  const urls  = [...document.querySelectorAll('.batch-url')].map(el => el.value.trim());
  const sels  = [...document.querySelectorAll('.batch-sel')].map(el => el.value.trim());
  const names = [...document.querySelectorAll('.batch-name')].map(el => el.value.trim());

  const tasks = [];
  for (let i = 0; i < 10; i++) {
    if (urls[i] && sels[i])
      tasks.push({ no:i+1, url:urls[i], selector:sels[i], name:names[i]||`작업${i+1}` });
  }
  if (!tasks.length) { alert('URL과 셀렉터를 1개 이상 입력하세요.'); return; }

  const resEl    = document.getElementById('batch-results');
  const statusEl = document.getElementById('batch-status');
  resEl.innerHTML = '';
  batchCSVData    = [];
  document.getElementById('csv-btn').style.display = 'none';

  const timeout = +document.getElementById('opt-timeout').value || 10;
  const ua      = document.getElementById('opt-ua').checked;

  for (let ti = 0; ti < tasks.length; ti++) {
    const task = tasks[ti];
    statusEl.textContent = `(${ti+1}/${tasks.length}) [${task.name}] 수집 중...`;

    const card = document.createElement('div');
    card.className = 'panel-card';
    card.style.marginBottom = '10px';
    card.innerHTML = `<div class="running-msg">⟳ [${escHtml(task.name)}] &nbsp;<span style="color:var(--muted)">${escHtml(task.url)}</span></div>`;
    resEl.appendChild(card);

    try {
      const resp = await fetch('crawl_batch.php', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ url:task.url, selector:task.selector, timeout, user_agent:ua })
      });
      const d = await resp.json();
      renderBatchTask(card, task, d);
      if (d.ok && d.results) {
        d.results.forEach((r, idx) => {
          batchCSVData.push({ no:task.no, name:task.name, url:task.url,
            selector:task.selector, index:idx+1, text:r.text, href:r.href });
        });
      }
    } catch(e) {
      card.innerHTML = `<div class="task-err">✗ [${escHtml(task.name)}] 통신 오류: ${escHtml(e.message)}</div>`;
    }
  }

  statusEl.textContent = `완료 — 총 ${batchCSVData.length}개 수집`;
  if (batchCSVData.length) document.getElementById('csv-btn').style.display = '';
}

/* ── JS 렌더링 코드 생성기 ── */
const JS_CODES    = {};
const JS_INSTALLS = {};

function getPwPyCode(url, sel) {
  return `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page    = browser.new_page()
    page.goto("${url}")
    page.wait_for_selector("${sel}", timeout=10000)
    for el in page.query_selector_all("${sel}"):
        print(el.text_content())
    browser.close()`;
}

function getSeleniumCode(url, sel) {
  return `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("${url}")
WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CSS_SELECTOR, "${sel}"))
)
for el in driver.find_elements(By.CSS_SELECTOR, "${sel}"):
    print(el.text)
driver.quit()`;
}

function getPwJsCode(url, sel) {
  return `const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page    = await browser.newPage();
  await page.goto('${url}');
  await page.waitForSelector('${sel}');
  const els = await page.$$('${sel}');
  for (const el of els)
    console.log(await el.textContent());
  await browser.close();
})();`;
}

function buildJsBanner(url, sel, n) {
  const uid = 'jsc-' + n;
  JS_CODES[uid] = {
    'pw-py':    getPwPyCode(url, sel),
    'selenium': getSeleniumCode(url, sel),
    'pw-js':    getPwJsCode(url, sel),
  };
  JS_INSTALLS[uid] = {
    'pw-py':    'pip install playwright && playwright install chromium',
    'selenium': 'pip install selenium  # Chrome 드라이버 별도 설치 필요',
    'pw-js':    'npm install playwright && npx playwright install chromium',
  };
  return `<div class="js-banner">
    <div class="js-banner-title">⚡ JS 렌더링 필요 — curl로는 수집 불가</div>
    <div class="js-banner-desc">이 페이지는 JavaScript(AJAX 포함)로 콘텐츠를 동적 로딩합니다. curl은 초기 HTML만 가져오므로 실제 데이터가 비어 있습니다. 아래 스크립트를 로컬 환경에서 실행하세요.</div>
    <div class="code-lang-tabs">
      <button class="code-lang-tab active" onclick="switchCodeTab('${uid}','pw-py',this)">Python Playwright</button>
      <button class="code-lang-tab" onclick="switchCodeTab('${uid}','selenium',this)">Python Selenium</button>
      <button class="code-lang-tab" onclick="switchCodeTab('${uid}','pw-js',this)">Node.js Playwright</button>
    </div>
    <div class="code-wrap" id="${uid}">
      <div class="code-header">
        <span class="code-lang" id="${uid}-label">PLAYWRIGHT · PYTHON</span>
        <button class="btn-copy" onclick="copyFromEl('${uid}-code')">복사</button>
      </div>
      <pre class="code-body" id="${uid}-code" style="white-space:pre;overflow-x:auto">${escHtml(JS_CODES[uid]['pw-py'])}</pre>
    </div>
    <div class="install-hint" id="${uid}-install">설치: <code>${escHtml(JS_INSTALLS[uid]['pw-py'])}</code></div>
  </div>`;
}

function switchCodeTab(uid, lang, btn) {
  document.getElementById(uid + '-code').textContent = JS_CODES[uid][lang];
  const labels = {'pw-py':'PLAYWRIGHT · PYTHON','selenium':'SELENIUM · PYTHON','pw-js':'PLAYWRIGHT · NODE.JS'};
  document.getElementById(uid + '-label').textContent = labels[lang] || lang.toUpperCase();
  document.getElementById(uid + '-install').innerHTML =
    '설치: <code>' + escHtml(JS_INSTALLS[uid][lang]) + '</code>';
  btn.closest('.code-lang-tabs').querySelectorAll('.code-lang-tab')
    .forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function copyFromEl(id) {
  const el = document.getElementById(id);
  navigator.clipboard.writeText(el.textContent).then(() => {
    const btn = el.closest('.code-wrap').querySelector('.btn-copy');
    btn.textContent = '✔ 복사됨';
    setTimeout(() => btn.textContent = '복사', 1500);
  });
}

function renderBatchTask(card, task, d) {
  if (!d.ok) {
    card.innerHTML =
      `<div class="task-err">✗ [${escHtml(task.name)}] &nbsp; ${escHtml(d.error||'오류')}</div>
       <div class="task-meta" style="margin-top:4px">${escHtml(task.url)}</div>`;
    return;
  }
  const items    = d.results || [];
  const jsBanner = d.js_required ? buildJsBanner(task.url, task.selector, task.no) : '';

  const rows = items.length
    ? items.map((r, i) =>
        `<div class="result-row">
          <span class="r-idx">[${i+1}]</span>
          <span class="r-val">${escHtml(r.text.slice(0,80))}${r.text.length>80?'…':''}</span>
          ${r.href ? `<span class="r-id">${escHtml(r.href.slice(0,50))}</span>` : ''}
        </div>`).join('')
    : d.js_required ? '' : '<div class="empty-msg">결과 없음 — 셀렉터를 확인하세요</div>';

  card.innerHTML =
    `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:${d.js_required?'12':'8'}px">
      <div>
        <span class="${d.js_required ? 'running-msg' : 'task-ok'}">${d.js_required ? '⚡' : '✓'} [${escHtml(task.name)}]</span>
        <span class="task-meta" style="margin-left:10px">${escHtml(task.url)}</span>
        <span style="font-family:'Space Mono',monospace;font-size:.7rem;color:var(--accent);margin-left:10px">${escHtml(task.selector)}</span>
      </div>
      <span style="font-family:'Space Mono',monospace;font-size:.75rem;color:var(--accent)">${items.length}개</span>
    </div>
    ${jsBanner}
    <div class="result-list">${rows}</div>`;
}

function clearBatch() {
  document.getElementById('batch-results').innerHTML = '';
  document.getElementById('batch-status').textContent = '대기 중';
  batchCSVData = [];
  document.getElementById('csv-btn').style.display = 'none';
}

function downloadCSV() {
  if (!batchCSVData.length) return;
  const cols  = ['no','name','url','selector','index','text','href'];
  const lines = [cols.join(','), ...batchCSVData.map(r =>
    cols.map(c => '"' + String(r[c]||'').replace(/"/g,'""') + '"').join(',')
  )];
  const blob = new Blob(['﻿' + lines.join('\n')], {type:'text/csv;charset=utf-8;'});
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(blob),
    download: 'crawl_' + new Date().toISOString().slice(0,10) + '.csv'
  });
  a.click();
}
</script>
<script src="/mfg/js/promo.js" defer></script>
</body>
</html>
