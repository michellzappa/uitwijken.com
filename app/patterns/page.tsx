import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TopBar, PageHeader } from "../components/Nav";
import { T } from "../lib/i18n";
import { AtlasDisclaimer } from "../atlas/AtlasUI";
import { atlasStats } from "../atlas/platforms";

type Pattern = {
  n: string;
  title: { nl: string; en: string };
  observation: { nl: string; en: string };
  implication: { nl: string; en: string };
  evidence: { href: string; nl: string; en: string }[];
};

const PATTERNS: Pattern[] = [
  {
    n: "01",
    title: {
      nl: "Er bestaat al werkende buurtinfrastructuur",
      en: "Working neighbourhood infrastructure already exists",
    },
    observation: {
      nl: "Hallo IJburg draait sinds mei 2012. De software die daarvoor werd gebouwd is in 2016 ondergebracht in coöperatie Gebiedonline, opgericht door vijf bewonersnetwerken waarvan er drie Amsterdams zijn: IJburg, de Indische Buurt en Buiksloterham. De coöperatie meldt inmiddels 70 communities en 60.000+ geregistreerde mensen.",
      en: "Hallo IJburg has run since May 2012. The software built for it was placed in the Gebiedonline cooperative in 2016, founded by five resident networks, three of them in Amsterdam: IJburg, the Indische Buurt, and Buiksloterham. The cooperative now reports 70 communities and 60,000+ registered people.",
    },
    implication: {
      nl: "De basisfuncties van een 'buurtplatform' zijn geen open vraagstuk meer, en Amsterdam heeft het antwoord zelf voortgebracht — veertien jaar geleden, vanuit een buurt. Wie hier iets nieuws bouwt, bouwt iets na dat draait, inclusief het moeilijke deel: mensen die het al gebruiken.",
      en: "The basic functions of a 'neighbourhood platform' are no longer an open problem, and Amsterdam produced the answer itself — fourteen years ago, out of a neighbourhood. Building something new here rebuilds something that already runs, including the hard part: people who already use it.",
    },
    evidence: [
      { href: "/atlas/hallo-ijburg", nl: "Hallo IJburg", en: "Hallo IJburg" },
      { href: "/atlas/gebiedonline", nl: "Gebiedonline", en: "Gebiedonline" },
    ],
  },
  {
    n: "02",
    title: {
      nl: "Maar we weten niet waar het níet bestaat",
      en: "But we do not know where it does not exist",
    },
    observation: {
      nl: "Deze atlas kan voor twee van de acht stadsdelen een buurtplatform aanwijzen — en die twee kwamen boven water uit één alinea over de oprichting van een coöperatie, niet uit onderzoek. Voor de andere zes is de cel leeg, niet omdat daar niets is, maar omdat niemand het heeft opgeschreven.",
      en: "This atlas can name a neighbourhood platform for two of eight districts — and those two surfaced from a single paragraph about a cooperative's founding, not from research. For the other six the cell is empty, not because nothing is there, but because nobody has written it down.",
    },
    implication: {
      nl: "Het eerste tekort is geen platformtekort maar een zichttekort. Zolang de kaart leeg is, is elke uitspraak over 'de behoefte aan een nieuw platform' een aanname.",
      en: "The first shortage is not a platform shortage but a visibility shortage. As long as the map is empty, any claim about 'the need for a new platform' is an assumption.",
    },
    evidence: [{ href: "/atlas", nl: "Dekking per stadsdeel", en: "Coverage by district" }],
  },
  {
    n: "03",
    title: {
      nl: "Participatie-gereedschap bestaat al, los van community",
      en: "Participation tooling already exists, separate from community",
    },
    observation: {
      nl: "OpenStad bedient inspraak per project; Decidim laat internationaal zien hoe je governance, traceerbaarheid en privacy in het product zelf vastlegt. Geen van beide vraagt van een bewoner dat die permanent ergens lid wordt.",
      en: "OpenStad serves consultation per project; Decidim shows internationally how to write governance, traceability, and privacy into the product itself. Neither asks a resident to permanently join anything.",
    },
    implication: {
      nl: "Meebeslissen en erbij horen zijn twee verschillende problemen met twee verschillende oplossingen. Ze in één platform proppen is de fout die deze atlas probeert te voorkomen.",
      en: "Having a say and belonging are two different problems with two different solutions. Cramming them into one platform is the mistake this atlas exists to prevent.",
    },
    evidence: [
      { href: "/atlas/openstad", nl: "OpenStad", en: "OpenStad" },
      { href: "/atlas/decidim", nl: "Decidim", en: "Decidim" },
    ],
  },
  {
    n: "04",
    title: {
      nl: "De gemeente financiert al een stedelijke laag",
      en: "The City already funds a citywide layer",
    },
    observation: {
      nl: "Wij Amsterdam is in april 2020 gepubliceerd, begonnen als coronahulpplatform en daarna verbreed. Het draait aantoonbaar op dezelfde Gebiedonline-installatie als Hallo IJburg — de gemeente gebruikt dus de software van de bewonerscoöperatie. Wat 'erkend buurtplatform' betekent, welke criteria gelden en wat het per jaar kost is niet publiek.",
      en: "Wij Amsterdam was published in April 2020, started as a coronavirus mutual-aid platform, and was broadened afterwards. It demonstrably runs on the same Gebiedonline installation as Hallo IJburg — so the City is using the resident cooperative's software. What a 'recognised neighbourhood platform' means, which criteria apply, and what it costs per year is not public.",
    },
    implication: {
      nl: "Dit is geen parallelle puntoplossing maar hergebruik — en het is nooit als zodanig verteld. Voordat er iets nieuws bij komt, hoort de bestaande voorziening te worden uitgelegd: doel, kosten, bereik, de criteria waarmee zij anderen erkent, en wat de stad de coöperatie betaalt voor de software waarop zij draait.",
      en: "This is not a parallel point solution but reuse — and it has never been told as such. Before anything new is added, the existing facility should be explained: purpose, cost, reach, the criteria by which it recognises others, and what the City pays the cooperative for the software it runs on.",
    },
    evidence: [{ href: "/atlas/wij-amsterdam", nl: "Wij Amsterdam", en: "Wij Amsterdam" }],
  },
  {
    n: "05",
    title: {
      nl: "Interoperabiliteit is de goedkoopste winst — en nergens geregeld",
      en: "Interoperability is the cheapest win — and nowhere arranged",
    },
    observation: {
      nl: "Getest op 31 augustus 2026: precies één opgevraagd eindpunt levert herbruikbare inhoud — de RSS-agenda van Hallo IJburg. Op gebiedonline.nl en wijamsterdam.nl bestaat datzelfde pad, maar het draagt de titel van IJburg en geeft nul items terug. Verder alleen een sitemapindex hier en daar: geen API, geen iCal, geen export.",
      en: "Tested on 31 August 2026: exactly one requested endpoint delivers reusable content — Hallo IJburg's RSS calendar. On gebiedonline.nl and wijamsterdam.nl that same path exists but carries IJburg's title and returns zero items. Beyond that only the odd sitemap index: no API, no iCal, no export.",
    },
    implication: {
      nl: "Drie systemen delen één codebase en wisselen nul gegevens uit. Dat is geen technisch probleem: het eindpunt bestaat al en staat per netwerk verkeerd ingesteld. De goedkoopste winst in dit hele dossier is een configuratiekwestie die niemand ooit heeft gevraagd.",
      en: "Three systems share one codebase and exchange zero data. That is not a technical problem: the endpoint already exists and is simply misconfigured per network. The cheapest win in this whole file is a configuration matter nobody ever asked for.",
    },
    evidence: [
      { href: "/atlas/interop", nl: "Wat praat er met wat?", en: "What talks to what?" },
    ],
  },
  {
    n: "06",
    title: {
      nl: "Het resterende probleem is bestuurlijk, niet technisch",
      en: "The remaining problem is governance, not code",
    },
    observation: {
      nl: "De scherpst uitgeschreven zeggenschap in deze atlas komt van een coöperatie, niet van software: leden beslissen over functies, tarieven, opgeslagen data en ontwikkelbudget. De open velden gaan bijna allemaal over geld, eigenaarschap en verantwoordelijkheid — niet over features.",
      en: "The most sharply written control in this atlas comes from a cooperative, not from software: members decide on features, fees, stored data, and development budget. The open fields are almost all about money, ownership, and responsibility — not about features.",
    },
    implication: {
      nl: "Wat hier ontbreekt is een gesprek en een afspraak, geen release. Nieuwe code lost geen enkel gat op dat deze atlas laat zien.",
      en: "What is missing here is a conversation and an agreement, not a release. New code closes none of the gaps this atlas shows.",
    },
    evidence: [{ href: "/atlas/gebiedonline", nl: "Gebiedonline", en: "Gebiedonline" }],
  },
  {
    n: "07",
    title: {
      nl: "Hergebruik is hier al twee keer gelukt",
      en: "Reuse has already worked here — twice",
    },
    observation: {
      nl: "Eén buurtsite in IJburg werd in 2016 de software van een coöperatie die nu tientallen communities bedient — en waarop de gemeente sindsdien haar eigen stedelijke platform draait. Los daarvan bouwde een innovatieteam van de gemeente OpenStad, dat inmiddels door circa vijftig publieke organisaties wordt gebruikt. Geen van beide is ooit als 'het nieuwe platform' aangekondigd.",
      en: "One neighbourhood site in IJburg became, in 2016, the software of a cooperative now serving dozens of communities — and on which the City has since run its own citywide platform. Separately, a City innovation team built OpenStad, now used by some fifty public organisations. Neither was ever announced as 'the new platform'.",
    },
    implication: {
      nl: "Het patroon dat werkt is niet 'bouw een stedelijk platform' maar 'maak herbruikbaar wat lokaal al werkt'. Beide keren begon het klein, met echte gebruikers, en werd het pas daarna gedeeld. De gemeente heeft dus al besloten dat bewoners-eigen infrastructuur goed genoeg is voor haar eigen platform — dat besluit is alleen nooit uitgesproken.",
      en: "The pattern that works is not 'build a citywide platform' but 'make reusable what already works locally'. Both times it started small, with real users, and was only shared afterwards. The City has therefore already decided that resident-owned infrastructure is good enough for its own platform — that decision has simply never been said out loud.",
    },
    evidence: [
      { href: "/atlas/interop", nl: "Het technische bewijs", en: "The technical evidence" },
      { href: "/atlas/wij-amsterdam", nl: "Wij Amsterdam", en: "Wij Amsterdam" },
    ],
  },
];

