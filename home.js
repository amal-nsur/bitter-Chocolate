/* ============================================================
   BITTER CHOCOLATE — HOME SCRIPT (home.js)
   Connect this file ONLY to index.html alongside script.js.
   Includes: contact chips, FAQ accordion, image strip carousel,
             products carousel, why us stagger.
   ============================================================ */

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 CONTACT REASON CHIPS */
(function () {
  const chips = document.querySelectorAll('.reason-chip');
  if (!chips.length) return;
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const otherExpand = document.getElementById('otherExpand');
      if (!otherExpand) return;
      if (chip.id === 'chipOther') {
        otherExpand.classList.add('show');
        const input = document.getElementById('otherInput');
        if (input) input.focus();
      } else {
        otherExpand.classList.remove('show');
      }
    });
  });
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 FAQ ACCORDION */
(function () {
  const btns = document.querySelectorAll('.faq-q');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 IMAGE STRIP CAROUSEL */
(function () {
  const track = document.getElementById('stripTrack');
  const dots  = document.querySelectorAll('.strip-dot');
  const cards = document.querySelectorAll('.strip-card');
  if (!track || !cards.length) return;

  let current = 0;

  const visCount = () =>
    window.innerWidth < 700 ? 1 : window.innerWidth < 1024 ? 3 : 4;

  function goTo(idx) {
    const max = Math.max(0, cards.length - visCount());
    current = Math.max(0, Math.min(idx, max));
    const w = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${current * w}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  let startX = 0, isDrag = false;
  track.addEventListener('mousedown', e => { startX = e.clientX; isDrag = true; });
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; isDrag = true; }, { passive: true });
  window.addEventListener('mouseup', e => {
    if (!isDrag) return;
    isDrag = false;
    const dx = e.clientX - startX;
    if (dx < -40) goTo(current + 1);
    else if (dx > 40) goTo(current - 1);
  });
  window.addEventListener('touchend', e => {
    if (!isDrag) return;
    isDrag = false;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx < -40) goTo(current + 1);
    else if (dx > 40) goTo(current - 1);
  });
  window.addEventListener('resize', () => goTo(current));
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 PRODUCTS CAROUSEL */
(function () {
  const track    = document.getElementById('prodTrack');
  const prevBtn  = document.getElementById('prodPrev');
  const nextBtn  = document.getElementById('prodNext');
  const dotsWrap = document.getElementById('prodDots');
  if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

  const cards = track.querySelectorAll('.prod-card');
  let cur = 0;

  const visCount    = () => window.innerWidth < 600 ? 1 : window.innerWidth < 900 ? 3 : 4;
  const totalSlides = () => Math.ceil(cards.length / visCount());

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < totalSlides(); i++) {
      const d = document.createElement('button');
      d.className = 'prod-dot' + (i === cur ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(idx) {
    const max = totalSlides() - 1;
    cur = Math.max(0, Math.min(idx, max));
    const w = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${cur * visCount() * w}px)`;
    dotsWrap.querySelectorAll('.prod-dot').forEach((d, i) =>
      d.classList.toggle('active', i === cur)
    );
  }

  prevBtn.addEventListener('click', () => goTo(cur - 1));
  nextBtn.addEventListener('click', () => goTo(cur + 1));

  let sx = 0, drag = false;
  track.addEventListener('mousedown', e => { sx = e.clientX; drag = true; });
  track.addEventListener('touchstart', e => { sx = e.touches[0].clientX; drag = true; }, { passive: true });
  window.addEventListener('mouseup', e => {
    if (!drag) return;
    drag = false;
    const dx = e.clientX - sx;
    if (dx < -40) goTo(cur + 1);
    else if (dx > 40) goTo(cur - 1);
  });
  window.addEventListener('touchend', e => {
    if (!drag) return;
    drag = false;
    const dx = e.changedTouches[0].clientX - sx;
    if (dx < -40) goTo(cur + 1);
    else if (dx > 40) goTo(cur - 1);
  });
  window.addEventListener('resize', () => { buildDots(); goTo(0); });

  buildDots();
})();

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 WHY US STAGGER */
(function () {
  const items = document.querySelectorAll('.whyus-item');
  if (!items.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  items.forEach(el => obs.observe(el));
})();