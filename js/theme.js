const stored = readTheme();
document.documentElement.dataset.theme = stored || "dark";

function readTheme() {
  try {
    const value = localStorage.getItem("theme");
    return value === "dark" || value === "light" ? value : "";
  } catch {
    return "";
  }
}
