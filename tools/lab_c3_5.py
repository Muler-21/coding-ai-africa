from labkit import *
import numpy as np
W = ('1–2 weeks', '1–2 ሳምንታት')
SIM = ('Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.', 'ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።')
TIME_NOTE = ('Timings depend on the computer; the pattern, not the exact milliseconds, is the result.', 'ጊዜዎች በኮምፒውተሩ ላይ ይወሰናሉ፤ ውጤቱ ትክክለኛዎቹ ሚሊሰከንዶች ሳይሆኑ ንድፉ ነው።')
GIT = T('Git + GitHub', 'version control and sharing', 'የስሪት ቁጥጥርና ማጋራት', 'git-scm.com, github.com (free)')

C3 = []
C3.append(lab(('Cooperative yield records: classes and pandas', 'የማኅበር የምርት መዝገቦች፡ classes እና pandas'),
 ('Model 40 member farms with a Farm class, analyse yields with pandas, and choose which farms the extension agent should visit first.', '40 አባል እርሻዎችን በFarm class ሞዴል አድርግ፣ ምርቶችን በpandas ተንትን፣ የኤክስቴንሽን ሠራተኛው መጀመሪያ የትኞቹን እርሻዎች መጎብኘት እንዳለበት ምረጥ።'), W,
 [PY, PD, MPL, GIT],
 (['Create farm records: id, kebele, crop, area, harvest, fertilizer used (yes/no).', 'Write a Farm class with a yield_t_ha() method; build 40 objects.', 'Convert the objects to a pandas DataFrame.', 'Compare yield by crop and by fertilizer use with groupby.', 'List teff farms below the teff median: the visit list.'],
  ['የእርሻ መዝገቦችን ፍጠር፡ id፣ ቀበሌ፣ ሰብል፣ ስፋት፣ ምርት፣ ማዳበሪያ ተጠቅሟል (አዎ/አይደለም)።', 'yield_t_ha() method ያለው Farm class ጻፍ፤ 40 objects ገንባ።', 'objectsኡን ወደ pandas DataFrame ቀይር።', 'ምርትን በሰብልና በማዳበሪያ አጠቃቀም በgroupby አወዳድር።', 'ከጤፍ median በታች ያሉ የጤፍ እርሻዎችን ዘርዝር፡ የጉብኝት ዝርዝሩ።']),
 '''
import numpy as np, pandas as pd
rng = np.random.default_rng(9)
class Farm:
    def __init__(self, fid, kebele, crop, area_ha, harvest_t, fertilizer):
        self.fid, self.kebele, self.crop, self.area_ha, self.harvest_t, self.fertilizer = fid, kebele, crop, area_ha, harvest_t, fertilizer
    def yield_t_ha(self):
        return self.harvest_t / self.area_ha
base = {"teff": 1.6, "maize": 4.0, "wheat": 2.6}
farms = []
for i in range(40):
    crop = rng.choice(list(base), p=[0.5, 0.3, 0.2]); fert = rng.random() < 0.6; area = round(rng.uniform(0.25, 1.5), 2)
    y = base[crop] * (1.25 if fert else 0.9) * rng.normal(1, 0.15)
    farms.append(Farm(f"F{i + 1:02d}", rng.choice(["Zenzelma", "Sebatamit", "Meshenti"]), crop, area, round(y * area, 2), fert))
df = pd.DataFrame([{**vars(f), "t_ha": round(f.yield_t_ha(), 2)} for f in farms])
summary = df.groupby(["crop", "fertilizer"]).t_ha.mean().unstack().round(2)
print(summary)
teff = df[df.crop == "teff"]; median = teff.t_ha.median()
visit = teff[teff.t_ha < median].sort_values("t_ha")[["fid", "kebele", "t_ha", "fertilizer"]]
print(f"teff median {median:.2f} t/ha; visit list ({len(visit)} farms):"); print(visit.to_string(index=False))
share_nofert = (~visit.fertilizer).mean()
''',
 viz=lambda ns: [hbar(B('Mean yield by crop and fertilizer use (t/ha)', 'አማካይ ምርት በሰብልና በማዳበሪያ አጠቃቀም (t/ha)'), list(ns['summary'].index), [(B('No fertilizer', 'ማዳበሪያ የለም'), list(ns['summary'][False]), 2), (B('With fertilizer', 'ከማዳበሪያ ጋር'), list(ns['summary'][True]), 1)], 't/ha', fmt=2)],
 analysis=lambda ns: ([f"Every crop yields more with fertilizer; teff: {ns['summary'].loc['teff', True]:.2f} vs {ns['summary'].loc['teff', False]:.2f} t/ha.", f"{len(ns['visit'])} teff farms are below the median of {ns['median']:.2f} t/ha.", f"{ns['share_nofert']:.0%} of the farms on the visit list used no fertilizer: the most likely cause to address."],
                      [f"እያንዳንዱ ሰብል ከማዳበሪያ ጋር ብዙ ምርት ይሰጣል፤ ጤፍ፡ {ns['summary'].loc['teff', True]:.2f} vs {ns['summary'].loc['teff', False]:.2f} t/ha።", f"{len(ns['visit'])} የጤፍ እርሻዎች ከ{ns['median']:.2f} t/ha median በታች ናቸው።", f"በጉብኝት ዝርዝሩ ላይ ካሉት እርሻዎች {ns['share_nofert']:.0%} ማዳበሪያ አልተጠቀሙም፡ ሊፈታ የሚገባው በጣም ሊሆን የሚችለው ምክንያት።"]),
 decision=lambda ns: ('Visit the listed teff farms first, starting with those without fertilizer; offer input credit and record next season’s yields to check the effect.', 'የተዘረዘሩትን የጤፍ እርሻዎች መጀመሪያ ጎብኝ፣ ማዳበሪያ ከሌላቸው ጀምር፤ የግብዓት ብድር አቅርብ፣ ውጤቱን ለመፈተሽም የሚቀጥለውን ወቅት ምርት መዝግብ።'),
 note=('Simulated records; fertilizer users may also differ in other ways (wealth, land), so the visit tests the cause rather than assumes it.', 'የተመሰሉ መዝገቦች፤ ማዳበሪያ ተጠቃሚዎች በሌሎች መንገዶችም (ሀብት፣ መሬት) ሊለያዩ ይችላሉ፤ ስለዚህ ጉብኝቱ ምክንያቱን ይፈትናል እንጂ አይገምትም።')))
C3.append(lab(('Algorithm benchmark for a price-lookup service', 'ለየዋጋ ፍለጋ አገልግሎት የalgorithm መለኪያ'),
 ('Count the work done by linear vs binary search and bubble vs merge sort as data grow, and pick the algorithms for a service with 100,000 prices.', 'ዳታው ሲያድግ በlinear vs binary search እና በbubble vs merge sort የሚሠራውን ሥራ ቁጠር፣ 100,000 ዋጋዎች ላለው አገልግሎት algorithmsን ምረጥ።'), W,
 [PY, MPL, GIT],
 (['Write linear_search, binary_search, bubble_sort and merge_sort that count comparisons.', 'Run them on random price lists of size 100, 400, 1,600 and 6,400.', 'Record comparisons in a table.', 'Plot comparisons against list size.', 'Estimate the work for 100,000 items and choose.'],
  ['ንጽጽሮችን የሚቆጥሩ linear_search፣ binary_search፣ bubble_sort እና merge_sort ጻፍ።', 'በ100፣ 400፣ 1,600 እና 6,400 መጠን ባሉ የዘፈቀደ የዋጋ ዝርዝሮች ላይ አስኪዳቸው።', 'ንጽጽሮችን በሰንጠረዥ መዝግብ።', 'ንጽጽሮችን ከዝርዝር መጠን አንፃር ቻርት አድርግ።', 'ለ100,000 ንጥሎች ሥራውን ገምትና ምረጥ።']),
 '''
import random, math
random.seed(3)
def linear(a, x):
    for i, v in enumerate(a, 1):
        if v == x: return i
    return len(a)
def binary(a, x):
    lo, hi, c = 0, len(a) - 1, 0
    while lo <= hi:
        c += 1; mid = (lo + hi) // 2
        if a[mid] == x: return c
        lo, hi = (mid + 1, hi) if a[mid] < x else (lo, mid - 1)
    return c
def bubble_cmp(n): return n * (n - 1) // 2
def merge_cmp(a):
    if len(a) <= 1: return a, 0
    l, cl = merge_cmp(a[:len(a) // 2]); r, cr = merge_cmp(a[len(a) // 2:]); out, c, i, j = [], cl + cr, 0, 0
    while i < len(l) and j < len(r):
        c += 1
        if l[i] <= r[j]: out.append(l[i]); i += 1
        else: out.append(r[j]); j += 1
    return out + l[i:] + r[j:], c
sizes = [100, 400, 1600, 6400]; res = {"linear": [], "binary": [], "bubble": [], "merge": []}
for n in sizes:
    a = sorted(random.sample(range(10 * n), n)); targets = random.sample(a, 50)
    res["linear"].append(sum(linear(a, t) for t in targets) / 50)
    res["binary"].append(sum(binary(a, t) for t in targets) / 50)
    shuffled = random.sample(a, n); res["bubble"].append(bubble_cmp(n)); res["merge"].append(merge_cmp(shuffled)[1])
for k, v in res.items(): print(f"{k:7s}", [round(x) for x in v])
N = 100_000
print(f"for {N:,} items: linear ~{N / 2:,.0f}, binary ~{math.log2(N):.0f} comparisons per lookup; bubble ~{N * (N - 1) / 2:,.0f}, merge ~{N * math.log2(N):,.0f} comparisons per sort")
''',
 viz=lambda ns: [line(B('Comparisons per lookup', 'በአንድ ፍለጋ ንጽጽሮች'), ns['sizes'], [(B('Linear search', 'Linear search'), ns['res']['linear'], 2), (B('Binary search', 'Binary search'), ns['res']['binary'], 1)], B('List size', 'የዝርዝር መጠን'), B('Comparisons', 'ንጽጽሮች'), ymin=0),
                 line(B('Comparisons to sort (thousands)', 'ለመደርደር ንጽጽሮች (በሺዎች)'), ns['sizes'], [(B('Bubble sort', 'Bubble sort'), [v / 1000 for v in ns['res']['bubble']], 2), (B('Merge sort', 'Merge sort'), [v / 1000 for v in ns['res']['merge']], 1)], B('List size', 'የዝርዝር መጠን'), B('Thousand comparisons', 'ሺህ ንጽጽሮች'), ymin=0)],
 analysis=lambda ns: ([f"Linear search grows in step with the list (about n/2: {ns['res']['linear'][-1]:.0f} at 6,400); binary search barely moves ({ns['res']['binary'][-1]:.0f}).", f"Bubble sort needs {ns['res']['bubble'][-1] / ns['res']['merge'][-1]:.0f} times more comparisons than merge sort at 6,400 items, and the gap keeps widening.", 'At 100,000 items, bubble sort would take about 5 billion comparisons: unusable for a live service.'],
                      [f"Linear search ከዝርዝሩ ጋር አብሮ ያድጋል (ወደ n/2፡ በ6,400 {ns['res']['linear'][-1]:.0f})፤ binary search ከሞላ ጎደል አይንቀሳቀስም ({ns['res']['binary'][-1]:.0f})።", f"በ6,400 ንጥሎች bubble sort ከmerge sort {ns['res']['bubble'][-1] / ns['res']['merge'][-1]:.0f} እጥፍ ንጽጽሮች ያስፈልገዋል፤ ልዩነቱም እየሰፋ ይሄዳል።", 'በ100,000 ንጥሎች bubble sort ወደ 5 ቢሊዮን ንጽጽሮች ይወስዳል፡ ለቀጥታ አገልግሎት ጥቅም የለውም።']),
 decision=lambda ns: ('Sort the price list once with the built-in sort (an n log n algorithm) whenever prices change, and answer lookups with binary search (Python’s bisect module) or a dictionary.', 'ዋጋዎች በተለወጡ ቁጥር የዋጋ ዝርዝሩን አብሮ በተሠራው sort (n log n algorithm) አንድ ጊዜ ደርድር፤ ፍለጋዎችን በbinary search (የPython bisect module) ወይም በdictionary መልስ።')))
