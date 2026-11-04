import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const sentenceSegmenter = new Intl.Segmenter("en", { granularity: "sentence" });
const ignoredTerms = new Set("a an and are as at be been being by can could did do does for from had has have he her hers him his how i if in into is it its may might more most of on or our out over she should so than that the their them then there these they this those through to too under up us was we were what when where which who why will with would you your".split(" "));
const termAliases = new Map([
  ["currently", "current"],
  ["offered", "available"],
  ["offers", "available"],
  ["location", "destination"],
  ["locations", "destination"]
]);
const maxSummaryPoints = 3;
const maxSummaryLength = 220;

function sentencePoints(text) {
  const protectedInitials = text
    .replace(/\b(?:[A-Z]\.\s*){2,3}(?=[A-Z][a-z])/g, (match) => match.replace(/\./g, "\uE000"))
    .replace(/\b[A-Z][a-z]+(?:[-'][A-Z]?[a-z]+)*\s+[A-Z]\.\s+(?=[A-Z][a-z])/g, (match) => match.replace(/\./g, "\uE000"));
  return protectedInitials.split(/\n+/)
    .flatMap((line) => line.split(/;\s+/))
    .flatMap((line) => [...sentenceSegmenter.segment(line)].map((item) => item.segment.trim()))
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.replace(/\uE000/g, "."))
    .map((item) => capitalizePoint(/[.!?]$/.test(item) ? item : `${item}.`));
}

function capitalizePoint(point) {
  const characters = Array.from(point);
  const firstLetter = characters.findIndex((character) => /\p{L}/u.test(character));
  if (firstLetter < 0) return point;
  characters[firstLetter] = characters[firstLetter].toLocaleUpperCase("en");
  return characters.join("");
}

function contentTerms(text) {
  return new Set((text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [])
    .filter((term) => term.length > 2 && !ignoredTerms.has(term))
    .map((term) => termAliases.get(term) || term));
}

function isCovered(point, detailed) {
  const terms = contentTerms(point);
  if (terms.size < 4) return detailed.toLowerCase().includes(point.toLowerCase());
  const detailTerms = contentTerms(detailed);
  let matches = 0;
  for (const term of terms) if (detailTerms.has(term)) matches++;
  return matches / terms.size >= 0.88;
}

function deduplicateDetails(text) {
  const items = text.split(/\n\s*\n/).map((item) => item.trim()).filter(Boolean);
  const unique = [];
  const seen = new Set();
  const transactionStats = new Map();
  let removed = 0;

  for (const item of items) {
    const stats = item.match(/ECB SPACE 2024 reports cash at ([\d.]+)% and physical cards at ([\d.]+)%/i);
    if (stats) {
      const key = `${stats[1]}:${stats[2]}`;
      if (transactionStats.has(key)) {
        const index = transactionStats.get(key);
        if (item.length > unique[index].length) unique[index] = item;
        removed++;
        continue;
      }
      transactionStats.set(key, unique.length);
    }

    const normalized = item.toLowerCase()
      .replace(/^[^:]{1,60}:\s*/, "")
      .replace(/\s+/g, " ")
      .trim();
    if (seen.has(normalized)) {
      removed++;
      continue;
    }
    seen.add(normalized);
    unique.push(item);
  }

  return { text: unique.join("\n\n"), removed };
}

let summariesChanged = 0;
let pointsMoved = 0;
let pointsAlreadyCovered = 0;
let duplicateDetailsRemoved = 0;
let detailedFieldsChanged = 0;

for (const destination of destinations) {
  for (const [stageKey, stage] of Object.entries(destination.stages)) {
    const originalSimple = stage.simple || Object.values(stage).join(" ") || "No data yet.";
    const points = sentencePoints(originalSimple);
    const summary = [];
    const detailPoints = [];
    let summaryLength = 0;

    for (const point of points) {
      const nextLength = summaryLength + point.length + (summary.length ? 1 : 0);
      if (summary.length < maxSummaryPoints && nextLength <= maxSummaryLength) {
        summary.push(point);
        summaryLength = nextLength;
      } else {
        detailPoints.push(point);
      }
    }

    const nextSimple = summary.join("\n");
    if (stage.simple !== nextSimple) {
      stage.simple = nextSimple;
      summariesChanged++;
    }

    const detailed = stage.detailed || "";
    const additions = detailPoints.filter((point) => {
      if (isCovered(point, detailed)) {
        pointsAlreadyCovered++;
        return false;
      }
      pointsMoved++;
      return true;
    });
    const nextDetailed = [detailed.trim(), ...additions].filter(Boolean).join("\n\n");
    const deduplicated = deduplicateDetails(nextDetailed);
    duplicateDetailsRemoved += deduplicated.removed;
    if (stage.detailed !== deduplicated.text) detailedFieldsChanged++;
    stage.detailed = deduplicated.text;
  }
}

if (summariesChanged || detailedFieldsChanged) {
  writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
}

console.log(JSON.stringify({
  profiles: destinations.length,
  stages: destinations.length * 5,
  summariesChanged,
  pointsMoved,
  pointsAlreadyCovered,
  duplicateDetailsRemoved,
  detailedFieldsChanged
}, null, 2));