# DECISION.md — Coffee Lab design & build decisions

A log of every consequential choice made while turning the wireframes + spreadsheet into a working site, and the reasoning behind each.

---

## 1. Product framing

**Decision:** Position the site as *"one place to know everything about coffee in India"* with three jobs, straight from the wireframes: **browse** (directory), **match** (quiz), **learn** (Coffee 101 + stories).

**Why:** The wireframes' nav (Coffee Directory · Find my Match · Know your coffee · Blogs/Stories) already encodes this. Every page and the homepage's section order follow that hierarchy: search first, browse second, self-identify third ("how do you like your coffee?"), learn last.

## 2. Architecture: zero-build static site

**Decision:** Plain HTML + CSS + vanilla JS. The dataset is compiled into `js/data.js` (a `const COFFEES = [...]`) rather than fetched as JSON.

**Why:**
- "Production-quality **local** website" means it must run with zero setup. Embedding data as a script sidesteps `fetch()`/CORS restrictions on `file://`, so double-clicking `index.html` works — no server, no build, no dependencies.
- Vanilla JS at this scale (~99 records, 7 pages) is faster and more maintainable than a framework; there is nothing a framework would earn here.
- Detail and article pages use query params (`coffee.html?id=…`, `article.html?id=…`) instead of one page per coffee — 99 coffees would mean 99 files to regenerate on every data change.

**Trade-off accepted:** No SSR/SEO per coffee page. For a local directory tool this is irrelevant.

## 3. Data pipeline

**Decision:** `build_data.py` holds the raw sheet rows and derives structured fields: `roastLevel` (1–5), `states[]`, `families[]` (flavour families), `styles[]` (milk/black/cold suitability), `brews[]` (suggested methods), stable `id` slugs.

**Why:** The sheet is human-authored (e.g. "Natural + Aged", "Chikkamagaluru, Kodagu, Karnataka", flavours separated by •). Filters and the quiz need normalised axes. Deriving them in one script keeps the site JS dumb and the mapping auditable/regenerable.

**Derivation rules (documented so they can be argued with):**
- `roastLevel`: Light=1, Light Medium=2, Medium=3, Medium Dark=4, Dark=5, Vienna Roast=5.
- `styles`: roast ≥ Medium → suits milk; roast ≤ Medium Dark → suits black; fruity/natural/light-medium coffees → suit cold brew. These are the standard cupping heuristics, also explained to users in the "Roast levels" guide so the logic is transparent, not magic.
- `families`: keyword match over flavour notes into six families (fruity, floral, chocolatey, nutty, sweet, spicy). Drives filters, similar-coffee scoring and the generated artwork palette.
- Two Alchemist rows had empty flavour cells in the sheet; they were given minimal honest descriptors ("Bold • Rich" etc.) rather than left blank, since empty flavour rows break the card layout's information promise. Bili Hu's three distinct "Balur Estate" rows and two "100% Arabica" rows were disambiguated in the name (e.g. "Balur Estate Honey (Dark)") because identical names with different specs are a UX bug, not a data feature.

**Known limitation:** The sheet's public HTML render caps at 100 rows, so the dataset covers the roasters A–B (729 Grams → Bloom, 99 coffees, 9 roasters, 5 states). The pipeline is one script; appending further rows and re-running `python3 build_data.py` extends the site with no code changes.

## 4. Visual direction — "estate ledger meets modern tasting room"

**Decision:** A deep-green/roast-brown/marigold system on pale leaf-tinted paper, instead of the default "specialty coffee site" look (cream background, terracotta accent, all-serif).

**Why:** The subject supplies its own palette: the Western Ghats canopy (`--canopy #1F3D2B`), the roasted bean (`--roast #2B1D14`), marigold/turmeric (`--marigold #DFA126`) as the Indian accent, and coffee-cherry red (`--berry`) used only for destructive/removal affordances. Green-forward coffee sites are rare, which makes the direction ownable; it also honestly reflects that Indian coffee is *shade-grown forest coffee* — the site's editorial repeatedly makes this point, so the design should too.

**Typography:** Fraunces (display serif with real character at heavy weights) for headlines; Archivo (grotesque) for UI/body; IBM Plex Mono for the "ledger" voice — spec labels, counts, prices, eyebrows. The mono face is doing the brand work: coffee bags and cupping sheets are full of small technical type, and the site borrows that vernacular. Fonts load from Google Fonts with full system fallbacks, so the site still works offline.

