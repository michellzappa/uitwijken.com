import Link from "next/link";
import { TopBar, PageHeader } from "./components/Nav";
import { T } from "./lib/i18n";

type Group = "block" | "lens" | "foundation";

type Mock = {
  slug: string;
  number: string;
  group: Group;
  title: { nl: string; en: string };
  lens: { nl: string; en: string };
  summary: { nl: string; en: string };
  proves: { nl: string; en: string };
};

const mocks: Mock[] = [
  // — Building blocks: the small, closed set of things a person can make —
  {
    slug: "events",
    number: "01",
    group: "block",
    title: { nl: "Events & actie", en: "Events & action" },
    lens: { nl: "Van micro tot Koningsdag", en: "From micro to King's Day" },
    summary: {
      nl: "Een samenkomst, van een D&D-avond tot een buurtmaaltijd tot een straatfeest. De makkelijkste eerste reden om terug te komen, gekoppeld aan thema's, plekken en mensen.",
      en: "A gathering, from a D&D night to a neighborhood meal to a block party. The easiest first reason to return, tied to themes, places, and people.",
    },
    proves: {
      nl: "Adoptiehaak · fysieke community · van digitaal naar fysiek",
      en: "Adoption hook · physical community · digital to physical",
    },
  },
  {
    slug: "threads",
    number: "02",
    group: "block",
    title: { nl: "Gesprekken", en: "Conversations" },
    lens: { nl: "Een draad aan elk object", en: "A thread on any object" },
    summary: {
      nl: "Thread-georiënteerd zoals Mastodon, maar nooit los: een gesprek hangt altijd aan een event, een vraag, een enquête of een plek. Strikt openbaar — geen DM's.",
      en: "Thread-oriented like Mastodon, but never loose: a conversation always attaches to an event, an ask, a survey, or a place. Strictly public — no DMs.",
    },
    proves: {
      nl: "Web 2.0-playbook · contextueel · openbaar · moderatievriendelijk",
      en: "Web 2.0 playbook · contextual · public · moderation-friendly",
    },
  },
  {
    slug: "asks",
    number: "03",
    group: "block",
    title: { nl: "Vraag & aanbod", en: "Asks & offers" },
    lens: { nl: "Het individu doet mee", en: "The individual takes part" },
    summary: {
      nl: "Iets vragen, iets aanbieden, of samen iets doen — boodschappen voor een buur, hulp bij een klus, wie speelt er mee? Wederkerigheid tussen buren, geen marktplaats.",
      en: "Ask for something, offer something, or do something together — groceries for a neighbor, help with a task, who's in? Reciprocity between neighbors, not a marketplace.",
    },
    proves: {
      nl: "Bijdragen aan de buurt · kleine schaal · individu in gemeenschap",
      en: "Contributing to the neighborhood · small scale · individual in community",
    },
  },
  {
    slug: "vragen",
    number: "04",
    group: "block",
    title: { nl: "Enquêtes & budget", en: "Surveys & budget" },
    lens: { nl: "€300k buurtbudget", en: "€300k neighborhood budget" },
    summary: {
      nl: "Een enquête die bewoners helpt prioriteren: welk thema, welke plek, welke actie, welk budget. Stemrecht volgt verblijf — geverifieerde bewoners beslissen mee.",
      en: "A survey that helps residents prioritize: which theme, which place, which action, which budget. Voting follows residence — verified residents help decide.",
    },
    proves: {
      nl: "Democratisch mechanisme · gestructureerde feedback · besluitvorming",
      en: "Democratic mechanism · structured feedback · decision-making",
    },
  },
  // — Lenses: the ways you navigate those blocks —
  {
    slug: "map",
    number: "05",
    group: "lens",
    title: { nl: "Kaartlens", en: "Map lens" },
    lens: { nl: "Locatie + thema", en: "Location + theme" },
    summary: {
      nl: "De ruggengraat: zoom van huis naar straat naar buurt naar stad en filter alle bouwblokken op thema, rol en urgentie. Geen platte groep, maar een civic lens.",
      en: "The backbone: zoom from house to street to neighborhood to city and filter all building blocks by theme, role, and urgency. Not a flat group, but a civic lens.",
    },
    proves: {
      nl: "Cascading geography · geen platte groep · kaart als ruggengraat",
      en: "Cascading geography · not a flat group · map as backbone",
    },
  },
  {
    slug: "themes",
    number: "06",
    group: "lens",
    title: { nl: "Thema's — context + boom", en: "Themes — context + tree" },
    lens: { nl: "Zorg in context, en de hele boom", en: "Care in context, and the whole tree" },
    summary: {
      nl: "Twee blikken op hetzelfde idee: één thema door de schalen heen (zorg in de Indische Buurt), en de top-down boom van twaalf hoofdthema's met sub-takken waar bewoners hun affiniteit op zetten.",
      en: "Two takes on the same idea: one theme across scales (care in the Indische Buurt), and the top-down tree of twelve top-level themes with sub-branches that residents tag their affinities with.",
    },
    proves: {
      nl: "Subjectmodel · T-vorm · 12 thema's · voorstelbare takken",
      en: "Subject model · T-shape · 12 themes · proposable branches",
    },
  },
  {
    slug: "inbox",
    number: "07",
    group: "lens",
    title: { nl: "Civic inbox", en: "Civic inbox" },
    lens: { nl: "Push in plaats van zoeken", en: "Push instead of search" },
    summary: {
      nl: "Dezelfde bouwblokken, maar naar jou toe gebracht: vergunningen, plannen, events en vragen worden relevant gemaakt op basis van jouw locaties en thema's.",
      en: "The same building blocks, but brought to you: permits, plans, events, and questions become relevant based on your locations and themes.",
    },
    proves: {
      nl: "Overheidsinformatie · context · open data als productlaag",
      en: "Government information · context · open data as product layer",
    },
  },
  // — Foundation: who owns it —
  {
    slug: "governance",
    number: "08",
    group: "foundation",
    title: { nl: "Rollen & governance", en: "Roles & governance" },
    lens: { nl: "Van, voor en door samenleving", en: "From, for, and by society" },
    summary: {
      nl: "Hoe bewoners, overheid en ondernemers deelnemen zonder dat de stad of een bedrijf eigenaar wordt. Plus de principes: alles openbaar, geverifieerd-maar-pseudoniem, stemrecht volgt verblijf.",
      en: "How residents, government, and entrepreneurs participate without the city or a company owning the platform. Plus the principles: all public, verified-but-pseudonymous, voting follows residence.",
    },
    proves: {
      nl: "Drie rollen · formeel/informeel · moderatiebord · eigenaarschap",
      en: "Three roles · formal/informal · moderation board · ownership",
    },
  },
];

