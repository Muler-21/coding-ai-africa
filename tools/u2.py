from mlib import *
D = ('5 weeks · 3 h per week', '5 ሳምንታት · በሳምንት 3 ሰዓት')

# ---------------- Grade 5: From Scratch to Python, and the micro:bit ----------------
G5 = [
U(('Same idea, new language', 'ያው ሐሳብ፣ አዲስ ቋንቋ'), D,
  [('Translate a Scratch script into Python line by line', 'የScratch ስክሪፕትን መስመር በመስመር ወደ Python መተርጎም'), ('Run a Python file and read an error message', 'የPython ፋይል ማስኬድና የስህተት መልእክት ማንበብ')],
  [('Install Thonny or open an online Python', 'Thonnyን ጫን ወይም በኢንተርኔት Python ክፈት'), ('Blocks → lines: say → print, repeat → for', 'ብሎኮች → መስመሮች፡ say → print፣ repeat → for'), ('Indentation shows what is inside a loop', 'ወደ ውስጥ መግባት (indentation) በloop ውስጥ ያለውን ያሳያል'), ('Read and fix your first error message', 'የመጀመሪያ የስህተት መልእክትህን አንብበህ አስተካክል')],
  ('Rebuild your Grade 1 "repeat 4" square program in Python, using text instead of drawing: print the four steps the sprite would take.', 'የ1ኛ ክፍል «repeat 4» የካሬ ፕሮግራምህን በPython እንደገና ገንባ፣ ከሥዕል ይልቅ ጽሑፍ በመጠቀም፡ spriteኡ የሚወስዳቸውን አራት እርምጃዎች አትም።'),
  ('Computer with Thonny (free) or a phone with an online Python', 'Thonny (ነጻ) ያለው ኮምፒውተር ወይም በኢንተርኔት Python ያለው ስልክ'),
  [('What does indentation mean in Python?', 'በPython ውስጥ indentation ምን ማለት ነው?', 'The indented lines belong inside the loop or if above them, like blocks inside a C-block in Scratch.', 'ወደ ውስጥ የገቡት መስመሮች ከላያቸው ባለው loop ወይም if ውስጥ ናቸው፣ በScratch ውስጥ በC-block ውስጥ እንዳሉ ብሎኮች።'),
   ('Which Python word does what Scratch’s "repeat 4" does?', 'የScratchን «repeat 4» የሚያደርገው የትኛው የPython ቃል ነው?', 'for, as in: for i in range(4):', 'for፣ እንደ፡ for i in range(4):')],
  [compare(B('Scratch blocks and Python lines', 'የScratch ብሎኮችና የPython መስመሮች'), [col(B('Scratch', 'Scratch'), ['repeat 4', '   move 100 steps', '   turn 90 degrees'], ['4 ጊዜ ድገም', '   100 እርምጃ ሂድ', '   90 ዲግሪ ዙር']), col(B('Python', 'Python'), ['for side in range(4):', '    print("move 100")', '    print("turn 90")'], ['for side in range(4):', '    print("move 100")', '    print("turn 90")'], 'good')])],
  ex_py('''
for side in range(1, 5):          # the indented lines repeat 4 times
    print(f"side {side}: move 100 steps, turn right 90 degrees")
print("square finished: 4 x 90 =", 4 * 90, "degrees")
''', B('Scratch’s square, written in Python', 'የScratch ካሬ በPython ተጽፎ'))),
U(('print and input: talking programs', 'print እና input፡ የሚነጋገሩ ፕሮግራሞች'), D,
  [('Show text with print and get text with input', 'በprint ጽሑፍ ማሳየትና በinput ጽሑፍ መቀበል'), ('Join text with f-strings', 'ጽሑፍን በf-strings ማገናኘት')],
  [('print("Selam")', 'print("ሰላም")'), ('name = input("Your name? ")', 'name = input("ስምህ? ")'), ('f"Selam {name}!" joins text and variables', 'f"ሰላም {name}!" ጽሑፍንና variablesን ያገናኛል'), ('A bilingual greeting program', 'ባለሁለት ቋንቋ የሰላምታ ፕሮግራም')],
  ('Write a program that asks for a name and a language (am/en) and greets the user in that language.', 'ስምና ቋንቋ (am/en) የሚጠይቅና ተጠቃሚውን በዚያ ቋንቋ ሰላም የሚል ፕሮግራም ጻፍ።'),
  ('Python', 'Python'),
  [('What does input() give back?', 'input() ምን ይመልሳል?', 'Always text (a string), whatever the user types.', 'ተጠቃሚው ምንም ቢጽፍ ሁልጊዜ ጽሑፍ (string)።'),
   ('What does the f in f"…" do?', 'በf"…" ውስጥ ያለው f ምን ያደርጋል?', 'It lets you put variables inside the text with curly brackets, like {name}.', 'በጽሑፉ ውስጥ variablesን በዘንባባ ቅንፎች እንድታስገባ ያስችላል፣ እንደ {name}።')],
  [flow(B('A talking program', 'የሚነጋገር ፕሮግራም'), [N('input()', 'input()', 'user types "Hana", "am"', 'ተጠቃሚው «Hana»፣ «am» ይጽፋል'), N('if language == "am"', 'if language == "am"'), N('print()', 'print()', '"ሰላም Hana!"', '«ሰላም Hana!»', hl=True)])],
  ex_py('''
def greet(name, language):
    if language == "am":
        return f"ሰላም {name}! እንኳን ደህና መጣህ።"
    return f"Hello {name}! Welcome."
# in class: name = input("Name? ") and language = input("am or en? ")
for name, language in [("Hana", "am"), ("Tesfaye", "en")]:
    print(greet(name, language))
''', B('A bilingual greeting', 'ባለሁለት ቋንቋ ሰላምታ'))),
U(('Variables and maths: market calculator', 'Variables እና ሒሳብ፡ የገበያ ማስሊያ'), D,
  [('Store numbers in variables and calculate', 'ቁጥሮችን በvariables ማስቀመጥና ማስላት'), ('Convert text to numbers with int() and float()', 'ጽሑፍን በint() እና float() ወደ ቁጥሮች መቀየር')],
  [('+ − × ÷ and // and %', '+ − × ÷ እና // እና %'), ('int vs float', 'int vs float'), ('Convert input to a number', 'inputን ወደ ቁጥር ቀይር'), ('Market calculator with change', 'ከመልስ ገንዘብ ጋር የገበያ ማስሊያ')],
  ('Build a market calculator: price per kilo, kilos, money paid → total and change in birr.', 'የገበያ ማስሊያ ገንባ፡ በኪሎ ዋጋ፣ ኪሎዎች፣ የተከፈለ ገንዘብ → ጠቅላላና መልስ በብር።'),
  ('Python', 'Python'),
  [('Why does 2 + "3" give an error?', '2 + "3" ለምን ስህተት ይሰጣል?', 'You cannot add a number and text; convert first: 2 + int("3") is 5.', 'ቁጥርንና ጽሑፍን መደመር አትችልም፤ መጀመሪያ ቀይር፡ 2 + int("3") 5 ነው።'),
   ('What does 17 // 5 give, and 17 % 5?', '17 // 5 ምን ይሰጣል፣ 17 % 5ስ?', '3 (whole times) and 2 (the remainder).', '3 (ሙሉ ጊዜያት) እና 2 (ቀሪው)።')],
  [flow(B('From text to money', 'ከጽሑፍ ወደ ገንዘብ'), [N('"120"', '"120"', 'text from input()', 'ከinput() የመጣ ጽሑፍ'), N('float("120")', 'float("120")'), N('120.0 × 3.5', '120.0 × 3.5'), N('420.0 birr', '420.0 ብር', hl=True)])],
  ex_py('''
price_per_kilo = float("120")      # from input() in class
kilos = float("3.5")
paid = int("1000")
total = price_per_kilo * kilos
change = paid - total
print(f"total {total:.2f} birr, paid {paid}, change {change:.2f} birr")
print("100-birr notes in the change:", int(change) // 100, "| remainder:", int(change) % 100, "birr")
''', B('Market calculator with change', 'ከመልስ ገንዘብ ጋር የገበያ ማስሊያ'))),
U(('micro:bit with blocks', 'micro:bit በብሎኮች'), D,
  [('Program a micro:bit with MakeCode blocks', 'micro:bitን በMakeCode ብሎኮች ፕሮግራም ማድረግ'), ('Use buttons as events and the LED screen as output', 'ቁልፎችን እንደ ክስተቶች፣ የLED ስክሪኑን እንደ ውጤት መጠቀም')],
  [('Meet the micro:bit: buttons, LEDs, sensors', 'ከmicro:bit ጋር ተዋወቅ፡ ቁልፎች፣ LEDs፣ ሴንሰሮች'), ('On button A: show a smiley', 'በቁልፍ A፡ ፈገግታ አሳይ'), ('Simulator first, then download to the board', 'መጀመሪያ simulator፣ ከዚያ ወደ ቦርዱ አውርድ'), ('A dice on shake', 'ሲነቀነቅ ዳይስ')],
  ('Make a micro:bit "class vote": button A counts yes, button B counts no, shake shows the totals.', 'የmicro:bit «የክፍል ድምፅ» ሥራ፡ ቁልፍ A አዎን ይቆጥራል፣ ቁልፍ B አይደለምን ይቆጥራል፣ መነቅነቅ ድምሮቹን ያሳያል።'),
  ('micro:bit (or the free online simulator), USB cable', 'micro:bit (ወይም ነጻው የኢንተርኔት simulator)፣ USB ገመድ'),
  [('Which part of the micro:bit is the input and which the output?', 'የmicro:bit የትኛው ክፍል ግብዓት፣ የትኛውስ ውጤት ነው?', 'Buttons and sensors are inputs; the 5×5 LED screen (and sound) are outputs.', 'ቁልፎችና ሴንሰሮች ግብዓቶች ናቸው፤ 5×5 የLED ስክሪኑ (እና ድምፅ) ውጤቶች ናቸው።'),
   ('Why test in the simulator first?', 'ለምን መጀመሪያ በsimulator እንፈትሻለን?', 'It is fast and free, and you only download when the program works.', 'ፈጣንና ነጻ ነው፤ ፕሮግራሙ ሲሠራ ብቻ ታወርዳለህ።')],
  [blocks(B('Class vote in MakeCode', 'የክፍል ድምፅ በMakeCode'), [bk('on start: set yes to 0, set no to 0', 'ሲጀምር፡ yesን 0፣ noን 0 አድርግ', 'data'), bk('on button A pressed: change yes by 1', 'ቁልፍ A ሲጫን፡ yesን በ1 ቀይር', 'event'), bk('on button B pressed: change no by 1', 'ቁልፍ B ሲጫን፡ noን በ1 ቀይር', 'event'), bk('on shake: show "Y" yes "N" no', 'ሲነቀነቅ፡ "Y" yes "N" no አሳይ', 'looks')])],
  ex_code('MicroPython (micro:bit)', '''
from microbit import *
yes = no = 0
while True:
    if button_a.was_pressed():
        yes += 1
    if button_b.was_pressed():
        no += 1
    if accelerometer.was_gesture("shake"):
        display.scroll("Y" + str(yes) + " N" + str(no))
''', B('The same vote in MicroPython', 'ያው ድምፅ በMicroPython'), B('Runs on the micro:bit or its online simulator (not run in this build).', 'በmicro:bit ወይም በኢንተርኔት simulatorኡ ላይ ይሠራል (በዚህ ግንባታ አልተሠራም)።'))),
U(('micro:bit sensors', 'የmicro:bit ሴንሰሮች'), D,
  [('Read temperature and light level', 'ሙቀትንና የብርሃን መጠንን ማንበብ'), ('Log readings over time and look for patterns', 'ንባቦችን በጊዜ ሂደት መመዝገብና ንድፎችን መፈለግ')],
  [('temperature(): degrees Celsius', 'temperature()፡ ዲግሪ ሴልሲየስ'), ('display.read_light_level(): 0–255', 'display.read_light_level()፡ 0–255'), ('Record every 10 minutes for a day', 'ለአንድ ቀን በየ10 ደቂቃው መዝግብ'), ('Is it warmer in the sun or the shade?', 'በፀሐይ ወይስ በጥላ ይሞቃል?')],
  ('Compare temperature in a sunny spot and under a tree, every 30 minutes for one school day, and explain why farmers use shade for seedlings.', 'በፀሐያማ ቦታና በዛፍ ሥር ያለውን ሙቀት በአንድ የትምህርት ቀን በየ30 ደቂቃው አወዳድር፤ ገበሬዎች ለችግኞች ለምን ጥላ እንደሚጠቀሙ አብራራ።'),
  ('micro:bit, battery pack, notebook', 'micro:bit፣ የባትሪ ጥቅል፣ ማስታወሻ ደብተር'),
  [('Which micro:bit sensor measures temperature?', 'የትኛው የmicro:bit ሴንሰር ሙቀትን ይለካል?', 'The temperature sensor inside the processor chip, read with temperature(); it reads a little high when the board is busy.', 'በprocessor ቺፑ ውስጥ ያለው የሙቀት ሴንሰር፣ በtemperature() ይነበባል፤ ቦርዱ ሥራ ሲበዛበት ትንሽ ከፍ ብሎ ያነባል።'),
   ('Why take readings at the same times in both places?', 'በሁለቱም ቦታዎች በተመሳሳይ ጊዜ ለምን ንባቦችን እንወስዳለን?', 'So the only difference is the place (sun or shade), making it a fair test.', 'ብቸኛው ልዩነት ቦታው (ፀሐይ ወይም ጥላ) እንዲሆን፣ ፍትሐዊ ፈተና እንዲሆን።')],
  [flow(B('A tiny weather station', 'ትንሽ የአየር ሁኔታ ጣቢያ'), [N('Sensor', 'ሴንሰር', 'temperature, light', 'ሙቀት፣ ብርሃን'), N('Every 30 min', 'በየ30 ደቂቃ'), N('Write in the notebook', 'በማስታወሻ ደብተሩ ጻፍ'), N('Chart + conclusion', 'ቻርት + ድምዳሜ', hl=True)])],
  ex_py('''
sun   = [22, 25, 29, 32, 34, 33, 30]      # degrees C, readings from 08:00 to 14:00
shade = [21, 22, 24, 26, 27, 27, 26]
times = ["08", "09", "10", "11", "12", "13", "14"]
for t, s, h in zip(times, sun, shade):
    print(f"{t}:00  sun {s:2d}  shade {h:2d}  difference {s - h:+d}")
print(f"average difference: {sum(sun) / 7 - sum(shade) / 7:.1f} degrees warmer in the sun")
''', B('Sun vs shade readings', 'የፀሐይ vs የጥላ ንባቦች'), B('Example readings for practice; use your own measurements in class.', 'ለልምምድ የምሳሌ ንባቦች፤ በክፍል ውስጥ የራስህን ልኬቶች ተጠቀም።'))),
U(('micro:bit in Python', 'micro:bit በPython'), D,
  [('Write MicroPython for the micro:bit', 'ለmicro:bit MicroPython መጻፍ'), ('Use a loop and if to build an alarm', 'ማንቂያ ለመገንባት loop እና if መጠቀም')],
  [('from microbit import *', 'from microbit import *'), ('while True: the forever loop', 'while True፡ የforever loop'), ('if light < 50: show a moon', 'light < 50 ከሆነ፡ ጨረቃ አሳይ'), ('Project: chicken-coop light alarm', 'ፕሮጀክት፡ የዶሮ ቤት የብርሃን ማንቂያ')],
  ('Build a light alarm for a chicken coop: when it gets dark, the micro:bit beeps so the door is closed against predators.', 'ለዶሮ ቤት የብርሃን ማንቂያ ገንባ፡ ሲጨልም micro:bitኡ ይጮኻል፤ ስለዚህ በሩ ከአዳኞች ይዘጋል።'),
  ('micro:bit, speaker or buzzer, battery pack', 'micro:bit፣ ድምፅ ማጉያ ወይም buzzer፣ የባትሪ ጥቅል'),
  [('What does while True do?', 'while True ምን ያደርጋል?', 'It repeats forever, like Scratch’s forever block.', 'ለዘላለም ይደግማል፣ እንደ የScratch forever ብሎክ።'),
   ('How did you choose the darkness threshold?', 'የጨለማውን ወሰን እንዴት መረጥክ?', 'By reading the light level at dusk on a few evenings and picking a value just above it.', 'ለጥቂት ምሽቶች በመሸ ጊዜ የብርሃን መጠኑን በማንበብና ከእሱ ትንሽ ከፍ ያለ እሴት በመምረጥ።')],
  [blocks(B('Coop alarm logic', 'የዶሮ ቤት ማንቂያ ሎጂክ'), [bk('while True (forever)', 'while True (ለዘላለም)', 'control', [bk('light = display.read_light_level()', 'light = display.read_light_level()', 'data'), bk('if light < 40: beep and show a moon', 'light < 40 ከሆነ፡ ጩህና ጨረቃ አሳይ', 'sound'), bk('else: show a sun · sleep 60 seconds', 'ካልሆነ፡ ፀሐይ አሳይ · 60 ሰከንድ ተኛ', 'looks')])])],
  ex_py('''
DARK = 40                                     # chosen from readings at dusk
readings = [180, 150, 110, 70, 45, 38, 30]    # light level every 10 minutes in the evening
for minute, light in zip(range(0, 70, 10), readings):
    action = "BEEP - close the coop" if light < DARK else "ok"
    print(f"+{minute:2d} min  light {light:3d}  {action}")
''', B('Testing the alarm rule on evening readings', 'የማንቂያ ሕጉን በምሽት ንባቦች መፈተሽ'), B('Test the rule on recorded numbers first; then copy the same if into the micro:bit program.', 'መጀመሪያ ሕጉን በተመዘገቡ ቁጥሮች ፈትሽ፤ ከዚያ ያንኑ ifን ወደ micro:bit ፕሮግራም ቅዳ።'))),
]

