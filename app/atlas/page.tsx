"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ExternalLink, RotateCcw } from "lucide-react";
import { TopBar, PageHeader } from "../components/Nav";
import { T } from "../lib/i18n";
import {
  AtlasDisclaimer,
  CoverageGrid,
  FeasibilityPill,
  FunctionChip,
  GeoChip,
  ModelChip,
} from "./AtlasUI";
import {
  CONFIDENCE_META,
  FUNCTION_META,
  GEOGRAPHY_META,
  MODEL_META,
  PLATFORMS,
  SHORTLIST,
  USAGE_METHODS,
  atlasStats,
  type FunctionKey,
  type Geography,
  type ModelKey,
} from "./platforms";

type FilterState = {
  geography: Geography[];
  functions: FunctionKey[];
  models: ModelKey[];
};

const EMPTY: FilterState = { geography: [], functions: [], models: [] };

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function FilterRow<K extends string>({
  title,
  meta,
  selected,
  onToggle,
}: {
  title: React.ReactNode;
  meta: Record<K, { nl: string; en: string }>;
  selected: K[];
  onToggle: (k: K) => void;
}) {
  const keys = Object.keys(meta) as K[];
  return (
    <div className="border-t border-[var(--color-rule)] py-3">
      <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
        {title}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {keys.map((k) => {
          const active = selected.includes(k);
          return (
            <button
              key={k}
              type="button"
              aria-pressed={active}
              onClick={() => onToggle(k)}
              className={`rounded-sm border px-2.5 py-1 text-[12px] transition ${
                active
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] font-semibold text-white"
                  : "border-[var(--color-rule)] bg-white text-[var(--color-ink)] hover:border-[var(--color-ink)]"
              }`}
            >
              <T {...meta[k]} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AtlasPage() {
  const [filters, setFilters] = useState<FilterState>(EMPTY);
  const stats = atlasStats();

  const results = useMemo(
    () =>
      PLATFORMS.filter((p) => {
        const geoOk =
          filters.geography.length === 0 || filters.geography.some((g) => p.geography.includes(g));
        const fnOk =
          filters.functions.length === 0 || filters.functions.some((f) => p.functions.includes(f));
        const modelOk =
          filters.models.length === 0 || filters.models.some((m) => p.models.includes(m));
        return geoOk && fnOk && modelOk;
      }),
    [filters],
  );

  const active =
    filters.geography.length + filters.functions.length + filters.models.length > 0;

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Atlas · v0.1 · zes ingangen" en="Atlas · v0.1 · six entries" />}
        title={<T nl="Wat bestaat er al?" en="What already exists?" />}
        subtitle={
          <T
            nl="Een beschrijvende atlas van bestaande community-, participatie- en kennisinfrastructuur in en om Amsterdam. Elk profiel volgt dezelfde velden, zodat platformen vergelijkbaar worden zonder dat ze tegen elkaar worden uitgespeeld."
            en="A descriptive atlas of existing community, participation, and civic-knowledge infrastructure in and around Amsterdam. Every profile follows the same fields, so platforms become comparable without being played off against each other."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <AtlasDisclaimer />

        {/* Honest state of the evidence base, computed from the data itself. */}
        <div className="mt-6 grid grid-cols-2 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-4">
          {[
            {
              n: `${stats.total}`,
              label: { nl: "platformen beschreven", en: "platforms described" },
            },
            {
              n: `${stats.openFields}/${stats.fields}`,
              label: { nl: "velden nog te valideren", en: "fields still to validate" },
            },
            {
              n: `${stats.districtsCovered}/${stats.districtsTotal}`,
              label: {
                nl: "stadsdelen met gedocumenteerd buurtplatform",
                en: "districts with a documented neighbourhood platform",
              },
            },
            {
              n: `${stats.interopKnown}/${stats.total}`,
              label: {
                nl: "platformen met bekende interoperabiliteit",
                en: "platforms with known interoperability",
              },
            },
          ].map((s) => (
            <div key={s.label.en} className="bg-white px-4 py-4">
              <div className="font-sans text-2xl font-bold tracking-tight">{s.n}</div>
              <div className="mt-1 text-[11.5px] leading-snug text-[var(--color-secondary)]">
                <T {...s.label} />
              </div>
            </div>
          ))}
        </div>

        {/* — Ecosystem map, geographic axis — */}
        <section className="mt-12">
          <div className="mb-4 border-t border-[var(--color-rule)] pt-5">
            <h2 className="font-sans text-xl font-bold leading-snug tracking-tight">
              <T nl="Dekking per stadsdeel" en="Coverage by district" />
            </h2>
            <p className="mt-1 max-w-3xl text-[14px] text-[var(--color-secondary)]">
              <T
                nl="Geen pinnen op een kaart: we hebben nog geen geverifieerde locatiegegevens. Wel dit raster — en de lege kolommen zijn de bevinding. Een gat hier is een gat in de kaart, niet noodzakelijk een gat in de stad."
                en="No pins on a map: we have no verified location data yet. This grid instead — and the empty rows are the finding. A gap here is a gap in the map, not necessarily a gap in the city."
              />
            </p>
          </div>
          <CoverageGrid />
        </section>

        {/* — Filters + directory — */}
        <section className="mt-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-t border-[var(--color-rule)] pt-5">
            <div>
              <h2 className="font-sans text-xl font-bold leading-snug tracking-tight">
                <T nl="Directory" en="Directory" />
              </h2>
              <p className="mt-1 max-w-3xl text-[14px] text-[var(--color-secondary)]">
                <T
                  nl="Filter op bereik, functie en eigenaarschap. Filters combineren; binnen een rij geldt 'of'."
                  en="Filter by reach, function, and ownership. Filters combine; within a row it is an 'or'."
                />
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/atlas/compare"
                className="inline-flex items-center gap-1.5 border border-[var(--color-rule)] bg-white px-3 py-1.5 text-[12px] font-semibold text-[var(--color-ink)] hover:border-[var(--color-ink)]"
              >
                <T nl="Vergelijk in één tabel" en="Compare in one table" />
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <Link
                href="/atlas/interop"
                className="inline-flex items-center gap-1.5 border border-[var(--color-ink)] bg-[var(--color-ink)] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-black"
              >
                <T nl="Wat praat er met wat?" en="What talks to what?" />
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="border border-[var(--color-rule)] bg-[#faf9f5] px-4 pb-4 pt-1">
            <FilterRow
              title={<T nl="Bereik" en="Reach" />}
              meta={GEOGRAPHY_META}
              selected={filters.geography}
              onToggle={(k) => setFilters((f) => ({ ...f, geography: toggle(f.geography, k) }))}
            />
            <FilterRow
              title={<T nl="Functies" en="Functions" />}
              meta={FUNCTION_META}
              selected={filters.functions}
              onToggle={(k) => setFilters((f) => ({ ...f, functions: toggle(f.functions, k) }))}
            />
            <FilterRow
              title={<T nl="Eigenaarschap & relatie" en="Ownership & relationship" />}
              meta={MODEL_META}
              selected={filters.models}
              onToggle={(k) => setFilters((f) => ({ ...f, models: toggle(f.models, k) }))}
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-rule)] pt-3">
              <span className="text-[12.5px] text-[var(--color-secondary)]">
                {results.length}{" "}
                <T
                  nl={results.length === 1 ? "platform" : "platformen"}
                  en={results.length === 1 ? "platform" : "platforms"}
                />
              </span>
              {active && (
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY)}
                  className="inline-flex items-center gap-1.5 text-[12px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <T nl="Filters wissen" en="Clear filters" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {results.map((p) => (
              <div
                key={p.slug}
                className="flex flex-col border border-[var(--color-rule)] bg-white p-5"
              >
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={`/atlas/${p.slug}`}
                    className="font-sans text-2xl font-bold leading-snug tracking-tight hover:text-[var(--color-link)] hover:underline hover:underline-offset-4"
                  >
                    {p.name}
                  </Link>
                  {p.url ? (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11.5px] text-[var(--color-link)] underline underline-offset-2 hover:no-underline"
                    >
                      {p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                      <T nl="URL te bevestigen" en="URL to confirm" />
                    </span>
                  )}
                </div>
                <p className="mb-3 text-[14.5px] leading-relaxed text-[#2a2926]">
                  <T {...p.tagline} />
                </p>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center rounded-sm border border-[var(--color-ink)] bg-white px-2 py-0.5 text-[11px] font-semibold text-[var(--color-ink)]">
                    {p.launched.year ? (
                      <>
                        <T nl="Sinds" en="Since" />
                        &nbsp;{p.launched.year}
                      </>
                    ) : (
                      <T nl="Startjaar onbekend" en="Start year unknown" />
                    )}
                  </span>
                  {p.geography.map((g) => (
                    <GeoChip key={g} k={g} />
                  ))}
                  {p.models.map((m) => (
                    <ModelChip key={m} k={m} />
                  ))}
                </div>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {p.functions.map((f) => (
                    <FunctionChip key={f} k={f} />
                  ))}
                </div>
                <Link
                  href={`/atlas/${p.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 border-t border-[var(--color-rule)] pt-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-link)] hover:underline hover:underline-offset-4"
                >
                  <T nl="Volledig profiel" en="Full profile" />
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>

          {results.length === 0 && (
            <p className="mt-5 border border-dashed border-[var(--color-rule)] bg-white px-4 py-6 text-center text-[14px] text-[var(--color-secondary)]">
              <T
                nl="Geen platform in deze atlas voldoet aan deze combinatie. Dat kan een gat in de stad zijn — of een gat in ons onderzoek."
                en="No platform in this atlas matches this combination. That could be a gap in the city — or a gap in our research."
              />
            </p>
          )}
        </section>

        {/* — How to get a usage number, since nobody publishes one — */}
        <section className="mt-14">
          <div className="mb-4 border-t border-[var(--color-rule)] pt-5">
            <h2 className="font-sans text-xl font-bold leading-snug tracking-tight">
              <T nl="Hoe je gebruik schat" en="How to estimate uptake" />
            </h2>
            <p className="mt-1 max-w-3xl text-[14px] text-[var(--color-secondary)]">
              <T
                nl="Adoptie is het veld dat iedereen wil weten en dat vrijwel niemand publiceert. Deze atlas noemt daarom geen bezoekcijfers — die zouden gok zijn die als feit gelezen wordt. In plaats daarvan: de ladder van methodes, goedkoopste eerst. Elk profiel past er één op zichzelf toe."
                en="Adoption is the field everyone wants and almost nobody publishes. So this atlas states no visitor figures — they would be guesses that read as facts. Instead: the ladder of methods, cheapest first. Every profile applies one of them to itself."
              />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-2 lg:grid-cols-3">
            {USAGE_METHODS.map((m) => (
              <div key={m.n} className="bg-white p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="font-serif text-xl italic text-[var(--color-uitwijken)]">
                    {m.n}
                  </span>
                  <FeasibilityPill feasibility={m.feasibility} />
                </div>
                <h3 className="mb-2 font-sans text-[17px] font-bold leading-snug tracking-tight">
                  <T {...m.title} />
                </h3>
                <p className="mb-2 text-[13.5px] leading-relaxed text-[#2a2926]">
                  <T {...m.how} />
                </p>
                <p className="border-t border-[var(--color-rule)] pt-2 text-[12.5px] leading-relaxed text-[var(--color-secondary)]">
                  <T {...m.worth} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-3 max-w-3xl text-[12.5px] leading-relaxed text-[var(--color-secondary)]">
            <T
              nl="Bewust niet in deze ladder: schattingen van externe verkeersdiensten. Onder ongeveer tienduizend bezoeken per maand zijn die ruis, en elk buurtplatform in deze atlas zit daaronder."
              en="Deliberately absent from this ladder: third-party traffic estimators. Below roughly ten thousand visits a month they are noise, and every neighbourhood platform in this atlas is below that."
            />
          </p>
        </section>

        {/* — The queue, listed rather than silently omitted — */}
        <section className="mt-14">
          <div className="mb-4 border-t border-[var(--color-rule)] pt-5">
            <h2 className="font-sans text-xl font-bold leading-snug tracking-tight">
              <T nl="Nog niet geprofileerd" en="Not yet profiled" />
            </h2>
            <p className="mt-1 max-w-3xl text-[14px] text-[var(--color-secondary)]">
              <T
                nl="Platformen die vermoedelijk in deze atlas thuishoren, maar nog geen volledig profiel hebben. Ze staan hier met naam en startjaar in plaats van stilzwijgend weggelaten te worden — een wachtrij waar je het mee oneens kunt zijn is beter dan een inventaris die doet alsof hij compleet is."
                en="Platforms that probably belong in this atlas but do not have a full profile yet. They are listed with name and start year rather than silently omitted — a queue you can disagree with beats an inventory pretending to be complete."
              />
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px border border-[var(--color-rule)] bg-[var(--color-rule)] md:grid-cols-2">
            {SHORTLIST.map((c) => (
              <div key={c.name} className="bg-white p-5">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-sans text-lg font-bold leading-snug tracking-tight">
                    {c.name}
                  </h3>
                  <span
                    className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] ${
                      CONFIDENCE_META[c.launchedConfidence].cls
                    }`}
                  >
                    {c.launchedYear ? (
                      <>
                        <T nl="Sinds" en="Since" />
                        &nbsp;{c.launchedYear}
                      </>
                    ) : (
                      <T nl="Startjaar te valideren" en="Start year to validate" />
                    )}
                  </span>
                </div>
                <p className="mb-2 text-[14px] leading-relaxed text-[#2a2926]">
                  <T {...c.what} />
                </p>
                <p className="mb-2 border-l-2 border-[var(--color-uitwijken)] pl-3 text-[13.5px] leading-relaxed text-[#2a2926]">
                  <T {...c.why} />
                </p>
                <p className="text-[12.5px] leading-relaxed text-[var(--color-secondary)]">
                  <strong className="font-semibold">
                    <T nl="Gebruik meten: " en="Measuring uptake: " />
                  </strong>
                  <T {...c.usage} />
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-[var(--color-rule)] pt-2 text-[11.5px]">
                  {c.url && (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--color-link)] underline underline-offset-2 hover:no-underline"
                    >
                      {c.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                  {c.source && (
                    <a
                      href={c.source}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[var(--color-secondary)] underline underline-offset-2 hover:text-[var(--color-ink)]"
                    >
                      <T nl="Bron" en="Source" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-12 border-t border-[var(--color-rule)] pt-6">
          <p className="max-w-3xl text-[14px] leading-relaxed text-[#2a2926]">
            <strong className="text-[var(--color-ink)]">
              <T nl="Mist er iets?" en="Something missing?" />
            </strong>{" "}
            <T
              nl="Zes ingangen is een startpunt, geen inventaris. "
              en="Six entries is a starting point, not an inventory. "
            />
            <Link
              href="/atlas/submit"
              className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
            >
              <T nl="Voeg een initiatief toe of corrigeer een profiel" en="Add an initiative or correct a profile" />
            </Link>
            {" · "}
            <Link
              href="/patterns"
              className="text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
            >
              <T nl="lees de patronen en gaten" en="read the patterns and gaps" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
