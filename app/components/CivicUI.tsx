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

// Real Amsterdam base map: PDOK BRT Achtergrondkaart WMTS tiles (free, no-auth,
// CC-BY © Kadaster — see wiki/Map-sources.md). A 2×2 z-tile mosaic centered on
// Javaplein in the Indische Buurt, with zoom keyed to the selected scale.
const MAP_VIEWS = {
  street: { z: 17, x0: 67333, y0: 43078 },
  buurt: { z: 16, x0: 33666, y0: 21539 },
  city: { z: 14, x0: 8416, y0: 5384 },
} as const;

const SCOPE_INSET = { street: "inset-[30%]", buurt: "inset-[15%]", city: "inset-[5%]" } as const;

function brtTile(z: number, x: number, y: number) {
  return `https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/standaard/EPSG:3857/${z}/${x}/${y}.png`;
}

export function MapView({
  activeScale,
  compact,
}: {
  activeScale: "street" | "buurt" | "city";
  compact?: boolean;
}) {
  const height = compact ? "h-56" : "h-[330px]";
  const view = MAP_VIEWS[activeScale];
  const tiles = [
    [view.x0, view.y0],
    [view.x0 + 1, view.y0],
    [view.x0, view.y0 + 1],
    [view.x0 + 1, view.y0 + 1],
  ];

  return (
    <div className={`relative ${height} overflow-hidden bg-[#eef0ec]`}>
      {/* 512×512 tile mosaic, centered on the map viewport */}
      <div className="absolute left-1/2 top-1/2 grid h-[512px] w-[512px] -translate-x-1/2 -translate-y-1/2 grid-cols-2 grid-rows-2">
        {tiles.map(([x, y]) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${x}-${y}`}
            src={brtTile(view.z, x, y)}
            alt=""
            width={256}
            height={256}
            loading="lazy"
            className="h-[256px] w-[256px] select-none"
            draggable={false}
          />
        ))}
      </div>

      {/* Selected-scale boundary, drawn over the real map */}
      <div
        className={`pointer-events-none absolute ${SCOPE_INSET[activeScale]} rounded-sm border-2 border-dashed border-[var(--color-uitwijken)] bg-[rgba(181,74,42,0.06)]`}
      />

      {/* Mock civic pins — illustrative positions, not real coordinates */}
      <span className="absolute left-[44%] top-[42%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[var(--color-uitwijken)] shadow" />
      <span className="absolute left-[56%] top-[55%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1e5a8a] shadow" />
      <span className="absolute left-[64%] top-[34%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#4a6b3a] shadow" />
      <span className="absolute left-[34%] top-[64%] h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#1e5a8a] shadow" />

      <div className="absolute left-3 top-3 rounded-sm border border-[var(--color-rule)] bg-white/90 px-2 py-1 text-[10px] uppercase tracking-wider text-[var(--color-secondary)]">
        {activeScale === "street" && <T nl="Straat-scope" en="Street scope" />}
        {activeScale === "buurt" && <T nl="Buurt-scope · Indische Buurt" en="Neighborhood scope · Indische Buurt" />}
        {activeScale === "city" && <T nl="Stads-scope" en="City scope" />}
      </div>
      <div className="absolute bottom-2 right-2 rounded-sm bg-white/85 px-1.5 py-0.5 text-[9px] text-[var(--color-secondary)]">
        © Kadaster · PDOK BRT
      </div>
    </div>
  );
}
