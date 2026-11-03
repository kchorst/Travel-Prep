import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const boliviaAdvice = "https://www.gov.uk/foreign-travel-advice/bolivia";
const haitiAdvice = "https://www.gov.uk/foreign-travel-advice/haiti";
const haitiEmbassyNotice = "https://ambetatsunis.gouv.ht/missions/actualites/maec-hq-f40418ef354f98e3-avis-aux-ressortissants-haitiens-et-aux-voyageurs";
const source = (topic, url) => ({ topic, url, lastChecked: checked });
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));

function replaceSource(destination, stageName, oldUrl, replacement) {
  const stage = destination.stages[stageName];
  stage.sources = (stage.sources || []).map((item) => item.url === oldUrl ? replacement : item);
  if (!stage.sources.some((item) => item.url === replacement.url)) stage.sources.push(replacement);
}

const bolivia = destinations.find((item) => item.iso === "BO");
if (!bolivia) throw new Error("Bolivia destination record is missing");
replaceSource(bolivia, "preArrival", "https://bolivia.travel/", source("FCDO Bolivia entry and regional travel advice", boliviaAdvice));
replaceSource(bolivia, "arrival24h", "https://bolivia.travel/", source("FCDO Bolivia airport and road travel advice", boliviaAdvice));
replaceSource(bolivia, "dailyLiving", "https://bolivia.travel/", source("FCDO Bolivia health advice", `${boliviaAdvice}/health`));
replaceSource(bolivia, "socialCode", "https://bolivia.travel/", source("FCDO Bolivia local laws and safety advice", `${boliviaAdvice}/safety-and-security`));
bolivia.stages.preArrival.simple = "FCDO advises against all but essential travel to the Chapare region as of 2026-11-02. Check Bolivia's entry rules and current road/security advice before planning an itinerary.";
if (!bolivia.stages.preArrival.detailed.includes("FCDO advises against all but essential travel to Chapare")) {
  bolivia.stages.preArrival.detailed += "\n\nCurrent advisory: FCDO advises against all but essential travel to Chapare and reports a state of emergency and possible roadblocks. Never try to cross a roadblock; check current road status before travel.";
}

const haiti = destinations.find((item) => item.iso === "HT");
if (!haiti) throw new Error("Haiti destination record is missing");
const haitiSources = {
  preArrival: source("Haitian Foreign Affairs traveller-form notice", haitiEmbassyNotice),
  arrival24h: source("FCDO Haiti airport and security advice", haitiAdvice),
  mobility: source("FCDO Haiti safety and transport advice", `${haitiAdvice}/safety-and-security`),
  dailyLiving: source("FCDO Haiti health advice", `${haitiAdvice}/health`),
  socialCode: source("FCDO Haiti local laws and safety advice", `${haitiAdvice}/safety-and-security`)
};
for (const stageName of Object.keys(haitiSources)) {
  replaceSource(haiti, stageName, "https://mfa.gouv.ht/", haitiSources[stageName]);
}
haiti.stages.preArrival.simple = "FCDO advises against all travel to Haiti as of 2026-11-02. Do not treat this as a routine itinerary; verify current security, entry, and departure conditions before any travel.";
if (!haiti.stages.preArrival.detailed.includes("FCDO advises against all travel to Haiti")) {
  haiti.stages.preArrival.detailed = `Current advisory: FCDO advises against all travel to Haiti as of ${checked} because of the volatile security situation and severely limited consular support.\n\n${haiti.stages.preArrival.detailed}`;
}
haiti.stages.preArrival.detailed = haiti.stages.preArrival.detailed.replace(
  "Check Haiti's Ministry of Foreign Affairs or nearest embassy and the airline's boarding requirements.",
  "Haiti's Foreign Affairs Ministry announced that the electronic I-Kat traveller form is mandatory for people travelling to or from Haiti from 1 October 2026. Confirm current instructions, passport-specific requirements, and airline boarding rules before departure."
);
if (!haiti.stages.preArrival.sources.some((item) => item.url === `${haitiAdvice}/entry-requirements`)) {
  haiti.stages.preArrival.sources.push(source("FCDO Haiti entry requirements", `${haitiAdvice}/entry-requirements`));
}
if (!haiti.stages.preArrival.sources.some((item) => item.url === haitiAdvice)) {
  haiti.stages.preArrival.sources.push(source("FCDO Haiti all-travel warning", haitiAdvice));
}
if (!haiti.stages.arrival24h.simple.includes("FCDO advises against all travel")) {
  haiti.stages.arrival24h.simple += " FCDO advises against all travel; airport operations and local services may change rapidly.";
}

