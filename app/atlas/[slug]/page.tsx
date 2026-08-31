import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { TopBar } from "../../components/Nav";
import { T } from "../../lib/i18n";
import {
  AtlasDisclaimer,
  FeasibilityPill,
  FieldBlock,
  FunctionChip,
  GeoChip,
  ModelChip,
} from "../AtlasUI";
import { PLATFORMS, getPlatform } from "../platforms";

export function generateStaticParams() {
  return PLATFORMS.map((p) => ({ slug: p.slug }));
}

export default async function PlatformProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = getPlatform(slug);
  if (!platform) notFound();

  const index = PLATFORMS.findIndex((p) => p.slug === slug);
  const next = PLATFORMS[(index + 1) % PLATFORMS.length];

  return (
    <div className="min-h-screen">
      <TopBar />

      <div className="mx-auto max-w-6xl px-6 pt-8">
        <Link
          href="/atlas"
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-secondary)] hover:text-[var(--color-ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <T nl="Terug naar de atlas" en="Back to the atlas" />
        </Link>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-6 pt-5">
        <h1 className="mb-3 font-sans text-4xl font-bold leading-[1.15] tracking-tight text-[var(--color-ink)]">
          {platform.name}
        </h1>
        <p className="max-w-2xl text-[17px] leading-relaxed text-[#2a2926]">
          <T {...platform.tagline} />
        </p>
        <div className="mt-4">
          {platform.url ? (
            <a
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
            >
              {platform.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span className="inline-flex items-center rounded-sm border border-dashed border-[var(--color-rule)] bg-white px-2.5 py-1 text-[12px] text-[var(--color-secondary)]">
              <T
                nl="Geen canonieke URL gepubliceerd — eerst te bevestigen bij het team"
                en="No canonical URL published — to be confirmed with the team first"
              />
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-16">
        <AtlasDisclaimer />

        <div className="mt-6 flex flex-wrap gap-1.5">
          {platform.geography.map((g) => (
            <GeoChip key={g} k={g} />
          ))}
          {platform.models.map((m) => (
            <ModelChip key={m} k={m} />
          ))}
        </div>

        <div className="mt-6 border-b border-[var(--color-rule)]">
          <div className="border-t border-[var(--color-rule)] py-4">
            <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
              <T nl="Kernfuncties" en="Core functions" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {platform.functions.map((f) => (
                <FunctionChip key={f} k={f} />
              ))}
            </div>
          </div>

          <FieldBlock
            label={
              <>
                <T nl="Gestart" en="Started" />
                {platform.launched.year ? ` · ${platform.launched.year}` : ""}
              </>
            }
            note={{
              value: platform.launched.value,
              confidence: platform.launched.confidence,
              source: platform.launched.source,
            }}
          />
          <FieldBlock
            label={<T nl="Primaire doelgroep" en="Primary audience" />}
            note={platform.audience}
          />
          <FieldBlock label={<T nl="Doel" en="Purpose" />} note={platform.purpose} />
          <FieldBlock
            label={<T nl="Governance & eigenaarschap" en="Governance & ownership" />}
            note={platform.governance}
          />
          <FieldBlock
            label={<T nl="Financiering & exploitatie" en="Funding & operating model" />}
            note={platform.funding}
          />
          <FieldBlock
            label={<T nl="Activiteitssignalen" en="Activity signals" />}
            note={platform.activity}
          />
          <FieldBlock
            label={<T nl="Data & interoperabiliteit" en="Data & interoperability" />}
            note={platform.interop}
          />
          <FieldBlock
            label={<T nl="Moderatie & community-beheer" en="Moderation & community management" />}
            note={platform.moderation}
          />
          <FieldBlock
            label={<T nl="Relatie tot gemeente Amsterdam" en="Relationship to the City of Amsterdam" />}
            note={platform.cityRelation}
          />
        </div>

        {/* Uptake is the field everyone wants and nobody publishes. So: the method,
            not a made-up number. */}
        <div className="mt-8 border border-[var(--color-ink)] bg-white p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h2 className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-uitwijken)]">
              <T nl="Hoe je het gebruik zou schatten" en="How you would estimate uptake" />
            </h2>
            <FeasibilityPill feasibility={platform.usageEstimate.feasibility} />
          </div>
          <p className="max-w-3xl text-[14.5px] leading-relaxed text-[#2a2926]">
            <T {...platform.usageEstimate.value} />
          </p>
          <p className="mt-3 text-[12px] text-[var(--color-secondary)]">
            <T
              nl="Dit is een methode, geen meting. Er staat hier bewust geen bezoekcijfer: dat zou een schatting zijn die als feit gelezen wordt."
              en="This is a method, not a measurement. No visitor figure is stated here on purpose: it would be a guess that reads as a fact."
            />
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="border border-[var(--color-rule)] bg-white p-5">
            <h2 className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-uitwijken)]">
              <T nl="Wat dit platform goed doet" en="What this platform does well" />
            </h2>
            <p className="text-[14.5px] leading-relaxed text-[#2a2926]">
              <T {...platform.doesWell} />
            </p>
          </div>
          <div className="border border-[var(--color-rule)] bg-white p-5">
            <h2 className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-uitwijken)]">
              <T nl="Open vragen" en="Open questions" />
            </h2>
            <ul className="space-y-2 text-[14px] leading-relaxed text-[#2a2926]">
              {platform.openQuestions.map((q, i) => (
                <li
                  key={i}
                  className="border-t border-[var(--color-rule)] pt-2 first:border-t-0 first:pt-0"
                >
                  <T {...q} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-rule)] pt-6">
          <Link
            href="/atlas/submit"
            className="text-[13.5px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T
              nl="Klopt dit niet? Corrigeer dit profiel →"
              en="Is this wrong? Correct this profile →"
            />
          </Link>
          <Link
            href={`/atlas/${next.slug}`}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[var(--color-ink)] hover:text-[var(--color-link)]"
          >
            <T nl="Volgende" en="Next" />: {next.name}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
