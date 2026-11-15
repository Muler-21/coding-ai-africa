from mlib import *

# ============================ LEVEL 3: Programmers (Grades 9–12) ============================
L3 = []
L3.append({
 'why': B('Objects model real things; binary and logic show how the machine itself works; pandas turns data into answers.', 'objects እውነተኛ ነገሮችን ይወክላሉ፤ binary እና logic ማሽኑ ራሱ እንዴት እንደሚሠራ ያሳያሉ፤ pandas ዳታን ወደ መልስ ይቀይራል።'),
 'dg': [compare(B('Class vs object', 'Class vs object'),
                [col(B('Class: the blueprint', 'Class፡ ንድፉ'), ['class Farm:', 'says what every farm has (name, crops)', 'and can do (add_crop)'], ['class Farm:', 'እያንዳንዱ እርሻ ያለውን (ስም፣ ሰብሎች)', 'እና ሊያደርገው የሚችለውን (add_crop) ይገልጻል']),
                 col(B('Objects: real farms', 'Objects፡ እውነተኛ እርሻዎች'), ['Farm("Abay") with teff, maize', 'Farm("Gojjam") with barley', 'many objects, one class'], ['Farm("Abay") ከጤፍ፣ በቆሎ ጋር', 'Farm("Gojjam") ከገብስ ጋር', 'ብዙ objects፣ አንድ class'], 'good')]),
        stack(B('From switches to programs', 'ከማብሪያ ማጥፊያዎች ወደ ፕሮግራሞች'),
              [N('Python program', 'የPython ፕሮግራም', 'farm.add_crop("teff")', 'farm.add_crop("teff")'), N('CPU instructions', 'የCPU መመሪያዎች', 'load, add, store, jump', 'ጫን፣ ደምር፣ አስቀምጥ፣ ዝለል'),
               N('Logic gates', 'Logic gates', 'AND, OR, NOT built from transistors', 'ከtransistors የተገነቡ AND፣ OR፣ NOT'), N('Binary: 0 and 1', 'Binary፡ 0 እና 1', '1011 = 8 + 0 + 2 + 1 = 11', '1011 = 8 + 0 + 2 + 1 = 11')])],
 'ex': ex_py('''
import pandas as pd

class Farm:                                   # a class: the blueprint
    def __init__(self, name):
        self.name, self.crops = name, []
    def add_crop(self, crop):
        self.crops.append(crop)
    def __repr__(self):
        return f"Farm({self.name}: {', '.join(self.crops)})"

abay = Farm("Abay"); abay.add_crop("teff"); abay.add_crop("maize")   # an object
print(abay)

print("1011 in decimal =", int("1011", 2), "| 11 in binary =", bin(11))
print("AND:", [a & b for a in (0, 1) for b in (0, 1)], " OR:", [a | b for a in (0, 1) for b in (0, 1)])

yields = pd.DataFrame({"farm": ["Abay", "Abay", "Gojjam", "Gojjam", "Dangila"],
                       "crop": ["teff", "maize", "teff", "barley", "teff"],
                       "t_per_ha": [1.6, 4.2, 1.9, 2.4, 1.4]})
print(yields.groupby("crop").t_per_ha.mean().round(2))
print("Average of the whole column:", round(yields.t_per_ha.mean(), 2))
''', B('A class, binary, logic gates and averages with pandas', 'class፣ binary፣ logic gates እና በpandas አማካዮች')),
 'qa': B(['A class is the blueprint (what data and actions exist); an object is one real thing made from it, with its own data.', '1·8 + 0·4 + 1·2 + 1·1 = 11.', 'df["column"].mean(); for averages per group use df.groupby("crop")["column"].mean().'],
         ['class ንድፉ ነው (ምን ዳታና ተግባራት እንዳሉ)፤ object ከእሱ የተሠራ የራሱ ዳታ ያለው አንድ እውነተኛ ነገር ነው።', '1·8 + 0·4 + 1·2 + 1·1 = 11።', 'df["column"].mean()፤ ለቡድን አማካዮች df.groupby("crop")["column"].mean() ተጠቀም።'])})
L3.append({
 'why': B('Good algorithms make programs fast; Git keeps every version safe; the DOM makes pages interactive.', 'ጥሩ algorithms ፕሮግራሞችን ፈጣን ያደርጋሉ፤ Git እያንዳንዱን ስሪት ይጠብቃል፤ DOM ገጾችን በይነተገናኝ ያደርጋል።'),
 'dg': [compare(B('Finding a name in 1,000,000 sorted records', 'በ1,000,000 የተደረደሩ መዝገቦች ውስጥ ስም መፈለግ'),
                [col(B('Linear search: O(n)', 'Linear search፡ O(n)'), ['check one by one', 'up to 1,000,000 checks'], ['አንድ በአንድ ፈትሽ', 'እስከ 1,000,000 ፍተሻዎች'], 'bad'),
                 col(B('Binary search: O(log n)', 'Binary search፡ O(log n)'), ['look in the middle, throw away half', 'at most 20 checks'], ['መሀሉን ተመልከት፣ ግማሹን ጣል', 'ቢበዛ 20 ፍተሻዎች'], 'good')]),
        flow(B('A day with Git', 'ከGit ጋር አንድ ቀን'),
             [N('edit files', 'ፋይሎችን አስተካክል'), N('git add', 'git add', 'choose changes', 'ለውጦችን ምረጥ'), N('git commit', 'git commit', 'save a snapshot + message', 'ፎቶ + መልእክት አስቀምጥ'), N('git push', 'git push', 'send to GitHub', 'ወደ GitHub ላክ'), N('pull request', 'pull request', 'review, then merge', 'ገምግም፣ ከዚያ አዋህድ', hl=True)]),
        flow(B('Recursion: factorial(4)', 'Recursion፡ factorial(4)'),
             [N('4 × f(3)', '4 × f(3)'), N('3 × f(2)', '3 × f(2)'), N('2 × f(1)', '2 × f(1)'), N('f(1) = 1', 'f(1) = 1', 'base case: stop', 'base case፡ አቁም', hl=True)], loop=B('then multiply back up: 1 → 2 → 6 → 24', 'ከዚያ ወደ ላይ አባዛ፡ 1 → 2 → 6 → 24'))],
 'ex': ex_py('''
import random
def linear_search(items, target):
    for steps, x in enumerate(items, 1):
        if x == target: return steps
def binary_search(items, target):
    lo, hi, steps = 0, len(items) - 1, 0
    while lo <= hi:
        steps += 1; mid = (lo + hi) // 2
        if items[mid] == target: return steps
        if items[mid] < target: lo = mid + 1
        else: hi = mid - 1
def factorial(n):
    return 1 if n <= 1 else n * factorial(n - 1)     # base case, then recursive case

records = list(range(1_000_000)); random.seed(1); target = random.choice(records)
print(f"target {target}: linear search {linear_search(records, target):,} steps, binary search {binary_search(records, target)} steps")
print("factorial(4) =", factorial(4), "| factorial(10) =", factorial(10))
''', B('Linear vs binary search, and recursion', 'Linear vs binary search፣ እና recursion'),
     B('The DOM part in JavaScript: document.querySelector("#add").addEventListener("click", addNotice) runs addNotice each time the button is clicked.', 'የDOM ክፍሉ በJavaScript፡ document.querySelector("#add").addEventListener("click", addNotice) ቁልፉ በተጫነ ቁጥር addNoticeን ያስኬዳል።')),
 'qa': B(['Each step halves the remaining list, so 1,000,000 items need at most about 20 checks; it only works on sorted data.', 'It saves a snapshot of the staged changes with a message, so you can see or return to that version later.', 'The simplest input that is answered directly without calling the function again (for factorial, n ≤ 1 returns 1).'],
         ['እያንዳንዱ እርምጃ የቀረውን ዝርዝር በግማሽ ይቀንሳል፤ ስለዚህ 1,000,000 ንጥሎች ቢበዛ ወደ 20 ፍተሻዎች ያስፈልጋቸዋል፤ የሚሠራው በተደረደረ ዳታ ላይ ብቻ ነው።', 'የተዘጋጁትን ለውጦች ፎቶ ከመልእክት ጋር ያስቀምጣል፤ ስለዚህ በኋላ ያንን ስሪት ማየት ወይም መመለስ ትችላለህ።', 'function እንደገና ሳይጠራ በቀጥታ የሚመለስ በጣም ቀላሉ ግብዓት (ለfactorial n ≤ 1 1 ይመልሳል)።'])})
