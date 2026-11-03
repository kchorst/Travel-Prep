import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const localPaymentPattern = /\b(?:PayID|Interac(?: e-Transfer)?|Pix|Alipay|WeChat Pay|Weixin Pay|QRIS|PromptPay|M-Pesa|MoMo|Easypaisa|JazzCash|GCash|Maya|Paytm|PhonePe|UPI|eSewa|Khalti|bKash|Nagad|PayNow)\b/i;

function makeSummary(destination, paragraphs) {
  const iso = destination.iso;
  const mix = paragraphs.find((paragraph) => paragraph.startsWith("In-person card and cash:"));
  const cardException = paragraphs.find((paragraph) => paragraph.startsWith("In-person card acceptance:"));
  const wallet = paragraphs.find((paragraph) => paragraph.startsWith("Phone and watch wallets:"));

  if (iso === "CU") {
    return "How to pay: FCDO says international Visa/Mastercard are not accepted in Cuba and cannot be used at ATMs; plan to use sufficient cash and confirm any prepaid-card requirements.";
  }
  if (iso === "RU") {
    return "How to pay: Foreign-issued Visa/Mastercard do not work at Russian merchants or ATMs. Check current lawful alternatives and travel advice; do not rely on these networks.";
  }
  if (mix) {
    const shares = mix.match(/cash at ([\d.]+)% and physical cards at ([\d.]+)%/);
    if (!shares) throw new Error(`Could not parse ECB payment shares for ${iso}`);
    return `How to pay: ECB SPACE 2024 reports cash at ${shares[1]}% and physical cards at ${shares[2]}% of local point-of-sale transactions. These are consumer-use shares, not a guarantee of foreign-card acceptance; carry local cash and check your card with the merchant.`;
  }
  if (cardException) {
    return `How to pay: ${cardException.replace(/^In-person card acceptance:\s*/, "")} Carry local currency as a backup.`;
  }
  const localPayment = paragraphs.find((paragraph) => localPaymentPattern.test(paragraph));
  if (localPayment) {
    return `How to pay: ${localPayment.replace(/^(?:Connectivity and payments|Connectivity and payment|Payments):\s*/, "")}`;
  }
  if (wallet) {
    const providerClaims = wallet
      .replace(/^Phone and watch wallets:\s*/, "")
      .split(" Country availability does not guarantee")[0];
    return `How to pay: ${providerClaims} Your specific issuer/card and the merchant's terminal must also support the payment; carry a physical card and local cash as backups.`;
  }
  return null;
}

let updated = 0;
for (const destination of destinations) {
  const arrival = destination.stages.arrival24h;
  const paragraphs = arrival.detailed.split("\n\n");
  if (paragraphs.some((paragraph) => paragraph.startsWith("How to pay:"))) continue;
  const summary = makeSummary(destination, paragraphs);
  if (!summary) continue;

  if (!arrival.simple.includes(summary)) arrival.simple += ` ${summary}`;

  const summaryIndex = paragraphs.findIndex((paragraph) => paragraph.startsWith("How to pay:"));
  if (summaryIndex < 0) {
    paragraphs.unshift(summary);
    updated++;
  } else if (paragraphs[summaryIndex] !== summary) {
    paragraphs[summaryIndex] = summary;
    updated++;
  }
  arrival.detailed = paragraphs.join("\n\n");
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added country-specific How to pay summaries for ${updated} profiles.`);