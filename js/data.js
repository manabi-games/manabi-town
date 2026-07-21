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
  // へやのかざり: size は へやの よこはば に たいする ％（どの がめんはば でも おなじ みため）
  { id: "rm_plant",   cat: "room", name: "かんようしょくぶつ", icon: "🪴", price: 35,  unlockLv: 3,  pos: { left: "27%", bottom: "26%" }, size: 8.0 },
  { id: "rm_book",    cat: "room", name: "ほんだな",           icon: "📚", price: 60,  unlockLv: 11, pos: { left: "3%",  bottom: "25%" }, size: 12.0 },
  { id: "rm_tv",      cat: "room", name: "テレビ",             icon: "📺", price: 80,  unlockLv: 8,  pos: { left: "77%", bottom: "21%" }, size: 11.5 },
  { id: "rm_sofa",    cat: "room", name: "ソファ",             icon: "🛋️", price: 100, unlockLv: 15, pos: { left: "6%",  bottom: "3%"  }, size: 15.0 },
  { id: "rm_fish",    cat: "room", name: "すいそう",           icon: "🐠", price: 120, unlockLv: 25, pos: { left: "75%", bottom: "2%"  }, size: 10.0 },
  { id: "rm_robot",   cat: "room", name: "ロボット",           icon: "🤖", price: 140, unlockLv: 21, pos: { left: "65%", bottom: "29%" }, size: 7.25 },
];

const SHOP_CATS = [
  { id: "hat",   name: "ぼうし" },
  { id: "outfit", name: "おようふく" },
  { id: "shirt", name: "ふくのいろ" },
  { id: "glasses", name: "めがね" },
  { id: "item",  name: "もちもの" },
  { id: "room",  name: "へやのかざり" },
  { id: "town",  name: "まちのかざり" },
];

