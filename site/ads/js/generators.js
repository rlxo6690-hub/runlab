// ============================================================
//  ADS DataForge — 광고 데이터 생성기
// ============================================================

function rnd(min, max) { return Math.random() * (max - min) + min; }
function rndInt(min, max) { return Math.floor(rnd(min, max + 1)); }
function gauss(mean, std) {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function fmtDate(d) {
  return d.getFullYear() + '-' +
    String(d.getMonth()+1).padStart(2,'0') + '-' +
    String(d.getDate()).padStart(2,'0');
}
function fmtDatetime(d) {
  return fmtDate(d) + ' ' +
    String(d.getHours()).padStart(2,'0') + ':' +
    String(d.getMinutes()).padStart(2,'0') + ':' +
    String(d.getSeconds()).padStart(2,'0');
}
function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate()+n); return r; }
function pick(arr) { return arr[rndInt(0, arr.length-1)]; }

/* ── 캠페인 성과 생성 ────────────────────────────────────── */
function generateCampaignData(opts) {
  const rows = [];
  const platforms = {
    meta:         { ctrBase:2.5, cpmBase:8000,  cpaBase:15000, roasBase:2.8 },
    google:       { ctrBase:3.5, cpmBase:5000,  cpaBase:12000, roasBase:3.5 },
    kakao:        { ctrBase:1.8, cpmBase:6000,  cpaBase:18000, roasBase:2.2 },
    naver:        { ctrBase:2.0, cpmBase:7000,  cpaBase:14000, roasBase:3.0 },
    tiktok:       { ctrBase:3.0, cpmBase:4000,  cpaBase:20000, roasBase:2.0 },
    multichannel: { ctrBase:2.5, cpmBase:6000,  cpaBase:15000, roasBase:2.8 },
  };
  const plat = platforms[opts.platform] || platforms.meta;
  const platNames = {
    multichannel: ['Meta','Google','Kakao','Naver','TikTok'],
  };
  const objectives = ['awareness','traffic','conversion','roas'];

  const campaigns = Array.from({length: opts.numCampaigns}, (_, i) => {
    const platName = opts.platform === 'multichannel'
      ? platNames.multichannel[i % 5]
      : opts.platform.charAt(0).toUpperCase() + opts.platform.slice(1);
    return {
      id: 'CAM-' + String(i+1).padStart(3,'0'),
      name: `캠페인_${String(i+1).padStart(3,'0')}`,
      platform: platName,
      objective: opts.objective === 'roas' ? 'roas' : objectives[i % 4],
      budgetMin: opts.budgetMin,
      budgetMax: opts.budgetMax,
      ctrScale: rnd(0.6, 1.4),
      roasScale: rnd(0.5, 1.8),
    };
  });

  const start = new Date('2023-01-01');
  for (let d = 0; d < opts.days; d++) {
    const date = addDays(start, d);
    const dow = date.getDay();
    const weekendMult = (dow === 0 || dow === 6) ? 1.2 : 1.0;
    const seasonal = 1 + 0.1 * Math.sin((d / 30) * 2 * Math.PI);

    for (const cam of campaigns) {
      const budget = rndInt(cam.budgetMin, cam.budgetMax);
      const cpm = Math.round(gauss(plat.cpmBase, plat.cpmBase * 0.2));
      const impressions = Math.round((budget / cpm) * 1000 * weekendMult * seasonal);
      const ctr = clamp(gauss(plat.ctrBase * cam.ctrScale, 0.5), 0.1, 15);
      const clicks = Math.round(impressions * ctr / 100);
      const cpc = clicks > 0 ? Math.round(budget / clicks) : 0;
      const cvrPct = opts.objective === 'awareness' ? rnd(0.5, 2) : rnd(1.5, 5);
      const conversions = Math.round(clicks * cvrPct / 100);
      const cpa = conversions > 0 ? Math.round(budget / conversions) : 0;
      const roas = clamp(gauss(plat.roasBase * cam.roasScale, 0.5), 0, 10);
      const revenue = Math.round(budget * roas);

      rows.push({
        date: fmtDate(date),
        campaign_id: cam.id,
        campaign_name: cam.name,
        platform: cam.platform,
        objective: cam.objective,
        impressions: impressions,
        clicks: clicks,
        ctr_pct: ctr.toFixed(2),
        spend: budget,
        cpm: cpm,
        cpc: cpc,
        conversions: conversions,
        cvr_pct: cvrPct.toFixed(2),
        cpa: cpa,
        roas: roas.toFixed(2),
        revenue: revenue,
        day_of_week: ['일','월','화','수','목','금','토'][dow],
      });
    }
  }
  return rows;
}

