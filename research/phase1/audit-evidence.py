"""Check cumulative Phase 1 register links after extracting register.zip."""

import csv
import sys
from pathlib import Path


def read_rows(directory, filename):
    with (directory / filename).open(newline="", encoding="utf-8-sig") as source:
        return list(csv.DictReader(source))


def cell(row):
    return row["destination_id"], row["phase"], row["category_code"]


def audit(directory):
    matrix = read_rows(directory, "country_category_research_matrix.csv")
    findings = read_rows(directory, "official_source_findings_expanded.csv")
    inventory = read_rows(directory, "destination_inventory_reconciled_275.csv")
    inventory_ids = {row["id"] for row in inventory}
    if len(inventory_ids) != len(inventory) or inventory_ids != {row["destination_id"] for row in matrix}:
        raise ValueError("Destination inventory must match the matrix and have unique IDs")

    findings_by_id = {row["finding_id"]: row for row in findings}
    if "" in findings_by_id or len(findings_by_id) != len(findings):
        raise ValueError("Finding IDs must be present and unique")

    referenced = set()
    for row in matrix:
        identifiers = row["finding_id"].split("|") if row["finding_id"] else []
        if len(identifiers) != len(set(identifiers)):
            raise ValueError(f"Duplicate finding link for {cell(row)}")
        if bool(identifiers) == (row["research_status"] == "NOT_YET_VERIFIED"):
            raise ValueError(f"Evidence links disagree with the status for {cell(row)}")
        for identifier in identifiers:
            finding = findings_by_id.get(identifier)
            if finding is None or cell(finding) != cell(row):
                raise ValueError(f"Invalid finding link {identifier} for {cell(row)}")
        referenced.update(identifiers)

    unlinked = [
        row["finding_id"] for row in findings
        if row["finding_id"] not in referenced and row["destination_id"] != "GLOBAL-AVIATION"
    ]
    if unlinked:
        raise ValueError(f"Unlinked destination findings: {', '.join(unlinked)}")
    print(f"Evidence links verified for {len(matrix):,} cells and {len(findings):,} findings")


if __name__ == "__main__":
    audit(Path(sys.argv[1]))
