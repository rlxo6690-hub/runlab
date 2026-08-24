<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DataForge — Admin</title>
<script>const BASE_URL = '/mfg'; const SESSION_TIMEOUT_SEC = 7200;</script>
<link rel="icon" type="image/png" href="/img/mfg.png">
<meta property="og:title" content="DataForge Admin">
<meta property="og:description" content="DataForge 통합 관리자 페이지">
<meta property="og:image" content="https://dataforge.ai.kr/img/OG_IMAGE.jpg">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js"></script>
<style>
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
:root{
  --bg:#f8fafc;--card:#ffffff;--card2:#f1f5f9;
  --border:rgba(0,0,0,.1);--border2:rgba(0,0,0,.15);
  --text:#1e293b;--muted:#64748b;--dim:#94a3b8;
  --accent:#2563eb;--accent2:#6366f1;
  --amber:#d97706;--green:#059669;--red:#dc2626;--orange:#ea580c;
  --r:10px;
  /* backward compat */
  --surface:var(--card);--danger:var(--red);--warning:var(--amber);
}
body{background:var(--bg);color:var(--text);font-family:'Noto Sans KR','Segoe UI',system-ui,-apple-system,sans-serif;min-height:100vh;font-size:14px;line-height:1.6}
body::before{content:'';position:fixed;inset:0;background-image:linear-gradient(rgba(37,99,235,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.04) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;z-index:0}

/* ── NAV ── */
.nav{background:rgba(248,250,252,.95);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:100;backdrop-filter:blur(16px)}
.nav-inner{max-width:1280px;margin:0 auto;height:56px;display:flex;align-items:center;padding:0 24px;gap:0}
.nav-logo{font-family:'Space Mono',monospace;font-size:16px;font-weight:700;color:var(--accent);letter-spacing:2px;margin-right:32px;white-space:nowrap;display:flex;align-items:center;gap:10px}
.nav-logo em{color:var(--orange);font-style:normal}
.nav-logo-sep{width:1px;height:16px;background:var(--border2);flex-shrink:0}
.nav-logo-sub{font-size:12px;color:var(--muted);font-family:'Noto Sans KR','Segoe UI',system-ui,sans-serif;font-weight:400;letter-spacing:0}
.nav-tabs{display:flex;height:100%;gap:2px}
.nav-tab{display:flex;align-items:center;gap:7px;padding:0 16px;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;transition:.15s;white-space:nowrap}
.nav-tab:hover{color:var(--text)}
.nav-tab.active{color:var(--accent);border-bottom-color:var(--accent)}
/* 그룹 드롭다운 네비 */
.nav-group{position:relative;display:flex;align-items:center;height:100%}
.nav-group-btn{display:flex;align-items:center;gap:7px;height:100%;padding:0 14px;font-size:13px;font-weight:600;
  color:var(--muted);cursor:pointer;border:none;background:none;border-bottom:2px solid transparent;
  transition:.15s;white-space:nowrap}
.nav-group-btn:hover{color:var(--text)}
.nav-group-btn .caret{font-size:9px;color:var(--dim);transition:transform .15s}
.nav-group.open .nav-group-btn .caret{transform:rotate(180deg)}
.nav-group.active .nav-group-btn{color:var(--accent);border-bottom-color:var(--accent)}
.nav-group.active .nav-group-btn .caret{color:var(--accent)}
.nav-group-cur{font-weight:400;color:var(--dim);font-size:12px}
.nav-group.active .nav-group-cur{color:var(--accent);opacity:.75}
.nav-menu{position:absolute;top:calc(100% - 1px);left:0;min-width:210px;background:var(--card);
  border:1px solid var(--border);border-radius:10px;box-shadow:0 10px 30px rgba(15,23,42,.13);
  padding:6px;display:none;z-index:200}
.nav-group.open .nav-menu{display:block}
.nav-menu-item{display:flex;align-items:center;gap:9px;width:100%;min-height:40px;padding:9px 12px;
  border:none;background:none;border-radius:7px;font-size:13px;color:var(--text);
  font-family:inherit;text-align:left;white-space:nowrap;cursor:pointer;transition:.12s}
.nav-menu-item:hover,.nav-menu-item:focus{background:var(--card2);outline:none}
.nav-menu-item.active{background:rgba(37,99,235,.09);color:var(--accent);font-weight:600}
/* 메뉴 검색 버튼 */
.nav-search{display:flex;align-items:center;gap:8px;min-height:32px;padding:6px 10px;font-size:12px;
  color:var(--muted);background:var(--card2);border:1px solid var(--border);border-radius:8px;
  font-family:inherit;cursor:pointer;transition:.15s}
.nav-search:hover{color:var(--text);border-color:var(--border2)}
.nav-kbd{font-family:'Space Mono',monospace;font-size:10px;color:var(--dim);
  background:var(--card);border:1px solid var(--border);border-radius:4px;padding:1px 5px}
@media(max-width:1100px){ .nav-search span{display:none} .nav-search::before{content:'🔍'} }
/* 빠른 이동 팔레트 */
.cmdk-back{position:fixed;inset:0;background:rgba(15,23,42,.4);backdrop-filter:blur(2px);
  z-index:900;display:none;align-items:flex-start;justify-content:center;padding:14vh 16px 16px}
.cmdk-back.open{display:flex}
.cmdk{width:100%;max-width:460px;background:var(--card);border:1px solid var(--border);
  border-radius:14px;box-shadow:0 24px 60px rgba(15,23,42,.28);overflow:hidden}
.cmdk-inp{width:100%;border:none;border-bottom:1px solid var(--border);background:none;
  padding:16px 18px;font-size:16px;color:var(--text);font-family:inherit;outline:none}
.cmdk-list{max-height:320px;overflow-y:auto;padding:6px}
.cmdk-item{display:flex;align-items:center;gap:10px;width:100%;min-height:44px;padding:10px 12px;
  border:none;background:none;border-radius:8px;font-size:14px;color:var(--text);
  font-family:inherit;text-align:left;cursor:pointer}
.cmdk-item .grp{margin-left:auto;font-size:11px;color:var(--dim)}
.cmdk-item.sel,.cmdk-item:hover{background:var(--card2)}
.cmdk-item.sel{color:var(--accent)}
.cmdk-empty{padding:20px;text-align:center;color:var(--dim);font-size:13px}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:12px}
.nav-badge{font-size:11px;background:rgba(37,99,235,.08);color:var(--accent);border:1px solid rgba(37,99,235,.2);padding:3px 10px;border-radius:20px;font-family:'Space Mono',monospace}
.nav-logout{font-size:12px;color:var(--muted);text-decoration:none;padding:5px 14px;border:1px solid var(--border2);border-radius:8px;transition:.2s}
.nav-logout:hover{color:var(--text);border-color:rgba(0,0,0,.3)}

/* ── CONTENT ── */
.content{max-width:1280px;margin:0 auto;padding:32px 24px}
.tab-panel{display:none}.tab-panel.active{display:block}

