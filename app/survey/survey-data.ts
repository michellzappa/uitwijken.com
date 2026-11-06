/**
 * The operator survey: one question set, one prefilled record per platform.
 *
 * Questions are bilingual. Answers are Dutch only, because a Dutch operator
 * corrects them. Every prefilled answer carries a basis, so nobody can read an
 * assumption as a fact. "source" means it comes from the atlas or a public
 * document. "assumption" means we guessed, and the guess is there to be corrected.
 *
 * Nothing here has been shown to an operator yet.
 */

import type { Bi } from "../atlas/platforms";

export type SurveySection = "facts" | "pain" | "appetite";

export const SECTIONS: { key: SurveySection; title: Bi; intro: Bi }[] = [
  {
    key: "facts",
    title: { nl: "Hoe het draait", en: "How it runs" },
    intro: {
      nl: "De feiten die in de atlas komen, als u daarmee instemt.",
      en: "The facts that go in the atlas, if you agree.",
    },
  },
  {
    key: "pain",
    title: { nl: "Waar het wringt", en: "What is hard" },
    intro: {
      nl: "Standaard vertrouwelijk. Dit gaat alleen zonder naam in de gezamenlijke bevindingen.",
      en: "Confidential by default. This only goes in the combined findings, without your name.",
    },
  },
  {
    key: "appetite",
    title: { nl: "Wat u wel en niet wilt", en: "What you do and do not want" },
    intro: {
      nl: "Hier zoeken we de grenzen, voordat iemand iets voorstelt.",
      en: "This looks for the limits, before anyone proposes anything.",
    },
  },
];

type SliderScale = "euro" | "hours" | "count" | "scale";

