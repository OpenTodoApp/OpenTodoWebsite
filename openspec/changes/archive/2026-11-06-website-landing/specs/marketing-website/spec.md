# Spec Delta

## MODIFIED Requirements

### Requirement: Outcome-first home page
The home page SHALL open with the outcome for people who use a task app, not with implementation details. Above the first screenful it SHALL show a headline, a one-sentence promise and calls to action to try the demo and to get started, with the real app of the pinned release directly below: a stage that crossfades the Today, quick-add and board screenshots with their captions (only Today when the visitor prefers reduced motion), and the phone app beside it from 1024 px wide. No label above the headline and no section numbers. Architecture terms SHALL NOT appear above the fold.

#### Scenario: A Todoist user lands on the home page
- **WHEN** a visitor opens the home page on a 390 px wide phone
- **THEN** the first screenful shows the headline, the promise and the calls to action, and the Today screenshot is reachable by scrolling once, without any mention of op logs, clocks or SQLite

### Requirement: Everything included on the home page
The home page SHALL show the breadth of the pinned release in one compact part: every feature group with its count, each linking its page on the features catalog, the integrations and import apps by name, and a link to the features page saying no feature is held back for a paid plan. It SHALL use the features page's data, so it follows the pinned release. At 360 px wide and without JavaScript every group link SHALL work.

#### Scenario: A new release adds a feature
- **WHEN** the pin moves to a release that adds a listed feature
- **THEN** its group's count on the home page grows with no edit to the home page
