#!/usr/bin/env node
// Nonproduction deterministic packager for *already approved* restrictions.
// This does not research or infer legal requirements, and never deploys anything.
// Example: node scripts/build-approved-restrictions.mjs source.json destinations.json output.json
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {validateRestrictions} from './validate-restrictions.mjs';

const isDate = (x) => typeof x === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(x) &&
  !Number.isNaN(Date.parse(x)) && new Date(x).toISOString().startsWith(x);

export function buildApprovedRestrictions(source, destinationCodes) {
  if (!source || source.publicationStatus !== 'approved' || !source.approvalId ||
      typeof source.approvalId !== 'string' || !source.approvalId.trim() ||
      !isDate(source.approvedAt)) {
    throw new Error('Explicit approval ID and approval date required before compiling');
  }
  if (!Array.isArray(destinationCodes) || !destinationCodes.length ||
      destinationCodes.some(x=>typeof x!=='string'||!x.trim()) ||
      new Set(destinationCodes).size !== destinationCodes.length)
    throw new Error('Valid, unique destination inventory required');
  if (!Array.isArray(source.records))
    throw new Error('Source records must be an array');
  const records = source.records.map(r=>({...r}));
  if (records.some(r=>r.publicationStatus !== 'approved' ||
      !['verified','conditional'].includes(r.status)))
    throw new Error('Only individually approved and verified/conditional records may ship');
  records.sort((a,b)=>a.id.localeCompare(b.id));
  const canonical = {
    schemaVersion:1, publicationStatus:'approved',
    approvalId:source.approvalId,approvedAt:source.approvedAt,
    destinations:[...destinationCodes].sort(), records
  };
  // Validate legal-source metadata before calculating version. No Phase 1 completion implied.
  const errors = validateRestrictions({...canonical,datasetVersion:'pending'},destinationCodes);
  if (errors.length) throw new Error('Invalid release data: '+errors.join('; '));
  const bytes=JSON.stringify(canonical);
  const digest=createHash('sha256').update(bytes).digest('hex');
  return {...canonical,datasetVersion:'sha256-'+digest,integrity:{algorithm:'SHA-256',hex:digest}};
}

if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  if (process.argv.length!==5) {
    console.error('Usage: node scripts/build-approved-restrictions.mjs SOURCE.json DESTINATIONS.json OUTPUT.json');
    process.exit(2);
  }
  try {
    const source=JSON.parse(readFileSync(process.argv[2],'utf8'));
    const manifest=JSON.parse(readFileSync(process.argv[3],'utf8'));
    const artifact=buildApprovedRestrictions(source,manifest.destinations);
    writeFileSync(process.argv[4],JSON.stringify(artifact,null,2)+'\n');
    console.log('Created nonproduction snapshot',artifact.datasetVersion);
  } catch(error) {console.error(error.message);process.exit(1);}
}
