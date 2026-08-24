// ============================================================
//  BIZ DataForge — 경영 데이터 생성기
// ============================================================

/* ── 유틸 함수 ──────────────────────────────────────────── */
function rnd(min, max) { return Math.random() * (max - min) + min; }
function rndInt(min, max) { return Math.floor(rnd(min, max + 1)); }
function gauss(mean, std) {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function fmtNum(n, dec=0) { return n.toLocaleString('ko-KR', {minimumFractionDigits:dec, maximumFractionDigits:dec}); }
function fmtDate(d) {
  return d.getFullYear() + '-' +
    String(d.getMonth()+1).padStart(2,'0') + '-' +
    String(d.getDate()).padStart(2,'0');
}
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate()+n); return r; }

/* ── 수요 예측 데이터 생성 ─────────────────────────────── */
function generateDemandData(opts) {
  const rows = [];
  const products = [];
  const industries = {
    retail:        { baseSales: [500,3000], price: [5000,50000] },
    ecommerce:     { baseSales: [200,2000], price: [10000,100000] },
    food:          { baseSales: [1000,8000], price: [2000,15000] },
    manufacturing: { baseSales: [50,500],   price: [100000,1000000] },
    fashion:       { baseSales: [100,1000], price: [30000,200000] },
  };
  const cfg = industries[opts.industry] || industries.retail;
  const categories = ['A', 'B', 'C', 'D'];

  for (let p = 0; p < opts.numProducts; p++) {
    const pid = 'P' + String(p+1).padStart(3,'0');
    products.push({
      id: pid,
      name: `상품_${pid}`,
      cat: categories[p % categories.length],
      base: rnd(cfg.baseSales[0], cfg.baseSales[1]),
      price: rndInt(cfg.price[0], cfg.price[1]),
    });
  }

  const start = new Date('2023-01-01');
  const days = opts.days;
  const promoProb = { none: 0, some: 0.03, frequent: 0.1 }[opts.promo] || 0.03;

  for (let d = 0; d < days; d++) {
    const date = addDays(start, d);
    const dayOfYear = d % 365;
    const week = date.getDay();

    // 계절성 계수
    let seasonal = 1;
    if (opts.seasonal === 'mild')   seasonal = 1 + 0.15 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI/2);
    if (opts.seasonal === 'strong') seasonal = 1 + 0.40 * Math.sin((dayOfYear / 365) * 2 * Math.PI - Math.PI/2);

    // 트렌드
    let trend = 1;
    if (opts.trend === 'up')       trend = 1 + (d / 365) * 0.20;
    if (opts.trend === 'down')     trend = Math.max(0.5, 1 - (d / 365) * 0.10);
    if (opts.trend === 'volatile') trend = 1 + 0.3 * Math.sin((d / 30) * 2 * Math.PI);

    // 주말 효과
    const weekend = (week === 0 || week === 6) ? 1.3 : 1.0;

    const isPromo = Math.random() < promoProb;
    const promoMult = isPromo ? rnd(1.5, 3.0) : 1;
    const promoTypes = ['SALE', 'COUPON', 'EVENT', 'BUNDLE'];
    const promoType = isPromo ? promoTypes[rndInt(0, 3)] : null;

    for (const prod of products) {
      const qty = Math.round(Math.max(0, gauss(prod.base, prod.base * 0.2) * seasonal * trend * weekend * promoMult));
      const stockBase = Math.round(prod.base * 5);
      const stock = clamp(rndInt(stockBase * 0.3, stockBase * 1.5), 0, 99999);

      const row = {
        date: fmtDate(date),
        product_id: prod.id,
        product_name: prod.name,
        category: prod.cat,
        sales_qty: qty,
        sales_amount: qty * prod.price,
        unit_price: prod.price,
        promo_flag: isPromo ? 1 : 0,
        promo_type: promoType || '',
        stock_qty: stock,
        day_of_week: ['일','월','화','수','목','금','토'][week],
        is_weekend: (week === 0 || week === 6) ? 1 : 0,
      };
      rows.push(row);
    }
  }
  return rows;
}

