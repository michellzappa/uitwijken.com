/**
 * The G4 scan: Rotterdam, Den Haag, Utrecht and their regions, next to Amsterdam.
 *
 * This is a first inventory, not a set of full profiles. The Amsterdam atlas in
 * platforms.ts stays the deep layer, and an entry moves there only after a full
 * profile exists. The editorial rule is the same: describe, do not score, and
 * show an open field instead of a guess.
 *
 * Compiled on 5 November 2026. Endpoints and software were checked by requesting
 * the URL, and "documented" on such a claim means that request, or the linked source.
 * Nobody at these platforms or municipalities has been asked yet.
 */

import type { Bi, ModelKey, Note } from "./platforms";

export type G4City = "amsterdam" | "rotterdam" | "den-haag" | "utrecht";

export type G4CityProfile = {
  key: G4City;
  name: string;
  /** Municipality code in the CBS Wijk- en Buurtkaart. */
  gemeentecode: string;
  region: Bi;
  cityPlatform: Note;
  neighbourhoodLayer: Note;
  openData: Note;
  events: Note;
  areas: Note;
};

export const G4_CITIES: G4CityProfile[] = [
  {
    key: "amsterdam",
    name: "Amsterdam",
    gemeentecode: "GM0363",
    region: { nl: "Zie de volledige atlas", en: "See the full atlas" },
    cityPlatform: {
      value: {
        nl: "Wij Amsterdam op Gebiedonline-software, plus OpenStad voor trajecten. Welke trajecten nu lopen is niet vastgesteld.",
        en: "Wij Amsterdam on Gebiedonline software, plus OpenStad for processes. Which processes run today has not been established.",
      },
      confidence: "to-validate",
      source: "https://vng.nl/artikelen/openstad-voor-iedereen-digitale-participatie-die-werkt-voor-alle-gemeenten",
    },
    neighbourhoodLayer: {
      value: {
        nl: "Bewonersnetwerken op Gebiedonline, zoals Hallo IJburg, Hallo Watergraafsmeer en Netwerk De Pijp.",
        en: "Resident networks on Gebiedonline, such as Hallo IJburg, Hallo Watergraafsmeer, and Netwerk De Pijp.",
      },
      confidence: "documented",
      source: "https://gebiedonline.nl/",
    },
    openData: {
      value: {
        nl: "data.amsterdam.nl. Kernregistratie gebieden staat onder CC0 op data.overheid.nl.",
        en: "data.amsterdam.nl. The core areas register is CC0 on data.overheid.nl.",
      },
      confidence: "documented",
      source: "https://data.amsterdam.nl/",
    },
    events: {
      value: {
        nl: "Datapunt Evenementen: REST, WFS en vector tiles onder CC-BY 4.0.",
        en: "Datapunt Evenementen: REST, WFS, and vector tiles under CC-BY 4.0.",
      },
      confidence: "documented",
      source: "https://data.amsterdam.nl/",
    },
    areas: {
      value: {
        nl: "Eigen gebieden-API, met per buurt een cbsCode.",
        en: "Its own areas API, with a cbsCode per neighbourhood.",
      },
      confidence: "documented",
      source: "https://api.data.amsterdam.nl/v1/gebieden/",
    },
  },
  {
    key: "rotterdam",
    name: "Rotterdam",
    gemeentecode: "GM0599",
    region: {
      nl: "Schiedam, Vlaardingen, Capelle aan den IJssel, Barendrecht, Ridderkerk, Dordrecht",
      en: "Schiedam, Vlaardingen, Capelle aan den IJssel, Barendrecht, Ridderkerk, Dordrecht",
    },
    cityPlatform: {
      value: {
        nl: "Mijn Rotterdam, gebouwd op Mendix door Goodzo en het eigen ontwikkelteam. Stedelijke uitrol begin 2022.",
        en: "Mijn Rotterdam, built on Mendix by Goodzo and the City's own development team. Citywide rollout in early 2022.",
      },
      confidence: "documented",
      source: "https://rotterdamraad.bestuurlijkeinformatie.nl/Document/View/be840f61-5231-4546-aa99-b4e222363990",
    },
    neighbourhoodLayer: {
      value: {
        nl: "37 wijkraden en 2 dorpsraden, sinds 1 oktober 2023 ook beslissers over bewonersinitiatieven. Geen door bewoners gebouwd buurtnetwerk gevonden.",
        en: "37 neighbourhood councils and 2 village councils, which have also decided on resident initiatives since 1 October 2023. No resident-built neighbourhood network found.",
      },
      confidence: "documented",
      source: "https://www.rotterdam.nl/wijkraden",
    },
    openData: {
      value: {
        nl: "data.rotterdam.nl op Opendatasoft, 1.432 datasets in de catalogus. Het licentieveld is overal leeg. De oude host rotterdamopendata.nl is dood.",
        en: "data.rotterdam.nl on Opendatasoft, with 1,432 datasets in the catalogue. The licence field is empty throughout. The old rotterdamopendata.nl host is dead.",
      },
      confidence: "documented",
      source: "https://data.rotterdam.nl/api/explore/v2.1/catalog/datasets",
    },
    events: {
      value: {
        nl: "Geen open evenementendataset gevonden. Uitagenda Rotterdam heeft een sitemap maar geen feed; hergebruikvoorwaarden zijn onbekend.",
        en: "No open events dataset found. Uitagenda Rotterdam has a sitemap but no feed; its reuse terms are unknown.",
      },
      confidence: "to-validate",
      source: "https://www.uitagendarotterdam.nl/",
    },
    areas: {
      value: {
        nl: "Geen publieke gebieden-API gevonden. Terugval op CBS.",
        en: "No public areas API found. Falls back on CBS.",
      },
      confidence: "to-validate",
    },
  },
  {
    key: "den-haag",
    name: "Den Haag",
    gemeentecode: "GM0518",
    region: {
      nl: "Delft, Zoetermeer, Westland, Rijswijk, Leidschendam-Voorburg, Wassenaar, Pijnacker-Nootdorp, Leiden",
      en: "Delft, Zoetermeer, Westland, Rijswijk, Leidschendam-Voorburg, Wassenaar, Pijnacker-Nootdorp, Leiden",
    },
    cityPlatform: {
      value: {
        nl: "Doe mee | Den Haag op OpenStad, sinds 2019. De lopende projecten staan nu vooral op denhaag.nl: 2 van de 38 links in de projectindex gaan naar OpenStad, allebei afgerond.",
        en: "Doe mee | Den Haag on OpenStad, since 2019. Current projects now sit mostly on denhaag.nl: 2 of the 38 links in the project index go to OpenStad, both completed.",
      },
      confidence: "documented",
      source: "https://www.denhaag.nl/nl/denk-mee/participatieprojecten-in-den-haag/",
    },
    neighbourhoodLayer: {
      value: {
        nl: "Een gemeentelijk register van 57 bewonersorganisaties in alle 8 stadsdelen. Elke organisatie heeft een eigen site, meestal WordPress.",
        en: "A municipal register of 57 resident organisations across all 8 districts. Each organisation runs its own site, usually WordPress.",
      },
      confidence: "documented",
      source: "https://www.denhaag.nl/nl/stadsdelen/bewonersorganisaties",
    },
    openData: {
      value: {
        nl: "den-haag-opendata.opendatasoft.com, 354 datasets. CC0 op data.overheid.nl; op het portaal zelf hebben maar 4 datasets een licentieveld.",
        en: "den-haag-opendata.opendatasoft.com, 354 datasets. CC0 on data.overheid.nl; on the portal itself only 4 datasets have a licence field.",
      },
      confidence: "documented",
      source: "https://den-haag-opendata.opendatasoft.com/",
    },
    events: {
      value: {
        nl: "Dataset evenementendenhaag onder CC0. Of die alleen vergunde evenementen bevat is niet gecontroleerd.",
        en: "Dataset evenementendenhaag under CC0. Whether it holds only permitted events has not been checked.",
      },
      confidence: "to-validate",
      source: "https://den-haag-opendata.opendatasoft.com/",
    },
    areas: {
      value: {
        nl: "Dataset buurten met 114 records en geometrie. Geen CBS-code aangetroffen.",
        en: "Dataset buurten with 114 records and geometry. No CBS code seen.",
      },
      confidence: "documented",
      source: "https://den-haag-opendata.opendatasoft.com/",
    },
  },
  {
    key: "utrecht",
    name: "Utrecht",
    gemeentecode: "GM0344",
    region: {
      nl: "Amersfoort, Nieuwegein, Zeist, Houten, De Bilt, IJsselstein, Woerden",
      en: "Amersfoort, Nieuwegein, Zeist, Houten, De Bilt, IJsselstein, Woerden",
    },
    cityPlatform: {
      value: {
        nl: "DenkMee op Go Vocal, volgens de gemeente zelf. Een marktconsultatie uit 2025 verkent wat hierna komt; de uitkomst is onbekend.",
        en: "DenkMee on Go Vocal, according to the City itself. A 2025 market consultation explores what comes next; the outcome is unknown.",
      },
      confidence: "documented",
      source: "https://denkmee.utrecht.nl",
    },
    neighbourhoodLayer: {
      value: {
        nl: "Wijkplatforms vervangen sinds 2020 de wijkraden. Een deel daarvan zijn wijkcoöperaties op Gebiedonline. De dekking verschilt per wijk.",
        en: "Neighbourhood platforms have replaced the neighbourhood councils since 2020. Some of them are neighbourhood cooperatives on Gebiedonline. Coverage differs per neighbourhood.",
      },
      confidence: "documented",
      source: "https://www.utrecht.nl/bestuur-en-organisatie/initiatief-en-invloed/uw-invloed/wijkplatform",
    },
    openData: {
      value: {
        nl: "open.utrecht.nl en geodata.utrecht.nl. De licentie wordt per dataset en per distributie toegekend.",
        en: "open.utrecht.nl and geodata.utrecht.nl. The licence is assigned per dataset and per distribution.",
      },
      confidence: "documented",
      source: "https://open.utrecht.nl",
    },
    events: {
      value: {
        nl: "Dataset Evenementen onder CC0: jaarbestanden met vergunningaanvragen, geen API. Let op: evenementenkalender.csv bevat rijen uit 2016.",
        en: "Dataset Evenementen under CC0: yearly files of permit applications, no API. Note that evenementenkalender.csv holds rows from 2016.",
      },
      confidence: "documented",
      source: "https://open.utrecht.nl/dataset/evenementen",
    },
    areas: {
      value: {
        nl: "Datasets buurt en subbuurt via geodata.utrecht.nl. De WFS-aanroep is niet gelukt, dus laagnaam en velden staan nog open.",
        en: "Neighbourhood and sub-neighbourhood datasets via geodata.utrecht.nl. The WFS request failed, so the layer name and fields remain open.",
      },
      confidence: "to-validate",
      source: "https://geodata.utrecht.nl/",
    },
  },
];

