// script.js

// ====== AOS initialization ======
AOS.init({
  duration: 800,
  once: true,
  offset: 50,
  easing: 'ease-out-cubic'
});

// ====== Theme toggle (dark/light) ======
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  } else {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});

// ====== Scroll progress indicator ======
window.addEventListener('scroll', () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollable) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';
});

// ====== Typing animation (hero) ======
const typingElement = document.getElementById('typing');
const phrases = [
  'Enterprise Application Developer',
  'Oracle 19c & APEX 24 Certified Professional',
  'Automation Specialist (Power Platform & VBA)',
  'IT Systems & Workflow Architect'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 200);
  } else {
    setTimeout(typeEffect, isDeleting ? 60 : 100);
  }
}
document.addEventListener('DOMContentLoaded', typeEffect);

// ====== smooth scrolling navigation (with offset for sticky) ======
document.querySelectorAll('.nav-link, .navbar-brand, .btn-top').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 70; // sticky height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ behavior: 'smooth', top });
      }
    }
  });
});

// ====== Particles background (light/dark aware) ======
let particlesInitialized = false;
function initParticles() {
  if (particlesInitialized) return;
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: '#6366f1' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#a78bfa', opacity: 0.3, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: true, straight: false }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } }
    }
  });
  particlesInitialized = true;
}
// initialize after DOM ready
window.addEventListener('load', initParticles);

// ====== Contact form dummy preventDefault =