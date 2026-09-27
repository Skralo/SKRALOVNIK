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
