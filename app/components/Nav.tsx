"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  ChevronDown,
  CirclePlus,
  ClipboardList,
  Columns3,
  Compass,
  Network,
  Handshake,
  Inbox,
  Map as MapIcon,
  MessageSquare,
  Scale,
  ShieldCheck,
  Tags,
  Users,
  type LucideIcon,
} from "lucide-react";
import { LangToggle, T } from "../lib/i18n";

type NavItem = { href: string; nl: string; en: string; Icon: LucideIcon };
type NavGroup = { nl: string; en: string; items: NavItem[] };

/** The product: the atlas and what follows from it. */
const ATLAS_GROUPS: readonly NavGroup[] = [
  {
    nl: "Atlas",
    en: "Atlas",
    items: [
      { href: "/atlas", nl: "Verken het ecosysteem", en: "Explore the ecosystem", Icon: MapIcon },
      { href: "/atlas/compare", nl: "Vergelijk platformen", en: "Compare platforms", Icon: Columns3 },
      { href: "/atlas/interop", nl: "Interoperabiliteit", en: "Interoperability", Icon: Network },
      { href: "/patterns", nl: "Patronen & gaten", en: "Patterns & gaps", Icon: Compass },
      { href: "/atlas/submit", nl: "Voeg toe of corrigeer", en: "Add or correct", Icon: CirclePlus },
    ],
  },
];

/**
 * The earlier phase, deliberately demoted. These screens explore a platform that
 * has not been decided on; keeping them in the primary nav made the site read as
 * a finished proposal.
 */
const SKETCH_GROUPS: readonly NavGroup[] = [
  {
    nl: "Bouwblokken",
    en: "Building blocks",
    items: [
      { href: "/events", nl: "Events & actie", en: "Events & action", Icon: CalendarClock },
      { href: "/threads", nl: "Gesprekken", en: "Conversations", Icon: MessageSquare },
      { href: "/asks", nl: "Vraag & aanbod", en: "Asks & offers", Icon: Handshake },
      { href: "/vragen", nl: "Enquêtes & budget", en: "Surveys & budget", Icon: ClipboardList },
    ],
  },
  {
    nl: "Lenzen",
    en: "Lenses",
    items: [
      { href: "/map", nl: "Kaartlens", en: "Map lens", Icon: MapIcon },
      { href: "/themes", nl: "Thema's", en: "Themes", Icon: Tags },
      { href: "/inbox", nl: "Civic inbox", en: "Civic inbox", Icon: Inbox },
    ],
  },
  {
    nl: "Fundament",
    en: "Foundation",
    items: [
      { href: "/governance", nl: "Governance", en: "Governance", Icon: Scale },
      { href: "/operating-model", nl: "Operating model", en: "Operating model", Icon: ShieldCheck },
      { href: "/audiences", nl: "Doelgroepen", en: "Audiences", Icon: Users },
    ],
  },
];

const hrefsOf = (groups: readonly NavGroup[]) => groups.flatMap((g) => g.items.map((i) => i.href));

const ATLAS_HREFS = hrefsOf(ATLAS_GROUPS);
const SKETCH_HREFS = hrefsOf(SKETCH_GROUPS);

// Top nav links use only the red thick underline (active/open/hover) — never a blue link underline.
const topLinkClass = (active: boolean) =>
  `text-[var(--color-ink)] border-b-[3px] px-2 py-1 -mb-[1px] flex items-center gap-1.5 ${
    active ? "font-semibold border-[var(--color-uitwijken)]" : "border-transparent hover:border-[var(--color-uitwijken)]"
  }`;

