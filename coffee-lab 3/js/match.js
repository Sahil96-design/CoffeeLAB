/* Coffee Lab — Find my match: 5-question quiz, transparent scoring, reasoned results. */
renderChrome("match");

const ico = {
  milk: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M10 18h24v4a12 13 0 0 1-24 0z" fill="#6B4A2E"/><path d="M34 21h4a5 5 0 0 1 0 10h-5" stroke="#6B4A2E" stroke-width="3"/><path d="M14 21q5 4 10 0t8 0" stroke="#DFA126" stroke-width="2.5"/></svg>`,
  black: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M11 18h22v3a11 12 0 0 1-22 0z" fill="#2B1D14"/><path d="M33 20h4a4.5 4.5 0 0 1 0 9h-4.5" stroke="#2B1D14" stroke-width="3"/><ellipse cx="22" cy="19.5" rx="9" ry="2.2" fill="#DFA126"/></svg>`,
  cold: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M16 8h16l-2 30a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3z" stroke="#1F3D2B" stroke-width="2.6"/><path d="M17.2 22h13.6" stroke="#1F3D2B" stroke-width="2.2"/><path d="M17.6 24h12.8l-1.4 15h-10z" fill="#4A3423" opacity=".8"/><path d="M30 5L20 19" stroke="#DFA126" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  espresso: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M14 20h16v3a8 9 0 0 1-16 0z" fill="#2B1D14"/><path d="M30 22h3a4 4 0 0 1 0 8h-3.6" stroke="#2B1D14" stroke-width="2.6"/><rect x="10" y="34" width="24" height="3" rx="1.5" fill="#1F3D2B"/><path d="M20 9q-3 4 0 8M26 9q-3 4 0 8" stroke="#DFA126" stroke-width="2.4" stroke-linecap="round"/></svg>`,
  press: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="14" y="14" width="20" height="24" rx="2" stroke="#1F3D2B" stroke-width="2.6"/><path d="M24 6v8M18 14h12" stroke="#1F3D2B" stroke-width="2.6"/><path d="M15.5 26h17" stroke="#DFA126" stroke-width="2.6"/><path d="M15.5 28h17v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z" fill="#4A3423" opacity=".7"/></svg>`,
  pour: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M12 12h24l-9 14v10h-6V26z" stroke="#1F3D2B" stroke-width="2.6" stroke-linejoin="round"/><path d="M12 40h24" stroke="#1F3D2B" stroke-width="2.6"/><path d="M24 4v5" stroke="#DFA126" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  filter: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="15" y="8" width="18" height="12" rx="2" stroke="#1F3D2B" stroke-width="2.6"/><rect x="15" y="24" width="18" height="14" rx="2" stroke="#1F3D2B" stroke-width="2.6"/><path d="M19 20v4M24 20v4M29 20v4" stroke="#DFA126" stroke-width="2.4"/></svg>`,
  fruit: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="20" cy="27" r="9" fill="#96453B"/><circle cx="31" cy="24" r="7" fill="#DFA126"/><path d="M20 18q1-6 7-8" stroke="#1F3D2B" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="29" cy="11" rx="5" ry="2.6" fill="#1F3D2B" transform="rotate(-20 29 11)"/></svg>`,
  choc: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="10" y="12" width="28" height="24" rx="3" fill="#4A3423"/><path d="M19.3 12v24M28.6 12v24M10 24h28" stroke="#2B1D14" stroke-width="2.4"/></svg>`,
  sweetdrop: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 6q12 14 12 22a12 12 0 0 1-24 0q0-8 12-22z" fill="#DFA126"/><path d="M19 28a5 6 0 0 0 5 6" stroke="#F4EFE2" stroke-width="2.6" stroke-linecap="round"/></svg>`,
  bolt: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M27 5L12 27h9l-3 16 17-24h-10z" fill="#2B1D14" stroke="#DFA126" stroke-width="2"/></svg>`,
  classic: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><ellipse cx="24" cy="24" rx="10" ry="14" fill="#4A3423" transform="rotate(22 24 24)"/><path d="M24 10q-4 14 0 28" stroke="#F2F1E9" stroke-width="2.6" fill="none" transform="rotate(22 24 24)"/></svg>`,
  lab: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M20 6h8M22 6v10l9 18a4 4 0 0 1-3.6 6H20.6a4 4 0 0 1-3.6-6l9-18V6" stroke="#1F3D2B" stroke-width="2.6" stroke-linejoin="round"/><path d="M18 30h12" stroke="#DFA126" stroke-width="2.6"/><circle cx="22" cy="35" r="1.8" fill="#DFA126"/><circle cx="27" cy="33" r="1.4" fill="#96453B"/></svg>`,
  wallet: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="8" y="14" width="32" height="22" rx="4" stroke="#1F3D2B" stroke-width="2.6"/><path d="M8 20h32" stroke="#1F3D2B" stroke-width="2.6"/><circle cx="33" cy="28" r="2.4" fill="#DFA126"/></svg>`,
  gem: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M14 10h20l8 10-18 20L6 20z" stroke="#1F3D2B" stroke-width="2.6" stroke-linejoin="round"/><path d="M6 20h36M24 40 16 20l8-10 8 10z" stroke="#DFA126" stroke-width="2"/></svg>`,
  scale: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 8v30M10 14h28" stroke="#1F3D2B" stroke-width="2.6"/><path d="M10 14l-5 10h10zM38 14l-5 10h10z" stroke="#DFA126" stroke-width="2.4" fill="none"/><path d="M16 40h16" stroke="#1F3D2B" stroke-width="2.6"/></svg>`,
};