const STOPS: Record<SliderScale, number[]> = {
  euro: [0, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000],
  hours: [0, 2, 5, 10, 20, 40, 80, 160, 400],
  count: [0, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000],
  scale: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

export type Share = "public" | "confidential";

type QuestionBase = {
  id: string;
  section: SurveySection;
  question: Bi;
  help?: Bi;
  defaultShare: Share;
};

export type Question =
  | (QuestionBase & { kind: "text" })
  | (QuestionBase & { kind: "choice"; options: string[] })
  | (QuestionBase & {
      kind: "slider";
      scale: SliderScale;
      /** Dutch labels for the two ends of the slider. */
      low?: string;
      high?: string;
    });

export const QUESTIONS: Question[] = [
  {
    id: "run_by",
    section: "facts",
    kind: "text",
    defaultShare: "public",
    question: { nl: "Wie beheert dit, en wie beslist?", en: "Who runs this, and who decides?" },
  },
  {
    id: "cost_year",
    section: "facts",
    kind: "slider",
    scale: "euro",
    defaultShare: "confidential",
    question: {
      nl: "Wat kost dit per jaar, alles bij elkaar?",
      en: "What does this cost per year, all in?",
    },
    help: {
      nl: "Software, hosting, leverancier en betaalde uren. Een orde van grootte is genoeg.",
      en: "Software, hosting, vendor, and paid hours. An order of magnitude is enough.",
    },
  },
  {
    id: "paid_by",
    section: "facts",
    kind: "text",
    defaultShare: "confidential",
    question: { nl: "Wie betaalt dat?", en: "Who pays for that?" },
  },
  {
    id: "hours_week",
    section: "facts",
    kind: "slider",
    scale: "hours",
    defaultShare: "confidential",
    question: {
      nl: "Hoeveel uur per week kost het beheer, betaald en onbetaald?",
      en: "How many hours per week does running it take, paid and unpaid?",
    },
  },
  {
    id: "active_month",
    section: "facts",
    kind: "slider",
    scale: "count",
    defaultShare: "public",
    question: {
      nl: "Hoeveel mensen zijn in een gewone maand actief?",
      en: "How many people are active in a typical month?",
    },
  },
  {
    id: "contributors_month",
    section: "facts",
    kind: "slider",
    scale: "count",
    defaultShare: "public",
    question: {
      nl: "Hoeveel van hen plaatsen zelf iets?",
      en: "How many of them post something themselves?",
    },
  },
  {
    id: "measure",
    section: "facts",
    kind: "choice",
    defaultShare: "public",
    options: ["Analytics", "Eigen telling", "Schatting", "Weten we niet"],
    question: { nl: "Hoe weet u dat?", en: "How do you know?" },
  },
  {
    id: "data_exit",
    section: "facts",
    kind: "text",
    defaultShare: "public",
    question: {
      nl: "Kan de data eruit, en van wie is die?",
      en: "Can the data leave, and who owns it?",
    },
  },
  {
    id: "hardest",
    section: "pain",
    kind: "text",
    defaultShare: "confidential",
    question: {
      nl: "Wat kost de meeste tijd of geld om dit draaiende te houden?",
      en: "What takes the most time or money to keep this going?",
    },
  },
  {
    id: "tried_failed",
    section: "pain",
    kind: "text",
    defaultShare: "confidential",
    question: { nl: "Wat heeft u geprobeerd dat niet werkte?", en: "What have you tried that did not work?" },
  },
  {
    id: "duplicate_entry",
    section: "pain",
    kind: "text",
    defaultShare: "confidential",
    question: {
      nl: "Wat voert u op meer dan één plek in?",
      en: "What do you enter in more than one place?",
    },
  },
  {
    id: "moderation_load",
    section: "pain",
    kind: "slider",
    scale: "scale",
    low: "Geen last",
    high: "Grote last",
    defaultShare: "confidential",
    question: { nl: "Hoe zwaar weegt moderatie?", en: "How heavy is moderation?" },
  },
  {
    id: "continuity",
    section: "pain",
    kind: "slider",
    scale: "scale",
    low: "Onwaarschijnlijk",
    high: "Zeker",
    defaultShare: "confidential",
    question: {
      nl: "Hoe zeker draait dit over drie jaar nog?",
      en: "How certain is it that this still runs in three years?",
    },
  },
  {
    id: "stop_tomorrow",
    section: "pain",
    kind: "text",
    defaultShare: "confidential",
    question: {
      nl: "Als dit morgen stopt: wie merkt het, en waar gaan zij heen?",
      en: "If this stopped tomorrow: who would notice, and where would they go?",
    },
  },
  {
    id: "city_role",
    section: "pain",
    kind: "text",
    defaultShare: "confidential",
    question: {
      nl: "Wat heeft u nodig van de gemeente, en waar moet zij zich niet mee bemoeien?",
      en: "What do you need from the City, and what should it stay out of?",
    },
  },
  {
    id: "share_willing",
    section: "appetite",
    kind: "slider",
    scale: "scale",
    low: "Liever niet",
    high: "Graag",
    defaultShare: "public",
    question: {
      nl: "Hoe graag deelt u agenda en oproepen met andere platformen?",
      en: "How keen are you to share calendar items and requests with other platforms?",
    },
  },
  {
    id: "refuse_if",
    section: "appetite",
    kind: "text",
    defaultShare: "confidential",
    question: { nl: "Wat zou voor u een reden zijn om te weigeren?", en: "What would make you refuse?" },
  },
  {
    id: "who_else",
    section: "appetite",
    kind: "text",
    defaultShare: "confidential",
    question: { nl: "Met wie moeten we nog meer praten?", en: "Who else should we talk to?" },
  },
];

export type AnswerValue = string | number;
export type Basis = "source" | "assumption";
export type Prefill = { value: AnswerValue; basis: Basis; source?: string };

export type SurveyRecord = {
  uuid: string;
  name: string;
  url: string;
  place: string;
  type: Bi;
  prefill: Record<string, Prefill>;
};

const a = (value: AnswerValue): Prefill => ({ value, basis: "assumption" });
const s = (value: AnswerValue, source: string): Prefill => ({ value, basis: "source", source });

export const SURVEY_RECORDS: SurveyRecord[] = [
  {
    uuid: "03468b21-e2ae-4dfa-8e28-90306145511e",
    name: "Gebiedonline",
    url: "https://gebiedonline.nl",
    place: "Landelijk, veel netwerken in Amsterdam en Utrecht",
    type: { nl: "Coöperatief netwerk", en: "Cooperative network" },
    prefill: {
      run_by: s(
        "Coöperatie Gebiedonline. Leden beslissen mee over functies, tarieven, data en het ontwikkelbudget.",
        "/atlas/gebiedonline",
      ),
      cost_year: a(100000),
      paid_by: s(
        "Ledenbijdragen, met tarieven die de leden zelf vaststellen. Of er ook gemeentelijke subsidie in zit, weten we niet.",
        "/atlas/gebiedonline",
      ),
      hours_week: a(40),
      active_month: a(5000),
      contributors_month: a(500),
      measure: a("Schatting"),
      data_exit: s(
        "De agenda komt per netwerk via /rss naar buiten, zonder datumveld. We vonden geen API of export. Wie eigenaar is van de data weten we niet.",
        "/atlas/interop",
      ),
      hardest: a("Doorontwikkeling betalen uit ledenbijdragen, en netwerken ondersteunen waar één vrijwilliger alles draagt."),
      tried_failed: a("Weten we niet. Dit is een open vraag."),
      duplicate_entry: a("Activiteiten die netwerken ook op Facebook, Instagram of in WhatsApp-groepen zetten."),
      moderation_load: a(3),
      continuity: a(7),
      stop_tomorrow: a("Beheerders en actieve bewoners merken het meteen. Veel van hen gaan terug naar WhatsApp en Facebook."),
      city_role: a("Structurele steun zonder inspraak in regels of moderatie. De gemeente moet netwerken niet zelf willen besturen."),
      share_willing: a(7),
      refuse_if: a("Als netwerken hun eigen naam, domein of zeggenschap over data verliezen."),
      who_else: a("De beheerders van de grootste netwerken, zoals Hallo IJburg en Oost voor Elkaar."),
    },
  },
  {
    uuid: "b2e7afcc-270a-4be8-8910-642e87545d0b",
    name: "OpenStad",
    url: "https://openstad.org",
    place: "Landelijk, oorsprong in Amsterdam",
    type: { nl: "Open source van gemeenten", en: "Municipal open source" },
    prefill: {
      run_by: s(
        "Een community van gemeenten, met Amsterdam als oorsprong. We vonden geen rechtspersoon of bestuur. Wie beslist over de koers is onze open vraag.",
        "/atlas/openstad",
      ),
      cost_year: a(250000),
      paid_by: s(
        "Gemeenten voor hun eigen trajecten, plus projectgeld via VNG en BZK. Het totaal per jaar kennen we niet.",
        "https://vng.nl/artikelen/openstad-voor-iedereen-digitale-participatie-die-werkt-voor-alle-gemeenten",
      ),
      hours_week: a(80),
      active_month: a(5000),
      contributors_month: a(1000),
      measure: a("Weten we niet"),
      data_exit: s(
        "De code is open onder MIT. Hoe data per traject naar buiten kan, weten we niet.",
        "https://github.com/openstad/openstad-headless",
      ),
      hardest: a("Doorontwikkeling blijven financieren als geen enkele organisatie zich hoofdeigenaar voelt."),
      tried_failed: a("Weten we niet. Dit is een open vraag."),
      duplicate_entry: a("Projectinformatie die ook op de gemeentelijke website en in brieven aan bewoners staat."),
      moderation_load: a(4),
      continuity: a(7),
      stop_tomorrow: a("Gemeenten met lopende trajecten merken het eerst. Zij stappen dan over op een leverancier of de eigen website."),
      city_role: a("Duidelijkheid over wie eigenaar is, en meerjarige financiering in plaats van projectgeld."),
      share_willing: a(8),
      refuse_if: a("Als gemeenten daardoor verplicht worden tot één leverancier of één werkwijze."),
      who_else: a("Implementatiepartners en de gemeenten die nu trajecten draaien."),
    },
  },
  {
    uuid: "5e18d480-d3ae-48ec-a9b9-126db7df2be9",
    name: "DenkMee Utrecht",
    url: "https://denkmee.utrecht.nl",
    place: "Utrecht",
    type: { nl: "Gemeentelijk platform op leverancierssoftware", en: "City platform on vendor software" },
    prefill: {
      run_by: s(
        "Gemeente Utrecht, op software van Go Vocal. De gemeente verkende in 2025 de markt voor wat hierna komt.",
        "https://denkmee.utrecht.nl",
      ),
      cost_year: a(50000),
      paid_by: a("Gemeente Utrecht, uit het budget voor participatie."),
      hours_week: a(40),
      active_month: a(1000),
      contributors_month: a(250),
      measure: a("Analytics"),
      data_exit: s(
        "/web_api/v1/projects geeft openbare JSON, zonder documentatie. Geen RSS. De voorwaarden voor hergebruik kennen we niet.",
        "https://denkmee.utrecht.nl/web_api/v1/projects",
      ),
      hardest: a("Elk project opnieuw genoeg en voldoende verschillende inwoners bereiken."),
      tried_failed: a("Weten we niet. Dit is een open vraag."),
      duplicate_entry: a("Projectinformatie op utrecht.nl, DenkMee en in wijkkanalen."),
      moderation_load: a(4),
      continuity: a(6),
      stop_tomorrow: a("Vooral projectleiders binnen de gemeente. Bewoners die één keer reageerden merken het waarschijnlijk niet."),
      city_role: a("Dit is de gemeente zelf. Wat de wijkplatforms van DenkMee nodig hebben is onze open vraag."),
      share_willing: a(6),
      refuse_if: a("Als het botst met het contract, de privacyregels of de lopende marktverkenning."),
      who_else: a("Het programma Samen Stad Maken en de wijkbureaus."),
    },
  },
  {
    uuid: "022dfd6f-be8f-4482-941c-b8399b5eaf26",
    name: "Oost voor Elkaar",
    url: "https://oostvoorelkaar.nl",
    place: "Utrecht, wijk Oost",
    type: { nl: "Wijkcoöperatie", en: "Neighbourhood cooperative" },
    prefill: {
      run_by: s(
        "Een wijkcoöperatie die de rol van wijkplatform vervult, met bijna 200 leden in 2024.",
        "https://utrecht.bestuurlijkeinformatie.nl/Document/View/f7f0da24-7edf-4947-b83f-3fb436248858",
      ),
      cost_year: a(5000),
      paid_by: a("Bijdrage aan de coöperatie plus een gemeentelijke bijdrage voor het wijkplatform."),
      hours_week: a(10),
      active_month: a(250),
      contributors_month: a(25),
      measure: a("Schatting"),
      data_exit: s(
        "De agenda komt via /rss naar buiten, op 5 november 2026 met 91 items, onder de titel Hallo IJburg kalender.",
        "https://oostvoorelkaar.nl/rss",
      ),
      hardest: a("Genoeg vrijwilligers vinden die de site en de agenda bijhouden."),
      tried_failed: a("Weten we niet. Dit is een open vraag."),
      duplicate_entry: a("Activiteiten die ook in de wijkkrant, op sociale media en bij de gemeente staan."),
      moderation_load: a(2),
      continuity: a(6),
      stop_tomorrow: a("Wijkbewoners die de agenda gebruiken. De activiteiten gaan door, maar zijn moeilijker te vinden."),
      city_role: a("Een vaste bijdrage en iemand die meedenkt, zonder te bepalen wat er op de site komt."),
      share_willing: a(8),
      refuse_if: a("Als het meer werk kost dan het oplevert, of als de wijk haar eigen plek verliest."),
      who_else: a("De andere Utrechtse wijkplatforms en de wijkbureaus."),
    },
  },
];

export function getSurveyRecord(uuid: string): SurveyRecord | undefined {
  return SURVEY_RECORDS.find((r) => r.uuid === uuid);
}

export function sliderStops(scale: SliderScale): number[] {
  return STOPS[scale];
}

/** The stop closest to a value, so an answer always lands on the slider. */
export function nearestStop(scale: SliderScale, value: number): number {
  const stops = STOPS[scale];
  let best = 0;
  stops.forEach((stop, i) => {
    if (Math.abs(stop - value) < Math.abs(stops[best] - value)) best = i;
  });
  return best;
}

export function formatAnswer(question: Question, value: AnswerValue): string {
  if (question.kind !== "slider") return String(value);
  const n = Number(value);
  const nl = n.toLocaleString("nl-NL");
  switch (question.scale) {
    case "euro":
      return `€ ${nl}`;
    case "hours":
      return `${nl} uur`;
    case "count":
      return `${nl} mensen`;
    case "scale":
      return `${nl} van 10`;
  }
}
