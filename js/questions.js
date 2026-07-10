/* ================= もんだいジェネレーター ================= */
// 各ジェネレーターは以下を返す:
// { text: 問題文, speak: 読み上げ用テキスト, visual: HTML(任意),
//   choices: [表示文字列], answer: 正解のインデックス }

const rnd = (n) => Math.floor(Math.random() * n);
const rndInt = (min, max) => min + rnd(max - min + 1);
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = rnd(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = (arr) => arr[rnd(arr.length)];

// 正解 + まぎらわしい選択肢をつくる（数値用）
function numChoices(answer, min, max, count = 3) {
  const set = new Set([answer]);
  while (set.size < count) {
    let d = answer + (rnd(2) ? 1 : -1) * rndInt(1, 3);
    if (d < min) d = answer + rndInt(1, 3);
    if (d > max) d = answer - rndInt(1, 3);
    if (d >= min && d <= max) set.add(d);
  }
  return finalize([...set], answer);
}

// choices配列をシャッフルして answer インデックスを求める
function finalize(choices, answerValue) {
  const shuffled = shuffle(choices);
  return { choices: shuffled.map(String), answer: shuffled.indexOf(answerValue) };
}
function finalizeStr(choices, answerValue) {
  const shuffled = shuffle(choices);
  return { choices: shuffled, answer: shuffled.indexOf(answerValue) };
}

// ---------- かぞえる ----------
function qCount(max) {
  const n = rndInt(1, max);
  const emoji = pick(COUNT_EMOJIS);
  const { choices, answer } = numChoices(n, 1, max);
  return {
    text: "なんこ あるかな？",
    speak: "なんこ あるかな？",
    visual: `<div>${emoji.repeat(n)}</div>`,
    choices, answer,
  };
}

// ---------- どっちがおおい ----------
function qCompare() {
  const a = rndInt(1, 9);
  let b = rndInt(1, 9);
  while (b === a) b = rndInt(1, 9);
  const [e1, e2] = shuffle(COUNT_EMOJIS).slice(0, 2);
  const winner = a > b ? e1 : e2;
  const { choices, answer } = finalizeStr([e1, e2], winner);
  return {
    text: "どっちが おおいかな？",
    speak: "どっちが おおいかな？",
    visual: `<span class="cmp-box">${e1.repeat(a)}</span><span class="cmp-box">${e2.repeat(b)}</span>`,
    choices, answer,
  };
}

// ---------- たしざん・ひきざん ----------
function qAdd(maxSum) {
  const a = rndInt(1, maxSum - 1);
  const b = rndInt(1, maxSum - a);
  const ans = a + b;
  const { choices, answer } = numChoices(ans, 0, maxSum + 3);
  return {
    text: `${a} ＋ ${b} は？`,
    speak: `${a} たす ${b} は？`,
    visual: "",
    choices, answer,
  };
}
function qSub(max) {
  const a = rndInt(2, max);
  const b = rndInt(1, a - 1);
  const ans = a - b;
  const { choices, answer } = numChoices(ans, 0, max);
  return {
    text: `${a} − ${b} は？`,
    speak: `${a} ひく ${b} は？`,
    visual: "",
    choices, answer,
  };
}
// くりあがり（こたえ 11〜18）
function qAddCarry() {
  const a = rndInt(2, 9);
  const b = rndInt(11 - a > 2 ? 11 - a : 2, 9);
  const ans = a + b;
  const { choices, answer } = numChoices(ans, 10, 20);
  return {
    text: `${a} ＋ ${b} は？`,
    speak: `${a} たす ${b} は？`,
    visual: "",
    choices, answer,
  };
}
// くりさがり（11〜18 から ひく）
function qSubBorrow() {
  const a = rndInt(11, 18);
  const b = rndInt(a - 9, 9); // こたえが 1けたに なるように
  const ans = a - b;
  const { choices, answer } = numChoices(ans, 1, 10);
  return {
    text: `${a} − ${b} は？`,
    speak: `${a} ひく ${b} は？`,
    visual: "",
    choices, answer,
  };
}

// ---------- おおきいかず ----------
function qSeq100() {
  const n = rndInt(20, 98);
  const dir = rnd(2);
  const ans = dir ? n + 1 : n - 1;
  const { choices, answer } = numChoices(ans, 1, 100);
  return {
    text: dir ? `${n} の つぎの かずは？` : `${n} の まえの かずは？`,
    speak: dir ? `${n} の つぎの かずは？` : `${n} の まえの かずは？`,
    visual: "",
    choices, answer,
  };
}
function qTens() {
  const t = rndInt(2, 9);
  const o = rndInt(1, 9);
  const ans = t * 10 + o;
  const { choices, answer } = numChoices(ans, 10, 100);
  return {
    text: `10が ${t}こ と 1が ${o}こ で いくつ？`,
    speak: `じゅうが ${t}こ と いちが ${o}こ で いくつ？`,
    visual: `<div style="font-size:1.6rem">${"🔟".repeat(t)} ${"1️⃣".repeat(o)}</div>`,
    choices, answer,
  };
}
function qAdd100() {
  const a = rndInt(2, 9) * 10;
  const b = rndInt(1, 9);
  const ans = a + b;
  const { choices, answer } = numChoices(ans, 10, 100);
  return {
    text: `${a} ＋ ${b} は？`,
    speak: `${a} たす ${b} は？`,
    visual: "",
    choices, answer,
  };
}

// ---------- ひらがな・カタカナ ----------
function qWordMatch(bank, label) {
  const items = shuffle(bank).slice(0, 3);
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.w), target.w);
  return {
    text: `これは どれかな？`,
    speak: `えに あう ${label}は どれかな？`,
    visual: `<span class="big-glyph">${target.e}</span>`,
    choices, answer,
  };
}
const qHira = () => qWordMatch(HIRAGANA_WORDS, "ことば");
const qKata = () => qWordMatch(KATAKANA_WORDS, "カタカナ");