/* ── 소재 분석 생성 ─────────────────────────────────────── */
function generateCreativeData(opts) {
  const rows = [];
  const channelNames = ['Meta','Google','Kakao','Naver','TikTok','YouTube','Twitter'];
  const channels = channelNames.slice(0, opts.numChannels);
  const typeMap = {
    all:         ['image','video','carousel','text'],
    image_video: ['image','video'],
    image_only:  ['image'],
    video_only:  ['video'],
  };
  const types = typeMap[opts.creativeTypes] || typeMap.all;
  const ctrByType = { image:1.8, video:3.2, carousel:2.5, text:1.2 };
  const formats = { Meta:['feed','story','reels'], Google:['search','display','discovery'],
                    Kakao:['feed','talk'], Naver:['banner','search'], TikTok:['feed','topview'],
                    YouTube:['skippable','bumper'], Twitter:['feed','trending'] };

  let creativeIdx = 0;
  for (const channel of channels) {
    const fmtList = formats[channel] || ['feed'];
    for (let i = 0; i < opts.numCreatives; i++) {
      const ctype = types[i % types.length];
      const fmt = fmtList[i % fmtList.length];
      const baseCtr = ctrByType[ctype] || 2.0;
      const ctrScale = rnd(0.4, 1.8);
      const ctr = clamp(gauss(baseCtr * ctrScale, baseCtr * 0.3), 0.1, 15);
      const impressions = rndInt(5000, 500000) * opts.days;
      const clicks = Math.round(impressions * ctr / 100);
      const spend = Math.round(impressions * rnd(3000, 12000) / 1000);
      const cpc = clicks > 0 ? Math.round(spend / clicks) : 0;
      const convRate = rnd(0.5, 5);
      const conversions = Math.round(clicks * convRate / 100);
      const cpa = conversions > 0 ? Math.round(spend / conversions) : 0;
      const qualityScore = clamp(gauss(6.5, 1.5), 1, 10);
      const videoViewRate = ctype === 'video' ? clamp(gauss(45, 15), 5, 95) : null;
      const thumbStopRate = ctype === 'video' ? clamp(gauss(30, 10), 5, 70) : null;

      rows.push({
        creative_id: 'CRE-' + String(++creativeIdx).padStart(4,'0'),
        channel: channel,
        creative_type: ctype,
        format: fmt,
        period_days: opts.days,
        impressions: impressions,
        clicks: clicks,
        ctr_pct: ctr.toFixed(2),
        spend: spend,
        cpc: cpc,
        conversions: conversions,
        cvr_pct: convRate.toFixed(2),
        cpa: cpa,
        video_view_rate: videoViewRate !== null ? videoViewRate.toFixed(1) : '',
        thumb_stop_rate: thumbStopRate !== null ? thumbStopRate.toFixed(1) : '',
        quality_score: qualityScore.toFixed(1),
        frequency: rnd(1.5, 8).toFixed(1),
        reach: Math.round(impressions / rnd(1.5, 8)),
      });
    }
  }
  return rows;
}

