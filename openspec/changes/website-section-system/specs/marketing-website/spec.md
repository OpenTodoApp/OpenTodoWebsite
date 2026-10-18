## MODIFIED Requirements

### Requirement: Consistent visual language
Every page SHALL use the app's colour palette and typeface, icons from one line-icon set, and real screenshots of the app shown in a consistent frame, in light and dark. Emoji and Unicode symbols SHALL NOT be used as icons. Every page SHALL follow the visitor's light or dark preference.

Every section of a marketing page SHALL be one of five section types: Showcase (one large screenshot), Statement (one claim with at most one supporting fact), Split (text beside one image or one demo), Catalogue (a grid or table of items) and Close (the closing call to action). Only Catalogue sections SHALL use cards. A page SHALL NOT place two Catalogue sections next to each other and SHALL NOT have more than two. A section label (kicker) SHALL appear only on pages with three or more sections.

A screenshot in a Showcase or Split section SHALL be shown at least 640 px wide when the page is 1280 px wide, or as a crop of the relevant part of the screen; at 360 px wide it SHALL fill the content width. Screenshots and their crops SHALL come from the pinned bundle, so they change with the release.

Wherever a page outside `/self-host/` mentions offline use or sync, it SHALL use the same two-device illustration as the interactive sync demo, readable without JavaScript.

#### Scenario: No emoji icons
- **WHEN** the website check scans the built pages
- **THEN** it reports any emoji or symbol used as an icon in navigation, feature lists or buttons

#### Scenario: Dark preference
- **WHEN** a visitor whose system prefers dark opens a comparison page
- **THEN** the page and its screenshots are shown in their dark variants

#### Scenario: Two card grids in a row
- **WHEN** a change places a Catalogue section directly after another Catalogue section on a marketing page
- **THEN** the layout check fails and names the page and the two sections

#### Scenario: Readable product shot
- **WHEN** the home page is opened at 1280 px wide
- **THEN** its Showcase screenshot is at least 640 px wide and the task titles in it are legible, and at 360 px wide it fills the content width without horizontal scrolling

#### Scenario: New release, new shot
- **WHEN** a bundle with new screenshots is pinned
- **THEN** every Showcase and Split section shows the new screenshots, with their crops, without any edit in this repository

#### Scenario: Sync illustration without JavaScript
- **WHEN** a visitor with JavaScript disabled reads the home page section about working offline
- **THEN** the two-device illustration shows both devices and the server with their task lists, and links to the interactive demo on `/self-host/`
