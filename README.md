# PlayOn 85 Hall of Fame

Post-race Hall of Fame for the PlayOn 85 team at ITB Ultra Marathon 2026 (Jakarta–Bandung).

Plain HTML, CSS, and JavaScript site for GitHub Pages.

## Layout

```
index.html
css/styles.css
js/app.js
data/runners.json          published roster, without full reflections
data/runners.local.json    full roster, this machine only
assets/photos/             runner portraits from the category posters
assets/logos/              official logos
```

The page asks for `data/runners.local.json` first. On this computer that file is used, including reflections. The published roster has names, categories, and photos.

## Preview

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`.

The published site is `https://primayuda.github.io/halloffameplayon/`.
