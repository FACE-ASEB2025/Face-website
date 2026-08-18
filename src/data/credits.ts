/**
 * Who built the site, and what with.
 */

import type { Member } from './team';

import atharv from '../assets/team/atharv.jpeg';
import harshil from '../assets/team/harshil.jpeg';
import hisana from '../assets/team/hisana.jpeg';
import pranav from '../assets/team/pranav.jpeg';

export const developers: Member[] = [
  {
    name: 'Hisana Nissar',
    role: 'Developer',
    photo: hisana,
    linkedin: 'https://www.linkedin.com/in/hisana-nissar-736b7936b/',
    github: 'https://github.com/Hisana-07',
  },
  {
    name: 'Atharv Babu',
    role: 'Developer',
    photo: atharv,
    linkedin: 'https://www.linkedin.com/in/atharv-babu-376305322/',
    github: 'https://github.com/MrValmeeki',
  },
  {
    name: 'Pranav Krishna',
    role: 'Developer',
    photo: pranav,
    linkedin: 'https://www.linkedin.com/in/pranav-krishna-206417249/',
    github: 'https://github.com/Pranav-k-0307',
  },
  {
    name: 'Harshill',
    role: 'Developer',
    photo: harshil,
    linkedin: 'https://www.linkedin.com/in/harshil-byggari-30093b310/',
    github: 'https://github.com/Harshil-Byggari',
  },
];

export type TechItem = {
  name: string;
  detail: string;
  href: string;
};

export const stack: TechItem[] = [
  {
    name: 'Astro',
    detail: 'Static site framework — one layout, zero client-side routing.',
    href: 'https://astro.build',
  },
  {
    name: 'TypeScript',
    detail: 'Types the team, event and credits data so bad entries fail the build.',
    href: 'https://www.typescriptlang.org',
  },
  {
    name: 'Modern CSS',
    detail: 'Custom properties, fluid type, no framework and no utility classes.',
    href: 'https://developer.mozilla.org/docs/Web/CSS',
  },
  {
    name: 'Instrument Sans',
    detail: 'Body and heading typeface. Carries the whole hierarchy at three weights.',
    href: 'https://fonts.google.com/specimen/Instrument+Sans',
  },
  {
    name: 'IBM Plex Mono',
    detail: 'Dates, roles, counts and labels — anything that reads as data.',
    href: 'https://fonts.google.com/specimen/IBM+Plex+Mono',
  },
  {
    name: 'Neue Machina',
    detail: 'The FACE wordmark only, carried over from the original identity.',
    href: 'https://pangrampangram.com/products/neue-machina',
  },
  {
    name: 'GitHub',
    detail: 'Source, review and history for everything you are looking at.',
    href: 'https://github.com/FACE-ASEB2025',
  },
];
