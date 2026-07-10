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
    foods: {},                   // たべもの { foodId: かず }
    friendship: {},              // { friendId: { hearts, } }
    friendGear: {},              // { friendId: { hat, outfit } }
    quest: null,                 // いまの おねがい
    tickets: 3,                  // つりけん（さいしょに 3まい プレゼント）
    fish: {},                    // つった さかな { fishId: かず }
    fishPlace: "pond",           // いま えらんでいる つりばしょ
    daily: null,                 // きょうのミッション
    lastGift: null,              // ログインプレゼントを もらった ひ
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
        if (!parsed.foods) parsed.foods = {};
        if (!parsed.friendship) parsed.friendship = {};
        if (!parsed.friendGear) parsed.friendGear = {};
        if (!("quest" in parsed)) parsed.quest = null;
        if (typeof parsed.tickets !== "number") parsed.tickets = 3;
        if (!parsed.fish) parsed.fish = {};
        if (!parsed.fishPlace) parsed.fishPlace = "pond";
        if (!("daily" in parsed)) parsed.daily = null;
        if (!("lastGift" in parsed)) parsed.lastGift = null;
        // ふるい quest に fish しゅるいは ないので そのまま OK
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

// よみあげ から えもじ・きごうを のぞく（「はーと」などと よまれるのを ふせぐ）
function stripForSpeech(text) {
  let s = String(text ?? "");
  try {
    // えもじ・ハート・おんぷ・ほし など（Unicode Extended_Pictographic）
    s = s.replace(/\p{Extended_Pictographic}/gu, "");
  } catch (e) {
    // ふるいブラウザ用フォールバック（はんいしてい）
    s = s.replace(/[\u{1F000}-\u{1FFFF}☀-➿⬀-⯿←-⇿]/gu, "");
  }
  return s
    .replace(/[️‍⃣❤♥♡☆★]/g, "") // VS16/ZWJ/keycap・ハート・ほし の のこり
    .replace(/\s+/g, " ")
    .trim();
}

function speak(text, voice, lang) {
  try {
    speechSynthesis.cancel();
    const clean = lang === "en-US" ? String(text).trim() : stripForSpeech(text);
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = lang || "ja-JP";
    u.rate = voice?.rate ?? 0.9;
    u.pitch = voice?.pitch ?? 1.0;
    speechSynthesis.speak(u);
  } catch (e) { /* よみあげ ひたいおう */ }
}
const friendVoice = (fid) => FRIEND_EXTRAS[fid]?.voice;
const PET_VOICE = { pitch: 1.8, rate: 1.2 };

// つづけて よみあげる（にほんご と えいごを まぜられる）
// seq: [{ t: テキスト, l: "ja" | "en" }]
function speakSeq(seq) {
  try {
    speechSynthesis.cancel();
    seq.forEach((item) => {
      const en = item.l === "en";
      const clean = en ? String(item.t).trim() : stripForSpeech(item.t);
      if (!clean) return;
      const u = new SpeechSynthesisUtterance(clean);
      u.lang = en ? "en-US" : "ja-JP";
      u.rate = en ? 0.75 : 0.9; // えいごは ゆっくり
      speechSynthesis.speak(u); // cancel せずに キューに ならべる
    });
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
  if (name === "bakery") renderBakery();
  if (name === "fishing") renderFishing();
  if (name === "zukan") renderZukan();
}

function updateHud() {
  $("hud-name").textContent = state.name;
  $("hud-coins").textContent = state.coins;
  $("hud-tickets").textContent = state.tickets;
  $("hud-stars").textContent = totalStars();
}

// ---------- トースト通知 ----------
let toastQueue = [];
let toastShowing = false;
function toast(msg) {
  toastQueue.push(msg);
  if (!toastShowing) nextToast();
}
function nextToast() {
  const msg = toastQueue.shift();
  if (!msg) { toastShowing = false; return; }
  toastShowing = true;
  const t = $("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  setTimeout(() => {
    t.classList.add("hidden");
    setTimeout(nextToast, 250);
  }, 2600);
}

