from labkit import *
import numpy as np
TH = T('Python 3 (teacher, optional)', 'turns the class results into a chart and a summary', 'የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል', 'Thonny or any phone Python app')
NOTE_SAMPLE = ('The numbers are example class results; replace them with your own class’s results.', 'ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።')
SIM = ('Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.', 'ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።')
S2 = ('2 sessions of 30 min', '2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ')
WK = ('2–3 weeks, 20 min a day', '2–3 ሳምንታት፣ በቀን 20 ደቂቃ')
W1 = ('1–2 weeks', '1–2 ሳምንታት')
W3 = ('3–5 weeks', '3–5 ሳምንታት')
CUPS = T('Cups and dry beans or maize seeds', 'things to count', 'የሚቆጠሩ ነገሮች', 'kitchen or market')
POTS = T('Pots or cut plastic bottles, soil, bean seeds', 'grow the plants', 'ተክሎቹን ማሳደግ', 'home, market, school garden')
RULER = T('Ruler or tape measure', 'measure in centimetres', 'በሴንቲሜትር መለካት', 'school supplies')
SCALE = T('Kitchen or spring scale', 'weigh in grams or kilograms', 'በግራም ወይም በኪሎግራም መመዘን', 'market')

S0 = []
S0.append(lab(('Counting seeds: by ones or in groups of five?', 'ዘሮችን መቁጠር፡ አንድ በአንድ ወይስ በአምስት ቡድን?'),
 ('Children count the same cup of beans two ways and discover that grouping in fives gives fewer mistakes.', 'ልጆች አንድን ጽዋ ባቄላ በሁለት መንገዶች ይቆጥራሉ፤ በአምስት መቧደን ስህተቶችን እንደሚቀንስ ያገኛሉ።'), S2,
 [CUPS, PAPER, TH],
 (['Put 23 beans in a cup for each pair of children (the teacher knows the number).', 'First count one by one; write the number.', 'Then make piles of five, count the piles, add the rest.', 'Teacher writes each pair’s two answers on the board.', 'Count together: who was right, and with which way?'],
  ['ለእያንዳንዱ ጥንድ ልጆች በጽዋ ውስጥ 23 ባቄላዎችን አስቀምጡ (መምህሩ ቁጥሩን ያውቃል)።', 'መጀመሪያ አንድ በአንድ ቁጠሩ፤ ቁጥሩን ጻፉ።', 'ከዚያ የአምስት ክምሮች ሥሩ፣ ክምሮቹን ቁጠሩ፣ ቀሪውን ጨምሩ።', 'መምህሩ የእያንዳንዱን ጥንድ ሁለት መልሶች በሰሌዳው ላይ ይጽፋል።', 'አብራችሁ ቁጠሩ፡ ማን ትክክል ነበር፣ በየትኛው መንገድ?']),
 '''
true_count = 23
by_ones  = {"Abebe & Sara": 21, "Hana & Yonas": 23, "Kidist & Dawit": 25, "Meron & Tola": 22, "Lily & Amanuel": 23, "Fikir & Nahom": 20}
by_fives = {"Abebe & Sara": 23, "Hana & Yonas": 23, "Kidist & Dawit": 23, "Meron & Tola": 24, "Lily & Amanuel": 23, "Fikir & Nahom": 23}
right_ones = sum(v == true_count for v in by_ones.values()); right_fives = sum(v == true_count for v in by_fives.values())
miss_ones = sum(abs(v - true_count) for v in by_ones.values()); miss_fives = sum(abs(v - true_count) for v in by_fives.values())
print(f"right by ones: {right_ones} of 6 pairs (total miss {miss_ones} beans)")
print(f"right in fives: {right_fives} of 6 pairs (total miss {miss_fives} beans)")
''',
 viz=lambda ns: [hbar(B('Each pair’s count (the cup had 23 beans)', 'የእያንዳንዱ ጥንድ ቆጠራ (ጽዋው 23 ባቄላዎች ነበሩት)'), list(ns['by_ones']), [(B('Counting by ones', 'አንድ በአንድ መቁጠር'), list(ns['by_ones'].values()), 2), (B('Counting in fives', 'በአምስት መቁጠር'), list(ns['by_fives'].values()), 1)], B('Beans counted', 'የተቆጠሩ ባቄላዎች'), fmt=0)],
 analysis=lambda ns: ([f"Counting one by one, {ns['right_ones']} of 6 pairs got 23; in fives, {ns['right_fives']} of 6 did.", f"All mistakes together: {ns['miss_ones']} beans by ones, only {ns['miss_fives']} in fives.", 'Piles of five are easy to see and check, so we lose our place less often.'],
                      [f"አንድ በአንድ ሲቆጠር ከ6 ጥንዶች {ns['right_ones']} 23 አግኝተዋል፤ በአምስት ሲቆጠር {ns['right_fives']}።", f"ሁሉም ስህተቶች በአንድ ላይ፡ አንድ በአንድ {ns['miss_ones']} ባቄላዎች፣ በአምስት ግን {ns['miss_fives']} ብቻ።", 'የአምስት ክምሮች ለማየትና ለመፈተሽ ቀላል ናቸው፤ ስለዚህ ቦታችንን ብዙ ጊዜ አናጣም።']),
 decision=lambda ns: ('Class rule: when there are many things, count in groups of five. Next time count bigger cups (about 50 seeds) and eggs or bottle tops in the same way.', 'የክፍል ሕግ፡ ብዙ ነገሮች ሲኖሩ በአምስት ቡድን ቁጠሩ። በሚቀጥለው ጊዜ ትላልቅ ጽዋዎችን (ወደ 50 ዘሮች) እና እንቁላሎችን ወይም የጠርሙስ ክዳኖችን በተመሳሳይ መንገድ ቁጠሩ።'), note=NOTE_SAMPLE))
S0.append(lab(('Beans in the sun and in the shade: more, less or the same?', 'ባቄላ በፀሐይና በጥላ፡ ብዙ፣ ትንሽ ወይስ እኩል?'),
 ('Children grow beans in sunny and shady places, count leaves after two weeks and say which group has more.', 'ልጆች ባቄላን ፀሐያማና ጥላ በሆኑ ቦታዎች ያሳድጋሉ፣ ከሁለት ሳምንታት በኋላ ቅጠሎችን ይቆጥራሉ፣ የትኛው ቡድን ብዙ እንዳለው ይናገራሉ።'), WK,
 [POTS, PAPER, TH],
 (['Plant 2 beans in each of 10 pots, same soil and same water.', 'Put 5 pots in the sun and 5 in the shade under a tree.', 'Water every pot with the same cup each morning.', 'After two weeks count the leaves on each pot; draw a leaf on the chart for each one.', 'Compare: more, less or the same?'],
  ['በ10 ማሰሮዎች ውስጥ በእያንዳንዳቸው 2 ባቄላዎችን ዝሩ፣ ያው አፈር፣ ያው ውሃ።', '5 ማሰሮዎችን በፀሐይ፣ 5ን በዛፍ ሥር ጥላ አስቀምጡ።', 'በየጠዋቱ እያንዳንዱን ማሰሮ በአንድ ዓይነት ጽዋ አጠጡ።', 'ከሁለት ሳምንታት በኋላ በእያንዳንዱ ማሰሮ ላይ ያሉ ቅጠሎችን ቁጠሩ፤ ለእያንዳንዱ በቻርቱ ላይ ቅጠል ሣሉ።', 'አወዳድሩ፡ ብዙ፣ ትንሽ ወይስ እኩል?']),
 '''
sun = [9, 11, 10, 12, 8]; shade = [6, 5, 7, 4, 6]          # leaves per pot after two weeks
print("sun:  ", " ".join(str(x) for x in sun), "-> total", sum(sun))
print("shade:", " ".join(str(x) for x in shade), "-> total", sum(shade))
more = "sun" if sum(sun) > sum(shade) else "shade" if sum(shade) > sum(sun) else "the same"
smallest_sun, biggest_shade = min(sun), max(shade)
print(f"more leaves in: {more}; even the smallest sun pot ({smallest_sun}) beats the biggest shade pot ({biggest_shade}): {smallest_sun > biggest_shade}")
''',
 viz=lambda ns: [hbar(B('Leaves on each pot after two weeks', 'ከሁለት ሳምንታት በኋላ በእያንዳንዱ ማሰሮ ላይ ያሉ ቅጠሎች'), [B(f'Pot {i + 1}', f'ማሰሮ {i + 1}') for i in range(5)], [(B('Sun', 'ፀሐይ'), ns['sun'], 1), (B('Shade', 'ጥላ'), ns['shade'], 2)], B('Leaves', 'ቅጠሎች'), fmt=0)],
 analysis=lambda ns: ([f"Sun pots have {sum(ns['sun'])} leaves together; shade pots {sum(ns['shade'])}.", f"Every sun pot has more leaves than any shade pot (smallest sun {ns['smallest_sun']}, biggest shade {ns['biggest_shade']}).", 'All pots had the same soil, seeds and water, so the place is what made the difference.'],
                      [f"የፀሐይ ማሰሮዎች በአንድ ላይ {sum(ns['sun'])} ቅጠሎች አሏቸው፤ የጥላ ማሰሮዎች {sum(ns['shade'])}።", f"እያንዳንዱ የፀሐይ ማሰሮ ከማንኛውም የጥላ ማሰሮ የበለጠ ቅጠሎች አሉት (ትንሹ ፀሐይ {ns['smallest_sun']}፣ ትልቁ ጥላ {ns['biggest_shade']})።", 'ሁሉም ማሰሮዎች ያው አፈር፣ ዘርና ውሃ ነበራቸው፤ ስለዚህ ልዩነቱን ያመጣው ቦታው ነው።']),
 decision=lambda ns: ('Plant the school beans in the sunny corner. Next: does more water help in the shade? Keep everything the same except the water.', 'የትምህርት ቤቱን ባቄላ በፀሐያማው ጥግ ዝሩ። ቀጣይ፡ በጥላ ውስጥ ተጨማሪ ውሃ ይረዳል? ከውሃው በስተቀር ሁሉንም ነገር አንድ ዓይነት አድርጉ።'), note=NOTE_SAMPLE))
