/* Coffee Lab — directory: faceted filters, search, sort, URL params. */
renderChrome("directory");

const MAX_PRICE = Math.max(...COFFEES.map(c => c.price));
const params = new URLSearchParams(location.search);

const state = {
  q: params.get("q") || "",
  style: params.get("style") ? [params.get("style")] : [],   // milk | black | cold
  roast: [],                 // roast levels 1..5
  process: [],
  family: [],
  brand: [],
  state: [],
  cls: [],
  sampleOnly: params.get("sample") === "1",
  maxPrice: MAX_PRICE,
  sort: "relevance",
};

const STYLE_LABELS = { milk: "Good with milk", black: "Good black", cold: "Good cold" };
const FAMILY_LABELS = { fruity: "Fruity", chocolatey: "Chocolatey", nutty: "Nutty", sweet: "Caramel & sweet", floral: "Floral", spicy: "Spice & bold" };

document.getElementById("dir-q").value = state.q;
if (state.style.length){
  document.getElementById("dir-title").textContent = {
    milk: "Built for milk", black: "Best drunk black", cold: "Made for cold brew",
  }[state.style[0]] || "Every bean, one shelf";
}

/* ---------- facet definitions ---------- */
function processBuckets(c){
  const p = c.process.toLowerCase();
  const out = [];
  if (p.includes("washed")) out.push("Washed");
  if (p.includes("natural")) out.push("Natural");
  if (p.includes("honey")) out.push("Honey");
  if (p.includes("monsoon")) out.push("Monsooned");
  if (p.includes("aged")) out.push("Barrel aged");
  if (!out.length) out.push("Unspecified");
  return out;
}

const FACETS = [
  { key: "style", title: "Your cup", values: ["milk", "black", "cold"], label: v => STYLE_LABELS[v],
    match: (c, v) => c.styles.includes(v) },
  { key: "roast", title: "Roast level", values: [1, 2, 3, 4, 5], label: v => ROAST_NAMES[v], meter: true,
    match: (c, v) => c.roastLevel === v },
  { key: "family", title: "Flavour", values: Object.keys(FAMILY_LABELS), label: v => FAMILY_LABELS[v],
    match: (c, v) => c.families.includes(v) },
  { key: "process", title: "Process", values: ["Washed", "Natural", "Honey", "Monsooned", "Barrel aged"], label: v => v,
    match: (c, v) => processBuckets(c).includes(v) },
  { key: "state", title: "Region", values: [...new Set(COFFEES.flatMap(c => c.states))].sort(), label: v => v,
    match: (c, v) => c.states.includes(v) },
  { key: "cls", title: "Sourcing", values: ["Single Estate", "Microlot", "Blend"], label: v => v,
    match: (c, v) => c.classification.includes(v) },
  { key: "brand", title: "Roaster", values: [...new Set(COFFEES.map(c => c.brand))].sort(), label: v => v,
    match: (c, v) => c.brand === v },
];

/* ---------- filtering ---------- */
function passes(c, skipKey){
  if (state.q){
    const hay = [c.brand, c.name, c.estate, c.district, c.varietals, c.process, c.roast, c.flavours.join(" "), c.notes].join(" ").toLowerCase();
    if (!state.q.toLowerCase().split(/\s+/).every(w => hay.includes(w))) return false;
  }
  if (state.sampleOnly && !c.sample) return false;
  if (c.price > state.maxPrice) return false;
  for (const f of FACETS){
    if (f.key === skipKey) continue;
    const sel = state[f.key];
    if (sel.length && !sel.some(v => f.match(c, v))) return false;
  }
  return true;
}

