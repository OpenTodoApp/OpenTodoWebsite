# Proposal

## Why

The site now tells a first-time visitor what OpenTodo is, how to get it and what it costs. What it does not do is show them how to do things. Todoist wins switchers with a help centre between the marketing pages and the reference: task-based articles ("set a reminder", "share a project"), per-platform install pages, switch guides with a term map, and an FAQ. OpenTodo's docs are complete but flat: 40 pages for users, operators and developers at once, reached from one "Docs" link. A visitor with a question ("will reminders reach my iPhone?", "how do I get my Todoist tasks over?", "I have never run a server") has no page that answers it in their words. Separately, the cost page's headline says "you pay for the server" before it says "free", which reads as a price.

## What Changes

- **Cost page headline** leads with free: "OpenTodo is free. All of it, for everyone, for good.", and the lede says what that means before it mentions a server.
- **A help landing (`/help/`)** with three audiences (I use the app, I run the server, I build on it) and "I want to…" entry points, each linking a how-to, a guide or the docs page that answers it, plus the docs search.
- **A how-to collection (`/how-to/`)**: short, numbered, sourced pages for one task each, in six groups (Get started, Every day, Phone and notifications, Together, Fix it, Run the server). The "Fix it" group makes the common troubleshooting answers findable as pages of their own (reminders not arriving on an iPhone, changes not showing on another device, forgot the owner password, an invite link that does not work, the app looks out of date).
- **Install pages (`/install/` and one per platform)**: iPhone and iPad, Android, Windows, Mac, Linux, ChromeOS, each with the steps from the install docs, how to get reminders there, how to share into it, and what to do when the install option is missing.
- **Switch pages (`/switch/` and one per app)** for Todoist, Things, TickTick and Linear: what to export, how it imports with the importers of the pinned release (CSV and the JSON shapes), what comes across and what does not, a term map, and a first-week checklist. A glossary on the index maps the words of those apps to OpenTodo's. Facts about the other apps carry a "checked on" date, like comparisons.
- **An FAQ (`/faq/`)** with the ten questions visitors ask before they decide, each answered in words and linked to the docs.
- **Three toolkit pieces** for the person who will run the server but has never run one: "Your first server", "Running OpenTodo on a Raspberry Pi" (backlog item 5) and "Keeping your server healthy".
- **Navigation**: Help joins the header; the Learn menu, the footer, the help landing, the comparison pages and the 404 page link the new sections.

## Out of scope

- Short videos or animated clips per feature: visuals come from the app's site bundle, so a recording pipeline is an app-repository change first.
- One-step "Switch from X" buttons: they still follow the importers of the pinned release (marketing-website spec). The switch pages describe the path that exists today and link the named importer's guide when a bundle ships it.
- A hosted sign-up, pricing in currency, localisation.
- Changes to the app or its docs.

Pages affected: every page (header, footer), `/cost/`, the comparison pages, the 404 page, and the new sections above. No new build dependency.

## Capabilities

### New Capabilities

- `website-help`: the help landing, how-to collection, install pages, switch pages, FAQ, and the rules that keep them true (sources, dates, bundle facts).

### Modified Capabilities

- `marketing-website`: the cost page's headline leads with free; the header gains Help.

## Impact

- **Website:** new collections `howto` and `switch` (`src/content/`, schemas in `src/content/schemas.mjs`), new pages under `src/pages/` (`help`, `faq`, `how-to/`, `install/`, `switch/`), `src/lib/install.ts` (platform steps), `SiteHeader`, `SiteFooter`, `404`, `vs/[slug]`, `cost`, `scripts/check-content.mjs` (new collections and routes), unit tests for the new schemas, browser tests for the new menu entries.
- **Content backlog:** row 5 (Raspberry Pi toolkit) ships here and is removed.
- **Visitors:** about 45 more static pages; no new script or image. The header CSS does not change.
- **Dependencies:** none.
