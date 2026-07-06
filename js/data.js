/* ================= おべんきょコレクション データ定義 ================= */

// ---------- アバターパーツ ----------
const SKIN_COLORS = ["#ffe0bd", "#ffcd94", "#eab676", "#c68642"];
const HAIR_COLORS = ["#4a3728", "#1a1a2e", "#8d5524", "#e8b04b", "#c94f7c", "#e57373", "#90a4ae"];
const SHIRT_COLORS_FREE = ["#4fc3f7", "#ff8a80"];
const HAIR_STYLES = ["short", "spiky", "long", "twintail", "bob", "curly", "buzz", "ponytail"];
const HAIR_LABELS = ["みじかい", "ツンツン", "ロング", "ツインテール", "ボブ", "くるくる", "ベリーショート", "ポニーテール"];
const EYE_STYLES = ["round", "happy", "star", "wink", "sleepy"];
const EYE_LABELS = ["まんまる", "にこにこ", "キラキラ", "ウインク", "ねむねむ"];
const MOUTH_STYLES = ["smile", "open", "cat"];
const MOUTH_LABELS = ["にっこり", "あはは", "ねこくち"];

// ---------- ショップアイテム ----------
// unlockLv: がっこうのレベルをここまでクリアすると おみせに ならぶ
const SHOP_ITEMS = [
  // ぼうし
  { id: "hat_cap",    cat: "hat",   name: "あかいぼうし",     icon: "🧢", price: 30,  unlockLv: 1 },
  { id: "hat_straw",  cat: "hat",   name: "むぎわらぼうし",   icon: "👒", price: 50,  unlockLv: 4 },
  { id: "hat_ribbon", cat: "hat",   name: "おおきなリボン",   icon: "🎀", price: 60,  unlockLv: 7 },
  { id: "hat_flower", cat: "hat",   name: "はなかんむり",     icon: "🌼", price: 70,  unlockLv: 9 },
  { id: "hat_party",  cat: "hat",   name: "パーティーぼうし", icon: "🥳", price: 80,  unlockLv: 12 },
  { id: "hat_head",   cat: "hat",   name: "ヘッドホン",       icon: "🎧", price: 90,  unlockLv: 15 },
  { id: "hat_wizard", cat: "hat",   name: "まほうつかいのぼうし", icon: "🧙", price: 120, unlockLv: 18 },
  { id: "hat_crown",  cat: "hat",   name: "きんのおうかん",   icon: "👑", price: 200, unlockLv: 26 },
  // めがね
  { id: "gl_round",   cat: "glasses", name: "まるめがね",     icon: "👓", price: 40,  unlockLv: 3 },
  { id: "gl_sun",     cat: "glasses", name: "サングラス",     icon: "🕶️", price: 70,  unlockLv: 10 },
  { id: "gl_heart",   cat: "glasses", name: "ハートめがね",   icon: "💗", price: 90,  unlockLv: 14 },
  { id: "gl_star",    cat: "glasses", name: "スターめがね",   icon: "⭐", price: 110, unlockLv: 20 },
  // ぼうし（PNGそざい）
  { id: "hatp_02", cat: "hat", name: "たんけんぼうし",        img: "assets/parts/hat_02.png", price: 60,  unlockLv: 5,  w: 140, y: 12 },
  { id: "hatp_06", cat: "hat", name: "やきゅうヘルメット",    img: "assets/parts/hat_06.png", price: 70,  unlockLv: 6,  w: 128, y: 22 },
  { id: "hatp_07", cat: "hat", name: "にんじゃはちまき",      img: "assets/parts/hat_07.png", price: 60,  unlockLv: 8,  w: 118, y: 38 },
  { id: "hatp_03", cat: "hat", name: "ねこみみカチューシャ",  img: "assets/parts/hat_03.png", price: 80,  unlockLv: 10, w: 122, y: 28 },
  { id: "hatp_08", cat: "hat", name: "おはなのカチューシャ",  img: "assets/parts/hat_08.png", price: 70,  unlockLv: 13, w: 124, y: 24 },
  { id: "hatp_04", cat: "hat", name: "きょうりゅうのかぶりもの", img: "assets/parts/hat_04.png", price: 120, unlockLv: 17, w: 130, y: 16 },
  { id: "hatp_05", cat: "hat", name: "うさぎのかぶりもの",    img: "assets/parts/hat_05.png", price: 120, unlockLv: 19, w: 126, y: 4 },
  { id: "hatp_10", cat: "hat", name: "ケーキのぼうし",        img: "assets/parts/hat_10.png", price: 100, unlockLv: 21, w: 126, y: 8 },
  { id: "hatp_09", cat: "hat", name: "うちゅうヘルメット",    img: "assets/parts/hat_09.png", price: 180, unlockLv: 23, w: 148, y: 28 },
  { id: "hatp_01", cat: "hat", name: "おうさまセット",        img: "assets/parts/hat_01.png", price: 250, unlockLv: 29, w: 132, y: 12 },
  // おようふく（PNGそざい・からだに かさねる）
  { id: "out_04", cat: "outfit", name: "にじいろTシャツ",     img: "assets/parts/outfit_04.png", price: 60,  unlockLv: 4,  w: 118, y: 140 },
  { id: "out_08", cat: "outfit", name: "パーカー",            img: "assets/parts/outfit_08.png", price: 70,  unlockLv: 7,  w: 116, y: 140 },
  { id: "out_03", cat: "outfit", name: "サッカーユニフォーム", img: "assets/parts/outfit_03.png", price: 90,  unlockLv: 9,  w: 118, y: 138 },
  { id: "out_01", cat: "outfit", name: "セーラーふく",        img: "assets/parts/outfit_01.png", price: 90,  unlockLv: 11, w: 120, y: 138 },
  { id: "out_05", cat: "outfit", name: "オーバーオール",      img: "assets/parts/outfit_05.png", price: 90,  unlockLv: 12, w: 118, y: 138 },
  { id: "out_07", cat: "outfit", name: "はっぴ",              img: "assets/parts/outfit_07.png", price: 110, unlockLv: 15, w: 122, y: 138 },
  { id: "out_02", cat: "outfit", name: "おひめさまドレス",    img: "assets/parts/outfit_02.png", price: 130, unlockLv: 18, w: 124, y: 136 },
  { id: "out_09", cat: "outfit", name: "たんけんふく",        img: "assets/parts/outfit_09.png", price: 110, unlockLv: 20, w: 118, y: 138 },
  { id: "out_06", cat: "outfit", name: "ヒーロースーツ",      img: "assets/parts/outfit_06.png", price: 160, unlockLv: 25, w: 124, y: 136 },
  { id: "out_10", cat: "outfit", name: "タキシード",          img: "assets/parts/outfit_10.png", price: 200, unlockLv: 27, w: 120, y: 136 },
  // ふく（シャツのいろ）
  { id: "sh_yellow",  cat: "shirt", name: "きいろのふく",   icon: "💛", price: 30, unlockLv: 2,  color: "#ffd54f" },
  { id: "sh_green",   cat: "shirt", name: "みどりのふく",   icon: "💚", price: 30, unlockLv: 5,  color: "#81c784" },
  { id: "sh_white",   cat: "shirt", name: "しろいふく",     icon: "🤍", price: 40, unlockLv: 6,  color: "#f5f5f5" },
  { id: "sh_purple",  cat: "shirt", name: "むらさきのふく", icon: "💜", price: 50, unlockLv: 9,  color: "#b39ddb" },
  { id: "sh_black",   cat: "shirt", name: "くろいふく",     icon: "🖤", price: 60, unlockLv: 11, color: "#546e7a" },
  { id: "sh_orange",  cat: "shirt", name: "オレンジのふく", icon: "🧡", price: 50, unlockLv: 14, color: "#ffb74d" },
  { id: "sh_rainbow", cat: "shirt", name: "にじいろのふく", icon: "🌈", price: 150, unlockLv: 24, color: "rainbow" },
  // もちもの
  { id: "ac_flower",  cat: "item", name: "おはな",         icon: "🌷", price: 25,  unlockLv: 2 },
  { id: "ac_ball",    cat: "item", name: "ボール",         icon: "⚽", price: 35,  unlockLv: 4 },
  { id: "ac_balloon", cat: "item", name: "ふうせん",       icon: "🎈", price: 45,  unlockLv: 6 },
  { id: "ac_bear",    cat: "item", name: "くまのぬいぐるみ", icon: "🧸", price: 70,  unlockLv: 11 },
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
  { id: "outfit", name: "おようふく" },
  { id: "shirt", name: "ふくのいろ" },
  { id: "glasses", name: "めがね" },
  { id: "item",  name: "もちもの" },
  { id: "room",  name: "へやのかざり" },
];
const SHOP_ITEM_MAP = {};
SHOP_ITEMS.forEach((i) => { SHOP_ITEM_MAP[i.id] = i; });

