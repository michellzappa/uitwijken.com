import { TopBar, PageHeader } from "../components/Nav";
import { AppTopBar } from "../components/PhoneChrome";
import { PhoneFrame } from "../components/PhoneFrame";
import { MockRef, PrimitiveTag, RoleTag, ScaleRail, ThemePill } from "../components/CivicUI";
import type { CivicRole } from "../components/CivicUI";
import { T } from "../lib/i18n";

type AskType = "gevraagd" | "aangeboden" | "samen";

const askTypeMeta: Record<AskType, { nl: string; en: string; cls: string }> = {
  gevraagd: { nl: "Gevraagd", en: "Asked", cls: "bg-[var(--color-uitwijken-soft)] text-[#7a3418]" },
  aangeboden: { nl: "Aangeboden", en: "Offered", cls: "bg-[#dfe6d5] text-[#33501e]" },
  samen: { nl: "Samen doen", en: "Together", cls: "bg-[var(--color-civic-soft)] text-[#164a72]" },
};

function AskCard({
  type,
  role,
  title,
  meta,
  body,
  action,
}: {
  type: AskType;
  role: CivicRole;
  title: React.ReactNode;
  meta: React.ReactNode;
  body?: React.ReactNode;
  action: React.ReactNode;
}) {
  const t = askTypeMeta[type];
  return (
    <div className="rounded-sm border border-[var(--color-rule)] bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold text-[13px] leading-snug">{title}</div>
        <span className={`shrink-0 rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${t.cls}`}>
          <T nl={t.nl} en={t.en} />
        </span>
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        <PrimitiveTag kind="ask" />
        <span className="text-[11px] text-[var(--color-secondary)]">{meta}</span>
      </div>
      {body && <div className="mt-2 text-[12.5px] leading-relaxed text-[#23251f]">{body}</div>}
      <div className="mt-2.5 flex items-center justify-between border-t border-[var(--color-rule)] pt-2">
        <RoleTag role={role} />
        <button className="text-[12px] font-semibold text-[var(--color-link)] underline underline-offset-2">
          {action} →
        </button>
      </div>
    </div>
  );
}

