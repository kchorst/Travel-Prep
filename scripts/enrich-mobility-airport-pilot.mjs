import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const destination = JSON.parse(readFileSync(dataPath, "utf8")).find((item) => item.iso === "NA");
if (!destination) throw new Error("Missing Namibia destination record");

const arrival = destination.stages.arrival24h;
const previous = "Arrival transfer: WDH is outside central Windhoek. Confirm shuttle, rental-car, or hotel pickup in advance; use licensed providers and verify the pickup point.";
const replacement = "Airport transfer: Hosea Kutako International Airport (WDH) is about 45 km east of Windhoek. Namibia Airports Company lists airport shuttles, taxis, and car-rental facilities; confirm current availability, schedule, fare, and pickup arrangements before arrival.";
if (arrival.detailed.includes(previous)) {
  arrival.detailed = arrival.detailed.replace(previous, replacement);
} else if (!arrival.detailed.includes(replacement)) {
  arrival.detailed += `\n\n${replacement}`;
}

const sourceUrl = "https://www.airports.com.na/hosea-kutako-international-airportoverview/29/";
if (!arrival.sources.some((item) => item.url === sourceUrl)) {
  arrival.sources.push({
    topic: "Hosea Kutako International Airport ground transport and facilities",
    url: sourceUrl,
    lastChecked: checked
  });
}

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const index = destinations.findIndex((item) => item.iso === "NA");
destinations[index] = destination;
writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log("Updated Namibia airport-transfer guidance with the official airport source.");