const QUESTIONS: { n: string; q: { nl: string; en: string }; why: { nl: string; en: string } }[] = [
  {
    n: "01",
    q: { nl: "Wat wordt er al gefinancierd?", en: "What is already funded?" },
    why: {
      nl: "Welke digitale buurt- en participatievoorzieningen betaalt de stad nu, per jaar, en vanuit welk budget?",
      en: "Which digital neighbourhood and participation facilities does the city pay for now, per year, and from which budget?",
    },
  },
  {
    n: "02",
    q: { nl: "Wat is er actief?", en: "What is active?" },
    why: {
      nl: "Niet wat er bestaat, maar wat er deze maand daadwerkelijk gebruikt wordt — en waaruit dat blijkt.",
      en: "Not what exists, but what is actually used this month — and what shows it.",
    },
  },
  {
    n: "03",
    q: { nl: "Waar zit de onvervulde behoefte?", en: "Where are the unmet needs?" },
    why: {
      nl: "In welke buurten en voor welke groepen ontbreekt een werkende plek, en is dat een gat in de stad of in onze kaart?",
      en: "In which neighbourhoods and for which groups is there no working place, and is that a gap in the city or in our map?",
    },
  },
  {
    n: "04",
    q: { nl: "Wat zou interoperabel moeten zijn?", en: "What should be interoperable?" },
    why: {
      nl: "Als publiek geld ergens in gaat: welke export, API of standaard is daarvoor de tegenprestatie?",
      en: "If public money goes into something: which export, API, or standard is the consideration in return?",
    },
  },
  {
    n: "05",
    q: { nl: "Mogen we de cijfers zien?", en: "May we see the numbers?" },
    why: {
      nl: "Maandelijks actieve gebruikers, de verhouding lezers/plaatsers, en de kosten per platform. Voor publiek gefinancierde platformen is dat geen gunst maar verantwoording.",
      en: "Monthly active users, the ratio of readers to posters, and cost per platform. For publicly funded platforms that is not a favour but accountability.",
    },
  },
  {
    n: "06",
    q: { nl: "Wie bestuurt de gedeelde laag?", en: "Who governs the shared layer?" },
    why: {
      nl: "Als er iets gedeelds komt — een agenda, een verwijslaag, een register — wie besluit dan over regels, toelating en beëindiging?",
      en: "If something shared appears — a calendar, a referral layer, a register — who then decides on rules, admission, and shutdown?",
    },
  },
];

