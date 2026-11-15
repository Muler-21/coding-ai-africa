from mlib import *

# ============================ LEVEL 0: Little Coders ============================
L0 = []
# 0.1 Sequences
L0.append({
 'why': B('A computer only does exactly what we say, in the order we say it.', 'ኮምፒውተር የምንለውን ብቻ፣ በምንለው ቅደም ተከተል ብቻ ያደርጋል።'),
 'dg': [
  grid(B('Arrow cards move the robot home', 'የቀስት ካርዶች ሮቦቱን ወደ ቤት ያንቀሳቅሳሉ'), 4, [3, 0, 'N'], [0, 3], 'FFFRFFF',
       note=B('Each card is one step. The robot (orange) follows the cards from 1 to 7 and reaches the house.', 'እያንዳንዱ ካርድ አንድ እርምጃ ነው። ሮቦቱ (ብርቱካናማ) ካርዶቹን ከ1 እስከ 7 ይከተላል፣ ቤቱም ይደርሳል።')),
  flow(B('Order matters: making tea', 'ቅደም ተከተል አስፈላጊ ነው፡ ሻይ ማፍላት'),
       [N('1. Pour water', '1. ውሃ ጨምር'), N('2. Boil it', '2. አፍላው'), N('3. Add tea leaves', '3. የሻይ ቅጠል ጨምር'), N('4. Pour into a cup', '4. በሲኒ ቅዳ', hl=True)],
       note=B('Swap steps 1 and 2 and you boil an empty pot. A program is the same: the order changes the result.', 'ደረጃ 1 እና 2ን ብታቀያይር ባዶ ድስት ታፈላለህ። ፕሮግራምም እንዲሁ ነው፡ ቅደም ተከተሉ ውጤቱን ይቀይራል።'))],
 'ex': ex_steps(B('Play "Robot teacher" (10 minutes)', '«ሮቦት አስተማሪ» ተጫወቱ (10 ደቂቃ)'),
   ['Chalk a 4×4 grid and put a "house" stone in one corner.', 'One child is the robot. It may only do what a card says.', 'The class lays out arrow cards in a line: ↑ ↑ ↑ ↻ ↑ ↑ ↑.', 'Read the cards aloud one by one; the robot moves one square per ↑ card.', 'Did the robot reach the house? If not, which card is wrong?'],
   ['በመሬት ላይ 4×4 ፍርግርግ በጠመኔ ሣሉ፣ በአንድ ጥግ «ቤት» ድንጋይ አስቀምጡ።', 'አንድ ልጅ ሮቦት ይሆናል። ካርዱ የሚለውን ብቻ ማድረግ ይችላል።', 'ክፍሉ የቀስት ካርዶችን በመስመር ያስቀምጣል፡ ↑ ↑ ↑ ↻ ↑ ↑ ↑።', 'ካርዶቹን አንድ በአንድ ጮክ ብላችሁ አንብቡ፤ ሮቦቱ ለእያንዳንዱ ↑ ካርድ አንድ ካሬ ይንቀሳቀሳል።', 'ሮቦቱ ቤቱ ደረሰ? ካልደረሰ የትኛው ካርድ ስህተት ነው?']),
 'qa': B(['The result changes. The robot goes the wrong way, or the tea is made wrong.', 'Yes: for example forward, forward, turn right, forward, forward. Test it by walking it.', 'The child who acts as the robot: it follows the instructions exactly, like a computer.'],
         ['ውጤቱ ይቀየራል። ሮቦቱ በተሳሳተ መንገድ ይሄዳል፣ ወይም ሻዩ በስህተት ይሠራል።', 'አዎ፡ ለምሳሌ ወደ ፊት፣ ወደ ፊት፣ ወደ ቀኝ ዙር፣ ወደ ፊት፣ ወደ ፊት። በመራመድ ፈትሸው።', 'ሮቦት የሆነው ልጅ ነው፡ እንደ ኮምፒውተር መመሪያዎቹን በትክክል ይከተላል።'])})
# 0.2 Patterns
L0.append({
 'why': B('Spotting a pattern lets us describe many things with one short rule.', 'ንድፍ (pattern) ማየት ብዙ ነገሮችን በአንድ አጭር ሕግ እንድንገልጽ ያስችለናል።'),
 'dg': [flow(B('A repeating pattern and its rule', 'የሚደጋገም ንድፍና ሕጉ'),
             [N('👏 clap', '👏 ማጨብጨብ'), N('🦶 stomp', '🦶 መርገጥ'), N('👏 clap', '👏 ማጨብጨብ'), N('🦶 stomp', '🦶 መርገጥ'), N('? next', '? ቀጣዩ', 'clap', 'ማጨብጨብ', hl=True)],
             loop=B('Rule: clap, stomp, and repeat', 'ሕግ፡ አጨብጭብ፣ እርገጥ፣ ደግመህ')),
        compare(B('Find the mistake in the bead pattern', 'በዶቃ ንድፉ ውስጥ ስህተቱን ፈልግ'),
                [col(B('Correct', 'ትክክል'), ['🔴 ⚪ 🔴 ⚪ 🔴 ⚪', 'Rule: red, white, repeat'], ['🔴 ⚪ 🔴 ⚪ 🔴 ⚪', 'ሕግ፡ ቀይ፣ ነጭ፣ ደግም'], 'good'),
                 col(B('One bead is wrong', 'አንድ ዶቃ ስህተት ነው'), ['🔴 ⚪ 🔴 🔴 🔴 ⚪', 'Bead 4 breaks the rule'], ['🔴 ⚪ 🔴 🔴 🔴 ⚪', 'ዶቃ 4 ሕጉን ይጥሳል'], 'bad')])],
 'ex': ex_steps(B('Make a seed necklace pattern', 'የዘር ሐብል ንድፍ ሥራ'),
   ['Choose two kinds of seeds or bottle tops (for example red beans and white maize).', 'Decide a rule, such as "2 red, 1 white".', 'Thread 12 items following the rule.', 'Swap with a friend: they must say your rule out loud.', 'Hide one mistake and ask them to find it.'],
   ['ሁለት ዓይነት ዘሮች ወይም የጠርሙስ ክዳኖች ምረጥ (ለምሳሌ ቀይ ባቄላና ነጭ በቆሎ)።', 'ሕግ ወስን፣ ለምሳሌ «2 ቀይ፣ 1 ነጭ»።', 'ሕጉን ተከትለህ 12 ነገሮችን በክር አስገባ።', 'ከጓደኛህ ጋር ተቀያየሩ፡ ሕግህን ጮክ ብሎ መናገር አለበት።', 'አንድ ስህተት ደብቅና እንዲያገኘው ጠይቀው።']),
 'qa': B(['Stomp. The pattern is clap, stomp, clap, stomp…', 'Say what repeats, for example "red, white, then start again".', 'Basket and mesob weaving, netela borders, floor tiles, songs and the days of the week.'],
         ['መርገጥ። ንድፉ አጨብጭብ፣ እርገጥ፣ አጨብጭብ፣ እርገጥ… ነው።', 'የሚደጋገመውን ተናገር፣ ለምሳሌ «ቀይ፣ ነጭ፣ ከዚያ እንደገና»።', 'የሰፌድና የመሶብ ስራ፣ የነጠላ ጥለት፣ የወለል ንጣፎች፣ ዘፈኖችና የሳምንቱ ቀናት።'])})
