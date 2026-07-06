/* ================= まちあるき（メイン画面） ================= */
// プレイヤーが横スクロールの まちを あるいて、たてものに はいる。
// main.js の showScreen/state/speak/renderAvatar などに依存する。

const WALK_SPEED = 320;        // px/びょう
const DOOR_RANGE = 90;         // ドアに はいれる きょり

const town = {
  playerX: 260,
  facing: 1,           // 1=みぎ, -1=ひだり
  moving: 0,           // -1 / 0 / 1
  targetX: null,       // タップいどう の めあて
  enterTarget: null,   // targetX とうちゃくご に はいる たてもの
  camX: 0,
  npcs: [],            // { el, x, min, max, dir, speed, kind, data, pauseUntil }
  running: false,
  lastT: 0,
  playerEl: null,
  worldEl: null,
  built: false,
};

// ---------- たてもののSVG ----------
function buildingSVG(b) {
  const w = b.w, h = 220;
  const roofH = 70, doorW = 52, doorH = 78;
  const sign = `<g>
      <rect x="${w / 2 - 74}" y="${roofH + 14}" width="148" height="34" rx="10" fill="#fff" stroke="#e0d5c5" stroke-width="2"/>
      <text x="${w / 2}" y="${roofH + 38}" font-size="17" font-weight="bold" text-anchor="middle" fill="#5d4037">${b.emoji} ${b.name}</text>
    </g>`;
  const awning = b.awning
    ? `<g>${[...Array(6)].map((_, i) =>
        `<path d="M ${14 + i * ((w - 28) / 6)} ${roofH + 4} h ${(w - 28) / 6} v 16 a ${(w - 28) / 12} 10 0 0 1 -${(w - 28) / 6} 0 Z" fill="${i % 2 ? "#fff" : "#e57373"}"/>`).join("")}</g>`
    : "";
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="${roofH}" width="${w - 20}" height="${h - roofH}" rx="8" fill="${b.wall}" stroke="#d7ccc8" stroke-width="3"/>
    <path d="M 0 ${roofH + 4} L ${w / 2} 0 L ${w} ${roofH + 4} Z" fill="${b.roof}"/>
    ${awning}${sign}
    <rect x="${w * 0.16}" y="${h - 96}" width="44" height="40" rx="6" fill="#b3e5fc" stroke="#fff" stroke-width="5"/>
    <rect x="${w * 0.84 - 44}" y="${h - 96}" width="44" height="40" rx="6" fill="#b3e5fc" stroke="#fff" stroke-width="5"/>
    <g class="bld-door">
      <rect x="${w / 2 - doorW / 2}" y="${h - doorH}" width="${doorW}" height="${doorH}" rx="8" fill="#8d6e63" stroke="#6d4c41" stroke-width="3"/>
      <circle cx="${w / 2 + doorW / 2 - 12}" cy="${h - doorH / 2}" r="4" fill="#ffd54f"/>
    </g>
  </svg>`;
}

function friendHouseSVG(f) {
  const w = 170, h = 175, roofH = 56;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="${roofH}" width="${w - 16}" height="${h - roofH}" rx="8" fill="#fffde7" stroke="#d7ccc8" stroke-width="3"/>
    <path d="M 0 ${roofH + 4} L ${w / 2} 0 L ${w} ${roofH + 4} Z" fill="${f.houseColor}"/>
    <rect x="${w / 2 - 60}" y="${roofH + 10}" width="120" height="26" rx="8" fill="#fff" stroke="#e0d5c5" stroke-width="2"/>
    <text x="${w / 2}" y="${roofH + 29}" font-size="14" font-weight="bold" text-anchor="middle" fill="#5d4037">${f.name}のいえ</text>
    <rect x="22" y="${h - 66}" width="34" height="30" rx="5" fill="#b3e5fc" stroke="#fff" stroke-width="4"/>
    <g class="bld-door">
      <rect x="${w - 66}" y="${h - 62}" width="40" height="62" rx="7" fill="#8d6e63" stroke="#6d4c41" stroke-width="3"/>
      <circle cx="${w - 36}" cy="${h - 30}" r="3.5" fill="#ffd54f"/>
    </g>
  </svg>`;
}

