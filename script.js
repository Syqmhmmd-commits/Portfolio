/* ============================================
   SCROLL PROGRESS BAR
   ============================================ */
const progress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = pct + '%';
}, { passive: true });

/* ============================================
   CURSOR GLOW
   ============================================ */
const glow = document.getElementById('cursorGlow');
let gx = 0, gy = 0, cx = 0, cy = 0;
window.addEventListener('mousemove', (e) => { gx = e.clientX; gy = e.clientY; });
function animateGlow() {
  cx += (gx - cx) * 0.15;
  cy += (gy - cy) * 0.15;
  glow.style.left = cx + 'px';
  glow.style.top = cy + 'px';
  requestAnimationFrame(animateGlow);
}
if (window.matchMedia('(hover: hover)').matches) animateGlow();

/* ============================================
   NAVBAR SCROLL SHADOW
   ============================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ============================================
   TYPING ANIMATION (HERO)
   ============================================ */
const phrases = [
  './run --open-source',
  'make -j$(nproc)',
  'git commit -m "optimize"',
  'bbrv3 --enable',
  'stay curious.'
];
const typedEl = document.getElementById('typed');
let pi = 0, ci = 0, deleting = false;

function type() {
  const current = phrases[pi];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++ci);
    if (ci === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --ci);
    if (ci === 0) {
      deleting = false;
      pi = (pi + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 40 : 80);
}
type();

/* ============================================
   REVEAL ANIMATION (SCROLL)
   ============================================ */
const reveals = [...document.querySelectorAll('.reveal')];
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const idx = reveals.indexOf(entry.target);
    entry.target.style.transitionDelay = `${(idx % 4) * 80}ms`;
    entry.target.classList.add('show');
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

/* ============================================
   COUNTER ANIMATION (STATS)
   ============================================ */
function runCounter(el, target) {
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 40));
  const tick = () => {
    current += step;
    if (current >= target) { el.textContent = target + '+'; return; }
    el.textContent = current;
    requestAnimationFrame(tick);
  };
  tick();
}

const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    runCounter(el, target);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(c => counterIO.observe(c));

/* ============================================
   FETCH GITHUB STATS — AUTO UPDATE + CACHE
   ============================================ */
(async () => {
  const CACHE_KEY = 'gh_repos_count';
  const CACHE_TTL = 1000 * 60 * 60; // 1 jam

  // Cek cache dulu
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const { count, time } = JSON.parse(cached);
      if (Date.now() - time < CACHE_TTL) {
        const reposEl = document.querySelector('[data-stat="repos"]');
        if (reposEl) {
          reposEl.dataset.target = count;
          reposEl.textContent = count + '+';
        }
        return;
      }
    } catch {}
  }

  // Fetch dari GitHub API
  try {
    const res = await fetch('https://api.github.com/users/Syqmhmmd-commits');
    if (!res.ok) return;
    const data = await res.json();

    if (data.public_repos != null) {
      const reposEl = document.querySelector('[data-stat="repos"]');
      if (reposEl) {
        reposEl.dataset.target = data.public_repos;
        reposEl.textContent = data.public_repos + '+';
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        count: data.public_repos,
        time: Date.now()
      }));
    }
  } catch {}
})();

/* ============================================
   MOBILE MENU + SMOOTH SCROLL
   ============================================ */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.querySelector('.nav-toggle');

document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

/* ============================================
   ACTIVE LINK ON SCROLL
   ============================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');
const navIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -60% 0px' });
sections.forEach(s => navIO.observe(s));

/* ============================================
   OBFUSCATED EMAIL
   ============================================ */
document.querySelector('.email-link')?.addEventListener('click', (e) => {
  e.preventDefault();
  const el = e.currentTarget;
  location.href = `mailto:${el.dataset.user}@${el.dataset.domain}`;
});

/* ============================================
   BACK TO TOP
   ============================================ */
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  toTop.classList.toggle('show', window.scrollY > 500);
}, { passive: true });
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================
   FOOTER YEAR
   ============================================ */
document.getElementById('year').textContent = new Date().getFullYear();
