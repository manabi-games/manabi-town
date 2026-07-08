/* ================= タイピングどうじょう ================= */
// もんだいバンクと はんてい方式は「つりじま」から移植。
// こたえを キーボードで うって Enter（または ボタン）で はんてい。
// 5もん ぜんもん せいかいで つぎのレベルが ひらく。

function normalizeTyping(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
}

// si/shi・ti/chi などの べつのうちかたも せいかいにする
function buildRomajiAnswers(answer, aliases = []) {
  const rules = [
    ["shi", "si"], ["chi", "ti"], ["tsu", "tu"], ["fu", "hu"], ["ji", "zi"],
    ["sha", "sya"], ["shu", "syu"], ["sho", "syo"],
    ["cha", "tya"], ["chu", "tyu"], ["cho", "tyo"],
    ["ja", "zya"], ["ju", "zyu"], ["jo", "zyo"],
  ];
  const answers = new Set([answer, ...aliases].map(normalizeTyping));
  let changed = true;
  while (changed && answers.size <= 128) {
    changed = false;
    for (const [from, to] of rules) {
      for (const item of [...answers]) {
        for (const next of [item.replaceAll(from, to), item.replaceAll(to, from)]) {
          if (!answers.has(next)) { answers.add(next); changed = true; }
        }
      }
    }
  }
  // ん → n / nn どちらでも OK
  for (const item of [...answers]) {
    answers.add(item.replace(/n(?=$|[bcdfghjklmpqrstvwxz])/g, "nn"));
  }
  return [...answers];
}

// ---------- もんだい生成 ----------
function buildTypingQuestions(course, level) {
  if (course === "roma") {
    return TYPING_ROMA_BANK[level - 1].map(([kana, answer, aliases]) => {
      const hint = `${answer.toUpperCase()} / ${answer.toLowerCase()}`;
      return {
        prompt: kana,
        promptSpeak: kana,
        guide: level <= 2 ? "この もじを うってね" : (level <= 9 ? "おてほんを みて うってね" : "ローマじで うってね"),
        hint: level <= 9 ? hint : "",
        answers: buildRomajiAnswers(answer, aliases || []),
        answerDisplay: answer,
        inputMode: "text",
      };
    });
  }
  // けいさんコース
  return TYPING_MATH_BANK[level - 1].map((item) => {
    if (item.length === 1) {
      return {
        prompt: String(item[0]),
        promptSpeak: `すうじの ${item[0]} を うってね`,
        guide: "でてきた すうじを そのまま うってね",
        hint: "",
        answers: [String(item[0])],
        answerDisplay: String(item[0]),
        inputMode: "numeric",
      };
    }
    const [a, sign, b] = item;
    const answer = sign === "+" ? a + b : a - b;
    return {
      prompt: `${a} ${sign === "+" ? "＋" : "−"} ${b}`,
      promptSpeak: `${a} ${sign === "+" ? "たす" : "ひく"} ${b} は？`,
      guide: "こたえを すうじで うってね",
      hint: "",
      answers: [String(answer)],
      answerDisplay: String(answer),
      inputMode: "numeric",
    };
  });
}

// ---------- どうじょう画面 ----------
let dojoCourse = "roma";
let typingQuiz = null; // { course, level, questions, index, correct, awaitNext }

function renderDojo() {
  updateHud();
  const tabs = document.getElementById("dojo-tabs");
  tabs.innerHTML = "";
  TYPING_COURSES.forEach((c) => {
    const b = document.createElement("button");
    b.className = "tab-btn" + (c.id === dojoCourse ? " selected" : "");
    b.textContent = `${c.icon} ${c.name}`;
    b.addEventListener("click", () => { dojoCourse = c.id; renderDojo(); });
    tabs.appendChild(b);
  });
  document.getElementById("dojo-desc").textContent =
    TYPING_COURSES.find((c) => c.id === dojoCourse).desc + "　（ぜんもん せいかいで つぎのレベルが ひらくよ）";

  const list = document.getElementById("dojo-list");
  list.innerHTML = "";
  const progress = state.typing[dojoCourse]; // いま ひらいている さいだいレベル
  for (let lv = 1; lv <= TYPING_MAX_LEVEL; lv++) {
    const btn = document.createElement("button");
    const clearedLv = lv < progress;
    const unlocked = lv <= progress;
    btn.className = "dojo-level" + (clearedLv ? " cleared" : "") + (unlocked ? "" : " locked");
    btn.innerHTML = `<span class="dl-num">${unlocked ? lv : "🔒"}</span><span class="dl-mark">${clearedLv ? "⭐" : ""}</span>`;
    if (unlocked) btn.addEventListener("click", () => startTypingQuiz(dojoCourse, lv));
    list.appendChild(btn);
  }
}

function startTypingQuiz(course, level) {
  typingQuiz = { course, level, questions: buildTypingQuestions(course, level), index: 0, correct: 0, awaitNext: false };
  const cName = TYPING_COURSES.find((c) => c.id === course).name;
  document.getElementById("tq-title").textContent = `${cName} レベル${level}`;
  showScreen("typing-quiz");
  renderTypingQuestion();
}

