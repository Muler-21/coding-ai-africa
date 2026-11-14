from lib import *
rng = np.random.default_rng(2026)

# ------------------------------------------------------------------ S0
S0 = {
 'name': {'en': 'Count and Compare', 'am': 'መቁጠርና ማወዳደር'},
 'stage': {'en': 'KG1–KG3 · ages 4–6', 'am': 'KG1–KG3 · ዕድሜ 4–6'},
 'goal': {'en': 'Children count real things from the farm and home, compare groups, and show what they found with pictures. This is the first step of all statistics: data are counts and measures of real things.',
          'am': 'ልጆች ከእርሻና ከቤት የሚገኙ እውነተኛ ነገሮችን ይቆጥራሉ፣ ቡድኖችን ያወዳድራሉ፣ ያገኙትንም በሥዕል ያሳያሉ። ይህ የስታቲስቲክስ ሁሉ የመጀመሪያ ደረጃ ነው፡ ዳታ የእውነተኛ ነገሮች ቁጥርና መለኪያ ነው።'},
 'mods': {
  'en': [
   {'t': 'Counting things on the farm', 'd': '3 weeks · 6 sessions of 20 min',
    'o': ['Count up to 20 real objects correctly', 'Use tally marks (four lines and a cross)', 'Say how many there are in each group'],
    'l': ['Count seeds, stones and bottle tops on a mat', 'Tally marks: one line for each thing, a cross every fifth', 'Count eggs, goats or chickens at home with a parent', 'Class count: how many children walk, how many ride to school'],
    'a': 'Each child brings a handful of seeds from home. The class sorts them by kind (maize, beans, chickpea) and counts each kind with tally marks on the floor.',
    'm': 'Seeds, stones, chalk, paper', 'q': ['How many beans did you count?', 'Why do we cross every fifth tally?', 'Which seed did we have most of?'],
    'tip': 'Always count real objects before drawing numbers; touching makes counting stick.'},
   {'t': 'More, less, the same', 'd': '2 weeks · 4 sessions',
    'o': ['Compare two groups: more, less or the same', 'Match one-to-one to check', 'Explain how they know'],
    'l': ['Two baskets: which has more beans? Guess, then count', 'One-to-one matching: line up two rows of seeds', 'Heavier or lighter: compare two maize cobs in the hands', 'Taller or shorter: compare two seedlings with a stick'],
    'a': 'Plant beans in two cups, one in the sun and one in the shade. Every week, children compare which seedling is taller, using a stick to measure.',
    'm': 'Two cups, soil, bean seeds, a straight stick', 'q': ['Which group has more?', 'How did you check?', 'Which seedling grew taller, and where was it?'],
    'tip': 'Ask "how do you know?" every time; that is the start of evidence.'},
   {'t': 'Picture charts', 'd': '2 weeks · 4 sessions',
    'o': ['Make a picture chart where one picture is one thing', 'Read a picture chart: most, least, how many', 'Tell a short story from a chart'],
    'l': ['Our favourite fruit: each child sticks one picture in a column', 'Read the chart: which fruit is the favourite?', 'Weather chart: draw sun, cloud or rain each day for two weeks', 'Story time: what does our chart tell us?'],
    'a': 'Make a class weather chart for two weeks with drawn suns, clouds and rain drops, then count which weather came most often and talk about what it means for the farm.',
    'm': 'Paper, crayons, a wall', 'q': ['Which column is tallest?', 'How many rainy days did we have?', 'What would a farmer do with this chart?'],
    'tip': 'Keep the chart on the wall and refer to it often; it is the class’s first dataset.'}],
  'am': [
   {'t': 'በእርሻ ላይ ያሉ ነገሮችን መቁጠር', 'd': '3 ሳምንት · 6 የ20 ደቂቃ ክፍለ ጊዜዎች',
    'o': ['እስከ 20 እውነተኛ ነገሮችን በትክክል መቁጠር', 'የመቁጠሪያ ምልክቶችን መጠቀም (አራት መስመርና አንድ ማቋረጫ)', 'በእያንዳንዱ ቡድን ውስጥ ስንት እንዳለ መናገር'],
    'l': ['ዘሮችን፣ ድንጋዮችንና የጠርሙስ ክዳኖችን በምንጣፍ ላይ መቁጠር', 'የመቁጠሪያ ምልክቶች፡ ለእያንዳንዱ ነገር አንድ መስመር፣ በየአምስተኛው ማቋረጫ', 'በቤት ውስጥ ከወላጅ ጋር እንቁላሎችን፣ ፍየሎችን ወይም ዶሮዎችን መቁጠር', 'የክፍል ቆጠራ፡ ስንት ልጆች በእግር፣ ስንቱ በተሽከርካሪ ወደ ትምህርት ቤት ይመጣሉ'],
    'a': 'እያንዳንዱ ልጅ ከቤት አንድ እፍኝ ዘር ያመጣል። ክፍሉ በዓይነት (በቆሎ፣ ባቄላ፣ ሽምብራ) ደርድሮ እያንዳንዱን ዓይነት መሬት ላይ በመቁጠሪያ ምልክቶች ይቆጥራል።',
    'm': 'ዘሮች፣ ድንጋዮች፣ ኖራ፣ ወረቀት', 'q': ['ስንት ባቄላ ቆጠርክ?', 'በየአምስተኛው ምልክት ለምን እናቋርጣለን?', 'በብዛት የነበረን የትኛው ዘር ነው?'],
    'tip': 'ቁጥሮችን ከመሣል በፊት ሁልጊዜ እውነተኛ ነገሮችን ቁጠሩ፤ መንካት ቆጠራን ያስታውሳል።'},
   {'t': 'ብዙ፣ ትንሽ፣ እኩል', 'd': '2 ሳምንት · 4 ክፍለ ጊዜዎች',
    'o': ['ሁለት ቡድኖችን ማወዳደር፡ ብዙ፣ ትንሽ ወይም እኩል', 'ለማረጋገጥ አንድ ለአንድ ማዛመድ', 'እንዴት እንዳወቁ ማብራራት'],
    'l': ['ሁለት ቅርጫቶች፡ ብዙ ባቄላ ያለው የትኛው ነው? ገምቱ፣ ከዚያ ቁጠሩ', 'አንድ ለአንድ ማዛመድ፡ ሁለት የዘር ረድፎችን ማሰለፍ', 'ከባድ ወይም ቀላል፡ ሁለት የበቆሎ እሸቶችን በእጅ ማወዳደር', 'ረጅም ወይም አጭር፡ ሁለት ችግኞችን በዱላ ማወዳደር'],
    'a': 'ባቄላን በሁለት ኩባያዎች ትከሉ፤ አንዱን በፀሐይ፣ ሌላውን በጥላ። በየሳምንቱ ልጆች የትኛው ችግኝ እንደረዘመ በዱላ ለክተው ያወዳድራሉ።',
    'm': 'ሁለት ኩባያዎች፣ አፈር፣ የባቄላ ዘሮች፣ ቀጥ ያለ ዱላ', 'q': ['ብዙ ያለው የትኛው ቡድን ነው?', 'እንዴት አረጋገጥክ?', 'የትኛው ችግኝ ረዘመ፣ የት ነበር?'],
    'tip': 'ሁልጊዜ «እንዴት አወቅክ?» ብለህ ጠይቅ፤ ይህ የማስረጃ መጀመሪያ ነው።'},
   {'t': 'የሥዕል ቻርቶች', 'd': '2 ሳምንት · 4 ክፍለ ጊዜዎች',
    'o': ['አንድ ሥዕል አንድ ነገርን የሚወክልበት የሥዕል ቻርት መሥራት', 'የሥዕል ቻርት ማንበብ፡ ብዙ፣ ትንሽ፣ ስንት', 'ከቻርት አጭር ታሪክ መናገር'],
    'l': ['የምንወደው ፍራፍሬ፡ እያንዳንዱ ልጅ አንድ ሥዕል በዓምድ ውስጥ ይለጥፋል', 'ቻርቱን ማንበብ፡ ተወዳጁ ፍራፍሬ የትኛው ነው?', 'የአየር ሁኔታ ቻርት፡ ለሁለት ሳምንት በየቀኑ ፀሐይ፣ ደመና ወይም ዝናብ መሣል', 'የታሪክ ጊዜ፡ ቻርታችን ምን ይነግረናል?'],
    'a': 'ለሁለት ሳምንት በተሣሉ ፀሐዮች፣ ደመናዎችና የዝናብ ጠብታዎች የክፍል የአየር ሁኔታ ቻርት ሥሩ፤ ከዚያ የትኛው የአየር ሁኔታ በብዛት እንደመጣ ቆጥራችሁ ለእርሻ ምን ማለት እንደሆነ ተወያዩ።',
    'm': 'ወረቀት፣ ክሬዮን፣ ግድግዳ', 'q': ['ረጅሙ ዓምድ የትኛው ነው?', 'ስንት ዝናባማ ቀናት ነበሩን?', 'ገበሬ በዚህ ቻርት ምን ያደርጋል?'],
    'tip': 'ቻርቱን ግድግዳ ላይ አስቀምጠህ ብዙ ጊዜ ጥቀሰው፤ የክፍሉ የመጀመሪያ ዳታሴት ነው።'}]},
 'ex': []
}
emit(0, S0)