// ---------- まちのかざり（かうと まちに ずっと かざられる） ----------
// x: まちのなかの よこいち(px) / b: じめんからのたかさ(px) / size: おおきさ(rem) / back: はいけいがわ
const TOWN_DECOR = [
  { id: "td_flower",   cat: "town", name: "はなだん",           icon: "🌷", deco: "🌷🌼🌷", price: 40,  unlockLv: 1,  x: 430,  b: 72,  size: 1.6 },
  { id: "td_bench",    cat: "town", name: "ベンチ",             icon: "🪑", deco: "🪑",     price: 60,  unlockLv: 1,  x: 1660, b: 74,  size: 2.2 },
  { id: "td_lantern",  cat: "town", name: "ちょうちん",         icon: "🏮", deco: "🏮",     price: 70,  unlockLv: 1,  x: 1300, b: 200, size: 2.2 },
  { id: "td_sunflower", cat: "town", name: "ひまわりばたけ",    icon: "🌻", deco: "🌻🌻🌻", price: 90,  unlockLv: 1,  x: 860,  b: 72,  size: 1.8 },
  { id: "td_koinobori", cat: "town", name: "こいのぼり",        icon: "🎏", deco: "🎏",     price: 110, unlockLv: 3,  x: 2040, b: 210, size: 3.0 },
  { id: "td_tent",     cat: "town", name: "キャンプテント",     icon: "⛺", deco: "⛺",     price: 130, unlockLv: 5,  x: 3440, b: 130, size: 2.8 },
  { id: "td_slide",    cat: "town", name: "すべりだい",         icon: "🛝", deco: "🛝",     price: 150, unlockLv: 7,  x: 3560, b: 74,  size: 2.8 },
  { id: "td_snowman",  cat: "town", name: "ゆきだるま",         icon: "⛄", deco: "⛄",     price: 170, unlockLv: 9,  x: 950,  b: 72,  size: 2.4 },
  { id: "td_fountain", cat: "town", name: "おおふんすい",       icon: "⛲", deco: "⛲",     price: 200, unlockLv: 12, x: 1160, b: 150, size: 3.4, back: true },
  { id: "td_moai",     cat: "town", name: "モアイぞう",         icon: "🗿", deco: "🗿",     price: 230, unlockLv: 15, x: 4420, b: 74,  size: 2.6 },
  { id: "td_carousel", cat: "town", name: "メリーゴーランド",   icon: "🎠", deco: "🎠",     price: 280, unlockLv: 18, x: 2450, b: 190, size: 3.6, back: true },
  { id: "td_circus",   cat: "town", name: "サーカステント",     icon: "🎪", deco: "🎪",     price: 320, unlockLv: 21, x: 640,  b: 200, size: 4.2, back: true },
  { id: "td_dino",     cat: "town", name: "きょうりゅうぞう",   icon: "🦖", deco: "🦖",     price: 360, unlockLv: 24, x: 3050, b: 180, size: 3.8, back: true },
  { id: "td_tower",    cat: "town", name: "おおきなタワー",     icon: "🗼", deco: "🗼",     price: 420, unlockLv: 27, x: 60,   b: 200, size: 5.0, back: true },
  { id: "td_wheel",    cat: "town", name: "かんらんしゃ",       icon: "🎡", deco: "🎡",     price: 500, unlockLv: 31, x: 3930, b: 200, size: 6.0, back: true },
  { id: "td_rocket",   cat: "town", name: "うちゅうロケット",   icon: "🚀", deco: "🚀",     price: 600, unlockLv: 36, x: 4720, b: 190, size: 4.6, back: true },
];
SHOP_ITEMS.push(...TOWN_DECOR);
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
    lines: ["まちの みんなが きみの うわさを してるよ", "もうすぐ だい6しょう クリアだね！", "きみは まちの ヒーローだよ✨", "わたしの いえに ようこそ！"] },
  { id: "f7", name: "ゆきちゃん", unlockLv: 32, houseColor: "#90caf9",
    avatar: { skin: 0, hairStyle: "png_h03", hairColor: 1, eyes: "sleepy", mouth: "smile", shirt: "#90caf9" },
    lines: ["ゆきみたいに きれいだよね", "アイスは さいこう", "あしたも あそびに きてね", "こおりのくにに いってみたいな"] },
  { id: "f8", name: "だいちくん", unlockLv: 38, houseColor: "#66bb6a",
    avatar: { skin: 2, hairStyle: "spiky", hairColor: 2, eyes: "round", mouth: "open", shirt: "#66bb6a" },
    lines: ["きょうりゅうって つよいのだ！ガオー！", "これ きょうりゅうの ほねなのだ。みてみて！", "きょうりゅうはかせは いつも げんきなのだ！", "かっこいい ほんを よんだのだ"] },
  { id: "f9", name: "みおちゃん", unlockLv: 44, houseColor: "#4dd0e1",
    avatar: { skin: 1, hairStyle: "png_h05", hairColor: 0, eyes: "happy", mouth: "cat", shirt: "#4dd0e1" },
    lines: ["さかなって いっぱい いるんだ〜", "すいぞくかん だいすき〜", "さかなを みてると たのしいな〜", "つり また しようよ〜"] },
  { id: "f10", name: "レオくん", unlockLv: 48, houseColor: "#ff7043",
    avatar: { skin: 0, hairStyle: "png_h07", hairColor: 3, eyes: "star", mouth: "open", shirt: "#ff7043" },
    lines: ["えいごって たのしいよ。きみも やってみるかい？", "ハロー！きょうも いいてんきだね", "えいごで はなすと かっこいいでしょ？", "また えいごのゲーム しようぜ。グッジョブ！"] },
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

// ---------- つり ----------
// さかな・つりばしょ は「つりじま」から移植（名前・レアど・せいそくち は原作準拠）
const FISHING_PLACES = [
  { id: "pond",    name: "はじまりのいけ",   img: "assets/stages/stage_pond.webp",    unlockLv: 0,  desc: "みどりに かこまれた しずかな いけ" },
  { id: "river",   name: "きらきらがわ",     img: "assets/stages/stage_river.webp",   unlockLv: 6,  desc: "ながれる ひかりの かわ" },
  { id: "coast",   name: "あおぞらかいがん", img: "assets/stages/stage_coast.webp",   unlockLv: 12, desc: "なみと すなはまの うみ" },
  { id: "deep",    name: "ふしぎしんかい",   img: "assets/stages/stage_deep.webp",    unlockLv: 18, desc: "くらい うみのそこ" },
  { id: "phantom", name: "まぼろしじま",     img: "assets/stages/stage_phantom.webp", unlockLv: 24, desc: "にじの ひみつばしょ" },
];
const PLACE_MAP = Object.fromEntries(FISHING_PLACES.map((p) => [p.id, p]));

