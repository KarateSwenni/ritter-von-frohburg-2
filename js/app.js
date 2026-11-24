/* ============================================================
   Die Ritter von Frohburg 2 – Der Zauberkaffee
   Spiellogik: Intro, Karte, 9 Kapitel, Inventar, Finale
   ============================================================ */

const STORAGE_KEY = "drvf2-zauberkaffee-v5";
const PARAMS = new URLSearchParams(window.location.search);

/* Runen für das Bestiarium-Cover */
const RUNE_PATHS = {
  a: "M0-14 L-8 14 L8 14 M-4 0 H4",
  b: "M-6-14 V14 M-6-14 H5 C8-14 8-4 5-4 M-6-4 H5 C8-4 8 14 5 14",
  c: "M8-10 C0-16 -9-8 -9 0 C-9 8 0 16 8 10",
  d: "M-6-14 V14 M-6-14 H4 C9-14 9 14 4 14 H-6",
  e: "M-8-14 H8 M-8 0 H4 M-8 14 H8",
  f: "M0 14 V-14 M0-5 L9-12 M0 2 L9-5",
  g: "M8-10 C0-16 -9-8 -9 0 C-9 8 0 16 8 10 V0 H2",
  h: "M-8-14 V14 M8-14 V14 M-8 0 H8",
  i: "M0 14 V-14",
  j: "M8-14 V8 C8 14 -8 14 -8 8",
  k: "M-6-14 V14 M6-14 L-6 0 L6 14",
  l: "M-6 14 V-14 M-6 14 H6",
  m: "M-8 14 V-14 L0 0 L8-14 V14",
  n: "M-8 14 V-14 L8 14 V-14",
  o: "M0-14 L10 0 L0 14 L-10 0 Z M-10 0 L-15 8 M10 0 L15 8",
  p: "M-6-14 V14 M-6-14 H5 C8-14 8-4 5-4 H-6",
  q: "M0-14 L10 0 L0 14 L-10 0 Z M0 0 L6 14",
  r: "M0 14 V-14 L9-8 L0-2 L9 14",
  s: "M8-12 C0-16 -9-10 -9-4 C-9 2 9 4 9 10 C9 16 0 18 -8 14",
  t: "M-9-14 H9 M0-14 V14",
  u: "M-8-14 V8 C-8 14 8 14 8 8 V-14",
  v: "M-8-14 L0 14 L8-14",
  w: "M-8-14 L-4 14 L0-4 L4 14 L8-14",
  x: "M-8-14 L8 14 M8-14 L-8 14",
  y: "M-8-14 L0 0 V14 M8-14 L0 0",
  z: "M-8-14 H8 L-8 14 H8"
};

function runeSvg(glyph) {
  const path = RUNE_PATHS[glyph] || "";
  return `<svg class="rune-glyph" viewBox="-18 -18 36 36" aria-hidden="true"><path d="${path}"></path></svg>`;
}

/* Gezeichnetes Buchcover für das Puzzle */
function bestiaryCoverUrl() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#24695a"/>
        <stop offset="0.48" stop-color="#123a35"/>
        <stop offset="1" stop-color="#071c1a"/>
      </linearGradient>
      <radialGradient id="aura" cx="0.5" cy="0.44" r="0.55">
        <stop offset="0" stop-color="#89e8c4" stop-opacity="0.42"/>
        <stop offset="0.6" stop-color="#3aa889" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#3aa889" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fbeaa8"/>
        <stop offset="0.5" stop-color="#d9b23f"/>
        <stop offset="1" stop-color="#9a731f"/>
      </linearGradient>
    </defs>
    <rect width="480" height="360" fill="url(#bg)"/>
    <circle cx="240" cy="152" r="138" fill="url(#aura)"/>
    <g fill="none" stroke="#8fe0c2" stroke-width="1" opacity="0.2">
      <circle cx="240" cy="152" r="98"/>
      <circle cx="240" cy="152" r="108" stroke-dasharray="3 8"/>
      <path d="M240 34v14M240 256v14M122 152h14M344 152h14"/>
    </g>
    <rect x="8" y="8" width="464" height="344" fill="none" stroke="url(#gold)" stroke-width="2.6"/>
    <rect x="16" y="16" width="448" height="328" fill="none" stroke="#d9b23f" stroke-width="1" opacity="0.5"/>
    <g fill="none" stroke="url(#gold)" stroke-width="2.2" stroke-linecap="round">
      <path d="M26 54V26h28M454 26h-28M26 306v28h28M454 334h-28v-28"/>
    </g>
    <text x="240" y="52" text-anchor="middle" font-family="Georgia, serif" font-size="24" letter-spacing="7" fill="url(#gold)">BESTIARIUM</text>
    <text x="240" y="70" text-anchor="middle" font-family="Georgia, serif" font-size="9" letter-spacing="4" fill="#cfe8d8" opacity="0.72">VON FROHBURG</text>
    <path d="M162 82h156" stroke="url(#gold)" stroke-width="1" opacity="0.55"/>
    <g fill="none" stroke="url(#gold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
      <path d="M206 142 C182 124 156 126 144 142 C160 140 174 148 186 162 C176 156 166 158 158 166 C176 166 192 174 202 188"/>
      <path d="M274 142 C298 124 324 126 336 142 C320 140 306 148 294 162 C304 156 314 158 322 166 C304 166 288 174 278 188"/>
      <path d="M214 112 C202 96 190 90 180 94 C190 100 196 108 200 122"/>
      <path d="M266 112 C278 96 290 90 300 94 C290 100 284 108 280 122"/>
      <path d="M240 98 C222 98 210 110 208 130 C206 146 210 162 220 176 C226 184 233 190 240 192 C247 190 254 184 260 176 C270 162 274 146 272 130 C270 110 258 98 240 98 Z"/>
      <path d="M220 144 Q230 138 238 144 M260 144 Q250 138 242 144" opacity="0.8"/>
      <path d="M228 178 Q240 186 252 178" opacity="0.8"/>
    </g>
    <g fill="#f0d36b">
      <path d="M222 142l7 4-7 4z"/>
      <path d="M258 142l-7 4 7 4z"/>
      <circle cx="240" cy="166" r="2.4"/>
    </g>
    <g fill="url(#gold)">
      <path d="M86 112l2.2 6.5 6.5 2.2-6.5 2.2-2.2 6.5-2.2-6.5-6.5-2.2 6.5-2.2z"/>
      <path d="M394 112l2.2 6.5 6.5 2.2-6.5 2.2-2.2 6.5-2.2-6.5-6.5-2.2 6.5-2.2z"/>
      <circle cx="126" cy="204" r="2.2"/>
      <circle cx="354" cy="204" r="2.2"/>
    </g>
    <g fill="url(#gold)" opacity="0.85">
      <ellipse cx="82" cy="258" rx="8" ry="11" transform="rotate(-28 82 258)"/>
      <ellipse cx="104" cy="242" rx="6" ry="8" transform="rotate(24 104 242)"/>
      <ellipse cx="398" cy="258" rx="8" ry="11" transform="rotate(28 398 258)"/>
      <ellipse cx="376" cy="242" rx="6" ry="8" transform="rotate(-24 376 242)"/>
    </g>
    <g fill="none" stroke="#0d2a27" stroke-width="1.3" opacity="0.65">
      <path d="M78 250c4 5 4 11 0 16"/>
      <path d="M101 237c3 4 3 8 0 11"/>
      <path d="M402 250c-4 5-4 11 0 16"/>
      <path d="M379 237c-3 4-3 8 0 11"/>
    </g>
    <rect x="48" y="282" width="384" height="54" rx="7" fill="#061b18" opacity="0.92" stroke="url(#gold)" stroke-width="1.2"/>
    <g fill="#d9b23f" opacity="0.5">
      <path d="M66 309l4 6-4 6-4-6z"/>
      <path d="M414 309l4 6-4 6-4-6z"/>
    </g>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function shuffledOrder(total) {
  const order = shuffleCopy([...Array(total).keys()]);
  if (order.every((slice, pos) => slice === pos)) {
    [order[0], order[1]] = [order[1], order[0]];
  }
  return order;
}

let state = loadState();
let introIndex = 0;
let toastTimer = null;
let hintShown = false;
let currentHint = null;
let lastFocus = null;
let traveling = false;

/* Aktive Mini-Spiele */
let activeTiming = null;
let activeMelody = null;
let activeMaze = null;
let activeNonogram = null;
let activeCrossword = null;
let activeBattle = null;
let audioCtx = null;
let brewSet = new Set();
let finalBrewTimer = null;

function $(selector) {
  return document.querySelector(selector);
}

function defaultState() {
  return {
    version: 2,
    introSeen: false,
    solved: [],
    inventory: [],
    digits: Array(GAME.final.digits.length).fill(null),
    currentLocation: "postmeilensaeule",
    brewed: false,
    startedAt: null
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const digits = Array.isArray(parsed.digits)
      ? parsed.digits.slice(0, GAME.final.digits.length)
      : [];
    while (digits.length < GAME.final.digits.length) digits.push(null);

    return {
      ...defaultState(),
      ...parsed,
      solved: Array.isArray(parsed.solved) ? parsed.solved : [],
      inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
      digits
    };
  } catch (error) {
    console.warn("Spielstand konnte nicht geladen werden:", error);
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Spielstand konnte nicht gespeichert werden:", error);
  }
}

function getLocation(id) {
  return GAME.locations.find((loc) => loc.id === id) || null;
}

function locationUnlocked(loc, gameState) {
  return (loc.requires || []).every((id) => gameState.solved.includes(id));
}

function getNextLocation() {
  return (
    GAME.locations.find(
      (loc) =>
        !loc.isFinal &&
        locationUnlocked(loc, state) &&
        !state.solved.includes(loc.id)
    ) || null
  );
}

function allPuzzlesSolved() {
  return GAME.final.required.every((id) => state.solved.includes(id));
}

function itemIcon(name) {
  return `<svg viewBox="-16 -16 32 32" aria-hidden="true" style="fill:none;stroke:currentColor;stroke-width:2.3;stroke-linecap:round;stroke-linejoin:round"><use href="#icon-${esc(name)}" x="-16" y="-16" width="32" height="32"></use></svg>`;
}

function shuffleCopy(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/* ------------------------------------------------------------
   Audio (kleine Töne, keine Dateien)
   ------------------------------------------------------------ */
function tone(freq, duration = 0.28, delay = 0, type = "sine") {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const start = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.05);
  } catch (error) {
    /* Audio ist ein Bonus, kein Muss. */
  }
}

/* ------------------------------------------------------------
   Start
   ------------------------------------------------------------ */
document.addEventListener("DOMContentLoaded", init);

function init() {
  buildMap($("#map"));
  bindEvents();

  const debugActive = applyDebugParams();

  if (state.introSeen || debugActive) {
    showGame();
  } else {
    showIntro();
  }

  renderDebugLinks();
}

function solveAllDebug() {
  state.solved = GAME.locations.filter((loc) => !loc.isFinal).map((loc) => loc.id);
  state.inventory = Object.keys(GAME.items);
  state.digits = GAME.final.digits.slice();
  state.currentLocation = "drachennest";
  saveState();
}

function applyDebugParams() {
  const keys = ["skipIntro", "chapter", "preview", "final", "all", "debug", "fresh", "questbook"];
  const hasAny = keys.some((key) => PARAMS.has(key));
  if (!hasAny) return false;

  if (PARAMS.has("fresh")) {
    state = defaultState();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      /* egal */
    }

    const otherParam = keys.some(
      (key) => key !== "fresh" && key !== "debug" && PARAMS.has(key)
    );
    if (!otherParam) return false;
  }

  state.introSeen = true;

  if (PARAMS.has("all") || PARAMS.has("final")) {
    solveAllDebug();
  }

  if (PARAMS.has("chapter")) {
    const number = Number(PARAMS.get("chapter"));
    const loc = GAME.locations.find((entry) => entry.chapter === number);
    if (loc) {
      setTimeout(() => {
        if (loc.isFinal) openFinal(true);
        else openChapter(loc);
      }, 450);
    }
  }

  if (PARAMS.has("preview")) {
    const number = Number(PARAMS.get("preview"));
    const loc = GAME.locations.find((entry) => entry.chapter === number);
    if (loc) {
      setTimeout(() => openPreview(loc, !locationUnlocked(loc, state)), 450);
    }
  }

  if (PARAMS.has("final")) {
    const mode = PARAMS.get("final");
    setTimeout(() => {
      openFinal(true);
      if (mode === "done") completeBrew(true);
    }, 600);
  }

  if (PARAMS.has("questbook")) {
    setTimeout(openQuestbook, 600);
  }

  return true;
}

function renderDebugLinks() {
  const target = $("#debug-links");
  if (!target) return;

  if (PARAMS.has("debug")) {
    target.innerHTML = `
      <a href="?chapter=1">Kapitel 1</a>
      <a href="?chapter=2">Kapitel 2</a>
      <a href="?chapter=4">Kapitel 4</a>
      <a href="?chapter=5">Kapitel 5</a>
      <a href="?chapter=7">Kapitel 7</a>
      <a href="?chapter=8">Kapitel 8</a>
      <a href="?chapter=9">Kapitel 9</a>
      <a href="?chapter=10">Kapitel 10</a>
      <a href="?all=1">Alle Orte</a>
      <a href="?final=1">Finale</a>
      <a href="?fresh=1">Frisch</a>
    `;
  } else {
    target.innerHTML = "";
  }
}

/* ------------------------------------------------------------
   Intro
   ------------------------------------------------------------ */
function showIntro() {
  $("#game").classList.add("hidden");
  $("#intro").classList.remove("hidden");
  document.body.classList.remove("modal-open");
  introIndex = 0;
  renderIntro();
  window.scrollTo(0, 0);
}

function renderIntro() {
  const scene = GAME.intro[introIndex];
  if (!scene) {
    finishIntro();
    return;
  }

  const card = $(".intro-card");
  const img = $("#intro-img");
  const copy = $(".intro-copy");

  card.classList.toggle("title-scene", scene.type === "title");
  img.src = scene.image;
  img.alt = scene.alt || "";

  $("#intro-kicker").textContent = scene.kicker || "";
  $("#intro-title").textContent = scene.title || "";
  $("#intro-text").textContent = scene.text || "";

  const isLast = introIndex === GAME.intro.length - 1;
  $("#intro-next").textContent = isLast ? "Abenteuer beginnen" : "Weiter";
  $("#intro-skip").classList.toggle("hidden", isLast);

  $("#intro-dots").innerHTML = GAME.intro
    .map((_, index) => `<span class="${index === introIndex ? "active" : ""}"></span>`)
    .join("");

  if (copy && copy.animate) {
    copy.animate(
      [
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 320, easing: "ease" }
    );
  }
}