/* ── CARD ── */
.card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);margin-bottom:20px}
.card-head{padding:14px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.card-title{font-size:10px;font-weight:700;color:var(--muted);letter-spacing:.07em;text-transform:uppercase;font-family:'Noto Sans KR', sans-serif}
.card-body{padding:20px}

/* ── FORM ── */
.lbl{display:block;font-size:11px;color:var(--muted);margin-bottom:5px;letter-spacing:.05em;text-transform:uppercase;font-weight:700}
.inp{width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:9px 12px;font-size:13px;border-radius:8px;outline:none;transition:.15s}
.inp:focus{border-color:var(--accent);background:var(--card)}
.inp:disabled{opacity:.4}

/* ── BUTTONS ── */
.btn{display:inline-block;padding:9px 20px;border-radius:8px;border:none;cursor:pointer;font-size:12px;font-weight:700;font-family:'Noto Sans KR', sans-serif;transition:all .2s;letter-spacing:.5px}
.btn:disabled{opacity:.4;cursor:not-allowed}
.btn-accent,.btn-primary{background:var(--accent);color:#fff}.btn-accent:hover,.btn-primary:hover{background:#1d4ed8}
.btn-green{background:var(--green);color:#fff}.btn-green:hover{background:#047857}
.btn-danger,.btn-red{background:rgba(220,38,38,.08);border:1px solid var(--red);color:var(--red)}.btn-danger:hover,.btn-red:hover{background:var(--red);color:#fff}
.btn-ghost,.btn-outline{background:transparent;border:1px solid var(--border2);color:var(--muted)}.btn-ghost:hover,.btn-outline:hover{color:var(--text);border-color:rgba(0,0,0,.3)}
.btn-copy{background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.2);color:var(--accent);padding:6px 14px;font-size:11px;font-weight:700;border-radius:6px;cursor:pointer;transition:.2s;font-family:'Noto Sans KR', sans-serif}
.btn-copy.copied{background:var(--green);color:#fff;border-color:var(--green)}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}

/* ── MSG ── */
.msg{padding:10px 14px;border-radius:8px;font-size:13px;margin-top:10px;display:none}
.msg.ok{background:rgba(5,150,105,.07);border:1px solid var(--green);color:var(--green)}
.msg.err{background:rgba(220,38,38,.07);border:1px solid var(--red);color:var(--red)}
.err-txt{color:var(--red);font-size:12px;min-height:18px}

/* ── PULSE ── */
.pulse{width:8px;height:8px;border-radius:50%;flex-shrink:0;transition:.3s}
.pulse.on{background:var(--green);box-shadow:0 0 8px var(--green);animation:blink 1s infinite}
.pulse.off{background:var(--dim)}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.25}}

/* ── DATA STATS ── */
.ds-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px}
.ds-box{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:16px 12px;text-align:center;transition:.25s}
.ds-num{font-size:24px;font-weight:700;font-family:'Space Mono',monospace;color:var(--accent);transition:.3s}
.ds-lbl{font-size:11px;color:var(--muted);margin-top:4px}
.ds-sub{font-size:10px;margin-top:6px;color:var(--dim);opacity:.6}
.ds-total-bar{display:flex;justify-content:space-between;align-items:center;padding:8px 14px;background:var(--card2);border:1px solid var(--border);border-radius:8px;font-size:12px;margin-bottom:16px}

/* ── SESSION ── */
.sess-item{display:flex;align-items:center;gap:16px;padding:16px 18px;background:var(--card2);border-radius:var(--r);border:1px solid var(--border);margin-bottom:10px;transition:.2s}
.sess-item:hover{border-color:var(--border2)}
.sess-item.expired{opacity:.5}
.sess-code{font-family:'Space Mono',monospace;font-size:17px;color:var(--accent);letter-spacing:3px;font-weight:700;margin:5px 0}
.sess-code.expired{color:var(--dim);text-decoration:line-through}
.sess-meta{font-size:11px;color:var(--dim);display:flex;gap:14px;flex-wrap:wrap;margin-top:5px}
.sbadge{font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px;margin-left:8px;white-space:nowrap}
.sb-active{background:rgba(22,163,74,.12);color:var(--green);border:1px solid var(--green)}
.sb-upcoming{background:rgba(2,132,199,.12);color:var(--accent);border:1px solid var(--accent)}
.sb-expired{background:rgba(100,100,100,.15);color:var(--dim);border:1px solid var(--border)}
.btn-curric{background:rgba(99,102,241,.1);border:none;color:#6366f1;padding:6px 14px;font-size:11px;font-weight:700;border-radius:3px;cursor:pointer;transition:.2s}
.btn-curric:hover{background:rgba(99,102,241,.22)}
.btn-period{background:rgba(217,119,6,.1);border:none;color:#d97706;padding:6px 14px;font-size:11px;font-weight:700;border-radius:3px;cursor:pointer;transition:.2s}
.btn-period:hover{background:rgba(217,119,6,.22)}
/* 기간 연장 인라인 패널 */
.sess-period{margin:-4px 0 14px;padding:14px 18px;background:var(--card2);border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--r)}
.sess-period-row{display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap}
.sess-period-fld{display:flex;flex-direction:column;gap:4px}
.sess-period-fld .inp{padding:7px 10px;font-size:13px}
.sess-period-quick{display:flex;gap:6px}
.sess-period-quick button{background:var(--card);border:1px solid var(--border2);color:var(--text);padding:7px 12px;font-size:11px;font-weight:700;border-radius:4px;cursor:pointer;transition:.2s;min-height:34px}
.sess-period-quick button:hover{border-color:var(--accent);color:var(--accent)}
.sess-period-hint{font-size:11px;color:var(--dim);margin-top:8px;line-height:1.6}

/* ── CURRICULUM INLINE EDITOR ── */
.curric-inline-hd{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 0 14px;margin-bottom:14px;border-bottom:1px solid var(--border)}
.curric-inline-hd-center{font-size:15px;font-weight:700;color:var(--text);display:flex;align-items:center;gap:8px;flex:1;justify-content:center}
.curric-inline-body{display:flex;height:calc(100vh - 216px);min-height:500px;border:1px solid var(--border);border-radius:var(--r);background:var(--card);overflow:hidden;position:relative}
.curric-body{display:flex;flex:1;overflow:hidden}
.curric-list-panel{width:240px;border-right:1px solid var(--border);display:flex;flex-direction:column;flex-shrink:0}
.curric-list{flex:1;overflow-y:auto;padding:8px}
.curric-mod-item{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:4px;cursor:pointer;border:1px solid transparent;margin-bottom:4px;transition:.15s}
.curric-mod-item:hover{background:var(--card2)}
.curric-mod-item.active{background:rgba(37,99,235,.06);border-color:rgba(37,99,235,.25)}
.curric-mod-num{font-family:'Space Mono',monospace;font-size:10px;color:var(--dim);width:20px;flex-shrink:0}
.curric-mod-icon{font-size:14px;flex-shrink:0}
.curric-mod-label{font-size:12px;font-weight:600;color:var(--text);flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.curric-mod-actions{display:flex;gap:3px;flex-shrink:0}
.curric-mod-btn{background:none;border:none;cursor:pointer;font-size:12px;color:var(--dim);padding:2px 4px;border-radius:2px;transition:.15s}
.curric-mod-btn:hover{background:var(--bg);color:var(--text)}
/* 이미지 삽입 버튼 · 드래그 앤 드롭 */
.img-ins-btn{flex-shrink:0;font-size:11px;font-weight:600;padding:4px 10px;border-radius:6px;cursor:pointer;font-family:inherit;
  background:rgba(99,102,241,.08);border:1px solid rgba(99,102,241,.3);color:#6366f1;transition:.15s;white-space:nowrap;text-transform:none;letter-spacing:0}
.img-ins-btn:hover{background:rgba(99,102,241,.18)}
.curric-ta.drag-over{border-color:#6366f1;background:rgba(99,102,241,.06);box-shadow:0 0 0 3px rgba(99,102,241,.12)}

/* 정답 공개 스위치 */
.ans-sw{flex-shrink:0;font-size:11px;font-weight:700;padding:5px 12px;border-radius:20px;cursor:pointer;font-family:inherit;transition:.15s;white-space:nowrap;
  background:rgba(100,116,139,.1);border:1px solid rgba(100,116,139,.3);color:var(--muted)}
.ans-sw:hover{background:rgba(100,116,139,.18)}
.ans-sw.on{background:rgba(16,185,129,.12);border-color:rgba(16,185,129,.45);color:#059669}
.ans-sw.on:hover{background:rgba(16,185,129,.2)}
.curric-add-btn{margin:8px;padding:8px;background:rgba(37,99,235,.04);border:1px dashed rgba(37,99,235,.25);border-radius:6px;font-size:12px;font-weight:600;color:var(--accent);cursor:pointer;text-align:center;transition:.15s}
.curric-add-btn:hover{background:rgba(37,99,235,.1)}
.curric-form-panel{flex:1;overflow-y:auto;padding:20px}
.curric-form-row{margin-bottom:14px}
.curric-label{display:block;font-size:11px;color:var(--text);margin-bottom:5px;letter-spacing:.5px;text-transform:uppercase}
.curric-inp{width:100%;background:var(--card2);border:1px solid var(--border2);color:var(--text);padding:8px 10px;font-size:13px;border-radius:6px;outline:none;transition:.15s}
.curric-inp:focus{border-color:var(--accent);background:var(--card)}
.curric-ta{resize:vertical;min-height:120px;font-family:inherit;line-height:1.7}
.curric-tools-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:4px;margin-top:6px}
@media (min-width:768px){.curric-tools-grid{grid-template-columns:repeat(3,1fr)}}
@media (min-width:1024px){.curric-tools-grid{grid-template-columns:repeat(5,1fr)}}
.curric-tool-chk{display:flex;align-items:center;gap:5px;padding:4px 6px;background:var(--card2);border:1px solid var(--border);border-radius:5px;cursor:pointer;font-size:11px;font-weight:500;color:var(--text);transition:.15s;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.curric-tool-chk:hover{border-color:rgba(37,99,235,.4)}
.tool-group-hd{grid-column:1/-1;font-size:9px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);padding:7px 4px 3px;border-bottom:1px solid var(--border);margin-bottom:1px}
.tool-group-hd:first-child{padding-top:2px}
.curric-tool-chk input{accent-color:var(--accent);cursor:pointer}
.curric-title{font-size:15px;font-weight:700;color:var(--text);flex:1}
.curric-save-msg{font-size:12px;color:var(--green);min-height:18px}

/* ── CONTENT LIBRARY ── */
.cl-item{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--card2);border:1px solid var(--border);border-radius:var(--r);margin-bottom:8px;transition:.2s;cursor:pointer}
.cl-item:hover{border-color:var(--accent)}
.cl-item-icon{font-size:20px;flex-shrink:0}
.cl-item-info{flex:1;min-width:0}
.cl-item-title{font-size:13px;font-weight:600;color:var(--text);display:block}
.cl-item-desc{font-size:11px;color:var(--dim);margin-top:2px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cl-item-tools{font-size:12px;color:var(--accent);margin-top:3px;display:block}
/* ── LIBRARY PICKER ── */
.lib-picker-wrap{position:absolute;inset:0;background:var(--card);z-index:20;display:none;flex-direction:column;border-radius:var(--r)}
.lib-picker-wrap.open{display:flex}
.lib-picker-hd{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-shrink:0}
.lib-picker-title{font-size:14px;font-weight:700;color:var(--text);flex:1}
.lib-picker-body{flex:1;overflow-y:auto;padding:12px;background:var(--card2)}
.lib-picker-item{display:flex;align-items:center;gap:12px;padding:10px 12px;background:var(--card);border:1px solid var(--border);border-radius:var(--r);margin-bottom:8px;transition:.2s}
.lib-picker-item:hover{border-color:var(--accent)}
.lib-picker-icon{font-size:18px;flex-shrink:0}
.lib-picker-info{flex:1;min-width:0}
.lib-picker-name{font-size:13px;font-weight:600;color:var(--text);display:block}
.lib-picker-desc{font-size:11px;color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;display:block}
.lib-picker-tools{font-size:12px;color:var(--accent);display:block;margin-top:2px}
.lib-picker-btn{font-size:11px;font-weight:700;color:var(--accent);padding:5px 12px;background:rgba(37,99,235,.08);border:1px solid rgba(37,99,235,.25);border-radius:6px;cursor:pointer;flex-shrink:0;white-space:nowrap}
.lib-picker-btn:hover{background:rgba(37,99,235,.16)}
.lib-picker-empty{padding:40px 20px;text-align:center;font-size:13px;color:var(--dim);line-height:1.8}
.lib-picker-group{margin-bottom:14px;border:1px solid rgba(99,102,241,.25);border-radius:var(--r);padding:10px 10px 2px;background:rgba(99,102,241,.04)}
.lib-picker-group-hd{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:2px 4px 10px}
.lib-picker-group-name{font-size:12px;font-weight:700;color:#6366f1}
.lib-picker-group-name em{font-style:normal;font-weight:400;color:var(--dim);font-size:11px;margin-left:4px}

/* ── PDF UPLOAD ── */
.pdf-attach-area{margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.pdf-preview{display:flex;align-items:center;gap:8px;padding:7px 12px;background:rgba(37,99,235,.06);border:1px solid rgba(37,99,235,.2);border-radius:6px;font-size:12px;flex:1;min-width:0}
.pdf-preview-name{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--accent);font-weight:600}
.pdf-remove-btn{background:none;border:none;cursor:pointer;color:var(--danger);font-size:16px;line-height:1;padding:0 2px;flex-shrink:0}
.pdf-uploading{font-size:11px;color:var(--dim);font-family:'Noto Sans KR', sans-serif}

/* ── CURRICULUM SECTION PANELS ── */
.cf-meta{display:grid;grid-template-columns:72px 1fr;gap:10px;margin-bottom:12px;align-items:start}
.cf-section{border-radius:6px;padding:14px 16px;margin-bottom:10px}
.cf-section-hd{font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:6px}
.cf-section.s-problem{background:rgba(2,132,199,.04);border:1.5px solid rgba(2,132,199,.2)}
.cf-section.s-problem .cf-section-hd{color:var(--accent)}
.cf-section.s-content{background:var(--bg);border:1px solid var(--border)}
.cf-section.s-content .cf-section-hd{color:var(--dim)}
.cf-section.s-example{background:#0f172a;border:1px solid rgba(255,255,255,.08)}
.cf-section.s-example .cf-section-hd{color:rgba(255,255,255,.45)}
.cf-section.s-example .curric-inp{background:#1e293b;border-color:rgba(255,255,255,.1);color:#e2e8f0;font-family:'Space Mono',monospace;font-size:12px;line-height:1.7}
.cf-section.s-example .curric-inp:focus{border-color:rgba(255,255,255,.3);outline:none}
.cf-section.s-attach{background:rgba(139,92,246,.04);border:1.5px solid rgba(139,92,246,.18)}
.cf-section.s-attach .cf-section-hd{color:#8b5cf6}
.cf-attach-item{display:flex;align-items:center;gap:8px;padding:7px 10px;background:var(--surface);border:1px solid var(--border);border-radius:5px;margin-bottom:6px}
.cf-attach-icon{font-size:15px;flex-shrink:0}
.cf-attach-name{flex:1;font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--text)}
.cf-attach-size{font-size:11px;color:var(--dim);flex-shrink:0}
.cf-attach-rm{background:none;border:none;cursor:pointer;color:var(--dim);font-size:14px;padding:2px 5px;line-height:1;border-radius:3px}
.cf-attach-rm:hover{color:var(--danger);background:rgba(239,68,68,.08)}
.cf-extype{display:flex;gap:14px;margin-bottom:0}
.cf-extype label{display:flex;align-items:center;gap:5px;cursor:pointer;font-size:12px;font-weight:600;color:rgba(255,255,255,.55)}
.cf-extype input{accent-color:#6366f1}
.cf-example-item{border:1px solid rgba(255,255,255,.1);border-radius:5px;padding:11px 12px;margin-bottom:8px}
.cf-example-item-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:8px}
.cf-section.s-answer{background:rgba(16,185,129,.04);border:1.5px solid rgba(16,185,129,.22)}
.cf-section.s-answer .cf-section-hd{color:#10b981}

/* ── EMPTY / HINT ── */
.empty{text-align:center;padding:48px 20px;font-size:13px;color:var(--muted);border:1px dashed var(--border);border-radius:var(--r)}
.hint{margin-top:14px;padding:10px 16px;background:rgba(37,99,235,.04);border-left:2px solid var(--accent);border-radius:0 6px 6px 0;font-size:11px;color:var(--muted);line-height:1.8}

/* ── DB STAT BOXES ── */
.db-stat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px}
.db-stat-box{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);padding:16px;text-align:center}
.db-stat-num{font-size:28px;font-weight:700;font-family:'Space Mono',monospace;color:var(--accent)}
.db-stat-name{font-size:11px;color:var(--muted);margin-top:4px}
.db-stat-last{font-size:10px;color:var(--dim);margin-top:6px}

/* ── DIFFICULTY CARDS ── */
.diff-card{padding:8px 6px;background:var(--bg);border:1px solid var(--border);border-radius:4px;cursor:pointer;text-align:center;transition:.15s;user-select:none}
.diff-card:hover{border-color:var(--dc)}
.diff-card.active{border-color:var(--dc);background:color-mix(in srgb,var(--dc) 10%,transparent)}
.diff-name{font-family:'Space Mono',monospace;font-size:11px;font-weight:700;color:var(--dim);transition:.15s}
.diff-card.active .diff-name{color:var(--dc)}

/* ── COLUMN SELECTOR ── */
.col-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px}
.col-card{background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:8px 10px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:.15s;user-select:none}
.col-card:hover{border-color:#2a3a50}
.col-card.checked{border-color:var(--accent);background:rgba(2,132,199,.06)}
.col-card input[type=checkbox]{accent-color:var(--accent);flex-shrink:0;cursor:pointer}
.col-name{font-size:12px;font-weight:600;color:var(--text);line-height:1.3}
.col-id{font-size:10px;color:var(--dim);margin-top:1px}

/* ── ANOMALY SLIDERS ── */
.slider-row{display:grid;gap:14px;margin-bottom:14px}
.slider-row.col3{grid-template-columns:1fr 1fr 1fr}
.slider-row.col2{grid-template-columns:1fr 1fr}
.slider-item label{display:flex;justify-content:space-between;font-size:11px;color:var(--text);margin-bottom:5px}
.slider-item label span{font-family:'Space Mono',monospace;font-weight:700}
.anomaly-summary{font-size:11px;color:var(--dim);font-family:'Space Mono',monospace;padding:8px 12px;background:var(--bg);border:1px solid var(--border);border-radius:3px;line-height:1.8;margin-bottom:14px}

/* ── SCENARIO BTNS ── */
.scenario-btns{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}
.scenario-btn{padding:8px 4px;font-size:11px;font-weight:700;border-radius:4px;cursor:pointer;border:1px solid;transition:.15s;font-family:'Noto Sans KR', sans-serif;text-align:center}
.scenario-btn.s-normal{background:rgba(22,163,74,.12);border-color:var(--green);color:var(--green)}
.scenario-btn.s-crisis{background:transparent;border-color:var(--danger);color:var(--danger)}
.scenario-btn.s-crisis.active, .scenario-btn.s-crisis:hover{background:rgba(220,38,38,.12)}
.scenario-btn.s-degradation{background:transparent;border-color:#ff6b35;color:#ff6b35}
.scenario-btn.s-degradation.active, .scenario-btn.s-degradation:hover{background:rgba(234,88,12,.12)}
.scenario-btn.s-maintenance{background:transparent;border-color:var(--accent);color:var(--accent)}
.scenario-btn.s-maintenance.active, .scenario-btn.s-maintenance:hover{background:rgba(2,132,199,.12)}
.scenario-btn.s-normal.active{background:var(--green);color:#000}

/* ── STREAM LOG ── */
.stream-log{background:var(--card2);border:1px solid var(--border);border-radius:8px;height:260px;overflow-y:auto;padding:10px 12px;font-family:'Space Mono',monospace;font-size:11px;line-height:1.7}

/* ── LOGIN MODAL ── */
.modal{position:fixed;inset:0;background:rgba(15,23,42,.8);display:flex;align-items:center;justify-content:center;z-index:200;backdrop-filter:blur(4px)}
.modal-box{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:40px;width:380px;box-shadow:0 20px 60px rgba(0,0,0,.2)}
.modal-title{font-size:22px;font-weight:700;color:var(--accent);margin-bottom:4px;font-family:'Noto Sans KR', sans-serif}
.modal-sub{font-size:12px;color:var(--muted);margin-bottom:28px}

/* ── GRID HELPERS ── */
.g2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px}
.g-gap{display:grid;gap:12px}

/* ── TRAFFIC DASHBOARD ── */
.tf-kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}
.tf-kpi{background:var(--card2);border:1px solid var(--border);border-radius:var(--r);padding:18px 14px;text-align:center}
.tf-kpi-num{font-size:30px;font-weight:700;font-family:'Space Mono',monospace;transition:.3s}
.tf-kpi-lbl{font-size:10px;color:var(--dim);margin-top:4px;letter-spacing:.5px;text-transform:uppercase}
.tf-chart-wrap{position:relative;height:220px}
.tf-svc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-top:12px}
.tf-svc-box{background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:12px 14px}
.tf-svc-name{font-family:'Space Mono',monospace;font-size:11px;font-weight:700;color:var(--accent);margin-bottom:6px}
.tf-svc-bar-bg{height:4px;background:#e2e8f0;border-radius:2px;margin-bottom:6px}
.tf-svc-bar{height:4px;background:var(--accent);border-radius:2px;transition:.5s}
.tf-svc-nums{font-size:11px;color:var(--dim)}
.tf-recent-table{width:100%;border-collapse:collapse;font-size:12px}
.tf-recent-table th{text-align:left;font-size:10px;color:var(--dim);font-weight:700;letter-spacing:.5px;padding:6px 10px;border-bottom:1px solid var(--border);text-transform:uppercase}
.tf-recent-table td{padding:7px 10px;border-bottom:1px solid rgba(30,37,53,.6);color:var(--text)}
.tf-recent-table tr:last-child td{border-bottom:none}
.tf-tag{display:inline-block;font-size:10px;font-family:'Space Mono',monospace;font-weight:700;padding:2px 7px;border-radius:3px;background:rgba(2,132,199,.1);color:var(--accent);border:1px solid rgba(2,132,199,.2)}
.tf-new{display:inline-block;font-size:9px;font-weight:700;padding:1px 5px;border-radius:2px;background:rgba(22,163,74,.12);color:var(--green);border:1px solid rgba(22,163,74,.3);margin-left:4px}

/* ── MOBILE NAV SELECT ── */
.nav-select-mobile{
  display:none;flex:1;min-width:0;
  background:var(--surface);color:var(--text);
  border:1px solid var(--border);border-radius:4px;
  padding:7px 28px 7px 10px;font-size:12px;
  font-family:'Space Mono',monospace;
  cursor:pointer;outline:none;
  appearance:none;-webkit-appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230284c7' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 8px center;
}

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  /* Nav */
  .nav-inner{padding:0 12px;gap:8px}
  .nav-logo{font-size:12px;letter-spacing:1px;margin-right:0}
  .nav-tabs{display:none}
  .nav-select-mobile{display:block}
  .nav-badge{display:none}
  .nav-search{display:none}
  .nav-logout{font-size:11px;padding:4px 8px}

  /* Content */
  .content{padding:14px 14px}

  /* Grids */
  .g2,.g3{grid-template-columns:1fr}
  .ds-grid{grid-template-columns:1fr 1fr}
  .tf-kpi-grid{grid-template-columns:1fr 1fr}
  .db-stat-grid{grid-template-columns:1fr 1fr}
  .col-grid{grid-template-columns:1fr}
  .scenario-btns{grid-template-columns:1fr 1fr}

  /* Sliders */
  .slider-row.col3,.slider-row.col2{grid-template-columns:1fr}

  /* Rate/count/infinite inline grid */
  .rate-grid{grid-template-columns:1fr 1fr !important}
  .rate-grid .rate-infinite{grid-column:1/-1;justify-content:flex-start}

  /* Status bar */
  .stream-status-bar{flex-wrap:wrap;gap:8px}
  .stream-status-bar > a{margin-left:0 !important;width:100%}

  /* Session item */
  .sess-item{flex-direction:column;align-items:flex-start;gap:10px}
  .sess-meta{gap:8px}
  .sess-period-row{flex-direction:column;align-items:stretch}
  .sess-period-fld,.sess-period-row .btn{width:100%}
  .sess-period-quick button{flex:1}

  /* Card */
  .card-head{padding:12px 14px}
  .card-body{padding:14px}

  /* Modal */
  .modal-box{width:94vw;padding:28px 18px}
  .modal-title{font-size:18px}

  /* Chart */
  .tf-chart-wrap{height:180px}
}

/* ── API 수집기 ── */
.ac-api-row{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)}
.ac-api-row:last-child{border-bottom:none}
.ac-api-name{flex:1;font-weight:600;font-size:13px}
.ac-api-url{font-size:11px;color:var(--dim);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:300px}
.ac-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px}
.ac-form-grid .full{grid-column:1/-1}
.ac-form-label{font-size:11px;font-weight:700;color:var(--muted);margin-bottom:3px;display:block;letter-spacing:.3px}
.ac-form-hint{font-size:10px;color:var(--dim);margin-top:2px}
.ac-progress{background:var(--card2);border-radius:8px;padding:14px 16px;font-size:13px;line-height:1.8;margin-top:10px;display:none}
.ac-progress.show{display:block}
.ac-progress-bar-wrap{height:6px;background:rgba(37,99,235,.1);border-radius:3px;margin:8px 0}
.ac-progress-bar{height:100%;background:var(--accent);border-radius:3px;width:0;transition:width .3s}
.ac-hist-row{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid var(--border);font-size:12px}
.ac-hist-row:last-child{border-bottom:none}
.ac-hist-meta{flex:1;min-width:0}
.ac-hist-name{font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ac-hist-date{color:var(--dim);font-size:11px}
.ac-hist-cnt{font-family:'Space Mono',monospace;color:var(--green);font-weight:700;font-size:12px;white-space:nowrap}
/* 짧은 주소 · QR */
.su-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 16px}
.su-form-grid .full{grid-column:1/-1}
.su-table{width:100%;border-collapse:collapse;font-size:13px;min-width:640px}
.su-table th{text-align:left;font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.3px;
             padding:8px 10px;border-bottom:1px solid var(--border);white-space:nowrap}
.su-table td{padding:10px;border-bottom:1px solid var(--border);vertical-align:middle}
.su-table tr:last-child td{border-bottom:none}
.su-short{font-family:'Space Mono',monospace;font-size:13px;font-weight:700;color:var(--accent);white-space:nowrap}
.su-target{color:var(--muted);max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px}
.su-target a{color:inherit;text-decoration:none}
.su-target a:hover{text-decoration:underline}
.su-memo{color:var(--dim);font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.su-clicks{font-family:'Space Mono',monospace;font-weight:700;color:var(--green);text-align:right}
.su-actions{display:flex;gap:6px;justify-content:flex-end}
.su-actions .btn{padding:5px 10px;font-size:11px;min-height:32px}
/* 파일 보관함 */
.dv-drop{border:2px dashed var(--border2);border-radius:12px;padding:30px 20px;text-align:center;
  cursor:pointer;transition:.15s;background:var(--card2)}
.dv-drop:hover,.dv-drop.over{border-color:var(--accent);background:rgba(37,99,235,.05)}
.dv-drop-ico{font-size:30px;margin-bottom:8px}
.dv-drop-txt{font-size:14px;color:var(--text);font-weight:500}
.dv-drop-sub{font-size:11px;color:var(--dim);margin-top:6px}
.dv-queue{margin-top:12px}
.dv-queue:empty{margin-top:0}
.dv-q-row{display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--card2);
  border-radius:8px;margin-bottom:6px;font-size:12px}
.dv-q-name{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dv-q-state{font-family:'Space Mono',monospace;font-size:11px;white-space:nowrap}
.dv-q-state.up{color:var(--accent)}.dv-q-state.ok{color:var(--green)}.dv-q-state.err{color:var(--red)}
.dv-bar{width:90px;height:5px;background:rgba(37,99,235,.12);border-radius:3px;overflow:hidden;flex-shrink:0}
.dv-bar i{display:block;height:100%;width:0;background:var(--accent);transition:width .2s}
.dv-cat-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}
.dv-cat{padding:5px 12px;min-height:32px;font-size:12px;border-radius:20px;border:1px solid var(--border);
  background:var(--card);color:var(--muted);cursor:pointer;font-family:inherit}
.dv-cat:hover{color:var(--text)}
.dv-cat.active{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:600}
.dv-file{display:flex;align-items:center;gap:9px;min-width:0}
.dv-file-ico{font-size:19px;flex-shrink:0}
.dv-file-name{display:block;font-weight:600;font-size:13px;max-width:280px;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.dv-file-sub{font-size:11px;color:var(--dim);font-family:'Space Mono',monospace}
.dv-tag{display:inline-block;font-size:11px;padding:2px 9px;border-radius:20px;
  background:rgba(37,99,235,.08);color:var(--accent);white-space:nowrap}
.su-qr-wrap{display:grid;grid-template-columns:1fr 300px;gap:20px;align-items:start}
.su-qr-box{background:var(--card2);border:1px solid var(--border);border-radius:10px;padding:16px;
           min-height:220px;display:flex;align-items:center;justify-content:center}
@media(max-width:768px){
  .ac-form-grid{grid-template-columns:1fr}
  .ac-api-url{max-width:180px}
  .su-form-grid{grid-template-columns:1fr}
  .su-qr-wrap{grid-template-columns:1fr}
}
</style>
</head>
<body>

<div class="modal">
  <div class="modal-box">
    <div class="modal-title">MFG ADMIN</div>
    <div class="modal-sub">관리자 비밀번호를 입력하세요</div>
    <label class="lbl">비밀번호</label>
    <input type="password" id="admin-pw" class="inp" placeholder="password" onkeydown="if(event.key==='Enter')doLogin()" style="margin-bottom:10px">
    <div class="err-txt" id="login-err" style="margin-bottom:14px"></div>
    <button class="btn btn-accent" style="width:100%;padding:12px" onclick="doLogin()">로그인</button>
  </div>
</div>

<!-- ── TOP NAV ── -->
<nav class="nav">
  <div class="nav-inner">
    <div class="nav-logo">DATA<em>FORGE</em><span class="nav-logo-sep"></span><span class="nav-logo-sub">관리자</span></div>
    <!-- 데스크톱: 그룹 드롭다운 (NAV_GROUPS 설정으로 자동 생성) -->
    <div class="nav-tabs" id="nav-tabs"></div>
    <!-- 모바일: optgroup 셀렉트 -->
    <select class="nav-select-mobile" id="nav-select" onchange="switchTab(this.value)"></select>
    <div class="nav-right">
      <button class="nav-search" onclick="cmdkOpen()" title="메뉴 빠른 이동 (Ctrl+K)">
        <span>🔍 메뉴 검색</span><kbd class="nav-kbd">Ctrl K</kbd>
      </button>
      <span class="nav-badge">Admin</span>
          </div>
  </div>
</nav>

<!-- 메뉴 빠른 이동 팔레트 (Ctrl+K) -->
<div class="cmdk-back" id="cmdk" onclick="if(event.target===this)cmdkClose()">
  <div class="cmdk">
    <input class="cmdk-inp" id="cmdk-inp" placeholder="메뉴 검색... (↑↓ 이동, Enter 선택, Esc 닫기)" autocomplete="off">
    <div class="cmdk-list" id="cmdk-list"></div>
  </div>
</div>

<div class="content">

<!-- ══════════════════════════════════════════
     TAB 1 : 스트리밍 제어
══════════════════════════════════════════ -->
<div id="tab-stream" class="tab-panel active">

  <!-- 상태 헤더 -->
  <div class="stream-status-bar" style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
    <div id="adm-pulse" class="pulse off"></div>
    <span id="adm-status-text" style="font-size:14px;font-weight:700;color:var(--dim);font-family:'Space Mono',monospace">STOPPED</span>
    <span id="adm-msg-count" style="font-size:12px;color:var(--green);font-family:'Space Mono',monospace">0 msg</span>
    <span id="adm-session-badge" style="display:none;font-size:11px;background:rgba(22,163,74,.08);border:1px solid var(--green);color:var(--green);padding:3px 10px;border-radius:20px;font-family:'Space Mono',monospace">
      이번 세션 <span id="adm-session-count">0</span> msg
    </span>
    <a href="/" target="_blank" style="margin-left:auto;font-size:11px;color:var(--dim);text-decoration:none;border:1px solid var(--border);padding:4px 10px;border-radius:3px">교육생 화면 →</a>
  </div>

  <div class="g2">
    <!-- ── 좌: 스트림 설정 ── -->
    <div class="card">
      <div class="card-head"><span class="card-title">스트림 설정</span></div>
      <div class="card-body g-gap">
        <div>
          <label class="lbl">데이터 유형</label>
          <select id="adm-topic" class="inp" onchange="renderColumnSelector()">
            <option value="sensor">공정 센서</option>
            <option value="alarm">알람/이벤트</option>
            <option value="quality">품질 측정</option>
            <option value="energy">에너지</option>
          </select>
        </div>
        <div>
          <label class="lbl">제조 공정 유형</label>
          <select id="adm-process" class="inp" onchange="renderColumnSelector()">
            <option value="semiconductor">반도체 (온도·압력·가스 Flow)</option>
            <option value="automotive" selected>자동차 부품 (용접·도장·조립)</option>
            <option value="battery">배터리 (전압·전류·온도·SOC)</option>
            <option value="steel">철강 (압연·도금·냉각)</option>
            <option value="pcb">PCB (납땜·세정·검사)</option>
            <optgroup label="☀️ 태양광">
              <option value="solar_module">태양광 모듈 (효율·IV·라미네이션·EL)</option>
              <option value="solar_inverter">인버터 (IGBT·변환효율·THD·절연)</option>
            </optgroup>
            <optgroup label="🍽️ 식품 공정">
              <option value="food_beverage">음료 제조 (살균·충전·냉각)</option>
              <option value="food_baking">제과/제빵 (반죽·오븐·냉각)</option>
              <option value="food_dairy">유제품 (살균·발효·충전)</option>
              <option value="food_meat">육가공 (절단·훈연·급속냉동)</option>
              <option value="food_retort">레토르트/통조림 (가압살균·밀봉)</option>
            </optgroup>
          </select>
        </div>
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <label class="lbl" style="margin:0">스트리밍 컬럼 선택</label>
            <span id="col-count-badge" style="font-size:11px;color:var(--accent);font-family:'Space Mono',monospace"></span>
          </div>
          <div id="col-selector" class="col-grid"></div>
        </div>
      </div>
    </div>

    <!-- ── 우: 이상 상황 제어 ── -->
    <div class="card">
      <div class="card-head"><span class="card-title">이상 상황 제어</span></div>
      <div class="card-body">

        <!-- 시나리오 프리셋 -->
        <div style="font-size:11px;color:var(--dim);margin-bottom:8px;letter-spacing:.5px;text-transform:uppercase">시나리오 프리셋</div>
        <div class="scenario-btns">
          <div class="scenario-btn s-normal active" onclick="admApplyScenario('normal')">정상 운영</div>
          <div class="scenario-btn s-crisis"       onclick="admApplyScenario('crisis')">위기 상황</div>
          <div class="scenario-btn s-degradation"  onclick="admApplyScenario('degradation')">설비 노화</div>
          <div class="scenario-btn s-maintenance"  onclick="admApplyScenario('maintenance')">점검 중</div>
        </div>

        <!-- 슬라이더 3열 -->
        <div class="slider-row col3">
                    <div class="slider-item">
            <label>
              알람률 (%)
              <span id="adm-alarm-rate-val" style="color:#ff4444">3%</span>
            </label>
            <input type="range" id="adm-alarm-rate-range" min="0" max="100" value="3"
                   style="width:100%;accent-color:#ff4444"
                   oninput="syncSlider('alarm-rate',this.value)">
            <input type="hidden" id="adm-alarm-rate" value="3">
          </div>
                    <div class="slider-item">
            <label>
              경고율 (%)
              <span id="adm-warning-rate-val" style="color:#ffaa00">5%</span>
            </label>
            <input type="range" id="adm-warning-rate-range" min="0" max="100" value="5"
                   style="width:100%;accent-color:#ffaa00"
                   oninput="syncSlider('warning-rate',this.value)">
            <input type="hidden" id="adm-warning-rate" value="5">
          </div>
                    <div class="slider-item">
            <label>
              불량률 (%)
              <span id="adm-defect-rate-val" style="color:#ff6b35">3%</span>
            </label>
            <input type="range" id="adm-defect-rate-range" min="0" max="100" value="3"
                   style="width:100%;accent-color:#ff6b35"
                   oninput="syncSlider('defect-rate',this.value)">
            <input type="hidden" id="adm-defect-rate" value="3">
          </div>
                  </div>

        <!-- 슬라이더 2열 -->
        <div class="slider-row col2">
                    <div class="slider-item">
            <label>
              스파이크 (%)
              <span id="adm-spike-rate-val" style="color:#00d4ff">0%</span>
            </label>
            <input type="range" id="adm-spike-rate-range" min="0" max="100" value="0"
                   style="width:100%;accent-color:#00d4ff"
                   oninput="syncSlider('spike-rate',this.value)">
            <input type="hidden" id="adm-spike-rate" value="0">
          </div>
                    <div class="slider-item">
            <label>
              데이터 누락 (%)
              <span id="adm-missing-rate-val" style="color:#556070">0%</span>
            </label>
            <input type="range" id="adm-missing-rate-range" min="0" max="100" value="0"
                   style="width:100%;accent-color:#556070"
                   oninput="syncSlider('missing-rate',this.value)">
            <input type="hidden" id="adm-missing-rate" value="0">
          </div>
                  </div>

        <!-- 요약 -->
        <div class="anomaly-summary" id="anomaly-summary"></div>

        <!-- 분석 난이도 -->
        <div style="font-size:11px;color:var(--dim);margin-bottom:8px;letter-spacing:.5px;text-transform:uppercase">분석 난이도 (ML DIFFICULTY)</div>
        <input type="hidden" id="adm-difficulty" value="easy">
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px">
          <div class="diff-card active" data-diff="easy" onclick="setDifficulty('easy')" style="--dc:#39ff14"><div class="diff-name">Easy</div></div>
          <div class="diff-card" data-diff="medium" onclick="setDifficulty('medium')" style="--dc:#00d4ff"><div class="diff-name">Medium</div></div>
          <div class="diff-card" data-diff="hard" onclick="setDifficulty('hard')" style="--dc:#ffaa00"><div class="diff-name">Hard</div></div>
          <div class="diff-card" data-diff="expert" onclick="setDifficulty('expert')" style="--dc:#ff4444"><div class="diff-name">Expert</div></div>
        </div>
        <div id="diff-hint" style="padding:7px 10px;background:var(--bg);border-left:2px solid var(--green);border-radius:0 3px 3px 0;font-size:11px;color:var(--dim);line-height:1.6;margin-bottom:16px"></div>

        <!-- 속도 / 개수 -->
        <div class="rate-grid" style="display:grid;grid-template-columns:1fr 1fr auto;gap:10px;align-items:end;margin-bottom:12px">
          <div>
            <label class="lbl">생성 속도 (메시지/초)</label>
            <input type="number" id="adm-rate" class="inp" value="5" min="0.1" max="50" step="0.1">
          </div>
          <div>
            <label class="lbl">메시지 수</label>
            <input type="number" id="adm-count" class="inp" value="500" min="10">
          </div>
          <div class="rate-infinite" style="padding-bottom:2px;display:flex;align-items:center;gap:6px">
            <input type="checkbox" id="adm-infinite" checked style="accent-color:var(--accent)">
            <label for="adm-infinite" style="font-size:12px;cursor:pointer;white-space:nowrap">무한</label>
          </div>
        </div>

        <!-- DB 저장 + 시작/정지 -->
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <input type="checkbox" id="adm-db-save" checked style="accent-color:var(--green)">
          <label for="adm-db-save" style="font-size:12px;cursor:pointer;flex:1">MySQL DB 저장</label>
          <span id="adm-db-status" style="font-size:11px;font-family:'Space Mono',monospace;color:var(--dim)">대기</span>
        </div>
        <div class="row">
          <button id="adm-btn-start" class="btn btn-green" onclick="admStartStream()" style="flex:1;padding:12px;font-size:13px">▶ 시작</button>
          <button id="adm-btn-stop"  class="btn btn-danger" onclick="admStopStream()" disabled style="flex:1;padding:12px;font-size:13px">■ 중지</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 데이터 현황 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">DB 데이터 현황</span>
      <button onclick="admLoadStats()" class="btn btn-ghost" style="padding:4px 12px;font-size:11px">↻ 새로고침</button>
    </div>
    <div class="card-body">
      <div class="ds-grid">
        <div class="ds-box" id="ds-box-sensor">
          <div class="ds-num" id="ds-sensor">—</div>
          <div class="ds-lbl">공정 센서</div>
          <div class="ds-sub" id="ds-sensor-pct"></div>
        </div>
        <div class="ds-box" id="ds-box-alarm">
          <div class="ds-num" id="ds-alarm">—</div>
          <div class="ds-lbl">알람/이벤트</div>
          <div class="ds-sub" id="ds-alarm-pct"></div>
        </div>
        <div class="ds-box" id="ds-box-quality">
          <div class="ds-num" id="ds-quality">—</div>
          <div class="ds-lbl">품질 측정</div>
          <div class="ds-sub" id="ds-quality-pct"></div>
        </div>
        <div class="ds-box" id="ds-box-energy">
          <div class="ds-num" id="ds-energy">—</div>
          <div class="ds-lbl">에너지</div>
          <div class="ds-sub" id="ds-energy-pct"></div>
        </div>
      </div>
      <div class="ds-total-bar">
        <span style="color:var(--dim)">총 DB 행 수</span>
        <span id="ds-total" style="font-family:'Space Mono',monospace;color:var(--accent);font-weight:700">—</span>
      </div>

      <!-- 비율 바 -->
      <div style="height:6px;border-radius:3px;overflow:hidden;background:var(--border);display:flex;margin-bottom:6px" id="ds-bar"></div>
      <div id="ds-bar-legend" style="display:flex;gap:14px;flex-wrap:wrap;font-size:10px;color:var(--dim)"></div>
    </div>
  </div>

  <!-- 실시간 로그 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">실시간 스트림 로그</span>
      <span id="adm-log-count" style="font-family:'Space Mono',monospace;font-size:11px;color:var(--green)"></span>
    </div>
    <div class="card-body" style="padding:12px">
      <div id="adm-stream-log" class="stream-log">
        <span style="color:var(--dim)">// ▶ 스트림 시작 버튼을 눌러 시작하세요...</span>
      </div>
    </div>
  </div>

</div>

<!-- ══════════════════════════════════════════
     TAB 2 : 교육 세션 관리
══════════════════════════════════════════ -->
<div id="tab-sessions" class="tab-panel">

<!-- ── 뷰 1: 세션 목록 ── -->
<div id="sess-list-view">

  <div class="g2" style="align-items:start">
    <!-- 세션 생성 -->
    <div class="card">
      <div class="card-head"><span class="card-title">새 교육 세션 생성</span></div>
      <div class="card-body g-gap">
        <div>
          <label class="lbl">교육명</label>
          <input type="text" id="s-name" class="inp" placeholder="예: 2025 스마트팩토리 1기">
        </div>
        <div class="g3">
          <div>
            <label class="lbl">시작일</label>
            <input type="date" id="s-start" class="inp">
          </div>
          <div>
            <label class="lbl">종료일</label>
            <input type="date" id="s-end" class="inp">
          </div>
          <div>
            <label class="lbl">인원 수</label>
            <input type="number" id="s-headcount" class="inp" value="20" min="1" max="500">
          </div>
        </div>
        <div class="err-txt" id="create-err"></div>
        <button class="btn btn-accent" onclick="createSession()" style="width:100%;padding:11px">+ 세션 생성</button>
      </div>
    </div>

    <!-- 안내 -->
    <div class="card">
      <div class="card-head"><span class="card-title">교육 코드 안내</span></div>
      <div class="card-body">
        <div style="display:grid;gap:12px;font-size:12px;color:var(--dim);line-height:1.8">
          <div style="padding:12px;background:var(--bg);border-radius:4px;border:1px solid var(--border)">
            <div style="font-family:'Space Mono',monospace;font-size:15px;color:var(--accent);letter-spacing:3px;margin-bottom:6px">EDU-XXXX-XXXX</div>
            세션 생성 시 자동 발급되는 8자리 교육 코드입니다.
          </div>
          <div>📋 교육생은 메인 페이지 상단 <strong style="color:var(--text)">교육 코드 입력</strong> 버튼으로 코드를 입력합니다.</div>
          <div>📅 종료일이 지난 코드는 자동으로 사용 불가합니다.</div>
          <div>👥 인원 수는 참고용이며 실제 접속 제한에는 사용되지 않습니다.</div>
        </div>
      </div>
    </div>
  </div>

  <!-- 세션 목록 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">교육 세션 목록</span>
      <button onclick="loadSessions()" class="btn btn-ghost" style="padding:4px 12px;font-size:11px">↻ 새로고침</button>
    </div>
    <div class="card-body">
      <div id="session-list"><div class="empty">불러오는 중...</div></div>
      <div class="hint" id="session-hint" style="display:none">
        💡 교육생들은 메인 페이지 상단의 <strong style="color:var(--accent)">교육 코드 입력</strong> 버튼을 클릭해 코드를 입력하면 전체 기능이 해제됩니다.
      </div>
    </div>
  </div>

</div><!-- /#sess-list-view -->

<!-- ── 뷰 2: 교육 과정 편집 (인라인) ── -->
<div id="sess-curric-view" style="display:none">

  <!-- 헤더 -->
  <div class="curric-inline-hd">
    <button class="btn btn-ghost" style="padding:6px 14px;font-size:12px;flex-shrink:0" onclick="closeCurriculum()">← 목록으로</button>
    <div class="curric-inline-hd-center">
      <span style="font-size:16px">📋</span>
      <span id="curric-sess-title" style="font-size:15px;font-weight:700;color:var(--text)"></span>
    </div>
    <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
      <span class="curric-save-msg" id="curric-save-msg"></span>
      <button class="btn btn-ghost" id="curric-sync-btn" onclick="syncCoursesFromFiles()" style="padding:7px 16px"
        title="과정 관리에서 수정한 최신 내용을 이 커리큘럼에 다시 불러옵니다 (정답 공개 설정은 유지)">🔄 과정 최신화</button>
      <button class="btn btn-accent" id="curric-save-btn" onclick="saveCurriculum()" style="padding:7px 20px">💾 저장</button>
    </div>
  </div>

  <!-- 에디터 바디 -->
  <div class="curric-inline-body">

    <!-- 라이브러리 선택 오버레이 -->
    <div class="lib-picker-wrap" id="lib-picker">
      <div class="lib-picker-hd">
        <span style="font-size:18px">📚</span>
        <span class="lib-picker-title">라이브러리에서 추가</span>
        <button class="btn btn-ghost" style="padding:4px 12px;font-size:12px" onclick="closeLibPicker()">✕ 닫기</button>
      </div>
      <div class="lib-picker-body" id="lib-picker-body">
        <div class="lib-picker-empty">불러오는 중...</div>
      </div>
    </div>

    <!-- 모듈 목록 패널 -->
    <div class="curric-list-panel">
      <div class="curric-list" id="curric-list"></div>
      <div class="curric-add-btn" onclick="addModule()">+ 모듈 추가</div>
      <div class="curric-add-btn" onclick="openLibPicker()" style="border-color:rgba(99,102,241,.3);color:#6366f1;background:rgba(99,102,241,.06)">📚 라이브러리에서 추가</div>
    </div>

    <!-- 모듈 편집 폼 -->
    <div class="curric-form-panel" id="curric-form-panel"></div>

  </div><!-- /.curric-inline-body -->
</div><!-- /#sess-curric-view -->

</div><!-- /#tab-sessions -->

<!-- ══════════════════════════════════════════
     TAB : 교육 컨텐츠 라이브러리
══════════════════════════════════════════ -->
<!-- ════════════════════════════════
     TAB : 과정 관리 (1 JSON = 1 과정)
════════════════════════════════ -->
<div id="tab-courses" class="tab-panel">
  <div class="card" style="margin-bottom:14px">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;flex-wrap:wrap">
      <div style="flex:1;min-width:240px">
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:6px">📦 과정 파일 관리</div>
        <div style="font-size:12px;color:var(--muted);line-height:1.7">
          JSON 파일 1개 = 과정 1개로 독립 관리됩니다. 같은 과정명으로 다시 업로드하면
          <strong>그 과정만 교체</strong>되고 다른 과정은 영향받지 않습니다.<br>
          커리큘럼 편집기의 <strong style="color:#6366f1">📚 라이브러리에서 추가</strong>에 과정별로 표시됩니다.
        </div>
      </div>
      <label class="btn btn-accent" style="padding:9px 18px;cursor:pointer;white-space:nowrap">
        ⬆ 과정 업로드 (JSON)<input type="file" accept=".json" style="display:none" onchange="crsUpload(this)">
      </label>
    </div>
  </div>

  <!-- 뷰 1: 과정 목록 -->
  <div id="crs-list-view">
    <div id="crs-list"><div class="empty">불러오는 중...</div></div>
  </div>

  <!-- 뷰 2: 과정 내용 편집 (인라인) -->
  <div id="crs-edit-view" style="display:none">
    <div class="curric-inline-hd">
      <button class="btn btn-ghost" style="padding:6px 14px;font-size:12px;flex-shrink:0" onclick="crsCloseEditor()">← 목록으로</button>
      <div class="curric-inline-hd-center">
        <span style="font-size:16px">📦</span>
        <input class="curric-inp" id="crs-edit-name" style="max-width:340px;font-weight:700;text-align:center"
               placeholder="과정명" oninput="document.getElementById('crs-save-msg').textContent=''">
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
        <span class="curric-save-msg" id="crs-save-msg"></span>
        <button class="btn btn-accent" id="crs-save-btn" onclick="saveCourse()" style="padding:7px 20px">💾 저장</button>
      </div>
    </div>
    <div class="curric-inline-body">
      <div class="curric-list-panel">
        <div class="curric-list" id="crs-mod-list"></div>
        <div class="curric-add-btn" onclick="addModule()">+ 단계 추가</div>
      </div>
      <div class="curric-form-panel" id="crs-form-panel"></div>
    </div>
    <div style="font-size:11px;color:var(--muted);margin-top:10px;line-height:1.7">
      💡 여기서 저장하면 <strong>과정 파일이 갱신</strong>됩니다. 이미 교육 세션 커리큘럼에 추가된 과정에는 자동 반영되지 않으므로,
      해당 세션에서 과정을 제거하고 다시 추가해야 최신 내용이 교육생에게 보입니다.
    </div>
  </div>
</div>

<div id="tab-content" class="tab-panel">

  <!-- 사용 방법 -->
  <div class="card" style="margin-bottom:16px">
    <div class="card-head"><span class="card-title">사용 방법</span></div>
    <div class="card-body">
      <div style="display:grid;gap:14px;font-size:12px;color:var(--dim);line-height:1.8">
        <div style="padding:12px;background:var(--bg);border-radius:4px;border:1px solid var(--border)">
          <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:6px">📚 컨텐츠 라이브러리란?</div>
          재사용 가능한 교육 컨텐츠를 미리 작성해두는 공간입니다. 세션마다 처음부터 작성할 필요 없이 라이브러리에서 가져와 빠르게 구성할 수 있습니다.
        </div>
        <div>① 아래 폼에서 컨텐츠를 작성하고 저장합니다.</div>
        <div>② <strong style="color:var(--text)">🎓 교육 세션 관리</strong> → 세션의 <strong style="color:var(--text)">📋 교육 과정</strong> 버튼을 클릭합니다.</div>
        <div>③ 교육 과정 편집기에서 <strong style="color:#6366f1">📚 라이브러리에서 추가</strong>를 클릭해 컨텐츠를 선택합니다.</div>
        <div>④ 선택한 컨텐츠는 해당 세션에 <strong style="color:var(--text)">독립 복사본</strong>으로 추가되어 자유롭게 편집할 수 있습니다.</div>
        <div style="padding:10px;background:rgba(99,102,241,.06);border:1px solid rgba(99,102,241,.2);border-radius:4px;color:#6366f1">
          ✏️ 목록에서 컨텐츠를 클릭하면 수정할 수 있습니다.
        </div>
      </div>
    </div>
  </div>

  <!-- 컨텐츠 추가/수정 폼 -->
  <div class="card" style="margin-bottom:16px">
    <div class="card-head">
      <span class="card-title" id="cl-form-title">새 컨텐츠 추가</span>
        <span id="cl-edit-badge" style="display:none;font-size:11px;background:rgba(217,119,6,.1);color:var(--warning);border:1px solid var(--warning);padding:2px 8px;border-radius:4px">수정 모드</span>
      </div>
      <div class="card-body g-gap">
        <!-- AI 생성 -->
        <div style="background:rgba(99,102,241,.06);border:1.5px solid rgba(99,102,241,.25);border-radius:6px;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#818cf8;margin-bottom:10px">🤖 AI 생성 <span style="font-size:9px;font-weight:400;text-transform:none;letter-spacing:0;color:var(--dim)">qwen2.5-coder:32b · mfg.flex-link.co.kr</span></div>
          <div style="display:flex;gap:8px;align-items:center">
            <input id="cl-ai-topic" class="inp" placeholder="주제 입력 예) 판다스 결측치 처리, SQL JOIN 개념" style="flex:1">
            <button type="button" class="btn btn-accent" style="font-size:12px;padding:7px 16px;white-space:nowrap;flex-shrink:0" onclick="clAiGenerate()">✨ 생성</button>
          </div>
          <div id="cl-ai-status" style="font-size:11px;color:var(--dim);margin-top:8px;display:none"></div>
        </div>

        <input type="hidden" id="cl-id" value="">
        <div style="display:grid;grid-template-columns:70px 1fr;gap:10px">
          <div>
            <label class="lbl">아이콘</label>
            <input id="cl-icon" class="inp" placeholder="📄" maxlength="4" style="text-align:center;font-size:20px">
          </div>
          <div>
            <label class="lbl">제목 <span style="color:var(--danger)">*</span></label>
            <input id="cl-title" class="inp" placeholder="예: 데이터 전처리 개요">
          </div>
        </div>
        <div>
          <label class="lbl">한 줄 설명</label>
          <input id="cl-desc" class="inp" placeholder="사이드바에 표시될 짧은 설명">
        </div>
        <div>
          <label class="lbl">카테고리</label>
          <input id="cl-category" class="inp" placeholder="예: 데이터 전처리, SQL, 시각화" list="cl-cat-datalist" autocomplete="off">
          <datalist id="cl-cat-datalist"></datalist>
        </div>

        <!-- 1. 문제 -->
        <div style="background:rgba(2,132,199,.04);border:1.5px solid rgba(2,132,199,.2);border-radius:6px;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);margin-bottom:10px">🎯 문제</div>
          <textarea id="cl-problem" class="inp" rows="3" style="resize:vertical;line-height:1.7" placeholder="교육생에게 제시할 문제나 과제를 작성하세요..."></textarea>
        </div>

        <!-- 1-1. 정답 -->
        <div style="background:rgba(16,185,129,.04);border:1.5px solid rgba(16,185,129,.22);border-radius:6px;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#10b981;margin-bottom:10px">✅ 정답</div>
          <textarea id="cl-answer" class="inp" rows="4" style="resize:vertical;line-height:1.7" placeholder="정답 또는 해설을 입력하세요..."></textarea>
        </div>

        <!-- 2. 교육 내용 -->
        <div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-bottom:10px">📖 교육 내용 <span style="font-size:9px;font-weight:400;text-transform:none;letter-spacing:0">빈 줄로 단락 구분</span></div>
          <textarea id="cl-content" class="inp" rows="5" style="resize:vertical;line-height:1.7" placeholder="교육 내용을 자유롭게 작성하세요..."></textarea>
          <div class="pdf-attach-area" style="margin-top:10px">
            <input type="file" id="cl-pdf-input" accept=".pdf" style="display:none" onchange="clUploadPdf(this)">
            <div class="pdf-preview" id="cl-pdf-preview" style="display:none">
              <span>📄</span>
              <span class="pdf-preview-name" id="cl-pdf-name"></span>
              <button class="pdf-remove-btn" onclick="clRemovePdf()" title="PDF 제거">✕</button>
            </div>
            <input type="hidden" id="cl-pdf-url" value="">
            <input type="hidden" id="cl-pdf-orig-name" value="">
            <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px;white-space:nowrap;flex-shrink:0"
              onclick="document.getElementById('cl-pdf-input').click()">📎 PDF 첨부</button>
            <span class="pdf-uploading" id="cl-pdf-uploading" style="display:none">업로드 중...</span>
          </div>
        </div>

        <!-- 3. 예제 (복수) -->
        <div style="background:#0f172a;border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:10px">💡 예제</div>
          <div id="cl-examples-list"></div>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button type="button" class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="clAddExample('prompt')">+ 프롬프트 추가</button>
            <button type="button" class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="clAddExample('code')">+ 코드 추가</button>
          </div>
        </div>

        <!-- 4. 첨부파일 -->
        <div style="background:rgba(139,92,246,.04);border:1.5px solid rgba(139,92,246,.18);border-radius:6px;padding:14px 16px">
          <div style="font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#8b5cf6;margin-bottom:10px">📎 첨부파일</div>
          <div id="cl-attach-list"></div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
            <input type="file" id="cl-file-input" multiple style="display:none" onchange="clUploadAttach(this)"
              accept=".pdf,.xls,.xlsx,.ppt,.pptx,.doc,.docx,.csv,.txt,.zip,.png,.jpg,.jpeg,.gif,.webp">
            <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px;white-space:nowrap;flex-shrink:0"
              onclick="document.getElementById('cl-file-input').click()">+ 파일 추가</button>
            <span id="cl-file-uploading" style="display:none;font-size:11px;color:var(--dim)">업로드 중...</span>
          </div>
        </div>

        <div>
          <label class="lbl">실습 도구</label>
          <div class="curric-tools-grid" id="cl-tools-grid"></div>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn btn-accent" onclick="clSave()" style="flex:1">저장</button>
          <button class="btn btn-ghost" onclick="clCancel()" id="cl-cancel-btn" style="display:none">취소</button>
        </div>
        <div class="msg" id="cl-msg"></div>
      </div>
    </div>

  <!-- 컨텐츠 목록 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">컨텐츠 목록 <span id="cl-count" style="font-family:'Space Mono',monospace;font-size:12px;color:var(--dim);font-weight:400"></span></span>
      <div style="display:flex;gap:6px;align-items:center">
        <button onclick="clExport()" class="btn btn-ghost" style="padding:4px 12px;font-size:11px">⬇ 내보내기</button>
        <label class="btn btn-ghost" style="padding:4px 12px;font-size:11px;cursor:pointer;margin:0">
          ⬆ 가져오기<input type="file" accept=".json" style="display:none" onchange="clImport(this)">
        </label>
        <button onclick="clLoadAll()" class="btn btn-ghost" style="padding:4px 12px;font-size:11px">↻ 새로고침</button>
      </div>
    </div>
    <div id="cl-cat-tabs" style="display:flex;gap:6px;flex-wrap:wrap;padding:10px 20px;border-bottom:1px solid var(--border)"></div>
    <div class="card-body" id="cl-list">
      <div class="empty">불러오는 중...</div>
    </div>
  </div>

</div>

<!-- ══════════════════════════════════════════
     TAB 4 : 트래픽 현황
══════════════════════════════════════════ -->
<div id="tab-traffic" class="tab-panel">

  <!-- KPI 카드 -->
  <div class="tf-kpi-grid">
    <div class="tf-kpi">
      <div class="tf-kpi-num" id="tf-today-v" style="color:var(--accent)">—</div>
      <div class="tf-kpi-lbl">오늘 방문수</div>
    </div>
    <div class="tf-kpi">
      <div class="tf-kpi-num" id="tf-today-u" style="color:var(--green)">—</div>
      <div class="tf-kpi-lbl">오늘 순방문자</div>
    </div>
    <div class="tf-kpi">
      <div class="tf-kpi-num" id="tf-week-v" style="color:var(--warning)">—</div>
      <div class="tf-kpi-lbl">최근 7일 방문수</div>
    </div>
    <div class="tf-kpi">
      <div class="tf-kpi-num" id="tf-month-v" style="color:var(--dim)">—</div>
      <div class="tf-kpi-lbl">최근 30일 방문수</div>
    </div>
  </div>

  <!-- 일별 바 차트 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">일별 트래픽 (최근 30일)</span>
      <button onclick="loadTraffic()" class="btn btn-ghost" style="padding:4px 12px;font-size:11px">↻ 새로고침</button>
    </div>
    <div class="card-body">
      <div class="tf-chart-wrap">
        <canvas id="tf-daily-chart"></canvas>
      </div>
    </div>
  </div>

  <!-- 서비스별 현황 -->
  <div class="card">
    <div class="card-head"><span class="card-title">서비스별 방문 현황 (최근 30일)</span></div>
    <div class="card-body">
      <div class="tf-svc-grid" id="tf-svc-grid">
        <div style="color:var(--dim);font-size:12px">불러오는 중...</div>
      </div>
    </div>
  </div>

  <!-- 최근 방문 로그 -->
  <div class="card">
    <div class="card-head"><span class="card-title">최근 방문 로그</span></div>
    <div class="card-body" style="padding:0">
      <div style="overflow-x:auto">
        <table class="tf-recent-table">
          <thead>
            <tr>
              <th>시각</th>
              <th>서비스</th>
              <th>경로</th>
              <th>접속 IP</th>
              <th>구분</th>
            </tr>
          </thead>
          <tbody id="tf-recent-body">
            <tr><td colspan="5" style="text-align:center;color:var(--dim);padding:24px">불러오는 중...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- 설치 안내 -->
  <div class="card">
    <div class="card-head"><span class="card-title" style="color:var(--dim)">트래픽 수집 스크립트</span></div>
    <div class="card-body">
      <div style="font-size:12px;color:var(--dim);margin-bottom:10px">각 서비스 페이지에 아래 스크립트를 추가하면 방문이 자동으로 집계됩니다.</div>
      <pre style="background:var(--bg);border:1px solid var(--border);border-radius:4px;padding:14px;font-size:11px;color:var(--accent);overflow-x:auto;font-family:'Space Mono',monospace;line-height:1.7">&lt;script&gt;
(function(){
  var s='mfg'; // 서비스명: mfg | biz | ads | sim | factory_lab
  var p=location.pathname;
  fetch('/mfg/api/traffic_log.php',{method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:'service='+encodeURIComponent(s)+'&amp;page='+encodeURIComponent(p)
  });
})();
&lt;/script&gt;</pre>
    </div>
  </div>

</div>

<!-- ══════════════════════════════════════════
     TAB — 프롬프트 관리
══════════════════════════════════════════ -->
<div id="tab-prompts" class="tab-panel">

  <!-- 통계 바 -->
  <div class="card" style="margin-bottom:20px">
    <div class="card-head">
      <span class="card-title">프롬프트 현황</span>
      <button onclick="pLoadAll()" class="btn btn-ghost" style="padding:4px 12px;font-size:11px">↻ 새로고침</button>
    </div>
    <div class="card-body">
      <div class="ds-grid" id="p-stat-grid">
        <div class="ds-box"><div class="ds-num" id="p-stat-total">—</div><div class="ds-lbl">전체 프롬프트</div></div>
        <div class="ds-box"><div class="ds-num" id="p-stat-cats">—</div><div class="ds-lbl">카테고리</div></div>
        <div class="ds-box"><div class="ds-num" id="p-stat-featured">—</div><div class="ds-lbl">추천 프롬프트</div></div>
        <div class="ds-box">
          <a href="/builder/prompt_lib" target="_blank" class="btn btn-accent"
             style="text-decoration:none;font-size:11px;padding:7px 14px">공개 페이지 →</a>
          <div class="ds-lbl" style="margin-top:6px">/builder/prompt_lib</div>
        </div>
      </div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

    <!-- ─ 카테고리 관리 ─ -->
    <div>
      <div class="card">
        <div class="card-head"><span class="card-title">카테고리 등록</span></div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          <div>
            <label class="lbl">카테고리명 <span style="color:var(--danger)">*</span></label>
            <input id="pc-name" class="inp" placeholder="예: 이메일 작성">
          </div>
          <div style="display:grid;grid-template-columns:80px 1fr;gap:8px">
            <div>
              <label class="lbl">아이콘</label>
              <input id="pc-icon" class="inp" placeholder="💡" maxlength="4">
            </div>
            <div>
              <label class="lbl">순서 (낮을수록 앞)</label>
              <input id="pc-sort" class="inp" type="number" value="0" min="0">
            </div>
          </div>
          <div>
            <label class="lbl">설명 (선택)</label>
            <input id="pc-desc" class="inp" placeholder="카테고리 간단 설명">
          </div>
          <button class="btn btn-accent" onclick="pAddCategory()" style="width:100%">카테고리 추가</button>
          <div class="msg" id="pc-msg"></div>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><span class="card-title">카테고리 목록</span></div>
        <div class="card-body" id="p-cat-list">
          <div style="color:var(--dim);font-size:12px">불러오는 중...</div>
        </div>
      </div>
    </div>

    <!-- ─ 프롬프트 등록 ─ -->
    <div>
      <div class="card">
        <div class="card-head">
          <span class="card-title">프롬프트 등록</span>
          <span id="p-edit-badge" style="display:none;font-size:11px;background:rgba(217,119,6,.1);color:var(--warning);border:1px solid var(--warning);padding:2px 8px;border-radius:4px">수정 모드</span>
        </div>
        <div class="card-body" style="display:flex;flex-direction:column;gap:10px">
          <input type="hidden" id="pp-id" value="">
          <div>
            <label class="lbl">카테고리 <span style="color:var(--danger)">*</span></label>
            <select id="pp-cat" class="inp">
              <option value="">카테고리 선택</option>
            </select>
          </div>
          <div>
            <label class="lbl">프롬프트 제목 <span style="color:var(--danger)">*</span></label>
            <input id="pp-title" class="inp" placeholder="예: 전문적인 비즈니스 이메일 작성">
          </div>
          <div>
            <label class="lbl">프롬프트 내용 <span style="color:var(--danger)">*</span></label>
            <textarea id="pp-content" class="inp" rows="5"
              placeholder="예: 당신은 비즈니스 커뮤니케이션 전문가입니다. 수신자: {대상}. 목적: {목적}. 어조: 정중하고 간결하게. 분량: 5문장 이내로 제안 이메일을 작성해 주세요."
              style="resize:vertical"></textarea>
          </div>
          <div>
            <label class="lbl">설명 (선택)</label>
            <input id="pp-desc" class="inp" placeholder="이 프롬프트 활용 방법 간단 설명">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <div>
              <label class="lbl">난이도</label>
              <select id="pp-diff" class="inp">
                <option value="easy">기초 (easy)</option>
                <option value="medium" selected>중급 (medium)</option>
                <option value="hard">고급 (hard)</option>
              </select>
            </div>
            <div>
              <label class="lbl">정렬 순서</label>
              <input id="pp-sort" class="inp" type="number" value="0" min="0">
            </div>
          </div>
          <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px">
            <input type="checkbox" id="pp-featured" style="width:16px;height:16px;accent-color:var(--warning)">
            <span style="color:var(--text)">★ <strong style="color:var(--warning)">추천 프롬프트</strong>로 등록</span>
          </label>
          <div style="display:flex;gap:8px">
            <button class="btn btn-accent" onclick="pSavePrompt()" style="flex:1">저장</button>
            <button class="btn btn-ghost" onclick="pCancelEdit()" id="p-cancel-btn" style="display:none">취소</button>
          </div>
          <div class="msg" id="pp-msg"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ─ 전체 프롬프트 목록 ─ -->
  <div class="card" style="margin-top:16px">
    <div class="card-head">
      <span class="card-title">전체 프롬프트 목록</span>
      <select id="p-filter-cat" class="inp" style="width:180px;padding:4px 8px;font-size:12px"
              onchange="renderPromptList()">
        <option value="">전체 카테고리</option>
      </select>
    </div>
    <div class="card-body" id="p-prompt-list">
      <div style="color:var(--dim);font-size:12px">불러오는 중...</div>
    </div>
  </div>

</div>

<!-- ══════════════════════════════════════════
     TAB 3 : DB 관리
══════════════════════════════════════════ -->
<div id="tab-db" class="tab-panel">

  <!-- 테이블 현황 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">테이블 현황</span>
      <button onclick="loadStats()" class="btn btn-ghost" style="padding:4px 12px;font-size:11px">↻ 새로고침</button>
    </div>
    <div class="card-body">
      <div class="db-stat-grid" id="stats-grid">
        <div style="color:var(--dim);font-size:13px">불러오는 중...</div>
      </div>
    </div>
  </div>

  <!-- 테이블 생성 -->
  <div class="card">
    <div class="card-head"><span class="card-title">테이블 초기 생성</span></div>
    <div class="card-body">
      <div style="font-size:12px;color:var(--dim);margin-bottom:14px">
        mfg_sensor, mfg_alarm, mfg_quality, mfg_energy 테이블을 생성합니다.<br>
        이미 존재하는 경우 건너뜁니다 (IF NOT EXISTS).
      </div>
      <button class="btn btn-green" onclick="runSetup()">테이블 생성 실행</button>
      <div class="msg" id="setup-msg"></div>
    </div>
  </div>

  <!-- 데이터 초기화 -->
  <div class="card" style="border-color:rgba(220,38,38,.2)">
    <div class="card-head"><span class="card-title" style="color:var(--danger)">데이터 초기화</span></div>
    <div class="card-body">
      <div style="font-size:12px;color:var(--danger);margin-bottom:16px">⚠ 선택한 테이블의 모든 데이터가 삭제됩니다. 되돌릴 수 없습니다.</div>
      <div class="row">
                <button class="btn btn-danger" onclick="truncateTable('mfg_sensor')" style="font-size:11px;padding:7px 14px">
          공정 센서        </button>
                <button class="btn btn-danger" onclick="truncateTable('mfg_alarm')" style="font-size:11px;padding:7px 14px">
          알람/이벤트        </button>
                <button class="btn btn-danger" onclick="truncateTable('mfg_quality')" style="font-size:11px;padding:7px 14px">
          품질 측정        </button>
                <button class="btn btn-danger" onclick="truncateTable('mfg_energy')" style="font-size:11px;padding:7px 14px">
          에너지        </button>
              </div>
      <div class="msg" id="truncate-msg"></div>
    </div>
  </div>

  <!-- 바로가기 -->
  <div class="card">
    <div class="card-head"><span class="card-title">바로가기</span></div>
    <div class="card-body">
      <div class="row">
        <a href="/mfg/" class="btn btn-accent" style="text-decoration:none">메인 페이지 (교육생)</a>
        <a href="/mfg/api/grafana_queries.php" target="_blank" class="btn btn-ghost" style="text-decoration:none">Grafana 쿼리 예시</a>
      </div>
    </div>
  </div>

</div>

<!-- ══════════════════════════════════════════
     TAB : API 수집기
══════════════════════════════════════════ -->
<div id="tab-apicollect" class="tab-panel">

  <!-- API 목록 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">수집 API 목록</span>
      <button class="btn btn-accent" style="padding:5px 14px;font-size:12px" onclick="acOpenForm(null)">+ API 추가</button>
    </div>
    <div class="card-body" id="ac-api-list"><div style="color:var(--dim);font-size:13px">불러오는 중...</div></div>
  </div>

  <!-- 추가/편집 폼 -->
  <div class="card" id="ac-form-card" style="display:none">
    <div class="card-head">
      <span class="card-title" id="ac-form-title">API 추가</span>
      <button class="btn btn-ghost" style="padding:4px 12px;font-size:11px" onclick="acCloseForm()">✕ 닫기</button>
    </div>
    <div class="card-body">
      <input type="hidden" id="ac-id">
      <div class="ac-form-grid">
        <div class="full">
          <label class="ac-form-label">API 이름 *</label>
          <input class="inp" id="ac-name" placeholder="제주 데이터허브 - 관광객 통계">
        </div>
        <div class="full">
          <label class="ac-form-label">API URL <span style="font-weight:400;color:var(--dim)">(appkey 자리에 {appkey} 입력)</span></label>
          <input class="inp" id="ac-url" placeholder="https://open.jejudatahub.net/api/proxy/1b1ta1a1ba6t6a1ttt3bD6b1tb1t1D3t/{appkey}" style="font-size:12px">
          <div class="ac-form-hint">기본값: 제주 데이터허브 URL로 자동 입력됩니다.</div>
        </div>
        <div>
          <label class="ac-form-label">App Key *</label>
          <input class="inp" id="ac-appkey" placeholder="발급받은 API 키">
        </div>
        <div>
          <label class="ac-form-label">시작일 파라미터명 *</label>
          <input class="inp" id="ac-start-param" placeholder="startDate" value="startDate">
        </div>
        <div>
          <label class="ac-form-label">종료일 파라미터명 *</label>
          <input class="inp" id="ac-end-param" placeholder="endDate" value="endDate">
        </div>
        <div>
          <label class="ac-form-label">날짜 형식 (API 전달값)</label>
          <select class="inp" id="ac-date-format">
            <option value="Y-m-d">YYYY-MM-DD (예: 2025-01-31)</option>
            <option value="Ymd">YYYYMMDD (예: 20250131)</option>
            <option value="Y/m/d">YYYY/MM/DD (예: 2025/01/31)</option>
            <option value="d-m-Y">DD-MM-YYYY (예: 31-01-2025)</option>
            <option value="m/d/Y">MM/DD/YYYY (예: 01/31/2025)</option>
          </select>
          <div class="ac-form-hint">캘린더에서 선택한 날짜를 API에 전달할 때 변환되는 형식</div>
        </div>
        <div>
          <label class="ac-form-label">추가 파라미터</label>
          <input class="inp" id="ac-extra" placeholder="type=json&category=tourism">
          <div class="ac-form-hint">날짜·페이지·size 외 고정 파라미터 (key=value&key2=value2)</div>
        </div>
        <div>
          <label class="ac-form-label">페이지 파라미터명</label>
          <input class="inp" id="ac-page-param" placeholder="number" value="number">
          <div class="ac-form-hint">이 API: <b>number</b> (default=1)</div>
        </div>
        <div>
          <label class="ac-form-label">페이지 크기 파라미터명</label>
          <input class="inp" id="ac-size-param" placeholder="limit" value="limit">
          <div class="ac-form-hint">이 API: <b>limit</b> (default=10, max=100)</div>
        </div>
        <div>
          <label class="ac-form-label">1회 수집 수 (limit 값)</label>
          <input class="inp" type="number" id="ac-page-size" value="100" min="1" max="100">
          <div class="ac-form-hint">최대 100 — 초과 시 API에서 100으로 자동 제한됨</div>
        </div>
        <div>
          <label class="ac-form-label">데이터 배열 키</label>
          <input class="inp" id="ac-data-key" placeholder="data" value="data" oninput="acRefreshResponsePreview()">
          <div class="ac-form-hint">응답 JSON에서 실제 데이터가 담긴 배열의 키 이름</div>
        </div>
        <div>
          <label class="ac-form-label">전체 건수 키</label>
          <input class="inp" id="ac-total-key" placeholder="totCnt" value="totCnt" oninput="acRefreshResponsePreview()">
          <div class="ac-form-hint">이 API: <b>totCnt</b></div>
        </div>
        <div>
          <label class="ac-form-label">다음 페이지 유무 키 (hasMore)</label>
          <input class="inp" id="ac-has-more-key" placeholder="hasMore" value="hasMore" oninput="acRefreshResponsePreview()">
          <div class="ac-form-hint"><b>false</b>이면 즉시 수집 종료 — 없으면 빈 배열·건수 미달로 판단</div>
        </div>
        <!-- 응답 구조 미리보기 -->
        <div class="full">
          <label class="ac-form-label">응답 JSON 구조 예시</label>
          <div style="background:#0f172a;border-radius:8px;padding:12px 14px;font-family:'Space Mono',monospace;font-size:11px;line-height:1.8;color:#94a3b8;position:relative">
            <pre id="ac-response-preview" style="margin:0;white-space:pre-wrap;word-break:break-all"></pre>
          </div>
          <div class="ac-form-hint" style="margin-top:6px">
            📌 <b>종료 조건:</b>
            ① <code style="background:rgba(0,0,0,.07);padding:1px 4px;border-radius:3px">totalCount</code> 키로 전체 건수 파악 후 누적 건수 도달 시 종료
            &nbsp;② 응답 배열이 비어 있으면 종료
            &nbsp;③ 응답 건수 &lt; limit이면 마지막 페이지로 판단해 종료
          </div>
        </div>
      </div>
      <div style="margin-top:16px;display:flex;gap:8px">
        <button class="btn btn-accent" onclick="acSaveConfig()">저장</button>
        <button class="btn btn-ghost" onclick="acCloseForm()">취소</button>
      </div>
      <div class="msg" id="ac-form-msg"></div>
    </div>
  </div>

  <!-- 수집 실행 -->
  <div class="card" id="ac-run-card" style="display:none">
    <div class="card-head">
      <span class="card-title">데이터 수집 실행</span>
    </div>
    <div class="card-body">
      <div style="font-size:13px;font-weight:600;margin-bottom:12px">
        선택된 API: <span id="ac-run-name" style="color:var(--accent)">—</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">
        <div>
          <label class="ac-form-label" id="ac-run-start-lbl">시작일 (startDate) *</label>
          <input class="inp" type="date" id="ac-start-date">
        </div>
        <div>
          <label class="ac-form-label" id="ac-run-end-lbl">종료일 (endDate) *</label>
          <input class="inp" type="date" id="ac-end-date">
        </div>
      </div>
      <!-- 요청 URL 미리보기 -->
      <div style="background:var(--card2);border-radius:8px;padding:12px 14px;margin-bottom:14px;font-size:12px">
        <div style="font-size:11px;font-weight:700;color:var(--muted);margin-bottom:6px;letter-spacing:.3px">요청 URL 미리보기 (1페이지)</div>
        <div id="ac-url-preview" style="font-family:'Space Mono',monospace;color:var(--accent);word-break:break-all;line-height:1.6">—</div>
        <div style="margin-top:8px;color:var(--dim);font-size:11px;line-height:1.7">
          <b>반복 호출:</b> 응답에서 <code id="ac-preview-data-key" style="background:rgba(0,0,0,.06);padding:1px 4px;border-radius:3px">data</code> 배열이 빌 때까지 page를 1씩 증가하며 호출<br>
          <b>종료 조건:</b> 빈 배열 반환 · 응답의 <code id="ac-preview-total-key" style="background:rgba(0,0,0,.06);padding:1px 4px;border-radius:3px">totalCount</code> 도달 · 최대 200페이지
        </div>
      </div>

      <button class="btn btn-green" id="ac-run-btn" onclick="acRunCollect()">▶ 수집 시작</button>
      <button class="btn btn-ghost" onclick="document.getElementById('ac-run-card').style.display='none'">닫기</button>

      <div class="ac-progress" id="ac-progress">
        <div id="ac-progress-text" style="font-weight:600"></div>
        <div class="ac-progress-bar-wrap"><div class="ac-progress-bar" id="ac-progress-bar"></div></div>
        <div id="ac-progress-detail" style="font-size:12px;color:var(--muted)"></div>
      </div>
    </div>
  </div>

  <!-- 수집 이력 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">수집 이력</span>
      <button class="btn btn-ghost" style="padding:4px 12px;font-size:11px" onclick="acLoadHistory()">↻ 새로고침</button>
    </div>
    <div class="card-body" id="ac-history"><div style="color:var(--dim);font-size:13px">불러오는 중...</div></div>
  </div>

</div>

<!-- ══════════════════════════════════════════
     TAB 8 : 파일 보관함 (웹하드)
══════════════════════════════════════════ -->
<div id="tab-drive" class="tab-panel">

  <!-- 업로드 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">강의자료 업로드</span>
      <span style="font-size:11px;color:var(--dim)">최대 80MB · PDF, PPT, Word, Excel, HWP, ZIP, 이미지, 영상 등</span>
    </div>
    <div class="card-body">
      <div class="dv-drop" id="dv-drop" onclick="document.getElementById('dv-input').click()">
        <input type="file" id="dv-input" multiple style="display:none" onchange="dvPick(this.files)">
        <div class="dv-drop-ico">📁</div>
        <div class="dv-drop-txt">파일을 여기로 끌어다 놓거나 <b>클릭해서 선택</b></div>
        <div class="dv-drop-sub">여러 개를 한 번에 올릴 수 있습니다 · 업로드하면 짧은 링크가 자동 생성됩니다</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:14px">
        <div>
          <label class="ac-form-label">카테고리 <span style="font-weight:400;color:var(--dim)">(선택)</span></label>
          <input class="inp" id="dv-category" list="dv-cats" placeholder="예: 7월 파이썬 기초" maxlength="40">
          <datalist id="dv-cats"></datalist>
          <div class="ac-form-hint">같은 카테고리끼리 묶어 자료실 링크 하나로 공유할 수 있습니다</div>
        </div>
        <div>
          <label class="ac-form-label">메모 <span style="font-weight:400;color:var(--dim)">(선택)</span></label>
          <input class="inp" id="dv-memo" placeholder="1일차 실습 자료" maxlength="100">
        </div>
      </div>
      <div class="dv-queue" id="dv-queue"></div>
      <div class="msg" id="dv-msg"></div>
    </div>
  </div>

  <!-- 파일 목록 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">보관 파일 <span id="dv-count" style="color:var(--dim);font-weight:400"></span></span>
      <div style="display:flex;gap:6px;align-items:center">
        <button class="btn btn-accent" id="dv-catlink-btn" style="padding:4px 12px;font-size:11px;display:none"
                onclick="dvCatLink()">🔗 이 카테고리 자료실 링크</button>
        <button class="btn btn-ghost" style="padding:4px 12px;font-size:11px" onclick="dvLoadAll()">↻ 새로고침</button>
      </div>
    </div>
    <div class="card-body">
      <div class="dv-cat-tabs" id="dv-cat-tabs"></div>
      <div style="overflow-x:auto">
        <table class="su-table">
          <thead>
            <tr>
              <th>파일</th><th>카테고리</th><th>짧은 링크</th>
              <th style="text-align:right">다운로드</th><th style="text-align:right">관리</th>
            </tr>
          </thead>
          <tbody id="dv-list">
            <tr><td colspan="5" style="color:var(--dim);font-size:13px">불러오는 중...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</div>

<!-- ══════════════════════════════════════════
     TAB 9 : 짧은 주소 · QR 생성기
══════════════════════════════════════════ -->
<div id="tab-feedback" class="tab-panel">
  <div class="card">
    <div class="card-head">
      <span class="card-title">개선 의견 <span id="fb-count" style="font-weight:400;color:var(--dim)"></span></span>
      <span style="font-size:11px;color:var(--dim)">모든 도구 페이지의 <b style="color:var(--accent)">💡 의견</b> 버튼으로 수집 — 보낸 페이지가 자동 기록됩니다</span>
    </div>
    <div class="card-body">
      <div class="msg" id="fb-msg" style="display:none"></div>
      <div style="overflow-x:auto">
        <table class="su-table">
          <thead><tr><th style="width:60px">상태</th><th style="width:150px">페이지</th><th>의견</th><th style="width:140px">연락처</th><th style="width:90px">날짜</th><th style="width:150px">관리</th></tr></thead>
          <tbody id="fb-list"><tr><td colspan="6" style="color:var(--dim);font-size:13px">불러오는 중…</td></tr></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div id="tab-reviews" class="tab-panel">
  <div class="card">
    <div class="card-head">
      <span class="card-title">교육 후기 <span id="rv-count" style="font-weight:400;color:var(--dim)"></span></span>
      <span style="font-size:11px;color:var(--dim)">허브 첫 화면 티커에는 <b style="color:var(--accent)">게시</b> 상태만 노출됩니다</span>
    </div>
    <div class="card-body">
      <div class="msg" id="rv-msg" style="display:none"></div>
      <div style="overflow-x:auto">
        <table class="su-table">
          <thead><tr><th style="width:70px">상태</th><th style="width:140px">이름 · 소속</th><th>후기</th><th style="width:90px">작성일</th><th style="width:150px">관리</th></tr></thead>
          <tbody id="rv-list"><tr><td colspan="5" style="color:var(--dim);font-size:13px">불러오는 중…</td></tr></tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<div id="tab-shorturl" class="tab-panel">

  <!-- 짧은 주소 만들기 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">짧은 주소 만들기</span>
      <span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--dim)">dataforge.ai.kr/<b style="color:var(--accent)">코드</b></span>
    </div>
    <div class="card-body">
      <div class="su-form-grid">
        <div class="full">
          <label class="ac-form-label">원본 URL *</label>
          <input class="inp" id="su-url" placeholder="https://dataforge.ai.kr/lms" onkeydown="if(event.key==='Enter')suSave()">
        </div>
        <div>
          <label class="ac-form-label">코드 <span style="font-weight:400;color:var(--dim)">(선택)</span></label>
          <input class="inp" id="su-code" placeholder="비워두면 자동 생성 (4자)" maxlength="16">
          <div class="ac-form-hint">영문·숫자·_·- 4~16자 / 서비스 경로(mfg, admin 등)는 사용 불가</div>
        </div>
        <div>
          <label class="ac-form-label">메모 <span style="font-weight:400;color:var(--dim)">(선택)</span></label>
          <input class="inp" id="su-memo" placeholder="7월 교육 LMS 링크" maxlength="100" onkeydown="if(event.key==='Enter')suSave()">
        </div>
      </div>
      <div style="margin-top:14px">
        <button class="btn btn-accent" id="su-save-btn" onclick="suSave()">+ 짧은 주소 생성</button>
        <button class="btn btn-ghost" id="su-cancel-btn" style="display:none" onclick="suCancel()">취소</button>
      </div>
      <div class="msg" id="su-msg"></div>
    </div>
  </div>

  <!-- 목록 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">짧은 주소 목록 <span id="su-count" style="color:var(--dim);font-weight:400"></span></span>
      <button class="btn btn-ghost" style="padding:4px 12px;font-size:11px" onclick="suLoadAll()">↻ 새로고침</button>
    </div>
    <div class="card-body">
      <div style="overflow-x:auto">
        <table class="su-table" id="su-table">
          <thead>
            <tr>
              <th>짧은 주소</th><th>원본 URL</th><th>메모</th>
              <th style="text-align:right">클릭</th><th style="text-align:right">관리</th>
            </tr>
          </thead>
          <tbody id="su-list">
            <tr><td colspan="5" style="color:var(--dim);font-size:13px">불러오는 중...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- QR 생성기 -->
  <div class="card">
    <div class="card-head">
      <span class="card-title">QR 생성기</span>
      <span style="font-size:11px;color:var(--dim)">URL·텍스트 모두 가능 (한글 지원)</span>
    </div>
    <div class="card-body">
      <div class="su-qr-wrap">
        <div>
          <label class="ac-form-label">내용 (URL 또는 텍스트) *</label>
          <input class="inp" id="qr-text" placeholder="https://dataforge.ai.kr/abcd" onkeydown="if(event.key==='Enter')qrGen()">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:12px">
            <div>
              <label class="ac-form-label">크기</label>
              <select class="inp" id="qr-size">
                <option value="240">작게 (240px)</option>
                <option value="360" selected>보통 (360px)</option>
                <option value="600">크게 (600px)</option>
                <option value="1000">인쇄용 (1000px)</option>
              </select>
            </div>
            <div>
              <label class="ac-form-label">여백</label>
              <select class="inp" id="qr-margin">
                <option value="4" selected>표준</option>
                <option value="2">좁게</option>
                <option value="0">없음</option>
              </select>
            </div>
          </div>
          <div style="margin-top:14px">
            <button class="btn btn-accent" onclick="qrGen()">QR 생성</button>
            <button class="btn btn-ghost" id="qr-dl-btn" style="display:none" onclick="qrDownload()">⬇ PNG 다운로드</button>
          </div>
          <div class="msg" id="qr-msg"></div>
        </div>
        <div class="su-qr-box">
          <canvas id="qr-canvas" style="display:none;max-width:100%;height:auto;border-radius:8px"></canvas>
          <div id="qr-empty" style="color:var(--dim);font-size:13px;text-align:center">내용을 입력하고<br>QR 생성을 눌러주세요</div>
        </div>
      </div>
    </div>
  </div>

</div>
</div><!-- /.content -->

<script>
const isAdmin = false;
const CSRF_TOKEN = "";

/* ── 로그인 ── */
function doLogin() {
  const pw = document.getElementById('admin-pw').value;
  fetch(BASE_URL+'/api/login.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})})
  .then(r=>r.json()).then(d=>{
    if(d.ok&&d.admin) location.reload();
    else document.getElementById('login-err').textContent = d.msg||'비밀번호가 틀렸습니다';
  });
}

/* ══════════════════════════════════════
   네비게이션 — 메뉴 단일 소스
   탭 추가 시 여기에 한 줄만 추가하면
   상단 그룹 메뉴·모바일 셀렉트·빠른 이동(Ctrl+K)에 모두 반영된다.
   (panel = <div id="tab-{id}">, onOpen = 탭 열 때 실행할 로더)
══════════════════════════════════════ */
const navEsc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;')
  .replace(/>/g,'&gt;').replace(/"/g,'&quot;');

const NAV_GROUPS = [
  { name:'운영',   icon:'⚡', items:[
    { id:'stream',     icon:'⚡', label:'스트리밍 제어',    onOpen:null },
    { id:'sessions',   icon:'🎓', label:'교육 세션 관리',    onOpen:() => loadSessions() },
    { id:'reviews',    icon:'💬', label:'교육 후기 관리',    onOpen:() => rvLoadAll() },
    { id:'feedback',   icon:'💡', label:'개선 의견',        onOpen:() => fbLoadAll() },
  ]},
  { name:'컨텐츠', icon:'📚', items:[
    { id:'courses',    icon:'📦', label:'과정 관리', onOpen:() => crsLoad() },
    { id:'content',    icon:'📚', label:'컨텐츠 라이브러리', onOpen:() => clLoadAll() },
    { id:'prompts',    icon:'💬', label:'프롬프트 관리',     onOpen:() => pLoadAll() },
  ]},
  { name:'데이터', icon:'🗄', items:[
    { id:'db',         icon:'🗄', label:'DB 관리',          onOpen:() => loadStats() },
    { id:'apicollect', icon:'🌐', label:'API 수집',         onOpen:() => { acLoadList(); acLoadHistory(); } },
  ]},
  { name:'도구',   icon:'🧰', items:[
    { id:'drive',      icon:'📁', label:'파일 보관함',       onOpen:() => dvLoadAll() },
    { id:'shorturl',   icon:'🔗', label:'짧은 주소 · QR',    onOpen:() => suLoadAll() },
  ]},
  // solo: 드롭다운 없이 단일 탭으로 바로 표시 (도구 메뉴 옆 독립 메뉴)
  { name:'트래픽 현황', icon:'📊', solo:true, items:[
    { id:'traffic',    icon:'📊', label:'트래픽 현황',       onOpen:() => loadTraffic() },
  ]},
];
const NAV_ITEMS = NAV_GROUPS.flatMap(g => g.items.map(it => ({...it, group:g.name})));

/* ── 네비 렌더링 (설정 → DOM) ── */
function renderNav() {
  const tabs = document.getElementById('nav-tabs');
  const sel  = document.getElementById('nav-select');
  if (!tabs || !sel) return;

  tabs.innerHTML = NAV_GROUPS.map((g, gi) => {
    // solo 그룹 — 드롭다운 없이 클릭 즉시 이동하는 단일 메뉴
    if (g.solo) {
      const it = g.items[0];
      return `
    <div class="nav-group" data-group="${gi}">
      <button class="nav-group-btn" data-tab="${it.id}" onclick="switchTab('${it.id}')">
        <span>${g.icon} ${navEsc(g.name)}</span>
      </button>
    </div>`;
    }
    return `
    <div class="nav-group" data-group="${gi}">
      <button class="nav-group-btn" onclick="navToggleGroup(${gi}, event)">
        <span>${g.icon} ${navEsc(g.name)}</span>
        <span class="nav-group-cur" data-cur="${gi}"></span>
        <span class="caret">▼</span>
      </button>
      <div class="nav-menu">
        ${g.items.map(it => `
          <button class="nav-menu-item" data-tab="${it.id}" onclick="switchTab('${it.id}')">
            <span>${it.icon}</span><span>${navEsc(it.label)}</span>
          </button>`).join('')}
      </div>
    </div>`;
  }).join('');

  sel.innerHTML = NAV_GROUPS.map(g => g.solo
    ? g.items.map(it => `<option value="${it.id}">${it.icon} ${navEsc(it.label)}</option>`).join('')
    : `
    <optgroup label="${navEsc(g.name)}">
      ${g.items.map(it => `<option value="${it.id}">${it.icon} ${navEsc(it.label)}</option>`).join('')}
    </optgroup>`).join('');
}

function navToggleGroup(gi, ev) {
  if (ev) ev.stopPropagation();
  const el   = document.querySelector(`.nav-group[data-group="${gi}"]`);
  const open = el.classList.contains('open');
  navCloseGroups();
  if (!open) el.classList.add('open');
}
function navCloseGroups() {
  document.querySelectorAll('.nav-group.open').forEach(e => e.classList.remove('open'));
}
document.addEventListener('click', navCloseGroups);

/* ── 탭 전환 ── */
function switchTab(name) {
  const item = NAV_ITEMS.find(i => i.id === name) || NAV_ITEMS[0];
  navCloseGroups();

  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('tab-' + item.id).classList.add('active');

  // 그룹 버튼: 현재 그룹 강조 + 선택된 항목명 표시
  document.querySelectorAll('.nav-group').forEach((el, gi) => {
    const g = NAV_GROUPS[gi];
    const on = g.items.some(i => i.id === item.id);
    el.classList.toggle('active', on);
    const cur = el.querySelector(`[data-cur="${gi}"]`);
    if (cur) cur.textContent = on && g.items.length > 1 ? '· ' + item.label : '';
  });
  document.querySelectorAll('.nav-menu-item').forEach(b =>
    b.classList.toggle('active', b.dataset.tab === item.id));

  const sel = document.getElementById('nav-select');
  if (sel) sel.value = item.id;

  history.replaceState(null, '', '#' + item.id);
  if (item.onOpen) item.onOpen();
}

/* ── 빠른 이동 팔레트 (Ctrl+K) ── */
let cmdkSel = 0, cmdkHits = [];
function cmdkOpen() {
  if (!isAdmin) return;
  document.getElementById('cmdk').classList.add('open');
  const inp = document.getElementById('cmdk-inp');
  inp.value = ''; inp.focus();
  cmdkFilter('');
}
function cmdkClose() { document.getElementById('cmdk').classList.remove('open'); }
function cmdkFilter(q) {
  q = q.trim().toLowerCase();
  cmdkHits = NAV_ITEMS.filter(i =>
    !q || i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q) || i.id.includes(q));
  cmdkSel = 0;
  cmdkRender();
}
function cmdkRender() {
  const list = document.getElementById('cmdk-list');
  if (!cmdkHits.length) { list.innerHTML = '<div class="cmdk-empty">일치하는 메뉴가 없습니다</div>'; return; }
  list.innerHTML = cmdkHits.map((i, n) => `
    <button class="cmdk-item ${n === cmdkSel ? 'sel' : ''}" onclick="cmdkGo(${n})">
      <span>${i.icon}</span><span>${navEsc(i.label)}</span><span class="grp">${navEsc(i.group)}</span>
    </button>`).join('');
  const sel = list.querySelector('.cmdk-item.sel');
  if (sel) sel.scrollIntoView({block:'nearest'});
}
function cmdkGo(n) {
  const it = cmdkHits[n];
  if (!it) return;
  cmdkClose();
  switchTab(it.id);
}
document.addEventListener('keydown', e => {
  const open = document.getElementById('cmdk')?.classList.contains('open');
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open ? cmdkClose() : cmdkOpen(); return; }
  if (!open) return;
  if (e.key === 'Escape')    { cmdkClose(); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); cmdkSel = Math.min(cmdkSel + 1, cmdkHits.length - 1); cmdkRender(); }
  else if (e.key === 'ArrowUp')   { e.preventDefault(); cmdkSel = Math.max(cmdkSel - 1, 0); cmdkRender(); }
  else if (e.key === 'Enter')     { e.preventDefault(); cmdkGo(cmdkSel); }
});
document.getElementById('cmdk-inp')?.addEventListener('input', e => cmdkFilter(e.target.value));

/* ══════════════════════════════════════
   세션 관리
══════════════════════════════════════ */
function sessionStatus(s) {
  const t = new Date().toLocaleDateString('sv-SE');
  return t < s.startDate ? 'upcoming' : t > s.endDate ? 'expired' : 'active';
}
// 오늘 기준 종료일까지 남은 일수 (음수면 이미 지남)
function daysLeft(endDate) {
  if (!endDate) return 0;
  const t = new Date(new Date().toLocaleDateString('sv-SE') + 'T00:00:00');
  return Math.round((new Date(endDate + 'T00:00:00') - t) / 86400000);
}
const SL = {upcoming:'예정',active:'진행중',expired:'종료'};
const SC = {upcoming:'sb-upcoming',active:'sb-active',expired:'sb-expired'};

const SESSIONS_MAP = {};

function loadSessions() {
  if(!isAdmin) return;
  fetch(BASE_URL+'/api/sessions.php').then(r=>r.json()).then(sessions=>{
    const list = document.getElementById('session-list');
    const hint = document.getElementById('session-hint');
    // 전역 맵 갱신
    Object.keys(SESSIONS_MAP).forEach(k=>delete SESSIONS_MAP[k]);
    sessions.forEach(s=>{ SESSIONS_MAP[s.id]=s; });
    if(!sessions.length){
      list.innerHTML='<div class="empty">생성된 교육 세션이 없습니다<br><span style="font-size:11px;display:block;margin-top:6px">왼쪽 폼에서 새 세션을 생성해주세요</span></div>';
      hint.style.display='none'; return;
    }
    hint.style.display='block';
    list.innerHTML = sessions.map(s=>{
      const st=sessionStatus(s);
      const mCnt=(s.modules||[]).length;
      const dd=daysLeft(s.endDate);
      const ddTxt = st==='expired' ? `종료 ${-dd}일 지남`
                  : st==='active'  ? (dd===0?'오늘 종료':`D-${dd}`)
                  : '';
      return `<div class="sess-item ${st==='expired'?'expired':''}">
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;color:var(--text)">
            ${s.name}<span class="sbadge ${SC[st]}">${SL[st]}</span>
          </div>
          <div class="sess-code ${st==='expired'?'expired':''}">${s.code}</div>
          <div class="sess-meta">
            <span>📅 ${s.startDate} ~ ${s.endDate}${ddTxt?` <strong style="color:${st==='expired'?'var(--dim)':'var(--accent)'}">(${ddTxt})</strong>`:''}</span>
            <span>👥 ${s.headcount}명</span>
            <span>생성 ${new Date(s.createdAt).toLocaleDateString('ko-KR')}</span>
            <span>📋 모듈 ${mCnt}개</span>
          </div>
        </div>
        <div class="row">
          <button class="btn-period" onclick="toggleSessionPeriod('${s.id}')">📆 기간 연장</button>
          <button class="btn-curric" onclick="openCurriculum('${s.id}')">📋 교육 과정</button>
          ${st!=='expired'?`<button class="btn-copy" id="cp-${s.id}" onclick="copyCode('${s.code}','${s.id}')">코드 복사</button>`:''}
          <button class="btn btn-danger" onclick="deleteSession('${s.id}')" style="font-size:11px;padding:6px 14px">삭제</button>
        </div>
      </div>
      <div class="sess-period" id="sp-${s.id}" style="display:none">
        <div class="sess-period-row">
          <div class="sess-period-fld">
            <label class="lbl">시작일</label>
            <input type="date" class="inp" id="sp-start-${s.id}" value="${s.startDate}">
          </div>
          <div class="sess-period-fld">
            <label class="lbl">종료일</label>
            <input type="date" class="inp" id="sp-end-${s.id}" value="${s.endDate}">
          </div>
          <div class="sess-period-quick">
            <button onclick="bumpSessionEnd('${s.id}',7)">+7일</button>
            <button onclick="bumpSessionEnd('${s.id}',14)">+14일</button>
            <button onclick="bumpSessionEnd('${s.id}',30)">+30일</button>
            <button onclick="bumpSessionEnd('${s.id}',90)">+90일</button>
          </div>
          <button class="btn btn-accent" id="sp-save-${s.id}" onclick="saveSessionPeriod('${s.id}')" style="padding:8px 20px;font-size:12px">💾 저장</button>
          <button class="btn btn-ghost" onclick="toggleSessionPeriod('${s.id}')" style="padding:8px 16px;font-size:12px">취소</button>
        </div>
        <div class="sess-period-hint">
          종료일만 미래로 미루면 <strong style="color:var(--text)">같은 교육 코드 그대로</strong> 다시 사용할 수 있습니다 (모듈·정답 설정 유지).
          이미 지난 종료일에서 <strong style="color:var(--text)">+N일</strong> 버튼을 누르면 오늘을 기준으로 계산합니다.
        </div>
        <div class="err-txt" id="sp-err-${s.id}"></div>
      </div>`;
    }).join('');
  });
}

function copyCode(code,id){
  navigator.clipboard?.writeText(code).then(()=>{
    const b=document.getElementById('cp-'+id);
    b.textContent='✓ 복사됨'; b.classList.add('copied');
    setTimeout(()=>{b.textContent='코드 복사';b.classList.remove('copied');},2000);
  });
}

function createSession(){
  const name=document.getElementById('s-name').value.trim();
  const s=document.getElementById('s-start').value;
  const e=document.getElementById('s-end').value;
  const h=parseInt(document.getElementById('s-headcount').value);
  const err=document.getElementById('create-err');
  err.textContent='';
  if(!name){err.textContent='교육명을 입력해주세요';return;}
  if(!s||!e){err.textContent='교육 기간을 입력해주세요';return;}
  if(e<s){err.textContent='종료일이 시작일보다 빠를 수 없습니다';return;}
  fetch(BASE_URL+'/api/sessions.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,startDate:s,endDate:e,headcount:h})})
  .then(r=>r.json()).then(d=>{
    if(d.ok){document.getElementById('s-name').value='';loadSessions();}
    else err.textContent=d.msg||'생성 실패';
  });
}

/* ── 교육 기간 연장 ── */
function toggleSessionPeriod(id){
  const box=document.getElementById('sp-'+id);
  if(!box) return;
  const open = box.style.display!=='none';
  if(open){ box.style.display='none'; return; }
  // 한 번에 하나만 열어 둔다
  document.querySelectorAll('.sess-period').forEach(el=>el.style.display='none');
  const s=SESSIONS_MAP[id];
  if(s){
    document.getElementById('sp-start-'+id).value=s.startDate||'';
    document.getElementById('sp-end-'+id).value=s.endDate||'';
  }
  document.getElementById('sp-err-'+id).textContent='';
  box.style.display='block';
  document.getElementById('sp-end-'+id).focus();
}

// +N일 — 이미 지난 종료일이면 오늘을 기준으로 계산한다 (연장인데 여전히 과거가 되는 것 방지)
function bumpSessionEnd(id,days){
  const el=document.getElementById('sp-end-'+id);
  const today=new Date().toLocaleDateString('sv-SE');
  const base=(el.value && el.value>today) ? el.value : today;
  const d=new Date(base+'T00:00:00');
  d.setDate(d.getDate()+days);
  el.value=d.toLocaleDateString('sv-SE');
}

function saveSessionPeriod(id){
  const start=document.getElementById('sp-start-'+id).value;
  const end  =document.getElementById('sp-end-'+id).value;
  const err  =document.getElementById('sp-err-'+id);
  const btn  =document.getElementById('sp-save-'+id);
  err.textContent='';
  if(!start||!end){err.textContent='시작일·종료일을 입력해주세요';return;}
  if(end<start){err.textContent='종료일이 시작일보다 빠를 수 없습니다';return;}
  btn.disabled=true; btn.textContent='저장 중...';
  // mod_security 우회: 쓰기 요청은 multipart 파일 파트 + _method (다른 관리자 API와 동일 패턴)
  const fd=new FormData();
  fd.append('_method','PERIOD');
  fd.append('payload', new Blob([JSON.stringify({id,startDate:start,endDate:end})],
    {type:'application/json'}), 'payload.json');
  fetch(BASE_URL+'/api/sessions.php',{method:'POST',body:fd})
  .then(r=>r.json()).then(d=>{
    btn.disabled=false; btn.textContent='💾 저장';
    if(d.ok){ loadSessions(); }
    else err.textContent=d.msg||'저장 실패';
  }).catch(()=>{
    btn.disabled=false; btn.textContent='💾 저장';
    err.textContent='통신 오류 — 잠시 후 다시 시도해주세요';
  });
}

function deleteSession(id){
  if(!confirm('이 세션을 삭제하시겠습니까?')) return;
  fetch(BASE_URL+'/api/sessions.php',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id})}).then(()=>loadSessions());
}

/* ══════════════════════════════════════
   교육 과정 편집기 — 실습도구 (hub_tools.json 에서 자동 로드)
══════════════════════════════════════ */
let HUB_TOOLS = [];
const CURRIC_TOOLS = HUB_TOOLS; // 참조 공유 (loadHubTools 후 동기화됨)

async function loadHubTools() {
  try {
    const data = await fetch(BASE_URL + '/api/hub_tools.php').then(r => r.json());
    HUB_TOOLS.length = 0;
    data.forEach(t => HUB_TOOLS.push(t));
  } catch(e) {
    console.warn('hub_tools 로드 실패:', e);
  }
}
loadHubTools();

let currSessId = '';
let currModules = [];
let currModIdx  = -1;
let currSelCourse = -1;   // 선택된 과정 그룹의 시작 인덱스 (-1이면 미선택)

// 편집 컨텍스트 — 'session'(세션 커리큘럼) | 'course'(과정 파일 내용 편집).
// 두 편집기가 같은 폼 렌더러(renderCurricForm)와 버퍼(currModules)를 공유한다.
let editCtx = 'session';
let crsEditId = '';
const listElId = () => editCtx === 'course' ? 'crs-mod-list'   : 'curric-list';
const formElId = () => editCtx === 'course' ? 'crs-form-panel' : 'curric-form-panel';

function openCurriculum(id) {
  // 과정 편집기가 열려 있었다면 세션 컨텍스트로 되돌리고 그쪽 폼을 비운다 (필드 id 중복 방지)
  editCtx = 'session';
  crsEditId = '';
  const crsFp = document.getElementById('crs-form-panel');
  if (crsFp) crsFp.innerHTML = '';
  const crsEdit = document.getElementById('crs-edit-view');
  if (crsEdit) crsEdit.style.display = 'none';
  const crsList = document.getElementById('crs-list-view');
  if (crsList) crsList.style.display = '';

  currSessId  = id;
  currModules = JSON.parse(JSON.stringify((SESSIONS_MAP[id]||{}).modules||[]));
  // 첫 항목이 과정이면 과정 요약을, 아니면 모듈 편집 폼을 연다
  const firstIsCourse = currModules.length > 0 && (currModules[0].category || '').trim();
  currSelCourse = firstIsCourse ? 0 : -1;
  currModIdx  = (currModules.length > 0 && !firstIsCourse) ? 0 : -1;
  document.getElementById('sess-list-view').style.display  = 'none';
  document.getElementById('sess-curric-view').style.display = '';
  document.getElementById('curric-sess-title').textContent  = (SESSIONS_MAP[id]||{}).name || '';
  document.getElementById('curric-save-msg').textContent    = '';
  renderCurricList();
  renderCurricForm();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function closeCurriculum() {
  document.getElementById('sess-curric-view').style.display = 'none';
  document.getElementById('sess-list-view').style.display   = '';
}

/* 연속된 같은 category = 과정 그룹 (category 없으면 단일 모듈이 곧 그룹).
   과정은 통째 단위로만 추가·이동·삭제한다 — 세부 단계는 목록에 노출하지 않는다 */
function curricGroups() {
  const gs = [];
  currModules.forEach((m, i) => {
    const cat = (m.category || '').trim();
    const last = gs[gs.length - 1];
    if (cat && last && last.cat === cat) last.idxs.push(i);
    else gs.push({ cat, idxs: [i] });
  });
  return gs;
}

function renderCurricList() {
  const ul = document.getElementById(listElId());
  if (!ul) return;
  if (!currModules.length) {
    ul.innerHTML = '<div style="padding:20px 10px;text-align:center;font-size:12px;color:var(--dim)">'
      + (editCtx === 'course' ? '단계가 없습니다' : '모듈이 없습니다') + '</div>';
    return;
  }

  // 과정 편집 모드: 단계를 하나씩 펼쳐 편집한다 (세션 커리큘럼과 달리 개별 편집이 목적)
  if (editCtx === 'course') {
    ul.innerHTML = currModules.map((m, i) => `
      <div class="curric-mod-item${i === currModIdx ? ' active' : ''}" onclick="selectModule(${i})">
        <span class="curric-mod-num">${String(i + 1).padStart(2, '0')}</span>
        <span class="curric-mod-icon">${m.icon || '📄'}</span>
        <span class="curric-mod-label">${escAdm(m.title || '(제목 없음)')}</span>
        <span class="curric-mod-actions">
          <button class="curric-mod-btn" onclick="event.stopPropagation();moveModule(${i},-1)" title="위로">↑</button>
          <button class="curric-mod-btn" onclick="event.stopPropagation();moveModule(${i},1)"  title="아래로">↓</button>
          <button class="curric-mod-btn" onclick="event.stopPropagation();deleteModule(${i})"  title="삭제" style="color:var(--danger)">✕</button>
        </span>
      </div>`).join('');
    return;
  }

  ul.innerHTML = curricGroups().map((g, gi) => {
    const start = g.idxs[0];
    const actions = `
      <span class="curric-mod-actions">
        <button class="curric-mod-btn" onclick="event.stopPropagation();moveGroup(${gi},-1)" title="위로">↑</button>
        <button class="curric-mod-btn" onclick="event.stopPropagation();moveGroup(${gi},1)"  title="아래로">↓</button>
        <button class="curric-mod-btn" onclick="event.stopPropagation();deleteGroup(${gi})"  title="삭제" style="color:var(--danger)">✕</button>
      </span>`;

    if (g.cat) {  // 과정 — 한 줄로만 표시
      const active = currSelCourse === start ? ' active' : '';
      return `<div class="curric-mod-item${active}" onclick="selectCourse(${start})"
                   style="border-left:3px solid #6366f1">
        <span class="curric-mod-icon">📦</span>
        <span class="curric-mod-label" style="min-width:0">
          ${escAdm(g.cat)}
          <span style="display:block;font-size:10px;color:var(--dim);font-weight:400">${g.idxs.length}단계 (전체 포함)</span>
        </span>
        ${actions}
      </div>`;
    }
    const m = currModules[start];
    return `<div class="curric-mod-item${start === currModIdx ? ' active' : ''}" onclick="selectModule(${start})">
      <span class="curric-mod-num">${String(start + 1).padStart(2, '0')}</span>
      <span class="curric-mod-icon">${m.icon || '📄'}</span>
      <span class="curric-mod-label">${escAdm(m.title || '(제목 없음)')}</span>
      ${actions}
    </div>`;
  }).join('');
}

/* 그룹 단위 이동 — 과정 내부 순서는 고정, 그룹끼리만 자리 교환 */
function moveGroup(gi, dir) {
  const gs = curricGroups();
  const tj = gi + dir;
  if (tj < 0 || tj >= gs.length) return;
  const order = gs.map((_, i) => i);
  [order[gi], order[tj]] = [order[tj], order[gi]];
  const selName = currSelCourse >= 0 ? (currModules[currSelCourse].category || '') : '';
  currModules = order.flatMap(i => gs[i].idxs.map(k => currModules[k]));
  currModules.forEach((m, i) => { m.order = i; });
  if (selName) {
    const ni = currModules.findIndex(m => (m.category || '') === selName);
    currSelCourse = ni; currModIdx = -1;
  } else if (currModIdx >= 0) {
    currModIdx = Math.min(currModIdx, currModules.length - 1);
  }
  renderCurricList();
  renderCurricForm();
}

/* 그룹 단위 삭제 — 과정은 전 단계가 함께 제거된다 */
function deleteGroup(gi) {
  const gs = curricGroups();
  const g = gs[gi];
  if (!g) return;
  const msg = g.cat
    ? `과정 "${g.cat}" (${g.idxs.length}단계)을(를) 커리큘럼에서 제거하시겠습니까?\n모든 단계가 함께 제거됩니다.`
    : '이 모듈을 삭제하시겠습니까?';
  if (!confirm(msg)) return;
  const drop = new Set(g.idxs);
  currModules = currModules.filter((_, i) => !drop.has(i));
  currModules.forEach((m, i) => { m.order = i; });
  currSelCourse = -1;
  currModIdx = currModules.length ? 0 : -1;
  renderCurricList();
  renderCurricForm();
}

function selectCourse(start) {
  currSelCourse = start;
  currModIdx = -1;
  renderCurricList();
  renderCurricForm();
}

/* ── 정답 공개 스위치 (기본 잠김) — 토글 즉시 서버 저장 ── */
function toggleAnswerOpen(i) {
  const m = currModules[i];
  if (!m) return;
  m.answerOpen = !m.answerOpen;
  renderCurricForm();
  saveCurriculum(true);
}

function revealCourse(cat, open) {
  let n = 0;
  currModules.forEach(m => {
    if ((m.category || '').trim() === cat && (m.answer || '').trim()) {
      m.answerOpen = open; n++;
    }
  });
  if (!n) return;
  renderCurricForm();
  saveCurriculum(true);
}

function renderCurricForm() {
  const fp = document.getElementById(formElId());
  if (!fp) return;

  // 과정 선택 시: 단계 목록을 읽기 전용 요약 + 정답 공개 스위치로 보여준다
  if (currSelCourse >= 0 && currModules[currSelCourse]) {
    const cat = (currModules[currSelCourse].category || '').trim();
    const idxs = currModules.map((m, i) => [m, i])
      .filter(([m]) => (m.category || '').trim() === cat).map(([, i]) => i);
    const openCnt = idxs.filter(i => currModules[i].answerOpen).length;
    const withAns = idxs.filter(i => (currModules[i].answer || '').trim()).length;
    fp.innerHTML = `
      <div style="padding:24px 26px">
        <div style="font-size:11px;font-weight:700;color:#6366f1;letter-spacing:.08em;text-transform:uppercase;margin-bottom:8px">📦 과정</div>
        <div style="font-size:19px;font-weight:800;color:var(--text);margin-bottom:6px">${escAdm(cat)}</div>
        <div style="font-size:12px;color:var(--muted);margin-bottom:18px">${idxs.length}단계 — 교육생은 이 과정의 모든 단계를 순서대로 학습합니다.</div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px">
          <div style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.06em;text-transform:uppercase">
            정답 공개 <span style="color:var(--accent)">${openCnt}/${withAns}</span>
          </div>
          <div class="row">
            <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="revealCourse('${escAdm(cat)}', true)">전체 공개</button>
            <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="revealCourse('${escAdm(cat)}', false)">전체 잠금</button>
          </div>
        </div>

        <div style="display:grid;gap:6px;margin-bottom:18px">
          ${idxs.map((gi, i) => {
            const m = currModules[gi];
            const hasAns = !!(m.answer || '').trim();
            const on = !!m.answerOpen;
            return `
            <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;background:var(--card2);border:1px solid var(--border);border-radius:8px">
              <span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--dim);width:20px">${String(i+1).padStart(2,'0')}</span>
              <span style="font-size:15px">${m.icon || '📄'}</span>
              <span style="flex:1;min-width:0">
                <span style="display:block;font-size:12px;font-weight:600;color:var(--text)">${escAdm(m.title || '(제목 없음)')}</span>
                ${m.desc ? `<span style="display:block;font-size:11px;color:var(--dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escAdm(m.desc)}</span>` : ''}
              </span>
              ${hasAns
                ? `<button class="ans-sw${on ? ' on' : ''}" onclick="toggleAnswerOpen(${gi})"
                     title="${on ? '교육생에게 공개됨 — 클릭하면 잠금' : '잠김 — 클릭하면 공개'}">
                     ${on ? '✅ 공개' : '🔒 잠김'}</button>`
                : '<span style="font-size:10px;color:var(--dim)">정답 없음</span>'}
            </div>`;
          }).join('')}
        </div>

        <div style="font-size:11px;color:var(--muted);line-height:1.8;padding:12px 14px;background:rgba(99,102,241,.05);border:1px solid rgba(99,102,241,.2);border-radius:8px">
          정답은 <strong>공개 스위치를 켠 단계만</strong> 교육생 화면에 표시됩니다 (기본 잠김).
          잠긴 정답은 페이지 소스에도 포함되지 않습니다. 스위치를 바꾸면 즉시 저장되며, 교육생은 새로고침 없이 반영됩니다.<br>
          단계 내용을 고치려면 <strong style="color:#6366f1">📦 과정 관리</strong> 탭에서 JSON을 수정해 같은 과정명으로 다시 업로드하세요.
        </div>
      </div>`;
    return;
  }

  if (currModIdx < 0 || !currModules[currModIdx]) {
    fp.innerHTML = '<div style="padding:40px;text-align:center;color:var(--dim);font-size:13px">← 왼쪽에서 모듈을 선택하거나<br>모듈을 추가해주세요</div>';
    return;
  }
  const m = currModules[currModIdx];
  // 구형 example/exampleType → examples 배열로 마이그레이션
  if (!Array.isArray(m.examples)) {
    m.examples = m.example ? [{type: m.exampleType||'prompt', content: m.example}] : [];
  }
  const toolsHtml = HUB_TOOLS.map(t => t.group
    ? `<div class="tool-group-hd">${t.group}</div>`
    : `<label class="curric-tool-chk">
         <input type="checkbox" value="${t.id}" ${(m.tools||[]).includes(t.id)?'checked':''} onchange="syncTools()">
         ${t.icon} ${t.label}
       </label>`).join('');
  fp.innerHTML = `
    <!-- 모듈 기본 정보 -->
    <div class="cf-meta" style="margin-bottom:14px">
      <div>
        <div class="curric-label" style="margin-bottom:5px">아이콘</div>
        <input class="curric-inp" id="cf-icon" value="${escAdm(m.icon||'')}" maxlength="4"
          style="text-align:center;font-size:22px;padding:6px 4px" oninput="syncField('icon','cf-icon')">
      </div>
      <div style="display:grid;gap:8px">
        <div>
          <div class="curric-label" style="margin-bottom:5px">모듈 제목</div>
          <input class="curric-inp" id="cf-title" value="${escAdm(m.title||'')}"
            placeholder="예: 데이터 전처리 개요" oninput="syncField('title','cf-title')">
        </div>
        <div>
          <div class="curric-label" style="margin-bottom:5px">한 줄 설명</div>
          <input class="curric-inp" id="cf-desc" value="${escAdm(m.desc||'')}"
            placeholder="사이드바에 표시될 짧은 설명" oninput="syncField('desc','cf-desc')">
        </div>
      </div>
    </div>

    <!-- 1. 문제 -->
    <div class="cf-section s-problem">
      <div class="cf-section-hd" style="display:flex;align-items:center;justify-content:space-between;gap:10px">
        <span>🎯 문제</span>
        <button class="img-ins-btn" onclick="pickImages('problem','cf-problem')"
          title="이미지 파일 선택 · Ctrl+V 붙여넣기 · 드래그 앤 드롭 모두 가능">🖼 이미지 삽입</button>
      </div>
      <textarea class="curric-inp curric-ta" id="cf-problem"
        placeholder="교육생에게 제시할 문제나 과제를 작성하세요... (이미지: 버튼·Ctrl+V·드래그 앤 드롭)"
        oninput="syncField('problem','cf-problem')"
        onpaste="handleImagePaste(event,'problem','cf-problem')"
        ondrop="handleImageDrop(event,'problem','cf-problem')"
        ondragover="handleImageDragOver(event)" ondragleave="handleImageDragLeave(event)">${escAdm(m.problem||'')}</textarea>
    </div>

    <!-- 1-1. 정답 -->
    <div class="cf-section s-answer">
      <div class="cf-section-hd" style="display:flex;align-items:center;justify-content:space-between;gap:10px">
        <span>✅ 정답</span>
        <span style="display:flex;align-items:center;gap:8px">
          <button class="img-ins-btn" onclick="pickImages('answer','cf-answer')"
            title="이미지 파일 선택 · Ctrl+V 붙여넣기 · 드래그 앤 드롭 모두 가능">🖼 이미지 삽입</button>
          ${editCtx === 'session' ? `
          <button class="ans-sw${m.answerOpen ? ' on' : ''}" onclick="toggleAnswerOpen(${currModIdx})"
            title="${m.answerOpen ? '교육생에게 공개됨 — 클릭하면 잠금' : '잠김 — 클릭하면 공개'}">
            ${m.answerOpen ? '✅ 교육생 공개중' : '🔒 교육생 비공개'}
          </button>` : `
          <span style="font-size:10px;color:var(--dim)">공개 여부는 세션 커리큘럼에서 설정</span>`}
        </span>
      </div>
      <textarea class="curric-inp curric-ta" id="cf-answer"
        rows="4" placeholder="정답 또는 해설을 입력하세요... (이미지: 버튼·Ctrl+V·드래그 앤 드롭)"
        oninput="syncField('answer','cf-answer')"
        onpaste="handleImagePaste(event,'answer','cf-answer')"
        ondrop="handleImageDrop(event,'answer','cf-answer')"
        ondragover="handleImageDragOver(event)" ondragleave="handleImageDragLeave(event)">${escAdm(m.answer||'')}</textarea>
    </div>

    <!-- 2. 교육 내용 -->
    <div class="cf-section s-content">
      <div class="cf-section-hd" style="display:flex;align-items:center;justify-content:space-between;gap:10px">
        <span>📖 교육 내용 <span style="font-size:9px;font-weight:400;text-transform:none;letter-spacing:0">빈 줄로 단락 구분</span></span>
        <button class="img-ins-btn" onclick="pickImages('content','cf-content')"
          title="이미지 파일 선택 · Ctrl+V 붙여넣기 · 드래그 앤 드롭 모두 가능">🖼 이미지 삽입</button>
      </div>
      <textarea class="curric-inp curric-ta" id="cf-content"
        placeholder="교육 내용을 자유롭게 작성하세요... (이미지: 버튼·Ctrl+V·드래그 앤 드롭 → ![캡션](url) 삽입)"
        oninput="syncField('content','cf-content')"
        onpaste="handleImagePaste(event,'content','cf-content')"
        ondrop="handleImageDrop(event,'content','cf-content')"
        ondragover="handleImageDragOver(event)" ondragleave="handleImageDragLeave(event)">${escAdm(m.content||'')}</textarea>
      <div class="pdf-attach-area">
        <input type="file" id="cf-pdf-input" accept=".pdf" style="display:none" onchange="uploadPdf(this)">
        <div class="pdf-preview" id="cf-pdf-preview" style="${m.pdfUrl?'':'display:none'}">
          <span>📄</span>
          <span class="pdf-preview-name" id="cf-pdf-name">${escAdm(m.pdfName||((m.pdfUrl||'').split('/').pop()))}</span>
          <button class="pdf-remove-btn" onclick="removePdf()" title="PDF 제거">✕</button>
        </div>
        <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px;white-space:nowrap;flex-shrink:0"
          onclick="document.getElementById('cf-pdf-input').click()">📎 PDF 첨부</button>
        <span class="pdf-uploading" id="cf-pdf-uploading" style="display:none">업로드 중...</span>
      </div>
    </div>

    <!-- 3. 예제 (복수) -->
    <div class="cf-section s-example">
      <div class="cf-section-hd">💡 예제</div>
      <div id="cf-examples-list">${(m.examples||[]).map((ex,i)=>`
        <div class="cf-example-item" data-ei="${i}">
          <div class="cf-example-item-hd">
            <div class="cf-extype">
              <label><input type="radio" name="cf-extype-${i}" value="prompt"
                ${(ex.type||'prompt')!=='code'?'checked':''} onchange="syncExField(${i},'type','prompt')"> 프롬프트</label>
              <label><input type="radio" name="cf-extype-${i}" value="code"
                ${ex.type==='code'?'checked':''} onchange="syncExField(${i},'type','code')"> 코드</label>
            </div>
            <button class="cf-attach-rm" onclick="removeExample(${i})" title="삭제">✕</button>
          </div>
          <textarea class="curric-inp curric-ta" rows="12"
            placeholder="${ex.type==='code'?'코드를 작성하세요...':'프롬프트를 작성하세요...'}"
            oninput="syncExField(${i},'content',this.value)">${escAdm(ex.content||'')}</textarea>
        </div>`).join('')}</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="addExample('prompt')">+ 프롬프트 추가</button>
        <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px" onclick="addExample('code')">+ 코드 추가</button>
      </div>
    </div>

    <!-- 4. 첨부파일 -->
    <div class="cf-section s-attach">
      <div class="cf-section-hd">📎 첨부파일</div>
      <div id="cf-attach-list">${(m.attachments||[]).map((a,ai)=>`
        <div class="cf-attach-item">
          <span class="cf-attach-icon">${fileIcon(a.name)}</span>
          <span class="cf-attach-name" title="${escAdm(a.name)}">${escAdm(a.name)}</span>
          <span class="cf-attach-size">${fmtFileSize(a.size)}</span>
          <button class="cf-attach-rm" onclick="removeAttach(${ai})" title="제거">✕</button>
        </div>`).join('')}</div>
      <div style="display:flex;align-items:center;gap:8px;margin-top:6px">
        <input type="file" id="cf-file-input" multiple style="display:none" onchange="uploadAttach(this)"
          accept=".pdf,.xls,.xlsx,.ppt,.pptx,.doc,.docx,.csv,.txt,.zip,.png,.jpg,.jpeg,.gif,.webp">
        <button class="btn btn-ghost" style="font-size:11px;padding:5px 12px;white-space:nowrap;flex-shrink:0"
          onclick="document.getElementById('cf-file-input').click()">+ 파일 추가</button>
        <span id="cf-file-uploading" style="display:none;font-size:11px;color:var(--dim)">업로드 중...</span>
      </div>
    </div>

    <!-- 실습 도구 -->
    <div class="curric-form-row">
      <label class="curric-label">실습 도구</label>
      <div class="curric-tools-grid">${toolsHtml}</div>
    </div>`;
}

function syncField(field, elId) {
  if (currModIdx < 0) return;
  currModules[currModIdx][field] = document.getElementById(elId).value;
  if (field === 'title' || field === 'icon') renderCurricList();
}

function addExample(type) {
  if (currModIdx < 0) return;
  const m = currModules[currModIdx];
  if (!Array.isArray(m.examples)) m.examples = [];
  m.examples.push({type: type||'prompt', content: ''});
  renderCurricForm();
}

function removeExample(i) {
  if (currModIdx < 0) return;
  currModules[currModIdx].examples.splice(i, 1);
  renderCurricForm();
}

function syncExField(i, field, val) {
  if (currModIdx < 0) return;
  const ex = currModules[currModIdx].examples?.[i];
  if (!ex) return;
  ex[field] = val;
  if (field === 'type') {
    const ta = document.querySelector(`.cf-example-item[data-ei="${i}"] textarea`);
    if (ta) ta.placeholder = val === 'code' ? '코드를 작성하세요...' : '프롬프트를 작성하세요...';
  }
}

function syncTools() {
  if (currModIdx < 0) return;
  const checked = [...document.querySelectorAll('.curric-tool-chk input:checked')].map(e=>e.value);
  currModules[currModIdx].tools = checked;
}

function selectModule(i) {
  currModIdx = i;
  currSelCourse = -1;
  renderCurricList();
  renderCurricForm();
}

function addModule() {
  const m = {id:'mod_'+Date.now(), order:currModules.length, icon:'📄', title:'', desc:'', problem:'', answer:'', content:'', pdfUrl:'', pdfName:'', examples:[], tools:[], attachments:[]};
  // 과정 편집 중이면 새 단계도 같은 과정에 속하게 한다
  if (editCtx === 'course') m.category = document.getElementById('crs-edit-name').value.trim();
  currModules.push(m);
  currModIdx = currModules.length - 1;
  currSelCourse = -1;
  renderCurricList();
  renderCurricForm();
}

/* 개별 모듈 이동·삭제 (과정 편집 모드 / 커리큘럼의 단일 모듈용) */
function moveModule(i, dir) {
  const j = i + dir;
  if (j < 0 || j >= currModules.length) return;
  [currModules[i], currModules[j]] = [currModules[j], currModules[i]];
  currModules.forEach((m, k) => { m.order = k; });
  if (currModIdx === i) currModIdx = j;
  else if (currModIdx === j) currModIdx = i;
  renderCurricList();
  renderCurricForm();
}

function deleteModule(i) {
  if (!confirm('이 단계를 삭제하시겠습니까?')) return;
  currModules.splice(i, 1);
  currModules.forEach((m, k) => { m.order = k; });
  if (currModIdx >= currModules.length) currModIdx = currModules.length - 1;
  renderCurricList();
  renderCurricForm();
}

/* ── 과정 최신화 ──
   세션 커리큘럼의 모듈은 '과정 추가' 시점의 사본이므로, 과정 관리에서 내용을 고쳐도
   자동 반영되지 않는다. 이 함수가 과정 파일의 최신 모듈을 다시 끌어와 교체한다.
   교육생 진도(과정명::제목 기준)와 정답 공개 설정(제목 기준)은 최대한 보존한다. */
async function syncCoursesFromFiles() {
  const btn = document.getElementById('curric-sync-btn');
  const msg = document.getElementById('curric-save-msg');
  const cats = [...new Set(currModules.map(m => (m.category || '').trim()).filter(Boolean))];
  if (!cats.length) { msg.style.color = 'var(--muted)'; msg.textContent = '커리큘럼에 과정이 없습니다'; return; }

  btn.disabled = true; btn.textContent = '불러오는 중...';
  try {
    const list = await fetch(COURSES_API).then(r => r.json());
    const byName = new Map((Array.isArray(list) ? list : []).map(c => [c.name, c.id]));

    let synced = 0, steps = 0, missing = [];
    for (const cat of cats) {
      const id = byName.get(cat);
      if (!id) { missing.push(cat); continue; }
      const d = await fetch(`${COURSES_API}?id=${encodeURIComponent(id)}`).then(r => r.json());
      if (!d.ok || !Array.isArray(d.course?.modules)) { missing.push(cat); continue; }

      // 기존 모듈의 정답 공개 설정을 제목 기준으로 승계
      const openByTitle = new Map(currModules
        .filter(m => (m.category || '').trim() === cat)
        .map(m => [(m.title || '').trim(), !!m.answerOpen]));

      const fresh = d.course.modules.map(it => {
        const nm = libItemToModule(it);
        nm.category = cat;
        nm.answerOpen = openByTitle.get((nm.title || '').trim()) || false;
        return nm;
      });

      // 그룹이 있던 자리에 최신 모듈을 통째로 끼워 넣는다 (커리큘럼 내 과정 순서 유지)
      const out = [];
      let inserted = false;
      for (const m of currModules) {
        if ((m.category || '').trim() === cat) {
          if (!inserted) { out.push(...fresh); inserted = true; }
          continue;                    // 옛 사본은 버린다
        }
        out.push(m);
      }
      currModules = out;
      synced++; steps += fresh.length;
    }
    currModules.forEach((m, i) => { m.order = i; });
    currSelCourse = -1; currModIdx = currModules.length ? 0 : -1;
    renderCurricList(); renderCurricForm();

    btn.disabled = false; btn.textContent = '🔄 과정 최신화';
    if (!synced) {
      msg.style.color = 'var(--danger)';
      msg.textContent = `과정 파일을 찾지 못했습니다: ${missing.join(', ')}`;
      return;
    }
    saveCurriculum(true);
    msg.style.color = 'var(--green)';
    msg.textContent = `✓ ${synced}개 과정 ${steps}단계 최신화·저장${missing.length ? ` (미발견: ${missing.join(', ')})` : ''}`;
    setTimeout(() => { msg.textContent = ''; }, 4000);
  } catch (e) {
    btn.disabled = false; btn.textContent = '🔄 과정 최신화';
    msg.style.color = 'var(--danger)'; msg.textContent = '최신화 실패 — 서버 응답 오류';
  }
}

function saveCurriculum(silent) {
  const btn = document.getElementById('curric-save-btn');
  btn.disabled = true; btn.textContent = silent ? '💾 저장' : '저장 중...';
  // mod_security 우회: 대용량 모듈 JSON은 multipart 파일 파트로 감싸 POST (+_method=PUT)
  const fd = new FormData();
  fd.append('_method', 'PUT');
  fd.append('payload', new Blob([JSON.stringify({id: currSessId, modules: currModules})],
    {type: 'application/json'}), 'payload.json');
  fetch(BASE_URL+'/api/sessions.php', {method: 'POST', body: fd})
  .then(r=>r.json()).then(d=>{
    btn.disabled=false; btn.textContent='💾 저장';
    const msg = document.getElementById('curric-save-msg');
    if (d.ok) {
      msg.style.color='var(--green)';
      msg.textContent = silent ? '✓ 정답 공개 설정 저장됨' : '✓ 저장되었습니다';
      if (SESSIONS_MAP[currSessId]) SESSIONS_MAP[currSessId].modules = JSON.parse(JSON.stringify(currModules));
      loadSessions();
    } else {
      msg.style.color='var(--danger)'; msg.textContent=d.msg||'저장 실패';
    }
    setTimeout(()=>{ msg.textContent=''; }, 3000);
  }).catch(()=>{
    btn.disabled=false; btn.textContent='💾 저장';
    const msg = document.getElementById('curric-save-msg');
    msg.style.color='var(--danger)';
    msg.textContent='저장 실패 — 서버 응답 오류 (잠시 후 다시 시도해주세요)';
    setTimeout(()=>{ msg.textContent=''; }, 4000);
  });
}

function escAdm(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ══════════════════════════════════════
   파일 유틸
══════════════════════════════════════ */
function fileIcon(name) {
  const ext = (name||'').split('.').pop().toLowerCase();
  if (ext==='pdf') return '📄';
  if (['xls','xlsx'].includes(ext)) return '📊';
  if (['ppt','pptx'].includes(ext)) return '📋';
  if (['doc','docx'].includes(ext)) return '📝';
  if (['csv','txt'].includes(ext)) return '📃';
  if (ext==='zip') return '🗜️';
  if (['png','jpg','jpeg','gif','webp'].includes(ext)) return '🖼️';
  return '📎';
}

function fmtFileSize(bytes) {
  if (!bytes) return '';
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1048576) return (bytes/1024).toFixed(1) + 'KB';
  return (bytes/1048576).toFixed(1) + 'MB';
}

/* ══════════════════════════════════════
   첨부파일 업로드 (커리큘럼 편집기)
══════════════════════════════════════ */
const FILE_API = BASE_URL + '/api/upload_file.php';

async function uploadAttach(input) {
  if (!input.files.length || currModIdx < 0) return;
  const uploading = document.getElementById('cf-file-uploading');
  uploading.style.display = '';
  for (const file of input.files) {
    const fd = new FormData();
    fd.append('file', file);
    try {
      const r = await fetch(FILE_API, {method:'POST', headers:{'X-CSRF-Token': CSRF_TOKEN}, body:fd});
      const d = await r.json();
      if (d.ok) {
        if (!currModules[currModIdx].attachments) currModules[currModIdx].attachments = [];
        currModules[currModIdx].attachments.push({url:d.url, name:d.name, size:d.size, type:d.type});
      } else {
        alert(d.msg || '업로드 실패: ' + file.name);
      }
    } catch(e) {
      alert('업로드 실패: ' + file.name);
    }
  }
  input.value = '';
  uploading.style.display = 'none';
  renderCurricForm();
}

function removeAttach(ai) {
  if (currModIdx < 0) return;
  if (!currModules[currModIdx].attachments) return;
  currModules[currModIdx].attachments.splice(ai, 1);
  renderCurricForm();
}

/* ══════════════════════════════════════
   이미지 붙여넣기 업로드 (스크린샷 → ![캡션](url))
   문제/교육내용/정답 textarea에 Ctrl+V 하면 자동 업로드 후 커서 위치에 삽입.
   카페24 쿼터가 작으므로 업로드 전 브라우저에서 리사이즈·재압축한다.
══════════════════════════════════════ */
const IMG_MAX_PX = 1600;
const IMG_QUALITY = 0.85;

// GIF는 애니메이션이 깨지므로 원본 그대로, PNG는 투명도 보존을 위해 PNG로, 그 외는 JPEG로 재압축
function resizeImage(file) {
  if (file.type === 'image/gif') return Promise.resolve(file);
  const outType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, IMG_MAX_PX / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
      const cv = document.createElement('canvas');
      cv.width = w; cv.height = h;
      cv.getContext('2d').drawImage(img, 0, 0, w, h);
      cv.toBlob(b => b ? resolve(b) : reject(new Error('변환 실패')), outType, IMG_QUALITY);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('이미지 로드 실패')); };
    img.src = url;
  });
}

