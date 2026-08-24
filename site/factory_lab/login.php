<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>로그인 | 스마트 팩토리 포털</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="/factory_lab/css/style.css">
</head>
<body>
<header class="site-header">
    <div class="header-inner">
        <div>
            <div class="logo">DATA<span>FORGE</span></div>
            <div class="logo-sub">factory lab</div>
        </div>
    </div>
</header>
<main class="main-content">

<div class="login-wrap">
    <div class="login-box">
        <h2>&#128274; 포털 로그인</h2>

        
        <form method="post" id="login-form">
            <div class="form-group">
                <label for="username">아이디</label>
                <input type="text" id="username" name="username"
                       value=""
                       placeholder="아이디를 입력하세요" autocomplete="username">
            </div>
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input type="password" id="password" name="password"
                       placeholder="비밀번호를 입력하세요" autocomplete="current-password">
            </div>
            <button type="submit" class="btn btn-primary" id="login-btn">로그인</button>
        </form>

        <div class="login-accounts">
            <strong>테스트 계정 (비밀번호: test1234)</strong><br>
            <table style="width:100%; margin-top:6px; font-size:.78rem; border-collapse:collapse;">
                <tr><td style="padding:3px 0; color:#374151;"><strong>admin</strong></td><td style="color:#64748b;">관리자 / 시스템관리</td></tr>
                <tr><td style="padding:3px 0; color:#374151;"><strong>worker01</strong></td><td style="color:#64748b;">김철수 / 생산1팀</td></tr>
                <tr><td style="padding:3px 0; color:#374151;"><strong>worker02</strong></td><td style="color:#64748b;">이영희 / 생산2팀</td></tr>
                <tr><td style="padding:3px 0; color:#374151;"><strong>engineer01</strong></td><td style="color:#64748b;">박민준 / 설비관리팀</td></tr>
            </table>
        </div>
    </div>
</div>

</main>
<footer class="site-footer">
    © 2026 DATAFORGE · FACTORY LAB · dataforge.ai.kr
</footer>
<script src="/mfg/js/promo.js" defer></script>
</body>
</html>
