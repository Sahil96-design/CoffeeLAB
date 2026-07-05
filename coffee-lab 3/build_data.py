# Generates js/data.js from the Indian Specialty Coffee Directory sheet rows.
# Fields: brand ~ name ~ estate ~ district ~ elevation ~ classification ~ varietals ~ fermentation ~ process ~ roast ~ flavours ~ notes ~ price ~ sample
import json, re, hashlib

RAW = r"""
729 Grams Coffee~Amrut Whiskey~~Chikkamagaluru, Karnataka~950-1050~Blend~~~Natural + Aged~Medium~Black Currant • Whiskey~Green beans are aged in Amrut whisky barrels~488~No
729 Grams Coffee~Orchardale Naturals~Orchardale~Salem, Tamilnadu~1520~Blend - Microlot~SLN - 9, SLN - 795~~Natural~Light~Caramel • Mango • Plum • Raspberry~Scored SCA 88~477~No
729 Grams Coffee~Rose Culture Process~~Chikkamagaluru, Karnataka~1300~Blend~~Anaerobic Inoculation~Natural~Light Medium~Citrus • Floral • Red Fruits~A rose-derived culture is used for inoculation~445~No
729 Grams Coffee~House Blend~~Salem, Tamilnadu~1400-1524~Blend~~Anaerobic~Natural~Medium~Cacao Nibs • Mangosteen • Passion Fruit • Rose~~335~No
729 Grams Coffee~Dark Side~~Chikkamagaluru, Karnataka~910-1150~Blend~~~Natural~Dark~Cocoa • Dark Chocolate~~322~No
Agastya Coffee~Excelsa (Coffea Liberica)~~Kodagu, Karnataka~1000~Single Estate~Excelsa aka Liberica~~Natural~Medium~Jackfruit • Mango~~285~Yes
Agastya Coffee~Kent Microlot~Kogilahalla~Kodagu, Karnataka~1000~Microlot~Kent~~Natural~Medium~Orange Candy • Strawberries~From one of the few estates in India that grow the Kent varietal, linked to the beans brought to India by Baba Budan~270~Yes
Agastya Coffee~Mysore Nuggets Extra Bold~~Kodagu, Karnataka~1100~Single Estate~SLN - 795~~Washed~Medium Dark~Caramel • Chocolate~Graded beans: 100% above 6.5 mm and 90% above 7.5 mm~270~Yes
Agastya Coffee~Peaberry Washed~~Kodagu, Karnataka~1000~Single Estate~Arabica Peaberry~~Washed~Medium Dark~Caramel • Citrus • Milk Chocolate~~260~Yes
Agastya Coffee~Palace Field Estate~Palace Field Estate~Kodagu, Karnataka~1000~Single Estate~Chandragiri SLN - 13~~Washed~Medium~Chocolate • Tamarind~~240~Yes
Agastya Coffee~Kogilahalla Estate~Kogilahalla~Kodagu, Karnataka~1000-1400~Single Estate~SLN - 795~~Washed~Medium~Citrus • Tea Rose~~240~Yes
Agastya Coffee~Sandalkad Estate~Sandalkad~Kodagu, Karnataka~1170~Single Estate~~~Washed~Medium~Caramel • Mixed Berries • Plum~~240~Yes
Agastya Coffee~Modur Estate~Modur~Kodagu, Karnataka~1000~Single Estate~Sarchimor~~Washed~Medium Dark~Cane Sugar • Dark Chocolate • Mandarin~~240~Yes
Agastya Coffee~Espresso Blend~~Kodagu, Karnataka~1000~Blend~80% Arabica + 20% Robusta~~Washed~Dark~Caramel • Dark Chocolate~~225~Yes
Ainmane~Anaerobic Liberica~~Kodagu, Karnataka~800-850~Single Estate~Excelsa aka Liberica~Anaerobic~Natural~Light~Jackfruit • Plum • Star Anise~~240~No
Ainmane~Hardoor~Hadoor~Kodagu, Karnataka~1050~Single Estate~~~~Light~Coriander • Lime Zest~~238~No
Ainmane~Monsooned Malabar~~Kodagu, Karnataka~~Single Estate~~~Washed + Monsooned~Light~Earthy • Spice • Woody~~236~No
Ainmane~Baarbara Estate~Baarbara Estate~Chikkamagaluru, Karnataka~1400~Single Estate~SLN - 795~~Washed~Medium~Caramel • Grapefruit • Lime Zest~~232~No
Ainmane~Café Blend~~Chikkamagaluru, Kodagu, Karnataka~~Blend~Arabica + Robusta~~~Medium~Caramel • Fruity~~228~No
Ainmane~Honey Processed~~Kodagu, Karnataka~1080~Microlot~~~Honey~Light~Floral • Lemon Zest~~207~No
Ainmane~Anaerobic Naturals~~Kodagu, Karnataka~1080~Microlot~~Anaerobic~Natural~Light~Berries • Black Grapes • Candy~~207~No
Ainmane~Arabica Naturals~~Kodagu, Karnataka~1080~Microlot~~~Natural~Light~Black Pepper • Chocolate • Orange~~207~No
Ainmane~Excelsa (Coffea Liberica)~~Kodagu, Karnataka~1080~Microlot~~~Washed~Light Medium~Berries • Raisins • Roasted Almond~~207~No
Ainmane~Kudlur~Kudlur Estate~Kodagu, Karnataka~700~Single Estate~SLN - 795~~~Medium~Fruity~~200~No
Ainmane~Skandapuri~Skandapuri-Magarat Estate~Kodagu, Karnataka~975~Single Estate~~~~Medium~Citrusy • Sweet~~200~No
Ainmane~Kabbe Estate~Kabbe~Kodagu, Karnataka~1250~Single Estate~~~~Medium~Black Pepper • Fruity • Orange~~200~No
Alchemist Coffee Company~Air (Percolation Blend)~~~~Blend~~~Honey + Natural + Washed~Medium~Fruity • Tea~~258~No
Alchemist Coffee Company~Mooley Manay Naturals~Mooley Manay Estate~Kodagu, Karnataka~1000~Blend~Chandragiri SLN - 13, SLN - 9, SLN - 795~~~Medium~Cherry • Lime • Ripe Papaya~~258~No
Alchemist Coffee Company~Primus Victus~~~~Blend~~~~Medium Dark~Bold • Rich~~256~No
Alchemist Coffee Company~Kalledevarapura Washed~Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Single Estate~SLN - 795~~Washed~Medium~Almonds • Milk Chocolate • Nuts~~248~No
Alchemist Coffee Company~Balanoor Washed~Balanoor Estate~Kodagu, Karnataka~1400~Single Estate~~~Washed~Medium~Berry • Lemon • Light Spice~~248~No
Alchemist Coffee Company~Kalledevarapura Honey~Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Single Estate~SLN - 795~~Honey~Medium~Herbal Tea • Malt • Stone Fruit~~246~No
Alchemist Coffee Company~Earth (Immersion Blend)~~~~Blend~~~Honey + Natural + Washed~Medium~Chocolate~~246~No
Alchemist Coffee Company~Balanoor Espresso~Balanoor Estate~Kodagu, Karnataka~1400~Single Estate~BBTC~~~Medium~Berry • Lemon • Light Spice~~240~No
Alchemist Coffee Company~Kalledevarapura Espresso~Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Single Estate~SLN - 795~~Washed~Medium Dark~Chocolate • Nutty~~240~No
Alchemist Coffee Company~Rasasastra Arabica~~~~Single Estate~~~~Medium Dark~Dark Chocolate • Roasted~~218~No
Alchemist Coffee Company~Fire (Vienna Roast)~Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Blend~SLN - 795~~Washed~Vienna Roast~Smoky • Dark Chocolate~~218~No
Alchemist Coffee Company~Rasasastra Espresso~~~~Blend~70% Arabica + 30% Robusta~~~Medium Dark~Bold • Cocoa~~198~No
Alchemist Coffee Company~Koraput Naturals~SM Plantation~Koraput, Odisha~980~Single Estate~Chandragiri SLN - 13~~Natural~Medium~Nuts • Prunes • Raisin • Red Apple~~106~No
Alchemist Coffee Company~Koraput Washed~Maa Mangala Plantation~Koraput, Odisha~1000~Blend~Chandragiri SLN - 13, SLN - 9~~Washed~Medium~Nuts • Raisin • Salted Caramel • Toffee~~100~No
Araku~Anniversary Edit~Araku~Alluri Sitharama Raju, Andhra Pradesh~1083~Blend~~~Natural + Washed~Light~Honey • Red Apple • Watermelon~One natural and two washed coffees grown under silver oak and native forest shade using regenerative farming~780~No
Araku~Summer Edit~Araku~Alluri Sitharama Raju, Andhra Pradesh~1170~Microlot~~~Natural~Medium~Cashew • Chocolate Muffin • Mandarin • Red Apple~Grown on the steep, rocky slopes of Degu Gasarapalli in Hukumpeta, where cherries ripen slowly under silver oak canopy~432~No
Araku~Grand Reserve~Araku~Alluri Sitharama Raju, Andhra Pradesh~1120~Blend~~~Natural + Washed~Medium~Citrus • Dates • Floral • Tropical Fruits~Blend of arabica processed in two ways~356~Yes
Araku~Micro Climate~Araku~Alluri Sitharama Raju, Andhra Pradesh~850~Microlot~~~Natural~Medium~Dried Berry • Grapes • Honey • Olives~The coffee grows on the river island of Baankubedda~252~Yes
Araku~Selection~Araku~Alluri Sitharama Raju, Andhra Pradesh~1120~Blend~~~Honey + Natural + Washed~Medium Dark~Caramel • Dark Chocolate • Honey • Sugarcane~Blend of arabica processed in three ways~236~Yes
Araku~Signature~Araku~Alluri Sitharama Raju, Andhra Pradesh~1120~Blend~~~Natural + Washed~Medium~Cherry • Chocolate • Green Pepper~Blend of arabica processed in two ways~216~Yes
Badra Coffee~Sovereign Grand Reserve~Bettadakhan Estate~Chikkamagaluru, Karnataka~1100-1430~Microlot~Arabica~Cofermentation~Natural~Medium~Caramel • Honeyed Sapota • Mandarin Zest • Peach~Anaerobic fermentation with papaya and sapota for four days, then twenty-one days of slow shade drying~420~No
Badra Coffee~Liberica Highland Reserve~Balehonnur Estate~Chikkamagaluru, Karnataka~790-940~Microlot~Excelsa aka Liberica~Anaerobic~Natural~Medium~Black Cherry • Orange Blossom • Toffee • Tropical Fruits~Five-day anaerobic fermentation in sealed barrels, then a slow 25-day drying on raised beds under shade~400~No
Badra Coffee~Kanfora Prestige Reserve~Balehonnur Estate~Chikkamagaluru, Karnataka~790-940~Microlot~Robusta~Anaerobic Inoculation~Natural~Medium~Brown Sugar • Chocolate • Passion Fruit • Toasted Nuts~A premium robusta microlot: four-day fermentation followed by twenty-one days of slow, controlled drying~360~No
Badra Coffee~Temple Mountain~Bettadakhan Estate~Chikkamagaluru, Karnataka~1100-1430~Single Estate~Arabica~~Natural~Medium~Caramel • Cinnamon • Vanilla~~272~Yes
Badra Coffee~Misty Heights~Kerkeicoondah Estate~Chikkamagaluru, Karnataka~900-1140~Single Estate~Arabica + Robusta~~~Medium~Apricot • Honey • Orange • Vanilla~~234~Yes
Badra Coffee~Mocha Magic~Balehonnur, Bettadakhan, Kerkeicoondah~Chikkamagaluru, Karnataka~790-1430~Blend~~~~Medium Dark~Dark Chocolate • Praline • Roasted Nuts • Tangerine~~228~Yes
Badra Coffee~Kaapi Nirvana~Balehonnur, Bettadakhan, Kerkeicoondah~Chikkamagaluru, Karnataka~790-1430~Blend~Arabica + Robusta~~~Medium Dark~Almond • Honey • Plum • Vanilla~~172~Yes
Bili Hu~Rum Barrel Aged~~Chikkamagaluru, Karnataka~~Microlot~Arabica~~Washed + Aged~Medium~Apple Crumble • Soaked Raisins • Vanilla~Green beans rested in rum barrels before roasting~720~No
Bili Hu~Whiskey Barrel Aged Coffee~~Chikkamagaluru, Karnataka~~Microlot~Arabica~~Washed + Aged~Medium~Green Apple • Irish Cream • Single Malt~Green beans rested in whiskey barrels before roasting~720~Yes
Bili Hu~Lot 19 Kalledevarapura Estate~Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Microlot~SLN - 795~Anaerobic~Natural~Medium~Dark Chocolate • Maple Syrup • Roasted Nuts~~360~No
Bili Hu~Balur Estate Honey (Dark)~Balur Estate~Chikkamagaluru, Karnataka~~Single Estate~Arabica~~Honey~Dark~Almonds • Dark Chocolate~~340~No
Bili Hu~100% Arabica (Dark)~~Chikkamagaluru, Karnataka~~Blend~Arabica~~Washed~Dark~Cherry • Cocoa~~300~Yes
Bili Hu~Monsooned Malabar~~Chikkamagaluru, Karnataka~~Microlot~~~Natural + Monsooned~Light Medium~Jaggery • Nuts~~300~Yes
Bili Hu~Balur Estate Honey~Balur Estate~Chikkamagaluru, Karnataka~~Single Estate~Arabica~~Honey~Medium~Black Grapes • Sweet Berries~~300~No
Bili Hu~Gunibyle Estate San Ramon~Gunibyle Estate~Chikkamagaluru, Karnataka~~Microlot~Arabica~~Natural~Medium~Dark Chocolate • Molasses • Pomegranate~~300~No
Bili Hu~Gunibyle Estate~Gunibyle Estate~Chikkamagaluru, Karnataka~~Single Estate~Arabica~~Natural~Medium~Chocolate • Plum Wine~~300~No
Bili Hu~Aghora Estate~Aghora Estate~Chikkamagaluru, Karnataka~1100~Single Estate~Arabica~~Washed~Medium~Roasted Nuts • Sweet Lime~~300~No
Bili Hu~Kalledevarapura Estate~Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Single Estate~Arabica~~Washed~Medium~Milk Chocolate • Sweet Citrus~~300~No
Bili Hu~Mysore Nuggets Extra Bold~~Chikkamagaluru, Karnataka~1100~Microlot~SLN - 795~~Washed~Medium~Milk Chocolate • Spices~~300~No
Bili Hu~70 30 Arabica Robusta~Balur, Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Blend~70% Arabica + 30% Robusta~~Washed~Medium~Almonds • Dark Chocolate~~260~No
Bili Hu~80 20 Arabica Robusta~Balur, Kalledevarapura Estate~Chikkamagaluru, Karnataka~1300~Blend~80% Arabica + 20% Robusta~~Washed~Medium~Almonds • Dark Chocolate~~260~No
Bili Hu~100% Arabica~~Chikkamagaluru, Karnataka~~Blend~Arabica~~Washed~Medium~Date • Jaggery • Nuts~Blend of arabica from two plantations~260~Yes
Bili Hu~Balur Estate Robusta~Balur Estate~Chikkamagaluru, Karnataka~~Single Estate~Robusta~~Washed~Medium~Caramel Popcorn • Sweet Berries~~260~No
Black Baza Coffee~Kombucha Honey | BR Hills~~Chamrajanagar, Karnataka~1200~Microlot~Chandragiri SLN - 13~Cofermentation~Honey~Light Medium~Almond • Honey • Nutmeg~After pulping, the seeds are fermented in kombucha for 96 hours~288~No
Black Baza Coffee~Potter-Wasp | BR Hills~~Chamrajanagar, Karnataka~1200~Single Estate~SLN - 9~~Honey~Light Medium~Dried Berries • Jaggery~~252~No
Black Baza Coffee~Frogmouth | Nilgiris~~Nilgiris, Tamilnadu~1400~Single Estate~Chandragiri SLN - 13~~Washed~Medium~Amla • Guava • Walnuts~~244~No
Black Baza Coffee~Kaati | Palani Hills~~Dindigul, Tamilnadu~1200~Blend~Chandragiri SLN - 13, Sarchimor, SLN - 9~~Washed~Medium Dark~Burnt Caramel • Cocoa • Toasted Nuts~~244~No
Black Baza Coffee~Jumping Ant | BR Hills~~Chamrajanagar, Karnataka~1200~Single Estate~SLN - 9~~Washed~Light~Honey • Nutty • Sweet Citrus~~240~Yes
Black Baza Coffee~Galaxy Frog | BR Hills + Nilgiris~~Chamrajanagar, Karnataka | Nilgiris, Tamilnadu~1100-1400~Blend~SLN - 9~~Honey + Washed~Medium~Green Grapes • Lemon Zest • Molasses~A vibrant blend of washed arabicas (including peaberries) and semi-washed honeys~240~Yes
Black Baza Coffee~Wanderoo | BR Hills~~Chamrajanagar, Karnataka~1100~Single Estate~Chandragiri SLN - 13~~Washed~Medium~Brown Sugar • Dark Chocolate~~240~Yes
Black Baza Coffee~Loris | BR Hills~~Chamrajanagar, Karnataka~1200~Single Estate~SLN - 9~~Washed~Dark~Burnt Caramel • Dark Chocolate~~232~No
Black Baza Coffee~Tiger Beetle | BR Hills~~Chamrajanagar, Karnataka~1200~Single Estate~SLN - 9 Peaberry~~Washed~Medium~Cherry Jam • Fruit and Nuts • Milk Chocolate~~232~No
Black Baza Coffee~Ottis | BR Hills + Wayanad~~Chamrajanagar, Karnataka | Wayanad, Kerala~700-1100~Blend~Kent, SLN - 9~~Natural + Washed~Medium Dark~Baker's Chocolate • Caramel • Dried Berries~An 80/20 blend of arabica and robusta~232~No
Black Baza Coffee~Ficus | BR Hills + Wayanad~~Chamrajanagar, Karnataka | Wayanad, Kerala~700-1100~Blend~Kent, SLN - 9~~Natural + Washed~Medium Dark~Cacao Bitters • Dried Cranberries • Roast Almond~Grown under the shade of ficus trees; a 70/30 blend of arabica and robusta~232~Yes
Black Baza Coffee~Chukki | BR Hills~~Chamrajanagar, Karnataka~1200~Single Estate~SLN - 9~~Washed~Vienna Roast~Dark Chocolate • Hazelnut • Jaggery~~232~Yes
Bloom Coffee Roasters~Kolli Berry Estate Naturals~Kolibyle Estate~Chikkamagaluru, Karnataka~1150~Single Estate~SLN - 795~Anaerobic~Natural~Light~Raspberry • Stone Fruit • White Chocolate~Ripe cherries fermented anaerobically for 96 hours, then dried on raised beds for 28 days~390~No
Bloom Coffee Roasters~Salawara Estate Naturals~Salawara Estate~Hassan, Karnataka~1150~Single Estate~Chandragiri SLN - 13~Anaerobic Inoculation~Natural~Light~Citrus Fruits • Cocoa • Pineapple~Cherries fermented for 36 hours in a bio-reactor, inoculated with yeast, then dried over 26 days~350~No
Bloom Coffee Roasters~Udaigiri Estate Naturals~Udaigiri Estate~Chikkamagaluru, Karnataka~1150~Single Estate~SLN - 9~Osmotic~Natural~Light~Candied Nuts • Milk Chocolate • Mulberries~~340~No
Bloom Coffee Roasters~Salawara Anaerobic Yellow Honey~Salawara Estate~Hassan, Karnataka~1150~Single Estate~SLN - 795~Anaerobic~Honey~Light Medium~Hazelnut • Milk Chocolate • Tropical Fruits~~340~No
Bloom Coffee Roasters~Venkids Valley The Red Honey~Venkids Valley Estate~Kodagu, Karnataka~1000~Single Estate~Catuai~~Honey~Light~Butterscotch • Mango~~320~Yes
Bloom Coffee Roasters~Salawara Estate Red Honey~Salawara Estate~Hassan, Karnataka~1150~Single Estate~SLN - 795~Anaerobic~Honey~Light~Amla • Jaggery • Kinnow~Lightly pulped cherries fermented anaerobically for 72 hours, then slow dried for 22 days~300~Yes
Bloom Coffee Roasters~Kelachandra Estate Naturals~Kelachandra Estate~Chikkamagaluru, Kodagu, Karnataka~1150~Single Estate~Chandragiri SLN - 13~Anaerobic~Natural~Light~Cacao • Stone Fruit~~300~No
Bloom Coffee Roasters~Hoysala Estate Naturals~Hoysala Estate~Chikkamagaluru, Karnataka~1050~Single Estate~Sarchimor~~Natural~Light~Dark Chocolate • Dried Apricots • Orange Marmalade~~300~Yes
Bloom Coffee Roasters~Salawara Estate Yeast Washed~Salawara Estate~Hassan, Karnataka~1150~Single Estate~Chandragiri SLN - 13~Anaerobic Inoculation~Washed~Light~Butterscotch • Peach • White Chocolate~Anaerobic yeast fermentation before pulping, then washed thoroughly to remove the mucilage~300~No
Bloom Coffee Roasters~Anai Kadu Naturals~Anai Kadu Estate~Kodagu, Karnataka~1000~Single Estate~Catimor Arabica, SLN - 795~~Natural~Light~Baker's Chocolate • Plum • Orange~24-hour in-fruit aerobic fermentation, slow dried for 28 days~280~Yes
Bloom Coffee Roasters~Meera~Hoysala, Venkids Valley Estate~Chikkamagaluru, Kodagu, Karnataka~1000-1050~Blend~Chandragiri SLN - 13, SLN - 9~~Natural + Washed~Light Medium~Bakers Chocolate • Berries • Caramel • Vanilla~A clean, bright washed arabica blended with a super sweet, jammy natural — a rich espresso that holds its own in milk~280~Yes
Bloom Coffee Roasters~Harley Estate Vienna Roast~Harley Estate~Hassan, Karnataka~1130~Single Estate~SLN - 9~~Natural~Vienna Roast~Blackberry Jam • Cacao • Caramel~~280~No
Bloom Coffee Roasters~Hoysala Estate Washed~Hoysala Estate~Chikkamagaluru, Karnataka~1050~Single Estate~Sarchimor~~Washed~Light~Orange • Stone Fruit~~270~Yes
Bloom Coffee Roasters~High Brix Honey~~~~Blend~~~Honey~Medium~Cherries • Citrus Fruits • Nuts~Only the highest-brix cherries are picked, double sorted, lightly pulped and shade dried for 20–25 days~270~Yes
Bloom Coffee Roasters~Balanoor Plantations Kent~Balanoor Estate~Kodagu, Karnataka~1400~Single Estate~Kent~~Washed~Medium~Chocolate • Citrus Fruits • Plum~~270~Yes
Bloom Coffee Roasters~Salawara Estate Washed (Dark)~Salawara Estate~Hassan, Karnataka~1150~Single Estate~~~Washed~Dark~Caramel • Milk Chocolate~~260~Yes
Bloom Coffee Roasters~Papakuchi Coffee~Venkids Valley Estate~Kodagu, Karnataka~1000~Single Estate~SLN - 6~~Washed~Light~Malt • Pomegranate • Red Apple~~260~Yes
Bloom Coffee Roasters~Venkids Valley Estate Washed~Venkids Valley Estate~Kodagu, Karnataka~1000~Single Estate~SLN - 6~~Washed~Medium~Caramel • Chocolate • Orange Zest~~240~Yes
"""

