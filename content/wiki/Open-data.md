# Open Data

Amsterdam's open data is one reason the city is the right first geography. Uitwijken.nl can use public data to make the map useful before there is much user-generated activity.

This page holds the **principles** — why open data matters and how it maps to product behavior. Concrete inventories of specific sources live in their own pages: [[Event-sources]] for geotagged events. New inventories should follow the same pattern and be logged in [[Research-log]].

## Data As Civic Backbone

Open data should become product behavior:

| Data type | Product behavior |
|---|---|
| Buurt and street geometries | Cascading location model |
| BAG addresses | House, building, and street context |
| Permits and plans | Civic inbox and map alerts |
| Signalen / public-space reports | Issue layers and follow-up loops |
| Events and venues | Adoption hook and physical action |
| Facilities and services | Theme-specific local support |
| Budgets and consultations | Questionnaires and decision flows |
| Archive and heritage data | Place attachment and trust |

## Map Layers

The map should let users toggle layers that match real civic questions:

- Events this week
- Open consultations
- Budget proposals
- Public-space reports
- Permits and planning changes
- Local services and facilities
- Resident initiatives
- Theme clusters such as care, youth, safety, culture, public space

## Push Model

The current civic information model often expects residents to search websites, newsletters, and portals. Uitwijken.nl should invert that. If a plan affects a user's street, or a questionnaire opens for a theme they follow, the platform should surface it.

This is not personalization for engagement. It is relevance based on location and civic interest.

## AI Classification

AI can help cluster content into themes, identify related subjects, map synonyms, and summarize scattered information. It should assist the information architecture rather than rank content for attention.

Example: a resident post about loneliness, a municipal health plan, a library event, and an entrepreneur's room offer might all connect to the broader theme of care in the neighborhood.

## Concrete inventories

| Page | Scope |
|---|---|
| [[Event-sources]] | Geotagged event data: Datapunt, Ticketmaster, Luma, Meetup, venue scraping, Facebook status |
| [[Map-sources]] | Cartography & geometry: base tiles, buurt/wijk boundaries, BAG addresses, BGT, geocoding |
| [[Research-log]] | Dated record of how each inventory was built and what we decided |

## First Spike

For the proof-of-concept, use plausible or mocked Amsterdam data to demonstrate:

- Buurt, street, and city scales.
- Three or four themes.
- One budget questionnaire.
- One public plan.
- A small event layer.
- Government, resident, and entrepreneur items on the same map.

The prototype does not need perfect live integration. It needs to show why integration matters.

## Tags

#year/2026 #city/amsterdam