export type G4System = {
  name: string;
  url: string;
  city: Exclude<G4City, "amsterdam">;
  area: string;
  models: ModelKey[];
  /** Software as read from the page, or an open field. */
  software: Bi;
  what: Note;
  activity: Note;
  /** The result of requesting /rss, /feed, /sitemap.xml, /robots.txt, and /api. */
  feed: Bi;
};

const NO_DATE: Bi = {
  nl: "Geen datum vast te stellen.",
  en: "No date could be established.",
};

/** Ten networks serve the same feed shape, so the wording lives in one place. */
const GEBIEDONLINE_FEED: Bi = {
  nl: "/rss levert eigen items, zonder pubDate, onder de titel Hallo IJburg kalender.",
  en: "/rss delivers its own items, without pubDate, under the title Hallo IJburg kalender.",
};
const GEBIEDONLINE: Bi = { nl: "Gebiedonline", en: "Gebiedonline" };
const GEBIEDONLINE_LEDEN = "https://gebiedonline.nl/leden";
const UTRECHT_OVERZICHT =
  "https://utrecht.bestuurlijkeinformatie.nl/Document/View/f7f0da24-7edf-4947-b83f-3fb436248858";

function rssCount(n: number): Note {
  return {
    value: {
      nl: `${n} items in de agenda-feed van 5 november 2026, een venster van zeven dagen.`,
      en: `${n} items in the calendar feed of 5 November 2026, a seven-day window.`,
    },
    confidence: "documented",
  };
}

