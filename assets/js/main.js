// St. Anne's School, Sira — shared interactions

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Hero background: looping campus video
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  const p = heroVideo.play();
  if (p && typeof p.catch === 'function') { p.catch(() => {}); }
}

// Click any sport/result card to highlight it within its section
document.addEventListener('click', (e) => {
  const card = e.target.closest('.sport-card, .result-card');
  if (!card) return;
  const grid = card.parentElement;
  const wasSelected = card.classList.contains('is-selected');
  grid.querySelectorAll('.is-selected').forEach(c => c.classList.remove('is-selected'));
  if (wasSelected) {
    grid.classList.remove('has-selection');
  } else {
    card.classList.add('is-selected');
    grid.classList.add('has-selection');
  }
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in'));
}

// Count-up for stats
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && counters.length) {
  const co = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const dur = 1400; const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const val = target * (1 - Math.pow(1 - p, 3));
        el.textContent = (Number.isInteger(target) ? Math.round(val) : val.toFixed(0)) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      co.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => co.observe(el));
}

// Footer year
const y = document.querySelector('[data-year]');
if (y) y.textContent = new Date().getFullYear();

// Contact form (demo only)
const form = document.querySelector('#enquiry-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const note = document.querySelector('#form-status');
    if (note) {
      note.style.display = 'block';
      note.textContent = 'Thank you! Your enquiry has been recorded. Our office will contact you soon.';
    }
    form.reset();
  });
}