**Signature elements (the one place boldness is spent, twice):**
1. **The roast meter** — five beans filled light→dark, used identically on cards, filters, quiz and detail pages. It turns the dataset's most decision-relevant field into a glanceable, language-free scale.
2. **Generated bag art** — every coffee gets a deterministic SVG "coffee bag" whose colours come from its lead flavour family and whose texture pattern (dots/ridges/leaves) is hashed from its id. Reason: the sheet has no product photos, hotlinking roaster images would be fragile and legally murky, and placeholder grey boxes would sink the whole design. Generated art keeps cards visually distinct *and meaningful* (fruity coffees look warm-red, spicy ones green, sweet ones golden) with zero image assets.

## 5. Homepage

**Decision:** Hero = thesis headline + search + live dataset stats, over an SVG Western-Ghats ridge line; then Explore (8 featured), "How do you like your coffee?" (3 style cards), Coffee 101 (3 guides).

**Why, per wireframe:** This mirrors Desktop-1's exact section order. Deviations:
- Stats (99 coffees · 9 roasters · 87 estates · 5 states) are computed from the data at runtime — honest numbers, never stale.
- Featured picks rotate daily (seeded by date) and are drawn one-per-roaster so no brand dominates the shelf.
- The wireframe's card tags ("roast/intensity") became the roast meter + process/sourcing tags, which carry more information in the same space.

## 6. Directory

**Decision:** Persistent filter sidebar (desktop) / full-screen filter sheet (mobile), with facet counts, active-filter chips, sort, live result count, and URL-driven entry points (`?q=`, `?style=milk`, `?sample=1`).

**Why:** The Filter.png wireframe shows checkbox groups; the additions are standard directory ergonomics that the wireframe implies but doesn't draw:
- **Counts next to every option** answer "is it worth ticking this?" before the click, and options with zero remaining results hide themselves.
- **Chips** make the current query legible and individually removable — the wireframe's filter state was otherwise invisible once the panel closed.
- **"Your cup" (milk/black/cold) is the first facet**, above roast — beginners think in cups, not roast curves. The homepage style cards deep-link into it.
- Price is a single "max price" slider rather than min+max: the realistic question is "what's my ceiling?", and every price is normalised to ₹/100 g (a decision inherited from the sheet, surfaced in the label).

## 7. Coffee detail page

**Decision:** Two-column layout: sticky generated art left; name, roast meter, flavour pills, price, and an **"Estate ledger"** spec table right; "Taste neighbours" (4 similar coffees) below.

**Why:** The spec table is titled and styled as a ledger (mono labels, dashed rules) — this is the signature direction doing functional work: eight fields of provenance data (estate, district, elevation, varietal, process, fermentation…) presented as the proud technical document it is, instead of an apologetic bullet list. Missing sheet values render as "—" rather than being hidden, because in a directory an explicit unknown is information.

**Similar-coffee scoring:** shared flavour family (+2), same roast level (+2, adjacent +1), identical flavour note (+3), different brand (+1, to encourage discovery). Transparent, tunable, no ML pretensions.

## 8. Find my match quiz

**Decision:** Five questions (cup style → gear → flavour direction → adventurousness → budget), one screen each with progress beans, then a "match report": top 3 with rank badges and a *"Why"* line, plus 4 runners-up. Max two picks per brand.

**Why:**
- The questionnaire wireframe shows exactly this pattern (icon option cards, one question per screen, back/next).
- **Every match explains itself** ("holds up beautifully in milk; leads with dark chocolate and maple syrup"). Recommendation UIs earn trust through reasons, not scores; the reasons are assembled from the same rule hits that produced the score, so they can't drift from the truth.
- Budget is a hard-ish constraint (heavy penalty, not exclusion) so a spectacular ₹20-over coffee can still surface.
- "Adventurousness" maps to the dataset's genuinely distinguishing axis — India's experimental fermentation scene (anaerobic, barrel-aged, kombucha) versus classic washed lots — rather than a generic "mild/strong" question.

## 9. Learn & Stories

**Decision:** Six original guides (roast, process, species, brewing, regions, label-reading) + three stories (Baba Budan, Monsooned Malabar, forest coffee), all rendered from a single content file through one article template with prev/next chaining.

**Why:** The wireframes call for "Know your coffee" and "Blogs/Stories" as separate nav items with the same reading experience. One `ARTICLES` array with a `type` field keeps that true with zero duplicated code. Content is written to serve the directory: every guide explains a field that appears on coffee cards (roast meter, process tag, varietal line, ₹/100 g), so learning loops back into browsing.