C3.append(lab(('Market API with a database: does an index help?', 'ከዳታቤዝ ጋር የገበያ API፡ index ይረዳል?'),
 ('Load 200,000 price reports into SQLite behind a Flask API, measure response times with and without an index, and decide what to index.', '200,000 የዋጋ ሪፖርቶችን ከFlask API ጀርባ ወደ SQLite ጫን፣ ከindex ጋርና ያለ index የምላሽ ጊዜዎችን ለካ፣ ምን index እንደሚደረግ ወስን።'), W,
 [PY, T('Flask', 'the web API', 'የድር APIው', 'pip install flask'), T('SQLite', 'the database (built into Python)', 'ዳታቤዙ (በPython ውስጥ አብሮ የተሠራ)', 'nothing to install'), MPL],
 (['Create tables markets and prices; insert 200,000 synthetic reports.', 'Write GET /prices?crop=&market= returning the latest 10 prices as JSON.', 'Call it 50 times with the test client and record the median time.', 'Add an index on (crop, market, day) and repeat.', 'Read EXPLAIN QUERY PLAN before and after.'],
  ['markets እና prices ሰንጠረዦችን ፍጠር፤ 200,000 ሰው ሠራሽ ሪፖርቶችን አስገባ።', 'የቅርብ 10 ዋጋዎችን እንደ JSON የሚመልስ GET /prices?crop=&market= ጻፍ።', 'በtest client 50 ጊዜ ጥራውና median ጊዜውን መዝግብ።', 'በ(crop፣ market፣ day) ላይ index ጨምርና ድገም።', 'ከዚያ በፊትና በኋላ EXPLAIN QUERY PLANን አንብብ።']),
 '''
import sqlite3, random, time, statistics
from flask import Flask, jsonify, request
db = sqlite3.connect(":memory:", check_same_thread=False)
db.execute("CREATE TABLE prices(market TEXT, crop TEXT, day INTEGER, birr REAL)")
random.seed(1); markets = [f"M{i:02d}" for i in range(40)]; crops = ["teff", "maize", "wheat", "sorghum", "barley"]
db.executemany("INSERT INTO prices VALUES (?,?,?,?)", ((random.choice(markets), random.choice(crops), random.randint(1, 730), round(random.uniform(30, 140), 1)) for _ in range(200_000)))
app = Flask(__name__)
Q = "SELECT day, birr FROM prices WHERE crop = ? AND market = ? ORDER BY day DESC LIMIT 10"
@app.get("/prices")
def prices():
    rows = db.execute(Q, (request.args["crop"], request.args["market"])).fetchall()
    return jsonify([{"day": d, "birr": b} for d, b in rows])
client = app.test_client()
def bench():
    ts = []
    for _ in range(50):
        t = time.perf_counter(); r = client.get(f"/prices?crop={random.choice(crops)}&market={random.choice(markets)}"); ts.append((time.perf_counter() - t) * 1000)
    return statistics.median(ts)
plan = lambda: db.execute("EXPLAIN QUERY PLAN " + Q, ("teff", "M01")).fetchone()[-1]
before, p1 = bench(), plan()
db.execute("CREATE INDEX idx ON prices(crop, market, day)")
after, p2 = bench(), plan()
print(f"without index: {before:.1f} ms median | plan: {p1}")
print(f"with index:    {after:.2f} ms median | plan: {p2}")
print(f"speed-up: about {before / after:.0f}x")
''',
 viz=lambda ns: [hbar(B('Median API response time (ms)', 'Median የAPI ምላሽ ጊዜ (ms)'), [B('No index', 'index የለም'), B('Index on crop, market, day', 'በcrop፣ market፣ day ላይ index')], [(B('ms', 'ms'), [ns['before'], ns['after']], 1)], 'ms', fmt=2)],
 analysis=lambda ns: ([f"Without an index SQLite scans all 200,000 rows for every request ({ns['before']:.1f} ms).", f"With the index it jumps straight to the matching rows, already in day order ({ns['after']:.2f} ms), about {ns['before'] / ns['after']:.0f} times faster.", 'The index costs disk space and slows inserts slightly: worth it, because reads far outnumber writes here.'],
                      [f"ያለ index SQLite ለእያንዳንዱ ጥያቄ 200,000 ረድፎችን ሁሉ ይቃኛል ({ns['before']:.1f} ms)።", f"ከindex ጋር አስቀድመው በቀን ቅደም ተከተል ወዳሉት ተዛማጅ ረድፎች በቀጥታ ይዘላል ({ns['after']:.2f} ms)፣ ወደ {ns['before'] / ns['after']:.0f} እጥፍ ፈጣን።", 'indexኡ የዲስክ ቦታ ያስወጣል፣ ማስገባቶችንም በትንሹ ያዘገያል፡ ያዋጣል፣ እዚህ ንባቦች ከጽሑፎች በብዙ እጥፍ ስለሚበልጡ።']),
 decision=lambda ns: ('Create the composite index (crop, market, day) that matches the API query exactly; re-check EXPLAIN QUERY PLAN whenever a new query is added.', 'ከAPI queryው ጋር በትክክል የሚስማማውን የተዋሃደ index (crop፣ market፣ day) ፍጠር፤ አዲስ query በተጨመረ ቁጥር EXPLAIN QUERY PLANን እንደገና ፈትሽ።'), note=TIME_NOTE))
C3.append(lab(('Forecasting next week’s teff price', 'የሚቀጥለውን ሳምንት የጤፍ ዋጋ መተንበይ'),
 ('Compare three models on two years of weekly prices with an honest time split, and decide which forecast to publish.', 'በሁለት ዓመታት ሳምንታዊ ዋጋዎች ላይ ሦስት ሞዴሎችን በታማኝ የጊዜ ክፍፍል አወዳድር፣ የትኛውን ትንበያ እንደምታትም ወስን።'), W,
 [PY, PD, SK, MPL],
 (['Build features: week number, season (sine/cosine), last week’s price, price 4 weeks ago.', 'Train on weeks 1–88, test on the last 16 weeks (never shuffle time).', 'Models: "same as last week", linear regression, random forest.', 'Compute mean absolute error on the test weeks.', 'Plot actual vs forecasts and decide.'],
  ['features ገንባ፡ የሳምንት ቁጥር፣ ወቅት (sine/cosine)፣ የባለፈው ሳምንት ዋጋ፣ ከ4 ሳምንታት በፊት ያለ ዋጋ።', 'በሳምንታት 1–88 አሰልጥን፣ በመጨረሻዎቹ 16 ሳምንታት ፈትሽ (ጊዜን በፍጹም አትቀላቅል)።', 'ሞዴሎች፡ «እንደ ባለፈው ሳምንት»፣ linear regression፣ random forest።', 'በፈተና ሳምንታቱ ላይ mean absolute error አስላ።', 'ትክክለኛውንና ትንበያዎችን ቻርት አድርግና ወስን።']),
 '''
import numpy as np, pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
rng = np.random.default_rng(12); w = np.arange(104)
price = 95 + 0.15 * w + 6 * np.sin(2 * np.pi * w / 52) + np.cumsum(rng.normal(0, 0.8, 104)) + rng.normal(0, 1.5, 104)
df = pd.DataFrame({"week": w, "price": price, "s": np.sin(2 * np.pi * w / 52), "c": np.cos(2 * np.pi * w / 52)})
df["lag1"] = df.price.shift(1); df["lag4"] = df.price.shift(4); df = df.dropna()
X, y = df[["week", "s", "c", "lag1", "lag4"]], df.price
train, test = df.week < 88, df.week >= 88
preds = {"same as last week": df.lag1[test].values,
         "linear regression": LinearRegression().fit(X[train], y[train]).predict(X[test]),
         "random forest": RandomForestRegressor(300, random_state=0).fit(X[train], y[train]).predict(X[test])}
mae = {k: float(np.mean(np.abs(v - y[test].values))) for k, v in preds.items()}
for k, v in mae.items(): print(f"{k:18s} MAE {v:.2f} birr/kg")
best = min(mae, key=mae.get); test_weeks = df.week[test].tolist(); actual = y[test].tolist()
''',
 viz=lambda ns: [line(B('Last 16 weeks: actual price and forecasts', 'የመጨረሻዎቹ 16 ሳምንታት፡ ትክክለኛ ዋጋና ትንበያዎች'), ns['test_weeks'], [(B('Actual', 'ትክክለኛ'), ns['actual'], 1), (B('Linear regression', 'Linear regression'), list(ns['preds']['linear regression']), 2), (B('Random forest', 'Random forest'), list(ns['preds']['random forest']), 3)], B('Week', 'ሳምንት'), B('Birr per kg', 'ብር በኪሎ'), rpad=110),
                 hbar(B('Forecast error on the test weeks (MAE, birr/kg)', 'በፈተና ሳምንታቱ ላይ የትንበያ ስህተት (MAE፣ ብር/kg)'), list(ns['mae']), [('MAE', list(ns['mae'].values()), 1)], B('Birr per kg', 'ብር በኪሎ'), fmt=2)],
 analysis=lambda ns: ([f"Best on unseen weeks: {ns['best']} (MAE {ns['mae'][ns['best']]:.2f} birr/kg).", f"Linear regression {ns['mae']['linear regression']:.2f} vs random forest {ns['mae']['random forest']:.2f} birr/kg; a tree model cannot predict a price above any it was trained on, so check it whenever prices trend upward.", 'Last week’s price is a strong benchmark: any model must beat it to be worth publishing.'],
                      [f"ባልታዩ ሳምንታት ላይ ምርጡ፡ {ns['best']} (MAE {ns['mae'][ns['best']]:.2f} ብር/kg)።", f"Linear regression {ns['mae']['linear regression']:.2f} vs random forest {ns['mae']['random forest']:.2f} ብር/kg፤ የዛፍ ሞዴል ከሰለጠነበት በላይ የሆነ ዋጋን መተንበይ አይችልም፤ ስለዚህ ዋጋዎች ወደ ላይ ሲያዘነብሉ ፈትሸው።", 'የባለፈው ሳምንት ዋጋ ጠንካራ መለኪያ ነው፡ ማንኛውም ሞዴል ለመታተም ብቁ ለመሆን ማሸነፍ አለበት።']),
 decision=lambda ns: (f"Publish the {ns['best']} forecast with a ± range equal to the test MAE, and retrain every month; never shuffle weeks when testing a forecast.", f"የ{ns['best']} ትንበያውን ከፈተናው MAE ጋር እኩል በሆነ ± ክልል አትም፣ በየወሩ እንደገና አሰልጥን፤ ትንበያን ስትፈትሽ ሳምንታትን በፍጹም አትቀላቅል።"), note=SIM))
emit_labs('c', 3, C3, 4)