L3.append({
 'why': B('The back end stores data and answers requests; the right data structure makes it fast.', 'back end ዳታ ያስቀምጣል፣ ለጥያቄዎችም ይመልሳል፤ ትክክለኛው data structure ፈጣን ያደርገዋል።'),
 'dg': [flow(B('A request to your API', 'ወደ APIህ የሚመጣ ጥያቄ'),
             [N('Phone app', 'የስልክ መተግበሪያ', 'GET /prices?crop=teff', 'GET /prices?crop=teff'), N('FastAPI / Flask', 'FastAPI / Flask', 'route → function', 'route → function'), N('SQLite', 'SQLite', 'SELECT … JOIN …', 'SELECT … JOIN …'), N('200 OK + JSON', '200 OK + JSON', '404 if not found', 'ካልተገኘ 404', hl=True)]),
        compare(B('Stack or queue?', 'Stack ወይስ queue?'),
                [col(B('Stack: last in, first out', 'Stack፡ መጨረሻ የገባ፣ መጀመሪያ ይወጣል'), ['undo button', 'browser back button'], ['የundo ቁልፍ', 'የአሳሹ ወደ ኋላ ቁልፍ']),
                 col(B('Queue: first in, first out', 'Queue፡ መጀመሪያ የገባ፣ መጀመሪያ ይወጣል'), ['customers at a bank', 'print jobs, SMS sending'], ['በባንክ ያሉ ደንበኞች', 'የህትመት ሥራዎች፣ SMS መላክ'], 'good')])],
 'ex': ex_py('''
import sqlite3
from collections import deque
db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE markets(id INTEGER PRIMARY KEY, town TEXT);
CREATE TABLE prices(market_id INTEGER REFERENCES markets(id), crop TEXT, birr_per_kg REAL);
INSERT INTO markets VALUES (1,'Bahir Dar'),(2,'Debre Markos'),(3,'Gondar');
INSERT INTO prices VALUES (1,'teff',118),(2,'teff',112),(3,'teff',125),(2,'maize',38);
""")
rows = db.execute("""SELECT m.town, p.birr_per_kg FROM prices p
                     JOIN markets m ON m.id = p.market_id
                     WHERE p.crop = ? ORDER BY p.birr_per_kg""", ("teff",)).fetchall()
print("teff prices:", rows)

line = deque(["Almaz", "Bekele"]); line.append("Chaltu")     # queue: first in, first out
print("served first:", line.popleft())
undo = ["type A", "type B"]; undo.append("delete")            # stack: last in, first out
print("undo removes:", undo.pop())
''', B('SQL JOIN with SQLite, a queue and a stack', 'SQL JOIN ከSQLite ጋር፣ queue እና stack'),
     B('In the full project this query sits inside an API route that returns the rows as JSON.', 'በሙሉ ፕሮጀክቱ ይህ query ረድፎቹን እንደ JSON በሚመልስ API route ውስጥ ይቀመጣል።')),
 'qa': B(['When order of arrival must be respected, such as customers waiting or messages to send.', 'It combines rows from two tables where a key matches, for example each price with its market’s town.', 'Not found: the server is working but the requested address or item does not exist.'],
         ['የመድረሻ ቅደም ተከተል መከበር ሲኖርበት፣ ለምሳሌ የሚጠብቁ ደንበኞች ወይም የሚላኩ መልእክቶች።', 'ቁልፍ በሚመሳሰልበት ከሁለት ሰንጠረዦች ረድፎችን ያጣምራል፣ ለምሳሌ እያንዳንዱን ዋጋ ከገበያው ከተማ ጋር።', 'አልተገኘም፡ ሰርቨሩ እየሠራ ነው ግን የተጠየቀው አድራሻ ወይም ንጥል የለም።'])})
L3.append({
 'why': B('Professionals work in teams, on Linux, safely and ethically, and use machine learning with honest testing.', 'ባለሙያዎች በቡድን፣ በLinux ላይ፣ በደኅንነትና በሥነ-ምግባር ይሠራሉ፤ machine learningንም በታማኝ ፍተሻ ይጠቀማሉ።'),
 'dg': [flow(B('Shell pipes join small tools', 'የshell pipes ትናንሽ መሣሪያዎችን ያገናኛሉ'),
             [N('cat sales.csv', 'cat sales.csv'), N('| grep teff', '| grep teff', 'keep teff lines', 'የጤፍ መስመሮችን አቆይ'), N('| cut -d, -f3', '| cut -d, -f3', 'take column 3', 'ዓምድ 3ን ውሰድ'), N('| sort -n | tail -1', '| sort -n | tail -1', 'highest price', 'ከፍተኛው ዋጋ', hl=True)]),
        flow(B('Honest machine learning', 'ታማኝ machine learning'),
             [N('All data', 'ሁሉም ዳታ'), N('Train set (80%)', 'የሥልጠና ስብስብ (80%)', 'the model learns here', 'ሞዴሉ እዚህ ይማራል'), N('Test set (20%)', 'የፈተና ስብስብ (20%)', 'never seen in training', 'በሥልጠና ፈጽሞ ያልታየ'), N('Score on test', 'በፈተናው ላይ ውጤት', 'the honest number', 'ታማኙ ቁጥር', hl=True)])],
 'ex': ex_py('''
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
rng = np.random.default_rng(12)
weeks = np.arange(104)
price = 95 + 0.15 * weeks + 6 * np.sin(2 * np.pi * weeks / 52) + rng.normal(0, 2.5, 104)   # birr/kg
X = np.column_stack([weeks, np.sin(2 * np.pi * weeks / 52), np.cos(2 * np.pi * weeks / 52)])
X_tr, X_te, y_tr, y_te = train_test_split(X, price, test_size=0.2, shuffle=False)   # keep time order
model = LinearRegression().fit(X_tr, y_tr)
print(f"error on training weeks: {mean_absolute_error(y_tr, model.predict(X_tr)):.2f} birr/kg")
print(f"error on unseen weeks:   {mean_absolute_error(y_te, model.predict(X_te)):.2f} birr/kg")
nxt = 104
print(f"next week forecast: {model.predict([[nxt, np.sin(2*np.pi*nxt/52), np.cos(2*np.pi*nxt/52)]])[0]:.1f} birr/kg")
''', B('Predict next week’s market price and test it honestly', 'የሚቀጥለውን ሳምንት የገበያ ዋጋ ተንብይና በታማኝነት ፈትሸው'),
     B('Limits: the data are simulated; real prices also jump with rainfall, holidays and fuel costs, which this model does not know.', 'ገደቦች፡ ዳታው የተመሰለ ነው፤ እውነተኛ ዋጋዎች በዝናብ፣ በበዓላትና በነዳጅ ዋጋ ይዘላሉ፤ ይህ ሞዴል እነዚህን አያውቅም።')),
 'qa': B(['It sends the output of one command as the input of the next, so small tools can be chained.', 'To measure performance on data the model has never seen; the training score is always too optimistic.', 'The people it describes have rights over it; follow the national data protection law, collect only what you need and ask for consent.'],
         ['የአንዱን ትዕዛዝ ውጤት የቀጣዩ ግብዓት አድርጎ ይልካል፤ ስለዚህ ትናንሽ መሣሪያዎች ሊያያዙ ይችላሉ።', 'ሞዴሉ ፈጽሞ ባላየው ዳታ ላይ አፈጻጸሙን ለመለካት፤ የሥልጠና ውጤቱ ሁልጊዜ ከልክ በላይ ተስፋ ሰጪ ነው።', 'የሚገልጻቸው ሰዎች መብት አላቸው፤ የብሔራዊ የዳታ ጥበቃ ሕግን ተከተል፣ የሚያስፈልግህን ብቻ ሰብስብ፣ ፈቃድም ጠይቅ።'])})
emit(3, L3, 4)

