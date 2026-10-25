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
  renderSupport();
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

const ketua = {
  name: "Krishna",
  role: "Ketua Ikatan Alumni ITB 85",
  photo: "krishna.jpg",
  message: `Selamat malam, dan selamat istirahat untuk kita semua.

Menjelang fajar menyingsing di pagi Minggu 18 Oktober 2026, team R4, R8 dan R16 runner ITB 85 (Team PlayOn 85) berhasil menyelesaikan Ultra Marathon ITB 2026.

Lebih dari 160 km (hampir mendekati 180 km) telah diretas, dan teman2 PlayOn 85  berlari mewakili angkatan 85 dengan membawa misi Run for Future Generation (melalui program Pelatihan Guru2 PAUD CDfT)

MISSION ACCOMPLISHED.

Terima kasih kepada chief of the mission cak Harkrib dan deputy nya uda Asrul, captain uda Athmam, beserta semua PlayOn dan Team Support yg luar biasa yang tidak dapat disebutkan satu persatu.  Semoga segala kebaikan yg telah diberikan, mendapatkan balasan kebaikan berlipat kali ganda dari Tuhan Yang Maha Kuasa.

Banyak cerita heroik, seru dan lucu yang menambah khasanah kekerabatan dan persaudaraan kita di alumni ITB 85.  Untuk kesekian kalinya alumni ITB 85 menyelesaikan misinya melalui pengorbanan dan kekompakan yang luar biasa.

Puji dan syukur kepada Allah Subhanahu Ta’ala, Tuhan Yang Maha Kuasa, kita diberikan kesehatan dan keselamatan di dalam misi kita ini.

Di booth Build & Share selama dua hari tgl. 17 dan 18 Oktober, yang bekerja sama dengan Avrist Asset  Management dan Tri Megah Sekuritas telah terlaksana promosi dan pengenalan kegiatan CDfT dan produk Reksadana Build & Share 85, yg merupakan bentuk instrumen investasi untuk mendukung kegiatan CDfT kedepan yg dikelola oleh Yayasan Build & Share 85, kepada alumni dan pengunjung bazaar UM 2026.

Sampai jumpa di acara launching Reksadana Build & Share 85 yang InsyaAllah akan diadakan pada tgl. 25 November 2026 mendatang, bertepatan dengan Hari Guru Nasional.

Mari kita dukung bersama-sama cita2 besar kita yang telah kita rintis sejak 16 tahun yg lalu bagi generasi masa depan Indonesia yang lebih baik.

Pada kesempatan ini, keluarga besar Alumni ITB 85, juga menyampaikan bela sungkawa yg mendalam atas berpulangnya ananda Dody Muhammad Pasha, yg juga peserta Ultra Marathon ITB 2026.  Semoga Almarhum mendapatkan tempat yg terbaik disisi Allah Subhanahu Ta’ala.

Salam,
Komisariat ITB 85, 
Koperasi Delapan Lima (KDL) , dan Yayasan Build & Share 85.`,
};