// ---------- まちのトモダチ ----------
const FRIENDS = [
  { id: "f1", name: "はなちゃん", unlockLv: 8, houseColor: "#f48fb1",
    avatar: { skin: 0, hairStyle: "twintail", hairColor: 4, eyes: "happy", mouth: "smile", shirt: "#f48fb1" },
    lines: ["こんにちは！あそびにきてくれて うれしい！", "べんきょう がんばってるね！", "おはなを そだてるのが すきなの🌸", "また きてね！"] },
  { id: "f2", name: "けんたくん", unlockLv: 12, houseColor: "#4fc3f7",
    avatar: { skin: 1, hairStyle: "spiky", hairColor: 1, eyes: "round", mouth: "open", shirt: "#4fc3f7" },
    lines: ["やあ！よくきたな！", "こんど サッカー しようぜ⚽", "きみ、けいさん はやいんだって？すげー！", "おれんち ゲームいっぱいあるんだ"] },
  { id: "f3", name: "そらちゃん", unlockLv: 16, houseColor: "#b39ddb",
    avatar: { skin: 0, hairStyle: "long", hairColor: 0, eyes: "star", mouth: "smile", shirt: "#b39ddb" },
    lines: ["ほしを みるのが すきなの⭐", "かんじ よめるの？かっこいい！", "こんやは ほしぞらが きれいだよ", "うちゅうって ふしぎだね"] },
  { id: "f4", name: "たけしくん", unlockLv: 20, houseColor: "#81c784",
    avatar: { skin: 2, hairStyle: "buzz", hairColor: 0, eyes: "happy", mouth: "open", shirt: "#81c784" },
    lines: ["おう！あがってけあがってけ！", "とけいが よめるなんて すごいな！", "むしとり いこうよ🐛", "がはは！たのしいな！"] },
  { id: "f5", name: "ももちゃん", unlockLv: 24, houseColor: "#ffb74d",
    avatar: { skin: 0, hairStyle: "bob", hairColor: 2, eyes: "round", mouth: "cat", shirt: "#ffb74d" },
    lines: ["いらっしゃい！ケーキ やいたの🍰", "ひきざんも できるの？てんさい！", "タイピング って かっこいいよね⌨️", "また あそぼうね！"] },
  { id: "f6", name: "ルナちゃん", unlockLv: 28, houseColor: "#e8b04b",
    avatar: { skin: 3, hairStyle: "ponytail", hairColor: 3, eyes: "star", mouth: "smile", shirt: "#e8b04b" },
    lines: ["まちの みんなが きみの うわさを してるよ", "もうすぐ ぜんぶ クリアだね！", "きみは まちの ヒーローだよ✨", "わたしの いえに ようこそ！"] },
];

