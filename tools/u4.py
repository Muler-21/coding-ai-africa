from mlib import *
D = ('5 weeks · 15–20 h per week', '5 ሳምንታት · በሳምንት 15–20 ሰዓት')
DA = ('5 weeks · 6–8 h per week', '5 ሳምንታት · በሳምንት 6–8 ሰዓት')

# ---------------- Year 1 ----------------
Y1 = [
U(('Problem solving, recursion and testing', 'ችግር መፍታት፣ recursion እና መፈተሽ'), D,
  [('Break a problem into functions with clear contracts', 'ችግርን ግልጽ ውሎች ባሏቸው functions መከፋፈል'), ('Write recursive solutions and test them with edge cases', 'recursive መፍትሔዎችን መጻፍና በጠርዝ ጉዳዮች መፈተሽ')],
  [('Problem → inputs, outputs, examples, edge cases', 'ችግር → ግብዓቶች፣ ውጤቶች፣ ምሳሌዎች፣ የጠርዝ ጉዳዮች'), ('Recursion and the call stack', 'Recursion እና call stack'), ('Memoisation: stop repeating work', 'Memoisation፡ ሥራን መድገም አቁም'), ('Unit tests and property checks', 'Unit tests እና የባሕሪ ፍተሻዎች')],
  ('Count the ways to climb a terraced hillside of n steps taking 1 or 2 steps at a time; write it recursively, make it fast with memoisation and test it.', 'በአንድ ጊዜ 1 ወይም 2 እርምጃ እየወሰድክ n እርምጃዎች ያሉትን የእርከን ኮረብታ የመውጣት መንገዶችን ቁጠር፤ በrecursion ጻፈው፣ በmemoisation ፈጣን አድርገው፣ ፈትሸውም።'),
  ('Python', 'Python'),
  [('Why is the plain recursive version slow for n = 35?', 'ቀላሉ የrecursive ስሪት ለn = 35 ለምን ቀርፋፋ ነው?', 'It recomputes the same sub-problems again and again; the number of calls grows exponentially.', 'ተመሳሳዩን ንዑስ ችግሮች ደጋግሞ ያሰላል፤ የጥሪዎቹ ቁጥር በexponential ያድጋል።'),
   ('What edge cases should the tests include?', 'ፈተናዎቹ የትኞቹን የጠርዝ ጉዳዮች ማካተት አለባቸው?', 'The smallest inputs (n = 0, 1, 2), a known larger value, and invalid input such as a negative n.', 'በጣም ትናንሽ ግብዓቶች (n = 0፣ 1፣ 2)፣ የሚታወቅ ትልቅ እሴት፣ እና እንደ አሉታዊ n ያለ የተሳሳተ ግብዓት።')],
  [tree(B('The call tree of ways(4)', 'የways(4) የጥሪ ዛፍ'), N('ways(4)', 'ways(4)'), [{'t': B('ways(3)', 'ways(3)'), 'kids': [{'t': B('ways(2)', 'ways(2)')}, {'t': B('ways(1)', 'ways(1)')}]}, {'t': B('ways(2)', 'ways(2)'), 'kids': [{'t': B('ways(1), ways(0)', 'ways(1)፣ ways(0)')}]}], note=B('ways(2) is computed twice already; memoisation stores it once.', 'ways(2) አስቀድሞ ሁለት ጊዜ ተሰልቷል፤ memoisation አንድ ጊዜ ያስቀምጠዋል።'))],
  ex_py('''
from functools import lru_cache
calls = 0
def ways_slow(n):
    global calls; calls += 1
    if n < 0: raise ValueError("n must be >= 0")
    return 1 if n <= 1 else ways_slow(n - 1) + ways_slow(n - 2)
@lru_cache(maxsize=None)
def ways(n):
    if n < 0: raise ValueError("n must be >= 0")
    return 1 if n <= 1 else ways(n - 1) + ways(n - 2)
print("ways(25) slow:", ways_slow(25), "using", f"{calls:,}", "calls")
print("ways(25) memoised:", ways(25), "| ways(90):", ways(90))
assert [ways(n) for n in range(6)] == [1, 1, 2, 3, 5, 8]          # unit tests
assert all(ways(n) == ways(n - 1) + ways(n - 2) for n in range(2, 60))   # property check
try: ways(-1)
except ValueError as e: print("edge case handled:", e)
''', B('Exponential vs memoised recursion, with tests', 'Exponential vs memoised recursion፣ ከፈተናዎች ጋር'))),
U(('C and memory', 'C እና ማስታወሻ'), D,
  [('Use pointers, arrays and dynamic memory in C', 'በC ውስጥ pointersን፣ arraysን እና dynamic memoryን መጠቀም'), ('Avoid leaks and out-of-bounds bugs', 'leaksን እና ከወሰን ውጭ ስህተቶችን ማስወገድ')],
  [('Compile and run: gcc -Wall', 'አጠናቅርና አስኪድ፡ gcc -Wall'), ('Pointers and addresses', 'Pointers እና አድራሻዎች'), ('Arrays and pointer arithmetic', 'Arrays እና የpointer ሒሳብ'), ('malloc/free; valgrind and gdb', 'malloc/free፤ valgrind እና gdb')],
  ('Write a C program that reads n sensor readings into a malloc’d array, computes mean and maximum, and frees the memory; check it with valgrind.', 'n የሴንሰር ንባቦችን በmalloc ወደተደረገ array የሚያነብ፣ አማካይና ከፍተኛውን የሚያሰላ፣ ማስታወሻውን የሚለቅ የC ፕሮግራም ጻፍ፤ በvalgrind ፈትሸው።'),
  ('gcc, valgrind, gdb (all free on Linux)', 'gcc፣ valgrind፣ gdb (ሁሉም በLinux ነጻ)'),
  [('What is a pointer?', 'pointer ምንድነው?', 'A variable that holds a memory address; *p reads or writes the value at that address.', 'የማስታወሻ አድራሻ የሚይዝ variable፤ *p በዚያ አድራሻ ያለውን እሴት ያነባል ወይም ይጽፋል።'),
   ('What happens if you forget free()?', 'free()ን ብትረሳ ምን ይሆናል?', 'A memory leak: the memory stays reserved until the program ends; long-running programs slowly run out of memory.', 'የማስታወሻ leak፡ ማስታወሻው ፕሮግራሙ እስኪያበቃ ተይዞ ይቆያል፤ ረጅም ጊዜ የሚሠሩ ፕሮግራሞች ቀስ በቀስ ማስታወሻ ያጣሉ።')],
  [stack(B('Where things live in memory', 'ነገሮች በማስታወሻ ውስጥ የት ይኖራሉ'), [N('Stack', 'Stack', 'local variables; freed automatically', 'የአካባቢ variables፤ በራስ-ሰር ይለቀቃሉ'), N('Heap', 'Heap', 'malloc’d blocks; you must free them', 'በmalloc የተደረጉ ብሎኮች፤ መልቀቅ አለብህ'), N('Static data', 'Static data', 'globals and constants', 'globals እና constants'), N('Code', 'ኮድ', 'the compiled program', 'የተጠናቀረው ፕሮግራም')])],
  ex_c('''
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n = 6;
    double sample[] = {21.5, 23.0, 26.5, 30.0, 28.5, 24.0};   /* soil temperature, degrees C */
    double *r = malloc(n * sizeof *r);                        /* memory on the heap */
    if (r == NULL) return 1;
    for (int i = 0; i < n; i++) *(r + i) = sample[i];         /* pointer arithmetic: r[i] */
    double sum = 0, max = r[0];
    for (int i = 0; i < n; i++) { sum += r[i]; if (r[i] > max) max = r[i]; }
    printf("n = %d, mean = %.2f, max = %.1f\\n", n, sum / n, max);
    int x = 42, *p = &x;
    *p = 7;                                                   /* change x through its address */
    printf("x is now %d (changed through a pointer)\\n", x);
    free(r);                                                  /* give the memory back */
    return 0;
}
''', B('Dynamic memory and pointers in C', 'በC ውስጥ dynamic memory እና pointers'))),
U(('Linux and shell scripting', 'Linux እና shell scripting'), D,
  [('Automate a data task with a bash script', 'የዳታ ተግባርን በbash script በራስ-ሰር መሥራት'), ('Use variables, loops, conditions and exit codes in bash', 'በbash ውስጥ variablesን፣ loopsን፣ ሁኔታዎችንና exit codesን መጠቀም')],
  [('Permissions and the PATH', 'ፈቃዶችና PATH'), ('Variables, for loops, if and test', 'Variables፣ for loops፣ if እና test'), ('Text tools: awk, sed, sort, uniq', 'የጽሑፍ መሣሪያዎች፡ awk፣ sed፣ sort፣ uniq'), ('Scheduling with cron; logging', 'በcron ማቀድ፤ መመዝገብ')],
  ('Write a script that processes every daily sensor file in a folder, writes one summary CSV, and logs errors for files with bad lines.', 'በፎልደር ውስጥ ያለውን እያንዳንዱን የዕለት የሴንሰር ፋይል የሚያስኬድ፣ አንድ የማጠቃለያ CSV የሚጽፍና መጥፎ መስመሮች ላሏቸው ፋይሎች ስህተቶችን የሚመዘግብ script ጻፍ።'),
  ('Linux or WSL, bash', 'Linux ወይም WSL፣ bash'),
  [('What does "set -euo pipefail" do?', '«set -euo pipefail» ምን ያደርጋል?', 'Stops the script on errors, on unset variables and on failures inside pipes, so bugs do not pass silently.', 'scriptኡን በስህተቶች፣ ባልተዘጋጁ variables እና በpipes ውስጥ ባሉ ውድቀቶች ላይ ያቆማል፤ ስለዚህ ስህተቶች በዝምታ አያልፉም።'),
   ('Why does awk suit column data?', 'awk ለዓምድ ዳታ ለምን ይስማማል?', 'It splits each line into fields ($1, $2…) and can sum, filter and print them in one line of code.', 'እያንዳንዱን መስመር ወደ fields ($1፣ $2…) ይከፍላል፣ በአንድ የኮድ መስመርም ሊደምራቸው፣ ሊያጣራቸውና ሊያትማቸው ይችላል።')],
  [flow(B('A daily automation', 'የዕለት አውቶሜሽን'), [N('cron 06:00', 'cron 06:00'), N('for each file', 'ለእያንዳንዱ ፋይል'), N('awk: mean per file', 'awk፡ በፋይል አማካይ'), N('summary.csv + errors.log', 'summary.csv + errors.log', hl=True)])],
  ex_sh('''
set -euo pipefail
echo "file,readings,mean_moisture" > summary.csv
for f in day_*.csv; do
  if grep -qv '^[0-9:]*,[0-9.]*$' "$f"; then echo "$(date +%F) bad line in $f" >> errors.log; fi
  grep '^[0-9:]*,[0-9.]*$' "$f" | awk -F, -v name="$f" '{s += $2; n++} END {printf "%s,%d,%.1f\\n", name, n, s/n}' >> summary.csv
done
cat summary.csv
echo "errors logged: $(wc -l < errors.log)"
''', {'day_01.csv': '06:00,41\n12:00,35\n18:00,30\n', 'day_02.csv': '06:00,52\n12:00,oops\n18:00,44\n', 'day_03.csv': '06:00,38\n12:00,31\n18:00,27\n'},
   B('Summarise every sensor file and log bad lines', 'እያንዳንዱን የሴንሰር ፋይል አጠቃልልና መጥፎ መስመሮችን መዝግብ'))),
U(('Discrete maths: logic, sets, proofs, counting', 'Discrete maths፡ ሎጂክ፣ ስብስቦች፣ ማረጋገጫዎች፣ ቆጠራ'), D,
  [('Reason with propositional logic and sets', 'በpropositional logic እና በስብስቦች ማሰብ'), ('Prove by induction and count with combinations', 'በinduction ማረጋገጥና በcombinations መቁጠር')],
  [('Propositions, truth tables, implication', 'Propositions፣ truth tables፣ implication'), ('Sets: union, intersection, complement', 'ስብስቦች፡ union፣ intersection፣ complement'), ('Proof by induction', 'በinduction ማረጋገጥ'), ('Counting: permutations, combinations, pigeonhole', 'ቆጠራ፡ permutations፣ combinations፣ pigeonhole')],
  ('A cooperative must choose 3 of 10 farms for a trial: how many choices? Prove a counting formula by induction and check it in code.', 'ማኅበር ለሙከራ ከ10 እርሻዎች 3ን መምረጥ አለበት፡ ስንት ምርጫዎች አሉ? የቆጠራ ቀመርን በinduction አረጋግጥና በኮድ ፈትሸው።'),
  ('Paper, Python', 'ወረቀት፣ Python'),
  [('When is "if P then Q" false?', '«P ከሆነ Q» መቼ ሐሰት ነው?', 'Only when P is true and Q is false.', 'P እውነት ሆኖ Q ሐሰት ሲሆን ብቻ።'),
   ('How many ways to choose 3 farms out of 10?', 'ከ10 እርሻዎች 3ን ለመምረጥ ስንት መንገዶች?', 'C(10, 3) = 10! / (3! · 7!) = 120.', 'C(10, 3) = 10! / (3! · 7!) = 120።')],
  [flow(B('Proof by induction: 2⁰ + 2¹ + … + 2ⁿ = 2ⁿ⁺¹ − 1', 'በinduction ማረጋገጥ፡ 2⁰ + 2¹ + … + 2ⁿ = 2ⁿ⁺¹ − 1'), [N('Base: n = 0', 'Base፡ n = 0', '1 = 2 − 1 ✓', '1 = 2 − 1 ✓'), N('Assume for n', 'ለn አስብ'), N('Add 2ⁿ⁺¹', '2ⁿ⁺¹ ጨምር', '2ⁿ⁺¹ − 1 + 2ⁿ⁺¹ = 2ⁿ⁺² − 1', '2ⁿ⁺¹ − 1 + 2ⁿ⁺¹ = 2ⁿ⁺² − 1'), N('True for all n', 'ለሁሉም n እውነት', hl=True)])],
  ex_py('''
from itertools import combinations, product
from math import comb
farms = [f"F{i}" for i in range(1, 11)]
print("choose 3 of 10:", comb(10, 3), "=", len(list(combinations(farms, 3))))
print("P Q | P->Q")
for p, q in product([True, False], repeat=2):
    print(f"{p:d} {q:d} |  {(not p) or q:d}")
A, B = {"teff", "maize", "barley"}, {"maize", "sorghum"}
print("A|B =", sorted(A | B), " A&B =", sorted(A & B), " A-B =", sorted(A - B))
print("induction claim holds for n = 0..50:", all(sum(2**k for k in range(n + 1)) == 2**(n + 1) - 1 for n in range(51)))
''', B('Counting, truth tables and sets in code', 'ቆጠራ፣ truth tables እና ስብስቦች በኮድ'))),
U(('Calculus: change and accumulation', 'Calculus፡ ለውጥና ክምችት'), D,
  [('Interpret derivatives as rates and integrals as totals', 'derivativesን እንደ መጠኖች፣ integralsን እንደ ድምሮች መተርጎም'), ('Approximate both numerically and check against exact results', 'ሁለቱንም በቁጥር መገመትና ከትክክለኛ ውጤቶች ጋር መፈተሽ')],
  [('Limits and continuity', 'Limits እና continuity'), ('Derivatives: rules and meaning', 'Derivatives፡ ሕጎችና ትርጉም'), ('Optimisation with derivatives', 'በderivatives optimisation'), ('Integrals and numerical integration; gradients in many variables', 'Integrals እና numerical integration፤ በብዙ variables ውስጥ gradients')],
  ('A yield response curve Y(N) = 2 + 0.03N − 0.0001N²: find the nitrogen rate with the highest yield, and the total rainfall from a daily rain-rate curve by integration.', 'የምርት ምላሽ ኩርባ Y(N) = 2 + 0.03N − 0.0001N²፡ ከፍተኛ ምርት የሚሰጠውን የናይትሮጅን መጠን፣ እንዲሁም ከዕለታዊ የዝናብ መጠን ኩርባ ጠቅላላ የዝናብ መጠንን በintegration ፈልግ።'),
  ('Paper, Python with NumPy', 'ወረቀት፣ Python ከNumPy ጋር'),
  [('What does the derivative of yield with respect to nitrogen mean?', 'የምርት derivative ከናይትሮጅን አንፃር ምን ማለት ነው?', 'The extra yield from one more kilogram of nitrogen at that rate; where it is 0 the yield is at its peak.', 'በዚያ መጠን ከአንድ ተጨማሪ ኪሎግራም ናይትሮጅን የሚገኝ ተጨማሪ ምርት፤ 0 በሆነበት ምርቱ ከፍተኛው ላይ ነው።'),
   ('Why approximate integrals numerically?', 'integralsን በቁጥር ለምን እንገምታለን?', 'Real data come as measurements, not formulas; the trapezoid rule adds up small areas between readings.', 'እውነተኛ ዳታ እንደ ልኬቶች ይመጣል እንጂ እንደ ቀመሮች አይደለም፤ የtrapezoid ሕግ በንባቦች መካከል ያሉ ትናንሽ ስፋቶችን ይደምራል።')],
  [compare(B('Two big ideas', 'ሁለት ትላልቅ ሐሳቦች'), [col(B('Derivative', 'Derivative'), ['rate of change at a point', 'slope of the curve', 'max/min where it is 0'], ['በአንድ ነጥብ ያለ የለውጥ መጠን', 'የኩርባው slope', '0 በሆነበት max/min']), col(B('Integral', 'Integral'), ['total accumulated', 'area under the curve', 'rain rate → total rain'], ['ጠቅላላ የተከማቸ', 'ከኩርባው በታች ያለ ስፋት', 'የዝናብ መጠን → ጠቅላላ ዝናብ'], 'good')])],
  ex_py('''
import numpy as np
Y = lambda N: 2 + 0.03 * N - 0.0001 * N**2          # t/ha
dY = lambda N, h=1e-4: (Y(N + h) - Y(N - h)) / (2 * h)    # numerical derivative
print(f"slope at N=50: {dY(50):.4f} t/ha per kg (exact {0.03 - 0.0002 * 50:.4f})")
print(f"best N where dY/dN = 0: exact {0.03 / 0.0002:.0f} kg/ha, yield {Y(150):.2f} t/ha")
hours = np.arange(0, 6.5, 0.5)                       # a storm, rain rate in mm/h every 30 min
rate = 12 * np.exp(-((hours - 2) ** 2) / 2)
total = np.sum((rate[1:] + rate[:-1]) / 2 * np.diff(hours))
print(f"total rain by the trapezoid rule: {total:.1f} mm")
''', B('Optimum nitrogen and total storm rainfall', 'ምርጥ ናይትሮጅንና ጠቅላላ የአውሎ ነፋስ ዝናብ'))),
U(('Linear algebra I', 'Linear algebra I'), D,
  [('Solve linear systems with matrices', 'linear systemsን በማትሪክሶች መፍታት'), ('Interpret vectors, matrices and their products', 'vectorsን፣ ማትሪክሶችንና ምርቶቻቸውን መተርጎም')],
  [('Vectors: length, dot product, angle', 'Vectors፡ ርዝመት፣ dot product፣ ማዕዘን'), ('Matrices as transformations', 'ማትሪክሶች እንደ ለውጦች'), ('Gaussian elimination; Ax = b', 'Gaussian elimination፤ Ax = b'), ('Rank, inverse and when systems have no solution', 'Rank፣ inverse እና systems መፍትሔ የሌላቸው መቼ እንደሆነ')],
  ('Mix three fertilizers (with known N, P, K percentages) to hit a target N–P–K for a plot: set up and solve the linear system.', 'ለአንድ ማሳ ዒላማ N–P–K ለመድረስ ሦስት ማዳበሪያዎችን (የታወቀ የN፣ P፣ K መቶኛ ያላቸውን) ቀላቅል፡ linear systemኡን አዘጋጅና ፍታ።'),
  ('Paper, Python with NumPy', 'ወረቀት፣ Python ከNumPy ጋር'),
  [('What does a matrix multiplication represent?', 'የማትሪክስ ብዜት ምን ይወክላል?', 'Applying one linear transformation after another; A·x combines the columns of A using the numbers in x.', 'አንድ linear ለውጥን ከሌላው በኋላ መተግበር፤ A·x የAን ዓምዶች በxውስጥ ባሉ ቁጥሮች ያጣምራል።'),
   ('When does Ax = b have no unique solution?', 'Ax = b መቼ ልዩ መፍትሔ አይኖረውም?', 'When A is singular (rank less than its size): some columns are combinations of others.', 'A singular ሲሆን (rankኡ ከመጠኑ ሲያንስ)፡ አንዳንድ ዓምዶች የሌሎች ጥምረቶች ናቸው።')],
  [flow(B('Fertilizer mix as Ax = b', 'የማዳበሪያ ቅልቅል እንደ Ax = b'), [N('A: nutrient % of each product', 'A፡ የእያንዳንዱ ምርት የንጥረ ነገር %'), N('x: kg of each product (unknown)', 'x፡ የእያንዳንዱ ምርት kg (ያልታወቀ)'), N('b: target kg of N, P, K', 'b፡ ዒላማ kg የN፣ P፣ K'), N('solve → x', 'ፍታ → x', hl=True)])],
  ex_py('''
import numpy as np
# columns: urea (46-0-0), DAP (18-46-0), MOP (0-0-60); rows: N, P2O5, K2O fraction
A = np.array([[0.46, 0.18, 0.00],
              [0.00, 0.46, 0.00],
              [0.00, 0.00, 0.60]])
b = np.array([64.0, 46.0, 30.0])            # target kg/ha of N, P2O5, K2O
x = np.linalg.solve(A, b)
for name, kg in zip(["urea", "DAP", "MOP"], x):
    print(f"{name:4s}: {kg:6.1f} kg/ha")
print("check A @ x =", (A @ x).round(1), "| rank of A:", np.linalg.matrix_rank(A))
''', B('Solving a fertilizer mix', 'የማዳበሪያ ቅልቅልን መፍታት'))),
]

