# Building blocks

The June 1 conversation kept returning to one question: *what are the actual things a person does on Uitwijken.nl?* Not the thesis, not the data — the small, closed set of objects people create and touch. This page names that set.

> "messages, events, two or three more things and that's kind of it… figuring out what those individual building blocks are will be a very big aspect of the tool."

The discipline is to keep the set **small**. Like the metro or the trams, the platform has to be obvious and robust to how people actually use it. Every screen — map, themes, inbox — is a *lens* onto these same blocks. Governance is the *foundation* under them. The blocks themselves are only four.

## The four blocks

| Block | What it is | Range |
|---|---|---|
| **Event** | A gathering with a time and place | From a D&D night to a buurtmaaltijd to a block party to Koningsdag |
| **Conversation** | A public thread attached to another object | A few replies under an event, a question on a plan |
| **Ask / offer** | A request or an offer of practical help, or an invitation to do something together | Groceries for a neighbor, DIY help, "who's up for D&D?" |
| **Survey** | A structured question tied to a place, theme, and consequence | A €300k neighborhood-budget prioritization |

Each block answers two questions at a glance: **who** posted it (resident, government, entrepreneur — the role) and **what kind** of object it is (the block). Roles and blocks are orthogonal; the UI shows both on every item so the vocabulary stays legible.

## How they combine

The blocks are not silos. They compose, and that composition is most of the product:

- An **ask** ("who wants to do a vibe-coding night?") grows into an **event** once a time and place exist.
- An **event** carries a **conversation** — the thread where coordination happens ("can someone give two neighbors a lift?").
- A **survey** result points to an **event** or an **ask** as the next action.
- A **conversation** can hang off *any* of the others, or off a plain place on the map.

This is the Web 2.0 / Flickr–Twitter–Mastodon playbook applied to civic life: machine tags, thread-orientation, and a handful of primitives that interlock. We are not reinventing it; we are pointing it at a neighborhood.

## What a block always has

To stay findable and moderatable, every block is geotagged to a **location scale** (house → street → buurt → city) and carries one or more **themes** (see [[Concepts]]). That is what lets the same object surface on the map, in a theme, and in the [[Adoption|civic inbox]] without being three different things.

## Principles that shape the blocks

These come straight from the conversation and are not negotiable details (see [[Governance]]):

- **Strictly public.** No private messages, no closed groups. What is discussed here is public by nature. This is a moderation strategy as much as a values choice.
- **Verified, but pseudonymous.** Signing in proves you are a real resident; you choose the name you appear under.
- **Voting follows residence.** Proving you live somewhere is what grants a vote on that place's surveys.

## Open questions

- **How much structure per block?** Too many fields kill spontaneity; too few make a mess. An ask needs *type, place, theme, time* — and probably not much more.
- **How deep can a conversation nest?** One level of replies stays readable; infinite nesting does not.
- **Are four enough?** The bar for a fifth block is high. A new primitive has to be something none of these four can express.

## Tags

#year/2026 #city/amsterdam
