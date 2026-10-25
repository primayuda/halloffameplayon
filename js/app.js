const CATEGORIES = new Set(["R16", "R8", "R4"]);
const mobileQuery = window.matchMedia("(max-width: 719px)");

const rosterEl = document.querySelector("#roster");
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
let openId = "";

document.querySelector("#dialog-close").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener("close", () => {
  openId = "";
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    openId = "";
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
  const visible = runners.filter(
    (runner) => activeFilter === "All" || runner.category === activeFilter,
  );
  rosterEl.replaceChildren();

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent =
      runners.length === 0
        ? "Runner records stay on this computer until they are ready to publish."
        : `No ${activeFilter} runners in this view.`;
    rosterEl.append(empty);
    return;
  }

  for (const runner of visible) rosterEl.append(createCard(runner));
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
  body.append(heading);

  const expanded = openId === runner.id && !mobileQuery.matches;
  if (expanded) body.append(expandedDetails(runner));
  else body.append(collapsedDetails(runner));

  card.append(createPhoto(runner), body);
  return card;
}

function collapsedDetails(runner) {
  const fragment = document.createDocumentFragment();
  const preview = document.createElement("p");
  preview.className = "reflection-preview";
  preview.textContent = reflectionPreview(runner.reflection);

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Read full reflection";
  button.addEventListener("click", () => openReflection(runner));

  fragment.append(preview, button);
  return fragment;
}

function expandedDetails(runner) {
  const wrap = document.createElement("div");
  appendMeta(wrap, runner);

  const reflection = document.createElement("p");
  reflection.className = "reflection";
  reflection.textContent = reflectionText(runner.reflection);

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Close";
  button.addEventListener("click", () => {
    openId = "";
    renderRoster();
  });

  wrap.append(reflection, button);
  return wrap;
}

function openReflection(runner) {
  if (mobileQuery.matches) {
    fillDialog(runner);
    if (!dialog.open) dialog.showModal();
    return;
  }
  openId = runner.id;
  renderRoster();
}

function fillDialog(runner) {
  dialogPhoto.replaceChildren(createPhoto(runner));
  dialogName.textContent = runner.name;
  dialogBadge.textContent = runner.category;
  setOptionalText(dialogTime, runner.finishTime ? `Finish time ${runner.finishTime}` : "");
  setOptionalText(dialogLeg, runner.leg || "");
  dialogReflection.textContent = reflectionText(runner.reflection);
}

function appendMeta(parent, runner) {
  if (runner.finishTime) {
    const time = document.createElement("p");
    time.className = "finish-time";
    time.textContent = `Finish time ${runner.finishTime}`;
    parent.append(time);
  }
  if (runner.leg) {
    const leg = document.createElement("p");
    leg.className = "leg";
    leg.textContent = runner.leg;
    parent.append(leg);
  }
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
