# Tasks

## 1. Schema and collection

- [ ] 1.1 Add `useCaseSchema` and `USE_CASE_MAX_AGE_DAYS = 180` to `src/content/schemas.mjs` (D1: `problem`, `shot`, `shotAlt`, 3 to 5 `steps` with `docPath` links, ids lists, `tags`, `lastReviewed`, `draft` with a required `waitsFor`, `docExists` skipped on a draft's steps), and register `useCases` in `src/content.config.ts` over `src/content/use-cases/`. Verify with new cases in `scripts/test/schemas.test.mjs`: a valid entry passes; two steps fail with the count message; a 190-day date fails naming the 180-day limit; a step linking a page outside the bundle fails on a published entry and passes on a draft; a draft without `waitsFor` fails; `npm test` passes.
- [ ] 1.2 Add `'use-cases'` to `COLLECTIONS` and `/use-cases/` to the routes in `scripts/check-content.mjs`, skipping files whose front matter has `draft: true`. Verify `node scripts/check-content.mjs` reports the use-cases count, and a scratch entry with an unsourced "syncs between devices" paragraph fails naming the file and line (then delete it).

## 2. Pages

- [ ] 2.1 Build `src/pages/use-cases/[slug].astro` (D2): breadcrumb, title, `problem` lede, demo as the only primary button with "How it works" as the secondary anchor, body prose, eager `ScreenshotFrame` checked against `manifest.shots`, `ol.steps` with each step's docs link, `TemplateGrid`, "Read more" cards for guides, how-tos and toolkit resolved with `getEntries` (throw naming the use case and the id), the documentation list derived from the steps, the last-reviewed line, `EndCta`, and `Article` plus `BreadcrumbList` JSON-LD. Verify a scratch entry with an unknown `shot` and one with an unknown guide id each fail the build naming the entry; an entry without templates renders no "Start from a template" section; `npm run check` passes.
- [ ] 2.2 Build `src/pages/use-cases/index.astro` with `ArticleIndex` (icon `lightbulb`), listing published use cases by `order`. Verify the built `dist/use-cases/index.html` lists six cards in order and no draft.

## 3. Navigation and internal links

- [ ] 3.1 Add "Use cases" to the header's product group and the phone menu (shown while a use case is published) and to the footer's Product list (D4); add 'Use cases' to `MENU` in `tests/no-js.spec.ts` when `dist/use-cases/index.html` exists. Verify `npm run test:browser` passes `widths.spec.ts` (no header link wraps between 768 and 1440 px; otherwise apply the D4 fallback) and `no-js.spec.ts` finds the link in the phone menu on every page.
- [ ] 3.2 Add `useCase?: string` to `TourFeature`, map the five features (D5), render the figure link and the visually-hidden list link in `FeatureTour.astro`, and throw at build when a feature names a missing or draft slug. Link the Raspberry Pi page from the Raspberry Pi mention in `src/pages/self-host.astro` and from the "Run it on your own server" card on the home page. Verify the "Time blocking" figure on `/` links `/use-cases/timeboxing-your-day/`, a scratch mapping to `no-such-page` fails the build naming the feature (then revert), and `islands.spec.ts` still passes.

## 4. Cards, tests and checks

- [ ] 4.1 Map `use-cases` to "Use cases" in `sectionOf` of `scripts/lib/og.mjs` and assert it in `scripts/test/og.test.mjs`. Verify `npm test` passes and, after a build, `dist/og/use-cases/weekly-review.png` exists.
- [ ] 4.2 Verify after `npm run build` that `dist/sitemap-0.xml` (or the sitemap index) lists `/use-cases/` and the six pages, and `npm run check:dist` (links with fragments, emoji, scripts) passes.

## 5. The six use cases

- [ ] 5.1 Write `weekly-review.md` (shot `dashboard`; templates weekly-review, gtd-setup; guides weekly-review, getting-things-done; steps on `/docs/process-the-inbox/`, `/docs/labels-and-filters/`, `/docs/views/#build-a-dashboard`, `/docs/review-and-statistics/`, `/docs/recurrence/`) and `timeboxing-your-day.md` (shot `week`; templates study-plan, product-launch; guides time-blocking, pomodoro; how-to plan-your-day; steps on `/docs/time-blocking/` sections, `/docs/other-calendars/`, `/docs/quick-add/`) following `content/VOICE.md`, `lastReviewed` today. Verify `node scripts/check-content.mjs` and the build pass.
- [ ] 5.2 Write `shared-household-list.md` (shot `share`; templates household-chores, meal-planning, home-maintenance; toolkit household; how-tos share-a-project, invite-someone-with-a-link; steps on `/docs/sharing/` sections, `/docs/notifications/`, `/docs/display-mode/#set-up-a-shared-screen`) and `deep-work-and-focus.md` (shot `today`; template study-plan; guides pomodoro, eat-the-frog, time-blocking; steps on `/docs/time-blocking/#see-whether-the-day-fits`, `/docs/views/#narrow-a-list-by-duration`, `/docs/display-mode/`, `/docs/notifications/#reminders-inside-the-app`, `/docs/keyboard/`), claiming no focus list or daily check. Verify the content check and the build pass and no step links a page outside `.bundle/docs/`.
- [ ] 5.3 Write `planning-with-your-own-ai.md` (shot `assistant`; no templates; steps on `/docs/ai-and-agents/`, `/docs/assistant/#use-your-own-provider-and-key`, `/docs/assistant/#ask-and-review`, `/docs/assistant/#undo`, `/docs/mcp/`; body links `/docs/ai-limits/`) and `raspberry-pi.md` (shot `settings-backups`; toolkit raspberry-pi, your-first-server; steps on `/docs/self-hosting/docker/#resource-usage`, `#plain-docker-run`, `#behind-a-reverse-proxy`, `/docs/backups/#destinations`, `/docs/install-app/`). Verify the content check and the build pass, and the page without templates shows no template section.
- [ ] 5.4 Review each rendered page at 360 and 1280 px in light and dark: the demo button is the first button, every step links its docs page, the screenshot shows the dark capture where the bundle has one. Verify `npm run test:browser` passes (`a11y.spec.ts`, `widths.spec.ts`, `no-js.spec.ts`) for the seven new pages.

## 6. Integration

- [ ] 6.1 Run `npm test`, `npm run build`, `npm run check`, `npm run check:dist`, `npm run test:browser` and `npx --yes @fission-ai/openspec@1.14.3 validate website-use-cases --strict`; open a draft pull request linking the preview, noting in its description which `content/BACKLOG.md` rows (7, and 2 in substance) the pages absorb for the maintainer to remove. Verify all commands pass and the pull request shows the preview comment.

## Workflow follow-up

- The maintainer reviews the rendered pages and merges; agents never merge.
- Archive the change after the merge and confirm `openspec validate --all --strict` passes.
