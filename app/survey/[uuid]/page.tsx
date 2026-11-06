import { notFound } from "next/navigation";
import { SURVEY_RECORDS, getSurveyRecord } from "../survey-data";
import { SurveyForm } from "./SurveyForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return SURVEY_RECORDS.map((r) => ({ uuid: r.uuid }));
}

export default async function SurveyPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = await params;
  const record = getSurveyRecord(uuid);
  if (!record) notFound();
  return <SurveyForm record={record} />;
}
