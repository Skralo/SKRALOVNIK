# SKRALOVNIK — website

v1: hero section — a full-width 16:9 video band at the top (working · training · running · people ·
sauna · gym) on a near-black page, the SKRALOVNIK logo on top. Silent by design.

Static site: `index.html` · `styles.css` · `main.js` · `assets/`. No build step.

**Video:** source `../Personal landing video-varna-kopija.mp4` (8 s, 4K) →
`assets/hero-mobile.mp4` (1280×720, phones) and `assets/hero-desktop.mp4` (1920×1080),
both 16:9, no audio, `+faststart`. Poster: `assets/hero-poster.jpg`.

**Local preview:** `python3 -m http.server 4620` → http://localhost:4620
DRAFTPIN review tool loads on localhost only (helper: `node draftpin-server.js 4605`).

Remote (after v1 is approved): github.com/skralo/skralovnik
