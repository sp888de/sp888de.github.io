import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';

const html = await readFile(new URL('../Shop.html', import.meta.url), 'utf8');
const dom = new JSDOM(html, { runScripts: 'dangerously' });
const { document } = dom.window;
const filters = Array.from(document.querySelectorAll('[data-filter]'));
const cards = Array.from(document.querySelectorAll('.catalog-item'));
const groups = Array.from(document.querySelectorAll('.shop-group'));

assert.ok(cards.length > 0);
assert.ok(groups.length > 0);

for (const category of ['mercenary', 'business', 'hacker', 'all']) {
  const selected = filters.find(button => button.dataset.filter === category);
  assert.ok(selected, `Missing filter: ${category}`);
  selected.click();

  const expected = cards.filter(card => category === 'all' || card.dataset.category === category);
  assert.ok(expected.length > 0, `Missing cards: ${category}`);
  assert.deepEqual(cards.filter(card => !card.hidden), expected);
  assert.deepEqual(filters.filter(button => button.getAttribute('aria-pressed') === 'true'), [selected]);

  for (const group of groups) {
    assert.equal(group.hidden, !expected.some(card => group.contains(card)));
  }
}

dom.window.close();
console.log('Shop category filters: all interaction tests passed.');
