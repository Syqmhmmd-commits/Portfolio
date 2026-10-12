/* ============================================
   ANIMASI REVEAL SAAT SCROLL
   ============================================ */
const reveals = [...document.querySelectorAll('.reveal')];

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const idx = reveals.indexOf(entry.target);
    // stagger 80ms, reset tiap 4 item biar gak delay kelamaan
    entry.target.style.transitionDelay = `${(idx % 4) * 80}ms`;
    entry.target.classList.add('show');
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });

reveals.forEach(el => io.observe(el));

/* ============================================
   SMOOTH SCROLL NAVBAR + AUTO CLOSE MOBILE
   ============================================ */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.querySelector('.nav-toggle');

document.querySelectorAll('nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });

    // Tutup mobile menu
    navMenu?.classList.remove('open');
    navToggle?.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

/* ============================================
   HAMBURGER TOGGLE
   ============================================ */
navToggle?.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', String(open));
});

/* ============================================
   ACTIVE LINK SAAT SCROLL
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
   FETCH GITHUB STATS (opsional, gagal = fallback hardcoded)
   ============================================ */
(async () => {
  try {
    const res = await fetch('https://api.github.com/users/Syqmhmmd-commits');
    if (!res.ok) return;
    const data = await res.json();

    const reposEl = document.querySelector('[data-stat="repos"]');
    const followersEl = document.querySelector('[data-stat="followers"]');

    if (reposEl && data.public_repos != null) {
      reposEl.textContent = `${data.public_repos}+`;
    }
    if (followersEl && data.followers != null) {
      followersEl.textContent = data.followers;
    }
  } catch {
    // Diam aja — angka hardcoded tetap dipakai
  }
})();