/* ================= まなびタウン メインロジック ================= */

const SAVE_KEY = "manabi-town-save-v1";

// ---------- セーブデータ ----------
let state = null;

function defaultState() {
  return {
    name: "",
    avatar: { skin: 0, hairStyle: "short", hairColor: 0, eyes: "round", shirt: SHIRT_COLORS_FREE[0], hat: null, glasses: null, item: null },
    coins: 0,
    cleared: {},          // { "1": stars, ... }
    owned: [],            // アイテムID
  };
}
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name && parsed.avatar && typeof parsed.avatar === "object") return parsed;
    }
  } catch (e) { /* こわれたデータは むし */ }
  return null;
}

// いちばん すすんでいる クリアずみレベル
function maxCleared() {
  return Object.keys(state.cleared).reduce((m, k) => Math.max(m, Number(k)), 0);
}
function totalStars() {
  return Object.values(state.cleared).reduce((s, v) => s + v, 0);
}

// ---------- おと ----------
let audioCtx = null;
function beep(freqs, dur = 0.15) {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = f;
      g.gain.setValueAtTime(0.15, audioCtx.currentTime + i * dur);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (i + 1) * dur);
      o.connect(g).connect(audioCtx.destination);
      o.start(audioCtx.currentTime + i * dur);
      o.stop(audioCtx.currentTime + (i + 1) * dur);
    });
  } catch (e) { /* おとが でなくても OK */ }
}
const soundCorrect = () => beep([660, 880], 0.12);
const soundWrong = () => beep([220, 180], 0.18);
const soundCoin = () => beep([880, 1175, 1568], 0.09);

function speak(text) {
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.9;
    speechSynthesis.speak(u);
  } catch (e) { /* よみあげ ひたいおう */ }
}

// ---------- 画面遷移 ----------
const $ = (id) => document.getElementById(id);

function showScreen(name) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $("screen-" + name).classList.add("active");
  const nav = $("navbar");
  const withNav = ["home", "map", "shop", "closet", "town"];
  nav.classList.toggle("hidden", !withNav.includes(name));
  nav.querySelectorAll("button").forEach((b) =>
    b.classList.toggle("active", b.dataset.screen === name));
  // 画面ごとの描画
  if (name === "home") renderHome();
  if (name === "map") renderMap();
  if (name === "shop") renderShop();
  if (name === "closet") renderCloset();
  if (name === "town") renderTown();
}

document.querySelectorAll("#navbar button").forEach((b) => {
  b.addEventListener("click", () => showScreen(b.dataset.screen));
});

// ---------- タイトル ----------
$("btn-start").addEventListener("click", () => {
  const existing = load();
  if (existing) { state = existing; showScreen("home"); }
  else startMaker();
});
$("btn-reset").addEventListener("click", () => {
  if (confirm("ほんとうに さいしょから やりなおす？ いままでの きろくは きえちゃうよ！")) {
    localStorage.removeItem(SAVE_KEY);
    location.reload();
  }
});
if (load()) {
  $("btn-start").textContent = "つづきから";
  $("btn-reset").classList.remove("hidden");
}

// ---------- キャラつくり ----------
let makerCfg = null;

const MAKER_ROWS = [
  { key: "skin", label: "はだのいろ", type: "color", values: SKIN_COLORS },
  { key: "hairStyle", label: "かみがた", type: "opts",
    values: HAIR_STYLES, labels: ["みじかい", "ツンツン", "ロング", "ツインテール"] },
  { key: "hairColor", label: "かみのいろ", type: "color", values: HAIR_COLORS },
  { key: "eyes", label: "め", type: "opts", values: EYE_STYLES, labels: ["まんまる", "にこにこ", "キラキラ"] },
  { key: "shirt", label: "ふくのいろ", type: "color", values: SHIRT_COLORS_FREE, raw: true },
];

