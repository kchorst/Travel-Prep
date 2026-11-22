# Worldwide restrictions research checkpoint

Phase 1 is in progress. The cumulative register is research-only. The 275-destination, 35-category matrix is the agreed working baseline. The [destination inventory review](destination-scope-review-2026-11-22.md) records special jurisdictions and overlapping identifiers still requiring a scope decision.

## Files to resume from

- [Register archive](register.zip) contains the complete matrix, the findings keyed by `finding_id`, and the reconciled destination inventory. The archive also contains a per-category progress table.
- [Coverage checkpoint](coverage-checkpoint-2026-11-22.json) records audited totals and baseline provenance.
- Each batch JSON records the authority, URL, check date, jurisdiction, and open questions for the claims checked in that batch. The historical batches came from Travel-Prep's Phase 1 register branch at `66a4ae448f6527e82664193f27a88d8542587e40`. The corresponding Library v12 files contained all 1,134 prior finding IDs, with one previously missing date populated.

Use the latest archive as input for `reconcile-register.py`. Pass the matrix CSV, findings CSV, manifest path, output directory, and the new batch JSON files. Preserve earlier evidence and source gaps. The script records partial evidence and leaves cells open. The `finding_id` column in the matrix can contain several linked findings separated by a vertical bar.

## Remaining work

1. Queue all `NOT_YET_VERIFIED` cells for a first authority check. Start with underserved categories in frequently traveled destinations, then work through every remaining destination and any separately scoped jurisdictions.
2. Review all `PARTIAL_EVIDENCE_RECORDED` cells against the category's subtopics. An EU directive about market supply leaves passenger import unresolved. A regional protected-site framework leaves site-specific travel restrictions unresolved. Preserve verified rules, conditional rules, and scoped exceptions as individual findings.
3. Prioritize the conflicting authority records and four legacy records with no check date. Retain the conflict until the applicable route, legal text and effective date resolve it. Record regulator/operator/airport scope for power banks. Review drone import independently of drone operation.
4. Document attempts that reach an impasse with the authority checked, source, date, and specific unresolved subject. Assign category-wide non-applicability only where authoritative evidence supports it for the full scoped cell.
5. Reconcile the pending geographic entries in the inventory review and run a final audit of cell coverage, duplicate jurisdictions, source sufficiency, time-sensitive rules, and contradictory evidence before writing the completion report.

Only a final review of the full cell can close it. Research evidence here requires separate approval before it can enter either application's dataset.
