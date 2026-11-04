import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-04";
const updates = {
  NA: {
    summary: "Hosea Kutako International Airport (WDH) is about 45 km east of Windhoek; verify the transfer before arrival.",
    previous: "Arrival transfer: WDH is outside central Windhoek. Confirm shuttle, rental-car, or hotel pickup in advance; use licensed providers and verify the pickup point.",
    detail: "Airport transfer: Hosea Kutako International Airport (WDH) is about 45 km east of Windhoek. Namibia Airports Company lists airport shuttles, taxis, and car-rental facilities; confirm current availability, schedule, fare, and pickup arrangements before arrival.",
    sources: [{
      topic: "Hosea Kutako International Airport ground transport and facilities",
      url: "https://www.airports.com.na/hosea-kutako-international-airportoverview/29/"
    }]
  },
  BY: {
    summary: "From Minsk National Airport (MSQ), check current airport buses/minibuses to Minsk and the official taxi-transfer desk.",
    detail: "Airport transfer: Minsk National Airport (MSQ) has airport buses and minibuses connecting with Uručča metro and the central bus/rail terminals. Check the official airport timetable for current routes and departures. The airport also lists an official taxi-transfer desk; confirm the fare, payment method, pickup point, and destination before leaving. Review current travel advice and entry restrictions before the trip.",
    sources: [
      {
        topic: "Minsk airport transport routes and taxi transfer guidance",
        url: "https://en.wikivoyage.org/wiki/Minsk#By_plane"
      },
      {
        topic: "Minsk National Airport bus timetable",
        url: "https://airport.by/en/transport/regular-route-bus"
      },
      {
        topic: "Minsk National Airport official transfer desk",
        url: "https://airport.by/en/tourism/transfer"
      }
    ]
  },
  BO: {
    summary: "El Alto International Airport (LPB) is about 4,058 m above sea level; verify shared-van or radio-taxi options into La Paz.",
    detail: "Airport transfer: El Alto International Airport (LPB) sits at about 4,058 m above sea level. The La Paz guide lists shared vans into the city and taxis; it recommends radio taxis identifiable by a sign on the roof and warns about unmarked cabs. Verify current availability, route, pickup point, and fare before boarding. Move slowly on arrival and allow time to acclimatize before strenuous activity.",
    sources: [{
      topic: "El Alto International Airport transfers and altitude guidance",
      url: "https://en.wikivoyage.org/wiki/La_Paz#By_plane"
    }]
  },
  PK: {
    summary: "Islamabad International Airport lists radio cabs at the Concourse Hall and yellow cabs in the car park; agree the fare first.",
    detail: "Airport transfer: Pakistan Airports Authority lists radio-cab service at the Concourse Hall and yellow cabs in the car parking area at Islamabad International Airport (ISB). Some hotels also offer pickup; arrange this directly with your accommodation. Check the airport's current provider information, verify the vehicle and destination, and agree the fare before departure.",
    sources: [{
      topic: "Islamabad International Airport official taxi pickup information",
      url: "https://islamabadairport.com.pk/Passengers/Pas-Taxi.aspx"
    }]
  },
  GB: {
    summary: "At Heathrow (LHR), choose from Heathrow Express, Elizabeth line, Piccadilly line, coaches, or licensed taxis.",
    detail: "Airport transfer: At Heathrow (LHR), rail options include Heathrow Express to Paddington, the Elizabeth line to central London, and the Piccadilly line serving all terminals. Heathrow also lists buses/coaches and licensed taxis or minicabs. Follow terminal signs, use licensed pickup points, and check the airport journey planner for current disruptions. Other UK airports have different connections.",
    sources: [
      {
        topic: "Heathrow rail connections and destinations",
        url: "https://www.heathrow.com/transport-and-directions/by-rail-or-train"
      },
      {
        topic: "Heathrow transport and taxi options",
        url: "https://www.heathrow.com/transport-and-directions"
      }
    ]
  },
  NL: {
    summary: "At Schiphol (AMS), the train station is beneath the terminal; the Amsterdam Airport Express stops by Schiphol Plaza.",
    detail: "Airport transfer: Schiphol's train station is directly below the terminal, with frequent services to Amsterdam and other Dutch cities. Bus stops are in front of Schiphol Plaza; the Amsterdam Airport Express is route 397 by day and N97 at night. Schiphol warns that construction can temporarily move some bus stops, so check the airport and NS/9292 updates. Use the official taxi stand or a reserved taxi's designated pickup point.",
    sources: [
      {
        topic: "Schiphol rail station and train connections",
        url: "https://www.schiphol.nl/en/from-to-schiphol/by-public-transport/train/"
      },
      {
        topic: "Schiphol bus routes and airport stops",
        url: "https://www.schiphol.nl/en/from-to-schiphol/by-public-transport/bus/"
      },
      {
        topic: "Schiphol taxi pickup locations",
        url: "https://www.schiphol.nl/en/from-to-schiphol/taxi/"
      }
    ]
  },
  IE: {
    summary: "Dublin Airport (DUB) has bus and coach zones at both terminals, plus taxi dispatchers outside T1 and T2.",
    detail: "Airport transfer: Dublin Airport's TFI buses connect the airport with the city and wider region, with services described by the airport as frequent and 24-hour. Follow the T1 or T2 bus-zone map for your operator's pickup point; routes and tickets vary. Taxis wait outside both terminals, where dispatchers can assist. Check the current airport and Transport for Ireland journey information before travel.",
    sources: [
      {
        topic: "Dublin Airport bus services and terminal pickup zones",
        url: "https://www.dublinairport.com/to-from-the-airport/by-bus"
      },
      {
        topic: "Dublin Airport taxi ranks and dispatchers",
        url: "https://www.dublinairport.com/to-from-the-airport/by-taxi"
      }
    ]
  },
  DE: {
    summary: "At Munich (MUC), S1/S8 trains and the Lufthansa Express Bus connect both terminals with central Munich.",
    detail: "Airport transfer: At Munich Airport (MUC), the S1 and S8 S-Bahn lines serve the station between Terminals 1 and 2 and connect to central Munich. The Lufthansa Express Bus also serves the airport, with stops at Terminal 2 and Terminal 1 arrivals. Check MVV/S-Bahn operating updates and the airport's public-transport page before travel. Frankfurt (FRA) and other German airports have separate connections.",
    sources: [{
      topic: "Munich Airport public transport connections",
      url: "https://www.munich-airport.com/public-transport-260822"
    }]
  },
  CA: {
    summary: "At Toronto Pearson (YYZ), UP Express runs from Terminal 1 to Union Station; use Terminal Link from Terminal 3.",
    detail: "Airport transfer: Toronto Pearson's UP Express runs between the airport and Union Station in downtown Toronto. The UP Express station is in Terminal 1; passengers at Terminal 3 can use the free Terminal Link train to reach it. Check current departure information and service notices before travel. Other Canadian airports have different connections.",
    sources: [{
      topic: "Toronto Pearson UP Express route and terminal access",
      url: "https://www.torontopearson.com/en/transportation-and-parking/up-express"
    }]
  },
  CO: {
    summary: "At Bogota El Dorado (BOG), use the airport's regulated taxi dispatch or a public bus to Portal El Dorado and connect to TransMilenio.",
    detail: "Airport transfer: At Bogota El Dorado (BOG), regulated taxis are dispatched from the airport; use the official stand and keep the printed fare ticket. For public transport, airport feeder bus 16-14 connects with Portal El Dorado, where TransMilenio routes continue into the city. Carry only luggage suitable for buses and check current TransMilenio guidance before travel. Avoid hailing an unrequested taxi at the curb.",
    sources: [
      {
        topic: "El Dorado airport taxi dispatch and public-bus connection",
        url: "https://en.wikivoyage.org/wiki/Bogot%C3%A1#By_plane"
      },
      {
        topic: "TransMilenio public transport information",
        url: "https://www.transmilenio.gov.co/"
      }
    ]
  },
  EC: {
    summary: "At Quito Mariscal Sucre (UIO), public buses connect the terminal with Rio Coca, Quitumbe, and Carcelen; airport taxis are dispatched inside arrivals.",
    detail: "Airport transfer: Quito Mariscal Sucre Airport (UIO) is outside the city in Tababela. Public buses board at the marked stops outside the terminal and connect with Rio Coca, Quitumbe, and Carcelen; confirm the route and onward connection for your destination. The airport taxi kiosk is inside the terminal after baggage claim and can direct passengers to the taxi rank. The airport-to-city drive time varies with traffic; check current road conditions, and allow time to acclimatize to Quito's altitude.",
    sources: [
      {
        topic: "Quito airport transport, taxi kiosk, and public-bus stops",
        url: "https://www.aeropuertoquito.aero/transporte/?lang=en"
      },
      {
        topic: "Quito public-bus routes from Mariscal Sucre Airport",
        url: "https://en.wikivoyage.org/wiki/Quito#By_plane"
      }
    ]
  },
  AU: {
    summary: "At Sydney (SYD), Airport Link trains connect both terminals to the city; at Melbourne (MEL), SkyBus coaches run to Southern Cross Station.",
    detail: "Airport transfer: At Sydney (SYD), Airport Link trains serve the domestic and international terminals and connect with central Sydney; check the airport-station access fee and current Opal/contactless rules. At Melbourne (MEL), SkyBus runs from the airport to Southern Cross Station, and public bus 901 connects via Broadmeadows. These gateways have different fares and pickup points; check the local airport and operator for current service. Other Australian airports have their own transfers.",
    sources: [
      {
        topic: "Sydney Airport Link train connection",
        url: "https://en.wikivoyage.org/wiki/Sydney#By_plane"
      },
      {
        topic: "Melbourne Airport bus and SkyBus options",
        url: "https://en.wikivoyage.org/wiki/Melbourne#By_plane"
      },
      {
        topic: "SkyBus airport-coach services",
        url: "https://www.skybus.com.au/"
      }
    ]
  },
  NZ: {
    summary: "At Auckland Airport (AKL), an airport bus connects with Puhinui train station for rail service to central Auckland; shuttles and taxis also operate.",
    detail: "Airport transfer: At Auckland Airport (AKL), public transport can be taken by bus from the airport to Puhinui train station, then by train to Waitemata in central Auckland. Shuttles and taxis are alternatives. Confirm the current airport-bus route, stop at your terminal, rail disruptions, and payment requirements with Auckland Transport before travel. Other New Zealand airports have different connections.",
    sources: [
      {
        topic: "Auckland Airport bus-to-rail connection and other transfers",
        url: "https://en.wikivoyage.org/wiki/Auckland#By_plane"
      },
      {
        topic: "Auckland Transport airport services and journey planning",
        url: "https://at.govt.nz/bus-train-ferry/"
      }
    ]
  },
  SE: {
    summary: "At Stockholm Arlanda (ARN), express and commuter trains, airport buses, and taxis serve the airport; taxi ranks are at Terminals 2 and 5.",
    detail: "Airport transfer: Stockholm Arlanda (ARN) offers express, commuter, and long-distance trains, plus several airport-bus services. Follow terminal signs to the station or bus stops; check whether your chosen rail ticket includes the airport-station passage. The airport operator lists taxi pickup at Terminals 2 and 5. Stockholm-Bromma (BMA), Skavsta (NYO), and Vasteras (VST) are separate airports with different transfers.",
    sources: [
      {
        topic: "Stockholm Arlanda Airport official transport options and taxi locations",
        url: "https://www.swedavia.com/arlanda/transport/"
      },
      {
        topic: "Stockholm airport alternatives and Arlanda rail connections",
        url: "https://en.wikivoyage.org/wiki/Stockholm#By_plane"
      }
    ]
  },
  DK: {
    summary: "At Copenhagen Airport (CPH), the metro and InterCity trains leave from Terminal 3; taxis use marked terminal pickup points.",
    detail: "Airport transfer: Copenhagen Airport's metro station is directly connected to Terminal 3, and trains to Copenhagen and Malmö also depart from Terminal 3. Taxi pickup is directly outside Terminal 3; drop-off is outside Terminals 2 and 3. Check Rejseplanen for current routes and departures, and follow airport signs to the correct platform or taxi point.",
    sources: [
      {
        topic: "Copenhagen Airport metro connection and station location",
        url: "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/metro"
      },
      {
        topic: "Copenhagen Airport train routes and Terminal 3 access",
        url: "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/train"
      },
      {
        topic: "Copenhagen Airport taxi pickup and drop-off points",
        url: "https://www.cph.dk/en/parking-transport/bus-train-metro-taxi/taxi"
      }
    ]
  },
  AT: {
    summary: "From Vienna Airport (VIE), CAT, ÖBB S7/Railjet trains, and Vienna Airport Lines buses connect with Vienna.",
    detail: "Airport transfer: Vienna Airport (VIE) has several rail and bus options into Vienna. City Airport Train (CAT) runs to Wien Mitte; ÖBB S7 and Railjet trains serve Vienna stations and other destinations; Vienna Airport Lines coaches serve the city. Follow airport signs to the train station or coach stops, and check CAT, ÖBB, or Vienna Airport Lines for the route that fits your destination and current service.",
    sources: [{
      topic: "Vienna Airport rail and bus operator information",
      url: "https://www.viennaairport.com/passengers/arrival__parking/s-bahn__rail"
    }]
  },
  BE: {
    summary: "At Brussels Airport (BRU), the railway station is directly beneath the terminal, with trains to Brussels and other Belgian cities.",
    detail: "Airport transfer: Brussels Airport-Zaventem station is directly beneath the departures and arrivals halls on level -1. Direct trains connect the airport with Brussels-North, Brussels-Central, Brussels-South, and other Belgian destinations. Follow signs down to the station and check the Belgian rail operator for current departures and ticket requirements. Brussels South Charleroi (CRL) is a separate airport with different transfers.",
    sources: [{
      topic: "Brussels Airport station location and rail connections",
      url: "https://www.brusselsairport.be/en/passenger/mobility/public-transport/train"
    }]
  },
  CZ: {
    summary: "From Prague Airport (PRG), trolleybus 59 reaches Metro A at Nadrazi Veleslavin; bus 100 connects to Metro B at Zlicin.",
    detail: "Airport transfer: From Prague Airport (PRG), trolleybus 59 connects both terminals with Metro A at Nadrazi Veleslavin, while bus 100 connects with Metro B at Zlicin. The Airport Express bus runs from Terminal 1 to the main railway station as a separate service. Check DPP/PID for current departures and ticket validity; buy or validate the correct ticket before boarding.",
    sources: [
      {
        topic: "Prague Airport public-transport routes and terminal stops",
        url: "https://en.wikivoyage.org/wiki/Prague#By_plane"
      },
      {
        topic: "Prague integrated public-transport routes and journey planning",
        url: "https://pid.cz/en/lines/urban-buses/"
      }
    ]
  },
  FI: {
    summary: "At Helsinki Airport (HEL), commuter trains connect the terminal with central Helsinki; buses and taxis are also available.",
    detail: "Airport transfer: Helsinki Airport (HEL) is on the commuter-rail loop; the station is inside the terminal complex. Trains run toward central Helsinki, and airport buses serve the city and nearby destinations. Follow airport signs to the rail platforms or bus stops, and check HSL for current routes, service changes, and the correct fare zones. Taxis are available at the signed ranks.",
    sources: [
      {
        topic: "Helsinki Airport ground transport options and rail connection",
        url: "https://en.wikivoyage.org/wiki/Helsinki#By_plane"
      },
      {
        topic: "HSL journey planning and airport-zone information",
        url: "https://www.hsl.fi/en"
      }
    ]
  },
  HU: {
    summary: "From Budapest Airport (BUD), Airport Express 100E goes to Deak Ferenc ter; bus 200E connects to Metro M3 at Kobanya-Kispest.",
    detail: "Airport transfer: From Budapest Liszt Ferenc Airport (BUD), BKK Airport Express 100E runs from Terminal 2 to Deak Ferenc ter in the city centre. Bus 200E connects the airport with Kobanya-Kispest, where Metro M3 continues into the city. Follow the airport bus-stop signs, check BKK for current service and ticket requirements, and use marked taxi dispatch if taking a cab.",
    sources: [
      {
        topic: "BKK Airport Express 100E route and timetable",
        url: "https://bkk.hu/en/timetables/#100E"
      },
      {
        topic: "BKK bus 200E route and timetable",
        url: "https://bkk.hu/en/timetables/#200E"
      }
    ]
  },
  IS: {
    summary: "Keflavik Airport (KEF) is about 50 km from Reykjavik; airport coaches connect it with the city, while RKV serves domestic flights.",
    detail: "Airport transfer: Most international flights use Keflavik Airport (KEF), about 50 km from Reykjavik. An airport bus service, including Flybus and Airport Direct, connects KEF with Reykjavik; check the operator for current departures, booking, and the exact city or hotel drop-off. Taxis and rental cars are also available. Reykjavik Airport (RKV), next to the city centre, mainly serves domestic flights and is a different airport.",
    sources: [
      {
        topic: "Reykjavik airport locations and Keflavik coach connections",
        url: "https://en.wikivoyage.org/wiki/Reykjav%C3%ADk#By_plane"
      },
      {
        topic: "Flybus airport-coach service",
        url: "https://flybus.is/"
      }
    ]
  },
  ID: {
    summary: "From Jakarta Soekarno-Hatta (CGK), the airport commuter train and DAMRI buses serve central-city stations and bus terminals.",
    detail: "Airport transfer: From Jakarta Soekarno-Hatta (CGK), KAI Commuter's airport rail line connects the airport with downtown Jakarta. DAMRI airport buses serve major transport hubs, while JAConnexion coaches serve selected hotels and shopping centres. Follow terminal signs to the rail station or the relevant bus pickup point; check the operator for current destinations and departures. Traffic can make road transfers slow, so allow extra time.",
    sources: [
      {
        topic: "Jakarta airport rail, DAMRI bus, and hotel-coach options",
        url: "https://en.wikivoyage.org/wiki/Jakarta#By_plane"
      },
      {
        topic: "KAI Commuter airport rail information",
        url: "https://commuterline.id/"
      }
    ]
  },
  MX: {
    summary: "At Mexico City International (MEX), Metro Line 5 serves Terminal Aerea near Terminal 1 and Metrobús Line 4 serves both terminals.",
    detail: "Airport transfer: Mexico City International Airport (MEX/AICM) is served by Metro Line 5 at Terminal Aerea near Terminal 1 and by Metrobús Line 4, with stops at Terminals 1 and 2. Check current service and luggage rules before using the Metro. If taking a taxi, use an authorized airport taxi counter or marked pickup area rather than accepting a street solicitation. Confirm that your flight uses MEX, not Felipe Angeles (NLU) or Toluca (TLC), which have separate transfers.",
    sources: [
      {
        topic: "Mexico City airport metro and Metrobús connections",
        url: "https://en.wikivoyage.org/wiki/Mexico_City#By_plane"
      },
      {
        topic: "Mexico City Airport bus-terminal information",
        url: "https://www.aicm.com.mx/passengers/services/service-providers/transportation/buses"
      },
      {
        topic: "Mexico City Metro Line 5 stations",
        url: "https://www.metro.cdmx.gob.mx/la-red/linea-5"
      }
    ]
  },
  PE: {
    summary: "At Lima Jorge Chavez (LIM), AeroDirecto public buses and Airport Express Lima coaches serve the city; use official taxi desks if taking a cab.",
    detail: "Airport transfer: At Lima Jorge Chavez Airport (LIM), AeroDirecto public buses board on the airport grounds and connect with several parts of the city. Airport Express Lima coaches serve Miraflores from the airport. At arrivals, use a certified taxi-company desk or arrange a trusted pickup; avoid unsolicited drivers outside and verify the vehicle and fare before leaving. Check current routes and pickup points with the airport or operator.",
    sources: [
      {
        topic: "Lima airport AeroDirecto public-bus routes",
        url: "https://portal.atu.gob.pe/QR/AeroDirecto/"
      },
      {
        topic: "Lima airport express-coach and authorized taxi guidance",
        url: "https://en.wikivoyage.org/wiki/Lima#By_plane"
      },
      {
        topic: "Airport Express Lima service",
        url: "https://www.airportexpresslima.com/"
      }
    ]
  },
  NO: {
    summary: "From Oslo Gardermoen (OSL), Flytoget and Vy trains reach Oslo; airport coaches and marked taxi dispatch are alternatives.",
    detail: "Airport transfer: Oslo Gardermoen (OSL) is about 37 km from the city. Flytoget and Vy trains run from the airport station to Oslo, with different fares and ticket rules; Flybussen and other coaches also serve the airport. Follow signs to the station or coach stops, and check the operator for current departures. Use the airport's marked taxi booking point and confirm the quoted total before entering a car. Sandefjord Torp (TRF) is a separate, much farther airport with its own train shuttle and coach services.",
    sources: [
      {
        topic: "Oslo Airport transfer options, rail and coach operators",
        url: "https://en.wikivoyage.org/wiki/Oslo#By_plane"
      },
      {
        topic: "Vy rail services and journey planning",
        url: "https://www.vy.no/en"
      }
    ]
  },
  CH: {
    summary: "At Zurich Airport (ZRH), trains leave from the airport station for Zurich HB and other Swiss cities; tram 10 and buses are alternatives.",
    detail: "Airport transfer: Zurich Airport (ZRH) has a rail station connected to the terminal, with frequent trains to Zurich HB and onward connections across Switzerland. Tram 10 and regional buses also serve the airport, though the tram is slower for central Zurich. Follow signs to the rail platforms or surface stops, and check SBB/ZVV for current routes and tickets. Use the signed taxi rank if taking a cab.",
    sources: [
      {
        topic: "Zurich Airport ground transport and rail station",
        url: "https://en.wikivoyage.org/wiki/Zurich#By_plane"
      },
      {
        topic: "Swiss Federal Railways schedules and tickets",
        url: "https://www.sbb.ch/en"
      }
    ]
  },
  EE: {
    summary: "At Tallinn Airport (TLL), trams 2 and 4 connect from the terminal's public-transport centre; buses also serve the airport.",
    detail: "Airport transfer: Tallinn Airport (TLL) has a public-transport centre at the city end of the terminal; follow signs from Arrivals by lift, escalator, and walkway. Trams 2 and 4 connect the airport with the city, and buses also serve the terminal area. Construction may temporarily move stops, so follow airport signage and check Tallinn's live route planner before boarding. Use the airport's marked taxi pickup if taking a cab.",
    sources: [
      {
        topic: "Tallinn Airport public-transport centre, tram routes, and construction notices",
        url: "https://airport.ee/en/transport-and-parking/public-transport/"
      },
      {
        topic: "Tallinn public-transport routes and journey planner",
        url: "https://transport.tallinn.ee/#en"
      }
    ]
  },
  LV: {
    summary: "At Riga Airport (RIX), bus 22 runs to the city; its stop is in the P1 car park between Arrivals exits E and C.",
    detail: "Airport transfer: Riga Airport (RIX) says bus 22 connects the airport with the city centre. The stop is in the P1 car park between Arrivals exits E and C; follow the airport signs. Check Riga Airport and Rīgas satiksme for current routes, tickets, and late-night service before travel. If taking a taxi, use an official marked pickup point and agree or verify the fare before departure.",
    sources: [
      {
        topic: "Riga Airport official bus 22 route and stop location",
        url: "https://www.riga-airport.com/en/public-transport"
      },
      {
        topic: "Rīgas satiksme route and timetable information",
        url: "https://saraksti.lv/#/en"
      }
    ]
  },
  LT: {
    summary: "At Vilnius Airport (VNO), a train connects the airport with the central railway station; city buses are another option.",
    detail: "Airport transfer: At Vilnius Airport (VNO), the airport train connects with Vilnius railway station; city buses also run from outside Arrivals, including routes 1, 2, and 3G in published airport guidance. Check the airport and JUDU journey planner for current routes, station access, and departures, as schedules and stops can change. Use the marked taxi rank or arrange a pickup in advance, and confirm the fare before leaving.",
    sources: [
      {
        topic: "Vilnius Airport train, bus, and taxi transfer guidance",
        url: "https://en.wikivoyage.org/wiki/Vilnius#By_plane"
      },
      {
        topic: "Vilnius public-transport route planner and passenger information",
        url: "https://judu.lt/en/"
      },
      {
        topic: "Vilnius Airport official transport information",
        url: "https://www.vilnius-airport.lt/en/before-the-flight/transport"
      }
    ]
  },
  LU: {
    summary: "At Luxembourg Airport (LUX), tram T1 and city buses 6, 16, and 29 connect with the city; use the signed terminal stops.",
    detail: "Airport transfer: Luxembourg Airport (LUX) is served by tram T1 and city buses, including routes 6, 16, and 29. Follow terminal signs to the tram or the numbered bus quay; these services connect with city-centre and rail-station stops. Luxembourg Airport notes that construction can change pickup locations; check Mobiliteit.lu before travel. Taxis wait in front of the terminal; pre-booked taxis use the Kiss & Fly Parking C pickup zone. Verify cross-border public-transport ticket requirements separately.",
    sources: [
      {
        topic: "Luxembourg Airport official bus and tram routes, stops, and notices",
        url: "https://www.lux-airport.lu/parking-transport/bus/"
      },
      {
        topic: "Luxembourg Airport taxi rank and pre-booked pickup location",
        url: "https://www.lux-airport.lu/parking-transport/taxi/"
      },
      {
        topic: "Luxembourg public-transport journey planner",
        url: "https://www.mobiliteit.lu/en/"
      }
    ]
  },
  AD: {
    summary: "Andorra has no airport; nearby Andorra–La Seu d'Urgell Airport (LEU) has an Andbus shuttle to Andorra la Vella coordinated with flight arrivals and departures.",
    detail: "Airport transfer: Andorra has no airport of its own. Andorra–La Seu d'Urgell Airport (LEU) in Spain is about 12 km south of Andorra la Vella, and the Andorra guide reports an Andbus shuttle coordinated with flight arrivals and departures. Confirm the shuttle is operating for your travel date and verify current border-crossing and pickup arrangements; Barcelona and Toulouse are farther-away alternatives with separate coach connections.",
    sources: [{
      topic: "Andorra la Vella guide to nearby LEU airport and Andbus shuttle",
      url: "https://en.wikivoyage.org/wiki/Andorra_la_Vella#By_plane"
    }]
  },
  FJ: {
    summary: "At Nadi International Airport (NAN), yellow airport taxis wait outside Arrivals; buses and booked coach or private transfers also serve Nadi and resort destinations.",
    detail: "Airport transfer: At Nadi International Airport (NAN), Fiji Airports identifies yellow, airport-branded taxis at the designated rank directly outside Arrivals and says airport taxi trips use meters. The airport also lists public buses connecting Nadi with major centres and tour-operator desks for scheduled coaches or private transfers. Confirm the bus stop and destination before boarding, or arrange a resort pickup in advance. Nausori Airport (SUV) is a separate gateway; check local transport there independently.",
    sources: [
      {
        topic: "Fiji Airports public transport, buses, and Nadi airport transfer desks",
        url: "https://fijiairports.com/aflfiji/public-buses/"
      },
      {
        topic: "Fiji Airports taxi rank and metered taxi guidance at Nadi Airport",
        url: "https://fijiairports.com/aflfiji/taxis-services/"
      },
      {
        topic: "Fiji Airports public-transport overview for Nadi and Nausori airports",
        url: "https://fijiairports.com/public-transport/"
      }
    ]
  },
  AR: {
    summary: "In Buenos Aires, confirm whether your flight uses Ezeiza (EZE) or Aeroparque (AEP); city buses 33 and some 8 services serve AEP.",
    detail: "Airport transfer: Buenos Aires has separate airports: Ezeiza (EZE) and Aeroparque Jorge Newbery (AEP). At AEP, published city guidance lists buses 33 and some branches of 8 between the airport and central areas; use the airport's route planner or current operator information to confirm the stop and direction. EZE has separate coach and public-transport connections. Compare the airport with your hotel and check current routes before choosing a transfer. Use marked taxi or pre-booked pickup points and confirm the fare or app destination.",
    sources: [
      {
        topic: "Buenos Aires airport distinctions and Aeroparque bus connections",
        url: "https://en.wikivoyage.org/wiki/Buenos_Aires#By_plane"
      },
      {
        topic: "Buenos Aires city bus route planner",
        url: "https://buenosaires.gob.ar/movilidad/como-llego"
      },
      {
        topic: "Aeropuertos Argentina Aeroparque transport information",
        url: "https://www.aeropuertosargentina.com/aeroparque/como-llegar"
      }
    ]
  },
  PY: {
    summary: "At Asunción Silvio Pettirossi Airport (ASU), city bus 30-A boards about 200 m outside the terminal; taxis wait in front.",
    detail: "Airport transfer: At Silvio Pettirossi Airport (ASU), the Asunción guide identifies city bus 30-A at a stop about 200 m outside the terminal; the stop may not be signed, so verify the route and direction before setting out. Local buses may be unsuitable for bulky luggage and may not suit late arrivals. Taxis are another option, with the airport guide locating them in front of the terminal; agree or verify the fare before departure. Check current bus service with the airport or local route planner.",
    sources: [
      {
        topic: "Asunción airport bus 30-A, terminal stop, and taxi options",
        url: "https://en.wikivoyage.org/wiki/Asunci%C3%B3n#By_plane"
      },
      {
        topic: "DINAC airport authority",
        url: "https://www.dinac.gov.py/v3/"
      }
    ]
  },
  UY: {
    summary: "At Montevideo Carrasco Airport (MVD), public buses connect with the centre and intercity coaches stop at the airport; confirm each bus's direction.",
    detail: "Airport transfer: Carrasco International Airport (MVD) has public buses to central Montevideo, with the stop just outside the terminal; intercity coaches also stop at the airport, but check whether each is heading toward or away from the city. Taxis and pre-arranged transfers are alternatives. Verify current stops, routes, and departures with the airport or Montevideo's official journey planner before travel.",
    sources: [
      {
        topic: "Carrasco Airport public-bus and intercity-coach connections",
        url: "https://en.wikivoyage.org/wiki/Montevideo#By_plane"
      },
      {
        topic: "Montevideo municipal journey planner",
        url: "https://montevideo.gub.uy/aplicacion/como-ir"
      },
      {
        topic: "Carrasco International Airport",
        url: "https://www.aeropuertodecarrasco.com.uy/"
      }
    ]
  },
  CY: {
    summary: "At Larnaca Airport (LCA), city bus 425 serves Larnaca; Kapnos Airport Shuttle offers booked coach transfers between Cyprus airports and island destinations.",
    detail: "Airport transfer: Larnaca Airport (LCA) has scheduled city buses, including route 425 to Larnaca; check the current stop, route, and operating hours before relying on it. Kapnos Airport Shuttle operates bookable coach transfers linking Larnaca and Paphos airports with destinations across Cyprus, including Nicosia and resort areas. Use its live route planner for pickup points and departures. Taxis are also available; agree the destination and fare before leaving. Paphos Airport (PFO) is a separate gateway with different connections.",
    sources: [
      {
        topic: "Larnaca Airport city bus route and transport options",
        url: "https://en.wikivoyage.org/wiki/Larnaca#By_plane"
      },
      {
        topic: "Kapnos Airport Shuttle routes, stops, and booking",
        url: "https://booking.kapnosairportshuttle.com/coachtrip/?page=routesandfares"
      },
      {
        topic: "Kapnos Airport Shuttle service between Cyprus airports and destinations",
        url: "https://www.kapnosairportshuttle.com/"
      }
    ]
  },
  GT: {
    summary: "At Guatemala City La Aurora Airport (GUA), use a taxi or arrange a hotel shuttle; the ordinary city bus route has safety concerns.",
    detail: "Airport transfer: At La Aurora Airport (GUA), taxis are available and some hotels in Guatemala City's Zona 10 offer shuttle pickup. Confirm a hotel's shuttle directly, or use a reputable, arranged taxi and agree the destination before leaving. Although a city bus runs on a road past the airport, the Guatemala City guide warns of serious safety concerns on ordinary buses; do not assume it is a suitable airport transfer. Check current travel advice and service availability before arrival.",
    sources: [
      {
        topic: "Guatemala City La Aurora airport taxis, hotel shuttles, and bus safety caveat",
        url: "https://en.wikivoyage.org/wiki/Guatemala_City#By_plane"
      }
    ]
  },
  DO: {
    summary: "At Santo Domingo Las Américas Airport (SDQ), airport taxi service connects with the city; arrange pickup with your hotel and confirm the fare before departure.",
    detail: "Airport transfer: Las Américas International Airport (SDQ) is outside central Santo Domingo. Airport taxis serve the city; agree the destination and fare before departing, or arrange a hotel pickup in advance. The guide also describes a shared minivan to the Colonial Zone, but its fare and operating details may be outdated, so verify locally before relying on it. Santo Domingo has more than one airport; check whether your flight uses SDQ or La Isabela (JBQ).",
    sources: [{
      topic: "Santo Domingo airport transfer options and airport distinction",
      url: "https://en.wikivoyage.org/wiki/Santo_Domingo#By_plane"
    }]
  },
  GY: {
    summary: "At Cheddi Jagan Airport (GEO), taxis serve Georgetown; minibus 42 is listed between the airport and Timeri bus park.",
    detail: "Airport transfer: Cheddi Jagan International Airport (GEO) is well outside Georgetown. The Georgetown guide lists taxis and minibus 42 between the airport and Timeri bus park; verify that the minibus is operating and confirm the current stop and onward connection before boarding. For late arrivals or luggage, arrange a trusted hotel pickup or taxi in advance, agree the destination, and check current travel advice.",
    sources: [
      {
        topic: "Georgetown guide to Cheddi Jagan Airport taxi and minibus transfers",
        url: "https://en.wikivoyage.org/wiki/Georgetown_(Guyana)#By_plane"
      },
      {
        topic: "Cheddi Jagan International Airport official site",
        url: "https://cjairport-gy.com/"
      }
    ]
  },
  PG: {
    summary: "At Port Moresby Jacksons Airport (POM), taxis and a bus to downtown are listed; an arranged hotel transfer is the safer option.",
    detail: "Airport transfer: Jacksons International Airport (POM) has separate domestic and international terminals. The Port Moresby guide lists a bus connection to downtown and taxis outside the terminals, but also highlights serious city security risks. Arrange a hotel or trusted driver pickup in advance, confirm which terminal to meet, and check current travel advice before using a public bus or taxi.",
    sources: [{
      topic: "Port Moresby airport terminal and ground-transport guidance",
      url: "https://en.wikivoyage.org/wiki/Port_Moresby#By_plane"
    }]
  },
  PW: {
    summary: "At Palau's Roman Tmetuchl Airport (ROR), arrange a hotel shuttle or other transfer to Koror in advance; taxis do not reliably wait for arrivals.",
    detail: "Airport transfer: Roman Tmetuchl International Airport (ROR) is on Babeldaob, across the Japan-Palau Friendship Bridge from Koror. The Palau guide warns that taxis may not be waiting for incoming passengers; arrange a hotel shuttle or another confirmed transfer before arrival. Rental cars are also available at the airport. Verify the pickup location, destination, and current arrangements with your accommodation or provider.",
    sources: [
      {
        topic: "Palau airport transfer guidance and advice to arrange pickup in advance",
        url: "https://en.wikivoyage.org/wiki/Palau#By_plane"
      },
      {
        topic: "Koror airport access by shuttle bus and rental car",
        url: "https://en.wikivoyage.org/wiki/Koror#By_plane"
      }
    ]
  },
  KI: {
    summary: "At Bonriki Airport (TRW), Betio Lodge and Fema Lodge list airport transfers; arrange and confirm pickup with your accommodation before arrival.",
    detail: "Airport transfer: Bonriki International Airport (TRW) is in South Tarawa. The Kiribati Tourism Authority lists airport transfers at Betio Lodge and an airport shuttle at Fema Lodge, but does not indicate that these services are available from every accommodation. Book directly with your lodging and confirm the meeting point, destination, and current arrangements before your flight.",
    sources: [{
      topic: "Kiribati Tourism Authority South Tarawa accommodation airport-transfer listings",
      url: "https://kiribatitourism.gov.ki/in-south-tarawa"
    }]
  },
  NR: {
    summary: "At Nauru International Airport (INU), confirm whether your hotel will send a car; walking may be possible but depends on your lodging and conditions.",
    detail: "Airport transfer: Nauru International Airport (INU) is in Yaren District. The Nauru guide says your hotel may send a car, but pickup is not guaranteed and walking may be the fallback. Contact your accommodation before arrival to confirm a driver and meeting point; do not assume there will be a taxi. If considering walking, check the distance and weather, and account for heat and luggage.",
    sources: [{
      topic: "Nauru airport hotel pickup and walking fallback",
      url: "https://en.wikivoyage.org/wiki/Nauru#By_plane"
    }]
  },
  RW: {
    summary: "At Kigali International Airport (KGL), airport taxis wait for arriving passengers and buses pass the airport toward Remera, central Kigali, and Nyabugogo.",
    detail: "Airport transfer: Kigali International Airport (KGL) has taxis waiting for arriving passengers. The Kigali guide also lists buses on the road in front of the airport toward Remera, central Kigali, and Nyabugogo. Confirm the bus destination and stop before boarding; if taking a taxi, agree the price for your destination first. Airport guides can assist with transport and car hire.",
    sources: [
      {
        topic: "Kigali airport taxi, bus, and airport-guide assistance",
        url: "https://en.wikivoyage.org/wiki/Kigali#By_plane"
      }
    ]
  },
  SR: {
    summary: "At Johan Adolf Pengel Airport (PBM), a bus and transit minibus connect with Paramaribo; taxis are another option.",
    detail: "Airport transfer: Johan Adolf Pengel International Airport (PBM) is about 45 km from Paramaribo. The Paramaribo guide lists a bus to the city and a transit minibus that can take passengers to hotels; taxis also operate outside the airport. Services may wait for passengers or have limited departures, so confirm the current route and pickup with your accommodation before relying on public transport. A prearranged driver can simplify late arrivals.",
    sources: [{
      topic: "Paramaribo airport bus, minibus, and taxi options",
      url: "https://en.wikivoyage.org/wiki/Paramaribo#By_plane"
    }]
  },
  SB: {
    summary: "At Honiara International Airport (HIR), taxi service and coastal bus service connect the airport area with Honiara and White River.",
    detail: "Airport transfer: Honiara International Airport (HIR), also known as Henderson Field, is east of the city. The Guadalcanal guide lists taxis and minibuses running along the coast between Henderson and White River, with stops along the way. Check current service and destination locally; consider a hotel-arranged pickup, particularly after dark, and review current security advice before travel.",
    sources: [{
      topic: "Honiara airport taxi and coastal minibus service",
      url: "https://en.wikivoyage.org/wiki/Guadalcanal#Get_around"
    }]
  },
  SM: {
    summary: "San Marino has no airport; from Rimini Federico Fellini Airport (RMI), take a taxi or drive to Rimini station, then a bus to San Marino.",
    detail: "Airport transfer: San Marino has no airport. The nearest major gateway is Federico Fellini International Airport (RMI) in Rimini. From the airport, take a taxi or drive to Rimini railway station, then use the bus from the station to San Marino; check the current operator schedule before travel. Allow time for the airport-to-station connection and the onward road journey.",
    sources: [{
      topic: "San Marino guide to nearest airport and Rimini bus connection",
      url: "https://en.wikivoyage.org/wiki/San_Marino#By_plane"
    }]
  },
  TO: {
    summary: "At Fuaʻamotu Airport (TBU), taxi service meets arriving flights and the Teta Tours minibus shuttle serves hotels and guesthouses in Nukuʻalofa.",
    detail: "Airport transfer: Fuaʻamotu International Airport (TBU) is about a 30-minute drive from Nukuʻalofa. The Tongatapu guide reports taxis meeting incoming flights and Teta Tours minibuses delivering passengers to hotels and guesthouses. Confirm pickup, destination, and current availability with your accommodation or operator before travel; local buses around Nukuʻalofa are not a dependable airport connection.",
    sources: [{
      topic: "Tongatapu airport taxi and Teta Tours minibus transfers",
      url: "https://en.wikivoyage.org/wiki/Tongatapu#By_plane"
    }]
  },
  MH: {
    summary: "At Amata Kabua Airport (MAJ), hotel transfers are often available; taxi service connects the airport with Majuro's main town.",
    detail: "Airport transfer: Amata Kabua International Airport (MAJ) is on the south side of Majuro Atoll, with downtown farther north. The Majuro guide notes that hotels often provide transfers and taxis serve the airport-to-town journey; taxis may pick up additional passengers en route. Confirm your pickup with the accommodation before arrival, especially if a shared ride is not suitable.",
    sources: [{
      topic: "Majuro airport hotel transfers and taxi options",
      url: "https://en.wikivoyage.org/wiki/Majuro#By_plane"
    }]
  },
  VU: {
    summary: "At Port Vila Airport (VLI), taxis have posted destination fares and shared airport-shuttle buses serve hotels; public buses run from the main road.",
    detail: "Airport transfer: Port Vila International Airport (VLI) is north of town. Taxi destination fares are posted as you exit Customs. Shared coach shuttles can be booked to hotels, and public buses can be boarded from the main road outside the airport area. Confirm the exact pickup point, destination, and current service before setting out; the December 2024 earthquake has left some construction and road work in Port Vila.",
    sources: [
      {
        topic: "Port Vila Airport taxi, shuttle, and public-bus options",
        url: "https://en.wikivoyage.org/wiki/Port_Vila#By_plane"
      }
    ]
  },
  TV: {
    summary: "At Funafuti Airport (FUN), the Vaiaku Lagi Hotel is about 50 m from the terminal and can be reached on foot; arrange pickup with other lodgings.",
    detail: "Airport transfer: Funafuti Airport (FUN) is on Fongafale, and the Vaiaku Lagi Hotel is about 50 m from the terminal, making a short walk practical for guests staying there. For other guesthouses or luggage-sensitive arrivals, confirm a pickup directly with your accommodation before flying; do not assume a taxi or shuttle will be waiting. Check local conditions and use the runway only when it is open for public activity.",
    sources: [{
      topic: "Funafuti airport location and nearby Vaiaku Lagi Hotel",
      url: "https://en.wikivoyage.org/wiki/Funafuti#By_plane"
    }]
  },
  VE: {
    summary: "From Maiquetía (CCS), use a licensed taxi from the official arrivals-hall rank; avoid public buses, unsolicited rides, and night transfers.",
    detail: "Airport transfer: UK FCDO advises heightened vigilance at Maiquetía because travelers have been targeted at terminals, in the car park, and during airport journeys. Ideally arrange for a trusted contact, business associate, or tour operator to meet you. Otherwise use a licensed taxi from the official rank outside Arrivals; do not accept transport offers inside the arrivals hall or enter a taxi that already has passengers. Avoid buses on this route and, where possible, airport road travel at night. Flight availability and local security conditions can change quickly; check current advice and your airline before departure.",
    sources: [
      {
        topic: "FCDO Maiquetía airport-transfer and security advice",
        url: "https://www.gov.uk/foreign-travel-advice/venezuela/safety-and-security"
      },
      {
        topic: "FCDO Venezuela travel warnings and current flight availability",
        url: "https://www.gov.uk/foreign-travel-advice/venezuela"
      }
    ]
  },
  US: {
    summary: "For Washington, D.C., Reagan National (DCA) connects directly to Metrorail; Dulles (IAD) and Baltimore (BWI) have separate transfers.",
    detail: "Airport transfer: Washington, D.C. flights may use Reagan National (DCA), Dulles (IAD), or Baltimore/Washington (BWI), which have different locations and transfer options. At DCA, an elevated Metrorail station connects to Terminal 2; Terminal 1 passengers can use the airport shuttle to the station. Follow terminal signs and check WMATA for current service. For IAD or BWI, verify the airport's own rail, bus, and pickup guidance before choosing a transfer.",
    sources: [
      {
        topic: "Reagan National Metrorail station and terminal connections",
        url: "https://www.flyreagan.com/metro"
      },
      {
        topic: "Washington Metropolitan Area Transit Authority rail lines and service",
        url: "https://www.wmata.com/service/rail/"
      },
      {
        topic: "Washington-area airport ground transportation options",
        url: "https://www.flyreagan.com/parking-transportation/ground-transportation"
      }
    ]
  },
  VA: {
    summary: "Vatican City has no public airport; arrive via Rome Fiumicino (FCO), then use Rome rail or airport buses and Metro or city buses to the Vatican.",
    detail: "Airport transfer: Vatican City has no public airport; Rome Fiumicino (FCO) is the nearest major airport. Use an airport train or bus to reach Rome, then continue by Metro A to Cipro or Ottaviano, or by city bus to the Vatican area. Verify the airport service, destination station, and onward connection for your arrival time. The Vatican's Roma San Pietro station has no regular scheduled passenger service.",
    sources: [{
      topic: "Vatican City airport distinction and nearby Rome transit options",
      url: "https://en.wikivoyage.org/wiki/Rome/Vatican#By_plane"
    }]
  }
};

let changed = 0;
for (const [iso, update] of Object.entries(updates)) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const arrival = destination.stages.arrival24h;
  if (update.summary && !arrival.simple.includes(update.summary)) {
    arrival.simple += ` ${update.summary}`;
    changed++;
  }
  if (update.previous && arrival.detailed.includes(update.previous)) {
    arrival.detailed = arrival.detailed.replace(update.previous, update.detail);
    changed++;
  } else if (!arrival.detailed.includes(update.detail)) {
    arrival.detailed += `\n\n${update.detail}`;
    changed++;
  }
  for (const source of update.sources) {
    if (!arrival.sources.some((item) => item.url === source.url)) {
      arrival.sources.push({ ...source, lastChecked: checked });
      changed++;
    }
  }
}

if (changed) writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Updated ${changed} airport-transfer fields across ${Object.keys(updates).length} profiles.`);
