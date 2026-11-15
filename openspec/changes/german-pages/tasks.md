# Tasks

## 1. Pages in some languages

- [ ] 1.1 `TRANSLATED_PAGES` becomes a map from English path to languages, with the group and platform paths derived from the data modules (D1); `alternatesFor` returns English plus the listed languages; `LangSwitch` links a missing language to its home page; add `localHref`. Extend `scripts/test/i18n.test.mjs`: `/self-host/` and `/de/self-host/` have alternates for `en` and `de` only, `/fr/self-host/` is not translated, `/` keeps all seven, `localHref('/install/', 'de')` is `/de/install/` and `localHref('/about/', 'de')` is `/about/`. Verify `npm test` passes.

## 2. Shared components

- [ ] 2.1 Give `InstallTabs`, `SyncPlayground`, `EndCta`, `RunChoice`, `Catalog` and `CatalogRows` an optional strings prop with today's English text as default, English strings in `en.mjs` with a comment asking to update `de.mjs` (D2). Verify the built English pages' visible text is unchanged (text diff of `dist/` before and after for `/`, `/features/`, `/start/`, `/install/`, `/self-host/`, `/switch/`).
- [ ] 2.2 German twins of the data modules (D6): `FEATURES_DE`, `GROUPS_DE`, `PLATFORMS_DE`, German deploy-target texts, `PIKAPODS_NOTE_DE`; `featureGroups(lang)`, `platforms(lang)`, `deployTargets(lang)`. Test: every English key has a German twin, list lengths match, naming the item that is missing. Verify `npm test` passes and fails when one German feature is removed by hand.

## 3. German pages

- [ ] 3.1 `/de/self-host/` from `SelfHostPage`. Verify it is built with `lang="de"`, the language note and the footprint figures of the pinned release.
- [ ] 3.2 `/de/features/` and `/de/features/<group>/` from the catalogue components. Verify every group and feature appears in German and links the same docs page as in English.
- [ ] 3.3 `/de/start/` from `StartPage`. Verify its links to install, self-host and the three translated switch guides lead to the German pages and the others to English.
- [ ] 3.4 `/de/install/` and `/de/install/<platform>/` from `InstallIndex` and `InstallPlatform`. Verify all six platforms are built in German with their steps.
- [ ] 3.5 Switch collection `lang` field (default `en`), readers filter `lang === 'en'` (D4); `SwitchIndex` and `SwitchPage`; German entries for Todoist, Microsoft To Do and Things; `/de/switch/` and `/de/switch/<id>/`. Test: same `checkedOn`, `sources`, `importFormat` and lengths of `keeps`, `drops`, `terms` as the English entry, naming the guide and field. Verify `npm test` passes and fails when a German `checkedOn` is changed by hand.

## 4. Check and document

- [ ] 4.1 Run `npm run check`, `npm test`, `npm run build`, `npm run check:dist` and `npm run test:browser`. Verify all pass.
- [ ] 4.2 View the German pages at 360 and 1280 px, light and dark, with and without JavaScript; check the language switch on `/de/self-host/` leads to `/self-host/` for English and `/fr/` for French. Verify by screenshots attached to the pull request.
- [ ] 4.3 README languages section: which pages exist in German only, how to add one, and that a German twin is updated with its English item. Verify the section is in the pull request diff.
