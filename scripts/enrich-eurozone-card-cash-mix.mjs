import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";
const sourceUrl = "https://www.ecb.europa.eu/stats/ecb_surveys/space/html/ecb.space2024~19d46f0f17.en.html";

const shares = {
  BE: [39.3, 53.0],
  DE: [53.3, 35.6],
  EE: [39.1, 48.6],
  IE: [48.8, 36.5],
  GR: [53.9, 37.2],
  ES: [57.4, 31.8],
  FR: [43.1, 48.3],
  HR: [55.5, 37.9],
  IT: [60.6, 32.3],
  CY: [48.5, 42.4],
  LV: [44.5, 44.4],
  LT: [54.2, 36.6],
  LU: [36.5, 49.1],
  MT: [66.8, 25.5],
  NL: [21.6, 56.2],
  AT: [61.6, 31.3],
  PT: [54.1, 38.3],
  SI: [63.9, 29.2],
  SK: [57.2, 32.2],
  FI: [27.2, 57.2]
};
const legacySimple = {
  NL: "In-person payments: ECB's 2024 survey found cards were used for 56% of Dutch point-of-sale transactions; carry some cash because acceptance varies by merchant.",
  FI: "In-person payments: ECB's 2024 survey found cards were used for 57% of Finnish point-of-sale transactions; keep some euros for exceptions.",
  SI: "In-person payments: ECB's 2024 survey found cash was used for 64% of Slovenian point-of-sale transactions; carry euros alongside a card.",
  MT: "In-person payments: ECB's 2024 survey found cash was used for 67% of Maltese point-of-sale transactions; carry euros alongside a card."
};

for (const [iso, [cashShare, cardShare]] of Object.entries(shares)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const arrival = destination.stages.arrival24h;
  const simple = `In-person payments: ECB SPACE 2024 reports cash at ${cashShare.toFixed(1)}% and physical cards at ${cardShare.toFixed(1)}% of point-of-sale transactions in ${destination.country}. These are use shares, not a guarantee of foreign-card acceptance.`;
  const detailed = `In-person card and cash: ECB SPACE 2024 reports cash at ${cashShare.toFixed(1)}% and physical cards at ${cardShare.toFixed(1)}% of point-of-sale transactions in ${destination.country}. The card category combines physical debit, credit, and prepaid cards; mobile-device payments are separate. These are consumer-reported transaction shares, not a guarantee of foreign-card acceptance at a particular merchant or evidence that debit and credit cards are accepted equally. Carry local cash and check merchant and issuer requirements.`;

  if (!arrival.simple.includes(simple)) {
    const previous = legacySimple[iso];
    if (previous && arrival.simple.includes(previous)) {
      arrival.simple = arrival.simple.replace(previous, simple);
    } else {
      arrival.simple += ` ${simple}`;
    }
  }

  const paragraphs = arrival.detailed.split("\n\n");
  const mixIndex = paragraphs.findIndex((paragraph) => paragraph.startsWith("In-person card and cash:"));
  if (mixIndex < 0) {
    paragraphs.push(detailed);
    arrival.detailed = paragraphs.join("\n\n");
  } else if (paragraphs[mixIndex] !== detailed) {
    paragraphs[mixIndex] = detailed;
    arrival.detailed = paragraphs.join("\n\n");
  }

  if (!arrival.sources.some((item) => item.url === sourceUrl)) {
    arrival.sources.push({
      topic: "ECB Study on the payment attitudes of consumers in the euro area (SPACE 2024)",
      url: sourceUrl,
      lastChecked: checked
    });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added ECB card/cash payment-mix guidance for ${Object.keys(shares).length} euro-area profiles.`);