S0.append(lab(('Our weather picture chart', 'የአየር ሁኔታ የሥዕል ቻርታችን'),
 ('Children record the weather every school day for four weeks with symbols, count each kind, and decide when to plant the school garden.', 'ልጆች ለአራት ሳምንታት በየትምህርት ቀኑ የአየር ሁኔታን በምልክቶች ይመዘግባሉ፣ እያንዳንዱን ዓይነት ይቆጥራሉ፣ የትምህርት ቤቱን የአትክልት ቦታ መቼ እንደሚተክሉ ይወስናሉ።'), ('4 weeks, 5 min a day', '4 ሳምንታት፣ በቀን 5 ደቂቃ'),
 [T('Wall chart and three symbol cards (sun, cloud, rain)', 'record each day', 'እያንዳንዱን ቀን መመዝገብ', 'paper, crayons'), PAPER, TH],
 (['Each morning one child looks at the sky and sticks a symbol in the day’s box.', 'At the end of each week, count each symbol.', 'Make a picture chart: one symbol per day, in rows.', 'Compare week 1 and week 4: are rainy days becoming more?', 'Decide when to plant.'],
  ['በየጠዋቱ አንድ ልጅ ሰማዩን አይቶ በቀኑ ሳጥን ውስጥ ምልክት ይለጥፋል።', 'በእያንዳንዱ ሳምንት መጨረሻ እያንዳንዱን ምልክት ቁጠሩ።', 'የሥዕል ቻርት ሥሩ፡ በቀን አንድ ምልክት፣ በረድፎች።', 'ሳምንት 1ን እና ሳምንት 4ን አወዳድሩ፡ ዝናባማ ቀናት እየበዙ ነው?', 'መቼ እንደምትተክሉ ወስኑ።']),
 '''
weeks = {1: "SSSCS", 2: "SCSCR", 3: "CRCRR", 4: "RRCRR"}       # S = sunny, C = cloudy, R = rain
symbol = {"S": "☀", "C": "☁", "R": "🌧"}
counts = {k: [w.count(k) for w in weeks.values()] for k in "SCR"}
for w, days in weeks.items(): print(f"week {w}: {' '.join(symbol[d] for d in days)}")
print("sunny", counts["S"], "cloudy", counts["C"], "rain", counts["R"])
''',
 viz=lambda ns: [hbar(B('Days of each weather, week by week', 'የእያንዳንዱ የአየር ሁኔታ ቀናት፣ በየሳምንቱ'), [B(f'Week {w}', f'ሳምንት {w}') for w in ns['weeks']], [(B('Sunny', 'ፀሐያማ'), ns['counts']['S'], 0), (B('Cloudy', 'ደመናማ'), ns['counts']['C'], 2), (B('Rain', 'ዝናብ'), ns['counts']['R'], 1)], B('Days', 'ቀናት'), fmt=0)],
 analysis=lambda ns: ([f"Rainy days went from {ns['counts']['R'][0]} in week 1 to {ns['counts']['R'][3]} in week 4.", f"Sunny days went down from {ns['counts']['S'][0]} to {ns['counts']['S'][3]}.", 'The rainy season is starting: the ground is getting wet.'],
                      [f"ዝናባማ ቀናት ከሳምንት 1 {ns['counts']['R'][0]} ወደ ሳምንት 4 {ns['counts']['R'][3]} ሄደዋል።", f"ፀሐያማ ቀናት ከ{ns['counts']['S'][0]} ወደ {ns['counts']['S'][3]} ወርደዋል።", 'የዝናብ ወቅት እየጀመረ ነው፡ መሬቱ እየረጠበ ነው።']),
 decision=lambda ns: ('Plant the school garden next week, now that most days are rainy. Keep the chart going to see when the rains stop.', 'አብዛኞቹ ቀናት ዝናባማ ስለሆኑ የትምህርት ቤቱን የአትክልት ቦታ በሚቀጥለው ሳምንት ትከሉ። ዝናቡ መቼ እንደሚቆም ለማየት ቻርቱን ቀጥሉ።'), note=NOTE_SAMPLE))
emit_labs('s', 0, S0, 3)

S1 = []
S1.append(lab(('Do soaked beans sprout faster?', 'የተዘፈዘፈ ባቄላ በፍጥነት ይበቅላል?'),
 ('Ask a clear question, plan how to collect the data, then count sprouted seeds each day for soaked and dry beans.', 'ግልጽ ጥያቄ ጠይቁ፣ ዳታውን እንዴት እንደምትሰበስቡ አቅዱ፣ ከዚያ ለተዘፈዘፉና ለደረቁ ባቄላዎች በየቀኑ የበቀሉ ዘሮችን ቁጠሩ።'), ('1 week, 10 min a day', '1 ሳምንት፣ በቀን 10 ደቂቃ'),
 [T('40 bean seeds, water, two plates, cloth or paper towel', 'the germination test', 'የመብቀል ፈተናው', 'kitchen'), PAPER, TH],
 (['Write the question: "Do beans soaked overnight sprout faster than dry beans?"', 'Soak 20 beans overnight; keep 20 dry.', 'Put each group on a wet cloth on its own plate, side by side.', 'Every day for 5 days, count the beans with a root showing; write it in a table.', 'Make a line chart for both groups and answer the question.'],
  ['ጥያቄውን ጻፉ፡ «በአንድ ሌሊት የተዘፈዘፉ ባቄላዎች ከደረቁ ባቄላዎች በፍጥነት ይበቅላሉ?»', '20 ባቄላዎችን በአንድ ሌሊት ዘፍዝፉ፤ 20ን ደረቅ አቆዩ።', 'እያንዳንዱን ቡድን በራሱ ሳህን ላይ እርጥብ ጨርቅ ላይ፣ ጎን ለጎን አስቀምጡ።', 'ለ5 ቀናት በየቀኑ ሥር ያወጡ ባቄላዎችን ቁጠሩ፤ በሰንጠረዥ ጻፉት።', 'ለሁለቱም ቡድኖች የመስመር ቻርት ሥሩና ጥያቄውን መልሱ።']),
 '''
days = [1, 2, 3, 4, 5]
soaked = [2, 9, 15, 18, 18]; dry = [0, 2, 7, 13, 16]          # beans with a root, out of 20
print("day  soaked  dry")
for d, a, b in zip(days, soaked, dry): print(f"{d:3d}  {a:6d}  {b:3d}")
half_soaked = next(d for d, a in zip(days, soaked) if a >= 10); half_dry = next(d for d, b in zip(days, dry) if b >= 10)
print(f"half sprouted by day {half_soaked} (soaked) and day {half_dry} (dry); final {soaked[-1] / 20:.0%} vs {dry[-1] / 20:.0%}")
''',
 viz=lambda ns: [line(B('Beans sprouted (out of 20)', 'የበቀሉ ባቄላዎች (ከ20)'), ns['days'], [(B('Soaked', 'የተዘፈዘፈ'), ns['soaked'], 1), (B('Dry', 'ደረቅ'), ns['dry'], 2)], B('Day', 'ቀን'), B('Beans with a root', 'ሥር ያላቸው ባቄላዎች'), ymin=0, ymax=20)],
 analysis=lambda ns: ([f"Half of the soaked beans had sprouted by day {ns['half_soaked']}; the dry beans needed until day {ns['half_dry']}.", f"By day 5 most beans in both groups sprouted ({ns['soaked'][-1]} and {ns['dry'][-1]} of 20): soaking makes them faster, not more.", 'One plate per group is a small test: a second class repeating it would make us surer.'],
                      [f"የተዘፈዘፉ ባቄላዎች ግማሹ በቀን {ns['half_soaked']} በቅለዋል፤ ደረቆቹ እስከ ቀን {ns['half_dry']} አስፈልጓቸዋል።", f"በቀን 5 በሁለቱም ቡድኖች አብዛኞቹ ባቄላዎች በቅለዋል (ከ20 {ns['soaked'][-1]} እና {ns['dry'][-1]})፡ መዘፍዘፍ ያፈጥናቸዋል እንጂ አያበዛቸውም።", 'በቡድን አንድ ሳህን ትንሽ ፈተና ነው፡ ሁለተኛ ክፍል ቢደግመው የበለጠ እርግጠኛ እንሆናለን።']),
 decision=lambda ns: ('Soak beans overnight before planting the school garden so they come up together and faster; ask another class to repeat the test.', 'ባቄላዎቹ በአንድ ላይና በፍጥነት እንዲወጡ የትምህርት ቤቱን የአትክልት ቦታ ከመትከላችሁ በፊት በአንድ ሌሊት ዘፍዝፏቸው፤ ሌላ ክፍል ፈተናውን እንዲደግም ጠይቁ።'), note=NOTE_SAMPLE))