function emptyLotSVG(f) {
  return `<svg width="170" height="120" viewBox="0 0 170 120" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="30" width="150" height="80" rx="10" fill="#d7ccc8" opacity=".35" stroke="#a1887f" stroke-width="2" stroke-dasharray="8 6"/>
    <text x="85" y="62" font-size="24" text-anchor="middle">🚧</text>
    <text x="85" y="84" font-size="12" font-weight="bold" text-anchor="middle" fill="#8d6e63">がっこうレベル${f.unlockLv}で</text>
    <text x="85" y="100" font-size="12" font-weight="bold" text-anchor="middle" fill="#8d6e63">だれかが ひっこしてくる…</text>
  </svg>`;
}

function parkSVG() {
  return `<svg width="230" height="190" viewBox="0 0 230 190" xmlns="http://www.w3.org/2000/svg">
    <text x="40" y="120" font-size="64" text-anchor="middle">🌳</text>
    <text x="190" y="120" font-size="64" text-anchor="middle">🌳</text>
    <text x="115" y="100" font-size="44" text-anchor="middle">⛲</text>
    <rect x="55" y="128" width="120" height="26" rx="8" fill="#fff" stroke="#e0d5c5" stroke-width="2"/>
    <text x="115" y="147" font-size="14" font-weight="bold" text-anchor="middle" fill="#5d4037">🐾 こうえん</text>
    <text x="80" y="180" font-size="24" text-anchor="middle">🌷</text>
    <text x="150" y="180" font-size="24" text-anchor="middle">🌷</text>
  </svg>`;
}

// ---------- まちの こうちく ----------
function buildTown() {
  const world = document.getElementById("town-world");
  town.worldEl = world;
  world.style.width = TOWN_W + "px";
  world.innerHTML = "";

  // うしろの おか（パララックス）
  const hills = document.createElement("div");
  hills.className = "town-hills";
  hills.id = "town-hills";
  hills.innerHTML = [...Array(7)].map((_, i) =>
    `<div class="hill" style="left:${i * 520 - 100}px"></div>`).join("") +
    [...Array(10)].map((_, i) =>
      `<span class="bg-tree" style="left:${140 + i * 330}px">${["🌳", "🌲", "🌳"][i % 3]}</span>`).join("");
  world.appendChild(hills);

  // みち の かざり（はな・くさ）
  const deco = document.createElement("div");
  deco.className = "town-deco";
  deco.innerHTML = [...Array(22)].map((_, i) =>
    `<span class="road-deco" style="left:${60 + i * 150 + (i % 3) * 40}px">${["🌼", "🌱", "🌷", "🍀"][i % 4]}</span>`).join("");
  world.appendChild(deco);

  // メインのたてもの
  BUILDINGS.forEach((b) => {
    const el = document.createElement("div");
    el.className = "town-building";
    el.style.left = b.x + "px";
    el.dataset.building = b.id;
    el.innerHTML = buildingSVG(b);
    el.addEventListener("click", (e) => { e.stopPropagation(); walkToAndEnter(b); });
    world.appendChild(el);
  });

  // トモダチのいえ ＆ こうえん は renderTownDynamic() で
  const dyn = document.createElement("div");
  dyn.id = "town-dynamic";
  world.appendChild(dyn);

  // プレイヤー
  const player = document.createElement("div");
  player.className = "town-player";
  player.id = "town-player";
  world.appendChild(player);
  town.playerEl = player;

  town.built = true;
}

