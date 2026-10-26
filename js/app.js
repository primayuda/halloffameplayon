const CATEGORIES = new Set(["R16", "R8", "R4"]);

const themeButton = document.querySelector("#theme-toggle");
const themeLabel = themeButton.querySelector(".visually-hidden");
const rosterEl = document.querySelector("#roster");
const searchInput = document.querySelector("#runner-search");
const searchLabel = document.querySelector("#search-label");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const dialog = document.querySelector("#reflection-dialog");
const dialogPhoto = document.querySelector("#dialog-photo");
const dialogName = document.querySelector("#dialog-name");
const dialogBadge = document.querySelector("#dialog-badge");
const dialogTime = document.querySelector("#dialog-time");
const dialogLeg = document.querySelector("#dialog-leg");
const dialogStrava = document.querySelector("#dialog-strava");
const dialogReflection = document.querySelector("#dialog-reflection");

let runners = [];
let activeFilter = "All";
let searchScope = "all";
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

const toTop = document.querySelector("#to-top");
const mobileQuery = window.matchMedia("(max-width: 719px)");

function syncToTop() {
  toTop.hidden = !(mobileQuery.matches && window.scrollY > 480);
}

toTop.addEventListener("click", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
});

window.addEventListener("scroll", syncToTop, { passive: true });
mobileQuery.addEventListener("change", syncToTop);
syncToTop();

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    setFilter(button.dataset.filter);
  });
}

function setFilter(filter) {
  activeFilter = filter;
  if (filter === "TS") searchScope = "ts";
  else if (filter === "All") searchScope = "all";
  else searchScope = "runners";
  if (dialog.open) dialog.close();
  syncSearchControls();
  renderRoster();
  renderSupport();
}

function syncSearchControls() {
  const label =
    searchScope === "ts"
      ? "Search team support"
      : searchScope === "runners"
        ? "Search runner name"
        : "Search runner or team support";
  searchInput.placeholder = label;
  searchLabel.textContent = label;
  for (const item of filterButtons) {
    item.setAttribute("aria-pressed", String(item.dataset.filter === activeFilter));
  }
}

function showsRunners() {
  return searchScope !== "ts";
}

function showsSupport() {
  return searchScope !== "runners";
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
    name: "Krishna",
    role: "Ketua Ikatan Alumni ITB 85",
    route: "Start → Finish",
    photo: "krishna.jpg",
    message: ketua.message,
  },
  {
    name: "Asrul Iman",
    role: "Team Support",
    route: "Start → Finish",
    photo: "asrul.jpg",
    message: "",
  },
  {
    name: "Mira Amrita",
    role: "Team Support",
    route: "Leg 16 → Finish · Car",
    photo: "",
    message: "",
  },
  {
    name: "Prima",
    role: "Team Support",
    route: "Legs 5–7 · Basecamp Bogor",
    photo: "",
    message: "",
  },
  {
    name: "Asep M",
    role: "Team Support",
    route: "Legs 6–9 · Motorcycle",
    photo: "",
    message: "",
  },
  {
    name: "Yos",
    role: "Team Support",
    route: "Legs 13–16 → Finish · Motorcycle",
    photo: "",
    message: "",
  },
  {
    name: "Mpie",
    role: "Team Support",
    route: "Legs 9–10 · Car",
    photo: "",
    message: "",
  },
  {
    name: "Affan Hidayat",
    role: "Team Support",
    route: "Start → Leg 1 · Motorcycle",
    photo: "",
    message: `Alhamdulillah selamat untuk para PLAYON85 runners, yg kereen. Semoga selalu dalam keadaan sehat walafiat. Juga kawan2 TS yg saling jaga dan dukung kawan2... Insya Allah ketemu lagi di next season...🤲`,
  },
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
  {
    name: "Novarini",
    role: "Team Support",
    route: "Start → Leg 2 · Car",
    photo: "",
    message: "",
  },
  {
    name: "Dudus R Kudus",
    role: "Team Support",
    route: "Legs 7–8 · Motorcycle",
    photo: "",
    message: "",
  },
  {
    name: "Hariyono Kribo",
    role: "chief of the mission",
    route: "Start → Finish · Car",
    photo: "hariyono.jpg",
    message: `Kalau 85 kan Listen to your Heart ya, Paketu😀
(Sambil lari sambil dengerin Roxette)`,
  },
  {
    name: "Syah Inderaprana",
    role: "Team Support",
    route: "Pickup and accompany · Motorcycle",
    photo: "",
    message: "",
  },
  {
    name: "Sakir",
    role: "Team Support",
    route: "Legs 10–16 → Finish · Car",
    photo: "",
    message: "",
  },
  {
    name: "Wicak",
    role: "Team Support",
    route: "Start → Finish · Motorcycle",
    photo: "",
    message: "",
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
  const hariyono = supportTeam.find((person) => person.name === "Hariyono Kribo");
  section.replaceChildren(createKetuaCard(), createMissionCard(hariyono));
}