# 0.3 Directions and grids
L0.append({
 'why': B('Grids and directions are how robots, maps and games describe where things are.', 'ፍርግርጎችና አቅጣጫዎች ሮቦቶች፣ ካርታዎችና ጨዋታዎች ነገሮች የት እንዳሉ የሚገልጹበት መንገድ ናቸው።'),
 'dg': [grid(B('Go around the wall to the treasure', 'ግድግዳውን ዞረህ ወደ ሀብቱ ሂድ'), 5, [4, 0, 'E'], [0, 4], 'FLFFFRFFFLF', walls=[[4, 2], [3, 2], [2, 2]],
             note=B('Grey squares are a wall. A turn card changes direction but does not move the robot.', 'ግራጫ ካሬዎች ግድግዳ ናቸው። የመዞሪያ ካርድ አቅጣጫ ይቀይራል እንጂ ሮቦቱን አያንቀሳቅስም።')),
        compare(B('Two kinds of instructions', 'ሁለት ዓይነት መመሪያዎች'),
                [col(B('Move', 'መንቀሳቀስ'), ['↑ forward one square'], ['↑ አንድ ካሬ ወደ ፊት'], 'good'),
                 col(B('Turn (stay on the square)', 'መዞር (በካሬው ላይ መቆየት)'), ['↻ turn right', '↺ turn left'], ['↻ ወደ ቀኝ ዙር', '↺ ወደ ግራ ዙር'])])],
 'ex': ex_steps(B('Treasure-map game', 'የሀብት ካርታ ጨዋታ'),
   ['Draw a 5×5 grid on paper; mark START and hide a "treasure" square.', 'Draw the arrows a friend must follow.', 'The friend walks the chalk grid using only your arrows.', 'Count the steps: could a shorter path work?'],
   ['በወረቀት ላይ 5×5 ፍርግርግ ሣል፤ መነሻን ምልክት አድርግና የ«ሀብት» ካሬ ደብቅ።', 'ጓደኛህ መከተል ያለበትን ቀስቶች ሣል።', 'ጓደኛው ቀስቶችህን ብቻ በመጠቀም በጠመኔ ፍርግርጉ ላይ ይራመዳል።', 'እርምጃዎቹን ቁጠር፡ አጭር መንገድ ይሠራ ነበር?']),
 'qa': B(['The hand you do not write with for most people; check by holding up the hand that makes an "L" shape with thumb and finger.', 'Count the squares along the path, one step per square, plus any turns you need.', 'Yes: draw one arrow for every square you move, and a turn arrow where the path changes direction.'],
         ['ለአብዛኞቹ ሰዎች የማይጽፉበት እጅ ነው፤ በአውራ ጣትና በጣት «L» ቅርጽ የሚሠራውን እጅ ከፍ በማድረግ አረጋግጥ።', 'በመንገዱ ላይ ያሉትን ካሬዎች ቁጠር፣ ለአንድ ካሬ አንድ እርምጃ፣ የሚያስፈልጉ መዞሪያዎችንም ጨምር።', 'አዎ፡ ለምትንቀሳቀስበት እያንዳንዱ ካሬ አንድ ቀስት፣ መንገዱ አቅጣጫ በሚቀይርበት ደግሞ የመዞሪያ ቀስት ሣል።'])})
# 0.4 Loops
L0.append({
 'why': B('A loop repeats steps, so long programs become short and easy to check.', 'loop (ድግግሞሽ) እርምጃዎችን ይደግማል፤ ስለዚህ ረጅም ፕሮግራሞች አጭርና ለመፈተሽ ቀላል ይሆናሉ።'),
 'dg': [compare(B('Same path, fewer cards', 'ያው መንገድ፣ ያነሱ ካርዶች'),
                [col(B('Without a loop: 6 cards', 'ያለ loop፡ 6 ካርዶች'), ['↑', '↑', '↑', '↑', '↑', '↑'], ['↑', '↑', '↑', '↑', '↑', '↑'], 'bad'),
                 col(B('With a loop: 2 cards', 'ከloop ጋር፡ 2 ካርዶች'), ['🔁 repeat 6 times', '   ↑'], ['🔁 6 ጊዜ ድገም', '   ↑'], 'good')],
                verdict=B('The repeat card saved 4 cards, and the robot does exactly the same thing.', 'የድገም ካርዱ 4 ካርዶችን አዳነ፤ ሮቦቱም በትክክል ያንኑ ያደርጋል።')),
        cycle(B('Drawing a square with a loop', 'በloop ካሬ መሣል'),
              [N('↑ ↑ forward 2', '↑ ↑ 2 ወደ ፊት'), N('↻ turn right', '↻ ወደ ቀኝ ዙር')], loop=B('repeat 4 times → a square', '4 ጊዜ ድገም → ካሬ'))],
 'ex': ex_steps(B('Loop race', 'የloop ውድድር'),
   ['Write a long path with arrow cards, for example 8 forwards.', 'Rewrite it with a repeat card.', 'Walk both versions on the grid: do they end in the same place?', 'Count the cards saved. The team that saves the most wins.'],
   ['በቀስት ካርዶች ረጅም መንገድ ጻፉ፣ ለምሳሌ 8 ወደ ፊት።', 'በድገም ካርድ እንደገና ጻፉት።', 'ሁለቱንም በፍርግርጉ ላይ ተራመዱ፡ በአንድ ቦታ ያልቃሉ?', 'የዳኑትን ካርዶች ቁጠሩ። ብዙ ያዳነው ቡድን ያሸንፋል።']),
 'qa': B(['Count the cards before and after; for 6 forwards the repeat card saved 4 cards.', 'Do the steps inside the repeat four times, one after the other.', 'Yes: a chorus that is sung again after each verse is a loop.'],
         ['ከዚያ በፊትና በኋላ ያሉትን ካርዶች ቁጠር፤ ለ6 ወደ ፊት የድገም ካርዱ 4 ካርዶችን አድኗል።', 'በድገሙ ውስጥ ያሉትን እርምጃዎች አራት ጊዜ በተከታታይ አድርግ።', 'አዎ፡ ከእያንዳንዱ አንጓ በኋላ እንደገና የሚዘመር አዝማች loop ነው።'])})
# 0.5 Debugging
L0.append({
 'why': B('Every programmer makes mistakes. Finding and fixing them, calmly, is a skill.', 'እያንዳንዱ ፕሮግራመር ስህተት ይሠራል። በእርጋታ ማግኘትና ማስተካከል ክህሎት ነው።'),
 'dg': [grid(B('This program has a bug', 'ይህ ፕሮግራም ስህተት አለው'), 4, [3, 0, 'N'], [0, 3], 'FFRFFF',
             note=B('The robot turns one square too early. Fix: add one more ↑ before the ↻ card.', 'ሮቦቱ አንድ ካሬ ቀድሞ ይዞራል። ማስተካከያ፡ ከ↻ ካርዱ በፊት አንድ ተጨማሪ ↑ ጨምር።')),
        cycle(B('The debugging loop', 'የስህተት ማረሚያ ዑደት'),
              [N('Test', 'ፈትሽ', 'walk the path', 'መንገዱን ተራመድ'), N('Find', 'ፈልግ', 'where did it go wrong?', 'የት ተሳሳተ?'), N('Fix', 'አስተካክል', 'change one card', 'አንድ ካርድ ቀይር'), N('Test again', 'እንደገና ፈትሽ', hl=True)],
              loop=B('until the robot gets home', 'ሮቦቱ ቤት እስኪደርስ'))],
 'ex': ex_steps(B('Fix the broken robot above', 'ከላይ ያለውን የተበላሸ ሮቦት አስተካክል'),
   ['Walk the cards ↑ ↑ ↻ ↑ ↑ ↑ on the grid. Where does the robot stop?', 'Point to the first step where the robot leaves the right path: the turn comes too early.', 'Add one ↑ card before the ↻ card: ↑ ↑ ↑ ↻ ↑ ↑ ↑.', 'Walk it again: now the robot reaches the house.'],
   ['ካርዶቹን ↑ ↑ ↻ ↑ ↑ ↑ በፍርግርጉ ላይ ተራመድ። ሮቦቱ የት ይቆማል?', 'ሮቦቱ ከትክክለኛው መንገድ የሚወጣበትን የመጀመሪያ እርምጃ አመልክት፡ መዞሪያው ቀድሞ ይመጣል።', 'ከ↻ ካርዱ በፊት አንድ ↑ ካርድ ጨምር፡ ↑ ↑ ↑ ↻ ↑ ↑ ↑።', 'እንደገና ተራመድ፡ አሁን ሮቦቱ ቤቱ ይደርሳል።']),
 'qa': B(['A mistake in the instructions that makes the program do the wrong thing.', 'By walking the path step by step and stopping at the first step that went wrong.', 'Test again, to check the fix works and did not break anything else.'],
         ['ፕሮግራሙ የተሳሳተ ነገር እንዲያደርግ የሚያደርግ በመመሪያዎቹ ውስጥ ያለ ስህተት።', 'መንገዱን እርምጃ በእርምጃ በመራመድና የተሳሳተው የመጀመሪያ እርምጃ ላይ በመቆም።', 'ማስተካከያው መሥራቱንና ሌላ ነገር አለማበላሸቱን ለማረጋገጥ እንደገና መፈተሽ።'])})
