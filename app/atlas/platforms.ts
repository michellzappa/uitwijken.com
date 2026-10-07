/**
 * The platform atlas — the evidence base.
 *
 * Editorial rule, decided deliberately: we DESCRIBE, we do not SCORE. There is no
 * ranking and no rating, because a ranking creates defensiveness before there is a
 * shared assessment framework. Every claim carries a `confidence` so a reader can
 * see the difference between "the platform says this about itself", "we read this
 * somewhere" and "nobody has checked this yet".
 *
 * Almost everything here is compiled from each platform's own public description
 * (August 2026). None of it has been validated with the operators yet — that is
 * the point of publishing it.
 */

export type Bi = { nl: string; en: string };

/**
 * How solid is this field?
 *  - documented   : stated by the platform itself or by the City, with a source
 *  - self-reported: the platform's own description of itself, not checked
 *  - to-validate  : we do not know yet; shown as an open field, never guessed
 */
export type Confidence = "documented" | "self-reported" | "to-validate";

export type Note = { value: Bi; confidence: Confidence; source?: string };

/**
 * How hard it is to actually get a usage number. Uptake is the field everyone
 * wants and nobody publishes, so the atlas records the cheapest defensible way
 * to estimate it rather than pretending to know it.
 */
export type Feasibility = "public" | "ask-operator" | "formal-request";

export const FEASIBILITY_META: Record<Feasibility, Bi & { cls: string }> = {
  public: {
    nl: "Zelf te tellen",
    en: "Countable yourself",
    cls: "border-[#b9cdb0] bg-[#dfe6d5] text-[#33501e]",
  },
  "ask-operator": {
    nl: "Vraag het de beheerder",
    en: "Ask the operator",
    cls: "border-[#e2cfa8] bg-[var(--color-uitwijken-soft)] text-[#7a3418]",
  },
  "formal-request": {
    nl: "Publiek opvraagbaar",
    en: "Formally requestable",
    cls: "border-[var(--color-rule)] bg-[var(--color-civic-soft)] text-[#164a72]",
  },
};

/**
 * The general ladder, cheapest first. Every platform-specific estimate below is
 * one of these rungs applied to that platform.
 */
export const USAGE_METHODS: {
  n: string;
  feasibility: Feasibility;
  title: Bi;
  how: Bi;
  worth: Bi;
}[] = [
  {
    n: "01",
    feasibility: "public",
    title: { nl: "Zelf gepubliceerde cijfers", en: "Self-published figures" },
    how: {
      nl: "Neem over wat het platform zelf claimt — leden, communities, geregistreerden — en noteer het als eigen opgave.",
      en: "Take what the platform claims about itself — members, communities, registrations — and record it as self-reported.",
    },
    worth: {
      nl: "Zwak. Registraties zijn cumulatief en zeggen niets over deze maand. Bruikbaar als bovengrens, nooit als bewijs van activiteit.",
      en: "Weak. Registrations are cumulative and say nothing about this month. Usable as an upper bound, never as proof of activity.",
    },
  },
  {
    n: "02",
    feasibility: "public",
    title: { nl: "Publicatiecadans", en: "Publication cadence" },
    how: {
      nl: "Tel over drie maanden het aantal openbare items met datum (berichten, events, oproepen) en het aantal unieke auteurs daarachter.",
      en: "Over three months, count the dated public items (posts, events, requests) and the number of distinct authors behind them.",
    },
    worth: {
      nl: "Het beste goedkope signaal. Onderscheidt een levend platform van een etalage, en unieke auteurs onderscheiden een community van één vrijwilliger.",
      en: "The best cheap signal. It separates a living platform from a shop window, and distinct authors separate a community from one volunteer.",
    },
  },
  {
    n: "03",
    feasibility: "public",
    title: { nl: "Archieftrend", en: "Archive trend" },
    how: {
      nl: "Herhaal de telling van 02 op Wayback-snapshots uit bijvoorbeeld 2016, 2020 en 2024.",
      en: "Repeat the count from 02 on Wayback snapshots from, say, 2016, 2020, and 2024.",
    },
    worth: {
      nl: "Maakt van een momentopname een richting: groeiend, stabiel of ingeslapen. Cruciaal voordat je iets 'actief' noemt.",
      en: "Turns a snapshot into a direction: growing, steady, or dormant. Essential before calling anything 'active'.",
    },
  },
  {
    n: "04",
    feasibility: "public",
    title: { nl: "Opkomst per traject", en: "Turnout per process" },
    how: {
      nl: "Voor participatietooling: deel het aantal uitgebrachte stemmen of ingediende plannen door het aantal stemgerechtigden in dat gebied.",
      en: "For participation tooling: divide the votes cast or plans submitted by the number of eligible residents in that area.",
    },
    worth: {
      nl: "De enige maat die buurten eerlijk vergelijkt. Uitslagen worden meestal al per traject gepubliceerd.",
      en: "The only measure that compares neighbourhoods fairly. Results are usually already published per process.",
    },
  },
  {
    n: "05",
    feasibility: "ask-operator",
    title: { nl: "Analytics van de beheerder", en: "The operator's analytics" },
    how: {
      nl: "Vraag om maandelijkse actieve gebruikers, terugkeerpercentage en de verhouding lezers/plaatsers.",
      en: "Ask for monthly active users, return rate, and the ratio of readers to posters.",
    },
    worth: {
      nl: "Accuraat, maar het kost een relatie. Precies daarom is dit het moment om te vragen: de vraag zelf opent het gesprek.",
      en: "Accurate, but it costs a relationship. Which is exactly why now is the time to ask: the question itself opens the conversation.",
    },
  },
  {
    n: "06",
    feasibility: "formal-request",
    title: { nl: "Publieke verantwoording", en: "Public accountability" },
    how: {
      nl: "Voor publiek gefinancierde platformen: vraag kosten, bereik en doelstelling op bij de gemeente, desnoods via een Woo-verzoek.",
      en: "For publicly funded platforms: request cost, reach, and objective from the City, via a freedom-of-information request if needed.",
    },
    worth: {
      nl: "Traag maar hard. Publiek geld hoort een publiek antwoord te hebben.",
      en: "Slow but solid. Public money should come with a public answer.",
    },
  },
];

/**
 * Third-party traffic estimators are deliberately absent from that ladder: below
 * roughly ten thousand visits a month they are noise, and every neighbourhood
 * platform in this atlas is below that.
 */

export const CONFIDENCE_META: Record<Confidence, Bi & { cls: string }> = {
  documented: {
    nl: "Gedocumenteerd",
    en: "Documented",
    cls: "border-[#b9cdb0] bg-[#dfe6d5] text-[#33501e]",
  },
  "self-reported": {
    nl: "Eigen opgave",
    en: "Self-reported",
    cls: "border-[#e2cfa8] bg-[var(--color-uitwijken-soft)] text-[#7a3418]",
  },
  "to-validate": {
    nl: "Te valideren",
    en: "To validate",
    cls: "border-[var(--color-rule)] bg-[#f1efe8] text-[var(--color-secondary)]",
  },
};

/** Geographic reach — the first axis of the ecosystem map. */
export type Geography = "neighbourhood" | "district" | "citywide" | "thematic" | "beyond";

export const GEOGRAPHY_META: Record<Geography, Bi> = {
  neighbourhood: { nl: "Buurt", en: "Neighbourhood" },
  district: { nl: "Stadsdeel", en: "District" },
  citywide: { nl: "Stedelijk", en: "Citywide" },
  thematic: { nl: "Thematisch", en: "Thematic" },
  beyond: { nl: "Buiten Amsterdam", en: "Beyond Amsterdam" },
};

/** What a platform lets people do — the second axis. */
export type FunctionKey =
  | "news"
  | "events"
  | "projects"
  | "discussion"
  | "voting"
  | "knowledge"
  | "mutualaid"
  | "directory"
  | "consultation";

export const FUNCTION_META: Record<FunctionKey, Bi> = {
  news: { nl: "Nieuws", en: "News" },
  events: { nl: "Agenda & events", en: "Events & calendar" },
  projects: { nl: "Projecten & initiatieven", en: "Projects & initiatives" },
  discussion: { nl: "Gesprek", en: "Discussion" },
  voting: { nl: "Stemmen & prioriteren", en: "Voting & prioritisation" },
  knowledge: { nl: "Kennisdeling", en: "Knowledge sharing" },
  mutualaid: { nl: "Vraag & aanbod", en: "Requests & offers" },
  directory: { nl: "Gids & organisaties", en: "Directory & organisations" },
  consultation: { nl: "Inspraak & participatie", en: "Consultation & participation" },
};

/** Who owns and pays — the third axis, the relationship view. */
export type ModelKey =
  | "city-provided"
  | "community-owned"
  | "cooperative"
  | "open-source"
  | "commercial";