export default function AsksMock() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Mock 03 · bouwblok · wederkerigheid" en="Mock 03 · building block · reciprocity" />}
        title={<T nl="Vraag & aanbod — het individu doet mee" en="Asks & offers — the individual takes part" />}
        subtitle={
          <T
            nl="Niet iedereen organiseert een event of beantwoordt een enquête. Maar bijna iedereen wil af en toe iets vragen of iets aanbieden: hulp bij een klus, boodschappen voor een buur, of gewoon — wie speelt er mee? Dit bouwblok geeft die kleine, persoonlijke handelingen een vorm zonder er een marktplaats van te maken."
            en="Not everyone organizes an event or answers a survey. But almost everyone occasionally wants to ask for or offer something: help with a task, groceries for a neighbor, or simply — who's in? This building block gives those small, personal acts a shape without turning into a marketplace."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 -mt-4 pb-6 flex flex-wrap gap-2">
        <MockRef href="/events" label={<T nl="Wordt vaak een event" en="Often becomes an event" />} />
        <MockRef href="/threads" label={<T nl="Krijgt een gesprek" en="Gets a thread" />} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 flex gap-10 flex-wrap">
        <PhoneFrame
          title={<T nl="Vraag & aanbod" en="Asks & offers" />}
          caption={<T nl="Straat & buurt · alles openbaar" en="Street & neighborhood · all public" />}
          annot={
            <T
              nl="Een beetje structuur stuurt gedrag: drie typen (gevraagd, aangeboden, samen doen), gekoppeld aan plek en thema. Geen geld, geen diensten als bedrijf — wederkerigheid tussen buren."
              en="A little structure shapes behavior: three types (asked, offered, together), tied to place and theme. No money, no business services — reciprocity between neighbors."
            />
          }
        >
          <AppTopBar left={<T nl="Kaart" en="Map" />} center={<T nl="Vraag & aanbod" en="Asks & offers" />} right={<span>＋</span>} />
          <ScaleRail active="street" />
          <div className="px-4 py-3 border-b border-[var(--color-rule)] flex gap-2 overflow-x-auto">
            <ThemePill label={<T nl="Alles" en="All" />} active />
            <ThemePill label={<T nl="Gevraagd" en="Asked" />} />
            <ThemePill label={<T nl="Aangeboden" en="Offered" />} />
            <ThemePill label={<T nl="Samen doen" en="Together" />} />
          </div>
          <div className="space-y-2 bg-[#fafaf7] px-4 py-4">
            <AskCard
              type="gevraagd"
              role="resident"
              title={<T nl="Wie helpt mevrouw Yıldız met boodschappen?" en="Who can help Mrs. Yıldız with groceries?" />}
              meta={<T nl="Balistraat · zorg · 11 buren volgen" en="Balistraat · care · 11 neighbors following" />}
              body={<T nl="Eens per week, ±30 minuten. Loopafstand." en="Once a week, ±30 minutes. Walking distance." />}
              action={<T nl="Ik help" en="I'll help" />}
            />
            <AskCard
              type="aangeboden"
              role="resident"
              title={<T nl="Ik help met klussen — kast, plank, klein meubel" en="I'll help with DIY — closet, shelf, small furniture" />}
              meta={<T nl="Indische Buurt · wonen · geen kosten" en="Indische Buurt · housing · no charge" />}
              body={<T nl="Hobby, geen bedrijf. Gereedschap aanwezig." en="Hobby, not a business. I have the tools." />}
              action={<T nl="Vraag aan" en="Request" />}
            />
            <AskCard
              type="samen"
              role="resident"
              title={<T nl="Donderdag Dungeons & Dragons — wie speelt mee?" en="Thursday Dungeons & Dragons — who's in?" />}
              meta={<T nl="Javastraat · spel · 3/5 plekken" en="Javastraat · play · 3/5 seats" />}
              action={<T nl="Doe mee" en="Join" />}
            />
            <AskCard
              type="samen"
              role="resident"
              title={<T nl="Vibe-coding avond opzetten — wie helpt mee organiseren?" en="Setting up a vibe-coding night — who helps organize?" />}
              meta={<T nl="Buurt · tech · zoekt een plek" en="Neighborhood · tech · needs a venue" />}
              body={<T nl="Geen format nog. Wie heeft een ruimte en zin?" en="No format yet. Who has a space and is keen?" />}
              action={<T nl="Help opzetten" en="Help set up" />}
            />
            <AskCard
              type="aangeboden"
              role="entrepreneur"
              title={<T nl="Bakkerij Anatolia: kleine zaal vrij op dinsdag" en="Anatolia Bakery: small room free on Tuesdays" />}
              meta={<T nl="Javastraat · ruimte · voor buurtinitiatief" en="Javastraat · space · for neighborhood use" />}
              action={<T nl="Reserveer" en="Reserve" />}
            />
          </div>
          <div className="px-4 py-4 border-t border-[var(--color-rule)]">
            <button className="w-full rounded-lg bg-[var(--color-uitwijken)] py-3 text-[13px] font-semibold text-white">
              <T nl="+ Iets vragen of aanbieden" en="+ Ask or offer something" />
            </button>
            <div className="mt-2 text-center text-[11px] text-[var(--color-secondary)]">
              <T nl="Openbaar · zichtbaar voor je buurt" en="Public · visible to your neighborhood" />
            </div>
          </div>
        </PhoneFrame>

        <div className="max-w-md pt-3">
          <div className="text-xs uppercase tracking-widest text-[var(--color-uitwijken)] mb-3">
            <T nl="Wat dit bouwblok bewijst" en="What this building block proves" />
          </div>
          <h2 className="font-sans font-bold text-3xl tracking-tight leading-[1.15] mb-4">
            <T
              nl="De gemeenschap ontstaat als individuen iets voor elkaar doen."
              en="Community happens when individuals do something for each other."
            />
          </h2>
          <p className="text-[15px] leading-relaxed text-[#2a2926] mb-4">
            <T
              nl="Dit is het bouwblok dat Roy steeds benoemt: mensen willen bijdragen aan hun buurt. De drukste sociale netwerken belonen broadcasten; hier beloont het platform wederkerigheid. De kunst is genoeg structuur om het geen vrijblijvende chaos te laten worden, en weinig genoeg om spontaan te blijven."
              en="This is the block Roy keeps naming: people want to contribute to their neighborhood. The busiest social networks reward broadcasting; here the platform rewards reciprocity. The trick is enough structure to keep it from becoming a free-for-all, and little enough to stay spontaneous."
            />
          </p>
          <div className="space-y-3 text-[13px]">
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <strong><T nl="Geen marktplaats." en="Not a marketplace." /></strong>{" "}
              <T nl="Geen geld, geen reviews, geen diensten-als-bedrijf. Wederkerigheid tussen buren." en="No money, no reviews, no services-as-business. Reciprocity between neighbors." />
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <strong><T nl="Een vraag groeit door." en="An ask grows up." /></strong>{" "}
              <T nl="Wat klein begint kan een " en="What starts small can become an " />
              <PrimitiveTag kind="event" />
              <T nl=" worden of een " en=" or a " />
              <PrimitiveTag kind="thread" />
              <T nl=" krijgen — dezelfde blokken, andere schaal." en=" — same blocks, different scale." />
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-uitwijken)] font-semibold mb-1">
                <T nl="Open vraag" en="Open question" />
              </div>
              <T nl="Hoeveel structuur geven we een vraag? Type, plek, thema, tijd — en dan? Te veel velden dood het; te weinig maakt het rommelig." en="How much structure does an ask get? Type, place, theme, time — and then? Too many fields kill it; too few make it messy." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