# ---------------- Grade 6: Decisions, loops, functions and spreadsheets ----------------
G6 = [
U(('if / elif / else: a grade calculator', 'if / elif / else፡ የውጤት ማስሊያ'), D,
  [('Choose between many options with elif', 'በelif ከብዙ አማራጮች መምረጥ'), ('Order conditions correctly', 'ሁኔታዎችን በትክክል መደርደር')],
  [('Comparison: == != < > <= >=', 'ንጽጽር፡ == != < > <= >='), ('if / elif / else chain', 'የif / elif / else ሰንሰለት'), ('Why order matters: test the highest first', 'ቅደም ተከተል ለምን አስፈላጊ ነው፡ ከፍተኛውን መጀመሪያ ፈትሽ'), ('and / or / not', 'and / or / not')],
  ('Write a grade calculator for your school’s grading scale and test it with marks at every boundary (89, 90, 79, 80…).', 'ለትምህርት ቤትህ የውጤት መለኪያ የውጤት ማስሊያ ጻፍና በእያንዳንዱ ወሰን (89፣ 90፣ 79፣ 80…) ባሉ ውጤቶች ፈትሸው።'),
  ('Python', 'Python'),
  [('Why test 89 and 90?', '89 እና 90ን ለምን እንፈትሻለን?', 'Bugs hide at boundaries: > vs >= changes the grade exactly there.', 'ስህተቶች በወሰኖች ላይ ይደበቃሉ፡ > vs >= ውጤቱን በትክክል እዚያ ይቀይራል።'),
   ('What happens if you check "mark >= 50" before "mark >= 90"?', '«mark >= 90»ን ከመፈተሽህ በፊት «mark >= 50»ን ብትፈትሽ ምን ይሆናል?', 'Every mark of 50 or more stops at the first test, so nobody gets an A.', '50 ወይም ከዚያ በላይ የሆነ እያንዳንዱ ውጤት በመጀመሪያው ፈተና ይቆማል፤ ስለዚህ ማንም A አያገኝም።')],
  [flow(B('Checks from top to bottom', 'ፍተሻዎች ከላይ ወደ ታች'), [N('mark ≥ 90 → A', 'mark ≥ 90 → A'), N('elif ≥ 80 → B', 'elif ≥ 80 → B'), N('elif ≥ 65 → C', 'elif ≥ 65 → C'), N('elif ≥ 50 → D', 'elif ≥ 50 → D'), N('else → F', 'else → F', hl=True)])],
  ex_py('''
def grade(mark):
    if mark >= 90:   return "A"
    elif mark >= 80: return "B"
    elif mark >= 65: return "C"
    elif mark >= 50: return "D"
    else:            return "F"
for m in [100, 90, 89, 80, 79, 65, 64, 50, 49, 0]:     # test every boundary
    print(m, grade(m), end=" | ")
print()
''', B('Grade calculator tested at the boundaries', 'በወሰኖቹ የተፈተነ የውጤት ማስሊያ'))),
U(('for loops: tables and patterns', 'for loops፡ ሰንጠረዦችና ንድፎች'), D,
  [('Repeat with for and range()', 'በfor እና range() መድገም'), ('Nest one loop inside another', 'አንዱን loop በሌላው ውስጥ ማስገባት')],
  [('range(5), range(1, 13), range(0, 100, 10)', 'range(5)፣ range(1, 13)፣ range(0, 100, 10)'), ('Multiplication table for one number', 'ለአንድ ቁጥር የማባዛት ሰንጠረዥ'), ('Nested loops: the full 12×12 table', 'የተደራረቡ loops፡ ሙሉው 12×12 ሰንጠረዥ'), ('Patterns with * characters', 'በ* ፊደላት ንድፎች')],
  ('Print a neat multiplication table for 1–9 that younger pupils can use, and a triangle pattern.', 'ታናናሽ ተማሪዎች ሊጠቀሙበት የሚችሉ ንጹሕ የ1–9 የማባዛት ሰንጠረዥና የሦስት ማዕዘን ንድፍ አትም።'),
  ('Python', 'Python'),
  [('What numbers does range(1, 13) give?', 'range(1, 13) ምን ቁጥሮች ይሰጣል?', '1 to 12: the end number is not included.', 'ከ1 እስከ 12፡ የመጨረሻው ቁጥር አይካተትም።'),
   ('In a nested loop, how many times does the inner line run for 9 × 9?', 'በተደራረበ loop ውስጥ ለ9 × 9 የውስጠኛው መስመር ስንት ጊዜ ይሠራል?', '81 times: 9 for each of the 9 outer steps.', '81 ጊዜ፡ ለእያንዳንዱ 9 የውጭ እርምጃዎች 9።')],
  [flow(B('Nested loops', 'የተደራረቡ loops'), [N('outer: row 1…9', 'ውጭ፡ ረድፍ 1…9'), N('inner: column 1…9', 'ውስጥ፡ ዓምድ 1…9'), N('print row × column', 'ረድፍ × ዓምድ አትም', hl=True)], loop=B('inner loop finishes, then the outer moves on', 'የውስጠኛው loop ይጨርሳል፣ ከዚያ የውጩ ይቀጥላል'))],
  ex_py('''
for row in range(1, 10):
    print(" ".join(f"{row * col:2d}" for col in range(1, 10)))
print()
for n in range(1, 6):
    print(" " * (5 - n) + "*" * (2 * n - 1))
''', B('A 9 × 9 table and a triangle', '9 × 9 ሰንጠረዥና ሦስት ማዕዘን'))),
U(('while loops: keep going until …', 'while loops፡ … እስኪሆን ቀጥል'), D,
  [('Repeat while a condition is true', 'ሁኔታ እውነት እስከሆነ ድረስ መድገም'), ('Avoid infinite loops', 'ማለቂያ የሌላቸውን loops ማስወገድ')],
  [('while vs for', 'while vs for'), ('A guessing game with hints', 'ፍንጮች ያሉት የግምት ጨዋታ'), ('Savings: how many weeks to reach a goal?', 'ቁጠባ፡ ግብ ለመድረስ ስንት ሳምንታት?'), ('Infinite loops and how to stop them (Ctrl+C)', 'ማለቂያ የሌላቸው loops እና እንዴት እንደሚቆሙ (Ctrl+C)')],
  ('Write a savings planner: a pupil saves a fixed amount each week; how many weeks until they can buy a bicycle?', 'የቁጠባ ዕቅድ አውጪ ጻፍ፡ ተማሪ በየሳምንቱ የተወሰነ መጠን ይቆጥባል፤ ብስክሌት ለመግዛት ስንት ሳምንታት ያስፈልጋሉ?'),
  ('Python', 'Python'),
  [('When do we use while instead of for?', 'ከfor ይልቅ whileን መቼ እንጠቀማለን?', 'When we do not know how many repeats are needed, for example until the guess is right or the goal is reached.', 'ስንት ድግግሞሽ እንደሚያስፈልግ ሳናውቅ፣ ለምሳሌ ግምቱ ትክክል እስኪሆን ወይም ግቡ እስኪደረስ።'),
   ('What causes an infinite loop?', 'ማለቂያ የሌለው loop ምን ያመጣል?', 'The condition never becomes false, usually because the variable inside the loop is never changed.', 'ሁኔታው በፍጹም ሐሰት አይሆንም፣ ብዙውን ጊዜ በloopኡ ውስጥ ያለው variable በፍጹም ስለማይቀየር።')],
  [flow(B('A while loop', 'while loop'), [N('check: saved < price?', 'ፈትሽ፡ saved < price?'), N('yes → save one more week', 'አዎ → አንድ ተጨማሪ ሳምንት ቆጥብ'), N('no → stop, print weeks', 'አይደለም → አቁም፣ ሳምንታትን አትም', hl=True)])],
  ex_py('''
price, saved, weekly, weeks = 3500, 400, 150, 0     # birr
while saved < price:
    saved += weekly
    weeks += 1
print(f"after {weeks} weeks you have {saved} birr: enough for the {price}-birr bicycle")

secret, guesses = 37, [50, 25, 40, 35, 37]          # in class the guesses come from input()
for tries, g in enumerate(guesses, 1):
    if g == secret: print(f"guess {g}: correct in {tries} tries"); break
    print(f"guess {g}: {'too high' if g > secret else 'too low'}")
''', B('Savings planner and a guessing game', 'የቁጠባ ዕቅድ አውጪና የግምት ጨዋታ'))),
U(('Functions: reusable tools', 'Functions፡ ደጋግመው የሚያገለግሉ መሣሪያዎች'), D,
  [('Define functions with parameters and return values', 'ከparameters እና return values ጋር functions መግለጽ'), ('Reuse one function many times', 'አንድን function ብዙ ጊዜ መጠቀም')],
  [('def name(parameters):', 'def name(parameters):'), ('return sends a value back', 'return እሴት መልሶ ይልካል'), ('area() and seed_needed() for a farm plot', 'ለእርሻ ማሳ area() እና seed_needed()'), ('Functions calling functions', 'functions ሌሎች functionsን ሲጠሩ')],
  ('Write farm-plot functions: area in m², area in hectares, and kilograms of teff seed needed at 15 kg per hectare.', 'የእርሻ ማሳ functions ጻፍ፡ ስፋት በm²፣ ስፋት በሄክታር፣ እና በሄክታር 15 kg ሲሆን የሚያስፈልግ የጤፍ ዘር ኪሎግራም።'),
  ('Python, tape measure for a real plot', 'Python፣ ለእውነተኛ ማሳ ሜትር'),
  [('What does a function return?', 'function ምን ይመልሳል?', 'The value after the word return, which the caller can store or print.', 'ከreturn ቃል በኋላ ያለው እሴት፣ ጠሪው ሊያስቀምጠው ወይም ሊያትመው ይችላል።'),
   ('Why write a function instead of repeating the calculation?', 'ስሌቱን ከመድገም ይልቅ ለምን function እንጽፋለን?', 'Write it once, test it once, use it everywhere; a fix in one place fixes every use.', 'አንድ ጊዜ ጻፈው፣ አንድ ጊዜ ፈትሸው፣ በሁሉም ቦታ ተጠቀምበት፤ በአንድ ቦታ ያለ ማስተካከያ እያንዳንዱን አጠቃቀም ያስተካክላል።')],
  [flow(B('Functions working together', 'አብረው የሚሠሩ functions'), [N('area(40, 25)', 'area(40, 25)', '→ 1000 m²', '→ 1000 m²'), N('hectares(1000)', 'hectares(1000)', '→ 0.1 ha', '→ 0.1 ha'), N('seed_needed(0.1)', 'seed_needed(0.1)', '→ 1.5 kg', '→ 1.5 kg', hl=True)])],
  ex_py('''
def area(length_m, width_m):
    return length_m * width_m
def hectares(m2):
    return m2 / 10_000
def seed_needed(ha, kg_per_ha=15):
    return ha * kg_per_ha
for plot, (l, w) in {"home plot": (40, 25), "river plot": (120, 60)}.items():
    a = area(l, w)
    print(f"{plot}: {a} m2 = {hectares(a):.2f} ha -> {seed_needed(hectares(a)):.1f} kg teff seed")
''', B('Farm-plot functions', 'የእርሻ ማሳ functions'))),
U(('Spreadsheets: data in rows and columns', 'ስፕሬድሺቶች፡ ዳታ በረድፎችና በዓምዶች'), D,
  [('Enter data in a table with one row per record', 'በሰንጠረዥ ውስጥ ለእያንዳንዱ መዝገብ አንድ ረድፍ ዳታ ማስገባት'), ('Use formulas: SUM, AVERAGE, MAX', 'ቀመሮችን መጠቀም፡ SUM፣ AVERAGE፣ MAX')],
  [('Rows, columns, cells: B3', 'ረድፎች፣ ዓምዶች፣ ሴሎች፡ B3'), ('A bottle rain gauge: a week of data', 'የጠርሙስ የዝናብ መለኪያ፡ የሳምንት ዳታ'), ('=SUM(B2:B8), =AVERAGE(), =MAX()', '=SUM(B2:B8)፣ =AVERAGE()፣ =MAX()'), ('The same totals in Python', 'ያው ድምሮች በPython')],
  ('Make a rain gauge from a plastic bottle, record rainfall every morning for a week, and enter it into a spreadsheet with formulas.', 'ከፕላስቲክ ጠርሙስ የዝናብ መለኪያ ሥራ፣ ለአንድ ሳምንት በየጠዋቱ የዝናብ መጠን መዝግብ፣ ከቀመሮች ጋር በስፕሬድሺት አስገባው።'),
  ('Plastic bottle, ruler, a free spreadsheet (LibreOffice or Google Sheets)', 'የፕላስቲክ ጠርሙስ፣ ማስመሪያ፣ ነጻ ስፕሬድሺት (LibreOffice ወይም Google Sheets)'),
  [('What is the cell address of row 3, column B?', 'የረድፍ 3፣ ዓምድ B ሴል አድራሻ ምንድነው?', 'B3.', 'B3።'),
   ('Why one row per day?', 'ለምን ለእያንዳንዱ ቀን አንድ ረድፍ?', 'Each row is one record, so formulas, sorting and charts work on whole columns.', 'እያንዳንዱ ረድፍ አንድ መዝገብ ነው፤ ስለዚህ ቀመሮች፣ መደርደርና ቻርቶች በሙሉ ዓምዶች ላይ ይሠራሉ።')],
  [stack(B('A tidy table', 'ንጹሕ ሰንጠረዥ'), [N('A1: day · B1: rain_mm', 'A1፡ ቀን · B1፡ rain_mm', 'header row', 'የርዕስ ረድፍ'), N('A2: Mon · B2: 0', 'A2፡ ሰኞ · B2፡ 0'), N('… one row per day …', '… ለእያንዳንዱ ቀን አንድ ረድፍ …'), N('B10: =SUM(B2:B8)', 'B10፡ =SUM(B2:B8)', 'total', 'ድምር')])],
  ex_py('''
rain = {"Mon": 0, "Tue": 12, "Wed": 30, "Thu": 4, "Fri": 0, "Sat": 18, "Sun": 7}   # mm
print("SUM     =", sum(rain.values()))
print("AVERAGE =", round(sum(rain.values()) / len(rain), 1))
print("MAX     =", max(rain.values()), "on", max(rain, key=rain.get))
print("dry days:", [d for d, mm in rain.items() if mm == 0])
''', B('Spreadsheet formulas, the same in Python', 'የስፕሬድሺት ቀመሮች፣ ያው በPython'))),
U(('Charts: tell the story of data', 'ቻርቶች፡ የዳታውን ታሪክ ንገር'), D,
  [('Choose a bar or line chart for the data', 'ለዳታው የአሞሌ ወይም የመስመር ቻርት መምረጥ'), ('Write one sentence that explains the chart', 'ቻርቱን የሚያብራራ አንድ ዓረፍተ ነገር መጻፍ')],
  [('Bar chart for categories, line chart for time', 'ለምድቦች የአሞሌ ቻርት፣ ለጊዜ የመስመር ቻርት'), ('Title, axis labels, units', 'ርዕስ፣ የaxis ምልክቶች፣ መለኪያዎች'), ('A text bar chart in Python', 'በPython የጽሑፍ የአሞሌ ቻርት'), ('Present: what does the chart show?', 'አቅርብ፡ ቻርቱ ምን ያሳያል?')],
  ('Chart your week of rainfall (or class attendance) and present it to the class with one clear sentence and one question it raises.', 'የሳምንት የዝናብ መጠንህን (ወይም የክፍል መገኘትን) ቻርት አድርግና በአንድ ግልጽ ዓረፍተ ነገርና በሚያስነሳው አንድ ጥያቄ ለክፍሉ አቅርበው።'),
  ('Spreadsheet or Python, paper for drawing', 'ስፕሬድሺት ወይም Python፣ ለመሣል ወረቀት'),
  [('What does your chart show?', 'ቻርትህ ምን ያሳያል?', 'Answer in one sentence with a number, for example: "Wednesday had the most rain, 30 mm; two days were dry."', 'በአንድ ዓረፍተ ነገር ከቁጥር ጋር መልስ፣ ለምሳሌ፡ «ረቡዕ ብዙ ዝናብ ነበረው፣ 30 mm፤ ሁለት ቀናት ደረቅ ነበሩ።»'),
   ('When should you use a line chart?', 'የመስመር ቻርት መቼ መጠቀም አለብህ?', 'When the data change over time and the order matters, such as temperature through a day.', 'ዳታው በጊዜ ሂደት ሲለወጥና ቅደም ተከተሉ ሲያስፈልግ፣ እንደ በአንድ ቀን ውስጥ ያለ ሙቀት።')],
  [compare(B('Which chart?', 'የትኛው ቻርት?'), [col(B('Bar chart', 'የአሞሌ ቻርት'), ['compare categories', 'crops, classes, markets'], ['ምድቦችን አወዳድር', 'ሰብሎች፣ ክፍሎች፣ ገበያዎች'], 'good'), col(B('Line chart', 'የመስመር ቻርት'), ['change over time', 'days, months, years'], ['በጊዜ ሂደት ለውጥ', 'ቀናት፣ ወራት፣ ዓመታት'], 'good')])],
  ex_py('''
attendance = {"Mon": 38, "Tue": 40, "Wed": 31, "Thu": 39, "Fri": 36}   # pupils present out of 40
print("Class attendance (out of 40)")
for day, n in attendance.items():
    print(f"{day} | {'#' * n:40s} {n}")
low = min(attendance, key=attendance.get)
print(f"Story: attendance was lowest on {low} ({attendance[low]}); ask why (market day? rain?).")
''', B('A text bar chart and its one-sentence story', 'የጽሑፍ የአሞሌ ቻርትና የአንድ ዓረፍተ ነገር ታሪኩ'))),
]