S1.append(lab(('Our families’ animals: tally, table and bar chart', 'የቤተሰቦቻችን እንስሳት፡ ቆጠራ፣ ሰንጠረዥና የአሞሌ ቻርት'),
 ('Survey the class about animals kept at home, tally the answers, make a table and a bar chart, and choose an animal-care topic to study.', 'በቤት ስለሚያዙ እንስሳት ክፍሉን ጠይቁ፣ መልሶቹን በምልክት ቁጠሩ፣ ሰንጠረዥና የአሞሌ ቻርት ሥሩ፣ የሚጠና የእንስሳት እንክብካቤ ርዕስ ምረጡ።'), S2,
 [PAPER, T('Squared paper and coloured pencils', 'draw the bar chart', 'የአሞሌ ቻርቱን መሣል', 'school supplies'), TH],
 (['Question: "Which animals does your family keep?" (each child can name several).', 'Tally on the board with groups of five: |||| then a line across.', 'Copy the totals into a table: animal, number of families.', 'Draw bars on squared paper: one square = one family, same width for every bar.', 'Read the chart: most, fewest, and the difference.'],
  ['ጥያቄ፡ «ቤተሰብህ የትኞቹን እንስሳት ያረባል?» (እያንዳንዱ ልጅ በርካታ ሊጠራ ይችላል)።', 'በሰሌዳው ላይ በአምስት ቡድኖች ቁጠሩ፡ |||| ከዚያ የሚያቋርጥ መስመር።', 'ድምሮቹን ወደ ሰንጠረዥ ገልብጡ፡ እንስሳ፣ የቤተሰቦች ብዛት።', 'በካሬ ወረቀት ላይ አሞሌዎችን ሣሉ፡ አንድ ካሬ = አንድ ቤተሰብ፣ ለእያንዳንዱ አሞሌ ያው ስፋት።', 'ቻርቱን አንብቡ፡ ብዙ፣ ጥቂት እና ልዩነቱ።']),
 '''
answers = ["chicken"] * 21 + ["cattle"] * 14 + ["sheep"] * 11 + ["goat"] * 9 + ["donkey"] * 6 + ["bees"] * 3   # 32 children
table = {}
for a in answers: table[a] = table.get(a, 0) + 1
for animal, n in sorted(table.items(), key=lambda kv: -kv[1]):
    print(f"{animal:8s} {'|||| ' * (n // 5)}{'|' * (n % 5):6s} {n}")
most, fewest = max(table, key=table.get), min(table, key=table.get)
''',
 viz=lambda ns: [hbar(B('Families keeping each animal (32 children asked)', 'እያንዳንዱን እንስሳ የሚያረቡ ቤተሰቦች (32 ልጆች ተጠይቀዋል)'), list(ns['table']), [(B('Families', 'ቤተሰቦች'), list(ns['table'].values()), 1)], B('Families', 'ቤተሰቦች'), fmt=0)],
 analysis=lambda ns: ([f"Most families keep {ns['most']} ({ns['table'][ns['most']]} of 32); fewest keep {ns['fewest']} ({ns['table'][ns['fewest']]}).", f"{ns['table']['chicken'] - ns['table']['cattle']} more families keep chickens than cattle.", 'The totals add up to more than 32 because many families keep several animals.'],
                      [f"አብዛኞቹ ቤተሰቦች {ns['most']} ያረባሉ (ከ32 {ns['table'][ns['most']]})፤ ጥቂቶቹ {ns['fewest']} ያረባሉ ({ns['table'][ns['fewest']]})።", f"ከከብት ይልቅ ዶሮ የሚያረቡ ቤተሰቦች {ns['table']['chicken'] - ns['table']['cattle']} ይበልጣሉ።", 'ብዙ ቤተሰቦች በርካታ እንስሳትን ስለሚያረቡ ድምሮቹ ከ32 በላይ ይሆናሉ።']),
 decision=lambda ns: ('Study chicken care first (it helps the most families): feed, clean water and vaccination against Newcastle disease. Invite a parent who keeps bees for the next lesson.', 'መጀመሪያ የዶሮ እንክብካቤን አጥኑ (ብዙ ቤተሰቦችን ይረዳል)፡ መኖ፣ ንጹሕ ውሃና የኒውካስል በሽታ ክትባት። ለሚቀጥለው ትምህርት ንብ የሚያረባ ወላጅ ጋብዙ።'), note=NOTE_SAMPLE))
S1.append(lab(('Measuring maize seedlings every week', 'የበቆሎ ችግኞችን በየሳምንቱ መለካት'),
 ('Measure the height of the same 10 maize seedlings every week for 4 weeks, find the weekly growth, and spot a plant that needs help.', 'ያንኑ 10 የበቆሎ ችግኞች ቁመት ለ4 ሳምንታት በየሳምንቱ ለኩ፣ ሳምንታዊ እድገቱን ፈልጉ፣ እርዳታ የሚያስፈልገውን ተክል ለዩ።'), ('4 weeks, 20 min a week', '4 ሳምንታት፣ በሳምንት 20 ደቂቃ'),
 [RULER, T('Labels or sticks with numbers 1–10', 'measure the same plants every time', 'በእያንዳንዱ ጊዜ ያንኑ ተክል መለካት', 'school garden'), PAPER, TH],
 (['Mark 10 seedlings with numbered sticks.', 'Measure from the soil to the tip of the longest leaf, in centimetres.', 'Write each week’s heights in a table: plant number, week 1, 2, 3, 4.', 'Find the average height each week and the growth from week to week.', 'Look for a plant that grows much less than the others.'],
  ['10 ችግኞችን በቁጥር በተጻፈባቸው እንጨቶች ምልክት አድርጉ።', 'ከአፈሩ እስከ ረጅሙ ቅጠል ጫፍ በሴንቲሜትር ለኩ።', 'የእያንዳንዱን ሳምንት ቁመቶች በሰንጠረዥ ጻፉ፡ የተክል ቁጥር፣ ሳምንት 1፣ 2፣ 3፣ 4።', 'በየሳምንቱ አማካይ ቁመቱንና ከሳምንት ወደ ሳምንት ያለውን እድገት ፈልጉ።', 'ከሌሎቹ በጣም ያነሰ የሚያድግ ተክል ፈልጉ።']),
 '''
heights = {1: [8, 15, 26, 41], 2: [9, 17, 28, 44], 3: [7, 14, 24, 38], 4: [8, 16, 27, 43], 5: [9, 12, 15, 18],
           6: [8, 15, 25, 40], 7: [10, 18, 30, 46], 8: [7, 14, 25, 39], 9: [9, 16, 27, 42], 10: [8, 15, 26, 41]}   # cm, weeks 1-4
weeks = [1, 2, 3, 4]
mean = [sum(h[w] for h in heights.values()) / 10 for w in range(4)]
growth = [round(b - a, 1) for a, b in zip(mean, mean[1:])]
slow = min(heights, key=lambda p: heights[p][3] - heights[p][0])
print("average height (cm):", [round(m, 1) for m in mean]); print("growth per week (cm):", growth)
print(f"slowest plant: number {slow}, grew {heights[slow][3] - heights[slow][0]} cm in 3 weeks vs about {mean[3] - mean[0]:.0f} cm on average")
''',
 viz=lambda ns: [line(B('Maize seedling height (cm)', 'የበቆሎ ችግኝ ቁመት (cm)'), ns['weeks'], [(B('Average of 10 plants', 'የ10 ተክሎች አማካይ'), ns['mean'], 1), (B(f"Plant {ns['slow']}", f"ተክል {ns['slow']}"), ns['heights'][ns['slow']], 2)], B('Week', 'ሳምንት'), B('Height (cm)', 'ቁመት (cm)'), ymin=0)],
 analysis=lambda ns: ([f"The plants grew faster every week: {', '.join(str(g) for g in ns['growth'])} cm.", f"Plant {ns['slow']} grew only {ns['heights'][ns['slow']][3] - ns['heights'][ns['slow']][0]} cm in 3 weeks, far behind the others.", 'Measuring the same plants each time lets us see growth, not just differences between plants.'],
                      [f"ተክሎቹ በየሳምንቱ በፍጥነት አድገዋል፡ {', '.join(str(g) for g in ns['growth'])} cm።", f"ተክል {ns['slow']} በ3 ሳምንታት {ns['heights'][ns['slow']][3] - ns['heights'][ns['slow']][0]} cm ብቻ አድጓል፣ ከሌሎቹ በጣም ወደ ኋላ።", 'በእያንዳንዱ ጊዜ ያንኑ ተክል መለካት በተክሎች መካከል ያሉ ልዩነቶችን ብቻ ሳይሆን እድገትን እንድናይ ያደርገናል።']),
 decision=lambda ns: (f"Check plant {ns['slow']} for insects (look for holes and worms in the funnel) and dry soil; keep measuring weekly until tasselling.", f"ተክል {ns['slow']}ን ለነፍሳት (በፈንገሱ ውስጥ ቀዳዳዎችንና ትሎችን ፈልጉ) እና ለደረቅ አፈር ፈትሹ፤ እስኪያብብ ድረስ በየሳምንቱ መለካታችሁን ቀጥሉ።"), note=NOTE_SAMPLE))
