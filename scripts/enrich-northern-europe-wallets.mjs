import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";
const countries = ["DK", "EE", "FI", "IS", "IE", "LV", "LT", "NO", "SE", "GB"];
const existingPayments = "Connectivity and payments: Confirm roaming or local SIM registration, coverage, and payment requirements with your provider. Keep offline copies of addresses and tickets; retain a backup payment method and local cash because card and ATM access varies by city and provider.";
const previousWallet = (country) => `Phone and watch wallets: Google Wallet and Apple Pay list tap-to-pay support in ${country}, but your card must also be supported by the wallet and its issuer. A phone or watch payment still depends on the merchant accepting contactless and your card network. If you use Samsung Wallet, confirm that your specific card and device are supported by your issuer before departure. Keep a physical Visa/Mastercard enabled for international use and a modest local-currency cash backup; acceptance varies by merchant and location.`;
const appleCountries = "https://support.apple.com/en-us/102775";
const appleIssuers = "https://support.apple.com/en-us/HT206637";

for (const iso of countries) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const arrival = destination.stages.arrival24h;
  const simple = `Payments: Google Wallet and Apple Pay list tap-to-pay support in ${destination.country} for eligible cards. Keep an internationally enabled physical Visa/Mastercard and modest local cash; check Samsung Wallet with your issuer.`;
  const detailed = `${existingPayments}\n\n${previousWallet(destination.country)}`;

  if (!arrival.simple.includes(simple)) arrival.simple += ` ${simple}`;
  const hasWalletNote = arrival.detailed.split("\n\n").some((paragraph) => paragraph.startsWith("Phone and watch wallets:"));
  if (!arrival.detailed.includes(detailed) && !hasWalletNote) {
    const previous = arrival.detailed.includes(existingPayments) ? existingPayments : previousWallet(destination.country);
    if (!arrival.detailed.includes(previous)) {
      throw new Error(`Expected payment guidance not found for ${iso}`);
    }
    arrival.detailed = arrival.detailed.replace(previous, detailed);
  }

  const sources = [
    {
      topic: `Google Wallet country-specific tap-to-pay support for ${destination.country}`,
      url: `https://support.google.com/wallet/answer/12060037?hl=en&co=GENIE.CountryCode%3D${iso}`
    },
    {
      topic: "Apple Pay supported regions and participating card issuers",
      url: appleCountries
    },
    {
      topic: "Apple Pay participating banks and card issuers in Europe",
      url: appleIssuers
    }
  ];

  for (const source of sources) {
    if (!arrival.sources.some((item) => item.url === source.url)) {
      arrival.sources.push({ ...source, lastChecked: checked });
    }
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added visitor phone-wallet guidance for ${countries.length} Northern European profiles.`);