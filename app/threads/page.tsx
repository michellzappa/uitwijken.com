import { TopBar, PageHeader } from "../components/Nav";
import { AppTopBar } from "../components/PhoneChrome";
import { PhoneFrame } from "../components/PhoneFrame";
import { MockRef, PrimitiveTag, RoleTag } from "../components/CivicUI";
import type { CivicRole } from "../components/CivicUI";
import { T } from "../lib/i18n";

function Post({
  role,
  author,
  verified,
  when,
  body,
  reply,
}: {
  role: CivicRole;
  author: string;
  verified?: boolean;
  when: React.ReactNode;
  body: React.ReactNode;
  reply?: boolean;
}) {
  return (
    <div className={`${reply ? "ml-6 border-l-2 border-[var(--color-rule)] pl-3" : ""}`}>
      <div className="rounded-sm border border-[var(--color-rule)] bg-white p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[12.5px]">{author}</span>
            {verified && (
              <span
                title="Geverifieerde bewoner"
                className="rounded-sm bg-[var(--color-civic-soft)] px-1 py-px text-[8.5px] font-bold uppercase tracking-wider text-[#164a72]"
              >
                ✓ <T nl="bewoner" en="resident" />
              </span>
            )}
          </div>
          <RoleTag role={role} />
        </div>
        <div className="mt-0.5 text-[10px] text-[var(--color-secondary)]">{when}</div>
        <div className="mt-2 text-[12.5px] leading-relaxed text-[#23251f]">{body}</div>
      </div>
    </div>
  );
}

