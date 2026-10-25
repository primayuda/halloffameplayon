const CATEGORIES = new Set(["R16", "R8", "R4"]);

const themeButton = document.querySelector("#theme-toggle");
const themeLabel = themeButton.querySelector(".visually-hidden");
const rosterEl = document.querySelector("#roster");
const searchInput = document.querySelector("#runner-search");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const dialog = document.querySelector("#reflection-dialog");
const dialogPhoto = document.querySelector("#dialog-photo");
const dialogName = document.querySelector("#dialog-name");
const dialogBadge = document.querySelector("#dialog-badge");
const dialogTime = document.querySelector("#dialog-time");
const dialogLeg = document.querySelector("#dialog-leg");
const dialogReflection = document.querySelector("#dialog-reflection");

let runners = [];
let activeFilter = "All";
let nameQuery = "";

syncThemeButton();
themeButton.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* Preference stays for this visit when storage is unavailable. */
  }
  syncThemeButton();
});

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
  if (readStoredTheme()) return;
  document.documentElement.dataset.theme = event.matches ? "dark" : "light";
  syncThemeButton();
});

searchInput.addEventListener("input", () => {
  nameQuery = searchInput.value;
  if (dialog.open) dialog.close();
  renderRoster();
});

document.querySelector("#dialog-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    if (dialog.open) dialog.close();
    for (const item of filterButtons) {
      item.setAttribute("aria-pressed", String(item === button));
    }
    renderRoster();
  });
}

loadRunners().then((loaded) => {
  runners = loaded;
  renderRoster();
});

function syncThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeLabel.textContent = dark ? "Switch to light mode" : "Switch to dark mode";
}

function readStoredTheme() {
  try {
    const value = localStorage.getItem("theme");
    return value === "dark" || value === "light" ? value : "";
  } catch {
    return "";
  }
}

async function loadRunners() {
  const urls = ["data/runners.local.json", "data/runners.json"];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      if (!Array.isArray(data)) continue;
      return data.filter(isRunner);
    } catch {
      continue;
    }
  }
  return [];
}

function isRunner(value) {
  return (
    value &&
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    CATEGORIES.has(value.category)
  );
}

function renderRoster() {
  const query = nameQuery.trim().toLowerCase();
  const visible = runners.filter((runner) => {
    const categoryMatches = activeFilter === "All" || runner.category === activeFilter;
    const nameMatches = runner.name.toLowerCase().includes(query);
    return categoryMatches && nameMatches;
  });
  rosterEl.replaceChildren();

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = emptyMessage(query);
    rosterEl.append(empty);
    return;
  }

  for (const runner of visible) rosterEl.append(createCard(runner));
}

function emptyMessage(query) {
  if (runners.length === 0) {
    return "Runner records stay on this computer until they are ready to publish.";
  }
  const typed = nameQuery.trim();
  if (query && activeFilter !== "All") return `No ${activeFilter} runners match “${typed}”.`;
  if (query) return `No runners match “${typed}”.`;
  return `No ${activeFilter} runners in this view.`;
}

function createCard(runner) {
  const card = document.createElement("article");
  card.className = "runner-card";

  const body = document.createElement("div");
  const heading = document.createElement("div");
  heading.className = "runner-heading";

  const name = document.createElement("h2");
  name.textContent = runner.name;

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = runner.category;

  heading.append(name, badge);
  body.append(heading, collapsedDetails(runner));

  card.append(createPhoto(runner), body);
  return card;
}

function collapsedDetails(runner) {
  const fragment = document.createDocumentFragment();
  const preview = document.createElement("p");
  preview.className = "reflection-preview";
  preview.textContent = reflectionPreview(runner.reflection);
  preview.addEventListener("click", () => openReflection(runner));

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Read full reflection";
  button.addEventListener("click", () => openReflection(runner));

  fragment.append(preview, button);
  return fragment;
}

function openReflection(runner) {
  fillDialog(runner);
  if (!dialog.open) dialog.showModal();
  document.querySelector(".reflection-scroll").scrollTop = 0;
}

function fillDialog(runner) {
  dialogPhoto.replaceChildren(createPhoto(runner));
  dialogName.textContent = runner.name;
  dialogBadge.textContent = runner.category;
  setOptionalText(dialogTime, runner.finishTime ? `Finish time ${runner.finishTime}` : "");
  setOptionalText(dialogLeg, runner.leg || "");
  dialogReflection.textContent = reflectionText(runner.reflection);
}

function setOptionalText(element, text) {
  element.hidden = text.length === 0;
  element.textContent = text;
}

function createPhoto(runner) {
  const src = photoSrc(runner.photo);
  if (!src) return initials(runner.name);

  const image = document.createElement("img");
  image.className = "runner-photo";
  image.src = src;
  image.alt = runner.name;
  image.width = 96;
  image.height = 96;
  image.addEventListener("error", () => {
    image.replaceWith(initials(runner.name));
  });
  return image;
}

function initials(name) {
  const mark = document.createElement("div");
  mark.className = "runner-initials";
  mark.setAttribute("aria-hidden", "true");
  mark.textContent = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
  return mark;
}

function photoSrc(photo) {
  if (typeof photo !== "string") return "";
  if (/^https:\/\//i.test(photo)) return photo;
  const name = photo.split("/").pop() || "";
  if (!/^[a-zA-Z0-9._-]+$/.test(name)) return "";
  return `assets/photos/${name}`;
}

function reflectionPreview(text) {
  const line = String(text || "")
    .split("\n")
    .map((part) => part.trim())
    .find(Boolean);
  if (!line) return "Reflection coming soon.";
  return line.length > 140 ? `${line.slice(0, 137)}…` : line;
}

function reflectionText(text) {
  const value = String(text || "").trim();
  return value || "Reflection coming soon.";
}
