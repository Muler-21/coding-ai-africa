/* Practical labs, track c, level 1. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[1] = [
 {
  "title": {
   "en": "Windmill speed experiment",
   "am": "የንፋስ ወፍጮ ፍጥነት ሙከራ"
  },
  "goal": {
   "en": "Build a forever-spinning windmill and measure how turn angle and wait time change its speed.",
   "am": "ለዘላለም የሚዞር የንፋስ ወፍጮ ገንባና የመዞሪያ ማዕዘንና የመጠበቂያ ጊዜ ፍጥነቱን እንዴት እንደሚቀይሩ ለካ።"
  },
  "time": {
   "en": "3 sessions of 45 min",
   "am": "3 ክፍለ ጊዜዎች፣ እያንዳንዱ 45 ደቂቃ"
  },
  "tools": [
   {
    "name": "Scratch 3",
    "why": {
     "en": "block programming",
     "am": "የብሎክ ፕሮግራሚንግ"
    },
    "get": "scratch.mit.edu or the free offline app"
   },
   {
    "name": "Stopwatch (phone)",
    "why": {
     "en": "count turns in 10 seconds",
     "am": "በ10 ሰከንድ ውስጥ ዙሮችን ቁጠር"
    },
    "get": "any phone"
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
     "en": "analyses the play-test data",
     "am": "የጨዋታ-ፈተና ዳታውን ይተነትናል"
    },
    "get": "Thonny"
   }
  ],
  "steps": {
   "en": [
    "Draw or pick a windmill sprite.",
    "Script: when green flag clicked → forever → turn (angle) → wait (seconds).",
    "Set angle 10, wait 0.1; count full turns in 10 seconds.",
    "Repeat for angles 5, 10, 20 and waits 0.05, 0.1, 0.2; record in a table.",
    "Predict, then check: what makes it fastest?"
   ],
   "am": [
    "የንፋስ ወፍጮ sprite ሣል ወይም ምረጥ።",
    "ስክሪፕት፡ አረንጓዴው ባንዲራ ሲጫን → forever → (ማዕዘን) ዙር → (ሰከንዶች) ጠብቅ።",
    "ማዕዘን 10፣ መጠበቂያ 0.1 አድርግ፤ በ10 ሰከንድ ውስጥ ሙሉ ዙሮችን ቁጠር።",
    "ለማዕዘኖች 5፣ 10፣ 20 እና ለመጠበቂያዎች 0.05፣ 0.1፣ 0.2 ድገም፤ በሰንጠረዥ መዝግብ።",
    "ተንብይ፣ ከዚያ ፈትሽ፡ በጣም ፈጣን የሚያደርገው ምንድነው?"
   ]
  },
  "code": "results = {}\nfor angle in (5, 10, 20):\n    for wait in (0.05, 0.1, 0.2):\n        steps_per_s = 1 / (wait + 1 / 30)          # Scratch redraws ~30 times a second; each loop takes at least one frame\n        turns_10s = 10 * steps_per_s * angle / 360\n        results[(angle, wait)] = round(turns_10s, 1)\nfor (a, w), n in results.items():\n    print(f\"angle {a:2d}, wait {w:4.2f}s -> about {n:4.1f} full turns in 10 s\")\nbest = max(results, key=results.get)",
  "out": "angle  5, wait 0.05s -> about  1.7 full turns in 10 s\nangle  5, wait 0.10s -> about  1.0 full turns in 10 s\nangle  5, wait 0.20s -> about  0.6 full turns in 10 s\nangle 10, wait 0.05s -> about  3.3 full turns in 10 s\nangle 10, wait 0.10s -> about  2.1 full turns in 10 s\nangle 10, wait 0.20s -> about  1.2 full turns in 10 s\nangle 20, wait 0.05s -> about  6.7 full turns in 10 s\nangle 20, wait 0.10s -> about  4.2 full turns in 10 s\nangle 20, wait 0.20s -> about  2.4 full turns in 10 s",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Full turns in 10 seconds",
     "am": "በ10 ሰከንድ ውስጥ ሙሉ ዙሮች"
    },
    "x": {
     "label": {
      "en": "Wait (seconds)",
      "am": "መጠበቂያ (ሰከንዶች)"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Turns in 10 s",
      "am": "በ10 ሰ ውስጥ ዙሮች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "angle 5°",
       "am": "ማዕዘን 5°"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       0.05,
       0.1,
       0.2
      ],
      "y": [
       1.7,
       1.0,
       0.6
      ],
      "tip": [
       "1.7|angle 5° · 0.05",
       "1|angle 5° · 0.1",
       "0.6|angle 5° · 0.2"
      ],
      "endlabel": {
       "en": "angle 5°",
       "am": "ማዕዘን 5°"
      }
     },
     {
      "name": {
       "en": "angle 10°",
       "am": "ማዕዘን 10°"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       0.05,
       0.1,
       0.2
      ],
      "y": [
       3.3,
       2.1,
       1.2
      ],
      "tip": [
       "3.3|angle 10° · 0.05",
       "2.1|angle 10° · 0.1",
       "1.2|angle 10° · 0.2"
      ],
      "endlabel": {
       "en": "angle 10°",
       "am": "ማዕዘን 10°"
      }
     },
     {
      "name": {
       "en": "angle 20°",
       "am": "ማዕዘን 20°"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       0.05,
       0.1,
       0.2
      ],
      "y": [
       6.7,
       4.2,
       2.4
      ],
      "tip": [
       "6.7|angle 20° · 0.05",
       "4.2|angle 20° · 0.1",
       "2.4|angle 20° · 0.2"
      ],
      "endlabel": {
       "en": "angle 20°",
       "am": "ማዕዘን 20°"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Wait (seconds)",
       "am": "መጠበቂያ (ሰከንዶች)"
      },
      {
       "en": "angle 5°",
       "am": "ማዕዘን 5°"
      },
      {
       "en": "angle 10°",
       "am": "ማዕዘን 10°"
      },
      {
       "en": "angle 20°",
       "am": "ማዕዘን 20°"
      }
     ],
     "rows": [
      [
       0.05,
       1.7,
       3.3,
       6.7
      ],
      [
       0.1,
       1.0,
       2.1,
       4.2
      ],
      [
       0.2,
       0.6,
       1.2,
       2.4
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "Fastest: angle 20° with wait 0.05 s (6.7 turns).",
    "Doubling the angle doubles the speed; doubling the wait does not quite halve it, because each loop also takes one screen frame.",
    "Very small waits look jerky with big angles: speed and smoothness trade off."
   ],
   "am": [
    "በጣም ፈጣኑ፡ ማዕዘን 20° ከመጠበቂያ 0.05 ሰ ጋር (6.7 ዙሮች)።",
    "ማዕዘኑን በእጥፍ ማሳደግ ፍጥነቱን በእጥፍ ያሳድጋል፤ መጠበቂያውን በእጥፍ ማሳደግ ግን በትክክል በግማሽ አይቀንሰውም፣ እያንዳንዱ loop አንድ የስክሪን frame ስለሚወስድ።",
    "በጣም ትናንሽ መጠበቂያዎች ከትላልቅ ማዕዘኖች ጋር የሚያንቀጠቅጡ ይመስላሉ፡ ፍጥነትና ለስላሳነት ይመጣጠናሉ።"
   ]
  },
  "decision": {
   "en": "Use small angles (5–10°) with short waits for smooth animation, and change only one setting at a time when testing: that is a fair test.",
   "am": "ለለስላሳ አኒሜሽን ትናንሽ ማዕዘኖችን (5–10°) ከአጭር መጠበቂያዎች ጋር ተጠቀም፤ ስትፈትሽ በአንድ ጊዜ አንድ ቅንብር ብቻ ቀይር፡ ይህ ፍትሐዊ ፈተና ነው።"
  },
  "note": {
   "en": "Turn counts are calculated from Scratch’s frame rate (about 30 per second); your counts may differ slightly.",
   "am": "የዙር ቆጠራዎቹ ከScratch frame rate (በሰከንድ ወደ 30) የተሰሉ ናቸው፤ የአንተ ቆጠራዎች ትንሽ ሊለያዩ ይችላሉ።"
  }
 },
 {
  "title": {
   "en": "Play-testing the catch game",
   "am": "የመያዣ ጨዋታውን በመጫወት መፈተሽ"
  },
  "goal": {
   "en": "Tune the falling speed of a catch-the-mango game so it is neither too easy nor too hard, using play-test data.",
   "am": "የጨዋታ-ፈተና ዳታን በመጠቀም የማንጎ መያዣ ጨዋታን የመውደቂያ ፍጥነት በጣም ቀላልም በጣም ከባድም እንዳይሆን አስተካክል።"
  },
  "time": {
   "en": "3 sessions of 45 min",
   "am": "3 ክፍለ ጊዜዎች፣ እያንዳንዱ 45 ደቂቃ"
  },
  "tools": [
   {
    "name": "Scratch 3",
    "why": {
     "en": "block programming",
     "am": "የብሎክ ፕሮግራሚንግ"
    },
    "get": "scratch.mit.edu or the free offline app"
   },
   {
    "name": "5 classmates as testers",
    "why": {
     "en": "real players",
     "am": "እውነተኛ ተጫዋቾች"
    },
    "get": "your class"
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
     "en": "analyses the play-test data",
     "am": "የጨዋታ-ፈተና ዳታውን ይተነትናል"
    },
    "get": "Thonny"
   }
  ],
  "steps": {
   "en": [
    "Build the game: basket on arrow keys; mango falls (change y by −speed); if touching basket → sound, back to top.",
    "Add a variable \"caught\" and a variable \"dropped\".",
    "Each tester plays 60 seconds at speed 3, 5, 7 and 9.",
    "Record caught and dropped for each speed.",
    "Calculate the catch rate = caught / (caught + dropped)."
   ],
   "am": [
    "ጨዋታውን ገንባ፡ ቅርጫት በቀስት ቁልፎች፤ ማንጎ ይወድቃል (yን በ−speed ቀይር)፤ ቅርጫት ከነካ → ድምፅ፣ ወደ ላይ ተመለስ።",
    "«caught» variable እና «dropped» variable ጨምር።",
    "እያንዳንዱ ፈታኝ በፍጥነት 3፣ 5፣ 7 እና 9 ለ60 ሰከንድ ይጫወታል።",
    "ለእያንዳንዱ ፍጥነት የተያዙትንና የወደቁትን መዝግብ።",
    "የመያዣ መጠንን አስላ = caught / (caught + dropped)።"
   ]
  },
  "code": "tests = {3: [(14, 1), (13, 2), (15, 0), (12, 3), (14, 1)], 5: [(17, 5), (15, 7), (18, 4), (14, 8), (16, 6)],\n         7: [(14, 13), (12, 15), (15, 12), (11, 16), (13, 14)], 9: [(8, 24), (6, 26), (9, 23), (5, 27), (7, 25)]}   # (caught, dropped) per tester\nrate = {}\nfor speed, rows in tests.items():\n    c = sum(a for a, b in rows); d = sum(b for a, b in rows)\n    rate[speed] = c / (c + d)\n    print(f\"speed {speed}: catch rate {rate[speed]:.0%}\")\ntarget = min(rate, key=lambda s: abs(rate[s] - 0.7))",
  "out": "speed 3: catch rate 91%\nspeed 5: catch rate 73%\nspeed 7: catch rate 48%\nspeed 9: catch rate 22%",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Catch rate by falling speed",
     "am": "የመያዣ መጠን በመውደቂያ ፍጥነት"
    },
    "x": {
     "label": {
      "en": "Falling speed",
      "am": "የመውደቂያ ፍጥነት"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Percent caught",
      "am": "የተያዘ መቶኛ"
     },
     "min": 0,
     "max": 100
    },
    "series": [
     {
      "name": {
       "en": "Catch rate %",
       "am": "የመያዣ መጠን %"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       3.0,
       5.0,
       7.0,
       9.0
      ],
      "y": [
       90.6667,
       72.7273,
       48.1481,
       21.875
      ],
      "tip": [
       "90.67|Catch rate % · 3",
       "72.73|Catch rate % · 5",
       "48.15|Catch rate % · 7",
       "21.88|Catch rate % · 9"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Falling speed",
       "am": "የመውደቂያ ፍጥነት"
      },
      {
       "en": "Catch rate %",
       "am": "የመያዣ መጠን %"
      }
     ],
     "rows": [
      [
       3.0,
       90.667
      ],
      [
       5.0,
       72.727
      ],
      [
       7.0,
       48.148
      ],
      [
       9.0,
       21.875
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 70,
      "label": {
       "en": "target 70%",
       "am": "ዒላማ 70%"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "At speed 3 players catch 91%: too easy, testers got bored.",
    "At speed 9 only 22%: too hard.",
    "Speed 5 is closest to the 70% target that game designers often aim for."
   ],
   "am": [
    "በፍጥነት 3 ተጫዋቾች 91% ይይዛሉ፡ በጣም ቀላል፣ ፈታኞቹ ሰለቻቸው።",
    "በፍጥነት 9 22% ብቻ፡ በጣም ከባድ።",
    "ፍጥነት 5 የጨዋታ ዲዛይነሮች ብዙውን ጊዜ ለሚያልሙት 70% ዒላማ በጣም ቅርብ ነው።"
   ]
  },
  "decision": {
   "en": "Start the game at speed 5 and increase the speed by 1 every 10 catches, so the game gets harder as the player improves.",
   "am": "ጨዋታውን በፍጥነት 5 ጀምርና በየ10 መያዣዎች ፍጥነቱን በ1 ጨምር፤ ስለዚህ ተጫዋቹ ሲሻሻል ጨዋታው ይከብዳል።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Is the Scratch dice fair?",
   "am": "የScratch ዳይሱ ፍትሐዊ ነው?"
  },
  "goal": {
   "en": "Roll a Scratch dice 120 times with a list, compare with a real dice, and test fairness.",
   "am": "የScratch ዳይስን በlist 120 ጊዜ ጣል፣ ከእውነተኛ ዳይስ ጋር አወዳድር፣ ፍትሐዊነትንም ፈትሽ።"
  },
  "time": {
   "en": "3 sessions of 45 min",
   "am": "3 ክፍለ ጊዜዎች፣ እያንዳንዱ 45 ደቂቃ"
  },
  "tools": [
   {
    "name": "Scratch 3",
    "why": {
     "en": "block programming",
     "am": "የብሎክ ፕሮግራሚንግ"
    },
    "get": "scratch.mit.edu or the free offline app"
   },
   {
    "name": "A real dice",
    "why": {
     "en": "compare with chance in the real world",
     "am": "በእውነተኛው ዓለም ካለ አጋጣሚ ጋር አወዳድር"
    },
    "get": "market or board game"
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
     "en": "analyses the play-test data",
     "am": "የጨዋታ-ፈተና ዳታውን ይተነትናል"
    },
    "get": "Thonny"
   }
  ],
  "steps": {
   "en": [
    "Make a list \"rolls\" and a loop: repeat 120 → add (pick random 1 to 6) to rolls.",
    "Count how many of each number with a loop over the list (or export the list).",
    "Roll a real dice 120 times and tally.",
    "Draw both tallies as bar charts.",
    "Compare with the expected 20 each."
   ],
   "am": [
    "«rolls» list እና loop ሥራ፡ 120 ጊዜ ድገም → (ከ1 እስከ 6 በዘፈቀደ)ን ወደ rolls ጨምር።",
    "በlistኡ ላይ በloop እያንዳንዱ ቁጥር ስንት እንደሆነ ቁጠር (ወይም listኡን ላክ)።",
    "እውነተኛ ዳይስ 120 ጊዜ ጣልና ቁጠር።",
    "ሁለቱንም ቆጠራዎች እንደ የአሞሌ ቻርቶች ሣል።",
    "ከሚጠበቀው ለእያንዳንዱ 20 ጋር አወዳድር።"
   ]
  },
  "code": "import random\nfrom scipy import stats\nrandom.seed(7)\nscratch = [random.randint(1, 6) for _ in range(120)]\ncr = [22, 18, 19, 24, 17, 20]                          # in class: your tally from 120 rolls of the real dice\ncs = [scratch.count(k) for k in range(1, 7)]\nprint(\"Scratch dice:\", cs); print(\"Real dice:   \", cr)\nfor name, counts in [(\"Scratch\", cs), (\"Real\", cr)]:\n    chi, p = stats.chisquare(counts)\n    print(f\"{name}: chi-square {chi:.1f}, p = {p:.2f} -> {'consistent with a fair dice' if p > 0.05 else 'looks unfair'}\")\np_scratch = stats.chisquare(cs)[1]",
  "out": "Scratch dice: [27, 15, 17, 18, 27, 16]\nReal dice:    [22, 18, 19, 24, 17, 20]\nScratch: chi-square 7.6, p = 0.18 -> consistent with a fair dice\nReal: chi-square 1.7, p = 0.89 -> consistent with a fair dice",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "120 rolls: how often each number came up (expected 20)",
     "am": "120 ጣሎች፡ እያንዳንዱ ቁጥር ስንት ጊዜ እንደመጣ (የሚጠበቀው 20)"
    },
    "x": {
     "label": {
      "en": "Times rolled",
      "am": "የተጣለበት ጊዜ"
     }
    },
    "fmt": 0,
    "cats": [
     "1",
     "2",
     "3",
     "4",
     "5",
     "6"
    ],
    "series": [
     {
      "name": {
       "en": "Scratch dice",
       "am": "የScratch ዳይስ"
      },
      "slot": 1,
      "v": [
       27.0,
       15.0,
       17.0,
       18.0,
       27.0,
       16.0
      ]
     },
     {
      "name": {
       "en": "Real dice",
       "am": "እውነተኛ ዳይስ"
      },
      "slot": 2,
      "v": [
       22.0,
       18.0,
       19.0,
       24.0,
       17.0,
       20.0
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
       "en": "Scratch dice",
       "am": "የScratch ዳይስ"
      },
      {
       "en": "Real dice",
       "am": "እውነተኛ ዳይስ"
      }
     ],
     "rows": [
      [
       "1",
       27.0,
       22.0
      ],
      [
       "2",
       15.0,
       18.0
      ],
      [
       "3",
       17.0,
       19.0
      ],
      [
       "4",
       18.0,
       24.0
      ],
      [
       "5",
       27.0,
       17.0
      ],
      [
       "6",
       16.0,
       20.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The Scratch dice counts range from 15 to 27: not exactly 20 each, and that is normal chance.",
    "The chi-square test gives p = 0.18: no evidence the Scratch dice is unfair.",
    "The real dice also varies (17 to 24) and passes the same test: both behave like fair dice."
   ],
   "am": [
    "የScratch ዳይስ ቆጠራዎች ከ15 እስከ 27 ይደርሳሉ፡ ለእያንዳንዱ በትክክል 20 አይደሉም፣ ይህም መደበኛ አጋጣሚ ነው።",
    "የchi-square ፈተናው p = 0.18 ይሰጣል፡ የScratch ዳይሱ ፍትሐዊ እንዳልሆነ ማስረጃ የለም።",
    "እውነተኛው ዳይስም ይለያያል (17 እስከ 24)፣ ያንኑ ፈተናም ያልፋል፡ ሁለቱም እንደ ፍትሐዊ ዳይሶች ይሠራሉ።"
   ]
  },
  "decision": {
   "en": "Use \"pick random\" for fair games with confidence; when counts look too perfect or too uneven, collect more rolls before deciding.",
   "am": "ለፍትሐዊ ጨዋታዎች «pick random»ን በእርግጠኝነት ተጠቀም፤ ቆጠራዎች በጣም ፍጹም ወይም በጣም ያልተመጣጠኑ ሲመስሉ ከመወሰንህ በፊት ብዙ ጣሎችን ሰብስብ።"
  }
 },
 {
  "title": {
   "en": "Teach a computer two crops",
   "am": "ኮምፒውተርን ሁለት ሰብሎች አስተምር"
  },
  "goal": {
   "en": "Train Teachable Machine with more and more photos and measure how accuracy grows on photos it has never seen.",
   "am": "Teachable Machineን በብዙና በብዙ ፎቶዎች አሰልጥንና ፈጽሞ ባላያቸው ፎቶዎች ላይ ትክክለኛነቱ እንዴት እንደሚያድግ ለካ።"
  },
  "time": {
   "en": "3 sessions of 45 min",
   "am": "3 ክፍለ ጊዜዎች፣ እያንዳንዱ 45 ደቂቃ"
  },
  "tools": [
   {
    "name": "Teachable Machine",
    "why": {
     "en": "trains an image model in the browser",
     "am": "በአሳሹ ውስጥ የምስል ሞዴል ያሰለጥናል"
    },
    "get": "teachablemachine.withgoogle.com (free)"
   },
   {
    "name": "Phone camera",
    "why": {
     "en": "collect photos of teff and maize",
     "am": "የጤፍና የበቆሎ ፎቶዎችን ሰብስብ"
    },
    "get": "any phone"
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
     "en": "analyses the play-test data",
     "am": "የጨዋታ-ፈተና ዳታውን ይተነትናል"
    },
    "get": "Thonny"
   }
  ],
  "steps": {
   "en": [
    "Take 60 photos of each crop in different light and backgrounds.",
    "Keep 10 photos of each aside as a test set.",
    "Train with 5, 10, 20 and 50 photos per crop.",
    "After each training, test on the 20 kept-aside photos and count correct answers.",
    "Record accuracy for each training size."
   ],
   "am": [
    "የእያንዳንዱን ሰብል 60 ፎቶዎች በተለያየ ብርሃንና ዳራ አንሳ።",
    "ከእያንዳንዱ 10 ፎቶዎችን እንደ የፈተና ስብስብ ለይተህ አስቀምጥ።",
    "በሰብል በ5፣ 10፣ 20 እና 50 ፎቶዎች አሰልጥን።",
    "ከእያንዳንዱ ሥልጠና በኋላ በተለዩት 20 ፎቶዎች ፈትሽና ትክክለኛ መልሶችን ቁጠር።",
    "ለእያንዳንዱ የሥልጠና መጠን ትክክለኛነትን መዝግብ።"
   ]
  },
  "code": "train_sizes = [5, 10, 20, 50]\ncorrect = {5: 13, 10: 15, 20: 17, 50: 19}      # correct answers out of 20 test photos (class results)\nsame_background = {5: 18, 10: 19, 20: 19, 50: 20}   # if the test photos had the same background as training\nfor n in train_sizes:\n    print(f\"{n:2d} photos per crop: {correct[n]}/20 on new photos ({correct[n] / 20:.0%}), {same_background[n]}/20 on look-alike photos\")",
  "out": " 5 photos per crop: 13/20 on new photos (65%), 18/20 on look-alike photos\n10 photos per crop: 15/20 on new photos (75%), 19/20 on look-alike photos\n20 photos per crop: 17/20 on new photos (85%), 19/20 on look-alike photos\n50 photos per crop: 19/20 on new photos (95%), 20/20 on look-alike photos",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Accuracy on 20 unseen photos",
     "am": "ባልታዩ 20 ፎቶዎች ላይ ትክክለኛነት"
    },
    "x": {
     "label": {
      "en": "Training photos per crop",
      "am": "በሰብል የሥልጠና ፎቶዎች"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Percent correct",
      "am": "ትክክለኛ መቶኛ"
     },
     "min": 50,
     "max": 100
    },
    "series": [
     {
      "name": {
       "en": "New backgrounds",
       "am": "አዲስ ዳራዎች"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       5.0,
       10.0,
       20.0,
       50.0
      ],
      "y": [
       65.0,
       75.0,
       85.0,
       95.0
      ],
      "tip": [
       "65|New backgrounds · 5",
       "75|New backgrounds · 10",
       "85|New backgrounds · 20",
       "95|New backgrounds · 50"
      ],
      "endlabel": {
       "en": "New backgrounds",
       "am": "አዲስ ዳራዎች"
      }
     },
     {
      "name": {
       "en": "Same background as training",
       "am": "ከሥልጠና ጋር ተመሳሳይ ዳራ"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       5.0,
       10.0,
       20.0,
       50.0
      ],
      "y": [
       90.0,
       95.0,
       95.0,
       100.0
      ],
      "tip": [
       "90|Same background as training · 5",
       "95|Same background as training · 10",
       "95|Same background as training · 20",
       "100|Same background as training · 50"
      ],
      "endlabel": {
       "en": "Same background as training",
       "am": "ከሥልጠና ጋር ተመሳሳይ ዳራ"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Training photos per crop",
       "am": "በሰብል የሥልጠና ፎቶዎች"
      },
      {
       "en": "New backgrounds",
       "am": "አዲስ ዳራዎች"
      },
      {
       "en": "Same background as training",
       "am": "ከሥልጠና ጋር ተመሳሳይ ዳራ"
      }
     ],
     "rows": [
      [
       5.0,
       65.0,
       90.0
      ],
      [
       10.0,
       75.0,
       95.0
      ],
      [
       20.0,
       85.0,
       95.0
      ],
      [
       50.0,
       95.0,
       100.0
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "With 5 photos per crop the model was right 13 times out of 20; with 50 photos, 19 times.",
    "On photos that look like the training photos it seems almost perfect: that score is too optimistic.",
    "More and more varied photos help most."
   ],
   "am": [
    "በሰብል 5 ፎቶዎች ሞዴሉ ከ20 13 ጊዜ ትክክል ነበር፤ በ50 ፎቶዎች 19 ጊዜ።",
    "የሥልጠና ፎቶዎችን በሚመስሉ ፎቶዎች ላይ ከሞላ ጎደል ፍጹም ይመስላል፡ ያ ውጤት ከልክ በላይ ተስፋ ሰጪ ነው።",
    "ብዙና የተለያዩ ፎቶዎች በጣም ይረዳሉ።"
   ]
  },
  "decision": {
   "en": "Always test on photos the model has not seen, from new places; collect at least 50 varied photos per crop before trusting the model.",
   "am": "ሞዴሉን ባላያቸው፣ ከአዳዲስ ቦታዎች በተወሰዱ ፎቶዎች ሁልጊዜ ፈትሽ፤ ሞዴሉን ከማመንህ በፊት በሰብል ቢያንስ 50 የተለያዩ ፎቶዎችን ሰብስብ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 }
];
