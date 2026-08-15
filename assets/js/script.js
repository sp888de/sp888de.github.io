// =========================================================
// GUNSTAR — script.js
// Shared behaviors: mobile nav, scroll reveal, gallery filters,
// product page rendering (thumbnails + accordion), contact form.
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
/* Each .catalog-item is a plain <a> pointing to product.html,
   so this only needs to handle show/hide filtering. */
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
   (see products-data.js), builds the thumbnail column, shows the
   first media by default, and fills in the info + accordion. */
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
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('product-delivery').textContent = product.delivery || '';
  document.getElementById('product-terms').textContent = product.terms || '';

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

  renderProductGallery(product);
}

function renderProductGallery(product) {
  const thumbsWrap = document.getElementById('product-thumbs');
  const slot = document.getElementById('product-media-slot');
  const typeLabel = document.getElementById('product-type');
  if (!thumbsWrap || !slot) return;

  thumbsWrap.innerHTML = '';

  function showMedia(item) {
    slot.innerHTML = '';
    let el;
    if (item.type === 'video') {
      el = document.createElement('video');
      el.src = item.src;
      el.autoplay = true;
      el.muted = true;
      el.loop = true;
      el.playsInline = true;
      el.controls = true; // lets the visitor unmute / pause manually
    } else {
      el = document.createElement('img');
      el.src = item.src;
      el.alt = product.name;
    }
    slot.appendChild(el);
    typeLabel.textContent = item.type === 'video' ? 'Video' : 'Photo';
  }

  // Build one thumbnail per media entry (only needed if there is more than one)
  if (product.media.length > 1) {
    product.media.forEach((item, index) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'product-gallery__thumb' + (index === 0 ? ' is-active' : '');
      thumb.setAttribute('aria-label', `View ${product.name} — image ${index + 1}`);

      let thumbEl;
      if (item.type === 'video') {
        thumbEl = document.createElement('video');
        thumbEl.src = item.src;
        thumbEl.muted = true;
        thumbEl.playsInline = true;
      } else {
        thumbEl = document.createElement('img');
        thumbEl.src = item.src;
        thumbEl.alt = '';
      }
      thumb.appendChild(thumbEl);

      thumb.addEventListener('click', () => {
        thumbsWrap.querySelectorAll('.product-gallery__thumb').forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
        showMedia(item);
      });

      thumbsWrap.appendChild(thumb);
    });
  }

  showMedia(product.media[0]);
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
