## ADDED Requirements

### Requirement: Default social card from the bundle
The site's default social card at `/assets/og.png` SHALL be the pinned site bundle's brand kit card (`brand/kit/png/og-default-1200x630.png`) when the bundle carries one, and the home page's own card otherwise.

#### Scenario: A bundle with the brand kit
- **WHEN** the pinned bundle has `brand/kit/png/og-default-1200x630.png`
- **THEN** the built `/assets/og.png` is that file byte for byte

#### Scenario: An older bundle
- **WHEN** the pinned bundle has no brand kit
- **THEN** the built `/assets/og.png` is the home page's card