C4 = []
C4.append(lab(('Numerical integration: how accurate is enough?', 'Numerical integration፡ ምን ያህል ትክክለኛነት በቂ ነው?'),
 ('Integrate a rainfall-rate curve with the trapezoid and Simpson rules in Python and C, measure error against step size and runtime, and choose a method.', 'የዝናብ መጠን ኩርባን በtrapezoid እና በSimpson ሕጎች በPython እና በC integrate አድርግ፣ ስህተትን ከእርምጃ መጠንና ከሩጫ ጊዜ አንፃር ለካ፣ ዘዴም ምረጥ።'), W,
 [PY, NP, T('gcc', 'compile the C version', 'የC ስሪቱን አጠናቅር', 'apt install gcc / MinGW on Windows'), MPL],
 (['Define rain(t) = 12·exp(−(t−2)²/2) mm/h; the exact total over 0–6 h is known.', 'Implement trapezoid and Simpson rules.', 'Compute the error for n = 4, 8, 16, …, 1024 intervals.', 'Plot log error against log n; read the slope (order of accuracy).', 'Time the same loop in C for n = 10⁷ to see the cost of Python loops.'],
  ['rain(t) = 12·exp(−(t−2)²/2) mm/h ግለጽ፤ በ0–6 ሰ ያለው ትክክለኛ ድምር ይታወቃል።', 'trapezoid እና Simpson ሕጎችን ተግብር።', 'ለn = 4፣ 8፣ 16፣ …፣ 1024 intervals ስህተቱን አስላ።', 'log ስህተትን ከlog n አንፃር ቻርት አድርግ፤ slopeውን (የትክክለኛነት ደረጃ) አንብብ።', 'የPython loops ዋጋን ለማየት ያንኑ loop በC ለn = 10⁷ ጊዜ ለካ።']),
 '''
import numpy as np, math
f = lambda t: 12 * np.exp(-((t - 2) ** 2) / 2)
exact = 12 * math.sqrt(2 * math.pi) * 0.5 * (math.erf(4 / math.sqrt(2)) + math.erf(2 / math.sqrt(2)))
def trap(n):
    x = np.linspace(0, 6, n + 1); y = f(x); return (6 / n) * (y[0] / 2 + y[1:-1].sum() + y[-1] / 2)
def simpson(n):
    x = np.linspace(0, 6, n + 1); y = f(x); return (6 / n) / 3 * (y[0] + 4 * y[1:-1:2].sum() + 2 * y[2:-1:2].sum() + y[-1])
ns_ = [4, 8, 16, 32, 64, 128, 256, 1024]
err_t = [abs(trap(n) - exact) for n in ns_]; err_s = [max(abs(simpson(n) - exact), 1e-16) for n in ns_]
slope_t = np.polyfit(np.log10(ns_[:5]), np.log10(err_t[:5]), 1)[0]; slope_s = np.polyfit(np.log10(ns_[1:5]), np.log10(err_s[1:5]), 1)[0]
print(f"exact total {exact:.6f} mm")
for n, a, b in zip(ns_, err_t, err_s): print(f"n={n:5d}  trapezoid error {a:.2e}  Simpson error {b:.2e}")
print(f"error slope on log-log: trapezoid {slope_t:.1f}, Simpson {slope_s:.1f}")
''',
 viz=lambda ns: [line(B('Error vs number of intervals (log10 scales)', 'ስህተት vs የintervals ብዛት (log10 መለኪያዎች)'), [float(np.log10(n)) for n in ns['ns_']], [(B('Trapezoid', 'Trapezoid'), [float(np.log10(e)) for e in ns['err_t']], 2), (B('Simpson', 'Simpson'), [float(np.log10(e)) for e in ns['err_s']], 1)], B('log10(intervals)', 'log10(intervals)'), B('log10(error, mm)', 'log10(ስህተት፣ mm)'), xint=False)],
 analysis=lambda ns: ([f"Trapezoid error falls with slope about {ns['slope_t']:.1f}: doubling n divides the error by about 4 (second order).", f"Simpson falls with slope about {ns['slope_s']:.1f}: doubling n divides the error by about 16 (fourth order).", 'With only 32 intervals Simpson is already far more accurate than any rain gauge.'],
                      [f"የtrapezoid ስህተት በ{ns['slope_t']:.1f} ገደማ slope ይወርዳል፡ nን በእጥፍ ማሳደግ ስህተቱን በ4 ገደማ ያካፍላል (second order)።", f"Simpson በ{ns['slope_s']:.1f} ገደማ slope ይወርዳል፡ nን በእጥፍ ማሳደግ ስህተቱን በ16 ገደማ ያካፍላል (fourth order)።", 'በ32 intervals ብቻ Simpson ከማንኛውም የዝናብ መለኪያ በጣም ትክክለኛ ነው።']),
 decision=lambda ns: ('Use Simpson’s rule (scipy.integrate.simpson) with a few dozen intervals for smooth data; with real gauge readings the measurement error, not the method, limits accuracy, so do not over-refine.', 'ለለስላሳ ዳታ Simpson ሕግን (scipy.integrate.simpson) ከጥቂት ደርዘን intervals ጋር ተጠቀም፤ በእውነተኛ የመለኪያ ንባቦች ትክክለኛነትን የሚገድበው ዘዴው ሳይሆን የልኬት ስህተቱ ነው፤ ስለዚህ ከልክ በላይ አታጥራ።')))
C4.append(lab(('Milk-collection routing: exact, greedy and 2-opt', 'የወተት መሰብሰቢያ መንገድ፡ ትክክለኛ፣ greedy እና 2-opt'),
 ('Plan a daily truck route through 12 villages, compare nearest-neighbour, 2-opt improvement and the exact optimum on a smaller case, and decide what to run every morning.', 'በ12 መንደሮች በኩል የዕለት የመኪና መንገድ አቅድ፣ nearest-neighbourን፣ 2-opt ማሻሻያንና በትንሽ ጉዳይ ላይ ትክክለኛውን ምርጥ አወዳድር፣ በየጠዋቱ ምን እንደሚሠራ ወስን።'), W,
 [PY, NP, MPL],
 (['Place the cooling centre and 12 villages with coordinates (from a map or GPS).', 'Build a distance matrix.', 'Route 1: nearest neighbour from the centre.', 'Route 2: improve it with 2-opt (reverse segments while the tour gets shorter); route 3: run 2-opt from 30 random starting tours and keep the best.', 'For 8 villages, compute the exact optimum by brute force and compare the gaps.'],
  ['የማቀዝቀዣ ማዕከሉንና 12 መንደሮችን ከcoordinates ጋር አስቀምጥ (ከካርታ ወይም ከGPS)።', 'የርቀት ማትሪክስ ገንባ።', 'መንገድ 1፡ ከማዕከሉ nearest neighbour።', 'መንገድ 2፡ በ2-opt አሻሽለው (ጉዞው እያጠረ እስከሄደ ድረስ ክፍሎችን ገልብጥ)፤ መንገድ 3፡ 2-optን ከ30 የዘፈቀደ መነሻ ጉዞዎች አስኪድና ምርጡን አቆይ።', 'ለ8 መንደሮች ትክክለኛውን ምርጥ በbrute force አስልተህ ክፍተቶቹን አወዳድር።']),
 '''
import numpy as np, itertools
rng = np.random.default_rng(11)
pts = np.vstack([[15, 15], rng.uniform(0, 30, (12, 2))])        # 0 = cooling centre; km
D = np.linalg.norm(pts[:, None] - pts[None], axis=2)
length = lambda t: sum(D[t[i], t[(i + 1) % len(t)]] for i in range(len(t)))
def nearest(nodes):
    tour, left = [0], set(nodes) - {0}
    while left: nxt = min(left, key=lambda j: D[tour[-1], j]); tour.append(nxt); left.remove(nxt)
    return tour
def two_opt(t):
    t, better = t[:], True
    while better:
        better = False
        for i in range(1, len(t) - 1):
            for j in range(i + 1, len(t)):
                new = t[:i] + t[i:j + 1][::-1] + t[j + 1:]
                if length(new) < length(t) - 1e-9: t, better = new, True
    return t
def restarts(nodes, k=30):                                         # 2-opt from many random starting tours
    r = np.random.default_rng(0); best = two_opt(nearest(nodes))
    for _ in range(k):
        t = two_opt([0] + list(r.permutation([x for x in nodes if x])))
        if length(t) < length(best): best = t
    return best
res = {}
for name, nodes in [("12 villages", list(range(13))), ("8 villages", list(range(9)))]:
    nn = nearest(nodes); res[name] = [length(nn), length(two_opt(nn)), length(restarts(nodes))]
res["8 villages"].append(length(min(([0] + list(p) for p in itertools.permutations(range(1, 9))), key=length)))
for k, v in res.items():
    print(f"{k}: nearest neighbour {v[0]:.1f} km, 2-opt {v[1]:.1f} km, 2-opt x30 starts {v[2]:.1f} km" + (f", exact optimum {v[3]:.1f} km" if len(v) > 3 else ""))
saving = res["12 villages"][0] - res["12 villages"][2]
print(f"2-opt saves {saving:.1f} km per day = {saving * 365:,.0f} km per year")
''',
 viz=lambda ns: [hbar(B('Route length (km)', 'የመንገድ ርዝመት (km)'), [B('12 villages', '12 መንደሮች'), B('8 villages', '8 መንደሮች')], [(B('Nearest neighbour', 'Nearest neighbour'), [ns['res']['12 villages'][0], ns['res']['8 villages'][0]], 2), (B('2-opt', '2-opt'), [ns['res']['12 villages'][1], ns['res']['8 villages'][1]], 0), (B('2-opt, 30 starts', '2-opt፣ 30 መነሻዎች'), [ns['res']['12 villages'][2], ns['res']['8 villages'][2]], 1)], 'km', fmt=1, note=B(f"Exact optimum for 8 villages (brute force): {ns['res']['8 villages'][3]:.1f} km.", f"ለ8 መንደሮች ትክክለኛ ምርጥ (brute force)፡ {ns['res']['8 villages'][3]:.1f} km።"))],
 analysis=lambda ns: ([f"For 12 villages: nearest neighbour {ns['res']['12 villages'][0]:.1f} km, 2-opt {ns['res']['12 villages'][1]:.1f} km, 2-opt from 30 starts {ns['res']['12 villages'][2]:.1f} km.", f"On 8 villages, 2-opt from 30 starts finds {ns['res']['8 villages'][2]:.1f} km, the same as the exact optimum ({ns['res']['8 villages'][3]:.1f} km); a single 2-opt run can stop in a worse local optimum.", 'Brute force already checks 40,320 orders for 8 villages; for 12 it would be 39.9 million, and it explodes beyond that.'],
                      [f"ለ12 መንደሮች፡ nearest neighbour {ns['res']['12 villages'][0]:.1f} km፣ 2-opt {ns['res']['12 villages'][1]:.1f} km፣ 2-opt ከ30 መነሻዎች {ns['res']['12 villages'][2]:.1f} km።", f"በ8 መንደሮች 2-opt ከ30 መነሻዎች {ns['res']['8 villages'][2]:.1f} km ያገኛል፣ ከትክክለኛው ምርጥ ({ns['res']['8 villages'][3]:.1f} km) ጋር እኩል፤ አንድ የ2-opt ሩጫ በከፋ local optimum ሊቆም ይችላል።", 'brute force ለ8 መንደሮች አስቀድሞ 40,320 ቅደም ተከተሎችን ይፈትሻል፤ ለ12 39.9 ሚሊዮን ይሆናል፣ ከዚያ በላይ ደግሞ ይፈነዳል።']),
 decision=lambda ns: (f"Run 2-opt from 30 random starts every morning (it takes well under a second); it saves about {ns['saving'] * 365:,.0f} km of driving a year here. Re-plan when villages join or roads close.", f"በየጠዋቱ 2-opt ከ30 የዘፈቀደ መነሻዎች አስኪድ (ከአንድ ሰከንድ በታች ይወስዳል)፤ እዚህ በዓመት ወደ {ns['saving'] * 365:,.0f} km ገደማ መንዳትን ያድናል። መንደሮች ሲቀላቀሉ ወይም መንገዶች ሲዘጉ እንደገና አቅድ።"),
 note=('Straight-line distances on simulated coordinates; with real roads use road distances (for example from OpenStreetMap).', 'በተመሰሉ coordinates ላይ ቀጥተኛ-መስመር ርቀቶች፤ በእውነተኛ መንገዶች የመንገድ ርቀቶችን ተጠቀም (ለምሳሌ ከOpenStreetMap)።')))