# ------------------------------------------------------------------ S1
lots = []
for lot, p in [('Market seed', 0.55), ('Farmer-saved seed', 0.70), ('Certified seed', 0.90)]:
    sprouted = rng.binomial(1, p, 20)
    lots += [{'seed_lot': lot, 'seed_no': i + 1, 'sprouted': int(s)} for i, s in enumerate(sprouted)]
save_csv(pd.DataFrame(lots), 's1_bean_sprouting.csv')
s1_ex = example('s1-sprout',
 {'en': 'Which bean seed lot sprouts best?', 'am': 'የትኛው የባቄላ ዘር ክምችት በተሻለ ይበቅላል?'},
 {'en': 'A class planted 20 beans from each of three seed lots and recorded which ones sprouted after 7 days.', 'am': 'አንድ ክፍል ከሦስት የዘር ክምችቶች እያንዳንዱን 20 ባቄላ ተክሎ ከ7 ቀን በኋላ የትኞቹ እንደበቀሉ መዘገበ።'},
 {'en': 'Count and percentage comparison (no test yet)', 'am': 'የቁጥርና የመቶኛ ንጽጽር (ገና ፈተና የለም)'},
 's1_bean_sprouting.csv',
 '''
import pandas as pd
d = pd.read_csv("s1_bean_sprouting.csv")
summary = d.groupby("seed_lot")["sprouted"].agg(["sum", "count"])
summary["percent"] = 100 * summary["sum"] / summary["count"]
for lot, row in summary.sort_values("percent", ascending=False).iterrows():
    bar = "#" * int(row["sum"])
    print(f"{lot:18s} {int(row['sum']):2d}/{int(row['count'])}  {row['percent']:5.1f}%  {bar}")
''',
 '''
d <- read.csv("s1_bean_sprouting.csv")
tab <- aggregate(sprouted ~ seed_lot, data = d, FUN = sum)
tab$percent <- 100 * tab$sprouted / 20
tab[order(-tab$percent), ]
barplot(tab$percent, names.arg = tab$seed_lot, ylab = "% sprouted")
''',
 {'en': ['Each "#" is one bean that sprouted out of 20.', 'Certified seed sprouted most, market seed least.', 'Percent = sprouted ÷ planted × 100, so groups of different size can be compared fairly.'],
  'am': ['እያንዳንዱ «#» ከ20 ውስጥ የበቀለ አንድ ባቄላ ነው።', 'የተረጋገጠ ዘር በብዛት በቀለ፣ የገበያ ዘር ትንሽ በቀለ።', 'መቶኛ = የበቀለ ÷ የተተከለ × 100፤ ስለዚህ የተለያየ መጠን ያላቸው ቡድኖች በፍትሐዊነት ይወዳደራሉ።']},
 {'en': 'Buy certified seed for planting, and test any saved seed with a 20-seed sprouting test before the season.', 'am': 'ለመትከል የተረጋገጠ ዘር ግዙ፤ የተቀመጠ ዘርን ደግሞ ከወቅቱ በፊት በ20 ዘር የመብቀል ፈተና ፈትኑ።'},
 {'en': 'A sprouting-test service for farmers before planting is a simple business a school club can run.', 'am': 'ከመትከል በፊት ለገበሬዎች የመብቀል ፈተና አገልግሎት የትምህርት ቤት ክበብ ሊያካሂደው የሚችል ቀላል ንግድ ነው።'})