const fishDef = (id, name, rarity, place, img) => ({ id, name, rarity, place, img: `assets/fish/${img}.png` });
const FISHES = [
  // はじまりのいけ
  fishDef("medaka",     "ひかりメダカ",       "normal", "pond", "medaka"),
  fishDef("funna",      "まるフナ",           "normal", "pond", "funna"),
  fishDef("tanago",     "ももタナゴ",         "normal", "pond", "tanago"),
  fishDef("dojo",       "にょろドジョウ",     "normal", "pond", "dojo"),
  fishDef("koi_baby",   "こいこいコイ",       "normal", "pond", "koi_baby"),
  fishDef("candy",      "キャンディフィッシュ", "normal", "pond", "candy"),
  fishDef("kingyo",     "こがねキンギョ",     "rare",   "pond", "rare_kingyo"),
  // きらきらがわ
  fishDef("yamame",     "しまヤマメ",         "normal", "river", "yamame"),
  fishDef("hasu",       "はねハス",           "normal", "river", "hasu"),
  fishDef("kawaebi",    "ぴょんエビ",         "normal", "river", "kawaebi"),
  fishDef("leaf",       "このはフィッシュ",   "normal", "river", "leaf"),
  fishDef("niji_masu",  "きらきらニジマス",   "rare",   "river", "rare_nijimasu"),
  fishDef("ayu",        "ぎんいろアユ",       "rare",   "river", "rare_ayu"),
  fishDef("hotaru",     "ほたるフィッシュ",   "rare",   "river", "hotaru"),
  // あおぞらかいがん
  fishDef("iwashi",     "きらめきイワシ",     "normal", "coast", "iwashi"),
  fishDef("aji",        "はやてアジ",         "normal", "coast", "aji"),
  fishDef("tai_small",  "こだいタイ",         "normal", "coast", "tai_small"),
  fishDef("cloud",      "くもフィッシュ",     "normal", "coast", "cloud"),
  fishDef("tobiuo",     "あおぞらトビウオ",   "rare",   "coast", "rare_tobiuo"),
  fishDef("ishidai",    "しましまイシダイ",   "rare",   "coast", "rare_ishidai"),
  fishDef("fugu",       "さくらフグ",         "rare",   "coast", "rare_fugu"),
  fishDef("manta",      "ほしぞらマンタ",     "legend", "coast", "super_manta"),
  // ふしぎしんかい
  fishDef("ankou",      "ランプアンコウ",     "normal", "deep", "ankou"),
  fishDef("ika",        "すいすいイカ",       "normal", "deep", "ika"),
  fishDef("shell",      "うたうかい",         "normal", "deep", "shell"),
  fishDef("unagi",      "よぞらウナギ",       "rare",   "deep", "rare_unagi"),
  fishDef("snow",       "ゆきフィッシュ",     "rare",   "deep", "snow"),
  fishDef("kurage",     "ひかりクラゲ",       "legend", "deep", "super_kurage"),
  fishDef("shark",      "ぎんがザメ",         "legend", "deep", "super_shark"),
  fishDef("salmon",     "オーロラサケ",       "legend", "deep", "super_salmon"),
  // まぼろしじま
  fishDef("moon",       "つきあかりフィッシュ", "rare", "phantom", "moon"),
  fishDef("sun",        "たいようフィッシュ", "rare",   "phantom", "sun"),
  fishDef("koi_legend", "にじいろコイ",       "legend", "phantom", "legend_koi"),
  fishDef("tai_legend", "おうごんタイ",       "legend", "phantom", "legend_tai"),
  fishDef("coelacanth", "まぼろしシーラカンス", "legend", "phantom", "legend_coelacanth"),
  fishDef("maguro",     "おうじゃマグロ",     "legend", "phantom", "legend_maguro"),
  fishDef("star",       "ながれぼしフィッシュ", "legend", "phantom", "star"),
  fishDef("ryugu",      "りゅうぐうのつかい", "mythic", "phantom", "legend_ryugu"),
  fishDef("crystal",    "クリスタルフィッシュ", "mythic", "phantom", "crystal"),
  fishDef("rainbow",    "にじのぬし",         "mythic", "phantom", "rainbow"),
];
const FISH_MAP = Object.fromEntries(FISHES.map((f) => [f.id, f]));

