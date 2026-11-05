# Design

## D1. One primary action in the header
The header keeps four destinations and one button. Try the demo is the action every visitor can take without commitment; Get started (`/start/`) is one step further and stays in the phone menu, the footer and the pages' own calls to action. The GitHub star is a text link with an icon, not a button, so it does not compete with the demo. Below 768 px the bar shows the logo, Try the demo and an icon-only menu button (labelled for assistive technology).

## D2. Language switch
A `<details>` disclosure whose summary shows a languages icon and the current language's code (`EN`, `DE`, …, `中文`), with the full language name for assistive technology. Its panel lists every language by its native name with `hreflang` and `lang`, the current one marked `aria-current`. Translated pages link each other; English-only pages link each language's home page, as the footer list did. In the footer it opens upwards. It replaces the language bar of translated pages, which pushed the page down by a row for a choice the visitor already made.

## D3. Footer
Three groups of at most six links. Below 768 px they are disclosures (the existing pattern), so the footer stays under 600 px tall at 390 px. The licence, specification and fine-print rows become one line; the app and website specifications stay reachable from Developers and About.

## D4. Community row
Star on GitHub, Sponsor, Buy me a coffee, Discord, X and RSS as text links with icons from the bundle, in the footer's muted colour. Plain anchors: nothing is loaded from those services. The brand-coloured coffee and Discord buttons remain on the Support page and in page content, where asking is the point.

## Build and download size
No effect on build time. The header and footer markup shrink; the inline script is under 400 bytes.
