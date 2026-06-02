import { TopBar, PageHeader } from "../components/Nav";
import { AppTopBar } from "../components/PhoneChrome";
import { PhoneFrame } from "../components/PhoneFrame";
import { CivicItem, MapView, MockRef, ScaleRail, ThemePill, WikiRef } from "../components/CivicUI";
import { T } from "../lib/i18n";

export default function MapLensMock() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Mock 01 · ruggengraat" en="Mock 01 · backbone" />}
        title={<T nl="Kaartlens — locatie plus thema" en="Map lens — location plus theme" />}
        subtitle={
          <T
            nl="Dit is de nieuwe hoofdpagina: niet een feed, maar een kaart waarop je continu kunt schakelen tussen huis, straat, buurt en stad, en daar thema's en rollen overheen legt."
            en="This is the new main page: not a feed, but a map where you continuously switch between house, street, neighborhood, and city, then layer themes and roles on top."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 -mt-4 pb-6 flex flex-wrap gap-2">
        <WikiRef slug="open-data" label={<T nl="Open data-bronnen" en="Open data sources" />} />
        <WikiRef slug="building-blocks" label={<T nl="De vier bouwblokken" en="The four building blocks" />} />
        <MockRef href="/asks" label={<T nl="Vraag & aanbod" en="Asks & offers" />} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16 flex gap-10 flex-wrap">
        <PhoneFrame
          title={<T nl="Kaartlens" en="Map lens" />}
          caption={<T nl="Buurt-scope · thema openbare ruimte" en="Neighborhood scope · public-space theme" />}
          annot={
            <T
              nl="De gebruiker kiest eerst schaal en thema. De kaart toont daarna verschillende civic objecten, niet alleen posts."
              en="The user chooses scale and theme first. The map then shows different civic objects, not just posts."
            />
          }
        >
          <AppTopBar left={<T nl="Stad" en="City" />} center="Uitwijken.nl" right={<span>⌕</span>} />
          <ScaleRail active="buurt" />
          <div className="px-4 py-3 border-b border-[var(--color-rule)] flex gap-2 overflow-x-auto">
            <ThemePill label={<T nl="Openbare ruimte" en="Public space" />} active />
            <ThemePill label={<T nl="Zorg" en="Care" />} />
            <ThemePill label={<T nl="Jeugd" en="Youth" />} />
            <ThemePill label={<T nl="Events" en="Events" />} />
          </div>
          <MapView activeScale="buurt" />
          <div className="space-y-2 bg-[#fafaf7] px-4 py-4">
            <CivicItem
              role="government"
              kind="survey"
              title={<T nl="Herinrichting Javaplein · feedback open" en="Javaplein redesign · feedback open" />}
              meta={<T nl="Buurt · sluit over 12 dagen" en="Neighborhood · closes in 12 days" />}
            />
            <CivicItem
              role="resident"
              kind="ask"
              title={<T nl="23 bewoners markeren speelplek als prioriteit" en="23 residents mark playground as priority" />}
              meta={<T nl="Straatcluster · hoogste signaal deze week" en="Street cluster · highest signal this week" />}
            />
            <CivicItem
              role="entrepreneur"
              kind="event"
              title={<T nl="Bakkerij Anatolia biedt ruimte voor buurtavond" en="Anatolia Bakery offers room for neighborhood night" />}
              meta={<T nl="Ondernemer · donderdag 19:00" en="Entrepreneur · Thursday 19:00" />}
            />
          </div>
        </PhoneFrame>

        <div className="max-w-md pt-3">
          <div className="text-xs uppercase tracking-widest text-[var(--color-uitwijken)] mb-3">
            <T nl="Wat deze mock bewijst" en="What this mock proves" />
          </div>
          <h2 className="font-sans font-bold text-3xl tracking-tight leading-[1.15] mb-4">
            <T
              nl="De community ontstaat uit de kruising van plek en onderwerp."
              en="The community appears at the intersection of place and subject."
            />
          </h2>
          <p className="text-[15px] leading-relaxed text-[#2a2926] mb-4">
            <T
              nl="Facebookgroepen, WhatsAppgroepen en Nextdoor starten vanuit een container. Uitwijken.nl start vanuit een civic lens: welke schaal bekijk ik, welk thema volg ik, en welke rollen zijn actief?"
              en="Facebook groups, WhatsApp groups, and Nextdoor start from a container. Uitwijken.nl starts from a civic lens: what scale am I viewing, what theme am I following, and which roles are active?"
            />
          </p>
          <div className="grid grid-cols-1 gap-3 text-[13px]">
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <strong><T nl="Locatie is dynamisch." en="Location is dynamic." /></strong>{" "}
              <T nl="De gebruiker zoomt naar het niveau dat relevant is." en="The user zooms to the level that is relevant." />
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <strong><T nl="Thema is structureel." en="Theme is structural." /></strong>{" "}
              <T nl="Zonder thema is het weer een algemene buurtfeed." en="Without theme, it becomes a generic neighborhood feed again." />
            </div>
            <div className="rounded-lg border border-[var(--color-rule)] bg-white p-4">
              <strong><T nl="Rollen zijn zichtbaar." en="Roles are visible." /></strong>{" "}
              <T nl="Overheid, bewoners en ondernemers verschijnen naast elkaar, maar niet als hetzelfde type object." en="Government, residents, and entrepreneurs appear together, but not as the same kind of object." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
