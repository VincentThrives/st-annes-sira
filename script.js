/* ===================================================================
   St. Anne's School, Sira — interactions & data rendering
   =================================================================== */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  const OFFERINGS = [
    { emoji: "🧸", num: "Step 1", title: "Pre-Primary", desc: "Pre-KG to UKG" },
    { emoji: "✏️", num: "Step 2", title: "Primary", desc: "Grades 1 to 5" },
    { emoji: "📚", num: "Step 3", title: "Middle School", desc: "Grades 6 to 8" },
    { emoji: "🔬", num: "Step 4", title: "High School", desc: "Grades 9 to 10" },
    { emoji: "🎓", num: "Step 5", title: "Pre-University", desc: "PCMB · PCMC · EBAC" },
  ];

  const RANKS = [
    { medal: "🥇", pos: "3rd", name: "Sahana R Gowda", meta: "99.68% · 623 marks" },
    { medal: "🏅", pos: "5th", name: "Saba Kouser", meta: "99.36% · 621 marks" },
    { medal: "🏅", pos: "5th", name: "Inchara G M", meta: "99.36% · 621 marks" },
    { medal: "🏅", pos: "6th", name: "Keerthana R", meta: "99% · 619 marks" },
    { medal: "🏅", pos: "8th", name: "Divya K P", meta: "98.88% · 618 marks" },
  ];

  const FACILITIES = [
    { icon: "🏫", title: "Spacious Classrooms", desc: "Well-ventilated rooms creating a comfortable atmosphere for effective learning." },
    { icon: "📖", title: "Well-stocked Library", desc: "Encouraging reading habits and broadening every student's knowledge." },
    { icon: "🔬", title: "Science Laboratories", desc: "Physics, Chemistry & Biology labs for hands-on, practical learning." },
    { icon: "💻", title: "Computer Lab", desc: "Developing creativity, scientific thinking and digital literacy." },
    { icon: "💧", title: "Safe Aqua Water", desc: "Clean, hygienic campus with safe drinking water and proper sanitation." },
    { icon: "⚽", title: "Playground & Sports", desc: "Spacious grounds encouraging fitness, teamwork and sportsmanship." },
  ];

  const BOARD = [
    { name: "Sr. Kamala", role: "President / Chairperson", info: "Superior General, St. Anne's Generalate, Bangalore" },
    { name: "Sr. Arulmary", role: "Secretary", info: "Assistant Superior General, Generalate, Bangalore" },
    { name: "Sr. Juliet (Annamma)", role: "Treasurer", info: "Procurator, St. Anne's Generalate, Bangalore" },
    { name: "Sr. Saleena Palatty", role: "Member", info: "General Councilor, Generalate, Bangalore" },
    { name: "Sr. Virginia Rajakumari", role: "Member", info: "General Councilor, St. Anne's Convent, Bangalore" },
    { name: "Sr. Shiny Joseph", role: "Member", info: "General Councilor, Generalate, Bangalore" },
    { name: "Sr. Aneecia", role: "Member", info: "Principal, St. Anne's First Grade for Women" },
    { name: "Sr. Sharlet", role: "Member", info: "Principal, St. Mary's Girls High School" },
  ];

  // [year, schoolPct, topper, total, individualPct, rankNote?]
  const SSLC = [
    ["1987-88","89.47%","Smitha Honnesh","484","80.6%"],
    ["1988-89","76.47%","Kumar Swamy M T","458","76.33%"],
    ["1989-90","90%","Afzal-Ur-Rahman","460","76.76%"],
    ["1990-91","93.33%","Rupa Shree","522","87%"],
    ["1991-92","100%","Sumeeth S S","477","79.5%"],
    ["1992-93","100%","Arun R","526","87.66%"],
    ["1993-94","89.74%","Savitha G P","489","81.5%"],
    ["1994-95","94.87%","Sapna Ann George","578","93.71%"],
    ["1995-96","97.67%","Banuprakash S","487","79.42%"],
    ["1996-97","92.5%","Noor-Ul-Huda","515","82.40%"],
    ["1997-98","85.71%","Tejaswini K K","556","88.96%"],
    ["1998-99","79.59%","Sreelatha K K","564","90.24%"],
    ["1999-2000","91.67%","Keerthishree R","565","90.44%"],
    ["2000-2001","89.84%","Sharmila S P","584","94.56%"],
    ["2001-2002","82.66%","Kavyashree N G","591","89.44%"],
    ["2002-2003","78.00%","Sahana Shankar","559","96.96%"],
    ["2003-2004","89.18%","Yashaswini P","606","95.84%"],
    ["2004-2005","84.11%","Pavithra G","599","91.68%"],
    ["2005-2006","83.90%","Meghashree M","585","90.56%"],
    ["2006-2007","82.90%","Manjunath Patil S","588","96.80%"],
    ["2007-2008","85.85%","Manjuvani P","599","94.72%"],
    ["2008-2009","97.14%","Nayana S","573","95.84%"],
    ["2009-2010","99.02%","Shalini K V","566","90.56%"],
    ["2010-2011","97.70%","Deepthi V","605","96.80%"],
    ["2011-2012","100%","Poojashree S T","592","94.72%"],
    ["2012-2013","100%","Vedavathi G S","599","95.84%"],
    ["2013-2014","100%","Sachin M R","598","95.68%"],
    ["2014-2015","100%","Shalini C K","612","97.92%"],
    ["2014-2015","100%","Madhu Naik D S","612","97.92%"],
    ["2015-2016","94.96%","Navyashree M","606","96.96%"],
    ["2016-2017","94.65%","Divya K P","618","98.88%","State 8th Rank"],
    ["2017-2018","98.51%","Nisarga G R","615","98.40%"],
    ["2018-2019","94.69%","Chandregowda R G","615","98.40%"],
    ["2019-2020","99.32%","Karthik M","612","97.92%"],
    ["2020-2021","100%","Saba Kouser","621","99.36%","State 5th Rank"],
    ["2021-2022","100%","Sahana R Gowda","623","99.68%","State 3rd Rank"],
    ["2022-2023","98%","Namratha K","616","98.56%"],
    ["2023-2024","99%","Tilak Siddu Aras","612","97.92%"],
    ["2024-2025","94%","Inchara G M","621","99.36%","State 5th Rank"],
    ["2025-2026","100%","Keerthana R","619","99%","State 6th Rank"],
  ];

  const SCIENCE = [
    ["2016-2017","50%","Khadeera Banu","563","93.83%"],
    ["2017-2018","71.42%","Syeda Misba Anjum","552","92%"],
    ["2018-2019","75%","Syeda Naheeda Banu","529","88.16%"],
    ["2019-2020","100%","Ameena Banu","561","93.5%"],
    ["2020-2021","100%","Ayesha Firdose","591","98.5%"],
    ["2021-2022","80%","Amrutha K","576","96%"],
    ["2021-2022","80%","Indusri S","576","96%"],
    ["2022-2023","100%","Soujanya S","569","94.83%"],
    ["2023-2024","100%","Namratha M","583","97.16%"],
    ["2024-2025","97%","Sneha B S","555","92.5%"],
    ["2025-2026","100%","Chaithra","586","97.6%"],
  ];

  const COMMERCE = [
    ["2018-2019","91.6%","Kavyashree S","551","91.83%"],
    ["2019-2020","93.75%","Mamatha","558","93%"],
    ["2020-2021","100%","Deepashree S","596","99.33%"],
    ["2021-2022","87%","Kavya R P","585","97.5%"],
    ["2022-2023","100%","Prakruthi S","575","95.83%"],
    ["2023-2024","100%","Raveena Seervi","573","95.5%"],
    ["2024-2025","100%","Javeriya","561","93.5%"],
    ["2025-2026","100%","Khushi D","578","96.33%"],
  ];

  const RESULTS = { sslc: SSLC, science: SCIENCE, commerce: COMMERCE };

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const initials = (name) => name.replace(/[^A-Za-z ]/g, "").trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  /* ---------- Render: offerings ---------- */
  const offerGrid = $("#offerGrid");
  if (offerGrid) {
    offerGrid.innerHTML = OFFERINGS.map((o) => `
      <div class="offer reveal">
        <div class="offer__emoji">${o.emoji}</div>
        <div class="offer__num">${esc(o.num)}</div>
        <h3>${esc(o.title)}</h3>
        <p>${esc(o.desc)}</p>
      </div>`).join("");
  }

  /* ---------- Render: ranks ---------- */
  const ranksGrid = $("#ranksGrid");
  if (ranksGrid) {
    ranksGrid.innerHTML = RANKS.map((r) => `
      <div class="rank reveal">
        <div class="rank__medal">${r.medal}</div>
        <span class="rank__pos">${esc(r.pos)} Rank</span>
        <span class="rank__name">${esc(r.name)}</span>
        <span class="rank__meta">${esc(r.meta)}</span>
      </div>`).join("");
  }

  /* ---------- Render: facilities ---------- */
  const facGrid = $("#facGrid");
  if (facGrid) {
    facGrid.innerHTML = FACILITIES.map((f) => `
      <div class="fac reveal">
        <div class="fac__icon">${f.icon}</div>
        <div>
          <h3>${esc(f.title)}</h3>
          <p>${esc(f.desc)}</p>
        </div>
      </div>`).join("");
  }

  /* ---------- Render: board ---------- */
  const boardGrid = $("#boardGrid");
  if (boardGrid) {
    boardGrid.innerHTML = BOARD.map((b) => `
      <div class="bcard reveal">
        <div class="bcard__avatar">${esc(initials(b.name))}</div>
        <span class="bcard__role">${esc(b.role)}</span>
        <h3>${esc(b.name)}</h3>
        <p>${esc(b.info)}</p>
      </div>`).join("");
  }

  /* ---------- Render: results table ---------- */
  const resultsBody = $("#resultsBody");
  function renderResults(key) {
    if (!resultsBody) return;
    const rows = RESULTS[key] || [];
    resultsBody.innerHTML = rows.map((r) => {
      const rankBadge = r[5] ? `<span class="badge-rank">${esc(r[5])}</span>` : "";
      return `<tr>
        <td>${esc(r[0])}</td>
        <td class="pct">${esc(r[1])}</td>
        <td class="topper">${esc(r[2])}${rankBadge}</td>
        <td class="hide-sm">${esc(r[3])}</td>
        <td>${esc(r[4])}</td>
      </tr>`;
    }).join("");
    // re-observe any new reveal nodes (none in tbody, but keep safe)
  }
  renderResults("sslc");

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      renderResults(tab.dataset.tab);
    });
  });

  /* ---------- Mobile nav ---------- */
  const toggle = $("#navToggle");
  const links = $("#navLinks");
  const backdrop = document.createElement("div");
  backdrop.className = "nav-backdrop";
  document.body.appendChild(backdrop);

  function closeNav() {
    links.classList.remove("is-open");
    toggle.classList.remove("is-open");
    backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openNav() {
    links.classList.add("is-open");
    toggle.classList.add("is-open");
    backdrop.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }
  toggle.addEventListener("click", () => {
    links.classList.contains("is-open") ? closeNav() : openNav();
  });
  backdrop.addEventListener("click", closeNav);
  $$("#navLinks a").forEach((a) => a.addEventListener("click", closeNav));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeNav(); });

  /* ---------- Navbar shadow + back-to-top ---------- */
  const nav = $("#nav");
  const toTop = $("#toTop");
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 10);
    toTop.classList.toggle("is-visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Scroll-spy (active nav link) ---------- */
  const sections = $$("section[id]");
  const navAnchors = $$('#navLinks a[href^="#"]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navAnchors.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const statsWrap = $("#heroStats");
  function runCounters() {
    $$(".stat__num", statsWrap).forEach((el) => {
      const target = parseInt(el.dataset.count, 10) || 0;
      const suffix = el.dataset.suffix || "";
      const dur = 1400;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  if (statsWrap) {
    const once = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { runCounters(); obs.disconnect(); } });
    }, { threshold: 0.4 });
    once.observe(statsWrap);
  }

  /* ---------- Contact form ---------- */
  const form = $("#contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = $("#formNote");
      if (!form.checkValidity()) { form.reportValidity(); return; }
      note.hidden = false;
      form.reset();
      setTimeout(() => { note.hidden = true; }, 5000);
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
