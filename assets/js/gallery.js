import { createRoom } from './gallery-room.js';

const threeURL = 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
const mediaRoot = 'https://res.cloudinary.com/iptm1k0x/image/upload/';
const previewRoot = mediaRoot + 'c_limit,w_900,h_1000,q_auto/';
const posterPrice = 990;
const paperWeight = 200;
const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });

if (typeof GUNSTAR_PRODUCTS === 'undefined' && document.readyState !== 'complete') {
  await new Promise(resolve => window.addEventListener('load', resolve, { once: true }));
}

const shopPoster = typeof GUNSTAR_PRODUCTS === 'undefined'
  ? undefined
  : GUNSTAR_PRODUCTS.find(product => product.id === '07');
const artworks = [
  ['GUNSTAR_N001', 1559, 1949, 'affiche_purple_dirt.png'],
  ['GUNSTAR_N002', 1559, 1949, 'Affiche_brun_dirt.png'],
  ['GUNSTAR_N003', 1772, 2480, 'stop_talkingv2.png'],
  ['GUNSTAR_N004', 1772, 2480, 'stoptalkingdraw.png'],
  ['GUNSTAR_N005', 1772, 2480, 'stop_talking.png'],
  ['GUNSTAR_N006', 6000, 4000, 'gunsatr_december.png']
].map(([name, width, height, file]) => ({
  name, width, height,
  preview: previewRoot + file,
  price: posterPrice,
  paperWeight,
  download: mediaRoot + 'fl_attachment:' + name + '/' + file
}));

if (shopPoster) {
  const cover = shopPoster.media.find(item => item.variant === 'WHITE');
  artworks.push({
    name: shopPoster.name,
    width: 4724,
    height: 5906,
    preview: cover.src.replace(mediaRoot, previewRoot),
    price: shopPoster.price,
    paperWeight: shopPoster.paperWeight,
    shopUrl: 'product.html?item=' + shopPoster.id
  });
}

function posterSpecs(artwork) {
  return euro.format(artwork.price / 100) + ' · ' + artwork.paperWeight + ' g/m² paper';
}

const get = id => document.getElementById('gallery-' + id);
const stage = get('stage');
const roomSection = get('room');
const list = get('list');
const grid = get('grid');
const roomView = get('room-view');
const listView = get('list-view');
const detail = get('detail');
const image = get('artwork');
const locate = get('locate');
const look = get('look');
const open = get('open');
const hint = get('hint');
const caption = document.querySelector('.gallery-caption');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let room;
let selectedPrint;
let lastArtwork;
let lastTrigger;
let usedCollection = false;

const cards = artworks.map((artwork, index) => {
  const card = document.createElement('button');
  card.className = 'gallery-card';
  card.type = 'button';

  const mount = document.createElement('span');
  mount.className = 'gallery-card-image';
  const thumbnail = document.createElement('img');
  thumbnail.src = artwork.preview;
  thumbnail.width = artwork.width;
  thumbnail.height = artwork.height;
  thumbnail.alt = '';
  thumbnail.loading = 'lazy';
  mount.append(thumbnail);

  const title = document.createElement('span');
  title.className = 'gallery-card-title';
  title.textContent = artwork.name;
  const specs = document.createElement('span');
  specs.className = 'gallery-card-specs';
  specs.textContent = posterSpecs(artwork);
  card.append(mount, title, specs);
  card.addEventListener('click', () => {
    usedCollection = true;
    openArtwork(index, card, thumbnail.getBoundingClientRect());
  });
  return card;
});
grid.append(...cards);

function setView(showRoom) {
  roomSection.hidden = !showRoom;
  list.hidden = showRoom;
  roomView.setAttribute('aria-pressed', String(showRoom));
  listView.setAttribute('aria-pressed', String(!showRoom));
  window.scrollTo(0, 0);
}

function showCollection() {
  usedCollection = true;
  setView(false);
  get('list-title').focus({ preventScroll: true });
}

function showRoom(index) {
  if (!room) return;
  setView(true);
  if (index !== undefined) focusPrint(room.locate(index), true);
  else look.focus({ preventScroll: true });
}

function setHint(first, second) {
  hint.replaceChildren(first, document.createElement('br'), second);
}

