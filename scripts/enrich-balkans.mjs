import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const checked = "2026-11-02";
const source = (topic, url) => ({ topic, url, lastChecked: checked });
const stage = (simple, paragraphs, sources) => ({ simple, detailed: paragraphs.join("\n\n"), sources });
const schengen = source("European Commission: Schengen visa policy", "https://home-affairs.ec.europa.eu/policies/schengen/visa-policy_en");
const plugs = (country) => source("Electrical standards and socket types", `https://www.power-plugs-sockets.com/${country}/`);

const updates = {
  BA: {
    preArrival: stage(
      "Compare Sarajevo and regional-airport routes with Google Flights or Skyscanner; AZair can help find low-cost European connections. Entry rules depend on passport nationality.",
      [
        "Flight routing: Sarajevo (SJJ) is the main gateway; Mostar and Tuzla have smaller, changing route networks. Compare with Google Flights or Skyscanner, and use AZair for low-cost European combinations. Check the operating airline and the full ground transfer before booking.",
        "Visa and entry: Bosnia and Herzegovina is outside Schengen. Entry permission and passport-validity rules depend on nationality and trip details; check the Ministry of Foreign Affairs and the relevant embassy before booking.",
        "Climate and clothing: Sarajevo has cold winters and warm summers; Mostar and the Adriatic-influenced south are milder. Check forecasts for each stop, pack layers, and follow posted dress requirements at religious sites."
      ],
      [source("Bosnia and Herzegovina Ministry of Foreign Affairs", "https://www.mvp.gov.ba/"), source("Official Sarajevo public transport operator", "https://gras.ba/")]
    ),
    arrival24h: stage(
      "Sarajevo uses 230 V / 50 Hz Type C and F sockets. Keep some convertible marks (BAM) available and confirm card/roaming support with your providers.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check device voltage labels; a plug adapter does not convert voltage.",
        "Connectivity and payment: Roaming and eSIM options depend on your carrier. Cards are accepted in many urban businesses, but keep BAM cash for small merchants or outages; check foreign-card fees with your bank.",
        "Airport and first transfer: Sarajevo Airport's route and passenger information can change. Check the current airport page on travel day; use marked taxi services or confirm the destination and fare with a verified booking before leaving."
      ],
      [plugs("bosnia-and-herzegovina"), source("Sarajevo Airport passenger information", "https://sarajevo-airport.ba/")]
    ),
    mobility: stage(
      "Sarajevo has trams, trolleybuses, buses, and minibuses; routes and ticket details are operator-specific. Intercity coaches and rail require separate schedule checks.",
      [
        "Sarajevo: GRAS lists tram, trolleybus, bus, and minibus services. Check current notices, route maps, and ticket validity locally; disruptions can change service.",
        "Between cities: Coach and rail options vary by corridor. Confirm the departure station and operator, especially for cross-border journeys. Shared vans may run on some routes but do not assume fixed departure times.",
        "Taxis and walking: Verify app coverage in the city where you are staying. Old-town paving and hilly streets can be uneven; check the route and use marked crossings."
      ],
      [source("GRAS Sarajevo routes and service notices", "https://gras.ba/"), source("Bosnia and Herzegovina Ministry of Foreign Affairs", "https://www.mvp.gov.ba/")]
    ),
    dailyLiving: stage(
      "Glovo and local delivery coverage is address-dependent. Ask your accommodation about water and pharmacy access; check the bill and local opening hours.",
      [
        "Delivery and shopping: Check Glovo or local listings with the exact address and a usable phone number before relying on delivery. Coverage and hours are thinner outside major cities.",
        "Health and water: Water quality and building plumbing can vary; ask your host or use sealed/treated water if uncertain. Bring prescription medicines in original packaging and verify import rules.",
        "Food and payment: Sarajevo specialties include ćevapi and burek; ask about ingredients and dietary needs. BAM is the local currency. Tipping and service charges vary by venue; review the bill rather than assuming a fixed rate."
      ],
      [source("Official Bosnia and Herzegovina tourism information", "https://visitbih.ba/"), source("Glovo service availability", "https://glovoapp.com/")]
    ),
    socialCode: stage(
      "Ask before photographing people or religious sites. For a home visit, follow your host's lead on shoes, greetings, and whether a small food gift is welcome.",
      [
        "Home visits: Customs vary by household. Ask whether to remove shoes and whether a small packaged food gift is appropriate; do not assume alcohol or flowers are welcome.",
        "Religious and public settings: Dress respectfully where requested, observe posted rules, and ask permission before photographing people, ceremonies, or private property.",
        "Language and etiquette: Bosnian, Croatian, and Serbian are used across the country. Begin politely and follow the other person's preferred language and level of formality; avoid generalizing customs across communities."
      ],
      [source("Official Bosnia and Herzegovina tourism information", "https://visitbih.ba/")]
    )
  },
  BG: {
    currency: "EUR",
    preArrival: stage(
      "Use AZair for low-cost European combinations, alongside Google Flights or Skyscanner. Bulgaria joined Schengen and adopted the euro; verify entry rules for your passport.",
      [
        "Flight routing: Sofia (SOF) is the main hub; Varna (VAR) and Burgas (BOJ) serve Black Sea destinations. Compare Google Flights/Skyscanner with AZair for low-cost European itineraries, then confirm baggage and route with the airline.",
        "Entry rules: Bulgaria is in Schengen. Visa requirements depend on nationality and prior Schengen stays; check the European Commission's current short-stay rules and the relevant consulate.",
        "Climate and clothing: Sofia has cold winters and hot summers; the Black Sea coast and mountain areas differ. Check the forecast for each stop and pack layers, rain protection, or beach gear as appropriate."
      ],
      [schengen, source("Sofia Airport routes and passenger information", "https://sofia-airport.eu/en/"), source("European Central Bank: Bulgaria euro changeover", "https://www.ecb.europa.eu/euro/changeover/bulgaria/html/index.en.html")]
    ),
    arrival24h: stage(
      "Bulgaria uses 230 V / 50 Hz Type C and F sockets. The currency is now the euro; Sofia Airport has current metro, bus, and official taxi guidance.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check your device label; an adapter changes plug shape but does not convert voltage.",
        "Connectivity and money: Bulgaria adopted the euro on 1 January 2026; euro banknotes and coins are now the sole legal tender. Cards and contactless payment are common in cities, but keep a small backup and check your bank's fees.",
        "Airport transfer: Sofia Airport publishes current metro, bus, terminal-transfer, and taxi information. Check first/last departures and service changes on arrival day; use the airport-recommended taxi stand or dispatch office."
      ],
      [plugs("bulgaria"), source("Sofia Airport public transport and taxi information", "https://sofia-airport.eu/en/transport/"), source("European Central Bank: Bulgaria euro changeover", "https://www.ecb.europa.eu/euro/changeover/bulgaria/html/index.en.html")]
    ),
    mobility: stage(
      "Sofia has metro, trams, buses, and trolleybuses. Use Sofia Traffic's live route changes and ticket guidance; city and intercity fares are separate.",
      [
        "Sofia: Metro, trams, buses, and trolleybuses serve the city. Sofia Traffic provides route changes, stops, and the Sofia2Go journey tools; check ticket validity and current service notices before boarding.",
        "Beyond Sofia: Varna, Plovdiv, and other cities operate their own networks. Bulgarian State Railways (BDZ) serves intercity rail; confirm station, schedule, and ticket details for the chosen route.",
        "Ride-hailing and walking: Bolt availability varies by city. Old-town paving, hills, and winter conditions can affect walking; inspect your route and use marked crossings."
      ],
      [source("Sofia Traffic route and service information", "https://www.sofiatraffic.bg/bg/public-transport"), source("Bulgarian State Railways", "https://www.bdz.bg/en")]
    ),
    dailyLiving: stage(
      "Glovo and eBag serve parts of the larger cities; check exact-address coverage. Bulgaria now uses euros, and water or pharmacy guidance should be checked locally.",
      [
        "Delivery: Glovo and eBag are examples to check in Sofia and other covered cities; enter your address to see actual availability, phone requirements, fees, and hours. Coverage falls outside urban centres.",
        "Pharmacy and water: Ask your accommodation about the nearest open pharmacy and local water notices. Carry prescriptions in original packaging and verify medicine import rules before travel.",
        "Food and payment: Try shopska salad, banitsa, or regional dishes; confirm ingredients and dietary needs. Euro is the currency. Service charges and tipping vary by venue; review the bill."
      ],
      [source("Glovo service availability", "https://glovoapp.com/"), source("eBag Bulgaria grocery delivery", "https://www.ebag.bg/"), source("Bulgarian tourism information", "https://visitbulgaria.com/")]
    ),
    socialCode: stage(
      "Ask before photographing people or religious services, and follow site dress rules. At a home visit, ask about shoes and gifts rather than relying on folk generalizations.",
      [
        "Visits and gifts: Household preferences vary. Ask whether to remove shoes and whether a small food gift is welcome. Do not rely on the often-repeated head-nodding generalization; confirm meaning if a gesture matters.",
        "Religious sites: Follow posted rules on clothing, photography, and services. Ask permission before photographing people or private property.",
        "Conversation: Bulgarian is the official language; English use varies by age and location. Start courteously and ask which language is comfortable."
      ],
      [source("Bulgarian tourism information", "https://visitbulgaria.com/")]
    )
  },
  HR: {
    preArrival: stage(
      "Compare Zagreb, Split, Dubrovnik, and seasonal coastal routes with Google Flights/Skyscanner; use AZair for low-cost European legs. Check Schengen eligibility and ferry connections separately.",
      [
        "Flight routing: Zagreb (ZAG), Split (SPU), and Dubrovnik (DBV) are major gateways; coastal schedules vary by season. Use Google Flights or Skyscanner for broad comparisons and AZair for low-cost European combinations, then verify the itinerary with the airline.",
        "Entry rules: Croatia is in Schengen. Visa requirements and the 90/180 short-stay limit depend on nationality and time already spent in the area; check current European Commission guidance.",
        "Climate and clothing: Inland Zagreb has colder winters than the Adriatic coast. Summer coastal heat and shoulder-season rain are both possible. Pack layers and sturdy shoes for historic stone streets."
      ],
      [schengen, source("Zagreb Airport passenger information", "https://www.zagreb-airport.hr/en/"), source("Jadrolinija sailing schedules", "https://www.jadrolinija.hr/en/travels")]
    ),
    arrival24h: stage(
      "Croatia uses 230 V / 50 Hz Type C and F sockets and the euro. Check each airport's current bus/taxi options and ferry schedules before departure.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check device compatibility; a plug adapter does not convert voltage.",
        "Connectivity and payment: Euro is the currency. Cards and contactless payment are common in cities, but small businesses and islands can differ. Check roaming/eSIM terms and keep some cash for contingencies.",
        "Airport transfer: Zagreb, Split, and Dubrovnik have different bus and taxi arrangements. Check the relevant airport's current passenger page, terminal stop, and operating hours. For island onward travel, use Jadrolinija's current sailing schedule and traffic notices."
      ],
      [plugs("croatia"), source("Zagreb Airport", "https://www.zagreb-airport.hr/en/"), source("Jadrolinija ferry timetable and notices", "https://www.jadrolinija.hr/en/travels")]
    ),
    mobility: stage(
      "Zagreb has trams and buses; coastal cities rely more on buses and ferries. ZET and Jadrolinija publish routes, tickets, and live service notices.",
      [
        "Zagreb: ZET operates trams and buses and provides a journey planner, timetables, fares, and service updates. Check current line notices and ticket validation rules.",
        "Coast and islands: Local buses and ferries are key links. Jadrolinija's schedule and traffic-status pages are the references for ferry routes; seasonal timetables and reservations differ by line.",
        "Ride-hailing and walking: Check Uber/Bolt availability at the exact location rather than assuming national coverage. Historic centres can have steep, polished stone streets; allow extra time and use marked crossings."
      ],
      [source("ZET Zagreb route planner, fares, and notices", "https://www.zet.hr/en"), source("Jadrolinija schedules and traffic status", "https://www.jadrolinija.hr/en/travels")]
    ),
    dailyLiving: stage(
      "Wolt and Glovo are available in parts of Croatia; enter the exact address to confirm coverage. Tap-water and pharmacy advice can vary on islands and in older buildings.",
      [
        "Delivery: Check Wolt or Glovo for your precise address, phone, and payment method. Island and rural coverage is limited; shops may close earlier outside peak season.",
        "Health and water: Municipal tap water is commonly treated, but ask locally about the building and any advisories. Bring prescriptions in original packaging and locate the on-duty pharmacy for the town you are visiting.",
        "Food and payment: Try regional seafood, olive oil, or dishes such as pašticada; ask about ingredients and allergens. Check the bill for service charges; tipping is discretionary and venue-dependent."
      ],
      [source("Wolt Croatia", "https://wolt.com/en/hrv"), source("Glovo service availability", "https://glovoapp.com/"), source("Croatian National Tourist Board", "https://croatia.hr/en-gb")]
    ),
    socialCode: stage(
      "At churches, follow posted dress and photography rules. In homes, ask about shoes; in cafés, check the bill and follow the venue's service-charge policy.",
      [
        "Home visits: Ask whether to remove shoes and whether a small local-food gift is welcome. Customs differ between households and regions.",
        "Religious and heritage sites: Follow clothing and photography rules. Ask before photographing people, ceremonies, or private property.",
        "Public etiquette: Coffee and café time are common social settings, but don't infer a fixed schedule or tipping rule. Review the bill, and follow the host's lead on greetings and formality."
      ],
      [source("Croatian National Tourist Board", "https://croatia.hr/en-gb")]
    )
  },
  GR: {
    preArrival: stage(
      "Use AZair for low-cost European combinations and compare Google Flights/Skyscanner for wider coverage. Check Schengen entry rules and book island ferries with the operator.",
      [
        "Flight routing: Athens (ATH) is the main hub; Thessaloniki and island airports provide other gateways. Compare Google Flights/Skyscanner with AZair for low-cost European legs. Verify seasonal routes with the airline.",
        "Entry rules: Greece is in Schengen. Visa requirements depend on passport nationality and prior Schengen days; check the European Commission's current rules and the relevant consulate.",
        "Climate and clothing: Athens and islands are hot in summer; northern and mountain areas are cooler. Check forecasts and fire/weather alerts, pack sun protection, and use sturdy footwear on archaeological and island terrain."
      ],
      [schengen, source("Athens International Airport", "https://www.aia.gr/"), source("Greek National Tourism Organisation", "https://www.visitgreece.gr/")]
    ),
    arrival24h: stage(
      "Greece uses 230 V / 50 Hz Type C and F sockets and the euro. OASA publishes Athens routes, ticket options, and real-time service alerts.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check device labels and adapters before use.",
        "Connectivity and payments: Euro, cards, and contactless are common in cities; cash remains useful in some island and small-business settings. Verify roaming/eSIM coverage for remote islands with your carrier.",
        "Airport transfer: Athens Airport access options include rail/metro, bus, and taxi; check the airport's current page and first/last departure times. In Athens, use OASA service alerts before relying on a specific bus connection."
      ],
      [plugs("greece"), source("Athens Airport passenger transport", "https://www.aia.gr/"), source("OASA route, ticket, and real-time service information", "https://www.oasa.gr/en/")]
    ),
    mobility: stage(
      "Athens has metro, bus, tram, and trolleybus services; OASA provides ATH.ENA ticket information and live alerts. Island transport is local and seasonal.",
      [
        "Athens: OASA coordinates public transport information and ATH.ENA ticketing; its site links the telematics app and current announcements. Check service disruptions before airport or port transfers.",
        "Islands: Buses and ferries vary by island and season. Confirm the local timetable and ferry operator, and allow time between the port and airport.",
        "Taxis and walking: Ride apps may dispatch licensed taxis rather than private cars. Confirm the fare and pickup point. Historic areas can be crowded, steep, and uneven; use marked crossings."
      ],
      [source("OASA Athens public transport", "https://www.oasa.gr/en/"), source("Greek ferry passenger information", "https://www.visitgreece.gr/experiences/activities/sea/ferries/")]
    ),
    dailyLiving: stage(
      "efood and Wolt serve many urban addresses; check island coverage in-app. Tap-water advice differs by island, so ask locally rather than assuming nationwide potability.",
      [
        "Delivery: efood and Wolt are common options in larger cities; verify the exact address and opening hours. On islands, delivery and grocery services may be limited or seasonal.",
        "Water and pharmacy: Athens tap water is generally supplied as potable, while island sources vary; follow local advice and use sealed water if unsure. Check the on-duty pharmacy listing for each municipality; carry prescriptions in original packaging.",
        "Food and payment: Try regional dishes and ask about allergens or dietary needs. Euro is the currency. Service charges and tipping vary by establishment; check the receipt."
      ],
      [source("efood Greece", "https://www.e-food.gr/"), source("Wolt Greece", "https://wolt.com/en/grc"), source("Greek National Tourism Organisation", "https://www.visitgreece.gr/")]
    ),
    socialCode: stage(
      "At monasteries and archaeological sites, follow dress and photography notices. For home visits, ask about shoes and gifts; customs vary by household.",
      [
        "Religious and heritage sites: Some sites require modest clothing or restrict photography. Follow posted rules and staff instructions.",
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. If invited to share food, ask about ingredients and follow the host's lead.",
        "Public interaction: Greetings and meal timing vary by region and context. Be courteous, ask before photographing people, and avoid treating hospitality as a single national rule."
      ],
      [source("Greek National Tourism Organisation", "https://www.visitgreece.gr/")]
    )
  },
  ME: {
    preArrival: stage(
      "Compare Podgorica and Tivat flights using Google Flights/Skyscanner and AZair for low-cost European legs. Visa rules depend on nationality; check the government source before booking.",
      [
        "Flight routing: Podgorica (TGD) and Tivat (TIV) serve different parts of the country. Routes are seasonal; compare Google Flights/Skyscanner and AZair, then confirm schedule and baggage with the airline.",
        "Entry: Montenegro is outside Schengen. Visa eligibility, permitted stay, and passport validity depend on nationality and trip details; use the current Montenegrin government or embassy guidance.",
        "Climate and clothing: The coast has Mediterranean conditions; inland and mountain areas can be much colder and wetter. Check the forecast for each stop and pack layers, rain protection, and suitable footwear for steep old towns."
      ],
      [source("Montenegro government visa guidance", "https://www.gov.me/en/mvp"), source("Airports of Montenegro flight information", "https://montenegroairports.com/en/")]
    ),
    arrival24h: stage(
      "Montenegro uses the euro and 230 V / 50 Hz Type C/F sockets. TGD and TIV have separate transfer options; check the official airport pages for current details.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check device voltage before plugging in.",
        "Connectivity and money: Euro is used, although Montenegro is not an EU or euro-area member. Card and ATM access varies by town; keep some cash and check roaming with your carrier.",
        "Airport transfer: Podgorica and Tivat airports serve different destinations. Check Airports of Montenegro's current flight and passenger information; verify bus departures locally and use marked taxi services with the fare agreed before travel."
      ],
      [plugs("montenegro"), source("Airports of Montenegro passenger information", "https://montenegroairports.com/en/"), source("Montenegrin rail timetable", "https://www.zpcg.me/en")]
    ),
    mobility: stage(
      "Podgorica and coastal towns rely on buses and taxis; Montenegro Rail serves the Bar–Podgorica–Bijelo Polje corridor. Check live operator schedules.",
      [
        "Rail: ŽPCG publishes a timetable and online ticket links for domestic and international services. The Bar–Podgorica–Bijelo Polje line is the main passenger rail corridor; verify current service and station details.",
        "Buses: Intercity coaches connect Podgorica, the coast, and inland towns. Confirm terminal, operator, luggage rules, and departure time; schedules can be seasonal.",
        "Local trips: Ride-hailing availability is limited and city-specific. Agree taxi fares before departure. Kotor and other old towns have steep, uneven pedestrian routes."
      ],
      [source("ŽPCG official timetable and tickets", "https://www.zpcg.me/en"), source("Airports of Montenegro", "https://montenegroairports.com/en/")]
    ),
    dailyLiving: stage(
      "Glovo coverage is address-specific in larger towns. Ask locally about water and pharmacy hours, especially on the coast outside peak season.",
      [
        "Delivery and shops: Check Glovo or local listings for the exact address; availability is strongest in larger towns and varies seasonally. Confirm opening hours, especially outside summer.",
        "Health and water: Ask your accommodation about local water supply and the nearest open pharmacy. Bring essential medication in original packaging and verify import requirements.",
        "Food and payment: Coastal menus often feature seafood; inland dishes differ. Ask about ingredients and allergens. Euro is used; check bills for any service charge and tip at your discretion."
      ],
      [source("Glovo service availability", "https://glovoapp.com/"), source("Montenegro National Tourism Organisation", "https://www.montenegro.travel/en")]
    ),
    socialCode: stage(
      "Ask before photographing people or religious sites. At home, follow your host's lead on shoes and gifts; customs differ between households and regions.",
      [
        "Home visits: Ask whether to remove shoes and whether a small local food gift is welcome. Do not assume alcohol is appropriate for every host.",
        "Religious and heritage sites: Follow posted clothing and photography rules; ask permission before photographing people or private property.",
        "Conversation: Use a polite greeting and ask which language is preferred. Avoid generalizations about regional identity or customs."
      ],
      [source("Montenegro National Tourism Organisation", "https://www.montenegro.travel/en")]
    )
  },
  MK: {
    preArrival: stage(
      "Use AZair for low-cost European combinations, plus Google Flights/Skyscanner for broad comparisons. Verify North Macedonia's national entry rules and current airport routes.",
      [
        "Flight routing: Skopje (SKP) is the main hub; Ohrid (OHD) has a smaller, seasonal network. Compare broad searches with Google Flights/Skyscanner and AZair, then confirm route, baggage, and schedule with the airline.",
        "Entry rules: North Macedonia is outside Schengen. Visa eligibility and stay limits depend on passport nationality; verify with the Ministry of Foreign Affairs or the relevant embassy before travel.",
        "Climate and clothing: Skopje has cold winters and hot summers; Ohrid and mountain areas differ. Check forecasts and pack layers, sun protection, and walking shoes."
      ],
      [source("North Macedonia Ministry of Foreign Affairs", "https://mfa.gov.mk/en"), source("Skopje International Airport passenger guide and transport", "https://skp.airports.com.mk/en-EN/passenger-guide/to-from-the-airport")]
    ),
    arrival24h: stage(
      "North Macedonia uses denar (MKD) and 230 V / 50 Hz Type C/F sockets. Skopje Airport posts current transport choices; carry some cash for small purchases.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check device labels before use.",
        "Connectivity and payment: Check carrier roaming/eSIM availability. Cards are common in Skopje but cash remains useful in smaller towns; local currency is the denar (MKD). Confirm ATM fees with your bank.",
        "Airport transfer: Skopje Airport's passenger guide lists current transport alternatives. Recheck schedules and stops after landing; use a licensed taxi or verified booking and confirm the fare before departure."
      ],
      [source("Electrical standards and socket types", "https://www.power-plugs-sockets.com/macedonia/"), source("Skopje Airport transport and passenger guide", "https://skp.airports.com.mk/en-EN/passenger-guide/to-from-the-airport")]
    ),
    mobility: stage(
      "Skopje primarily uses buses; JSP publishes city transport information. Intercity buses are more useful than rail for many routes; check schedules by corridor.",
      [
        "Skopje: JSP operates city buses. Check current timetables, ticket options, and service notices with the operator; route and payment details can change.",
        "Intercity: Coaches connect Skopje, Ohrid, Bitola, and neighboring capitals. Verify departure terminal and schedule with the carrier; do not assume a rail alternative serves each route.",
        "Taxis and walking: Confirm ride-app coverage at the destination and check the fare before riding. Sidewalks and crossings vary by district; use marked crossings and inspect hilly routes."
      ],
      [source("JSP Skopje public transport", "https://jsp.com.mk/"), source("Skopje Airport passenger transport", "https://skp.airports.com.mk/en-EN/passenger-guide/to-from-the-airport")]
    ),
    dailyLiving: stage(
      "Check Korpa, Wolt, or local listings against your exact Skopje address; coverage outside major cities is limited. Ask locally about water and pharmacy access.",
      [
        "Delivery: Korpa and Wolt are examples to check in Skopje; app coverage, phone requirements, and payment options vary by neighborhood and city. Confirm service before relying on it.",
        "Health and water: Ask your accommodation about local water guidance and the nearest open pharmacy. Bring prescribed medicines in original packaging and verify import rules.",
        "Food and money: Local dishes include tavče gravče and ajvar; ask about allergens and dietary needs. The denar is the currency. Check receipts for any service charge; tipping is venue-dependent."
      ],
      [source("Korpa North Macedonia", "https://korpa.mk/"), source("Wolt service availability", "https://wolt.com/"), source("North Macedonia tourism information", "https://northmacedonia-timeless.com/")]
    ),
    socialCode: stage(
      "At churches and mosques, follow posted dress and photography guidance. At home, ask whether to remove shoes and what gift is welcome.",
      [
        "Home visits: Ask about footwear and gift preferences; a small food item may be appropriate, but follow the host's lead.",
        "Religious sites: Dress respectfully where requested and follow photography rules. Ask permission before photographing people or ceremonies.",
        "Language and etiquette: Macedonian and Albanian are widely used in different communities. Ask which language is preferred, greet politely, and avoid assuming one custom applies everywhere."
      ],
      [source("North Macedonia tourism information", "https://northmacedonia-timeless.com/")]
    )
  },
  RO: {
    preArrival: stage(
      "Use AZair for low-cost European itineraries and compare Google Flights/Skyscanner for wider routes. Romania is in Schengen; check your passport's current 90/180 position.",
      [
        "Flight routing: Bucharest (OTP) is the main international hub; Cluj (CLJ), Iași (IAS), and Timișoara (TSR) are useful regional gateways. Compare Google Flights/Skyscanner with AZair and verify each operating carrier.",
        "Entry rules: Romania is in Schengen. Short-stay eligibility depends on nationality and days already spent in the area; check the European Commission's current guidance and consular instructions.",
        "Climate and packing: Romania has cold winters and warm summers, with mountain weather changing quickly. Check forecasts for city and rural legs; pack layers and suitable shoes for cobbles or hiking."
      ],
      [schengen, source("Bucharest Airports passenger information", "https://bucharestairports.ro/en/"), source("FCDO Romania entry and travel advice", "https://www.gov.uk/foreign-travel-advice/romania")]
    ),
    arrival24h: stage(
      "Romania uses 230 V / 50 Hz Type C/F sockets and the leu (RON). OTP has rail and bus connections; check current airport and operator notices.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Confirm your device supports the voltage; an adapter alone is not a converter.",
        "Connectivity and payment: Romania uses the leu (RON). Cards and contactless are common in cities, but keep cash for small merchants and rural stops. Check roaming/eSIM plans before departure.",
        "Airport transfer: Bucharest OTP is linked to the city by train and bus. Check Bucharest Airports' live passenger information and the rail/bus operator for current timetable, ticket, and station details. Use an official taxi desk or a verified ride booking."
      ],
      [plugs("romania"), source("Bucharest Airports", "https://bucharestairports.ro/en/"), source("CFR passenger rail", "https://www.cfrcalatori.ro/en/")]
    ),
    mobility: stage(
      "Bucharest has metro, bus, tram, and trolleybus networks; STB and Metrorex publish routes and fares. CFR serves intercity rail; check delays and station details.",
      [
        "Bucharest: STB operates surface transport and Metrorex the metro. Check each operator's current route, ticket, and validation information; an urban pass may not cover intercity rail.",
        "Intercity: CFR Călători publishes rail schedules and booking. Train times and infrastructure works can affect journeys; confirm the station and latest service notices.",
        "Ride-hailing and walking: Bolt and Uber operate in some cities; compare the licensed pickup and displayed fare. Historic centres have uneven paving and busy traffic; plan crossings carefully."
      ],
      [source("STB Bucharest surface transit", "https://www.stbsa.ro/eng"), source("Metrorex", "https://www.metrorex.ro/"), source("CFR Călători", "https://www.cfrcalatori.ro/en/")]
    ),
    dailyLiving: stage(
      "Glovo and Wolt serve many urban areas; confirm the exact address. Ask your accommodation about tap water, particularly in older buildings or outside major cities.",
      [
        "Delivery: Check Glovo or Wolt at your address; coverage and opening hours vary by city and neighborhood. Confirm phone and payment requirements before depending on delivery.",
        "Health and water: Ask locally about building plumbing and municipal notices; use sealed or treated water if uncertain. Locate a duty pharmacy and bring prescriptions in original packaging.",
        "Food and payment: Try sarmale, mici, or regional soups; ask about ingredients and allergens. The leu is used; tipping and service charges vary, so review the receipt. Buffet rules are venue-specific."
      ],
      [source("Glovo service availability", "https://glovoapp.com/"), source("Wolt Romania", "https://wolt.com/en/rou"), source("FCDO Romania health guidance", "https://www.gov.uk/foreign-travel-advice/romania/health")]
    ),
    socialCode: stage(
      "At churches, follow posted clothing and photography rules. For home visits, ask about shoes and gifts; household practices vary.",
      [
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Let the host set the pace for greetings and the meal.",
        "Religious and heritage sites: Follow posted dress, photography, and service rules; ask before photographing people or ceremonies.",
        "Conversation: Romanian is the official language; English familiarity varies by place and person. Ask politely which language is comfortable and avoid broad claims about national character."
      ],
      [source("FCDO Romania local laws and safety advice", "https://www.gov.uk/foreign-travel-advice/romania/safety-and-security")]
    )
  },
  RS: {
    preArrival: stage(
      "Use AZair for low-cost European combinations and compare Belgrade routes with Google Flights/Skyscanner. Serbia is outside Schengen; check the MFA visa regime for your passport.",
      [
        "Flight routing: Belgrade (BEG) is the main international gateway. Compare Google Flights/Skyscanner and AZair, then confirm schedule, baggage, and payment with the airline. Nearby airports can require a substantial ground transfer.",
        "Entry: Serbia is outside Schengen and maintains its own visa regime. Search the Serbian MFA's country-by-country guidance for your passport and trip purpose; verify passport validity and stay limits before booking.",
        "Climate and clothing: Belgrade has cold winters and hot summers; mountain and southern areas differ. Check the forecast and pack layers. For Orthodox sites, follow posted dress and photography rules."
      ],
      [source("Serbian Ministry of Foreign Affairs visa regime", "https://www.mfa.gov.rs/en/citizens/travel-serbia/visa-regime"), source("Belgrade Airport", "https://beg.aero/eng")]
    ),
    arrival24h: stage(
      "Serbia uses dinar (RSD) and 230 V / 50 Hz Type C/F sockets. Confirm airport transfer, card fees, and foreign-card compatibility before relying on them.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check your device label and adapter before use.",
        "Connectivity and payment: RSD is the local currency. Cards are common in Belgrade, but cash is useful elsewhere; check foreign transaction fees and roaming with your providers.",
        "Airport transfer: Belgrade Airport publishes current transport information. Confirm bus routes and airport taxi-zone procedures on the official page; use marked services or verified bookings and confirm the fare."
      ],
      [plugs("serbia"), source("Belgrade Airport passenger transport", "https://beg.aero/eng"), source("Serbian Ministry of Foreign Affairs", "https://www.mfa.gov.rs/en/")]
    ),
    mobility: stage(
      "Belgrade uses buses, trams, and trolleybuses; check current city ticketing and route notices. Intercity rail is resuming on some corridors; verify the exact service.",
      [
        "Belgrade: Public transport operates across bus, tram, and trolleybus routes. Check current city transport information for ticket purchase and validation; route changes can occur.",
        "Intercity: Serbian rail service is corridor-specific and subject to infrastructure changes. Verify the destination, station, and timetable with the operator before planning a connection.",
        "Taxis and walking: CarGo and taxi services may be available in Belgrade; compare pickup details and fare in the app. Knez Mihailova and riverfront paths are walkable, but paving and crossing conditions differ elsewhere."
      ],
      [source("Belgrade public transport information", "https://www.bgprevoz.rs/"), source("Serbian rail passenger information", "https://www.srbvoz.rs/")]
    ),
    dailyLiving: stage(
      "Wolt and Glovo serve many urban addresses; confirm coverage in-app. Ask locally about water and pharmacy hours, especially outside Belgrade.",
      [
        "Delivery: Check Wolt or Glovo against your exact address, phone, and payment method. Availability is thinner in smaller towns; confirm shop hours.",
        "Health and water: Ask your accommodation about local water notices and the nearest open pharmacy. Bring prescriptions in original packaging and verify import rules.",
        "Food and payment: Try local dishes such as ćevapi or pljeskavica; ask about ingredients and allergens. Dinar is used. Service charges and tipping differ by venue; review the bill."
      ],
      [source("Wolt Serbia", "https://wolt.com/en/srb"), source("Glovo service availability", "https://glovoapp.com/"), source("Serbia tourism information", "https://www.serbia.travel/en")]
    ),
    socialCode: stage(
      "Ask before photographing people or religious services. For a home visit, ask about shoes and gifts; do not assume a fixed greeting or tipping custom.",
      [
        "Home visits: Ask whether to remove shoes and whether a small food gift is welcome. Follow the host's lead on greetings and meals.",
        "Religious sites: Follow posted dress and photography rules and ask permission before photographing people or ceremonies.",
        "Communication: Serbian is the official language, with English use varying by location and age. Begin politely and ask which language is preferred; avoid overgeneralizing customs."
      ],
      [source("Serbia tourism information", "https://www.serbia.travel/en")]
    )
  },
  SI: {
    preArrival: stage(
      "Use AZair for low-cost European combinations alongside Google Flights/Skyscanner. Slovenia is in Schengen; check passport eligibility and prior 90/180 days.",
      [
        "Flight routing: Ljubljana (LJU) is the main airport. Compare Google Flights/Skyscanner with AZair for low-cost European routes; nearby Trieste, Venice, or Zagreb can be alternatives only after including the full ground transfer.",
        "Entry rules: Slovenia is in Schengen. Visa eligibility and short-stay days depend on nationality and prior stays; use current European Commission guidance and the relevant consulate.",
        "Climate and clothing: Ljubljana has cold winters and warm summers; Alpine and coastal weather differs. Check forecasts, pack layers and rain protection, and bring footwear suited to hiking if visiting the Julian Alps."
      ],
      [schengen, source("Ljubljana Airport destinations and transport", "https://www.lju-airport.si/en/"), source("Slovenian tourism information", "https://www.slovenia.info/en")]
    ),
    arrival24h: stage(
      "Slovenia uses euro and 230 V / 50 Hz Type C/F sockets. Ljubljana Airport lists current transport and mobile-data options; verify bus schedules before arrival.",
      [
        "Power: 230 V / 50 Hz, Type C and F sockets. Check device voltage and adapter compatibility.",
        "Connectivity and payment: Slovenia uses the euro. Cards and contactless are common, though small rural businesses may differ. Check your roaming plan; EU roaming is subject to plan terms and fair-use limits.",
        "Airport transfer: Ljubljana Airport publishes current bus, taxi, and shuttle information. Check the timetable, stop, and destination before landing; nearby-city bus options are not the same as a direct city route."
      ],
      [plugs("slovenia"), source("Ljubljana Airport ground transport", "https://www.lju-airport.si/en/transport/"), source("Ljubljana Airport mobile data", "https://www.lju-airport.si/en/airport/services/wing-esim/")]
    ),
    mobility: stage(
      "Ljubljana uses buses, with Urbana for city fares and live arrivals from LPP. Slovenian Railways connects larger towns; confirm mountain and seasonal bus links.",
      [
        "Ljubljana: LPP operates buses and publishes arrivals, detours, Urbana card/payment options, and fares. Check service updates before travel; the city centre has extensive pedestrian and cycle areas.",
        "Intercity: Slovenian Railways (SŽ) serves major towns. Rural, lake, and mountain links may rely on scheduled buses or seasonal services; check the full route and return trip.",
        "Micro-mobility and walking: BicikeLJ is a city bike-share scheme with registration and station rules. Historic paving and Alpine trails require different footwear and planning; use marked routes."
      ],
      [source("Ljubljana LPP routes and Urbana", "https://www.lpp.si/en"), source("Slovenian Railways passenger information", "https://potniski.sz.si/en/")]
    ),
    dailyLiving: stage(
      "Wolt and Glovo serve Ljubljana and some other cities; verify exact-address coverage. Tap-water advice is local, so follow municipal notices and accommodation guidance.",
      [
        "Delivery: Check Wolt, Glovo, or local grocery services at your exact address; coverage falls outside larger urban areas. Confirm opening hours and phone requirements.",
        "Health and water: Tap-water quality is generally managed by local utilities; follow municipal notices and ask about building-specific issues. Check the local duty-pharmacy rota and bring prescribed medicines in original packaging.",
        "Food and payment: Try štruklji or regional dishes and ask about allergens. Euro is used. Check the receipt for service charges; tipping is discretionary."
      ],
      [source("Wolt Slovenia", "https://wolt.com/en/svn"), source("Glovo service availability", "https://glovoapp.com/"), source("Slovenian tourism information", "https://www.slovenia.info/en")]
    ),
    socialCode: stage(
      "Ask before photographing people or private property. For home visits, follow your host on shoes and gifts; at Alpine sites, follow trail and environmental rules.",
      [
        "Home visits: Ask whether to remove shoes and whether a small local food gift is welcome. Household customs vary; follow the host's lead.",
        "Outdoor and heritage spaces: Stay on marked trails, follow conservation notices, and observe posted rules at caves, churches, and historic sites.",
        "Interaction: Begin politely and give others personal space. Ask before photographing people or private property; avoid turning a reserved or outdoors-oriented stereotype into a rule for individuals."
      ],
      [source("Slovenian tourism information", "https://www.slovenia.info/en")]
    )
  },
  TR: {
    preArrival: stage(
      "Compare Istanbul and regional airports with Google Flights/Skyscanner; use AZair for low-cost European connections and check Pegasus/Turkish Airlines directly. Use Turkey's official e-Visa portal only if eligible.",
      [
        "Flight routing: Istanbul (IST/SAW), Ankara (ESB), Izmir (ADB), and Antalya (AYT) serve different regions. Compare broad search engines and AZair for low-cost European legs; confirm baggage, airport, and route with Turkish Airlines, Pegasus, or the operating carrier.",
        "Entry rules: Turkey's e-Visa eligibility is nationality- and passport-specific and may include conditions. Check the official e-Visa portal and Turkish MFA guidance; do not assume visa-on-arrival or universal e-Visa access.",
        "Climate and clothing: Turkey spans several climate zones. Check city-specific forecasts. At mosques, follow posted dress guidance; lightweight layers and sun protection are useful in warmer seasons."
      ],
      [source("Official Türkiye e-Visa", "https://www.evisa.gov.tr/en/"), source("Türkiye Ministry of Foreign Affairs", "https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa"), source("GoTürkiye tourism information", "https://goturkiye.com/")]
    ),
    arrival24h: stage(
      "Turkey uses lira (TRY) and 220 V / 50 Hz Type C/F sockets. IST and SAW have separate airport-transfer networks; check official airport notices and current fares.",
      [
        "Power: 220 V / 50 Hz, Type C and F sockets. Check device voltage before use.",
        "Connectivity and payment: The lira (TRY) is the currency. Cards are accepted widely in urban areas, but cash is useful for smaller purchases. Check roaming/eSIM and foreign-card terms with your providers.",
        "Airport transfer: Istanbul Airport (IST) and Sabiha Gökçen (SAW) are on different sides of the city and use different connections. Check the relevant airport's current metro, bus, and taxi information; allow for traffic and verify fares before travel."
      ],
      [plugs("turkey"), source("Istanbul Airport passenger information", "https://www.istairport.com/en/"), source("Istanbul Metro official network", "https://www.metro.istanbul/en")]
    ),
    mobility: stage(
      "Istanbul combines metro, tram, Marmaray, ferry, and bus; use Istanbulkart and Metro Istanbul's current network notices. Dolmuş routes and payment vary locally.",
      [
        "Istanbul: Metro Istanbul operates rail lines; ferries, trams, and buses use separate operator information. Istanbulkart is widely used for integrated transit; check current fares, transfers, and service changes.",
        "Other cities: Ankara and Izmir have their own metro/rail and bus operators. Check the municipal app or transport website for each city rather than assuming Istanbul's fare card works nationwide.",
        "Shared and app-based trips: Dolmuş shared minibuses serve fixed corridors, but stops and payment practices vary. BiTaksi and Uber may dispatch licensed taxis; confirm the vehicle, route, and fare. Hills and crowded sidewalks affect walking in many districts."
      ],
      [source("Metro Istanbul network and service information", "https://www.metro.istanbul/en"), source("Istanbulkart", "https://www.istanbulkart.istanbul/")]
    ),
    dailyLiving: stage(
      "Yemeksepeti and Getir are useful urban delivery examples; coverage and payment depend on the exact address. Ask locally about tap water and pharmacy access.",
      [
        "Delivery: Yemeksepeti, Getir, and Trendyol Go operate in parts of Turkey; service areas and operating companies can change. Check address, phone, payment, and hours in the current app before relying on it.",
        "Health and water: Tap-water taste and local advice vary; ask your accommodation and use sealed water if uncertain. Pharmacies (eczane) have posted duty rotations; bring prescriptions in original packaging and check import rules.",
        "Food and payment: Try regional cuisine and ask about ingredients or allergens. Alcohol sales and service hours are regulated and can vary by locality. Check the bill for service charges; tipping is discretionary."
      ],
      [source("Yemeksepeti", "https://www.yemeksepeti.com/"), source("Getir Türkiye", "https://getir.com/"), source("GoTürkiye tourism information", "https://goturkiye.com/")]
    ),
    socialCode: stage(
      "At mosques, follow posted clothing and shoe-removal rules. Ask before photographing people; for home visits, check whether a small gift is welcome.",
      [
        "Religious sites: Follow posted guidance on clothing, footwear, prayer areas, and photography. Carry a scarf or covering if you plan to visit a mosque.",
        "Home visits and dining: Ask whether to remove shoes and whether a small food or tea gift is appropriate. Alcohol is not a suitable default gift; check the host's preferences.",
        "Greetings and conduct: Customs vary by region and individual. Begin politely, let the other person set the greeting style, and ask permission before photographing people or private property."
      ],
      [source("GoTürkiye tourism information", "https://goturkiye.com/")]
    )
  }
};

const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing Balkan destination: ${iso}`);
  if (update.currency) destination.currency = update.currency;
  for (const stageName of ["preArrival", "arrival24h", "mobility", "dailyLiving", "socialCode"]) {
    destination.stages[stageName] = { ...destination.stages[stageName], ...update[stageName] };
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);