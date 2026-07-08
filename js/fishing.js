/* ================= つりば ＆ さかなずかん ================= */
// つりけん（🎫）1まいで 1かい つれる。しっぱいは ない（6さい むけ）。
// レアどは かくりつ で きまり、でんせつ/きせき は がっこうの しんこうで かいきん。

let fishingBusy = false;
let fishingTimer = null;

// ---------- ちゅうせん ----------
function rollFish() {
  const maxLv = maxCleared();
  const tiers = Object.entries(RARITY_INFO).filter(([, info]) => maxLv >= info.minLv);
  const totalW = tiers.reduce((s, [, i]) => s + i.weight, 0);
  let r = Math.random() * totalW;
  let rarity = tiers[0][0];
  for (const [id, info] of tiers) {
    r -= info.weight;
    if (r <= 0) { rarity = id; break; }
  }
  return pick(FISHES.filter((f) => f.rarity === rarity));
}

// ---------- つり画面 ----------
function renderFishing() {
  updateHud();
  document.getElementById("fishing-tickets").textContent = state.tickets;
  const caught = Object.keys(state.fish).length;
  document.getElementById("fishing-zukan-count").textContent = `${caught}/${FISHES.length}`;
  resetFishingStage();
}

function resetFishingStage() {
  clearTimeout(fishingTimer);
  fishingBusy = false;
  document.getElementById("fish-result").classList.add("hidden");
  document.getElementById("fishing-stage").className = "fishing-stage";
  const btn = document.getElementById("btn-cast");
  btn.disabled = false;
  btn.textContent = state.tickets > 0 ? "🎣 つりをする（🎫1まい）" : "🎫が ないよ…";
  document.getElementById("fishing-msg").textContent =
    state.tickets > 0 ? "ボタンを おして さかなを つろう！" : "つりけんは べんきょうや おねがいで もらえるよ！";
}

function startCast() {
  if (fishingBusy) return;
  if (state.tickets <= 0) {
    speak("つりけんが ないよ。べんきょうや おねがいで あつめよう！");
    return;
  }
  fishingBusy = true;
  state.tickets--;
  save();
  updateHud();
  document.getElementById("fishing-tickets").textContent = state.tickets;

  const stage = document.getElementById("fishing-stage");
  const btn = document.getElementById("btn-cast");
  const msg = document.getElementById("fishing-msg");
  btn.disabled = true;
  btn.textContent = "・・・";
  stage.className = "fishing-stage waiting";
  msg.textContent = "しずかに まってみよう…";
  beep([392, 330], 0.12);

  // 1.2〜3びょう まってから あたり！
  fishingTimer = setTimeout(() => {
    stage.className = "fishing-stage biting";
    msg.textContent = "きた！！ いまだ、タップ！！";
    btn.disabled = false;
    btn.textContent = "❗ ひっぱれ！！ ❗";
    btn.classList.add("bite-btn");
    beep([880, 988, 880], 0.1);
    // 3びょう いないに おさなくても つれる（フラストレーションぼうし）
    fishingTimer = setTimeout(reelIn, 3000);
  }, 1200 + rnd(1800));
}

function reelIn() {
  clearTimeout(fishingTimer);
  const btn = document.getElementById("btn-cast");
  btn.classList.remove("bite-btn");
  btn.disabled = true;
  const stage = document.getElementById("fishing-stage");
  stage.className = "fishing-stage splash";
  soundCoin();

  const f = rollFish();
  const firstTime = !state.fish[f.id];
  state.fish[f.id] = (state.fish[f.id] || 0) + 1;
  save();
  dailyProgress("fish");

  setTimeout(() => {
    const info = RARITY_INFO[f.rarity];
    document.getElementById("fr-img").src = f.img;
    document.getElementById("fr-name").textContent = f.name;
    document.getElementById("fr-rarity").textContent = `${info.stars} ${info.label}`;
    document.getElementById("fr-new").classList.toggle("hidden", !firstTime);
    document.getElementById("fr-count").textContent = firstTime ? "ずかんに とうろくした！" : `${state.fish[f.id]}ひきめ！`;
    const result = document.getElementById("fish-result");
    result.className = "fish-result rarity-" + f.rarity;
    result.classList.remove("hidden");
    document.getElementById("fishing-zukan-count").textContent = `${Object.keys(state.fish).length}/${FISHES.length}`;

    if (f.rarity === "mythic") { launchConfetti(80); speak(`すごい！きせきの ${f.name}を つりあげた！`); }
    else if (f.rarity === "legend") { launchConfetti(45); speak(`やったー！でんせつの ${f.name}だ！`); }
    else if (firstTime) { launchConfetti(15); speak(`${f.name}を はじめて つったよ！`); }
    else speak(`${f.name}が つれたよ！`);
  }, 700);
}

// けっかカードを とじて つぎへ
function closeFishResult() {
  speechSynthesis.cancel();
  resetFishingStage();
}

// ---------- ずかん ----------
function renderZukan() {
  const caught = Object.keys(state.fish).length;
  document.getElementById("zukan-progress").textContent = `とうろく: ${caught} / ${FISHES.length}`;
  const grid = document.getElementById("zukan-grid");
  grid.innerHTML = "";
  const order = { normal: 0, rare: 1, legend: 2, mythic: 3 };
  [...FISHES].sort((a, b) => order[a.rarity] - order[b.rarity]).forEach((f) => {
    const count = state.fish[f.id] || 0;
    const info = RARITY_INFO[f.rarity];
    const div = document.createElement("div");
    div.className = "zukan-cell" + (count ? " caught rarity-" + f.rarity : "");
    div.innerHTML = count
      ? `<img src="${f.img}" alt=""><div class="zk-name">${f.name}</div><div class="zk-sub">${info.stars}　×${count}</div>`
      : `<img src="${f.img}" alt="" class="zk-shadow"><div class="zk-name">？？？</div><div class="zk-sub">${info.stars}</div>`;
    grid.appendChild(div);
  });
  // コンプリート！
  document.getElementById("zukan-complete").classList.toggle("hidden", caught < FISHES.length);
}

function setupFishingControls() {
  document.getElementById("btn-cast").addEventListener("click", () => {
    if (!fishingBusy) startCast();
    else reelIn(); // あたり中に おした
  });
  document.getElementById("btn-fish-ok").addEventListener("click", closeFishResult);
  document.getElementById("btn-open-zukan").addEventListener("click", () => showScreen("zukan"));
  document.getElementById("btn-zukan-back").addEventListener("click", () => showScreen("fishing"));
}
