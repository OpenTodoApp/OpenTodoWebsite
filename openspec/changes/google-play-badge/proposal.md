## Why

The Android app is live on Google Play (`app.opentodo`). The site still shows Google Play as a greyed "In closed testing" button and tells Android users to get the app from GitHub.

## What Changes

- `/apps/` in every language shows Google's official "Get it on Google Play" badge next to the App Store badge, the same height (44 px), linking to the listing. F-Droid stays a greyed button.
- The Android text on `/apps/`, its description, the Android notice of the install guide and the Ecosystem row send Android users to Google Play first, with the GitHub APK (and F-Droid, once included) as alternatives.
- The home hero shows the Google Play badge beside the App Store badge (40 px), both leading to `/apps/` in the page's language, and its line names both apps.

## Capabilities

### Modified Capabilities

- `website-help`: "Phone apps page" and "App Store links lead to the apps page" name Google Play.

## Impact

- `public/badges/google-play.svg` (Google's badge artwork, unchanged, about 7 KB), `src/lib/site.ts`, `src/components/AppsPage.astro`, `src/components/home/HomeStory.astro`, `src/components/AndroidNotice.astro`, `src/pages/ecosystem.astro`, the `apps` and `hero` strings in every dictionary and the install-guide notices.
- No script, nothing loaded from Google: a plain link and a local image.
