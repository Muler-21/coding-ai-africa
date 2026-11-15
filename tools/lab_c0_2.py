from labkit import *
TH = T('Python 3 (teacher, optional)', 'turns the class results into a chart and a summary', 'የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል', 'Thonny or any phone Python app')
S30 = ('2 sessions of 30 min', '2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ')
NOTE_SAMPLE = ('The numbers are example class results; replace them with your own class’s results.', 'ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።')

C0 = []
C0.append(lab(('Robot teacher: exact sequences', 'ሮቦት አስተማሪ፡ ትክክለኛ ቅደም ተከተሎች'),
 ('Children give and follow 5-step instructions on a chalk grid and learn that order changes the result.', 'ልጆች በጠመኔ ፍርግርግ ላይ ባለ 5 እርምጃ መመሪያዎችን ይሰጣሉ፣ ይከተላሉም፤ ቅደም ተከተል ውጤቱን እንደሚቀይር ይማራሉ።'), S30,
 [T('Chalk and a 4×4 grid on the ground', 'the robot’s world', 'የሮቦቱ ዓለም', 'school yard'), T('Arrow cards (cut from a box)', 'the program', 'ፕሮግራሙ', 'old cardboard, marker'), PAPER, TH],
 (['Chalk a 4×4 grid; put a "house" stone in one corner.', 'Make 12 arrow cards: ↑ forward, ↻ turn right, ↺ turn left.', 'Teams of 3: a programmer lays the cards, a robot walks, a checker watches.', 'Each team gets 3 tries to reach the house; record on paper: number of cards and whether the robot arrived.', 'Swap two cards on purpose and walk again: what changed?', 'Count successes per team and draw a picture chart on the board.'],
  ['4×4 ፍርግርግ በጠመኔ ሣሉ፤ በአንድ ጥግ «ቤት» ድንጋይ አስቀምጡ።', '12 የቀስት ካርዶች ሥሩ፡ ↑ ወደ ፊት፣ ↻ ወደ ቀኝ ዙር፣ ↺ ወደ ግራ ዙር።', 'የ3 ቡድኖች፡ ፕሮግራመሩ ካርዶቹን ያስቀምጣል፣ ሮቦቱ ይራመዳል፣ ፈታሹ ይመለከታል።', 'እያንዳንዱ ቡድን ቤቱን ለመድረስ 3 ሙከራዎች ያገኛል፤ በወረቀት መዝግቡ፡ የካርዶች ብዛትና ሮቦቱ እንደደረሰ።', 'ሆን ብላችሁ ሁለት ካርዶችን አቀያይሩና እንደገና ተራመዱ፡ ምን ተለወጠ?', 'በቡድን ስኬቶችን ቁጠሩና በሰሌዳው ላይ የሥዕል ቻርት ሣሉ።']),
 '''
teams = {"Lions": [0, 1, 1], "Eagles": [1, 1, 1], "Zebras": [0, 0, 1], "Gazelles": [0, 1, 1], "Cranes": [1, 0, 1]}   # 1 = robot reached the house
for team, tries in teams.items():
    print(f"{team:9s} {'★' * sum(tries):3s} {sum(tries)} of 3 | first success on try {tries.index(1) + 1}")
first_try = sum(t[0] for t in teams.values())
print(f"teams right on the first try: {first_try} of {len(teams)}; by the third try: {sum(t[2] for t in teams.values())} of {len(teams)}")
''',
 viz=lambda ns: [line(B('Teams that reached the house, try by try', 'ቤቱን የደረሱ ቡድኖች፣ በእያንዳንዱ ሙከራ'), [1, 2, 3], [(B('Teams', 'ቡድኖች'), [sum(t[i] for t in ns['teams'].values()) for i in range(3)], 1)], B('Try', 'ሙከራ'), B('Teams successful (of 5)', 'የተሳካላቸው ቡድኖች (ከ5)'), ymin=0, ymax=5)],
 analysis=lambda ns: ([f"Only {ns['first_try']} of 5 teams were right first time; by the third try all 5 were.", 'Most first-try bugs were a missing ↑ card or a turn in the wrong place: the order of cards matters.', 'Swapping two cards sent the robot somewhere else, which shows that a sequence is more than a set of steps.'],
                      [f"ከ5 ቡድኖች {ns['first_try']} ብቻ በመጀመሪያው ሙከራ ትክክል ነበሩ፤ በሦስተኛው ሙከራ ሁሉም 5።", 'አብዛኞቹ የመጀመሪያ-ሙከራ ስህተቶች የጎደለ ↑ ካርድ ወይም በተሳሳተ ቦታ ያለ መዞሪያ ነበሩ፡ የካርዶች ቅደም ተከተል አስፈላጊ ነው።', 'ሁለት ካርዶችን ማቀያየር ሮቦቱን ወደ ሌላ ቦታ ላከው፤ ይህም ቅደም ተከተል ከእርምጃዎች ስብስብ በላይ መሆኑን ያሳያል።']),
 decision=lambda ns: ('Start next session with "check before you walk": the checker reads every card aloud before the robot moves. Keep the 4×4 grid until most teams succeed on the first try, then move to 5×5 with an obstacle.', 'የሚቀጥለውን ክፍለ ጊዜ በ«ከመራመድህ በፊት ፈትሽ» ጀምሩ፡ ሮቦቱ ከመንቀሳቀሱ በፊት ፈታሹ እያንዳንዱን ካርድ ጮክ ብሎ ያነባል። አብዛኞቹ ቡድኖች በመጀመሪያው ሙከራ እስኪሳካላቸው 4×4 ፍርግርጉን አቆዩ፣ ከዚያ ከእንቅፋት ጋር ወደ 5×5 ተሸጋገሩ።'),
 note=NOTE_SAMPLE))
C0.append(lab(('Pattern detectives', 'የንድፍ መርማሪዎች'),
 ('Children build, continue and check repeating patterns with seeds and sounds, and say the rule.', 'ልጆች በዘሮችና በድምፆች የሚደጋገሙ ንድፎችን ይገነባሉ፣ ይቀጥላሉ፣ ይፈትሻሉ፣ ሕጉንም ይናገራሉ።'), S30,
 [T('Two kinds of seeds or bottle tops', 'pattern pieces', 'የንድፍ ቁርጥራጮች', 'home or market'), T('String', 'to make necklaces', 'ሐብል ለመሥራት', 'market'), PAPER, TH],
 (['Clap–stomp patterns: the class continues the teacher’s pattern.', 'Each child makes a 12-piece necklace following a rule (for example 2 red, 1 white).', 'Swap necklaces: a friend says the rule.', 'Hide one mistake; the friend finds it. Record: rule found (yes/no), mistake found (yes/no).', 'Count results for the class.'],
  ['የማጨብጨብ–የመርገጥ ንድፎች፡ ክፍሉ የመምህሩን ንድፍ ይቀጥላል።', 'እያንዳንዱ ልጅ ሕግን ተከትሎ ባለ 12 ቁርጥራጭ ሐብል ይሠራል (ለምሳሌ 2 ቀይ፣ 1 ነጭ)።', 'ሐብሎችን ተቀያየሩ፡ ጓደኛ ሕጉን ይናገራል።', 'አንድ ስህተት ደብቁ፤ ጓደኛው ያገኘዋል። መዝግቡ፡ ሕጉ ተገኘ (አዎ/አይደለም)፣ ስህተቱ ተገኘ (አዎ/አይደለም)።', 'ለክፍሉ ውጤቶቹን ቁጠሩ።']),
 '''
results = {"AB (red, white)": (10, 10, 9), "AAB (2 red, 1 white)": (10, 8, 6), "ABC (3 colours)": (8, 5, 4)}   # (children, rule found, mistake found)
for rule, (n, found, fixed) in results.items():
    print(f"{rule:22s} rule found {found}/{n} ({found / n:.0%}), mistake found {fixed}/{n} ({fixed / n:.0%})")
hardest = min(results, key=lambda k: results[k][1] / results[k][0])
print("hardest pattern:", hardest)
''',
 viz=lambda ns: [hbar(B('Share of children who found the rule and the mistake', 'ሕጉንና ስህተቱን ያገኙ ልጆች ድርሻ'), list(ns['results']), [(B('Rule found %', 'ሕጉ ተገኘ %'), [100 * v[1] / v[0] for v in ns['results'].values()], 1), (B('Mistake found %', 'ስህተቱ ተገኘ %'), [100 * v[2] / v[0] for v in ns['results'].values()], 2)], B('Percent of children', 'የልጆች መቶኛ'), fmt=0)],
 analysis=lambda ns: (['AB patterns are almost always solved; difficulty rises with the length of the repeating unit.', f"The hardest was {ns['hardest']}: fewer children found the rule, and even fewer spotted the hidden mistake.", 'Finding a mistake is harder than continuing a pattern: you must hold the whole rule in mind.'],
                      ['የAB ንድፎች ከሞላ ጎደል ሁልጊዜ ይፈታሉ፤ ችግሩ ከሚደጋገመው ክፍል ርዝመት ጋር ይጨምራል።', f"በጣም ከባዱ {ns['hardest']} ነበር፡ ጥቂት ልጆች ሕጉን አገኙ፣ የተደበቀውን ስህተትም ያስተዋሉት ከዚያም ያነሱ ናቸው።", 'ስህተትን ማግኘት ንድፍን ከመቀጠል ይከብዳል፡ ሙሉውን ሕግ በአእምሮ መያዝ አለብህ።']),
 decision=lambda ns: ('Spend one more session on 3-piece units (AAB, ABC) with sounds first, then seeds; move on to loops only when most children can find a hidden mistake in AAB.', 'በ3-ቁርጥራጭ ክፍሎች (AAB፣ ABC) ላይ መጀመሪያ በድምፆች፣ ከዚያ በዘሮች አንድ ተጨማሪ ክፍለ ጊዜ አሳልፉ፤ ወደ loops የምትሸጋገሩት አብዛኞቹ ልጆች በAAB ውስጥ የተደበቀ ስህተት ማግኘት ሲችሉ ብቻ ነው።'), note=NOTE_SAMPLE))