# ---------------- Grade 7: Lists, files, graphics and the web ----------------
G7 = [
U(('Lists: a class list', 'Lists፡ የክፍል ዝርዝር'), D,
  [('Create, index, add to and remove from lists', 'lists መፍጠር፣ ማመልከት፣ መጨመርና ማስወገድ'), ('Loop over a list and sort it', 'በlist ላይ loop ማድረግና መደርደር')],
  [('names = ["Abebe", "Hana"]; names[0]', 'names = ["Abebe", "Hana"]፤ names[0]'), ('append, remove, len, in', 'append፣ remove፣ len፣ in'), ('for name in names:', 'for name in names:'), ('sorted() and slicing names[1:3]', 'sorted() እና slicing names[1:3]')],
  ('Build a class register: add pupils, mark who is present, and print the absent list in alphabetical order.', 'የክፍል መዝገብ ገንባ፡ ተማሪዎችን ጨምር፣ የተገኙትን ምልክት አድርግ፣ የቀሩትን ዝርዝር በፊደል ቅደም ተከተል አትም።'),
  ('Python', 'Python'),
  [('What is names[0]?', 'names[0] ምንድነው?', 'The first item: Python counts positions from 0.', 'የመጀመሪያው ንጥል፡ Python ቦታዎችን ከ0 ይቆጥራል።'),
   ('How do you check if "Sara" is in the list?', '«Sara» በlistኡ ውስጥ መኖሩን እንዴት ትፈትሻለህ?', 'With "Sara" in names, which gives True or False.', 'በ"Sara" in names፣ True ወይም False ይሰጣል።')],
  [stack(B('A list has positions', 'list ቦታዎች አሉት'), [N('names[0] → "Abebe"', 'names[0] → "Abebe"'), N('names[1] → "Hana"', 'names[1] → "Hana"'), N('names[2] → "Sara"', 'names[2] → "Sara"'), N('len(names) → 3', 'len(names) → 3')])],
  ex_py('''
register = ["Tsion", "Abebe", "Hana", "Dawit", "Sara"]
register.append("Liya")
present = ["Abebe", "Sara", "Liya", "Tsion"]
absent = sorted(name for name in register if name not in present)
print(f"{len(register)} pupils, {len(present)} present")
print("absent (A-Z):", absent)
print("first two on the register:", register[:2])
''', B('Class register', 'የክፍል መዝገብ'))),
U(('Dictionaries: Amharic → English', 'Dictionaries፡ አማርኛ → እንግሊዝኛ'), D,
  [('Store key → value pairs', 'የkey → value ጥንዶችን ማስቀመጥ'), ('Look up, add and loop over a dictionary', 'dictionaryን መፈለግ፣ መጨመርና በላዩ loop ማድረግ')],
  [('words = {"ውሃ": "water"}', 'words = {"ውሃ": "water"}'), ('words["ውሃ"] and words.get(key, default)', 'words["ውሃ"] እና words.get(key, default)'), ('Add and update entries', 'ግቤቶችን ጨምርና አዘምን'), ('Count things with a dictionary', 'በdictionary ነገሮችን ቁጠር')],
  ('Make a 50-word Amharic–English dictionary for one topic (farm, kitchen or school) and a quiz that asks random words.', 'ለአንድ ርዕስ (እርሻ፣ ወጥ ቤት ወይም ትምህርት ቤት) የ50 ቃላት አማርኛ–እንግሊዝኛ dictionary እና የዘፈቀደ ቃላትን የሚጠይቅ quiz ሥራ።'),
  ('Python', 'Python'),
  [('What is the difference between a list and a dictionary?', 'በlist እና በdictionary መካከል ያለው ልዩነት ምንድነው?', 'A list is found by position (0, 1, 2…); a dictionary is found by key ("ውሃ").', 'list በቦታ (0፣ 1፣ 2…) ይገኛል፤ dictionary በkey («ውሃ») ይገኛል።'),
   ('Why use .get() instead of [ ]?', 'ከ[ ] ይልቅ .get() ለምን እንጠቀማለን?', '.get() returns a default when the key is missing instead of crashing with an error.', 'key ሲጎድል በስህተት ከመውደቅ ይልቅ .get() ነባሪ እሴት ይመልሳል።')],
  [flow(B('Look up a word', 'ቃል ፈልግ'), [N('key: "ዳቦ"', 'key፡ «ዳቦ»'), N('words[key]', 'words[key]'), N('value: "bread"', 'value፡ «bread»', hl=True)])],
  ex_py('''
words = {"ውሃ": "water", "ዳቦ": "bread", "ላም": "cow", "እርሻ": "farm"}
words["ጤፍ"] = "teff"                                  # add
print(words["ላም"], "|", words.get("በግ", "not found yet"))
counts = {}
for crop in ["teff", "maize", "teff", "barley", "teff"]:
    counts[crop] = counts.get(crop, 0) + 1            # counting with a dictionary
print(counts)
for am, en in sorted(words.items(), key=lambda kv: kv[1]):
    print(f"{en:6s} = {am}")
''', B('Dictionary lookups and counting', 'የdictionary ፍለጋዎችና ቆጠራ'))),
U(('Files: save and load', 'ፋይሎች፡ ማስቀመጥና መጫን'), D,
  [('Write and read text and CSV files', 'የጽሑፍና የCSV ፋይሎችን መጻፍና ማንበብ'), ('Keep data between program runs', 'በፕሮግራም ሩጫዎች መካከል ዳታን ማቆየት')],
  [('open(), with, "w" and "r"', 'open()፣ with፣ "w" እና "r"'), ('Save game high scores', 'የጨዋታ ከፍተኛ ውጤቶችን አስቀምጥ'), ('CSV files: one line per record', 'CSV ፋይሎች፡ ለእያንዳንዱ መዝገብ አንድ መስመር'), ('UTF-8 for Amharic text', 'ለአማርኛ ጽሑፍ UTF-8')],
  ('Save your dictionary to a CSV file so it can be opened in a spreadsheet, and load it back next lesson.', 'dictionaryህን በስፕሬድሺት እንዲከፈት ወደ CSV ፋይል አስቀምጥ፣ በሚቀጥለው ትምህርት መልሰህ ጫነው።'),
  ('Python', 'Python'),
  [('Why save data in a file?', 'ዳታን በፋይል ለምን እናስቀምጣለን?', 'Variables are lost when the program ends; a file keeps the data for next time and for other programs.', 'ፕሮግራሙ ሲያበቃ variables ይጠፋሉ፤ ፋይል ዳታውን ለሚቀጥለው ጊዜና ለሌሎች ፕሮግራሞች ያቆያል።'),
   ('Why add encoding="utf-8"?', 'encoding="utf-8" ለምን እንጨምራለን?', 'So Amharic characters are saved and read correctly on every computer.', 'የአማርኛ ፊደላት በእያንዳንዱ ኮምፒውተር ላይ በትክክል እንዲቀመጡና እንዲነበቡ።')],
  [flow(B('Data that survives', 'የሚቆይ ዳታ'), [N('Program', 'ፕሮግራም'), N('write words.csv', 'words.csv ጻፍ'), N('Program ends', 'ፕሮግራሙ ያበቃል'), N('Next day: read words.csv', 'በሚቀጥለው ቀን፡ words.csv አንብብ', hl=True)])],
  ex_py('''
import csv, os, tempfile
path = os.path.join(tempfile.gettempdir(), "words.csv")
words = {"ውሃ": "water", "ዳቦ": "bread", "ላም": "cow"}
with open(path, "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f); w.writerow(["amharic", "english"]); w.writerows(words.items())
with open(path, encoding="utf-8") as f:
    print(f.read().strip())
with open(path, encoding="utf-8") as f:
    loaded = {row["amharic"]: row["english"] for row in csv.DictReader(f)}
print("loaded back:", loaded)
''', B('Save a dictionary as CSV and load it again', 'dictionaryን እንደ CSV አስቀምጥና እንደገና ጫን'))),
U(('Turtle graphics: flags and patterns', 'Turtle graphics፡ ባንዲራዎችና ንድፎች'), D,
  [('Draw with turtle commands and loops', 'በturtle ትዕዛዞችና loops መሣል'), ('Use angles to draw regular shapes and stars', 'መደበኛ ቅርጾችንና ኮከቦችን ለመሣል ማዕዘኖችን መጠቀም')],
  [('forward, left, right, penup, color', 'forward፣ left፣ right፣ penup፣ color'), ('Polygons: turn 360 / n', 'ባለብዙ ጎኖች፡ 360 / n ዙር'), ('A 5-pointed star: turn 144', 'ባለ 5 ጫፍ ኮከብ፡ 144 ዙር'), ('A mesob or basket pattern', 'የመሶብ ወይም የሰፌድ ንድፍ')],
  ('Draw a flag with stripes and a star, and a circular basket-weave pattern from repeated shapes.', 'ሰንሰለቶችና ኮከብ ያለው ባንዲራ፣ እንዲሁም ከተደጋገሙ ቅርጾች ክብ የሰፌድ ንድፍ ሣል።'),
  ('Python with turtle (built in)', 'Python ከturtle ጋር (አብሮ የተሠራ)'),
  [('Why does a star use 144 degrees?', 'ኮከብ ለምን 144 ዲግሪ ይጠቀማል?', 'Five turns of 144° add up to 720°, two full turns, which draws the points of the star.', 'አምስት የ144° መዞሪያዎች 720° ይሆናሉ፣ ሁለት ሙሉ ዙሮች፣ ይህም የኮከቡን ጫፎች ይሥላል።'),
   ('How do you draw any regular polygon?', 'ማንኛውንም መደበኛ ባለብዙ ጎን እንዴት ትሥላለህ?', 'Repeat n times: forward(size), left(360 / n).', 'n ጊዜ ድገም፡ forward(size)፣ left(360 / n)።')],
  [compare(B('Turning angles', 'የመዞሪያ ማዕዘኖች'), [col(B('Square', 'ካሬ'), ['4 × 90° = 360°'], ['4 × 90° = 360°']), col(B('Hexagon', 'ባለ ስድስት ጎን'), ['6 × 60° = 360°'], ['6 × 60° = 360°']), col(B('Star', 'ኮከብ'), ['5 × 144° = 720°'], ['5 × 144° = 720°'], 'good')])],
  ex_py('''
import math
def star_points(size=100, turn=144, n=5):
    x, y, heading, pts = 0.0, 0.0, 0.0, [(0.0, 0.0)]
    for _ in range(n):                                # what turtle.forward/right would do
        x += size * math.cos(math.radians(heading)); y += size * math.sin(math.radians(heading))
        heading -= turn; pts.append((round(x, 1) + 0.0, round(y, 1) + 0.0))
    return pts
print("star corners:", star_points())
print("total turning:", 5 * 144, "degrees")
# In class:  import turtle; t = turtle.Turtle()
#            for _ in range(5): t.forward(100); t.right(144)
''', B('The star’s corners, computed the way turtle draws them', 'የኮከቡ ማዕዘኖች፣ turtle በሚሥልበት መንገድ የተሰሉ'), B('turtle opens a drawing window, so here the same path is computed and printed; run the two commented lines in Thonny to see it drawn.', 'turtle የመሣያ መስኮት ይከፍታል፤ ስለዚህ እዚህ ያው መንገድ ተሰልቶ ታትሟል፤ ሲሣል ለማየት በThonny ውስጥ ሁለቱን የአስተያየት መስመሮች አስኪድ።'))),
U(('HTML: your first web page', 'HTML፡ የመጀመሪያ ድረ ገጽህ'), D,
  [('Structure a page with headings, paragraphs, images and links', 'ገጽን በርዕሶች፣ በአንቀጾች፣ በምስሎችና በማገናኛዎች ማዋቀር'), ('Make a 3-page site with navigation', 'ከአሰሳ ጋር ባለ 3 ገጽ ድረ ገጽ መሥራት')],
  [('Tags: <h1>, <p>, <img>, <a>', 'Tags፡ <h1>፣ <p>፣ <img>፣ <a>'), ('Lists and tables in HTML', 'በHTML ውስጥ lists እና ሰንጠረዦች'), ('Links between pages', 'በገጾች መካከል ማገናኛዎች'), ('Alt text for images', 'ለምስሎች alt ጽሑፍ')],
  ('Make a 3-page website about your village: home, farming, and people; link the pages to each other.', 'ስለ መንደርህ ባለ 3 ገጽ ድረ ገጽ ሥራ፡ መነሻ፣ ግብርና እና ሰዎች፤ ገጾቹን እርስ በርሳቸው አገናኛቸው።'),
  ('A text editor and a browser (works offline)', 'የጽሑፍ አርታኢና አሳሽ (ያለ ኢንተርኔት ይሠራል)'),
  [('Which HTML tag makes a link?', 'የትኛው የHTML tag ማገናኛ ይሠራል?', '<a href="farming.html">Farming</a>.', '<a href="farming.html">ግብርና</a>።'),
   ('Why write alt text for an image?', 'ለምስል ለምን alt ጽሑፍ እንጽፋለን?', 'Screen readers read it to blind users, and it shows if the image does not load.', 'የስክሪን አንባቢዎች ለዓይነ ስውራን ተጠቃሚዎች ያነቡታል፤ ምስሉ ካልተጫነም ይታያል።')],
  [tree(B('A 3-page site', 'ባለ 3 ገጽ ድረ ገጽ'), N('index.html', 'index.html'), [{'t': B('farming.html', 'farming.html')}, {'t': B('people.html', 'people.html')}, {'t': B('images/', 'images/'), 'kids': [{'t': B('teff.jpg', 'teff.jpg')}]}])],
  ex_code('HTML', '''
<!DOCTYPE html>
<html lang="am">
<head><meta charset="utf-8"><title>Our village</title></head>
<body>
  <h1>Welcome to Dangila</h1>
  <p>Our village grows teff, maize and potatoes.</p>
  <img src="images/teff.jpg" alt="A teff field ready for harvest" width="300">
  <ul>
    <li><a href="farming.html">Farming</a></li>
    <li><a href="people.html">People</a></li>
  </ul>
</body>
</html>
''', B('index.html', 'index.html'), B('Save as index.html and open it in any browser; no internet needed.', 'እንደ index.html አስቀምጥና በማንኛውም አሳሽ ክፈተው፤ ኢንተርኔት አያስፈልግም።'))),
U(('CSS: style and layout', 'CSS፡ ዘይቤና አቀማመጥ'), D,
  [('Change colours, fonts and spacing with CSS', 'ቀለሞችን፣ ፊደላትንና ክፍተትን በCSS መቀየር'), ('Make a page that works on a phone', 'በስልክ ላይ የሚሠራ ገጽ መሥራት')],
  [('Selectors, properties, values', 'Selectors፣ properties፣ values'), ('Colours and fonts (including Ethiopic fonts)', 'ቀለሞችና ፊደላት (የኢትዮጵያ ፊደላትን ጨምሮ)'), ('The box model: margin, border, padding', 'የሳጥን ሞዴል፡ margin፣ border፣ padding'), ('Flexbox and a phone-friendly layout', 'Flexbox እና ለስልክ ተስማሚ አቀማመጥ')],
  ('Style your village website with one shared style.css: a colour theme, readable fonts, and cards that stack on a phone.', 'የመንደርህን ድረ ገጽ በአንድ የጋራ style.css አስጌጥ፡ የቀለም ገጽታ፣ የሚነበቡ ፊደላት፣ በስልክ ላይ የሚደራረቡ ካርዶች።'),
  ('Text editor, browser, a phone to test', 'የጽሑፍ አርታኢ፣ አሳሽ፣ ለመፈተሽ ስልክ'),
  [('What do margin and padding do?', 'margin እና padding ምን ያደርጋሉ?', 'Padding is space inside the border; margin is space outside it, between boxes.', 'padding ከድንበሩ ውስጥ ያለ ክፍተት ነው፤ margin ከውጭው፣ በሳጥኖች መካከል ያለ ክፍተት ነው።'),
   ('Why put CSS in a separate file?', 'CSSን ለምን በተለየ ፋይል እናስቀምጣለን?', 'All pages share one style, so one change updates the whole site.', 'ሁሉም ገጾች አንድ ዘይቤ ይጋራሉ፤ ስለዚህ አንድ ለውጥ ሙሉውን ድረ ገጽ ያዘምናል።')],
  [stack(B('The box model', 'የሳጥን ሞዴል'), [N('margin', 'margin', 'space outside', 'የውጭ ክፍተት'), N('border', 'border'), N('padding', 'padding', 'space inside', 'የውስጥ ክፍተት'), N('content', 'ይዘት', 'text and images', 'ጽሑፍና ምስሎች')])],
  ex_code('CSS', '''
body { font-family: "Noto Sans Ethiopic", sans-serif; margin: 0; background: #f5f7f2; color: #18221c; }
h1   { background: #1e6b47; color: white; padding: 16px; margin: 0; }
.cards { display: flex; flex-wrap: wrap; gap: 12px; padding: 12px; }
.card  { flex: 1 1 250px; background: white; border: 1px solid #d8ded4; border-radius: 10px; padding: 12px; }
img    { max-width: 100%; height: auto; }          /* images shrink on small phones */
''', B('style.css shared by all pages', 'በሁሉም ገጾች የሚጋራ style.css'), B('Link it in each page’s head: <link rel="stylesheet" href="style.css">.', 'በእያንዳንዱ ገጽ head ውስጥ አገናኘው፡ <link rel="stylesheet" href="style.css">።'))),
]