export const MODEL_META: Record<ModelKey, Bi> = {
  "city-provided": { nl: "Door de gemeente aangeboden", en: "City-provided" },
  "community-owned": { nl: "Gemeenschap-eigendom", en: "Community-owned" },
  cooperative: { nl: "Coöperatief", en: "Cooperative" },
  "open-source": { nl: "Open source", en: "Open source" },
  commercial: { nl: "Commercieel", en: "Commercial" },
};

/** The eight Amsterdam districts, for the coverage view. */
export const DISTRICTS = [
  "Centrum",
  "Noord",
  "West",
  "Nieuw-West",
  "Zuid",
  "Oost",
  "Zuidoost",
  "Weesp",
] as const;
export type District = (typeof DISTRICTS)[number];

/**
 * How to read a platform onto the district grid. We never place a pin we cannot
 * defend, so the grid distinguishes "documented here" from "claims the whole
 * city" from "we have not checked".
 */
export type CoverageMode = "place" | "citywide" | "provider" | "thematic" | "nonlocal";

export type CoverageCell = "documented" | "claimed" | "to-validate" | "na";

export const COVERAGE_META: Record<CoverageCell, Bi & { mark: string; cls: string }> = {
  documented: {
    nl: "Gedocumenteerd aanwezig",
    en: "Documented presence",
    mark: "●",
    cls: "text-[#33501e]",
  },
  claimed: {
    nl: "Stedelijk bereik geclaimd",
    en: "Citywide reach claimed",
    mark: "◐",
    cls: "text-[#7a3418]",
  },
  "to-validate": {
    nl: "Onbekend — te valideren",
    en: "Unknown — to validate",
    mark: "○",
    cls: "text-[#a9a396]",
  },
  na: {
    nl: "Niet geografisch georganiseerd",
    en: "Not organised geographically",
    mark: "–",
    cls: "text-[#cfcabc]",
  },
};

/**
 * What a system actually exposes to other systems. Every entry marked "probed"
 * was checked by requesting the URL on 31 August 2026 — not read off a brochure.
 * A soft 404 (HTTP 200 returning the ordinary HTML page) counts as absent.
 */
export type EndpointResult = "works" | "empty" | "absent" | "undocumented";

export const ENDPOINT_META: Record<EndpointResult, Bi & { mark: string; cls: string }> = {
  works: { nl: "Werkt", en: "Works", mark: "●", cls: "text-[#33501e]" },
  empty: { nl: "Bestaat, maar leeg", en: "Exists but empty", mark: "◐", cls: "text-[#7a3418]" },
  undocumented: {
    nl: "Reageert, niet gedocumenteerd",
    en: "Responds, undocumented",
    mark: "◌",
    cls: "text-[#7a3418]",
  },
  absent: { nl: "Afwezig", en: "Absent", mark: "–", cls: "text-[#a9a396]" },
};

export type Endpoint = {
  path: string;
  result: EndpointResult;
  verified: "probed" | "documented";
  note: Bi;
};

export type InteropProbe = {
  /** The shared codebase this runs on, where that could be established. */
  runsOn: Bi | null;
  openSource: "yes" | "no" | "unknown";
  endpoints: Endpoint[];
};

export type Platform = {
  slug: string;
  name: string;
  /** Null when we do not yet have a canonical URL we are willing to publish. */
  url: string | null;
  tagline: Bi;
  geography: Geography[];
  models: ModelKey[];
  functions: FunctionKey[];
  coverageMode: CoverageMode;
  /**
   * Districts with a documented presence. Used for "place" platforms and for
   * "provider" platforms where specific member communities are documented.
   */
  districts: District[];
  /** When it started. `year` is null when no start year could be established. */
  launched: {
    year: string | null;
    value: Bi;
    confidence: Confidence;
    source?: string;
  };
  /** Not what the uptake is — how you would go and find out. */
  usageEstimate: { feasibility: Feasibility; value: Bi };
  /** What it actually exposes to other systems, checked rather than claimed. */
  probe: InteropProbe;

  audience: Note;
  purpose: Note;
  governance: Note;
  funding: Note;
  activity: Note;
  interop: Note;
  moderation: Note;
  cityRelation: Note;

  /** Editorial, in our own voice — the useful thing this platform demonstrates. */
  doesWell: Bi;
  /** What we would need to ask the operator before anyone draws a conclusion. */
  openQuestions: Bi[];
};

