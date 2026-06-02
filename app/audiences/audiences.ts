import type { CivicRole } from "../components/CivicUI";

/** A single deep-link to a place where an audience "sees itself". */
export type AudienceLink = { href: string; nl: string; en: string };

/**
 * The three audiences, told from each role's own point of view. Names, icons and
 * colours come from ROLE_META (the shared vocabulary); this file adds the prose
 * — a one-line tagline for the nav dropdown, a perspective explainer, and the
 * concrete pages + research where that audience appears. `pages` point at the
 * wireframe mocks; `research` point at wiki docs (/docs/<slug>).
 */
export type Audience = {
  role: CivicRole;
  tagline: { nl: string; en: string };
  explainer: { nl: string; en: string };
  pages: AudienceLink[];
  research: AudienceLink[];
};

export const AUDIENCES: Audience[] = [
  {
    role: "resident",
    tagline: {
      nl: "Iemand die hier woont en wil meedoen",
      en: "Someone who lives here and wants to take part",
    },
    explainer: {
      nl: "Bewoners zijn het hart van het platform. Ze organiseren en bezoeken events, vragen en bieden hulp, praten mee in gesprekken en — cruciaal — beslissen mee over wat er in hun straat, buurt en stad gebeurt. Geverifieerd via DigiD maar vrij om onder een gekozen naam te verschijnen; stemrecht volgt verblijf, dus aantonen dat je ergens woont geeft je een stem over die plek.",
      en: "Residents are the heart of the platform. They organize and attend events, ask for and offer help, weigh in on conversations, and — crucially — help decide what happens in their street, neighborhood, and city. Verified through DigiD but free to appear under a chosen name; voting follows residence, so proving you live somewhere is what grants a say over that place.",
    },
    pages: [
      { href: "/asks", nl: "Vraag & aanbod — buren onder elkaar", en: "Asks & offers — neighbor to neighbor" },
      { href: "/vragen", nl: "Enquêtes & budget — meebeslissen over €300k", en: "Surveys & budget — deciding the €300k" },
      { href: "/themes", nl: "Thema's — affiniteiten taggen", en: "Themes — tagging affinities" },
      { href: "/map", nl: "Kaartlens — wat speelt er om mij heen", en: "Map lens — what's happening around me" },
      { href: "/governance", nl: "Rollen & governance — de bewonerskolom", en: "Roles & governance — the resident column" },
    ],
    research: [
      { href: "/docs/vision", nl: "Visie — bewoners beslissen", en: "Vision — residents decide" },
      { href: "/docs/governance", nl: "Governance — stemrecht volgt verblijf", en: "Governance — voting follows residence" },
      { href: "/docs/adoption", nl: "Adoptie — hoe bewoners binnenkomen", en: "Adoption — how residents arrive" },
    ],
  },
  {
    role: "government",
    tagline: {
      nl: "Gemeente en publieke instellingen",
      en: "The municipality and public institutions",
    },
    explainer: {
      nl: "De overheid doet mee zonder eigenaar te worden. De gemeente publiceert vergunningen, plannen en inspraak, luistert naar gestructureerd signaal in plaats van de hardste stem, en reageert in de openbaarheid. Geen aparte surveillance-blik op bewoners — de overheid ziet wat iedereen ziet. Open data wordt een productlaag: de civic inbox brengt officiële informatie naar de mensen die het raakt.",
      en: "Government participates without owning. The municipality publishes permits, plans, and consultations, listens to structured signal instead of the loudest voice, and responds in the open. No special surveillance view of residents — government sees what everyone sees. Open data becomes a product layer: the civic inbox brings official information to the people it affects.",
    },
    pages: [
      { href: "/inbox", nl: "Civic inbox — open data naar bewoners", en: "Civic inbox — open data to residents" },
      { href: "/map", nl: "Kaartlens — vergunningen en plannen op de kaart", en: "Map lens — permits and plans on the map" },
      { href: "/threads", nl: "Gesprekken — in het openbaar reageren", en: "Conversations — responding in the open" },
      { href: "/governance", nl: "Rollen & governance — de overheidskolom", en: "Roles & governance — the government column" },
    ],
    research: [
      { href: "/docs/governance", nl: "Governance — meedoen zonder bezit", en: "Governance — participating without owning" },
      { href: "/docs/open-data", nl: "Open data — officiële bronnen als laag", en: "Open data — official sources as a layer" },
      { href: "/docs/proof-of-concept", nl: "Proof of concept — de pitch aan Amsterdam", en: "Proof of concept — the pitch to Amsterdam" },
    ],
  },
  {
    role: "entrepreneur",
    tagline: {
      nl: "Lokale ondernemers en makers",
      en: "Local businesses and makers",
    },
    explainer: {
      nl: "Ondernemers dragen bij aan het buurtleven zonder het in reclame te veranderen. Een café dat zijn ruimte aanbiedt, een winkel die een reparatie-avond host, een maker die een workshop geeft — ze verschijnen als civic objecten, niet als advertenties. Ze kunnen aanbieden, events organiseren en meepraten, op gelijke voet met bewoners en overheid, begrensd door de regel dat het platform nooit een marktplaats wordt.",
      en: "Entrepreneurs contribute to neighborhood life without turning it into advertising. A café offering its space, a shop hosting a repair night, a maker running a workshop — they appear as civic objects, not ads. They can offer, host events, and join conversations, on equal footing with residents and government, bounded by the rule that the platform never becomes a marketplace.",
    },
    pages: [
      { href: "/asks", nl: "Vraag & aanbod — iets aanbieden aan de buurt", en: "Asks & offers — offering something to the neighborhood" },
      { href: "/themes", nl: "Thema's — zichtbaar bij het juiste onderwerp", en: "Themes — visible under the right topic" },
      { href: "/map", nl: "Kaartlens — verankerd op een plek", en: "Map lens — anchored to a place" },
      { href: "/governance", nl: "Rollen & governance — de ondernemerskolom", en: "Roles & governance — the entrepreneur column" },
    ],
    research: [
      { href: "/docs/funding", nl: "Funding — de rol van ondernemers", en: "Funding — the role of entrepreneurs" },
      { href: "/docs/open-data", nl: "Open data — coördinatie en diensten", en: "Open data — coordination and services" },
      { href: "/docs/building-blocks", nl: "Bouwblokken — aanbod als civic object", en: "Building blocks — an offer as a civic object" },
    ],
  },
];
