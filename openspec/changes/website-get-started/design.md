# Design: website-get-started

## D1. Layout
- **Head:** "Three ways in." with a lede, then three columns between hairlines under a strong top rule, as in the round-2 design. Below 900 px they stack.
- **Run your own server:** a grid of targets (name and how it installs), the command block, and one line of links.
- **On your devices / Moving from another app:** two columns of `.rows` (`website-precision-look` D6) on the band.
- Plain HTML, so it reads without JavaScript.

## D2. Facts from the bundle
- **Deploy targets:** a target appears while `/docs/self-hosting/<slug>/` exists in the pinned bundle (`src/lib/start.ts`).
- **Docker line:** it reads the manifest's image (or `ghcr.io/pixari/opentodo:<version>`), port and data directory, like the install tabs.
- **Switch rows:** each says whether the pinned release imports that app's export file (`canImport`). The last row counts the manifest's import formats.
- **Install rows:** they come from `src/lib/install.ts`, the source the install pages already use.

## Effect on build time and download size
- One more page of about 20 kB of HTML, with no script and no image.
- No effect on build time.
