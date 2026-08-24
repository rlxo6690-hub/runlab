// ===================== UTILS =====================
function rand(min, max, dec = 2) {
  return +(Math.random() * (max - min) + min).toFixed(dec);
}
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function gauss(mean, std) {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
function fmtDate(d) {
  return d.toISOString().replace('T', ' ').substring(0, 19);
}
function round2(v) {
  return Math.round(v * 100) / 100;
}
// Abramowitz & Stegun 26.2.17 approximation (max error ~0.00045)
function probitInv(p) {
  if (p <= 0) return -4;
  if (p >= 1) return 4;
  if (p < 0.5) return -probitInv(1 - p);
  const t = Math.sqrt(-2 * Math.log(1 - p));
  const c = [2.515517, 0.802853, 0.010328];
  const d = [1.432788, 0.189269, 0.001308];
  return t - (c[0] + t * (c[1] + t * c[2])) / (1 + t * (d[0] + t * (d[1] + t * d[2])));
}

// ===================== SENSOR COL LABELS =====================
const SENSOR_COL_LABELS = {
  temperature_c: '온도 (°C)', pressure_bar: '압력 (bar)',
  vibration_mm_s: '진동 (mm/s)', current_a: '전류 (A)',
  voltage_v: '전압 (V)', speed_rpm: '회전수 (RPM)',
  torque_nm: '토크 (N·m)', cycle_time_s: '사이클 시간 (s)',
  oil_temp_c: '오일 온도 (°C)', air_flow_lmin: '공기 유량 (L/min)',
  chamber_temp_c: '챔버 온도 (°C)', chamber_pressure_pa: '챔버 압력 (Pa)',
  rf_power_w: 'RF 전력 (W)', gas_flow_sccm: '가스 유량 (sccm)',
  etch_rate_nm_min: '식각 속도 (nm/min)', wafer_temp_c: '웨이퍼 온도 (°C)',
  humidity_pct: '습도 (%)', particle_count: '파티클 수',
  cell_voltage_v: '셀 전압 (V)', cell_temp_c: '셀 온도 (°C)',
  charge_current_a: '충전 전류 (A)', discharge_current_a: '방전 전류 (A)',
  soc_pct: '충전 상태 SOC (%)', internal_resistance_mohm: '내부저항 (mΩ)',
  capacity_ah: '용량 (Ah)', cycle_count: '사이클 횟수',
  furnace_temp_c: '가열로 온도 (°C)', roll_speed_mpm: '압연 속도 (m/min)',
  roll_force_kn: '압연 하중 (kN)', strip_thickness_mm: '강판 두께 (mm)',
  cooling_water_temp_c: '냉각수 온도 (°C)', tension_kn: '장력 (kN)',
  surface_roughness_um: '표면 조도 (μm)',
  solder_temp_c: '솔더 온도 (°C)', conveyor_speed_cm_min: '컨베이어 속도 (cm/min)',
  flux_volume_ul: '플럭스 도포량 (μL)', preheat_temp_c: '예열 온도 (°C)',
  peak_temp_c: '피크 온도 (°C)', cooling_rate_c_s: '냉각 속도 (°C/s)',
  board_warp_mm: '기판 휨 (mm)',
  cell_efficiency_pct: '셀 변환효율 (%)', pmax_w: '최대출력 Pmax (W)',
  voc_v: '개방전압 Voc (V)', isc_a: '단락전류 Isc (A)',
  fill_factor_pct: '충전율 FF (%)', iv_current_a: 'IV 측정 전류 (A)',
  iv_voltage_v: 'IV 측정 전압 (V)', laminate_temp_c: '라미네이션 온도 (°C)',
  laminate_pressure_bar: '라미네이션 압력 (bar)', cure_time_s: '경화 시간 (s)',
  el_defect_pct: 'EL 결함률 (%)', series_resistance_mohm: '직렬저항 Rs (mΩ)',
  igbt_temp_c: 'IGBT 온도 (°C)', inductor_temp_c: '인덕터 온도 (°C)',
  dc_input_voltage_v: 'DC 입력전압 (V)', ac_output_voltage_v: 'AC 출력전압 (V)',
  output_current_a: '출력 전류 (A)', output_power_w: '출력 전력 (W)',
  conversion_efficiency_pct: '변환효율 (%)', thd_pct: '전고조파왜율 THD (%)',
  power_factor: '역률 PF', insulation_resistance_mohm: '절연저항 (MΩ)',
  switching_freq_khz: '스위칭주파수 (kHz)', capacitor_esr_mohm: '커패시터 ESR (mΩ)',
  pasteur_temp_c: '살균 온도 (°C)', pasteur_time_s: '살균 시간 (s)',
  fill_volume_ml: '충전 용량 (mL)', fill_temp_c: '충전 온도 (°C)',
  co2_pressure_bar: 'CO₂ 압력 (bar)', brix_degree: '당도 Brix (°Bx)',
  ph_level: 'pH', turbidity_ntu: '탁도 (NTU)',
  conveyor_speed_bpm: '컨베이어 속도 (bpm)', cip_conductivity_ms: 'CIP 전도도 (mS)',
  dough_temp_c: '반죽 온도 (°C)', dough_moisture_pct: '반죽 수분 (%)',
  oven_temp_c: '오븐 온도 (°C)', oven_humidity_pct: '오븐 습도 (%)',
  bake_time_s: '굽기 시간 (s)', conveyor_speed_mpm: '컨베이어 속도 (m/min)',
  weight_g: '제품 중량 (g)', color_l_value: '색도 L값',
  cooling_temp_c: '냉각 온도 (°C)', co2_ppm: 'CO₂ 농도 (ppm)',
  raw_milk_temp_c: '원유 온도 (°C)', homogen_pressure_bar: '균질 압력 (bar)',
  culture_temp_c: '배양 온도 (°C)', ferment_ph: '발효 pH',
  ferment_time_min: '발효 시간 (min)', fat_pct: '지방 함량 (%)',
  protein_pct: '단백질 함량 (%)', fill_weight_g: '충전 중량 (g)',
  cold_storage_temp_c: '냉장 온도 (°C)',
  inlet_temp_c: '투입 온도 (°C)', cutting_speed_rpm: '절단 속도 (RPM)',
  blade_pressure_bar: '칼날 압력 (bar)', marinate_conc_pct: '절임 농도 (%)',
  smoke_temp_c: '훈연 온도 (°C)', smoke_time_min: '훈연 시간 (min)',
  core_temp_c: '심부 온도 (°C)', freezer_temp_c: '냉동 온도 (°C)',
  freeze_time_min: '냉동 시간 (min)', moisture_pct: '수분 함량 (%)',
  retort_temp_c: '레토르트 온도 (°C)', retort_pressure_bar: '레토르트 압력 (bar)',
  sterilize_time_min: '살균 시간 (min)', headspace_mm: '헤드스페이스 (mm)',
  seam_tightness_pct: '밀봉 강도 (%)', vacuum_kpa: '진공도 (kPa)',
  fo_value: 'F₀ 값',
  // ── 발전 (석탄화력 · LNG복합) ──
  active_power_mw: '발전 출력 (MW)', capacity_factor_pct: '이용률 (%)',
  main_steam_temp_c: '주증기 온도 (°C)', main_steam_pressure_bar: '주증기 압력 (bar)',
  reheat_steam_temp_c: '재열증기 온도 (°C)', feedwater_flow_th: '급수 유량 (t/h)',
  coal_flow_th: '석탄 투입량 (t/h)', furnace_pressure_mmh2o: '노내 압력 (mmH₂O)',
  flue_gas_o2_pct: '배기 산소농도 (%)', nox_ppm: '질소산화물 NOx (ppm)',
  sox_ppm: '황산화물 SOx (ppm)', dust_mgm3: '먼지 (mg/m³)',
  turbine_vibration_um: '터빈 진동 (μm)', bearing_temp_c: '베어링 온도 (°C)',
  condenser_vacuum_kpa: '복수기 진공도 (kPa)', heat_rate_kcal_kwh: '열소비율 (kcal/kWh)',
  gt_output_mw: '가스터빈 출력 (MW)', st_output_mw: '스팀터빈 출력 (MW)',
  turbine_inlet_temp_c: '터빈 입구온도 TIT (°C)', exhaust_gas_temp_c: '배기가스 온도 (°C)',
  fuel_gas_flow_knm3h: '연료가스 유량 (kNm³/h)', compressor_discharge_temp_c: '압축기 토출온도 (°C)',
  hrsg_steam_pressure_bar: 'HRSG 증기압력 (bar)', co_ppm: '일산화탄소 CO (ppm)',
  lube_oil_temp_c: '윤활유 온도 (°C)', thermal_efficiency_pct: '열효율 (%)',
  bearing_vibration_mm_s: '베어링 진동 (mm/s)',
};

// ===================== SENSOR COLS BY TYPE =====================
const SENSOR_COLS_BY_TYPE = {
  automotive:      ['temperature_c','pressure_bar','vibration_mm_s','current_a','voltage_v','speed_rpm','torque_nm','cycle_time_s','oil_temp_c','air_flow_lmin'],
  semiconductor:   ['chamber_temp_c','chamber_pressure_pa','rf_power_w','gas_flow_sccm','etch_rate_nm_min','wafer_temp_c','humidity_pct','particle_count'],
  battery:         ['cell_voltage_v','cell_temp_c','charge_current_a','discharge_current_a','soc_pct','internal_resistance_mohm','capacity_ah','cycle_count'],
  steel:           ['furnace_temp_c','roll_speed_mpm','roll_force_kn','strip_thickness_mm','cooling_water_temp_c','tension_kn','surface_roughness_um'],
  pcb:             ['solder_temp_c','conveyor_speed_cm_min','flux_volume_ul','preheat_temp_c','peak_temp_c','cooling_rate_c_s','board_warp_mm'],
  solar_module:    ['cell_efficiency_pct','pmax_w','voc_v','isc_a','fill_factor_pct','iv_current_a','iv_voltage_v','laminate_temp_c','laminate_pressure_bar','cure_time_s','el_defect_pct','series_resistance_mohm'],
  solar_inverter:  ['igbt_temp_c','inductor_temp_c','dc_input_voltage_v','ac_output_voltage_v','output_current_a','output_power_w','conversion_efficiency_pct','thd_pct','power_factor','insulation_resistance_mohm','switching_freq_khz','capacitor_esr_mohm'],
  food_beverage:   ['pasteur_temp_c','pasteur_time_s','fill_volume_ml','fill_temp_c','co2_pressure_bar','brix_degree','ph_level','turbidity_ntu','conveyor_speed_bpm','cip_conductivity_ms'],
  food_baking:     ['dough_temp_c','dough_moisture_pct','oven_temp_c','oven_humidity_pct','bake_time_s','conveyor_speed_mpm','weight_g','color_l_value','cooling_temp_c','co2_ppm'],
  food_dairy:      ['raw_milk_temp_c','pasteur_temp_c','homogen_pressure_bar','culture_temp_c','ferment_ph','ferment_time_min','fat_pct','protein_pct','fill_weight_g','cold_storage_temp_c'],
  food_meat:       ['inlet_temp_c','cutting_speed_rpm','blade_pressure_bar','marinate_conc_pct','smoke_temp_c','smoke_time_min','core_temp_c','freezer_temp_c','freeze_time_min','moisture_pct'],
  food_retort:     ['retort_temp_c','retort_pressure_bar','sterilize_time_min','fill_weight_g','headspace_mm','seam_tightness_pct','vacuum_kpa','cooling_water_temp_c','fo_value','ph_level'],
  coal_thermal:    ['active_power_mw','main_steam_temp_c','main_steam_pressure_bar','coal_flow_th','turbine_vibration_um','bearing_temp_c','reheat_steam_temp_c','feedwater_flow_th','furnace_pressure_mmh2o','flue_gas_o2_pct','nox_ppm','sox_ppm','dust_mgm3','condenser_vacuum_kpa','heat_rate_kcal_kwh','capacity_factor_pct'],
  lng_combined:    ['active_power_mw','gt_output_mw','st_output_mw','turbine_inlet_temp_c','exhaust_gas_temp_c','bearing_vibration_mm_s','fuel_gas_flow_knm3h','compressor_discharge_temp_c','hrsg_steam_pressure_bar','nox_ppm','co_ppm','lube_oil_temp_c','thermal_efficiency_pct','capacity_factor_pct'],
};

// 발전 유형 — 제조와 식별 컬럼·결과 변수의 명칭이 다르다 (공장/라인 → 발전소/호기, 불량 → 불시정지)
const POWER_PROCESS_TYPES = new Set(['coal_thermal', 'lng_combined']);

// ===================== SENSOR RANGES =====================
const SENSOR_RANGES = {
  temperature_c:[180,250], pressure_bar:[2,8], vibration_mm_s:[0.1,3],
  current_a:[10,80], voltage_v:[380,420], speed_rpm:[1000,3000],
  torque_nm:[50,200], cycle_time_s:[8,15], oil_temp_c:[40,80],
  air_flow_lmin:[100,300], chamber_temp_c:[200,400], chamber_pressure_pa:[1,100],
  rf_power_w:[100,2000], gas_flow_sccm:[10,200], etch_rate_nm_min:[50,200],
  wafer_temp_c:[150,350], humidity_pct:[20,60], particle_count:[0,50],
  cell_voltage_v:[3.0,4.2], cell_temp_c:[20,45], charge_current_a:[1,5],
  discharge_current_a:[1,8], soc_pct:[10,100], internal_resistance_mohm:[20,100],
  capacity_ah:[50,55], cycle_count:[0,500], furnace_temp_c:[800,1200],
  roll_speed_mpm:[5,20], roll_force_kn:[500,2000], strip_thickness_mm:[0.5,3],
  cooling_water_temp_c:[15,35], tension_kn:[50,200], surface_roughness_um:[0.5,3],
  solder_temp_c:[250,280], conveyor_speed_cm_min:[50,150], flux_volume_ul:[0.5,2],
  preheat_temp_c:[100,150], peak_temp_c:[255,275], cooling_rate_c_s:[2,6],
  board_warp_mm:[0,0.5],
  pasteur_temp_c:[72,95], pasteur_time_s:[15,30], fill_volume_ml:[195,205],
  fill_temp_c:[2,8], co2_pressure_bar:[2.5,4.0], brix_degree:[10,14],
  ph_level:[3.5,7.0], turbidity_ntu:[0.1,5.0], conveyor_speed_bpm:[200,600],
  cip_conductivity_ms:[1.5,3.0], dough_temp_c:[22,28], dough_moisture_pct:[40,55],
  oven_temp_c:[160,230], oven_humidity_pct:[30,80], bake_time_s:[600,1800],
  conveyor_speed_mpm:[0.5,3.0], weight_g:[90,110], color_l_value:[55,75],
  cooling_temp_c:[20,35], co2_ppm:[400,2000], raw_milk_temp_c:[2,6],
  homogen_pressure_bar:[150,250], culture_temp_c:[38,43], ferment_ph:[4.2,6.8],
  ferment_time_min:[240,480], fat_pct:[0.1,3.5], protein_pct:[2.8,3.5],
  fill_weight_g:[98,102], cold_storage_temp_c:[1,5], inlet_temp_c:[2,8],
  cutting_speed_rpm:[300,1200], blade_pressure_bar:[3,8], marinate_conc_pct:[2,6],
  smoke_temp_c:[60,80], smoke_time_min:[30,120], core_temp_c:[68,75],
  freezer_temp_c:[-35,-18], freeze_time_min:[20,60], moisture_pct:[60,75],
  retort_temp_c:[115,135], retort_pressure_bar:[1.5,3.0], sterilize_time_min:[15,60],
  headspace_mm:[3,8], seam_tightness_pct:[92,100], vacuum_kpa:[20,60],
  fo_value:[3.0,15.0],
  cell_efficiency_pct:[19.5,23.5], pmax_w:[380,425], voc_v:[46.0,50.5],
  isc_a:[9.5,11.0], fill_factor_pct:[78.0,84.5], iv_current_a:[9.0,10.5],
  iv_voltage_v:[38.0,42.5], laminate_temp_c:[140,160], laminate_pressure_bar:[0.8,1.2],
  cure_time_s:[900,1200], el_defect_pct:[0.0,2.0], series_resistance_mohm:[3.0,8.0],
  igbt_temp_c:[55,95], inductor_temp_c:[45,80], dc_input_voltage_v:[350,820],
  ac_output_voltage_v:[218,242], output_current_a:[10,65], output_power_w:[3000,15000],
  conversion_efficiency_pct:[97.5,99.0], thd_pct:[0.5,3.5], power_factor:[0.980,1.000],
  insulation_resistance_mohm:[100,1000], switching_freq_khz:[16.0,20.0], capacitor_esr_mohm:[5.0,30.0],
  // ── 발전 ── (nox_ppm은 석탄·LNG 공용이라 두 범위를 포괄)
  active_power_mw:[150,500], capacity_factor_pct:[30,95],
  main_steam_temp_c:[530,570], main_steam_pressure_bar:[220,250],
  reheat_steam_temp_c:[540,570], feedwater_flow_th:[1200,1800],
  coal_flow_th:[150,250], furnace_pressure_mmh2o:[-10,5],
  flue_gas_o2_pct:[3,6], nox_ppm:[5,50], sox_ppm:[10,40], dust_mgm3:[1,10],
  turbine_vibration_um:[20,80], bearing_temp_c:[60,90],
  condenser_vacuum_kpa:[4,8], heat_rate_kcal_kwh:[2100,2400],
  gt_output_mw:[150,280], st_output_mw:[80,140],
  turbine_inlet_temp_c:[1250,1400], exhaust_gas_temp_c:[550,650],
  fuel_gas_flow_knm3h:[30,60], compressor_discharge_temp_c:[380,450],
  hrsg_steam_pressure_bar:[90,130], co_ppm:[1,15],
  lube_oil_temp_c:[45,75], thermal_efficiency_pct:[55,62],
  bearing_vibration_mm_s:[0.5,4],
};

// ===================== CAUSAL DEFECT DEFAULTS =====================
// 각 공정별 defect_score 생성에 사용되는 기본 가중치 (절댓값 클수록 영향 강함, 음수면 높을수록 불량↓)
const CAUSAL_WEIGHT_DEFAULTS = {
  automotive:     { temperature_c: 1.5, voltage_v: 1.0, vibration_mm_s: 0.5, current_a: 0.5 },
  semiconductor:  { chamber_temp_c: 1.0, particle_count: 1.5, humidity_pct: 0.5, chamber_pressure_pa: 1.0 },
  battery:        { cell_temp_c: 1.5, internal_resistance_mohm: 1.5, cell_voltage_v: -1.0, soc_pct: -0.5 },
  steel:          { furnace_temp_c: 1.0, surface_roughness_um: 1.5, strip_thickness_mm: 1.0 },
  pcb:            { solder_temp_c: 1.5, board_warp_mm: 1.5, peak_temp_c: 1.0, flux_volume_ul: -0.5 },
  solar_module:   { el_defect_pct: 1.5, series_resistance_mohm: 1.0, fill_factor_pct: -1.5, laminate_temp_c: 0.5 },
  solar_inverter: { thd_pct: 1.5, igbt_temp_c: 1.0, insulation_resistance_mohm: -1.5, conversion_efficiency_pct: -1.0 },
  food_beverage:  { turbidity_ntu: 1.5, ph_level: 1.0, pasteur_temp_c: -1.0, brix_degree: 0.5 },
  food_baking:    { oven_temp_c: 1.0, dough_moisture_pct: 1.0, color_l_value: 0.5, weight_g: -0.5 },
  food_dairy:     { ferment_ph: 1.5, culture_temp_c: 1.0, fat_pct: 0.5 },
  food_meat:      { core_temp_c: -1.5, freezer_temp_c: 1.0, moisture_pct: 0.5 },
  food_retort:    { fo_value: -1.5, seam_tightness_pct: 1.0, vacuum_kpa: 0.5 },
  // 발전: 진동·베어링온도가 오르고 효율이 떨어질수록 불시정지 위험↑
  coal_thermal:   { turbine_vibration_um: 1.5, bearing_temp_c: 1.5, heat_rate_kcal_kwh: 1.0, main_steam_temp_c: 1.0, active_power_mw: -0.5 },
  lng_combined:   { bearing_vibration_mm_s: 1.5, turbine_inlet_temp_c: 1.5, exhaust_gas_temp_c: 1.0, lube_oil_temp_c: 1.0, thermal_efficiency_pct: -1.5 },
};

// ===================== DIFFICULTY NOISE HELPER =====================
function computeSensorValue(mean, std, prev, i, rows, difficulty, anSpike, anDrift, anStuck) {
  switch (difficulty) {
    case 'easy':
      if (anSpike) return round2(rand(mean + std * 3.5, mean + std * 6));
      if (anDrift) return round2(mean + std * (i / rows) * 4 + gauss(0, std * 0.2));
      if (anStuck) return round2(mean);
      return round2(gauss(mean, std));
    case 'medium': {
      const ar = 0.65;
      const base = ar * prev + (1 - ar) * mean;
      const arStd = std * Math.sqrt(1 - ar * ar);
      if (anSpike) return round2(gauss(mean + std * 2.2, arStd * 0.9));
      if (anDrift) return round2(base + std * (i / rows) * 2.5);
      if (anStuck) return round2(base * 0.92 + mean * 0.08);
      return round2(gauss(base, arStd));
    }
    case 'hard': {
      const ar = 0.72;
      const base = ar * prev + (1 - ar) * mean;
      const seg = Math.floor(i / Math.max(1, rows / 8));
      const varF = 0.8 + 0.6 * Math.abs(Math.sin(seg * 0.9));
      const arStd = std * Math.sqrt(1 - ar * ar) * varF;
      if (anSpike) return round2(gauss(mean + std * 1.4, arStd));
      if (anDrift) return round2(base + std * varF * (i / rows) * 1.5);
      if (anStuck) return round2(base * 0.75 + mean * 0.25 + gauss(0, arStd * 0.4));
      return round2(gauss(base, arStd));
    }
    case 'expert': {
      const ar = 0.78;
      const degrade = (i / rows) * std * 0.7;
      const regimeSeg = Math.floor(i / Math.max(1, rows / 6));
      const regimeShift = (regimeSeg % 2 === 0 ? 0.15 : -0.15) * std;
      const base = ar * prev + (1 - ar) * (mean + degrade + regimeShift);
      const varF = 0.6 + 0.5 * (i / rows);
      const arStd = std * Math.sqrt(1 - ar * ar) * varF;
      if (anSpike) return round2(gauss(mean + degrade + std * 1.0, arStd * 1.1));
      if (anDrift) return round2(base + std * 0.4 * (i / rows));
      if (anStuck) return round2(base + gauss(0, arStd * 0.5));
      return round2(gauss(base, arStd));
    }
  }
}

// ===================== GENERATE SENSOR =====================
async function generateSensorData(processType, factories, lines, period, customRows, selectedCols, anomalies, onProgress, onLog, customIntervalSec = 300, difficulty = 'easy', corrGroups = [], defectCfg = null) {
  onLog('센서 데이터 생성 시작...', 't-info');
  const periodMap = { '1d': 1440, '7d': 2016, '30d': 4320, '90d': 2160, custom: customRows };
  let rows = periodMap[period] || customRows;
  const intervalSec = period === 'custom' ? customIntervalSec
    : ({ '1d': 60, '7d': 300, '30d': 600, '90d': 3600 }[period] || 300);
  const spanSec = rows * intervalSec;
  const spanDays = (spanSec / 86400).toFixed(1);
  const diffLabels = { easy: 'Easy (단순 이상치)', medium: 'Medium (AR 노이즈)', hard: 'Hard (비정상 분산)', expert: 'Expert (열화 + 레이블 노이즈)' };
  onLog(`공정: ${processType} | 라인: ${factories}×${lines} | 행: ${rows.toLocaleString()}`);
  onLog(`난이도: ${diffLabels[difficulty]}`, 't-info');
  onProgress(10);
  const anomalyRateMult = difficulty === 'hard' ? 0.4 : difficulty === 'expert' ? 0.2 : 1;
  const hasCausal = defectCfg && defectCfg.causal && Object.values(defectCfg.weights || {}).some(w => w !== 0);
  const hasDefect = !!defectCfg;
  const isPower = POWER_PROCESS_TYPES.has(processType);
  const COL = isPower
    ? { site:'plant_id',   unit:'unit_id', status:'operation_status', target:'trip_yn',   score:'trip_risk_score' }
    : { site:'factory_id', unit:'line_id', status:'process_status',   target:'defect_yn', score:'defect_score' };
  const LBL = isPower ? { bad:'TRIP', good:'NORMAL' } : { bad:'NG', good:'OK' };
  const headers = ['timestamp', COL.site, COL.unit, 'equipment_id', ...selectedCols, COL.status, 'shift', ...(hasDefect ? [COL.target] : []), ...(hasCausal ? [COL.score] : [])];
  const records = [];
  const prevVals = new Map();
  selectedCols.forEach(col => {
    const [mn, mx] = SENSOR_RANGES[col] || [0, 100];
    prevVals.set(col, (mn + mx) / 2);
  });
  // Pre-generate AR(1) latent signals for each correlation group
  const CORR_STRENGTH = { high: 0.85, medium: 0.55, low: 0.30 };
  const latentSeries = corrGroups.map(() => {
    const s = new Float64Array(rows);
    const phi = 0.97, sigma = Math.sqrt(1 - phi * phi);
    let v = 0;
    for (let i = 0; i < rows; i++) { v = phi * v + gauss(0, sigma); s[i] = v; }
    return s;
  });
  if (corrGroups.length) onLog(`상관 그룹 ${corrGroups.length}개 적용됨`, 't-info');
  const tgtWord = isPower ? '불시정지' : '불량';
  if (hasDefect && !hasCausal) onLog(`${tgtWord} 컬럼: ${COL.target} 추가됨 (목표 ${tgtWord}률 ${defectCfg.rate}%)`, 't-info');
  if (hasCausal) onLog(`${tgtWord} 컬럼: ${COL.score} + ${COL.target} 추가됨 (목표 ${tgtWord}률 ${defectCfg.rate}%)`, 't-info');

  const now = new Date();
  now.setSeconds(now.getSeconds() - spanSec);
  const CHUNK = Math.max(1, Math.floor(rows / 5));
  for (let i = 0; i < rows; i++) {
    if (i % CHUNK === 0) {
      onProgress(10 + (i / rows) * 80);
      await new Promise(r => setTimeout(r, 1));
    }
    const ts = new Date(now.getTime() + i * intervalSec * 1000);
    const sn = randInt(1, factories), un = randInt(1, lines), en = randInt(1, 3);
    const fid = isPower ? `PLT-${String(sn).padStart(2, '0')}` : `F${String(sn).padStart(2, '0')}`;
    const lid = isPower ? `U-${un}` : `L${String(un).padStart(2, '0')}`;
    const eid = isPower
      ? `EQP-${String(sn).padStart(2, '0')}${un}-${String(en).padStart(2, '0')}`
      : `EQ-${fid}-${lid}-${String(en).padStart(2, '0')}`;
    const hour = ts.getHours();
    const shift = hour >= 6 && hour < 14 ? '주간1' : hour >= 14 && hour < 22 ? '주간2' : '야간';
    const row = { timestamp: fmtDate(ts), [COL.site]: fid, [COL.unit]: lid, equipment_id: eid };
    const effRate = r => (r / 100) * anomalyRateMult;
    const anSpike   = anomalies.spike.enabled   && Math.random() < effRate(anomalies.spike.rate);
    const anDrift   = anomalies.drift.enabled   && Math.random() < effRate(anomalies.drift.rate);
    const anMissing = anomalies.missing.enabled && Math.random() < anomalies.missing.rate / 100;
    const anStuck   = anomalies.stuck.enabled   && Math.random() < effRate(anomalies.stuck.rate);
    selectedCols.forEach(col => {
      const [mn, mx] = SENSOR_RANGES[col] || [0, 100];
      const mean = (mn + mx) / 2, std = (mx - mn) / 10;
      const prev = prevVals.get(col) ?? mean;
      if (anMissing && Math.random() < 0.3) {
        row[col] = '';
        prevVals.set(col, mean);
      } else {
        const val = computeSensorValue(mean, std, prev, i, rows, difficulty, anSpike, anDrift, anStuck);
        row[col] = val;
        prevVals.set(col, val);
      }
    });
    // Apply correlation blending
    if (corrGroups.length) {
      corrGroups.forEach((g, gi) => {
        const s = CORR_STRENGTH[g.strength] || 0.55;
        const L = latentSeries[gi][i];
        g.cols.forEach((col, ci) => {
          if (!selectedCols.includes(col) || row[col] === '') return;
          const [mn, mx] = SENSOR_RANGES[col] || [0, 100];
          const mean = (mn + mx) / 2, std = (mx - mn) / 10;
          const dir = (g.direction === 'negative' && ci > 0) ? -1 : 1;
          const blended = (1 - s) * (row[col] - mean) + dir * s * L * std;
          const newVal = round2(Math.max(mn, Math.min(mx, mean + blended)));
          row[col] = newVal;
          prevVals.set(col, newVal);
        });
      });
    }

    // 상태를 먼저 확정한다 — 아래 linkToStatus 분기가 status를 참조하므로 선언보다 앞서면 안 된다
    let status = 'RUNNING';
    if (Math.random() < 0.01) status = 'ALARM';
    else if (Math.random() < 0.003) status = 'STOP';
    else if (Math.random() < 0.005) status = 'WARNING';
    if (difficulty === 'expert' && Math.random() < 0.05) {
      status = status === 'RUNNING' ? (Math.random() < 0.5 ? 'WARNING' : 'ALARM') : 'RUNNING';
    }
    row[COL.status] = status;
    row.shift = shift;

    if (hasDefect) {
      if (hasCausal) {
        const activeW = Object.entries(defectCfg.weights).filter(([, w]) => w !== 0);
        const noiseStdVal = defectCfg.noiseStd || 1.0;
        const signalVar = activeW.reduce((s, [, w]) => s + w * w, 0);
        const scale = 4 * Math.sqrt(signalVar + noiseStdVal * noiseStdVal) || 1;
        let signal = 0;
        activeW.forEach(([col, w]) => {
          if (typeof row[col] === 'number') {
            const [mn, mx] = SENSOR_RANGES[col] || [0, 100];
            const mean = (mn + mx) / 2, std = (mx - mn) / 10;
            signal += w * (row[col] - mean) / (std || 1);
          }
        });
        signal += gauss(0, noiseStdVal);
        const score = round2(Math.max(0, Math.min(1, 0.5 + signal / scale)));
        row[COL.score] = score;
        // threshold: top rate% of N(0.5, 0.25²) distribution
        const threshold = Math.min(1, 0.5 + 0.25 * probitInv(1 - defectCfg.rate / 100));
        const isDefect = score > threshold;
        row[COL.target] = defectCfg.format === 'str' ? (isDefect ? LBL.bad : LBL.good) : (isDefect ? 1 : 0);
      } else {
        let prob = defectCfg.rate / 100;
        if (defectCfg.linkToStatus) {
          if (status === 'ALARM')   prob = Math.min(1, prob * 8);
          else if (status === 'WARNING') prob = Math.min(1, prob * 3);
        }
        const isDefect = Math.random() < prob;
        row[COL.target] = defectCfg.format === 'str' ? (isDefect ? LBL.bad : LBL.good) : (isDefect ? 1 : 0);
      }
    }

    records.push(row);
  }
  onProgress(100);
  onLog(`✅ ${records.length.toLocaleString()}행 생성 완료`, 't-dim');
  return { records, headers };
}

// ===================== GENERATE QUALITY =====================
async function generateQualityData(product, count, defectRate, defectTypes, measurements, onProgress, onLog, difficulty = 'easy') {
  onLog('품질 검사 데이터 생성 시작...', 't-info');
  const stdMult    = { easy: 4.0, medium: 2.5, hard: 1.5, expert: 1.1 }[difficulty];
  const clusterSize = { easy: 1, medium: 4, hard: 8, expert: 14 }[difficulty];
  const labelNoiseRate = { easy: 0, medium: 0.01, hard: 0.03, expert: 0.06 }[difficulty];
  onLog(`난이도: ${difficulty.toUpperCase()} | OK/NG 분리도: ${stdMult}σ`, 't-info');
  const headers = ['inspection_id','timestamp','product_id','lot_id','line_id','m1_value','m2_value','m3_value','m4_value','inspection_result','defect_type','defect_severity','inspector_id','rework_flag'];
  const [m1, m2, m3, m4] = measurements;
  const records = [];
  const now = new Date(); now.setDate(now.getDate() - 30);
  let defectCount = 0, clusterRemaining = 0;
  for (let i = 0; i < count; i++) {
    if (i % 200 === 0) { onProgress((i / count) * 90); await new Promise(r => setTimeout(r, 1)); }
    const ts = new Date(now.getTime() + i * (30 * 24 * 3600000 / count));
    let isDefect;
    if (difficulty === 'easy') {
      isDefect = Math.random() < defectRate;
    } else {
      if (clusterRemaining > 0) { isDefect = Math.random() < defectRate * 3; clusterRemaining--; }
      else { isDefect = Math.random() < defectRate * 0.4; if (isDefect) clusterRemaining = clusterSize; }
    }
    const v1 = round2(gauss(m1.mean, isDefect ? m1.std * stdMult : m1.std));
    const v2 = round2(gauss(m2.mean, isDefect ? m2.std * (stdMult * 0.75) : m2.std));
    const v3 = round2(gauss(m3.mean, isDefect ? m3.std * (stdMult * 1.25) : m3.std));
    const v4 = round2(gauss(m4.mean, isDefect ? m4.std * (stdMult * 0.75) : m4.std));
    const dType = isDefect ? (defectTypes.length ? choice(defectTypes) : 'surface') : '';
    const severity = isDefect ? choice(['MINOR', 'MAJOR', 'CRITICAL']) : '';
    if (isDefect) defectCount++;
    let result = isDefect ? 'NG' : 'OK';
    if (labelNoiseRate > 0 && Math.random() < labelNoiseRate) result = result === 'NG' ? 'OK' : 'NG';
    records.push({
      inspection_id: `INS-${String(i + 1).padStart(6, '0')}`,
      timestamp: fmtDate(ts),
      product_id: `${product.toUpperCase()}-${String(randInt(1, 9999)).padStart(5, '0')}`,
      lot_id: `LOT-${String(Math.floor(i / 50) + 1).padStart(4, '0')}`,
      line_id: `L${String(randInt(1, 5)).padStart(2, '0')}`,
      m1_value: v1, m2_value: v2, m3_value: v3, m4_value: v4,
      inspection_result: result, defect_type: dType, defect_severity: severity,
      inspector_id: `INS${String(randInt(1, 10)).padStart(3, '0')}`,
      rework_flag: isDefect && Math.random() < 0.4 ? 1 : 0,
    });
  }
  onProgress(100);
  onLog(`✅ ${count.toLocaleString()}건 | 불량 ${defectCount}건 (${(defectCount / count * 100).toFixed(2)}%)`, 't-dim');
  return { records, headers, defectCount };
}

// ===================== GENERATE EQUIPMENT =====================
async function generateEquipmentData(eqCount, days, eqType, mtbf, onProgress, onLog, difficulty = 'easy') {
  onLog('설비 유지보수 데이터 생성 시작...', 't-info');
  const headers = ['timestamp','equipment_id','equipment_type','runtime_hours','vibration_rms','temperature_c','oil_level_pct','current_a','noise_db','rul_hours','maintenance_label','failure_within_24h'];
  const records = [];
  const now = new Date(); now.setDate(now.getDate() - days);
  const signalStr  = { easy: 2.5, medium: 1.8, hard: 1.2, expert: 0.8 }[difficulty];
  const noiseScale = { easy: 0.5, medium: 1.0, hard: 1.8, expert: 2.5 }[difficulty];
  const suddenRate = { easy: 0, medium: 0.1, hard: 0.35, expert: 0.55 }[difficulty];
  const labelNoise = { easy: 0, medium: 0, hard: 0.03, expert: 0.08 }[difficulty];
  onLog(`난이도: ${difficulty.toUpperCase()} | 신호강도: ${signalStr}x`, 't-info');
  for (let eq = 1; eq <= eqCount; eq++) {
    onProgress((eq / eqCount) * 90);
    await new Promise(r => setTimeout(r, 1));
    let runtime = randInt(0, 2000), health = 1.0;
    const eqId = `${eqType.toUpperCase()}-${String(eq).padStart(3, '0')}`;
    for (let h = 0; h < days * 8; h += 4) {
      const ts = new Date(now.getTime() + (eq * days * 8 + h) * 3600000 / eqCount);
      runtime += 4;
      const decay = Math.random() * 0.002 * noiseScale;
      health = Math.max(0.1, health - decay);
      const isSudden = Math.random() < suddenRate * 0.003;
      const failProb = Math.min(0.95, runtime / (mtbf * 2));
      const isFail = isSudden || (Math.random() < failProb * 0.005);
      if (isFail) { health = 1.0; runtime = 0; }
      const unhealthy = 1 - health;
      const vib  = round2(gauss(1.5 + signalStr * unhealthy, 0.2 * noiseScale * (1 + unhealthy)));
      const temp = round2(gauss(60 + 30 * signalStr * 0.5 * unhealthy, 3 * noiseScale));
      const oil  = round2(Math.max(10, 95 - runtime * 0.01 + gauss(0, 2 * noiseScale)));
      const curr = round2(gauss(30 + 20 * signalStr * 0.5 * unhealthy, 2 * noiseScale));
      const noise = round2(gauss(55 + 20 * signalStr * 0.5 * unhealthy, 3 * noiseScale));
      const rul = Math.max(0, Math.round(mtbf * health - runtime % mtbf));
      const label = isFail ? 'FAILURE' : Math.random() < 0.02 ? 'PM' : Math.random() < 0.03 ? 'ALARM' : 'NORMAL';
      let failFlag = rul < 24 ? 1 : 0;
      if (labelNoise > 0 && Math.random() < labelNoise) failFlag = failFlag === 1 ? 0 : 1;
      records.push({ timestamp: fmtDate(ts), equipment_id: eqId, equipment_type: eqType, runtime_hours: runtime, vibration_rms: vib, temperature_c: temp, oil_level_pct: oil, current_a: curr, noise_db: noise, rul_hours: rul, maintenance_label: label, failure_within_24h: failFlag });
    }
  }
  onProgress(100);
  onLog(`✅ ${records.length.toLocaleString()}행 생성 완료`, 't-dim');
  return { records, headers };
}

// ===================== GENERATE KPI =====================
async function generateKPIData(factories, lines, months, grain, seasonal, trend, onProgress, onLog, difficulty = 'easy') {
  onLog('생산 KPI 데이터 생성 시작...', 't-info');
  const headers = ['date','factory_id','line_id','shift','planned_qty','actual_qty','defect_qty','oee_pct','availability_pct','performance_pct','quality_pct','uph','downtime_min','energy_kwh','event'];
  const oeeNoiseScale = { easy: 1, medium: 2, hard: 3.5, expert: 5 }[difficulty];
  const regimePoint = difficulty === 'expert' ? Math.floor(months * 30 * 0.45) : -1;
  onLog(`난이도: ${difficulty.toUpperCase()} | OEE 노이즈: ${oeeNoiseScale}x`, 't-info');
  const records = [];
  const now = new Date(); now.setMonth(now.getMonth() - months);
  const daysTotal = months * 30;
  let prevOeeResidual = 0;
  for (let d = 0; d < daysTotal; d++) {
    onProgress((d / daysTotal) * 90);
    if (d % 30 === 0) await new Promise(r => setTimeout(r, 1));
    const ts = new Date(now.getTime() + d * 86400000);
    const month = ts.getMonth();
    const isHoliday = (month === 0 || month === 8) && ts.getDate() === 1;
    const seasonFactor = seasonal === 'none' ? 1 : seasonal === 'mild' ? 1 + 0.05 * Math.sin(2 * Math.PI * month / 12) : 1 + 0.15 * Math.sin(2 * Math.PI * month / 12);
    const trendFactor = trend === 'improve' ? 1 + 0.05 * (d / daysTotal) : trend === 'decline' ? 1 - 0.05 * (d / daysTotal) : 1;
    const regimeOffset = (difficulty === 'expert' && d > regimePoint) ? -4.5 : 0;
    if (difficulty !== 'easy') { const ar = 0.6; prevOeeResidual = ar * prevOeeResidual + gauss(0, oeeNoiseScale * 0.4); }
    const shifts = grain === 'shift' ? ['주간', '야간'] : ['ALL'];
    for (let f = 1; f <= factories; f++) {
      for (let l = 1; l <= lines; l++) {
        for (const shift of shifts) {
          const base = 480 * (shift === 'ALL' ? 2 : 1);
          const avail = Math.min(99, Math.max(60, gauss(92, 3 * oeeNoiseScale) * seasonFactor * trendFactor + regimeOffset + prevOeeResidual));
          const perf  = Math.min(99, Math.max(60, gauss(88, 4 * oeeNoiseScale) * trendFactor + regimeOffset * 0.5));
          const qual  = Math.min(99.9, Math.max(85, gauss(97, 1.5 * oeeNoiseScale) * trendFactor));
          const oee = round2(avail * perf * qual / 10000);
          const planned = isHoliday ? 0 : Math.round(base * rand(0.95, 1.05));
          const actual = isHoliday ? 0 : Math.round(planned * perf / 100 + gauss(0, 5 * oeeNoiseScale));
          const defects = Math.max(0, Math.round(actual * (1 - qual / 100)));
          const downtime = Math.round((100 - avail) / 100 * base + gauss(0, 5 * oeeNoiseScale));
          const event = !isHoliday && Math.random() < 0.02 ? choice(['설비고장','PM실시','자재부족','품질이슈']) : isHoliday ? '휴무' : '';
          records.push({ date: ts.toISOString().substring(0, 10), factory_id: `F${String(f).padStart(2,'0')}`, line_id: `L${String(l).padStart(2,'0')}`, shift, planned_qty: planned, actual_qty: actual, defect_qty: defects, oee_pct: round2(oee), availability_pct: round2(avail), performance_pct: round2(perf), quality_pct: round2(qual), uph: Math.round((actual / (shift === 'ALL' ? 16 : 8)) || 0), downtime_min: downtime, energy_kwh: Math.round(gauss(800, 50) * seasonFactor), event });
        }
      }
    }
  }
  onProgress(100);
  onLog(`✅ ${records.length.toLocaleString()}행 KPI 데이터 생성 완료`, 't-dim');
  return { records, headers };
}

// ===================== STREAM MSG =====================
function generateStreamMsg(topic, i, anomaly, processType = 'automotive', cols, difficulty = 'easy', prevVals) {
  const ts = new Date().toISOString();
  const eqId = `EQ-${String(randInt(1, 20)).padStart(3, '0')}`;
  const r = Math.random;
  const isMissing = (field) => r() * 100 < (anomaly.missingRate || 0) ? null : field();
  const spikeMult  = { easy: 1.3, medium: 1.15, hard: 1.07, expert: 1.03 }[difficulty];
  const noiseScale = { easy: 1.0, medium: 1.4,  hard: 2.0,  expert: 2.8  }[difficulty];
  const drift      = difficulty === 'expert' ? Math.sin(i / 120) * 0.04 : 0;
  const regimeFactor = (difficulty === 'hard' || difficulty === 'expert') ? (0.7 + 0.6 * Math.abs(Math.sin(i / 250))) : 1;

  if (topic === 'sensor') {
    const isSpike = r() * 100 < (anomaly.spikeRate || 0);
    const trueAlarm   = r() * 100 < (anomaly.alarmRate || 3);
    const trueWarning = !trueAlarm && r() * 100 < (anomaly.warningRate || 5);
    let status = trueAlarm ? 'ALARM' : trueWarning ? 'WARNING' : 'RUNNING';
    if (difficulty === 'expert' && r() < 0.05) status = status === 'RUNNING' ? (r() < 0.5 ? 'WARNING' : 'ALARM') : 'RUNNING';
    const activeCols = cols?.length ? cols : (SENSOR_COLS_BY_TYPE[processType] ?? SENSOR_COLS_BY_TYPE.automotive).slice(0, 6);
    const row = { timestamp: ts, equipment_id: eqId, status };
    activeCols.forEach(col => {
      const [mn, mx] = SENSOR_RANGES[col] ?? [0, 100];
      const mean = (mn + mx) / 2;
      const std = (mx - mn) / 10 * noiseScale * regimeFactor;
      const prev = prevVals?.get(col) ?? mean;
      const ar = difficulty === 'easy' ? 0 : difficulty === 'medium' ? 0.6 : difficulty === 'hard' ? 0.7 : 0.75;
      const base = ar * prev + (1 - ar) * (mean * (1 + drift));
      const val = isMissing(() => round2(isSpike && r() < 0.3 ? gauss(mean * spikeMult, std * 0.5) : gauss(base, std * Math.sqrt(1 - ar * ar || 1))));
      row[col] = val;
      if (prevVals && typeof val === 'number') prevVals.set(col, val);
    });
    return row;
  }
  if (topic === 'alarm') {
    const severity = r() * 100 < (anomaly.alarmRate || 3) ? 'CRITICAL' : r() * 100 < (anomaly.warningRate || 5) ? 'WARNING' : 'INFO';
    return { timestamp: ts, equipment_id: eqId, seq: i + 1, alarm_type: choice(['OVERTEMP','OVERCURRENT','VIBRATION','PRESSURE','EMERGENCY']), severity, value: round2(rand(0, 200)), ack: false };
  }
  if (topic === 'quality') {
    const stdMult2 = { easy: 6, medium: 3, hard: 2, expert: 1.3 }[difficulty];
    const isNG = r() * 100 < (anomaly.defectRate || 3);
    let result = isNG ? 'NG' : 'OK';
    if (difficulty === 'expert' && r() < 0.06) result = result === 'NG' ? 'OK' : 'NG';
    return { timestamp: ts, product_id: `P-${String(randInt(1, 99999)).padStart(5, '0')}`, m1: isMissing(() => round2(gauss(10, isNG ? 0.05 * stdMult2 : 0.05))), m2: isMissing(() => round2(gauss(5, isNG ? 0.03 * stdMult2 : 0.03))), result, line_id: `L${String(randInt(1, 5)).padStart(2, '0')}` };
  }
  return { timestamp: ts, meter_id: `M${String(randInt(1, 30)).padStart(3, '0')}`, power_kw: round2(gauss(450, 30 * noiseScale)), voltage_v: round2(gauss(220, 2 * noiseScale)), pf: round2(gauss(0.95, 0.02 * noiseScale)), frequency_hz: round2(gauss(60, 0.1 * noiseScale)) };
}

// ===================== MEASURES BY PRODUCT =====================
const MEASURES_BY_PRODUCT = {
  bolt:          [{ id:'m1', label:'외경 (mm)',     mean:10.00, std:0.05 }, { id:'m2', label:'길이 (mm)',   mean:50.00, std:0.10 }, { id:'m3', label:'인장강도 (N)', mean:500, std:15  }, { id:'m4', label:'나사피치 (mm)', mean:1.25, std:0.02 }],
  pcb:           [{ id:'m1', label:'치수 A (mm)',   mean:10.00, std:0.05 }, { id:'m2', label:'치수 B (mm)', mean:5.00,  std:0.03 }, { id:'m3', label:'저항 (Ω)',     mean:100,  std:2.0 }, { id:'m4', label:'강도 (N)',      mean:500,  std:15  }],
  casting:       [{ id:'m1', label:'두께 (mm)',     mean:5.00,  std:0.08 }, { id:'m2', label:'경도 (HRB)', mean:80,    std:2    }, { id:'m3', label:'인장강도 (MPa)',mean:350,  std:20  }, { id:'m4', label:'표면조도 (μm)', mean:1.6,  std:0.3 }],
  battery_cell:  [{ id:'m1', label:'용량 (Ah)',     mean:50.0,  std:0.5  }, { id:'m2', label:'내부저항 (mΩ)',mean:30,  std:2    }, { id:'m3', label:'OCV (V)',      mean:3.7,  std:0.05 }, { id:'m4', label:'두께 (mm)',     mean:6.0,  std:0.05}],
  food_beverage_q:[{id:'m1',label:'충전중량 (g)',   mean:500,   std:2    }, { id:'m2', label:'Brix (°Bx)', mean:12.0, std:0.2  }, { id:'m3', label:'pH',           mean:4.2,  std:0.1  }, { id:'m4', label:'탁도 (NTU)',    mean:1.5,  std:0.3 }],
  food_baking_q: [{ id:'m1', label:'제품중량 (g)',  mean:100,   std:1.5  }, { id:'m2', label:'수분함량 (%)',mean:32,   std:1.0  }, { id:'m3', label:'색도 L값',      mean:65,   std:2    }, { id:'m4', label:'경도 (N)',      mean:8.5,  std:0.8 }],
  food_dairy_q:  [{ id:'m1', label:'지방함량 (%)',  mean:3.5,   std:0.1  }, { id:'m2', label:'단백질 (%)', mean:3.1,  std:0.08 }, { id:'m3', label:'pH',           mean:4.6,  std:0.15 }, { id:'m4', label:'충전중량 (g)',  mean:100,  std:0.5 }],
  food_retort_q: [{ id:'m1', label:'Fo 값',        mean:8.0,   std:0.5  }, { id:'m2', label:'밀봉강도 (%)',mean:97,   std:1    }, { id:'m3', label:'진공도 (kPa)', mean:40,   std:3    }, { id:'m4', label:'내용량 (g)',    mean:200,  std:2   }],
};

// ===================== SCENARIO PRESETS =====================
const SCENARIO_PRESETS = {
  normal:      { scenario:'normal',      alarmRate:3,  warningRate:5,  defectRate:3,  spikeRate:0,  missingRate:0  },
  crisis:      { scenario:'crisis',      alarmRate:60, warningRate:30, defectRate:35, spikeRate:25, missingRate:5  },
  degradation: { scenario:'degradation', alarmRate:15, warningRate:25, defectRate:15, spikeRate:30, missingRate:10 },
  maintenance: { scenario:'maintenance', alarmRate:0,  warningRate:5,  defectRate:2,  spikeRate:0,  missingRate:40 },
};
