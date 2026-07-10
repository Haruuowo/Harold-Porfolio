/* =============================================
   JOHN HAROLD DOTON · PORTFOLIO
   script.js — Dark Edition + Light Mode
============================================= */

// LOADER
window.addEventListener('load', () => {
  const l = document.getElementById('loader');
  l.style.opacity = '0';
  setTimeout(() => l.style.display = 'none', 500);
});

// THEME DROPDOWN — Dark / Day / Sunset
const dropdown   = document.getElementById('themeDropdown');
const toggle      = document.getElementById('themeToggle');
const menu        = document.getElementById('themeMenu');
const themeIconEl = document.getElementById('themeIcon');
const themeLabelEl= document.getElementById('themeLabel');
if (themeLabelEl) themeLabelEl.style.minWidth = '90px';
const themeMeta = {
  dark:   { icon: '●', label: 'Night mode' },
  white:  { icon: '○', label: 'Day mode' },
  sunset: { icon: '◐', label: 'Sunset mode' }
};

function setTheme(theme) {
  const body = document.body;
  if (!themeMeta[theme]) theme = 'dark'; // guard against bad/stale localStorage values

  // Flash effect: brief overlay of the NEW theme color
  body.classList.add('theme-flash');

  // Small delay to let the flash render, then switch theme
  setTimeout(() => {
    try {
      body.classList.remove('theme-white', 'theme-sunset');
      if (theme === 'white') body.classList.add('theme-white');
      if (theme === 'sunset') body.classList.add('theme-sunset');

      // Add smooth transition class
      body.classList.add('theme-switching');

      const meta = themeMeta[theme];
      if (themeIconEl) themeIconEl.textContent = meta.icon;
      if (themeLabelEl) themeLabelEl.textContent = meta.label;

      menu?.querySelectorAll('.theme-dd-option').forEach(opt =>
        opt.classList.toggle('active', opt.dataset.theme === theme));

      localStorage.setItem('theme', theme);
    } catch (err) {
      console.error('setTheme error:', err);
    }

    // Fade out the flash — runs no matter what happened above
    setTimeout(() => {
      body.classList.remove('theme-flash');
      body.classList.add('theme-flash-out');

      setTimeout(() => {
        body.classList.remove('theme-flash-out', 'theme-switching');
      }, 400);
    }, 150);
  }, 50);
}

function closeDropdown() {
  dropdown?.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}

toggle?.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = dropdown.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('.theme-dd-option').forEach(opt => {
  opt.addEventListener('click', () => {
    setTheme(opt.dataset.theme);
    closeDropdown();
  });
});

document.addEventListener('click', (e) => {
  if (dropdown && !dropdown.contains(e.target)) closeDropdown();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDropdown();
});

setTheme(localStorage.getItem('theme') || 'dark');

// HAMBURGER — MOBILE NAV DRAWER
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

function openMobileNav() {
  if (!mobileNav || !mobileNavOverlay) return;
  hamburgerBtn?.classList.add('open');
  mobileNav.classList.add('open');
  mobileNavOverlay.classList.add('open');
  hamburgerBtn?.setAttribute('aria-expanded', 'true');
  mobileNav.setAttribute('aria-hidden', 'false');
  document.body.classList.add('nav-open');
  // Force reflow to ensure transition triggers
  void mobileNav.offsetWidth;
}

function closeMobileNav() {
  if (!mobileNav || !mobileNavOverlay) return;
  hamburgerBtn?.classList.remove('open');
  mobileNav.classList.remove('open');
  mobileNavOverlay.classList.remove('open');
  hamburgerBtn?.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('nav-open');
}

function toggleMobileNav(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  if (mobileNav?.classList.contains('open')) closeMobileNav();
  else openMobileNav();
}

// Multiple event types for maximum compatibility
hamburgerBtn?.addEventListener('touchend', toggleMobileNav, { passive: false });
hamburgerBtn?.addEventListener('click', toggleMobileNav);

