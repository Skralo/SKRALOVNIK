// Respect reduced motion: keep the hero still.
var heroVideo = document.querySelector(".hero__video");
if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

// If the browser refused autoplay (iOS Low Power Mode), start on the first touch.
if (heroVideo && heroVideo.autoplay) {
  var tryPlay = function () { heroVideo.play().catch(function () {}); };
  tryPlay();
  document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
}

// Chapter captions, cut-accurate: each entry starts on a cut of the hero film
// (shot times in seconds, measured on the encoded files at 30 fps).
var CHAPTERS = [
  [0,     "Present"],  // talking at the desk
  [1.0,   "Build"],    // typing
  [1.967, "Train"],    // pull-ups
  [3.0,   "Build"],    // writing in the notebook
  [4.067, "Run"],      // running
  [5.1,   "Team"],     // the team at the table
  [6.067, "Recover"],  // sauna
  [7.167, "Repeat"]    // gym — then the loop starts over
];

var wordEl = document.querySelector(".hero__word");
var barEl = document.querySelector(".hero__progress span");
var current = 0;

function chapterAt(t) {
  var i = 0;
  while (i + 1 < CHAPTERS.length && t >= CHAPTERS[i + 1][0] - 0.01) i++;
  return i;
}

function render(t) {
  var i = chapterAt(t);
  if (i !== current) {
    current = i;
    wordEl.textContent = CHAPTERS[i][1];
    wordEl.classList.remove("is-in");
    void wordEl.offsetWidth; // restart the entrance
    wordEl.classList.add("is-in");
  }
  var d = heroVideo.duration;
  if (d) barEl.style.transform = "scaleX(" + Math.min(t / d, 1) + ")";
}

if (heroVideo && wordEl && barEl) {
  if ("requestVideoFrameCallback" in HTMLVideoElement.prototype) {
    // Fires once per presented frame, with that frame's own timestamp.
    var onFrame = function (now, meta) {
      render(meta.mediaTime);
      heroVideo.requestVideoFrameCallback(onFrame);
    };
    heroVideo.requestVideoFrameCallback(onFrame);
  } else {
    (function tick() {
      render(heroVideo.currentTime);
      requestAnimationFrame(tick);
    })();
  }
}
