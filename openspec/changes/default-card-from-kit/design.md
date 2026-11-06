# Design: default-card-from-kit

## D1. Which file

`defaultCardSource(bundleDir, dist)` in `scripts/lib/og.mjs` returns the bundle's kit card when it exists, else the built home card, else nothing. `scripts/og.mjs` copies that file to `dist/assets/og.png` as before, so the address and the build order do not change. With v0.22.0 pinned the result is the home card, as today; the first pin of a bundle with `brand/kit/` switches it.
