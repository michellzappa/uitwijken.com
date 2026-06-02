# Precedents

Similar civic-infrastructure initiatives in other cities and regions. Uitwijken.nl is not the first attempt at society-owned digital infrastructure for local life — each entry below is running, studied, and instructive about what works and what to avoid.

Grouped by what they prove. See [[Governance]] for how ownership models map onto Uitwijken's design.

## Open-source participation platforms

### Decidim — Barcelona, then global

- **What:** [Decidim](https://decidim.org/) — open-source civic participation platform. Ruby on Rails, AGPL ([decidim/decidim](https://github.com/decidim/decidim)).
- **Origin:** [Barcelona en Comú](https://barcelonaencomu.cat/), 2016. [decidim.barcelona](https://decidim.barcelona/) is the reference deployment.
- **Scale:** hundreds of municipalities including [Helsinki](https://omastadi.hel.fi/), Mexico City, [NYC Civic Engagement Commission](https://www.participate.nyc.gov/), Milan, Lisbon, Zurich, several Dutch pilots.
- **Why it matters:** proves a municipal commons software project can become international infrastructure. AGPL, meta-governance via the [Decidim Association](https://meta.decidim.org/assemblies/the-association), residents-first framing.
- **Caveat:** participation-first (voting, proposals), not neighborhood-social-first. Uitwijken's differentiation is the day-to-day civic/social layer underneath; Decidim-style features could plug in on top.

### Consul Democracy — Madrid

- **What:** [CONSUL Democracy](https://www.consuldemocracy.org/) — open-source participation software ([consuldemocracy/consuldemocracy](https://github.com/consuldemocracy/consuldemocracy)).
- **Origin:** Madrid, 2015 — [Decide Madrid](https://decide.madrid.es/) ([use case](https://docs.consuldemocracy.org/use_cases/spain/madrid)).
- **Status:** still deployed in many cities; Decide Madrid itself waned with political turnover.
- **Lesson:** a platform tied to one administration's identity is vulnerable when politics shift. Uitwijken must be cross-party legible from day one.

### Polis / vTaiwan

- **What:** [Polis](https://compdemocracy.org/) — deliberation tool that surfaces consensus across factions rather than maximizing engagement. Open source: [compdemocracy/polis](https://github.com/compdemocracy/polis).
- **Origin:** Taiwan's [g0v](https://g0v.tw/intl/en/) civic-hacker community, 2014 — [vTaiwan](https://info.vtaiwan.tw/).
- **Use cases:** Uber regulation, alcohol sales, youth policy — each produced implementable consensus ([case studies](https://compdemocracy.org/case-studies/)).
- **Why it matters:** the only widely-adopted civic-tech primitive that actively *reduces* polarization. Candidate for buurt-level consultations with genuine disagreement.

## Commercial engagement platforms

These prove the market exists and municipalities are willing to pay — but the closed model has limits an open alternative can exceed.

### Commonplace — United Kingdom

- **What:** [Commonplace](https://www.commonplace.is/) — place-based engagement platform used by UK councils and developers.
- **Status:** commercial, closed source.

### Go Vocal (formerly CitizenLab) — Belgium → global

- **What:** [Go Vocal](https://www.govocal.com/) — Belgian-origin civic engagement SaaS, used across EU.
- **Status:** commercial.

## Iceland: deliberation at city scale

### Better Reykjavík

- **What:** [Better Reykjavík](https://betrireykjavik.is/) — long-running participation platform for Reykjavík residents, operated by the [Citizens Foundation](https://www.citizens.is/).
- **Tooling:** the foundation maintains open-source platforms — [Your Priorities](https://github.com/CitizensFoundation/your-priorities-app) and Active Citizen.
- **Why it matters:** one of the longest-running examples of city-scale deliberation with documented outcomes; foundation-owned, not municipally captured.

## Fediverse and governance infrastructure

### Metagov

- **[Metagov](https://metagov.org/)** — research collective studying online governance. [Govbase](https://github.com/metagov/govbase) catalogues tools and projects. Useful source for governance design literature.

### SocialHub

- **[SocialHub](https://socialhub.activitypub.rocks/)** — primary forum for ActivityPub implementation and fediverse governance discussion.
- **Why it matters:** the ActivityPub ecosystem has mature practices around defederation, consent, and cross-instance moderation. Join the conversations early rather than reinvent.

### Civic fediverse instances

- [social.coop](https://social.coop/), [eupolicy.social](https://eupolicy.social/), various municipal experiments. None yet at Uitwijken's proposed depth of municipal-data integration.

## Smaller-internets framing

Uitwijken sits inside a wider shift from "fix the whole internet" to **community-scoped digital infrastructure** — miniverses on structural, value, design, and community layers. Mozilla Foundation / co—matter call this the [post-naive internet era](https://www.mozillafoundation.org/en/nothing-personal/the-post-naive-internet-era/) (Oct 2025).

Adjacent post-naive projects worth naming alongside the civic-tech precedents above:

- **[Subvert](https://subvert.fm/)** — cooperatively owned music platform (post-Bandcamp acquisition). Structural-layer precedent for platform co-ops.
- **[Metalabel](https://metalabel.com/)** — collaboration and revenue splits over competition. Value-layer precedent.
- **[Trust](https://trust.support/)** (Berlin) — IRL hub plus decentralized-governance experiments. Community-layer precedent.

The point: islands that interconnect are more honest than another universal-platform play.

## Dutch precedents and adjacent projects

Worth studying before building — Dutch-specific language and design vocabulary already developed here.

- **[Buurkracht](https://www.buurkracht.nl/)** — buurt-level energy and sustainability initiatives.
- **[Buurtwerkplaatsen](https://buurtwerkplaatsen.nl/)** — Amsterdam buurt-tech network.
- **[PublicSpaces](https://publicspaces.net/)** — Dutch coalition for public-values digital infrastructure ([manifesto](https://english.publicspaces.net/publicspaces-manifesto/)).
- **[Waag Futurelab](https://waag.org/)** — Amsterdam-based public-research institute, frequent partner for civic-tech work.
- **[SIDN Fonds](https://www.sidnfonds.nl/)** and **[NLnet](https://nlnet.nl/)** — Dutch funders for open and societally relevant internet projects. See [[Funding]].

## What this changes in the pitch

1. **Lead with structure, not features.** Funders and gemeentes have seen many neighborhood apps. Few have seen one designed as Ostrom-style commons from day one. See [[Governance]].
2. **Interconnection is credibility.** Uitwijken is stronger positioned as one node in the post-naive / civic-tech ecosystem than as a clever local startup.
3. **Stop apologizing for small scope.** Post-naive builders accept the internet of today and carve islands. A pilot is the point, not a stepping stone to "the Dutch Facebook."

## Open questions for follow-up

- Decidim Association statutes and meta-governance model — worth a closer read before proposing an Uitwijken governance structure ([meta.decidim.org](https://meta.decidim.org/assemblies/the-association)).
- Which European municipalities are actively running Polis-based consultations beyond Taiwan?
- Federation paths: could Uitwijken federate with Decidim instances for cross-cutting consultations?
- Citizens Foundation (Reykjavík) — open-source stack reuse vs. fresh-build trade-off.

## Tags

#year/2026 #city/amsterdam