S1.append(lab(('Fair shares and chance: eggs and bottle tops', 'ፍትሐዊ ድርሻና ዕድል፡ እንቁላሎችና የጠርሙስ ክዳኖች'),
 ('Share eggs from five hens fairly to discover the mean, then toss a bottle top 100 times to see chance settle down.', 'ከአምስት ዶሮዎች የተገኙ እንቁላሎችን በፍትሐዊነት በማካፈል አማካይን አግኙ፤ ከዚያ ዕድል እንዴት እንደሚረጋጋ ለማየት የጠርሙስ ክዳን 100 ጊዜ ወርውሩ።'), S2,
 [T('Counters (stones or seeds) for eggs; a bottle top', 'share and toss', 'ማካፈልና መወርወር', 'anywhere'), PAPER, TH],
 (['Hens laid 7, 4, 6, 3 and 5 eggs this week: put the counters in five piles.', 'Move counters from big piles to small ones until all piles are equal: that is the fair share (the mean).', 'Check: add all eggs and divide by 5.', 'Toss a bottle top 100 times in pairs; record "up" or "down" each time.', 'After every 10 tosses, work out the share of "up" so far.'],
  ['ዶሮዎቹ በዚህ ሳምንት 7፣ 4፣ 6፣ 3 እና 5 እንቁላሎችን ጣሉ፡ ቆጣሪዎቹን በአምስት ክምሮች አስቀምጡ።', 'ሁሉም ክምሮች እኩል እስኪሆኑ ድረስ ቆጣሪዎችን ከትላልቅ ክምሮች ወደ ትናንሽ አዛውሩ፡ ያ ፍትሐዊ ድርሻው (አማካዩ) ነው።', 'ፈትሹ፡ ሁሉንም እንቁላሎች ደምሩና በ5 አካፍሉ።', 'በጥንድ የጠርሙስ ክዳን 100 ጊዜ ወርውሩ፤ በእያንዳንዱ ጊዜ «ላይ» ወይም «ታች» መዝግቡ።', 'ከእያንዳንዱ 10 ውርወራዎች በኋላ እስካሁን ያለውን የ«ላይ» ድርሻ አስሉ።']),
 '''
import random
eggs = [7, 4, 6, 3, 5]; fair = sum(eggs) / len(eggs)
print(f"eggs {eggs}: total {sum(eggs)}, fair share {fair:.0f} each")
random.seed(4); tosses = [random.random() < 0.35 for _ in range(100)]   # a bottle top lands "up" less often than "down"
running = [sum(tosses[:n]) / n for n in range(10, 101, 10)]
print("share of 'up' after 10, 20, ... 100 tosses:", [round(r, 2) for r in running])
''',
 viz=lambda ns: [line(B('Share of "up" as tosses add up', 'ውርወራዎች ሲጨመሩ የ«ላይ» ድርሻ'), list(range(10, 101, 10)), [(B('Share up', 'የላይ ድርሻ'), ns['running'], 1)], B('Tosses so far', 'እስካሁን ውርወራዎች'), B('Share', 'ድርሻ'), ymin=0, ymax=1, refs=[{'kind': 'h', 'v': 0.5, 'label': B('half', 'ግማሽ')}])],
 analysis=lambda ns: ([f"{sum(ns['eggs'])} eggs shared fairly among 5 hens is {ns['fair']:.0f} each: the mean.", f"After 10 tosses the share of “up” was {ns['running'][0]:.1f}; after 100 it settled near {ns['running'][-1]:.2f}.", 'A bottle top is not like a coin: it lands “up” less than half the time, and we only see that after many tosses.'],
                      [f"{sum(ns['eggs'])} እንቁላሎች በ5 ዶሮዎች መካከል በፍትሐዊነት ሲካፈሉ እያንዳንዳቸው {ns['fair']:.0f} ናቸው፡ አማካዩ።", f"ከ10 ውርወራዎች በኋላ የ«ላይ» ድርሻ {ns['running'][0]:.1f} ነበር፤ ከ100 በኋላ በ{ns['running'][-1]:.2f} አቅራቢያ ተረጋግቷል።", 'የጠርሙስ ክዳን እንደ ሳንቲም አይደለም፡ ከግማሽ ያነሰ ጊዜ «ላይ» ያርፋል፤ ያንንም የምናየው ከብዙ ውርወራዎች በኋላ ብቻ ነው።']),
 decision=lambda ns: ('Never judge chance from a few tries: use many. Next lesson: predict how many of 50 bean seeds will sprout from the class’s sprouting test.', 'ዕድልን ከጥቂት ሙከራዎች በፍጹም አትፍረዱ፡ ብዙ ተጠቀሙ። የሚቀጥለው ትምህርት፡ ከክፍሉ የመብቀል ፈተና ከ50 የባቄላ ዘሮች ስንቱ እንደሚበቅሉ ተንብዩ።'), note=NOTE_SAMPLE))
emit_labs('s', 1, S1, 4)

S2L = []
S2L.append(lab(('Goats per household: mean, median, mode and range', 'በቤተሰብ ፍየሎች፡ አማካይ፣ ሚዲያን፣ ሞድና ክልል'),
 ('Survey 30 households about their goats, compute the four summaries, and see how one big herd changes the mean but not the median.', 'ስለ ፍየሎቻቸው 30 ቤተሰቦችን ጠይቁ፣ አራቱን ማጠቃለያዎች አስሉ፣ አንድ ትልቅ መንጋ አማካዩን እንዴት እንደሚቀይርና ሚዲያኑን እንደማይቀይር ተመልከቱ።'), W1,
 [PAPER, SHEET, TH],
 (['Each student asks 2–3 neighbours: "How many goats do you keep?"', 'Sort the 30 numbers from smallest to largest.', 'Mean = total ÷ 30; median = middle value; mode = most common; range = largest − smallest.', 'Recompute without the one very large herd.', 'Decide which number best describes a "typical" household.'],
  ['እያንዳንዱ ተማሪ 2–3 ጎረቤቶችን ይጠይቃል፡ «ስንት ፍየሎች ታረባለህ?»', '30ዎቹን ቁጥሮች ከትንሹ እስከ ትልቁ ደርድሩ።', 'አማካይ = ድምር ÷ 30፤ ሚዲያን = መካከለኛው እሴት፤ ሞድ = በብዛት የሚገኘው፤ ክልል = ትልቁ − ትንሹ።', 'ያለ አንዱ በጣም ትልቅ መንጋ እንደገና አስሉ።', 'የትኛው ቁጥር «የተለመደውን» ቤተሰብ በተሻለ እንደሚገልጽ ወስኑ።']),
 '''
from statistics import mean, median, mode
goats = [0, 2, 3, 3, 4, 1, 5, 3, 2, 6, 3, 0, 4, 2, 3, 5, 1, 3, 4, 2, 7, 3, 2, 4, 3, 1, 5, 2, 3, 60]
s = sorted(goats)
summary = lambda x: (round(mean(x), 1), median(x), mode(x), max(x) - min(x))
with_big, without_big = summary(goats), summary(goats[:-1])
print("sorted:", s)
print("with the 60-goat herd:    mean %s, median %s, mode %s, range %s" % with_big)
print("without the 60-goat herd: mean %s, median %s, mode %s, range %s" % without_big)
counts = {k: goats.count(k) for k in range(0, 8)}
''',
 viz=lambda ns: [hbar(B('Households by number of goats (the 60-goat herd not shown)', 'ቤተሰቦች በፍየሎች ብዛት (የ60-ፍየል መንጋው አልታየም)'), [str(k) for k in ns['counts']], [(B('Households', 'ቤተሰቦች'), list(ns['counts'].values()), 1)], B('Households', 'ቤተሰቦች'), fmt=0),
                 hbar(B('Summaries with and without the 60-goat herd', 'ማጠቃለያዎች ከ60-ፍየል መንጋው ጋርና ያለ እሱ'), [B('Mean', 'አማካይ'), B('Median', 'ሚዲያን'), B('Mode', 'ሞድ')], [(B('With', 'ጋር'), list(ns['with_big'][:3]), 2), (B('Without', 'ያለ'), list(ns['without_big'][:3]), 1)], B('Goats', 'ፍየሎች'), fmt=1)],
 analysis=lambda ns: ([f"With the 60-goat herd the mean is {ns['with_big'][0]} goats; without it {ns['without_big'][0]}.", f"The median stays at {ns['with_big'][1]} and the mode at {ns['with_big'][2]}: they ignore one extreme value.", f"The range jumps from {ns['without_big'][3]} to {ns['with_big'][3]}, which warns us that one household is very different."],
                      [f"ከ60-ፍየል መንጋው ጋር አማካዩ {ns['with_big'][0]} ፍየሎች ነው፤ ያለ እሱ {ns['without_big'][0]}።", f"ሚዲያኑ በ{ns['with_big'][1]}፣ ሞዱ በ{ns['with_big'][2]} ይቆያሉ፡ አንድን ጽንፈኛ እሴት ችላ ይላሉ።", f"ክልሉ ከ{ns['without_big'][3]} ወደ {ns['with_big'][3]} ይዘላል፤ ይህም አንድ ቤተሰብ በጣም የተለየ መሆኑን ያስጠነቅቀናል።"]),
 decision=lambda ns: (f"Report the median ({ns['with_big'][1]} goats) as the typical household, and mention the large herd separately. Use the mean only when you need the total (mean × households).", f"ሚዲያኑን ({ns['with_big'][1]} ፍየሎች) እንደ የተለመደ ቤተሰብ ዘግቡ፣ ትልቁን መንጋ ለብቻው ጥቀሱ። አማካዩን ተጠቀሙ ድምሩን (አማካይ × ቤተሰቦች) ስትፈልጉ ብቻ።"), note=NOTE_SAMPLE))
