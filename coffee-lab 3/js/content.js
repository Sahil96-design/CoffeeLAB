// Coffee Lab editorial content — guides ("Know your coffee") and stories (blog).
const ARTICLES = [
 {
  id: "roast-levels",
  type: "guide",
  tag: "Basics",
  minutes: 4,
  title: "Roast levels, decoded",
  standfirst: "Light, medium, dark — what actually changes in the bean, and how to pick the roast that matches how you drink.",
  body: [
   ["p", "Every coffee on Coffee Lab carries a roast level, shown as our five-bean roast meter. It is the single most useful signal on a bag, because roast decides more about what ends up in your cup than origin, varietal or process."],
   ["h2", "What roasting does"],
   ["p", "Green coffee is dense, grassy and almost flavourless. Heat sets off hundreds of reactions — sugars caramelise, acids break down, aromatic compounds form. The longer and hotter the roast, the more the roaster's flavour replaces the farm's flavour."],
   ["h2", "Light (beans 1–2)"],
   ["p", "Roasting stops soon after 'first crack'. Origin character survives intact: bright acidity, florals, tea-like body, fruit that tastes like actual fruit. Indian light roasts — think anaerobic naturals from Chikkamagaluru or Hassan — shine as pour over, AeroPress or black filter coffee. They usually get lost under milk."],
   ["h2", "Medium (bean 3)"],
   ["p", "The workhorse of Indian specialty coffee — half our directory sits here. Acidity softens, sweetness peaks, body fills out. Caramel, chocolate and ripe fruit live comfortably together. Medium roasts are the most forgiving: good black, good with a splash of milk, good cold."],
   ["h2", "Medium dark and dark (beans 4–5)"],
   ["p", "Past 'second crack', roast flavours take over: dark chocolate, toasted nuts, smoke, molasses. Body is heavy, acidity is low, bitterness is welcome. This is espresso and South Indian filter territory — the intensity that cuts through hot milk. A 'Vienna roast' sits at the darkest edge, glossy with surfaced oils."],
   ["h2", "The honest rule of thumb"],
   ["p", "Drink it black? Start light or medium. Drink it with milk? Start medium dark. Want cold brew? Medium roasts and fruity naturals make the sweetest glass. There are exceptions, but this rule fails rarely enough to trust."]
  ]
 },
 {
  id: "processing",
  type: "guide",
  tag: "Basics",
  minutes: 5,
  title: "Washed, natural, honey: processing explained",
  standfirst: "The word after 'process' on a coffee bag tells you what happened between the tree and the roaster — and it changes everything.",
  body: [
   ["p", "A coffee cherry is a fruit with a seed inside. Processing is how the seed gets out of the fruit, and each method leaves a different fingerprint on the cup."],
   ["h2", "Washed"],
   ["p", "The fruit is pulped off and the seed is fermented in water, then washed clean before drying. The result is clarity: crisp acidity, transparent flavours, a clean finish. Most classic Indian estate coffees — Kodagu and Chikkamagaluru washed arabicas — taste of chocolate, caramel and citrus with nothing muddying the picture."],
   ["h2", "Natural"],
   ["p", "The whole cherry dries in the sun with the seed still inside, soaking in fruit sugars for weeks. Naturals are loud: berries, wine, jam, tropical fruit, heavy sweetness. India's new wave of anaerobic naturals from estates like Salawara and Kolibyle are some of the most expressive coffees in the country."],
   ["h2", "Honey"],
   ["p", "The middle path — the skin comes off but some sticky fruit mucilage (the 'honey') stays on during drying. Expect washed-style balance with natural-style sweetness: jaggery, butterscotch, ripe stone fruit."],
   ["h2", "Monsooned"],
   ["p", "A uniquely Indian process. Beans are exposed to humid monsoon winds on the Malabar coast for weeks, swelling and mellowing. Monsooned Malabar is low in acidity, heavy in body, with earthy, woody, spiced flavours — a love-it-or-leave-it classic."],
   ["h2", "Barrel aged, fermented, inoculated"],
   ["p", "Experimental processing is booming in India: green beans rested in whiskey or rum barrels, cherries fermented with cultured yeast, kombucha or even fruit like papaya and sapota. These lots are conversation pieces — small, seasonal and worth trying at least once."]
  ]
 },
 {
  id: "arabica-robusta-liberica",
  type: "guide",
  tag: "Basics",
  minutes: 4,
  title: "Arabica, robusta and India's liberica moment",
  standfirst: "India is one of the few origins that grows all three commercial species well. Here's how to tell them apart in the cup.",
  body: [
   ["p", "Most coffee conversations start and stop at arabica versus robusta. In India the story is more interesting — and it now includes liberica."],
   ["h2", "Arabica"],
   ["p", "Grown high (roughly 1,000–1,500 m in the Western Ghats), arabica is sweeter, more acidic and more aromatic, with about half the caffeine of robusta. India's heirloom selections carry their own names: Kent, S.795 (SLN‑795), S.9, Chandragiri, Sarchimor. When a bag lists a varietal like 'SLN‑795', it is telling you the specific arabica cultivar."],
   ["h2", "Robusta"],
   ["p", "Hardier, grown lower, twice the caffeine, and — done well — nothing like the harsh commodity robusta of instant coffee. Indian 'Kaapi Royale' robustas add body, crema and a dark-cocoa punch, which is why classic espresso and South Indian filter blends are often 70–80% arabica with 20–30% robusta."],
   ["h2", "Liberica and excelsa"],
   ["p", "The wildcard. Liberica (and its excelsa variety) is a big, jackfruit-scented species that a handful of Kodagu and Chikkamagaluru estates now process as specialty lots. Expect unmistakable flavours — jackfruit, mango, star anise — unlike anything else in the directory."],
   ["h2", "Peaberry"],
   ["p", "Not a species but a quirk: sometimes a cherry grows one round seed instead of two flat ones. Peaberries are sorted out and sold separately; fans say the round bean roasts more evenly and cups sweeter."]
  ]
 },
 {
  id: "brewing-methods",
  type: "guide",
  tag: "Brewing",
  minutes: 5,
  title: "Match the brew to the bean",
  standfirst: "Espresso, pour over, French press, AeroPress, cold brew and the steel South Indian filter — what each method rewards.",
  body: [
   ["p", "There is no best brewing method, only better and worse pairings. Every coffee page on Coffee Lab suggests brews for that bean; here is the logic behind those suggestions."],
   ["h2", "Pour over and AeroPress — for clarity"],
   ["p", "Paper filters strip oils and fines, leaving a clean, articulate cup. This is where light roasts and delicate washed coffees show their fruit and florals. Grind medium-fine, water just off the boil, and taste it black before you judge it."],
   ["h2", "French press and moka pot — for body"],
   ["p", "Metal filtration keeps the oils in, so the cup is heavier and rounder. Medium and medium-dark roasts with chocolate and nut notes thrive here. Coarse grind and four minutes for the press; fine grind and low heat for the moka."],
   ["h2", "Espresso — for intensity"],
   ["p", "Nine bars of pressure concentrate everything, including flaws. Medium-dark roasts, honeys and arabica-robusta blends make sweet, syrupy shots that carry through milk. Very light roasts can work but demand skill and a good grinder."],
   ["h2", "South Indian filter — for tradition"],
   ["p", "The two-chamber steel filter drips a thick decoction meant for hot frothed milk and a little sugar. Dark roasts and robusta-forward blends are built for it; a fruity light natural will simply disappear."],
   ["h2", "Cold brew — for sweetness"],
   ["p", "Twelve to eighteen hours of cold steeping mutes acidity and bitterness and amplifies sweetness. Fruity naturals and medium roasts make cold brew that tastes like bottled dessert. Coarse grind, 1:8 coffee to water, dilute to taste."]
  ]
 },
 {
  id: "indian-regions",
  type: "guide",
  tag: "Origins",
  minutes: 5,
  title: "A field guide to India's coffee regions",
  standfirst: "From the misty Baba Budan Giri hills to the tribal farms of Araku Valley — where Indian coffee grows and how each region tastes.",
  body: [
   ["p", "Indian coffee legend begins with Baba Budan, the 17th-century saint said to have smuggled seven seeds from Yemen and planted them in the Chandra Drona hills of Karnataka. Four centuries later, those hills anchor a coffee map that stretches across five states in this directory alone."],
   ["h2", "Chikkamagaluru, Karnataka"],
   ["p", "The birthplace, and still the heavyweight. Estates between 900 and 1,450 m grow classic washed arabicas and, increasingly, India's boldest experimental lots — barrel-aged beans, anaerobic naturals, liberica reserves. If a coffee in this directory could come from anywhere, it probably comes from here."],
   ["h2", "Kodagu (Coorg), Karnataka"],
   ["p", "Dense shade-grown plantations under pepper vines and fruit trees. Kodagu coffees tend toward balance — chocolate, caramel, gentle citrus — and the region grows some of India's best robusta alongside its arabica."],
   ["h2", "BR Hills and Chamrajanagar, Karnataka"],
   ["p", "Forest coffee. Growers here — many working with the Soliga community — farm inside and around wildlife sanctuaries, and the coffees are named for the creatures that share the canopy: loris, wanderoo, tiger beetle."],
   ["h2", "Araku Valley, Andhra Pradesh"],
   ["p", "A high plateau in the Eastern Ghats where thousands of Adivasi smallholder families grow biodynamic arabica. Araku's naturals and washed lots are precise, sweet and fruit-forward, and the cooperative model behind them is studied worldwide."],
   ["h2", "The Nilgiris and Palani Hills, Tamil Nadu"],
   ["p", "High-elevation arabica (up to 1,500 m+) with crisp acidity and clean fruit. Salem's Shevaroy hills and estates like Orchardale produce microlots that score among India's best."],
   ["h2", "Wayanad, Kerala and Koraput, Odisha"],
   ["p", "Wayanad is robusta country — the backbone of great filter coffee blends. Koraput, like Araku, is a tribal-grown Eastern Ghats origin, and its washed arabicas are some of the best-value beans in the directory."]
  ]
 },
 {
  id: "reading-a-label",
  type: "guide",
  tag: "Basics",
  minutes: 3,
  title: "How to read a specialty coffee label",
  standfirst: "Estate, elevation, varietal, MASL, microlot — a translation guide for everything printed on the bag.",
  body: [
   ["p", "Specialty coffee bags are dense with jargon. Here is what each field on a Coffee Lab page (and on the bag it describes) actually means."],
   ["h2", "Estate and district"],
   ["p", "Where the coffee grew. 'Single estate' means every bean came from one farm — a signature you can trace. A district tells you the broader terroir: Chikkamagaluru, Kodagu, Araku and so on."],
   ["h2", "Elevation (MASL)"],
   ["p", "Metres above sea level. Higher farms are cooler; cherries ripen slower and build more sugar and acidity. Above ~1,200 m in India generally signals brighter, more complex cups."],
   ["h2", "Source classification"],
   ["p", "Single estate: one farm. Microlot: a small, separately processed parcel — often a single plot, day of harvest, or experiment. Blend: coffees combined for balance and consistency. None is 'better'; they promise different things — traceability, discovery, reliability."],
   ["h2", "Varietal"],
   ["p", "The cultivar of the arabica (or robusta) plant. Indian selections like S.795, S.9, Chandragiri and Kent each ripen and taste differently — S.795, bred from Kent, is the classic 'Mysore flavour' of Indian coffee."],
   ["h2", "Fermentation"],
   ["p", "If a bag names a fermentation — anaerobic, yeast inoculated, cofermented with fruit or kombucha — the producer deliberately controlled microbes to shape flavour. Expect a louder, more distinctive cup."],
   ["h2", "Price per 100 g"],
   ["p", "We normalise every price to 100 grams so a 200 g bag and a 250 g bag can be compared honestly. As a rough scale in this directory: under ₹200 is value, ₹200–₹350 is the specialty mainstream, above ₹350 is reserve and experimental territory."]
  ]
 },
 {
  id: "story-baba-budan",
  type: "story",
  tag: "History",
  minutes: 4,
  title: "Seven seeds: the smuggler saint of Chikkamagaluru",
  standfirst: "Indian coffee begins with an act of holy contraband — seven fertile seeds strapped to a pilgrim's chest.",
  body: [
   ["p", "In the early 1600s, the story goes, a Sufi pilgrim named Baba Budan stopped in the Yemeni port of Mocha on his way home from Mecca. Coffee — qahwa — was Arabia's jealously guarded monopoly; exporting a fertile seed was forbidden. Baba Budan hid seven seeds on his person, seven being a sacred number, and carried them home to the hills of Chikkamagaluru."],
   ["p", "He planted them near his hermitage in the Chandra Drona range, hills that now bear his name: Baba Budan Giri. From those slopes, coffee spread through the Western Ghats — to Kodagu, the Nilgiris, Wayanad and beyond."],
   ["p", "The varietal story never stopped there. British-era planters selected the Kent cultivar in the 1920s; Indian breeders crossed it into S.795, still the most planted arabica in the country. When you drink a Kent microlot from Kodagu today, you are tasting a direct line back to those seven seeds."],
   ["p", "It is a good origin myth precisely because it is mostly true: India was one of the first places on earth to grow coffee outside Arabia and Africa, and the hills where it started are still producing some of the country's finest lots four hundred years later."]
  ]
 },
 {
  id: "story-monsooned",
  type: "story",
  tag: "Process",
  minutes: 3,
  title: "The accident that became Monsooned Malabar",
  standfirst: "How months in a ship's damp hold created India's strangest — and most imitated — coffee.",
  body: [
   ["p", "In the age of sail, coffee shipped from India's Malabar coast to Europe spent four to six months at sea, sweating in wooden hulls through the monsoon. The green beans that arrived were swollen, pale gold, and tasted nothing like fresh crop: acidity gone, body doubled, flavours of earth, spice and old wood."],
   ["p", "European buyers, oddly, loved it. When steamships and the Suez Canal cut the journey short, the flavour vanished — and Indian exporters engineered it back. Beans are now deliberately spread in open-sided warehouses on the coast during the June–September monsoon, absorbing humid winds for twelve to sixteen weeks until they transform."],
   ["p", "Monsooned Malabar remains a protected, uniquely Indian style. It divides drinkers absolutely — mushroomy and flat to some, deep and comforting to others — and it makes a legendary low-acid espresso base. Every Indian coffee drinker should taste it once, if only to pick a side."]
  ]
 },
 {
  id: "story-forest-coffee",
  type: "story",
  tag: "Origins",
  minutes: 4,
  title: "Coffee that keeps the forest standing",
  standfirst: "In the BR Hills and Araku Valley, the most interesting thing about the coffee is the farming behind it.",
  body: [
   ["p", "Most of the world's coffee grows in full sun on cleared land. Almost all Indian coffee grows in shade — under jackfruit, ficus, silver oak and wild forest canopy — which makes Indian plantations some of the most biodiverse farmland on earth."],
   ["p", "Two origins in this directory push the idea furthest. In the Biligiriranga (BR) Hills of Karnataka, coffee is grown by and with the Soliga, an Adivasi community farming inside a tiger reserve. The lots are named for forest neighbours — the slender loris, the potter wasp, the galaxy frog — and the premium paid for the coffee funds keeping that habitat intact."],
   ["p", "A state away, the Araku Valley model organises thousands of tribal smallholder families into cooperatives growing biodynamic arabica. The valley's coffees have won international cupping awards, and the farmers own the brand that sells them."],
   ["p", "The lesson for the drinker is simple: in India, choosing a forest-grown, community-farmed coffee is not a compromise on quality. Increasingly, it is where the best quality lives."]
  ]
 }
];
