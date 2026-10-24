## REMOVED Requirements

### Requirement: What it costs page
**Reason**: What it costs became a part of the Compare page (website-compare-v2).
**Migration**: `/cost/` redirects to `/vs/#cost`; see "What it costs on Compare".

## ADDED Requirements

### Requirement: What it costs on Compare
The Compare page `/vs/` SHALL have a "What it costs" part (`#cost`) that explains the cost of using OpenTodo in words and without currency: the free licence named by the bundle manifest, the server footprint from the bundle manifest, where it can run, who installs and updates, and how this compares with a plan per person. Every statement about the app SHALL link to its documentation page of the pinned release, and the part SHALL read fully at 360 px wide without JavaScript.

#### Scenario: Figures follow the release
- **WHEN** a new bundle is pinned with a different image size or idle memory
- **THEN** the cost part shows the new figures without any edit in this repository

#### Scenario: No prices
- **WHEN** the page is scanned for currency symbols or amounts
- **THEN** none are found; costs are described in words

### Requirement: Comparisons name where others lead
The Compare page SHALL list every comparison with its audience, the date it was last checked and the titles of the points where that app is ahead, taken from the comparison's own entries, so the summary changes when a comparison does. It SHALL NOT show a cross-app table with values that no comparison states.

#### Scenario: A gap is added
- **WHEN** a comparison gains a new point where the other app is ahead
- **THEN** its card on `/vs/` names it with no other edit

### Requirement: Questions before switching
The Compare page SHALL answer the questions a visitor asks before deciding (whether it is free, whether there is a hosted version, whether reminders reach an iPhone, whether it works offline, how to leave, and what happens if the maintainer stops, among others) in a part at `#faq`, each answer linking the page that supports it. The answers SHALL be readable without JavaScript at 360 px wide.

#### Scenario: Is it free
- **WHEN** a visitor opens the questions on `/vs/`
- **THEN** the first question answers that OpenTodo is free and open source with no paid tier, linking the cost part and the licence
