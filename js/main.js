/* ============================================
   LUMIÈRE - Main JavaScript
   Cart System, Filtering, Search, Interactions
   ============================================ */

// Product Data Store
const PRODUCTS = [
  {
    id: 1,
    name: "Amber & Oud Candle",
    category: "candles",
    scent: "woody",
    price: 48,
    originalPrice: null,
    image: "images/candle1.jpg",
    badge: "Best Seller",
    description: "A warm, sophisticated blend of amber resin and rich oud wood. This candle fills your space with an intoxicating aroma that's both grounding and luxurious.",
    ingredients: "100% Natural Soy Wax, Cotton Wick, Premium Fragrance Oils (Amber, Oud, Sandalwood, Musk)",
    sizes: ["Small (4oz) - $32", "Medium (8oz) - $48", "Large (16oz) - $68"],
    featured: true,
    date: "2024-01"
  },
  {
    id: 2,
    name: "Vanilla Bourbon Candle",
    category: "candles",
    scent: "sweet",
    price: 42,
    originalPrice: 52,
    image: "images/candle2.jpg",
    badge: "Sale",
    description: "Rich Madagascar vanilla meets smoky bourbon undertones for a warm, indulgent fragrance that transforms any room into a cozy retreat.",
    ingredients: "100% Natural Soy Wax, Cotton Wick, Premium Fragrance Oils (Vanilla, Bourbon, Caramel, Oak)",
    sizes: ["Small (4oz) - $28", "Medium (8oz) - $42", "Large (16oz) - $62"],
    featured: true,
    date: "2024-02"
  },
  {
    id: 3,
    name: "Jasmine & Cedar Candle",
    category: "candles",
    scent: "floral",
    price: 45,
    originalPrice: null,
    image: "images/candle3.jpg",
    badge: null,
    description: "Delicate jasmine petals intertwined with warm cedarwood. A balanced fragrance that's both floral and earthy, perfect for evening relaxation.",
    ingredients: "100% Natural Soy Wax, Cotton Wick, Premium Fragrance Oils (Jasmine, Cedar, Bergamot, Musk)",
    sizes: ["Small (4oz) - $30", "Medium (8oz) - $45", "Large (16oz) - $65"],
    featured: true,
    date: "2024-03"
  },
  {
    id: 4,
    name: "Sea Salt & Sage Candle",
    category: "candles",
    scent: "fresh",
    price: 44,
    originalPrice: null,
    image: "images/candle4.jpg",
    badge: null,
    description: "Fresh ocean breeze meets aromatic sage for a clean, invigorating scent. Brings the feeling of a coastal retreat into your home.",
    ingredients: "100% Natural Soy Wax, Cotton Wick, Premium Fragrance Oils (Sea Salt, Sage, Driftwood, Citrus)",
    sizes: ["Small (4oz) - $29", "Medium (8oz) - $44", "Large (16oz) - $64"],
    featured: true,
    date: "2024-04"
  },
  {
    id: 5,
    name: "Lavender Dreams Diffuser",
    category: "diffusers",
    scent: "floral",
    price: 56,
    originalPrice: null,
    image: "images/diffuser1.jpg",
    badge: "New",
    description: "A calming lavender reed diffuser that provides continuous fragrance for up to 3 months. Perfect for bedrooms and meditation spaces.",
    ingredients: "Premium Diffuser Base Oil, Natural Reed Sticks, Essential Oils (Lavender, Chamomile, Bergamot)",
    sizes: ["100ml - $38", "200ml - $56", "300ml - $72"],
    featured: false,
    date: "2024-05"
  },
  {
    id: 6,
    name: "Eucalyptus Mint Diffuser",
    category: "diffusers",
    scent: "fresh",
    price: 52,
    originalPrice: null,
    image: "images/diffuser2.jpg",
    badge: null,
    description: "Energizing eucalyptus paired with cool mint creates a spa-like atmosphere in any room. Ideal for bathrooms and home offices.",
    ingredients: "Premium Diffuser Base Oil, Natural Reed Sticks, Essential Oils (Eucalyptus, Peppermint, Tea Tree)",
    sizes: ["100ml - $35", "200ml - $52", "300ml - $68"],
    featured: false,
    date: "2024-06"
  },
  {
    id: 7,
    name: "Candle Snuffer Set",
    category: "accessories",
    scent: null,
    price: 28,
    originalPrice: 35,
    image: "images/accessory1.jpg",
    badge: "Sale",
    description: "Elegant brass candle snuffer and wick trimmer set. Essential tools for maintaining your candles and extending their burn time.",
    ingredients: "Solid Brass with Matte Gold Finish",
    sizes: ["Standard - $28"],
    featured: false,
    date: "2024-01"
  },
  {
    id: 8,
    name: "Crystal Candle Holder",
    category: "accessories",
    scent: null,
    price: 38,
    originalPrice: null,
    image: "images/accessory2.jpg",
    badge: null,
    description: "Hand-cut crystal candle holder that catches and refracts light beautifully. A stunning decorative piece for any candle lover.",
    ingredients: "Hand-Cut Lead-Free Crystal",
    sizes: ["Small - $28", "Medium - $38", "Large - $52"],
    featured: false,
    date: "2024-03"
  },
  {
    id: 9,
    name: "Rosewood & Fig Candle",
    category: "candles",
    scent: "woody",
    price: 50,
    originalPrice: null,
    image: "images/candle5.jpg",
    badge: "New",
    description: "Exotic rosewood meets ripe Mediterranean fig for a sophisticated, fruity-woody fragrance. A signature scent for the discerning home.",
    ingredients: "100% Natural Soy Wax, Cotton Wick, Premium Fragrance Oils (Rosewood, Fig, Bergamot, Vetiver)",
    sizes: ["Small (4oz) - $34", "Medium (8oz) - $50", "Large (16oz) - $72"],
    featured: false,
    date: "2024-07"
  },
  {
    id: 10,
    name: "Sandalwood & Musk Candle",
    category: "candles",
    scent: "woody",
    price: 46,
    originalPrice: null,
    image: "images/candle6.jpg",
    badge: null,
    description: "Creamy sandalwood blended with subtle white musk. A warm, enveloping scent that creates an atmosphere of tranquility and luxury.",
    ingredients: "100% Natural Soy Wax, Cotton Wick, Premium Fragrance Oils (Sandalwood, Musk, Vanilla, Amber)",
    sizes: ["Small (4oz) - $31", "Medium (8oz) - $46", "Large (16oz) - $66"],
    featured: false,
    date: "2024-08"
  }
];