# 0.6 First screen coding
L0.append({
 'why': B('The same ideas (order, loops, fixing) now work on a screen with picture blocks.', 'ያው ሐሳቦች (ቅደም ተከተል፣ ድግግሞሽ፣ ማስተካከል) አሁን በሥዕል ብሎኮች በስክሪን ላይ ይሠራሉ።'),
 'dg': [blocks(B('A first ScratchJr-style program', 'የመጀመሪያ የScratchJr ዓይነት ፕሮግራም'),
               [bk('🚩 When green flag tapped', '🚩 አረንጓዴው ባንዲራ ሲነካ', 'event'), bk('➡ Move right 4', '➡ ወደ ቀኝ 4 ሂድ', 'motion'),
                bk('💬 Say "Selam! Hello!"', '💬 «ሰላም! Hello!» በል', 'looks'), bk('⬆ Jump 2', '⬆ 2 ዝለል', 'motion'), bk('⏹ End', '⏹ መጨረሻ', 'control')],
               note=B('Blocks snap together from left to right (here top to bottom). The flag block starts the program.', 'ብሎኮች ከግራ ወደ ቀኝ (እዚህ ከላይ ወደ ታች) ይገጣጠማሉ። የባንዲራው ብሎክ ፕሮግራሙን ይጀምራል።')),
        flow(B('From play to screen', 'ከጨዋታ ወደ ስክሪን'), [N('Arrow cards on the floor', 'በወለሉ ላይ የቀስት ካርዶች'), N('Blocks on a tablet', 'በታብሌት ላይ ብሎኮች'), N('Character moves', 'ገጸ ባሕሪው ይንቀሳቀሳል', hl=True)])],
 'ex': ex_steps(B('Group program: one block each', 'የቡድን ፕሮግራም፡ ለእያንዳንዱ አንድ ብሎክ'),
   ['Groups of three share one tablet or phone with ScratchJr.', 'Child 1 adds the green-flag block.', 'Child 2 adds a move block; child 3 adds a say block with a greeting in Amharic and English.', 'Tap the flag. Did the character do what you planned? Fix one block if not.', 'Screen time ends after 15 minutes; talk about what you made.'],
   ['ሦስት ልጆች ያሉት ቡድን ScratchJr ያለው አንድ ታብሌት ወይም ስልክ ይጋራል።', 'ልጅ 1 የአረንጓዴ ባንዲራ ብሎክ ይጨምራል።', 'ልጅ 2 የመንቀሳቀሻ ብሎክ ይጨምራል፤ ልጅ 3 በአማርኛና በእንግሊዝኛ ሰላምታ ያለው የመናገሪያ ብሎክ ይጨምራል።', 'ባንዲራውን ንኩ። ገጸ ባሕሪው ያቀዳችሁትን አደረገ? ካላደረገ አንድ ብሎክ አስተካክሉ።', 'የስክሪን ጊዜ ከ15 ደቂቃ በኋላ ያበቃል፤ ስለሠራችሁት ተነጋገሩ።']),
 'qa': B(['A blue motion block, such as move right or jump.', 'By tapping the green flag (or the start block at the beginning).', 'Whatever was typed in the say block, for example "Selam! Hello!".'],
         ['ሰማያዊ የመንቀሳቀሻ ብሎክ፣ ለምሳሌ ወደ ቀኝ ሂድ ወይም ዝለል።', 'አረንጓዴውን ባንዲራ (ወይም በመጀመሪያ ያለውን የመጀመሪያ ብሎክ) በመንካት።', 'በመናገሪያ ብሎኩ የተጻፈው ነገር፣ ለምሳሌ «ሰላም! Hello!»።'])})
# 0.7 Floor robots
L0.append({
 'why': B('Planning before moving is what engineers do: think, write the plan, then test it.', 'ከመንቀሳቀስ በፊት ማቀድ መሐንዲሶች የሚያደርጉት ነው፡ አስብ፣ ዕቅዱን ጻፍ፣ ከዚያ ፈትሸው።'),
 'dg': [grid(B('Go around the stone', 'ድንጋዩን ዞረህ ሂድ'), 4, [3, 0, 'E'], [3, 3], 'FLFRFFRF', walls=[[3, 2]],
             note=B('The stone blocks the straight path, so the robot goes up, across and down again.', 'ድንጋዩ ቀጥታውን መንገድ ስለሚዘጋ ሮቦቱ ወደ ላይ፣ ወደ ጎን፣ ከዚያ እንደገና ወደ ታች ይሄዳል።')),
        flow(B('Plan, program, run, check', 'አቅድ፣ ፕሮግራም አድርግ፣ አስኪድ፣ ፈትሽ'),
             [N('Plan on paper', 'በወረቀት አቅድ'), N('Lay the cards', 'ካርዶቹን አስቀምጥ'), N('Move the robot', 'ሮቦቱን አንቀሳቅስ'), N('Did it arrive?', 'ደረሰ?', hl=True)], loop=B('if not, fix and run again', 'ካልደረሰ አስተካክልና እንደገና አስኪድ'))],
 'ex': ex_steps(B('Build a cardboard robot', 'የካርቶን ሮቦት ሥራ'),
   ['Cut a box, draw a face, and draw a big arrow showing which way it faces.', 'Put a stone on the grid as an obstacle.', 'Plan the path on paper with arrows.', 'One child reads the cards aloud; another moves the robot exactly as told.', 'If you have a Bee-Bot, press the same steps on its buttons and compare.'],
   ['ሳጥን ቁረጥ፣ ፊት ሣል፣ ወዴት እንደሚመለከት የሚያሳይ ትልቅ ቀስት ሣል።', 'በፍርግርጉ ላይ እንደ እንቅፋት ድንጋይ አስቀምጥ።', 'መንገዱን በወረቀት ላይ በቀስቶች አቅድ።', 'አንድ ልጅ ካርዶቹን ጮክ ብሎ ያነባል፤ ሌላው ሮቦቱን በተባለው መሠረት ያንቀሳቅሳል።', 'Bee-Bot ካለህ ያንኑ እርምጃዎች በቁልፎቹ ተጭነህ አወዳድር።']),
 'qa': B(['The path, drawn as arrows, before touching the robot.', 'By turning before the stone, moving past it, and turning back.', 'One card: usually a missing forward, or a left turn that should be right.'],
         ['ሮቦቱን ከመንካት በፊት በቀስቶች የተሣለ መንገድ።', 'ከድንጋዩ በፊት በመዞር፣ አልፎ በመሄድና መልሶ በመዞር።', 'አንድ ካርድ፡ ብዙውን ጊዜ የጎደለ ወደ ፊት ወይም ቀኝ መሆን የነበረበት የግራ መዞሪያ።'])})
