import test from 'node:test';
import assert from 'node:assert/strict';
import {validateRestrictions} from '../scripts/validate-restrictions.mjs';
const base = () => ({
  schemaVersion:1, destinations:['RW'],
  records:[{id:'a',destination:'RW',phase:'before_go',category:'customs',title:'Title',
    rule:'Rule',status:'verified',jurisdiction:'Rwanda',scope:'nationwide',
    checkedAt:'2026-11-22',sources:[{authority:'Authority',url:'https://example.gov/rule'}],
    relevance:['customs'],visabrowser_alert:true,publicationStatus:'approved'}]
});
test('accepts sourced scoped records',()=>assert.deepEqual(validateRestrictions(base()),[]));
test('rejects unverified VisaBrowser warning',()=>{
  const p=base();p.records[0].status='unverified';
  assert.match(validateRestrictions(p).join(';'),/must be verified or conditional/);
});
test('rejects invalid destinations and duplicate rule identifiers',()=>{
  const p=base();p.records.push({...p.records[0],destination:'NOT-A-DEST'});
  const out=validateRestrictions(p);
  assert.ok(out.some(x=>x.includes('duplicate id')));
  assert.ok(out.some(x=>x.includes('unknown destination')));
});
test('requires official-style source metadata and validation date',()=>{
  const p=base();p.records[0].sources=[];p.records[0].checkedAt=null;
  assert.ok(validateRestrictions(p).some(x=>x.includes('needs source')));
  assert.ok(validateRestrictions(p).some(x=>x.includes('requires valid checkedAt')));
});
test('rejects unsafe source links',()=>{
  const p=base();p.records[0].sources[0].url='javascript:alert(1)';
  assert.ok(validateRestrictions(p).some(x=>x.includes('invalid HTTPS URL')));
});

test('unapproved border notices cannot be published',()=>{
  const p=base();p.records[0].publicationStatus='research_only';
  assert.ok(validateRestrictions(p).some(x=>x.includes('explicit approval')));
});
test('approved datasets must have pinned, non-draft versions',()=>{
  const p=base();p.publicationStatus='approved';p.datasetVersion='DRAFT-BAD';
  assert.ok(validateRestrictions(p).some(x=>x.includes('non-draft version')));
});

test('producer and consumer reject impossible dates and source URLs with credentials', () => {
  const payload = base();
  payload.records[0].checkedAt = '2026-02-30';
  payload.records[0].sources[0].url = 'https://user@example.gov/rule';
  const errors = validateRestrictions(payload);
  assert.ok(errors.some(error => error.includes('valid checkedAt')));
  assert.ok(errors.some(error => error.includes('invalid HTTPS URL')));
});

test('applicability accepts supported selectors and rejects incomplete or unknown ones', () => {
  const payload = base();
  for (const applicability of [
    null, {}, { passportCodes: [] }, { arrivalModes: ['rail'] },
    { arrivalModes: ['air', 'air'] }, { passportCodes: [' gb'] }, { origins: ['GB'] },
  ]) {
    payload.records[0].applicability = applicability;
    assert.ok(validateRestrictions(payload).some(error => error.includes('invalid applicability')));
  }
  payload.records[0].applicability = { passportCodes: ['GB', 'X-NCY'], arrivalModes: ['air', 'land'] };
  assert.deepEqual(validateRestrictions(payload), []);
});

test('effective dates are calendar days and review deadlines must follow the check date', () => {
  const payload = base();
  const rule = payload.records[0];
  for (const dates of [
    { effectiveFrom: '2026-02-30' },
    { effectiveFrom: '2026-12-02', effectiveUntil: '2026-12-01' },
    { reviewBy: '2026-11-22' },
    { effectiveUntil: null },
  ]) {
    payload.records[0] = { ...rule, ...dates };
    assert.ok(validateRestrictions(payload).some(error => error.includes('invalid effective or review dates')));
  }
  payload.records[0] = { ...rule, effectiveFrom: '2026-12-01', effectiveUntil: '2026-12-01', reviewBy: '2026-12-02' };
  assert.deepEqual(validateRestrictions(payload), []);
});