export const PLATFORMS: Platform[] = [
  {
    slug: "hallo-ijburg",
    name: "Hallo IJburg",
    url: "https://halloijburg.nl/",
    tagline: {
      nl: "Een buurtsite die door de buurt zelf gevuld wordt",
      en: "A neighbourhood site filled by the neighbourhood itself",
    },
    geography: ["neighbourhood"],
    models: ["community-owned", "cooperative"],
    functions: ["news", "events", "mutualaid", "discussion", "projects"],
    coverageMode: "place",
    districts: ["Oost"],
    launched: {
      year: "2012",
      value: {
        nl: "Eerste versie live op 21 mei 2012, voortgekomen uit de bijeenkomsten van IJburgDroomt–IJburgDoet in 2010. De techniek werd gebouwd door IJburger Michel Vogler.",
        en: "First version live on 21 May 2012, growing out of the IJburgDroomt–IJburgDoet meetings in 2010. The technology was built by IJburg resident Michel Vogler.",
      },
      confidence: "documented",
      source: "https://halloijburg.nl/overons",
    },
    usageEstimate: {
      feasibility: "public",
      value: {
        nl: "Alles staat openbaar met datum. Tel over drie maanden de geplaatste berichten, events en oproepen én het aantal unieke auteurs, en zet dat af tegen de circa 25.000 inwoners van IJburg. Herhaal de telling op Wayback-snapshots uit 2014, 2018 en 2022 en je hebt een trendlijn sinds de start in 2012.",
        en: "Everything is public and dated. Over three months, count posted items, events, and requests plus the number of distinct authors, and set that against IJburg's roughly 25,000 residents. Repeat the count on Wayback snapshots from 2014, 2018, and 2022 and you have a trend line since it started in 2012.",
      },
    },
    probe: {
      runsOn: {
        nl: "Gebiedonline. De footer zegt letterlijk: \u201cOntwikkeld met software van Gebiedonline\u201d.",
        en: "Gebiedonline. The footer says, literally: \u201cOntwikkeld met software van Gebiedonline\u201d.",
      },
      openSource: "unknown",
      endpoints: [
        {
          path: "/rss",
          result: "works",
          verified: "probed",
          note: {
            nl: "Levert de agenda als RSS. Dit is het enige werkende machineleesbare eindpunt dat in deze hele atlas is aangetroffen.",
            en: "Serves the calendar as RSS. This is the only working machine-readable endpoint found anywhere in this atlas.",
          },
        },
        {
          path: "/api",
          result: "absent",
          verified: "probed",
          note: {
            nl: "Geen API. Het pad valt terug op de gewone HTML-pagina.",
            en: "No API. The path falls back to the ordinary HTML page.",
          },
        },
        {
          path: "/sitemap.xml",
          result: "absent",
          verified: "probed",
          note: { nl: "Geen sitemap.", en: "No sitemap." },
        },
        {
          path: "/agenda.ics",
          result: "absent",
          verified: "probed",
          note: {
            nl: "Geen iCal-export, dus de agenda is niet in een agenda-app te abonneren.",
            en: "No iCal export, so the calendar cannot be subscribed to from a calendar app.",
          },
        },
      ],
    },
    audience: {
      value: {
        nl: "Bewoners, ondernemers en professionals in IJburg.",
        en: "Residents, entrepreneurs, and professionals in IJburg.",
      },
      confidence: "self-reported",
      source: "https://halloijburg.nl/",
    },
    purpose: {
      value: {
        nl: "Eén lokale plek waar bewoners, ondernemers en professionals informatie delen: nieuws, agenda, vraag en aanbod, en buurtprioriteiten.",
        en: "One local place where residents, entrepreneurs, and professionals share information: news, calendar, requests and offers, and local priorities.",
      },
      confidence: "self-reported",
      source: "https://halloijburg.nl/",
    },
    governance: {
      value: {
        nl: "Gebouwd door een team IJburgers vanuit IJburgDroomt–IJburgDoet, een informeel netwerk van zo'n 150 mensen dat inmiddels niet meer actief is; het IJburg-netwerk is medeoprichter van coöperatie Gebiedonline. Wie vandaag formeel eigenaar is en wie eindverantwoordelijk is voor moderatie staat nergens uitgeschreven.",
        en: "Built by a team of IJburg residents out of IJburgDroomt–IJburgDoet, an informal network of some 150 people that is no longer active; the IJburg network is a co-founder of the Gebiedonline cooperative. Who formally owns it today and who is ultimately responsible for moderation is written down nowhere.",
      },
      confidence: "self-reported",
      source: "https://gebiedonline.nl/we_zijn_een_cooperatie",
    },
    funding: {
      value: {
        nl: "De site dankt steun aan onder meer Stadsdeel Oost, het IJburg College en de Coalitie IJburg. Of dat geld, ruimte of inzet was — en of het nog loopt — staat er niet bij.",
        en: "The site credits support from Stadsdeel Oost, the IJburg College, and the Coalitie IJburg, among others. Whether that was money, space, or effort — and whether it still runs — is not stated.",
      },
      confidence: "self-reported",
      source: "https://halloijburg.nl/overons",
    },
    activity: {
      value: {
        nl: "De site toont een lopende nieuwsstroom, een agenda, vraag- en aanbodberichten en buurtprioriteiten. Aantallen deelnemers of bijdragen worden niet gepubliceerd.",
        en: "The site shows a running news stream, a calendar, requests and offers, and local priorities. Participant or contribution counts are not published.",
      },
      confidence: "self-reported",
      source: "https://halloijburg.nl/",
    },
    interop: {
      value: {
        nl: "Draait op de software die hier is ontstaan en in 2016 in coöperatie Gebiedonline is ondergebracht. Of daar een API, export of open-sourcelicentie bij hoort, is nog niet vastgesteld.",
        en: "Runs on the software that originated here and was placed in the Gebiedonline cooperative in 2016. Whether that comes with an API, export, or open-source licence has not been established.",
      },
      confidence: "self-reported",
      source: "https://gebiedonline.nl/we_zijn_een_cooperatie",
    },
    moderation: {
      value: {
        nl: "Naar eigen zeggen licht en redactioneel terughoudend. Op de over-ons-pagina staan geen huisregels, moderatiebeleid of escalatiepad.",
        en: "Light and editorially restrained by its own account. The about page carries no house rules, moderation policy, or escalation path.",
      },
      confidence: "to-validate",
    },
    cityRelation: {
      value: {
        nl: "Mogelijk een van de buurtplatformen waar Wij Amsterdam naar verwijst. Te bevestigen bij zowel de gemeente als de redactie.",
        en: "Possibly one of the neighbourhood platforms Wij Amsterdam links to. To be confirmed with both the City and the editors.",
      },
      confidence: "to-validate",
    },
    doesWell: {
      nl: "Het laat zien dat één buurt tegelijk nieuws, agenda én wederkerigheid kan dragen zonder stedelijke regie — precies het soort infrastructuur dat een nieuw platform zou dupliceren.",
      en: "It shows that a single neighbourhood can carry news, a calendar, and reciprocity at once without city direction — exactly the kind of infrastructure a new platform would duplicate.",
    },
    openQuestions: [
      {
        nl: "Wie draait en betaalt de site, en wat gebeurt er als die persoon of groep stopt?",
        en: "Who runs and pays for the site, and what happens if that person or group stops?",
      },
      {
        nl: "Hoe verhouden de redactie en de coöperatie zich vandaag tot elkaar, en wie betaalt hosting en doorontwikkeling?",
        en: "How do the editors and the cooperative relate today, and who pays for hosting and ongoing development?",
      },
      {
        nl: "Hoeveel bewoners dragen actief bij, en hoe verhoudt zich dat tot IJburg als geheel?",
        en: "How many residents actively contribute, and how does that compare to IJburg as a whole?",
      },
    ],
  },
  {
    slug: "kenniscloud",
    name: "KennisCloud",
    url: "https://www.kenniscloud.nl/",
    tagline: {
      nl: "Een netwerk rond thema's, niet rond een postcode",
      en: "A network around themes, not around a postcode",
    },
    geography: ["thematic", "beyond"],
    models: ["community-owned"],
    functions: ["knowledge", "events", "discussion", "projects", "directory"],
    coverageMode: "thematic",
    districts: [],
    launched: {
      year: null,
      value: {
        nl: "Startjaar niet publiek gevonden. Het netwerk is tot stand gekomen met Bibliotheek Midden-Brabant, de Provincie Noord-Brabant, de Brabantse Netwerkbibliotheek, VPRO, Waag Futurelab en Driebit, en wordt door zeven regiobibliotheken gebruikt.",
        en: "Start year not publicly found. The network was created with Bibliotheek Midden-Brabant, the Province of Noord-Brabant, the Brabantse Netwerkbibliotheek, VPRO, Waag Futurelab, and Driebit, and is used by seven regional libraries.",
      },
      confidence: "to-validate",
      source: "https://www.kenniscloud.nl/page/376/over-deze-site",
    },
    usageEstimate: {
      feasibility: "public",
      value: {
        nl: "Tel de kennisgroepen, de leden per groep waar die publiek zijn, en de datums van geplande en afgelopen meetups over twaalf maanden. Filter op regio: de eerste vraag is niet hoe groot het netwerk is, maar of er überhaupt Amsterdamse activiteit in zit.",
        en: "Count the knowledge groups, the members per group where public, and the dates of upcoming and past meetups over twelve months. Filter by region: the first question is not how big the network is, but whether there is any Amsterdam activity in it at all.",
      },
    },
    probe: {
      runsOn: null,
      openSource: "unknown",
      endpoints: [
        {
          path: "/sitemap.xml",
          result: "works",
          verified: "probed",
          note: {
            nl: "Een sitemapindex. Genoeg om de inhoud te vinden, te weinig om er iets mee te doen.",
            en: "A sitemap index. Enough to find the content, not enough to do anything with it.",
          },
        },
        {
          path: "/api",
          result: "undocumented",
          verified: "probed",
          note: {
            nl: "Antwoordt met HTTP 400 in plaats van een 404: er luistert iets. Publieke documentatie ontbreekt, dus onbruikbaar voor derden.",
            en: "Answers HTTP 400 rather than 404: something is listening. Public documentation is missing, so it is unusable by third parties.",
          },
        },
        {
          path: "/rss",
          result: "absent",
          verified: "probed",
          note: { nl: "HTTP 404.", en: "HTTP 404." },
        },
      ],
    },
    audience: {
      value: {
        nl: "Mensen, communities en organisaties die rond een maatschappelijk thema willen samenwerken.",
        en: "People, communities, and organisations who want to work together around a socially relevant theme.",
      },
      confidence: "self-reported",
      source: "https://www.kenniscloud.nl/",
    },
    purpose: {
      value: {
        nl: "Elkaar online én offline ontmoeten rond maatschappelijk relevante thema's, met kennisgroepen, meetups en regio's.",
        en: "Meeting online and offline around socially relevant themes, through knowledge groups, meetups, and regions.",
      },
      confidence: "self-reported",
      source: "https://www.kenniscloud.nl/",
    },
    governance: {
      value: {
        nl: "Niet publiek beschreven wie besluit over regels, functies en toelating.",
        en: "Not publicly described who decides on rules, features, and admission.",
      },
      confidence: "to-validate",
    },
    funding: {
      value: {
        nl: "Tot stand gekomen met steun van onder meer Stichting Pica, die informatievoorziening financiert. Het lopende exploitatiemodel is niet publiek beschreven.",
        en: "Created with support from Stichting Pica, among others, which funds information provision. The ongoing operating model is not publicly described.",
      },
      confidence: "self-reported",
      source: "https://www.kenniscloud.nl/page/376/over-deze-site",
    },
    activity: {
      value: {
        nl: "Kennisgroepen, meetups, regio-ingangen en citizen-science-activiteit zijn zichtbaar. De Amsterdamse deelverzameling is niet apart gemeten.",
        en: "Knowledge groups, meetups, regional entry points, and citizen-science activity are visible. The Amsterdam subset has not been measured separately.",
      },
      confidence: "self-reported",
      source: "https://www.kenniscloud.nl/",
    },
    interop: {
      value: {
        nl: "API, export of open-sourcestatus onbekend.",
        en: "API, export, or open-source status unknown.",
      },
      confidence: "to-validate",
    },
    moderation: {
      value: {
        nl: "Er zijn gebruiksvoorwaarden, gedragsregels en een notice-and-takedownbeleid gepubliceerd — meer formele moderatiedocumentatie dan enig ander platform in deze atlas laat zien. Wie handhaaft is niet beschreven.",
        en: "Terms of use, a code of conduct, and a notice-and-takedown policy are published — more formal moderation documentation than any other platform in this atlas shows. Who enforces it is not described.",
      },
      confidence: "self-reported",
      source: "https://www.kenniscloud.nl/page/376/over-deze-site",
    },
    cityRelation: {
      value: {
        nl: "Geen formele relatie met de gemeente Amsterdam bekend. Het netwerk is in Noord-Brabant ontstaan, rond bibliotheken; of er noemenswaardige Amsterdamse activiteit is, moet nog worden vastgesteld.",
        en: "No formal relationship with the City of Amsterdam known. The network originated in Noord-Brabant, around libraries; whether there is meaningful Amsterdam activity still has to be established.",
      },
      confidence: "to-validate",
      source: "https://www.kenniscloud.nl/page/376/over-deze-site",
    },
    doesWell: {
      nl: "Het bewijst dat een community zich om een onderwerp kan organiseren in plaats van om een gebied, en dat online koppelen aan fysieke bijeenkomsten werkt.",
      en: "It proves a community can organise around a subject rather than an area, and that linking online to physical meetups works.",
    },
    openQuestions: [
      {
        nl: "Hoeveel van de activiteit is Amsterdams, en overlapt die met buurtplatformen?",
        en: "How much of the activity is Amsterdam-based, and does it overlap with neighbourhood platforms?",
      },
      {
        nl: "Wie exploiteert het netwerk en met welk verdienmodel?",
        en: "Who operates the network and on what business model?",
      },
    ],
  },
  {
    slug: "openstad",
    name: "OpenStad",
    url: "https://openstad.org/",
    tagline: {
      nl: "Participatie-gereedschap, geen bestemming",
      en: "Participation tooling, not a destination",
    },
    geography: ["citywide", "beyond"],
    models: ["open-source", "city-provided"],
    functions: ["consultation", "voting", "projects", "discussion"],
    coverageMode: "provider",
    districts: [],
    launched: {
      year: "2016",
      value: {
        nl: "Sinds 2016 ontwikkeld door een innovatieteam van de gemeente Amsterdam. Den Haag was in 2019 de eerste andere gemeente die ermee ging werken.",
        en: "Developed since 2016 by an innovation team at the City of Amsterdam. The Hague was the first other municipality to adopt it, in 2019.",
      },
      confidence: "self-reported",
      source: "https://vng.nl/praktijkvoorbeelden/openstad-van-voor-en-door-gemeenten",
    },
    usageEstimate: {
      feasibility: "public",
      value: {
        nl: "Trajecten publiceren doorgaans hun eigen uitslag: aantal stemmen, aantal ingediende plannen. Deel dat per Amsterdams traject door het aantal stemgerechtigden in dat gebied en je krijgt een opkomstpercentage dat tussen buurten vergelijkbaar is. Voor het totaal over alle instanties is een uitdraai van het team nodig.",
        en: "Processes usually publish their own results: votes cast, plans submitted. Divide that per Amsterdam process by the eligible residents in that area and you get a turnout rate comparable between neighbourhoods. A total across all instances needs an export from the team.",
      },
    },
    probe: {
      runsOn: {
        nl: "Eigen open-source stack; de projectsite draait zelf op OpenStad (Express, met een openstad-6-cookie).",
        en: "Its own open-source stack; the project site itself runs on OpenStad (Express, setting an openstad-6 cookie).",
      },
      openSource: "yes",
      endpoints: [
        {
          path: "—",
          result: "undocumented",
          verified: "probed",
          note: {
            nl: "Bewust niet beoordeeld: openstad.org is de projectsite, geen participatie-instantie. De eindpunten moeten op een echte Amsterdamse instantie worden getest, niet hier.",
            en: "Deliberately not scored: openstad.org is the project site, not a participation instance. Its endpoints need testing on a real Amsterdam instance, not here.",
          },
        },
      ],
    },
    audience: {
      value: {
        nl: "Overheden en projectteams die inspraak organiseren, en de bewoners die binnen zo'n project meedoen.",
        en: "Governments and project teams organising consultation, and the residents who take part inside such a project.",
      },
      confidence: "to-validate",
    },
    purpose: {
      value: {
        nl: "Interactieve participatiesites per traject mogelijk maken, met stem-, plan- en budgetmodules — ingebed in een project, niet als plek waar bewoners permanent lid worden.",
        en: "Enabling interactive participation sites per process, with voting, plan, and budget modules — embedded in a project, not a place residents permanently join.",
      },
      confidence: "self-reported",
      source: "https://vng.nl/praktijkvoorbeelden/openstad-van-voor-en-door-gemeenten",
    },
    governance: {
      value: {
        nl: "Ontstaan als innovatieteam van de gemeente Amsterdam en gepositioneerd als 'van, voor en door gemeenten'. Hoe eigendom, roadmap-zeggenschap en onderhoud vandaag formeel geregeld zijn, is met het team te bevestigen.",
        en: "Started as an innovation team at the City of Amsterdam and positioned as 'by, for, and with municipalities'. How ownership, roadmap control, and maintenance are formally arranged today is to be confirmed with the team.",
      },
      confidence: "self-reported",
      source: "https://vng.nl/praktijkvoorbeelden/openstad-van-voor-en-door-gemeenten",
    },
    funding: {
      value: {
        nl: "Wie de doorontwikkeling en het beheer betaalt is niet vastgesteld.",
        en: "Who pays for ongoing development and maintenance has not been established.",
      },
      confidence: "to-validate",
    },
    activity: {
      value: {
        nl: "Meer dan honderd trajecten uitgevoerd, onder meer in Amsterdam, Den Haag, Alphen aan den Rijn, Haarlem en Utrecht; circa vijftig publieke organisaties zijn betrokken. Hoeveel daarvan nu in Amsterdam actief zijn is niet uitgesplitst.",
        en: "More than a hundred processes carried out, including in Amsterdam, The Hague, Alphen aan den Rijn, Haarlem, and Utrecht; some fifty public organisations are involved. How many of those are currently active in Amsterdam is not broken out.",
      },
      confidence: "self-reported",
      source: "https://vng.nl/praktijkvoorbeelden/openstad-van-voor-en-door-gemeenten",
    },
    interop: {
      value: {
        nl: "Wordt beschreven als open source; API, export en standaarden moeten tegen de documentatie worden gelegd.",
        en: "Described as open source; API, export, and standards need to be checked against the documentation.",
      },
      confidence: "to-validate",
    },
    moderation: {
      value: {
        nl: "Moderatie ligt vermoedelijk bij het uitvoerende projectteam. Te bevestigen.",
        en: "Moderation presumably sits with the project team running the process. To be confirmed.",
      },
      confidence: "to-validate",
    },
    cityRelation: {
      value: {
        nl: "Binnen de gemeente Amsterdam ontstaan en inmiddels ook gebruikt door andere gemeenten, provincies en waterschappen. Een bron uit 2020 koppelt Wij Amsterdam aan deze software; de techniek van dat platform wijst inmiddels ergens anders heen.",
        en: "Originated inside the City of Amsterdam and is now also used by other municipalities, provinces, and water boards. A 2020 source links Wij Amsterdam to this software; that platform's technical signature now points elsewhere.",
      },
      confidence: "self-reported",
      source: "https://vng.nl/praktijkvoorbeelden/openstad-van-voor-en-door-gemeenten",
    },
    doesWell: {
      nl: "Het scheidt participatie-gereedschap van community-bezit: een bewoner hoeft nergens lid van te worden om mee te doen aan één besluit.",
      en: "It separates participation tooling from community ownership: a resident does not have to join anything to take part in a single decision.",
    },
    openQuestions: [
      {
        nl: "Wie draagt vandaag het beheer en de doorontwikkeling, en uit welk budget?",
        en: "Who carries maintenance and ongoing development today, and out of which budget?",
      },
      {
        nl: "Welke Amsterdamse trajecten draaien er nu op, en wie beheert de instanties?",
        en: "Which Amsterdam processes currently run on it, and who maintains the instances?",
      },
      {
        nl: "Kan het als participatielaag onder bestaande buurtplatformen hangen in plaats van ernaast?",
        en: "Can it sit as a participation layer underneath existing neighbourhood platforms rather than beside them?",
      },
    ],
  },
  {
    slug: "decidim",
    name: "Decidim",
    url: "https://decidim.org/",
    tagline: {
      nl: "Referentiemodel voor vrije participatie-infrastructuur",
      en: "A reference model for free civic-participation infrastructure",
    },
    geography: ["beyond"],
    models: ["open-source", "community-owned"],
    functions: ["consultation", "voting", "projects", "discussion", "knowledge"],
    coverageMode: "nonlocal",
    districts: [],
    launched: {
      year: "2016",
      value: {
        nl: "Voortgekomen uit het EU-project D-CENT (2013–2016). decidim.barcelona ging op 31 januari 2016 live; vanaf februari 2016 dragen de gemeente Barcelona en de Decidim-community het als vrije software.",
        en: "Grew out of the EU-funded D-CENT project (2013–2016). decidim.barcelona went live on 31 January 2016; from February 2016 the Barcelona City Council and the Decidim community have carried it as free software.",
      },
      confidence: "documented",
      source: "https://en.wikipedia.org/wiki/Decidim",
    },
    usageEstimate: {
      feasibility: "public",
      value: {
        nl: "Veel instanties draaien een statistiekenmodule met deelnemers, voorstellen en stemmen, en het project houdt een lijst van instanties bij. Gebruik het niet als Amsterdamse maat maar als ijkpunt: wat is een normale opkomst in een stad van vergelijkbare omvang?",
        en: "Many instances run a statistics module with participants, proposals, and votes, and the project maintains a list of instances. Use it not as an Amsterdam measure but as a benchmark: what is normal turnout in a city of comparable size?",
      },
    },
    probe: {
      runsOn: null,
      openSource: "yes",
      endpoints: [
        {
          path: "/api",
          result: "works",
          verified: "documented",
          note: {
            nl: "Een volledige GraphQL-API over alle publieke inhoud, met /api/docs en een /api/graphiql-speeltuin ernaast.",
            en: "A full GraphQL API over all public content, with /api/docs and an /api/graphiql sandbox alongside it.",
          },
        },
        {
          path: "/open-data/download",
          result: "works",
          verified: "documented",
          note: {
            nl: "Platte bestanden (CSV, JSON) per installatie, gepubliceerd onder de Open Database License. Precies de lage drempel die de rest mist.",
            en: "Flat files (CSV, JSON) per installation, published under the Open Database License. Exactly the low barrier the rest lacks.",
          },
        },
      ],
    },
    audience: {
      value: {
        nl: "Steden, organisaties en bewegingen die participatie organiseren, en hun deelnemers.",
        en: "Cities, organisations, and movements organising participation, and their participants.",
      },
      confidence: "self-reported",
      source: "https://decidim.org/",
    },
    purpose: {
      value: {
        nl: "Vrije/libre infrastructuur voor democratische participatie, met nadruk op transparantie, traceerbaarheid, privacy en gemeenschapseigendom.",
        en: "Free/libre infrastructure for democratic participation, emphasising transparency, traceability, privacy, and community ownership.",
      },
      confidence: "self-reported",
      source: "https://decidim.org/",
    },
    governance: {
      value: {
        nl: "Beschrijft een expliciet democratisch governance-model rond de software zelf, inclusief een sociaal contract voor gebruikers.",
        en: "Describes an explicit democratic governance model around the software itself, including a social contract for users.",
      },
      confidence: "self-reported",
      source: "https://decidim.org/",
    },
    funding: {
      value: {
        nl: "Publieke en community-financiering rond een vrije-softwareproject. Kosten van een Nederlandse uitrol zijn niet in beeld.",
        en: "Public and community funding around a free-software project. The cost of a Dutch deployment is not in view.",
      },
      confidence: "to-validate",
    },
    activity: {
      value: {
        nl: "Meer dan 400 actieve instanties in circa twintig landen, waaronder Helsinki, Mexico-Stad, New York en de Franse Assemblée nationale. Geen Amsterdamse uitrol bekend.",
        en: "More than 400 active instances in some twenty countries, including Helsinki, Mexico City, New York, and the French National Assembly. No Amsterdam deployment known.",
      },
      confidence: "self-reported",
      source: "https://en.wikipedia.org/wiki/Decidim",
    },
    interop: {
      value: {
        nl: "Vrije software met publieke broncode; welke API's en exports relevant zijn voor een Amsterdamse context is nog te bepalen.",
        en: "Free software with public source code; which APIs and exports matter for an Amsterdam context is still to be determined.",
      },
      confidence: "self-reported",
      source: "https://decidim.org/",
    },
    moderation: {
      value: {
        nl: "Moderatie- en verantwoordingsmechanismen zitten in het model; hoe zwaar ze in de praktijk wegen is per uitrol verschillend.",
        en: "Moderation and accountability mechanisms are part of the model; how heavy they are in practice differs per deployment.",
      },
      confidence: "to-validate",
    },
    cityRelation: {
      value: {
        nl: "Geen relatie met de gemeente Amsterdam. Opgenomen als vergelijkingsmateriaal, niet als kandidaat om zonder meer uit te rollen.",
        en: "No relationship with the City of Amsterdam. Included as a comparison, not as a candidate to deploy wholesale.",
      },
      confidence: "documented",
    },
    doesWell: {
      nl: "Het maakt governance een productkenmerk in plaats van een bijlage — het beste beschikbare voorbeeld van hoe je zeggenschap en traceerbaarheid opschrijft.",
      en: "It makes governance a product feature rather than an annex — the best available example of how to write down control and traceability.",
    },
    openQuestions: [
      {
        nl: "Welke van zijn principes zijn overdraagbaar zonder de software over te nemen?",
        en: "Which of its principles are transferable without adopting the software?",
      },
      {
        nl: "Wat kost onderhoud en gemeenschapsbeheer in een Nederlandse context realistisch?",
        en: "What do maintenance and community stewardship realistically cost in a Dutch context?",
      },
    ],
  },
  {
    slug: "wij-amsterdam",
    name: "Wij Amsterdam",
    url: "https://wijamsterdam.nl/",
    tagline: {
      nl: "Het stedelijke platform van de gemeente voor initiatiefnemers",
      en: "The City's citywide platform for initiative-takers",
    },
    geography: ["citywide"],
    models: ["city-provided"],
    functions: ["news", "projects", "directory", "knowledge"],
    coverageMode: "citywide",
    districts: [],
    launched: {
      year: "2020",
      value: {
        nl: "In april 2020 gepubliceerd door de gemeente, aanvankelijk om hulpinitiatieven tijdens de coronacrisis te verbinden, en daarna verbreed naar initiatiefnemers in het algemeen.",
        en: "Published by the City in April 2020, initially to connect mutual-aid initiatives during the coronavirus crisis, and later broadened to initiative-takers in general.",
      },
      confidence: "self-reported",
      source: "https://www.spe-amsterdam.nl/platform-wij-amsterdam/",
    },
    usageEstimate: {
      feasibility: "formal-request",
      value: {
        nl: "Tel de gepubliceerde initiatieven, verhalen en organisaties met hun plaatsingsdatum — dat geeft de redactionele cadans en laat zien of het platform nog gevuld wordt. Bezoekcijfers, kosten en doelstelling liggen bij de gemeente en zijn opvraagbaar, desnoods via een Woo-verzoek: dit is een publiek gefinancierde voorziening.",
        en: "Count the published initiatives, stories, and organisations with their posting dates — that gives the editorial cadence and shows whether the platform is still being filled. Visitor figures, cost, and objective sit with the City and are requestable, via a freedom-of-information request if needed: this is a publicly funded facility.",
      },
    },
    probe: {
      runsOn: {
        nl: "Dezelfde Gebiedonline-installatie als Hallo IJburg: identieke serverkenmerken en dezelfde /networks/<naam>/-opbouw van stylesheets.",
        en: "The same Gebiedonline installation as Hallo IJburg: identical server signatures and the same /networks/<name>/ stylesheet layout.",
      },
      openSource: "unknown",
      endpoints: [
        {
          path: "/rss",
          result: "empty",
          verified: "probed",
          note: {
            nl: "Bestaat, maar heet \u201cHallo IJburg kalender\u201d, verwijst naar halloijburg.nl/rss en bevat nul items. Het gedeelde eindpunt is niet per platform ingericht.",
            en: "Exists, but is titled \u201cHallo IJburg kalender\u201d, points at halloijburg.nl/rss, and contains zero items. The shared endpoint is not set up per platform.",
          },
        },
        {
          path: "/api",
          result: "absent",
          verified: "probed",
          note: {
            nl: "Geen API op een publiek gefinancierd platform.",
            en: "No API on a publicly funded platform.",
          },
        },
        {
          path: "/sitemap.xml",
          result: "absent",
          verified: "probed",
          note: { nl: "Geen sitemap.", en: "No sitemap." },
        },
      ],
    },
    audience: {
      value: {
        nl: "Amsterdamse initiatiefnemers en actieve bewoners.",
        en: "Amsterdam initiative-takers and active residents.",
      },
      confidence: "documented",
      source: "https://wijamsterdam.nl/",
    },
    purpose: {
      value: {
        nl: "Initiatieven zichtbaar maken en verbinden, met nieuws, projecten, verhalen, organisaties en verwijzingen naar erkende buurtplatformen.",
        en: "Making initiatives visible and connected, with news, projects, stories, organisations, and links to recognised neighbourhood platforms.",
      },
      confidence: "documented",
      source: "https://wijamsterdam.nl/",
    },
    governance: {
      value: {
        nl: "Aangeboden door de gemeente Amsterdam. Redactionele zeggenschap en de criteria voor 'erkend' buurtplatform zijn niet publiek uitgeschreven.",
        en: "Provided by the City of Amsterdam. Editorial control and the criteria for a 'recognised' neighbourhood platform are not publicly written out.",
      },
      confidence: "self-reported",
    },
    funding: {
      value: {
        nl: "Publiek gefinancierd als gemeentelijke voorziening. Jaarlijkse kosten niet publiek gevonden.",
        en: "Publicly funded as a municipal service. Annual cost not publicly found.",
      },
      confidence: "self-reported",
    },
    activity: {
      value: {
        nl: "Nieuws, projecten en organisaties worden getoond; publieke cijfers over bezoek of actieve initiatiefnemers ontbreken.",
        en: "News, projects, and organisations are shown; public figures on visits or active initiative-takers are absent.",
      },
      confidence: "to-validate",
    },
    interop: {
      value: {
        nl: "Geen API, geen sitemap, en een RSS-eindpunt dat nul items teruggeeft onder de titel van een andere buurtsite. Op een publiek gefinancierd platform is dit de logische eerste plek om portabiliteit te eisen — en het goedkoopste om te repareren.",
        en: "No API, no sitemap, and an RSS endpoint returning zero items under another neighbourhood site's title. On a publicly funded platform this is the logical first place to require portability — and the cheapest thing to fix.",
      },
      confidence: "documented",
    },
    moderation: {
      value: {
        nl: "Vermoedelijk redactioneel beheerd door of namens de gemeente. Te bevestigen.",
        en: "Presumably editorially managed by or on behalf of the City. To be confirmed.",
      },
      confidence: "to-validate",
    },
    cityRelation: {
      value: {
        nl: "Dit ís de gemeente — en het draait op de software van de bewonerscoöperatie. Een derde partij schreef in 2020 dat het op OpenStad gebouwd was; de techniek van vandaag wijst onmiskenbaar naar Gebiedonline. Welke van de twee klopt, is de eerste vraag aan de gemeente.",
        en: "This is the City — and it runs on the resident cooperative's software. A third party wrote in 2020 that it was built on OpenStad; today's technical signature points unmistakably at Gebiedonline. Which of the two holds is the first question to put to the City.",
      },
      confidence: "self-reported",
      source: "https://www.spe-amsterdam.nl/platform-wij-amsterdam/",
    },
    doesWell: {
      nl: "Het verwijst naar bestaande buurtplatformen in plaats van ze te vervangen — precies het gedrag dat deze atlas wil versterken.",
      en: "It points to existing neighbourhood platforms instead of replacing them — exactly the behaviour this atlas wants to reinforce.",
    },
    openQuestions: [
      {
        nl: "Welke buurtplatformen zijn 'erkend', en op welke criteria?",
        en: "Which neighbourhood platforms are 'recognised', and on what criteria?",
      },
      {
        nl: "Wat kost het platform per jaar, en wat is de doelstelling waarop het wordt afgerekend?",
        en: "What does the platform cost per year, and against what objective is it measured?",
      },
      {
        nl: "Kan het een verwijslaag worden in plaats van een bestemming?",
        en: "Could it become a referral layer rather than a destination?",
      },
      {
        nl: "Draait het op Gebiedonline of op OpenStad — en als het Gebiedonline is, wat betaalt de stad de coöperatie daarvoor?",
        en: "Does it run on Gebiedonline or on OpenStad — and if it is Gebiedonline, what does the City pay the cooperative for it?",
      },
    ],
  },
  {
    slug: "gebiedonline",
    name: "Gebiedonline",
    url: "https://gebiedonline.nl/",
    tagline: {
      nl: "Een coöperatie die buurtplatformen levert en waarvan de buurten lid zijn",
      en: "A cooperative that supplies neighbourhood platforms and is owned by them",
    },
    geography: ["neighbourhood", "thematic", "beyond"],
    models: ["cooperative", "community-owned"],
    functions: ["news", "events", "mutualaid", "projects", "directory", "discussion"],
    coverageMode: "provider",
    districts: ["Oost", "Noord"],
    launched: {
      year: "2016",
      value: {
        nl: "De coöperatie is in 2016 opgericht door vijf bewonersnetwerken — IJburg, de Indische Buurt en Buiksloterham in Amsterdam, plus Amersfoort en Gouda — op basis van de software die voor Hallo IJburg was gebouwd.",
        en: "The cooperative was founded in 2016 by five resident networks — IJburg, the Indische Buurt, and Buiksloterham in Amsterdam, plus Amersfoort and Gouda — on the basis of the software built for Hallo IJburg.",
      },
      confidence: "documented",
      source: "https://gebiedonline.nl/we_zijn_een_cooperatie",
    },
    usageEstimate: {
      feasibility: "ask-operator",
      value: {
        nl: "De coöperatie noemt zelf 70 communities en 60.000+ geregistreerden; vraag om een uitsplitsing per platform en om maandelijks actieve gebruikers. Lukt dat niet, pas dan de telmethode van Hallo IJburg toe op de publiek vindbare ledensites — als lid beslis je hier zelf mee over wat er gedeeld wordt, dus de vraag is legitiem te stellen.",
        en: "The cooperative reports 70 communities and 60,000+ registrations; ask for a breakdown per platform and for monthly active users. If that is not possible, apply the Hallo IJburg counting method to the publicly findable member sites — members co-decide here on what is shared, so the question is a legitimate one to put.",
      },
    },
    probe: {
      runsOn: {
        nl: "De eigen software, als \u00e9\u00e9n installatie met meerdere netwerken: halloijburg.nl, gebiedonline.nl en wijamsterdam.nl delen serverkenmerken, assets en eindpunten.",
        en: "Its own software, as one installation with multiple networks: halloijburg.nl, gebiedonline.nl, and wijamsterdam.nl share server signatures, assets, and endpoints.",
      },
      openSource: "unknown",
      endpoints: [
        {
          path: "/rss",
          result: "empty",
          verified: "probed",
          note: {
            nl: "Hetzelfde beeld als bij Wij Amsterdam: de titel is \u201cHallo IJburg kalender\u201d en er komen nul items uit.",
            en: "The same picture as Wij Amsterdam: the title is \u201cHallo IJburg kalender\u201d and zero items come out.",
          },
        },
        {
          path: "/api",
          result: "absent",
          verified: "probed",
          note: {
            nl: "Geen API, terwijl dit de aanbieder is waar meerdere buurten op draaien — hier zou \u00e9\u00e9n koppeling het meeste opleveren.",
            en: "No API, even though this is the provider several neighbourhoods run on — one connection here would yield the most.",
          },
        },
        {
          path: "/sitemap.xml",
          result: "absent",
          verified: "probed",
          note: { nl: "Geen sitemap.", en: "No sitemap." },
        },
      ],
    },
    audience: {
      value: {
        nl: "Buurt- en themaplatformen en hun deelnemers; de leden zijn de communities zelf.",
        en: "Neighbourhood and thematic platforms and their participants; the members are the communities themselves.",
      },
      confidence: "self-reported",
      source: "https://gebiedonline.nl/",
    },
    purpose: {
      value: {
        nl: "Gedeelde community-software leveren zonder centraal eigenaarschap, zodat een buurt niet zelf hoeft te bouwen.",
        en: "Supplying shared community software without central ownership, so a neighbourhood does not have to build its own.",
      },
      confidence: "self-reported",
      source: "https://gebiedonline.nl/",
    },
    governance: {
      value: {
        nl: "Naar eigen zeggen beslissen leden mee over functies, tarieven, organisatie, opgeslagen data en het ontwikkelbudget. Dat is het scherpst uitgeschreven zeggenschapsmodel in deze atlas.",
        en: "By its own account, members co-decide on features, fees, organisation, stored data, and the development budget. That is the most sharply written model of control in this atlas.",
      },
      confidence: "self-reported",
      source: "https://gebiedonline.nl/",
    },
    funding: {
      value: {
        nl: "Ledenbijdragen, met tarieven waar de leden zelf over besluiten. Verhouding tot gemeentelijke subsidies onbekend.",
        en: "Member fees, with rates the members decide on themselves. Relationship to municipal subsidy unknown.",
      },
      confidence: "self-reported",
      source: "https://gebiedonline.nl/",
    },
    activity: {
      value: {
        nl: "Eigen opgave: 70 communities en 60.000+ geregistreerde mensen. Niet onafhankelijk geverifieerd, en niet uitgesplitst naar Amsterdam.",
        en: "Self-reported: 70 communities and 60,000+ registered people. Not independently verified, and not broken down for Amsterdam.",
      },
      confidence: "self-reported",
      source: "https://gebiedonline.nl/",
    },
    interop: {
      value: {
        nl: "API, export en licentie niet publiek vastgesteld. Als meerdere Amsterdamse buurten hierop draaien, is dit het hoogste-rendementspunt voor gedeelde agenda's of initiatievenlijsten.",
        en: "API, export, and licence not publicly established. If several Amsterdam neighbourhoods run on it, this is the highest-leverage point for shared calendars or initiative listings.",
      },
      confidence: "to-validate",
    },
    moderation: {
      value: {
        nl: "Per aangesloten community, binnen coöperatieve afspraken. Details te valideren.",
        en: "Per member community, within cooperative agreements. Details to validate.",
      },
      confidence: "to-validate",
    },
    cityRelation: {
      value: {
        nl: "Onbekend of en hoe de gemeente aangesloten platformen financiert of erkent.",
        en: "Unknown whether and how the City funds or recognises member platforms.",
      },
      confidence: "to-validate",
    },
    doesWell: {
      nl: "Het lost het probleem op dat elke buurt anders zou oplossen: gedeelde software, met eigenaarschap en zeggenschap expliciet bij de gebruikers.",
      en: "It solves the problem every neighbourhood would otherwise solve separately: shared software, with ownership and control explicitly held by the users.",
    },
    openQuestions: [
      {
        nl: "Welke Amsterdamse platformen draaien er vandaag op, naast de oprichtersnetwerken in IJburg, de Indische Buurt en Buiksloterham? Dit is de snelste manier om de kaart van de stad te vullen.",
        en: "Which Amsterdam platforms run on it today, besides the founding networks in IJburg, the Indische Buurt, and Buiksloterham? This is the fastest way to fill in the map of the city.",
      },
      {
        nl: "Is er export of een API waarmee events en initiatieven gedeeld kunnen worden?",
        en: "Is there an export or API through which events and initiatives could be shared?",
      },
      {
        nl: "Hoe verhoudt de coöperatie zich tot gemeentelijke financiering zonder haar onafhankelijkheid te verliezen?",
        en: "How does the cooperative relate to municipal funding without losing its independence?",
      },
    ],
  },
];

