# FACE — Amrita Bengaluru

Website for FACE, the student tech community at Amrita Vishwa Vidyapeetham, Bengaluru.

Built with [Astro](https://astro.build). Static output — no server, no database.

## Running it

You need [Node.js](https://nodejs.org) 18 or newer. Then:

```bash
npm install
```

```bash
npm run dev
```

That serves the site at http://localhost:4321 and reloads as you edit.

To produce the deployable files (they land in `dist/`):

```bash
npm run build
```

## Editing content

Most changes don't need you to touch any HTML.

| To change… | Edit |
| --- | --- |
| Team members, roles, divisions | `src/data/team.ts` |
| Events | `src/data/events.ts` |
| Site name, nav links, social links | `src/data/site.ts` |
| Website credits and tech list | `src/data/credits.ts` |

### Adding a team member

1. Put their photo in `src/assets/team/`. Any size — it gets resized and converted to WebP at build time, so don't bother compressing it first.
2. Import it at the top of `src/data/team.ts` and add an entry to the right division.

Leave `linkedin` / `github` out entirely if you don't have a real URL. An empty or `#` link is worse than no link.

### Adding an event

Add an entry to `events` in `src/data/events.ts`. The site sorts it for you:

- dated today or later → shows under **Upcoming**, with its Register button
- dated in the past → moves to **Past events**, and the Register button disappears

This is deliberate. The previous version of the site advertised "Register Now" for an event that had happened six months earlier, because the state was hand-written. Now the only thing you maintain is the date.

Note this happens **at build time**, so a site that is never rebuilt will eventually go stale anyway. Rebuild at the start of each term.

## Design system

Colours, type scale, spacing and motion all live as custom properties in `src/styles/global.css`.

Two layers:

- **Raw palette** — the full 50→950 scales. The scale is inverted between light and dark on purpose, so low numbers always sit near the background and high numbers near the foreground in *both* schemes.
- **Semantic tokens** — `--surface`, `--text`, `--text-muted`, `--accent`, `--border` and friends. **Components should only ever use these.** Every pair is contrast-checked against its own background in its own scheme.

Light and dark follow the visitor's system setting. There is no manual toggle.

If you add a colour, add it as a semantic token rather than hard-coding a hex in a component — that's what keeps both themes working.

## Brand assets

The source logo is light-grey artwork meant for dark backgrounds, so it's invisible on the light theme. `scripts/generate-brand-assets.mjs` derives a dark-ink variant plus the social card and favicons:

```bash
npm run brand
```

The outputs are committed. You only need to re-run this if the logo itself changes.

## Deploying

`npm run build` writes plain static files to `dist/`. Point any static host at that directory.

Pages build as `about.html`, `events.html` and so on, matching the URLs the old site used, so existing links keep working.

**One thing to check:** `astro.config.mjs` has a `SITE` constant at the top. It must match the real deployed URL or the social share cards and sitemap will point at the wrong place.