function startMaker() {
  makerCfg = defaultState().avatar;
  const box = $("maker-controls");
  box.innerHTML = "";
  MAKER_ROWS.forEach((row) => {
    const div = document.createElement("div");
    div.className = "maker-row";
    div.innerHTML = `<div class="maker-row-label">${row.label}</div>`;
    const opts = document.createElement("div");
    opts.className = "maker-opts";
    row.values.forEach((v, i) => {
      const btn = document.createElement("button");
      const value = row.type === "color" && !row.raw ? i : v;
      btn.dataset.value = String(value);
      if (row.type === "color") {
        btn.className = "maker-opt color-opt";
        btn.style.background = row.raw ? v : row.values[i];
      } else {
        btn.className = "maker-opt";
        btn.textContent = row.labels[i];
      }
      btn.addEventListener("click", () => {
        makerCfg[row.key] = row.type === "color" && !row.raw ? i : v;
        opts.querySelectorAll(".maker-opt").forEach((o) => o.classList.remove("selected"));
        btn.classList.add("selected");
        $("maker-avatar").innerHTML = renderAvatar(makerCfg);
      });
      if (String(makerCfg[row.key]) === String(value)) btn.classList.add("selected");
      opts.appendChild(btn);
    });
    div.appendChild(opts);
    box.appendChild(div);
  });
  $("maker-avatar").innerHTML = renderAvatar(makerCfg);
  showScreen("maker");
}

$("btn-maker-done").addEventListener("click", () => {
  if (!makerCfg) return; // キャラつくりを ひらいていない ときは むし
  const name = $("input-name").value.trim() || "きみ";
  state = defaultState();
  state.name = name;
  state.avatar = makerCfg;
  save();
  speak(`${name}、まなびタウンへ ようこそ！`);
  showScreen("home");
});

// ---------- ホーム ----------
const HOME_LINES = [
  "きょうも べんきょう がんばろう！",
  "コインを ためて おかいものしよう🪙",
  "まちに トモダチが ふえるといいな！",
  "「べんきょう」ボタンから しゅっぱつ！",
  "きせかえも できるよ👕",
];
function renderHome() {
  $("status-name").textContent = state.name;
  $("status-coins").textContent = state.coins;
  $("status-stars").textContent = totalStars();
  $("home-avatar").innerHTML = renderAvatar(state.avatar);
  // へやのかざり
  const itemsBox = $("room-items");
  itemsBox.innerHTML = "";
  SHOP_ITEMS.filter((i) => i.cat === "room" && state.owned.includes(i.id)).forEach((i) => {
    const d = document.createElement("div");
    d.className = "room-item";
    d.textContent = i.icon;
    d.style.left = i.pos.left;
    d.style.bottom = i.pos.bottom;
    itemsBox.appendChild(d);
  });
}
$("home-avatar").addEventListener("click", () => {
  const line = HOME_LINES[rnd(HOME_LINES.length)];
  const bubble = $("home-bubble");
  bubble.textContent = line;
  bubble.classList.remove("hidden");
  speak(line);
  clearTimeout(bubble._t);
  bubble._t = setTimeout(() => bubble.classList.add("hidden"), 3500);
});

// ---------- べんきょうマップ ----------
function renderMap() {
  $("map-coins").textContent = state.coins;
  const list = $("map-list");
  list.innerHTML = "";
  const maxLv = maxCleared();
  LEVELS.forEach((def) => {
    const chap = CHAPTERS.find((c) => c.start === def.lv);
    if (chap) {
      const h = document.createElement("div");
      h.className = "map-chapter";
      h.textContent = chap.name;
      list.appendChild(h);
    }
    const stars = state.cleared[def.lv] || 0;
    const unlocked = def.lv <= maxLv + 1;
    const btn = document.createElement("button");
    btn.className = "level-btn" + (stars ? " cleared" : "") + (unlocked ? "" : " locked");
    btn.innerHTML = `
      <span class="lv-num">${unlocked ? def.lv : "🔒"}</span>
      <span class="lv-info">
        <div>${def.title}</div>
        <div class="lv-stars">${stars ? "⭐".repeat(stars) + "☆".repeat(3 - stars) : (unlocked ? "まだ クリアしてないよ" : "")}</div>
      </span>`;
    if (unlocked) btn.addEventListener("click", () => startQuiz(def));
    list.appendChild(btn);
  });
}

