/* ================= まなびタウン データ定義 ================= */

// ---------- アバターパーツ ----------
const SKIN_COLORS = ["#ffe0bd", "#ffcd94", "#eab676", "#c68642"];
const HAIR_COLORS = ["#4a3728", "#1a1a2e", "#8d5524", "#e8b04b", "#c94f7c"];
const SHIRT_COLORS_FREE = ["#4fc3f7", "#ff8a80"];
const HAIR_STYLES = ["short", "spiky", "long", "twintail"];
const EYE_STYLES = ["round", "happy", "star"];

// ---------- ショップアイテム ----------
// unlockLv: べんきょうレベルがここまでクリアされると おみせに ならぶ
const SHOP_ITEMS = [
  // ぼうし
  { id: "hat_cap",    cat: "hat",   name: "あかいぼうし",     icon: "🧢", price: 30,  unlockLv: 1 },
  { id: "hat_straw",  cat: "hat",   name: "むぎわらぼうし",   icon: "👒", price: 50,  unlockLv: 4 },
  { id: "hat_ribbon", cat: "hat",   name: "おおきなリボン",   icon: "🎀", price: 60,  unlockLv: 7 },
  { id: "hat_party",  cat: "hat",   name: "パーティーぼうし", icon: "🥳", price: 80,  unlockLv: 12 },
  { id: "hat_wizard", cat: "hat",   name: "まほうつかいのぼうし", icon: "🧙", price: 120, unlockLv: 18 },
  { id: "hat_crown",  cat: "hat",   name: "きんのおうかん",   icon: "👑", price: 200, unlockLv: 26 },
  // めがね
  { id: "gl_round",   cat: "glasses", name: "まるめがね",     icon: "👓", price: 40,  unlockLv: 3 },
  { id: "gl_sun",     cat: "glasses", name: "サングラス",     icon: "🕶️", price: 70,  unlockLv: 10 },
  { id: "gl_star",    cat: "glasses", name: "スターめがね",   icon: "⭐", price: 110, unlockLv: 20 },
  // ふく（シャツのいろ）
  { id: "sh_yellow",  cat: "shirt", name: "きいろのふく",   icon: "💛", price: 30, unlockLv: 2,  color: "#ffd54f" },
  { id: "sh_green",   cat: "shirt", name: "みどりのふく",   icon: "💚", price: 30, unlockLv: 5,  color: "#81c784" },
  { id: "sh_purple",  cat: "shirt", name: "むらさきのふく", icon: "💜", price: 50, unlockLv: 9,  color: "#b39ddb" },
  { id: "sh_orange",  cat: "shirt", name: "オレンジのふく", icon: "🧡", price: 50, unlockLv: 14, color: "#ffb74d" },
  { id: "sh_rainbow", cat: "shirt", name: "にじいろのふく", icon: "🌈", price: 150, unlockLv: 24, color: "rainbow" },
  // もちもの
  { id: "ac_flower",  cat: "item", name: "おはな",         icon: "🌷", price: 25,  unlockLv: 2 },
  { id: "ac_balloon", cat: "item", name: "ふうせん",       icon: "🎈", price: 45,  unlockLv: 6 },
  { id: "ac_wand",    cat: "item", name: "ほしのステッキ", icon: "🪄", price: 90,  unlockLv: 16 },
  { id: "ac_guitar",  cat: "item", name: "ギター",         icon: "🎸", price: 130, unlockLv: 22 },
  // へやのかざり
  { id: "rm_plant",   cat: "room", name: "かんようしょくぶつ", icon: "🪴", price: 35,  unlockLv: 3,  pos: { left: "6%",  bottom: "8%" } },
  { id: "rm_tv",      cat: "room", name: "テレビ",             icon: "📺", price: 80,  unlockLv: 8,  pos: { left: "72%", bottom: "30%" } },
  { id: "rm_book",    cat: "room", name: "ほんだな",           icon: "📚", price: 60,  unlockLv: 11, pos: { left: "40%", bottom: "38%" } },
  { id: "rm_sofa",    cat: "room", name: "ソファ",             icon: "🛋️", price: 100, unlockLv: 15, pos: { left: "70%", bottom: "6%" } },
  { id: "rm_robot",   cat: "room", name: "ロボット",           icon: "🤖", price: 140, unlockLv: 21, pos: { left: "14%", bottom: "34%" } },
  { id: "rm_fish",    cat: "room", name: "すいそう",           icon: "🐠", price: 120, unlockLv: 25, pos: { left: "42%", bottom: "6%" } },
];

