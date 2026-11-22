#!/usr/bin/env node
// Nonproduction research coverage auditor. Never infers "no restrictions" from missing records.
// Supports the Phase 1 CSV research ledger and an independent destination/category manifest.
// Usage: node scripts/audit-research-coverage.mjs LEDGER.csv MANIFEST.json [--gate]
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function parseCsv(input) {
  if (typeof input !== 'string') throw new TypeError('CSV input must be a string');
  const rows = []; let row = []; let field = ''; let quoted = false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i+1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"' && field === '') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && input[i+1] === '\n') i++;
      row.push(field); if (row.some(x => x !== '')) rows.push(row);
      row = []; field = '';
    } else field += c;
  }
  if (quoted) throw new Error('Unterminated quoted CSV field');
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows.shift().map(x => x.replace(/^\uFEFF/, '').trim());
  if (new Set(headers).size !== headers.length) throw new Error('Duplicate CSV header');
  return rows.map((r, i) => {
    if (r.length !== headers.length) throw new Error(`CSV row ${i+2}: expected ${headers.length} fields, got ${r.length}`);
    return Object.fromEntries(headers.map((h, j) => [h, r[j]]));
  });
}

export function auditResearchCoverage(rows, manifest) {
  const errors = [];
  if (!Array.isArray(rows) || !manifest || !Array.isArray(manifest.destinations) || !Array.isArray(manifest.categories))
    return {errors:['Rows and manifest destinations/categories must be arrays'],complete:false};
  const destinations = new Set(manifest.destinations);
  const categories = new Map();
  for (const c of manifest.categories) {
    if (!c || !['before_go','during_visit'].includes(c.phase) || typeof c.code !== 'string' || !c.code)
      errors.push('Invalid phase/category in manifest');
    else { const key = c.phase + ':' + c.code; if (categories.has(key)) errors.push('Duplicate category: '+key); categories.set(key,c); }
  }
  if (destinations.size !== manifest.destinations.length) errors.push('Duplicate destination in manifest');
  const pendingStatuses = new Set(['NOT_YET_VERIFIED','PARTIAL_EVIDENCE_RECORDED']);
  const completedStatuses = new Set(['VERIFIED_RESTRICTION','VERIFIED_NO_RESTRICTION','NOT_APPLICABLE','INCONCLUSIVE_REVIEWED']);
  const seen = new Set(); const pending = [], reviewed = [], byStatus = {};
  for (const [i, r] of rows.entries()) {
    const key = [r.destination_id,r.phase,r.category_code].join('|');
    if (seen.has(key)) errors.push(`Duplicate cell: ${key}`);
    seen.add(key);
    if (!destinations.has(r.destination_id)) errors.push(`Row ${i+2}: unknown destination ${r.destination_id}`);
    if (!categories.has(r.phase+':'+r.category_code)) errors.push(`Row ${i+2}: unknown category ${r.phase}:${r.category_code}`);
    const status = r.research_status;
    if (!pendingStatuses.has(status) && !completedStatuses.has(status)) errors.push(`Row ${i+2}: unknown status ${status}`);
    byStatus[status] = (byStatus[status]||0)+1;
    if (completedStatuses.has(status)) {
      // Even unresolved research requires a dated investigation and a clear explanation.
      const date = r.source_date_checked;
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date||'') || Number.isNaN(Date.parse(date)))
        errors.push(`Row ${i+2}: reviewed cell has no valid check date`);
      if (typeof r.scope_note !== 'string' || !r.scope_note.trim())
        errors.push(`Row ${i+2}: reviewed cell lacks scoped investigation notes`);
      if (status.startsWith('VERIFIED_')) {
        try { if (new URL(r.source_url).protocol !== 'https:') throw new Error(); }
        catch { errors.push(`Row ${i+2}: verified cell requires HTTPS source`); }
      }
      reviewed.push(key);
    } else pending.push(key);
  }
  for (const destination of destinations) for (const category of categories.values()) {
    const key = [destination,category.phase,category.code].join('|');
    if (!seen.has(key)) { pending.push(key); errors.push('Missing cell: '+key); }
  }
  return {
    expected: destinations.size * categories.size, found: rows.length,
    distinctDestinations:destinations.size, distinctCategories:categories.size,
    reviewed:reviewed.length, pending:pending.length, byStatus,
    errors, complete:errors.length===0 && pending.length===0,
    // The sample helps locate work, without expanding output into thousands of rows.
    pendingExamples:pending.slice(0,25)
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length<4) { console.error('Usage: node scripts/audit-research-coverage.mjs LEDGER.csv MANIFEST.json [--gate]'); process.exit(2); }
  try {
    const rows=parseCsv(readFileSync(process.argv[2],'utf8'));
    const manifest=JSON.parse(readFileSync(process.argv[3],'utf8'));
    const result=auditResearchCoverage(rows,manifest);
    console.log(JSON.stringify(result,null,2));
    // Research audits are progress reports by default; --gate blocks premature Phase 1 signoff.
    if (process.argv.includes('--gate') && !result.complete) process.exitCode=1;
  } catch(e) {console.error(String(e));process.exitCode=2;}
}
