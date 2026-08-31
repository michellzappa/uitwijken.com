import fs from "node:fs/promises";
import path from "node:path";

const VAULT = path.join(process.cwd(), "content", "wiki");

export function slugify(name: string): string {
  return name
    .replace(/\.md$/i, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");
}

export async function listDocs(): Promise<string[]> {
  const entries = await fs.readdir(VAULT);
  return entries
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

async function resolveFile(slug: string): Promise<string | null> {
  const files = await fs.readdir(VAULT);
  const match = files.find(
    (f) => f.endsWith(".md") && slugify(f) === slug.toLowerCase(),
  );
  return match ? path.join(VAULT, match) : null;
}

export async function readDoc(
  slug: string,
): Promise<{ title: string; body: string } | null> {
  const file = await resolveFile(slug);
  if (!file) return null;
  const raw = await fs.readFile(file, "utf-8");
  const title = path.basename(file, ".md");
  return { title, body: rewriteWikilinks(stripTitleHeading(raw)) };
}

function stripTitleHeading(src: string): string {
  return src.replace(/^#\s+[^\n]+\n+/, "");
}

export function rewriteWikilinks(src: string): string {
  return src.replace(
    /\[\[([^\]]+)\]\]/g,
    (_full, inner: string) => {
      const [targetRaw, aliasRaw] = inner.split("|").map((s) => s.trim());
      const [namePart, hashPart] = targetRaw.split("#").map((s) => s.trim());
      const label = aliasRaw ?? (hashPart ? `${namePart} § ${hashPart}` : namePart);
      const slug = slugify(namePart);
      const hash = hashPart ? `#${slugify(hashPart)}` : "";
      if (!KNOWN_SLUGS.has(slug)) {
        return `**${label}**`;
      }
      return `[${label}](/docs/${slug}${hash})`;
    },
  );
}

const KNOWN_SLUGS = new Set([
  "readme",
  "vision",
  "concepts",
  "building-blocks",
  "naming",
  "proof-of-concept",
  "funding",
  "adoption",
  "risks-and-next-steps",
  "open-data",
  "governance",
  "operating-model",
  "history",
  "meeting-2026-04-16",
  "meeting-2026-05-22",
  "meeting-2026-06-01",
  "event-sources",
  "map-sources",
  "precedents",
  "research-log",
]);

export { DOC_GROUPS, type DocGroup } from "./doc-groups";