/* 이미지 파일들을 업로드해 커서 위치에 ![캡션](url)로 삽입 —
   붙여넣기(Ctrl+V) · 파일 선택 · 드래그 앤 드롭이 모두 이 함수를 쓴다 */
async function insertImages(field, elId, files) {
  if (currModIdx < 0) return;
  const imgs = [...files].filter(f => f.type.startsWith('image/'));
  if (!imgs.length) return;

  const ta = document.getElementById(elId);
  for (const file of imgs) {
    const at = ta.selectionStart ?? ta.value.length;
    const tag = `\n![업로드 중... ${Math.random().toString(36).slice(2, 7)}]()\n`;
    ta.value = ta.value.slice(0, at) + tag + ta.value.slice(at);
    ta.selectionStart = ta.selectionEnd = at + tag.length;
    syncField(field, elId);

    try {
      const blob = await resizeImage(file);
      const ext = blob.type === 'image/png' ? 'png' : blob.type === 'image/gif' ? 'gif' : 'jpg';
      const base = (file.name || 'image').replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9가-힣_\-]/g, '_').slice(0, 30);
      const fd = new FormData();
      fd.append('file', new File([blob], `${base || 'image'}_${Date.now()}.${ext}`, {type: blob.type}));
      const r = await fetch(FILE_API, {method: 'POST', headers: {'X-CSRF-Token': CSRF_TOKEN}, body: fd});
      const d = await r.json();
      if (!d.ok) throw new Error(d.msg || '업로드 실패');
      ta.value = ta.value.replace(tag, `\n![${base || '이미지'}](${d.url})\n`);
    } catch (e) {
      ta.value = ta.value.replace(tag, '');
      alert(`이미지 업로드 실패 (${file.name || '캡처'}): ${e.message}`);
    }
    syncField(field, elId);
  }
  renderCurricForm();
}

