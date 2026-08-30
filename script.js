// Header scroll effect
const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('header--scrolled', window.scrollY > 50);
});

// Mobile menu
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('menu-toggle--open');
  nav.classList.toggle('nav--open');
  document.body.style.overflow = nav.classList.contains('nav--open') ? 'hidden' : '';
});

nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('menu-toggle--open');
    nav.classList.remove('nav--open');
    document.body.style.overflow = '';
  });
});

// Scroll reveal
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('reveal--visible');
        }, index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('nav__link--active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('nav__link--active');
    }
  });
});
