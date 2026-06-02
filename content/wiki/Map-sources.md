# Map Sources

A living inventory of the cartographic and geometry data sources behind the Uitwijken.nl map — the base tiles, administrative boundaries, and address/building geometry that make [[Concepts|cascading geography]] possible before there is any user activity.

This page is concrete vendor- and API-level detail, the map counterpart to [[Event-sources]] (which inventories event *pins*). The principles for **why** open data matters live in [[Open-data]]. The dated record of how this inventory was built lives in [[Research-log]].

Unlike events — where the salient question is commercial gating — almost every source here is open Dutch government data. The axis that matters is **layer function**: what each source contributes to the stack. Most of the foundation is served by **PDOK** (the national geodata platform, run by Kadaster) and **data.amsterdam.nl** (the municipal DSO-API), both free and no-auth.

**Last reviewed:** 2026-06-02

## Recommended stack

A buurt-scale civic map can be built end-to-end on open data with no commercial dependency:

1. **Base canvas** — PDOK BRT Achtergrondkaart vector tiles (free, CC-BY). MapTiler/Mapbox only if a custom global style is ever worth the cost.
2. **Boundaries** — Amsterdam `gebieden` API for the city's own stadsdeel → wijk → buurt hierarchy (this is the indeling the platform should use); CBS Wijk- en Buurtkaart when national comparability or statistics are needed.
3. **Addresses & buildings** — PDOK BAG OGC API / vector tiles for the map layer; PDOK Locatieserver for the search box; Kadaster BAG Individuele Bevragingen for "what's at this point" lookups.
4. **Street-level detail** — PDOK BGT vector tiles when zoomed into a single buurt (pavements, greenery, water).
5. **Civic overlays** — events via [[Event-sources]]; meldingen, permits, plans via the municipal DSO-API and [[Open-data]].

Rationale: prefer national basisregistraties (stable, authoritative, openly licensed) for the foundation; use Amsterdam's own services where the city's indeling or freshness beats the national mirror.

## Base map tiles — the canvas

