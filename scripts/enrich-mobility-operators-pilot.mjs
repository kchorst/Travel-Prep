import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const updates = {
  US: {
    simple: "Ride-hailing: Lyft lists service city-by-city across the United States; check the exact destination and airport pickup rules before relying on it.",
    detailed: "Ride-hailing: Lyft's official city directory lists service across many U.S. cities, but availability, driver supply, and airport pickup rules vary. Check the directory and live app for the exact destination; keep transit or a local taxi option as a backup.",
    sources: [
      { topic: "Lyft official U.S. city availability directory", url: "https://www.lyft.com/rider/cities", lastChecked: checked }
    ]
  },
  FR: {
    simple: "Ride-hailing: Uber lists services in Paris and Lyon; check the app for coverage and vehicle options elsewhere.",
    detailed: "Ride-hailing: Uber publishes active city pages for Paris and Lyon, including local rides and taxi options. Coverage, vehicle types, fares, and airport pickup rules are city-specific; check the live app and compare with public transit or licensed taxis, especially outside major urban areas.",
    sources: [
      { topic: "Uber Paris city rides and local options", url: "https://www.uber.com/global/en/r/cities/paris-idf-fr/", lastChecked: checked },
      { topic: "Uber Lyon city rides and local taxi options", url: "https://www.uber.com/global/en/r/cities/lyon-ara-fr/", lastChecked: checked }
    ]
  },
  KE: {
    simple: "YEGO lists taxi service and a recent Nairobi boda launch; SafeBoda lists SafeCar and motorcycle rides. Check exact city and pickup coverage.",
    detailed: "Ride-hailing: YEGO's Kenya site lists taxi service and links to its August 2026 Nairobi boda-boda launch. The motorcycle service is a recent, city-specific addition; do not assume it operates nationwide. SafeBoda also lists SafeCar and SafeBoda rides, plus Nairobi-area package delivery. Confirm the vehicle type, pickup point, fare, and helmet before booking.",
    sources: [
      { topic: "YEGO Kenya taxi service and passenger options", url: "https://yego.co.ke/", lastChecked: checked },
      { topic: "YEGO Kenya news page listing its Nairobi boda launch", url: "https://yego.co.ke/news", lastChecked: checked },
      { topic: "SafeBoda Kenya car, motorcycle, and package services", url: "https://www.safeboda.com/", lastChecked: checked }
    ]
  },
  UG: {
    simple: "SafeBoda lists SafeCar, motorcycle rides, and parcel delivery in Uganda; verify the current service area in the app.",
    detailed: "Ride-hailing and courier service: SafeBoda's Uganda site lists SafeCar, SafeBoda motorcycle rides, and package delivery. Confirm live vehicle availability and pickup/drop-off coverage for your exact area. Package courier service is not the same as a restaurant-ordering marketplace; check a dedicated food app for restaurant menus.",
    sources: [
      { topic: "SafeBoda Uganda car, motorcycle, and parcel services", url: "https://safeboda.com/home-ug", lastChecked: checked }
    ]
  },
  LK: {
    simple: "PickMe is a Sri Lankan ride-hailing app; check live availability, vehicle type, and fare at your pickup point.",
    detailed: "Ride-hailing: Sri Lankan platform PickMe lists ride services alongside food, market, and parcel services. Driver and vehicle availability, pickup coverage, fares, and payment options vary by location and time; check the live app and confirm the trip details before departure.",
    sources: [
      { topic: "PickMe Sri Lanka ride service", url: "https://pickme.lk/services/ride/", lastChecked: checked },
      { topic: "PickMe official Sri Lanka service overview", url: "https://pickme.lk/", lastChecked: checked }
    ]
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  const mobility = destination.stages.mobility;
  if (!mobility.simple.includes(update.simple)) mobility.simple += ` ${update.simple}`;
  if (!mobility.detailed.includes(update.detailed)) mobility.detailed += `\n\n${update.detailed}`;
  for (const item of update.sources) {
    if (!mobility.sources.some((existing) => existing.url === item.url)) mobility.sources.push(item);
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added city-scoped ride-hailing guidance for ${Object.keys(updates).join(", ")}.`);