# ---------------- Year 2 ----------------
Y2 = [
U(('Data structures: heaps, trees, hash tables, graphs', 'Data structures፡ heaps፣ trees፣ hash tables፣ graphs'), D,
  [('Choose a data structure from the operations a task needs', 'አንድ ተግባር ከሚያስፈልገው ተግባራት data structure መምረጥ'), ('State the cost of each operation', 'የእያንዳንዱን ተግባር ዋጋ መግለጽ')],
  [('Heaps and priority queues', 'Heaps እና priority queues'), ('Binary search trees and balancing', 'Binary search trees እና ማመጣጠን'), ('Hash tables: load factor, resizing', 'Hash tables፡ load factor፣ resizing'), ('Graphs: adjacency lists vs matrices', 'Graphs፡ adjacency lists vs matrices')],
  ('A veterinary clinic must always treat the most urgent animal next: implement the queue with a heap and compare it with a sorted list.', 'የእንስሳት ክሊኒክ ሁልጊዜ በጣም አስቸኳዩን እንስሳ ቀጥሎ ማከም አለበት፡ queueኡን በheap ተግብርና ከተደረደረ list ጋር አወዳድር።'),
  ('Python', 'Python'),
  [('Why use a heap for a priority queue?', 'ለpriority queue heap ለምን እንጠቀማለን?', 'Insert and remove-min both take O(log n), instead of O(n) for keeping a list sorted.', 'ማስገባትና ዝቅተኛውን ማስወገድ ሁለቱም O(log n) ይወስዳሉ፣ listን ተደርድሮ ለማቆየት ከሚወስደው O(n) ይልቅ።'),
   ('When is an unbalanced binary search tree slow?', 'ያልተመጣጠነ binary search tree መቼ ቀርፋፋ ነው?', 'When keys arrive in sorted order: the tree becomes a long chain and search becomes O(n).', 'keys በተደረደረ ቅደም ተከተል ሲመጡ፡ ዛፉ ረጅም ሰንሰለት ይሆናል፣ ፍለጋውም O(n) ይሆናል።')],
  [stack(B('Cost of operations', 'የተግባራት ዋጋ'), [N('Heap: push / pop-min O(log n)', 'Heap፡ push / pop-min O(log n)'), N('Balanced BST: search / insert O(log n), keeps order', 'የተመጣጠነ BST፡ ፍለጋ / ማስገባት O(log n)፣ ቅደም ተከተል ይጠብቃል'), N('Hash table: lookup O(1) on average, no order', 'Hash table፡ ፍለጋ በአማካይ O(1)፣ ቅደም ተከተል የለም'), N('Graph (adjacency list): neighbours O(degree)', 'Graph (adjacency list)፡ ጎረቤቶች O(degree)')])],
  ex_py('''
import heapq
arrivals = [(3, "goat: limping"), (1, "cow: difficult calving"), (2, "sheep: bloat"), (5, "hen: check-up"), (1, "donkey: wound")]
queue = []
for order, (urgency, case) in enumerate(arrivals):
    heapq.heappush(queue, (urgency, order, case))   # urgency 1 = most urgent; order breaks ties fairly
print("treatment order:")
while queue:
    urgency, _, case = heapq.heappop(queue)
    print(f"  urgency {urgency}: {case}")
''', B('A clinic priority queue with a heap', 'በheap የክሊኒክ priority queue'))),
U(('Algorithms: shortest paths, spanning trees, DP, greedy', 'Algorithms፡ አጭር መንገዶች፣ spanning trees፣ DP፣ greedy'), D,
  [('Apply Dijkstra, Kruskal/Prim and dynamic programming', 'Dijkstraን፣ Kruskal/Primን እና dynamic programmingን መተግበር'), ('Argue why an algorithm is correct', 'algorithm ለምን ትክክል እንደሆነ መሞገት')],
  [('Dijkstra’s shortest paths', 'የDijkstra አጭር መንገዶች'), ('Minimum spanning trees', 'Minimum spanning trees'), ('Dynamic programming: knapsack', 'Dynamic programming፡ knapsack'), ('Greedy choice and when it fails', 'Greedy ምርጫና መቼ እንደሚወድቅ')],
  ('Plan a milk-collection route: shortest road distances from a cooling centre to villages (Dijkstra), and the cheapest pipe network linking all villages (minimum spanning tree).', 'የወተት መሰብሰቢያ መንገድ አቅድ፡ ከማቀዝቀዣ ማዕከል ወደ መንደሮች ያሉ አጭር የመንገድ ርቀቶች (Dijkstra)፣ እና ሁሉንም መንደሮች የሚያገናኝ በጣም ርካሽ የቧንቧ ኔትወርክ (minimum spanning tree)።'),
  ('Python', 'Python'),
  [('Why does Dijkstra need non-negative edge weights?', 'Dijkstra ለምን አሉታዊ ያልሆኑ የጠርዝ ክብደቶች ያስፈልገዋል?', 'It finalises the closest unvisited node; a later negative edge could make a finalised distance shorter, breaking that logic.', 'ቅርብ የሆነውን ያልተጎበኘ node ያጠናቅቃል፤ በኋላ የሚመጣ አሉታዊ ጠርዝ የተጠናቀቀን ርቀት ሊያሳጥር ይችላል፤ ያንን ሎጂክ ይሰብራል።'),
   ('What makes a problem suitable for dynamic programming?', 'አንድን ችግር ለdynamic programming ተስማሚ የሚያደርገው ምንድነው?', 'Overlapping sub-problems and optimal substructure: the best answer is built from best answers to smaller problems.', 'የሚደራረቡ ንዑስ ችግሮችና optimal substructure፡ ምርጡ መልስ ከትናንሽ ችግሮች ምርጥ መልሶች ይገነባል።')],
  [tree(B('Milk-collection road network', 'የወተት መሰብሰቢያ የመንገድ ኔትወርክ'), N('Cooling centre', 'የማቀዝቀዣ ማዕከል'), [{'t': B('Village A (4 km)', 'መንደር A (4 km)'), 'kids': [{'t': B('Village C (+3 km)', 'መንደር C (+3 km)')}]}, {'t': B('Village B (2 km)', 'መንደር B (2 km)'), 'kids': [{'t': B('Village D (+6 km)', 'መንደር D (+6 km)')}]}])],
  ex_py('''
import heapq
roads = {"Centre": {"A": 4, "B": 2}, "A": {"Centre": 4, "B": 1, "C": 3}, "B": {"Centre": 2, "A": 1, "D": 6},
         "C": {"A": 3, "D": 2}, "D": {"B": 6, "C": 2}}
def dijkstra(src):
    dist, pq = {src: 0}, [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]: continue
        for v, w in roads[u].items():
            if d + w < dist.get(v, float("inf")):
                dist[v] = d + w; heapq.heappush(pq, (d + w, v))
    return dist
print("shortest km from the centre:", dijkstra("Centre"))
edges = sorted((w, u, v) for u in roads for v, w in roads[u].items() if u < v)
parent = {n: n for n in roads}
def find(x):
    while parent[x] != x: x = parent[x]
    return x
mst = []
for w, u, v in edges:                          # Kruskal: cheapest edge that joins two groups
    if find(u) != find(v): parent[find(u)] = find(v); mst.append((u, v, w))
print("cheapest network:", mst, "total", sum(w for *_, w in mst), "km")
''', B('Dijkstra and Kruskal on a milk-collection network', 'Dijkstra እና Kruskal በወተት መሰብሰቢያ ኔትወርክ ላይ'))),
U(('Complexity: P, NP and hard problems', 'Complexity፡ P፣ NP እና ከባድ ችግሮች'), D,
  [('Distinguish polynomial from exponential algorithms', 'polynomialን ከexponential algorithms መለየት'), ('Recognise NP-hard problems and practical strategies for them', 'NP-hard ችግሮችንና ለእነሱ ተግባራዊ ስልቶችን መለየት')],
  [('P and NP in plain words', 'P እና NP በቀላል ቃላት'), ('Reductions: one problem is as hard as another', 'Reductions፡ አንዱ ችግር እንደ ሌላው ከባድ ነው'), ('Brute force grows explosively', 'Brute force በፍንዳታ ያድጋል'), ('Heuristics and approximations in practice', 'በተግባር heuristics እና approximations')],
  ('Find the shortest round trip through n villages by brute force for n = 5…10, time it, and compare with the nearest-neighbour heuristic.', 'በn መንደሮች በኩል አጭሩን የደርሶ መልስ ጉዞ ለn = 5…10 በbrute force ፈልግ፣ ጊዜውን ለካ፣ ከnearest-neighbour heuristic ጋር አወዳድር።'),
  ('Python', 'Python'),
  [('What does "in NP" mean?', '«በNP ውስጥ» ማለት ምን ማለት ነው?', 'A proposed answer can be checked quickly (in polynomial time), even if finding one may be slow.', 'የቀረበ መልስ በፍጥነት (በpolynomial time) ሊፈተሽ ይችላል፣ መፈለጉ ቀርፋፋ ቢሆንም።'),
   ('What do engineers do with an NP-hard problem?', 'መሐንዲሶች NP-hard ችግርን ምን ያደርጉታል?', 'Use exact methods for small cases, and heuristics, approximation algorithms or solvers that give good answers fast for big ones.', 'ለትናንሽ ጉዳዮች ትክክለኛ ዘዴዎችን፣ ለትላልቆቹ ደግሞ በፍጥነት ጥሩ መልሶችን የሚሰጡ heuristicsን፣ approximation algorithmsን ወይም solversን ይጠቀማሉ።')],
  [stack(B('How brute force grows', 'brute force እንዴት እንደሚያድግ'), [N('n = 5: 24 routes', 'n = 5፡ 24 መንገዶች'), N('n = 10: 362,880 routes', 'n = 10፡ 362,880 መንገዶች'), N('n = 20: 1.2 × 10¹⁷ routes', 'n = 20፡ 1.2 × 10¹⁷ መንገዶች'), N('n = 60: more than atoms in the universe', 'n = 60፡ በዩኒቨርስ ካሉ አቶሞች በላይ')])],
  ex_py('''
import itertools, math, random
random.seed(4)
pts = {f"V{i}": (random.uniform(0, 30), random.uniform(0, 30)) for i in range(9)}     # villages, km
d = lambda a, b: math.dist(pts[a], pts[b])
tour_len = lambda t: sum(d(t[i], t[(i + 1) % len(t)]) for i in range(len(t)))
names = list(pts); start = names[0]
best = min(((start,) + p for p in itertools.permutations(names[1:])), key=tour_len)
route, left = [start], set(names[1:])
while left:                                            # nearest-neighbour heuristic
    nxt = min(left, key=lambda v: d(route[-1], v)); route.append(nxt); left.remove(nxt)
print(f"brute force checked {math.factorial(len(names) - 1):,} tours: best {tour_len(best):.1f} km")
print(f"nearest neighbour checked ~{len(names)**2} distances: {tour_len(route):.1f} km ({100 * (tour_len(route) / tour_len(best) - 1):.0f}% longer)")
for n in [10, 20, 60]:
    print(f"n = {n}: {math.factorial(n - 1):.2e} tours to check by brute force")
''', B('Exact search vs a heuristic for a delivery round', 'ለአቅርቦት ዙር ትክክለኛ ፍለጋ vs heuristic'))),
U(('Object-oriented design', 'Object-oriented ንድፍ'), D,
  [('Apply SOLID principles and common patterns', 'የSOLID መርሆዎችንና የተለመዱ patternsን መተግበር'), ('Sketch a design with UML before coding', 'ከኮድ በፊት ንድፍን በUML መሣል')],
  [('Single responsibility and open/closed', 'Single responsibility እና open/closed'), ('Composition over inheritance', 'Composition over inheritance'), ('Patterns: strategy, factory, observer, repository', 'Patterns፡ strategy፣ factory፣ observer፣ repository'), ('UML class and sequence sketches', 'የUML class እና sequence ንድፎች')],
  ('Design a payment module for a cooperative shop that supports cash, mobile money and credit, where adding a new method needs no change to existing code.', 'ገንዘብን፣ የሞባይል ገንዘብንና ዱቤን የሚደግፍ ለማኅበር ሱቅ የክፍያ module ንደፍ፤ አዲስ ዘዴ መጨመር በነባሩ ኮድ ላይ ምንም ለውጥ እንዳይፈልግ።'),
  ('Paper for UML, Python', 'ለUML ወረቀት፣ Python'),
  [('What does the open/closed principle say?', 'open/closed principle ምን ይላል?', 'Code should be open to extension but closed to modification: add new behaviour by adding code, not editing working code.', 'ኮድ ለማስፋፋት ክፍት ግን ለመቀየር ዝግ መሆን አለበት፡ የሚሠራውን ኮድ በማስተካከል ሳይሆን ኮድ በመጨመር አዲስ ባሕሪ ጨምር።'),
   ('Why prefer composition over inheritance?', 'ከinheritance ይልቅ compositionን ለምን እንመርጣለን?', 'Objects built from small parts are easier to change and test than deep class hierarchies that break when the base changes.', 'ከትናንሽ ክፍሎች የተገነቡ objects መሠረቱ ሲለወጥ ከሚሰበሩ ጥልቅ የclass ተዋረዶች ይልቅ ለመቀየርና ለመፈተሽ ቀላል ናቸው።')],
  [tree(B('Strategy pattern for payments', 'ለክፍያዎች strategy pattern'), N('Checkout (uses any PaymentMethod)', 'Checkout (ማንኛውንም PaymentMethod ይጠቀማል)'), [{'t': B('Cash', 'ጥሬ ገንዘብ')}, {'t': B('MobileMoney', 'MobileMoney')}, {'t': B('Credit (new: no change to Checkout)', 'Credit (አዲስ፡ በCheckout ላይ ለውጥ የለም)')}])],
  ex_py('''
from typing import Protocol
class PaymentMethod(Protocol):
    def pay(self, amount: float) -> str: ...
class Cash:
    def pay(self, amount): return f"received {amount:.0f} birr in cash"
class MobileMoney:
    def __init__(self, phone): self.phone = phone
    def pay(self, amount): return f"requested {amount:.0f} birr from {self.phone[:4]}****"
class Credit:                                   # added later: Checkout did not change
    def __init__(self, member, limit): self.member, self.limit = member, limit
    def pay(self, amount):
        return f"{amount:.0f} birr on credit for {self.member}" if amount <= self.limit else "credit limit exceeded"
class Checkout:
    def __init__(self, method: PaymentMethod): self.method = method
    def total(self, items): return sum(q * p for q, p in items)
    def complete(self, items): return self.method.pay(self.total(items))
basket = [(2, 120.0), (1, 30.0)]
for m in [Cash(), MobileMoney("0911223344"), Credit("Hana", 500), Credit("Dawit", 100)]:
    print(type(m).__name__.ljust(11), Checkout(m).complete(basket))
''', B('Strategy pattern: new payment methods without editing Checkout', 'Strategy pattern፡ Checkoutን ሳያስተካክሉ አዳዲስ የክፍያ ዘዴዎች'))),
U(('Computer architecture: pipelines and caches', 'Computer architecture፡ pipelines እና caches'), D,
  [('Explain the CPU pipeline and the memory hierarchy', 'የCPU pipelineን እና የማስታወሻ ተዋረድን ማብራራት'), ('Write cache-friendly code', 'ለcache ተስማሚ ኮድ መጻፍ')],
  [('Instruction pipeline and hazards', 'የመመሪያ pipeline እና hazards'), ('Caches: lines, hits and misses', 'Caches፡ lines፣ hits እና misses'), ('Locality: spatial and temporal', 'Locality፡ spatial እና temporal'), ('Assembly basics: what the compiler makes', 'የAssembly መሠረታዊ ነገሮች፡ compilerኡ የሚሠራው')],
  ('Simulate a small cache and measure hit rates for row-by-row and column-by-column traversal of a matrix; then time the same in C.', 'ትንሽ cache አስመስልና ማትሪክስን ረድፍ በረድፍና ዓምድ በዓምድ ሲያልፉ የhit መጠኖችን ለካ፤ ከዚያ ያንኑ በC ጊዜ ለካ።'),
  ('Python, gcc', 'Python፣ gcc'),
  [('What is a cache miss?', 'cache miss ምንድነው?', 'The data is not in the cache, so the CPU must wait for slower memory; it can cost around 100 times a hit.', 'ዳታው በcache ውስጥ የለም፤ ስለዚህ CPU ቀርፋፋውን ማስታወሻ መጠበቅ አለበት፤ ከhit 100 እጥፍ ገደማ ሊያስወጣ ይችላል።'),
   ('Why is row-by-row faster for a C array?', 'ለC array ረድፍ በረድፍ ለምን ፈጣን ነው?', 'C stores rows next to each other, so one cache line brings in the next several elements you will use.', 'C ረድፎችን እርስ በርሳቸው አጠገብ ያስቀምጣል፤ ስለዚህ አንድ የcache line የምትጠቀማቸውን ቀጣዮቹን በርካታ elements ያመጣል።')],
  [stack(B('Memory hierarchy (rough latency)', 'የማስታወሻ ተዋረድ (ግምታዊ መዘግየት)'), [N('Registers < 1 ns', 'Registers < 1 ns'), N('L1 cache ~1 ns', 'L1 cache ~1 ns'), N('L3 cache ~10 ns', 'L3 cache ~10 ns'), N('RAM ~100 ns', 'RAM ~100 ns'), N('SSD ~100,000 ns', 'SSD ~100,000 ns')])],
  ex_py('''
LINE, LINES = 8, 64                      # 8 numbers per cache line, 64 lines (direct-mapped cache)
def hit_rate(addresses):
    cache, hits = [None] * LINES, 0
    for a in addresses:
        tag, slot = a // LINE, (a // LINE) % LINES
        if cache[slot] == tag: hits += 1
        else: cache[slot] = tag
    return hits / len(addresses)
R = C = 256                               # a 256 x 256 matrix stored row by row
row_order = [r * C + c for r in range(R) for c in range(C)]
col_order = [r * C + c for c in range(C) for r in range(R)]
print(f"row-by-row hit rate:       {hit_rate(row_order):.1%}")
print(f"column-by-column hit rate: {hit_rate(col_order):.1%}")
''', B('Simulating cache hits for two loop orders', 'ለሁለት የloop ቅደም ተከተሎች የcache hitsን ማስመሰል'), B('A simple direct-mapped cache model; real CPUs have bigger, smarter caches, but the gap between the two orders is real and easy to time in C.', 'ቀላል direct-mapped cache ሞዴል፤ እውነተኛ CPUs ትልቅና ብልህ caches አሏቸው፤ ግን በሁለቱ ቅደም ተከተሎች መካከል ያለው ልዩነት እውነተኛና በC ለመለካት ቀላል ነው።'))),
U(('Probability, statistics and linear algebra II', 'ፕሮባቢሊቲ፣ ስታቲስቲክስና linear algebra II'), D,
  [('Use distributions, expectation and estimation', 'distributionsን፣ expectationን እና estimationን መጠቀም'), ('Compute and interpret eigenvalues and eigenvectors', 'eigenvaluesን እና eigenvectorsን ማስላትና መተርጎም')],
  [('Random variables, expectation, variance', 'Random variables፣ expectation፣ variance'), ('Binomial, Poisson, normal; the central limit theorem', 'Binomial፣ Poisson፣ normal፤ central limit theorem'), ('Estimation and confidence intervals', 'Estimation እና confidence intervals'), ('Eigenvalues: long-run behaviour of a system', 'Eigenvalues፡ የአንድ ሥርዓት የረጅም ጊዜ ባሕሪ')],
  ('Model a herd with a stage matrix (calves, heifers, cows): find the long-run growth rate and stage mix from its leading eigenvalue and eigenvector, and check by simulation.', 'መንጋን በደረጃ ማትሪክስ (ጥጆች፣ ጊደሮች፣ ላሞች) ሞዴል አድርግ፡ የረጅም ጊዜ የዕድገት መጠኑንና የደረጃ ቅልቅሉን ከመሪ eigenvalue እና eigenvectorኡ ፈልግ፣ በሲሙሌሽንም ፈትሽ።'),
  ('Python with NumPy', 'Python ከNumPy ጋር'),
  [('What is the expected value of a dice roll?', 'የዳይስ መጣል expected value ምንድነው?', '(1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5.', '(1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5።'),
   ('What does the leading eigenvalue of a herd matrix tell you?', 'የመንጋ ማትሪክስ መሪ eigenvalue ምን ይነግርሃል?', 'The long-run growth factor per year: above 1 the herd grows, below 1 it shrinks; its eigenvector gives the stable stage mix.', 'በዓመት የረጅም ጊዜ የዕድገት ምክንያት፡ ከ1 በላይ ከሆነ መንጋው ያድጋል፣ ከ1 በታች ከሆነ ይቀንሳል፤ eigenvectorኡ የተረጋጋውን የደረጃ ቅልቅል ይሰጣል።')],
  [flow(B('A herd as a matrix', 'መንጋ እንደ ማትሪክስ'), [N('calves → heifers', 'ጥጆች → ጊደሮች', '70% survive', '70% ይተርፋሉ'), N('heifers → cows', 'ጊደሮች → ላሞች', '80%', '80%'), N('cows → calves', 'ላሞች → ጥጆች', '0.45 female calves per cow', 'በላም 0.45 ሴት ጥጆች'), N('growth = leading eigenvalue', 'ዕድገት = መሪ eigenvalue', hl=True)])],
  ex_py('''
import numpy as np
L = np.array([[0.0, 0.0, 0.45],      # new female calves per cow
              [0.70, 0.0, 0.0],      # calves surviving to heifers
              [0.0, 0.80, 0.90]])    # heifers becoming cows, cows staying
vals, vecs = np.linalg.eig(L)
k = np.argmax(vals.real); lam = vals[k].real; mix = np.abs(vecs[:, k].real); mix /= mix.sum()
print(f"growth factor per year: {lam:.3f} ({100 * (lam - 1):+.1f}% a year)")
print("stable mix calves/heifers/cows:", mix.round(2))
herd = np.array([20.0, 15.0, 40.0])
for year in range(30): herd = L @ herd
print("after 30 years of simulation, mix:", (herd / herd.sum()).round(2))
rng = np.random.default_rng(0)
means = rng.integers(1, 7, (10000, 30)).mean(axis=1)            # central limit theorem
print(f"mean of 30 dice: average {means.mean():.2f}, spread {means.std():.2f} (theory {np.sqrt(35 / 12 / 30):.2f})")
''', B('Herd growth from an eigenvalue, and the central limit theorem', 'የመንጋ ዕድገት ከeigenvalue፣ እና central limit theorem'))),
]