function renderTypingQuestion() {
  const q = typingQuiz.questions[typingQuiz.index];
  document.getElementById("tq-progress").textContent =
    "●".repeat(typingQuiz.index) + "○".repeat(QUESTIONS_PER_LEVEL - typingQuiz.index) +
    `　${typingQuiz.index + 1}/${QUESTIONS_PER_LEVEL}`;
  document.getElementById("tq-guide").textContent = q.guide;
  document.getElementById("tq-prompt").textContent = q.prompt;
  document.getElementById("tq-hint").textContent = q.hint;
  document.getElementById("tq-feedback").textContent = "";
  const input = document.getElementById("tq-input");
  input.value = "";
  input.inputMode = q.inputMode;
  input.disabled = false;
  document.getElementById("btn-tq-check").classList.remove("hidden");
  document.getElementById("btn-tq-next").classList.add("hidden");
  typingQuiz.awaitNext = false;
  setTimeout(() => input.focus(), 50);
}

function checkTypingAnswer() {
  if (!typingQuiz || typingQuiz.awaitNext) return;
  const q = typingQuiz.questions[typingQuiz.index];
  const raw = document.getElementById("tq-input").value;
  if (normalizeTyping(raw) === "") {
    document.getElementById("tq-feedback").textContent = "こたえを うってね";
    return;
  }
  const ok = q.answers.some((a) => normalizeTyping(raw) === a);
  const fb = document.getElementById("tq-feedback");
  if (ok) {
    typingQuiz.correct++;
    fb.textContent = pick(["せいかい！🎉", "すごい！⭕", "ナイスタイピング！⌨️✨"]);
    fb.className = "tq-feedback ok";
    soundCorrect();
  } else {
    fb.textContent = `おしい！こたえは「${q.answerDisplay}」`;
    fb.className = "tq-feedback ng";
    soundWrong();
  }
  document.getElementById("tq-input").disabled = true;
  document.getElementById("btn-tq-check").classList.add("hidden");
  typingQuiz.awaitNext = true;
  if (typingQuiz.index >= QUESTIONS_PER_LEVEL - 1) {
    setTimeout(finishTypingQuiz, ok ? 900 : 1800);
  } else {
    document.getElementById("btn-tq-next").classList.remove("hidden");
    document.getElementById("btn-tq-next").focus();
  }
}

function nextTypingQuestion() {
  if (!typingQuiz.awaitNext) return;
  typingQuiz.index++;
  renderTypingQuestion();
}

function finishTypingQuiz() {
  const { course, level, correct } = typingQuiz;
  const perfect = correct === QUESTIONS_PER_LEVEL;
  let coinsEarned = 0;
  let unlockMsg = "";

  let ticketsEarned = 0;
  if (perfect) {
    coinsEarned = COIN_TYPING_CLEAR;
    ticketsEarned = TICKET_PERFECT;
    state.tickets += ticketsEarned;
    dailyProgress("typing");
    if (level === state.typing[course] && level < TYPING_MAX_LEVEL) {
      state.typing[course] = level + 1;
      unlockMsg = `レベル${level + 1}が ひらいた！`;
    }
  } else if (correct > 0) {
    coinsEarned = correct; // 1もん 1コイン
  }
  state.coins += coinsEarned;
  const questMsg = questOnTypingClear(course, level, perfect);
  save();

  document.getElementById("result-emoji").textContent = perfect ? "🏆" : (correct >= 3 ? "💪" : "😢");
  document.getElementById("result-title").textContent = perfect ? "パーフェクト！" : "もうすこし！";
  document.getElementById("result-stars").textContent = perfect ? "⭐⭐⭐" : "";
  document.getElementById("result-detail").textContent = `${QUESTIONS_PER_LEVEL}もん中 ${correct}もん せいかい！`;
  document.getElementById("result-reward").textContent = coinsEarned
    ? `🪙${coinsEarned}コイン${ticketsEarned ? ` ＋ つりけん🎫${ticketsEarned}まい` : ""} ゲット！`
    : "";
  document.getElementById("result-unlock").innerHTML =
    [unlockMsg, questMsg].filter(Boolean).join("<br>") || (perfect ? "" : "ぜんもん せいかいで つぎのレベルが ひらくよ");
  resultReturnScreen = "dojo";
  showScreen("result");

  if (perfect) {
    soundCoin();
    launchConfetti(40);
    speak("パーフェクト！タイピングめいじんだ！");
  } else {
    speak("おしい！もういちど やってみよう！");
  }
}

function setupTypingControls() {
  document.getElementById("btn-tq-check").addEventListener("click", checkTypingAnswer);
  document.getElementById("btn-tq-next").addEventListener("click", nextTypingQuestion);
  document.getElementById("tq-input").addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    if (typingQuiz?.awaitNext) nextTypingQuestion();
    else checkTypingAnswer();
  });
  // Enterで「つぎへ」ボタンからも すすめる
  document.getElementById("btn-tq-next").addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); nextTypingQuestion(); }
  });
  document.getElementById("btn-tq-quit").addEventListener("click", () => {
    speechSynthesis.cancel();
    showScreen("dojo");
  });
  document.getElementById("btn-tq-speak").addEventListener("click", () => {
    if (typingQuiz) speak(typingQuiz.questions[typingQuiz.index].promptSpeak);
  });
}