// さいしょの じ
function qHiraFirst() {
  // さいしょの じが かぶらないように
  const seen = new Set();
  const uniq = [];
  for (const it of shuffle(HIRAGANA_WORDS)) {
    if (!seen.has(it.w[0])) { seen.add(it.w[0]); uniq.push(it); }
    if (uniq.length === 3) break;
  }
  const target = uniq[0];
  const { choices, answer } = finalizeStr(uniq.map((i) => i.e), target.e);
  return {
    text: `「${target.w[0]}」で はじまるのは どれ？`,
    speak: `${target.w[0]}、で はじまるのは どれかな？`,
    visual: "",
    choices, answer,
  };
}

// ---------- かんじ ----------
function qKanjiCount() {
  const n = rndInt(1, 10);
  const emoji = pick(COUNT_EMOJIS);
  const wrong = new Set([n]);
  while (wrong.size < 3) {
    const d = rndInt(1, 10);
    wrong.add(d);
  }
  const vals = [...wrong];
  const { choices, answer } = finalizeStr(vals.map((v) => KANJI_NUMS[v]), KANJI_NUMS[n]);
  return {
    text: "かんじで かくと どれかな？",
    speak: "かずを かんじで かくと どれかな？",
    visual: `<div>${emoji.repeat(n)}</div>`,
    choices, answer,
  };
}
function qKanjiRead() {
  const pool = rnd(3) === 0
    ? [...Array(10)].map((_, i) => ({ k: KANJI_NUMS[i + 1], y: KANJI_NUM_YOMI[i + 1] }))
    : KANJI_BASIC;
  // よみが かぶらないように えらぶ（「日」と「火」は どちらも「ひ」）
  const items = [];
  const seenYomi = new Set();
  for (const it of shuffle(pool)) {
    if (!seenYomi.has(it.y)) { seenYomi.add(it.y); items.push(it); }
    if (items.length === 3) break;
  }
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.y), target.y);
  return {
    text: "なんて よむかな？",
    speak: "この かんじは なんて よむかな？",
    visual: `<span class="big-glyph">${target.k}</span>`,
    choices, answer,
  };
}
// え → かんじ をえらぶ
function qKanjiPick() {
  const items = shuffle(KANJI_BASIC).slice(0, 3);
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.k), target.k);
  return {
    text: `「${target.y}」の かんじは どれ？`,
    speak: `${target.y}、の かんじは どれかな？`,
    visual: `<span class="big-glyph">${target.e}</span>`,
    choices, answer,
  };
}

