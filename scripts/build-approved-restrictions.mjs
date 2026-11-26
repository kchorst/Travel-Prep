#!/usr/bin/env node
// Nonproduction deterministic packager for *already approved* restrictions.
// This does not research or infer legal requirements, and never deploys anything.
// Example: node scripts/build-approved-restrictions.mjs source.json destinations.json output.json visa-browser
import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import {validateRestrictions} from './validate-restrictions.mjs';
import {isIsoDate} from './restrictions-applicability.mjs';

export function buildApprovedRestrictions(source, destinationCodes, audience = 'travel-prep') {
  if (audience !== 'travel-prep' && audience !== 'visa-browser') {
    throw new Error('Snapshot audience must be travel-prep or visa-browser');
  }
  if (!source || source.publicationStatus !== 'approved' || !source.approvalId ||
      typeof source.approvalId !== 'string' || !source.approvalId.trim() ||
      !isIsoDate(source.approvedAt)) {
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
  // Validate legal-source metadata before calculating version. No Phase 1 completion implied.
  const errors = validateRestrictions({
    schemaVersion: 1, publicationStatus: 'approved', datasetVersion: 'pending', records,
  }, destinationCodes);
  if (errors.length) throw new Error('Invalid release data: '+errors.join('; '));
  const checkedAfterApproval = records.find(record => record.checkedAt > source.approvedAt);
  if (checkedAfterApproval) {
    throw new Error(`Source check for ${checkedAfterApproval.id} is later than snapshot approval`);
  }
  records.sort((a, b) => (a.id < b.id ? -1 : Number(a.id > b.id)));
  const canonical = {
    schemaVersion: 1,
    publicationStatus: 'approved',
    audience,
    approvalId: source.approvalId,
    approvedAt: source.approvedAt,
    destinations: [...destinationCodes].sort(),
    records: audience === 'visa-browser'
      ? records.filter(record => record.visabrowser_alert === true)
      : records,
  };
  const bytes=JSON.stringify(canonical);
  const digest=createHash('sha256').update(bytes).digest('hex');
  return {...canonical,datasetVersion:'sha256-'+digest,integrity:{algorithm:'SHA-256',hex:digest}};
}

if (process.argv[1] && import.meta.url===pathToFileURL(process.argv[1]).href) {
  if (process.argv.length < 5 || process.argv.length > 6) {
    console.error('Usage: node scripts/build-approved-restrictions.mjs SOURCE.json DESTINATIONS.json OUTPUT.json [travel-prep|visa-browser]');
    process.exit(2);
  }
  try {
    const source=JSON.parse(readFileSync(process.argv[2],'utf8'));
    const manifest=JSON.parse(readFileSync(process.argv[3],'utf8'));
    const artifact=buildApprovedRestrictions(source,manifest.destinations,process.argv[5]);
    writeFileSync(process.argv[4],JSON.stringify(artifact,null,2)+'\n');
    console.log('Created nonproduction snapshot',artifact.datasetVersion);
  } catch(error) {console.error(error.message);process.exit(1);}
}
