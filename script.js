/* Glow Sky Candles — interacciones (sin librerías) */

const navbar = document.getElementById('navbar');
const heroBg = document.querySelector('.hero-bg');

/* Navbar + parallax del hero en un solo listener, con requestAnimationFrame
   para que todo sea transform/opacity y no haya trabajo extra por frame */
let ticking = false;

function onScroll() {
  const y = window.scrollY;

  navbar.classList.toggle('scrolled', y > 80);

  if (heroBg) {
    const offset = Math.min(y * 0.25, 120);
    heroBg.style.transform = 'translateY(' + offset + 'px)';
  }

  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

onScroll();

/* Desplazamiento suave para todos los enlaces ancla */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

/* Revelado al hacer scroll: .reveal sube 40px y aparece,
   con retraso opcional vía data-delay (en ms) */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
    el.classList.add('visible');
    el.addEventListener('transitionend', () => {
      el.style.transitionDelay = '0ms';
    }, { once: true });
    observer.unobserve(el);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
