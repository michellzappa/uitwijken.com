import { notFound } from "next/navigation";
import { listDocs, readDoc, slugify } from "../lib";
import { DocView } from "../view";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await listDocs()).map((name) => ({ slug: slugify(name) }));
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await readDoc(slug);
  if (!doc) notFound();
  return <DocView title={doc.title} body={doc.body} />;
}
