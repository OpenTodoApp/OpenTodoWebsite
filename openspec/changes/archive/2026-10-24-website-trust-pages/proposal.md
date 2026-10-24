# Proposal

## Why

Three things the app already does or promises have no page of their own. The browser extension and the share sheet exist in the release and are documented, but a visitor who wants to "save this page later" has no landing page that says so (Todoist markets its extensions on their own pages). The site enforces WCAG 2.2 AA on every change but never says so publicly, which costs trust with the people who care most. And the demo, the site's main call to action, has no page explaining what it is, how it resets, or where to look when it does not answer.

## What Changes

- **`/capture/`**: the three ways to save a page as a task (share sheet, browser extension, bookmarklet), what the capture screen proposes, how to install the unpacked extension, the share sheet by platform, and the privacy facts, all restated from the capture docs of the pinned release.
- **`/accessibility/`**: an accessibility statement: the commitment (WCAG 2.2 AA, light and dark, 360 px, no JavaScript), how it is checked on every change (the repository's own browser audit), what the statement does not cover (the docs served from the bundle, the app itself, what only a person notices), known limitations, and how to report a problem. Dated.
- **`/status/`**: the demo's facts (sandbox lifetime, nightly reset, what is switched off, isolation), a link to its health endpoint as the live check, and what to do when it does not answer. Static; no script polls anything.
- **Links:** footer (Browser extension and share sheet; Demo status; Accessibility), the help page, the install pages' sharing section and the home page's how-it-works list.

## Out of scope

- A hosted status service or uptime history: that would need a service of ours, which the site does not have.
- Publishing the extension in the browser stores: an app-repository release task.
- Changes to the app or the docs.

Pages affected: three new pages, the footer, the help page, the install pages, the home page. No new build dependency.

## Capabilities

### Modified Capabilities

- `marketing-website`: adds the capture landing page, the accessibility statement and the demo status page.

## Impact

- **Website:** `src/pages/capture.astro`, `accessibility.astro`, `status.astro`, `SiteFooter.astro`, `help.astro`, `install/[platform].astro`, `index.astro`, `scripts/check-content.mjs` (new routes).
- **Visitors:** three static pages of 5 to 8 KB; no script.
- **Dependencies:** none.
