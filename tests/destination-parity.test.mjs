import test from 'node:test';
import assert from 'node:assert/strict';
import {auditDestinationParity} from '../scripts/audit-destination-parity.mjs';

test('reports precise missing codes without silently inheriting parent jurisdiction', () => {
  const r=auditDestinationParity({destinations:[{iso:'RW'},{iso:'EC'}]}, {destinations:['RW','EC','X-GAL']});
  assert.deepEqual(r.missingFromTravelPrep,['X-GAL']);
  assert.deepEqual(r.missingFromVisaBrowser,[]);
  assert.equal(r.parity,false);
});
test('detects missing from VisaBrowser and duplicates on either side',()=>{
  const r=auditDestinationParity({destinations:[{iso:'RW'},{iso:'RW'},{iso:'US'}]},{destinations:['RW','GB','GB']});
  assert.deepEqual(r.missingFromVisaBrowser,['US']);
  assert.deepEqual(r.missingFromTravelPrep,['GB']);
  assert.ok(r.errors.some(x=>x.includes('Duplicate Travel-Prep')));
  assert.ok(r.errors.some(x=>x.includes('Duplicate VisaBrowser')));
});
test('exact inventory parity is the only success',()=>{
  assert.equal(auditDestinationParity({destinations:[{iso:'RW'}]},{destinations:['RW']}).parity,true);
});
test('rejects malformed inventories',()=>{
  assert.ok(auditDestinationParity({destinations:[]},null).errors.length);
  assert.ok(auditDestinationParity({destinations:[{}]},{destinations:[]}).errors.length);
});
