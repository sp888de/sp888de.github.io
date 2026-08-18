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
  const filterButtons = Array.from(document.querySelectorAll('.catalog-filters button'));
  const storageKey = 'gunstar-unlocked-archives';
  let unlockedArchives = new Set();

  // La progression ne dure que pendant la session du navigateur.
  try {
    const storedArchives = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    unlockedArchives = new Set(Array.isArray(storedArchives) ? storedArchives : []);
  } catch (error) {
    unlockedArchives = new Set();
  }

  function markArchiveUnlocked(filter) {
    const button = filterButtons.find(item => item.dataset.filter === filter);
    if (!button) return;
    button.classList.add('is-unlocked');
    const marker = button.querySelector('.filter-lock');
    if (marker) marker.textContent = '○';
  }

function applyFilter(filter) {
  filterButtons.forEach(button => {
    button.setAttribute(
      'aria-pressed',
      String(button.dataset.filter === filter)
    );
  });

  cards.forEach(card => {
    const show =
      filter === 'all' ||
      filter === card.dataset.category;

    card.style.display = show ? '' : 'none';

    const lockedInAll = filter === 'all';

    card.classList.toggle(
      'is-locked-in-all',
      lockedInAll
    );

    card.setAttribute(
      'aria-disabled',
      String(lockedInAll)
    );

    // Impossible de sélectionner une vignette avec Tab
    // lorsqu'on est dans ALL.
    card.tabIndex = lockedInAll ? -1 : 0;

    // Bloque le clic souris dans ALL sans supprimer
    // la vignette de la page.
    card.style.pointerEvents = lockedInAll ? 'none' : '';
  });
}
  
  unlockedArchives.forEach(markArchiveUnlocked);

  const gate = initAccessGate((filter) => {
    unlockedArchives.add(filter);
    markArchiveUnlocked(filter);

    try {
      sessionStorage.setItem(storageKey, JSON.stringify(Array.from(unlockedArchives)));
    } catch (error) {
      // Le filtre reste déverrouillé pour la page courante si le stockage est bloqué.
    }

    applyFilter(filter);
  });

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter === 'all' || unlockedArchives.has(filter) || !gate) {
        applyFilter(filter);
        return;
      }

      gate.open(filter, btn);
    });
  });
}