export const G4_SYSTEMS: G4System[] = [
  /* ---------- Utrecht ---------- */
  {
    name: "DenkMee",
    url: "https://denkmee.utrecht.nl",
    city: "utrecht",
    area: "Utrecht",
    models: ["city-provided", "commercial"],
    software: { nl: "Go Vocal (voorheen CitizenLab)", en: "Go Vocal (formerly CitizenLab)" },
    what: {
      value: {
        nl: "Het participatieplatform van de gemeente: enquêtes en inbreng per project. Eerste project op 23 september 2020.",
        en: "The City's participation platform: surveys and input per project. First project on 23 September 2020.",
      },
      confidence: "documented",
      source: "https://www.utrecht.nl/nieuws/nieuwsbericht-gemeente-utrecht/voortgang-samen-stad-maken-online-participatie-en-wijkplatforms-actief-in-bijna-alle-wijken",
    },
    activity: {
      value: {
        nl: "309 openbare projecten; 20 aangemaakt in de laatste drie maanden, het nieuwste op 14 oktober 2026.",
        en: "309 public projects; 20 created in the last three months, the newest on 14 October 2026.",
      },
      confidence: "documented",
      source: "https://denkmee.utrecht.nl/web_api/v1/projects",
    },
    feed: {
      nl: "Geen RSS. Sitemap werkt. /web_api/v1/projects geeft openbare JSON, zonder documentatie.",
      en: "No RSS. The sitemap works. /web_api/v1/projects returns public JSON, undocumented.",
    },
  },
  {
    name: "Oost voor Elkaar",
    url: "https://oostvoorelkaar.nl",
    city: "utrecht",
    area: "Oost",
    models: ["cooperative"],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Wijkcoöperatie die de rol van wijkplatform vervult, met bijna 200 leden in 2024.",
        en: "Neighbourhood cooperative that acts as the neighbourhood platform, with nearly 200 members in 2024.",
      },
      confidence: "documented",
      source: UTRECHT_OVERZICHT,
    },
    activity: rssCount(91),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "Wijkwijzer Noordoost",
    url: "https://wijkwijzernoordoost.nl",
    city: "utrecht",
    area: "Noordoost",
    models: ["cooperative"],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Wijkcoöperatie Griftstroom, door de gemeente genoemd als wijkplatform.",
        en: "Neighbourhood cooperative Griftstroom, named by the City as the neighbourhood platform.",
      },
      confidence: "documented",
      source: "https://www.utrecht.nl/wonen-en-leven/wijken/noordoost/uw-initiatief-en-invloed",
    },
    activity: rssCount(56),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "We zijn West",
    url: "https://wezijnwest.nl",
    city: "utrecht",
    area: "West",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Buurtnetwerk voor Utrecht-West. Eigenaar nog niet vastgesteld.",
        en: "Neighbourhood network for Utrecht West. Owner not yet established.",
      },
      confidence: "to-validate",
      source: GEBIEDONLINE_LEDEN,
    },
    activity: rssCount(49),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "Wijkportal Lunetten",
    url: "https://lunetten.nl",
    city: "utrecht",
    area: "Zuid",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Buurtportaal voor Lunetten. Het verband met de partijen die daar de rol van wijkplatform hebben is niet vastgesteld.",
        en: "Neighbourhood portal for Lunetten. Its link to the groups holding the neighbourhood platform role there has not been established.",
      },
      confidence: "to-validate",
      source: GEBIEDONLINE_LEDEN,
    },
    activity: rssCount(45),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "UtrechtSamen",
    url: "https://utrechtsamen.nl",
    city: "utrecht",
    area: "Utrecht, Leusden",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Netwerk rond zorggemeenschappen. Eigenaar en bereik staan nog open.",
        en: "Network around care communities. Owner and reach remain open.",
      },
      confidence: "to-validate",
      source: GEBIEDONLINE_LEDEN,
    },
    activity: rssCount(8),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "BuurtNatuur030",
    url: "https://buurtnatuur030.nl",
    city: "utrecht",
    area: "Utrecht",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Thematisch netwerk voor groene buurtinitiatieven. Eigenaar nog niet vastgesteld.",
        en: "Thematic network for green neighbourhood initiatives. Owner not yet established.",
      },
      confidence: "to-validate",
      source: GEBIEDONLINE_LEDEN,
    },
    activity: rssCount(8),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "Indekerngezond",
    url: "https://indekerngezond.nl",
    city: "utrecht",
    area: "Leidsche Rijn",
    models: ["community-owned"],
    software: { nl: "WordPress", en: "WordPress" },
    what: {
      value: {
        nl: "Bewonersinitiatief met de rol van wijkplatform in Leidsche Rijn.",
        en: "Resident initiative holding the neighbourhood platform role in Leidsche Rijn.",
      },
      confidence: "documented",
      source: UTRECHT_OVERZICHT,
    },
    activity: {
      value: {
        nl: "Nieuwste item op 1 november 2026; minstens 3 in drie maanden.",
        en: "Newest item on 1 November 2026; at least 3 in three months.",
      },
      confidence: "documented",
    },
    feed: { nl: "RSS werkt. Geen sitemap, geen API.", en: "RSS works. No sitemap, no API." },
  },
  {
    name: "Wijkplatform Overvecht",
    url: "https://wijkplatformovervecht.nl",
    city: "utrecht",
    area: "Overvecht",
    models: ["community-owned"],
    software: { nl: "WordPress", en: "WordPress" },
    what: {
      value: {
        nl: "In de evaluatie van 2022 een van de gevestigde wijkplatforms.",
        en: "One of the established neighbourhood platforms in the 2022 evaluation.",
      },
      confidence: "documented",
      source: "https://utrecht.bestuurlijkeinformatie.nl/Document/View/2c54d00b-acae-4175-9fc7-4dd9ebfbd706",
    },
    activity: {
      value: {
        nl: "Nieuwste item in de feed is van 11 april 2024. De homepage kan actueler zijn maar heeft geen datums.",
        en: "The newest feed item is from 11 April 2024. The homepage may be more current but carries no dates.",
      },
      confidence: "documented",
    },
    feed: { nl: "RSS en sitemap werken. Geen API.", en: "RSS and sitemap work. No API." },
  },
  {
    name: "Voor je Stadsie",
    url: "https://voorjestadsie.nl",
    city: "utrecht",
    area: "Utrecht",
    models: [],
    software: { nl: "Onbekend (React-app)", en: "Unknown (React app)" },
    what: {
      value: {
        nl: "Crowdfunding en advies voor initiatieven, partner van het Initiatievenfonds.",
        en: "Crowdfunding and advice for initiatives, partner of the Initiatievenfonds.",
      },
      confidence: "documented",
      source: "https://www.utrecht.nl/bestuur-en-organisatie/initiatief-en-invloed/uw-initiatief/initiatievenfonds",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: {
      nl: "Elk pad geeft dezelfde app-pagina terug, dus niets is telbaar.",
      en: "Every path returns the same app page, so nothing can be counted.",
    },
  },
  {
    name: "VC Utrecht",
    url: "https://vcutrecht.nl",
    city: "utrecht",
    area: "Utrecht",
    models: ["commercial"],
    software: { nl: "Deedmob", en: "Deedmob" },
    what: {
      value: {
        nl: "Vrijwilligersmatching waar de gemeente naar verwijst.",
        en: "Volunteer matching that the City refers to.",
      },
      confidence: "documented",
      source: "https://www.utrecht.nl/bestuur-en-organisatie/initiatief-en-invloed/uw-initiatief/initiatievenfonds",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: { nl: "Geen RSS, sitemap of API.", en: "No RSS, sitemap, or API." },
  },
  {
    name: "De Galecop",
    url: "https://degalecop.nl",
    city: "utrecht",
    area: "Nieuwegein",
    models: ["community-owned"],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Wijkplatform van Galecop, beheerd door Stichting Wijkoverleg Galecop.",
        en: "Neighbourhood platform for Galecop, run by Stichting Wijkoverleg Galecop.",
      },
      confidence: "self-reported",
      source: "https://degalecop.nl",
    },
    activity: rssCount(12),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "HooglandSamen",
    url: "https://hooglandsamen.nl",
    city: "utrecht",
    area: "Amersfoort",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Dorpsnetwerk voor Hoogland, volgens de eigen site gesubsidieerd door de gemeente Amersfoort.",
        en: "Village network for Hoogland, subsidised by the City of Amersfoort according to its own site.",
      },
      confidence: "self-reported",
      source: "https://hooglandsamen.nl",
    },
    activity: rssCount(21),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "Amersfoort Zuid",
    url: "https://amersfoortzuid.info",
    city: "utrecht",
    area: "Amersfoort",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Wijknetwerk. Eigenaar nog niet vastgesteld.",
        en: "Neighbourhood network. Owner not yet established.",
      },
      confidence: "to-validate",
      source: GEBIEDONLINE_LEDEN,
    },
    activity: rssCount(49),
    feed: GEBIEDONLINE_FEED,
  },
  {
    name: "NieuwlandSamen",
    url: "https://nieuwlandsamen.nl",
    city: "utrecht",
    area: "Amersfoort",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Wijknetwerk. Eigenaar nog niet vastgesteld.",
        en: "Neighbourhood network. Owner not yet established.",
      },
      confidence: "to-validate",
      source: GEBIEDONLINE_LEDEN,
    },
    activity: rssCount(7),
    feed: GEBIEDONLINE_FEED,
  },

  /* ---------- Rotterdam ---------- */
  {
    name: "Mijn Rotterdam",
    url: "https://mijn.rotterdam.nl",
    city: "rotterdam",
    area: "Rotterdam",
    models: ["city-provided"],
    software: { nl: "Mendix", en: "Mendix" },
    what: {
      value: {
        nl: "Projecten met peilingen en reacties, bewonersinitiatieven en activiteiten, voor alle 14 gebieden.",
        en: "Projects with polls and reactions, resident initiatives, and activities, across all 14 areas.",
      },
      confidence: "documented",
      source: "https://rotterdamraad.bestuurlijkeinformatie.nl/Document/View/be840f61-5231-4546-aa99-b4e222363990",
    },
    activity: {
      value: {
        nl: "Cijfers van de gemeente over 2023: 40.868 unieke bezoekers, 166 projecten. De telling over de laatste drie maanden staat open.",
        en: "City figures for 2023: 40,868 unique visitors, 166 projects. The count for the last three months remains open.",
      },
      confidence: "documented",
      source: "https://rotterdamraad.bestuurlijkeinformatie.nl/Document/View/be840f61-5231-4546-aa99-b4e222363990",
    },
    feed: { nl: "Sitemap werkt. Geen RSS of API.", en: "The sitemap works. No RSS or API." },
  },
  {
    name: "Wijkraad-portaal",
    url: "https://wijkraad.rotterdam.nl",
    city: "rotterdam",
    area: "Rotterdam",
    models: ["city-provided", "commercial"],
    software: { nl: "iBabs", en: "iBabs" },
    what: {
      value: {
        nl: "Vergaderingen, adviezen en wijkakkoorden van 37 wijkraden en 2 dorpsraden.",
        en: "Meetings, advice, and neighbourhood agreements of 37 neighbourhood councils and 2 village councils.",
      },
      confidence: "documented",
      source: "https://www.rotterdam.nl/wijkraden",
    },
    activity: {
      value: {
        nl: "De kalender loopt door tot minstens 24 november 2026.",
        en: "The calendar runs to at least 24 November 2026.",
      },
      confidence: "documented",
    },
    feed: { nl: "Geen RSS, sitemap of API.", en: "No RSS, sitemap, or API." },
  },
  {
    name: "Opzoomer Mee",
    url: "https://www.opzoomermee.nl",
    city: "rotterdam",
    area: "Rotterdam",
    models: ["community-owned"],
    software: { nl: "WordPress", en: "WordPress" },
    what: {
      value: {
        nl: "Stichting uit 1994, met gemeentelijke subsidie, die ook aanvragen voor bewonersinitiatieven afhandelt.",
        en: "Foundation from 1994, with City subsidy, which also handles applications for resident initiatives.",
      },
      confidence: "self-reported",
      source: "https://www.interregeurope.eu/good-practices/opzoomer-mee",
    },
    activity: {
      value: {
        nl: "Tien items in de feed tussen 24 september en 2 november 2026.",
        en: "Ten feed items between 24 September and 2 November 2026.",
      },
      confidence: "documented",
    },
    feed: { nl: "RSS en sitemap werken. Geen API.", en: "RSS and sitemap work. No API." },
  },
  {
    name: "CityLab010",
    url: "https://www.citylab010.nl",
    city: "rotterdam",
    area: "Rotterdam",
    models: ["city-provided"],
    software: { nl: "ExpressionEngine", en: "ExpressionEngine" },
    what: {
      value: {
        nl: "Gemeentelijk initiatief voor stadsplannen, sinds 2015. De eigen site meldt dat de subsidieregeling per 2026 is gestopt; wat dat precies inhoudt staat open.",
        en: "City initiative for urban plans, since 2015. Its own site says the subsidy scheme stopped as of 2026; what that means exactly remains open.",
      },
      confidence: "self-reported",
      source: "https://www.citylab010.nl",
    },
    activity: {
      value: {
        nl: "Gedateerde items tot minstens 15 oktober 2026 op de homepage.",
        en: "Dated items up to at least 15 October 2026 on the homepage.",
      },
      confidence: "documented",
    },
    feed: {
      nl: "Elk pad geeft de homepage terug, dus alles telt als afwezig.",
      en: "Every path returns the homepage, so everything counts as absent.",
    },
  },
  {
    name: "Zorgzaam010",
    url: "https://www.zorgzaam010.nl",
    city: "rotterdam",
    area: "Rotterdam",
    models: ["city-provided", "commercial"],
    software: { nl: "NLvoorelkaar-netwerk", en: "NLvoorelkaar network" },
    what: {
      value: {
        nl: "Vrijwilligersplatform, sinds 2020 via een aanbesteding uitgevoerd door Social Care Network BV.",
        en: "Volunteering platform, run since 2020 through a tender by Social Care Network BV.",
      },
      confidence: "documented",
      source: "https://rotterdamraad.bestuurlijkeinformatie.nl/Document/View/10dfe6fb-11b0-4893-ab6d-3cda804260b2",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: { nl: "Sitemap werkt. Geen RSS of API.", en: "The sitemap works. No RSS or API." },
  },
  {
    name: "Afrikaanderwijk Coöperatie",
    url: "https://www.wijkcooperatie.org",
    city: "rotterdam",
    area: "Feijenoord",
    models: ["cooperative"],
    software: { nl: "Niet vastgesteld", en: "Not established" },
    what: {
      value: {
        nl: "Wijkcoöperatie uit 2013. Dit is een website van een lokale economie, geen platform.",
        en: "Neighbourhood cooperative from 2013. This is the website of a local economy, not a platform.",
      },
      confidence: "documented",
      source: "https://cooperativecity.org/afrikaanderwijk-cooperative/",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: { nl: "Niet getest.", en: "Not tested." },
  },
  {
    name: "Kenniswerkplaats Leefbare Wijken",
    url: "https://kenniswerkplaats-leefbarewijken.nl",
    city: "rotterdam",
    area: "Rotterdam",
    models: [],
    software: { nl: "WordPress", en: "WordPress" },
    what: {
      value: {
        nl: "Kennisnetwerk over leefbare wijken. Eigenaar en startjaar staan open.",
        en: "Knowledge network on liveable neighbourhoods. Owner and start year remain open.",
      },
      confidence: "to-validate",
      source: "https://kenniswerkplaats-leefbarewijken.nl",
    },
    activity: {
      value: {
        nl: "Nieuwste bericht op 17 oktober 2026.",
        en: "Newest post on 17 October 2026.",
      },
      confidence: "documented",
    },
    feed: { nl: "RSS werkt.", en: "RSS works." },
  },
  {
    name: "Burgerpanel Rotterdam",
    url: "https://www.burgerpanelrotterdam.nl",
    city: "rotterdam",
    area: "Rotterdam",
    models: [],
    software: { nl: "Niet vastgesteld", en: "Not established" },
    what: {
      value: {
        nl: "De site toont 'Website niet beschikbaar'. Of het panel zelf nog bestaat staat open.",
        en: "The site shows 'Website niet beschikbaar'. Whether the panel itself still exists remains open.",
      },
      confidence: "to-validate",
      source: "https://www.burgerpanelrotterdam.nl",
    },
    activity: {
      value: {
        nl: "Nieuwste document dat is gevonden gaat over een gesprek van 9 december 2024.",
        en: "The newest document found concerns a meeting on 9 December 2024.",
      },
      confidence: "documented",
    },
    feed: { nl: "Alle vijf de paden geven 404.", en: "All five paths return 404." },
  },
  {
    name: "WijkConnect Schiedam",
    url: "https://www.wijkconnectschiedam.nl",
    city: "rotterdam",
    area: "Schiedam",
    models: ["commercial"],
    software: { nl: "WijkConnect", en: "WijkConnect" },
    what: {
      value: {
        nl: "Lokaal netwerk en sociale kaart, ondersteund door DOCK.",
        en: "Local network and social map, supported by DOCK.",
      },
      confidence: "self-reported",
      source: "https://www.dock.nl/media/qfifckkg/je-presenteren-op-wijkconnect-schiedam-mei-2023.pdf",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: { nl: "Geen RSS, sitemap of API.", en: "No RSS, sitemap, or API." },
  },
  {
    name: "Doe Mee Dordrecht",
    url: "https://www.doemeedordrecht.nl",
    city: "rotterdam",
    area: "Dordrecht",
    models: ["city-provided", "commercial"],
    software: { nl: "Mett", en: "Mett" },
    what: {
      value: {
        nl: "Gemeentelijk participatieplatform, onder meer gebruikt voor de omgevingsvisie.",
        en: "Municipal participation platform, used among other things for the environmental vision.",
      },
      confidence: "self-reported",
      source: "https://www.doemeedordrecht.nl",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: { nl: "Sitemap werkt. Geen RSS of API.", en: "The sitemap works. No RSS or API." },
  },
  {
    name: "Doe Mee Ridderkerk",
    url: "https://doemee.ridderkerk.nl",
    city: "rotterdam",
    area: "Ridderkerk",
    models: ["city-provided"],
    software: { nl: "WordPress", en: "WordPress" },
    what: {
      value: {
        nl: "Gemeentelijk subdomein met pagina's per onderwerp.",
        en: "Municipal subdomain with pages per topic.",
      },
      confidence: "documented",
      source: "https://doemee.ridderkerk.nl",
    },
    activity: {
      value: {
        nl: "Sitemap bijgewerkt op 2 november 2026; geen gedateerde items.",
        en: "Sitemap updated on 2 November 2026; no dated items.",
      },
      confidence: "documented",
    },
    feed: {
      nl: "/feed en /rss geven een serverfout. Sitemap werkt.",
      en: "/feed and /rss return a server error. The sitemap works.",
    },
  },

  /* ---------- Den Haag ---------- */
  {
    name: "Doe mee | Den Haag",
    url: "https://doemee.denhaag.nl",
    city: "den-haag",
    area: "Den Haag",
    models: ["city-provided", "open-source"],
    software: { nl: "OpenStad", en: "OpenStad" },
    what: {
      value: {
        nl: "Enquêtes en locatiestemmingen. Den Haag was volgens VNG in 2019 de eerste gemeente die OpenStad hergebruikte.",
        en: "Surveys and location votes. According to VNG, Den Haag was the first municipality to reuse OpenStad, in 2019.",
      },
      confidence: "documented",
      source: "https://vng.nl/praktijkvoorbeelden/openstad-van-voor-en-door-gemeenten",
    },
    activity: {
      value: {
        nl: "Nieuwste datum op de twee bekende subsites is 5 juni 2025. De sitemap toont alleen de root, dus er kunnen meer subsites zijn.",
        en: "The newest date on the two known sub-sites is 5 June 2025. The sitemap lists only the root, so more sub-sites may exist.",
      },
      confidence: "documented",
    },
    feed: { nl: "Sitemap werkt. Geen RSS of API.", en: "The sitemap works. No RSS or API." },
  },
  {
    name: "denhaag.nl/denk-mee",
    url: "https://www.denhaag.nl/nl/denk-mee/participatieprojecten-in-den-haag/",
    city: "den-haag",
    area: "Den Haag",
    models: ["city-provided"],
    software: { nl: "Gemeentelijke website", en: "Municipal website" },
    what: {
      value: {
        nl: "De projectindex van de gemeente. Een nieuw platform is aangekondigd; naam en startdatum staan open.",
        en: "The City's project index. A new platform has been announced; its name and start date remain open.",
      },
      confidence: "documented",
      source: "https://democracyagency.nl/inspirations/participatie-organisatie-david-bos/",
    },
    activity: {
      value: {
        nl: "Bijgewerkt op 3 november 2026, met 4 projecten open voor inbreng.",
        en: "Updated on 3 November 2026, with 4 projects open for input.",
      },
      confidence: "documented",
      source: "https://www.denhaag.nl/nl/denk-mee/participatieprojecten-in-den-haag/",
    },
    feed: { nl: "Niet apart getest.", en: "Not tested separately." },
  },
  {
    name: "Register bewonersorganisaties",
    url: "https://www.denhaag.nl/nl/stadsdelen/bewonersorganisaties",
    city: "den-haag",
    area: "Den Haag",
    models: ["city-provided", "community-owned"],
    software: { nl: "35 van 44 onderzochte sites op WordPress", en: "35 of 44 sites checked run WordPress" },
    what: {
      value: {
        nl: "57 vermeldingen, 53 met een externe link. Welzijnsorganisatie Wijkz staat er voor een deel van de wijken tussen.",
        en: "57 entries, 53 with an external link. Welfare organisation Wijkz fills several of the entries.",
      },
      confidence: "documented",
      source: "https://www.denhaag.nl/nl/stadsdelen/bewonersorganisaties",
    },
    activity: {
      value: {
        nl: "22 van de 44 sites hebben een bericht uit de laatste drie maanden in hun feed. Een aantal is stil sinds 2021 tot 2024.",
        en: "22 of the 44 sites have a post from the last three months in their feed. Several have been quiet since between 2021 and 2024.",
      },
      confidence: "documented",
    },
    feed: {
      nl: "Ongeveer 30 sites hebben RSS, als bijeffect van WordPress.",
      en: "About 30 sites have RSS, as a side effect of WordPress.",
    },
  },
  {
    name: "WijkConnect Den Haag",
    url: "https://www.wijkconnect.com/den-haag",
    city: "den-haag",
    area: "Schilderswijk, Transvaal, Rivierenbuurt",
    models: ["commercial"],
    software: { nl: "WijkConnect", en: "WijkConnect" },
    what: {
      value: {
        nl: "Betaald platform met 128 organisaties, agenda en buurtkrant. Wie betaalt staat open.",
        en: "Paid platform with 128 organisations, a calendar, and a neighbourhood paper. Who pays remains open.",
      },
      confidence: "self-reported",
      source: "https://www.wijkconnect.com/site/missie/2?city=den-haag",
    },
    activity: {
      value: {
        nl: "Nieuwste nieuwsbericht op 24 september 2026.",
        en: "Newest news item on 24 September 2026.",
      },
      confidence: "documented",
    },
    feed: { nl: "Sitemap werkt. Geen RSS of API.", en: "The sitemap works. No RSS or API." },
  },
  {
    name: "Den Haag Doet",
    url: "https://www.denhaagdoet.nl",
    city: "den-haag",
    area: "Den Haag",
    models: ["commercial"],
    software: { nl: "Deedmob", en: "Deedmob" },
    what: {
      value: {
        nl: "Vrijwilligersplatform van PEP Den Haag, met volgens de eigen site 1.200+ vacatures en 300+ organisaties.",
        en: "Volunteering platform of PEP Den Haag, with 1,200+ vacancies and 300+ organisations according to its own site.",
      },
      confidence: "self-reported",
      source: "https://www.denhaagdoet.nl",
    },
    activity: {
      value: {
        nl: "Nieuwste expliciete datum is 2 mei 2026.",
        en: "The newest explicit date is 2 May 2026.",
      },
      confidence: "documented",
    },
    feed: { nl: "Geen RSS, sitemap of API.", en: "No RSS, sitemap, or API." },
  },
  {
    name: "Ons Eten Den Haag",
    url: "https://ons-eten.nl",
    city: "den-haag",
    area: "Den Haag",
    models: [],
    software: GEBIEDONLINE,
    what: {
      value: {
        nl: "Thematisch voedselnetwerk, de enige Haagse vermelding bij Gebiedonline die is gevonden.",
        en: "Thematic food network, the only Hague entry found at Gebiedonline.",
      },
      confidence: "documented",
      source: "https://gebiedonline.nl/",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: { nl: "Niet apart getest.", en: "Not tested separately." },
  },
  {
    name: "Social Handprint / MAEX Den Haag",
    url: "https://socialhandprint.com/platform/den-haag/",
    city: "den-haag",
    area: "Den Haag",
    models: ["commercial"],
    software: { nl: "WordPress", en: "WordPress" },
    what: {
      value: {
        nl: "Mogelijk gemaakt door de gemeente, uitgevoerd door MAEX B.V. Volgens de eigen site 368 organisaties en 233 toegekende bijdragen.",
        en: "Made possible by the City, operated by MAEX B.V. According to its own site, 368 organisations and 233 grants.",
      },
      confidence: "self-reported",
      source: "https://socialhandprint.com/platform/den-haag/",
    },
    activity: {
      value: {
        nl: "Nieuwste item in de feed op 16 juni 2026; die feed dekt de hele site, niet alleen Den Haag.",
        en: "Newest feed item on 16 June 2026; the feed covers the whole site, not only Den Haag.",
      },
      confidence: "documented",
    },
    feed: { nl: "RSS en sitemap werken.", en: "RSS and sitemap work." },
  },
  {
    name: "Doe Mee Leiden",
    url: "https://doemee.leiden.nl",
    city: "den-haag",
    area: "Leiden",
    models: ["city-provided", "commercial"],
    software: { nl: "Go Vocal (voorheen CitizenLab)", en: "Go Vocal (formerly CitizenLab)" },
    what: {
      value: {
        nl: "Gemeentelijk platform, omgeving aangemaakt op 5 november 2019.",
        en: "Municipal platform, environment created on 5 November 2019.",
      },
      confidence: "documented",
      source: "https://faro.cultureelerfgoed.nl/articles/2190",
    },
    activity: {
      value: {
        nl: "4 projecten aangemaakt in drie maanden; nieuwste idee op 13 oktober 2026.",
        en: "4 projects created in three months; newest idea on 13 October 2026.",
      },
      confidence: "documented",
    },
    feed: {
      nl: "Geen RSS. Sitemap werkt. /web_api/v1 geeft openbare JSON, zonder documentatie.",
      en: "No RSS. The sitemap works. /web_api/v1 returns public JSON, undocumented.",
    },
  },
  {
    name: "Denk Mee Pijnacker-Nootdorp",
    url: "https://denkmee.pijnacker-nootdorp.nl",
    city: "den-haag",
    area: "Pijnacker-Nootdorp",
    models: ["city-provided", "commercial"],
    software: { nl: "Go Vocal (voorheen CitizenLab)", en: "Go Vocal (formerly CitizenLab)" },
    what: {
      value: {
        nl: "Gemeentelijk platform, omgeving aangemaakt op 1 augustus 2023. 500 kaartreacties in 2025.",
        en: "Municipal platform, environment created on 1 August 2023. 500 map comments in 2025.",
      },
      confidence: "documented",
      source: "https://zoek.officielebekendmakingen.nl/gmb-2026-129369.html",
    },
    activity: {
      value: {
        nl: "85 projecten, 7 in de laatste drie maanden; nieuwste idee op 4 november 2026.",
        en: "85 projects, 7 in the last three months; newest idea on 4 November 2026.",
      },
      confidence: "documented",
    },
    feed: {
      nl: "/web_api/v1 geeft openbare JSON, zonder documentatie.",
      en: "/web_api/v1 returns public JSON, undocumented.",
    },
  },
  {
    name: "Samen Rijswijk",
    url: "https://samen.rijswijk.nl",
    city: "den-haag",
    area: "Rijswijk",
    models: ["city-provided", "commercial"],
    software: { nl: "Go Vocal (voorheen CitizenLab)", en: "Go Vocal (formerly CitizenLab)" },
    what: {
      value: {
        nl: "Gemeentelijk platform, ook gebruikt voor formele reacties op plannen.",
        en: "Municipal platform, also used for formal responses to plans.",
      },
      confidence: "documented",
      source: "https://zoek.officielebekendmakingen.nl/gmb-2025-41153.pdf",
    },
    activity: {
      value: {
        nl: "Nieuwste idee op 18 oktober 2026.",
        en: "Newest idea on 18 October 2026.",
      },
      confidence: "documented",
    },
    feed: {
      nl: "/web_api/v1 geeft openbare JSON, zonder documentatie.",
      en: "/web_api/v1 returns public JSON, undocumented.",
    },
  },
  {
    name: "DoeMee Zoetermeer",
    url: "https://doemee.zoetermeer.nl",
    city: "den-haag",
    area: "Zoetermeer",
    models: ["city-provided", "commercial"],
    software: { nl: "Mett", en: "Mett" },
    what: {
      value: {
        nl: "Gemeentelijk platform. Volgens de leverancier 39 projecten in 2023 en 2024.",
        en: "Municipal platform. According to the vendor, 39 projects in 2023 and 2024.",
      },
      confidence: "self-reported",
      source: "https://mett.nl/kennisbank/cases/burgerparticipatie-in-gemeente-zoetermeer-denken-ruim-1700-geinteresseerden-online-mee",
    },
    activity: { value: NO_DATE, confidence: "to-validate" },
    feed: { nl: "Sitemap werkt. Geen RSS of API.", en: "The sitemap works. No RSS or API." },
  },
  {
    name: "Delft voor Elkaar",
    url: "https://delftvoorelkaar.nl",
    city: "den-haag",
    area: "Delft",
    models: [],
    software: { nl: "WordPress", en: "WordPress" },
    what: {
      value: {
        nl: "Buurtondersteuning met vacatures en vraag en aanbod. Financiering staat open.",
        en: "Neighbourhood support with vacancies and requests and offers. Funding remains open.",
      },
      confidence: "self-reported",
      source: "https://delftvoorelkaar.nl",
    },
    activity: {
      value: {
        nl: "Nieuwste bericht op 5 november 2026; alle tien de items in de feed vallen binnen drie maanden.",
        en: "Newest post on 5 November 2026; all ten feed items fall within three months.",
      },
      confidence: "documented",
    },
    feed: { nl: "RSS werkt.", en: "RSS works." },
  },
];

export type G4Finding = { title: Bi; body: Bi; source?: string };

export const G4_FINDINGS: G4Finding[] = [
  {
    title: { nl: "Vier steden, vier soorten software", en: "Four cities, four kinds of software" },
    body: {
      nl: "Utrecht huurt Go Vocal, Rotterdam bouwde op Mendix, Den Haag gebruikt OpenStad en steeds vaker de eigen website, en Amsterdam draait op Gebiedonline en OpenStad. Geen twee steden delen hun stedelijke platform.",
      en: "Utrecht rents Go Vocal, Rotterdam built on Mendix, Den Haag uses OpenStad and increasingly its own website, and Amsterdam runs on Gebiedonline and OpenStad. No two cities share their citywide platform.",
    },
  },
  {
    title: { nl: "De buurtlaag is overal anders georganiseerd", en: "The neighbourhood layer is organised differently everywhere" },
    body: {
      nl: "Utrecht heeft wijkcoöperaties op Gebiedonline. Den Haag heeft een gemeentelijk register van losse sites. In Rotterdam besluiten gekozen wijkraden, en daar is geen door bewoners gebouwd buurtnetwerk gevonden. Wat in Amsterdam werkt kan dus niet zonder meer worden overgezet.",
      en: "Utrecht has neighbourhood cooperatives on Gebiedonline. Den Haag has a municipal register of separate sites. In Rotterdam elected councils decide, and no resident-built neighbourhood network was found there. What works in Amsterdam therefore cannot simply be copied.",
    },
  },
  {
    title: { nl: "Er komt meer machineleesbare data uit dan gedacht", en: "More machine-readable data comes out than assumed" },
    body: {
      nl: "Gebiedonline-netwerken leveren elk hun eigen agenda als RSS. Ongeveer 30 Haagse bewonerssites hebben een feed via WordPress. Go Vocal-omgevingen geven openbare JSON, al is niet duidelijk of hergebruik is toegestaan. Niemand heeft dit als beleid gekozen.",
      en: "Gebiedonline networks each deliver their own calendar as RSS. About 30 Hague resident sites have a feed through WordPress. Go Vocal environments return public JSON, though whether reuse is allowed is unclear. Nobody chose any of this as a policy.",
    },
  },
  {
    title: { nl: "Eén gebiedsindeling werkt in alle vier de steden", en: "One area model works in all four cities" },
    body: {
      nl: "De CBS Wijk- en Buurtkaart via PDOK gaf op 5 november 2026 buurten terug voor alle vier de gemeentecodes, onder CC BY 4.0. Stedelijke indelingen, zoals de Rotterdamse gebieden, vallen daarbuiten en vragen per stad een vertaaltabel.",
      en: "The CBS Wijk- en Buurtkaart through PDOK returned neighbourhoods for all four municipality codes on 5 November 2026, under CC BY 4.0. City-specific divisions, such as the Rotterdam areas, sit outside it and need a crosswalk per city.",
    },
    source: "https://api.pdok.nl/cbs/wijken-en-buurten-2025/ogc/v1",
  },
  {
    title: { nl: "Er zijn twee momenten om op aan te sluiten", en: "Two moments are open to connect with" },
    body: {
      nl: "De Wet versterking participatie op decentraal niveau geldt sinds 1 januari 2025 en gemeenten krijgen twee jaar voor een participatieverordening. Utrecht deed in 2025 een marktconsultatie over DenkMee. Van die consultatie is de uitkomst onbekend.",
      en: "The Wet versterking participatie op decentraal niveau has applied since 1 January 2025, and municipalities get two years for a participation ordinance. Utrecht ran a market consultation on DenkMee in 2025. The outcome of that consultation is unknown.",
    },
    source: "https://www.ad-fontem.nl/berichten/wet-versterking-participatie-op-decentraal-niveau/",
  },
  {
    title: { nl: "Er is geen G4-tafel voor dit onderwerp gevonden", en: "No G4 table for this topic was found" },
    body: {
      nl: "Het dichtstbijzijnde is de CIO-afspraak Slim Samen Inkopen van de G4, en die gaat over inkoop. VNG financiert in 2026 een OpenStad-pilot met Deventer als trekker en Amsterdam en Zwolle als mede-initiatiefnemers. Niet gevonden betekent niet dat het niet bestaat.",
      en: "The closest is the G4 CIO agreement Slim Samen Inkopen, which covers procurement. VNG funds a 2026 OpenStad pilot led by Deventer, with Amsterdam and Zwolle as co-initiators. Not found does not mean it does not exist.",
    },
    source: "https://vng.nl/artikelen/openstad-voor-iedereen-digitale-participatie-die-werkt-voor-alle-gemeenten",
  },
];

export const G4_OPEN_QUESTIONS: Bi[] = [
  {
    nl: "Wat zijn de contractwaarde en looptijd van DenkMee, en wat kwam er uit de marktconsultatie van 2025?",
    en: "What are the contract value and term of DenkMee, and what came out of the 2025 market consultation?",
  },
  {
    nl: "Vervangt het aangekondigde Haagse platform OpenStad, en hoe heet het?",
    en: "Does the announced Hague platform replace OpenStad, and what is it called?",
  },
  {
    nl: "Heeft Rotterdam buurtnetwerken die deze scan heeft gemist? Veel geraden adressen gaven een time-out, en dat bewijst niets.",
    en: "Does Rotterdam have neighbourhood networks this scan missed? Many guessed addresses timed out, which proves nothing.",
  },
  {
    nl: "Welke buurtsites hebben Leiden, Delft, Zoetermeer en Westland? Daar is geen register zoals in Den Haag gevonden.",
    en: "Which neighbourhood sites do Leiden, Delft, Zoetermeer, and Westland have? No register like Den Haag's was found there.",
  },
  {
    nl: "Mag de JSON van Go Vocal-omgevingen worden hergebruikt, en onder welke voorwaarden?",
    en: "May the JSON from Go Vocal environments be reused, and on what terms?",
  },
  {
    nl: "Wie is de juiste gesprekspartner per stad? Openbare bronnen noemen voor dit onderwerp geen enkele rol.",
    en: "Who is the right counterpart per city? Public sources name no single role for this topic.",
  },
  {
    nl: "Hoe actief zijn Nextdoor en Hoplr in deze steden? De inhoud staat achter een verificatie, en alleen Den Haag komt voor op de site van Hoplr.",
    en: "How active are Nextdoor and Hoplr in these cities? The content sits behind verification, and only Den Haag appears on Hoplr's site.",
  },
];