# 0.8 Sort and classify
L0.append({
 'why': B('Sorting by rules is how we organise data, and how computers learn to recognise things.', 'በሕግ መደርደር ዳታን የምናደራጅበትና ኮምፒውተሮች ነገሮችን ለመለየት የሚማሩበት መንገድ ነው።'),
 'dg': [tree(B('Sorting a fruit basket with two rules', 'የፍራፍሬ ቅርጫትን በሁለት ሕጎች መደርደር'), N('Basket', 'ቅርጫት'),
             [{'t': B('Red?  yes', 'ቀይ? አዎ'), 'kids': [{'t': B('Round: tomato, apple', 'ክብ፡ ቲማቲም፣ ፖም')}, {'t': B('Not round: red pepper', 'ክብ ያልሆነ፡ ቀይ ቃሪያ')}]},
              {'t': B('Red?  no', 'ቀይ? አይደለም'), 'kids': [{'t': B('Round: orange, lemon', 'ክብ፡ ብርቱካን፣ ሎሚ')}, {'t': B('Not round: banana', 'ክብ ያልሆነ፡ ሙዝ')}]}],
             note=B('This is a decision tree: the same idea a phone uses to tell a cat from a dog after seeing many examples.', 'ይህ decision tree ነው፡ ስልክ ብዙ ምሳሌዎችን ካየ በኋላ ድመትን ከውሻ ለመለየት የሚጠቀምበት ያው ሐሳብ።')),
        stack(B('Picture chart: how many of each?', 'የሥዕል ቻርት፡ ከእያንዳንዱ ስንት?'),
              [N('🍅🍅🍅 red: 3', '🍅🍅🍅 ቀይ፡ 3'), N('🍊🍊 orange: 2', '🍊🍊 ብርቱካናማ፡ 2'), N('🍌🍌🍌🍌 yellow: 4', '🍌🍌🍌🍌 ቢጫ፡ 4')])],
 'ex': ex_steps(B('Market sorting game', 'የገበያ መደርደሪያ ጨዋታ'),
   ['Bring a basket of local fruit and vegetables.', 'Sort by colour into groups on the floor.', 'Count each group and draw one picture per item on a chart.', 'Sort the same basket again by a new rule (size, or fruit vs vegetable).', 'Ask: which rule did a friend use? Can they guess yours?'],
   ['የአካባቢ ፍራፍሬና አትክልት ቅርጫት አምጡ።', 'በወለሉ ላይ በቀለም በቡድን ደርድሩ።', 'እያንዳንዱን ቡድን ቁጠሩና በቻርቱ ላይ ለእያንዳንዱ ነገር አንድ ሥዕል ሣሉ።', 'ያንኑ ቅርጫት በአዲስ ሕግ (በመጠን፣ ወይም ፍራፍሬ vs አትክልት) እንደገና ደርድሩ።', 'ጠይቁ፡ ጓደኛ የትኛውን ሕግ ተጠቀመ? የእናንተን መገመት ይችላሉ?']),
 'qa': B(['By one rule, for example colour: all red ones together.', 'Yes: by size, by shape, or fruit versus vegetable. The same things can be sorted many ways.', 'Count the red group on the picture chart (in the example, 3).'],
         ['በአንድ ሕግ፣ ለምሳሌ በቀለም፡ ሁሉም ቀዮቹ በአንድ ላይ።', 'አዎ፡ በመጠን፣ በቅርጽ፣ ወይም ፍራፍሬ ከአትክልት። ያው ነገሮች በብዙ መንገዶች ሊደረደሩ ይችላሉ።', 'በሥዕል ቻርቱ ላይ ያለውን ቀዩን ቡድን ቁጠር (በምሳሌው 3)።'])})
# 0.9 Tell a story
L0.append({
 'why': B('A story is a program too: characters, events and an order with a beginning, middle and end.', 'ታሪክም ፕሮግራም ነው፡ ገጸ ባሕሪያት፣ ክስተቶችና መጀመሪያ፣ መካከልና መጨረሻ ያለው ቅደም ተከተል።'),
 'dg': [flow(B('Three scenes, like three boxes', 'ሦስት ትዕይንቶች፣ እንደ ሦስት ሳጥኖች'),
             [N('Scene 1: Beginning', 'ትዕይንት 1፡ መጀመሪያ', 'who and where: a clever hare by the river', 'ማን እና የት፡ በወንዝ ዳር ያለች ብልህ ጥንቸል'),
              N('Scene 2: Middle', 'ትዕይንት 2፡ መካከል', 'something happens: a lion wants lunch', 'አንድ ነገር ይሆናል፡ አንበሳ ምሳ ይፈልጋል'),
              N('Scene 3: End', 'ትዕይንት 3፡ መጨረሻ', 'how it ends: the hare tricks the lion', 'እንዴት ያበቃል፡ ጥንቸሏ አንበሳውን ታታልላለች', hl=True)]),
        blocks(B('Scene 2 as blocks', 'ትዕይንት 2 በብሎኮች'),
               [bk('✉ When I get the message "scene 2"', '✉ «ትዕይንት 2» መልእክት ስቀበል', 'event'), bk('➡ Move right 3', '➡ ወደ ቀኝ 3 ሂድ', 'motion'), bk('💬 Say "I am hungry!"', '💬 «ርቦኛል!» በል', 'looks'), bk('✉ Send "scene 3"', '✉ «ትዕይንት 3» ላክ', 'event')])],
 'ex': ex_steps(B('Plan your story on three boxes', 'ታሪክህን በሦስት ሳጥኖች ላይ አቅድ'),
   ['Fold paper into three boxes and draw one scene in each.', 'Write one sentence under each box.', 'Build scene 1 in ScratchJr or with paper puppets.', 'Add scenes 2 and 3, using a message to start each new scene.', 'Show your story and ask the audience what they would add.'],
   ['ወረቀት በሦስት ሳጥኖች እጠፍና በእያንዳንዱ አንድ ትዕይንት ሣል።', 'ከእያንዳንዱ ሳጥን በታች አንድ ዓረፍተ ነገር ጻፍ።', 'ትዕይንት 1ን በScratchJr ወይም በወረቀት አሻንጉሊቶች ገንባ።', 'እያንዳንዱን አዲስ ትዕይንት ለመጀመር መልእክት በመጠቀም ትዕይንት 2 እና 3ን ጨምር።', 'ታሪክህን አሳይና ተመልካቾቹ ምን እንደሚጨምሩ ጠይቅ።']),
 'qa': B(['We meet the characters and the place.', 'With move blocks (or by moving the puppet) in the order planned on paper.', 'A new scene, a sound, or a second character who talks.'],
         ['ገጸ ባሕሪያቱንና ቦታውን እናውቃለን።', 'በወረቀት ላይ በታቀደው ቅደም ተከተል በመንቀሳቀሻ ብሎኮች (ወይም አሻንጉሊቱን በማንቀሳቀስ)።', 'አዲስ ትዕይንት፣ ድምፅ፣ ወይም የሚናገር ሁለተኛ ገጸ ባሕሪ።'])})
emit(0, L0, 9)