# ============================ LEVEL 4: CS Foundations (BSc) ============================
L4 = []
L4.append({
 'why': B('Memory, proof and mathematics are the base under every advanced topic, including AI.', 'ማስታወሻ፣ ማረጋገጫና ሒሳብ AIን ጨምሮ ከእያንዳንዱ የላቀ ርዕስ ሥር ያሉ መሠረቶች ናቸው።'),
 'dg': [stack(B('A pointer is an address', 'pointer አድራሻ ነው'),
              [N('int x = 42;', 'int x = 42;', 'value 42 stored at address 0x1000', 'እሴት 42 በአድራሻ 0x1000 ተቀምጧል'), N('int *p = &x;', 'int *p = &x;', 'p holds 0x1000, the address of x', 'p 0x1000ን ይይዛል፣ የx አድራሻ'), N('*p = 7;', '*p = 7;', 'follow the address and change x to 7', 'አድራሻውን ተከትለህ xን 7 አድርግ')]),
        flow(B('Proof by induction', 'በinduction ማረጋገጥ'),
             [N('Base case', 'Base case', 'n = 1: 1 = 1·2/2 ✓', 'n = 1፡ 1 = 1·2/2 ✓'), N('Assume for n', 'ለn አስብ', '1 + … + n = n(n+1)/2', '1 + … + n = n(n+1)/2'), N('Show for n + 1', 'ለn + 1 አሳይ', 'n(n+1)/2 + (n+1) = (n+1)(n+2)/2', 'n(n+1)/2 + (n+1) = (n+1)(n+2)/2'), N('True for all n', 'ለሁሉም n እውነት ነው', hl=True)]),
        compare(B('What a matrix does', 'ማትሪክስ የሚያደርገው'),
                [col(B('Matrix × vector', 'ማትሪክስ × vector'), ['transforms a point: rotate, stretch, project'], ['ነጥብን ይቀይራል፡ ማዞር፣ መለጠጥ፣ መዘርጋት']),
                 col(B('Matrix × matrix', 'ማትሪክስ × ማትሪክስ'), ['one transformation after another', 'order matters: AB ≠ BA'], ['አንድ ለውጥ ከሌላው በኋላ', 'ቅደም ተከተል አስፈላጊ ነው፡ AB ≠ BA'], 'good')])],
 'ex': ex_py('''
import numpy as np
# check the induction formula for many n (a check, not a proof)
print(all(sum(range(1, n + 1)) == n * (n + 1) // 2 for n in range(1, 10_001)))

rotate90 = np.array([[0, -1], [1, 0]])       # rotate by 90 degrees
stretch = np.array([[2, 0], [0, 1]])          # double the x direction
p = np.array([1, 0])
print("rotate then stretch:", stretch @ rotate90 @ p)
print("stretch then rotate:", rotate90 @ stretch @ p, "(order matters)")
''', B('Checking a formula and composing transformations', 'ቀመርን መፈተሽና ለውጦችን ማጣመር'),
     B('A computer check over 10,000 cases supports the formula; only the induction proof shows it for every n.', 'በ10,000 ጉዳዮች ላይ የተደረገ የኮምፒውተር ፍተሻ ቀመሩን ይደግፋል፤ ለእያንዳንዱ n የሚያሳየው የinduction ማረጋገጫው ብቻ ነው።')),
 'qa': B(['A variable that stores the memory address of another value; *p reads or changes the value at that address.', 'Base: n = 1 gives 1 = 1. Step: if it holds for n, then 1 + … + n + (n+1) = n(n+1)/2 + (n+1) = (n+1)(n+2)/2, which is the formula for n + 1.', 'Applying one linear transformation after another (for example rotate then stretch); the product is the combined transformation.'],
         ['የሌላ እሴትን የማስታወሻ አድራሻ የሚያስቀምጥ variable፤ *p በዚያ አድራሻ ያለውን እሴት ያነባል ወይም ይቀይራል።', 'Base፡ n = 1 1 = 1 ይሰጣል። እርምጃ፡ ለn እውነት ከሆነ 1 + … + n + (n+1) = n(n+1)/2 + (n+1) = (n+1)(n+2)/2፣ ይህም ለn + 1 ቀመሩ ነው።', 'አንድ linear ለውጥን ከሌላው በኋላ መተግበር (ለምሳሌ ማዞር ከዚያ መለጠጥ)፤ ውጤቱ የተጣመረው ለውጥ ነው።'])})
L4.append({
 'why': B('Choosing the right algorithm and understanding the hardware decide whether a system scales.', 'ትክክለኛውን algorithm መምረጥና hardwareን መረዳት አንድ ሥርዓት ማደግ ይችል እንደሆነ ይወስናሉ።'),
 'dg': [compare(B('Greedy vs dynamic programming: make 6 birr with coins 1, 3, 4', 'Greedy vs dynamic programming፡ በ1፣ 3፣ 4 ሳንቲሞች 6 ብር ሥራ'),
                [col(B('Greedy: take the biggest coin', 'Greedy፡ ትልቁን ሳንቲም ውሰድ'), ['4 + 1 + 1 = 3 coins'], ['4 + 1 + 1 = 3 ሳንቲሞች'], 'bad'),
                 col(B('Dynamic programming', 'Dynamic programming'), ['3 + 3 = 2 coins (optimal)', 'solves every smaller amount once'], ['3 + 3 = 2 ሳንቲሞች (ምርጥ)', 'እያንዳንዱን ትንሽ መጠን አንድ ጊዜ ይፈታል'], 'good')]),
        stack(B('The memory hierarchy', 'የማስታወሻ ተዋረድ'),
              [N('Registers', 'Registers', '< 1 ns', '< 1 ns'), N('Cache (L1–L3)', 'Cache (L1–L3)', '1–10 ns; a miss means going further down', '1–10 ns፤ miss ማለት ወደ ታች መሄድ ማለት ነው'), N('RAM', 'RAM', '≈ 100 ns', '≈ 100 ns'), N('SSD / disk', 'SSD / disk', '≈ 100,000 ns and more', '≈ 100,000 ns እና ከዚያ በላይ')])],
 'ex': ex_py('''
from fractions import Fraction
def greedy(amount, coins):
    used = []
    for c in sorted(coins, reverse=True):
        while amount >= c:
            amount -= c; used.append(c)
    return used
def dp(amount, coins):
    best = [[]] + [None] * amount                  # best[a] = fewest coins for amount a
    for a in range(1, amount + 1):
        options = [best[a - c] + [c] for c in coins if c <= a and best[a - c] is not None]
        best[a] = min(options, key=len) if options else None
    return best[amount]
print("greedy:", greedy(6, [1, 3, 4]), " dynamic programming:", dp(6, [1, 3, 4]))
print("expected value of a fair die:", sum(Fraction(k, 6) for k in range(1, 7)), "=", 3.5)
''', B('When greedy fails, and an expected value', 'greedy ሲወድቅ፣ እና expected value')),
 'qa': B(['When the best local choice now blocks a better overall solution, as with coins 1, 3, 4 for 6.', 'The data the CPU needs is not in the cache, so it must wait for slower memory (RAM), which can cost about 100 times more time.', '(1+2+3+4+5+6)/6 = 3.5.'],
         ['አሁን ያለው ምርጥ የአካባቢ ምርጫ የተሻለ አጠቃላይ መፍትሔን ሲዘጋ፣ ለ6 በ1፣ 3፣ 4 ሳንቲሞች እንዳለው።', 'CPU የሚፈልገው ዳታ በcache ውስጥ የለም፤ ስለዚህ ቀርፋፋውን ማስታወሻ (RAM) መጠበቅ አለበት፤ ይህም ወደ 100 እጥፍ ጊዜ ሊወስድ ይችላል።', '(1+2+3+4+5+6)/6 = 3.5።'])})
L4.append({
 'why': B('Operating systems, databases, networks and numerical methods are what keep real systems correct and fast.', 'የoperating systems፣ የዳታቤዞች፣ የኔትወርኮችና የnumerical methods እውቀት እውነተኛ ሥርዓቶችን ትክክለኛና ፈጣን የሚያደርጋቸው ነው።'),
 'dg': [compare(B('Process vs thread', 'Process vs thread'),
                [col(B('Process', 'Process'), ['own memory space', 'safe isolation, heavier to start'], ['የራሱ የማስታወሻ ቦታ', 'ደህንነቱ የተጠበቀ መለያየት፣ ለመጀመር ከባድ']),
                 col(B('Thread', 'Thread'), ['shares memory with its process', 'light and fast, but needs locks'], ['ማስታወሻን ከprocessኡ ጋር ይጋራል', 'ቀላልና ፈጣን፣ ግን locks ያስፈልገዋል'], 'good')]),
        flow(B('A bank transfer is a transaction', 'የባንክ ዝውውር transaction ነው'),
             [N('BEGIN', 'BEGIN'), N('take 500 from A', 'ከA 500 ውሰድ'), N('add 500 to B', 'ለB 500 ጨምር'), N('COMMIT', 'COMMIT', 'both happen, or neither (ROLLBACK)', 'ሁለቱም ይሆናሉ፣ ወይም አንዳቸውም (ROLLBACK)', hl=True)]),
        stack(B('The internet stack', 'የኢንተርኔት ቁልል'), [N('Application: HTTP, DNS', 'Application፡ HTTP፣ DNS'), N('Transport: TCP, UDP', 'Transport፡ TCP፣ UDP'), N('Internet: IP addresses, routing', 'Internet፡ IP አድራሻዎች፣ routing'), N('Link: Wi-Fi, 4G, fibre', 'Link፡ Wi-Fi፣ 4G፣ fibre')])],
 'ex': ex_py('''
f = lambda x: x * x - 2                 # find sqrt(2): the root of x^2 - 2
x = 1.0
for i in range(1, 6):                   # Newton's method: x <- x - f(x) / f'(x)
    x = x - f(x) / (2 * x)
    print(f"Newton step {i}: x = {x:.12f}, error = {abs(x - 2 ** 0.5):.1e}")
y, lr = 1.0, 0.1
for i in range(200):                    # gradient descent on (y^2 - 2)^2
    y -= lr * 4 * y * (y * y - 2)
print(f"gradient descent after 200 steps: {y:.12f}, error = {abs(y - 2 ** 0.5):.1e}")
''', B('Newton’s method vs gradient descent for √2', 'ለ√2 የNewton ዘዴ vs gradient descent'),
     B('Newton roughly doubles the correct digits each step; gradient descent is slower but needs only the gradient, which is why it trains neural networks.', 'Newton በእያንዳንዱ እርምጃ ትክክለኛ አሃዞችን ከሞላ ጎደል በእጥፍ ያሳድጋል፤ gradient descent ቀርፋፋ ነው ግን gradient ብቻ ያስፈልገዋል፤ ለዚህም ነው neural networksን የሚያሰለጥነው።')),
 'qa': B(['A process has its own memory; threads inside one process share memory, so they are lighter but must coordinate with locks.', 'So that a group of changes either all happen or none do, even if power or the network fails in the middle (for example a money transfer).', 'No. The halting problem, deciding for every program whether it stops, cannot be solved by any algorithm.'],
         ['process የራሱ ማስታወሻ አለው፤ በአንድ process ውስጥ ያሉ threads ማስታወሻ ይጋራሉ፤ ስለዚህ ቀላል ናቸው ግን በlocks መቀናጀት አለባቸው።', 'የለውጦች ቡድን ሁሉም እንዲሆኑ ወይም አንዳቸውም እንዳይሆኑ፣ ኃይል ወይም ኔትወርክ በመሀል ቢቋረጥም (ለምሳሌ የገንዘብ ዝውውር)።', 'አይደለም። halting problem፣ ለእያንዳንዱ ፕሮግራም ይቆማል ወይ ብሎ መወሰን፣ በማንኛውም algorithm ሊፈታ አይችልም።'])})
