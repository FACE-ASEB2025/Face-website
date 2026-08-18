/**
 * Site-wide constants. Edit here, not in individual pages.
 */

import type { IconName } from '../components/icons';

export const site = {
  name: 'FACE',
  longName: 'FACE — Amrita Vishwa Vidyapeetham, Bengaluru',
  tagline: 'The tech community at Amrita Bengaluru.',
  description:
    'FACE is the student tech community at Amrita Vishwa Vidyapeetham, Bengaluru — running workshops, hackathons and tech talks, and building things together.',
  email: 'faceclubamrita@gmail.com',
  /** One line under the footer wordmark. Shorter than `description`, which
      has to work as a search result. */
  blurb:
    'The student tech community at Amrita Bengaluru, where innovation meets collaboration.',
  /** Short form for the footer; the contact page prints the full postal address. */
  address: ['Amrita Vishwa Vidyapeetham', 'Kasavanahalli, Bengaluru 560035'],
  postalAddress: [
    'Amrita Vishwa Vidyapeetham',
    'Kasavanahalli, Carmelaram Post',
    'Bengaluru 560035, Karnataka',
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  /** Shown beside the label in the footer's quick links. */
  icon: IconName;
};

/**
 * The navigation, in order. This one array feeds the header, the footer's
 * quick links and the sitemap — add or remove an entry here and all three
 * follow.
 *
 * ┌───────────────────────────────────────────────────────────────────────┐
 * │  TO BRING SLAC BACK: delete the two slashes on the SLAC line below.    │
 * │  That is the whole change — nothing else needs touching.               │
 * │                                                                       │
 * │  It is only hidden from the menus. /slac still works and still         │
 * │  forwards to slac.netlify.app, so any link already shared keeps        │
 * │  working either way.                                                   │
 * └───────────────────────────────────────────────────────────────────────┘
 */
export const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: 'home' },
  { label: 'About', href: '/about', icon: 'info' },
  { label: 'Events', href: '/events', icon: 'calendar' },
  { label: 'Team', href: '/team', icon: 'users' },

  // 👇 UNCOMMENT THIS LINE TO SHOW SLAC AGAIN 👇
  // { label: 'SLAC', href: 'https://slac.netlify.app', icon: 'arrow-up-right', external: true },

  { label: 'Contact', href: '/contact', icon: 'mail' },
  { label: 'Credits', href: '/credits', icon: 'star' },
];

export type SocialLink = {
  label: string;
  href: string;
  /** The account as it is written elsewhere, shown under the label. */
  handle: string;
  /** What this channel is actually good for — used on the contact page. */
  blurb: string;
  /** Which glyph to show beside the label. */
  icon: IconName;
};

// The old site sent "email us" through an Outlook web deeplink, which forces
// anyone without an Outlook account through a login wall. A plain mailto:
// opens whatever mail client the visitor actually uses.
export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    icon: 'mail',
    href: `mailto:${site.email}`,
    handle: site.email,
    blurb:
      'Best for anything detailed — collaborations, sponsorship, or a question that needs a real answer.',
  },
  {
    label: 'Instagram',
    icon: 'instagram',
    href: 'https://www.instagram.com/face_aseb/',
    handle: '@face_aseb',
    blurb: 'Where events get announced first. Start here if you just want to know what is on.',
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/face-amrita/',
    handle: 'face-amrita',
    blurb: 'Club updates and what our members go on to do.',
  },
  {
    label: 'GitHub',
    icon: 'github',
    href: 'https://github.com/FACE-ASEB2025',
    handle: 'FACE-ASEB2025',
    blurb: 'Our code, including this website.',
  },
];
