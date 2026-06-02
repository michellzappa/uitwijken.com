import {
  Baby,
  Bike,
  Building2,
  Cpu,
  Dices,
  Dumbbell,
  HeartPulse,
  Leaf,
  Music,
  Palette,
  Utensils,
  Vote,
  type LucideIcon,
} from "lucide-react";
import { TopBar, PageHeader } from "../components/Nav";
import { AppTopBar } from "../components/PhoneChrome";
import { PhoneFrame } from "../components/PhoneFrame";
import { CivicItem, RoleTag, ScaleRail, ThemePill } from "../components/CivicUI";
import { T } from "../lib/i18n";

function SignalBar({ label, value }: { label: React.ReactNode; value: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-[11px] text-[var(--color-secondary)]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#efece4]">
        <div className="h-full rounded-full bg-[var(--color-uitwijken)]" style={{ width: value }} />
      </div>
    </div>
  );
}

type Sub = { nl: string; en: string };
type Topic = {
  key: string;
  Icon: LucideIcon;
  nl: string;
  en: string;
  subs: Sub[];
};

const TOPICS: Topic[] = [
  {
    key: "muziek",
    Icon: Music,
    nl: "Muziek",
    en: "Music",
    subs: [
      { nl: "Klassiek", en: "Classical" },
      { nl: "Jazz", en: "Jazz" },
      { nl: "Elektronisch", en: "Electronic" },
      { nl: "Koor", en: "Choir" },
    ],
  },
  {
    key: "tech",
    Icon: Cpu,
    nl: "Tech",
    en: "Tech",
    subs: [
      { nl: "AI", en: "AI" },
      { nl: "Hardware", en: "Hardware" },
      { nl: "Open source", en: "Open source" },
      { nl: "Vibe coding", en: "Vibe coding" },
    ],
  },
  {
    key: "zorg",
    Icon: HeartPulse,
    nl: "Zorg",
    en: "Care",
    subs: [
      { nl: "Mantelzorg", en: "Informal care" },
      { nl: "Eenzaamheid", en: "Loneliness" },
      { nl: "Jeugd", en: "Youth" },
      { nl: "GGZ", en: "Mental health" },
    ],
  },
  {
    key: "sport",
    Icon: Dumbbell,
    nl: "Sport",
    en: "Sport",
    subs: [
      { nl: "Hardlopen", en: "Running" },
      { nl: "Yoga", en: "Yoga" },
      { nl: "Voetbal", en: "Football" },
      { nl: "Zwemmen", en: "Swimming" },
    ],
  },
  {
    key: "eten",
    Icon: Utensils,
    nl: "Eten",
    en: "Food",
    subs: [
      { nl: "Buurtmaaltijd", en: "Neighborhood meal" },
      { nl: "Markten", en: "Markets" },
      { nl: "Stadstuinieren", en: "Urban gardening" },
      { nl: "Restaurants", en: "Restaurants" },
    ],
  },
  {
    key: "kunst",
    Icon: Palette,
    nl: "Kunst",
    en: "Art",
    subs: [
      { nl: "Galeries", en: "Galleries" },
      { nl: "Straatkunst", en: "Street art" },
      { nl: "Theater", en: "Theatre" },
      { nl: "Film", en: "Film" },
    ],
  },
  {
    key: "wonen",
    Icon: Building2,
    nl: "Wonen",
    en: "Housing",
    subs: [
      { nl: "Vergunningen", en: "Permits" },
      { nl: "Verbouwen", en: "Renovation" },
      { nl: "Huurders", en: "Tenants" },
      { nl: "Energie", en: "Energy" },
    ],
  },
  {
    key: "mobiliteit",
    Icon: Bike,
    nl: "Mobiliteit",
    en: "Mobility",
    subs: [
      { nl: "Fiets", en: "Bike" },
      { nl: "OV", en: "Transit" },
      { nl: "Parkeren", en: "Parking" },
      { nl: "Veiligheid", en: "Safety" },
    ],
  },
  {
    key: "natuur",
    Icon: Leaf,
    nl: "Natuur",
    en: "Nature",
    subs: [
      { nl: "Parken", en: "Parks" },
      { nl: "Klimaat", en: "Climate" },
      { nl: "Dieren", en: "Animals" },
      { nl: "Geveltuinen", en: "Façade gardens" },
    ],
  },
  {
    key: "kinderen",
    Icon: Baby,
    nl: "Kinderen",
    en: "Children",
    subs: [
      { nl: "School", en: "School" },
      { nl: "Speelplaatsen", en: "Playgrounds" },
      { nl: "Activiteiten", en: "Activities" },
      { nl: "Opvang", en: "Daycare" },
    ],
  },
  {
    key: "politiek",
    Icon: Vote,
    nl: "Politiek",
    en: "Politics",
    subs: [
      { nl: "Gemeente", en: "Municipality" },
      { nl: "Inspraak", en: "Consultations" },
      { nl: "Acties", en: "Actions" },
      { nl: "Verkiezingen", en: "Elections" },
    ],
  },
  {
    key: "spel",
    Icon: Dices,
    nl: "Spel",
    en: "Play",
    subs: [
      { nl: "Pubquiz", en: "Pub quiz" },
      { nl: "D&D", en: "D&D" },
      { nl: "Schaken", en: "Chess" },
      { nl: "Bordspel", en: "Board games" },
    ],
  },
];