/* ── 재무 P&L 생성 ─────────────────────────────────────── */
function generateFinanceData(opts) {
  const rows = [];
  const sizeConfig = {
    small:  { revenueBase: 2e9,  revStd: 3e8 },
    medium: { revenueBase: 2e10, revStd: 3e9 },
    large:  { revenueBase: 1e11, revStd: 1e10 },
  };
  const indConfig = {
    manufacturing: { cogsPct:[0.55,0.70], opexPct:[0.15,0.25] },
    retail:        { cogsPct:[0.60,0.75], opexPct:[0.10,0.20] },
    service:       { cogsPct:[0.30,0.50], opexPct:[0.20,0.35] },
    tech:          { cogsPct:[0.25,0.45], opexPct:[0.25,0.40] },
  };
  const cfg = sizeConfig[opts.size] || sizeConfig.medium;
  const iCfg = indConfig[opts.industry] || indConfig.manufacturing;

  const divNames = ['사업부A','사업부B','사업부C','사업부D','사업부E',
                    '사업부F','사업부G','사업부H','사업부I','사업부J'];

  const divs = Array.from({length: opts.divisions}, (_, i) => ({
    name: divNames[i] || `사업부${String.fromCharCode(65+i)}`,
    revScale: rnd(0.5, 1.5),
  }));

  const startYear = 2023;
  let trend = 1;

  for (let m = 0; m < opts.months; m++) {
    const year = startYear + Math.floor(m / 12);
    const month = (m % 12) + 1;
    const ym = `${year}-${String(month).padStart(2,'0')}`;
    trend = 1 + (m / opts.months) * 0.15;

    // 계절성
    const seasonal = 1 + 0.12 * Math.sin((month / 12) * 2 * Math.PI - Math.PI/2);

    for (const div of divs) {
      const rev = Math.round(gauss(cfg.revenueBase * div.revScale * trend * seasonal, cfg.revStd * 0.3));
      const cogsPct = rnd(iCfg.cogsPct[0], iCfg.cogsPct[1]);
      const opexPct = rnd(iCfg.opexPct[0], iCfg.opexPct[1]);
      const cogs = Math.round(rev * cogsPct);
      const grossProfit = rev - cogs;
      const opex = Math.round(rev * opexPct);
      const ebit = grossProfit - opex;
      const tax = ebit > 0 ? Math.round(ebit * 0.22) : 0;
      const netIncome = ebit - tax;
      const headcount = rndInt(20, 200) + Math.floor(div.revScale * 50);

      rows.push({
        year_month: ym,
        division: div.name,
        revenue: rev,
        cogs: cogs,
        gross_profit: grossProfit,
        gross_margin_pct: ((grossProfit / rev) * 100).toFixed(1),
        opex: opex,
        ebit: ebit,
        ebit_margin_pct: ((ebit / rev) * 100).toFixed(1),
        net_income: netIncome,
        net_margin_pct: ((netIncome / rev) * 100).toFixed(1),
        headcount: headcount,
        revenue_per_head: Math.round(rev / headcount),
      });
    }
  }
  return rows;
}

/* ── 고객 분석 (RFM/Churn) 생성 ──────────────────────── */
function generateCustomerData(opts) {
  const rows = [];
  const segments = [
    { name: 'Champions',       freqBase: 10, recMax: 30,  monBase: 500000, pct: 0.10 },
    { name: 'Loyal',           freqBase: 6,  recMax: 60,  monBase: 200000, pct: 0.15 },
    { name: 'Potential',       freqBase: 3,  recMax: 90,  monBase: 80000,  pct: 0.20 },
    { name: 'At_Risk',         freqBase: 2,  recMax: 180, monBase: 50000,  pct: 0.20 },
    { name: 'Cant_Lose',       freqBase: 4,  recMax: 200, monBase: 150000, pct: 0.10 },
    { name: 'Hibernating',     freqBase: 1,  recMax: 300, monBase: 20000,  pct: 0.15 },
    { name: 'Lost',            freqBase: 1,  recMax: 365, monBase: 10000,  pct: 0.10 },
  ];

  const churnRate = opts.churnRate / 100;

  for (let i = 0; i < opts.count; i++) {
    const custId = 'CUS-' + String(i+1).padStart(6,'0');

    // 세그먼트 배정
    let seg = segments[segments.length - 1];
    let r = Math.random();
    for (const s of segments) {
      if (r < s.pct) { seg = s; break; }
      r -= s.pct;
    }

    const recency = rndInt(1, seg.recMax);
    const freq = Math.max(1, Math.round(gauss(seg.freqBase, seg.freqBase * 0.3)));
    const monetary = Math.max(0, Math.round(gauss(seg.monBase, seg.monBase * 0.4)));
    const avgOrderValue = freq > 0 ? Math.round(monetary / freq) : 0;

    // RFM 점수 (1~5)
    const rScore = recency <= 30 ? 5 : recency <= 90 ? 4 : recency <= 180 ? 3 : recency <= 270 ? 2 : 1;
    const fScore = freq >= 10 ? 5 : freq >= 6 ? 4 : freq >= 3 ? 3 : freq >= 2 ? 2 : 1;
    const mScore = monetary >= 500000 ? 5 : monetary >= 200000 ? 4 : monetary >= 80000 ? 3 : monetary >= 30000 ? 2 : 1;
    const rfmScore = rScore + fScore + mScore;

    // 이탈 확률
    const baseChurn = { Champions:0.02, Loyal:0.05, Potential:0.12, At_Risk:0.35,
                        Cant_Lose:0.25, Hibernating:0.55, Lost:0.85 }[seg.name] || 0.3;
    const churnProb = clamp(gauss(baseChurn, 0.08), 0, 1);
    const isChurn = churnProb > (1 - churnRate * 2) ? 1 : 0;

    // CLV 추정 (간단 모델)
    const clv = Math.round(monetary * (freq / 12) * 3 * (1 - churnProb));

    const tenure = rndInt(1, 60); // months
    const age = rndInt(20, 70);

    rows.push({
      customer_id: custId,
      age: age,
      gender: Math.random() > 0.5 ? 'M' : 'F',
      tenure_months: tenure,
      recency_days: recency,
      frequency: freq,
      monetary: monetary,
      avg_order_value: avgOrderValue,
      r_score: rScore,
      f_score: fScore,
      m_score: mScore,
      rfm_score: rfmScore,
      segment: seg.name,
      churn_probability: churnProb.toFixed(3),
      churn_label: isChurn,
      clv_estimate: clv,
      contract_type: ['월정액','연정액','선불'][rndInt(0,2)],
    });
  }
  return rows;
}

