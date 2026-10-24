# website-help Specification

## Purpose
The help layer of the site: a help landing, task-based how-tos, install pages per platform, switch pages per app, and an FAQ, with the rules that keep them true to the pinned release.

## Requirements

### Requirement: Help landing
The site SHALL have a page at `/help/` that groups entry points by audience (people who use the app, people who run the server, people who build on it) and phrases them as tasks, each linking the how-to, install page, guide or documentation page of the pinned release that answers it. It SHALL link the documentation's search. It SHALL be linked from the main navigation of every page and SHALL read and link at 360 px wide without JavaScript.

#### Scenario: A task-shaped question
- **WHEN** a visitor on the help landing looks for how to get reminders on a phone
- **THEN** an entry in the first audience group leads to a page that answers it with steps and a link to the notifications documentation

#### Scenario: Audiences without scripts
- **WHEN** the page is opened without JavaScript
- **THEN** all three audience groups are visible and reachable from a jump row at the top

### Requirement: How-to collection
The site SHALL have a how-to collection rendered at `/how-to/<slug>/` with an index at `/how-to/` grouped in a fixed order. Each how-to SHALL carry a last-reviewed date, at least one documentation source of the pinned release, a group and numbered steps, and every paragraph that claims a feature SHALL link to its documentation page. A how-to MAY show one screenshot, which SHALL be a screenshot of the bundle.

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

### Requirement: Install pages per platform
The site SHALL have an index at `/install/` and one page per platform (iPhone and iPad, Android, Windows, Mac, Linux, ChromeOS) with the install steps, how reminders reach that device, how to share into the app there, and what to do when the browser offers no install option. Every step SHALL link the section of the install or notifications documentation of the pinned release it comes from. The pages SHALL read at 360 px wide without JavaScript.

#### Scenario: iPhone reminders
- **WHEN** a visitor reads the iPhone and iPad page
- **THEN** it says that reminders when the app is closed need the installed app, with a link to the notifications documentation

#### Scenario: No install option
- **WHEN** a visitor's browser shows no install option
- **THEN** the page says the server needs a secure address and to ask whoever runs it, with a link to the documentation

### Requirement: Switch pages per app
The site SHALL have an index at `/switch/` with a glossary of the other apps' words, and one page per app (Todoist, Things, TickTick, Linear) with the export steps, the import path of the pinned release, what comes across and what does not, a term map and a first-week checklist. Facts about the other app SHALL carry a "checked on" date no older than 180 days at build time. A page SHALL NOT promise a one-step import unless the app's import format is in the pinned bundle's manifest.

#### Scenario: Named importer released
- **WHEN** the pinned bundle's manifest lists the app's import format and its docs contain the app's switch guide
- **THEN** the switch page links that guide as the one-step path

#### Scenario: No named importer yet
- **WHEN** the pinned bundle's manifest does not list the app's import format
- **THEN** the switch page says there is no one-step importer in this release and describes the CSV or JSON path

#### Scenario: Stale switch page
- **WHEN** a switch page's "checked on" date is older than 180 days at build time
- **THEN** the build reports it as stale

#### Scenario: Honest about losses
- **WHEN** the importers of the pinned release drop something the other app has (for example comments)
- **THEN** the page lists it under what does not come across

### Requirement: FAQ page
The site SHALL have a page at `/faq/` that answers the questions a visitor asks before deciding (whether it is free, whether there is a hosted version, whether reminders reach an iPhone, whether it works offline, how to leave, and what happens if the maintainer stops, among others), each answer linking the page that supports it. The answers SHALL be readable without JavaScript at 360 px wide.

#### Scenario: Is it free
- **WHEN** a visitor opens the FAQ
- **THEN** the first question answers that OpenTodo is free and open source with no paid tier, linking the cost page and the licence

### Requirement: First-time operator toolkit
The toolkit SHALL include pieces for a person who has never run a server: a first-server piece, a Raspberry Pi piece and a server-health piece, each with a last-reviewed date and documentation sources of the pinned release, and every claim linked to its documentation page.

#### Scenario: Raspberry Pi
- **WHEN** a visitor reads the Raspberry Pi piece
- **THEN** it links the Docker documentation for the bind-mount ownership and the backups documentation for copies off the device
