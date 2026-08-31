import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TopBar, PageHeader } from "../../components/Nav";
import { T } from "../../lib/i18n";
import { AtlasDisclaimer, ConfidencePill } from "../AtlasUI";
import {
  FUNCTION_META,
  GEOGRAPHY_META,
  MODEL_META,
  PLATFORMS,
  atlasStats,
  type Note,
  type Platform,
} from "../platforms";

type Row = {
  key: string;
  label: { nl: string; en: string };
  /** Prose rows read a Note off the platform; list rows render their own chips. */
  note?: (p: Platform) => Note;
  list?: (p: Platform) => { nl: string; en: string }[];
};

const ROWS: Row[] = [
  {
    key: "geography",
    label: { nl: "Bereik", en: "Reach" },
    list: (p) => p.geography.map((g) => GEOGRAPHY_META[g]),
  },
  {
    key: "models",
    label: { nl: "Eigenaarschap", en: "Ownership" },
    list: (p) => p.models.map((m) => MODEL_META[m]),
  },
  {
    key: "functions",
    label: { nl: "Kernfuncties", en: "Core functions" },
    list: (p) => p.functions.map((f) => FUNCTION_META[f]),
  },
  {
    key: "launched",
    label: { nl: "Gestart", en: "Started" },
    note: (p) => ({
      value: {
        nl: p.launched.year ? `${p.launched.year} — ${p.launched.value.nl}` : p.launched.value.nl,
        en: p.launched.year ? `${p.launched.year} — ${p.launched.value.en}` : p.launched.value.en,
      },
      confidence: p.launched.confidence,
      source: p.launched.source,
    }),
  },
  { key: "audience", label: { nl: "Doelgroep", en: "Audience" }, note: (p) => p.audience },
  { key: "purpose", label: { nl: "Doel", en: "Purpose" }, note: (p) => p.purpose },
  {
    key: "governance",
    label: { nl: "Governance", en: "Governance" },
    note: (p) => p.governance,
  },
  { key: "funding", label: { nl: "Financiering", en: "Funding" }, note: (p) => p.funding },
  { key: "activity", label: { nl: "Activiteit", en: "Activity" }, note: (p) => p.activity },
  {
    key: "interop",
    label: { nl: "Interoperabiliteit", en: "Interoperability" },
    note: (p) => p.interop,
  },
  { key: "moderation", label: { nl: "Moderatie", en: "Moderation" }, note: (p) => p.moderation },
  {
    key: "cityRelation",
    label: { nl: "Relatie gemeente", en: "City relationship" },
    note: (p) => p.cityRelation,
  },
  {
    // Not a usage number — the cheapest defensible way to go and get one.
    key: "usage",
    label: { nl: "Gebruik meten", en: "Measuring uptake" },
    note: (p) => ({ value: p.usageEstimate.value, confidence: "documented" as const }),
  },
];

export default function ComparePage() {
  const stats = atlasStats();

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Atlas · vergelijking" en="Atlas · comparison" />}
        title={<T nl="Dezelfde velden, naast elkaar" en="The same fields, side by side" />}
        subtitle={
          <T
            nl="Geen score, geen rangschikking, geen winnaar. Alleen dezelfde vragen aan elk platform — zodat zichtbaar wordt waar het antwoord ontbreekt. Van de velden hieronder is een groot deel nog niet gevalideerd; dat is met opzet zichtbaar gelaten."
            en="No score, no ranking, no winner. Just the same questions asked of every platform — so it becomes visible where the answer is missing. A large share of the fields below is still unvalidated; that is deliberately left visible."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-4">
        <AtlasDisclaimer />
        <p className="mt-4 text-[13.5px] text-[var(--color-secondary)]">
          <T
            nl={`${stats.openFields} van de ${stats.fields} inhoudelijke velden staan nog open.`}
            en={`${stats.openFields} of ${stats.fields} substantive fields are still open.`}
          />
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <div className="overflow-x-auto border border-[var(--color-rule)] bg-white">
          <table className="w-full min-w-[1100px] border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="sticky left-0 z-10 border-b-2 border-r border-[var(--color-ink)] border-r-[var(--color-rule)] bg-white px-3 py-3 text-left text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)]">
                  <T nl="Veld" en="Field" />
                </th>
                {PLATFORMS.map((p) => (
                  <th
                    key={p.slug}
                    className="w-[16%] border-b-2 border-[var(--color-ink)] px-3 py-3 text-left align-bottom"
                  >
                    <Link
                      href={`/atlas/${p.slug}`}
                      className="font-sans text-[15px] font-bold tracking-tight text-[var(--color-ink)] hover:text-[var(--color-link)] hover:underline"
                    >
                      {p.name}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.key} className="align-top">
                  <th className="sticky left-0 z-10 border-b border-r border-[var(--color-rule)] bg-white px-3 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                    <T {...row.label} />
                  </th>
                  {PLATFORMS.map((p) => {
                    if (row.list) {
                      return (
                        <td
                          key={p.slug}
                          className="border-b border-[var(--color-rule)] px-3 py-3"
                        >
                          <div className="flex flex-wrap gap-1">
                            {row.list(p).map((item) => (
                              <span
                                key={item.en}
                                className="inline-flex rounded-sm border border-[var(--color-rule)] bg-[#faf9f5] px-1.5 py-0.5 text-[11px] text-[var(--color-secondary)]"
                              >
                                <T {...item} />
                              </span>
                            ))}
                          </div>
                        </td>
                      );
                    }
                    const note = row.note!(p);
                    const open = note.confidence === "to-validate";
                    return (
                      <td
                        key={p.slug}
                        className={`border-b border-[var(--color-rule)] px-3 py-3 ${
                          open ? "bg-[#f7f6f1]" : ""
                        }`}
                      >
                        <div className="mb-1.5">
                          <ConfidencePill confidence={note.confidence} />
                        </div>
                        <p
                          className={`text-[12.5px] leading-relaxed ${
                            open ? "italic text-[var(--color-secondary)]" : "text-[#2a2926]"
                          }`}
                        >
                          <T {...note.value} />
                        </p>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-rule)] pt-5">
          <Link
            href="/atlas"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)] hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <T nl="Terug naar de directory" en="Back to the directory" />
          </Link>
          <Link
            href="/patterns"
            className="text-[13.5px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T
              nl="Wat volgt hieruit? Patronen en gaten →"
              en="What follows from this? Patterns and gaps →"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
