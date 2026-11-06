# Proposal

## Why

OpenTodo's 1.0 is "trust first" (PLAN-1.0 Tracks A.6 and C). The site had no place that says how to report a vulnerability, what protects the data and how to verify what you run; the threat model and the "how we verify" notes are being written in the app repository (`docs/security/`, in review). The owner asked for a short, honest placeholder page that will link them once they are merged.

## What Changes

- New `/security/`: four groups of link rows (report, what protects your data, check what you run, being written for 1.0) and a note naming the work in review.
- The footer's "Security" link (was SECURITY.md on GitHub) and About's security section point to it.
- A shared `LinkRows.astro` component (a titled group of hairline link rows), reused by the technical entry point that follows.

Pages affected: new `/security/`, the footer, `/about/`. Out of scope: the threat model and verification texts themselves (app repository). No new build dependency.

## Capabilities

### Modified Capabilities

- `marketing-website`: a new requirement for the Security and trust page.

## Impact

New `src/pages/security.astro`, `src/components/LinkRows.astro`, `scripts/test/tech-pages.test.mjs`; `SiteFooter.astro`, `about.astro`, `site.css`.
