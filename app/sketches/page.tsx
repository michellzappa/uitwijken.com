import Link from "next/link";
import { TopBar, PageHeader } from "../components/Nav";
import { T } from "../lib/i18n";

/**
 * The wireframes from the earlier phase, when Uitwijken was framed as a platform
 * proposal. They are kept — a lot of thinking is in them — but demoted out of the
 * main route: a finished-looking product mock read as "already decided", which is
 * exactly the resistance the atlas is meant to avoid.
 */
type Group = "block" | "lens" | "foundation";

type Sketch = {
  slug: string;
  number: string;
  group: Group;
  title: { nl: string; en: string };
  lens: { nl: string; en: string };
  summary: { nl: string; en: string };
};

const SKETCHES: Sketch[] = [
  {
    slug: "events",
    number: "01",
    group: "block",
    title: { nl: "Events & actie", en: "Events & action" },
    lens: { nl: "Van micro tot Koningsdag", en: "From micro to King's Day" },
    summary: {
      nl: "Een samenkomst, van een D&D-avond tot een buurtmaaltijd tot een straatfeest, gekoppeld aan thema's, plekken en mensen.",
      en: "A gathering, from a D&D night to a neighborhood meal to a block party, tied to themes, places, and people.",
    },
  },
  {
    slug: "threads",
    number: "02",
    group: "block",
    title: { nl: "Gesprekken", en: "Conversations" },
    lens: { nl: "Een draad aan elk object", en: "A thread on any object" },
    summary: {
      nl: "Een gesprek hangt altijd aan een event, een vraag, een enquête of een plek. Strikt openbaar — geen DM's.",
      en: "A conversation always attaches to an event, an ask, a survey, or a place. Strictly public — no DMs.",
    },
  },
  {
    slug: "asks",
    number: "03",
    group: "block",
    title: { nl: "Vraag & aanbod", en: "Asks & offers" },
    lens: { nl: "Het individu doet mee", en: "The individual takes part" },
    summary: {
      nl: "Iets vragen, iets aanbieden, of samen iets doen. Wederkerigheid tussen buren, geen marktplaats.",
      en: "Ask for something, offer something, or do something together. Reciprocity between neighbors, not a marketplace.",
    },
  },
  {
    slug: "vragen",
    number: "04",
    group: "block",
    title: { nl: "Enquêtes & budget", en: "Surveys & budget" },
    lens: { nl: "€300k buurtbudget", en: "€300k neighborhood budget" },
    summary: {
      nl: "Een enquête die bewoners helpt prioriteren: welk thema, welke plek, welke actie, welk budget.",
      en: "A survey that helps residents prioritize: which theme, which place, which action, which budget.",
    },
  },
  {
    slug: "map",
    number: "05",
    group: "lens",
    title: { nl: "Kaartlens", en: "Map lens" },
    lens: { nl: "Locatie + thema", en: "Location + theme" },
    summary: {
      nl: "Zoom van huis naar straat naar buurt naar stad en filter alles op thema, rol en urgentie.",
      en: "Zoom from house to street to neighborhood to city and filter everything by theme, role, and urgency.",
    },
  },
  {
    slug: "themes",
    number: "06",
    group: "lens",
    title: { nl: "Thema's — context + boom", en: "Themes — context + tree" },
    lens: { nl: "Zorg in context, en de hele boom", en: "Care in context, and the whole tree" },
    summary: {
      nl: "Eén thema door de schalen heen, en de top-down boom van twaalf hoofdthema's met sub-takken.",
      en: "One theme across scales, and the top-down tree of twelve top-level themes with sub-branches.",
    },
  },
  {
    slug: "inbox",
    number: "07",
    group: "lens",
    title: { nl: "Civic inbox", en: "Civic inbox" },
    lens: { nl: "Push in plaats van zoeken", en: "Push instead of search" },
    summary: {
      nl: "Vergunningen, plannen, events en vragen worden relevant gemaakt op basis van jouw locaties en thema's.",
      en: "Permits, plans, events, and questions become relevant based on your locations and themes.",
    },
  },
  {
    slug: "governance",
    number: "08",
    group: "foundation",
    title: { nl: "Rollen & governance", en: "Roles & governance" },
    lens: { nl: "Van, voor en door samenleving", en: "From, for, and by society" },
    summary: {
      nl: "Hoe bewoners, overheid en ondernemers deelnemen zonder dat de stad of een bedrijf eigenaar wordt.",
      en: "How residents, government, and entrepreneurs participate without the city or a company owning the platform.",
    },
  },
  {
    slug: "operating-model",
    number: "09",
    group: "foundation",
    title: { nl: "Operating model", en: "Operating model" },
    lens: { nl: "Wie draait het, en waarvan", en: "Who runs it, and on what" },
    summary: {
      nl: "Een uitgeschreven bewoners-eigen exploitatiemodel: rollen, kosten en zeggenschap.",
      en: "A written-out resident-owned operating model: roles, costs, and control.",
    },
  },
];