## 10. Accessibility & quality floor

- Semantic landmarks, real `<button>`/`<a>` semantics, `aria-current` nav state, `role="radiogroup"` in the quiz, `aria-label`s on icon-only controls, visible `:focus-visible` outlines.
- Roast meters carry `role="img"` + text labels; generated art has descriptive `aria-label`s.
- `prefers-reduced-motion` disables all transitions/animations.
- Responsive to ~360 px: nav collapses to a toggle, filters become a sheet, detail stacks, quiz options go single-column.
- All user-influenced strings pass through an HTML-escaping helper before rendering.

## 11. Things deliberately *not* built

- **Cart/checkout** — the sheet has "LINK" placeholders, not real product URLs; a fake buy flow would be dishonest. "More from {roaster}" search stands in.
- **Framework, bundler, package.json** — nothing here needs them; their absence *is* the local-first feature.
- **Hotlinked roaster logos/photos** — fragile, unlicensed; replaced by the generated-art system.

## 12. Revision round 1 (user feedback)

- **Header CTA:** "Find my match" moved out of the plain nav into a persistent marigold button in the header on every page (visible on mobile too, next to the menu toggle) — it is the site's primary action and now reads as one.
- **Mobile home shelf:** the featured coffee listing becomes a snap-scrolling horizontal shelf under 720 px (`.scroll-mobile`), cutting the homepage's mobile length by ~8 card heights while keeping all 8 picks reachable.
- **Detail-page CTAs:** "Buy from website" is now the primary button, "More from {roaster}" demoted to secondary. The sheet's link column isn't exposed in its public render, so the buy button opens a precise web search for the exact roaster + coffee (new tab) — honest routing to the real product page without inventing URLs. If real product links become available in the data, `detail.js` swaps them in at one line.

## 13. Revision round 2 — cinematic minimal homepage

**Brief:** minimalist + bento + gradients + parallax; Apple-style scroll-scrubbed hero from the supplied bean photograph; forhers.com as the tonal reference; quiet copy.

- **Frame sequence:** the scrub needs frames, and one photo was supplied — so `gen_frames.py` renders 72 cinematic frames (1366×768, ~6 MB total) from `HeroImage.jpg`: a smoothstep-eased push-in from a wide, dark establishing crop into the heart of the bean pile, with an exposure/saturation ramp. Regenerable in one command.
- **Scrub engine (`js/home.js`):** 340vh pinned section, sticky full-viewport canvas, scroll progress → frame index, cover-fit drawing, DPR-aware, draws only when scroll dirties the frame (single rAF loop). Contiguous-preload strategy shows the nearest loaded frame while the sequence streams in.
- **Text choreography:** three stages hand off across the scrub — "Every Great Indian Coffee," → "made easy to find." → CTAs (Find my coffee / Surprise me) — driven by the same progress value via trapezoid fades, so text and film can never desync. Copy trimmed to the requested quiet register across every section.
- **Sections (per brief order):** cinematic hero → Popular picks (six openers, one per roaster) → How do you like your coffee (three gradient tiles) → Why Indian specialty coffee (bento: 4 wireframe points + parallax photo tile + 400-years stat tile) → Roasters (nine monogram tiles) → Newsletter CTA (front-end only success state; no backend on a static site).
- **Parallax:** gradient orbs and the bento photo drift on `[data-speed]`; disabled under `prefers-reduced-motion` (hero then shows the final stage statically).
- **Header:** transparent over the dark film, resolves to solid paper past the hero.
- **Bugs caught in browser verification, then fixed:** stage-1 headline was invisible at exactly scroll 0 (fade-in window began *at* 0); decorative orbs widened the page 140px (fixed with `overflow-x:clip` on `main` — `clip`, not `hidden`, so `position:sticky` survives); a CSS-relative image path 404'd.
- **Verified in Chromium before shipping:** frame index tracks scroll (0 → 36 → 71), canvas pixel signatures change between scroll positions, stage opacities hand off 1→2→3, header mode flips, all six pick cards reveal, parallax transforms move, roasters/cups render, newsletter succeeds, Surprise-me routes to a real coffee, mobile scrub reaches the final frame, zero horizontal overflow at 1440/1024/390px.
- The previous homepage is preserved as `index.v1.html.bak`.
