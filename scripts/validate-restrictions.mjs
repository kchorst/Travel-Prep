#!/usr/bin/env node
// Nonproduction validation contract for a future *curated* travel restrictions dataset.
// Usage: node scripts/validate-restrictions.mjs path/to/restrictions.json
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function validateRestrictions(payload, validDestinations = null) {
  const errors = [];
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return ['dataset must be an object'];
  if (payload.schemaVersion !== 1) errors.push('schemaVersion must be 1');
  if (!Array.isArray(payload.records)) return [...errors, 'records must be an array'];
  const allowedStatus = new Set(['verified','conditional','unverified','conflicting','not_applicable']);
  const allowedPhases = new Set(['before_go','during_visit']);
  const borderRelevance = new Set(['entry','transit','customs','departure']);
  const destinationList = validDestinations ?? (Array.isArray(payload.destinations) ? payload.destinations : null);
  const destinationSet = destinationList && new Set(destinationList);
  const seen = new Set();
  payload.records.forEach((r, i) => {
    const path = `records[${i}]`;
    if (!r || typeof r !== 'object' || Array.isArray(r)) { errors.push(`${path}: must be an object`); return; }
    for (const k of ['id','destination','phase','category','title','rule','status','jurisdiction','scope']) {
      if (typeof r[k] !== 'string' || !r[k].trim()) errors.push(`${path}: missing/blank ${k}`);
    }
    if (r.id) { if (seen.has(r.id)) errors.push(`${path}: duplicate id ${r.id}`); seen.add(r.id); }
    if (typeof r.destination === 'string' && destinationSet && !destinationSet.has(r.destination)) errors.push(`${path}: unknown destination ${r.destination}`);
    if (!allowedPhases.has(r.phase)) errors.push(`${path}: invalid phase`);
    if (!allowedStatus.has(r.status)) errors.push(`${path}: invalid status`);
    if (!Array.isArray(r.sources)) errors.push(`${path}: sources must be an array`);
    else for (const [j,s] of r.sources.entries()) {
      if (typeof s?.authority !== 'string' || !s.authority.trim()) errors.push(`${path}.sources[${j}]: missing authority`);
      try { const u = new URL(s?.url); if (u.protocol !== 'https:') throw Error(); }
      catch { errors.push(`${path}.sources[${j}]: invalid HTTPS URL`); }
    }
    if (r.status === 'verified' || r.status === 'conditional') {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(r.checkedAt ?? '') ||
          !Number.isFinite(Date.parse(r.checkedAt))) errors.push(`${path}: verified/conditional claim requires valid checkedAt`);
      if (!Array.isArray(r.sources) || r.sources.length === 0) errors.push(`${path}: verified/conditional claim needs source`);
    }
    if (r.visabrowser_alert === true) {
      if (!Array.isArray(r.relevance) || !r.relevance.some(v => borderRelevance.has(v))) errors.push(`${path}: VisaBrowser alert requires border relevance`);
      if (r.status !== 'verified' && r.status !== 'conditional') errors.push(`${path}: VisaBrowser alert must be verified or conditional`);
    }
  });
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!process.argv[2]) { console.error('Usage: node scripts/validate-restrictions.mjs DATASET.json'); process.exit(2); }
  let dataset;
  try { dataset = JSON.parse(readFileSync(process.argv[2], 'utf8')); }
  catch (error) { console.error(String(error)); process.exit(2); }
  const errors = validateRestrictions(dataset);
  if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
  console.log(`Restriction contract OK: ${dataset.records.length} records. This does NOT verify laws or country coverage.`);
}
