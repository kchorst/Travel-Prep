#!/usr/bin/env node
// Nonproduction cross-repository destination inventory audit.
// Usage: node scripts/audit-destination-parity.mjs data/index.json ../VisaBrowser/site/data/index.json
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function auditDestinationParity(travelIndex, visaIndex) {
  const errors = [];
  const entries = travelIndex?.destinations;
  const codes = visaIndex?.destinations;
  if (!Array.isArray(entries) || !Array.isArray(codes)) {
    return { errors: ['Both destination inventories must be arrays'] };
  }
  const travelCodes = entries.map((entry) => entry?.iso);
  for (let i=0; i<travelCodes.length; i++) {
    if (typeof travelCodes[i] !== 'string' || !travelCodes[i].trim()) errors.push(`Travel-Prep destination ${i} missing ISO/code`);
  }
  const duplicates = (values) => values.filter((v,i) => v && values.indexOf(v) !== i);
  for (const code of new Set(duplicates(travelCodes))) errors.push(`Duplicate Travel-Prep code: ${code}`);
  for (const code of new Set(duplicates(codes))) errors.push(`Duplicate VisaBrowser code: ${code}`);
  const travel = new Set(travelCodes.filter((x) => typeof x === 'string'));
  const visa = new Set(codes.filter((x) => typeof x === 'string'));
  const missingFromTravelPrep = [...visa].filter((x) => !travel.has(x)).sort();
  const missingFromVisaBrowser = [...travel].filter((x) => !visa.has(x)).sort();
  return {
    errors, travelPrepCount: travel.size, visaBrowserCount: visa.size,
    missingFromTravelPrep, missingFromVisaBrowser,
    parity: errors.length === 0 && missingFromTravelPrep.length === 0 && missingFromVisaBrowser.length === 0
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length < 4) { console.error('Usage: node scripts/audit-destination-parity.mjs TRAVEL_INDEX VISA_INDEX'); process.exit(2); }
  try {
    const result = auditDestinationParity(
      JSON.parse(readFileSync(process.argv[2], 'utf8')),
      JSON.parse(readFileSync(process.argv[3], 'utf8'))
    );
    console.log(JSON.stringify(result, null, 2));
    if (!result.parity) process.exitCode=1;
  } catch (error) { console.error(String(error)); process.exitCode=2; }
}