S2L.append(lab(('Graphs that tell the truth: the cut-off axis', 'እውነትን የሚናገሩ ግራፎች፡ የተቆረጠው ዘንግ'),
 ('Draw the same yields of two maize varieties twice, once from zero and once with a cut axis, measure how much the cut graph exaggerates, and choose the honest one.', 'የሁለት የበቆሎ ዝርያዎችን ያንኑ ምርት ሁለት ጊዜ ሣሉ፣ አንዴ ከዜሮ አንዴ በተቆረጠ ዘንግ፣ የተቆረጠው ግራፍ ምን ያህል እንደሚያጋንን ለኩ፣ ታማኙን ምረጡ።'), S2,
 [T('Squared paper and ruler', 'draw both graphs by hand', 'ሁለቱንም ግራፎች በእጅ መሣል', 'school supplies'), TH],
 (['Data: variety A 2.9 t/ha, variety B 3.1 t/ha.', 'Graph 1: bars starting at 0. Graph 2: axis starting at 2.8.', 'Measure the bar lengths with a ruler in both graphs.', 'Lie factor = (difference shown by the bars) ÷ (real difference).', 'Decide which graph to put in the school report.'],
  ['ዳታ፡ ዝርያ A 2.9 t/ha፣ ዝርያ B 3.1 t/ha።', 'ግራፍ 1፡ ከ0 የሚጀምሩ አሞሌዎች። ግራፍ 2፡ ከ2.8 የሚጀምር ዘንግ።', 'በሁለቱም ግራፎች የአሞሌዎቹን ርዝመቶች በማስመሪያ ለኩ።', 'የውሸት መጠን = (አሞሌዎቹ የሚያሳዩት ልዩነት) ÷ (እውነተኛ ልዩነት)።', 'በትምህርት ቤቱ ሪፖርት ውስጥ የትኛውን ግራፍ እንደምታስገቡ ወስኑ።']),
 '''
a, b = 2.9, 3.1
real = (b - a) / a                                      # B is 6.9% higher
def shown(start): return ((b - start) - (a - start)) / (a - start)
for start in [0, 2.0, 2.5, 2.8]:
    print(f"axis starts at {start}: bar B looks {shown(start):.0%} longer than bar A; lie factor {shown(start) / real:.1f}")
lie = shown(2.8) / real
''',
 viz=lambda ns: [line(B('Honest: axis from zero (t/ha)', 'ታማኝ፡ ዘንግ ከዜሮ (t/ha)'), [1, 2], [(B('Yield', 'ምርት'), [ns['a'], ns['b']], 1)], B('Variety A = 1, B = 2', 'ዝርያ A = 1፣ B = 2'), 't/ha', ymin=0, ymax=3.5),
                 line(B('Misleading: axis from 2.8 (t/ha)', 'አሳሳች፡ ዘንግ ከ2.8 (t/ha)'), [1, 2], [(B('Yield', 'ምርት'), [ns['a'], ns['b']], 2)], B('Variety A = 1, B = 2', 'ዝርያ A = 1፣ B = 2'), 't/ha', ymin=2.8, ymax=3.15)],
 analysis=lambda ns: ([f"Variety B yields {ns['real']:.1%} more than A: a small difference.", f"With the axis cut at 2.8, B’s bar looks {ns['shown'](2.8):.0%} longer: the graph exaggerates {ns['lie']:.0f} times (lie factor).", 'Bars show size by length, so bar charts must start at zero; line charts of change over time may zoom in if the axis is clearly labelled.'],
                      [f"ዝርያ B ከA {ns['real']:.1%} ብልጫ ያለው ምርት ይሰጣል፡ ትንሽ ልዩነት።", f"ዘንጉ በ2.8 ሲቆረጥ የB አሞሌ {ns['shown'](2.8):.0%} ረጅም ይመስላል፡ ግራፉ {ns['lie']:.0f} እጥፍ ያጋንናል (የውሸት መጠን)።", 'አሞሌዎች መጠንን በርዝመት ያሳያሉ፤ ስለዚህ የአሞሌ ቻርቶች ከዜሮ መጀመር አለባቸው፤ የጊዜ ለውጥ የመስመር ቻርቶች ዘንጉ በግልጽ ከተሰየመ ማቅረብ ይችላሉ።']),
 decision=lambda ns: ('Use the zero-based bar chart in the report and write the numbers on the bars; check every chart in newspapers and adverts for a cut axis.', 'በሪፖርቱ ውስጥ ከዜሮ የሚጀምረውን የአሞሌ ቻርት ተጠቀሙና ቁጥሮቹን በአሞሌዎቹ ላይ ጻፉ፤ በጋዜጦችና በማስታወቂያዎች ውስጥ ያለውን እያንዳንዱን ቻርት ለተቆረጠ ዘንግ ፈትሹ።')))
S2L.append(lab(('Sampling 100 plants: random or by the road?', '100 ተክሎችን ናሙና ማድረግ፡ በዘፈቀደ ወይስ በመንገዱ አጠገብ?'),
 ('Estimate the share of diseased plants in a 2,000-plant field from 100 plants, comparing plants picked near the road with plants picked at random, many times over.', 'በ2,000-ተክል ማሳ ውስጥ ያሉ የታመሙ ተክሎችን ድርሻ ከ100 ተክሎች ገምቱ፤ በመንገዱ አጠገብ የተመረጡ ተክሎችን በዘፈቀደ ከተመረጡ ጋር ብዙ ጊዜ አወዳድሩ።'), W1,
 [T('Field map with numbered rows; dice or random numbers', 'pick plants at random', 'ተክሎችን በዘፈቀደ መምረጥ', 'squared paper, two dice'), PAPER, TH],
 (['Draw the field as 40 rows × 50 plants; the road runs along row 1.', 'Road sample: check the first 100 plants along the road.', 'Random sample: roll dice (or use random numbers) to pick 100 row/plant positions.', 'Count diseased plants in each sample and compute the share.', 'Repeat the random sample many times (the computer helps) and compare with the true share.'],
  ['ማሳውን እንደ 40 ረድፎች × 50 ተክሎች ሣሉ፤ መንገዱ በረድፍ 1 በኩል ያልፋል።', 'የመንገድ ናሙና፡ በመንገዱ አጠገብ ያሉትን የመጀመሪያዎቹን 100 ተክሎች ፈትሹ።', 'የዘፈቀደ ናሙና፡ 100 የረድፍ/የተክል ቦታዎችን ለመምረጥ ዳይስ ጣሉ (ወይም የዘፈቀደ ቁጥሮችን ተጠቀሙ)።', 'በእያንዳንዱ ናሙና ውስጥ የታመሙ ተክሎችን ቁጠሩና ድርሻውን አስሉ።', 'የዘፈቀደ ናሙናውን ብዙ ጊዜ ድገሙ (ኮምፒውተሩ ይረዳል) እና ከእውነተኛው ድርሻ ጋር አወዳድሩ።']),
 '''
import numpy as np
rng = np.random.default_rng(3); rows, per_row = 40, 50
risk = np.linspace(0.35, 0.08, rows)[:, None]                 # dust and traffic: more disease near the road (row 0)
field = rng.random((rows, per_row)) < risk; true_share = field.mean()
road = field[:2].ravel()[:100].mean()
random_est = [field.ravel()[rng.choice(rows * per_row, 100, replace=False)].mean() for _ in range(500)]
lo, hi = np.percentile(random_est, [2.5, 97.5])
print(f"true share diseased: {true_share:.1%}"); print(f"road sample: {road:.0%}")
print(f"random samples: average {np.mean(random_est):.1%}, 95% of them between {lo:.0%} and {hi:.0%}")
hist, edges = np.histogram(random_est, bins=np.arange(0.05, 0.40, 0.025))
''',
 viz=lambda ns: [line(B('500 random samples of 100 plants: estimated share diseased', '500 የ100 ተክሎች የዘፈቀደ ናሙናዎች፡ የተገመተ የታመሙ ድርሻ'), [round(100 * (a + b) / 2, 1) for a, b in zip(ns['edges'][:-1], ns['edges'][1:])], [(B('Number of samples', 'የናሙናዎች ብዛት'), list(ns['hist']), 1)], B('Estimated percent diseased', 'የተገመተ የታመሙ መቶኛ'), B('Samples', 'ናሙናዎች'), xint=False, ymin=0,
                      refs=[{'kind': 'v', 'v': round(100 * float(ns['true_share']), 1), 'label': B('true', 'እውነተኛ')}, {'kind': 'v', 'v': round(100 * float(ns['road']), 1), 'label': B('road sample', 'የመንገድ ናሙና')}])],
 analysis=lambda ns: ([f"The true share of diseased plants is {ns['true_share']:.0%}.", f"The road sample says {ns['road']:.0%}: far too high, because disease is worst near the road.", f"Random samples scatter around the truth (95% between {ns['lo']:.0%} and {ns['hi']:.0%}); they are sometimes a bit off but not always off in the same direction."],
                      [f"እውነተኛው የታመሙ ተክሎች ድርሻ {ns['true_share']:.0%} ነው።", f"የመንገድ ናሙናው {ns['road']:.0%} ይላል፡ በጣም ከፍተኛ፣ በሽታው በመንገዱ አጠገብ የከፋ ስለሆነ።", f"የዘፈቀደ ናሙናዎች በእውነቱ ዙሪያ ይበተናሉ (95% ከ{ns['lo']:.0%} እስከ {ns['hi']:.0%})፤ አንዳንዴ ትንሽ ይስታሉ ግን ሁልጊዜ በአንድ አቅጣጫ አይስቱም።"]),
 decision=lambda ns: ('Always pick sample plants at random from the whole field (dice, random numbers or a zig-zag walk), never only the easy ones by the road.', 'የናሙና ተክሎችን ሁልጊዜ ከመላው ማሳ በዘፈቀደ ምረጡ (ዳይስ፣ የዘፈቀደ ቁጥሮች ወይም የዚግ-ዛግ ጉዞ)፤ በመንገዱ አጠገብ ያሉትን ቀላሎቹን ብቻ በፍጹም አትምረጡ።'), note=SIM))