function focusPrint(print, moveFocus = false) {
  selectedPrint = print;
  lastArtwork = print.index;
  room.focus(print);
  get('focus-title').textContent = artworks[print.index].name;
  get('focus').hidden = false;
  get('look').hidden = true;
  caption.hidden = true;
  setHint('Select the artwork to open', 'Choose Step back to keep walking');
  if (moveFocus) open.focus({ preventScroll: true });
}

function stepBack() {
  if (!selectedPrint) return;
  const focusedOnControls = get('focus').contains(document.activeElement);
  selectedPrint = undefined;
  room.stepBack();
  get('focus').hidden = true;
  look.hidden = false;
  caption.hidden = false;
  setHint('Scroll or drag to walk', 'Select an artwork to look closer');
  if (focusedOnControls) look.focus({ preventScroll: true });
}

function openArtwork(index, trigger, origin) {
  const artwork = artworks[index];
  lastArtwork = index;
  lastTrigger = trigger;
  image.src = artwork.preview;
  image.alt = artwork.name;
  image.width = artwork.width;
  image.height = artwork.height;
  get('detail-title').textContent = artwork.name;
  get('poster-specs').textContent = posterSpecs(artwork);
  get('dimensions').hidden = !artwork.download;
  get('dimensions').textContent = artwork.download
    ? 'Wallpaper for personal use · ' + artwork.width + ' × ' + artwork.height + ' px'
    : '';
  const download = get('download');
  download.hidden = !artwork.download;
  if (artwork.download) {
    download.href = artwork.download;
    download.download = artwork.name + '.png';
  } else {
    download.removeAttribute('href');
  }
  const shop = get('shop');
  shop.hidden = !artwork.shopUrl;
  if (artwork.shopUrl) shop.href = artwork.shopUrl;
  else shop.removeAttribute('href');
  locate.hidden = !room;
  detail.scrollTop = 0;
  detail.showModal();

  const destination = image.getBoundingClientRect();
  if (!origin || reduced.matches || !destination.width || !destination.height) return;
  image.animate([
    {
      transformOrigin: 'top left',
      transform: 'translate(' + (origin.left - destination.left) + 'px, ' + (origin.top - destination.top) + 'px) scale(' +
        origin.width / destination.width + ', ' + origin.height / destination.height + ')'
    },
    { transformOrigin: 'top left', transform: 'none' }
  ], { duration: 300, easing: 'cubic-bezier(.25,.75,.25,1)' });
}

function openFocusedArtwork() {
  if (selectedPrint) openArtwork(selectedPrint.index, open, room.bounds(selectedPrint));
}

get('collection').addEventListener('click', showCollection);
get('step-back').addEventListener('click', stepBack);
get('prev').addEventListener('click', () => room.step(-1));
get('next').addEventListener('click', () => room.step(1));
look.addEventListener('click', () => focusPrint(room.nearest(), true));
open.addEventListener('click', openFocusedArtwork);
listView.addEventListener('click', showCollection);
roomView.addEventListener('click', () => showRoom(lastArtwork));

locate.addEventListener('click', () => {
  lastTrigger = undefined;
  detail.close();
  showRoom(lastArtwork);
});

detail.addEventListener('close', () => lastTrigger?.focus({ preventScroll: true }));

document.addEventListener('keydown', event => {
  if (roomSection.hidden || document.querySelector('dialog[open]') || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'Escape') stepBack();
  const directions = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };
  const direction = directions[event.key];
  if (direction) {
    event.preventDefault();
    room.step(direction);
  }
});

function useFallback() {
  room = undefined;
  roomView.parentElement.hidden = true;
  locate.hidden = true;
  setView(false);
}

try {
  const THREE = await import(/* @vite-ignore */ threeURL);
  room = createRoom(THREE, stage, artworks, print => {
    if (selectedPrint === print) openFocusedArtwork();
    else focusPrint(print);
  }, stepBack);
  if (!usedCollection && !list.contains(document.activeElement)) setView(true);
  room.start();
  roomView.parentElement.hidden = false;
  if (detail.open) locate.hidden = false;
  stage.querySelector('canvas').addEventListener('webglcontextlost', useFallback);
} catch (error) {
  console.warn('GUNSTAR gallery is using the collection view.', error);
  useFallback();
}
