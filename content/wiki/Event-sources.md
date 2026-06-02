# Event Sources

A living inventory of geotagged event data sources for Amsterdam and Noord-Holland, and how accessible each one is to a society-owned platform like Uitwijken.nl.

This page is concrete vendor- and API-level detail. The principles for **why** open data matters live in [[Open-data]]. The dated record of how this inventory was built — and how it changes — lives in [[Research-log]].

**Last reviewed:** 2026-06-02

## Current working priority

Until contradicted by new evidence, the platform ingests in this order:

1. **Amsterdam Datapunt Evenementen** — public, no-auth, CC-BY 4.0, all required fields. Start here.
2. **Ticketmaster Discovery API** — most accessible commercial source; free API key, 5k calls/day.
3. **[Schema.org](https://schema.org/Event) JSON-LD scraper** — generic fallback for venue HTML ([Melkweg](https://www.melkweg.nl), [Paradiso](https://www.paradiso.nl), [dezwijger](https://dezwijger.nl), museums, many more).
4. **Targeted venue HTML scrapers** for sites without JSON-LD.
5. **Curated [Luma](https://lu.ma) calendar polling** for Amsterdam-relevant slugs — free, no API.
6. **[Meetup](https://www.meetup.com) / [Eventbrite](https://www.eventbrite.com)** — only if the Pro / partner cost is ever justified.
7. **Skip [Facebook](https://www.facebook.com/events/) entirely** — API closed since COVID, scrapers archived 2021, ToS risk.

Rationale: maximize coverage × accessibility, avoid lock-in to gated commercial APIs, prefer sources whose licenses match a public-interest platform.

## Tier 1 — Open and accessible

| Source | URL | Type | Auth | Fields | Notes |
|---|---|---|---|---|---|
| Amsterdam Datapunt Evenementen | [api.data.amsterdam.nl/v1/evenementen/evenementen](https://api.data.amsterdam.nl/v1/evenementen/evenementen) | REST + WFS + MVT | None (key rolling out) | title, start/end date+time, polygon geometry, source URL | CC-BY 4.0. Gemeente Amsterdam authoritative permit data |
| [data.overheid.nl](https://data.overheid.nl) | [data.overheid.nl](https://data.overheid.nl) | DCAT 1.1 catalog | None | Mirrors Amsterdam + nationwide | Discoverability layer; flows to [European Data Portal](https://data.europa.eu) |
| Ticketmaster Discovery API v2 | [developer.ticketmaster.com](https://developer.ticketmaster.com) | REST | apikey query param | start/end datetime + tz, venue name+address+lat/lon+postcode, ticket URL, images, genre tags | 5,000 calls/day @ 5 req/s, 1,000-item paging cap |
| Schema.org JSON-LD on venue HTML | [schema.org/Event](https://schema.org/Event) | Embedded structured data | None | Whatever venue embeds (usually date, title, location, URL) | Extract with [`extruct`](https://github.com/scrapinghub/extruct) / [`schema-dts`](https://github.com/google/schema-dts). Used by [Eventbrite](https://www.eventbrite.com), Ticketmaster, [Meetup](https://www.meetup.com), many venues |
| KNVB Dataservice | [api.knvbdataservice.nl](https://api.knvbdataservice.nl) | REST | Partner | Match fixtures, venues, times | Sports — [Ajax](https://www.ajax.nl) + amateur clubs |

## Tier 2 — Paid or gated, but workable

| Source | Type | Auth | Notes |
|---|---|---|---|
| [Luma](https://lu.ma) | REST | Luma Plus subscription, calendar-scoped keys | 200 req/min per calendar / 500/min per org. No global discovery — must know calendar slugs. Practical path: maintain a list of Amsterdam-relevant calendars and poll each |
| [Meetup](https://www.meetup.com) GraphQL | GraphQL @ [api.meetup.com/gql-ext](https://www.meetup.com/api/general/#graphql) | OAuth 2; new consumers require Meetup Pro since Feb 2025 | Old API keys deprecated. Major barrier for new aggregators |
| [Eventbrite](https://www.eventbrite.com/platform/) | REST | OAuth | Public event search was deprecated; mostly own-org scoped now. Confirm current docs before relying |
| [DICE](https://dice.fm) Partners | GraphQL | Bearer via MIO, partner-only | Scoped to your own ticket data, not city-wide discovery |

## Tier 3 — Closed or scrape-only

| Source | Status | Fallback |
|---|---|---|
| [Facebook Events](https://www.facebook.com/events/) | Officially closed. Meta paused new partners (COVID-era), canonical scraper archived Dec 2021 | None viable; high ToS risk |
| [Melkweg](https://www.melkweg.nl) | No API/RSS/iCal/wp-json. Listing exposes date, type, title, genre tags, URL; times/room/price need detail-page fetch | HTML scrape detail pages or via [Songkick](https://www.songkick.com) venue calendar |
| [Paradiso](https://www.paradiso.nl) | No public feed | Scrape; Songkick / [Bandsintown](https://www.bandsintown.com) aggregate it |
| [Pakhuis de Zwijger](https://dezwijger.nl) | No feed | Scrape (check for embedded JSON-LD first) |
| [Resident Advisor](https://ra.co) | No public API | Third-party scrapers — ToS risk |
| [Bandsintown](https://www.bandsintown.com) / [Songkick](https://www.songkick.com) | Artist-API only; no city/venue free tier | Useful for cross-reference |

## Open questions

These weren't fully resolved in the 2026-06-02 scan and are worth a follow-up dive before locking the architecture:

- [Uitagenda](https://uitagenda.nl) / Uit in Nederland ([LantarenVenster](https://www.lantarenvenster.nl), Cultuurpas pipeline) — partner API or open feed?
- Songkick / Bandsintown / RA paid tiers — pricing and licensing?
- [Decidim](https://decidim.org) instances, buurtbudget, [Stadspas](https://www.amsterdam.nl/stadspas/) — any structured channel?
- [Museumnacht](https://museumnacht.amsterdam), [UvA](https://www.uva.nl) / [VU](https://vu.nl) iCal calendars, warenmarkten open data — feed availability?
- Venue "no API" claims rest on absence-of-evidence — worth a manual network-tab check on each before committing to HTML scraping.

## Implications for product

- **Map "Events this week" layer** ([[Open-data]]) can ship on Datapunt + Ticketmaster + JSON-LD alone, with no commercial dependency.
- **Civic-layer events** (consultations, buurtbudget, Stadspas) likely require their own ingestion path — not the same pipeline as cultural events.
- **One Schema.org JSON-LD extractor** can serve many venues — invest in it as shared infrastructure rather than one scraper per venue.
- **No Facebook dependency** — design assumes that channel stays closed.

## Tags

#year/2026 #city/amsterdam #data/events
