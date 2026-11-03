import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";
const euCountries = "AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE".split(" ");
const emergencyUrl = "https://digital-strategy.ec.europa.eu/en/policies/112";
const ukUrl = "https://www.gov.uk/guidance/999-and-112-the-uks-national-emergency-numbers";

const guidance = new Map(
  euCountries.map((iso) => [
    iso,
    {
      simple: "Emergency: 112 is the free EU-wide number for police, ambulance, or fire.",
      detailed: "Emergency response: Call 112 for police, ambulance, or fire; it is free from fixed and mobile phones throughout the EU. Operators can handle English or French in many countries, but this is not guaranteed. Use 112 for emergencies, not general information.",
      source: { topic: "European Commission: 112 emergency number in the EU", url: emergencyUrl }
    }
  ])
);

guidance.set("GB", {
  simple: "Emergency: Call 999 or 112 in the UK for police, ambulance, or fire.",
  detailed: "Emergency response: Call 999 or 112 for police, ambulance, fire, or coastguard. The call handler asks which service is needed and routes the call to the appropriate local control room.",
  source: { topic: "UK Government: 999 and 112 emergency numbers", url: ukUrl }
});

for (const [iso, update] of guidance) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const arrival = destination.stages.arrival24h;
  if (!arrival.simple.includes(update.simple)) arrival.simple += ` ${update.simple}`;

  const paragraphs = arrival.detailed.split("\n\n");
  const index = paragraphs.findIndex((paragraph) => paragraph.startsWith("Emergency response:"));
  if (index < 0) paragraphs.push(update.detailed);
  else paragraphs[index] = update.detailed;
  arrival.detailed = paragraphs.join("\n\n");

  if (!arrival.sources.some((source) => source.url === update.source.url)) {
    arrival.sources.push({ ...update.source, lastChecked: checked });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added emergency response guidance for ${guidance.size} European profiles.`);