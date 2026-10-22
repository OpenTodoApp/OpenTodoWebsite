# Spec Delta

## Purpose

Defines the website's accessibility conformance target, WCAG 2.2 level AAA, the rule that decides between a criterion and the look, the register of exceptions and the statement rendered from it, and the page behaviours and checks that keep the target true for every release the site is built from.

## ADDED Requirements

### Requirement: Conformance target and the beauty rule
Every page SHALL target WCAG 2.2 level AAA in light and dark, from 360 px wide, with and without JavaScript. An AAA success criterion SHALL be met by default wherever meeting it does not change how the page looks. Where meeting it would change the look, the page SHALL keep its look, the criterion SHALL stay reachable through a system setting or a presentation the visitor chooses, and the case SHALL be an entry in the exceptions register. No criterion SHALL be unmet without a register entry. This requirement supersedes the level-AA clause of "Fast, private and accessible pages" and the AA target of the "Accessibility statement" requirement where those are archived. It stays true over time because the register and the checks below run on every build against the pinned bundle.

#### Scenario: A criterion that keeps the look
- **WHEN** the prose line height can move from 1.45 to 1.5 without a visible change to a page's rhythm
- **THEN** it is changed and no register entry is written

#### Scenario: A criterion that would change the look
- **WHEN** 7:1 on the primary button would need a darker emerald than the brand's
- **THEN** the button keeps the bundle's emerald, the register names the criterion, the measured ratio, the reason and the route, and the statement shows it

### Requirement: Exceptions register and statement
The repository SHALL hold one register of accessibility exceptions. Each entry SHALL name the success criterion, where it applies, the measured value in light and dark where a value applies, why the page keeps its look, the route to the criterion, and, when the exception depends on the pinned release, the condition under which it ends. The page at `/accessibility/` SHALL render the target, every entry in plain language, the checks that run on every change, what the statement does not cover, how to report a problem and the review date, all from the register and the site's own facts, so the page cannot differ from the file. The page SHALL read at 360 px wide and without JavaScript. The statement stays true over time because it is generated at build time from the register and the bundle's version field.

#### Scenario: Entry added
- **WHEN** a register entry for the muted tone is added
- **THEN** the next build's `/accessibility/` page lists it with its measured ratio and its ending condition, with no edit to the page

#### Scenario: Statement without JavaScript
- **WHEN** a visitor opens `/accessibility/` at 360 px with scripts blocked
- **THEN** the whole statement reads, with no horizontal scrolling

### Requirement: Contrast measured from the bundle
Every text and background pair the stylesheet uses SHALL measure at least 7:1 in light and in dark from the pinned bundle's tokens, except a pair in the register, which SHALL measure at least 4.5:1. The build SHALL measure the pairs from the bundle's tokens stylesheet, SHALL fail naming the pair, the theme and the ratio when an unregistered pair is below 7:1 or a registered pair is below 4.5:1, and SHALL fail naming the entry when a registered pair measures 7:1 in both themes, so that an exception that a newer release has removed cannot stay in the statement. This stays true over time because the measurement runs on every build from the pinned bundle, not from values in this repository.

#### Scenario: Pinned release retunes a tone
- **WHEN** `bundle.json` is bumped to a release whose muted tone measures 7:1 on the canvas in light
- **THEN** the build fails naming the stale register entry until it is removed, and the statement then no longer lists it

#### Scenario: New pair in the stylesheet
- **WHEN** a change uses the faint tone on the sunken surface and that pair is not listed for measurement
- **THEN** the check fails naming the unlisted pair

### Requirement: High contrast from the system setting
When the visitor's system asks for more contrast, every page SHALL apply the bundle's high-contrast tokens when the pinned bundle carries them, in light and in dark, without JavaScript, and SHALL change nothing when it does not; the statement SHALL say which case the pinned release is. This stays true over time because the stylesheet's rule reads the tokens the bundle provides and the statement reads the bundle's version.

#### Scenario: Bundle with the override
- **WHEN** the pinned bundle's tokens define the high-contrast blocks and a visitor's system asks for more contrast
- **THEN** the page's surfaces are pure white or black and every text pair measures at least 7:1, including the primary button's label

#### Scenario: Bundle without the override
- **WHEN** the pinned bundle predates the override
- **THEN** the page looks as it does without the system setting, and `/accessibility/` says high contrast arrives with a later release

