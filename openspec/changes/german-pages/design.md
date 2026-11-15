# Design

## Context

Languages today (website-languages D1, D3): `src/i18n/index.mjs` holds `LANGS`, `OTHER_LANGS` and `TRANSLATED_PAGES = ['/', '/apps/']`. `alternatesFor(pathname)` returns every language for a translated page and null otherwise; `Base.astro` writes the alternates from it and `LangSwitch.astro` lists them, falling back to each language's home page. Translated pages are routes under `src/pages/[lang]/` that render a shared component (`HomeStory`, `AppsPage`) with strings from `src/i18n/<lang>.mjs`; `scripts/test/i18n.test.mjs` checks that every language's strings have the English shape. The sitemap integration pairs pages by locale prefix on its own. `scripts/checks/seo.mjs` checks that alternates are reciprocal and that every page is in the sitemap.

The pages in scope keep their English text in three places: inline in the page file (`self-host.astro`, `start.astro`, `install/index.astro`, `switch/index.astro`), in data modules (`lib/features.ts` with 91 features in six groups, `lib/install.ts` with six platforms, `lib/start.ts` with the deploy targets, `lib/hosting.ts` with the PikaPods note), and inside shared components (`InstallTabs`, `SyncPlayground`, `EndCta`, `RunChoice`, `catalog/Catalog`, `catalog/CatalogRows`). The switch guides are the `switch` content collection rendered by `switch/[slug].astro`.

## Goals / Non-Goals

**Goals:**
- German pages that share their component with the English page, so a layout change reaches both.
- One source of truth for which page exists in which language.
- The English pages render the same text as before.
- A German item for every English item, enforced by test.

**Non-Goals:**
- A general translation system for every collection or page.
- German strings inside the documentation or the bundle.

## Decisions

**D1. `TRANSLATED_PAGES` becomes a map from English path to languages.** `'/'` and `'/apps/'` map to `OTHER_LANGS`; the German path maps each of its pages to `['de']` (`/features/`, the six `/features/<group>/`, `/start/`, `/install/`, the six `/install/<platform>/`, `/self-host/`, `/switch/`, `/switch/todoist/`, `/switch/microsoft-todo/`, `/switch/things/`). The group and platform paths are derived from the data modules so a new group or platform is listed without editing the map. `alternatesFor` returns English plus the listed languages; `LangSwitch` keeps listing every language and links a missing one to its home page. A small helper `localHref(path, lang)` returns the German path when the target is in the map for German and the English path otherwise; the shared components use it for their internal links. Alternative considered: a second list for partial pages. Rejected: two lists to keep in step.

**D2. Shared components with a language.** The bodies of `/self-host/`, `/start/`, `/install/`, `/install/[platform]`, `/switch/`, `/switch/[slug]`, `/features/` and `/features/[group]` move into `src/components/pages/` (`SelfHostPage`, `StartPage`, `InstallIndex`, `InstallPlatform`, `SwitchIndex`, `SwitchPage`, `FeaturesIndex`, `FeaturesGroup`), and `InstallTabs`, `SyncPlayground`, `EndCta`, `RunChoice`, `Catalog`, `CatalogRows`, `CatalogSearch`, `AndroidNotice` and `IosNotice` take an optional `lang` whose default is English, so no English call site changes. Their strings live in `src/i18n/path/en.mjs` and `de.mjs`, not in `src/i18n/en.mjs`/`de.mjs`: the German dictionary there is the reference shape for every language, so German-only strings would oblige French, Italian and the others to carry them. `scripts/test/i18n.test.mjs` checks that `path/de.mjs` has the shape of `path/en.mjs`, that its links stay on the site, the docs or the project's GitHub, and that a German string links a page's German version when there is one. Scripts in the two islands read their strings from a `data-` attribute, so the bundle they ship is the same in both languages. Alternative considered: copy the pages into `src/pages/de/`. Rejected: copies drift, which the spec forbids.

