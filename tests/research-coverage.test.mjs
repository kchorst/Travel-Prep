import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCsv,auditResearchCoverage} from '../scripts/audit-research-coverage.mjs';
const manifest={destinations:['RW','X-GAL'],categories:[{phase:'before_go',code:'PLASTICS'},{phase:'during_visit',code:'DRONE_OPERATION'}]};
const make=(id,phase,cat,status='NOT_YET_VERIFIED')=>({
destination_id:id,phase,category_code:cat,research_status:status,
source_date_checked:'',scope_note:'Do not infer unrestricted travel',source_url:''
});
test('parser handles quoted commas, quotes, and CRLF',()=>{
  assert.deepEqual(parseCsv('a,b\r\n"x,y","z""q"\r\n'),[{a:'x,y',b:'z"q'}]);
});
test('the complete inventory is mandatory even for special territories',()=>{
 const r=auditResearchCoverage([make('RW','before_go','PLASTICS')],manifest);
 assert.equal(r.expected,4);assert.equal(r.pending,4);assert.equal(r.complete,false);
 assert.ok(r.errors.some(e=>e.includes('X-GAL')));
});
test('partial evidence never marks a cell reviewed',()=>{
 const rows=[make('RW','before_go','PLASTICS','PARTIAL_EVIDENCE_RECORDED')];
 assert.equal(auditResearchCoverage(rows,manifest).reviewed,0);
});
test('unverified and reviewed-with-gaps are distinct',()=>{
 const rows=[];
 for(const dest of manifest.destinations) for(const cat of manifest.categories)
   rows.push(make(dest,cat.phase,cat.code,'INCONCLUSIVE_REVIEWED'));
 for(const r of rows){r.scope_note='Reviewed official portals; jurisdiction-specific documents not found';r.source_date_checked='2026-11-22';}
 const summary=auditResearchCoverage(rows,manifest);
 assert.equal(summary.complete,true);assert.equal(summary.reviewed,4);
});
test('verified claims require official URL and checked date',()=>{
 const rows=[make('RW','before_go','PLASTICS','VERIFIED_RESTRICTION')];
 const out=auditResearchCoverage(rows,manifest);
 assert.ok(out.errors.some(e=>e.includes('HTTPS')));
 assert.ok(out.errors.some(e=>e.includes('date')));
});
test('duplicates and unknown research categories block signoff',()=>{
 const rows=[make('RW','before_go','BAD'),make('RW','before_go','BAD')];
 const summary=auditResearchCoverage(rows,manifest);
 assert.ok(summary.errors.some(e=>e.includes('Duplicate cell')));
 assert.ok(summary.errors.some(e=>e.includes('unknown category')));
});