ROAST_LEVEL = {"Light":1, "Light Medium":2, "Medium":3, "Medium Dark":4, "Dark":5, "Vienna Roast":5}

FLAVOUR_FAMILIES = {
  "fruity": ["berry","berries","currant","mango","plum","raspberry","cherry","apple","grape","citrus","orange","lemon","lime","mandarin","tangerine","grapefruit","peach","apricot","pineapple","papaya","watermelon","mangosteen","passion","pomegranate","cranberr","mulberr","strawberr","guava","amla","kinnow","jackfruit","tropical","dates","raisin","prunes","olives","fruit","stone fruit","sapota","blackberry"],
  "floral": ["floral","rose","blossom","jasmine","tea rose"],
  "chocolatey": ["chocolate","cocoa","cacao","mocha","nib"],
  "nutty": ["nut","almond","hazelnut","cashew","walnut","praline","peanut"],
  "sweet": ["caramel","honey","jaggery","toffee","butterscotch","molasses","brown sugar","cane sugar","sugarcane","vanilla","maple","candy","candied","malt","muffin","sweet","crumble","cream","popcorn","marmalade","jam","syrup"],
  "spicy": ["spice","pepper","cinnamon","nutmeg","anise","coriander","tamarind","earthy","woody","smoky","tea","herbal","whiskey","rum","wine"],
}

