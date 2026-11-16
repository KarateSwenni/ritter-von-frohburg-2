/* ============================================================
   Die Ritter von Frohburg 2 – Karte
   Baut die interaktive SVG-Karte und aktualisiert ihren Zustand.
   ============================================================ */

const MAP_VIEWBOX = "0 0 1000 720";

let lastCenteredLocation = null;

const MAP_LABEL_OVERRIDES = {
  park: { dy: -42 },
  kirche: { dy: -44 },
  see: { dy: 46 },
  wirtshaus: { dy: 52 },
  drachennest: { dy: 48 }
};

function esc(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#39;";
      default: return char;
    }
  });
}

function locationUnlocked(loc, state) {
  return (loc.requires || []).every((id) => state.solved.includes(id));
}

function iconSymbol(id, inner) {
  return `<symbol id="icon-${id}" viewBox="-16 -16 32 32">${inner}</symbol>`;
}

function tree(x, y, scale = 1) {
  return `
    <g class="map-tree" transform="translate(${x},${y}) scale(${scale})">
      <path d="M0-15 L10 2 H-10 Z" fill="#6f8b5a" opacity=".8"/>
      <path d="M0-7 L13 9 H-13 Z" fill="#7f9b68" opacity=".9"/>
      <rect x="-2" y="8" width="4" height="9" fill="#7a5a3a" opacity=".85"/>
    </g>`;
}

function locationMarkup(loc) {
  const override = MAP_LABEL_OVERRIDES[loc.id] || {};
  const dy = override.dy ?? 48;
  const dx = override.dx ?? 0;
  const anchor = override.anchor ?? "middle";
  return `
    <g class="loc" data-id="${esc(loc.id)}" transform="translate(${loc.x},${loc.y})"
       tabindex="0" role="button" aria-label="${esc(loc.name)}">
      <circle class="loc-halo" r="36"></circle>
      <circle class="loc-badge" r="27"></circle>
      <use class="loc-icon" href="#icon-${esc(loc.icon)}" x="-15" y="-15" width="30" height="30"></use>
      <g class="loc-state" transform="translate(21,-21)"></g>
      <text class="loc-label" x="${dx}" y="${dy}" text-anchor="${anchor}">${esc(loc.name)}</text>
    </g>`;
}

