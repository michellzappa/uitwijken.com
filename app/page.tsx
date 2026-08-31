import Link from "next/link";
import { ArrowRight, Columns3, Map as MapIcon, CirclePlus } from "lucide-react";
import { TopBar, PageHeader } from "./components/Nav";
import { T } from "./lib/i18n";
import { atlasStats } from "./atlas/platforms";

/** The three routes into the atlas — the whole proposition of the site. */
const ROUTES = [
  {
    href: "/atlas",
    Icon: MapIcon,
    n: "01",
    title: { nl: "Verken het ecosysteem", en: "Explore the ecosystem" },
    body: {
      nl: "Directory, dekking per stadsdeel en filters op bereik, functie en eigenaarschap. Wat bestaat er al, voor wie, en is het actief?",
      en: "Directory, coverage by district, and filters on reach, function, and ownership. What already exists, who is it for, and is it active?",
    },
  },
  {
    href: "/atlas/compare",
    Icon: Columns3,
    n: "02",
    title: { nl: "Vergelijk platformen", en: "Compare platforms" },
    body: {
      nl: "Dezelfde velden voor elk platform, naast elkaar. Geen score en geen rangschikking — wel zichtbaar gemarkeerd wat nog niet gevalideerd is.",
      en: "The same fields for every platform, side by side. No score and no ranking — but visibly marked where nothing is validated yet.",
    },
  },
  {
    href: "/atlas/submit",
    Icon: CirclePlus,
    n: "03",
    title: { nl: "Vul aan of corrigeer", en: "Add or correct" },
    body: {
      nl: "Deze atlas is incompleet en zal dat blijven zonder de mensen die de platformen draaien. Meld een initiatief, of zet recht wat wij fout hebben.",
      en: "This atlas is incomplete and will stay that way without the people who run the platforms. Report an initiative, or set right what we got wrong.",
    },
  },
];

/** The stance, stated on the front page so nobody has to infer it. */
const PRINCIPLES = [
  {
    n: "01",
    nl: "Communities houden zeggenschap over hun eigen regels en moderatie.",
    en: "Communities retain control over their own rules and moderation.",
  },
  {
    n: "02",
    nl: "De stad ondersteunt, verbindt, financiert en haalt drempels weg — de stad hoeft het gesprek niet te bezitten.",
    en: "The City supports, convenes, funds, and removes barriers — it does not need to own the conversation.",
  },
  {
    n: "03",
    nl: "Publieke financiering geeft voorrang aan portabiliteit, interoperabiliteit en heldere datagovernance.",
    en: "Public funding favours portability, interoperability, and clear data governance.",
  },
  {
    n: "04",
    nl: "Digitale infrastructuur ondersteunt offline verbinding, in plaats van die te vervangen.",
    en: "Digital infrastructure supports offline connection rather than substituting for it.",
  },
  {
    n: "05",
    nl: "Nieuw bouwen vereist bewijs dat geen bestaande optie aan de behoefte kan voldoen.",
    en: "New builds require proof that no existing option can meet the need.",
  },
];

