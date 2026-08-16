import { defineConfig } from 'vite';

// Toutes les pages HTML restent des entrées indépendantes pour GitHub Pages.
export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        archive: 'galerie.html',
        product: 'product.html',
        about: 'a-propos.html',
        contact: 'contact.html'
      }
    }
  }
});