function nextIntroScene() {
  if (introIndex < GAME.intro.length - 1) {
    introIndex += 1;
    renderIntro();
  } else {
    finishIntro();
  }
}

function finishIntro() {
  state.introSeen = true;
  if (!state.startedAt) state.startedAt = new Date().toISOString();
  saveState();
  showGame();
}

/* ------------------------------------------------------------
   Spielansicht
   ------------------------------------------------------------ */
function showGame() {
  $("#intro").classList.add("hidden");
  $("#game").classList.remove("hidden");
  document.body.classList.remove("modal-open");
  renderGame();
  window.scrollTo(0, 0);
}

function renderGame() {
  updateMapState(state);
  renderQuest();
  renderInventory();
  renderHint();
  renderProgress();
  renderDigits();
}

function renderQuest() {
  const next = getNextLocation();
  const solvedCount = state.solved.length;
  const total = GAME.final.required.length;

  if (allPuzzlesSolved()) {
    $("#quest-title").textContent = "Das Drachennest";
    $("#quest-text").textContent =
      "Alle zehn Zutaten sind beisammen. Auf zum Finale – Frido wartet schon mit der letzten Sternenbohne.";
  } else if (next) {
    $("#quest-title").textContent = next.short;
    $("#quest-text").textContent = next.teaser;
  } else {
    $("#quest-title").textContent = "Finde die letzte Sternenbohne";
    $("#quest-text").textContent =
      "Der Zauberkaffee ist alle und ganz Frohburg schläft ein. Der Barde an der Postmeilensäule weiß vielleicht mehr.";
  }

  $("#progress-count").textContent = `${solvedCount} / ${total}`;
  $("#progress-bar").style.width = `${Math.min(100, (solvedCount / total) * 100)}%`;
}

function renderProgress() {
  const solvedCount = state.solved.length;
  const total = GAME.final.required.length;
  $("#progress-count").textContent = `${solvedCount} / ${total}`;
  $("#progress-bar").style.width = `${Math.min(100, (solvedCount / total) * 100)}%`;
}

function digitGroupsMarkup() {
  return [0, 3]
    .map((start) => {
      const label = start === 0 ? "N 51° 03." : "E 012° 33.";
      const chips = [0, 1, 2]
        .map((offset) => {
          const value = state.digits[start + offset];
          const filled = value != null;
          return `<span class="digit ${filled ? "filled" : ""}">${filled ? esc(value) : "?"}</span>`;
        })
        .join("");
      return `<span class="digit-group"><span class="digit-label">${label}</span>${chips}</span>`;
    })
    .join("");
}

function renderDigits() {
  document.querySelectorAll("[data-digit-strip]").forEach((strip) => {
    strip.innerHTML = digitGroupsMarkup();
  });
}

function coordinateString() {
  const values = state.digits.map((value) => (value == null ? "?" : value));
  return GAME.final.coordsTemplate.replace(/\{(\d)\}/g, (_, index) => {
    return values[Number(index)] ?? "?";
  });
}

function renderInventory() {
  const container = $("#inventory");
  const count = $("#inventory-count");

  if (!state.inventory.length) {
    container.innerHTML =
      '<p class="empty-note">Noch nichts gesammelt. Der Barde wartet schon.</p>';
    count.textContent = "0";
    return;
  }

  container.innerHTML = state.inventory
    .map((id) => {
      const item = GAME.items[id];
      if (!item) return "";
      return `
        <div class="inventory-item">
          <div class="inventory-icon">${itemIcon(item.icon)}</div>
          <div>
            <strong>${esc(item.name)}</strong>
            <span>${esc(item.desc)}</span>
          </div>
        </div>`;
    })
    .join("");

  count.textContent = String(state.inventory.length);
}

function renderHint() {
  const text = $("#hint-text");
  const button = $("#btn-hint");
  const next = getNextLocation();
  hintShown = false;

  if (allPuzzlesSolved()) {
    currentHint = null;
    text.textContent =
      "Der Barde schläft selig. Alle Zutaten sind beisammen – jetzt fehlt nur noch das Drachennest.";
    button.classList.add("hidden");
    return;
  }

  if (!next || !next.puzzle) {
    currentHint = null;
    text.textContent = "„Gähn ... frag mich, wenn du nicht weiterweißt. Aber leise, ja?“";
    button.classList.add("hidden");
    return;
  }

  currentHint = next.puzzle.hint || null;
  text.textContent = "„Gähn ... frag mich, wenn du nicht weiterweißt. Aber leise, ja?“";
  button.textContent = "Hinweis anzeigen";
  button.classList.toggle("hidden", !currentHint);
}

function toggleSidebarHint() {
  if (!currentHint) return;
  const text = $("#hint-text");
  const button = $("#btn-hint");

  hintShown = !hintShown;
  text.textContent = hintShown
    ? currentHint
    : "„Gähn ... frag mich, wenn du nicht weiterweißt. Aber leise, ja?“";
  button.textContent = hintShown ? "Hinweis verstecken" : "Hinweis anzeigen";
}

/* ------------------------------------------------------------
   Karte & Reisen
   ------------------------------------------------------------ */
function handleLocationClick(id) {
  const loc = getLocation(id);
  if (!loc) return;

  const unlocked = locationUnlocked(loc, state);

  if (!unlocked) {
    const missing = (loc.requires || [])
      .filter((requiredId) => !state.solved.includes(requiredId))
      .map((requiredId) => getLocation(requiredId)?.name || requiredId)
      .join(", ");
    showToast(
      missing
        ? `Dieser Ort ist noch verschlossen. Zuerst: ${missing}.`
        : "Dieser Ort ist noch verschlossen.",
      "err"
    );
    return;
  }

  if (loc.isFinal) {
    if (allPuzzlesSolved()) openFinal();
    else openPreview(loc, true);
    return;
  }

  if (state.solved.includes(loc.id)) {
    showSolved(loc);
    return;
  }

  travelTo(loc).then(() => openChapter(loc));
}

function travelTo(loc) {
  if (state.currentLocation === loc.id) return Promise.resolve();
  if (traveling) return Promise.resolve();

  traveling = true;
  state.currentLocation = loc.id;
  saveState();
  updateMapState(state);
  showToast(`Du reist nach ${loc.name} ...`, "ok");

  return new Promise((resolve) => {
    setTimeout(() => {
      traveling = false;
      resolve();
    }, 760);
  });
}

/* ------------------------------------------------------------
   Kapitel
   ------------------------------------------------------------ */
function setChapterShell(loc, kickerText) {
  $("#chapter-kicker").textContent = kickerText || `Kapitel ${loc.chapter}`;
  $("#chapter-title").textContent = loc.name;
  $("#chapter-subtitle").textContent = loc.short;

  const image = $("#chapter-portrait");
  image.src = loc.character?.img || "assets/img/map.jpg";
  image.alt = loc.character?.name || loc.name;

  $("#chapter-character").textContent = loc.character?.name || loc.name;
  $("#chapter-character-role").textContent = loc.character?.role || "";

  $("#chapter-story").innerHTML = (loc.story || [])
    .map((paragraph) => `<p>${esc(paragraph)}</p>`)
    .join("");

  $("#puzzle-area").innerHTML = "";
  const feedback = $("#chapter-feedback");
  feedback.className = "feedback hidden";
  feedback.textContent = "";
}

function openChapter(loc) {
  if (state.solved.includes(loc.id)) {
    showSolved(loc);
    return;
  }

  state.currentLocation = loc.id;
  saveState();
  updateMapState(state);

  setChapterShell(loc);
  renderPuzzle(loc);
  openModalEl($("#chapter-modal"), "#puzzle-answer");
}

function renderPuzzle(loc) {
  stopActivePuzzles();

  const puzzle = loc.puzzle;
  if (!puzzle) {
    openPreview(loc, false);
    return;
  }

  switch (puzzle.type) {
    case "nonogram": renderNonogramPuzzle(loc); break;
    case "crossword": renderCrosswordPuzzle(loc); break;
    case "sacks": renderSacksPuzzle(loc); break;
    case "letter": renderLetterPuzzle(loc); break;
    case "jigsaw": renderJigsawPuzzle(loc); break;
    case "timing": renderTimingPuzzle(loc); break;
    case "dials": renderDialsPuzzle(loc); break;
    case "maze": renderMazePuzzle(loc); break;
    case "melody": renderMelodyPuzzle(loc); break;
    case "bells": renderBellsPuzzle(loc); break;
    case "battle": renderBattlePuzzle(loc); break;
    default:
      $("#puzzle-area").innerHTML =
        '<div class="puzzle-card"><h3>Dieses Rätsel schläft noch.</h3></div>';
  }
}

function puzzleActions(checkId, label = "Prüfen") {
  return `
    <button class="btn btn-primary" type="button" id="${checkId}">${label}</button>`;
}

/* Gemeinsame Anzeige für begrenzte Prüfungen */
function livesMarkup(left, max) {
  const dots = Array.from(
    { length: max },
    (_, index) => `<span class="life-dot${index >= left ? " used" : ""}"></span>`
  ).join("");
  return `
    <span class="nonogram-lives-label">Prüfungen</span>
    <span class="nonogram-lives-dots" aria-hidden="true">${dots}</span>
    <span class="nonogram-lives-count">${left} von ${max}</span>`;
}

/* --- Kapitel 1: Farbiges Nonogramm --- */
function nonogramRuns(line) {
  const runs = [];
  for (let index = 0; index < line.length; index += 1) {
    const mark = line[index];
    if (mark === ".") continue;
    let length = 1;
    while (line[index + length] === mark) length += 1;
    runs.push({ color: mark, length });
    index += length - 1;
  }
  return runs;
}

const NONOGRAM_MARK = "__mark__";

