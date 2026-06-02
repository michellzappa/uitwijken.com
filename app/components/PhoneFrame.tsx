import { BatteryFull, Signal, Wifi } from "lucide-react";

export function StatusBar({ title }: { title?: React.ReactNode }) {
  return (
    <div className="status-bar">
      <span>09:41</span>
      <span className="text-[10px] uppercase tracking-widest text-[var(--color-secondary)]">{title ?? "uitwijken.nl"}</span>
      <span className="flex items-center gap-1 text-[var(--color-ink)]" aria-hidden="true">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <BatteryFull className="w-4 h-4" />
      </span>
    </div>
  );
}

export function PhoneFrame({
  children,
  title,
  caption,
  annot,
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
  caption?: React.ReactNode;
  annot?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-3 w-[390px]">
      <div className="phone">
        <StatusBar title={title} />
        <div className="phone-scroll">{children}</div>
      </div>
      {caption && <div className="text-xs uppercase tracking-wider text-[var(--color-secondary)] pl-1">{caption}</div>}
      {annot && <div className="annot max-w-[380px] pl-1">{annot}</div>}
    </div>
  );
}
