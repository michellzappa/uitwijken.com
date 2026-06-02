import { TopBar, PageHeader } from "../components/Nav";
import { AppTopBar } from "../components/PhoneChrome";
import { PhoneFrame } from "../components/PhoneFrame";
import { MockRef, ScaleRail, ThemePill } from "../components/CivicUI";
import { T } from "../lib/i18n";

function BudgetOption({
  title,
  amount,
  pct,
  selected,
}: {
  title: React.ReactNode;
  amount: string;
  pct: string;
  selected?: boolean;
}) {
  return (
    <div className={`rounded-lg border p-3 ${selected ? "border-[var(--color-uitwijken)] bg-[var(--color-uitwijken-soft)]/40" : "border-[var(--color-rule)] bg-white"}`}>
      <div className="flex justify-between gap-3">
        <div className="font-semibold text-[13px]">{title}</div>
        <div className="text-[12px] text-[var(--color-secondary)]">{amount}</div>
      </div>
      <div className="mt-2 h-2 rounded-full bg-[#efece4]">
        <div className="h-full rounded-full bg-[var(--color-uitwijken)]" style={{ width: pct }} />
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">{pct}</div>
    </div>
  );
}

export default function SurveysMock() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Mock 03 · democratisch mechanisme" en="Mock 03 · democratic mechanism" />}
        title={<T nl="Enquêtes & budget — van behoefte naar prioriteit" en="Surveys & budget — from need to priority" />}
        subtitle={
          <T
            nl="Een buurtbudget wordt de kernflow: overheid vraagt niet alleen om meningen, maar om gestructureerde prioriteiten op een plek en rond een thema."
            en="A neighborhood budget becomes the core flow: government asks not just for opinions, but for structured priorities tied to a place and a theme."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 -mt-4 pb-6 flex flex-wrap gap-2">
        <MockRef href="/governance" label={<T nl="Wie mag stemmen?" en="Who may vote?" />} />
        <MockRef href="/inbox" label={<T nl="Komt binnen via je inbox" en="Arrives via your inbox" />} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 flex gap-10 flex-wrap">
        <PhoneFrame
          title={<T nl="Buurtvraag" en="Area question" />}
          caption={<T nl="€300.000 · Indische Buurt" en="€300,000 · Indische Buurt" />}
          annot={
            <T
              nl="De enquête is geen losse vragenlijst. Hij hangt aan een buurt, thema's, budget en zichtbare consequentie."
              en="The survey is not a loose questionnaire. It is attached to a neighborhood, themes, budget, and visible consequence."
            />
          }
        >
          <AppTopBar left={<T nl="Zorg" en="Care" />} center={<T nl="Buurtbudget" en="Area budget" />} right={<span>?</span>} />
          <ScaleRail active="buurt" />
          <div className="px-4 py-4 border-b border-[var(--color-rule)]">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">
              <T nl="Vraag van stadsdeel Oost" en="Question from Oost district" />
            </div>
            <div className="mt-1 font-serif italic text-[22px] leading-tight">
              <T nl="Waar moet €300.000 het meeste verschil maken?" en="Where should €300,000 make the most difference?" />
            </div>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#2a2926]">
              <T
                nl="Kies eerst het thema, daarna de plek en daarna de soort actie. Resultaten worden per straat en buurt teruggekoppeld."
                en="Choose the theme first, then the place, then the kind of action. Results are reported back by street and neighborhood."
              />
            </p>
          </div>
          <div className="px-4 py-3 border-b border-[var(--color-rule)] flex gap-2 overflow-x-auto">
            <ThemePill label={<T nl="Spelen" en="Play" />} active />
            <ThemePill label={<T nl="Zorg" en="Care" />} active />
            <ThemePill label={<T nl="Groen" en="Greenery" />} />
            <ThemePill label={<T nl="Veiligheid" en="Safety" />} />
          </div>
          <div className="space-y-2 bg-[#fafaf7] px-4 py-4">
            <BudgetOption
              title={<T nl="Extra ontmoetingsruimte voor ouderen" en="Extra meeting space for older residents" />}
              amount="€95k"
              pct="64%"
              selected
            />
            <BudgetOption
              title={<T nl="Speelplek Javaplein langer open" en="Keep Javaplein playground open longer" />}
              amount="€42k"
              pct="51%"
            />
            <BudgetOption
              title={<T nl="Buurtagenda met maandelijkse events" en="Neighborhood calendar with monthly events" />}
              amount="€38k"
              pct="44%"
            />
            <BudgetOption
              title={<T nl="Kleine subsidie voor bewonersinitiatieven" en="Small grant for resident initiatives" />}
              amount="€125k"
              pct="38%"
            />
          </div>
          <div className="px-4 py-4 border-t border-[var(--color-rule)]">
            <div className="mb-3 flex items-start gap-2 rounded-sm border border-[var(--color-civic-soft)] bg-[var(--color-civic-soft)]/40 px-3 py-2">
              <span className="text-[13px] leading-none text-[#164a72]">✓</span>
              <div className="text-[11px] leading-snug text-[#164a72]">
                <T
                  nl="Je stemt mee als geverifieerde bewoner van de Indische Buurt. Verificatie bewijst dat je hier woont — je naam blijft afgeschermd."
                  en="You vote as a verified resident of the Indische Buurt. Verification proves you live here — your name stays shielded."
                />
              </div>
            </div>
            <button className="w-full rounded-lg bg-[var(--color-uitwijken)] py-3 text-[13px] font-semibold text-white">
              <T nl="Rangschik mijn top 3" en="Rank my top 3" />
            </button>
            <div className="mt-2 text-center text-[11px] text-[var(--color-secondary)]">
              <T nl="1.284 geverifieerde bewoners · quorum 1.500" en="1,284 verified residents · quorum 1,500" />
            </div>
          </div>
        </PhoneFrame>

        <div className="max-w-md pt-3">
          <div className="text-xs uppercase tracking-widest text-[var(--color-uitwijken)] mb-3">
            <T nl="Waarom dit belangrijk is" en="Why this matters" />
          </div>
          <h2 className="font-sans font-bold text-3xl tracking-tight leading-[1.15] mb-4">
            <T nl="De app vraagt wat er moet gebeuren, niet alleen wat mensen vinden." en="The app asks what should happen, not just what people think." />
          </h2>
          <p className="text-[15px] leading-relaxed text-[#2a2926]">
            <T
              nl="Dit is het democratische mechanisme in productvorm: lokale doelen, verwachtingen en budgetten worden zichtbaar en vergelijkbaar. Bewoners kunnen prioriteren, overheid kan terugkoppelen, ondernemers kunnen bijdragen waar ze capaciteit hebben."
              en="This is the democratic mechanism in product form: local goals, expectations, and budgets become visible and comparable. Residents can prioritize, government can report back, and entrepreneurs can contribute where they have capacity."
            />
          </p>
        </div>
      </div>
    </div>
  );
}