const GROUP_META: Record<Group, { nl: string; en: string }> = {
  block: { nl: "Bouwblokken", en: "Building blocks" },
  lens: { nl: "Lenzen", en: "Lenses" },
  foundation: { nl: "Fundament", en: "Foundation" },
};

const GROUP_ORDER: Group[] = ["block", "lens", "foundation"];

export default function SketchesPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Archief · eerdere fase" en="Archive · earlier phase" />}
        title={<T nl="Conceptschetsen" en="Concept sketches" />}
        subtitle={
          <T
            nl="Deze schermen komen uit de fase waarin Uitwijken als voorstel voor een nieuw platform werd onderzocht. Ze staan hier voor het archief en voor het gesprek — niet als voorstel, niet als roadmap, en zeker niet als iets dat gebouwd gaat worden."
            en="These screens come from the phase in which Uitwijken was explored as a proposal for a new platform. They are here for the record and for the conversation — not as a proposal, not as a roadmap, and certainly not as something about to be built."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="border-l-4 border-[var(--color-uitwijken)] bg-white px-4 py-3 text-[13px] leading-relaxed text-[#2a2926]">
          <T
            nl="Waarom ze zijn gedegradeerd: een afgewerkt ogende productmock leest als een genomen besluit. De huidige lijn is omgekeerd — eerst in kaart brengen wat er al is, en pas bouwen als bewezen is dat geen bestaande optie volstaat. "
            en="Why they were demoted: a finished-looking product mock reads as a decision already taken. The current line is the reverse — first map what exists, and only build once it is proven that no existing option can meet the need. "
          />
          <Link
            href="/atlas"
            className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T nl="Ga naar de atlas" en="Go to the atlas" />
          </Link>
        </div>

        <div className="mt-10 space-y-10">
          {GROUP_ORDER.map((group) => (
            <section key={group}>
              <h2 className="mb-4 border-t border-[var(--color-rule)] pt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-uitwijken)]">
                <T {...GROUP_META[group]} />
              </h2>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {SKETCHES.filter((s) => s.group === group).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="group border border-[var(--color-rule)] bg-white p-5 transition hover:border-[var(--color-ink)]"
                  >
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <span className="font-serif text-xl italic text-[var(--color-uitwijken)]">
                        {s.number}
                      </span>
                      <span className="text-right text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-secondary)]">
                        <T {...s.lens} />
                      </span>
                    </div>
                    <h3 className="mb-2 font-sans text-xl font-bold leading-snug tracking-tight group-hover:text-[var(--color-link)]">
                      <T {...s.title} />
                    </h3>
                    <p className="text-[14px] leading-relaxed text-[#2a2926]">
                      <T {...s.summary} />
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-[var(--color-rule)] pt-6 text-[14px] leading-relaxed text-[#2a2926]">
          <T nl="Achtergrond en onderzoek staan in de " en="Background and research live in the " />
          <Link
            href="/docs"
            className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T nl="wiki" en="wiki" />
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
