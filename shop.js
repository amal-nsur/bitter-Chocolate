/* ============================================================
   BITTER CHOCOLATE — SHOP SCRIPT (shop.js)
   Connect this file ONLY to shop.html alongside script.js.
   Includes: product data, render list, modal, toast, filters,
             reveal re-init.
   ============================================================ */

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 PRODUCT DATA */
const PRODUCTS = [
  /* ── MINIS ── */
  {
    id: 1, type: 'mini', emoji: '🍫',
    name: 'Chocolate Truffle',
    price: 1,
    ingredients: 'Dark cacao 70%, fresh cream, Madagascar vanilla bean, unsweetened cocoa powder dusting.'
  },
  {
    id: 2, type: 'mini', emoji: '🍬',
    name: 'Dark Praline',
    price: 2,
    ingredients: 'Belgian dark chocolate 65%, caramelized hazelnuts, roasted almonds, sea salt flakes.'
  },
  {
    id: 3, type: 'mini', emoji: '🌰',
    name: 'Hazelnut Bark',
    price: 6,
    ingredients: 'Milk couverture chocolate, whole roasted hazelnuts, almond slivers, wildflower honey drizzle.'
  },
  {
    id: 4, type: 'mini', emoji: '🍮',
    name: 'Caramel Bite',
    price: 2,
    ingredients: 'Salted caramel center, dark chocolate shell 68%, fleur de sel, pure cane sugar.'
  },
  {
    id: 5, type: 'mini', emoji: '🤍',
    name: 'Almond Cluster',
    price: 1,
    ingredients: 'Whole Californian almonds, white and dark couverture chocolate blend, light caramel glaze.'
  },
  {
    id: 6, type: 'mini', emoji: '🍦',
    name: 'White Ganache',
    price: 3,
    ingredients: 'Ivory white chocolate 34%, Madagascan Bourbon vanilla bean, light cream ganache, edible silver.'
  },
  {
    id: 7, type: 'mini', emoji: '🍓',
    name: 'Raspberry Bonbon',
    price: 2,
    ingredients: 'Dark chocolate shell 72%, fresh raspberry coulis, lychee accent, rose water finish.'
  },
  {
    id: 8, type: 'mini', emoji: '🧂',
    name: 'Sea Salt Bar',
    price: 4,
    ingredients: '70% single-origin dark chocolate Ecuador, hand-harvested Atlantic fleur de sel, cold-pressed cocoa butter.'
  },
  {
    id: 9, type: 'mini', emoji: '🍦',
    name: 'Vanilla Cream',
    price: 3,
    ingredients: 'White chocolate dome, vanilla pastry cream, Madagascar Bourbon vanilla, cocoa butter shell.'
  },
  {
    id: 10, type: 'mini', emoji: '☕',
    name: 'Espresso Truffle',
    price: 2,
    ingredients: 'Single-origin Arabica espresso ganache, dark chocolate 75%, cocoa nib crust, light sugar glaze.'
  },
  {
    id: 11, type: 'mini', emoji: '💚',
    name: 'Pistachio Shell',
    price: 3,
    ingredients: 'Sicilian pistachio paste DOP, milk chocolate 38%, edible gold leaf, pistachio praline filling.'
  },
  {
    id: 12, type: 'mini', emoji: '🥭',
    name: 'Mango Delight',
    price: 2,
    ingredients: 'Alphonso mango purée, white chocolate 34%, passion fruit glaze, coconut flake accent.'
  },
  {
    id: 13, type: 'mini', emoji: '🌹',
    name: 'Rose Petal Bonbon',
    price: 2,
    ingredients: 'Bulgarian rose jam, dark chocolate 68%, crystallized rose petals, rosewater essence, pure cane sugar.'
  },
  /* ── BIGS ── */
  {
    id: 14, type: 'big', emoji: '🎂',
    name: 'Mud Cake',
    price: 22,
    ingredients: 'Belgian dark chocolate sponge, silky dark ganache layers, cocoa dust finish. Serves 8–10. Available in whole or by slice.'
  },
  {
    id: 15, type: 'big', emoji: '🫙',
    name: 'Truffle Gift Jar',
    price: 10,
    ingredients: '12 assorted hand-rolled truffles in a branded glass jar. Mixed selection including dark, milk & white varieties. Gift-ready.'
  },
  {
    id: 16, type: 'big', emoji: '🍫',
    name: 'Swiss Dark Bar',
    price: 8,
    ingredients: '100g single-origin Swiss couverture 72% cacao, cold-pressed, stone-ground. No additives, no preservatives.'
  },
];

const MINI_QTY = [
  { n: 1,  label: 'piece' },
  { n: 6,  label: 'box'   },
  { n: 12, label: 'dozen' },
  { n: 18, label: 'set'   },
  { n: 24, label: 'box'   },
];

let currentProduct = null;
let currentQty     = 1;

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 HELPERS */
function starsSVG(n = 5) {
  return Array.from({ length: 5 }, (_, i) => `
    <svg viewBox="0 0 24 24" fill="${i < n ? '#C89B5F' : 'none'}" stroke="#C89B5F" stroke-width="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>`
  ).join('');
}