function renderNonogramPuzzle(loc) {
  const puzzle = loc.puzzle;
  const rows = puzzle.solution.length;
  const cols = puzzle.solution[0].length;

  const colorCss = {};
  const colorName = {};
  puzzle.colors.forEach((color) => {
    colorCss[color.key] = color.css;
    colorName[color.key] = color.name;
  });

  const painted = Array.from({ length: rows }, () => Array(cols).fill(""));
  const MAX_CHECKS = 5;
  let selected = puzzle.colors[0].key;
  let painting = false;
  let checksLeft = MAX_CHECKS;

  const rowClues = puzzle.solution.map((row) => nonogramRuns(row));
  const columnClues = [];
  for (let c = 0; c < cols; c += 1) {
    columnClues.push(nonogramRuns(puzzle.solution.map((row) => row[c]).join("")));
  }

  const clueMarkup = (runs, lineId) =>
    runs.length
      ? runs
          .map((run, index) => {
            const label = `${run.length} Felder ${colorName[run.color]}`;
            return `<button class="clue clue-${esc(colorCss[run.color])}" type="button"
                            data-clue="${lineId}-${index}" data-label="${esc(label)}"
                            aria-pressed="false"
                            aria-label="${esc(label)} – wegstreichen">${run.length}</button>`;
          })
          .join("")
      : '<span class="clue clue-empty">0</span>';

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="nonogram-palette" role="group" aria-label="Farbe wählen">
        ${puzzle.colors
          .map(
            (color, index) => `
              <button class="swatch swatch-${esc(color.css)}${index === 0 ? " selected" : ""}"
                      type="button" data-color="${esc(color.key)}" aria-pressed="${index === 0}">
                <span class="swatch-dot" aria-hidden="true"></span>${esc(color.name)}
              </button>`
          )
          .join("")}
        <button class="swatch swatch-mark" type="button" data-color="${NONOGRAM_MARK}" aria-pressed="false">
          <span class="swatch-dot" aria-hidden="true"></span>Frei (×)
        </button>
        <button class="swatch swatch-eraser" type="button" data-color="" aria-pressed="false">
          <span class="swatch-dot" aria-hidden="true"></span>Radiergummi
        </button>
      </div>

      <div class="nonogram-wrap">
        <div class="nonogram">
          <div class="nonogram-corner" aria-hidden="true"></div>
          <div class="nonogram-col-clues" role="group" aria-label="Spaltenzahlen zum Wegstreichen"
               style="grid-template-columns: repeat(${cols}, var(--cell))">
            ${columnClues
              .map((runs, c) => `<div class="nonogram-col-clue">${clueMarkup(runs, `c${c}`)}</div>`)
              .join("")}
          </div>
          <div class="nonogram-row-clues" role="group" aria-label="Zeilenzahlen zum Wegstreichen"
               style="grid-template-rows: repeat(${rows}, var(--cell))">
            ${rowClues
              .map((runs, r) => `<div class="nonogram-row-clue">${clueMarkup(runs, `r${r}`)}</div>`)
              .join("")}
          </div>
          <div class="nonogram-board" id="nonogram-board" role="group"
               aria-label="Nonogramm ${rows} mal ${cols}"
               style="grid-template-columns: repeat(${cols}, var(--cell)); grid-template-rows: repeat(${rows}, var(--cell))">
            ${puzzle.solution
              .map((row, r) =>
                row
                  .split("")
                  .map(
                    (_, c) => `
                      <button class="nonogram-cell${c === 4 ? " sep-right" : ""}${
                        r === 4 ? " sep-bottom" : ""
                      }" type="button"
                              data-row="${r}" data-col="${c}" data-color=""
                              aria-label="Zeile ${r + 1}, Spalte ${c + 1}: leer"></button>`
                  )
                  .join("")
              )
              .join("")}
          </div>
        </div>
      </div>

      <p class="nonogram-tip">Tippe auf eine Zahl am Rand, um sie wegzustreichen.</p>

      <p class="puzzle-note">${esc(puzzle.note)}</p>

      <div class="nonogram-lives" id="nonogram-lives" role="status"></div>

      <div class="puzzle-actions">
        ${puzzleActions("nonogram-check", "Bild prüfen")}
        <button class="btn btn-ghost btn-small" type="button" id="nonogram-reset">Leeren</button>
      </div>
    </div>`;

  const board = $("#nonogram-board");
  const cells = [...board.querySelectorAll(".nonogram-cell")];

  const paintCell = (cell) => {
    const r = Number(cell.dataset.row);
    const c = Number(cell.dataset.col);
    painted[r][c] = selected;

    puzzle.colors.forEach((color) => cell.classList.remove(`color-${color.css}`));
    cell.classList.remove("marked");
    if (selected === NONOGRAM_MARK) {
      cell.classList.add("marked");
    } else if (selected) {
      cell.classList.add(`color-${colorCss[selected]}`);
    }
    cell.classList.remove("wrong");
    cell.dataset.color = selected;
    const label = selected === NONOGRAM_MARK
      ? "als frei markiert"
      : selected
        ? colorName[selected]
        : "leer";
    cell.setAttribute("aria-label", `Zeile ${r + 1}, Spalte ${c + 1}: ${label}`);
  };

  document.querySelectorAll(".nonogram-palette .swatch").forEach((button) => {
    button.addEventListener("click", () => {
      selected = button.dataset.color;
      document.querySelectorAll(".nonogram-palette .swatch").forEach((other) => {
        const active = other === button;
        other.classList.toggle("selected", active);
        other.setAttribute("aria-pressed", String(active));
      });
    });
  });

  const clueButtons = [...document.querySelectorAll(".nonogram-wrap .clue[data-clue]")];

  const setClueDone = (clue, done) => {
    clue.classList.toggle("done", done);
    clue.setAttribute("aria-pressed", String(done));
    clue.setAttribute(
      "aria-label",
      `${clue.dataset.label} – ${done ? "weggestrichen" : "wegstreichen"}`
    );
  };

  clueButtons.forEach((clue) => {
    clue.addEventListener("click", () => {
      setClueDone(clue, !clue.classList.contains("done"));
    });
  });

  const stopPaint = () => {
    painting = false;
  };

  const cellAt = (event) => {
    const element = document.elementFromPoint(event.clientX, event.clientY);
    const cell = element?.closest?.(".nonogram-cell");
    return cell && board.contains(cell) ? cell : null;
  };

  board.addEventListener("pointerdown", (event) => {
    const cell = event.target.closest(".nonogram-cell");
    if (!cell) return;
    event.preventDefault();

    if (event.button === 2) {
      const previous = selected;
      selected = "";
      paintCell(cell);
      selected = previous;
      return;
    }

    painting = true;
    paintCell(cell);
  });

  board.addEventListener("pointermove", (event) => {
    if (!painting) return;
    const cell = cellAt(event);
    if (cell) paintCell(cell);
  });

  board.addEventListener("pointerenter", (event) => {
    if (!painting) return;
    const cell = event.target.closest(".nonogram-cell");
    if (cell) paintCell(cell);
  });

  board.addEventListener("contextmenu", (event) => {
    if (event.target.closest(".nonogram-cell")) event.preventDefault();
  });

  board.addEventListener("click", (event) => {
    const cell = event.target.closest(".nonogram-cell");
    if (!cell || event.detail !== 0) return;
    paintCell(cell);
  });

  window.addEventListener("pointerup", stopPaint);
  window.addEventListener("pointercancel", stopPaint);

  const livesEl = $("#nonogram-lives");
  const checkButton = $("#nonogram-check");

  const renderLives = () => {
    livesEl.innerHTML = livesMarkup(checksLeft, MAX_CHECKS);
    livesEl.setAttribute("aria-label", `Noch ${checksLeft} von ${MAX_CHECKS} Prüfungen`);
  };

  const clearBoard = () => {
    painted.forEach((row) => row.fill(""));
    cells.forEach((cell) => {
      puzzle.colors.forEach((color) => cell.classList.remove(`color-${color.css}`));
      cell.classList.remove("wrong", "marked");
      cell.dataset.color = "";
      cell.setAttribute(
        "aria-label",
        `Zeile ${Number(cell.dataset.row) + 1}, Spalte ${Number(cell.dataset.col) + 1}: leer`
      );
    });
    clueButtons.forEach((clue) => setClueDone(clue, false));
  };

  checkButton.addEventListener("click", () => {
    const filled = painted.flat().filter((value) => value && value !== NONOGRAM_MARK).length;
    if (!filled) {
      showFeedback("Das Bild ist noch leer. Wähle eine Farbe und mal die Felder aus.", "err");
      return;
    }

    const missing = [];
    const wrongColor = [];
    const wrongMark = [];
    painted.forEach((row, r) => {
      row.forEach((value, c) => {
        const expected = puzzle.solution[r][c] === "." ? "" : puzzle.solution[r][c];
        if (value === NONOGRAM_MARK) {
          if (expected !== "") wrongMark.push(1);
          return;
        }
        if (value === expected) return;
        if (!value) missing.push(1);
        else wrongColor.push(1);
      });
    });

    if (!missing.length && !wrongColor.length && !wrongMark.length) {
      stopPaint();
      activeNonogram = null;
      window.removeEventListener("pointerup", stopPaint);
      window.removeEventListener("pointercancel", stopPaint);
      solveChapter(loc);
      return;
    }

    checksLeft -= 1;

    const parts = [];
    if (wrongColor.length) {
      parts.push(
        `${wrongColor.length} Feld${wrongColor.length === 1 ? " hat" : "er haben"} die falsche Farbe`
      );
    }
    if (wrongMark.length) {
      const one = wrongMark.length === 1;
      parts.push(
        `${wrongMark.length} Feld${one ? " ist" : "er sind"} als frei markiert, ${one ? "gehört" : "gehören"} aber ausgemalt`
      );
    }
    if (missing.length) {
      parts.push(
        `${missing.length} Feld${missing.length === 1 ? " ist" : "er sind"} noch leer`
      );
    }
    const summary = parts.join(", ");

    if (checksLeft <= 0) {
      checksLeft = MAX_CHECKS;
      clearBoard();
      renderLives();
      tone(147, 0.3, 0, "triangle");
      showFeedback(
        `${summary}. Damit sind alle ${MAX_CHECKS} Prüfungen verbraucht – das Pergament ist wieder leer. Du hast ${MAX_CHECKS} neue Prüfungen.`,
        "err"
      );
      return;
    }

    renderLives();
    tone(196, 0.22, 0, "triangle");
    showFeedback(
      `${summary}. Noch ${checksLeft} ${checksLeft === 1 ? "Prüfung" : "Prüfungen"} übrig.`,
      "err"
    );
  });

  $("#nonogram-reset").addEventListener("click", () => {
    painting = false;
    clearBoard();
    showFeedback("Alles wieder leer. Du kannst von vorn malen.", "hint");
  });

  renderLives();

  activeNonogram = {
    stopPaint
  };
}

/* --- Kapitel 2: Sackwaage --- */
function renderSacksPuzzle(loc) {
  const puzzle = loc.puzzle;
  const chosen = new Set();

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="scale-wrap">
        <div class="scale">
          <div class="scale-beam" id="scale-beam">
            <span class="scale-pan left"></span>
            <span class="scale-pan right"></span>
          </div>
          <div class="scale-stand"></div>
          <div class="scale-readout" id="scale-sum">0 g</div>
        </div>
        <p class="scale-target">Ziel: <strong>${puzzle.target} g</strong></p>
      </div>

      <div class="sack-grid">
        ${puzzle.sacks
          .map(
            (weight) => `
              <button class="sack" type="button" data-sack="${weight}" aria-pressed="false">
                <span class="sack-bag" aria-hidden="true"></span>
                <strong>${weight} g</strong>
              </button>`
          )
          .join("")}
      </div>

      <p class="puzzle-note">${esc(puzzle.note)}</p>
      <div class="puzzle-actions">
        <button class="btn btn-primary" type="button" id="sacks-check">Wiegen</button>
      </div>
    </div>`;

  const update = () => {
    const sum = [...chosen].reduce((total, weight) => total + weight, 0);
    $("#scale-sum").textContent = `${sum} g`;
    const angle = chosen.size ? clamp((sum - puzzle.target) / 18, -15, 15) : 0;
    $("#scale-beam").style.transform = `rotate(${angle}deg)`;
    $("#scale-beam").classList.toggle("balanced", sum === puzzle.target && chosen.size === 3);
  };

  document.querySelectorAll("[data-sack]").forEach((button) => {
    button.addEventListener("click", () => {
      const weight = Number(button.dataset.sack);
      if (chosen.has(weight)) chosen.delete(weight);
      else chosen.add(weight);
      button.classList.toggle("selected", chosen.has(weight));
      button.setAttribute("aria-pressed", String(chosen.has(weight)));
      update();
    });
  });

  $("#sacks-check").addEventListener("click", () => {
    const sum = [...chosen].reduce((total, weight) => total + weight, 0);
    if (chosen.size !== 3) {
      showFeedback("Die Waage braucht genau drei Säcke.", "err");
      return;
    }
    if (sum === puzzle.target) {
      solveChapter(loc);
      return;
    }
    const diff = Math.abs(sum - puzzle.target);
    showFeedback(
      `Die Waage zeigt ${sum} g – das sind ${diff} g ${sum > puzzle.target ? "zu viel" : "zu wenig"}.`,
      "err"
    );
  });
  update();
}

/* --- Kapitel 2: Kreuzworträtsel --- */
const CROSSWORD_KEYS = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ".split("");

function crosswordNormalize(text) {
  return text
    .toUpperCase()
    .replace(/\s+/g, "")
    .replace(/[^A-ZÄÖÜ]/g, "");
}

function buildCrossword(puzzle) {
  const words = puzzle.words
    .map((entry) => {
      const letters = crosswordNormalize(entry.answer).split("");
      const cells = letters.map((_, index) =>
        entry.dir === "across"
          ? [entry.row, entry.col + index]
          : [entry.row + index, entry.col]
      );
      return { ...entry, letters, cells };
    })
    .sort((a, b) => a.row - b.row || a.col - b.col)
    .map((word, index) => ({ ...word, number: index + 1 }));

  const grid = Array.from({ length: puzzle.rows }, () =>
    Array.from({ length: puzzle.cols }, () => null)
  );

  words.forEach((word, wordIndex) => {
    word.cells.forEach(([row, col]) => {
      if (!grid[row][col]) {
        grid[row][col] = { row, col, words: [], number: null };
      }
      grid[row][col].words.push(wordIndex);
    });
    grid[word.row][word.col].number = word.number;
  });

  return { words, grid };
}