// レアど: minLv = がっこうのクリアレベルが これいじょうで つれるようになる
const RARITY_INFO = {
  normal: { label: "ふつう",     stars: "⭐",       weight: 70, minLv: 0 },
  rare:   { label: "めずらしい", stars: "⭐⭐",     weight: 21, minLv: 0 },
  legend: { label: "でんせつ",   stars: "⭐⭐⭐",   weight: 7,  minLv: 10 },
  mythic: { label: "きせき",     stars: "🌈⭐⭐⭐", weight: 2,  minLv: 20 },
};

// つりけん の もらいかた
const TICKET_FIRST_CLEAR = 2;   // がっこう はじめてクリア
const TICKET_PERFECT = 1;       // がっこう・タイピング ぜんもんせいかい
const TICKET_QUEST = 1;         // おねがい たっせい
const TICKET_MISSION = 1;       // きょうのミッション 1つ
const MISSION_BONUS_COINS = 30; // ミッション ぜんぶ たっせい

// きょうのミッション（まいにち 3つ えらばれる）
const DAILY_MISSION_POOL = [
  { id: "school", icon: "🏫", label: "がっこうで 1レベル クリアする" },
  { id: "typing", icon: "⌨️", label: "タイピングで ぜんもんせいかい する" },
  { id: "fish",   icon: "🎣", label: "さかなを 1ぴき つる" },
  { id: "feed",   icon: "🍎", label: "だれかに たべものを あげる" },
  { id: "quest",  icon: "📋", label: "おねがいを 1つ かなえる" },
];

// ---------- まちの建物 ----------
const TOWN_W = 4820;
const BUILDINGS = [
  { id: "myhome", x: 150,  w: 230, name: "じぶんのいえ", emoji: "🏠", wall: "#fff3e0", roof: "#4fc3f7", screen: "home" },
  { id: "school", x: 520,  w: 300, name: "がっこう",     emoji: "🏫", wall: "#ffecb3", roof: "#e57373", screen: "map" },
  { id: "dojo",   x: 980,  w: 260, name: "タイピングどうじょう", emoji: "⌨️", wall: "#e8f5e9", roof: "#66bb6a", screen: "dojo" },
  { id: "bakery", x: 1390, w: 230, name: "たべものやさん", emoji: "🍞", wall: "#ffe9d6", roof: "#a1887f", screen: "bakery", awning: true },
  { id: "shop",   x: 1720, w: 260, name: "おみせ",       emoji: "🛍️", wall: "#fff8e1", roof: "#ffa726", screen: "shop", awning: true },
];
// トモダチの家（unlockLvで出現）
const FRIEND_HOUSE_X = [2120, 2320, 2520, 2720, 2920, 3120, 3620, 3820, 4020, 4220];
// こうえん（ペットがあつまる）
const PARK_X = 3350;
// つりば（まちの いちばん みぎはし）
const FISHING_X = 4460;

// ---------- なかよしど（ハート） ----------
const HEART_MAX = 20;
const HEART_TITLES = [
  { min: 20, title: "しんゆう💖" },
  { min: 12, title: "なかよし💕" },
  { min: 5,  title: "ともだち💗" },
  { min: 0,  title: "しりあい🤍" },
];
const QUEST_REWARD_COINS = 15;
const HEART_GIFT_LEVELS = [5, 12, 20]; // ここに とうたつすると トモダチから プレゼント

// ---------- たべもの ----------
const FOODS = [
  { id: "food_apple",      name: "りんご",     icon: "🍎", price: 15 },
  { id: "food_banana",     name: "バナナ",     icon: "🍌", price: 15 },
  { id: "food_strawberry", name: "いちご",     icon: "🍓", price: 20 },
  { id: "food_orange",     name: "みかん",     icon: "🍊", price: 15 },
  { id: "food_grape",      name: "ぶどう",     icon: "🍇", price: 20 },
  { id: "food_watermelon", name: "すいか",     icon: "🍉", price: 25 },
  { id: "food_cake",       name: "ケーキ",     icon: "🍰", price: 30 },
  { id: "food_cookie",     name: "クッキー",   icon: "🍪", price: 20 },
  { id: "food_candy",      name: "あめ",       icon: "🍬", price: 10 },
  { id: "food_chocolate",  name: "チョコ",     icon: "🍫", price: 25 },
  { id: "food_icecream",   name: "アイス",     icon: "🍦", price: 30 },
  { id: "food_donut",      name: "ドーナツ",   icon: "🍩", price: 25 },
];
const FOOD_MAP = Object.fromEntries(FOODS.map((f) => [f.id, f]));