const supportTeam = [
  {
    name: "Yoyon",
    role: "TS Dini Hari",
    route: "WS-5 Vokasi IPB → WS-7 Cisarua",
    photo: "yoyon.jpg",
    message: `*Setia jadi TS*

Pertama kali ikut jadi TS di UM edisi 2018. Kalo gak salah waktu itu aku diajak Ella untuk ikutan jadi TS. Kebetulan tahun itu aku sudah masuk MPP, jadi aman gak terlalu ngaruh ke aktifitas kerjaan.

Aku spesialis TS area Bogor, mulai dari Cibinong (WS-4) sampai Tajur (WS-6). Spesialis TS Dini hari.😄

Tahun ini saja aku rubah trayeknya, mulai dari Vokasi IPB (WS-5) sampai ke Cisarua (WS-7).
Insya Allah tahun depan, trayeknya mulai dari WS-5 sampai WS-8.

Biasanya aku pakai Motor (pertama TS pakai Vespa, seterusnya pakai Benelli), tahun ini aku pakai mobil. Kurang lincah sich kalao TS pakai Mobil, dan terutama akan masalah cari parkiran.

Oh ya Sabtu kemarin aku kejebak one way dari arah Jkt ke Puncak, setelah selesai di WS-7 (aku mau turun ke arah Bogor).
Karena gak bisa arah turun, aku naik terus saja sampai ke masjid At Taawun, lalu muter balik turun, mentok di Gunung Mas, dari jam 10 pagi sampai jam 01 siang.

Yach aku nikmati saja untuk tidur di mobil, sambil monitor proyek di Banjarmasin yg lagi ngecor.

Finally aku sampai rumah Yasmin Bogor jam 3 sore.
Berangkat jam 3 pagi, sampai rumah jam 3 sore.😄

Kapok jadi TS ?
Gak lah...

TS itu kegiatan healingku...

Lagian orang rumah sdh paham jadwalku setahun sekali untuk 'ngalong' bersama PlayOn 85.

Asyiklah jadi TS, bisa bantu² runner...mulai jadi teman ngobrol, check posisi runner sebelumnya, arahin runner yg masuk area WS supaya check point, dan dokumentasi.

Buat runner yang berangkat dan masuk WS-5, WS-6 dan WS-7, sorry kalo supportku kurang optimal.🙏🏼

Tetap semangat..🔥

*Yoyon/TS Dini Hari*`,
  },
];

renderKetua();
renderSupport();

loadRunners().then((loaded) => {
  runners = loaded;
  renderRoster();
});

function renderKetua() {
  const section = document.querySelector("#ketua");
  const card = document.createElement("article");
  card.className = "runner-card ketua-card";

  const body = document.createElement("div");
  const heading = document.createElement("div");
  heading.className = "runner-heading";
  const name = document.createElement("h2");
  name.textContent = ketua.name;
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = "Ketua";
  heading.append(name, badge);

  const role = document.createElement("p");
  role.className = "leg";
  role.textContent = ketua.role;

  const preview = document.createElement("p");
  preview.className = "reflection-preview";
  preview.textContent = reflectionPreview(ketua.message);
  preview.addEventListener("click", openKetua);

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Read full message";
  button.addEventListener("click", openKetua);

  body.append(heading, role, preview, button);
  card.append(createPhoto(ketua), body);
  section.replaceChildren(card);
}

function renderSupport() {
  const section = document.querySelector("#support");
  const roster = document.querySelector("#support-roster");
  const query = nameQuery.trim().toLowerCase();
  const visible = supportTeam.filter(
    (person) => !query || person.name.toLowerCase().includes(query),
  );
  section.hidden = visible.length === 0;
  roster.replaceChildren();
  for (const person of visible) roster.append(createSupportCard(person));
}

function createSupportCard(person) {
  const card = document.createElement("article");
  card.className = "runner-card";

  const body = document.createElement("div");
  const heading = document.createElement("div");
  heading.className = "runner-heading";
  const name = document.createElement("h3");
  name.textContent = person.name;
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = "TS";
  heading.append(name, badge);

  const role = document.createElement("p");
  role.className = "leg";
  role.textContent = person.role;
  const route = document.createElement("p");
  route.className = "finish-time";
  route.textContent = person.route;

  const preview = document.createElement("p");
  preview.className = "reflection-preview";
  preview.textContent = reflectionPreview(person.message);
  preview.addEventListener("click", () => openSupport(person));

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Read full message";
  button.addEventListener("click", () => openSupport(person));

  body.append(heading, role, route, preview, button);
  card.append(createPhoto(person), body);
  return card;
}