// たてもの・NPCなど レベルしんこうで かわる ぶぶんを かきなおす
function renderTownDynamic() {
  const dyn = document.getElementById("town-dynamic");
  dyn.innerHTML = "";
  town.npcs = [];
  const maxLv = maxCleared();

  // トモダチのいえ
  FRIENDS.forEach((f, i) => {
    const x = FRIEND_HOUSE_X[i];
    const el = document.createElement("div");
    if (f.unlockLv <= maxLv) {
      el.className = "town-building friend-house";
      el.innerHTML = friendHouseSVG(f);
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        walkToAndEnter({ id: "friend_" + f.id, x, w: 170, screen: "friend", friend: f });
      });
    } else {
      el.className = "town-building empty-lot";
      el.innerHTML = emptyLotSVG(f);
    }
    el.style.left = x + "px";
    dyn.appendChild(el);

    // トモダチ本人（いえのまえを うろうろ）
    if (f.unlockLv <= maxLv) {
      const npc = document.createElement("div");
      npc.className = "town-npc";
      npc.innerHTML = `<div class="npc-avatar">${renderAvatar(f.avatar)}</div><span class="npc-name">${f.name}</span>`;
      npc.addEventListener("click", (e) => { e.stopPropagation(); npcTalk(npc, `${pick(f.lines)}`); });
      dyn.appendChild(npc);
      town.npcs.push({ el: npc, x: x + rnd(120), min: x - 130, max: x + 220, dir: rnd(2) ? 1 : -1, speed: 26 + rnd(24), pauseUntil: 0 });
    }
  });

  // こうえん
  const park = document.createElement("div");
  park.className = "town-building park";
  park.style.left = PARK_X + "px";
  park.innerHTML = parkSVG();
  dyn.appendChild(park);

  // ペット（こうえん の あたりを うろうろ）
  PETS.forEach((p, i) => {
    if (p.unlockLv > maxLv) return;
    const npc = document.createElement("div");
    npc.className = "town-npc town-pet";
    npc.innerHTML = `<span class="pet-emoji">${p.icon}</span><span class="npc-name">${p.name}</span>`;
    npc.addEventListener("click", (e) => { e.stopPropagation(); npcTalk(npc, pick(p.lines)); });
    dyn.appendChild(npc);
    const base = PARK_X - 160 + i * 90;
    town.npcs.push({ el: npc, x: base, min: PARK_X - 300, max: PARK_X + 180, dir: rnd(2) ? 1 : -1, speed: 34 + rnd(30), pauseUntil: 0 });
  });

  // すすみぐあいで そらに にじ
  const rainbow = document.getElementById("town-rainbow");
  rainbow.classList.toggle("hidden", maxLv < 30);
}

function npcTalk(npcEl, text) {
  document.querySelectorAll(".npc-bubble").forEach((b) => b.remove());
  const bubble = document.createElement("div");
  bubble.className = "npc-bubble";
  bubble.textContent = text;
  npcEl.appendChild(bubble);
  speak(text);
  setTimeout(() => bubble.remove(), 3600);
}

// ---------- はいれる たてもの ----------
function allDoors() {
  const doors = BUILDINGS.map((b) => ({ ...b, doorX: b.x + b.w / 2 }));
  const maxLv = maxCleared();
  FRIENDS.forEach((f, i) => {
    if (f.unlockLv <= maxLv) {
      doors.push({ id: "friend_" + f.id, name: f.name + "のいえ", emoji: "🏠", x: FRIEND_HOUSE_X[i], w: 170, screen: "friend", friend: f, doorX: FRIEND_HOUSE_X[i] + 170 - 46 });
    }
  });
  return doors;
}

function nearestDoor() {
  let best = null, bestD = DOOR_RANGE;
  for (const d of allDoors()) {
    const dist = Math.abs(town.playerX - d.doorX);
    if (dist < bestD) { bestD = dist; best = d; }
  }
  return best;
}

function walkToAndEnter(b) {
  const doorX = b.doorX ?? (b.x + b.w / 2);
  town.targetX = doorX;
  town.enterTarget = { ...b, doorX };
}

function enterBuilding(b) {
  town.moving = 0; town.targetX = null; town.enterTarget = null;
  stopTownLoop();
  if (b.screen === "friend") { currentFriend = b.friend; }
  playDoorSound();
  showScreen(b.screen);
}

function playDoorSound() { beep([520, 392], 0.1); }

