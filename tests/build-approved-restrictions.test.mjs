import test from 'node:test';
import assert from 'node:assert/strict';
import {buildApprovedRestrictions} from '../scripts/build-approved-restrictions.mjs';

const rule=(id='sample')=>({
 id,destination:'RW',phase:'before_go',category:'PLASTICS',title:'Scoped example',
 rule:'Illustrative only, not real-world legal advice',status:'verified',publicationStatus:'approved',
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
