/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
const PHRASES = [
  'Frontend Developer',
  'Next.js Engineer',
  'UX-Focused Builder',
  'Component Architect',
  'AI App Builder',
];

const typedEl = document.getElementById('typed');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const SPEED_TYPE = 80;
const SPEED_DELETE = 40;
const PAUSE_END = 1800;
const PAUSE_START = 350;

function typeLoop() {
  const current = PHRASES[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, PAUSE_END);
      return;
    }
    setTimeout(typeLoop, SPEED_TYPE);
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
      setTimeout(typeLoop, PAUSE_START);
      return;
    }
    setTimeout(typeLoop, SPEED_DELETE);
  }
}

typeLoop();

/* ============================================================
   NAV — SCROLL SHRINK + HAMBURGER
   ============================================================ */
const navWrap = document.getElementById('navWrap');
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('navList');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navWrap.classList.add('scrolled');
  } else {
    navWrap.classList.remove('scrolled');
  }
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = navList.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', String(isOpen));
  hamburger.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
});

navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', '메뉴 열기');
  });
});

/* ============================================================
   REVEAL ON SCROLL (IntersectionObserver)
   ============================================================ */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   SKILL BAR ANIMATION
   ============================================================ */
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(fill => {
          fill.classList.add('animated');
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll('.skill-group').forEach(g => skillObserver.observe(g));

/* ============================================================
   ACTIVE NAV LINK ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-link--cta)');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--accent)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   HERO CODE CARD FLOAT ANIMATION
   ============================================================ */
const codeCard = document.querySelector('.hero-code-card');
if (codeCard) {
  let raf;
  let t = 0;
  function floatCard() {
    t += 0.008;
    const y = Math.sin(t) * 8;
    codeCard.style.transform = `translateY(${y}px)`;
    raf = requestAnimationFrame(floatCard);
  }
  floatCard();
}

/* ============================================================
   SMOOTH SCROLL POLYFILL (Safari fallback)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
