"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LangToggle, T } from "../lib/i18n";

type NavLink = {
  href: string;
  nl: string;
  en: string;
  prefix?: boolean;
  /** Monolingual link — shown in a separate group with a language hint. */
  mono?: "en";
};

const NAV_LINKS: readonly NavLink[] = [
  { href: "/map", nl: "Kaart", en: "Map" },
  { href: "/themes", nl: "Thema", en: "Theme" },
  { href: "/events", nl: "Events", en: "Events" },
  { href: "/threads", nl: "Gesprek", en: "Thread" },
  { href: "/asks", nl: "Aanbod", en: "Asks" },
  { href: "/vragen", nl: "Enquêtes", en: "Surveys" },
  { href: "/inbox", nl: "Inbox", en: "Inbox" },
  { href: "/governance", nl: "Governance", en: "Governance" },
  { href: "/docs", nl: "Wiki", en: "Wiki", prefix: true, mono: "en" },
];

function isNavActive(pathname: string, href: string, prefix?: boolean) {
  if (prefix) return pathname === href || pathname.startsWith(`${href}/`);
  return pathname === href;
}

export function TopBar() {
  const pathname = usePathname();

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
          <span className="mr-2"><LangToggle /></span>
          {NAV_LINKS.map((link, idx) => {
            const { href, nl, en, prefix, mono } = link;
            const active = isNavActive(pathname, href, prefix);
            const prevMono = NAV_LINKS[idx - 1]?.mono;
            const groupBreak = mono && !prevMono;
            return (
              <span key={href} className="flex items-center gap-1">
                {groupBreak && (
                  <span
                    aria-hidden="true"
                    className="inline-block w-px h-4 bg-[var(--color-rule)] mx-2"
                  />
                )}
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={
                    active
                      ? "font-semibold text-[var(--color-ink)] border-b-[3px] border-[var(--color-uitwijken)] px-2 py-1 -mb-[1px] flex items-center gap-1.5"
                      : "text-[var(--color-ink)] hover:text-[var(--color-link)] hover:underline underline-offset-4 px-2 py-1 flex items-center gap-1.5"
                  }
                >
                  <T nl={nl} en={en} />
                  {mono && (
                    <span
                      title="English only"
                      className="text-[9px] font-bold tracking-[0.1em] text-[var(--color-secondary)] border border-[var(--color-rule)] rounded-sm px-1 py-px leading-none"
                    >
                      {mono.toUpperCase()}
                    </span>
                  )}
                </Link>
              </span>
            );
          })}
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
