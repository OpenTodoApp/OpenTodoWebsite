# Design

## D1. One claim, then the product
The claim is the shortest true sentence the site has, already translated into six languages. The briefing sentence, which used to be the headline, becomes the caption of the Today screenshot where it is literally on screen.

## D2. Motion without a video
The bundle carries screenshots, not video. Three screenshots stacked in one grid cell crossfade on a 15-second CSS loop with their captions: the one authored motion on the page. With `prefers-reduced-motion` only Today shows. Only the first image loads eagerly.

## Build and download size
No script. The page loads two more screenshots (lazy, AVIF/WebP at responsive widths) and one phone screenshot from 1024 px.