export default function ThreadsMock() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Mock 04 · bouwblok · gesprek" en="Mock 04 · building block · conversation" />}
        title={<T nl="Gesprekken — draadjes die overal aan vastzitten" en="Conversations — threads that attach to anything" />}
        subtitle={
          <T
            nl="Het gesprek is geen aparte chat-app. Het is een draad die aan een ander object hangt: een event, een vraag, een plek op de kaart of een enquête. Thread-georiënteerd zoals Mastodon, en strikt openbaar — geen privéberichten, want alles wat hier besproken wordt is publiek van aard."
            en="The conversation is not a separate chat app. It is a thread attached to another object: an event, an ask, a place on the map, or a survey. Thread-oriented like Mastodon, and strictly public — no private messages, because everything discussed here is public by nature."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 -mt-4 pb-6 flex flex-wrap gap-2">
        <MockRef href="/events" label={<T nl="Hangt aan dit event" en="Attached to this event" />} />
        <MockRef href="/governance" label={<T nl="Waarom openbaar?" en="Why public?" />} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 flex gap-10 flex-wrap">
        <PhoneFrame
          title={<T nl="Gesprek" en="Thread" />}
          caption={<T nl="Hangt aan een event · openbaar" en="Attached to an event · public" />}
          annot={
            <T
              nl="Het draadje opent vanuit het event. De context blijft bovenaan staan, zodat een gesprek nooit losraakt van waar het over gaat."
              en="The thread opens from the event. The context stays pinned at the top, so a conversation never drifts from what it is about."
            />
          }
        >
          <AppTopBar left={<T nl="Event" en="Event" />} center={<T nl="Gesprek" en="Thread" />} right={<span>⤴</span>} />

          {/* Pinned context — the object this thread hangs off */}
          <div className="px-4 py-3 border-b border-[var(--color-rule)] bg-[var(--color-uitwijken-soft)]/40">
            <div className="flex items-center gap-2">
              <PrimitiveTag kind="event" />
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">
                <T nl="Gesprek hangt hieraan" en="Thread attached to" />
              </span>
            </div>
            <div className="mt-1.5 font-semibold text-[13px] leading-snug">
              <T nl="Buurtavond over zorg en eenzaamheid" en="Neighborhood night on care and loneliness" />
            </div>
            <div className="text-[11px] text-[var(--color-secondary)]">
              <T nl="Bakkerij Anatolia · Javastraat · 28 mei 19:00" en="Anatolia Bakery · Javastraat · 28 May 19:00" />
            </div>
          </div>

          {/* Public banner */}
          <div className="px-4 py-2 border-b border-[var(--color-rule)] bg-[#fafaf7] text-[10.5px] text-[var(--color-secondary)] flex items-center gap-2">
            <span className="text-[var(--color-link)]">◉</span>
            <T nl="Openbaar — iedereen in de buurt leest mee. Geen DM's." en="Public — anyone in the neighborhood can read this. No DMs." />
          </div>

          <div className="space-y-2 bg-[#fafaf7] px-4 py-4">
            <Post
              role="resident"
              author="Marije"
              verified
              when={<T nl="Indische Buurt · 2 dagen geleden" en="Indische Buurt · 2 days ago" />}
              body={<T nl="Ik ken twee buren die hier baat bij hebben maar slecht ter been zijn. Is er iemand die kan ophalen?" en="I know two neighbors who'd benefit but can't walk well. Could someone offer a lift?" />}
            />
            <Post
              role="resident"
              author="Driss"
              verified
              reply
              when={<T nl="Balistraat · 1 dag geleden" en="Balistraat · 1 day ago" />}
              body={<T nl="Ik woon om de hoek en heb een auto. Stuur me de adressen via de buurthulp-vraag." en="I live around the corner and have a car. Send me the addresses via the asks board." />}
            />
            <Post
              role="entrepreneur"
              author="Anatolia"
              reply
              when={<T nl="Ondernemer · 1 dag geleden" en="Entrepreneur · 1 day ago" />}
              body={<T nl="We zetten koffie en thee klaar. Kom gerust 15 min eerder." en="We'll have coffee and tea ready. Feel free to come 15 min early." />}
            />
            <Post
              role="government"
              author="Stadsdeel Oost"
              when={<T nl="Buurtregisseur · 20 uur geleden" en="Area lead · 20 hours ago" />}
              body={<T nl="We sluiten aan met iemand van het zorgpunt. Vragen vooraf? Zet ze hier neer, dan nemen we ze mee." en="Someone from the care point will join. Questions in advance? Post them here and we'll bring them." />}
            />
          </div>

          {/* Composer */}
          <div className="px-4 py-3 border-t border-[var(--color-rule)] bg-white">
            <div className="rounded-sm border border-[var(--color-rule)] px-3 py-2 text-[12px] text-[var(--color-secondary)]">
              <T nl="Reageer openbaar…" en="Reply in public…" />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[10px] text-[var(--color-secondary)]">
                <T nl="Je post als geverifieerde bewoner, onder je naam naar keuze" en="You post as a verified resident, under a name of your choice" />
              </span>
              <button className="rounded-sm bg-[var(--color-ink)] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                <T nl="Plaats" en="Post" />
              </button>
            </div>
          </div>
        </PhoneFrame>

        <div className="max-w-md pt-3">
          <div className="text-xs uppercase tracking-widest text-[var(--color-uitwijken)] mb-3">
            <T nl="Eén blok, overal inzetbaar" en="One block, used everywhere" />
          </div>
          <h2 className="font-sans font-bold text-3xl tracking-tight leading-[1.15] mb-4">
            <T
              nl="Praten hangt altijd ergens aan vast."
              en="Talk is always attached to something."
            />
          </h2>
          <p className="text-[15px] leading-relaxed text-[#2a2926] mb-4">
            <T
              nl="In plaats van losse groepschats hangt elk gesprek aan een concreet object. Dat houdt het vindbaar, contextueel en moderatie-vriendelijk. Een draadje kan vastzitten aan:"
              en="Instead of loose group chats, every conversation attaches to a concrete object. That keeps it findable, contextual, and moderation-friendly. A thread can attach to:"
            />
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            <PrimitiveTag kind="event" />
            <PrimitiveTag kind="ask" />
            <PrimitiveTag kind="survey" />
            <span className="inline-flex items-center gap-1 rounded-sm border border-[var(--color-rule)] bg-[#fafaf7] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">
              <span className="text-[11px] leading-none text-[var(--color-uitwijken)]">◇</span>
              <T nl="Plek op de kaart" en="Place on the map" />
            </span>
          </div>
          <div className="space-y-3 text-[13px]">
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <strong><T nl="Strikt openbaar." en="Strictly public." /></strong>{" "}
              <T nl="Geen privéberichten. Wat hier besproken wordt is publiek van aard; dat voorkomt misbruik en houdt moderatie eenvoudig." en="No private messages. What is discussed here is public by nature; that prevents misuse and keeps moderation simple." />
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <strong><T nl="Geverifieerd, maar pseudoniem." en="Verified, but pseudonymous." /></strong>{" "}
              <T nl="Je bewijst dat je hier woont, maar kiest zelf onder welke naam je verschijnt." en="You prove you live here, but choose the name you appear under." />
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <div className="text-[10px] uppercase tracking-widest text-[var(--color-uitwijken)] font-semibold mb-1">
                <T nl="Open vraag" en="Open question" />
              </div>
              <T nl="Hoe diep mag een draad? Eindeloos nesten wordt onleesbaar. Eén niveau replies, zoals hier, houdt het overzichtelijk." en="How deep should a thread go? Endless nesting becomes unreadable. One level of replies, like here, keeps it legible." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
