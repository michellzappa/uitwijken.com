/**
 * Simulated survey backend. It has the shape of a real API (async, keyed by
 * UUID), but answers stay in this browser's localStorage, or in memory where
 * storage is blocked. Swap these two functions for a real backend. Nobody but
 * the person at this browser sees an answer.
 */

import type { AnswerValue, Share, SurveyRecord } from "./survey-data";
import { QUESTIONS } from "./survey-data";

export type AnswerStatus = "unreviewed" | "confirmed" | "changed" | "unknown";

export type Answer = {
  value: AnswerValue;
  status: AnswerStatus;
  share: Share;
};

export type SurveyResponse = {
  uuid: string;
  answers: Record<string, Answer>;
  updatedAt: string | null;
  submittedAt: string | null;
};

const LATENCY_MS = 150;
const memory = new Map<string, string>();

const key = (uuid: string) => `uitwijken-survey-${uuid}`;
const wait = () => new Promise((resolve) => setTimeout(resolve, LATENCY_MS));

function read(uuid: string): string | null {
  try {
    const stored = localStorage.getItem(key(uuid));
    if (stored) return stored;
  } catch {}
  return memory.get(uuid) ?? null;
}

/** The starting point for a record: every answer prefilled and not yet reviewed. */
export function blankResponse(record: SurveyRecord): SurveyResponse {
  const answers: Record<string, Answer> = {};
  for (const q of QUESTIONS) {
    answers[q.id] = {
      value: record.prefill[q.id].value,
      status: "unreviewed",
      share: q.defaultShare,
    };
  }
  return { uuid: record.uuid, answers, updatedAt: null, submittedAt: null };
}

export async function fetchResponse(record: SurveyRecord): Promise<SurveyResponse> {
  await wait();
  const blank = blankResponse(record);
  const stored = read(record.uuid);
  if (!stored) return blank;
  try {
    const parsed = JSON.parse(stored) as SurveyResponse;
    return { ...blank, ...parsed, answers: { ...blank.answers, ...parsed.answers } };
  } catch {
    return blank;
  }
}

export async function saveResponse(response: SurveyResponse): Promise<SurveyResponse> {
  await wait();
  const saved = { ...response, updatedAt: new Date().toISOString() };
  const json = JSON.stringify(saved);
  memory.set(response.uuid, json);
  try {
    localStorage.setItem(key(response.uuid), json);
  } catch {}
  return saved;
}

export async function clearResponse(uuid: string): Promise<void> {
  await wait();
  memory.delete(uuid);
  try {
    localStorage.removeItem(key(uuid));
  } catch {}
}
