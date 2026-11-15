from mlib import *
D = ('6 weeks · 4–6 h per week', '6 ሳምንታት · በሳምንት 4–6 ሰዓት')

# ---------------- Grade 9 ----------------
G9 = [
U(('Classes and objects', 'Classes እና objects'), D,
  [('Design a class with attributes and methods', 'ከattributes እና methods ጋር class መንደፍ'), ('Create and use several objects from one class', 'ከአንድ class በርካታ objects መፍጠርና መጠቀም')],
  [('Why objects: bundle data with behaviour', 'ለምን objects፡ ዳታን ከባሕሪ ጋር ማሰር'), ('__init__, self and attributes', '__init__፣ self እና attributes'), ('Methods that change the object', 'objectኡን የሚቀይሩ methods'), ('A Farm class with crops and animals', 'ሰብሎችና እንስሳት ያሉት Farm class')],
  ('Model a cooperative: a Farm class (name, crops, animals, yield records) and a Cooperative class that holds many farms and reports totals.', 'ማኅበርን ሞዴል አድርግ፡ Farm class (ስም፣ ሰብሎች፣ እንስሳት፣ የምርት መዝገቦች) እና ብዙ እርሻዎችን የሚይዝና ድምሮችን የሚዘግብ Cooperative class።'),
  ('Python', 'Python'),
  [('What is the difference between a class and an object?', 'በclass እና በobject መካከል ያለው ልዩነት ምንድነው?', 'The class is the blueprint; each object is one real thing built from it with its own data.', 'classኡ ንድፉ ነው፤ እያንዳንዱ object ከእሱ የተገነባ የራሱ ዳታ ያለው አንድ እውነተኛ ነገር ነው።'),
   ('What is self?', 'self ምንድነው?', 'The object the method is working on, so farm1.add_crop() changes farm1, not farm2.', 'methodኡ የሚሠራበት object፣ ስለዚህ farm1.add_crop() farm1ን ይቀይራል እንጂ farm2ን አይደለም።')],
  [tree(B('Objects inside objects', 'በobjects ውስጥ ያሉ objects'), N('Cooperative "Abay"', 'Cooperative «ዓባይ»'), [{'t': B('Farm "Hana"', 'Farm «ሐና»'), 'kids': [{'t': B('teff 1.6 t, maize 4.2 t', 'ጤፍ 1.6 t፣ በቆሎ 4.2 t')}]}, {'t': B('Farm "Dawit"', 'Farm «ዳዊት»'), 'kids': [{'t': B('teff 1.9 t', 'ጤፍ 1.9 t')}]}])],
  ex_py('''
class Farm:
    def __init__(self, owner):
        self.owner, self.harvest = owner, {}          # attributes
    def record(self, crop, tonnes):                 # a method that changes the object
        self.harvest[crop] = self.harvest.get(crop, 0) + tonnes
class Cooperative:
    def __init__(self, name):
        self.name, self.farms = name, []
    def join(self, farm):
        self.farms.append(farm)
    def total(self, crop):
        return sum(f.harvest.get(crop, 0) for f in self.farms)
coop = Cooperative("Abay")
hana, dawit = Farm("Hana"), Farm("Dawit")
hana.record("teff", 1.6); hana.record("maize", 4.2); dawit.record("teff", 1.9)
coop.join(hana); coop.join(dawit)
print(f"{coop.name}: {len(coop.farms)} farms, teff {coop.total('teff')} t, maize {coop.total('maize')} t")
''', B('A cooperative of farm objects', 'የfarm objects ማኅበር'))),
U(('Testing with pytest', 'በpytest መፈተሽ'), D,
  [('Write automatic tests for functions', 'ለfunctions አውቶማቲክ ፈተናዎችን መጻፍ'), ('Use a failing test to find and fix a bug', 'ስህተትን ለማግኘትና ለማስተካከል የሚወድቅ ፈተና መጠቀም')],
  [('Why test: computers check faster than people', 'ለምን መፈተሽ፡ ኮምፒውተሮች ከሰዎች በፍጥነት ይፈትሻሉ'), ('assert and test_ functions', 'assert እና test_ functions'), ('Run pytest; read the failure', 'pytestን አስኪድ፤ ውድቀቱን አንብብ'), ('Write the test first, then fix', 'መጀመሪያ ፈተናውን ጻፍ፣ ከዚያ አስተካክል')],
  ('A grade function has a hidden bug at 90 marks; write tests for every boundary, find the bug with pytest, fix it and see all tests pass.', 'የውጤት function በ90 ውጤት የተደበቀ ስህተት አለው፤ ለእያንዳንዱ ወሰን ፈተናዎችን ጻፍ፣ ስህተቱን በpytest ፈልግ፣ አስተካክለውና ሁሉም ፈተናዎች ሲያልፉ ተመልከት።'),
  ('Python with pytest', 'Python ከpytest ጋር'),
  [('What does a failing test tell you?', 'የሚወድቅ ፈተና ምን ይነግርሃል?', 'Which input gave which wrong result, so you know where to look.', 'የትኛው ግብዓት የትኛውን የተሳሳተ ውጤት እንደሰጠ፣ ስለዚህ የት እንደምትመለከት ታውቃለህ።'),
   ('Why keep tests after the bug is fixed?', 'ስህተቱ ከተስተካከለ በኋላ ፈተናዎችን ለምን እናቆያለን?', 'They warn you immediately if a later change brings the bug back.', 'በኋላ ያለ ለውጥ ስህተቱን ቢመልሰው ወዲያው ያስጠነቅቁሃል።')],
  [cycle(B('Test, fix, re-test', 'ፈትሽ፣ አስተካክል፣ እንደገና ፈትሽ'), [N('Write a test', 'ፈተና ጻፍ'), N('Run: it fails', 'አስኪድ፡ ይወድቃል', 'red', 'ቀይ'), N('Fix the code', 'ኮዱን አስተካክል'), N('Run: it passes', 'አስኪድ፡ ያልፋል', 'green', 'አረንጓዴ', hl=True)])],
  ex_sh('''
python3 -m pytest -q test_grades.py 2>&1 | tail -4 || true
sed -i 's/mark > 90/mark >= 90/' grades.py          # the fix
echo "--- after the fix ---"
python3 -m pytest -q test_grades.py 2>&1 | tail -1
''', {'grades.py': '''
def grade(mark):
    if mark > 90:      # bug: 90 should be an A
        return "A"
    elif mark >= 80:
        return "B"
    return "C"
''', 'test_grades.py': '''
from grades import grade
def test_boundaries():
    assert grade(100) == "A"
    assert grade(90) == "A"
    assert grade(89) == "B"
    assert grade(79) == "C"
'''}, B('pytest finds the boundary bug, then confirms the fix', 'pytest የወሰን ስህተቱን ያገኛል፣ ከዚያ ማስተካከያውን ያረጋግጣል'))),
U(('Binary and number systems', 'Binary እና የቁጥር ሥርዓቶች'), D,
  [('Convert between decimal, binary and hexadecimal', 'በdecimal፣ binary እና hexadecimal መካከል መቀየር'), ('Explain bits, bytes and why text needs encoding', 'bitsን፣ bytesን እና ጽሑፍ ለምን encoding እንደሚያስፈልገው ማብራራት')],
  [('Place value: 1, 2, 4, 8, 16…', 'የቦታ እሴት፡ 1፣ 2፣ 4፣ 8፣ 16…'), ('Count to 31 on one hand', 'በአንድ እጅ እስከ 31 ቁጠር'), ('Hexadecimal: 0–9, A–F', 'Hexadecimal፡ 0–9፣ A–F'), ('Text as numbers: ASCII and UTF-8 for Ge’ez', 'ጽሑፍ እንደ ቁጥሮች፡ ASCII እና UTF-8 ለግዕዝ')],
  ('Binary bracelets: write each pupil’s initials in 8-bit binary with two colours of beads.', 'የbinary አምባሮች፡ የእያንዳንዱን ተማሪ የስም መጀመሪያ ፊደላት በሁለት ቀለም ዶቃዎች በ8-bit binary ጻፍ።'),
  ('Beads in two colours, string, Python', 'በሁለት ቀለም ዶቃዎች፣ ክር፣ Python'),
  [('What is 1011 in decimal?', '1011 በdecimal ስንት ነው?', '8 + 0 + 2 + 1 = 11.', '8 + 0 + 2 + 1 = 11።'),
   ('Why does an Amharic letter need more bytes than an English letter?', 'የአማርኛ ፊደል ከእንግሊዝኛ ፊደል ለምን ብዙ bytes ያስፈልገዋል?', 'UTF-8 uses 1 byte for basic Latin letters but 3 bytes for Ge’ez characters because their code numbers are larger.', 'UTF-8 ለመሠረታዊ የላቲን ፊደላት 1 byte ይጠቀማል፣ ለግዕዝ ፊደላት ግን 3 bytes፣ የኮድ ቁጥሮቻቸው ስለሚበልጡ።')],
  [stack(B('Place values in binary', 'በbinary ያሉ የቦታ እሴቶች'), [N('8 · 4 · 2 · 1', '8 · 4 · 2 · 1'), N('1  0  1  1', '1  0  1  1'), N('8 + 0 + 2 + 1 = 11', '8 + 0 + 2 + 1 = 11', hl=True)])],
  ex_py('''
for n in [5, 11, 31, 200, 255]:
    print(f"{n:3d} = binary {n:08b} = hex {n:02X}")
print("binary 1011 ->", int("1011", 2))
for ch in ["A", "a", "ሀ", "ጤ"]:
    print(f"{ch!r}: code {ord(ch):5d}, UTF-8 bytes {ch.encode('utf-8').hex(' ')} ({len(ch.encode())} bytes)")
''', B('Converting numbers and seeing text as bytes', 'ቁጥሮችን መቀየርና ጽሑፍን እንደ bytes ማየት'))),
U(('Logic gates', 'Logic gates'), D,
  [('Describe AND, OR, NOT and XOR with truth tables', 'AND፣ OR፣ NOT እና XORን በtruth tables መግለጽ'), ('Build a half adder that adds two bits', 'ሁለት bits የሚደምር half adder መገንባት')],
  [('Switches and a bulb: AND in series, OR in parallel', 'ማብሪያ ማጥፊያዎችና አምፖል፡ AND በተከታታይ፣ OR በትይዩ'), ('Truth tables', 'Truth tables'), ('XOR and the half adder', 'XOR እና half adder'), ('Gates in Python with & | ^', 'Gates በPython በ& | ^')],
  ('Build AND and OR circuits with two switches, a torch bulb and a battery; then write their truth tables and check them in Python.', 'በሁለት ማብሪያ ማጥፊያዎች፣ በባትሪ ድንጋይ አምፖልና በባትሪ AND እና OR circuits ገንባ፤ ከዚያ truth tablesቸውን ጻፍና በPython ፈትሻቸው።'),
  ('2 switches, torch bulb, 3 V battery, wires, Python', '2 ማብሪያ ማጥፊያዎች፣ የባትሪ ድንጋይ አምፖል፣ 3 V ባትሪ፣ ሽቦዎች፣ Python'),
  [('When is A AND B true?', 'A AND B መቼ እውነት ነው?', 'Only when both A and B are true (both switches closed).', 'A እና B ሁለቱም እውነት ሲሆኑ ብቻ (ሁለቱም ማብሪያ ማጥፊያዎች ሲዘጉ)።'),
   ('Which two gates make a half adder?', 'half adder የሚሠሩት የትኞቹ ሁለት gates ናቸው?', 'XOR gives the sum bit and AND gives the carry bit.', 'XOR የድምር bitኡን፣ AND ደግሞ የcarry bitኡን ይሰጣል።')],
  [flow(B('A half adder', 'Half adder'), [N('inputs A, B', 'ግብዓቶች A፣ B'), N('XOR → sum', 'XOR → ድምር'), N('AND → carry', 'AND → carry'), N('1 + 1 = 10 in binary', '1 + 1 = 10 በbinary', hl=True)])],
  ex_py('''
print("A B | AND OR XOR | half adder: carry sum")
for a in (0, 1):
    for b in (0, 1):
        print(f"{a} {b} |  {a & b}   {a | b}   {a ^ b}  |              {a & b}    {a ^ b}")
''', B('Truth tables and a half adder', 'Truth tables እና half adder'))),
U(('CPU and memory: how a program runs', 'CPU እና ማስታወሻ፡ ፕሮግራም እንዴት እንደሚሠራ'), D,
  [('Describe the fetch–decode–execute cycle', 'የfetch–decode–execute ዑደትን መግለጽ'), ('Trace a tiny machine program step by step', 'ትንሽ የማሽን ፕሮግራምን እርምጃ በእርምጃ መከታተል')],
  [('CPU, RAM, storage: what each does', 'CPU፣ RAM፣ ማከማቻ፡ እያንዳንዱ የሚያደርገው'), ('Registers and the program counter', 'Registers እና program counter'), ('Fetch, decode, execute', 'Fetch፣ decode፣ execute'), ('Simulate a tiny CPU in Python', 'ትንሽ CPUን በPython አስመስል')],
  ('Role-play a CPU: one pupil is the program counter, one the memory, one the ALU; run a 5-instruction program on paper.', 'CPUን ተውኑ፡ አንድ ተማሪ program counter፣ አንዱ ማስታወሻ፣ አንዱ ALU ይሆናል፤ ባለ 5 መመሪያ ፕሮግራምን በወረቀት ላይ አስኪዱ።'),
  ('Paper cards, Python', 'የወረቀት ካርዶች፣ Python'),
  [('What does the program counter hold?', 'program counter ምን ይይዛል?', 'The memory address of the next instruction to fetch.', 'ቀጥሎ የሚመጣው መመሪያ የማስታወሻ አድራሻ።'),
   ('Why is RAM faster than storage but lost when power goes off?', 'RAM ከማከማቻ ለምን ፈጣን ሆኖ ኃይል ሲጠፋ ይጠፋል?', 'RAM keeps data in electric charge for quick access; it needs power. Storage (SSD, disk) keeps data without power but is slower.', 'RAM ለፈጣን መዳረሻ ዳታን በኤሌክትሪክ ኃይል ያቆያል፤ ኃይል ያስፈልገዋል። ማከማቻ (SSD፣ disk) ያለ ኃይል ዳታን ያቆያል ግን ቀርፋፋ ነው።')],
  [cycle(B('The instruction cycle', 'የመመሪያ ዑደት'), [N('Fetch', 'Fetch', 'read instruction at PC', 'በPC ያለውን መመሪያ አንብብ'), N('Decode', 'Decode', 'what does it mean?', 'ምን ማለት ነው?'), N('Execute', 'Execute', 'ALU adds, memory stores', 'ALU ይደምራል፣ ማስታወሻ ያስቀምጣል'), N('PC + 1', 'PC + 1', hl=True)])],
  ex_py('''
program = [("LOAD", 7), ("ADD", 5), ("STORE", "x"), ("ADD", 1), ("PRINT", None)]   # a tiny machine language
acc, pc, memory = 0, 0, {}
while pc < len(program):
    op, arg = program[pc]                         # fetch + decode
    if op == "LOAD": acc = arg                    # execute
    elif op == "ADD": acc += arg
    elif op == "STORE": memory[arg] = acc
    elif op == "PRINT": print("output:", acc)
    print(f"PC={pc} {op:5s} {str(arg):4s} -> ACC={acc} memory={memory}")
    pc += 1
''', B('A tiny CPU, step by step', 'ትንሽ CPU፣ እርምጃ በእርምጃ'))),
U(('NumPy and pandas: data basics', 'NumPy እና pandas፡ የዳታ መሠረታዊ ነገሮች'), D,
  [('Load a CSV into a DataFrame and summarise it', 'CSVን ወደ DataFrame መጫንና ማጠቃለል'), ('Filter, group and sort data', 'ዳታን ማጣራት፣ በቡድን መከፋፈልና መደርደር')],
  [('NumPy arrays: fast maths on many numbers', 'NumPy arrays፡ በብዙ ቁጥሮች ላይ ፈጣን ሒሳብ'), ('pandas: read_csv, head, describe', 'pandas፡ read_csv፣ head፣ describe'), ('Filter rows, select columns', 'ረድፎችን አጣራ፣ ዓምዶችን ምረጥ'), ('groupby and mean: yield by crop', 'groupby እና mean፡ ምርት በሰብል')],
  ('Collect yields from 10 local farms (or use the sample data), load them into pandas and answer: which crop yields most per hectare, and which farm is above average?', 'ከ10 የአካባቢ እርሻዎች ምርትን ሰብስብ (ወይም የናሙና ዳታውን ተጠቀም)፣ ወደ pandas ጫንና መልስ፡ የትኛው ሰብል በሄክታር ብዙ ምርት ይሰጣል፣ የትኛውስ እርሻ ከአማካይ በላይ ነው?'),
  ('Python with pandas', 'Python ከpandas ጋር'),
  [('How do you find the average of a column in pandas?', 'በpandas የአንድን ዓምድ አማካይ እንዴት ታገኛለህ?', 'df["column"].mean(), or df.groupby("crop")["column"].mean() for each group.', 'df["column"].mean()፣ ወይም ለእያንዳንዱ ቡድን df.groupby("crop")["column"].mean()።'),
   ('Why are NumPy arrays faster than Python lists for maths?', 'ለሒሳብ NumPy arrays ከPython lists ለምን ፈጣን ናቸው?', 'They store numbers in one block of memory and do the maths in compiled code, on all numbers at once.', 'ቁጥሮችን በአንድ የማስታወሻ ብሎክ ያስቀምጣሉ፣ ሒሳቡንም በተጠናቀረ ኮድ በሁሉም ቁጥሮች ላይ በአንድ ጊዜ ይሠራሉ።')],
  [flow(B('A pandas analysis', 'የpandas ትንተና'), [N('read_csv', 'read_csv'), N('clean / filter', 'አጽዳ / አጣራ'), N('groupby + mean', 'groupby + mean'), N('answer + chart', 'መልስ + ቻርት', hl=True)])],
  ex_py('''
import io
import pandas as pd
csv = """farm,crop,area_ha,harvest_t
Hana,teff,0.5,0.8
Dawit,teff,1.0,1.9
Liya,maize,0.8,3.6
Abebe,maize,0.4,1.5
Sara,teff,0.6,0.9
Tsion,barley,0.5,1.1"""
df = pd.read_csv(io.StringIO(csv))
df["t_per_ha"] = (df.harvest_t / df.area_ha).round(2)
print(df.groupby("crop").t_per_ha.mean().round(2).sort_values(ascending=False))
avg = df.t_per_ha.mean()
print(f"average {avg:.2f} t/ha; above average:", df[df.t_per_ha > avg].farm.tolist())
''', B('Yield per hectare by crop and farm', 'ምርት በሄክታር በሰብልና በእርሻ'))),
]

