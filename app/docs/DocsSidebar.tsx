"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_GROUPS } from "./doc-groups";

function activeSlug(pathname: string): string | null {
  if (pathname === "/docs") return "readme";
  const match = pathname.match(/^\/docs\/([^/]+)/);
  return match?.[1] ?? null;
}

export function DocsSidebar() {
  const pathname = usePathname();
  const current = activeSlug(pathname);

  return (
    <aside className="text-sm">
      <div className="sticky top-20">
        <Link
          href="/docs"
          className={`block text-xs uppercase tracking-widest mb-4 ${
            current === "readme"
              ? "text-[var(--color-uitwijken)] font-semibold"
              : "text-[var(--color-uitwijken)]"
          }`}
        >
          Uitwijken.nl · wiki
        </Link>
        {DOC_GROUPS.map((g) => {
          const groupActive = g.items.some((i) => i.slug === current);
          return (
            <div key={g.label} className="mb-5">
              <div
                className={`text-[11px] uppercase tracking-wider mb-2 ${
                  groupActive
                    ? "text-[var(--color-uitwijken)] font-semibold"
                    : "text-[var(--color-secondary)]"
                }`}
              >
                {g.label}
              </div>
              <ul className="space-y-1">
                {g.items.map((i) => {
                  const isActive = i.slug === current;
                  return (
                    <li key={i.slug}>
                      <Link
                        href={`/docs/${i.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`block py-0.5 pl-2 -ml-2 border-l-2 transition-colors ${
                          isActive
                            ? "border-[var(--color-uitwijken)] text-[var(--color-uitwijken)] font-semibold"
                            : "border-transparent text-[#1f1e1a] hover:text-[var(--color-uitwijken)] hover:underline"
                        }`}
                      >
                        {i.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="mt-6 text-[11px] text-[var(--color-secondary)] leading-relaxed">
          Concept, product proof, and delivery notes for the current prototype.
        </div>
      </div>
    </aside>
  );
}