C0.append(lab(('Treasure maps on a grid', 'በፍርግርግ ላይ የሀብት ካርታዎች'),
 ('Teams write arrow maps to a hidden treasure and compare how many steps their paths take.', 'ቡድኖች ወደ ተደበቀ ሀብት የቀስት ካርታዎችን ይጽፋሉ፣ መንገዶቻቸው ስንት እርምጃዎች እንደሚወስዱም ያወዳድራሉ።'), S30,
 [T('Chalk grid 5×5, a painted stone', 'the map and the treasure', 'ካርታውና ሀብቱ', 'school yard'), PAPER, TH],
 (['Hide the gold stone on a square of a 5×5 grid.', 'Each team draws an arrow map from START to the treasure on paper.', 'Another team walks the map exactly.', 'Record: arrived (yes/no) and number of arrows used.', 'Compare with the shortest possible path (count the squares).'],
  ['የወርቅ ድንጋዩን በ5×5 ፍርግርግ ካሬ ላይ ደብቁ።', 'እያንዳንዱ ቡድን ከመነሻ ወደ ሀብቱ የቀስት ካርታ በወረቀት ይሥላል።', 'ሌላ ቡድን ካርታውን በትክክል ይራመዳል።', 'መዝግቡ፡ ደረሰ (አዎ/አይደለም) እና የተጠቀሙበት የቀስቶች ብዛት።', 'ከሚቻለው አጭር መንገድ ጋር አወዳድሩ (ካሬዎቹን ቁጠሩ)።']),
 '''
shortest = 7                              # 4 across + 3 up, plus 1 turn card counted separately
maps = {"Team A": (True, 8), "Team B": (True, 11), "Team C": (False, 9), "Team D": (True, 8), "Team E": (True, 14)}
for team, (arrived, arrows) in maps.items():
    extra = arrows - (shortest + 1)
    print(f"{team}: {'arrived' if arrived else 'did not arrive'}, {arrows} arrows ({extra:+d} vs the shortest)")
ok = [a for arr, a in maps.values() if arr]
print(f"{len(ok)} of {len(maps)} maps worked; average arrows for working maps {sum(ok) / len(ok):.1f}")
''',
 viz=lambda ns: [hbar(B('Arrows used by each team (shortest = 8)', 'በእያንዳንዱ ቡድን የተጠቀሙ ቀስቶች (አጭሩ = 8)'), list(ns['maps']), [(B('Arrows', 'ቀስቶች'), [v[1] for v in ns['maps'].values()], 1)], B('Number of arrow cards', 'የቀስት ካርዶች ብዛት'), fmt=0)],
 analysis=lambda ns: ([f"{len(ns['ok'])} of 5 maps reached the treasure; one map had a turn in the wrong direction.", 'Working maps used between 8 and 14 arrows: some teams went around the long way.', 'Teams that counted squares before drawing used the fewest arrows.'],
                      [f"ከ5 ካርታዎች {len(ns['ok'])} ሀብቱን ደረሱ፤ አንድ ካርታ በተሳሳተ አቅጣጫ መዞሪያ ነበረው።", 'የሠሩ ካርታዎች ከ8 እስከ 14 ቀስቶችን ተጠቅመዋል፡ አንዳንድ ቡድኖች ረጅሙን መንገድ ዞረዋል።', 'ከመሣላቸው በፊት ካሬዎችን የቆጠሩ ቡድኖች ጥቂቶቹን ቀስቶች ተጠቅመዋል።']),
 decision=lambda ns: ('Teach "count first, then draw" as the class rule; next session add one obstacle so the shortest path needs two turns.', '«መጀመሪያ ቁጠር፣ ከዚያ ሣል»ን እንደ የክፍሉ ሕግ አስተምሩ፤ በሚቀጥለው ክፍለ ጊዜ አጭሩ መንገድ ሁለት መዞሪያዎች እንዲፈልግ አንድ እንቅፋት ጨምሩ።'), note=NOTE_SAMPLE))
C0.append(lab(('Loop race: fewer cards, same path', 'የloop ውድድር፡ ያነሱ ካርዶች፣ ያው መንገድ'),
 ('Teams rewrite long arrow paths with repeat cards and measure how many cards they save.', 'ቡድኖች ረጅም የቀስት መንገዶችን በድገም ካርዶች እንደገና ይጽፋሉ፣ ስንት ካርዶች እንደሚያድኑም ይለካሉ።'), S30,
 [T('Arrow cards and "repeat ×" cards', 'program with and without loops', 'ከloop ጋርና ያለ loop ፕሮግራም', 'cardboard, marker'), T('Chalk grid', 'test both versions', 'ሁለቱንም ስሪቶች ፈትሽ', 'school yard'), TH],
 (['Give each team a long path written with single arrows (for example a 3×3 square walk).', 'Teams rewrite it using "repeat ×" cards.', 'Walk both versions on the grid: do they end in the same place?', 'Record cards before and after.', 'Discuss: when is a loop not useful?'],
  ['ለእያንዳንዱ ቡድን በነጠላ ቀስቶች የተጻፈ ረጅም መንገድ ስጡ (ለምሳሌ የ3×3 ካሬ መራመድ)።', 'ቡድኖች «× ድገም» ካርዶችን በመጠቀም እንደገና ይጽፉታል።', 'ሁለቱንም ስሪቶች በፍርግርጉ ላይ ተራመዱ፡ በአንድ ቦታ ያልቃሉ?', 'ከዚያ በፊትና በኋላ ያሉትን ካርዶች መዝግቡ።', 'ተወያዩ፡ loop መቼ ጠቃሚ አይደለም?']),
 '''
paths = {   # each card is one item; "repeat N" is one card that holds the cards inside it
    "line of 6":  (["F"] * 6,                 ["repeat 6", "F"]),
    "square 3x3": (["F", "F", "F", "R"] * 4,  ["repeat 4", "F", "F", "F", "R"]),
    "zig-zag":    (["F", "R", "F", "L"] * 2,  ["repeat 2", "F", "R", "F", "L"]),
    "L-shape":    (["F", "F", "F", "R", "F", "F"], ["F", "F", "F", "R", "F", "F"])}
saved = {}
for name, (long, short) in paths.items():
    saved[name] = len(long) - len(short)
    print(f"{name:11s} {len(long):2d} cards -> {len(short):2d} cards (saved {saved[name]})")
''',
 viz=lambda ns: [hbar(B('Cards needed with and without a loop', 'ከloop ጋርና ያለ loop የሚያስፈልጉ ካርዶች'), list(ns['paths']), [(B('Without loop', 'ያለ loop'), [len(l) for l, s in ns['paths'].values()], 2), (B('With loop', 'ከloop ጋር'), [len(s) for l, s in ns['paths'].values()], 1)], B('Number of cards', 'የካርዶች ብዛት'), fmt=0)],
 analysis=lambda ns: ([f"The square walk shrank from 16 cards to {16 - ns['saved']['square 3x3']}: loops pay off most when a group of steps repeats many times.", 'The L-shape saved nothing: there is no repeated group, so a loop does not help.', 'Both versions ended on the same square every time: a loop changes how we write, not what the robot does.'],
                      [f"የካሬ መራመዱ ከ16 ካርዶች ወደ {16 - ns['saved']['square 3x3']} አነሰ፡ loops በጣም የሚያዋጡት የእርምጃዎች ቡድን ብዙ ጊዜ ሲደጋገም ነው።", 'የL-ቅርጽ ምንም አላዳነም፡ የሚደጋገም ቡድን የለም፤ ስለዚህ loop አይረዳም።', 'ሁለቱም ስሪቶች ሁልጊዜ በተመሳሳይ ካሬ ላይ አበቁ፡ loop የምንጽፍበትን መንገድ ይቀይራል እንጂ ሮቦቱ የሚያደርገውን አይደለም።']),
 decision=lambda ns: ('Look for the repeating group first, then use a repeat card; use single cards when nothing repeats. Next: loops inside stories and songs.', 'መጀመሪያ የሚደጋገመውን ቡድን ፈልጉ፣ ከዚያ የድገም ካርድ ተጠቀሙ፤ ምንም ነገር ካልተደጋገመ ነጠላ ካርዶችን ተጠቀሙ። ቀጣይ፡ በታሪኮችና በዘፈኖች ውስጥ loops።'), note=NOTE_SAMPLE))
