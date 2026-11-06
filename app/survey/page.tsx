"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Download, RotateCcw } from "lucide-react";
import { T } from "../lib/i18n";
import { PrototypeNotice, SurveyHeader } from "./SurveyChrome";
import { QUESTIONS, SURVEY_RECORDS, formatAnswer } from "./survey-data";
import { clearResponse, fetchResponse, type AnswerStatus, type SurveyResponse } from "./store";

const STATUS_LABEL: Record<AnswerStatus, string> = {
  unreviewed: "Niet nagekeken",
  confirmed: "Klopt",
  changed: "Aangepast",
  unknown: "Weet ik niet",
};

/** The internal view: where our assumptions met the answers. */
export default function SurveyIndex() {
  const [responses, setResponses] = useState<Record<string, SurveyResponse>>({});

  const load = useCallback(async () => {
    const all = await Promise.all(SURVEY_RECORDS.map(fetchResponse));
    setResponses(Object.fromEntries(all.map((r) => [r.uuid, r])));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const exportJson = () => {
    const blob = new Blob(
      [JSON.stringify({ questions: QUESTIONS, records: SURVEY_RECORDS, responses }, null, 2)],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "uitwijken-survey-simulation.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <SurveyHeader />
      <main className="mx-auto max-w-3xl px-4 pb-16 pt-8 sm:px-6">
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-uitwijken)]">
          <T nl="Intern overzicht" en="Internal view" />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight">
          <T nl="Kalibratie van de enquête" en="Survey calibration" />
        </h1>
        <PrototypeNotice />
        <p className="my-5 text-[15px] leading-relaxed text-[#2a2926]">
          <T
            nl="Elke beheerder krijgt een eigen link met een UUID. Open er een, vul hem in en kom hier terug om te zien waar onze aannames afwijken."
            en="Each operator gets their own link with a UUID. Open one, fill it in, and come back here to see where our assumptions were off."
          />
        </p>

        <div className="mb-8 flex justify-end">
          <button
            type="button"
            onClick={exportJson}
            className="inline-flex items-center gap-1.5 border border-[var(--color-rule)] bg-white px-3 py-1.5 text-[12px] font-semibold hover:border-[var(--color-ink)]"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <T nl="Exporteer JSON" en="Export JSON" />
          </button>
        </div>

        {SURVEY_RECORDS.map((record) => {
          const response = responses[record.uuid];
          const answers = response ? Object.values(response.answers) : [];
          const changed = QUESTIONS.filter((q) => response?.answers[q.id]?.status === "changed");
          const count = (status: AnswerStatus) => answers.filter((x) => x.status === status).length;
          return (
            <section key={record.uuid} className="border-t border-[var(--color-rule)] py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-[18px] font-bold">
                  <Link
                    href={`/survey/${record.uuid}`}
                    className="hover:text-[var(--color-link)] hover:underline"
                  >
                    {record.name}
                  </Link>
                </h2>
                <span className="text-[12px] text-[var(--color-secondary)]">
                  <T {...record.type} />
                </span>
              </div>
              <code className="mb-2 block break-all text-[11.5px] text-[var(--color-secondary)]">
                /survey/{record.uuid}
              </code>
              <p className="text-[13px] text-[#2a2926]">
                <T
                  nl={`${count("confirmed")} klopt, ${count("changed")} aangepast, ${count("unknown")} onbekend, ${count("unreviewed")} open.`}
                  en={`${count("confirmed")} correct, ${count("changed")} changed, ${count("unknown")} unknown, ${count("unreviewed")} open.`}
                />
                {response?.submittedAt && (
                  <>
                    {" "}
                    <T nl="Ingestuurd." en="Submitted." />
                  </>
                )}
              </p>

              {changed.length > 0 && (
                <div className="mt-3 overflow-x-auto border border-[var(--color-rule)] bg-white">
                  <table className="w-full min-w-[520px] border-collapse text-[12.5px]">
                    <thead>
                      <tr className="text-left text-[10.5px] uppercase tracking-[0.12em] text-[var(--color-secondary)]">
                        <th className="border-b border-[var(--color-rule)] px-2 py-1.5">
                          <T nl="Vraag" en="Question" />
                        </th>
                        <th className="border-b border-[var(--color-rule)] px-2 py-1.5">
                          <T nl="Aanname" en="Prefilled" />
                        </th>
                        <th className="border-b border-[var(--color-rule)] px-2 py-1.5">
                          <T nl="Antwoord" en="Answer" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {changed.map((q) => (
                        <tr key={q.id} className="align-top">
                          <td className="border-b border-[var(--color-rule-soft)] px-2 py-1.5">
                            <T {...q.question} />
                          </td>
                          <td className="border-b border-[var(--color-rule-soft)] px-2 py-1.5">
                            {formatAnswer(q, record.prefill[q.id].value)}
                          </td>
                          <td className="border-b border-[var(--color-rule-soft)] px-2 py-1.5 font-semibold">
                            {formatAnswer(q, response.answers[q.id].value)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {answers.some((x) => x.status !== "unreviewed") && (
                <button
                  type="button"
                  onClick={() => clearResponse(record.uuid).then(load)}
                  className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-[var(--color-secondary)] hover:text-[var(--color-ink)]"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <T nl="Wis antwoorden" en="Clear answers" />
                </button>
              )}
            </section>
          );
        })}
        <p className="mt-2 text-[12px] text-[var(--color-secondary)]">
          {Object.values(STATUS_LABEL).join(" · ")}
        </p>
      </main>
    </div>
  );
}