/* ① 붙여넣기 (스크린샷) */
function handleImagePaste(ev, field, elId) {
  const files = [...(ev.clipboardData?.items || [])]
    .filter(i => i.type.startsWith('image/'))
    .map(i => i.getAsFile())
    .filter(Boolean);
  if (!files.length) return;          // 이미지가 아니면 기본 붙여넣기 동작
  ev.preventDefault();
  insertImages(field, elId, files);
}

/* ② 파일 선택 버튼 */
function pickImages(field, elId) {
  if (currModIdx < 0) return;
  const inp = document.createElement('input');
  inp.type = 'file';
  inp.accept = 'image/png,image/jpeg,image/gif,image/webp';
  inp.multiple = true;
  inp.onchange = () => { if (inp.files.length) insertImages(field, elId, inp.files); };
  inp.click();
}

/* ③ 드래그 앤 드롭 */
function handleImageDrop(ev, field, elId) {
  const files = [...(ev.dataTransfer?.files || [])].filter(f => f.type.startsWith('image/'));
  if (!files.length) return;
  ev.preventDefault();
  ev.currentTarget.classList.remove('drag-over');
  insertImages(field, elId, files);
}
function handleImageDragOver(ev) {
  if (![...(ev.dataTransfer?.items || [])].some(i => i.kind === 'file')) return;
  ev.preventDefault();
  ev.currentTarget.classList.add('drag-over');
}
function handleImageDragLeave(ev) { ev.currentTarget.classList.remove('drag-over'); }