S2L.append(lab(('A fair test: does compost help tomato seedlings?', 'ፍትሐዊ ፈተና፡ ኮምፖስት የቲማቲም ችግኞችን ይረዳል?'),
 ('Run a fair test with 8 pots with compost and 8 without, placed at random, and decide from the difference and the spread whether compost helps.', 'ኮምፖስት ያላቸው 8 ማሰሮዎችና የሌላቸው 8 ማሰሮዎች በዘፈቀደ ተቀምጠው ፍትሐዊ ፈተና አካሂዱ፤ ከልዩነቱና ከስርጭቱ ኮምፖስት ይረዳ እንደሆነ ወስኑ።'), W3,
 [POTS, T('Compost', 'the treatment', 'ሕክምናው', 'school compost heap'), RULER, TH],
 (['Change only one thing (compost); keep seed, pot size, water and place the same.', 'Number 16 pots and draw lots: 8 get compost, 8 do not.', 'Place the pots in a random order on the bench.', 'After 4 weeks measure the height of each seedling.', 'Compare the means and look at the spread with a dot plot.'],
  ['አንድ ነገር ብቻ ቀይሩ (ኮምፖስት)፤ ዘሩን፣ የማሰሮ መጠኑን፣ ውሃውንና ቦታውን አንድ ዓይነት አድርጉ።', '16 ማሰሮዎችን ቁጥር ስጡና ዕጣ አውጡ፡ 8 ኮምፖስት ያገኛሉ፣ 8 አያገኙም።', 'ማሰሮዎቹን በጠረጴዛው ላይ በዘፈቀደ ቅደም ተከተል አስቀምጡ።', 'ከ4 ሳምንታት በኋላ የእያንዳንዱን ችግኝ ቁመት ለኩ።', 'አማካዮቹን አወዳድሩና ስርጭቱን በነጥብ ቻርት ተመልከቱ።']),
 '''
import random
random.seed(7); pots = list(range(1, 17)); random.shuffle(pots)
compost_pots, plain_pots = sorted(pots[:8]), sorted(pots[8:])
compost = [21, 24, 19, 26, 23, 22, 25, 20]; plain = [17, 19, 15, 20, 18, 16, 21, 17]     # cm after 4 weeks
mc, mp = sum(compost) / 8, sum(plain) / 8
overlap = sum(c <= max(plain) for c in compost)
print("compost pots:", compost_pots, "| plain pots:", plain_pots)
print(f"mean height: compost {mc:.1f} cm, plain {mp:.1f} cm, difference {mc - mp:.1f} cm")
print(f"range: compost {min(compost)}-{max(compost)}, plain {min(plain)}-{max(plain)}; compost pots no taller than the tallest plain pot: {overlap} of 8")
''',
 viz=lambda ns: [scatter(B('Height of every seedling after 4 weeks (cm)', 'ከ4 ሳምንታት በኋላ የእያንዳንዱ ችግኝ ቁመት (cm)'), [1] * 8 + [2] * 8, ns['plain'] + ns['compost'], B('1 = no compost, 2 = compost', '1 = ኮምፖስት የለም፣ 2 = ኮምፖስት'), B('Height (cm)', 'ቁመት (cm)'), fit=False,
                      groups=[(B('No compost', 'ኮምፖስት የለም'), [True] * 8 + [False] * 8), (B('Compost', 'ኮምፖስት'), [False] * 8 + [True] * 8)])],
 analysis=lambda ns: ([f"Compost seedlings average {ns['mc']:.1f} cm, plain ones {ns['mp']:.1f} cm: {ns['mc'] - ns['mp']:.1f} cm taller.", f"The groups overlap only a little: {ns['overlap']} of 8 compost pots are no taller than the tallest plain pot.", 'Because pots were chosen by lot and placed at random, sun or shade on the bench cannot explain the difference.'],
                      [f"የኮምፖስት ችግኞች በአማካይ {ns['mc']:.1f} cm፣ ተራዎቹ {ns['mp']:.1f} cm ናቸው፡ {ns['mc'] - ns['mp']:.1f} cm ይረዝማሉ።", f"ቡድኖቹ በጥቂቱ ብቻ ይደራረባሉ፡ ከ8 የኮምፖስት ማሰሮዎች {ns['overlap']} ከረጅሙ ተራ ማሰሮ አይረዝሙም።", 'ማሰሮዎቹ በዕጣ ስለተመረጡና በዘፈቀደ ስለተቀመጡ በጠረጴዛው ላይ ያለ ፀሐይ ወይም ጥላ ልዩነቱን ሊያብራራ አይችልም።']),
 decision=lambda ns: ('Use compost for the school tomato seedlings. Next: test two amounts of compost to find how much is enough.', 'ለትምህርት ቤቱ የቲማቲም ችግኞች ኮምፖስት ተጠቀሙ። ቀጣይ፡ ምን ያህል በቂ እንደሆነ ለማግኘት ሁለት የኮምፖስት መጠኖችን ፈትሹ።'), note=NOTE_SAMPLE))
emit_labs('s', 2, S2L, 4)

S3 = []
S3.append(lab(('Variability and sample size: teff panicle lengths', 'ልዩነትና የናሙና መጠን፡ የጤፍ ዛላ ርዝመቶች'),
 ('Measure teff panicles, describe their distribution, then simulate how the spread of sample means shrinks as sample size grows.', 'የጤፍ ዛላዎችን ለኩ፣ ስርጭታቸውን ግለጹ፣ ከዚያ የናሙና መጠን ሲያድግ የናሙና አማካዮች ስርጭት እንዴት እንደሚቀንስ አስመስሉ።'), W1,
 [RULER, PY, NP, MPL],
 (['Measure 200 panicles from one field (cm); draw a histogram.', 'Compute mean and standard deviation (SD).', 'Simulate: draw 1,000 samples of n = 5, 10, 20, 50 and compute each sample mean.', 'Measure the SD of the sample means for each n.', 'Compare with the formula SD / √n.'],
  ['ከአንድ ማሳ 200 ዛላዎችን ለኩ (cm)፤ histogram ሣሉ።', 'አማካይንና standard deviationን (SD) አስሉ።', 'አስመስሉ፡ የn = 5፣ 10፣ 20፣ 50 1,000 ናሙናዎችን አውጡና የእያንዳንዱን ናሙና አማካይ አስሉ።', 'ለእያንዳንዱ n የናሙና አማካዮችን SD ለኩ።', 'ከቀመሩ SD / √n ጋር አወዳድሩ።']),
 '''
import numpy as np
rng = np.random.default_rng(1)
panicles = rng.normal(38, 6, 200).round(1)                  # cm, measured in the field
m, sd = panicles.mean(), panicles.std(ddof=1)
print(f"200 panicles: mean {m:.1f} cm, SD {sd:.1f} cm, min {panicles.min()}, max {panicles.max()}")
sizes = [5, 10, 20, 50]; sim_sd, theory = [], []
for n in sizes:
    means = [rng.choice(panicles, n).mean() for _ in range(1000)]
    sim_sd.append(np.std(means)); theory.append(sd / np.sqrt(n))
    print(f"n = {n:2d}: SD of sample means {sim_sd[-1]:.2f} (formula {theory[-1]:.2f})")
hist, edges = np.histogram(panicles, bins=np.arange(20, 58, 3))
''',
 viz=lambda ns: [line(B('Distribution of 200 panicle lengths', 'የ200 ዛላ ርዝመቶች ስርጭት'), [float((a + b) / 2) for a, b in zip(ns['edges'][:-1], ns['edges'][1:])], [(B('Panicles', 'ዛላዎች'), list(ns['hist']), 1)], B('Length (cm)', 'ርዝመት (cm)'), B('Number of panicles', 'የዛላዎች ብዛት'), xint=False, ymin=0),
                 line(B('Spread of the sample mean shrinks with n', 'የናሙና አማካይ ስርጭት ከn ጋር ይቀንሳል'), ns['sizes'], [(B('Simulated', 'የተመሰለ'), ns['sim_sd'], 1), (B('Formula SD/√n', 'ቀመር SD/√n'), ns['theory'], 2)], B('Sample size n', 'የናሙና መጠን n'), B('SD of the mean (cm)', 'የአማካዩ SD (cm)'), ymin=0)],
 analysis=lambda ns: ([f"Panicles average {ns['m']:.1f} cm with SD {ns['sd']:.1f} cm; the histogram is roughly bell-shaped.", f"The mean of 5 panicles varies by about {ns['sim_sd'][0]:.1f} cm; the mean of 50 by only {ns['sim_sd'][-1]:.1f} cm.", 'The simulation matches SD/√n: to halve the uncertainty you need four times as many plants.'],
                      [f"ዛላዎች በአማካይ {ns['m']:.1f} cm ከSD {ns['sd']:.1f} cm ጋር ናቸው፤ histogramኡ በግምት የደወል ቅርጽ አለው።", f"የ5 ዛላዎች አማካይ በ{ns['sim_sd'][0]:.1f} cm ገደማ ይለያያል፤ የ50 ግን በ{ns['sim_sd'][-1]:.1f} cm ብቻ።", 'ማስመሰሉ ከSD/√n ጋር ይስማማል፡ እርግጠኛ ያለመሆንን ለማካፈል አራት እጥፍ ተክሎች ያስፈልጉሃል።']),
 decision=lambda ns: ('For field measurements, sample at least 20 random plants per plot (uncertainty about 1.3 cm); going to 50 adds work but little precision.', 'ለመስክ ልኬቶች በplot ቢያንስ 20 የዘፈቀደ ተክሎችን ናሙና አድርግ (እርግጠኛ ያለመሆን ወደ 1.3 cm)፤ ወደ 50 መሄድ ሥራ ይጨምራል ግን ትንሽ ትክክለኛነት።'), note=SIM))