const QUESTIONS = [
  {
    q: "How does your daily cup usually look?",
    help: "This decides how much roast intensity your coffee needs.",
    key: "style", two: true,
    opts: [
      { v: "milk", icon: ico.milk, b: "With milk", s: "Cappuccino, latte or filter kaapi with hot milk" },
      { v: "black", icon: ico.black, b: "Black", s: "No milk — the coffee carries the whole cup" },
      { v: "cold", icon: ico.cold, b: "Cold", s: "Cold brew or iced, especially in summer" },
      { v: "any", icon: ico.scale, b: "Depends on the day", s: "A bit of everything" },
    ],
  },
  {
    q: "What do you brew with?",
    help: "Different gear rewards different roasts and grinds.",
    key: "brew", two: true,
    opts: [
      { v: "espresso", icon: ico.espresso, b: "Espresso / moka pot", s: "Pressure, crema, intensity" },
      { v: "press", icon: ico.press, b: "French press", s: "Full immersion, full body" },
      { v: "pour", icon: ico.pour, b: "Pour over / AeroPress", s: "Paper-filtered clarity" },
      { v: "filter", icon: ico.filter, b: "South Indian filter / simple", s: "Steel filter, channi, or just hot water" },
    ],
  },
  {
    q: "Pick the flavours that pull you in",
    help: "Trust your instinct — dessert menu rules apply.",
    key: "flavour", two: true,
    opts: [
      { v: "fruity", icon: ico.fruit, b: "Fruity & bright", s: "Berries, citrus, tropical fruit, wine-like" },
      { v: "chocolatey", icon: ico.choc, b: "Chocolatey & nutty", s: "Cocoa, roasted nuts, praline" },
      { v: "sweet", icon: ico.sweetdrop, b: "Caramel & sweet", s: "Jaggery, honey, butterscotch, vanilla" },
      { v: "bold", icon: ico.bolt, b: "Bold & intense", s: "Dark, smoky, spice, punchy" },
    ],
  },
  {
    q: "How adventurous are you feeling?",
    help: "India's roasters range from timeless estate lots to barrel-aged experiments.",
    key: "adventure", two: false,
    opts: [
      { v: "classic", icon: ico.classic, b: "Keep it classic", s: "Washed estate coffees, dependable and clean" },
      { v: "curious", icon: ico.scale, b: "A little curious", s: "Mostly classic, open to naturals and honeys" },
      { v: "lab", icon: ico.lab, b: "Full lab mode", s: "Anaerobic, barrel-aged, kombucha-fermented — surprise me" },
    ],
  },
  {
    q: "What's your budget per 100 g?",
    help: "Most Indian specialty coffee lives between ₹200 and ₹350 per 100 g.",
    key: "budget", two: false,
    opts: [
      { v: "250", icon: ico.wallet, b: "Up to ₹250", s: "Everyday value" },
      { v: "400", icon: ico.scale, b: "Up to ₹400", s: "The specialty mainstream" },
      { v: "9999", icon: ico.gem, b: "Sky's the limit", s: "Reserve lots and rare experiments welcome" },
    ],
  },
];