# ============================ LEVEL 1: Block Builders (Scratch) ============================
L1 = []
L1.append({
 'why': B('Programs react to events (a click, a key) and use loops to repeat actions.', 'ፕሮግራሞች ለክስተቶች (ጠቅታ፣ ቁልፍ) ምላሽ ይሰጣሉ፤ ተግባራትን ለመድገም loops ይጠቀማሉ።'),
 'dg': [blocks(B('Draw a square with a repeat loop', 'በrepeat loop ካሬ መሣል'),
               [bk('🚩 when green flag clicked', '🚩 አረንጓዴው ባንዲራ ሲጫን', 'event'), bk('pen down', 'ብዕር አውርድ', 'operator'),
                bk('repeat 4', '4 ጊዜ ድገም', 'control', [bk('move 100 steps', '100 እርምጃ ሂድ', 'motion'), bk('turn ↻ 90 degrees', '↻ 90 ዲግሪ ዙር', 'motion')])]),
        compare(B('repeat or forever?', 'repeat ወይስ forever?'),
                [col(B('repeat 4', '4 ጊዜ ድገም'), ['Runs the inside 4 times, then goes on', 'Use for shapes and counted actions'], ['ውስጡን 4 ጊዜ ያስኬዳል፣ ከዚያ ይቀጥላል', 'ለቅርጾችና ለተቆጠሩ ተግባራት'], 'good'),
                 col(B('forever', 'ለዘላለም'), ['Runs until you press stop', 'Use for animations and games'], ['stop እስክትጫን ይሠራል', 'ለአኒሜሽኖችና ለጨዋታዎች'])]),
        flow(B('What makes a Scratch program run', 'የScratch ፕሮግራምን የሚያስኬደው'), [N('Event', 'ክስተት', 'flag, key, click', 'ባንዲራ፣ ቁልፍ፣ ጠቅታ'), N('Script', 'ስክሪፕት', 'blocks in order', 'በቅደም ተከተል ያሉ ብሎኮች'), N('Sprite acts', 'sprite ይሠራል', hl=True)])],
 'ex': ex_steps(B('A windmill that turns forever', 'ለዘላለም የሚዞር የንፋስ ወፍጮ'),
   ['Draw a windmill sprite (or choose one) and a village backdrop.', 'Add: when green flag clicked → forever → turn 15 degrees → wait 0.1 seconds.', 'Add a second script: when space key pressed → change colour effect by 25.', 'Click the flag; press space. Then press stop.', 'Change the angle and wait time: what happens to the speed?'],
   ['የንፋስ ወፍጮ sprite ሣል (ወይም ምረጥ) እና የመንደር ዳራ።', 'ጨምር፡ አረንጓዴው ባንዲራ ሲጫን → forever → 15 ዲግሪ ዙር → 0.1 ሰከንድ ጠብቅ።', 'ሁለተኛ ስክሪፕት ጨምር፡ space ቁልፍ ሲጫን → የቀለም ውጤቱን በ25 ቀይር።', 'ባንዲራውን ጫን፤ spaceን ጫን። ከዚያ stopን ጫን።', 'ማዕዘኑንና የመጠበቂያ ጊዜውን ቀይር፡ ፍጥነቱ ምን ይሆናል?']),
 'qa': B(['An event block, usually "when green flag clicked" (or a key press or a click on a sprite).', 'repeat runs a fixed number of times and then continues; forever never stops until you press stop.', 'Four times: one for each side of the square, turning 90 degrees each time.'],
         ['የክስተት ብሎክ፣ ብዙውን ጊዜ «አረንጓዴው ባንዲራ ሲጫን» (ወይም የቁልፍ መጫን ወይም sprite ላይ ጠቅታ)።', 'repeat የተወሰነ ጊዜ ይሠራና ይቀጥላል፤ forever stop እስክትጫን አያቆምም።', 'አራት ጊዜ፡ ለካሬው እያንዳንዱ ጎን አንድ፣ በእያንዳንዱ ጊዜ 90 ዲግሪ እየዞረ።'])})
L1.append({
 'why': B('Conditions let a program decide: do this if something is true, otherwise do that.', 'ሁኔታዎች (conditions) ፕሮግራም እንዲወስን ያስችላሉ፡ አንድ ነገር እውነት ከሆነ ይህን አድርግ፣ ካልሆነ ያንን።'),
 'dg': [flow(B('if … else, like the weather', 'if … else፣ እንደ አየር ሁኔታ'),
             [N('Is it raining?', 'ዝናብ እየዘነበ ነው?'), N('yes → take an umbrella', 'አዎ → ጃንጥላ ያዝ', hl=True), N('no → take a hat', 'አይደለም → ኮፍያ ያዝ')]),
        blocks(B('Hand-washing game logic', 'የእጅ መታጠቢያ ጨዋታ ሎጂክ'),
               [bk('🚩 when green flag clicked', '🚩 አረንጓዴው ባንዲራ ሲጫን', 'event'),
                bk('forever', 'ለዘላለም', 'control', [bk('if touching Soap? then', 'ሳሙና ከነካ? ከሆነ', 'control', [bk('switch costume to clean-hands', 'ልብሱን ወደ ንጹሕ-እጆች ቀይር', 'looks'), bk('play sound "well done"', '«ጎበዝ» ድምፅ አጫውት', 'sound')]),
                                                       bk('else: if touching Mud? then show germ', 'ካልሆነ፡ ጭቃ ከነካ? ጀርም አሳይ', 'control')])]),
        compare(B('Walking with two costumes', 'በሁለት ልብሶች መራመድ'),
                [col(B('One picture', 'አንድ ሥዕል'), ['Sprite slides like a sticker'], ['sprite እንደ ተለጣፊ ይንሸራተታል'], 'bad'),
                 col(B('Two costumes, switched', 'ሁለት ልብሶች፣ ተቀያያሪ'), ['legs forward, legs back', 'looks like walking'], ['እግሮች ወደ ፊት፣ እግሮች ወደ ኋላ', 'እንደ መራመድ ይመስላል'], 'good')])],
 'ex': ex_steps(B('Catch-the-ball mini-game', 'ኳስ የመያዝ ትንሽ ጨዋታ'),
   ['Make a ball that falls from the top of the stage and a basket the player moves with the arrow keys.', 'In the ball: forever → change y by −5 → if touching Basket then play sound and go to the top.', 'Add: if y < −170 then go to the top (the ball was missed).', 'Record your own voice saying "Well done!" in Amharic for the catch sound.', 'Test with a friend and adjust the falling speed.'],
   ['ከመድረኩ አናት የሚወድቅ ኳስና ተጫዋቹ በቀስት ቁልፎች የሚያንቀሳቅሰው ቅርጫት ሥራ።', 'በኳሱ ውስጥ፡ forever → yን በ−5 ቀይር → ቅርጫት ከነካ ድምፅ አጫውትና ወደ ላይ ሂድ።', 'ጨምር፡ y < −170 ከሆነ ወደ ላይ ሂድ (ኳሱ አመለጠ)።', 'ለመያዣው ድምፅ በአማርኛ «ጎበዝ!» የሚል የራስህን ድምፅ ቅዳ።', 'ከጓደኛ ጋር ፈትሽና የመውደቂያ ፍጥነቱን አስተካክል።']),
 'qa': B(['It checks a condition: if it is true the first blocks run, otherwise the blocks under else run.', 'With the sensing block "touching edge?" (or touching a wall sprite) inside an if.', 'Switching between two pictures quickly makes the legs look like they move.'],
         ['ሁኔታን ይፈትሻል፡ እውነት ከሆነ የመጀመሪያዎቹ ብሎኮች ይሠራሉ፣ ካልሆነ ከelse በታች ያሉት ይሠራሉ።', 'በif ውስጥ ባለው «ጠርዙን ነካ?» (ወይም የግድግዳ spriteን ነካ) በሚለው የsensing ብሎክ።', 'በሁለት ሥዕሎች መካከል በፍጥነት መቀያየር እግሮቹ የሚንቀሳቀሱ ያስመስላል።'])})
