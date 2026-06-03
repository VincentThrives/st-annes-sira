/* ===================================================================
   Shared layout for all pages — injects the banner (top bar + navbar)
   and the footer, then wires up mobile nav, scroll behaviour and
   back-to-top. Define the header/footer ONCE here; every page includes
   <div id="site-header"></div> and <div id="site-footer"></div>.
   =================================================================== */
(function () {
  "use strict";

  // Current page key, tolerant of clean URLs (/achievements) and .html (achievements.html)
  var current = (location.pathname.split("/").pop() || "").toLowerCase().replace(/\.html$/, "");
  if (current === "") current = "index";

  /* Nav model — page links go to their own .html, section links jump to
     index.html#anchor (works from any page). */
  var NAV = [
    { label: "Home", href: "index.html" },
    { label: "About", href: "about.html" },
    { label: "Academics", href: "index.html#offer" },
    { label: "Achievements", href: "achievements.html" },
    { label: "Results", href: "results.html" },
    { label: "Gallery", href: "gallery.html" },
    { label: "Facilities", href: "index.html#facilities" },
    { label: "Contact", href: "index.html#contact" },
  ];

  function isActive(href) {
    if (href.indexOf("#") !== -1) return false; // section links are never "active"
    var base = href.replace(/\.html$/, "");
    return base === current;
  }

  var navLinksHtml = NAV.map(function (n) {
    return '<a href="' + n.href + '"' + (isActive(n.href) ? ' class="is-active"' : "") + ">" + n.label + "</a>";
  }).join("");

  var headerHtml =
    '<div class="topbar"><div class="container topbar__inner">' +
      '<span class="topbar__item">📍 Sira, Tumakuru District, Karnataka</span>' +
      '<span class="topbar__item topbar__item--hide">✉️ stannes.sira@school.edu</span>' +
      '<span class="topbar__item">📞 +91 00000 00000</span>' +
    "</div></div>" +
    '<header class="nav" id="nav"><div class="container nav__inner">' +
      '<a href="index.html" class="brand" aria-label="St. Anne\'s School Home">' +
        '<span class="brand__mark">SA</span>' +
        '<span class="brand__text"><strong>St. Anne\'s School</strong><small>Sira &middot; Est. 1977</small></span>' +
      "</a>" +
      '<nav class="nav__links" id="navLinks">' +
        '<button class="nav__close" id="navClose" aria-label="Close menu">&times;</button>' +
        navLinksHtml +
        '<a href="index.html#contact" class="btn btn--gold nav__cta">Admissions</a>' +
      "</nav>" +
      '<button class="nav__toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    "</div></header>";

  var footerHtml =
    '<footer class="footer"><div class="container footer__inner">' +
      '<div class="footer__brand"><span class="brand__mark">SA</span>' +
        "<div><strong>St. Anne's School, Sira</strong>" +
        "<p>The first English medium school in Sira, committed to academic excellence and value-based learning since 1977.</p></div>" +
      "</div>" +
      '<div class="footer__links"><h4>Explore</h4>' +
        '<a href="about.html">About Us</a>' +
        '<a href="index.html#offer">Academics</a>' +
        '<a href="results.html">Results</a>' +
        '<a href="achievements.html">Achievements</a>' +
      "</div>" +
      '<div class="footer__links"><h4>Quick Links</h4>' +
        '<a href="index.html#facilities">Facilities</a>' +
        '<a href="gallery.html">Gallery</a>' +
        '<a href="about.html#board">Board of Members</a>' +
        '<a href="index.html#contact">Admissions</a>' +
        '<a href="index.html#contact">Contact</a>' +
      "</div>" +
    "</div>" +
    '<div class="footer__bar"><div class="container">' +
      '<span>&copy; <span id="year"></span> St. Anne\'s School, Sira. All rights reserved.</span>' +
      "<span>Run by St. Anne's Educational Society, Bangalore.</span>" +
      '<span class="footer__powered">Powered by <strong>Vincent Thrives Private Limited</strong></span>' +
    "</div></div></footer>";

  var headerMount = document.getElementById("site-header");
  if (headerMount) headerMount.innerHTML = headerHtml;
  var footerMount = document.getElementById("site-footer");
  if (footerMount) footerMount.innerHTML = footerHtml;

  /* Back-to-top button (shared) */
  var toTop = document.createElement("a");
  toTop.className = "to-top";
  toTop.id = "toTop";
  toTop.href = "#top";
  toTop.setAttribute("aria-label", "Back to top");
  toTop.innerHTML = "↑";
  document.body.appendChild(toTop);

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  var navClose = document.getElementById("navClose");
  var backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  function closeNav() {
    if (!links) return;
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openNav() {
    links.classList.add("is-open");
    toggle.classList.add("is-open");
    backdrop.classList.add("is-open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
  }
  if (toggle) toggle.addEventListener("click", function () {
    links.classList.contains("is-open") ? closeNav() : openNav();
  });
  if (navClose) navClose.addEventListener("click", closeNav);
  backdrop.addEventListener("click", closeNav);
  Array.prototype.forEach.call(document.querySelectorAll("#navLinks a"), function (a) {
    a.addEventListener("click", closeNav);
  });
  window.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
  window.addEventListener("resize", function () { if (window.innerWidth > 920) closeNav(); });

  /* ---- Navbar shadow + back-to-top visibility ---- */
  var nav = document.getElementById("nav");
  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (nav) nav.classList.toggle("is-scrolled", y > 10);
    toTop.classList.toggle("is-visible", y > 400);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
