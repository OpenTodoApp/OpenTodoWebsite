## Why

The owner is running an anonymous user survey (on Tally) to decide what OpenTodo does next, and wants visitors of the website to find it. One slim line above the header on every page, which a visitor can close, asks for five minutes; it ends on its own once the survey closes.

## What Changes

- A survey strip at the top of every page that uses the shared layout (above the header, below the preview banner): "5 minutes to help shape OpenTodo. Anonymous, no account." and a plain link "Take the survey" to `https://tally.so/r/1W41xQ`, in the page's language; the other languages say the survey is in English.
- A close button (an `x` icon from the bundle, with a label) hides it and remembers that in the browser's `localStorage`; a few lines of inline script in `<head>` hide it before the page paints for a visitor who closed it. Without JavaScript the strip stays and the close button is not shown.
- The strip is only built until 2026-12-11 (UTC build date), one constant in `src/lib/survey.mjs`; a build after that day leaves it out.

## Capabilities

### Modified Capabilities

- `website-platform`: a new requirement, "Survey strip".

## Impact

- `src/lib/survey.mjs`, `src/components/SurveyStrip.astro`, `src/layouts/Base.astro`, `src/styles/site.css`, the `common.survey` strings in every dictionary (`src/i18n/*.mjs`), unit and browser tests.
- No new dependency, nothing loaded from Tally: a plain link. Each page gains well under 1 KB of HTML and inline script, which leaves with the strip after 2026-12-11. Build time is unchanged.

## Out of scope

- Embedding the survey or loading any Tally script (third-party scripts stay forbidden).
- The docs under `/docs/`, served from the bundle as shipped, which do not use the shared layout.
- Tracking parameters on the link, or analytics events for it.