# ---------------- Year 3 ----------------
Y3 = [
U(('Operating systems: processes, threads, scheduling', 'Operating systems፡ processes፣ threads፣ scheduling'), D,
  [('Explain processes, threads and scheduling policies', 'processesን፣ threadsን እና የscheduling ፖሊሲዎችን ማብራራት'), ('Compare schedulers by waiting time', 'schedulersን በመጠበቂያ ጊዜ ማወዳደር')],
  [('Processes vs threads; context switches', 'Processes vs threads፤ context switches'), ('Scheduling: FCFS, shortest job first, round robin', 'Scheduling፡ FCFS፣ shortest job first፣ round robin'), ('Synchronisation: locks and race conditions', 'Synchronisation፡ locks እና race conditions'), ('Virtual memory and files', 'Virtual memory እና ፋይሎች')],
  ('Simulate three schedulers on the same set of jobs (a lab’s analysis queue) and recommend one for short interactive jobs mixed with long batch jobs.', 'በተመሳሳይ የስራዎች ስብስብ (የላብራቶሪ የትንተና ወረፋ) ላይ ሦስት schedulersን አስመስልና ለረጅም batch ስራዎች ከተቀላቀሉ አጭር በይነተገናኝ ስራዎች አንዱን ምከር።'),
  ('Python', 'Python'),
  [('What is the difference between a process and a thread?', 'በprocess እና በthread መካከል ያለው ልዩነት ምንድነው?', 'A process has its own memory; threads inside one process share memory, so they are cheaper but need locks.', 'process የራሱ ማስታወሻ አለው፤ በአንድ process ውስጥ ያሉ threads ማስታወሻ ይጋራሉ፤ ስለዚህ ርካሽ ናቸው ግን locks ያስፈልጋቸዋል።'),
   ('Why does round robin help interactive jobs?', 'round robin በይነተገናኝ ስራዎችን ለምን ይረዳል?', 'Every job gets a short turn soon, so a quick job is not stuck behind a long one.', 'እያንዳንዱ ሥራ በቅርቡ አጭር ተራ ያገኛል፤ ስለዚህ ፈጣን ሥራ ከረጅም ሥራ ጀርባ አይቀረቀርም።')],
  [compare(B('Three schedulers', 'ሦስት schedulers'), [col(B('FCFS', 'FCFS'), ['simple, fair in order', 'short jobs wait behind long ones'], ['ቀላል፣ በቅደም ተከተል ፍትሐዊ', 'አጭር ስራዎች ከረጅሞቹ ጀርባ ይጠብቃሉ'], 'bad'), col(B('Shortest job first', 'Shortest job first'), ['lowest average wait', 'needs job lengths; long jobs can starve'], ['ዝቅተኛ አማካይ መጠበቂያ', 'የሥራ ርዝመቶችን ይፈልጋል፤ ረጅም ስራዎች ሊራቡ ይችላሉ']), col(B('Round robin', 'Round robin'), ['time slices for everyone', 'good response for interactive work'], ['ለሁሉም የጊዜ ክፍሎች', 'ለበይነተገናኝ ሥራ ጥሩ ምላሽ'], 'good')])],
  ex_py('''
jobs = [("genome-align", 40), ("plot", 3), ("report", 5), ("qc", 2), ("model-fit", 25)]   # all arrive at t = 0
def fcfs(js):
    t, waits = 0, {}
    for name, burst in js: waits[name] = t; t += burst
    return waits
def sjf(js): return fcfs(sorted(js, key=lambda j: j[1]))
def round_robin(js, q=4):
    left, t, finish = dict(js), 0, {}
    while left:
        for name in list(left):
            run = min(q, left[name]); t += run; left[name] -= run
            if left[name] == 0: finish[name] = t; del left[name]
    return {n: finish[n] - b for n, b in js}           # waiting = finish - burst
for name, f in [("FCFS", fcfs), ("SJF", sjf), ("Round robin q=4", round_robin)]:
    w = f(jobs)
    print(f"{name:16s} average wait {sum(w.values()) / len(w):5.1f}  | 'qc' waits {w['qc']:3d}  'genome-align' waits {w['genome-align']:3d}")
''', B('Comparing schedulers on a lab job queue', 'በላብራቶሪ የሥራ ወረፋ ላይ schedulersን ማወዳደር'))),
U(('Databases: indexes, transactions, query plans', 'ዳታቤዞች፡ indexes፣ transactions፣ query plans'), D,
  [('Speed up queries with indexes and read query plans', 'queriesን በindexes ማፋጠንና query plansን ማንበብ'), ('Keep data consistent with transactions', 'ዳታን በtransactions ወጥ አድርጎ ማቆየት')],
  [('B-tree indexes', 'B-tree indexes'), ('EXPLAIN QUERY PLAN', 'EXPLAIN QUERY PLAN'), ('Transactions: ACID', 'Transactions፡ ACID'), ('Isolation and concurrent users', 'Isolation እና በአንድ ጊዜ ያሉ ተጠቃሚዎች')],
  ('Load 200,000 milk-delivery records into SQLite, time a query before and after adding an index, and implement a payment transfer that cannot half-complete.', '200,000 የወተት አቅርቦት መዝገቦችን ወደ SQLite ጫን፣ index ከመጨመርህ በፊትና በኋላ queryን ጊዜ ለካ፣ በግማሽ ሊጠናቀቅ የማይችል የክፍያ ዝውውርም ተግብር።'),
  ('Python with sqlite3', 'Python ከsqlite3 ጋር'),
  [('Why are database transactions needed?', 'የዳታቤዝ transactions ለምን ያስፈልጋሉ?', 'So a group of changes happens completely or not at all, even if the program crashes halfway.', 'የለውጦች ቡድን ሙሉ በሙሉ እንዲሆን ወይም በፍጹም እንዳይሆን፣ ፕሮግራሙ በግማሽ ቢወድቅም።'),
   ('What does an index cost?', 'index ምን ያስወጣል?', 'Extra storage and slower inserts and updates, because the index must be kept up to date.', 'ተጨማሪ ማከማቻና ቀርፋፋ ማስገባቶችና ማዘመኛዎች፣ indexኡ ወቅታዊ መሆን ስላለበት።')],
  [flow(B('A transfer that is all-or-nothing', 'ሁሉም-ወይም-ምንም የሆነ ዝውውር'), [N('BEGIN', 'BEGIN'), N('debit the cooperative', 'ከማኅበሩ ቀንስ'), N('credit the farmer', 'ለገበሬው ጨምር'), N('COMMIT, or ROLLBACK on error', 'COMMIT፣ ወይም በስህተት ROLLBACK', hl=True)])],
  ex_py('''
import sqlite3, random, time
db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE deliveries(farmer INTEGER, day INTEGER, litres REAL)")
random.seed(0)
db.executemany("INSERT INTO deliveries VALUES (?,?,?)", ((random.randint(1, 5000), random.randint(1, 365), random.uniform(2, 20)) for _ in range(200_000)))
q = "SELECT SUM(litres) FROM deliveries WHERE farmer = 1234"
plan = lambda: db.execute("EXPLAIN QUERY PLAN " + q).fetchone()[-1]
t = time.perf_counter(); db.execute(q).fetchone(); before = time.perf_counter() - t; p1 = plan()
db.execute("CREATE INDEX idx_farmer ON deliveries(farmer)")
t = time.perf_counter(); db.execute(q).fetchone(); after = time.perf_counter() - t; p2 = plan()
print(f"before index: {p1}  ({before * 1000:.1f} ms)")
print(f"after index:  {p2}  ({after * 1000:.2f} ms)")
db.executescript("CREATE TABLE accounts(name TEXT PRIMARY KEY, birr REAL CHECK (birr >= 0)); INSERT INTO accounts VALUES ('coop', 1000), ('Hana', 0);")
try:
    with db:                                     # one transaction
        db.execute("UPDATE accounts SET birr = birr + 1500 WHERE name = 'Hana'")
        db.execute("UPDATE accounts SET birr = birr - 1500 WHERE name = 'coop'")   # violates CHECK
except sqlite3.IntegrityError as e:
    print("transfer rolled back:", e)
print("balances:", db.execute("SELECT * FROM accounts").fetchall())
''', B('An index changes the query plan; a transaction rolls back', 'index የquery planን ይቀይራል፤ transaction ይመለሳል'), B('Times vary by computer; the change from SCAN to SEARCH USING INDEX is the point.', 'ጊዜዎች በኮምፒውተር ይለያያሉ፤ ዋናው ነጥብ ከSCAN ወደ SEARCH USING INDEX ያለው ለውጥ ነው።'))),
U(('Networks: TCP/IP, routing, DNS, mobile', 'ኔትወርኮች፡ TCP/IP፣ routing፣ DNS፣ ሞባይል'), D,
  [('Explain the layers from Wi-Fi/4G to HTTP', 'ከWi-Fi/4G እስከ HTTP ያሉትን ንብርብሮች ማብራራት'), ('Work with IP addresses, subnets and routing tables', 'ከIP አድራሻዎች፣ ከsubnets እና ከrouting tables ጋር መሥራት')],
  [('Layers and encapsulation', 'ንብርብሮችና encapsulation'), ('IP addressing and subnets (CIDR)', 'IP addressing እና subnets (CIDR)'), ('Routing: longest-prefix match', 'Routing፡ longest-prefix match'), ('TCP vs UDP; DNS; mobile networks and latency', 'TCP vs UDP፤ DNS፤ የሞባይል ኔትወርኮችና መዘግየት')],
  ('Plan the network for a university campus with 6 departments: assign subnets, write a routing table and test which route each address takes.', 'ለ6 ዲፓርትመንቶች ላለው የዩኒቨርሲቲ ግቢ ኔትወርኩን አቅድ፡ subnets መድብ፣ routing table ጻፍ፣ እያንዳንዱ አድራሻ የትኛውን መንገድ እንደሚወስድ ፈትሽ።'),
  ('Python (ipaddress module), paper', 'Python (ipaddress module)፣ ወረቀት'),
  [('Why does a router use the longest matching prefix?', 'router ለምን ረጅሙን ተዛማጅ prefix ይጠቀማል?', 'The longest prefix is the most specific route, so traffic goes to the exact subnet rather than a general default.', 'ረጅሙ prefix በጣም የተወሰነው መንገድ ነው፤ ስለዚህ ትራፊኩ ከአጠቃላይ ነባሪ ይልቅ ወደ ትክክለኛው subnet ይሄዳል።'),
   ('When would you choose UDP over TCP?', 'ከTCP ይልቅ UDPን መቼ ትመርጣለህ?', 'For live voice, video or sensor streams where a late packet is useless, so speed matters more than guaranteed delivery.', 'የዘገየ packet ጥቅም ለሌለበት ቀጥታ ድምፅ፣ ቪዲዮ ወይም የሴንሰር ዥረቶች፣ ፍጥነት ከተረጋገጠ አቅርቦት በላይ ሲያስፈልግ።')],
  [stack(B('Encapsulation', 'Encapsulation'), [N('HTTP request', 'HTTP ጥያቄ', 'application', 'application'), N('+ TCP header (ports)', '+ TCP header (ports)', 'transport', 'transport'), N('+ IP header (addresses)', '+ IP header (አድራሻዎች)', 'network', 'network'), N('+ Wi-Fi / 4G frame', '+ Wi-Fi / 4G frame', 'link', 'link')])],
  ex_py('''
import ipaddress
campus = ipaddress.ip_network("10.20.0.0/16")
subnets = list(campus.subnets(new_prefix=19))[:6]
depts = ["Agriculture", "Engineering", "Medicine", "Science", "Business", "Library"]
for d, s in zip(depts, subnets):
    print(f"{d:12s} {s}  ({s.num_addresses - 2:,} hosts)")
table = {ipaddress.ip_network("10.20.0.0/19"): "Agriculture switch", ipaddress.ip_network("10.20.0.0/16"): "campus core",
         ipaddress.ip_network("10.20.4.0/24"): "Agri greenhouse sensors", ipaddress.ip_network("0.0.0.0/0"): "internet (default)"}
def route(addr):
    a = ipaddress.ip_address(addr)
    best = max((n for n in table if a in n), key=lambda n: n.prefixlen)     # longest-prefix match
    return f"{addr:13s} -> {table[best]} via {best}"
for addr in ["10.20.4.17", "10.20.9.3", "10.20.200.8", "196.188.0.1"]:
    print(route(addr))
''', B('Subnets and longest-prefix routing', 'Subnets እና longest-prefix routing'))),
U(('Compilers: from text to running code', 'Compilers፡ ከጽሑፍ ወደ የሚሠራ ኮድ'), D,
  [('Describe lexing, parsing and code generation', 'lexingን፣ parsingን እና code generationን መግለጽ'), ('Build a tiny expression compiler', 'ትንሽ የexpression compiler መገንባት')],
  [('Tokens and the lexer', 'Tokens እና lexer'), ('Grammars and recursive-descent parsing', 'Grammars እና recursive-descent parsing'), ('Abstract syntax trees', 'Abstract syntax trees'), ('Generating stack-machine code', 'የstack-machine ኮድ ማመንጨት')],
  ('Write a compiler for arithmetic expressions with variables that outputs instructions for a stack machine, and an interpreter that runs them.', 'ከvariables ጋር ለሒሳብ expressions የstack machine መመሪያዎችን የሚያወጣ compiler እና የሚያስኬዳቸው interpreter ጻፍ።'),
  ('Python', 'Python'),
  [('What does the parser produce?', 'parserኡ ምን ያወጣል?', 'An abstract syntax tree showing the structure of the expression, with operator precedence resolved.', 'የoperator ቅድሚያ የተፈታበት የexpressionኡን መዋቅር የሚያሳይ abstract syntax tree።'),
   ('How does the grammar make × bind tighter than +?', 'grammarኡ × ከ+ በበለጠ እንዲያይዝ እንዴት ያደርጋል?', 'It has separate rules: an expression is a sum of terms, and a term is a product of factors, so products are grouped first.', 'የተለያዩ ሕጎች አሉት፡ expression የterms ድምር ነው፣ term ደግሞ የfactors ብዜት ነው፤ ስለዚህ ብዜቶች መጀመሪያ ይቧደናሉ።')],
  [flow(B('Compiler pipeline', 'የcompiler pipeline'), [N('"yield * (1 + bonus)"', '"yield * (1 + bonus)"'), N('Lexer → tokens', 'Lexer → tokens'), N('Parser → tree', 'Parser → ዛፍ'), N('Code generator → PUSH, ADD, MUL', 'Code generator → PUSH፣ ADD፣ MUL', hl=True)])],
  ex_py('''
import re
def lex(s): return re.findall(r"\\d+\\.?\\d*|[A-Za-z_]\\w*|[-+*/()]", s)
def parse(tokens):
    pos = 0
    def peek(): return tokens[pos] if pos < len(tokens) else None
    def take():
        nonlocal pos; pos += 1; return tokens[pos - 1]
    def factor():
        t = take()
        if t == "(":
            e = expr(); take(); return e
        return ("num", float(t)) if t[0].isdigit() else ("var", t)
    def term():
        node = factor()
        while peek() in ("*", "/"): node = (take(), node, factor())
        return node
    def expr():
        node = term()
        while peek() in ("+", "-"): node = (take(), node, term())
        return node
    return expr()
def gen(n):
    if n[0] == "num": return [("PUSH", n[1])]
    if n[0] == "var": return [("LOAD", n[1])]
    return gen(n[1]) + gen(n[2]) + [({"+": "ADD", "-": "SUB", "*": "MUL", "/": "DIV"}[n[0]], None)]
def run(code, env):
    st = []
    for op, arg in code:
        if op == "PUSH": st.append(arg)
        elif op == "LOAD": st.append(env[arg])
        else:
            b, a = st.pop(), st.pop()
            st.append({"ADD": a + b, "SUB": a - b, "MUL": a * b, "DIV": a / b}[op])
    return st[0]
src = "yield * (1 + bonus) - 2 * cost"
tree = parse(lex(src)); code = gen(tree)
print("tokens:", lex(src)); print("tree:", tree)
print("code:", [f"{op} {arg}" if arg is not None else op for op, arg in code])
print("result:", run(code, {"yield": 1.6, "bonus": 0.25, "cost": 0.3}))
''', B('A tiny compiler: lexer, parser, code generator, stack machine', 'ትንሽ compiler፡ lexer፣ parser፣ code generator፣ stack machine'))),
U(('Theory of computation', 'የcomputation ቲዎሪ'), D,
  [('Build finite automata and explain their limits', 'finite automataን መገንባትና ገደቦቻቸውን ማብራራት'), ('Explain Turing machines and undecidable problems', 'Turing machinesን እና የማይወሰኑ ችግሮችን ማብራራት')],
  [('Finite automata and regular expressions', 'Finite automata እና regular expressions'), ('What finite memory cannot do', 'ውሱን ማስታወሻ የማይችለው'), ('Turing machines', 'Turing machines'), ('The halting problem', 'Halting problem')],
  ('Design an automaton that accepts binary numbers divisible by 3, test it on many inputs, and write the proof sketch that no program can decide halting for all programs.', 'በ3 የሚካፈሉ የbinary ቁጥሮችን የሚቀበል automaton ንደፍ፣ በብዙ ግብዓቶች ፈትሸው፣ ማንም ፕሮግራም ለሁሉም ፕሮግራሞች halting መወሰን እንደማይችል የማረጋገጫ ንድፉን ጻፍ።'),
  ('Paper, Python', 'ወረቀት፣ Python'),
  [('Is every problem computable? Give an example.', 'እያንዳንዱ ችግር ሊሰላ ይችላል? ምሳሌ ስጥ።', 'No. The halting problem: no algorithm can decide, for every program and input, whether it eventually stops.', 'አይደለም። Halting problem፡ ለእያንዳንዱ ፕሮግራምና ግብዓት በመጨረሻ ይቆማል ወይ ብሎ ሊወስን የሚችል algorithm የለም።'),
   ('Why can’t a finite automaton check balanced brackets of any depth?', 'finite automaton የማንኛውም ጥልቀት የተመጣጠኑ ቅንፎችን ለምን መፈተሽ አይችልም?', 'It has a fixed number of states, so it cannot count arbitrarily deep nesting; that needs a stack (a pushdown automaton).', 'የተወሰነ ቁጥር states አለው፤ ስለዚህ በዘፈቀደ ጥልቀት ያለ መደራረብን መቁጠር አይችልም፤ ያ stack (pushdown automaton) ይፈልጋል።')],
  [cycle(B('DFA: remainder mod 3 while reading bits', 'DFA፡ bits እያነበበ ቀሪ mod 3'), [N('state 0 (accept)', 'state 0 (ተቀበል)', 'bit b → (2·0 + b) mod 3', 'bit b → (2·0 + b) mod 3', hl=True), N('state 1', 'state 1', 'b → (2 + b) mod 3', 'b → (2 + b) mod 3'), N('state 2', 'state 2', 'b → (4 + b) mod 3', 'b → (4 + b) mod 3')], loop=B('one transition per input bit', 'ለእያንዳንዱ የግብዓት bit አንድ ሽግግር'))],
  ex_py('''
DELTA = {(s, b): (2 * s + b) % 3 for s in range(3) for b in (0, 1)}     # the transition table
def accepts(bits):
    s = 0
    for ch in bits: s = DELTA[(s, int(ch))]
    return s == 0
tests = [format(n, "b") for n in range(0, 40)]
assert all(accepts(b) == (int(b, 2) % 3 == 0) for b in tests)            # checked against arithmetic
print("accepted (divisible by 3):", [int(b, 2) for b in tests if accepts(b)])
print("transition table:", DELTA)
''', B('A 3-state automaton for "divisible by 3"', 'ለ«በ3 የሚካፈል» ባለ 3-state automaton'), B('Halting, in one paragraph: if a program H(p) could always decide whether p halts, build D that runs H on itself and does the opposite; D halts if and only if it does not, a contradiction.', 'Halting በአንድ አንቀጽ፡ ፕሮግራም H(p) p ይቆማል ወይ ብሎ ሁልጊዜ መወሰን ቢችል፣ Hን በራሱ ላይ የሚያስኬድና ተቃራኒውን የሚያደርግ Dን ገንባ፤ D የሚቆመው ካልቆመ ብቻ ነው፣ ይህም ተቃርኖ ነው።'))),
U(('Optimisation and numerical methods', 'Optimisation እና numerical methods'), D,
  [('Fit models by minimising error with gradient descent', 'በgradient descent ስህተትን በመቀነስ ሞዴሎችን መግጠም'), ('Understand floating-point error and conditioning', 'የfloating-point ስህተትንና conditioningን መረዳት')],
  [('Gradient descent and the learning rate', 'Gradient descent እና learning rate'), ('Newton’s method and convergence speed', 'የNewton ዘዴና የconvergence ፍጥነት'), ('Floating point: rounding and cancellation', 'Floating point፡ rounding እና cancellation'), ('Ill-conditioned problems', 'Ill-conditioned ችግሮች')],
  ('Fit a straight line to yield data by gradient descent with three learning rates (too small, good, too large) and compare with the exact least-squares solution.', 'በሦስት learning rates (በጣም ትንሽ፣ ጥሩ፣ በጣም ትልቅ) በgradient descent ቀጥ ያለ መስመርን ለምርት ዳታ ግጠም፣ ከትክክለኛው least-squares መፍትሔ ጋር አወዳድር።'),
  ('Python with NumPy', 'Python ከNumPy ጋር'),
  [('What happens if the learning rate is too large?', 'learning rate በጣም ትልቅ ከሆነ ምን ይሆናል?', 'Steps overshoot the minimum and the error grows or oscillates instead of falling.', 'እርምጃዎች ዝቅተኛውን አልፈው ይሄዳሉ፤ ስህተቱም ከመቀነስ ይልቅ ያድጋል ወይም ይወዛወዛል።'),
   ('Why is 0.1 + 0.2 not exactly 0.3 in a computer?', 'በኮምፒውተር ውስጥ 0.1 + 0.2 በትክክል 0.3 ለምን አይሆንም?', 'Most decimals cannot be stored exactly in binary, so tiny rounding errors appear; compare floats with a tolerance.', 'አብዛኞቹ decimals በbinary በትክክል ሊቀመጡ አይችሉም፤ ስለዚህ ትናንሽ የrounding ስህተቶች ይታያሉ፤ floatsን በtolerance አወዳድር።')],
  [compare(B('Learning rate', 'Learning rate'), [col(B('Too small', 'በጣም ትንሽ'), ['safe but very slow'], ['ደህንነቱ የተጠበቀ ግን በጣም ቀርፋፋ'], 'bad'), col(B('Good', 'ጥሩ'), ['fast, steady decrease'], ['ፈጣን፣ የተረጋጋ ቅነሳ'], 'good'), col(B('Too large', 'በጣም ትልቅ'), ['overshoots, diverges'], ['ያልፋል፣ ይበተናል'], 'bad')])],
  ex_py('''
import numpy as np
rng = np.random.default_rng(1)
N = rng.uniform(0, 1.5, 60)                  # nitrogen, hundreds of kg/ha
Y = 1.8 + 1.2 * N + rng.normal(0, 0.25, 60)  # yield t/ha
exact = np.polyfit(N, Y, 1)[::-1]            # [intercept, slope]
for lr in [0.01, 0.3, 1.2]:
    a = b = 0.0
    for _ in range(300):
        err = a + b * N - Y
        a -= lr * 2 * err.mean(); b -= lr * 2 * (err * N).mean()
    mse = np.mean((a + b * N - Y) ** 2)
    print(f"lr = {lr:4}: intercept {a:9.3g}, slope {b:9.3g}, error {mse:9.3g}")
print(f"exact least squares: intercept {exact[0]:.3f}, slope {exact[1]:.3f}")
print("0.1 + 0.2 == 0.3?", 0.1 + 0.2 == 0.3, "| close enough?", abs(0.1 + 0.2 - 0.3) < 1e-12)
''', B('Gradient descent with three learning rates', 'Gradient descent ከሦስት learning rates ጋር'))),
]