function renderCrosswordPuzzle(loc) {
  const puzzle = loc.puzzle;
  const MAX_CHECKS = 5;
  const { words, grid } = buildCrossword(puzzle);
  const letters = grid.map((row) => row.map(() => ""));
  const doneWords = new Set();
  let activeWord = Math.max(0, words.findIndex((word) => word.dir === "across"));
  let cursor = 0;
  let checksLeft = MAX_CHECKS;

  const wordFilled = (word) => word.cells.every(([row, col]) => letters[row][col]);
  const wordCorrect = (word) =>
    word.cells.every(([row, col], index) => letters[row][col] === word.letters[index]);

  const cellMarkup = grid
    .map((row, rowIndex) =>
      row
        .map((cell, colIndex) => {
          if (!cell) return '<span class="cw-cell cw-void" aria-hidden="true"></span>';
          const number = cell.number ? `<span class="cw-num">${cell.number}</span>` : "";
          return `<button class="cw-cell" type="button" data-row="${rowIndex}" data-col="${colIndex}">
              ${number}<span class="cw-letter"></span>
            </button>`;
        })
        .join("")
    )
    .join("");

  const clueGroup = (dir, title) => {
    const items = words
      .map((word, index) => ({ word, index }))
      .filter(({ word }) => word.dir === dir)
      .map(
        ({ word, index }) => `
          <li>
            <button class="cw-clue" type="button" data-word="${index}">
              <span class="cw-clue-num">${word.number}</span>
              <span class="cw-clue-text">${esc(word.clue)}</span>
            </button>
          </li>`
      )
      .join("");
    if (!items) return "";
    return `<h4 class="cw-clue-head">${title}</h4><ul class="cw-clue-list">${items}</ul>`;
  };

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="crossword-wrap">
        <div class="crossword" id="crossword" style="--cw-cols: ${grid[0].length}">
          ${cellMarkup}
        </div>
      </div>

      <p class="cw-active" id="cw-active"></p>

      <div class="cw-keys" id="cw-keys" role="group" aria-label="Buchstaben zum Eintragen">
        ${CROSSWORD_KEYS.map(
          (key) => `<button class="cw-key" type="button" data-key="${key}">${key}</button>`
        ).join("")}
        <button class="cw-key cw-key-wide" type="button" data-key="back"
                aria-label="Letzten Buchstaben löschen">⌫</button>
      </div>

      <div class="cw-clues">
        ${clueGroup("across", "Waagerecht")}
        ${clueGroup("down", "Senkrecht")}
      </div>

      <p class="puzzle-note">${esc(puzzle.note)}</p>

      <div class="nonogram-lives" id="cw-lives" role="status"></div>

      <div class="puzzle-actions">
        ${puzzleActions("cw-check", "Rätsel prüfen")}
        <button class="btn btn-ghost btn-small" type="button" id="cw-reset">Leeren</button>
      </div>
    </div>`;

  const board = $("#crossword");
  const activeEl = $("#cw-active");
  const cellEls = new Map();
  board.querySelectorAll(".cw-cell[data-row]").forEach((el) => {
    cellEls.set(`${el.dataset.row},${el.dataset.col}`, {
      el,
      letter: el.querySelector(".cw-letter")
    });
  });

  const renderGrid = () => {
    const activeCells = new Set(words[activeWord].cells.map(([row, col]) => `${row},${col}`));
    const [cursorRow, cursorCol] = words[activeWord].cells[cursor];
    const cursorKey = `${cursorRow},${cursorCol}`;

    cellEls.forEach(({ el, letter }, key) => {
      const [row, col] = key.split(",").map(Number);
      const value = letters[row][col];
      letter.textContent = value;
      el.classList.toggle("filled", Boolean(value));
      el.classList.toggle("active", activeCells.has(key));
      el.classList.toggle("cursor", key === cursorKey);
      el.classList.toggle(
        "done",
        grid[row][col].words.every((index) => doneWords.has(index))
      );
    });
  };

  const renderActive = () => {
    const word = words[activeWord];
    const filled = word.cells.filter(([row, col]) => letters[row][col]).length;
    activeEl.innerHTML = `
      <span class="cw-active-num">${word.number} ${word.dir === "across" ? "waagerecht" : "senkrecht"}</span>
      <span class="cw-active-text">${esc(word.clue)}</span>
      <span class="cw-active-count">${filled}/${word.letters.length}</span>`;
  };

  const renderClues = () => {
    document.querySelectorAll(".cw-clue").forEach((el) => {
      const index = Number(el.dataset.word);
      el.classList.toggle("active", index === activeWord);
      el.classList.toggle("done", doneWords.has(index));
    });
  };

  const renderLives = () => {
    const el = $("#cw-lives");
    el.innerHTML = livesMarkup(checksLeft, MAX_CHECKS);
    el.setAttribute("aria-label", `Noch ${checksLeft} von ${MAX_CHECKS} Prüfungen`);
  };

  const renderAll = () => {
    renderGrid();
    renderActive();
    renderClues();
  };

  const selectWord = (index, cell = null) => {
    activeWord = index;
    if (cell) {
      const found = words[index].cells.findIndex(
        ([row, col]) => row === cell[0] && col === cell[1]
      );
      cursor = found >= 0 ? found : 0;
    } else {
      cursor = 0;
    }
    renderAll();
  };

  const teardown = () => {
    document.removeEventListener("keydown", onKeyDown);
    activeCrossword = null;
  };

  const finish = () => {
    teardown();
    solveChapter(loc);
  };

  const writeLetter = (letter) => {
    const [row, col] = words[activeWord].cells[cursor];
    letters[row][col] = letter;
    doneWords.clear();
    if (cursor < words[activeWord].cells.length - 1) cursor += 1;
    renderAll();
    if (words.every(wordCorrect)) finish();
  };

  const eraseLetter = () => {
    const current = words[activeWord].cells[cursor];
    if (letters[current[0]][current[1]]) {
      letters[current[0]][current[1]] = "";
    } else if (cursor > 0) {
      cursor -= 1;
      const previous = words[activeWord].cells[cursor];
      letters[previous[0]][previous[1]] = "";
    }
    doneWords.clear();
    renderAll();
  };

  const onKeyDown = (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const target = event.target;
    if (target && target.closest && target.closest("input, textarea, select, [contenteditable='true']")) {
      return;
    }
    if (event.key === "Backspace") {
      event.preventDefault();
      eraseLetter();
      return;
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      cursor = Math.min(cursor + 1, words[activeWord].cells.length - 1);
      renderAll();
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      cursor = Math.max(cursor - 1, 0);
      renderAll();
      return;
    }
    if (event.key.length === 1) {
      const letter = crosswordNormalize(event.key).slice(0, 1);
      if (!letter) return;
      event.preventDefault();
      writeLetter(letter);
    }
  };

  document.addEventListener("keydown", onKeyDown);

  board.addEventListener("click", (event) => {
    const cell = event.target.closest(".cw-cell[data-row]");
    if (!cell) return;
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);
    const owners = grid[row][col].words;
    let next = owners[0];
    if (owners.length > 1 && owners.includes(activeWord)) {
      next = owners.find((index) => index !== activeWord);
    }
    selectWord(next, [row, col]);
  });

  document.querySelectorAll(".cw-clue").forEach((el) => {
    el.addEventListener("click", () => {
      selectWord(Number(el.dataset.word));
      activeEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  });

  $("#cw-keys").addEventListener("click", (event) => {
    const key = event.target.closest(".cw-key");
    if (!key) return;
    if (key.dataset.key === "back") eraseLetter();
    else writeLetter(key.dataset.key);
  });

  $("#cw-check").addEventListener("click", () => {
    if (!letters.some((row) => row.some(Boolean))) {
      showFeedback("Das Rätsel ist noch leer. Tippe ein Feld an und trage ein Märchen ein.", "err");
      return;
    }

    const wrong = [];
    const incomplete = [];
    words.forEach((word, index) => {
      if (!wordFilled(word)) incomplete.push(index);
      else if (!wordCorrect(word)) wrong.push(index);
    });

    if (!wrong.length && !incomplete.length) {
      finish();
      return;
    }

    doneWords.clear();
    words.forEach((word, index) => {
      if (wordFilled(word) && wordCorrect(word)) doneWords.add(index);
    });
    const correctCount = doneWords.size;
    checksLeft -= 1;

    if (checksLeft <= 0) {
      wrong.forEach((index) => {
        words[index].cells.forEach(([row, col]) => {
          const keep = grid[row][col].words.some((other) => doneWords.has(other));
          if (!keep) letters[row][col] = "";
        });
      });
      checksLeft = MAX_CHECKS;
      renderAll();
      renderLives();
      tone(147, 0.3, 0, "triangle");
      showFeedback(
        `${correctCount} von ${words.length} Wörtern stimmten. Damit sind alle ${MAX_CHECKS} Prüfungen verbraucht – die falschen Wörter sind geleert, die richtigen bleiben stehen. Du hast ${MAX_CHECKS} neue Prüfungen.`,
        "err"
      );
      return;
    }

    renderAll();
    renderLives();
    tone(196, 0.22, 0, "triangle");
    showFeedback(
      `${correctCount} von ${words.length} Wörtern stimmen. Noch ${checksLeft} ${checksLeft === 1 ? "Prüfung" : "Prüfungen"} übrig.`,
      "err"
    );
  });

  $("#cw-reset").addEventListener("click", () => {
    letters.forEach((row) => row.fill(""));
    doneWords.clear();
    cursor = 0;
    renderAll();
    showFeedback("Alles wieder leer. Du kannst von vorn tippen.", "hint");
  });

  activeCrossword = { teardown };
  renderAll();
  renderLives();
}

/* --- Kapitel 3: Karls Brief --- */
function renderLetterPuzzle(loc) {
  const puzzle = loc.puzzle;
  const usePassword = Boolean(puzzle.password);

  const inputsMarkup = usePassword
    ? `
        <div class="letter-inputs letter-inputs--single">
          <label class="letter-input-wrap">
            <span class="letter-input-label">Passwort</span>
            <input class="letter-input" type="text" data-index="0"
                   autocomplete="off" spellcheck="false" />
          </label>
        </div>`
    : `
        <div class="letter-inputs">
          ${puzzle.answers
            .map(
              (_, index) => `
                <label class="letter-input-wrap">
                  <span class="letter-input-label">Verstecktes Wort ${index + 1}</span>
                  <input class="letter-input" type="text" data-index="${index}"
                         autocomplete="off" spellcheck="false" />
                </label>`
            )
            .join("")}
        </div>`;

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      ${puzzle.prompt ? `<p class="puzzle-prompt">${esc(puzzle.prompt)}</p>` : ""}

      <div class="letter-box">
        ${puzzle.letter.map((line) => `<p>${esc(line)}</p>`).join("")}
      </div>

      ${inputsMarkup}

      <p class="puzzle-note">${esc(puzzle.note)}</p>

      <div class="puzzle-actions">
        ${puzzleActions("letter-check", "Brief prüfen")}
      </div>
    </div>`;

  const inputs = [...document.querySelectorAll(".letter-input")];
  inputs.forEach((input) => {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        $("#letter-check").click();
      }
    });
  });

  $("#letter-check").addEventListener("click", () => {
    const given = inputs.map((input) => crosswordNormalize(input.value));
    let correct = false;
    if (usePassword) {
      correct = given[0] === crosswordNormalize(puzzle.password);
    } else {
      correct = puzzle.answers.every(
        (answer, index) => given[index] === crosswordNormalize(answer)
      );
    }
    if (correct) {
      solveChapter(loc);
    } else {
      showFeedback(
        usePassword
          ? "Das Passwort stimmt nicht. Lies die Anfangsbuchstaben der Zeilen."
          : "Die Wörter passen nicht. Lies den Brief noch einmal ohne Leerzeichen.",
        "err"
      );
    }
  });

  if (inputs[0]) inputs[0].focus();
}
/* --- Kapitel 4: Bestiarium-Puzzle --- */
function renderJigsawPuzzle(loc) {
  const puzzle = loc.puzzle;
  const cols = puzzle.cols;
  const rows = puzzle.rows;
  const total = cols * rows;
  const coverUrl = bestiaryCoverUrl();
  const keyEntries = [...puzzle.key].sort((a, b) =>
    a.letter.localeCompare(b.letter)
  );

  let order = shuffledOrder(total);
  let selected = null;
  let solved = false;

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="jigsaw-wrap">
        <div class="jigsaw" id="jigsaw-board"
             style="--cover:url('${coverUrl}'); --cols:${cols}; --rows:${rows}; grid-template-columns:repeat(${cols}, 1fr); grid-template-rows:repeat(${rows}, 1fr); aspect-ratio:${cols} / ${rows};"
             role="group" aria-label="Das zerrissene Buchcover"></div>
        <div class="jigsaw-runes hidden" id="jigsaw-runes" aria-label="Die Runen auf dem Cover">
          ${puzzle.sequence
            .map((glyph) => `<span class="jigsaw-rune">${runeSvg(glyph)}</span>`)
            .join("")}
        </div>
      </div>

      <p class="jigsaw-status" id="jigsaw-status"></p>

      <div class="puzzle-actions" id="jigsaw-actions">
        <button class="btn btn-ghost btn-small" type="button" id="jigsaw-shuffle">Neu mischen</button>
      </div>

      <div class="rune-reveal hidden" id="rune-reveal">
        <p class="rune-reveal-title">Der Runenschlüssel</p>
        <div class="jigsaw-key" aria-label="Runenschlüssel">
          ${keyEntries
            .map(
              (entry) => `
                <span class="jigsaw-key-item">
                  ${runeSvg(entry.glyph)}
                  <span>${esc(entry.letter)}</span>
                </span>`
            )
            .join("")}
        </div>
        <form class="puzzle-form" id="puzzle-form" autocomplete="off">
          <label for="puzzle-answer">${esc(puzzle.answerLabel || "Deine Antwort")}</label>
          <input id="puzzle-answer" name="answer" type="text" autocomplete="off"
                 spellcheck="false" required>
          <button class="btn btn-primary" type="submit">Prüfen</button>
        </form>
      </div>

      <p class="puzzle-note">${esc(puzzle.note)}</p>
    </div>`;

  const board = $("#jigsaw-board");
  const status = $("#jigsaw-status");
  const reveal = $("#rune-reveal");
  const runes = $("#jigsaw-runes");
  const shuffleButton = $("#jigsaw-shuffle");

  const boardSolved = () => order.every((slice, pos) => slice === pos);

  const renderBoard = () => {
    board.innerHTML = order
      .map((slice, pos) => {
        const row = Math.floor(slice / cols);
        const col = slice % cols;
        const x = cols === 1 ? 0 : (col / (cols - 1)) * 100;
        const y = rows === 1 ? 0 : (row / (rows - 1)) * 100;
        return `<button class="jigsaw-tile${selected === pos ? " selected" : ""}" type="button"
                        data-pos="${pos}" ${solved ? "disabled" : ""}
                        aria-label="Puzzleteil ${pos + 1}${
                          selected === pos ? ", ausgewählt" : ""
                        }"
                        style="background-position:${x}% ${y}%"></button>`;
      })
      .join("");
  };

  const finish = () => {
    solved = true;
    selected = null;
    renderBoard();
    board.classList.add("solved");
    status.textContent = "Das Cover ist vollständig. Die Runen leuchten auf.";
    shuffleButton.classList.add("hidden");
    runes.classList.remove("hidden");
    reveal.classList.remove("hidden");
    tone(660, 0.2);
    tone(880, 0.25, 0.16);
    showFeedback("Die Runen sind lesbar. Übersetze sie mit dem Schlüssel.", "ok");
  };

  const update = () => {
    if (solved) return;
    if (boardSolved()) {
      finish();
      return;
    }
    status.textContent =
      selected != null
        ? "Tippe auf ein zweites Teil, um zu tauschen."
        : "Tippe zwei Teile an, um sie zu tauschen.";
    renderBoard();
  };

  board.addEventListener("click", (event) => {
    if (solved) return;
    const tile = event.target.closest("[data-pos]");
    if (!tile) return;
    const pos = Number(tile.dataset.pos);

    if (selected === null) {
      selected = pos;
      update();
      return;
    }

    if (selected === pos) {
      selected = null;
      update();
      return;
    }

    [order[selected], order[pos]] = [order[pos], order[selected]];
    selected = null;
    update();
  });

  shuffleButton.addEventListener("click", () => {
    if (solved) return;
    order = shuffledOrder(total);
    selected = null;
    const feedback = $("#chapter-feedback");
    feedback.className = "feedback hidden";
    feedback.textContent = "";
    status.textContent = "Neu gemischt. Tippe zwei Teile an, um sie zu tauschen.";
    renderBoard();
  });

  $("#puzzle-form").addEventListener("submit", (event) => {
    event.preventDefault();
    checkTextAnswer(loc, $("#puzzle-answer").value, false);
  });

  status.textContent = "Tippe zwei Teile an, um sie zu tauschen.";
  renderBoard();
}

/* --- Kapitel 5: Zeiger-Timing --- */
function renderTimingPuzzle(loc) {
  const puzzle = loc.puzzle;

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="timing-stage">
        <div class="timing-track" id="timing-track">
          <div class="timing-zone" id="timing-zone"></div>
          <div class="timing-needle" id="timing-needle"></div>
        </div>
        <div class="timing-meta">
          <span id="timing-hits">0 / ${puzzle.hits} Treffer</span>
          <span id="timing-status">Bereit?</span>
        </div>
      </div>

      <p class="puzzle-note">${esc(puzzle.note || "Der Zeiger schwingt hin und her. Triff das grüne Feld.")}</p>
      <div class="puzzle-actions">
        <button class="btn btn-primary" type="button" id="timing-strike">Schlag!</button>
      </div>
    </div>`;

  const needle = $("#timing-needle");
  const zone = $("#timing-zone");
  const hitsLabel = $("#timing-hits");
  const status = $("#timing-status");

  let hits = 0;
  let zoneStart = 38;
  let position = 50;
  let stopped = false;
  const width = 16;

  const placeZone = () => {
    zoneStart = 8 + Math.random() * (84 - width);
    zone.style.left = `${zoneStart}%`;
    zone.style.width = `${width}%`;
  };

  const updateHits = () => {
    hitsLabel.textContent = `${hits} / ${puzzle.hits} Treffer`;
  };

  const frame = (now) => {
    if (stopped) return;
    const speed = 1.25 + hits * 0.35;
    position = 50 + 47 * Math.sin((now / 1000) * speed);
    needle.style.left = `${position}%`;
    activeTiming.raf = requestAnimationFrame(frame);
  };

  const strike = () => {
    if (stopped) return;
    const hit = position >= zoneStart && position <= zoneStart + width;
    if (!hit) {
      status.textContent = "Daneben!";
      status.classList.add("miss");
      tone(180, 0.16, 0, "triangle");
      setTimeout(() => status.classList.remove("miss"), 320);
      return;
    }

    hits += 1;
    tone(523 + hits * 90, 0.22);
    updateHits();
    status.textContent = hits >= puzzle.hits ? "Volltreffer!" : "Treffer! Weiter ...";
    if (hits >= puzzle.hits) {
      stopped = true;
      stopActivePuzzles();
      showFeedback(puzzle.success, "ok");
      solveChapter(loc);
      return;
    }
    placeZone();
  };

  activeTiming = { raf: 0 };
  placeZone();
  updateHits();
  activeTiming.raf = requestAnimationFrame(frame);

  $("#timing-strike").addEventListener("click", strike);}

