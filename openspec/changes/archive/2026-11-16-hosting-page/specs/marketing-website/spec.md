## MODIFIED Requirements

### Requirement: Five-destination navigation
From 768 px wide, the header SHALL show Features, Learn, Docs, Blog and Hosting on one line, then the language switch, a "Star" link to the app repository and one primary action, Try the demo. Below 768 px the header SHALL show the logo, Try the demo and a menu button whose panel opens without JavaScript, by keyboard and pointer, and shows the same destinations, Get started, Star on GitHub and the language switch. Hosting SHALL link the site's `/hosting/` page and be marked current there; the header SHALL NOT link PikaPods itself. The guidance content (guides, how-tos, toolkit, templates, switch pages and topics) SHALL be reached through the Learn page and the footer rather than a menu in the header.

#### Scenario: Learn without JavaScript on a laptop
- **WHEN** a visitor at 1280 px wide with JavaScript disabled activates Learn with the keyboard
- **THEN** the Learn page opens and links the guides, how-tos, toolkit and templates

#### Scenario: Blog follows the content
- **WHEN** no post is published
- **THEN** the header and the phone menu list no Blog link, as the blog specification requires

#### Scenario: Phone menu
- **WHEN** a visitor on a 360 px wide screen without JavaScript opens the menu
- **THEN** it shows Features, Learn, Docs, Blog and Hosting, then Get started and Star on GitHub, and each works, while Try the demo stays visible in the bar

#### Scenario: Hosting is current on its page
- **WHEN** a visitor opens `/hosting/`
- **THEN** the header's Hosting link, on desktop and in the phone menu, is marked as the current page

#### Scenario: Tablet width
- **WHEN** the header is shown at 768 px wide
- **THEN** every header item stays on one line and the page does not scroll sideways

## ADDED Requirements

### Requirement: Hosting page
The site SHALL have an English page at `/hosting/` about running OpenTodo on PikaPods, with a title and meta description, listed in the sitemap and the search index Features and Learn share. It SHALL show, in this order: a headline for people who do not want to run a server; what they get in at most four short points (the price and hourly billing from prepaid credit with the smallest pod's size, managed and tested updates with HTTPS, nightly encrypted backups to their own S3 storage with the note that PikaPods' server backups are not a per-pod restore, and the welcome credit); three or four setup steps (create the pod, finish the owner screen before sharing the address, the setup code from the pod logs or the configured token, registration closed by default and people invited from Settings); the disclosure from the site-wide constant; and a short block for people who prefer their own server linking `/self-host/` and `/install/`. Its only primary button SHALL be "Run it on PikaPods", linking https://www.pikapods.com/apps/opentodo. The page SHALL NOT call PikaPods recommended or the easiest. The facts SHALL be PikaPods' own, kept with the date they were checked in one site constant and updated when PikaPods' OpenTodo page changes; the app's PikaPods guide SHALL be linked once it is in the pinned bundle. The page SHALL read and link without JavaScript at 360 px wide, in light and dark.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor on a 360 px wide phone without JavaScript opens `/hosting/`
- **THEN** the headline, the "Run it on PikaPods" button, what they get and the setup steps are shown, and the page does not scroll sideways

#### Scenario: The arrangement is stated
- **WHEN** a visitor reads `/hosting/`
- **THEN** the page shows the disclosure that PikaPods shares part of its revenue with the project and that data can be exported and moved to an own server at any time

#### Scenario: Own server instead
- **WHEN** a visitor would rather run OpenTodo themselves
- **THEN** the page links `/self-host/` and `/install/`, which cover Docker, Raspberry Pi, NAS and server app stores
