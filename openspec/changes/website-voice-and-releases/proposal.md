# Proposal

## Why

The writing is careful and sourced, but read across pages it sounds defensive: "honest" appears eight times, "in words" thirteen, and every page reassures that there is nothing to install, nothing to pay and nothing hidden. Confidence comes from showing, not from saying. Hero paragraphs run to 70 words. The narrator changes between pages ("Written by the people who build it" on the blog, "I" in posts, "we" on the about page) although the voice guide says the maintainer writes in the first person. The release list on `/whats-new/` prints each release as one dense paragraph (0.7.0 is 1,067 characters before its 112 changelog entries), puts a release candidate among the releases, and the blog has no post for 0.7.0 although the site is pinned to it.

## What Changes

- **Voice guide:** `content/VOICE.md` gains a "Confidence" section: show, do not reassure; one reassurance per page at most; never call the site or a comparison "honest" (the gaps sections show it); hero promises of at most 25 words; one narrator (the maintainer as "I" on the blog and the about page, the neutral product voice elsewhere). "honest", "honestly", "in plain words", "rest assured", "no catch" join the words to avoid.
- **Voice lint:** the content check fails on the words to avoid in published pages and content, naming the file and line, with an inline opt-out for quotations.
- **Copy pass:** every page's hero and section intros are rewritten to the guide (the claims and their docs links stay); the blog index intro speaks as the maintainer.
- **Release list:** each release on `/whats-new/` shows its date, one summary sentence (the changelog intro's first sentence) and the size of each changelog section ("30 security fixes · 59 fixes · 11 changes · 2 additions"), with upgrade notes called out when present; the full grouped notes stay on `/whats-new/<version>/`. Pre-releases (versions with a pre-release suffix) move to a "Pre-releases" list at the end.
- **0.7.0 release post:** a `releases` post for 0.7.0 drafted as `draft: true` for the maintainer to review, following the existing release-post requirement.

Out of scope: layout and section structure (`website-section-system`, `website-navigation-and-home`), the about page's structure and the maintainer note (`website-maintainer-and-proof`), translated pages beyond keeping their dictionaries in step with changed English strings, and the docs text (app repository).

Pages affected: hero and intro copy of every marketing page, `/blog/`, `/whats-new/` and `/whats-new/<version>/`, plus the new post at `/blog/opentodo-0-7-0/` once published.

## Capabilities

### New Capabilities
<!-- none -->

### Modified Capabilities
- `website-content`: "What's new and feed" defines the release list's summary per release and the separate pre-release list; "Reviewed, sourced and fresh content" adds the voice lint.

`website-content` comes from implemented, unarchived changes; archive them first. Can be applied in parallel with `website-section-system`; the copy pass is easiest after `website-navigation-and-home` has fixed the home page's sections.

## Impact

- `content/VOICE.md`, `scripts/check-content.mjs` and `scripts/test/claim-lint.test.mjs`.
- `src/pages/whats-new/index.astro`, and `src/lib/changelog-core.mjs` (first sentence, section counts, pre-release detection).
- Copy in `src/pages/*.astro`, `src/pages/blog/index.astro`, and the language dictionaries.
- New post folder `src/content/blog/opentodo-0-7-0/`.
- No new build dependency.
