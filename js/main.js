/* ================= おべんきょコレクション メインロジック ================= */

const SAVE_KEY = "manabi-town-save-v1";

// ---------- セーブデータ ----------
let state = null;
let currentFriend = null;        // いま あそびにいっている トモダチ
let resultReturnScreen = "map";  // けっかがめんの あとに もどる がめん

function defaultState() {
  return {
    name: "",
    avatar: { skin: 0, hairStyle: "short", hairColor: 0, eyes: "round", mouth: "smile", shirt: SHIRT_COLORS_FREE[0], outfit: null, hat: null, glasses: null, item: null },
    coins: 0,
    cleared: {},                 // がっこう { "1": stars, ... }
    typing: { roma: 1, math: 1 }, // タイピング いまひらいている さいだいレベル
    owned: [],                   // かった アイテムID
  };
}
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.name && parsed.avatar && typeof parsed.avatar === "object") {
        // ふるいセーブデータへの こうもく ついか（v1 → v2）
        if (!parsed.typing) parsed.typing = { roma: 1, math: 1 };
        if (!parsed.avatar.mouth) parsed.avatar.mouth = "smile";
        if (!("outfit" in parsed.avatar)) parsed.avatar.outfit = null;
        return parsed;
      }
    }
  } catch (e) { /* こわれたデータは むし */ }
  return null;
}

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
  if (name !== "town") stopTownLoop();
  // 画面ごとの描画
  if (name === "town") renderTownScreen();
  if (name === "home") renderHome();
  if (name === "map") renderMap();
  if (name === "shop") renderShop();
  if (name === "closet") renderCloset();
  if (name === "dojo") renderDojo();
  if (name === "friend") renderFriendRoom();
}

function updateHud() {
  $("hud-name").textContent = state.name;
  $("hud-coins").textContent = state.coins;
  $("hud-stars").textContent = totalStars();
}

// 「そとにでる」ボタン ぜんぶ
document.querySelectorAll(".btn-exit").forEach((b) => {
  b.addEventListener("click", () => { playDoorSound(); showScreen("town"); });
});

// ---------- タイトル ----------
$("btn-start").addEventListener("click", () => {
  const existing = load();
  if (existing) { state = existing; showScreen("town"); }
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
    values: [...HAIR_STYLES, ...PNG_HAIRS.map((p) => p.id)],
    labels: [...HAIR_LABELS, ...PNG_HAIRS.map((p) => p.name)] },
  { key: "hairColor", label: "かみのいろ", type: "color", values: HAIR_COLORS },
  { key: "eyes", label: "め", type: "opts", values: EYE_STYLES, labels: EYE_LABELS },
  { key: "mouth", label: "くち", type: "opts", values: MOUTH_STYLES, labels: MOUTH_LABELS },
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
  speak(`${name}、おべんきょコレクションの まちへ ようこそ！`);
  showScreen("town");
});