const SHOP_CATS = [
  { id: "hat",   name: "ぼうし" },
  { id: "glasses", name: "めがね" },
  { id: "shirt", name: "ふく" },
  { id: "item",  name: "もちもの" },
  { id: "room",  name: "へやのかざり" },
];

// ---------- まちのトモダチ ----------
// unlockLv レベルをクリアすると まちに ひっこしてくる
const FRIENDS = [
  { id: "f1", name: "はなちゃん", unlockLv: 8,
    avatar: { skin: 0, hairStyle: "twintail", hairColor: 4, eyes: "happy", shirt: "#f48fb1" },
    lines: ["こんにちは！", "べんきょう がんばってるね！", "おはなが すきなの🌸"] },
  { id: "f2", name: "けんたくん", unlockLv: 12,
    avatar: { skin: 1, hairStyle: "spiky", hairColor: 1, eyes: "round", shirt: "#4fc3f7" },
    lines: ["やあ！", "サッカー しようぜ⚽", "きみは すごいなあ！"] },
  { id: "f3", name: "そらちゃん", unlockLv: 16,
    avatar: { skin: 0, hairStyle: "long", hairColor: 0, eyes: "star", shirt: "#b39ddb" },
    lines: ["ほしを みるのが すき⭐", "かんじ よめるの？ かっこいい！", "こんやは ほしぞらが きれいだよ"] },
  { id: "f4", name: "たけしくん", unlockLv: 20,
    avatar: { skin: 2, hairStyle: "short", hairColor: 0, eyes: "happy", shirt: "#81c784" },
    lines: ["とけいが よめるなんて すごい！", "むしとり いこうよ🐛", "がはは！ たのしいな！"] },
  { id: "f5", name: "ももちゃん", unlockLv: 24,
    avatar: { skin: 0, hairStyle: "twintail", hairColor: 2, eyes: "round", shirt: "#ffb74d" },
    lines: ["ケーキ やいたの🍰", "ひきざんも できるの？ てんさい！", "また あそぼうね！"] },
  { id: "f6", name: "ルナちゃん", unlockLv: 28,
    avatar: { skin: 3, hairStyle: "long", hairColor: 3, eyes: "star", shirt: "#e8b04b" },
    lines: ["まちの みんなが きみの うわさを してるよ", "もうすぐ ぜんぶ クリアだね！", "きみは まちの ヒーローだよ✨"] },
];

// ---------- ペット ----------
const PETS = [
  { id: "p1", name: "コロ",     icon: "🐶", unlockLv: 10, lines: ["ワンワン！", "おさんぽ いこう！"] },
  { id: "p2", name: "ミケ",     icon: "🐱", unlockLv: 14, lines: ["ニャーン", "ひなたぼっこ きもちいい…"] },
  { id: "p3", name: "ミミ",     icon: "🐰", unlockLv: 18, lines: ["ぴょんぴょん！", "にんじん だいすき"] },
  { id: "p4", name: "ピーちゃん", icon: "🦜", unlockLv: 22, lines: ["マナビタウン！ マナビタウン！", "ピピッ♪"] },
  { id: "p5", name: "キラ",     icon: "🦄", unlockLv: 30, lines: ["ぜんぶ クリアした きみに あえて うれしい！", "キラキラ〜✨"] },
];

