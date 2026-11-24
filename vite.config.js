import { defineConfig } from 'vite';

// Toutes les pages HTML restent des entrées indépendantes pour GitHub Pages.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        shop: 'Shop.html',
        legacyShop: 'galerie.html',
        product: 'product.html',
        about: 'a-propos.html',
        contact: 'contact.html',
        gallery: 'Gallery.html',
        wallpaper: 'wallpaper.html',
        checkout: 'checkout.html',
        checkoutReturn: 'checkout-return.html',
      }
    }
  }
});
