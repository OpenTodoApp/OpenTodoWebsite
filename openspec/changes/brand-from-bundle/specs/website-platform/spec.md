## ADDED Requirements

### Requirement: Brand mark from the bundle
The site's favicon, its Apple touch icon, the mark in the header and the footer, and the mark on every social card SHALL be the colour mark of the pinned bundle's `brand/` folder, read at build time and by the dev server. The site SHALL NOT keep a copy of the mark of its own. A bundle pin to a release with another mark SHALL change all of them with no other edit. The favicon SHALL be byte-identical to the bundle's `brand/mark-colour.svg`. The touch icon SHALL be a 180 px opaque render of that mark filling its square, because iOS rounds it itself. The mark is an image: a page shows it at phone width and without JavaScript like any other image.

#### Scenario: A new mark in the pinned release
- **WHEN** `bundle.json` is bumped to a release whose `brand/mark-colour.svg` differs, and the site is built
- **THEN** `/assets/favicon.svg` equals the new file, the touch icon and every social card show the new mark, and no other file in the repository changed

#### Scenario: A hand-made copy comes back
- **WHEN** a contributor adds `public/assets/favicon.svg` or another copy of the mark
- **THEN** the tests fail and name the file

#### Scenario: Phone without JavaScript
- **WHEN** a page is opened at 360 px with JavaScript turned off
- **THEN** the header shows the bundle's mark beside the name, and the browser tab shows it as the favicon