// ---------- クイズ ----------
let quiz = null; // { def, questions, index, correct, locked }

function startQuiz(def) {
  quiz = { def, questions: buildQuestionSet(def), index: 0, correct: 0, locked: false };
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  $("quiz-progress").textContent =
    "●".repeat(quiz.index) + "○".repeat(QUESTIONS_PER_LEVEL - quiz.index) +
    `　${quiz.index + 1}/${QUESTIONS_PER_LEVEL}`;
  $("quiz-question").textContent = q.text;
  $("quiz-visual").innerHTML = q.visual || "";
  $("quiz-feedback").classList.add("hidden");
  const box = $("quiz-choices");
  box.innerHTML = "";
  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = c;
    btn.addEventListener("click", () => answerQuestion(i, btn));
    box.appendChild(btn);
  });
  quiz.locked = false;
  speak(q.speak);
}

function answerQuestion(i, btn) {
  if (quiz.locked) return;
  quiz.locked = true;
  const q = quiz.questions[quiz.index];
  const buttons = document.querySelectorAll(".choice-btn");
  buttons.forEach((b) => (b.disabled = true));
  const fb = $("quiz-feedback");
  fb.classList.remove("hidden");
  if (i === q.answer) {
    quiz.correct++;
    btn.classList.add("correct");
    fb.textContent = pick(["せいかい！ 🎉", "すごい！ ⭕", "やったね！ ✨", "ピンポーン！ 🔔"]);
    soundCorrect();
  } else {
    btn.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    fb.textContent = `ざんねん…こたえは「${q.choices[q.answer]}」`;
    soundWrong();
  }
  setTimeout(() => {
    quiz.index++;
    if (quiz.index < QUESTIONS_PER_LEVEL) renderQuestion();
    else finishQuiz();
  }, i === q.answer ? 1100 : 2200);
}

$("btn-quiz-quit").addEventListener("click", () => {
  speechSynthesis.cancel();
  showScreen("map");
});
$("btn-speak").addEventListener("click", () => {
  if (quiz) speak(quiz.questions[quiz.index].speak);
});

// ---------- けっか ----------
function starsFor(correct) {
  if (correct >= 5) return 3;
  if (correct === 4) return 2;
  if (correct === 3) return 1;
  return 0;
}