/* --- Kapitel 6: Kaffeemaschine --- */
function renderDialsPuzzle(loc) {
  const puzzle = loc.puzzle;
  const selected = {};
  puzzle.settings.forEach((setting) => {
    selected[setting.key] = setting.options[0];
  });

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="machine">
        <div class="machine-top">
          <span class="machine-light"></span>
          <span class="machine-screen" id="machine-screen">---</span>
          <span class="machine-light"></span>
        </div>
        <div class="machine-settings">
          ${puzzle.settings
            .map(
              (setting) => `
                <div class="machine-row">
                  <span class="machine-label">${esc(setting.label)}</span>
                  <div class="chip-row" data-setting="${setting.key}">
                    ${setting.options
                      .map(
                        (option, index) => `
                          <button class="pick ${index === 0 ? "selected" : ""}" type="button"
                                  data-value="${esc(option)}">${esc(option)}</button>`
                      )
                      .join("")}
                  </div>
                </div>`
            )
            .join("")}
        </div>
      </div>

      <p class="puzzle-note">${esc(puzzle.note)}</p>
      <div class="puzzle-actions">
        ${puzzleActions("machine-check", "Brühen")}
      </div>
    </div>`;

  document.querySelectorAll(".chip-row[data-setting]").forEach((row) => {
    const key = row.dataset.setting;
    row.querySelectorAll(".pick").forEach((button) => {
      button.addEventListener("click", () => {
        selected[key] = button.dataset.value;
        row.querySelectorAll(".pick").forEach((entry) => entry.classList.remove("selected"));
        button.classList.add("selected");
        $("#machine-screen").textContent = "---";
      });
    });
  });

  $("#machine-check").addEventListener("click", () => {
    const wrong = puzzle.settings.filter(
      (setting) => selected[setting.key] !== setting.answer
    );
    if (!wrong.length) {
      solveChapter(loc);
      return;
    }
    $("#machine-screen").textContent = "BRRRZ";
    $("#machine-screen").classList.add("error");
    setTimeout(() => $("#machine-screen")?.classList.remove("error"), 600);
    showFeedback(
      `Die Maschine spuckt nur Dampf. ${wrong.length} Einstellung${wrong.length === 1 ? "" : "en"} stimmt noch nicht.`,
      "err"
    );
  });
}

/* --- Kapitel 7: Heckenlabyrinth --- */
function renderMazePuzzle(loc) {
  const puzzle = loc.puzzle;
  const grid = puzzle.grid;
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();

  const game = {
    pos: [...puzzle.start],
    goal: [...puzzle.goal],
    steps: 0
  };
  activeMaze = game;

  const key = (r, c) => `${r}:${c}`;
  visited.add(key(game.pos[0], game.pos[1]));

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="maze-wrap">
        <div class="maze-grid" id="maze-grid" style="grid-template-columns: repeat(${cols}, 1fr)"
             role="grid" aria-label="Heckenlabyrinth"></div>
        <div class="maze-side">
          <div class="dpad">
            <button type="button" data-move="up" aria-label="Nach oben">↑</button>
            <button type="button" data-move="left" aria-label="Nach links">←</button>
            <button type="button" data-move="down" aria-label="Nach unten">↓</button>
            <button type="button" data-move="right" aria-label="Nach rechts">→</button>
          </div>
          <div class="maze-meta">
            <span id="maze-steps">0 Schritte</span>
            <span class="maze-goal">Ziel: goldene Bohne</span>
          </div>
        </div>
      </div>

      <p class="puzzle-note">${esc(puzzle.note || "Die Hecken sind dicht. Nur freie Wege lassen dich durch.")}</p>
      <div class="puzzle-actions">
        <button class="btn btn-ghost btn-small" type="button" id="maze-reset">Neu beginnen</button>
      </div>
    </div>`;

  const drawGrid = () => {
    const container = $("#maze-grid");
    if (!container) return;

    let html = "";
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        const cell = grid[r][c];
        const isPos = game.pos[0] === r && game.pos[1] === c;
        const isGoal = game.goal[0] === r && game.goal[1] === c;
        const classes = ["maze-cell"];

        if (cell === "#") classes.push("hedge");
        else classes.push("free");
        if (visited.has(key(r, c))) classes.push("visited");
        if (isPos) classes.push("hero");
        if (isGoal) classes.push("goal");

        html += `
          <div class="${classes.join(" ")}" data-cell="${r}:${c}" role="gridcell"
               aria-label="${cell === "#" ? "Hecke" : "Weg"}${isGoal ? ", goldene Bohne" : ""}">
            ${isPos ? '<span class="maze-figure" aria-hidden="true">♞</span>' : ""}
            ${isGoal && !isPos ? '<span class="maze-bean" aria-hidden="true"></span>' : ""}
          </div>`;
      }
    }
    container.innerHTML = html;
    $("#maze-steps").textContent = `${game.steps} Schritt${game.steps === 1 ? "" : "e"}`;
  };

  const move = (dr, dc) => {
    if (activeMaze !== game) return;
    const [r, c] = game.pos;
    const nextR = r + dr;
    const nextC = c + dc;

    if (nextR < 0 || nextC < 0 || nextR >= rows || nextC >= cols) return;
    if (grid[nextR][nextC] === "#") {
      const gridEl = $("#maze-grid");
      gridEl?.classList.remove("bump");
      void gridEl?.offsetWidth;
      gridEl?.classList.add("bump");
      return;
    }

    game.pos = [nextR, nextC];
    game.steps += 1;
    visited.add(key(nextR, nextC));
    drawGrid();

    if (nextR === game.goal[0] && nextC === game.goal[1]) {
      activeMaze = null;
      tone(784, 0.3);
      tone(988, 0.4, 0.16);
      showFeedback(puzzle.success, "ok");
      solveChapter(loc);
    }
  };

  const directions = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1]
  };

  game.move = (direction) => {
    const delta = directions[direction];
    if (delta) move(delta[0], delta[1]);
  };

  document.querySelectorAll("[data-move]").forEach((button) => {
    button.addEventListener("click", () => game.move(button.dataset.move));
  });

  $("#maze-grid").addEventListener("click", (event) => {
    const cell = event.target.closest("[data-cell]");
    if (!cell) return;
    const [r, c] = cell.dataset.cell.split(":").map(Number);
    const [pr, pc] = game.pos;
    if (Math.abs(r - pr) + Math.abs(c - pc) === 1) {
      move(r - pr, c - pc);
    }
  });

  $("#maze-reset").addEventListener("click", () => {
    game.pos = [...puzzle.start];
    game.steps = 0;
    visited.clear();
    visited.add(key(game.pos[0], game.pos[1]));
    drawGrid();
  });
  drawGrid();
}

/* --- Kapitel 8: Sirenenmelodie --- */
function renderMelodyPuzzle(loc) {
  const puzzle = loc.puzzle;

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <div class="melody-stage">
        <div class="melody-pads">
          ${puzzle.pads
            .map(
              (pad, index) => `
                <button class="melody-pad ${pad.color}" type="button" data-pad="${index}">
                  <span class="melody-ripple" aria-hidden="true"></span>
                  <strong>${esc(pad.label)}</strong>
                </button>`
            )
            .join("")}
        </div>
        <p class="melody-status" id="melody-status">Drücke „Vorsingen“, dann spielst du nach.</p>
      </div>

      <p class="puzzle-note">${esc(puzzle.note || "Fünf Töne. Höre gut zu.")}</p>
      <div class="puzzle-actions">
        <button class="btn btn-primary" type="button" id="melody-play">Vorsingen</button>
        <button class="btn btn-ghost btn-small" type="button" id="melody-reset">Von vorn</button>
      </div>
    </div>`;

  const status = $("#melody-status");
  const game = { input: [], playing: false, timers: [] };
  activeMelody = game;

  const flash = (index, duration = 320) => {
    const pad = document.querySelector(`[data-pad="${index}"]`);
    if (!pad) return;
    pad.classList.add("lit");
    const timer = setTimeout(() => pad.classList.remove("lit"), duration);
    game.timers.push(timer);
  };

  const play = () => {
    if (game.playing || activeMelody !== game) return;
    game.playing = true;
    game.input = [];
    status.textContent = "Die Sirene singt ...";
    status.classList.remove("err");

    const gap = 560;
    puzzle.sequence.forEach((padIndex, step) => {
      const timer = setTimeout(() => {
        if (activeMelody !== game) return;
        flash(padIndex, 340);
        tone(puzzle.pads[padIndex].freq, 0.3);
      }, 420 + step * gap);
      game.timers.push(timer);
    });

    const done = setTimeout(() => {
      if (activeMelody !== game) return;
      game.playing = false;
      status.textContent = "Jetzt du! Spiele die fünf Töne nach.";
    }, 420 + puzzle.sequence.length * gap);
    game.timers.push(done);
  };

  const tap = (index) => {
    if (game.playing || activeMelody !== game) return;
    flash(index, 240);
    tone(puzzle.pads[index].freq, 0.26);

    game.input.push(index);
    const step = game.input.length - 1;
    if (puzzle.sequence[step] !== index) {
      game.input = [];
      status.textContent = "Ui, falscher Ton. Hör noch einmal zu.";
      status.classList.add("err");
      tone(160, 0.3, 0.1, "triangle");
      return;
    }

    if (game.input.length === puzzle.sequence.length) {
      activeMelody = null;
      status.textContent = "Genau so!";
      status.classList.remove("err");
      tone(784, 0.3, 0.2);
      tone(988, 0.5, 0.36);
      showFeedback(puzzle.success, "ok");
      solveChapter(loc);
      return;
    }

    status.textContent = `Ton ${game.input.length + 1} von ${puzzle.sequence.length} ...`;
  };

  document.querySelectorAll("[data-pad]").forEach((pad) => {
    pad.addEventListener("click", () => tap(Number(pad.dataset.pad)));
  });

  $("#melody-play").addEventListener("click", play);

  $("#melody-reset").addEventListener("click", () => {
    game.input = [];
    status.textContent = "Von vorn. Drücke „Vorsingen“.";
    status.classList.remove("err");
  });
}

/* --- Kapitel 9: Glockenreihenfolge --- */
function renderBellsPuzzle(loc) {
  const puzzle = loc.puzzle;
  let order = [];

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${esc(puzzle.title)}</h3>
      <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>

      <ul class="clue-list">
        ${puzzle.clues.map((clue) => `<li>${esc(clue)}</li>`).join("")}
      </ul>

      <div class="bell-stage">
        <div class="bell-row">
          ${puzzle.bells
            .map(
              (bell) => `
                <button class="bell" type="button" data-bell="${bell.id}" aria-pressed="false">
                  <span class="bell-icon" aria-hidden="true">
                    <svg viewBox="-16 -16 32 32"><use href="#icon-bell" x="-16" y="-16" width="32" height="32"></use></svg>
                  </span>
                  <strong>${esc(bell.name)}</strong>
                  <span class="bell-order"></span>
                </button>`
            )
            .join("")}
        </div>
        <p class="bell-status" id="bell-status">Noch keine Glocke geläutet.</p>
      </div>

      <p class="puzzle-note">${esc(puzzle.note || "Tippe die Glocken in der Reihenfolge an, in der sie läuten sollen.")}</p>
      <div class="puzzle-actions">
        <button class="btn btn-primary" type="button" id="bell-check">Läuten</button>
        <button class="btn btn-ghost btn-small" type="button" id="bell-reset">Zurücksetzen</button>
      </div>
    </div>`;

  const update = () => {
    document.querySelectorAll("[data-bell]").forEach((button) => {
      const id = button.dataset.bell;
      const index = order.indexOf(id);
      const bell = puzzle.bells.find((entry) => entry.id === id);

      button.classList.toggle("selected", index >= 0);
      button.setAttribute("aria-pressed", String(index >= 0));
      button.querySelector(".bell-order").textContent = index >= 0 ? String(index + 1) : "";
      button.disabled = false;
      if (bell) button.dataset.freq = String(bell.freq);
    });
    $("#bell-status").textContent = order.length
      ? `Reihenfolge: ${order.map((id) => puzzle.bells.find((b) => b.id === id).name).join(" → ")}`
      : "Noch keine Glocke geläutet.";
  };

  document.querySelectorAll("[data-bell]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.bell;
      if (order.includes(id)) {
        order = order.filter((entry) => entry !== id);
      } else {
        if (order.length >= puzzle.bells.length) return;
        order.push(id);
        const bell = puzzle.bells.find((entry) => entry.id === id);
        tone(bell.freq, 0.55, 0, "sine");
      }
      update();
    });
  });

  $("#bell-reset").addEventListener("click", () => {
    order = [];
    update();
  });

  $("#bell-check").addEventListener("click", () => {
    if (order.length !== puzzle.bells.length) {
      showFeedback("Es fehlen noch Glocken. Läute alle fünf.", "err");
      return;
    }

    const correct = puzzle.solution.every((id, index) => order[index] === id);
    if (!correct) {
      showFeedback("Die Glocken klingen schief. Die Reihenfolge stimmt noch nicht.", "err");
      document.querySelectorAll("[data-bell]").forEach((button) => {
        button.classList.add("wrong");
        setTimeout(() => button.classList.remove("wrong"), 500);
      });
      return;
    }

    puzzle.solution.forEach((id, index) => {
      const bell = puzzle.bells.find((entry) => entry.id === id);
      tone(bell.freq, 0.55, index * 0.34);
    });
    showFeedback(puzzle.success, "ok");
    setTimeout(() => solveChapter(loc), 900);
  });
  update();
}

/* ------------------------------------------------------------
   Kapitel 10: Wirtshauskeller (Kampf im Final-Fantasy-Stil)
   ------------------------------------------------------------ */
function battleRoll(range) {
  const [min, max] = range;
  return min + Math.floor(Math.random() * (max - min + 1));
}

