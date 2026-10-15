# Proposal

## Why

A first-time visitor who uses Todoist today reads the home page and still cannot answer four questions: how do I get this (there is no "Start for free"), what does it cost me, who makes it and can I trust it, and where are the guides. The three hero buttons (demo, install, import) describe actions, not paths; nothing says that OpenTodo is not a hosted service; the server cost is never put in words; and the people, licence and security behind the project are only reachable through the footer's GitHub links. Templates, Guides, Toolkit, Blog and What's new sit in a flat eight-link navigation with Toolkit and What's new in the footer only. Todoist answers all four within the first screen and a Resources menu. This change closes that gap with words and structure only; no new facts about the app.

## What Changes

- **Home page: a "How do I get it?" block** directly below the hero, with the three real paths side by side: try the demo (nothing to install, a private sandbox), join a server someone you know runs (open the link you were sent, install the app from the browser), run it yourself (one container, about twenty minutes, link to `/self-host/`). It states plainly that OpenTodo is not offered as a hosted service.
- **A "What it costs" page (`/cost/`)**: the software is free and open source; the server in words (a small VPS, a Raspberry Pi, a machine already at home; the footprint figures from the bundle manifest); who does what work (one person installs and updates, everyone else just uses the app); how updates work; the comparison with a plan per person in words. No currency, per the voice guide.
- **An "About and trust" page (`/about/`)**: who makes it (from `authors.json`), since when and how often it is released (from the bundle's changelog), the licence in plain words (from the manifest), the security policy, the open specifications, what the demo keeps, what this website collects, how to leave. Every statement about the app links to its documentation page.
- **Grouped navigation**: the desktop header shows Features, Compare, What it costs, Learn (a menu with Guides, Templates, Toolkit, Blog and What's new), Self-host, Developers and Docs. The phone menu shows the same links in two groups, Product and Learn. The menus are `<details>` elements, so they open without JavaScript. The footer gains About and What it costs.
- **Hero demo counters** use a neutral element instead of `<em>`, so text-only renderings and screen readers no longer read the counts as emphasised text.

Pages affected: the home page (new section), every page (header and footer), two new pages `/about/` and `/cost/`. No new build dependency.

## Out of scope

- A screen recording in the hero. Visuals must come from the app's site bundle (released facts only), so a captioned recording is an app-repository change to the screenshot pipeline first; the site adds it when the bundle ships one.
- A hosted sign-up, pricing in currency, testimonials or user counts (voice guide).
- Help centre, per-platform install pages, switch pages, FAQ, sitemap and structured data: separate changes.
- Any change to the app or its docs.

Advances no ROADMAP.md capability directly. It supports adoption, like `website-switcher-pages`.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `marketing-website`: adds the get-it block on the home page, the cost page, the about page and the grouped navigation. The navigation requirements of `website-platform` (Features, Compare, Self-host, Developers, Docs on every page), `website-content` (Templates and Guides once published) and `website-blog` (Blog once a post is published) stay satisfied: every one of those links remains in the header and in the phone menu.

## Impact

- **Website:** `src/pages/index.astro` (new section), `src/pages/about.astro` and `src/pages/cost.astro` (new), `src/components/SiteHeader.astro`, `SiteFooter.astro`, `HeroDemo.astro`, `src/styles/site.css`, `scripts/check-content.mjs` (the two new pages become linkable from content), the browser tests (menu groups).
- **Visitors:** two more pages; the header's CSS grows by under 1 KB; no new script.
- **Dependencies:** none.
