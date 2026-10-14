# Tasks

## 1. Content model

- [ ] 1.1 Add the `templates`, `guides`, `toolkit` and `essays` collections with schemas (`lastReviewed`, `summary`, `sources[]`, the template tree) and the stale check (one year). Verify the build fails on a test entry without `lastReviewed`, and one dated 13 months back is reported stale.
- [ ] 1.2 Add the claim-and-source lint (D3) with the `<!-- no-claim -->` escape. Verify it flags a sample paragraph with a feature claim and no docs link, and accepts one with a link that resolves in the bundle.

## 2. Templates

- [ ] 2.1 Write the generator from the template tree to `opentodo-export` v1 JSON with deterministic ids and relative dates (D1). Verify unit tests for ids, nesting, recurrence and dates, and that the output validates against the export format documented in the app's `docs/import.md`.
- [ ] 2.2 Add the CI job (D2): the pinned app image as a service, owner setup, preview and import of every template failing on error rows, and Playwright screenshots in light and dark committed through a bot PR when changed. Verify it fails on a deliberately broken template, and produces screenshots for a valid one.
- [ ] 2.3 Build `/templates` and `/templates/<slug>` (screenshot frame, description, import steps, download, calls to action), and write the launch templates (weekly review, GTD setup, moving house, trip, product launch, household chores, and four more from the backlog). Verify each page works at 360 px without JavaScript and every template imports in CI.

## 3. Guides, toolkit, essays

- [ ] 3.1 Write `content/VOICE.md` and `content/BACKLOG.md`. Verify the maintainer approves both in a PR.
- [ ] 3.2 Build `/guides`, `/toolkit` and `/essays` pages, and write the launch set: about five guides, each linking its template and docs; the household and small-team toolkit; two essays. Verify the claim lint and link check pass, and the maintainer approves each piece in review.

## 4. What's new and feed

- [ ] 4.1 Generate `/whats-new/<version>` from the bundle's `changelog.json` and `/feed.xml` over content and releases (D4). Verify the feed validates as RSS 2.0 and lists only releases in the pinned bundle.
- [ ] 4.2 Add Templates and Guides to the navigation once content exists, and calls to action at the end of every content page. Verify navigation at 360 px without JavaScript and the website checks pass.

## 5. Workflow

- [ ] 5.1 Set up PR previews (D6) and document the review flow in `AGENTS.md`. Verify a test PR shows a working preview link.
- [ ] 5.2 Create the scheduled drafting routine (D5) that opens one draft PR every two weeks from the backlog. Verify a first run opens a draft PR with a preview and passing checks, and doesn't merge.
