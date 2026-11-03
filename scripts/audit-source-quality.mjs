import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDirectory = path.join(root, "data");
const destinations = JSON.parse(readFileSync(path.join(dataDirectory, "destinations.json"), "utf8"));
const electrical = JSON.parse(readFileSync(path.join(dataDirectory, "electrical-standards.json"), "utf8"));
const entries = [];

for (const destination of destinations) {
  for (const [stageName, stage] of Object.entries(destination.stages)) {
    for (const item of stage.sources || []) entries.push({ iso: destination.iso, stage: stageName, ...item });
  }
  const standard = electrical[destination.iso];
  if (standard?.source) {
    entries.push({ iso: destination.iso, stage: "electrical", topic: "Electrical standards", url: standard.source, lastChecked: standard.lastChecked });
  }
}

const uniqueUrls = new Map();
const badMetadata = [];
const dates = {};
for (const entry of entries) {
  let url;
  try {
    url = new URL(entry.url);
  } catch {
    badMetadata.push(`${entry.iso}/${entry.stage}: invalid URL`);
    continue;
  }
  if (url.protocol !== "https:") badMetadata.push(`${entry.iso}/${entry.stage}: non-HTTPS URL`);
  if (!entry.topic) badMetadata.push(`${entry.iso}/${entry.stage}: missing topic`);
  if (!entry.lastChecked) badMetadata.push(`${entry.iso}/${entry.stage}: missing review date`);
  dates[entry.lastChecked || "missing"] = (dates[entry.lastChecked || "missing"] || 0) + 1;
  if (!uniqueUrls.has(url.href)) uniqueUrls.set(url.href, { host: url.hostname, uses: 0 });
  uniqueUrls.get(url.href).uses++;
}

const domains = new Map();
for (const [url, metadata] of uniqueUrls) {
  if (!domains.has(metadata.host)) domains.set(metadata.host, []);
  domains.get(metadata.host).push({ url, uses: metadata.uses });
}

console.log(JSON.stringify({
  profiles: destinations.length,
  citationEntries: entries.length,
  uniqueUrls: uniqueUrls.size,
  uniqueDomains: domains.size,
  sourceDates: dates,
  metadataIssues: badMetadata.length,
  issues: badMetadata.slice(0, 20)
}, null, 2));

if (!process.argv.includes("--probe")) {
  console.log("Reachability probe skipped. Use --probe --limit=30 [--offset=0] for a bounded domain sample.");
  process.exit(0);
}

const readOption = (name, fallback) => {
  const argument = process.argv.find((value) => value.startsWith(`--${name}=`));
  const value = argument ? Number(argument.slice(name.length + 3)) : fallback;
  return Number.isInteger(value) && value >= 0 ? value : fallback;
};
const limit = Math.max(1, readOption("limit", 30));
const offset = readOption("offset", 0);
const rankedDomains = [...domains.entries()].sort((left, right) => {
  const leftUses = left[1].reduce((sum, item) => sum + item.uses, 0);
  const rightUses = right[1].reduce((sum, item) => sum + item.uses, 0);
  return rightUses - leftUses || left[0].localeCompare(right[0]);
});
const sample = rankedDomains.slice(offset, offset + limit).map(([host, urls]) => ({ host, ...urls[0] }));
const results = [];
let cursor = 0;

async function worker() {
  while (cursor < sample.length) {
    const item = sample[cursor++];
    try {
      let response = await fetch(item.url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(8000) });
      if ([403, 404, 405, 429, 501].includes(response.status)) {
        await response.body?.cancel();
        response = await fetch(item.url, { method: "GET", headers: { Range: "bytes=0-0" }, redirect: "follow", signal: AbortSignal.timeout(8000) });
      }
      results.push({ host: item.host, url: item.url, status: response.status, finalUrl: response.url });
      await response.body?.cancel();
    } catch (error) {
      results.push({ host: item.host, url: item.url, error: `${error.name}: ${error.message}` });
    }
  }
}

await Promise.all(Array.from({ length: Math.min(4, sample.length) }, () => worker()));
results.sort((left, right) => left.host.localeCompare(right.host));
console.log(JSON.stringify({
  probe: { offset, limit, attempted: results.length, note: "403/429 and timeouts are indeterminate; some sites block automated HEAD requests." },
  results
}, null, 2));