C4.append(lab(('Scheduling a shared lab server', 'የጋራ የላብራቶሪ ሰርቨርን ማቀድ'),
 ('Simulate FCFS, shortest-job-first and round-robin scheduling on a realistic mix of short and long analysis jobs, and choose a policy for the department server.', 'በአጭርና ረጅም የትንተና ስራዎች ተጨባጭ ቅልቅል ላይ FCFSን፣ shortest-job-firstን እና round-robin schedulingን አስመስል፣ ለዲፓርትመንቱ ሰርቨር ፖሊሲ ምረጥ።'), W,
 [PY, NP, MPL],
 (['Generate a day of jobs: 80% short (1–5 min), 20% long (30–180 min), random arrivals.', 'Implement the three schedulers as event simulations.', 'Measure average waiting time and the 95th percentile for short jobs.', 'Repeat at three load levels (jobs per hour).', 'Plot and choose.'],
  ['የአንድ ቀን ስራዎችን አመንጭ፡ 80% አጭር (1–5 ደቂቃ)፣ 20% ረጅም (30–180 ደቂቃ)፣ የዘፈቀደ መድረሻዎች።', 'ሦስቱን schedulers እንደ event simulations ተግብር።', 'ለአጭር ስራዎች አማካይ የመጠበቂያ ጊዜንና 95ኛ percentileን ለካ።', 'በሦስት የጭነት ደረጃዎች (በሰዓት ስራዎች) ድገም።', 'ቻርት አድርግና ምረጥ።']),
 '''
import numpy as np
def jobs(rate, rng, hours=8):                 # average job is about 23 min, so 2.4 jobs/hour keeps the server ~94% busy
    t, out = 0.0, []
    while True:
        t += rng.exponential(60 / rate)
        if t > hours * 60: return out
        out.append((t, rng.uniform(1, 5) if rng.random() < 0.8 else rng.uniform(30, 180)))
def simulate(js, policy, q=5):
    js = sorted(js); t, i, ready, waits, done = 0.0, 0, [], [], []
    rem = {k: b for k, (a, b) in enumerate(js)}; last_start = {}
    while i < len(js) or ready:
        if not ready: t = max(t, js[i][0])
        while i < len(js) and js[i][0] <= t: ready.append(i); i += 1
        if policy == "SJF": ready.sort(key=lambda k: rem[k])
        k = ready.pop(0); run = rem[k] if policy != "RR" else min(q, rem[k])
        t += run; rem[k] -= run
        while i < len(js) and js[i][0] <= t: ready.append(i); i += 1
        if rem[k] > 1e-9: ready.append(k)
        else: done.append((k, t - js[k][0] - js[k][1]))
    short = [w for k, w in done if js[k][1] <= 5]
    return np.mean(short), np.percentile(short, 95)
loads = [1.5, 2.0, 2.4]; res = {p: [] for p in ["FCFS", "SJF", "RR"]}
for rate in loads:
    for p in res:
        vals = [simulate(jobs(rate, np.random.default_rng(s)), p) for s in range(20)]
        res[p].append(tuple(np.mean(vals, axis=0)))
for p, v in res.items(): print(p, ["avg %.1f / p95 %.1f min" % x for x in v])
''',
 viz=lambda ns: [line(B('Short jobs: average wait (minutes)', 'አጭር ስራዎች፡ አማካይ መጠበቂያ (ደቂቃዎች)'), ns['loads'], [(B(p, p), [x[0] for x in v], i + 1) for i, (p, v) in enumerate(ns['res'].items())], B('Jobs per hour', 'በሰዓት ስራዎች'), B('Minutes', 'ደቂቃዎች'), ymin=0, xint=False),
                 line(B('Short jobs: 95th-percentile wait (minutes)', 'አጭር ስራዎች፡ 95ኛ-percentile መጠበቂያ (ደቂቃዎች)'), ns['loads'], [(B(p, p), [x[1] for x in v], i + 1) for i, (p, v) in enumerate(ns['res'].items())], B('Jobs per hour', 'በሰዓት ስራዎች'), B('Minutes', 'ደቂቃዎች'), ymin=0, xint=False)],
 analysis=lambda ns: ([f"Under FCFS, short jobs wait on average {ns['res']['FCFS'][-1][0]:.0f} minutes at the highest load: they get stuck behind long jobs.", f"Round robin keeps short-job waits near {ns['res']['RR'][-1][0]:.0f} minutes without needing to know job lengths.", f"Shortest-job-first (without interrupting a running job) still leaves short jobs waiting {ns['res']['SJF'][-1][0]:.0f} minutes behind long jobs that have already started, needs job lengths in advance and can starve long jobs."],
                      [f"በFCFS ሥር አጭር ስራዎች በከፍተኛው ጭነት በአማካይ {ns['res']['FCFS'][-1][0]:.0f} ደቂቃዎች ይጠብቃሉ፡ ከረጅም ስራዎች ጀርባ ይቀረቀራሉ።", f"Round robin የስራ ርዝመቶችን ማወቅ ሳያስፈልገው የአጭር-ስራ መጠበቂያዎችን በ{ns['res']['RR'][-1][0]:.0f} ደቂቃዎች አቅራቢያ ያቆያል።", f"Shortest-job-first (እየሠራ ያለን ስራ ሳያቋርጥ) አጭር ስራዎችን አስቀድመው ከጀመሩ ረጅም ስራዎች ጀርባ {ns['res']['SJF'][-1][0]:.0f} ደቂቃዎች ያስጠብቃል፣ የስራ ርዝመቶችን አስቀድሞ ይፈልጋል፣ ረጅም ስራዎችንም ሊያስርብ ይችላል።"]),
 decision=lambda ns: ('Use time-sliced (round-robin style) scheduling with a separate queue or partition for long jobs (as SLURM does with partitions); ask users to state a time limit so the scheduler can also favour short jobs.', 'ለረጅም ስራዎች የተለየ ወረፋ ወይም partition ያለው በጊዜ የተከፋፈለ (round-robin ዓይነት) scheduling ተጠቀም (SLURM በpartitions እንደሚያደርገው)፤ schedulerኡ አጭር ስራዎችንም እንዲያስቀድም ተጠቃሚዎች የጊዜ ገደብ እንዲገልጹ ጠይቅ።')))
C4.append(lab(('Crop-disease classifier: build and evaluate properly', 'የሰብል-በሽታ classifier፡ በትክክል ገንባና ገምግም'),
 ('Train three classifiers on leaf measurements for healthy, rust and blight, evaluate with cross-validation and per-class recall, and choose one for field use.', 'ለጤናማ፣ ለዝገትና ለblight በቅጠል ልኬቶች ላይ ሦስት classifiers አሰልጥን፣ በcross-validation እና በክፍል recall ገምግም፣ ለመስክ አጠቃቀም አንዱን ምረጥ።'), W,
 [PY, SK, PD, MPL],
 (['Assemble features per leaf: spot count, spot size, yellow index, brown index, leaf area.', 'Split by farm (group k-fold) so leaves from one farm are never in both train and test.', 'Train logistic regression, random forest and a small neural network (MLP).', 'Report cross-validated accuracy and recall for each disease.', 'Choose using the cost of missing a disease.'],
  ['በቅጠል features አሰባስብ፡ የነጠብጣብ ብዛት፣ የነጠብጣብ መጠን፣ የቢጫ መለኪያ፣ የቡናማ መለኪያ፣ የቅጠል ስፋት።', 'ከአንድ እርሻ የመጡ ቅጠሎች በፍጹም በሥልጠናም በፈተናም እንዳይሆኑ በእርሻ ክፈል (group k-fold)።', 'logistic regressionን፣ random forestን እና ትንሽ neural network (MLP) አሰልጥን።', 'የcross-validated accuracyን እና ለእያንዳንዱ በሽታ recallን ዘግብ።', 'በሽታን የማምለጥ ዋጋን በመጠቀም ምረጥ።']),
 '''
import numpy as np
from sklearn.model_selection import GroupKFold, cross_val_predict
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, recall_score
from sklearn.model_selection import KFold
rng = np.random.default_rng(5); n = 900
farm = rng.integers(0, 30, n); mix = rng.dirichlet([1.2, 1, 0.7], 30)       # each farm has its own disease mix
cls = np.array([rng.choice(3, p=mix[f]) for f in farm]); sig = rng.normal(0, 1, (30, 2))   # farm signature: soil colour, leaf size
spots = np.where(cls == 0, rng.poisson(2, n), np.where(cls == 1, rng.poisson(6, n), rng.poisson(4, n)))
size = np.where(cls == 2, rng.normal(3.5, 1.5, n), rng.normal(2, 1.0, n)).clip(0.1)
yellow = 0.3 + 0.25 * (cls == 1) + 0.15 * sig[farm, 0] + rng.normal(0, 0.15, n)
brown = 0.2 + 0.25 * (cls == 2) + 0.1 * sig[farm, 0] + rng.normal(0, 0.2, n); area = 40 + 6 * sig[farm, 1] + rng.normal(0, 3, n)
X = np.column_stack([spots, size, yellow, brown, area]); names = ["healthy", "rust", "blight"]
models = {"logistic": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),
          "random forest": RandomForestClassifier(300, random_state=0),
          "neural net": make_pipeline(StandardScaler(), MLPClassifier((32,), max_iter=2000, random_state=0))}
res = {}
for k, m in models.items():
    p = cross_val_predict(m, X, cls, cv=GroupKFold(5), groups=farm)
    q = cross_val_predict(m, X, cls, cv=KFold(5, shuffle=True, random_state=0))       # the wrong way: leaves from one farm on both sides
    res[k] = (accuracy_score(cls, p), recall_score(cls, p, average=None), accuracy_score(cls, q))
    print(f"{k:13s} accuracy by farm {res[k][0]:.3f} (random split {res[k][2]:.3f}) | recall healthy/rust/blight {np.round(res[k][1], 3)}")
best = max(res, key=lambda k: res[k][1][2])
''',
 viz=lambda ns: [hbar(B('Recall per class (share of each class correctly found)', 'Recall በክፍል (በትክክል የተገኘ የእያንዳንዱ ክፍል ድርሻ)'), ns['names'], [(B(k, k), list(v[1]), i + 1) for i, (k, v) in enumerate(ns['res'].items())], 'Recall', fmt=3)],
 analysis=lambda ns: ([f"On farms they never saw, the models reach {min(v[0] for v in ns['res'].values()):.1%} to {max(v[0] for v in ns['res'].values()):.1%} accuracy.", f"Blight is the class most often missed; the best blight recall is {ns['res'][ns['best']][1][2]:.0%} ({ns['best']}).", f"A random split looks up to {100 * max(v[2] - v[0] for v in ns['res'].values()):.1f} points better, because the model recognises each farm\u2019s soil colour and leaf size: an over-optimistic score."],
                      [f"ፈጽሞ ባላዩአቸው እርሻዎች ላይ ሞዴሎቹ ከ{min(v[0] for v in ns['res'].values()):.1%} እስከ {max(v[0] for v in ns['res'].values()):.1%} accuracy ይደርሳሉ።", f"Blight በብዛት የሚያመልጠው ክፍል ነው፤ ምርጡ የblight recall {ns['res'][ns['best']][1][2]:.0%} ነው ({ns['best']})።", f"የዘፈቀደ ክፍፍል እስከ {100 * max(v[2] - v[0] for v in ns['res'].values()):.1f} ነጥቦች የተሻለ ይመስላል፣ ሞዴሉ የእያንዳንዱን እርሻ የአፈር ቀለምና የቅጠል መጠን ስለሚያውቅ፡ ከልክ በላይ ተስፈኛ ውጤት።"]),
 decision=lambda ns: (f"Deploy {ns['best']} because it misses the fewest blight cases (the costliest error); add an “unsure, ask an expert” result when the top probability is below 0.7, collect more blight images, and report only the by-farm score.", f"{ns['best']}ን አሰማራ፣ ጥቂቱን የblight ጉዳዮች ስለሚያመልጥ (በጣም ውዱ ስህተት)፤ ከፍተኛው ፕሮባቢሊቲ ከ0.7 በታች ሲሆን «እርግጠኛ አይደለሁም፣ ባለሙያ ጠይቅ» ውጤት ጨምር፣ ተጨማሪ የblight ምስሎችንም ሰብስብ።"), note=SIM))
emit_labs('c', 4, C4, 4)

# ============================ Level 5 Professional ============================
C5 = []
C5.append(lab(('Refactor with tests and measure complexity', 'በፈተናዎች አሻሽልና ውስብስብነትን ለካ'),
 ('Refactor a tangled invoice function, prove behaviour is unchanged with tests, and measure the drop in cyclomatic complexity.', 'የተጠላለፈ የደረሰኝ functionን አሻሽል፣ ባሕሪው እንዳልተለወጠ በፈተናዎች አረጋግጥ፣ የcyclomatic complexity ቅነሳን ለካ።'), W,
 [PY, T('pytest', 'automatic tests', 'አውቶማቲክ ፈተናዎች', 'pip install pytest'), GIT],
 (['Write characterisation tests that pin down what the old function does today.', 'Refactor into small functions with clear names.', 'Run the tests after every small change.', 'Measure cyclomatic complexity (number of decision points + 1) per function with Python’s ast module.', 'Open a pull request with before/after numbers.'],
  ['የድሮው function ዛሬ የሚያደርገውን የሚያረጋግጡ characterisation tests ጻፍ።', 'ግልጽ ስሞች ወዳሏቸው ትናንሽ functions አሻሽለው።', 'ከእያንዳንዱ ትንሽ ለውጥ በኋላ ፈተናዎቹን አስኪድ።', 'በPython ast module የእያንዳንዱን function cyclomatic complexity (የውሳኔ ነጥቦች ብዛት + 1) ለካ።', 'ከበፊት/በኋላ ቁጥሮች ጋር pull request ክፈት።']),
 '''
import ast, textwrap
OLD = """
def invoice(lines, member, coupon):
    t = 0
    for l in lines:
        if l[1] > 0:
            if l[0] == "fertilizer" and member:
                t += l[1] * l[2] * 0.9
            elif l[0] == "seed" and member and l[1] >= 10:
                t += l[1] * l[2] * 0.85
            else:
                t += l[1] * l[2]
    if coupon and t > 1000:
        t -= 100
    elif coupon:
        t -= 20
    return round(t * 1.15, 2)
"""
NEW = """
DISCOUNTS = {"fertilizer": (0, 0.10), "seed": (10, 0.15)}   # item: (minimum quantity, member discount)
def line_price(item, qty, price, member):
    min_qty, rate = DISCOUNTS.get(item, (0, 0.0))
    discount = rate if member and qty >= min_qty else 0.0
    return qty * price * (1 - discount)
def coupon_value(subtotal, coupon):
    if not coupon:
        return 0
    return 100 if subtotal > 1000 else 20
def invoice(lines, member, coupon):
    subtotal = sum(line_price(i, q, p, member) for i, q, p in lines if q > 0)
    return round((subtotal - coupon_value(subtotal, coupon)) * 1.15, 2)
"""
def complexity(src):
    out = {}
    for fn in [n for n in ast.walk(ast.parse(src)) if isinstance(n, ast.FunctionDef)]:
        points = sum(isinstance(n, (ast.If, ast.For, ast.While, ast.IfExp, ast.comprehension)) for n in ast.walk(fn))
        points += sum(len(n.values) - 1 for n in ast.walk(fn) if isinstance(n, ast.BoolOp))
        out[fn.name] = points + 1
    return out
old_ns, new_ns = {}, {}; exec(OLD, old_ns); exec(NEW, new_ns)
cases = [([("fertilizer", 4, 300.0), ("salt", 2, 30.0)], True, False), ([("seed", 12, 90.0)], True, True), ([("seed", 5, 90.0), ("oil", -1, 200.0)], False, True), ([], False, False)]
for c in cases: assert old_ns["invoice"](*c) == new_ns["invoice"](*c), c     # behaviour unchanged
cx_old, cx_new = complexity(OLD), complexity(NEW)
print("tests passed:", len(cases)); print("complexity before:", cx_old); print("complexity after: ", cx_new)
''',
 viz=lambda ns: [hbar(B('Cyclomatic complexity per function', 'Cyclomatic complexity በfunction'), [B('invoice (before)', 'invoice (በፊት)')] + [B(f'{k} (after)', f'{k} (በኋላ)') for k in ns['cx_new']], [(B('Complexity', 'ውስብስብነት'), [ns['cx_old']['invoice']] + list(ns['cx_new'].values()), 1)], B('Decision points + 1', 'የውሳኔ ነጥቦች + 1'), fmt=0)],
 analysis=lambda ns: ([f"The old function had complexity {ns['cx_old']['invoice']}: many paths to test and to break.", f"After refactoring no function is above {max(ns['cx_new'].values())}; discounts are data, not nested ifs.", f"All {len(ns['cases'])} characterisation tests pass, so customers are charged exactly as before."],
                      [f"የድሮው function {ns['cx_old']['invoice']} ውስብስብነት ነበረው፡ ለመፈተሽና ለመስበር ብዙ መንገዶች።", f"ከማሻሻያው በኋላ ምንም function ከ{max(ns['cx_new'].values())} በላይ አይደለም፤ ቅናሾች ዳታ ናቸው እንጂ የተደራረቡ ifs አይደሉም።", f"ሁሉም {len(ns['cases'])} characterisation tests ያልፋሉ፤ ስለዚህ ደንበኞች በትክክል እንደበፊቱ ይከፍላሉ።"]),
 decision=lambda ns: ('Merge the refactor; add a CI rule that flags functions with complexity above 10, and add a new discount by editing the DISCOUNTS table, not the code.', 'ማሻሻያውን አዋህድ፤ ውስብስብነታቸው ከ10 በላይ የሆኑ functionsን ምልክት የሚያደርግ የCI ሕግ ጨምር፣ አዲስ ቅናሽን ኮዱን ሳይሆን የDISCOUNTS ሰንጠረዥን በማስተካከል ጨምር።')))
