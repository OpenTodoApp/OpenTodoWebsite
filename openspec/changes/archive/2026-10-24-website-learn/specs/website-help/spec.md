## REMOVED Requirements

### Requirement: Help landing
**Reason**: The help landing, the guides, how-to and toolkit indexes and the topic pages become one Learn library (website-learn).
**Migration**: `/help/` redirects to `/learn/`, whose head asks "What do you want to do?" and whose library lists every how-to, guide, setup piece, switch guide and template; see "Learn library" in website-content.

## MODIFIED Requirements

### Requirement: How-to collection
The site SHALL have a how-to collection rendered at `/how-to/<slug>/`, listed on the Learn library's how-to page `/learn/how-tos/` grouped in a fixed order. Each how-to SHALL carry a last-reviewed date, at least one documentation source of the pinned release, a group and numbered steps, and every paragraph that claims a feature SHALL link to its documentation page. A how-to MAY show one screenshot, which SHALL be a screenshot of the bundle.

#### Scenario: Groups in order
- **WHEN** the how-to index is built
- **THEN** its groups appear in the order Get started, Every day, Phone and notifications, Together, Fix it, Run the server

#### Scenario: Troubleshooting as its own page
- **WHEN** a visitor searches the web for reminders not arriving on an iPhone
- **THEN** a how-to in the Fix it group answers it with steps and links to the notifications documentation of the pinned release

#### Scenario: Missing screenshot key
- **WHEN** a how-to names a screenshot that is not in the bundle manifest
- **THEN** the build fails and names the how-to and the key

#### Scenario: Stale how-to
- **WHEN** a how-to's last-reviewed date is older than one year at build time
- **THEN** the build reports it as stale