// Close on overlay tap
function onOverlayTap(e) {
  if (e) e.preventDefault();
  closeMobileNav();
}
mobileNavOverlay?.addEventListener('touchend', onOverlayTap, { passive: false });
mobileNavOverlay?.addEventListener('click', onOverlayTap);

// Close on nav link click
mobileNav?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', (e) => {
    closeMobileNav();
  });
});

// Escape to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileNav();
});

// Close on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 860) closeMobileNav();
});

// SCRAMBLE CHARS (shared by nav links + hero name)
const scrambleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
function scrambleInto(el, originalText) {
  let iterations = 0;
  clearInterval(el.dataset.scrambleInterval);
  const interval = setInterval(() => {
    el.textContent = originalText
      .split('')
      .map((char, i) => (i < iterations ? originalText[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]))
      .join('');
    if (iterations >= originalText.length) clearInterval(interval);
    iterations += 1 / 3;
  }, 30);
  el.dataset.scrambleInterval = interval;
}

// HERO NAME — TYPE-IN THEN IDLE FLICKER + HOVER SCRAMBLE
const heroNameEl  = document.getElementById('heroName');
const heroLine1El = document.getElementById('heroNameLine1');
const heroLine2El = document.getElementById('heroNameLine2');
if (heroNameEl && heroLine1El && heroLine2El) {
  const nameLines = ['John Harold', 'Doton'];
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  heroLine1El.parentElement.appendChild(cursor); // lives at end of the wrapping span initially

  function typeName() {
    let lineIndex = 0, charIndex = 0;
    const targets = [heroLine1El, heroLine2El];

    function placeCursorAfter(target) {
      target.insertAdjacentElement('afterend', cursor);
    }
    placeCursorAfter(heroLine1El);

    function step() {
      if (lineIndex >= nameLines.length) {
        setTimeout(() => {
          cursor.remove();
          heroNameEl.classList.add('name-flicker');
        }, 600);
        return;
      }
      const line = nameLines[lineIndex];
      const target = targets[lineIndex];
      if (charIndex < line.length) {
        target.textContent += line[charIndex];
        charIndex++;
        setTimeout(step, 55 + Math.random() * 40);
      } else {
        lineIndex++;
        charIndex = 0;
        if (lineIndex < nameLines.length) placeCursorAfter(targets[lineIndex]);
        setTimeout(step, 220);
      }
    }
    step();
  }
  // Slight delay so it kicks off right after the loader clears
  setTimeout(typeName, 550);

    heroLine1El.addEventListener('click', () => {
    scrambleInto(heroLine1El, 'John Harold');
    scrambleInto(heroLine2El, 'Doton');
  });
    heroLine2El.addEventListener('click', () => {
    scrambleInto(heroLine1El, 'John Harold');
    scrambleInto(heroLine2El, 'Doton');
  });
}

// TYPING
const words = ['Software Engineer', 'Full Stack Developer', 'AI/ML Engineer', "Mobile App Developer"];
let wi = 0, li = 0, del = false;
function tick() {
  const w = words[wi], el = document.getElementById('typing');
  if (!el) return;
  el.textContent = del ? w.slice(0, --li) : w.slice(0, ++li);
  if (!del && li === w.length) { del = true; return setTimeout(tick, 1800); }
  if (del && li === 0) { del = false; wi = (wi + 1) % words.length; }
  setTimeout(tick, del ? 45 : 95);
}
tick();

// BACK TO TOP
const btn = document.getElementById('backToTop');
window.addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 450));
btn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Keep the button clear of mobile browser toolbars (address bar / bottom nav)
// that env(safe-area-inset-bottom) doesn't account for, by tracking the real
// visible viewport size.
function updateViewportOffset() {
  const vv = window.visualViewport;
  if (!vv) return;
  const covered = window.innerHeight - (vv.height + vv.offsetTop);
  document.documentElement.style.setProperty('--vvb', Math.max(0, covered) + 'px');
}
if (window.visualViewport) {
  visualViewport.addEventListener('resize', updateViewportOffset);
  visualViewport.addEventListener('scroll', updateViewportOffset);
  updateViewportOffset();
}

