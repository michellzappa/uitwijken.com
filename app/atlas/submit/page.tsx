"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { TopBar, PageHeader } from "../../components/Nav";
import { T, useLanguage } from "../../lib/i18n";
import { PLATFORMS } from "../platforms";

type Mode = "add" | "correct";

const FIELDS = [
  {
    key: "name",
    nl: "Naam van het initiatief of platform",
    en: "Name of the initiative or platform",
    long: false,
  },
  { key: "url", nl: "URL", en: "URL", long: false },
  {
    key: "scope",
    nl: "Bereik — buurt, stadsdeel, stedelijk of thematisch",
    en: "Reach — neighbourhood, district, citywide, or thematic",
    long: false,
  },
  {
    key: "who",
    nl: "Voor wie is het, en wie beheert het?",
    en: "Who is it for, and who runs it?",
    long: true,
  },
  {
    key: "what",
    nl: "Wat kunnen mensen er doen?",
    en: "What can people do there?",
    long: true,
  },
  {
    key: "active",
    nl: "Waaruit blijkt dat het actief is?",
    en: "What shows that it is active?",
    long: true,
  },
  {
    key: "contact",
    nl: "Jouw naam en contact (optioneel, zodat we kunnen navragen)",
    en: "Your name and contact (optional, so we can follow up)",
    long: false,
  },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];

export default function SubmitPage() {
  const { lang } = useLanguage();
  const [mode, setMode] = useState<Mode>("add");
  const [target, setTarget] = useState<string>(PLATFORMS[0].slug);
  const [values, setValues] = useState<Partial<Record<FieldKey, string>>>({});
  const [copied, setCopied] = useState(false);

  const summary = useMemo(() => {
    const head =
      mode === "add"
        ? lang === "en"
          ? "New entry for the Uitwijken atlas"
          : "Nieuwe vermelding voor de Uitwijken-atlas"
        : lang === "en"
          ? `Correction to the profile: ${PLATFORMS.find((p) => p.slug === target)?.name}`
          : `Correctie op het profiel: ${PLATFORMS.find((p) => p.slug === target)?.name}`;
    const body = FIELDS.filter((f) => (values[f.key] ?? "").trim().length > 0)
      .map((f) => `${lang === "en" ? f.en : f.nl}\n${values[f.key]!.trim()}`)
      .join("\n\n");
    return `${head}\n\n${body || (lang === "en" ? "(nothing filled in yet)" : "(nog niets ingevuld)")}`;
  }, [mode, target, values, lang]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="min-h-screen">
      <TopBar />
      <PageHeader
        eyebrow={<T nl="Atlas · bijdragen" en="Atlas · contribute" />}
        title={
          <T
            nl="Voeg een initiatief toe of corrigeer een profiel"
            en="Add an initiative or correct a profile"
          />
        }
        subtitle={
          <T
            nl="Deze atlas is met opzet incompleet. Als je een buurtplatform, netwerk of tool kent dat hier hoort — of als wij iets verkeerd hebben opgeschreven over jouw platform — dan is dat de belangrijkste bijdrage die je kunt leveren."
            en="This atlas is deliberately incomplete. If you know a neighbourhood platform, network, or tool that belongs here — or if we got something wrong about your platform — that is the most valuable contribution you can make."
          />
        }
      />

      <div className="mx-auto max-w-6xl px-6 pb-16">
        {/* No backend on purpose: an intake form implies an owner, and the owner of
            this layer has not been decided. Until it has, the form composes text. */}
        <div className="border-l-4 border-[var(--color-uitwijken)] bg-white px-4 py-3 text-[13px] leading-relaxed text-[#2a2926]">
          <T
            nl="v0.1 heeft bewust geen verzendknop. Een inzendformulier veronderstelt een eigenaar die de inzendingen beheert, en wie die laag beheert is nog niet besloten. Tot die tijd stelt dit formulier een nette tekst op die je kunt kopiëren en doorsturen."
            en="v0.1 deliberately has no send button. An intake form implies an owner who curates submissions, and who governs this layer has not been decided. Until then, this form composes a tidy text you can copy and pass on."
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="mb-5 inline-flex overflow-hidden rounded-sm border border-[var(--color-rule)] bg-white">
              {(["add", "correct"] as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  aria-pressed={mode === m}
                  className={`px-3.5 py-1.5 text-[12.5px] font-semibold ${
                    mode === m
                      ? "bg-[var(--color-ink)] text-white"
                      : "text-[var(--color-ink)] hover:bg-[#f1efe8]"
                  }`}
                >
                  {m === "add" ? (
                    <T nl="Nieuw initiatief" en="New initiative" />
                  ) : (
                    <T nl="Correctie op een profiel" en="Correction to a profile" />
                  )}
                </button>
              ))}
            </div>

            {mode === "correct" && (
              <div className="mb-5">
                <label
                  htmlFor="target"
                  className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]"
                >
                  <T nl="Welk profiel?" en="Which profile?" />
                </label>
                <select
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full max-w-md border border-[var(--color-rule)] bg-white px-3 py-2 text-[14px]"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-4">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={f.key}
                    className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]"
                  >
                    <T nl={f.nl} en={f.en} />
                  </label>
                  {f.long ? (
                    <textarea
                      id={f.key}
                      rows={3}
                      value={values[f.key] ?? ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [f.key]: e.target.value }))
                      }
                      className="w-full border border-[var(--color-rule)] bg-white px-3 py-2 text-[14px] leading-relaxed"
                    />
                  ) : (
                    <input
                      id={f.key}
                      type="text"
                      value={values[f.key] ?? ""}
                      onChange={(e) =>
                        setValues((v) => ({ ...v, [f.key]: e.target.value }))
                      }
                      className="w-full border border-[var(--color-rule)] bg-white px-3 py-2 text-[14px]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--color-secondary)]">
                <T nl="Wat je doorstuurt" en="What you pass on" />
              </span>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-1.5 border border-[var(--color-rule)] bg-white px-2.5 py-1 text-[12px] font-semibold hover:border-[var(--color-ink)]"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[var(--color-success)]" aria-hidden="true" />
                ) : (
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {copied ? <T nl="Gekopieerd" en="Copied" /> : <T nl="Kopieer" en="Copy" />}
              </button>
            </div>
            <pre className="whitespace-pre-wrap break-words border border-[var(--color-rule)] bg-white p-4 font-sans text-[13px] leading-relaxed text-[#2a2926]">
              {summary}
            </pre>
            <p className="mt-3 text-[12.5px] leading-relaxed text-[var(--color-secondary)]">
              <T
                nl="Wat wij vervolgens doen: het als 'te valideren' opnemen, en het pas als gedocumenteerd markeren nadat de beheerder van dat platform het bevestigt."
                en="What we do next: record it as 'to validate', and only mark it documented once that platform's operator confirms it."
              />
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-rule)] pt-6">
          <Link
            href="/atlas"
            className="text-[13.5px] text-[var(--color-link)] underline underline-offset-4 hover:no-underline"
          >
            <T nl="← Terug naar de atlas" en="← Back to the atlas" />
          </Link>
        </div>
      </div>
    </div>
  );
}
