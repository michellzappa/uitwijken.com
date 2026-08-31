import { TopBar, PageHeader } from "../components/Nav";
import { MockRef, RoleTag, WikiRef } from "../components/CivicUI";
import { T } from "../lib/i18n";

function RoleColumn({
  role,
  title,
  items,
}: {
  role: "resident" | "government" | "entrepreneur";
  title: React.ReactNode;
  items: React.ReactNode[];
}) {
  return (
    <div className="rounded-lg border border-[var(--color-rule)] bg-white p-5">
      <RoleTag role={role} />
      <h2 className="mt-3 font-serif italic text-[24px] leading-tight">{title}</h2>
      <ul className="mt-4 space-y-2 text-[13px] leading-relaxed text-[#2a2926]">
        {items.map((item, index) => (
          <li key={index} className="border-t border-[var(--color-rule)] pt-2 first:border-t-0 first:pt-0">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function GovernanceCard({
  title,
  body,
}: {
  title: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-[var(--color-rule)] bg-white p-5">
      <h3 className="font-serif italic text-[22px] leading-tight">{title}</h3>
      <p className="mt-3 text-[13.5px] leading-relaxed text-[#2a2926]">{body}</p>
    </div>
  );
}

export default function GovernanceMock() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Mock 06 · eigenaarschap en rollen" en="Mock 06 · ownership and roles" />}
        title={<T nl="Rollen & governance — van, voor en door samenleving" en="Roles & governance — from, for, and by society" />}
        subtitle={
          <T
            nl="Deze mock maakt expliciet dat Uitwijken.nl niet van de gemeente en niet van een bedrijf is. De drie maatschappelijke rollen doen mee in het product en in het bouwproces."
            en="This mock makes explicit that Uitwijken.nl is not owned by the city and not by a company. The three societal roles participate in the product and in the build process."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 -mt-4 pb-6 flex flex-wrap gap-2">
        <WikiRef slug="governance" label={<T nl="Governance-model" en="Governance model" />} />
        <MockRef href="/operating-model" label={<T nl="Werkbaar operating model" en="Working operating model" />} />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <RoleColumn
            role="resident"
            title={<T nl="Bewoners" en="Residents" />}
            items={[
              <T key="1" nl="Brengen behoeften, ervaringen, prioriteiten en energie in." en="Bring needs, experience, priorities, and energy." />,
              <T key="2" nl="Beantwoorden vragen, starten initiatieven, markeren plekken." en="Answer questions, start initiatives, mark places." />,
              <T key="3" nl="Dragen formele moderatie en buurtborden mee." en="Help carry formal moderation and local boards." />,
            ]}
          />
          <RoleColumn
            role="government"
            title={<T nl="Overheid" en="Government" />}
            items={[
              <T key="1" nl="Brengt plannen, budgetten, veiligheid, data en publieke verantwoordelijkheid in." en="Brings plans, budgets, safety, data, and public responsibility." />,
              <T key="2" nl="Stelt vragen in plaats van alles vooraf te beslissen." en="Asks questions instead of deciding everything upfront." />,
              <T key="3" nl="Financiert of enabled zonder eigenaar te worden." en="Funds or enables without becoming owner." />,
            ]}
          />
          <RoleColumn
            role="entrepreneur"
            title={<T nl="Ondernemers" en="Entrepreneurs" />}
            items={[
              <T key="1" nl="Brengen diensten, ruimtes, lokale economie en praktische capaciteit in." en="Bring services, spaces, local economy, and practical capacity." />,
              <T key="2" nl="Kunnen events hosten en buurtvragen praktisch ondersteunen." en="Can host events and practically support local questions." />,
              <T key="3" nl="Doen mee zonder de laag commercieel te sturen." en="Participate without commercially steering the layer." />,
            ]}
          />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          <GovernanceCard
            title={<T nl="Formele communities" en="Formal communities" />}
            body={
              <T
                nl="Gebieden en thema's die raken aan budgetten, plannen of publieke besluiten krijgen een zichtbaar moderatiebord dat fysiek bestaat en aanspreekbaar is."
                en="Areas and themes that touch budgets, plans, or public decisions get a visible moderation board that exists physically and can be held accountable."
              />
            }
          />
          <GovernanceCard
            title={<T nl="Informele communities" en="Informal communities" />}
            body={
              <T
                nl="Bewonersinitiatieven, themagroepen en praktische netwerken kunnen lichter georganiseerd worden, zolang scope, normen en escalatie duidelijk blijven."
                en="Resident initiatives, theme groups, and practical networks can be organized more lightly, as long as scope, norms, and escalation stay clear."
              />
            }
          />
          <GovernanceCard
            title={<T nl="Society-owned" en="Society-owned" />}
            body={
              <T
                nl="De juridische vorm is nog open, maar de randvoorwaarde niet: de laag mag niet afhankelijk zijn van advertentieprikkels, platform lock-in of gemeentelijke surveillance."
                en="The legal form is still open, but the requirement is not: the layer cannot depend on ad incentives, platform lock-in, or municipal surveillance."
              />
            }
          />
          <GovernanceCard
            title={<T nl="Teamvorming" en="Team formation" />}
            body={
              <T
                nl="De volgende fase moet een projectlead, product/prototype lead, civic governance, technische data-capaciteit en lokale co-design capaciteit organiseren."
                en="The next phase must organize a project lead, product/prototype lead, civic governance, technical data capacity, and local co-design capacity."
              />
            }
          />
        </div>

        {/* Design principles decided in conversation — public-only, pseudonymous, residence-gated */}
        <div className="mt-12 border-t border-[var(--color-rule)] pt-8">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-uitwijken)] font-semibold mb-2">
            <T nl="Ontwerpprincipes vanaf dag één" en="Design principles from day one" />
          </div>
          <h2 className="font-sans font-bold text-2xl tracking-tight leading-snug mb-2">
            <T nl="Drie keuzes die misbruik vóór zijn" en="Three choices that pre-empt misuse" />
          </h2>
          <p className="max-w-2xl text-[15px] text-[#2a2926] leading-relaxed mb-6">
            <T
              nl="Deze zijn geen detail voor later. Ze bepalen de aard van het platform en maken moderatie behapbaar — juist omdat er twintig jaar online-community-ervaring achter zit."
              en="These are not details for later. They set the nature of the platform and keep moderation tractable — precisely because twenty years of online-community experience sit behind them."
            />
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <GovernanceCard
              title={<T nl="Alles openbaar" en="Everything public" />}
              body={
                <T
                  nl="Geen privéberichten, geen besloten groepen. Wat hier gebeurt is publiek van aard. Dat voorkomt misbruik in de schaduw en houdt het platform aanspreekbaar — je kunt niet stiekem iets organiseren wat het daglicht niet verdraagt."
                  en="No private messages, no closed groups. What happens here is public by nature. That prevents misuse in the shadows and keeps the platform accountable — you cannot quietly organize something that can't bear daylight."
                />
              }
            />
            <GovernanceCard
              title={<T nl="Geverifieerd, maar pseudoniem" en="Verified, but pseudonymous" />}
              body={
                <T
                  nl="Inloggen bewijst dat je een echte bewoner bent (bijv. via DigiD), maar je kiest zelf onder welke naam je verschijnt. Eén echt mens achter elk account, zonder gedwongen blootstelling van je volledige naam."
                  en="Signing in proves you are a real resident (e.g. via DigiD), but you choose the name you appear under. One real human behind each account, without forced exposure of your full name."
                />
              }
            />
            <GovernanceCard
              title={<T nl="Stemrecht volgt verblijf" en="Voting follows residence" />}
              body={
                <T
                  nl="Wie aantoont dat hij hier woont, mag meebeslissen over die plek — een buurtbudget, een plan, een prioriteit. Verblijf bepaalt stemrecht per schaal, los van wie er meeleest."
                  en="Whoever proves they live here may help decide about that place — a neighborhood budget, a plan, a priority. Residence sets voting rights per scale, separate from who can read along."
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