C5.append(lab(('Hosting an API: which option costs least?', 'APIን ማስተናገድ፡ የትኛው አማራጭ ርካሽ ነው?'),
 ('Model monthly cost of a small VPS, serverless functions and a managed container service as traffic grows, and choose a hosting plan with a budget alert.', 'ትራፊክ ሲያድግ የትንሽ VPS፣ የserverless functions እና የmanaged container አገልግሎትን ወርሃዊ ወጪ ሞዴል አድርግ፣ ከበጀት ማንቂያ ጋር የማስተናገጃ ዕቅድ ምረጥ።'), W,
 [PY, T('Your cloud provider’s price calculator', 'real prices for your region', 'ለክልልህ እውነተኛ ዋጋዎች', 'provider websites'), T('Docker', 'package the API once, run it anywhere', 'APIውን አንድ ጊዜ አሽገህ በየትኛውም ቦታ አስኪደው', 'docker.com'), MPL],
 (['Estimate traffic: requests per month now and in 12 months.', 'Write a cost function for each option (fixed + per-request + data transfer).', 'Evaluate from 0.1 to 50 million requests per month.', 'Find where the cheapest option changes.', 'Add a budget alert at 80% of the monthly budget.'],
  ['ትራፊክን ገምት፡ በወር ጥያቄዎች አሁንና በ12 ወራት ውስጥ።', 'ለእያንዳንዱ አማራጭ የወጪ function ጻፍ (ቋሚ + በጥያቄ + የዳታ ዝውውር)።', 'በወር ከ0.1 እስከ 50 ሚሊዮን ጥያቄዎች ገምግም።', 'በጣም ርካሹ አማራጭ የሚቀየርበትን ቦታ ፈልግ።', 'በወርሃዊ በጀቱ 80% ላይ የበጀት ማንቂያ ጨምር።']),
 '''
import numpy as np
millions = np.array([0.1, 0.5, 1, 2, 5, 10, 20, 50])
def vps(m):        return 12 + 0 * m + (24 if m > 20 else 0)            # USD: one small server, a second above 20 M
def serverless(m): return np.maximum(0, m - 1) * 0.20 + m * 1.6 + 0.0  # first 1 M free, then per-request + compute
def container(m):  return 25 + m * 0.35                                # managed service base + usage
cost = {"VPS": [vps(m) for m in millions], "Serverless": list(serverless(millions)), "Managed container": list(container(millions))}
for i, m in enumerate(millions):
    cheapest = min(cost, key=lambda k: cost[k][i])
    print(f"{m:5.1f} M req/month: " + ", ".join(f"{k} {v[i]:6.1f}" for k, v in cost.items()) + f" -> {cheapest}")
grid = np.linspace(0.1, 50, 5000); cross = float(grid[np.argmax(serverless(grid) > np.array([vps(m) for m in grid]))])
cross_c = float(grid[np.argmax(serverless(grid) > container(grid))])
print(f"serverless stops being cheapest at about {cross:.1f} M requests/month; it passes the managed container at {cross_c:.1f} M")
''',
 viz=lambda ns: [line(B('Monthly cost by traffic (USD, illustrative prices)', 'ወርሃዊ ወጪ በትራፊክ (USD፣ ለማሳያ ዋጋዎች)'), list(ns['millions']), [(B(k, k), v, i + 1) for i, (k, v) in enumerate(ns['cost'].items())], B('Million requests per month', 'በወር ሚሊዮን ጥያቄዎች'), 'USD', xint=False, ymin=0, rpad=120)],
 analysis=lambda ns: (['Below about 1 million requests serverless is almost free, but its cost grows fastest with traffic.', f"A small VPS has a flat cost and becomes the cheapest above about {ns['cross']:.1f} million requests a month, but someone must patch and monitor it.", f"The managed container is the most expensive at low traffic, beats serverless above about {ns['cross_c']:.0f} million, and needs no server maintenance."],
                      ['ከ1 ሚሊዮን ጥያቄዎች በታች serverless ከሞላ ጎደል ነጻ ነው፤ ግን ወጪው ከትራፊክ ጋር በፍጥነት ያድጋል።', f"ትንሽ VPS ቋሚ ወጪ አለው፣ በወር ከ{ns['cross']:.1f} ሚሊዮን ጥያቄዎች ገደማ በላይም በጣም ርካሹ ይሆናል፤ ግን አንድ ሰው patch ማድረግና መከታተል አለበት።", f"managed containerኡ በዝቅተኛ ትራፊክ በጣም ውዱ ነው፣ ከ{ns['cross_c']:.0f} ሚሊዮን ገደማ በላይ serverlessን ያሸንፋል፣ የሰርቨር ጥገናም አያስፈልገውም።"]),
 decision=lambda ns: (f"Start serverless at today\u2019s 0.8 M requests; package the API in Docker from day one so you can move to a VPS (or a managed container if nobody can maintain a server) when traffic passes about {ns['cross']:.0f} M requests a month. Set a budget alert at 80%.", f"በዛሬው 0.8 M ጥያቄዎች በserverless ጀምር፤ ትራፊኩ በወር ወደ {ns['cross']:.0f} M ጥያቄዎች ገደማ ሲያልፍ ወደ VPS (ሰርቨርን የሚጠግን ሰው ከሌለ ወደ managed container) እንድትሸጋገር APIውን ከመጀመሪያው ቀን ጀምሮ በDocker አሽገው። በ80% የበጀት ማንቂያ አዘጋጅ።"),
 note=('Prices are illustrative; take real numbers from your provider’s calculator for your region before deciding.', 'ዋጋዎቹ ለማሳያ ናቸው፤ ከመወሰንህ በፊት ለክልልህ እውነተኛ ቁጥሮችን ከአቅራቢህ ማስሊያ ውሰድ።')))
C5.append(lab(('ETL pipeline with a data-quality report', 'ከዳታ-ጥራት ሪፖርት ጋር የETL pipeline'),
 ('Build a pipeline for 5,000 messy SMS price reports with validation checks, a quality report and clean output, and decide what to fix at the source.', 'ለ5,000 የተዘበራረቁ የSMS የዋጋ ሪፖርቶች ከማረጋገጫ ፍተሻዎች፣ ከጥራት ሪፖርትና ከንጹሕ ውጤት ጋር pipeline ገንባ፣ ከምንጩ ምን እንደሚስተካከል ወስን።'), W,
 [PY, PD, T('Parquet (pyarrow)', 'compact, typed output files', 'የታመቁ፣ ዓይነት ያላቸው የውጤት ፋይሎች', 'pip install pyarrow'), MPL],
 (['Extract: read the raw CSV.', 'Validate: duplicates, missing price, wrong unit, impossible price, unknown market.', 'Transform: fix what can be fixed (units, names), quarantine the rest with a reason.', 'Load: write clean data (Parquet or CSV) and a quality report.', 'Rank problems by count and trace them to their source.'],
  ['Extract፡ ጥሬውን CSV አንብብ።', 'አረጋግጥ፡ ድግግሞሾች፣ የጎደለ ዋጋ፣ የተሳሳተ መለኪያ፣ የማይቻል ዋጋ፣ ያልታወቀ ገበያ።', 'Transform፡ ሊስተካከል የሚችለውን አስተካክል (መለኪያዎች፣ ስሞች)፣ ቀሪውን ከምክንያት ጋር ለይ።', 'Load፡ ንጹሕ ዳታን (Parquet ወይም CSV) እና የጥራት ሪፖርትን ጻፍ።', 'ችግሮችን በብዛት ደርድርና ወደ ምንጫቸው ተከታተላቸው።']),
 '''
import numpy as np, pandas as pd
rng = np.random.default_rng(2); n = 5000
markets = ["Bahir Dar", "Gondar", "Dessie", "Debre Markos", "Woldia"]
raw = pd.DataFrame({"report_id": np.arange(n), "sender": rng.integers(1, 120, n),
                    "market": rng.choice(markets + ["bahir dar ", "Gonder", "XYZ"], n, p=[.17, .17, .17, .17, .17, .06, .06, .03]),
                    "unit": rng.choice(["kg", "100g", "quintal"], n, p=[.9, .06, .04])})
per_kg = rng.normal(118, 8, n); scale = raw.unit.map({"kg": 1, "100g": 0.1, "quintal": 100})
raw["price"] = (per_kg * scale).round(1).astype(str)                          # senders report in their own unit
raw.loc[rng.choice(n, 150, replace=False), "price"] = ""
raw.loc[rng.choice(n, 40, replace=False), "price"] = "9999"
raw = pd.concat([raw, raw.sample(120, random_state=1)])                       # duplicates
issues = {}
df = raw.drop_duplicates("report_id"); issues["duplicate"] = len(raw) - len(df)
df = df.assign(market=df.market.str.strip().str.title().replace({"Gonder": "Gondar"}))
df["price"] = pd.to_numeric(df.price, errors="coerce")
df.loc[df.unit == "100g", "price"] *= 10; df.loc[df.unit == "quintal", "price"] /= 100
issues["unit converted"] = int((df.unit != "kg").sum())
bad = pd.Series("", index=df.index)
bad[df.price.isna()] = "missing price"; bad[(bad == "") & ~df.price.between(20, 400)] = "impossible price"
bad[(bad == "") & ~df.market.isin(markets)] = "unknown market"
for reason in ["missing price", "impossible price", "unknown market"]: issues[reason] = int((bad == reason).sum())
clean, quarantine = df[bad == ""], df[bad != ""].assign(reason=bad[bad != ""])
print(f"raw {len(raw)} -> clean {len(clean)}, quarantined {len(quarantine)}"); print(issues)
top_senders = quarantine.groupby("sender").size().sort_values(ascending=False).head(3)
print("senders with most rejected reports:", top_senders.to_dict())
''',
 viz=lambda ns: [hbar(B('Data-quality issues found', 'የተገኙ የዳታ-ጥራት ችግሮች'), list(ns['issues']), [(B('Rows', 'ረድፎች'), list(ns['issues'].values()), 1)], B('Rows', 'ረድፎች'), fmt=0),
                 seg(B('What happened to the raw rows', 'በጥሬዎቹ ረድፎች ላይ የሆነው'), [(B('Clean', 'ንጹሕ'), len(ns['clean']), 1), (B('Quarantined', 'የተለዩ'), len(ns['quarantine']), 2), (B('Duplicates removed', 'የተወገዱ ድግግሞሾች'), ns['issues']['duplicate'], 0)], 'rows')],
 analysis=lambda ns: ([f"{len(ns['clean']):,} of {len(ns['raw']):,} rows are usable; {len(ns['quarantine'])} are quarantined with a reason, none silently dropped.", "The biggest problems: " + ", ".join(f"{k} ({v})" for k, v in sorted(ns['issues'].items(), key=lambda kv: -kv[1])[:3] if k != 'unit converted') + ".", f"{ns['issues']['unit converted']} reports used 100 g or quintal units and were converted, not lost."],
                      [f"ከ{len(ns['raw']):,} ረድፎች {len(ns['clean']):,} ጥቅም ላይ የሚውሉ ናቸው፤ {len(ns['quarantine'])} ከምክንያት ጋር ተለይተዋል፣ አንዳቸውም በዝምታ አልተጣሉም።", "ትልቁ ችግሮች፡ " + "፣ ".join(f"{k} ({v})" for k, v in sorted(ns['issues'].items(), key=lambda kv: -kv[1])[:3] if k != 'unit converted') + "።", f"{ns['issues']['unit converted']} ሪፖርቶች የ100 g ወይም የኩንታል መለኪያዎችን ተጠቅመው ተቀይረዋል እንጂ አልጠፉም።"]),
 decision=lambda ns: ('Fix at the source: make the SMS form reject empty prices, use market codes instead of typed names, and send a receipt with the report ID (stops resends); retrain the top senders; keep the quarantine table and review it weekly.', 'ከምንጩ አስተካክል፡ የSMS ቅጹ ባዶ ዋጋዎችን እንዲከለክል፣ በተተየቡ ስሞች ፋንታ የገበያ ኮዶችን እንዲጠቀምና ከሪፖርቱ ID ጋር ደረሰኝ እንዲልክ አድርግ (እንደገና መላክን ያቆማል)፤ ዋናዎቹን ላኪዎች እንደገና አሰልጥን፤ የተለየውን ሰንጠረዥ አቆይና በየሳምንቱ ገምግመው።'), note=SIM))
