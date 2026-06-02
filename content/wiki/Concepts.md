# Concepts

These are the primitives the proof-of-concept must make visible.

> The objects a person actually *creates* — event, conversation, ask/offer, survey — are the closed set described in [[Building-blocks]]. This page covers the surrounding model (geography, themes, roles, inbox) that those blocks live inside.

## Cascading Geography

Uitwijken.nl is built around a dynamic location model, not a flat group model. A user should be able to move naturally between:

- My house or building
- My street
- My buurt
- My district
- My city
- My province or country

Each level carries its own discussions, plans, events, decisions, services, and initiatives. The same theme can exist at different scales. Healthcare in a street may mean checking on older neighbors; healthcare in a buurt may mean access to a clinic; healthcare in a city may mean policy, budgets, and public consultation.

## Theme Layer

Every item on Uitwijken.nl should belong to one or more themes. Themes can be chosen by the person posting, inferred from content, clustered by AI, and connected through a broader/narrower subject hierarchy.

Example hierarchy:

- Health
- Health > elderly care
- Health > youth mental health
- Health > local clinics
- Health > loneliness

The theme layer is what makes Uitwijken.nl more than a map and more than a feed. It lets the user ask: what is happening around this subject, at this location scale, involving which roles?

## Map-First Interface

The map is not decoration. It is the primary way to understand scope. Items are geotagged, clustered, filtered, and shown according to the selected scale and theme.

Amsterdam is a strong first implementation because public data can provide streets, postal codes, buurt polygons, permits, public-space reports, events, facilities, and planning layers.

## Three-Role Participation

Uitwijken.nl should distinguish the source and role of participation:

- Resident signal: needs, feedback, lived experience, requests, initiatives.
- Government signal: plans, budgets, safety, permits, questionnaires, public information.
- Entrepreneur signal: services, venues, facilities, local offers, sponsorship, practical support.

The product should avoid flattening everything into "posts." A government consultation, a local event, a resident request, and a business service are different civic objects.

## Questionnaires And Decisions

Questionnaires are a first-class feature. They can be used to:

- Ask what residents consider important.
- Prioritize themes and locations.
- Gather feedback on government plans.
- Allocate or advise on neighborhood budgets.
- Surface needs from below.
- Test whether official priorities match lived reality.

A questionnaire should always be tied to a location scale and a theme, so the result is actionable.

## Events As Adoption Hook

Events give people an immediate reason to visit before they are ready to participate deeply. The platform should aggregate and contextualize:

- Municipal events
- Buurt events
- Cultural programming
- Volunteer opportunities
- Entrepreneur-hosted activities
- Resident initiatives

Events are also the bridge from digital information to physical gathering.

## Civic Inbox

Residents should not have to monitor scattered websites, newsletters, WhatsApp groups, commercial event platforms, and government pages. Uitwijken.nl should become a contextual civic inbox based on selected locations and themes.

Examples:

- A new permit affects my street.
- A budget questionnaire is open for my buurt.
- A city plan concerns a theme I follow.
- An event near me matches my interests.
- A business or facility nearby can help with a local need.

## Formal And Informal Communities

Some communities are formal: tied to official decisions, public budgets, government plans, or recognized local governance. These need accountable moderation boards rooted in physical community.

Other communities are informal: resident initiatives, interest groups, and open-source-style self-organized spaces. These can use lighter participant-led governance.

Uitwijken.nl needs both, and the interface should make the difference legible.

## Tags

#year/2026 #city/amsterdam
