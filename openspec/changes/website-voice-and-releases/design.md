# Design

## Context

See proposal.md. `scripts/check-content.mjs` already parses content and page copy to enforce sourced claims; `content/VOICE.md` has a "Words we use" table and a tone list of words to avoid. `/whats-new/` renders each changelog entry's `intro` in full; the bundle's `changelog.json` carries `version`, `date`, `intro` and `sections` (a map of section name to entries) per release.

## Goals / Non-Goals

**Goals:** a voice guide specific enough to check, a check that reads it, release notes that scan, and one pass over existing copy.

**Non-Goals:** a style linter beyond the avoid list (readability scores, sentence length), rewriting docs, rewriting translated copy by hand beyond keeping keys in step.

## Decisions

1. **The avoid list is parsed from `VOICE.md`.** A fenced block (`avoid` info string) in the guide holds one word or phrase per line; the check reads it, so the guide stays the single source. Matching is case-insensitive on word boundaries over Markdown content and the text of `.astro` pages (the same extraction the claim lint uses). *Alternative:* a list in the script; rejected because it would drift from the guide.
2. **Quotation opt-out.** A paragraph preceded by `<!-- quote -->` (Markdown) or an element with `data-quote` (pages) is skipped, mirroring the existing `<!-- no-claim -->` marker.
3. **Release summary from the intro's first sentence.** Split on the first sentence end that is not inside a code span or after an abbreviation; if the intro is empty, show only the counts. The intro is written by the app's maintainer per release, so nothing is invented. Section counts use the changelog section names as they are, pluralised in a fixed map ("Security" → "security fixes", "Fixed" → "fixes", "Changed" → "changes", "Added" → "additions"); an unknown section name shows as "n entries in <name>".
4. **Pre-releases by suffix.** A version matching `-` after the patch number (semver pre-release) is a pre-release. "Unreleased" is never shown, as today.
5. **The copy pass is one pull request per page group** (home and product pages; self-host, cost and developers; about, help and blog index), so the maintainer can review each on the preview. Translations: changed English strings get their keys updated in every dictionary with the English text marked for translation, which `website-languages` already allows.
6. **0.7.0 post as a draft.** Written from the 0.7.0 changelog and release notes with every claim linked to the pinned docs; `draft: true` so the maintainer publishes it.

## Risks / Trade-offs

- [The avoid list catches a legitimate use, such as "honest" in a quoted review title] → the quote marker; the check names the line so the fix is obvious.
- [First-sentence extraction can cut a sentence that contains "e.g."] → a small abbreviation list and a unit test with the real 0.4.0–0.7.0 intros as fixtures.
- [Copy edits can drop a docs link the claim lint relies on] → the claim lint runs in the same build and fails on an unsourced claim.

## Effect on build and downloads

Build time: the lint adds a pass over text already loaded by the claim lint, well under a second. Downloads: `/whats-new/` shrinks from about 12 kB of HTML text to a few kB; no new JavaScript.
