/* =============================================
   JOHN HAROLD DOTON · PORTFOLIO
   script.js
============================================= */

// LOADER
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  loader.style.opacity = '0';
  setTimeout(() => loader.style.display = 'none', 500);
});

// TYPING EFFECT
const words = ['Software Engineer', 'Full Stack Developer', 'Game Developer', 'UI / UX Enthusiast'];
let wi = 0, li = 0, del = false;

function type() {
  const w = words[wi];
  const el = document.getElementById('typing');
  if (!el) return;
  el.textContent = del ? w.slice(0, --li) : w.slice(0, ++li);
  if (!del && li === w.length) { del = true; return setTimeout(type, 1800); }
  if (del && li === 0) { del = false; wi = (wi + 1) % words.length; }
  setTimeout(type, del ? 45 : 95);
}
type();

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
  header.style.boxShadow = scrollY > 50 ? '0 8px 32px rgba(0,0,0,.5)' : 'none');

// SCROLL REVEAL
const observer = new IntersectionObserver(entries =>
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a =>
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
  }));