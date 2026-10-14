# Tasks

## 1. Scaffold and bundle

- [ ] 1.1 Add Astro with static output (exact versions pinned), `src/` structure, `.gitignore` for `.bundle/` and `dist/`, and `npm run dev` / `npm run build` scripts. Verify `npm run build` produces `dist/index.html`.
- [ ] 1.2 Write `scripts/interim-bundle.mjs`, plus `interim/tokens.css` and `interim/icons.svg` extracted once from the app repository, producing a bundle-shaped `.bundle/` with an interim manifest (D2). Verify the script output matches the bundle layout v1 folder names.
- [ ] 1.3 Write `scripts/fetch-bundle.mjs` (`bundle.json` with version or preview, `SHA256SUMS` verification, `BUNDLE_DIR` override, preview flag, production refusal of preview bundles). Verify with a fake release fixture served locally: success, checksum mismatch, missing asset with the URL named, and preview refusal.

## 2. Layout and content model

- [ ] 2.1 Build `Base.astro` (header, Features / Compare / Self-host / Developers / Docs navigation as a no-JS disclosure on phones, footer with licences, source and specs, skip link, light and dark from `tokens.css`) and `<Icon>` over the sprite. Verify a page renders with the navigation working at 360 px with JavaScript disabled.
- [ ] 2.2 Self-host the fonts and remove the Google Fonts links. Verify the built HTML has no request to `fonts.googleapis.com` or `fonts.gstatic.com`.
- [ ] 2.3 Add the `compare` content collection schema (D4) with the `sourceDoc` resolution check. Verify the build fails with a test entry missing `checkedOn`, and with one whose `sourceDoc` doesn't exist in the bundle's docs.

## 3. Carry over the current site

- [ ] 3.1 Move the home page into `src/pages/index.astro` with its sections as components, and split `main.js` into islands (hero demo, sync playground, install tabs, feature tour). Verify side-by-side screenshots of old and new at 390 px and 1280 px in light and dark show the same content, and each island works.
- [ ] 3.2 Replace emoji icons on the carried-over page with sprite icons, and include analytics as a module. Verify the emoji scan (task 4.1) passes and Umami page views still fire on the self-hosted origin.
- [ ] 3.3 Serve the bundle's `docs/` under `/docs/` unchanged. Verify docs pages, search and images work on the built site.

## 4. Checks and deploy

- [ ] 4.1 Add the website checks (D6) in GitHub Actions: build and `astro check`, link check, Playwright with axe in light and dark at 360 and 1280 px plus horizontal scroll, the no-JS pass, the emoji-icon scan and the third-party-script scan. Verify each check fails on a deliberately broken sample and passes on the site.
- [ ] 4.2 Make the `Dockerfile` multi-stage (D7) and update `nginx.conf` cache rules for `/_astro/`. Verify `docker build` from a fresh clone, run it, and see the home page, a docs page and the health check respond.
- [ ] 4.3 Remove the old `index.html`, `styles.css`, `main.js` and committed `docs/`, and update `README.md` and `AGENTS.md` (commands, bundle pinning, preview builds). Verify `openspec validate --all --strict` and all checks pass, then switch Coolify to this repository with base directory `/` and confirm the live site.
