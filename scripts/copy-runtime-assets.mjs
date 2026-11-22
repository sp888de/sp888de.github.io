import { copyFile, cp } from 'node:fs/promises';

// Les fiches produits utilisent des chemins calculés au runtime.
await cp('assets', 'dist/assets', { recursive: true });

await Promise.all([
  copyFile('robots.txt', 'dist/robots.txt'),
  copyFile('sitemap.xml', 'dist/sitemap.xml'),
]);
