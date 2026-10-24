## MODIFIED Requirements

### Requirement: Consistent visual language
Every page SHALL use the app's colour palette and typeface, icons from one line-icon set, and real screenshots of the app shown in a consistent frame, in light and dark. Emoji and Unicode symbols SHALL NOT be used as icons. Every page SHALL follow the visitor's light or dark preference. The pages SHALL follow the app's flat look, with every colour taken from the bundle's tokens so it stays true as the app's palette changes:
- content on the surface token, with the canvas token for bands;
- hairlines instead of shadows (a shadow only on floating panels such as menus);
- no decorative gradients;
- screenshots in a plain hairline frame without imitation browser chrome;
- grey for navigation state and labels, the accent kept for links, the primary action and success.

At 360 px wide and without JavaScript, the same look SHALL apply, because it is plain CSS.

#### Scenario: No emoji icons
- **WHEN** the website check scans the built pages
- **THEN** it reports any emoji or symbol used as an icon in navigation, feature lists or buttons

#### Scenario: Dark preference
- **WHEN** a visitor whose system prefers dark opens a comparison page
- **THEN** the page and its screenshots are shown in their dark variants

#### Scenario: Flat look follows the bundle
- **WHEN** the bundle pin moves to a release with a different canvas, surface or border token and the site is rebuilt
- **THEN** every band, frame and hairline uses the new values with no edit in this repository, and no card, button or screenshot has a shadow

#### Scenario: Current page in the navigation
- **WHEN** a visitor opens the blog at 1280 px wide
- **THEN** the Blog link in the header is marked with the grey selected surface and strong text, not with the accent colour