C5.append(lab(('A/B test: do SMS reminders raise vaccination?', 'A/B ፈተና፡ የSMS ማስታወሻዎች ክትባትን ያሳድጋሉ?'),
 ('Plan the sample size, run a randomised SMS-reminder test for livestock vaccination, analyse the difference with a confidence interval, and decide on rollout.', 'የናሙና መጠኑን አቅድ፣ ለእንስሳት ክትባት በዘፈቀደ የተመደበ የSMS-ማስታወሻ ፈተና አካሂድ፣ ልዩነቱን ከconfidence interval ጋር ተንትን፣ ስለ ማስፋፋት ወስን።'), W,
 [PY, SP, NP, MPL],
 (['Choose the smallest effect worth acting on (here +5 points from a 40% baseline).', 'Compute the sample size for 80% power at α = 0.05.', 'Randomise households to reminder or no reminder.', 'After 4 weeks, count vaccinated herds in each group.', 'Report the difference, its 95% CI and the cost per extra vaccination.'],
  ['ለመሥራት የሚያዋጣውን ትንሹን ውጤት ምረጥ (እዚህ ከ40% መነሻ +5 ነጥቦች)።', 'ለ80% power በα = 0.05 የናሙና መጠኑን አስላ።', 'ቤተሰቦችን ወደ ማስታወሻ ወይም ያለ ማስታወሻ በዘፈቀደ መድብ።', 'ከ4 ሳምንታት በኋላ በእያንዳንዱ ቡድን የተከተቡ መንጋዎችን ቁጠር።', 'ልዩነቱን፣ 95% CIውን እና በአንድ ተጨማሪ ክትባት ወጪውን ዘግብ።']),
 '''
import numpy as np
from scipy import stats
p0, lift, alpha, power = 0.40, 0.05, 0.05, 0.80
z = stats.norm.ppf(1 - alpha / 2) + stats.norm.ppf(power)
n_per_group = int(np.ceil(z ** 2 * (p0 * (1 - p0) + (p0 + lift) * (1 - p0 - lift)) / lift ** 2))
print("households needed per group:", n_per_group)
rng = np.random.default_rng(8)
control = rng.random(n_per_group) < 0.40; sms = rng.random(n_per_group) < 0.465       # results after 4 weeks
pa, pb = control.mean(), sms.mean(); diff = pb - pa
se = np.sqrt(pa * (1 - pa) / n_per_group + pb * (1 - pb) / n_per_group); lo, hi = diff - 1.96 * se, diff + 1.96 * se
pval = 2 * stats.norm.sf(abs(diff / np.sqrt((pa + pb) / 2 * (1 - (pa + pb) / 2) * 2 / n_per_group)))
cost_sms = 3 * 0.5                                                                   # 3 SMS at 0.5 birr
print(f"control {pa:.1%}, SMS {pb:.1%}, difference {diff:+.1%} (95% CI {lo:+.1%} to {hi:+.1%}), p = {pval:.4f}")
print(f"cost per extra vaccinated herd: {cost_sms / diff:.1f} birr")
''',
 viz=lambda ns: [dots(B('Vaccination rate with 95% intervals', 'የክትባት መጠን ከ95% ክልሎች ጋር'), [B('No reminder', 'ማስታወሻ የለም'), B('SMS reminder', 'የSMS ማስታወሻ')],
                      [100 * ns['pa'], 100 * ns['pb']], [100 * (ns['pa'] - 1.96 * np.sqrt(ns['pa'] * (1 - ns['pa']) / ns['n_per_group'])), 100 * (ns['pb'] - 1.96 * np.sqrt(ns['pb'] * (1 - ns['pb']) / ns['n_per_group']))],
                      [100 * (ns['pa'] + 1.96 * np.sqrt(ns['pa'] * (1 - ns['pa']) / ns['n_per_group'])), 100 * (ns['pb'] + 1.96 * np.sqrt(ns['pb'] * (1 - ns['pb']) / ns['n_per_group']))], B('Percent of herds vaccinated', 'የተከተቡ መንጋዎች መቶኛ'), ref0=False)],
 analysis=lambda ns: ([f"{ns['n_per_group']:,} households per group were needed to detect a 5-point lift reliably.", f"Reminders raised vaccination by {ns['diff']:+.1%} (95% CI {ns['lo']:+.1%} to {ns['hi']:+.1%}).", f"Each extra vaccinated herd cost about {1.5 / ns['diff']:.0f} birr in SMS."],
                      [f"የ5-ነጥብ ጭማሪን በአስተማማኝ ሁኔታ ለመለየት በቡድን {ns['n_per_group']:,} ቤተሰቦች አስፈልገዋል።", f"ማስታወሻዎች ክትባትን በ{ns['diff']:+.1%} አሳድገዋል (95% CI {ns['lo']:+.1%} እስከ {ns['hi']:+.1%})።", f"እያንዳንዱ ተጨማሪ የተከተበ መንጋ በSMS ወደ {1.5 / ns['diff']:.0f} ብር ገደማ አስወጥቷል።"]),
 decision=lambda ns: ('Roll out the reminders: the whole interval is above zero and the cost per extra herd is far below the value of preventing an outbreak. Keep 5% of households as a control to keep measuring.', 'ማስታወሻዎቹን አስፋፋ፡ ሙሉው ክልል ከዜሮ በላይ ነው፣ በአንድ ተጨማሪ መንጋ ያለው ወጪም ወረርሽኝን ከመከላከል ዋጋ በጣም ያነሰ ነው። መለካቱን ለመቀጠል 5% ቤተሰቦችን እንደ control አቆይ።'), note=SIM))
C5.append(lab(('Image classifier with augmentation and quantisation', 'ከaugmentation እና quantisation ጋር የምስል classifier'),
 ('Train a small neural network on 8×8 digit images (a stand-in for leaf photos), measure how training size and augmentation change accuracy, then quantise it for a phone.', 'በ8×8 የአሃዝ ምስሎች (ለቅጠል ፎቶዎች ምትክ) ላይ ትንሽ neural network አሰልጥን፣ የሥልጠና መጠንና augmentation accuracyን እንዴት እንደሚቀይሩ ለካ፣ ከዚያ ለስልክ quantise አድርገው።'), W,
 [PY, SK, NP, MPL, T('PyTorch or TensorFlow Lite (next step)', 'real CNNs and phone export', 'እውነተኛ CNNs እና ወደ ስልክ መላክ', 'pytorch.org, tensorflow.org')],
 (['Load the digits dataset (1,797 images) and hold out 30% as a test set; make a \u201cfield\u201d copy of the test set with every image framed one pixel off.', 'Train an MLP with 50, 100, 200 and 400 training images; test on both copies.', 'Augment: add copies shifted one pixel left/right/up/down and retrain.', 'Quantise the trained weights to 8-bit integers and re-test.', 'Plot accuracy against training size with and without augmentation.'],
  ['የdigits ዳታሴትን (1,797 ምስሎች) ጫንና 30%ን እንደ የፈተና ስብስብ ለይ፤ እያንዳንዱ ምስል አንድ pixel ተዛብቶ የተቀረጸበት የፈተና ስብስቡን «የመስክ» ቅጂ ሥራ።', 'MLPን በ50፣ 100፣ 200 እና 400 የሥልጠና ምስሎች አሰልጥን፤ በሁለቱም ቅጂዎች ፈትሽ።', 'Augment፡ ወደ ግራ/ቀኝ/ላይ/ታች አንድ pixel የተዛወሩ ቅጂዎችን ጨምርና እንደገና አሰልጥን።', 'የሰለጠኑትን weights ወደ 8-bit integers quantise አድርግና እንደገና ፈትሽ።', 'accuracyን ከሥልጠና መጠን አንፃር ከaugmentation ጋርና ያለ augmentation ቻርት አድርግ።']),
 '''
import numpy as np
from sklearn.datasets import load_digits
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
X, y = load_digits(return_X_y=True); X = X / 16
Xtr_all, Xte, ytr_all, yte = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)
def shift(imgs, dx, dy):
    im = imgs.reshape(-1, 8, 8); out = np.zeros_like(im)
    out[:, max(dy, 0):8 + min(dy, 0), max(dx, 0):8 + min(dx, 0)] = im[:, max(-dy, 0):8 + min(-dy, 0), max(-dx, 0):8 + min(-dx, 0)]
    return out.reshape(-1, 64)
moves = [(1, 0), (-1, 0), (0, 1), (0, -1)]; pick = np.random.default_rng(1).integers(0, 4, len(Xte))
Xfield = np.vstack([shift(Xte[i:i + 1], *moves[pick[i]]) for i in range(len(Xte))])   # "field photos": framed 1 pixel off
sizes, neat, plain, aug = [50, 100, 200, 400], [], [], []
for n in sizes:
    Xs, ys = Xtr_all[:n], ytr_all[:n]
    m0 = MLPClassifier((64,), max_iter=3000, random_state=0).fit(Xs, ys); neat.append(m0.score(Xte, yte)); plain.append(m0.score(Xfield, yte))
    Xa = np.vstack([Xs] + [shift(Xs, dx, dy) for dx, dy in moves]); ya = np.tile(ys, 5)
    aug.append(MLPClassifier((64,), max_iter=3000, random_state=0).fit(Xa, ya).score(Xfield, yte))
for n, a, b, c in zip(sizes, neat, plain, aug): print(f"{n:3d} images: plain on neat test {a:.3f}, plain on field test {b:.3f}, augmented on field test {c:.3f}")
m = MLPClassifier((64,), max_iter=3000, random_state=0).fit(Xtr_all, ytr_all); full = m.score(Xte, yte)
for i, W in enumerate(m.coefs_):
    s = np.abs(W).max() / 127; m.coefs_[i] = np.round(W / s).astype(np.int8).astype(float) * s
quant = m.score(Xte, yte)
print(f"all {len(Xtr_all)} images: float32 {full:.3f} -> int8 {quant:.3f}; weights 4x smaller")
''',
 viz=lambda ns: [line(B('Test accuracy vs training images', 'የፈተና accuracy vs የሥልጠና ምስሎች'), ns['sizes'], [(B('Plain, neat test photos', 'ተራ፣ ንጹሕ የፈተና ፎቶዎች'), ns['neat'], 0), (B('Plain, field photos', 'ተራ፣ የመስክ ፎቶዎች'), ns['plain'], 2), (B('Augmented, field photos', 'Augmented፣ የመስክ ፎቶዎች'), ns['aug'], 1)], B('Training images', 'የሥልጠና ምስሎች'), B('Accuracy', 'Accuracy'), ymin=0, ymax=1, rpad=150)],
 analysis=lambda ns: ([f"A model trained on neat images scores {ns['neat'][-1]:.1%} on neat test images but only {ns['plain'][-1]:.1%} when the same images are framed one pixel off.", f"Shift augmentation raises field accuracy to {ns['aug'][-1]:.1%} with 400 images (from {ns['plain'][0]:.1%} to {ns['aug'][0]:.1%} with only 50).", f"Using all {len(ns['Xtr_all'])} images gives {ns['full']:.1%} on neat test photos.", f"8-bit weights give {ns['quant']:.1%}: almost no loss for a 4× smaller model."],
                      [f"በንጹሕ ምስሎች የሰለጠነ ሞዴል በንጹሕ የፈተና ምስሎች {ns['neat'][-1]:.1%} ያገኛል፤ ያው ምስሎች አንድ pixel ተዛብተው ሲቀረጹ ግን {ns['plain'][-1]:.1%} ብቻ።", f"Shift augmentation የመስክ accuracyን በ400 ምስሎች ወደ {ns['aug'][-1]:.1%} ያሳድጋል (በ50 ብቻ ከ{ns['plain'][0]:.1%} ወደ {ns['aug'][0]:.1%})።", f"ሁሉንም {len(ns['Xtr_all'])} ምስሎች መጠቀም በንጹሕ የፈተና ፎቶዎች {ns['full']:.1%} ይሰጣል።", f"የ8-bit weights {ns['quant']:.1%} ይሰጣሉ፡ ለ4× ያነሰ ሞዴል ከሞላ ጎደል ምንም ኪሳራ የለም።"]),
 decision=lambda ns: ('Test on photos taken the way farmers will take them, not on neat lab photos; augment with the variation you expect in the field (position, angle, light), and ship the int8 model to phones.', 'በንጹሕ የላብራቶሪ ፎቶዎች ሳይሆን ገበሬዎች በሚያነሱበት መንገድ በተነሱ ፎቶዎች ፈትሽ፤ በመስክ በምትጠብቀው ልዩነት (ቦታ፣ ማዕዘን፣ ብርሃን) augment አድርግ፣ የint8 ሞዴሉንም ወደ ስልኮች ላክ።')))