/* ══════════════════════════════════════
   PDF 업로드 (커리큘럼 편집기)
══════════════════════════════════════ */
const PDF_API = BASE_URL + '/api/upload_pdf.php';

function uploadPdf(input) {
  if (!input.files[0] || currModIdx < 0) return;
  const file = input.files[0];
  input.value = '';
  const uploading = document.getElementById('cf-pdf-uploading');
  uploading.style.display = '';
  const fd = new FormData();
  fd.append('pdf', file);
  fetch(PDF_API, {method:'POST', headers:{'X-CSRF-Token': CSRF_TOKEN}, body:fd})
    .then(r => r.json()).then(d => {
      uploading.style.display = 'none';
      if (d.ok) {
        currModules[currModIdx].pdfUrl  = d.url;
        currModules[currModIdx].pdfName = d.name;
        const prev = document.getElementById('cf-pdf-preview');
        prev.style.display = '';
        document.getElementById('cf-pdf-name').textContent = d.name;
      } else {
        alert(d.msg || 'PDF 업로드 실패');
      }
    }).catch(() => {
      uploading.style.display = 'none';
      alert('PDF 업로드 실패');
    });
}

function removePdf() {
  if (currModIdx < 0) return;
  currModules[currModIdx].pdfUrl  = '';
  currModules[currModIdx].pdfName = '';
  document.getElementById('cf-pdf-preview').style.display = 'none';
}

/* PDF 업로드 (컨텐츠 라이브러리) */
function clUploadPdf(input) {
  if (!input.files[0]) return;
  const file = input.files[0];
  input.value = '';
  const uploading = document.getElementById('cl-pdf-uploading');
  uploading.style.display = '';
  const fd = new FormData();
  fd.append('pdf', file);
  fetch(PDF_API, {method:'POST', headers:{'X-CSRF-Token': CSRF_TOKEN}, body:fd})
    .then(r => r.json()).then(d => {
      uploading.style.display = 'none';
      if (d.ok) {
        document.getElementById('cl-pdf-url').value       = d.url;
        document.getElementById('cl-pdf-orig-name').value = d.name;
        const prev = document.getElementById('cl-pdf-preview');
        prev.style.display = '';
        document.getElementById('cl-pdf-name').textContent = d.name;
      } else {
        alert(d.msg || 'PDF 업로드 실패');
      }
    }).catch(() => {
      uploading.style.display = 'none';
      alert('PDF 업로드 실패');
    });
}

function clRemovePdf() {
  document.getElementById('cl-pdf-url').value       = '';
  document.getElementById('cl-pdf-orig-name').value = '';
  document.getElementById('cl-pdf-preview').style.display = 'none';
}

/* 첨부파일 업로드 (컨텐츠 라이브러리) */
async function clUploadAttach(input) {
  if (!input.files.length) return;
  const uploading = document.getElementById('cl-file-uploading');
  uploading.style.display = '';
  for (const file of input.files) {
    const fd = new FormData();
    fd.append('file', file);
    try {
      const r = await fetch(FILE_API, {method:'POST', headers:{'X-CSRF-Token': CSRF_TOKEN}, body:fd});
      const d = await r.json();
      if (d.ok) {
        clAttachments.push({url:d.url, name:d.name, size:d.size, type:d.type});
      } else {
        alert(d.msg || '업로드 실패: ' + file.name);
      }
    } catch(e) {
      alert('업로드 실패: ' + file.name);
    }
  }
  input.value = '';
  uploading.style.display = 'none';
  renderClAttachList();
}

function clRemoveAttach(idx) {
  clAttachments.splice(idx, 1);
  renderClAttachList();
}

function renderClAttachList() {
  const el = document.getElementById('cl-attach-list');
  if (!el) return;
  el.innerHTML = clAttachments.map((a,i) =>
    `<div class="cf-attach-item">
      <span class="cf-attach-icon">${fileIcon(a.name)}</span>
      <span class="cf-attach-name" title="${escAdm(a.name)}">${escAdm(a.name)}</span>
      <span class="cf-attach-size">${fmtFileSize(a.size)}</span>
      <button class="cf-attach-rm" onclick="clRemoveAttach(${i})" title="제거">✕</button>
    </div>`).join('');
}

/* ══════════════════════════════════════
   교육 컨텐츠 라이브러리
══════════════════════════════════════ */
const CL_API = BASE_URL + '/api/content_lib.php';

// 카페24 mod_security가 JSON 본문의 특정 패턴·128KB 초과 요청을 차단하므로
// 쓰기 요청은 JSON을 multipart 파일 파트로 감싸 POST하고 _method로 실제 메서드를 전달
function clSend(method, data) {
  const fd = new FormData();
  fd.append('_method', method);
  fd.append('payload', new Blob([JSON.stringify(data)], {type: 'application/json'}), 'payload.json');
  return fetch(CL_API, {method: 'POST', headers: {'X-CSRF-Token': CSRF_TOKEN}, body: fd});
}

/* ══════════════════════════════════════
   과정 관리 (1 JSON = 1 과정, data/courses/)
══════════════════════════════════════ */
const COURSES_API = BASE_URL + '/api/courses.php';

function csSend(method, data) {
  const fd = new FormData();
  fd.append('_method', method);
  fd.append('payload', new Blob([JSON.stringify(data)], {type: 'application/json'}), 'payload.json');
  return fetch(COURSES_API, {method: 'POST', headers: {'X-CSRF-Token': CSRF_TOKEN}, body: fd});
}

function crsLoad() {
  if (!isAdmin) return;
  const el = document.getElementById('crs-list');
  fetch(COURSES_API).then(r => r.json()).then(list => {
    if (!Array.isArray(list) || !list.length) {
      el.innerHTML = '<div class="empty">등록된 과정이 없습니다<br>' +
        '<span style="font-size:11px;display:block;margin-top:6px">위의 ⬆ 과정 업로드로 JSON 파일을 올려주세요</span></div>';
      return;
    }
    el.innerHTML = list.map(c => `
      <div class="sess-item">
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;color:var(--text)">📦 ${escAdm(c.name)}</div>
          <div class="sess-meta" style="margin-top:4px">
            <span>📋 ${c.count}단계</span>
            ${c.updatedAt ? `<span>갱신 ${new Date(c.updatedAt).toLocaleString('ko-KR')}</span>` : ''}
            <span style="font-family:'Space Mono',monospace;font-size:10px;opacity:.6">${escAdm(c.id)}</span>
          </div>
        </div>
        <div class="row">
          <button class="btn-curric" style="font-size:11px;padding:6px 14px" onclick="crsOpenEditor('${c.id}')">✏️ 내용 편집</button>
          <button class="btn btn-ghost" style="font-size:11px;padding:6px 14px" onclick="crsExportPy('${c.id}')" title="단계별 정답 코드를 .py로 묶어 ZIP 다운로드 (코드 테스트용)">🐍 py 내보내기</button>
          <button class="btn btn-ghost" style="font-size:11px;padding:6px 14px" onclick="crsExport('${c.id}', this)">⬇ JSON</button>
          <button class="btn btn-danger" style="font-size:11px;padding:6px 14px" onclick="crsDelete('${c.id}', '${escAdm(c.name)}')">삭제</button>
        </div>
      </div>`).join('');
  }).catch(() => { el.innerHTML = '<div class="empty" style="color:var(--danger)">과정 목록을 불러오지 못했습니다</div>'; });
}

/* ── 과정 내용 편집 (세션 커리큘럼과 같은 폼을 재사용) ── */
function crsOpenEditor(id) {
  fetch(`${COURSES_API}?id=${encodeURIComponent(id)}`).then(r => r.json()).then(d => {
    if (!d.ok || !d.course) { alert('과정을 불러오지 못했습니다: ' + (d.msg || '')); return; }
    editCtx = 'course';
    crsEditId = d.course.id;
    // 세션 편집기 폼을 비운다 — 같은 필드 id(cf-title 등)가 DOM에 중복되면 동기화가 깨진다
    const sessFp = document.getElementById('curric-form-panel');
    if (sessFp) sessFp.innerHTML = '';
    currModules = JSON.parse(JSON.stringify(d.course.modules || []));
    currModules.forEach((m, i) => { m.order = i; });
    currModIdx = currModules.length ? 0 : -1;
    currSelCourse = -1;
    document.getElementById('crs-edit-name').value = d.course.name || '';
    document.getElementById('crs-save-msg').textContent = '';
    document.getElementById('crs-list-view').style.display = 'none';
    document.getElementById('crs-edit-view').style.display = '';
    renderCurricList();
    renderCurricForm();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }).catch(() => alert('요청 실패'));
}

function crsCloseEditor() {
  editCtx = 'session';
  crsEditId = '';
  currModules = [];
  currModIdx = -1;
  document.getElementById('crs-edit-view').style.display = 'none';
  document.getElementById('crs-list-view').style.display = '';
  crsLoad();
}

function saveCourse() {
  const name = document.getElementById('crs-edit-name').value.trim();
  const msg  = document.getElementById('crs-save-msg');
  const btn  = document.getElementById('crs-save-btn');
  if (!name) { msg.style.color = 'var(--danger)'; msg.textContent = '과정명을 입력해주세요'; return; }
  if (!currModules.length) { msg.style.color = 'var(--danger)'; msg.textContent = '단계가 최소 1개 필요합니다'; return; }
  const noTitle = currModules.findIndex(m => !(m.title || '').trim());
  if (noTitle >= 0) { msg.style.color = 'var(--danger)'; msg.textContent = `${noTitle + 1}번째 단계의 제목이 비어 있습니다`; return; }

  btn.disabled = true; btn.textContent = '저장 중...';
  const prevId = crsEditId;
  csSend('POST', {name, modules: currModules}).then(r => r.json()).then(d => {
    btn.disabled = false; btn.textContent = '💾 저장';
    if (!d.ok) { msg.style.color = 'var(--danger)'; msg.textContent = d.msg || '저장 실패'; return; }
    // 과정명을 바꿔 저장하면 새 파일이 생기므로, 이름이 바뀐 경우 기존 파일을 정리한다
    const renamed = prevId && d.id !== prevId;
    const done = () => {
      crsEditId = d.id;
      msg.style.color = 'var(--green)';
      msg.textContent = renamed ? '✓ 저장됨 (과정명 변경 반영)' : '✓ 저장되었습니다';
      setTimeout(() => { msg.textContent = ''; }, 3000);
    };
    if (renamed) {
      csSend('DELETE', {id: prevId}).then(() => done()).catch(() => done());
    } else done();
  }).catch(() => {
    btn.disabled = false; btn.textContent = '💾 저장';
    msg.style.color = 'var(--danger)'; msg.textContent = '저장 실패 — 서버 응답 오류';
  });
}

function crsUpload(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = '';
  const reader = new FileReader();
  reader.onload = e => {
    let data;
    try { data = JSON.parse(e.target.result); } catch { alert('JSON 파싱 오류: 올바른 파일인지 확인해주세요.'); return; }
    const modules = Array.isArray(data) ? data : (data.modules || null);
    if (!Array.isArray(modules) || !modules.length) { alert('모듈 배열이 없습니다. (배열 또는 {name, modules} 형식)'); return; }
    const name = (Array.isArray(data) ? '' : (data.name || '')) || (modules[0].category || '').trim();
    if (!name) { alert('과정명을 찾을 수 없습니다 — 모듈의 category 또는 name 필드가 필요합니다.'); return; }
    if (!confirm(`과정 "${name}" (${modules.length}단계)을 업로드합니다.\n같은 이름의 과정이 있으면 그 과정만 교체됩니다.\n\n계속하시겠습니까?`)) return;
    csSend('POST', {name, modules}).then(r => r.json()).then(d => {
      if (d.ok) { crsLoad(); alert(`✓ "${d.name}" ${d.count}단계 ${d.replaced ? '교체' : '등록'} 완료`); }
      else alert('업로드 실패: ' + (d.msg || ''));
    }).catch(() => alert('요청 실패'));
  };
  reader.readAsText(file);
}

/* ── 단계별 정답 코드 .py → ZIP 내보내기 (코드 테스트용) ──
   외부 라이브러리 없이 무압축(store) ZIP을 직접 만든다 */
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    t[i] = c >>> 0;
  }
  return t;
})();
function crc32(bytes) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
  return (c ^ 0xFFFFFFFF) >>> 0;
}

function makeZipBlob(files) {
  const enc = new TextEncoder();
  const parts = [], central = [];
  let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name);      // 파일명은 ASCII만 사용 (한글은 해제 도구별로 깨짐)
    const data = enc.encode(f.text);
    const crc = crc32(data);
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true);
    lh.setUint16(4, 20, true);
    lh.setUint16(6, 0x0800, true);        // UTF-8 플래그
    lh.setUint16(8, 0, true);             // 무압축(store)
    lh.setUint32(14, crc, true);
    lh.setUint32(18, data.length, true);
    lh.setUint32(22, data.length, true);
    lh.setUint16(26, name.length, true);
    parts.push(new Uint8Array(lh.buffer), name, data);

    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true);
    ch.setUint16(4, 20, true);
    ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true);
    ch.setUint32(16, crc, true);
    ch.setUint32(20, data.length, true);
    ch.setUint32(24, data.length, true);
    ch.setUint16(28, name.length, true);
    ch.setUint32(42, offset, true);
    central.push(new Uint8Array(ch.buffer), name);
    offset += 30 + name.length + data.length;
  }
  const centralSize = central.reduce((s, a) => s + a.length, 0);
  const eo = new DataView(new ArrayBuffer(22));
  eo.setUint32(0, 0x06054b50, true);
  eo.setUint16(8, files.length, true);
  eo.setUint16(10, files.length, true);
  eo.setUint32(12, centralSize, true);
  eo.setUint32(16, offset, true);
  return new Blob([...parts, ...central, new Uint8Array(eo.buffer)], {type: 'application/zip'});
}

/* 정답 텍스트 → 실행 가능한 파이썬 (LMS와 동일 규칙: 해설은 # 주석, 코드는 그대로) */
function answerToPy(text) {
  const marker = /^[ \t]*─+[^─\n]*전체 코드[^─\n]*─+[ \t]*$/m;
  let head = String(text || ''), code = '';
  const mm = head.match(marker);
  if (mm) {
    const at = head.indexOf(mm[0]);
    code = head.slice(at + mm[0].length);
    head = head.slice(0, at);
  }
  const commented = head.trim().split('\n').map(l => {
    const t = l.trim();
    if (t === '') return '#';
    return t.startsWith('#') ? l.trimEnd() : '# ' + l.trimEnd();
  }).join('\n');
  const body = code.trim();
  return body ? `${commented}\n\n${body}\n` : `${commented}\n`;
}

function crsExportPy(id) {
  fetch(`${COURSES_API}?id=${encodeURIComponent(id)}`).then(r => r.json()).then(d => {
    if (!d.ok || !d.course) { alert('과정을 불러오지 못했습니다: ' + (d.msg || '')); return; }
    const name = d.course.name || 'course';
    const mods = (d.course.modules || []).filter(m => (m.answer || '').trim());
    if (!mods.length) { alert('정답이 작성된 단계가 없습니다.'); return; }

    const files = mods.map((m, i) => ({
      name: `step${String(i + 1).padStart(2, '0')}.py`,
      text: `# ${name}\n# ${m.title || ''}\n`
          + `# ─ 정답 코드 (해설은 주석) · 1~${i + 1}단계 누적으로 단독 실행 가능\n\n`
          + answerToPy(m.answer),
    }));
    files.push({name: 'README.txt', text:
      `${name} — 단계별 정답 코드\n${'='.repeat(40)}\n\n`
      + mods.map((m, i) => `  step${String(i+1).padStart(2,'0')}.py  ${m.title || ''}`).join('\n')
      + `\n\n· 각 파일은 1~N단계 누적 코드로, 단독 실행됩니다.\n`
      + `· 실습 데이터 파일(CSV)을 같은 폴더에 두고 실행하세요.\n`
      + `· 해설은 # 주석으로 들어 있어 그대로 실행됩니다.\n`});

    const blob = makeZipBlob(files);
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `${name.replace(/[\\/:*?"<>|]/g, '').trim() || 'course'}.zip`,
    });
    a.click();
    URL.revokeObjectURL(a.href);
  }).catch(() => alert('요청 실패'));
}