**D3. German routes as explicit files, not under `[lang]`.** `src/pages/de/…` mirrors the English routes. A `[lang]` route would have to return only `de` from `getStaticPaths` anyway; an explicit `de/` folder says so at a glance. Astro resolves the static `de/` folder before the dynamic `[lang]` routes, and `[lang]` builds only `/` and `/apps/`, so they cannot collide.

**D4. German switch guides are second collection entries.** `src/content/switch/de/<id>.md` with `lang: de`; the schema gains `lang` (default `en`). Every reader of the collection (`/switch/`, `/switch/[slug]`, `/start/` and the Learn index in `src/lib/learn.ts`) filters `lang === 'en'`, so nothing English changes. The collection's loader reads subfolders, so a German entry's id is `de/<id>`; the German routes strip the prefix. The test compares `checkedOn`, `sources`, `importFormat` and the lengths of `keeps`, `drops` and `terms` with the English entry and names the guide and field that differ. The existing freshness rule in `schemas.mjs` applies to every entry of the collection, German included. Alternative considered: German fields inside the English file. Rejected: it doubles the schema and mixes two languages in one Markdown body.

**D5. The scope note.** Every German page uses `LangNote` (`common.langNote` in `de.mjs`), which already says the page is in German, the app speaks German, and the rest of the site and the documentation are in English.

**D6. German twins of the data modules, keyed by a stable id.** `features.ts` gains `FEATURES_DE: Record<docPath, { name, line }>` and `GROUPS_DE: Record<groupKey, string>`; `install.ts` gains `PLATFORMS_DE: Record<slug, { name, short, steps, after, reminders, share }>` with the English record's links reused; `start.ts` gains German `how` texts keyed by slug; `hosting.ts` gains `PIKAPODS_NOTE_DE`, a translation of the maintainer's disclosure. `featureGroups(lang)`, `platforms(lang)` and `deployTargets(lang)` merge the twin over the English record, keeping every link, `since` and filter the English one has, so the bundle still decides which features and targets appear. The test checks that every English key has a German twin and that list lengths match. Keys are the docs path for features and the slug for platforms and targets. The one docs path two features share, the languages entry with its two versions around the 简体中文 release, has its second German version as `LANGUAGES_BEFORE_ZH_DE`. Integration names that are words ("Email to task") get a German twin; product names stay. Alternative considered: a `de` field on each English record. Rejected: it makes the English data file twice as long to read and to review.

**D7. The header and footer follow the page's language for German.** `SiteHeader` and `SiteFooter` read the page's language from its path; on a German page their labels come from `chrome` in `src/i18n/path/de.mjs` (keyed by the English label) and their links go through `localHref`. This also gives the existing German home and apps pages a German header, which they lacked. Pages in the other languages keep the English header: translating it for them is out of scope.

**D8. `install.ts` stays a plain data file.** The language merge for platforms lives in `src/lib/platforms.ts`, so the tests can import `install.ts` and `install.de.ts` directly with Node's type stripping, which does not resolve extensionless imports.

**Build time and download size.** Twenty more static pages, about two seconds of build time. Nothing new is sent to English visitors: the components render the same markup. The German pages ship the same scripts as their English originals (the install tabs, the playground), nothing more.

## Risks / Trade-offs

- [The German text goes stale when the English page changes] → The shape and twin tests fail when an English string or item is added without a German one, and the switch test fails when a fact changes. A reworded English sentence with the same keys is not caught; a comment above the English strings in `en.mjs` and above each data module's English list, and the README's languages section, say to update the German twin in the same pull request.
- [No person reads the German before it ships] → The maintainer decided against a review. The text follows the German home page's existing wording and terms (`de.mjs`) and the app's own German terms, so the same words appear on the site and in the app. Readers who spot a mistake have the issue tracker.
- [A partial translation confuses the language switch] → A language without the page leads to that language's home page, the same rule visitors already meet on every English-only page.

## Migration Plan

Additive. Rollback is reverting the change: the English pages never depend on the German strings.