S1 = {
 'name': {'en': 'Data Detectives', 'am': 'የዳታ መርማሪዎች'},
 'stage': {'en': 'Grades 1–4 · ages 6–10', 'am': '1ኛ–4ኛ ክፍል · ዕድሜ 6–10'},
 'goal': {'en': 'Learners ask a question, collect data by counting and measuring, show it in tables and charts, and use the "fair share" (mean) and chance to describe what they see.',
          'am': 'ተማሪዎች ጥያቄ ይጠይቃሉ፣ በመቁጠርና በመለካት ዳታ ይሰበስባሉ፣ በሰንጠረዥና በቻርት ያሳያሉ፣ የሚያዩትንም «እኩል ድርሻ» (አማካይ) እና ዕድልን በመጠቀም ይገልጻሉ።'},
 'mods': {
  'en': [
   {'t': 'Asking questions and collecting data', 'd': '4 weeks · 8 sessions', 'o': ['Turn a curiosity into a question data can answer', 'Collect data with a tally table', 'Record data neatly with dates'],
    'l': ['Good questions: "Which seed sprouts best?" not "Are seeds nice?"', 'Tally tables with categories', 'Data sheets: date, what, how many', 'Class project: count sprouted beans every day for a week'],
    'a': 'Run the bean sprouting test: 20 seeds from each of three seed lots on wet cloth or in soil, counted every day for 7 days on a class data sheet.', 'm': 'Beans from three sources, wet cloth or cups of soil, a data sheet',
    'q': ['Is your question one data can answer?', 'What did you write on each line of the data sheet?', 'Why count on the same day each time?'], 'tip': 'Let pupils design the data sheet; they learn why columns matter.'},
   {'t': 'Tables and charts', 'd': '4 weeks · 8 sessions', 'o': ['Turn a tally into a table and a bar chart', 'Read bar charts and pictographs', 'Choose a good chart title and labels'],
    'l': ['From tally to table', 'Bar charts on squared paper: one square = one seed', 'Labels: title, axis names, units', 'Reading charts from newspapers and seed packets'],
    'a': 'Draw a bar chart of sprouted beans per seed lot on squared paper, with a title and labels, and present it to the school farm club.', 'm': 'Squared paper, ruler, coloured pencils',
    'q': ['What does the tallest bar mean?', 'What is missing from a chart without labels?', 'How many more beans sprouted in lot A than lot B?'], 'tip': 'Insist on titles and labels from the first chart.'},
   {'t': 'Measuring', 'd': '4 weeks · 8 sessions', 'o': ['Measure length, mass and volume with units', 'Measure the same thing the same way each time', 'Record measurements in a table over time'],
    'l': ['Centimetres and a ruler: measure seedlings', 'Grams and kilograms: weigh a cob on a kitchen scale', 'Millilitres: water given to each cup', 'Measuring over time: a growth table for 4 weeks'],
    'a': 'Measure the height of 5 maize seedlings every week for 4 weeks and draw their growth as a line on squared paper.', 'm': 'Ruler, kitchen scale, cups with ml marks, seedlings',
    'q': ['Why do we always write the unit?', 'Where do you put the ruler to measure a seedling?', 'Which week did the plants grow most?'], 'tip': 'Agree on one measuring rule (from soil to tip of the longest leaf) and keep it.'},
   {'t': 'Fair share (mean) and chance', 'd': '4 weeks · 8 sessions', 'o': ['Find the "fair share" of a group (the mean) by sharing out', 'Describe chance as likely, unlikely, certain', 'See that results vary even when nothing changes'],
    'l': ['Fair share: share 18 beans among 3 children equally', 'Mean seedling height: add up and share', 'Chance with a coin and a bottle top: heads or tails?', 'Why do two cups of the same seed not grow exactly the same?'],
    'a': 'Each group plants 5 seeds of the same kind, then finds the mean height and compares it with other groups; discuss why the groups differ a little.', 'm': 'Seeds, cups, ruler, coins',
    'q': ['What is the fair share of 12 eggs among 4 families?', 'Is rain tomorrow certain, likely or unlikely?', 'Why are plants of the same seed not all the same height?'], 'tip': 'Natural variation is the most important idea in statistics; return to it often.'}],
  'am': [
   {'t': 'ጥያቄ መጠየቅና ዳታ መሰብሰብ', 'd': '4 ሳምንት · 8 ክፍለ ጊዜዎች', 'o': ['ጉጉትን ዳታ ሊመልሰው ወደሚችል ጥያቄ መቀየር', 'በመቁጠሪያ ሰንጠረዥ ዳታ መሰብሰብ', 'ዳታን ከቀን ጋር በንጽሕና መመዝገብ'],
    'l': ['ጥሩ ጥያቄዎች፡ «የትኛው ዘር በተሻለ ይበቅላል?» እንጂ «ዘሮች ጥሩ ናቸው?» አይደለም', 'ምድቦች ያሏቸው የመቁጠሪያ ሰንጠረዦች', 'የዳታ ሉሆች፡ ቀን፣ ምን፣ ስንት', 'የክፍል ፕሮጀክት፡ ለአንድ ሳምንት በየቀኑ የበቀሉ ባቄላዎችን መቁጠር'],
    'a': 'የባቄላ መብቀል ፈተና አካሂዱ፡ ከሦስት የዘር ክምችቶች እያንዳንዱን 20 ዘር በእርጥብ ጨርቅ ወይም በአፈር ላይ፣ ለ7 ቀናት በየቀኑ በክፍል የዳታ ሉህ ላይ ቁጠሩ።', 'm': 'ከሦስት ምንጮች የመጡ ባቄላዎች፣ እርጥብ ጨርቅ ወይም አፈር ያላቸው ኩባያዎች፣ የዳታ ሉህ',
    'q': ['ጥያቄህ ዳታ ሊመልሰው የሚችል ነው?', 'በዳታ ሉሁ በእያንዳንዱ መስመር ላይ ምን ጻፍክ?', 'በየጊዜው በአንድ ዓይነት ሰዓት ለምን እንቆጥራለን?'], 'tip': 'ተማሪዎች የዳታ ሉሁን ራሳቸው እንዲነድፉ ፍቀድ፤ ዓምዶች ለምን እንደሚያስፈልጉ ይማራሉ።'},
   {'t': 'ሰንጠረዦችና ቻርቶች', 'd': '4 ሳምንት · 8 ክፍለ ጊዜዎች', 'o': ['መቁጠሪያን ወደ ሰንጠረዥና ወደ ባር ቻርት መቀየር', 'ባር ቻርቶችንና የሥዕል ቻርቶችን ማንበብ', 'ጥሩ የቻርት ርዕስና መለያዎችን መምረጥ'],
    'l': ['ከመቁጠሪያ ወደ ሰንጠረዥ', 'በካሬ ወረቀት ባር ቻርት፡ አንድ ካሬ = አንድ ዘር', 'መለያዎች፡ ርዕስ፣ የዘንግ ስሞች፣ መለኪያዎች', 'ከጋዜጦችና ከዘር ፓኬቶች ቻርቶችን ማንበብ'],
    'a': 'በየዘር ክምችቱ የበቀሉትን ባቄላዎች በካሬ ወረቀት ላይ ርዕስና መለያ ያለው ባር ቻርት ሥላችሁ ለትምህርት ቤቱ የእርሻ ክበብ አቅርቡ።', 'm': 'ካሬ ወረቀት፣ ማስመሪያ፣ ባለቀለም እርሳሶች',
    'q': ['ረጅሙ ባር ምን ማለት ነው?', 'መለያ በሌለው ቻርት ውስጥ ምን ጎደለ?', 'በክምችት A ከክምችት B ስንት ተጨማሪ ባቄላ በቀለ?'], 'tip': 'ከመጀመሪያው ቻርት ጀምሮ ርዕስና መለያ ላይ አጥብቅ።'},
   {'t': 'መለካት', 'd': '4 ሳምንት · 8 ክፍለ ጊዜዎች', 'o': ['ርዝመትን፣ ክብደትንና መጠንን ከመለኪያ ጋር መለካት', 'አንድን ነገር በየጊዜው በአንድ ዓይነት መንገድ መለካት', 'መለኪያዎችን በጊዜ ሂደት በሰንጠረዥ መመዝገብ'],
    'l': ['ሴንቲሜትርና ማስመሪያ፡ ችግኞችን መለካት', 'ግራምና ኪሎግራም፡ እሸትን በኩሽና ሚዛን መመዘን', 'ሚሊሊትር፡ ለእያንዳንዱ ኩባያ የተሰጠ ውሃ', 'በጊዜ ሂደት መለካት፡ የ4 ሳምንት የዕድገት ሰንጠረዥ'],
    'a': 'የ5 የበቆሎ ችግኞችን ቁመት ለ4 ሳምንት በየሳምንቱ ለክታችሁ ዕድገታቸውን በካሬ ወረቀት ላይ እንደ መስመር ሥሉ።', 'm': 'ማስመሪያ፣ የኩሽና ሚዛን፣ ml ምልክት ያላቸው ኩባያዎች፣ ችግኞች',
    'q': ['መለኪያውን ሁልጊዜ ለምን እንጽፋለን?', 'ችግኝን ለመለካት ማስመሪያውን የት ታስቀምጣለህ?', 'ተክሎቹ በብዛት ያደጉት በየትኛው ሳምንት ነው?'], 'tip': 'በአንድ የመለኪያ ሕግ ተስማሙ (ከአፈር እስከ ረጅሙ ቅጠል ጫፍ) እና ጠብቁት።'},
   {'t': 'እኩል ድርሻ (አማካይ) እና ዕድል', 'd': '4 ሳምንት · 8 ክፍለ ጊዜዎች', 'o': ['በማከፋፈል የአንድ ቡድንን «እኩል ድርሻ» (አማካይ) ማግኘት', 'ዕድልን እንደ ሊሆን የሚችል፣ የማይመስል፣ እርግጠኛ መግለጽ', 'ምንም ሳይለወጥ ውጤቶች እንደሚለያዩ ማየት'],
    'l': ['እኩል ድርሻ፡ 18 ባቄላዎችን ለ3 ልጆች በእኩል ማከፋፈል', 'የችግኞች አማካይ ቁመት፡ ደምሮ ማከፋፈል', 'ዕድል በሳንቲምና በጠርሙስ ክዳን፡ አንበሳ ወይስ ዘውድ?', 'የአንድ ዓይነት ዘር ሁለት ኩባያዎች ለምን በትክክል አንድ ዓይነት አያድጉም?'],
    'a': 'እያንዳንዱ ቡድን አንድ ዓይነት 5 ዘሮችን ተክሎ አማካይ ቁመቱን አግኝቶ ከሌሎች ቡድኖች ጋር ያወዳድራል፤ ቡድኖቹ ለምን ትንሽ እንደሚለያዩ ተወያዩ።', 'm': 'ዘሮች፣ ኩባያዎች፣ ማስመሪያ፣ ሳንቲሞች',
    'q': ['የ12 እንቁላሎች እኩል ድርሻ ለ4 ቤተሰቦች ስንት ነው?', 'ነገ ዝናብ መዝነቡ እርግጠኛ፣ ሊሆን የሚችል ወይስ የማይመስል ነው?', 'የአንድ ዓይነት ዘር ተክሎች ለምን ሁሉም አንድ ቁመት አይኖራቸውም?'], 'tip': 'ተፈጥሯዊ ልዩነት በስታቲስቲክስ ውስጥ በጣም አስፈላጊው ሐሳብ ነው፤ ደጋግመህ ተመለስበት።'}]},
 'ex': [s1_ex]
}
emit(1, S1)

# ------------------------------------------------------------------ S2
compost = np.round(rng.normal(31, 3.5, 8), 1); none = np.round(rng.normal(24, 3.5, 8), 1)
pots = pd.DataFrame({'pot': range(1, 17), 'treatment': ['compost'] * 8 + ['no compost'] * 8,
                     'height_cm': np.r_[compost, none]})