function DropdownMenu({
  label,
  groups,
  active,
  overview,
}: {
  label: React.ReactNode;
  groups: readonly NavGroup[];
  active: boolean;
  overview?: { href: string; nl: string; en: string };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Close on outside click and whenever the route changes.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={btnRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={topLinkClass(active || open)}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-72 z-30 border border-[var(--color-rule)] bg-white shadow-[0_12px_32px_-12px_rgba(26,26,26,0.28)]"
        >
          {overview && (
            <Link
              href={overview.href}
              role="menuitem"
              className="block border-b border-[var(--color-rule)] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-uitwijken)] font-semibold hover:bg-[#f1efe8]"
            >
              <T nl={overview.nl} en={overview.en} />
            </Link>
          )}
          {groups.map((group) => (
            <div key={group.en} className="border-b border-[var(--color-rule)] last:border-b-0 py-2">
              <div className="px-3 pb-1 text-[10px] uppercase tracking-[0.16em] text-[var(--color-uitwijken)] font-semibold">
                <T nl={group.nl} en={group.en} />
              </div>
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-2 px-3 py-1.5 text-[13px] ${
                      isActive
                        ? "font-semibold text-[var(--color-ink)] bg-[var(--color-uitwijken-soft)]/50"
                        : "text-[var(--color-ink)] hover:bg-[#f1efe8]"
                    }`}
                  >
                    <item.Icon className="w-4 h-4 shrink-0 text-[var(--color-uitwijken)]" aria-hidden="true" />
                    <T nl={item.nl} en={item.en} />
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubNav({ groups, note }: { groups: readonly NavGroup[]; note?: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="border-t border-[var(--color-rule)] bg-[#faf9f5]/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-x-5 gap-y-1.5 flex-wrap text-sm">
        {groups.map((group, gi) => (
          <div key={group.en} className="flex items-center gap-x-3 gap-y-1 flex-wrap">
            {gi > 0 && (
              <span aria-hidden="true" className="hidden sm:inline-block w-px h-4 bg-[var(--color-rule)]" />
            )}
            <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-uitwijken)] font-semibold">
              <T nl={group.nl} en={group.en} />
            </span>
            {group.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-1.5 border-b-[2px] -mb-[1px] pb-0.5 ${
                    isActive
                      ? "font-semibold text-[var(--color-ink)] border-[var(--color-uitwijken)]"
                      : "text-[var(--color-ink)] border-transparent hover:border-[var(--color-uitwijken)]"
                  }`}
                >
                  <item.Icon className="w-3.5 h-3.5 shrink-0 text-[var(--color-uitwijken)]" aria-hidden="true" />
                  <T nl={item.nl} en={item.en} />
                </Link>
              );
            })}
          </div>
        ))}
        {note && (
          <span className="text-[11px] text-[var(--color-secondary)] italic">{note}</span>
        )}
      </div>
    </div>
  );
}

export function TopBar() {
  const pathname = usePathname();
  const docsActive = pathname === "/docs" || pathname.startsWith("/docs/");
  const atlasActive =
    pathname.startsWith("/atlas") || ATLAS_HREFS.includes(pathname);
  const sketchActive = pathname === "/sketches" || SKETCH_HREFS.includes(pathname);

  return (
    <nav
      aria-label="Hoofdnavigatie"
      className="sticky top-0 z-20 bg-[var(--color-paper)]/95 backdrop-blur border-b border-[var(--color-rule)]"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between flex-wrap gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-6 h-6 bg-[var(--color-uitwijken)] inline-block" />
          <span className="font-sans font-bold text-xl tracking-tight">Uitwijken.nl</span>
          <span className="text-[11px] uppercase tracking-widest text-[var(--color-secondary)] ml-2">
            atlas · v0.1
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm flex-wrap justify-end">
          <span className="mr-2">
            <LangToggle />
          </span>
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={topLinkClass(pathname === "/")}>
            <T nl="Home" en="Home" />
          </Link>
          <DropdownMenu
            label={<T nl="Atlas" en="Atlas" />}
            groups={ATLAS_GROUPS}
            active={atlasActive}
          />
          <DropdownMenu
            label={<T nl="Schetsen" en="Sketches" />}
            groups={SKETCH_GROUPS}
            active={sketchActive}
            overview={{
              href: "/sketches",
              nl: "Overzicht — archief, geen voorstel",
              en: "Overview — archive, not a proposal",
            }}
          />
          <span aria-hidden="true" className="inline-block w-px h-4 bg-[var(--color-rule)] mx-2" />
          <Link href="/docs" aria-current={docsActive ? "page" : undefined} className={topLinkClass(docsActive)}>
            <T nl="Wiki" en="Wiki" />
          </Link>
        </div>
      </div>
      {atlasActive && <SubNav groups={ATLAS_GROUPS} />}
      {sketchActive && (
        <SubNav
          groups={SKETCH_GROUPS}
          note={<T nl="archief — geen voorstel" en="archive — not a proposal" />}
        />
      )}
    </nav>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-8">
      <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-uitwijken)] mb-3 font-semibold">
        {eyebrow}
      </div>
      <h1 className="font-sans font-bold text-4xl leading-[1.15] tracking-tight mb-4 text-[var(--color-ink)]">
        {title}
      </h1>
      <p className="max-w-2xl text-[17px] text-[#2a2926] leading-relaxed">{subtitle}</p>
    </div>
  );
}
