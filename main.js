// Draw an embroidered stitch line inside every .stitched element.
// SVG (not CSS dashed borders) so the stitches are even, rounded and have depth.
document.querySelectorAll(".stitched").forEach(function (el) {
  var ns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(ns, "svg");
  svg.setAttribute("class", "stitch");
  svg.setAttribute("aria-hidden", "true");
  ["stitch__shadow", "stitch__thread"].forEach(function (cls) {
    var r = document.createElementNS(ns, "rect");
    r.setAttribute("class", cls);
    svg.appendChild(r);
  });
  el.prepend(svg);
});

// Quiet staggered entrance.
requestAnimationFrame(function () {
  document.querySelectorAll(".reveal").forEach(function (el, i) {
    el.style.setProperty("--i", i);
  });
  document.documentElement.classList.add("is-ready");
});

// Respect reduced motion: keep the hero still.
var heroVideo = document.querySelector(".hero__video");
if (heroVideo && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVideo.removeAttribute("autoplay");
  heroVideo.pause();
}

// Wider screens get the 16:9 poster to match the desktop cut.
if (heroVideo && window.matchMedia("(min-width: 720px)").matches) {
  heroVideo.poster = "assets/hero-poster-desktop.jpg";
}