// ---------- きょうのミッション ----------
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}
// まいにち 3つ ランダムに えらぶ
function ensureDaily() {
  const today = todayStr();
  if (!state.daily || state.daily.date !== today) {
    state.daily = { date: today, ids: shuffle(DAILY_MISSION_POOL.map((m) => m.id)).slice(0, 3), done: {}, bonus: false };
    save();
  }
}
// ミッションたっせい チェック（かんりょうずみなら なにもしない）
function dailyProgress(id) {
  if (!state.daily || state.daily.date !== todayStr()) ensureDaily();
  const d = state.daily;
  if (!d.ids.includes(id) || d.done[id]) return;
  d.done[id] = true;
  state.tickets += TICKET_MISSION;
  const m = DAILY_MISSION_POOL.find((x) => x.id === id);
  toast(`📝 ミッションたっせい！「${m.label}」 🎫+${TICKET_MISSION}`);
  soundCoin();
  if (d.ids.every((i) => d.done[i]) && !d.bonus) {
    d.bonus = true;
    state.coins += MISSION_BONUS_COINS;
    toast(`🎉 きょうのミッション ぜんぶクリア！ 🪙+${MISSION_BONUS_COINS}`);
    launchConfetti(30);
  }
  save();
  updateHud();
}

function renderMissions() {
  ensureDaily();
  const list = $("mission-list");
  list.innerHTML = "";
  state.daily.ids.forEach((id) => {
    const m = DAILY_MISSION_POOL.find((x) => x.id === id);
    const done = !!state.daily.done[id];
    const div = document.createElement("div");
    div.className = "mission-item" + (done ? " done" : "");
    div.innerHTML = `<span class="mi-check">${done ? "✅" : "⬜"}</span><span class="mi-icon">${m.icon}</span><span class="mi-label">${m.label}</span>`;
    list.appendChild(div);
  });
}
$("btn-missions").addEventListener("click", () => {
  renderMissions();
  $("mission-overlay").classList.remove("hidden");
});
$("btn-mission-close").addEventListener("click", () => $("mission-overlay").classList.add("hidden"));

// ---------- ログインプレゼント（1にち 1かい） ----------
function checkLoginGift() {
  const today = todayStr();
  if (state.lastGift === today) return;
  const unlocked = FRIENDS.filter((f) => f.unlockLv <= maxCleared());
  state.lastGift = today;
  const roll = rnd(3);
  let giftMsg;
  if (roll === 0) { state.tickets += 2; giftMsg = "つりけん 🎫2まい"; }
  else if (roll === 1) { state.coins += 20; giftMsg = "🪙20コイン"; }
  else {
    const food = pick(FOODS);
    state.foods[food.id] = (state.foods[food.id] || 0) + 1;
    giftMsg = `${food.icon}${food.name}`;
  }
  save();
  updateHud();
  const from = unlocked.length ? pick(unlocked).name : "まちのみんな";
  toast(`🎁 きょうのプレゼント！ ${from}から ${giftMsg}を もらったよ！`);
  soundCoin();
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
  quiz = { def, questions: buildQuestionSet(def), index: 0, correct: 0, locked: false,
    total: def.questions || QUESTIONS_PER_LEVEL };
  showScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = quiz.questions[quiz.index];
  $("quiz-progress").textContent =
    "●".repeat(quiz.index) + "○".repeat(quiz.total - quiz.index) +
    `　${quiz.index + 1}/${quiz.total}`;
  $("quiz-question").textContent = q.text;
  $("quiz-visual").innerHTML = q.visual || "";
  $("quiz-feedback").classList.add("hidden");
  const box = $("quiz-choices");
  box.innerHTML = "";
  q.choices.forEach((c, i) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    if (q.choiceLang === "en") {
      // よめない えいたんご よう: 🔊で その たんごだけ よみあげ（こたえには ならない）
      const sp = document.createElement("span");
      sp.className = "choice-speak";
      sp.textContent = "🔊";
      sp.addEventListener("click", (e) => {
        e.stopPropagation();
        if (!quiz.locked) speak(c, null, "en-US");
      });
      btn.appendChild(sp);
      btn.appendChild(document.createTextNode(c));
    } else {
      btn.textContent = c;
    }
    btn.addEventListener("click", () => answerQuestion(i, btn));
    box.appendChild(btn);
  });
  quiz.locked = false;
  if (q.speakSeq) speakSeq(q.speakSeq);
  else speak(q.speak);
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
    // えいごの もんだいは せいかいすると はつおんが きける
    if (q.sayEn) setTimeout(() => speak(q.sayEn, { rate: 0.85 }, "en-US"), 300);
  } else {
    btn.classList.add("wrong");
    buttons[q.answer].classList.add("correct");
    fb.textContent = `ざんねん…こたえは「${q.choices[q.answer]}」`;
    soundWrong();
  }
  setTimeout(() => {
    quiz.index++;
    if (quiz.index < quiz.total) renderQuestion();
    else finishQuiz();
  }, i === q.answer ? (q.sayEn ? 1600 : 1100) : 2200);
}