C0.append(lab(('Bug hunt', 'የስህተት አደን'),
 ('Teams hide one bug in a path, swap, and measure how quickly others find and fix it.', 'ቡድኖች በመንገድ ውስጥ አንድ ስህተት ይደብቃሉ፣ ይቀያየራሉ፣ ሌሎች በምን ያህል ፍጥነት እንደሚያገኙትና እንደሚያስተካክሉት ይለካሉ።'), S30,
 [T('Arrow cards, chalk grid', 'paths with hidden bugs', 'የተደበቁ ስህተቶች ያሏቸው መንገዶች', 'cardboard, school yard'), T('A clock or phone timer', 'measure time to fix', 'ለማስተካከል የሚወስደውን ጊዜ ለካ', 'any phone'), TH],
 (['Each team builds a correct path, then changes one card secretly.', 'Swap paths with another team.', 'Use test–find–fix: walk it, stop at the first wrong step, change one card, walk again.', 'Time how long it takes; record the kind of bug.', 'Collect the class results.'],
  ['እያንዳንዱ ቡድን ትክክለኛ መንገድ ይገነባል፣ ከዚያ በሚስጥር አንድ ካርድ ይቀይራል።', 'ከሌላ ቡድን ጋር መንገዶችን ተቀያየሩ።', 'ፈትሽ–ፈልግ–አስተካክልን ተጠቀሙ፡ ተራመዱበት፣ በመጀመሪያው የተሳሳተ እርምጃ ቁሙ፣ አንድ ካርድ ቀይሩ፣ እንደገና ተራመዱ።', 'የሚወስደውን ጊዜ ለኩ፤ የስህተቱን ዓይነት መዝግቡ።', 'የክፍሉን ውጤቶች ሰብስቡ።']),
 '''
bugs = [("missing forward", 45), ("wrong turn", 70), ("extra forward", 40), ("wrong turn", 95), ("missing forward", 50), ("turn in wrong place", 120), ("wrong turn", 80)]   # (kind, seconds to fix)
from collections import defaultdict
by_kind = defaultdict(list)
for kind, sec in bugs: by_kind[kind].append(sec)
for kind, secs in sorted(by_kind.items(), key=lambda kv: -sum(kv[1]) / len(kv[1])):
    print(f"{kind:20s} found {len(secs)} times, average {sum(secs) / len(secs):.0f} s to fix")
slowest = max(by_kind, key=lambda k: sum(by_kind[k]) / len(by_kind[k]))
''',
 viz=lambda ns: [hbar(B('Average seconds to find and fix each kind of bug', 'እያንዳንዱን የስህተት ዓይነት ለማግኘትና ለማስተካከል አማካይ ሰከንዶች'), list(ns['by_kind']), [(B('Seconds', 'ሰከንዶች'), [sum(v) / len(v) for v in ns['by_kind'].values()], 1)], B('Seconds', 'ሰከንዶች'), fmt=0)],
 analysis=lambda ns: ([f"The slowest bug to fix was \"{ns['slowest']}\".", 'Missing or extra forward cards were found fastest: the robot clearly stops short or walks too far.', 'Turn bugs take longer because the robot looks fine until the corner.'],
                      [f"ለማስተካከል በጣም የዘገየው ስህተት «{ns['slowest']}» ነበር።", 'የጎደሉ ወይም ተጨማሪ ወደ ፊት ካርዶች በፍጥነት ተገኝተዋል፡ ሮቦቱ በግልጽ ቀድሞ ይቆማል ወይም በጣም ርቆ ይሄዳል።', 'የመዞሪያ ስህተቶች ረዘም ይወስዳሉ፤ ሮቦቱ እስከ ጥጉ ድረስ ደህና ስለሚመስል።']),
 decision=lambda ns: ('Teach "stop at the first wrong step" with turn bugs specifically; add a turn check at every corner before walking on.', '«በመጀመሪያው የተሳሳተ እርምጃ ቁም»ን በተለይ በመዞሪያ ስህተቶች አስተምሩ፤ ከመቀጠል በፊት በእያንዳንዱ ጥግ የመዞሪያ ፍተሻ ጨምሩ።'), note=NOTE_SAMPLE))
C0.append(lab(('First screen coding with ScratchJr', 'በScratchJr የመጀመሪያ የስክሪን ኮዲንግ'),
 ('Groups build a 4-block ScratchJr program together and track which blocks they could use alone.', 'ቡድኖች ባለ 4 ብሎክ የScratchJr ፕሮግራም አብረው ይገነባሉ፣ በራሳቸው ሊጠቀሙባቸው የቻሏቸውን ብሎኮች ይከታተላሉ።'), ('2 sessions of 15 min on screen', '2 ክፍለ ጊዜዎች፣ በስክሪን 15 ደቂቃ'),
 [T('ScratchJr', 'block programming for ages 5–7', 'ከ5–7 ዓመት ለሆኑ የብሎክ ፕሮግራሚንግ', 'free app for Android tablets and phones'), T('One tablet or phone per 3 children', 'shared screen time', 'የጋራ የስክሪን ጊዜ', 'school or teacher device'), PAPER, TH],
 (['Show the green-flag block, a move block and a say block.', 'Each child in the group adds one block in turn.', 'Tap the flag; did the character do what you planned?', 'Teacher ticks a checklist: which blocks each child used without help.', 'End after 15 minutes; talk about what you made.'],
  ['የአረንጓዴ ባንዲራ ብሎክን፣ የመንቀሳቀሻ ብሎክንና የመናገሪያ ብሎክን አሳዩ።', 'በቡድኑ ያለ እያንዳንዱ ልጅ በተራ አንድ ብሎክ ይጨምራል።', 'ባንዲራውን ንኩ፤ ገጸ ባሕሪው ያቀዳችሁትን አደረገ?', 'መምህሩ ማረጋገጫ ዝርዝር ላይ ምልክት ያደርጋል፡ እያንዳንዱ ልጅ ያለ እርዳታ የተጠቀመባቸው ብሎኮች።', 'ከ15 ደቂቃ በኋላ ጨርሱ፤ ስለሠራችሁት ተነጋገሩ።']),
 '''
children = 24
used_alone = {"green flag": 22, "move right": 20, "say": 15, "jump": 18, "repeat": 6}
for block, n in used_alone.items():
    print(f"{block:11s} {n:2d}/{children} ({n / children:.0%}) {'#' * n}")
weakest = min(used_alone, key=used_alone.get)
''',
 viz=lambda ns: [hbar(B('Children who used each block without help (of 24)', 'እያንዳንዱን ብሎክ ያለ እርዳታ የተጠቀሙ ልጆች (ከ24)'), list(ns['used_alone']), [(B('Children', 'ልጆች'), list(ns['used_alone'].values()), 1)], B('Children', 'ልጆች'), fmt=0)],
 analysis=lambda ns: (['Almost every child can start a program and move a character alone.', 'The say block is harder: it needs typing or recording.', f"Only {ns['used_alone']['repeat']} children used repeat alone: it is the newest idea on screen."],
                      ['ከሞላ ጎደል እያንዳንዱ ልጅ ፕሮግራም መጀመርና ገጸ ባሕሪን በራሱ ማንቀሳቀስ ይችላል።', 'የመናገሪያ ብሎኩ ይከብዳል፡ መጻፍ ወይም መቅዳት ይፈልጋል።', f"repeatን በራሳቸው የተጠቀሙት {ns['used_alone']['repeat']} ልጆች ብቻ ናቸው፡ በስክሪን ላይ አዲሱ ሐሳብ ነው።"]),
 decision=lambda ns: ('Link the repeat block to the floor "repeat card" next session (same idea, same name), and let children record their say-messages instead of typing.', 'በሚቀጥለው ክፍለ ጊዜ የrepeat ብሎኩን ከወለሉ «የድገም ካርድ» ጋር አገናኙ (ያው ሐሳብ፣ ያው ስም)፣ ልጆችም የመናገሪያ መልእክቶቻቸውን ከመጻፍ ይልቅ እንዲቀዱ አድርጉ።'), note=NOTE_SAMPLE))
C0.append(lab(('Floor robot with an obstacle', 'ከእንቅፋት ጋር የወለል ሮቦት'),
 ('Teams plan paths around a stone on paper first, then compare planned and actual moves.', 'ቡድኖች በድንጋይ ዙሪያ ያሉ መንገዶችን መጀመሪያ በወረቀት ያቅዳሉ፣ ከዚያ የታቀዱትንና ትክክለኛዎቹን እንቅስቃሴዎች ያወዳድራሉ።'), S30,
 [T('Cardboard robot with a direction arrow', 'the robot', 'ሮቦቱ', 'old box'), T('Stone or cup', 'the obstacle', 'እንቅፋቱ', 'school yard'), T('Bee-Bot (optional)', 'programmable floor robot', 'ፕሮግራም የሚደረግ የወለል ሮቦት', 'school kit, if available'), TH],
 (['Place a stone on the grid between START and HOME.', 'Teams draw the plan on paper as arrows.', 'One child reads the arrows, another moves the robot.', 'If the robot bumps the stone, mark where; fix and try again.', 'Record planned arrows vs arrows actually used.'],
  ['በፍርግርጉ ላይ በመነሻና በቤት መካከል ድንጋይ አስቀምጡ።', 'ቡድኖች ዕቅዱን በወረቀት ላይ እንደ ቀስቶች ይሥላሉ።', 'አንድ ልጅ ቀስቶቹን ያነባል፣ ሌላው ሮቦቱን ያንቀሳቅሳል።', 'ሮቦቱ ድንጋዩን ከመታ የት እንደሆነ ምልክት አድርጉ፤ አስተካክሉና እንደገና ሞክሩ።', 'የታቀዱትን ቀስቶች ከትክክል ጥቅም ላይ ከዋሉት ቀስቶች ጋር መዝግቡ።']),
 '''
teams = {"A": (8, 8, 0), "B": (7, 9, 1), "C": (8, 8, 0), "D": (6, 9, 2), "E": (9, 10, 1)}    # (planned, used, bumps)
for t, (p, u, b) in teams.items():
    print(f"team {t}: planned {p}, used {u}, bumps {b}, {'plan worked first time' if p == u and b == 0 else 'plan changed'}")
first = sum(1 for p, u, b in teams.values() if p == u and b == 0)
''',
 viz=lambda ns: [hbar(B('Planned vs actual arrows', 'የታቀዱ vs ትክክለኛ ቀስቶች'), [f'Team {k}' for k in ns['teams']], [(B('Planned', 'የታቀደ'), [v[0] for v in ns['teams'].values()], 1), (B('Actually used', 'በእርግጥ የተጠቀሙት'), [v[1] for v in ns['teams'].values()], 2)], B('Arrow cards', 'የቀስት ካርዶች'), fmt=0)],
 analysis=lambda ns: ([f"{ns['first']} of 5 plans worked first time.", 'Teams that bumped the stone had planned too few cards: they forgot the turn back after passing the obstacle.', 'Planning on paper made fixes faster: teams knew which arrow to change.'],
                      [f"ከ5 ዕቅዶች {ns['first']} በመጀመሪያ ጊዜ ሠርተዋል።", 'ድንጋዩን የመቱ ቡድኖች በጣም ጥቂት ካርዶችን አቅደዋል፡ እንቅፋቱን ካለፉ በኋላ ወደ ኋላ መዞሩን ረስተዋል።', 'በወረቀት ማቀድ ማስተካከያዎችን አፋጥኗል፡ ቡድኖች የትኛውን ቀስት እንደሚቀይሩ ያውቁ ነበር።']),
 decision=lambda ns: ('Add "turn back after the obstacle" to the planning checklist; next time use two obstacles.', '«ከእንቅፋቱ በኋላ ወደ ኋላ ዙር»ን ወደ ማቀጃ ዝርዝሩ ጨምሩ፤ በሚቀጥለው ጊዜ ሁለት እንቅፋቶችን ተጠቀሙ።'), note=NOTE_SAMPLE))