function battleRatSprite(kind) {
  const boss = kind === "king";
  return `
    <svg viewBox="0 0 132 96" aria-hidden="true">
      ${boss ? '<path d="M38 44 C18 38 12 66 30 74 Z" fill="#9d3b32" opacity=".9"/>' : ""}
      <path d="M30 60 C6 60 8 84 28 79" fill="none" stroke="#8a6a4f" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="60" cy="60" rx="32" ry="21" fill="${boss ? "#7a5a3a" : "#8d7a67"}"/>
      <ellipse cx="49" cy="79" rx="11" ry="5" fill="#6f6152"/>
      <ellipse cx="75" cy="79" rx="11" ry="5" fill="#6f6152"/>
      <circle cx="89" cy="43" r="18" fill="${boss ? "#8a6a44" : "#978472"}"/>
      <circle cx="79" cy="27" r="9" fill="#b09a84"/>
      <circle cx="79" cy="27" r="5" fill="#d9a8a0"/>
      <path d="M102 43 l16 5 -15 7 z" fill="${boss ? "#8a6a44" : "#978472"}"/>
      <circle cx="96" cy="39" r="2.8" fill="#2b1e14"/>
      <circle cx="117" cy="48" r="2.2" fill="#3a2620"/>
      <path d="M105 54 q5 4 9-1" fill="none" stroke="#3a2620" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M108 56 l-2 6 M113 56 l1 6" stroke="#fff8e8" stroke-width="2.4" stroke-linecap="round"/>
      <g stroke="#d9c9a0" stroke-width="1.4" opacity=".8">
        <path d="M117 49 l11-4M117 51 l11 2M115 54 l8 6"/>
      </g>
      ${
        boss
          ? `<g>
              <path d="M76 18 l5 12 9-9 4 12 10-9 4 14 H73 Z" fill="#e0b64f" stroke="#8f6f1f" stroke-width="2"/>
              <circle cx="82" cy="27" r="2" fill="#9d3b32"/>
              <circle cx="91" cy="27" r="2" fill="#9d3b32"/>
              <circle cx="100" cy="27" r="2" fill="#9d3b32"/>
              <path d="M44 40 L24 20" stroke="#b08a5c" stroke-width="4" stroke-linecap="round"/>
              <ellipse cx="20" cy="16" rx="9" ry="6" transform="rotate(-32 20 16)" fill="#c9a227" stroke="#8f6f1f" stroke-width="1.5"/>
            </g>`
          : ""
      }
    </svg>`;
}

function battleKnightSprite() {
  return `
    <svg viewBox="0 0 116 146" aria-hidden="true">
      <ellipse cx="58" cy="137" rx="31" ry="6" fill="rgba(0,0,0,.38)"/>
      <path d="M38 50 C18 62 16 104 24 122 L44 116 Z" fill="#7a2a24"/>
      <rect x="40" y="94" width="13" height="34" rx="5" fill="#9aa3b2" stroke="#5d6572" stroke-width="2"/>
      <rect x="60" y="94" width="13" height="34" rx="5" fill="#9aa3b2" stroke="#5d6572" stroke-width="2"/>
      <rect x="35" y="122" width="22" height="9" rx="4" fill="#5a4632"/>
      <rect x="57" y="122" width="22" height="9" rx="4" fill="#5a4632"/>
      <path d="M36 54 Q58 43 80 54 L75 98 Q58 108 41 98 Z" fill="#c8d0dc" stroke="#6b7280" stroke-width="2.5"/>
      <path d="M43 60 Q58 52 73 60" fill="none" stroke="#f2f5fa" stroke-width="2.5" opacity=".8"/>
      <rect x="42" y="80" width="34" height="9" rx="3" fill="#8f6f1f"/>
      <circle cx="59" cy="84.5" r="3.4" fill="#f0d36b"/>
      <path d="M20 58 Q10 82 20 106 Q33 113 40 100 L40 62 Z" fill="#3f5f8a" stroke="#d9c9a0" stroke-width="3"/>
      <path d="M30 69 l4 9 10 1 -7 7 2 10 -9-5 -9 5 2-10 -7-7 10-1 Z" fill="#f0d36b" opacity=".95"/>
      <circle cx="58" cy="36" r="18" fill="#c8d0dc" stroke="#6b7280" stroke-width="2.5"/>
      <path d="M40 36 h36 v7 H40 Z" fill="#3a3f4a"/>
      <path d="M45 39 h9 v2.4 h-9 Z M62 39 h9 v2.4 h-9 Z" fill="#f0d36b"/>
      <path d="M58 19 C51 4 63 0 70 7 C62 9 65 15 61 19 Z" fill="#b23b32"/>
      <path d="M76 64 L91 52" stroke="#c8d0dc" stroke-width="10" stroke-linecap="round"/>
      <path d="M91 54 L104 22" stroke="#eef3fb" stroke-width="6" stroke-linecap="round"/>
      <path d="M86 53 L101 46" stroke="#8f6f1f" stroke-width="5" stroke-linecap="round"/>
      <path d="M104 22 l4-8" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".85"/>
    </svg>`;
}

function battleEnemyMarkup(enemy) {
  return `
    <div class="battle-enemy ${enemy.kind === "king" ? "boss" : ""}" data-enemy-id="${esc(enemy.id)}">
      <span class="battle-enemy-name">${esc(enemy.name)}</span>
      <div class="battle-enemy-sprite">${battleRatSprite(enemy.kind)}</div>
      <div class="battle-enemy-bar"><i></i></div>
    </div>`;
}

function battleMarkup(battle) {
  return `
    <div class="battle" id="battle">
      <div class="battle-scene">
        <div class="battle-props" aria-hidden="true">
          <span class="battle-barrel barrel-a"></span>
          <span class="battle-barrel barrel-b"></span>
          <span class="battle-lantern"></span>
          <span class="battle-straw straw-a"></span>
          <span class="battle-straw straw-b"></span>
          <span class="battle-dust d1"></span>
          <span class="battle-dust d2"></span>
          <span class="battle-dust d3"></span>
        </div>

        <div class="battle-field">
          <div class="battle-enemies">
            ${battle.enemies.map(battleEnemyMarkup).join("")}
          </div>
          <div class="battle-hero" id="battle-hero">
            <div class="battle-hero-sprite">${battleKnightSprite()}</div>
            <span class="battle-hero-tag">Du</span>
          </div>
        </div>

        <div class="battle-message" role="status" aria-live="polite">
          <span id="battle-log"></span>
        </div>

        <div class="battle-hud">
          <div class="battle-status">
            <div class="battle-status-head">
              <strong>${esc(battle.hero.name)}</strong>
              <span class="battle-potions">Tränke <b id="battle-potions">${battle.hero.potions}</b></span>
            </div>
            <div class="battle-stat">
              <span>HP</span>
              <div class="battle-bar"><i id="battle-hp-bar"></i></div>
              <b id="battle-hp">${battle.hero.hp} / ${battle.hero.maxHp}</b>
            </div>
            <div class="battle-stat">
              <span>MP</span>
              <div class="battle-bar mp"><i id="battle-mp-bar"></i></div>
              <b id="battle-mp">${battle.hero.mp} / ${battle.hero.maxMp}</b>
            </div>
          </div>
          <div class="battle-commands" id="battle-commands" aria-label="Kampfbefehle"></div>
        </div>

        <div id="battle-result" class="battle-result hidden"></div>
      </div>
    </div>`;
}

function renderBattlePuzzle(loc) {
  const puzzle = loc.puzzle;
  $("#puzzle-area").innerHTML = `
    <div class="battle-intro">
      <div class="battle-intro-art" aria-hidden="true">
        <span class="battle-intro-glow"></span>
        ${battleRatSprite("king")}
      </div>
      <div class="battle-intro-copy">
        <h3>${esc(puzzle.title)}</h3>
        <p class="puzzle-prompt">${esc(puzzle.prompt)}</p>
        <ul class="battle-rules">
          <li><strong>Angriff</strong> trifft einen Gegner deiner Wahl.</li>
          <li><strong>Zauber</strong> wirkt Funkenregen auf alle (6 MP).</li>
          <li><strong>Trank</strong> heilt 28 HP – du hast drei davon.</li>
          <li><strong>Fliehen</strong> bringt dich zurück die Treppe hinauf.</li>
        </ul>
        <div class="puzzle-actions">
          <button id="battle-descend" class="btn btn-primary" type="button">In den Keller steigen</button>
          <button id="battle-hint" class="btn btn-ghost btn-small" type="button">Hinweis</button>
        </div>
      </div>
    </div>`;

  $("#battle-descend").addEventListener("click", () => startBattle(loc));
  $("#battle-hint").addEventListener("click", () => showFeedback(puzzle.hint, "hint"));
}

function startBattle(loc) {
  stopBattle();

  const config = loc.puzzle;
  const battle = {
    loc,
    hero: {
      name: config.hero.name,
      hp: config.hero.maxHp,
      maxHp: config.hero.maxHp,
      mp: config.hero.maxMp,
      maxMp: config.hero.maxMp,
      potions: config.hero.potions,
      attack: config.hero.attack,
      spellCost: config.hero.spellCost,
      spell: config.hero.spell,
      potionHeal: config.hero.potionHeal
    },
    enemies: config.enemies.map((enemy) => ({ ...enemy, maxHp: enemy.hp })),
    busy: false,
    over: false,
    phase: "command",
    timers: []
  };

  activeBattle = battle;
  $("#puzzle-area").innerHTML = battleMarkup(battle);
  bindBattleEvents(battle);
  renderBattleState();
  battleLog("Die Ratten haben dich entdeckt! Was tust du?");
  renderBattleCommands(battle);
  tone(196, 0.18, 0, "triangle");
  tone(147, 0.32, 0.18, "triangle");
  requestAnimationFrame(() => {
    $("#puzzle-area")?.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

function bindBattleEvents(battle) {
  const commands = $("#battle-commands");
  commands?.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || battle.busy || battle.over || activeBattle !== battle) return;

    if (button.dataset.target) {
      battleAttack(battle, button.dataset.target);
      return;
    }

    switch (button.dataset.action) {
      case "attack":
        renderBattleTargets(battle);
        break;
      case "spell":
        battleSpell(battle);
        break;
      case "potion":
        battlePotion(battle);
        break;
      case "flee":
        battleFlee(battle);
        break;
      case "back":
        renderBattleCommands(battle);
        break;
      default:
        break;
    }
  });

  $("#battle-result")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-result]");
    if (!button || activeBattle !== battle) return;

    if (button.dataset.result === "retry") {
      startBattle(battle.loc);
      return;
    }

    if (button.dataset.result === "close") {
      closeModal("chapter");
      return;
    }

    if (button.dataset.result === "continue") {
      const loc = battle.loc;
      activeBattle = null;
      solveChapter(loc);
    }
  });
}

function renderBattleCommands(battle) {
  const container = $("#battle-commands");
  if (!container) return;

  const busy = battle.busy || battle.over;
  container.innerHTML = `
    <button class="battle-command" type="button" data-action="attack" ${busy ? "disabled" : ""}>
      <span class="battle-command-icon">${itemIcon("sword")}</span><span>Angriff</span>
    </button>
    <button class="battle-command" type="button" data-action="spell" ${busy ? "disabled" : ""}>
      <span class="battle-command-icon">${itemIcon("spark")}</span><span>Zauber</span><small>6 MP</small>
    </button>
    <button class="battle-command" type="button" data-action="potion" ${busy ? "disabled" : ""}>
      <span class="battle-command-icon">${itemIcon("flask")}</span><span>Trank</span><small>${battle.hero.potions} übrig</small>
    </button>
    <button class="battle-command" type="button" data-action="flee" ${busy ? "disabled" : ""}>
      <span class="battle-command-icon">${itemIcon("boot")}</span><span>Fliehen</span>
    </button>`;

  battle.phase = "command";
}

function renderBattleTargets(battle) {
  const container = $("#battle-commands");
  if (!container) return;

  const alive = battle.enemies.filter((enemy) => enemy.hp > 0);
  container.innerHTML = `
    <p class="battle-command-title">Wen angreifen?</p>
    <div class="battle-targets">
      ${alive
        .map(
          (enemy) => `
            <button class="battle-target" type="button" data-target="${esc(enemy.id)}">
              <span>${esc(enemy.name)}</span>
              <small>${enemy.hp} / ${enemy.maxHp} HP</small>
            </button>`
        )
        .join("")}
    </div>
    <button class="battle-command battle-back" type="button" data-action="back">
      <span>Zurück</span>
    </button>`;

  battle.phase = "target";
}

function setBattleBusy(battle) {
  battle.busy = true;
  battle.phase = "busy";
  const container = $("#battle-commands");
  if (!container) return;
  container.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
}

function battleLog(text) {
  const log = $("#battle-log");
  if (log) log.textContent = text;
}

function battleWait(battle, ms) {
  return new Promise((resolve) => {
    if (activeBattle !== battle || battle.over) {
      resolve(false);
      return;
    }

    const entry = { timer: null, resolve };
    entry.timer = setTimeout(() => {
      battle.timers = battle.timers.filter((item) => item !== entry);
      resolve(activeBattle === battle && !battle.over);
    }, ms);
    battle.timers.push(entry);
  });
}

function battleActive(battle) {
  return activeBattle === battle && !battle.over;
}

function battleShowDamage(target, amount, options = {}) {
  if (!target) return;
  const pop = document.createElement("span");
  pop.className = `battle-damage${options.crit ? " crit" : ""}${options.heal ? " heal" : ""}`;
  pop.textContent = `${options.heal ? "+" : ""}${amount}`;
  target.appendChild(pop);
  setTimeout(() => pop.remove(), 1000);
}

function battleShake(target) {
  if (!target) return;
  target.classList.add("hit");
  setTimeout(() => target.classList.remove("hit"), 380);
}

function battleEnemyElement(enemy) {
  return document.querySelector(`[data-enemy-id="${enemy.id}"]`);
}

function renderBattleState() {
  const battle = activeBattle;
  if (!battle) return;

  const hpBar = $("#battle-hp-bar");
  const mpBar = $("#battle-mp-bar");
  if (hpBar) hpBar.style.width = `${Math.max(0, (battle.hero.hp / battle.hero.maxHp) * 100)}%`;
  if (mpBar) mpBar.style.width = `${Math.max(0, (battle.hero.mp / battle.hero.maxMp) * 100)}%`;
  if ($("#battle-hp")) $("#battle-hp").textContent = `${battle.hero.hp} / ${battle.hero.maxHp}`;
  if ($("#battle-mp")) $("#battle-mp").textContent = `${battle.hero.mp} / ${battle.hero.maxMp}`;
  if ($("#battle-potions")) $("#battle-potions").textContent = battle.hero.potions;

  battle.enemies.forEach((enemy) => {
    const element = battleEnemyElement(enemy);
    if (!element) return;
    const bar = element.querySelector(".battle-enemy-bar i");
    if (bar) bar.style.width = `${Math.max(0, (enemy.hp / enemy.maxHp) * 100)}%`;
    element.classList.toggle("defeated", enemy.hp <= 0);
  });

  const hero = $("#battle-hero");
  hero?.classList.toggle("low", battle.hero.hp <= battle.hero.maxHp * 0.25);
}

