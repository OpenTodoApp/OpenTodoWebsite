## ADDED Requirements

### Requirement: Survey strip
Until the end date set once in `src/lib/survey.mjs` (2026-12-11), every page built from the shared layout SHALL show one line above the header, in the page's language, asking for five minutes for the anonymous user survey, with a plain link to the survey and no script or frame from the survey service. Pages not in English SHALL say that the survey is in English. A build on a later day (UTC) SHALL leave the strip out, so it ends without an edit.

#### Scenario: Translated page
- **WHEN** a visitor opens the German home page
- **THEN** the strip is in German and says the survey is in English

#### Scenario: After the end date
- **WHEN** the site is built on 2026-12-12 (UTC) or later
- **THEN** no page contains the strip or its script

### Requirement: Closing the survey strip
The survey strip SHALL have a close button with an accessible name, reachable by keyboard, that hides it and remembers that in the browser, so later pages do not show it, not even for a moment. Without JavaScript the strip SHALL stay visible without the close button. The strip SHALL meet WCAG 2.2 AA in light and dark and fit from 360 px without sideways scrolling.

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens the home page at 360 px wide with JavaScript disabled before the end date
- **THEN** the strip shows the line and the "Take the survey" link, no close button, and the page does not scroll sideways

#### Scenario: Closing the strip
- **WHEN** a visitor with JavaScript closes the strip with the keyboard and opens another page
- **THEN** the strip is gone on both pages