function buildMap(container) {
  const locations = GAME.locations.map(locationMarkup).join("");

  container.innerHTML = `
    <svg id="town-map" viewBox="${MAP_VIEWBOX}" role="img"
         aria-label="Spielkarte von Frohburg mit zehn Orten und dem Drachennest">
      <defs>
        <linearGradient id="parchment" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#faf0d8"/>
          <stop offset=".52" stop-color="#f0ddb8"/>
          <stop offset="1" stop-color="#e0c795"/>
        </linearGradient>
        <radialGradient id="vignette" cx="50%" cy="44%" r="72%">
          <stop offset="0" stop-color="#fff8e8" stop-opacity=".55"/>
          <stop offset="1" stop-color="#7d5c36" stop-opacity=".18"/>
        </radialGradient>
        <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#3f2616" flood-opacity=".22"/>
        </filter>
        <filter id="goldGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <clipPath id="heroClip">
          <circle cx="0" cy="0" r="22"></circle>
        </clipPath>

        ${iconSymbol("column", '<path d="M-8 12h16M-12 15h24M-5 12V-6M5 12V-6M-9-6h18M-7-10h14M-5-6v-4M5-6v-4"/>')}
        ${iconSymbol("market", '<path d="M-12-2h24l-3 8h-18zM-12-2l3-6h18l3 6M-6 6v7M0 6v7M6 6v7"/>')}
        ${iconSymbol("book", '<path d="M-10-9h7a3 3 0 0 1 3 3v14a3 3 0 0 0-3-3h-7zM10-9h-7a3 3 0 0 0-3 3v14a3 3 0 0 1 3-3h7z"/>')}
        ${iconSymbol("sword", '<path d="M-6 12l12-12M6 0l3 3M-9 9l6 6M-4 4l8 8M2-2l4-4"/>')}
        ${iconSymbol("castle", '<path d="M-12 12V-2h5v-6h4v6h6v-6h4v6h5v14zM-3 12V6h6v6"/>')}
        ${iconSymbol("tree", '<path d="M0-13l8 11h-5l6 8h-18l6-8h-5zM0 6v7"/>')}
        ${iconSymbol("wave", '<path d="M-13-5c3-4 6-4 9 0s6 4 9 0M-13 2c3-4 6-4 9 0s6 4 9 0M-13 9c3-4 6-4 9 0s6 4 9 0"/>')}
        ${iconSymbol("coffee", '<path d="M-9-5h13v6a6 6 0 0 1-6 6h-1a6 6 0 0 1-6-6zM4-3h3a3 3 0 0 1 0 6H4M-11 11h18M-6-11c2-2 0-4 2-5M2-11c2-2 0-4 2-5"/>')}
        ${iconSymbol("church", '<path d="M-10 12V0h20v12M-6 0v-6h12V0M0-13v4M-3-11h6"/>')}
        ${iconSymbol("townhall", '<path d="M-12 12V0h24v12M-9 0v-6h18v6M-12 0l12-8 12 8M-4 12V5h8v7M0-14v4"/>')}
        ${iconSymbol("tavern", '<path d="M-9-6h12v16H-9zM3-3h5a3 3 0 0 1 0 6H3M-12 11h22M-6-9c1-2-1-3 0-5M0-9c1-2-1-3 0-5"/>')}
        ${iconSymbol("honey", '<path d="M-8-4h16v10a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6zM-9-8h18M-4-8v3M4-8v3M-8 1h16"/>')}
        ${iconSymbol("spark", '<path d="M0-13L3-3 13 0 3 3 0 13-3 3-13 0-3-3Z"/>')}
        ${iconSymbol("flask", '<path d="M-4-11h8M-2-11v6L-8 8a3 3 0 0 0 3 4h10a3 3 0 0 0 3-4L2-5v-6M-6 4h12"/>')}
        ${iconSymbol("boot", '<path d="M-9 10V-5h6v8h5l6 7zM-9 6h17M-4-5v8"/>')}
        ${iconSymbol("dragon", '<ellipse cx="0" cy="1" rx="7" ry="9" transform="rotate(20)"/><path d="M-7-5c-5-6-9-2-4 3M7-5c5-6 9-2 4 3M-4 8l-4 5M4 8l4 5M-5 10c-5 2-7 6-3 6"/><circle cx="2" cy="-3" r="1" fill="currentColor" stroke="none"/>')}
        ${iconSymbol("scroll", '<path d="M-8-10h14a2 2 0 0 1 2 2v18H-8a2 2 0 0 1-2-2v-16a2 2 0 0 1 2-2zM-10-8a2 2 0 1 0 4 0M-10 8a2 2 0 1 0 4 0M-4-4h8M-4 0h8M-4 4h6"/>')}
        ${iconSymbol("seal", '<circle cx="0" cy="-3" r="7"/><path d="M-4 3l-3 9 4-2 3 4 3-4 4 2-3-9"/>')}
        ${iconSymbol("key", '<circle cx="-6" cy="-6" r="5"/><path d="M-2-2l10 10M4 6l-3 3M7 9l-3 3"/>')}
        ${iconSymbol("cauldron", '<path d="M-11 0h22v5a11 11 0 0 1-22 0zM-13 0h26M-6 0V-3M6 0V-3M-4-7c2-2 0-4 2-6M4-7c2-2 0-4 2-6"/>')}
        ${iconSymbol("leaf", '<path d="M-10 8c0-10 8-16 18-16 0 10-6 18-16 18M-8 6c4-4 8-7 13-9"/>')}
        ${iconSymbol("bell", '<path d="M-10 8h20c-2-3-3-5-3-9a7 7 0 0 0-14 0c0 4-1 6-3 9zM-4 11a4 4 0 0 0 8 0M0-12v2"/>')}
        ${iconSymbol("lock", '<rect x="-6" y="-2" width="12" height="10" rx="2"/><path d="M-3-2v-3a3 3 0 0 1 6 0v3"/>')}
        ${iconSymbol("check", '<path d="M-8 0l5 5 10-11"/>')}
      </defs>

      <rect width="1000" height="720" fill="url(#parchment)"/>
      <rect width="1000" height="720" fill="url(#vignette)"/>

      <!-- Kartenecken -->
      <rect x="14" y="14" width="972" height="692" rx="18" fill="none" stroke="#8b6b4a" stroke-width="2" opacity=".55"/>
      <rect x="22" y="22" width="956" height="676" rx="14" fill="none" stroke="#8b6b4a" stroke-width="1" opacity=".32"/>

      <!-- Fluss Wyhra -->
      <path d="M112-20 C168 120 78 212 128 330 C178 450 98 540 148 740"
            stroke="#9bc4cf" stroke-width="46" fill="none" opacity=".5" stroke-linecap="round"/>
      <path d="M112-20 C168 120 78 212 128 330 C178 450 98 540 148 740"
            stroke="#5f97ad" stroke-width="2" fill="none" opacity=".5" stroke-dasharray="8 12"/>
      <text x="92" y="360" transform="rotate(-82 92 360)" fill="#4f7f93" font-size="15"
            font-family="Patrick Hand, cursive" opacity=".8">Wyhra</text>

      <!-- Bahnlinie -->
      <path d="M896 30 L856 700" stroke="#7a6a55" stroke-width="7" opacity=".35"/>
      <path d="M896 30 L856 700" stroke="#f6e7c6" stroke-width="3" stroke-dasharray="14 12" opacity=".8"/>
      <text x="902" y="365" transform="rotate(86 902 365)" fill="#7a6a55" font-size="13"
            font-family="Patrick Hand, cursive" opacity=".65">Bahn</text>

      <!-- Stadtmauer -->
      <path d="M360 190 C430 158 620 148 710 180 C778 218 800 300 782 392 C764 486 682 604 592 634 C500 664 402 622 342 562 C292 502 272 402 287 322 C297 252 320 212 360 190 Z"
            fill="#f0ddba" fill-opacity=".32" stroke="#8b6b4a" stroke-width="9"
            stroke-linejoin="round" opacity=".78"/>
      <path d="M360 190 C430 158 620 148 710 180 C778 218 800 300 782 392 C764 486 682 604 592 634 C500 664 402 622 342 562 C292 502 272 402 287 322 C297 252 320 212 360 190 Z"
            fill="none" stroke="#b99a6d" stroke-width="2" stroke-dasharray="7 8" opacity=".7"/>
      <g fill="#e2c99c" stroke="#8b6b4a" stroke-width="3">
        <circle cx="360" cy="190" r="13"/><circle cx="710" cy="180" r="13"/>
        <circle cx="782" cy="392" r="13"/><circle cx="592" cy="634" r="13"/>
        <circle cx="342" cy="562" r="13"/><circle cx="287" cy="322" r="13"/>
      </g>
      <g fill="#8b6b4a" opacity=".55">
        <rect x="355" y="184" width="10" height="6" rx="1"/><rect x="705" y="174" width="10" height="6" rx="1"/>
        <rect x="777" y="386" width="10" height="6" rx="1"/><rect x="587" y="628" width="10" height="6" rx="1"/>
        <rect x="337" y="556" width="10" height="6" rx="1"/><rect x="282" y="316" width="10" height="6" rx="1"/>
      </g>

      <!-- Straßen -->
      <g fill="none" stroke-linecap="round" stroke-linejoin="round">
        <g stroke="#c9ab7d" stroke-width="15">
          <path d="M500 150 C510 220 515 280 520 330 C535 410 550 490 565 560"/>
          <path d="M520 330 L630 355"/>
          <path d="M520 330 C480 370 450 420 430 465 C390 495 360 515 330 535"/>
          <path d="M520 330 C580 300 660 250 760 185"/>
          <path d="M330 535 C350 570 370 595 390 620"/>
          <path d="M565 560 C640 575 710 555 790 520"/>
          <path d="M330 535 C300 500 270 460 240 420"/>
        </g>
        <g stroke="#f1e0bd" stroke-width="10">
          <path d="M500 150 C510 220 515 280 520 330 C535 410 550 490 565 560"/>
          <path d="M520 330 L630 355"/>
          <path d="M520 330 C480 370 450 420 430 465 C390 495 360 515 330 535"/>
          <path d="M520 330 C580 300 660 250 760 185"/>
          <path d="M330 535 C350 570 370 595 390 620"/>
          <path d="M565 560 C640 575 710 555 790 520"/>
          <path d="M330 535 C300 500 270 460 240 420"/>
        </g>
      </g>

      <!-- Marktplatz -->
      <rect x="478" y="300" width="84" height="60" rx="8" fill="#ead2a8" stroke="#b99a6d" stroke-width="2" opacity=".9"/>
      <g opacity=".9">
        <rect x="486" y="308" width="18" height="12" rx="2" fill="#d46a5e"/>
        <rect x="508" y="308" width="18" height="12" rx="2" fill="#e0b64f"/>
        <rect x="530" y="308" width="18" height="12" rx="2" fill="#6f9b78"/>
        <rect x="486" y="334" width="18" height="12" rx="2" fill="#8a72b5"/>
        <rect x="508" y="334" width="18" height="12" rx="2" fill="#d46a5e"/>
        <rect x="530" y="334" width="18" height="12" rx="2" fill="#e0b64f"/>
      </g>

      <!-- Rathaus -->
      <g transform="translate(630,355)" opacity=".85">
        <rect x="-24" y="-12" width="48" height="30" rx="3" fill="#d9bd91" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="-14" y="-30" width="28" height="18" rx="2" fill="#e7cfa6" stroke="#8b6b4a" stroke-width="2"/>
        <path d="M-18-30 L0-42 L18-30 Z" fill="#a86d52" stroke="#8b6b4a" stroke-width="2"/>
        <circle cx="0" cy="-21" r="4" fill="#f4e6c8" stroke="#8b6b4a" stroke-width="1.5"/>
      </g>

      <!-- Wirtshaus -->
      <g transform="translate(660,262)" opacity=".9">
        <rect x="-27" y="-8" width="54" height="26" rx="3" fill="#d9bd91" stroke="#8b6b4a" stroke-width="2"/>
        <path d="M-31-8 L0-27 L31-8 Z" fill="#a86d52" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="-19" y="5" width="12" height="13" rx="6" fill="#6b4e33"/>
        <rect x="7" y="1" width="12" height="11" rx="2" fill="#f0d36b" stroke="#8b6b4a" stroke-width="1.5"/>
        <path d="M30-17 h13" stroke="#6b4e33" stroke-width="2"/>
        <g transform="translate(38,-8)">
          <rect x="-7" y="-6" width="11" height="12" rx="2" fill="#8f6b4a" stroke="#3f2616" stroke-width="1.5"/>
          <path d="M4-3h4a2.5 2.5 0 0 1 0 5H4" fill="none" stroke="#3f2616" stroke-width="1.5"/>
        </g>
        <g transform="translate(-36,13)">
          <rect x="-6" y="-8" width="12" height="16" rx="5" fill="#b08a5c" stroke="#6b4e33" stroke-width="1.5"/>
          <path d="M-6-3h12M-6 3h12" stroke="#6b4e33" stroke-width="1.2"/>
        </g>
      </g>

      <!-- Bibliothek -->
      <g transform="translate(430,465)" opacity=".85">
        <rect x="-19" y="-14" width="38" height="28" rx="3" fill="#e2c99c" stroke="#8b6b4a" stroke-width="2"/>
        <path d="M-23-14 L0-28 L23-14 Z" fill="#8f6b4a" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="-5" y="-2" width="10" height="8" rx="1" fill="#6b4e33"/>
      </g>

      <!-- Schloss -->
      <g transform="translate(330,535)" opacity=".9">
        <rect x="-38" y="-20" width="76" height="42" rx="3" fill="#dcc39a" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="-48" y="-34" width="22" height="56" rx="2" fill="#e7cfa6" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="26" y="-34" width="22" height="56" rx="2" fill="#e7cfa6" stroke="#8b6b4a" stroke-width="2"/>
        <path d="M-48-34 L-37-46 L-26-34 Z" fill="#a86d52" stroke="#8b6b4a" stroke-width="2"/>
        <path d="M26-34 L37-46 L48-34 Z" fill="#a86d52" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="-6" y="2" width="12" height="20" rx="5" fill="#6b4e33"/>
        <path d="M0-46 V-62 M0-62 L14-56 L0-52" fill="none" stroke="#b23b32" stroke-width="2"/>
      </g>

      <!-- Kirche -->
      <g transform="translate(565,560)" opacity=".9">
        <rect x="-20" y="-10" width="40" height="32" rx="2" fill="#d9bd91" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="-8" y="-34" width="16" height="24" rx="1" fill="#e7cfa6" stroke="#8b6b4a" stroke-width="2"/>
        <path d="M-10-34 L0-48 L10-34 Z" fill="#8f6b4a" stroke="#8b6b4a" stroke-width="2"/>
        <path d="M0-48 V-58 M-4-54 H4" stroke="#8b6b4a" stroke-width="2"/>
        <rect x="-4" y="8" width="8" height="14" rx="4" fill="#6b4e33"/>
      </g>

      <!-- Appellplatz -->
      <g transform="translate(760,185)" opacity=".75">
        <rect x="-42" y="-26" width="84" height="52" rx="6" fill="none" stroke="#a9835c" stroke-width="2" stroke-dasharray="6 5"/>
        <path d="M-26 14 V-8 M-26-8 L-14-2 M-26-8 L-38-2 M-12 14 V-8 M-12-8 L0-2 M-12-8 L-24-2" stroke="#6b4e33" stroke-width="3" stroke-linecap="round"/>
      </g>

      <!-- Park -->
      ${tree(200, 380)} ${tree(228, 402, .9)} ${tree(186, 432, .85)} ${tree(262, 388, .8)}
      ${tree(220, 458, .75)} ${tree(160, 410, .7)} ${tree(286, 446, .7)}

      <!-- Schlossteich -->
      <ellipse cx="390" cy="620" rx="50" ry="24" fill="#9bc4cf" opacity=".65"/>
      <ellipse cx="390" cy="620" rx="50" ry="24" fill="none" stroke="#5f97ad" stroke-width="2" opacity=".6"/>
      <g fill="none" stroke="#4f7f93" stroke-width="2" opacity=".55">
        <path d="M356 614 q10-6 20 0 t20 0 t20 0"/>
        <path d="M362 624 q8-5 16 0 t16 0"/>
      </g>

      <!-- Drachenhügel -->
      <path d="M716 548 C730 496 768 462 806 474 C842 486 858 522 850 556 Z"
            fill="#d5bb91" stroke="#8b6b4a" stroke-width="2" opacity=".8"/>
      <path d="M758 498 C766 486 780 484 786 494 C792 504 786 514 776 516 C766 518 756 510 758 498 Z"
            fill="#6f8b62" opacity=".9"/>
      <path d="M770 492 C760 480 748 486 756 496 M784 494 C794 482 804 490 796 500"
            fill="none" stroke="#6f8b62" stroke-width="4" stroke-linecap="round" opacity=".9"/>
      <path d="M776 516 C770 526 762 530 756 526" fill="none" stroke="#6f8b62" stroke-width="3" stroke-linecap="round"/>
      <g fill="none" stroke="#8b6b4a" stroke-width="2" opacity=".45">
        <path d="M774 474 c-4-8 4-12 0-20"/>
        <path d="M792 470 c-4-8 4-12 0-20"/>
      </g>

      <!-- Bäume am Rand -->
      ${tree(330, 110, .75)} ${tree(680, 110, .7)} ${tree(820, 300, .7)}
      ${tree(260, 600, .75)} ${tree(700, 640, .7)} ${tree(500, 660, .65)}

      <!-- Kompass -->
      <g transform="translate(920,100)" opacity=".62">
        <circle r="24" fill="#f7ead0" stroke="#8b6b4a" stroke-width="1.5"/>
        <path d="M0-20 L5 0 L0 20 L-5 0 Z" fill="#8b6b4a"/>
        <path d="M-20 0 L0-5 L20 0 L0 5 Z" fill="#c9a227"/>
        <text x="0" y="-30" text-anchor="middle" fill="#6b4e33" font-size="14"
              font-family="Cinzel, serif">N</text>
      </g>

      <!-- Ortsmarker -->
      <g id="locations">${locations}</g>

      <!-- Spielfigur -->
      <g id="hero-token" class="hero-token" transform="translate(542,90)">
        <circle class="hero-shadow" cy="23" r="18"></circle>
        <circle class="hero-ring" r="25"></circle>
        <image href="assets/img/hero.jpg" x="-22" y="-22" width="44" height="44"
               clip-path="url(#heroClip)" preserveAspectRatio="xMidYMid slice"></image>
        <g class="hero-flag" transform="translate(0,31)">
          <rect x="-18" y="0" width="36" height="16" rx="8"></rect>
          <text x="0" y="12" text-anchor="middle">Du</text>
        </g>
      </g>
    </svg>`;
}