C0.append(lab(('Sort the market basket', 'የገበያ ቅርጫቱን ደርድር'),
 ('Children sort a basket by two rules, count each group and draw a picture chart.', 'ልጆች ቅርጫትን በሁለት ሕጎች ይደረድራሉ፣ እያንዳንዱን ቡድን ይቆጥራሉ፣ የሥዕል ቻርትም ይሥላሉ።'), S30,
 [T('A basket of local fruit and vegetables', 'things to sort', 'የሚደረደሩ ነገሮች', 'market'), PAPER, TH],
 (['Sort the basket by colour; count each group.', 'Sort the same basket by fruit vs vegetable; count again.', 'Draw one picture per item in a picture chart.', 'Ask: which rule made more groups? Which group is biggest?', 'Talk about how a phone sorts photos the same way after seeing many examples.'],
  ['ቅርጫቱን በቀለም ደርድሩ፤ እያንዳንዱን ቡድን ቁጠሩ።', 'ያንኑ ቅርጫት በፍራፍሬ vs አትክልት ደርድሩ፤ እንደገና ቁጠሩ።', 'በሥዕል ቻርት ውስጥ ለእያንዳንዱ ነገር አንድ ሥዕል ሣሉ።', 'ጠይቁ፡ የትኛው ሕግ ብዙ ቡድኖችን ሠራ? የትኛው ቡድን ትልቁ ነው?', 'ስልክ ብዙ ምሳሌዎችን ካየ በኋላ ፎቶዎችን በተመሳሳይ መንገድ እንዴት እንደሚደረድር ተነጋገሩ።']),
 '''
basket = ["tomato", "tomato", "mango", "banana", "banana", "banana", "onion", "carrot", "orange", "orange", "avocado", "cabbage"]
colour = {"tomato": "red", "mango": "yellow", "banana": "yellow", "onion": "red", "carrot": "orange", "orange": "orange", "avocado": "green", "cabbage": "green"}
kind = {"tomato": "vegetable", "mango": "fruit", "banana": "fruit", "onion": "vegetable", "carrot": "vegetable", "orange": "fruit", "avocado": "fruit", "cabbage": "vegetable"}
from collections import Counter
by_colour = Counter(colour[x] for x in basket); by_kind = Counter(kind[x] for x in basket)
print("by colour:", dict(by_colour)); print("by kind:  ", dict(by_kind))
''',
 viz=lambda ns: [hbar(B('The same basket sorted by colour', 'ያው ቅርጫት በቀለም የተደረደረ'), list(ns['by_colour']), [(B('Items', 'ነገሮች'), list(ns['by_colour'].values()), 1)], B('Items', 'ነገሮች'), fmt=0),
                 hbar(B('…and sorted by kind', '…እና በዓይነት የተደረደረ'), list(ns['by_kind']), [(B('Items', 'ነገሮች'), list(ns['by_kind'].values()), 3)], B('Items', 'ነገሮች'), fmt=0)],
 analysis=lambda ns: ([f"By colour there are {len(ns['by_colour'])} groups; by kind only {len(ns['by_kind'])}.", 'The same 12 items can be grouped in different ways: the rule decides the groups.', 'Every item is counted once in each chart: both add up to 12.'],
                      [f"በቀለም {len(ns['by_colour'])} ቡድኖች አሉ፤ በዓይነት {len(ns['by_kind'])} ብቻ።", 'ያው 12 ነገሮች በተለያዩ መንገዶች ሊቧደኑ ይችላሉ፡ ሕጉ ቡድኖቹን ይወስናል።', 'እያንዳንዱ ነገር በእያንዳንዱ ቻርት አንድ ጊዜ ይቆጠራል፡ ሁለቱም 12 ይደርሳሉ።']),
 decision=lambda ns: ('Use "sort by two rules" every week with different objects (seeds, leaves, bottle tops) to build the habit of describing groups with clear rules.', 'የአስተሳሰብ ልማድን ለመገንባት «በሁለት ሕጎች ደርድር»ን በየሳምንቱ በተለያዩ ነገሮች (ዘሮች፣ ቅጠሎች፣ የጠርሙስ ክዳኖች) ተጠቀሙ።'), note=NOTE_SAMPLE))
C0.append(lab(('Tell a story in three scenes', 'ታሪክን በሦስት ትዕይንቶች ተናገር'),
 ('Groups plan a folk tale in three scenes and check that each scene has a character, an action and an order.', 'ቡድኖች ተረትን በሦስት ትዕይንቶች ያቅዳሉ፣ እያንዳንዱ ትዕይንት ገጸ ባሕሪ፣ ተግባርና ቅደም ተከተል እንዳለው ይፈትሻሉ።'), S30,
 [T('Paper folded into 3 boxes', 'storyboard', 'የታሪክ ሰሌዳ', 'any paper'), T('ScratchJr or paper puppets', 'act the story', 'ታሪኩን ተውኑ', 'free app or paper and sticks'), TH],
 (['Choose a local folk tale (for example a clever hare).', 'Draw the beginning, middle and end in three boxes.', 'Under each box write who, what happens, and where.', 'Act it with puppets or build it in ScratchJr.', 'The class checks each story with a 3-point checklist.'],
  ['የአካባቢ ተረት ምረጡ (ለምሳሌ ብልህ ጥንቸል)።', 'መጀመሪያውን፣ መካከሉንና መጨረሻውን በሦስት ሳጥኖች ሣሉ።', 'ከእያንዳንዱ ሳጥን በታች ማን፣ ምን እንደሚሆንና የት እንደሆነ ጻፉ።', 'በአሻንጉሊቶች ተውኑት ወይም በScratchJr ገንቡት።', 'ክፍሉ እያንዳንዱን ታሪክ በባለ 3 ነጥብ ማረጋገጫ ዝርዝር ይፈትሻል።']),
 '''
checks = ["has a character", "something happens", "clear order"]
groups = {"G1": [1, 1, 1], "G2": [1, 1, 0], "G3": [1, 0, 1], "G4": [1, 1, 1], "G5": [1, 1, 0], "G6": [1, 1, 1]}
for i, c in enumerate(checks):
    n = sum(g[i] for g in groups.values())
    print(f"{c:18s} {n}/{len(groups)}")
missing = checks[min(range(3), key=lambda i: sum(g[i] for g in groups.values()))]
''',
 viz=lambda ns: [hbar(B('Stories that passed each check (of 6)', 'እያንዳንዱን ፍተሻ ያለፉ ታሪኮች (ከ6)'), ns['checks'], [(B('Groups', 'ቡድኖች'), [sum(g[i] for g in ns['groups'].values()) for i in range(3)], 1)], B('Groups', 'ቡድኖች'), fmt=0)],
 analysis=lambda ns: (['Every story had a character.', f"The weakest point was \"{ns['missing']}\": scenes were sometimes acted out of order.", 'Groups that wrote one sentence under each box kept the order right.'],
                      ['እያንዳንዱ ታሪክ ገጸ ባሕሪ ነበረው።', f"ደካማው ነጥብ «{ns['missing']}» ነበር፡ ትዕይንቶች አንዳንድ ጊዜ ያለ ቅደም ተከተል ተተውነዋል።", 'ከእያንዳንዱ ሳጥን በታች አንድ ዓረፍተ ነገር የጻፉ ቡድኖች ቅደም ተከተሉን ጠብቀዋል።']),
 decision=lambda ns: ('Make "number your boxes 1-2-3 and write one sentence each" a rule; next, add a message that starts each new scene.', '«ሳጥኖቻችሁን 1-2-3 ቁጥር ስጡና እያንዳንዳቸው አንድ ዓረፍተ ነገር ጻፉ»ን ሕግ አድርጉ፤ ቀጥሎ እያንዳንዱን አዲስ ትዕይንት የሚጀምር መልእክት ጨምሩ።'), note=NOTE_SAMPLE))
emit_labs('c', 0, C0, 9)