// ---------- トモダチの こせい（こえ・だいこうぶつ・セリフ） ----------
const FRIEND_EXTRAS = {
  f1: {
    voice: { pitch: 1.6, rate: 0.95 },
    favFood: "food_strawberry", badFood: "food_chocolate",
    foodLove: "わあ、いちご！！だいすきなの💕 ありがとう！！",
    foodOk: "おいしいね…🌸 ありがとうね",
    foodBad: "チョコは ちょっと にがてなの…でも きもちが うれしいな",
    giftThanks: ["わあ、すてき…💕 ありがとう！", "これ すごく かわいい…💗 だいじにするね！"],
    questThanks: ["ありがとう…たすかっちゃった🌸", "うれしい…やさしいんだね…💕"],
    remind: "あのね…おねがい、まってるね🌸",
  },
  f2: {
    voice: { pitch: 0.8, rate: 1.1 },
    favFood: "food_banana", badFood: "food_cake",
    foodLove: "バナナ！！さいこうだぜ！！⚽ パワー100ぱーせんとだ！！",
    foodOk: "おお！うめえ！ありがとな！",
    foodBad: "ケーキかあ…あまいの にがてなんだよな…でも ありがとな！",
    giftThanks: ["うおお！すげえ！ありがとだぜ！🔥", "こんなの もらっちゃっていいのか？ さいこうだぜ！"],
    questThanks: ["おし！やってくれたんだな！ありがとだぜ！", "よっしゃ！たすかったぜ！"],
    remind: "おーい！れいの おねがい、たのんだぜ！",
  },
  f3: {
    voice: { pitch: 1.7, rate: 0.85 },
    favFood: "food_grape", badFood: "food_candy",
    foodLove: "ぶどう…✨ つぶつぶが ほしみたいで だいすき…✨ ありがとう…",
    foodOk: "おいしいね…☁️ ありがとう…",
    foodBad: "あめは…はが いたくなっちゃうの…でも ありがとう…",
    giftThanks: ["わあ…きれい…✨ ありがとう…💫", "これ…すてき…✨ だいじにするね…"],
    questThanks: ["ありがとう…やさしいね…✨", "たすかったよ…ありがとう…☁️"],
    remind: "あのね…おねがいのこと…おぼえてる…？",
  },
  f4: {
    voice: { pitch: 0.55, rate: 1.12 },
    favFood: "food_watermelon", badFood: "food_cookie",
    foodLove: "がはは！！すいか！！さいこうだ！！🍉 ありがとな！！",
    foodOk: "おっ！うめえ！ありがとよ！",
    foodBad: "クッキーかあ…ちっちゃくて たりねえなあ…がはは！でも ありがとよ！",
    giftThanks: ["がはは！いいもん もらった！ありがとよ！🎉", "おお！これは かっこいいぞ！ありがとな！"],
    questThanks: ["がはは！やってくれたか！ありがとな！", "よし！たすかったぞ！"],
    remind: "おう！れいの おねがい、まってるぞ！がはは！",
  },
  f5: {
    voice: { pitch: 1.45, rate: 1.05 },
    favFood: "food_donut", badFood: "food_watermelon",
    foodLove: "ドーナツ！！さいこうなの…💕 ありがとうなの♪♪",
    foodOk: "おいしい…☆ ありがとなの♪",
    foodBad: "すいかは たねが にがてなの…でも ありがとね♪",
    giftThanks: ["わあ！かわいい…💕 ありがとうなの♪", "すてき…♪ だいじにするなの✨"],
    questThanks: ["ありがとうなの♪ おれいに こんど ケーキ やくね！", "うれしい…ありがとなの…♪"],
    remind: "ねえねえ、おねがいのこと わすれてないよね？♪",
  },
  f6: {
    voice: { pitch: 1.15, rate: 0.88 },
    favFood: "food_icecream", badFood: "food_apple",
    foodLove: "アイス…！ わたしの だいこうぶつ、よく わかったね🍦 ありがとう",
    foodOk: "おいしいね、ありがとう",
    foodBad: "りんごは すこし にがてなの…でも きもちは うれしいわ",
    giftThanks: ["ありがとう、とても うれしいわ💫", "すてきね、たいせつに するわね"],
    questThanks: ["ありがとう、たすかったわ", "さすがね、ありがとう"],
    remind: "れいの おねがい、おぼえていてね",
  },
};

