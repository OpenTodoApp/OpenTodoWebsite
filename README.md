# OpenTodo website

The public landing page for OpenTodo. Plain HTML, CSS and JavaScript: no build step, no dependencies.

The app's rules (no telemetry, no third-party requests) apply to the app only. The website may load web fonts, call the GitHub API for the star count, and use analytics; paste the analytics snippet where `index.html` marks it.

## Run locally

```bash
cd website
python3 -m http.server 4173   # or any static server
```

Open http://localhost:4173.

## Deploy on Coolify

Add a second resource to the project:

1. **+ New Resource → Public Repository**, `https://github.com/pixari/opentodo`, branch `main`.
2. **Build pack**: Dockerfile. **Base directory**: `/website`. **Port**: `80`.
3. Assign the domain and deploy.

Any static host works too: publish the contents of this folder as-is.

## Files

| Path | What |
| --- | --- |
| `index.html` | All page content |
| `styles.css` | Styles, dark theme, responsive layout |
| `main.js` | Hero demo app, keyboard shortcuts, sync playground, install tabs |
| `assets/` | Logo, app screenshots (copied from `docs/screenshots`), social image `og.png` |

When the app UI changes, refresh the screenshots: run `scripts/e2e-smoke.mjs` or a seeded capture against a fresh server (see `scripts/README.md`), then copy `docs/screenshots/*.png` into `assets/`. The feature tour (`#tour`) reads `data-shot` paths from the buttons in `index.html`; the roadmap section links each item to its OpenSpec change under `openspec/changes/`. When a change ships, move it from the roadmap cards into the tour with a screenshot.

Live at https://opentodo.pixari.dev. The canonical, `og:url` and `og:image` URLs in `index.html` are absolute; update them if the domain changes.