C5.append(lab(('Monitoring a deployed model for drift', 'የተሰማራ ሞዴልን ለdrift መከታተል'),
 ('Track 12 weeks of a yield-advice model in production with input drift (PSI) and accuracy, find when it broke, and set alert and retraining rules.', 'በምርት ላይ ያለ የምርት-ምክር ሞዴልን ለ12 ሳምንታት በinput drift (PSI) እና በaccuracy ተከታተል፣ መቼ እንደተበላሸ ፈልግ፣ የማንቂያና የእንደገና ማሰልጠኛ ሕጎችን አዘጋጅ።'), W,
 [PY, NP, SK, T('MLflow (optional)', 'track model versions and metrics', 'የሞዴል ስሪቶችንና metricsን መከታተል', 'pip install mlflow'), MPL],
 (['Train the model on last season’s data and save the training feature distribution.', 'Each week, compute PSI for rainfall against training.', 'When labels arrive, compute weekly error.', 'Plot both; mark the alert thresholds (PSI 0.2, error +30%).', 'Retrain with recent data and compare.'],
  ['ሞዴሉን በባለፈው ወቅት ዳታ አሰልጥንና የሥልጠና feature ስርጭቱን አስቀምጥ።', 'በየሳምንቱ ለዝናብ ከሥልጠናው አንፃር PSI አስላ።', 'labels ሲደርሱ ሳምንታዊ ስህተትን አስላ።', 'ሁለቱንም ቻርት አድርግ፤ የማንቂያ ወሰኖችን ምልክት አድርግ (PSI 0.2፣ ስህተት +30%)።', 'በቅርብ ዳታ እንደገና አሰልጥንና አወዳድር።']),
 '''
import numpy as np
from sklearn.linear_model import LinearRegression
rng = np.random.default_rng(6)
def season(n, rain_mean, effect=0.004):
    rain = rng.normal(rain_mean, 90, n); fert = rng.uniform(0, 100, n)
    y = 0.8 + effect * rain + 0.01 * fert - 0.0000025 * (rain - 800) ** 2 + rng.normal(0, 0.2, n)
    return np.column_stack([rain, fert]), y
Xtr, ytr = season(2000, 780); model = LinearRegression().fit(Xtr, ytr)
edges = np.quantile(Xtr[:, 0], np.linspace(0, 1, 11)); edges[0], edges[-1] = -1e9, 1e9
base = np.histogram(Xtr[:, 0], edges)[0] / len(Xtr)
def psi(x):
    cur = np.clip(np.histogram(x, edges)[0] / len(x), 1e-4, None)
    return float(np.sum((cur - base) * np.log(cur / np.clip(base, 1e-4, None))))
weeks = list(range(1, 13)); psis, errs = [], []
for wk in weeks:
    mean = 780 if wk < 8 else 520                      # drought begins in week 8
    Xw, yw = season(150, mean)
    psis.append(psi(Xw[:, 0])); errs.append(float(np.mean(np.abs(model.predict(Xw) - yw))))
base_err = np.mean(errs[:4]); alert = next(w for w, p, e in zip(weeks, psis, errs) if p > 0.2 or e > 1.3 * base_err)
Xn, yn = season(600, 520); retrained = LinearRegression().fit(np.vstack([Xtr[:600], Xn]), np.r_[ytr[:600], yn])
Xt, yt = season(300, 520)
print(f"baseline error {base_err:.3f}; first alert in week {alert}")
print(f"week 12: old model error {np.mean(np.abs(model.predict(Xt) - yt)):.3f}, retrained {np.mean(np.abs(retrained.predict(Xt) - yt)):.3f}")
old_e, new_e = np.mean(np.abs(model.predict(Xt) - yt)), np.mean(np.abs(retrained.predict(Xt) - yt))
''',
 viz=lambda ns: [line(B('Input drift (PSI for rainfall)', 'የinput drift (ለዝናብ PSI)'), ns['weeks'], [('PSI', ns['psis'], 1)], B('Week', 'ሳምንት'), 'PSI', refs=[{'kind': 'h', 'v': 0.2, 'label': B('alert 0.2', 'ማንቂያ 0.2')}], ymin=0),
                 line(B('Model error (t/ha)', 'የሞዴል ስህተት (t/ha)'), ns['weeks'], [(B('Mean absolute error', 'Mean absolute error'), ns['errs'], 2)], B('Week', 'ሳምንት'), 't/ha', refs=[{'kind': 'h', 'v': float(1.3 * ns['base_err']), 'label': B('alert +30%', 'ማንቂያ +30%')}], ymin=0)],
 analysis=lambda ns: ([f"PSI stays near 0 until the drought, then jumps above 0.2 in week {ns['alert']}.", 'Error rises in the same week: the model never saw such dry conditions.', f"Retraining with drought data cuts error from {ns['old_e']:.2f} to {ns['new_e']:.2f} t/ha."],
                      [f"PSI እስከ ድርቁ ድረስ በ0 አቅራቢያ ይቆያል፣ ከዚያ በሳምንት {ns['alert']} ከ0.2 በላይ ይዘላል።", 'ስህተቱ በተመሳሳይ ሳምንት ይጨምራል፡ ሞዴሉ እንዲህ ያሉ ደረቅ ሁኔታዎችን አይቶ አያውቅም።', f"በድርቅ ዳታ እንደገና ማሰልጠን ስህተትን ከ{ns['old_e']:.2f} ወደ {ns['new_e']:.2f} t/ha ይቀንሳል።"]),
 decision=lambda ns: ('Alert when PSI > 0.2 (labels are slow; drift is fast); then pause automatic advice, show a "conditions unusual" message, and retrain with recent data after human review.', 'PSI > 0.2 ሲሆን አስጠንቅቅ (labels ቀርፋፋ ናቸው፤ drift ፈጣን ነው)፤ ከዚያ አውቶማቲክ ምክርን አቁም፣ «ሁኔታዎች ያልተለመዱ ናቸው» መልእክት አሳይ፣ ከሰው ግምገማ በኋላ በቅርብ ዳታ እንደገና አሰልጥን።'), note=SIM))
C5.append(lab(('Evaluating a retrieval assistant for extension advice', 'ለኤክስቴንሽን ምክር የretrieval ረዳትን መገምገም'),
 ('Build an evaluation set of 12 farmer questions, compare two retrieval methods by recall@1 and recall@3, and decide which to put behind the assistant.', 'የ12 የገበሬ ጥያቄዎች የግምገማ ስብስብ ገንባ፣ ሁለት የretrieval ዘዴዎችን በrecall@1 እና recall@3 አወዳድር፣ ከረዳቱ ጀርባ የትኛውን እንደምታስቀምጥ ወስን።'), W,
 [PY, SK, T('An LLM API (next step)', 'writes the answer from retrieved passages', 'ከተገኙ ክፍሎች መልሱን ይጽፋል', 'any provider; keep keys in environment variables'), MPL],
 (['Split extension guides into short passages with source names.', 'Write 12 real questions and mark the passage that answers each.', 'Method A: word matching (TF-IDF). Method B: TF-IDF on 3–5 letter pieces (handles spelling variants).', 'Compute recall@1 and recall@3 for each method.', 'Read the failures and decide.'],
  ['የኤክስቴንሽን መመሪያዎችን ከምንጭ ስሞች ጋር ወደ አጫጭር ክፍሎች ክፈል።', '12 እውነተኛ ጥያቄዎችን ጻፍና እያንዳንዱን የሚመልሰውን ክፍል ምልክት አድርግ።', 'ዘዴ A፡ የቃላት ማዛመድ (TF-IDF)። ዘዴ B፡ TF-IDF በ3–5 ፊደላት ቁርጥራጮች ላይ (የፊደል ልዩነቶችን ይይዛል)።', 'ለእያንዳንዱ ዘዴ recall@1 እና recall@3 አስላ።', 'ውድቀቶቹን አንብብና ወስን።']),
 '''
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
docs = ["Plant teff when the main rains start, usually in July, on a fine and firm seedbed.",
        "Harvest teff when the straw turns yellow and before the seeds shatter.",
        "Apply urea to maize in two splits: at planting and when the plant is knee high.",
        "Store grain only after drying it below 13 percent moisture, in hermetic bags.",
        "Wheat rust shows orange pustules on leaves; spray fungicide if more than 5 percent of leaves are infected.",
        "Vaccinate cattle against lumpy skin disease every year before the rainy season.",
        "Faba bean fixes nitrogen; rotating it with wheat raises the next wheat yield.",
        "Use 15 kg of teff seed per hectare when broadcasting, less when row planting.",
        "Fall armyworm makes ragged holes in maize leaves; scout 20 plants per field each week.",
        "Give dairy cows clean water all day; a cow needs about 60 litres a day."]
qs = [("when to plant teff", 0), ("teff harvest time", 1), ("how to split urea for maize", 2), ("moisture before storing grain", 3),
      ("orange spots on wheat leaves", 4), ("lumpy skin vaccine timing", 5), ("why rotate faba bean and wheat", 6),
      ("seed rate of teff per hectare", 7), ("holes in maize leaves", 8), ("how much water for a dairy cow", 9),
      ("tef planting month", 0), ("armyworm scouting", 8)]
methods = {"A: words": TfidfVectorizer(), "B: character pieces": TfidfVectorizer(analyzer="char_wb", ngram_range=(3, 5))}
res, fails = {}, {}
for name, vec in methods.items():
    M = vec.fit_transform(docs); r1 = r3 = 0; fails[name] = []
    for q, gold in qs:
        rank = np.argsort(-cosine_similarity(vec.transform([q]), M)[0])
        r1 += rank[0] == gold; r3 += gold in rank[:3]
        if rank[0] != gold: fails[name].append(q)
    res[name] = (r1 / len(qs), r3 / len(qs))
    print(f"{name:30s} recall@1 {res[name][0]:.2f}  recall@3 {res[name][1]:.2f}  misses: {fails[name]}")
best = max(res, key=lambda k: res[k])
''',
 viz=lambda ns: [hbar(B('Retrieval quality on 12 questions', 'በ12 ጥያቄዎች ላይ የretrieval ጥራት'), list(ns['res']), [('recall@1', [v[0] for v in ns['res'].values()], 1), ('recall@3', [v[1] for v in ns['res'].values()], 2)], B('Share of questions', 'የጥያቄዎች ድርሻ'), fmt=2)],
 analysis=lambda ns: ([f"recall@3: A {ns['res']['A: words'][1]:.2f}, B {ns['res']['B: character pieces'][1]:.2f}; recall@1 is {ns['res']['A: words'][0]:.2f} for A and {ns['res']['B: character pieces'][0]:.2f} for B.", "Misses at rank 1: " + "; ".join(f"{k[:1]}: " + ", ".join(v) for k, v in ns['fails'].items() if v) + ". Passages that share key words get confused; a short title on each passage (\u201cTeff: planting time\u201d) separates them.", 'recall@3 is what matters when the model reads the top 3 passages; aim for 1.0 there.'],
                      [f"recall@3፡ A {ns['res']['A: words'][1]:.2f}፣ B {ns['res']['B: character pieces'][1]:.2f}፤ recall@1 ለA {ns['res']['A: words'][0]:.2f}፣ ለB {ns['res']['B: character pieces'][0]:.2f} ነው።", "በደረጃ 1 ያመለጡ፡ " + "፤ ".join(f"{k[:1]}: " + ", ".join(v) for k, v in ns['fails'].items() if v) + "። ዋና ቃላትን የሚጋሩ ክፍሎች ይምታታሉ፤ በእያንዳንዱ ክፍል ላይ አጭር ርዕስ («ጤፍ፡ የመዝሪያ ጊዜ») ይለያቸዋል።", 'ሞዴሉ ከፍተኛዎቹን 3 ክፍሎች ሲያነብ አስፈላጊው recall@3 ነው፤ እዚያ 1.0 ለማግኘት ዓላም።']),
 decision=lambda ns: (f"Use {ns['best']} and send the top 3 passages to the language model; grow the evaluation set to 100 questions in Amharic and English before launch, and re-run it on every change.", f"{ns['best']}ን ተጠቀምና ከፍተኛዎቹን 3 ክፍሎች ወደ ቋንቋ ሞዴሉ ላክ፤ ከመልቀቅህ በፊት የግምገማ ስብስቡን በአማርኛና በእንግሊዝኛ ወደ 100 ጥያቄዎች አሳድግ፣ በእያንዳንዱ ለውጥም እንደገና አስኪደው።")))