// ---------- ことばバンク ----------
const HIRAGANA_WORDS = [
  { e: "🍎", w: "りんご" }, { e: "🍌", w: "ばなな" }, { e: "🐶", w: "いぬ" },
  { e: "🐱", w: "ねこ" },   { e: "🐟", w: "さかな" }, { e: "🌸", w: "はな" },
  { e: "⛰️", w: "やま" },   { e: "🚗", w: "くるま" }, { e: "🍙", w: "おにぎり" },
  { e: "☂️", w: "かさ" },   { e: "🐘", w: "ぞう" },   { e: "🐢", w: "かめ" },
  { e: "🍓", w: "いちご" }, { e: "👟", w: "くつ" },   { e: "📕", w: "ほん" },
  { e: "🌙", w: "つき" },   { e: "⭐", w: "ほし" },   { e: "🐜", w: "あり" },
  { e: "🦀", w: "かに" },   { e: "🐴", w: "うま" },   { e: "🌊", w: "うみ" },
  { e: "🍵", w: "おちゃ" }, { e: "🐮", w: "うし" },   { e: "🥚", w: "たまご" },
];
const KATAKANA_WORDS = [
  { e: "🦁", w: "ライオン" }, { e: "🐼", w: "パンダ" },   { e: "🍌", w: "バナナ" },
  { e: "🍅", w: "トマト" },   { e: "🚌", w: "バス" },     { e: "🍰", w: "ケーキ" },
  { e: "🐨", w: "コアラ" },   { e: "🍜", w: "ラーメン" }, { e: "🎹", w: "ピアノ" },
  { e: "🤖", w: "ロボット" }, { e: "🍦", w: "アイス" },   { e: "🥛", w: "ミルク" },
  { e: "🦒", w: "キリン" },   { e: "🐧", w: "ペンギン" }, { e: "🍕", w: "ピザ" },
  { e: "🚀", w: "ロケット" }, { e: "🍈", w: "メロン" },   { e: "🐫", w: "ラクダ" },
];
// かず の かんじ
const KANJI_NUMS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const KANJI_NUM_YOMI = ["", "いち", "に", "さん", "し", "ご", "ろく", "しち", "はち", "きゅう", "じゅう"];
// 1ねんせいの かんじ（よみ）
const KANJI_BASIC = [
  { k: "山", y: "やま", e: "⛰️" }, { k: "川", y: "かわ", e: "🏞️" }, { k: "日", y: "ひ", e: "☀️" },
  { k: "月", y: "つき", e: "🌙" }, { k: "木", y: "き", e: "🌳" },   { k: "火", y: "ひ", e: "🔥" },
  { k: "水", y: "みず", e: "💧" }, { k: "口", y: "くち", e: "👄" }, { k: "目", y: "め", e: "👀" },
  { k: "手", y: "て", e: "✋" },   { k: "足", y: "あし", e: "🦶" }, { k: "花", y: "はな", e: "🌸" },
  { k: "犬", y: "いぬ", e: "🐶" }, { k: "空", y: "そら", e: "🌤️" }, { k: "雨", y: "あめ", e: "🌧️" },
  { k: "石", y: "いし", e: "🪨" }, { k: "貝", y: "かい", e: "🐚" }, { k: "虫", y: "むし", e: "🐛" },
  { k: "田", y: "た", e: "🌾" },   { k: "森", y: "もり", e: "🌲" }, { k: "音", y: "おと", e: "🎵" },
  { k: "車", y: "くるま", e: "🚗" }, { k: "王", y: "おう", e: "👑" }, { k: "糸", y: "いと", e: "🧵" },
];
// かぞえる ための えもじ
const COUNT_EMOJIS = ["🍎", "🍓", "🐟", "🌸", "⭐", "🐣", "🍬", "🎈", "🐞", "🍩"];

// ぶんしょうだい テンプレート
const STORY_TEMPLATES = [
  { t: (a, b) => `りんごが ${a}こ、みかんが ${b}こ あります。あわせて なんこ？`, op: "add" },
  { t: (a, b) => `こうえんに こどもが ${a}にん います。${b}にん きました。ぜんぶで なんにん？`, op: "add" },
  { t: (a, b) => `あめが ${a}こ あります。${b}こ たべました。のこりは なんこ？`, op: "sub" },
  { t: (a, b) => `とりが ${a}わ います。${b}わ とんでいきました。のこりは なんわ？`, op: "sub" },
  { t: (a, b) => `えんぴつが ${a}ほん、けしごむが ${b}こ あります。えんぴつは けしごむより なんこ おおい？`, op: "sub" },
];

