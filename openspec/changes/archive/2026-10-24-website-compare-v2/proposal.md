# Proposal: website-compare-v2

## Why

"Should I switch?" is answered on three pages today: the comparisons, `/cost/` and `/faq/`. Each has its own place in the navigation (the header used to carry "What it costs"), and the cost page and FAQ also exist in five translations. The redesign (accepted with the round-2 mock-ups) folds the decision into one Compare page, and keeps only the home page translated.

## What Changes

- **`/vs/` becomes the one decision page:**
  - the dated comparisons, each saying where the other app is ahead (from the comparison's `gaps`);
  - **What it costs** (`#cost`): the licence, the footprint from the bundle manifest, where it can live, the work involved, and the per-person comparison, in words without currency;
  - **Questions** (`#faq`): the FAQ, with its FAQPage structured data.
- **Pages removed, each with a 301 in `nginx.conf`:**
  - `/cost/` → `/vs/#cost` and `/faq/` → `/vs/#faq`;
  - `/de|es|fr|it|pt/cost/` → `/vs/#cost` and `/de|es|fr|it|pt/faq/` → `/vs/#faq`.
- **Translations:** only the home page is translated. The cost and FAQ strings leave the five dictionaries, and the translated homes link the English `#cost`.
- **No summary table.** The three comparisons share no feature row by name, and a table across them would mean inventing cells, so the cards name each competitor's lead instead.
- **Links:** the home page, the toolkit's first-server piece and the content check now point at `/vs/#cost`.

**Out of scope**
- The comparison pages themselves (`/vs/<app>/`).
- The home page redesign.

**Pages affected:** `/vs/`, the removed `/cost/`, `/faq/` and their translations, and the translated home pages.

**New build dependency:** none.