// ============================================
// Cart System
// ============================================
class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('lumiere_cart')) || [];
    this.updateUI();
  }

  save() {
    localStorage.setItem('lumiere_cart', JSON.stringify(this.items));
    this.updateUI();
  }

  addItem(product, quantity = 1, size = null) {
    const sizeKey = size || product.sizes[0];
    const existing = this.items.find(item => item.id === product.id && item.size === sizeKey);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: this.extractPrice(sizeKey, product),
        image: product.image,
        size: sizeKey,
        quantity: quantity
      });
    }

    this.save();
    showToast(`${product.name} added to cart`, 'success');
  }

  removeItem(index) {
    const item = this.items[index];
    this.items.splice(index, 1);
    this.save();
    showToast(`${item.name} removed from cart`, 'error');
  }

  updateQuantity(index, delta) {
    this.items[index].quantity += delta;
    if (this.items[index].quantity <= 0) {
      this.removeItem(index);
    } else {
      this.save();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  extractPrice(sizeStr, product) {
    const match = sizeStr.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : product.price;
  }

  updateUI() {
    // Update cart count badges
    document.querySelectorAll('.cart-count').forEach(el => {
      const count = this.getCount();
      el.textContent = count;
      el.classList.toggle('hidden', count === 0);
    });

    // Update cart sidebar
    this.renderCartSidebar();
  }

  renderCartSidebar() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartFooterEl = document.getElementById('cart-footer');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const cartTotalEl = document.getElementById('cart-total');

    if (!cartItemsEl) return;

    if (this.items.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p>Your cart is empty</p>
          <a href="shop.html" class="btn btn-primary btn-sm">Browse Products</a>
        </div>`;
      if (cartFooterEl) cartFooterEl.style.display = 'none';
      return;
    }

    if (cartFooterEl) cartFooterEl.style.display = 'block';

    cartItemsEl.innerHTML = this.items.map((item, i) => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-variant">${item.size}</div>
          <div class="cart-item-bottom">
            <div class="quantity-control">
              <button onclick="cart.updateQuantity(${i}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="cart.updateQuantity(${i}, 1)">+</button>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          </div>
          <button class="cart-item-remove" onclick="cart.removeItem(${i})">Remove</button>
        </div>
      </div>
    `).join('');

    const total = this.getTotal();
    if (cartSubtotalEl) cartSubtotalEl.textContent = `$${total.toFixed(2)}`;
    if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
  }
}

