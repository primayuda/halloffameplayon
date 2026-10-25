# PlayOn 85 Hall of Fame

Post-race Hall of Fame for the PlayOn 85 team at ITB Ultra Marathon 2026 (Jakarta–Bandung).

Plain HTML, CSS, and JavaScript site for GitHub Pages.

## Page

Desktop

![PlayOn 85 Hall of Fame on a desktop screen](docs/screenshots/desktop.png)

Mobile

![PlayOn 85 Hall of Fame on a phone screen](docs/screenshots/mobile.png)

## Layout

```
index.html
favicon.ico                browser tab icon
css/styles.css
js/app.js                  roster, search, theme, Ketua, and Team Support
js/theme.js                applies the saved theme, or dark mode, before paint
data/runners.json          published roster, including reflections
data/runners.local.json    optional local copy, this machine only
assets/favicon.png         browser tab icon, PNG fallback
assets/og.png              image shown when the link is shared
assets/photos/             runner portraits from the category posters
assets/logos/              official logos
```

The page uses `data/runners.local.json` when that file is present, and otherwise `data/runners.json`. Both can contain reflections. The published roster is `data/runners.json`.

## Using the page

- Filter by All, R16, R8, or R4, and search by runner name. The two work together.
- Each runner card shows the leg, the leg time, and a link to that runner's Strava profile. Athmam's card also has a Captain chip.
- The card shows a short reflection title. Open it to read the full note. Notes pasted from WhatsApp keep their bold headings and paragraph breaks.
- Hendi's leg is 1:47:32 and Arief H's is 1:54:20. CP11 was not recorded, so those two times share the official gap from Luluk's finish to Arief H's finish, split by leg distance.
- Open a reflection to read it full screen. The text scrolls, and Close returns to the cards.
- On a phone, scroll down and an arrow at the bottom right returns to the top.
- Krishna's message sits above the roster. Team Support is its own group, linked from the hero.
- The moon and sun button switches light and dark. The page opens in dark mode. A choice is saved in this browser.
- The browser tab shows a bold 85. Sharing the page link shows the full PlayOn 85 logo.
- Photo collection opens the team album: https://photos.app.goo.gl/wH6TLBaq8RdcZBXQA

## Preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

The published site is `https://primayuda.github.io/halloffameplayon/`.
