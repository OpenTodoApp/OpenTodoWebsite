# Design

## Context

- **What this builds on.** `website-platform` provides Astro, the shared layout and navigation, the `compare` content collection (with a required `checkedOn` and `sourceDoc` links), the site bundle (docs, screenshots, tokens, icons, changelog, manifest with `importFormats`) and the website checks.
- **The home page today** is carried over unchanged by `website-platform`: a hero with the live demo, a counters strip, "Why OpenTodo" cards, the sync playground, a screenshot tour, install steps and a roadmap teaser. Its copy is aimed at self-hosters.
- **Research summary (October 2026):**
  - Things leads with craft and calm ("award-winning personal task manager … plan your day").
  - Todoist leads with clarity and scale ("Clarity, finally.", 50M+ users, free tier, AI, integrations, teams).
  - Linear leads with speed and craft for product teams ("The modern alternative to task management tools").
- **Specs:** `specs/marketing-website/spec.md`.

## Goals / Non-Goals

**Goals:**
- A visitor from "Todoist alternative" understands the offer, sees it working, and finds the safe path to switch within the first two screens.
- Every comparison stays true over time, enforced by the build rather than memory.

**Non-Goals:**
- Templates, guides, toolkit (`website-content-hub`).
- A hosted sign-up. The calls to action are Try the demo, Self-host and Import.

## Decisions

### D1. Message hierarchy of the home page
1. **Hero:** headline about the outcome. The working line is "Clarity without the subscription", to be refined in review. The promise sentence covers the household angle ("One server, your whole household, every device, even offline").
2. **Calls to action:** Try the demo (primary), Self-host in minutes, Switch from… (import strip).
3. **Live demo:** kept, the strongest element of any of the four sites.
4. **Five differentiators** as cards with sprite icons: one server for the whole household, real offline, optional end-to-end encryption, your AI with your key, leave any time.
5. **Screenshot tour:** framed screenshots from the bundle, light and dark.
6. **Household section:** "Host it once, everyone gets a polished app", with the comparison of a subscription per person versus one server.
7. **"How it works" teaser:** links to `/self-host`. The sync playground moves there.
8. **Footer CTA.**

The counters strip and architecture vocabulary leave the home page (spec: no architecture terms above the fold).

### D2. Comparison pages as content entries
Each `src/content/compare/<app>.md` entry has front matter:
- `competitor`, `checkedOn`
- `audience` (one line)
- `rows[]` with `{ feature, them: yes|partial|no, us: yes|partial|no, note?, sourceDoc? }`
- `gaps[]`: what they do that we don't, shown as its own section and never hidden
- `importFormat`: the manifest key, for example `todoist-csv`
- `switchGuide`: a bundle docs path

The body holds a short prose framing. A shared `CompareTable` component renders rows accessibly (header cells, captions, no colour-only meaning).

The stale check fails when `checkedOn` is older than 180 days at build time. Cost is described in words ("a subscription per person", "a one-time purchase per Apple platform", "per-seat team pricing"), never with prices that go stale.

Linear's page is framed for "small teams who want speed, not process". Its gaps (cycles, GitHub integration, triage automation, agent coding sessions) are listed plainly.

### D3. Switch calls to action from the manifest
`importFormats` from the bundle manifest decides per app:
- If the app's `importFormat` is present, show "Switch from <app>" linking to its switch guide.
- Otherwise show "Import your tasks" linking to `/docs/import/`.

The import strip on the home page uses the same logic for all four apps, so no page can promise an importer the pinned release lacks.

### D4. Audience pages
- **`/self-host`:** footprint and privacy facts (from manifest `facts`), the sync playground island, Docker, Coolify and one-click installs (Umbrel, CasaOS and Unraid once those exist), backups and data ownership, and links to the self-hosting docs.
- **`/developers`:** REST API with the curl example, the `ot` CLI, MCP for assistants, webhooks, CalDAV, and the open specs, with links into the bundle docs and the app repository's `openspec/specs`.

### D5. Visual pass
- Before building pages, run a design pass (the `impeccable` skill or a designer) on the hero, cards, comparison table and screenshot frames, using the bundle tokens and typeface.
- Screenshot frames are a component: a device or browser frame drawn in CSS from tokens, with a light/dark `<picture>` per screenshot.
- Icons come only from the sprite.

### D6. Visual direction (design pass, task 1.1)

Recorded for the maintainer's review in the PR:

- **Type:** Inter throughout (the app's typeface), self-hosted. Headings 700 with tight tracking (-0.02 to -0.035 em); the hero headline scales from 2.3 rem at 360 px to 4.25 rem. Body 17 px, line height 1.65. Code in the system monospace stack, so no second font file.
- **Colour:** only the bundle's `--ot-*` tokens, through a small set of site aliases (`--bg`, `--surface`, `--accent`, `--accent-text`, `--muted`). The accent is the app's emerald; light and dark follow the system preference.
- **Spacing:** a 16 px side gutter on phones (24 px from 640 px), sections of 3.5 to 6.5 rem, a 74 rem content width, 14 px card radius.
- **Cards:** surface colour, 1 px border, a soft shadow, a 44 px icon tile in the accent's soft colour with a sprite icon.
- **Comparison table:** caption with the checked-on date, verdicts as an icon plus a word ("Yes", "Partly", "No"), a docs link under every OpenTodo claim; on phones each row becomes a small card, so the table never scrolls sideways.
- **Screenshot frame:** a browser frame (three dots and the server address) or a phone frame drawn in CSS from the tokens, around a `<picture>` with AVIF and WebP at five widths and a dark source where the bundle has one.

## Risks / Trade-offs

- [Comparisons read as attacks or go stale] → Gaps are mandatory in the schema, dates are enforced, and claims are linked to docs. Tone rules live in the voice guide (`website-content-hub`), and until then in review.
- [Trademark concerns] → Competitor names in text only for identification, no logos or look-alike visuals, and factual statements (spec).
- [Copy quality] → Drafts are written by agents, and the maintainer reviews each page in the PR preview.
- [Build time and page weight] → Static pages with one island on the home (demo) and one on `/self-host` (playground). Responsive images keep phones well under today's weight.

## Migration Plan

Pages ship in one PR per group: home, comparisons, audience pages. The old home stays until the new one merges. Rollback is a revert of the PR.

## Open Questions

- ~~Final headline wording.~~ Settled after the maintainer's first review: the working line "Clarity without the subscription" read as a slogan and never said what the product is. The headline is now "A to-do app that runs on your own server", and the home page opens with a plain list of what the app does (Today and Upcoming, projects, reminders, labels, shared lists, phone and laptop) before the reasons to switch. The rule for all copy: say what it is and what you do with it, in the words a Todoist or Things user would use, before saying why it is better.
