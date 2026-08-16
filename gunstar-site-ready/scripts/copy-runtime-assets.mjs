import { cp } from 'node:fs/promises';

// Les fiches produits utilisent des chemins calculés au runtime.
await cp('assets', 'dist/assets', { recursive: true });