// ACTIVE NAV
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a, .mobile-nav a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (pageYOffset >= s.offsetTop - 160) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

// HEADER SHADOW
const header = document.querySelector('header');
window.addEventListener('scroll', () =>
  header.style.boxShadow = scrollY > 50 ? '0 8px 32px rgba(0,0,0,.15)' : 'none');

// HERO — VHS TRACKING GLITCH
const heroEl = document.getElementById('hero');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroEl && !prefersReducedMotion) {
  function scheduleGlitch() {
    const delay = 4000 + Math.random() * 5000; // every ~4–9s
    setTimeout(() => {
      heroEl.classList.add('vhs-glitch');
      setTimeout(() => heroEl.classList.remove('vhs-glitch'), 400);
      scheduleGlitch();
    }, delay);
  }
  scheduleGlitch();
}

// SCROLL REVEAL
const obs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// SKILLS — PIXELATE RESOLVE
const skillsCols = document.querySelector('.skills-cols');
if (skillsCols) {
  const skillEls = skillsCols.querySelectorAll('.skill');
  const skillsObs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      skillEls.forEach((el, i) => {
        if (!prefersReducedMotion) {
          el.style.transition = 'opacity .3s ease, filter .4s steps(4), transform .4s steps(4)';
          el.style.transitionDelay = (i * 0.05) + 's';
        }
        el.style.transform = 'scale(1)';
        el.style.filter = 'blur(0) contrast(1)';
      });
      skillsCols.classList.add('pixelate-in');
      setTimeout(() => {
        skillEls.forEach(el => {
          el.style.transition = '';
          el.style.transitionDelay = '';
          el.style.transform = '';
          el.style.filter = '';
        });
      }, 400 + skillEls.length * 50 + 250);
      observer.disconnect();
    });
  }, { threshold: 0.15 });
  skillsObs.observe(skillsCols);
}

// ABOUT — TYPEWRITER EFFECT
const aboutTyped = document.getElementById('aboutTyped');
const aboutTags  = document.getElementById('aboutTags');
const typedSegments = [
  { text: "HI! im Harold, I'm a Computer Science student at Holy Angel University, focused on ", bold: true },
  { text: "artificial intelligence, software engineering", bold: true },
  { text: ", and building things people actually use. I like turning ideas AI tools, clean interfaces, I occasionally like creating silly projects that i could turn into real working code.", bold: true }
];

function typeAbout() {
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  aboutTyped.appendChild(cursor);

  let segIndex = 0, charIndex = 0;

  function step() {
    if (segIndex >= typedSegments.length) {
      setTimeout(() => {
        cursor.remove();
        aboutTags?.classList.add('stagger-in');
      }, 500);
      return;
    }
    const seg = typedSegments[segIndex];
    if (charIndex < seg.text.length) {
      const ch = document.createTextNode(seg.text[charIndex]);
      if (seg.bold) {
        let strongEl = aboutTyped.querySelector('strong.typing-current');
        if (!strongEl) {
          strongEl = document.createElement('strong');
          strongEl.className = 'typing-current';
          aboutTyped.insertBefore(strongEl, cursor);
        }
        strongEl.appendChild(ch);
      } else {
        aboutTyped.insertBefore(ch, cursor);
      }
      charIndex++;
      setTimeout(step, 7 + Math.random() * 10);
    } else {
      aboutTyped.querySelector('strong.typing-current')?.classList.remove('typing-current');
      segIndex++;
      charIndex = 0;
      setTimeout(step, 30);
    }
  }
  step();
}

const aboutWrap = document.getElementById('aboutTypedWrap');
if (aboutWrap) {
  const aboutObs = new IntersectionObserver((entries, observer) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        typeAbout();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  aboutObs.observe(aboutWrap);
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  }));