L4.append({
 'why': B('Classical AI searches; machine learning fits data; honest evaluation tells you if it works.', 'ክላሲካል AI ይፈልጋል፤ machine learning ዳታን ይገጥማል፤ ታማኝ ግምገማ ይሠራ እንደሆነ ይነግርሃል።'),
 'dg': [flow(B('The supervised learning loop', 'የsupervised learning ዑደት'),
             [N('Data + labels', 'ዳታ + labels'), N('Model', 'ሞዴል', 'regression, tree, network', 'regression፣ tree፣ network'), N('Loss', 'Loss', 'how wrong?', 'ምን ያህል ተሳሳተ?'), N('Update', 'አዘምን', 'gradient step', 'gradient እርምጃ', hl=True)], loop=B('repeat, then evaluate on held-out data', 'ድገም፣ ከዚያ በተለየ ዳታ ገምግም')),
        compare(B('Underfit, good fit, overfit', 'Underfit፣ ጥሩ fit፣ overfit'),
                [col(B('Too simple', 'በጣም ቀላል'), ['high train error', 'high test error'], ['ከፍተኛ የሥልጠና ስህተት', 'ከፍተኛ የፈተና ስህተት'], 'bad'),
                 col(B('Just right', 'ልክ'), ['low train error', 'low test error'], ['ዝቅተኛ የሥልጠና ስህተት', 'ዝቅተኛ የፈተና ስህተት'], 'good'),
                 col(B('Too complex', 'በጣም ውስብስብ'), ['very low train error', 'test error rises: memorised noise'], ['በጣም ዝቅተኛ የሥልጠና ስህተት', 'የፈተና ስህተት ይጨምራል፡ ጫጫታን አስታውሷል'], 'bad')]),
        flow(B('A* search', 'A* search'), [N('Start', 'መነሻ'), N('pick node with lowest f = g + h', 'ዝቅተኛ f = g + h ያለውን node ምረጥ', 'g: cost so far, h: estimate to goal', 'g፡ እስካሁን ዋጋ፣ h፡ እስከ ግቡ ግምት'), N('Goal reached', 'ግቡ ደረሰ', hl=True)])],
 'ex': ex_py('''
import numpy as np
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
rng = np.random.default_rng(4)
x = rng.uniform(0, 10, 300).reshape(-1, 1)
y = np.sin(x).ravel() + rng.normal(0, 0.3, 300)
x_tr, x_te, y_tr, y_te = train_test_split(x, y, test_size=0.3, random_state=0)
print("depth  train error  test error")
for depth in [1, 3, 5, 10, 20]:
    m = DecisionTreeRegressor(max_depth=depth, random_state=0).fit(x_tr, y_tr)
    tr = np.mean((m.predict(x_tr) - y_tr) ** 2); te = np.mean((m.predict(x_te) - y_te) ** 2)
    print(f"{depth:5d}  {tr:11.3f}  {te:10.3f}")

X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]]); t = np.array([[0], [1], [1], [0]])    # XOR
W1, W2 = rng.normal(0, 1, (2, 4)), rng.normal(0, 1, (4, 1))
sig = lambda z: 1 / (1 + np.exp(-z))
for _ in range(5000):                      # 2-layer network, plain gradient descent
    h = sig(X @ W1); out = sig(h @ W2)
    d2 = (out - t) * out * (1 - out); d1 = d2 @ W2.T * h * (1 - h)
    W2 -= 1.0 * h.T @ d2; W1 -= 1.0 * X.T @ d1
print("XOR predictions:", out.round(2).ravel())
''', B('Detecting overfitting, and a 2-layer network in NumPy', 'overfittingን መለየት፣ እና በNumPy ባለ 2-ንብርብር network'),
     B('Test error is lowest at a middle depth; deeper trees keep lowering training error but get worse on new data.', 'የፈተና ስህተቱ በመካከለኛ ጥልቀት ዝቅተኛ ነው፤ ጥልቅ trees የሥልጠና ስህተትን መቀነሳቸውን ይቀጥላሉ ግን በአዲስ ዳታ ላይ ይባባሳሉ።')),
 'qa': B(['The model learns noise in the training data, so it scores well there but badly on new data; detect it when training error keeps falling while validation error rises.', 'The heuristic decides which nodes to explore first; a good (admissible) one finds the best path while exploring far fewer nodes.', 'It rotates the data onto new axes ordered by how much variance they explain, so you can keep the first few and reduce dimensions.'],
         ['ሞዴሉ በሥልጠና ዳታ ውስጥ ያለ ጫጫታን ይማራል፤ ስለዚህ እዚያ ጥሩ ውጤት ያገኛል ግን በአዲስ ዳታ ላይ መጥፎ፤ የሥልጠና ስህተት እየቀነሰ የvalidation ስህተት ሲጨምር ትለየዋለህ።', 'heuristicኡ የትኞቹን nodes መጀመሪያ እንደሚያስስ ይወስናል፤ ጥሩ (admissible) heuristic በጣም ጥቂት nodes እያሰሰ ምርጡን መንገድ ያገኛል።', 'ዳታውን በሚያብራሩት variance መጠን ወደ ተደረደሩ አዳዲስ axes ያዞረዋል፤ ስለዚህ የመጀመሪያዎቹን ጥቂቶች አቆይተህ dimensionsን መቀነስ ትችላለህ።'])})
emit(4, L4, 4)

# ============================ LEVEL 5: Professional ============================
L5 = []
L5.append({
 'why': B('Clean, tested, reviewed code is cheaper to change, and change is most of a software job.', 'ንጹሕ፣ የተፈተነና የተገመገመ ኮድ ለመቀየር ርካሽ ነው፤ መቀየርም የሶፍትዌር ሥራ አብዛኛው ክፍል ነው።'),
 'dg': [stack(B('The testing pyramid', 'የፍተሻ ፒራሚድ'),
              [N('End-to-end: a few', 'End-to-end፡ ጥቂት', 'the whole app, like a user', 'ሙሉ መተግበሪያው፣ እንደ ተጠቃሚ'), N('Integration: some', 'Integration፡ አንዳንድ', 'parts working together: API + database', 'አብረው የሚሠሩ ክፍሎች፡ API + ዳታቤዝ'), N('Unit: many', 'Unit፡ ብዙ', 'one function, fast, run on every save', 'አንድ function፣ ፈጣን፣ በእያንዳንዱ ማስቀመጥ ይሠራል')]),
        compare(B('Reviewing a pull request', 'pull requestን መገምገም'),
                [col(B('Unhelpful', 'የማይጠቅም'), ['"This is wrong."', '"Why would you do this?"'], ['«ይህ ስህተት ነው።»', '«ይህን ለምን ታደርጋለህ?»'], 'bad'),
                 col(B('Helpful', 'የሚጠቅም'), ['"This loops twice over the list; one pass with a dict would be O(n). Want me to sketch it?"', 'Praise what is good, too'], ['«ይህ ዝርዝሩን ሁለት ጊዜ ይዞራል፤ በdict አንድ ዙር O(n) ይሆናል። ልሣልልህ?»', 'ጥሩውንም አመስግን'], 'good')])],
 'ex': ex_py('''
# Before: one function does everything, with unclear names
def f(d):
    t = 0
    for x in d:
        if x[1] > 0: t += x[1] * x[2]
    return t * 1.15

# After: small, named, tested
VAT = 0.15
def line_total(qty, unit_price):
    return qty * unit_price
def invoice_total(lines, vat=VAT):
    """Sum of valid lines plus VAT. Lines with zero or negative quantity are ignored."""
    subtotal = sum(line_total(q, p) for _, q, p in lines if q > 0)
    return round(subtotal * (1 + vat), 2)

def test_invoice_total():
    lines = [("teff", 2, 120.0), ("returned", -1, 50.0), ("salt", 1, 30.0)]
    assert invoice_total(lines) == 310.5
    assert invoice_total([]) == 0
    assert invoice_total(lines) == round(f(lines), 2)     # same behaviour as the old code
test_invoice_total()
print("all tests passed; total =", invoice_total([("teff", 2, 120.0), ("salt", 1, 30.0)]))
''', B('Refactor a function and protect it with a unit test', 'functionን አሻሽለህ በunit test ጠብቀው')),
 'qa': B(['It does one thing, has a name that says what, is short, and is easy to test.', 'That several parts work together correctly, for example the API really writes to and reads from the database.', 'Be specific and kind: point to the line, explain the problem and suggest a fix; ask questions rather than judge; mention what is good.'],
         ['አንድ ነገር ያደርጋል፣ ምን እንደሚያደርግ የሚናገር ስም አለው፣ አጭር ነው፣ ለመፈተሽም ቀላል ነው።', 'በርካታ ክፍሎች በትክክል አብረው እንደሚሠሩ፣ ለምሳሌ APIው በእርግጥ ወደ ዳታቤዙ እንደሚጽፍና እንደሚያነብ።', 'ግልጽና ደግ ሁን፡ መስመሩን አመልክት፣ ችግሩን አብራራ፣ ማስተካከያ ጠቁም፤ ከመፍረድ ይልቅ ጠይቅ፤ ጥሩውንም ጥቀስ።'])})