# ---------------- Grade 10 ----------------
G10 = [
U(('JavaScript basics', 'የJavaScript መሠረታዊ ነገሮች'), D,
  [('Use variables, arrays, objects and functions in JavaScript', 'በJavaScript variablesን፣ arraysን፣ objectsን እና functionsን መጠቀም'), ('Loop over data with for and array methods', 'በfor እና በarray methods በዳታ ላይ loop ማድረግ')],
  [('let/const, numbers, strings, booleans', 'let/const፣ ቁጥሮች፣ strings፣ booleans'), ('Arrays and objects (like lists and dictionaries)', 'Arrays እና objects (እንደ lists እና dictionaries)'), ('Functions and arrow functions', 'Functions እና arrow functions'), ('map, filter, reduce', 'map፣ filter፣ reduce')],
  ('Rewrite your Grade 9 yield analysis in JavaScript with an array of farm objects and map/filter/reduce.', 'የ9ኛ ክፍል የምርት ትንተናህን በJavaScript ከfarm objects array እና ከmap/filter/reduce ጋር እንደገና ጻፍ።'),
  ('Node.js or a browser console', 'Node.js ወይም የአሳሽ console'),
  [('What does filter return?', 'filter ምን ይመልሳል?', 'A new array with only the items for which the test function returns true.', 'የፈተና functionኡ true የሚመልስላቸውን ንጥሎች ብቻ የያዘ አዲስ array።'),
   ('How is a JavaScript object like a Python dictionary?', 'የJavaScript object እንዴት የPython dictionaryን ይመስላል?', 'Both store key–value pairs: farm.crop or farm["crop"].', 'ሁለቱም የkey–value ጥንዶችን ያስቀምጣሉ፡ farm.crop ወይም farm["crop"]።')],
  [flow(B('Array methods in a chain', 'የarray methods በሰንሰለት'), [N('farms', 'farms'), N('.filter(teff only)', '.filter(ጤፍ ብቻ)'), N('.map(t per ha)', '.map(t በha)'), N('.reduce(sum) / n', '.reduce(ድምር) / n', hl=True)])],
  ex_js('''
const farms = [
  {farm: "Hana", crop: "teff", area: 0.5, harvest: 0.8},
  {farm: "Dawit", crop: "teff", area: 1.0, harvest: 1.9},
  {farm: "Liya", crop: "maize", area: 0.8, harvest: 3.6},
  {farm: "Sara", crop: "teff", area: 0.6, harvest: 0.9},
];
const teff = farms.filter(f => f.crop === "teff");
const yields = teff.map(f => f.harvest / f.area);
const mean = yields.reduce((a, b) => a + b, 0) / yields.length;
console.log("teff yields (t/ha):", yields.map(y => y.toFixed(2)).join(", "));
console.log(`mean teff yield: ${mean.toFixed(2)} t/ha`);
''', B('Yield analysis with map, filter and reduce', 'በmap፣ filter እና reduce የምርት ትንተና'))),
U(('The DOM: change a page with code', 'DOM፡ ገጽን በኮድ መቀየር'), D,
  [('Select elements and change their text and style', 'elementsን መምረጥና ጽሑፋቸውንና ዘይቤያቸውን መቀየር'), ('Respond to clicks and form input', 'ለጠቅታዎችና ለቅጽ ግብዓት ምላሽ መስጠት')],
  [('The page as a tree of elements', 'ገጹ እንደ elements ዛፍ'), ('querySelector, textContent, classList', 'querySelector፣ textContent፣ classList'), ('Events: click, input, submit', 'ክስተቶች፡ click፣ input፣ submit'), ('Build a notice board that adds and sorts notices', 'ማስታወቂያዎችን የሚጨምርና የሚደረድር የማስታወቂያ ሰሌዳ ገንባ')],
  ('Make a school notice board page: a form adds a notice with a date; notices appear sorted by date, newest first.', 'የትምህርት ቤት የማስታወቂያ ሰሌዳ ገጽ ሥራ፡ ቅጽ ከቀን ጋር ማስታወቂያ ይጨምራል፤ ማስታወቂያዎች በቀን ተደርድረው፣ አዲሱ መጀመሪያ ይታያሉ።'),
  ('Browser, text editor', 'አሳሽ፣ የጽሑፍ አርታኢ'),
  [('What is the DOM?', 'DOM ምንድነው?', 'The browser’s tree of objects for every element on the page, which JavaScript can read and change.', 'በገጹ ላይ ላለው እያንዳንዱ element የአሳሹ የobjects ዛፍ፣ JavaScript ሊያነበውና ሊቀይረው የሚችል።'),
   ('Why use textContent instead of innerHTML for user text?', 'ለተጠቃሚ ጽሑፍ ከinnerHTML ይልቅ textContent ለምን እንጠቀማለን?', 'textContent shows text as text, so a user cannot inject HTML or scripts into the page.', 'textContent ጽሑፍን እንደ ጽሑፍ ያሳያል፤ ስለዚህ ተጠቃሚ HTML ወይም scripts ወደ ገጹ ማስገባት አይችልም።')],
  [tree(B('The page as a tree', 'ገጹ እንደ ዛፍ'), N('html', 'html'), [{'t': B('head', 'head'), 'kids': [{'t': B('title', 'title')}]}, {'t': B('body', 'body'), 'kids': [{'t': B('form#add', 'form#add')}, {'t': B('ul#notices', 'ul#notices')}]}])],
  ex_js('''
// The sorting and rendering logic, tested in Node.js
const notices = [];
function addNotice(date, text) {
  notices.push({date, text});
  notices.sort((a, b) => b.date.localeCompare(a.date));      // newest first
}
addNotice("2026-11-10", "Science fair entries due");
addNotice("2026-11-14", "Parents' meeting on Friday");
addNotice("2026-11-03", "Library open on Saturday");
notices.forEach(n => console.log(`${n.date}  ${n.text}`));
// In the page: form.addEventListener("submit", e => { e.preventDefault(); addNotice(d.value, t.value); render(); });
// render() clears ul#notices and adds one <li> per notice using textContent.
''', B('Notice-board logic', 'የማስታወቂያ ሰሌዳ ሎጂክ'), B('Keep logic in functions you can test, and keep DOM code thin.', 'ሎጂክን ልትፈትሻቸው በምትችላቸው functions ውስጥ አቆይ፣ የDOM ኮድን ቀጭን አድርግ።'))),
U(('Git and GitHub', 'Git እና GitHub'), D,
  [('Track changes with commits and branches', 'ለውጦችን በcommits እና branches መከታተል'), ('Collaborate with push, pull requests and merges', 'በpush፣ pull requests እና merges መተባበር')],
  [('init, add, commit, log', 'init፣ add፣ commit፣ log'), ('Branches for new features', 'ለአዳዲስ ባሕሪያት branches'), ('Merge and resolve a conflict', 'አዋህድና ግጭትን ፍታ'), ('GitHub: push, pull request, review', 'GitHub፡ push፣ pull request፣ review')],
  ('Put your notice board on GitHub; a partner adds a feature on a branch and opens a pull request that you review and merge.', 'የማስታወቂያ ሰሌዳህን በGitHub ላይ አስቀምጥ፤ አጋርህ በbranch ላይ ባሕሪ ጨምሮ አንተ የምትገመግመውና የምታዋህደው pull request ይከፍታል።'),
  ('Git, a free GitHub account', 'Git፣ ነጻ የGitHub መለያ'),
  [('What does git commit do?', 'git commit ምን ያደርጋል?', 'Saves a snapshot of the staged changes with a message in the project history.', 'የተዘጋጁትን ለውጦች ፎቶ ከመልእክት ጋር በፕሮጀክቱ ታሪክ ውስጥ ያስቀምጣል።'),
   ('Why work on a branch?', 'በbranch ላይ ለምን እንሠራለን?', 'So unfinished work does not break the main version; it is merged only after review.', 'ያልተጠናቀቀ ሥራ ዋናውን ስሪት እንዳያበላሸው፤ የሚዋሃደው ከግምገማ በኋላ ብቻ ነው።')],
  [flow(B('The branch workflow', 'የbranch የሥራ ፍሰት'), [N('main', 'main'), N('git switch -c dark-mode', 'git switch -c dark-mode'), N('commit, commit', 'commit፣ commit'), N('pull request + review', 'pull request + ግምገማ'), N('merge into main', 'ወደ main አዋህድ', hl=True)])],
  ex_sh('''
git init -q board && cd board
git config user.email "pupil@school.et" && git config user.name "Pupil"
echo "Notice board" > README.md && git add README.md && git commit -qm "Start the notice board"
git switch -q -c dark-mode
echo "body { background: #111; color: #eee; }" > style.css && git add style.css && git commit -qm "Add dark mode"
git switch -q main && git merge -q dark-mode
git log --oneline --graph | sed 's/^\\* [0-9a-f]\\{7\\}/* <id>/'
ls
''', title=B('A branch, a commit and a merge', 'branch፣ commit እና merge'))),
U(('Searching and sorting', 'መፈለግና መደርደር'), D,
  [('Implement linear and binary search', 'linear እና binary searchን መተግበር'), ('Compare bubble sort and merge sort by counting steps', 'bubble sortን እና merge sortን እርምጃዎችን በመቁጠር ማወዳደር')],
  [('Linear search', 'Linear search'), ('Binary search on sorted data', 'በተደረደረ ዳታ ላይ binary search'), ('Bubble sort', 'Bubble sort'), ('Merge sort: divide and conquer', 'Merge sort፡ ከፋፍለህ አሸንፍ')],
  ('Unplugged: sort 16 pupils by height with bubble sort, then with merge sort in groups; count comparisons for each.', 'ያለ ኮምፒውተር፡ 16 ተማሪዎችን በቁመት በbubble sort ደርድሩ፣ ከዚያ በቡድን በmerge sort፤ ለእያንዳንዱ ንጽጽሮችን ቁጠሩ።'),
  ('Python, the class itself', 'Python፣ ክፍሉ ራሱ'),
  [('Why is binary search faster than linear search?', 'binary search ከlinear search ለምን ፈጣን ነው?', 'Each check throws away half of what is left, so a million sorted items need about 20 checks.', 'እያንዳንዱ ፍተሻ የቀረውን ግማሽ ይጥላል፤ ስለዚህ አንድ ሚሊዮን የተደረደሩ ንጥሎች ወደ 20 ፍተሻዎች ገደማ ያስፈልጋቸዋል።'),
   ('Why does merge sort beat bubble sort on big lists?', 'በትላልቅ ዝርዝሮች merge sort ለምን bubble sortን ያሸንፋል?', 'Merge sort needs about n·log n comparisons; bubble sort about n², which grows much faster.', 'merge sort ወደ n·log n ንጽጽሮች ያስፈልገዋል፤ bubble sort ወደ n²፣ ይህም በጣም በፍጥነት ያድጋል።')],
  [compare(B('Two ways to sort', 'ለመደርደር ሁለት መንገዶች'), [col(B('Bubble sort', 'Bubble sort'), ['swap neighbours again and again', '≈ n² comparisons'], ['ጎረቤቶችን ደጋግመህ አቀያይር', '≈ n² ንጽጽሮች'], 'bad'), col(B('Merge sort', 'Merge sort'), ['split in halves, sort, merge', '≈ n log n comparisons'], ['በግማሽ ክፈል፣ ደርድር፣ አዋህድ', '≈ n log n ንጽጽሮች'], 'good')])],
  ex_py('''
import random
def bubble(a):
    a, c = a[:], 0
    for i in range(len(a)):
        for j in range(len(a) - 1 - i):
            c += 1
            if a[j] > a[j + 1]: a[j], a[j + 1] = a[j + 1], a[j]
    return a, c
def merge_sort(a):
    if len(a) <= 1: return a, 0
    l, cl = merge_sort(a[:len(a) // 2]); r, cr = merge_sort(a[len(a) // 2:])
    out, c, i, j = [], cl + cr, 0, 0
    while i < len(l) and j < len(r):
        c += 1
        if l[i] <= r[j]: out.append(l[i]); i += 1
        else: out.append(r[j]); j += 1
    return out + l[i:] + r[j:], c
random.seed(0)
for n in [16, 256, 2048]:
    data = random.sample(range(10 * n), n)
    b, cb = bubble(data); m, cm = merge_sort(data)
    assert b == m == sorted(data)
    print(f"n = {n:5d}: bubble {cb:9,d} comparisons | merge {cm:6,d}")
''', B('Counting comparisons: bubble vs merge sort', 'ንጽጽሮችን መቁጠር፡ bubble vs merge sort'))),
U(('Big-O: why programs slow down', 'Big-O፡ ፕሮግራሞች ለምን ይቀዘቅዛሉ'), D,
  [('Describe growth with O(1), O(log n), O(n), O(n²)', 'ዕድገትን በO(1)፣ O(log n)፣ O(n)፣ O(n²) መግለጽ'), ('Predict running time for bigger data', 'ለትልቅ ዳታ የሩጫ ጊዜን መተንበይ')],
  [('Count operations, not seconds', 'ሰከንዶችን ሳይሆን ተግባራትን ቁጠር'), ('Common growth rates', 'የተለመዱ የዕድገት መጠኖች'), ('Nested loops are often O(n²)', 'የተደራረቡ loops ብዙውን ጊዜ O(n²) ናቸው'), ('Choose the right data structure: set vs list', 'ትክክለኛውን data structure ምረጥ፡ set vs list')],
  ('Time two ways of finding duplicate phone numbers in a list of 20,000: a double loop vs a set; predict and measure the difference.', 'በ20,000 ዝርዝር ውስጥ የተደጋገሙ የስልክ ቁጥሮችን የማግኛ ሁለት መንገዶችን ጊዜ ለካ፡ ድርብ loop vs set፤ ልዩነቱን ተንብይና ለካ።'),
  ('Python', 'Python'),
  [('If an O(n²) program takes 1 second for 1,000 items, about how long for 10,000?', 'O(n²) ፕሮግራም ለ1,000 ንጥሎች 1 ሰከንድ ቢወስድ ለ10,000 ገደማ ስንት ይወስዳል?', 'About 100 seconds: 10 times more data, 10² = 100 times more work.', 'ወደ 100 ሰከንድ ገደማ፡ 10 እጥፍ ዳታ፣ 10² = 100 እጥፍ ሥራ።'),
   ('Why is "x in a_set" faster than "x in a_list"?', '«x in a_set» ከ«x in a_list» ለምን ፈጣን ነው?', 'A set uses hashing to jump straight to where x would be (about O(1)); a list checks items one by one (O(n)).', 'set x ሊኖርበት ወደሚችልበት በቀጥታ ለመዝለል hashing ይጠቀማል (ወደ O(1))፤ list ንጥሎችን አንድ በአንድ ይፈትሻል (O(n))።')],
  [stack(B('Growth rates for n = 1,000,000', 'ለn = 1,000,000 የዕድገት መጠኖች'), [N('O(1): 1 step', 'O(1)፡ 1 እርምጃ', 'look up in a set', 'በset ውስጥ መፈለግ'), N('O(log n): ~20 steps', 'O(log n)፡ ~20 እርምጃዎች', 'binary search', 'binary search'), N('O(n): 1 million steps', 'O(n)፡ 1 ሚሊዮን እርምጃዎች', 'one loop', 'አንድ loop'), N('O(n²): 1 trillion steps', 'O(n²)፡ 1 ትሪሊዮን እርምጃዎች', 'double loop: too slow', 'ድርብ loop፡ በጣም ቀርፋፋ')])],
  ex_py('''
import random, time
random.seed(2)
phones = [f"09{random.randint(10_000_000, 99_999_999)}" for _ in range(3000)] + ["0911223344"] * 2
def dup_double_loop(xs):
    return {x for i, x in enumerate(xs) for y in xs[i + 1:] if x == y}
def dup_set(xs):
    seen, dups = set(), set()
    for x in xs:
        (dups if x in seen else seen).add(x)
    return dups
for f in (dup_double_loop, dup_set):
    t = time.perf_counter(); d = f(phones); ms = (time.perf_counter() - t) * 1000
    print(f"{f.__name__:16s} found {sorted(d)} in about {ms:.0f} ms" if ms >= 1 else f"{f.__name__:16s} found {sorted(d)} in under 1 ms")
''', B('O(n²) vs O(n) on 3,002 phone numbers', 'O(n²) vs O(n) በ3,002 የስልክ ቁጥሮች'), B('Times depend on the computer; the gap grows with n² vs n.', 'ጊዜዎቹ በኮምፒውተሩ ላይ ይወሰናሉ፤ ልዩነቱ ከn² vs n ጋር ያድጋል።'))),
U(('Recursion and charts', 'Recursion እና ቻርቶች'), D,
  [('Write recursive functions with a base case', 'ከbase case ጋር recursive functions መጻፍ'), ('Make clear charts of real data with matplotlib', 'በmatplotlib የእውነተኛ ዳታ ግልጽ ቻርቶችን መሥራት')],
  [('Recursion: a function calling itself', 'Recursion፡ ራሱን የሚጠራ function'), ('Base case and recursive case', 'Base case እና recursive case'), ('Folder sizes: a natural recursion', 'የፎልደር መጠኖች፡ ተፈጥሯዊ recursion'), ('matplotlib: line and bar charts with labels', 'matplotlib፡ ምልክት ያላቸው የመስመርና የአሞሌ ቻርቶች')],
  ('Plot 10 years of rainfall for your zone (from the meteorology office or a sample file) with a title, axis labels and units, and write two sentences about the trend.', 'የዞንህን የ10 ዓመታት የዝናብ መጠን (ከሚቲዎሮሎጂ ቢሮ ወይም ከናሙና ፋይል) ከርዕስ፣ ከaxis ምልክቶችና ከመለኪያዎች ጋር ቻርት አድርግ፣ ስለ አዝማሚያው ሁለት ዓረፍተ ነገሮች ጻፍ።'),
  ('Python with matplotlib', 'Python ከmatplotlib ጋር'),
  [('What is the base case in recursion?', 'በrecursion ውስጥ base case ምንድነው?', 'The simplest input that is answered directly, which stops the function from calling itself forever.', 'በቀጥታ የሚመለስ በጣም ቀላሉ ግብዓት፣ functionኡ ራሱን ለዘላለም እንዳይጠራ የሚያቆመው።'),
   ('What must every chart have?', 'እያንዳንዱ ቻርት ምን ሊኖረው ይገባል?', 'A title, labelled axes with units, and a source for the data.', 'ርዕስ፣ ከመለኪያዎች ጋር ምልክት ያላቸው axes፣ እና የዳታው ምንጭ።')],
  [tree(B('Recursion on folders', 'በፎልደሮች ላይ recursion'), N('size(project) = 13 MB', 'size(project) = 13 MB'), [{'t': B('size(photos) = 9 MB', 'size(photos) = 9 MB'), 'kids': [{'t': B('2020/ = 4 MB', '2020/ = 4 MB')}, {'t': B('2021/ = 5 MB', '2021/ = 5 MB')}]}, {'t': B('size(docs) = 4 MB', 'size(docs) = 4 MB'), 'kids': [{'t': B('base case: a file', 'base case፡ ፋይል')}]}])],
  ex_py('''
def size(item):                          # item: a number (file size) or a dict (folder)
    if isinstance(item, int):            # base case: a file
        return item
    return sum(size(child) for child in item.values())    # recursive case: a folder
project = {"photos": {"2020": {"a.jpg": 2, "b.jpg": 2}, "2021": {"c.jpg": 5}}, "docs": {"report.pdf": 4}}
print("project size:", size(project), "MB")

import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
years = list(range(2016, 2026)); rain = [1150, 1320, 1080, 1260, 1390, 1010, 1230, 1180, 1300, 1120]
fig, ax = plt.subplots(figsize=(6, 3))
ax.plot(years, rain, marker="o"); ax.set_title("Annual rainfall (sample data)")
ax.set_xlabel("Year"); ax.set_ylabel("Rainfall (mm)")
fig.savefig("rainfall.png", dpi=120, bbox_inches="tight")
print(f"chart saved: rainfall.png | wettest {years[rain.index(max(rain))]} ({max(rain)} mm), driest {years[rain.index(min(rain))]} ({min(rain)} mm)")
''', B('Recursive folder sizes and a labelled rainfall chart', 'recursive የፎልደር መጠኖችና ምልክት ያለው የዝናብ ቻርት'), B('The rainfall numbers are sample data for practice; use your zone’s records in class.', 'የዝናብ ቁጥሮቹ ለልምምድ የናሙና ዳታ ናቸው፤ በክፍል ውስጥ የዞንህን መዝገቦች ተጠቀም።'))),
]