const ethiopia = destinations.find((item) => item.iso === "ET");
if (!ethiopia) throw new Error("Ethiopia destination record is missing");
replaceSource(ethiopia, "preArrival", "https://visitethiopia.travel/", source("FCDO Ethiopia regional travel advice", "https://www.gov.uk/foreign-travel-advice/ethiopia"));
replaceSource(ethiopia, "dailyLiving", "https://visitethiopia.travel/", source("FCDO Ethiopia health advice", "https://www.gov.uk/foreign-travel-advice/ethiopia/health"));
replaceSource(ethiopia, "socialCode", "https://visitethiopia.travel/", source("FCDO Ethiopia local laws and safety advice", "https://www.gov.uk/foreign-travel-advice/ethiopia/safety-and-security"));
ethiopia.stages.preArrival.simple = "Check Ethiopia's official eVisa eligibility and the latest regional travel advice before booking. FCDO warns against travel to several regions and border zones; confirm your exact route.";
if (!ethiopia.stages.preArrival.detailed.includes("FCDO advises against all travel to several regions")) {
  ethiopia.stages.preArrival.detailed += "\n\nRegional advisory: FCDO advises against all travel to several regions and border areas and against all but essential travel to parts of Afar and Somali regions. Flights across northern Ethiopia may be suspended or cancelled; verify current route advice and operations.";
}

const egypt = destinations.find((item) => item.iso === "EG");
if (!egypt) throw new Error("Egypt destination record is missing");
replaceSource(egypt, "preArrival", "https://www.egypt.travel/", source("Egypt Tourism Authority official visitor portal", "https://www.experienceegypt.eg/en"));
replaceSource(egypt, "dailyLiving", "https://www.egypt.travel/", source("Egypt Tourism Authority official visitor portal", "https://www.experienceegypt.eg/en"));
replaceSource(egypt, "socialCode", "https://www.egypt.travel/", source("Egypt Tourism Authority official visitor portal", "https://www.experienceegypt.eg/en"));

const romania = destinations.find((item) => item.iso === "RO");
if (!romania) throw new Error("Romania destination record is missing");
replaceSource(romania, "preArrival", "https://romania.travel/", source("FCDO Romania entry and travel advice", "https://www.gov.uk/foreign-travel-advice/romania"));
replaceSource(romania, "dailyLiving", "https://romania.travel/", source("FCDO Romania health guidance", "https://www.gov.uk/foreign-travel-advice/romania/health"));
replaceSource(romania, "socialCode", "https://romania.travel/", source("FCDO Romania local laws and safety advice", "https://www.gov.uk/foreign-travel-advice/romania/safety-and-security"));

const northMacedonia = destinations.find((item) => item.iso === "MK");
if (!northMacedonia) throw new Error("North Macedonia destination record is missing");
replaceSource(northMacedonia, "preArrival", "https://skp.airports.com.mk/en-EN/", source("Skopje International Airport passenger transport guide", "https://skp.airports.com.mk/en-EN/passenger-guide/to-from-the-airport"));

for (const destination of destinations) {
  for (const stage of Object.values(destination.stages)) {
    for (const item of stage.sources || []) {
      if (item.url === "https://bulgariatravel.org/en/") item.url = "https://visitbulgaria.com/";
      if (item.url === "https://www.visitstkitts.com/") item.url = "https://visitstkitts.kn/";
    }
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log("Repaired audited Bolivia, Haiti, Ethiopia, Egypt, Romania, North Macedonia, Bulgaria, and St Kitts references.");