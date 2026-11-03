import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-03";
const indexUrl = "https://www.speedtest.net/global-index";
const methodologyUrl = "https://www.speedtest.net/global-index/about";
const source = (topic, url) => ({ topic, url, lastChecked: checked });
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
let added = 0;

for (const destination of destinations) {
  const arrival = destination.stages.arrival24h;
  if (arrival.detailed.includes("Broadband benchmark access:")) continue;

  arrival.detailed = `${arrival.detailed.trim()}\n\nBroadband benchmark access: Ookla's Speedtest Global Index compares mobile and fixed-broadband speeds monthly using a rolling three-month sample. Search for ${destination.country}; either category may be N/A when it misses the precision threshold. This national result is not a forecast for a particular address, hotel, or provider.`;

  const sources = [
    source("Ookla Speedtest Global Index country rankings", indexUrl),
    source("Ookla Speedtest Global Index methodology and reporting period", methodologyUrl)
  ];
  for (const item of sources) {
    if (!arrival.sources.some((existing) => existing.url === item.url)) arrival.sources.push(item);
  }
  added++;
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added live broadband benchmark guidance to ${added} profiles; existing notes were left unchanged.`);