def families(flavs):
    fams = []
    text = " ".join(flavs).lower()
    for fam, keys in FLAVOUR_FAMILIES.items():
        if any(k in text for k in keys):
            fams.append(fam)
    return fams or ["sweet"]

def styles(roast, process, flavs):
    """Which serving styles suit this coffee: milk / black / cold."""
    lvl = ROAST_LEVEL.get(roast, 3)
    s = []
    if lvl >= 3: s.append("milk")
    if lvl <= 4: s.append("black")
    text = (" ".join(flavs) + " " + process).lower()
    if lvl <= 3 or "natural" in process.lower() or any(k in text for k in ["berry","citrus","fruit","grape","cherry","apple","tropical"]):
        s.append("cold")
    return sorted(set(s), key=["milk","black","cold"].index)

def brews(roast, process):
    lvl = ROAST_LEVEL.get(roast, 3)
    b = []
    if lvl <= 2: b += ["Pour over", "AeroPress"]
    if lvl == 3: b += ["Pour over", "AeroPress", "French press", "Moka pot"]
    if lvl >= 4: b += ["Espresso", "Moka pot", "South Indian filter", "French press"]
    if "Natural" in process and lvl <= 3 and "Cold brew" not in b: b.append("Cold brew")
    if lvl == 3 and "Espresso" not in b: b.append("Espresso")
    return b[:4]