// ---------- じぶんのいえ ----------
const HOME_LINES = [
  "きょうも べんきょう がんばろう！",
  "がっこうと どうじょうで コインを あつめよう🪙",
  "まちに トモダチが ふえるといいな！",
  "タイピング れんしゅうすると かっこいいよ⌨️",
  "きせかえも できるよ👕",
];
function renderHome() {
  $("home-coins").textContent = state.coins;
  $("home-avatar").innerHTML = renderAvatar(state.avatar);
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
$("btn-open-closet").addEventListener("click", () => showScreen("closet"));
$("btn-closet-back").addEventListener("click", () => showScreen("home"));

// ---------- がっこう（べんきょうマップ） ----------
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

// ---------- クイズ（がっこう・3たくしき） ----------
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

    const after = maxCleared();
    if (after > before) {
      FRIENDS.filter((f) => f.unlockLv > before && f.unlockLv <= after)
        .forEach((f) => unlocks.push(`🏠 ${f.name}が まちに ひっこしてきた！あいにいこう！`));
      PETS.filter((p) => p.unlockLv > before && p.unlockLv <= after)
        .forEach((p) => unlocks.push(`${p.icon} ペットの ${p.name}が こうえんに やってきた！`));
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
  resultReturnScreen = "map";
  showScreen("result");

  if (passed) {
    soundCoin();
    launchConfetti(correct === 5 ? 60 : 30);
    speak(correct === 5 ? "パーフェクト！すごい！" : "クリア！おめでとう！");
  } else {
    speak("おしい！もういちど やってみよう！");
  }
}

$("btn-result-ok").addEventListener("click", () => showScreen(resultReturnScreen));

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
    const iconHtml = item.img ? `<img class="item-img" src="${item.img}" alt="">` : item.icon;
    div.innerHTML = `
      <div class="item-icon">${iconHtml}</div>
      <div class="item-name">${item.name}</div>
      ${unlocked
        ? `<button class="buy-btn" ${owned || !canBuy ? "disabled" : ""}>${owned ? "もってる✓" : `🪙${item.price}`}</button>`
        : `<div class="item-lock">がっこうレベル${item.unlockLv}を<br>クリアでとうじょう</div>`}`;
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
    { cat: "outfit", key: "outfit", title: "おようふく" },
    { cat: "shirt", key: "shirt", title: "ふくのいろ" },
    { cat: "glasses", key: "glasses", title: "めがね" },
    { cat: "item", key: "item", title: "もちもの" },
  ];
  sections.forEach((sec) => {
    const title = document.createElement("div");
    title.className = "closet-cat-title";
    title.textContent = sec.title;
    list.appendChild(title);
    const box = document.createElement("div");
    box.className = "closet-items";

    if (sec.cat === "shirt") {
      SHIRT_COLORS_FREE.forEach((c) => box.appendChild(closetBtn("💙", "きほん", sec.key, c, c)));
    } else {
      box.appendChild(closetBtn("🚫", "なし", sec.key, null, null));
    }
    SHOP_ITEMS.filter((i) => i.cat === sec.cat && state.owned.includes(i.id)).forEach((item) => {
      const value = sec.cat === "shirt" ? item.color : item.id;
      const iconHtml = item.img ? `<img class="ci-img" src="${item.img}" alt="">` : item.icon;
      box.appendChild(closetBtn(iconHtml, item.name, sec.key, value, value));
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

// ---------- トモダチのいえ ----------
const FRIEND_DECO = ["🪟", "🖼️", "🪴", "🛋️", "📚", "🧸"];
function renderFriendRoom() {
  const f = currentFriend;
  if (!f) { showScreen("town"); return; }
  $("friend-title").textContent = `🏠 ${f.name}のいえ`;
  $("friend-wall").style.background = `linear-gradient(180deg, ${f.houseColor}33, ${f.houseColor}22)`;
  $("friend-avatar").innerHTML = renderAvatar(f.avatar);
  const deco = $("friend-deco");
  deco.innerHTML = "";
  const idx = FRIENDS.indexOf(f);
  [FRIEND_DECO[idx % FRIEND_DECO.length], FRIEND_DECO[(idx + 2) % FRIEND_DECO.length], "🪑"].forEach((e, i) => {
    const d = document.createElement("div");
    d.className = "room-item";
    d.textContent = e;
    d.style.left = ["10%", "72%", "44%"][i];
    d.style.bottom = ["10%", "28%", "6%"][i];
    deco.appendChild(d);
  });
  // はいったら あいさつ
  setTimeout(() => friendSay(pick(f.lines)), 400);
}
function friendSay(line) {
  const bubble = $("friend-bubble");
  bubble.textContent = line;
  bubble.classList.remove("hidden");
  speak(line);
  clearTimeout(bubble._t);
  bubble._t = setTimeout(() => bubble.classList.add("hidden"), 3800);
}
$("friend-avatar").addEventListener("click", () => {
  if (currentFriend) friendSay(pick(currentFriend.lines));
});

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

// ---------- タイピングどうじょう そうさ とうろく ----------
setupTypingControls();
