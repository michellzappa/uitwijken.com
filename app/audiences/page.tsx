import Link from "next/link";
import { ArrowRight, BookOpen, LayoutTemplate } from "lucide-react";
import { TopBar, PageHeader } from "../components/Nav";
import { ROLE_META, RoleTag } from "../components/CivicUI";
import { T } from "../lib/i18n";
import { AUDIENCES, type AudienceLink } from "./audiences";

function LinkColumn({
  heading,
  Icon,
  links,
}: {
  heading: React.ReactNode;
  Icon: typeof BookOpen;
  links: AudienceLink[];
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
        <Icon className="w-3.5 h-3.5 text-[var(--color-uitwijken)]" aria-hidden="true" />
        {heading}
      </div>
      <ul className="space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="group flex items-center gap-1.5 text-[14px] text-[var(--color-link)] hover:text-[var(--color-link-hover)]"
            >
              <span className="underline underline-offset-2 decoration-1 group-hover:decoration-2">
                <T nl={l.nl} en={l.en} />
              </span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AudiencesPage() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Doelgroepen" en="Audiences" />}
        title={<T nl="Drie rollen, drie perspectieven" en="Three roles, three perspectives" />}
        subtitle={
          <T
            nl="Uitwijken.nl is van, voor en door de samenleving — en de samenleving is geen monoliet. Bewoner, overheid en ondernemer zien elk iets anders. Hieronder staat per rol wat het platform voor hen betekent, en waar ze zichzelf terugzien in de wireframes en het onderzoek."
            en="Uitwijken.nl is from, for, and by society — and society isn't a monolith. Resident, government, and entrepreneur each see something different. Below is what the platform means for each role, and where they see themselves in the wireframes and the research."
          />
        }
      />

      <div className="max-w-6xl mx-auto px-6 pb-16 space-y-6">
        {AUDIENCES.map((a) => {
          const m = ROLE_META[a.role];
          return (
            <section
              key={a.role}
              id={a.role}
              className="scroll-mt-28 border border-[var(--color-rule)] bg-white"
            >
              <div className={`flex items-center gap-3 border-b border-[var(--color-rule)] px-6 py-4 ${m.cls}`}>
                <m.Icon className="w-6 h-6" aria-hidden="true" />
                <div>
                  <h2 className="font-sans font-bold text-2xl tracking-tight leading-none">
                    <T nl={m.nl} en={m.en} />
                  </h2>
                  <p className="mt-1 text-[13px] opacity-80">
                    <T nl={a.tagline.nl} en={a.tagline.en} />
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-8 px-6 py-6 md:grid-cols-[1.4fr_1fr]">
                <p className="text-[16px] leading-[1.6] text-[#23251f]">
                  <T nl={a.explainer.nl} en={a.explainer.en} />
                </p>
                <div className="space-y-5">
                  <LinkColumn
                    heading={<T nl="In de wireframes" en="In the wireframes" />}
                    Icon={LayoutTemplate}
                    links={a.pages}
                  />
                  <LinkColumn
                    heading={<T nl="In het onderzoek" en="In the research" />}
                    Icon={BookOpen}
                    links={a.research}
                  />
                </div>
              </div>
            </section>
          );
        })}

        <div className="border-t border-[var(--color-rule)] pt-5 text-[14px] text-[#2a2926] leading-relaxed max-w-3xl">
          <T
            nl="Elke rol verschijnt overal op het platform als een gekleurde pill — "
            en="Every role appears across the platform as a colored pill — "
          />
          <span className="inline-flex flex-wrap items-center gap-1.5 align-middle">
            <RoleTag role="resident" />
            <RoleTag role="government" />
            <RoleTag role="entrepreneur" />
          </span>
          <T
            nl=" — zodat in één oogopslag duidelijk is wiens perspectief je leest."
            en=" — so it's clear at a glance whose perspective you're reading."
          />
        </div>
      </div>
    </div>
  );
}
