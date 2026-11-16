## Why

On 16 November the owner set one rule for how hosting companies appear: a host is listed if it shares revenue with the project or sponsors it, and nobody gets a favour case by case. The list is one plain line, below the ways to run OpenTodo yourself, with one sentence saying openly that these links support the project. PikaPods (revenue share) and Railway (template kickback; the template was published and tested by the owner on 16 November) qualify today. InstaPods agreed a revenue share the same day, and it joins once its OpenTodo page and test link exist and the owner has confirmed them and read the full terms.

## What Changes

- `/hosting/` ends with a "Managed hosting" line, below "Prefer your own server?". It names each qualifying host as a link and adds the sentence: "These links support the project, which receives a share when they're used."
- The hosts come from one site constant with the rule written beside it. Adding a host is one entry, and the line appears only while the list has a host.
- No deploy buttons, nothing at the top of the page, and no change to the PikaPods page above.

## Capabilities

### New Capabilities

### Modified Capabilities

- `marketing-website`: a new requirement, "Managed hosting line".

## Impact

- `src/lib/hosting.ts`, `src/pages/hosting.astro`, `scripts/test/hosting.test.mjs`.

## Out of scope

- The README line (the app repository, the CTO's side).
- Adding InstaPods: a separate small change once its page exists and the owner confirms.
- The GitHub Sponsors tiers, which stay as they are.