// ============================================
// Toast Notification
// ============================================
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success'
        ? '<path d="M20 6L9 17l-5-5"/>'
        : '<path d="M18 6L6 18M6 6l12 12"/>'}
    </svg>
    ${message}`;

  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ============================================
// Cart Sidebar Toggle
// ============================================
function toggleCart() {
  const sidebar = document.getElementById('cart-sidebar');
  const overlay = document.getElementById('cart-overlay');
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
    document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
  }
}

// ============================================
// Product Card Rendering
// ============================================
function renderProductCard(product) {
  return `
    <div class="product-card" data-category="${product.category}" data-scent="${product.scent || ''}" data-price="${product.price}">
      <div class="product-image">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <a href="product.html?id=${product.id}" class="product-quickview">Quick View</a>
      </div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="product-price">
          <span class="price-current">$${product.price}</span>
          ${product.originalPrice ? `<span class="price-original">$${product.originalPrice}</span>` : ''}
        </div>
        <button class="add-to-cart-btn" onclick="addToCartFromCard(${product.id})">Add to Cart</button>
      </div>
    </div>`;
}

function addToCartFromCard(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) cart.addItem(product);
}

// ============================================
// Shop Page - Filtering & Sorting
// ============================================
function initShop() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  let filtered = [...PRODUCTS];

  function render() {
    grid.innerHTML = filtered.map(p => renderProductCard(p)).join('');
    const countEl = document.getElementById('product-count');
    if (countEl) countEl.textContent = `${filtered.length} products`;
  }

  // Category filter
  document.querySelectorAll('.filter-category').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  // Scent filter
  document.querySelectorAll('.filter-scent').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  // Price filter
  document.querySelectorAll('.filter-price').forEach(cb => {
    cb.addEventListener('change', applyFilters);
  });

  function applyFilters() {
    const cats = [...document.querySelectorAll('.filter-category:checked')].map(c => c.value);
    const scents = [...document.querySelectorAll('.filter-scent:checked')].map(c => c.value);
    const prices = [...document.querySelectorAll('.filter-price:checked')].map(c => c.value);

    filtered = PRODUCTS.filter(p => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (scents.length && !scents.includes(p.scent)) return false;
      if (prices.length) {
        const inRange = prices.some(range => {
          if (range === '0-40') return p.price < 40;
          if (range === '40-60') return p.price >= 40 && p.price <= 60;
          if (range === '60+') return p.price > 60;
          return true;
        });
        if (!inRange) return false;
      }
      return true;
    });

    applySort();
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', applySort);
  }

  function applySort() {
    const sort = sortSelect ? sortSelect.value : 'featured';
    if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') filtered.sort((a, b) => b.date.localeCompare(a.date));
    else filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    render();
  }

  // Search
  const searchInput = document.getElementById('shop-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.includes(q));
      applySort();
    });
  }

  render();
}

// ============================================
// Product Detail Page
// ============================================
function initProductDetail() {
  const container = document.getElementById('product-detail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  // Update breadcrumb
  const breadcrumb = document.getElementById('breadcrumb-product');
  if (breadcrumb) breadcrumb.textContent = product.name;

  container.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}">
    </div>
    <div class="product-detail-info">
      <div class="breadcrumb"><a href="index.html">Home</a> <span>›</span> <a href="shop.html">Shop</a> <span>›</span> <span id="breadcrumb-product">${product.name}</span></div>
      <div class="product-category">${product.category}</div>
      <h1>${product.name}</h1>
      <div class="product-detail-price">$${product.price}</div>
      <p class="product-detail-desc">${product.description}</p>
      
      <div class="product-options">
        <span class="option-label">Size</span>
        <div class="size-options">
          ${product.sizes.map((s, i) => `<button class="size-btn ${i === 0 ? 'active' : ''}" onclick="selectSize(this, ${product.id})">${s}</button>`).join('')}
        </div>
      </div>
      
      <span class="option-label">Quantity</span>
      <div class="quantity-selector">
        <div class="qty-control">
          <button onclick="changeQty(-1)">−</button>
          <span id="qty-display">1</span>
          <button onclick="changeQty(1)">+</button>
        </div>
      </div>
      
      <div class="detail-add-cart">
        <button class="btn btn-primary" onclick="addDetailToCart(${product.id})">Add to Cart</button>
        <button class="btn btn-outline" onclick="toggleWishlist()">♡</button>
      </div>
      
      <div class="product-meta">
        <p><strong>Category:</strong> ${product.category}</p>
        ${product.scent ? `<p><strong>Scent Family:</strong> ${product.scent}</p>` : ''}
        <p><strong>SKU:</strong> LUM-${String(product.id).padStart(4, '0')}</p>
      </div>
    </div>`;

  // Tabs
  const descTab = document.getElementById('tab-description');
  const ingrTab = document.getElementById('tab-ingredients');
  const shipTab = document.getElementById('tab-shipping');

  if (descTab) descTab.innerHTML = `<p>${product.description}</p>`;
  if (ingrTab) ingrTab.innerHTML = `<p>${product.ingredients}</p>`;

  // Related products
  const relatedGrid = document.getElementById('related-products-grid');
  if (relatedGrid) {
    const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);
    relatedGrid.innerHTML = related.map(p => renderProductCard(p)).join('');
  }
}

