// =========================================================
// GUNSTAR — script.js
// Shared behaviors: mobile nav, scroll reveal, gallery filters,
// product page rendering, contact form (mailto).
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initGalleryFilters();
  initProductPage();
  initContactForm();
});

/* ---------- Mobile navigation ---------- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

/* ---------- Gallery filters ---------- */
/* Each .catalog-item is now a plain <a> pointing to product.html,
   so no click/lightbox handling is needed here anymore, only filtering. */
function initGalleryFilters() {
  const grid = document.querySelector('[data-gallery]');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.catalog-item'));
  const filterButtons = document.querySelectorAll('.catalog-filters button');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');

      cards.forEach(card => {
        const type = card.dataset.type;
        const show = filter === 'all' || filter === type;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* ---------- Product page ---------- */
/* Reads ?item=<id> from the URL, looks it up in GUNSTAR_PRODUCTS
   (see products-data.js) and fills in the product page markup. */
function initProductPage() {
  const root = document.getElementById('product-root');
  if (!root || typeof GUNSTAR_PRODUCTS === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('item');
  const product = GUNSTAR_PRODUCTS.find(p => p.id === id) || GUNSTAR_PRODUCTS[0];
  if (!product) return;

  document.title = `${product.name} — GUNSTAR`;

  document.getElementById('product-index').textContent = product.tag;
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-type').textContent =
    product.type === 'video' ? 'Video' : 'Photo';
  document.getElementById('product-description').textContent = product.description;

  const detailsList = document.getElementById('product-details');
  detailsList.innerHTML = '';
  product.details.forEach(([label, value]) => {
    const dt = document.createElement('dt');
    dt.textContent = label;
    const dd = document.createElement('dd');
    dd.textContent = value;
    detailsList.appendChild(dt);
    detailsList.appendChild(dd);
  });

  const slot = document.getElementById('product-media-slot');
  slot.innerHTML = '';

  let mediaEl;
  if (product.type === 'video') {
    mediaEl = document.createElement('video');
    mediaEl.src = product.src;
    mediaEl.autoplay = true;
    mediaEl.muted = true;
    mediaEl.loop = true;
    mediaEl.playsInline = true;
    mediaEl.controls = true; // lets the visitor unmute / pause manually
  } else {
    mediaEl = document.createElement('img');
    mediaEl.src = product.src;
    mediaEl.alt = product.name;
  }
  slot.appendChild(mediaEl);
}

/* ---------- Contact form (mailto, no backend) ---------- */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    const subject = encodeURIComponent(`Website contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:contact@gunstar.com?subject=${subject}&body=${body}`;
  });
}
