import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";

const updates = {
  CU: {
    simple: "Payments: FCDO says international Visa/Mastercard are not accepted in Cuba and cannot be used at ATMs; plan enough cash for the full stay.",
    notes: [
      "ATM access: FCDO says international cards cannot be used to withdraw cash at Cuban ATMs. Bring enough cash for planned expenses and emergencies, and exchange only through authorized channels.",
      "In-person card acceptance: FCDO reports that international Visa and Mastercard cards are no longer accepted at Cuban merchants. It lists cash and Cuban prepaid cards as available options; verify current prepaid-card requirements before relying on one.",
      "Credit/debit distinction: FCDO describes the restriction as applying to international Visa and Mastercard cards but does not distinguish credit from debit. Do not assume either foreign card type will work.",
      "Cash acceptance: FCDO lists cash as an available payment method in Cuba and advises travelers to bring enough for the full stay and emergencies. This does not establish that every merchant accepts every foreign currency.",
      "Online card use: Do not assume a foreign Visa or Mastercard will pay a Cuban merchant or service online. FCDO reports that international cards are no longer accepted in Cuba; confirm payment with a specific booking provider before departure."
    ],
    sources: [
      {
        topic: "UK FCDO Cuba travel advice: international card transactions and ATM access",
        url: "https://www.gov.uk/foreign-travel-advice/cuba/money"
      }
    ]
  },
  RU: {
    simple: "Payments: Visa and Mastercard say foreign-issued cards do not work at Russian merchants or ATMs; confirm lawful payment options and current travel advice.",
    notes: [
      "ATM access: Visa and Mastercard state that cards issued outside Russia do not work at Russian ATMs. Do not rely on a foreign-issued Visa or Mastercard for cash withdrawals.",
      "In-person card acceptance: Visa and Mastercard state that cards issued outside Russia do not work at Russian merchants. Their network statements do not distinguish credit from debit; check current lawful alternatives before travel.",
      "Credit/debit distinction: Visa and Mastercard describe the suspension by card network, not by credit-versus-debit product. Do not assume either foreign card type works for in-person purchases.",
      "Online card use: Visa states that transactions initiated with Visa cards issued outside Russia do not work within the Russian Federation. Mastercard also says foreign-issued Mastercard cards do not work at Russian merchants or ATMs. Do not rely on these networks for online purchases from Russian merchants; verify any specific payment and observe current travel restrictions."
    ],
    sources: [
      {
        topic: "Visa statement on suspension of Russia operations and transactions",
        url: "https://usa.visa.com/about-visa/newsroom/press-releases.releaseId.18871.html"
      },
      {
        topic: "Mastercard statement on suspension of Russian network services",
        url: "https://www.mastercard.com/news/press/2022/march/mastercard-statement-on-suspension-of-russian-operations/"
      },
      {
        topic: "UK FCDO Russia travel advice",
        url: "https://www.gov.uk/foreign-travel-advice/russia"
      }
    ]
  }
};

for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const arrival = destination.stages.arrival24h;
  if (!arrival.simple.includes(update.simple)) arrival.simple += ` ${update.simple}`;
  const paragraphs = arrival.detailed.split("\n\n");
  for (const note of update.notes) {
    const heading = note.slice(0, note.indexOf(":") + 1);
    const index = paragraphs.findIndex((paragraph) => paragraph.startsWith(heading));
    if (index < 0) paragraphs.push(note);
    else paragraphs[index] = note;
  }
  arrival.detailed = paragraphs.join("\n\n");
  for (const source of update.sources) {
    if (!arrival.sources.some((item) => item.url === source.url)) {
      arrival.sources.push({ ...source, lastChecked: checked });
    }
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added separate ATM, merchant, and online-card exceptions for ${Object.keys(updates).join(", ")}.`);