// ---------- レベルこうせい（ぜん30レベル）----------
// cats: このレベルで でる もんだいの しゅるい
const LEVELS = [
  // だい1しょう: はじめてのべんきょう (Lv1-5)
  { lv: 1,  title: "かぞえてみよう①",   cats: ["count5"] },
  { lv: 2,  title: "かぞえてみよう②",   cats: ["count10"] },
  { lv: 3,  title: "ひらがな①",         cats: ["hira"] },
  { lv: 4,  title: "どっちがおおい？",   cats: ["compare", "count10"] },
  { lv: 5,  title: "ひらがな②",         cats: ["hira", "hiraFirst"] },
  // だい2しょう: たしざんとカタカナ (Lv6-10)
  { lv: 6,  title: "たしざん①",         cats: ["add5"] },
  { lv: 7,  title: "たしざん②",         cats: ["add10"] },
  { lv: 8,  title: "カタカナ①",         cats: ["kata"] },
  { lv: 9,  title: "たしざん③",         cats: ["add10", "story_add"] },
  { lv: 10, title: "カタカナ②",         cats: ["kata", "hira"] },
  // だい3しょう: ひきざん (Lv11-15)
  { lv: 11, title: "ひきざん①",         cats: ["sub5"] },
  { lv: 12, title: "ひきざん②",         cats: ["sub10"] },
  { lv: 13, title: "かんじのかず①",     cats: ["kanjiCount"] },
  { lv: 14, title: "ひきざん③",         cats: ["sub10", "story_sub"] },
  { lv: 15, title: "たしざんひきざん",   cats: ["add10", "sub10"] },
  // だい4しょう: かんじとくりあがり (Lv16-20)
  { lv: 16, title: "かんじ①",           cats: ["kanjiRead"] },
  { lv: 17, title: "くりあがりのたしざん①", cats: ["addCarry"] },
  { lv: 18, title: "とけい①",           cats: ["clockHour"] },
  { lv: 19, title: "くりあがりのたしざん②", cats: ["addCarry", "story_add"] },
  { lv: 20, title: "かんじ②",           cats: ["kanjiRead", "kanjiCount"] },
  // だい5しょう: くりさがりととけい (Lv21-25)
  { lv: 21, title: "くりさがりのひきざん①", cats: ["subBorrow"] },
  { lv: 22, title: "とけい②",           cats: ["clockHalf"] },
  { lv: 23, title: "くりさがりのひきざん②", cats: ["subBorrow", "story_sub"] },
  { lv: 24, title: "おおきいかず①",     cats: ["seq100", "tens"] },
  { lv: 25, title: "かんじ③",           cats: ["kanjiRead", "kanjiPick"] },
  // だい6しょう: まとめ (Lv26-30)
  { lv: 26, title: "おおきいかず②",     cats: ["tens", "add100"] },
  { lv: 27, title: "ぶんしょうだい",     cats: ["story_add", "story_sub"] },
  { lv: 28, title: "けいさんマスター",   cats: ["addCarry", "subBorrow"] },
  { lv: 29, title: "かんじマスター",     cats: ["kanjiRead", "kanjiPick", "kanjiCount"] },
  { lv: 30, title: "さいしゅうテスト！", cats: ["addCarry", "subBorrow", "kanjiRead", "clockHalf", "story_add"] },
];

const CHAPTERS = [
  { start: 1,  name: "だい1しょう 🌱 はじめてのべんきょう" },
  { start: 6,  name: "だい2しょう 🌻 たしざんとカタカナ" },
  { start: 11, name: "だい3しょう 🍎 ひきざんにちょうせん" },
  { start: 16, name: "だい4しょう 🍁 かんじとくりあがり" },
  { start: 21, name: "だい5しょう ⛄ とけいとくりさがり" },
  { start: 26, name: "だい6しょう 🌈 まなびマスターへのみち" },
];

const QUESTIONS_PER_LEVEL = 5;
const COIN_CLEAR = 20;      // はじめてクリア
const COIN_PERFECT = 10;    // ぜんもんせいかい ボーナス
const COIN_REPLAY = 5;      // もういちど あそんだとき