export default function PatternsPage() {
  const stats = atlasStats();

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Synthese · v0.1" en="Synthesis · v0.1" />}
        title={<T nl="Patronen en gaten" en="Patterns and gaps" />}
        subtitle={
          <T
            nl="Zes profielen en een wachtrij zijn te weinig voor een conclusie, maar genoeg voor de juiste vragen. Dit is wat de atlas nu laat zien, en wat dat zou betekenen als het klopt."
            en="Six profiles and a queue are too few for a conclusion, but enough for the right questions. This is what the atlas shows now, and what that would mean if it holds."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <AtlasDisclaimer />

        {/* The one line the whole reframe rests on. */}
        <div className="mt-8 border-y-2 border-[var(--color-ink)] px-1 py-6">
          <p className="max-w-4xl font-sans text-[26px] font-bold leading-[1.25] tracking-tight">
            <T
              nl="Versnippering is op zichzelf geen probleem. Onzichtbare duplicatie, ongesteunde gaten en het ontbreken van interoperabiliteit — dat zijn de problemen."
              en="Fragmentation is not inherently a problem. Unseen duplication, unsupported gaps, and the absence of interoperability — those are the problems."
            />
          </p>
          <p className="mt-3 max-w-2xl text-[14px] text-[var(--color-secondary)]">
            <T
              nl={`Basis onder deze pagina: ${stats.total} profielen, waarvan ${stats.openFields} van de ${stats.fields} velden nog niet gevalideerd zijn.`}
              en={`Basis for this page: ${stats.total} profiles, of which ${stats.openFields} of ${stats.fields} fields are not yet validated.`}
            />
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {PATTERNS.map((p) => (
            <section key={p.n} className="border-t border-[var(--color-rule)] pt-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr]">
                <div className="font-serif text-3xl italic text-[var(--color-uitwijken)] md:w-16">
                  {p.n}
                </div>
                <div>
                  <h2 className="mb-3 max-w-3xl font-sans text-2xl font-bold leading-snug tracking-tight">
                    <T {...p.title} />
                  </h2>
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                      <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
                        <T nl="Wat de atlas laat zien" en="What the atlas shows" />
                      </div>
                      <p className="text-[14.5px] leading-relaxed text-[#2a2926]">
                        <T {...p.observation} />
                      </p>
                    </div>
                    <div className="border-l-2 border-[var(--color-uitwijken)] pl-4">
                      <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-uitwijken)]">
                        <T nl="Wat dat zou betekenen" en="What that would mean" />
                      </div>
                      <p className="text-[14.5px] leading-relaxed text-[#2a2926]">
                        <T {...p.implication} />
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-[11.5px]">
                    <span className="uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                      <T nl="Onderbouwing" en="Evidence" />
                    </span>
                    {p.evidence.map((e) => (
                      <Link
                        key={e.href}
                        href={e.href}
                        className="inline-flex items-center gap-1 rounded-sm border border-[var(--color-rule)] bg-white px-2 py-0.5 text-[var(--color-ink)] hover:border-[var(--color-ink)]"
                      >
                        <T nl={e.nl} en={e.en} />
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* — The one page that has to survive the meeting — */}
        <section id="vragen" className="mt-16 scroll-mt-24 border-t-2 border-[var(--color-ink)] pt-8">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-uitwijken)]">
            <T nl="Één pagina" en="One page" />
          </div>
          <h2 className="mb-3 font-sans text-3xl font-bold leading-tight tracking-tight">
            <T nl="Vragen aan Amsterdam" en="Questions for Amsterdam" />
          </h2>
          <p className="mb-8 max-w-3xl text-[16px] leading-relaxed text-[#2a2926]">
            <T
              nl="Zes vragen die beantwoord moeten zijn voordat iemand kan beslissen of er een nieuw platform nodig is. Ze zijn geen kritiek — ze zijn de opdracht die deze atlas voor zichzelf ziet."
              en="Six questions that need answering before anyone can decide whether a new platform is needed. They are not a criticism — they are the assignment this atlas sets itself."
            />
          </p>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-2">
            {QUESTIONS.map((q) => (
              <div key={q.n} className="bg-white p-5">
                <div className="mb-2 font-serif text-xl italic text-[var(--color-uitwijken)]">
                  {q.n}
                </div>
                <h3 className="mb-2 font-sans text-lg font-bold leading-snug tracking-tight">
                  <T {...q.q} />
                </h3>
                <p className="text-[14px] leading-relaxed text-[#2a2926]">
                  <T {...q.why} />
                </p>
              </div>
            ))}
            <div className="bg-[#faf9f5] p-5">
              <p className="text-[14px] leading-relaxed text-[var(--color-secondary)]">
                <T
                  nl="Zolang deze zes open staan, is 'nog een platform bouwen' geen beslissing maar een gok. Dat is waarom Uitwijken voorlopig een kaart is en geen bestemming."
                  en="As long as these six are open, 'build another platform' is not a decision but a bet. That is why Uitwijken is a map for now, and not a destination."
                />
              </p>
            </div>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4 border-t border-[var(--color-rule)] pt-6 text-[13.5px]">
          <Link
            href="/atlas"
            className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T nl="← Terug naar de atlas" en="← Back to the atlas" />
          </Link>
          <Link
            href="/atlas/submit"
            className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T nl="Vul een gat in de kaart →" en="Fill a gap in the map →" />
          </Link>
        </div>
      </div>
    </div>
  );
}
