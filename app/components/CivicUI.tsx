import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  ChevronRight,
  ClipboardList,
  Handshake,
  House,
  Landmark,
  LayoutTemplate,
  MessageSquare,
  Store,
  type LucideIcon,
} from "lucide-react";
import { T } from "../lib/i18n";

export type CivicRole = "resident" | "government" | "entrepreneur";

export function WikiRef({
  slug,
  label,
}: {
  slug: string;
  label: React.ReactNode;
}) {
  return (
    <Link
      href={`/docs/${slug}`}
      className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-rule)] bg-white px-2 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-secondary)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
    >
      <BookOpen className="w-3.5 h-3.5 text-[var(--color-uitwijken)]" aria-hidden="true" />
      <span className="font-semibold">{label}</span>
      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
    </Link>
  );
}

export function MockRef({
  href,
  label,
}: {
  href: string;
  label: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--color-rule)] bg-white px-2 py-1 text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-secondary)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
    >
      <LayoutTemplate className="w-3.5 h-3.5 text-[var(--color-link)]" aria-hidden="true" />
      <span className="font-semibold">{label}</span>
      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
    </Link>
  );
}

/**
 * The three roles — the "who" behind every civic item. Each carries an icon so
 * a reader can recognise the perspective at a glance (resident = house/lives
 * here, government = landmark/sets the rules, entrepreneur = store/offers value).
 * This is the single source of truth shared by the app and the wiki, so the
 * pills stay identical everywhere.
 */
export const ROLE_META: Record<
  CivicRole,
  { Icon: LucideIcon; nl: string; en: string; cls: string }
> = {
  resident: {
    Icon: House,
    nl: "Bewoner",
    en: "Resident",
    cls: "bg-[var(--color-uitwijken-soft)] text-[#7a3418]",
  },
  government: {
    Icon: Landmark,
    nl: "Overheid",
    en: "Government",
    cls: "bg-[var(--color-civic-soft)] text-[#164a72]",
  },
  entrepreneur: {
    Icon: Store,
    nl: "Ondernemer",
    en: "Entrepreneur",
    cls: "bg-[#dfe6d5] text-[#33501e]",
  },
};

/**
 * The four building blocks — the closed set of objects a user can create.
 * Roles answer "who"; primitives answer "what kind of object". Every civic
 * item on every screen carries both, so the vocabulary stays legible.
 */
export type PrimitiveKind = "event" | "thread" | "survey" | "ask";

export const PRIMITIVE_META: Record<
  PrimitiveKind,
  { Icon: LucideIcon; href: string; nl: string; en: string }
> = {
  event: { Icon: CalendarClock, href: "/events", nl: "Event", en: "Event" },
  thread: { Icon: MessageSquare, href: "/threads", nl: "Gesprek", en: "Thread" },
  survey: { Icon: ClipboardList, href: "/vragen", nl: "Enquête", en: "Survey" },
  ask: { Icon: Handshake, href: "/asks", nl: "Vraag & aanbod", en: "Ask / offer" },
};

export function PrimitiveTag({ kind }: { kind: PrimitiveKind }) {
  const m = PRIMITIVE_META[kind];
  return (
    <span className="inline-flex items-center gap-1 rounded-sm border border-[var(--color-rule)] bg-[#fafaf7] px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary)]">
      <m.Icon className="w-3 h-3 text-[var(--color-uitwijken)]" aria-hidden="true" />
      <T nl={m.nl} en={m.en} />
    </span>
  );
}

export function RoleTag({ role }: { role: CivicRole }) {
  const m = ROLE_META[role];
  return (
    <span className={`inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${m.cls}`}>
      <m.Icon className="w-3 h-3" aria-hidden="true" />
      <T nl={m.nl} en={m.en} />
    </span>
  );
}

