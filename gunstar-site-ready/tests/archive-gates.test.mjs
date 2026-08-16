import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const html = await readFile(new URL('../galerie.html', import.meta.url), 'utf8');
const script = await readFile(new URL('../assets/js/script.js', import.meta.url), 'utf8');
const dom = new JSDOM(html, {
  url: 'https://gunstar.test/galerie.html',
  runScripts: 'outside-only',
  pretendToBeVisual: true
});

const { window } = dom;

// Le test accélère les animations sans changer leur logique d'état.
window.requestAnimationFrame = callback => callback();
window.setTimeout = callback => {
  callback();
  return 1;
};
window.clearTimeout = () => {};
window.Element.prototype.animate = () => ({ finished: Promise.resolve() });
window.IntersectionObserver = class {
  constructor(callback) { this.callback = callback; }
  observe(element) { this.callback([{ isIntersecting: true, target: element }]); }
  unobserve() {}
};

window.eval(script);
window.document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

const filter = name => window.document.querySelector(`[data-filter="${name}"]`);
const visibleCards = () => Array.from(window.document.querySelectorAll('.catalog-item'))
  .filter(card => card.style.display !== 'none');

filter('mercenary').click();
assert.equal(window.document.querySelector('[data-challenge="mercenary"]').hidden, false);
const alias = window.document.querySelector('[data-operative-alias]');
alias.value = 'NIGHTFALL';
alias.dispatchEvent(new window.Event('input', { bubbles: true }));
const consent = window.document.querySelector('[data-contract-consent]');
consent.checked = true;
consent.dispatchEvent(new window.Event('change', { bubbles: true }));
window.document.querySelector('[data-mercenary-sign]').click();
assert.equal(filter('mercenary').getAttribute('aria-pressed'), 'true');
assert.ok(visibleCards().every(card => card.dataset.category === 'mercenary'));

filter('business').click();
const winningCase = window.document.querySelector('.case-choice.has-money');
assert.ok(winningCase, 'A winning case must exist.');
winningCase.click();
assert.equal(filter('business').getAttribute('aria-pressed'), 'true');
assert.ok(visibleCards().every(card => card.dataset.category === 'business'));

filter('hacker').click();
const terminalInput = window.document.querySelector('[data-terminal-input]');
terminalInput.value = 'GUNSTAR';
window.document.querySelector('[data-terminal-form]').dispatchEvent(
  new window.Event('submit', { bubbles: true, cancelable: true })
);
assert.equal(filter('hacker').getAttribute('aria-pressed'), 'true');
assert.ok(visibleCards().every(card => card.dataset.category === 'hacker'));

console.log('Archive access protocols: all interaction tests passed.');