function battleStartTurn(battle) {
  if (!battleActive(battle)) return;
  battle.busy = false;
  battle.phase = "command";
  battleLog("Die Ratten quietschen. Was tust du?");
  renderBattleCommands(battle);
}

async function battleAttack(battle, enemyId) {
  if (!battleActive(battle) || battle.busy) return;

  const enemy = battle.enemies.find((entry) => entry.id === enemyId && entry.hp > 0);
  if (!enemy) {
    renderBattleTargets(battle);
    return;
  }

  setBattleBusy(battle);
  const crit = Math.random() < 0.14;
  let damage = battleRoll(battle.hero.attack);
  if (crit) damage = Math.round(damage * 1.6);
  enemy.hp = Math.max(0, enemy.hp - damage);

  const element = battleEnemyElement(enemy);
  battleShake(element);
  battleShowDamage(element, damage, { crit });
  battleLog(
    `Du triffst ${enemy.name} mit dem Schwert – ${damage} Schaden${crit ? "! Volltreffer!" : "."}`
  );
  tone(crit ? 760 : 420, 0.1, 0, "square");
  tone(210, 0.16, 0.05, "triangle");
  renderBattleState();

  await battleWait(battle, 480);
  if (!battleActive(battle)) return;

  if (enemy.hp === 0) {
    battleLog(`${enemy.name} quiekt und verschwindet im Dunkeln.`);
    tone(180, 0.22, 0, "sawtooth");
    await battleWait(battle, 380);
    if (!battleActive(battle)) return;
  }

  if (battle.enemies.every((entry) => entry.hp === 0)) {
    battleVictory(battle);
    return;
  }

  await battleEnemyTurn(battle);
}

async function battleSpell(battle) {
  if (!battleActive(battle) || battle.busy) return;

  if (battle.hero.mp < battle.hero.spellCost) {
    battleLog("Zu wenig MP für den Funkenzauber! Nimm lieber dein Schwert.");
    tone(130, 0.2, 0, "sawtooth");
    return;
  }

  battle.hero.mp -= battle.hero.spellCost;
  setBattleBusy(battle);
  battleLog("Funkenregen! Goldene Funken tanzen durch den ganzen Keller.");
  tone(660, 0.14, 0, "square");
  tone(880, 0.14, 0.1, "square");
  tone(1040, 0.24, 0.2, "square");

  battle.enemies
    .filter((enemy) => enemy.hp > 0)
    .forEach((enemy) => {
      const damage = battleRoll(battle.hero.spell);
      enemy.hp = Math.max(0, enemy.hp - damage);
      const element = battleEnemyElement(enemy);
      battleShake(element);
      battleShowDamage(element, damage);
    });

  renderBattleState();
  await battleWait(battle, 760);
  if (!battleActive(battle)) return;

  if (battle.enemies.every((entry) => entry.hp === 0)) {
    battleVictory(battle);
    return;
  }

  battleLog("Die Funken versprühen. Die Ratten schütteln sich.");
  await battleWait(battle, 380);
  if (!battleActive(battle)) return;
  await battleEnemyTurn(battle);
}

async function battlePotion(battle) {
  if (!battleActive(battle) || battle.busy) return;

  if (battle.hero.potions <= 0) {
    battleLog("Dein Trankbeutel ist leer. Jetzt hilft nur noch das Schwert!");
    tone(130, 0.2, 0, "sawtooth");
    return;
  }

  if (battle.hero.hp >= battle.hero.maxHp) {
    battleLog("Du fühlst dich noch fit. Spar dir den Trank für später.");
    return;
  }

  battle.hero.potions -= 1;
  const heal = Math.min(battle.hero.potionHeal, battle.hero.maxHp - battle.hero.hp);
  battle.hero.hp += heal;
  setBattleBusy(battle);
  battleLog(`Du trinkst einen warmen Kräutertrank. +${heal} HP.`);
  tone(440, 0.16, 0, "sine");
  tone(660, 0.2, 0.12, "sine");
  const hero = $("#battle-hero");
  battleShowDamage(hero, heal, { heal: true });
  renderBattleState();

  await battleWait(battle, 620);
  if (!battleActive(battle)) return;
  await battleEnemyTurn(battle);
}

async function battleFlee(battle) {
  if (!battleActive(battle) || battle.busy) return;

  setBattleBusy(battle);
  battleLog("Du nimmst die Beine in die Hand und stürmst die Kellertreppe hinauf.");
  tone(300, 0.12, 0, "triangle");
  tone(220, 0.12, 0.12, "triangle");
  tone(150, 0.2, 0.24, "triangle");

  await battleWait(battle, 720);
  if (!battleActive(battle)) return;

  battle.over = true;
  battle.busy = true;
  battleLog("Oben angekommen, klopft dein Herz. Die Ratten kichern im Dunkeln.");
  showBattleResult(
    battle,
    "flee",
    "Entwischt!",
    "Der Honig wartet noch unten. Willst du es noch einmal versuchen?",
    [
      { label: "Nochmal hinabsteigen", action: "retry", primary: true },
      { label: "Zurück zur Karte", action: "close" }
    ]
  );
}

async function battleEnemyTurn(battle) {
  for (let index = 0; index < battle.enemies.length; index += 1) {
    const enemy = battle.enemies[index];
    if (!battleActive(battle)) return;
    if (enemy.hp <= 0) continue;

    await battleWait(battle, 340);
    if (!battleActive(battle)) return;

    const crit = Math.random() < 0.1;
    let damage = battleRoll(enemy.damage);
    if (crit) damage = Math.round(damage * 1.5);
    battle.hero.hp = Math.max(0, battle.hero.hp - damage);

    const action = enemy.kind === "king" ? "schwingt seinen Löffel" : "beißt zu";
    battleLog(
      `${enemy.name} ${action} – ${damage} Schaden${crit ? "! Autsch!" : "."}`
    );
    tone(150, 0.18, 0, "sawtooth");
    const hero = $("#battle-hero");
    battleShake(hero);
    battleShowDamage(hero, damage, { crit });
    renderBattleState();

    if (battle.hero.hp <= 0) {
      await battleWait(battle, 420);
      if (!battleActive(battle)) return;
      battleDefeat(battle);
      return;
    }

    await battleWait(battle, 460);
  }

  if (!battleActive(battle)) return;
  battleStartTurn(battle);
}

function battleVictory(battle) {
  if (!battleActive(battle)) return;
  battle.over = true;
  battle.busy = true;
  battle.phase = "over";
  battleLog("Sieg! Die Ratten sind vertrieben, der Keller gehört wieder Rosalinde.");
  document.querySelector(".battle")?.classList.add("battle-won");
  [523, 659, 784, 1047].forEach((frequency, index) => {
    tone(frequency, 0.24, index * 0.15, "square");
  });
  showBattleResult(
    battle,
    "victory",
    "Sieg!",
    "Der Rattenkönig lässt den Löffel fallen und verschwindet durch ein Mauseloch. Auf dem Fass steht das Glas Kaffeeblütenhonig.",
    [{ label: "Honig nehmen", action: "continue", primary: true }]
  );
  renderBattleState();
}

function battleDefeat(battle) {
  if (activeBattle !== battle) return;
  battle.over = true;
  battle.busy = true;
  battle.phase = "over";
  battleLog("Du sinkst auf die Knie. Die Ratten tanzen um dich herum ...");
  document.querySelector(".battle")?.classList.add("battle-lost");
  tone(220, 0.25, 0, "sawtooth");
  tone(165, 0.28, 0.2, "sawtooth");
  tone(110, 0.4, 0.42, "sawtooth");
  showBattleResult(
    battle,
    "defeat",
    "Besiegt ...",
    "Die Ratten haben dich in die Ecke gedrängt. Aber ein Ritter gibt nicht auf!",
    [
      { label: "Nochmal versuchen", action: "retry", primary: true },
      { label: "Zurück zur Karte", action: "close" }
    ]
  );
  renderBattleState();
}

