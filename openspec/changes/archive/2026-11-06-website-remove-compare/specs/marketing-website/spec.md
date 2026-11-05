# Spec Delta

## MODIFIED Requirements

### Requirement: Switch calls to action follow the importers
A "Switch from <app>" call to action SHALL appear only for apps whose named import format is released in the version the site describes, and SHALL lead to that app's switch guide. For other apps the site SHALL link to the general import guide instead and SHALL NOT promise a one-step switch.

#### Scenario: Importer not yet released
- **WHEN** the site is built while the Linear import format is not in the released version
- **THEN** the Linear switch guide links to the general import guide and shows no "Switch from Linear" button

### Requirement: Audience pages
The site SHALL have a self-hosting page with the sync demo, footprint, container, Coolify and one-click install instructions, and a developers page with the API, command-line client, MCP, webhooks and open specifications. Both SHALL be linked from the footer of every page.

#### Scenario: Navigation
- **WHEN** a visitor is on any page
- **THEN** the footer links Self-host and Developers

### Requirement: Consistent visual language
Every page SHALL use the app's colours, typeface, line icons and real screenshots, and follow the visitor's light or dark preference; emoji and Unicode symbols SHALL NOT be icons. In plain CSS, at every width and without JavaScript, pages SHALL follow the app's flat look: surface and canvas tokens, hairlines instead of shadows except on floating panels, no decorative gradients, no imitation browser chrome, and grey for navigation state, every colour from the bundle's tokens.

#### Scenario: No emoji icons
- **WHEN** the website check scans the built pages
- **THEN** it reports any emoji or symbol used as an icon in navigation, feature lists or buttons

#### Scenario: Dark preference
- **WHEN** a visitor whose system prefers dark opens a switch guide
- **THEN** the page and its screenshots are shown in their dark variants

#### Scenario: Flat look follows the bundle
- **WHEN** the bundle pin moves to a release with a different canvas, surface or border token and the site is rebuilt
- **THEN** every band, frame and hairline uses the new values with no edit in this repository, and no card, button or screenshot has a shadow

#### Scenario: Current page in the navigation
- **WHEN** a visitor opens the blog at 1280 px wide
- **THEN** the Blog link in the header is marked with the grey selected surface and strong text, not with the accent colour

### Requirement: Fast, private and accessible pages
Every page SHALL work without JavaScript for reading and navigation, SHALL load no third-party scripts other than the site's self-hosted analytics, and SHALL meet WCAG 2.2 AA in light and dark at widths from 360 px, without horizontal scrolling.

#### Scenario: Reading without scripts
- **WHEN** a visitor opens the Todoist switch guide with JavaScript disabled
- **THEN** the full text and links are readable and work

#### Scenario: Accessibility check
- **WHEN** the website check runs an automated accessibility audit on every page in light and dark
- **THEN** it fails on any serious or critical violation

## REMOVED Requirements

### Requirement: Honest comparison pages
**Reason**: The owner removed the Compare section (PLAN-1.0 Track C): it was noise next to Features and the switch guides, and its tables needed re-checking every 180 days.
**Migration**: `/vs/` redirects to `/features/`, `/vs/<app>/` to `/switch/<app>/`.

### Requirement: Comparisons are fair and sourced
**Reason**: No comparison pages remain; the switch guides keep their own "checked on" date and docs links.
**Migration**: None.

### Requirement: What it costs on Compare
**Reason**: Removed with Compare.
**Migration**: `/cost` redirects to `/self-host/plan/`, which describes the server it takes.

### Requirement: Comparisons name where others lead
**Reason**: Removed with Compare; switch guides say where the other app stays ahead in their own text.
**Migration**: None.

### Requirement: Questions before switching
**Reason**: Removed with Compare.
**Migration**: `/faq` redirects to `/learn/`, whose troubleshooting section and the docs answer the same questions.
