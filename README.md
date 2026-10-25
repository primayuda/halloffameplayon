# PlayOn 85 Hall of Fame

Post-race Hall of Fame for the PlayOn 85 team at ITB Ultra Marathon 2026 (Jakarta–Bandung).

Static site built with Astro and React, deployed to GitHub Pages.

## Layout

```
src/components/   Hero, Filters, RunnerCard, Roster
src/data/         runners.json is the published roster (empty in git)
src/assets/       photos/ and logos/ stay local until cleared for publish
```

Real runner records, photos, and Cursor working notes are gitignored. Keep them in `src/data/runners.local.json` and the local asset folders. The site uses that local file when it is present, and otherwise uses the empty published roster.

## Scripts

```bash
npm install
npm run dev
npm run build
```

The published site is `https://primayuda.github.io/halloffameplayon/`.