function showBattleResult(battle, kind, title, text, actions) {
  const result = $("#battle-result");
  if (!result) return;

  result.className = `battle-result ${kind}`;
  result.innerHTML = `
    <div class="battle-result-card">
      <p class="battle-result-kicker">${kind === "victory" ? "★ ★ ★" : "Kampf"}</p>
      <h3>${esc(title)}</h3>
      <p>${esc(text)}</p>
      <div class="battle-result-actions">
        ${actions
          .map(
            (action) => `
              <button class="btn ${action.primary ? "btn-primary" : "btn-ghost"} btn-small"
                      type="button" data-result="${action.action}">
                ${esc(action.label)}
              </button>`
          )
          .join("")}
      </div>
    </div>`;

  requestAnimationFrame(() => {
    result.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

function stopBattle() {
  if (!activeBattle) return;

  const battle = activeBattle;
  battle.timers.forEach((entry) => {
    clearTimeout(entry.timer);
    entry.resolve(false);
  });
  battle.timers = [];
  activeBattle = null;
}

/* ------------------------------------------------------------
   Antworten prüfen
   ------------------------------------------------------------ */
function normalizeAnswer(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[.,;:!?'"`´]/g, "")
    .replace(/\s+/g, " ");
}

function checkTextAnswer(loc, value, numeric) {
  const input = $("#puzzle-answer");
  const puzzle = loc.puzzle;
  const given = normalizeAnswer(value);
  const expected = normalizeAnswer(puzzle.answer);

  if (!given) {
    showFeedback("Bitte gib zuerst eine Antwort ein.", "err");
    input?.focus();
    return;
  }

  let matches = given === expected;

  if (numeric) {
    const givenNumber = Number(given.replace(",", "."));
    const expectedNumber = Number(expected.replace(",", "."));
    matches =
      matches ||
      (Number.isFinite(givenNumber) &&
        Number.isFinite(expectedNumber) &&
        givenNumber === expectedNumber);
  }

  if (matches) {
    solveChapter(loc);
    return;
  }

  if (input) {
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    input.focus();
    input.select();
  }

  showFeedback(
    numeric
      ? "Das ist noch nicht die richtige Zahl. Rechne noch einmal nach."
      : "Das ist noch nicht das richtige Wort. Schau dir die Zeichen genau an.",
    "err"
  );
}

function showFeedback(text, type) {
  const feedback = $("#chapter-feedback");
  if (!feedback || !text) return;
  feedback.className = `feedback ${type}`;
  feedback.textContent = text;
}

/* ------------------------------------------------------------
   Kapitel lösen
   ------------------------------------------------------------ */
function solveChapter(loc) {
  const firstSolve = !state.solved.includes(loc.id);
  let gainedDigit = null;

  if (firstSolve) {
    state.solved.push(loc.id);

    const rewardItem = loc.reward?.item;
    if (rewardItem && !state.inventory.includes(rewardItem)) {
      state.inventory.push(rewardItem);
    }

    if (loc.coordSlot != null && state.digits[loc.coordSlot] == null) {
      state.digits[loc.coordSlot] = GAME.final.digits[loc.coordSlot];
      gainedDigit = state.digits[loc.coordSlot];
    }

    saveState();
    updateMapState(state);
    renderQuest();
    renderInventory();
    renderProgress();
    renderHint();
    renderDigits();
  }

  showFeedback(loc.puzzle.success, "ok");

  const item = loc.reward?.item ? GAME.items[loc.reward.item] : null;
  const unlocked = GAME.locations.filter(
    (entry) =>
      (entry.requires || []).includes(loc.id) &&
      locationUnlocked(entry, state) &&
      !state.solved.includes(entry.id) &&
      !entry.isFinal
  );
  const finalReady = allPuzzlesSolved();

  const nextButton = finalReady
    ? '<button class="btn btn-primary" type="button" id="reward-final">Zum Drachennest</button>'
    : '<button class="btn btn-primary" type="button" id="reward-back">Zurück zur Karte</button>';

  $("#puzzle-area").innerHTML = `
    <div class="reward-card">
      <div class="reward-icon">${item ? itemIcon(item.icon) : itemIcon("scroll")}</div>
      <h3>${esc(loc.reward?.title || "Geschafft!")}</h3>
      <p>${esc(loc.reward?.text || loc.puzzle.success)}</p>
      ${
        loc.reward?.digitText
          ? `<p class="digit-note">${esc(loc.reward.digitText)}${
              gainedDigit ? ` <strong>Gefundene Ziffer: ${esc(gainedDigit)}</strong>` : ""
            }</p>`
          : ""
      }
      <div class="reward-actions">${nextButton}</div>
    </div>`;

  $("#reward-back")?.addEventListener("click", () => {
    closeModal("chapter");
  });

  $("#reward-final")?.addEventListener("click", () => {
    closeModal("chapter");
    openFinal();
  });

  if (unlocked.length) {
    const names = unlocked.map((entry) => entry.name).join(", ");
    showToast(`Neu freigeschaltet: ${names}`, "ok");
  } else if (finalReady) {
    showToast("Alle Zutaten beisammen! Auf zum Drachennest.", "ok");
  }
}

function showSolved(loc) {
  state.currentLocation = loc.id;
  saveState();
  updateMapState(state);

  setChapterShell(loc, "Bereits geschafft");

  const item = loc.reward?.item ? GAME.items[loc.reward.item] : null;
  const digit =
    loc.coordSlot != null && state.digits[loc.coordSlot] != null
      ? state.digits[loc.coordSlot]
      : null;

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>Hier ist schon alles gebraut</h3>
      <p class="puzzle-prompt">Dieses Kapitel hast du bereits geschafft.</p>
      ${
        item
          ? `<p class="puzzle-note"><strong>${esc(item.name)}:</strong> ${esc(item.desc)}</p>`
          : ""
      }
      ${
        digit
          ? `<p class="puzzle-note"><strong>Kaffeesatz-Ziffer:</strong> ${esc(digit)}</p>`
          : ""
      }
      <div class="puzzle-actions">
        <button class="btn btn-primary" type="button" data-close-inline>Zurück zur Karte</button>
      </div>
    </div>`;

  bindInlineClose();
  openModalEl($("#chapter-modal"));
}

function openPreview(loc, locked) {
  if (locationUnlocked(loc, state)) {
    state.currentLocation = loc.id;
    saveState();
    updateMapState(state);
  }

  setChapterShell(loc, locked ? "Vorschau – noch verschlossen" : "Vorschau");

  const missing = (loc.requires || [])
    .filter((id) => !state.solved.includes(id))
    .map((id) => getLocation(id)?.name || id)
    .join(", ");

  $("#puzzle-area").innerHTML = `
    <div class="puzzle-card">
      <h3>${locked ? "Dieser Ort schläft noch" : "Hier wartet das Finale"}</h3>
      <p class="puzzle-prompt">
        ${
          locked
            ? `Zuerst musst du ${esc(missing || "die vorherigen Kapitel")} abschließen.`
            : "Sammle alle zehn Zutaten, dann kannst du mit Frido den Zauberkaffee brauen."
        }
      </p>
      <p class="puzzle-note"><strong>Frido wartet auf:</strong> ${esc(
        GAME.final.ingredients
          .map((id) => GAME.items[id].name)
          .join(", ")
      )}</p>
      <div class="puzzle-actions">
        <button class="btn btn-primary" type="button" data-close-inline>Zurück zur Karte</button>
      </div>
    </div>`;

  bindInlineClose();
  openModalEl($("#chapter-modal"));
}

function bindInlineClose() {
  document.querySelectorAll("[data-close-inline]").forEach((button) => {
    button.addEventListener("click", () => closeModal("chapter"));
  });
}

/* ------------------------------------------------------------
   Questbuch
   ------------------------------------------------------------ */
function openQuestbook() {
  renderQuestbook();
  openModalEl($("#questbook-modal"));
}

function renderQuestbook() {
  const list = $("#questbook-list");

  list.innerHTML = GAME.locations
    .map((loc) => {
      const solved = state.solved.includes(loc.id);
      const unlocked = locationUnlocked(loc, state);
      const isFinal = Boolean(loc.isFinal);
      const finalReady = isFinal && allPuzzlesSolved();

      let status = "Verschlossen";
      let className = "locked";

      if (solved) {
        status = "Geschafft";
        className = "solved";
      } else if (finalReady) {
        status = "Finale";
        className = "available";
      } else if (unlocked) {
        status = loc.isFinal ? "Finale" : "Offen";
        className = "available";
      }

      const number = isFinal ? "★" : String(loc.chapter);
      const digit =
        loc.coordSlot != null ? ` · Kaffeesatz ${state.digits[loc.coordSlot] ?? "?"}` : "";

      return `
        <button class="quest-entry ${className}" type="button" data-quest-id="${esc(loc.id)}">
          <span class="num">${number}</span>
          <span>
            <strong>${esc(loc.name)}</strong>
            <span>${esc(loc.short)} – ${esc(loc.teaser)}${esc(digit)}</span>
          </span>
          <span class="status">${status}</span>
        </button>`;
    })
    .join("") +
    `
      <div class="questbook-foot">
        <p class="panel-kicker">Kaffeesatz-Koordinaten</p>
        <div class="digit-strip" data-digit-strip></div>
        <p class="small-note">${
          GAME.final.placeholder
            ? "Platzhalter – die echten Ziffern werden noch eingesetzt."
            : "Die Ziffern sind vollständig."
        }</p>
      </div>`;

  renderDigits();
}

function handleQuestbookClick(event) {
  const button = event.target.closest("[data-quest-id]");
  if (!button) return;

  const loc = getLocation(button.dataset.questId);
  if (!loc) return;

  closeAllModals(false);

  if (loc.isFinal) {
    if (allPuzzlesSolved()) openFinal();
    else openPreview(loc, true);
    return;
  }

  if (state.solved.includes(loc.id)) {
    showSolved(loc);
    return;
  }

  if (locationUnlocked(loc, state)) {
    openChapter(loc);
    return;
  }

  openPreview(loc, true);
}

/* ------------------------------------------------------------
   Finale
   ------------------------------------------------------------ */
function openFinal(force = false) {
  if (!force && !allPuzzlesSolved()) {
    showToast(
      "Noch fehlen Zutaten. Erst wenn alle zehn Kapitel geschafft sind, öffnet sich das Drachennest.",
      "err"
    );
    return;
  }

  stopActivePuzzles();
  stopFinalBrew();

  state.currentLocation = "drachennest";
  saveState();
  updateMapState(state);

  $("#final-title").textContent = state.brewed
    ? GAME.final.title
    : GAME.final.brewTitle || GAME.final.title;
  $("#final-text").textContent = GAME.final.text;
  $("#final-coords").textContent = coordinateString();
  $("#final-badge").classList.toggle("hidden", !GAME.final.placeholder);
  $("#final-note").textContent = GAME.final.placeholder
    ? "Platzhalter: Die echten Finalkoordinaten werden später in js/data.js eingesetzt."
    : "Notiere dir die Koordinaten gut – sie führen dich zum Cache.";

  $("#final-card").classList.remove("brewing", "brewed");
  $("#final-brew").classList.remove("hidden");
  $("#final-result").classList.add("hidden");
  $("#btn-brew").disabled = false;
  $("#btn-brew").textContent = "Zauberkaffee brauen";
  $("#brew-status").textContent =
    "Frido hält die letzte Sternenbohne bereit. Gib alle zehn Zutaten in den Kessel.";

  brewSet = new Set();
  renderBrewIngredients();
  renderDigits();

  if (state.brewed) {
    $("#final-card").classList.add("brewed");
    $("#final-brew").classList.add("hidden");
    $("#final-result").classList.remove("hidden");
  }

  openModalEl($("#final-modal"));
}

function renderBrewIngredients() {
  const container = $("#brew-ingredients");
  if (!container) return;

  const signature = GAME.final.ingredients.join(",");
  if (container.dataset.signature !== signature) {
    container.dataset.signature = signature;
    container.innerHTML = GAME.final.ingredients
      .map((id) => {
        const item = GAME.items[id];
        return `
          <button class="brew-chip" type="button" data-brew="${esc(id)}" aria-pressed="false">
            <span class="brew-chip-icon">${itemIcon(item.icon)}</span>
            <span>${esc(item.name)}</span>
          </button>`;
      })
      .join("");
  }

  container.querySelectorAll("[data-brew]").forEach((button) => {
    const added = brewSet.has(button.dataset.brew);
    button.classList.toggle("added", added);
    button.setAttribute("aria-pressed", String(added));
  });

  const count = $("#brew-count");
  if (count) count.textContent = `${brewSet.size} / ${GAME.final.ingredients.length}`;
}

function toggleBrewIngredient(id) {
  if (!GAME.final.ingredients.includes(id)) return;
  if (brewSet.has(id)) brewSet.delete(id);
  else brewSet.add(id);

  tone(brewSet.has(id) ? 440 + brewSet.size * 28 : 260, 0.12);
  renderBrewIngredients();

  const count = $("#brew-count");
  if (count) count.classList.toggle("full", brewSet.size === GAME.final.ingredients.length);

  if (brewSet.size === GAME.final.ingredients.length) {
    $("#brew-status").textContent = "Alle zehn Zutaten sind im Kessel. Jetzt brauen!";
  } else {
    $("#brew-status").textContent = `Noch ${GAME.final.ingredients.length - brewSet.size} Zutat${
      GAME.final.ingredients.length - brewSet.size === 1 ? "" : "en"
    } fehlen.`;
  }
}

function startBrew() {
  const missing = GAME.final.ingredients.filter((id) => !brewSet.has(id));

  if (missing.length) {
    $("#brew-status").textContent = `Es fehlen noch: ${missing
      .map((id) => GAME.items[id].name)
      .join(", ")}.`;
    showToast("Der Kessel braucht alle zehn Zutaten.", "err");
    return;
  }

  completeBrew(false);
}

function completeBrew(instant = false) {
  const reveal = () => {
    stopFinalBrew();
    $("#final-card").classList.add("brewed");
    $("#final-brew").classList.add("hidden");
    $("#final-result").classList.remove("hidden");
    $("#final-title").textContent = GAME.final.title;
    $("#final-coords").textContent = coordinateString();
    $("#final-badge").classList.toggle("hidden", !GAME.final.placeholder);
    renderDigits();

    state.brewed = true;
    saveState();

    if (!instant) {
      tone(523, 0.3, 0);
      tone(659, 0.3, 0.18);
      tone(784, 0.3, 0.36);
      tone(1046, 0.7, 0.54);
    }

    const card = $("#final-modal .modal-card");
    if (card) card.scrollTop = 0;
  };

  if (instant) {
    reveal();
    return;
  }

  $("#final-card").classList.add("brewing");
  $("#btn-brew").disabled = true;
  $("#btn-brew").textContent = "Es brodelt ...";
  $("#brew-status").textContent =
    "Der Kessel brodelt. Es riecht nach Sternenstaub, Karamell und ein bisschen nach Abenteuer.";
  finalBrewTimer = setTimeout(reveal, 2400);
}

function stopFinalBrew() {
  if (finalBrewTimer) {
    clearTimeout(finalBrewTimer);
    finalBrewTimer = null;
  }
}

function copyCoordinates() {
  const text = coordinateString().replace(/\s+/g, " ").trim();

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => showToast("Koordinaten kopiert.", "ok"))
      .catch(() => fallbackCopy(text));
    return;
  }

  fallbackCopy(text);
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    showToast("Koordinaten kopiert.", "ok");
  } catch (error) {
    showToast("Kopieren war leider nicht möglich.", "err");
  }

  textarea.remove();
}

/* ------------------------------------------------------------
   Modals
   ------------------------------------------------------------ */
function openModalEl(element, focusSelector = ".modal-close") {
  const previousFocus = document.activeElement;
  closeAllModals(false);
  lastFocus = previousFocus;

  element.classList.remove("hidden");
  document.body.classList.add("modal-open");

  setTimeout(() => {
    const target = element.querySelector(focusSelector) || element.querySelector(".modal-close");
    target?.focus();
  }, 60);
}

function closeAllModals(restoreFocus = true) {
  document.querySelectorAll(".modal").forEach((modal) => modal.classList.add("hidden"));
  document.body.classList.remove("modal-open");

  if (restoreFocus) {
    const focusTarget =
      lastFocus && document.contains(lastFocus) && lastFocus.offsetParent !== null
        ? lastFocus
        : null;
    if (focusTarget) focusTarget.focus();
    else focusMap();
  }
}

function closeModal(name) {
  const element = document.getElementById(`${name}-modal`);
  if (element) closeModalEl(element);
}

function closeModalEl(element) {
  element.classList.add("hidden");

  if (element.id === "chapter-modal") stopActivePuzzles();
  if (element.id === "final-modal") stopFinalBrew();

  const anyOpen = [...document.querySelectorAll(".modal:not(.hidden)")].length > 0;
  if (!anyOpen) document.body.classList.remove("modal-open");

  const focusTarget =
    lastFocus && document.contains(lastFocus) && lastFocus.offsetParent !== null
      ? lastFocus
      : null;
  if (focusTarget) focusTarget.focus();
  else focusMap();
}

function focusMap() {
  const current = document.querySelector(`.loc[data-id="${state.currentLocation}"]`);
  if (current && current.focus) current.focus();
}

/* ------------------------------------------------------------
   Aufräumen der Mini-Spiele
   ------------------------------------------------------------ */
function stopActivePuzzles() {
  stopBattle();

  if (activeTiming) {
    cancelAnimationFrame(activeTiming.raf);
    activeTiming = null;
  }

  if (activeMelody) {
    activeMelody.timers.forEach((timer) => clearTimeout(timer));
    activeMelody = null;
  }

  activeMaze = null;

  if (activeNonogram) {
    window.removeEventListener("pointerup", activeNonogram.stopPaint);
    window.removeEventListener("pointercancel", activeNonogram.stopPaint);
    activeNonogram = null;
  }

  if (activeCrossword) {
    activeCrossword.teardown();
    activeCrossword = null;
  }
}

/* ------------------------------------------------------------
   Reset
   ------------------------------------------------------------ */
function openReset() {
  openModalEl($("#reset-modal"));
}

function confirmReset() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Spielstand konnte nicht gelöscht werden:", error);
  }

  stopActivePuzzles();
  stopFinalBrew();
  state = defaultState();
  closeAllModals(false);
  showIntro();
  showToast("Alles gelöscht. Ein frischer Anfang!", "ok");
}

/* ------------------------------------------------------------
   Toast
   ------------------------------------------------------------ */
function showToast(message, type = "") {
  const toast = $("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast ${type}`.trim();
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.add("hidden");
  }, 3800);
}

/* ------------------------------------------------------------
   Events
   ------------------------------------------------------------ */
function bindEvents() {
  $("#intro-next").addEventListener("click", nextIntroScene);
  $("#intro-skip").addEventListener("click", finishIntro);

  $("#btn-questbook").addEventListener("click", openQuestbook);
  $("#btn-replay-intro").addEventListener("click", () => {
    closeAllModals(false);
    showIntro();
  });
  $("#btn-reset").addEventListener("click", openReset);

  $("#btn-hint").addEventListener("click", toggleSidebarHint);
  $("#btn-copy-coords").addEventListener("click", copyCoordinates);
  $("#btn-brew").addEventListener("click", startBrew);

  $("#brew-ingredients").addEventListener("click", (event) => {
    const button = event.target.closest("[data-brew]");
    if (!button) return;
    toggleBrewIngredient(button.dataset.brew);
  });

  $("#map").addEventListener("click", (event) => {
    const locElement = event.target.closest(".loc");
    if (!locElement) return;
    handleLocationClick(locElement.dataset.id);
  });

  $("#map").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const locElement = event.target.closest(".loc");
    if (!locElement) return;
    event.preventDefault();
    handleLocationClick(locElement.dataset.id);
  });

  $("#questbook-list").addEventListener("click", handleQuestbookClick);

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModalEl(modal);
    });
  });

  $("#btn-reset-cancel").addEventListener("click", () => closeModal("reset"));
  $("#btn-reset-confirm").addEventListener("click", confirmReset);

  document.addEventListener("keydown", (event) => {
    if (activeMaze && !$("#chapter-modal").classList.contains("hidden")) {
      const moves = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
        w: "up",
        s: "down",
        a: "left",
        d: "right"
      };
      const direction = moves[event.key];
      if (direction) {
        event.preventDefault();
        activeMaze.move(direction);
        return;
      }
    }

    if (event.key !== "Escape") return;

    const openModals = [...document.querySelectorAll(".modal:not(.hidden)")];
    if (openModals.length) {
      closeModalEl(openModals[openModals.length - 1]);
      return;
    }

    if (!$("#intro").classList.contains("hidden")) {
      finishIntro();
    }
  });
}
