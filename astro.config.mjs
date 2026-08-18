import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// The canonical origin of the deployed site.
// Used to build absolute URLs for Open Graph / Twitter card images and the sitemap.
// >>> If the site moves to a custom domain, this is the ONE line to change. <<<
const SITE = 'https://face-aseb.netlify.app';

export default defineConfig({
  site: SITE,

  image: {
    // `constrained` + responsiveStyles makes <Image> emit a srcset and the CSS
    // needed to avoid layout shift, so we never hand-write width/height math.
    layout: 'constrained',
    responsiveStyles: true,
    objectFit: 'cover',
  },

  build: {
    // Emit /about.html rather than /about/index.html so the output stays
    // drop-in compatible with plain static hosts.
    format: 'file',
  },

  integrations: [sitemap()],
});