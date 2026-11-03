import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const source = (topic, url) => ({ topic, url, lastChecked: checked });
const updates = {
  BG: {
    esim: "eSIM options: A1 Bulgaria documents eSIM for compatible devices, while Airalo lists prepaid Bulgaria travel-data plans using Vivacom. A1 activation may require an eligible A1 plan; check compatibility, coverage, and whether the travel plan is data-only before relying on it.",
    broadband: "Ookla Speedtest Global Index publishes current mobile and fixed broadband medians for Bulgaria. Its results use a rolling three-month window and are updated monthly; check the live country page for the latest figures. Numeric results are not reproduced here.",
    sources: [
      source("A1 Bulgaria eSIM support and eligibility", "https://www.a1.bg/esim"),
      source("Airalo Bulgaria travel eSIM; network and current plan", "https://www.airalo.com/bulgaria-esim"),
      source("Ookla Speedtest Global Index: current Bulgaria mobile and fixed results", "https://www.speedtest.net/global-index/bulgaria"),
      source("Ookla Speedtest Global Index methodology and reporting period", "https://www.speedtest.net/global-index/about")
    ]
  },
  CN: {
    esim: "Travel eSIM: Airalo lists China data eSIM plans on China Unicom. Plan coverage, device compatibility, activation, and included services can change; confirm the current package before purchase. An eSIM does not guarantee access to websites or apps restricted by local rules.",
    broadband: "Ookla Speedtest Global Index publishes current mobile and fixed broadband medians for China. Its results use a rolling three-month window and are updated monthly; check the live country page for the latest figures. Numeric results are not reproduced here.",
    sources: [
      source("Airalo China travel eSIM; network and current plan", "https://www.airalo.com/china-esim"),
      source("Ookla Speedtest Global Index: current China mobile and fixed results", "https://www.speedtest.net/global-index/china"),
      source("Ookla Speedtest Global Index methodology and reporting period", "https://www.speedtest.net/global-index/about")
    ]
  },
  HT: {
    esim: "Travel eSIM: Airalo lists a Haiti data eSIM using Digicel. Coverage and service can be disrupted, and an eSIM is not a safety or emergency communication guarantee. FCDO advises against all travel to Haiti; do not use connectivity availability as a reason to travel.",
    broadband: "Check the Ookla Speedtest Global Index for current Haiti mobile and fixed broadband reporting; the country page may not publish a result for every connection type. Its results use a rolling three-month window and are updated monthly. Numeric results are not reproduced here. FCDO advises against all travel to Haiti.",
    sources: [
      source("Airalo Haiti travel eSIM; network and current plan", "https://www.airalo.com/haiti-esim"),
      source("FCDO Haiti all-travel warning", "https://www.gov.uk/foreign-travel-advice/haiti"),
      source("Ookla Speedtest Global Index: current Haiti mobile and fixed results where reported", "https://www.speedtest.net/global-index/haiti"),
      source("Ookla Speedtest Global Index methodology and reporting period", "https://www.speedtest.net/global-index/about")
    ]
  },
  PL: {
    esim: "eSIM options: Orange Poland supports eSIM on compatible devices; Orange’s terms distinguish subscription and Orange Flex offers. Airalo also lists prepaid Poland travel-data plans on Orange. Confirm eligibility, device compatibility, coverage, and whether the plan is data-only.",
    broadband: "Ookla Speedtest Global Index publishes current mobile and fixed broadband medians for Poland. Its results use a rolling three-month window and are updated monthly; check the live country page for the latest figures. Numeric results are not reproduced here.",
    money: "Mobile payments: BLIK works through participating Polish bank apps and uses a short-lived payment code. Visitors generally need access to a participating bank app; keep a card or cash backup.",
    sources: [
      source("Orange Poland eSIM eligibility and activation", "https://www.orange.pl/esim"),
      source("Airalo Poland travel eSIM; network and current plan", "https://www.airalo.com/poland-esim"),
      source("BLIK official first steps and participating-bank requirement", "https://www.blik.com/en/what-is-blik"),
      source("Ookla Speedtest Global Index: current Poland mobile and fixed results", "https://www.speedtest.net/global-index/poland"),
      source("Ookla Speedtest Global Index methodology and reporting period", "https://www.speedtest.net/global-index/about")
    ]
  },
  KH: {
    esim: "Cellcard offers eSIM purchase through its app or stores. Its registration terms say foreign customers must present a valid passport and visa; verify how this applies to your entry status, confirm device compatibility, and check current plans before relying on a local eSIM.",
    sources: [
      source("Cellcard eSIM purchase, device support, and foreign-customer registration terms", "https://www.cellcard.com.kh/en/get-sim"),
      source("Cellcard current tourist SIM plans", "https://www.cellcard.com.kh/en/tourist-sim")
    ]
  },
  FR: {
    esim: "Orange Travel lists prepaid eSIM plans for France on partner networks. Check your device compatibility, plan validity, and included data or calls; download over Wi-Fi before departure if possible and activate according to the plan instructions.",
    sources: [
      source("Orange Travel France eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/france"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  US: {
    esim: "Orange Travel lists U.S. eSIM plans and partner networks including AT&T, T-Mobile, and Verizon; the available network can depend on the plan and location. Check device compatibility, coverage for rural or national-park routes, and the plan's data, call, and SMS allowances.",
    sources: [
      source("Orange Travel United States eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/united-states"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  IT: {
    esim: "Orange Travel lists Italy eSIM plans with partner networks including iliad, TIM, Vodafone, and WindTre; the available network can depend on the plan and location. Check device compatibility, rural coverage for regional trips, and included data, calls, and SMS.",
    sources: [
      source("Orange Travel Italy eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/italy"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  ES: {
    esim: "Orange Travel lists Spain eSIM plans with partner networks including Orange, Movistar, Vodafone, and Yoigo; the available network can depend on the plan and location. Check device compatibility, island or rural coverage, and included data, calls, and SMS.",
    sources: [
      source("Orange Travel Spain eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/spain"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  JP: {
    esim: "Orange Travel lists Japan eSIM plans with partner networks including KDDI, NTT DOCOMO, Rakuten, and SoftBank; the available network can depend on the plan and location. Check device compatibility and coverage for mountain, island, or rural itineraries, plus included data, calls, and SMS.",
    sources: [
      source("Orange Travel Japan eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/japan"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  MX: {
    esim: "Orange Travel lists Mexico eSIM plans with partner networks including AT&T, Movistar, and Telcel; the available network can depend on the plan and location. Check compatibility, regional coverage for border or rural routes, and included data, calls, and SMS.",
    sources: [
      source("Orange Travel Mexico eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/mexico"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  BR: {
    esim: "Orange Travel lists Brazil eSIM plans with partner networks including Claro, TIM, and Vivo; the available network can depend on the plan and location. Check compatibility and coverage for long-distance or remote routes, and confirm the plan's data, calls, and SMS.",
    sources: [
      source("Orange Travel Brazil eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/brazil"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  ID: {
    esim: "Orange Travel lists Indonesia eSIM plans with partner networks including Telkomsel, Indosat Ooredoo, and XL Axiata; the available network can depend on the plan and location. Check compatibility and coverage for inter-island travel, and confirm the plan's data, calls, and SMS.",
    sources: [
      source("Orange Travel Indonesia eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/indonesia"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  TH: {
    esim: "Orange Travel lists Thailand eSIM plans and partner networks, including AWN, National Telecom, True Move, and dtac TriNet. Network selection can depend on the plan and location; check compatibility, island or rural coverage, and included data, calls, and SMS.",
    sources: [
      source("Orange Travel Thailand eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/thailand"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  IN: {
    esim: "Orange Travel lists India eSIM plans. Partner coverage and plan features vary; consult the live country page for the current network list, confirm device compatibility, and check data, calls, and SMS before purchase.",
    sources: [
      source("Orange Travel India eSIM plans and current network information", "https://travel.orange.com/en/buy-a-sim/offers/india"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  TR: {
    esim: "Orange Travel lists Turkey eSIM plans with partner networks including Turkcell, Türk Telekom, and Vodafone; the available network can depend on the plan and location. Check compatibility, coverage for regional routes, and included data, calls, and SMS.",
    sources: [
      source("Orange Travel Turkey eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/turkey"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  EG: {
    esim: "Orange Travel lists Egypt eSIM plans with partner networks including Orange, E&, and Vodafone; the available network can depend on the plan and location. Check compatibility and coverage for desert, resort, or regional itineraries, plus included data, calls, and SMS.",
    sources: [
      source("Orange Travel Egypt eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/egypt"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  },
  ZA: {
    esim: "Orange Travel lists South Africa eSIM plans with partner networks including Cell C, MTN, and Vodacom; the available network can depend on the plan and location. Check compatibility and coverage for rural or safari routes, and confirm included data, calls, and SMS.",
    sources: [
      source("Orange Travel South Africa eSIM plans and partner networks", "https://travel.orange.com/en/buy-a-sim/offers/south-africa"),
      source("Orange Travel compatible-device list and eSIM guidance", "https://travel.orange.com/en/compatible-phones")
    ]
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing connectivity pilot destination: ${iso}`);
  const arrival = destination.stages.arrival24h;
  const esimParagraph = `eSIM availability: ${update.esim}`;
  const paragraphs = arrival.detailed.split("\n\n").filter((paragraph) =>
    paragraph !== update.esim && paragraph !== esimParagraph
  );
  arrival.detailed = `${paragraphs.join("\n\n")}\n\n${esimParagraph}`.trim();
  arrival.detailed = arrival.detailed.replace(/\n\nBroadband benchmark: Ookla Speedtest Global Index, September 2026[^\n]*/g, "");
  if (update.broadband && !arrival.detailed.includes("Broadband benchmark access:")) {
    arrival.detailed += `\n\nBroadband benchmark access: ${update.broadband}`;
  }
  if (update.money && !arrival.detailed.includes("Mobile payments: BLIK")) {
    arrival.detailed += `\n\n${update.money}`;
  }
  const simpleClause = `${update.esim.split(".")[0]}.`;
  const escapedClause = simpleClause.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let retainedSimpleClause = false;
  arrival.simple = arrival.simple.replace(new RegExp(escapedClause, "g"), () => {
    if (retainedSimpleClause) return "";
    retainedSimpleClause = true;
    return simpleClause;
  }).replace(/\s{2,}/g, " ").trim();
  if (!retainedSimpleClause) arrival.simple = `${arrival.simple} ${simpleClause}`.trim();
  for (const item of update.sources) {
    if (!arrival.sources.some((existing) => existing.url === item.url)) arrival.sources.push(item);
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added eSIM guidance and licensed broadband benchmark links for ${Object.keys(updates).join(", ")}.`);