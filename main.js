/* ============================================
   HARRY VU PORTFOLIO — main.js
   Shared across all pages
   ============================================ */

/* ---- Fade-in on scroll (Intersection Observer) ---- */
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  const obs = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  els.forEach(el => obs.observe(el));
})();

/* ---- Nav active state ---- */
(function initNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ---- Mobile hamburger ---- */
(function initHamburger() {
  const btn = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.nav__mobile');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

/* ---- Count-up animation ---- */
function countUp(el, target, suffix, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString() + suffix;
    if (start >= target) clearInterval(timer);
  }, 16);
}

(function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        countUp(el, target, suffix, 1200);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
})();

/* ---- Performance bars (metrics page) ---- */
(function initPerfBars() {
  const fills = document.querySelectorAll('.perf-bar-fill');
  if (!fills.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const fill = e.target;
        fill.style.width = fill.dataset.pct + '%';
        obs.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });
  fills.forEach(f => obs.observe(f));
})();

/* ---- Video gallery filters (portfolio page) ---- */
(function initFilters() {
  const formatTabs = document.querySelectorAll('[data-filter-format]');
  const nicheTabs  = document.querySelectorAll('[data-filter-niche]');
  const cards      = document.querySelectorAll('.video-card');
  if (!formatTabs.length) return;

  let activeFormat = 'all';
  let activeNiche  = 'all';

  function applyFilters() {
    cards.forEach(card => {
      const fmatch = activeFormat === 'all' || card.dataset.format === activeFormat;
      const nmatch = activeNiche  === 'all' || card.dataset.niche  === activeNiche;
      card.style.display = (fmatch && nmatch) ? '' : 'none';
    });
  }

  formatTabs.forEach(tab => tab.addEventListener('click', () => {
    formatTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeFormat = tab.dataset.filterFormat;
    applyFilters();
  }));

  nicheTabs.forEach(tab => tab.addEventListener('click', () => {
    nicheTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeNiche = tab.dataset.filterNiche;
    applyFilters();
  }));
})();

/* ---- Contact form ---- */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const success = document.getElementById('form-success');
    if (success) success.classList.add('visible');
    form.reset();
    // === TO DO: wire up to Formspree, Netlify Forms, or your backend here ===
  });
})();
