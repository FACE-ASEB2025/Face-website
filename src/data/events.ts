/**
 * Events.
 *
 * Add an event here and the site places it automatically: anything dated today
 * or later shows under "Upcoming" with its register button; anything older
 * moves to "Past" and the register button disappears. That is deliberate — the
 * old site kept showing "Register Now" for an event six months after it ran.
 *
 * `date` is the start, in local Indian time. `endDate` is optional and only
 * needed for multi-day events.
 */

import type { ImageMetadata } from 'astro';

import aiHealthcare from '../assets/events/ai-healthcare.jpg';
import pythonIot from '../assets/events/python-iot.jpeg';

export type Event = {
  /** URL-safe id, used for anchor links. */
  slug: string;
  title: string;
  subtitle?: string;
  /** ISO date, e.g. '2026-02-18'. */
  date: string;
  endDate?: string;
  /** Human-readable time range, e.g. '2:00–4:00 PM'. Optional. */
  time?: string;
  venue: string;
  /** Entry terms, shown on upcoming events only. */
  entry?: string;
  description: string;
  /** Short topic labels, printed as a mono list under the event. */
  topics: string[];
  poster: ImageMetadata;
  /** Registration URL. Only rendered while the event is still upcoming. */
  registerUrl?: string;
};

export const events: Event[] = [
  {
    slug: 'ai-in-healthcare',
    title: 'Prospects of AI in Healthcare',
    subtitle: 'Tech talk — career opportunities and the road ahead',
    date: '2026-02-18',
    time: '2:00–4:00 PM',
    venue: 'Rama Hall, Amrita Bengaluru',
    entry: 'Free, open to all students',
    description:
      'Dr. Chandrashekara S (MD, DNB, DM), Immediate Past President of the Indian Rheumatology Association, on how AI is reshaping clinical practice — and what that means for the careers students are about to start.',
    topics: ['AI in medicine', 'Healthcare tech', 'Career roadmaps'],
    poster: aiHealthcare,
    registerUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeMLHZLchK4anJ2AULYjoMVJGgriSNl7MCQz-5VdIDkkFhCUA/viewform?usp=dialog',
  },
  {
    slug: 'python-iot-workshop',
    title: 'Python → IoT Integration Workshop',
    subtitle: 'From language fundamentals to a working radar build',
    // The old site carried two conflicting dates for this one: the past-events
    // card said April 15 2024, while the home page (when it was still the
    // upcoming event) said September 3 2025. Going with the latter.
    date: '2025-09-03',
    venue: 'Amrita Vishwa Vidyapeetham, Bengaluru',
    description:
      'A hands-on session covering Python fundamentals and then putting them to work: attendees wired up and programmed a functioning IoT radar before the day was out.',
    topics: ['Python', 'IoT', 'Hands-on build'],
    poster: pythonIot,
  },
];

/** Midnight today, so an event running *today* still counts as upcoming. */
function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function eventEnd(event: Event): Date {
  return new Date(`${event.endDate ?? event.date}T23:59:59`);
}

export function upcomingEvents(): Event[] {
  const cutoff = startOfToday();
  return events
    .filter((e) => eventEnd(e) >= cutoff)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function pastEvents(): Event[] {
  const cutoff = startOfToday();
  return events
    .filter((e) => eventEnd(e) < cutoff)
    .sort((a, b) => b.date.localeCompare(a.date));
}

/* Split in two so the weekday can sit alongside the date without the comma
   en-IN puts between them ("Wednesday 18 February 2026"). */
const weekdayFmt = new Intl.DateTimeFormat('en-IN', {
  weekday: 'long',
  timeZone: 'Asia/Kolkata',
});

const dateFmt = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Kolkata',
});

function formatOne(iso: string): string {
  const at = new Date(`${iso}T12:00:00`);
  return `${weekdayFmt.format(at)} ${dateFmt.format(at)}`;
}

export function formatEventDate(event: Event): string {
  const start = formatOne(event.date);
  if (!event.endDate) return start;
  return `${start} – ${formatOne(event.endDate)}`;
}