function finishQuiz() {
  const { def, correct } = quiz;
  const stars = starsFor(correct);
  const passed = stars > 0;
  const before = maxCleared();
  let coinsEarned = 0;
  const unlocks = [];

  if (passed) {
    const firstTime = !state.cleared[def.lv];
    coinsEarned = firstTime ? COIN_CLEAR : COIN_REPLAY;
    if (correct === 5) coinsEarned += COIN_PERFECT;
    state.coins += coinsEarned;
    state.cleared[def.lv] = Math.max(state.cleared[def.lv] || 0, stars);

    // あたらしい かいほう を チェック
    const after = maxCleared();
    if (after > before) {
      FRIENDS.filter((f) => f.unlockLv > before && f.unlockLv <= after)
        .forEach((f) => unlocks.push(`🏠 ${f.name}が まちに ひっこしてきた！`));
      PETS.filter((p) => p.unlockLv > before && p.unlockLv <= after)
        .forEach((p) => unlocks.push(`${p.icon} ペットの ${p.name}が なかまになった！`));
      const newItems = SHOP_ITEMS.filter((i) => i.unlockLv > before && i.unlockLv <= after);
      if (newItems.length) unlocks.push(`🛍️ おみせに あたらしい しなもの が ${newItems.length}こ ならんだ！`);
    }
    save();
  }

  $("result-emoji").textContent = passed ? (correct === 5 ? "🏆" : "🎉") : "😢";
  $("result-title").textContent = passed
    ? (correct === 5 ? "パーフェクト！" : "クリア！")
    : "もうすこし！";
  $("result-stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
  $("result-detail").textContent = `${QUESTIONS_PER_LEVEL}もん中 ${correct}もん せいかい！`;
  $("result-reward").textContent = passed ? `🪙 ${coinsEarned}コイン ゲット！` : "3もん いじょう せいかいで クリアだよ";
  $("result-unlock").innerHTML = unlocks.join("<br>");
  showScreen("result");

  if (passed) {
    soundCoin();
    launchConfetti(correct === 5 ? 60 : 30);
    speak(correct === 5 ? "パーフェクト！すごい！" : "クリア！おめでとう！");
  } else {
    speak("おしい！もういちど やってみよう！");
  }
}

$("btn-result-ok").addEventListener("click", () => showScreen("map"));

// ---------- おみせ ----------
let shopTab = "hat";

function renderShop() {
  $("shop-coins").textContent = state.coins;
  const tabs = $("shop-tabs");
  tabs.innerHTML = "";
  SHOP_CATS.forEach((c) => {
    const b = document.createElement("button");
    b.className = "tab-btn" + (c.id === shopTab ? " selected" : "");
    b.textContent = c.name;
    b.addEventListener("click", () => { shopTab = c.id; renderShop(); });
    tabs.appendChild(b);
  });
  const list = $("shop-list");
  list.innerHTML = "";
  const maxLv = maxCleared();
  SHOP_ITEMS.filter((i) => i.cat === shopTab).forEach((item) => {
    const owned = state.owned.includes(item.id);
    const unlocked = item.unlockLv <= maxLv || item.unlockLv <= 1;
    const canBuy = unlocked && !owned && state.coins >= item.price;
    const div = document.createElement("div");
    div.className = "shop-item" + (owned ? " owned" : "") + (unlocked ? "" : " locked");
    div.innerHTML = `
      <div class="item-icon">${item.icon}</div>
      <div class="item-name">${item.name}</div>
      ${unlocked
        ? `<button class="buy-btn" ${owned || !canBuy ? "disabled" : ""}>${owned ? "もってる✓" : `🪙${item.price}`}</button>`
        : `<div class="item-lock">レベル${item.unlockLv}を<br>クリアでとうじょう</div>`}`;
    if (canBuy) {
      div.querySelector(".buy-btn").addEventListener("click", () => {
        state.coins -= item.price;
        state.owned.push(item.id);
        save();
        soundCoin();
        speak(`${item.name}を かったよ！`);
        renderShop();
      });
    }
    list.appendChild(div);
  });
}

// ---------- きせかえ ----------
function renderCloset() {
  $("closet-avatar").innerHTML = renderAvatar(state.avatar);
  const list = $("closet-list");
  list.innerHTML = "";

  const sections = [
    { cat: "hat", key: "hat", title: "ぼうし" },
    { cat: "glasses", key: "glasses", title: "めがね" },
    { cat: "shirt", key: "shirt", title: "ふく" },
    { cat: "item", key: "item", title: "もちもの" },
  ];
  sections.forEach((sec) => {
    const title = document.createElement("div");
    title.className = "closet-cat-title";
    title.textContent = sec.title;
    list.appendChild(title);
    const box = document.createElement("div");
    box.className = "closet-items";

    // 「なし」/ きほんのふく
    if (sec.cat === "shirt") {
      SHIRT_COLORS_FREE.forEach((c) => box.appendChild(closetBtn("💙", "きほん", sec.key, c, c)));
    } else {
      box.appendChild(closetBtn("🚫", "なし", sec.key, null, null));
    }
    SHOP_ITEMS.filter((i) => i.cat === sec.cat && state.owned.includes(i.id)).forEach((item) => {
      const value = sec.cat === "shirt" ? item.color : item.id;
      box.appendChild(closetBtn(item.icon, item.name, sec.key, value, value));
    });
    list.appendChild(box);
  });
}
function closetBtn(icon, name, key, value, equipVal) {
  const b = document.createElement("button");
  b.className = "closet-item" + (state.avatar[key] === equipVal ? " equipped" : "");
  b.innerHTML = `<span class="ci-icon">${icon}</span>${name}`;
  b.addEventListener("click", () => {
    state.avatar[key] = value;
    save();
    renderCloset();
  });
  return b;
}

// ---------- まち ----------
const TOWN_SLOTS = [
  { left: "8%",  bottom: "18%" }, { left: "26%", bottom: "8%" },
  { left: "44%", bottom: "20%" }, { left: "62%", bottom: "8%" },
  { left: "78%", bottom: "18%" }, { left: "36%", bottom: "34%" },
];
const PET_SLOTS = [
  { left: "16%", bottom: "4%" }, { left: "56%", bottom: "30%" },
  { left: "88%", bottom: "6%" }, { left: "70%", bottom: "32%" },
  { left: "4%",  bottom: "38%" },
];

function renderTown() {
  const box = $("town-residents");
  box.innerHTML = "";
  const maxLv = maxCleared();
  let unlockedCount = 0;

  FRIENDS.forEach((f, i) => {
    const slot = TOWN_SLOTS[i % TOWN_SLOTS.length];
    const d = document.createElement("div");
    d.className = "town-resident";
    d.style.left = slot.left;
    d.style.bottom = slot.bottom;
    if (f.unlockLv <= maxLv) {
      unlockedCount++;
      const av = { skin: f.avatar.skin, hairStyle: f.avatar.hairStyle, hairColor: f.avatar.hairColor, eyes: f.avatar.eyes, shirt: f.avatar.shirt };
      d.innerHTML = renderAvatar(av) + `<span class="tr-name">${f.name}</span>`;
      d.addEventListener("click", () => townSpeak(`${f.name}「${pick(f.lines)}」`));
    } else {
      d.className += " empty-slot";
      d.innerHTML = `🏡<span class="tr-lock">レベル${f.unlockLv}で<br>ひっこしてくる</span>`;
    }
    box.appendChild(d);
  });

  PETS.forEach((p, i) => {
    if (p.unlockLv > maxLv) return;
    unlockedCount++;
    const slot = PET_SLOTS[i % PET_SLOTS.length];
    const d = document.createElement("div");
    d.className = "town-resident";
    d.style.left = slot.left;
    d.style.bottom = slot.bottom;
    d.innerHTML = `<span class="tr-pet">${p.icon}</span><span class="tr-name">${p.name}</span>`;
    d.addEventListener("click", () => townSpeak(`${p.name}「${pick(p.lines)}」`));
    box.appendChild(d);
  });

  $("town-hint").textContent = unlockedCount === 0
    ? "べんきょうを すすめると トモダチや ペットが やってくるよ！"
    : `いま まちには ${unlockedCount}にん（ひき）の なかまが いるよ！ タップして はなしかけてみよう`;
}

function townSpeak(text) {
  const bubble = $("town-bubble");
  bubble.textContent = text;
  bubble.classList.remove("hidden");
  speak(text.replace(/[「」]/g, "、"));
  clearTimeout(bubble._t);
  bubble._t = setTimeout(() => bubble.classList.add("hidden"), 3500);
}

// ---------- 紙吹雪 ----------
const CONFETTI_GLYPHS = ["🎉", "⭐", "🌸", "💛", "🎈", "✨"];
function launchConfetti(n) {
  const layer = $("confetti-layer");
  for (let i = 0; i < n; i++) {
    const d = document.createElement("div");
    d.className = "confetti";
    d.textContent = CONFETTI_GLYPHS[rnd(CONFETTI_GLYPHS.length)];
    d.style.left = rnd(100) + "vw";
    d.style.animationDuration = 2 + Math.random() * 2 + "s";
    d.style.animationDelay = Math.random() * 0.8 + "s";
    layer.appendChild(d);
    setTimeout(() => d.remove(), 5000);
  }
}
