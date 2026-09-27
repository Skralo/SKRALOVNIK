// Respect reduced motion: keep the hero still.
var heroVideo = document.querySelector(".hero__video");
if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}
