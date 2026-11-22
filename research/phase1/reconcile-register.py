"""Generate the cumulative research register without closing incomplete cells."""
import argparse
import csv
import hashlib
import json
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import urlsplit


def read_csv(path):
    with path.open(newline='', encoding='utf-8-sig') as stream:
        reader = csv.DictReader(stream)
        return reader.fieldnames, list(reader)


def write_csv(path, fields, rows):
    with path.open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def cell(row):
    return row['destination_id'], row['phase'], row['category_code']


def reconcile(baseline, findings_file, sources, manifest_file, output):
    ledger_fields, ledger = read_csv(baseline)
    finding_fields, existing_findings = read_csv(findings_file)
    metadata_fields = ['finding_id', 'source_date_checked']
    finding_fields = [field for field in finding_fields if field not in metadata_fields]
    manifest = json.loads(manifest_file.read_text())
    destination_ids = set(manifest['destinations'])
    categories = {(row['phase'], row['code']) for row in manifest['categories']}
    expected = {(destination, *category) for destination in destination_ids for category in categories}
    if len(ledger) != len(expected) or {cell(row) for row in ledger} != expected:
        raise ValueError('Input matrix does not match the manifest exactly')

    rows_by_cell = {cell(row): row for row in ledger}
    prior_status = Counter(row['research_status'] for row in ledger)
    prior_partials = {cell(row) for row in ledger if row['research_status'] == 'PARTIAL_EVIDENCE_RECORDED'}
    finding_rows = []
    seen = set()
    evidence_by_cell = defaultdict(list)

    def add_finding(row, date, identifier=None):
        key = (*cell(row), row['official_or_government_url'], row['finding'])
        if key in seen:
            return
        seen.add(key)
        stable_id = identifier or 'prior-' + hashlib.sha256(
            json.dumps(key, ensure_ascii=False).encode()
        ).hexdigest()[:16]
        row = {**row, 'finding_id': stable_id, 'source_date_checked': date}
        finding_rows.append(row)
        evidence_by_cell[cell(row)].append(row)

    for row in existing_findings:
        if row['category_code'] == 'CUSTOMS_PROHIBITED':
            row['category_code'] = 'CUSTOMS'
        candidate = rows_by_cell.get(cell(row), {})
        confirmed_date = row.get('source_date_checked', '') or (candidate.get('source_date_checked', '') if (
            not row.get('finding_id') and candidate.get('source_url') == row['official_or_government_url']
        ) else '')
        add_finding(row, confirmed_date, row.get('finding_id'))

    for source_file in sources:
        source_batch = json.loads(source_file.read_text())
        if source_batch['status'] != 'research_only':
            raise ValueError(f'Unexpected status in {source_file}')
        for item in source_batch['checks']:
            identifier, targets, phase, category, claim, scope, authority, url, gaps = item[:9]
            evidence_status = item[9] if len(item) == 10 else 'official_primary_scoped'
            if urlsplit(url).scheme != 'https' or not urlsplit(url).hostname:
                raise ValueError(f'{identifier} is missing an HTTPS source')
            for destination in source_batch.get('groups', {}).get(targets, targets).split():
                if (destination, phase, category) not in expected and destination != 'GLOBAL-AVIATION':
                    raise ValueError(f'Unknown research cell {(destination, phase, category)}')
                row = dict(zip(finding_fields, [
                    destination, phase, category, claim, scope, evidence_status,
                    url, authority, 'no' if phase == 'during_visit' or category == 'POWER_BANK_AIR'
                    else 'candidate_only', gaps,
                ], strict=True))
                add_finding(row, source_batch['checkedAt'], f'{identifier}-{destination}')

    if len({row['finding_id'] for row in finding_rows}) != len(finding_rows):
        raise ValueError('Finding IDs must be unique')
    for key, row in rows_by_cell.items():
        if key not in evidence_by_cell or row['research_status'] not in {
            'NOT_YET_VERIFIED', 'PARTIAL_EVIDENCE_RECORDED',
        }:
            continue
        records = evidence_by_cell[key]
        row['research_status'] = 'PARTIAL_EVIDENCE_RECORDED'
        first_source = next(
            (record for record in reversed(records) if record['source_date_checked']),
            records[0],
        )
        row['finding_id'] = '|'.join(record['finding_id'] for record in records)
        row['source_url'] = first_source['official_or_government_url']
        row['source_date_checked'] = first_source['source_date_checked']
        row['scope_note'] = 'Scoped evidence only; see linked findings for claims, limits and gaps.'

    status = Counter(row['research_status'] for row in ledger)
    output.mkdir(parents=True, exist_ok=True)
    write_csv(output / baseline.name, ledger_fields, ledger)
    write_csv(output / findings_file.name, finding_fields + metadata_fields, finding_rows)
    checkpoint = {
        'destinations': len(destination_ids),
        'categories': len(categories),
        'total_checks': len(expected),
        'prior_cell_statuses': prior_status,
        'current_cell_statuses': status,
        'new_cells_with_partial_evidence': sum(
            row['research_status'] == 'PARTIAL_EVIDENCE_RECORDED' and cell(row) not in prior_partials
            for row in ledger
        ),
        'distinct_scoped_findings': len(finding_rows),
        'distinct_destinations_with_partial_evidence': len({
            row['destination_id'] for row in ledger if row['research_status'] == 'PARTIAL_EVIDENCE_RECORDED'
        }),
        'baseline_geographic_scope_independently_closed': False,
        'publication_status': 'research_only',
    }
    (output / 'Phase1-Coverage-Checkpoint.json').write_text(json.dumps(checkpoint, indent=2) + '\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('baseline', type=Path)
    parser.add_argument('findings', type=Path)
    parser.add_argument('manifest', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('sources', type=Path, nargs='+')
    args = parser.parse_args()
    reconcile(args.baseline, args.findings, args.sources, args.manifest, args.output)