function openSupport(person) {
  dialogPhoto.replaceChildren(createPhoto(person));
  dialogName.textContent = person.name;
  dialogBadge.textContent = "TS";
  setOptionalText(dialogTime, person.route || "");
  setOptionalText(dialogLeg, person.role || "");
  dialogReflection.replaceChildren();
  const message = document.createElement("p");
  message.className = "reflection";
  message.textContent = person.message.trim();
  dialogReflection.append(message);
  if (!dialog.open) dialog.showModal();
  document.querySelector(".reflection-scroll").scrollTop = 0;
}

function openKetua() {
  dialogPhoto.replaceChildren(createPhoto(ketua));
  dialogName.textContent = ketua.name;
  dialogBadge.textContent = "Ketua";
  setOptionalText(dialogTime, "");
  setOptionalText(dialogLeg, ketua.role);
  dialogReflection.replaceChildren();
  const message = document.createElement("p");
  message.className = "reflection";
  message.textContent = ketua.message.trim();
  dialogReflection.append(message);
  if (!dialog.open) dialog.showModal();
  document.querySelector(".reflection-scroll").scrollTop = 0;
}

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
  body.append(heading);
  if (runner.leg) {
    const leg = document.createElement("p");
    leg.className = "leg";
    leg.textContent = runner.leg;
    body.append(leg);
  }
  const time = recordedTime(runner.finishTime);
  if (time) {
    const timeLine = document.createElement("p");
    timeLine.className = "finish-time";
    timeLine.textContent = timeLabel(time);
    body.append(timeLine);
  }
  body.append(collapsedDetails(runner));

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

  fragment.append(preview);
  for (const extra of extraReflections(runner)) {
    const more = document.createElement("p");
    more.className = "reflection-preview reflection-extra";
    more.textContent = `${extra.by}: ${reflectionPreview(extra.text)}`;
    more.addEventListener("click", () => openReflection(runner, extra.by));
    fragment.append(more);
  }
  fragment.append(button);
  return fragment;
}

function openReflection(runner, focusBy) {
  fillDialog(runner);
  if (!dialog.open) dialog.showModal();
  const scroll = document.querySelector(".reflection-scroll");
  scroll.scrollTop = 0;
  if (!focusBy) return;
  const heading = [...scroll.querySelectorAll("h3")].find((item) => item.textContent === focusBy);
  if (!heading) return;
  const top = heading.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop;
  scroll.scrollTop = top;
}

function fillDialog(runner) {
  dialogPhoto.replaceChildren(createPhoto(runner));
  dialogName.textContent = runner.name;
  dialogBadge.textContent = runner.category;
  setOptionalText(dialogTime, timeLabel(recordedTime(runner.finishTime)));
  setOptionalText(dialogLeg, runner.leg || "");
  dialogReflection.replaceChildren();

  const main = document.createElement("p");
  main.className = "reflection";
  main.textContent = reflectionText(runner.reflection);
  dialogReflection.append(main);

  for (const extra of extraReflections(runner)) {
    const section = document.createElement("section");
    section.className = "reflection-more";
    const title = document.createElement("h3");
    title.textContent = extra.by;
    section.append(title);
    if (typeof extra.note === "string" && extra.note.trim()) {
      const byline = document.createElement("p");
      byline.className = "byline";
      byline.textContent = extra.note.trim();
      section.append(byline);
    }
    const text = document.createElement("p");
    text.className = "reflection";
    text.textContent = extra.text.trim();
    section.append(text);
    dialogReflection.append(section);
  }
}

function extraReflections(runner) {
  if (!Array.isArray(runner.additionalReflections)) return [];
  return runner.additionalReflections.filter(
    (item) => item && typeof item.by === "string" && typeof item.text === "string" && item.text.trim(),
  );
}

function recordedTime(value) {
  const time = String(value || "").trim();
  return time && time !== "--:--:--" ? time : "";
}

function timeLabel(time) {
  if (!time) return "";
  return time.includes("·") ? `Leg times ${time}` : `Leg time ${time}`;
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
