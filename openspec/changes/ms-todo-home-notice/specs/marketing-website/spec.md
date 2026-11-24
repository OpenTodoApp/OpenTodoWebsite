## ADDED Requirements

### Requirement: Microsoft To Do notice on the home page
Until the end date set once in `src/components/home/MsTodoNotice.astro` (2027-06-30, the day Microsoft retires the To Do apps), every home page SHALL show one line under the hero's calls to action and app badges, in the page's language, asking whether the visitor is leaving Microsoft To Do, with a plain link to the post `/blog/leaving-microsoft-to-do/`. Translated home pages SHALL say that the post is in English.

#### Scenario: German home page
- **WHEN** a visitor opens `/de/` before the end date
- **THEN** the line is in German and its link leads to the post and says it is in English

#### Scenario: After the end date
- **WHEN** the site is built on 2027-07-01 (UTC) or later
- **THEN** no home page contains the line

### Requirement: The Microsoft To Do notice reads everywhere
The Microsoft To Do notice SHALL be plain HTML, readable without JavaScript, meet WCAG 2.2 AA in light and dark, and wrap without sideways scrolling from 360 px wide.

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/de/` at 360 px wide with JavaScript disabled before the end date
- **THEN** the line and its link show, and the page does not scroll sideways