// ---------- ペット ----------
const PETS = [
  { id: "p1",  name: "コロ",       icon: "🐶", img: "assets/parts/pet_01.png", unlockLv: 10, lines: ["ワンワン！", "おさんぽ だいすき！"] },
  { id: "p6",  name: "ハムちゃん", icon: "🐹", img: "assets/parts/pet_05.png", unlockLv: 12, lines: ["ひまわりのたね ちょうだい！", "ほっぺに いっぱい つめるよ"] },
  { id: "p2",  name: "ミケ",       icon: "🐱", img: "assets/parts/pet_02.png", unlockLv: 14, lines: ["ニャーン", "ひなたぼっこ きもちいい…"] },
  { id: "p7",  name: "パンパン",   icon: "🐼", img: "assets/parts/pet_06.png", unlockLv: 16, lines: ["ささ もぐもぐ…", "ごろごろするの だいすき"] },
  { id: "p3",  name: "ミミ",       icon: "🐰", img: "assets/parts/pet_03.png", unlockLv: 18, lines: ["ぴょんぴょん！", "にんじん だいすき"] },
  { id: "p8",  name: "コンタ",     icon: "🦊", img: "assets/parts/pet_08.png", unlockLv: 20, lines: ["コンコン！", "しっぽ ふわふわでしょ"] },
  { id: "p4",  name: "ピーちゃん", icon: "🦜", img: "assets/parts/pet_04.png", unlockLv: 22, lines: ["オベンキョ！オベンキョ！", "ピピッ♪"] },
  { id: "p9",  name: "カメきち",   icon: "🐢", img: "assets/parts/pet_09.png", unlockLv: 24, lines: ["ゆっくり いこうよ〜", "こうらは ぼくの おうち"] },
  { id: "p10", name: "ペンペン",   icon: "🐧", img: "assets/parts/pet_07.png", unlockLv: 26, lines: ["ペタペタ…", "およぐの とくいだよ！"] },
  { id: "p5",  name: "キラ",       icon: "🦄", img: "assets/parts/pet_10.png", unlockLv: 30, lines: ["ぜんぶ クリアした きみに あえて うれしい！", "キラキラ〜✨"] },
];

