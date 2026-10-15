# Design

## Context

- **Builds on** `website-help-and-howtos` (help landing, install pages), `website-first-visit` (about page as the trust hub), and the pinned docs: `/docs/capture/` (share sheet, bookmarklet, extension, limits), `/docs/self-hosting/demo/` (sandboxes, nightly reset, what is off), `/docs/self-hosting/docker/#health` (the health endpoint).
- **Constraint:** released facts only, so the pages restate the docs and link each statement; no uptime numbers, no invented support promises.
- **Specs:** `specs/marketing-website/spec.md`.

## Decisions

### D1. One capture page, three entry points
`/capture/` leads with what the capture screen does (the same for all three ways), then one card per way, the extension's install steps and privacy facts, and the share sheet by platform in a definition list. The extension is linked to the app's releases page, since it is not in the stores; the page says so plainly rather than promising a store listing.

### D2. The accessibility statement describes the actual checks
The statement names the target (WCAG 2.2 AA), the conditions (light and dark, 360 and 1280 px, with and without JavaScript) and the mechanism (the axe-core audit in the repository's browser tests, run on every change), links the test suite, and lists what it does not cover: the docs come from the bundle and are outside this site's audit, the app is a separate project, and automated checks miss what only a person notices. It carries a review date and a reporting channel (the repositories' issue trackers). Plain prose, no badge.

### D3. The status page is static and points at the health endpoint
A status page that polled the demo would need a script and a cross-origin request on every visit. Instead the page explains the demo's behaviour from the docs (sandbox lifetime, 03:00 UTC reset, what is switched off, isolation) and offers the demo's `/healthz` endpoint as the live check, with a note that it names the version the demo runs, which may differ from the version this site describes. The "if it does not answer" list separates an expired sandbox from an outage.

## Effect on build and download
- Three static pages; no script; no image beyond the site's icons.

## Risks / Trade-offs
- The health endpoint returns JSON, not a page; a visitor sees a line of text. Accepted: it is the truthful live check, and the page explains what the line means.
- The statement's review date is a promise to keep. It is tied to layout changes and the yearly content review in the repository's rules.