/* ── A/B 테스트 생성 ────────────────────────────────────── */
function generateABTestData(opts) {
  const rows = [];
  const groupNames = ['A','B','C','D'].slice(0, opts.numGroups);
  const devices = ['mobile','desktop','tablet'];
  const deviceWeights = [0.65, 0.30, 0.05];

  const baseCvr = opts.baseCvr / 100;
  const effectMult = 1 + opts.effectPct / 100;

  // 그룹별 전환율
  const groupCvr = groupNames.map((g, i) => {
    if (i === 0) return baseCvr;
    return clamp(baseCvr * effectMult * (1 + rnd(-0.05, 0.05)), 0.001, 0.99);
  });

  let totalSamples = opts.totalSamples;
  const samplesPerGroup = Math.floor(totalSamples / opts.numGroups);
  const start = new Date('2023-06-01');
  const durationMs = 30 * 24 * 3600 * 1000;

  const typeRevenueBase = {
    landing: 50000, email: 30000, push: 20000,
    price: 80000, cta: 50000,
  };
  const revBase = typeRevenueBase[opts.testType] || 50000;

  for (const [gIdx, group] of groupNames.entries()) {
    const cvr = groupCvr[gIdx];
    for (let i = 0; i < samplesPerGroup; i++) {
      const userId = 'USR-' + String(gIdx * samplesPerGroup + i + 1).padStart(6,'0');
      const exposedAt = new Date(start.getTime() + Math.random() * durationMs);

      // 디바이스 선택
      let devR = Math.random();
      let device = 'mobile';
      for (let di = 0; di < deviceWeights.length; di++) {
        if (devR < deviceWeights[di]) { device = devices[di]; break; }
        devR -= deviceWeights[di];
      }

      // 디바이스별 CVR 보정
      const devMult = { mobile:0.85, desktop:1.2, tablet:1.0 }[device] || 1;
      const converted = Math.random() < cvr * devMult ? 1 : 0;
      let convertedAt = null;
      let timeToConvert = null;
      let revenue = 0;
      if (converted) {
        const delay = rndInt(60, 3600 * 48);
        convertedAt = new Date(exposedAt.getTime() + delay * 1000);
        timeToConvert = delay;
        revenue = Math.round(gauss(revBase, revBase * 0.4));
        if (revenue < 0) revenue = 0;
      }

      rows.push({
        user_id: userId,
        group: group,
        test_type: opts.testType,
        exposed_at: fmtDatetime(exposedAt),
        device: device,
        converted: converted,
        converted_at: convertedAt ? fmtDatetime(convertedAt) : '',
        time_to_convert_sec: timeToConvert || '',
        revenue: revenue,
      });
    }
  }
  return rows;
}

/* ── 전환 분석 생성 ─────────────────────────────────────── */
function generateConversionData(opts) {
  const rows = [];
  const regions = ['서울','경기','인천','부산','대구','광주','대전','기타'];
  const regionWeights = [0.30, 0.22, 0.08, 0.10, 0.07, 0.05, 0.06, 0.12];
  const channels = ['paid_search','paid_social','organic','direct','email','display'];
  const channelWeights = [0.30, 0.25, 0.20, 0.12, 0.08, 0.05];
  const devices = ['mobile','desktop','tablet'];
  const deviceWeights = [0.65, 0.30, 0.05];

  // 시간대별 가중치 (0~23시)
  const hourWeights = [
    0.3,0.2,0.1,0.1,0.1,0.2,  // 0-5
    0.5,1.0,1.5,1.8,2.0,2.2,  // 6-11
    2.5,2.0,1.8,1.5,1.8,2.2,  // 12-17
    2.8,3.0,2.5,2.0,1.5,0.8,  // 18-23
  ];
  const totalHourWeight = hourWeights.reduce((s,w) => s+w, 0);

  const start = new Date('2023-01-01');
  const isHourly = opts.grain === 'hourly';

  for (let d = 0; d < opts.days; d++) {
    const date = addDays(start, d);
    const dow = date.getDay();
    const weekendMult = (dow === 0 || dow === 6) ? 1.3 : 1.0;

    const hours = isHourly ? 24 : 1;
    for (let h = 0; h < hours; h++) {
      const hourMult = isHourly ? (hourWeights[h] / totalHourWeight * 24) : 1;

      // 지역 선택
      let regionR = Math.random();
      let region = regions[regions.length-1];
      for (let ri = 0; ri < regionWeights.length; ri++) {
        if (regionR < regionWeights[ri]) { region = regions[ri]; break; }
        regionR -= regionWeights[ri];
      }

      // 채널 선택
      let chanR = Math.random();
      let channel = channels[0];
      for (let ci = 0; ci < channelWeights.length; ci++) {
        if (chanR < channelWeights[ci]) { channel = channels[ci]; break; }
        chanR -= channelWeights[ci];
      }

      // 디바이스
      let devR = Math.random();
      let device = 'mobile';
      for (let di = 0; di < deviceWeights.length; di++) {
        if (devR < deviceWeights[di]) { device = devices[di]; break; }
        devR -= deviceWeights[di];
      }

      const baseConv = opts.dailyConvBase * hourMult * weekendMult / (isHourly ? 1 : 1);
      const impressions = Math.round(gauss(baseConv * 50, baseConv * 10));
      const clicks = Math.round(impressions * rnd(0.02, 0.06));
      const conversions = Math.round(Math.max(0, gauss(baseConv, baseConv * 0.3)));
      const cvr = clicks > 0 ? (conversions / clicks * 100) : 0;
      const revenueTypes = { purchase:50000, signup:5000, lead:15000, install:3000, view:1000 };
      const revBase = revenueTypes[opts.convType] || 50000;
      const revenue = conversions * rndInt(Math.round(revBase * 0.5), Math.round(revBase * 2));

      const row = {
        date: fmtDate(date),
        day_of_week: ['일','월','화','수','목','금','토'][dow],
        channel: channel,
        device: device,
        region: region,
        impressions: Math.max(0, impressions),
        clicks: Math.max(0, clicks),
        conversions: conversions,
        cvr_pct: cvr.toFixed(2),
        revenue: revenue,
      };
      if (isHourly) {
        row.hour = h;
        row.datetime = fmtDate(date) + ' ' + String(h).padStart(2,'0') + ':00:00';
      }
      rows.push(row);
    }
  }
  return rows;
}