pots = pots.sample(frac=1, random_state=3).reset_index(drop=True); pots['pot'] = range(1, 17)
save_csv(pots, 's2_compost_pots.csv')
s2_ex = example('s2-compost',
 {'en': 'Does compost make maize seedlings grow taller?', 'am': 'ኮምፖስት የበቆሎ ችግኞችን ያረዝማል?'},
 {'en': '16 pots of the same soil and seed; 8 got compost and 8 did not, chosen by drawing numbers from a hat. Height measured after 3 weeks.', 'am': 'አንድ ዓይነት አፈርና ዘር ያላቸው 16 ማሰሮዎች፤ 8ቱ ኮምፖስት አገኙ፣ 8ቱ አላገኙም፤ ከኮፍያ ቁጥር በማውጣት ተመርጠዋል። ቁመት ከ3 ሳምንት በኋላ ተለካ።'},
 {'en': 'Fair test: one change, a control, 8 replicates, random allocation', 'am': 'ፍትሐዊ ሙከራ፡ አንድ ለውጥ፣ መቆጣጠሪያ፣ 8 ድግግሞሾች፣ በዘፈቀደ ድልድል'},
 's2_compost_pots.csv',
 '''
import pandas as pd
d = pd.read_csv("s2_compost_pots.csv")
for name, g in d.groupby("treatment"):
    h = g["height_cm"]
    print(f"{name:11s} n={len(h)}  mean={h.mean():.1f}  median={h.median():.1f}  range={h.min():.1f}-{h.max():.1f} cm")
diff = d[d.treatment == "compost"].height_cm.mean() - d[d.treatment == "no compost"].height_cm.mean()
print(f"Difference in means: {diff:.1f} cm")
print("Dot plot (o = one pot, 2 = two pots, 1 cm per step):")
for name, g in d.groupby("treatment"):
    counts = [0] * 25
    for h in g["height_cm"]:
        counts[int(round(h)) - 18] += 1
    line = "".join(" " if c == 0 else ("o" if c == 1 else str(c)) for c in counts)
    print(f"{name:11s} 18|{line}|42")
''',
 '''
d <- read.csv("s2_compost_pots.csv")
aggregate(height_cm ~ treatment, data = d,
          FUN = function(x) c(mean = mean(x), median = median(x), min = min(x), max = max(x)))
stripchart(height_cm ~ treatment, data = d, method = "stack", pch = 19, xlab = "Height (cm)")
''',
 {'en': ['Compost pots have a clearly higher mean and median.', 'Most compost pots are taller, but the two dot clouds overlap a little: plants vary even with the same treatment.', 'Pots were chosen at random and only compost differed, so compost is the likely cause; Level S3 shows how to test how sure we can be.'],
  'am': ['የኮምፖስት ማሰሮዎች በግልጽ ከፍ ያለ አማካይና መካከለኛ (median) አላቸው።', 'አብዛኞቹ የኮምፖስት ማሰሮዎች ይረዝማሉ፤ ግን ሁለቱ የነጥብ ስብስቦች ትንሽ ይደራረባሉ፡ በአንድ ዓይነት ሕክምናም ተክሎች ይለያያሉ።', 'ማሰሮዎቹ በዘፈቀደ ስለተመረጡና ኮምፖስት ብቻ ስለተለየ፣ ምክንያቱ ኮምፖስት ሊሆን ይችላል፤ ምን ያህል እርግጠኛ መሆን እንደምንችል ደረጃ S3 ያሳያል።']},
 {'en': 'Use compost in the school garden, and repeat the test in the field next season with more plots (Level S3 adds the formal test).', 'am': 'በትምህርት ቤቱ የአትክልት ቦታ ኮምፖስት ተጠቀሙ፤ በሚቀጥለው ወቅት በብዙ ማሳዎች በመስክ ላይ ሙከራውን ድገሙት (ደረጃ S3 መደበኛውን ፈተና ይጨምራል)።'},
 {'en': 'Selling quality-tested compost with a simple "proof" chart is a real youth business.', 'am': 'በቀላል «ማረጋገጫ» ቻርት የተፈተሸ ጥራት ያለው ኮምፖስት መሸጥ እውነተኛ የወጣቶች ንግድ ነው።'})

