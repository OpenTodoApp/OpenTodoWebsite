# Design: landing-hosted-card

## D1. Same card, same weight

The hosted card is one more entry in the `ways` list of `HomeStory.astro`, so it has the same markup as the others: icon, title, text, a secondary button to https://www.pikapods.com/apps/opentodo and a second link to `/start/#run`. It sits second, after the demo, because it is the other way to start without your own hardware. "Run your own" keeps its words and links.

## D2. The price

"From $2 a month" is PikaPods' own price, checked on its OpenTodo page on 2026-11-06. It lives in the dictionaries beside the card text. When PikaPods changes it, the seven strings change together; the shape test keeps the languages in step.

Build time: unchanged. Download size: a few hundred bytes of HTML per home page, no script.
