# SKRALOVNIK — website

v1: brand / links page (link-in-bio). Mobile first — traffic comes from Instagram.

Static site: `index.html` · `styles.css` · `main.js` · `assets/`. No build step.

**Design:** white embroidery on deep `#00202d` textile (SKRALOVNIK Branding doc §12).
Textile background is a crop of a real embroidered brand post; logo is the official
`Logo + simbol.svg`; type is Cormorant Garamond; gold `#f9c706` appears once (featured link).

**Local preview:** `python3 -m http.server 4620` → http://localhost:4620
DRAFTPIN review tool loads on localhost only (helper: `node draftpin-server.js 4605`).

**Open TODOs:** links marked `data-todo` in `index.html` still point to `#`.

Remote (after v1 is approved): github.com/skralo/skralovnik