C5.append(lab(('Detecting brute-force logins in server logs', 'በሰርቨር መዝገቦች ውስጥ የbrute-force መግቢያዎችን መለየት'),
 ('Parse a day of authentication logs, find IP addresses with bursts of failed logins, choose a rate-limit threshold from the data, and estimate false blocks.', 'የአንድ ቀን የማረጋገጫ መዝገቦችን ተንትን፣ የወደቁ መግቢያዎች ፍንዳታ ያላቸውን IP አድራሻዎች ፈልግ፣ ከዳታው የrate-limit ወሰን ምረጥ፣ የሐሰት እገዳዎችን ገምት።'), W,
 [PY, PD, T('fail2ban / your API gateway', 'enforce the block automatically', 'እገዳውን በራስ-ሰር ማስፈጸም', 'apt install fail2ban'), MPL],
 (['Read the auth log: time, IP, user, success.', 'Count failures per IP per 10-minute window.', 'Plot the distribution of the maximum failures per IP.', 'Choose a threshold that separates normal users from attackers.', 'Count how many real users the threshold would have blocked.'],
  ['የማረጋገጫ መዝገቡን አንብብ፡ ጊዜ፣ IP፣ ተጠቃሚ፣ ስኬት።', 'በእያንዳንዱ IP በ10-ደቂቃ መስኮት ውድቀቶችን ቁጠር።', 'በእያንዳንዱ IP የከፍተኛ ውድቀቶችን ስርጭት ቻርት አድርግ።', 'መደበኛ ተጠቃሚዎችን ከአጥቂዎች የሚለይ ወሰን ምረጥ።', 'ወሰኑ ስንት እውነተኛ ተጠቃሚዎችን ያግድ እንደነበር ቁጠር።']),
 '''
import numpy as np, pandas as pd
rng = np.random.default_rng(13); rows = []
for ip in range(300):                                     # normal users: a few logins, occasional typo
    for _ in range(rng.integers(1, 6)):
        t = rng.uniform(0, 1440); rows.append((t, f"10.0.{ip // 250}.{ip % 250}", rng.random() < 0.12))
        if rng.random() < 0.1: rows.append((t + 0.5, f"10.0.{ip // 250}.{ip % 250}", True))
for a in range(6):                                        # attackers: bursts of failures
    start = rng.uniform(0, 1400)
    for k in range(rng.integers(40, 200)): rows.append((start + k * 0.05, f"203.0.113.{a + 10}", True))
log = pd.DataFrame(rows, columns=["minute", "ip", "failed"])
log["window"] = (log.minute // 10).astype(int)
per = log[log.failed].groupby(["ip", "window"]).size().groupby("ip").max()
attackers = per.index.str.startswith("203.")
for thr in [3, 5, 10, 20]:
    blocked = per >= thr
    print(f"threshold {thr:2d} failures/10 min: blocks {int((blocked & attackers).sum())} of {int(attackers.sum())} attackers, {int((blocked & ~attackers).sum())} real users")
normal_max = int(per[~attackers].max()); attack_min = int(per[attackers].min())
''',
 viz=lambda ns: [hbar(B('Most failed logins in any 10 minutes, per IP (top 12)', 'በማንኛውም 10 ደቂቃ ውስጥ በብዛት የወደቁ መግቢያዎች፣ በIP (ከፍተኛ 12)'), list(ns['per'].sort_values(ascending=False).index[:12]), [(B('Failures', 'ውድቀቶች'), list(ns['per'].sort_values(ascending=False).values[:12]), 1)], B('Failures in 10 minutes', 'በ10 ደቂቃ ውስጥ ውድቀቶች'), fmt=0)],
 analysis=lambda ns: ([f"Real users never failed more than {ns['normal_max']} times in 10 minutes.", f"Every attacker failed at least {ns['attack_min']} times: a huge gap between the two groups.", 'A threshold anywhere in the gap catches all attackers with no false blocks in this log.'],
                      [f"እውነተኛ ተጠቃሚዎች በ10 ደቂቃ ውስጥ ከ{ns['normal_max']} ጊዜ በላይ በፍጹም አልወደቁም።", f"እያንዳንዱ አጥቂ ቢያንስ {ns['attack_min']} ጊዜ ወድቋል፡ በሁለቱ ቡድኖች መካከል ትልቅ ክፍተት።", 'በክፍተቱ ውስጥ የትም ያለ ወሰን በዚህ መዝገብ ውስጥ ያለ የሐሰት እገዳ ሁሉንም አጥቂዎች ይይዛል።']),
 decision=lambda ns: ('Block an IP for 30 minutes after 10 failures in 10 minutes (well above normal, far below attacks); add two-factor login for staff, and review the threshold monthly as usage grows.', 'በ10 ደቂቃ ውስጥ ከ10 ውድቀቶች በኋላ IPን ለ30 ደቂቃዎች አግድ (ከመደበኛው በጣም በላይ፣ ከጥቃቶች በጣም በታች)፤ ለሠራተኞች two-factor መግቢያ ጨምር፣ አጠቃቀሙ ሲያድግም ወሰኑን በየወሩ ገምግም።'), note=SIM))
C5.append(lab(('Pilot analysis: funnel, retention and what to build next', 'የሙከራ ትንተና፡ funnel፣ retention እና ቀጥሎ የሚገነባው'),
 ('Analyse a 6-week pilot of a market-price SMS service: the sign-up funnel, weekly retention, and interview themes, then prioritise the next feature with RICE.', 'የገበያ-ዋጋ SMS አገልግሎትን የ6-ሳምንት ሙከራ ተንትን፡ የምዝገባ funnelን፣ ሳምንታዊ retentionን እና የቃለ መጠይቅ ጭብጦችን፣ ከዚያ ቀጣዩን ባሕሪ በRICE ቅድሚያ ስጥ።'), W,
 [PY, PD, SHEET, MPL],
 (['Export pilot events: invited, signed up, first alert opened, active in week 6, paid.', 'Draw the funnel and find the biggest drop.', 'Compute weekly retention for the sign-up cohort.', 'Code 20 interview notes into themes.', 'Score candidate features with RICE and choose.'],
  ['የሙከራ ክስተቶችን ላክ፡ የተጋበዙ፣ የተመዘገቡ፣ የመጀመሪያ ማንቂያ የከፈቱ፣ በሳምንት 6 ንቁ የነበሩ፣ የከፈሉ።', 'funnelኡን ሣልና ትልቁን ውድቀት ፈልግ።', 'ለምዝገባ ቡድኑ ሳምንታዊ retentionን አስላ።', '20 የቃለ መጠይቅ ማስታወሻዎችን ወደ ጭብጦች ኮድ አድርግ።', 'የዕጩ ባሕሪያትን በRICE አስመዝግብና ምረጥ።']),
 '''
funnel = {"invited": 1200, "signed up": 640, "opened first alert": 590, "active in week 6": 270, "paid": 95}
steps = list(funnel); drops = {f"{a} -> {b}": 1 - funnel[b] / funnel[a] for a, b in zip(steps, steps[1:])}
retention = [1.00, 0.78, 0.66, 0.55, 0.48, 0.44, 0.42]                      # share of sign-ups active each week
themes = {"prices arrive too late in the day": 9, "want more markets": 6, "SMS in Amharic hard to read on old phones": 4, "trust the source": 3}
features = {"morning alerts by 7:00": (600, 2, 0.8, 1), "add 10 more markets": (400, 1, 0.7, 3), "voice message option": (250, 2, 0.5, 4)}
rice = {k: r * i * c / e for k, (r, i, c, e) in features.items()}
for k, v in drops.items(): print(f"{k:38s} drop {v:.0%}")
print("RICE:", {k: round(v) for k, v in rice.items()})
worst = max(drops, key=drops.get); choice = max(rice, key=rice.get)
''',
 viz=lambda ns: [hbar(B('Pilot funnel (people)', 'የሙከራ funnel (ሰዎች)'), list(ns['funnel']), [(B('People', 'ሰዎች'), list(ns['funnel'].values()), 1)], B('People', 'ሰዎች'), fmt=0),
                 line(B('Weekly retention of sign-ups', 'የተመዘገቡ ሳምንታዊ retention'), list(range(7)), [(B('Active share', 'ንቁ ድርሻ'), [100 * x for x in ns['retention']], 1)], B('Week', 'ሳምንት'), B('Percent active', 'ንቁ መቶኛ'), ymin=0, ymax=100)],
 analysis=lambda ns: ([f"The biggest drop is \u201c{ns['worst']}\u201d ({ns['drops'][ns['worst']]:.0%}), but people pay only after they keep using the service, and {ns['drops']['opened first alert -> active in week 6']:.0%} stop using it before week 6.", 'Retention flattens at about 42% after week 5: a loyal core uses the service.', 'The top interview theme (9 of 20) is that prices arrive too late to decide where to sell that day.'],
                      [f"ትልቁ ውድቀት «{ns['worst']}» ነው ({ns['drops'][ns['worst']]:.0%})፤ ግን ሰዎች የሚከፍሉት አገልግሎቱን መጠቀም ከቀጠሉ በኋላ ብቻ ነው፣ {ns['drops']['opened first alert -> active in week 6']:.0%} ደግሞ ከሳምንት 6 በፊት መጠቀም ያቆማሉ።", 'retention ከሳምንት 5 በኋላ በ42% ገደማ ይረጋጋል፡ ታማኝ ዋና ቡድን አገልግሎቱን ይጠቀማል።', 'ዋናው የቃለ መጠይቅ ጭብጥ (ከ20 9) ዋጋዎች በዚያ ቀን የት እንደሚሸጥ ለመወሰን በጣም ዘግይተው ይደርሳሉ የሚል ነው።']),
 decision=lambda ns: (f"Build “{ns['choice']}” next (highest RICE, matches the top interview theme); measure week-6 activity again after 4 weeks. Do not add markets until the timing problem is solved.", f"ቀጥሎ «{ns['choice']}»ን ገንባ (ከፍተኛ RICE፣ ከዋናው የቃለ መጠይቅ ጭብጥ ጋር ይስማማል)፤ ከ4 ሳምንታት በኋላ የሳምንት-6 እንቅስቃሴን እንደገና ለካ። የጊዜ ችግሩ እስኪፈታ ገበያዎችን አትጨምር።"), note=SIM))
emit_labs('c', 5, C5, 9)
print('labs c3-c5 written')
