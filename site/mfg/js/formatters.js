// ===================== FORMAT =====================
function toFormat(records, headers, fmt, tableName = 'data') {
  if (fmt === 'json') return JSON.stringify(records, null, 2);
  if (fmt === 'jsonl') return records.map(r => JSON.stringify(r)).join('\n');
  if (fmt === 'sql') {
    const cols = headers.join(', ');
    const rows = records.slice(0, 500).map(r => {
      const vals = headers.map(h => {
        const v = r[h];
        if (v === '' || v === null || v === undefined) return 'NULL';
        if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`;
        return v;
      }).join(', ');
      return `(${vals})`;
    });
    return `INSERT INTO ${tableName} (${cols})\nVALUES\n${rows.join(',\n')};`;
  }
  // CSV
  return [
    headers.join(','),
    ...records.map(r =>
      headers.map(h => {
        const v = r[h] === undefined ? '' : r[h];
        const s = String(v);
        return s.includes(',') ? `"${s}"` : s;
      }).join(',')
    ),
  ].join('\n');
}

function downloadData(data, fmt, type) {
  const extMap  = { csv: 'csv', json: 'json', jsonl: 'jsonl', sql: 'sql' };
  const mimeMap = { csv: 'text/csv', json: 'application/json', jsonl: 'application/jsonl', sql: 'text/plain' };
  const content = fmt === 'csv' ? '\uFEFF' + data : data;
  const blob = new Blob([content], { type: mimeMap[fmt] || 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `mfg_${type}_${new Date().toISOString().substring(0, 10)}.${extMap[fmt]}`;
  a.click();
  URL.revokeObjectURL(a.href);
}