// ---------- PNGパーツ（AI生成そざい） ----------
// w: ひょうじはば(viewBox 200x260きじゅん)、y: うえのいち。x は 100-w/2 でちゅうおう。
const PNG_HAIRS = [
  { id: "png_h01", name: "おだんご",         img: "assets/parts/hair_01.png", w: 140, y: 26 },
  { id: "png_h02", name: "みつあみ",         img: "assets/parts/hair_02.png", w: 150, y: 30 },
  { id: "png_h03", name: "ぱっつんボブ",     img: "assets/parts/hair_03.png", w: 132, y: 30 },
  { id: "png_h04", name: "ゆるふわロング",   img: "assets/parts/hair_04.png", w: 138, y: 30 },
  { id: "png_h05", name: "サイドポニー",     img: "assets/parts/hair_05.png", w: 142, y: 26 },
  { id: "png_h06", name: "さらさらショート", img: "assets/parts/hair_06.png", w: 130, y: 32 },
  { id: "png_h07", name: "ヒーローヘア",     img: "assets/parts/hair_07.png", w: 134, y: 14 },
  { id: "png_h08", name: "くるくるヘア",     img: "assets/parts/hair_08.png", w: 136, y: 26 },
  { id: "png_h09", name: "ワイルドヘア",     img: "assets/parts/hair_09.png", w: 148, y: 18 },
  { id: "png_h10", name: "アフロ",           img: "assets/parts/hair_10.png", w: 150, y: 14 },
];
const PNG_HAIR_MAP = Object.fromEntries(PNG_HAIRS.map((p) => [p.id, p]));

// ---------- まちの建物 ----------
const TOWN_W = 3260;
const BUILDINGS = [
  { id: "myhome", x: 150,  w: 230, name: "じぶんのいえ", emoji: "🏠", wall: "#fff3e0", roof: "#4fc3f7", screen: "home" },
  { id: "school", x: 520,  w: 300, name: "がっこう",     emoji: "🏫", wall: "#ffecb3", roof: "#e57373", screen: "map" },
  { id: "dojo",   x: 980,  w: 260, name: "タイピングどうじょう", emoji: "⌨️", wall: "#e8f5e9", roof: "#66bb6a", screen: "dojo" },
  { id: "shop",   x: 1390, w: 260, name: "おみせ",       emoji: "🛍️", wall: "#fff8e1", roof: "#ffa726", screen: "shop", awning: true },
];
// トモダチの家（unlockLvで出現）
const FRIEND_HOUSE_X = [1790, 1990, 2190, 2390, 2590, 2790];
// こうえん（ペットがあつまる）
const PARK_X = 3020;

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
const KANJI_NUMS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
const KANJI_NUM_YOMI = ["", "いち", "に", "さん", "し", "ご", "ろく", "しち", "はち", "きゅう", "じゅう"];
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
const COUNT_EMOJIS = ["🍎", "🍓", "🐟", "🌸", "⭐", "🐣", "🍬", "🎈", "🐞", "🍩"];

const STORY_TEMPLATES = [
  { t: (a, b) => `りんごが ${a}こ、みかんが ${b}こ あります。あわせて なんこ？`, op: "add" },
  { t: (a, b) => `こうえんに こどもが ${a}にん います。${b}にん きました。ぜんぶで なんにん？`, op: "add" },
  { t: (a, b) => `あめが ${a}こ あります。${b}こ たべました。のこりは なんこ？`, op: "sub" },
  { t: (a, b) => `とりが ${a}わ います。${b}わ とんでいきました。のこりは なんわ？`, op: "sub" },
  { t: (a, b) => `えんぴつが ${a}ほん、けしごむが ${b}こ あります。えんぴつは けしごむより なんこ おおい？`, op: "sub" },
];

