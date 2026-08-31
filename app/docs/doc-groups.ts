export type DocGroup = { label: string; items: { slug: string; title: string }[] };

export const DOC_GROUPS: DocGroup[] = [
  {
    label: "Concept",
    items: [
      { slug: "readme", title: "README" },
      { slug: "vision", title: "Vision" },
      { slug: "concepts", title: "Concepts" },
      { slug: "building-blocks", title: "Building blocks" },
      { slug: "naming", title: "Naming" },
      { slug: "governance", title: "Governance" },
    ],
  },
  {
    label: "Product proof",
    items: [
      { slug: "proof-of-concept", title: "Proof of concept" },
      { slug: "open-data", title: "Open data" },
      { slug: "adoption", title: "Adoption" },
    ],
  },
  {
    label: "Data & research",
    items: [
      { slug: "event-sources", title: "Event sources" },
      { slug: "map-sources", title: "Map sources" },
      { slug: "precedents", title: "Precedents" },
      { slug: "research-log", title: "Research log" },
    ],
  },
  {
    label: "Delivery",
    items: [
      { slug: "funding", title: "Funding" },
      { slug: "operating-model", title: "Operating model" },
      { slug: "risks-and-next-steps", title: "Risks & next steps" },
    ],
  },
  {
    label: "History",
    items: [
      { slug: "history", title: "History" },
      { slug: "meeting-2026-04-16", title: "Meeting — 2026-04-16" },
      { slug: "meeting-2026-05-22", title: "Meeting — 2026-05-22" },
      { slug: "meeting-2026-06-01", title: "Meeting — 2026-06-01" },
    ],
  },
];