# ---------------- Grade 11 ----------------
G11 = [
U(('HTTP and REST', 'HTTP እና REST'), D,
  [('Explain requests, methods and status codes', 'requestsን፣ methodsን እና status codesን ማብራራት'), ('Design REST URLs for a resource', 'ለresource የREST URLs መንደፍ')],
  [('Request = method + URL + headers + body', 'Request = method + URL + headers + body'), ('GET, POST, PUT, DELETE', 'GET፣ POST፣ PUT፣ DELETE'), ('Status codes: 200, 201, 400, 404, 500', 'Status codes፡ 200፣ 201፣ 400፣ 404፣ 500'), ('Design: /markets/3/prices', 'ንድፍ፡ /markets/3/prices')],
  ('Design the API for a market-price service on paper: list each URL, method, example request and example JSON reply.', 'ለየገበያ ዋጋ አገልግሎት APIውን በወረቀት ላይ ንደፍ፡ እያንዳንዱን URL፣ method፣ የምሳሌ ጥያቄና የምሳሌ JSON መልስ ዘርዝር።'),
  ('Paper, a browser’s developer tools', 'ወረቀት፣ የአሳሽ የገንቢ መሣሪያዎች'),
  [('What does a 404 status code mean?', '404 status code ምን ማለት ነው?', 'Not found: the server works, but nothing exists at that URL.', 'አልተገኘም፡ ሰርቨሩ ይሠራል፣ ግን በዚያ URL ምንም የለም።'),
   ('When do you use POST instead of GET?', 'ከGET ይልቅ POSTን መቼ ትጠቀማለህ?', 'To create something new (send data); GET only reads and must not change anything.', 'አዲስ ነገር ለመፍጠር (ዳታ ለመላክ)፤ GET የሚያነበው ብቻ ነው፣ ምንም መቀየር የለበትም።')],
  [stack(B('Status code families', 'የstatus code ቤተሰቦች'), [N('2xx success', '2xx ስኬት', '200 OK, 201 Created', '200 OK፣ 201 Created'), N('3xx redirect', '3xx አቅጣጫ መቀየር'), N('4xx your mistake', '4xx የአንተ ስህተት', '400 bad request, 404 not found', '400 የተሳሳተ ጥያቄ፣ 404 አልተገኘም'), N('5xx server problem', '5xx የሰርቨር ችግር', '500 internal error', '500 የውስጥ ስህተት')])],
  ex_py('''
from http import HTTPStatus
for code in [200, 201, 400, 401, 404, 500]:
    print(code, HTTPStatus(code).phrase)
design = [("GET", "/markets", "list markets"), ("GET", "/markets/3/prices?crop=teff", "teff prices in market 3"),
          ("POST", "/markets/3/prices", "a trader reports a new price -> 201 Created"), ("GET", "/markets/99", "no such market -> 404")]
for method, url, meaning in design:
    print(f"{method:5s} {url:32s} {meaning}")
''', B('Status codes and a REST design', 'Status codes እና የREST ንድፍ'))),
U(('A small API with Flask', 'በFlask ትንሽ API'), D,
  [('Build API routes that return JSON', 'JSON የሚመልሱ API routes መገንባት'), ('Test the API automatically', 'APIውን በራስ-ሰር መፈተሽ')],
  [('Flask app and @app.get routes', 'የFlask መተግበሪያና @app.get routes'), ('Return JSON with jsonify', 'በjsonify JSON መልስ'), ('Validate input; return 400 or 404', 'ግብዓትን አረጋግጥ፤ 400 ወይም 404 መልስ'), ('Test with the test client', 'በtest client ፈትሽ')],
  ('Build the market-price API you designed: GET prices by crop and POST a new price, with input checks and tests.', 'የነደፍከውን የገበያ ዋጋ API ገንባ፡ በሰብል ዋጋዎችን GET እና አዲስ ዋጋ POST፣ ከግብዓት ፍተሻዎችና ከፈተናዎች ጋር።'),
  ('Python with Flask', 'Python ከFlask ጋር'),
  [('What does a route do?', 'route ምን ያደርጋል?', 'It connects a URL and method to a Python function that builds the response.', 'URLን እና methodን ምላሹን ከሚገነባ የPython function ጋር ያገናኛል።'),
   ('Why return 400 for a negative price?', 'ለአሉታዊ ዋጋ ለምን 400 እንመልሳለን?', 'The client sent invalid data; 400 tells it the request must be fixed, and bad data never reaches the database.', 'ደንበኛው የተሳሳተ ዳታ ልኳል፤ 400 ጥያቄው መስተካከል እንዳለበት ይነግረዋል፣ መጥፎ ዳታም ወደ ዳታቤዙ በፍጹም አይደርስም።')],
  [flow(B('Inside the API', 'በAPIው ውስጥ'), [N('GET /prices?crop=teff', 'GET /prices?crop=teff'), N('route function', 'route function'), N('look up data', 'ዳታ ፈልግ'), N('jsonify(...) + status', 'jsonify(...) + status', hl=True)])],
  ex_py('''
from flask import Flask, jsonify, request
app = Flask(__name__)
PRICES = [{"market": "Bahir Dar", "crop": "teff", "birr_per_kg": 118}, {"market": "Gondar", "crop": "maize", "birr_per_kg": 38}]

@app.get("/prices")
def get_prices():
    crop = request.args.get("crop")
    rows = [p for p in PRICES if crop is None or p["crop"] == crop]
    return (jsonify(rows), 200) if rows else (jsonify(error=f"no prices for {crop}"), 404)

@app.post("/prices")
def add_price():
    p = request.get_json()
    if not p or p.get("birr_per_kg", -1) <= 0:
        return jsonify(error="birr_per_kg must be a positive number"), 400
    PRICES.append(p); return jsonify(p), 201

client = app.test_client()                      # automatic tests, no server needed
r = client.get("/prices?crop=teff"); print(r.status_code, r.get_json())
r = client.get("/prices?crop=coffee"); print(r.status_code, r.get_json())
r = client.post("/prices", json={"market": "Dessie", "crop": "teff", "birr_per_kg": -5}); print(r.status_code, r.get_json())
r = client.post("/prices", json={"market": "Dessie", "crop": "teff", "birr_per_kg": 121}); print(r.status_code, r.get_json())
''', B('A market-price API, tested with Flask’s test client', 'የገበያ ዋጋ API፣ በFlask test client የተፈተነ'))),
U(('Stacks and queues', 'Stacks እና queues'), D,
  [('Use a stack (LIFO) and a queue (FIFO)', 'stack (LIFO) እና queue (FIFO) መጠቀም'), ('Choose the right one for a problem', 'ለአንድ ችግር ትክክለኛውን መምረጥ')],
  [('Stack: push and pop; undo', 'Stack፡ push እና pop፤ undo'), ('Queue: enqueue and dequeue; waiting lines', 'Queue፡ enqueue እና dequeue፤ የወረፋ መስመሮች'), ('Check balanced brackets with a stack', 'በstack የተመጣጠኑ ቅንፎችን ፈትሽ'), ('Simulate a clinic queue', 'የክሊኒክ ወረፋን አስመስል')],
  ('Simulate a health-centre queue with a deque: patients arrive, are served in order, and you report average waiting time.', 'በdeque የጤና ጣቢያ ወረፋ አስመስል፡ ታካሚዎች ይመጣሉ፣ በቅደም ተከተል ይስተናገዳሉ፣ አንተ አማካይ የመጠበቂያ ጊዜን ትዘግባለህ።'),
  ('Python', 'Python'),
  [('When is a queue better than a stack?', 'queue ከstack መቼ የተሻለ ነው?', 'When the first to arrive must be the first served, such as patients, print jobs or messages.', 'መጀመሪያ የደረሰ መጀመሪያ መስተናገድ ሲኖርበት፣ እንደ ታካሚዎች፣ የህትመት ሥራዎች ወይም መልእክቶች።'),
   ('How does a stack check brackets?', 'stack ቅንፎችን እንዴት ይፈትሻል?', 'Push each opening bracket; each closing bracket must match the top one, which is popped; at the end the stack must be empty.', 'እያንዳንዱን የመክፈቻ ቅንፍ push አድርግ፤ እያንዳንዱ የመዝጊያ ቅንፍ ከላይኛው ጋር መመሳሰል አለበት፣ እሱም pop ይደረጋል፤ በመጨረሻ stackኡ ባዶ መሆን አለበት።')],
  [compare(B('LIFO vs FIFO', 'LIFO vs FIFO'), [col(B('Stack (LIFO)', 'Stack (LIFO)'), ['plates in a pile', 'last in, first out'], ['የተደራረቡ ሳህኖች', 'መጨረሻ የገባ፣ መጀመሪያ ይወጣል']), col(B('Queue (FIFO)', 'Queue (FIFO)'), ['line at the bank', 'first in, first out'], ['በባንክ ያለ ወረፋ', 'መጀመሪያ የገባ፣ መጀመሪያ ይወጣል'], 'good')])],
  ex_py('''
from collections import deque
def balanced(text):
    pairs, stack = {")": "(", "]": "[", "}": "{"}, []
    for ch in text:
        if ch in "([{": stack.append(ch)
        elif ch in ")]}":
            if not stack or stack.pop() != pairs[ch]: return False
    return not stack
print([balanced(s) for s in ["(a[b]{c})", "(a[b)]", "((x)"]])

arrivals = [0, 2, 3, 5, 6, 6, 9]          # minutes when patients arrive
service = 3                                # minutes per patient
queue, clock, waits = deque(arrivals), 0, []
while queue:
    t = queue.popleft()                    # first in, first out
    start = max(clock, t); waits.append(start - t); clock = start + service
print("waits (min):", waits, "| average:", round(sum(waits) / len(waits), 1))
''', B('Bracket checker (stack) and a clinic queue (queue)', 'የቅንፍ ፈታሽ (stack) እና የክሊኒክ ወረፋ (queue)'))),
U(('Trees and graphs', 'Trees እና graphs'), D,
  [('Represent trees and graphs in code', 'treesን እና graphsን በኮድ መወከል'), ('Find shortest routes with breadth-first search', 'በbreadth-first search አጭር መንገዶችን መፈለግ')],
  [('Trees: family trees, folders', 'Trees፡ የቤተሰብ ዛፎች፣ ፎልደሮች'), ('Graphs: towns and roads', 'Graphs፡ ከተሞችና መንገዶች'), ('Adjacency lists in a dictionary', 'በdictionary ውስጥ adjacency lists'), ('BFS: fewest stops between towns', 'BFS፡ በከተሞች መካከል ጥቂቱ ማቆሚያዎች')],
  ('Draw a road map of 8 towns in your region as a graph and find the route with the fewest stops between two of them.', 'በክልልህ ያሉ 8 ከተሞችን የመንገድ ካርታ እንደ graph ሣልና በሁለቱ መካከል ጥቂት ማቆሚያዎች ያሉትን መንገድ ፈልግ።'),
  ('Paper map, Python', 'የወረቀት ካርታ፣ Python'),
  [('What is the difference between a tree and a graph?', 'በtree እና በgraph መካከል ያለው ልዩነት ምንድነው?', 'A tree has one root and no loops; a graph can have loops and many paths between nodes.', 'tree አንድ root አለው፣ loops የለውም፤ graph loops እና በnodes መካከል ብዙ መንገዶች ሊኖሩት ይችላል።'),
   ('Why does BFS find the route with the fewest stops?', 'BFS ጥቂት ማቆሚያዎች ያሉትን መንገድ ለምን ያገኛል?', 'It explores all towns 1 step away, then 2 steps, and so on, so the first time it reaches the goal is by the fewest steps.', 'በ1 እርምጃ ርቀት ያሉትን ከተሞች ሁሉ፣ ከዚያ በ2 እርምጃ፣ እንዲህ እያለ ያስሳል፤ ስለዚህ ግቡን ለመጀመሪያ ጊዜ የሚደርሰው በጥቂቱ እርምጃዎች ነው።')],
  [tree(B('A road graph as adjacency lists', 'የመንገድ graph እንደ adjacency lists'), N('Bahir Dar', 'ባሕር ዳር'), [{'t': B('Gondar', 'ጎንደር'), 'kids': [{'t': B('Debark', 'ደባርቅ')}]}, {'t': B('Debre Tabor', 'ደብረ ታቦር'), 'kids': [{'t': B('Woldia', 'ወልዲያ')}]}, {'t': B('Debre Markos', 'ደብረ ማርቆስ'), 'kids': [{'t': B('Addis Ababa', 'አዲስ አበባ')}]}])],
  ex_py('''
from collections import deque
roads = {"Bahir Dar": ["Gondar", "Debre Tabor", "Injibara", "Debre Markos"], "Gondar": ["Bahir Dar", "Debark"],
         "Debre Tabor": ["Bahir Dar", "Woldia"], "Injibara": ["Bahir Dar", "Debre Markos"],
         "Debre Markos": ["Bahir Dar", "Injibara", "Addis Ababa"], "Woldia": ["Debre Tabor", "Dessie"],
         "Dessie": ["Woldia", "Addis Ababa"], "Addis Ababa": ["Debre Markos", "Dessie"], "Debark": ["Gondar"]}
def fewest_stops(start, goal):
    frontier, came_from = deque([start]), {start: None}
    while frontier:
        town = frontier.popleft()
        if town == goal: break
        for nxt in roads[town]:
            if nxt not in came_from:
                came_from[nxt] = town; frontier.append(nxt)
    path = [goal]
    while path[-1] != start: path.append(came_from[path[-1]])
    return path[::-1]
print(" -> ".join(fewest_stops("Gondar", "Addis Ababa")))
print(" -> ".join(fewest_stops("Debark", "Dessie")))
''', B('Fewest stops between towns with BFS', 'በBFS በከተሞች መካከል ጥቂቱ ማቆሚያዎች'), B('A simplified road network for practice; real route planning also uses distances (Dijkstra, Level 4).', 'ለልምምድ የቀለለ የመንገድ ኔትወርክ፤ እውነተኛ የመንገድ ዕቅድ ርቀቶችንም ይጠቀማል (Dijkstra፣ ደረጃ 4)።'))),
U(('Hashing: fast lookup', 'Hashing፡ ፈጣን ፍለጋ'), D,
  [('Explain how a hash table finds data quickly', 'hash table ዳታን በፍጥነት እንዴት እንደሚያገኝ ማብራራት'), ('Use hashes to check data has not changed', 'ዳታ እንዳልተለወጠ ለመፈተሽ hashes መጠቀም')],
  [('Hash function: key → bucket number', 'Hash function፡ key → የbucket ቁጥር'), ('Collisions and how they are handled', 'Collisions እና እንዴት እንደሚያዙ'), ('Python dict and set are hash tables', 'የPython dict እና set hash tables ናቸው'), ('Checksums: SHA-256 for file integrity', 'Checksums፡ SHA-256 ለፋይል ታማኝነት')],
  ('Build a tiny hash table of student IDs by hand on the board (10 buckets, id % 10), then check a downloaded file with SHA-256.', 'በሰሌዳው ላይ በእጅ የተማሪ IDs ትንሽ hash table ገንባ (10 buckets፣ id % 10)፣ ከዚያ የወረደ ፋይልን በSHA-256 ፈትሽ።'),
  ('Python', 'Python'),
  [('Why is looking up a key in a dictionary fast?', 'በdictionary ውስጥ key መፈለግ ለምን ፈጣን ነው?', 'The hash of the key tells Python which bucket to look in, so it does not scan every item.', 'የkeyው hash Python የትኛውን bucket እንደሚመለከት ይነግረዋል፤ ስለዚህ እያንዳንዱን ንጥል አይቃኝም።'),
   ('What does a checksum prove?', 'checksum ምን ያረጋግጣል?', 'That the file is exactly the same as the original: any change, even one character, gives a different hash.', 'ፋይሉ ከመጀመሪያው ጋር በትክክል አንድ መሆኑን፡ ማንኛውም ለውጥ፣ አንድ ፊደል እንኳ ቢሆን፣ የተለየ hash ይሰጣል።')],
  [flow(B('How a hash table stores a key', 'hash table keyን እንዴት እንደሚያስቀምጥ'), [N('key "S-1043"', 'key «S-1043»'), N('hash(key) % 10', 'hash(key) % 10'), N('bucket 3', 'bucket 3'), N('store / find here', 'እዚህ አስቀምጥ / ፈልግ', hl=True)])],
  ex_py('''
import hashlib
buckets = [[] for _ in range(10)]                 # a tiny hash table
for sid, name in [(1043, "Hana"), (2051, "Dawit"), (3013, "Liya"), (1777, "Sara")]:
    buckets[sid % 10].append((sid, name))          # hash function: id % 10
print("bucket 3:", buckets[3], "<- a collision, kept in a list")
print("find 3013 ->", next(n for s, n in buckets[3013 % 10] if s == 3013))

report = b"Teff yield: 1.6 t/ha"
print("sha256:", hashlib.sha256(report).hexdigest()[:16], "...")
print("changed:", hashlib.sha256(b"Teff yield: 1.9 t/ha").hexdigest()[:16], "... (completely different)")
''', B('A hand-made hash table and file checksums', 'በእጅ የተሠራ hash table እና የፋይል checksums'))),
U(('SQL and databases', 'SQL እና ዳታቤዞች'), D,
  [('Design tables with keys', 'ከkeys ጋር ሰንጠረዦችን መንደፍ'), ('Query with SELECT, WHERE, JOIN, GROUP BY', 'በSELECT፣ WHERE፣ JOIN፣ GROUP BY መጠየቅ')],
  [('Tables, rows, primary and foreign keys', 'ሰንጠረዦች፣ ረድፎች፣ primary እና foreign keys'), ('SELECT … WHERE … ORDER BY', 'SELECT … WHERE … ORDER BY'), ('JOIN two tables', 'ሁለት ሰንጠረዦችን JOIN አድርግ'), ('GROUP BY and connect the API to SQLite', 'GROUP BY እና APIውን ከSQLite ጋር አገናኝ')],
  ('Move your market-price API from a Python list to an SQLite database with two tables (markets, prices) and answer three questions with SQL.', 'የገበያ ዋጋ APIህን ከPython list ወደ ሁለት ሰንጠረዦች (markets፣ prices) ያሉት SQLite ዳታቤዝ አንቀሳቅስና ሦስት ጥያቄዎችን በSQL መልስ።'),
  ('Python with sqlite3 (built in)', 'Python ከsqlite3 ጋር (አብሮ የተሠራ)'),
  [('What does a JOIN do in SQL?', 'በSQL ውስጥ JOIN ምን ያደርጋል?', 'It combines rows from two tables where a key matches, such as each price with its market’s town.', 'key በሚመሳሰልበት ከሁለት ሰንጠረዦች ረድፎችን ያጣምራል፣ ለምሳሌ እያንዳንዱን ዋጋ ከገበያው ከተማ ጋር።'),
   ('Why store the town once in markets instead of in every price row?', 'ከተማውን በእያንዳንዱ የዋጋ ረድፍ ውስጥ ከማስቀመጥ ይልቅ በmarkets ውስጥ አንድ ጊዜ ለምን እናስቀምጣለን?', 'No repeated data, so a correction is made in one place and cannot become inconsistent.', 'የተደጋገመ ዳታ የለም፤ ስለዚህ ማስተካከያ በአንድ ቦታ ይደረጋል፣ ወጥነት የሌለውም ሊሆን አይችልም።')],
  [tree(B('Two linked tables', 'ሁለት የተገናኙ ሰንጠረዦች'), N('markets (id, town)', 'markets (id፣ town)'), [{'t': B('prices (market_id → markets.id, crop, birr_per_kg, date)', 'prices (market_id → markets.id፣ crop፣ birr_per_kg፣ date)')}])],
  ex_py('''
import sqlite3
db = sqlite3.connect(":memory:")
db.executescript("""
CREATE TABLE markets(id INTEGER PRIMARY KEY, town TEXT NOT NULL);
CREATE TABLE prices(market_id INTEGER REFERENCES markets(id), crop TEXT, birr_per_kg REAL, day TEXT);
INSERT INTO markets VALUES (1,'Bahir Dar'),(2,'Debre Markos'),(3,'Gondar');
INSERT INTO prices VALUES (1,'teff',118,'2026-11-10'),(2,'teff',112,'2026-11-10'),(3,'teff',125,'2026-11-10'),
                          (1,'maize',40,'2026-11-10'),(2,'maize',38,'2026-11-10'),(1,'teff',120,'2026-11-14');
""")
print("cheapest teff:", db.execute("""SELECT m.town, p.birr_per_kg FROM prices p JOIN markets m ON m.id = p.market_id
                                       WHERE crop = 'teff' ORDER BY birr_per_kg LIMIT 1""").fetchone())
for row in db.execute("SELECT crop, COUNT(*), ROUND(AVG(birr_per_kg), 1) FROM prices GROUP BY crop"):
    print("crop, reports, average:", row)
''', B('JOIN and GROUP BY on a market database', 'JOIN እና GROUP BY በየገበያ ዳታቤዝ'))),
]