# ---------------- AI in year 3 ----------------
AI = [
U(('AI search: BFS, DFS, A*, games', 'AI search፡ BFS፣ DFS፣ A*፣ ጨዋታዎች'), DA,
  [('Formulate problems as states, actions and goals', 'ችግሮችን እንደ states፣ actions እና goals መቅረጽ'), ('Compare uninformed and heuristic search', 'uninformed እና heuristic searchን ማወዳደር')],
  [('State spaces', 'State spaces'), ('BFS and DFS', 'BFS እና DFS'), ('A* with an admissible heuristic', 'A* ከadmissible heuristic ጋር'), ('Minimax for two-player games', 'ለሁለት ተጫዋቾች ጨዋታዎች Minimax')],
  ('Plan a drone’s path across a field map with obstacles using BFS and A*, and count how many cells each explores.', 'እንቅፋቶች ባሉበት የማሳ ካርታ ላይ የድሮንን መንገድ በBFS እና በA* አቅድ፣ እያንዳንዱ ስንት ሴሎችን እንደሚያስስ ቁጠር።'),
  ('Python', 'Python'),
  [('Why does A* need a good heuristic?', 'A* ለምን ጥሩ heuristic ያስፈልገዋል?', 'The heuristic guides it towards the goal; an admissible one keeps the path optimal while exploring far fewer states.', 'heuristicኡ ወደ ግቡ ይመራዋል፤ admissible የሆነ heuristic በጣም ጥቂት states እያሰሰ መንገዱን ምርጥ ያደርገዋል።'),
   ('What does "admissible" mean?', '«admissible» ማለት ምን ማለት ነው?', 'The heuristic never overestimates the true remaining cost.', 'heuristicኡ እውነተኛውን የቀረ ዋጋ በፍጹም አያጋንንም።')],
  [flow(B('A*: f = g + h', 'A*፡ f = g + h'), [N('g: cost so far', 'g፡ እስካሁን ያለ ዋጋ'), N('h: estimate to goal', 'h፡ እስከ ግቡ ግምት', 'Manhattan distance', 'Manhattan distance'), N('expand lowest f', 'ዝቅተኛ fን አስፋ'), N('goal: optimal path', 'ግብ፡ ምርጥ መንገድ', hl=True)])],
  ex_py('''
import heapq
from collections import deque
grid = ["S...................",
        "....................",
        "........##..........",
        "........##..........",
        "....................",
        "..............###...",
        "...................G",
        "...................."]
R, C = len(grid), len(grid[0])
find = lambda ch: next((r, c) for r in range(R) for c in range(C) if grid[r][c] == ch)
start, goal = find("S"), find("G")
def nbrs(p):
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        r, c = p[0] + dr, p[1] + dc
        if 0 <= r < R and 0 <= c < C and grid[r][c] != "#": yield (r, c)
def bfs():
    seen, q = {start: 0}, deque([start])
    while q:
        p = q.popleft()
        if p == goal: return seen[p], len(seen)
        for n in nbrs(p):
            if n not in seen: seen[n] = seen[p] + 1; q.append(n)
def astar():
    h = lambda p: abs(p[0] - goal[0]) + abs(p[1] - goal[1])
    g, pq, expanded = {start: 0}, [(h(start), h(start), start)], set()
    while pq:
        _, _, p = heapq.heappop(pq)
        if p in expanded: continue
        expanded.add(p)
        if p == goal: return g[p], len(expanded)
        for n in nbrs(p):
            if g[p] + 1 < g.get(n, 1e9): g[n] = g[p] + 1; heapq.heappush(pq, (g[n] + h(n), h(n), n))   # ties: prefer closer to goal
print("BFS: path length %d, cells visited %d" % bfs())
print("A*:  path length %d, cells expanded %d" % astar())
''', B('BFS vs A* on a field map', 'BFS vs A* በማሳ ካርታ ላይ'))),
U(('Logic, planning and constraint satisfaction', 'ሎጂክ፣ ዕቅድና constraint satisfaction'), DA,
  [('Represent knowledge as constraints', 'ዕውቀትን እንደ constraints መወከል'), ('Solve constraint problems with backtracking', 'የconstraint ችግሮችን በbacktracking መፍታት')],
  [('Propositional and first-order logic', 'Propositional እና first-order logic'), ('Constraint satisfaction: variables, domains, constraints', 'Constraint satisfaction፡ variables፣ domains፣ constraints'), ('Backtracking with forward checking', 'Backtracking ከforward checking ጋር'), ('Planning: actions with preconditions and effects', 'ዕቅድ፡ ከቅድመ ሁኔታዎችና ከውጤቶች ጋር ያሉ ተግባራት')],
  ('Assign crops to six plots so that neighbouring plots do not grow the same crop family (to limit pests) and the cooperative’s minimum teff area is met.', 'የተባይ ስርጭትን ለመገደብ ጎረቤት ማሳዎች ተመሳሳይ የሰብል ቤተሰብ እንዳያበቅሉና የማኅበሩ ዝቅተኛ የጤፍ ስፋት እንዲሟላ ሰብሎችን ለስድስት ማሳዎች መድብ።'),
  ('Python', 'Python'),
  [('What are the three parts of a constraint satisfaction problem?', 'የconstraint satisfaction ችግር ሦስቱ ክፍሎች ምንድናቸው?', 'Variables (the plots), domains (possible crops for each) and constraints (rules between them).', 'Variables (ማሳዎቹ)፣ domains (ለእያንዳንዱ ሊሆኑ የሚችሉ ሰብሎች) እና constraints (በመካከላቸው ያሉ ሕጎች)።'),
   ('What does backtracking do when it hits a dead end?', 'backtracking የማይወጣበት ቦታ ሲደርስ ምን ያደርጋል?', 'It undoes the most recent choice and tries the next value, instead of starting over.', 'እንደገና ከመጀመር ይልቅ የቅርብ ጊዜውን ምርጫ ይቀለብሳልና ቀጣዩን እሴት ይሞክራል።')],
  [tree(B('Six plots and their neighbours', 'ስድስት ማሳዎችና ጎረቤቶቻቸው'), N('P1', 'P1'), [{'t': B('P2 (borders P1, P3, P5)', 'P2 (ከP1፣ P3፣ P5 ጋር ይዋሰናል)')}, {'t': B('P4 (borders P1, P5)', 'P4 (ከP1፣ P5 ጋር ይዋሰናል)')}, {'t': B('P6 (borders P3, P5)', 'P6 (ከP3፣ P5 ጋር ይዋሰናል)')}])],
  ex_py('''
plots = ["P1", "P2", "P3", "P4", "P5", "P6"]
borders = {("P1", "P2"), ("P1", "P4"), ("P2", "P3"), ("P2", "P5"), ("P4", "P5"), ("P3", "P6"), ("P5", "P6")}
family = {"teff": "grass", "maize": "grass", "faba bean": "legume", "chickpea": "legume", "potato": "solanum"}
adj = lambda a, b: (a, b) in borders or (b, a) in borders
steps = 0
def ok(plan, plot, crop):
    return all(not (adj(plot, q) and family[c] == family[crop]) for q, c in plan.items())
def solve(plan):
    global steps; steps += 1
    if len(plan) == len(plots):
        return plan if sum(c == "teff" for c in plan.values()) >= 2 else None   # global constraint
    plot = plots[len(plan)]
    for crop in family:
        if ok(plan, plot, crop):
            result = solve({**plan, plot: crop})
            if result: return result
    return None                                                                  # backtrack
plan = solve({})
print(plan); print("search steps:", steps)
''', B('Backtracking a crop plan', 'የሰብል ዕቅድን በbacktracking'))),
U(('Linear and logistic regression from scratch', 'Linear እና logistic regression ከመነሻ'), DA,
  [('Derive and implement least squares and logistic regression', 'least squaresን እና logistic regressionን ማውጣትና መተግበር'), ('Interpret coefficients and probabilities', 'coefficientsን እና ፕሮባቢሊቲዎችን መተርጎም')],
  [('Least squares: normal equations', 'Least squares፡ normal equations'), ('Logistic regression: sigmoid and log-loss', 'Logistic regression፡ sigmoid እና log-loss'), ('Gradient descent implementation', 'የgradient descent ትግበራ'), ('Check against scikit-learn', 'ከscikit-learn ጋር ፈትሽ')],
  ('Predict whether a farmer adopts improved seed from farm size and extension visits; implement logistic regression in NumPy and confirm the coefficients with scikit-learn.', 'ገበሬ የተሻሻለ ዘር እንደሚቀበል ከእርሻ መጠንና ከኤክስቴንሽን ጉብኝቶች ተንብይ፤ logistic regressionን በNumPy ተግብርና coefficientsን በscikit-learn አረጋግጥ።'),
  ('Python with NumPy and scikit-learn', 'Python ከNumPy እና scikit-learn ጋር'),
  [('Why use the sigmoid in logistic regression?', 'በlogistic regression ውስጥ sigmoid ለምን እንጠቀማለን?', 'It turns any number into a probability between 0 and 1.', 'ማንኛውንም ቁጥር በ0 እና በ1 መካከል ወዳለ ፕሮባቢሊቲ ይቀይራል።'),
   ('How do you read a logistic coefficient of 0.7 for extension visits?', 'ለኤክስቴንሽን ጉብኝቶች የ0.7 logistic coefficientን እንዴት ታነበዋለህ?', 'Each extra visit multiplies the odds of adoption by e^0.7 ≈ 2, holding the other variables fixed.', 'እያንዳንዱ ተጨማሪ ጉብኝት ሌሎቹን variables ቋሚ በማድረግ የመቀበልን odds በe^0.7 ≈ 2 ያባዛል።')],
  [flow(B('Logistic regression', 'Logistic regression'), [N('z = b₀ + b₁·size + b₂·visits', 'z = b₀ + b₁·size + b₂·visits'), N('p = 1 / (1 + e⁻ᶻ)', 'p = 1 / (1 + e⁻ᶻ)'), N('loss = log-loss', 'loss = log-loss'), N('gradient step', 'gradient እርምጃ', hl=True)], loop=B('repeat until the loss stops falling', 'loss መቀነሱን እስኪያቆም ድገም'))],
  ex_py('''
import numpy as np
from sklearn.linear_model import LogisticRegression
rng = np.random.default_rng(3); n = 800
size = rng.uniform(0.25, 3, n); visits = rng.integers(0, 6, n)
z = -3 + 0.8 * size + 0.7 * visits
adopt = (rng.random(n) < 1 / (1 + np.exp(-z))).astype(float)
X = np.column_stack([np.ones(n), size, visits])
b = np.zeros(3)
for _ in range(20000):
    p = 1 / (1 + np.exp(-X @ b))
    b -= 0.05 * X.T @ (p - adopt) / n                 # gradient of the log-loss
sk = LogisticRegression(C=1e6, max_iter=5000).fit(X[:, 1:], adopt)
print("from scratch: ", b.round(2))
print("scikit-learn: ", np.r_[sk.intercept_, sk.coef_[0]].round(2))
print(f"odds ratio per extension visit: {np.exp(b[2]):.2f}")
''', B('Logistic regression in NumPy, checked against scikit-learn', 'Logistic regression በNumPy፣ በscikit-learn የተረጋገጠ'), B('Simulated data with true coefficients −3, 0.8 and 0.7; the estimates should be close.', 'እውነተኛ coefficients −3፣ 0.8 እና 0.7 ያሉት የተመሰለ ዳታ፤ ግምቶቹ መቅረብ አለባቸው።'))),
U(('SVMs, trees, forests, k-means and PCA', 'SVMs፣ trees፣ forests፣ k-means እና PCA'), DA,
  [('Apply core supervised and unsupervised methods', 'ዋና supervised እና unsupervised ዘዴዎችን መተግበር'), ('Explain what each method assumes', 'እያንዳንዱ ዘዴ ምን እንደሚገምት ማብራራት')],
  [('SVMs and margins; kernels', 'SVMs እና margins፤ kernels'), ('Decision trees and random forests', 'Decision trees እና random forests'), ('k-means clustering', 'k-means clustering'), ('PCA: directions of most variance', 'PCA፡ ብዙ variance ያላቸው አቅጣጫዎች')],
  ('Group 300 farms into types from five measurements with k-means, visualise them with PCA, then predict the type of new farms with a random forest.', '300 እርሻዎችን ከአምስት ልኬቶች በk-means ወደ ዓይነቶች ቧድን፣ በPCA አሳያቸው፣ ከዚያ የአዳዲስ እርሻዎችን ዓይነት በrandom forest ተንብይ።'),
  ('Python with scikit-learn', 'Python ከscikit-learn ጋር'),
  [('What does PCA do to the data?', 'PCA ዳታውን ምን ያደርገዋል?', 'It rotates the data onto new axes ordered by the variance they explain, so the first few can summarise many variables.', 'ዳታውን በሚያብራሩት variance ወደተደረደሩ አዳዲስ axes ያዞረዋል፤ ስለዚህ የመጀመሪያዎቹ ጥቂቶች ብዙ variablesን ሊያጠቃልሉ ይችላሉ።'),
   ('Why scale variables before k-means?', 'ከk-means በፊት variablesን ለምን scale እናደርጋለን?', 'k-means uses distances, so a variable measured in large units (birr) would dominate one in small units (hectares).', 'k-means ርቀቶችን ይጠቀማል፤ ስለዚህ በትላልቅ መለኪያዎች (ብር) የሚለካ variable በትናንሽ መለኪያዎች (ሄክታር) ያለውን ይቆጣጠራል።')],
  [compare(B('Learning with and without labels', 'ከlabels ጋርና ያለ labels መማር'), [col(B('Unsupervised', 'Unsupervised'), ['k-means: find groups', 'PCA: find main directions'], ['k-means፡ ቡድኖችን ፈልግ', 'PCA፡ ዋና አቅጣጫዎችን ፈልግ']), col(B('Supervised', 'Supervised'), ['SVM, trees, forests: predict a known label'], ['SVM፣ trees፣ forests፡ የሚታወቅ labelን ተንብይ'], 'good')])],
  ex_py('''
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
rng = np.random.default_rng(7)
centres = np.array([[0.5, 2, 0, 20, 1.2], [2.5, 6, 1, 60, 2.8], [1.0, 12, 0, 35, 1.5]])  # ha, cattle, irrigation, km, t/ha
spread = np.array([0.2, 1.5, 0.3, 8, 0.3])
X = np.vstack([c + rng.normal(0, 1, (100, 5)) * spread for c in centres])
Z = StandardScaler().fit_transform(X)
labels = KMeans(3, n_init=10, random_state=0).fit_predict(Z)
pca = PCA(2).fit(Z)
print("variance explained by PC1, PC2:", pca.explained_variance_ratio_.round(2))
for k in range(3):
    print(f"type {k}: {np.sum(labels == k)} farms, mean ha {X[labels == k, 0].mean():.1f}, cattle {X[labels == k, 1].mean():.0f}, yield {X[labels == k, 4].mean():.1f} t/ha")
acc = cross_val_score(RandomForestClassifier(200, random_state=0), X, labels, cv=5).mean()
print(f"random forest predicting the farm type: {acc:.2f} cross-validated accuracy")
''', B('Farm typology: k-means, PCA and a random forest', 'የእርሻ ዓይነቶች፡ k-means፣ PCA እና random forest'), B('Simulated farms with three built-in types (small mixed, irrigated, livestock-heavy) for practice.', 'ለልምምድ ሦስት አብሮ የተሠሩ ዓይነቶች (ትንሽ ቅልቅል፣ በመስኖ የሚለማ፣ ብዙ እንስሳት ያሉት) ያሏቸው የተመሰሉ እርሻዎች።'))),
U(('Evaluation: cross-validation, confusion matrix, fairness', 'ግምገማ፡ cross-validation፣ confusion matrix፣ ፍትሐዊነት'), DA,
  [('Estimate performance honestly with cross-validation', 'አፈጻጸምን በcross-validation በታማኝነት መገመት'), ('Check errors by group for fairness', 'ለፍትሐዊነት ስህተቶችን በቡድን መፈተሽ')],
  [('k-fold cross-validation', 'k-fold cross-validation'), ('Precision, recall and the confusion matrix', 'Precision፣ recall እና confusion matrix'), ('Overfitting: train vs validation curves', 'Overfitting፡ train vs validation curves'), ('Fairness: compare errors across groups', 'ፍትሐዊነት፡ በቡድኖች መካከል ስህተቶችን አወዳድር')],
  ('Evaluate a loan-eligibility model for farmers by region and gender: report recall for each group and propose a fix if one group is missed more often.', 'ለገበሬዎች የብድር ብቁነት ሞዴልን በክልልና በጾታ ገምግም፡ ለእያንዳንዱ ቡድን recallን ዘግብ፣ አንድ ቡድን በተደጋጋሚ የሚያመልጥ ከሆነ ማስተካከያ አቅርብ።'),
  ('Python with scikit-learn', 'Python ከscikit-learn ጋር'),
  [('What is overfitting and how do you detect it?', 'overfitting ምንድነው፣ እንዴትስ ትለየዋለህ?', 'The model fits noise in the training data; you see training error keep falling while validation error rises.', 'ሞዴሉ በሥልጠና ዳታ ውስጥ ያለ ጫጫታን ይገጥማል፤ የሥልጠና ስህተት እየቀነሰ የvalidation ስህተት ሲጨምር ታያለህ።'),
   ('Why can overall accuracy hide unfairness?', 'አጠቃላይ accuracy ፍትሐዊ አለመሆንን ለምን ሊደብቅ ይችላል?', 'A model can be accurate on the large group and much worse on a small group; only per-group metrics show it.', 'ሞዴል በትልቁ ቡድን ላይ ትክክለኛ ሆኖ በትንሹ ቡድን ላይ በጣም የከፋ ሊሆን ይችላል፤ ይህን የሚያሳዩት በቡድን የሚለኩ መለኪያዎች ብቻ ናቸው።')],
  [stack(B('Questions an evaluation must answer', 'ግምገማ መመለስ ያለበት ጥያቄዎች'), [N('How good on unseen data?', 'ባልታየ ዳታ ላይ ምን ያህል ጥሩ ነው?', 'cross-validation', 'cross-validation'), N('Which errors?', 'የትኞቹ ስህተቶች?', 'confusion matrix, precision, recall', 'confusion matrix፣ precision፣ recall'), N('For whom?', 'ለማን?', 'metrics by group', 'በቡድን መለኪያዎች'), N('Better than a simple baseline?', 'ከቀላል baseline የተሻለ ነው?')])],
  ex_py('''
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_predict
from sklearn.metrics import recall_score, precision_score
rng = np.random.default_rng(11); n = 3000
women = rng.random(n) < 0.35
land = np.where(women, rng.normal(0.8, 0.3, n), rng.normal(1.6, 0.5, n)).clip(0.1)     # women hold less land
savings = np.where(women, rng.normal(3.5, 1.5, n), rng.normal(5, 1.5, n))
trade = np.where(women, rng.normal(2.5, 0.8, n), rng.normal(0.5, 0.5, n))             # off-farm trading income
repays = (0.3 * savings + 0.2 * land + 0.6 * trade + rng.normal(0, 0.5, n)) > 2.3     # true repayment ability
X = np.column_stack([land, savings])                 # the model does not see trading income
pred = cross_val_predict(LogisticRegression(), X, repays, cv=5)
print(f"overall: precision {precision_score(repays, pred):.2f}, recall {recall_score(repays, pred):.2f}")
for name, g in [("men", ~women), ("women", women)]:
    print(f"{name:5s}: recall {recall_score(repays[g], pred[g]):.2f} (share of good borrowers the model approves)")
''', B('Recall by group: a hidden fairness gap', 'Recall በቡድን፡ የተደበቀ የፍትሐዊነት ክፍተት'), B('Simulated data. Overall recall looks acceptable, but good women borrowers are approved far less often: their repayment comes partly from trading income the model never sees, and they hold less land. Fixes: collect the missing variable, review features that act as proxies for gender, check thresholds by group, and involve the people affected.', 'የተመሰለ ዳታ። አጠቃላይ recall ተቀባይነት ያለው ይመስላል፤ ግን ጥሩ ሴት ተበዳሪዎች በጣም ያነሰ ይጸድቃሉ፡ የመክፈል አቅማቸው በከፊል ሞዴሉ ፈጽሞ ከማያየው የንግድ ገቢ ይመጣል፤ ያነሰ መሬትም ይይዛሉ። ማስተካከያዎች፡ የጎደለውን variable ሰብስብ፣ እንደ የጾታ ተኪ የሚሠሩ featuresን ገምግም፣ thresholdsን በቡድን ፈትሽ፣ የሚነኩ ሰዎችንም አሳትፍ።'))),
U(('Neural network basics', 'የneural network መሠረታዊ ነገሮች'), DA,
  [('Build and train a 2-layer network in NumPy', 'ባለ 2-ንብርብር networkን በNumPy መገንባትና ማሰልጠን'), ('Explain forward pass, loss and backpropagation', 'forward passን፣ lossን እና backpropagationን ማብራራት')],
  [('Neurons, weights and activations', 'Neurons፣ weights እና activations'), ('Forward pass and loss', 'Forward pass እና loss'), ('Backpropagation: the chain rule', 'Backpropagation፡ የchain ሕግ'), ('Training curves and the decision boundary', 'የሥልጠና curves እና decision boundary')],
  ('Train a 2-layer network to separate two interleaved classes (a problem no straight line can solve) and compare it with logistic regression.', 'ሁለት የተጠላለፉ ክፍሎችን (ቀጥ ያለ መስመር ሊፈታው የማይችል ችግር) ለመለየት ባለ 2-ንብርብር networkን አሰልጥንና ከlogistic regression ጋር አወዳድር።'),
  ('Python with NumPy and scikit-learn', 'Python ከNumPy እና scikit-learn ጋር'),
  [('Why does a network need a non-linear activation?', 'network ለምን non-linear activation ያስፈልገዋል?', 'Without it, stacked layers collapse into one linear function and cannot bend the decision boundary.', 'ያለ እሱ የተደራረቡ ንብርብሮች ወደ አንድ linear function ይወድቃሉ፤ decision boundaryውንም ማጣመም አይችሉም።'),
   ('What does backpropagation compute?', 'backpropagation ምን ያሰላል?', 'The gradient of the loss with respect to every weight, using the chain rule from the output back to the input.', 'ከውጤቱ ወደ ግብዓቱ የchain ሕግን በመጠቀም የlossን gradient ከእያንዳንዱ weight አንፃር።')],
  [flow(B('One training step', 'አንድ የሥልጠና እርምጃ'), [N('Forward: X → hidden (tanh) → output (sigmoid)', 'Forward፡ X → hidden (tanh) → ውጤት (sigmoid)'), N('Loss: cross-entropy', 'Loss፡ cross-entropy'), N('Backward: gradients by the chain rule', 'Backward፡ gradients በchain ሕግ'), N('Update: W ← W − η·∇W', 'አዘምን፡ W ← W − η·∇W', hl=True)])],
  ex_py('''
import numpy as np
from sklearn.datasets import make_moons
from sklearn.linear_model import LogisticRegression
X, y = make_moons(400, noise=0.15, random_state=0); y = y.reshape(-1, 1)
rng = np.random.default_rng(0)
W1, b1 = rng.normal(0, 1, (2, 16)), np.zeros(16)
W2, b2 = rng.normal(0, 1, (16, 1)), np.zeros(1)
sig = lambda z: 1 / (1 + np.exp(-z))
for epoch in range(3001):
    H = np.tanh(X @ W1 + b1); P = sig(H @ W2 + b2)                       # forward
    loss = -np.mean(y * np.log(P + 1e-9) + (1 - y) * np.log(1 - P + 1e-9))
    dZ2 = (P - y) / len(X); dW2 = H.T @ dZ2; db2 = dZ2.sum(0)           # backward
    dZ1 = dZ2 @ W2.T * (1 - H ** 2); dW1 = X.T @ dZ1; db1 = dZ1.sum(0)
    for p, g in ((W1, dW1), (b1, db1), (W2, dW2), (b2, db2)): p -= 1.0 * g
    if epoch % 1000 == 0: print(f"epoch {epoch:4d}: loss {loss:.3f}")
print(f"2-layer network accuracy: {np.mean((P > 0.5) == y):.2f}")
print(f"logistic regression accuracy: {LogisticRegression().fit(X, y.ravel()).score(X, y.ravel()):.2f} (a straight line)")
''', B('A 2-layer network learns a curved boundary', 'ባለ 2-ንብርብር network የተጣመመ ወሰንን ይማራል'), B('Accuracies here are on the training data, to show capacity; in a real project report them on held-out data.', 'እዚህ ያሉት accuracies አቅምን ለማሳየት በሥልጠና ዳታ ላይ ናቸው፤ በእውነተኛ ፕሮጀክት በተለየ ዳታ ላይ ዘግባቸው።'))),
]
emit_units(4, [Y1, Y2, Y3, AI])
print('level 4 units written')
