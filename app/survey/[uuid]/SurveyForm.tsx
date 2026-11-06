"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ExternalLink, HelpCircle, RotateCcw } from "lucide-react";
import { T } from "../../lib/i18n";
import { PrototypeNotice, SurveyHeader } from "../SurveyChrome";
import {
  QUESTIONS,
  SECTIONS,
  formatAnswer,
  nearestStop,
  sliderStops,
  type AnswerValue,
  type Prefill,
  type Question,
  type Share,
  type SurveyRecord,
} from "../survey-data";
import {
  blankResponse,
  fetchResponse,
  saveResponse,
  type Answer,
  type SurveyResponse,
} from "../store";

function BasisPill({ prefill }: { prefill: Prefill }) {
  const assumption = prefill.basis === "assumption";
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`inline-flex rounded-sm border px-1.5 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.12em] ${
          assumption
            ? "border-[#e2cfa8] bg-[var(--color-uitwijken-soft)] text-[#7a3418]"
            : "border-[#b9cdb0] bg-[#dfe6d5] text-[#33501e]"
        }`}
      >
        {assumption ? "Aanname" : "Uit openbare bron"}
      </span>
      {prefill.source && (
        <a
          href={prefill.source}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-[var(--color-link)] underline underline-offset-2 hover:no-underline"
        >
          <T nl="Bron" en="Source" />
          <ExternalLink className="h-3 w-3" aria-hidden="true" />
        </a>
      )}
    </span>
  );
}

