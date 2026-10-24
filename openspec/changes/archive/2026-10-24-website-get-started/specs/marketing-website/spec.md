## ADDED Requirements

### Requirement: Get started page
The site SHALL have a page at `/start/`, opened by the header's Get started action, that offers the three ways in (try the demo, join a server, run your own), lists every deploy target whose self-hosting guide the pinned bundle has with the Docker command built from the bundle manifest, links each install page and the capture page, and links each switch guide saying whether the pinned release imports that app's export. It SHALL read at 360 px wide without JavaScript.

#### Scenario: A new deploy guide
- **WHEN** the pinned bundle adds a self-hosting guide for a platform the page knows
- **THEN** `/start/` lists that platform with a link to its guide, with no other edit

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/start/` at 360 px wide with JavaScript disabled
- **THEN** the three ways in, the deploy targets, the Docker command, the device list and the switch guides are shown and their links work, and nothing scrolls sideways
