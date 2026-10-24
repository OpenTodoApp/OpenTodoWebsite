# Proposal: website-home-v2

## Why

The home page had nine sections, about 2,400 words, 90 links and two scripted islands, and still showed the app before Precision. The user called it overwhelming and asked for the breadth of OpenTodo to show without overwhelming again. Round 2 of the redesign (accepted) tells one story in five parts.

## What Changes

- **Hero:**
  - The headline is the briefing sentence ("Three things matter today. Two tasks are late, Monday is full and Mia replied."), the 0.11 feature it shows.
  - Then one bold line saying what OpenTodo is, Try the demo and Get started, and "No account, nothing to install".
  - Below it, the real Today screen from the pinned bundle (dark when the visitor prefers dark).
- **01 Your day:** three rows (Today says what matters, quick add, projects as list, board or timeline), each linked to its docs page, and two crops of the bundle's quick-add and board screenshots.
- **02 Everything included (new):**
  - six quiet columns from the feature list of the pinned release (`src/lib/features.ts`), seven items each and "and n more";
  - "No tiers · Every feature, for everyone" with a link to `/features/`;
  - the integrations and import apps in one line each.
  - On phones the groups are closed `<details>` with their counts.
- **03 Yours, for good:** five rows (free, your server, offline, encryption, **AI on your terms**), each linked. The AI row leads to the new guide.
- **04 Three ways in:** demo, join a server, run your own, saying OpenTodo is not offered as a hosted service, plus the switch line.
- **Then:** the community invitation, and an end band with the calls to action and the three latest posts.
- **Removed:**
  - the hero demo island, the five-tab feature tour, the import strip and the AI, why, household and sync sections;
  - their components (`HeroDemo`, `FeatureTour`, `ImportStrip`, `lib/tour.ts`) and their browser tests.
  - The home page loads no script now.
- **Phones:** rows keep their titles, the feature groups are folded, the shot is cropped to the briefing, and the posts are left to the blog link. The page is about 4,700 px tall, down from 18,750.

**Out of scope:**
- The translated home pages: they keep their text, gain the new look from `site.css`, and need new strings before they can follow this layout.
- The other pages.

**Pages affected:** `/`.

**New build dependency:** none.
