# Uitwijken.nl prototype

Interactive mock screens and concept notes for **Uitwijken.nl** — a society-owned, location-and-theme-based civic community layer for Amsterdam and, eventually, other Dutch places.

## What Uitwijken.nl is about

Uitwijken.nl explores whether Amsterdam can host a public-interest platform that is:

- **Society-owned**, not government-owned and not company-owned.
- **Location-aware**, with a cascading model from house to street to buurt to city.
- **Theme-based**, so healthcare, events, safety, public space, budgets, services, and plans can be understood at the right scale.
- **Role-aware**, connecting residents, government, and entrepreneurs in one civic environment.
- **Action-oriented**, moving from information to questionnaires, decisions, events, services, and physical-world participation.

**Status:** concept and wireframes only. This repo is for thinking, pitching, and co-design, not a product build.

## What's in this repo

| Area | Purpose |
|------|---------|
| **`/` (home)** | Index of six proof-of-concept screens |
| **`/map`, `/themes`, `/vragen`, `/events`, `/inbox`, `/governance`** | Wireframes for the location-and-theme civic layer |
| **`/docs`** | Wiki rendered from `content/wiki/` |

The six active mocks demonstrate the new backbone: map lens, theme view, questionnaire and budget, events and action, civic inbox, and governance.

## Run locally

```bash
pnpm install
pnpm dev
```

App runs at [http://localhost:3777](http://localhost:3777).

## Deploy

www.uitwijken.com is a static export on the Cloudflare Worker `uitwijken` (account Centaur-Labs). There is no auto-deploy: a push to `main` does not change the live site. Deploy by hand:

```bash
./node_modules/.bin/next build && npx wrangler@4 deploy
```

uitwijken.com redirects (308) to www. The Vercel project `uitwijken` serves no domain.

## Related

Concept notes live in `content/wiki/` and are browsable at `/docs`.
