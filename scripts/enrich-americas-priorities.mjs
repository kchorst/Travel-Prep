import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const source = (topic, url) => ({ topic, url, lastChecked: checked });
const stage = (simple, paragraphs, sources) => ({ simple, detailed: paragraphs.join("\n\n"), sources });
const plugs = (slug) => source("Electrical standards and socket types", `https://www.power-plugs-sockets.com/${slug}/`);

const updates = {
  BZ: {
    preArrival: stage(
      "Philip S. W. Goldson (BZE) is the international gateway; compare Google Flights/Skyscanner and confirm regional connections with the airline. Entry rules depend on passport.",
      ["Flight routing: BZE serves Belize City; smaller airstrips and domestic flights connect islands and inland destinations. Compare broad flight search, then confirm schedules, baggage, and ground/water transfer with the carrier.", "Entry: Check Belize Immigration and the relevant embassy for nationality-specific visa, passport, onward-ticket, and stay requirements. Do not rely on a generic visa-free list.", "Climate and packing: Tropical heat, rain, and hurricane season affect coastal/island plans. Check current forecasts and advisories; pack sun and rain protection, light layers, and reef-conscious beach gear."],
      [source("Belize Immigration and Nationality Services", "https://immigration.gov.bz/"), source("Philip S. W. Goldson International Airport", "https://www.pgiabelize.com/"), source("Belize Tourism Board", "https://www.travelbelize.org/")]
    ),
    arrival24h: stage(
      "Belize uses 110 V / 60 Hz Type A/B outlets; Belize dollars are pegged to USD. Check roaming/SIM coverage and arrange your airport or water taxi transfer in advance.",
      ["Power: 110 V / 60 Hz, Type A and B sockets. Check device voltage labels; bring a compatible adapter if needed.", "Connectivity and money: BZD is pegged at BZ$2 to US$1; US dollars are accepted in many visitor businesses, but confirm change and card fees. Mobile data and card acceptance are less consistent on cayes and in rural areas.", "Arrival transfer: Check BZE passenger information and the onward operator if continuing to a caye. Confirm water-taxi terminal, sailing time, luggage rules, and pickup before leaving the airport."],
      [plugs("belize"), source("Belize airport", "https://www.pgiabelize.com/"), source("Belize Tourism Board transport guidance", "https://www.travelbelize.org/")]
    ),
    mobility: stage(
      "Intercity buses connect Belize City with towns; cayes rely on water taxis and small aircraft. Confirm the exact terminal and last sailing before planning connections.",
      ["Intercity: Scheduled coaches serve major land routes; check current operator times and departure terminals. Rural services may be infrequent.", "Islands: Water taxis and domestic flights are the main links to cayes. Use the operator's current timetable and allow buffer for weather or missed connections.", "Local trips: Taxis are common; agree the fare before boarding. Walking routes may lack continuous sidewalks, lighting, or shade; plan for heat and rain."],
      [source("Belize Bus Association", "https://belizebusassociation.com/"), source("San Pedro Belize Express Water Taxi", "https://belizewatertaxi.com/"), source("Belize Tourism Board", "https://www.travelbelize.org/")]
    ),
    dailyLiving: stage(
      "Delivery apps are limited outside Belize City; ask lodging about local groceries, water, and pharmacy access before going to a caye or reserve.",
      ["Shopping and delivery: Restaurant delivery and grocery services are location-specific; call or message the business to confirm coverage, hours, and payment.", "Water and pharmacy: Use sealed or appropriately treated water unless local guidance confirms otherwise. Pharmacies and clinics are thinner outside towns; bring essential medicines in original packaging.", "Food and money: BZD and USD are used in many visitor settings, but verify exchange and change. Ask about ingredients/allergens and check whether service is included."],
      [source("Belize Tourism Board visitor information", "https://www.travelbelize.org/"), source("Belize Ministry of Health", "https://health.gov.bz/")]
    ),
    socialCode: stage(
      "Belize is multilingual and culturally diverse. Ask before photographing people or ceremonies, and follow local and host guidance on beach, village, and heritage-site conduct.",
      ["Language: English is official; Spanish, Kriol, Garifuna, and Mayan languages are also used. Ask which language is preferred rather than assuming.", "Visits: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead on greetings and shared meals.", "Photography and environment: Ask permission before photographing people or private property. Follow reef, wildlife, and archaeological-site rules."],
      [source("Belize Tourism Board cultural and visitor information", "https://www.travelbelize.org/")]
    )
  },
  CR: {
    preArrival: stage(
      "Compare SJO and LIR gateways with Google Flights/Skyscanner; include long ground transfers in the fare calculation. Check Costa Rica's entry rules and current health advisories.",
      ["Flight routing: Juan Santamaría (SJO) serves the Central Valley; Liberia (LIR) is convenient for Guanacaste. Compare flights with ground time and seasonal route availability included.", "Entry: Costa Rica's Immigration Directorate publishes visa requirements by nationality. Check passport validity, onward-ticket, and permitted-stay rules for your case before travel.", "Climate and packing: Pacific, Caribbean, and highland weather differ; rainy-season timing is regional. Check forecasts, road conditions, and park advisories; pack rain protection and trail footwear."],
      [source("Costa Rica Immigration Directorate", "https://migracion.go.cr/"), source("Costa Rica tourism board", "https://www.visitcostarica.com/"), source("Juan Santamaría Airport", "https://sjoairport.com/")]
    ),
    arrival24h: stage(
      "Costa Rica uses 120 V / 60 Hz Type A/B outlets; colón is the currency, though USD is accepted in many tourist areas. Check SIM coverage and airport bus/taxi options.",
      ["Power: 120 V / 60 Hz, Type A and B sockets. Check device labels before plugging in.", "Connectivity and money: Buy a local SIM from a recognized carrier or confirm roaming. Cards are common in cities; CRC cash is useful, and USD acceptance/exchange varies by business.", "Airport transfer: SJO and LIR have different bus, shuttle, and taxi arrangements. Check the airport's current passenger page and use official taxi ranks or licensed shuttles; confirm destination and price."],
      [plugs("costa-rica"), source("Costa Rica Tourism Board", "https://www.visitcostarica.com/"), source("SJO airport", "https://sjoairport.com/")]
    ),
    mobility: stage(
      "San José has bus and commuter-rail options; intercity travel is mostly by coach. Uber availability varies by city and legal status; confirm each route and pickup.",
      ["San José: Buses and commuter rail serve parts of the metro area; check current routes, operating days, and payment directly with the operator.", "Intercity: Coaches are the main public link between regions. Confirm terminal, operator, luggage policy, and return schedule; some beach routes fill quickly in peak season.", "Ride-hailing and walking: Uber and local taxi services vary in coverage and regulation. Use marked crossings; sidewalks and road shoulders can be inconsistent outside central areas."],
      [source("INCOFER passenger rail", "https://www.incofer.go.cr/"), source("Costa Rica Tourism Board transport information", "https://www.visitcostarica.com/")]
    ),
    dailyLiving: stage(
      "Uber Eats and local delivery cover parts of San José and tourist towns; verify the address. Ask accommodation about local water advisories and pharmacy hours.",
      ["Delivery: Uber Eats and local services are address-specific; check phone, payment, and hours in-app. Remote beaches and rural lodges may have no delivery.", "Water and health: Tap water is treated in many urban areas, but supply and advisories vary by region/building. Ask locally; use sealed or treated water if unsure. Carry prescriptions in original packaging.", "Food and payments: CRC is accepted everywhere; USD may be accepted in tourist districts but change may be in colones. Ask about ingredients and check service charges before tipping."],
      [source("Uber Eats Costa Rica", "https://www.ubereats.com/cr"), source("Costa Rica Tourism Board", "https://www.visitcostarica.com/"), source("Costa Rica Ministry of Health", "https://www.ministeriodesalud.go.cr/")]
    ),
    socialCode: stage(
      "Use a polite greeting, ask before photographing people, and follow host cues on footwear and meals. At parks, follow wildlife and conservation rules.",
      ["Home visits: Ask whether to remove shoes and whether a small local-food gift is welcome. Household customs vary.", "Conversation: Spanish is the official language; English is common in some tourism areas but not universal. Ask which language is comfortable.", "Outdoor conduct: Follow park rules, stay on marked trails, and do not feed wildlife. Ask permission before photographing people or private property."],
      [source("Costa Rica Tourism Board visitor guidance", "https://www.visitcostarica.com/")]
    )
  },
  SV: {
    preArrival: stage(
      "Compare San Salvador (SAL) fares with Google Flights/Skyscanner and include the airport road transfer. Check El Salvador's visa rules and current entry requirements by passport.",
      ["Flight routing: SAL is the main international airport. Compare route and fare, then confirm with the carrier; factor in the road transfer to San Salvador or the coast.", "Entry: Visa and permitted-stay rules depend on nationality and itinerary. Check El Salvador's foreign-ministry or immigration guidance before booking; verify any regional C-4 stay calculation for your route.", "Climate and packing: Tropical heat and rainy-season storms affect road travel. Check forecasts and local advisories; bring light rain protection, sun protection, and modest attire for religious sites."],
      [source("El Salvador Ministry of Foreign Affairs", "https://rree.gob.sv/"), source("El Salvador Immigration Directorate", "https://www.migracion.gob.sv/"), source("El Salvador Airport Authority", "https://www.cepa.gob.sv/")]
    ),
    arrival24h: stage(
      "El Salvador uses 120 V / 60 Hz Type A/B sockets and the US dollar. Confirm roaming and ride pickup; keep small USD notes for buses and local purchases.",
      ["Power: 120 V / 60 Hz, Type A and B sockets. Check device input and adapter compatibility.", "Connectivity and money: USD is the official currency. Card acceptance varies; keep small bills. Check SIM/eSIM availability and coverage with local carriers before relying on data.", "Airport transfer: SAL is outside central San Salvador. Use official taxi/shuttle or verified app pickup areas, confirm fare/destination, and check road conditions before an onward drive."],
      [plugs("el-salvador"), source("CEPA airport passenger information", "https://www.cepa.gob.sv/"), source("El Salvador tourism", "https://elsalvador.travel/")]
    ),
    mobility: stage(
      "San Salvador relies mainly on buses and BRT; routes and payment vary. Intercity coaches and ride-hailing are city-specific, so confirm stops and fares locally.",
      ["San Salvador: Bus and BRT services cover major corridors. Check current operator/municipal information for routes, stops, operating hours, and fares.", "Intercity: Coaches link major towns and tourist routes. Confirm terminal, operator, and schedule before travel; avoid assuming a route operates after dark.", "Ride-hailing and walking: Uber and local ride services operate in some urban areas. Verify vehicle/pickup and use marked crossings; sidewalk quality varies."],
      [source("San Salvador public transport authority", "https://www.vmt.gob.sv/"), source("El Salvador tourism", "https://elsalvador.travel/")]
    ),
    dailyLiving: stage(
      "PedidosYa and Uber Eats cover some urban addresses; check service zones. USD is used; ask locally about water quality and pharmacy access.",
      ["Delivery: PedidosYa and Uber Eats are options in selected urban zones; verify address, phone, payment, and hours. Rural and beach coverage is limited.", "Health and water: Water supply and treatment differ by locality/building. Ask accommodation and use sealed/treated water if uncertain. Bring necessary medicines and verify import rules.", "Food and money: USD is used for daily purchases. Ask about ingredients and dietary needs; check receipts for service charge and tip at your discretion."],
      [source("PedidosYa El Salvador", "https://www.pedidosya.com.sv/"), source("Uber Eats El Salvador", "https://www.ubereats.com/sv"), source("El Salvador tourism", "https://elsalvador.travel/")]
    ),
    socialCode: stage(
      "Use a polite Spanish greeting, ask before photographing people, and follow religious-site dress guidance. At home, ask whether to remove shoes.",
      ["Greetings and language: Spanish is the official language. Begin politely and ask if another language is preferred.", "Home visits: Ask about footwear and whether a small food gift is welcome. Customs vary by household.", "Photography: Ask permission before photographing people, homes, or ceremonies. Follow posted rules at churches, archaeological sites, and government facilities."],
      [source("El Salvador tourism visitor guidance", "https://elsalvador.travel/")]
    )
  },
  GT: {
    preArrival: stage(
      "Guatemala City (GUA) is the main gateway; compare Google Flights/Skyscanner with regional carriers and include the ground route. Entry rules depend on nationality and the CA-4 itinerary.",
      ["Flight routing: GUA serves Guatemala City; Flores (FRS) can shorten travel to Tikal. Compare international search with direct airlines and domestic operators; factor in road time and season.", "Entry: Check Guatemala's immigration authority for nationality-specific visa, passport, and stay rules. The CA-4 arrangement affects stays across Guatemala, El Salvador, Honduras, and Nicaragua; confirm the current total allowance for your case.", "Climate and packing: Highlands, coast, and Petén lowlands differ in temperature and rain. Check forecasts; pack layers, rain protection, sun protection, and modest clothing for religious sites."],
      [source("Guatemala Institute of Migration", "https://igm.gob.gt/"), source("Guatemala tourism institute", "https://inguat.gob.gt/"), source("Guatemala airport authority", "https://www.dgac.gob.gt/")]
    ),
    arrival24h: stage(
      "Guatemala uses 120 V / 60 Hz Type A/B sockets and the quetzal. Confirm airport transfer, card access, and cash needs before leaving La Aurora Airport.",
      ["Power: 120 V / 60 Hz, Type A and B sockets. Check device input before use.", "Connectivity and money: GTQ is the local currency; cards are useful in cities, while cash is needed in markets and rural areas. Check ATM fees and local SIM registration.", "Airport transfer: La Aurora is in Guatemala City. Use authorized airport taxis/shuttles or a verified ride pickup; confirm destination and fare, and plan road time for traffic."],
      [plugs("guatemala"), source("La Aurora Airport information", "https://www.dgac.gob.gt/"), source("Guatemala tourism institute", "https://inguat.gob.gt/")]
    ),
    mobility: stage(
      "Guatemala City has Transmetro and Transurbano; intercity travel uses coaches, shuttles, and local buses. Check current routes and safety guidance before using informal transport.",
      ["Guatemala City: Transmetro and Transurbano serve key corridors; check current route maps, fares, and service notices with the municipal operators.", "Intercity: Tourist shuttles and scheduled coaches connect Antigua, Lake Atitlán, and other destinations. Confirm pickup point, luggage, and daylight arrival; local buses (camionetas) have different comfort and safety conditions.", "Ride-hailing and walking: Uber operates in some cities; coverage varies. Use verified pickups and marked crossings; steep terrain and uneven sidewalks are common."],
      [source("Municipality of Guatemala transport information", "https://www.muniguate.com/"), source("Guatemala tourism institute", "https://inguat.gob.gt/")]
    ),
    dailyLiving: stage(
      "PedidosYa and Uber Eats cover parts of Guatemala City and larger towns. Ask locally about water and pharmacy access, especially before rural travel.",
      ["Delivery: Check PedidosYa/Uber Eats at your exact address; service is concentrated in cities and larger towns. Confirm local phone and payment requirements.", "Health and water: Use sealed or treated water unless your accommodation confirms local guidance. Pharmacies are common in towns, but rural stock varies; bring essential prescriptions in original packaging.", "Food and payment: GTQ cash is useful for markets and smaller businesses. Ask about ingredients, spice, and dietary needs; check service charges on restaurant bills."],
      [source("PedidosYa Guatemala", "https://www.pedidosya.com.gt/"), source("Guatemala tourism institute", "https://inguat.gob.gt/"), source("Guatemala Ministry of Health", "https://www.mspas.gob.gt/")]
    ),
    socialCode: stage(
      "Guatemala is multilingual; ask which language is preferred. At churches and Maya sites, follow local guidance and ask before photographing people or ceremonies.",
      ["Language: Spanish and many Maya languages are spoken. Ask respectfully before switching language or photographing traditional dress.", "Visits: Ask about shoes and gifts in homes; follow the host's cues. Dress modestly at religious sites and observe site-specific community rules.", "Photography: Ask permission before photographing people, markets, ceremonies, or private property. Follow restrictions at archaeological and sacred sites."],
      [source("Guatemala tourism institute cultural information", "https://inguat.gob.gt/")]
    )
  },
  HN: {
    preArrival: stage(
      "Compare Tegucigalpa (TGU), San Pedro Sula (SAP), and island gateways with Google Flights/Skyscanner. Check Honduras entry rules and current official travel advisories.",
      ["Flight routing: SAP and TGU serve mainland itineraries; Roatán (RTB) and other island airports serve Bay Islands trips. Compare routes and include onward ground/boat transfers.", "Entry: Visa and permitted-stay rules depend on nationality, passport, and CA-4 travel. Check Honduras' immigration authority and your government's current advice before booking.", "Climate and packing: Caribbean coast, highlands, and Bay Islands weather differ; storm season can disrupt flights/ferries. Check forecasts and advisories; pack rain and sun protection."],
      [source("Honduras National Institute of Migration", "https://inm.gob.hn/"), source("Honduras tourism authority", "https://www.iht.hn/"), source("InterAirports Honduras", "https://www.interairports.hn/")]
    ),
    arrival24h: stage(
      "Honduras uses 110 V / 60 Hz Type A/B sockets and lempira (HNL). Confirm SIM/card coverage and use a verified airport transfer.",
      ["Power: 110 V / 60 Hz, Type A and B sockets. Check device input and adapter fit.", "Connectivity and payments: HNL cash is useful; USD may be accepted in some tourist zones, but confirm exchange/change. Check local SIM registration, roaming, and card access.", "Airport transfer: Airports are in different cities and use separate transport services. Check official passenger information and arrange licensed taxi/hotel pickup; confirm fare and destination."],
      [plugs("honduras"), source("InterAirports Honduras passenger information", "https://www.interairports.hn/"), source("Honduras tourism authority", "https://www.iht.hn/")]
    ),
    mobility: stage(
      "Mainland cities use buses and taxis; intercity coaches connect major towns. Bay Islands transport is local and ferry-dependent; verify schedules before connecting.",
      ["Urban transit: Buses and taxis provide most city transport; routes and payment vary. Ask accommodation for current stops and known operators.", "Intercity and islands: Scheduled coaches serve mainland routes; ferries and small aircraft connect Bay Islands. Check operator notices, weather, and last departures before booking onward travel.", "App rides and walking: Availability varies by city. Confirm fare and pickup with a verified service; use marked crossings and plan for heat and limited sidewalks."],
      [source("Honduras tourism authority transportation information", "https://www.iht.hn/"), source("InterAirports Honduras", "https://www.interairports.hn/")]
    ),
    dailyLiving: stage(
      "Delivery options are concentrated in Tegucigalpa, San Pedro Sula, and tourist areas. Use bottled or treated water and plan pharmacy access outside cities.",
      ["Delivery: Check current local apps and restaurant direct delivery by address; coverage outside major urban areas is limited.", "Health and water: Use sealed/treated water unless local guidance confirms otherwise. Carry essential medicines in original packaging and verify import requirements; pharmacy stock varies outside cities.", "Food and payment: HNL cash is useful in local markets and smaller towns. Ask about ingredients and allergens; verify charges and tip practices on the bill."],
      [source("Honduras tourism authority visitor information", "https://www.iht.hn/"), source("Honduras Ministry of Health", "https://www.salud.gob.hn/")]
    ),
    socialCode: stage(
      "Use a courteous Spanish greeting, ask before photos, and follow host guidance on shoes and gifts. Customs vary across mainland and island communities.",
      ["Language and greetings: Spanish is the principal language; English is used in parts of the Bay Islands. Ask which language is preferred.", "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead on greetings and meals.", "Photography and sites: Ask permission before photographing people, homes, or ceremonies. Follow posted rules at religious and heritage sites."],
      [source("Honduras tourism authority", "https://www.iht.hn/")]
    )
  },
  NI: {
    preArrival: stage(
      "Managua (MGA) is the main air gateway; compare flights via San Salvador, Panama City, or regional hubs. Check Nicaragua's entry rules and current travel advice by passport.",
      ["Flight routing: MGA is the main international airport. Compare Google Flights/Skyscanner, then check regional connections and the full ground transfer; service frequencies may change.", "Entry: Visa, passport validity, and regional CA-4 stay rules depend on nationality and itinerary. Check Nicaragua's immigration authority or nearest embassy before booking.", "Climate and packing: Pacific lowlands are hot; Caribbean regions and highlands have different rain patterns. Check forecasts and advisories; pack sun/rain protection and light layers."],
      [source("Nicaragua Ministry of Government/Immigration", "https://www.migob.gob.ni/"), source("Nicaragua tourism authority", "https://www.intur.gob.ni/"), source("Managua Airport", "https://www.eaai.com.ni/")]
    ),
    arrival24h: stage(
      "Nicaragua uses 120 V / 60 Hz Type A/B sockets and córdobas (NIO). Confirm roaming and card acceptance; arrange a trusted MGA transfer before arrival.",
      ["Power: 120 V / 60 Hz, Type A and B sockets. Check device voltage before use.", "Connectivity and payments: NIO is local currency; some visitor businesses accept USD, but change and card acceptance vary. Check SIM/roaming and bank fees.", "Airport transfer: Use an arranged shuttle, hotel transfer, or verified taxi. Confirm destination and fare before leaving MGA; road travel times vary by traffic and conditions."],
      [plugs("nicaragua"), source("Managua Airport", "https://www.eaai.com.ni/"), source("Nicaragua tourism authority", "https://www.intur.gob.ni/")]
    ),
    mobility: stage(
      "Managua uses city buses and taxis; intercity coaches and ferries serve major routes. Ask locally about current terminals and schedules rather than assuming app coverage.",
      ["Managua: City buses and taxis operate on routes that may be unfamiliar to visitors. Confirm stop, direction, fare, and current service with a trusted local source.", "Intercity and islands: Coaches connect major towns; ferries serve Ometepe and other lake/island routes. Verify operator, port, and weather-related notices.", "Walking: Sidewalks and lighting vary. Plan short routes in daylight where appropriate, use marked crossings, and check local travel advice for routes and timing."],
      [source("Nicaragua tourism authority transport information", "https://www.intur.gob.ni/"), source("Nicaragua port authority", "https://www.epn.com.ni/")]
    ),
    dailyLiving: stage(
      "App delivery is limited outside Managua and larger towns. Use bottled or treated water unless local guidance confirms safety; bring essential medication for remote trips.",
      ["Daily services: Restaurant delivery and online grocery options are concentrated in Managua. Call the business or ask accommodation about current phone/address requirements.", "Health and water: Use sealed/treated water if uncertain. Pharmacies are available in towns but stock varies; carry prescribed medication in original packaging and verify import rules.", "Food and money: Keep NIO cash for local purchases. Ask about ingredients and dietary needs; check any service charge before tipping."],
      [source("Nicaragua tourism authority visitor information", "https://www.intur.gob.ni/"), source("Nicaragua Ministry of Health", "https://www.minsa.gob.ni/")]
    ),
    socialCode: stage(
      "Use a polite Spanish greeting, ask before photographing people, and follow host guidance on shoes and meals. Ask about local expectations rather than assuming.",
      ["Greetings: Spanish is the main language; a courteous verbal greeting is a safe default.", "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Customs vary by household.", "Photography: Ask permission before photographing people, private homes, or ceremonies. Follow posted rules at religious and heritage sites."],
      [source("Nicaragua tourism authority cultural information", "https://www.intur.gob.ni/")]
    )
  },
  PA: {
    preArrival: stage(
      "Compare Tocumen (PTY) and regional airports with Google Flights/Skyscanner; Copa Airlines connects many Americas routes. Check Panama's nationality-specific entry rules.",
      ["Flight routing: Tocumen (PTY) is a major regional hub; Albrook (PAC) and David (DAV) serve domestic/regional trips. Compare broadly and verify terminal/connection time with Copa or the operating carrier.", "Entry: Panama's visa requirements, onward-ticket, and permitted stay depend on nationality and travel details. Check the National Migration Service and consular guidance before booking.", "Climate and packing: Tropical heat and rainy season affect road, island, and canal-zone travel. Check forecasts; bring sun/rain protection and lightweight clothing."],
      [source("Panama National Migration Service", "https://www.migracion.gob.pa/"), source("Copa Airlines", "https://www.copaair.com/"), source("Tocumen Airport", "https://www.tocumenpanama.aero/")]
    ),
    arrival24h: stage(
      "Panama uses 120 V / 60 Hz Type A/B sockets; the balboa is at par with the US dollar, and USD notes circulate. Confirm metro/airport routes and local SIM coverage.",
      ["Power: 120 V / 60 Hz, Type A and B sockets. Check device input and adapter compatibility.", "Connectivity and payments: Panama uses balboa coins and US dollar notes; card acceptance is common in the capital but varies elsewhere. Check roaming/SIM setup and retain small bills.", "Airport transfer: PTY is outside central Panama City. Metro Line 2, buses, taxis, and shuttles have different ticketing/pickup rules; check Tocumen's current information and use official pickup points."],
      [plugs("panama"), source("Tocumen Airport passenger transport", "https://www.tocumenpanama.aero/"), source("Panama Metro", "https://www.elmetrodepanama.com/")]
    ),
    mobility: stage(
      "Panama City has metro and Metrobus; use current official route/ticket guidance. Intercity buses, ferries, and domestic flights connect provinces and islands.",
      ["Panama City: Metro and Metrobus serve major corridors. Check current route maps, reloadable fare media, and service alerts; not all airport/visitor trips use the same ticket.", "Intercity and islands: Coach, ferry, and domestic air routes serve different regions. Verify departure terminal/port and weather advisories; island schedules may be limited.", "Ride-hailing and walking: Uber and other apps operate in parts of Panama City. Confirm pickup and fare; heat and sidewalk gaps affect walking outside central districts."],
      [source("Panama Metro", "https://www.elmetrodepanama.com/"), source("Panama Maritime Authority", "https://www.amp.gob.pa/")]
    ),
    dailyLiving: stage(
      "PedidosYa and Uber Eats cover many Panama City addresses; verify province/island coverage. Tap-water and pharmacy advice can vary outside major urban areas.",
      ["Delivery: PedidosYa and Uber Eats are urban options; enter the exact address and check hours/payment. Service is thinner in rural provinces and islands.", "Water and pharmacy: Ask accommodation about municipal/building-specific water notices. Use sealed or treated water if uncertain; check local pharmacy hours and bring prescriptions in original packaging.", "Payments and food: USD/PAB are used at par in many transactions, but cards/cash differ by merchant. Ask about ingredients and service charges; tipping is venue-dependent."],
      [source("PedidosYa Panama", "https://www.pedidosya.com.pa/"), source("Uber Eats Panama", "https://www.ubereats.com/pa"), source("Panama tourism authority", "https://www.tourismpanama.com/")]
    ),
    socialCode: stage(
      "Spanish is the main language; ask before photos and follow host cues on greetings, footwear, and meal customs. Observe posted rules at Indigenous territories and protected sites.",
      ["Language and visits: Spanish is widely used; English varies by region. Ask which language is preferred. At home, ask about shoes and gifts.", "Communities and sites: Follow local guidance and permits for Indigenous territories, beaches, and protected areas. Ask before photographing people or ceremonies.", "Public interaction: Use a courteous greeting and avoid assuming one custom applies across Panama's diverse communities."],
      [source("Panama tourism authority visitor information", "https://www.tourismpanama.com/")]
    )
  },
  AG: {
    preArrival: stage(
      "V.C. Bird (ANU) is the main gateway; compare regional connections via LIAT 20, Caribbean Airlines, and Google Flights/Skyscanner. Check entry requirements by passport.",
      ["Flight routing: ANU has regional and international links; island hopping may require separate tickets and connections. Compare broadly, then verify route/season with the airline.", "Entry: Antigua and Barbuda's visa requirements and permitted stay depend on nationality and route. Check the government's immigration guidance before booking.", "Climate and packing: Tropical heat, rainy season, and hurricane season affect flights and ferries. Check weather advisories; pack sun and rain protection."],
      [source("Antigua and Barbuda government", "https://ab.gov.ag/"), source("V.C. Bird International Airport", "https://antiguaairport.com/"), source("LIAT 20", "https://www.liat.com/")]
    ),
    arrival24h: stage(
      "Antigua uses 230 V / 60 Hz Type A/B sockets; USD is often accepted alongside the East Caribbean dollar. Confirm taxi fare and mobile coverage on arrival.",
      ["Power: 230 V / 60 Hz, Type A and B sockets. Check device voltage; lodging outlets may vary.", "Connectivity and money: XCD is local currency; USD acceptance is common in visitor areas but confirm change. Check roaming/SIM options and carry cash for small vendors.", "Airport transfer: Use official taxi dispatch/stands at ANU and confirm fare, destination, and luggage before departure. For Barbuda, check current ferry or flight schedules separately."],
      [plugs("antigua-and-barbuda"), source("V.C. Bird Airport passenger information", "https://antiguaairport.com/"), source("Antigua and Barbuda tourism", "https://www.visitantiguabarbuda.com/")]
    ),
    mobility: stage(
      "Antigua relies on public minibuses, taxis, and rental cars; Barbuda transfers are separate. Check route and return timing before leaving St John's.",
      ["On Antigua: Public minibuses run from St John's to villages and beaches, but evening/weekend frequency may be limited. Confirm destination and last return locally.", "Between islands: Ferry and small-aircraft schedules connect Barbuda; check operator/weather notices. Rental cars drive on the left and may require a local permit.", "Taxis and walking: Agree taxi fare before boarding. Sidewalks may be absent outside town; plan for heat and use safe road shoulders/crossings."],
      [source("Antigua and Barbuda tourism transport information", "https://www.visitantiguabarbuda.com/"), source("Barbuda Express ferry", "https://barbudaexpress.com/")]
    ),
    dailyLiving: stage(
      "Restaurant delivery is address-specific and limited outside St John's. Ask accommodation about groceries, drinking water, and pharmacy hours before visiting Barbuda.",
      ["Daily services: Call restaurants or ask lodging about current delivery and grocery options; app coverage is not uniform.", "Health and water: Follow accommodation/local water guidance and use sealed water if unsure. Bring essential medication; pharmacy stock and late hours are limited on smaller islands.", "Money and dining: XCD is standard; USD may be accepted in tourist businesses. Check bills for service and tipping expectations."],
      [source("Antigua and Barbuda tourism information", "https://www.visitantiguabarbuda.com/")]
    ),
    socialCode: stage(
      "Use a polite greeting, ask before photographing people, and follow beach, church, and host guidance. Customs differ between Antigua and Barbuda.",
      ["Visits: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead.", "Public and religious sites: Dress respectfully where requested and ask before photographing people, homes, or ceremonies.", "Island etiquette: English is official, with local Creole in daily use. Be courteous and avoid assuming identical customs across islands."],
      [source("Antigua and Barbuda tourism visitor information", "https://www.visitantiguabarbuda.com/")]
    )
  },
  BS: {
    preArrival: stage(
      "Nassau (NAS) is the main hub; compare Bahamasair and US/regional connections. Inter-island flights and ferries are separate bookings; check passport-specific entry rules.",
      ["Flight routing: NAS connects many international routes; Grand Bahama (FPO) and Out Islands use smaller airports. Compare broad search and Bahamasair, then verify baggage and island transfer.", "Entry: Visa and permitted-stay rules depend on nationality and length/purpose. Check the Bahamas Department of Immigration before booking.", "Climate and packing: Tropical heat, hurricane season, and sea conditions affect island schedules. Check National Hurricane Center/local advisories; pack sun and rain protection."],
      [source("Bahamas Department of Immigration", "https://www.immigration.gov.bs/"), source("Bahamasair", "https://bahamasair.com/"), source("Nassau Airport Development Company", "https://nassaulpia.com/")]
    ),
    arrival24h: stage(
      "The Bahamas uses 120 V / 60 Hz Type A/B sockets; Bahamian and US dollars trade at par. Confirm island-specific SIM, ATM, and airport taxi options.",
      ["Power: 120 V / 60 Hz, Type A and B sockets. Check your device label and adapter.", "Connectivity and money: BSD is at par with USD; USD is widely accepted. Card/ATM and mobile coverage vary across Out Islands; carry small cash and check roaming.", "Airport transfer: NAS and island airports have separate taxi/shuttle services. Use marked taxi ranks or hotel pickup and agree the fare before departure."],
      [plugs("bahamas"), source("Nassau airport passenger information", "https://nassaulpia.com/"), source("Bahamasair", "https://bahamasair.com/")]
    ),
    mobility: stage(
      "Nassau uses jitneys and taxis; other islands rely on local taxis, rental cars, and ferries. Confirm route and operating hours—especially the last return trip.",
      ["Nassau: Jitneys serve popular routes but do not operate like a fully scheduled metro. Ask locally about route, stop, fare, and last service.", "Island links: Bahamas Ferries and domestic flights connect islands; schedules are weather- and season-dependent. Confirm port/airport and luggage allowance.", "Taxis and walking: Agree taxi fare in advance. Roads may lack sidewalks; plan for heat, traffic, and limited night lighting."],
      [source("Bahamas Ferries", "https://www.bahamasferries.com/"), source("Bahamas Ministry of Transport", "https://www.bahamas.gov.bs/")]
    ),
    dailyLiving: stage(
      "Delivery services are concentrated in Nassau and some larger islands; verify by address. Ask locally about drinking water and pharmacy access before Out Island travel.",
      ["Daily services: Restaurant and grocery delivery are location-specific; call the business or ask lodging for current options and hours.", "Water and health: Follow local utility/accommodation advice and use sealed water if unsure. Pharmacy and clinic options are limited on smaller islands; carry essential medicines.", "Money and dining: BSD/USD are both used. Check service charge on the bill; tipping customs vary by venue."],
      [source("Bahamas tourism visitor information", "https://www.bahamas.com/")]
    ),
    socialCode: stage(
      "Ask before photographing people or private property. Follow beach and church guidance; for home visits, ask about footwear and gifts.",
      ["Home visits: Ask whether to remove shoes and whether a small gift is welcome. Follow the host's lead.", "Public conduct: English is official. Ask permission before photographing people, homes, or ceremonies and respect posted property rules.", "Island differences: Customs and services vary across New Providence, Grand Bahama, and the Out Islands; avoid assuming one island's practice applies everywhere."],
      [source("Bahamas tourism visitor information", "https://www.bahamas.com/")]
    )
  },
  BB: {
    preArrival: stage(
      "Grantley Adams (BGI) is Barbados' main gateway; compare Google Flights/Skyscanner with Caribbean Airlines and regional carriers. Check entry requirements for your passport.",
      ["Flight routing: BGI receives international and regional flights. Compare broad search with Caribbean Airlines/operating carriers and confirm seasonal schedules and baggage.", "Entry: Barbados visa requirements, passport validity, and onward-ticket rules depend on nationality. Check Barbados Immigration before booking.", "Climate and packing: Tropical climate with rainy/hurricane season risks. Check official weather notices and flight/ferry updates; pack sun/rain protection."],
      [source("Barbados Immigration Department", "https://immigration.gov.bb/"), source("Grantley Adams Airport", "https://www.gaia.bb/"), source("Caribbean Airlines", "https://www.caribbean-airlines.com/")]
    ),
    arrival24h: stage(
      "Barbados uses 115 V / 50 Hz Type A/B sockets; local currency is BBD, pegged to USD. Confirm SIM and taxi options at BGI.",
      ["Power: 115 V / 50 Hz, Type A and B sockets. Confirm appliance voltage before plugging in.", "Connectivity and money: BBD is pegged to USD; USD is widely accepted, but confirm change. Check SIM/roaming availability and card fees.", "Airport transfer: BGI has taxi and bus options; check current airport passenger information and confirm taxi fare/destination before departure."],
      [plugs("barbados"), source("Grantley Adams Airport passenger information", "https://www.gaia.bb/"), source("Barbados Tourism Marketing", "https://www.visitbarbados.org/")]
    ),
    mobility: stage(
      "Barbados has Transport Board buses and privately operated ZR vans/minibuses. Routes and payment differ; ask locally about the last return service.",
      ["Public buses: Transport Board buses run on major routes; check current schedules and fares with the operator.", "Shared transport: ZR vans and route taxis provide frequent service on some corridors. Confirm destination and fare before boarding; do not assume late-night service.", "Taxis and walking: Agree taxi fares before travel. Sidewalks and road shoulders vary; use caution on narrow roads and in rain."],
      [source("Barbados Transport Board", "https://www.transportboard.com/"), source("Barbados tourism transport information", "https://www.visitbarbados.org/")]
    ),
    dailyLiving: stage(
      "Food delivery is address-specific; check local restaurant/market services. Follow Barbados Water Authority notices and ask accommodation about pharmacy access.",
      ["Delivery: Restaurant delivery and grocery services vary by parish. Confirm coverage, phone, and payment directly before relying on it.", "Water and health: Follow Barbados Water Authority advisories and accommodation guidance. Pharmacies are available in towns; bring prescriptions in original packaging.", "Food and payment: BBD/USD are commonly used. Ask about fish and other ingredients/allergens; check bills for service charge and tip at your discretion."],
      [source("Barbados Water Authority", "https://barbadoswaterauthority.com/"), source("Barbados tourism information", "https://www.visitbarbados.org/")]
    ),
    socialCode: stage(
      "Use a polite greeting, ask before photos, and follow church/beach dress guidance. At home, ask about shoes and gifts rather than assuming a custom.",
      ["Home visits: Ask whether to remove shoes and whether a small food gift is welcome.", "Public settings: English is official. Dress respectfully at churches and ask before photographing people or private property.", "Dining: Follow the host's lead and ask about dietary needs. Customs vary by household and parish."],
      [source("Barbados tourism visitor information", "https://www.visitbarbados.org/")]
    )
  },
  CU: {
    preArrival: stage(
      "Havana (HAV) is the main gateway, but routes and payment options change. Check current government travel advice, Cuban entry rules, and airline requirements before purchase.",
      ["Flight routing: HAV and resort airports serve different itineraries. Verify routes directly with carriers and check current operating/payment conditions; broad search results may not reflect ticket availability.", "Entry: Cuba's eVisa/tourist-card and health/arrival requirements depend on nationality, departure point, and purpose. Check official Cuban consular guidance and airline documentation rules before travel.", "Climate and packing: Tropical heat and hurricane-season disruption are possible. Check forecasts and advisories; bring prescriptions and essentials because local availability can be inconsistent."],
      [source("Cuban Ministry of Foreign Affairs consular information", "https://www.minrex.gob.cu/en"), source("Cuba eVisa", "https://evisacuba.cu/"), source("Cuban tourism portal", "https://www.cuba.travel/")]
    ),
    arrival24h: stage(
      "Cuba uses 110/220 V and Type A/B/C/L sockets depending on building. Bring cash in an accepted currency and verify current card, SIM, and airport-transfer options.",
      ["Power: Supply may be 110 or 220 V and sockets vary; check the lodging and device label before use. Bring a voltage converter if the device requires it.", "Connectivity and money: Internet/SIM access and international-card acceptance can be constrained and change. Check your bank and carrier before travel and bring sufficient legal cash; exchange only through authorized channels.", "Airport transfer: Confirm your airport terminal and pre-book a recognized taxi or accommodation transfer. Availability and payment methods may differ from typical app-based travel."],
      [plugs("cuba"), source("Cuba eVisa and entry information", "https://evisacuba.cu/"), source("Cuban tourism information", "https://www.cuba.travel/")]
    ),
    mobility: stage(
      "Intercity Viazul coaches and domestic flights are limited and should be booked/confirmed early. City transport includes official taxis and shared options; verify availability locally.",
      ["Intercity: Viazul coaches and domestic flights connect key visitor destinations; check current schedule, payment, and ticket availability before building tight connections.", "City trips: Official taxis, private taxis, and shared vehicles operate differently by city. Agree price, currency, route, and pickup before boarding.", "Walking: Pavements, lighting, and service interruptions vary. Carry offline addresses and allow extra time; follow current local notices and government travel advice."],
      [source("Viazul official coach service", "https://viazul.wetransp.com/"), source("Cuba tourism information", "https://www.cuba.travel/")]
    ),
    dailyLiving: stage(
      "Online delivery and grocery availability are limited and payment-sensitive. Carry essential medicine and ask accommodation about water and current local supply conditions.",
      ["Daily services: Do not assume international food-delivery or online-shopping apps work. Ask lodging or a trusted local contact about current restaurants, shops, and payment methods.", "Health and water: Use sealed water unless local guidance confirms otherwise. Bring essential medicines and prescriptions; pharmacy availability can be limited.", "Money and dining: Payment options and currency acceptance can change. Confirm the amount/currency before ordering and check current official travel guidance."
      ],
      [source("Cuban tourism visitor information", "https://www.cuba.travel/"), source("Cuban Ministry of Public Health", "https://salud.msp.gob.cu/")]
    ),
    socialCode: stage(
      "Ask before photography, especially of officials or security facilities. Use a polite greeting and follow host instructions; customs and services can vary by locality.",
      ["Visits and conversation: A friendly greeting is common; ask before photographing people or homes. Follow the host's lead on footwear and gifts.", "Public sites: Respect posted restrictions at government, transport, and security-sensitive locations. Avoid photographing facilities where prohibited.", "Dining and gifts: Ask about preferences and dietary needs rather than assuming alcohol, flowers, or a particular gift is suitable."],
      [source("Cuban tourism visitor information", "https://www.cuba.travel/")]
    )
  },
  DM: {
    preArrival: stage(
      "Douglas-Charles (DOM) and Canefield (DCF) serve different flights; compare regional airlines and ferry combinations. Check Dominica entry rules by passport.",
      ["Flight routing: DOM is the main international gateway; DCF serves limited regional flights. Island hopping may be faster by ferry depending on schedule and sea conditions.", "Entry: Visa requirements depend on nationality, purpose, and length of stay. Check Dominica Immigration or the relevant embassy before booking.", "Climate and packing: Rainforest terrain means frequent showers and humid conditions. Check storm advisories; pack waterproof layers and hiking footwear."],
      [source("Dominica Immigration", "https://dominica.gov.dm/"), source("Douglas-Charles Airport", "https://www.daistdominica.com/"), source("Discover Dominica tourism", "https://discoverdominica.com/")]
    ),
    arrival24h: stage(
      "Dominica uses 230 V / 50 Hz Type D/G sockets and East Caribbean dollars. Confirm airport transfer, SIM coverage, and ferry timetable before arrival.",
      ["Power: 230 V / 50 Hz, Type D and G sockets. Check device labels and bring compatible adapters.", "Connectivity and money: XCD is the local currency. Mobile coverage and card acceptance vary outside Roseau; carry cash and check roaming.", "Arrival: Check DOM/DCF airport passenger details and arrange taxi or lodging pickup. Ferry terminals are separate; verify sailing schedules and port locations."],
      [plugs("dominica"), source("Douglas-Charles Airport", "https://www.daistdominica.com/"), source("Dominica ferry service", "https://www.expressdesiles.com/")]
    ),
    mobility: stage(
      "Dominica relies on minibuses, taxis, and ferries; routes are limited outside Roseau. Confirm return service before hiking or visiting remote attractions.",
      ["Buses: Privately operated minibuses serve major routes from Roseau, with frequency varying by day and destination. Ask locally for the stop and last return.", "Island links: Ferries connect Dominica with nearby islands; weather can disrupt schedules. Confirm the sailing and port on travel day.", "Walking and driving: Mountain roads are winding and sidewalks limited. Use a licensed taxi or experienced driver for remote trailheads; check weather and trail status."],
      [source("Discover Dominica transport information", "https://discoverdominica.com/"), source("Dominica ferry operator", "https://www.expressdesiles.com/")]
    ),
    dailyLiving: stage(
      "Food delivery is limited; ask locally. Use treated water where advised and plan pharmacy/food supplies before visiting remote villages or trails.",
      ["Daily services: Restaurants and grocery delivery are address-dependent and may require calling directly. Confirm hours and cash/card acceptance.", "Health and water: Ask accommodation about local water and the nearest pharmacy. Carry essential medicine; supplies are limited outside Roseau.", "Food: Fresh produce and seafood availability varies by season. Ask about ingredients and dietary needs; check service charge before tipping."],
      [source("Dominica Ministry of Health", "https://health.gov.dm/"), source("Discover Dominica visitor information", "https://discoverdominica.com/")]
    ),
    socialCode: stage(
      "Ask before photographing people or private property. At home, follow host cues on shoes and gifts; observe conservation rules at rivers and trails.",
      ["Visits: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead.", "Community and nature: Ask permission before photographing people or community events. Follow local trail, river, and protected-area rules.", "Language: English is official and Kwéyòl is also used. A polite greeting and asking which language is preferred are good defaults."],
      [source("Discover Dominica cultural and visitor information", "https://discoverdominica.com/")]
    )
  },
  DO: {
    preArrival: stage(
      "Santo Domingo (SDQ) and Punta Cana (PUJ) serve different regions; compare flights with Google Flights/Skyscanner and check Dominican entry/e-ticket requirements.",
      ["Flight routing: SDQ serves the capital; PUJ, STI, and other airports reduce ground travel to resort regions. Compare airport location as well as airfare.", "Entry: Visa rules and tourist-card/e-ticket requirements depend on nationality and itinerary. Check Dirección General de Migración and complete official arrival/departure forms as required.", "Climate and packing: Tropical heat, hurricane season, and mountain conditions vary by region. Monitor weather advisories and pack sun/rain protection."],
      [source("Dominican Republic Migration Directorate", "https://migracion.gob.do/"), source("Dominican Republic e-ticket", "https://eticket.migracion.gob.do/"), source("Aerodom airports", "https://aerodom.com/")]
    ),
    arrival24h: stage(
      "Dominican Republic uses 120 V / 60 Hz Type A/B sockets and pesos (DOP). Check SIM coverage, ATM fees, and official airport ride pickup before arrival.",
      ["Power: 120 V / 60 Hz, Type A and B sockets. Check device voltage and adapter compatibility.", "Connectivity and money: DOP is local currency; USD may be accepted in visitor areas. Check exchange rate, card fees, and local SIM registration; retain small pesos for transport.", "Airport transfer: SDQ, PUJ, and STI have separate transport systems. Use airport-authorized taxis or verified app pickup; confirm fare and destination before departure."],
      [plugs("dominican-republic"), source("Aerodom passenger information", "https://aerodom.com/"), source("Dominican Republic e-ticket", "https://eticket.migracion.gob.do/")]
    ),
    mobility: stage(
      "Santo Domingo has Metro, OMSA buses, and shared guaguas; intercity coaches serve major cities. Use current operator information and verify routes outside the capital.",
      ["Santo Domingo: Metro de Santo Domingo and OMSA buses serve main corridors. Check current fares, operating times, and service notices.", "Shared and intercity: Guaguas and minibuses operate on local routes; confirm destination/fare before boarding. Caribe Tours and other coaches connect major cities; verify terminal and schedule.", "Ride-hailing: Uber and local apps operate in major cities. Confirm vehicle and pickup in-app; heat, traffic, and sidewalk gaps affect walking."],
      [source("Metro de Santo Domingo", "https://www.metrosantodomingo.com/"), source("OMSA", "https://omsa.gob.do/"), source("Caribe Tours", "https://caribetours.com.do/")]
    ),
    dailyLiving: stage(
      "PedidosYa and Uber Eats cover many urban addresses; confirm zone. Use bottled water unless local authorities/accommodation confirm tap-water guidance.",
      ["Delivery: PedidosYa, Uber Eats, and local grocery services serve some cities; check exact address, phone, and payment in-app.", "Water and pharmacy: Use sealed or treated water if unsure. Pharmacies are common in cities but stock varies; bring essential medicines in original packaging and verify import rules.", "Payments and food: DOP cash is useful; card acceptance varies by merchant. Ask about ingredients/allergens and check receipts for service charges."],
      [source("PedidosYa Dominican Republic", "https://www.pedidosya.com.do/"), source("Uber Eats Dominican Republic", "https://www.ubereats.com/do"), source("Dominican Republic tourism", "https://www.godominicanrepublic.com/")]
    ),
    socialCode: stage(
      "Use a courteous greeting, ask before photographing people, and follow host cues on shoes and gifts. Customs vary between city, resort, and rural settings.",
      ["Language and greetings: Spanish is the main language. Begin politely and ask if English or another language is preferred.", "Home visits: Ask whether to remove shoes and whether a small food gift is welcome; follow the host's lead.", "Photography: Ask permission before taking portraits or photographing private property. Follow posted rules at churches and heritage sites."],
      [source("Dominican Republic tourism visitor information", "https://www.godominicanrepublic.com/")]
    )
  },
  GD: {
    preArrival: stage(
      "Maurice Bishop International (GND) serves Grenada; compare regional flights and ferry links. Entry requirements depend on nationality and stay length.",
      ["Flight routing: GND serves Grenada; Carriacou uses smaller aircraft and ferry connections. Compare regional carriers with broad flight search and include island transfer time.", "Entry: Check Grenada Immigration for nationality-specific visa, passport, and onward travel requirements.", "Climate and packing: Tropical weather and storm season can disrupt air/ferry travel. Check forecasts and advisories; pack sun/rain protection and hiking shoes."],
      [source("Grenada government", "https://gov.gd/"), source("Maurice Bishop International Airport", "https://mbiagrenada.com/"), source("Grenada Tourism Authority", "https://www.puregrenada.com/")]
    ),
    arrival24h: stage(
      "Grenada uses 230 V / 50 Hz Type G sockets and East Caribbean dollars. Confirm airport taxi, SIM, and inter-island ferry arrangements before landing.",
      ["Power: 230 V / 50 Hz, Type G sockets. Check device compatibility and adapter.", "Connectivity and money: XCD is local currency; card acceptance and mobile coverage vary outside St George's. Keep cash and check roaming.", "Airport transfer: Use marked taxi services at GND or arrange hotel pickup. Confirm fare and destination; Carriacou ferry connections depart from a separate port."],
      [plugs("grenada"), source("Maurice Bishop Airport passenger information", "https://mbiagrenada.com/"), source("Grenada Tourism Authority", "https://www.puregrenada.com/")]
    ),
    mobility: stage(
      "Grenada uses minibuses, taxis, and ferries; there is no extensive rail/metro system. Check route and return timing before leaving St George's.",
      ["Minibuses: Shared vans connect St George's with many parishes; ask about route, fare, and last departure locally.", "Island links: Ferries serve Carriacou and Petite Martinique; schedules may be affected by weather. Confirm the operator and port before travel.", "Taxis and walking: Agree fares before boarding. Roads can be steep and lack sidewalks; use caution and plan for rain/heat."],
      [source("Grenada Tourism Authority transport information", "https://www.puregrenada.com/"), source("Osprey Lines ferry", "https://www.ospreylines.com/")]
    ),
    dailyLiving: stage(
      "App delivery is limited and address-dependent; ask locally. Use accommodation water guidance and plan pharmacy access before hiking or visiting Carriacou.",
      ["Daily services: Contact restaurants or ask lodging about current delivery/grocery options; services are concentrated around towns.", "Health and water: Follow local water advisories and use sealed water if unsure. Pharmacies and clinics are limited outside populated areas; carry essential medicines.", "Food and payment: XCD cash is useful for small purchases. Ask about ingredients and check restaurant bills for service charge."],
      [source("Grenada tourism visitor information", "https://www.puregrenada.com/"), source("Grenada Ministry of Health", "https://health.gov.gd/")]
    ),
    socialCode: stage(
      "Use a friendly greeting, ask before photos, and follow host cues on footwear and gifts. At beaches and waterfalls, respect posted community and conservation rules.",
      ["Visits: Ask whether to remove shoes and whether a small food gift is welcome.", "Public settings: English is official; local Creole is also used. Ask before photographing people or private property.", "Outdoor conduct: Follow trail and marine-protection notices; customs vary between Grenada and its sister islands."],
      [source("Grenada Tourism Authority visitor information", "https://www.puregrenada.com/")]
    )
  },
  HT: {
    preArrival: stage(
      "FCDO advises against all travel to Haiti as of 2026-11-02. Do not treat this as a routine itinerary; verify current security, entry, and departure conditions before any travel.",
      ["Current advisory: FCDO advises against all travel to Haiti because of the volatile security situation and severely limited consular support.", "Entry: Haiti's Foreign Affairs Ministry announced that the electronic I-Kat traveller form is mandatory for people travelling to or from Haiti from 1 October 2026. Confirm the latest instructions, passport-specific requirements, and airline boarding rules before departure.", "Preparation: Confirm accommodation, ground transport, communications, medical access, and contingency plans directly with trusted local contacts. Do not rely on generic schedules or app coverage."],
      [source("FCDO Haiti entry requirements", "https://www.gov.uk/foreign-travel-advice/haiti/entry-requirements"), source("Haiti Ministry of Foreign Affairs traveller-form notice via its US embassy", "https://ambetatsunis.gouv.ht/missions/actualites/maec-hq-f40418ef354f98e3-avis-aux-ressortissants-haitiens-et-aux-voyageurs"), source("FCDO Haiti travel warning", "https://www.gov.uk/foreign-travel-advice/haiti"), source("Haiti tourism information", "https://haititourisme.org/")]
    ),
    arrival24h: stage(
      "Haiti uses 110 V / 60 Hz Type A/B sockets, with local variation and power interruptions. FCDO advises against all travel; airport operations and local services may change rapidly.",
      ["Power: 110 V / 60 Hz, Type A and B sockets are reported; outages and voltage variation can occur. Check lodging backup power and device requirements.", "Connectivity and money: Carrier coverage and card/ATM access are variable. Confirm working arrangements with your local contact and carry only the amount of cash needed for the planned route.", "Arrival: Airport operations and transport availability may change. Pre-arrange a trusted pickup through your accommodation/local contact and verify current official notices before departure."],
      [plugs("haiti"), source("FCDO Haiti airport and security advice", "https://www.gov.uk/foreign-travel-advice/haiti"), source("Haiti Ministry of Foreign Affairs traveller-form notice", "https://ambetatsunis.gouv.ht/missions/actualites/maec-hq-f40418ef354f98e3-avis-aux-ressortissants-haitiens-et-aux-voyageurs"), source("Haiti tourism information", "https://haititourisme.org/")]
    ),
    mobility: stage(
      "Do not assume normal public transit or ride-hailing is operating. Check current advisories and locally verified transport for each trip; avoid publishing sensitive routes.",
      ["Service status: Public transport, roads, and commercial services can be disrupted. Verify each journey with trusted local contacts and current official notices.", "Transport arrangements: If travel proceeds, use a known, pre-arranged driver and confirm route/time shortly before departure. Do not rely on an unverified app listing.", "Walking and safety: Follow local security guidance and avoid routes or times advised against by authorities. Keep plans flexible and maintain communications with your host/contact."],
      [source("Haiti Ministry of Public Works, Transport and Communications", "https://mtptc.gouv.ht/"), source("FCDO Haiti safety and transport advice", "https://www.gov.uk/foreign-travel-advice/haiti/safety-and-security")]
    ),
    dailyLiving: stage(
      "Assume delivery, pharmacy, water, and payment availability are location- and security-dependent. Confirm essentials through accommodation or trusted local contacts before travel.",
      ["Food and delivery: Do not rely on delivery apps or normal business hours without current local confirmation. Arrange meals and supplies through a trusted contact.", "Water and health: Use sealed water. Confirm clinic/pharmacy operating status and bring essential medication in original packaging, subject to import rules.", "Payments and connectivity: Card networks, ATMs, mobile service, and cash availability can be disrupted. Confirm lawful, safe payment arrangements and carry contingency supplies appropriate to official advice."],
      [source("Haiti Ministry of Public Health", "https://mspp.gouv.ht/"), source("FCDO Haiti health advice", "https://www.gov.uk/foreign-travel-advice/haiti/health")]
    ),
    socialCode: stage(
      "Follow local hosts' and authorities' direction. Ask before photos; avoid photographing security activity, infrastructure, or people without consent.",
      ["Visits: Use a trusted local intermediary where appropriate. Ask about greetings, shoes, gifts, and language preferences; customs vary by household.", "Language: Haitian Creole is widely used; French is also used in formal contexts. Ask which language is preferred.", "Photography and privacy: Seek consent before photographing people or property. Respect security, privacy, and community guidance, especially during sensitive events."],
      [source("Haiti tourism information", "https://haititourisme.org/"), source("FCDO Haiti local laws and safety advice", "https://www.gov.uk/foreign-travel-advice/haiti/safety-and-security")]
    )
  },
  JM: {
    preArrival: stage(
      "Kingston (KIN) and Montego Bay (MBJ) serve different regions; compare flights and ground transfer together. Check Jamaica's passport-specific entry and immigration guidance.",
      ["Flight routing: KIN serves Kingston/east; MBJ serves the north-west resort corridor. Compare the airport with your final destination and check domestic connections for Portland or other distant areas.", "Entry: Jamaica's visa requirements and permitted stay depend on nationality and purpose. Check Passport, Immigration and Citizenship Agency guidance before travel.", "Climate and packing: Tropical heat, rainy/hurricane seasons, and mountain conditions vary. Check official weather advisories; pack sun/rain protection and suitable shoes."],
      [source("Jamaica PICA entry requirements", "https://www.pica.gov.jm/"), source("MBJ Airports", "https://www.mbjairport.com/"), source("Norman Manley International Airport", "https://nmia.aero/")]
    ),
    arrival24h: stage(
      "Jamaica uses 110 V / 50 Hz Type A/B sockets; JMD is local currency, with USD often used in visitor areas. Confirm airport pickup, SIM, and card/ATM access.",
      ["Power: 110 V / 50 Hz, Type A and B sockets. Check device input; frequency differs from some countries.", "Connectivity and money: JMD is local currency; USD is accepted by some tourist businesses, but change may be in JMD. Check mobile coverage, SIM registration, ATM fees, and card acceptance.", "Airport transfer: KIN and MBJ have separate ground transport. Use authorized taxi dispatch or a pre-arranged hotel transfer and confirm fare/destination."],
      [plugs("jamaica"), source("Norman Manley Airport passenger info", "https://nmia.aero/"), source("Sangster International Airport", "https://www.mbjairport.com/")]
    ),
    mobility: stage(
      "Kingston uses JUTC buses; Knutsford Express serves intercity coach routes. Route taxis and private taxis cover gaps; confirm stops, fares, and late return options.",
      ["Kingston: JUTC provides scheduled city bus service; check route, fare, and service notices. Coverage and hours vary by corridor.", "Intercity: Knutsford Express connects major towns and airports. Confirm terminal, seat, luggage rules, and schedule. Route taxis serve shorter local journeys but use local routes/stops.", "Taxis and walking: Use licensed/authorized operators and agree fare in advance. Sidewalks and road lighting vary; follow local safety advice."],
      [source("JUTC route information", "https://jutc.gov.jm/"), source("Knutsford Express", "https://www.knutsfordexpress.com/")]
    ),
    dailyLiving: stage(
      "Food delivery varies by city; use restaurant apps/direct ordering only after checking coverage. Ask locally about water, pharmacy hours, and service charges.",
      ["Delivery: 7Krave and restaurant-direct services are examples to check in Kingston/Montego Bay; verify the address, phone, payment, and current operating zone.", "Health and water: Follow local water notices and accommodation advice; use sealed water if uncertain. Check the duty pharmacy and bring prescribed medicines in original packaging.", "Food and payment: JMD cash is useful outside large hotels. Ask about ingredients and spice; review the bill for service charge before tipping."],
      [source("7Krave Jamaica", "https://7krave.com/"), source("Jamaica Ministry of Health", "https://www.moh.gov.jm/"), source("Visit Jamaica", "https://www.visitjamaica.com/")]
    ),
    socialCode: stage(
      "Ask before photographing people, especially children or ceremonies. At homes and churches, follow host/site guidance on clothing, shoes, and greetings.",
      ["Greetings: English and Jamaican Patois are used; ask which language is comfortable. Begin with a courteous greeting.", "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead on meals and greetings.", "Photography: Ask permission before portraits, private property, or ceremonies. Follow posted rules at churches, heritage sites, and public facilities."],
      [source("Visit Jamaica visitor information", "https://www.visitjamaica.com/")]
    )
  },
  KN: {
    preArrival: stage(
      "Robert L. Bradshaw (SKB) and Nevis (NEV) serve different islands; compare regional flights and ferry connections. Check St Kitts and Nevis entry rules by passport.",
      ["Flight routing: SKB serves St Kitts; NEV has a smaller network for Nevis. Compare regional flights with ferry transfer time and operating days included.", "Entry: Visa requirements depend on nationality and stay. Check St Kitts and Nevis Immigration before booking and verify onward/return document requirements.", "Climate and packing: Tropical heat and storm season affect flights and ferries. Monitor official weather notices and bring sun/rain protection."],
      [source("St Kitts and Nevis Immigration", "https://www.gov.kn/"), source("Robert L. Bradshaw Airport", "https://www.sknairport.com/"), source("St Kitts Tourism Authority", "https://visitstkitts.kn/")]
    ),
    arrival24h: stage(
      "St Kitts and Nevis uses 230 V / 60 Hz Type D/G sockets and East Caribbean dollars. Confirm SIM, airport taxi, and ferry details before landing.",
      ["Power: 230 V / 60 Hz, Type D and G sockets. Check device compatibility and adapter.", "Connectivity and money: XCD is local; cards and mobile signal vary by island. Keep cash for small vendors and check roaming.", "Arrival: SKB and NEV have separate taxi and transfer options. Use marked services and confirm fare; ferry terminals are separate and schedules can change."],
      [plugs("saint-kitts-and-nevis"), source("St Kitts airport passenger information", "https://www.sknairport.com/"), source("St Kitts Nevis Ferry", "https://www.sknferry.com/")]
    ),
    mobility: stage(
      "Local buses and taxis serve St Kitts/Nevis; the inter-island ferry links Basseterre and Charlestown. Confirm return schedules and last service.",
      ["On-island: Public buses run on major roads, with route and frequency varying. Ask locally about stops and last departures; taxis are available at visitor hubs.", "Between islands: Ferry service connects Basseterre and Charlestown. Confirm timetable, fare, port, and weather notices before planning a connection.", "Walking: Roads can be narrow with limited sidewalks. Use caution in heat and at night; confirm safe pedestrian routes locally."],
      [source("St Kitts Nevis Ferry", "https://www.sknferry.com/"), source("St Kitts tourism visitor information", "https://visitstkitts.kn/")]
    ),
    dailyLiving: stage(
      "Restaurant delivery is limited and address-specific. Ask lodging about water, groceries, and pharmacy access before visiting Nevis or remote beaches.",
      ["Delivery and shops: Contact businesses directly to confirm delivery area, phone, hours, and payment; app coverage is limited.", "Health and water: Ask accommodation about local water advice and the nearest pharmacy. Bring essential prescriptions; stock is limited outside main towns.", "Money and dining: XCD is used; USD may be accepted in tourist businesses. Check menus for allergens and the bill for service charge."],
      [source("St Kitts tourism information", "https://visitstkitts.kn/"), source("Nevis tourism information", "https://www.nevisisland.com/")]
    ),
    socialCode: stage(
      "Use a courteous greeting, ask before photography, and follow host cues on shoes and gifts. Island customs vary between St Kitts and Nevis.",
      ["Home visits: Ask whether to remove shoes and whether a small food gift is welcome.", "Public settings: English is official. Ask permission before photographing people or private property.", "Inter-island: Follow local rules at beaches, churches, and community events; customs differ by household."],
      [source("St Kitts tourism visitor information", "https://visitstkitts.kn/"), source("Nevis tourism information", "https://www.nevisisland.com/")]
    )
  },
  LC: {
    preArrival: stage(
      "Hewanorra (UVF) serves the south; George F. L. Charles (SLU) serves Castries. Compare flights with the full island transfer included and check entry rules by passport.",
      ["Flight routing: UVF is the main international gateway; SLU serves regional flights near Castries. Select airport based on lodging region and transfer time.", "Entry: Saint Lucia's visa and stay rules depend on nationality and trip details. Check Immigration or the government portal before booking.", "Climate and packing: Tropical heat, rain, and storm season affect ferry/road plans. Check forecasts and pack rain/sun protection and hiking shoes."],
      [source("Saint Lucia Immigration", "https://www.govt.lc/"), source("Saint Lucia Air and Sea Ports Authority", "https://www.slaspa.com/"), source("Saint Lucia Tourism Authority", "https://www.stlucia.org/")]
    ),
    arrival24h: stage(
      "Saint Lucia uses 240 V / 50 Hz Type G sockets and East Caribbean dollars. Check which airport you arrive at and arrange a taxi/shuttle to your region.",
      ["Power: 240 V / 50 Hz, Type G sockets. Check appliance input before use.", "Connectivity and money: XCD is local; USD may be accepted in tourist businesses. Confirm SIM/roaming and card acceptance outside Castries.", "Airport transfer: UVF and SLU serve different coasts and are not interchangeable. Use authorized taxi dispatch or hotel transfer; confirm fare and route."],
      [plugs("saint-lucia"), source("SLASPA airport passenger information", "https://www.slaspa.com/"), source("Saint Lucia Tourism Authority", "https://www.stlucia.org/")]
    ),
    mobility: stage(
      "Minibuses and taxis connect towns; there is no rail/metro. Road travel is winding, so plan extra time between airports, resorts, and trailheads.",
      ["Minibuses: Shared buses run on major routes from Castries, with reduced evening/weekend service. Confirm route, fare, and last return locally.", "Taxis and tours: Use licensed taxis or hotel-arranged transfers; agree the fare in advance. Road routes are narrow and mountainous; driving times exceed map estimates.", "Walking: Sidewalks are limited outside town centres. Use caution on roads and carry water in heat."],
      [source("Saint Lucia Tourism Authority transport guidance", "https://www.stlucia.org/"), source("SLASPA", "https://www.slaspa.com/")]
    ),
    dailyLiving: stage(
      "Delivery is town-specific; confirm by phone or app. Use local water guidance and plan pharmacy access before rural hikes or resort transfers.",
      ["Delivery: Restaurants may deliver locally, but nationwide app coverage is limited. Confirm address, hours, and payment directly.", "Health and water: Follow accommodation/utility guidance and use sealed water if uncertain. Pharmacies are concentrated in towns; bring essential medicines.", "Food and money: XCD is local currency. Ask about ingredients and allergens; check receipt for service charges and tip at your discretion."],
      [source("Saint Lucia Tourism Authority visitor information", "https://www.stlucia.org/"), source("Saint Lucia Ministry of Health", "https://health.govt.lc/")]
    ),
    socialCode: stage(
      "Ask before photographing people or private property. At churches and homes, follow local cues on dress, footwear, and greetings.",
      ["Visits: Ask whether shoes should be removed and whether a small food gift is welcome.", "Public sites: Dress respectfully at religious sites and obey posted photography rules.", "Language: English is official; Kwéyòl is also used. Start politely and ask which language is preferred."],
      [source("Saint Lucia Tourism Authority cultural information", "https://www.stlucia.org/")]
    )
  },
  VC: {
    preArrival: stage(
      "Argyle (SVD) serves St Vincent; Bequia, Canouan, and Union Island use smaller airports/ferries. Check regional routes, entry rules, and weather before island-hopping.",
      ["Flight routing: SVD is the international gateway; Grenadines trips need regional flights or ferry links. Compare flight and ferry connections with weather buffers included.", "Entry: Visa rules depend on nationality and purpose. Check Saint Vincent and the Grenadines Immigration/government guidance before booking.", "Climate and packing: Tropical heat and storm season affect ferries and small aircraft. Monitor weather notices and pack sun/rain protection."],
      [source("SVG Immigration Department", "https://www.gov.vc/"), source("Argyle International Airport", "https://www.svg-airport.com/"), source("SVG Tourism Authority", "https://discoversvg.com/")]
    ),
    arrival24h: stage(
      "SVG uses 230 V / 50 Hz Type A/C/E/G sockets and East Caribbean dollars. Confirm SIM/ATM access and the exact island transfer after arrival.",
      ["Power: 230 V / 50 Hz, Types A, C, E, and G are reported. Check outlet/device compatibility and adapter.", "Connectivity and money: XCD is local; card/ATM and mobile coverage vary among islands. Carry cash and check roaming.", "Arrival: SVD and Grenadines airports have different transfers. Confirm taxi, ferry port, and sailing with the operator; weather can disrupt service."],
      [plugs("saint-vincent-and-the-grenadines"), source("Argyle Airport passenger information", "https://www.svg-airport.com/"), source("SVG ferry information", "https://www.svgferry.com/")]
    ),
    mobility: stage(
      "Minibuses and taxis serve St Vincent; ferries and small aircraft connect the Grenadines. Confirm same-day return options before leaving a hub island.",
      ["St Vincent: Shared minibuses and taxis connect Kingstown with major settlements; ask about route and last return.", "Grenadines: Ferry and inter-island flights operate on separate schedules. Check operator notices, port, baggage, and weather before connecting.", "Walking: Roads can be steep with limited sidewalks. Use caution in rain and heat; plan transfers for remote beaches and trails."],
      [source("SVG ferry schedules", "https://www.svgferry.com/"), source("SVG Tourism Authority transport information", "https://discoversvg.com/")]
    ),
    dailyLiving: stage(
      "Online delivery is limited beyond Kingstown; confirm local service. Ask accommodation about water, groceries, and pharmacy access on smaller islands.",
      ["Daily services: Call local restaurants/shops to check delivery, hours, and payment. App coverage is limited on outer islands.", "Health and water: Follow local water guidance and use sealed water if unsure. Carry essential medications; pharmacy stock is limited outside Kingstown.", "Money and food: XCD cash is useful for local transport and smaller vendors. Ask about ingredients/allergens and review service charges."],
      [source("SVG Tourism Authority visitor information", "https://discoversvg.com/"), source("SVG Ministry of Health", "https://health.gov.vc/")]
    ),
    socialCode: stage(
      "Ask before photographing people or homes; follow host guidance on shoes and gifts. Island customs and language preferences vary.",
      ["Home visits: Ask whether to remove shoes and whether a small food gift is appropriate.", "Communication: English is official; local speech includes Vincentian Creole. Use a polite greeting and ask which language is preferred.", "Photography and nature: Ask permission before portraits and respect trail, beach, and marine-protection notices."],
      [source("SVG Tourism Authority cultural information", "https://discoversvg.com/")]
    )
  },
  TT: {
    preArrival: stage(
      "Piarco (POS) serves Trinidad; ANR serves Tobago. Compare Caribbean Airlines and regional connections with Google Flights/Skyscanner; check entry rules by passport.",
      ["Flight routing: POS is the main international hub; ANR serves Tobago. Compare fare plus inter-island flight/ferry costs and confirm the terminal and baggage with the carrier.", "Entry: Visa and stay rules depend on nationality, purpose, and route. Check Trinidad and Tobago Immigration before purchase.", "Climate and packing: Tropical climate and rainy season can affect flights/ferries. Check weather advisories; pack sun/rain protection and light layers."],
      [source("Trinidad and Tobago Immigration Division", "https://immigration.gov.tt/"), source("Airports Authority of Trinidad and Tobago", "https://tntairports.com/"), source("Caribbean Airlines", "https://www.caribbean-airlines.com/")]
    ),
    arrival24h: stage(
      "Trinidad and Tobago uses 115 V / 60 Hz Type A/B sockets; TTD is local currency. Check POS/ANR transfer options and mobile-wallet/card terms.",
      ["Power: 115 V / 60 Hz, Type A and B sockets. Check device voltage and adapter fit.", "Connectivity and money: TTD is local; card acceptance is common in many businesses but carry cash for taxis/small vendors. Confirm SIM, roaming, ATM fees, and Mobile Money access.", "Airport transfer: POS and ANR have separate ground transport; check the airport's current taxi/bus service. The inter-island ferry uses a separate Port of Spain terminal; verify transfer time."],
      [plugs("trinidad-and-tobago"), source("Piarco Airport passenger information", "https://tntairports.com/"), source("TT Inter-Island ferry", "https://www.ttitferry.com/")]
    ),
    mobility: stage(
      "Port of Spain uses PTSC buses, maxi-taxis, and route taxis; ferries and domestic flights connect Tobago. Routes and fares are local—confirm before boarding.",
      ["Public transport: PTSC buses and privately operated maxi-taxis serve major routes. Confirm route, stop, fare, and operating hours locally.", "Between islands: The Port of Spain–Scarborough ferry and domestic flights connect Trinidad and Tobago. Check current operator schedules and weather notices.", "Ride-hailing and walking: App service availability varies; use official pickup points and verify driver/vehicle. Sidewalks and crossings vary by district."],
      [source("PTSC Trinidad and Tobago", "https://ptsc.co.tt/"), source("TT Inter-Island ferry schedules", "https://www.ttitferry.com/"), source("Airports Authority of Trinidad and Tobago", "https://tntairports.com/")]
    ),
    dailyLiving: stage(
      "FoodDrop, restaurants, and local grocery services are address-dependent. Ask about water advisories and pharmacy opening hours for your area.",
      ["Delivery: FoodDrop and restaurant-direct services may serve Port of Spain and larger towns; confirm exact address, payment, and hours.", "Health and water: Follow WASA water notices and accommodation guidance. Use bottled water if uncertain; check the local pharmacy rota and carry essential medicines.", "Payments and food: TTD, cards, and local mobile wallets are used differently by business. Ask about ingredients and allergens; check the receipt for service charge."],
      [source("FoodDrop Trinidad and Tobago", "https://fooddrop.co.tt/"), source("Water and Sewerage Authority Trinidad and Tobago", "https://www.wasa.gov.tt/"), source("Tourism Trinidad", "https://www.tourismtnt.com/")]
    ),
    socialCode: stage(
      "Trinidad and Tobago is culturally diverse; ask before photos and follow host cues on greetings, gifts, and shoes. Follow event and religious-site guidance.",
      ["Greetings and language: English is official, with local Creole widely spoken. A courteous greeting is a good start; ask which language is preferred.", "Home visits: Ask about footwear and whether a small food gift is welcome. Customs vary by household and religious practice.", "Photography: Ask before photographing people, homes, or religious events. Observe local event, beach, and heritage-site rules."],
      [source("Tourism Trinidad and Tobago visitor information", "https://www.tourismtnt.com/")]
    )
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing Americas destination: ${iso}`);
  for (const stageName of ["preArrival", "arrival24h", "mobility", "dailyLiving", "socialCode"]) {
    destination.stages[stageName] = { ...destination.stages[stageName], ...update[stageName] };
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);