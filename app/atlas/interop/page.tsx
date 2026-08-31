import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TopBar, PageHeader } from "../../components/Nav";
import { T } from "../../lib/i18n";
import { AtlasDisclaimer } from "../AtlasUI";
import { ENDPOINT_META, PLATFORMS } from "../platforms";

const CHECKED = "31 · 08 · 2026";

/**
 * The three layers, kept strictly apart. Conflating them is how "we already
 * share software" gets mistaken for "our systems talk to each other" — which is
 * exactly the confusion this page exists to end.
 */
const LAYERS = [
  {
    n: "01",
    title: { nl: "Gedeelde code", en: "Shared code" },
    verdict: { nl: "Meer dan verwacht", en: "More than expected" },
    tone: "good" as const,
    body: {
      nl: "Hallo IJburg, Gebiedonline en Wij Amsterdam draaien op één en dezelfde installatie. Ze delen serverkenmerken, dezelfde /web/-assets en dezelfde /networks/<naam>/-opbouw van stylesheets. De footer van Hallo IJburg zegt het ook gewoon: 'Ontwikkeld met software van Gebiedonline'.",
      en: "Hallo IJburg, Gebiedonline, and Wij Amsterdam run on one and the same installation. They share server signatures, the same /web/ assets, and the same /networks/<name>/ stylesheet layout. Hallo IJburg's footer says so outright: 'Ontwikkeld met software van Gebiedonline'.",
    },
  },
  {
    n: "02",
    title: { nl: "Gedeelde data", en: "Shared data" },
    verdict: { nl: "Vrijwel nul", en: "Effectively zero" },
    tone: "bad" as const,
    body: {
      nl: "Op die gedeelde installatie is precies één machineleesbaar eindpunt te vinden — /rss — en dat werkt alleen op de site waarvoor het in 2012 gebouwd is. Op gebiedonline.nl en wijamsterdam.nl bestaat hetzelfde pad, draagt het de titel 'Hallo IJburg kalender', verwijst het naar halloijburg.nl/rss en levert het nul items. Geen API, geen iCal, geen sitemap, geen export.",
      en: "On that shared installation exactly one machine-readable endpoint exists — /rss — and it works only on the site it was built for in 2012. On gebiedonline.nl and wijamsterdam.nl the same path exists, carries the title 'Hallo IJburg kalender', points at halloijburg.nl/rss, and yields zero items. No API, no iCal, no sitemap, no export.",
    },
  },
  {
    n: "03",
    title: { nl: "Gedeelde standaarden", en: "Shared standards" },
    verdict: { nl: "Niet aan begonnen", en: "Not started" },
    tone: "bad" as const,
    body: {
      nl: "Geen van de Amsterdamse systemen publiceert een vocabulaire, schema of licentie voor zijn gegevens. Decidim doet dat wel — GraphQL-API, plus platte CSV- en JSON-bestanden onder de Open Database License — en laat daarmee zien dat dit een keuze is, geen technisch obstakel.",
      en: "None of the Amsterdam systems publishes a vocabulary, schema, or licence for its data. Decidim does — a GraphQL API, plus flat CSV and JSON files under the Open Database License — which shows this is a choice, not a technical obstacle.",
    },
  },
];

/** Cheap, concrete, and none of it touches anyone's ownership or moderation. */
const MOVES = [
  {
    n: "01",
    effort: { nl: "Een middag", en: "An afternoon" },
    title: { nl: "Repareer /rss per netwerk", en: "Fix /rss per network" },
    body: {
      nl: "Het eindpunt bestaat al in de gedeelde code. Het per netwerk laten werken is een configuratiekwestie, geen bouwproject — en levert meteen een agenda per buurt op die andere sites kunnen tonen.",
      en: "The endpoint already exists in the shared code. Making it work per network is a configuration matter, not a build project — and it immediately yields a per-neighbourhood calendar other sites can display.",
    },
  },
  {
    n: "02",
    effort: { nl: "Een week", en: "A week" },
    title: { nl: "Voeg iCal toe aan elke agenda", en: "Add iCal to every calendar" },
    body: {
      nl: "Eén export en een buurtagenda staat in de telefoon van bewoners, in de agenda van het buurthuis en op de site van de stad. Dit is de kortste route van digitaal naar fysiek die er is.",
      en: "One export and a neighbourhood calendar sits in residents' phones, in the community centre's diary, and on the city's site. This is the shortest route from digital to physical there is.",
    },
  },
  {
    n: "03",
    effort: { nl: "Een besluit", en: "A decision" },
    title: { nl: "Maak export een subsidievoorwaarde", en: "Make export a funding condition" },
    body: {
      nl: "Wie publiek geld krijgt voor een platform, publiceert zijn openbare items machineleesbaar en herbruikbaar. Kost de gemeente niets en verandert het gedrag van het hele veld in één keer.",
      en: "Whoever receives public money for a platform publishes its public items in a machine-readable, reusable form. Costs the City nothing and changes the whole field's behaviour at once.",
    },
  },
  {
    n: "04",
    effort: { nl: "Een gesprek", en: "A conversation" },
    title: { nl: "Eén verwijslaag, geen nieuw account", en: "One referral layer, no new account" },
    body: {
      nl: "Als de feeds er zijn, is een stedelijke ontdekkingslaag een leesoefening: bewoners worden doorgestuurd naar het platform dat het antwoord al heeft, in plaats van gevraagd zich ergens nieuws aan te melden.",
      en: "Once the feeds exist, a citywide discovery layer is a reading exercise: residents get pointed to the platform that already has the answer, instead of being asked to sign up somewhere new.",
    },
  },
];

