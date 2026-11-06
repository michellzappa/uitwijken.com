"use client";

import { LangToggle, T } from "../lib/i18n";

/** A bare header: an operator with a survey link does not need the atlas navigation. */
export function SurveyHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <span className="flex items-center gap-2">
          <span className="inline-block h-5 w-5 bg-[var(--color-uitwijken)]" />
          <span className="font-sans text-lg font-bold tracking-tight">Uitwijken</span>
        </span>
        <LangToggle />
      </div>
    </header>
  );
}

export function PrototypeNotice() {
  return (
    <p className="border-l-2 border-[var(--color-uitwijken)] bg-[var(--color-uitwijken-soft)] px-3 py-2 text-[13px] leading-relaxed text-[#2a2926]">
      <strong>
        <T nl="Voorlopig en gesimuleerd." en="Provisional and simulated." />
      </strong>{" "}
      <T
        nl="Antwoorden met het label Aanname zijn onze eigen schatting. Ingevulde antwoorden blijven in deze browser."
        en="Answers labelled Aanname are our own estimates. Anything you enter stays in this browser."
      />
    </p>
  );
}
