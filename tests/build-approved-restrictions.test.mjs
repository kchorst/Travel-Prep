import test from 'node:test';
import assert from 'node:assert/strict';
import {buildApprovedRestrictions} from '../scripts/build-approved-restrictions.mjs';

const rule=(id='sample')=>({
 id,destination:'RW',phase:'before_go',category:'PLASTICS',title:'Scoped example',
 rule:'Illustrative only, not real-world legal advice',status:'verified',noticeKind:'legal_requirement',publicationStatus:'approved',
 jurisdiction:'Rwanda',scope:'national',checkedAt:'2026-11-22',
 sources:[{authority:'Test authority',url:'https://example.gov/requirements'}],
 relevance:['customs'],visabrowser_alert:true
});
const source=(rows=[rule()])=>({publicationStatus:'approved',approvalId:'SYNTHETIC-TEST-APPROVAL',approvedAt:'2026-11-22',records:rows});

test('produces reproducible pinned dataset hashes independent of record order',()=>{
 const a=buildApprovedRestrictions(source([rule('b'),rule('a')]),['RW','GB']);
 const b=buildApprovedRestrictions(source([rule('a'),rule('b')]),['GB','RW']);
 assert.equal(a.datasetVersion,b.datasetVersion);
 assert.deepEqual(a.records.map(r=>r.id),['a','b']);
 assert.match(a.datasetVersion,/^sha256-[a-f0-9]{64}$/);
});
test('refuses research-only source or missing release approval',()=>{
 assert.throws(()=>buildApprovedRestrictions({...source(),publicationStatus:'research_only'},['RW']),/Explicit approval/);
 assert.throws(()=>buildApprovedRestrictions({...source(),approvalId:''},['RW']),/Explicit approval/);
});
test('never compiles unapproved, unverified or conflicting claims',()=>{
 assert.throws(()=>buildApprovedRestrictions(source([rule('x'),{...rule('y'),status:'unverified'}]),['RW']),/Only individually approved/);
 assert.throws(()=>buildApprovedRestrictions(source([rule('x'),{...rule('y'),publicationStatus:'research_only'}]),['RW']),/Only individually approved/);
});
test('rejects destinations not in supported inventory and unsafe official source metadata',()=>{
 assert.throws(()=>buildApprovedRestrictions(source([rule()]),['GB']),/unknown destination/);
 assert.throws(()=>buildApprovedRestrictions(source([{...rule(),sources:[]}]),['RW']),/needs source/);
});
test('requires distinct destination identifiers',()=>{
 assert.throws(()=>buildApprovedRestrictions(source(),['RW','RW']),/unique/);
});

test('snapshot approval must be on or after every record’s source check', () => {
  const rechecked = { ...rule(), checkedAt: '2026-11-23' };
  assert.throws(() => buildApprovedRestrictions(source([rechecked]), ['RW']),
    /Source check for sample is later than snapshot approval/);
  const approved = { ...source([rechecked]), approvedAt: '2026-11-23' };
  assert.equal(buildApprovedRestrictions(approved, ['RW']).records[0].checkedAt, approved.approvedAt);
});

test('producer emits the snapshot used by the VisaBrowser interoperability tests', async () => {
  const { readFile } = await import('node:fs/promises');
  const readFixture = async (name) =>
    JSON.parse(await readFile(new URL('./fixtures/' + name, import.meta.url), 'utf8'));
  const source = await readFixture('approved-restrictions-input.json');
  const expected = await readFixture('approved-restrictions-snapshot.json');
  assert.deepEqual(buildApprovedRestrictions(source, ['TEST-TERRITORY', 'TEST-MAINLAND']), expected);
});