export function getPlatform(slug: string): Platform | undefined {
  return PLATFORMS.find((p) => p.slug === slug);
}

/** How a platform lands on the district grid — never a guessed pin. */
export function coverageFor(platform: Platform, district: District): CoverageCell {
  switch (platform.coverageMode) {
    case "place":
      return platform.districts.includes(district) ? "documented" : "na";
    case "citywide":
      return "claimed";
    case "provider":
      return platform.districts.includes(district) ? "documented" : "to-validate";
    case "thematic":
    case "nonlocal":
      return "na";
  }
}

/** Counts used by the home page and the patterns page — derived, never hand-typed. */
export function atlasStats() {
  const total = PLATFORMS.length;
  const notes = PLATFORMS.flatMap((p) => [
    p.audience,
    p.purpose,
    p.governance,
    p.funding,
    p.activity,
    p.interop,
    p.moderation,
    p.cityRelation,
  ]);
  const openFields = notes.filter((n) => n.confidence === "to-validate").length;
  const districtsWithDocumented = DISTRICTS.filter((d) =>
    PLATFORMS.some((p) => coverageFor(p, d) === "documented"),
  );
  const interopKnown = PLATFORMS.filter((p) => p.interop.confidence !== "to-validate").length;
  const withStartYear = PLATFORMS.filter((p) => p.launched.year !== null).length;
  return {
    total,
    fields: notes.length,
    openFields,
    districtsCovered: districtsWithDocumented.length,
    districtsTotal: DISTRICTS.length,
    interopKnown,
    withStartYear,
    shortlisted: SHORTLIST.length,
  };
}