coffees = []
for i, line in enumerate([l for l in RAW.strip().split("\n") if l.strip()]):
    parts = [p.strip() for p in line.split("~")]
    brand, name, estate, district, elevation, cls, varietals, ferment, process, roast, flav, notes, price, sample = parts
    flavs = [f.strip() for f in flav.split("•") if f.strip()]
    states = sorted(set(re.findall(r",\s*([A-Za-z ]+?)(?:\s*\||$)", district))) if district else []
    fams = families(flavs)
    slug = re.sub(r"[^a-z0-9]+", "-", (brand + " " + name).lower()).strip("-")
    coffees.append({
        "id": slug,
        "brand": brand,
        "name": name,
        "estate": estate,
        "district": district,
        "states": states,
        "elevation": elevation,
        "classification": cls,
        "varietals": varietals,
        "fermentation": ferment,
        "process": process,
        "roast": roast,
        "roastLevel": ROAST_LEVEL.get(roast, 3),
        "flavours": flavs,
        "families": fams,
        "styles": styles(roast, process, flavs),
        "brews": brews(roast, process),
        "notes": notes,
        "price": int(price),
        "sample": sample == "Yes",
    })

# de-dup ids
seen = {}
for c in coffees:
    if c["id"] in seen:
        seen[c["id"]] += 1
        c["id"] = f'{c["id"]}-{seen[c["id"]]}'
    else:
        seen[c["id"]] = 1

out = "// Coffee Lab dataset — generated from 'The Great Indian Specialty Coffee Directory' sheet.\n"
out += "// Regenerate with: python3 build_data.py\n"
out += "const COFFEES = " + json.dumps(coffees, ensure_ascii=False, indent=1) + ";\n"

with open("js/data.js", "w", encoding="utf-8") as f:
    f.write(out)

print(f"{len(coffees)} coffees, {len(set(c['brand'] for c in coffees))} brands, {len(set(s for c in coffees for s in c['states']))} states")