let step = 0;
const answers = {};
const shell = document.getElementById("quiz-shell");

function renderStep(){
  const q = QUESTIONS[step];
  shell.innerHTML = `
    <p class="eyebrow">Find my match · Question ${step + 1} of ${QUESTIONS.length}</p>
    <div class="quiz-progress" aria-hidden="true">${QUESTIONS.map((_, i) =>
      `<i class="${i < step ? "done" : i === step ? "now" : ""}"></i>`).join("")}</div>
    <h1 class="quiz-q">${q.q}</h1>
    <p class="quiz-help">${q.help}</p>
    <div class="quiz-opts ${q.two ? "two" : ""}" role="radiogroup" aria-label="${esc(q.q)}">
      ${q.opts.map(o => `
        <button class="quiz-opt ${answers[q.key] === o.v ? "selected" : ""}" role="radio"
          aria-checked="${answers[q.key] === o.v}" onclick="pick('${q.key}','${o.v}')">
          ${o.icon}<span><b>${o.b}</b><span>${o.s}</span></span>
        </button>`).join("")}
    </div>
    <div class="quiz-nav">
      <button class="btn btn-ghost" ${step === 0 ? "disabled" : ""} onclick="back()">Back</button>
      <button class="btn btn-primary" id="next-btn" ${answers[q.key] ? "" : "disabled"} onclick="next()">
        ${step === QUESTIONS.length - 1 ? "Show my matches" : "Next"}</button>
    </div>`;
  shell.scrollIntoView({ block: "start" });
}

function pick(key, v){ answers[key] = v; renderStep(); }
function back(){ if (step > 0){ step--; renderStep(); } }
function next(){
  if (step < QUESTIONS.length - 1){ step++; renderStep(); }
  else showResults();
}
function restart(){
  step = 0; Object.keys(answers).forEach(k => delete answers[k]);
  document.getElementById("results-shell").hidden = true;
  shell.hidden = false; renderStep();
  window.scrollTo({ top: 0 });
}

/* ---------- scoring ---------- */
const FLAVOUR_MAP = {
  fruity: { fams: ["fruity", "floral"], words: [] },
  chocolatey: { fams: ["chocolatey", "nutty"], words: [] },
  sweet: { fams: ["sweet"], words: [] },
  bold: { fams: ["spicy"], words: ["dark chocolate", "burnt", "smoky", "cocoa", "bold", "molasses"] },
};

