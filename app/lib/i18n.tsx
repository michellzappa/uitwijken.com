"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "nl" | "en";

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "nl",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("nl");
  useEffect(() => {
    try {
      const stored = localStorage.getItem("uitwijken-lang") as Lang | null;
      if (stored === "nl" || stored === "en") setLangState(stored);
    } catch {}
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("uitwijken-lang", l);
      document.documentElement.lang = l;
    } catch {}
  };
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export function useLanguage() {
  return useContext(LangCtx);
}

/** JSX-inline translation: <T nl="Welkom" en="Welcome" /> */
export function T({ nl, en }: { nl: React.ReactNode; en: React.ReactNode }) {
  const { lang } = useLanguage();
  return <>{lang === "en" ? en : nl}</>;
}

export function LangToggle() {
  const { lang, setLang } = useLanguage();
  const base = "px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase";
  return (
    <div className="inline-flex rounded-sm border border-[var(--color-rule)] overflow-hidden bg-white">
      <button
        onClick={() => setLang("nl")}
        className={`${base} ${lang === "nl" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-secondary)] hover:text-[var(--color-ink)]"}`}
        aria-pressed={lang === "nl"}
      >
        NL
      </button>
      <button
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? "bg-[var(--color-ink)] text-white" : "text-[var(--color-secondary)] hover:text-[var(--color-ink)]"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
