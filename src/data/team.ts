/**
 * The team roster.
 *
 * To add someone: drop their photo in src/assets/team/, import it below, and
 * add an entry to the relevant group. Nothing else needs touching — the page
 * builds itself from this file.
 *
 * Omit `linkedin`/`github` entirely if you don't have a real URL. Empty or "#"
 * links render as dead links and are worse than no link at all.
 */

import type { ImageMetadata } from 'astro';

import akshaya from '../assets/team/akshaya.jpeg';
import akshit from '../assets/team/akshit.jpeg';
import ali from '../assets/team/ali.jpeg';
import amen from '../assets/team/amen.jpeg';
import ananthakrishnan from '../assets/team/ananthakrishnan.jpeg';
import ananya from '../assets/team/ananya.jpeg';
import andrew from '../assets/team/andrew.jpeg';
import arjun from '../assets/team/arjun.jpeg';
import atharv from '../assets/team/atharv.jpeg';
import deepthi from '../assets/team/deepthi.jpeg';
import dhayanitha from '../assets/team/dhayanitha.jpeg';
import ganesh from '../assets/team/ganesh.jpg';
import harinandan from '../assets/team/harinandan.jpeg';
import harshil from '../assets/team/harshil.jpeg';
import hisana from '../assets/team/hisana.jpeg';
import jeevietha from '../assets/team/jeevietha.jpeg';
import jhanavi from '../assets/team/jhanavi.jpeg';
import karthik from '../assets/team/karthik.jpeg';
import kavni from '../assets/team/kavni.jpeg';
import laavya from '../assets/team/laavya.jpeg';
import madhav from '../assets/team/madhav.jpeg';
import namreta from '../assets/team/namreta.jpeg';
import nayan from '../assets/team/nayan.jpeg';
import pranav from '../assets/team/pranav.jpeg';
import pranavVipin from '../assets/team/pranav_vipin.jpeg';
import roydon from '../assets/team/roydon.jpeg';
import sumit from '../assets/team/sumit.jpeg';
import tanay from '../assets/team/tanay.jpeg';
import vardhan from '../assets/team/vardhan.jpeg';

export type Member = {
  name: string;
  role: string;
  photo: ImageMetadata;
  linkedin?: string;
  github?: string;
};

export type Division = {
  name: string;
  /** Anchor id, so the home page can link straight to a division. */
  slug: string;
  /** One line on what the division actually does. */
  blurb: string;
  members: Member[];
};

export const officeBearers: Member[] = [
  {
    name: 'Andrew Tom Mathew',
    role: 'President',
    photo: andrew,
  },
  {
    name: 'Pranav Krishna',
    role: 'Vice President',
    photo: pranav,
    linkedin: 'https://www.linkedin.com/in/pranav-krishna-206417249/',
    github: 'https://github.com/Pranav-k-0307',
  },
  {
    name: 'Laavya Sri',
    role: 'Vice President',
    photo: laavya,
  },
  {
    name: 'Anantha Krishnan',
    role: 'Treasurer',
    photo: ananthakrishnan,
  },
];

export const divisions: Division[] = [
  {
    name: 'Web Development',
    slug: 'web-development',
    blurb: 'Builds and maintains this site.',
    members: [
      {
        name: 'Hisana Nissar',
        role: 'POC',
        photo: hisana,
        linkedin: 'https://www.linkedin.com/in/hisana-nissar-736b7936b/',
        github: 'https://github.com/Hisana-07',
      },
      {
        name: 'Atharv Babu',
        role: 'POC',
        photo: atharv,
        linkedin: 'https://www.linkedin.com/in/atharv-babu-376305322/',
        github: 'https://github.com/MrValmeeki',
      },
      {
        name: 'Harshill',
        role: 'Executive',
        photo: harshil,
        linkedin: 'https://www.linkedin.com/in/harshil-byggari-30093b310/',
        github: 'https://github.com/Harshil-Byggari',
      },
      { name: 'Gampa Sri Madhav', role: 'Executive', photo: madhav },
      { name: 'Jeevietha', role: 'Executive', photo: jeevietha },
      { name: 'Ganesh Abhinav Reddy', role: 'Executive', photo: ganesh },
      { name: 'Arjun Menon', role: 'Executive', photo: arjun },
    ],
  },
  {
    name: 'Events',
    slug: 'events',
    blurb: 'Books the halls, the speakers and the dates.',
    members: [
      // NOTE: Hisana Nissar was previously listed here as well as under Web
      // Development. Kept under Web Development only, where she is POC.
      { name: 'Pranav Vipin Pillai', role: 'POC', photo: pranavVipin },
      { name: 'Jahnavi', role: 'Executive', photo: jhanavi },
      { name: 'K Deepti', role: 'Executive', photo: deepthi },
      { name: 'Sumit Bhushan Singh', role: 'Executive', photo: sumit },
      { name: 'Ananya', role: 'Executive', photo: ananya },
      { name: 'Akshit', role: 'Executive', photo: akshit },
      { name: 'Tanay Ashish', role: 'Executive', photo: tanay },
      { name: 'Harinandhan Praveen', role: 'Executive', photo: harinandan },
    ],
  },
  {
    name: 'Creative',
    slug: 'creative',
    blurb: "Posters, photographs, everything with the club's name on it.",
    members: [
      { name: 'Amen', role: 'POC', photo: amen },
      { name: 'Ali', role: 'POC', photo: ali },
      { name: 'Akshaya Kokkalla', role: 'Executive', photo: akshaya },
      { name: 'Kavni', role: 'Executive', photo: kavni },
      { name: 'Nayan', role: 'Executive', photo: nayan },
      { name: 'Dhayanithaa S', role: 'Executive', photo: dhayanitha },
    ],
  },
  {
    name: 'Sponsorship',
    slug: 'sponsorship',
    blurb: 'Talks to the people who pay for the rest of it.',
    members: [
      { name: 'Karthik VK', role: 'POC', photo: karthik },
      { name: 'Vardhan', role: 'Executive', photo: vardhan },
      { name: 'Namreta PL', role: 'Executive', photo: namreta },
      { name: 'Roydon', role: 'Executive', photo: roydon },
    ],
  },
];

/** Total headcount, used for the stat on the home page. */
export const memberCount =
  officeBearers.length + divisions.reduce((n, d) => n + d.members.length, 0);

/**
 * "POC: Karthik VK." / "POCs: Amen and Ali." — derived from the roster rather
 * than written out again, so it can't fall out of step with who is listed.
 */
export function pocLine(division: Division): string {
  const names = division.members.filter((m) => m.role === 'POC').map((m) => m.name);
  if (names.length === 0) return '';
  const joined =
    names.length === 1 ? names[0] : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;
  return `${names.length === 1 ? 'POC' : 'POCs'}: ${joined}.`;
}
