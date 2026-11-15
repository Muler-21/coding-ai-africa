/* Level 4: each year-long module split into 6 units. Generated; code outputs come from running the code. */
window.UNITS = window.UNITS || {};
window.UNITS[4] = [
 [
  {
   "t": {
    "en": "Problem solving, recursion and testing",
    "am": "ችግር መፍታት፣ recursion እና መፈተሽ"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Break a problem into functions with clear contracts",
     "Write recursive solutions and test them with edge cases"
    ],
    "am": [
     "ችግርን ግልጽ ውሎች ባሏቸው functions መከፋፈል",
     "recursive መፍትሔዎችን መጻፍና በጠርዝ ጉዳዮች መፈተሽ"
    ]
   },
   "l": {
    "en": [
     "Problem → inputs, outputs, examples, edge cases",
     "Recursion and the call stack",
     "Memoisation: stop repeating work",
     "Unit tests and property checks"
    ],
    "am": [
     "ችግር → ግብዓቶች፣ ውጤቶች፣ ምሳሌዎች፣ የጠርዝ ጉዳዮች",
     "Recursion እና call stack",
     "Memoisation፡ ሥራን መድገም አቁም",
     "Unit tests እና የባሕሪ ፍተሻዎች"
    ]
   },
   "a": {
    "en": "Count the ways to climb a terraced hillside of n steps taking 1 or 2 steps at a time; write it recursively, make it fast with memoisation and test it.",
    "am": "በአንድ ጊዜ 1 ወይም 2 እርምጃ እየወሰድክ n እርምጃዎች ያሉትን የእርከን ኮረብታ የመውጣት መንገዶችን ቁጠር፤ በrecursion ጻፈው፣ በmemoisation ፈጣን አድርገው፣ ፈትሸውም።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why is the plain recursive version slow for n = 35?",
     "What edge cases should the tests include?"
    ],
    "am": [
     "ቀላሉ የrecursive ስሪት ለn = 35 ለምን ቀርፋፋ ነው?",
     "ፈተናዎቹ የትኞቹን የጠርዝ ጉዳዮች ማካተት አለባቸው?"
    ]
   },
   "qa": {
    "en": [
     "It recomputes the same sub-problems again and again; the number of calls grows exponentially.",
     "The smallest inputs (n = 0, 1, 2), a known larger value, and invalid input such as a negative n."
    ],
    "am": [
     "ተመሳሳዩን ንዑስ ችግሮች ደጋግሞ ያሰላል፤ የጥሪዎቹ ቁጥር በexponential ያድጋል።",
     "በጣም ትናንሽ ግብዓቶች (n = 0፣ 1፣ 2)፣ የሚታወቅ ትልቅ እሴት፣ እና እንደ አሉታዊ n ያለ የተሳሳተ ግብዓት።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "The call tree of ways(4)",
      "am": "የways(4) የጥሪ ዛፍ"
     },
     "root": {
      "t": {
       "en": "ways(4)",
       "am": "ways(4)"
      }
     },
     "kids": [
      {
       "t": {
        "en": "ways(3)",
        "am": "ways(3)"
       },
       "kids": [
        {
         "t": {
          "en": "ways(2)",
          "am": "ways(2)"
         }
        },
        {
         "t": {
          "en": "ways(1)",
          "am": "ways(1)"
         }
        }
       ]
      },
      {
       "t": {
        "en": "ways(2)",
        "am": "ways(2)"
       },
       "kids": [
        {
         "t": {
          "en": "ways(1), ways(0)",
          "am": "ways(1)፣ ways(0)"
         }
        }
       ]
      }
     ],
     "note": {
      "en": "ways(2) is computed twice already; memoisation stores it once.",
      "am": "ways(2) አስቀድሞ ሁለት ጊዜ ተሰልቷል፤ memoisation አንድ ጊዜ ያስቀምጠዋል።"
     }
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "from functools import lru_cache\ncalls = 0\ndef ways_slow(n):\n    global calls; calls += 1\n    if n < 0: raise ValueError(\"n must be >= 0\")\n    return 1 if n <= 1 else ways_slow(n - 1) + ways_slow(n - 2)\n@lru_cache(maxsize=None)\ndef ways(n):\n    if n < 0: raise ValueError(\"n must be >= 0\")\n    return 1 if n <= 1 else ways(n - 1) + ways(n - 2)\nprint(\"ways(25) slow:\", ways_slow(25), \"using\", f\"{calls:,}\", \"calls\")\nprint(\"ways(25) memoised:\", ways(25), \"| ways(90):\", ways(90))\nassert [ways(n) for n in range(6)] == [1, 1, 2, 3, 5, 8]          # unit tests\nassert all(ways(n) == ways(n - 1) + ways(n - 2) for n in range(2, 60))   # property check\ntry: ways(-1)\nexcept ValueError as e: print(\"edge case handled:\", e)",
    "out": "ways(25) slow: 121393 using 242,785 calls\nways(25) memoised: 121393 | ways(90): 4660046610375530309\nedge case handled: n must be >= 0",
    "title": {
     "en": "Exponential vs memoised recursion, with tests",
     "am": "Exponential vs memoised recursion፣ ከፈተናዎች ጋር"
    }
   }
  },
  {
   "t": {
    "en": "C and memory",
    "am": "C እና ማስታወሻ"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Use pointers, arrays and dynamic memory in C",
     "Avoid leaks and out-of-bounds bugs"
    ],
    "am": [
     "በC ውስጥ pointersን፣ arraysን እና dynamic memoryን መጠቀም",
     "leaksን እና ከወሰን ውጭ ስህተቶችን ማስወገድ"
    ]
   },
   "l": {
    "en": [
     "Compile and run: gcc -Wall",
     "Pointers and addresses",
     "Arrays and pointer arithmetic",
     "malloc/free; valgrind and gdb"
    ],
    "am": [
     "አጠናቅርና አስኪድ፡ gcc -Wall",
     "Pointers እና አድራሻዎች",
     "Arrays እና የpointer ሒሳብ",
     "malloc/free፤ valgrind እና gdb"
    ]
   },
   "a": {
    "en": "Write a C program that reads n sensor readings into a malloc’d array, computes mean and maximum, and frees the memory; check it with valgrind.",
    "am": "n የሴንሰር ንባቦችን በmalloc ወደተደረገ array የሚያነብ፣ አማካይና ከፍተኛውን የሚያሰላ፣ ማስታወሻውን የሚለቅ የC ፕሮግራም ጻፍ፤ በvalgrind ፈትሸው።"
   },
   "m": {
    "en": "gcc, valgrind, gdb (all free on Linux)",
    "am": "gcc፣ valgrind፣ gdb (ሁሉም በLinux ነጻ)"
   },
   "q": {
    "en": [
     "What is a pointer?",
     "What happens if you forget free()?"
    ],
    "am": [
     "pointer ምንድነው?",
     "free()ን ብትረሳ ምን ይሆናል?"
    ]
   },
   "qa": {
    "en": [
     "A variable that holds a memory address; *p reads or writes the value at that address.",
     "A memory leak: the memory stays reserved until the program ends; long-running programs slowly run out of memory."
    ],
    "am": [
     "የማስታወሻ አድራሻ የሚይዝ variable፤ *p በዚያ አድራሻ ያለውን እሴት ያነባል ወይም ይጽፋል።",
     "የማስታወሻ leak፡ ማስታወሻው ፕሮግራሙ እስኪያበቃ ተይዞ ይቆያል፤ ረጅም ጊዜ የሚሠሩ ፕሮግራሞች ቀስ በቀስ ማስታወሻ ያጣሉ።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Where things live in memory",
      "am": "ነገሮች በማስታወሻ ውስጥ የት ይኖራሉ"
     },
     "layers": [
      {
       "t": {
        "en": "Stack",
        "am": "Stack"
       },
       "s": {
        "en": "local variables; freed automatically",
        "am": "የአካባቢ variables፤ በራስ-ሰር ይለቀቃሉ"
       }
      },
      {
       "t": {
        "en": "Heap",
        "am": "Heap"
       },
       "s": {
        "en": "malloc’d blocks; you must free them",
        "am": "በmalloc የተደረጉ ብሎኮች፤ መልቀቅ አለብህ"
       }
      },
      {
       "t": {
        "en": "Static data",
        "am": "Static data"
       },
       "s": {
        "en": "globals and constants",
        "am": "globals እና constants"
       }
      },
      {
       "t": {
        "en": "Code",
        "am": "ኮድ"
       },
       "s": {
        "en": "the compiled program",
        "am": "የተጠናቀረው ፕሮግራም"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "C (gcc)",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 6;\n    double sample[] = {21.5, 23.0, 26.5, 30.0, 28.5, 24.0};   /* soil temperature, degrees C */\n    double *r = malloc(n * sizeof *r);                        /* memory on the heap */\n    if (r == NULL) return 1;\n    for (int i = 0; i < n; i++) *(r + i) = sample[i];         /* pointer arithmetic: r[i] */\n    double sum = 0, max = r[0];\n    for (int i = 0; i < n; i++) { sum += r[i]; if (r[i] > max) max = r[i]; }\n    printf(\"n = %d, mean = %.2f, max = %.1f\\n\", n, sum / n, max);\n    int x = 42, *p = &x;\n    *p = 7;                                                   /* change x through its address */\n    printf(\"x is now %d (changed through a pointer)\\n\", x);\n    free(r);                                                  /* give the memory back */\n    return 0;\n}",
    "out": "n = 6, mean = 25.58, max = 30.0\nx is now 7 (changed through a pointer)",
    "title": {
     "en": "Dynamic memory and pointers in C",
     "am": "በC ውስጥ dynamic memory እና pointers"
    }
   }
  },
  {
   "t": {
    "en": "Linux and shell scripting",
    "am": "Linux እና shell scripting"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Automate a data task with a bash script",
     "Use variables, loops, conditions and exit codes in bash"
    ],
    "am": [
     "የዳታ ተግባርን በbash script በራስ-ሰር መሥራት",
     "በbash ውስጥ variablesን፣ loopsን፣ ሁኔታዎችንና exit codesን መጠቀም"
    ]
   },
   "l": {
    "en": [
     "Permissions and the PATH",
     "Variables, for loops, if and test",
     "Text tools: awk, sed, sort, uniq",
     "Scheduling with cron; logging"
    ],
    "am": [
     "ፈቃዶችና PATH",
     "Variables፣ for loops፣ if እና test",
     "የጽሑፍ መሣሪያዎች፡ awk፣ sed፣ sort፣ uniq",
     "በcron ማቀድ፤ መመዝገብ"
    ]
   },
   "a": {
    "en": "Write a script that processes every daily sensor file in a folder, writes one summary CSV, and logs errors for files with bad lines.",
    "am": "በፎልደር ውስጥ ያለውን እያንዳንዱን የዕለት የሴንሰር ፋይል የሚያስኬድ፣ አንድ የማጠቃለያ CSV የሚጽፍና መጥፎ መስመሮች ላሏቸው ፋይሎች ስህተቶችን የሚመዘግብ script ጻፍ።"
   },
   "m": {
    "en": "Linux or WSL, bash",
    "am": "Linux ወይም WSL፣ bash"
   },
   "q": {
    "en": [
     "What does \"set -euo pipefail\" do?",
     "Why does awk suit column data?"
    ],
    "am": [
     "«set -euo pipefail» ምን ያደርጋል?",
     "awk ለዓምድ ዳታ ለምን ይስማማል?"
    ]
   },
   "qa": {
    "en": [
     "Stops the script on errors, on unset variables and on failures inside pipes, so bugs do not pass silently.",
     "It splits each line into fields ($1, $2…) and can sum, filter and print them in one line of code."
    ],
    "am": [
     "scriptኡን በስህተቶች፣ ባልተዘጋጁ variables እና በpipes ውስጥ ባሉ ውድቀቶች ላይ ያቆማል፤ ስለዚህ ስህተቶች በዝምታ አያልፉም።",
     "እያንዳንዱን መስመር ወደ fields ($1፣ $2…) ይከፍላል፣ በአንድ የኮድ መስመርም ሊደምራቸው፣ ሊያጣራቸውና ሊያትማቸው ይችላል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A daily automation",
      "am": "የዕለት አውቶሜሽን"
     },
     "nodes": [
      {
       "t": {
        "en": "cron 06:00",
        "am": "cron 06:00"
       }
      },
      {
       "t": {
        "en": "for each file",
        "am": "ለእያንዳንዱ ፋይል"
       }
      },
      {
       "t": {
        "en": "awk: mean per file",
        "am": "awk፡ በፋይል አማካይ"
       }
      },
      {
       "t": {
        "en": "summary.csv + errors.log",
        "am": "summary.csv + errors.log"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Bash",
    "code": "set -euo pipefail\necho \"file,readings,mean_moisture\" > summary.csv\nfor f in day_*.csv; do\n  if grep -qv '^[0-9:]*,[0-9.]*$' \"$f\"; then echo \"$(date +%F) bad line in $f\" >> errors.log; fi\n  grep '^[0-9:]*,[0-9.]*$' \"$f\" | awk -F, -v name=\"$f\" '{s += $2; n++} END {printf \"%s,%d,%.1f\\n\", name, n, s/n}' >> summary.csv\ndone\ncat summary.csv\necho \"errors logged: $(wc -l < errors.log)\"",
    "out": "file,readings,mean_moisture\nday_01.csv,3,35.3\nday_02.csv,2,48.0\nday_03.csv,3,32.0\nerrors logged: 1",
    "title": {
     "en": "Summarise every sensor file and log bad lines",
     "am": "እያንዳንዱን የሴንሰር ፋይል አጠቃልልና መጥፎ መስመሮችን መዝግብ"
    }
   }
  },
  {
   "t": {
    "en": "Discrete maths: logic, sets, proofs, counting",
    "am": "Discrete maths፡ ሎጂክ፣ ስብስቦች፣ ማረጋገጫዎች፣ ቆጠራ"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Reason with propositional logic and sets",
     "Prove by induction and count with combinations"
    ],
    "am": [
     "በpropositional logic እና በስብስቦች ማሰብ",
     "በinduction ማረጋገጥና በcombinations መቁጠር"
    ]
   },
   "l": {
    "en": [
     "Propositions, truth tables, implication",
     "Sets: union, intersection, complement",
     "Proof by induction",
     "Counting: permutations, combinations, pigeonhole"
    ],
    "am": [
     "Propositions፣ truth tables፣ implication",
     "ስብስቦች፡ union፣ intersection፣ complement",
     "በinduction ማረጋገጥ",
     "ቆጠራ፡ permutations፣ combinations፣ pigeonhole"
    ]
   },
   "a": {
    "en": "A cooperative must choose 3 of 10 farms for a trial: how many choices? Prove a counting formula by induction and check it in code.",
    "am": "ማኅበር ለሙከራ ከ10 እርሻዎች 3ን መምረጥ አለበት፡ ስንት ምርጫዎች አሉ? የቆጠራ ቀመርን በinduction አረጋግጥና በኮድ ፈትሸው።"
   },
   "m": {
    "en": "Paper, Python",
    "am": "ወረቀት፣ Python"
   },
   "q": {
    "en": [
     "When is \"if P then Q\" false?",
     "How many ways to choose 3 farms out of 10?"
    ],
    "am": [
     "«P ከሆነ Q» መቼ ሐሰት ነው?",
     "ከ10 እርሻዎች 3ን ለመምረጥ ስንት መንገዶች?"
    ]
   },
   "qa": {
    "en": [
     "Only when P is true and Q is false.",
     "C(10, 3) = 10! / (3! · 7!) = 120."
    ],
    "am": [
     "P እውነት ሆኖ Q ሐሰት ሲሆን ብቻ።",
     "C(10, 3) = 10! / (3! · 7!) = 120።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Proof by induction: 2⁰ + 2¹ + … + 2ⁿ = 2ⁿ⁺¹ − 1",
      "am": "በinduction ማረጋገጥ፡ 2⁰ + 2¹ + … + 2ⁿ = 2ⁿ⁺¹ − 1"
     },
     "nodes": [
      {
       "t": {
        "en": "Base: n = 0",
        "am": "Base፡ n = 0"
       },
       "s": {
        "en": "1 = 2 − 1 ✓",
        "am": "1 = 2 − 1 ✓"
       }
      },
      {
       "t": {
        "en": "Assume for n",
        "am": "ለn አስብ"
       }
      },
      {
       "t": {
        "en": "Add 2ⁿ⁺¹",
        "am": "2ⁿ⁺¹ ጨምር"
       },
       "s": {
        "en": "2ⁿ⁺¹ − 1 + 2ⁿ⁺¹ = 2ⁿ⁺² − 1",
        "am": "2ⁿ⁺¹ − 1 + 2ⁿ⁺¹ = 2ⁿ⁺² − 1"
       }
      },
      {
       "t": {
        "en": "True for all n",
        "am": "ለሁሉም n እውነት"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "from itertools import combinations, product\nfrom math import comb\nfarms = [f\"F{i}\" for i in range(1, 11)]\nprint(\"choose 3 of 10:\", comb(10, 3), \"=\", len(list(combinations(farms, 3))))\nprint(\"P Q | P->Q\")\nfor p, q in product([True, False], repeat=2):\n    print(f\"{p:d} {q:d} |  {(not p) or q:d}\")\nA, B = {\"teff\", \"maize\", \"barley\"}, {\"maize\", \"sorghum\"}\nprint(\"A|B =\", sorted(A | B), \" A&B =\", sorted(A & B), \" A-B =\", sorted(A - B))\nprint(\"induction claim holds for n = 0..50:\", all(sum(2**k for k in range(n + 1)) == 2**(n + 1) - 1 for n in range(51)))",
    "out": "choose 3 of 10: 120 = 120\nP Q | P->Q\n1 1 |  1\n1 0 |  0\n0 1 |  1\n0 0 |  1\nA|B = ['barley', 'maize', 'sorghum', 'teff']  A&B = ['maize']  A-B = ['barley', 'teff']\ninduction claim holds for n = 0..50: True",
    "title": {
     "en": "Counting, truth tables and sets in code",
     "am": "ቆጠራ፣ truth tables እና ስብስቦች በኮድ"
    }
   }
  },
  {
   "t": {
    "en": "Calculus: change and accumulation",
    "am": "Calculus፡ ለውጥና ክምችት"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Interpret derivatives as rates and integrals as totals",
     "Approximate both numerically and check against exact results"
    ],
    "am": [
     "derivativesን እንደ መጠኖች፣ integralsን እንደ ድምሮች መተርጎም",
     "ሁለቱንም በቁጥር መገመትና ከትክክለኛ ውጤቶች ጋር መፈተሽ"
    ]
   },
   "l": {
    "en": [
     "Limits and continuity",
     "Derivatives: rules and meaning",
     "Optimisation with derivatives",
     "Integrals and numerical integration; gradients in many variables"
    ],
    "am": [
     "Limits እና continuity",
     "Derivatives፡ ሕጎችና ትርጉም",
     "በderivatives optimisation",
     "Integrals እና numerical integration፤ በብዙ variables ውስጥ gradients"
    ]
   },
   "a": {
    "en": "A yield response curve Y(N) = 2 + 0.03N − 0.0001N²: find the nitrogen rate with the highest yield, and the total rainfall from a daily rain-rate curve by integration.",
    "am": "የምርት ምላሽ ኩርባ Y(N) = 2 + 0.03N − 0.0001N²፡ ከፍተኛ ምርት የሚሰጠውን የናይትሮጅን መጠን፣ እንዲሁም ከዕለታዊ የዝናብ መጠን ኩርባ ጠቅላላ የዝናብ መጠንን በintegration ፈልግ።"
   },
   "m": {
    "en": "Paper, Python with NumPy",
    "am": "ወረቀት፣ Python ከNumPy ጋር"
   },
   "q": {
    "en": [
     "What does the derivative of yield with respect to nitrogen mean?",
     "Why approximate integrals numerically?"
    ],
    "am": [
     "የምርት derivative ከናይትሮጅን አንፃር ምን ማለት ነው?",
     "integralsን በቁጥር ለምን እንገምታለን?"
    ]
   },
   "qa": {
    "en": [
     "The extra yield from one more kilogram of nitrogen at that rate; where it is 0 the yield is at its peak.",
     "Real data come as measurements, not formulas; the trapezoid rule adds up small areas between readings."
    ],
    "am": [
     "በዚያ መጠን ከአንድ ተጨማሪ ኪሎግራም ናይትሮጅን የሚገኝ ተጨማሪ ምርት፤ 0 በሆነበት ምርቱ ከፍተኛው ላይ ነው።",
     "እውነተኛ ዳታ እንደ ልኬቶች ይመጣል እንጂ እንደ ቀመሮች አይደለም፤ የtrapezoid ሕግ በንባቦች መካከል ያሉ ትናንሽ ስፋቶችን ይደምራል።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Two big ideas",
      "am": "ሁለት ትላልቅ ሐሳቦች"
     },
     "cols": [
      {
       "h": {
        "en": "Derivative",
        "am": "Derivative"
       },
       "items": {
        "en": [
         "rate of change at a point",
         "slope of the curve",
         "max/min where it is 0"
        ],
        "am": [
         "በአንድ ነጥብ ያለ የለውጥ መጠን",
         "የኩርባው slope",
         "0 በሆነበት max/min"
        ]
       },
       "tone": ""
      },
      {
       "h": {
        "en": "Integral",
        "am": "Integral"
       },
       "items": {
        "en": [
         "total accumulated",
         "area under the curve",
         "rain rate → total rain"
        ],
        "am": [
         "ጠቅላላ የተከማቸ",
         "ከኩርባው በታች ያለ ስፋት",
         "የዝናብ መጠን → ጠቅላላ ዝናብ"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nY = lambda N: 2 + 0.03 * N - 0.0001 * N**2          # t/ha\ndY = lambda N, h=1e-4: (Y(N + h) - Y(N - h)) / (2 * h)    # numerical derivative\nprint(f\"slope at N=50: {dY(50):.4f} t/ha per kg (exact {0.03 - 0.0002 * 50:.4f})\")\nprint(f\"best N where dY/dN = 0: exact {0.03 / 0.0002:.0f} kg/ha, yield {Y(150):.2f} t/ha\")\nhours = np.arange(0, 6.5, 0.5)                       # a storm, rain rate in mm/h every 30 min\nrate = 12 * np.exp(-((hours - 2) ** 2) / 2)\ntotal = np.sum((rate[1:] + rate[:-1]) / 2 * np.diff(hours))\nprint(f\"total rain by the trapezoid rule: {total:.1f} mm\")",
    "out": "slope at N=50: 0.0200 t/ha per kg (exact 0.0200)\nbest N where dY/dN = 0: exact 150 kg/ha, yield 4.25 t/ha\ntotal rain by the trapezoid rule: 29.3 mm",
    "title": {
     "en": "Optimum nitrogen and total storm rainfall",
     "am": "ምርጥ ናይትሮጅንና ጠቅላላ የአውሎ ነፋስ ዝናብ"
    }
   }
  },
  {
   "t": {
    "en": "Linear algebra I",
    "am": "Linear algebra I"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Solve linear systems with matrices",
     "Interpret vectors, matrices and their products"
    ],
    "am": [
     "linear systemsን በማትሪክሶች መፍታት",
     "vectorsን፣ ማትሪክሶችንና ምርቶቻቸውን መተርጎም"
    ]
   },
   "l": {
    "en": [
     "Vectors: length, dot product, angle",
     "Matrices as transformations",
     "Gaussian elimination; Ax = b",
     "Rank, inverse and when systems have no solution"
    ],
    "am": [
     "Vectors፡ ርዝመት፣ dot product፣ ማዕዘን",
     "ማትሪክሶች እንደ ለውጦች",
     "Gaussian elimination፤ Ax = b",
     "Rank፣ inverse እና systems መፍትሔ የሌላቸው መቼ እንደሆነ"
    ]
   },
   "a": {
    "en": "Mix three fertilizers (with known N, P, K percentages) to hit a target N–P–K for a plot: set up and solve the linear system.",
    "am": "ለአንድ ማሳ ዒላማ N–P–K ለመድረስ ሦስት ማዳበሪያዎችን (የታወቀ የN፣ P፣ K መቶኛ ያላቸውን) ቀላቅል፡ linear systemኡን አዘጋጅና ፍታ።"
   },
   "m": {
    "en": "Paper, Python with NumPy",
    "am": "ወረቀት፣ Python ከNumPy ጋር"
   },
   "q": {
    "en": [
     "What does a matrix multiplication represent?",
     "When does Ax = b have no unique solution?"
    ],
    "am": [
     "የማትሪክስ ብዜት ምን ይወክላል?",
     "Ax = b መቼ ልዩ መፍትሔ አይኖረውም?"
    ]
   },
   "qa": {
    "en": [
     "Applying one linear transformation after another; A·x combines the columns of A using the numbers in x.",
     "When A is singular (rank less than its size): some columns are combinations of others."
    ],
    "am": [
     "አንድ linear ለውጥን ከሌላው በኋላ መተግበር፤ A·x የAን ዓምዶች በxውስጥ ባሉ ቁጥሮች ያጣምራል።",
     "A singular ሲሆን (rankኡ ከመጠኑ ሲያንስ)፡ አንዳንድ ዓምዶች የሌሎች ጥምረቶች ናቸው።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Fertilizer mix as Ax = b",
      "am": "የማዳበሪያ ቅልቅል እንደ Ax = b"
     },
     "nodes": [
      {
       "t": {
        "en": "A: nutrient % of each product",
        "am": "A፡ የእያንዳንዱ ምርት የንጥረ ነገር %"
       }
      },
      {
       "t": {
        "en": "x: kg of each product (unknown)",
        "am": "x፡ የእያንዳንዱ ምርት kg (ያልታወቀ)"
       }
      },
      {
       "t": {
        "en": "b: target kg of N, P, K",
        "am": "b፡ ዒላማ kg የN፣ P፣ K"
       }
      },
      {
       "t": {
        "en": "solve → x",
        "am": "ፍታ → x"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\n# columns: urea (46-0-0), DAP (18-46-0), MOP (0-0-60); rows: N, P2O5, K2O fraction\nA = np.array([[0.46, 0.18, 0.00],\n              [0.00, 0.46, 0.00],\n              [0.00, 0.00, 0.60]])\nb = np.array([64.0, 46.0, 30.0])            # target kg/ha of N, P2O5, K2O\nx = np.linalg.solve(A, b)\nfor name, kg in zip([\"urea\", \"DAP\", \"MOP\"], x):\n    print(f\"{name:4s}: {kg:6.1f} kg/ha\")\nprint(\"check A @ x =\", (A @ x).round(1), \"| rank of A:\", np.linalg.matrix_rank(A))",
    "out": "urea:  100.0 kg/ha\nDAP :  100.0 kg/ha\nMOP :   50.0 kg/ha\ncheck A @ x = [64. 46. 30.] | rank of A: 3",
    "title": {
     "en": "Solving a fertilizer mix",
     "am": "የማዳበሪያ ቅልቅልን መፍታት"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "Data structures: heaps, trees, hash tables, graphs",
    "am": "Data structures፡ heaps፣ trees፣ hash tables፣ graphs"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Choose a data structure from the operations a task needs",
     "State the cost of each operation"
    ],
    "am": [
     "አንድ ተግባር ከሚያስፈልገው ተግባራት data structure መምረጥ",
     "የእያንዳንዱን ተግባር ዋጋ መግለጽ"
    ]
   },
   "l": {
    "en": [
     "Heaps and priority queues",
     "Binary search trees and balancing",
     "Hash tables: load factor, resizing",
     "Graphs: adjacency lists vs matrices"
    ],
    "am": [
     "Heaps እና priority queues",
     "Binary search trees እና ማመጣጠን",
     "Hash tables፡ load factor፣ resizing",
     "Graphs፡ adjacency lists vs matrices"
    ]
   },
   "a": {
    "en": "A veterinary clinic must always treat the most urgent animal next: implement the queue with a heap and compare it with a sorted list.",
    "am": "የእንስሳት ክሊኒክ ሁልጊዜ በጣም አስቸኳዩን እንስሳ ቀጥሎ ማከም አለበት፡ queueኡን በheap ተግብርና ከተደረደረ list ጋር አወዳድር።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why use a heap for a priority queue?",
     "When is an unbalanced binary search tree slow?"
    ],
    "am": [
     "ለpriority queue heap ለምን እንጠቀማለን?",
     "ያልተመጣጠነ binary search tree መቼ ቀርፋፋ ነው?"
    ]
   },
   "qa": {
    "en": [
     "Insert and remove-min both take O(log n), instead of O(n) for keeping a list sorted.",
     "When keys arrive in sorted order: the tree becomes a long chain and search becomes O(n)."
    ],
    "am": [
     "ማስገባትና ዝቅተኛውን ማስወገድ ሁለቱም O(log n) ይወስዳሉ፣ listን ተደርድሮ ለማቆየት ከሚወስደው O(n) ይልቅ።",
     "keys በተደረደረ ቅደም ተከተል ሲመጡ፡ ዛፉ ረጅም ሰንሰለት ይሆናል፣ ፍለጋውም O(n) ይሆናል።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Cost of operations",
      "am": "የተግባራት ዋጋ"
     },
     "layers": [
      {
       "t": {
        "en": "Heap: push / pop-min O(log n)",
        "am": "Heap፡ push / pop-min O(log n)"
       }
      },
      {
       "t": {
        "en": "Balanced BST: search / insert O(log n), keeps order",
        "am": "የተመጣጠነ BST፡ ፍለጋ / ማስገባት O(log n)፣ ቅደም ተከተል ይጠብቃል"
       }
      },
      {
       "t": {
        "en": "Hash table: lookup O(1) on average, no order",
        "am": "Hash table፡ ፍለጋ በአማካይ O(1)፣ ቅደም ተከተል የለም"
       }
      },
      {
       "t": {
        "en": "Graph (adjacency list): neighbours O(degree)",
        "am": "Graph (adjacency list)፡ ጎረቤቶች O(degree)"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import heapq\narrivals = [(3, \"goat: limping\"), (1, \"cow: difficult calving\"), (2, \"sheep: bloat\"), (5, \"hen: check-up\"), (1, \"donkey: wound\")]\nqueue = []\nfor order, (urgency, case) in enumerate(arrivals):\n    heapq.heappush(queue, (urgency, order, case))   # urgency 1 = most urgent; order breaks ties fairly\nprint(\"treatment order:\")\nwhile queue:\n    urgency, _, case = heapq.heappop(queue)\n    print(f\"  urgency {urgency}: {case}\")",
    "out": "treatment order:\n  urgency 1: cow: difficult calving\n  urgency 1: donkey: wound\n  urgency 2: sheep: bloat\n  urgency 3: goat: limping\n  urgency 5: hen: check-up",
    "title": {
     "en": "A clinic priority queue with a heap",
     "am": "በheap የክሊኒክ priority queue"
    }
   }
  },
  {
   "t": {
    "en": "Algorithms: shortest paths, spanning trees, DP, greedy",
    "am": "Algorithms፡ አጭር መንገዶች፣ spanning trees፣ DP፣ greedy"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Apply Dijkstra, Kruskal/Prim and dynamic programming",
     "Argue why an algorithm is correct"
    ],
    "am": [
     "Dijkstraን፣ Kruskal/Primን እና dynamic programmingን መተግበር",
     "algorithm ለምን ትክክል እንደሆነ መሞገት"
    ]
   },
   "l": {
    "en": [
     "Dijkstra’s shortest paths",
     "Minimum spanning trees",
     "Dynamic programming: knapsack",
     "Greedy choice and when it fails"
    ],
    "am": [
     "የDijkstra አጭር መንገዶች",
     "Minimum spanning trees",
     "Dynamic programming፡ knapsack",
     "Greedy ምርጫና መቼ እንደሚወድቅ"
    ]
   },
   "a": {
    "en": "Plan a milk-collection route: shortest road distances from a cooling centre to villages (Dijkstra), and the cheapest pipe network linking all villages (minimum spanning tree).",
    "am": "የወተት መሰብሰቢያ መንገድ አቅድ፡ ከማቀዝቀዣ ማዕከል ወደ መንደሮች ያሉ አጭር የመንገድ ርቀቶች (Dijkstra)፣ እና ሁሉንም መንደሮች የሚያገናኝ በጣም ርካሽ የቧንቧ ኔትወርክ (minimum spanning tree)።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why does Dijkstra need non-negative edge weights?",
     "What makes a problem suitable for dynamic programming?"
    ],
    "am": [
     "Dijkstra ለምን አሉታዊ ያልሆኑ የጠርዝ ክብደቶች ያስፈልገዋል?",
     "አንድን ችግር ለdynamic programming ተስማሚ የሚያደርገው ምንድነው?"
    ]
   },
   "qa": {
    "en": [
     "It finalises the closest unvisited node; a later negative edge could make a finalised distance shorter, breaking that logic.",
     "Overlapping sub-problems and optimal substructure: the best answer is built from best answers to smaller problems."
    ],
    "am": [
     "ቅርብ የሆነውን ያልተጎበኘ node ያጠናቅቃል፤ በኋላ የሚመጣ አሉታዊ ጠርዝ የተጠናቀቀን ርቀት ሊያሳጥር ይችላል፤ ያንን ሎጂክ ይሰብራል።",
     "የሚደራረቡ ንዑስ ችግሮችና optimal substructure፡ ምርጡ መልስ ከትናንሽ ችግሮች ምርጥ መልሶች ይገነባል።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "Milk-collection road network",
      "am": "የወተት መሰብሰቢያ የመንገድ ኔትወርክ"
     },
     "root": {
      "t": {
       "en": "Cooling centre",
       "am": "የማቀዝቀዣ ማዕከል"
      }
     },
     "kids": [
      {
       "t": {
        "en": "Village A (4 km)",
        "am": "መንደር A (4 km)"
       },
       "kids": [
        {
         "t": {
          "en": "Village C (+3 km)",
          "am": "መንደር C (+3 km)"
         }
        }
       ]
      },
      {
       "t": {
        "en": "Village B (2 km)",
        "am": "መንደር B (2 km)"
       },
       "kids": [
        {
         "t": {
          "en": "Village D (+6 km)",
          "am": "መንደር D (+6 km)"
         }
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import heapq\nroads = {\"Centre\": {\"A\": 4, \"B\": 2}, \"A\": {\"Centre\": 4, \"B\": 1, \"C\": 3}, \"B\": {\"Centre\": 2, \"A\": 1, \"D\": 6},\n         \"C\": {\"A\": 3, \"D\": 2}, \"D\": {\"B\": 6, \"C\": 2}}\ndef dijkstra(src):\n    dist, pq = {src: 0}, [(0, src)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > dist[u]: continue\n        for v, w in roads[u].items():\n            if d + w < dist.get(v, float(\"inf\")):\n                dist[v] = d + w; heapq.heappush(pq, (d + w, v))\n    return dist\nprint(\"shortest km from the centre:\", dijkstra(\"Centre\"))\nedges = sorted((w, u, v) for u in roads for v, w in roads[u].items() if u < v)\nparent = {n: n for n in roads}\ndef find(x):\n    while parent[x] != x: x = parent[x]\n    return x\nmst = []\nfor w, u, v in edges:                          # Kruskal: cheapest edge that joins two groups\n    if find(u) != find(v): parent[find(u)] = find(v); mst.append((u, v, w))\nprint(\"cheapest network:\", mst, \"total\", sum(w for *_, w in mst), \"km\")",
    "out": "shortest km from the centre: {'Centre': 0, 'A': 3, 'B': 2, 'D': 8, 'C': 6}\ncheapest network: [('A', 'B', 1), ('B', 'Centre', 2), ('C', 'D', 2), ('A', 'C', 3)] total 8 km",
    "title": {
     "en": "Dijkstra and Kruskal on a milk-collection network",
     "am": "Dijkstra እና Kruskal በወተት መሰብሰቢያ ኔትወርክ ላይ"
    }
   }
  },
  {
   "t": {
    "en": "Complexity: P, NP and hard problems",
    "am": "Complexity፡ P፣ NP እና ከባድ ችግሮች"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Distinguish polynomial from exponential algorithms",
     "Recognise NP-hard problems and practical strategies for them"
    ],
    "am": [
     "polynomialን ከexponential algorithms መለየት",
     "NP-hard ችግሮችንና ለእነሱ ተግባራዊ ስልቶችን መለየት"
    ]
   },
   "l": {
    "en": [
     "P and NP in plain words",
     "Reductions: one problem is as hard as another",
     "Brute force grows explosively",
     "Heuristics and approximations in practice"
    ],
    "am": [
     "P እና NP በቀላል ቃላት",
     "Reductions፡ አንዱ ችግር እንደ ሌላው ከባድ ነው",
     "Brute force በፍንዳታ ያድጋል",
     "በተግባር heuristics እና approximations"
    ]
   },
   "a": {
    "en": "Find the shortest round trip through n villages by brute force for n = 5…10, time it, and compare with the nearest-neighbour heuristic.",
    "am": "በn መንደሮች በኩል አጭሩን የደርሶ መልስ ጉዞ ለn = 5…10 በbrute force ፈልግ፣ ጊዜውን ለካ፣ ከnearest-neighbour heuristic ጋር አወዳድር።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What does \"in NP\" mean?",
     "What do engineers do with an NP-hard problem?"
    ],
    "am": [
     "«በNP ውስጥ» ማለት ምን ማለት ነው?",
     "መሐንዲሶች NP-hard ችግርን ምን ያደርጉታል?"
    ]
   },
   "qa": {
    "en": [
     "A proposed answer can be checked quickly (in polynomial time), even if finding one may be slow.",
     "Use exact methods for small cases, and heuristics, approximation algorithms or solvers that give good answers fast for big ones."
    ],
    "am": [
     "የቀረበ መልስ በፍጥነት (በpolynomial time) ሊፈተሽ ይችላል፣ መፈለጉ ቀርፋፋ ቢሆንም።",
     "ለትናንሽ ጉዳዮች ትክክለኛ ዘዴዎችን፣ ለትላልቆቹ ደግሞ በፍጥነት ጥሩ መልሶችን የሚሰጡ heuristicsን፣ approximation algorithmsን ወይም solversን ይጠቀማሉ።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "How brute force grows",
      "am": "brute force እንዴት እንደሚያድግ"
     },
     "layers": [
      {
       "t": {
        "en": "n = 5: 24 routes",
        "am": "n = 5፡ 24 መንገዶች"
       }
      },
      {
       "t": {
        "en": "n = 10: 362,880 routes",
        "am": "n = 10፡ 362,880 መንገዶች"
       }
      },
      {
       "t": {
        "en": "n = 20: 1.2 × 10¹⁷ routes",
        "am": "n = 20፡ 1.2 × 10¹⁷ መንገዶች"
       }
      },
      {
       "t": {
        "en": "n = 60: more than atoms in the universe",
        "am": "n = 60፡ በዩኒቨርስ ካሉ አቶሞች በላይ"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import itertools, math, random\nrandom.seed(4)\npts = {f\"V{i}\": (random.uniform(0, 30), random.uniform(0, 30)) for i in range(9)}     # villages, km\nd = lambda a, b: math.dist(pts[a], pts[b])\ntour_len = lambda t: sum(d(t[i], t[(i + 1) % len(t)]) for i in range(len(t)))\nnames = list(pts); start = names[0]\nbest = min(((start,) + p for p in itertools.permutations(names[1:])), key=tour_len)\nroute, left = [start], set(names[1:])\nwhile left:                                            # nearest-neighbour heuristic\n    nxt = min(left, key=lambda v: d(route[-1], v)); route.append(nxt); left.remove(nxt)\nprint(f\"brute force checked {math.factorial(len(names) - 1):,} tours: best {tour_len(best):.1f} km\")\nprint(f\"nearest neighbour checked ~{len(names)**2} distances: {tour_len(route):.1f} km ({100 * (tour_len(route) / tour_len(best) - 1):.0f}% longer)\")\nfor n in [10, 20, 60]:\n    print(f\"n = {n}: {math.factorial(n - 1):.2e} tours to check by brute force\")",
    "out": "brute force checked 40,320 tours: best 84.8 km\nnearest neighbour checked ~81 distances: 89.8 km (6% longer)\nn = 10: 3.63e+05 tours to check by brute force\nn = 20: 1.22e+17 tours to check by brute force\nn = 60: 1.39e+80 tours to check by brute force",
    "title": {
     "en": "Exact search vs a heuristic for a delivery round",
     "am": "ለአቅርቦት ዙር ትክክለኛ ፍለጋ vs heuristic"
    }
   }
  },
  {
   "t": {
    "en": "Object-oriented design",
    "am": "Object-oriented ንድፍ"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Apply SOLID principles and common patterns",
     "Sketch a design with UML before coding"
    ],
    "am": [
     "የSOLID መርሆዎችንና የተለመዱ patternsን መተግበር",
     "ከኮድ በፊት ንድፍን በUML መሣል"
    ]
   },
   "l": {
    "en": [
     "Single responsibility and open/closed",
     "Composition over inheritance",
     "Patterns: strategy, factory, observer, repository",
     "UML class and sequence sketches"
    ],
    "am": [
     "Single responsibility እና open/closed",
     "Composition over inheritance",
     "Patterns፡ strategy፣ factory፣ observer፣ repository",
     "የUML class እና sequence ንድፎች"
    ]
   },
   "a": {
    "en": "Design a payment module for a cooperative shop that supports cash, mobile money and credit, where adding a new method needs no change to existing code.",
    "am": "ገንዘብን፣ የሞባይል ገንዘብንና ዱቤን የሚደግፍ ለማኅበር ሱቅ የክፍያ module ንደፍ፤ አዲስ ዘዴ መጨመር በነባሩ ኮድ ላይ ምንም ለውጥ እንዳይፈልግ።"
   },
   "m": {
    "en": "Paper for UML, Python",
    "am": "ለUML ወረቀት፣ Python"
   },
   "q": {
    "en": [
     "What does the open/closed principle say?",
     "Why prefer composition over inheritance?"
    ],
    "am": [
     "open/closed principle ምን ይላል?",
     "ከinheritance ይልቅ compositionን ለምን እንመርጣለን?"
    ]
   },
   "qa": {
    "en": [
     "Code should be open to extension but closed to modification: add new behaviour by adding code, not editing working code.",
     "Objects built from small parts are easier to change and test than deep class hierarchies that break when the base changes."
    ],
    "am": [
     "ኮድ ለማስፋፋት ክፍት ግን ለመቀየር ዝግ መሆን አለበት፡ የሚሠራውን ኮድ በማስተካከል ሳይሆን ኮድ በመጨመር አዲስ ባሕሪ ጨምር።",
     "ከትናንሽ ክፍሎች የተገነቡ objects መሠረቱ ሲለወጥ ከሚሰበሩ ጥልቅ የclass ተዋረዶች ይልቅ ለመቀየርና ለመፈተሽ ቀላል ናቸው።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "Strategy pattern for payments",
      "am": "ለክፍያዎች strategy pattern"
     },
     "root": {
      "t": {
       "en": "Checkout (uses any PaymentMethod)",
       "am": "Checkout (ማንኛውንም PaymentMethod ይጠቀማል)"
      }
     },
     "kids": [
      {
       "t": {
        "en": "Cash",
        "am": "ጥሬ ገንዘብ"
       }
      },
      {
       "t": {
        "en": "MobileMoney",
        "am": "MobileMoney"
       }
      },
      {
       "t": {
        "en": "Credit (new: no change to Checkout)",
        "am": "Credit (አዲስ፡ በCheckout ላይ ለውጥ የለም)"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "from typing import Protocol\nclass PaymentMethod(Protocol):\n    def pay(self, amount: float) -> str: ...\nclass Cash:\n    def pay(self, amount): return f\"received {amount:.0f} birr in cash\"\nclass MobileMoney:\n    def __init__(self, phone): self.phone = phone\n    def pay(self, amount): return f\"requested {amount:.0f} birr from {self.phone[:4]}****\"\nclass Credit:                                   # added later: Checkout did not change\n    def __init__(self, member, limit): self.member, self.limit = member, limit\n    def pay(self, amount):\n        return f\"{amount:.0f} birr on credit for {self.member}\" if amount <= self.limit else \"credit limit exceeded\"\nclass Checkout:\n    def __init__(self, method: PaymentMethod): self.method = method\n    def total(self, items): return sum(q * p for q, p in items)\n    def complete(self, items): return self.method.pay(self.total(items))\nbasket = [(2, 120.0), (1, 30.0)]\nfor m in [Cash(), MobileMoney(\"0911223344\"), Credit(\"Hana\", 500), Credit(\"Dawit\", 100)]:\n    print(type(m).__name__.ljust(11), Checkout(m).complete(basket))",
    "out": "Cash        received 270 birr in cash\nMobileMoney requested 270 birr from 0911****\nCredit      270 birr on credit for Hana\nCredit      credit limit exceeded",
    "title": {
     "en": "Strategy pattern: new payment methods without editing Checkout",
     "am": "Strategy pattern፡ Checkoutን ሳያስተካክሉ አዳዲስ የክፍያ ዘዴዎች"
    }
   }
  },
  {
   "t": {
    "en": "Computer architecture: pipelines and caches",
    "am": "Computer architecture፡ pipelines እና caches"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Explain the CPU pipeline and the memory hierarchy",
     "Write cache-friendly code"
    ],
    "am": [
     "የCPU pipelineን እና የማስታወሻ ተዋረድን ማብራራት",
     "ለcache ተስማሚ ኮድ መጻፍ"
    ]
   },
   "l": {
    "en": [
     "Instruction pipeline and hazards",
     "Caches: lines, hits and misses",
     "Locality: spatial and temporal",
     "Assembly basics: what the compiler makes"
    ],
    "am": [
     "የመመሪያ pipeline እና hazards",
     "Caches፡ lines፣ hits እና misses",
     "Locality፡ spatial እና temporal",
     "የAssembly መሠረታዊ ነገሮች፡ compilerኡ የሚሠራው"
    ]
   },
   "a": {
    "en": "Simulate a small cache and measure hit rates for row-by-row and column-by-column traversal of a matrix; then time the same in C.",
    "am": "ትንሽ cache አስመስልና ማትሪክስን ረድፍ በረድፍና ዓምድ በዓምድ ሲያልፉ የhit መጠኖችን ለካ፤ ከዚያ ያንኑ በC ጊዜ ለካ።"
   },
   "m": {
    "en": "Python, gcc",
    "am": "Python፣ gcc"
   },
   "q": {
    "en": [
     "What is a cache miss?",
     "Why is row-by-row faster for a C array?"
    ],
    "am": [
     "cache miss ምንድነው?",
     "ለC array ረድፍ በረድፍ ለምን ፈጣን ነው?"
    ]
   },
   "qa": {
    "en": [
     "The data is not in the cache, so the CPU must wait for slower memory; it can cost around 100 times a hit.",
     "C stores rows next to each other, so one cache line brings in the next several elements you will use."
    ],
    "am": [
     "ዳታው በcache ውስጥ የለም፤ ስለዚህ CPU ቀርፋፋውን ማስታወሻ መጠበቅ አለበት፤ ከhit 100 እጥፍ ገደማ ሊያስወጣ ይችላል።",
     "C ረድፎችን እርስ በርሳቸው አጠገብ ያስቀምጣል፤ ስለዚህ አንድ የcache line የምትጠቀማቸውን ቀጣዮቹን በርካታ elements ያመጣል።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Memory hierarchy (rough latency)",
      "am": "የማስታወሻ ተዋረድ (ግምታዊ መዘግየት)"
     },
     "layers": [
      {
       "t": {
        "en": "Registers < 1 ns",
        "am": "Registers < 1 ns"
       }
      },
      {
       "t": {
        "en": "L1 cache ~1 ns",
        "am": "L1 cache ~1 ns"
       }
      },
      {
       "t": {
        "en": "L3 cache ~10 ns",
        "am": "L3 cache ~10 ns"
       }
      },
      {
       "t": {
        "en": "RAM ~100 ns",
        "am": "RAM ~100 ns"
       }
      },
      {
       "t": {
        "en": "SSD ~100,000 ns",
        "am": "SSD ~100,000 ns"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "LINE, LINES = 8, 64                      # 8 numbers per cache line, 64 lines (direct-mapped cache)\ndef hit_rate(addresses):\n    cache, hits = [None] * LINES, 0\n    for a in addresses:\n        tag, slot = a // LINE, (a // LINE) % LINES\n        if cache[slot] == tag: hits += 1\n        else: cache[slot] = tag\n    return hits / len(addresses)\nR = C = 256                               # a 256 x 256 matrix stored row by row\nrow_order = [r * C + c for r in range(R) for c in range(C)]\ncol_order = [r * C + c for c in range(C) for r in range(R)]\nprint(f\"row-by-row hit rate:       {hit_rate(row_order):.1%}\")\nprint(f\"column-by-column hit rate: {hit_rate(col_order):.1%}\")",
    "out": "row-by-row hit rate:       87.5%\ncolumn-by-column hit rate: 0.0%",
    "title": {
     "en": "Simulating cache hits for two loop orders",
     "am": "ለሁለት የloop ቅደም ተከተሎች የcache hitsን ማስመሰል"
    },
    "note": {
     "en": "A simple direct-mapped cache model; real CPUs have bigger, smarter caches, but the gap between the two orders is real and easy to time in C.",
     "am": "ቀላል direct-mapped cache ሞዴል፤ እውነተኛ CPUs ትልቅና ብልህ caches አሏቸው፤ ግን በሁለቱ ቅደም ተከተሎች መካከል ያለው ልዩነት እውነተኛና በC ለመለካት ቀላል ነው።"
    }
   }
  },
  {
   "t": {
    "en": "Probability, statistics and linear algebra II",
    "am": "ፕሮባቢሊቲ፣ ስታቲስቲክስና linear algebra II"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Use distributions, expectation and estimation",
     "Compute and interpret eigenvalues and eigenvectors"
    ],
    "am": [
     "distributionsን፣ expectationን እና estimationን መጠቀም",
     "eigenvaluesን እና eigenvectorsን ማስላትና መተርጎም"
    ]
   },
   "l": {
    "en": [
     "Random variables, expectation, variance",
     "Binomial, Poisson, normal; the central limit theorem",
     "Estimation and confidence intervals",
     "Eigenvalues: long-run behaviour of a system"
    ],
    "am": [
     "Random variables፣ expectation፣ variance",
     "Binomial፣ Poisson፣ normal፤ central limit theorem",
     "Estimation እና confidence intervals",
     "Eigenvalues፡ የአንድ ሥርዓት የረጅም ጊዜ ባሕሪ"
    ]
   },
   "a": {
    "en": "Model a herd with a stage matrix (calves, heifers, cows): find the long-run growth rate and stage mix from its leading eigenvalue and eigenvector, and check by simulation.",
    "am": "መንጋን በደረጃ ማትሪክስ (ጥጆች፣ ጊደሮች፣ ላሞች) ሞዴል አድርግ፡ የረጅም ጊዜ የዕድገት መጠኑንና የደረጃ ቅልቅሉን ከመሪ eigenvalue እና eigenvectorኡ ፈልግ፣ በሲሙሌሽንም ፈትሽ።"
   },
   "m": {
    "en": "Python with NumPy",
    "am": "Python ከNumPy ጋር"
   },
   "q": {
    "en": [
     "What is the expected value of a dice roll?",
     "What does the leading eigenvalue of a herd matrix tell you?"
    ],
    "am": [
     "የዳይስ መጣል expected value ምንድነው?",
     "የመንጋ ማትሪክስ መሪ eigenvalue ምን ይነግርሃል?"
    ]
   },
   "qa": {
    "en": [
     "(1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5.",
     "The long-run growth factor per year: above 1 the herd grows, below 1 it shrinks; its eigenvector gives the stable stage mix."
    ],
    "am": [
     "(1 + 2 + 3 + 4 + 5 + 6) / 6 = 3.5።",
     "በዓመት የረጅም ጊዜ የዕድገት ምክንያት፡ ከ1 በላይ ከሆነ መንጋው ያድጋል፣ ከ1 በታች ከሆነ ይቀንሳል፤ eigenvectorኡ የተረጋጋውን የደረጃ ቅልቅል ይሰጣል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A herd as a matrix",
      "am": "መንጋ እንደ ማትሪክስ"
     },
     "nodes": [
      {
       "t": {
        "en": "calves → heifers",
        "am": "ጥጆች → ጊደሮች"
       },
       "s": {
        "en": "70% survive",
        "am": "70% ይተርፋሉ"
       }
      },
      {
       "t": {
        "en": "heifers → cows",
        "am": "ጊደሮች → ላሞች"
       },
       "s": {
        "en": "80%",
        "am": "80%"
       }
      },
      {
       "t": {
        "en": "cows → calves",
        "am": "ላሞች → ጥጆች"
       },
       "s": {
        "en": "0.45 female calves per cow",
        "am": "በላም 0.45 ሴት ጥጆች"
       }
      },
      {
       "t": {
        "en": "growth = leading eigenvalue",
        "am": "ዕድገት = መሪ eigenvalue"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nL = np.array([[0.0, 0.0, 0.45],      # new female calves per cow\n              [0.70, 0.0, 0.0],      # calves surviving to heifers\n              [0.0, 0.80, 0.90]])    # heifers becoming cows, cows staying\nvals, vecs = np.linalg.eig(L)\nk = np.argmax(vals.real); lam = vals[k].real; mix = np.abs(vecs[:, k].real); mix /= mix.sum()\nprint(f\"growth factor per year: {lam:.3f} ({100 * (lam - 1):+.1f}% a year)\")\nprint(\"stable mix calves/heifers/cows:\", mix.round(2))\nherd = np.array([20.0, 15.0, 40.0])\nfor year in range(30): herd = L @ herd\nprint(\"after 30 years of simulation, mix:\", (herd / herd.sum()).round(2))\nrng = np.random.default_rng(0)\nmeans = rng.integers(1, 7, (10000, 30)).mean(axis=1)            # central limit theorem\nprint(f\"mean of 30 dice: average {means.mean():.2f}, spread {means.std():.2f} (theory {np.sqrt(35 / 12 / 30):.2f})\")",
    "out": "growth factor per year: 1.106 (+10.6% a year)\nstable mix calves/heifers/cows: [0.24 0.15 0.6 ]\nafter 30 years of simulation, mix: [0.24 0.15 0.6 ]\nmean of 30 dice: average 3.50, spread 0.31 (theory 0.31)",
    "title": {
     "en": "Herd growth from an eigenvalue, and the central limit theorem",
     "am": "የመንጋ ዕድገት ከeigenvalue፣ እና central limit theorem"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "Operating systems: processes, threads, scheduling",
    "am": "Operating systems፡ processes፣ threads፣ scheduling"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Explain processes, threads and scheduling policies",
     "Compare schedulers by waiting time"
    ],
    "am": [
     "processesን፣ threadsን እና የscheduling ፖሊሲዎችን ማብራራት",
     "schedulersን በመጠበቂያ ጊዜ ማወዳደር"
    ]
   },
   "l": {
    "en": [
     "Processes vs threads; context switches",
     "Scheduling: FCFS, shortest job first, round robin",
     "Synchronisation: locks and race conditions",
     "Virtual memory and files"
    ],
    "am": [
     "Processes vs threads፤ context switches",
     "Scheduling፡ FCFS፣ shortest job first፣ round robin",
     "Synchronisation፡ locks እና race conditions",
     "Virtual memory እና ፋይሎች"
    ]
   },
   "a": {
    "en": "Simulate three schedulers on the same set of jobs (a lab’s analysis queue) and recommend one for short interactive jobs mixed with long batch jobs.",
    "am": "በተመሳሳይ የስራዎች ስብስብ (የላብራቶሪ የትንተና ወረፋ) ላይ ሦስት schedulersን አስመስልና ለረጅም batch ስራዎች ከተቀላቀሉ አጭር በይነተገናኝ ስራዎች አንዱን ምከር።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What is the difference between a process and a thread?",
     "Why does round robin help interactive jobs?"
    ],
    "am": [
     "በprocess እና በthread መካከል ያለው ልዩነት ምንድነው?",
     "round robin በይነተገናኝ ስራዎችን ለምን ይረዳል?"
    ]
   },
   "qa": {
    "en": [
     "A process has its own memory; threads inside one process share memory, so they are cheaper but need locks.",
     "Every job gets a short turn soon, so a quick job is not stuck behind a long one."
    ],
    "am": [
     "process የራሱ ማስታወሻ አለው፤ በአንድ process ውስጥ ያሉ threads ማስታወሻ ይጋራሉ፤ ስለዚህ ርካሽ ናቸው ግን locks ያስፈልጋቸዋል።",
     "እያንዳንዱ ሥራ በቅርቡ አጭር ተራ ያገኛል፤ ስለዚህ ፈጣን ሥራ ከረጅም ሥራ ጀርባ አይቀረቀርም።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Three schedulers",
      "am": "ሦስት schedulers"
     },
     "cols": [
      {
       "h": {
        "en": "FCFS",
        "am": "FCFS"
       },
       "items": {
        "en": [
         "simple, fair in order",
         "short jobs wait behind long ones"
        ],
        "am": [
         "ቀላል፣ በቅደም ተከተል ፍትሐዊ",
         "አጭር ስራዎች ከረጅሞቹ ጀርባ ይጠብቃሉ"
        ]
       },
       "tone": "bad"
      },
      {
       "h": {
        "en": "Shortest job first",
        "am": "Shortest job first"
       },
       "items": {
        "en": [
         "lowest average wait",
         "needs job lengths; long jobs can starve"
        ],
        "am": [
         "ዝቅተኛ አማካይ መጠበቂያ",
         "የሥራ ርዝመቶችን ይፈልጋል፤ ረጅም ስራዎች ሊራቡ ይችላሉ"
        ]
       },
       "tone": ""
      },
      {
       "h": {
        "en": "Round robin",
        "am": "Round robin"
       },
       "items": {
        "en": [
         "time slices for everyone",
         "good response for interactive work"
        ],
        "am": [
         "ለሁሉም የጊዜ ክፍሎች",
         "ለበይነተገናኝ ሥራ ጥሩ ምላሽ"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "jobs = [(\"genome-align\", 40), (\"plot\", 3), (\"report\", 5), (\"qc\", 2), (\"model-fit\", 25)]   # all arrive at t = 0\ndef fcfs(js):\n    t, waits = 0, {}\n    for name, burst in js: waits[name] = t; t += burst\n    return waits\ndef sjf(js): return fcfs(sorted(js, key=lambda j: j[1]))\ndef round_robin(js, q=4):\n    left, t, finish = dict(js), 0, {}\n    while left:\n        for name in list(left):\n            run = min(q, left[name]); t += run; left[name] -= run\n            if left[name] == 0: finish[name] = t; del left[name]\n    return {n: finish[n] - b for n, b in js}           # waiting = finish - burst\nfor name, f in [(\"FCFS\", fcfs), (\"SJF\", sjf), (\"Round robin q=4\", round_robin)]:\n    w = f(jobs)\n    print(f\"{name:16s} average wait {sum(w.values()) / len(w):5.1f}  | 'qc' waits {w['qc']:3d}  'genome-align' waits {w['genome-align']:3d}\")",
    "out": "FCFS             average wait  36.2  | 'qc' waits  48  'genome-align' waits   0\nSJF              average wait  10.4  | 'qc' waits   0  'genome-align' waits  35\nRound robin q=4  average wait  21.0  | 'qc' waits  11  'genome-align' waits  35",
    "title": {
     "en": "Comparing schedulers on a lab job queue",
     "am": "በላብራቶሪ የሥራ ወረፋ ላይ schedulersን ማወዳደር"
    }
   }
  },
  {
   "t": {
    "en": "Databases: indexes, transactions, query plans",
    "am": "ዳታቤዞች፡ indexes፣ transactions፣ query plans"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Speed up queries with indexes and read query plans",
     "Keep data consistent with transactions"
    ],
    "am": [
     "queriesን በindexes ማፋጠንና query plansን ማንበብ",
     "ዳታን በtransactions ወጥ አድርጎ ማቆየት"
    ]
   },
   "l": {
    "en": [
     "B-tree indexes",
     "EXPLAIN QUERY PLAN",
     "Transactions: ACID",
     "Isolation and concurrent users"
    ],
    "am": [
     "B-tree indexes",
     "EXPLAIN QUERY PLAN",
     "Transactions፡ ACID",
     "Isolation እና በአንድ ጊዜ ያሉ ተጠቃሚዎች"
    ]
   },
   "a": {
    "en": "Load 200,000 milk-delivery records into SQLite, time a query before and after adding an index, and implement a payment transfer that cannot half-complete.",
    "am": "200,000 የወተት አቅርቦት መዝገቦችን ወደ SQLite ጫን፣ index ከመጨመርህ በፊትና በኋላ queryን ጊዜ ለካ፣ በግማሽ ሊጠናቀቅ የማይችል የክፍያ ዝውውርም ተግብር።"
   },
   "m": {
    "en": "Python with sqlite3",
    "am": "Python ከsqlite3 ጋር"
   },
   "q": {
    "en": [
     "Why are database transactions needed?",
     "What does an index cost?"
    ],
    "am": [
     "የዳታቤዝ transactions ለምን ያስፈልጋሉ?",
     "index ምን ያስወጣል?"
    ]
   },
   "qa": {
    "en": [
     "So a group of changes happens completely or not at all, even if the program crashes halfway.",
     "Extra storage and slower inserts and updates, because the index must be kept up to date."
    ],
    "am": [
     "የለውጦች ቡድን ሙሉ በሙሉ እንዲሆን ወይም በፍጹም እንዳይሆን፣ ፕሮግራሙ በግማሽ ቢወድቅም።",
     "ተጨማሪ ማከማቻና ቀርፋፋ ማስገባቶችና ማዘመኛዎች፣ indexኡ ወቅታዊ መሆን ስላለበት።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A transfer that is all-or-nothing",
      "am": "ሁሉም-ወይም-ምንም የሆነ ዝውውር"
     },
     "nodes": [
      {
       "t": {
        "en": "BEGIN",
        "am": "BEGIN"
       }
      },
      {
       "t": {
        "en": "debit the cooperative",
        "am": "ከማኅበሩ ቀንስ"
       }
      },
      {
       "t": {
        "en": "credit the farmer",
        "am": "ለገበሬው ጨምር"
       }
      },
      {
       "t": {
        "en": "COMMIT, or ROLLBACK on error",
        "am": "COMMIT፣ ወይም በስህተት ROLLBACK"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import sqlite3, random, time\ndb = sqlite3.connect(\":memory:\")\ndb.execute(\"CREATE TABLE deliveries(farmer INTEGER, day INTEGER, litres REAL)\")\nrandom.seed(0)\ndb.executemany(\"INSERT INTO deliveries VALUES (?,?,?)\", ((random.randint(1, 5000), random.randint(1, 365), random.uniform(2, 20)) for _ in range(200_000)))\nq = \"SELECT SUM(litres) FROM deliveries WHERE farmer = 1234\"\nplan = lambda: db.execute(\"EXPLAIN QUERY PLAN \" + q).fetchone()[-1]\nt = time.perf_counter(); db.execute(q).fetchone(); before = time.perf_counter() - t; p1 = plan()\ndb.execute(\"CREATE INDEX idx_farmer ON deliveries(farmer)\")\nt = time.perf_counter(); db.execute(q).fetchone(); after = time.perf_counter() - t; p2 = plan()\nprint(f\"before index: {p1}  ({before * 1000:.1f} ms)\")\nprint(f\"after index:  {p2}  ({after * 1000:.2f} ms)\")\ndb.executescript(\"CREATE TABLE accounts(name TEXT PRIMARY KEY, birr REAL CHECK (birr >= 0)); INSERT INTO accounts VALUES ('coop', 1000), ('Hana', 0);\")\ntry:\n    with db:                                     # one transaction\n        db.execute(\"UPDATE accounts SET birr = birr + 1500 WHERE name = 'Hana'\")\n        db.execute(\"UPDATE accounts SET birr = birr - 1500 WHERE name = 'coop'\")   # violates CHECK\nexcept sqlite3.IntegrityError as e:\n    print(\"transfer rolled back:\", e)\nprint(\"balances:\", db.execute(\"SELECT * FROM accounts\").fetchall())",
    "out": "before index: SCAN deliveries  (5.4 ms)\nafter index:  SEARCH deliveries USING INDEX idx_farmer (farmer=?)  (0.09 ms)\ntransfer rolled back: CHECK constraint failed: birr >= 0\nbalances: [('coop', 1000.0), ('Hana', 0.0)]",
    "title": {
     "en": "An index changes the query plan; a transaction rolls back",
     "am": "index የquery planን ይቀይራል፤ transaction ይመለሳል"
    },
    "note": {
     "en": "Times vary by computer; the change from SCAN to SEARCH USING INDEX is the point.",
     "am": "ጊዜዎች በኮምፒውተር ይለያያሉ፤ ዋናው ነጥብ ከSCAN ወደ SEARCH USING INDEX ያለው ለውጥ ነው።"
    }
   }
  },
  {
   "t": {
    "en": "Networks: TCP/IP, routing, DNS, mobile",
    "am": "ኔትወርኮች፡ TCP/IP፣ routing፣ DNS፣ ሞባይል"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Explain the layers from Wi-Fi/4G to HTTP",
     "Work with IP addresses, subnets and routing tables"
    ],
    "am": [
     "ከWi-Fi/4G እስከ HTTP ያሉትን ንብርብሮች ማብራራት",
     "ከIP አድራሻዎች፣ ከsubnets እና ከrouting tables ጋር መሥራት"
    ]
   },
   "l": {
    "en": [
     "Layers and encapsulation",
     "IP addressing and subnets (CIDR)",
     "Routing: longest-prefix match",
     "TCP vs UDP; DNS; mobile networks and latency"
    ],
    "am": [
     "ንብርብሮችና encapsulation",
     "IP addressing እና subnets (CIDR)",
     "Routing፡ longest-prefix match",
     "TCP vs UDP፤ DNS፤ የሞባይል ኔትወርኮችና መዘግየት"
    ]
   },
   "a": {
    "en": "Plan the network for a university campus with 6 departments: assign subnets, write a routing table and test which route each address takes.",
    "am": "ለ6 ዲፓርትመንቶች ላለው የዩኒቨርሲቲ ግቢ ኔትወርኩን አቅድ፡ subnets መድብ፣ routing table ጻፍ፣ እያንዳንዱ አድራሻ የትኛውን መንገድ እንደሚወስድ ፈትሽ።"
   },
   "m": {
    "en": "Python (ipaddress module), paper",
    "am": "Python (ipaddress module)፣ ወረቀት"
   },
   "q": {
    "en": [
     "Why does a router use the longest matching prefix?",
     "When would you choose UDP over TCP?"
    ],
    "am": [
     "router ለምን ረጅሙን ተዛማጅ prefix ይጠቀማል?",
     "ከTCP ይልቅ UDPን መቼ ትመርጣለህ?"
    ]
   },
   "qa": {
    "en": [
     "The longest prefix is the most specific route, so traffic goes to the exact subnet rather than a general default.",
     "For live voice, video or sensor streams where a late packet is useless, so speed matters more than guaranteed delivery."
    ],
    "am": [
     "ረጅሙ prefix በጣም የተወሰነው መንገድ ነው፤ ስለዚህ ትራፊኩ ከአጠቃላይ ነባሪ ይልቅ ወደ ትክክለኛው subnet ይሄዳል።",
     "የዘገየ packet ጥቅም ለሌለበት ቀጥታ ድምፅ፣ ቪዲዮ ወይም የሴንሰር ዥረቶች፣ ፍጥነት ከተረጋገጠ አቅርቦት በላይ ሲያስፈልግ።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Encapsulation",
      "am": "Encapsulation"
     },
     "layers": [
      {
       "t": {
        "en": "HTTP request",
        "am": "HTTP ጥያቄ"
       },
       "s": {
        "en": "application",
        "am": "application"
       }
      },
      {
       "t": {
        "en": "+ TCP header (ports)",
        "am": "+ TCP header (ports)"
       },
       "s": {
        "en": "transport",
        "am": "transport"
       }
      },
      {
       "t": {
        "en": "+ IP header (addresses)",
        "am": "+ IP header (አድራሻዎች)"
       },
       "s": {
        "en": "network",
        "am": "network"
       }
      },
      {
       "t": {
        "en": "+ Wi-Fi / 4G frame",
        "am": "+ Wi-Fi / 4G frame"
       },
       "s": {
        "en": "link",
        "am": "link"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import ipaddress\ncampus = ipaddress.ip_network(\"10.20.0.0/16\")\nsubnets = list(campus.subnets(new_prefix=19))[:6]\ndepts = [\"Agriculture\", \"Engineering\", \"Medicine\", \"Science\", \"Business\", \"Library\"]\nfor d, s in zip(depts, subnets):\n    print(f\"{d:12s} {s}  ({s.num_addresses - 2:,} hosts)\")\ntable = {ipaddress.ip_network(\"10.20.0.0/19\"): \"Agriculture switch\", ipaddress.ip_network(\"10.20.0.0/16\"): \"campus core\",\n         ipaddress.ip_network(\"10.20.4.0/24\"): \"Agri greenhouse sensors\", ipaddress.ip_network(\"0.0.0.0/0\"): \"internet (default)\"}\ndef route(addr):\n    a = ipaddress.ip_address(addr)\n    best = max((n for n in table if a in n), key=lambda n: n.prefixlen)     # longest-prefix match\n    return f\"{addr:13s} -> {table[best]} via {best}\"\nfor addr in [\"10.20.4.17\", \"10.20.9.3\", \"10.20.200.8\", \"196.188.0.1\"]:\n    print(route(addr))",
    "out": "Agriculture  10.20.0.0/19  (8,190 hosts)\nEngineering  10.20.32.0/19  (8,190 hosts)\nMedicine     10.20.64.0/19  (8,190 hosts)\nScience      10.20.96.0/19  (8,190 hosts)\nBusiness     10.20.128.0/19  (8,190 hosts)\nLibrary      10.20.160.0/19  (8,190 hosts)\n10.20.4.17    -> Agri greenhouse sensors via 10.20.4.0/24\n10.20.9.3     -> Agriculture switch via 10.20.0.0/19\n10.20.200.8   -> campus core via 10.20.0.0/16\n196.188.0.1   -> internet (default) via 0.0.0.0/0",
    "title": {
     "en": "Subnets and longest-prefix routing",
     "am": "Subnets እና longest-prefix routing"
    }
   }
  },
  {
   "t": {
    "en": "Compilers: from text to running code",
    "am": "Compilers፡ ከጽሑፍ ወደ የሚሠራ ኮድ"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Describe lexing, parsing and code generation",
     "Build a tiny expression compiler"
    ],
    "am": [
     "lexingን፣ parsingን እና code generationን መግለጽ",
     "ትንሽ የexpression compiler መገንባት"
    ]
   },
   "l": {
    "en": [
     "Tokens and the lexer",
     "Grammars and recursive-descent parsing",
     "Abstract syntax trees",
     "Generating stack-machine code"
    ],
    "am": [
     "Tokens እና lexer",
     "Grammars እና recursive-descent parsing",
     "Abstract syntax trees",
     "የstack-machine ኮድ ማመንጨት"
    ]
   },
   "a": {
    "en": "Write a compiler for arithmetic expressions with variables that outputs instructions for a stack machine, and an interpreter that runs them.",
    "am": "ከvariables ጋር ለሒሳብ expressions የstack machine መመሪያዎችን የሚያወጣ compiler እና የሚያስኬዳቸው interpreter ጻፍ።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What does the parser produce?",
     "How does the grammar make × bind tighter than +?"
    ],
    "am": [
     "parserኡ ምን ያወጣል?",
     "grammarኡ × ከ+ በበለጠ እንዲያይዝ እንዴት ያደርጋል?"
    ]
   },
   "qa": {
    "en": [
     "An abstract syntax tree showing the structure of the expression, with operator precedence resolved.",
     "It has separate rules: an expression is a sum of terms, and a term is a product of factors, so products are grouped first."
    ],
    "am": [
     "የoperator ቅድሚያ የተፈታበት የexpressionኡን መዋቅር የሚያሳይ abstract syntax tree።",
     "የተለያዩ ሕጎች አሉት፡ expression የterms ድምር ነው፣ term ደግሞ የfactors ብዜት ነው፤ ስለዚህ ብዜቶች መጀመሪያ ይቧደናሉ።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Compiler pipeline",
      "am": "የcompiler pipeline"
     },
     "nodes": [
      {
       "t": {
        "en": "\"yield * (1 + bonus)\"",
        "am": "\"yield * (1 + bonus)\""
       }
      },
      {
       "t": {
        "en": "Lexer → tokens",
        "am": "Lexer → tokens"
       }
      },
      {
       "t": {
        "en": "Parser → tree",
        "am": "Parser → ዛፍ"
       }
      },
      {
       "t": {
        "en": "Code generator → PUSH, ADD, MUL",
        "am": "Code generator → PUSH፣ ADD፣ MUL"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import re\ndef lex(s): return re.findall(r\"\\d+\\.?\\d*|[A-Za-z_]\\w*|[-+*/()]\", s)\ndef parse(tokens):\n    pos = 0\n    def peek(): return tokens[pos] if pos < len(tokens) else None\n    def take():\n        nonlocal pos; pos += 1; return tokens[pos - 1]\n    def factor():\n        t = take()\n        if t == \"(\":\n            e = expr(); take(); return e\n        return (\"num\", float(t)) if t[0].isdigit() else (\"var\", t)\n    def term():\n        node = factor()\n        while peek() in (\"*\", \"/\"): node = (take(), node, factor())\n        return node\n    def expr():\n        node = term()\n        while peek() in (\"+\", \"-\"): node = (take(), node, term())\n        return node\n    return expr()\ndef gen(n):\n    if n[0] == \"num\": return [(\"PUSH\", n[1])]\n    if n[0] == \"var\": return [(\"LOAD\", n[1])]\n    return gen(n[1]) + gen(n[2]) + [({\"+\": \"ADD\", \"-\": \"SUB\", \"*\": \"MUL\", \"/\": \"DIV\"}[n[0]], None)]\ndef run(code, env):\n    st = []\n    for op, arg in code:\n        if op == \"PUSH\": st.append(arg)\n        elif op == \"LOAD\": st.append(env[arg])\n        else:\n            b, a = st.pop(), st.pop()\n            st.append({\"ADD\": a + b, \"SUB\": a - b, \"MUL\": a * b, \"DIV\": a / b}[op])\n    return st[0]\nsrc = \"yield * (1 + bonus) - 2 * cost\"\ntree = parse(lex(src)); code = gen(tree)\nprint(\"tokens:\", lex(src)); print(\"tree:\", tree)\nprint(\"code:\", [f\"{op} {arg}\" if arg is not None else op for op, arg in code])\nprint(\"result:\", run(code, {\"yield\": 1.6, \"bonus\": 0.25, \"cost\": 0.3}))",
    "out": "tokens: ['yield', '*', '(', '1', '+', 'bonus', ')', '-', '2', '*', 'cost']\ntree: ('-', ('*', ('var', 'yield'), ('+', ('num', 1.0), ('var', 'bonus'))), ('*', ('num', 2.0), ('var', 'cost')))\ncode: ['LOAD yield', 'PUSH 1.0', 'LOAD bonus', 'ADD', 'MUL', 'PUSH 2.0', 'LOAD cost', 'MUL', 'SUB']\nresult: 1.4",
    "title": {
     "en": "A tiny compiler: lexer, parser, code generator, stack machine",
     "am": "ትንሽ compiler፡ lexer፣ parser፣ code generator፣ stack machine"
    }
   }
  },
  {
   "t": {
    "en": "Theory of computation",
    "am": "የcomputation ቲዎሪ"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Build finite automata and explain their limits",
     "Explain Turing machines and undecidable problems"
    ],
    "am": [
     "finite automataን መገንባትና ገደቦቻቸውን ማብራራት",
     "Turing machinesን እና የማይወሰኑ ችግሮችን ማብራራት"
    ]
   },
   "l": {
    "en": [
     "Finite automata and regular expressions",
     "What finite memory cannot do",
     "Turing machines",
     "The halting problem"
    ],
    "am": [
     "Finite automata እና regular expressions",
     "ውሱን ማስታወሻ የማይችለው",
     "Turing machines",
     "Halting problem"
    ]
   },
   "a": {
    "en": "Design an automaton that accepts binary numbers divisible by 3, test it on many inputs, and write the proof sketch that no program can decide halting for all programs.",
    "am": "በ3 የሚካፈሉ የbinary ቁጥሮችን የሚቀበል automaton ንደፍ፣ በብዙ ግብዓቶች ፈትሸው፣ ማንም ፕሮግራም ለሁሉም ፕሮግራሞች halting መወሰን እንደማይችል የማረጋገጫ ንድፉን ጻፍ።"
   },
   "m": {
    "en": "Paper, Python",
    "am": "ወረቀት፣ Python"
   },
   "q": {
    "en": [
     "Is every problem computable? Give an example.",
     "Why can’t a finite automaton check balanced brackets of any depth?"
    ],
    "am": [
     "እያንዳንዱ ችግር ሊሰላ ይችላል? ምሳሌ ስጥ።",
     "finite automaton የማንኛውም ጥልቀት የተመጣጠኑ ቅንፎችን ለምን መፈተሽ አይችልም?"
    ]
   },
   "qa": {
    "en": [
     "No. The halting problem: no algorithm can decide, for every program and input, whether it eventually stops.",
     "It has a fixed number of states, so it cannot count arbitrarily deep nesting; that needs a stack (a pushdown automaton)."
    ],
    "am": [
     "አይደለም። Halting problem፡ ለእያንዳንዱ ፕሮግራምና ግብዓት በመጨረሻ ይቆማል ወይ ብሎ ሊወስን የሚችል algorithm የለም።",
     "የተወሰነ ቁጥር states አለው፤ ስለዚህ በዘፈቀደ ጥልቀት ያለ መደራረብን መቁጠር አይችልም፤ ያ stack (pushdown automaton) ይፈልጋል።"
    ]
   },
   "dg": [
    {
     "type": "cycle",
     "title": {
      "en": "DFA: remainder mod 3 while reading bits",
      "am": "DFA፡ bits እያነበበ ቀሪ mod 3"
     },
     "nodes": [
      {
       "t": {
        "en": "state 0 (accept)",
        "am": "state 0 (ተቀበል)"
       },
       "s": {
        "en": "bit b → (2·0 + b) mod 3",
        "am": "bit b → (2·0 + b) mod 3"
       },
       "hl": true
      },
      {
       "t": {
        "en": "state 1",
        "am": "state 1"
       },
       "s": {
        "en": "b → (2 + b) mod 3",
        "am": "b → (2 + b) mod 3"
       }
      },
      {
       "t": {
        "en": "state 2",
        "am": "state 2"
       },
       "s": {
        "en": "b → (4 + b) mod 3",
        "am": "b → (4 + b) mod 3"
       }
      }
     ],
     "loop": {
      "en": "one transition per input bit",
      "am": "ለእያንዳንዱ የግብዓት bit አንድ ሽግግር"
     }
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "DELTA = {(s, b): (2 * s + b) % 3 for s in range(3) for b in (0, 1)}     # the transition table\ndef accepts(bits):\n    s = 0\n    for ch in bits: s = DELTA[(s, int(ch))]\n    return s == 0\ntests = [format(n, \"b\") for n in range(0, 40)]\nassert all(accepts(b) == (int(b, 2) % 3 == 0) for b in tests)            # checked against arithmetic\nprint(\"accepted (divisible by 3):\", [int(b, 2) for b in tests if accepts(b)])\nprint(\"transition table:\", DELTA)",
    "out": "accepted (divisible by 3): [0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39]\ntransition table: {(0, 0): 0, (0, 1): 1, (1, 0): 2, (1, 1): 0, (2, 0): 1, (2, 1): 2}",
    "title": {
     "en": "A 3-state automaton for \"divisible by 3\"",
     "am": "ለ«በ3 የሚካፈል» ባለ 3-state automaton"
    },
    "note": {
     "en": "Halting, in one paragraph: if a program H(p) could always decide whether p halts, build D that runs H on itself and does the opposite; D halts if and only if it does not, a contradiction.",
     "am": "Halting በአንድ አንቀጽ፡ ፕሮግራም H(p) p ይቆማል ወይ ብሎ ሁልጊዜ መወሰን ቢችል፣ Hን በራሱ ላይ የሚያስኬድና ተቃራኒውን የሚያደርግ Dን ገንባ፤ D የሚቆመው ካልቆመ ብቻ ነው፣ ይህም ተቃርኖ ነው።"
    }
   }
  },
  {
   "t": {
    "en": "Optimisation and numerical methods",
    "am": "Optimisation እና numerical methods"
   },
   "d": {
    "en": "5 weeks · 15–20 h per week",
    "am": "5 ሳምንታት · በሳምንት 15–20 ሰዓት"
   },
   "o": {
    "en": [
     "Fit models by minimising error with gradient descent",
     "Understand floating-point error and conditioning"
    ],
    "am": [
     "በgradient descent ስህተትን በመቀነስ ሞዴሎችን መግጠም",
     "የfloating-point ስህተትንና conditioningን መረዳት"
    ]
   },
   "l": {
    "en": [
     "Gradient descent and the learning rate",
     "Newton’s method and convergence speed",
     "Floating point: rounding and cancellation",
     "Ill-conditioned problems"
    ],
    "am": [
     "Gradient descent እና learning rate",
     "የNewton ዘዴና የconvergence ፍጥነት",
     "Floating point፡ rounding እና cancellation",
     "Ill-conditioned ችግሮች"
    ]
   },
   "a": {
    "en": "Fit a straight line to yield data by gradient descent with three learning rates (too small, good, too large) and compare with the exact least-squares solution.",
    "am": "በሦስት learning rates (በጣም ትንሽ፣ ጥሩ፣ በጣም ትልቅ) በgradient descent ቀጥ ያለ መስመርን ለምርት ዳታ ግጠም፣ ከትክክለኛው least-squares መፍትሔ ጋር አወዳድር።"
   },
   "m": {
    "en": "Python with NumPy",
    "am": "Python ከNumPy ጋር"
   },
   "q": {
    "en": [
     "What happens if the learning rate is too large?",
     "Why is 0.1 + 0.2 not exactly 0.3 in a computer?"
    ],
    "am": [
     "learning rate በጣም ትልቅ ከሆነ ምን ይሆናል?",
     "በኮምፒውተር ውስጥ 0.1 + 0.2 በትክክል 0.3 ለምን አይሆንም?"
    ]
   },
   "qa": {
    "en": [
     "Steps overshoot the minimum and the error grows or oscillates instead of falling.",
     "Most decimals cannot be stored exactly in binary, so tiny rounding errors appear; compare floats with a tolerance."
    ],
    "am": [
     "እርምጃዎች ዝቅተኛውን አልፈው ይሄዳሉ፤ ስህተቱም ከመቀነስ ይልቅ ያድጋል ወይም ይወዛወዛል።",
     "አብዛኞቹ decimals በbinary በትክክል ሊቀመጡ አይችሉም፤ ስለዚህ ትናንሽ የrounding ስህተቶች ይታያሉ፤ floatsን በtolerance አወዳድር።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Learning rate",
      "am": "Learning rate"
     },
     "cols": [
      {
       "h": {
        "en": "Too small",
        "am": "በጣም ትንሽ"
       },
       "items": {
        "en": [
         "safe but very slow"
        ],
        "am": [
         "ደህንነቱ የተጠበቀ ግን በጣም ቀርፋፋ"
        ]
       },
       "tone": "bad"
      },
      {
       "h": {
        "en": "Good",
        "am": "ጥሩ"
       },
       "items": {
        "en": [
         "fast, steady decrease"
        ],
        "am": [
         "ፈጣን፣ የተረጋጋ ቅነሳ"
        ]
       },
       "tone": "good"
      },
      {
       "h": {
        "en": "Too large",
        "am": "በጣም ትልቅ"
       },
       "items": {
        "en": [
         "overshoots, diverges"
        ],
        "am": [
         "ያልፋል፣ ይበተናል"
        ]
       },
       "tone": "bad"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nrng = np.random.default_rng(1)\nN = rng.uniform(0, 1.5, 60)                  # nitrogen, hundreds of kg/ha\nY = 1.8 + 1.2 * N + rng.normal(0, 0.25, 60)  # yield t/ha\nexact = np.polyfit(N, Y, 1)[::-1]            # [intercept, slope]\nfor lr in [0.01, 0.3, 1.2]:\n    a = b = 0.0\n    for _ in range(300):\n        err = a + b * N - Y\n        a -= lr * 2 * err.mean(); b -= lr * 2 * (err * N).mean()\n    mse = np.mean((a + b * N - Y) ** 2)\n    print(f\"lr = {lr:4}: intercept {a:9.3g}, slope {b:9.3g}, error {mse:9.3g}\")\nprint(f\"exact least squares: intercept {exact[0]:.3f}, slope {exact[1]:.3f}\")\nprint(\"0.1 + 0.2 == 0.3?\", 0.1 + 0.2 == 0.3, \"| close enough?\", abs(0.1 + 0.2 - 0.3) < 1e-12)",
    "out": "lr = 0.01: intercept      1.66, slope      1.34, error    0.0431\nlr =  0.3: intercept      1.74, slope      1.25, error    0.0417\nlr =  1.2: intercept -2.23e+147, slope -1.98e+147, error 1.52e+295\nexact least squares: intercept 1.741, slope 1.252\n0.1 + 0.2 == 0.3? False | close enough? True",
    "title": {
     "en": "Gradient descent with three learning rates",
     "am": "Gradient descent ከሦስት learning rates ጋር"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "AI search: BFS, DFS, A*, games",
    "am": "AI search፡ BFS፣ DFS፣ A*፣ ጨዋታዎች"
   },
   "d": {
    "en": "5 weeks · 6–8 h per week",
    "am": "5 ሳምንታት · በሳምንት 6–8 ሰዓት"
   },
   "o": {
    "en": [
     "Formulate problems as states, actions and goals",
     "Compare uninformed and heuristic search"
    ],
    "am": [
     "ችግሮችን እንደ states፣ actions እና goals መቅረጽ",
     "uninformed እና heuristic searchን ማወዳደር"
    ]
   },
   "l": {
    "en": [
     "State spaces",
     "BFS and DFS",
     "A* with an admissible heuristic",
     "Minimax for two-player games"
    ],
    "am": [
     "State spaces",
     "BFS እና DFS",
     "A* ከadmissible heuristic ጋር",
     "ለሁለት ተጫዋቾች ጨዋታዎች Minimax"
    ]
   },
   "a": {
    "en": "Plan a drone’s path across a field map with obstacles using BFS and A*, and count how many cells each explores.",
    "am": "እንቅፋቶች ባሉበት የማሳ ካርታ ላይ የድሮንን መንገድ በBFS እና በA* አቅድ፣ እያንዳንዱ ስንት ሴሎችን እንደሚያስስ ቁጠር።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why does A* need a good heuristic?",
     "What does \"admissible\" mean?"
    ],
    "am": [
     "A* ለምን ጥሩ heuristic ያስፈልገዋል?",
     "«admissible» ማለት ምን ማለት ነው?"
    ]
   },
   "qa": {
    "en": [
     "The heuristic guides it towards the goal; an admissible one keeps the path optimal while exploring far fewer states.",
     "The heuristic never overestimates the true remaining cost."
    ],
    "am": [
     "heuristicኡ ወደ ግቡ ይመራዋል፤ admissible የሆነ heuristic በጣም ጥቂት states እያሰሰ መንገዱን ምርጥ ያደርገዋል።",
     "heuristicኡ እውነተኛውን የቀረ ዋጋ በፍጹም አያጋንንም።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A*: f = g + h",
      "am": "A*፡ f = g + h"
     },
     "nodes": [
      {
       "t": {
        "en": "g: cost so far",
        "am": "g፡ እስካሁን ያለ ዋጋ"
       }
      },
      {
       "t": {
        "en": "h: estimate to goal",
        "am": "h፡ እስከ ግቡ ግምት"
       },
       "s": {
        "en": "Manhattan distance",
        "am": "Manhattan distance"
       }
      },
      {
       "t": {
        "en": "expand lowest f",
        "am": "ዝቅተኛ fን አስፋ"
       }
      },
      {
       "t": {
        "en": "goal: optimal path",
        "am": "ግብ፡ ምርጥ መንገድ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import heapq\nfrom collections import deque\ngrid = [\"S...................\",\n        \"....................\",\n        \"........##..........\",\n        \"........##..........\",\n        \"....................\",\n        \"..............###...\",\n        \"...................G\",\n        \"....................\"]\nR, C = len(grid), len(grid[0])\nfind = lambda ch: next((r, c) for r in range(R) for c in range(C) if grid[r][c] == ch)\nstart, goal = find(\"S\"), find(\"G\")\ndef nbrs(p):\n    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):\n        r, c = p[0] + dr, p[1] + dc\n        if 0 <= r < R and 0 <= c < C and grid[r][c] != \"#\": yield (r, c)\ndef bfs():\n    seen, q = {start: 0}, deque([start])\n    while q:\n        p = q.popleft()\n        if p == goal: return seen[p], len(seen)\n        for n in nbrs(p):\n            if n not in seen: seen[n] = seen[p] + 1; q.append(n)\ndef astar():\n    h = lambda p: abs(p[0] - goal[0]) + abs(p[1] - goal[1])\n    g, pq, expanded = {start: 0}, [(h(start), h(start), start)], set()\n    while pq:\n        _, _, p = heapq.heappop(pq)\n        if p in expanded: continue\n        expanded.add(p)\n        if p == goal: return g[p], len(expanded)\n        for n in nbrs(p):\n            if g[p] + 1 < g.get(n, 1e9): g[n] = g[p] + 1; heapq.heappush(pq, (g[n] + h(n), h(n), n))   # ties: prefer closer to goal\nprint(\"BFS: path length %d, cells visited %d\" % bfs())\nprint(\"A*:  path length %d, cells expanded %d\" % astar())",
    "out": "BFS: path length 25, cells visited 153\nA*:  path length 25, cells expanded 26",
    "title": {
     "en": "BFS vs A* on a field map",
     "am": "BFS vs A* በማሳ ካርታ ላይ"
    }
   }
  },
  {
   "t": {
    "en": "Logic, planning and constraint satisfaction",
    "am": "ሎጂክ፣ ዕቅድና constraint satisfaction"
   },
   "d": {
    "en": "5 weeks · 6–8 h per week",
    "am": "5 ሳምንታት · በሳምንት 6–8 ሰዓት"
   },
   "o": {
    "en": [
     "Represent knowledge as constraints",
     "Solve constraint problems with backtracking"
    ],
    "am": [
     "ዕውቀትን እንደ constraints መወከል",
     "የconstraint ችግሮችን በbacktracking መፍታት"
    ]
   },
   "l": {
    "en": [
     "Propositional and first-order logic",
     "Constraint satisfaction: variables, domains, constraints",
     "Backtracking with forward checking",
     "Planning: actions with preconditions and effects"
    ],
    "am": [
     "Propositional እና first-order logic",
     "Constraint satisfaction፡ variables፣ domains፣ constraints",
     "Backtracking ከforward checking ጋር",
     "ዕቅድ፡ ከቅድመ ሁኔታዎችና ከውጤቶች ጋር ያሉ ተግባራት"
    ]
   },
   "a": {
    "en": "Assign crops to six plots so that neighbouring plots do not grow the same crop family (to limit pests) and the cooperative’s minimum teff area is met.",
    "am": "የተባይ ስርጭትን ለመገደብ ጎረቤት ማሳዎች ተመሳሳይ የሰብል ቤተሰብ እንዳያበቅሉና የማኅበሩ ዝቅተኛ የጤፍ ስፋት እንዲሟላ ሰብሎችን ለስድስት ማሳዎች መድብ።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What are the three parts of a constraint satisfaction problem?",
     "What does backtracking do when it hits a dead end?"
    ],
    "am": [
     "የconstraint satisfaction ችግር ሦስቱ ክፍሎች ምንድናቸው?",
     "backtracking የማይወጣበት ቦታ ሲደርስ ምን ያደርጋል?"
    ]
   },
   "qa": {
    "en": [
     "Variables (the plots), domains (possible crops for each) and constraints (rules between them).",
     "It undoes the most recent choice and tries the next value, instead of starting over."
    ],
    "am": [
     "Variables (ማሳዎቹ)፣ domains (ለእያንዳንዱ ሊሆኑ የሚችሉ ሰብሎች) እና constraints (በመካከላቸው ያሉ ሕጎች)።",
     "እንደገና ከመጀመር ይልቅ የቅርብ ጊዜውን ምርጫ ይቀለብሳልና ቀጣዩን እሴት ይሞክራል።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "Six plots and their neighbours",
      "am": "ስድስት ማሳዎችና ጎረቤቶቻቸው"
     },
     "root": {
      "t": {
       "en": "P1",
       "am": "P1"
      }
     },
     "kids": [
      {
       "t": {
        "en": "P2 (borders P1, P3, P5)",
        "am": "P2 (ከP1፣ P3፣ P5 ጋር ይዋሰናል)"
       }
      },
      {
       "t": {
        "en": "P4 (borders P1, P5)",
        "am": "P4 (ከP1፣ P5 ጋር ይዋሰናል)"
       }
      },
      {
       "t": {
        "en": "P6 (borders P3, P5)",
        "am": "P6 (ከP3፣ P5 ጋር ይዋሰናል)"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "plots = [\"P1\", \"P2\", \"P3\", \"P4\", \"P5\", \"P6\"]\nborders = {(\"P1\", \"P2\"), (\"P1\", \"P4\"), (\"P2\", \"P3\"), (\"P2\", \"P5\"), (\"P4\", \"P5\"), (\"P3\", \"P6\"), (\"P5\", \"P6\")}\nfamily = {\"teff\": \"grass\", \"maize\": \"grass\", \"faba bean\": \"legume\", \"chickpea\": \"legume\", \"potato\": \"solanum\"}\nadj = lambda a, b: (a, b) in borders or (b, a) in borders\nsteps = 0\ndef ok(plan, plot, crop):\n    return all(not (adj(plot, q) and family[c] == family[crop]) for q, c in plan.items())\ndef solve(plan):\n    global steps; steps += 1\n    if len(plan) == len(plots):\n        return plan if sum(c == \"teff\" for c in plan.values()) >= 2 else None   # global constraint\n    plot = plots[len(plan)]\n    for crop in family:\n        if ok(plan, plot, crop):\n            result = solve({**plan, plot: crop})\n            if result: return result\n    return None                                                                  # backtrack\nplan = solve({})\nprint(plan); print(\"search steps:\", steps)",
    "out": "{'P1': 'teff', 'P2': 'faba bean', 'P3': 'teff', 'P4': 'faba bean', 'P5': 'teff', 'P6': 'faba bean'}\nsearch steps: 7",
    "title": {
     "en": "Backtracking a crop plan",
     "am": "የሰብል ዕቅድን በbacktracking"
    }
   }
  },
  {
   "t": {
    "en": "Linear and logistic regression from scratch",
    "am": "Linear እና logistic regression ከመነሻ"
   },
   "d": {
    "en": "5 weeks · 6–8 h per week",
    "am": "5 ሳምንታት · በሳምንት 6–8 ሰዓት"
   },
   "o": {
    "en": [
     "Derive and implement least squares and logistic regression",
     "Interpret coefficients and probabilities"
    ],
    "am": [
     "least squaresን እና logistic regressionን ማውጣትና መተግበር",
     "coefficientsን እና ፕሮባቢሊቲዎችን መተርጎም"
    ]
   },
   "l": {
    "en": [
     "Least squares: normal equations",
     "Logistic regression: sigmoid and log-loss",
     "Gradient descent implementation",
     "Check against scikit-learn"
    ],
    "am": [
     "Least squares፡ normal equations",
     "Logistic regression፡ sigmoid እና log-loss",
     "የgradient descent ትግበራ",
     "ከscikit-learn ጋር ፈትሽ"
    ]
   },
   "a": {
    "en": "Predict whether a farmer adopts improved seed from farm size and extension visits; implement logistic regression in NumPy and confirm the coefficients with scikit-learn.",
    "am": "ገበሬ የተሻሻለ ዘር እንደሚቀበል ከእርሻ መጠንና ከኤክስቴንሽን ጉብኝቶች ተንብይ፤ logistic regressionን በNumPy ተግብርና coefficientsን በscikit-learn አረጋግጥ።"
   },
   "m": {
    "en": "Python with NumPy and scikit-learn",
    "am": "Python ከNumPy እና scikit-learn ጋር"
   },
   "q": {
    "en": [
     "Why use the sigmoid in logistic regression?",
     "How do you read a logistic coefficient of 0.7 for extension visits?"
    ],
    "am": [
     "በlogistic regression ውስጥ sigmoid ለምን እንጠቀማለን?",
     "ለኤክስቴንሽን ጉብኝቶች የ0.7 logistic coefficientን እንዴት ታነበዋለህ?"
    ]
   },
   "qa": {
    "en": [
     "It turns any number into a probability between 0 and 1.",
     "Each extra visit multiplies the odds of adoption by e^0.7 ≈ 2, holding the other variables fixed."
    ],
    "am": [
     "ማንኛውንም ቁጥር በ0 እና በ1 መካከል ወዳለ ፕሮባቢሊቲ ይቀይራል።",
     "እያንዳንዱ ተጨማሪ ጉብኝት ሌሎቹን variables ቋሚ በማድረግ የመቀበልን odds በe^0.7 ≈ 2 ያባዛል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Logistic regression",
      "am": "Logistic regression"
     },
     "nodes": [
      {
       "t": {
        "en": "z = b₀ + b₁·size + b₂·visits",
        "am": "z = b₀ + b₁·size + b₂·visits"
       }
      },
      {
       "t": {
        "en": "p = 1 / (1 + e⁻ᶻ)",
        "am": "p = 1 / (1 + e⁻ᶻ)"
       }
      },
      {
       "t": {
        "en": "loss = log-loss",
        "am": "loss = log-loss"
       }
      },
      {
       "t": {
        "en": "gradient step",
        "am": "gradient እርምጃ"
       },
       "hl": true
      }
     ],
     "loop": {
      "en": "repeat until the loss stops falling",
      "am": "loss መቀነሱን እስኪያቆም ድገም"
     }
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nrng = np.random.default_rng(3); n = 800\nsize = rng.uniform(0.25, 3, n); visits = rng.integers(0, 6, n)\nz = -3 + 0.8 * size + 0.7 * visits\nadopt = (rng.random(n) < 1 / (1 + np.exp(-z))).astype(float)\nX = np.column_stack([np.ones(n), size, visits])\nb = np.zeros(3)\nfor _ in range(20000):\n    p = 1 / (1 + np.exp(-X @ b))\n    b -= 0.05 * X.T @ (p - adopt) / n                 # gradient of the log-loss\nsk = LogisticRegression(C=1e6, max_iter=5000).fit(X[:, 1:], adopt)\nprint(\"from scratch: \", b.round(2))\nprint(\"scikit-learn: \", np.r_[sk.intercept_, sk.coef_[0]].round(2))\nprint(f\"odds ratio per extension visit: {np.exp(b[2]):.2f}\")",
    "out": "from scratch:  [-2.91  0.86  0.66]\nscikit-learn:  [-2.91  0.86  0.66]\nodds ratio per extension visit: 1.94",
    "title": {
     "en": "Logistic regression in NumPy, checked against scikit-learn",
     "am": "Logistic regression በNumPy፣ በscikit-learn የተረጋገጠ"
    },
    "note": {
     "en": "Simulated data with true coefficients −3, 0.8 and 0.7; the estimates should be close.",
     "am": "እውነተኛ coefficients −3፣ 0.8 እና 0.7 ያሉት የተመሰለ ዳታ፤ ግምቶቹ መቅረብ አለባቸው።"
    }
   }
  },
  {
   "t": {
    "en": "SVMs, trees, forests, k-means and PCA",
    "am": "SVMs፣ trees፣ forests፣ k-means እና PCA"
   },
   "d": {
    "en": "5 weeks · 6–8 h per week",
    "am": "5 ሳምንታት · በሳምንት 6–8 ሰዓት"
   },
   "o": {
    "en": [
     "Apply core supervised and unsupervised methods",
     "Explain what each method assumes"
    ],
    "am": [
     "ዋና supervised እና unsupervised ዘዴዎችን መተግበር",
     "እያንዳንዱ ዘዴ ምን እንደሚገምት ማብራራት"
    ]
   },
   "l": {
    "en": [
     "SVMs and margins; kernels",
     "Decision trees and random forests",
     "k-means clustering",
     "PCA: directions of most variance"
    ],
    "am": [
     "SVMs እና margins፤ kernels",
     "Decision trees እና random forests",
     "k-means clustering",
     "PCA፡ ብዙ variance ያላቸው አቅጣጫዎች"
    ]
   },
   "a": {
    "en": "Group 300 farms into types from five measurements with k-means, visualise them with PCA, then predict the type of new farms with a random forest.",
    "am": "300 እርሻዎችን ከአምስት ልኬቶች በk-means ወደ ዓይነቶች ቧድን፣ በPCA አሳያቸው፣ ከዚያ የአዳዲስ እርሻዎችን ዓይነት በrandom forest ተንብይ።"
   },
   "m": {
    "en": "Python with scikit-learn",
    "am": "Python ከscikit-learn ጋር"
   },
   "q": {
    "en": [
     "What does PCA do to the data?",
     "Why scale variables before k-means?"
    ],
    "am": [
     "PCA ዳታውን ምን ያደርገዋል?",
     "ከk-means በፊት variablesን ለምን scale እናደርጋለን?"
    ]
   },
   "qa": {
    "en": [
     "It rotates the data onto new axes ordered by the variance they explain, so the first few can summarise many variables.",
     "k-means uses distances, so a variable measured in large units (birr) would dominate one in small units (hectares)."
    ],
    "am": [
     "ዳታውን በሚያብራሩት variance ወደተደረደሩ አዳዲስ axes ያዞረዋል፤ ስለዚህ የመጀመሪያዎቹ ጥቂቶች ብዙ variablesን ሊያጠቃልሉ ይችላሉ።",
     "k-means ርቀቶችን ይጠቀማል፤ ስለዚህ በትላልቅ መለኪያዎች (ብር) የሚለካ variable በትናንሽ መለኪያዎች (ሄክታር) ያለውን ይቆጣጠራል።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Learning with and without labels",
      "am": "ከlabels ጋርና ያለ labels መማር"
     },
     "cols": [
      {
       "h": {
        "en": "Unsupervised",
        "am": "Unsupervised"
       },
       "items": {
        "en": [
         "k-means: find groups",
         "PCA: find main directions"
        ],
        "am": [
         "k-means፡ ቡድኖችን ፈልግ",
         "PCA፡ ዋና አቅጣጫዎችን ፈልግ"
        ]
       },
       "tone": ""
      },
      {
       "h": {
        "en": "Supervised",
        "am": "Supervised"
       },
       "items": {
        "en": [
         "SVM, trees, forests: predict a known label"
        ],
        "am": [
         "SVM፣ trees፣ forests፡ የሚታወቅ labelን ተንብይ"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nfrom sklearn.decomposition import PCA\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import cross_val_score\nrng = np.random.default_rng(7)\ncentres = np.array([[0.5, 2, 0, 20, 1.2], [2.5, 6, 1, 60, 2.8], [1.0, 12, 0, 35, 1.5]])  # ha, cattle, irrigation, km, t/ha\nspread = np.array([0.2, 1.5, 0.3, 8, 0.3])\nX = np.vstack([c + rng.normal(0, 1, (100, 5)) * spread for c in centres])\nZ = StandardScaler().fit_transform(X)\nlabels = KMeans(3, n_init=10, random_state=0).fit_predict(Z)\npca = PCA(2).fit(Z)\nprint(\"variance explained by PC1, PC2:\", pca.explained_variance_ratio_.round(2))\nfor k in range(3):\n    print(f\"type {k}: {np.sum(labels == k)} farms, mean ha {X[labels == k, 0].mean():.1f}, cattle {X[labels == k, 1].mean():.0f}, yield {X[labels == k, 4].mean():.1f} t/ha\")\nacc = cross_val_score(RandomForestClassifier(200, random_state=0), X, labels, cv=5).mean()\nprint(f\"random forest predicting the farm type: {acc:.2f} cross-validated accuracy\")",
    "out": "variance explained by PC1, PC2: [0.69 0.21]\ntype 0: 100 farms, mean ha 2.5, cattle 6, yield 2.8 t/ha\ntype 1: 100 farms, mean ha 0.5, cattle 2, yield 1.2 t/ha\ntype 2: 100 farms, mean ha 1.0, cattle 12, yield 1.5 t/ha\nrandom forest predicting the farm type: 1.00 cross-validated accuracy",
    "title": {
     "en": "Farm typology: k-means, PCA and a random forest",
     "am": "የእርሻ ዓይነቶች፡ k-means፣ PCA እና random forest"
    },
    "note": {
     "en": "Simulated farms with three built-in types (small mixed, irrigated, livestock-heavy) for practice.",
     "am": "ለልምምድ ሦስት አብሮ የተሠሩ ዓይነቶች (ትንሽ ቅልቅል፣ በመስኖ የሚለማ፣ ብዙ እንስሳት ያሉት) ያሏቸው የተመሰሉ እርሻዎች።"
    }
   }
  },
  {
   "t": {
    "en": "Evaluation: cross-validation, confusion matrix, fairness",
    "am": "ግምገማ፡ cross-validation፣ confusion matrix፣ ፍትሐዊነት"
   },
   "d": {
    "en": "5 weeks · 6–8 h per week",
    "am": "5 ሳምንታት · በሳምንት 6–8 ሰዓት"
   },
   "o": {
    "en": [
     "Estimate performance honestly with cross-validation",
     "Check errors by group for fairness"
    ],
    "am": [
     "አፈጻጸምን በcross-validation በታማኝነት መገመት",
     "ለፍትሐዊነት ስህተቶችን በቡድን መፈተሽ"
    ]
   },
   "l": {
    "en": [
     "k-fold cross-validation",
     "Precision, recall and the confusion matrix",
     "Overfitting: train vs validation curves",
     "Fairness: compare errors across groups"
    ],
    "am": [
     "k-fold cross-validation",
     "Precision፣ recall እና confusion matrix",
     "Overfitting፡ train vs validation curves",
     "ፍትሐዊነት፡ በቡድኖች መካከል ስህተቶችን አወዳድር"
    ]
   },
   "a": {
    "en": "Evaluate a loan-eligibility model for farmers by region and gender: report recall for each group and propose a fix if one group is missed more often.",
    "am": "ለገበሬዎች የብድር ብቁነት ሞዴልን በክልልና በጾታ ገምግም፡ ለእያንዳንዱ ቡድን recallን ዘግብ፣ አንድ ቡድን በተደጋጋሚ የሚያመልጥ ከሆነ ማስተካከያ አቅርብ።"
   },
   "m": {
    "en": "Python with scikit-learn",
    "am": "Python ከscikit-learn ጋር"
   },
   "q": {
    "en": [
     "What is overfitting and how do you detect it?",
     "Why can overall accuracy hide unfairness?"
    ],
    "am": [
     "overfitting ምንድነው፣ እንዴትስ ትለየዋለህ?",
     "አጠቃላይ accuracy ፍትሐዊ አለመሆንን ለምን ሊደብቅ ይችላል?"
    ]
   },
   "qa": {
    "en": [
     "The model fits noise in the training data; you see training error keep falling while validation error rises.",
     "A model can be accurate on the large group and much worse on a small group; only per-group metrics show it."
    ],
    "am": [
     "ሞዴሉ በሥልጠና ዳታ ውስጥ ያለ ጫጫታን ይገጥማል፤ የሥልጠና ስህተት እየቀነሰ የvalidation ስህተት ሲጨምር ታያለህ።",
     "ሞዴል በትልቁ ቡድን ላይ ትክክለኛ ሆኖ በትንሹ ቡድን ላይ በጣም የከፋ ሊሆን ይችላል፤ ይህን የሚያሳዩት በቡድን የሚለኩ መለኪያዎች ብቻ ናቸው።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Questions an evaluation must answer",
      "am": "ግምገማ መመለስ ያለበት ጥያቄዎች"
     },
     "layers": [
      {
       "t": {
        "en": "How good on unseen data?",
        "am": "ባልታየ ዳታ ላይ ምን ያህል ጥሩ ነው?"
       },
       "s": {
        "en": "cross-validation",
        "am": "cross-validation"
       }
      },
      {
       "t": {
        "en": "Which errors?",
        "am": "የትኞቹ ስህተቶች?"
       },
       "s": {
        "en": "confusion matrix, precision, recall",
        "am": "confusion matrix፣ precision፣ recall"
       }
      },
      {
       "t": {
        "en": "For whom?",
        "am": "ለማን?"
       },
       "s": {
        "en": "metrics by group",
        "am": "በቡድን መለኪያዎች"
       }
      },
      {
       "t": {
        "en": "Better than a simple baseline?",
        "am": "ከቀላል baseline የተሻለ ነው?"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.model_selection import cross_val_predict\nfrom sklearn.metrics import recall_score, precision_score\nrng = np.random.default_rng(11); n = 3000\nwomen = rng.random(n) < 0.35\nland = np.where(women, rng.normal(0.8, 0.3, n), rng.normal(1.6, 0.5, n)).clip(0.1)     # women hold less land\nsavings = np.where(women, rng.normal(3.5, 1.5, n), rng.normal(5, 1.5, n))\ntrade = np.where(women, rng.normal(2.5, 0.8, n), rng.normal(0.5, 0.5, n))             # off-farm trading income\nrepays = (0.3 * savings + 0.2 * land + 0.6 * trade + rng.normal(0, 0.5, n)) > 2.3     # true repayment ability\nX = np.column_stack([land, savings])                 # the model does not see trading income\npred = cross_val_predict(LogisticRegression(), X, repays, cv=5)\nprint(f\"overall: precision {precision_score(repays, pred):.2f}, recall {recall_score(repays, pred):.2f}\")\nfor name, g in [(\"men\", ~women), (\"women\", women)]:\n    print(f\"{name:5s}: recall {recall_score(repays[g], pred[g]):.2f} (share of good borrowers the model approves)\")",
    "out": "overall: precision 0.64, recall 0.67\nmen  : recall 0.74 (share of good borrowers the model approves)\nwomen: recall 0.59 (share of good borrowers the model approves)",
    "title": {
     "en": "Recall by group: a hidden fairness gap",
     "am": "Recall በቡድን፡ የተደበቀ የፍትሐዊነት ክፍተት"
    },
    "note": {
     "en": "Simulated data. Overall recall looks acceptable, but good women borrowers are approved far less often: their repayment comes partly from trading income the model never sees, and they hold less land. Fixes: collect the missing variable, review features that act as proxies for gender, check thresholds by group, and involve the people affected.",
     "am": "የተመሰለ ዳታ። አጠቃላይ recall ተቀባይነት ያለው ይመስላል፤ ግን ጥሩ ሴት ተበዳሪዎች በጣም ያነሰ ይጸድቃሉ፡ የመክፈል አቅማቸው በከፊል ሞዴሉ ፈጽሞ ከማያየው የንግድ ገቢ ይመጣል፤ ያነሰ መሬትም ይይዛሉ። ማስተካከያዎች፡ የጎደለውን variable ሰብስብ፣ እንደ የጾታ ተኪ የሚሠሩ featuresን ገምግም፣ thresholdsን በቡድን ፈትሽ፣ የሚነኩ ሰዎችንም አሳትፍ።"
    }
   }
  },
  {
   "t": {
    "en": "Neural network basics",
    "am": "የneural network መሠረታዊ ነገሮች"
   },
   "d": {
    "en": "5 weeks · 6–8 h per week",
    "am": "5 ሳምንታት · በሳምንት 6–8 ሰዓት"
   },
   "o": {
    "en": [
     "Build and train a 2-layer network in NumPy",
     "Explain forward pass, loss and backpropagation"
    ],
    "am": [
     "ባለ 2-ንብርብር networkን በNumPy መገንባትና ማሰልጠን",
     "forward passን፣ lossን እና backpropagationን ማብራራት"
    ]
   },
   "l": {
    "en": [
     "Neurons, weights and activations",
     "Forward pass and loss",
     "Backpropagation: the chain rule",
     "Training curves and the decision boundary"
    ],
    "am": [
     "Neurons፣ weights እና activations",
     "Forward pass እና loss",
     "Backpropagation፡ የchain ሕግ",
     "የሥልጠና curves እና decision boundary"
    ]
   },
   "a": {
    "en": "Train a 2-layer network to separate two interleaved classes (a problem no straight line can solve) and compare it with logistic regression.",
    "am": "ሁለት የተጠላለፉ ክፍሎችን (ቀጥ ያለ መስመር ሊፈታው የማይችል ችግር) ለመለየት ባለ 2-ንብርብር networkን አሰልጥንና ከlogistic regression ጋር አወዳድር።"
   },
   "m": {
    "en": "Python with NumPy and scikit-learn",
    "am": "Python ከNumPy እና scikit-learn ጋር"
   },
   "q": {
    "en": [
     "Why does a network need a non-linear activation?",
     "What does backpropagation compute?"
    ],
    "am": [
     "network ለምን non-linear activation ያስፈልገዋል?",
     "backpropagation ምን ያሰላል?"
    ]
   },
   "qa": {
    "en": [
     "Without it, stacked layers collapse into one linear function and cannot bend the decision boundary.",
     "The gradient of the loss with respect to every weight, using the chain rule from the output back to the input."
    ],
    "am": [
     "ያለ እሱ የተደራረቡ ንብርብሮች ወደ አንድ linear function ይወድቃሉ፤ decision boundaryውንም ማጣመም አይችሉም።",
     "ከውጤቱ ወደ ግብዓቱ የchain ሕግን በመጠቀም የlossን gradient ከእያንዳንዱ weight አንፃር።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "One training step",
      "am": "አንድ የሥልጠና እርምጃ"
     },
     "nodes": [
      {
       "t": {
        "en": "Forward: X → hidden (tanh) → output (sigmoid)",
        "am": "Forward፡ X → hidden (tanh) → ውጤት (sigmoid)"
       }
      },
      {
       "t": {
        "en": "Loss: cross-entropy",
        "am": "Loss፡ cross-entropy"
       }
      },
      {
       "t": {
        "en": "Backward: gradients by the chain rule",
        "am": "Backward፡ gradients በchain ሕግ"
       }
      },
      {
       "t": {
        "en": "Update: W ← W − η·∇W",
        "am": "አዘምን፡ W ← W − η·∇W"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nfrom sklearn.datasets import make_moons\nfrom sklearn.linear_model import LogisticRegression\nX, y = make_moons(400, noise=0.15, random_state=0); y = y.reshape(-1, 1)\nrng = np.random.default_rng(0)\nW1, b1 = rng.normal(0, 1, (2, 16)), np.zeros(16)\nW2, b2 = rng.normal(0, 1, (16, 1)), np.zeros(1)\nsig = lambda z: 1 / (1 + np.exp(-z))\nfor epoch in range(3001):\n    H = np.tanh(X @ W1 + b1); P = sig(H @ W2 + b2)                       # forward\n    loss = -np.mean(y * np.log(P + 1e-9) + (1 - y) * np.log(1 - P + 1e-9))\n    dZ2 = (P - y) / len(X); dW2 = H.T @ dZ2; db2 = dZ2.sum(0)           # backward\n    dZ1 = dZ2 @ W2.T * (1 - H ** 2); dW1 = X.T @ dZ1; db1 = dZ1.sum(0)\n    for p, g in ((W1, dW1), (b1, db1), (W2, dW2), (b2, db2)): p -= 1.0 * g\n    if epoch % 1000 == 0: print(f\"epoch {epoch:4d}: loss {loss:.3f}\")\nprint(f\"2-layer network accuracy: {np.mean((P > 0.5) == y):.2f}\")\nprint(f\"logistic regression accuracy: {LogisticRegression().fit(X, y.ravel()).score(X, y.ravel()):.2f} (a straight line)\")",
    "out": "epoch    0: loss 0.884\nepoch 1000: loss 0.036\nepoch 2000: loss 0.033\nepoch 3000: loss 0.032\n2-layer network accuracy: 0.98\nlogistic regression accuracy: 0.88 (a straight line)",
    "title": {
     "en": "A 2-layer network learns a curved boundary",
     "am": "ባለ 2-ንብርብር network የተጣመመ ወሰንን ይማራል"
    },
    "note": {
     "en": "Accuracies here are on the training data, to show capacity; in a real project report them on held-out data.",
     "am": "እዚህ ያሉት accuracies አቅምን ለማሳየት በሥልጠና ዳታ ላይ ናቸው፤ በእውነተኛ ፕሮጀክት በተለየ ዳታ ላይ ዘግባቸው።"
    }
   }
  }
 ]
];