function createKetuaCard() {
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
  return card;
}

function createMissionCard(person) {
  const card = document.createElement("article");
  card.className = "runner-card ketua-card";

  const body = document.createElement("div");
  const heading = document.createElement("div");
  heading.className = "runner-heading";
  const name = document.createElement("h2");
  name.textContent = person.name;
  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = person.role;
  heading.append(name, badge);

  const route = document.createElement("p");
  route.className = "leg";
  route.textContent = person.route;

  const preview = document.createElement("p");
  preview.className = "reflection-preview";
  preview.textContent = reflectionPreview(person.message);
  preview.addEventListener("click", () => openSupport(person));

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Read full message";
  button.addEventListener("click", () => openSupport(person));

  body.append(heading, route, preview, button);
  card.append(createPhoto(person), body);
  return card;
}

function renderSupport() {
  const section = document.querySelector("#support");
  const roster = document.querySelector("#support-roster");
  if (!showsSupport()) {
    section.hidden = true;
    roster.replaceChildren();
    return;
  }
  const query = searchScope === "runners" ? "" : nameQuery.trim().toLowerCase();
  const visible = supportTeam.filter(
    (person) => !query || person.name.toLowerCase().includes(query),
  );
  roster.replaceChildren();
  if (visible.length === 0) {
    if (showsRunners()) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = `No team support matches “${nameQuery.trim()}”.`;
    roster.append(empty);
    return;
  }
  section.hidden = false;
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
  body.append(heading, role);
  if (person.route) {
    const route = document.createElement("p");
    route.className = "finish-time";
    route.textContent = person.route;
    body.append(route);
  }

  const preview = document.createElement("p");
  preview.className = "reflection-preview";
  preview.textContent = reflectionPreview(person.message);
  preview.addEventListener("click", () => openSupport(person));

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Read full message";
  button.addEventListener("click", () => openSupport(person));

  body.append(preview, button);
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
  renderReflection(dialogReflection, person.message);
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
  renderReflection(dialogReflection, ketua.message);
  if (!dialog.open) dialog.showModal();
  document.querySelector(".reflection-scroll").scrollTop = 0;
}

function syncThemeButton() {
  const dark = document.documentElement.dataset.theme !== "light";
  themeButton.setAttribute("aria-pressed", String(dark));
  themeLabel.textContent = dark ? "Switch to light mode" : "Switch to dark mode";
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

function runnerMatches(query) {
  return runners.filter((runner) => {
    const categoryMatches = activeFilter === "All" || runner.category === activeFilter;
    const nameMatches = !query || runner.name.toLowerCase().includes(query);
    return categoryMatches && nameMatches;
  });
}

function renderRoster() {
  if (!showsRunners()) {
    rosterEl.hidden = true;
    rosterEl.replaceChildren();
    return;
  }
  const query = searchScope === "ts" ? "" : nameQuery.trim().toLowerCase();
  const visible = runnerMatches(query);
  rosterEl.replaceChildren();

  if (visible.length === 0) {
    const supportQuery = searchScope === "runners" ? null : nameQuery.trim().toLowerCase();
    const supportHit =
      supportQuery !== null &&
      showsSupport() &&
      supportTeam.some((person) => person.name.toLowerCase().includes(supportQuery));
    if (supportHit) {
      rosterEl.hidden = true;
      return;
    }
    rosterEl.hidden = false;
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = emptyMessage(query);
    rosterEl.append(empty);
    return;
  }

  rosterEl.hidden = false;
  for (const runner of visible) rosterEl.append(createCard(runner));
}

function emptyMessage(query) {
  if (runners.length === 0) {
    return "Runner records stay on this computer until they are ready to publish.";
  }
  const typed = nameQuery.trim();
  if (query && searchScope === "all" && activeFilter === "All") {
    return `No runners or team support match “${typed}”.`;
  }
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
  appendRoleChips(badge, runner);
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
  const strava = stravaLink(runner.strava);
  if (strava) body.append(strava);
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
  appendRoleChips(dialogBadge, runner);
  setOptionalText(dialogTime, timeLabel(recordedTime(runner.finishTime)));
  setOptionalText(dialogLeg, runner.leg || "");
  setStravaLink(dialogStrava, runner.strava);
  dialogReflection.replaceChildren();
  renderReflection(dialogReflection, runner.reflection);

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
    renderReflection(section, extra.text);
    dialogReflection.append(section);
  }
}

function extraReflections(runner) {
  if (!Array.isArray(runner.additionalReflections)) return [];
  return runner.additionalReflections.filter(
    (item) => item && typeof item.by === "string" && typeof item.text === "string" && item.text.trim(),
  );
}

