# Travel restrictions integration design — working draft (2026-11-22)

**Status:** Phase 2 design / Phase 3 nonproduction infrastructure only. Phase 1 worldwide verification remains open. This document is not an implementation approval for country-specific rules or a release.

## Ownership and scope
- **Travel-Prep** owns the complete Before You Go and During Your Visit restrictions register. It is authoritative for the *curated data records*, not for law itself; authority must always be attributed to official sources.
- **VisaBrowser** imports only records explicitly flagged `visabrowser_alert` and relevant to entry, transit, customs, or departure. Visa/ETA classification remains managed by VisaBrowser, not the restrictions register.
- Both apps share destination identifiers from a reconciled destination inventory. Do not silently fall back from a territory to its administering state's rules.
- Browser consumption should use a **versioned, immutable, validated JSON artifact** built in Travel-Prep; never hot-link an unverified editable research spreadsheet.

## Record contract
See `research/restrictions.contract.example.json` and `scripts/validate-restrictions.mjs`.
Required fields: stable ID, destination ID, phase (`before_go` / `during_visit`), category, title, rule text, evidence status, applicable legal jurisdiction, scope, verification date, and `sources` (official URLs with responsible authority). Optional fields: route/airline dependency, passport applicability, regional/local scope, exceptions, expiry/recheck date, and VisaBrowser alert flag.

Status values: `verified`, `conditional`, `unverified`, `conflicting`, `not_applicable`. **No record implies no restriction merely because no source was found.** The research matrix and published legal guidance are separate artifacts. A completed destination inventory record is not a completed category audit.

## Safety gates
1. Verify every referenced destination against the canonical inventory. Hold conflicting territory mappings for human review.
2. Reject duplicate IDs, unknown phases/statuses, malformed source URLs, and absence of a checked date for verified/conditional legal claims.
3. Reject any `visabrowser_alert` without an explicit `entry`, `transit`, `customs`, or `departure` relevance value.
4. Do not publish records with `unverified` or `conflicting` status as definitive warnings.
5. Treat carrier/route power-bank rules differently from national entry bans; treat drone import permissions differently from drone operation permissions.
6. Keep published dataset snapshots pinned in both apps until cross-app consistency and regression tests pass.
7. Make no application UI changes or production releases until the user approves post-research specifications and release readiness.

## Geographic inventory reconciliation
As of 2026-11-22 the VisaBrowser inventory has 275 destination codes; Travel-Prep has 196, all among VisaBrowser's current codes. The 79 missing Travel-Prep entries are not automatically supported by existing Travel-Prep profile structures. Special X-* destinations need explicit legal and geographic scoping. Inventory parity and genuine coverage are separate requirements.

## Future user experience (design only)
- Travel-Prep country detail: collapsible **Before You Go** and **During Your Visit** sections, grouped by category, with an official-source link, review date, exceptions, and legal scope.
- VisaBrowser result: short, high-consequence entry/customs/departure notices that link to the matching Travel-Prep destination details, avoiding unrelated driving/photography advice.
- Mobile-first typography, keyboard interaction, offline version indicators, explicit data freshness, and no impression that an incomplete research matrix means permission to travel.

## Exit criteria
Phase 1 verified inventory and category research -> Phase 2 finalized UI and field specification -> Phase 3 implementation/tests -> explicit approval before release. Draft branches stay out of `main` until those checks are satisfied.

## Passport and arrival-mode conditions

An approved record may carry `applicability.passportCodes` and
`applicability.arrivalModes`. Either selector can be omitted. A listed
selector uses exact matches, and a rule with both selectors requires both
matches. A missing itinerary input suppresses notices that depend on it.
Arrival modes are `air`, `land`, and `sea`. Passport codes identify the
document used for the trip, independently of the destination or residence.
Keep conditions the app cannot evaluate, such as goods, carrier,
origin, transit, permit status, or prior travel, in the scoped source
record. They require an explicit design decision before use as targeted
VisaBrowser notices. Confirm applicability before any integration with
live entry eligibility results.

## Effective dates and source review

Optional `effectiveFrom` and `effectiveUntil` bound a notice to a legal
date window, including both endpoints. An optional `reviewBy` gives the first
day the source must be rechecked. VisaBrowser suppresses the notice from that
day until the review is completed and a new snapshot is approved. Snapshot
integrity and offline availability do not extend either deadline. The draft
reader evaluates an explicit date when provided and otherwise uses the current
UTC date. If a future UI needs destination-local dates near midnight, pass
the applicable date explicitly. A suppressed notice does not establish that
the underlying rule has ended or that the traveler is cleared.

## Legal requirements, advisories and carrier policies

Every approved record must declare `noticeKind` as `legal_requirement`,
`official_advisory`, `carrier_policy`, or `official_guidance`. This describes
the nature of the claim. The existing verification status describes the
quality of the supporting evidence. Keep both when rendering a notice.

Travel-Prep may show any approved type in the appropriate travel stage.
VisaBrowser can surface explicitly approved border-relevant legal requirements
and official advisories. Label an advisory as such, and keep it separate from
the visa or entry decision. Carrier policies and general official guidance
belong in Travel-Prep even when a carrier checks them before boarding.
Legacy draft fixtures require classification and a new snapshot digest
before they can be used as approved data.

## Separate travel legs and verified snapshots

Use `departureModes` for rules tied to an outbound air, land, or sea leg.
When the trip has no departure mode, suppress notices that require one.
Arrival and departure selectors refer to different journey legs. A notice
with both selectors is eligible only when both match. A transit rule that
depends on changing terminals or clearing border controls still requires
route-specific research and additional context before publication.

VisaBrowser renders notices from the loader's verified snapshot. The
draft loader preserves that verification after loading by making the
snapshot and records immutable. A copied or reconstructed snapshot must
pass through verification before it can supply notices.