export function ThemePill({
  label,
  active,
}: {
  label: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-3 py-1 text-[11px] ${
        active
          ? "border-[var(--color-ink)] bg-[var(--color-uitwijken-soft)]/60 text-[#7a3418] font-semibold"
          : "border-[var(--color-rule)] bg-white text-[var(--color-secondary)]"
      }`}
    >
      {label}
    </span>
  );
}

export function ScaleRail({ active }: { active: "house" | "street" | "buurt" | "city" }) {
  const scales = [
    { key: "house", nl: "Huis", en: "House" },
    { key: "street", nl: "Straat", en: "Street" },
    { key: "buurt", nl: "Buurt", en: "Neighborhood" },
    { key: "city", nl: "Stad", en: "City" },
  ] as const;

  return (
    <div className="px-4 py-3 border-b border-[var(--color-rule)]">
      <div className="flex items-center gap-2">
        {scales.map((scale, index) => (
          <div key={scale.key} className="flex items-center gap-2 flex-1">
            <div
              className={`w-full rounded-sm px-2 py-1 text-center text-[10px] font-semibold uppercase tracking-[0.14em] ${
                active === scale.key
                  ? "bg-[var(--color-ink)] text-white"
                  : "bg-[#f1efe8] text-[var(--color-secondary)]"
              }`}
            >
              <T nl={scale.nl} en={scale.en} />
            </div>
            {index < scales.length - 1 && (
              <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[#b8b09d]" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CivicItem({
  role,
  kind,
  title,
  meta,
  body,
}: {
  role: CivicRole;
  kind?: PrimitiveKind;
  title: React.ReactNode;
  meta: React.ReactNode;
  body?: React.ReactNode;
}) {
  return (
    <div className="rounded-sm border border-[var(--color-rule)] bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold text-[13px] leading-snug">{title}</div>
        <RoleTag role={role} />
      </div>
      <div className="mt-1.5 flex flex-wrap items-center gap-2">
        {kind && <PrimitiveTag kind={kind} />}
        <span className="text-[11px] text-[var(--color-secondary)]">{meta}</span>
      </div>
      {body && <div className="mt-2 text-[12.5px] leading-relaxed text-[#23251f]">{body}</div>}
    </div>
  );
}

export function MapSketch({
  activeScale,
  compact,
}: {
  activeScale: "street" | "buurt" | "city";
  compact?: boolean;
}) {
  const height = compact ? "h-56" : "h-[330px]";
  return (
    <div className={`relative ${height} overflow-hidden bg-[#f2ead8]`}>
      <svg
        viewBox="0 0 400 320"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Schematische kaart van de buurt rond Javaplein"
      >
        <rect width="400" height="320" fill="#f2ead8" />
        <path d="M30 42 H370 M30 112 H370 M30 184 H370 M30 252 H370" stroke="#d8cfb9" strokeWidth="2" />
        <path d="M72 18 V302 M154 18 V302 M244 18 V302 M326 18 V302" stroke="#d8cfb9" strokeWidth="2" />
        <path d="M54 142 C118 102 182 120 244 84 C288 58 330 62 370 34" fill="none" stroke="#9bb6c9" strokeWidth="16" opacity="0.45" />
        <rect x="142" y="118" width="104" height="74" rx="5" fill="#dfe6d5" />
        <text x="194" y="158" textAnchor="middle" fontSize="10" fill="#33501e">Javaplein</text>
        <path
          d={
            activeScale === "street"
              ? "M120 106 H276 V202 H120 Z"
              : activeScale === "buurt"
                ? "M54 48 H348 V266 H54 Z"
                : "M18 18 H382 V302 H18 Z"
          }
          fill="rgba(181,74,42,0.08)"
          stroke="#b54a2a"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <circle cx="178" cy="144" r="8" fill="#b54a2a" />
        <circle cx="222" cy="180" r="8" fill="#1e5a8a" />
        <circle cx="286" cy="92" r="8" fill="#4a6b3a" />
        <circle cx="112" cy="224" r="8" fill="#1e5a8a" />
      </svg>
      <div className="absolute left-3 top-3 rounded-sm border border-[var(--color-rule)] bg-white/90 px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--color-secondary)]">
        {activeScale === "street" && <T nl="Straat-scope" en="Street scope" />}
        {activeScale === "buurt" && <T nl="Buurt-scope" en="Neighborhood scope" />}
        {activeScale === "city" && <T nl="Stads-scope" en="City scope" />}
      </div>
      <div className="absolute bottom-3 right-3 rounded-sm border border-[var(--color-rule)] bg-white/90 px-2 py-1 text-[10px] text-[var(--color-secondary)]">
        OSM · data.amsterdam
      </div>
    </div>
  );
}