function results(){
  let list = COFFEES.filter(c => passes(c));
  const s = state.sort;
  if (s === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (s === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (s === "roast-asc") list.sort((a, b) => a.roastLevel - b.roastLevel);
  else if (s === "roast-desc") list.sort((a, b) => b.roastLevel - a.roastLevel);
  else if (s === "name") list.sort((a, b) => (a.brand + a.name).localeCompare(b.brand + b.name));
  return list;
}

/* ---------- render ---------- */
function renderFilters(){
  const html = FACETS.map(f => {
    const rows = f.values.map(v => {
      const n = COFFEES.filter(c => passes(c, f.key) && f.match(c, v)).length;
      const checked = state[f.key].includes(v);
      if (!n && !checked) return "";
      return `<label>
        <input type="checkbox" ${checked ? "checked" : ""} onchange="toggleFacet('${f.key}', ${JSON.stringify(String(v)).replace(/"/g, "&quot;")}, ${typeof v === "number"})">
        ${f.meter ? roastMeter(v, false) : ""} ${esc(f.label(v))}
        <span class="count">${n}</span>
      </label>`;
    }).join("");
    return `<div class="filter-group"><b>${f.title}</b>${rows}</div>`;
  }).join("");

  const price = `<div class="filter-group"><b>Max price / 100 g</b>
    <div class="price-row">₹100 <input type="range" min="100" max="${MAX_PRICE}" step="10" value="${state.maxPrice}"
      aria-label="Maximum price per 100 grams"
      oninput="state.maxPrice=+this.value; apply();"> <span>₹${state.maxPrice}</span></div></div>`;

  const sample = `<div class="filter-group"><b>Availability</b>
    <label><input type="checkbox" ${state.sampleOnly ? "checked" : ""} onchange="state.sampleOnly=this.checked; apply();"> Sample pack available
    <span class="count">${COFFEES.filter(c => c.sample).length}</span></label></div>`;

  document.getElementById("filter-groups").innerHTML = html + price + sample;
}

function toggleFacet(key, value, isNum){
  const v = isNum ? +value : value;
  const arr = state[key];
  const i = arr.indexOf(v);
  if (i >= 0) arr.splice(i, 1); else arr.push(v);
  apply();
}

function clearFilters(){
  FACETS.forEach(f => state[f.key] = []);
  state.q = ""; state.sampleOnly = false; state.maxPrice = MAX_PRICE;
  document.getElementById("dir-q").value = "";
  apply();
}

function renderChips(){
  const chips = [];
  if (state.q) chips.push({ label: `“${state.q}”`, undo: () => { state.q = ""; document.getElementById("dir-q").value = ""; } });
  FACETS.forEach(f => state[f.key].forEach(v =>
    chips.push({ label: f.label(v), undo: () => state[f.key].splice(state[f.key].indexOf(v), 1) })));
  if (state.sampleOnly) chips.push({ label: "Sample packs", undo: () => state.sampleOnly = false });
  if (state.maxPrice < MAX_PRICE) chips.push({ label: `Under ₹${state.maxPrice}`, undo: () => state.maxPrice = MAX_PRICE });
  window.__chips = chips;
  document.getElementById("chip-row").innerHTML = chips.map((c, i) =>
    `<button class="chip" onclick="__chips[${i}].undo(); apply();">${esc(c.label)} <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg></button>`).join("");
}

function apply(){
  const list = results();
  renderFilters();
  renderChips();
  document.getElementById("dir-count").innerHTML = `<b>${list.length}</b> of ${COFFEES.length} coffees`;
  const grid = document.getElementById("dir-grid");
  grid.innerHTML = list.length
    ? list.map(c => coffeeCard(c)).join("")
    : `<div class="empty-state">
        <h3>No coffee matches those filters</h3>
        <p>Loosen a filter or two — or let the quiz do the narrowing for you.</p>
        <button class="btn btn-ghost" onclick="clearFilters()">Clear all filters</button>
        <a class="btn btn-primary" href="match.html" style="margin-left:8px">Find my match</a>
      </div>`;
}

function toggleFilters(open){
  const el = document.getElementById("filters");
  el.classList.toggle("open", open);
  el.querySelector(".filters-close").style.display = open ? "inline-flex" : "none";
  document.body.style.overflow = open ? "hidden" : "";
}

apply();
