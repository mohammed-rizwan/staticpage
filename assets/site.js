// Shared JS for Deriny Technologies site
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const root = document.documentElement;
  const navLinks = document.querySelectorAll('.nav-links a');
  const navContainer = document.querySelector('.nav-links');
  const drawerCloseBtn = document.querySelector('.drawer-close');
  const menuToggle = document.querySelector('.menu-toggle');

  // Focus trap inside mobile nav
  let trapKeyHandler;
  const enableFocusTrap = () => {
    if (!navContainer) return;
    const focusables = navContainer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    trapKeyHandler = (e) => {
      if (!navContainer.classList.contains('open')) return;
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    navContainer.addEventListener('keydown', trapKeyHandler);
  };
  const disableFocusTrap = () => {
    if (trapKeyHandler && navContainer) navContainer.removeEventListener('keydown', trapKeyHandler);
    trapKeyHandler = null;
  };

  const closeNav = () => {
    if (!navContainer || !menuToggle) return;
    navContainer.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    navContainer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    disableFocusTrap();
    menuToggle.focus();
  };

  const updateNavAccessibility = () => {
    const isMobile = globalThis.innerWidth <= 900;
    if (!navContainer || !menuToggle) return;
    if (isMobile) {
      const isOpen = navContainer.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navContainer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    } else {
      navContainer.classList.remove('open');
      navContainer.setAttribute('aria-hidden', 'false');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('no-scroll');
      disableFocusTrap();
    }
  };
  updateNavAccessibility();
  globalThis.addEventListener('resize', updateNavAccessibility);

  const observerTargets = document.querySelectorAll('.reveal');
  const form = document.getElementById('contact-form');
  const statusEl = document.querySelector('.form-status');
  const parallaxItems = document.querySelectorAll('[data-parallax]');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeLabel = document.querySelector('[data-theme-label]');
  const themeMedia = globalThis.matchMedia('(prefers-color-scheme: light)');
  const prefersReducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const applyTheme = (mode, persist = true) => {
    const theme = mode === 'light' ? 'light' : 'dark';
    root.dataset.theme = theme;
    if (persist) localStorage.setItem('theme', theme); else localStorage.removeItem('theme');
    if (themeToggle) {
      const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      const icon = theme === 'dark' ? '☀️' : '🌙';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.textContent = icon;
    }
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
    }
  };

  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme || (themeMedia.matches ? 'light' : 'dark');
  applyTheme(initialTheme, Boolean(storedTheme));

  themeMedia.addEventListener('change', (e) => {
    const stored = localStorage.getItem('theme');
    if (stored) return;
    applyTheme(e.matches ? 'light' : 'dark', false);
  });

  navLinks.forEach(link => { 
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.slice(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = header ? header.offsetHeight : 80;
          const offset = targetId === 'home' ? headerHeight : 25;
          const targetPosition = targetElement.getBoundingClientRect().top + globalThis.pageYOffset - offset;
          
          // Update hash first to trigger scroll and hashchange
          history.pushState(null, null, '#' + targetId);
          
          // Perform smooth scroll
          globalThis.scrollTo({ top: targetPosition, behavior: 'smooth' });
          
          // Update active state and close menu with slight delay to let scroll start
          setActiveByHash();
          requestAnimationFrame(() => {
            setTimeout(closeNav, 50);
          });
        }
      }
    });
  });

  const setActiveByHash = () => {
    if (header) header.classList.toggle('scrolled', globalThis.scrollY > 12);
    const hash = location.hash.slice(1) || 'home';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = (a.getAttribute('href') || '').slice(1) || 'home';
      const isActive = href === hash;
      a.classList.toggle('active', isActive);
      if (isActive) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  };
  setActiveByHash();
  let lastScrollTime = 0;
  const scrollThrottle = 8; // Very light throttle for scroll updates
  globalThis.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime >= scrollThrottle) {
      lastScrollTime = now;
      setActiveByHash();
    }
  }, { passive: true });
  globalThis.addEventListener('hashchange', setActiveByHash);

  if (menuToggle && navContainer) {
    menuToggle.addEventListener('click', () => {
      const open = navContainer.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navContainer.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.classList.toggle('no-scroll', open);
      if (open) {
        enableFocusTrap();
        const focusables = navContainer.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const first = focusables[0] || navContainer.querySelector('.nav-list a');
        first?.focus();
      } else {
        disableFocusTrap();
        menuToggle.focus();
      }
    });
  }

  drawerCloseBtn?.addEventListener('click', closeNav);
  globalThis.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navContainer?.classList.contains('open')) closeNav(); });
  // Keep ARIA and state in sync on resize
  globalThis.addEventListener('resize', updateNavAccessibility);

  // Intersection Observer for reveals
  if (observerTargets.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observerTargets.forEach(el => revealObserver.observe(el));
  }

  // Pointer parallax for hero elements
  if (!prefersReducedMotion && parallaxItems.length) {
    let lastParallaxTime = 0;
    const parallaxThrottle = 16; // ~60fps throttle
    globalThis.addEventListener('pointermove', (e) => {
      const now = Date.now();
      if (now - lastParallaxTime < parallaxThrottle) return;
      lastParallaxTime = now;
      
      const x = (e.clientX / globalThis.innerWidth) - 0.5;
      const y = (e.clientY / globalThis.innerHeight) - 0.5;
      parallaxItems.forEach(el => {
        const depth = Number(el.dataset.parallax || 8);
        el.style.setProperty('--px', `${x * depth}px`);
        el.style.setProperty('--py', `${y * depth}px`);
      });
    });
  }

  // Portfolio filtering (only on pages with controls)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');
  if (filterButtons.length && projects.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projects.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? 'flex' : 'none';
        });
      });
    });
  }

  // Form validation (only on pages with the contact form)
  if (form && statusEl) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      statusEl.textContent = '';
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!name || !email || !message) { statusEl.textContent = 'Please fill in all fields.'; return; }
      if (!emailValid) { statusEl.textContent = 'Please use a valid email address.'; return; }
      statusEl.textContent = 'Sending...';
      setTimeout(() => { statusEl.textContent = 'Thanks! We will be in touch within one business day.'; form.reset(); }, 800);
    });
  }

  themeToggle?.addEventListener('click', () => {
    const current = root.dataset.theme || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark', true);
  });

  // Scroll to top button
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    globalThis.addEventListener('scroll', () => {
      if (globalThis.scrollY > 300) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    });

    scrollTopBtn.addEventListener('click', () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = homeSection.getBoundingClientRect().top + globalThis.pageYOffset - headerHeight;
        globalThis.scrollTo({ top: targetPosition, behavior: 'smooth' });
        history.pushState(null, null, '#home');
      } else {
        globalThis.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});