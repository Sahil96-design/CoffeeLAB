/* Coffee Lab — shared UI: chrome, card rendering, generated bag art, roast meter. */

const ROAST_NAMES = ["", "Light", "Light Medium", "Medium", "Medium Dark", "Dark"];

/* Flavour-family palettes drive the generated bag art (deterministic, no image assets). */
const FAMILY_COLORS = {
  fruity:     { bg: "#8A4A3C", fg: "#F3C9A6", pop: "#DFA126" },
  floral:     { bg: "#7A5A74", fg: "#EBD8E6", pop: "#DFA126" },
  chocolatey: { bg: "#4A3423", fg: "#E4CBA6", pop: "#DFA126" },
  nutty:      { bg: "#8A6A3C", fg: "#F1E1BE", pop: "#2C5238" },
  sweet:      { bg: "#B0782A", fg: "#F7E7C2", pop: "#2B1D14" },
  spicy:      { bg: "#2C5238", fg: "#D8E4CE", pop: "#DFA126" },
};

function esc(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }
function hashCode(s){ let h = 0; for (let i = 0; i < s.length; i++){ h = (h * 31 + s.charCodeAt(i)) | 0; } return Math.abs(h); }
function initials(brand){
  return brand.split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

/* Signature #1 — roast meter: five beans, filled to roast level. */
function roastMeter(level, withLabel = true){
  const bean = on => `<svg viewBox="0 0 20 20" aria-hidden="true"><ellipse class="bean ${on ? "on" : ""}" cx="10" cy="10" rx="6.5" ry="8.6" transform="rotate(24 10 10)"/><path d="M10 3.4 Q7.6 10 10 16.6" fill="none" stroke="${on ? "var(--mist)" : "var(--roast-2)"}" stroke-width="1.3" transform="rotate(24 10 10)"/></svg>`;
  let s = `<span class="roast-meter" role="img" aria-label="Roast: ${ROAST_NAMES[level]}">`;
  for (let i = 1; i <= 5; i++) s += bean(i <= level);
  s += "</span>";
  if (withLabel) s += `<span class="roast-label">${ROAST_NAMES[level]}</span>`;
  return s;
}

/* Signature #2 — deterministic SVG bag art per coffee. Colours come from its lead flavour family. */
function bagArt(c, big = false){
  const pal = FAMILY_COLORS[c.families[0]] || FAMILY_COLORS.sweet;
  const h = hashCode(c.id);
  const pattern = h % 3; // 0 dots · 1 ridges · 2 leaves
  const W = 500, H = big ? 420 : 340;
  const cx = W / 2;
  let texture = "";
  if (pattern === 0){
    for (let r = 0; r < 5; r++) for (let q = 0; q < 9; q++)
      texture += `<circle cx="${58 + q * 48 + (r % 2) * 24}" cy="${40 + r * 46}" r="4.5" fill="${pal.fg}" opacity=".22"/>`;
  } else if (pattern === 1){
    for (let r = 0; r < 8; r++)
      texture += `<path d="M-20 ${20 + r * 34} q ${W / 2} ${((r % 2) ? -1 : 1) * 26} ${W + 40} 0" stroke="${pal.fg}" stroke-width="2" fill="none" opacity=".2"/>`;
  } else {
    for (let r = 0; r < 4; r++) for (let q = 0; q < 6; q++)
      texture += `<ellipse cx="${64 + q * 76 + (r % 2) * 38}" cy="${44 + r * 58}" rx="13" ry="6" fill="${pal.fg}" opacity=".18" transform="rotate(${(h + r * q * 7) % 360} ${64 + q * 76 + (r % 2) * 38} ${44 + r * 58})"/>`;
  }
  const bagTop = H * 0.22, bagBot = H * 0.97, bagW = 212, bx = cx - bagW / 2;
  const labelY = bagTop + 68;
  const notes = c.flavours.slice(0, 2).join(" · ");
  return `
  <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(c.brand)} ${esc(c.name)} coffee bag" preserveAspectRatio="xMidYMid slice">
    <rect width="${W}" height="${H}" fill="${pal.bg}"/>
    ${texture}
    <ellipse cx="${cx}" cy="${bagBot + 8}" rx="128" ry="14" fill="rgba(0,0,0,.25)"/>
    <path d="M${bx} ${bagTop + 26} L${bx + bagW} ${bagTop + 26} L${bx + bagW - 8} ${bagBot} Q${cx} ${bagBot + 10} ${bx + 8} ${bagBot} Z" fill="#F4EFE2"/>
    <path d="M${bx} ${bagTop + 26} L${bx + bagW} ${bagTop + 26} L${bx + bagW - 3} ${bagTop + 6} Q${cx} ${bagTop - 8} ${bx + 3} ${bagTop + 6} Z" fill="#E6DEC9"/>
    <rect x="${bx - 4}" y="${bagTop + 22}" width="${bagW + 8}" height="10" rx="5" fill="${pal.pop}"/>
    <rect x="${bx + 22}" y="${labelY}" width="${bagW - 44}" height="${H * 0.42}" rx="7" fill="${pal.bg}"/>
    <rect x="${bx + 22}" y="${labelY}" width="${bagW - 44}" height="${H * 0.42}" rx="7" fill="none" stroke="${pal.fg}" stroke-width="1.5" opacity=".6"/>
    <text x="${cx}" y="${labelY + 46}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="42" font-weight="700" fill="${pal.fg}">${esc(initials(c.brand))}</text>
    <text x="${cx}" y="${labelY + 74}" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="11.5" letter-spacing="2.5" fill="${pal.fg}">${esc(c.roast.toUpperCase())}</text>
    <line x1="${cx - 55}" y1="${labelY + 88}" x2="${cx + 55}" y2="${labelY + 88}" stroke="${pal.pop}" stroke-width="2"/>
    <text x="${cx}" y="${labelY + 110}" text-anchor="middle" font-family="'IBM Plex Mono', monospace" font-size="10.5" letter-spacing="1" fill="${pal.fg}" opacity=".85">${esc(notes.slice(0, 30).toUpperCase())}</text>
    ${[0,1,2].map(i => `<ellipse cx="${cx - 26 + i * 26}" cy="${labelY + H * 0.42 - 24}" rx="7" ry="9.5" fill="${pal.fg}" transform="rotate(22 ${cx - 26 + i * 26} ${labelY + H * 0.42 - 24})"/><path d="M${cx - 26 + i * 26} ${labelY + H * 0.42 - 31.5} q -2.6 7.5 0 15" stroke="${pal.bg}" stroke-width="1.4" fill="none" transform="rotate(22 ${cx - 26 + i * 26} ${labelY + H * 0.42 - 24})"/>`).join("")}
  </svg>`;
}

function coffeeCard(c, extraHTML = "", cls = "", footerHTML = ""){
  return `
  <a class="coffee-card ${cls}" href="coffee.html?id=${encodeURIComponent(c.id)}">
    ${extraHTML}
    <div class="art">${bagArt(c)}</div>
    <div class="card-body">
      <span class="card-brand">${esc(c.brand)}</span>
      <span class="card-name">${esc(c.name)}</span>
      <span class="card-flavours">${c.flavours.map(esc).join(" · ")}</span>
      <div class="tag-row">
        ${c.classification ? `<span class="tag green">${esc(c.classification)}</span>` : ""}
        ${c.process ? `<span class="tag">${esc(c.process)}</span>` : ""}
        ${c.sample ? `<span class="tag gold">Sample pack</span>` : ""}
      </div>
      <div class="card-foot">
        <span>${roastMeter(c.roastLevel, false)}<span class="roast-label">${esc(c.roast)}</span></span>
        <span class="card-price">₹${c.price}<small>/100g</small></span>
      </div>
      ${footerHTML}
    </div>
  </a>`;
}

/* ---------- site chrome ---------- */
function renderChrome(active){
  const logoSVG = `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="19" fill="var(--canopy)"/>
      <ellipse cx="20" cy="20" rx="8.5" ry="12" fill="var(--marigold)" transform="rotate(24 20 20)"/>
      <path d="M20 8.5 Q16 20 20 31.5" stroke="var(--canopy)" stroke-width="2.6" fill="none" transform="rotate(24 20 20)"/>
    </svg>`;
  const nav = [
    ["directory.html", "Coffee directory", "directory"],
    ["learn.html", "Know your coffee", "learn"],
    ["blogs.html", "Stories", "blogs"],
  ];
  document.getElementById("site-header").innerHTML = `
    <div class="wrap">
      <a class="logo" href="index.html">${logoSVG}<b>Coffee<em>Lab</em></b></a>
      <button class="nav-toggle" aria-label="Open menu" aria-expanded="false" onclick="const n=document.querySelector('.main-nav');n.classList.toggle('open');this.setAttribute('aria-expanded',n.classList.contains('open'))">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
      <nav class="main-nav" aria-label="Main">
        ${nav.map(([href, label, key]) => `<a href="${href}" ${active === key ? 'aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
      <a class="btn btn-gold header-cta" href="match.html" ${active === "match" ? 'aria-current="page"' : ""}>Find my match</a>
    </div>`;

  document.getElementById("site-footer").innerHTML = `
    <div class="wrap">
      <div>
        <a class="logo" href="index.html">${logoSVG}<b>Coffee<em>Lab</em></b></a>
        <p style="max-width:36ch;font-size:.92rem;margin-top:14px;">One place to know everything about coffee in India — ${COFFEES.length} beans from ${new Set(COFFEES.map(c => c.brand)).size} roasters, and how to find yours.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <a href="directory.html">Coffee directory</a>
        <a href="match.html">Find my match</a>
        <a href="directory.html?sample=1">Sample packs</a>
      </div>
      <div>
        <h4>Learn</h4>
        <a href="learn.html">Coffee 101</a>
        <a href="blogs.html">Stories</a>
        <a href="article.html?id=indian-regions">Indian coffee regions</a>
      </div>
    </div>
    <div class="footer-note">
      <div class="wrap">
        <span>COFFEE LAB · THE INDIAN COFFEE DIRECTORY</span>
        <span>DATA: THE GREAT INDIAN SPECIALTY COFFEE DIRECTORY</span>
      </div>
    </div>`;
}

function styleCounts(){
  const n = { milk: 0, black: 0, cold: 0 };
  COFFEES.forEach(c => c.styles.forEach(s => n[s]++));
  return n;
}