# ---------------- Grade 8: Modules, errors, APIs, JavaScript and physical computing ----------------
G8 = [
U(('Modules: split a big program', 'Modules፡ ትልቅ ፕሮግራምን መከፋፈል'), D,
  [('Import from the standard library', 'ከstandard library ማስገባት'), ('Split your own code into files and import it', 'የራስህን ኮድ ወደ ፋይሎች ከፍለህ ማስገባት')],
  [('import math, random, datetime', 'import math፣ random፣ datetime'), ('from module import name', 'from module import name'), ('Your own module: farm_tools.py', 'የራስህ module፡ farm_tools.py'), ('if __name__ == "__main__":', 'if __name__ == "__main__":')],
  ('Move your farm functions from Grade 6 into farm_tools.py and import them in a new planting-calendar program.', 'የ6ኛ ክፍል የእርሻ functionsህን ወደ farm_tools.py አንቀሳቅስና በአዲስ የመዝሪያ ቀን መቁጠሪያ ፕሮግራም ውስጥ አስገባቸው።'),
  ('Python', 'Python'),
  [('Why split a program into modules?', 'ፕሮግራምን ለምን ወደ modules እንከፍላለን?', 'Each file has one job, so the code is easier to find, test, reuse and share.', 'እያንዳንዱ ፋይል አንድ ሥራ አለው፤ ስለዚህ ኮዱ ለማግኘት፣ ለመፈተሽ፣ እንደገና ለመጠቀምና ለማጋራት ቀላል ነው።'),
   ('What does datetime help with?', 'datetime በምን ይረዳል?', 'Working with dates: today’s date, adding days, the weekday of a date.', 'ከቀናት ጋር መሥራት፡ የዛሬው ቀን፣ ቀናትን መጨመር፣ የአንድ ቀን የሳምንት ቀን።')],
  [tree(B('A program made of modules', 'ከmodules የተሠራ ፕሮግራም'), N('calendar.py (main)', 'calendar.py (ዋና)'), [{'t': B('import farm_tools', 'import farm_tools'), 'kids': [{'t': B('area(), seed_needed()', 'area()፣ seed_needed()')}]}, {'t': B('import datetime', 'import datetime'), 'kids': [{'t': B('dates and weekdays', 'ቀናትና የሳምንት ቀናት')}]}])],
  ex_py('''
import datetime, math, random
planting = datetime.date(2026, 7, 10)
for crop, days in {"teff": 90, "maize": 120, "barley": 100}.items():
    harvest = planting + datetime.timedelta(days=days)
    print(f"{crop:6s} planted {planting:%d %b}, harvest about {harvest:%d %b %Y} ({harvest:%A})")
print("square root of 2 from math:", round(math.sqrt(2), 4))
random.seed(1); print("random plot to inspect:", random.choice(["A", "B", "C", "D"]))
''', B('A harvest calendar with datetime, math and random', 'በdatetime፣ math እና random የአጨዳ ቀን መቁጠሪያ'))),
U(('try / except: programs that do not crash', 'try / except፡ የማይወድቁ ፕሮግራሞች'), D,
  [('Catch errors with try/except', 'ስህተቶችን በtry/except መያዝ'), ('Validate user input and ask again', 'የተጠቃሚ ግብዓትን ማረጋገጥና እንደገና መጠየቅ')],
  [('Read a traceback: type, message, line', 'traceback አንብብ፡ ዓይነት፣ መልእክት፣ መስመር'), ('ValueError, ZeroDivisionError, KeyError', 'ValueError፣ ZeroDivisionError፣ KeyError'), ('try / except / else / finally', 'try / except / else / finally'), ('Keep asking until the input is valid', 'ግብዓቱ ትክክል እስኪሆን መጠየቅ ቀጥል')],
  ('Make your market calculator crash-proof: it must survive empty input, letters, negative numbers and zero kilos.', 'የገበያ ማስሊያህን የማይወድቅ አድርገው፡ ባዶ ግብዓትን፣ ፊደላትን፣ አሉታዊ ቁጥሮችንና ዜሮ ኪሎዎችን መቋቋም አለበት።'),
  ('Python', 'Python'),
  [('What happens in try/except when an error occurs?', 'በtry/except ውስጥ ስህተት ሲፈጠር ምን ይሆናል?', 'Python stops the try block at the error and runs the matching except block instead of crashing.', 'Python የtry ብሎኩን በስህተቱ ላይ ያቆማል፣ ከመውደቅ ይልቅ ተዛማጁን except ብሎክ ያስኬዳል።'),
   ('Why catch a specific error like ValueError instead of every error?', 'ሁሉንም ስህተት ከመያዝ ይልቅ እንደ ValueError ያለ የተወሰነ ስህተት ለምን እንይዛለን?', 'So real bugs elsewhere are not hidden; you only handle the problem you expect.', 'በሌላ ቦታ ያሉ እውነተኛ ስህተቶች እንዳይደበቁ፤ የምትጠብቀውን ችግር ብቻ ትይዛለህ።')],
  [compare(B('Without and with try/except', 'ያለ እና ከtry/except ጋር'), [col(B('Without', 'ያለ'), ['user types "abc"', 'ValueError → program stops'], ['ተጠቃሚው «abc» ይጽፋል', 'ValueError → ፕሮግራሙ ይቆማል'], 'bad'), col(B('With', 'ከጋር'), ['except ValueError:', 'print a hint, ask again'], ['except ValueError:', 'ፍንጭ አትም፣ እንደገና ጠይቅ'], 'good')])],
  ex_py('''
def read_kilos(text):
    try:
        kilos = float(text)
    except ValueError:
        return None, "please type a number, for example 2.5"
    if kilos <= 0:
        return None, "kilos must be more than 0"
    return kilos, "ok"
for typed in ["2.5", "", "abc", "-3", "0", "4"]:      # in class each comes from input()
    value, message = read_kilos(typed)
    print(f"input {typed!r:6s} -> {message}" + (f" ({value} kg)" if value else ""))
''', B('Validating input without crashing', 'ሳይወድቅ ግብዓትን ማረጋገጥ'))),
U(('APIs: data from the internet', 'APIs፡ ከኢንተርኔት ዳታ'), D,
  [('Explain requests, responses and JSON', 'requestsን፣ responsesን እና JSONን ማብራራት'), ('Read values out of a JSON reply', 'ከJSON መልስ እሴቶችን ማንበብ')],
  [('What an API is: a menu of requests', 'API ምንድነው፡ የጥያቄዎች ምናሌ'), ('URL, parameters and status codes', 'URL፣ parameters እና status codes'), ('JSON: dictionaries and lists as text', 'JSON፡ dictionaries እና lists እንደ ጽሑፍ'), ('Tomorrow’s forecast for your town', 'ለከተማህ የነገው ትንበያ')],
  ('Fetch tomorrow’s rain forecast for your town from a free weather API and print a one-line farming tip.', 'ለከተማህ የነገውን የዝናብ ትንበያ ከነጻ የአየር ሁኔታ API አምጥተህ የአንድ መስመር የእርሻ ምክር አትም።'),
  ('Python with the requests library, internet (or a saved sample reply)', 'Python ከrequests library ጋር፣ ኢንተርኔት (ወይም የተቀመጠ የናሙና መልስ)'),
  [('What is an API?', 'API ምንድነው?', 'A defined way for one program to ask another for data or actions, often over the internet with JSON replies.', 'አንድ ፕሮግራም ሌላውን ዳታ ወይም ተግባር የሚጠይቅበት የተወሰነ መንገድ፣ ብዙውን ጊዜ በኢንተርኔት በJSON መልሶች።'),
   ('What does status code 200 mean?', 'status code 200 ምን ማለት ነው?', 'OK: the request worked and the reply contains the data.', 'እሺ፡ ጥያቄው ሠርቷል፣ መልሱም ዳታውን ይዟል።')],
  [flow(B('Request and response', 'ጥያቄና መልስ'), [N('Your program', 'ፕሮግራምህ'), N('GET …/forecast?lat=11.6&lon=37.4', 'GET …/forecast?lat=11.6&lon=37.4'), N('Weather server', 'የአየር ሁኔታ ሰርቨር'), N('200 OK + JSON', '200 OK + JSON', hl=True)])],
  ex_py('''
import json
reply = """{"place": "Bahir Dar", "daily": {"date": ["2026-11-16", "2026-11-17"],
            "rain_mm": [0.0, 6.4], "t_max": [27.1, 24.3]}}"""      # a saved sample reply
data = json.loads(reply)
d = data["daily"]
rain, t = d["rain_mm"][1], d["t_max"][1]
tip = "good day to plant or top-dress" if 2 <= rain <= 15 else "irrigate if seedlings are wilting" if rain < 2 else "delay fertilizer: heavy rain"
print(f"{data['place']} on {d['date'][1]}: {rain} mm rain, max {t} C -> {tip}")
# Live version:  import requests
# r = requests.get("https://api.open-meteo.com/v1/forecast", params={"latitude": 11.6, "longitude": 37.4,
#                  "daily": "precipitation_sum,temperature_2m_max", "timezone": "auto"}); data = r.json()
''', B('Reading a forecast reply', 'የትንበያ መልስ ማንበብ'), B('The example parses a saved reply so it runs without internet; the commented lines call a real free API.', 'ምሳሌው ያለ ኢንተርኔት እንዲሠራ የተቀመጠ መልስን ይተነትናል፤ የአስተያየት መስመሮቹ እውነተኛ ነጻ APIን ይጠራሉ።'))),
U(('JavaScript: interactive pages', 'JavaScript፡ በይነተገናኝ ገጾች'), D,
  [('Write JavaScript variables, functions and events', 'የJavaScript variablesን፣ functionsን እና ክስተቶችን መጻፍ'), ('Change a web page when a button is clicked', 'ቁልፍ ሲጫን ድረ ገጽን መቀየር')],
  [('let, const, functions, arrays', 'let፣ const፣ functions፣ arrays'), ('The console: test code quickly', 'console፡ ኮድን በፍጥነት ፈትሽ'), ('document.querySelector and textContent', 'document.querySelector እና textContent'), ('addEventListener("click", …)', 'addEventListener("click", …)')],
  ('Add a "word of the day" button to your village website: each click shows a new Amharic word with its English meaning.', 'ለመንደርህ ድረ ገጽ የ«የዕለቱ ቃል» ቁልፍ ጨምር፡ እያንዳንዱ ጠቅታ አዲስ የአማርኛ ቃል ከእንግሊዝኛ ትርጉሙ ጋር ያሳያል።'),
  ('Browser, text editor', 'አሳሽ፣ የጽሑፍ አርታኢ'),
  [('What does addEventListener do?', 'addEventListener ምን ያደርጋል?', 'It runs a function every time an event (such as a click) happens on an element.', 'በአንድ element ላይ ክስተት (እንደ ጠቅታ) በተፈጠረ ቁጥር functionን ያስኬዳል።'),
   ('What is the difference between let and const?', 'በlet እና በconst መካከል ያለው ልዩነት ምንድነው?', 'let can be reassigned later; const cannot.', 'let በኋላ እንደገና ሊመደብ ይችላል፤ const አይችልም።')],
  [flow(B('A button that changes the page', 'ገጹን የሚቀይር ቁልፍ'), [N('click', 'ጠቅታ'), N('event listener', 'event listener'), N('function nextWord()', 'function nextWord()'), N('textContent changes', 'textContent ይቀየራል', hl=True)])],
  ex_js('''
const words = [["ውሃ", "water"], ["ዳቦ", "bread"], ["ላም", "cow"], ["ፀሐይ", "sun"]];
let i = 0;
function nextWord() {                    // in the page this runs on each click
  const [am, en] = words[i % words.length];
  i += 1;
  return `${am} = ${en}`;
}
for (let click = 1; click <= 5; click++) console.log(`click ${click}: ${nextWord()}`);
// In the page:
// document.querySelector("#next").addEventListener("click", () => {
//   document.querySelector("#word").textContent = nextWord();
// });
''', B('Word-of-the-day logic', 'የዕለቱ ቃል ሎጂክ'), B('The logic runs in Node.js here; the commented lines connect it to a button in your page.', 'ሎጂኩ እዚህ በNode.js ይሠራል፤ የአስተያየት መስመሮቹ በገጽህ ካለ ቁልፍ ጋር ያገናኙታል።'))),
U(('How the internet works', 'ኢንተርኔት እንዴት እንደሚሠራ'), D,
  [('Explain IP addresses, DNS, servers and packets', 'IP አድራሻዎችን፣ DNSን፣ ሰርቨሮችንና packetsን ማብራራት'), ('Trace what happens when you open a website', 'ድረ ገጽ ስትከፍት የሚሆነውን መከታተል')],
  [('Clients and servers', 'Clients እና servers'), ('IP addresses and DNS names', 'IP አድራሻዎችና የDNS ስሞች'), ('Packets: messages cut into pieces', 'Packets፡ ወደ ቁርጥራጮች የተቆረጡ መልእክቶች'), ('Unplugged: pass packets around the class', 'ያለ ኮምፒውተር፡ packetsን በክፍሉ ዙሪያ አስተላልፉ')],
  ('Unplugged network: cut a message into numbered paper packets, pass them through "routers" (pupils) by different paths, and rebuild it at the destination.', 'ያለ ኮምፒውተር ኔትወርክ፡ መልእክትን ወደ ቁጥር የተሰጣቸው የወረቀት packets ቁረጥ፣ በተለያዩ መንገዶች በ«routers» (ተማሪዎች) በኩል አስተላልፍ፣ በመድረሻው እንደገና ገንባው።'),
  ('Paper slips, pens', 'የወረቀት ቁርጥራጮች፣ እስክሪብቶዎች'),
  [('What does DNS do?', 'DNS ምን ያደርጋል?', 'It turns a name like example.org into the IP address the computer needs, like a phone book.', 'እንደ example.org ያለ ስምን ኮምፒውተሩ ወደሚፈልገው IP አድራሻ ይቀይራል፣ እንደ ስልክ ማውጫ።'),
   ('Why number the packets?', 'packetsን ለምን ቁጥር እንሰጣቸዋለን?', 'They can arrive out of order by different paths; numbers let the receiver rebuild the message and ask for missing ones.', 'በተለያዩ መንገዶች ያለ ቅደም ተከተል ሊደርሱ ይችላሉ፤ ቁጥሮች ተቀባዩ መልእክቱን እንደገና እንዲገነባና የጎደሉትን እንዲጠይቅ ያስችላሉ።')],
  [flow(B('Opening a website', 'ድረ ገጽ መክፈት'), [N('Type the name', 'ስሙን ጻፍ'), N('DNS → IP address', 'DNS → IP አድራሻ'), N('Packets travel via routers', 'packets በrouters በኩል ይጓዛሉ'), N('Server replies with the page', 'ሰርቨሩ በገጹ ይመልሳል', hl=True)])],
  ex_py('''
import random
message = "MEET AT THE MARKET AT NINE"
packets = [(i, message[i * 5:(i + 1) * 5]) for i in range((len(message) + 4) // 5)]   # number + piece
random.seed(3); random.shuffle(packets)                                             # different routes
print("arrived:", packets)
print("rebuilt:", "".join(piece for _, piece in sorted(packets)))
''', B('Packets arrive out of order and are rebuilt', 'packets ያለ ቅደም ተከተል ደርሰው እንደገና ይገነባሉ'))),
U(('Physical computing: a soil-moisture logger', 'Physical computing፡ የአፈር እርጥበት መዝጋቢ'), D,
  [('Read a sensor with a low-cost board', 'በርካሽ ቦርድ ሴንሰር ማንበብ'), ('Calibrate a sensor and log readings to a file', 'ሴንሰርን ማስተካከልና ንባቦችን በፋይል መመዝገብ')],
  [('Arduino or Raspberry Pi: what each is good at', 'Arduino ወይም Raspberry Pi፡ እያንዳንዱ በምን ጥሩ ነው'), ('Wire a soil-moisture sensor safely', 'የአፈር እርጥበት ሴንሰርን በደህንነት አገናኝ'), ('Calibrate: dry soil vs wet soil', 'አስተካክል፡ ደረቅ አፈር vs እርጥብ አፈር'), ('Log with time, power with a solar bank', 'ከጊዜ ጋር መዝግብ፣ በፀሐይ ባንክ አንቀሳቅስ')],
  ('Build the smart garden monitor for the school garden: log moisture every 30 minutes and show "water now" when dry.', 'ለትምህርት ቤቱ የአትክልት ቦታ ብልህ መከታተያውን ገንባ፡ በየ30 ደቂቃው እርጥበትን መዝግብ፣ ሲደርቅ «አሁን አጠጣ» አሳይ።'),
  ('Arduino Uno or Raspberry Pi Pico, capacitive soil sensor, jumper wires, solar power bank', 'Arduino Uno ወይም Raspberry Pi Pico፣ capacitive የአፈር ሴንሰር፣ የመገናኛ ሽቦዎች፣ የፀሐይ ኃይል ባንክ'),
  [('How does your sensor decide the soil is dry?', 'ሴንሰርህ አፈሩ ደረቅ መሆኑን እንዴት ይወስናል?', 'It compares the reading with a threshold set from your own dry and wet measurements.', 'ንባቡን ከራስህ የደረቅና የእርጥብ ልኬቶች ከተዘጋጀ ወሰን ጋር ያወዳድራል።'),
   ('Why calibrate instead of using the number from the internet?', 'ከኢንተርኔት ያገኘኸውን ቁጥር ከመጠቀም ይልቅ ለምን እናስተካክላለን?', 'Every sensor and every soil type reads differently.', 'እያንዳንዱ ሴንሰርና እያንዳንዱ የአፈር ዓይነት በተለየ ሁኔታ ያነባል።')],
  [flow(B('From soil to decision', 'ከአፈር ወደ ውሳኔ'), [N('Sensor', 'ሴንሰር', 'raw 0–1023', 'ጥሬ 0–1023'), N('Calibrate', 'አስተካክል', 'dry = 0%, wet = 100%', 'ደረቅ = 0%፣ እርጥብ = 100%'), N('Log', 'መዝግብ', 'time, %', 'ጊዜ፣ %'), N('Below 30% → water', 'ከ30% በታች → አጠጣ', hl=True)])],
  ex_py('''
DRY_RAW, WET_RAW = 820, 380          # measured with the sensor in dry soil and in just-watered soil
def to_percent(raw):
    pct = 100 * (DRY_RAW - raw) / (DRY_RAW - WET_RAW)
    return max(0, min(100, round(pct)))
log = [("06:00", 450), ("09:00", 520), ("12:00", 640), ("15:00", 715), ("18:00", 702)]
for time, raw in log:
    p = to_percent(raw)
    print(f"{time}  raw {raw}  moisture {p:3d}%  {'WATER NOW' if p < 30 else 'ok'}")
''', B('Calibrated moisture readings', 'የተስተካከሉ የእርጥበት ንባቦች'), B('Capacitive sensors read higher numbers when drier, so the formula is reversed; check yours.', 'Capacitive ሴንሰሮች ሲደርቁ ከፍ ያሉ ቁጥሮችን ያነባሉ፤ ስለዚህ ቀመሩ ተገልብጧል፤ የአንተን ፈትሽ።'))),
]
emit_units(2, [G5, G6, G7, G8])
print('level 2 units written')
