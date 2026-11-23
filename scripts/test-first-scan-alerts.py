import csv
import json
import unittest
from pathlib import Path

root = Path(__file__).resolve().parents[1]


def read_csv(name):
    with (root / "research" / "first-scan" / name).open(encoding="utf-8-sig", newline="") as stream:
        return list(csv.DictReader(stream))


class FirstScanAlertsTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        text = (root / "first-scan-alerts.js").read_text(encoding="utf-8")
        cls.data = json.loads(text.removeprefix("globalThis.firstScanTravelAlerts = ").removesuffix(";\n"))
        cls.findings = {row["finding_id"]: row for row in read_csv("findings.csv")}
        cls.coverage = {row["destination_id"]: row for row in read_csv("coverage.csv")}

    def test_destinations_and_partial_statuses_preserved(self):
        self.assertEqual(set(self.data["destinations"]), set(self.coverage))
        self.assertEqual(len(self.data["destinations"]), 275)
        for key, destination in self.data["destinations"].items():
            self.assertEqual(destination["scanStatus"], self.coverage[key]["scan_status"])
            self.assertEqual(destination["openChecks"], int(self.coverage[key]["unverified_rows_without_findings"]))

    def test_alerts_keep_scope_source_and_dates(self):
        seen = set()
        for destination, notes in self.data["notes"].items():
            for note in notes:
                self.assertNotIn(note["id"], seen)
                seen.add(note["id"])
                finding = self.findings[note["id"]]
                self.assertEqual(finding["destination_id"], destination)
                self.assertEqual(note["scope"], finding["jurisdiction_scope"])
                self.assertEqual(note["url"], finding["official_or_government_url"])
                self.assertEqual(note["checked"], finding["source_date_checked"])
                self.assertEqual(note["format"], finding["research_format"])
                if finding["evidence_status"] == "conflicting_authority_guidance":
                    self.assertIn("Sources conflict", note["text"])
                else:
                    self.assertEqual(note["text"], finding["finding"])

    def test_special_places_and_global_aviation_remain_separate(self):
        galapagos = self.data["notes"]["X-GAL"]
        self.assertTrue(any("biosecurity inspection" in note["text"] for note in galapagos))
        self.assertTrue(all(note["scope"] for note in self.data["notes"]["X-ASH"]))
        self.assertIn("GLOBAL-AVIATION", self.data["notes"])
        self.assertNotEqual(self.data["destinations"]["X-SHT"]["scanStatus"], "")


if __name__ == "__main__":
    unittest.main()