L1.append({
 'why': B('Variables remember numbers (score, lives, time); coordinates tell where things are.', 'variables ቁጥሮችን (ውጤት፣ ሕይወቶች፣ ጊዜ) ያስታውሳሉ፤ coordinates ነገሮች የት እንዳሉ ይነግራሉ።'),
 'dg': [stack(B('The Scratch stage is a coordinate grid', 'የScratch መድረክ የcoordinate ፍርግርግ ነው'),
              [N('Top edge: y = 180', 'የላይኛው ጠርዝ፡ y = 180'), N('Centre: x = 0, y = 0', 'መሀል፡ x = 0፣ y = 0'), N('Left edge x = −240, right edge x = 240', 'የግራ ጠርዝ x = −240፣ የቀኝ ጠርዝ x = 240'), N('Bottom edge: y = −180', 'የታችኛው ጠርዝ፡ y = −180')],
              note=B('x grows to the right, y grows upwards.', 'x ወደ ቀኝ ያድጋል፣ y ወደ ላይ ያድጋል።')),
        blocks(B('Score, lives and game over', 'ውጤት፣ ሕይወቶችና ጨዋታው አበቃ'),
               [bk('🚩 when green flag clicked', '🚩 አረንጓዴው ባንዲራ ሲጫን', 'event'), bk('set score to 0', 'scoreን 0 አድርግ', 'data'), bk('set lives to 3', 'livesን 3 አድርግ', 'data'),
                bk('go to x: (pick random −220 to 220) y: 170', 'ወደ x: (ከ−220 እስከ 220 በዘፈቀደ) y: 170 ሂድ', 'motion'),
                bk('repeat until lives = 0', 'lives = 0 እስኪሆን ድገም', 'control', [bk('if touching Basket: change score by 1', 'ቅርጫት ከነካ፡ scoreን በ1 ቀይር', 'data'), bk('if y < −170: change lives by −1', 'y < −170 ከሆነ፡ livesን በ−1 ቀይር', 'data')]),
                bk('say "Game over!"', '«ጨዋታው አበቃ!» በል', 'looks')])],
 'ex': ex_steps(B('Count-the-money game', 'ገንዘብ የመቁጠር ጨዋታ'),
   ['Draw coin and note sprites (1, 5, 10, 50 birr).', 'Make variables: target (random 10–100) and total.', 'When a coin is clicked, change total by its value.', 'If total = target, say "Correct!" and change score by 1; if total > target, say "Too much!" and reset total.', 'Add a 30-second timer variable that counts down.'],
   ['የሳንቲምና የብር ኖት sprites ሣል (1፣ 5፣ 10፣ 50 ብር)።', 'variables ሥራ፡ target (በዘፈቀደ 10–100) እና total።', 'ሳንቲም ሲጫን totalን በዋጋው ቀይር።', 'total = target ከሆነ «ትክክል!» በልና scoreን በ1 ቀይር፤ total > target ከሆነ «በዛ!» በልና totalን እንደገና ጀምር።', 'የሚቆጥር የ30 ሰከንድ timer variable ጨምር።']),
 'qa': B(['A named box that stores a value, such as score, which the program can read and change.', 'In the centre of the stage.', 'A variable (lives or time) reaches 0, and an if or repeat-until block checks for it.'],
         ['ፕሮግራሙ ሊያነበውና ሊቀይረው የሚችል እሴት የሚያስቀምጥ ስም ያለው ሳጥን፣ ለምሳሌ score።', 'በመድረኩ መሀል።', 'variable (lives ወይም ጊዜ) 0 ይደርሳል፣ የif ወይም repeat-until ብሎክ ይፈትሸዋል።'])})
L1.append({
 'why': B('Lists hold many values under one name; messages let sprites work together.', 'lists ብዙ እሴቶችን በአንድ ስም ይይዛሉ፤ መልእክቶች sprites አብረው እንዲሠሩ ያስችላሉ።'),
 'dg': [compare(B('Ten variables or one list?', 'አሥር variables ወይስ አንድ list?'),
                [col(B('Ten variables', 'አሥር variables'), ['question1, question2, … question10', 'Ten blocks to change, easy to make mistakes'], ['question1፣ question2፣ … question10', 'የሚቀየሩ አሥር ብሎኮች፣ ለስህተት ቀላል'], 'bad'),
                 col(B('One list', 'አንድ list'), ['questions: item 1 … item 10', 'One loop reads them all; add more anytime'], ['questions፡ ንጥል 1 … ንጥል 10', 'አንድ loop ሁሉንም ያነባል፤ በማንኛውም ጊዜ ጨምር'], 'good')]),
        flow(B('Broadcast: one sprite tells others to start', 'Broadcast፡ አንድ sprite ሌሎች እንዲጀምሩ ይነግራል'),
             [N('Host sprite', 'አስተናጋጅ sprite', 'broadcast "next question"', '«ቀጣይ ጥያቄ» ያሰራጫል'), N('Message', 'መልእክት'), N('Quiz board', 'የጥያቄ ሰሌዳ', 'shows question n', 'ጥያቄ nን ያሳያል', hl=True), N('Timer', 'ሰዓት ቆጣሪ', 'restarts at 20 s', 'በ20 ሰ እንደገና ይጀምራል')]),
        flow(B('Plan → build → test → swap', 'አቅድ → ገንባ → ፈትሽ → ተቀያየሩ'), [N('Storyboard on paper', 'በወረቀት የታሪክ ሰሌዳ'), N('Build in pairs', 'በጥንድ ገንቡ'), N('Friend tests', 'ጓደኛ ይፈትናል'), N('Fix bugs', 'ስህተቶችን አስተካክሉ', hl=True)])],
 'ex': ex_steps(B('A quiz about your region', 'ስለ ክልልህ ጥያቄ'),
   ['Make two lists: questions and answers (for example rivers, crops, animals).', 'Set n to 1. The host broadcasts "ask".', 'When I receive "ask": ask (item n of questions) and wait; if answer = item n of answers, change score by 1.', 'Change n by 1 and broadcast "ask" again until n > length of questions.', 'Bonus: train Teachable Machine to recognise two crops and use it as a picture question.'],
   ['ሁለት lists ሥራ፡ questions እና answers (ለምሳሌ ወንዞች፣ ሰብሎች፣ እንስሳት)።', 'nን 1 አድርግ። አስተናጋጁ «ask» ያሰራጫል።', '«ask» ስቀበል፡ (የquestions ንጥል n) ጠይቅና ጠብቅ፤ መልሱ = የanswers ንጥል n ከሆነ scoreን በ1 ቀይር።', 'n > የquestions ርዝመት እስኪሆን nን በ1 ቀይርና «ask»ን እንደገና አሰራጭ።', 'ተጨማሪ፡ ሁለት ሰብሎችን እንዲለይ Teachable Machineን አሰልጥነውና እንደ የሥዕል ጥያቄ ተጠቀምበት።']),
 'qa': B(['One list can hold any number of items and one loop can process them all; ten variables need ten separate blocks.', 'It sends a message to all sprites; every script that starts "when I receive" that message runs.', 'Usually unclear instructions, a wrong answer check, or a timer that did not reset; testers find what the builder misses.'],
         ['አንድ list ማንኛውንም ቁጥር ንጥሎች ሊይዝ ይችላል፣ አንድ loop ሁሉንም ሊያስኬድ ይችላል፤ አሥር variables አሥር የተለያዩ ብሎኮች ያስፈልጋቸዋል።', 'ለሁሉም sprites መልእክት ይልካል፤ በ«ያንን መልእክት ስቀበል» የሚጀምር እያንዳንዱ ስክሪፕት ይሠራል።', 'ብዙውን ጊዜ ግልጽ ያልሆኑ መመሪያዎች፣ የተሳሳተ የመልስ ፍተሻ፣ ወይም እንደገና ያልጀመረ timer፤ ፈታኞች ገንቢው ያመለጠውን ያገኛሉ።'])})
emit(1, L1, 4)

