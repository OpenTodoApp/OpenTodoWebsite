# Working on the OpenTodo website (guide for AI coding agents and humans)

## What this is
The public website of [OpenTodo](https://github.com/pixari/opentodo), live at https://open-todo.app (demo: https://demo.open-todo.app): home page, comparisons, self-hosting and developer pages, templates, guides, toolkit, essays and what's new. The app, its docs sources (`docs/*.md`) and its specs live in the app repository; this repository only builds and serves the site.

## Non-negotiables
1. **Specs before behaviour.** Changes start as an OpenSpec change (`openspec/changes/<name>/`): `/opsx:propose`, `/opsx:apply`, `/opsx:archive`. Validate with `openspec validate --all --strict`. Constraints are in `openspec/config.yaml`.
2. **Released facts only.** Version, docs, screenshots, tokens, icons, changelog and import formats come from the app's site bundle pinned in `bundle.json` (`src/lib/bundle.ts` reads it). Never copy them in by hand, never describe unreleased features as available.
3. **Honest comparisons.** Show competitor strengths (`gaps` is mandatory), date every comparison (`checkedOn`, at most 180 days old), text only (no logos), link every OpenTodo claim to its docs page (`sourceDoc`). The build enforces all of it.
4. **No emoji as icons** (use `<Icon name>` from the bundle's sprite), **no third-party scripts** (except the self-hosted analytics), pages readable without JavaScript, WCAG 2.2 AA in light and dark from 360 px.
5. **Nothing is published without the maintainer's review.** Content arrives as a pull request with a preview; nothing auto-merges.

## Layout
- `src/layouts/Base.astro`: header, navigation (a `<details>` menu below 768 px), footer, preview banner, analytics.
- `src/components/`: `Icon`, `ScreenshotFrame`, `CompareTable`, `EndCta`, and the islands `HeroDemo`, `FeatureTour`, `SyncPlayground`, `InstallTabs` (each ships its script only to pages that use it, and reads without JavaScript).
- `src/content/`: collections (`compare`, `templates`, `guides`, `toolkit`, `essays`); schemas and freshness rules in `src/content/schemas.mjs`.
- `scripts/`: `fetch-bundle.mjs`, `interim-bundle.mjs`, `check-content.mjs` (claim lint), `templates-check.mjs`, `checks/` (links, emoji, scripts), `serve.mjs`.
- `interim/`: the stand-in bundle until the app publishes real ones; delete it when `bundle.json` pins a release.

## Commands
- `npm ci`, then `npm run dev` (http://localhost:4321) or `npm run build`.
- Checks: `npm run check`, `npm test`, `npm run check:dist`, `npm run test:browser` (after a build).
- Templates: start the pinned app image (`docker run -p 8080:8080 ghcr.io/pixari/opentodo:<version>` on a fresh volume), then `OPENTODO_URL=http://127.0.0.1:8080 npm run templates:check` to import every template and refresh its screenshots.
- Container: `docker build -t opentodo-website . && docker run -p 8080:80 opentodo-website`.

## Content workflow
1. Pick the top item of `content/BACKLOG.md`.
2. Draft it following `content/VOICE.md`: every product claim links to a docs page of the pinned release; a paragraph that only looks like a claim gets `<!-- no-claim -->` on the line above. Set `lastReviewed` to today.
3. A new template also needs its screenshots: run `npm run templates:check` against the pinned release.
4. Run the checks, open a **draft** pull request, and link the preview. The maintainer reviews on the rendered page and merges; agents never merge.

## Previews and bundle pins
- A pull request's preview is the `site` artefact of the checks workflow (download, unzip, `npx serve` or `npm run serve`), or a Coolify preview deployment when enabled.
- To build against an unreleased app: `{ "preview": "<app run id>" }` in `bundle.json` (needs `GITHUB_TOKEN`) or `BUNDLE_DIR=/path npm run build`. Every page then shows a preview banner, and the Docker build refuses it.
