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
css/styles.css
js/app.js                  roster, search, theme, Ketua, and Team Support
js/theme.js                applies the saved or system theme before paint
data/runners.json          published roster, including reflections
data/runners.local.json    optional local copy, this machine only
assets/photos/             runner portraits from the category posters
assets/logos/              official logos
```

The page uses `data/runners.local.json` when that file is present, and otherwise `data/runners.json`. Both can contain reflections. The published roster is `data/runners.json`.

## Using the page

- Filter by All, R16, R8, or R4, and search by runner name. The two work together.
- Each runner card shows the leg and the official leg time.
- Open a reflection to read it full screen. The text scrolls, and Close returns to the cards.
- Krishna's message sits above the roster. Team Support is its own group, linked from the hero.
- The moon and sun button switches light and dark. The choice is saved in this browser. A first visit follows the device setting.
- Photo collection opens the team album: https://photos.app.goo.gl/wH6TLBaq8RdcZBXQA

## Preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

The published site is `https://primayuda.github.io/halloffameplayon/`.
