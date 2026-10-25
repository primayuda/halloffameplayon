const stored = readTheme();
const theme =
  stored ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
document.documentElement.dataset.theme = theme;

function readTheme() {
  try {
    const value = localStorage.getItem("theme");
    return value === "dark" || value === "light" ? value : "";
  } catch {
    return "";
  }
}
