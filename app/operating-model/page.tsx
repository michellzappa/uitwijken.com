import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CircleAlert,
  GitBranch,
  Landmark,
  Scale,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { TopBar, PageHeader } from "../components/Nav";
import { RoleTag } from "../components/CivicUI";
import { T } from "../lib/i18n";

type DecisionType = "binding" | "advisory" | "informative";

const DECISION_META: Record<DecisionType, { nl: string; en: string; cls: string }> = {
  binding: {
    nl: "Bindend",
    en: "Binding",
    cls: "bg-[var(--color-ink)] text-white",
  },
  advisory: {
    nl: "Adviserend",
    en: "Advisory",
    cls: "bg-[var(--color-uitwijken-soft)] text-[#7a3418]",
  },
  informative: {
    nl: "Informatief",
    en: "Informative",
    cls: "bg-[var(--color-civic-soft)] text-[#164a72]",
  },
};

function DecisionTag({ type }: { type: DecisionType }) {
  const meta = DECISION_META[type];
  return (
    <span className={`inline-flex rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${meta.cls}`}>
      <T nl={meta.nl} en={meta.en} />
    </span>
  );
}

function ModelCard({
  icon: Icon,
  eyebrow,
  title,
  body,
  boundary,
  role,
}: {
  icon: typeof Scale;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
  boundary: React.ReactNode;
  role?: "resident" | "government" | "entrepreneur";
}) {
  return (
    <div className="border border-[var(--color-rule)] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[var(--color-uitwijken-soft)] text-[var(--color-uitwijken)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        {role && <RoleTag role={role} />}
      </div>
      <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-uitwijken)]">{eyebrow}</div>
      <h2 className="mt-2 font-sans text-[21px] font-bold leading-tight tracking-tight">{title}</h2>
      <p className="mt-3 text-[13.5px] leading-relaxed text-[#2a2926]">{body}</p>
      <div className="mt-4 border-t border-[var(--color-rule)] pt-3 text-[12px] leading-relaxed text-[var(--color-secondary)]">
        <span className="font-semibold text-[var(--color-ink)]">
          <T nl="Niet:" en="Not:" />
        </span>{" "}
        {boundary}
      </div>
    </div>
  );
}

function ModelSection({
  number,
  question,
  answer,
  body,
  children,
}: {
  number: string;
  question: React.ReactNode;
  answer: React.ReactNode;
  body: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section id={`vraag-${number}`} className="scroll-mt-32 border-t border-[var(--color-rule)] py-8 first:border-t-0 first:pt-0">
      <div className="grid grid-cols-[48px_1fr] gap-4 md:grid-cols-[64px_1fr] md:gap-6">
        <div className="font-serif text-[34px] italic leading-none text-[var(--color-uitwijken)]">{number}</div>
        <div>
          <h2 className="font-sans text-[21px] font-bold leading-tight tracking-tight text-[var(--color-ink)]">{question}</h2>
          <p className="mt-3 text-[17px] font-semibold leading-snug text-[var(--color-ink)]">{answer}</p>
          <p className="mt-3 max-w-3xl text-[14px] leading-[1.65] text-[#2a2926]">{body}</p>
          {children && <div className="mt-5">{children}</div>}
        </div>
      </div>
    </section>
  );
}

function DecisionRow({
  type,
  title,
  body,
  example,
}: {
  type: DecisionType;
  title: React.ReactNode;
  body: React.ReactNode;
  example: React.ReactNode;
}) {
  return (
    <div className="grid gap-2 border-t border-[var(--color-rule)] py-4 first:border-t-0 md:grid-cols-[118px_1fr_1.1fr] md:gap-5">
      <div><DecisionTag type={type} /></div>
      <div className="text-[13px] font-semibold leading-snug">{title}</div>
      <div className="text-[12.5px] leading-relaxed text-[#2a2926]">
        <div>{body}</div>
        <div className="mt-1 text-[var(--color-secondary)]">
          <span className="font-semibold text-[var(--color-ink)]"><T nl="Voorbeeld:" en="Example:" /></span>{" "}{example}
        </div>
      </div>
    </div>
  );
}