function crsExport(id, btn) {
  fetch(`${COURSES_API}?id=${encodeURIComponent(id)}`).then(r => r.json()).then(d => {
    if (!d.ok) { alert('내보내기 실패: ' + (d.msg || '')); return; }
    const blob = new Blob([JSON.stringify(d.course, null, 2)], {type: 'application/json'});
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `${(d.course.name || 'course').replace(/[\\/:*?"<>|\s]+/g, '_')}.json`
    });
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

function crsDelete(id, name) {
  if (!confirm(`과정 "${name}"을(를) 삭제하시겠습니까?\n(커리큘럼에 이미 추가된 세션에는 영향 없음)`)) return;
  csSend('DELETE', {id}).then(r => r.json()).then(d => {
    if (d.ok) crsLoad();
    else alert('삭제 실패: ' + (d.msg || ''));
  }).catch(() => alert('요청 실패'));
}

let clFilterCat = '전체';
let clItems       = [];
let clEditId      = '';
let clAttachments = [];
let clExamples    = [];

function clRenderExamples() {
  const el = document.getElementById('cl-examples-list');
  if (!el) return;
  el.innerHTML = clExamples.map((ex,i) => `
    <div class="cf-example-item" data-cl-ei="${i}" style="margin-bottom:8px">
      <div class="cf-example-item-hd">
        <div class="cf-extype">
          <label><input type="radio" name="cl-extype-${i}" value="prompt"
            ${(ex.type||'prompt')!=='code'?'checked':''} onchange="clSyncExField(${i},'type','prompt')"> 프롬프트</label>
          <label><input type="radio" name="cl-extype-${i}" value="code"
            ${ex.type==='code'?'checked':''} onchange="clSyncExField(${i},'type','code')"> 코드</label>
        </div>
        <button class="cf-attach-rm" onclick="clRemoveExample(${i})" title="삭제">✕</button>
      </div>
      <textarea class="inp" rows="12"
        style="resize:vertical;line-height:1.7;font-family:'Space Mono',monospace;font-size:12px;background:#1e293b;border-color:rgba(255,255,255,.1);color:#e2e8f0"
        placeholder="${ex.type==='code'?'코드를 작성하세요...':'프롬프트를 작성하세요...'}"
        oninput="clSyncExField(${i},'content',this.value)">${escAdm(ex.content||'')}</textarea>
    </div>`).join('');
}

function clAddExample(type) {
  clExamples.push({type: type||'prompt', content: ''});
  clRenderExamples();
}

function clRemoveExample(i) {
  clExamples.splice(i, 1);
  clRenderExamples();
}

function clSyncExField(i, field, val) {
  if (!clExamples[i]) return;
  clExamples[i][field] = val;
  if (field === 'type') {
    const ta = document.querySelector(`.cf-example-item[data-cl-ei="${i}"] textarea`);
    if (ta) ta.placeholder = val === 'code' ? '코드를 작성하세요...' : '프롬프트를 작성하세요...';
  }
}

const CL_TOOLS = HUB_TOOLS;

function clToolIcons(tools) {
  return (tools||[]).map(tid => {
    const t = HUB_TOOLS.find(x => x.id === tid);
    return t ? t.icon : '';
  }).filter(Boolean).join(' ');
}

function clRenderToolsGrid(selected) {
  const grid = document.getElementById('cl-tools-grid');
  if (!grid) return;
  grid.innerHTML = HUB_TOOLS.map(t => t.group
    ? `<div class="tool-group-hd">${t.group}</div>`
    : `<label class="curric-tool-chk">
         <input type="checkbox" value="${t.id}" ${(selected||[]).includes(t.id)?'checked':''}>
         ${t.icon} ${t.label}
       </label>`).join('');
}

async function clAiGenerate() {
  const topic = document.getElementById('cl-ai-topic').value.trim();
  if (!topic) { alert('주제를 입력해주세요.'); return; }

  const statusEl = document.getElementById('cl-ai-status');
  const btn = document.querySelector('#tab-content .btn-accent');
  btn.disabled = true; btn.textContent = '생성 중...';
  statusEl.style.display = 'block';
  statusEl.textContent = '⏳ Ollama에 요청 중...';

  const prompt = `당신은 데이터 분석 교육 컨텐츠 작성 전문가입니다.
주제: "${topic}"

아래 JSON 형식으로만 응답하세요. 설명 없이 JSON만 출력하세요.

각 필드의 역할을 반드시 구분하세요:
- problem: 교육생이 스스로 풀어야 할 실습 문제 (정답 포함 금지)
- answer: problem의 정답과 해설만 작성 (교육 개념 설명 포함 금지)
- content: 주제에 대한 순수 개념 설명 (문제/정답 내용 포함 금지)

{
  "icon": "주제에 어울리는 이모지 1개",
  "title": "컨텐츠 제목 (20자 이내)",
  "desc": "한 줄 설명 (30자 이내)",
  "problem": "교육생이 직접 풀어야 할 실습 문제. 구체적인 상황과 조건 포함. 정답은 절대 포함하지 마세요. 3~5문장.",
  "answer": "위 problem의 정답 코드와 해설. 왜 이 방법을 쓰는지 설명 포함. 4~6문장.",
  "content": "주제 개념을 처음 배우는 사람을 위한 설명. 빈 줄로 단락 구분. 3~4단락. 문제나 정답 내용은 포함하지 마세요.",
  "examples": [
    {"type": "code", "content": "주제 관련 기본 사용법 파이썬 코드 예제 (문제 정답 코드가 아닌 개념 예제)"}
  ]
}`;

  try {
    const res = await fetch('https://mfg.flex-link.co.kr/ollama/api/generate', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({model: 'qwen2.5-coder:32b', prompt, stream: false, format: 'json'})

    });
    if (!res.ok) throw new Error(`Ollama 응답 오류 (${res.status})`);
    const data = await res.json();
    let parsed;
    try { parsed = JSON.parse(data.response); } catch { throw new Error('JSON 파싱 실패 — 모델 응답을 확인하세요'); }

    document.getElementById('cl-icon').value    = parsed.icon    || '';
    document.getElementById('cl-title').value   = parsed.title   || '';
    document.getElementById('cl-desc').value    = parsed.desc    || '';
    document.getElementById('cl-problem').value = parsed.problem || '';
    document.getElementById('cl-content').value = parsed.content || '';

    if (Array.isArray(parsed.examples) && parsed.examples.length) {
      clExamples = parsed.examples.map(ex => ({type: ex.type || 'code', content: ex.content || ''}));
      clRenderExamples();
    }

    const answerEl = document.getElementById('cl-answer');
    if (answerEl) answerEl.value = parsed.answer || '';

    statusEl.style.color = 'var(--green)';
    statusEl.textContent = '✓ 생성 완료 — 내용을 검토 후 저장하세요';
  } catch(e) {
    statusEl.style.color = 'var(--danger)';
    statusEl.textContent = '✗ ' + e.message + ' (Ollama가 실행 중인지 확인하세요)';
  } finally {
    btn.disabled = false; btn.textContent = '✨ 생성';
  }
}

function clExport() {
  fetch(CL_API).then(r => r.json()).then(items => {
    const blob = new Blob([JSON.stringify(items, null, 2)], {type: 'application/json'});
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(blob),
      download: `content_lib_${new Date().toISOString().slice(0,10)}.json`
    });
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

function clImport(input) {
  const file = input.files[0];
  if (!file) return;
  input.value = '';
  const reader = new FileReader();
  reader.onload = e => {
    let items;
    try { items = JSON.parse(e.target.result); } catch { alert('JSON 파싱 오류: 올바른 파일인지 확인해주세요.'); return; }
    if (!Array.isArray(items)) { alert('배열 형식의 JSON 파일이어야 합니다.'); return; }

    const cats = [...new Set(items.map(i => (i.category || '').trim()).filter(Boolean))];
    const catInfo = cats.length ? `\n포함 과정: ${cats.join(', ')}` : '';
    const append = confirm(
      `총 ${items.length}개 컨텐츠${catInfo}\n\n` +
      `[확인] 기존 라이브러리에 추가 — 권장 (여러 과정 공존)\n` +
      `[취소] 전체 교체로 진행할지 이어서 묻습니다`);

    if (!append && !confirm(`⚠ 전체 교체 모드\n기존 라이브러리를 전부 지우고 ${items.length}개로 대체합니다.\n(기존 데이터는 서버에 .bak으로 백업)\n\n정말 교체하시겠습니까?`)) return;

    clSend('PATCH', append ? {items, mode: 'append'} : {items}).then(r => r.json()).then(d => {
      if (d.ok) {
        clLoadAll();
        alert(append ? `✓ ${d.count}개 추가 완료 (라이브러리 전체 ${d.total}개)` : `✓ ${d.count}개로 교체 완료`);
      }
      else alert('가져오기 실패: ' + (d.msg || ''));
    }).catch(() => alert('요청 실패'));
  };
  reader.readAsText(file);
}

function clLoadAll() {
  if (!isAdmin) return;
  clRenderToolsGrid([]);
  fetch(CL_API).then(r => r.json()).then(items => {
    clItems = items;
    const cnt = document.getElementById('cl-count');
    if (cnt) cnt.textContent = items.length ? `(${items.length})` : '';
    clBuildCatTabs();
    clRenderList();
  }).catch(e => {
    const el = document.getElementById('cl-list');
    if (el) el.innerHTML = `<div style="color:var(--danger);font-size:12px">불러오기 실패: ${e.message}</div>`;
  });
}

function clBuildCatTabs() {
  const cats = ['전체', ...[...new Set(clItems.map(i => i.category).filter(Boolean))].sort()];
  const tabsEl = document.getElementById('cl-cat-tabs');
  if (tabsEl) {
    tabsEl.style.display = cats.length > 1 ? '' : 'none';
    tabsEl.innerHTML = cats.map(c =>
      `<button onclick="clSetCat('${escAdm(c)}')" style="
        font-size:11px;font-weight:700;padding:4px 12px;border-radius:4px;cursor:pointer;
        font-family:inherit;transition:all .15s;border:1px solid ${c === clFilterCat ? 'var(--accent)' : 'var(--border2)'};
        background:${c === clFilterCat ? 'var(--accent)' : 'transparent'};
        color:${c === clFilterCat ? '#fff' : 'var(--muted)'};
      ">${escAdm(c)}</button>`
    ).join('');
  }
  // datalist 업데이트
  const dl = document.getElementById('cl-cat-datalist');
  if (dl) dl.innerHTML = cats.slice(1).map(c => `<option value="${escAdm(c)}">`).join('');
}

function clSetCat(cat) {
  clFilterCat = cat;
  clBuildCatTabs();
  clRenderList();
}

function clRenderList() {
  const el = document.getElementById('cl-list');
  const filtered = clFilterCat === '전체' ? clItems : clItems.filter(i => (i.category || '') === clFilterCat);
  const cnt = document.getElementById('cl-count');
  if (cnt) cnt.textContent = clItems.length ? `(${filtered.length}/${clItems.length})` : '';
  if (!filtered.length) {
    el.innerHTML = clItems.length
      ? `<div class="empty">"${escAdm(clFilterCat)}" 카테고리에 컨텐츠가 없습니다</div>`
      : '<div class="empty">등록된 컨텐츠가 없습니다<br><span style="font-size:11px;display:block;margin-top:6px">아래 폼에서 새 컨텐츠를 추가해주세요</span></div>';
    return;
  }
  el.innerHTML = filtered.map(it =>
    `<div class="cl-item" onclick="clEdit('${it.id}')">
      <span class="cl-item-icon">${it.icon||'📄'}</span>
      <span class="cl-item-info">
        <span class="cl-item-title">${escAdm(it.title)}${it.category ? `<span style="font-size:9px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(37,99,235,.1);color:var(--accent);border:1px solid rgba(37,99,235,.2);margin-left:6px;vertical-align:middle">${escAdm(it.category)}</span>` : ''}</span>
        ${it.desc ? `<span class="cl-item-desc">${escAdm(it.desc)}</span>` : ''}
        ${(it.tools||[]).length ? `<span class="cl-item-tools">${clToolIcons(it.tools)}</span>` : ''}
      </span>
      <button class="btn btn-danger" style="font-size:11px;padding:5px 12px;flex-shrink:0"
        onclick="event.stopPropagation();clDelete('${it.id}')">삭제</button>
    </div>`).join('');
}

function clEdit(id) {
  const it = clItems.find(x => x.id === id);
  if (!it) return;
  clEditId = id;
  document.getElementById('cl-id').value      = id;
  document.getElementById('cl-icon').value     = it.icon     || '';
  document.getElementById('cl-title').value    = it.title    || '';
  document.getElementById('cl-desc').value     = it.desc     || '';
  document.getElementById('cl-category').value = it.category || '';
  document.getElementById('cl-problem').value = it.problem || '';
  document.getElementById('cl-content').value = it.content || '';
  const clAnswerEl = document.getElementById('cl-answer');
  if (clAnswerEl) clAnswerEl.value = it.answer || '';
  clExamples = JSON.parse(JSON.stringify(
    (it.examples && it.examples.length)
      ? it.examples
      : (it.example ? [{type: it.exampleType||'prompt', content: it.example}] : [])
  ));
  clRenderExamples();
  document.getElementById('cl-pdf-url').value       = it.pdfUrl  || '';
  document.getElementById('cl-pdf-orig-name').value = it.pdfName || '';
  const clPdfPrev = document.getElementById('cl-pdf-preview');
  const clPdfNm   = document.getElementById('cl-pdf-name');
  if (it.pdfUrl) {
    clPdfPrev.style.display = '';
    clPdfNm.textContent = it.pdfName || it.pdfUrl.split('/').pop();
  } else {
    clPdfPrev.style.display = 'none';
  }
  clAttachments = JSON.parse(JSON.stringify(it.attachments || []));
  renderClAttachList();
  clRenderToolsGrid(it.tools || []);
  document.getElementById('cl-form-title').textContent = '컨텐츠 수정';
  document.getElementById('cl-edit-badge').style.display = '';
  document.getElementById('cl-cancel-btn').style.display = '';
  const panel = document.getElementById('tab-content');
  if (panel) panel.scrollIntoView({behavior:'smooth',block:'start'});
}

function clCancel() {
  clEditId = '';
  ['cl-id','cl-icon','cl-title','cl-desc','cl-category','cl-problem','cl-content','cl-pdf-url','cl-pdf-orig-name'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  clExamples = [];
  clRenderExamples();
  const clPp = document.getElementById('cl-pdf-preview');
  if (clPp) clPp.style.display = 'none';
  clAttachments = [];
  renderClAttachList();
  clRenderToolsGrid([]);
  document.getElementById('cl-form-title').textContent = '새 컨텐츠 추가';
  document.getElementById('cl-edit-badge').style.display = 'none';
  document.getElementById('cl-cancel-btn').style.display = 'none';
  const msg = document.getElementById('cl-msg');
  if (msg) msg.style.display = 'none';
}

function clGetTools() {
  return [...document.querySelectorAll('#cl-tools-grid input:checked')].map(e => e.value);
}

function clSave() {
  const title = document.getElementById('cl-title').value.trim();
  const msg   = document.getElementById('cl-msg');
  msg.style.display = 'none';
  if (!title) {
    msg.className = 'msg err'; msg.style.display = 'block';
    msg.textContent = '제목을 입력해주세요'; return;
  }
  const data = {
    icon:        document.getElementById('cl-icon').value.trim() || '📄',
    title,
    category:    document.getElementById('cl-category').value.trim(),
    desc:        document.getElementById('cl-desc').value.trim(),
    problem:     document.getElementById('cl-problem').value.trim(),
    answer:      (document.getElementById('cl-answer')?.value || '').trim(),
    content:     document.getElementById('cl-content').value.trim(),
    pdfUrl:      document.getElementById('cl-pdf-url').value.trim(),
    pdfName:     document.getElementById('cl-pdf-orig-name').value.trim(),
    examples:    clExamples.filter(ex => ex.content.trim()),
    tools:       clGetTools(),
    attachments: clAttachments,
  };
  const isEdit = !!clEditId;
  if (isEdit) data.id = clEditId;
  clSend(isEdit ? 'PUT' : 'POST', data).then(r => r.json()).then(d => {
    msg.style.display = 'block';
    if (d.ok) {
      msg.className = 'msg ok';
      msg.textContent = isEdit ? '수정되었습니다' : '추가되었습니다';
      clCancel();
      clLoadAll();
    } else {
      msg.className = 'msg err';
      msg.textContent = d.msg || '저장 실패';
    }
    setTimeout(() => { msg.style.display = 'none'; }, 3000);
  }).catch(e => {
    msg.style.display = 'block';
    msg.className = 'msg err';
    msg.textContent = '저장 요청 실패: ' + e.message;
  });
}

function clDelete(id) {
  if (!confirm('이 컨텐츠를 삭제하시겠습니까?')) return;
  clSend('DELETE', {id}).then(r => r.json()).then(d => {
    if (!d.ok) { alert('삭제 실패: ' + (d.msg || '')); return; }
    clLoadAll();
  }).catch(e => alert('삭제 요청 실패: ' + e.message));
}

/* ── 라이브러리 선택기 (교육 과정 편집용) ── */
let libPickerItems = [];
let libPickerCourses = [];

function openLibPicker() {
  document.getElementById('lib-picker').classList.add('open');
  const body = document.getElementById('lib-picker-body');
  body.innerHTML = '<div class="lib-picker-empty">불러오는 중...</div>';
  // 과정(courses)은 통째 단위로만 추가 — 개별 단계 나열 없음. 개별 컨텐츠(content_lib)는 그대로
  Promise.all([
    fetch(CL_API).then(r => r.json()).catch(() => []),
    fetch(COURSES_API).then(r => r.json()).catch(() => []),
  ]).then(([libItems, courses]) => {
    libPickerItems   = Array.isArray(libItems) ? libItems : [];
    libPickerCourses = Array.isArray(courses)  ? courses  : [];

    if (!libPickerItems.length && !libPickerCourses.length) {
      body.innerHTML = '<div class="lib-picker-empty">📚 등록된 과정/컨텐츠가 없습니다.<br><br>' +
        '<strong>📦 과정 관리</strong> 탭에서 과정 JSON을 업로드하거나<br>' +
        '<strong>📚 컨텐츠 라이브러리</strong> 탭에서 컨텐츠를 추가하세요.</div>';
      return;
    }

    const courseRows = libPickerCourses.map((c, ci) => `
      <div class="lib-picker-item" style="border-color:rgba(99,102,241,.35);background:rgba(99,102,241,.05)">
        <span class="lib-picker-icon">📦</span>
        <span class="lib-picker-info">
          <span class="lib-picker-name">${escAdm(c.name)}</span>
          <span class="lib-picker-desc">${c.count}단계 — 전체 단계가 순서대로 한 번에 추가됩니다</span>
        </span>
        <button class="lib-picker-btn" onclick="addCourseFromLib(${ci})">+ 과정 추가</button>
      </div>`).join('');

    const itemRows = libPickerItems.map((it, i) => {
      const icons = clToolIcons(it.tools);
      return `<div class="lib-picker-item">
        <span class="lib-picker-icon">${it.icon||'📄'}</span>
        <span class="lib-picker-info">
          <span class="lib-picker-name">${escAdm(it.title)}</span>
          ${it.desc ? `<span class="lib-picker-desc">${escAdm(it.desc)}</span>` : ''}
          ${icons ? `<span class="lib-picker-tools">${icons}</span>` : ''}
        </span>
        <button class="lib-picker-btn" onclick="addFromLib(${i})">+ 추가</button>
      </div>`;
    }).join('');

    body.innerHTML =
      (courseRows ? `<div class="lib-picker-group-name" style="padding:2px 4px 8px">📦 과정</div>${courseRows}` : '') +
      (itemRows ? `<div class="lib-picker-group-name" style="padding:${courseRows ? '14px' : '2px'} 4px 8px">📚 개별 컨텐츠</div>${itemRows}` : '');
  });
}

function closeLibPicker() {
  document.getElementById('lib-picker').classList.remove('open');
}

function libItemToModule(it) {
  return {
    id:          'mod_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    order:       currModules.length,
    icon:        it.icon || '📄',
    title:       it.title || '',
    desc:        it.desc || '',
    category:    it.category || '',   // 과정 그룹 식별자 — LMS 사이드바 그룹핑에 사용
    problem:     it.problem || '',
    answer:      it.answer  || '',
    content:     it.content || '',
    pdfUrl:      it.pdfUrl || '',
    pdfName:     it.pdfName || '',
    examples:    JSON.parse(JSON.stringify(
                   (it.examples && it.examples.length)
                     ? it.examples
                     : (it.example ? [{type: it.exampleType||'prompt', content: it.example}] : [])
                 )),
    tools:       [...(it.tools || [])],
    attachments: JSON.parse(JSON.stringify(it.attachments || [])),
  };
}

function addFromLib(i) {
  const it = libPickerItems[i];
  if (!it) return;
  currModules.push(libItemToModule(it));
  currModIdx = currModules.length - 1;
  currSelCourse = -1;
  closeLibPicker();
  renderCurricList();
  renderCurricForm();
}

/* 과정 파일 전체를 순서대로 커리큘럼에 추가 — 과정은 항상 통째 단위로 운영 */
function addCourseFromLib(ci) {
  const c = libPickerCourses[ci];
  if (!c) return;
  fetch(`${COURSES_API}?id=${encodeURIComponent(c.id)}`).then(r => r.json()).then(d => {
    if (!d.ok || !Array.isArray(d.course?.modules)) { alert('과정을 불러오지 못했습니다: ' + (d.msg || '')); return; }
    const firstIdx = currModules.length;
    d.course.modules.forEach(it => currModules.push(libItemToModule(it)));
    currModules.forEach((m, i) => { m.order = i; });
    currSelCourse = firstIdx;   // 추가된 과정을 요약 화면으로 선택
    currModIdx = -1;
    closeLibPicker();
    renderCurricList();
    renderCurricForm();
  }).catch(() => alert('요청 실패'));
}

/* ══════════════════════════════════════
   DB 관리
══════════════════════════════════════ */
function loadStats(){
  if(!isAdmin) return;
  fetch('',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'action=stats'})
  .then(r=>r.json()).then(d=>{
    const grid=document.getElementById('stats-grid');
    if(!d.ok){grid.innerHTML=`<span style="color:var(--danger)">${d.msg}</span>`;return;}
    grid.innerHTML=Object.entries(d.stats).map(([n,s])=>`
      <div class="db-stat-box">
        <div class="db-stat-num">${s.count>=0?s.count.toLocaleString():'—'}</div>
        <div class="db-stat-name">${n}</div>
        <div class="db-stat-last">${s.error||(s.last?'최근: '+s.last:'데이터 없음')}</div>
      </div>`).join('');
  });
}

function runSetup(){
  const msg=document.getElementById('setup-msg'); msg.style.display='none';
  fetch('',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'action=db_setup'})
  .then(r=>r.json()).then(d=>{
    msg.style.display='block'; msg.className=d.ok?'msg ok':'msg err';
    msg.textContent=d.ok?'완료: '+d.tables.join(', ')+' 생성됨':'오류: '+d.msg;
    if(d.ok) loadStats();
  });
}

function truncateTable(t){
  if(!confirm(`"${t}" 테이블의 모든 데이터를 삭제하시겠습니까?`)) return;
  const msg=document.getElementById('truncate-msg');
  fetch('',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'action=truncate&table='+t})
  .then(r=>r.json()).then(d=>{
    msg.style.display='block'; msg.className=d.ok?'msg ok':'msg err';
    msg.textContent=d.ok?t+' 초기화 완료':'오류: '+d.msg;
    if(d.ok) loadStats();
  });
}

/* ══════════════════════════════════════
   데이터 통계 (스트림 탭)
══════════════════════════════════════ */
const DS_COLORS = {sensor:'#00d4ff', alarm:'#ff4444', quality:'#ff6b35', energy:'#39ff14'};
const DS_LABELS = {sensor:'공정 센서', alarm:'알람/이벤트', quality:'품질 측정', energy:'에너지'};

function admLoadStats(){
  fetch('',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'action=stats'})
  .then(r=>r.json()).then(d=>{
    if(!d.ok) return;
    let total=0;
    Object.values(d.stats).forEach(s=>{if(s.count>0)total+=s.count;});
    document.getElementById('ds-total').textContent = total>0?total.toLocaleString()+' 행':'0 행';

    ['sensor','alarm','quality','energy'].forEach(k=>{
      const s=d.stats['mfg_'+k]||{};
      const n=s.count??-1;
      const c=DS_COLORS[k];
      const numEl=document.getElementById('ds-'+k);
      const subEl=document.getElementById('ds-'+k+'-pct');
      const box=document.getElementById('ds-box-'+k);
      numEl.textContent = n>=0 ? n.toLocaleString() : '—';
      numEl.style.color = n>0 ? c : 'var(--dim)';
      if(n>0){
        const pct=total>0?Math.round(n/total*100):0;
        subEl.textContent=pct+'% of total';
        subEl.style.color=c;
        box.style.borderColor=c;
        box.style.background=c+'12';
      } else {
        subEl.textContent=n===0?'데이터 없음':'테이블 없음';
        subEl.style.color='var(--dim)';
        box.style.borderColor='var(--border)';
        box.style.background='';
      }
    });

    // 비율 바
    const bar=document.getElementById('ds-bar');
    const legend=document.getElementById('ds-bar-legend');
    if(total>0){
      bar.innerHTML=['sensor','alarm','quality','energy'].map(k=>{
        const n=(d.stats['mfg_'+k]?.count||0);
        const pct=n/total*100;
        return `<div style="width:${pct}%;background:${DS_COLORS[k]};min-width:${pct>0?2:0}px" title="${DS_LABELS[k]}: ${n.toLocaleString()}행"></div>`;
      }).join('');
      legend.innerHTML=['sensor','alarm','quality','energy'].map(k=>{
        const n=(d.stats['mfg_'+k]?.count||0);
        return n>0?`<span style="color:${DS_COLORS[k]}">■ ${DS_LABELS[k]} ${n.toLocaleString()}</span>`:'';
      }).filter(Boolean).join('');
    }
  }).catch(()=>{});
}

/* ══════════════════════════════════════
   스트리밍 제어
══════════════════════════════════════ */
const ADM_PRESETS = {
  normal:      {alarmRate:3,  warningRate:5,  defectRate:3,  spikeRate:0,  missingRate:0},
  crisis:      {alarmRate:30, warningRate:20, defectRate:15, spikeRate:15, missingRate:5},
  degradation: {alarmRate:10, warningRate:20, defectRate:8,  spikeRate:5,  missingRate:3},
  maintenance: {alarmRate:5,  warningRate:10, defectRate:5,  spikeRate:0,  missingRate:2},
};

const SENSOR_COL_LABELS_ADM = {
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
};

const SENSOR_COLS_BY_PROCESS = {
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
};

const TOPIC_COLUMNS = {
  alarm: [
    {id:'alarm_type',  label:'알람 유형',   checked:true},
    {id:'severity',    label:'심각도',      checked:true},
    {id:'value',       label:'측정값',      checked:true},
    {id:'ack',         label:'확인 여부',   checked:false},
  ],
  quality: [
    {id:'product_id',  label:'제품 ID',    checked:true},
    {id:'line_id',     label:'라인 ID',    checked:true},
    {id:'m1',          label:'측정값 1',   checked:true},
    {id:'m2',          label:'측정값 2',   checked:true},
    {id:'result',      label:'결과(OK/NG)', checked:true},
  ],
  energy: [
    {id:'meter_id',      label:'미터 ID',     checked:true},
    {id:'power_kw',      label:'전력 (kW)',   checked:true},
    {id:'voltage_v',     label:'전압 (V)',    checked:true},
    {id:'pf',            label:'역률',        checked:true},
    {id:'frequency_hz',  label:'주파수 (Hz)', checked:true},
  ],
};

const adm = {running:false,interval:null,batchTimer:null,msgCount:0,batch:[],prevVals:new Map(),statsTimer:null,dbSave:true};

function syncSlider(key, val) {
  document.getElementById('adm-'+key).value = val;
  const valEl = document.getElementById('adm-'+key+'-val');
  if (valEl) valEl.textContent = val + '%';
  updateAnomalySummary();
}

function updateAnomalySummary() {
  const v = k => +document.getElementById('adm-'+k+'-rate').value||0;
  document.getElementById('anomaly-summary').textContent =
    `알람 ${v('alarm')}% · 경고 ${v('warning')}% · 불량 ${v('defect')}% · 스파이크 ${v('spike')}% · 누락 ${v('missing')}%`;
}

function renderColumnSelector() {
  const topic   = document.getElementById('adm-topic').value;
  const process = document.getElementById('adm-process').value;

  let cols;
  if (topic === 'sensor') {
    const ids = SENSOR_COLS_BY_PROCESS[process] || SENSOR_COLS_BY_PROCESS.automotive;
    cols = ids.map((id, i) => ({ id, label: SENSOR_COL_LABELS_ADM[id] || id, checked: i < 6 }));
  } else {
    cols = TOPIC_COLUMNS[topic] || [];
  }

  const grid = document.getElementById('col-selector');
  grid.innerHTML = cols.map(c => `
    <div class="col-card ${c.checked?'checked':''}" onclick="toggleCol(this,'${c.id}')">
      <input type="checkbox" id="col-${c.id}" ${c.checked?'checked':''} onclick="event.stopPropagation();toggleCol(this.closest('.col-card'),'${c.id}')">
      <div><div class="col-name">${c.label}</div><div class="col-id">${c.id}</div></div>
    </div>`).join('');
  updateColBadge();
}

function toggleCol(card, id) {
  const cb = document.getElementById('col-'+id);
  if (!cb) return;
  cb.checked = !cb.checked;
  card.classList.toggle('checked', cb.checked);
  updateColBadge();
}

function updateColBadge() {
  const checked = document.querySelectorAll('#col-selector input[type=checkbox]:checked').length;
  const total   = document.querySelectorAll('#col-selector input[type=checkbox]').length;
  document.getElementById('col-count-badge').textContent = `(${checked}개)`;
}

function getSelectedCols() {
  return Array.from(document.querySelectorAll('#col-selector input[type=checkbox]:checked')).map(cb=>cb.id.replace('col-',''));
}

function admApplyScenario(s) {
  const p = ADM_PRESETS[s] || ADM_PRESETS.normal;
  ['alarm','warning','defect','spike','missing'].forEach(k => {
    const v = p[k+'Rate'];
    document.getElementById('adm-'+k+'-rate').value = v;
    document.getElementById('adm-'+k+'-rate-range').value = v;
    const valEl = document.getElementById('adm-'+k+'-rate-val');
    if (valEl) valEl.textContent = v + '%';
  });
  document.querySelectorAll('.scenario-btn').forEach(b => b.classList.remove('active'));
  const active = document.querySelector(`.scenario-btn.s-${s}`);
  if (active) active.classList.add('active');
  updateAnomalySummary();
}

function admReadConfig() {
  return {
    topic:   document.getElementById('adm-topic').value,
    process: document.getElementById('adm-process').value,
    diff:    document.getElementById('adm-difficulty').value,
    rate:    +document.getElementById('adm-rate').value||1,
    infinite:document.getElementById('adm-infinite').checked,
    target:  +document.getElementById('adm-count').value||500,
    dbSave:  document.getElementById('adm-db-save').checked,
    columns: getSelectedCols(),
    anomaly: {
      alarmRate:  +document.getElementById('adm-alarm-rate').value,
      warningRate:+document.getElementById('adm-warning-rate').value,
      defectRate: +document.getElementById('adm-defect-rate').value,
      spikeRate:  +document.getElementById('adm-spike-rate').value,
      missingRate:+document.getElementById('adm-missing-rate').value,
    },
  };
}

