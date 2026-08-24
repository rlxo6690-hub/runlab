/* ============================================================
   BuildUp Lab 교육 문의 배너 — DataForge 전 도구 공통
   목적: 도구를 쓰러 온 방문자에게 교육 문의 경로를 만든다.
   · 우하단 플로팅 배너, 닫으면 30일간 다시 뜨지 않음
   · 클릭 시 builduplab.co.kr 문의 폼이 바로 열림 (?inquiry=1)
   · UTM으로 어느 도구에서 왔는지 추적
   삽입: <script src="/mfg/js/promo.js" defer></script>
   ============================================================ */
(function () {
  var KEY = "bul_promo_hide";
  var DAYS = 30;
  var HOME = "https://builduplab.co.kr/";

  try {
    var until = Number(localStorage.getItem(KEY) || 0);
    if (until && Date.now() < until) return;      // 닫은 지 30일 안 됨
  } catch (e) { /* 스토리지 차단 환경 — 그냥 표시 */ }

  function build() {
    if (document.getElementById("bul-promo")) return;

    var page = (location.pathname || "/").replace(/^\/+|\/+$/g, "") || "home";
    var url = HOME + "?inquiry=1&utm_source=dataforge&utm_medium=banner&utm_campaign=tools&utm_content="
      + encodeURIComponent(page);

    var css = document.createElement("style");
    css.textContent = [
      "#bul-promo{position:fixed;right:18px;bottom:18px;z-index:2147483000;max-width:340px;",
      "display:flex;align-items:flex-start;gap:10px;padding:13px 14px;border-radius:14px;",
      "background:#0f172a;color:#e2e8f0;box-shadow:0 10px 30px rgba(15,23,42,.28);",
      "border:1px solid rgba(255,255,255,.1);font-family:'Noto Sans KR','Segoe UI',system-ui,sans-serif;",
      "font-size:13px;line-height:1.6;animation:bulUp .35s ease both}",
      "@keyframes bulUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}",
      "#bul-promo .bul-ico{font-size:20px;line-height:1.2;flex-shrink:0}",
      // span들이 inline으로 흘러 서로 겹치지 않도록 세로 스택으로 고정
      "#bul-promo .bul-body{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start;gap:2px}",
      "#bul-promo .bul-t{display:block;font-weight:700;color:#fff;line-height:1.45}",
      "#bul-promo .bul-d{display:block;color:rgba(226,232,240,.72);font-size:12px;line-height:1.5;margin-bottom:7px}",
      "#bul-promo .bul-cta{display:inline-block;background:#2563eb;color:#fff;text-decoration:none;",
      "font-size:12px;font-weight:700;padding:7px 14px;border-radius:8px;transition:background .15s;white-space:nowrap}",
      "#bul-promo .bul-cta:hover{background:#1d4ed8}",
      "#bul-promo .bul-x{background:none;border:none;color:rgba(226,232,240,.45);cursor:pointer;",
      "font-size:15px;line-height:1;padding:2px 4px;flex-shrink:0;font-family:inherit}",
      "#bul-promo .bul-x:hover{color:#fff}",
      "@media(max-width:640px){#bul-promo{right:10px;left:10px;bottom:10px;max-width:none}}",
      "@media print{#bul-promo{display:none}}",
    ].join("");
    document.head.appendChild(css);

    var box = document.createElement("div");
    box.id = "bul-promo";
    box.setAttribute("role", "complementary");
    box.innerHTML =
      '<span class="bul-ico">🎓</span>' +
      '<span class="bul-body">' +
        '<span class="bul-t">이 도구는 BuildUp Lab 교육 실습용입니다</span>' +
        '<span class="bul-d">기업·공공기관 맞춤 AI 실무 교육 — 커리큘럼·견적 문의</span>' +
        '<a class="bul-cta" href="' + url + '" target="_blank" rel="noopener">교육 문의하기 →</a>' +
      '</span>' +
      '<button class="bul-x" aria-label="닫기">✕</button>';

    box.querySelector(".bul-x").onclick = function () {
      try { localStorage.setItem(KEY, String(Date.now() + DAYS * 864e5)); } catch (e) {}
      box.remove();
    };
    document.body.appendChild(box);
  }

  // 도구 첫 사용을 방해하지 않도록 6초 뒤 노출
  function schedule() { setTimeout(build, 6000); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", schedule);
  } else schedule();
})();

/* ============================================================
   개선 의견 칩 — DataForge 전 도구 공통 (좌하단)
   · 클릭 시 의견 작성 모달, 현재 페이지 경로 자동 첨부
   · 저장: /mfg/api/feedback.php → admin 운영 > 개선 의견
   ============================================================ */
