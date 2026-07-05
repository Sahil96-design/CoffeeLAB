/* Coffee Lab — homepage v2 engine
   1. Canvas frame-sequence scrub hero (Apple-style, scroll-driven)
   2. Parallax layers  3. Scroll reveals  4. Header mode  5. Section renders */

renderChrome("home");
document.body.classList.add("home-v2");

const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ============================================================
   1 · HERO SCRUB
   ============================================================ */
const FRAME_COUNT = 72;
const framePath = i => `assets/hero/f_${String(i).padStart(2, "0")}.jpg`;

const cine = document.getElementById("cine");
const canvas = document.getElementById("cine-canvas");
const ctx = canvas.getContext("2d");
const stages = [...document.querySelectorAll(".cine .stage")];
const cue = document.querySelector(".scroll-cue");

const frames = new Array(FRAME_COUNT);
let loadedMax = -1;                    // highest contiguous loaded index
window.__heroFrame = 0; window.__heroProgress = 0;

function loadFrames(){
  let contiguous = 0;
  for (let i = 0; i < FRAME_COUNT; i++){
    const img = new Image();
    img.src = framePath(i);
    img.onload = () => {
      frames[i] = img;
      while (contiguous < FRAME_COUNT && frames[contiguous]) contiguous++;
      loadedMax = contiguous - 1;
      needsDraw = true;
    };
  }
}

function sizeCanvas(){
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  needsDraw = true;
}

function drawFrame(i){
  const img = frames[Math.min(i, Math.max(loadedMax, 0))];
  if (!img) return;
  const cw = canvas.width, ch = canvas.height;
  const s = Math.max(cw / img.width, ch / img.height);      // cover fit
  const w = img.width * s, h = img.height * s;
  ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
}

/* trapezoid fade helper: 0→1 between a..b, hold, 1→0 between c..d */
const fade = (p, a, b, c, d) =>
  p < a ? 0 : p < b ? (p - a) / (b - a) : p < c ? 1 : p < d ? 1 - (p - c) / (d - c) : 0;

function heroProgress(){
  const r = cine.getBoundingClientRect();
  const total = r.height - innerHeight;
  return Math.min(1, Math.max(0, -r.top / total));
}

function updateHero(){
  const p = heroProgress();
  window.__heroProgress = p;
  const f = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));
  window.__heroFrame = f;
  drawFrame(f);

  // text choreography
  const ops = [
    fade(p, -0.1, 0.00, 0.20, 0.30),   // stage 1: opening line (visible at rest)
    fade(p, 0.30, 0.38, 0.52, 0.62),   // stage 2: the promise
    fade(p, 0.64, 0.74, 2, 3),         // stage 3: CTAs — stays
  ];
  stages.forEach((el, i) => {
    const o = REDUCED ? (i === 2 ? 1 : 0) : ops[i];
    el.style.opacity = o;
    el.style.transform = `translateY(${(1 - o) * 26}px)`;
    el.classList.toggle("interactive", o > 0.5);
  });
  if (cue) cue.style.opacity = p > 0.04 ? 0 : 1;
}

/* ============================================================
   2 · PARALLAX  ([data-speed] elements drift against scroll)
   ============================================================ */
const paras = [...document.querySelectorAll("[data-speed]")];
function updateParallax(){
  if (REDUCED) return;
  const mid = innerHeight / 2;
  paras.forEach(el => {
    const r = el.getBoundingClientRect();
    const delta = (r.top + r.height / 2 - mid) * parseFloat(el.dataset.speed);
    el.style.transform = `translate3d(0, ${delta.toFixed(1)}px, 0)`;
  });
}

/* ============================================================
   3 · REVEALS
   ============================================================ */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.14 });

/* ============================================================
   4 · HEADER MODE (transparent over the dark hero)
   ============================================================ */
const header = document.getElementById("site-header");
function updateHeader(){
  const overHero = cine.getBoundingClientRect().bottom > innerHeight * 0.6;
  header.classList.toggle("over-hero", overHero);
}

/* ---------- single rAF loop, draws only when needed ---------- */
let needsDraw = true;
addEventListener("scroll", () => { needsDraw = true; }, { passive: true });
addEventListener("resize", sizeCanvas);
(function loop(){
  if (needsDraw){
    needsDraw = false;
    updateHero(); updateParallax(); updateHeader();
  }
  requestAnimationFrame(loop);
})();

/* ============================================================
   5 · SECTIONS
   ============================================================ */