| Source | URL | Type | Auth | License | Notes |
|---|---|---|---|---|---|
| PDOK BRT Achtergrondkaart (BRT-A) | [WMTS](https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?request=GetCapabilities&service=WMTS) · [vector tiles](https://api.pdok.nl/kadaster/brt-achtergrondkaart/ogc/v1) | WMTS + OGC API Tiles/Styles | None | **CC-BY 4.0** (© Kadaster) | Standard Dutch national base map. Styles: standaard, grijs, pastel, water. RD / ETRS89 / WebMercator. The default canvas |
| Amsterdam basiskaart | [WMTS](https://map.data.amsterdam.nl/service/?REQUEST=GetCapabilities&SERVICE=WMTS) | WMTS | None | Bespoke municipal terms (fees: none) | City's own topo + 30+ luchtfoto (aerial 2003–2025) layers. `topo_rd` / `_light` / `_zw` + WebMercator twins. Higher freshness than national mirror; non-CC terms |
| OpenStreetMap | [site](https://www.openstreetmap.org) | Raster / vector tiles | None (own tile server / provider) | ODbL | Global fallback, rich POI detail. Tile hosting via own server or a provider; respect OSMF tile-usage policy |
| MapTiler | [site](https://www.maptiler.com) | Vector tiles + styling | API key | Commercial | Only if a custom global style / hosting convenience justifies cost |
| Mapbox | [site](https://www.mapbox.com) | Vector tiles + styling | API key | Commercial | Same as MapTiler — avoid lock-in unless styling needs demand it |

## Administrative boundaries — the cascading scales

| Source | URL | Type | Auth | License | Notes |
|---|---|---|---|---|---|
| Amsterdam gebieden | [REST](https://api.data.amsterdam.nl/v1/gebieden/) · [WFS](https://api.data.amsterdam.nl/v1/wfs/gebieden) | REST + WFS | None (key rolling out) | Public (effectively CC-BY) | Levels: stadsdelen, wijken, buurten, ggwgebieden, ggpgebieden, bouwblokken. RD/EPSG:28992. **Amsterdam's own indeling** — carries a `cbsCode` field because it does **not** map 1:1 to CBS. Use this for the platform's scales |
| CBS Wijk- en Buurtkaart | [WFS](https://service.pdok.nl/cbs/wijkenbuurten/2025/wfs/v1_0?request=GetCapabilities&service=WFS) | WFS + OGC API + ATOM | None | **CC-BY 4.0** | Annual (year in path). gemeente / wijk / buurt polygons with CBS codes + statistics (population, density…). No native `stadsdeel` layer — Amsterdam stadsdelen sit at CBS *wijk* level. For national comparability and choropleths |

## Addresses & buildings

| Source | URL | Type | Auth | License | Notes |
|---|---|---|---|---|---|
| PDOK BAG | [OGC API](https://api.pdok.nl/kadaster/bag/ogc/v2) | OGC API Features / Vector Tiles / Styles | None | CC-0 (public domain) | `pand` = building footprint polygons, `verblijfsobject` = address points, `ligplaats`/`standplaats` polygons. For the map layer and bulk use |
| PDOK Locatieserver v3_1 | [docs](https://api.pdok.nl/bzk/locatieserver/search/v3_1/ui/) | REST (suggest / lookup / free / reverse) | None | Public | The geocoder for the **search box**. Returns RD + WGS84 coords and BAG IDs; reverse geocode by X/Y. Migrated off the retired `nationaalgeoregister` URLs in 2023 |
| Kadaster BAG Individuele Bevragingen v2 | [docs](https://www.kadaster.nl/zakelijk/producten/adressen-en-gebouwen/bag-api-individuele-bevragingen) | REST | **Free key** | Public | Single-object lookups ("what's at this point") at `api.bag.kadaster.nl/lvbag/individuelebevragingen/v2`. 50k queries/day, 50 req/s — **not for bulk**. Register via [developer.kadaster.nl](https://developer.kadaster.nl) |

## Street-level detail

| Source | URL | Type | Auth | License | Notes |
|---|---|---|---|---|---|
| PDOK BGT | [OGC API](https://api.pdok.nl/lv/bgt/ogc/v1) | OGC API Features / Vector Tiles + WMTS + Download | None | **CC-0** | Pavements (wegdeel), greenery, water, panden at street level. **No WFS** (deprecated). Features API caps at 1,000/request — render via vector tiles/WMTS, query Features only in a small bbox |
| PDOK NWB (Nationaal Wegenbestand) | [docs](https://www.pdok.nl/datasets/-/article/nationaal-wegenbestand-nwb-) | WMS / WFS / OGC API / ATOM | None | **CC-0** | Road centerlines + hectometer points. For routing / road reference; secondary to BGT for a buurt map |

## Civic overlays

The layers that drape on the base map. These mostly live in other inventories — listed here so the full map stack is legible in one place.

| Layer | Source | Where inventoried |
|---|---|---|
| Events this week | Amsterdam Datapunt Evenementen, Ticketmaster, JSON-LD | [[Event-sources]] |
| Meldingen / public-space reports | [WFS](https://api.data.amsterdam.nl/v1/wfs/meldingen/v1) — public read, CC-BY, point geometry from 2018 on | This page (Signalen output is openly published, unlike the write-side app) |
| Permits & planning | Municipal DSO-API datasets | [[Open-data]] (principles) — **not yet inventoried at API level** |
| Budgets & consultations | buurtbudget, Stadspas, Decidim-style channels | Open follow-up — see [[Event-sources]] open questions |

## Open questions

These weren't fully resolved in the 2026-06-02 scan and are worth a follow-up before locking the architecture:

- **Platform API keys.** Both PDOK-side BAG (Individuele Bevragingen) and data.amsterdam.nl are rolling toward mandatory keys with no firm deadline announced. Code should be ready to send a key. This is the biggest forward-looking risk for a third-party integrator.
- **Exact BAG/BGT collection identifiers** — verify against the live `/collections` JSON before hard-coding field names.
- **Amsterdam `gebieden` license string** — the dataset page shows "Licentie: -" while the data is openbare data; behaviorally CC-BY but not formally tagged. Confirm before relying on attribution terms.
- **Municipal map-relevant datasets** (parkeervakken, bomen/trees, and the broader permits/plans layer) — named in [[Open-data]] but never inventoried at endpoint level the way events were. A natural next dive.
- **Vector-tile performance at buurt scale** — BGT detail is heavy; test real render budgets before committing to it as more than a zoomed-in layer.

## Implications for product

- **The map foundation is a closed question.** Base tiles + boundaries + addresses can ship entirely on PDOK + data.amsterdam.nl, free and openly licensed. No commercial cartography dependency is required for the proof-of-concept.
- **Use Amsterdam's indeling, not CBS, for the platform's scales** — but keep the `cbsCode` link so national statistics can still be joined.
- **One geocoder, one base style, reused everywhere** — invest in the PDOK Locatieserver search box and a single BRT-A style as shared infrastructure, the same way [[Event-sources]] argues for one JSON-LD extractor.
- **Licensing is mixed** — BGT/NWB are CC-0, BRT-A/CBS are CC-BY (attribution line needed), Amsterdam basiskaart has bespoke terms. Track per-layer attribution from the start.
- **What's still open is the civic-overlay layer** — permits, plans, budgets — not the cartography. That's where the next research dive should go.

## Tags

#year/2026 #city/amsterdam #data/maps