S2 = {
 'name': {'en': 'Fair Tests', 'am': 'ፍትሐዊ ሙከራዎች'},
 'stage': {'en': 'Grades 5–8 · ages 10–14', 'am': '5ኛ–8ኛ ክፍል · ዕድሜ 10–14'},
 'goal': {'en': 'Learners summarise data with mean, median, mode and range, draw the right graph, understand probability and sampling, and run their first fair experiment with a control, replicates and random allocation.',
          'am': 'ተማሪዎች ዳታን በአማካይ፣ በመካከለኛ፣ በሞድና በክልል ያጠቃልላሉ፣ ትክክለኛውን ግራፍ ይሥላሉ፣ ፕሮባቢሊቲንና ናሙና አወሳሰድን ይረዳሉ፣ መቆጣጠሪያ፣ ድግግሞሽና በዘፈቀደ ድልድል ያለው የመጀመሪያ ፍትሐዊ ሙከራቸውን ያካሂዳሉ።'},
 'mods': {
  'en': [
   {'t': 'Mean, median, mode and range', 'd': '4 weeks · 12 h', 'o': ['Calculate mean, median, mode and range', 'Choose the right average for skewed data', 'Use spreadsheet functions AVERAGE, MEDIAN, MIN, MAX'],
    'l': ['Mean: add and divide', 'Median: the middle value; why it resists one huge farm', 'Mode: the most common category', 'Range and spread: how different are the values?', 'Spreadsheets: formulas for a class dataset', 'Mini-project: farm sizes in the village'],
    'a': 'Survey 20 households about how many goats they keep, then calculate mean, median and mode and explain why the mean is larger than the median.', 'm': 'Notebook, calculator or spreadsheet',
    'q': ['When is the median better than the mean?', 'What is the mode of: maize, teff, maize, sorghum?', 'What does a large range tell you?'], 'tip': 'Use one real village dataset for the whole module.'},
   {'t': 'Graphs that tell the truth', 'd': '4 weeks · 12 h', 'o': ['Choose bar, line, histogram or scatter for the data type', 'Spot misleading graphs', 'Make graphs in a spreadsheet'],
    'l': ['Bar charts for categories', 'Histograms for measures: plant heights', 'Line graphs for change over time: rainfall by month', 'Scatter plots for two measures: rainfall vs yield', 'Misleading graphs: cut axes and 3D pies', 'Spreadsheet charts'],
    'a': 'Plot monthly rainfall from the local weather station or a school rain gauge as a line graph, and yield records against rainfall as a scatter plot.', 'm': 'Rain gauge from a plastic bottle, spreadsheet',
    'q': ['Which graph shows change over time?', 'What is wrong with a bar chart whose axis starts at 50?', 'What pattern do you see in the scatter plot?'], 'tip': 'Ask learners to redraw a misleading chart from an advert or newspaper.'},
   {'t': 'Probability and sampling', 'd': '4 weeks · 12 h', 'o': ['Calculate simple probabilities', 'Take a random sample from a field', 'Explain why random samples are fair'],
    'l': ['Probability from 0 to 1: coins, dice, seeds', 'Experimental vs theoretical probability: 100 coin tosses', 'Populations and samples: the field and the plants we measure', 'Random sampling with numbered paper or a phone', 'Bias: why measuring only plants near the path is unfair'],
    'a': 'Number 100 plants in a field plot, draw 10 at random, measure them, and compare the sample mean with the mean of all 100.', 'm': 'Stakes, string, numbered paper, ruler',
    'q': ['What is the probability of a six on a die?', 'Why not just measure the biggest plants?', 'How close was your sample mean to the true mean?'], 'tip': 'Let learners see that random samples land close to the truth, but not exactly.'},
   {'t': 'The fair test', 'd': '6 weeks · 18 h', 'o': ['Design an experiment with one change and a control', 'Use replicates and random allocation', 'Summarise results and draw a careful conclusion'],
    'l': ['Treatments and controls', 'One change at a time: why?', 'Replication: why 1 pot is not enough', 'Random allocation by drawing lots', 'Recording data carefully', 'Writing a conclusion: what the data show, and what they do not'],
    'a': 'Run the compost pot experiment (8 pots with compost, 8 without, allocated by drawing numbers), then present means, ranges and a dot plot.', 'm': 'Pots or plastic bottles cut in half, soil, compost, maize seed, ruler',
    'q': ['What is the control in your experiment?', 'Why did you draw numbers to choose the pots?', 'What else could explain the difference if you had not randomised?'], 'tip': 'This module is the root of every field trial in Levels S4–S7.'}],
  'am': [
   {'t': 'አማካይ፣ መካከለኛ፣ ሞድና ክልል', 'd': '4 ሳምንት · 12 ሰዓት', 'o': ['አማካይን፣ መካከለኛን (median)፣ ሞድንና ክልልን ማስላት', 'ለተዛባ ዳታ ትክክለኛውን አማካይ መምረጥ', 'የስፕሬድሺት ፋንክሽኖችን AVERAGE፣ MEDIAN፣ MIN፣ MAX መጠቀም'],
    'l': ['አማካይ፡ መደመርና ማካፈል', 'መካከለኛ፡ በመሃል ያለው ዋጋ፤ አንድ ግዙፍ እርሻ ለምን እንደማይቀይረው', 'ሞድ፡ በብዛት የሚገኘው ምድብ', 'ክልልና ስርጭት፡ ዋጋዎቹ ምን ያህል ይለያያሉ?', 'ስፕሬድሺቶች፡ ለክፍል ዳታሴት ቀመሮች', 'ትንሽ ፕሮጀክት፡ በመንደሩ ያሉ የእርሻ መጠኖች'],
    'a': '20 ቤተሰቦችን ስንት ፍየል እንደሚያረቡ ጠይቃችሁ አማካይን፣ መካከለኛንና ሞድን አስሉ፤ አማካዩ ከመካከለኛው ለምን እንደሚበልጥ አብራሩ።', 'm': 'ማስታወሻ ደብተር፣ ካልኩሌተር ወይም ስፕሬድሺት',
    'q': ['መካከለኛ ከአማካይ የሚሻለው መቼ ነው?', 'የበቆሎ፣ ጤፍ፣ በቆሎ፣ ማሽላ ሞድ ምንድነው?', 'ትልቅ ክልል ምን ይነግርሃል?'], 'tip': 'ለሙሉ ሞጁሉ አንድ እውነተኛ የመንደር ዳታሴት ተጠቀም።'},
   {'t': 'እውነትን የሚናገሩ ግራፎች', 'd': '4 ሳምንት · 12 ሰዓት', 'o': ['ለዳታው ዓይነት ባር፣ መስመር፣ ሂስቶግራም ወይም ስካተር መምረጥ', 'አሳሳች ግራፎችን መለየት', 'በስፕሬድሺት ግራፎችን መሥራት'],
    'l': ['ባር ቻርቶች ለምድቦች', 'ሂስቶግራሞች ለመለኪያዎች፡ የተክል ቁመቶች', 'የመስመር ግራፎች በጊዜ ሂደት ለሚደረግ ለውጥ፡ ወርሃዊ ዝናብ', 'ስካተር ፕሎቶች ለሁለት መለኪያዎች፡ ዝናብና ምርት', 'አሳሳች ግራፎች፡ የተቆረጡ ዘንጎችና 3D ክቦች', 'የስፕሬድሺት ቻርቶች'],
    'a': 'ከአካባቢው የአየር ሁኔታ ጣቢያ ወይም ከትምህርት ቤት የዝናብ መለኪያ ወርሃዊ ዝናብን በመስመር ግራፍ፣ የምርት መዝገቦችን ከዝናብ ጋር በስካተር ፕሎት ሥሉ።', 'm': 'ከፕላስቲክ ጠርሙስ የተሠራ የዝናብ መለኪያ፣ ስፕሬድሺት',
    'q': ['በጊዜ ሂደት ለውጥን የሚያሳየው የትኛው ግራፍ ነው?', 'ዘንጉ ከ50 የሚጀምር ባር ቻርት ምን ችግር አለው?', 'በስካተር ፕሎቱ ውስጥ ምን ንድፍ ታያለህ?'], 'tip': 'ተማሪዎች ከማስታወቂያ ወይም ከጋዜጣ አሳሳች ቻርትን እንደገና እንዲሥሉ ጠይቅ።'},
   {'t': 'ፕሮባቢሊቲና ናሙና አወሳሰድ', 'd': '4 ሳምንት · 12 ሰዓት', 'o': ['ቀላል ፕሮባቢሊቲዎችን ማስላት', 'ከማሳ በዘፈቀደ ናሙና መውሰድ', 'የዘፈቀደ ናሙናዎች ለምን ፍትሐዊ እንደሆኑ ማብራራት'],
    'l': ['ፕሮባቢሊቲ ከ0 እስከ 1፡ ሳንቲሞች፣ ዳይስ፣ ዘሮች', 'የሙከራና የቲዎሪ ፕሮባቢሊቲ፡ 100 የሳንቲም ውርወራዎች', 'ሕዝብና ናሙና፡ ማሳውና የምንለካቸው ተክሎች', 'በቁጥር በተጻፈ ወረቀት ወይም በስልክ በዘፈቀደ ናሙና መውሰድ', 'አድልዎ፡ ከመንገዱ አጠገብ ያሉ ተክሎችን ብቻ መለካት ለምን ፍትሐዊ አይደለም'],
    'a': 'በአንድ የማሳ ክፍል ውስጥ 100 ተክሎችን በቁጥር ሰይማችሁ 10ሩን በዘፈቀደ አውጡ፣ ለኩ፣ የናሙናውን አማካይ ከ100ዎቹ ሁሉ አማካይ ጋር አወዳድሩ።', 'm': 'ካስማዎች፣ ገመድ፣ በቁጥር የተጻፈ ወረቀት፣ ማስመሪያ',
    'q': ['በዳይስ ስድስት የመውጣት ፕሮባቢሊቲ ስንት ነው?', 'ትላልቆቹን ተክሎች ብቻ ለምን አንለካም?', 'የናሙናህ አማካይ ከእውነተኛው አማካይ ምን ያህል ቀረበ?'], 'tip': 'ተማሪዎች የዘፈቀደ ናሙናዎች ለእውነቱ ቅርብ እንደሚያርፉ፣ ግን በትክክል እንዳልሆነ ይዩ።'},
   {'t': 'ፍትሐዊ ሙከራ', 'd': '6 ሳምንት · 18 ሰዓት', 'o': ['አንድ ለውጥና መቆጣጠሪያ ያለው ሙከራ መንደፍ', 'ድግግሞሾችንና በዘፈቀደ ድልድልን መጠቀም', 'ውጤቶችን ማጠቃለልና ጥንቃቄ የተሞላበት ድምዳሜ ላይ መድረስ'],
    'l': ['ሕክምናዎችና (treatments) መቆጣጠሪያዎች', 'በአንድ ጊዜ አንድ ለውጥ፡ ለምን?', 'ድግግሞሽ፡ 1 ማሰሮ ለምን በቂ አይደለም', 'ዕጣ በማውጣት በዘፈቀደ መደልደል', 'ዳታን በጥንቃቄ መመዝገብ', 'ድምዳሜ መጻፍ፡ ዳታው የሚያሳየውና የማያሳየው'],
    'a': 'የኮምፖስት ማሰሮ ሙከራውን አካሂዱ (8 ማሰሮዎች ከኮምፖስት ጋር፣ 8 ያለ ኮምፖስት፣ ቁጥር በማውጣት የተደለደሉ)፤ ከዚያ አማካዮችን፣ ክልሎችንና የነጥብ ፕሎትን አቅርቡ።', 'm': 'ማሰሮዎች ወይም በግማሽ የተቆረጡ የፕላስቲክ ጠርሙሶች፣ አፈር፣ ኮምፖስት፣ የበቆሎ ዘር፣ ማስመሪያ',
    'q': ['በሙከራህ ውስጥ መቆጣጠሪያው ምንድነው?', 'ማሰሮዎቹን ለመምረጥ ለምን ቁጥር አወጣህ?', 'በዘፈቀደ ባትደለድል ኖሮ ልዩነቱን ሌላ ምን ሊያብራራው ይችል ነበር?'], 'tip': 'ይህ ሞጁል በደረጃ S4–S7 ውስጥ ያሉ የመስክ ሙከራዎች ሁሉ መሠረት ነው።'}]},
 'ex': [s2_ex]
}
emit(2, S2)

