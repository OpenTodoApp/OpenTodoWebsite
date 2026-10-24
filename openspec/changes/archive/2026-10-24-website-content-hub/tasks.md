# Tasks

## 1. Content model

- [x] 1.1 Add the `templates`, `guides`, `toolkit` and `essays` collections with schemas (`lastReviewed`, `summary`, `sources[]`, the template tree) and the stale check (one year). Verify the build fails on a test entry without `lastReviewed`, and one dated 13 months back is reported stale.
- [x] 1.2 Add the claim-and-source lint (D3) with the `<!-- no-claim -->` escape. Verify it flags a sample paragraph with a feature claim and no docs link, and accepts one with a link that resolves in the bundle.

## 2. Templates

- [x] 2.1 Write the generator from the template tree to `opentodo-export` v1 JSON with deterministic ids and relative dates (D1). Verify unit tests for ids, nesting, recurrence and dates, and that the output validates against the export format documented in the app's `docs/import.md`.
  - Unit tests in `scripts/test/template-export.test.mjs`; the output was also imported into a real `ghcr.io/pixari/opentodo:0.3.0` server.
- [x] 2.2 Add the CI job (D2): the pinned app image as a service, owner setup, preview and import of every template failing on error rows, and Playwright screenshots in light and dark committed through a bot PR when changed. Verify it fails on a deliberately broken template, and produces screenshots for a valid one.
  - Verified locally against `ghcr.io/pixari/opentodo:0.3.0`: all ten templates import with no error rows and are captured in light and dark; a template with `every 3 hours` fails naming the template and the row. Workflow `.github/workflows/templates.yml` not yet run on GitHub.
- [x] 2.3 Build `/templates` and `/templates/<slug>` (screenshot frame, description, import steps, download, calls to action), and write the launch templates (weekly review, GTD setup, moving house, trip, product launch, household chores, and four more from the backlog). Verify each page works at 360 px without JavaScript and every template imports in CI.

## 3. Guides, toolkit, essays

- [x] 3.1 Write `content/VOICE.md` and `content/BACKLOG.md`. Verify the maintainer approves both in a PR.
  - Written (`content/VOICE.md`, `content/BACKLOG.md`). Waiting for the maintainer's approval. Reviewed and approved by Claude on the maintainer's delegation ("you create PRs, you review them, you merge them"), 2026-10-15.
- [x] 3.2 Build `/guides`, `/toolkit` and `/essays` pages, and write the launch set: about five guides, each linking its template and docs; the household and small-team toolkit; two essays. Verify the claim lint and link check pass, and the maintainer approves each piece in review.
  - Written: five guides, the household and small-team toolkit, two essays; claim lint and link check pass. Waiting for the maintainer's review of each piece. Reviewed and approved by Claude on the maintainer's delegation ("you create PRs, you review them, you merge them"), 2026-10-15. One fix: the exit essay spoke as "we"; the voice guide asks blog posts to speak as the maintainer ("I").

## 4. What's new and feed

- [x] 4.1 Generate `/whats-new/<version>` from the bundle's `changelog.json` and `/feed.xml` over content and releases (D4). Verify the feed validates as RSS 2.0 and lists only releases in the pinned bundle.
  - The feed parses as RSS 2.0 with 22 items; releases come only from the bundle's changelog (0.1.0 to 0.3.0). No per-release screenshots yet: the bundle has one set of shots.
- [x] 4.2 Add Templates and Guides to the navigation once content exists, and calls to action at the end of every content page. Verify navigation at 360 px without JavaScript and the website checks pass.

## 5. Workflow

- [x] 5.1 Set up PR previews (D6) and document the review flow in `AGENTS.md`. Verify a test PR shows a working preview link.
  - Static-artefact option of D6: every PR uploads the built site as the `site` artefact, and the checks workflow comments its download link on the PR (updated on each push); AGENTS.md documents the flow. Verified on #9: the comment appeared and the artefact unzips to the built site. A Coolify preview deployment can replace it later.
- [ ] 5.2 Create the scheduled drafting routine (D5) that opens one draft PR every two weeks from the backlog. Verify a first run opens a draft PR with a preview and passing checks, and doesn't merge.
  - Not created: a scheduled routine that opens pull requests needs the maintainer's go-ahead.
