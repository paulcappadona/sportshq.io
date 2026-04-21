/* Sports HQ — main.js */

(function () {
  'use strict';

  // ── Theme toggle ──
  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const THEME_KEY = 'sportshq-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
  }

  // Initialise from saved preference or system preference
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = html.classList.contains('dark');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // ── Sticky nav on scroll ──
  const nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Active nav link on scroll ──
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__links a');
  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  // ── Mobile hamburger ──
  const hamburger = document.getElementById('hamburger');
  let mobileMenuOpen = false;

  function buildMobileMenu() {
    const existing = document.getElementById('mobile-menu');
    if (existing) return existing;

    const menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.style.cssText = `
      position: fixed; top: 72px; left: 0; right: 0; bottom: 0;
      background: rgba(0,17,58,.97); z-index: 99;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 32px; backdrop-filter: blur(12px);
      transform: translateY(-100%); transition: transform .3s cubic-bezier(.4,0,.2,1);
    `;
    const links = ['#features', '#sports', '#venues', '#download'];
    const labels = ['Features', 'Sports', 'Venues', 'Download'];
    links.forEach((href, i) => {
      const a = document.createElement('a');
      a.href = href;
      a.textContent = labels[i];
      a.style.cssText = `
        color: white; font-family: 'Lexend', sans-serif; font-size: 1.5rem;
        font-weight: 700; text-decoration: none; text-transform: uppercase;
        letter-spacing: .06em; transition: color .2s;
      `;
      a.addEventListener('mouseover', () => a.style.color = '#bef500');
      a.addEventListener('mouseout', () => a.style.color = 'white');
      a.addEventListener('click', closeMobileMenu);
      menu.appendChild(a);
    });

    const cta = document.createElement('a');
    cta.href = '#download';
    cta.textContent = 'Get the App';
    cta.style.cssText = `
      background: #bef500; color: #384b00; font-family: 'Lexend', sans-serif;
      font-size: 1rem; font-weight: 700; padding: 14px 36px;
      border-radius: 100px; margin-top: 8px; text-decoration: none;
    `;
    cta.addEventListener('click', closeMobileMenu);
    menu.appendChild(cta);

    document.body.appendChild(menu);
    return menu;
  }

  function openMobileMenu() {
    mobileMenuOpen = true;
    const menu = buildMobileMenu();
    // Dark-theme-aware bg
    menu.style.background = html.classList.contains('dark')
      ? 'rgba(13,14,19,.97)' : 'rgba(0,17,58,.97)';
    menu.style.transform = 'translateY(0)';
    document.body.style.overflow = 'hidden';
    hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    hamburger.children[1].style.opacity = '0';
    hamburger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    const menu = document.getElementById('mobile-menu');
    if (menu) menu.style.transform = 'translateY(-100%)';
    document.body.style.overflow = '';
    hamburger.children[0].style.transform = '';
    hamburger.children[1].style.opacity = '';
    hamburger.children[2].style.transform = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenuOpen) closeMobileMenu();
    else openMobileMenu();
  });

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Intersection Observer — fade-in on scroll ──
  const style = document.createElement('style');
  style.textContent = `
    .fade-in { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
    .fade-in.visible { opacity: 1; transform: translateY(0); }
    .fade-in-delay-1 { transition-delay: .1s; }
    .fade-in-delay-2 { transition-delay: .2s; }
    .fade-in-delay-3 { transition-delay: .3s; }
  `;
  document.head.appendChild(style);

  const fadeTargets = [
    '.bento-card', '.step', '.sport-chip',
    '.venues__copy', '.venue-card',
    '.global__copy', '.download__copy', '.download__visual',
  ];
  fadeTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('fade-in');
      if (i % 3 === 1) el.classList.add('fade-in-delay-1');
      if (i % 3 === 2) el.classList.add('fade-in-delay-2');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ── Sport chips — click highlight ──
  document.querySelectorAll('.sport-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      if (this.classList.contains('sport-chip--more')) return;
      const isDark = html.classList.contains('dark');
      this.style.background = isDark ? 'rgba(190,245,0,.18)' : '#eefcb0';
      this.style.borderColor = '#9bc900';
      this.style.color = isDark ? '#bef500' : '#384b00';
      setTimeout(() => {
        this.style.background = '';
        this.style.borderColor = '';
        this.style.color = '';
      }, 600);
    });
  });

  // ── Animated counter for hero stats ──
  function animateCounter(el, target, suffix) {
    let current = 0;
    const step = target / (1200 / 16);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(timer);
    }, 16);
  }

  const heroSection = document.querySelector('.hero');
  let countersAnimated = false;
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersAnimated) {
      countersAnimated = true;
      const statNums = document.querySelectorAll('.stat__num');
      if (statNums[0]) animateCounter(statNums[0], 60, '+');
      if (statNums[1]) animateCounter(statNums[1], 15, '+');
    }
  }, { threshold: 0.5 });
  if (heroSection) heroObserver.observe(heroSection);

})();
