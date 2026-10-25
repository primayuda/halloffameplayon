# PlayOn 85 Hall of Fame

Post-race Hall of Fame for the PlayOn 85 team at ITB Ultra Marathon 2026 (Jakarta–Bandung).

Plain HTML, CSS, and JavaScript site for GitHub Pages.

## Layout

```
index.html
css/styles.css
js/app.js
data/runners.json          published roster, including reflections
data/runners.local.json    optional local copy, this machine only
assets/photos/             runner portraits from the category posters
assets/logos/              official logos
```

The page uses `data/runners.local.json` when that file is present, and otherwise `data/runners.json`. Both can contain reflections. The published roster is `data/runners.json`.

## Preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

The published site is `https://primayuda.github.io/halloffameplayon/`.