function fmt(n) {
  return `$${n.toFixed(2)}`;
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 RENDER LIST */
function renderList(filter = 'all') {
  const list = document.getElementById('productList');
  if (!list) return;
  list.innerHTML = '';

  const minis = PRODUCTS.filter(p => p.type === 'mini');
  const bigs  = PRODUCTS.filter(p => p.type === 'big');

  if (filter === 'all' || filter === 'mini') {
    list.appendChild(makeLabel('Minis & Bites', 'individual pieces'));
    minis.forEach(p => list.appendChild(buildRow(p)));
  }
  if (filter === 'all' || filter === 'big') {
    list.appendChild(makeLabel('Cakes & Jars', 'signature pieces'));
    bigs.forEach(p => list.appendChild(buildRow(p)));
  }

  initReveal();
}

function makeLabel(main, sub) {
  const el = document.createElement('div');
  el.className = 'section-label reveal';
  el.innerHTML = `${main} <em>· ${sub}</em>`;
  return el;
}

function buildRow(p) {
  const row = document.createElement('div');
  row.className = 'product-row reveal';
  row.innerHTML = `
    <div class="row-img">
      <img
        src="products/p${p.id}.png"
        alt="${p.name}"
        onerror="this.style.display='none';"
      >
      <div class="img-fallback" style="display:none;">${p.emoji}</div>
      <span class="type-badge">${p.type === 'mini' ? 'Mini' : 'Signature'}</span>
    </div>
    <div class="row-info">
      <div class="row-stars">${starsSVG(5)}</div>
      <div class="row-name">${p.name}</div>
      <div class="row-ingredients">${p.ingredients}</div>
    </div>
    <div class="row-right">
      <div>
        <div class="row-price-label">Price / piece</div>
        <div class="row-price">${fmt(p.price)}</div>
      </div>
      <button class="row-btn"><span>Select</span></button>
    </div>
    <div class="row-arrow">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C89B5F" stroke-width="1.5" stroke-linecap="round">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </div>
  `;
  row.addEventListener('click', () => openModal(p));
  row.querySelector('.row-btn').addEventListener('click', e => {
    e.stopPropagation();
    openModal(p);
  });
  return row;
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 MODAL OPEN */
function openModal(p) {
  currentProduct = p;
  currentQty     = 1;

  document.getElementById('modalBadge').textContent  = p.type === 'mini' ? '· Mini Collection ·' : '· Signature Piece ·';
  document.getElementById('modalName').textContent   = p.name;
  document.getElementById('modalStars').innerHTML    = starsSVG(5);
  document.getElementById('modalIng').textContent    = p.ingredients;
  document.getElementById('modalPrice').textContent  = fmt(p.price);
  document.getElementById('modalPer').textContent    = p.type === 'mini' ? '/ piece' : '/ unit';

  const imgWrap = document.getElementById('modalImgWrap');
  imgWrap.innerHTML = `
    <img
      src="products/p${p.id}.png"
      alt="${p.name}"
      onerror="this.style.display='none'; document.getElementById('mEmoji').style.display='block';"
      style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"
    >
    <span id="mEmoji" class="modal-placeholder-big" style="display:none;">${p.emoji}</span>
  `;

  const qa = document.getElementById('qtyArea');
  if (p.type === 'mini') {
    qa.innerHTML = `
      <div class="qty-label">Select Quantity</div>
      <div class="qty-pills" id="pillsRow">
        ${MINI_QTY.map((q, i) => `
          <button class="qty-pill${i === 0 ? ' selected' : ''}" data-qty="${q.n}">
            <span class="pn">${q.n}</span>
            <span class="ps">${q.label}</span>
          </button>`).join('')}
      </div>
    `;
    qa.querySelectorAll('.qty-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        qa.querySelectorAll('.qty-pill').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        currentQty = parseInt(btn.dataset.qty, 10);
        updateTotal();
      });
    });
  } else {
    qa.innerHTML = `
      <div class="qty-label">Quantity</div>
      <div class="qty-stepper">
        <button class="stp-btn" id="stpMinus">−</button>
        <div class="stp-val" id="stpVal">1</div>
        <button class="stp-btn" id="stpPlus">+</button>
      </div>
    `;
    document.getElementById('stpMinus').addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        document.getElementById('stpVal').textContent = currentQty;
        updateTotal();
      }
    });
    document.getElementById('stpPlus').addEventListener('click', () => {
      currentQty++;
      document.getElementById('stpVal').textContent = currentQty;
      updateTotal();
    });
  }

  updateTotal();
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 MODAL CLOSE */
function updateTotal() {
  if (!currentProduct) return;
  document.getElementById('modalTotal').textContent = fmt(currentProduct.price * currentQty);
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
document.getElementById('modalAddBtn').addEventListener('click', () => {
  const cart     = JSON.parse(localStorage.getItem('bc_cart') || '[]');
  const existing = cart.find(i => i.id === currentProduct.id);
  if (existing) {
    existing.qty += currentQty;
  } else {
    cart.push({
      id:    currentProduct.id,
      name:  currentProduct.name,
      price: currentProduct.price,
      type:  currentProduct.type,
      emoji: currentProduct.emoji,
      qty:   currentQty,
    });
  }
  localStorage.setItem('bc_cart', JSON.stringify(cart));
  document.getElementById('toastText').textContent = `${currentQty}× ${currentProduct.name} added to cart`;
  closeModal();
  showToast();
});

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 TOAST */
let toastTimer;
function showToast() {
  const t = document.getElementById('toast');
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3600);
}

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 FILTER BUTTONS */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderList(btn.dataset.filter);
  });
});

/* 🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤🟤 REVEAL (re-init after render) */
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
(function () {
  const params = new URLSearchParams(window.location.search);
  const filter = params.get('filter') || 'all';
  const activeBtn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
  if (activeBtn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');
  }
  renderList(filter);
})();