L5.append({
 'why': B('Containers and automated pipelines let a small team ship reliably and pay only for what it uses.', 'containers እና በራስ-ሰር የሚሠሩ pipelines ትንሽ ቡድን በአስተማማኝ ሁኔታ እንዲያቀርብና ለሚጠቀመው ብቻ እንዲከፍል ያስችላሉ።'),
 'dg': [flow(B('From commit to running service', 'ከcommit ወደ የሚሠራ አገልግሎት'),
             [N('git push', 'git push'), N('CI: run tests', 'CI፡ ፈተናዎችን አስኪድ', 'fail → stop, nothing deployed', 'ከወደቀ → ይቆማል፣ ምንም አይቀርብም'), N('Build image', 'image ገንባ', 'docker build', 'docker build'), N('Deploy container', 'container አቅርብ', 'cloud region near users', 'ለተጠቃሚዎች ቅርብ የሆነ የcloud ክልል', hl=True)]),
        compare(B('Image vs container', 'Image vs container'),
                [col(B('Image', 'Image'), ['a frozen recipe: OS, Python, your code', 'built once, stored in a registry'], ['የቀዘቀዘ የምግብ አዘገጃጀት፡ OS፣ Python፣ ኮድህ', 'አንድ ጊዜ ተገንብቶ በregistry ይቀመጣል']),
                 col(B('Container', 'Container'), ['a running copy of an image', 'start many, each isolated'], ['የimage የሚሠራ ቅጂ', 'ብዙ አስጀምር፣ እያንዳንዱ የተለየ'], 'good')])],
 'ex': ex_code('Dockerfile + GitHub Actions', '''
# Dockerfile
FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]

# .github/workflows/ci.yml
name: ci
on: [push]
jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: {python-version: "3.12"}
      - run: pip install -r requirements.txt && pytest -q     # a failing test stops the job here
      - run: docker build -t market-api:${{ github.sha }} .
''', B('Package an API and test it on every push', 'APIን አሽገህ በእያንዳንዱ push ፈትሸው'),
     B('Configuration example (not run here). Add a deploy step for your cloud provider after the build, with keys stored as repository secrets.', 'የconfiguration ምሳሌ (እዚህ አልተሠራም)። ከbuild በኋላ ለcloud አቅራቢህ የdeploy እርምጃ ጨምር፤ ቁልፎቹም እንደ repository secrets ይቀመጡ።')),
 'qa': B(['An image is the packaged recipe; a container is a running instance of that image (you can run many containers from one image).', 'The setup is written down, reviewed and versioned like code, so it can be rebuilt identically and changes are visible.', 'The pipeline stops at the test step and marks the commit as failed; nothing is built or deployed until the test passes.'],
         ['image የታሸገው የምግብ አዘገጃጀት ነው፤ container የዚያ image የሚሠራ instance ነው (ከአንድ image ብዙ containers ማስኬድ ትችላለህ)።', 'ዝግጅቱ እንደ ኮድ ይጻፋል፣ ይገመገማል፣ ስሪትም ይኖረዋል፤ ስለዚህ በተመሳሳይ ሁኔታ እንደገና ሊገነባ ይችላል፣ ለውጦችም ይታያሉ።', 'pipelineኑ በፈተናው እርምጃ ይቆማል፣ commitኡንም እንደወደቀ ምልክት ያደርጋል፤ ፈተናው እስኪያልፍ ምንም አይገነባም፣ አይቀርብም።'])})
L5.append({
 'why': B('Clean, reliable data pipelines are what every dashboard and model depends on.', 'ንጹሕና አስተማማኝ የዳታ pipelines እያንዳንዱ dashboard እና ሞዴል የሚመካባቸው ናቸው።'),
 'dg': [flow(B('ETL', 'ETL'),
             [N('Extract', 'Extract', 'SMS reports, CSVs, APIs', 'የSMS ሪፖርቶች፣ CSVs፣ APIs'), N('Transform', 'Transform', 'clean, validate, deduplicate, convert units', 'አጽዳ፣ አረጋግጥ፣ ድግግሞሽን አስወግድ፣ መለኪያዎችን ቀይር'), N('Load', 'Load', 'warehouse tables, Parquet', 'የwarehouse ሰንጠረዦች፣ Parquet', hl=True)]),
        compare(B('CSV vs Parquet', 'CSV vs Parquet'),
                [col(B('CSV', 'CSV'), ['text, row by row', 'no types, large, slow to scan'], ['ጽሑፍ፣ ረድፍ በረድፍ', 'ዓይነቶች የሉም፣ ትልቅ፣ ለመቃኘት ቀርፋፋ'], 'bad'),
                 col(B('Parquet', 'Parquet'), ['columnar and compressed', 'keeps types; reads only needed columns'], ['በዓምድ የተደራጀና የታመቀ', 'ዓይነቶችን ይጠብቃል፤ የሚያስፈልጉትን ዓምዶች ብቻ ያነባል'], 'good')])],
 'ex': ex_py('''
import pandas as pd
raw = pd.DataFrame({
    "report_id": [101, 102, 102, 103, 104, 105],
    "market":    ["Bahir Dar", "debre markos ", "debre markos ", "Gondar", "Gondar", "Dessie"],
    "crop":      ["teff", "teff", "teff", "maize", "teff", "teff"],
    "price":     ["118", "11.2", "11.2", "38", "", "121"],       # 11.2 was sent per 100 g by mistake
    "unit":      ["kg", "100g", "100g", "kg", "kg", "kg"]})
print("raw rows:", len(raw))
df = raw.drop_duplicates("report_id").copy()                         # duplicates
df["market"] = df.market.str.strip().str.title()                     # consistent names
df["price"] = pd.to_numeric(df.price, errors="coerce")               # bad or missing -> NaN
df.loc[df.unit == "100g", "price"] *= 10; df["unit"] = "kg"          # one unit
problems = df[df.price.isna() | ~df.price.between(5, 500)]           # validation rule
clean = df.drop(problems.index)
print("duplicates removed:", len(raw) - len(raw.drop_duplicates("report_id")), "| rejected:", problems.report_id.tolist())
print(clean[["market", "crop", "price"]].to_string(index=False))
''', B('Transform step: duplicates, units, missing values and validation', 'የTransform እርምጃ፡ ድግግሞሾች፣ መለኪያዎች፣ የጎደሉ እሴቶችና ማረጋገጫ'),
     B('Keep rejected rows in a separate table with the reason, so someone can fix them at the source.', 'የተከለከሉ ረድፎችን ከምክንያቱ ጋር በተለየ ሰንጠረዥ አቆይ፤ ስለዚህ አንድ ሰው ከምንጩ ሊያስተካክላቸው ይችላል።')),
 'qa': B(['Transform: cleans and reshapes the data (types, units, duplicates, joins, validation) before it is loaded.', 'Check a unique key (drop_duplicates on report_id), or a combination of columns that should be unique; count before and after.', 'It is columnar and compressed, keeps data types, and lets queries read only the columns they need, so it is smaller and faster than CSV.'],
         ['Transform፡ ዳታውን ከመጫኑ በፊት ያጸዳዋል፣ ይቀርጸዋል (ዓይነቶች፣ መለኪያዎች፣ ድግግሞሾች፣ joins፣ ማረጋገጫ)።', 'ልዩ ቁልፍን ፈትሽ (በreport_id ላይ drop_duplicates)፣ ወይም ልዩ መሆን ያለበት የዓምዶች ጥምረት፤ ከዚያ በፊትና በኋላ ቁጠር።', 'በዓምድ የተደራጀና የታመቀ ነው፣ የዳታ ዓይነቶችን ይጠብቃል፣ queries የሚያስፈልጓቸውን ዓምዶች ብቻ እንዲያነቡ ያስችላል፤ ስለዚህ ከCSV ያነሰና ፈጣን ነው።'])})
