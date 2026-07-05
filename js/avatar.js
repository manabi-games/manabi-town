/* ================= アバターSVGレンダラー ================= */
// config: { skin, hairStyle, hairColor, eyes, shirt, hat, glasses, item }
// skin/hairColor はインデックス、shirt は色文字列、hat/glasses/item はアイテムID

function renderAvatar(cfg) {
  const skin = SKIN_COLORS[cfg.skin ?? 0];
  const hair = HAIR_COLORS[cfg.hairColor ?? 0];
  const shirt = cfg.shirt || SHIRT_COLORS_FREE[0];
  const isRainbow = shirt === "rainbow";

  let defs = "";
  if (isRainbow) {
    defs = `<defs><linearGradient id="rainbowG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#ff8a80"/><stop offset="25%" stop-color="#ffd54f"/>
      <stop offset="50%" stop-color="#81c784"/><stop offset="75%" stop-color="#4fc3f7"/>
      <stop offset="100%" stop-color="#b39ddb"/></linearGradient></defs>`;
  }
  const shirtFill = isRainbow ? "url(#rainbowG)" : shirt;

  // ---- からだ ----
  const body = `
    <path d="M 62 170 Q 62 148 100 148 Q 138 148 138 170 L 138 218 Q 138 228 128 228 L 72 228 Q 62 228 62 218 Z" fill="${shirtFill}"/>
    <circle cx="52" cy="196" r="11" fill="${skin}"/>
    <circle cx="148" cy="196" r="11" fill="${skin}"/>
    <path d="M 62 172 Q 48 180 50 194" stroke="${shirtFill}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M 138 172 Q 152 180 150 194" stroke="${shirtFill}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <rect x="76" y="226" width="16" height="20" rx="7" fill="${skin}"/>
    <rect x="108" y="226" width="16" height="20" rx="7" fill="${skin}"/>
    <ellipse cx="84" cy="250" rx="13" ry="7" fill="#795548"/>
    <ellipse cx="116" cy="250" rx="13" ry="7" fill="#795548"/>`;

  // ---- かお ----
  const face = `<circle cx="100" cy="100" r="52" fill="${skin}"/>
    <ellipse cx="76" cy="118" rx="8" ry="5" fill="#ffab91" opacity=".6"/>
    <ellipse cx="124" cy="118" rx="8" ry="5" fill="#ffab91" opacity=".6"/>`;

  // ---- め ----
  let eyes = "";
  const eyeStyle = cfg.eyes || "round";
  if (eyeStyle === "round") {
    eyes = `<circle cx="82" cy="100" r="6" fill="#3e2723"/><circle cx="118" cy="100" r="6" fill="#3e2723"/>
      <circle cx="84" cy="98" r="2" fill="#fff"/><circle cx="120" cy="98" r="2" fill="#fff"/>`;
  } else if (eyeStyle === "happy") {
    eyes = `<path d="M 74 102 Q 82 92 90 102" stroke="#3e2723" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M 110 102 Q 118 92 126 102" stroke="#3e2723" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  } else { // star
    eyes = `<text x="82" y="107" font-size="17" text-anchor="middle">✨</text>
      <text x="118" y="107" font-size="17" text-anchor="middle">✨</text>`;
  }

  const mouth = `<path d="M 90 122 Q 100 132 110 122" stroke="#3e2723" stroke-width="4" fill="none" stroke-linecap="round"/>`;

  // ---- かみのけ ----
  let hairSvg = "";
  const hs = cfg.hairStyle || "short";
  if (hs === "short") {
    hairSvg = `<path d="M 48 96 Q 44 44 100 44 Q 156 44 152 96 Q 152 70 128 66 Q 138 60 130 54 Q 112 66 72 66 Q 52 70 48 96 Z" fill="${hair}"/>`;
  } else if (hs === "spiky") {
    hairSvg = `<path d="M 48 96 Q 46 56 62 58 L 66 44 L 78 56 L 88 40 L 98 56 L 110 40 L 118 56 L 132 44 L 136 58 Q 154 56 152 96 Q 140 62 100 62 Q 60 62 48 96 Z" fill="${hair}"/>`;
  } else if (hs === "long") {
    hairSvg = `<path d="M 48 96 Q 44 42 100 42 Q 156 42 152 96 L 156 150 Q 146 158 138 148 L 136 96 Q 132 64 100 64 Q 68 64 64 96 L 62 148 Q 54 158 44 150 Z" fill="${hair}"/>`;
  } else { // twintail
    hairSvg = `<path d="M 48 96 Q 44 44 100 44 Q 156 44 152 96 Q 148 66 100 62 Q 52 66 48 96 Z" fill="${hair}"/>
      <path d="M 46 90 Q 26 96 30 134 Q 32 148 42 144 Q 38 112 52 100 Z" fill="${hair}"/>
      <path d="M 154 90 Q 174 96 170 134 Q 168 148 158 144 Q 162 112 148 100 Z" fill="${hair}"/>
      <circle cx="49" cy="94" r="6" fill="#ff5c8d"/><circle cx="151" cy="94" r="6" fill="#ff5c8d"/>`;
  }

  // ---- めがね ----
  let glassesSvg = "";
  if (cfg.glasses === "gl_round") {
    glassesSvg = `<circle cx="82" cy="100" r="14" fill="none" stroke="#5d4037" stroke-width="3.5"/>
      <circle cx="118" cy="100" r="14" fill="none" stroke="#5d4037" stroke-width="3.5"/>
      <line x1="96" y1="100" x2="104" y2="100" stroke="#5d4037" stroke-width="3.5"/>`;
  } else if (cfg.glasses === "gl_sun") {
    glassesSvg = `<circle cx="82" cy="100" r="14" fill="#37474f" opacity=".85"/>
      <circle cx="118" cy="100" r="14" fill="#37474f" opacity=".85"/>
      <line x1="96" y1="100" x2="104" y2="100" stroke="#37474f" stroke-width="4"/>`;
  } else if (cfg.glasses === "gl_star") {
    glassesSvg = `<text x="82" y="110" font-size="30" text-anchor="middle">⭐</text>
      <text x="118" y="110" font-size="30" text-anchor="middle">⭐</text>`;
  }

  // ---- ぼうし ----
  let hatSvg = "";
  switch (cfg.hat) {
    case "hat_cap":
      hatSvg = `<path d="M 54 66 Q 58 34 100 34 Q 142 34 146 66 Z" fill="#e53935"/>
        <path d="M 140 60 Q 172 60 174 72 Q 150 70 138 68 Z" fill="#c62828"/>
        <circle cx="100" cy="36" r="6" fill="#c62828"/>`;
      break;
    case "hat_straw":
      hatSvg = `<ellipse cx="100" cy="62" rx="72" ry="14" fill="#e8c96b"/>
        <path d="M 62 62 Q 64 26 100 26 Q 136 26 138 62 Z" fill="#f2d98a"/>
        <path d="M 62 54 Q 100 62 138 54 L 138 62 Q 100 70 62 62 Z" fill="#e57373"/>`;
      break;
    case "hat_ribbon":
      hatSvg = `<text x="140" y="56" font-size="42" text-anchor="middle">🎀</text>`;
      break;
    case "hat_party":
      hatSvg = `<path d="M 100 6 L 126 62 L 74 62 Z" fill="#ab47bc"/>
        <circle cx="100" cy="8" r="7" fill="#ffd54f"/>
        <circle cx="92" cy="40" r="4" fill="#4fc3f7"/><circle cx="108" cy="50" r="4" fill="#81c784"/>`;
      break;
    case "hat_wizard":
      hatSvg = `<path d="M 100 -4 L 132 62 L 60 62 Z" fill="#5c6bc0"/>
        <ellipse cx="96" cy="62" rx="52" ry="9" fill="#3f51b5"/>
        <text x="100" y="46" font-size="18" text-anchor="middle">⭐</text>`;
      break;
    case "hat_crown":
      hatSvg = `<path d="M 68 62 L 64 30 L 82 46 L 100 22 L 118 46 L 136 30 L 132 62 Z" fill="#ffd700" stroke="#f9a825" stroke-width="2"/>
        <circle cx="100" cy="46" r="5" fill="#e53935"/>`;
      break;
  }

  // ---- もちもの ----
  let itemSvg = "";
  const ITEM_EMOJI = { ac_flower: "🌷", ac_balloon: "🎈", ac_wand: "🪄", ac_guitar: "🎸" };
  if (cfg.item && ITEM_EMOJI[cfg.item]) {
    itemSvg = `<text x="158" y="200" font-size="36" text-anchor="middle">${ITEM_EMOJI[cfg.item]}</text>`;
  }

  return `<svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg">
    ${defs}${body}${face}${hairSvg}${eyes}${mouth}${glassesSvg}${hatSvg}${itemSvg}
  </svg>`;
}
