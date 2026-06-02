import { TopBar, PageHeader } from "../components/Nav";
import { AppTopBar } from "../components/PhoneChrome";
import { PhoneFrame } from "../components/PhoneFrame";
import { CivicItem, MapSketch, MockRef, PrimitiveTag, ThemePill, WikiRef } from "../components/CivicUI";
import { T } from "../lib/i18n";

function EventRow({
  day,
  title,
  place,
  tag,
}: {
  day: string;
  title: React.ReactNode;
  place: React.ReactNode;
  tag: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-[var(--color-rule)] bg-white p-3">
      <div className="w-12 shrink-0 rounded-md bg-[var(--color-ink)] px-2 py-2 text-center text-white">
        <div className="text-[10px] uppercase tracking-widest">mei</div>
        <div className="font-serif italic text-[22px] leading-none">{day}</div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-[13px] leading-snug">{title}</div>
        <div className="mt-1 text-[11px] text-[var(--color-secondary)]">{place}</div>
        <div className="mt-2">
          <ThemePill label={tag} active />
        </div>
      </div>
    </div>
  );
}

export default function EventsMock() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Mock 04 · adoptiehaak" en="Mock 04 · adoption hook" />}
        title={<T nl="Events & actie — digitaal naar fysiek" en="Events & action — digital to physical" />}
        subtitle={
          <T
            nl="Mensen bezoeken het platform eerst omdat ze willen weten wat er gebeurt. Events verbinden gemeente, bewoners, ondernemers en voorzieningen zonder dat de app om aandacht hoeft te vechten."
            en="People visit the platform first because they want to know what is happening. Events connect government, residents, entrepreneurs, and facilities without the app fighting for attention."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 -mt-4 pb-6 flex flex-wrap gap-2">
        <WikiRef slug="event-sources" label={<T nl="Bronnen van events" en="Event sources" />} />
        <MockRef href="/threads" label={<T nl="Elk event krijgt een gesprek" en="Every event gets a thread" />} />
        <MockRef href="/asks" label={<T nl="Begint vaak als een vraag" en="Often starts as an ask" />} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 flex gap-10 flex-wrap">
        <PhoneFrame
          title={<T nl="Events" en="Events" />}
          caption={<T nl="Deze week · binnen 12 minuten lopen" en="This week · within 12 minutes walking" />}
          annot={
            <T
              nl="Events zijn geen kalender-tab alleen. Ze zijn de brug naar fysieke community en het makkelijkste startpunt voor adoptie."
              en="Events are not just a calendar tab. They are the bridge to physical community and the easiest adoption starting point."
            />
          }
        >
          <AppTopBar left={<T nl="Kaart" en="Map" />} center={<T nl="Wat gebeurt er?" en="What's on?" />} right={<span>＋</span>} />
          <MapSketch activeScale="buurt" compact />
          <div className="px-4 py-3 border-b border-[var(--color-rule)] flex gap-2 overflow-x-auto">
            <ThemePill label={<T nl="Deze week" en="This week" />} active />
            <ThemePill label={<T nl="Zorg" en="Care" />} />
            <ThemePill label={<T nl="Kinderen" en="Children" />} />
            <ThemePill label={<T nl="Gemeente" en="City" />} />
          </div>
          <div className="space-y-2 bg-[#fafaf7] px-4 py-4">
            <EventRow
              day="28"
              title={<T nl="Buurtavond over zorg en eenzaamheid" en="Neighborhood night on care and loneliness" />}
              place={<T nl="Bakkerij Anatolia · Javastraat · 19:00" en="Anatolia Bakery · Javastraat · 19:00" />}
              tag={<T nl="Zorg" en="Care" />}
            />
            <EventRow
              day="30"
              title={<T nl="Gemeente-inloop Javaplein herinrichting" en="City walk-in: Javaplein redesign" />}
              place={<T nl="Buurthuis Archipel · 16:00" en="Archipel community center · 16:00" />}
              tag={<T nl="Openbare ruimte" en="Public space" />}
            />
            <EventRow
              day="02"
              title={<T nl="Speelstraat Sumatrastraat" en="Play street Sumatrastraat" />}
              place={<T nl="Bewonersinitiatief · 13:00" en="Resident initiative · 13:00" />}
              tag={<T nl="Jeugd" en="Youth" />}
            />
          </div>
          <div className="px-4 py-4 border-t border-[var(--color-rule)] space-y-3">
            <CivicItem
              role="resident"
              kind="ask"
              title={<T nl="Ik wil helpen organiseren" en="I want to help organize" />}
              meta={<T nl="4 buren zoeken nog vrijwilligers" en="4 neighbors still need volunteers" />}
            />
            {/* The conversation building on the first event */}
            <div className="rounded-sm border border-[var(--color-rule)] bg-[#fafaf7] p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PrimitiveTag kind="thread" />
                  <span className="text-[11px] text-[var(--color-secondary)]">
                    <T nl="7 reacties bij de buurtavond" en="7 replies on the neighborhood night" />
                  </span>
                </div>
                <span className="text-[10px] text-[var(--color-secondary)]">
                  <T nl="openbaar" en="public" />
                </span>
              </div>
              <div className="mt-2 text-[12px] leading-relaxed text-[#23251f]">
                <span className="font-semibold">Marije</span>{" "}
                <T nl="— Kan iemand twee buren ophalen die slecht ter been zijn?" en="— Can someone give two less-mobile neighbors a lift?" />
              </div>
              <a href="/threads" className="mt-2 inline-block text-[12px] font-semibold text-[var(--color-link)] underline underline-offset-2">
                <T nl="Open gesprek" en="Open thread" /> →
              </a>
            </div>
          </div>
        </PhoneFrame>

        <div className="max-w-md pt-3">
          <div className="text-xs uppercase tracking-widest text-[var(--color-uitwijken)] mb-3">
            <T nl="Adoptie zonder feeddruk" en="Adoption without feed pressure" />
          </div>
          <h2 className="font-sans font-bold text-3xl tracking-tight leading-[1.15] mb-4">
            <T nl="Events geven directe waarde voordat iemand iets post." en="Events create direct value before anyone posts." />
          </h2>
          <p className="text-[15px] leading-relaxed text-[#2a2926] mb-4">
            <T
              nl="Dit lost het cold-start probleem anders op. De eerste waarde komt uit bestaande activiteit: gemeentelijke bijeenkomsten, buurtorganisaties, ondernemersruimtes, sportclubs, bibliotheken, scholen en bewonersinitiatieven."
              en="This solves cold start differently. The first value comes from existing activity: city meetings, neighborhood organizations, entrepreneur spaces, sports clubs, libraries, schools, and resident initiatives."
            />
          </p>
          <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4 text-[13px] leading-relaxed">
            <T
              nl="De KPI is niet hoeveel mensen scrollen, maar hoeveel mensen beter weten waar ze heen kunnen, wie iets organiseert en hoe ze kunnen bijdragen."
              en="The KPI is not how many people scroll, but how many people better know where to go, who is organizing, and how they can contribute."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
