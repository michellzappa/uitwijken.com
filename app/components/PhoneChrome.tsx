import Link from "next/link";
import { T } from "../lib/i18n";

export function AppTopBar({
  left,
  center,
  right,
}: {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-rule)]">
      <div className="w-10 text-[13px]">{left}</div>
      <div className="flex-1 text-center text-[13px] font-semibold">{center}</div>
      <div className="w-10 text-right text-[13px]">{right}</div>
    </div>
  );
}

export function TabBar({ active }: { active: "feed" | "kaart" | "buurt" | "ik" }) {
  const tab = (key: typeof active, label: React.ReactNode, href: string) => (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 text-[10px] ${
        active === key ? "text-[var(--color-uitwijken)] font-semibold" : "text-[var(--color-secondary)]"
      }`}
    >
      <span className="text-base leading-none">
        {key === "feed" && "◎"}
        {key === "kaart" && "◇"}
        {key === "buurt" && "◉"}
        {key === "ik" && "○"}
      </span>
      <span className="uppercase tracking-wider">{label}</span>
    </Link>
  );
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--color-rule)] flex justify-around py-2">
      {tab("feed", <T nl="Feed" en="Feed" />, "/feed")}
      {tab("kaart", <T nl="Kaart" en="Map" />, "/melding")}
      {tab("buurt", <T nl="Buurt" en="Area" />, "/digest")}
      {tab("ik", <T nl="Ik" en="Me" />, "/onboarding")}
    </div>
  );
}

export function BuurtHeader() {
  return (
    <div className="px-4 py-3 bg-[var(--color-uitwijken-soft)]/40">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-[#7a3418]">
            <T nl="Jouw buurt" en="Your neighborhood" />
          </div>
          <div className="font-sans font-bold text-lg leading-none tracking-tight mt-1">Indische Buurt</div>
          <div className="text-[11px] text-[var(--color-secondary)] mt-1">
            <T nl="Javastraat · ±230 buren actief" en="Javastraat · ±230 active neighbors" />
          </div>
        </div>
        <div className="text-[11px] text-[var(--color-secondary)] text-right">
          <div>
            <T nl="Stadsdeel Oost" en="Oost district" />
          </div>
          <div className="text-[10px]">
            <T nl="polygoon · data.amsterdam" en="polygon · data.amsterdam" />
          </div>
        </div>
      </div>
    </div>
  );
}
