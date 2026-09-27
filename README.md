# SKRALOVNIK — website

Static site: `index.html` · `styles.css` · `main.js` · `assets/`. No build step.

## Where we left off — 27. 9. 2026

**Done: hero section.**

- Full-width 16:9 video on every screen (phones included), square edges, near-black page.
- The SKRALOVNIK logo sits on top, with its black offset layer and a soft shadow behind it.
- Chapter captions change on the exact frame of each cut:
  Present · Build · Train · Build · Run · Team · Recover · Repeat
  (`CHAPTERS` in `main.js`; cut times measured on the encoded files).
- A hairline progress line along the bottom edge fills once per loop.
- Silent by design: no music, no sound toggle.

**Next:**

1. Sections below the hero — content and order not decided yet.
2. The earlier links page (pillars, 5 links, footer) was removed on purpose. It can be restored from commit `19d8af7` if needed.
3. Going live: merge this branch into `main`. Vercel deploys `main` to production (skralovnik.vercel.app).

## Video

The source is `../Personal landing video-varna-kopija.mp4`: 8 s, 4K, 8 shots. It isn't in the repo.

| File | Size | Used on |
|------|------|---------|
| `assets/hero-mobile.mp4` | 1280×720, ~1.1 MB | screens up to 719 px |
| `assets/hero-desktop.mp4` | 1920×1080, ~2.3 MB | wider screens |
| `assets/hero-poster.jpg` | first frame | shown before playback |

Both videos are 16:9 with no audio and `+faststart`. If the source is re-edited, the cut times in `main.js` must be measured again.

## Local preview

Run `python3 -m http.server 4620`, then open http://localhost:4620.

The DRAFTPIN review tool loads only on localhost. Start its helper with `node draftpin-server.js 4605`. Its files are git-ignored.