/**
 * The queue: platforms that plausibly belong in this atlas but do not have a
 * profile yet. Listed rather than silently omitted — a shortlist you can argue
 * with beats an inventory that pretends to be complete. Start years are as
 * documented; where a start year could not be established it is left open.
 */
export type Candidate = {
  name: string;
  url: string | null;
  launchedYear: string | null;
  launchedConfidence: Confidence;
  what: Bi;
  why: Bi;
  usage: Bi;
  source?: string;
};

export const SHORTLIST: Candidate[] = [
  {
    name: "Nextdoor",
    url: "https://nextdoor.nl/",
    launchedYear: "2016",
    launchedConfidence: "documented",
    source: "https://blog.nextdoor.nl/2016/02/16/buurtapp-nextdoor-lanceert-in-nederland",
    what: {
      nl: "Commercieel buurtnetwerk uit Silicon Valley, op 16 februari 2016 in Nederland gelanceerd — het eerste land buiten de VS.",
      en: "Commercial neighbourhood network from Silicon Valley, launched in the Netherlands on 16 February 2016 — its first country outside the US.",
    },
    why: {
      nl: "Waarschijnlijk het grootste feitelijke bereik in Amsterdamse buurten, zonder publieke verantwoording, zonder dataportabiliteit en zonder lokale zeggenschap. Het is de nulmeting waartegen elk publiek alternatief zich moet verhouden.",
      en: "Probably the largest actual reach in Amsterdam neighbourhoods, with no public accountability, no data portability, and no local control. It is the baseline any public alternative has to measure itself against.",
    },
    usage: {
      nl: "Geen openbare telling mogelijk: inhoud zit achter een adresverificatie. App-storebeoordelingen per land en de eigen persclaims zijn de enige losse indicatoren; een gemeentelijke steekproef onder bewoners meet dit betrouwbaarder dan het platform zelf.",
      en: "No public count is possible: content sits behind address verification. Per-country app-store review counts and its own press claims are the only loose indicators; a resident survey by the City measures this more reliably than the platform does.",
    },
  },
  {
    name: "Hoplr",
    url: "https://www.hoplr.com/",
    launchedYear: "2014",
    launchedConfidence: "self-reported",
    source: "https://blog.hoplr.com/nl/functionaliteiten-buurtcommunicatie/",
    what: {
      nl: "Buurtnetwerk uit Gent, opgericht in 2014, dat naar eigen opgave met meer dan honderd lokale overheden in België en Nederland werkt.",
      en: "Neighbourhood network from Ghent, founded in 2014, which by its own account works with more than a hundred local authorities in Belgium and the Netherlands.",
    },
    why: {
      nl: "Het model waarin een gemeente buurtinfrastructuur inkoopt als dienst. Precies de keuze waar Amsterdam voor staat — en het is nuttig te weten of Amsterdamse stadsdelen hier al mee werken.",
      en: "The model where a municipality buys neighbourhood infrastructure as a service. Exactly the choice Amsterdam faces — and it is useful to know whether Amsterdam districts already work with it.",
    },
    usage: {
      nl: "Contracten met gemeenten zijn openbaar of opvraagbaar; vraag per contract het aantal geactiveerde buurten en huishoudens op. Dat is een harder getal dan de landelijke totalen die het bedrijf publiceert.",
      en: "Contracts with municipalities are public or requestable; ask per contract for the number of activated neighbourhoods and households. That is a harder number than the national totals the company publishes.",
    },
  },
  {
    name: "Mijnbuurtje.nl",
    url: "https://mijnbuurtje.nl/",
    launchedYear: "2013",
    launchedConfidence: "documented",
    source: "https://nl.wikipedia.org/wiki/Mijnbuurtje.nl",
    what: {
      nl: "In 2013 gelanceerd door Eric Hendriks en Hanneke van Stokkom, in 2015 ondergebracht in een bv en gepositioneerd als sociale onderneming uit Nijmegen; draait platformen voor tientallen gemeenten onder eigen buurtnamen.",
      en: "Launched in 2013 by Eric Hendriks and Hanneke van Stokkom, incorporated as a private company in 2015 and positioned as a Nijmegen social enterprise; runs platforms for dozens of municipalities under their own local names.",
    },
    why: {
      nl: "De andere Nederlandse niet-commerciële aanbieder naast Gebiedonline, met een uitdrukkelijke rol voor lokale 'buurtverbinders'. Vergelijking van die twee modellen zegt meer over wat werkt dan een lijst functies.",
      en: "The other Dutch non-commercial provider alongside Gebiedonline, with an explicit role for local 'neighbourhood connectors'. Comparing those two models says more about what works than a feature list.",
    },
    usage: {
      nl: "De ledensites zijn publiek: pas dezelfde cadanstelling toe als bij Hallo IJburg, per aangesloten buurt.",
      en: "Its member sites are public: apply the same cadence count as for Hallo IJburg, per member neighbourhood.",
    },
  },
  {
    name: "Pleio",
    url: "https://pleio.nl/",
    launchedYear: "2010",
    launchedConfidence: "documented",
    source: "https://interoperable-europe.ec.europa.eu/collection/interoperability-architecture-solutions/solution/pleio-collaboration-software-public-sector",
    what: {
      nl: "Open-source samenwerkingsplatform van en voor de Nederlandse overheid, opgericht in 2010 en sinds januari 2011 open voor gebruikers; gebouwd op Elgg en gegroeid naar honderden organisaties.",
      en: "Open-source collaboration platform by and for the Dutch government, founded in 2010 and open to users since January 2011; built on Elgg and grown to hundreds of organisations.",
    },
    why: {
      nl: "Het bestaande Nederlandse precedent voor publiek gefinancierde, gedeelde, open-source infrastructuur — inclusief vijftien jaar aan lessen over beheer en financiering die niemand opnieuw hoeft te leren.",
      en: "The existing Dutch precedent for publicly funded, shared, open-source infrastructure — including fifteen years of lessons about governance and funding that nobody needs to relearn.",
    },
    usage: {
      nl: "Beheerorganisatie publiceert jaarcijfers en is een overheidsorganisatie: gewoon vragen. Vraag vooral naar de verhouding tussen geregistreerde en maandelijks actieve accounts.",
      en: "The managing organisation publishes annual figures and is a public body: simply ask. Ask especially for the ratio of registered to monthly active accounts.",
    },
  },
  {
    name: "openresearch.amsterdam",
    url: "https://openresearch.amsterdam/",
    launchedYear: null,
    launchedConfidence: "to-validate",
    source: "https://openresearch.amsterdam/en/page/121759/what-is-openresearch.amsterdam",
    what: {
      nl: "Kennisplatform over onderzoek en innovatie in Amsterdam en de metropoolregio, beheerd door het Chief Science Office van de gemeente, gevuld door gemeente, universiteiten en hogescholen. Lanceerjaar te bevestigen — vermoedelijk rond 2020.",
      en: "Knowledge platform on research and innovation in Amsterdam and the metropolitan region, managed by the City's Chief Science Office and filled by the City, universities, and colleges. Launch year to be confirmed — probably around 2020.",
    },
    why: {
      nl: "De gemeente draait dus al een civic-kennislaag, naast Wij Amsterdam. Twee gemeentelijke platformen die elkaar niet kennen is precies het patroon dat deze atlas moet blootleggen.",
      en: "So the City already runs a civic-knowledge layer, alongside Wij Amsterdam. Two municipal platforms that do not know about each other is exactly the pattern this atlas should expose.",
    },
    usage: {
      nl: "Er is een sitemapindex, dus de omvang is te tellen; /api antwoordt met HTTP 400 in plaats van 404, dus er luistert iets zonder publieke documentatie. De hoofdredacteur is de Chief Science Officer van de gemeente — gewoon vragen ligt voor de hand.",
      en: "There is a sitemap index, so the size is countable; /api answers HTTP 400 rather than 404, so something is listening without public documentation. The editor-in-chief is the City's Chief Science Officer — simply asking is the obvious route.",
    },
  },
  {
    name: "Amsterdam Smart City",
    url: "https://amsterdamsmartcity.com/",
    launchedYear: "2009",
    launchedConfidence: "self-reported",
    source: "https://amsterdamsmartcity.com/updates/news/10-years-of-innovation-urban-development-collabo",
    what: {
      nl: "Samenwerkingsplatform voor de metropoolregio, in 2009 gestart door Amsterdam Innovation Motor en netbeheerder Alliander, met naar eigen opgave meer dan honderd partners.",
      en: "Collaboration platform for the metropolitan region, started in 2009 by Amsterdam Innovation Motor and grid operator Alliander, with more than a hundred partners by its own account.",
    },
    why: {
      nl: "Zeventien jaar ervaring met precies de rol die Uitwijken zichzelf toedicht: verbinden zonder eigenaar te zijn. Waarom dat daar wel of niet werkte is bruikbaarder dan welk feature-overzicht ook.",
      en: "Seventeen years of experience with exactly the role Uitwijken claims for itself: convening without owning. Why that did or did not work there is more useful than any feature overview.",
    },
    usage: {
      nl: "Publieke updates, projecten en partnerlijst zijn met datum te tellen; de organisatie zelf kan zeggen hoeveel partners daadwerkelijk bijdragen.",
      en: "Public updates, projects, and the partner list are dated and countable; the organisation itself can say how many partners actually contribute.",
    },
  },
  {
    name: "Consul Democracy",
    url: "https://consuldemocracy.org/",
    launchedYear: "2015",
    launchedConfidence: "documented",
    source: "https://consuldemocracy.org/about-us/",
    what: {
      nl: "Open-source participatiesoftware, in 2015 ontwikkeld door de gemeente Madrid voor decide.madrid.es en later ondergebracht in een stichting.",
      en: "Open-source participation software, developed in 2015 by the City of Madrid for decide.madrid.es and later placed in a foundation.",
    },
    why: {
      nl: "De tweede grote referentie naast Decidim, met een ander governance-verhaal: van gemeentelijk project naar stichting. Relevant voor de vraag wat er met OpenStad zou moeten gebeuren.",
      en: "The second major reference alongside Decidim, with a different governance story: from municipal project to foundation. Relevant to the question of what should happen with OpenStad.",
    },
    usage: {
      nl: "Instanties publiceren doorgaans stemaantallen per traject; gebruik het als ijkpunt voor opkomst, niet als Amsterdamse maat.",
      en: "Instances usually publish vote counts per process; use it as a turnout benchmark, not as an Amsterdam measure.",
    },
  },
  {
    name: "Go Vocal (voorheen CitizenLab)",
    url: "https://www.govocal.com/",
    launchedYear: "2015",
    launchedConfidence: "self-reported",
    source: "https://www.govocal.com/news/citizenlab-rebrands-to-go-vocal",
    what: {
      nl: "Commercieel participatieplatform, in 2015 in Brussel opgericht als CitizenLab en inmiddels hernoemd naar Go Vocal; verkocht aan lokale overheden.",
      en: "Commercial participation platform, founded in Brussels in 2015 as CitizenLab and since renamed Go Vocal; sold to local governments.",
    },
    why: {
      nl: "Dit is wat gemeenten in de praktijk aanbesteden als er geen open alternatief klaarligt. Het hoort in de vergelijking, al was het maar om te zien wat een open optie zou moeten evenaren.",
      en: "This is what municipalities actually procure when no open alternative is ready. It belongs in the comparison, if only to see what an open option would have to match.",
    },
    usage: {
      nl: "Aanbestedings- en contractdocumenten van gemeenten zijn opvraagbaar en bevatten meestal bereik- en kostenafspraken.",
      en: "Municipal tender and contract documents are requestable and usually contain reach and cost commitments.",
    },
  },
  {
    name: "BUURbook",
    url: null,
    launchedYear: "2013",
    launchedConfidence: "self-reported",
    source: "https://lpb.nl/9-digitale-buurtplatforms-vergeleken/",
    what: {
      nl: "Commercieel buurtplatform uit 2013, in een landelijke vergelijking van 2018 actief in dertien buurten. Huidige status onbekend.",
      en: "Commercial neighbourhood platform from 2013, active in thirteen neighbourhoods in a national 2018 comparison. Current status unknown.",
    },
    why: {
      nl: "Een platform dat mogelijk niet meer bestaat is even leerzaam als een dat groeit: wat er gebeurt met de inhoud en de community als een aanbieder stopt, is een governance-vraag, geen technische.",
      en: "A platform that may no longer exist is as instructive as one that is growing: what happens to the content and the community when a supplier stops is a governance question, not a technical one.",
    },
    usage: {
      nl: "Eerst bestaan vaststellen via de Wayback Machine en het Handelsregister; pas daarna tellen.",
      en: "First establish whether it still exists, via the Wayback Machine and the business register; only then count.",
    },
  },
  {
    name: "KopjeSuiker",
    url: null,
    launchedYear: "2012",
    launchedConfidence: "self-reported",
    source: "https://lpb.nl/9-digitale-buurtplatforms-vergeleken/",
    what: {
      nl: "Bewonersinitiatief uit 2012, live sinds 2014, gericht op onderlinge hulp en gezelligheid in de buurt. Huidige status onbekend.",
      en: "Resident initiative from 2012, live since 2014, aimed at mutual help and conviviality in the neighbourhood. Current status unknown.",
    },
    why: {
      nl: "Het bewonersinitiatief zonder gemeente en zonder bedrijf erachter — het model dat het vaakst stilvalt en waarvan het zelden wordt opgeschreven waarom.",
      en: "The resident initiative with no municipality and no company behind it — the model that most often goes quiet, and where why it did is rarely written down.",
    },
    usage: {
      nl: "Zelfde methode: Wayback-snapshots vergelijken op berichtcadans tussen 2015 en nu.",
      en: "Same method: compare Wayback snapshots on post cadence between 2015 and now.",
    },
  },
  {
    name: "WijkConnect, Buurtlink, MijnBuurtWelzijn, Buurtapp",
    url: null,
    launchedYear: null,
    launchedConfidence: "to-validate",
    source: "https://lpb.nl/9-digitale-buurtplatforms-vergeleken/",
    what: {
      nl: "Vier Nederlandse buurtplatformen uit een landelijke vergelijking van negen platformen in 2018, met startjaren tussen 2014 en 2015 waar vermeld. Of ze in 2026 nog draaien is niet gecontroleerd.",
      en: "Four Dutch neighbourhood platforms from a national 2018 comparison of nine, with start years between 2014 and 2015 where stated. Whether they still run in 2026 has not been checked.",
    },
    why: {
      nl: "Samen laten ze de werkelijke omvang van het veld zien: dit is geen leeg landschap waar iets nieuws in past, maar een druk landschap waarvan de helft mogelijk al is ingeslapen.",
      en: "Together they show the real size of the field: this is not an empty landscape for something new to fill, but a crowded one where half may already have gone quiet.",
    },
    usage: {
      nl: "Eén middag werk: per platform vaststellen of het nog online is, en zo ja de cadanstelling toepassen. Dat alleen al maakt de kaart bruikbaarder dan hij nu is.",
      en: "One afternoon of work: per platform establish whether it is still online, and if so apply the cadence count. That alone makes the map more useful than it is now.",
    },
  },
];
