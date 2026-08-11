// =========================================================
// GUNSTAR — script.js
// Comportements partagés : nav mobile, reveal au scroll,
// galerie filtrable + lightbox, formulaire de contact (mailto).
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initReveal();
  initGallery();
  initContactForm();
});

/* ---------- Navigation mobile ---------- */
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

/* ---------- Apparition au scroll ---------- */
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

/* ---------- Galerie : filtres + lightbox ---------- */
function initGallery() {
  const grid = document.querySelector('[data-gallery]');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.media-card'));
  const filterButtons = document.querySelectorAll('.filters button');

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

  // Lightbox
  const lightbox = document.querySelector('.lightbox');
  if (!lightbox) return;
  const lightboxContent = lightbox.querySelector('.lightbox__content');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.fullSrc;
      const type = card.dataset.type;
      if (!src) return; // carte encore en placeholder, pas de média à ouvrir

      lightboxContent.innerHTML = '';
      let el;
      if (type === 'video') {
        el = document.createElement('video');
        el.src = src;
        el.controls = true;
        el.autoplay = true;
      } else {
        el = document.createElement('img');
        el.src = src;
        el.alt = card.dataset.label || '';
      }
      lightboxContent.appendChild(el);
      lightbox.classList.add('is-open');
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    lightboxContent.innerHTML = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

/* ---------- Formulaire de contact (mailto, sans backend) ---------- */
function initContactForm() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    const subject = encodeURIComponent(`Contact site — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:contact@gunstar.com?subject=${subject}&body=${body}`;
  });
}