# ============================ LEVEL 2: Young Makers (Python) ============================
L2 = []
L2.append({
 'why': B('Text code (Python) does what blocks do, but faster to write, share and grow.', 'የጽሑፍ ኮድ (Python) ብሎኮች የሚያደርጉትን ያደርጋል፤ ግን ለመጻፍ፣ ለማጋራትና ለማሳደግ ፈጣን ነው።'),
 'dg': [compare(B('The same program in blocks and in Python', 'ያው ፕሮግራም በብሎኮችና በPython'),
                [col(B('Scratch', 'Scratch'), ['ask "Price per kilo?" and wait', 'set price to answer', 'say price × kilos'], ['«በኪሎ ዋጋ?» ጠይቅና ጠብቅ', 'priceን answer አድርግ', 'price × kilos በል']),
                 col(B('Python', 'Python'), ['price = float(input("Price per kilo? "))', 'total = price * kilos', 'print(total)'], ['price = float(input("Price per kilo? "))', 'total = price * kilos', 'print(total)'], 'good')]),
        flow(B('Every program: input → process → output', 'እያንዳንዱ ፕሮግራም፡ ግብዓት → ሂደት → ውጤት'),
             [N('Input', 'ግብዓት', 'input(), a sensor, a button', 'input()፣ ሴንሰር፣ ቁልፍ'), N('Process', 'ሂደት', 'variables and maths', 'variables እና ሒሳብ'), N('Output', 'ውጤት', 'print(), the micro:bit screen', 'print()፣ የmicro:bit ስክሪን', hl=True)]),
        compare(B('Types matter', 'ዓይነቶች አስፈላጊ ናቸው'),
                [col(B('Text (str)', 'ጽሑፍ (str)'), ['"3" + "4" → "34"', 'input() always gives text'], ['"3" + "4" → "34"', 'input() ሁልጊዜ ጽሑፍ ይሰጣል'], 'bad'),
                 col(B('Numbers (int, float)', 'ቁጥሮች (int፣ float)'), ['3 + 4 → 7', 'convert: int("3"), float("3.5")'], ['3 + 4 → 7', 'ቀይር፡ int("3")፣ float("3.5")'], 'good')])],
 'ex': ex_py('''
# Market price calculator (in class, use input(); here the values are typed in)
item = "teff"
price_per_kilo = float("120")     # input() gives text, so we convert it to a number
kilos = float("3.5")
total = price_per_kilo * kilos
print(f"{kilos} kg of {item} at {price_per_kilo:.0f} birr/kg = {total:.2f} birr")
print("Selam! Your total is", round(total), "birr")
print(2 + int("3"))               # works: both are numbers
try:
    print(2 + "3")                # mixing a number and text
except TypeError as err:
    print("Error:", err)
''', B('Market price calculator', 'የገበያ ዋጋ ማስሊያ')),
 'qa': B(['Always a string (text), even if the user types digits; convert with int() or float().', 'Python cannot add a number and text; convert one of them first (2 + int("3") is 5).', 'The temperature sensor (inside the processor chip), read with temperature().'],
         ['ሁልጊዜ string (ጽሑፍ)፣ ተጠቃሚው አሃዞችን ቢጽፍም፤ በint() ወይም float() ቀይር።', 'Python ቁጥርንና ጽሑፍን መደመር አይችልም፤ መጀመሪያ አንዱን ቀይር (2 + int("3") 5 ነው)።', 'የሙቀት ሴንሰሩ (በprocessor ቺፑ ውስጥ)፣ በtemperature() ይነበባል።'])})
L2.append({
 'why': B('Decisions, loops and functions are the three tools behind almost every program.', 'ውሳኔዎች፣ loops እና functions ከሞላ ጎደል ከእያንዳንዱ ፕሮግራም ጀርባ ያሉ ሦስቱ መሣሪያዎች ናቸው።'),
 'dg': [compare(B('for or while?', 'for ወይስ while?'),
                [col(B('for', 'for'), ['You know how many times', 'for day in range(7):'], ['ስንት ጊዜ እንደሆነ ታውቃለህ', 'for day in range(7):'], 'good'),
                 col(B('while', 'while'), ['Repeat until something changes', 'while guess != secret:'], ['አንድ ነገር እስኪለወጥ ድገም', 'while guess != secret:'])]),
        flow(B('A function is a small machine', 'function ትንሽ ማሽን ነው'),
             [N('Inputs (parameters)', 'ግብዓቶች (parameters)', 'length = 40, width = 25', 'length = 40፣ width = 25'), N('def area(length, width):', 'def area(length, width):', 'return length * width', 'return length * width'), N('Output (return value)', 'ውጤት (return value)', '1000 m²', '1000 m²', hl=True)]),
        flow(B('From data to a chart', 'ከዳታ ወደ ቻርት'), [N('Measure', 'ለካ', 'rain gauge, 7 days', 'የዝናብ መለኪያ፣ 7 ቀናት'), N('Spreadsheet', 'ስፕሬድሺት'), N('Bar chart', 'የአሞሌ ቻርት'), N('Explain', 'አብራራ', 'which day was wettest?', 'የትኛው ቀን በጣም ዝናባማ ነበር?', hl=True)])],
 'ex': ex_py('''
rain_mm = {"Mon": 0, "Tue": 12, "Wed": 30, "Thu": 4, "Fri": 0, "Sat": 18, "Sun": 7}

def area(length, width):               # a function returns a value
    return length * width

def describe(mm):                      # if / elif / else
    if mm == 0:
        return "dry"
    elif mm < 10:
        return "light rain"
    elif mm < 25:
        return "moderate rain"
    else:
        return "heavy rain"

for day, mm in rain_mm.items():        # for: we know there are 7 days
    print(f"{day}: {mm:2d} mm {'#' * (mm // 2):15s} {describe(mm)}")

total = sum(rain_mm.values())
plot = area(40, 25)                    # a 40 m x 25 m plot
print(f"Week total: {total} mm on a {plot} m2 plot = {total * plot / 1000:.0f} m3 of water")
''', B('A week of rain: decisions, a loop, functions and a text bar chart', 'የሳምንት ዝናብ፡ ውሳኔዎች፣ loop፣ functions እና የጽሑፍ የአሞሌ ቻርት'),
     B('1 mm of rain on 1 m² is 1 litre, so mm × m² ÷ 1000 gives cubic metres.', '1 mm ዝናብ በ1 m² ላይ 1 ሊትር ነው፤ ስለዚህ mm × m² ÷ 1000 ኪዩቢክ ሜትር ይሰጣል።')),
 'qa': B(['When you do not know in advance how many repeats are needed, for example keep asking until the guess is right.', 'The value after return, which the caller can store or print (area(40, 25) returns 1000).', 'Answer from your chart, for example: Wednesday was the wettest day with 30 mm, and two days were dry.'],
         ['ስንት ድግግሞሽ እንደሚያስፈልግ አስቀድመህ ሳታውቅ፣ ለምሳሌ ግምቱ ትክክል እስኪሆን መጠየቅ።', 'ከreturn በኋላ ያለው እሴት፣ ጠሪው ሊያስቀምጠው ወይም ሊያትመው ይችላል (area(40, 25) 1000 ይመልሳል)።', 'ከቻርትህ መልስ፣ ለምሳሌ፡ ረቡዕ በ30 mm በጣም ዝናባማ ቀን ነበር፣ ሁለት ቀናት ደረቅ ነበሩ።'])})