S3.append(lab(('On-farm test: confidence interval and paired t-test', 'በእርሻ ላይ ፈተና፡ confidence interval እና paired t-test'),
 ('Twelve farmers each grew a new wheat variety next to their local one; estimate the gain with a 95% confidence interval and test it.', 'አሥራ ሁለት ገበሬዎች እያንዳንዳቸው አዲስ የስንዴ ዝርያን ከአካባቢያቸው ዝርያ አጠገብ አብቅለዋል፤ ትርፉን በ95% confidence interval ገምቱና ፈትሹት።'), W1,
 [PY, SP, SHEET, R_],
 (['Each farmer harvests a 5 m × 5 m plot of each variety and converts to t/ha.', 'Compute the difference (new − local) for each farm.', 'Mean difference, its standard error and 95% CI: mean ± t × SE.', 'Paired t-test: is the mean difference zero?', 'Also count how many farms gained.'],
  ['እያንዳንዱ ገበሬ የእያንዳንዱን ዝርያ 5 m × 5 m plot አጭዶ ወደ t/ha ይቀይራል።', 'ለእያንዳንዱ እርሻ ልዩነቱን (አዲስ − አካባቢያዊ) አስሉ።', 'አማካይ ልዩነት፣ standard errorኡ እና 95% CI፡ አማካይ ± t × SE።', 'Paired t-test፡ አማካይ ልዩነቱ ዜሮ ነው?', 'ስንት እርሻዎች እንዳተረፉም ቁጠሩ።']),
 '''
import numpy as np
from scipy import stats
local = np.array([2.1, 2.8, 1.9, 3.2, 2.5, 2.2, 3.0, 2.6, 1.8, 2.9, 2.4, 2.7])
new   = np.array([2.6, 3.1, 2.5, 3.4, 3.0, 2.4, 3.5, 2.7, 2.4, 3.3, 2.5, 3.2])
d = new - local; n = len(d); se = d.std(ddof=1) / np.sqrt(n); tcrit = stats.t.ppf(0.975, n - 1)
lo, hi = d.mean() - tcrit * se, d.mean() + tcrit * se; t, p = stats.ttest_rel(new, local)
print(f"mean gain {d.mean():.2f} t/ha, 95% CI {lo:.2f} to {hi:.2f}; t = {t:.2f}, p = {p:.1g}; farms that gained: {(d > 0).sum()} of {n}")
print(f"relative gain {d.mean() / local.mean():.0%}")
''',
 viz=lambda ns: [scatter(B('Each farm: local vs new variety (t/ha)', 'እያንዳንዱ እርሻ፡ አካባቢያዊ vs አዲስ ዝርያ (t/ha)'), ns['local'], ns['new'], B('Local variety (t/ha)', 'አካባቢያዊ ዝርያ (t/ha)'), B('New variety (t/ha)', 'አዲስ ዝርያ (t/ha)'), fit=False, note=B('Points above the diagonal are farms where the new variety yielded more.', 'ከዲያጎናሉ በላይ ያሉ ነጥቦች አዲሱ ዝርያ ብዙ ምርት የሰጠባቸው እርሻዎች ናቸው።'), refs=[{'kind': 'diag', 'label': B('same yield', 'እኩል ምርት')}]),
                 dots(B('Mean gain with 95% confidence interval (t/ha)', 'አማካይ ትርፍ ከ95% confidence interval ጋር (t/ha)'), [B('New − local', 'አዲስ − አካባቢያዊ')], [ns['d'].mean()], [ns['lo']], [ns['hi']], 't/ha')],
 analysis=lambda ns: ([f"The new variety yielded {ns['d'].mean():.2f} t/ha more on average ({ns['d'].mean() / ns['local'].mean():.0%}); 95% CI {ns['lo']:.2f} to {ns['hi']:.2f}.", f"The paired t-test gives p = {ns['p']:.1g}: a gain this large would be very unlikely if the varieties were equal.", f"{(ns['d'] > 0).sum()} of {ns['n']} farms gained, so the result holds across farms, not just on average."],
                      [f"አዲሱ ዝርያ በአማካይ {ns['d'].mean():.2f} t/ha ብልጫ ሰጥቷል ({ns['d'].mean() / ns['local'].mean():.0%})፤ 95% CI {ns['lo']:.2f} እስከ {ns['hi']:.2f}።", f"paired t-test p = {ns['p']:.1g} ይሰጣል፡ ዝርያዎቹ እኩል ቢሆኑ እንዲህ ያለ ትልቅ ትርፍ በጣም የማይመስል ነበር።", f"ከ{ns['n']} እርሻዎች {(ns['d'] > 0).sum()} አትርፈዋል፤ ስለዚህ ውጤቱ በአማካይ ብቻ ሳይሆን በእርሻዎች ሁሉ ይዘልቃል።"]),
 decision=lambda ns: (f"Recommend the new variety; tell farmers to expect a gain of about {ns['lo']:.1f}–{ns['hi']:.1f} t/ha, and check whether the extra seed cost is covered.", f"አዲሱን ዝርያ ምከር፤ ገበሬዎች ወደ {ns['lo']:.1f}–{ns['hi']:.1f} t/ha ትርፍ እንዲጠብቁ ንገራቸው፣ ተጨማሪው የዘር ወጪ መሸፈኑንም ፈትሽ።"), note=('Example data from a typical on-farm trial.', 'ከተለመደ በእርሻ ላይ ሙከራ የተወሰደ የምሳሌ ዳታ።')))
S3.append(lab(('Who adopts row planting? A chi-square test', 'የመስመር ተከላን ማን ይቀበላል? የchi-square ፈተና'),
 ('Survey 200 teff farmers on extension contact and row planting, test whether adoption depends on contact, and decide where to focus.', 'በኤክስቴንሽን ግንኙነትና በመስመር ተከላ ላይ 200 የጤፍ ገበሬዎችን ዳስሱ፣ ተቀባይነት በግንኙነት ላይ የተመሠረተ መሆኑን ፈትሹ፣ ትኩረቱ የት እንደሚሆን ወስኑ።'), W1,
 [PY, SP, T('Questionnaire (paper or KoboToolbox)', 'collect the answers', 'መልሶቹን መሰብሰብ', 'kobotoolbox.org')],
 (['Ask: "Did an extension agent visit you this year?" and "Did you row-plant teff?"', 'Make a 2 × 2 table of counts.', 'Compute the adoption rate in each group.', 'Chi-square test of independence; check all expected counts are above 5.', 'Interpret: association, not proof of cause.'],
  ['ጠይቁ፡ «በዚህ ዓመት የኤክስቴንሽን ሠራተኛ ጎብኝቶሃል?» እና «ጤፍን በመስመር ዘርተሃል?»', 'የ2 × 2 የቆጠራ ሰንጠረዥ ሥሩ።', 'በእያንዳንዱ ቡድን የተቀባይነት መጠኑን አስሉ።', 'የchi-square የነፃነት ፈተና፤ ሁሉም የሚጠበቁ ቆጠራዎች ከ5 በላይ መሆናቸውን ፈትሹ።', 'ተርጉሙ፡ ግንኙነት እንጂ የምክንያት ማረጋገጫ አይደለም።']),
 '''
import numpy as np
from scipy import stats
table = np.array([[58, 32],     # visited:     row-planted, did not
                  [34, 76]])    # not visited: row-planted, did not
chi2, p, dof, expected = stats.chi2_contingency(table, correction=False)
rate = table[:, 0] / table.sum(1)
print(f"adoption: visited {rate[0]:.0%}, not visited {rate[1]:.0%}")
print(f"chi-square {chi2:.1f}, df {dof}, p = {p:.2g}; smallest expected count {expected.min():.1f}")
''',
 viz=lambda ns: [hbar(B('Share of farmers who row-planted teff', 'ጤፍን በመስመር የዘሩ ገበሬዎች ድርሻ'), [B('Visited by extension', 'በኤክስቴንሽን የተጎበኙ'), B('Not visited', 'ያልተጎበኙ')], [(B('Percent', 'መቶኛ'), list(100 * ns['rate']), 1)], B('Percent who adopted', 'የተቀበሉ መቶኛ'), fmt=0)],
 analysis=lambda ns: ([f"{ns['rate'][0]:.0%} of visited farmers row-planted, against {ns['rate'][1]:.0%} of the others.", f"Chi-square = {ns['chi2']:.1f}, p = {ns['p']:.1g}: adoption is clearly linked to extension contact; all expected counts are above 5, so the test is valid.", 'Agents may visit the more progressive farmers first, so this is an association, not proof that visits cause adoption.'],
                      [f"ከተጎበኙ ገበሬዎች {ns['rate'][0]:.0%} በመስመር ዘርተዋል፤ ከሌሎቹ {ns['rate'][1]:.0%}።", f"Chi-square = {ns['chi2']:.1f}፣ p = {ns['p']:.1g}፡ ተቀባይነት ከኤክስቴንሽን ግንኙነት ጋር በግልጽ የተያያዘ ነው፤ ሁሉም የሚጠበቁ ቆጠራዎች ከ5 በላይ ስለሆኑ ፈተናው ትክክል ነው።", 'ሠራተኞች መጀመሪያ የበለጠ ተራማጅ ገበሬዎችን ሊጎበኙ ይችላሉ፤ ስለዚህ ይህ ግንኙነት ነው እንጂ ጉብኝቶች ተቀባይነትን እንደሚያስከትሉ ማረጋገጫ አይደለም።']),
 decision=lambda ns: ('Prioritise visits to farmers not yet reached; to measure the real effect, randomly choose which villages get visits first next season.', 'እስካሁን ያልደረሱ ገበሬዎችን ጉብኝት አስቀድም፤ እውነተኛውን ውጤት ለመለካት በሚቀጥለው ወቅት የትኞቹ መንደሮች መጀመሪያ ጉብኝት እንደሚያገኙ በዘፈቀደ ምረጥ።'), note=('Example survey counts.', 'የምሳሌ የዳሰሳ ቆጠራዎች።')))