function appendRoleChips(after, runner) {
  const parent = after.parentElement;
  parent.querySelectorAll(".badge-role").forEach((chip) => chip.remove());
  const labels = Array.isArray(runner.chips) ? runner.chips : [];
  let anchor = after;
  for (const label of labels) {
    if (typeof label !== "string" || !label.trim()) continue;
    const chip = document.createElement("span");
    chip.className = "badge badge-role";
    chip.textContent = label.trim();
    anchor.after(chip);
    anchor = chip;
  }
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

function stravaHref(value) {
  if (typeof value !== "string" || !value.trim()) return "";
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:") return "";
    if (url.hostname !== "www.strava.com" && url.hostname !== "strava.com") return "";
    return url.href;
  } catch {
    return "";
  }
}

function stravaLink(value) {
  const href = stravaHref(value);
  if (!href) return null;
  const link = document.createElement("a");
  link.className = "strava-link";
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = "Strava";
  return link;
}

function setStravaLink(element, value) {
  const href = stravaHref(value);
  element.hidden = !href;
  if (!href) {
    element.removeAttribute("href");
    return;
  }
  element.href = href;
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
  const raw = normalizeWa(text);
  if (!raw) return "Reflection coming soon.";
  const title = explicitTitle(raw) || interestingSentence(stripInlineMarkers(raw));
  return title || "Reflection coming soon.";
}

function explicitTitle(raw) {
  const plain = stripInlineMarkers(raw);
  if (/^Catatan UM - ITB 2026 PlayOn 85\b/.test(plain)) return "Catatan UM - ITB 2026 PlayOn 85";
  if (plain.includes("ajang silaturahmi diantara sesama Alumni ITB")) {
    return "ajang silaturahmi diantara sesama Alumni ITB";
  }
  if (plain.includes("sepuh tapi tidak rapuh")) return "sepuh tapi tidak rapuh";
  const lines = raw.split("\n").map((line) => line.trim());
  const nonempty = lines.filter(Boolean);
  const limit = Math.max(8, Math.floor(nonempty.length / 3));
  for (let index = 0; index < nonempty.length && index <= limit; index += 1) {
    const match = nonempty[index].match(/^\*([^*\n]+)\*$/);
    if (match && !isGreeting(match[1]) && match[1].trim().length >= 8 && match[1].trim().length <= 90) {
      return match[1].trim();
    }
  }
  for (let index = 0; index < lines.length - 1; index += 1) {
    if (!/^[=\-]{3,}$/.test(lines[index + 1])) continue;
    const heading = stripInlineMarkers(lines[index]);
    if (heading && !isGreeting(heading)) return heading;
  }
  const blocks = raw.split(/\n{2,}/).filter((block) => block.trim());
  const opening = blocks[0]
    ? blocks[0]
        .split("\n")
        .map((line) => stripInlineMarkers(line.trim()))
        .filter((line) => line && !isGreeting(line))
    : [];
  if (opening.length === 1 && blocks.length > 1) {
    const head = opening[0];
    if (head.length <= 90 && (head.includes(":") || !/[.]$/.test(head))) return head;
  }
  if (opening[0] && opening[0].length <= 40 && /^(R\d+\b|UM ITB|UMITB)\b/i.test(opening[0]) && !opening[0].includes(":")) {
    return opening[0];
  }
  return "";
}

function interestingSentence(plain) {
  const pool = [];
  for (const block of plain.split(/\n{2,}/)) {
    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !/^[=\-]{3,}$/.test(line));
    if (lines.length === 1 && !isGreeting(lines[0]) && lines[0].length <= 80) pool.push([lines[0], true]);
    for (const line of lines) {
      if (isGreeting(line)) continue;
      for (const sentence of waSentences(line)) {
        if (!isGreeting(sentence)) pool.push([sentence, false]);
      }
    }
  }
  if (!pool.length) return "";
  let bestIndex = 0;
  for (let index = 1; index < pool.length; index += 1) {
    const bestScore = sentenceScore(pool[bestIndex][0], pool[bestIndex][1]);
    const nextScore = sentenceScore(pool[index][0], pool[index][1]);
    if (nextScore > bestScore) bestIndex = index;
  }
  let [best] = pool[bestIndex];
  if (sentenceScore(best, pool[bestIndex][1]) < 5) {
    const opener = /^(alhamdulillah|ucapan|terima kasih|mohon maaf|terkhusus|khusus untuk)\b/i;
    const fallback = pool.find(([sentence]) => {
      const compact = sentence.replace(/\s+/g, " ").trim();
      return compact.length >= 40 && !isGreeting(compact) && !opener.test(compact);
    });
    if (fallback) [best] = fallback;
  }
  const sentence = /^[a-zà-ÿ]/.test(best) ? best[0].toUpperCase() + best.slice(1) : best;
  return sentence.replace(/\s+/g, " ").trim();
}

