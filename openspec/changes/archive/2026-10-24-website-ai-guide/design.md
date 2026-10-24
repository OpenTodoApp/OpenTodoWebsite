# Design: website-ai-guide

## D1. Content
- **Format:** a toolkit entry, so it uses the article layout, appears in Learn and is checked like every guide (sources, review date, claim lint).
- **Sources:** each statement restates the docs of v0.11.0:
  - the shared rules in `ai-limits`;
  - setup and local models;
  - consent before the first message;
  - review and undo;
  - MCP writes;
  - the plugin;
  - encrypted accounts.
- **Encryption:** in-app assistant answers are not available for encrypted accounts. The guide says so instead of implying a workaround.

## D2. The illustration
- Static HTML with `role="img"` and a full `aria-label`, styled in `site.css` after `ChangeSetReview.tsx`.
- Wrapped in a figure whose caption says it is an illustration with the app's wording.
- Marked `no-claim` for the content check, since its ARIA text names a label.

## Effect on build time and download size
- One more page of about 18 kB, with no script and no image.
