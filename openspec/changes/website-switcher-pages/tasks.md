# Tasks

## 1. Visual direction

- [ ] 1.1 Run a design pass on the hero, differentiator cards, comparison table and screenshot frame using the bundle tokens and typeface (the `impeccable` skill or a designer), and record the decisions (spacing, type scale, frame style, display face) in `design.md`. Verify the maintainer approves the mock-ups in the PR.
- [ ] 1.2 Build the `ScreenshotFrame` (light and dark `<picture>`, responsive images from the bundle) and `CompareTable` components with stories or sample pages. Verify the accessibility check passes on both in light and dark, and the table has header cells and a caption.

## 2. Home page

- [ ] 2.1 Rewrite `src/pages/index.astro` to the D1 hierarchy (hero, calls to action, live demo, five differentiators, screenshot tour, household section, how-it-works teaser, footer CTA), removing architecture terms above the fold. Verify at 390 px that the first screenful shows headline, promise and calls to action with no architecture terms, and that the website checks pass.
- [ ] 2.2 Add the import strip driven by the manifest's `importFormats` (D3). Verify with two bundles: a format present shows "Switch from <app>", and one absent links to the import guide.

## 3. Comparison pages

- [ ] 3.1 Write `src/content/compare/todoist.md`, `things.md` and `linear.md` (rows with `sourceDoc`, mandatory `gaps`, `checkedOn`, cost in words, framing) and render `/vs/<app>` with the switch call to action from D3. Verify the build passes, the Things page shows its gaps (Apple Watch, widgets), and every `sourceDoc` resolves.
- [ ] 3.2 Add the stale check (180 days). Verify the build fails with a test entry dated 200 days back.

## 4. Audience pages

- [ ] 4.1 Build `/self-host` (facts from the manifest, the sync playground island, Docker, Coolify and one-click installs, backups, docs links) and move the sync playground off the home page. Verify the island works and the page reads fully without JavaScript apart from the playground.
- [ ] 4.2 Build `/developers` (API with curl, CLI, MCP, webhooks, CalDAV, open specs). Verify all docs links resolve in the link check.

## 5. Integration

- [ ] 5.1 Review all pages at 360, 390 and 1280 px in light and dark in the PR preview, fix findings, and get the maintainer's approval. Verify all website checks pass and `openspec validate --all --strict` passes.