function sentenceScore(sentence, standalone) {
  const compact = sentence.replace(/\s+/g, " ").trim();
  if (isGreeting(compact) || compact.length < 18) return -100;
  if (/^[-•💪]/.test(compact)) return -40;
  let points = 0;
  const quoted = compact.match(/[“"]([^“”"]+)[”"]/);
  if (quoted) points += quoted[1].trim().length >= 12 ? 10 : 4;
  if (compact.includes("=") && compact.length <= 80) points += 8;
  if (standalone && compact.length <= 48) points += 6;
  if (compact.length >= 32 && compact.length <= 120) points += 2;
  if (compact.length > 160) points -= 5;
  if (/^(terima kasih|mohon maaf|alhamdulillah|ucapan|semoga |selamat )/i.test(compact)) points -= 4;
  if (/^(mungkin |siapa |apa )/i.test(compact)) points -= 3;
  return points;
}

function isGreeting(line) {
  const compact = line.replace(/\s+/g, " ").trim();
  if (compact.length < 12) return true;
  if (/^[=\-.*]{3,}$/.test(compact)) return true;
  return (
    compact.length < 90 &&
    /^(assalam|assalamu|waalaikum|wassalam|semoga sehat|alhamdulillah[.!\s]*$|aamiin|punten\b|sahabat\d*\b|terimakasih atas|haturnuhun|selamat malam)/i.test(
      compact,
    )
  );
}

function renderReflection(container, source) {
  const blocks = reflectionBlocks(source);
  if (!blocks.length) {
    const empty = document.createElement("p");
    empty.className = "reflection";
    empty.textContent = "Reflection coming soon.";
    container.append(empty);
    return;
  }
  for (const lines of blocks) {
    const paragraph = document.createElement("p");
    paragraph.className = "reflection";
    lines.forEach((line, index) => {
      if (index) paragraph.append(document.createElement("br"));
      appendWaInline(paragraph, line);
    });
    container.append(paragraph);
  }
}

function reflectionBlocks(source) {
  const text = normalizeWa(source);
  if (!text) return [];
  return text.split(/\n{2,}/).flatMap((part) => {
    const lines = part
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !/^[=\-]{3,}$/.test(line));
    if (!lines.length) return [];
    if (lines.length === 1 && lines[0].length > 360) {
      const pieces = waSentences(lines[0]);
      const groups = [];
      for (let i = 0; i < pieces.length; i += 2) groups.push([joinSentences(pieces.slice(i, i + 2))]);
      return groups.length ? groups : [lines];
    }
    return [lines];
  });
}

function normalizeWa(value) {
  return String(value || "")
    .replace(/\u2068|\u2069/g, "")
    .replace(/[\u200e\u200f\ufeff]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function stripInlineMarkers(value) {
  return value.replace(/```([^`]+)```|\*([^*\n]+)\*|_([^_\n]+)_|~([^~\n]+)~/g, (full, code, bold, italic, strike) => {
    const inner = code ?? bold ?? italic ?? strike;
    if (!code && /^\s|\s$/.test(inner)) return full;
    return inner;
  });
}

function waSentences(text) {
  const masked = text.replace(/"[^"\n]{1,80}"|“[^”\n]{1,80}”/g, (quote) => quote.replaceAll(".", "\0"));
  return masked
    .split(/(?<=[.!?])\s+|\.{2,}\s*/)
    .map((part) => part.replaceAll("\0", ".").trim())
    .filter(Boolean);
}

function joinSentences(parts) {
  let text = "";
  for (const part of parts) {
    if (!text) {
      text = part;
      continue;
    }
    text += `${/[.!?…:]$/.test(text) ? " " : ". "}${part}`;
  }
  return text;
}

function appendWaInline(parent, line) {
  const pattern = /```([^`]+)```|\*([^*\n]+)\*|_([^_\n]+)_|~([^~\n]+)~/g;
  let last = 0;
  for (const match of line.matchAll(pattern)) {
    const [full, code, bold, italic, strike] = match;
    const inner = code ?? bold ?? italic ?? strike;
    const valid = code || !/^\s|\s$/.test(inner);
    const start = match.index ?? 0;
    if (start > last) parent.append(document.createTextNode(line.slice(last, start)));
    if (!valid) {
      parent.append(document.createTextNode(full));
    } else if (code) {
      const el = document.createElement("code");
      el.textContent = code;
      parent.append(el);
    } else if (bold) {
      const el = document.createElement("strong");
      el.textContent = bold;
      parent.append(el);
    } else if (italic) {
      const el = document.createElement("em");
      el.textContent = italic;
      parent.append(el);
    } else {
      const el = document.createElement("s");
      el.textContent = strike;
      parent.append(el);
    }
    last = start + full.length;
  }
  if (last < line.length) parent.append(document.createTextNode(line.slice(last)));
}
