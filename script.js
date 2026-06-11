/* ============================================================
   BITTER CHOCOLATE — GLOBAL SCRIPT (script.js)
   Connect this file to ALL pages.
   Includes: cursor, preloader, sticky header, dropdown nav,
             mobile menu, scroll reveal.
   ============================================================ */

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 CURSOR */
(function () {
  const isDesktop = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const cur  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!cur || !ring) return;
  if (!isDesktop) {
    cur.style.display  = 'none';
    ring.style.display = 'none';
    return;
  }
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });
  (function lerp() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(lerp);
  })();
  document.addEventListener('mouseover', e => {
    if (e.target.closest('a, button')) {
      cur.style.width   = '5px';
      cur.style.height  = '5px';
      ring.style.width  = '48px';
      ring.style.height = '48px';
    }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest('a, button')) {
      cur.style.width   = '10px';
      cur.style.height  = '10px';
      ring.style.width  = '32px';
      ring.style.height = '32px';
    }
  });
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 PRELOADER */
(function () {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('done');
    setTimeout(() => {
      if (preloader) preloader.style.display = 'none';
    }, 1100);
  }, 2800);
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 STICKY HEADER */
(function () {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 DROPDOWN NAV */
(function () {
  document.querySelectorAll('.nav-item').forEach(item => {
    const toggle = item.querySelector('a');
    const drop   = item.querySelector('.dropdown');
    if (!drop) return;
    toggle.addEventListener('click', e => {
      if (window.innerWidth <= 1350) {
        e.preventDefault();
        const open = drop.classList.contains('open');
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
        if (!open) drop.classList.add('open');
      }
    });
  });
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-item'))
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
  });
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 MOBILE MENU */
(function () {
  const hamburger = document.getElementById('hamburger');
  const navEl     = document.querySelector('nav');
  if (!hamburger || !navEl) return;

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = navEl.classList.toggle('mobile-open');
    hamburger.classList.toggle('active', open);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && !e.target.closest('.hamburger')) {
      navEl.classList.remove('mobile-open');
      hamburger.classList.remove('active');
    }
  });
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 SCROLL REVEAL */
(function () {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();



// Floating cart count
function updateCartFloat() {
  const count = document.getElementById('cartCount');
  if (!count) return;
  const items = JSON.parse(localStorage.getItem('bc_cart') || '[]');
  const total = items.reduce((s, i) => s + i.qty, 0);
  count.textContent = total;
  count.classList.toggle('visible', total > 0);
}
updateCartFloat();