### Requirement: Pointer targets
Every pointer target on every page SHALL offer a hit area of at least 44 × 44 CSS pixels, through its padding or an invisible area that does not move its neighbours, except a link inside a sentence. The browser test SHALL measure every interactive element on every page at 360 and 1280 px and SHALL fail naming the page, the width and the element whose hit area is smaller. Pages SHALL keep this at 360 px and without JavaScript.

#### Scenario: Icon link in the footer
- **WHEN** the footer shows a 24 px icon link to the source repository
- **THEN** a tap 20 px from its centre follows the link and the test passes it

#### Scenario: Small pagination link
- **WHEN** a change adds a 32 px pagination control
- **THEN** the browser test fails naming the page and the control

### Requirement: Focus is never obscured
When an element receives keyboard focus, no part of it SHALL be hidden under the sticky header, a banner or the edge of the viewport. The browser test SHALL fail naming the page, the width and the element when a focused element's rectangle is partly outside the viewport or the topmost element at any of its corners or its centre is not the element or inside it. This holds without JavaScript, since focus and scrolling are the browser's.

#### Scenario: Link under the header
- **WHEN** a keyboard user tabs backwards to a link that sits under the sticky header
- **THEN** the page scrolls so the link sits fully below the header

### Requirement: Reading blocks
Prose on every page SHALL have a line height of at least 1.5, a space between paragraphs of at least 1.5 times the line height, a measure of at most 80 characters, and SHALL never be justified. Headings, navigation, buttons and cards are not prose. This holds at 360 px and without JavaScript, and a stylesheet test keeps it true.

#### Scenario: Guide paragraphs
- **WHEN** a guide renders two paragraphs at 1280 px
- **THEN** each line holds at most 80 characters, the line height is 1.5 and the gap between the paragraphs is at least 1.5 times the line height

### Requirement: Location, link purpose and headings
Every page below the top level SHALL show a trail from the home page to itself, each step a link, as a navigation landmark named "You are here", reading at 360 px and without JavaScript. Every link's purpose SHALL be clear from its text alone: a page SHALL NOT use a bare "here", "more", "Learn more", "click here" or "read more" as link text, and the content lint SHALL fail naming the file and line. Every section of a page SHALL have a heading, and heading levels SHALL not skip. The trail is built from each page's place in the site at build time, so it stays true as pages are added.

#### Scenario: Blog post trail
- **WHEN** a visitor opens a post in the "ownership" category
- **THEN** the trail reads "Home › Blog › Ownership" with each step a link

#### Scenario: Bare link
- **WHEN** a draft adds "Learn more" as a link's whole text
- **THEN** the content lint fails naming the file and line

### Requirement: Abbreviations and reading level
The first use of a listed abbreviation on a page (at least GTD, PWA, CalDAV, E2EE, MCP, OIDC, TOTP, SSO, API, CLI, SMTP, IMAP, WebDAV) SHALL carry its expansion in the page's text or an abbreviation element with the expansion, readable without JavaScript, and the content lint SHALL fail naming the page and the abbreviation when it does not. The content lint SHALL report every sentence longer than 25 words in a page's prose so the author can shorten it, and the voice guide SHALL state the limit. The list of abbreviations lives in the repository and is the lint's source.

#### Scenario: First use expanded
- **WHEN** a how-to mentions CalDAV for the first time as "CalDAV, the calendar sync standard"
- **THEN** the lint passes the page

#### Scenario: Unexpanded abbreviation
- **WHEN** a page uses "OIDC" without an expansion anywhere on the page
- **THEN** the lint fails naming the page and "OIDC"

### Requirement: Automated AAA gate
The browser audit of every page in light and dark at 360 and 1280 px SHALL run the WCAG 2.2 A, AA and AAA rule sets and SHALL fail on any serious or critical violation, except an enhanced-contrast finding whose colours resolve to a pair in the register, which passes; the failure SHALL name the page, the theme, the width, the element and the measured ratio. The audit runs on every change before merge, so the target stays true over time.

#### Scenario: Registered pair
- **WHEN** the audit finds the white label on the emerald button at 5.5:1
- **THEN** it matches the register entry and passes

#### Scenario: Unregistered pair
- **WHEN** a new component sets a muted caption on the accent-soft tint at 5.1:1
- **THEN** the audit fails naming the page, the theme, the width, the element and 5.1:1