# ---------------- Grade 12 ----------------
G12 = [
U(('Linux and the shell', 'Linux እና shell'), D,
  [('Navigate and manage files from the command line', 'ፋይሎችን ከትዕዛዝ መስመር ማሰስና ማስተዳደር'), ('Combine tools with pipes and write a script', 'መሣሪያዎችን በpipes ማጣመርና script መጻፍ')],
  [('pwd, ls, cd, mkdir, cp, mv', 'pwd፣ ls፣ cd፣ mkdir፣ cp፣ mv'), ('cat, head, grep, sort, uniq, wc', 'cat፣ head፣ grep፣ sort፣ uniq፣ wc'), ('Pipes | and redirection >', 'Pipes | እና redirection >'), ('A bash script to automate a report', 'ሪፖርትን በራስ-ሰር ለመሥራት bash script')],
  ('Write a shell script that reads a market-price CSV and prints the number of reports and the highest teff price per town.', 'የገበያ ዋጋ CSV የሚያነብና የሪፖርቶችን ቁጥርና በከተማ ከፍተኛውን የጤፍ ዋጋ የሚያትም shell script ጻፍ።'),
  ('A Linux computer, Raspberry Pi, or WSL on Windows', 'Linux ኮምፒውተር፣ Raspberry Pi፣ ወይም በWindows ላይ WSL'),
  [('What does the pipe | do in the shell?', 'በshell ውስጥ pipe | ምን ያደርጋል?', 'It sends the output of one command into the next command as its input.', 'የአንዱን ትዕዛዝ ውጤት ወደ ቀጣዩ ትዕዛዝ እንደ ግብዓቱ ይልካል።'),
   ('What does > do?', '> ምን ያደርጋል?', 'Writes the output into a file (replacing it); >> adds to the end instead.', 'ውጤቱን ወደ ፋይል ይጽፋል (ይተካዋል)፤ >> ደግሞ በምትኩ መጨረሻው ላይ ይጨምራል።')],
  [flow(B('A pipeline', 'pipeline'), [N('grep teff prices.csv', 'grep teff prices.csv'), N('| cut -d, -f1,3', '| cut -d, -f1,3'), N('| sort -t, -k2 -n', '| sort -t, -k2 -n'), N('| tail -1', '| tail -1', 'highest price', 'ከፍተኛው ዋጋ', hl=True)])],
  ex_sh('''
echo "reports per crop:"
tail -n +2 prices.csv | cut -d, -f2 | sort | uniq -c
echo "highest teff price:"
grep ',teff,' prices.csv | sort -t, -k3 -n | tail -1
''', {'prices.csv': '''
town,crop,birr_per_kg
Bahir Dar,teff,118
Debre Markos,teff,112
Gondar,teff,125
Bahir Dar,maize,40
Debre Markos,maize,38
'''}, B('Counting and finding with pipes', 'በpipes መቁጠርና መፈለግ'))),
U(('Team project: issues, branches and review', 'የቡድን ፕሮጀክት፡ issues፣ branches እና ግምገማ'), D,
  [('Plan work as issues with clear owners', 'ሥራን ግልጽ ባለቤቶች ባሏቸው issues ማቀድ'), ('Review a teammate’s pull request helpfully', 'የቡድን አጋርን pull request በጠቃሚ መንገድ መገምገም')],
  [('Roles: product owner, developers, tester', 'ሚናዎች፡ product owner፣ developers፣ tester'), ('Issues and a simple board: to do, doing, done', 'Issues እና ቀላል ሰሌዳ፡ የሚሠራ፣ እየተሠራ፣ የተሠራ'), ('One branch and one pull request per issue', 'ለእያንዳንዱ issue አንድ branch እና አንድ pull request'), ('Code review checklist', 'የኮድ ግምገማ ማረጋገጫ ዝርዝር')],
  ('In teams of four, build a feature for the market-price app over three weeks using issues, branches, pull requests and a weekly demo.', 'በአራት ሰዎች ቡድን በሦስት ሳምንታት ውስጥ issuesን፣ branchesን፣ pull requestsን እና ሳምንታዊ ማሳያን በመጠቀም ለየገበያ ዋጋ መተግበሪያው ባሕሪ ገንቡ።'),
  ('GitHub (free), a shared board', 'GitHub (ነጻ)፣ የጋራ ሰሌዳ'),
  [('What makes a good issue?', 'ጥሩ issue ምንድነው?', 'A clear title, what done looks like (acceptance criteria), and one owner.', 'ግልጽ ርዕስ፣ የተጠናቀቀው ምን እንደሚመስል (acceptance criteria)፣ እና አንድ ባለቤት።'),
   ('What should a reviewer check?', 'ገምጋሚ ምን መፈተሽ አለበት?', 'That it does what the issue asks, has tests, is readable, and has no secrets or obvious bugs; comments are specific and kind.', 'issueኡ የሚጠይቀውን እንደሚያደርግ፣ ፈተናዎች እንዳሉት፣ እንደሚነበብ፣ ሚስጥሮች ወይም ግልጽ ስህተቶች እንደሌሉት፤ አስተያየቶች ግልጽና ደግ ናቸው።')],
  [flow(B('From issue to merged feature', 'ከissue ወደ የተዋሃደ ባሕሪ'), [N('Issue #12', 'Issue #12', 'acceptance criteria', 'acceptance criteria'), N('Branch', 'Branch'), N('Pull request', 'Pull request', 'tests pass', 'ፈተናዎች ያልፋሉ'), N('Review', 'ግምገማ'), N('Merge + close #12', 'አዋህድ + #12ን ዝጋ', hl=True)])],
  ex_code('Markdown (pull request description)', '''
## What
Adds a "lowest price this week" card to the market page (closes #12).

## How
- New function `lowest_this_week(rows)` in prices.py
- Card rendered with textContent (no innerHTML)

## Tests
- test_lowest_this_week: empty list, one market, ties
- Manual: checked on a phone in Amharic and English

## Screenshots
(attach before / after)
''', B('A pull request a reviewer can understand', 'ገምጋሚ ሊረዳው የሚችል pull request'))),
U(('Networks and security', 'ኔትወርኮችና ደህንነት'), D,
  [('Protect accounts with strong passwords and two-factor authentication', 'መለያዎችን በጠንካራ የይለፍ ቃሎችና በtwo-factor authentication መጠበቅ'), ('Explain encryption and recognise phishing', 'ምስጠራን ማብራራትና phishingን መለየት')],
  [('Passwords: length beats complexity; password managers', 'የይለፍ ቃሎች፡ ርዝመት ከውስብስብነት ይበልጣል፤ password managers'), ('Hashing passwords with a salt', 'የይለፍ ቃሎችን ከsalt ጋር hash ማድረግ'), ('Encryption: HTTPS and the padlock', 'ምስጠራ፡ HTTPS እና ቁልፉ'), ('Phishing: SMS and mobile-money scams', 'Phishing፡ የSMS እና የሞባይል ገንዘብ ማጭበርበሮች')],
  ('Run a "spot the scam" session with real-looking (made-up) SMS and e-mail examples, then set up two-factor authentication on a school account.', 'እውነተኛ በሚመስሉ (የተፈጠሩ) የSMS እና የኢሜል ምሳሌዎች የ«ማጭበርበሩን ለይ» ክፍለ ጊዜ አካሂዱ፣ ከዚያ በትምህርት ቤት መለያ ላይ two-factor authentication አዘጋጁ።'),
  ('Python, example messages on cards', 'Python፣ በካርዶች ላይ የምሳሌ መልእክቶች'),
  [('Why store a password hash instead of the password?', 'ከየይለፍ ቃሉ ይልቅ የይለፍ ቃሉን hash ለምን እናስቀምጣለን?', 'If the database leaks, attackers get hashes, not passwords; a salt and a slow hash make guessing very costly.', 'ዳታቤዙ ቢወጣ አጥቂዎች የይለፍ ቃሎችን ሳይሆን hashesን ያገኛሉ፤ salt እና ቀርፋፋ hash መገመትን በጣም ውድ ያደርጋሉ።'),
   ('Name two signs of a phishing message.', 'የphishing መልእክት ሁለት ምልክቶችን ጥቀስ።', 'Urgency or threats ("your account closes today"), and a request for your PIN, password or a code; also odd links or senders.', 'ችኮላ ወይም ማስፈራሪያ («መለያህ ዛሬ ይዘጋል»)፣ እና የPIN፣ የይለፍ ቃል ወይም ኮድ ጥያቄ፤ እንዲሁም እንግዳ ማገናኛዎች ወይም ላኪዎች።')],
  [compare(B('Spot the scam', 'ማጭበርበሩን ለይ'), [col(B('Scam', 'ማጭበርበር'), ['"You won 50,000 birr! Send your PIN to claim today"', 'urgency + asks for a secret'], ['«50,000 ብር አሸንፈሃል! ዛሬ ለመቀበል PINህን ላክ»', 'ችኮላ + ሚስጥር ይጠይቃል'], 'bad'), col(B('Genuine', 'እውነተኛ'), ['"You received 300 birr from Hana. Balance: …"', 'never asks for your PIN'], ['«ከሐና 300 ብር ተቀብለሃል። ቀሪ ሂሳብ፡ …»', 'PINህን በፍጹም አይጠይቅም'], 'good')])],
  ex_py('''
import hashlib, os, math
def hash_password(pw, salt=None):
    salt = salt or os.urandom(16)
    return salt, hashlib.pbkdf2_hmac("sha256", pw.encode(), salt, 200_000)   # slow on purpose
salt, stored = hash_password("teff-harvest-2026-blue")
print("login correct:", hash_password("teff-harvest-2026-blue", salt)[1] == stored)
print("login wrong:  ", hash_password("teff-harvest-2026-blu", salt)[1] == stored)
for pw, alphabet in [("Tz#9q", 94), ("teffharvestbluemoon", 26), ("teff-harvest-2026-blue", 40)]:
    print(f"{pw:24s} ~{len(pw) * math.log2(alphabet):4.0f} bits of guessing work")
''', B('Salted password hashing, and why length matters', 'ከsalt ጋር የይለፍ ቃል hashing፣ እና ርዝመት ለምን አስፈላጊ ነው'), B('The "bits" are a rough upper estimate for random characters; real passwords made of common words are weaker.', '«bits» ለዘፈቀደ ፊደላት ግምታዊ ከፍተኛ ግምት ነው፤ ከተለመዱ ቃላት የተሠሩ እውነተኛ የይለፍ ቃሎች ደካማ ናቸው።'))),
U(('Ethics and law in computing', 'በኮምፒውቲንግ ውስጥ ሥነ-ምግባርና ሕግ'), D,
  [('Apply privacy, consent and data ownership to a real app', 'ግላዊነትን፣ ስምምነትንና የዳታ ባለቤትነትን በእውነተኛ መተግበሪያ ላይ መተግበር'), ('Spot bias in data and decisions', 'በዳታና በውሳኔዎች ውስጥ አድልዎን መለየት')],
  [('Privacy and data protection law', 'ግላዊነትና የዳታ ጥበቃ ሕግ'), ('Consent and data minimisation', 'ስምምነትና የዳታ መቀነስ'), ('Who owns farmer data?', 'የገበሬ ዳታ ባለቤት ማነው?'), ('Bias: whose data is missing?', 'አድልዎ፡ የማን ዳታ ጠፍቷል?')],
  ('Debate: an app collects farmers’ locations and yields for free advice and sells summaries to traders. Who benefits, what is fair, and what rules should apply?', 'ክርክር፡ መተግበሪያ ለነጻ ምክር የገበሬዎችን ቦታና ምርት ይሰበስባል፣ ማጠቃለያዎችንም ለነጋዴዎች ይሸጣል። ማን ይጠቀማል፣ ፍትሐዊ የሆነው ምንድነው፣ የትኞቹ ሕጎች መተግበር አለባቸው?'),
  ('Case study cards, the national data protection law (summary)', 'የጉዳይ ጥናት ካርዶች፣ የብሔራዊ የዳታ ጥበቃ ሕግ (ማጠቃለያ)'),
  [('Who owns the data your app collects?', 'መተግበሪያህ የሚሰበስበው ዳታ ባለቤት ማነው?', 'The people it describes have rights over it under data protection law; the app should collect only what it needs, with clear consent, and share benefits fairly.', 'የሚገልጻቸው ሰዎች በዳታ ጥበቃ ሕግ መሠረት መብት አላቸው፤ መተግበሪያው የሚያስፈልገውን ብቻ፣ በግልጽ ስምምነት መሰብሰብና ጥቅሞችን በፍትሐዊነት ማጋራት አለበት።'),
   ('How can a model trained on data from towns be unfair to rural users?', 'ከከተሞች በተገኘ ዳታ የሰለጠነ ሞዴል ለገጠር ተጠቃሚዎች እንዴት ፍትሐዊ ያልሆነ ሊሆን ይችላል?', 'Rural patterns are missing or rare in its training data, so its predictions are worse for them.', 'የገጠር ንድፎች በሥልጠና ዳታው ውስጥ ጠፍተዋል ወይም ጥቂት ናቸው፤ ስለዚህ ትንበያዎቹ ለእነሱ የከፋ ናቸው።')],
  [flow(B('Privacy by design', 'በንድፍ ግላዊነት'), [N('Collect only what you need', 'የሚያስፈልግህን ብቻ ሰብስብ'), N('Clear consent in their language', 'በቋንቋቸው ግልጽ ስምምነት'), N('Protect and limit access', 'ጠብቅና መዳረሻን ገድብ'), N('Let people see and delete', 'ሰዎች እንዲያዩና እንዲሰርዙ ፍቀድ', hl=True)])],
  ex_py('''
records = [{"name": "Hana Tesfaye", "phone": "0911223344", "kebele": "Zenzelma", "teff_t_ha": 1.6},
           {"name": "Dawit Alemu", "phone": "0922334455", "kebele": "Zenzelma", "teff_t_ha": 1.9},
           {"name": "Liya Bekele", "phone": "0933445566", "kebele": "Sebatamit", "teff_t_ha": 1.4}]
# data minimisation: traders only need the average per kebele, not names or phones
from collections import defaultdict
by_kebele = defaultdict(list)
for r in records:
    by_kebele[r["kebele"]].append(r["teff_t_ha"])
shared = {k: {"farms": len(v), "avg_teff_t_ha": round(sum(v) / len(v), 2)} for k, v in by_kebele.items() if len(v) >= 2}
print("shared with traders:", shared)
print("withheld: kebeles with fewer than 2 farms (a single farm could be identified)")
''', B('Sharing summaries, not personal data', 'የግል ዳታን ሳይሆን ማጠቃለያዎችን ማጋራት'))),
U(('Machine learning with scikit-learn', 'Machine learning በscikit-learn'), D,
  [('Train, test and evaluate a model honestly', 'ሞዴልን በታማኝነት ማሰልጠን፣ መፈተሽና መገምገም'), ('Read accuracy and a confusion matrix', 'accuracyን እና confusion matrixን ማንበብ')],
  [('Features, labels, train/test split', 'Features፣ labels፣ train/test split'), ('A decision tree classifier', 'Decision tree classifier'), ('Accuracy and the confusion matrix', 'Accuracy እና confusion matrix'), ('Compare with a simple baseline', 'ከቀላል baseline ጋር አወዳድር')],
  ('Predict whether a farm’s seedlings are at risk of rust from weather features, and compare your model with a "always say no risk" baseline.', 'የአንድ እርሻ ችግኞች ከአየር ሁኔታ features ለዝገት አደጋ የተጋለጡ መሆናቸውን ተንብይ፣ ሞዴልህንም ከ«ሁልጊዜ አደጋ የለም በል» baseline ጋር አወዳድር።'),
  ('Python with scikit-learn', 'Python ከscikit-learn ጋር'),
  [('Why do we split data into train and test sets?', 'ዳታን ለምን ወደ train እና test sets እንከፍላለን?', 'To measure performance on data the model has never seen; training accuracy is too optimistic.', 'ሞዴሉ ፈጽሞ ባላየው ዳታ ላይ አፈጻጸሙን ለመለካት፤ የሥልጠና accuracy ከልክ በላይ ተስፋ ሰጪ ነው።'),
   ('Why compare with a baseline?', 'ከbaseline ጋር ለምን እናወዳድራለን?', 'If most farms have no rust, "always no" already scores high; the model must beat that to be useful.', 'አብዛኞቹ እርሻዎች ዝገት ከሌላቸው «ሁልጊዜ አይደለም» አስቀድሞ ከፍተኛ ውጤት ያገኛል፤ ሞዴሉ ጠቃሚ ለመሆን ያንን ማሸነፍ አለበት።')],
  [stack(B('Reading a confusion matrix', 'confusion matrixን ማንበብ'), [N('True negatives: no rust, predicted no', 'እውነተኛ አሉታዎች፡ ዝገት የለም፣ አይደለም ተብሏል'), N('False positives: predicted rust, none', 'የሐሰት አዎንታዎች፡ ዝገት ተብሏል፣ የለም'), N('False negatives: missed rust (costly!)', 'የሐሰት አሉታዎች፡ ያመለጠ ዝገት (ውድ!)'), N('True positives: rust caught', 'እውነተኛ አዎንታዎች፡ የተያዘ ዝገት')])],
  ex_py('''
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, confusion_matrix
rng = np.random.default_rng(5); n = 600
wet_days = rng.integers(0, 8, n); temp = rng.normal(18, 4, n); resistant = rng.integers(0, 2, n)
risk = (wet_days >= 4) & (temp > 15) & (resistant == 0)
rust = np.where(rng.random(n) < 0.9, risk, ~risk)                 # 10% label noise
X = np.column_stack([wet_days, temp, resistant])
X_tr, X_te, y_tr, y_te = train_test_split(X, rust, test_size=0.3, random_state=0, stratify=rust)
model = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr)
pred = model.predict(X_te)
print(f"baseline 'always no rust': {accuracy_score(y_te, np.zeros_like(y_te)):.2f}")
print(f"decision tree:             {accuracy_score(y_te, pred):.2f}")
print("confusion matrix [[TN FP] [FN TP]]:", confusion_matrix(y_te, pred).tolist())
''', B('Rust-risk classifier vs a baseline', 'የዝገት አደጋ classifier vs baseline'), B('Simulated data for practice: the real rule is "4+ wet days, warm, susceptible variety", with 10% noise.', 'ለልምምድ የተመሰለ ዳታ፡ እውነተኛው ሕግ «4+ እርጥብ ቀናት፣ ሞቃት፣ ተጋላጭ ዝርያ» ነው፣ ከ10% ጫጫታ ጋር።'))),
U(('Model project: forecast and explain its limits', 'የሞዴል ፕሮጀክት፡ ተንብይና ገደቦቹን አብራራ'), D,
  [('Build a forecasting model end to end', 'የትንበያ ሞዴልን ከመጀመሪያ እስከ መጨረሻ መገንባት'), ('Report error honestly and state limits', 'ስህተትን በታማኝነት መዘገብና ገደቦችን መግለጽ')],
  [('Define the question and the decision it supports', 'ጥያቄውንና የሚደግፈውን ውሳኔ ግለጽ'), ('A baseline: last week’s price', 'baseline፡ የባለፈው ሳምንት ዋጋ'), ('A model with trend and season; test on the latest weeks', 'ከአዝማሚያና ከወቅት ጋር ያለ ሞዴል፤ በቅርብ ሳምንታት ላይ ፈትሽ'), ('A one-page report with limits', 'ከገደቦች ጋር የአንድ ገጽ ሪፖርት')],
  ('Forecast next week’s teff price for your market, compare with the "same as last week" baseline, and present a one-page report with the error and three limits.', 'ለገበያህ የሚቀጥለውን ሳምንት የጤፍ ዋጋ ተንብይ፣ ከ«እንደ ባለፈው ሳምንት» baseline ጋር አወዳድር፣ ከስህተቱና ከሦስት ገደቦች ጋር የአንድ ገጽ ሪፖርት አቅርብ።'),
  ('Python with scikit-learn, two years of weekly prices', 'Python ከscikit-learn ጋር፣ የሁለት ዓመታት ሳምንታዊ ዋጋዎች'),
  [('Why test on the most recent weeks, not random weeks?', 'በዘፈቀደ ሳምንታት ሳይሆን በቅርብ ሳምንታት ለምን እንፈትሻለን?', 'A forecast is always about the future, so the test must also be later than the training data.', 'ትንበያ ሁልጊዜ ስለ ወደፊት ነው፤ ስለዚህ ፈተናውም ከሥልጠና ዳታው በኋላ መሆን አለበት።'),
   ('Name a limit of a price model.', 'የዋጋ ሞዴልን አንድ ገደብ ጥቀስ።', 'It cannot foresee shocks it has never seen, such as a drought, a road closure or a new policy.', 'አይቶ የማያውቃቸውን ድንገተኛ ክስተቶች፣ እንደ ድርቅ፣ የመንገድ መዘጋት ወይም አዲስ ፖሊሲ፣ መተንበይ አይችልም።')],
  [flow(B('An honest forecast project', 'ታማኝ የትንበያ ፕሮጀክት'), [N('Question + decision', 'ጥያቄ + ውሳኔ'), N('Baseline', 'Baseline'), N('Model', 'ሞዴል'), N('Test on the latest weeks', 'በቅርብ ሳምንታት ፈትሽ'), N('Report error + limits', 'ስህተት + ገደቦችን ዘግብ', hl=True)])],
  ex_py('''
import numpy as np
from sklearn.linear_model import LinearRegression
rng = np.random.default_rng(12); w = np.arange(104)
price = 95 + 0.15 * w + 6 * np.sin(2 * np.pi * w / 52) + rng.normal(0, 2.5, 104)
feats = lambda t: np.column_stack([t, np.sin(2 * np.pi * t / 52), np.cos(2 * np.pi * t / 52)])
train, test = w < 92, w >= 92                                 # the last 12 weeks are the test
model = LinearRegression().fit(feats(w[train]), price[train])
mae_model = np.mean(np.abs(model.predict(feats(w[test])) - price[test]))
mae_naive = np.mean(np.abs(price[test][1:] - price[test][:-1]))   # "same as last week"
print(f"error on the last 12 weeks: model {mae_model:.2f} birr/kg, baseline {mae_naive:.2f} birr/kg")
print(f"forecast for week 105: {model.predict(feats(np.array([104])))[0]:.1f} birr/kg")
''', B('Model vs "same as last week"', 'ሞዴል vs «እንደ ባለፈው ሳምንት»'), B('Simulated prices for practice. Limits to report: shocks (drought, roads, policy), missing holidays, and that the error grows further ahead.', 'ለልምምድ የተመሰሉ ዋጋዎች። የሚዘገቡ ገደቦች፡ ድንገተኛ ክስተቶች (ድርቅ፣ መንገዶች፣ ፖሊሲ)፣ የጎደሉ በዓላት፣ እና ስህተቱ ወደ ፊት በራቀ ቁጥር እንደሚያድግ።'))),
]
emit_units(3, [G9, G10, G11, G12])
print('level 3 units written')