L2.append({
 'why': B('Lists and dictionaries organise data; files keep it; HTML and CSS show it on the web.', 'lists እና dictionaries ዳታን ያደራጃሉ፤ ፋይሎች ያስቀምጡታል፤ HTML እና CSS በድር ላይ ያሳዩታል።'),
 'dg': [compare(B('List or dictionary?', 'list ወይስ dictionary?'),
                [col(B('List: ordered items', 'list፡ በቅደም ተከተል ያሉ ንጥሎች'), ['names = ["Abebe", "Hana", "Sara"]', 'names[0] → "Abebe" (by position)'], ['names = ["Abebe", "Hana", "Sara"]', 'names[0] → "Abebe" (በቦታ)']),
                 col(B('Dictionary: key → value', 'dictionary፡ ቁልፍ → እሴት'), ['words = {"ውሃ": "water"}', 'words["ውሃ"] → "water" (by key)'], ['words = {"ውሃ": "water"}', 'words["ውሃ"] → "water" (በቁልፍ)'], 'good')]),
        stack(B('A web page has three layers', 'ድረ ገጽ ሦስት ንብርብሮች አሉት'),
              [N('HTML: content', 'HTML፡ ይዘት', '<h1>, <p>, <img>, <a href="…">', '<h1>፣ <p>፣ <img>፣ <a href="…">'), N('CSS: style', 'CSS፡ ዘይቤ', 'colours, fonts, layout', 'ቀለሞች፣ ፊደላት፣ አቀማመጥ'), N('JavaScript: behaviour', 'JavaScript፡ ባሕሪ', 'buttons that react (Grade 8)', 'ምላሽ የሚሰጡ ቁልፎች (8ኛ ክፍል)')]),
        flow(B('Why save to a file', 'ለምን በፋይል ማስቀመጥ'), [N('Program runs', 'ፕሮግራሙ ይሠራል'), N('Write to words.json', 'ወደ words.json ጻፍ'), N('Program closes', 'ፕሮግራሙ ይዘጋል'), N('Next day: load it back', 'በሚቀጥለው ቀን፡ መልሰህ ጫን', hl=True)])],
 'ex': ex_py('''
import json, os, tempfile
words = {"ውሃ": "water", "ዳቦ": "bread", "ትምህርት ቤት": "school"}   # dictionary: key -> value
class_list = ["Abebe", "Hana"]                                       # list: ordered items
class_list.append("Sara"); class_list.remove("Hana")
print("Class:", class_list, "| first:", class_list[0])

path = os.path.join(tempfile.gettempdir(), "words.json")
with open(path, "w", encoding="utf-8") as f:                         # save
    json.dump(words, f, ensure_ascii=False)
with open(path, encoding="utf-8") as f:                              # load again later
    loaded = json.load(f)
for am, en in loaded.items():
    print(f"{am} -> {en}")
print("Unknown word:", loaded.get("ጤፍ", "not in the dictionary yet"))
''', B('Lists, a bilingual dictionary and saving to a file', 'lists፣ ባለሁለት ቋንቋ dictionary እና በፋይል ማስቀመጥ')),
 'qa': B(['A list keeps items in order and you find them by position; a dictionary stores pairs and you find a value by its key.', 'Variables disappear when the program stops; a file keeps the data for next time and for other programs.', 'The <a> tag, with the address in href: <a href="page2.html">Next</a>.'],
         ['list ንጥሎችን በቅደም ተከተል ይይዛል፣ በቦታ ታገኛቸዋለህ፤ dictionary ጥንዶችን ያስቀምጣል፣ እሴትን በቁልፉ ታገኛለህ።', 'ፕሮግራሙ ሲቆም variables ይጠፋሉ፤ ፋይል ዳታውን ለሚቀጥለው ጊዜና ለሌሎች ፕሮግራሞች ያስቀምጣል።', '<a> tag፣ አድራሻው በhref ውስጥ፡ <a href="page2.html">ቀጣይ</a>።'])})
L2.append({
 'why': B('Real programs handle errors, talk to other services and read the physical world.', 'እውነተኛ ፕሮግራሞች ስህተቶችን ይይዛሉ፣ ከሌሎች አገልግሎቶች ጋር ይነጋገራሉ፣ አካላዊውን ዓለም ያነባሉ።'),
 'dg': [flow(B('Smart garden monitor', 'ብልህ የአትክልት ቦታ መከታተያ'),
             [N('Soil sensor', 'የአፈር ሴንሰር', 'reading 0–1023', 'ንባብ 0–1023'), N('Board (Arduino / Pi)', 'ቦርድ (Arduino / Pi)', 'is it below the threshold?', 'ከወሰኑ በታች ነው?'), N('Log file', 'የመዝገብ ፋይል', 'time, reading', 'ጊዜ፣ ንባብ'), N('Web page', 'ድረ ገጽ', '"Water now!"', '«አሁን አጠጣ!»', hl=True)],
             note=B('Powered by a solar power bank: no grid electricity needed.', 'በፀሐይ ኃይል ባንክ የሚሠራ፡ የኤሌክትሪክ መስመር አያስፈልግም።')),
        flow(B('An API: ask a server, get data back', 'API፡ ሰርቨርን ጠይቅ፣ ዳታ መልሰህ አግኝ'),
             [N('Your program', 'ፕሮግራምህ'), N('Request', 'ጥያቄ', 'GET /forecast?city=Bahir Dar', 'GET /forecast?city=Bahir Dar'), N('Weather server', 'የአየር ሁኔታ ሰርቨር'), N('JSON reply', 'የJSON መልስ', '{"rain_mm": 6}', '{"rain_mm": 6}', hl=True)]),
        compare(B('try / except', 'try / except'),
                [col(B('Without', 'ያለ እሱ'), ['User types "abc" → program crashes'], ['ተጠቃሚው «abc» ይጽፋል → ፕሮግራሙ ይወድቃል'], 'bad'),
                 col(B('With', 'ከእሱ ጋር'), ['except ValueError: ask again', 'Program keeps running'], ['except ValueError፡ እንደገና ጠይቅ', 'ፕሮግራሙ መሥራቱን ይቀጥላል'], 'good')])],
 'ex': ex_py('''
import json
DRY_BELOW = 400                       # sensor value below this = dry soil (calibrate with dry and wet soil)
log_lines = ["06:00,612", "09:00,540", "12:00,455", "15:00,381", "18:00,oops", "21:00,372"]

def parse(line):
    time, value = line.split(",")
    try:
        return time, int(value)       # may fail on bad data
    except ValueError:
        print(f"skipped bad reading at {time}: {value!r}")
        return None

for line in log_lines:
    r = parse(line)
    if r:
        time, v = r
        print(f"{time}  {v:4d}  {'DRY - water now' if v < DRY_BELOW else 'ok'}")

# An API answers in JSON. Here we read a saved sample answer instead of calling the internet:
reply = '{"city": "Bahir Dar", "tomorrow": {"rain_mm": 6, "max_c": 27}}'
data = json.loads(reply)
print(f"Tomorrow in {data['city']}: {data['tomorrow']['rain_mm']} mm rain, {data['tomorrow']['max_c']} C")
''', B('Sensor log with try/except, and reading an API reply', 'የሴንሰር መዝገብ ከtry/except ጋር፣ እና የAPI መልስ ማንበብ'),
     B('The API reply here is a saved sample, so the example runs without internet. In class, use the requests library with a free weather API.', 'እዚህ ያለው የAPI መልስ የተቀመጠ ናሙና ነው፤ ስለዚህ ምሳሌው ያለ ኢንተርኔት ይሠራል። በክፍል ውስጥ የrequests library ከነጻ የአየር ሁኔታ API ጋር ተጠቀም።')),
 'qa': B(['Python jumps to the except block instead of crashing, so you can handle the problem (for example ask again or skip the value).', 'An Application Programming Interface: a set of rules for asking another program or server for data or actions, usually over the internet with JSON replies.', 'It compares the reading with a threshold measured beforehand in dry and wet soil; below the threshold means dry.'],
         ['Python ከመውደቅ ይልቅ ወደ except ብሎኩ ይዘላል፤ ስለዚህ ችግሩን መያዝ ትችላለህ (ለምሳሌ እንደገና መጠየቅ ወይም እሴቱን መዝለል)።', 'Application Programming Interface፡ ሌላ ፕሮግራምን ወይም ሰርቨርን ዳታ ወይም ተግባር የመጠየቂያ ሕጎች፣ ብዙውን ጊዜ በኢንተርኔት በJSON መልሶች።', 'ንባቡን በደረቅና በእርጥብ አፈር አስቀድሞ ከተለካ ወሰን ጋር ያወዳድራል፤ ከወሰኑ በታች ማለት ደረቅ ነው።'])})
emit(2, L2, 4)
print('levels 0-2 written')