// あたらしいトモダチ 4人の こせい
Object.assign(FRIEND_EXTRAS, {
  f7: {
    voice: { pitch: 1.3, rate: 0.92 },
    favFood: "food_icecream", badFood: "food_strawberry",
    foodLove: "アイスだ。……さいこうだね。ありがとう",
    foodOk: "ありがとう。たべるね",
    foodBad: "いちごは つめたくないから にがて…でも きもちは うれしいよ",
    giftThanks: ["プレゼント？うれしいな。ありがとうね", "そっか。だいじにするね"],
    questThanks: ["たすかった。ありがとうね", "さすがだね。きみは いいひとだ"],
    remind: "おねがい、まだかな…まってるね",
  },
  f8: {
    voice: { pitch: 0.65, rate: 1.08 },
    favFood: "food_watermelon", badFood: "food_chocolate",
    foodLove: "すいかだ！！きょうりゅうも だいすきな たべものなのだ！ガオー！",
    foodOk: "ありがとうなのだ！はかせは よろこんでいるのだ",
    foodBad: "チョコは てが ベタベタして ほねが さわれなくなるのだ…でも ありがとうなのだ",
    giftThanks: ["もらったのだ！きょうりゅうより うれしいのだ！", "ありがとうなのだ！ガオー！"],
    questThanks: ["おかげで たいせつな けんきゅうが できたのだ！ガオー！", "きみは えらいのだ。また たのむのだ！"],
    remind: "れいの おねがい、まだなのだ。たのんだのだ！ガオー！",
  },
  f9: {
    voice: { pitch: 1.55, rate: 0.87 },
    favFood: "food_apple", badFood: "food_donut",
    foodLove: "りんご？やった〜。さかなみたいに ぴちぴちに なっちゃう〜",
    foodOk: "ありがとう〜。たべるね〜",
    foodBad: "ドーナツは あなが あいてて にげられそう〜…でも ありがとう〜",
    giftThanks: ["わあ〜。ありがとう〜。たからもの〜", "うれしいな〜。だいじにするね〜"],
    questThanks: ["ありがとう〜。さかなも よろこんでたよ〜", "たすかった〜。また つりに いこっか〜"],
    remind: "あのおねがい、まだ〜？まってるよ〜",
  },
  f10: {
    voice: { pitch: 1.1, rate: 1.0 },
    favFood: "food_cake", badFood: "food_candy",
    foodLove: "グレート！ケーキだ！さいこうの プレゼント。グッジョブ！",
    foodOk: "サンキュー！ベリー おいしい！",
    foodBad: "オー、ノー…あめは ちょっと…でも サンキュー！",
    giftThanks: ["アメージング！ありがとう！", "グッジョブ！きみは すごいやつだ"],
    questThanks: ["ヘルプしてくれて ベリーサンキュー！", "グレート！きみの おかげで ビッグスマイルだ！"],
    remind: "ハロー！れいの おねがい、まだかな？",
  },
});

// ---------- ペットの おさんぽ（つれあるき） ----------
const PET_FOLLOW_LINES = {
  p1:  { go: "ワン！ぼくも いくよ！", bye: "また あした！ワン！" },
  p2:  { go: "ふーん。いこっか", bye: "またね〜" },
  p3:  { go: "ぴょん！ぴょんぴょん！たのしい〜！", bye: "また あそぼうね！ぴょん！" },
  p4:  { go: "ツイテイク〜！ツイテイク〜！", bye: "マタネ〜！マタネ〜！" },
  p5:  { go: "キラキラ〜！いっしょに いこう！", bye: "また あした！キラキラ〜！" },
  p6:  { go: "ほっぺに おやつ つめて いくね！", bye: "またね！チュチュ！" },
  p7:  { go: "ゆっくり いこうね〜", bye: "またね〜。ゆっくりね" },
  p8:  { go: "コンコン！おさんぽ だいすき！", bye: "またね！こんどは かくれんぼ しようぜ！" },
  p9:  { go: "…ゆっくり…いこうか…", bye: "…またね…" },
  p10: { go: "ペタペタペタ！いっしょに いこう！", bye: "また あした！ペタペタ〜！" },
};