L5.append({
 'why': B('Statistics tells you whether a change really worked or you just got lucky.', 'ስታቲስቲክስ አንድ ለውጥ በእርግጥ እንደሠራ ወይም ዝም ብሎ እድለኛ እንደሆንክ ይነግርሃል።'),
 'dg': [flow(B('An A/B test', 'A/B ፈተና'),
             [N('Users', 'ተጠቃሚዎች'), N('Random split', 'በዘፈቀደ መከፋፈል', 'removes bias', 'አድልዎን ያስወግዳል'), N('A: old screen / B: new screen', 'A፡ የድሮ ስክሪን / B፡ አዲስ ስክሪን'), N('Compare rates + interval', 'መጠኖችንና ክልሉን አወዳድር', hl=True)]),
        compare(B('A p-value of 0.03 …', 'p-value 0.03 …'),
                [col(B('means', 'ማለት'), ['if there were no real difference, a result this extreme would happen about 3% of the time'], ['እውነተኛ ልዩነት ባይኖር ኖሮ ይህን ያህል ጽንፍ ያለ ውጤት 3% ገደማ ይከሰት ነበር'], 'good'),
                 col(B('does NOT mean', 'ማለት አይደለም'), ['3% chance the idea is wrong', 'the effect is large or important'], ['ሐሳቡ ስህተት የመሆን 3% ዕድል', 'ውጤቱ ትልቅ ወይም አስፈላጊ ነው'], 'bad')])],
 'ex': ex_py('''
import numpy as np
from scipy import stats
n_a, buy_a = 2400, 192        # old checkout screen
n_b, buy_b = 2400, 238        # new checkout screen (users assigned at random)
pa, pb = buy_a / n_a, buy_b / n_b
p_pool = (buy_a + buy_b) / (n_a + n_b)
z = (pb - pa) / np.sqrt(p_pool * (1 - p_pool) * (1 / n_a + 1 / n_b))
p_value = 2 * stats.norm.sf(abs(z))
se = np.sqrt(pa * (1 - pa) / n_a + pb * (1 - pb) / n_b)
lo, hi = (pb - pa) - 1.96 * se, (pb - pa) + 1.96 * se
print(f"A: {pa:.1%}  B: {pb:.1%}  difference: {pb - pa:+.1%}")
print(f"z = {z:.2f}, p = {p_value:.3f}, 95% interval for the difference: {lo:+.1%} to {hi:+.1%}")
''', B('A/B test with a confidence interval', 'A/B ፈተና ከconfidence interval ጋር'),
     B('In plain words: the new screen most likely raises purchases by between about 0.3 and 3.5 percentage points; the best single estimate is 1.9.', 'በቀላል ቃላት፡ አዲሱ ስክሪን ግዢዎችን ከ0.3 እስከ 3.5 percentage points ገደማ ሊያሳድግ ይችላል፤ ምርጡ ነጠላ ግምት 1.9 ነው።')),
 'qa': B(['If there were truly no effect, data this extreme would appear about 3% of the time. It is not the probability that the hypothesis is true, and it says nothing about the size of the effect.', 'Randomisation makes the groups alike in everything except the version, so a difference can be credited to the version, not to who chose it.', 'The posterior combines the prior with the data; a strong prior pulls the result towards it, especially when there is little data.'],
         ['በእርግጥ ምንም ውጤት ባይኖር ይህን ያህል ጽንፍ ያለ ዳታ 3% ገደማ ይታይ ነበር። መላምቱ እውነት የመሆን ፕሮባቢሊቲ አይደለም፣ ስለ ውጤቱ መጠንም ምንም አይልም።', 'በዘፈቀደ መመደብ ቡድኖቹን ከስሪቱ በስተቀር በሁሉም ነገር ተመሳሳይ ያደርጋቸዋል፤ ስለዚህ ልዩነቱ ለመረጠው ሳይሆን ለስሪቱ ሊሰጥ ይችላል።', 'posterior priorን ከዳታው ጋር ያጣምራል፤ ጠንካራ prior ውጤቱን ወደ ራሱ ይጎትታል፣ በተለይ ዳታው ጥቂት ሲሆን።'])})