function TopicRow({ topic }: { topic: Topic }) {
  return (
    <div className="border-b border-[var(--color-rule)] px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="flex w-6 justify-center text-[var(--color-uitwijken)]">
          <topic.Icon className="w-4 h-4" aria-hidden="true" />
        </span>
        <span className="font-semibold text-[13px] flex-1">
          <T nl={topic.nl} en={topic.en} />
        </span>
        <span className="text-[10px] text-[var(--color-secondary)] uppercase tracking-wider">
          {topic.subs.length} <T nl="sub" en="sub" />
        </span>
      </div>
      <div className="ml-9 mt-1.5 flex flex-wrap gap-1">
        {topic.subs.map((s) => (
          <span
            key={s.en}
            className="rounded-sm border border-[var(--color-rule)] bg-[#fafaf7] px-1.5 py-0.5 text-[10.5px] text-[var(--color-secondary)]"
          >
            <T nl={s.nl} en={s.en} />
          </span>
        ))}
      </div>
    </div>
  );
}

function PickerRow({
  topic,
  picked,
  pickedSubs,
}: {
  topic: Topic;
  picked?: boolean;
  pickedSubs?: string[];
}) {
  return (
    <div className={`border-b border-[var(--color-rule)] px-4 py-3 ${picked ? "bg-[var(--color-uitwijken-soft)]/30" : ""}`}>
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex h-4 w-4 items-center justify-center rounded-full border text-[10px] leading-none ${
            picked
              ? "border-[var(--color-uitwijken)] bg-[var(--color-uitwijken)] text-white"
              : "border-[var(--color-rule)] text-transparent"
          }`}
        >
          ✓
        </span>
        <span className="flex w-5 justify-center text-[var(--color-uitwijken)]">
          <topic.Icon className="w-4 h-4" aria-hidden="true" />
        </span>
        <span className={`text-[13px] flex-1 ${picked ? "font-semibold" : ""}`}>
          <T nl={topic.nl} en={topic.en} />
        </span>
      </div>
      {picked && pickedSubs && pickedSubs.length > 0 && (
        <div className="ml-12 mt-2 flex flex-wrap gap-1">
          {topic.subs.map((s) => {
            const on = pickedSubs.includes(s.en);
            return (
              <span
                key={s.en}
                className={`rounded-sm px-1.5 py-0.5 text-[10.5px] ${
                  on
                    ? "bg-[var(--color-uitwijken)] text-white"
                    : "border border-[var(--color-rule)] bg-white text-[var(--color-secondary)]"
                }`}
              >
                <T nl={s.nl} en={s.en} />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ThemeViewMock() {
  const muziek = TOPICS.find((t) => t.key === "muziek")!;

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Mock 02 · thematische community" en="Mock 02 · thematic community" />}
        title={<T nl="Thema's — zorg op meerdere schalen + de boom" en="Themes — care across scales + the tree" />}
        subtitle={
          <T
            nl="Twee blikken op hetzelfde idee. Boven: één thema (zorg) door de schalen heen — wat een breed onderwerp betekent als je het in een buurt benadert. Onder: de boom van thema's zelf — het top-down voorstel voor de gedeelde woordenschat waarin events, vragen en meldingen leven."
            en="Two takes on the same idea. Above: one theme (care) across the scales — what a broad subject means when you approach it in a neighborhood. Below: the tree of themes itself — the top-down proposal for the shared vocabulary that events, questions, and signals live in."
          />
        }
      />

      {/* Section A — Theme in context (Zorg through scales) */}
      <div className="max-w-6xl mx-auto px-6 pb-12 flex gap-10 flex-wrap">
        <PhoneFrame
          title={<T nl="Thema" en="Theme" />}
          caption={<T nl="Zorg · Indische Buurt" en="Care · Indische Buurt" />}
          annot={
            <T
              nl="AI kan helpen clusteren, maar het productdoel blijft civic: betekenisvolle onderwerpen op de juiste schaal."
              en="AI can help cluster, but the product goal stays civic: meaningful subjects at the right scale."
            />
          }
        >
          <AppTopBar left={<T nl="Kaart" en="Map" />} center={<T nl="Zorg" en="Care" />} right={<span>⋯</span>} />
          <ScaleRail active="buurt" />
          <div className="px-4 py-3 border-b border-[var(--color-rule)] flex gap-2 overflow-x-auto">
            <ThemePill label={<T nl="Mantelzorg" en="Informal care" />} active />
            <ThemePill label={<T nl="Eenzaamheid" en="Loneliness" />} active />
            <ThemePill label={<T nl="Jeugd" en="Youth" />} />
          </div>
          <div className="px-4 py-4 border-b border-[var(--color-rule)]">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">
              <T nl="Samengevat uit 42 signalen" en="Summarized from 42 signals" />
            </div>
            <div className="mt-1 font-serif italic text-[22px] leading-tight">
              <T nl="Zorgvragen zijn vooral straat- en buurtgebonden." en="Care needs are mostly street and neighborhood-bound." />
            </div>
            <div className="mt-3 space-y-3">
              <SignalBar label={<T nl="Ouderen zoeken praktische hulp" en="Older residents need practical help" />} value="72%" />
              <SignalBar label={<T nl="Meer ontmoetingsplekken gewenst" en="More meeting places requested" />} value="58%" />
              <SignalBar label={<T nl="Onduidelijkheid over voorzieningen" en="Services are hard to understand" />} value="46%" />
            </div>
          </div>
          <div className="space-y-2 bg-[#fafaf7] px-4 py-4">
            <CivicItem
              role="resident"
              title={<T nl="Burenhulp gevraagd rond Balistraat" en="Neighbor help requested around Balistraat" />}
              meta={<T nl="Straat · 11 bewoners volgen dit" en="Street · 11 residents follow this" />}
              body={<T nl="Boodschappen, bezoek, kleine klussen." en="Groceries, visits, small tasks." />}
            />
            <CivicItem
              role="government"
              title={<T nl="Gemeente vraagt feedback op zorgpunt Oost" en="City asks feedback on Care Point Oost" />}
              meta={<T nl="Buurt · vragenlijst open" en="Neighborhood · questionnaire open" />}
            />
            <CivicItem
              role="entrepreneur"
              title={<T nl="Apotheek organiseert inloopmiddag" en="Pharmacy hosts walk-in afternoon" />}
              meta={<T nl="Ondernemer · vrijdag 14:00" en="Entrepreneur · Friday 14:00" />}
            />
          </div>
        </PhoneFrame>

        <div className="max-w-md pt-3">
          <div className="text-xs uppercase tracking-widest text-[var(--color-uitwijken)] mb-3">
            <T nl="Rollen rond hetzelfde thema" en="Roles around the same theme" />
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <RoleTag role="resident" />
              <p className="mt-3 text-[14px] leading-relaxed">
                <T nl="Bewoners brengen lived experience in: waar is hulp nodig, wat werkt niet, wie wordt gemist?" en="Residents bring lived experience: where is help needed, what is not working, who is being missed?" />
              </p>
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <RoleTag role="government" />
              <p className="mt-3 text-[14px] leading-relaxed">
                <T nl="Overheid brengt plannen, voorzieningen, budgetten en formele vragen in." en="Government brings plans, services, budgets, and formal questions." />
              </p>
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <RoleTag role="entrepreneur" />
              <p className="mt-3 text-[14px] leading-relaxed">
                <T nl="Ondernemers brengen ruimtes, diensten en praktische capaciteit in." en="Entrepreneurs bring spaces, services, and practical capacity." />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Divider between the two takes */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[var(--color-rule)] pt-8 pb-4">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-uitwijken)] font-semibold mb-2">
            <T nl="Inzoomen op de woordenschat" en="Zooming in on the vocabulary" />
          </div>
          <h2 className="font-sans font-bold text-2xl tracking-tight leading-snug mb-2">
            <T nl="De boom van thema's" en="The tree of themes" />
          </h2>
          <p className="max-w-2xl text-[15.5px] text-[#2a2926] leading-relaxed">
            <T
              nl="Eén thema in context is bovenstaand. Maar wat zijn de thema's eigenlijk? Hieronder een top-down voorstel: twaalf hoofdonderwerpen met sub-takken. Bewoners taggen hier hun affiniteit op; events, vragen en meldingen krijgen dezelfde tags. Wat ik volg kan overal in de stad gebeuren — alles in mijn buurt is sowieso relevant."
              en="One theme in context is above. But what are the themes themselves? Below is a top-down proposal: twelve top-level subjects with sub-branches. Residents tag their affinities here; events, questions, and signals share the same tags. What I follow can happen anywhere in the city — anything in my neighborhood is relevant regardless."
            />
          </p>
        </div>
      </div>

      {/* Section B — The ontology itself */}
      <div className="max-w-6xl mx-auto px-6 pb-16 flex gap-10 flex-wrap">
        <PhoneFrame
          title={<T nl="Boom" en="Tree" />}
          caption={<T nl="Thema's · top-down voorstel" en="Themes · top-down proposal" />}
          annot={
            <T
              nl="Twaalf hoofdthema's, elk met een handvol sub-thema's. Bedoeld om dekkend te zijn, niet uitputtend — een eerste raamwerk dat zich aanpast aan hoe bewoners het gebruiken."
              en="Twelve top-level themes, each with a handful of sub-themes. Meant to be covering, not exhaustive — a first scaffold that adapts to how residents actually use it."
            />
          }
        >
          <AppTopBar
            left={<T nl="Terug" en="Back" />}
            center={<T nl="Thema's" en="Themes" />}
            right={<span>⊕</span>}
          />
          <div className="px-4 py-3 border-b border-[var(--color-rule)] bg-[#fafaf7]">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">
              <T nl="12 thema's · 48 sub-thema's" en="12 themes · 48 sub-themes" />
            </div>
            <div className="mt-1 font-serif italic text-[15px] leading-snug">
              <T
                nl="Van Mantelzorg tot Dungeons & Dragons."
                en="From informal care to Dungeons & Dragons."
              />
            </div>
          </div>
          <div>
            {TOPICS.map((t) => (
              <TopicRow key={t.key} topic={t} />
            ))}
          </div>
          <div className="px-4 py-3 bg-[#fafaf7]">
            <button className="w-full rounded-sm border border-dashed border-[var(--color-uitwijken)] bg-white px-3 py-2 text-[12px] text-[var(--color-uitwijken)]">
              <T nl="+ Thema voorstellen" en="+ Suggest a theme" />
            </button>
            <div className="mt-2 text-[10.5px] text-[var(--color-secondary)] leading-snug">
              <T
                nl="De boom is een vertrekpunt. Bewoners kunnen takken voorstellen; moderatie kiest wat blijft staan."
                en="The tree is a starting point. Residents can propose branches; moderation decides what stays."
              />
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame
          title={<T nl="Mijn affiniteit" en="My affinities" />}
          caption={<T nl="Onboarding · waar ben ik benieuwd naar?" en="Onboarding · what am I curious about?" />}
          annot={
            <T
              nl="De keuze bepaalt wat de stad mij stuurt buiten mijn buurt. Wat er in mijn buurt gebeurt zie ik sowieso — dat is de horizontale balk van de T."
              en="The choice shapes what the city pushes to me outside my neighborhood. Whatever happens in my neighborhood I see anyway — that is the horizontal bar of the T."
            />
          }
        >
          <AppTopBar
            left={<T nl="Stap 3/5" en="Step 3/5" />}
            center={<T nl="Kies thema's" en="Choose themes" />}
            right={<T nl="Verder" en="Next" />}
          />
          <div className="px-4 py-3 border-b border-[var(--color-rule)] bg-[#fafaf7]">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">
              <T nl="Kies er minstens drie" en="Pick at least three" />
            </div>
            <div className="mt-1 font-serif italic text-[15px] leading-snug">
              <T
                nl="Waar reis je voor naar een andere buurt?"
                en="What would you travel across town for?"
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-sm bg-[var(--color-uitwijken)] text-white px-1.5 py-0.5 text-[10.5px]">
                <T nl="Tech · AI" en="Tech · AI" />
              </span>
              <span className="rounded-sm bg-[var(--color-uitwijken)] text-white px-1.5 py-0.5 text-[10.5px]">
                <T nl="Muziek · Jazz" en="Music · Jazz" />
              </span>
              <span className="rounded-sm bg-[var(--color-uitwijken)] text-white px-1.5 py-0.5 text-[10.5px]">
                <T nl="Zorg · Mantelzorg" en="Care · Informal care" />
              </span>
              <span className="rounded-sm bg-[var(--color-uitwijken)] text-white px-1.5 py-0.5 text-[10.5px]">
                <T nl="Spel · Pubquiz" en="Play · Pub quiz" />
              </span>
            </div>
          </div>
          <div>
            <PickerRow topic={TOPICS[0]} picked pickedSubs={["Jazz"]} />
            <PickerRow topic={TOPICS[1]} picked pickedSubs={["AI"]} />
            <PickerRow topic={TOPICS[2]} picked pickedSubs={["Informal care"]} />
            <PickerRow topic={TOPICS[3]} />
            <PickerRow topic={TOPICS[4]} />
            <PickerRow topic={TOPICS[5]} />
            <PickerRow topic={TOPICS[6]} />
            <PickerRow topic={TOPICS[7]} />
            <PickerRow topic={TOPICS[8]} />
            <PickerRow topic={TOPICS[9]} />
            <PickerRow topic={TOPICS[10]} />
            <PickerRow topic={TOPICS[11]} picked pickedSubs={["Pub quiz"]} />
          </div>
        </PhoneFrame>

        <PhoneFrame
          title={<T nl="Thema" en="Theme" />}
          caption={<T nl="Muziek · Jazz · stadsbreed + lokaal" en="Music · Jazz · city-wide + local" />}
          annot={
            <T
              nl="Een themadetail toont de tak in context: sub-thema's, mensen die volgen, en de civic objecten die deze tag dragen — overal in de stad én vlakbij."
              en="A theme detail shows the branch in context: sub-themes, followers, and the civic objects that carry this tag — anywhere in the city and nearby."
            />
          }
        >
          <AppTopBar
            left={<T nl="Boom" en="Tree" />}
            center={<T nl="Muziek" en="Music" />}
            right={<span>♡</span>}
          />
          <div className="px-4 py-4 border-b border-[var(--color-rule)] bg-[#fafaf7]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-uitwijken)]">
                <muziek.Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <div className="font-sans font-bold text-[18px] leading-none">
                  <T nl={muziek.nl} en={muziek.en} />
                </div>
                <div className="text-[10.5px] text-[var(--color-secondary)] mt-1">
                  <T nl="412 bewoners volgen · 4 sub-thema's" en="412 residents follow · 4 sub-themes" />
                </div>
              </div>
              <button className="rounded-sm border border-[var(--color-ink)] bg-[var(--color-ink)] text-white px-2 py-1 text-[10.5px] uppercase tracking-wider">
                <T nl="Volgen" en="Follow" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {muziek.subs.map((s, i) => (
                <span
                  key={s.en}
                  className={`rounded-sm px-2 py-0.5 text-[11px] ${
                    i === 1
                      ? "bg-[var(--color-uitwijken)] text-white font-semibold"
                      : "border border-[var(--color-rule)] bg-white text-[var(--color-secondary)]"
                  }`}
                >
                  <T nl={s.nl} en={s.en} />
                </span>
              ))}
            </div>
          </div>

          <div className="px-4 py-3 border-b border-[var(--color-rule)]">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)] mb-2">
              <T nl="Stadsbreed · jouw sub-thema" en="City-wide · your sub-theme" />
            </div>
            <div className="space-y-2">
              <CivicItem
                role="entrepreneur"
                title={<T nl="Bimhuis · late-night jam" en="Bimhuis · late-night jam" />}
                meta={<T nl="IJ-oever · vr 22:00" en="IJ waterfront · Fri 22:00" />}
              />
              <CivicItem
                role="resident"
                title={<T nl="Wie wil meespelen? Trio zoekt bassist" en="Anyone in? Trio looking for a bassist" />}
                meta={<T nl="Westerpark · doorlopend" en="Westerpark · ongoing" />}
              />
            </div>
          </div>

          <div className="px-4 py-3 bg-[#fafaf7]">
            <div className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)] mb-2">
              <T nl="In jouw buurt · alle sub-thema's" en="In your neighborhood · all sub-themes" />
            </div>
            <div className="space-y-2">
              <CivicItem
                role="resident"
                title={<T nl="Koorrepetitie zoekt sopranen" en="Choir rehearsal looking for sopranos" />}
                meta={<T nl="Javastraat · do 19:30" en="Javastraat · Thu 19:30" />}
              />
              <CivicItem
                role="government"
                title={<T nl="Stadsdeel: subsidie voor straatconcerten" en="District: subsidy for street concerts" />}
                meta={<T nl="Buurt · aanvragen tot 30 juni" en="Neighborhood · apply by 30 June" />}
              />
            </div>
            <div className="mt-3 rounded-sm border border-dashed border-[var(--color-rule)] bg-white px-3 py-2">
              <div className="flex items-center justify-between text-[10.5px]">
                <span className="text-[var(--color-secondary)]">
                  <T nl="Mist er een sub-thema?" en="Missing a sub-theme?" />
                </span>
                <span className="text-[var(--color-uitwijken)] font-semibold">
                  <T nl="+ Voorstellen" en="+ Suggest" />
                </span>
              </div>
            </div>
          </div>
        </PhoneFrame>

        <div className="max-w-md pt-3">
          <div className="text-xs uppercase tracking-widest text-[var(--color-uitwijken)] mb-3">
            <T nl="De T-vorm" en="The T-shape" />
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <RoleTag role="resident" />
              <p className="mt-3 text-[14px] leading-relaxed">
                <T
                  nl="Horizontaal: alles in mijn buurt is sowieso relevant, ongeacht thema. Lekkende dakgoot, vergunning, buurtmaaltijd — ik wil het zien."
                  en="Horizontal: anything in my neighborhood is relevant regardless of theme. A leaky gutter, a permit, a neighborhood meal — I want to see it."
                />
              </p>
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <RoleTag role="resident" />
              <p className="mt-3 text-[14px] leading-relaxed">
                <T
                  nl="Verticaal: voor mijn thema's reis ik de stad door. Een jazzjam aan de IJ-oever, een D&D-avond in Noord, een talk over AI in Zuid."
                  en="Vertical: for my themes I will cross the city. A jazz jam by the IJ, a D&D night in Noord, an AI talk in Zuid."
                />
              </p>
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-uitwijken)] font-semibold">
                <T nl="Open vraag" en="Open question" />
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#2a2926]">
                <T
                  nl="Top-down voor de start, bottom-up over tijd. Op welk moment laten we bewoners takken samenvoegen, splitsen of hernoemen — en wie modereert dat?"
                  en="Top-down to start, bottom-up over time. At what point do we let residents merge, split, or rename branches — and who moderates that?"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