/* ── 공급망 생성 ─────────────────────────────────────── */
function generateSupplyData(opts) {
  const rows = [];
  const warehouses = ['WH-A', 'WH-B', 'WH-C'];
  const skus = Array.from({length: opts.numSkus}, (_, i) => ({
    id: 'SKU-' + String(i+1).padStart(4,'0'),
    name: `품목_${String(i+1).padStart(4,'0')}`,
    cat: ['원자재','반제품','완제품','소모품'][i % 4],
    baseStock: rndInt(100, 2000),
    reorder: rndInt(50, 400),
    leadTime: rndInt(3, 30),
    unitCost: rndInt(1000, 200000),
  }));

  const delayRate = opts.delayRate / 100;
  const stockoutRate = opts.stockoutRate / 100;
  const start = new Date('2023-01-01');

  for (let d = 0; d < opts.days; d++) {
    const date = addDays(start, d);
    if (date.getDay() === 0 || date.getDay() === 6) continue; // 주말 제외

    for (const sku of skus) {
      const stockNoise = gauss(1, 0.15);
      const stockQty = Math.max(0, Math.round(sku.baseStock * stockNoise));
      const isStockout = stockQty < sku.reorder && Math.random() < stockoutRate ? 1 : 0;
      const orderQty = isStockout || stockQty < sku.reorder ? rndInt(sku.reorder, sku.reorder * 3) : 0;
      const isDelay = orderQty > 0 && Math.random() < delayRate ? 1 : 0;
      const delayDays = isDelay ? rndInt(1, 15) : 0;
      const actualLead = sku.leadTime + delayDays;

      rows.push({
        date: fmtDate(date),
        sku_id: sku.id,
        sku_name: sku.name,
        category: sku.cat,
        warehouse: warehouses[rndInt(0, warehouses.length-1)],
        stock_qty: stockQty,
        reorder_point: sku.reorder,
        order_qty: orderQty,
        lead_time_days: sku.leadTime,
        actual_lead_days: actualLead,
        delay_days: delayDays,
        stockout_flag: isStockout,
        unit_cost: sku.unitCost,
        inventory_value: stockQty * sku.unitCost,
      });
    }
  }
  return rows;
}

/* ── HR 데이터 생성 ─────────────────────────────────── */
function generateHRData(opts) {
  const rows = [];
  const deptNames = ['영업','개발','생산','인사','재무','마케팅','물류','구매','품질','기획'];
  const positions = ['사원','대리','과장','차장','부장','이사'];
  const posSalary = [2800, 3800, 5000, 6500, 8000, 12000]; // 만원
  const educations = ['고졸','전문대졸','대졸','대학원졸'];

  const turnoverRate = opts.turnoverRate / 100;

  for (let i = 0; i < opts.count; i++) {
    const empId = 'EMP-' + String(i+1).padStart(4,'0');
    const deptIdx = i % opts.numDepts;
    const dept = deptNames[deptIdx] || `부서${deptIdx+1}`;
    const posIdx = rndInt(0, 5);
    const pos = positions[posIdx];
    const tenure = rnd(0, 30);
    const age = Math.round(24 + tenure + rnd(0, 5));
    const education = educations[rndInt(0, 3)];

    const baseSalary = posSalary[posIdx];
    const salary = Math.round(gauss(baseSalary, baseSalary * 0.15));
    const perfScore = clamp(gauss(3.2, 0.7), 1, 5);
    const satisfaction = clamp(gauss(3.0, 0.8), 1, 5);
    const overtime = clamp(rndInt(0, 60), 0, 80); // 월 초과근무시간

    // 이직 위험도 모델
    const turnoverRisk = clamp(
      0.3 - (satisfaction - 1) * 0.08
        - (tenure / 30) * 0.05
        + (overtime / 80) * 0.15
        - (perfScore - 1) * 0.03
        + rnd(-0.1, 0.1),
      0, 1
    );
    const turnoverLabel = turnoverRisk > (1 - turnoverRate * 2) ? 1 : 0;

    rows.push({
      employee_id: empId,
      department: dept,
      position: pos,
      age: age,
      gender: Math.random() > 0.4 ? 'M' : 'F',
      education: education,
      tenure_years: tenure.toFixed(1),
      annual_salary: salary,
      monthly_salary: Math.round(salary / 12),
      performance_score: perfScore.toFixed(2),
      satisfaction_score: satisfaction.toFixed(2),
      overtime_hours: overtime,
      work_life_balance: clamp(5 - (overtime / 20), 1, 5).toFixed(1),
      promotions_last3y: rndInt(0, 2),
      turnover_risk: turnoverRisk.toFixed(3),
      turnover_label: turnoverLabel,
    });
  }
  return rows;
}
