/* Coffee Lab — coffee detail page. */
renderChrome("directory");

const id = new URLSearchParams(location.search).get("id");
const c = COFFEES.find(x => x.id === id);
const el = document.getElementById("detail");

if (!c){
  el.innerHTML = `<div class="empty-state" style="grid-column:1/-1">
    <h3>We couldn't find that coffee</h3>
    <p>It may have been renamed or removed from the directory.</p>
    <a class="btn btn-primary" href="directory.html">Browse the directory</a></div>`;
} else {
  document.title = `${c.name} by ${c.brand} — Coffee Lab`;
  document.getElementById("crumb-name").textContent = c.name;

  const famDot = { fruity: "#96453B", floral: "#7A5A74", chocolatey: "#4A3423", nutty: "#8A6A3C", sweet: "#DFA126", spicy: "#2C5238" };
  const flavourPills = c.flavours.map(f =>
    `<span class="flavour-pill"><i style="background:${famDot[c.families[0]] || "#DFA126"}"></i>${esc(f)}</span>`).join("");

  const specs = [
    ["Roaster", c.brand],
    ["Estate", c.estate || "—"],
    ["District", c.district || "—"],
    ["Elevation", c.elevation ? c.elevation + " MASL" : "—"],
    ["Sourcing", c.classification || "—"],
    ["Varietal", c.varietals || "—"],
    ["Process", c.process || "—"],
    ["Fermentation", c.fermentation || "—"],
  ].map(([k, v]) => `<div class="spec"><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join("");

  const styleWords = { milk: "with milk", black: "black", cold: "cold" };
  const suits = c.styles.map(s => styleWords[s]).join(", ").replace(/, ([^,]*)$/, " and $1");

  el.innerHTML = `
    <div class="detail-art">${bagArt(c, true)}</div>
    <div>
      <span class="card-brand">${esc(c.brand)}</span>
      <h1>${esc(c.name)}</h1>
      <div class="detail-roastline">${roastMeter(c.roastLevel)}</div>
      <div class="detail-flavours">${flavourPills}</div>
      <p class="detail-note">${esc(c.notes || `A ${c.roast.toLowerCase()}-roast ${c.classification.toLowerCase()} from ${c.district || "India"}.`)}
      ${c.styles.length ? ` Drinks best ${suits}.` : ""}</p>

      <div class="detail-cta">
        <span class="detail-price">₹${c.price}<small>PER 100 G</small></span>
        <a class="btn btn-primary" target="_blank" rel="noopener"
           href="https://www.google.com/search?q=${encodeURIComponent(c.brand + " " + c.name + " coffee buy")}">
           Buy from website
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>
        <a class="btn btn-ghost" href="directory.html?q=${encodeURIComponent(c.brand)}">More from ${esc(c.brand)}</a>
        ${c.sample ? `<span class="tag gold" style="font-size:.74rem">Sample pack available</span>` : ""}
      </div>

      <div class="spec-ledger">
        <h2>Estate ledger</h2>
        <dl>${specs}</dl>
      </div>

      <div style="margin-top:22px">
        <b style="font-family:var(--font-mono);font-size:.7rem;letter-spacing:.13em;text-transform:uppercase;color:var(--roast-2)">Suggested brews</b>
        <div class="brew-row">${c.brews.map(b => `<span class="tag green">${esc(b)}</span>`).join("")}</div>
      </div>
    </div>`;

  /* similar: same lead flavour family or same roast level, different coffee; prefer other brands */
  const sims = COFFEES.filter(x => x.id !== c.id)
    .map(x => {
      let s = 0;
      x.families.forEach(f => { if (c.families.includes(f)) s += 2; });
      if (x.roastLevel === c.roastLevel) s += 2;
      if (Math.abs(x.roastLevel - c.roastLevel) === 1) s += 1;
      x.flavours.forEach(f => { if (c.flavours.some(g => g.toLowerCase() === f.toLowerCase())) s += 3; });
      if (x.brand !== c.brand) s += 1;
      return [s, x];
    })
    .sort((a, b) => b[0] - a[0])
    .slice(0, 4).map(x => x[1]);

  if (sims.length){
    document.getElementById("similar-wrap").hidden = false;
    document.getElementById("similar").innerHTML = sims.map(x => coffeeCard(x)).join("");
  }
}