# ============================ Level 1 (Scratch) ============================
SCR = T('Scratch 3', 'block programming', 'የብሎክ ፕሮግራሚንግ', 'scratch.mit.edu or the free offline app')
PT = T('Python 3 (teacher, optional)', 'analyses the play-test data', 'የጨዋታ-ፈተና ዳታውን ይተነትናል', 'Thonny')
WK = ('3 sessions of 45 min', '3 ክፍለ ጊዜዎች፣ እያንዳንዱ 45 ደቂቃ')
C1 = []
C1.append(lab(('Windmill speed experiment', 'የንፋስ ወፍጮ ፍጥነት ሙከራ'),
 ('Build a forever-spinning windmill and measure how turn angle and wait time change its speed.', 'ለዘላለም የሚዞር የንፋስ ወፍጮ ገንባና የመዞሪያ ማዕዘንና የመጠበቂያ ጊዜ ፍጥነቱን እንዴት እንደሚቀይሩ ለካ።'), WK,
 [SCR, T('Stopwatch (phone)', 'count turns in 10 seconds', 'በ10 ሰከንድ ውስጥ ዙሮችን ቁጠር', 'any phone'), PAPER, PT],
 (['Draw or pick a windmill sprite.', 'Script: when green flag clicked → forever → turn (angle) → wait (seconds).', 'Set angle 10, wait 0.1; count full turns in 10 seconds.', 'Repeat for angles 5, 10, 20 and waits 0.05, 0.1, 0.2; record in a table.', 'Predict, then check: what makes it fastest?'],
  ['የንፋስ ወፍጮ sprite ሣል ወይም ምረጥ።', 'ስክሪፕት፡ አረንጓዴው ባንዲራ ሲጫን → forever → (ማዕዘን) ዙር → (ሰከንዶች) ጠብቅ።', 'ማዕዘን 10፣ መጠበቂያ 0.1 አድርግ፤ በ10 ሰከንድ ውስጥ ሙሉ ዙሮችን ቁጠር።', 'ለማዕዘኖች 5፣ 10፣ 20 እና ለመጠበቂያዎች 0.05፣ 0.1፣ 0.2 ድገም፤ በሰንጠረዥ መዝግብ።', 'ተንብይ፣ ከዚያ ፈትሽ፡ በጣም ፈጣን የሚያደርገው ምንድነው?']),
 '''
results = {}
for angle in (5, 10, 20):
    for wait in (0.05, 0.1, 0.2):
        steps_per_s = 1 / (wait + 1 / 30)          # Scratch redraws ~30 times a second; each loop takes at least one frame
        turns_10s = 10 * steps_per_s * angle / 360
        results[(angle, wait)] = round(turns_10s, 1)
for (a, w), n in results.items():
    print(f"angle {a:2d}, wait {w:4.2f}s -> about {n:4.1f} full turns in 10 s")
best = max(results, key=results.get)
''',
 viz=lambda ns: [line(B('Full turns in 10 seconds', 'በ10 ሰከንድ ውስጥ ሙሉ ዙሮች'), [0.05, 0.1, 0.2], [(B(f'angle {a}°', f'ማዕዘን {a}°'), [ns['results'][(a, w)] for w in (0.05, 0.1, 0.2)], i + 1) for i, a in enumerate((5, 10, 20))], B('Wait (seconds)', 'መጠበቂያ (ሰከንዶች)'), B('Turns in 10 s', 'በ10 ሰ ውስጥ ዙሮች'), xint=False, ymin=0)],
 analysis=lambda ns: ([f"Fastest: angle {ns['best'][0]}° with wait {ns['best'][1]} s ({ns['results'][ns['best']]} turns).", 'Doubling the angle doubles the speed; doubling the wait does not quite halve it, because each loop also takes one screen frame.', 'Very small waits look jerky with big angles: speed and smoothness trade off.'],
                      [f"በጣም ፈጣኑ፡ ማዕዘን {ns['best'][0]}° ከመጠበቂያ {ns['best'][1]} ሰ ጋር ({ns['results'][ns['best']]} ዙሮች)።", 'ማዕዘኑን በእጥፍ ማሳደግ ፍጥነቱን በእጥፍ ያሳድጋል፤ መጠበቂያውን በእጥፍ ማሳደግ ግን በትክክል በግማሽ አይቀንሰውም፣ እያንዳንዱ loop አንድ የስክሪን frame ስለሚወስድ።', 'በጣም ትናንሽ መጠበቂያዎች ከትላልቅ ማዕዘኖች ጋር የሚያንቀጠቅጡ ይመስላሉ፡ ፍጥነትና ለስላሳነት ይመጣጠናሉ።']),
 decision=lambda ns: ('Use small angles (5–10°) with short waits for smooth animation, and change only one setting at a time when testing: that is a fair test.', 'ለለስላሳ አኒሜሽን ትናንሽ ማዕዘኖችን (5–10°) ከአጭር መጠበቂያዎች ጋር ተጠቀም፤ ስትፈትሽ በአንድ ጊዜ አንድ ቅንብር ብቻ ቀይር፡ ይህ ፍትሐዊ ፈተና ነው።'),
 note=('Turn counts are calculated from Scratch’s frame rate (about 30 per second); your counts may differ slightly.', 'የዙር ቆጠራዎቹ ከScratch frame rate (በሰከንድ ወደ 30) የተሰሉ ናቸው፤ የአንተ ቆጠራዎች ትንሽ ሊለያዩ ይችላሉ።')))
C1.append(lab(('Play-testing the catch game', 'የመያዣ ጨዋታውን በመጫወት መፈተሽ'),
 ('Tune the falling speed of a catch-the-mango game so it is neither too easy nor too hard, using play-test data.', 'የጨዋታ-ፈተና ዳታን በመጠቀም የማንጎ መያዣ ጨዋታን የመውደቂያ ፍጥነት በጣም ቀላልም በጣም ከባድም እንዳይሆን አስተካክል።'), WK,
 [SCR, T('5 classmates as testers', 'real players', 'እውነተኛ ተጫዋቾች', 'your class'), PAPER, PT],
 (['Build the game: basket on arrow keys; mango falls (change y by −speed); if touching basket → sound, back to top.', 'Add a variable "caught" and a variable "dropped".', 'Each tester plays 60 seconds at speed 3, 5, 7 and 9.', 'Record caught and dropped for each speed.', 'Calculate the catch rate = caught / (caught + dropped).'],
  ['ጨዋታውን ገንባ፡ ቅርጫት በቀስት ቁልፎች፤ ማንጎ ይወድቃል (yን በ−speed ቀይር)፤ ቅርጫት ከነካ → ድምፅ፣ ወደ ላይ ተመለስ።', '«caught» variable እና «dropped» variable ጨምር።', 'እያንዳንዱ ፈታኝ በፍጥነት 3፣ 5፣ 7 እና 9 ለ60 ሰከንድ ይጫወታል።', 'ለእያንዳንዱ ፍጥነት የተያዙትንና የወደቁትን መዝግብ።', 'የመያዣ መጠንን አስላ = caught / (caught + dropped)።']),
 '''
tests = {3: [(14, 1), (13, 2), (15, 0), (12, 3), (14, 1)], 5: [(17, 5), (15, 7), (18, 4), (14, 8), (16, 6)],
         7: [(14, 13), (12, 15), (15, 12), (11, 16), (13, 14)], 9: [(8, 24), (6, 26), (9, 23), (5, 27), (7, 25)]}   # (caught, dropped) per tester
rate = {}
for speed, rows in tests.items():
    c = sum(a for a, b in rows); d = sum(b for a, b in rows)
    rate[speed] = c / (c + d)
    print(f"speed {speed}: catch rate {rate[speed]:.0%}")
target = min(rate, key=lambda s: abs(rate[s] - 0.7))
''',
 viz=lambda ns: [line(B('Catch rate by falling speed', 'የመያዣ መጠን በመውደቂያ ፍጥነት'), list(ns['rate']), [(B('Catch rate %', 'የመያዣ መጠን %'), [100 * v for v in ns['rate'].values()], 1)], B('Falling speed', 'የመውደቂያ ፍጥነት'), B('Percent caught', 'የተያዘ መቶኛ'), refs=[{'kind': 'h', 'v': 70, 'label': B('target 70%', 'ዒላማ 70%')}], ymin=0, ymax=100)],
 analysis=lambda ns: ([f"At speed 3 players catch {ns['rate'][3]:.0%}: too easy, testers got bored.", f"At speed 9 only {ns['rate'][9]:.0%}: too hard.", f"Speed {ns['target']} is closest to the 70% target that game designers often aim for."],
                      [f"በፍጥነት 3 ተጫዋቾች {ns['rate'][3]:.0%} ይይዛሉ፡ በጣም ቀላል፣ ፈታኞቹ ሰለቻቸው።", f"በፍጥነት 9 {ns['rate'][9]:.0%} ብቻ፡ በጣም ከባድ።", f"ፍጥነት {ns['target']} የጨዋታ ዲዛይነሮች ብዙውን ጊዜ ለሚያልሙት 70% ዒላማ በጣም ቅርብ ነው።"]),
 decision=lambda ns: (f"Start the game at speed {ns['target']} and increase the speed by 1 every 10 catches, so the game gets harder as the player improves.", f"ጨዋታውን በፍጥነት {ns['target']} ጀምርና በየ10 መያዣዎች ፍጥነቱን በ1 ጨምር፤ ስለዚህ ተጫዋቹ ሲሻሻል ጨዋታው ይከብዳል።"), note=NOTE_SAMPLE))
