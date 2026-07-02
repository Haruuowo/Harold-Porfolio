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

  // Flash effect: brief overlay of the NEW theme color
  body.classList.add('theme-flash');

  // Small delay to let the flash render, then switch theme
  setTimeout(() => {
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

    // Fade out the flash
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

// TYPING
const words = ['Software Engineer', 'Full Stack Developer', 'Game Developer', 'UI / UX Enthusiast'];
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
const navLinks = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (pageYOffset >= s.offsetTop - 160) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

// HEADER SHADOW
const header = document.querySelector('header');
window.addEventListener('scroll', () =>
  header.style.boxShadow = scrollY > 50 ? '0 8px 32px rgba(0,0,0,.15)' : 'none');

// SCROLL REVEAL
const obs = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ABOUT — TYPEWRITER EFFECT
const aboutTyped = document.getElementById('aboutTyped');
const aboutTags  = document.getElementById('aboutTags');
const typedSegments = [
  { text: "I'm a Computer Science student at Holy Angel University, focused on ", bold: false },
  { text: "artificial intelligence, software engineering", bold: true },
  { text: ", and building things people actually use. I like turning ideas — AI tools, clean interfaces, or the occasional silly experiment — into real, working code.", bold: false }
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