let selectedSizeIndex = 0;
let selectedQty = 1;

function selectSize(btn, productId) {
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSizeIndex = [...btn.parentElement.children].indexOf(btn);
}

function changeQty(delta) {
  selectedQty = Math.max(1, selectedQty + delta);
  const el = document.getElementById('qty-display');
  if (el) el.textContent = selectedQty;
}

function addDetailToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    cart.addItem(product, selectedQty, product.sizes[selectedSizeIndex]);
  }
}

function toggleWishlist() {
  showToast('Added to wishlist!', 'success');
}

// ============================================
// Tabs
// ============================================
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const tab = document.getElementById(btn.dataset.tab);
      if (tab) tab.classList.add('active');
    });
  });
}

// ============================================
// FAQ Accordion
// ============================================
function initFAQ() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ============================================
// Newsletter
// ============================================
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('input[type="email"]');
      if (email && email.value) {
        showToast('Thank you for subscribing!', 'success');
        email.value = '';
      }
    });
  }
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
      form.reset();
    });
  }
}

// ============================================
// Mobile Menu
// ============================================
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '100%';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#fff';
      links.style.padding = '24px';
      links.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      links.style.zIndex = '100';
    });
  }
}

// ============================================
// Init
// ============================================
const cart = new Cart();

document.addEventListener('DOMContentLoaded', () => {
  initShop();
  initProductDetail();
  initTabs();
  initFAQ();
  initNewsletter();
  initContactForm();
  initMobileMenu();
});
