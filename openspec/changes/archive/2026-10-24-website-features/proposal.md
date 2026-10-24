# Proposal: website-features

## Why

The user named the app's breadth as a selling point: OpenTodo has more features and integrations than the apps it replaces, all free. Today that breadth is spread over a six-card home section, a five-tab tour and the developer page, and nowhere complete. The redesign gives it one page, linked from the header: every feature, grouped, one line each, each linked to its docs page. The home page will show the same list in compact form (`website-home-v2`).

## What Changes

- **New `/features/` page:**
  - six groups (Plan, Capture, Projects and teams, Sync and devices, Integrations, Privacy and admin) plus Imports;
  - each feature with a one-line description and a **Docs** link;
  - a jump list to the groups;
  - an aside with "No tiers" and the integrations in one line;
  - the end calls to action.
- **One data module, `src/lib/features.ts`:**
  - Each entry names its docs page and the first release that has it (`since`).
  - Entries newer than the pinned bundle are left out.
  - An entry the pinned release should have but whose docs page is missing fails the build.
  - The import apps come from the manifest's `importFormats`.
- **Header and footer:** Features now points to `/features/` (one line in `NAV`).

**Out of scope**
- The home page's "Everything included" section (`website-home-v2`).
- Removing the old feature tour.

**Pages affected:**
- New `/features/`.
- The header and footer link on every page.

**New build dependency:** none.