function centerMapOnLocation(x, smooth = true) {
  const map = document.getElementById("map");
  const svg = document.getElementById("town-map");
  if (!map || !svg) return;

  const maxScroll = map.scrollWidth - map.clientWidth;
  if (maxScroll <= 4) return;

  const svgWidth = svg.getBoundingClientRect().width || 1000;
  const target = (x / 1000) * svgWidth - map.clientWidth / 2;
  const left = Math.max(0, Math.min(maxScroll, target));

  try {
    map.scrollTo({ left, behavior: smooth ? "smooth" : "auto" });
  } catch (error) {
    map.scrollLeft = left;
  }
}

function updateMapState(state) {
  const svg = document.getElementById("town-map");
  if (!svg) return;
  GAME.locations.forEach((loc) => {
    const group = svg.querySelector(`.loc[data-id="${loc.id}"]`);
    if (!group) return;

    const solved = state.solved.includes(loc.id);
    const unlocked = locationUnlocked(loc, state);
    const current = state.currentLocation === loc.id;
    const wip = Boolean(loc.wip);
    const available = unlocked && !solved;

    group.classList.toggle("solved", solved);
    group.classList.toggle("locked", !unlocked);
    group.classList.toggle("unlocked", unlocked);
    group.classList.toggle("available", available);
    group.classList.toggle("current", current);
    group.classList.toggle("wip", wip);

    const status = group.querySelector(".loc-state");
    if (status) {
      if (solved) {
        status.innerHTML =
          '<circle r="10" class="state-solved"></circle>' +
          '<use href="#icon-check" x="-5" y="-5" width="10" height="10"></use>';
      } else if (!unlocked) {
        status.innerHTML =
          '<circle r="10" class="state-locked"></circle>' +
          '<use href="#icon-lock" x="-5" y="-5" width="10" height="10"></use>';
      } else if (wip) {
        status.innerHTML =
          '<circle r="10" class="state-wip"></circle>' +
          '<text x="0" y="4" text-anchor="middle" class="state-z">z</text>';
      } else {
        status.innerHTML = '<circle r="7" class="state-new"></circle>';
      }
    }

    let label = loc.name;
    if (solved) label += " – geschafft";
    else if (!unlocked) label += " – verschlossen";
    else if (wip) label += " – Vorschau";
    else label += " – offen";
    group.setAttribute("aria-label", label);
  });

  const current = GAME.locations.find((loc) => loc.id === state.currentLocation);
  const hero = svg.querySelector("#hero-token");
  if (current && hero) {
    let offsetX = current.x > 860 ? -52 : 46;
    let offsetY = -48;
    if (current.id === "wirtshaus") {
      offsetX = 0;
      offsetY = -70;
    }
    hero.setAttribute("transform", `translate(${current.x + offsetX},${current.y + offsetY})`);
  }

  if (current && current.id !== lastCenteredLocation) {
    const smooth = lastCenteredLocation !== null;
    lastCenteredLocation = current.id;
    requestAnimationFrame(() => centerMapOnLocation(current.x, smooth));
  }
}

window.addEventListener("resize", () => {
  clearTimeout(window.__mapCenterTimer);
  window.__mapCenterTimer = setTimeout(() => {
    const loc = GAME.locations.find((entry) => entry.id === lastCenteredLocation);
    if (loc) centerMapOnLocation(loc.x, false);
  }, 180);
});
