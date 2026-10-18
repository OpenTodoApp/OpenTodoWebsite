# Tasks

## 1. Voice guide and lint

- [ ] 1.1 Add the "Confidence" section and an `avoid` block to `content/VOICE.md` (existing tone words plus "honest", "honestly", "honesty", "in plain words", "rest assured", "no catch"); verify the block parses with a test in `scripts/test/claim-lint.test.mjs`
- [ ] 1.2 Add the avoid-list rule and the `<!-- quote -->` / `data-quote` opt-out to `scripts/check-content.mjs`, with tests for a hit, a quote and a phrase added to the guide; verify `npm test`
- [ ] 1.3 Run `node scripts/check-content.mjs` and record every hit in the commit message; verify the list matches the review's findings (eight "honest", the "in plain words" headings)

## 2. Copy pass

- [ ] 2.1 Rewrite heroes and section intros of the home, compare and switch pages to the guide, keeping every docs link; verify the content check passes for these files and each hero promise is at most 25 words
- [ ] 2.2 Rewrite heroes and intros of `/self-host/`, `/cost/`, `/developers/`, `/capture/`; verify as in 2.1
- [ ] 2.3 Rewrite `/about/`, `/help/` and the blog index intro in the maintainer's first person where the guide asks for it; verify as in 2.1
- [ ] 2.4 Update every changed string's key in the language dictionaries; verify `i18n.test.mjs` passes and `/de/cost/` builds

## 3. Release list

- [ ] 3.1 Add summary-sentence extraction, section counts and pre-release detection in `src/lib/changelog-core.mjs` (plain JavaScript, so the node tests import it), with tests using the 0.4.0–0.7.0 intros as fixtures; verify `npm test`
- [ ] 3.2 Render `/whats-new/` as the summary list with an upgrade-notes mark and a "Pre-releases" list; verify 0.3.1-rc.1 appears only there and the page reads at 360 px without JavaScript (`tests/no-js.spec.ts`)
- [ ] 3.3 Render `/whats-new/<version>/` with every section as a grouped list; verify `/whats-new/0.7.0/` lists all sections and `npm run check:links` passes

## 4. 0.7.0 post

- [ ] 4.1 Draft `src/content/blog/opentodo-0-7-0/index.md` as `draft: true`, category `releases`, `release: 0.7.0`, 400–1,000 words, every claim linked to the pinned docs; verify `npm run build` passes the release-post and claim checks and the post is absent from the built blog until `draft` is removed

## 5. Integration

- [ ] 5.1 Run `npm run build`, `npm run check`, `npm test`, `npm run check:dist` and `npm run test:browser`; all pass, and the preview shows the rewritten pages and the release list