export default function InteropPage() {
  const probed = PLATFORMS.flatMap((p) =>
    p.probe.endpoints.map((e) => ({ platform: p, endpoint: e })),
  );
  const probedEndpoints = probed.filter((x) => x.endpoint.verified === "probed");
  const working = probedEndpoints.filter((x) => x.endpoint.result === "works").length;

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl={`Atlas · getest op ${CHECKED}`} en={`Atlas · tested ${CHECKED}`} />}
        title={<T nl="Wat praat er met wat?" en="What talks to what?" />}
        subtitle={
          <T
            nl="Niet wat de platformen zeggen te kunnen, maar wat er antwoordt als je het opvraagt. Elk eindpunt hieronder is aangeroepen; een pad dat netjes de gewone HTML-pagina teruggeeft telt als afwezig."
            en="Not what the platforms say they can do, but what answers when you ask. Every endpoint below was requested; a path that politely returns the ordinary HTML page counts as absent."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <AtlasDisclaimer />

        {/* The finding, stated before the evidence so nobody has to hunt for it. */}
        <div className="mt-8 border-y-2 border-[var(--color-ink)] px-1 py-6">
          <p className="max-w-4xl font-sans text-[26px] font-bold leading-[1.25] tracking-tight">
            <T
              nl="Drie van de zes systemen draaien op dezelfde software — en wisselen nog steeds niets uit. Het probleem is niet versnippering. Het is dat niemand ooit om een koppeling heeft gevraagd."
              en="Three of the six systems run on the same software — and still exchange nothing. The problem is not fragmentation. It is that nobody ever asked for a connection."
            />
          </p>
          <p className="mt-3 max-w-3xl text-[14px] text-[var(--color-secondary)]">
            <T
              nl={`Van de ${probedEndpoints.length} aangeroepen paden geven er ${working} iets machineleesbaars terug, en daarvan draagt er één daadwerkelijk inhoud: de agenda van Hallo IJburg. Het andere is een sitemapindex — genoeg om de inhoud te vinden, te weinig om er iets mee te doen. De gemeente draait haar eigen stedelijke platform op de software van een bewonerscoöperatie, en zelfs daartussen loopt geen datastroom.`}
              en={`Of the ${probedEndpoints.length} paths requested, ${working} return something machine-readable, and only one of those carries actual content: Hallo IJburg's calendar. The other is a sitemap index — enough to find the content, not enough to do anything with it. The City runs its own citywide platform on a resident cooperative's software, and even between those two no data flows.`}
            />
          </p>
        </div>

        {/* — The three layers — */}
        <section className="mt-12">
          <div className="mb-5 border-t border-[var(--color-rule)] pt-5">
            <h2 className="font-sans text-xl font-bold leading-snug tracking-tight">
              <T nl="Drie lagen, streng uit elkaar gehouden" en="Three layers, kept strictly apart" />
            </h2>
            <p className="mt-1 max-w-3xl text-[14px] text-[var(--color-secondary)]">
              <T
                nl="Deze drie worden voortdurend door elkaar gehaald. 'We gebruiken dezelfde software' klinkt als 'onze systemen praten met elkaar', en dat is hier aantoonbaar niet zo."
                en="These three get conflated constantly. 'We use the same software' sounds like 'our systems talk to each other', and here that is demonstrably not the case."
              />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-3">
            {LAYERS.map((l) => (
              <div key={l.n} className="bg-white p-5">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="font-serif text-xl italic text-[var(--color-uitwijken)]">
                    {l.n}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] ${
                      l.tone === "good"
                        ? "border-[#b9cdb0] bg-[#dfe6d5] text-[#33501e]"
                        : "border-[#e2cfa8] bg-[var(--color-uitwijken-soft)] text-[#7a3418]"
                    }`}
                  >
                    <T {...l.verdict} />
                  </span>
                </div>
                <h3 className="mb-2 font-sans text-lg font-bold leading-snug tracking-tight">
                  <T {...l.title} />
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[#2a2926]">
                  <T {...l.body} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* — The endpoint evidence — */}
        <section className="mt-12">
          <div className="mb-4 border-t border-[var(--color-rule)] pt-5">
            <h2 className="font-sans text-xl font-bold leading-snug tracking-tight">
              <T nl="Wat er antwoordde" en="What answered" />
            </h2>
            <p className="mt-1 max-w-3xl text-[14px] text-[var(--color-secondary)]">
              <T
                nl="Per systeem: waar het op draait, of de code open is, en wat elk opgevraagd pad teruggaf."
                en="Per system: what it runs on, whether the code is open, and what each requested path returned."
              />
            </p>
          </div>

          <div className="space-y-5">
            {PLATFORMS.map((p) => (
              <div key={p.slug} className="border border-[var(--color-rule)] bg-white">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[var(--color-rule)] px-5 py-3">
                  <Link
                    href={`/atlas/${p.slug}`}
                    className="font-sans text-xl font-bold tracking-tight hover:text-[var(--color-link)] hover:underline hover:underline-offset-4"
                  >
                    {p.name}
                  </Link>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                    <T nl="Open source" en="Open source" />:{" "}
                    {p.probe.openSource === "yes" ? (
                      <T nl="ja" en="yes" />
                    ) : p.probe.openSource === "no" ? (
                      <T nl="nee" en="no" />
                    ) : (
                      <T nl="onbekend" en="unknown" />
                    )}
                  </span>
                </div>

                {p.probe.runsOn && (
                  <p className="border-b border-[var(--color-rule)] bg-[#faf9f5] px-5 py-3 text-[13.5px] leading-relaxed text-[#2a2926]">
                    <strong className="font-semibold">
                      <T nl="Draait op: " en="Runs on: " />
                    </strong>
                    <T {...p.probe.runsOn} />
                  </p>
                )}

                <ul>
                  {p.probe.endpoints.map((e) => {
                    const m = ENDPOINT_META[e.result];
                    return (
                      <li
                        key={e.path}
                        className="flex gap-3 border-b border-[var(--color-rule)] px-5 py-3 last:border-b-0"
                      >
                        <span
                          className={`mt-0.5 shrink-0 text-[15px] ${m.cls}`}
                          aria-hidden="true"
                        >
                          {m.mark}
                        </span>
                        <div className="min-w-0">
                          <div className="mb-0.5 flex flex-wrap items-center gap-2">
                            <code className="rounded-sm bg-[#f1efe8] px-1.5 py-0.5 font-mono text-[12px]">
                              {e.path}
                            </code>
                            <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                              <T nl={m.nl} en={m.en} />
                              {" · "}
                              {e.verified === "probed" ? (
                                <T nl="getest" en="probed" />
                              ) : (
                                <T nl="uit documentatie" en="from documentation" />
                              )}
                            </span>
                          </div>
                          <p className="text-[13.5px] leading-relaxed text-[#2a2926]">
                            <T {...e.note} />
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11.5px] text-[var(--color-secondary)]">
            {(Object.keys(ENDPOINT_META) as (keyof typeof ENDPOINT_META)[]).map((k) => (
              <span key={k} className="inline-flex items-center gap-1.5">
                <span className={`text-[14px] ${ENDPOINT_META[k].cls}`} aria-hidden="true">
                  {ENDPOINT_META[k].mark}
                </span>
                <T nl={ENDPOINT_META[k].nl} en={ENDPOINT_META[k].en} />
              </span>
            ))}
          </div>
        </section>

        {/* — What to do about it — */}
        <section className="mt-14 border-t-2 border-[var(--color-ink)] pt-8">
          <h2 className="mb-3 font-sans text-3xl font-bold leading-tight tracking-tight">
            <T nl="Vier stappen die niemand iets kosten" en="Four moves that cost nobody anything" />
          </h2>
          <p className="mb-8 max-w-3xl text-[16px] leading-relaxed text-[#2a2926]">
            <T
              nl="Geen van deze stappen raakt het eigenaarschap of het moderatiemodel van welk platform dan ook. Dat is precies waarom ze eerst aan de beurt zijn: het is de enige laag waar samenwerken niemand iets kost."
              en="None of these moves touches the ownership or the moderation model of any platform. That is exactly why they come first: this is the one layer where cooperating costs nobody anything."
            />
          </p>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-2">
            {MOVES.map((m) => (
              <div key={m.n} className="bg-white p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="font-serif text-xl italic text-[var(--color-uitwijken)]">
                    {m.n}
                  </span>
                  <span className="inline-flex items-center rounded-sm border border-[var(--color-ink)] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em]">
                    <T {...m.effort} />
                  </span>
                </div>
                <h3 className="mb-2 font-sans text-lg font-bold leading-snug tracking-tight">
                  <T {...m.title} />
                </h3>
                <p className="text-[13.5px] leading-relaxed text-[#2a2926]">
                  <T {...m.body} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-[var(--color-secondary)]">
            <T
              nl="Toetssteen uit de brief: wint een bestaande community hier iets bij zonder haar eigenaarschap of moderatiemodel te veranderen? Bij alle vier is het antwoord ja."
              en="The test from the brief: does an existing community gain something here without changing its ownership or moderation model? For all four the answer is yes."
            />
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-[var(--color-rule)] pt-6 text-[13.5px]">
          <Link
            href="/atlas"
            className="inline-flex items-center gap-1.5 text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <T nl="Terug naar de atlas" en="Back to the atlas" />
          </Link>
          <Link
            href="/patterns"
            className="inline-flex items-center gap-1.5 text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T nl="Patronen en gaten" en="Patterns and gaps" />
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