// ---------- とけい ----------
function clockSVG(hour, minute) {
  const hAng = (hour % 12) * 30 + minute * 0.5 - 90;
  const mAng = minute * 6 - 90;
  const hx = 85 + 38 * Math.cos((hAng * Math.PI) / 180);
  const hy = 85 + 38 * Math.sin((hAng * Math.PI) / 180);
  const mx = 85 + 58 * Math.cos((mAng * Math.PI) / 180);
  const my = 85 + 58 * Math.sin((mAng * Math.PI) / 180);
  let nums = "";
  for (let i = 1; i <= 12; i++) {
    const a = (i * 30 - 90) * (Math.PI / 180);
    nums += `<text x="${85 + 66 * Math.cos(a)}" y="${85 + 66 * Math.sin(a) + 6}" font-size="15" font-weight="bold" text-anchor="middle" fill="#5d4037">${i}</text>`;
  }
  return `<svg class="clock" viewBox="0 0 170 170">
    <circle cx="85" cy="85" r="80" fill="#fff" stroke="#ff8fab" stroke-width="8"/>
    ${nums}
    <line x1="85" y1="85" x2="${hx}" y2="${hy}" stroke="#5d4037" stroke-width="7" stroke-linecap="round"/>
    <line x1="85" y1="85" x2="${mx}" y2="${my}" stroke="#4fc3f7" stroke-width="5" stroke-linecap="round"/>
    <circle cx="85" cy="85" r="6" fill="#5d4037"/>
  </svg>`;
}
function qClockHour() {
  const h = rndInt(1, 12);
  const wrong = new Set([h]);
  while (wrong.size < 3) wrong.add(rndInt(1, 12));
  const { choices, answer } = finalizeStr([...wrong].map((v) => `${v}じ`), `${h}じ`);
  return {
    text: "なんじ かな？",
    speak: "とけいは なんじ かな？",
    visual: clockSVG(h, 0),
    choices, answer,
  };
}
function qClockHalf() {
  const h = rndInt(1, 12);
  const isHalf = rnd(2) === 1;
  const correct = isHalf ? `${h}じはん` : `${h}じ`;
  const opts = new Set([correct]);
  while (opts.size < 3) {
    const wh = rndInt(1, 12);
    opts.add(rnd(2) ? `${wh}じはん` : `${wh}じ`);
  }
  const { choices, answer } = finalizeStr([...opts], correct);
  return {
    text: "なんじ かな？",
    speak: "とけいは なんじ かな？",
    visual: clockSVG(h, isHalf ? 30 : 0),
    choices, answer,
  };
}

// ---------- ぶんしょうだい ----------
function qStory(op) {
  const templates = STORY_TEMPLATES.filter((t) => t.op === op);
  const tpl = pick(templates);
  let a, b, ans;
  if (op === "add") {
    a = rndInt(2, 8); b = rndInt(1, 9 - a > 1 ? 9 - a : 2);
    if (a + b > 10) b = 10 - a > 0 ? 10 - a : 1;
    ans = a + b;
  } else {
    a = rndInt(3, 10); b = rndInt(1, a - 1);
    ans = a - b;
  }
  const text = tpl.t(a, b);
  const { choices, answer } = numChoices(ans, 0, 15);
  return { text, speak: text, visual: "", choices, answer };
}

