## MODIFIED Requirements

### Requirement: Phone apps page
The site SHALL have a page at `/apps/` for the phone apps: the official App Store badge linking to the App Store listing and the official Google Play badge, the same height, linking to the Google Play listing, and F-Droid as a greyed button that links nowhere, cannot be focused, is announced as unavailable and says where the store stands without a date. On Android the page SHALL point to Google Play first and name the GitHub APK as an alternative. The page SHALL say plainly that the first version shows the web app inside a native shell and is not yet the quality wanted, that a fully native version is being built, and that the web app installed from the browser is a good alternative, linking `/install/`. When a store listing goes live or the native version ships, the page changes with it. It SHALL read at 360 px wide without JavaScript, in light and dark.

#### Scenario: Reading on a phone
- **WHEN** a visitor opens `/apps/` at 390 px wide without JavaScript
- **THEN** they see the App Store and Google Play badges, the greyed F-Droid button and the paragraph about this version, without sideways scrolling

#### Scenario: Keyboard
- **WHEN** a keyboard user tabs through `/apps/`
- **THEN** the App Store and Google Play badges take focus and the F-Droid button does not

### Requirement: App Store links lead to the apps page
Every App Store or Google Play badge or link on the site outside `/apps/` and the Ecosystem page SHALL lead to `/apps/` in the page's language, not to the store.

#### Scenario: Home hero
- **WHEN** a visitor on `/it/` follows the App Store or Google Play badge under the hero
- **THEN** `/it/apps/` opens
