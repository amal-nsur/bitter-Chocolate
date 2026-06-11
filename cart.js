window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        location.reload();
    }
});



/* ============================================================
   BITTER CHOCOLATE — CART SCRIPT (cart.js)
   Connect this file ONLY to cart.html alongside script.js.
   Cart data is stored in localStorage so it persists across
   pages in the same session.
   ============================================================ */

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 CART STORE */
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('bc_cart') || '[]');
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('bc_cart', JSON.stringify(cart));
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 HELPERS */
function fmt(n) {
  return `$${n.toFixed(2)}`;
}

function starsSVG() {
  return Array.from({ length: 5 }, () => `
    <svg viewBox="0 0 24 24" fill="#C89B5F" stroke="none" width="11" height="11">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`
  ).join('');
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 RENDER */
function renderCart() {
  const cart        = getCart();
  const list        = document.getElementById('cartList');
  const emptyEl     = document.getElementById('cartEmpty');
  const continueEl  = document.getElementById('cartContinue');
  const checkoutBtn = document.getElementById('checkoutBtn');

  list.innerHTML = '';

  if (!cart.length) {
    emptyEl.style.display    = 'flex';
    continueEl.style.display = 'none';
    checkoutBtn.classList.add('disabled');
    updateSummary([]);
    return;
  }

  emptyEl.style.display    = 'none';
  continueEl.style.display = 'block';
  checkoutBtn.classList.remove('disabled');

  cart.forEach((item, idx) => {
    const row = document.createElement('div');
    row.className = 'cart-row reveal';
    row.innerHTML = `
      <div class="cr-img">
        <img
          src="products/p${item.id}.png"
          alt="${item.name}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        >
        <div class="cr-img-fallback" style="display:none;">${item.emoji}</div>
      </div>
      <div class="cr-info">
        <div class="cr-name">${item.name}</div>
        <div class="cr-type">${item.type === 'mini' ? '· Mini Collection' : '· Signature Piece'}</div>
      </div>
      <div class="cr-price">${fmt(item.price)}</div>
      <div class="cr-qty">
        <button class="cr-stp cr-minus" data-idx="${idx}">−</button>
        <div class="cr-val">${item.qty}</div>
        <button class="cr-stp cr-plus" data-idx="${idx}">+</button>
      </div>
      <div class="cr-total">${fmt(item.price * item.qty)}</div>
      <button class="cr-remove" data-idx="${idx}" title="Remove">
        <svg viewBox="0 0 24 24">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    /* minus */
    row.querySelector('.cr-minus').addEventListener('click', () => {
      const c = getCart();
      if (c[idx].qty > 1) {
        c[idx].qty--;
      } else {
        c.splice(idx, 1);
      }
      saveCart(c);
      renderCart();
    });

    /* plus */
    row.querySelector('.cr-plus').addEventListener('click', () => {
      const c = getCart();
      c[idx].qty++;
      saveCart(c);
      renderCart();
    });

    /* remove */
    row.querySelector('.cr-remove').addEventListener('click', () => {
      const c = getCart();
      c.splice(idx, 1);
      saveCart(c);
      renderCart();
    });

    list.appendChild(row);
  });

  updateSummary(cart);
  initReveal();
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 SUMMARY */
function updateSummary(cart) {
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count    = cart.reduce((sum, i) => sum + i.qty, 0);
  const delivery = subtotal >= 60 ? 'Free' : subtotal === 0 ? '—' : 'Calculated at checkout';

  document.getElementById('summarySubtotal').textContent = subtotal > 0 ? fmt(subtotal) : '$0.00';
  document.getElementById('summaryDelivery').textContent = delivery;
  document.getElementById('summaryCount').textContent    = count;
  document.getElementById('summaryTotal').textContent    = subtotal > 0 ? fmt(subtotal) : '$0.00';
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 REVEAL */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 INIT */
renderCart();