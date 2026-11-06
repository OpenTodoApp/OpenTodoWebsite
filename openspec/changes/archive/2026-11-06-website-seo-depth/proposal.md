# Proposal

## Why

The owner asked for a deep SEO improvement, measured first (addition to PLAN-1.0 Track C). The audit of the live build (`roadmap/website-restyle/plan.md`, "SEO audit") found a sound base (titles, canonicals, hreflang with x-default, sitemap with alternates, robots.txt, social cards, alt text on every image) and these gaps: duplicate titles on the quiz; 66 meta descriptions over 170 characters; a skipped heading level on every switch guide and the server plan; no Organization, no free offer and no BreadcrumbList in the structured data; the docs' `og:image` (`/assets/og.png`) no longer built since the brand moved to the bundle; no "alternative to X" wording where people search for it, and no page for Microsoft To Do although its importer ships; and no check that keeps any of it true.

## What Changes

- Descriptions are cut at 160 characters (last sentence or word); quiz titles name their question or answer.
- JSON-LD: Organization and a free Offer on the home page; BreadcrumbList on posts, switch guides, how-tos, guides and toolkit pieces.
- Headings: the switch guides' and server plan's h3 under h1 become h2 at the same size.
- Switch guides: titled "Open-source <app> alternative", described as free, open source and self-hosted, heading unchanged. A new guide for Microsoft To Do, from the pinned docs.
- Home title and description name what it is (an open-source task manager you host yourself, offline-first, CalDAV); the self-host page is titled "Self-hosted task manager".
- `/assets/og.png` is written from the home card after the build.
- Search-engine ownership tags render from `SITE.verification` when set (empty now; the owner's steps are in QUESTIONS.md).
- A new `npm run check:seo` (part of `check:dist`, so CI): title, description, canonical and a built social card on every page, unique titles, reciprocal hreflang with x-default, and every indexable page in the sitemap.

Pages affected: every page's head, the switch guides, the quiz, `/self-host/`, `/self-host/plan/`, the home page's metadata, new `/switch/microsoft-todo/`. Out of scope: the docs pages' own metadata and BreadcrumbList (app repository, with the docs landing change), visual changes. No new dependency.

## Capabilities

### Modified Capabilities

- `website-platform`: website checks, structured data, and a new search metadata requirement.
- `website-help`: switch pages' titles, descriptions, breadcrumbs, and Microsoft To Do.

## Impact

`src/layouts/Base.astro`, `src/lib/site.ts`, `src/pages/index.astro`, `src/i18n/en.mjs`, `src/pages/switch/[slug].astro`, `src/pages/blog/[slug].astro`, `src/pages/how-to/[slug].astro`, `src/components/ArticlePage.astro`, `src/pages/guides/quiz/[...answers].astro`, `src/pages/self-host.astro`, `src/components/ServerPlanner.astro`, new `src/content/switch/microsoft-todo.md`, `scripts/og.mjs`, new `scripts/checks/seo.mjs`, `package.json`, `scripts/test/checks.test.mjs`, `site.css`.
