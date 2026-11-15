/* Practical labs, track c, level 0. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[0] = [
 {
  "title": {
   "en": "Robot teacher: exact sequences",
   "am": "ሮቦት አስተማሪ፡ ትክክለኛ ቅደም ተከተሎች"
  },
  "goal": {
   "en": "Children give and follow 5-step instructions on a chalk grid and learn that order changes the result.",
   "am": "ልጆች በጠመኔ ፍርግርግ ላይ ባለ 5 እርምጃ መመሪያዎችን ይሰጣሉ፣ ይከተላሉም፤ ቅደም ተከተል ውጤቱን እንደሚቀይር ይማራሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Chalk and a 4×4 grid on the ground",
    "why": {
     "en": "the robot’s world",
     "am": "የሮቦቱ ዓለም"
    },
    "get": "school yard"
   },
   {
    "name": "Arrow cards (cut from a box)",
    "why": {
     "en": "the program",
     "am": "ፕሮግራሙ"
    },
    "get": "old cardboard, marker"
   },
   {
    "name": "Paper, pencil, squared paper",
    "why": {
     "en": "record data and draw charts by hand",
     "am": "ዳታ መመዝገብና ቻርቶችን በእጅ መሣል"
    },
    "get": "school supplies"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Chalk a 4×4 grid; put a \"house\" stone in one corner.",
    "Make 12 arrow cards: ↑ forward, ↻ turn right, ↺ turn left.",
    "Teams of 3: a programmer lays the cards, a robot walks, a checker watches.",
    "Each team gets 3 tries to reach the house; record on paper: number of cards and whether the robot arrived.",
    "Swap two cards on purpose and walk again: what changed?",
    "Count successes per team and draw a picture chart on the board."
   ],
   "am": [
    "4×4 ፍርግርግ በጠመኔ ሣሉ፤ በአንድ ጥግ «ቤት» ድንጋይ አስቀምጡ።",
    "12 የቀስት ካርዶች ሥሩ፡ ↑ ወደ ፊት፣ ↻ ወደ ቀኝ ዙር፣ ↺ ወደ ግራ ዙር።",
    "የ3 ቡድኖች፡ ፕሮግራመሩ ካርዶቹን ያስቀምጣል፣ ሮቦቱ ይራመዳል፣ ፈታሹ ይመለከታል።",
    "እያንዳንዱ ቡድን ቤቱን ለመድረስ 3 ሙከራዎች ያገኛል፤ በወረቀት መዝግቡ፡ የካርዶች ብዛትና ሮቦቱ እንደደረሰ።",
    "ሆን ብላችሁ ሁለት ካርዶችን አቀያይሩና እንደገና ተራመዱ፡ ምን ተለወጠ?",
    "በቡድን ስኬቶችን ቁጠሩና በሰሌዳው ላይ የሥዕል ቻርት ሣሉ።"
   ]
  },
  "code": "teams = {\"Lions\": [0, 1, 1], \"Eagles\": [1, 1, 1], \"Zebras\": [0, 0, 1], \"Gazelles\": [0, 1, 1], \"Cranes\": [1, 0, 1]}   # 1 = robot reached the house\nfor team, tries in teams.items():\n    print(f\"{team:9s} {'★' * sum(tries):3s} {sum(tries)} of 3 | first success on try {tries.index(1) + 1}\")\nfirst_try = sum(t[0] for t in teams.values())\nprint(f\"teams right on the first try: {first_try} of {len(teams)}; by the third try: {sum(t[2] for t in teams.values())} of {len(teams)}\")",
  "out": "Lions     ★★  2 of 3 | first success on try 2\nEagles    ★★★ 3 of 3 | first success on try 1\nZebras    ★   1 of 3 | first success on try 3\nGazelles  ★★  2 of 3 | first success on try 2\nCranes    ★★  2 of 3 | first success on try 1\nteams right on the first try: 2 of 5; by the third try: 5 of 5",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Teams that reached the house, try by try",
     "am": "ቤቱን የደረሱ ቡድኖች፣ በእያንዳንዱ ሙከራ"
    },
    "x": {
     "label": {
      "en": "Try",
      "am": "ሙከራ"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Teams successful (of 5)",
      "am": "የተሳካላቸው ቡድኖች (ከ5)"
     },
     "min": 0,
     "max": 5
    },
    "series": [
     {
      "name": {
       "en": "Teams",
       "am": "ቡድኖች"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0
      ],
      "y": [
       2.0,
       3.0,
       5.0
      ],
      "tip": [
       "2|Teams · 1",
       "3|Teams · 2",
       "5|Teams · 3"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Try",
       "am": "ሙከራ"
      },
      {
       "en": "Teams",
       "am": "ቡድኖች"
      }
     ],
     "rows": [
      [
       1.0,
       2.0
      ],
      [
       2.0,
       3.0
      ],
      [
       3.0,
       5.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Only 2 of 5 teams were right first time; by the third try all 5 were.",
    "Most first-try bugs were a missing ↑ card or a turn in the wrong place: the order of cards matters.",
    "Swapping two cards sent the robot somewhere else, which shows that a sequence is more than a set of steps."
   ],
   "am": [
    "ከ5 ቡድኖች 2 ብቻ በመጀመሪያው ሙከራ ትክክል ነበሩ፤ በሦስተኛው ሙከራ ሁሉም 5።",
    "አብዛኞቹ የመጀመሪያ-ሙከራ ስህተቶች የጎደለ ↑ ካርድ ወይም በተሳሳተ ቦታ ያለ መዞሪያ ነበሩ፡ የካርዶች ቅደም ተከተል አስፈላጊ ነው።",
    "ሁለት ካርዶችን ማቀያየር ሮቦቱን ወደ ሌላ ቦታ ላከው፤ ይህም ቅደም ተከተል ከእርምጃዎች ስብስብ በላይ መሆኑን ያሳያል።"
   ]
  },
  "decision": {
   "en": "Start next session with \"check before you walk\": the checker reads every card aloud before the robot moves. Keep the 4×4 grid until most teams succeed on the first try, then move to 5×5 with an obstacle.",
   "am": "የሚቀጥለውን ክፍለ ጊዜ በ«ከመራመድህ በፊት ፈትሽ» ጀምሩ፡ ሮቦቱ ከመንቀሳቀሱ በፊት ፈታሹ እያንዳንዱን ካርድ ጮክ ብሎ ያነባል። አብዛኞቹ ቡድኖች በመጀመሪያው ሙከራ እስኪሳካላቸው 4×4 ፍርግርጉን አቆዩ፣ ከዚያ ከእንቅፋት ጋር ወደ 5×5 ተሸጋገሩ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Pattern detectives",
   "am": "የንድፍ መርማሪዎች"
  },
  "goal": {
   "en": "Children build, continue and check repeating patterns with seeds and sounds, and say the rule.",
   "am": "ልጆች በዘሮችና በድምፆች የሚደጋገሙ ንድፎችን ይገነባሉ፣ ይቀጥላሉ፣ ይፈትሻሉ፣ ሕጉንም ይናገራሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Two kinds of seeds or bottle tops",
    "why": {
     "en": "pattern pieces",
     "am": "የንድፍ ቁርጥራጮች"
    },
    "get": "home or market"
   },
   {
    "name": "String",
    "why": {
     "en": "to make necklaces",
     "am": "ሐብል ለመሥራት"
    },
    "get": "market"
   },
   {
    "name": "Paper, pencil, squared paper",
    "why": {
     "en": "record data and draw charts by hand",
     "am": "ዳታ መመዝገብና ቻርቶችን በእጅ መሣል"
    },
    "get": "school supplies"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Clap–stomp patterns: the class continues the teacher’s pattern.",
    "Each child makes a 12-piece necklace following a rule (for example 2 red, 1 white).",
    "Swap necklaces: a friend says the rule.",
    "Hide one mistake; the friend finds it. Record: rule found (yes/no), mistake found (yes/no).",
    "Count results for the class."
   ],
   "am": [
    "የማጨብጨብ–የመርገጥ ንድፎች፡ ክፍሉ የመምህሩን ንድፍ ይቀጥላል።",
    "እያንዳንዱ ልጅ ሕግን ተከትሎ ባለ 12 ቁርጥራጭ ሐብል ይሠራል (ለምሳሌ 2 ቀይ፣ 1 ነጭ)።",
    "ሐብሎችን ተቀያየሩ፡ ጓደኛ ሕጉን ይናገራል።",
    "አንድ ስህተት ደብቁ፤ ጓደኛው ያገኘዋል። መዝግቡ፡ ሕጉ ተገኘ (አዎ/አይደለም)፣ ስህተቱ ተገኘ (አዎ/አይደለም)።",
    "ለክፍሉ ውጤቶቹን ቁጠሩ።"
   ]
  },
  "code": "results = {\"AB (red, white)\": (10, 10, 9), \"AAB (2 red, 1 white)\": (10, 8, 6), \"ABC (3 colours)\": (8, 5, 4)}   # (children, rule found, mistake found)\nfor rule, (n, found, fixed) in results.items():\n    print(f\"{rule:22s} rule found {found}/{n} ({found / n:.0%}), mistake found {fixed}/{n} ({fixed / n:.0%})\")\nhardest = min(results, key=lambda k: results[k][1] / results[k][0])\nprint(\"hardest pattern:\", hardest)",
  "out": "AB (red, white)        rule found 10/10 (100%), mistake found 9/10 (90%)\nAAB (2 red, 1 white)   rule found 8/10 (80%), mistake found 6/10 (60%)\nABC (3 colours)        rule found 5/8 (62%), mistake found 4/8 (50%)\nhardest pattern: ABC (3 colours)",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Share of children who found the rule and the mistake",
     "am": "ሕጉንና ስህተቱን ያገኙ ልጆች ድርሻ"
    },
    "x": {
     "label": {
      "en": "Percent of children",
      "am": "የልጆች መቶኛ"
     }
    },
    "fmt": 0,
    "cats": [
     "AB (red, white)",
     "AAB (2 red, 1 white)",
     "ABC (3 colours)"
    ],
    "series": [
     {
      "name": {
       "en": "Rule found %",
       "am": "ሕጉ ተገኘ %"
      },
      "slot": 1,
      "v": [
       100.0,
       80.0,
       62.0
      ]
     },
     {
      "name": {
       "en": "Mistake found %",
       "am": "ስህተቱ ተገኘ %"
      },
      "slot": 2,
      "v": [
       90.0,
       60.0,
       50.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Rule found %",
       "am": "ሕጉ ተገኘ %"
      },
      {
       "en": "Mistake found %",
       "am": "ስህተቱ ተገኘ %"
      }
     ],
     "rows": [
      [
       "AB (red, white)",
       100.0,
       90.0
      ],
      [
       "AAB (2 red, 1 white)",
       80.0,
       60.0
      ],
      [
       "ABC (3 colours)",
       62.0,
       50.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "AB patterns are almost always solved; difficulty rises with the length of the repeating unit.",
    "The hardest was ABC (3 colours): fewer children found the rule, and even fewer spotted the hidden mistake.",
    "Finding a mistake is harder than continuing a pattern: you must hold the whole rule in mind."
   ],
   "am": [
    "የAB ንድፎች ከሞላ ጎደል ሁልጊዜ ይፈታሉ፤ ችግሩ ከሚደጋገመው ክፍል ርዝመት ጋር ይጨምራል።",
    "በጣም ከባዱ ABC (3 colours) ነበር፡ ጥቂት ልጆች ሕጉን አገኙ፣ የተደበቀውን ስህተትም ያስተዋሉት ከዚያም ያነሱ ናቸው።",
    "ስህተትን ማግኘት ንድፍን ከመቀጠል ይከብዳል፡ ሙሉውን ሕግ በአእምሮ መያዝ አለብህ።"
   ]
  },
  "decision": {
   "en": "Spend one more session on 3-piece units (AAB, ABC) with sounds first, then seeds; move on to loops only when most children can find a hidden mistake in AAB.",
   "am": "በ3-ቁርጥራጭ ክፍሎች (AAB፣ ABC) ላይ መጀመሪያ በድምፆች፣ ከዚያ በዘሮች አንድ ተጨማሪ ክፍለ ጊዜ አሳልፉ፤ ወደ loops የምትሸጋገሩት አብዛኞቹ ልጆች በAAB ውስጥ የተደበቀ ስህተት ማግኘት ሲችሉ ብቻ ነው።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Treasure maps on a grid",
   "am": "በፍርግርግ ላይ የሀብት ካርታዎች"
  },
  "goal": {
   "en": "Teams write arrow maps to a hidden treasure and compare how many steps their paths take.",
   "am": "ቡድኖች ወደ ተደበቀ ሀብት የቀስት ካርታዎችን ይጽፋሉ፣ መንገዶቻቸው ስንት እርምጃዎች እንደሚወስዱም ያወዳድራሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Chalk grid 5×5, a painted stone",
    "why": {
     "en": "the map and the treasure",
     "am": "ካርታውና ሀብቱ"
    },
    "get": "school yard"
   },
   {
    "name": "Paper, pencil, squared paper",
    "why": {
     "en": "record data and draw charts by hand",
     "am": "ዳታ መመዝገብና ቻርቶችን በእጅ መሣል"
    },
    "get": "school supplies"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Hide the gold stone on a square of a 5×5 grid.",
    "Each team draws an arrow map from START to the treasure on paper.",
    "Another team walks the map exactly.",
    "Record: arrived (yes/no) and number of arrows used.",
    "Compare with the shortest possible path (count the squares)."
   ],
   "am": [
    "የወርቅ ድንጋዩን በ5×5 ፍርግርግ ካሬ ላይ ደብቁ።",
    "እያንዳንዱ ቡድን ከመነሻ ወደ ሀብቱ የቀስት ካርታ በወረቀት ይሥላል።",
    "ሌላ ቡድን ካርታውን በትክክል ይራመዳል።",
    "መዝግቡ፡ ደረሰ (አዎ/አይደለም) እና የተጠቀሙበት የቀስቶች ብዛት።",
    "ከሚቻለው አጭር መንገድ ጋር አወዳድሩ (ካሬዎቹን ቁጠሩ)።"
   ]
  },
  "code": "shortest = 7                              # 4 across + 3 up, plus 1 turn card counted separately\nmaps = {\"Team A\": (True, 8), \"Team B\": (True, 11), \"Team C\": (False, 9), \"Team D\": (True, 8), \"Team E\": (True, 14)}\nfor team, (arrived, arrows) in maps.items():\n    extra = arrows - (shortest + 1)\n    print(f\"{team}: {'arrived' if arrived else 'did not arrive'}, {arrows} arrows ({extra:+d} vs the shortest)\")\nok = [a for arr, a in maps.values() if arr]\nprint(f\"{len(ok)} of {len(maps)} maps worked; average arrows for working maps {sum(ok) / len(ok):.1f}\")",
  "out": "Team A: arrived, 8 arrows (+0 vs the shortest)\nTeam B: arrived, 11 arrows (+3 vs the shortest)\nTeam C: did not arrive, 9 arrows (+1 vs the shortest)\nTeam D: arrived, 8 arrows (+0 vs the shortest)\nTeam E: arrived, 14 arrows (+6 vs the shortest)\n4 of 5 maps worked; average arrows for working maps 10.2",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Arrows used by each team (shortest = 8)",
     "am": "በእያንዳንዱ ቡድን የተጠቀሙ ቀስቶች (አጭሩ = 8)"
    },
    "x": {
     "label": {
      "en": "Number of arrow cards",
      "am": "የቀስት ካርዶች ብዛት"
     }
    },
    "fmt": 0,
    "cats": [
     "Team A",
     "Team B",
     "Team C",
     "Team D",
     "Team E"
    ],
    "series": [
     {
      "name": {
       "en": "Arrows",
       "am": "ቀስቶች"
      },
      "slot": 1,
      "v": [
       8.0,
       11.0,
       9.0,
       8.0,
       14.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Arrows",
       "am": "ቀስቶች"
      }
     ],
     "rows": [
      [
       "Team A",
       8.0
      ],
      [
       "Team B",
       11.0
      ],
      [
       "Team C",
       9.0
      ],
      [
       "Team D",
       8.0
      ],
      [
       "Team E",
       14.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "4 of 5 maps reached the treasure; one map had a turn in the wrong direction.",
    "Working maps used between 8 and 14 arrows: some teams went around the long way.",
    "Teams that counted squares before drawing used the fewest arrows."
   ],
   "am": [
    "ከ5 ካርታዎች 4 ሀብቱን ደረሱ፤ አንድ ካርታ በተሳሳተ አቅጣጫ መዞሪያ ነበረው።",
    "የሠሩ ካርታዎች ከ8 እስከ 14 ቀስቶችን ተጠቅመዋል፡ አንዳንድ ቡድኖች ረጅሙን መንገድ ዞረዋል።",
    "ከመሣላቸው በፊት ካሬዎችን የቆጠሩ ቡድኖች ጥቂቶቹን ቀስቶች ተጠቅመዋል።"
   ]
  },
  "decision": {
   "en": "Teach \"count first, then draw\" as the class rule; next session add one obstacle so the shortest path needs two turns.",
   "am": "«መጀመሪያ ቁጠር፣ ከዚያ ሣል»ን እንደ የክፍሉ ሕግ አስተምሩ፤ በሚቀጥለው ክፍለ ጊዜ አጭሩ መንገድ ሁለት መዞሪያዎች እንዲፈልግ አንድ እንቅፋት ጨምሩ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Loop race: fewer cards, same path",
   "am": "የloop ውድድር፡ ያነሱ ካርዶች፣ ያው መንገድ"
  },
  "goal": {
   "en": "Teams rewrite long arrow paths with repeat cards and measure how many cards they save.",
   "am": "ቡድኖች ረጅም የቀስት መንገዶችን በድገም ካርዶች እንደገና ይጽፋሉ፣ ስንት ካርዶች እንደሚያድኑም ይለካሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Arrow cards and \"repeat ×\" cards",
    "why": {
     "en": "program with and without loops",
     "am": "ከloop ጋርና ያለ loop ፕሮግራም"
    },
    "get": "cardboard, marker"
   },
   {
    "name": "Chalk grid",
    "why": {
     "en": "test both versions",
     "am": "ሁለቱንም ስሪቶች ፈትሽ"
    },
    "get": "school yard"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Give each team a long path written with single arrows (for example a 3×3 square walk).",
    "Teams rewrite it using \"repeat ×\" cards.",
    "Walk both versions on the grid: do they end in the same place?",
    "Record cards before and after.",
    "Discuss: when is a loop not useful?"
   ],
   "am": [
    "ለእያንዳንዱ ቡድን በነጠላ ቀስቶች የተጻፈ ረጅም መንገድ ስጡ (ለምሳሌ የ3×3 ካሬ መራመድ)።",
    "ቡድኖች «× ድገም» ካርዶችን በመጠቀም እንደገና ይጽፉታል።",
    "ሁለቱንም ስሪቶች በፍርግርጉ ላይ ተራመዱ፡ በአንድ ቦታ ያልቃሉ?",
    "ከዚያ በፊትና በኋላ ያሉትን ካርዶች መዝግቡ።",
    "ተወያዩ፡ loop መቼ ጠቃሚ አይደለም?"
   ]
  },
  "code": "paths = {   # each card is one item; \"repeat N\" is one card that holds the cards inside it\n    \"line of 6\":  ([\"F\"] * 6,                 [\"repeat 6\", \"F\"]),\n    \"square 3x3\": ([\"F\", \"F\", \"F\", \"R\"] * 4,  [\"repeat 4\", \"F\", \"F\", \"F\", \"R\"]),\n    \"zig-zag\":    ([\"F\", \"R\", \"F\", \"L\"] * 2,  [\"repeat 2\", \"F\", \"R\", \"F\", \"L\"]),\n    \"L-shape\":    ([\"F\", \"F\", \"F\", \"R\", \"F\", \"F\"], [\"F\", \"F\", \"F\", \"R\", \"F\", \"F\"])}\nsaved = {}\nfor name, (long, short) in paths.items():\n    saved[name] = len(long) - len(short)\n    print(f\"{name:11s} {len(long):2d} cards -> {len(short):2d} cards (saved {saved[name]})\")",
  "out": "line of 6    6 cards ->  2 cards (saved 4)\nsquare 3x3  16 cards ->  5 cards (saved 11)\nzig-zag      8 cards ->  5 cards (saved 3)\nL-shape      6 cards ->  6 cards (saved 0)",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Cards needed with and without a loop",
     "am": "ከloop ጋርና ያለ loop የሚያስፈልጉ ካርዶች"
    },
    "x": {
     "label": {
      "en": "Number of cards",
      "am": "የካርዶች ብዛት"
     }
    },
    "fmt": 0,
    "cats": [
     "line of 6",
     "square 3x3",
     "zig-zag",
     "L-shape"
    ],
    "series": [
     {
      "name": {
       "en": "Without loop",
       "am": "ያለ loop"
      },
      "slot": 2,
      "v": [
       6.0,
       16.0,
       8.0,
       6.0
      ]
     },
     {
      "name": {
       "en": "With loop",
       "am": "ከloop ጋር"
      },
      "slot": 1,
      "v": [
       2.0,
       5.0,
       5.0,
       6.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Without loop",
       "am": "ያለ loop"
      },
      {
       "en": "With loop",
       "am": "ከloop ጋር"
      }
     ],
     "rows": [
      [
       "line of 6",
       6.0,
       2.0
      ],
      [
       "square 3x3",
       16.0,
       5.0
      ],
      [
       "zig-zag",
       8.0,
       5.0
      ],
      [
       "L-shape",
       6.0,
       6.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The square walk shrank from 16 cards to 5: loops pay off most when a group of steps repeats many times.",
    "The L-shape saved nothing: there is no repeated group, so a loop does not help.",
    "Both versions ended on the same square every time: a loop changes how we write, not what the robot does."
   ],
   "am": [
    "የካሬ መራመዱ ከ16 ካርዶች ወደ 5 አነሰ፡ loops በጣም የሚያዋጡት የእርምጃዎች ቡድን ብዙ ጊዜ ሲደጋገም ነው።",
    "የL-ቅርጽ ምንም አላዳነም፡ የሚደጋገም ቡድን የለም፤ ስለዚህ loop አይረዳም።",
    "ሁለቱም ስሪቶች ሁልጊዜ በተመሳሳይ ካሬ ላይ አበቁ፡ loop የምንጽፍበትን መንገድ ይቀይራል እንጂ ሮቦቱ የሚያደርገውን አይደለም።"
   ]
  },
  "decision": {
   "en": "Look for the repeating group first, then use a repeat card; use single cards when nothing repeats. Next: loops inside stories and songs.",
   "am": "መጀመሪያ የሚደጋገመውን ቡድን ፈልጉ፣ ከዚያ የድገም ካርድ ተጠቀሙ፤ ምንም ነገር ካልተደጋገመ ነጠላ ካርዶችን ተጠቀሙ። ቀጣይ፡ በታሪኮችና በዘፈኖች ውስጥ loops።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Bug hunt",
   "am": "የስህተት አደን"
  },
  "goal": {
   "en": "Teams hide one bug in a path, swap, and measure how quickly others find and fix it.",
   "am": "ቡድኖች በመንገድ ውስጥ አንድ ስህተት ይደብቃሉ፣ ይቀያየራሉ፣ ሌሎች በምን ያህል ፍጥነት እንደሚያገኙትና እንደሚያስተካክሉት ይለካሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Arrow cards, chalk grid",
    "why": {
     "en": "paths with hidden bugs",
     "am": "የተደበቁ ስህተቶች ያሏቸው መንገዶች"
    },
    "get": "cardboard, school yard"
   },
   {
    "name": "A clock or phone timer",
    "why": {
     "en": "measure time to fix",
     "am": "ለማስተካከል የሚወስደውን ጊዜ ለካ"
    },
    "get": "any phone"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Each team builds a correct path, then changes one card secretly.",
    "Swap paths with another team.",
    "Use test–find–fix: walk it, stop at the first wrong step, change one card, walk again.",
    "Time how long it takes; record the kind of bug.",
    "Collect the class results."
   ],
   "am": [
    "እያንዳንዱ ቡድን ትክክለኛ መንገድ ይገነባል፣ ከዚያ በሚስጥር አንድ ካርድ ይቀይራል።",
    "ከሌላ ቡድን ጋር መንገዶችን ተቀያየሩ።",
    "ፈትሽ–ፈልግ–አስተካክልን ተጠቀሙ፡ ተራመዱበት፣ በመጀመሪያው የተሳሳተ እርምጃ ቁሙ፣ አንድ ካርድ ቀይሩ፣ እንደገና ተራመዱ።",
    "የሚወስደውን ጊዜ ለኩ፤ የስህተቱን ዓይነት መዝግቡ።",
    "የክፍሉን ውጤቶች ሰብስቡ።"
   ]
  },
  "code": "bugs = [(\"missing forward\", 45), (\"wrong turn\", 70), (\"extra forward\", 40), (\"wrong turn\", 95), (\"missing forward\", 50), (\"turn in wrong place\", 120), (\"wrong turn\", 80)]   # (kind, seconds to fix)\nfrom collections import defaultdict\nby_kind = defaultdict(list)\nfor kind, sec in bugs: by_kind[kind].append(sec)\nfor kind, secs in sorted(by_kind.items(), key=lambda kv: -sum(kv[1]) / len(kv[1])):\n    print(f\"{kind:20s} found {len(secs)} times, average {sum(secs) / len(secs):.0f} s to fix\")\nslowest = max(by_kind, key=lambda k: sum(by_kind[k]) / len(by_kind[k]))",
  "out": "turn in wrong place  found 1 times, average 120 s to fix\nwrong turn           found 3 times, average 82 s to fix\nmissing forward      found 2 times, average 48 s to fix\nextra forward        found 1 times, average 40 s to fix",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Average seconds to find and fix each kind of bug",
     "am": "እያንዳንዱን የስህተት ዓይነት ለማግኘትና ለማስተካከል አማካይ ሰከንዶች"
    },
    "x": {
     "label": {
      "en": "Seconds",
      "am": "ሰከንዶች"
     }
    },
    "fmt": 0,
    "cats": [
     "missing forward",
     "wrong turn",
     "extra forward",
     "turn in wrong place"
    ],
    "series": [
     {
      "name": {
       "en": "Seconds",
       "am": "ሰከንዶች"
      },
      "slot": 1,
      "v": [
       48.0,
       82.0,
       40.0,
       120.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Seconds",
       "am": "ሰከንዶች"
      }
     ],
     "rows": [
      [
       "missing forward",
       48.0
      ],
      [
       "wrong turn",
       82.0
      ],
      [
       "extra forward",
       40.0
      ],
      [
       "turn in wrong place",
       120.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The slowest bug to fix was \"turn in wrong place\".",
    "Missing or extra forward cards were found fastest: the robot clearly stops short or walks too far.",
    "Turn bugs take longer because the robot looks fine until the corner."
   ],
   "am": [
    "ለማስተካከል በጣም የዘገየው ስህተት «turn in wrong place» ነበር።",
    "የጎደሉ ወይም ተጨማሪ ወደ ፊት ካርዶች በፍጥነት ተገኝተዋል፡ ሮቦቱ በግልጽ ቀድሞ ይቆማል ወይም በጣም ርቆ ይሄዳል።",
    "የመዞሪያ ስህተቶች ረዘም ይወስዳሉ፤ ሮቦቱ እስከ ጥጉ ድረስ ደህና ስለሚመስል።"
   ]
  },
  "decision": {
   "en": "Teach \"stop at the first wrong step\" with turn bugs specifically; add a turn check at every corner before walking on.",
   "am": "«በመጀመሪያው የተሳሳተ እርምጃ ቁም»ን በተለይ በመዞሪያ ስህተቶች አስተምሩ፤ ከመቀጠል በፊት በእያንዳንዱ ጥግ የመዞሪያ ፍተሻ ጨምሩ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "First screen coding with ScratchJr",
   "am": "በScratchJr የመጀመሪያ የስክሪን ኮዲንግ"
  },
  "goal": {
   "en": "Groups build a 4-block ScratchJr program together and track which blocks they could use alone.",
   "am": "ቡድኖች ባለ 4 ብሎክ የScratchJr ፕሮግራም አብረው ይገነባሉ፣ በራሳቸው ሊጠቀሙባቸው የቻሏቸውን ብሎኮች ይከታተላሉ።"
  },
  "time": {
   "en": "2 sessions of 15 min on screen",
   "am": "2 ክፍለ ጊዜዎች፣ በስክሪን 15 ደቂቃ"
  },
  "tools": [
   {
    "name": "ScratchJr",
    "why": {
     "en": "block programming for ages 5–7",
     "am": "ከ5–7 ዓመት ለሆኑ የብሎክ ፕሮግራሚንግ"
    },
    "get": "free app for Android tablets and phones"
   },
   {
    "name": "One tablet or phone per 3 children",
    "why": {
     "en": "shared screen time",
     "am": "የጋራ የስክሪን ጊዜ"
    },
    "get": "school or teacher device"
   },
   {
    "name": "Paper, pencil, squared paper",
    "why": {
     "en": "record data and draw charts by hand",
     "am": "ዳታ መመዝገብና ቻርቶችን በእጅ መሣል"
    },
    "get": "school supplies"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Show the green-flag block, a move block and a say block.",
    "Each child in the group adds one block in turn.",
    "Tap the flag; did the character do what you planned?",
    "Teacher ticks a checklist: which blocks each child used without help.",
    "End after 15 minutes; talk about what you made."
   ],
   "am": [
    "የአረንጓዴ ባንዲራ ብሎክን፣ የመንቀሳቀሻ ብሎክንና የመናገሪያ ብሎክን አሳዩ።",
    "በቡድኑ ያለ እያንዳንዱ ልጅ በተራ አንድ ብሎክ ይጨምራል።",
    "ባንዲራውን ንኩ፤ ገጸ ባሕሪው ያቀዳችሁትን አደረገ?",
    "መምህሩ ማረጋገጫ ዝርዝር ላይ ምልክት ያደርጋል፡ እያንዳንዱ ልጅ ያለ እርዳታ የተጠቀመባቸው ብሎኮች።",
    "ከ15 ደቂቃ በኋላ ጨርሱ፤ ስለሠራችሁት ተነጋገሩ።"
   ]
  },
  "code": "children = 24\nused_alone = {\"green flag\": 22, \"move right\": 20, \"say\": 15, \"jump\": 18, \"repeat\": 6}\nfor block, n in used_alone.items():\n    print(f\"{block:11s} {n:2d}/{children} ({n / children:.0%}) {'#' * n}\")\nweakest = min(used_alone, key=used_alone.get)",
  "out": "green flag  22/24 (92%) ######################\nmove right  20/24 (83%) ####################\nsay         15/24 (62%) ###############\njump        18/24 (75%) ##################\nrepeat       6/24 (25%) ######",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Children who used each block without help (of 24)",
     "am": "እያንዳንዱን ብሎክ ያለ እርዳታ የተጠቀሙ ልጆች (ከ24)"
    },
    "x": {
     "label": {
      "en": "Children",
      "am": "ልጆች"
     }
    },
    "fmt": 0,
    "cats": [
     "green flag",
     "move right",
     "say",
     "jump",
     "repeat"
    ],
    "series": [
     {
      "name": {
       "en": "Children",
       "am": "ልጆች"
      },
      "slot": 1,
      "v": [
       22.0,
       20.0,
       15.0,
       18.0,
       6.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Children",
       "am": "ልጆች"
      }
     ],
     "rows": [
      [
       "green flag",
       22.0
      ],
      [
       "move right",
       20.0
      ],
      [
       "say",
       15.0
      ],
      [
       "jump",
       18.0
      ],
      [
       "repeat",
       6.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Almost every child can start a program and move a character alone.",
    "The say block is harder: it needs typing or recording.",
    "Only 6 children used repeat alone: it is the newest idea on screen."
   ],
   "am": [
    "ከሞላ ጎደል እያንዳንዱ ልጅ ፕሮግራም መጀመርና ገጸ ባሕሪን በራሱ ማንቀሳቀስ ይችላል።",
    "የመናገሪያ ብሎኩ ይከብዳል፡ መጻፍ ወይም መቅዳት ይፈልጋል።",
    "repeatን በራሳቸው የተጠቀሙት 6 ልጆች ብቻ ናቸው፡ በስክሪን ላይ አዲሱ ሐሳብ ነው።"
   ]
  },
  "decision": {
   "en": "Link the repeat block to the floor \"repeat card\" next session (same idea, same name), and let children record their say-messages instead of typing.",
   "am": "በሚቀጥለው ክፍለ ጊዜ የrepeat ብሎኩን ከወለሉ «የድገም ካርድ» ጋር አገናኙ (ያው ሐሳብ፣ ያው ስም)፣ ልጆችም የመናገሪያ መልእክቶቻቸውን ከመጻፍ ይልቅ እንዲቀዱ አድርጉ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Floor robot with an obstacle",
   "am": "ከእንቅፋት ጋር የወለል ሮቦት"
  },
  "goal": {
   "en": "Teams plan paths around a stone on paper first, then compare planned and actual moves.",
   "am": "ቡድኖች በድንጋይ ዙሪያ ያሉ መንገዶችን መጀመሪያ በወረቀት ያቅዳሉ፣ ከዚያ የታቀዱትንና ትክክለኛዎቹን እንቅስቃሴዎች ያወዳድራሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Cardboard robot with a direction arrow",
    "why": {
     "en": "the robot",
     "am": "ሮቦቱ"
    },
    "get": "old box"
   },
   {
    "name": "Stone or cup",
    "why": {
     "en": "the obstacle",
     "am": "እንቅፋቱ"
    },
    "get": "school yard"
   },
   {
    "name": "Bee-Bot (optional)",
    "why": {
     "en": "programmable floor robot",
     "am": "ፕሮግራም የሚደረግ የወለል ሮቦት"
    },
    "get": "school kit, if available"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Place a stone on the grid between START and HOME.",
    "Teams draw the plan on paper as arrows.",
    "One child reads the arrows, another moves the robot.",
    "If the robot bumps the stone, mark where; fix and try again.",
    "Record planned arrows vs arrows actually used."
   ],
   "am": [
    "በፍርግርጉ ላይ በመነሻና በቤት መካከል ድንጋይ አስቀምጡ።",
    "ቡድኖች ዕቅዱን በወረቀት ላይ እንደ ቀስቶች ይሥላሉ።",
    "አንድ ልጅ ቀስቶቹን ያነባል፣ ሌላው ሮቦቱን ያንቀሳቅሳል።",
    "ሮቦቱ ድንጋዩን ከመታ የት እንደሆነ ምልክት አድርጉ፤ አስተካክሉና እንደገና ሞክሩ።",
    "የታቀዱትን ቀስቶች ከትክክል ጥቅም ላይ ከዋሉት ቀስቶች ጋር መዝግቡ።"
   ]
  },
  "code": "teams = {\"A\": (8, 8, 0), \"B\": (7, 9, 1), \"C\": (8, 8, 0), \"D\": (6, 9, 2), \"E\": (9, 10, 1)}    # (planned, used, bumps)\nfor t, (p, u, b) in teams.items():\n    print(f\"team {t}: planned {p}, used {u}, bumps {b}, {'plan worked first time' if p == u and b == 0 else 'plan changed'}\")\nfirst = sum(1 for p, u, b in teams.values() if p == u and b == 0)",
  "out": "team A: planned 8, used 8, bumps 0, plan worked first time\nteam B: planned 7, used 9, bumps 1, plan changed\nteam C: planned 8, used 8, bumps 0, plan worked first time\nteam D: planned 6, used 9, bumps 2, plan changed\nteam E: planned 9, used 10, bumps 1, plan changed",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Planned vs actual arrows",
     "am": "የታቀዱ vs ትክክለኛ ቀስቶች"
    },
    "x": {
     "label": {
      "en": "Arrow cards",
      "am": "የቀስት ካርዶች"
     }
    },
    "fmt": 0,
    "cats": [
     "Team A",
     "Team B",
     "Team C",
     "Team D",
     "Team E"
    ],
    "series": [
     {
      "name": {
       "en": "Planned",
       "am": "የታቀደ"
      },
      "slot": 1,
      "v": [
       8.0,
       7.0,
       8.0,
       6.0,
       9.0
      ]
     },
     {
      "name": {
       "en": "Actually used",
       "am": "በእርግጥ የተጠቀሙት"
      },
      "slot": 2,
      "v": [
       8.0,
       9.0,
       8.0,
       9.0,
       10.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Planned",
       "am": "የታቀደ"
      },
      {
       "en": "Actually used",
       "am": "በእርግጥ የተጠቀሙት"
      }
     ],
     "rows": [
      [
       "Team A",
       8.0,
       8.0
      ],
      [
       "Team B",
       7.0,
       9.0
      ],
      [
       "Team C",
       8.0,
       8.0
      ],
      [
       "Team D",
       6.0,
       9.0
      ],
      [
       "Team E",
       9.0,
       10.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "2 of 5 plans worked first time.",
    "Teams that bumped the stone had planned too few cards: they forgot the turn back after passing the obstacle.",
    "Planning on paper made fixes faster: teams knew which arrow to change."
   ],
   "am": [
    "ከ5 ዕቅዶች 2 በመጀመሪያ ጊዜ ሠርተዋል።",
    "ድንጋዩን የመቱ ቡድኖች በጣም ጥቂት ካርዶችን አቅደዋል፡ እንቅፋቱን ካለፉ በኋላ ወደ ኋላ መዞሩን ረስተዋል።",
    "በወረቀት ማቀድ ማስተካከያዎችን አፋጥኗል፡ ቡድኖች የትኛውን ቀስት እንደሚቀይሩ ያውቁ ነበር።"
   ]
  },
  "decision": {
   "en": "Add \"turn back after the obstacle\" to the planning checklist; next time use two obstacles.",
   "am": "«ከእንቅፋቱ በኋላ ወደ ኋላ ዙር»ን ወደ ማቀጃ ዝርዝሩ ጨምሩ፤ በሚቀጥለው ጊዜ ሁለት እንቅፋቶችን ተጠቀሙ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Sort the market basket",
   "am": "የገበያ ቅርጫቱን ደርድር"
  },
  "goal": {
   "en": "Children sort a basket by two rules, count each group and draw a picture chart.",
   "am": "ልጆች ቅርጫትን በሁለት ሕጎች ይደረድራሉ፣ እያንዳንዱን ቡድን ይቆጥራሉ፣ የሥዕል ቻርትም ይሥላሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "A basket of local fruit and vegetables",
    "why": {
     "en": "things to sort",
     "am": "የሚደረደሩ ነገሮች"
    },
    "get": "market"
   },
   {
    "name": "Paper, pencil, squared paper",
    "why": {
     "en": "record data and draw charts by hand",
     "am": "ዳታ መመዝገብና ቻርቶችን በእጅ መሣል"
    },
    "get": "school supplies"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Sort the basket by colour; count each group.",
    "Sort the same basket by fruit vs vegetable; count again.",
    "Draw one picture per item in a picture chart.",
    "Ask: which rule made more groups? Which group is biggest?",
    "Talk about how a phone sorts photos the same way after seeing many examples."
   ],
   "am": [
    "ቅርጫቱን በቀለም ደርድሩ፤ እያንዳንዱን ቡድን ቁጠሩ።",
    "ያንኑ ቅርጫት በፍራፍሬ vs አትክልት ደርድሩ፤ እንደገና ቁጠሩ።",
    "በሥዕል ቻርት ውስጥ ለእያንዳንዱ ነገር አንድ ሥዕል ሣሉ።",
    "ጠይቁ፡ የትኛው ሕግ ብዙ ቡድኖችን ሠራ? የትኛው ቡድን ትልቁ ነው?",
    "ስልክ ብዙ ምሳሌዎችን ካየ በኋላ ፎቶዎችን በተመሳሳይ መንገድ እንዴት እንደሚደረድር ተነጋገሩ።"
   ]
  },
  "code": "basket = [\"tomato\", \"tomato\", \"mango\", \"banana\", \"banana\", \"banana\", \"onion\", \"carrot\", \"orange\", \"orange\", \"avocado\", \"cabbage\"]\ncolour = {\"tomato\": \"red\", \"mango\": \"yellow\", \"banana\": \"yellow\", \"onion\": \"red\", \"carrot\": \"orange\", \"orange\": \"orange\", \"avocado\": \"green\", \"cabbage\": \"green\"}\nkind = {\"tomato\": \"vegetable\", \"mango\": \"fruit\", \"banana\": \"fruit\", \"onion\": \"vegetable\", \"carrot\": \"vegetable\", \"orange\": \"fruit\", \"avocado\": \"fruit\", \"cabbage\": \"vegetable\"}\nfrom collections import Counter\nby_colour = Counter(colour[x] for x in basket); by_kind = Counter(kind[x] for x in basket)\nprint(\"by colour:\", dict(by_colour)); print(\"by kind:  \", dict(by_kind))",
  "out": "by colour: {'red': 3, 'yellow': 4, 'orange': 3, 'green': 2}\nby kind:   {'vegetable': 5, 'fruit': 7}",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "The same basket sorted by colour",
     "am": "ያው ቅርጫት በቀለም የተደረደረ"
    },
    "x": {
     "label": {
      "en": "Items",
      "am": "ነገሮች"
     }
    },
    "fmt": 0,
    "cats": [
     "red",
     "yellow",
     "orange",
     "green"
    ],
    "series": [
     {
      "name": {
       "en": "Items",
       "am": "ነገሮች"
      },
      "slot": 1,
      "v": [
       3.0,
       4.0,
       3.0,
       2.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Items",
       "am": "ነገሮች"
      }
     ],
     "rows": [
      [
       "red",
       3.0
      ],
      [
       "yellow",
       4.0
      ],
      [
       "orange",
       3.0
      ],
      [
       "green",
       2.0
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "…and sorted by kind",
     "am": "…እና በዓይነት የተደረደረ"
    },
    "x": {
     "label": {
      "en": "Items",
      "am": "ነገሮች"
     }
    },
    "fmt": 0,
    "cats": [
     "vegetable",
     "fruit"
    ],
    "series": [
     {
      "name": {
       "en": "Items",
       "am": "ነገሮች"
      },
      "slot": 3,
      "v": [
       5.0,
       7.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Items",
       "am": "ነገሮች"
      }
     ],
     "rows": [
      [
       "vegetable",
       5.0
      ],
      [
       "fruit",
       7.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "By colour there are 4 groups; by kind only 2.",
    "The same 12 items can be grouped in different ways: the rule decides the groups.",
    "Every item is counted once in each chart: both add up to 12."
   ],
   "am": [
    "በቀለም 4 ቡድኖች አሉ፤ በዓይነት 2 ብቻ።",
    "ያው 12 ነገሮች በተለያዩ መንገዶች ሊቧደኑ ይችላሉ፡ ሕጉ ቡድኖቹን ይወስናል።",
    "እያንዳንዱ ነገር በእያንዳንዱ ቻርት አንድ ጊዜ ይቆጠራል፡ ሁለቱም 12 ይደርሳሉ።"
   ]
  },
  "decision": {
   "en": "Use \"sort by two rules\" every week with different objects (seeds, leaves, bottle tops) to build the habit of describing groups with clear rules.",
   "am": "የአስተሳሰብ ልማድን ለመገንባት «በሁለት ሕጎች ደርድር»ን በየሳምንቱ በተለያዩ ነገሮች (ዘሮች፣ ቅጠሎች፣ የጠርሙስ ክዳኖች) ተጠቀሙ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Tell a story in three scenes",
   "am": "ታሪክን በሦስት ትዕይንቶች ተናገር"
  },
  "goal": {
   "en": "Groups plan a folk tale in three scenes and check that each scene has a character, an action and an order.",
   "am": "ቡድኖች ተረትን በሦስት ትዕይንቶች ያቅዳሉ፣ እያንዳንዱ ትዕይንት ገጸ ባሕሪ፣ ተግባርና ቅደም ተከተል እንዳለው ይፈትሻሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Paper folded into 3 boxes",
    "why": {
     "en": "storyboard",
     "am": "የታሪክ ሰሌዳ"
    },
    "get": "any paper"
   },
   {
    "name": "ScratchJr or paper puppets",
    "why": {
     "en": "act the story",
     "am": "ታሪኩን ተውኑ"
    },
    "get": "free app or paper and sticks"
   },
   {
    "name": "Python 3 (teacher, optional)",
    "why": {
     "en": "turns the class results into a chart and a summary",
     "am": "የክፍሉን ውጤቶች ወደ ቻርትና ማጠቃለያ ይቀይራል"
    },
    "get": "Thonny or any phone Python app"
   }
  ],
  "steps": {
   "en": [
    "Choose a local folk tale (for example a clever hare).",
    "Draw the beginning, middle and end in three boxes.",
    "Under each box write who, what happens, and where.",
    "Act it with puppets or build it in ScratchJr.",
    "The class checks each story with a 3-point checklist."
   ],
   "am": [
    "የአካባቢ ተረት ምረጡ (ለምሳሌ ብልህ ጥንቸል)።",
    "መጀመሪያውን፣ መካከሉንና መጨረሻውን በሦስት ሳጥኖች ሣሉ።",
    "ከእያንዳንዱ ሳጥን በታች ማን፣ ምን እንደሚሆንና የት እንደሆነ ጻፉ።",
    "በአሻንጉሊቶች ተውኑት ወይም በScratchJr ገንቡት።",
    "ክፍሉ እያንዳንዱን ታሪክ በባለ 3 ነጥብ ማረጋገጫ ዝርዝር ይፈትሻል።"
   ]
  },
  "code": "checks = [\"has a character\", \"something happens\", \"clear order\"]\ngroups = {\"G1\": [1, 1, 1], \"G2\": [1, 1, 0], \"G3\": [1, 0, 1], \"G4\": [1, 1, 1], \"G5\": [1, 1, 0], \"G6\": [1, 1, 1]}\nfor i, c in enumerate(checks):\n    n = sum(g[i] for g in groups.values())\n    print(f\"{c:18s} {n}/{len(groups)}\")\nmissing = checks[min(range(3), key=lambda i: sum(g[i] for g in groups.values()))]",
  "out": "has a character    6/6\nsomething happens  5/6\nclear order        4/6",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Stories that passed each check (of 6)",
     "am": "እያንዳንዱን ፍተሻ ያለፉ ታሪኮች (ከ6)"
    },
    "x": {
     "label": {
      "en": "Groups",
      "am": "ቡድኖች"
     }
    },
    "fmt": 0,
    "cats": [
     "has a character",
     "something happens",
     "clear order"
    ],
    "series": [
     {
      "name": {
       "en": "Groups",
       "am": "ቡድኖች"
      },
      "slot": 1,
      "v": [
       6.0,
       5.0,
       4.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      {
       "en": "Groups",
       "am": "ቡድኖች"
      }
     ],
     "rows": [
      [
       "has a character",
       6.0
      ],
      [
       "something happens",
       5.0
      ],
      [
       "clear order",
       4.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Every story had a character.",
    "The weakest point was \"clear order\": scenes were sometimes acted out of order.",
    "Groups that wrote one sentence under each box kept the order right."
   ],
   "am": [
    "እያንዳንዱ ታሪክ ገጸ ባሕሪ ነበረው።",
    "ደካማው ነጥብ «clear order» ነበር፡ ትዕይንቶች አንዳንድ ጊዜ ያለ ቅደም ተከተል ተተውነዋል።",
    "ከእያንዳንዱ ሳጥን በታች አንድ ዓረፍተ ነገር የጻፉ ቡድኖች ቅደም ተከተሉን ጠብቀዋል።"
   ]
  },
  "decision": {
   "en": "Make \"number your boxes 1-2-3 and write one sentence each\" a rule; next, add a message that starts each new scene.",
   "am": "«ሳጥኖቻችሁን 1-2-3 ቁጥር ስጡና እያንዳንዳቸው አንድ ዓረፍተ ነገር ጻፉ»ን ሕግ አድርጉ፤ ቀጥሎ እያንዳንዱን አዲስ ትዕይንት የሚጀምር መልእክት ጨምሩ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 }
];