// Popular picks: approachable openers — medium roasts, one per roaster
const picks = [];
{
  const seen = new Set();
  const pool = [...COFFEES].sort((a, b) =>
    (b.sample - a.sample) || (Math.abs(a.roastLevel - 3) - Math.abs(b.roastLevel - 3)) || (a.price - b.price));
  for (const c of pool){
    if (!seen.has(c.brand)){ picks.push(c); seen.add(c.brand); }
    if (picks.length === 6) break;
  }
}
document.getElementById("picks-grid").innerHTML = picks.map((c, i) =>
  coffeeCard(c).replace('class="coffee-card ', `style="transition-delay:${i * 60}ms" class="coffee-card reveal `)).join("");

// Cup tiles
const cnt = styleCounts();
const cupSVG = {
  milk: `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M18 28 h38 v6 a19 22 0 0 1 -38 0 Z" fill="#F4EFE2"/><path d="M56 32 h7 a7 8 0 0 1 0 16 h-8" stroke="#F4EFE2" stroke-width="4"/><path d="M24 33 q8 6 16 0 t14 0" stroke="#DFA126" stroke-width="3"/></svg>`,
  black: `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M20 30 h34 v5 a17 20 0 0 1 -34 0 Z" fill="#14100C" stroke="#F4EFE2" stroke-width="3"/><path d="M54 34 h6 a6 7 0 0 1 0 14 h-7" stroke="#F4EFE2" stroke-width="3.6"/><ellipse cx="37" cy="32" rx="14" ry="3.4" fill="#DFA126" opacity=".9"/></svg>`,
  cold: `<svg viewBox="0 0 80 80" fill="none" aria-hidden="true"><path d="M26 16 h26 l-3 46 a4 4 0 0 1 -4 4 h-12 a4 4 0 0 1 -4 -4 Z" fill="none" stroke="#F4EFE2" stroke-width="3.4"/><path d="M28 36 h22 l-2 26 a3 3 0 0 1 -3 3 h-12 a3 3 0 0 1 -3 -3 Z" fill="#4A3423" opacity=".85"/><path d="M48 12 L34 30" stroke="#DFA126" stroke-width="3.4" stroke-linecap="round"/></svg>`,
};
document.getElementById("cups").innerHTML = `
  <a class="cup-tile style-milk reveal" href="directory.html?style=milk">${cupSVG.milk}
    <span class="mono-count">${cnt.milk} coffees</span><h3>Milk</h3><p>Body that carries through a latte or kaapi.</p></a>
  <a class="cup-tile style-black reveal" style="transition-delay:80ms" href="directory.html?style=black">${cupSVG.black}
    <span class="mono-count">${cnt.black} coffees</span><h3>Black</h3><p>Nothing between you and the estate.</p></a>
  <a class="cup-tile style-cold reveal" style="transition-delay:160ms" href="directory.html?style=cold">${cupSVG.cold}
    <span class="mono-count">${cnt.cold} coffees</span><h3>Cold</h3><p>Slow-steeped. Summer-proof.</p></a>`;

// Roasters
const byBrand = {};
COFFEES.forEach(c => {
  (byBrand[c.brand] ??= { n: 0, places: new Set() });
  byBrand[c.brand].n++;
  c.states.forEach(s => byBrand[c.brand].places.add(s));
});
const monoGrads = ["#1F3D2B", "#4A3423", "#96453B", "#2C5238", "#B67F14", "#3A3128", "#6B4A2E", "#14100C", "#7A5A74"];
document.getElementById("roasters").innerHTML = Object.entries(byBrand).map(([name, v], i) => `
  <a class="roaster-tile reveal" style="transition-delay:${(i % 3) * 70}ms" href="directory.html?q=${encodeURIComponent(name)}">
    <span class="monogram" style="background:${monoGrads[i % monoGrads.length]}">${esc(initials(name))}</span>
    <span><b>${esc(name)}</b><span>${v.n} coffees · ${esc([...v.places].join(" · "))}</span></span>
  </a>`).join("");

// Surprise me
document.getElementById("surprise").addEventListener("click", e => {
  e.preventDefault();
  const c = COFFEES[Math.floor(Math.random() * COFFEES.length)];
  location.href = `coffee.html?id=${encodeURIComponent(c.id)}`;
});

// Newsletter (front-end only)
document.getElementById("news-form").addEventListener("submit", e => {
  e.preventDefault();
  const v = document.getElementById("news-email").value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { document.getElementById("news-email").focus(); return; }
  e.target.style.display = "none";
  document.getElementById("news-ok").hidden = false;
});

/* ---------- boot ---------- */
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
sizeCanvas();
loadFrames();
updateHero(); updateHeader();
