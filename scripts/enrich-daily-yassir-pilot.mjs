import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const destination = JSON.parse(readFileSync(dataPath, "utf8")).find((item) => item.iso === "DZ");
if (!destination) throw new Error("Missing Algeria destination record");

const mobility = destination.stages.mobility;
const mobilitySimple = "Yassir Ride is a local app-based option in Algeria; check live city coverage, fare, and pickup details before relying on it.";
const mobilityDetailed = "Ride-hailing: Yassir's Algeria site lists its ride service. Coverage, driver availability, fares, and pickup rules are city-specific; check the current app for your exact destination and compare with licensed local taxis.";
if (!mobility.simple.includes(mobilitySimple)) mobility.simple += ` ${mobilitySimple}`;
if (!mobility.detailed.includes(mobilityDetailed)) mobility.detailed += `\n\n${mobilityDetailed}`;
if (!mobility.sources.some((item) => item.url === "https://yassir.com/algeria/")) {
  mobility.sources.push({ topic: "Yassir Algeria ride service", url: "https://yassir.com/algeria/", lastChecked: checked });
}

const dailyLiving = destination.stages.dailyLiving;
const deliverySimple = "Yassir lists food and grocery delivery in Algeria; check current service and merchant coverage for your address.";
const deliveryDetailed = "Delivery and shopping: Yassir's Algeria site lists Yassir Food and Yassir Market for meals and groceries. Coverage, merchants, hours, fees, and payment options vary by city and address; confirm delivery to your accommodation before relying on it.";
if (!dailyLiving.simple.includes(deliverySimple)) dailyLiving.simple += ` ${deliverySimple}`;
if (!dailyLiving.detailed.includes(deliveryDetailed)) dailyLiving.detailed += `\n\n${deliveryDetailed}`;
if (!dailyLiving.sources.some((item) => item.url === "https://yassir.com/algeria/")) {
  dailyLiving.sources.push({ topic: "Yassir Algeria food and grocery delivery services", url: "https://yassir.com/algeria/", lastChecked: checked });
}

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const index = destinations.findIndex((item) => item.iso === "DZ");
destinations[index] = destination;
writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log("Added sourced Yassir ride and delivery guidance for Algeria.");