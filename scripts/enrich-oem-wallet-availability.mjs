import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";

const providers = {
  apple: new Set("EG MU MA ZA AU CN JP MY MN NZ PH SG KR TW VN AL AD AM AT AZ BY BE BA BG HR CY CZ DK EE FI FR GE DE GR HU IS IE IT KZ KG LV LI LT LU MT MD MC ME NL MK NO PL PT RO RS SK SI ES SE CH TJ UA GB UZ VA AR BR CL CO CR DO EC SV GT HN MX PA PY PE BS UY CA US BH IN IL JO KW OM PS QA SA AE".split(" ")),
  google: new Set("AL AR AM AU AT AZ BE BA BR BG CA CL CO CR HR CY CZ DK EC EE FI FR GE DE GR HU IS IE IL IT JP KZ KG KW LV LI LT LU MY MT MX MD ME NL NZ MK NO PL PT QA RO RU RS SG SK SI ZA ES SE CH TW TH UA AE GB US VN".split(" ")),
  samsung: new Set("AU BH BR CA CN DK FI FR DE IN IT KZ KW MY MX NO OM QA RU SG ZA KR ES SE CH TW TH AE GB US VN".split(" ")),
  garmin: new Set("AR AU AT AZ BY BE BZ BG CA CL CO HR CY CZ DK EE FI FR GE DE GR HU IS IE IL IT JP KZ KW LV LI LT LU MT MX MD NL NZ NO PL PT RO RU SG SK SI ZA ES SE CH TW TH UA AE GB US".split(" ")),
  huawei: new Set("AT DE IT MY PK RU SG ZA TH".split(" ")),
  xiaomi: new Set(["CN"])
};

const appleCountriesUrl = "https://support.apple.com/en-us/102775";
const appleIssuersUrl = "https://support.apple.com/en-us/109516";
const nfcwUrl = "https://www.nfcw.com/oem-pay-availability/";
const garminBanksUrl = "https://www.garmin.com/en-GB/garminpay/banks/";

function walletNote(destination) {
  const iso = destination.iso;
  const confirmed = [];
  const directoryListed = [];

  if (providers.apple.has(iso)) confirmed.push("Apple lists Apple Pay as available");
  if (providers.google.has(iso)) confirmed.push("Google lists Wallet tap-to-pay support");
  if (providers.samsung.has(iso)) directoryListed.push("Samsung Wallet");
  if (providers.garmin.has(iso)) directoryListed.push("Garmin Pay");
  if (providers.huawei.has(iso)) directoryListed.push("Huawei Pay");
  if (providers.xiaomi.has(iso)) directoryListed.push("Xiaomi Mi Pay");
  if (!confirmed.length && !directoryListed.length) return null;

  const confirmedText = confirmed.length ? `${confirmed.join("; ")} in ${destination.country}.` : "";
  const directoryText = directoryListed.length
    ? ` NFCW also lists ${directoryListed.join(", ")} in this market; confirm current support with the provider.`
    : "";
  return `Phone and watch wallets: ${confirmedText}${directoryText} Country availability does not guarantee that your specific card, issuer, device, or watch is eligible. The merchant must also accept contactless on your card network. Keep a physical Visa/Mastercard and modest local-currency cash as backups.`;
}

function sourcesFor(destination) {
  const iso = destination.iso;
  const sources = [];
  if (providers.apple.has(iso)) {
    sources.push(
      { topic: "Apple Pay supported countries and regions", url: appleCountriesUrl },
      { topic: "Apple Pay participating banks and card issuers", url: appleIssuersUrl }
    );
  }
  if (providers.google.has(iso)) {
    sources.push({
      topic: `Google Wallet country-specific tap-to-pay support for ${destination.country}`,
      url: `https://support.google.com/wallet/answer/12060037?hl=en&co=GENIE.CountryCode%3D${iso}`
    });
  }
  if (providers.samsung.has(iso) || providers.garmin.has(iso) || providers.huawei.has(iso) || providers.xiaomi.has(iso)) {
    sources.push({ topic: "NFCW OEM Pay country availability directory", url: nfcwUrl });
  }
  if (providers.garmin.has(iso)) {
    sources.push({ topic: "Garmin Pay participating banks and cards", url: garminBanksUrl });
  }
  return sources;
}

let updated = 0;
for (const destination of destinations) {
  const note = walletNote(destination);
  if (!note) continue;

  const arrival = destination.stages.arrival24h;
  const paragraphs = arrival.detailed.split("\n\n");
  const walletIndex = paragraphs.findIndex((paragraph) => paragraph.startsWith("Phone and watch wallets:"));
  if (walletIndex < 0) {
    paragraphs.push(note);
    arrival.detailed = paragraphs.join("\n\n");
    updated++;
  } else if (paragraphs[walletIndex] !== note) {
    paragraphs[walletIndex] = note;
    arrival.detailed = paragraphs.join("\n\n");
    updated++;
  }

  for (const source of sourcesFor(destination)) {
    if (!arrival.sources.some((item) => item.url === source.url)) {
      arrival.sources.push({ ...source, lastChecked: checked });
    }
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Updated OEM wallet availability guidance for ${updated} profiles.`);
console.log(`Apple: ${[...providers.apple].length}; Google: ${[...providers.google].length}; Samsung: ${[...providers.samsung].length}; Garmin: ${[...providers.garmin].length}; Huawei: ${[...providers.huawei].length}; Xiaomi: ${[...providers.xiaomi].length} roster profiles.`);