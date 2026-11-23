import csv
import json
import re
import sys
from pathlib import Path
from urllib.parse import urlparse

root = Path(__file__).resolve().parents[1]
visa_output = Path(sys.argv[1]) if len(sys.argv) > 1 else None
if visa_output is None:
    raise SystemExit("Usage: python scripts/build-first-scan-alerts.py <VisaBrowser site directory>")


def read(name):
    with (root / "research" / "first-scan" / name).open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


findings = read("findings.csv")
coverage = read("coverage.csv")
destinations = {row["destination_id"]: {
    "name": row["destination"],
    "scanStatus": row["scan_status"],
    "openChecks": int(row["unverified_rows_without_findings"]),
} for row in coverage}
if len(destinations) != len(coverage):
    raise ValueError("Duplicate destination in scan coverage")
ids = [row["finding_id"] for row in findings]
if len(set(ids)) != len(ids):
    raise ValueError("Duplicate finding ID")

travel = {"destinations": destinations, "notes": {}}
visa = {"destinations": destinations, "notes": {}}
visa_terms = re.compile(r"\b(?:visa|visas|evisa|e-visa|etias|k-eta|entry authori[sz]ation)\b", re.I)
classified = set()
for row in findings:
    did = row["destination_id"]
    if did not in destinations and did != "GLOBAL-AVIATION":
        raise ValueError(f"Unknown destination: {did}")
    url = row["official_or_government_url"]
    if urlparse(url).scheme not in ("http", "https"):
        raise ValueError(f"Invalid source URL for {row['finding_id']}")
    entry = row["category_code"] == "ENTRY_DOCUMENTS"
    local_permission = did in ("TK", "X-TDC") and not visa_terms.search(row["finding"]) and "passport" not in row["finding"].lower()
    visa_related = entry and not local_permission
    visa_related |= (not entry and row["category_code"] in ("ARRIVAL_FORMS", "HEALTH", "DEPARTURE")
                     and bool(visa_terms.search(row["finding"])))
    travel_related = not entry or local_permission or row["proposed_app"] == "both_review"
    conflict = row["evidence_status"] == "conflicting_authority_guidance"
    note = {
        "id": row["finding_id"],
        "phase": row["phase"],
        "category": row["category"],
        "text": "Sources conflict on this issue. Check current guidance with the responsible authority." if conflict else row["finding"],
        "scope": row["jurisdiction_scope"],
        "status": row["evidence_status"],
        "format": row["research_format"],
        "authority": row["authority"],
        "url": url,
        "checked": row["source_date_checked"],
    }
    if travel_related:
        travel["notes"].setdefault(did, []).append(note)
        classified.add(row["finding_id"])
    if visa_related:
        visa_note = note.copy()
        if not entry or row["proposed_app"] == "both_review":
            visa_note["text"] = ("Check passport, visa or entry-permission documentation and conditions "
                                 "with the cited authority; other travel requirements may also apply.")
        visa["notes"].setdefault(did, []).append(visa_note)
        classified.add(row["finding_id"])

if classified != set(ids):
    raise ValueError(f"Unrouted findings: {set(ids) - classified}")

(root / "first-scan-alerts.js").write_text(
    "globalThis.firstScanTravelAlerts = " + json.dumps(travel, ensure_ascii=False, separators=(",", ":")) + ";\n",
    encoding="utf-8",
)
(visa_output / "first-scan-alerts.js").write_text(
    "export const firstScanEntryAlerts = " + json.dumps(visa, ensure_ascii=False, separators=(",", ":")) + ";\n",
    encoding="utf-8",
)
print(f"Routed {len(ids)} findings from {len(destinations)} destinations")
print(f"Travel-Prep: {sum(map(len, travel['notes'].values()))}; VisaBrowser: {sum(map(len, visa['notes'].values()))}")