S3.append(lab(('Yield and nitrogen: correlation and regression', 'ምርትና ናይትሮጅን፡ correlation እና regression'),
 ('Relate maize yield to nitrogen rate on 30 plots, fit a line, check the residuals, and decide whether a straight line is good enough.', 'በ30 plots ላይ የበቆሎ ምርትን ከናይትሮጅን መጠን ጋር አዛምዱ፣ መስመር ግጠሙ፣ residualsን ፈትሹ፣ ቀጥተኛ መስመር በቂ መሆኑን ወስኑ።'), W1,
 [PY, NP, SP, MPL],
 (['Data: nitrogen 0, 30, 60, 90, 120, 150 kg/ha, 5 plots each.', 'Plot yield against N; compute the correlation r.', 'Fit yield = a + b × N; read the slope b (t/ha per kg N).', 'Plot residuals against N: do they curve?', 'Fit a quadratic and compare.'],
  ['ዳታ፡ ናይትሮጅን 0፣ 30፣ 60፣ 90፣ 120፣ 150 kg/ha፣ እያንዳንዱ 5 plots።', 'ምርትን ከN አንፃር ቻርት አድርጉ፤ correlation rን አስሉ።', 'ምርት = a + b × N ግጠሙ፤ slope bን አንብቡ (t/ha በkg N)።', 'residualsን ከN አንፃር ቻርት አድርጉ፡ ይታጠፋሉ?', 'quadratic ግጠሙና አወዳድሩ።']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(2)
N = np.repeat([0, 30, 60, 90, 120, 150], 5)
yield_ = 2.0 + 0.045 * N - 0.00017 * N ** 2 + rng.normal(0, 0.35, N.size)
r, p = stats.pearsonr(N, yield_); lin = stats.linregress(N, yield_)
resid = yield_ - (lin.intercept + lin.slope * N)
quad = np.polyfit(N, yield_, 2); r2_lin = r ** 2
r2_quad = 1 - np.sum((yield_ - np.polyval(quad, N)) ** 2) / np.sum((yield_ - yield_.mean()) ** 2)
mean_resid = [round(float(resid[N == n].mean()), 2) for n in sorted(set(N))]
print(f"r = {r:.2f}; line: yield = {lin.intercept:.2f} + {lin.slope:.4f} N; R2 line {r2_lin:.2f}, quadratic {r2_quad:.2f}")
print("mean residual by N:", mean_resid)
''',
 viz=lambda ns: [scatter(B('Maize yield vs nitrogen (30 plots)', 'የበቆሎ ምርት vs ናይትሮጅን (30 plots)'), ns['N'], ns['yield_'], B('Nitrogen (kg/ha)', 'ናይትሮጅን (kg/ha)'), B('Yield (t/ha)', 'ምርት (t/ha)')),
                 line(B('Average residual from the straight line', 'ከቀጥተኛው መስመር አማካይ residual'), sorted(set(ns['N'].tolist())), [(B('Residual (t/ha)', 'Residual (t/ha)'), ns['mean_resid'], 2)], B('Nitrogen (kg/ha)', 'ናይትሮጅን (kg/ha)'), 't/ha', refs=[{'kind': 'h', 'v': 0, 'label': ''}])],
 analysis=lambda ns: ([f"Yield rises with N (r = {ns['r']:.2f}); the line says {1000 * ns['lin'].slope:.0f} kg of grain per extra kg of N on average.", 'The residuals are negative at both ends and positive in the middle: the response curves and levels off.', f"A quadratic explains more of the variation (R² {ns['r2_quad']:.2f} vs {ns['r2_lin']:.2f})."],
                      [f"ምርት ከN ጋር ይጨምራል (r = {ns['r']:.2f})፤ መስመሩ በአማካይ በእያንዳንዱ ተጨማሪ kg N {1000 * ns['lin'].slope:.0f} kg እህል ይላል።", 'residuals በሁለቱም ጫፎች አሉታዊ፣ በመካከል አዎንታዊ ናቸው፡ ምላሹ ይታጠፋል፣ ይረጋጋልም።', f"quadratic የበለጠ ልዩነትን ያብራራል (R² {ns['r2_quad']:.2f} vs {ns['r2_lin']:.2f})።"]),
 decision=lambda ns: ('Do not use the straight line to recommend high N rates: it overstates gains at high N. Use the curved model and find the economic optimum (Level S5).', 'ከፍተኛ የN መጠኖችን ለመምከር ቀጥተኛውን መስመር አትጠቀሙ፡ በከፍተኛ N ትርፎችን ያጋንናል። የታጠፈውን ሞዴል ተጠቀሙና ኢኮኖሚያዊ ምርጡን ፈልጉ (ደረጃ S5)።'), note=SIM))
S3.append(lab(('Your first field experiment: 4 varieties in 4 blocks', 'የመጀመሪያው የመስክ ሙከራህ፡ 4 ዝርያዎች በ4 blocks'),
 ('Lay out, run and analyse a 4 × 4 trial of bean varieties in the school field with blocks along the slope, and pick the variety to grow.', 'በትምህርት ቤቱ ማሳ በተዳፋቱ ላይ ከblocks ጋር የባቄላ ዝርያዎችን 4 × 4 ሙከራ አቅዱ፣ አካሂዱ፣ ተንትኑ፣ የሚበቅለውን ዝርያ ምረጡ።'), ('One season', 'አንድ ወቅት'),
 [T('16 plots of 2 m × 2 m, pegs and string', 'the field layout', 'የማሳ አቀማመጡ', 'school field'), SCALE, PY, SP],
 (['Make 4 blocks across the slope; each block has 4 plots.', 'In each block, draw lots to place the 4 varieties.', 'Grow, then weigh the dry beans from each plot.', 'Compute variety means and block means; run the RCBD analysis of variance.', 'Compare the best variety with the others using the LSD.'],
  ['በተዳፋቱ ላይ 4 blocks ሥሩ፤ እያንዳንዱ block 4 plots አሉት።', 'በእያንዳንዱ block ውስጥ 4ቱን ዝርያዎች ለማስቀመጥ ዕጣ አውጡ።', 'አብቅሉ፣ ከዚያ ከእያንዳንዱ plot ደረቅ ባቄላውን መዝኑ።', 'የዝርያ አማካዮችንና የblock አማካዮችን አስሉ፤ የRCBD analysis of varianceን አካሂዱ።', 'ምርጡን ዝርያ ከሌሎቹ ጋር በLSD አወዳድሩ።']),
 '''
import numpy as np
from scipy import stats
varieties = ["Local", "Nasir", "Hawassa Dume", "Ibbado"]
y = np.array([[1.6, 2.1, 2.2, 2.0],      # block 1 (top of slope) - kg per plot, columns = varieties
              [1.9, 2.0, 2.7, 1.9],
              [2.1, 2.5, 2.6, 2.2],
              [2.0, 2.4, 3.0, 2.5]])     # block 4 (bottom, deeper soil)
b, t = y.shape; grand = y.mean()
ss_t = b * ((y.mean(0) - grand) ** 2).sum(); ss_b = t * ((y.mean(1) - grand) ** 2).sum(); ss_tot = ((y - grand) ** 2).sum()
ss_e = ss_tot - ss_t - ss_b; df_e = (b - 1) * (t - 1); ms_e = ss_e / df_e
F = (ss_t / (t - 1)) / ms_e; p = stats.f.sf(F, t - 1, df_e)
lsd = stats.t.ppf(0.975, df_e) * np.sqrt(2 * ms_e / b)
means = {v: round(float(m), 2) for v, m in zip(varieties, y.mean(0))}; best = max(means, key=means.get)
print("variety means (kg/plot):", means); print("block means:", y.mean(1).round(2))
print(f"F = {F:.1f}, p = {p:.4f}; LSD(5%) = {lsd:.2f} kg"); print(f"block share of total variation: {ss_b / ss_tot:.0%}")
beats = [v for v in varieties if v != best and means[best] - means[v] > lsd]
''',
 viz=lambda ns: [hbar(B('Mean yield per variety (kg per 4 m² plot)', 'አማካይ ምርት በዝርያ (kg በ4 m² plot)'), ns['varieties'], [(B('kg per plot', 'kg በplot'), list(ns['means'].values()), 1)], 'kg', fmt=2, note=B(f"Differences larger than the LSD ({ns['lsd']:.2f} kg) are real at the 5% level.", f"ከLSD ({ns['lsd']:.2f} kg) የሚበልጡ ልዩነቶች በ5% ደረጃ እውነተኛ ናቸው።")),
                 line(B('Block means down the slope (kg per plot)', 'የblock አማካዮች በተዳፋቱ ወደ ታች (kg በplot)'), [1, 2, 3, 4], [(B('Block mean', 'የblock አማካይ'), list(ns['y'].mean(1)), 2)], B('Block (1 = top)', 'Block (1 = ላይ)'), 'kg')],
 analysis=lambda ns: ([f"{ns['best']} gave the most ({ns['means'][ns['best']]:.2f} kg/plot); F = {ns['F']:.1f}, p = {ns['p']:.4f}.", f"It beats {', '.join(ns['beats'])} by more than the LSD of {ns['lsd']:.2f} kg.", f"Blocks explain {ns['ss_b'] / ns['ss_tot']:.0%} of the variation: the bottom of the slope is better. Blocking removed this from the error, making the test sharper."],
                      [f"{ns['best']} ብዙ ሰጥቷል ({ns['means'][ns['best']]:.2f} kg/plot)፤ F = {ns['F']:.1f}፣ p = {ns['p']:.4f}።", f"{', '.join(ns['beats'])}ን ከLSD {ns['lsd']:.2f} kg በላይ ያሸንፋል።", f"blocks {ns['ss_b'] / ns['ss_tot']:.0%} ልዩነቱን ያብራራሉ፡ የተዳፋቱ ታች የተሻለ ነው። blocking ይህንን ከስህተቱ አስወግዶ ፈተናውን የበለጠ ስለታም አድርጎታል።"]),
 decision=lambda ns: (f"Grow {ns['best']} in the school garden next season, and repeat the trial once more before telling families: one season and one field are not enough.", f"በሚቀጥለው ወቅት {ns['best']}ን በትምህርት ቤቱ የአትክልት ቦታ አብቅሉ፤ ለቤተሰቦች ከመናገራችሁ በፊት ሙከራውን አንድ ጊዜ ድገሙ፡ አንድ ወቅትና አንድ ማሳ በቂ አይደሉም።"), note=('Example results; variety names are Ethiopian released common-bean varieties.', 'የምሳሌ ውጤቶች፤ የዝርያ ስሞቹ የተለቀቁ የኢትዮጵያ የቦሎቄ ዝርያዎች ናቸው።')))
emit_labs('s', 3, S3, 5)
print('labs s0-s3 written')
