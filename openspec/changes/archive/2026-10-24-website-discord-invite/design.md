# Design

## Context

The site already draws one third-party brand button itself: `CoffeeButton.astro` renders Buy Me a Coffee's yellow with an inline cup, loading nothing from the service. Lucide, the bundle's icon set, has no brand marks. Translated home pages read their text from `src/i18n/<lang>.mjs`. Motivation: see proposal.md.

## Goals / Non-Goals

**Goals:** a button people recognise as Discord; warm, short copy; no third-party request; AA contrast.

**Non-Goals:** live member counts or the Discord widget; translating the shared footer or the English closing call to action (both are English on every page today).

## Decisions

- **D1. `DiscordButton.astro`, modelled on `CoffeeButton.astro`.** Props `label` (default "Join us on Discord") and `small`. The logo is Discord's mark as an inline SVG path in white, `aria-hidden`. The brand-mark exception already exists for the coffee cup; Discord's brand guidelines allow its logo on a button that links to a server. Alternative: a Lucide `messages-square` icon in blurple. Rejected: the maintainer asked for the recognisable Discord button.
- **D2. Colours `#5865F2` background, `#fff` text, hover `#4752C4`.** White on `#5865F2` is 4.6:1, on the hover colour 6.4:1, both AA for normal text; same in dark mode, like the coffee button. A footer override keeps the text white inside link-styled areas, as for the coffee button.
- **D3. Home section `#community`**: a `section-alt` band with kicker "Community", heading "Come and say hello.", one lede and the button, plus three short checks (questions answered, set-ups shared, ideas heard). On translated pages the same structure reads `t.home.community`.
- **D4. Closing call to action**: the support paragraph gains "Questions or ideas? Come and talk to us on Discord." and the Discord button sits beside the coffee button in one wrapping row.
- **D5. Footer**: the small Discord button under the small coffee button; the text item in Project stays for people scanning lists.

Build time: unchanged. Download: about 1 KB of inline SVG per page that shows a button, no new request.

## Risks / Trade-offs

- [Brand mark among line icons] → Limited to this one button, like the coffee cup; the rule against emoji or glyph icons is unaffected.
- [Blurple contrast is close to the AA line] → 4.6:1 measured; the axe check in `npm run test:browser` guards it on every page in both themes.
