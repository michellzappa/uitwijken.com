"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  CalendarClock,
  ChevronDown,
  ClipboardList,
  Handshake,
  Inbox,
  Map as MapIcon,
  MessageSquare,
  Scale,
  ShieldCheck,
  Tags,
  type LucideIcon,
} from "lucide-react";
import { ROLE_META } from "./CivicUI";
import { AUDIENCES } from "../audiences/audiences";
import { LangToggle, T } from "../lib/i18n";

type Wire = { href: string; nl: string; en: string; Icon: LucideIcon };
type WireGroup = { nl: string; en: string; items: Wire[] };

const WIREFRAME_GROUPS: readonly WireGroup[] = [
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
    ],
  },
];

const WIRE_HREFS = WIREFRAME_GROUPS.flatMap((g) => g.items.map((i) => i.href));

// Top nav links use only the red thick underline (active/open/hover) — never a blue link underline.
const topLinkClass = (active: boolean) =>
  `text-[var(--color-ink)] border-b-[3px] px-2 py-1 -mb-[1px] flex items-center gap-1.5 ${
    active ? "font-semibold border-[var(--color-uitwijken)]" : "border-transparent hover:border-[var(--color-uitwijken)]"
  }`;

function WireframesMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = WIRE_HREFS.includes(pathname);

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
        <T nl="Wireframes" en="Wireframes" />
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-64 z-30 border border-[var(--color-rule)] bg-white shadow-[0_12px_32px_-12px_rgba(26,26,26,0.28)]"
        >
          {WIREFRAME_GROUPS.map((group) => (
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

function AudiencesMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const active = pathname === "/audiences";

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
        <T nl="Doelgroepen" en="Audiences" />
        <ChevronDown
          aria-hidden="true"
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-80 z-30 border border-[var(--color-rule)] bg-white shadow-[0_12px_32px_-12px_rgba(26,26,26,0.28)]"
        >
          <Link
            href="/audiences"
            role="menuitem"
            className="block border-b border-[var(--color-rule)] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--color-uitwijken)] font-semibold hover:bg-[#f1efe8]"
          >
            <T nl="Overzicht — drie rollen" en="Overview — three roles" />
          </Link>
          {AUDIENCES.map((a) => {
            const m = ROLE_META[a.role];
            return (
              <Link
                key={a.role}
                href={`/audiences#${a.role}`}
                role="menuitem"
                className="flex items-start gap-2.5 px-3 py-2.5 hover:bg-[#f1efe8]"
              >
                <span className={`mt-0.5 inline-flex rounded-sm p-1 ${m.cls}`}>
                  <m.Icon className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold text-[var(--color-ink)]">
                    <T nl={m.nl} en={m.en} />
                  </span>
                  <span className="block text-[11.5px] leading-snug text-[var(--color-secondary)]">
                    <T nl={a.tagline.nl} en={a.tagline.en} />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function WireframesSubNav() {
  const pathname = usePathname();

  return (
    <div className="border-t border-[var(--color-rule)] bg-[#faf9f5]/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-2 flex items-center gap-x-5 gap-y-1.5 flex-wrap text-sm">
        {WIREFRAME_GROUPS.map((group, gi) => (
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
      </div>
    </div>
  );
}

export function TopBar() {
  const pathname = usePathname();
  const docsActive = pathname === "/docs" || pathname.startsWith("/docs/");
  const wireActive = WIRE_HREFS.includes(pathname);

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
            civic layer · v0.3
          </span>
        </Link>
        <div className="flex items-center gap-1 text-sm flex-wrap justify-end">
          <span className="mr-2">
            <LangToggle />
          </span>
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined} className={topLinkClass(pathname === "/")}>
            <T nl="Home" en="Home" />
          </Link>
          <WireframesMenu />
          <AudiencesMenu />
          <span aria-hidden="true" className="inline-block w-px h-4 bg-[var(--color-rule)] mx-2" />
          <Link href="/docs" aria-current={docsActive ? "page" : undefined} className={topLinkClass(docsActive)}>
            <T nl="Wiki" en="Wiki" />
          </Link>
        </div>
      </div>
      {wireActive && <WireframesSubNav />}
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