function admApplyConfig(cfg) {
  if (!cfg) return;
  if (cfg.topic)   { document.getElementById('adm-topic').value = cfg.topic; renderColumnSelector(); }
  if (cfg.process) document.getElementById('adm-process').value = cfg.process;
  if (cfg.diff)    { document.getElementById('adm-difficulty').value = cfg.diff; setDifficulty(cfg.diff); }
  if (cfg.rate)    document.getElementById('adm-rate').value    = cfg.rate;
  document.getElementById('adm-infinite').checked = cfg.infinite !== false;
  if (cfg.target)  document.getElementById('adm-count').value  = cfg.target;
  document.getElementById('adm-db-save').checked = cfg.dbSave !== false;
  if (cfg.anomaly) {
    ['alarm','warning','defect','spike','missing'].forEach(k => {
      const v = cfg.anomaly[k+'Rate'] ?? 0;
      document.getElementById('adm-'+k+'-rate').value       = v;
      document.getElementById('adm-'+k+'-rate-range').value = v;
      const valEl = document.getElementById('adm-'+k+'-rate-val');
      if (valEl) valEl.textContent = v + '%';
    });
    updateAnomalySummary();
  }
  if (cfg.columns && cfg.columns.length) {
    document.querySelectorAll('#col-selector .col-card').forEach(card => {
      const cb = card.querySelector('input[type=checkbox]');
      if (!cb) return;
      const colId = cb.id.replace('col-','');
      const on = cfg.columns.includes(colId);
      cb.checked = on;
      card.classList.toggle('checked', on);
    });
    updateColBadge();
  }
}

function admStartStream(cfg){
  if (!cfg) cfg = admReadConfig();
  const topic    = cfg.topic;
  const process  = cfg.process;
  const diff     = cfg.diff;
  const rate     = cfg.rate;
  const infinite = cfg.infinite;
  const target   = cfg.target;
  const dbSave   = cfg.dbSave;
  const anomaly  = cfg.anomaly || {
    alarmRate:  +document.getElementById('adm-alarm-rate').value,
    warningRate:+document.getElementById('adm-warning-rate').value,
    defectRate: +document.getElementById('adm-defect-rate').value,
    spikeRate:  +document.getElementById('adm-spike-rate').value,
    missingRate:+document.getElementById('adm-missing-rate').value,
  };
  adm.msgCount=0; adm.prevVals=new Map(); adm.running=true; adm.dbSave=dbSave;
  admRender();
  fetch(BASE_URL+'/api/stream_state.php',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action:'start',topic,rate,dbEnabled:dbSave,config:cfg})}).catch(()=>{});
  document.getElementById('adm-stream-log').innerHTML='';
  const ms=Math.max(50,1000/rate);
  adm.interval=setInterval(()=>{
    if(!adm.running) return;
    if(!infinite&&adm.msgCount>=target){admStopStream();return;}
    const msg=generateStreamMsg(topic,adm.msgCount,anomaly,process,getSelectedCols(),diff,adm.prevVals);
    adm.msgCount++; adm.batch.push(msg);
    const logEl=document.getElementById('adm-stream-log');
    const line=document.createElement('div');
    const sc=msg.status==='ALARM'?'var(--danger)':msg.status==='WARNING'?'var(--warning)':msg.result==='NG'?'var(--danger)':'var(--green)';
    line.innerHTML=`<span style="color:var(--dim)">${new Date().toLocaleTimeString()}</span> <span style="color:${sc}">${JSON.stringify(msg)}</span>`;
    logEl.appendChild(line);
    if(logEl.children.length>200) logEl.removeChild(logEl.firstChild);
    logEl.scrollTop=logEl.scrollHeight;
    admRender();
    if(!adm.batchTimer) adm.batchTimer=setTimeout(()=>{admFlush();adm.batchTimer=null;},3000);
  },ms);
  adm.statsTimer=setInterval(admLoadStats,5000);
}

function admStopStream(){
  clearInterval(adm.interval); clearTimeout(adm.batchTimer); clearInterval(adm.statsTimer);
  adm.interval=adm.batchTimer=adm.statsTimer=null; adm.running=false;
  if(adm.batch.length) admFlush();
  fetch(BASE_URL+'/api/stream_state.php',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action:'stop'})}).catch(()=>{});
  admRender();
  setTimeout(admLoadStats,1000);
}

function admFlush(){
  if(!adm.batch.length) return;
  const rawMsgs=[...adm.batch]; adm.batch=[];
  const topic=document.getElementById('adm-topic').value;
  // 선택된 컬럼만 포함 (항상 포함할 필드 + 선택 컬럼)
  const selectedCols = getSelectedCols();
  const ALWAYS = ['timestamp','equipment_id','factory_id','line_id','process_type','process_status','status','result','maintenance_label','meter_id','product_id'];
  const msgs = selectedCols.length
    ? rawMsgs.map(row => {
        const out = {};
        [...ALWAYS, ...selectedCols].forEach(k => { if (k in row) out[k] = row[k]; });
        return out;
      })
    : rawMsgs;
  fetch(BASE_URL+'/api/stream_state.php',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action:'broadcast',msgs,msgCount:adm.msgCount,topic})}).catch(()=>{});
  // DB 저장
  if(adm.dbSave){
    const statusEl=document.getElementById('adm-db-status');
    fetch(BASE_URL+'/api/db_write.php',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({topic,rows:msgs})})
    .then(r=>r.json())
    .then(d=>{
      if(statusEl) statusEl.textContent=d.ok?'+'+d.written+'행':'오류';
      if(statusEl) statusEl.style.color=d.ok?'var(--green)':'var(--danger)';
    })
    .catch(()=>{if(statusEl){statusEl.textContent='오류';statusEl.style.color='var(--danger)';}});
  }
}

function admRender(){
  const r=adm.running;
  document.getElementById('adm-pulse').className='pulse '+(r?'on':'off');
  document.getElementById('adm-status-text').textContent=r?'STREAMING':'STOPPED';
  document.getElementById('adm-status-text').style.color=r?'var(--green)':'var(--dim)';
  document.getElementById('adm-msg-count').textContent=adm.msgCount.toLocaleString()+' msg';
  document.getElementById('adm-btn-start').disabled=r;
  document.getElementById('adm-btn-stop').disabled=!r;
  const badge=document.getElementById('adm-session-badge');
  badge.style.display=r?'inline-flex':'none';
  document.getElementById('adm-session-count').textContent=adm.msgCount.toLocaleString();
  document.getElementById('adm-log-count').textContent=r?adm.msgCount.toLocaleString()+' msg':'';
}

/* ── 난이도 선택 ── */
const DIFF_INFO = {
  easy:   {color:'#39ff14', hint:'✅ <strong style="color:#39ff14">Easy</strong> — 임계값으로 탐지 가능한 단순 스파이크/드리프트. 초보자 실습용.'},
  medium: {color:'#00d4ff', hint:'📈 <strong style="color:#00d4ff">Medium</strong> — AR(1) 자기상관 노이즈 (65% 이전값 반영). 시계열 분석 실습에 적합.'},
  hard:   {color:'#ffaa00', hint:'⚡ <strong style="color:#ffaa00">Hard</strong> — 비정상 분산 + 레짐 스위칭 8구간. 고급 이상탐지 모델 훈련용.'},
  expert: {color:'#ff4444', hint:'🔴 <strong style="color:#ff4444">Expert</strong> — 점진적 열화 드리프트 + 라벨 노이즈 5%. 예지보전 ML 연구용.'},
};

function setDifficulty(d) {
  document.getElementById('adm-difficulty').value = d;
  document.querySelectorAll('.diff-card').forEach(c => c.classList.toggle('active', c.dataset.diff === d));
  document.getElementById('diff-hint').innerHTML = DIFF_INFO[d].hint;
}

/* ══════════════════════════════════════
   트래픽 대시보드
══════════════════════════════════════ */
let _tfChart = null;

function loadTraffic() {
  if (!isAdmin) return;
  fetch(BASE_URL + '/api/traffic_stats.php')
    .then(r => r.json())
    .then(d => {
      if (!d.ok) { console.error('traffic_stats:', d.msg); return; }

      // KPI
      const t = d.totals;
      document.getElementById('tf-today-v').textContent  = (t.today_visits  ?? 0).toLocaleString();
      document.getElementById('tf-today-u').textContent  = (t.today_unique  ?? 0).toLocaleString();
      document.getElementById('tf-week-v').textContent   = (t.week_visits   ?? 0).toLocaleString();
      document.getElementById('tf-month-v').textContent  = (t.month_visits  ?? 0).toLocaleString();

      // 일별 차트 — 마지막 30일 날짜 전체 채우기
      const dateMap = {};
      (d.daily || []).forEach(r => { dateMap[r.date] = r; });
      const labels = [], visits = [], uniques = [];
      for (let i = 29; i >= 0; i--) {
        const dt = new Date(Date.now() - i * 86400000).toLocaleDateString('sv-SE');
        labels.push(dt.slice(5)); // MM-DD
        visits.push(parseInt(dateMap[dt]?.visits  || 0));
        uniques.push(parseInt(dateMap[dt]?.unique  || 0));
      }

      const ctx = document.getElementById('tf-daily-chart').getContext('2d');
      if (_tfChart) _tfChart.destroy();
      _tfChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            { label: '총 방문수', data: visits,  backgroundColor: 'rgba(2,132,199,.5)',  borderColor: '#0284c7', borderWidth: 1 },
            { label: '순방문자', data: uniques, backgroundColor: 'rgba(22,163,74,.35)', borderColor: '#16a34a', borderWidth: 1 },
          ]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { labels: { color: '#64748b', font: { size: 11 } } } },
          scales: {
            x: { ticks: { color: '#64748b', font: { size: 9 }, maxRotation: 45 }, grid: { color: '#e2e8f0' } },
            y: { ticks: { color: '#64748b', font: { size: 10 } }, grid: { color: '#e2e8f0' }, beginAtZero: true }
          }
        }
      });

      // 서비스별
      const svcs = d.services || [];
      const maxV = svcs.reduce((m, s) => Math.max(m, parseInt(s.visits)), 1);
      const svcHTML = svcs.length
        ? svcs.map(s => `
          <div class="tf-svc-box">
            <div class="tf-svc-name">${s.service}</div>
            <div class="tf-svc-bar-bg"><div class="tf-svc-bar" style="width:${Math.round(parseInt(s.visits)/maxV*100)}%"></div></div>
            <div class="tf-svc-nums">${parseInt(s.visits).toLocaleString()} 방문 / ${parseInt(s.unique).toLocaleString()} 순</div>
          </div>`).join('')
        : '<div style="color:var(--dim);font-size:12px">데이터 없음</div>';
      document.getElementById('tf-svc-grid').innerHTML = svcHTML;

      // 최근 로그
      const rows = (d.recent || []).map(r => {
        const ts = r.ts ? r.ts.replace('T',' ').slice(0,19) : '';
        const newBadge = parseInt(r.is_new_visitor) ? '<span class="tf-new">NEW</span>' : '';
        const ip = r.ip_addr || '—';
        return `<tr>
          <td style="font-family:'Space Mono',monospace;color:var(--dim);white-space:nowrap">${ts}</td>
          <td><span class="tf-tag">${r.service||'—'}</span></td>
          <td style="color:var(--dim);max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.page_path||'—'}</td>
          <td style="font-family:'Space Mono',monospace;font-size:11px;color:var(--dim);white-space:nowrap">${ip}</td>
          <td>${newBadge}</td>
        </tr>`;
      }).join('');
      document.getElementById('tf-recent-body').innerHTML =
        rows || '<tr><td colspan="5" style="text-align:center;color:var(--dim);padding:24px">방문 기록이 없습니다</td></tr>';
    })
    .catch(e => console.error('loadTraffic:', e));
}

/* ══════════════════════════════════════
   프롬프트 관리
══════════════════════════════════════ */
let _pCategories = [];
let _pItems      = [];

async function pLoadAll() {
  try {
    const r = await fetch(BASE_URL + '/api/prompt_lib.php?action=all');
    const d = await r.json();
    if (!d.ok) throw new Error(d.msg);
    _pCategories = d.categories || [];
    _pItems      = d.items      || [];
    pRenderStats();
    pRenderCatList();
    renderCatSelects();
    renderPromptList();
  } catch(e) {
    console.error('pLoadAll:', e);
  }
}

function pRenderStats() {
  document.getElementById('p-stat-total').textContent    = _pItems.length;
  document.getElementById('p-stat-cats').textContent     = _pCategories.length;
  document.getElementById('p-stat-featured').textContent = _pItems.filter(it=>parseInt(it.is_featured)).length;
}

function pRenderCatList() {
  const el = document.getElementById('p-cat-list');
  if (!_pCategories.length) {
    el.innerHTML = '<div class="empty" style="padding:24px 12px;font-size:12px">등록된 카테고리가 없습니다</div>';
    return;
  }
  const catMap = {};
  _pItems.forEach(it => { catMap[it.category_id] = (catMap[it.category_id]||0)+1; });
  el.innerHTML = _pCategories.map(c => `
    <div style="display:flex;align-items:center;gap:10px;padding:9px 12px;
         background:var(--bg);border:1px solid var(--border);border-radius:4px;margin-bottom:8px">
      <span style="font-size:18px;flex-shrink:0">${pEsc(c.icon)}</span>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:var(--text)">${pEsc(c.name)}</div>
        ${c.description ? `<div style="font-size:11px;color:var(--dim)">${pEsc(c.description)}</div>` : ''}
      </div>
      <span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--accent)">${catMap[c.id]||0}개</span>
      <button onclick="pDeleteCategory(${c.id},'${pEsc(c.name)}')"
        class="btn btn-danger" style="font-size:11px;padding:4px 10px">삭제</button>
    </div>`).join('');
}

function renderCatSelects() {
  const opts = _pCategories.map(c =>
    `<option value="${c.id}">${pEsc(c.icon)} ${pEsc(c.name)}</option>`).join('');
  document.getElementById('pp-cat').innerHTML =
    '<option value="">카테고리 선택</option>' + opts;
  document.getElementById('p-filter-cat').innerHTML =
    '<option value="">전체 카테고리</option>' + opts;
}

function renderPromptList() {
  const el    = document.getElementById('p-prompt-list');
  const catId = document.getElementById('p-filter-cat').value;
  const list  = catId ? _pItems.filter(it => String(it.category_id) === catId) : _pItems;
  const catMap= {};
  _pCategories.forEach(c => { catMap[c.id] = c; });

  if (!list.length) {
    el.innerHTML = '<div class="empty" style="padding:24px 12px;font-size:12px">프롬프트가 없습니다</div>';
    return;
  }
  const diffLabel = {easy:'기초',medium:'중급',hard:'고급'};
  const diffColor = {easy:'var(--green)',medium:'var(--accent)',hard:'var(--danger)'};

  el.innerHTML = list.map(it => {
    const cat = catMap[it.category_id];
    const preview = (it.content||'').slice(0,80) + ((it.content||'').length>80?'…':'');
    return `
    <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;
         background:var(--bg);border:1px solid var(--border);border-radius:4px;margin-bottom:8px">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:3px">
          ${parseInt(it.is_featured)
            ? '<span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:3px;background:rgba(217,119,6,.1);color:var(--warning);border:1px solid var(--warning)">★ 추천</span>'
            : ''}
          <span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:3px;
               background:rgba(0,0,0,.05);color:${diffColor[it.difficulty||'medium']}">
            ${diffLabel[it.difficulty||'medium']}
          </span>
          ${cat ? `<span style="font-size:10px;color:var(--dim)">${pEsc(cat.icon)} ${pEsc(cat.name)}</span>` : ''}
        </div>
        <div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:2px">${pEsc(it.title)}</div>
        <div style="font-size:11px;color:var(--dim);font-family:'Space Mono',monospace;
             line-height:1.5;word-break:break-all">${pEsc(preview)}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">
        <button onclick="pEditPrompt(${it.id})"
          class="btn btn-ghost" style="font-size:11px;padding:4px 10px">수정</button>
        <button onclick="pDeletePrompt(${it.id},'${pEsc(it.title)}')"
          class="btn btn-danger" style="font-size:11px;padding:4px 10px">삭제</button>
      </div>
    </div>`;
  }).join('');
}

/* ── Category CRUD ── */
async function pAddCategory() {
  const name = document.getElementById('pc-name').value.trim();
  if (!name) { pMsg('pc-msg','이름을 입력하세요','err'); return; }
  const body = {
    action: 'add_category',
    name,
    icon: document.getElementById('pc-icon').value.trim() || '💡',
    description: document.getElementById('pc-desc').value.trim(),
    sort_order: parseInt(document.getElementById('pc-sort').value)||0
  };
  const r = await fetch(BASE_URL+'/api/prompt_lib.php',{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)
  });
  const d = await r.json();
  if (d.ok) {
    pMsg('pc-msg','카테고리 추가 완료','ok');
    document.getElementById('pc-name').value='';
    document.getElementById('pc-icon').value='';
    document.getElementById('pc-desc').value='';
    pLoadAll();
  } else { pMsg('pc-msg',d.msg||'오류','err'); }
}

async function pDeleteCategory(id, name) {
  if (!confirm(`"${name}" 카테고리와 하위 프롬프트 전체를 삭제하시겠습니까?`)) return;
  const r = await fetch(BASE_URL+'/api/prompt_lib.php',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action:'delete_category',id})
  });
  const d = await r.json();
  if (d.ok) pLoadAll();
  else alert(d.msg||'삭제 실패');
}

/* ── Prompt CRUD ── */
async function pSavePrompt() {
  const id      = document.getElementById('pp-id').value;
  const catId   = document.getElementById('pp-cat').value;
  const title   = document.getElementById('pp-title').value.trim();
  const content = document.getElementById('pp-content').value.trim();
  if (!catId)    { pMsg('pp-msg','카테고리를 선택하세요','err'); return; }
  if (!title)    { pMsg('pp-msg','제목을 입력하세요','err'); return; }
  if (!content)  { pMsg('pp-msg','내용을 입력하세요','err'); return; }

  const body = {
    action:      id ? 'update_prompt' : 'add_prompt',
    category_id: parseInt(catId),
    title,
    content,
    description:  document.getElementById('pp-desc').value.trim(),
    difficulty:   document.getElementById('pp-diff').value,
    is_featured:  document.getElementById('pp-featured').checked,
    sort_order:   parseInt(document.getElementById('pp-sort').value)||0,
  };
  if (id) body.id = parseInt(id);

  const r = await fetch(BASE_URL+'/api/prompt_lib.php',{
    method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)
  });
  const d = await r.json();
  if (d.ok) {
    pMsg('pp-msg', id ? '수정 완료' : '등록 완료', 'ok');
    pCancelEdit();
    pLoadAll();
  } else { pMsg('pp-msg',d.msg||'오류','err'); }
}

function pEditPrompt(id) {
  const it = _pItems.find(x => String(x.id) === String(id));
  if (!it) return;
  document.getElementById('pp-id').value            = it.id;
  document.getElementById('pp-cat').value           = it.category_id;
  document.getElementById('pp-title').value         = it.title;
  document.getElementById('pp-content').value       = it.content;
  document.getElementById('pp-desc').value          = it.description||'';
  document.getElementById('pp-diff').value          = it.difficulty||'medium';
  document.getElementById('pp-sort').value          = it.sort_order||0;
  document.getElementById('pp-featured').checked    = !!parseInt(it.is_featured);
  document.getElementById('p-edit-badge').style.display = '';
  document.getElementById('p-cancel-btn').style.display = '';
  document.getElementById('pp-title').scrollIntoView({behavior:'smooth',block:'center'});
}

function pCancelEdit() {
  document.getElementById('pp-id').value       = '';
  document.getElementById('pp-cat').value      = '';
  document.getElementById('pp-title').value    = '';
  document.getElementById('pp-content').value  = '';
  document.getElementById('pp-desc').value     = '';
  document.getElementById('pp-diff').value     = 'medium';
  document.getElementById('pp-sort').value     = '0';
  document.getElementById('pp-featured').checked = false;
  document.getElementById('p-edit-badge').style.display = 'none';
  document.getElementById('p-cancel-btn').style.display = 'none';
  document.getElementById('pp-msg').style.display = 'none';
}

async function pDeletePrompt(id, title) {
  if (!confirm(`"${title}" 프롬프트를 삭제하시겠습니까?`)) return;
  const r = await fetch(BASE_URL+'/api/prompt_lib.php',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action:'delete_prompt',id})
  });
  const d = await r.json();
  if (d.ok) pLoadAll();
  else alert(d.msg||'삭제 실패');
}

function pMsg(id, txt, type) {
  const el = document.getElementById(id);
  el.textContent = txt;
  el.className = 'msg ' + type;
  el.style.display = 'block';
  setTimeout(() => { el.style.display='none'; }, 3000);
}

function pEsc(s) {
  return String(s||'')
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

/* ── 초기화 ── */
renderNav();   // 로그인 전에도 상단 메뉴는 렌더링
if(isAdmin){
  const today=new Date().toLocaleDateString('sv-SE');
  const next7=new Date(Date.now()+7*86400000).toLocaleDateString('sv-SE');
  document.getElementById('s-start').value=today;
  document.getElementById('s-end').value=next7;
  setDifficulty('easy');
  admApplyScenario('normal');
  renderColumnSelector();
  // URL hash로 마지막 탭 복원
  // 주의: 일부 탭 로더(rvLoadAll·dvLoadAll·suLoadAll)는 뒤쪽 스크립트 블록에 정의되므로
  // 모든 블록이 파싱된 뒤(DOMContentLoaded)에 전환해야 onOpen이 정상 동작한다
  document.addEventListener('DOMContentLoaded', () => {
    const initTab = location.hash.replace('#','') || 'stream';
    switchTab(initTab);
  });
}
</script>

<script src="/mfg/js/generators.js"></script>
<script src="/mfg/js/formatters.js"></script>
<script>
/* ── 페이지 로드 시 스트림 자동 재개 ── */
if (isAdmin) {
  fetch(BASE_URL+'/api/stream_state.php')
    .then(r => r.json())
    .then(d => {
      if (!d.running) return;
      const cfg = d.config || { topic: d.topic, rate: d.rate||1, dbSave: d.dbEnabled||false,
        process:'automotive', diff:'easy', infinite:true, target:1000,
        anomaly:{alarmRate:0,warningRate:0,defectRate:0,spikeRate:0,missingRate:0} };
      admApplyConfig(cfg);
      admStartStream(cfg);
      // 재개 알림
      const n = document.createElement('div');
      n.style.cssText = 'position:fixed;top:68px;right:16px;z-index:9999;padding:10px 18px;background:rgba(22,163,74,0.08);border:1px solid var(--green);border-radius:4px;font-size:12px;color:var(--green);font-family:"Space Mono",monospace;box-shadow:0 4px 12px rgba(0,0,0,.12)';
      n.textContent = '↻ 스트림 자동 재개됨';
      document.body.appendChild(n);
      setTimeout(() => n.remove(), 3000);
    })
    .catch(() => {});
}
/* ══════════════════════════════════════
   세션 타임아웃 (비활동 감지)
══════════════════════════════════════ */
(function() {
  if (!isAdmin) return;
  const TIMEOUT_MS  = SESSION_TIMEOUT_SEC * 1000;
  const WARN_MS     = 5 * 60 * 1000; // 만료 5분 전 경고
  const CHECK_MS    = 15 * 1000;     // 15초마다 체크

  let lastActivity  = Date.now();
  let warnShown     = false;
  let countdownTimer = null;

  ['click','keydown','mousemove','scroll','touchstart'].forEach(ev =>
    document.addEventListener(ev, () => {
      lastActivity = Date.now();
      if (warnShown) hideWarn();
    }, {passive: true})
  );

  function checkIdle() {
    const idle = Date.now() - lastActivity;
    const remaining = TIMEOUT_MS - idle;
    if (remaining <= 0) { doLogout(); return; }
    if (remaining <= WARN_MS && !warnShown) showWarn(remaining);
  }

  function showWarn(remainingMs) {
    warnShown = true;
    const box = document.getElementById('sess-timeout-warn');
    if (!box) return;
    box.style.display = 'flex';
    let secs = Math.ceil(remainingMs / 1000);
    updateCountdown(secs);
    countdownTimer = setInterval(() => {
      secs--;
      if (secs <= 0) { doLogout(); return; }
      updateCountdown(secs);
    }, 1000);
  }

  function hideWarn() {
    warnShown = false;
    const box = document.getElementById('sess-timeout-warn');
    if (box) box.style.display = 'none';
    if (countdownTimer) { clearInterval(countdownTimer); countdownTimer = null; }
  }

  function updateCountdown(secs) {
    const el = document.getElementById('sess-timeout-cd');
    if (!el) return;
    const m = Math.floor(secs / 60), s = secs % 60;
    el.textContent = `${m}:${String(s).padStart(2,'0')}`;
  }

  function doLogout() { window.location.href = '/admin/?logout=1'; }

  window.extendAdminSession = function() {
    lastActivity = Date.now();
    hideWarn();
  };

  setInterval(checkIdle, CHECK_MS);
})();

/* ══════════════════════════════════════════
   API 수집기 JS
══════════════════════════════════════════ */
const AC_DEFAULT_URL = 'https://open.jejudatahub.net/api/proxy/1b1ta1a1ba6t6a1ttt3bD6b1tb1t1D3t/{appkey}';
let _acSelected = null;  // 현재 선택된 API config

function acPost(data) {
  return fetch(location.pathname, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams(data).toString(),
  }).then(r => {
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return r.text();
  }).then(txt => {
    try { return JSON.parse(txt); }
    catch(e) { throw new Error('JSON 파싱 실패: ' + txt.slice(0, 200)); }
  });
}

/* ── API 목록 로드 ── */
function acLoadList() {
  const el = document.getElementById('ac-api-list');
  acPost({action:'ac_list'}).then(d => {
    if (!d.ok || !d.configs.length) {
      el.innerHTML = '<div style="color:var(--dim);font-size:13px">등록된 API가 없습니다. [+ API 추가]를 눌러 추가하세요.</div>';
      return;
    }
    el.innerHTML = d.configs.map(cfg => `
      <div class="ac-api-row">
        <div style="flex:1;min-width:0">
          <div class="ac-api-name">${esc(cfg.name)}</div>
          <div class="ac-api-url">${esc(cfg.url.replace('{appkey}', '***'))}</div>
          <div style="font-size:10px;color:var(--dim);margin-top:2px">
            page: <b>${esc(cfg.page_param)}</b> · size: <b>${cfg.page_size}</b> · data key: <b>${esc(cfg.data_key)}</b>
          </div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button class="btn btn-green" style="padding:5px 12px;font-size:11px" onclick="acSelectForRun(${JSON.stringify(cfg).replace(/"/g,'&quot;')})">▶ 수집</button>
          <button class="btn btn-ghost" style="padding:5px 10px;font-size:11px" onclick="acOpenForm(${JSON.stringify(cfg).replace(/"/g,'&quot;')})">✏</button>
          <button class="btn btn-danger" style="padding:5px 10px;font-size:11px" onclick="acDeleteConfig('${esc(cfg.id)}','${esc(cfg.name)}')">✕</button>
        </div>
      </div>`).join('');
  }).catch(e => {
    el.innerHTML = `<div style="color:var(--red);font-size:13px">❌ 목록 로드 실패: ${esc(e.message)}</div>`;
  });
}

/* ── 폼 열기/닫기 ── */
function acOpenForm(cfg) {
  const card = document.getElementById('ac-form-card');
  document.getElementById('ac-form-title').textContent = cfg ? 'API 편집' : 'API 추가';
  document.getElementById('ac-id').value         = cfg?.id ?? '';
  document.getElementById('ac-name').value       = cfg?.name ?? '';
  document.getElementById('ac-url').value        = cfg?.url ?? AC_DEFAULT_URL;
  document.getElementById('ac-appkey').value     = cfg?.appkey ?? '';
  document.getElementById('ac-start-param').value  = cfg?.start_param  ?? 'startDate';
  document.getElementById('ac-end-param').value    = cfg?.end_param    ?? 'endDate';
  document.getElementById('ac-date-format').value  = cfg?.date_format  ?? 'Ymd';
  document.getElementById('ac-extra').value      = cfg?.extra_params ?? '';
  document.getElementById('ac-page-param').value = cfg?.page_param ?? 'number';
  document.getElementById('ac-size-param').value = cfg?.size_param ?? 'limit';
  document.getElementById('ac-page-size').value  = cfg?.page_size ?? 100;
  document.getElementById('ac-data-key').value     = cfg?.data_key     ?? 'data';
  document.getElementById('ac-total-key').value    = cfg?.total_key    ?? 'totCnt';
  document.getElementById('ac-has-more-key').value = cfg?.has_more_key ?? 'hasMore';
  document.getElementById('ac-form-msg').textContent = '';
  acRefreshResponsePreview();
  card.style.display = '';
  card.scrollIntoView({behavior:'smooth', block:'start'});
}
function acCloseForm() {
  document.getElementById('ac-form-card').style.display = 'none';
  const m = document.getElementById('ac-form-msg');
  m.style.display = 'none'; m.textContent = '';
}

/* ── 설정 저장 ── */
/* ── 응답 구조 미리보기 ── */
function acRefreshResponsePreview() {
  const dataKey    = document.getElementById('ac-data-key').value     || 'data';
  const totalKey   = document.getElementById('ac-total-key').value    || 'totCnt';
  const hasMoreKey = document.getElementById('ac-has-more-key').value || 'hasMore';
  const preview = {
    [totalKey]:   4661632,
    [hasMoreKey]: true,
    [dataKey]: [{ '...': '실제 데이터 1' }, { '...': '실제 데이터 2' }, '... (최대 limit 건)']
  };
  const lines = JSON.stringify(preview, null, 2).split('\n').map(line => {
    if (line.includes(`"${totalKey}"`))
      return `<span style="color:#fbbf24">${line}</span>  <span style="color:#4ade80;font-size:10px">← 전체 건수</span>`;
    if (line.includes(`"${hasMoreKey}"`))
      return `<span style="color:#f472b6">${line}</span>  <span style="color:#4ade80;font-size:10px">← false이면 수집 종료</span>`;
    if (line.includes(`"${dataKey}"`))
      return `<span style="color:#60a5fa">${line}</span>  <span style="color:#4ade80;font-size:10px">← 데이터 배열</span>`;
    return line;
  });
  document.getElementById('ac-response-preview').innerHTML = lines.join('\n');
}

function acMsg(txt, isErr) {
  const el = document.getElementById('ac-form-msg');
  el.textContent = txt;
  el.className = 'msg ' + (isErr ? 'err' : 'ok');
  el.style.display = 'block';
}

function acSaveConfig() {
  const name = document.getElementById('ac-name').value.trim();
  const url  = document.getElementById('ac-url').value.trim();
  const key  = document.getElementById('ac-appkey').value.trim();
  if (!name || !url || !key) { acMsg('이름·URL·App Key는 필수입니다.', true); return; }
  acPost({
    action:       'ac_save',
    id:           document.getElementById('ac-id').value,
    name, url,    appkey: key,
    start_param:  document.getElementById('ac-start-param').value  || 'startDate',
    end_param:    document.getElementById('ac-end-param').value    || 'endDate',
    date_format:  document.getElementById('ac-date-format').value  || 'Y-m-d',
    extra_params: document.getElementById('ac-extra').value,
    page_param:   document.getElementById('ac-page-param').value   || 'number',
    size_param:   document.getElementById('ac-size-param').value   || 'limit',
    page_size:    document.getElementById('ac-page-size').value    || 100,
    data_key:     document.getElementById('ac-data-key').value     || 'data',
    total_key:    document.getElementById('ac-total-key').value    || 'totCnt',
    has_more_key: document.getElementById('ac-has-more-key').value || 'hasMore',
  }).then(d => {
    if (d.ok) { acCloseForm(); acLoadList(); }
    else acMsg(d.msg || '저장 실패', true);
  }).catch(e => {
    acMsg('오류: ' + e.message, true);
  });
}

/* ── 설정 삭제 ── */
function acDeleteConfig(id, name) {
  if (!confirm(`"${name}" API 설정을 삭제할까요?`)) return;
  acPost({action:'ac_delete', id}).then(d => { if (d.ok) acLoadList(); else alert(d.msg); });
}

/* ── URL 미리보기 갱신 ── */
function acUpdatePreview() {
  if (!_acSelected) return;
  const cfg    = _acSelected;
  const startV = document.getElementById('ac-start-date').value || '{시작일}';
  const endV   = document.getElementById('ac-end-date').value   || '{종료일}';
  const fmtFn  = {'Y-m-d': d=>d, 'Ymd': d=>d.replace(/-/g,''), 'Y/m/d': d=>d.replace(/-/g,'/'),
                  'd-m-Y': d=>d.split('-').reverse().join('-'),
                  'm/d/Y': d=>{ const p=d.split('-'); return p[1]+'/'+p[2]+'/'+p[0]; }}[cfg.date_format||'Y-m-d'] || (d=>d);
  const fmt    = v => v.startsWith('{') ? v : fmtFn(v);
  const base   = cfg.url.replace('{appkey}', cfg.appkey || '{appkey}');
  const params = new URLSearchParams();
  params.set(cfg.start_param || 'startDate', fmt(startV));
  params.set(cfg.end_param   || 'endDate',   fmt(endV));
  params.set(cfg.page_param  || 'number', '1');
  params.set(cfg.size_param  || 'limit',  cfg.page_size || 100);
  if (cfg.extra_params) {
    try { new URLSearchParams(cfg.extra_params).forEach((v,k) => params.set(k,v)); } catch(e){}
  }
  document.getElementById('ac-url-preview').textContent      = base + '?' + params.toString();
  document.getElementById('ac-preview-data-key').textContent  = cfg.data_key  || 'data';
  document.getElementById('ac-preview-total-key').textContent = cfg.total_key || 'totalCount';
}