// ---------- ペットに ごはんを あげたとき ----------
const PET_FEED_LINES = {
  p1:  ["ワンワン！！おいしいー！🐕", "しっぽ ぶんぶん！ありがとう！"],
  p2:  ["ニャ〜ン😸 おいしい…", "ゴロゴロ…ありがとね♪"],
  p3:  ["ぴょんぴょん！🐰 おいしーい！", "はな ひくひく…ありがとう！"],
  p4:  ["オイシイ！オイシイ！🦜", "アリガトー！ピピッ♪"],
  p5:  ["キラキラ〜✨ おいしい！🦄", "にじいろの あじが する〜✨"],
  p6:  ["ほっぺに つめちゃお！🐹", "もぐもぐ…ありがとう…"],
  p7:  ["もぐもぐ…🐼 おいしいね…", "ささより おいしいかも…！"],
  p8:  ["コンコン！🦊 うまい！", "しっぽが ふわっと しちゃった！"],
  p9:  ["ゆっくり あじわうよ…🐢", "のんびり…もぐもぐ…ありがとう"],
  p10: ["ペタペタ！🐧 おいしい！", "おさかなの つぎに すき！"],
};

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

// ---------- えいごたんご ----------
const ENGLISH_WORDS = [
  { e: "🐶", en: "dog",      kana: "ドッグ",       ja: "いぬ" },
  { e: "🐱", en: "cat",      kana: "キャット",     ja: "ねこ" },
  { e: "🐻", en: "bear",     kana: "ベア",         ja: "くま" },
  { e: "🦊", en: "fox",      kana: "フォックス",   ja: "きつね" },
  { e: "🐰", en: "rabbit",   kana: "ラビット",     ja: "うさぎ" },
  { e: "🦁", en: "lion",     kana: "ライオン",     ja: "らいおん" },
  { e: "🐟", en: "fish",     kana: "フィッシュ",   ja: "さかな" },
  { e: "🐘", en: "elephant", kana: "エレファント", ja: "ぞう" },
  { e: "🍎", en: "apple",    kana: "アップル",     ja: "りんご" },
  { e: "🍌", en: "banana",   kana: "バナナ",       ja: "ばなな" },
  { e: "🍊", en: "orange",   kana: "オレンジ",     ja: "みかん" },
  { e: "🍇", en: "grape",    kana: "グレープ",     ja: "ぶどう" },
  { e: "🍰", en: "cake",     kana: "ケーキ",       ja: "ケーキ" },
  { e: "🥛", en: "milk",     kana: "ミルク",       ja: "ぎゅうにゅう" },
  { e: "🍬", en: "candy",    kana: "キャンディ",   ja: "あめ" },
  { e: "🍩", en: "donut",    kana: "ドーナツ",     ja: "ドーナツ" },
  { e: "🔴", en: "red",      kana: "レッド",       ja: "あか" },
  { e: "🔵", en: "blue",     kana: "ブルー",       ja: "あお" },
  { e: "🟡", en: "yellow",   kana: "イエロー",     ja: "きいろ" },
  { e: "🟢", en: "green",    kana: "グリーン",     ja: "みどり" },
  { e: "⭐", en: "star",     kana: "スター",       ja: "ほし" },
  { e: "🌙", en: "moon",     kana: "ムーン",       ja: "つき" },
  { e: "☀️", en: "sun",      kana: "サン",         ja: "たいよう" },
  { e: "🌸", en: "flower",   kana: "フラワー",     ja: "はな" },
];