export default function OperatingModelPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Werkvoorstel · operating model · pilot" en="Working proposal · operating model · pilot" />}
        title={<T nl="Wie houdt de laag vast als de politiek verandert?" en="Who holds the layer when politics changes?" />}
        subtitle={
          <T
            nl="Een werkbaar antwoord op de acht vragen die tussen een goed idee en een duurzame civic commons staan. Dit is een voorstel voor de pilot — niet het eindstation en geen juridisch advies."
            en="A workable answer to the eight questions between a good idea and a durable civic commons. This is a pilot proposal—not the final form and not legal advice."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mb-8 grid gap-3 border border-[var(--color-ink)] bg-white p-5 md:grid-cols-[1.2fr_1fr_1fr_1fr] md:gap-0">
          <div className="border-b border-[var(--color-rule)] pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-uitwijken)]">
              <T nl="De kern" en="The core" />
            </div>
            <div className="mt-2 font-serif text-[25px] italic leading-tight">
              <T nl="Één publieke laag, vier gescheiden verantwoordelijkheden." en="One public layer, four separated responsibilities." />
            </div>
          </div>
          <div className="border-b border-[var(--color-rule)] py-4 md:border-b-0 md:border-r md:px-5 md:py-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]"><T nl="Juridisch" en="Legal" /></div>
            <div className="mt-2 text-[15px] font-semibold leading-snug"><T nl="Bewonersvereniging" en="Resident-owned association" /></div>
            <div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="één lid, één stem" en="one member, one vote" /></div>
          </div>
          <div className="border-b border-[var(--color-rule)] py-4 md:border-b-0 md:border-r md:px-5 md:py-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]"><T nl="Techniek" en="Technology" /></div>
            <div className="mt-2 text-[15px] font-semibold leading-snug"><T nl="Vervangbare tech-steward" en="Replaceable tech steward" /></div>
            <div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="open code, portable data" en="open code, portable data" /></div>
          </div>
          <div className="py-4 md:py-0 md:pl-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]"><T nl="Overheid" en="Municipality" /></div>
            <div className="mt-2 text-[15px] font-semibold leading-snug"><T nl="Financiert, publiceert, antwoordt" en="Funds, publishes, answers" /></div>
            <div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="maar bezit of redigeert niet" en="but does not own or edit" /></div>
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-2 text-[11px] text-[var(--color-secondary)]">
          <a href="#vraag-1" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="1 Eigenaar" en="1 Owner" /></a>
          <a href="#vraag-2" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="2 Technologie" en="2 Technology" /></a>
          <a href="#vraag-3" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="3 Moderatie" en="3 Moderation" /></a>
          <a href="#vraag-4" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="4 Gemeente" en="4 Municipality" /></a>
          <a href="#vraag-5" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="5 Aansprakelijkheid" en="5 Liability" /></a>
          <a href="#vraag-6" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="6 Besluiten" en="6 Decisions" /></a>
          <a href="#vraag-7" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="7 Beroep" en="7 Appeal" /></a>
          <a href="#vraag-8" className="rounded-sm border border-[var(--color-rule)] bg-white px-2.5 py-1 hover:border-[var(--color-ink)]"><T nl="8 Continuïteit" en="8 Continuity" /></a>
        </div>

        <section className="mb-12">
          <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-uitwijken)]">
            <T nl="De verantwoordelijkheden" en="The responsibilities" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <ModelCard
              icon={Scale}
              eyebrow={<T nl="Juridisch eigenaar" en="Legal owner" />}
              title={<T nl="Vereniging Uitwijken" en="Uitwijken Association" />}
              body={<T nl="Een ledenvereniging van geverifieerde bewoners bezit de naam, code, data-infrastructuur en contracten. De algemene ledenvergadering kiest het bestuur en beschermt het publieke doel." en="A member association of verified residents owns the name, code, data infrastructure, and contracts. Its general members' assembly elects the board and protects the public purpose." />}
              boundary={<T nl="de gemeente, ondernemer of tech-leverancier krijgt geen eigendoms- of benoemingsmacht." en="the municipality, a business, or a tech provider gets no ownership or appointment power." />}
              role="resident"
            />
            <ModelCard
              icon={GitBranch}
              eyebrow={<T nl="Technisch beheer" en="Technical operation" />}
              title={<T nl="Een onafhankelijke tech-steward" en="An independent tech steward" />}
              body={<T nl="Een non-profit of missiegebonden leverancier runt hosting, security, releases, back-ups, data-ingestie en toegankelijkheid onder opdracht van de vereniging." en="A non-profit or mission-led provider runs hosting, security, releases, backups, data ingestion, and accessibility under contract to the association." />}
              boundary={<T nl="de tech-steward maakt geen inhoudsregels, kiest geen prioriteiten en kan worden vervangen zonder dat de gemeenschap haar data verliest." en="the tech steward does not make content rules, choose priorities, or become irreplaceable through data lock-in." />}
            />
            <ModelCard
              icon={UsersRound}
              eyebrow={<T nl="Community & moderatie" en="Community & moderation" />}
              title={<T nl="Lokale moderatieborden" en="Local moderation boards" />}
              body={<T nl="Formele gebieden en thema's krijgen een fysiek bestaand, aanspreekbaar moderatiebord. Informele initiatieven krijgen lichtere, deelnemer-gestuurde regels." en="Formal areas and themes get a physically rooted, accountable moderation board. Informal initiatives get lighter, participant-led rules." />}
              boundary={<T nl="de moderator is geen onzichtbare platformbeheerder en de gemeente krijgt geen speciale surveillance-laag." en="a moderator is not an invisible platform administrator and the municipality gets no special surveillance layer." />}
            />
            <ModelCard
              icon={Landmark}
              eyebrow={<T nl="Gemeentelijke rol" en="Municipal role" />}
              title={<T nl="Financieren, publiceren, antwoorden" en="Fund, publish, answer" />}
              body={<T nl="De gemeente financiert publieke functies, brengt officiële data en vragen in, en koppelt terug wat met input gebeurt. Zij blijft bevoegd voor haar eigen wettelijke besluiten." en="The municipality funds public functions, brings official data and questions, and reports what happens with input. It remains responsible for its own statutory decisions." />}
              boundary={<T nl="de gemeente wordt geen eigenaar, eindredacteur of verborgen doelgroepbeheerder." en="the municipality does not become owner, editor-in-chief, or hidden audience manager." />}
              role="government"
            />
          </div>
        </section>

        <section className="mb-12 border border-[var(--color-ink)] bg-white p-5 md:p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-uitwijken)]">
            <T nl="De eigendomstest" en="The ownership test" />
          </div>
          <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-tight">
            <T nl="Community-owned betekent macht, niet alleen inspraak." en="Community-owned means power, not just consultation." />
          </h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-[1.65] text-[#2a2926]">
            <T
              nl="Als bewoners niet kunnen kiezen wie bestuurt, de kernregels beschermen, zien wat er met geld en data gebeurt en een ongewenste overdracht tegenhouden, is het platform niet van de gemeenschap — ook al worden bewoners vaak geraadpleegd."
              en="If residents cannot choose who governs, protect the core rules, see what happens with money and data, and stop an unwanted transfer, the platform is not community-owned—even if residents are frequently consulted."
            />
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <div className="border border-[var(--color-rule)] p-4"><div className="text-[12px] font-semibold"><T nl="Bestuur" en="Governance" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Bewoners kiezen en kunnen het bestuur terugroepen." en="Residents elect and can recall the board." /></div></div>
            <div className="border border-[var(--color-rule)] p-4"><div className="text-[12px] font-semibold"><T nl="Koers" en="Direction" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Bewoners stemmen over charter en missie." en="Residents vote on the charter and mission." /></div></div>
            <div className="border border-[var(--color-rule)] p-4"><div className="text-[12px] font-semibold"><T nl="Bezittingen" en="Assets" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Code, data en geld zijn transparant en overdraagbaar." en="Code, data, and money are transparent and portable." /></div></div>
            <div className="border border-[var(--color-rule)] p-4"><div className="text-[12px] font-semibold"><T nl="Uittreden" en="Exit" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Geen verkoop, fusie of sluiting zonder ledenbesluit." en="No sale, merger, or closure without a member decision." /></div></div>
          </div>
        </section>

        <div className="max-w-4xl">
          <ModelSection
            number="01"
            question={<T nl="Wie is juridisch eigenaar?" en="Who legally owns the platform?" />}
            answer={<T nl="Een bewonersvereniging: geverifieerde bewoners zijn lid en hebben één stem." en="A resident-owned association: verified residents are members with one vote each." />}
            body={<T nl="De vereniging is de contractpartij voor hosting, personeel, verzekeringen, subsidies en partnerships. Bewoners kiezen en kunnen minstens de meerderheid van het bestuur terugroepen, stemmen over het charter en keuren grote wijzigingen aan eigendom, data, licentie, fusie of sluiting goed. Bewonersorganisaties kunnen partnerlid worden; gemeente en ondernemers doen mee als deelnemer of adviseur, maar krijgen geen stem die bewoners kan overrulen. De statuten moeten met een notaris en governance-ontwerper worden uitgewerkt." en="The association is the contracting party for hosting, staff, insurance, grants, and partnerships. Residents elect and can recall at least a majority of the board, vote on the charter, and approve major changes to ownership, data, licensing, merger, or closure. Resident organizations can join as partner members; the municipality and businesses participate as participants or advisors, but get no vote that can override residents. The statutes need to be developed with a notary and governance designer." />}
          >
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border border-[var(--color-rule)] bg-white p-4"><div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-uitwijken)]"><T nl="Beschermd" en="Protected" /></div><div className="mt-2 text-[13px] leading-relaxed"><T nl="Publiek doel, open code, geen verkoop of advertenties." en="Public purpose, open code, no sale or advertising." /></div></div>
              <div className="border border-[var(--color-rule)] bg-white p-4"><div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-uitwijken)]"><T nl="Gedeeld" en="Shared" /></div><div className="mt-2 text-[13px] leading-relaxed"><T nl="Bewoners hebben formele invloed op charter en bestuur." en="Residents have formal influence over the charter and board." /></div></div>
              <div className="border border-[var(--color-rule)] bg-white p-4"><div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-uitwijken)]"><T nl="Vervangbaar" en="Replaceable" /></div><div className="mt-2 text-[13px] leading-relaxed"><T nl="Geen gemeente- of leveranciersafhankelijkheid." en="No dependence on the municipality or a single supplier." /></div></div>
            </div>
          </ModelSection>

          <ModelSection
            number="02"
            question={<T nl="Wie runt de technologie?" en="Who runs the technology?" />}
            answer={<T nl="Een onafhankelijke tech-steward, onder opdracht van de vereniging." en="An independent tech steward, contracted by the association." />}
            body={<T nl="De tech-steward is verantwoordelijk voor beschikbaarheid, beveiliging, updates, back-ups, open-data pipelines, toegankelijkheid en incidentrespons. De opdracht is transparant en overdraagbaar: code staat onder een open-source licentie, data kan worden geëxporteerd en minstens twee partijen moeten het systeem kunnen overnemen." en="The tech steward is responsible for availability, security, updates, backups, open-data pipelines, accessibility, and incident response. The mandate is transparent and transferable: code uses an open-source license, data can be exported, and at least two parties should be able to take over the system." />}
          />

          <ModelSection
            number="03"
            question={<T nl="Wie bestuurt inhoud en moderatie?" en="Who governs content and moderation?" />}
            answer={<T nl="De gemeenschap bestuurt de normen; lokale moderatieborden passen ze toe." en="The community governs the norms; local moderation boards apply them." />}
            body={<T nl="Formele ruimtes rond budgetten, plannen en publieke besluiten hebben duidelijke deelnamecriteria, publieke regels, een fysiek geworteld moderatiebord en een beroepstermijn. Informele ruimtes mogen lichter zijn. Een centrale safety-functie behandelt urgente veiligheids- en onwettige-contentzaken volgens dezelfde openbare regels, zonder gemeentelijke inhoudscontrole." en="Formal spaces around budgets, plans, and public decisions have clear participation criteria, public rules, a physically rooted moderation board, and an appeal deadline. Informal spaces may be lighter. A central safety function handles urgent safety and illegal-content cases under the same public rules, without municipal editorial control." />}
          >
            <div className="flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-rule)] bg-white px-3 py-2 text-[12px]"><CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" /><T nl="Regels zijn openbaar" en="Rules are public" /></div>
              <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-rule)] bg-white px-3 py-2 text-[12px]"><CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" /><T nl="Besluiten krijgen redenen" en="Decisions have reasons" /></div>
              <div className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-rule)] bg-white px-3 py-2 text-[12px]"><CheckCircle2 className="h-4 w-4 text-[var(--color-success)]" /><T nl="Beroep is mogelijk" en="Appeal is possible" /></div>
            </div>
          </ModelSection>

          <ModelSection
            number="04"
            question={<T nl="Wat financiert, publiceert en beslist de gemeente?" en="What does the municipality fund, publish, and decide?" />}
            answer={<T nl="Zij financiert de publieke functie, publiceert officiële context en beslist alleen waar zij wettelijk bevoegd voor is." en="It funds the public function, publishes official context, and decides only where it has statutory authority." />}
            body={<T nl="De gemeente krijgt een vaste liaison en een meerjarige overeenkomst met de vereniging. Geld gaat naar kerncapaciteit: toegankelijkheid, security, moderation support, open-data ontsluiting, community connectors en evaluatie. De gemeente publiceert plannen, vergunningen, budgetten, deadlines en terugkoppelingen. Zij beslist zelf over gemeentelijke besluiten; bewonersinput maakt die besluiten beter, maar vervangt de wettelijke bevoegdheid niet." en="The municipality gets a standing liaison and a multi-year agreement with the association. Funding goes to core capacity: accessibility, security, moderation support, open-data access, community connectors, and evaluation. The municipality publishes plans, permits, budgets, deadlines, and responses. It decides its own municipal matters; resident input improves those decisions but does not replace statutory authority." />}
          >
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border-l-4 border-[var(--color-uitwijken)] bg-white p-4"><div className="font-semibold text-[13px]"><T nl="Financiert" en="Funds" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Publieke infrastructuur, niet redactionele controle." en="Public infrastructure, not editorial control." /></div></div>
              <div className="border-l-4 border-[var(--color-civic)] bg-white p-4"><div className="font-semibold text-[13px]"><T nl="Publiceert" en="Publishes" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Brondata, plannen, besluiten, termijnen en antwoorden." en="Source data, plans, decisions, deadlines, and responses." /></div></div>
              <div className="border-l-4 border-[var(--color-moss)] bg-white p-4"><div className="font-semibold text-[13px]"><T nl="Beslist" en="Decides" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Alleen over eigen wettelijke bevoegdheden." en="Only within its own statutory authority." /></div></div>
            </div>
          </ModelSection>

          <ModelSection
            number="05"
            question={<T nl="Wie is aansprakelijk voor schadelijke of onwettige inhoud?" en="Who is liable for harmful or unlawful content?" />}
            answer={<T nl="De vereniging is het eerste aanspreekbare platform; iedere bron blijft verantwoordelijk voor zijn eigen officiële publicaties en besluiten." en="The association is the first accountable platform operator; each source remains responsible for its own official publications and decisions." />}
            body={<T nl="De vereniging organiseert notice-and-action, snelle escalatie, moderation logs, verzekeringen en een contactpunt voor bevoegde instanties. De tech-steward handelt als uitvoerende verwerker/operator onder contract en meldt incidenten. Gemeentelijke content blijft herkenbaar als gemeentelijke bron. Moderatieborden krijgen duidelijke bevoegdheden en bescherming; zij dragen niet persoonlijk de volledige platformlast." en="The association organizes notice-and-action, rapid escalation, moderation logs, insurance, and a contact point for competent authorities. The tech steward acts as the contracted operational processor/operator and reports incidents. Municipal content remains identifiable as municipal-source content. Moderation boards get clear powers and protection; they do not personally carry the entire platform burden." />}
          >
            <div className="flex items-start gap-3 border border-[var(--color-rule)] bg-[#fffaf0] p-4 text-[12.5px] leading-relaxed text-[#5f4a25]">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#b57900]" aria-hidden="true" />
              <T nl="Voor livegang moet Nederlands juridisch advies dit vertalen naar de precieze rollen, procedures, contracten, bewaartermijnen en meldroutes. Deze pagina legt de verantwoordelijkheidstoedeling vast als ontwerpkeuze, niet als juridisch oordeel." en="Before launch, Dutch legal advice must translate this into the exact roles, procedures, contracts, retention periods, and reporting routes. This page sets the responsibility split as a design choice, not a legal opinion." />
            </div>
          </ModelSection>

          <ModelSection
            number="06"
            question={<T nl="Welke besluiten zijn bindend, adviserend of informatief?" en="Which decisions are binding, advisory, or informative?" />}
            answer={<T nl="De bevoegdheid staat altijd naast de uitkomst, zodat een stem nooit meer belooft dan de beslisser kan waarmaken." en="Authority is always shown next to the outcome, so a vote never promises more than its decision-maker can deliver." />}
            body={<T nl="Elke survey, planreactie en communityregel krijgt een zichtbaar besluitlabel, de bevoegde actor, een sluitingsdatum en een terugkoppeldatum. ‘Bewoners hebben geprioriteerd’ is dus niet hetzelfde als ‘de gemeente heeft besloten’." en="Every survey, plan response, and community rule gets a visible decision label, the responsible actor, a closing date, and a response date. ‘Residents prioritized’ is therefore not the same as ‘the municipality decided’." />}
          >
            <div className="border border-[var(--color-rule)] bg-white px-4">
              <DecisionRow
                type="binding"
                title={<T nl="Een bevoegde actor neemt het besluit" en="An authorized actor makes the decision" />}
                body={<T nl="Bindend binnen de wettelijke of statutaire bevoegdheid; reden, mandaat en beroep zijn zichtbaar." en="Binding within legal or charter authority; reason, mandate, and appeal are visible." />}
                example={<T nl="een gemeentelijk besluit, een charterwijziging, een platform-safetybesluit" en="a municipal decision, a charter amendment, a platform safety decision" />}
              />
              <DecisionRow
                type="advisory"
                title={<T nl="Bewoners en deelnemers geven richting" en="Residents and participants set direction" />}
                body={<T nl="De ontvanger moet publiek reageren: overgenomen, aangepast of afgewezen — met reden en termijn." en="The recipient must respond publicly: adopted, changed, or declined—with a reason and date." />}
                example={<T nl="buurtbudget-prioriteit, feedback op een plan, thematische enquête" en="neighborhood-budget priority, plan feedback, a theme survey" />}
              />
              <DecisionRow
                type="informative"
                title={<T nl="Een bron maakt iets vindbaar" en="A source makes something findable" />}
                body={<T nl="Geen stem en geen besluit; provenance, datum en bronlink blijven zichtbaar." en="No vote and no decision; provenance, date, and source link remain visible." />}
                example={<T nl="een event, vergunningpublicatie, open dataset, deadline" en="an event, permit publication, open dataset, deadline" />}
              />
            </div>
          </ModelSection>

          <ModelSection
            number="07"
            question={<T nl="Hoe kan een bewoner in beroep gaan?" en="How can a resident appeal?" />}
            answer={<T nl="Via één herkenbare, getimede beroepsroute met een publieke reden en een onafhankelijke tweede blik." en="Through one recognizable, time-bound appeal route with a public reason and an independent second look." />}
            body={<T nl="Een bewoner kan bezwaar maken tegen een moderatiebesluit, deelnamebesluit of procedurele fout. Het oorspronkelijke besluit blijft zichtbaar met reden en status. Eerst heroverweegt het lokale moderatiebord; daarna kan een onafhankelijke appeal panel of de vereniging escaleren. Bij gemeentelijke besluiten verwijst het platform door naar de formele gemeentelijke bezwaarroute — het platform doet niet alsof een civic thread die route vervangt." en="A resident can challenge a moderation decision, participation decision, or procedural error. The original decision remains visible with reason and status. First the local moderation board reconsiders; then an independent appeal panel or the association can escalate. For municipal decisions, the platform points to the formal municipal objection route—it does not pretend a civic thread replaces it." />}
          >
            <div className="grid gap-2 md:grid-cols-4">
              {[
                { n: "1", nl: "Meld", en: "Flag" },
                { n: "2", nl: "Hoor reden", en: "See reason" },
                { n: "3", nl: "Herzie lokaal", en: "Review locally" },
                { n: "4", nl: "Escalatie", en: "Escalate" },
              ].map((step) => (
                <div key={step.n} className="flex items-center gap-2 border border-[var(--color-rule)] bg-white p-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-[11px] font-semibold text-white">{step.n}</span>
                  <span className="text-[12px] font-semibold"><T nl={step.nl} en={step.en} /></span>
                </div>
              ))}
            </div>
          </ModelSection>

          <ModelSection
            number="08"
            question={<T nl="Hoe overleeft het platform een politieke wisseling?" en="How does the platform survive a change of political leadership?" />}
            answer={<T nl="Door de relatie met de gemeente institutioneel te maken, de code overdraagbaar te houden en de gemeenschap formele beschermingsmacht te geven." en="By making the municipal relationship institutional, keeping the code transferable, and giving the community formal protective power." />}
            body={<T nl="De vereniging sluit een meerjarige publieke overeenkomst met transparante doelen, financiering en service-afspraken — niet een persoonlijk akkoord met één wethouder of ambtenaar. Een vaste gemeentelijke liaison bewaakt continuïteit. De vereniging publiceert jaarlijks financiën, moderatie- en impactrapportage. Open code, exporteerbare data, documentatie en een overdraagbaar contract maken een nieuwe tech-partner mogelijk. De algemene ledenvergadering bewaakt het charter wanneer bestuur of politieke wind verandert." en="The association signs a multi-year public agreement with transparent goals, funding, and service commitments—not a personal deal with one alderperson or civil servant. A standing municipal liaison protects continuity. The association publishes annual financial, moderation, and impact reports. Open code, exportable data, documentation, and a transferable contract make a new tech partner possible. The general members' assembly protects the charter when leadership or political winds change." />}
          >
            <div className="grid gap-3 md:grid-cols-3">
              <div className="border border-[var(--color-rule)] bg-white p-4"><ShieldCheck className="h-5 w-5 text-[var(--color-moss)]" aria-hidden="true" /><div className="mt-2 text-[13px] font-semibold"><T nl="Charter" en="Charter" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Publieke waarden zijn niet afhankelijk van een bestuurstermijn." en="Public values do not depend on a term in office." /></div></div>
              <div className="border border-[var(--color-rule)] bg-white p-4"><GitBranch className="h-5 w-5 text-[var(--color-moss)]" aria-hidden="true" /><div className="mt-2 text-[13px] font-semibold"><T nl="Portabiliteit" en="Portability" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Code, data en leveranciers zijn verwisselbaar." en="Code, data, and suppliers can be switched." /></div></div>
              <div className="border border-[var(--color-rule)] bg-white p-4"><UsersRound className="h-5 w-5 text-[var(--color-moss)]" aria-hidden="true" /><div className="mt-2 text-[13px] font-semibold"><T nl="Publieke verantwoording" en="Public accountability" /></div><div className="mt-1 text-[12px] leading-relaxed text-[var(--color-secondary)]"><T nl="Jaarlijks zichtbaar: geld, moderatie, bereik en uitkomsten." en="Visible yearly: money, moderation, reach, and outcomes." /></div></div>
            </div>
          </ModelSection>
        </div>

        <section className="mt-12 border-t-2 border-[var(--color-ink)] pt-8">
          <div className="grid gap-8 md:grid-cols-[1.25fr_0.75fr]">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-uitwijken)]"><T nl="Wat nu nog moet worden besloten" en="What still needs to be decided" /></div>
              <h2 className="mt-3 font-sans text-2xl font-bold leading-tight tracking-tight"><T nl="Dit is de eerste bestuurlijke versie." en="This is the first governance version." /></h2>
              <p className="mt-3 max-w-2xl text-[14px] leading-[1.65] text-[#2a2926]"><T nl="De pilot kan hiermee een echt gesprek voeren: niet alleen ‘vinden jullie dit een goed idee?’, maar ‘welke partij neemt welke verantwoordelijkheid, met welk mandaat en welke terugkoppeling?’" en="The pilot can now have a real conversation: not only ‘do you like the idea?’, but ‘which party takes which responsibility, with what mandate and what response?’" /></p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href="/governance" className="inline-flex items-center gap-1.5 border border-[var(--color-rule)] bg-white px-3 py-2 text-[12px] font-semibold text-[var(--color-link)] hover:border-[var(--color-ink)]"><T nl="Terug naar governance" en="Back to governance" /><ArrowRight className="h-3.5 w-3.5" /></Link>
                <Link href="/docs/operating-model" className="inline-flex items-center gap-1.5 border border-[var(--color-rule)] bg-white px-3 py-2 text-[12px] font-semibold text-[var(--color-link)] hover:border-[var(--color-ink)]"><T nl="Lees als wiki-pagina" en="Read as wiki page" /><ArrowRight className="h-3.5 w-3.5" /></Link>
              </div>
            </div>
            <div className="border border-[var(--color-rule)] bg-white p-4 text-[12.5px] leading-relaxed text-[var(--color-secondary)]">
              <div className="flex items-center gap-2 text-[var(--color-ink)]"><CircleAlert className="h-4 w-4 text-[var(--color-uitwijken)]" aria-hidden="true" /><span className="font-semibold"><T nl="Voor de eerste pilot" en="Before the first pilot" /></span></div>
              <ul className="mt-3 space-y-2">
                <li>• <T nl="legale vorm en statuten toetsen" en="review legal form and statutes" /></li>
                <li>• <T nl="moderatie- en beroepsprocedure testen" en="test moderation and appeal procedure" /></li>
                <li>• <T nl="gemeentelijk mandaat en terugkoppeling vastleggen" en="define municipal mandate and response" /></li>
                <li>• <T nl="meerjarige financiering en exit-plan begroten" en="budget multi-year funding and an exit plan" /></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
