## ADDED Requirements

### Requirement: Video in a post
A blog post MAY show a short video of the real app. A video SHALL be a self-hosted MP4 file under `public/media/blog/<slug>/`, at most 3 MB, without sound, recorded from a real OpenTodo server (the pinned release or the public demo, named in the caption), and embedded in the post with `<video>` inside a `<figure>` whose `<figcaption>` says in words what happens in the video, carrying a poster image from the site, `controls`, `muted`, `playsinline`, `preload="none"` and no `autoplay`. The page SHALL load no script and no third-party request for it, and the post SHALL read without the video. A new video SHALL be recorded by the site's recording script from the post's own scene file, so it can be recorded again when the release changes.

#### Scenario: A reader who does not play the video
- **WHEN** a reader opens a post with a video, on a phone or without JavaScript
- **THEN** they see the poster and the caption that describes what happens, the video file is not downloaded until they press play, and the text of the post makes sense on its own

#### Scenario: A video that breaks the rules
- **WHEN** a post's video autoplays, has no poster or caption, is not an MP4 on the site, or is larger than 3 MB
- **THEN** the site's tests fail and name the post

#### Scenario: Recording again for a new release
- **WHEN** the pinned release changes the screens a post shows
- **THEN** running the recording script for that post against the new release writes new screenshots, video and poster in the same places
