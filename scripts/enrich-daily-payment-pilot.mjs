import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const australia = destinations.find((item) => item.iso === "AU");
if (!australia) throw new Error("Missing Australia destination record");

const dailyLiving = australia.stages.dailyLiving;
const simple = "Payment rail: PayID is part of Australian online banking and is linked to a bank account; it is not a general visitor wallet. Keep a card or cash backup.";
const detailed = "Payments: PayID uses an email address, mobile number, ABN, or other identifier linked to an account at a participating financial institution. It operates through online banking, so visitors without an eligible Australian bank account should not plan on using it. Check merchant card acceptance and keep a backup payment method.";
if (!dailyLiving.simple.includes(simple)) dailyLiving.simple += ` ${simple}`;
if (!dailyLiving.detailed.includes(detailed)) dailyLiving.detailed += `\n\n${detailed}`;
const sourceUrl = "https://www.auspayplus.com.au/solutions/payid";
if (!dailyLiving.sources.some((item) => item.url === sourceUrl)) {
  dailyLiving.sources.push({
    topic: "Australian Payments Plus official PayID service description",
    url: sourceUrl,
    lastChecked: "2026-11-02"
  });
}

const ghana = destinations.find((item) => item.iso === "GH");
if (!ghana) throw new Error("Missing Ghana destination record");
const arrival = ghana.stages.arrival24h;
const ghanaSimple = "Payments: MTN MoMo is a local mobile-money option on Ghanaian MTN numbers, and Hubtel checkout lists mobile money or bank card. Visitors should keep GHS cash and an international card backup.";
const ghanaDetailed = "Payments: MTN Ghana describes MoMo as available on a Ghanaian MTN number, while Hubtel's consumer food checkout lists mobile money or bank card. A visitor should not assume a foreign number can use local wallet services; confirm current SIM registration and wallet onboarding before relying on MoMo. Carry Ghana cedis (GHS) and an international card backup, and check acceptance at each merchant.";
if (!arrival.simple.includes(ghanaSimple)) arrival.simple += ` ${ghanaSimple}`;
if (!arrival.detailed.includes(ghanaDetailed)) arrival.detailed += `\n\n${ghanaDetailed}`;
for (const source of [
  { topic: "MTN Ghana official MoMo service and Ghanaian-number requirement", url: "https://mtn.com.gh/momo/" },
  { topic: "Hubtel Ghana consumer checkout payment methods", url: "https://hubtel.com/consumer/food" }
]) {
  if (!arrival.sources.some((item) => item.url === source.url)) {
    arrival.sources.push({ ...source, lastChecked: "2026-11-02" });
  }
}

const canada = destinations.find((item) => item.iso === "CA");
if (!canada) throw new Error("Missing Canada destination record");
const canadaArrival = canada.stages.arrival24h;
const canadaSimple = "Payments: Interac e-Transfer sends money to Canadian bank accounts; visitors without a participating Canadian account should plan on an international card or CAD cash.";
const canadaDetailed = "Payments: Interac e-Transfer is a Canadian bank-linked service for sending money to Canadian bank accounts through participating financial institutions. Visitors should not treat it as a general card or wallet option if they lack eligible Canadian banking access. Use an internationally enabled debit/credit card or Canadian-dollar cash, and check acceptance at smaller merchants.";
if (!canadaArrival.simple.includes(canadaSimple)) canadaArrival.simple += ` ${canadaSimple}`;
if (!canadaArrival.detailed.includes(canadaDetailed)) canadaArrival.detailed += `\n\n${canadaDetailed}`;
const interacSource = {
  topic: "Interac official e-Transfer description and participating financial institutions",
  url: "https://www.interac.ca/en/payments/personal/send-receive-money-with-interac-e-transfer/",
  lastChecked: "2026-11-02"
};
if (!canadaArrival.sources.some((item) => item.url === interacSource.url)) {
  canadaArrival.sources.push(interacSource);
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log("Added visitor-access payment guidance for Australia, Ghana, and Canada.");