/* ---------- Protocoles d'accès aux archives ---------- */
function initAccessGate(onUnlocked) {
  const root = document.getElementById('access-gate');
  if (!root) return null;

  const challenges = Array.from(root.querySelectorAll('[data-challenge]'));
  const closeButton = root.querySelector('[data-gate-close]');
  const gateTitle = root.querySelector('#gate-title');
  const gateCode = root.querySelector('[data-gate-code]');
  const successScreen = root.querySelector('[data-gate-success]');
  const successLabel = root.querySelector('[data-success-label]');
  const protocolNames = {
    mercenary: { title: 'MERCENARY CLEARANCE', code: 'NODE // 101', label: 'MERCENARY ARCHIVE UNLOCKED' },
    business: { title: 'BUSINESS CLEARANCE', code: 'NODE // 110', label: 'BUSINESS ARCHIVE UNLOCKED' },
    hacker: { title: 'HACKER CLEARANCE', code: 'NODE // 100', label: 'HACKER ARCHIVE UNLOCKED' }
  };

  let activeProtocol = null;
  let returnFocus = null;
  let closeTimer = null;
  let timers = [];
  let businessWinner = null;
  let businessReady = false;
  let hackerAttempts = 0;

  function schedule(callback, delay) {
    const timer = window.setTimeout(callback, delay);
    timers.push(timer);
    return timer;
  }

  function clearTimers() {
    timers.forEach(timer => window.clearTimeout(timer));
    timers = [];
  }

  function setChallengeVisible(protocol) {
    challenges.forEach(challenge => {
      challenge.hidden = challenge.dataset.challenge !== protocol;
    });
  }

  function open(protocol, trigger) {
    const definition = protocolNames[protocol];
    if (!definition) return;

    window.clearTimeout(closeTimer);
    clearTimers();
    activeProtocol = protocol;
    returnFocus = trigger;
    root.hidden = false;
    root.classList.remove('is-granted');
    successScreen.hidden = true;
    setChallengeVisible(protocol);
    gateTitle.textContent = definition.title;
    gateCode.textContent = definition.code;
    document.body.classList.add('gate-open');

    window.requestAnimationFrame(() => root.classList.add('is-active'));

    if (protocol === 'mercenary') resetMercenaryProtocol();
    if (protocol === 'business') resetBusinessProtocol();
    if (protocol === 'hacker') resetHackerProtocol();

    closeButton.focus({ preventScroll: true });
  }

  function close() {
    if (root.hidden) return;
    clearTimers();
    activeProtocol = null;
    businessReady = false;
    root.classList.remove('is-active', 'is-granted');
    document.body.classList.remove('gate-open');
    closeTimer = window.setTimeout(() => {
      root.hidden = true;
      successScreen.hidden = true;
      challenges.forEach(challenge => { challenge.hidden = true; });
    }, 260);

    if (returnFocus) returnFocus.focus({ preventScroll: true });
  }

  function grantAccess(protocol) {
    if (activeProtocol !== protocol) return;
    const definition = protocolNames[protocol];
    clearTimers();
    root.classList.add('is-granted');
    setChallengeVisible('__success__');
    successScreen.hidden = false;
    successLabel.textContent = definition.label;
    gateTitle.textContent = 'CLEARANCE VERIFIED';
    onUnlocked(protocol);
    schedule(close, 1450);
  }

  // Le contrat exige un alias et un consentement avant la lecture biométrique.
  const aliasInput = root.querySelector('[data-operative-alias]');
  const consentInput = root.querySelector('[data-contract-consent]');
  const signButton = root.querySelector('[data-mercenary-sign]');
  const signatureStatus = root.querySelector('[data-signature-status]');
  const signatureState = signButton.querySelector('.signature-state');

  function updateSignatureAvailability() {
    const ready = aliasInput.value.trim().length >= 2 && consentInput.checked;
    signButton.disabled = !ready;
    signatureStatus.textContent = ready
      ? 'Scanner ready. Place fingerprint to sign.'
      : 'Complete the record to enable scanner.';
  }

  function resetMercenaryProtocol() {
    aliasInput.value = '';
    consentInput.checked = false;
    signButton.disabled = true;
    signButton.classList.remove('is-scanning', 'is-signed');
    signatureState.textContent = '[ PENDING ]';
    signatureStatus.textContent = 'Complete the record to enable scanner.';
    schedule(() => aliasInput.focus({ preventScroll: true }), 320);
  }

  aliasInput.addEventListener('input', updateSignatureAvailability);
  consentInput.addEventListener('change', updateSignatureAvailability);
  signButton.addEventListener('click', () => {
    if (signButton.disabled || activeProtocol !== 'mercenary') return;
    signButton.disabled = true;
    signButton.classList.add('is-scanning');
    signatureState.textContent = '[ SCANNING ]';
    signatureStatus.textContent = 'Capturing biometric signature...';

    schedule(() => {
      signButton.classList.remove('is-scanning');
      signButton.classList.add('is-signed');
      signatureState.textContent = '[ SIGNED ]';
      signatureStatus.textContent = `Operative ${aliasInput.value.trim().toUpperCase()} authenticated.`;
    }, 1050);
    schedule(() => grantAccess('mercenary'), 1900);
  });

  // Les mallettes conservent leur identité pendant que leur ordre visuel change.
  const caseBoard = root.querySelector('[data-case-board]');
  const caseButtons = Array.from(caseBoard.querySelectorAll('.case-choice'));
  const businessStatus = root.querySelector('[data-business-status]');

  function randomizeOrder(items) {
    const next = items.slice();
    for (let index = next.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [next[index], next[swapIndex]] = [next[swapIndex], next[index]];
    }
    return next;
  }

  function moveCases() {
    const current = Array.from(caseBoard.children);
    let next = randomizeOrder(current);
    if (next.every((item, index) => item === current[index])) next = [current[1], current[2], current[0]];

    const firstPositions = new Map(current.map(item => [item, item.getBoundingClientRect()]));
    next.forEach(item => caseBoard.appendChild(item));

    next.forEach(item => {
      const first = firstPositions.get(item);
      const last = item.getBoundingClientRect();
      const deltaX = first.left - last.left;
      const deltaY = first.top - last.top;
      if (typeof item.animate === 'function') {
        item.animate(
          [
            { transform: `translate(${deltaX}px, ${deltaY}px) rotate(-2deg)` },
            { transform: 'translate(0, 0) rotate(0deg)' }
          ],
          { duration: 470, easing: 'cubic-bezier(.2,.85,.25,1)' }
        );
      }
    });
  }

  function shuffleBusinessCases(remainingMoves) {
    if (activeProtocol !== 'business') return;
    moveCases();

    if (remainingMoves > 1) {
      schedule(() => shuffleBusinessCases(remainingMoves - 1), 520);
      return;
    }

    schedule(() => {
      businessReady = true;
      caseBoard.classList.remove('is-shuffling');
      caseButtons.forEach(button => { button.disabled = false; });
      businessStatus.textContent = 'TRANSACTION LIVE // SELECT THE ASSET';
    }, 520);
  }

  function resetBusinessProtocol() {
    businessReady = false;
    caseBoard.classList.remove('is-shuffling');
    caseButtons.forEach(button => {
      button.disabled = true;
      button.classList.remove('is-open', 'has-money', 'is-correct', 'is-wrong');
      button.querySelector('.case-result').textContent = 'SELECT';
    });

    businessWinner = caseButtons[Math.floor(Math.random() * caseButtons.length)];
    businessWinner.classList.add('has-money');
    businessStatus.textContent = 'VERIFYING ASSET...';

    schedule(() => {
      caseButtons.forEach(button => button.classList.add('is-open'));
      businessStatus.textContent = 'MEMORIZE THE ASSET LOCATION';
    }, 420);
    schedule(() => {
      caseButtons.forEach(button => button.classList.remove('is-open'));
      businessStatus.textContent = 'CASES SEALED // TRACK THE EXCHANGE';
    }, 1550);
    schedule(() => {
      caseBoard.classList.add('is-shuffling');
      shuffleBusinessCases(6);
    }, 2050);
  }

  caseButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!businessReady || activeProtocol !== 'business') return;
      businessReady = false;
      caseButtons.forEach(item => { item.disabled = true; });
      button.classList.add('is-open');

      if (button === businessWinner) {
        button.classList.add('is-correct');
        button.querySelector('.case-result').textContent = 'ASSET SECURED';
        businessStatus.textContent = 'CORRECT CASE // TRANSACTION APPROVED';
        schedule(() => grantAccess('business'), 1150);
        return;
      }

      button.classList.add('is-wrong');
      button.querySelector('.case-result').textContent = 'EMPTY';
      businessStatus.textContent = 'EMPTY CASE // TRANSACTION REJECTED';
      schedule(() => {
        businessWinner.classList.add('is-open', 'is-correct');
        businessWinner.querySelector('.case-result').textContent = 'ASSET WAS HERE';
      }, 450);
      schedule(resetBusinessProtocol, 1800);
    });
  });

  // Le terminal accepte la réponse claire ainsi que deux commandes utilitaires.
  const terminalLog = root.querySelector('[data-terminal-log]');
  const terminalForm = root.querySelector('[data-terminal-form]');
  const terminalInput = root.querySelector('[data-terminal-input]');

  function appendTerminalLine(message, tone = '') {
    const line = document.createElement('p');
    if (tone) line.className = `terminal-line--${tone}`;
    line.textContent = message;
    terminalLog.appendChild(line);
    terminalLog.scrollTop = terminalLog.scrollHeight;
  }

  function showHackerHint() {
    appendTerminalLine('[HINT] Move every encrypted letter three positions backward.', 'hint');
    appendTerminalLine('[EXAMPLE] D → A // X → U', 'hint');
  }

  function resetHackerProtocol() {
    hackerAttempts = 0;
    terminalLog.innerHTML = '';
    terminalInput.value = '';
    terminalInput.disabled = false;
    appendTerminalLine('[BOOT] GUNSTAR BLACKNODE v1.0.0');
    appendTerminalLine('[OK] Secure tunnel established. Trace masked.');
    appendTerminalLine('[WARN] Encrypted payload recovered from archive sector 100.', 'warning');
    appendTerminalLine('[TASK] Reverse the cipher and submit plaintext.');
    schedule(() => terminalInput.focus({ preventScroll: true }), 320);
  }

  terminalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (activeProtocol !== 'hacker') return;
    const command = terminalInput.value.trim().toUpperCase();
    if (!command) return;

    appendTerminalLine(`root@blacknode:~$ ${terminalInput.value.trim()}`, 'command');
    terminalInput.value = '';

    if (command === 'HELP' || command === 'HINT') {
      showHackerHint();
      return;
    }

    if (command === 'GUNSTAR') {
      terminalInput.disabled = true;
      appendTerminalLine('[OK] PLAINTEXT TOKEN ACCEPTED.', 'success');
      appendTerminalLine('[OK] HASH MATCH // f31c:100:7a9e', 'success');
      appendTerminalLine('[ROOT] Vault permissions elevated.', 'success');
      schedule(() => grantAccess('hacker'), 1250);
      return;
    }

    hackerAttempts += 1;
    appendTerminalLine(`[ERROR] HASH MISMATCH // ATTEMPT ${String(hackerAttempts).padStart(2, '0')}`, 'error');
    if (hackerAttempts === 3) showHackerHint();
  });

  root.querySelectorAll('[data-terminal-command]').forEach(button => {
    button.addEventListener('click', () => {
      if (button.dataset.terminalCommand === 'hint') showHackerHint();
      if (button.dataset.terminalCommand === 'clear') terminalLog.innerHTML = '';
      terminalInput.focus({ preventScroll: true });
    });
  });

  closeButton.addEventListener('click', close);
  root.addEventListener('click', (event) => {
    if (event.target === root) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !root.hidden) close();
  });

  return { open, close };
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