/* ── 수집 실행 카드 열기 ── */
function acSelectForRun(cfg) {
  _acSelected = cfg;
  document.getElementById('ac-run-name').textContent = cfg.name;
  const sp  = cfg.start_param  || 'startDate';
  const ep  = cfg.end_param    || 'endDate';
  const fmtLabel = {'Y-m-d':'YYYY-MM-DD','Ymd':'YYYYMMDD','Y/m/d':'YYYY/MM/DD','d-m-Y':'DD-MM-YYYY','m/d/Y':'MM/DD/YYYY'}[cfg.date_format||'Y-m-d'] || cfg.date_format || 'YYYY-MM-DD';
  document.getElementById('ac-run-start-lbl').textContent = `${sp} * — 전달 형식: ${fmtLabel}`;
  document.getElementById('ac-run-end-lbl').textContent   = `${ep} * — 전달 형식: ${fmtLabel}`;
  const today = new Date().toISOString().slice(0,10);
  const month = new Date(Date.now() - 30*86400000).toISOString().slice(0,10);
  if (!document.getElementById('ac-start-date').value) document.getElementById('ac-start-date').value = month;
  if (!document.getElementById('ac-end-date').value)   document.getElementById('ac-end-date').value   = today;
  const card = document.getElementById('ac-run-card');
  card.style.display = '';
  document.getElementById('ac-progress').classList.remove('show');
  document.getElementById('ac-run-btn').disabled = false;
  acUpdatePreview();
  document.getElementById('ac-start-date').oninput = acUpdatePreview;
  document.getElementById('ac-end-date').oninput   = acUpdatePreview;
  card.scrollIntoView({behavior:'smooth', block:'start'});
}

/* ── 수집 실행 ── */
function acRunCollect() {
  if (!_acSelected) return;
  const startDate = document.getElementById('ac-start-date').value;
  const endDate   = document.getElementById('ac-end-date').value;
  if (!startDate || !endDate) { alert('시작일·종료일을 입력하세요.'); return; }
  if (startDate > endDate)    { alert('시작일이 종료일보다 늦습니다.'); return; }

  const btn  = document.getElementById('ac-run-btn');
  const prog = document.getElementById('ac-progress');
  btn.disabled = true;
  btn.textContent = '수집 중...';
  prog.classList.add('show');
  document.getElementById('ac-progress-text').textContent = '서버에서 데이터를 수집하고 있습니다...';
  document.getElementById('ac-progress-bar').style.width = '0%';
  document.getElementById('ac-progress-detail').textContent = `${startDate} ~ ${endDate} · 최대 ${_acSelected.page_size}건/페이지`;

  // 진행 애니메이션 (실제 progress는 서버에서 한 번에 반환)
  let fake = 0;
  const fakeTimer = setInterval(() => {
    fake = Math.min(fake + 3, 88);
    document.getElementById('ac-progress-bar').style.width = fake + '%';
  }, 400);

  acPost({
    action:'ac_run',
    id: _acSelected.id,
    startDate,
    endDate,
    start_param: _acSelected.start_param || 'startDate',
    end_param:   _acSelected.end_param   || 'endDate',
  }).then(d => {
    clearInterval(fakeTimer);
    document.getElementById('ac-progress-bar').style.width = '100%';
    btn.disabled = false;
    btn.textContent = '▶ 수집 시작';
    if (d.ok) {
      document.getElementById('ac-progress-text').textContent = `✅ 수집 완료`;
      document.getElementById('ac-progress-detail').innerHTML =
        `<b>${d.total.toLocaleString()}</b>건 수집 · <b>${d.pages}</b>페이지 호출 · 파일: ${esc(d.filename)}`;
      acLoadHistory();
    } else {
      document.getElementById('ac-progress-text').textContent = `❌ 수집 실패: ${d.msg}`;
    }
  }).catch(e => {
    clearInterval(fakeTimer);
    btn.disabled = false;
    btn.textContent = '▶ 수집 시작';
    document.getElementById('ac-progress-text').textContent = `❌ 오류: ${e.message}`;
  });
}

/* ── 이력 로드 ── */
function acLoadHistory() {
  acPost({action:'ac_history'}).then(d => {
    const el = document.getElementById('ac-history');
    if (!d.ok || !d.history.length) {
      el.innerHTML = '<div style="color:var(--dim);font-size:13px">수집 이력이 없습니다.</div>';
      return;
    }
    el.innerHTML = d.history.map(h => `
      <div class="ac-hist-row">
        <div class="ac-hist-meta">
          <div class="ac-hist-name">${esc(h.api_name)}</div>
          <div class="ac-hist-date">${esc(h.startDate)} ~ ${esc(h.endDate)} · ${esc(h.collected_at)}</div>
        </div>
        <div class="ac-hist-cnt">${(h.total||0).toLocaleString()}건</div>
        <div style="display:flex;gap:5px;flex-shrink:0">
          <button class="btn btn-ghost" style="padding:4px 10px;font-size:11px" onclick="acDownload('${esc(h.filename)}','${esc(h.api_name)}')">↓ JSON</button>
          <button class="btn btn-ghost" style="padding:4px 10px;font-size:11px" onclick="acDownloadCsv('${esc(h.filename)}','${esc(h.api_name)}')">↓ CSV</button>
          <button class="btn btn-danger" style="padding:4px 8px;font-size:11px" onclick="acDeleteFile('${esc(h.filename)}')">✕</button>
        </div>
      </div>`).join('');
  });
}

/* ── 다운로드 (JSON) ── */
function acDownload(filename, apiName) {
  acPost({action:'ac_download', filename}).then(d => {
    if (!d.ok) { alert(d.msg); return; }
    const blob = new Blob([JSON.stringify(d.data, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
  });
}

/* ── 다운로드 (CSV) ── */
function acDownloadCsv(filename, apiName) {
  acPost({action:'ac_download', filename}).then(d => {
    if (!d.ok) { alert(d.msg); return; }
    if (!d.data.length) { alert('데이터가 없습니다.'); return; }
    const keys = Object.keys(d.data[0]);
    const rows = [keys.join(','), ...d.data.map(row =>
      keys.map(k => {
        const v = row[k] ?? '';
        return typeof v === 'string' && (v.includes(',') || v.includes('"') || v.includes('\n'))
          ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(',')
    )];
    const blob = new Blob(['﻿' + rows.join('\r\n')], {type:'text/csv;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename.replace('.json','.csv');
    a.click();
  });
}

/* ── 파일 삭제 ── */
function acDeleteFile(filename) {
  if (!confirm(`${filename}\n이 수집 파일을 삭제할까요?`)) return;
  acPost({action:'ac_delete_file', filename}).then(d => {
    if (d.ok) acLoadHistory(); else alert(d.msg);
  });
}

function esc(s) { return String(s??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

/* ══════════════════════════════════════
   파일 보관함 (웹하드)
══════════════════════════════════════ */
const DV_API = BASE_URL + '/api/drive.php';
const DV_ICONS = {pdf:'📕',ppt:'📙',pptx:'📙',doc:'📘',docx:'📘',xls:'📗',xlsx:'📗',csv:'📗',
  zip:'🗜️',hwp:'📄',hwpx:'📄',txt:'📄',md:'📄',py:'🐍',ipynb:'📓',json:'🧾',mp4:'🎬',mp3:'🎵'};
let dvItems = [], dvCats = [], dvCat = '전체', dvSite = location.origin;

const dvSize = b => b >= 1048576 ? (b/1048576).toFixed(1) + ' MB'
                  : b >= 1024    ? Math.round(b/1024) + ' KB' : b + ' B';

function dvMsg(text, ok) {
  const el = document.getElementById('dv-msg');
  el.className = 'msg ' + (ok ? 'ok' : 'err');
  el.style.display = 'block';
  el.textContent = text;
  if (ok) setTimeout(() => { el.style.display = 'none'; }, 4000);
}

// 파일 업로드 외 요청은 JSON을 multipart로 감싸 전송 (mod_security 회피)
function dvSend(method, data) {
  const fd = new FormData();
  fd.append('_method', method);
  fd.append('payload', new Blob([JSON.stringify(data)], {type:'application/json'}), 'payload.json');
  return fetch(DV_API, {method:'POST', headers:{'X-CSRF-Token':CSRF_TOKEN}, body:fd}).then(r => r.json());
}

function dvLoadAll() {
  if (!isAdmin) return;
  fetch(DV_API).then(r => r.json()).then(d => {
    if (!d.ok) { dvMsg(d.msg || '목록을 불러오지 못했습니다', false); return; }
    dvItems = d.items || [];
    dvCats  = d.categories || [];
    dvSite  = d.site || location.origin;
    document.getElementById('dv-count').textContent = dvItems.length ? `(${dvItems.length})` : '';
    document.getElementById('dv-cats').innerHTML = dvCats.map(c => `<option value="${navEsc(c)}">`).join('');
    dvRenderCats();
    dvRender();
  }).catch(() => dvMsg('목록을 불러오지 못했습니다', false));
}

function dvRenderCats() {
  const el = document.getElementById('dv-cat-tabs');
  // 카테고리명에 따옴표가 들어가도 안전하도록 data 속성 + 위임 처리
  el.innerHTML = dvCats.length
    ? ['전체', ...dvCats].map(c =>
        `<button class="dv-cat ${c === dvCat ? 'active' : ''}" data-cat="${navEsc(c)}">${navEsc(c)}</button>`).join('')
    : '';
  el.onclick = e => {
    const b = e.target.closest('.dv-cat');
    if (b) dvSetCat(b.dataset.cat);
  };
  // 특정 카테고리 선택 시에만 '자료실 링크' 버튼 노출
  document.getElementById('dv-catlink-btn').style.display = (dvCat !== '전체' && dvCats.includes(dvCat)) ? '' : 'none';
}

function dvSetCat(c) { dvCat = c; dvRenderCats(); dvRender(); }

function dvRender() {
  const tb   = document.getElementById('dv-list');
  const list = dvCat === '전체' ? dvItems : dvItems.filter(f => f.category === dvCat);
  if (!list.length) {
    tb.innerHTML = '<tr><td colspan="5" style="color:var(--dim);font-size:13px">보관된 파일이 없습니다.</td></tr>';
    return;
  }
  tb.innerHTML = list.map(f => {
    const short = f.code ? dvSite + '/' + f.code : '';
    return `<tr>
      <td>
        <div class="dv-file">
          <span class="dv-file-ico">${DV_ICONS[f.ext] || '📎'}</span>
          <span>
            <span class="dv-file-name" title="${navEsc(f.name)}">${navEsc(f.name)}</span>
            <span class="dv-file-sub">${(f.ext||'').toUpperCase()} · ${dvSize(f.size||0)}</span>
            ${f.memo ? `<span class="dv-file-sub" style="color:var(--muted)"> · ${navEsc(f.memo)}</span>` : ''}
          </span>
        </div>
      </td>
      <td>${f.category ? `<span class="dv-tag">${navEsc(f.category)}</span>` : '<span style="color:var(--dim)">—</span>'}</td>
      <td>${short
        ? `<span class="su-short">/${navEsc(f.code)}</span>`
        : '<span style="color:var(--dim);font-size:12px">없음</span>'}</td>
      <td class="su-clicks">${f.downloads || 0}</td>
      <td>
        <div class="su-actions">
          ${short ? `<button class="btn btn-ghost" onclick="suCopy('${navEsc(short)}')">복사</button>
                     <button class="btn btn-ghost" onclick="dvQR('${navEsc(short)}')">QR</button>` : ''}
          <button class="btn btn-ghost" onclick="dvRelink('${navEsc(f.id)}','${navEsc(f.code||'')}')">링크</button>
          <button class="btn btn-ghost" onclick="dvEdit('${navEsc(f.id)}')">수정</button>
          <button class="btn btn-ghost" onclick="dvDelete('${navEsc(f.id)}')">삭제</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

/* ── 업로드 (드래그&드롭 + 진행률) ── */
const dvDrop = document.getElementById('dv-drop');
if (dvDrop) {
  ['dragenter','dragover'].forEach(e => dvDrop.addEventListener(e, ev => {
    ev.preventDefault(); dvDrop.classList.add('over');
  }));
  ['dragleave','drop'].forEach(e => dvDrop.addEventListener(e, ev => {
    ev.preventDefault(); dvDrop.classList.remove('over');
  }));
  dvDrop.addEventListener('drop', ev => dvPick(ev.dataTransfer.files));
}

function dvPick(files) {
  if (!files || !files.length) return;
  [...files].reduce((chain, f) => chain.then(() => dvUpload(f)), Promise.resolve())
    .then(() => { document.getElementById('dv-input').value = ''; dvLoadAll(); });
}

function dvUpload(file) {
  const queue = document.getElementById('dv-queue');
  const row   = document.createElement('div');
  row.className = 'dv-q-row';
  row.innerHTML = `<span class="dv-q-name">${navEsc(file.name)}</span>
    <span class="dv-q-state up">${dvSize(file.size)}</span>
    <span class="dv-bar"><i></i></span>`;
  queue.appendChild(row);
  const bar   = row.querySelector('.dv-bar i');
  const state = row.querySelector('.dv-q-state');

  if (file.size > 80 * 1024 * 1024) {
    state.className = 'dv-q-state err';
    state.textContent = '80MB 초과';
    return Promise.resolve();
  }

  const fd = new FormData();
  fd.append('file', file);
  fd.append('category', document.getElementById('dv-category').value.trim());
  fd.append('memo',     document.getElementById('dv-memo').value.trim());

  // 진행률 표시가 필요해 fetch 대신 XHR 사용
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', DV_API);
    xhr.setRequestHeader('X-CSRF-Token', CSRF_TOKEN);
    xhr.upload.onprogress = e => {
      if (e.lengthComputable) bar.style.width = Math.round(e.loaded / e.total * 100) + '%';
    };
    xhr.onload = () => {
      let d = {};
      try { d = JSON.parse(xhr.responseText); } catch { d = {ok:false, msg:'서버 응답 오류'}; }
      if (d.ok) {
        bar.style.width = '100%';
        state.className = 'dv-q-state ok';
        state.textContent = '✓ ' + (d.short || '').replace(/^https?:\/\//, '');
        setTimeout(() => row.remove(), 6000);
      } else {
        state.className = 'dv-q-state err';
        state.textContent = d.msg || '실패';
      }
      resolve();
    };
    xhr.onerror = () => {
      state.className = 'dv-q-state err';
      state.textContent = '업로드 실패';
      resolve();
    };
    xhr.send(fd);
  });
}

/* ── 짧은 링크 생성·변경 ── */
function dvRelink(id, cur) {
  const code = prompt('짧은 링크 코드 (영문·숫자 4~16자)\n비워두면 자동 생성됩니다.', cur || '');
  if (code === null) return;
  dvSend('LINK', {id, code: code.trim()}).then(d => {
    if (!d.ok) { dvMsg(d.msg || '링크 생성 실패', false); return; }
    dvMsg('짧은 링크: ' + d.short, true);
    dvLoadAll();
  }).catch(() => dvMsg('링크 요청 실패', false));
}

/* ── 카테고리 자료실 링크 ── */
function dvCatLink() {
  const code = prompt(`"${dvCat}" 자료실 공유 링크 코드 (비워두면 자동 생성)\n교육생이 이 링크로 카테고리 전체 파일을 받습니다.`, '');
  if (code === null) return;
  dvSend('CATLINK', {category: dvCat, code: code.trim()}).then(d => {
    if (!d.ok) { dvMsg(d.msg || '링크 생성 실패', false); return; }
    dvMsg(`"${dvCat}" 자료실 링크: ${d.short}`, true);
    navigator.clipboard.writeText(d.short).catch(() => {});
    if (typeof suLoadAll === 'function') suLoadAll();
  }).catch(() => dvMsg('링크 요청 실패', false));
}

function dvEdit(id) {
  const f = dvItems.find(x => x.id === id);
  if (!f) return;
  const name = prompt('파일 표시 이름', f.name);
  if (name === null) return;
  const category = prompt('카테고리 (비우면 없음)', f.category || '');
  if (category === null) return;
  const memo = prompt('메모 (비우면 없음)', f.memo || '');
  if (memo === null) return;
  dvSend('PUT', {id, name: name.trim(), category: category.trim(), memo: memo.trim()}).then(d => {
    if (!d.ok) { dvMsg(d.msg || '수정 실패', false); return; }
    dvMsg('수정되었습니다', true);
    dvLoadAll();
  }).catch(() => dvMsg('수정 요청 실패', false));
}

function dvDelete(id) {
  const f = dvItems.find(x => x.id === id);
  if (!f) return;
  if (!confirm(`${f.name}\n파일과 짧은 링크가 함께 삭제됩니다. 계속할까요?`)) return;
  dvSend('DELETE', {id}).then(d => {
    if (!d.ok) { dvMsg(d.msg || '삭제 실패', false); return; }
    dvLoadAll();
  }).catch(() => dvMsg('삭제 요청 실패', false));
}

function dvQR(short) {
  switchTab('shorturl');
  setTimeout(() => suShowQR(short), 100);
}

/* ══════════════════════════════════════
   짧은 주소 · QR 생성기
══════════════════════════════════════ */
/* ═══════════ 개선 의견 관리 ═══════════ */
const FB_API = BASE_URL + '/api/feedback.php';
let fbItems = [];

function fbSend(method, data) {
  const fd = new FormData();
  fd.append('_method', method);
  fd.append('payload', new Blob([JSON.stringify(data)], {type:'application/json'}), 'payload.json');
  return fetch(FB_API, {method:'POST', headers:{'X-CSRF-Token':CSRF_TOKEN}, body:fd}).then(r => r.json());
}

function fbNotice(text, ok) {
  const el = document.getElementById('fb-msg');
  el.className = 'msg ' + (ok ? 'ok' : 'err');
  el.style.display = 'block';
  el.textContent = text;
  if (ok) setTimeout(() => { el.style.display = 'none'; }, 3000);
}

function fbLoadAll() {
  if (!isAdmin) return;
  fetch(FB_API).then(r => r.json()).then(items => {
    fbItems = Array.isArray(items) ? items : [];
    const unread = fbItems.filter(it => !it.read).length;
    document.getElementById('fb-count').textContent =
      fbItems.length ? `(전체 ${fbItems.length} · 새 의견 ${unread})` : '';
    fbRender();
  }).catch(() => fbNotice('목록을 불러오지 못했습니다', false));
}

function fbRender() {
  const tb = document.getElementById('fb-list');
  if (!fbItems.length) {
    tb.innerHTML = '<tr><td colspan="6" style="color:var(--dim);font-size:13px">아직 접수된 의견이 없습니다.</td></tr>';
    return;
  }
  tb.innerHTML = fbItems.map(it => `<tr${it.read ? '' : ' style="background:rgba(37,99,235,.04)"'}>
    <td>${it.read
      ? '<span style="color:var(--dim);font-size:12px">확인</span>'
      : '<span style="color:var(--accent);font-weight:700;font-size:12px">● 새</span>'}</td>
    <td><span style="font-family:'Space Mono',monospace;font-size:11px;color:var(--accent)">${esc(it.page || '—')}</span></td>
    <td style="font-size:12.5px;line-height:1.6">${esc(it.text)}</td>
    <td style="font-size:12px;color:var(--muted)">${esc(it.contact || '—')}</td>
    <td style="font-size:11px;color:var(--dim)">${esc((it.createdAt || '').slice(0, 10))}</td>
    <td>
      <div class="su-actions" style="justify-content:flex-start">
        <button class="btn btn-ghost" onclick="fbToggleRead('${esc(it.id)}', ${it.read ? 'false' : 'true'})">${it.read ? '미확인' : '확인'}</button>
        <button class="btn btn-ghost" onclick="fbDelete('${esc(it.id)}')">삭제</button>
      </div>
    </td>
  </tr>`).join('');
}

function fbToggleRead(id, read) {
  fbSend('READ', {id, read}).then(d => {
    if (!d.ok) { fbNotice(d.msg || '처리 실패', false); return; }
    fbLoadAll();
  }).catch(e => fbNotice('요청 실패: ' + e.message, false));
}

function fbDelete(id) {
  if (!confirm('이 의견을 삭제할까요? 되돌릴 수 없습니다.')) return;
  fbSend('DELETE', {id}).then(d => {
    if (!d.ok) { fbNotice(d.msg || '삭제 실패', false); return; }
    fbNotice('삭제되었습니다', true);
    fbLoadAll();
  }).catch(e => fbNotice('요청 실패: ' + e.message, false));
}

/* ═══════════ 교육 후기 관리 ═══════════ */
const RV_API = BASE_URL + '/api/reviews.php';
let rvItems = [];

function rvSend(method, data) {
  const fd = new FormData();
  fd.append('_method', method);
  fd.append('payload', new Blob([JSON.stringify(data)], {type:'application/json'}), 'payload.json');
  return fetch(RV_API, {method:'POST', headers:{'X-CSRF-Token':CSRF_TOKEN}, body:fd}).then(r => r.json());
}

function rvNotice(text, ok) {
  const el = document.getElementById('rv-msg');
  el.className = 'msg ' + (ok ? 'ok' : 'err');
  el.style.display = 'block';
  el.textContent = text;
  if (ok) setTimeout(() => { el.style.display = 'none'; }, 3000);
}

function rvLoadAll() {
  if (!isAdmin) return;
  fetch(RV_API + '?all=1').then(r => r.json()).then(items => {
    rvItems = Array.isArray(items) ? items : [];
    const pending = rvItems.filter(it => !it.approved).length;
    document.getElementById('rv-count').textContent =
      rvItems.length ? `(전체 ${rvItems.length} · 대기 ${pending})` : '';
    rvRender();
  }).catch(() => rvNotice('목록을 불러오지 못했습니다', false));
}

function rvRender() {
  const tb = document.getElementById('rv-list');
  if (!rvItems.length) {
    tb.innerHTML = '<tr><td colspan="5" style="color:var(--dim);font-size:13px">아직 등록된 후기가 없습니다.</td></tr>';
    return;
  }
  tb.innerHTML = rvItems.map(it => `<tr>
    <td>${it.approved
      ? '<span style="color:var(--green,#059669);font-weight:700;font-size:12px">게시</span>'
      : '<span style="color:var(--amber,#d97706);font-weight:700;font-size:12px">대기</span>'}</td>
    <td style="font-size:12px"><b>${esc(it.name)}</b>${it.org ? '<br><span style="color:var(--dim)">' + esc(it.org) + '</span>' : ''}</td>
    <td style="font-size:12.5px;line-height:1.6">${esc(it.text)}</td>
    <td style="font-size:11px;color:var(--dim)">${esc((it.createdAt || '').slice(0, 10))}</td>
    <td>
      <div class="su-actions" style="justify-content:flex-start">
        <button class="btn btn-ghost" onclick="rvApprove('${esc(it.id)}', ${it.approved ? 'false' : 'true'})">${it.approved ? '내리기' : '게시'}</button>
        <button class="btn btn-ghost" onclick="rvDelete('${esc(it.id)}')">삭제</button>
      </div>
    </td>
  </tr>`).join('');
}

function rvApprove(id, approved) {
  rvSend('APPROVE', {id, approved}).then(d => {
    if (!d.ok) { rvNotice(d.msg || '처리 실패', false); return; }
    rvNotice(approved ? '게시되었습니다 — 허브 티커에 노출됩니다' : '게시가 내려졌습니다', true);
    rvLoadAll();
  }).catch(e => rvNotice('요청 실패: ' + e.message, false));
}

function rvDelete(id) {
  if (!confirm('이 후기를 삭제할까요? 되돌릴 수 없습니다.')) return;
  rvSend('DELETE', {id}).then(d => {
    if (!d.ok) { rvNotice(d.msg || '삭제 실패', false); return; }
    rvNotice('삭제되었습니다', true);
    rvLoadAll();
  }).catch(e => rvNotice('요청 실패: ' + e.message, false));
}

const SU_API  = BASE_URL + '/api/short_url.php';
const SU_BASE = location.origin;   // https://dataforge.ai.kr
let suItems  = [];
let suEditId = '';

// content_lib과 동일하게 mod_security 회피용 multipart 래핑
function suSend(method, data) {
  const fd = new FormData();
  fd.append('_method', method);
  fd.append('payload', new Blob([JSON.stringify(data)], {type:'application/json'}), 'payload.json');
  return fetch(SU_API, {method:'POST', headers:{'X-CSRF-Token':CSRF_TOKEN}, body:fd}).then(r => r.json());
}

function suMsg(text, ok) {
  const el = document.getElementById('su-msg');
  el.className = 'msg ' + (ok ? 'ok' : 'err');
  el.style.display = 'block';
  el.textContent = text;
  if (ok) setTimeout(() => { el.style.display = 'none'; }, 3000);
}

function suLoadAll() {
  if (!isAdmin) return;
  fetch(SU_API).then(r => r.json()).then(items => {
    suItems = Array.isArray(items) ? items : [];
    const cnt = document.getElementById('su-count');
    if (cnt) cnt.textContent = suItems.length ? `(${suItems.length})` : '';
    suRender();
  }).catch(() => suMsg('목록을 불러오지 못했습니다', false));
}

function suRender() {
  const tb = document.getElementById('su-list');
  if (!suItems.length) {
    tb.innerHTML = '<tr><td colspan="5" style="color:var(--dim);font-size:13px">아직 만든 짧은 주소가 없습니다.</td></tr>';
    return;
  }
  tb.innerHTML = suItems.map(it => {
    const short = SU_BASE + '/' + it.code;
    return `<tr>
      <td><span class="su-short">/${esc(it.code)}</span></td>
      <td class="su-target"><a href="${esc(it.url)}" target="_blank" rel="noopener">${esc(it.url)}</a></td>
      <td class="su-memo">${esc(it.memo || '—')}</td>
      <td class="su-clicks">${it.clicks || 0}</td>
      <td>
        <div class="su-actions">
          <button class="btn btn-ghost" onclick="suCopy('${esc(short)}')">복사</button>
          <button class="btn btn-ghost" onclick="suShowQR('${esc(short)}')">QR</button>
          <button class="btn btn-ghost" onclick="suEdit('${esc(it.code)}')">수정</button>
          <button class="btn btn-ghost" onclick="suDelete('${esc(it.code)}')">삭제</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

function suSave() {
  const url  = document.getElementById('su-url').value.trim();
  const code = document.getElementById('su-code').value.trim();
  const memo = document.getElementById('su-memo').value.trim();
  if (!url) { suMsg('원본 URL을 입력해주세요', false); return; }

  const btn = document.getElementById('su-save-btn');
  btn.disabled = true;
  const req = suEditId
    ? suSend('PUT',  {code: suEditId, url, memo})
    : suSend('POST', {url, code, memo});

  req.then(d => {
    btn.disabled = false;
    if (!d.ok) { suMsg(d.msg || '저장 실패', false); return; }
    const newCode = suEditId || (d.item && d.item.code) || '';
    suMsg(suEditId ? '수정되었습니다' : `생성 완료 · ${SU_BASE}/${newCode}`, true);
    suCancel();
    suLoadAll();
    if (!suEditId && newCode) suShowQR(SU_BASE + '/' + newCode);
  }).catch(e => { btn.disabled = false; suMsg('저장 요청 실패: ' + e.message, false); });
}

function suEdit(code) {
  const it = suItems.find(x => x.code === code);
  if (!it) return;
  suEditId = code;
  document.getElementById('su-url').value  = it.url;
  document.getElementById('su-code').value = it.code;
  document.getElementById('su-code').disabled = true;   // 코드는 변경 불가 (기존 링크 보존)
  document.getElementById('su-memo').value = it.memo || '';
  document.getElementById('su-save-btn').textContent = '수정 저장';
  document.getElementById('su-cancel-btn').style.display = '';
  document.getElementById('su-url').focus();
}

function suCancel() {
  suEditId = '';
  ['su-url','su-code','su-memo'].forEach(id => { document.getElementById(id).value = ''; });
  document.getElementById('su-code').disabled = false;
  document.getElementById('su-save-btn').textContent = '+ 짧은 주소 생성';
  document.getElementById('su-cancel-btn').style.display = 'none';
}

function suDelete(code) {
  if (!confirm(`${SU_BASE}/${code}\n이 짧은 주소를 삭제할까요? (기존 링크는 404가 됩니다)`)) return;
  suSend('DELETE', {code}).then(d => {
    if (!d.ok) { suMsg(d.msg || '삭제 실패', false); return; }
    suLoadAll();
  }).catch(() => suMsg('삭제 요청 실패', false));
}

function suCopy(text) {
  navigator.clipboard.writeText(text)
    .then(() => suMsg('복사됨 · ' + text, true))
    .catch(() => suMsg('복사 실패 — 주소: ' + text, false));
}

function suShowQR(text) {
  document.getElementById('qr-text').value = text;
  qrGen();
  document.getElementById('qr-canvas').scrollIntoView({behavior:'smooth', block:'center'});
}

/* ── QR 생성 (qrcode-generator, UTF-8) ── */
function qrGen() {
  const text = document.getElementById('qr-text').value.trim();
  const msg  = document.getElementById('qr-msg');
  msg.style.display = 'none';
  if (!text) { msg.className='msg err'; msg.style.display='block'; msg.textContent='내용을 입력해주세요'; return; }
  if (typeof qrcode === 'undefined') {
    msg.className='msg err'; msg.style.display='block';
    msg.textContent='QR 라이브러리를 불러오지 못했습니다. 새로고침 후 다시 시도해주세요.'; return;
  }

  const size   = parseInt(document.getElementById('qr-size').value, 10);
  const margin = parseInt(document.getElementById('qr-margin').value, 10);
  try {
    qrcode.stringToBytes = qrcode.stringToBytesFuncs['UTF-8'];   // 한글 지원
    const qr = qrcode(0, 'M');
    qr.addData(text);
    qr.make();

    const count = qr.getModuleCount();
    const cell  = Math.max(1, Math.floor(size / (count + margin * 2)));
    const dim   = cell * (count + margin * 2);
    const cv    = document.getElementById('qr-canvas');
    cv.width = dim; cv.height = dim;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, dim, dim);
    ctx.fillStyle = '#000';
    for (let r = 0; r < count; r++) {
      for (let c = 0; c < count; c++) {
        if (qr.isDark(r, c)) ctx.fillRect((c + margin) * cell, (r + margin) * cell, cell, cell);
      }
    }
    cv.style.display = '';
    document.getElementById('qr-empty').style.display = 'none';
    document.getElementById('qr-dl-btn').style.display = '';
  } catch (e) {
    msg.className='msg err'; msg.style.display='block';
    msg.textContent = '생성 실패: 내용이 너무 깁니다 (' + e.message + ')';
  }
}

function qrDownload() {
  const cv   = document.getElementById('qr-canvas');
  const text = document.getElementById('qr-text').value.trim();
  const name = (text.replace(/^https?:\/\//,'').replace(/[^A-Za-z0-9_-]/g,'_').slice(0,40) || 'qr') + '.png';
  const a = document.createElement('a');
  a.href = cv.toDataURL('image/png');
  a.download = name;
  a.click();
}
</script>

<!-- 세션 만료 경고 토스트 -->
<div id="sess-timeout-warn" style="display:none;position:fixed;bottom:28px;right:28px;z-index:9999;
  background:#1e293b;color:#f8fafc;border-radius:12px;padding:20px 22px;
  box-shadow:0 8px 32px rgba(0,0,0,.35);max-width:300px;width:300px;
  flex-direction:column;gap:12px;border:1px solid rgba(255,255,255,.1)">
  <div style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:#fbbf24">
    <span>⚠️</span><span>자동 로그아웃 예정</span>
  </div>
  <div style="font-size:12px;color:rgba(255,255,255,.65);line-height:1.7">
    <span id="sess-timeout-cd" style="font-family:'Space Mono',monospace;font-size:20px;font-weight:700;color:#fff;display:block;margin-bottom:4px">5:00</span>
    후 비활동으로 자동 로그아웃됩니다.
  </div>
  <button onclick="extendAdminSession()"
    style="background:#2563eb;color:#fff;border:none;border-radius:8px;
    padding:9px 0;font-size:12px;font-weight:700;cursor:pointer;
    font-family:'Space Mono',monospace;width:100%;transition:.2s"
    onmouseover="this.style.background='#1d4ed8'" onmouseout="this.style.background='#2563eb'">
    계속 사용하기
  </button>
</div>

</body>
</html>
