/**
 * One-time brand asset generation. Run with `npm run brand`.
 *
 * The source logo (src/assets/face-logo.png) is light grey artwork on
 * transparency — it was drawn for the old dark-only site and disappears against
 * a light background. This produces the variants the themed site needs.
 *
 * Outputs are committed to the repo; you only need to re-run this if the source
 * logo changes.
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'src/assets/face-logo.png';

// Brand dark surface, matching --background-50 in dark mode.
const DARK = { r: 5, g: 5, b: 20, alpha: 1 };
const ACCENT = '#3129d6';

await mkdir('public', { recursive: true });

/* 1. Dark-ink logo for light backgrounds ---------------------------------- */
// negate() with alpha:false inverts RGB and leaves transparency intact, so the
// artwork keeps its shading instead of collapsing to a flat silhouette.
await sharp(SRC).negate({ alpha: false }).toFile('src/assets/face-logo-ink.png');
console.log('src/assets/face-logo-ink.png');

/* 2. Social card ----------------------------------------------------------- */
const logoForCard = await sharp(SRC).resize({ width: 620 }).toBuffer();

await sharp({
  create: { width: 1200, height: 630, channels: 4, background: DARK },
})
  .composite([{ input: logoForCard, gravity: 'centre' }])
  .png()
  .toFile('public/og-image.png');
console.log('public/og-image.png');

/* 3. Favicon --------------------------------------------------------------- */
// The wordmark is 2:1 and turns to mush at 32px, so the icon uses a standalone
// "F" mark instead — legible all the way down to a browser tab.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${ACCENT}"/>
  <path d="M22 16 H44 V22 H28 V30 H40 V36 H28 V48 H22 Z" fill="#ffffff"/>
</svg>`;

await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('public/apple-touch-icon.png');

await sharp(Buffer.from(faviconSvg)).resize(32, 32).png().toFile('public/favicon-32.png');
console.log('public/favicon-32.png');

const { writeFile } = await import('node:fs/promises');
await writeFile('public/favicon.svg', faviconSvg);
console.log('public/favicon.svg');