C1.append(lab(('Is the Scratch dice fair?', 'የScratch ዳይሱ ፍትሐዊ ነው?'),
 ('Roll a Scratch dice 120 times with a list, compare with a real dice, and test fairness.', 'የScratch ዳይስን በlist 120 ጊዜ ጣል፣ ከእውነተኛ ዳይስ ጋር አወዳድር፣ ፍትሐዊነትንም ፈትሽ።'), WK,
 [SCR, T('A real dice', 'compare with chance in the real world', 'በእውነተኛው ዓለም ካለ አጋጣሚ ጋር አወዳድር', 'market or board game'), PAPER, PT],
 (['Make a list "rolls" and a loop: repeat 120 → add (pick random 1 to 6) to rolls.', 'Count how many of each number with a loop over the list (or export the list).', 'Roll a real dice 120 times and tally.', 'Draw both tallies as bar charts.', 'Compare with the expected 20 each.'],
  ['«rolls» list እና loop ሥራ፡ 120 ጊዜ ድገም → (ከ1 እስከ 6 በዘፈቀደ)ን ወደ rolls ጨምር።', 'በlistኡ ላይ በloop እያንዳንዱ ቁጥር ስንት እንደሆነ ቁጠር (ወይም listኡን ላክ)።', 'እውነተኛ ዳይስ 120 ጊዜ ጣልና ቁጠር።', 'ሁለቱንም ቆጠራዎች እንደ የአሞሌ ቻርቶች ሣል።', 'ከሚጠበቀው ለእያንዳንዱ 20 ጋር አወዳድር።']),
 '''
import random
from scipy import stats
random.seed(7)
scratch = [random.randint(1, 6) for _ in range(120)]
cr = [22, 18, 19, 24, 17, 20]                          # in class: your tally from 120 rolls of the real dice
cs = [scratch.count(k) for k in range(1, 7)]
print("Scratch dice:", cs); print("Real dice:   ", cr)
for name, counts in [("Scratch", cs), ("Real", cr)]:
    chi, p = stats.chisquare(counts)
    print(f"{name}: chi-square {chi:.1f}, p = {p:.2f} -> {'consistent with a fair dice' if p > 0.05 else 'looks unfair'}")
p_scratch = stats.chisquare(cs)[1]
''',
 viz=lambda ns: [hbar(B('120 rolls: how often each number came up (expected 20)', '120 ጣሎች፡ እያንዳንዱ ቁጥር ስንት ጊዜ እንደመጣ (የሚጠበቀው 20)'), [str(k) for k in range(1, 7)], [(B('Scratch dice', 'የScratch ዳይስ'), ns['cs'], 1), (B('Real dice', 'እውነተኛ ዳይስ'), ns['cr'], 2)], B('Times rolled', 'የተጣለበት ጊዜ'), fmt=0)],
 analysis=lambda ns: ([f"The Scratch dice counts range from {min(ns['cs'])} to {max(ns['cs'])}: not exactly 20 each, and that is normal chance.", f"The chi-square test gives p = {ns['p_scratch']:.2f}: no evidence the Scratch dice is unfair.", f"The real dice also varies ({min(ns['cr'])} to {max(ns['cr'])}) and passes the same test: both behave like fair dice."],
                      [f"የScratch ዳይስ ቆጠራዎች ከ{min(ns['cs'])} እስከ {max(ns['cs'])} ይደርሳሉ፡ ለእያንዳንዱ በትክክል 20 አይደሉም፣ ይህም መደበኛ አጋጣሚ ነው።", f"የchi-square ፈተናው p = {ns['p_scratch']:.2f} ይሰጣል፡ የScratch ዳይሱ ፍትሐዊ እንዳልሆነ ማስረጃ የለም።", f"እውነተኛው ዳይስም ይለያያል ({min(ns['cr'])} እስከ {max(ns['cr'])})፣ ያንኑ ፈተናም ያልፋል፡ ሁለቱም እንደ ፍትሐዊ ዳይሶች ይሠራሉ።"]),
 decision=lambda ns: ('Use "pick random" for fair games with confidence; when counts look too perfect or too uneven, collect more rolls before deciding.', 'ለፍትሐዊ ጨዋታዎች «pick random»ን በእርግጠኝነት ተጠቀም፤ ቆጠራዎች በጣም ፍጹም ወይም በጣም ያልተመጣጠኑ ሲመስሉ ከመወሰንህ በፊት ብዙ ጣሎችን ሰብስብ።')))
C1.append(lab(('Teach a computer two crops', 'ኮምፒውተርን ሁለት ሰብሎች አስተምር'),
 ('Train Teachable Machine with more and more photos and measure how accuracy grows on photos it has never seen.', 'Teachable Machineን በብዙና በብዙ ፎቶዎች አሰልጥንና ፈጽሞ ባላያቸው ፎቶዎች ላይ ትክክለኛነቱ እንዴት እንደሚያድግ ለካ።'), WK,
 [T('Teachable Machine', 'trains an image model in the browser', 'በአሳሹ ውስጥ የምስል ሞዴል ያሰለጥናል', 'teachablemachine.withgoogle.com (free)'), T('Phone camera', 'collect photos of teff and maize', 'የጤፍና የበቆሎ ፎቶዎችን ሰብስብ', 'any phone'), PAPER, PT],
 (['Take 60 photos of each crop in different light and backgrounds.', 'Keep 10 photos of each aside as a test set.', 'Train with 5, 10, 20 and 50 photos per crop.', 'After each training, test on the 20 kept-aside photos and count correct answers.', 'Record accuracy for each training size.'],
  ['የእያንዳንዱን ሰብል 60 ፎቶዎች በተለያየ ብርሃንና ዳራ አንሳ።', 'ከእያንዳንዱ 10 ፎቶዎችን እንደ የፈተና ስብስብ ለይተህ አስቀምጥ።', 'በሰብል በ5፣ 10፣ 20 እና 50 ፎቶዎች አሰልጥን።', 'ከእያንዳንዱ ሥልጠና በኋላ በተለዩት 20 ፎቶዎች ፈትሽና ትክክለኛ መልሶችን ቁጠር።', 'ለእያንዳንዱ የሥልጠና መጠን ትክክለኛነትን መዝግብ።']),
 '''
train_sizes = [5, 10, 20, 50]
correct = {5: 13, 10: 15, 20: 17, 50: 19}      # correct answers out of 20 test photos (class results)
same_background = {5: 18, 10: 19, 20: 19, 50: 20}   # if the test photos had the same background as training
for n in train_sizes:
    print(f"{n:2d} photos per crop: {correct[n]}/20 on new photos ({correct[n] / 20:.0%}), {same_background[n]}/20 on look-alike photos")
''',
 viz=lambda ns: [line(B('Accuracy on 20 unseen photos', 'ባልታዩ 20 ፎቶዎች ላይ ትክክለኛነት'), ns['train_sizes'], [(B('New backgrounds', 'አዲስ ዳራዎች'), [100 * ns['correct'][n] / 20 for n in ns['train_sizes']], 1), (B('Same background as training', 'ከሥልጠና ጋር ተመሳሳይ ዳራ'), [100 * ns['same_background'][n] / 20 for n in ns['train_sizes']], 2)], B('Training photos per crop', 'በሰብል የሥልጠና ፎቶዎች'), B('Percent correct', 'ትክክለኛ መቶኛ'), ymin=50, ymax=100)],
 analysis=lambda ns: ([f"With 5 photos per crop the model was right {ns['correct'][5]} times out of 20; with 50 photos, {ns['correct'][50]} times.", 'On photos that look like the training photos it seems almost perfect: that score is too optimistic.', 'More and more varied photos help most.'],
                      [f"በሰብል 5 ፎቶዎች ሞዴሉ ከ20 {ns['correct'][5]} ጊዜ ትክክል ነበር፤ በ50 ፎቶዎች {ns['correct'][50]} ጊዜ።", 'የሥልጠና ፎቶዎችን በሚመስሉ ፎቶዎች ላይ ከሞላ ጎደል ፍጹም ይመስላል፡ ያ ውጤት ከልክ በላይ ተስፋ ሰጪ ነው።', 'ብዙና የተለያዩ ፎቶዎች በጣም ይረዳሉ።']),
 decision=lambda ns: ('Always test on photos the model has not seen, from new places; collect at least 50 varied photos per crop before trusting the model.', 'ሞዴሉን ባላያቸው፣ ከአዳዲስ ቦታዎች በተወሰዱ ፎቶዎች ሁልጊዜ ፈትሽ፤ ሞዴሉን ከማመንህ በፊት በሰብል ቢያንስ 50 የተለያዩ ፎቶዎችን ሰብስብ።'), note=NOTE_SAMPLE))
emit_labs('c', 1, C1, 4)

