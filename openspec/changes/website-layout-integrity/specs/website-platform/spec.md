## MODIFIED Requirements

### Requirement: Website checks
Every pull request and every build of the main branch SHALL run checks that fail on any of these:
- a broken internal or docs link
- a serious or critical automated accessibility violation on any page in light or dark
- an emoji or Unicode symbol used as an icon
- a third-party script other than the self-hosted analytics
- a page whose main text, navigation or links do not work without JavaScript
- horizontal scrolling at 360 px wide
- a checklist item whose text and links do not flow as one block beside its icon
- header items that touch or overlap at any width from 768 px
- a card grid whose last row holds a single card while the row above holds three, at 1280 px wide
- link text that is a URL or a site path instead of words

The layout checks SHALL run over every page of the site (not the bundle's `/docs/`) at 360, 768 and 1280 px wide, and SHALL name the page, the width and the element that failed.

#### Scenario: Third-party script added
- **WHEN** a change adds a script loaded from another origin than the site or the self-hosted analytics
- **THEN** the checks fail and name the page and the script URL

#### Scenario: Accessibility regression
- **WHEN** a change lowers the contrast of body text below 4.5:1 in dark
- **THEN** the accessibility check fails and names the page, theme and element

#### Scenario: A link inside a checklist sentence
- **WHEN** a checklist item reads "Questions and bug reports go to the issue tracker" with "the issue tracker" as a link, at 1280 px and at 360 px wide
- **THEN** the sentence wraps as one paragraph beside the icon, with no column break before or after the link, and the check passes

#### Scenario: Brand touching the navigation
- **WHEN** the gap between the brand and the first navigation link is smaller than 16 px at 768 px wide
- **THEN** the check fails and names the page and the width

#### Scenario: Lone card
- **WHEN** a grid of four cards renders three in the first row and one in the second at 1280 px wide
- **THEN** the check fails and names the page and the grid

#### Scenario: Path as link text
- **WHEN** a page lists its sources as links whose text is `/docs/sections-and-boards/`
- **THEN** the build check fails, names the page and the link, and passes once the text is the docs page title "Sections and boards"
