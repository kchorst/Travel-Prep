import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const destinationsPath = path.join(root, "data", "destinations.json");
const electricalPath = path.join(root, "data", "electrical-standards.json");
const checked = "2026-11-02";
const source = (topic, url) => ({ topic, url, lastChecked: checked });
const stage = (simple, paragraphs, sources) => ({ simple, detailed: paragraphs.join("\n\n"), sources });
const plugs = (slug) => source("Electrical standards and socket types", `https://www.power-plugs-sockets.com/${slug}/`);

const updates = {
  AR: {
    preArrival: stage(
      "Check Argentina's official entry rules for your passport before booking. Buenos Aires is a common gateway, but Patagonia, the Andes, and the north require substantial onward travel and different seasonal packing.",
      [
        "Flight routing: Buenos Aires is served by Ezeiza (EZE) and Aeroparque (AEP); check which airport your international and domestic flights use before booking a connection. Córdoba, Mendoza, Bariloche, and other regional gateways can reduce backtracking on longer trips.",
        "Entry: Visa and permitted-stay requirements depend on nationality and travel purpose. Check Argentina's National Directorate of Migration tourist guidance and confirm any required documents with the responsible consulate before departure.",
        "Climate and planning: Argentina spans subtropical north, temperate central regions, high Andes, and cold southern Patagonia. Seasons are opposite the Northern Hemisphere; check the forecast for each region and allow extra time for long domestic journeys."
      ],
      [source("Argentina National Directorate of Migration tourist requirements", "https://www.argentina.gob.ar/migraciones/turistas"), source("Visit Argentina trip planning", "https://www.argentina.travel/en/plan-your-trip"), source("Visit Argentina", "https://www.argentina.travel/en")]
    ),
    arrival24h: stage(
      "Argentina uses 220 V / 50 Hz Type C and I outlets and the Argentine peso (ARS). Confirm which Buenos Aires airport you arrive at, set up mobile data, and keep more than one payment option.",
      [
        "Power: Argentina uses 220 V / 50 Hz electricity and Type C and I sockets. Check device input labels and the lodging outlet; a plug adapter does not convert voltage.",
        "Connectivity and payment: Check roaming or local SIM/eSIM options and identity requirements before relying on mobile data. ARS cash is useful for small purchases; card acceptance and exchange practices can vary, so review the amount and currency shown at payment.",
        "Airport transfer: Ezeiza and Aeroparque are separate airports with different city connections. Use official airport or city transport information, confirm the terminal and pickup point, and allow generous time if transferring between airports."
      ],
      [plugs("argentina"), source("Buenos Aires Subte routes, service and fares", "https://buenosaires.gob.ar/subte"), source("Argentina SUBE transit card", "https://www.argentina.gob.ar/sube")]
    ),
    mobility: stage(
      "Buenos Aires has Subte, buses, and commuter rail; other cities have their own systems. For intercity travel, compare flights, long-distance coaches, and rail routes, checking the exact terminal and current timetable.",
      [
        "Buenos Aires: The Subte and Premetro connect central corridors; buses and commuter trains extend coverage. Check current service status and fare/payment rules, and allow extra time during disruptions or peak periods.",
        "Regional travel: Long-distance coaches and domestic flights serve different corridors; rail is available on selected routes. Compare total journey time, station or airport location, baggage rules, and overnight travel conditions before booking.",
        "Local trips: Licensed taxis and app-based services operate in major cities, with availability varying elsewhere. Confirm the vehicle and fare before departure. In high-altitude or remote areas, check road and weather conditions before setting out."
      ],
      [source("Buenos Aires Subte", "https://buenosaires.gob.ar/subte"), source("Argentina Ministry of Transport", "https://www.argentina.gob.ar/transporte"), source("Argentina National Directorate of Migration travel information", "https://www.argentina.gob.ar/migraciones")]
    ),
    dailyLiving: stage(
      "Delivery, pharmacy hours, and water guidance vary by city and address. Use ARS for everyday purchases, check the exact delivery zone, and ask locally about tap water and medication access.",
      [
        "Food and shopping: Delivery services are concentrated in larger cities; enter the full address and confirm phone and payment requirements before depending on an app. In smaller towns, ask your accommodation about shops and opening hours.",
        "Health and water: Tap-water guidance can vary by locality and building. Ask your accommodation or local provider if unsure. Carry essential medication in original packaging and verify import rules and pharmacy availability for remote stops.",
        "Payments and dining: ARS is the local currency. Cards are common in larger visitor-facing businesses, but keep a backup payment method and some cash. Check menus and receipts for service charges; tipping practices vary by venue."
      ],
      [source("Argentina Ministry of Health", "https://www.argentina.gob.ar/salud"), source("Visit Argentina trip planning", "https://www.argentina.travel/en/plan-your-trip")]
    ),
    socialCode: stage(
      "Greet people politely and follow the host's lead on home visits and meals. Pet access differs by venue; use local rules for animals and wildlife. Hofstede-style scores are comparison tools, not predictions about individuals.",
      [
        "Gift-giving and homes: For a home invitation, ask whether bringing something is appropriate and follow the host's cues about shoes, meal timing, and photographs. Customs vary by household and region; avoid assuming a flower or gift taboo applies everywhere.",
        "Dog culture: Dogs are visible in many urban settings, but access to transit, restaurants, parks, and accommodation depends on local rules and the individual venue. Check the policy before bringing a dog; keep dogs under control around people and wildlife.",
        "Cat culture: Cats may be kept as household pets or encountered in public spaces. Do not feed or handle an unfamiliar animal without the owner's or local caretaker's permission; check accommodation rules for visiting pets.",
        "Bird culture: Native birds and other wildlife are not pets. Do not feed, capture, or remove wild birds, and follow posted rules in parks and protected areas. For pet-bird travel or import, check current animal-health and wildlife requirements with the relevant authorities.",
        "Hofstede dimensions: The Culture Factor reports Argentina's power-distance score as 49. The broader framework also compares individualism, motivation toward achievement and success, uncertainty avoidance, long-term orientation, and indulgence. These are population-level comparisons, not etiquette rules; regional, class, generational, and individual differences matter more in a specific interaction."
      ],
      [source("The Culture Factor country comparison: Argentina", "https://www.theculturefactor.com/country-comparison-tool?countries=argentina"), source("Argentina tourism information", "https://www.argentina.travel/en"), source("Argentina SENASA animal health", "https://www.argentina.gob.ar/senasa")]
    )
  },
  BO: {
    preArrival: stage(
      "FCDO advises against all but essential travel to the Chapare region as of 2026-11-02. Check Bolivia's entry rules and current road/security advice before planning any itinerary.",
      [
        "Flight routing: La Paz (LPB) and Santa Cruz (VVI) are important international gateways; Sucre (SRE) has more limited connections. Compare the arrival airport with your destination and account for domestic transfers and high-altitude adjustment time.",
        "Entry and safety: Visa categories depend on nationality, purpose, and length of stay; confirm them with Bolivia's Dirección General de Migración. FCDO advises against all but essential travel to Chapare and reports a state of emergency and possible roadblocks. Never try to cross a roadblock; check current road status before travel.",
        "Climate and planning: Altitude, weather, and travel times vary sharply between the Altiplano, valleys, and lowlands. Plan gradual activity after arriving at altitude, check seasonal road conditions, and carry layers for large day-to-night temperature changes."
      ],
      [source("Bolivia Dirección General de Migración", "https://migracion.gob.bo/"), source("FCDO Bolivia travel and regional-risk advice", "https://www.gov.uk/foreign-travel-advice/bolivia"), source("Bolivian Highway Administrator road updates", "https://www.abc.gob.bo/")]
    ),
    arrival24h: stage(
      "Bolivia uses Type A and C outlets; supply may be 115 or 230 V at 50 Hz, so check the lodging and device label. Keep bolivianos (BOB) cash and arrange transport with altitude and airport location in mind.",
      [
        "Power: Type A and C sockets are reported, with 115 / 230 V supplies at 50 Hz. Confirm the exact supply at your accommodation and check that devices support it; plug adapters do not convert voltage.",
        "Connectivity and payment: Mobile coverage and card acceptance are more reliable in major cities than on remote routes. Check roaming or local SIM options and keep BOB cash for small businesses, markets, and transport.",
        "Airport transfer: El Alto International Airport is at high altitude above La Paz. Confirm the transfer destination and fare before leaving, use established transport, and allow time to acclimatize rather than beginning strenuous activities immediately."
      ],
      [plugs("bolivia"), source("FCDO Bolivia airport and road travel advice", "https://www.gov.uk/foreign-travel-advice/bolivia"), source("Bolivian Highway Administrator travel notices", "https://www.abc.gob.bo/")]
    ),
    mobility: stage(
      "La Paz and El Alto use buses, minibuses, and Mi Teleférico cable cars; other cities rely on their own operators. Road closures and weather can disrupt intercity trips, so verify routes shortly before departure.",
      [
        "La Paz and El Alto: Mi Teleférico connects parts of the metropolitan area by cable car; buses and shared minibuses serve other corridors. Confirm station, operating hours, fares, and route changes locally.",
        "Intercity travel: Coaches and domestic flights connect major destinations. Road journeys can be affected by weather, maintenance, demonstrations, or closures; check official road notices and confirm the departure terminal with the operator.",
        "Local trips: Taxi and app availability varies by city. Agree the fare or confirm the in-app price and destination. Mountain roads, altitude, and limited lighting can make travel slower than expected."
      ],
      [source("Mi Teleférico", "https://www.miteleferico.bo/"), source("Bolivian Highway Administrator road status", "https://www.abc.gob.bo/"), source("Bolivia Ministry of Public Works, Services and Housing", "https://www.oopp.gob.bo/")]
    ),
    dailyLiving: stage(
      "Carry BOB cash for markets and smaller businesses; delivery and card services are city-dependent. Ask locally about drinking water and pharmacy access, especially before travelling outside major towns.",
      [
        "Food and shopping: App delivery and grocery services are concentrated in larger urban areas. Confirm the exact address, phone, and payment requirements; in smaller towns, ask your accommodation about local shops and meal options.",
        "Health and water: Do not assume tap water is suitable for drinking everywhere. Follow current local or accommodation guidance and use sealed or properly treated water if uncertain. Carry essential medicines and prescriptions, since pharmacy stock and opening hours vary.",
        "Payments and daily routines: BOB is the local currency. Cash is useful for markets, small shops, and local transport; check bank-card and ATM access before remote travel. Ask about ingredients and confirm prices before ordering or purchasing."
      ],
      [source("Bolivia Ministry of Health", "https://www.minsalud.gob.bo/"), source("FCDO Bolivia health advice", "https://www.gov.uk/foreign-travel-advice/bolivia/health"), source("Bolivian Highway Administrator", "https://www.abc.gob.bo/")]
    ),
    socialCode: stage(
      "Bolivia is culturally and linguistically diverse; ask how people prefer to be addressed and follow local guidance at community and religious sites. Pet and wildlife rules vary. Hofstede dimensions are broad comparisons, not personal predictions.",
      [
        "Gift-giving and homes: Ask whether a small gift is welcome and follow the host's lead on shoes, meals, and photographs. Practices differ among households and communities; do not assume one national rule.",
        "Dog culture: Dogs may be household pets or present in public spaces; expectations vary between neighborhoods and rural communities. Check venue and transport rules before visiting with a dog, and do not approach an unfamiliar animal without permission.",
        "Cat culture: Household cats and free-roaming cats may be encountered, but local attitudes and accommodation policies differ. Avoid feeding or handling unfamiliar cats unless an owner or caretaker invites you to.",
        "Bird culture: Bolivia has diverse native birdlife. Treat wild birds as wildlife: do not feed, capture, buy, or remove them, and observe protected-area guidance. Check official animal-health and wildlife rules before transporting a pet bird.",
        "Hofstede dimensions: The Culture Factor reports Bolivia's power-distance score as 78, a high score within its comparison framework. It also names individualism, motivation toward achievement and success, uncertainty avoidance, long-term orientation, and indulgence as comparison dimensions. Treat these as population-level research lenses, not a script for how an individual or Indigenous community will behave."
      ],
      [source("The Culture Factor country comparison: Bolivia", "https://www.theculturefactor.com/country-comparison-tool?countries=bolivia"), source("FCDO Bolivia local laws and safety advice", "https://www.gov.uk/foreign-travel-advice/bolivia/safety-and-security"), source("Bolivia Dirección General de Migración", "https://migracion.gob.bo/")]
    )
  },
  CL: {
    preArrival: stage(
      "Check Chile's temporary-stay requirements for your passport before booking. Santiago is the main international gateway; the country's length and regional climate range make onward routing and seasonal gear important.",
      [
        "Flight routing: Santiago (SCL) is the main international gateway. For northern deserts, the central coast, Patagonia, and Rapa Nui, compare domestic flights and onward ground transfers before choosing dates and connections.",
        "Entry: The Servicio Nacional de Migraciones publishes requirements for temporary stays. Confirm visa eligibility, permitted stay, passport validity, and any required supporting documents for your nationality and purpose.",
        "Climate and planning: Chile spans the Atacama Desert, Mediterranean central region, and cold, wet southern Patagonia. Check the forecast and local advisories for each region; allow extra time for long distances and weather-sensitive connections."
      ],
      [source("Chile National Migration Service temporary stay", "https://serviciomigraciones.cl/permanencia-transitoria/"), source("Chile Travel entry and visa requirements", "https://chile.travel/en/good-to-know/entry-and-visa-requirements/"), source("Chile Travel climate and weather", "https://chile.travel/en/good-to-know/climate-and-weather/")]
    ),
    arrival24h: stage(
      "Chile uses 220 V / 50 Hz Type C and L outlets and Chilean pesos (CLP). Check whether your device plug fits Type L, and confirm the official transfer and pickup point at Santiago airport.",
      [
        "Power: Chile uses 220 V / 50 Hz electricity and Type C and L sockets. Check device input labels and the lodging outlet; adapters do not convert voltage.",
        "Connectivity and payment: Check roaming or local SIM options and coverage for your itinerary; remote regions may have limited service. Cards are common in cities, but keep CLP cash and a backup payment method for smaller operators.",
        "Airport transfer: Confirm current airport bus, taxi, and rideshare arrangements and the pickup point at Santiago's Arturo Merino Benítez Airport. Use authorized services and verify the destination and fare before leaving."
      ],
      [plugs("chile"), source("Nuevo Pudahuel Santiago Airport", "https://www.aeropuertosantiagodechile.cl/es/"), source("Chile Travel currency and costs", "https://chile.travel/en/good-to-know/currency-and-costs/")]
    ),
    mobility: stage(
      "Santiago has Metro and bus rapid transit; other cities have local bus systems. Long-distance travel spans deserts, mountains, and Patagonia, so check operator schedules and weather or road notices before setting out.",
      [
        "Santiago: Metro and the Red Metropolitana de Movilidad bus network serve the capital. Check official route, fare, and service-alert information; the same ticketing system may not apply in other cities.",
        "Intercity and regional trips: Coaches and domestic flights connect long distances; rail serves selected corridors. Verify the departure station, baggage limits, transfer time, and whether weather affects the route.",
        "Driving and local trips: Distances are long and road conditions vary from desert highways to mountain and southern routes. Check current travel advisories, rental terms, and fuel availability. Confirm taxi or rideshare details before boarding."
      ],
      [source("Metro de Santiago", "https://www.metro.cl/"), source("Red Metropolitana de Movilidad", "https://www.red.cl/"), source("Chile Travel getting around", "https://chile.travel/en/good-to-know/how-to-get-around-chile/")]
    ),
    dailyLiving: stage(
      "Delivery and pharmacy access are strongest in cities and vary elsewhere. Keep CLP cash for small purchases, check local water guidance, and plan supplies before remote desert or Patagonia travel.",
      [
        "Food and shopping: Delivery apps and grocery services are address-specific and less available outside major centres. Confirm the delivery zone and payment method before relying on an app; stock up before remote routes.",
        "Health and water: Water quality and availability vary by locality. Follow local or accommodation advice, especially in remote areas. Carry essential medication in original packaging and check pharmacy hours before leaving a city.",
        "Payments and dining: CLP is the local currency. Cards are common in cities, while cash can be useful for small vendors and rural stops. Ask about ingredients and check the bill for service charges before deciding whether to tip."
      ],
      [source("Chile Ministry of Health", "https://www.minsal.cl/"), source("Chile Travel currency and costs", "https://chile.travel/en/good-to-know/currency-and-costs/"), source("Chile Travel visitor information", "https://chile.travel/en/")]
    ),
    socialCode: stage(
      "Use a polite greeting and follow the host's lead at home or in religious settings. Rules for pets and wildlife vary by venue. Hofstede dimensions are broad comparison tools, not predictions about individuals.",
      [
        "Gift-giving and homes: Ask whether a small gift is appropriate and follow the host's cues about shoes, meal timing, and photography. Customs vary by household and region; avoid treating flower or gift taboos as universal.",
        "Dog culture: Dogs are common companion animals, but access to transit, restaurants, parks, and lodging depends on local regulations and venue policy. Keep a dog under control and check rules before arrival.",
        "Cat culture: Cats may be household pets or encountered in public areas. Ask before interacting with an unfamiliar animal, and check accommodation rules for visiting pets.",
        "Bird culture: Chile's native birds and wildlife should be observed without feeding, handling, capture, or removal. Follow park and protected-area rules; check official animal-health and wildlife requirements before travelling with a pet bird.",
        "Hofstede dimensions: The Culture Factor reports Chile's power-distance score as 63, described within its framework as intermediate-to-high. The framework also compares individualism, motivation toward achievement and success, uncertainty avoidance, long-term orientation, and indulgence. Use these as population-level prompts for reflection, not as rules about people you meet."
      ],
      [source("The Culture Factor country comparison: Chile", "https://www.theculturefactor.com/country-comparison-tool?countries=chile"), source("Chile Travel culture and heritage", "https://chile.travel/en/activities/culture-and-heritage/"), source("Chile Agricultural and Livestock Service wildlife information", "https://www.sag.gob.cl/ambitos-de-accion/fauna-silvestre")]
    )
  }
};

const electricalUpdates = {
  AR: { voltage: 220, frequency: 50, socketTypes: ["C", "I"], source: "https://www.power-plugs-sockets.com/argentina/", lastChecked: checked },
  BO: { voltage: "115 / 230", frequency: 50, socketTypes: ["A", "C"], source: "https://www.power-plugs-sockets.com/bolivia/", lastChecked: checked },
  CL: { voltage: 220, frequency: 50, socketTypes: ["C", "L"], source: "https://www.power-plugs-sockets.com/chile/", lastChecked: checked }
};

const destinations = JSON.parse(readFileSync(destinationsPath, "utf8"));
const electrical = JSON.parse(readFileSync(electricalPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing requested destination: ${iso}`);
  for (const [stageName, stageData] of Object.entries(update)) {
    destination.stages[stageName] = { ...destination.stages[stageName], ...stageData };
  }
  electrical[iso] = electricalUpdates[iso];
}

writeFileSync(destinationsPath, `${JSON.stringify(destinations, null, 2)}\n`);
writeFileSync(electricalPath, `${JSON.stringify(electrical, null, 2)}\n`);