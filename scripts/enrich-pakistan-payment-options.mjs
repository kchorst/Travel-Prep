import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";
const destination = destinations.find((item) => item.iso === "PK");
if (!destination) throw new Error("Missing Pakistan destination profile");

const summary = "How to pay: Carry PKR cash for small merchants; a travel guide reports major credit cards at larger hotels, restaurants, and shops. Foreign debit, contactless, and online-card acceptance need confirmation.";
const notes = [
  "How to pay: Carry Pakistani rupees in small notes for markets and small merchants. A travel guide reports major credit cards at larger hotels, upscale restaurants, and shops, while many small businesses may not accept cards. Do not assume foreign debit, online card, or contactless acceptance; confirm at the venue or checkout. Easypaisa and JazzCash are domestic wallet services, but visitor registration is not established by the sources checked.",
  "Credit/debit distinction: The cited travel guidance discusses major credit cards but does not establish whether foreign-issued debit cards are accepted on the same terms. Confirm your card type and network with the venue and issuer before relying on it.",
  "Cash acceptance: Use Pakistani rupees (PKR) as the reliable fallback, especially at small shops and markets. Keep small notes; the guide notes that merchants and drivers may not have change for large bills.",
  "Merchant NFC acceptance: The sources reviewed do not establish countrywide contactless-terminal acceptance for foreign cards. Do not infer NFC acceptance from a phone wallet alone; confirm that the merchant accepts contactless on your card network.",
  "Online card use: The sources reviewed do not establish countrywide acceptance of foreign-issued cards for online purchases. Check the specific airline, hotel, or booking checkout and your issuer before relying on a card.",
  "Local wallets: Easypaisa and JazzCash are domestic payment services. Their provider sites describe local payment products but do not establish that overseas visitors can register; confirm eligibility with the provider before relying on either service."
];
const sources = [
  {
    topic: "Pakistan travel guide: money, card acceptance, and cash use",
    url: "https://en.wikivoyage.org/wiki/Pakistan#Money"
  },
  {
    topic: "UK FCDO Pakistan travel advice: credit-card fraud warning",
    url: "https://www.gov.uk/foreign-travel-advice/pakistan/safety-and-security"
  },
  {
    topic: "Easypaisa official consumer payment services",
    url: "https://easypaisa.com.pk/"
  },
  {
    topic: "JazzCash official consumer payment services",
    url: "https://www.jazzcash.com.pk/"
  }
];

const arrival = destination.stages.arrival24h;
if (!arrival.simple.includes(summary)) arrival.simple += ` ${summary}`;

const paragraphs = arrival.detailed.split("\n\n");
for (const note of notes) {
  const heading = note.slice(0, note.indexOf(":") + 1);
  const index = paragraphs.findIndex((paragraph) => paragraph.startsWith(heading));
  if (index < 0) paragraphs.push(note);
  else paragraphs[index] = note;
}
arrival.detailed = paragraphs.join("\n\n");

for (const source of sources) {
  if (!arrival.sources.some((item) => item.url === source.url)) {
    arrival.sources.push({ ...source, lastChecked: checked });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log("Added a visitor-facing Pakistan payment guide with channel-specific caveats.");