// CONTACT FORM
document.getElementById('contactForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmsg').value.trim();
  const status  = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields.';
    status.className = 'form-status error';
    return;
  }

  const sub  = encodeURIComponent((subject || 'Portfolio Contact') + ' — from ' + name);
  const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
  window.location.href = 'mailto:harolddoton@gmail.com?subject=' + sub + '&body=' + body;

  status.textContent = 'Opening your mail app...';
  status.className = 'form-status success';
  setTimeout(() => { status.textContent = ''; this.reset(); }, 3000);
});

// ============================================================
// CUSTOM CURSOR + INTERACTIVITY
// ============================================================

const cursorDot = document.createElement('div');
cursorDot.id = 'cursor-dot';
document.body.appendChild(cursorDot);

const cursorRing = document.createElement('div');
cursorRing.id = 'cursor-ring';
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let isMoving = false;
let moveTimeout;

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Move dot instantly
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';

  // Particle trail
  if (isMoving && Math.random() > 0.85) {
    createParticle(mouseX, mouseY);
  }

  isMoving = true;
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => { isMoving = false; }, 100);
});

// Smooth ring follow
function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

// Click states
document.addEventListener('mousedown', () => {
  cursorDot.classList.add('click');
  cursorRing.classList.add('click');
});
document.addEventListener('mouseup', () => {
  cursorDot.classList.remove('click');
  cursorRing.classList.remove('click');
});

// Hover detection for interactive elements
const hoverTargets = 'a, button, .btn-solid, .btn-line, .skill, .tag, .project-card, .project-featured-img, .csoc, input, textarea, .theme-dd-option, .hamburger';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.classList.add('hover');
    cursorRing.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('hover');
    cursorRing.classList.remove('hover');
  });
});

// Particle trail
function createParticle(x, y) {
  const p = document.createElement('div');
  p.className = 'cursor-particle';
  const size = 2 + Math.random() * 4;
  p.style.width = size + 'px';
  p.style.height = size + 'px';
  p.style.left = x + 'px';
  p.style.top = y + 'px';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 600);
}

// Magnetic buttons
document.querySelectorAll('.btn-solid, .btn-line, .btn-send, .csoc').forEach(btn => {
  btn.classList.add('magnetic');
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Hero parallax on scroll
if (heroEl) {
  const heroBg = document.createElement('div');
  heroBg.id = 'hero-bg';
  heroEl.insertBefore(heroBg, heroEl.firstChild);

  if (!prefersReducedMotion) {
    function updateHeroParallax() {
      const heroHeight = heroEl.offsetHeight || 1;
      const maxShift = heroHeight * 0.06; // stays well inside the 8% bleed buffer
      const progress = Math.min(1, Math.max(0, scrollY / heroHeight));
      heroBg.style.transform = `translateY(${-progress * maxShift}px)`;
    }
    window.addEventListener('scroll', updateHeroParallax);
    updateHeroParallax();
  }
}

// Text scramble effect for nav links
document.querySelectorAll('nav a').forEach(link => {
  const originalText = link.textContent;
  link.addEventListener('mouseenter', () => scrambleInto(link, originalText));
  link.addEventListener('mouseleave', () => {
    clearInterval(link.dataset.scrambleInterval);
    link.textContent = originalText;
  });
});
// Project list item hover - subtle parallax on the image
// (CSS handles most of it, this adds a tiny bit of JS magic)
document.querySelectorAll('.project-list-item').forEach(item => {
  const imgWrap = item.querySelector('.project-list-img-wrap');
  if (!imgWrap) return;

  item.addEventListener('mousemove', (e) => {
    const rect = imgWrap.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const img = imgWrap.querySelector('img');
    if (img) {
      img.style.transform = `scale(1.06) translate(${x * -6}px, ${y * -4}px)`;
    }
  });

  item.addEventListener('mouseleave', () => {
    const img = imgWrap.querySelector('img');
    if (img) {
      img.style.transform = '';
    }
  });
});