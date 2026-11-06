# Proposal

## Why

The owner wants the website to be more technical, with one entry point for people who want to know how OpenTodo works and whether to trust it (addition to PLAN-1.0 Track C), without cluttering the marketing home page. `/developers/` covered only the API side, with cards and a wall of specification links.

## What Changes

- New `/under-the-hood/`: one code sample, then five groups of link rows: how it works, build on it, what it promises (stability, performance budgets, roadmap, changelog), security, releases and source (verifying images, downloads and the Android app, the repository, the open specifications).
- `/developers/` is removed and redirects to it; the footer's Learn group links "Under the hood"; About's specification link goes to the specifications on GitHub.

Pages affected: new `/under-the-hood/`, `/developers/` (redirect), the footer, `/about/`. Out of scope: the home page. No new build dependency.

## Capabilities

### Modified Capabilities

- `marketing-website`: the audience pages requirement describes the technical entry point.
- `website-platform`: a moved-page scenario for `/developers/`.

## Impact

New `src/pages/under-the-hood.astro`; removed `src/pages/developers.astro`; `nginx.conf`, `SiteFooter.astro`, `about.astro`, `scripts/check-content.mjs`, `scripts/test/tech-pages.test.mjs`, `site.css`.
