# Research Log

Dated record of research dives that shape the platform. Each entry captures the question, what was found, the level of confidence, and what was decided as a result.

This is intentionally append-only. When facts change, add a new entry — don't rewrite old ones. The current-best summary of any topic lives in its own wiki page (e.g. [[Event-sources]]); this log is the audit trail behind those pages.

## How to use this log

- **One entry per dive.** A "dive" is a focused question that produced a decision or a working inventory.
- **Date it.** Entries are ordered newest-first.
- **Link out.** If the dive produced or updated an inventory page (like [[Event-sources]]), link to it. Don't duplicate the table here.
- **Capture caveats.** Time-sensitive facts (API gate changes, deprecations) belong in the entry so future readers know when to re-verify.
- **Record the decision.** Even "decided to wait" is a decision worth logging.

---

## 2026-06-02 — Map & geometry sources for Amsterdam

**Question:** What cartographic and geometry sources can render the Uitwijken map — base tiles, administrative boundaries (stadsdeel/wijk/buurt), address/building geometry, and street-level detail? This is the map counterpart to the event-pins dive: [[Open-data]] named the data types as principles, but the base cartography had never been inventoried at API level.

**Method:** Three parallel research agents — national PDOK/Kadaster services, Dutch basisregistraties (CBS/BAG/BGT/NWB), and Amsterdam's own municipal geo APIs. Endpoints live-probed against official docs.

**Key findings:**
- The map foundation is fully buildable on open data: **PDOK** (BRT-A base tiles, BAG, BGT, Locatieserver geocoder) + **data.amsterdam.nl** (gebieden, basiskaart, meldingen), free and no-auth.
- Use **Amsterdam's own `gebieden` indeling** for the platform's scales — it does not map 1:1 to CBS (carries a separate `cbsCode` field). CBS Wijk- en Buurtkaart is the source for national comparability + statistics.
- Licensing is mixed: BGT/NWB are CC-0, BRT-A/CBS are CC-BY (attribution needed), Amsterdam basiskaart has bespoke municipal terms.
- Two distinct BAG APIs: PDOK OGC API (no key, bulk/tiles) vs. Kadaster Individuele Bevragingen (free key, single lookups, rate-limited) — don't conflate.

**Decision:** Adopt the stack captured in [[Map-sources]]. Build the proof-of-concept map foundation on PDOK + data.amsterdam.nl with no commercial cartography dependency. Consider the base-cartography question **closed**; the civic-overlay layer (permits, plans, budgets) remains open.

**Caveats to re-verify:**
- API keys are rolling toward mandatory on both PDOK BAG (Individuele Bevragingen) and data.amsterdam.nl, with no firm deadline — biggest forward-looking risk.
- Exact BAG/BGT collection identifiers — confirm against live `/collections` JSON before coding field names.
- Amsterdam `gebieden` shows "Licentie: -" while behaving as open/CC-BY — confirm attribution terms.

**Open follow-ups:** Municipal permits/plans datasets, parkeervakken/bomen and other thematic map layers, BGT vector-tile render budgets at buurt scale, buurtbudget/Stadspas geo channels.

**Source pages updated:** [[Map-sources]] (new), [[Open-data]] (cross-link added).

---

## 2026-06-02 — Event data sources for Amsterdam

**Question:** Which sources of geotagged event data exist for Amsterdam and Noord-Holland, and which expose APIs / feeds with title, date, location, and source URL?

**Method:** Multi-agent deep-research workflow — 6 search angles, 27 sources fetched, 25 claims adversarially verified (24 confirmed, 1 refuted).

**Key findings:**
- Gemeente Amsterdam's Datapunt Evenementen dataset is the strongest single source: public, no-auth, CC-BY 4.0, REST + WFS + MVT.
- Most commercial event APIs (Luma, Meetup, DICE, Eventbrite) are partner-gated, paid, or owner-scoped.
- Ticketmaster Discovery API v2 is the most accessible commercial source — free key, 5k calls/day.
- Facebook Events API has been effectively closed since COVID; the canonical community scraper was archived in 2021.
- Major Amsterdam cultural venues (Melkweg, Paradiso, Pakhuis de Zwijger) publish no API/RSS/iCal — HTML scraping (ideally via embedded Schema.org JSON-LD) is the path.

**Decision:** Adopt the ingestion priority captured in [[Event-sources]]. Ship the "Events this week" map layer on open data + JSON-LD scraping with no commercial dependency. Defer commercial APIs until a business case justifies the cost.

**Caveats to re-verify:**
- Datapunt is rolling out a mandatory API key — code should be ready to send it.
- Meetup tightened its gate in Feb 2025 (Pro tier required for new OAuth consumers); older blog posts are misleading.
- Venue "no API" claims rest on absence-of-evidence — worth a manual check.

**Open follow-ups:** Uitagenda / Uit in Nederland, Songkick / Bandsintown / RA paid tiers, civic event channels (Decidim, buurtbudget, Stadspas), Museumnacht / UvA / VU / warenmarkten feeds.

**Source pages updated:** [[Event-sources]] (new), [[Open-data]] (cross-link added).

## Tags

#year/2026 #city/amsterdam #process/research
