# Proposal

## Why

Until the native apps are published and in good shape, the installable web app is the best way to use OpenTodo on phones and computers, but `/apps/` led with the store apps. And nothing on the site lists, in one place, every way to install OpenTodo and everything that connects to it, with where each one stands. The maintainer asked for both (2026-11-11).

## What Changes

- `/apps/` (every language) starts with the web app: what it is, the install step per platform, push reminders as documented, a link to `/install/`; then the store apps as before, and a link to `/ecosystem/`. The title becomes "Apps".
- A new English page `/ecosystem/`: servers and NAS app stores, the apps, plugins and integrations, each with one line, its status and a link to its docs page.
- The footer's Product group links `/ecosystem/`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `website-help`: the apps page leads with the web app; an ecosystem page.

## Impact

`AppsPage.astro`, `src/i18n/*.mjs`, new `src/pages/ecosystem.astro`, `SiteFooter.astro`, `site.css`, `scripts/check-content.mjs`. No new dependency.
