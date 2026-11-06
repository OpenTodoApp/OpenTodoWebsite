## ADDED Requirements

### Requirement: How to run the server
The get started page (`/start/`) and the install index (`/install/`) SHALL show a choice titled "How do you want to run it?" with two options of the same layout and button style, in this order: "On your own hardware" (free, full control, with links to Docker, the binary, Raspberry Pi, NAS and server app stores) and "Managed hosting" (PikaPods, linking https://www.pikapods.com/apps/opentodo). Wherever the site offers PikaPods it SHALL show the disclosure "PikaPods shares part of its revenue with the OpenTodo project. You get the same open-source OpenTodo, and you can export your data and move to your own server at any time.", from one site constant, and SHALL NOT call it recommended or the easiest way. The header and navigation SHALL NOT link PikaPods. The choice SHALL read at 360 px wide without JavaScript, the options stacked.

#### Scenario: A visitor who will not run a server
- **WHEN** a visitor reads the choice on `/install/` at 360 px wide without JavaScript
- **THEN** they see "On your own hardware" first and "Managed hosting" second, each with one button of the same style, and the managed option carries the disclosure and links PikaPods' OpenTodo page

#### Scenario: The wording changes
- **WHEN** the maintainer changes the disclosure
- **THEN** one constant changes and every page that offers PikaPods shows the new wording

## MODIFIED Requirements

### Requirement: Get started page
The site SHALL have a page at `/start/`, opened by the header's Get started action, that offers the three ways in (try the demo, join a server, run your own), leads the "run your own" way to the choice of how to run the server (on your own hardware or managed hosting), lists every deploy target whose self-hosting guide the pinned bundle has with the Docker command built from the bundle manifest, links each install page and the capture page, and links each switch guide saying whether the pinned release imports that app's export. It SHALL read at 360 px wide without JavaScript.

#### Scenario: A new deploy guide
- **WHEN** the pinned bundle adds a self-hosting guide for a platform the page knows
- **THEN** `/start/` lists that platform with a link to its guide, with no other edit

#### Scenario: Phone without JavaScript
- **WHEN** a visitor opens `/start/` at 360 px wide with JavaScript disabled
- **THEN** the three ways in, the choice of how to run it, the deploy targets, the Docker command, the device list and the switch guides are shown and their links work, and nothing scrolls sideways