// ---------- 1ねんせいの かんじ だい2だん ----------
const KANJI_BASIC2 = [
  { k: "人", y: "ひと",   e: "🧍" }, { k: "子", y: "こ",     e: "👶" },
  { k: "男", y: "おとこ", e: "👦" }, { k: "女", y: "おんな", e: "👧" },
  { k: "上", y: "うえ",   e: "⬆️" }, { k: "下", y: "した",   e: "⬇️" },
  { k: "中", y: "なか",   e: "🎯" }, { k: "右", y: "みぎ",   e: "➡️" },
  { k: "左", y: "ひだり", e: "⬅️" }, { k: "白", y: "しろ",   e: "⚪" },
  { k: "赤", y: "あか",   e: "🔴" }, { k: "青", y: "あお",   e: "🔵" },
  { k: "本", y: "ほん",   e: "📖" }, { k: "竹", y: "たけ",   e: "🎋" },
  { k: "林", y: "はやし", e: "🌲" }, { k: "町", y: "まち",   e: "🏘️" },
  { k: "村", y: "むら",   e: "🏞️" }, { k: "力", y: "ちから", e: "💪" },
  { k: "耳", y: "みみ",   e: "👂" }, { k: "玉", y: "たま",   e: "🔮" },
];

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
  // だい7しょう: えいごにちょうせん (Lv31-35)
  { lv: 31, title: "えいご①どうぶつ",   cats: ["engPic"] },
  { lv: 32, title: "えいご②たべもの",   cats: ["engPic", "engJa2En"] },
  { lv: 33, title: "3つのかずのけいさん", cats: ["add3"] },
  { lv: 34, title: "えいご③よめるかな", cats: ["engEn2Ja"] },
  { lv: 35, title: "けいさんのおうよう", cats: ["add3", "mix3"] },
  // だい8しょう: おおきなかずマスター (Lv36-40)
  { lv: 36, title: "なんじゅうのけいさん", cats: ["tensCalc"] },
  { lv: 37, title: "2けたのたしざん",   cats: ["add2d1d"] },
  { lv: 38, title: "えいご④いろいろ",   cats: ["engJa2En", "engEn2Ja"] },
  { lv: 39, title: "とけい③15ふん",     cats: ["clockQuarter"] },
  { lv: 40, title: "ぶんしょうだい②",   cats: ["story3", "story_sub"] },
  // だい9しょう: かんじはかせ (Lv41-45)
  { lv: 41, title: "かんじ④",           cats: ["kanjiRead2"] },
  { lv: 42, title: "えいご⑤マスター",   cats: ["engPic", "engEn2Ja", "engJa2En"] },
  { lv: 43, title: "けいさんミックス",   cats: ["add2d1d", "tensCalc", "mix3"] },
  { lv: 44, title: "かんじ⑤",           cats: ["kanjiRead2", "kanjiPick2"] },
  { lv: 45, title: "100までのけいさん", cats: ["add100", "tensCalc", "seq100"] },
  // だい10しょう: でんせつのテスト (Lv46-50)
  { lv: 46, title: "そうふくしゅう①",   cats: ["addCarry", "subBorrow", "kanjiRead", "clockHalf"] },
  { lv: 47, title: "えいごチャンピオン", cats: ["engPic", "engJa2En", "engEn2Ja"] },
  { lv: 48, title: "けいさんチャンピオン", cats: ["add3", "add2d1d", "mix3", "tensCalc"] },
  { lv: 49, title: "そうふくしゅう②",   cats: ["kanjiRead2", "engEn2Ja", "clockQuarter", "story3"] },
  { lv: 50, title: "でんせつのさいしゅうテスト！！",
    cats: ["addCarry", "subBorrow", "kanjiRead2", "clockQuarter", "engJa2En", "engEn2Ja", "add2d1d", "mix3", "story3", "kanjiPick2"],
    questions: 10, needPerfect: true, rewardCoins: 100, rewardTickets: 5 },
];

const CHAPTERS = [
  { start: 1,  name: "だい1しょう 🌱 はじめてのべんきょう" },
  { start: 6,  name: "だい2しょう 🌻 たしざんとカタカナ" },
  { start: 11, name: "だい3しょう 🍎 ひきざんにちょうせん" },
  { start: 16, name: "だい4しょう 🍁 かんじとくりあがり" },
  { start: 21, name: "だい5しょう ⛄ とけいとくりさがり" },
  { start: 26, name: "だい6しょう 🌈 まなびマスターへのみち" },
  { start: 31, name: "だい7しょう 🌍 えいごにちょうせん" },
  { start: 36, name: "だい8しょう 🚀 おおきなかずマスター" },
  { start: 41, name: "だい9しょう 👑 かんじはかせ" },
  { start: 46, name: "だい10しょう 🏆 でんせつのテスト" },
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