const groupMeta: Record<Group, { nl: string; en: string; blurb: { nl: string; en: string } }> = {
  block: {
    nl: "De bouwblokken",
    en: "The building blocks",
    blurb: {
      nl: "Bewust weinig. Vier dingen die je maakt — alles op het platform is één van deze.",
      en: "Deliberately few. Four things you make — everything on the platform is one of these.",
    },
  },
  lens: {
    nl: "De lenzen",
    en: "The lenses",
    blurb: {
      nl: "Drie manieren om diezelfde blokken te vinden: op plek, op thema, of naar je toe gebracht.",
      en: "Three ways to find those same blocks: by place, by theme, or brought to you.",
    },
  },
  foundation: {
    nl: "Het fundament",
    en: "The foundation",
    blurb: {
      nl: "Van wie is dit? Van de samenleving — en de regels die dat waarborgen.",
      en: "Who owns this? Society — and the rules that safeguard it.",
    },
  },
};

const GROUP_ORDER: Group[] = ["block", "lens", "foundation"];

export default function Home() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Amsterdam · 2026" en="Amsterdam · 2026" />}
        title={
          <T
            nl="Uitwijken.nl — society-owned civic layer"
            en="Uitwijken.nl — society-owned civic layer"
          />
        }
        subtitle={
          <T
            nl="Je begint niet bij een feed, maar bij wat je wilt doen waar je woont: iets organiseren, iets vragen, iets aanbieden, meebeslissen. Uitwijken.nl geeft die handelingen een vorm en legt ze op de kaart en in thema's — zodat het individu echt kan meedoen in de gemeenschap, naast overheid en ondernemers."
            en="You don't start at a feed, you start at what you want to do where you live: organize something, ask for something, offer something, help decide. Uitwijken.nl gives those acts a shape and places them on the map and in themes — so the individual can genuinely take part in the community, alongside government and entrepreneurs."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 pb-16 space-y-12">
        {GROUP_ORDER.map((group) => {
          const meta = groupMeta[group];
          const items = mocks.filter((m) => m.group === group);
          return (
            <section key={group}>
              <div className="border-t border-[var(--color-rule)] pt-5 mb-5">
                <h2 className="font-sans font-bold text-xl tracking-tight leading-snug">
                  <T {...meta} />
                </h2>
                <p className="mt-1 text-[14px] text-[var(--color-secondary)] max-w-2xl">
                  <T {...meta.blurb} />
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {items.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/${m.slug}`}
                    className="group border border-[var(--color-rule)] p-6 bg-white hover:border-[var(--color-ink)] hover:shadow-[0_2px_0_0_var(--color-ink)] transition"
                  >
                    <div className="flex items-baseline justify-between gap-3 mb-3">
                      <span className="font-serif italic text-2xl text-[var(--color-uitwijken)]">
                        {m.number}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--color-secondary)] text-right">
                        <T {...m.lens} />
                      </span>
                    </div>
                    <h3 className="font-sans font-bold text-2xl tracking-tight leading-snug mb-2 group-hover:text-[var(--color-link)] group-hover:underline underline-offset-4">
                      <T {...m.title} />
                    </h3>
                    <p className="text-[15px] text-[#2a2926] leading-relaxed mb-4">
                      <T {...m.summary} />
                    </p>
                    <div className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)] border-t border-[var(--color-rule)] pt-3">
                      <T nl="Bewijst — " en="Proves — " />
                      <T {...m.proves} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}

        <div className="border-t border-[var(--color-rule)] pt-6 text-[14px] text-[#2a2926] leading-relaxed max-w-3xl">
          <p className="mb-2">
            <strong className="text-[var(--color-ink)]">
              <T nl="Pitchvolgorde:" en="Pitch order:" />
            </strong>{" "}
            <T
              nl="Begin bij de kaartlens (de ruggengraat), bewijs daarna de thema's, en loop dan door de bouwblokken — een event, een gesprek, een vraag, een enquête. Sluit af met de civic inbox en het eigenaarschap."
              en="Start with the map lens (the backbone), then prove the themes, then walk through the building blocks — an event, a conversation, an ask, a survey. Close with the civic inbox and ownership."
            />
          </p>
          <p>
            <strong className="text-[var(--color-ink)]">
              <T nl="Achtergrond:" en="Background:" />
            </strong>{" "}
            <Link
              href="/docs/building-blocks"
              className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
            >
              <T nl="de vier bouwblokken" en="the four building blocks" />
            </Link>
            {" · "}
            <Link
              href="/docs"
              className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
            >
              <T
                nl="lees de wiki voor visie, precedenten en research."
                en="read the wiki for vision, precedents, and research."
              />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