// ---------- えいご ----------
// せいかいすると えいごの はつおんが ながれる（q.sayEn）
function qEngPic() {
  const items = shuffle(ENGLISH_WORDS).slice(0, 3);
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.en), target.en);
  return {
    text: "これは えいごで どれかな？",
    speak: `${target.ja}は えいごで どれかな？`,
    visual: `<span class="big-glyph">${target.e}</span>`,
    choices, answer,
    sayEn: target.en,
    choiceLang: "en",
    // もんだいぶん の あとに せんたくしを じゅんばんに よみあげる
    speakSeq: [{ t: `${target.ja}は えいごで どれかな？`, l: "ja" }, ...choices.map((c) => ({ t: c, l: "en" }))],
  };
}
function qEngJa2En() {
  const items = shuffle(ENGLISH_WORDS).slice(0, 3);
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.en), target.en);
  return {
    text: `「${target.ja}」は えいごで どれ？`,
    speak: `${target.ja}は えいごで どれかな？`,
    visual: "",
    choices, answer,
    sayEn: target.en,
    choiceLang: "en",
    speakSeq: [{ t: `${target.ja}は えいごで どれかな？`, l: "ja" }, ...choices.map((c) => ({ t: c, l: "en" }))],
  };
}
function qEngEn2Ja() {
  const items = shuffle(ENGLISH_WORDS).slice(0, 3);
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.e + " " + i.ja), target.e + " " + target.ja);
  return {
    text: `「${target.en}」は どれかな？`,
    speak: `${target.kana}は どれかな？`,
    visual: `<span style="font-size:2.6rem;font-weight:900">${target.en}</span> <button class="visual-speak" onclick="event.stopPropagation();speak('${target.en}',null,'en-US')">🔊</button>`,
    choices, answer,
    sayEn: target.en,
    speakSeq: [{ t: target.en, l: "en" }, { t: "は どれかな？", l: "ja" }],
  };
}

// ---------- 3つのかず・おおきなけいさん ----------
function qAdd3() {
  const a = rndInt(1, 5), b = rndInt(1, 5), c = rndInt(1, 5);
  const ans = a + b + c;
  const { choices, answer } = numChoices(ans, 3, 18);
  return {
    text: `${a} ＋ ${b} ＋ ${c} は？`,
    speak: `${a} たす ${b} たす ${c} は？`,
    visual: "", choices, answer,
  };
}
function qMix3() {
  const a = rndInt(3, 9), b = rndInt(1, 5), c = rndInt(1, Math.min(a + b - 1, 6));
  const ans = a + b - c;
  const { choices, answer } = numChoices(ans, 0, 15);
  return {
    text: `${a} ＋ ${b} − ${c} は？`,
    speak: `${a} たす ${b} ひく ${c} は？`,
    visual: "", choices, answer,
  };
}
function qTensCalc() {
  const isAdd = rnd(2) === 0;
  let a, b, ans;
  if (isAdd) { a = rndInt(1, 7) * 10; b = rndInt(1, 9 - a / 10) * 10; ans = a + b; }
  else { a = rndInt(3, 9) * 10; b = rndInt(1, a / 10 - 1) * 10; ans = a - b; }
  const { choices, answer } = numChoices(ans, 10, 100);
  // まちがいの せんたくしも 10のくらいに
  const wrongs = new Set([ans]);
  while (wrongs.size < 3) { const d = ans + (rnd(2) ? 10 : -10) * rndInt(1, 3); if (d >= 10 && d <= 100) wrongs.add(d); }
  const fixed = finalize([...wrongs], ans);
  return {
    text: `${a} ${isAdd ? "＋" : "−"} ${b} は？`,
    speak: `${a} ${isAdd ? "たす" : "ひく"} ${b} は？`,
    visual: "", choices: fixed.choices, answer: fixed.answer,
  };
}
function qAdd2d1d() {
  const a = rndInt(12, 88);
  const b = rndInt(2, 9);
  const ans = a + b;
  const { choices, answer } = numChoices(ans, 10, 99);
  return {
    text: `${a} ＋ ${b} は？`,
    speak: `${a} たす ${b} は？`,
    visual: "", choices, answer,
  };
}

