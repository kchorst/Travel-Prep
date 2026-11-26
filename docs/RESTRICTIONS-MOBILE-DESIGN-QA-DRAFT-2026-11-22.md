# Parallel Phase 2/3 — Mobile experience and design QA specification (DRAFT)
**Last revised:** 2026-11-22  
**Release status:** Design only, not authorized for production. Phase 1 verification remains open.

## Product boundary
Travel-Prep is the comprehensive travel-preparation reference. VisaBrowser is the entry eligibility and border documentation tool. Both should share verified, scoped identifiers and source metadata, **not** an identical wall of warnings. A national customs restriction is not necessarily a flight restriction, and an aviation rule is not a customs prohibition. Jurisdiction-specific rules override inherited parent-country defaults only when supported by official sources.

## Travel-Prep destination detail (proposed)
- After the destination heading and short overview, display **Before You Go** and **During Your Visit** as distinct accessible sections. Each has a compact count of **confirmed restrictions**, **conditional rules**, and **research gaps**. Counts refer to *records actually reviewed*, not assumed absence of restrictions.
- Categories expand to show a plain-language 1–2 sentence summary, authority, last checked date, and a **View official rule** link. An expandable panel holds conditions, exceptions, penalties (only when verified), regions and mode-of-entry applicability.
- Filter tabs: All / Customs & packing / Aviation & electronics / Health & medication / Local laws / Environment / Transport. Filtering must not hide a high-consequence warning without an indicator.
- Visually distinguish **Confirmed**, **Conditional**, **Not yet verified**, **Conflicting**, and **Not applicable**, using text plus icon—not color alone. Never label uninvestigated cells *No issues*.
- For drone rules, separate **Bring a drone**, **Register/obtain operating permission**, and **Where you can fly**. For power banks, show **Flight operator/segment rule**, **Carry-on versus checked**, **Wh capacity and quantity**, and **Use during flight**. Do not imply a general import ban.
- For countries with partial legal coverage, show a succinct "Not all categories verified" note and links to independent primary authorities. No empty category may imply clearance.

## VisaBrowser integration (proposed)
- On country detail, show a bounded **Important border and customs restrictions** accordion when a source-backed, release-approved relevant rule exists. Offer the country-specific Travel-Prep link whenever the exact destination has a verified deep link. For a destination without a Travel-Prep profile, offer the Travel-Prep destination search and indicate that the dedicated profile is unavailable.
- Only import records flagged for **entry, transit, customs, departure**. Local photography rules, driving behavior and ordinary etiquette stay in Travel-Prep.
- Critical notices must not change visa/ETA classifications or the meaning of the existing **NO ISSUES** indicator. The indicator refers to visa/authorization obstacles, not all local laws.
- A traveler with an unrecognized territory ID receives a **coverage not verified** message and a matching destination search link. Never silently substitute a parent country.

## Mobile-first interactions
- Validate layouts at **320 px**, **375 px**, **390 px**, **768 px**, and desktop; account for mobile browser text scaling at 200%.
- Sections and links must remain keyboard accessible with visible focus indicators, meaningful labels, screen-reader reading order and no click-only hints. Accordion state must be programmatically exposed; keyboard Enter/Space operates summaries/buttons.
- Tap targets should be at least **44 × 44 CSS px** where practical; nested links should not collide with accordion activation.
- A long official URL displays as an accessible **View official rule** link; do not introduce sideways scrolling. Titles, dates and jurisdiction badges must wrap.
- Preserve scroll on return to a destination selection list, but start newly opened destination pages at the top; distinguish restoring the old view from navigating to a new one.
- Offline mode must show the **data snapshot date and version** and an unobtrusive "Rules may have changed" notice. Never claim a cache refresh when only the service-worker shell updates.

| VisaBrowser result | Proposed message | Interaction |
| --- | --- | --- |
| Approved data unavailable | “Border notices are unavailable. Check official sources before travel.” | Keep the preparation link and existing visa result accessible. |
| Destination missing from approved snapshot | “Border notices have not been verified for this destination.” | Use the exact destination link when available, otherwise link to the Travel-Prep search. |
| Included destination with no matching notices | “No published border notices match this trip.” | Keep the preparation link and show the selected itinerary context. |
| Included destination with matching notices | Show each notice title, notice kind, jurisdiction and review date. | Give each authority link a destination- or rule-specific accessible name. |

Announce changed notice results in a polite status region after itinerary
filters update. Keep focus on the changed input when the same destination
remains open. On navigation to a new detail view, focus its heading and move to
the top. Read the availability message and offline status independently.

## Draft QA / acceptance matrix
| Scenario | Acceptance criterion |
| --- | --- |
| Destination has no verified law record | "Research pending" instead of "no restrictions" |
| Conditional plastic bag prohibition | Condition, scope and primary source visible |
| Country with international flight and domestic connection | Correct operator/route distinction; no country-wide power-bank ban inferred |
| Drone import permitted but operation restricted | Separate import vs operation messages |
| Same territory with parent country's general customs rules | Explicit scoped inheritance, never automatic |
| Rule source changed since last snapshot | Preserve old version label and warning until explicit approved refresh |
| Offline initial visit | No blank screen or false new-law status |
| Stale source | Checked date and source easily accessible |
| Different passport nationalities | VisaBrowser maintains passport-specific entry rules; Travel-Prep restriction scope shown separately |
| Unknown destination | Explicit unavailable mapping without silent fallback |
| Conflicting authorities | Mark as conflicting and exclude from definitive VisaBrowser alerts |
| Non-verified P1 research | Cannot be published as approved restrictions |
| Keyboard and screen reader | Every accordion, official link, destination picker usable |
| Narrow screen / 200% zoom | Text wraps, no horizontal overflow, controls reachable |
| Saved result / previously cached page | Result version and source date preserved; updates do not silently rewrite existing saved snapshots |

## Release checkpoints
1. Phase 1 evidence and destination inventory independently verified. A research matrix cell is not certified by containing a single partial finding.
2. Phase 2 source mapping, information hierarchy, mobile prototype and localization-ready strings approved.
3. Phase 3 build, schema and version validators, negative tests (unverified/ambiguous rules), desktop/mobile browser walkthroughs, offline tests, and source-regression checks pass.
4. User explicitly authorizes merging draft PRs and publishing. Until then, **no production UI or Pages deployment**.

## Explicitly untested
The proposed presentation still needs device-level mobile, screen-reader and
visual QA. The VisaBrowser draft browser test exercises only the data loader
with synthetic records and Cache Storage. Its online and offline checks do
not cover a rendered restriction notice, focus management, real links, or the
existing apps' service-worker update lifecycle.