export default function Home() {
  const stats = atlasStats();

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Amsterdam · v0.1 · werk in uitvoering" en="Amsterdam · v0.1 · work in progress" />}
        title={
          <T
            nl="Een levende kaart van de digitale publieke ruimte van Amsterdam"
            en="A living map of Amsterdam's digital public space"
          />
        }
        subtitle={
          <T
            nl="Uitwijken is geen vervanging van lokale platformen. Het maakt het bestaande ecosysteem zichtbaar, vergelijkbaar en makkelijker te verbinden — zodat duidelijk wordt wat de stad zou moeten steunen, verbinden of standaardiseren, in plaats van opnieuw bouwen."
            en="Uitwijken is not a replacement for local platforms. It makes the existing ecosystem visible, comparable, and easier to connect — so it becomes clear what the City should fund, connect, or standardise, rather than rebuild."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* — The three routes — */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {ROUTES.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="group flex flex-col border border-[var(--color-rule)] bg-white p-6 transition hover:border-[var(--color-ink)] hover:shadow-[0_2px_0_0_var(--color-ink)]"
            >
              <div className="mb-4 flex items-baseline justify-between gap-3">
                <r.Icon className="h-5 w-5 text-[var(--color-uitwijken)]" aria-hidden="true" />
                <span className="font-serif text-2xl italic text-[var(--color-uitwijken)]">
                  {r.n}
                </span>
              </div>
              <h2 className="mb-2 font-sans text-2xl font-bold leading-snug tracking-tight group-hover:text-[var(--color-link)] group-hover:underline group-hover:underline-offset-4">
                <T {...r.title} />
              </h2>
              <p className="mb-4 text-[14.5px] leading-relaxed text-[#2a2926]">
                <T {...r.body} />
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 border-t border-[var(--color-rule)] pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-link)]">
                <T nl="Open" en="Open" />
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        {/* — Where the evidence base actually stands. Numbers computed from the atlas. — */}
        <section className="mt-14 border-t border-[var(--color-rule)] pt-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <h2 className="mb-3 font-sans text-2xl font-bold leading-snug tracking-tight">
                <T nl="Waar de atlas nu staat" en="Where the atlas stands today" />
              </h2>
              <p className="mb-4 max-w-2xl text-[15.5px] leading-relaxed text-[#2a2926]">
                <T
                  nl={`${stats.total} platformen beschreven, ${stats.openFields} van de ${stats.fields} velden nog te valideren, en voor ${stats.districtsCovered} van de ${stats.districtsTotal} stadsdelen een gedocumenteerd buurtplatform. Dat is geen zwakte van de kaart die verstopt moet worden — het is de bevinding waar het gesprek mee begint.`}
                  en={`${stats.total} platforms described, ${stats.openFields} of ${stats.fields} fields still to validate, and a documented neighbourhood platform for ${stats.districtsCovered} of ${stats.districtsTotal} districts. That is not a weakness of the map to be hidden — it is the finding the conversation starts from.`}
                />
              </p>
              <p className="max-w-2xl text-[15.5px] leading-relaxed text-[#2a2926]">
                <T
                  nl="Versnippering is op zichzelf geen probleem. Onzichtbare duplicatie, ongesteunde gaten en het ontbreken van interoperabiliteit zijn dat wel."
                  en="Fragmentation is not inherently a problem. Unseen duplication, unsupported gaps, and the absence of interoperability are."
                />
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/patterns"
                  className="inline-flex items-center gap-1.5 border border-[var(--color-ink)] bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-white hover:bg-[#000]"
                >
                  <T nl="Patronen en gaten" en="Patterns and gaps" />
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/atlas/interop"
                  className="inline-flex items-center gap-1.5 border border-[var(--color-rule)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                >
                  <T nl="Wat praat er met wat?" en="What talks to what?" />
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
                <Link
                  href="/patterns#vragen"
                  className="inline-flex items-center gap-1.5 border border-[var(--color-rule)] bg-white px-4 py-2 text-[13px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                >
                  <T nl="Vragen aan Amsterdam" en="Questions for Amsterdam" />
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px self-start border border-[var(--color-rule)] bg-[var(--color-rule)]">
              {[
                { n: `${stats.total}`, l: { nl: "platformen", en: "platforms" } },
                {
                  n: `${stats.openFields}`,
                  l: { nl: "open velden", en: "open fields" },
                },
                {
                  n: `${stats.districtsCovered}/${stats.districtsTotal}`,
                  l: { nl: "stadsdelen in kaart", en: "districts mapped" },
                },
                {
                  n: `${stats.interopKnown}/${stats.total}`,
                  l: {
                    nl: "met bekende interoperabiliteit",
                    en: "with known interoperability",
                  },
                },
              ].map((s) => (
                <div key={s.l.en} className="bg-white px-4 py-5">
                  <div className="font-sans text-3xl font-bold tracking-tight">{s.n}</div>
                  <div className="mt-1 text-[11.5px] leading-snug text-[var(--color-secondary)]">
                    <T {...s.l} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* — The stance, stated plainly — */}
        <section className="mt-14 border-t border-[var(--color-rule)] pt-6">
          <h2 className="mb-2 font-sans text-2xl font-bold leading-snug tracking-tight">
            <T nl="Waar wij van uitgaan" en="Where we stand" />
          </h2>
          <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-[var(--color-secondary)]">
            <T
              nl="Vijf uitgangspunten die bepalen hoe deze atlas is opgebouwd en wat er wel en niet uit mag volgen."
              en="Five principles that shape how this atlas is built and what may and may not follow from it."
            />
          </p>
          <ol className="grid grid-cols-1 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="bg-white p-5">
                <div className="mb-2 font-serif text-xl italic text-[var(--color-uitwijken)]">
                  {p.n}
                </div>
                <p className="text-[14.5px] leading-relaxed text-[#2a2926]">
                  <T nl={p.nl} en={p.en} />
                </p>
              </li>
            ))}
            <li className="bg-[#faf9f5] p-5">
              <p className="text-[13.5px] leading-relaxed text-[var(--color-secondary)]">
                <T
                  nl="Deze uitgangspunten zijn een voorstel, geen vastgesteld beleid. Ze horen in het gesprek met de stad en met de platformen zelf te worden getoetst."
                  en="These principles are a proposal, not adopted policy. They belong in the conversation with the City and with the platforms themselves, to be tested there."
                />
              </p>
            </li>
          </ol>
        </section>

        {/* — Everything that is explicitly not a proposal — */}
        <section className="mt-14 border-t border-[var(--color-rule)] pt-6">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="border border-[var(--color-rule)] bg-white p-5">
              <h3 className="mb-2 font-sans text-lg font-bold tracking-tight">
                <T nl="Conceptschetsen (archief)" en="Concept sketches (archive)" />
              </h3>
              <p className="mb-3 text-[14px] leading-relaxed text-[#2a2926]">
                <T
                  nl="Negen wireframes uit de fase waarin Uitwijken als nieuw platform werd onderzocht. Bewaard voor het archief — geen voorstel en geen roadmap."
                  en="Nine wireframes from the phase in which Uitwijken was explored as a new platform. Kept for the record — not a proposal and not a roadmap."
                />
              </p>
              <Link
                href="/sketches"
                className="text-[13px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
              >
                <T nl="Bekijk de schetsen →" en="View the sketches →" />
              </Link>
            </div>
            <div className="border border-[var(--color-rule)] bg-white p-5">
              <h3 className="mb-2 font-sans text-lg font-bold tracking-tight">
                <T nl="Wiki" en="Wiki" />
              </h3>
              <p className="mb-3 text-[14px] leading-relaxed text-[#2a2926]">
                <T
                  nl="Visie, precedenten, open data, financiering, governance en de verslagen van de gesprekken die tot deze koerswijziging leidden."
                  en="Vision, precedents, open data, funding, governance, and the notes from the conversations that led to this change of course."
                />
              </p>
              <Link
                href="/docs"
                className="text-[13px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
              >
                <T nl="Lees de wiki →" en="Read the wiki →" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