function AnswerInput({
  question,
  value,
  onChange,
  disabled,
}: {
  question: Question;
  value: AnswerValue;
  onChange: (v: AnswerValue) => void;
  disabled: boolean;
}) {
  if (question.kind === "text") {
    return (
      <textarea
        value={String(value)}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        lang="nl"
        className="w-full resize-y border border-[var(--color-rule)] bg-white px-3 py-2 text-[14.5px] leading-relaxed disabled:bg-[#f7f6f1]"
      />
    );
  }
  if (question.kind === "choice") {
    return (
      <div className="flex flex-wrap gap-1.5" role="radiogroup">
        {question.options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            disabled={disabled}
            onClick={() => onChange(option)}
            className={`border px-2.5 py-1.5 text-[13px] ${
              value === option
                ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white"
                : "border-[var(--color-rule)] bg-white hover:border-[var(--color-ink)]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
  const stops = sliderStops(question.scale);
  const index = nearestStop(question.scale, Number(value));
  return (
    <div>
      <div className="mb-1 text-[20px] font-bold tracking-tight">{formatAnswer(question, value)}</div>
      <input
        type="range"
        min={0}
        max={stops.length - 1}
        step={1}
        value={index}
        disabled={disabled}
        aria-label={question.question.nl}
        aria-valuetext={formatAnswer(question, value)}
        onChange={(e) => onChange(stops[Number(e.target.value)])}
        className="w-full accent-[var(--color-uitwijken)]"
      />
      <div className="flex justify-between text-[11px] text-[var(--color-secondary)]">
        <span>{question.low ?? formatAnswer(question, stops[0])}</span>
        <span>{question.high ?? formatAnswer(question, stops[stops.length - 1])}</span>
      </div>
    </div>
  );
}

function QuestionBlock({
  question,
  prefill,
  answer,
  locked,
  onUpdate,
}: {
  question: Question;
  prefill: Prefill;
  answer: Answer;
  locked: boolean;
  onUpdate: (patch: Partial<Answer>) => void;
}) {
  const base =
    "inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-[12px] font-semibold disabled:opacity-50";
  const idle = "border-[var(--color-rule)] bg-white hover:border-[var(--color-ink)]";
  const edited = answer.value !== prefill.value;

  return (
    <div className="border-t border-[var(--color-rule)] py-5">
      <h3 className="mb-1 text-[16px] font-bold leading-snug">
        <T {...question.question} />
      </h3>
      {question.help && (
        <p className="mb-2 text-[13px] text-[var(--color-secondary)]">
          <T {...question.help} />
        </p>
      )}
      <div className="mb-2">
        <BasisPill prefill={prefill} />
      </div>

      <AnswerInput
        question={question}
        value={answer.value}
        disabled={locked}
        onChange={(value) =>
          onUpdate({ value, status: value === prefill.value ? "unreviewed" : "changed" })
        }
      />

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={locked}
          onClick={() => onUpdate({ value: prefill.value, status: "confirmed" })}
          aria-pressed={answer.status === "confirmed"}
          className={`${base} ${
            answer.status === "confirmed" ? "border-[#33501e] bg-[#dfe6d5] text-[#33501e]" : idle
          }`}
        >
          <Check className="h-3.5 w-3.5" aria-hidden="true" />
          <T nl="Klopt" en="Correct" />
        </button>
        <button
          type="button"
          disabled={locked}
          onClick={() => onUpdate({ status: "unknown" })}
          aria-pressed={answer.status === "unknown"}
          className={`${base} ${
            answer.status === "unknown" ? "border-[var(--color-ink)] bg-[#efece4]" : idle
          }`}
        >
          <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <T nl="Weet ik niet" en="I do not know" />
        </button>
        {edited && (
          <button
            type="button"
            disabled={locked}
            onClick={() => onUpdate({ value: prefill.value, status: "unreviewed" })}
            className={`${base} ${idle}`}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <T nl="Terug naar aanname" en="Back to prefilled" />
          </button>
        )}
        {answer.status === "changed" && (
          <span className="text-[12px] font-semibold text-[#7a3418]">
            <T nl="Aangepast" en="Changed" />
          </span>
        )}
        <label className="ml-auto inline-flex items-center gap-2 text-[12px] text-[var(--color-secondary)]">
          <T nl="Delen" en="Sharing" />
          <select
            value={answer.share}
            disabled={locked}
            onChange={(e) => onUpdate({ share: e.target.value as Share })}
            className="border border-[var(--color-rule)] bg-white px-1.5 py-1 text-[12px] text-[var(--color-ink)]"
          >
            <option value="public">Mag in de atlas</option>
            <option value="confidential">Vertrouwelijk</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export function SurveyForm({ record }: { record: SurveyRecord }) {
  const [response, setResponse] = useState<SurveyResponse>(() => blankResponse(record));
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const dirty = useRef(false);

  useEffect(() => {
    let live = true;
    fetchResponse(record).then((stored) => {
      if (!live) return;
      setResponse(stored);
      setLoaded(true);
    });
    return () => {
      live = false;
    };
  }, [record]);

  useEffect(() => {
    if (!dirty.current) return;
    dirty.current = false;
    setSaving(true);
    const timer = setTimeout(() => {
      saveResponse(response).then(() => setSaving(false));
    }, 400);
    return () => clearTimeout(timer);
  }, [response]);

  const update = (id: string, patch: Partial<Answer>) => {
    dirty.current = true;
    setResponse((r) => ({
      ...r,
      answers: { ...r.answers, [id]: { ...r.answers[id], ...patch } },
    }));
  };

  const setSubmitted = (submittedAt: string | null) => {
    dirty.current = true;
    setResponse((r) => ({ ...r, submittedAt }));
  };

  const counts = useMemo(() => {
    const answers = Object.values(response.answers);
    return {
      total: answers.length,
      reviewed: answers.filter((x) => x.status !== "unreviewed").length,
      assumptions: QUESTIONS.filter((q) => record.prefill[q.id].basis === "assumption").length,
    };
  }, [response, record]);

  const locked = response.submittedAt !== null;

  return (
    <div className="min-h-screen">
      <SurveyHeader />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-uitwijken)]">
          <T nl="Enquête voor beheerders" en="Survey for operators" />
        </div>
        <h1 className="mb-1 text-3xl font-bold tracking-tight">{record.name}</h1>
        <p className="mb-4 text-[14px] text-[var(--color-secondary)]">
          {record.place} · <T {...record.type} /> ·{" "}
          <a
            href={record.url}
            target="_blank"
            rel="noreferrer"
            className="text-[var(--color-link)] underline underline-offset-2 hover:no-underline"
          >
            {record.url.replace("https://", "")}
          </a>
        </p>

        <PrototypeNotice />

        <p className="my-5 text-[15.5px] leading-relaxed text-[#2a2926]">
          <T
            nl={`We hebben alles al ingevuld wat we denken te weten. ${counts.assumptions} van de ${counts.total} antwoorden zijn schattingen, dus een deel klopt vast niet. Verbeter wat niet klopt, en kies Klopt of Weet ik niet bij de rest. Per antwoord bepaalt u of het in de atlas mag.`}
            en={`We have filled in everything we think we know. ${counts.assumptions} of the ${counts.total} answers are estimates, so some will be wrong. Correct what is wrong, and choose Correct or I do not know for the rest. You decide per answer whether it may go in the atlas.`}
          />
        </p>

        <div className="sticky top-[53px] z-10 -mx-4 mb-4 border-b border-[var(--color-rule)] bg-[var(--color-paper)] px-4 py-2 sm:-mx-6 sm:px-6">
          <div className="mb-1 flex items-center justify-between text-[12px] text-[var(--color-secondary)]">
            <span>
              <T
                nl={`${counts.reviewed} van ${counts.total} nagekeken`}
                en={`${counts.reviewed} of ${counts.total} reviewed`}
              />
            </span>
            <span aria-live="polite">
              {!loaded ? (
                <T nl="Laden" en="Loading" />
              ) : saving ? (
                <T nl="Opslaan" en="Saving" />
              ) : response.updatedAt ? (
                <T nl="Opgeslagen in deze browser" en="Saved in this browser" />
              ) : null}
            </span>
          </div>
          <div className="h-1 bg-[var(--color-rule-soft)]">
            <div
              className="h-1 bg-[var(--color-uitwijken)]"
              style={{ width: `${(counts.reviewed / counts.total) * 100}%` }}
            />
          </div>
        </div>

        {SECTIONS.map((section) => (
          <section key={section.key} className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight">
              <T {...section.title} />
            </h2>
            <p className="mb-3 text-[14px] text-[var(--color-secondary)]">
              <T {...section.intro} />
            </p>
            {QUESTIONS.filter((q) => q.section === section.key).map((q) => (
              <QuestionBlock
                key={q.id}
                question={q}
                prefill={record.prefill[q.id]}
                answer={response.answers[q.id]}
                locked={locked}
                onUpdate={(patch) => update(q.id, patch)}
              />
            ))}
          </section>
        ))}

        <div className="border-t-2 border-[var(--color-ink)] pt-4">
          {locked ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[14.5px] font-semibold">
                <T
                  nl="Ingestuurd in deze simulatie. Er is niets verzonden."
                  en="Submitted in this simulation. Nothing was sent."
                />
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(null)}
                className="border border-[var(--color-rule)] bg-white px-3 py-1.5 text-[13px] font-semibold hover:border-[var(--color-ink)]"
              >
                <T nl="Weer openen" en="Reopen" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setSubmitted(new Date().toISOString())}
              className="bg-[var(--color-ink)] px-4 py-2 text-[14px] font-semibold text-white hover:bg-black"
            >
              <T nl="Insturen (simulatie)" en="Submit (simulation)" />
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