# ============================ Level 2 (Grades 5–8) ============================
W2 = ('2 weeks · 3 h per week', '2 ሳምንታት · በሳምንት 3 ሰዓት')
C2 = []
C2.append(lab(('Market price survey and calculator', 'የገበያ ዋጋ ጥናትና ማስሊያ'),
 ('Collect real prices from three markets, build a Python calculator and decide where a family should buy.', 'ከሦስት ገበያዎች እውነተኛ ዋጋዎችን ሰብስብ፣ የPython ማስሊያ ገንባ፣ ቤተሰብ የት መግዛት እንዳለበት ወስን።'), W2,
 [PY, T('Notebook', 'record prices at the market', 'በገበያው ዋጋዎችን መዝግብ', 'school supplies'), MPL, T('micro:bit (optional)', 'show the cheapest market on its screen', 'በስክሪኑ ላይ በጣም ርካሹን ገበያ አሳይ', 'school kit')],
 (['Ask an adult to help record the price per kg of teff, maize, onions and oil in three markets.', 'Type the prices into a Python dictionary.', 'Write a function total(basket, market) that returns the cost of a family basket.', 'Add transport cost to each market.', 'Print totals and draw a bar chart; decide.'],
  ['በሦስት ገበያዎች የጤፍ፣ የበቆሎ፣ የሽንኩርትና የዘይት በኪሎ ዋጋ እንዲመዘግብ አንድ አዋቂ ጠይቅ።', 'ዋጋዎቹን ወደ Python dictionary ጻፍ።', 'የቤተሰብ ቅርጫት ወጪን የሚመልስ total(basket, market) function ጻፍ።', 'ለእያንዳንዱ ገበያ የትራንስፖርት ወጪ ጨምር።', 'ድምሮቹን አትምና የአሞሌ ቻርት ሣል፤ ወስን።']),
 '''
prices = {"Village": {"teff": 125, "maize": 42, "onion": 60, "oil": 210},
          "Town":    {"teff": 116, "maize": 38, "onion": 50, "oil": 195},
          "City":    {"teff": 110, "maize": 36, "onion": 45, "oil": 185}}
transport = {"Village": 0, "Town": 60, "City": 180}       # return trip, birr
basket = {"teff": 10, "maize": 5, "onion": 3, "oil": 1}   # kg (oil in litres)
def total(market):
    return sum(prices[market][item] * qty for item, qty in basket.items())
cost = {m: total(m) + transport[m] for m in prices}
for m in prices:
    print(f"{m:8s} goods {total(m):5.0f} + transport {transport[m]:3d} = {cost[m]:5.0f} birr")
best = min(cost, key=cost.get)
print(f"cheapest overall: {best}, saving {max(cost.values()) - cost[best]:.0f} birr per basket")
''',
 viz=lambda ns: [hbar(B('Cost of the family basket by market (birr)', 'የቤተሰብ ቅርጫት ወጪ በገበያ (ብር)'), list(ns['prices']), [(B('Goods', 'ዕቃዎች'), [ns['total'](m) for m in ns['prices']], 1), (B('Goods + transport', 'ዕቃዎች + ትራንስፖርት'), list(ns['cost'].values()), 2)], B('Birr', 'ብር'), fmt=0)],
 analysis=lambda ns: ([f"The city has the cheapest goods, but transport ({ns['transport']['City']} birr) eats much of the saving.", f"Including transport, the cheapest is {ns['best']} ({ns['cost'][ns['best']]:.0f} birr).", 'For a smaller basket the village wins, because transport is a fixed cost.'],
                      [f"ከተማው በጣም ርካሽ ዕቃዎች አሉት፤ ግን ትራንስፖርት ({ns['transport']['City']} ብር) ቁጠባውን በብዛት ይበላል።", f"ትራንስፖርትን ጨምሮ በጣም ርካሹ {ns['best']} ነው ({ns['cost'][ns['best']]:.0f} ብር)።", 'ለትንሽ ቅርጫት መንደሩ ያሸንፋል፣ ትራንስፖርት ቋሚ ወጪ ስለሆነ።']),
 decision=lambda ns: (f"Buy the monthly basket in {ns['best']}; buy small top-ups in the village. Re-check prices every month.", f"ወርሃዊውን ቅርጫት በ{ns['best']} ግዛ፤ ትናንሽ ተጨማሪዎችን በመንደሩ ግዛ። ዋጋዎችን በየወሩ እንደገና ፈትሽ።"), note=NOTE_SAMPLE))
C2.append(lab(('Rain gauge to planting decision', 'ከዝናብ መለኪያ ወደ የመዝሪያ ውሳኔ'),
 ('Build a bottle rain gauge, record three weeks of rain, analyse it in a spreadsheet and Python, and advise when to plant.', 'የጠርሙስ የዝናብ መለኪያ ገንባ፣ የሦስት ሳምንታት ዝናብ መዝግብ፣ በስፕሬድሺትና በPython ተንትነው፣ መቼ እንደሚዘራ ምከር።'), ('3 weeks · 15 min daily + 2 lessons', '3 ሳምንታት · በቀን 15 ደቂቃ + 2 ትምህርቶች'),
 [T('Plastic bottle, ruler, tape', 'the rain gauge', 'የዝናብ መለኪያው', 'recycled bottle'), SHEET, PY, MPL],
 (['Cut the top off a straight-sided bottle, invert it as a funnel, tape a ruler to the side.', 'Every morning at 8:00 read the water level in mm, write it down, then empty the bottle.', 'Enter the 21 days into a spreadsheet: day, rain_mm.', 'In Python, compute weekly totals and a 3-day moving total.', 'Plot daily rain and the 3-day total; apply the planting rule.'],
  ['ቀጥ ያለ ጎን ያለውን ጠርሙስ አናቱን ቁረጥ፣ እንደ ፈንገስ ገልብጠው፣ በጎኑ ላይ ማስመሪያ በፕላስተር አጣብቅ።', 'በየጠዋቱ 8፡00 ላይ የውሃውን መጠን በmm አንብብ፣ ጻፈው፣ ከዚያ ጠርሙሱን ባዶ አድርግ።', '21ዱን ቀናት ወደ ስፕሬድሺት አስገባ፡ day፣ rain_mm።', 'በPython ሳምንታዊ ድምሮችንና የ3-ቀን ተንቀሳቃሽ ድምር አስላ።', 'የዕለት ዝናብንና የ3-ቀን ድምሩን ቻርት አድርግ፤ የመዝሪያ ሕጉን ተግብር።']),
 '''
rain = [0, 0, 2, 0, 5, 0, 0, 1, 0, 8, 12, 3, 0, 0, 6, 14, 9, 11, 2, 0, 7]   # mm, 21 mornings
weeks = [sum(rain[i:i + 7]) for i in range(0, 21, 7)]
moving3 = [sum(rain[max(0, d - 2):d + 1]) for d in range(21)]
RULE = 20     # local rule of thumb: plant when 3 days bring at least 20 mm and the soil is wet a hand deep
ready = [d + 1 for d, m in enumerate(moving3) if m >= RULE]
print("weekly totals (mm):", weeks)
print("days with a 3-day total >= 20 mm:", ready)
first = ready[0] if ready else None
''',
 viz=lambda ns: [line(B('Daily rain and the 3-day total', 'የዕለት ዝናብና የ3-ቀን ድምር'), list(range(1, 22)), [(B('Daily rain', 'የዕለት ዝናብ'), ns['rain'], 1), (B('3-day total', 'የ3-ቀን ድምር'), ns['moving3'], 2)], B('Day', 'ቀን'), B('mm', 'mm'), refs=[{'kind': 'h', 'v': 20, 'label': B('planting threshold 20 mm', 'የመዝሪያ ወሰን 20 mm')}], ymin=0),
                 hbar(B('Weekly rain totals', 'ሳምንታዊ የዝናብ ድምሮች'), ['Week 1', 'Week 2', 'Week 3'], [(B('mm', 'mm'), ns['weeks'], 1)], B('mm', 'mm'), fmt=0)],
 analysis=lambda ns: ([f"Weekly rain rose from {ns['weeks'][0]} to {ns['weeks'][2]} mm: the main rains are starting.", f"The 3-day total first reached 20 mm on day {ns['first']}.", 'Single wet days in week 1 were false starts: planting then risks seeds drying out.'],
                      [f"ሳምንታዊ ዝናብ ከ{ns['weeks'][0]} ወደ {ns['weeks'][2]} mm ጨመረ፡ ዋናው ዝናብ እየጀመረ ነው።", f"የ3-ቀን ድምሩ ለመጀመሪያ ጊዜ 20 mm የደረሰው በቀን {ns['first']} ነው።", 'በሳምንት 1 ያሉ ነጠላ እርጥብ ቀናት የሐሰት ጅምሮች ነበሩ፡ ያኔ መዝራት ዘሮች እንዲደርቁ ያጋልጣል።']),
 decision=lambda ns: (f"Advise planting from day {ns['first']} after checking the soil is wet a hand deep; keep recording, and compare with the extension office forecast.", f"አፈሩ የእጅ ጥልቀት ያህል እርጥብ መሆኑን ካረጋገጣችሁ በኋላ ከቀን {ns['first']} ጀምሮ እንዲዘራ ምከሩ፤ መመዝገብ ቀጥሉ፣ ከኤክስቴንሽን ቢሮ ትንበያ ጋርም አወዳድሩ።"),
 note=('The 20 mm rule is a simple teaching rule; use your local extension office’s recommendation.', 'የ20 mm ሕጉ ቀላል የማስተማሪያ ሕግ ነው፤ የአካባቢህን የኤክስቴንሽን ቢሮ ምክረ ሐሳብ ተጠቀም።')))
