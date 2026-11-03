import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = path.join(root, "data", "destinations.json");
const destinations = JSON.parse(readFileSync(dataPath, "utf8"));
const checked = "2026-11-03";

const guidance = new Map([
  ["AU", {
    simple: "Emergency: Call 000 for police, fire, or ambulance; 112 also works from mobile phones.",
    detailed: "Emergency response: Call Triple Zero (000) for police, fire, or ambulance. From a mobile phone, 112 reaches the same service; it cannot be called from a fixed landline or satellite phone. If there is no mobile coverage on any network, you cannot reach 000 by mobile.",
    source: {
      topic: "Australian Government: Triple Zero (000)",
      url: "https://www.infrastructure.gov.au/triple-zero"
    }
  }],
  ["NZ", {
    simple: "Emergency: Call 111 for Police, Fire, or Ambulance; calls are free, even from a mobile with no credit.",
    detailed: "Emergency response: Call 111 for Police, Fire, or Ambulance; the operator asks which service you need and connects you. Calls are free, including from a mobile phone with no credit.",
    source: {
      topic: "New Zealand Police: 111 Emergency Services",
      url: "https://www.police.govt.nz/call-111"
    }
  }],
  ["US", {
    simple: "Emergency: Call 911 immediately for emergency assistance.",
    detailed: "Emergency response: Call 911 immediately for emergency assistance in the United States. The National 911 Program directs people who need emergency assistance to dial 911; its website is not an emergency contact channel.",
    source: {
      topic: "U.S. National 911 Program: 911.gov",
      url: "https://www.911.gov/"
    }
  }],
  ["CA", {
    simple: "Emergency: Call 911 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police. For a maritime emergency, the cited travel advice lists the Canadian Coast Guard number 1-800-463-4393.",
    source: {
      topic: "UK Government: Canada emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/canada/getting-help"
    }
  }],
  ["IN", {
    simple: "Emergency: Call 112 nationally; 100 is the police helpline.",
    detailed: "Emergency response: India’s national emergency number is 112; the police helpline is 100. The cited guidance does not establish which services are dispatched through 112, so confirm locally if you need a specific service.",
    source: {
      topic: "UK Government: India police and emergency numbers",
      url: "https://www.gov.uk/foreign-travel-advice/india/safety-and-security"
    }
  }],
  ["JP", {
    simple: "Emergency: Call 110 for police; call 119 for fire or ambulance.",
    detailed: "Emergency response: Call 110 for police. Call 119 for fire or ambulance.",
    source: {
      topic: "UK Government: Japan emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/japan/getting-help"
    }
  }],
  ["KR", {
    simple: "Emergency: Call 112 for police or 119 for fire and ambulance; 1330 is a visitor hotline, not dispatch.",
    detailed: "Emergency response: Call 112 for police or 119 for fire or ambulance. For language help, the Korea Tourism Organisation’s 1330 travel hotline offers multilingual support and interpretation for three-way calls with emergency services from 7am to midnight; it is not an emergency dispatch number.",
    source: {
      topic: "UK Government: South Korea emergency services and language support",
      url: "https://www.gov.uk/foreign-travel-advice/south-korea/getting-help"
    }
  }],
  ["SG", {
    simple: "Emergency: Call 999 for police or 995 for ambulance and fire.",
    detailed: "Emergency response: Call 999 for police. Call 995 for ambulance or fire.",
    source: {
      topic: "UK Government: Singapore emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/singapore/getting-help"
    }
  }],
  ["MX", {
    simple: "Emergency: Call 911 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police. Mexico City Tourist Police: +52 55 5207 4155; WhatsApp: +52 55 4891 1166.",
    source: {
      topic: "UK Government: Mexico emergency services and tourist police",
      url: "https://www.gov.uk/foreign-travel-advice/mexico/getting-help"
    }
  }],
  ["BR", {
    simple: "Emergency: Call 190 for police, 192 for ambulance, or 193 for fire; FCDO also lists 911 for police.",
    detailed: "Emergency response: Call 190 for police, 192 for ambulance, or 193 for fire. The cited travel advice also lists 911 for police.",
    source: {
      topic: "UK Government: Brazil emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/brazil/getting-help"
    }
  }],
  ["ZA", {
    simple: "Emergency: From a mobile, call 112; police 10111; ambulance or fire 10177.",
    detailed: "Emergency response: From a mobile phone, call 112 for emergencies. Police: 10111. Ambulance or fire: 10177. Regional emergency numbers may also be available; check locally.",
    source: {
      topic: "UK Government: South Africa emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/south-africa/getting-help"
    }
  }],
  ["KE", {
    simple: "Emergency: Call 999 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 999 for ambulance, fire, or police. The Kenya Tourism Federation Safety and Communication Center also provides tourist advice and emergency help.",
    source: {
      topic: "UK Government: Kenya emergency services and tourist support",
      url: "https://www.gov.uk/foreign-travel-advice/kenya/getting-help"
    }
  }],
  ["NG", {
    simple: "Emergency: Call 112 for ambulance, fire, or police; ambulance services are limited.",
    detailed: "Emergency response: Call 112 for ambulance, fire, or police. There is no national ambulance service and hospital-owned ambulance services are extremely limited; you may need local advice or to arrange transport yourself.",
    source: {
      topic: "UK Government: Nigeria emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/nigeria/getting-help"
    }
  }],
  ["GH", {
    simple: "Emergency: Call 999 or 112 for ambulance, fire, police, coast guard, or mountain rescue; police 192.",
    detailed: "Emergency response: Call 999 or 112 for ambulance, fire, police, coast guard, or mountain rescue. The cited travel advice also lists 192 for police.",
    source: {
      topic: "UK Government: Ghana emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/ghana/getting-help"
    }
  }],
  ["TH", {
    simple: "Emergency: Police 191, ambulance 1669, fire 199; Tourist Police 1155.",
    detailed: "Emergency response: Police: 191. Ambulance: 1669. Fire: 199. The Tourist Police number is 1155; the cited advice also lists 191 as a general ambulance, fire, and police emergency number.",
    source: {
      topic: "UK Government: Thailand emergency services and Tourist Police",
      url: "https://www.gov.uk/foreign-travel-advice/thailand/getting-help"
    }
  }],
  ["TR", {
    simple: "Emergency: Call 112 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 112 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Turkey emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/turkey/getting-help"
    }
  }],
  ["ID", {
    simple: "Emergency: Police 110, fire 112, ambulance 118.",
    detailed: "Emergency response: Police: 110. Fire: 112. Ambulance: 118.",
    source: {
      topic: "UK Government: Indonesia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/indonesia/getting-help"
    }
  }],
  ["PH", {
    simple: "Emergency: Call 911 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Philippines emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/philippines/getting-help"
    }
  }],
  ["VN", {
    simple: "Emergency: Police 113, fire 114, ambulance 115; calls are operated in Vietnamese only.",
    detailed: "Emergency response: Police: 113. Fire: 114. Ambulance: 115. National search and rescue: 112. Emergency numbers are operated in Vietnamese only, so arrange translation help if needed.",
    source: {
      topic: "UK Government: Vietnam emergency services and language note",
      url: "https://www.gov.uk/foreign-travel-advice/vietnam/getting-help"
    }
  }],
  ["MY", {
    simple: "Emergency: Police or ambulance 999, fire 994; ambulance from a mobile 112.",
    detailed: "Emergency response: Police and ambulance: 999. Fire: 994. Ambulance from a mobile phone: 112.",
    source: {
      topic: "UK Government: Malaysia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/malaysia/getting-help"
    }
  }],
  ["LK", {
    simple: "Emergency: Police 118/119, fire and rescue 111, ambulance 1990 or 011 2691111; Tourist Police 011 2421052.",
    detailed: "Emergency response: Police: 118 or 119. Fire and rescue: 111. Ambulance: 1990 or 011 2691111. Tourist Police: 011 2421052.",
    source: {
      topic: "UK Government: Sri Lanka emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/sri-lanka/getting-help"
    }
  }],
  ["NP", {
    simple: "Emergency: Police 100, fire 101, ambulance 102; Tourist Police 1144 has good English-language skills.",
    detailed: "Emergency response: Police: 100. Fire: 101. Ambulance: 102. Tourist Police: 1144; the cited travel advice notes their good English-language skills.",
    source: {
      topic: "UK Government: Nepal emergency services and Tourist Police",
      url: "https://www.gov.uk/foreign-travel-advice/nepal/getting-help"
    }
  }],
  ["PK", {
    simple: "Emergency: Police 15; ambulance or fire 1122.",
    detailed: "Emergency response: Police: 15. Ambulance or fire: 1122.",
    source: {
      topic: "UK Government: Pakistan emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/pakistan/getting-help"
    }
  }],
  ["BD", {
    simple: "Emergency: Call 999 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 999 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Bangladesh emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/bangladesh/getting-help"
    }
  }],
  ["AR", {
    simple: "Emergency: Ambulance 107, fire 100, police 911 or 101.",
    detailed: "Emergency response: Ambulance: 107. Fire: 100. Police: 911 or 101. In Buenos Aires, Tourist Police (‘Comisaría del Turista’) is available 24 hours at +54 911 5050 9260, including WhatsApp.",
    source: {
      topic: "UK Government: Argentina emergency services and tourist police",
      url: "https://www.gov.uk/foreign-travel-advice/argentina/getting-help"
    }
  }],
  ["CL", {
    simple: "Emergency: Ambulance 131, fire 132, police 133.",
    detailed: "Emergency response: Ambulance: 131. Fire: 132. Police: 133.",
    source: {
      topic: "UK Government: Chile emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/chile/getting-help"
    }
  }],
  ["CO", {
    simple: "Emergency: Ambulance or police 123; fire 119.",
    detailed: "Emergency response: Ambulance or police: 123. Fire: 119.",
    source: {
      topic: "UK Government: Colombia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/colombia/getting-help"
    }
  }],
  ["PE", {
    simple: "Emergency: Ambulance 106, fire 116, police 105.",
    detailed: "Emergency response: Ambulance: 106. Fire: 116. Police: 105.",
    source: {
      topic: "UK Government: Peru emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/peru/getting-help"
    }
  }],
  ["UY", {
    simple: "Emergency: Call 911 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Uruguay emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/uruguay/getting-help"
    }
  }],
  ["EC", {
    simple: "Emergency: Call 911 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police. Tourism police units operate in Quito, Guayaquil, Cuenca, Santa Elena, and the Galapagos provinces.",
    source: {
      topic: "UK Government: Ecuador emergency services and tourism police",
      url: "https://www.gov.uk/foreign-travel-advice/ecuador/getting-help"
    }
  }],
  ["EG", {
    simple: "Emergency: Police 122, ambulance 123, fire 180; Tourist Police 126.",
    detailed: "Emergency response: Police: 122. Ambulance: 123. Fire: 180. Tourist Police: 126.",
    source: {
      topic: "UK Government: Egypt emergency services and Tourist Police",
      url: "https://www.gov.uk/foreign-travel-advice/egypt/getting-help"
    }
  }],
  ["MA", {
    simple: "Emergency: Police 190, ambulance or fire 150, Gendarmerie 177.",
    detailed: "Emergency response: Police: 190. Ambulance or fire: 150. Gendarmerie (military police): 177.",
    source: {
      topic: "UK Government: Morocco emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/morocco/getting-help"
    }
  }],
  ["AE", {
    simple: "Emergency: Police 999, ambulance 998, fire 997.",
    detailed: "Emergency response: Police: 999. Ambulance: 998. Fire: 997.",
    source: {
      topic: "UK Government: UAE emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/united-arab-emirates/getting-help"
    }
  }],
  ["SA", {
    simple: "Emergency: Call 911 for ambulance, fire, or police; without a Saudi SIM, call 112.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police. If you do not have a Saudi SIM card, the cited travel advice says to call 112 in an emergency.",
    source: {
      topic: "UK Government: Saudi Arabia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/saudi-arabia/getting-help"
    }
  }],
  ["IL", {
    simple: "Emergency: Police 100, ambulance 101, fire 102.",
    detailed: "Emergency response: Police: 100. Ambulance: 101. Fire: 102. The cited guidance covers Israel and Palestine; check locally for the applicable service and access conditions.",
    source: {
      topic: "UK Government: Israel and Palestine emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/israel/getting-help"
    }
  }],
  ["TZ", {
    simple: "Emergency: Call 112 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 112 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Tanzania emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/tanzania/getting-help"
    }
  }],
  ["UG", {
    simple: "Emergency: Call 999 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 999 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Uganda emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/uganda/getting-help"
    }
  }],
  ["RW", {
    simple: "Emergency: Ambulance or police 112; fire 111.",
    detailed: "Emergency response: Ambulance or police: 112. Fire: 111.",
    source: {
      topic: "UK Government: Rwanda emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/rwanda/getting-help"
    }
  }],
  ["SN", {
    simple: "Emergency: Ambulance 15, fire 18, police 17; military police 123 may be more responsive in the countryside.",
    detailed: "Emergency response: Ambulance: 15. Fire: 18. Police: 17. Military police: 123; the cited travel advice says they may be more responsive in the countryside.",
    source: {
      topic: "UK Government: Senegal emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/senegal/getting-help"
    }
  }],
  ["DZ", {
    simple: "Emergency: Ambulance 1021, fire 14, police 17 or 1548.",
    detailed: "Emergency response: Ambulance: 1021. Fire: 14. Police: 17 or 1548.",
    source: {
      topic: "UK Government: Algeria emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/algeria/getting-help"
    }
  }],
  ["TN", {
    simple: "Emergency: Ambulance 190, fire/road accidents 198; police 197 in towns, National Guard 193 in rural areas.",
    detailed: "Emergency response: Ambulance: 190. Fire and car accidents: 198. Police in towns and cities: 197. National Guard in rural areas and small villages: 193.",
    source: {
      topic: "UK Government: Tunisia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/tunisia/getting-help"
    }
  }],
  ["ET", {
    simple: "Emergency: Call 911 for police or emergencies; ambulance 907 in Addis Ababa.",
    detailed: "Emergency response: Police and emergency: 911. Ambulance: 907 in Addis Ababa; the cited advice does not establish ambulance coverage elsewhere.",
    source: {
      topic: "UK Government: Ethiopia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/ethiopia/getting-help"
    }
  }],
  ["ZM", {
    simple: "Emergency: Police 991, ambulance 992, fire 993.",
    detailed: "Emergency response: Police: 991. Ambulance: 992. Fire: 993.",
    source: {
      topic: "UK Government: Zambia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/zambia/getting-help"
    }
  }],
  ["ZW", {
    simple: "Emergency: Call 112 for ambulance, fire, or police; mobile and landline alternatives vary.",
    detailed: "Emergency response: Call 112 for ambulance, fire, or police. Mobile access listed by the cited advice: Econet 112, NetOne 114. Landline: 0800 3222 911. Check the current local government emergency-services list if your network differs.",
    source: {
      topic: "UK Government: Zimbabwe emergency services and network-specific access",
      url: "https://www.gov.uk/foreign-travel-advice/zimbabwe/getting-help"
    }
  }],
  ["NA", {
    simple: "Emergency: The cited travel advice lists 10111, 999, and 112 for ambulance, fire, or police.",
    detailed: "Emergency response: The cited travel advice lists 10111, 999, and 112 for ambulance, fire, or police; it does not distinguish which service each number reaches.",
    source: {
      topic: "UK Government: Namibia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/namibia/getting-help"
    }
  }],
  ["BW", {
    simple: "Emergency: Ambulance 997, fire 998, police 999.",
    detailed: "Emergency response: Ambulance: 997. Fire: 998. Police: 999.",
    source: {
      topic: "UK Government: Botswana emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/botswana/getting-help"
    }
  }],
  ["MW", {
    simple: "Emergency: Ambulance 998, fire 999, police 990 or 997; emergency numbers may be unreliable.",
    detailed: "Emergency response: Ambulance: 998. Fire: 999. Police: 990 or 997. The cited travel advice warns that emergency numbers are unreliable in Malawi; other local numbers may exist, so ask your hotel or local police.",
    source: {
      topic: "UK Government: Malawi emergency services and reliability caveat",
      url: "https://www.gov.uk/foreign-travel-advice/malawi/getting-help"
    }
  }],
  ["KH", {
    simple: "Emergency: Police 117, fire 118, ambulance 119; emergency numbers may go unanswered.",
    detailed: "Emergency response: Police: 117. Fire: 118. Ambulance: 119. The cited travel advice warns that emergency numbers may go unanswered, response to crime can be limited, and police may not speak English.",
    source: {
      topic: "UK Government: Cambodia emergency services and response caveat",
      url: "https://www.gov.uk/foreign-travel-advice/cambodia/getting-help"
    }
  }],
  ["LA", {
    simple: "Emergency: Fire 1190, police 1191, ambulance 1195; Vientiane Tourist Police 021 251 128.",
    detailed: "Emergency response: Fire: 1190. Police: 1191. Ambulance: 1195 or 030 525 7239. Tourist Police in Vientiane: 021 251 128.",
    source: {
      topic: "UK Government: Laos emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/laos/getting-help"
    }
  }],
  ["MM", {
    simple: "Emergency: Ambulance 192, fire 191, police 199.",
    detailed: "Emergency response: Ambulance: 192. Fire: 191. Police: 199.",
    source: {
      topic: "UK Government: Myanmar emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/myanmar/getting-help"
    }
  }],
  ["MN", {
    simple: "Emergency: Ambulance 103, fire 101, police 102 (including traffic police).",
    detailed: "Emergency response: Ambulance: 103. Fire: 101. Police: 102, including traffic police.",
    source: {
      topic: "UK Government: Mongolia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/mongolia/getting-help"
    }
  }],
  ["KZ", {
    simple: "Emergency: Ambulance 103, fire 101, police 102; rescue 112.",
    detailed: "Emergency response: Ambulance: 103. Fire: 101. Police: 102. Emergency and rescue service: 112.",
    source: {
      topic: "UK Government: Kazakhstan emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/kazakhstan/getting-help"
    }
  }],
  ["KG", {
    simple: "Emergency: Ambulance 103, fire 101, police 102, rescue 112; Issyk-Kul Tourist Police offers English-language help.",
    detailed: "Emergency response: Ambulance: 103. Fire: 101. Police: 102. Rescue and emergency: 112. In Issyk-Kul Province, Tourist Police offers English- and Russian-speaking help by phone or WhatsApp at +996 705 00 91 02.",
    source: {
      topic: "UK Government: Kyrgyzstan emergency services and regional tourist police",
      url: "https://www.gov.uk/foreign-travel-advice/kyrgyzstan/getting-help"
    }
  }],
  ["UZ", {
    simple: "Emergency: Call 112 for all emergencies; older service numbers remain active. Tourist support: 1173.",
    detailed: "Emergency response: Call 112 for all emergency calls; older numbers remain active: ambulance 103, fire 101, police 102. The 24/7 Call Centre for Safe Tourism is 1173; operators speak English, Uzbek, and Russian and can direct callers to locally available support.",
    source: {
      topic: "UK Government: Uzbekistan emergency numbers and tourism hotline",
      url: "https://www.gov.uk/foreign-travel-advice/uzbekistan/getting-help"
    }
  }],
  ["GE", {
    simple: "Emergency: Call 112 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 112 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Georgia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/georgia/getting-help"
    }
  }],
  ["CR", {
    simple: "Emergency: Call 911 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Costa Rica emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/costa-rica/getting-help"
    }
  }],
  ["PA", {
    simple: "Emergency: Call 911; specific lines are ambulance/fire 103 and police 104.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police. Specific lines: ambulance and fire 103; police 104. The Panamanian Tourism Authority is +507 6330 2520 for tourism assistance, not emergency dispatch.",
    source: {
      topic: "UK Government: Panama emergency services and tourism authority",
      url: "https://www.gov.uk/foreign-travel-advice/panama/getting-help"
    }
  }],
  ["GT", {
    simple: "Emergency: Fire/ambulance 122 or 123, police 110; PROATUR provides 24-hour tourist assistance in English and Spanish.",
    detailed: "Emergency response: Fire and ambulance: 122 or 123. Police: 110. PROATUR tourist assistance offers 24-hour emergency help and routine guidance in English and Spanish: +502 2290 2810, or 1500 from inside Guatemala.",
    source: {
      topic: "UK Government: Guatemala emergency services and PROATUR tourist assistance",
      url: "https://www.gov.uk/foreign-travel-advice/guatemala/getting-help"
    }
  }],
  ["DO", {
    simple: "Emergency: Call 911, but coverage is not nationwide; tourist police outside Santo Domingo +1 809 200 3500.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police, but the service does not have full national coverage. Outside Santo Domingo, the cited travel advice lists tourist police for emergencies at +1 809 200 3500.",
    source: {
      topic: "UK Government: Dominican Republic emergency coverage and tourist police",
      url: "https://www.gov.uk/foreign-travel-advice/dominican-republic/getting-help"
    }
  }],
  ["CU", {
    simple: "Emergency: Ambulance 104, fire 105, police 106.",
    detailed: "Emergency response: Ambulance: 104. Fire: 105. Police: 106.",
    source: {
      topic: "UK Government: Cuba emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/cuba/getting-help"
    }
  }],
  ["JM", {
    simple: "Emergency: Ambulance or fire 110; police 119.",
    detailed: "Emergency response: Ambulance or fire: 110. Police: 119.",
    source: {
      topic: "UK Government: Jamaica emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/jamaica/getting-help"
    }
  }],
  ["HT", {
    simple: "Emergency: Ambulance 116, fire 115, police 122; response may be delayed or unavailable.",
    detailed: "Emergency response: Ambulance: 116. Fire: 115. Police: 122. The cited travel advice warns that, due to the security situation, services may be unable to respond or may face long delays.",
    source: {
      topic: "UK Government: Haiti emergency services and response caveat",
      url: "https://www.gov.uk/foreign-travel-advice/haiti/getting-help"
    }
  }],
  ["SV", {
    simple: "Emergency: Call 911 for ambulance, fire, or police; Tourist Police +503 2224 2705.",
    detailed: "Emergency response: Call 911 for ambulance, fire, or police. Tourist Police: +503 2224 2705; this is a separate tourist-police contact.",
    source: {
      topic: "UK Government: El Salvador emergency services and Tourist Police",
      url: "https://www.gov.uk/foreign-travel-advice/el-salvador/getting-help"
    }
  }],
  ["AL", {
    simple: "Emergency: Ambulance 127, fire 128, police 112.",
    detailed: "Emergency response: Ambulance: 127. Fire: 128. Police: 112.",
    source: {
      topic: "UK Government: Albania emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/albania/getting-help"
    }
  }],
  ["RS", {
    simple: "Emergency: Call 112; ambulance 194, fire 193, police 192.",
    detailed: "Emergency response: All emergencies: 112. Ambulance: 194. Fire: 193. Police: 192.",
    source: {
      topic: "UK Government: Serbia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/serbia/getting-help"
    }
  }],
  ["ME", {
    simple: "Emergency: Call 112.",
    detailed: "Emergency response: Call 112 for emergency services.",
    source: {
      topic: "UK Government: Montenegro emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/montenegro/getting-help"
    }
  }],
  ["BA", {
    simple: "Emergency: Police 122, fire 123, ambulance 124.",
    detailed: "Emergency response: Police: 122. Fire: 123. Ambulance: 124.",
    source: {
      topic: "UK Government: Bosnia and Herzegovina emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/bosnia-and-herzegovina/getting-help"
    }
  }],
  ["MK", {
    simple: "Emergency: Ambulance 194, police 192; roadside assistance 196.",
    detailed: "Emergency response: Ambulance: 194. Police: 192. Roadside assistance: 196. The cited advice does not list a fire-service number.",
    source: {
      topic: "UK Government: North Macedonia emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/north-macedonia/getting-help"
    }
  }],
  ["MD", {
    simple: "Emergency: Call 112 for ambulance, fire, or police.",
    detailed: "Emergency response: Call 112 for ambulance, fire, or police.",
    source: {
      topic: "UK Government: Moldova emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/moldova/getting-help"
    }
  }],
  ["CH", {
    simple: "Emergency: Call 112; ambulance 144, fire 118, police 117.",
    detailed: "Emergency response: Call 112 for ambulance, fire, or police. Ambulance: 144. Fire: 118. Police: 117.",
    source: {
      topic: "UK Government: Switzerland emergency services",
      url: "https://www.gov.uk/foreign-travel-advice/switzerland/getting-help"
    }
  }]
]);

for (const [iso, update] of guidance) {
  const destination = destinations.find((item) => item.iso === iso);
  if (!destination) throw new Error(`Missing destination profile: ${iso}`);

  const arrival = destination.stages.arrival24h;
  if (!arrival.simple.includes(update.simple)) arrival.simple += ` ${update.simple}`;

  const paragraphs = arrival.detailed.split("\n\n");
  const index = paragraphs.findIndex((paragraph) => paragraph.startsWith("Emergency response:"));
  if (index < 0) paragraphs.push(update.detailed);
  else paragraphs[index] = update.detailed;
  arrival.detailed = paragraphs.join("\n\n");

  if (!arrival.sources.some((source) => source.url === update.source.url)) {
    arrival.sources.push({ ...update.source, lastChecked: checked });
  }
}

writeFileSync(dataPath, `${JSON.stringify(destinations, null, 2)}\n`);
console.log(`Added emergency response guidance for ${guidance.size} profiles.`);