L5.append({
 'why': B('Deep learning recognises images and text; small models bring it to cheap phones offline.', 'deep learning ምስሎችንና ጽሑፍን ይለያል፤ ትናንሽ ሞዴሎች ያለ ኢንተርኔት ርካሽ ስልኮች ላይ ያደርሱታል።'),
 'dg': [flow(B('Transfer learning for a leaf-disease app', 'ለቅጠል በሽታ መተግበሪያ transfer learning'),
             [N('Pretrained network', 'ቀድሞ የሰለጠነ network', 'learned edges, textures, shapes on millions of images', 'በሚሊዮኖች ምስሎች ላይ ጠርዞችን፣ ሸካራነቶችንና ቅርጾችን የተማረ'), N('Freeze early layers', 'የመጀመሪያዎቹን ንብርብሮች አቀዝቅዝ'), N('Train a new last layer', 'አዲስ የመጨረሻ ንብርብር አሰልጥን', '800 local leaf photos', '800 የአካባቢ ቅጠል ፎቶዎች'), N('Quantise → phone', 'Quantise → ስልክ', hl=True)]),
        compare(B('Model size for phones', 'ለስልኮች የሞዴል መጠን'),
                [col(B('float32', 'float32'), ['4 bytes per weight', 'most accurate, large'], ['በአንድ weight 4 bytes', 'በጣም ትክክለኛ፣ ትልቅ']),
                 col(B('int8 (quantised)', 'int8 (quantised)'), ['1 byte per weight: 4× smaller', 'tiny error if done well'], ['በአንድ weight 1 byte፡ 4× ያነሰ', 'በትክክል ከተሠራ በጣም ትንሽ ስህተት'], 'good')])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(0)
W = rng.normal(0, 0.05, (512, 256)).astype(np.float32)        # one layer's weights
x = rng.normal(0, 1, 512).astype(np.float32)
scale = np.abs(W).max() / 127                                   # symmetric int8 quantisation
W8 = np.round(W / scale).astype(np.int8)
y_full = x @ W
y_q = x @ (W8.astype(np.float32) * scale)
print(f"size: {W.nbytes / 1024:.0f} KB -> {W8.nbytes / 1024:.0f} KB ({W.nbytes / W8.nbytes:.0f}x smaller)")
print(f"relative output error: {np.linalg.norm(y_full - y_q) / np.linalg.norm(y_full):.2%}")
''', B('How much smaller does quantisation make a layer?', 'quantisation አንድን ንብርብር ምን ያህል ያሳንሰዋል?'),
     B('Real projects use PyTorch or TensorFlow Lite tools that quantise a whole trained network and then re-check accuracy on the test set.', 'እውነተኛ ፕሮጀክቶች ሙሉ የሰለጠነ networkን quantise የሚያደርጉና ከዚያ በtest set ላይ ትክክለኛነትን እንደገና የሚፈትሹ የPyTorch ወይም TensorFlow Lite መሣሪያዎችን ይጠቀማሉ።')),
 'qa': B(['It adjusts some or all of the learned weights (often only the last layers) using your smaller, local dataset.', 'It creates realistic new examples (flips, crops, light changes), so the model learns the object, not accidents of the few photos.', 'In the example 4 times (float32 to int8), with about 1% change in the layer output; always re-check accuracy on the test set.'],
         ['በትንሹ የአካባቢ ዳታሴትህ የተወሰኑ ወይም ሁሉንም የተማሩ weights (ብዙውን ጊዜ የመጨረሻዎቹን ንብርብሮች ብቻ) ያስተካክላል።', 'እውነተኛ የሚመስሉ አዳዲስ ምሳሌዎችን ይፈጥራል (መገልበጥ፣ መቁረጥ፣ የብርሃን ለውጦች)፤ ስለዚህ ሞዴሉ የጥቂቶቹን ፎቶዎች አጋጣሚዎች ሳይሆን ነገሩን ይማራል።', 'በምሳሌው 4 እጥፍ (ከfloat32 ወደ int8)፣ በንብርብሩ ውጤት ላይ ወደ 1% ገደማ ለውጥ፤ ትክክለኛነትን በtest set ላይ ሁልጊዜ እንደገና ፈትሽ።'])})
L5.append({
 'why': B('A model is only useful if it keeps working after launch; MLOps watches and renews it.', 'ሞዴል ጠቃሚ የሚሆነው ከተለቀቀ በኋላ መሥራቱን ሲቀጥል ብቻ ነው፤ MLOps ይከታተለዋል፣ ያድሰዋልም።'),
 'dg': [cycle(B('The model life cycle', 'የሞዴል የሕይወት ዑደት'),
              [N('Train + track', 'አሰልጥን + ተከታተል', 'parameters, data version, metrics', 'parameters፣ የዳታ ስሪት፣ metrics'), N('Serve', 'አገልግል', 'API, batch or on-device', 'API፣ batch ወይም በመሣሪያ ላይ'), N('Monitor', 'ተቆጣጠር', 'accuracy, drift, cost', 'ትክክለኛነት፣ drift፣ ወጪ'), N('Retrain + review', 'እንደገና አሰልጥን + ገምግም', hl=True)]),
        compare(B('Data drift', 'Data drift'),
                [col(B('Training data (2025)', 'የሥልጠና ዳታ (2025)'), ['rainfall mostly 600–900 mm', 'old seed varieties'], ['ዝናብ በአብዛኛው 600–900 mm', 'የድሮ የዘር ዝርያዎች']),
                 col(B('Live data (2026)', 'የቀጥታ ዳታ (2026)'), ['drought year: 350–550 mm', 'new varieties → model unsure'], ['የድርቅ ዓመት፡ 350–550 mm', 'አዳዲስ ዝርያዎች → ሞዴሉ እርግጠኛ አይደለም'], 'bad')])],
 'ex': ex_py('''
import numpy as np
from scipy import stats
rng = np.random.default_rng(5)
train_rain = rng.normal(750, 90, 2000)                 # mm, what the model was trained on
weeks = {"week 1": rng.normal(745, 90, 300), "week 2": rng.normal(735, 95, 300), "week 3": rng.normal(480, 70, 300)}
for name, live in weeks.items():
    ks = stats.ks_2samp(train_rain, live)
    # with large samples tiny shifts get small p-values, so alert on the SIZE of the shift (KS statistic)
    alert = "DRIFT - alert team, consider retraining" if ks.statistic > 0.2 else "small shift - keep watching" if ks.statistic > 0.1 else "ok"
    print(f"{name}: mean {live.mean():5.0f} mm, KS statistic {ks.statistic:.2f}, p = {ks.pvalue:.3g} -> {alert}")
''', B('Detecting data drift with a two-sample test', 'data driftን በtwo-sample ፈተና መለየት'),
     B('Week 2 has a tiny p-value but a small shift: with hundreds of records almost any change is "significant", so the alert uses the size of the shift.', 'ሳምንት 2 በጣም ትንሽ p-value ግን ትንሽ ለውጥ አለው፡ በመቶዎች መዝገቦች ማንኛውም ለውጥ ከሞላ ጎደል «ጉልህ» ይሆናል፤ ስለዚህ ማንቂያው የለውጡን መጠን ይጠቀማል።')),
 'qa': B(['When the data the model sees in use changes from the data it was trained on (new conditions, sensors, users), so its accuracy can drop silently.', 'To know exactly which data produced which model, so results can be reproduced, compared and audited.', 'When monitoring shows drift or falling accuracy, when enough new labelled data has arrived, or on a planned schedule, always after review on held-out data.'],
         ['ሞዴሉ በአገልግሎት ላይ የሚያየው ዳታ ከሰለጠነበት ዳታ ሲለወጥ (አዳዲስ ሁኔታዎች፣ ሴንሰሮች፣ ተጠቃሚዎች)፤ ስለዚህ ትክክለኛነቱ በዝምታ ሊወርድ ይችላል።', 'የትኛው ዳታ የትኛውን ሞዴል እንዳፈራ በትክክል ለማወቅ፤ ስለዚህ ውጤቶች ሊደገሙ፣ ሊወዳደሩና ሊመረመሩ ይችላሉ።', 'ክትትሉ drift ወይም እየወረደ ያለ ትክክለኛነት ሲያሳይ፣ በቂ አዲስ labelled ዳታ ሲመጣ፣ ወይም በታቀደ ጊዜ፣ ሁልጊዜ በተለየ ዳታ ላይ ከተገመገመ በኋላ።'])})
L5.append({
 'why': B('Language models become useful products when grounded in your documents and measured honestly.', 'የቋንቋ ሞዴሎች በሰነዶችህ ላይ ሲመሠረቱና በታማኝነት ሲለኩ ጠቃሚ ምርቶች ይሆናሉ።'),
 'dg': [flow(B('Retrieval-augmented generation (RAG)', 'Retrieval-augmented generation (RAG)'),
             [N('Question', 'ጥያቄ', '"When do I plant teff?"', '«ጤፍ መቼ ልዝራ?»'), N('Search your documents', 'ሰነዶችህን ፈልግ', 'embeddings / vector search', 'embeddings / vector search'), N('Model reads the top passages', 'ሞዴሉ ከፍተኛዎቹን ክፍሎች ያነባል'), N('Answer + source', 'መልስ + ምንጭ', 'cites the extension guide', 'የኤክስቴንሽን መመሪያውን ይጠቅሳል', hl=True)]),
        compare(B('Evaluating an assistant', 'ረዳትን መገምገም'),
                [col(B('Impressions', 'ስሜቶች'), ['"It looked good in the demo"'], ['«በማሳያው ጥሩ ይመስል ነበር»'], 'bad'),
                 col(B('Evaluation set', 'የግምገማ ስብስብ'), ['100 real questions with correct answers', 'score every new version the same way'], ['100 እውነተኛ ጥያቄዎች ከትክክለኛ መልሶች ጋር', 'እያንዳንዱን አዲስ ስሪት በተመሳሳይ መንገድ አስመዝግብ'], 'good')])],
 'ex': ex_py('''
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
docs = {"teff-guide p.3": "Plant teff at the start of the main rains, usually July, on a fine firm seedbed.",
        "maize-guide p.7": "Apply urea to maize in two splits: at planting and at knee height.",
        "storage-note p.1": "Dry grain to below 13 percent moisture before storing in hermetic bags.",
        "teff-guide p.9": "Harvest teff when the straw turns yellow, before grains shatter."}
vec = TfidfVectorizer().fit(docs.values()); M = vec.transform(docs.values())
def retrieve(question):
    s = cosine_similarity(vec.transform([question]), M)[0]
    return list(docs)[s.argmax()]
evalset = [("When should I plant teff?", "teff-guide p.3"), ("How dry must grain be for storage?", "storage-note p.1"),
           ("When do I add urea to maize?", "maize-guide p.7"), ("When to harvest teff?", "teff-guide p.9")]
hits = 0
for q, gold in evalset:
    got = retrieve(q); hits += got == gold
    print(f"{q:38s} -> {got:17s} {'correct' if got == gold else 'WRONG'}")
print(f"retrieval accuracy: {hits}/{len(evalset)}")
''', B('The retrieval half of RAG, with an evaluation set', 'የRAG የretrieval ግማሽ፣ ከግምገማ ስብስብ ጋር'),
     B('One question fails: word matching sends "When should I plant teff?" to the harvest page, because both share "when" and "teff". The evaluation set caught it; meaning-based embeddings usually fix it. In production the retrieved passages and their sources go to the language model, which must answer only from them and cite them.', 'አንድ ጥያቄ ይወድቃል፡ የቃላት ማዛመድ «ጤፍ መቼ ልዝራ?»ን ወደ የአጨዳ ገጹ ይልከዋል፤ ሁለቱም «መቼ» እና «ጤፍ» ስለሚጋሩ። የግምገማ ስብስቡ ያዘው፤ በትርጉም ላይ የተመሠረቱ embeddings ብዙውን ጊዜ ያስተካክሉታል። በምርት ላይ የተገኙት ክፍሎችና ምንጮቻቸው ወደ ቋንቋ ሞዴሉ ይላካሉ፤ እሱም ከእነሱ ብቻ መመለስና መጥቀስ አለበት።')),
 'qa': B(['The model does not know your private or recent documents and may invent facts; RAG retrieves the relevant passages and makes it answer from them, with sources.', 'Keep a fixed evaluation set of real questions with correct answers and score each version (accuracy, citation correctness), plus regular human review.', 'Personal identifiers (names with phone numbers, ID or account numbers), health details and anything users did not agree to share; store the minimum and delete on request.'],
         ['ሞዴሉ የግል ወይም የቅርብ ጊዜ ሰነዶችህን አያውቅም፣ እውነታዎችንም ሊፈጥር ይችላል፤ RAG ተገቢ ክፍሎችን አምጥቶ ከእነሱ ከምንጮች ጋር እንዲመልስ ያደርገዋል።', 'የእውነተኛ ጥያቄዎችና የትክክለኛ መልሶች ቋሚ የግምገማ ስብስብ አቆይ፣ እያንዳንዱን ስሪት አስመዝግብ (ትክክለኛነት፣ የጥቅስ ትክክለኛነት)፣ መደበኛ የሰው ግምገማም ጨምር።', 'የግል መለያዎች (ስሞች ከስልክ ቁጥሮች ጋር፣ የመታወቂያ ወይም የሂሳብ ቁጥሮች)፣ የጤና ዝርዝሮችና ተጠቃሚዎች ለማጋራት ያልተስማሙበት ማንኛውም ነገር፤ ዝቅተኛውን አስቀምጥ፣ ሲጠየቅ ሰርዝ።'])})
L5.append({
 'why': B('Users trust services with money and data only if they are secure and recover from failure.', 'ተጠቃሚዎች ገንዘብና ዳታ የሚያምኑት አገልግሎቶች ደህንነታቸው የተጠበቀና ከውድቀት የሚያገግሙ ሲሆኑ ብቻ ነው።'),
 'dg': [compare(B('SQL injection', 'SQL injection'),
                [col(B('Unsafe: text glued into SQL', 'አደገኛ፡ ጽሑፍ ከSQL ጋር ተጣብቋል'), ['"... WHERE phone = \'" + user_input + "\'"', 'input: \' OR \'1\'=\'1 → returns every account'], ['"... WHERE phone = \'" + user_input + "\'"', 'ግብዓት፡ \' OR \'1\'=\'1 → እያንዳንዱን ሂሳብ ይመልሳል'], 'bad'),
                 col(B('Safe: parameters', 'ደህንነቱ የተጠበቀ፡ parameters'), ['"... WHERE phone = ?", (user_input,)', 'the input is only ever data'], ['"... WHERE phone = ?", (user_input,)', 'ግብዓቱ ሁልጊዜ ዳታ ብቻ ነው'], 'good')]),
        cycle(B('Incident response', 'ለአደጋ ምላሽ'), [N('Detect', 'ለይ', 'alerts, user reports', 'ማንቂያዎች፣ የተጠቃሚ ሪፖርቶች'), N('Contain', 'ገድብ', 'block, rotate keys', 'አግድ፣ ቁልፎችን ቀይር'), N('Fix', 'አስተካክል'), N('Learn', 'ተማር', 'blameless report', 'ማንንም የማይወቅስ ሪፖርት', hl=True)])],
 'ex': ex_py('''
import sqlite3
db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE wallets(phone TEXT, balance REAL)")
db.executemany("INSERT INTO wallets VALUES (?, ?)", [("0911000001", 1500), ("0911000002", 320), ("0911000003", 9800)])
attack = "x' OR '1'='1"
unsafe = db.execute("SELECT phone, balance FROM wallets WHERE phone = '" + attack + "'").fetchall()
safe = db.execute("SELECT phone, balance FROM wallets WHERE phone = ?", (attack,)).fetchall()
print("unsafe query returned", len(unsafe), "accounts:", unsafe)
print("parameterised query returned", len(safe), "accounts")
import os
api_key = os.environ.get("PAYMENT_API_KEY", "<not set: keys live in the environment or a secrets manager, never in code>")
print("API key:", api_key)
''', B('SQL injection, shown safely on a throw-away database', 'SQL injection፣ በሚጣል ዳታቤዝ ላይ በደህንነት የሚታይ')),
 'qa': B(['Attacker input changes the meaning of an SQL query; stop it with parameterised queries (placeholders), never by gluing text into SQL.', 'In environment variables or a secrets manager, outside the code and repository, with access limited and keys rotated.', 'What happened and when (timeline), impact on users, root cause, how it was detected and fixed, and the actions to prevent it again, without blaming individuals.'],
         ['የአጥቂ ግብዓት የSQL query ትርጉምን ይቀይራል፤ በparameterised queries (placeholders) አቁመው፣ ጽሑፍን ከSQL ጋር በማጣበቅ በፍጹም አይሆንም።', 'በenvironment variables ወይም በsecrets manager፣ ከኮዱና ከrepositoryው ውጭ፣ መዳረሻ ተገድቦና ቁልፎች እየተቀየሩ።', 'ምን እና መቼ እንደተፈጠረ (የጊዜ ሰሌዳ)፣ በተጠቃሚዎች ላይ ያለ ተጽዕኖ፣ ዋና ምክንያት፣ እንዴት እንደተለየና እንደተስተካከለ፣ እንዳይደገም የሚወሰዱ እርምጃዎች፣ ግለሰቦችን ሳይወቅስ።'])})
L5.append({
 'why': B('Great engineers build the right thing: what users need and will pay for.', 'ታላላቅ መሐንዲሶች ትክክለኛውን ነገር ይገነባሉ፡ ተጠቃሚዎች የሚያስፈልጋቸውንና የሚከፍሉበትን።'),
 'dg': [flow(B('Product discovery', 'የምርት ግኝት'),
             [N('Field visit', 'የመስክ ጉብኝት', 'watch the work today', 'ዛሬ ያለውን ሥራ ተመልከት'), N('Interviews', 'ቃለ መጠይቆች', 'ask about past behaviour', 'ስላለፈ ባሕሪ ጠይቅ'), N('Spec', 'መግለጫ', 'problem, users, one metric, scope', 'ችግር፣ ተጠቃሚዎች፣ አንድ መለኪያ፣ ወሰን'), N('Small launch → measure', 'ትንሽ ልቀት → ለካ', hl=True)], loop=B('learn and improve', 'ተማርና አሻሽል')),
        compare(B('Prioritise by impact and effort', 'በተጽዕኖና በጥረት ቅድሚያ ስጥ'),
                [col(B('Do first', 'መጀመሪያ አድርግ'), ['high impact, low effort', 'e.g. SMS price alerts'], ['ከፍተኛ ተጽዕኖ፣ ዝቅተኛ ጥረት', 'ለምሳሌ የSMS የዋጋ ማንቂያዎች'], 'good'),
                 col(B('Cut or delay', 'ቁረጥ ወይም አዘግይ'), ['low impact, high effort', 'e.g. a 3D farm view'], ['ዝቅተኛ ተጽዕኖ፣ ከፍተኛ ጥረት', 'ለምሳሌ የ3D የእርሻ እይታ'], 'bad')])],
 'ex': ex_py('''
features = {  # reach (users/month), impact (0.25-3), confidence (0-1), effort (person-weeks)
    "SMS price alerts":        (4000, 2.0, 0.8, 2),
    "Offline mode":            (2500, 2.0, 0.7, 5),
    "Voice input in Amharic":  (1500, 3.0, 0.5, 8),
    "3D farm view":            (300, 0.5, 0.5, 10)}
scores = {name: r * i * c / e for name, (r, i, c, e) in features.items()}     # RICE score
for name, s in sorted(scores.items(), key=lambda kv: -kv[1]):
    print(f"{name:24s} {s:8.0f}")
''', B('Rank features with a RICE score', 'ባሕሪያትን በRICE ውጤት ደርድር'),
     B('Numbers guide the discussion; the team still checks them against what users said in interviews.', 'ቁጥሮች ውይይቱን ይመራሉ፤ ቡድኑ አሁንም በቃለ መጠይቆች ተጠቃሚዎች ካሉት ጋር ያነጻጽራቸዋል።')),
 'qa': B(['People are poor at predicting their own future behaviour but reliable about what they actually did; past behaviour shows real needs and real spending.', 'One number that shows the problem is solved, for example the share of farmers who sell at a better price within a month of signing up.', 'Example: the 3D farm view, because few users need it and it costs ten weeks; it can return if interviews show demand.'],
         ['ሰዎች የራሳቸውን የወደፊት ባሕሪ በመተንበይ ደካማ ናቸው፣ ግን ባደረጉት ነገር ላይ አስተማማኝ ናቸው፤ ያለፈ ባሕሪ እውነተኛ ፍላጎቶችንና እውነተኛ ወጪዎችን ያሳያል።', 'ችግሩ መፈታቱን የሚያሳይ አንድ ቁጥር፣ ለምሳሌ ከተመዘገቡ በአንድ ወር ውስጥ በተሻለ ዋጋ የሚሸጡ ገበሬዎች ድርሻ።', 'ምሳሌ፡ የ3D የእርሻ እይታ፣ ጥቂት ተጠቃሚዎች ስለሚፈልጉትና አሥር ሳምንታት ስለሚያስወጣ፤ ቃለ መጠይቆች ፍላጎት ካሳዩ ሊመለስ ይችላል።'])})
emit(5, L5, 9)
print('levels 3-5 written')