// ---------- とけい（15ふんきざみ） ----------
function qClockQuarter() {
  const h = rndInt(1, 12);
  const m = pick([0, 15, 30, 45]);
  const label = (hh, mm) => mm === 0 ? `${hh}じ` : mm === 30 ? `${hh}じはん` : `${hh}じ${mm}ふん`;
  const correct = label(h, m);
  const opts = new Set([correct]);
  while (opts.size < 3) opts.add(label(rndInt(1, 12), pick([0, 15, 30, 45])));
  const { choices, answer } = finalizeStr([...opts], correct);
  return {
    text: "なんじ なんぷん かな？",
    speak: "とけいは なんじなんぷん かな？",
    visual: clockSVG(h, m),
    choices, answer,
  };
}

// ---------- かんじ だい2だん ----------
function qKanjiRead2() {
  const items = [];
  const seenYomi = new Set();
  for (const it of shuffle(KANJI_BASIC2)) {
    if (!seenYomi.has(it.y)) { seenYomi.add(it.y); items.push(it); }
    if (items.length === 3) break;
  }
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.y), target.y);
  return {
    text: "なんて よむかな？",
    speak: "この かんじは なんて よむかな？",
    visual: `<span class="big-glyph">${target.k}</span>`,
    choices, answer,
  };
}
function qKanjiPick2() {
  const items = shuffle(KANJI_BASIC2).slice(0, 3);
  const target = items[0];
  const { choices, answer } = finalizeStr(items.map((i) => i.k), target.k);
  return {
    text: `「${target.y}」の かんじは どれ？`,
    speak: `${target.y}、の かんじは どれかな？`,
    visual: `<span class="big-glyph">${target.e}</span>`,
    choices, answer,
  };
}

// ---------- ぶんしょうだい（3つのかず） ----------
const STORY3_TEMPLATES = [
  (a, b, c) => `バスに ${a}にん のっています。${b}にん のってきて、${c}にん おりました。いま なんにん？`,
  (a, b, c) => `あめが ${a}こ あります。${b}こ もらって、${c}こ たべました。のこりは なんこ？`,
  (a, b, c) => `こうえんに とりが ${a}わ います。${b}わ とんできて、${c}わ とんでいきました。なんわ に なった？`,
];
function qStory3() {
  const a = rndInt(3, 8), b = rndInt(1, 5), c = rndInt(1, Math.min(a + b - 1, 5));
  const ans = a + b - c;
  const text = pick(STORY3_TEMPLATES)(a, b, c);
  const { choices, answer } = numChoices(ans, 0, 15);
  return { text, speak: text, visual: "", choices, answer };
}

// ---------- ディスパッチ ----------
const GENERATORS = {
  count5:     () => qCount(5),
  count10:    () => qCount(10),
  compare:    qCompare,
  hira:       qHira,
  hiraFirst:  qHiraFirst,
  kata:       qKata,
  add5:       () => qAdd(5),
  add10:      () => qAdd(10),
  sub5:       () => qSub(5),
  sub10:      () => qSub(10),
  addCarry:   qAddCarry,
  subBorrow:  qSubBorrow,
  seq100:     qSeq100,
  tens:       qTens,
  add100:     qAdd100,
  kanjiCount: qKanjiCount,
  kanjiRead:  qKanjiRead,
  kanjiPick:  qKanjiPick,
  clockHour:  qClockHour,
  clockHalf:  qClockHalf,
  story_add:  () => qStory("add"),
  story_sub:  () => qStory("sub"),
  engPic:     qEngPic,
  engJa2En:   qEngJa2En,
  engEn2Ja:   qEngEn2Ja,
  add3:       qAdd3,
  mix3:       qMix3,
  tensCalc:   qTensCalc,
  add2d1d:    qAdd2d1d,
  clockQuarter: qClockQuarter,
  kanjiRead2: qKanjiRead2,
  kanjiPick2: qKanjiPick2,
  story3:     qStory3,
};

// レベルの もんだいセットを つくる（レベルごとに もんだいすう を かえられる）
function buildQuestionSet(levelDef) {
  const count = levelDef.questions || QUESTIONS_PER_LEVEL;
  const questions = [];
  for (let i = 0; i < count; i++) {
    const cat = levelDef.cats[i % levelDef.cats.length];
    questions.push(GENERATORS[cat]());
  }
  return shuffle(questions);
}