$("btn-quiz-quit").addEventListener("click", () => {
  speechSynthesis.cancel();
  showScreen("map");
});
$("btn-speak").addEventListener("click", () => {
  if (!quiz) return;
  const q = quiz.questions[quiz.index];
  if (q.speakSeq) speakSeq(q.speakSeq);
  else speak(q.speak);
});

// ---------- けっか ----------
function starsFor(correct) {
  if (correct >= 5) return 3;
  if (correct === 4) return 2;
  if (correct === 3) return 1;
  return 0;
}

function finishQuiz() {
  const { def, correct, total } = quiz;
  const perfect = correct === total;
  // 「でんせつ」レベルは ぜんもんせいかい しないと クリアできない
  let stars, passed;
  if (def.needPerfect) { passed = perfect; stars = passed ? 3 : 0; }
  else { stars = starsFor(correct); passed = stars > 0; }
  const before = maxCleared();
  let coinsEarned = 0;
  const unlocks = [];

  let ticketsEarned = 0;
  if (passed) {
    const firstTime = !state.cleared[def.lv];
    coinsEarned = firstTime ? COIN_CLEAR : COIN_REPLAY;
    if (perfect) coinsEarned += COIN_PERFECT;
    if (firstTime) ticketsEarned += TICKET_FIRST_CLEAR;
    if (perfect) ticketsEarned += TICKET_PERFECT;
    // ごうかほうしゅう つきの レベル
    if (firstTime && def.rewardCoins) coinsEarned += def.rewardCoins;
    if (firstTime && def.rewardTickets) ticketsEarned += def.rewardTickets;
    if (firstTime && def.needPerfect) unlocks.push("👑 でんせつのテストを せいは！きみは ほんものの べんきょうマスターだ！！");
    state.coins += coinsEarned;
    state.tickets += ticketsEarned;
    state.cleared[def.lv] = Math.max(state.cleared[def.lv] || 0, stars);
    dailyProgress("school");

    const after = maxCleared();
    if (after > before) {
      FRIENDS.filter((f) => f.unlockLv > before && f.unlockLv <= after)
        .forEach((f) => unlocks.push(`🏠 ${f.name}が まちに ひっこしてきた！あいにいこう！`));
      PETS.filter((p) => p.unlockLv > before && p.unlockLv <= after)
        .forEach((p) => unlocks.push(`${p.icon} ペットの ${p.name}が こうえんに やってきた！`));
      const newItems = SHOP_ITEMS.filter((i) => i.unlockLv > before && i.unlockLv <= after);
      if (newItems.length) unlocks.push(`🛍️ おみせに あたらしい しなもの が ${newItems.length}こ ならんだ！`);
      FISHING_PLACES.filter((p) => p.unlockLv > before && p.unlockLv <= after)
        .forEach((p) => unlocks.push(`🎣 あたらしい つりばしょ「${p.name}」に いけるようになった！`));
    }
    const questMsg = questOnSchoolClear(def.lv);
    if (questMsg) unlocks.push(questMsg);
    save();
  }

  $("result-emoji").textContent = passed ? (perfect ? "🏆" : "🎉") : "😢";
  $("result-title").textContent = passed
    ? (def.needPerfect ? "でんせつクリア！！" : perfect ? "パーフェクト！" : "クリア！")
    : "もうすこし！";
  $("result-stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
  $("result-detail").textContent = `${total}もん中 ${correct}もん せいかい！`;
  $("result-reward").textContent = passed
    ? `🪙${coinsEarned}コイン${ticketsEarned ? ` ＋ つりけん🎫${ticketsEarned}まい` : ""} ゲット！`
    : (def.needPerfect ? `${total}もん れんぞく せいかいで クリアだよ！` : "3もん いじょう せいかいで クリアだよ");
  $("result-unlock").innerHTML = unlocks.join("<br>");
  resultReturnScreen = "map";
  showScreen("result");

  if (passed) {
    soundCoin();
    launchConfetti(def.needPerfect ? 100 : perfect ? 60 : 30);
    speak(def.needPerfect ? "でんせつクリア！きみは べんきょうマスターだ！" : perfect ? "パーフェクト！すごい！" : "クリア！おめでとう！");
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

// ---------- なかよしど（ハート） ----------
function fdata(fid) {
  state.friendship[fid] = state.friendship[fid] || { hearts: 0 };
  return state.friendship[fid];
}
function heartTitle(h) {
  return HEART_TITLES.find((t) => h >= t.min).title;
}
// ハートを ふやす。マイルストーンで トモダチから プレゼント。おれいメッセージの配列を返す
function addHearts(fid, n) {
  const fd = fdata(fid);
  const before = fd.hearts;
  fd.hearts = Math.min(HEART_MAX, fd.hearts + n);
  const msgs = [];
  HEART_GIFT_LEVELS.filter((lv) => before < lv && fd.hearts >= lv).forEach(() => {
    const candidates = SHOP_ITEMS.filter((i) => !state.owned.includes(i.id) && i.price <= 150 && i.cat !== "room");
    if (candidates.length) {
      const it = pick(candidates);
      state.owned.push(it.id);
      msgs.push(`おれいに「${it.name}」をくれた！🎁`);
    } else {
      state.coins += 50;
      msgs.push("おれいに 50コインくれた！🪙");
    }
  });
  save();
  return msgs;
}

// ---------- おねがいクエスト ----------
function friendById(fid) { return FRIENDS.find((f) => f.id === fid); }

// まちに もどるたびに、おねがいが なければ だれかに わりあてる
function assignQuestIfNeeded() {
  if (state.quest) return;
  const unlocked = FRIENDS.filter((f) => f.unlockLv <= maxCleared());
  if (!unlocked.length) return;
  const f = pick(unlocked);
  const kind = pick(["food", "school", "typing", "fish"]);
  if (kind === "food") {
    state.quest = { friendId: f.id, kind, foodId: pick(FOODS).id, met: false, asked: false };
  } else if (kind === "fish") {
    // いける つりばしょの さかな（ふつう/めずらしい）から えらぶ
    const okPlaces = FISHING_PLACES.filter((p) => p.unlockLv <= maxCleared()).map((p) => p.id);
    const target = pick(FISHES.filter((fs) =>
      okPlaces.includes(fs.place) && (fs.rarity === "normal" || fs.rarity === "rare")));
    state.quest = { friendId: f.id, kind, fishId: target.id, met: false, asked: false };
  } else if (kind === "school") {
    const next = Math.min(maxCleared() + 1, LEVELS.length);
    const level = state.cleared[next] ? rndInt(1, LEVELS.length) : next;
    state.quest = { friendId: f.id, kind, level, met: false, asked: false };
  } else {
    const course = pick(TYPING_COURSES).id;
    const level = Math.min(state.typing[course], TYPING_MAX_LEVEL);
    state.quest = { friendId: f.id, kind, course, level, met: false, asked: false };
  }
  save();
}

function questAskLine(q) {
  const f = friendById(q.friendId);
  if (q.kind === "food") {
    const food = FOOD_MAP[q.foodId];
    return `おなかすいたなあ…${food.name}${food.icon}が たべたいな。たべものやさんで かってきて くれる？`;
  }
  if (q.kind === "fish") {
    const fish = FISH_MAP[q.fishId];
    return `つりばで「${fish.name}」を つって みせてほしいな！${RARITY_INFO[fish.rarity].stars}の さかなだよ`;
  }
  if (q.kind === "school") {
    const def = LEVELS[q.level - 1];
    return `がっこうの レベル${q.level}「${def.title}」を クリアするところが みたいな！`;
  }
  const cName = TYPING_COURSES.find((c) => c.id === q.course).name;
  return `タイピングどうじょうの ${cName} レベル${q.level}を ぜんもんせいかい してみせて！`;
}

function questChipText(q) {
  const f = friendById(q.friendId);
  if (!q.asked) return `❗ ${f.name}が よんでいるよ`;
  if (q.kind === "food") return `📋 ${f.name}に ${FOOD_MAP[q.foodId].name}${FOOD_MAP[q.foodId].icon}を とどけよう`;
  if (q.kind === "fish") return `📋 つりばで ${FISH_MAP[q.fishId].name}を つろう🎣`;
  if (q.kind === "school") return `📋 がっこう レベル${q.level}を クリアしよう`;
  return `📋 タイピング(${TYPING_COURSES.find((c) => c.id === q.course).name}) レベル${q.level}を クリアしよう`;
}

// おねがいが かなえられる じょうたいか
function questReady(q) {
  if (q.kind === "food") return (state.foods[q.foodId] || 0) > 0;
  if (q.kind === "fish") return (state.fish[q.fishId] || 0) > 0;
  return q.met;
}

// トモダチを タップ/ほうもん したときの クエストかいわ。null なら ふつうのセリフ
function questInteract(f) {
  const q = state.quest;
  if (!q || q.friendId !== f.id) return null;
  const ex = FRIEND_EXTRAS[f.id];
  if (!q.asked) {
    q.asked = true;
    save();
    return { text: questAskLine(q), voice: ex.voice };
  }
  if (questReady(q)) {
    if (q.kind === "food") state.foods[q.foodId]--;
    // fish は「みせるだけ」なので へらさない（ずかんを まもるため）
    state.coins += QUEST_REWARD_COINS;
    state.tickets += TICKET_QUEST;
    const heartMsgs = addHearts(f.id, q.kind === "food" && q.foodId === ex.favFood ? 2 : 1);
    state.quest = null;
    save();
    launchConfetti(20);
    soundCoin();
    dailyProgress("quest");
    updateHud();
    const extra = [`🪙${QUEST_REWARD_COINS} 🎫${TICKET_QUEST} ❤️なかよしど アップ！`, ...heartMsgs].join("　");
    return { text: `${pick(ex.questThanks)}　${extra}`, voice: ex.voice, completed: true };
  }
  return { text: ex.remind, voice: ex.voice };
}

// がっこう・タイピングの クリアで おねがい たっせい チェック
function questOnSchoolClear(lv) {
  const q = state.quest;
  if (q && q.kind === "school" && q.level === lv && !q.met) {
    q.met = true;
    save();
    return `📋 ${friendById(q.friendId).name}との やくそく たっせい！はなしに いこう！`;
  }
  return null;
}
function questOnTypingClear(course, lv, perfect) {
  const q = state.quest;
  if (perfect && q && q.kind === "typing" && q.course === course && q.level === lv && !q.met) {
    q.met = true;
    save();
    return `📋 ${friendById(q.friendId).name}との やくそく たっせい！はなしに いこう！`;
  }
  return null;
}

// ---------- たべものやさん ----------
function renderBakery() {
  $("bakery-coins").textContent = state.coins;
  const list = $("bakery-list");
  list.innerHTML = "";
  FOODS.forEach((food) => {
    const count = state.foods[food.id] || 0;
    const canBuy = state.coins >= food.price;
    const div = document.createElement("div");
    div.className = "shop-item";
    div.innerHTML = `
      <div class="item-icon">${food.icon}</div>
      <div class="item-name">${food.name}${count ? `<br><span class="food-count">もってる: ${count}こ</span>` : ""}</div>
      <button class="buy-btn" ${canBuy ? "" : "disabled"}>🪙${food.price}</button>`;
    div.querySelector(".buy-btn").addEventListener("click", () => {
      if (state.coins < food.price) return;
      state.coins -= food.price;
      state.foods[food.id] = (state.foods[food.id] || 0) + 1;
      save();
      soundCoin();
      speak(`${food.name}を かったよ！`);
      renderBakery();
    });
    list.appendChild(div);
  });
}

// ---------- えらぶモーダル ----------
function openPicker(title, entries) {
  $("picker-title").textContent = title;
  const list = $("picker-list");
  list.innerHTML = "";
  if (!entries.length) {
    list.innerHTML = `<p class="picker-empty">まだ なにも もっていないよ…<br>おみせや たべものやさんに いってみよう！</p>`;
  }
  entries.forEach((e) => {
    const b = document.createElement("button");
    b.className = "picker-item";
    b.innerHTML = `<span class="pi-icon">${e.icon}</span><span>${e.label}</span>${e.sub ? `<span class="pi-sub">${e.sub}</span>` : ""}`;
    b.addEventListener("click", () => { closePicker(); e.onPick(); });
    list.appendChild(b);
  });
  $("picker-overlay").classList.remove("hidden");
}
function closePicker() { $("picker-overlay").classList.add("hidden"); }
$("btn-picker-close").addEventListener("click", closePicker);

// ---------- トモダチのいえ ----------
const FRIEND_DECO = ["🪟", "🖼️", "🪴", "🛋️", "📚", "🧸"];

function friendAvatarCfg(f) {
  const gear = state.friendGear[f.id] || {};
  return { ...f.avatar, hat: gear.hat || null, outfit: gear.outfit || null };
}

function renderFriendHearts() {
  const f = currentFriend;
  const fd = fdata(f.id);
  // つぎの しょうごうまでの ゲージ
  const next = HEART_TITLES.slice().reverse().find((t) => t.min > fd.hearts);
  $("friend-hearts").innerHTML =
    `<span class="heart-title">${heartTitle(fd.hearts)}</span> ❤️${fd.hearts}/${HEART_MAX}` +
    (next ? `<span class="heart-next">（あと${next.min - fd.hearts}で ${next.title}）</span>` : "");
}

function renderFriendRoom() {
  const f = currentFriend;
  if (!f) { showScreen("town"); return; }
  $("friend-title").textContent = `🏠 ${f.name}のいえ`;
  $("friend-wall").style.background = `linear-gradient(180deg, ${f.houseColor}33, ${f.houseColor}22)`;
  $("friend-avatar").innerHTML = renderAvatar(friendAvatarCfg(f));
  renderFriendHearts();
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
  // はいったら あいさつ（おねがいが あれば そっちを ゆうせん）
  setTimeout(() => {
    const qi = questInteract(f);
    if (qi) { friendSay(qi.text, f); renderFriendHearts(); }
    else friendSay(pick(f.lines), f);
  }, 400);
}

function friendSay(line, f) {
  const bubble = $("friend-bubble");
  bubble.textContent = line;
  bubble.classList.remove("hidden");
  speak(line, f ? friendVoice(f.id) : undefined);
  clearTimeout(bubble._t);
  bubble._t = setTimeout(() => bubble.classList.add("hidden"), 4200);
}
$("friend-avatar").addEventListener("click", () => {
  const f = currentFriend;
  if (!f) return;
  const qi = questInteract(f);
  if (qi) { friendSay(qi.text, f); renderFriendHearts(); }
  else friendSay(pick(f.lines), f);
});

// たべものを あげる
$("btn-give-food").addEventListener("click", () => {
  const f = currentFriend;
  if (!f) return;
  const entries = FOODS.filter((food) => (state.foods[food.id] || 0) > 0).map((food) => ({
    icon: food.icon,
    label: food.name,
    sub: `もってる: ${state.foods[food.id]}こ`,
    onPick: () => giveFood(f, food),
  }));
  openPicker(`${f.name}に なにを あげる？`, entries);
});

function giveFood(f, food) {
  const ex = FRIEND_EXTRAS[f.id];
  const q = state.quest;
  // おねがいの たべものなら クエストたっせい
  if (q && q.friendId === f.id && q.kind === "food" && q.foodId === food.id && q.asked) {
    const qi = questInteract(f); // ここで しょうひ・ほうしゅう
    friendSay(qi.text, f);
    renderFriendHearts();
    return;
  }
  state.foods[food.id]--;
  dailyProgress("feed");
  let line, hearts;
  if (food.id === ex.favFood) { line = ex.foodLove; hearts = 2; launchConfetti(15); }
  else if (food.id === ex.badFood) { line = ex.foodBad; hearts = 0; }
  else { line = ex.foodOk; hearts = 1; }
  const msgs = hearts ? addHearts(f.id, hearts) : [];
  save();
  if (hearts) soundCorrect();
  friendSay([line, ...(hearts ? [`❤️なかよしど +${hearts}`] : []), ...msgs].join("　"), f);
  renderFriendHearts();
}

// プレゼントを あげる（ぼうし・おようふく）
$("btn-give-gift").addEventListener("click", () => {
  const f = currentFriend;
  if (!f) return;
  const gear = state.friendGear[f.id] || {};
  const entries = SHOP_ITEMS
    .filter((i) => (i.cat === "hat" || i.cat === "outfit") && state.owned.includes(i.id))
    .filter((i) => gear.hat !== i.id && gear.outfit !== i.id)
    .map((i) => ({
      icon: i.img ? `<img class="ci-img" src="${i.img}" alt="">` : i.icon,
      label: i.name,
      onPick: () => giveGift(f, i),
    }));
  openPicker(`${f.name}に なにを プレゼントする？`, entries);
});

function giveGift(f, item) {
  state.friendGear[f.id] = state.friendGear[f.id] || {};
  const slot = item.cat === "hat" ? "hat" : "outfit";
  state.friendGear[f.id][slot] = item.id;
  const msgs = addHearts(f.id, 1);
  save();
  soundCorrect();
  launchConfetti(15);
  $("friend-avatar").innerHTML = renderAvatar(friendAvatarCfg(f));
  friendSay([pick(FRIEND_EXTRAS[f.id].giftThanks), "❤️なかよしど +1", ...msgs].join("　"), f);
  renderFriendHearts();
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

// ---------- タイピングどうじょう・つりば そうさ とうろく ----------
setupTypingControls();
setupFishingControls();
