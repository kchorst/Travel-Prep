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
  BR: {
    preArrival: stage(
      "Compare Google Flights or Skyscanner with Brazil-focused Decolar, then book/check the operating airline. Brazil is large: choose an airport for the actual region you plan to visit.",
      [
        "Flight routing: Brasília (BSB) is a central hub; São Paulo (GRU/CGH), Rio (GIG/SDU), and other regional airports serve different itineraries. Use Google Flights/Skyscanner for broad comparisons and Decolar for Brazil-focused booking; verify baggage, airport, and connection terms with the airline.",
        "Entry rules: Visa and eVisa requirements depend on nationality, passport, purpose, and date. Check Brazil's Ministry of Foreign Affairs and consular guidance before payment; do not infer eligibility from an OTA listing.",
        "Climate and packing: Brazil spans equatorial, tropical, highland, and subtropical climates. Check the weather for each state and season; pack sun/rain protection and light layers."
      ],
      [source("Brazil Ministry of Foreign Affairs consular portal", "https://www.gov.br/mre/pt-br/assuntos/portal-consular"), source("Brasília Airport", "https://www.bsb.aero/"), source("Decolar Brazil flight search", "https://www.decolar.com/voos/")]
    ),
    arrival24h: stage(
      "Brazil uses Type N sockets; voltage is commonly 127 or 220 V at 60 Hz depending on location. PIX is widely used, but visitor access depends on a Brazilian account/provider.",
      [
        "Power: Type N sockets; 127/220 V at 60 Hz, depending on city and property. Check appliance input labels and the accommodation's local supply. A plug adapter does not convert voltage.",
        "Connectivity and payments: Confirm roaming/eSIM coverage with your carrier. PIX is ubiquitous domestically, but visitors may not be able to register without local banking access; retain an international card and some BRL cash.",
        "Arrival transfer: Airports and city transport differ widely. Check the airport's official ground-transport page, use marked taxi/ride-hailing pickup points, and confirm the fare and destination before leaving."
      ],
      [plugs("brazil"), source("Brazilian Central Bank PIX information", "https://www.bcb.gov.br/estabilidadefinanceira/pix"), source("Brasília Airport passenger information", "https://www.bsb.aero/")]
    ),
    mobility: stage(
      "Brasília relies on metro and buses; other cities have their own systems. For intercity travel, compare airline routes with bus operators such as ClickBus.",
      [
        "Brasília: Metro-DF and city buses connect major districts; confirm route, hours, and ticket options with the operator. Distances and superblocks make some journeys longer on foot than the map suggests.",
        "Other cities and long-distance travel: São Paulo, Rio, and other capitals have distinct metro/BRT systems. Compare flights with coach routes and current bus operators; confirm the departure terminal and baggage rules.",
        "Ride-hailing: Uber and 99 are common in many urban areas, but coverage varies. Check the registered plate and pickup point in-app; use marked crossings and account for heat and uneven sidewalks."
      ],
      [source("Brasília Metro (Metrô-DF)", "https://www.metro.df.gov.br/"), source("ClickBus Brazil", "https://www.clickbus.com.br/")]
    ),
    dailyLiving: stage(
      "iFood and Rappi cover many urban addresses; check the exact zone. PIX, tap water, pharmacies, and comida por quilo practices vary by location and venue.",
      [
        "Delivery and shopping: iFood and Rappi are widely used in larger cities; enter the exact address and check phone/payment requirements. Mercado Livre is a major marketplace, but delivery times depend on region.",
        "Food and payment: PIX is a domestic instant-payment rail; use only a payment method you can lawfully register. Comida por quilo restaurants charge by weight; check how tare is handled and the posted price per kilogram.",
        "Health and water: Tap-water quality and infrastructure vary by municipality/building. Ask locally and use sealed or treated water if uncertain. Bring prescriptions in original packaging and verify import rules."
      ],
      [source("iFood Brazil", "https://www.ifood.com.br/"), source("Rappi Brazil", "https://www.rappi.com.br/"), source("Brazil tourism information", "https://visitbrasil.com/")]
    ),
    socialCode: stage(
      "Portuguese is the national language. Ask before photographing people; follow local cues on greetings, footwear, religious sites, and shared dining.",
      [
        "Greetings and language: Brazilian Portuguese is used nationwide, with regional variation. A friendly greeting is common, but physical contact preferences differ; follow the other person's lead.",
        "Home and dining: Ask whether to remove shoes and whether to bring something for the host. At shared meals, ask about dietary needs and follow the host's serving style.",
        "Photography: Ask permission before photographing people, homes, or ceremonies. Follow posted rules at religious and heritage sites; avoid broad claims about one national etiquette."
      ],
      [source("Brazil tourism information", "https://visitbrasil.com/")]
    )
  },
  VN: {
    preArrival: stage(
      "For Southeast Asian low-cost combinations, compare AirAsia MOVE and Traveloka with Google Flights/Skyscanner; these are booking/search platforms, not the airlines. Apply only through Vietnam's current government e-visa domain.",
      [
        "Flight routing: Hanoi (HAN) and Ho Chi Minh City (SGN) are the principal gateways; Da Nang (DAD) is useful for central Vietnam. AirAsia MOVE and Traveloka help compare regional options; confirm each leg with the operating airline. Vietnam's immigration portal announced a move to evisa.gov.vn and thithucdientu.gov.vn; use the current official domain.",
        "Entry: E-visa eligibility, validity, and entry points depend on current rules. Check Vietnam Immigration's official portal and your visa approval details before departure; avoid third-party lookalike application sites.",
        "Climate and packing: North, central, and southern regions have different monsoon timing and temperatures. Check city-specific forecasts and storm notices; bring rain protection, breathable clothing, and modest attire for temples."
      ],
      [source("Vietnam Immigration Department e-visa portal notice", "https://evisa.xuatnhapcanh.gov.vn/"), source("Vietnam National Authority of Tourism", "https://vietnam.travel/")]
    ),
    arrival24h: stage(
      "Vietnam uses 110/220 V at 50 Hz with Type A, C, and D sockets; check the accommodation's outlet type. Carry some VND and confirm SIM/eSIM registration options.",
      [
        "Power: 110/220 V at 50 Hz; Type A, C, and D sockets are reported. Supply varies by location/building. Check device input and use an adapter; it does not convert voltage.",
        "Connectivity and payments: Check local SIM/eSIM requirements and roaming before landing. QR wallets such as MoMo and ZaloPay are primarily domestic; do not assume visitors can activate them. Keep Vietnamese dong (VND) and a card backup.",
        "Airport transfer: Hanoi and Ho Chi Minh City airports have official bus, taxi, and app pickup options. Confirm the airport, pickup zone, and current route; use an official counter or verified in-app vehicle."
      ],
      [plugs("vietnam"), source("Vietnam Immigration Department", "https://evisa.gov.vn/"), source("Noi Bai International Airport", "https://noibaiairport.vn/en")]
    ),
    mobility: stage(
      "Hanoi and Ho Chi Minh City have metro lines alongside buses; Grab, Be, and Xanh SM operate in many cities. Intercity trains use Vietnam Railways booking.",
      [
        "City transit: Hanoi and Ho Chi Minh City have metro services alongside buses; routes, hours, and fare systems are still expanding. Use the local operator or station signage for current information.",
        "Ride-hailing and informal travel: Grab, Be, and Xanh SM are options in major urban areas; confirm vehicle details and fare in-app. Xe ôm motorcycle taxis may be app-booked or negotiated; agree terms before riding.",
        "Intercity and walking: Vietnam Railways sells official train tickets; check station names and travel time. Sidewalks can be occupied by parked motorbikes; cross slowly and predictably at marked points."
      ],
      [source("Vietnam Railways booking", "https://dsvn.vn/"), source("Hanoi Metro", "https://metrohanoi.vn/"), source("Ho Chi Minh City Metro", "https://maur.hochiminhcity.gov.vn/")]
    ),
    dailyLiving: stage(
      "GrabFood and ShopeeFood cover many city addresses; confirm coverage in-app. Use bottled water unless local accommodation gives reliable advice for that building.",
      [
        "Delivery: GrabFood and ShopeeFood are common urban options. Coverage, phone-number requirements, cash/card support, and operating hours depend on exact address.",
        "Water and pharmacy: Do not assume tap water is potable. Use sealed bottled water or suitable treatment. Pharmacies are common in cities, but bring essential medicine in original packaging and verify import rules.",
        "Food and payment: Cash in VND remains useful alongside cards and domestic wallets. Ask about ingredients, spice, and allergens. Buffet terms and refill rules are venue-specific."
      ],
      [source("Grab Vietnam", "https://www.grab.com/vn/en/food/"), source("ShopeeFood Vietnam", "https://shopeefood.vn/"), source("Vietnam tourism information", "https://vietnam.travel/")]
    ),
    socialCode: stage(
      "At temples, dress modestly and remove shoes where instructed. Ask before photographing people; use two hands when offering or receiving items if that is the host's cue.",
      [
        "Temples and homes: Follow posted footwear and clothing rules. Ask whether to remove shoes in a home and follow the host's lead.",
        "Dining and gifts: Ask about dietary needs and observe how shared dishes are served. A small food gift may be welcome, but ask about preferences and avoid assumptions about taboos.",
        "Photography and greetings: Ask permission before photographing people or ceremonies. Greetings vary by age and setting; a polite verbal greeting is a safe default."
      ],
      [source("Vietnam tourism information", "https://vietnam.travel/")]
    )
  },
  TH: {
    preArrival: stage(
      "For Southeast Asia, compare AirAsia MOVE and Traveloka with Google Flights/Skyscanner; Scoot is an airline, not a search engine. Check Thailand e-Visa eligibility by passport.",
      [
        "Flight search and routing: Bangkok (BKK/DMK) is the main hub; Chiang Mai, Phuket, and other cities serve regional trips. AirAsia MOVE and Traveloka are regional booking platforms; Scoot is a carrier. Compare with Google Flights/Skyscanner, then check baggage and airport with the airline.",
        "Entry: Thailand's e-Visa application is online, but eligibility and required documents depend on nationality and current policy. Use the official Thai e-Visa portal and the relevant embassy; do not assume visa-on-arrival or visa-free access.",
        "Climate and packing: Hot/humid conditions year-round, with regional monsoon and cooler northern-season variation. Check forecasts, heat and air-quality alerts; pack rain protection and modest temple clothing."
      ],
      [source("Thai e-Visa", "https://www.thaievisa.go.th/"), source("AirAsia MOVE", "https://www.airasia.com/"), source("Traveloka Thailand", "https://www.traveloka.com/en-th/")]
    ),
    arrival24h: stage(
      "Thailand uses 220 V / 50 Hz with Type A, B, C, F, and O sockets; bring a compatible adapter. PromptPay is domestic infrastructure, not guaranteed for visitors.",
      [
        "Power: 220 V / 50 Hz; Type A, B, C, F, and O socket patterns are reported. Check your accommodation and device labels; an adapter does not convert voltage.",
        "Connectivity and payments: Buy a SIM/eSIM through a recognized provider and check registration requirements. PromptPay QR is common domestically, but visitors may not be able to link it; keep THB cash and an international card.",
        "Airport transfers: Bangkok BKK and DMK have separate rail, bus, and taxi options. Check Airports of Thailand and the airport's current transport page; use marked taxi queues or official app pickup zones."
      ],
      [plugs("thailand"), source("Airports of Thailand", "https://www.airportthai.co.th/"), source("Thai e-Visa", "https://www.thaievisa.go.th/")]
    ),
    mobility: stage(
      "Bangkok combines BTS, MRT, buses, and boats; Rabbit and stored-value products are not universally interchangeable. Grab, Bolt, and local motorcycle taxis cover many urban areas.",
      [
        "Bangkok: BTS, MRT, Airport Rail Link, river boats, and buses use distinct operators and ticket rules. Check current routes and which cards/payment methods are accepted before transferring.",
        "Ride-hailing: Grab and Bolt are available in many cities; use the app pickup point and check vehicle/plate. Motorcycle taxis are useful for short trips but helmets and road conditions matter.",
        "Intercity: Trains, coaches, and domestic flights connect regions. Book through the official operator or recognized provider and verify station/airport, especially for overnight services."
      ],
      [source("BTS Skytrain", "https://www.bts.co.th/eng/"), source("Mass Rapid Transit Authority", "https://www.mrta.co.th/en"), source("State Railway of Thailand", "https://www.railway.co.th/")]
    ),
    dailyLiving: stage(
      "LINE MAN and GrabFood serve many urban areas; check exact-address coverage. Water, pharmacy, alcohol-sale hours, and payment access vary by location and rules.",
      [
        "Delivery and shopping: LINE MAN and GrabFood are common city examples; confirm address, phone, cash/card options, and operating hours in-app. 7-Eleven is widespread but not every branch stocks the same products.",
        "Water and pharmacy: Use sealed or reliably filtered water unless your accommodation confirms local guidance. Pharmacies are common in cities; check prescription rules for medicines you bring.",
        "Food and payment: Ask about spice, fish sauce, allergens, and dietary needs. Alcohol sales are subject to Thai law and local restrictions; check current rules and posted hours rather than relying on old summaries."
      ],
      [source("LINE MAN", "https://lineman.line.me/"), source("Grab Thailand", "https://www.grab.com/th/en/food/"), source("Tourism Authority of Thailand", "https://www.tourismthailand.org/")]
    ),
    socialCode: stage(
      "At temples, cover shoulders and knees and remove shoes where directed. Avoid touching people's heads or pointing feet at sacred images; ask before photos.",
      [
        "Temples: Follow posted dress rules, remove shoes where instructed, and observe signs restricting photography or access. Keep feet pointed away from Buddha images and altars.",
        "Greetings and public conduct: A wai may be appropriate, but context varies; a polite verbal greeting is also fine. Keep interactions respectful and avoid confrontations in public.",
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Customs differ by household; follow the host's lead."
      ],
      [source("Tourism Authority of Thailand visitor information", "https://www.tourismthailand.org/")]
    )
  },
  LA: {
    preArrival: stage(
      "For Laos, compare flights via Bangkok or Hanoi with Google Flights/Skyscanner; AirAsia MOVE and Traveloka can help stitch regional legs. Check Laos e-Visa eligibility by nationality.",
      [
        "Flight routing: Vientiane (VTE) is the main gateway; Luang Prabang (LPQ) and Pakse (PKZ) serve regional itineraries. Compare broad search with AirAsia MOVE/Traveloka for Southeast Asian connections, then verify routes with Lao Airlines and the operating carrier.",
        "Entry: Laos e-Visa eligibility, ports of entry, and stay conditions are passport-specific. Check the official eVisa portal before booking and use only listed border checkpoints.",
        "Climate and packing: Tropical monsoon climate, with hot/rainy and cooler/drier periods; northern highlands can be cooler. Check forecasts, bring rain protection and modest temple clothing."
      ],
      [source("Lao eVisa", "https://laoevisa.gov.la/"), source("Lao Airlines", "https://laoairlines.com/"), source("Laos tourism information", "https://www.tourismlaos.org/")]
    ),
    arrival24h: stage(
      "Laos uses 230 V / 50 Hz and Type A, B, C, E, and F sockets; check the specific lodging outlet. Keep kip cash for small payments and network outages.",
      [
        "Power: 230 V / 50 Hz; Type A, B, C, E, and F outlets are reported. Check the plug at your lodging and device label; an adapter does not convert voltage.",
        "Connectivity and money: Check roaming/SIM availability and registration. The Lao kip (LAK) is local currency; cash is useful, especially outside Vientiane. Card and wallet acceptance is venue-dependent.",
        "Airport transfer: VTE and LPQ have local transfer options that change. Confirm the airport's current passenger information, use marked taxi counters or hotel-arranged transport, and agree the fare before departure."
      ],
      [plugs("laos"), source("Lao Airlines", "https://laoairlines.com/"), source("Lao eVisa", "https://laoevisa.gov.la/")]
    ),
    mobility: stage(
      "Vientiane mainly uses buses and taxis; Loca ride-hailing coverage is city-specific. Laos-China Railway is useful for major north-south stops; book through official channels.",
      [
        "Vientiane: City buses serve selected corridors; check current timetables and payment locally. Loca is a local ride app, but coverage depends on location and network access.",
        "Intercity: Laos-China Railway connects Vientiane with northern destinations; confirm current timetable, station, ticket name, and boarding rules through the official railway/booking channel. Coaches serve other routes.",
        "Walking: Heat, limited sidewalks, and traffic can make walking difficult outside central districts. Plan short routes, use marked crossings, and avoid assuming rural transport runs frequently."
      ],
      [source("Laos-China Railway booking", "https://www.laostrainticket.com/"), source("Loca Laos", "https://loca.la/")]
    ),
    dailyLiving: stage(
      "Delivery-app coverage is limited and address-dependent outside Vientiane. Use sealed or treated water and carry essential medicines for rural travel.",
      [
        "Daily services: Delivery and grocery apps have limited coverage; ask your accommodation which service currently reaches the address. Cash may be needed for small shops and transport.",
        "Health and water: Do not assume tap water is potable. Use sealed bottled or properly treated water. Pharmacies are less comprehensive outside larger towns; carry essential medication in original packaging and check import rules.",
        "Food and dining: Lao food often uses herbs, sticky rice, and shared dishes; ask about fish sauce, allergens, and spice. Service and buffet rules vary by venue; check before ordering."
      ],
      [source("Lao tourism information", "https://www.tourismlaos.org/"), source("Loca Laos services", "https://loca.la/")]
    ),
    socialCode: stage(
      "At temples, cover shoulders and knees and remove shoes where instructed. Ask before photographing people or ceremonies; follow a host's cues at home.",
      [
        "Temples and homes: Dress modestly at religious sites and remove shoes where asked. In homes, ask your host about footwear and gifts.",
        "Monastic settings: Do not touch monks without invitation; follow posted visitor rules and ask before photographing ceremonies or people.",
        "Dining and language: Lao is the primary language; English availability varies. Be courteous, ask about ingredients, and follow the host's lead on shared food."
      ],
      [source("Lao tourism information", "https://www.tourismlaos.org/")]
    )
  },
  KH: {
    preArrival: stage(
      "Use Google Flights/Skyscanner and AirAsia MOVE/Traveloka for Southeast Asian connections, then verify routes. Cambodia's official e-Visa is nationality- and checkpoint-dependent.",
      [
        "Flight routing: Phnom Penh's new Techo International Airport (KTI) is the capital gateway; Siem Reap-Angkor (SAI) serves temple-region trips. Airport and airline routes change, so confirm airport code, ground transfer, and itinerary with the carrier.",
        "Entry: Cambodia's e-Visa, visa-on-arrival, and pre-arrival registration rules depend on nationality and entry point. Check the official eVisa portal and current immigration notices; use only official portals.",
        "Climate and packing: Tropical wet/dry seasons bring heat, humidity, and heavy rain. Check forecasts and flood advisories; pack sun/rain protection and modest clothing for temples."
      ],
      [source("Cambodia eVisa", "https://www.evisa.gov.kh/"), source("Cambodia Ministry of Tourism", "https://www.tourismcambodia.com/"), source("AirAsia MOVE", "https://www.airasia.com/")]
    ),
    arrival24h: stage(
      "Cambodia uses 230 V / 50 Hz Type A, C, and G outlets. Riel and US dollars are both encountered; confirm ATM fees and carry small-denomination cash.",
      [
        "Power: 230 V / 50 Hz; Type A, C, and G sockets are reported. Check the lodging outlet and device voltage before use.",
        "Connectivity and money: Local SIMs are available from Cambodian operators; check registration and coverage. Riel (KHR) is the currency; US dollar cash is also used in many visitor transactions. Use clean small notes and confirm current acceptance.",
        "Airport transfer: Phnom Penh KTI and Siem Reap SAI are separate airports; confirm the airport code and current official ground transport before booking onward travel. Use official taxi/app pickup areas and agree the fare."
      ],
      [plugs("cambodia"), source("Cambodia eVisa", "https://www.evisa.gov.kh/"), source("Cambodia Airports passenger information", "https://www.cambodia-airports.aero/")]
    ),
    mobility: stage(
      "Phnom Penh and Siem Reap rely on buses, tuk-tuks, and app-booked rides. Grab and PassApp coverage is city-specific; confirm price and destination in-app.",
      [
        "City trips: Local buses serve selected Phnom Penh corridors; tuk-tuks and remorks fill many gaps. Grab and PassApp are common booking options in larger cities; verify the vehicle and displayed fare.",
        "Intercity: Coaches connect Phnom Penh, Siem Reap, Battambang, and border towns. Check operator, station, and arrival point; road times vary substantially.",
        "Walking and temples: Heat, traffic, and sidewalk gaps make walking tiring. At Angkor and other heritage areas, use designated paths, heed conservation notices, and plan transport between sites."
      ],
      [source("Grab Cambodia", "https://www.grab.com/kh/en/transport/"), source("Cambodia Ministry of Tourism", "https://www.tourismcambodia.com/")]
    ),
    dailyLiving: stage(
      "Nham24 and GrabFood serve parts of the larger cities; check address coverage. Use sealed water and verify pharmacy availability before rural or island trips.",
      [
        "Delivery: Nham24 and GrabFood are options in Phnom Penh and other covered cities; enter the exact address and verify hours and payment methods. Service is limited in smaller towns.",
        "Health and water: Use sealed bottled or properly treated water. Pharmacies vary in stock and opening hours; bring essential medication in original packaging and check import rules.",
        "Payment and food: Cash remains useful; ABA and Wing wallets are locally important but visitor access varies. Ask about ingredients, allergens, and spice. Buffet terms are venue-specific."
      ],
      [source("Nham24", "https://nham24.com/"), source("Grab Cambodia", "https://www.grab.com/kh/en/food/"), source("Cambodia tourism information", "https://www.tourismcambodia.com/")]
    ),
    socialCode: stage(
      "At pagodas and temples, cover shoulders and knees and remove shoes where directed. Ask before photographing people or religious spaces.",
      [
        "Temples: Follow posted clothing and photography rules, remove shoes where instructed, and avoid touching sacred objects or climbing on monuments.",
        "Home visits and dining: Ask about shoes and gifts; observe the host's lead on shared dishes. Ask about dietary needs and use serving utensils where provided.",
        "Interactions: Khmer is the national language. A polite greeting and asking permission before photography are good defaults; customs vary by household and community."
      ],
      [source("Cambodia Ministry of Tourism", "https://www.tourismcambodia.com/")]
    )
  },
  ZA: {
    preArrival: stage(
      "Compare Johannesburg, Cape Town, and Durban gateways with Google Flights/Skyscanner; check FlySafair or Airlink directly for domestic routes. Visa requirements depend on passport.",
      [
        "Flight routing: O.R. Tambo (JNB), Cape Town (CPT), and King Shaka (DUR) serve different regions. Use broad flight search, then compare FlySafair, Airlink, and full-service carriers directly for domestic legs and baggage.",
        "Entry: South African visa and eVisa eligibility depends on nationality, purpose, and port of entry. Check the Department of Home Affairs and your nearest mission before booking; do not rely on an airline or OTA summary.",
        "Climate and packing: Seasons are opposite the Northern Hemisphere; coastal, inland, and highveld weather differ. Check regional forecasts and pack sun protection, layers, and rain gear."
      ],
      [source("South Africa Department of Home Affairs", "https://www.dha.gov.za/"), source("Airports Company South Africa", "https://www.airports.co.za/"), source("FlySafair", "https://www.flysafair.co.za/")]
    ),
    arrival24h: stage(
      "South Africa uses 230 V / 50 Hz Type D, M, and N sockets; Type N is increasingly common. Check load-shedding notices, roaming, and airport transfers.",
      [
        "Power: 230 V / 50 Hz; Type D, M, and N sockets are reported, with socket availability varying by building. Check device labels and bring compatible adapters.",
        "Connectivity and payments: Check SIM/eSIM registration and roaming. Cards are widely accepted in urban retail, but retain a backup payment method. Power interruptions can affect networks and card terminals; monitor official electricity notices.",
        "Airport transfer: ACSA publishes passenger and airport information. Gautrain serves parts of the Johannesburg airport corridor; Cape Town and Durban use different bus/taxi options. Use official pickup points and verify schedules."
      ],
      [plugs("south-africa"), source("Airports Company South Africa", "https://www.airports.co.za/"), source("Gautrain airport service", "https://www.gautrain.co.za/")]
    ),
    mobility: stage(
      "Major cities have distinct systems: Gautrain, MyCiTi, Rea Vaya, and municipal buses. Minibus taxis are widely used but routes and boarding conventions are local.",
      [
        "Formal transit: Gautrain links parts of Gauteng; Cape Town's MyCiTi and Johannesburg's Rea Vaya operate city corridors. Check each system's route, fare card, hours, and service alerts.",
        "Shared travel: Minibus taxis cover many routes but use local hand signals and informal stops; ask a trusted local or choose a licensed alternative if unfamiliar. Intercity coach operators require advance station checks.",
        "Ride-hailing and walking: Uber and Bolt are available in many cities. Confirm vehicle and driver in-app and use well-lit pickup areas. Walking conditions vary substantially by district; plan routes with local advice."
      ],
      [source("Gautrain", "https://www.gautrain.co.za/"), source("MyCiTi Cape Town", "https://www.myciti.org.za/"), source("Rea Vaya Johannesburg", "https://www.reavaya.org.za/")]
    ),
    dailyLiving: stage(
      "Checkers Sixty60, Mr D, and Uber Eats are useful urban examples; availability varies by postcode. Follow municipal water and power notices at your exact stay.",
      [
        "Delivery and shopping: Checkers Sixty60, Mr D, and Uber Eats operate in covered zones; enter the exact address to confirm service and payment options. Grocery delivery is much less available outside larger urban areas.",
        "Water and health: Water advisories are local and can change. Check the municipality and accommodation for current tap-water guidance. Pharmacies are common in cities, but carry prescriptions in original packaging and check import rules.",
        "Food and alcohol: Retail hours and alcohol rules vary by province and municipality. Check posted rules and receipts; tipping depends on service and whether a charge is included."
      ],
      [source("Checkers Sixty60", "https://www.checkers.co.za/sixty60"), source("Mr D Food", "https://www.mrdfood.com/"), source("South African government services", "https://www.gov.za/")]
    ),
    socialCode: stage(
      "South Africa is multilingual and regionally diverse. Ask before photographing people; follow host cues on greetings, home customs, and language preference.",
      [
        "Language and introductions: South Africa has multiple official languages and local preferences. Ask which language a person prefers; a respectful greeting is better than assuming one norm.",
        "Home visits: Ask whether to remove shoes and whether a small gift is welcome. Dining customs differ across households; check dietary needs and follow the host's lead.",
        "Photography and safety: Ask permission before photographing people or private property. Follow site rules and local safety guidance, especially at remote or wildlife locations."
      ],
      [source("South African Tourism", "https://www.southafrica.net/za/en/")]
    )
  },
  RW: {
    preArrival: stage(
      "Compare Kigali flights via Google Flights/Skyscanner and regional carriers such as RwandAir or Ethiopian Airlines. Check the Rwanda Directorate of Immigration visa page for nationality-specific rules.",
      [
        "Flight routing: Kigali International Airport (KGL) is the main gateway. Compare regional connections with RwandAir, Ethiopian Airlines, and other carriers; verify operating airline, baggage, and layover terms.",
        "Entry: Rwanda's visa-on-arrival/eVisa arrangements and documentary requirements depend on nationality and trip purpose. Check the Directorate of Immigration or Irembo before departure, even if a general page suggests visa-on-arrival.",
        "Climate and packing: Kigali's elevation moderates temperatures; rainy seasons affect road and hiking conditions. Check forecasts for parks and highlands and pack light rain protection and layers."
      ],
      [source("Rwanda Directorate of Immigration visa information", "https://www.migration.gov.rw/"), source("Irembo visa services", "https://irembo.gov.rw/rolportal/en/web/dgie/new-visa"), source("RwandAir", "https://www.rwandair.com/")]
    ),
    arrival24h: stage(
      "Rwanda uses 230 V / 50 Hz Type C and J sockets. Kigali airport and city transport are straightforward to plan; check SIM registration and mobile-money visitor access.",
      [
        "Power: 230 V / 50 Hz, Type C and J sockets. Check device labels and bring a compatible adapter.",
        "Connectivity and payments: Check local SIM registration with MTN or Airtel. Mobile Money is widely used domestically, but visitor account access and cash-in requirements vary; carry Rwandan francs (RWF) and a card backup.",
        "Airport transfer: Kigali Airport lists passenger services; taxis and hotel transfers serve the city. Confirm pickup and fare before leaving."
      ],
      [plugs("rwanda"), source("Kigali International Airport", "https://www.kigaliairport.com/"), source("Rwanda Utilities Regulatory Authority", "https://www.rura.rw/")]
    ),
    mobility: stage(
      "Kigali uses buses, moto-taxis, and app-booked rides; Tap&Go is a local bus payment option. Use regulated, helmeted motorcycle taxis and check intercity schedules.",
      [
        "Kigali: City buses use Tap&Go smart-card payment on many services. Confirm where to obtain/top up the card and the current routes. Moto-taxis are common; choose a helmeted rider and agree destination/fare.",
        "Ride-hailing: Yego and other local services may operate in Kigali; coverage outside the capital is limited. Confirm driver, vehicle, and fare in the app.",
        "Intercity and walking: Coaches connect major towns; confirm departure terminal and timetable. Kigali's hills make walking routes longer than they appear; plan for elevation and rain."
      ],
      [source("Kigali public transport and Tap&Go", "https://tapandgo.rw/"), source("Rwanda Utilities Regulatory Authority", "https://www.rura.rw/")]
    ),
    dailyLiving: stage(
      "Vuba Vuba and local listings cover some Kigali delivery addresses; verify coverage. Ask your accommodation about water and pharmacy access before rural travel.",
      [
        "Delivery: Vuba Vuba and restaurant-specific services may be available in Kigali; check exact address, phone, and payment requirements. Expect limited coverage outside the capital.",
        "Health and water: Ask locally about tap-water advice; use sealed or treated water if uncertain. Carry essential medication in original packaging and locate the nearest pharmacy before leaving Kigali.",
        "Payments and food: RWF cash, cards, and mobile money are used differently by venue. Try local dishes such as brochettes and ask about ingredients. Tipping is optional and venue-dependent."
      ],
      [source("Vuba Vuba Rwanda", "https://vubavuba.rw/"), source("Visit Rwanda", "https://visitrwanda.com/")]
    ),
    socialCode: stage(
      "Use a polite greeting, ask before photographing people, and follow host cues at home. At memorial sites, observe posted rules and a respectful tone.",
      [
        "Greetings and visits: A courteous greeting is a good default. Ask whether to remove shoes and whether a small food gift is welcome; household customs vary.",
        "Photography and memorials: Ask permission before photographing people. Follow strict posted instructions at memorials and public institutions.",
        "Language and dining: Kinyarwanda is widely spoken alongside English, French, and Swahili. Ask which language is preferred and about dietary needs; avoid generalizing from one social setting."
      ],
      [source("Visit Rwanda visitor information", "https://visitrwanda.com/")]
    )
  },
  ET: {
    preArrival: stage(
      "Addis Ababa is Ethiopian Airlines' main hub. Check the official eVisa portal and FCDO's region-specific travel warnings before booking; several border and regional areas have restrictions.",
      [
        "Flight routing: Addis Ababa (ADD) is the principal international gateway and Ethiopian Airlines' hub; domestic services connect regional centres. Compare broad searches, then verify itinerary and baggage with the carrier.",
        "Entry: Ethiopia offers an official government eVisa for eligible travelers and purposes. Check nationality-specific requirements, entry port, and visa terms at evisa.gov.et; the government warns about fraudulent lookalike sites.",
        "Climate and packing: Addis Ababa's elevation brings cooler evenings; lowlands can be much hotter. Check region-specific forecasts, pack sun protection and layers, and verify seasonal road/park access.",
        "Regional security: FCDO advises against all travel to several regions and border zones, and against all but essential travel to parts of Afar and Somali regions. Check the exact route and current flight operations before travel."
      ],
      [source("Official Ethiopia eVisa", "https://www.evisa.gov.et/"), source("Ethiopian Airlines", "https://www.ethiopianairlines.com/"), source("FCDO Ethiopia regional travel advice", "https://www.gov.uk/foreign-travel-advice/ethiopia")]
    ),
    arrival24h: stage(
      "Ethiopia uses 220 V / 50 Hz Type C, E, F, and L sockets. Keep ETB cash; card and mobile-wallet access are more limited outside major hotels/cities.",
      [
        "Power: 220 V / 50 Hz; Type C, E, F, and L outlets are reported. Confirm outlet type at lodging and check device voltage; use a compatible adapter.",
        "Connectivity and payment: Buy a SIM from an authorized operator and check registration requirements. Telebirr is a domestic wallet; visitors may not be able to register. Carry Ethiopian birr (ETB), especially outside large hotels.",
        "Airport transfer: Bole International Airport is the main entry point. Confirm official transport or hotel pickup in advance, and agree taxi destination/fare before leaving the terminal."
      ],
      [plugs("ethiopia"), source("Ethiopian Airlines airport information", "https://www.ethiopianairlines.com/"), source("Ethio telecom", "https://www.ethiotelecom.et/")]
    ),
    mobility: stage(
      "Addis Ababa has light rail, buses, and minibuses; ride apps such as Ride and Feres are city-specific. Intercity travel is best checked with Ethiopian Airlines or bus operators.",
      [
        "Addis Ababa: Light rail and city buses serve selected corridors; shared minibuses are common but routes and fares may be unfamiliar. Ask locally or use an up-to-date route source before boarding.",
        "Ride services: Ride and Feres are local app examples in Addis Ababa; confirm current availability, language, payment, and pickup location. Service is limited outside urban centres.",
        "Intercity and walking: Domestic flights connect distant regions; road trips can take much longer than map estimates. Check current security, weather, and road advice. Sidewalks and crossings vary."
      ],
      [source("Ethiopian Railways Corporation", "https://erc.gov.et/"), source("Ethiopian Airlines domestic routes", "https://www.ethiopianairlines.com/")]
    ),
    dailyLiving: stage(
      "Food-delivery and grocery coverage is limited and city-specific. Use sealed or treated water, carry essential medicines, and keep cash for small businesses.",
      [
        "Delivery: Apps and delivery services have narrower coverage than in many capitals; ask your hotel which service reaches the address. Do not rely on delivery outside Addis Ababa without confirmation.",
        "Health and water: Use sealed bottled or appropriately treated water. Carry essential medication in original packaging and verify import rules; stock and opening hours vary by city.",
        "Food and payment: Injera and shared platters are common, but ask about ingredients and dietary needs. ETB cash remains useful. Tipping and buffet practices depend on the venue."
      ],
      [source("FCDO Ethiopia health advice", "https://www.gov.uk/foreign-travel-advice/ethiopia/health"), source("Ethiopia official eVisa information", "https://www.evisa.gov.et/information")]
    ),
    socialCode: stage(
      "Ask before photographing people, religious services, or government sites. Follow hosts' cues at meals; fasting practices and greetings vary by community.",
      [
        "Religious and public sites: Follow posted dress and photography restrictions; ask before photographing people, ceremonies, or government facilities.",
        "Home and meals: Ask about footwear and dietary needs. Shared platters are common in some settings; use the serving practice offered by the host.",
        "Language and greetings: Amharic is widely used in Addis Ababa, with many regional languages elsewhere. Begin politely and ask which language is preferred; religious observance varies."
      ],
      [source("FCDO Ethiopia local laws and safety advice", "https://www.gov.uk/foreign-travel-advice/ethiopia/safety-and-security")]
    )
  },
  EG: {
    preArrival: stage(
      "Cairo (CAI) is the main hub; compare EgyptAir and regional carriers with Google Flights/Skyscanner. Check Egypt's official eVisa eligibility and current entry conditions.",
      [
        "Flight routing: Cairo (CAI) is the main international hub; Hurghada, Sharm el-Sheikh, and Luxor serve regional itineraries. Compare broad search and EgyptAir/direct carriers; confirm airport, baggage, and connection details.",
        "Entry: Egypt's eVisa portal is official, but eligibility and visa type depend on nationality and trip. Check visa2egypt.gov.eg and the relevant embassy; do not assume visa-on-arrival is available to every traveler.",
        "Climate and packing: Desert heat, Nile Valley conditions, and coastal weather differ. Check forecasts and heat advisories. Bring sun protection, breathable layers, and modest clothing for religious sites."
      ],
      [source("Official Egypt eVisa", "https://visa2egypt.gov.eg/"), source("EgyptAir", "https://www.egyptair.com/"), source("Egypt Tourism Authority official visitor portal", "https://www.experienceegypt.eg/en")]
    ),
    arrival24h: stage(
      "Egypt uses 220 V / 50 Hz Type C and F sockets. Keep Egyptian pounds and confirm airport transfer details; SIM, card, and cash access vary by provider and venue.",
      [
        "Power: 220 V / 50 Hz, Type C and F sockets. Check device labels and use a compatible adapter.",
        "Connectivity and money: Check roaming and local SIM registration with your carrier/operator. Egyptian pound (EGP) cash is useful for small purchases; card acceptance varies by merchant. Use authorized ATMs and check fees.",
        "Airport transfer: Cairo Airport has multiple terminals and transport options; confirm the terminal, official taxi counter/app pickup zone, and destination. Agree fare or use the app estimate before departure."
      ],
      [plugs("egypt"), source("Cairo International Airport", "https://www.cairo-airport.com/"), source("Egypt official eVisa", "https://visa2egypt.gov.eg/")]
    ),
    mobility: stage(
      "Cairo has metro, buses, and minibuses; Metro tickets and lines are operator-specific. Uber, Careem, and inDrive are common app options; intercity rail requires separate booking.",
      [
        "Cairo: Metro is the most predictable option on served corridors; check current Cairo Metro route, hours, and ticket guidance. Buses and minibuses extend coverage but require local route knowledge.",
        "Ride-hailing: Uber, Careem, and inDrive are available in major cities. Confirm the pickup location, vehicle, and fare in-app; traffic can make journey times highly variable.",
        "Intercity and walking: Egyptian National Railways serves major corridors; verify schedule and station details. Sidewalks, heat, and traffic vary; plan crossings carefully and allow extra time."
      ],
      [source("Cairo Metro", "https://www.cairometro.gov.eg/"), source("Egyptian National Railways", "https://enr.gov.eg/")]
    ),
    dailyLiving: stage(
      "Talabat, Breadfast, and Rabbit are urban service examples; check the exact delivery zone. Use bottled water unless your accommodation gives location-specific guidance.",
      [
        "Delivery: Talabat, Breadfast, and Rabbit serve some city areas; coverage and payment vary by address. Confirm local phone, building, and delivery instructions in the app.",
        "Health and water: Do not assume tap water is suitable for visitors; use sealed bottled water or suitable treatment. Carry essential medicines in original packaging and verify import rules.",
        "Food and payment: EGP cash remains useful alongside cards and local wallets. Ask about ingredients and dietary needs. Pharmacy hours and duty rotas are local; check nearby options after arrival."
      ],
      [source("Talabat Egypt", "https://www.talabat.com/egypt"), source("Breadfast", "https://breadfast.com/"), source("Egypt Tourism Authority official visitor portal", "https://www.experienceegypt.eg/en")]
    ),
    socialCode: stage(
      "Dress modestly at religious sites, remove shoes where directed, and ask before photographing people. Use polite greetings and follow your host's cues.",
      [
        "Religious and heritage sites: Follow posted clothing, footwear, and photography rules. Ask permission before photographing people, especially at worship sites.",
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Offer or receive items with the host's lead; customs vary.",
        "Public interaction: Greetings and expectations vary by setting. Be courteous, ask about dietary needs, and avoid assuming one social rule applies nationwide."
      ],
      [source("Egypt Tourism Authority official visitor portal", "https://www.experienceegypt.eg/en")]
    )
  },
  KE: {
    preArrival: stage(
      "Compare Nairobi (NBO) and coastal/regional routes with Google Flights/Skyscanner and Kenya Airways or Jambojet directly. Kenya requires an ETA for most visitors; check eligibility.",
      [
        "Flight routing: Nairobi (NBO) is the main international hub; Mombasa (MBA) and regional airports serve coast and safari circuits. Compare broad flight search with Kenya Airways, Jambojet, and operating carriers; check baggage and transfer time.",
        "Entry: Kenya uses an Electronic Travel Authorisation (ETA) system. Requirements and exemptions vary by nationality, trip, and transit; apply and check status only through etakenya.go.ke before travel.",
        "Climate and packing: Elevation makes Nairobi cooler than the coast; safari regions vary by season. Check forecast and park conditions. Pack sun/rain protection, modest city clothing, and neutral outdoor layers where appropriate."
      ],
      [source("Official Kenya ETA", "https://www.etakenya.go.ke/"), source("Kenya Airways", "https://www.kenya-airways.com/"), source("Kenya Airports Authority", "https://www.kaa.go.ke/")]
    ),
    arrival24h: stage(
      "Kenya uses 240 V / 50 Hz Type G sockets. M-Pesa is central to daily payments, but visitor registration and account functionality vary; carry a card and some KES cash.",
      [
        "Power: 240 V / 50 Hz, Type G sockets. Check device voltage and bring a compatible adapter.",
        "Connectivity and payments: Safaricom SIM registration requires accepted ID; verify visitor requirements and roaming before travel. M-Pesa is widely used, but don't assume a visitor can open or fund an account. Carry Kenyan shillings (KES) and a card backup.",
        "Airport transfer: Nairobi JKIA provides current passenger and ground-transport information. Use official taxi/app pickup points; agree destination and confirm fare before leaving."
      ],
      [plugs("kenya"), source("Kenya Airports Authority", "https://www.kaa.go.ke/"), source("Safaricom M-Pesa", "https://www.safaricom.co.ke/personal/m-pesa")]
    ),
    mobility: stage(
      "Nairobi relies on matatus, buses, and ride-hailing; Mombasa and other cities differ. Use official SGR booking for Nairobi–Mombasa rail and confirm station transfers.",
      [
        "Nairobi: Matatus and buses serve extensive routes but stops and fares are local. Ask a trusted local or use a route app; check destination before boarding.",
        "Rail and intercity: Kenya Railways' Madaraka Express connects Nairobi and Mombasa; book through the official platform and confirm departure station, ID requirements, and last-mile transport.",
        "Ride-hailing and walking: Uber, Bolt, and Little operate in some cities. Verify plate/pickup and use official booking. Walkability varies by district; plan for heat, road crossings, and uneven pavements."
      ],
      [source("Kenya Railways booking", "https://metickets.krc.co.ke/"), source("Kenya National Transport and Safety Authority", "https://www.ntsa.go.ke/")]
    ),
    dailyLiving: stage(
      "Glovo and Uber Eats cover some Nairobi addresses; check zone availability. Use bottled or treated water unless local authorities/accommodation confirm otherwise.",
      [
        "Delivery: Glovo and Uber Eats are available in selected urban zones; enter the exact address and check phone/payment options. Coverage outside Nairobi and Mombasa is limited.",
        "Water and health: Water safety varies by source and building; use sealed or treated water if uncertain. Pharmacies are common in cities, but bring essential medication in original packaging and confirm import rules.",
        "Payments and food: M-Pesa is common but visitor access is not guaranteed. KES cash/cards remain useful. Try local dishes and ask about allergens; check venue service charges and tipping expectations."
      ],
      [source("Glovo Kenya", "https://glovoapp.com/ke/en/"), source("Uber Eats Kenya", "https://www.ubereats.com/ke"), source("Kenya Tourism Board", "https://magicalkenya.com/")]
    ),
    socialCode: stage(
      "Kenya is multilingual and culturally diverse. Ask before photos, especially of people or government/security sites; follow host cues on greetings and home footwear.",
      [
        "Greetings and language: English and Swahili are widely used alongside many local languages. Ask which language is preferred and use a courteous greeting; customs vary by community.",
        "Home visits and dining: Ask about shoes and whether a small gift is welcome. Follow the host's serving customs and ask about dietary needs.",
        "Photography and safety: Ask before photographing people, markets, or private property. Respect restrictions at government, border, military, and wildlife sites."
      ],
      [source("Kenya Tourism Board visitor information", "https://magicalkenya.com/")]
    )
  },
  UG: {
    preArrival: stage(
      "Compare Entebbe (EBB) routes with Google Flights/Skyscanner and Uganda Airlines or regional carriers. Uganda's e-visa system is official; check eligibility before booking.",
      [
        "Flight routing: Entebbe (EBB) is the main international gateway for Kampala. Compare Google Flights/Skyscanner with Uganda Airlines and regional operators; verify baggage, transfers, and schedules directly.",
        "Entry: Uganda uses an official electronic visa/permit system. Requirements depend on nationality, purpose, and route; apply through visas.immigration.go.ug and check current notices.",
        "Climate and packing: Equatorial conditions are moderated by elevation; rain patterns and conditions differ by region. Check park/road forecasts and pack rain layers, sun protection, and suitable footwear."
      ],
      [source("Uganda eVisa/permit system", "https://visas.immigration.go.ug/"), source("Uganda Civil Aviation Authority", "https://www.caa.go.ug/"), source("Uganda Airlines", "https://ugandairlines.com/")]
    ),
    arrival24h: stage(
      "Uganda uses 240 V / 50 Hz Type G sockets. MTN/Airtel SIM and Mobile Money access require local registration; carry UGX cash and confirm airport transfer.",
      [
        "Power: 240 V / 50 Hz, Type G sockets. Check device voltage and bring a compatible adapter.",
        "Connectivity and payments: Local SIM registration is required. MTN MoMo and Airtel Money are common domestic rails, but visitor account access varies; keep Ugandan shillings (UGX) and a card backup.",
        "Airport transfer: Entebbe Airport is outside central Kampala. Arrange a hotel transfer, licensed taxi, or verified app trip in advance and confirm fare, especially for late arrivals."
      ],
      [plugs("uganda"), source("Entebbe International Airport", "https://www.caa.go.ug/"), source("MTN Uganda MoMo", "https://www.mtn.co.ug/momo/")]
    ),
    mobility: stage(
      "Kampala uses matatus, buses, and boda-bodas; SafeBoda and ride-hailing operate in parts of the city. Check route and safety conditions before each trip.",
      [
        "Kampala: Shared taxis (matatus) and buses run on busy corridors; stops and fares require local knowledge. Ask your accommodation or use a vetted route source.",
        "Boda-bodas and apps: SafeBoda, Uber, or other apps may be available by district. Choose a helmeted, identifiable rider; confirm route and fare in-app and consider traffic/weather.",
        "Intercity: Coaches serve major towns and park destinations. Confirm the operator, departure terminal, and daylight arrival options; road conditions and travel times vary."
      ],
      [source("SafeBoda", "https://safeboda.com/"), source("Uganda National Roads Authority", "https://www.unra.go.ug/")]
    ),
    dailyLiving: stage(
      "Glovo and local delivery services reach parts of Kampala; verify address and payment. Use bottled or treated water and confirm pharmacy access before park trips.",
      [
        "Delivery: Glovo and local services may cover Kampala addresses; check exact zone, phone, payment, and hours. Coverage outside the capital is limited.",
        "Health and water: Use sealed/treated water unless local advice confirms safety. Pharmacies and clinics are less available near remote parks; carry essential medicines in original packaging and verify import rules.",
        "Payments and food: UGX cash is useful; mobile-money registration depends on local SIM and ID rules. Ask about ingredients and allergens; check the bill for service charges."
      ],
      [source("Glovo Uganda", "https://glovoapp.com/ug/en/"), source("Uganda tourism information", "https://www.visituganda.com/")]
    ),
    socialCode: stage(
      "Ask before photographing people or cultural events. At a home visit, ask about footwear and gifts; customs vary among Uganda's many communities.",
      [
        "Greetings and language: English and Swahili are official languages, with many local languages in daily use. Ask which language is comfortable and use a respectful greeting.",
        "Home and dining: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead and ask about dietary needs.",
        "Photography: Seek permission before photographing people, ceremonies, or private property. Follow park, border, and security-site restrictions."
      ],
      [source("Uganda tourism information", "https://www.visituganda.com/")]
    )
  },
  GH: {
    preArrival: stage(
      "Compare Accra (ACC) flights on Google Flights/Skyscanner and confirm with the operating airline. Ghana entry rules are passport-specific; use MFA or official immigration guidance.",
      [
        "Flight routing: Kotoka International Airport (ACC) is the main gateway. Compare broad search, then confirm connections and baggage with the carrier; Africa World Airlines serves some regional routes.",
        "Entry: Visa and yellow-fever documentation requirements depend on nationality, origin, and purpose. Check Ghana's Ministry of Foreign Affairs and Ghana Immigration before travel; don't rely on generic visa-free summaries.",
        "Climate and packing: Accra is hot and humid; northern regions and rainy seasons differ. Check forecast and health advice, pack breathable clothing and rain protection, and dress respectfully at religious sites."
      ],
      [source("Ghana Ministry of Foreign Affairs", "https://mfa.gov.gh/"), source("Ghana Immigration Service", "https://gis.gov.gh/"), source("Ghana Airports Company", "https://www.gacl.com.gh/")]
    ),
    arrival24h: stage(
      "Ghana uses 230 V / 50 Hz Type D and G sockets. Carry Ghana cedis (GHS); MTN MoMo is common but visitor registration/card acceptance varies.",
      [
        "Power: 230 V / 50 Hz, Type D and G sockets. Check device labels and bring a compatible adapter.",
        "Connectivity and payments: Check local SIM registration. MTN MoMo is widely used domestically, but visitors may not be able to open an account; retain GHS cash and a bank card. ATM/card availability varies by town.",
        "Airport transfer: Kotoka Airport lists passenger services and transport information. Use official taxi or verified app pickup and agree the destination/fare before leaving."
      ],
      [plugs("ghana"), source("Ghana Airports Company", "https://www.gacl.com.gh/"), source("MTN Ghana MoMo", "https://mtn.com.gh/momo/")]
    ),
    mobility: stage(
      "Accra relies on tro-tros, buses, and taxis; routes and stops are informal. Uber, Bolt, and Yango operate in cities; verify pickup, fare, and destination.",
      [
        "Accra: Tro-tros and shared vans serve extensive routes, often departing when full. Ask a local for the correct stop/destination and confirm fare before boarding; intercity coaches use designated terminals.",
        "App rides: Uber, Bolt, and Yango coverage varies by city. Confirm the vehicle and plate in-app and use a clear pickup point.",
        "Walking: Heat, road crossings, and sidewalk gaps can make walking difficult. Plan short routes and use marked crossings; allow extra time for traffic."
      ],
      [source("Ghana transport information", "https://www.mot.gov.gh/"), source("Ghana Airports Company", "https://www.gacl.com.gh/")]
    ),
    dailyLiving: stage(
      "Hubtel and Bolt Food are urban delivery examples; check exact address coverage. Use sealed or treated water and confirm pharmacy hours locally.",
      [
        "Delivery: Hubtel and Bolt Food serve selected urban zones; verify address, phone, payment, and operating hours. Delivery is limited outside major towns.",
        "Health and water: Use sealed bottled or treated water unless local authorities/accommodation give current guidance. Bring prescriptions in original packaging and check import rules.",
        "Payments and food: GHS cash and mobile money are common; visitor access to MoMo varies. Ask about ingredients and allergens. Check receipts for service charges; tipping is discretionary."
      ],
      [source("Hubtel Ghana", "https://hubtel.com/"), source("Bolt Ghana", "https://bolt.eu/en/food/"), source("Ghana Tourism Authority", "https://visitghana.com/")]
    ),
    socialCode: stage(
      "Ghana is multilingual and culturally diverse. Ask before photographing people or ceremonies, and follow hosts' cues on greetings, footwear, and dining.",
      [
        "Greetings and language: English is official; local language preferences vary by region and household. Ask which language is comfortable and use a courteous greeting.",
        "Home visits and meals: Ask about footwear and whether a small food gift is welcome. Follow the host's lead on shared dishes and ask about dietary needs.",
        "Photography: Ask permission before photographing people, homes, or ceremonies. Follow posted rules at religious, government, and heritage sites; avoid broad cultural assumptions."
      ],
      [source("Ghana Tourism Authority visitor information", "https://visitghana.com/")]
    )
  },
  CV: {
    preArrival: stage(
      "Compare Praia and island gateways with Google Flights/Skyscanner, TAP, and Cabo Verde Airlines; domestic island links are separate. Check the consular portal for visa and pre-registration requirements.",
      [
        "Flight routing: Praia (RAI), Sal (SID), and Boa Vista (BVC) serve different islands. Compare Google Flights/Skyscanner with TAP and Cabo Verde Airlines; inter-island flights and ferries require separate planning.",
        "Entry: Visa exemptions, visa requirements, and pre-registration/TSA procedures depend on nationality and visit. Check Cabo Verde's official Consular Portal before booking and complete any required pre-registration.",
        "Climate and packing: Dry, sunny conditions are common, but wind, dust, and island microclimates vary. Check forecasts; pack sun protection, light layers, and sturdy footwear for volcanic terrain."
      ],
      [source("Cabo Verde Consular Portal: visas and entry pre-registration", "https://portalconsular.mnec.gov.cv/vistos"), source("Cabo Verde Airports (ASA)", "https://asa.cv/en/"), source("Cabo Verde Airlines", "https://www.caboverdeairlines.com/")]
    ),
    arrival24h: stage(
      "Cabo Verde uses 220 V / 50 Hz Type C and F sockets. Escudo is pegged to the euro; keep cash for smaller islands and check roaming coverage.",
      [
        "Power: 220 V / 50 Hz, Type C and F sockets. Confirm your device input and adapter compatibility.",
        "Connectivity and payments: The Cabo Verde escudo (CVE) is pegged to the euro; cash and card acceptance varies by island and merchant. Check roaming/SIM options and carry cash for outages or small businesses.",
        "Airport transfer: Airports and ground transport differ by island. Check ASA's current passenger information and arrange licensed taxi or hotel transfer; confirm fare and pickup before leaving."
      ],
      [plugs("cape-verde"), source("Cabo Verde Airports (ASA)", "https://asa.cv/en/"), source("Cabo Verde Consular Portal", "https://portalconsular.mnec.gov.cv/")]
    ),
    mobility: stage(
      "Inter-island travel uses domestic flights and ferries; CV Interilhas publishes sailing information. On-island transport often relies on shared aluguer minibuses and taxis.",
      [
        "Between islands: Compare domestic flights with CV Interilhas ferries. Schedules are weather-sensitive and can change; confirm departure port, check-in time, and current notices.",
        "On-island: Aluguer shared minibuses and taxis serve many routes, but frequencies vary. Confirm destination and fare before boarding; some routes depart when full.",
        "Walking: Terrain can be steep, rocky, and exposed to sun/wind. Plan water, footwear, and return transport, especially outside town centres."
      ],
      [source("CV Interilhas ferry schedules", "https://cvinterilhas.cv/"), source("Cabo Verde Airports (ASA)", "https://asa.cv/en/")]
    ),
    dailyLiving: stage(
      "Delivery and online retail are limited outside Praia and larger island towns. Confirm water, pharmacy, and shop hours with your accommodation before remote trips.",
      [
        "Daily services: App-based delivery is limited and island-specific. Ask your accommodation about local shops, phone coverage, and opening hours; plan supplies before moving to smaller islands.",
        "Health and water: Use sealed or treated water unless local providers confirm otherwise. Pharmacy stock and hours vary; carry essential medicine in original packaging and verify import rules.",
        "Food and payment: Seafood, cachupa, and local produce vary by island. Ask about ingredients and dietary needs. CVE cash is useful; check any card surcharge and restaurant service charge."
      ],
      [source("Cabo Verde tourism information", "https://www.visit-caboverde.com/"), source("Cabo Verde Consular Portal", "https://portalconsular.mnec.gov.cv/")]
    ),
    socialCode: stage(
      "Portuguese and Cape Verdean Creole are used; ask which language is preferred. Ask before photographing people and follow host cues on greetings and gifts.",
      [
        "Language and greetings: Portuguese is official and Cape Verdean Creole is widely spoken. Ask which language your host prefers and greet people politely.",
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Customs differ between islands and households.",
        "Photography and environment: Ask permission before photographing people or private property. Follow local guidance on beaches, trails, and protected areas."
      ],
      [source("Cabo Verde tourism information", "https://www.visit-caboverde.com/")]
    )
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing requested destination: ${iso}`);
  for (const stageName of ["preArrival", "arrival24h", "mobility", "dailyLiving", "socialCode"]) {
    destination.stages[stageName] = { ...destination.stages[stageName], ...update[stageName] };
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);