(function () {
  if (location.pathname.indexOf("/admin") === 0) return; // 관리자 페이지 제외

  function build() {
    if (document.getElementById("dffb-chip")) return;

    var css = document.createElement("style");
    css.textContent = [
      "#dffb-chip{position:fixed;left:18px;bottom:18px;z-index:2147483000;display:inline-flex;align-items:center;gap:6px;",
      "padding:10px 14px;border-radius:999px;background:#fff;color:#475569;border:1px solid #cbd5e1;",
      "box-shadow:0 6px 20px rgba(15,23,42,.12);font-family:'Noto Sans KR','Segoe UI',system-ui,sans-serif;",
      "font-size:12px;font-weight:700;cursor:pointer;transition:.15s}",
      "#dffb-chip:hover{color:#2563eb;border-color:#2563eb}",
      "#dffb-bg{display:none;position:fixed;inset:0;z-index:2147483001;background:rgba(15,23,42,.45);",
      "align-items:center;justify-content:center;padding:16px;font-family:'Noto Sans KR','Segoe UI',system-ui,sans-serif}",
      "#dffb-bg.open{display:flex}",
      "#dffb-modal{width:100%;max-width:420px;background:#fff;border:1px solid #cbd5e1;border-radius:14px;",
      "padding:22px;box-shadow:0 20px 60px rgba(15,23,42,.2);color:#1e293b}",
      "#dffb-modal h3{font-size:16px;margin:0 0 4px;font-weight:700}",
      "#dffb-modal p{font-size:12px;color:#64748b;margin:0 0 12px;line-height:1.6}",
      "#dffb-modal .dffb-page{display:inline-block;font-size:11px;color:#2563eb;background:rgba(37,99,235,.08);",
      "border:1px solid rgba(37,99,235,.25);border-radius:6px;padding:2px 8px;margin-bottom:10px}",
      "#dffb-modal label{display:block;font-size:11px;font-weight:700;color:#64748b;margin:10px 0 4px}",
      "#dffb-modal textarea,#dffb-modal input{width:100%;box-sizing:border-box;font-family:inherit;font-size:16px;",
      "color:#1e293b;background:#f8fafc;border:1px solid #cbd5e1;border-radius:8px;padding:10px 12px;outline:none}",
      "#dffb-modal textarea:focus,#dffb-modal input:focus{border-color:#2563eb}",
      "#dffb-modal textarea{resize:vertical;min-height:100px}",
      "#dffb-modal .dffb-cnt{text-align:right;font-size:11px;color:#94a3b8;margin-top:3px}",
      "#dffb-modal .dffb-btns{display:flex;gap:8px;margin-top:14px}",
      "#dffb-modal .dffb-btns button{flex:1;font-family:inherit;font-size:13px;font-weight:700;padding:12px;",
      "border-radius:8px;cursor:pointer;border:1px solid #cbd5e1;background:#fff;color:#64748b;min-height:44px}",
      "#dffb-modal .dffb-btns .dffb-go{background:#2563eb;border-color:#2563eb;color:#fff}",
      "#dffb-modal .dffb-msg{font-size:12px;margin-top:10px;display:none}",
      "@media(max-width:640px){#dffb-chip{left:10px;bottom:10px}}",
      "@media print{#dffb-chip,#dffb-bg{display:none!important}}",
    ].join("");
    document.head.appendChild(css);

    var page = location.pathname || "/";

    var chip = document.createElement("button");
    chip.id = "dffb-chip";
    chip.type = "button";
    chip.innerHTML = "💡 의견";
    chip.setAttribute("aria-label", "개선 의견 보내기");
    document.body.appendChild(chip);

    var bg = document.createElement("div");
    bg.id = "dffb-bg";
    bg.innerHTML =
      '<div id="dffb-modal">' +
        "<h3>💡 개선 의견 보내기</h3>" +
        "<p>불편한 점, 있었으면 하는 기능을 자유롭게 적어주세요. 운영자만 봅니다.</p>" +
        '<span class="dffb-page">📍 ' + page.replace(/</g, "&lt;") + "</span>" +
        "<label>의견 * (10~500자)</label>" +
        '<textarea id="dffb-text" maxlength="500"></textarea>' +
        '<div class="dffb-cnt" id="dffb-cnt">0/500</div>' +
        "<label>회신 받을 연락처 <span style='font-weight:400'>(선택 — 이메일 등)</span></label>" +
        '<input id="dffb-contact" maxlength="50" placeholder="answer@example.com">' +
        '<input id="dffb-web" style="display:none" tabindex="-1" autocomplete="off">' +
        '<div class="dffb-msg" id="dffb-msg"></div>' +
        '<div class="dffb-btns"><button type="button" id="dffb-close">닫기</button>' +
        '<button type="button" class="dffb-go" id="dffb-go">보내기</button></div>' +
      "</div>";
    document.body.appendChild(bg);

    chip.onclick = function () { bg.classList.add("open"); };
    document.getElementById("dffb-close").onclick = function () { bg.classList.remove("open"); };
    bg.onclick = function (e) { if (e.target === bg) bg.classList.remove("open"); };
    document.getElementById("dffb-text").oninput = function () {
      document.getElementById("dffb-cnt").textContent = this.value.length + "/500";
    };

    document.getElementById("dffb-go").onclick = function () {
      var text = document.getElementById("dffb-text").value.trim();
      var msg = document.getElementById("dffb-msg");
      var show = function (t, ok) {
        msg.style.display = "block";
        msg.style.color = ok ? "#059669" : "#dc2626";
        msg.textContent = t;
      };
      if (text.length < 10) { show("의견을 10자 이상 적어주세요", false); return; }
      var btn = this; btn.disabled = true;
      fetch("/mfg/api/feedback.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          contact: document.getElementById("dffb-contact").value.trim(),
          page: page,
          website: document.getElementById("dffb-web").value,
        }),
      }).then(function (r) { return r.json(); }).then(function (d) {
        btn.disabled = false;
        if (!d.ok) { show(d.msg || "전송 실패", false); return; }
        show(d.msg, true);
        setTimeout(function () {
          bg.classList.remove("open");
          msg.style.display = "none";
          document.getElementById("dffb-text").value = "";
          document.getElementById("dffb-cnt").textContent = "0/500";
        }, 1800);
      }).catch(function () { btn.disabled = false; show("전송 실패 — 잠시 후 다시 시도해주세요", false); });
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else build();
})();
