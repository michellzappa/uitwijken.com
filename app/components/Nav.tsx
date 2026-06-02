"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LangToggle, T } from "../lib/i18n";

type Wire = { href: string; nl: string; en: string };
type WireGroup = { nl: string; en: string; items: Wire[] };

const WIREFRAME_GROUPS: readonly WireGroup[] = [
  {
    nl: "Bouwblokken",
    en: "Building blocks",
    items: [
      { href: "/events", nl: "Events & actie", en: "Events & action" },
      { href: "/threads", nl: "Gesprekken", en: "Conversations" },
      { href: "/asks", nl: "Vraag & aanbod", en: "Asks & offers" },
      { href: "/vragen", nl: "Enquêtes & budget", en: "Surveys & budget" },
    ],
  },
  {
    nl: "Lenzen",
    en: "Lenses",
    items: [
      { href: "/map", nl: "Kaartlens", en: "Map lens" },
      { href: "/themes", nl: "Thema's", en: "Themes" },
      { href: "/inbox", nl: "Civic inbox", en: "Civic inbox" },
    ],
  },
  {
    nl: "Fundament",
    en: "Foundation",
    items: [{ href: "/governance", nl: "Governance", en: "Governance" }],
  },
];

const WIRE_HREFS = WIREFRAME_GROUPS.flatMap((g) => g.items.map((i) => i.href));

const topLinkClass = (active: boolean) =>
  active
    ? "font-semibold text-[var(--color-ink)] border-b-[3px] border-[var(--color-uitwijken)] px-2 py-1 -mb-[1px] flex items-center gap-1.5"
    : "text-[var(--color-ink)] hover:text-[var(--color-link)] hover:underline underline-offset-4 px-2 py-1 flex items-center gap-1.5";

function WireframesMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = WIRE_HREFS.includes(pathname);

  // Close on outside click and whenever the route changes.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={topLinkClass(active)}
      >
        <T nl="Wireframes" en="Wireframes" />
        <span aria-hidden="true" className={`text-[10px] transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
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
                    className={`block px-3 py-1.5 text-[13px] ${
                      isActive
                        ? "font-semibold text-[var(--color-ink)] bg-[var(--color-uitwijken-soft)]/50"
                        : "text-[var(--color-ink)] hover:bg-[#f1efe8]"
                    }`}
                  >
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

export function TopBar() {
  const pathname = usePathname();
  const docsActive = pathname === "/docs" || pathname.startsWith("/docs/");

  return (
    <div className="sticky top-0 z-20 bg-[var(--color-paper)]/95 backdrop-blur border-b border-[var(--color-rule)]">
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
          <span aria-hidden="true" className="inline-block w-px h-4 bg-[var(--color-rule)] mx-2" />
          <Link href="/docs" aria-current={docsActive ? "page" : undefined} className={topLinkClass(docsActive)}>
            <T nl="Wiki" en="Wiki" />
            <span
              title="English only"
              className="text-[9px] font-bold tracking-[0.1em] text-[var(--color-secondary)] border border-[var(--color-rule)] rounded-sm px-1 py-px leading-none"
            >
              EN
            </span>
          </Link>
        </div>
      </div>
    </div>
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
