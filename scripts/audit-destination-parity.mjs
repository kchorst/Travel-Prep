#!/usr/bin/env node
// Nonproduction cross-repository destination inventory audit.
// Usage: node scripts/audit-destination-parity.mjs data/index.json ../VisaBrowser/site/data/index.json
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export function auditDestinationParity(travelIndex, visaIndex) {
  const errors = [];
  const entries = travelIndex?.destinations;
  const codes = visaIndex?.destinations;
  if (!Array.isArray(entries) || !entries.length || !Array.isArray(codes) || !codes.length) {
    return { errors: ['Both destination inventories must be nonempty arrays'] };
  }
  const travelCodes = entries.map((entry) => entry?.iso);
  function collectCodes(values, app) {
    const seen = new Set();
    for (const [index, code] of values.entries()) {
      if (typeof code !== 'string' || !/^[A-Z]{2}$|^X-[A-Z0-9]+$/.test(code)) {
        errors.push(`${app} destination ${index} has an invalid code`);
      } else if (seen.has(code)) {
        errors.push(`Duplicate ${app} code: ${code}`);
      } else {
        seen.add(code);
      }
    }
    return seen;
  }
  const travel = collectCodes(travelCodes, 'Travel-Prep');
  const visa = collectCodes(codes, 'VisaBrowser');
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
