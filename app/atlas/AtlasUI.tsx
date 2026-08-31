import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { T } from "../lib/i18n";
import {
  COVERAGE_META,
  CONFIDENCE_META,
  FEASIBILITY_META,
  DISTRICTS,
  FUNCTION_META,
  GEOGRAPHY_META,
  MODEL_META,
  PLATFORMS,
  coverageFor,
  type Confidence,
  type Feasibility,
  type FunctionKey,
  type Geography,
  type ModelKey,
  type Note,
} from "./platforms";

/** Small state marker that appears next to every claim in the atlas. */
export function ConfidencePill({ confidence }: { confidence: Confidence }) {
  const m = CONFIDENCE_META[confidence];
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] ${m.cls}`}
    >
      <T nl={m.nl} en={m.en} />
    </span>
  );
}

/** How hard the usage number is to get — shown next to every estimate method. */
export function FeasibilityPill({ feasibility }: { feasibility: Feasibility }) {
  const m = FEASIBILITY_META[feasibility];
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] ${m.cls}`}
    >
      <T nl={m.nl} en={m.en} />
    </span>
  );
}

export function Chip({
  children,
  tone = "plain",
}: {
  children: React.ReactNode;
  tone?: "plain" | "geo" | "model";
}) {
  const cls =
    tone === "geo"
      ? "border-[var(--color-rule)] bg-[var(--color-civic-soft)] text-[#164a72]"
      : tone === "model"
        ? "border-[var(--color-rule)] bg-[#efece4] text-[#5a564c]"
        : "border-[var(--color-rule)] bg-white text-[var(--color-secondary)]";
  return (
    <span className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-[11px] ${cls}`}>
      {children}
    </span>
  );
}

export function GeoChip({ k }: { k: Geography }) {
  return (
    <Chip tone="geo">
      <T {...GEOGRAPHY_META[k]} />
    </Chip>
  );
}

export function ModelChip({ k }: { k: ModelKey }) {
  return (
    <Chip tone="model">
      <T {...MODEL_META[k]} />
    </Chip>
  );
}

export function FunctionChip({ k }: { k: FunctionKey }) {
  return (
    <Chip>
      <T {...FUNCTION_META[k]} />
    </Chip>
  );
}

/** One profile field: label, the claim, its confidence, and where it came from. */
export function FieldBlock({ label, note }: { label: React.ReactNode; note: Note }) {
  return (
    <div className="border-t border-[var(--color-rule)] py-4">
      <div className="mb-1.5 flex flex-wrap items-center gap-2">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
          {label}
        </span>
        <ConfidencePill confidence={note.confidence} />
      </div>
      <p className="max-w-2xl text-[14.5px] leading-relaxed text-[#2a2926]">
        <T {...note.value} />
      </p>
      {note.source && (
        <a
          href={note.source}
          target="_blank"
          rel="noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-[var(--color-link)] underline underline-offset-2 hover:no-underline"
        >
          <T nl="Bron" en="Source" />
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

/**
 * The ecosystem map, geographic axis. Deliberately a coverage grid rather than
 * pins on a map: we have no verified coordinates, and the honest finding is
 * exactly which districts this atlas cannot yet say anything about.
 */
export function CoverageGrid() {
  return (
    <div>
      <div className="overflow-x-auto border border-[var(--color-rule)] bg-white">
        <table className="w-full min-w-[640px] border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="border-b-2 border-[var(--color-ink)] px-3 py-2 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                <T nl="Stadsdeel" en="District" />
              </th>
              {PLATFORMS.map((p) => (
                <th
                  key={p.slug}
                  className="border-b-2 border-[var(--color-ink)] px-2 py-2 text-center text-[11px] font-semibold"
                >
                  <Link
                    href={`/atlas/${p.slug}`}
                    className="text-[var(--color-ink)] hover:text-[var(--color-link)] hover:underline"
                  >
                    {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DISTRICTS.map((d) => (
              <tr key={d}>
                <th className="border-b border-[var(--color-rule)] px-3 py-2 text-left font-semibold">
                  {d}
                </th>
                {PLATFORMS.map((p) => {
                  const cell = coverageFor(p, d);
                  const m = COVERAGE_META[cell];
                  return (
                    <td
                      key={p.slug}
                      className={`border-b border-[var(--color-rule)] px-2 py-2 text-center text-[15px] ${m.cls}`}
                    >
                      <span aria-hidden="true">{m.mark}</span>
                      <span className="sr-only">{m.nl}</span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11.5px] text-[var(--color-secondary)]">
        {(Object.keys(COVERAGE_META) as (keyof typeof COVERAGE_META)[]).map((k) => (
          <span key={k} className="inline-flex items-center gap-1.5">
            <span className={`text-[14px] ${COVERAGE_META[k].cls}`} aria-hidden="true">
              {COVERAGE_META[k].mark}
            </span>
            <T nl={COVERAGE_META[k].nl} en={COVERAGE_META[k].en} />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * The standing disclaimer. It sits on every atlas surface on purpose: the site
 * must not read as a finished platform, and an unvalidated field must never look
 * like a finding.
 */
export function AtlasDisclaimer() {
  return (
    <div className="border-l-4 border-[var(--color-uitwijken)] bg-white px-4 py-3 text-[13px] leading-relaxed text-[#2a2926]">
      <T
        nl="Werk in uitvoering, v0.1. Alles hieronder is samengesteld uit de publieke zelfbeschrijving van de platformen (augustus 2026) en is nog met niemand gevalideerd. Er wordt bewust niet gescoord of gerangschikt — er is nog geen gedeeld beoordelingskader. Lege velden zijn geen oordeel, maar een vraag."
        en="Work in progress, v0.1. Everything below is compiled from the platforms' own public descriptions (August 2026) and has not been validated with anyone yet. Nothing is scored or ranked on purpose — there is no shared assessment framework yet. An empty field is not a judgement, it is a question."
      />
    </div>
  );
}
