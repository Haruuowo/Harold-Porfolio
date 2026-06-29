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

// THEME TOGGLE
const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  toggle.textContent = '☀️';
}
toggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  toggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

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