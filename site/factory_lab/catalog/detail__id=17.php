<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>체인 호이스트 1T | 스마트 팩토리 포털</title>
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

<div class="page-header">
    <div class="breadcrumb">
        <a href="/factory_lab/">홈</a> <span>›</span>
        <a href="/factory_lab/catalog/">부품 카탈로그</a> <span>›</span>
        <a href="/factory_lab/catalog/?category=%EB%AC%BC%EB%A5%98%EC%9E%A5%EB%B9%84">물류장비</a>
    </div>
</div>

<div style="display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: start;">

    <!-- 메인 정보 -->
    <div class="card" id="item-detail">
        <div style="margin-bottom: 20px;">
            <div style="font-size: .78rem; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;" id="item-category">물류장비</div>
            <h1 id="item-name" style="font-size: 1.4rem; font-weight: 700; color: #0f172a; margin-bottom: 8px;">체인 호이스트 1T</h1>
            <div style="font-size: .85rem; color: #64748b;" id="item-meta">
                <span>제조사: <strong>(주)기계호이스트</strong></span>
                &nbsp;|&nbsp;
                <span>모델번호: <strong id="item-model">CH-1TON-A</strong></span>
                &nbsp;|&nbsp;
                <span>등록일: 2026-03-23</span>
            </div>
        </div>

        <p id="item-description" style="font-size: .9rem; color: #374151; line-height: 1.7; margin-bottom: 24px; padding: 14px; background: #f8fafc; border-radius: 6px;">
            수동 체인 호이스트 1톤.        </p>

        <!-- 스펙 테이블 -->
        <h3 style="font-size: .95rem; font-weight: 700; margin-bottom: 12px; color: #0f172a;">제품 사양</h3>
        <div class="table-wrap">
            <table id="spec-table">
                <thead>
                    <tr>
                        <th style="width: 160px;">항목</th>
                        <th>사양</th>
                    </tr>
                </thead>
                <tbody>
                                        <tr>
                        <td class="spec-key" style="color: #64748b; font-size: .85rem;">정격하중</td>
                        <td class="spec-value" style="font-weight: 500;">1,000kg</td>
                    </tr>
                                        <tr>
                        <td class="spec-key" style="color: #64748b; font-size: .85rem;">양정</td>
                        <td class="spec-value" style="font-weight: 500;">3m</td>
                    </tr>
                                        <tr>
                        <td class="spec-key" style="color: #64748b; font-size: .85rem;">체인등급</td>
                        <td class="spec-value" style="font-weight: 500;">G80</td>
                    </tr>
                                        <tr>
                        <td class="spec-key" style="color: #64748b; font-size: .85rem;">중량</td>
                        <td class="spec-value" style="font-weight: 500;">12kg</td>
                    </tr>
                                        <tr>
                        <td class="spec-key" style="color: #64748b; font-size: .85rem;">작동방식</td>
                        <td class="spec-value" style="font-weight: 500;">수동</td>
                    </tr>
                                    </tbody>
            </table>
        </div>

        <div style="margin-top: 20px;">
            <a href="/factory_lab/catalog/" class="btn btn-secondary">목록으로</a>
        </div>
    </div>

    <!-- 사이드 정보 -->
    <div>
        <div class="card" style="margin-bottom: 16px;" id="price-box">
            <div style="font-size: .78rem; color: #64748b; margin-bottom: 4px;">단가 (부가세 별도)</div>
            <div id="item-price" style="font-size: 2rem; font-weight: 700; color: #2563eb;">890,000원</div>
            <div style="margin: 12px 0; font-size: .85rem;">
                재고:
                                <span style="color: #16a34a; font-weight: 600;" id="item-stock">5개 보유</span>
                            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="alert('발주 기능은 실습용 사이트에서 지원하지 않습니다.')">발주 요청</button>
        </div>

        <!-- 관련 상품 -->
            </div>

</div>

</main>
<footer class="site-footer">
    © 2026 DATAFORGE · FACTORY LAB · dataforge.ai.kr
</footer>
<script src="/mfg/js/promo.js" defer></script>
</body>
</html>