# ------------------------------------------------------------------ S3
imp = np.round(rng.normal(5.2, 0.7, 10), 2); loc = np.round(rng.normal(4.3, 0.7, 10), 2)
save_csv(pd.DataFrame({'farm': range(1, 21), 'variety': ['improved'] * 10 + ['local'] * 10, 'yield_t_ha': np.r_[imp, loc]}), 's3_maize_ttest.csv')
ex_t = example('s3-ttest',
 {'en': 'Does the improved maize variety yield more than the local one?', 'am': 'የተሻሻለው የበቆሎ ዝርያ ከአካባቢው ዝርያ የበለጠ ምርት ይሰጣል?'},
 {'en': '20 farms in one district were assigned at random: 10 grew the improved variety, 10 the local variety. Grain yield was weighed at harvest.', 'am': 'በአንድ ወረዳ ውስጥ 20 እርሻዎች በዘፈቀደ ተደለደሉ፡ 10ሩ የተሻሻለውን፣ 10ሩ የአካባቢውን ዝርያ ዘሩ። የእህል ምርት በምርት ስብሰባ ጊዜ ተመዘነ።'},
 {'en': 'Two independent groups → Welch two-sample t-test with a 95% confidence interval', 'am': 'ሁለት ነፃ ቡድኖች → የWelch ባለ ሁለት ናሙና t-test ከ95% confidence interval ጋር'},
 's3_maize_ttest.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s3_maize_ttest.csv")
a = d[d.variety == "improved"].yield_t_ha
b = d[d.variety == "local"].yield_t_ha
print(f"Improved: mean {a.mean():.2f} t/ha, SD {a.std():.2f}")
print(f"Local:    mean {b.mean():.2f} t/ha, SD {b.std():.2f}")
t, p = stats.ttest_ind(a, b, equal_var=False)
se = np.sqrt(a.var()/len(a) + b.var()/len(b))
df = se**4 / ((a.var()/len(a))**2/(len(a)-1) + (b.var()/len(b))**2/(len(b)-1))
diff = a.mean() - b.mean(); q = stats.t.ppf(0.975, df)
print(f"Difference: {diff:.2f} t/ha, 95% CI {diff-q*se:.2f} to {diff+q*se:.2f}")
print(f"Welch t = {t:.2f}, df = {df:.1f}, p = {p:.4f}")
''',
 '''
d <- read.csv("s3_maize_ttest.csv")
t.test(yield_t_ha ~ variety, data = d)   # Welch test by default
boxplot(yield_t_ha ~ variety, data = d, ylab = "Yield (t/ha)")
''',
 {'en': ['The improved variety gave about 1.4 t/ha more on average (5.35 vs 3.98 t/ha).', 'The 95% confidence interval for the gain does not include 0, so the gain is real, not chance.', 'p < 0.05: if the varieties were truly equal, a difference this large would be rare.'],
  'am': ['የተሻሻለው ዝርያ በአማካይ ወደ 1.4 t/ha ገደማ ብልጫ ሰጠ (5.35 ከ3.98 t/ha)።', 'የትርፉ 95% confidence interval 0ን አያካትትም፤ ስለዚህ ትርፉ እውነተኛ እንጂ የአጋጣሚ አይደለም።', 'p < 0.05፡ ዝርያዎቹ በእውነት እኩል ቢሆኑ ኖሮ ይህን ያህል ልዩነት ብርቅ ይሆን ነበር።']},
 {'en': 'Recommend the improved variety if the extra seed cost is less than the value of the lower end of the CI gain (a cautious, profitable rule).', 'am': 'ተጨማሪው የዘር ወጪ ከCIው ዝቅተኛ ጫፍ ትርፍ ዋጋ ያነሰ ከሆነ የተሻሻለውን ዝርያ ምከሩ (ጥንቁቅና ትርፋማ ሕግ)።'},
 {'en': 'Seed companies pay for independent on-farm comparisons like this.', 'am': 'የዘር ኩባንያዎች ለእንዲህ ዓይነት ገለልተኛ የእርሻ ላይ ንጽጽሮች ይከፍላሉ።'})

cont = pd.DataFrame({'extension_contact': ['yes'] * 2 + ['no'] * 2, 'adopted_improved_seed': ['yes', 'no'] * 2, 'farmers': [68, 32, 41, 59]})
save_csv(cont, 's3_adoption_chisq.csv')
ex_c = example('s3-chisq',
 {'en': 'Are farmers with extension contact more likely to adopt improved seed?', 'am': 'የኤክስቴንሽን ግንኙነት ያላቸው ገበሬዎች የተሻሻለ ዘርን የመቀበል ዕድላቸው ይበልጣል?'},
 {'en': 'A random survey of 200 farmers recorded extension contact (yes/no) and adoption of improved seed (yes/no).', 'am': 'በ200 ገበሬዎች ላይ የተደረገ የዘፈቀደ ዳሰሳ የኤክስቴንሽን ግንኙነትን (አዎ/አይ) እና የተሻሻለ ዘር መቀበልን (አዎ/አይ) መዘገበ።'},
 {'en': 'Two categorical variables → chi-square test of independence on a 2×2 table', 'am': 'ሁለት ምድባዊ ተለዋዋጮች → በ2×2 ሰንጠረዥ ላይ የchi-square የነፃነት ፈተና'},
 's3_adoption_chisq.csv',
 '''
import pandas as pd
from scipy import stats
d = pd.read_csv("s3_adoption_chisq.csv")
tab = d.pivot(index="extension_contact", columns="adopted_improved_seed", values="farmers")
print(tab)
rate = tab["yes"] / tab.sum(axis=1)
print("Adoption rate:", {k: f"{v:.0%}" for k, v in rate.items()})
chi2, p, dof, exp = stats.chi2_contingency(tab, correction=False)
print(f"Chi-square = {chi2:.2f}, df = {dof}, p = {p:.4f}")
print("Expected counts if no link:", exp.round(1).tolist())
''',
 '''
d <- read.csv("s3_adoption_chisq.csv")
tab <- xtabs(farmers ~ extension_contact + adopted_improved_seed, data = d)
prop.table(tab, 1)
chisq.test(tab, correct = FALSE)
''',
 {'en': ['68% of farmers with extension contact adopted, against 41% without.', 'All expected counts are above 5, so the chi-square test is valid.', 'p < 0.001: adoption and extension contact are linked. A survey shows association, not proof of cause.'],
  'am': ['የኤክስቴንሽን ግንኙነት ካላቸው ገበሬዎች 68% ተቀበሉ፤ ከሌላቸው 41%።', 'ሁሉም የሚጠበቁ ቁጥሮች ከ5 በላይ ስለሆኑ የchi-square ፈተናው ትክክል ነው።', 'p < 0.001፡ መቀበልና የኤክስቴንሽን ግንኙነት ተያያዥ ናቸው። ዳሰሳ ትስስርን ያሳያል እንጂ የምክንያት ማረጋገጫ አይደለም።']},
 {'en': 'Invest in extension contact (or a phone-based advice service) where adoption is low, and test its effect with a randomised trial.', 'am': 'መቀበል ዝቅተኛ በሆነበት ቦታ በኤክስቴንሽን ግንኙነት (ወይም በስልክ የምክር አገልግሎት) ላይ ኢንቨስት አድርጉ፤ ውጤቱንም በዘፈቀደ ሙከራ ፈትኑ።'},
 {'en': 'Survey and monitoring services for NGOs and seed firms are paid work for statisticians.', 'am': 'ለNGOዎችና ለዘር ድርጅቶች የዳሰሳና የክትትል አገልግሎቶች ለስታቲስቲሺያኖች የሚከፈልበት ሥራ ናቸው።'})

N = np.repeat([0, 23, 46, 69, 92], 4)
y = np.round(2.1 + 0.032 * N + rng.normal(0, 0.35, N.size), 2)
save_csv(pd.DataFrame({'plot': range(1, 21), 'N_kg_ha': N, 'yield_t_ha': y}), 's3_wheat_nitrogen.csv')
ex_r = example('s3-regression',
 {'en': 'How much does wheat yield rise for each kilogram of nitrogen?', 'am': 'ለእያንዳንዱ ኪሎግራም ናይትሮጅን የስንዴ ምርት ምን ያህል ይጨምራል?'},
 {'en': 'Five nitrogen rates (0–92 kg N/ha), each on 4 plots, yield recorded at harvest.', 'am': 'አምስት የናይትሮጅን መጠኖች (0–92 kg N/ha)፣ እያንዳንዱ በ4 ማሳዎች፣ ምርት በስብሰባ ጊዜ ተመዘገበ።'},
 {'en': 'Numeric input and numeric output → correlation and simple linear regression', 'am': 'ቁጥራዊ ግብዓትና ቁጥራዊ ውጤት → ተዛምዶና ቀላል linear regression'},
 's3_wheat_nitrogen.csv',
 '''
import pandas as pd
from scipy import stats
d = pd.read_csv("s3_wheat_nitrogen.csv")
fit = stats.linregress(d.N_kg_ha, d.yield_t_ha)
print(f"yield = {fit.intercept:.2f} + {fit.slope:.4f} x N")
print(f"r = {fit.rvalue:.3f}, R-squared = {fit.rvalue**2:.3f}, p = {fit.pvalue:.2e}")
print(f"Each 10 kg N/ha adds {10*fit.slope:.2f} t/ha (SE of slope {fit.stderr:.4f})")
print("Means by rate:", d.groupby("N_kg_ha").yield_t_ha.mean().round(2).to_dict())
''',
 '''
d <- read.csv("s3_wheat_nitrogen.csv")
m <- lm(yield_t_ha ~ N_kg_ha, data = d)
summary(m)
plot(yield_t_ha ~ N_kg_ha, data = d); abline(m)
plot(m, which = 1)   # residuals: check for a curve
''',
 {'en': ['Yield rises by about 0.3 t/ha for every 10 kg N/ha in this range.', 'R² shows how much of the plot-to-plot variation nitrogen explains.', 'A straight line fits here, but responses usually curve and level off at higher rates (Level S5 fits curves and finds the most profitable rate).'],
  'am': ['በዚህ ክልል ውስጥ ለእያንዳንዱ 10 kg N/ha ምርት ወደ 0.3 t/ha ገደማ ይጨምራል።', 'R² ናይትሮጅን ከማሳ ወደ ማሳ ያለውን ልዩነት ምን ያህል እንደሚያብራራ ያሳያል።', 'እዚህ ቀጥ ያለ መስመር ይስማማል፤ ግን ምላሾች ብዙውን ጊዜ በከፍተኛ መጠኖች ይታጠፋሉ፣ ይረጋጋሉ (ደረጃ S5 ኩርባዎችን አስማምቶ በጣም ትርፋማውን መጠን ያገኛል)።']},
 {'en': 'Do not extrapolate beyond 92 kg N/ha; run a wider-range trial and an economic analysis before recommending higher rates.', 'am': 'ከ92 kg N/ha በላይ አትገምቱ፤ ከፍ ያሉ መጠኖችን ከመምከራችሁ በፊት ሰፊ ክልል ያለው ሙከራና የኢኮኖሚ ትንተና አካሂዱ።'},
 {'en': 'Fertilizer recommendation services based on local response data save farmers money and earn fees.', 'am': 'በአካባቢ የምላሽ ዳታ ላይ የተመሠረቱ የማዳበሪያ ምክር አገልግሎቶች የገበሬዎችን ገንዘብ ያድናሉ፣ ክፍያም ያስገኛሉ።'})

S3 = {
 'name': {'en': 'Evidence and Inference', 'am': 'ማስረጃና ስታቲስቲካዊ ድምዳሜ'},
 'stage': {'en': 'Grades 9–12 · ages 14–18', 'am': '9ኛ–12ኛ ክፍል · ዕድሜ 14–18'},
 'goal': {'en': 'Learners move from describing data to drawing conclusions with known uncertainty: distributions, confidence intervals, t-tests, chi-square, correlation and regression, a first field experiment and a first farmer survey, with spreadsheets, Python or R.',
          'am': 'ተማሪዎች ዳታን ከመግለጽ ወደ የሚታወቅ እርግጠኛ አለመሆን ያለው ድምዳሜ ይሸጋገራሉ፡ ስርጭቶች፣ confidence intervals፣ t-tests፣ chi-square፣ ተዛምዶና regression፣ የመጀመሪያ የመስክ ሙከራና የመጀመሪያ የገበሬ ዳሰሳ፣ በስፕሬድሺት፣ በPython ወይም በR።'},
 'mods': {
  'en': [
   {'t': 'Distributions and variability', 'd': '5 weeks · 20 h', 'o': ['Describe spread with variance and standard deviation', 'Recognise the normal distribution and skewed data', 'Explain the standard error and why bigger samples help'],
    'l': ['Variance and SD by hand and in code', 'The normal curve: plant heights, grain weights', 'Skewed data: farm sizes, incomes', 'Sampling distributions: simulate 1000 samples', 'Standard error = SD / √n'],
    'a': 'Weigh 100 grains of teff or wheat in groups of 10, plot the histogram, and use simulation to show how the mean of 10 grains varies less than single grains.', 'm': 'Kitchen or lab scale, grain, Python or spreadsheet',
    'q': ['What does a large SD mean for a crop?', 'Why does the standard error shrink with more samples?', 'Is farm size usually normal or skewed?'], 'tip': 'Simulation makes sampling distributions click; use it before formulas.'},
   {'t': 'Confidence intervals and tests', 'd': '6 weeks · 24 h', 'o': ['Build and read a 95% confidence interval', 'Run one-sample, paired and two-sample t-tests', 'Explain p-values, type I and type II errors honestly'],
    'l': ['From sample to population: the CI', 'The logic of a test: null and alternative', 'Two-sample t-test (Welch)', 'Paired t-test: the same farms, two seasons', 'p-values: what they mean and do not mean', 'Errors and power: why small trials miss real effects'],
    'a': 'Analyse the improved vs local maize on-farm comparison, report the gain with its 95% CI, and write a 5-line recommendation for farmers.', 'm': 'Python (scipy) or R, the example dataset',
    'q': ['What does a 95% CI that excludes zero tell you?', 'When do you use a paired t-test?', 'Is p = 0.06 proof of "no effect"?'], 'tip': 'Always report the effect size and CI, not only p.'},
   {'t': 'Counts and categories', 'd': '4 weeks · 16 h', 'o': ['Compare proportions between groups', 'Run and check a chi-square test of independence', 'Separate association from causation'],
    'l': ['Proportions and percentages with CIs', 'Contingency tables', 'Chi-square test and expected counts', 'Fisher’s exact test for small counts', 'Association vs causation: confounders'],
    'a': 'Run a survey of 50–200 farmers on improved seed adoption and extension contact, then test the link and list possible confounders.', 'm': 'Survey form, phone or paper, Python or R',
    'q': ['When is chi-square not valid?', 'Name a confounder for the adoption–extension link.', 'How would you prove extension causes adoption?'], 'tip': 'Teach survey ethics: consent, privacy and sharing results back with farmers.'},
   {'t': 'Relationships: correlation and regression', 'd': '5 weeks · 20 h', 'o': ['Measure linear association with r', 'Fit and interpret a simple linear regression', 'Check residuals and avoid extrapolation'],
    'l': ['Scatter plots and correlation r', 'Least-squares line: intercept and slope', 'R² and residuals', 'Checking assumptions with residual plots', 'Prediction vs extrapolation'],
    'a': 'Fit yield against nitrogen rate from a 5-rate trial, explain the slope in kg of grain per kg of N, and check the residual plot for curvature.', 'm': 'Trial data, Python or R',
    'q': ['What does a slope of 0.03 t/ha per kg N mean?', 'Does r = 0.9 prove N causes yield?', 'Why is predicting at 200 kg N risky?'], 'tip': 'Tie every slope to money: kg of grain per kg of fertilizer.'},
   {'t': 'First field experiment and first survey', 'd': '6 weeks · 24 h', 'o': ['Lay out a completely randomised field trial with 4 replicates', 'Plan a simple random or stratified farmer survey', 'Choose free tools: spreadsheets, JASP, Python, R'],
    'l': ['From pots to plots: plot size, borders, labels', 'Randomising plots with a phone or random numbers', 'Field data sheets and data entry checks', 'Sampling frames: lists of farmers, strata by kebele or village', 'Questionnaire design: clear, short, unbiased questions', 'Software tour: JASP (point-and-click), Python, R'],
    'a': 'With the school farm or a cooperative, lay out a 4-treatment × 4-replicate trial, collect yields, and present a one-page report with a chart and a t-test or simple ANOVA.', 'm': 'Pegs, string, tape measure, scale, phone, free software',
    'q': ['Why do border rows matter?', 'How did you randomise plots?', 'What makes a survey question biased?'], 'tip': 'A well-run small trial teaches more than a large messy one.'}],
  'am': [
   {'t': 'ስርጭቶችና ልዩነት', 'd': '5 ሳምንት · 20 ሰዓት', 'o': ['ስርጭትን በvariance እና በstandard deviation መግለጽ', 'normal distributionን እና የተዛባ ዳታን መለየት', 'standard errorን እና ትላልቅ ናሙናዎች ለምን እንደሚረዱ ማብራራት'],
    'l': ['Variance እና SD በእጅና በኮድ', 'የnormal ኩርባ፡ የተክል ቁመቶች፣ የእህል ክብደቶች', 'የተዛባ ዳታ፡ የእርሻ መጠኖች፣ ገቢዎች', 'የናሙና ስርጭቶች፡ 1000 ናሙናዎችን አስመስል', 'Standard error = SD / √n'],
    'a': '100 የጤፍ ወይም የስንዴ ፍሬዎችን በ10 ቡድኖች መዝኑ፣ ሂስቶግራሙን ሥሉ፣ የ10 ፍሬዎች አማካይ ከነጠላ ፍሬዎች ያነሰ እንደሚለያይ በሲሙሌሽን አሳዩ።', 'm': 'የኩሽና ወይም የላብራቶሪ ሚዛን፣ እህል፣ Python ወይም ስፕሬድሺት',
    'q': ['ትልቅ SD ለሰብል ምን ማለት ነው?', 'standard error በብዙ ናሙናዎች ለምን ያንሳል?', 'የእርሻ መጠን ብዙውን ጊዜ normal ነው ወይስ የተዛባ?'], 'tip': 'ሲሙሌሽን የናሙና ስርጭቶችን ያስረዳል፤ ከቀመሮች በፊት ተጠቀምበት።'},
   {'t': 'Confidence intervals እና ፈተናዎች', 'd': '6 ሳምንት · 24 ሰዓት', 'o': ['95% confidence interval መገንባትና ማንበብ', 'ባለ አንድ ናሙና፣ ጥንድ (paired) እና ባለ ሁለት ናሙና t-tests ማካሄድ', 'p-valuesን፣ type I እና type II ስህተቶችን በታማኝነት ማብራራት'],
    'l': ['ከናሙና ወደ ሕዝብ፡ CI', 'የፈተና አመክንዮ፡ null እና alternative', 'ባለ ሁለት ናሙና t-test (Welch)', 'Paired t-test፡ አንድ ዓይነት እርሻዎች፣ ሁለት ወቅቶች', 'p-values፡ ምን ማለት እንደሆኑና እንዳልሆኑ', 'ስህተቶችና power፡ ትናንሽ ሙከራዎች ለምን እውነተኛ ውጤቶችን ያጣሉ'],
    'a': 'የተሻሻለውና የአካባቢው በቆሎ የእርሻ ላይ ንጽጽርን ተንትኑ፣ ትርፉን ከ95% CIው ጋር ሪፖርት አድርጉ፣ ለገበሬዎች የ5 መስመር ምክር ጻፉ።', 'm': 'Python (scipy) ወይም R፣ የምሳሌው ዳታሴት',
    'q': ['ዜሮን የማያካትት 95% CI ምን ይነግርሃል?', 'paired t-test የምትጠቀመው መቼ ነው?', 'p = 0.06 የ«ምንም ውጤት የለም» ማረጋገጫ ነው?'], 'tip': 'p ብቻ ሳይሆን የተጽዕኖውን መጠንና CIን ሁልጊዜ ሪፖርት አድርግ።'},
   {'t': 'ቁጥሮችና ምድቦች', 'd': '4 ሳምንት · 16 ሰዓት', 'o': ['በቡድኖች መካከል ምጣኔዎችን (proportions) ማወዳደር', 'የchi-square የነፃነት ፈተና ማካሄድና መፈተሽ', 'ትስስርን ከምክንያት መለየት'],
    'l': ['ምጣኔዎችና መቶኛዎች ከCIs ጋር', 'Contingency ሰንጠረዦች', 'የChi-square ፈተናና የሚጠበቁ ቁጥሮች', 'ለትናንሽ ቁጥሮች የFisher exact test', 'ትስስር vs ምክንያት፡ confounders'],
    'a': 'ከ50–200 ገበሬዎች ላይ ስለ የተሻሻለ ዘር መቀበልና የኤክስቴንሽን ግንኙነት ዳሰሳ አካሂዱ፣ ትስስሩን ፈትኑ፣ ሊሆኑ የሚችሉ confoundersን ዘርዝሩ።', 'm': 'የዳሰሳ ቅጽ፣ ስልክ ወይም ወረቀት፣ Python ወይም R',
    'q': ['chi-square የማይሠራው መቼ ነው?', 'ለመቀበል–ኤክስቴንሽን ትስስር አንድ confounder ጥቀስ።', 'ኤክስቴንሽን መቀበልን እንደሚያመጣ እንዴት ታረጋግጣለህ?'], 'tip': 'የዳሰሳ ሥነ-ምግባርን አስተምር፡ ስምምነት፣ ግላዊነትና ውጤቶችን ለገበሬዎች መመለስ።'},
   {'t': 'ግንኙነቶች፡ ተዛምዶና regression', 'd': '5 ሳምንት · 20 ሰዓት', 'o': ['ቀጥተኛ ትስስርን በr መለካት', 'ቀላል linear regression አስማምቶ መተርጎም', 'residualsን መፈተሽና ከክልል ውጭ መገመትን ማስወገድ'],
    'l': ['ስካተር ፕሎቶችና ተዛምዶ r', 'Least-squares መስመር፡ intercept እና slope', 'R² እና residuals', 'በresidual ፕሎቶች ግምቶችን መፈተሽ', 'ትንበያ vs ከክልል ውጭ መገመት'],
    'a': 'ከ5 መጠን ሙከራ ምርትን ከናይትሮጅን መጠን ጋር አስማሙ፣ slopeን በኪሎግራም እህል በኪሎግራም N አብራሩ፣ የresidual ፕሎቱን ለኩርባ ፈትሹ።', 'm': 'የሙከራ ዳታ፣ Python ወይም R',
    'q': ['በኪሎ N 0.03 t/ha slope ምን ማለት ነው?', 'r = 0.9 N ምርትን እንደሚያመጣ ያረጋግጣል?', 'በ200 kg N መተንበይ ለምን አደገኛ ነው?'], 'tip': 'እያንዳንዱን slope ከገንዘብ ጋር አገናኝ፡ ኪሎግራም እህል በኪሎግራም ማዳበሪያ።'},
   {'t': 'የመጀመሪያ የመስክ ሙከራና የመጀመሪያ ዳሰሳ', 'd': '6 ሳምንት · 24 ሰዓት', 'o': ['በ4 ድግግሞሾች ሙሉ በሙሉ በዘፈቀደ የተደለደለ የመስክ ሙከራ ማዘጋጀት', 'ቀላል የዘፈቀደ ወይም stratified የገበሬ ዳሰሳ ማቀድ', 'ነፃ መሣሪያዎችን መምረጥ፡ ስፕሬድሺቶች፣ JASP፣ Python፣ R'],
    'l': ['ከማሰሮዎች ወደ ማሳዎች፡ የማሳ መጠን፣ ዳርቻዎች፣ መለያዎች', 'ማሳዎችን በስልክ ወይም በዘፈቀደ ቁጥሮች መደልደል', 'የመስክ ዳታ ሉሆችና የዳታ ማስገቢያ ፍተሻዎች', 'የናሙና ማዕቀፎች፡ የገበሬዎች ዝርዝሮች፣ በቀበሌ ወይም በመንደር strata', 'የመጠይቅ ንድፍ፡ ግልጽ፣ አጭርና አድልዎ የሌላቸው ጥያቄዎች', 'የሶፍትዌር ጉብኝት፡ JASP (ጠቅ አድርግ)፣ Python፣ R'],
    'a': 'ከትምህርት ቤቱ እርሻ ወይም ከማኅበር ጋር የ4 ሕክምና × 4 ድግግሞሽ ሙከራ አዘጋጁ፣ ምርትን ሰብስቡ፣ ቻርትና t-test ወይም ቀላል ANOVA ያለው የአንድ ገጽ ሪፖርት አቅርቡ።', 'm': 'ካስማዎች፣ ገመድ፣ ሜትር፣ ሚዛን፣ ስልክ፣ ነፃ ሶፍትዌር',
    'q': ['የዳርቻ ረድፎች ለምን አስፈላጊ ናቸው?', 'ማሳዎቹን እንዴት በዘፈቀደ ደለደልክ?', 'የዳሰሳ ጥያቄን አድልዎ ያለው የሚያደርገው ምንድነው?'], 'tip': 'በደንብ የተካሄደ ትንሽ ሙከራ ከተዘበራረቀ ትልቅ ሙከራ የበለጠ ያስተምራል።'}]},
 'ex': [ex_t, ex_c, ex_r]
}
emit(3, S3)
for n, o in [(1, S1), (2, S2), (3, S3)]:
    for e in o['ex']:
        print(f"--- S{n} {e['id']}\n{e['out']}\n")