C2.append(lab(('Class survey website with a data file', 'ከዳታ ፋይል ጋር የክፍል ጥናት ድረ ገጽ'),
 ('Run a class survey, save it as CSV, analyse it in Python and publish the results on your HTML page.', 'የክፍል ጥናት አካሂድ፣ እንደ CSV አስቀምጠው፣ በPython ተንትነው፣ ውጤቶቹንም በHTML ገጽህ ላይ አትም።'), W2,
 [PY, T('Text editor + browser', 'build the results web page', 'የውጤቶች ድረ ገጹን ገንባ', 'any computer, works offline'), SHEET, MPL],
 (['Agree 3 questions: how you travel to school, minutes of travel, favourite crop to eat.', 'Collect answers from 30 pupils into survey.csv.', 'In Python: load the CSV, count answers, compute average travel time per transport type.', 'Save a chart as results.png and write results.html with a heading, the chart and three findings.', 'Present the page to the class and agree one action.'],
  ['በ3 ጥያቄዎች ተስማሙ፡ ወደ ትምህርት ቤት እንዴት እንደምትመጣ፣ የጉዞ ደቂቃዎች፣ ለመብላት የምትወደው ሰብል።', 'ከ30 ተማሪዎች መልሶችን ወደ survey.csv ሰብስብ።', 'በPython፡ CSVውን ጫን፣ መልሶችን ቁጠር፣ በትራንስፖርት ዓይነት አማካይ የጉዞ ጊዜን አስላ።', 'ቻርትን እንደ results.png አስቀምጥና ርዕስ፣ ቻርቱንና ሦስት ግኝቶችን የያዘ results.html ጻፍ።', 'ገጹን ለክፍሉ አቅርብና በአንድ እርምጃ ተስማሙ።']),
 '''
import csv, io, statistics
data = """travel,minutes,crop
walk,25,teff
walk,40,maize
walk,15,teff
bicycle,12,teff
walk,55,potato
bajaj,10,teff
walk,35,maize
bicycle,18,teff
walk,60,teff
walk,30,potato
bajaj,8,maize
walk,45,teff"""                       # in class: open("survey.csv")
rows = list(csv.DictReader(io.StringIO(data)))
by_travel = {}
for r in rows:
    by_travel.setdefault(r["travel"], []).append(int(r["minutes"]))
for t, mins in by_travel.items():
    print(f"{t:8s} {len(mins):2d} pupils, average {statistics.mean(mins):4.1f} min, longest {max(mins)} min")
long_walkers = sum(1 for r in rows if r["travel"] == "walk" and int(r["minutes"]) >= 45)
print("pupils walking 45 minutes or more:", long_walkers)
html = f"<h1>How we travel to school</h1><img src='results.png' alt='Average travel time by transport'><p>{long_walkers} pupils walk 45 minutes or more.</p>"
open("results.html", "w").write(html)
''',
 viz=lambda ns: [hbar(B('Average travel time to school (minutes)', 'ወደ ትምህርት ቤት አማካይ የጉዞ ጊዜ (ደቂቃዎች)'), list(ns['by_travel']), [(B('Minutes', 'ደቂቃዎች'), [sum(v) / len(v) for v in ns['by_travel'].values()], 1)], B('Minutes', 'ደቂቃዎች'), fmt=0)],
 analysis=lambda ns: ([f"Walkers spend on average {sum(ns['by_travel']['walk']) / len(ns['by_travel']['walk']):.0f} minutes, three times more than bicycle riders.", f"{ns['long_walkers']} pupils walk 45 minutes or more each way.", 'This is a small example sample: a full class survey gives a fairer picture.'],
                      [f"በእግር የሚመጡ በአማካይ {sum(ns['by_travel']['walk']) / len(ns['by_travel']['walk']):.0f} ደቂቃዎች ያሳልፋሉ፣ ከብስክሌት ነጂዎች ሦስት እጥፍ።", f"{ns['long_walkers']} ተማሪዎች በእያንዳንዱ አቅጣጫ 45 ደቂቃ ወይም ከዚያ በላይ ይራመዳሉ።", 'ይህ ትንሽ የምሳሌ ናሙና ነው፡ ሙሉ የክፍል ጥናት ይበልጥ ፍትሐዊ ሥዕል ይሰጣል።']),
 decision=lambda ns: ('Share the page with the school director and propose letting long-distance walkers start 15 minutes later or join a walking group; repeat the survey next term to see if anything changed.', 'ገጹን ለትምህርት ቤቱ ዳይሬክተር አጋራና ረጅም ርቀት የሚራመዱ 15 ደቂቃ ዘግይተው እንዲጀምሩ ወይም የእግር ጉዞ ቡድን እንዲቀላቀሉ አቅርብ፤ የተለወጠ ነገር እንዳለ ለማየት ጥናቱን በሚቀጥለው ሴሚስተር ድገም።'), note=NOTE_SAMPLE))
C2.append(lab(('Smart garden monitor: from sensor to irrigation schedule', 'ብልህ የአትክልት መከታተያ፡ ከሴንሰር ወደ የመስኖ መርሐ ግብር'),
 ('Log soil moisture for a week with a low-cost board, find when the soil dries, and set a watering schedule that saves water.', 'በርካሽ ቦርድ ለአንድ ሳምንት የአፈር እርጥበትን መዝግብ፣ አፈሩ መቼ እንደሚደርቅ ፈልግ፣ ውሃ የሚያድን የመጠጫ መርሐ ግብር አዘጋጅ።'), ('2 weeks', '2 ሳምንታት'),
 [T('Arduino Uno or Raspberry Pi Pico', 'reads the sensor and logs data', 'ሴንሰሩን ያነባል፣ ዳታን ይመዘግባል', 'about 10–25 USD'), T('Capacitive soil-moisture sensor', 'measures soil water', 'የአፈር ውሃን ይለካል', 'about 2–5 USD'), T('Solar power bank', 'power without the grid', 'ያለ ኤሌክትሪክ መስመር ኃይል', 'local electronics shop'), PY, MPL],
 (['Calibrate: record the raw reading in dry soil and just after watering.', 'Log a reading every hour for 7 days to a CSV file (time, raw).', 'Convert raw readings to % moisture with the calibration.', 'Plot moisture over time; mark when it drops below 30%.', 'Compare "water every day" with "water when below 30%".'],
  ['አስተካክል፡ በደረቅ አፈርና ልክ ውሃ ካጠጣህ በኋላ ጥሬ ንባቡን መዝግብ።', 'ለ7 ቀናት በየሰዓቱ ንባብን ወደ CSV ፋይል መዝግብ (time፣ raw)።', 'በማስተካከያው ጥሬ ንባቦችን ወደ % እርጥበት ቀይር።', 'እርጥበትን በጊዜ ሂደት ቻርት አድርግ፤ ከ30% በታች ሲወርድ ምልክት አድርግ።', '«በየቀኑ አጠጣ»ን ከ«ከ30% በታች ሲሆን አጠጣ» ጋር አወዳድር።']),
 '''
import numpy as np
DRY, WET = 820, 380
rng = np.random.default_rng(4)
hours = np.arange(0, 7 * 24, 6)                       # one reading every 6 hours shown (hourly in class)
moisture, m, waterings = [], 70.0, []
for h in hours:
    hot = 2.6 if (h % 24) in (12, 18) else 1.0       # drying is faster in the afternoon
    m -= hot * 2.2 + rng.normal(0, 0.5)
    if m < 30:
        waterings.append(int(h)); m = 85.0
    moisture.append(round(m, 1))
raw = [round(DRY - p / 100 * (DRY - WET)) for p in moisture]
print("first readings (raw -> %):", list(zip(raw[:4], moisture[:4])))
print(f"waterings needed in 7 days with the 30% rule: {len(waterings)} (at hours {waterings})")
litres_per_watering = 20
print(f"water used: rule {len(waterings) * litres_per_watering} L vs every day {7 * litres_per_watering} L")
''',
 viz=lambda ns: [line(B('Soil moisture over 7 days', 'በ7 ቀናት ውስጥ የአፈር እርጥበት'), [h / 24 for h in ns['hours']], [(B('Moisture %', 'እርጥበት %'), ns['moisture'], 1)], B('Day', 'ቀን'), B('Moisture (%)', 'እርጥበት (%)'), refs=[{'kind': 'h', 'v': 30, 'label': B('water below 30%', 'ከ30% በታች አጠጣ')}], ymin=0, ymax=100, xint=False, markers=False),
                 hbar(B('Water used in one week', 'በአንድ ሳምንት የተጠቀመ ውሃ'), [B('30% rule', 'የ30% ሕግ'), B('Every day', 'በየቀኑ')], [(B('Litres', 'ሊትሮች'), [len(ns['waterings']) * 20, 140], 1)], B('Litres', 'ሊትሮች'), fmt=0)],
 analysis=lambda ns: ([f"The soil fell below 30% {len(ns['waterings'])} times in 7 days.", 'It dries fastest in the afternoon, so readings at 12:00–18:00 drop most.', f"Watering only when needed uses {len(ns['waterings']) * 20} L instead of 140 L."],
                      [f"አፈሩ በ7 ቀናት ውስጥ {len(ns['waterings'])} ጊዜ ከ30% በታች ወርዷል።", 'በከሰዓት በኋላ በፍጥነት ይደርቃል፤ ስለዚህ በ12፡00–18፡00 ያሉ ንባቦች በብዛት ይወርዳሉ።', f"ሲያስፈልግ ብቻ ማጠጣት ከ140 L ይልቅ {len(ns['waterings']) * 20} L ይጠቀማል።"]),
 decision=lambda ns: ('Water in the early morning only when the reading is below 30%; check the sensor against a hand-feel test once a week, and recalibrate if they disagree.', 'ንባቡ ከ30% በታች ሲሆን ብቻ በማለዳ አጠጣ፤ ሴንሰሩን በሳምንት አንድ ጊዜ ከእጅ-ስሜት ፈተና ጋር ፈትሸው፣ ካልተስማሙ እንደገና አስተካክል።'),
 note=('Simulated readings with realistic daily drying; your garden’s numbers will differ.', 'ተጨባጭ የዕለት መድረቅ ያላቸው የተመሰሉ ንባቦች፤ የአትክልት ቦታህ ቁጥሮች ይለያያሉ።')))
emit_labs('c', 2, C2, 4)
print('labs c0-c2 written')