// ---------- がっこうのレベルこうせい（ぜん30レベル）----------
const LEVELS = [
  { lv: 1,  title: "かぞえてみよう①",   cats: ["count5"] },
  { lv: 2,  title: "かぞえてみよう②",   cats: ["count10"] },
  { lv: 3,  title: "ひらがな①",         cats: ["hira"] },
  { lv: 4,  title: "どっちがおおい？",   cats: ["compare", "count10"] },
  { lv: 5,  title: "ひらがな②",         cats: ["hira", "hiraFirst"] },
  { lv: 6,  title: "たしざん①",         cats: ["add5"] },
  { lv: 7,  title: "たしざん②",         cats: ["add10"] },
  { lv: 8,  title: "カタカナ①",         cats: ["kata"] },
  { lv: 9,  title: "たしざん③",         cats: ["add10", "story_add"] },
  { lv: 10, title: "カタカナ②",         cats: ["kata", "hira"] },
  { lv: 11, title: "ひきざん①",         cats: ["sub5"] },
  { lv: 12, title: "ひきざん②",         cats: ["sub10"] },
  { lv: 13, title: "かんじのかず①",     cats: ["kanjiCount"] },
  { lv: 14, title: "ひきざん③",         cats: ["sub10", "story_sub"] },
  { lv: 15, title: "たしざんひきざん",   cats: ["add10", "sub10"] },
  { lv: 16, title: "かんじ①",           cats: ["kanjiRead"] },
  { lv: 17, title: "くりあがりのたしざん①", cats: ["addCarry"] },
  { lv: 18, title: "とけい①",           cats: ["clockHour"] },
  { lv: 19, title: "くりあがりのたしざん②", cats: ["addCarry", "story_add"] },
  { lv: 20, title: "かんじ②",           cats: ["kanjiRead", "kanjiCount"] },
  { lv: 21, title: "くりさがりのひきざん①", cats: ["subBorrow"] },
  { lv: 22, title: "とけい②",           cats: ["clockHalf"] },
  { lv: 23, title: "くりさがりのひきざん②", cats: ["subBorrow", "story_sub"] },
  { lv: 24, title: "おおきいかず①",     cats: ["seq100", "tens"] },
  { lv: 25, title: "かんじ③",           cats: ["kanjiRead", "kanjiPick"] },
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

// ---------- タイピングどうじょう ----------
// もんだいバンクは「つりじま」から移植（じっくり設計された20レベルカリキュラム）

// ローマじ: [かな, こたえ, べっかい(任意)]
const TYPING_ROMA_BANK = [
  [["A", "a"], ["I", "i"], ["U", "u"], ["E", "e"], ["O", "o"]],
  [["K", "k"], ["S", "s"], ["T", "t"], ["N", "n"], ["H", "h"]],
  [["か", "ka"], ["き", "ki"], ["く", "ku"], ["け", "ke"], ["こ", "ko"]],
  [["さ", "sa"], ["し", "shi"], ["す", "su"], ["せ", "se"], ["そ", "so"]],
  [["た", "ta"], ["ち", "chi"], ["つ", "tsu"], ["て", "te"], ["と", "to"]],
  [["な", "na"], ["に", "ni"], ["ぬ", "nu"], ["ね", "ne"], ["の", "no"]],
  [["は", "ha"], ["ひ", "hi"], ["ふ", "fu"], ["へ", "he"], ["ほ", "ho"]],
  [["ま", "ma"], ["み", "mi"], ["や", "ya"], ["ら", "ra"], ["わ", "wa"]],
  [["いぬ", "inu"], ["ねこ", "neko"], ["やま", "yama"], ["そら", "sora"], ["うみ", "umi"]],
  [["か", "ka"], ["さ", "sa"], ["た", "ta"], ["な", "na"], ["は", "ha"]],
  [["いぬ", "inu"], ["ねこ", "neko"], ["やま", "yama"], ["そら", "sora"], ["うみ", "umi"]],
  [["さかな", "sakana"], ["みかん", "mikan"], ["くるま", "kuruma"], ["つみき", "tsumiki"], ["おはな", "ohana"]],
  [["しゃしん", "shashin"], ["でんしゃ", "densha"], ["しゅくだい", "shukudai"], ["しょうがつ", "shougatsu"], ["おしゃれ", "oshare"]],
  [["ちゃわん", "chawan"], ["おちゃ", "ocha"], ["ちゅうい", "chuui"], ["ちょきん", "chokin"], ["かぼちゃ", "kabocha"]],
  [["きょう", "kyou"], ["きゅうり", "kyuuri"], ["りょうり", "ryouri"], ["ぎゅうにゅう", "gyuunyuu"], ["にゃんこ", "nyanko"]],
  [["らっぱ", "rappa"], ["きって", "kitte"], ["ねっこ", "nekko"], ["がっこう", "gakkou"], ["にっき", "nikki"]],
  [["えんぴつ", "enpitsu"], ["しんぶん", "shinbun"], ["さんぽ", "sanpo"], ["ほんだな", "hondana"], ["せんせい", "sensei"]],
  [["ともだち", "tomodachi"], ["たからばこ", "takarabako"], ["あさごはん", "asagohan"], ["すいとう", "suitou"], ["おとうさん", "otousan"]],
  [["たんじょうび", "tanjoubi"], ["うんどうかい", "undoukai"], ["しょうがっこう", "shougakkou"], ["かいすいよく", "kaisuiyoku"], ["じてんしゃ", "jitensha"]],
  [["ぱわーあっぷ", "pawaappu", ["pawaappu", "pawa-appu"]], ["ちゅうしゃき", "chuushaki"], ["きょうりゅう", "kyouryuu"], ["じゅんびたいそう", "junbitaisou"], ["でんせつのおべんきょめいじん", "densetsunoobenkyomeijin"]],
];

// けいさん: [かず] は「そのまま うつ」、[a, "+"/"-", b] は けいさん
const TYPING_MATH_BANK = [
  [[1], [2], [3], [4], [5]],
  [[6], [7], [8], [9], [10]],
  [[1, "+", 1], [2, "+", 1], [3, "+", 1], [4, "+", 1], [5, "+", 1]],
  [[1, "+", 2], [2, "+", 2], [3, "+", 2], [4, "+", 2], [5, "+", 2]],
  [[2, "+", 3], [4, "+", 1], [5, "+", 2], [6, "+", 3], [7, "+", 2]],
  [[8, "+", 2], [7, "+", 3], [6, "+", 4], [5, "+", 5], [9, "+", 1]],
  [[3, "-", 1], [4, "-", 1], [5, "-", 2], [6, "-", 2], [7, "-", 3]],
  [[8, "-", 3], [9, "-", 4], [10, "-", 5], [7, "-", 5], [6, "-", 4]],
  [[8, "+", 5], [9, "+", 4], [7, "+", 6], [6, "+", 8], [9, "+", 8]],
  [[12, "+", 5], [14, "+", 3], [16, "+", 2], [11, "+", 8], [15, "+", 4]],
  [[21, "+", 13], [32, "+", 14], [25, "+", 22], [41, "+", 18], [53, "+", 16]],
  [[28, "+", 17], [36, "+", 25], [47, "+", 18], [59, "+", 24], [64, "+", 27]],
  [[22, "+", 11], [31, "+", 12], [24, "+", 13], [42, "+", 15], [53, "+", 14]],
  [[26, "+", 13], [35, "+", 12], [43, "+", 16], [51, "+", 18], [62, "+", 15]],
  [[23, "+", 18], [34, "+", 27], [45, "+", 36], [56, "+", 28], [67, "+", 19]],
  [[28, "+", 36], [39, "+", 25], [47, "+", 34], [58, "+", 29], [66, "+", 27]],
  [[32, "+", 49], [48, "+", 37], [55, "+", 28], [64, "+", 19], [73, "+", 18]],
  [[46, "+", 38], [57, "+", 29], [68, "+", 24], [75, "+", 17], [86, "+", 13]],
  [[59, "+", 28], [67, "+", 25], [74, "+", 19], [83, "+", 16], [88, "+", 11]],
  [[87, "-", 49], [92, "-", 58], [74, "-", 37], [81, "-", 46], [95, "-", 67]],
];

const TYPING_COURSES = [
  { id: "roma", name: "ローマじ", icon: "⌨️", desc: "もじを ローマじで うとう" },
  { id: "math", name: "けいさん", icon: "🔢", desc: "こたえを すうじで うとう" },
];
const TYPING_MAX_LEVEL = 20;

const QUESTIONS_PER_LEVEL = 5;
const COIN_CLEAR = 20;      // はじめてクリア
const COIN_PERFECT = 10;    // ぜんもんせいかい ボーナス
const COIN_REPLAY = 5;      // もういちど あそんだとき
const COIN_TYPING_CLEAR = 15; // タイピング ぜんもんせいかい
