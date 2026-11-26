#!/usr/bin/env node
// Nonproduction research coverage auditor. Never infers "no restrictions" from missing records.
// Supports the Phase 1 CSV research ledger and an independent destination/category manifest.
// Usage: node scripts/audit-research-coverage.mjs LEDGER.csv MANIFEST.json [--gate]
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { isIsoDate } from './restrictions-applicability.mjs';

export function parseCsv(input) {
  if (typeof input !== 'string') throw new TypeError('CSV input must be a string');
  input = input.replace(/^\uFEFF/, '');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;
  let closedQuote = false;
  function finishField() {
    row.push(field);
    field = '';
    closedQuote = false;
  }
  function finishRow() {
    if (row.length || field || closedQuote) {
      finishField();
      rows.push(row);
      row = [];
    }
  }
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i+1] === '"') { field += '"'; i++; }
      else if (c === '"') { quoted = false; closedQuote = true; }
      else field += c;
    } else if (c === ',') finishField();
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && input[i+1] === '\n') i++;
      finishRow();
    } else if (closedQuote) throw new Error('Unexpected content after closing CSV quote');
    else if (c === '"') {
      if (field) throw new Error('Unexpected quote in unquoted CSV field');
      quoted = true;
    } else field += c;
  }
  if (quoted) throw new Error('Unterminated quoted CSV field');
  finishRow();
  if (!rows.length) return [];
  const headers = rows.shift().map(value => value.trim());
  if (headers.some(header => !header)) throw new Error('Blank CSV header');
  if (new Set(headers).size !== headers.length) throw new Error('Duplicate CSV header');
  return rows.map((r, i) => {
    if (r.length !== headers.length) throw new Error(`CSV row ${i+2}: expected ${headers.length} fields, got ${r.length}`);
    return Object.fromEntries(headers.map((h, j) => [h, r[j]]));
  });
}

export function auditResearchCoverage(rows, manifest) {
  const errors = [];
  if (!Array.isArray(rows) || !Array.isArray(manifest?.destinations) ||
      !manifest.destinations.length || !Array.isArray(manifest?.categories) || !manifest.categories.length)
    return {errors:['Rows must be an array and both manifest inventories must be nonempty arrays'],complete:false};
  const destinations = new Set(manifest.destinations);
  if (manifest.destinations.some(code => typeof code !== 'string' || !/^(?:[A-Z]{2}|X-[A-Z0-9]+)$/.test(code)))
    errors.push('Invalid destination in manifest');
  const categories = new Map();
  for (const c of manifest.categories) {
    if (!c || !['before_go','during_visit'].includes(c.phase) ||
        typeof c.code !== 'string' || !/^[A-Z][A-Z0-9_]*$/.test(c.code))
      errors.push('Invalid phase/category in manifest');
    else { const key = c.phase + ':' + c.code; if (categories.has(key)) errors.push('Duplicate category: '+key); categories.set(key,c); }
  }
  if (destinations.size !== manifest.destinations.length) errors.push('Duplicate destination in manifest');
  const pendingStatuses = new Set(['NOT_YET_VERIFIED','PARTIAL_EVIDENCE_RECORDED']);
  const completedStatuses = new Set([
    'VERIFIED_RESTRICTION', 'VERIFIED_CONDITIONAL_RESTRICTION', 'VERIFIED_NO_RESTRICTION',
    'NOT_APPLICABLE', 'INCONCLUSIVE_REVIEWED', 'CONFLICTING_REVIEWED',
  ]);
  const seen = new Set(); const pending = [], reviewed = [], byStatus = Object.create(null);
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
      if (!isIsoDate(r.source_date_checked))
        errors.push(`Row ${i+2}: reviewed cell has no valid check date`);
      if (typeof r.scope_note !== 'string' || !r.scope_note.trim())
        errors.push(`Row ${i+2}: reviewed cell lacks scoped investigation notes`);
      // Closed cells must retain primary-source provenance, including inconclusive
      // investigations and not-applicable determinations. A date and assertion alone
      // are not sufficient evidence that an investigation occurred.
      try {
        const u = new URL(r.source_url);
        if (u.protocol !== 'https:' || !u.hostname || u.username || u.password) throw new Error();
      } catch { errors.push(`Row ${i+2}: reviewed cell requires authority HTTPS source`); }
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
