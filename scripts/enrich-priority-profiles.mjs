import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const source = (topic, url) => ({ topic, url, lastChecked: checked });

const updates = {
  BY: {
    preArrival: {
      simple: "Compare only permitted routings with Google Flights or Skyscanner, then confirm each leg with the operating airline. Check Belarus MFA entry rules and your government's current travel advice before booking.",
      detailed: "Flight search and routing: Minsk National Airport (MSQ) is the main international gateway. Google Flights and Skyscanner can compare listed itineraries, but route availability, airspace, payment options, and connections can change. Verify the complete itinerary with carriers and review current travel advice before paying.\n\nEntry rules: Visa eligibility, permitted crossings, and stay conditions depend on passport nationality and route. Check the Belarus MFA visa information; do not rely on a generic visa-free summary.\n\nClimate and packing: Minsk has cold winters and warm summers, with regional variation. Check a current forecast for each stop. Pack insulated layers and winter footwear in cold months, plus rain protection in shoulder seasons.",
      sources: [source("Visa and entry information", "https://mfa.gov.by/en/visa/"), source("Minsk National Airport", "https://airport.by/en")]
    },
    arrival24h: {
      simple: "Minsk uses 220 V / 50 Hz Type C and F sockets. Confirm roaming and card acceptance with your providers; keep a lawful backup payment option.",
      detailed: "Power: 220 V / 50 Hz, Type C and F sockets. Check device voltage labels; an adapter changes plug shape, not voltage.\n\nConnectivity and money: Roaming, local SIM eligibility, and foreign-card acceptance depend on provider and current restrictions. Ask your carrier and bank before travel; do not rely on a foreign card working everywhere. Use only payment methods permitted for your circumstances.\n\nAirport transfer: Check MSQ's current transport and passenger notices. Use clearly identified licensed services and confirm the destination and fare before leaving the terminal.",
      sources: [source("Belarus electrical standards", "https://www.power-plugs-sockets.com/belarus/"), source("Minsk National Airport", "https://airport.by/en")]
    },
    mobility: {
      simple: "Minsk has metro and surface public transport. Check official route and ticket information; service, taxi apps, and intercity options vary by destination.",
      detailed: "Minsk: The metro covers major corridors; buses, trolleybuses, and trams fill out the city network. Check current routes, operating hours, and ticket validation rules with the transport operator before setting out.\n\nBeyond Minsk: Intercity rail and scheduled buses use different stations and operators. Confirm the departure point as well as the timetable. Shared minibuses may serve some corridors, but do not assume a fixed schedule.\n\nTaxis and walking: Use a licensed taxi or a locally available, verified dispatch service; confirm the fare before boarding. Sidewalk and crossing conditions vary by neighborhood, so check the route rather than assuming it is walkable.",
      sources: [source("Minsk public transport information", "https://minsktrans.by/")]
    },
    dailyLiving: {
      simple: "Use BYN for everyday cash needs and confirm foreign-card support before relying on it. Delivery, pharmacy hours, and water advice are location-specific.",
      detailed: "Shopping and delivery: App coverage and accepted payment methods vary by address. Check the exact Minsk delivery zone and phone-number requirements in the current app before depending on delivery; smaller cities may have fewer options.\n\nPharmacy and water: Bring prescription medicines in original packaging and verify import rules. Ask your accommodation about local water quality and use sealed or treated water if unsure. Locate an open pharmacy near your stay rather than assuming 24-hour service.\n\nFood and payment: Belarusian ruble (BYN) is the local currency. Keep an appropriate, lawful backup payment method. Try local dishes such as draniki, and check menus for ingredients and dietary needs. Buffet rules and service charges are venue-specific; check posted terms and the bill.",
      sources: [source("Official Belarus tourism information", "https://belarus.travel/")]
    },
    socialCode: {
      simple: "At a home visit, ask whether to remove shoes and what gift is welcome. Use a polite greeting, ask before photographing people, and follow local rules at official sites.",
      detailed: "Home visits: Ask your host about footwear and gift preferences; a small packaged food gift is a low-risk option when appropriate. Do not assume flowers, alcohol, or shoes are welcome in every household.\n\nCommunication: Belarusian and Russian are both used; ask which language your counterpart prefers instead of assuming. Start with a courteous, somewhat formal greeting and follow the host's lead.\n\nPhotography and conduct: Ask permission before photographing people or private property. Follow posted restrictions at government, transport, and security-sensitive sites. Customs vary by person and setting, so avoid treating one etiquette rule as universal.",
      sources: [source("Official Belarus tourism information", "https://belarus.travel/")]
    }
  },
  MD: {
    preArrival: {
      simple: "Compare Chișinău flights with Google Flights or Skyscanner; AZair can help find low-cost European legs. Verify Moldova's entry rules for your passport before booking.",
      detailed: "Flight search and routing: Chișinău International Airport (RMO, formerly KIV) is the main air gateway. Google Flights and Skyscanner are useful for broad comparisons; AZair specializes in low-cost European combinations. Confirm each itinerary with the airline. Iași can be a nearby alternative for some trips, but compare the full ground transfer and border crossing, not just the airfare.\n\nEntry rules: Visa requirements depend on nationality, purpose, and length of stay. Check current guidance from Moldova's Ministry of Foreign Affairs and the relevant embassy before travel.\n\nClimate and packing: Moldova has cold winters and warm to hot summers. Check forecasts for Chișinău and any rural or vineyard stops; pack layers, rain protection, and suitable walking shoes.",
      sources: [source("Moldova Ministry of Foreign Affairs", "https://mfa.gov.md/en"), source("Chișinău International Airport", "https://airport.md/")]
    },
    arrival24h: {
      simple: "Chișinău uses 220 V / 50 Hz Type C and F sockets. Carry some Moldovan lei and verify roaming, SIM, and card options for your provider.",
      detailed: "Power: 220 V / 50 Hz, Type C and F sockets. Check device labels before plugging in; a travel adapter does not convert voltage.\n\nConnectivity and money: Check your carrier's Moldova roaming and eSIM coverage before departure. The local currency is the Moldovan leu (MDL); card acceptance and ATM availability are better planned around your exact destination than assumed nationwide. Keep a modest cash backup.\n\nAirport transfer: Check the airport's current transport page for bus, taxi, and service updates. Use the marked taxi area or a verified booking, and confirm the drop-off point and fare before starting the trip.",
      sources: [source("Moldova electrical standards", "https://www.power-plugs-sockets.com/moldova/"), source("Chișinău International Airport", "https://airport.md/")]
    },
    mobility: {
      simple: "Chișinău has trolleybuses, buses, and shared minibuses. Check route and ticket details locally; intercity departures are operator- and station-specific.",
      detailed: "Chișinău: Trolleybuses and buses form the main urban network; shared minibuses (rutieras) also run on city and regional corridors. Confirm route, stop, payment, and schedule locally because services can change.\n\nIntercity: Scheduled coaches and rail serve different routes and stations. Check the operator's current timetable and departure location, especially for a cross-border trip.\n\nRide-hailing and walking: Verify app coverage at your address before relying on it. Sidewalk quality and crossing conditions vary; inspect the route and allow extra time outside the central area.",
      sources: [source("Chișinău municipal information", "https://www.chisinau.md/")]
    },
    dailyLiving: {
      simple: "Glovo coverage is address-dependent in Chișinău; check the app before relying on delivery. Ask locally about tap water and pharmacy access.",
      detailed: "Delivery and shopping: Check Glovo or other current local listings with your exact address; coverage and phone-number requirements differ outside the capital. Confirm grocery delivery and store hours with the provider.\n\nPharmacy and water: Bring prescription medicines in original packaging and confirm import rules. Water quality can vary by source and building; ask your host or use sealed/treated water if uncertain. Find the nearest open pharmacy after arrival.\n\nFood and service: Moldovan wine, placinte, and regional dishes are widely associated with local food culture. Ask about ingredients and dietary needs. Check the bill for service charges; tipping is discretionary and venue-dependent.",
      sources: [source("Glovo service availability", "https://glovoapp.com/"), source("Moldova tourism information", "https://moldova.travel/")]
    },
    socialCode: {
      simple: "For a home visit, ask about shoes and gifts; a small local food item is a considerate option. Ask which language your host prefers and follow their lead.",
      detailed: "Hosting and greetings: Moldovan households and language preferences vary. Begin politely, ask whether Romanian or another language is preferred, and follow the host's lead on greetings and footwear.\n\nGifts and dining: A small food or wine gift may suit a host who drinks, but check preferences and avoid assuming alcohol is appropriate. Ask about dietary restrictions and observe the household's meal customs.\n\nPublic conduct: Ask permission before photographing people or private property. Etiquette differs by person and context; use local cues rather than relying on national stereotypes.",
      sources: [source("Moldova tourism information", "https://moldova.travel/")]
    }
  },
  PK: {
    preArrival: {
      simple: "Compare fares on Google Flights/Skyscanner and Pakistan's Sastaticket.pk, then confirm baggage and ticket terms with the airline. Check the official NADRA visa portal for your passport.",
      detailed: "Flight search and routing: Islamabad (ISB), Karachi (KHI), and Lahore (LHE) are major gateways. Google Flights and Skyscanner help compare international options; Sastaticket.pk is a Pakistan-focused booking platform. Compare the final fare, baggage, change rules, and payment method, then verify with the operating airline.\n\nEntry: Pakistan's official Online Visa System is managed through NADRA. Eligibility and documents depend on nationality and visa category; apply only through the official portal and wait for the required approval before travel.\n\nClimate and packing: Conditions range from high mountains to hot plains and coast. Check the forecast for each region and season. Pack modest, breathable clothing for cities and sun protection; add warm layers for northern or winter trips.",
      sources: [source("Pakistan Online Visa System", "https://visa.nadra.gov.pk/"), source("Islamabad International Airport", "https://islamabadairport.com.pk/")]
    },
    arrival24h: {
      simple: "Pakistan uses 230 V / 50 Hz Type C and D sockets. Confirm visitor SIM rules and card acceptance; keep PKR cash for small purchases or outages.",
      detailed: "Power: 230 V / 50 Hz, Type C and D sockets. The local diagram appears above; check your device label and bring a suitable adapter.\n\nConnectivity and money: Check visitor SIM registration and eSIM eligibility with the carrier before travel; coverage differs by region. Easypaisa and JazzCash are important domestic payment services, but do not assume a visitor can activate them or that international cards will work everywhere. Keep Pakistani rupees (PKR) available and confirm your bank's international-use settings.\n\nAirport transfer: Islamabad Airport provides current flight and passenger information. Use clearly marked airport transport or a verified ride booking; confirm the vehicle, destination, and fare before departure.",
      sources: [source("Pakistan electrical standards", "https://www.power-plugs-sockets.com/pakistan/"), source("Islamabad International Airport", "https://islamabadairport.com.pk/")]
    },
    mobility: {
      simple: "Islamabad, Lahore, and Karachi have different metro/BRT systems. Use current city operator information; ride-hailing and shared options vary by city.",
      detailed: "Urban transit: Islamabad has Metrobus service; Lahore has Metrobus and Orange Line Metro Train; Karachi has the Green Line BRT. Check each operator's latest route, fare, and ticket guidance rather than expecting one national pass.\n\nShared and app-based trips: Intercity buses, vans, and city-specific ride-hailing options fill gaps in the formal networks. Check current app availability and vehicle details in the city where you are staying; confirm the fare and pickup point.\n\nWalking: Heat, traffic, and sidewalk continuity vary sharply by district. Plan short walks in daylight where appropriate, use marked crossings, and choose a car or transit for exposed or high-speed roads.",
      sources: [source("Islamabad Capital Development Authority", "https://cda.gov.pk/")]
    },
    dailyLiving: {
      simple: "Foodpanda operates in major Pakistani cities, but check address coverage. Use sealed or treated water unless a trusted local source confirms otherwise.",
      detailed: "Delivery: Foodpanda and grocery services are available in many urban areas; confirm the exact address, phone requirements, cash/card options, and delivery hours in the app. Availability is thinner outside major cities.\n\nFood, pharmacies, and water: Halal food is widely available, but ask about ingredients and dietary needs. Do not assume tap water is potable; use sealed bottled or properly treated water. Carry essential medication in original packaging with a prescription and check import rules.\n\nPayments and dining: Cash, cards, and domestic wallets are used differently by merchant and city. Confirm service charges before tipping. Buffet rules are venue-specific; follow posted plate or weight-based pricing rather than assuming unlimited refills.",
      sources: [source("Foodpanda Pakistan", "https://www.foodpanda.pk/"), source("Pakistan tourism information", "https://tourism.gov.pk/")]
    },
    socialCode: {
      simple: "Dress modestly in public and at religious sites; ask before photographing people. At a home visit, follow your host on shoes, greetings, and shared-dish etiquette.",
      detailed: "Dress and greetings: Expectations vary by region and setting. Modest clothing is a considerate default, especially in religious spaces; follow posted rules. Use a polite greeting and let the other person set the level of formality or physical contact.\n\nHome and meals: Ask whether to remove shoes. When sharing food, observe the host's practice; some settings favor using the right hand. Ask about dietary needs and avoid assuming every household follows the same custom.\n\nPhotography and behavior: Ask permission before photographing people, homes, or religious ceremonies, and follow restrictions at security-sensitive locations. Avoid broad assumptions about gender, language, or religious practice.",
      sources: [source("Pakistan tourism information", "https://tourism.gov.pk/")]
    }
  },
  RU: {
    preArrival: {
      simple: "For routes currently offered, compare Aviasales.ru with airline sites; verify routes, payment, and your government's travel advice. Russia's e-visa is limited to eligible nationalities.",
      detailed: "Flight search and routing: Moscow uses multiple airports, including Sheremetyevo (SVO), Domodedovo (DME), and Vnukovo (VKO). Aviasales.ru can surface domestic and regional options; confirm international itinerary, payment acceptance, and ticket terms directly with the carrier. Routes and restrictions change, so check current official travel advice before booking.\n\nEntry: Russia's unified e-visa is available only to eligible nationalities, approved crossing points, and permitted trip purposes. Check the MFA portal for current validity, stay limits, passport rules, and insurance requirements; otherwise consult the relevant consulate.\n\nClimate and packing: Conditions vary greatly across Russia. Research the exact city and season; Moscow winters are cold, while summer temperatures vary. Pack layers and allow for snow/ice in winter.",
      sources: [source("Russian MFA unified e-visa", "https://evisa.kdmid.ru/"), source("Sheremetyevo Airport", "https://www.svo.aero/en/")]
    },
    arrival24h: {
      simple: "Moscow uses 220 V / 50 Hz Type C and F sockets. Confirm current card, SIM, and payment access before travel; foreign-issued cards may not work.",
      detailed: "Power: 220 V / 50 Hz, Type C and F sockets. Check device voltage and use a compatible adapter.\n\nConnectivity and payments: Foreign-issued payment cards and international services can be affected by sanctions and local restrictions. Check with your bank and carrier before departure; do not rely on a foreign card, roaming, or a particular app. Use only lawful payment and communications options.\n\nAirport transfer: Moscow airports have different rail, bus, and taxi connections. Check the arrival airport's current official transport page, then use a marked taxi desk or a verified booking. Confirm the route and fare before leaving the terminal.",
      sources: [source("Russia electrical standards", "https://www.power-plugs-sockets.com/russia/"), source("Sheremetyevo Airport", "https://www.svo.aero/en/")]
    },
    mobility: {
      simple: "Moscow's metro is extensive; use current Metro/Mos.ru route and ticket information. Intercity rail and taxi services have separate booking systems.",
      detailed: "Moscow: The metro, buses, and surface rail cover major areas. Check Moscow Metro's current service notices and ticket options; language, payment, and app access may differ for visitors.\n\nAcross cities: Russian Railways (RZD) operates intercity trains; confirm station, ticket name/passport matching, and current service before travel. For trips within Moscow, Yandex Go is a local ride option where available; verify pickup details and fare in-app.\n\nWalking and safety: Winter surfaces can be icy and distances between stations long. Check weather and service alerts, use marked crossings, and follow local instructions at transport facilities.",
      sources: [source("Moscow Metro", "https://www.mosmetro.ru/"), source("Russian Railways", "https://www.rzd.ru/")]
    },
    dailyLiving: {
      simple: "Yandex Eats and other delivery options are city-specific. Check local payment compatibility, pharmacy hours, and current rules for medicines you bring.",
      detailed: "Delivery and shopping: Yandex Eats and grocery delivery services operate in some cities; check the exact address, language, phone, and payment requirements before relying on them. Availability outside large cities varies.\n\nPharmacy and water: Bring essential medication in original packaging and verify import rules. Ask your accommodation about local tap-water guidance; use sealed or treated water if unsure. Locate an open pharmacy near your stay.\n\nPayments and food: Local currency is the ruble (RUB). International card access can be restricted; check lawful payment options before travel. Try regional dishes and ask about ingredients. Buffet terms and service charges are set by each venue.",
      sources: [source("Yandex Eats", "https://eda.yandex.ru/")]
    },
    socialCode: {
      simple: "At a home visit, ask about shoes and gifts; begin with a polite, formal greeting. Follow posted rules and ask before photographing people or official sites.",
      detailed: "Greetings and hosting: A measured, polite greeting is a safe start. In private homes, ask whether to remove shoes and whether a small food gift is welcome; follow the host's lead rather than assuming a universal custom.\n\nLanguage and dining: Ask which language your counterpart prefers. Observe table customs and ask about ingredients or dietary restrictions. Avoid treating regional or generational differences as a single national rule.\n\nPhotography: Ask before photographing people and respect restrictions at transport, government, and security-sensitive sites. Check current local rules before sharing images publicly.",
      sources: [source("Russian tourism information", "https://discover-russia.ru/")]
    }
  },
  SK: {
    preArrival: {
      simple: "For low-cost European routes, try AZair; compare Google Flights/Skyscanner and Bratislava with Vienna Airport. Check Schengen entry rules for your passport.",
      detailed: "Flight search and routing: Bratislava Airport (BTS) publishes its current destinations, airlines, and transport links. AZair is useful for low-cost European combinations; compare results with Google Flights or Skyscanner and check Vienna Airport (VIE) as an alternative. Include the ground transfer and baggage costs, then verify with the airline.\n\nEntry: Slovakia is in the Schengen area. Short-stay rules and visa requirements depend on nationality and prior time spent in Schengen; use the European Commission's current guidance and the relevant consulate.\n\nClimate and packing: Slovakia has cold winters and warm summers, with colder conditions in mountain areas. Check the forecast for each region. Bring layers and suitable shoes for cobbled streets or hiking trails.",
      sources: [source("European Commission Schengen visa policy", "https://home-affairs.ec.europa.eu/policies/schengen/visa-policy_en"), source("Bratislava Airport routes and transport", "https://www.bts.aero/en/")]
    },
    arrival24h: {
      simple: "Slovakia uses 230 V / 50 Hz Type E sockets; euro and contactless payment are common. BTS publishes current airport bus, taxi, and shuttle options.",
      detailed: "Power: 230 V / 50 Hz, Type E sockets. The Type E wall socket accepts compatible Type C plugs; check grounding and device voltage before use.\n\nConnectivity and money: Slovakia uses the euro (EUR). Check roaming terms with your mobile carrier; EU roaming depends on your plan and fair-use conditions. Cards and contactless payment are common, but keep a small cash backup for occasional exceptions.\n\nAirport transfer: Bratislava Airport publishes current bus and shuttle links, including connections to the city and Vienna. Check the timetable, stop, and ticket with the operator on travel day. Use official taxi pickup or a verified booking and confirm the fare.",
      sources: [source("Slovakia electrical standards", "https://www.power-plugs-sockets.com/slovakia/"), source("Bratislava Airport transport", "https://www.bts.aero/en/parking-and-transport/")]
    },
    mobility: {
      simple: "Bratislava uses buses, trams, and trolleybuses; IDS BK covers regional transport. Check current DPB and Slovak Rail (ZSSK) routes and tickets.",
      detailed: "Bratislava: DPB operates the city's buses, trams, and trolleybuses. IDS BK coordinates regional public transport and ticketing; check the current fare zones and validation rules before boarding.\n\nIntercity and regional trips: ZSSK provides national rail services. Compare train and bus times for mountain or rural destinations, and confirm the departure station. Seasonal hiking access and weather can affect routes.\n\nRide-hailing and walking: App availability varies by city; use licensed providers and verify the pickup point. Historic centers may have cobbles and restricted vehicle access, so allow time on foot.",
      sources: [source("Bratislava public transport operator", "https://www.dpb.sk/en"), source("Slovak Railways", "https://www.zssk.sk/en/")]
    },
    dailyLiving: {
      simple: "Wolt delivery is available in some Slovak cities; check postcode coverage. Pharmacies, alcohol hours, and tap-water advice can vary by municipality and venue.",
      detailed: "Delivery and shopping: Check Wolt or other local listings at your exact address; coverage is thinner outside larger towns. Many shops close earlier or have reduced Sunday hours, so check current opening times.\n\nPharmacy and water: Pharmacies are marked with a green cross; check the local duty-pharmacy rota for late hours. Tap water is generally treated, but ask your accommodation about building-specific notices. Bring prescription medicines in original packaging and verify import rules.\n\nFood and dining: Try regional dishes such as bryndzové halušky. Ask about allergens and dietary needs. Service charges and buffet policies are venue-specific; read posted terms and check the bill.",
      sources: [source("Wolt Slovakia", "https://www.wolt.com/en/svk"), source("Slovakia tourism information", "https://slovakia.travel/en")]
    },
    socialCode: {
      simple: "At churches, follow posted dress and photography rules. For a home visit, ask about shoes and gifts; follow your host's lead rather than assuming a rule.",
      detailed: "Religious and heritage sites: Dress modestly where requested and follow signs about photography, services, and restricted areas.\n\nHome visits: Ask whether to remove shoes and whether a small food gift is welcome. A polite greeting and punctual arrival are good defaults; adapt to the host's preferences.\n\nOutdoor conduct: On marked hiking routes, follow local trail and wildlife notices, carry weather-appropriate layers, and avoid broad assumptions about regional customs.",
      sources: [source("Slovakia tourism information", "https://slovakia.travel/en")]
    }
  },
  UA: {
    preArrival: {
      simple: "Do not assume commercial flights are operating to your destination. Check current government travel advice and Ukrainian transport updates; entry rules depend on your passport.",
      detailed: "Route planning: Security conditions and aviation operations can change. Do not rely on Google Flights, Skyscanner, or an old itinerary alone; confirm current airspace and carrier operations through official sources and follow your government's travel advice. Ukrzaliznytsia publishes official rail information and booking links; cross-border routes and connections can change at short notice.\n\nEntry rules: Visa requirements depend on nationality, purpose, and stay. Check Ukraine's MFA guidance and the relevant embassy before departure.\n\nClimate and packing: Conditions vary from the Black Sea coast to the Carpathians. Check the forecast for every region and season; use layers, rain protection, and sturdy footwear.",
      sources: [source("Ukraine MFA", "https://mfa.gov.ua/en"), source("Ukrzaliznytsia passenger information", "https://www.uz.gov.ua/en/")]
    },
    arrival24h: {
      simple: "Ukraine uses 220 V / 50 Hz Type C and F sockets. Power and mobile service can be interrupted; carry a charged power bank and check current local alerts.",
      detailed: "Power: 220 V / 50 Hz, Type C and F sockets. Check your device label and adapter before use. Electricity availability can change with local conditions; keep essential devices charged when possible.\n\nConnectivity and payments: Check roaming or eSIM coverage with your provider. Keep offline maps and important addresses; service can be interrupted. The local currency is the hryvnia (UAH). Cards are common in cities, but keep some cash for outages or small purchases.\n\nArrival and onward travel: Confirm the operating status of the airport and border crossing before travel. For rail, use official Ukrzaliznytsia schedules and booking links. Follow official alerts and instructions at stations.",
      sources: [source("Ukraine electrical standards", "https://www.power-plugs-sockets.com/ukraine/"), source("Ukrzaliznytsia passenger information", "https://www.uz.gov.ua/en/")]
    },
    mobility: {
      simple: "Use current official city-transit and Ukrzaliznytsia updates. Service may change with security alerts; follow local air-raid instructions and shelter guidance.",
      detailed: "Kyiv and other cities: Metro, bus, tram, and trolleybus services operate by municipality; check the local operator's current service notices, hours, and ticketing. Air-raid alerts can interrupt service or change access; follow official instructions and know the nearest shelter.\n\nIntercity: Ukrzaliznytsia is the primary official rail source. Confirm schedules, station changes, and boarding details on the day of travel.\n\nTaxis and walking: Check current availability of licensed taxi apps at your location and confirm the pickup point. Avoid photographing transport, military, or infrastructure sites where restricted; use marked crossings and follow local security notices.",
      sources: [source("Ukrzaliznytsia passenger information", "https://www.uz.gov.ua/en/"), source("Kyiv Metro", "https://www.metro.kyiv.ua/")]
    },
    dailyLiving: {
      simple: "Glovo and grocery delivery cover some Ukrainian cities; check your exact address. Follow local notices for water, electricity, pharmacy hours, and payment access.",
      detailed: "Delivery: Check Glovo or local listings at the exact address; coverage and operating hours vary by city and can change with local conditions. Confirm phone-number, payment, and delivery instructions in the app.\n\nPharmacy and water: Ask your accommodation about current local water guidance and open pharmacies. Bring necessary medicines in original packaging and verify import rules. Keep essential supplies for possible service interruptions.\n\nPayments and food: Use Ukrainian hryvnia (UAH); card and mobile payment availability may be affected by power or network interruptions. Check receipts for service charges and ask about ingredients or dietary needs.",
      sources: [source("Glovo service availability", "https://glovoapp.com/"), source("Ukrzaliznytsia passenger information", "https://www.uz.gov.ua/en/")]
    },
    socialCode: {
      simple: "Ask which language a person prefers; do not assume Ukrainian and Russian are interchangeable. Follow air-raid, photography, and security instructions without exception.",
      detailed: "Language and introductions: Ukrainian is the state language, and language preferences vary by person and region. Ask politely which language your counterpart prefers; do not assume that Ukrainian and Russian are interchangeable.\n\nHome and hospitality: Ask about footwear and gift preferences when visiting. A small food gift can be appropriate, but follow the host's lead and ask about dietary needs.\n\nSecurity and photography: Follow air-raid alerts, shelter instructions, and restrictions on photographing people, transport, military activity, or infrastructure. Do not publish location-sensitive images. Customs differ by household; avoid national-character generalizations.",
      sources: [source("Ukraine official information", "https://ukraine.ua/")]
    }
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, stages] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination record: ${iso}`);
  for (const [stageName, stage] of Object.entries(stages)) {
    destination.stages[stageName] = { ...destination.stages[stageName], ...stage };
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);