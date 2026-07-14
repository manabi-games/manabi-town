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

function fishingSpotSVG() {
  return `<svg width="330" height="240" viewBox="0 0 330 240" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="185" cy="200" rx="145" ry="38" fill="#4fc3f7" opacity=".9"/>
    <ellipse cx="185" cy="196" rx="130" ry="30" fill="#81d4fa"/>
    <path d="M 90 190 Q 110 184 130 190 Q 150 196 170 190" stroke="#e1f5fe" stroke-width="4" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M 180 205 Q 200 199 220 205 Q 240 211 260 205" stroke="#e1f5fe" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>
    <rect x="20" y="160" width="110" height="14" rx="6" fill="#a1887f"/>
    <rect x="34" y="172" width="10" height="46" fill="#8d6e63"/>
    <rect x="96" y="172" width="10" height="46" fill="#8d6e63"/>
    <text x="250" y="170" font-size="34" text-anchor="middle">🐟</text>
    <rect x="6" y="96" width="128" height="30" rx="9" fill="#fff" stroke="#e0d5c5" stroke-width="2"/>
    <text x="70" y="117" font-size="16" font-weight="bold" text-anchor="middle" fill="#5d4037">🎣 つりば</text>
    <rect x="62" y="126" width="8" height="36" fill="#8d6e63"/>
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
      const q = state.quest;
      const mark = q && q.friendId === f.id ? `<span class="quest-mark">${questReady(q) || !q.asked ? "❗" : "📋"}</span>` : "";
      npc.innerHTML = `${mark}<div class="npc-avatar">${renderAvatar(friendAvatarCfg(f))}</div><span class="npc-name">${f.name}</span>`;
      npc.addEventListener("click", (e) => {
        e.stopPropagation();
        const qi = questInteract(f);
        if (qi) {
          npcTalk(npc, qi.text, friendVoice(f.id));
          updateQuestChip();
          if (qi.completed) setTimeout(() => { assignQuestIfNeeded(); renderTownDynamic(); }, 4500);
        } else {
          npcTalk(npc, pick(f.lines), friendVoice(f.id));
        }
      });
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

  // つりば
  const spot = document.createElement("div");
  spot.className = "town-building fishing-spot";
  spot.style.left = FISHING_X + "px";
  spot.innerHTML = fishingSpotSVG();
  spot.addEventListener("click", (e) => {
    e.stopPropagation();
    walkToAndEnter({ id: "fishing", name: "つりば", emoji: "🎣", x: FISHING_X, w: 330, screen: "fishing", doorX: FISHING_X + 70 });
  });
  dyn.appendChild(spot);

  // まちのかざり（かったものが かざられる）
  TOWN_DECOR.filter((d) => state.owned.includes(d.id)).forEach((d) => {
    const el = document.createElement("div");
    el.className = "town-decor" + (d.back ? " back" : "");
    el.textContent = d.deco;
    el.style.left = d.x + "px";
    el.style.bottom = d.b + "px";
    el.style.fontSize = d.size + "rem";
    dyn.appendChild(el);
  });

  // つれあるき中の ペット
  town.follower = null;
  if (state.petFollow) {
    const p = PETS.find((x) => x.id === state.petFollow && x.unlockLv <= maxLv);
    if (p) {
      const el = document.createElement("div");
      el.className = "town-npc town-pet pet-follower";
      const face = p.img ? `<img class="pet-img" src="${p.img}" alt="">` : `<span class="pet-emoji">${p.icon}</span>`;
      el.innerHTML = `${face}<span class="npc-name">${p.name}</span>`;
      el.addEventListener("click", (e) => { e.stopPropagation(); petTalk(el, p); });
      dyn.appendChild(el);
      town.follower = { el, x: town.playerX - 85 * town.facing, p };
    } else {
      state.petFollow = null;
    }
  }

  // ペット（こうえん の あたりを うろうろ・つれあるき中の こは のぞく）
  PETS.forEach((p, i) => {
    if (p.unlockLv > maxLv || p.id === state.petFollow) return;
    const npc = document.createElement("div");
    npc.className = "town-npc town-pet";
    const face = p.img ? `<img class="pet-img" src="${p.img}" alt="">` : `<span class="pet-emoji">${p.icon}</span>`;
    npc.innerHTML = `${face}<span class="npc-name">${p.name}</span>`;
    npc.addEventListener("click", (e) => { e.stopPropagation(); petTalk(npc, p); });
    dyn.appendChild(npc);
    const base = PARK_X - 430 + i * 68;
    town.npcs.push({ el: npc, x: base, min: PARK_X - 470, max: PARK_X + 190, dir: rnd(2) ? 1 : -1, speed: 34 + rnd(30), pauseUntil: 0 });
  });

  // すすみぐあいで そらに にじ
  const rainbow = document.getElementById("town-rainbow");
  rainbow.classList.toggle("hidden", maxLv < 30);

  updateQuestChip();
}

function updateQuestChip() {
  const chip = document.getElementById("quest-chip");
  if (state.quest) {
    chip.textContent = questChipText(state.quest);
    chip.classList.remove("hidden");
  } else {
    chip.classList.add("hidden");
  }
}

function npcTalk(npcEl, text, voice) {
  document.querySelectorAll(".npc-bubble").forEach((b) => b.remove());
  const bubble = document.createElement("div");
  bubble.className = "npc-bubble";
  bubble.textContent = text;
  npcEl.appendChild(bubble);
  speak(text, voice);
  setTimeout(() => bubble.remove(), 4200);
  return bubble;
}

// ペット: はなしかけ ＋ ごはん ＋ つれあるき
function petTalk(npcEl, p) {
  const bubble = npcTalk(npcEl, pick(p.lines), PET_VOICE);
  // ごはんボタン
  const owned = FOODS.filter((f) => (state.foods[f.id] || 0) > 0);
  if (owned.length) {
    const btn = document.createElement("button");
    const food = pick(owned);
    btn.className = "feed-btn";
    btn.textContent = `${food.icon} あげる`;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      state.foods[food.id]--;
      save();
      dailyProgress("feed");
      soundCorrect();
      npcEl.classList.add("feed-bounce");
      setTimeout(() => npcEl.classList.remove("feed-bounce"), 1300);
      npcTalk(npcEl, pick(PET_FEED_LINES[p.id] || p.lines), PET_VOICE);
    });
    bubble.appendChild(btn);
  }
  // つれあるきボタン
  const fbtn = document.createElement("button");
  const following = state.petFollow === p.id;
  fbtn.className = "feed-btn follow-btn";
  fbtn.textContent = following ? "👋 おわかれする" : "🐾 つれていく";
  fbtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const lines = PET_FOLLOW_LINES[p.id] || {};
    if (following) {
      state.petFollow = null;
      speak(lines.bye || "またね！", PET_VOICE);
    } else {
      state.petFollow = p.id;
      speak(lines.go || "いっしょに いこう！", PET_VOICE);
    }
    save();
    renderTownDynamic();
  });
  bubble.appendChild(fbtn);
}

// ---------- はいれる たてもの ----------
function allDoors() {
  const doors = BUILDINGS.map((b) => ({ ...b, doorX: b.x + b.w / 2 }));
  doors.push({ id: "fishing", name: "つりば", emoji: "🎣", x: FISHING_X, w: 330, screen: "fishing", doorX: FISHING_X + 70 });
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

  // つれあるきペット（プレイヤーの うしろを ついてくる）
  if (town.follower) {
    const f = town.follower;
    const target = town.playerX - 85 * town.facing;
    const diff = target - f.x;
    const moving = Math.abs(diff) > 6;
    if (moving) f.x += diff * Math.min(1, dt * 3.2);
    f.el.style.left = f.x + "px";
    f.el.classList.toggle("walking", moving);
    f.el.classList.toggle("face-left", diff < 0);
  }

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
  ensureDaily();
  checkLoginGift();
  assignQuestIfNeeded();
  // プレイヤーの みため こうしん
  town.playerEl.innerHTML = `<div class="npc-avatar">${renderAvatar(state.avatar)}</div><span class="npc-name player-name">${state.name}</span>`;
  renderTownDynamic();
  updateHud();
  startTownLoop();
}