function scoreCoffee(c){
  let s = 0; const why = [];
  const style = answers.style, brew = answers.brew, fl = answers.flavour, adv = answers.adventure;
  const budget = +answers.budget;
  const p = c.process.toLowerCase();
  const ferm = (c.fermentation || "").toLowerCase();

  // 1) cup style
  if (style !== "any"){
    if (c.styles.includes(style)) { s += 4; why.push({ milk: "holds up beautifully in milk", black: "made to be drunk black", cold: "steeps into a great cold brew" }[style]); }
    else s -= 4;
  } else s += 1;

  // 2) brew gear → roast fit
  const lvl = c.roastLevel;
  if (brew === "espresso"){ if (lvl >= 3) s += 3; if (lvl >= 4) { s += 1; } if (lvl <= 2) s -= 3; }
  if (brew === "press"){ if (lvl >= 2 && lvl <= 4) s += 3; }
  if (brew === "pour"){ if (lvl <= 3) s += 3; if (lvl >= 4) s -= 2; }
  if (brew === "filter"){ if (lvl >= 3) s += 3; if (c.varietals.toLowerCase().includes("robusta")) s += 1; if (lvl <= 2) s -= 3; }
  if (c.brews.some(b => ({ espresso: "Espresso", press: "French press", pour: "Pour over", filter: "South Indian filter" }[brew] === b))) { s += 1; }

  // 3) flavour direction
  const map = FLAVOUR_MAP[fl];
  const flavText = c.flavours.join(" ").toLowerCase();
  let flavHit = c.families.some(f => map.fams.includes(f)) || map.words.some(w => flavText.includes(w));
  if (fl === "bold" && lvl >= 4) flavHit = true;
  if (flavHit){ s += 4; why.push(`leads with ${c.flavours.slice(0, 2).join(" and ").toLowerCase()}`); }

  // 4) adventure
  const experimental = ferm.length > 0 || p.includes("aged") || p.includes("monsoon") || /anaerobic|barrel|kombucha|inocul|coferment|osmotic/.test(ferm + " " + (c.notes || "").toLowerCase());
  if (adv === "lab"){ if (experimental){ s += 4; why.push("a genuinely experimental lot"); } }
  if (adv === "classic"){ if (!experimental && p.includes("washed")) { s += 3; why.push("a clean, classic washed profile"); } if (experimental) s -= 2; }
  if (adv === "curious"){ if (p.includes("natural") || p.includes("honey")) { s += 2; why.push(`a ${p.includes("honey") ? "honey" : "natural"}-processed step off the beaten path`); } if (experimental) s += 1; }

  // 5) budget
  if (c.price <= budget) s += 2; else s -= 8;
  if (budget >= 9999 && c.price >= 350) s += 1;

  // small quality/diversity nudges
  if (c.classification.includes("Microlot")) s += 0.5;
  if (c.sample) s += 0.5;

  return { s, why };
}

function showResults(){
  const scored = COFFEES.map(c => ({ c, ...scoreCoffee(c) })).sort((a, b) => b.s - a.s);

  // diversify: max 2 per brand in the visible set
  const picked = [], runners = [], perBrand = {};
  for (const r of scored){
    if (picked.length < 3 && (perBrand[r.c.brand] || 0) < 2){ picked.push(r); perBrand[r.c.brand] = (perBrand[r.c.brand] || 0) + 1; }
    else if (runners.length < 4 && r.s > 0){ runners.push(r); }
    if (picked.length === 3 && runners.length === 4) break;
  }

  const styleTxt = { milk: "milk-based", black: "black", cold: "cold", any: "any-style" }[answers.style];
  const flTxt = { fruity: "fruity and bright", chocolatey: "chocolatey and nutty", sweet: "caramel-sweet", bold: "bold and intense" }[answers.flavour];
  document.getElementById("match-summary").textContent =
    `Scored against all ${COFFEES.length} coffees for a ${styleTxt} cup, ${flTxt} flavours and your budget. Your top three:`;

  document.getElementById("match-grid").innerHTML = picked.map((r, i) => {
    const reason = r.why.length ? `Why: ${r.why.slice(0, 2).join("; ")}.` : "A strong all-round fit for your answers.";
    return coffeeCard(r.c, `<span class="match-rank">MATCH ${["№1", "№2", "№3"][i]}</span>`, "match-card",
      `<div class="match-reason">${esc(reason)}</div>`);
  }).join("");

  if (runners.length){
    document.getElementById("runners-wrap").hidden = false;
    document.getElementById("runners-grid").innerHTML = runners.map(r => coffeeCard(r.c)).join("");
  }

  shell.hidden = true;
  document.getElementById("results-shell").hidden = false;
  window.scrollTo({ top: 0 });
}

renderStep();