// ---------- そうさ ----------
function setupTownControls() {
  const view = document.getElementById("town-view");

  // キーボード
  document.addEventListener("keydown", (e) => {
    if (!town.running) return;
    if (e.key === "ArrowRight") { town.moving = 1; town.targetX = null; town.enterTarget = null; }
    else if (e.key === "ArrowLeft") { town.moving = -1; town.targetX = null; town.enterTarget = null; }
    else if (e.key === "Enter" || e.key === " " || e.key === "ArrowUp") {
      const d = nearestDoor();
      if (d) { e.preventDefault(); enterBuilding(d); }
    }
  });
  document.addEventListener("keyup", (e) => {
    if (!town.running) return;
    if ((e.key === "ArrowRight" && town.moving === 1) || (e.key === "ArrowLeft" && town.moving === -1)) town.moving = 0;
  });

  // ボタン（タッチ・マウス）
  const bindHold = (id, dir) => {
    const btn = document.getElementById(id);
    const start = (e) => { e.preventDefault(); town.moving = dir; town.targetX = null; town.enterTarget = null; };
    const end = () => { if (town.moving === dir) town.moving = 0; };
    btn.addEventListener("pointerdown", start);
    btn.addEventListener("pointerup", end);
    btn.addEventListener("pointerleave", end);
    btn.addEventListener("pointercancel", end);
  };
  bindHold("btn-walk-l", -1);
  bindHold("btn-walk-r", 1);

  document.getElementById("btn-enter-door").addEventListener("click", () => {
    const d = nearestDoor();
    if (d) enterBuilding(d);
  });

  // じめんタップで いどう
  view.addEventListener("click", (e) => {
    if (e.target.closest(".town-building, .town-npc, .walk-btn, .enter-btn, .town-hud")) return;
    const rect = view.getBoundingClientRect();
    town.targetX = e.clientX - rect.left + town.camX;
    town.enterTarget = null;
  });
}

// ---------- ループ ----------
function startTownLoop() {
  if (town.running) return;
  town.running = true;
  town.lastT = performance.now();
  requestAnimationFrame(townTick);
}
function stopTownLoop() { town.running = false; }

function townTick(t) {
  if (!town.running) return;
  const dt = Math.min(0.05, (t - town.lastT) / 1000);
  town.lastT = t;

  // タップいどう
  if (town.targetX != null) {
    const diff = town.targetX - town.playerX;
    if (Math.abs(diff) < 8) {
      town.targetX = null;
      town.moving = 0;
      if (town.enterTarget) { enterBuilding(town.enterTarget); return; }
    } else {
      town.moving = diff > 0 ? 1 : -1;
    }
  }

  // プレイヤーいどう
  if (town.moving !== 0) {
    town.playerX = Math.max(60, Math.min(TOWN_W - 60, town.playerX + town.moving * WALK_SPEED * dt));
    town.facing = town.moving;
  }
  const p = town.playerEl;
  p.style.left = town.playerX + "px";
  p.classList.toggle("walking", town.moving !== 0);
  p.classList.toggle("face-left", town.facing === -1);

  // NPCいどう
  const now = t;
  for (const n of town.npcs) {
    if (now < n.pauseUntil) { n.el.classList.remove("walking"); }
    else {
      n.x += n.dir * n.speed * dt;
      if (n.x < n.min) { n.x = n.min; n.dir = 1; n.pauseUntil = now + 1200 + rnd(2500); }
      if (n.x > n.max) { n.x = n.max; n.dir = -1; n.pauseUntil = now + 1200 + rnd(2500); }
      if (rnd(1000) < 3) n.pauseUntil = now + 800 + rnd(2000);
      n.el.classList.add("walking");
    }
    n.el.style.left = n.x + "px";
    n.el.classList.toggle("face-left", n.dir === -1);
  }

  // カメラ
  const view = document.getElementById("town-view");
  const vw = view.clientWidth;
  town.camX = Math.max(0, Math.min(TOWN_W - vw, town.playerX - vw / 2));
  town.worldEl.style.transform = `translateX(${-town.camX}px)`;
  const hills = document.getElementById("town-hills");
  if (hills) hills.style.transform = `translateX(${town.camX * 0.45}px)`; // パララックス

  // ドアちかく → 「はいる」ボタン
  const door = nearestDoor();
  const enterBtn = document.getElementById("btn-enter-door");
  if (door) {
    enterBtn.classList.remove("hidden");
    enterBtn.textContent = `${door.emoji} ${door.name}に はいる`;
  } else {
    enterBtn.classList.add("hidden");
  }

  requestAnimationFrame(townTick);
}

// ---------- がめんひょうじ ----------
function renderTownScreen() {
  if (!town.built) { buildTown(); setupTownControls(); }
  // プレイヤーの みため こうしん
  town.playerEl.innerHTML = `<div class="npc-avatar">${renderAvatar(state.avatar)}</div><span class="npc-name player-name">${state.name}</span>`;
  renderTownDynamic();
  updateHud();
  startTownLoop();
}