/* ── 멀티터치 어트리뷰션 생성 ────────────────────────────── */
function generateAttributionData(opts) {
  const rows = [];
  const channelSets = {
    standard: ['paid_search','paid_social','display','email'],
    digital:  ['paid_search','paid_social','display','email','organic','direct','affiliate'],
    omni:     ['paid_search','paid_social','offline_store','tv','email','organic','direct'],
  };
  const channels = channelSets[opts.channelSet] || channelSets.standard;
  const start = new Date('2023-01-01');
  const windowMs = opts.windowDays * 24 * 3600 * 1000;

  // 채널 초기 터치 가중치 (인지도)
  const firstTouchWeights = {
    paid_search: 0.20, paid_social: 0.25, display: 0.30, email: 0.05,
    organic: 0.10, direct: 0.05, affiliate: 0.03, tv: 0.02, offline_store: 0.00,
  };
  // 채널 마지막 터치 가중치 (전환 유도)
  const lastTouchWeights = {
    paid_search: 0.35, paid_social: 0.15, display: 0.05, email: 0.20,
    organic: 0.05, direct: 0.15, affiliate: 0.03, tv: 0.01, offline_store: 0.01,
  };

  for (let c = 0; c < opts.numCustomers; c++) {
    const custId = 'USR-' + String(c+1).padStart(4,'0');
    const jrnId  = 'JRN-' + String(c+1).padStart(4,'0');
    const nTouches = clamp(Math.round(gauss(opts.avgTouchpoints, 1.5)), 2, 10);
    const conversionTime = new Date(start.getTime() + Math.random() * windowMs);
    const revenue = rndInt(10000, 500000);

    // 터치 시각 생성 (역순: 마지막 터치 → 전환)
    const touchTimes = [];
    for (let t = 0; t < nTouches; t++) {
      const offset = (nTouches - t) * rndInt(3600, 86400 * 5) * 1000;
      touchTimes.push(new Date(conversionTime.getTime() - offset));
    }
    touchTimes.sort((a,b) => a-b);

    for (let t = 0; t < nTouches; t++) {
      const isFirst = t === 0;
      const isLast = t === nTouches - 1;
      const touchType = isFirst ? 'first' : isLast ? 'last' : 'mid';

      // 채널 선택 (포지션별 가중치)
      let channel;
      if (isFirst) {
        channel = weightedPick(channels, c => firstTouchWeights[c] || 0.1);
      } else if (isLast) {
        channel = weightedPick(channels, c => lastTouchWeights[c] || 0.1);
      } else {
        channel = pick(channels);
      }

      // 어트리뷰션 크레딧 계산
      const firstCredit = isFirst ? 1 : 0;
      const lastCredit = isLast ? 1 : 0;
      const linearCredit = parseFloat((1 / nTouches).toFixed(3));
      // Position-based: first 40%, last 40%, mid 20% 균등
      const posCredit = isFirst ? 0.4 : isLast ? 0.4 : parseFloat((0.2 / Math.max(1, nTouches - 2)).toFixed(3));

      rows.push({
        customer_id: custId,
        journey_id: jrnId,
        touch_seq: t + 1,
        total_touches: nTouches,
        touch_channel: channel,
        touch_type: touchType,
        touch_at: fmtDatetime(touchTimes[t]),
        is_conversion: isLast ? 1 : 0,
        first_touch_credit: firstCredit,
        linear_credit: linearCredit,
        position_based_credit: posCredit,
        last_touch_credit: lastCredit,
        revenue: isLast ? revenue : 0,
      });
    }
  }
  return rows;
}

function weightedPick(arr, weightFn) {
  const weights = arr.map(weightFn);
  const total = weights.reduce((s,w) => s+w, 0);
  let r = Math.random() * total;
  for (let i = 0; i < arr.length; i++) {
    r -= weights[i];
    if (r <= 0) return arr[i];
  }
  return arr[arr.length-1];
}
