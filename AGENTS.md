# Working on the OpenTodo website (guide for AI coding agents and humans)

## What this is
The public website of [OpenTodo](https://github.com/pixari/opentodo): home page, comparisons, switch paths, self-hosting and developer pages, and later templates and guides. The app, its docs sources (`docs/*.md`) and its specs live in the app repository; this repository only builds and serves the site.

## Non-negotiables
1. **Specs before behaviour.** Changes start as an OpenSpec change (`openspec/changes/<name>/`): `/opsx:propose`, `/opsx:apply`, `/opsx:archive`. Validate with `openspec validate --all --strict`. Constraints are in `openspec/config.yaml`.
2. **Released facts only.** Version, docs, screenshots, tokens, icons, changelog and import formats come from the app's site bundle (`opentodo-site-bundle-<version>.tar.gz` on the app's GitHub releases). Never copy them in by hand, never describe unreleased features as available.
3. **Honest comparisons.** Show competitor strengths, date every comparison, text only (no logos), link every OpenTodo claim to its docs page.
4. **No emoji as icons, no third-party scripts** (except the self-hosted analytics), pages readable without JavaScript, WCAG 2.2 AA in light and dark.
5. **Nothing is published without the maintainer's review.**

## Current state
Until the change `website-platform` is applied, the site is the hand-written static page moved from the app repository (`index.html`, `styles.css`, `main.js`, `assets/`, generated `docs/`), served by nginx (`Dockerfile`, `nginx.conf`). Its history was carried over from the app repository.

## Planned work (see `openspec/changes/`)
1. `website-platform`: Astro, shared layout, tokens and icons from the bundle, docs passthrough, checks, same container deploy.
2. `website-switcher-pages`: outcome-first home, comparisons, self-host and developer pages.
3. `website-content-hub`: templates, guides, toolkit, essays, what's new, content workflow.

## Commands (current static site)
- Preview: `python3 -m http.server 4173` in the repository root, then open http://localhost:4173.
- Container: `docker build -t opentodo-website . && docker run -p 8080:80 opentodo-website`.
