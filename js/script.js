/* =============================================
   JOHN HAROLD DOTON · PORTFOLIO
   script.js — Dark Edition
============================================= */

// LOADER
window.addEventListener('load', () => {
  const l = document.getElementById('loader');
  l.style.opacity = '0';
  setTimeout(() => l.style.display = 'none', 500);
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
  header.style.boxShadow = scrollY > 50 ? '0 8px 32px rgba(0,0,0,.6)' : 'none');

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