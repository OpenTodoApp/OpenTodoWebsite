# Design

## Context

Languages today (website-languages D1, D3): `src/i18n/index.mjs` holds `LANGS`, `OTHER_LANGS` and `TRANSLATED_PAGES = ['/', '/apps/']`. `alternatesFor(pathname)` returns every language for a translated page and null otherwise; `Base.astro` writes the alternates from it and `LangSwitch.astro` lists them, falling back to each language's home page. Translated pages are routes under `src/pages/[lang]/` that render a shared component (`HomeStory`, `AppsPage`) with strings from `src/i18n/<lang>.mjs`; `scripts/test/i18n.test.mjs` checks that every language's strings have the English shape. The sitemap integration pairs pages by locale prefix on its own. `scripts/checks/seo.mjs` checks that alternates are reciprocal and that every page is in the sitemap.

`/self-host/` is one page file with its strings inline; it uses three components with English strings inside: `InstallTabs` (tab labels, guide links, the copy button's fallback text), `SyncPlayground` (task names, buttons, captions) and `EndCta` (per-kind title and label). `/switch/[slug]` renders an entry of the `switch` collection (`src/content/switch/*.md`) through a template with its own English strings.

## Goals / Non-Goals

**Goals:**
- Two German pages that share their component with the English page, so a layout change reaches both.
- One source of truth for which page exists in which language.
- The English pages render the same text as before.

**Non-Goals:**
- A translation system for collections in general: only the Todoist guide gets a German entry.
- German strings inside the documentation or the bundle.

## Decisions

**D1. `TRANSLATED_PAGES` becomes a map from English path to languages.** `{ '/': OTHER_LANGS, '/apps/': OTHER_LANGS, '/self-host/': ['de'], '/switch/todoist/': ['de'] }`. `alternatesFor` returns English plus the listed languages; `LangSwitch` keeps listing every language and links a missing one to its home page, which it already does for English-only pages. Alternative considered: a second list for partial pages. Rejected: two lists to keep in step, and every caller would have to merge them.

**D2. Shared components with a strings prop.** The body of `/self-host/` moves into `SelfHostPage.astro` taking `lang` and `s` (as `AppsPage` does). `InstallTabs`, `SyncPlayground` and `EndCta` take an optional strings object whose default is today's English text, so no English call site changes. The German strings live in `de.mjs` under `selfHost`, `installTabs`, `syncPlayground`, `endCta` and `switchPage`; `en.mjs` holds the English ones, and the shape test covers them for German only (the other languages do not have these pages). Alternative considered: copy the page to `src/pages/de/self-host.astro`. Rejected: the copies drift, which the spec forbids.

**D3. German routes as explicit files, not under `[lang]`.** `src/pages/de/self-host.astro` and `src/pages/de/switch/[slug].astro`. A `[lang]` route would have to return only `de` from `getStaticPaths` anyway; an explicit `de/` folder says so at a glance. Astro resolves the static `de/` folder before the dynamic `[lang]` routes, and `[lang]` builds only `/` and `/apps/`, so they cannot collide.

**D4. The German switch guide is a second collection entry.** `src/content/switch/de/todoist.md` with `lang: de`; the schema gains `lang` (default `en`). Every reader of the collection (`/switch/`, `/switch/[slug]`, `/start/` and the Learn index in `src/lib/learn.ts`) filters `lang === 'en'`, so nothing English changes. The collection's loader reads subfolders, so the German entry's id is `de/todoist`; the German route strips the prefix for its path. The German route builds the entries with `lang === 'de'` and finds its English twin by id. The test in `i18n.test.mjs` compares `checkedOn`, `sources`, `importFormat` and the lengths of `keeps`, `drops` and `terms` with the English entry and names the field that differs. The existing freshness rule in `schemas.mjs` already applies to every entry of the collection, German included. Alternative considered: German fields inside the English file (`keepsDe`, …). Rejected: it doubles the schema and mixes two languages in one Markdown body.

**D5. The scope note.** Both German pages use `LangNote` (`common.langNote` in `de.mjs`), which already says that the page is in German, that the app speaks German, and that the rest of the site and the documentation are in English.

**Build time and download size.** Two more static pages, under a second of build time. Nothing new is sent to English visitors: the components render the same markup. The German pages ship the same scripts as their English originals (the install tabs and the playground), nothing more.

## Risks / Trade-offs

- [The German text goes stale when the English page changes] → The shape test fails when an English string is added without a German one, and the switch test fails when a fact changes. A reworded English sentence with the same keys is not caught; a comment above the English strings in `en.mjs` and the languages section of the README say to update `de.mjs` in the same pull request.
- [Machine-quality German] → The strings are drafted by an agent and read by a German speaker before merging; the pull request says so and lists the strings.
- [A partial translation confuses the language switch] → A language without the page leads to that language's home page, the same rule visitors already meet on every English-only page.

## Migration Plan

Additive. Rollback is reverting the change: the English pages never depend on the German strings.
