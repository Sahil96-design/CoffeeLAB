# ☕ Coffee Lab — the Indian coffee directory

One place to know everything about coffee in India: browse 99 specialty beans from 9 roasters, match a coffee to your taste in a 2-minute quiz, and learn how coffee actually works.

## Run it

No build, no install. Either:

**Option A — just open it**
Double-click `index.html`. Everything (including the dataset) is embedded, so it works straight off the filesystem.

**Option B — local server (recommended)**
```bash
cd coffee-lab
python3 -m http.server 8000
# open http://localhost:8000
```

Fonts load from Google Fonts when online; the site falls back to system fonts offline.

## Pages

| Page | What it does |
|---|---|
| `index.html` | Home — search, featured shelf, browse by cup style, Coffee 101 |
| `directory.html` | Full directory with faceted filters (cup, roast, flavour, process, region, sourcing, roaster, price, sample packs), search, sort. Supports `?q=`, `?style=milk\|black\|cold`, `?sample=1` |
| `coffee.html?id=…` | Coffee detail — roast meter, flavour pills, estate ledger, suggested brews, similar coffees |
| `match.html` | Find-my-match quiz — 5 questions → top 3 matches with reasons |
| `learn.html` | Coffee 101 guides |
| `blogs.html` | Stories from Indian coffee history |
| `article.html?id=…` | Article reader |

## Data

- Source: *The Great Indian Specialty Coffee Directory* (public Google Sheet).
- `build_data.py` contains the raw rows and derives normalised fields (roast level 1–5, flavour families, milk/black/cold suitability, suggested brews, slugs). Regenerate `js/data.js` with:
  ```bash
  python3 build_data.py
  ```
- To add coffees: append rows to the `RAW` block in `build_data.py` and re-run. No other file changes needed.

## Project layout

```
coffee-lab/
├── index.html  directory.html  coffee.html  match.html
├── learn.html  blogs.html  article.html
├── css/style.css        # full design system (tokens at the top)
├── js/data.js           # generated dataset  (do not edit by hand)
├── js/content.js        # guides + stories
├── js/app.js            # shared chrome, cards, roast meter, generated bag art
├── js/directory.js  js/detail.js  js/match.js
├── build_data.py        # data pipeline
├── DECISION.md          # every design decision, with reasoning
└── README.md
```

See **DECISION.md** for the design rationale (palette, type, the roast-meter and generated-art signatures, quiz scoring rules, and what was deliberately left out).
