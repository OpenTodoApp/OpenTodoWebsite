# Design: website-home-v2

## D1. Facts from the pinned release
- **Screenshots:** they come from the bundle (`today` with `today-dark`, `quick-add`, `board`) through `ScreenshotFrame`, so a new release refreshes them.
- **Everything included:** it reads `featureGroups()`, `integrations()` and `importApps()`, so the counts and names follow the pin (54 features with v0.11.0).
- **Demo lifetime:** "two hours without activity" restates `/docs/self-hosting/demo/`, which the card links.

## D2. Layout
- **Section grid:** each section is a `16rem | 1fr` grid from 1024 px (number, title, intro on the left) and stacks below.
- **Crops:** a fixed-height frame with the image scaled and moved by `transform`, eager-loaded so they show at once.
- **Everything included:** rendered twice, as a three-column grid from 768 px and as `<details>` below it. Each version is hidden at the other widths, so neither needs a script and no closed `<details>` hides content on a laptop.

## D3. Phones
- Row lines, the crops, the strips, the "Yours" intro, the community paragraph and the post cards are hidden.
- The second way in keeps its sentence about the invitation link and the install docs.
- The hero shot is cropped to the title and the briefing.

## Effect on build time and download size
- **Fewer scripts:** the home page drops its two island scripts (the hero demo and the tour) and loads no JavaScript.
- **HTML:** about 30 kB, down from about 75 kB.
- **Images:** the screenshots are responsive AVIF and WebP; three are eager (the hero and the two crops).

## D4. Anchors the docs link to
The bundle's docs pages link `/#tour` and `/#self-host`. The screenshot crops keep `id="tour"` and the three ways keep `id="self-host"`, so those links still land on the matching part.
