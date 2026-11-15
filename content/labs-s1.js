/* Practical labs, track s, level 1. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[1] = [
 {
  "title": {
   "en": "Do soaked beans sprout faster?",
   "am": "የተዘፈዘፈ ባቄላ በፍጥነት ይበቅላል?"
  },
  "goal": {
   "en": "Ask a clear question, plan how to collect the data, then count sprouted seeds each day for soaked and dry beans.",
   "am": "ግልጽ ጥያቄ ጠይቁ፣ ዳታውን እንዴት እንደምትሰበስቡ አቅዱ፣ ከዚያ ለተዘፈዘፉና ለደረቁ ባቄላዎች በየቀኑ የበቀሉ ዘሮችን ቁጠሩ።"
  },
  "time": {
   "en": "1 week, 10 min a day",
   "am": "1 ሳምንት፣ በቀን 10 ደቂቃ"
  },
  "tools": [
   {
    "name": "40 bean seeds, water, two plates, cloth or paper towel",
    "why": {
     "en": "the germination test",
     "am": "የመብቀል ፈተናው"
    },
    "get": "kitchen"
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
    "Write the question: \"Do beans soaked overnight sprout faster than dry beans?\"",
    "Soak 20 beans overnight; keep 20 dry.",
    "Put each group on a wet cloth on its own plate, side by side.",
    "Every day for 5 days, count the beans with a root showing; write it in a table.",
    "Make a line chart for both groups and answer the question."
   ],
   "am": [
    "ጥያቄውን ጻፉ፡ «በአንድ ሌሊት የተዘፈዘፉ ባቄላዎች ከደረቁ ባቄላዎች በፍጥነት ይበቅላሉ?»",
    "20 ባቄላዎችን በአንድ ሌሊት ዘፍዝፉ፤ 20ን ደረቅ አቆዩ።",
    "እያንዳንዱን ቡድን በራሱ ሳህን ላይ እርጥብ ጨርቅ ላይ፣ ጎን ለጎን አስቀምጡ።",
    "ለ5 ቀናት በየቀኑ ሥር ያወጡ ባቄላዎችን ቁጠሩ፤ በሰንጠረዥ ጻፉት።",
    "ለሁለቱም ቡድኖች የመስመር ቻርት ሥሩና ጥያቄውን መልሱ።"
   ]
  },
  "code": "days = [1, 2, 3, 4, 5]\nsoaked = [2, 9, 15, 18, 18]; dry = [0, 2, 7, 13, 16]          # beans with a root, out of 20\nprint(\"day  soaked  dry\")\nfor d, a, b in zip(days, soaked, dry): print(f\"{d:3d}  {a:6d}  {b:3d}\")\nhalf_soaked = next(d for d, a in zip(days, soaked) if a >= 10); half_dry = next(d for d, b in zip(days, dry) if b >= 10)\nprint(f\"half sprouted by day {half_soaked} (soaked) and day {half_dry} (dry); final {soaked[-1] / 20:.0%} vs {dry[-1] / 20:.0%}\")",
  "out": "day  soaked  dry\n  1       2    0\n  2       9    2\n  3      15    7\n  4      18   13\n  5      18   16\nhalf sprouted by day 3 (soaked) and day 4 (dry); final 90% vs 80%",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Beans sprouted (out of 20)",
     "am": "የበቀሉ ባቄላዎች (ከ20)"
    },
    "x": {
     "label": {
      "en": "Day",
      "am": "ቀን"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Beans with a root",
      "am": "ሥር ያላቸው ባቄላዎች"
     },
     "min": 0,
     "max": 20
    },
    "series": [
     {
      "name": {
       "en": "Soaked",
       "am": "የተዘፈዘፈ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0,
       4.0,
       5.0
      ],
      "y": [
       2.0,
       9.0,
       15.0,
       18.0,
       18.0
      ],
      "tip": [
       "2|Soaked · 1",
       "9|Soaked · 2",
       "15|Soaked · 3",
       "18|Soaked · 4",
       "18|Soaked · 5"
      ],
      "endlabel": {
       "en": "Soaked",
       "am": "የተዘፈዘፈ"
      }
     },
     {
      "name": {
       "en": "Dry",
       "am": "ደረቅ"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0,
       4.0,
       5.0
      ],
      "y": [
       0.0,
       2.0,
       7.0,
       13.0,
       16.0
      ],
      "tip": [
       "0|Dry · 1",
       "2|Dry · 2",
       "7|Dry · 3",
       "13|Dry · 4",
       "16|Dry · 5"
      ],
      "endlabel": {
       "en": "Dry",
       "am": "ደረቅ"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Day",
       "am": "ቀን"
      },
      {
       "en": "Soaked",
       "am": "የተዘፈዘፈ"
      },
      {
       "en": "Dry",
       "am": "ደረቅ"
      }
     ],
     "rows": [
      [
       1.0,
       2.0,
       0.0
      ],
      [
       2.0,
       9.0,
       2.0
      ],
      [
       3.0,
       15.0,
       7.0
      ],
      [
       4.0,
       18.0,
       13.0
      ],
      [
       5.0,
       18.0,
       16.0
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "Half of the soaked beans had sprouted by day 3; the dry beans needed until day 4.",
    "By day 5 most beans in both groups sprouted (18 and 16 of 20): soaking makes them faster, not more.",
    "One plate per group is a small test: a second class repeating it would make us surer."
   ],
   "am": [
    "የተዘፈዘፉ ባቄላዎች ግማሹ በቀን 3 በቅለዋል፤ ደረቆቹ እስከ ቀን 4 አስፈልጓቸዋል።",
    "በቀን 5 በሁለቱም ቡድኖች አብዛኞቹ ባቄላዎች በቅለዋል (ከ20 18 እና 16)፡ መዘፍዘፍ ያፈጥናቸዋል እንጂ አያበዛቸውም።",
    "በቡድን አንድ ሳህን ትንሽ ፈተና ነው፡ ሁለተኛ ክፍል ቢደግመው የበለጠ እርግጠኛ እንሆናለን።"
   ]
  },
  "decision": {
   "en": "Soak beans overnight before planting the school garden so they come up together and faster; ask another class to repeat the test.",
   "am": "ባቄላዎቹ በአንድ ላይና በፍጥነት እንዲወጡ የትምህርት ቤቱን የአትክልት ቦታ ከመትከላችሁ በፊት በአንድ ሌሊት ዘፍዝፏቸው፤ ሌላ ክፍል ፈተናውን እንዲደግም ጠይቁ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Our families’ animals: tally, table and bar chart",
   "am": "የቤተሰቦቻችን እንስሳት፡ ቆጠራ፣ ሰንጠረዥና የአሞሌ ቻርት"
  },
  "goal": {
   "en": "Survey the class about animals kept at home, tally the answers, make a table and a bar chart, and choose an animal-care topic to study.",
   "am": "በቤት ስለሚያዙ እንስሳት ክፍሉን ጠይቁ፣ መልሶቹን በምልክት ቁጠሩ፣ ሰንጠረዥና የአሞሌ ቻርት ሥሩ፣ የሚጠና የእንስሳት እንክብካቤ ርዕስ ምረጡ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Paper, pencil, squared paper",
    "why": {
     "en": "record data and draw charts by hand",
     "am": "ዳታ መመዝገብና ቻርቶችን በእጅ መሣል"
    },
    "get": "school supplies"
   },
   {
    "name": "Squared paper and coloured pencils",
    "why": {
     "en": "draw the bar chart",
     "am": "የአሞሌ ቻርቱን መሣል"
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
    "Question: \"Which animals does your family keep?\" (each child can name several).",
    "Tally on the board with groups of five: |||| then a line across.",
    "Copy the totals into a table: animal, number of families.",
    "Draw bars on squared paper: one square = one family, same width for every bar.",
    "Read the chart: most, fewest, and the difference."
   ],
   "am": [
    "ጥያቄ፡ «ቤተሰብህ የትኞቹን እንስሳት ያረባል?» (እያንዳንዱ ልጅ በርካታ ሊጠራ ይችላል)።",
    "በሰሌዳው ላይ በአምስት ቡድኖች ቁጠሩ፡ |||| ከዚያ የሚያቋርጥ መስመር።",
    "ድምሮቹን ወደ ሰንጠረዥ ገልብጡ፡ እንስሳ፣ የቤተሰቦች ብዛት።",
    "በካሬ ወረቀት ላይ አሞሌዎችን ሣሉ፡ አንድ ካሬ = አንድ ቤተሰብ፣ ለእያንዳንዱ አሞሌ ያው ስፋት።",
    "ቻርቱን አንብቡ፡ ብዙ፣ ጥቂት እና ልዩነቱ።"
   ]
  },
  "code": "answers = [\"chicken\"] * 21 + [\"cattle\"] * 14 + [\"sheep\"] * 11 + [\"goat\"] * 9 + [\"donkey\"] * 6 + [\"bees\"] * 3   # 32 children\ntable = {}\nfor a in answers: table[a] = table.get(a, 0) + 1\nfor animal, n in sorted(table.items(), key=lambda kv: -kv[1]):\n    print(f\"{animal:8s} {'|||| ' * (n // 5)}{'|' * (n % 5):6s} {n}\")\nmost, fewest = max(table, key=table.get), min(table, key=table.get)",
  "out": "chicken  |||| |||| |||| |||| |      21\ncattle   |||| |||| ||||   14\nsheep    |||| |||| |      11\ngoat     |||| ||||   9\ndonkey   |||| |      6\nbees     |||    3",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Families keeping each animal (32 children asked)",
     "am": "እያንዳንዱን እንስሳ የሚያረቡ ቤተሰቦች (32 ልጆች ተጠይቀዋል)"
    },
    "x": {
     "label": {
      "en": "Families",
      "am": "ቤተሰቦች"
     }
    },
    "fmt": 0,
    "cats": [
     "chicken",
     "cattle",
     "sheep",
     "goat",
     "donkey",
     "bees"
    ],
    "series": [
     {
      "name": {
       "en": "Families",
       "am": "ቤተሰቦች"
      },
      "slot": 1,
      "v": [
       21.0,
       14.0,
       11.0,
       9.0,
       6.0,
       3.0
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
       "en": "Families",
       "am": "ቤተሰቦች"
      }
     ],
     "rows": [
      [
       "chicken",
       21.0
      ],
      [
       "cattle",
       14.0
      ],
      [
       "sheep",
       11.0
      ],
      [
       "goat",
       9.0
      ],
      [
       "donkey",
       6.0
      ],
      [
       "bees",
       3.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Most families keep chicken (21 of 32); fewest keep bees (3).",
    "7 more families keep chickens than cattle.",
    "The totals add up to more than 32 because many families keep several animals."
   ],
   "am": [
    "አብዛኞቹ ቤተሰቦች chicken ያረባሉ (ከ32 21)፤ ጥቂቶቹ bees ያረባሉ (3)።",
    "ከከብት ይልቅ ዶሮ የሚያረቡ ቤተሰቦች 7 ይበልጣሉ።",
    "ብዙ ቤተሰቦች በርካታ እንስሳትን ስለሚያረቡ ድምሮቹ ከ32 በላይ ይሆናሉ።"
   ]
  },
  "decision": {
   "en": "Study chicken care first (it helps the most families): feed, clean water and vaccination against Newcastle disease. Invite a parent who keeps bees for the next lesson.",
   "am": "መጀመሪያ የዶሮ እንክብካቤን አጥኑ (ብዙ ቤተሰቦችን ይረዳል)፡ መኖ፣ ንጹሕ ውሃና የኒውካስል በሽታ ክትባት። ለሚቀጥለው ትምህርት ንብ የሚያረባ ወላጅ ጋብዙ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Measuring maize seedlings every week",
   "am": "የበቆሎ ችግኞችን በየሳምንቱ መለካት"
  },
  "goal": {
   "en": "Measure the height of the same 10 maize seedlings every week for 4 weeks, find the weekly growth, and spot a plant that needs help.",
   "am": "ያንኑ 10 የበቆሎ ችግኞች ቁመት ለ4 ሳምንታት በየሳምንቱ ለኩ፣ ሳምንታዊ እድገቱን ፈልጉ፣ እርዳታ የሚያስፈልገውን ተክል ለዩ።"
  },
  "time": {
   "en": "4 weeks, 20 min a week",
   "am": "4 ሳምንታት፣ በሳምንት 20 ደቂቃ"
  },
  "tools": [
   {
    "name": "Ruler or tape measure",
    "why": {
     "en": "measure in centimetres",
     "am": "በሴንቲሜትር መለካት"
    },
    "get": "school supplies"
   },
   {
    "name": "Labels or sticks with numbers 1–10",
    "why": {
     "en": "measure the same plants every time",
     "am": "በእያንዳንዱ ጊዜ ያንኑ ተክል መለካት"
    },
    "get": "school garden"
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
    "Mark 10 seedlings with numbered sticks.",
    "Measure from the soil to the tip of the longest leaf, in centimetres.",
    "Write each week’s heights in a table: plant number, week 1, 2, 3, 4.",
    "Find the average height each week and the growth from week to week.",
    "Look for a plant that grows much less than the others."
   ],
   "am": [
    "10 ችግኞችን በቁጥር በተጻፈባቸው እንጨቶች ምልክት አድርጉ።",
    "ከአፈሩ እስከ ረጅሙ ቅጠል ጫፍ በሴንቲሜትር ለኩ።",
    "የእያንዳንዱን ሳምንት ቁመቶች በሰንጠረዥ ጻፉ፡ የተክል ቁጥር፣ ሳምንት 1፣ 2፣ 3፣ 4።",
    "በየሳምንቱ አማካይ ቁመቱንና ከሳምንት ወደ ሳምንት ያለውን እድገት ፈልጉ።",
    "ከሌሎቹ በጣም ያነሰ የሚያድግ ተክል ፈልጉ።"
   ]
  },
  "code": "heights = {1: [8, 15, 26, 41], 2: [9, 17, 28, 44], 3: [7, 14, 24, 38], 4: [8, 16, 27, 43], 5: [9, 12, 15, 18],\n           6: [8, 15, 25, 40], 7: [10, 18, 30, 46], 8: [7, 14, 25, 39], 9: [9, 16, 27, 42], 10: [8, 15, 26, 41]}   # cm, weeks 1-4\nweeks = [1, 2, 3, 4]\nmean = [sum(h[w] for h in heights.values()) / 10 for w in range(4)]\ngrowth = [round(b - a, 1) for a, b in zip(mean, mean[1:])]\nslow = min(heights, key=lambda p: heights[p][3] - heights[p][0])\nprint(\"average height (cm):\", [round(m, 1) for m in mean]); print(\"growth per week (cm):\", growth)\nprint(f\"slowest plant: number {slow}, grew {heights[slow][3] - heights[slow][0]} cm in 3 weeks vs about {mean[3] - mean[0]:.0f} cm on average\")",
  "out": "average height (cm): [8.3, 15.2, 25.3, 39.2]\ngrowth per week (cm): [6.9, 10.1, 13.9]\nslowest plant: number 5, grew 9 cm in 3 weeks vs about 31 cm on average",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Maize seedling height (cm)",
     "am": "የበቆሎ ችግኝ ቁመት (cm)"
    },
    "x": {
     "label": {
      "en": "Week",
      "am": "ሳምንት"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Height (cm)",
      "am": "ቁመት (cm)"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Average of 10 plants",
       "am": "የ10 ተክሎች አማካይ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0,
       4.0
      ],
      "y": [
       8.3,
       15.2,
       25.3,
       39.2
      ],
      "tip": [
       "8.3|Average of 10 plants · 1",
       "15.2|Average of 10 plants · 2",
       "25.3|Average of 10 plants · 3",
       "39.2|Average of 10 plants · 4"
      ],
      "endlabel": {
       "en": "Average of 10 plants",
       "am": "የ10 ተክሎች አማካይ"
      }
     },
     {
      "name": {
       "en": "Plant 5",
       "am": "ተክል 5"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0,
       4.0
      ],
      "y": [
       9.0,
       12.0,
       15.0,
       18.0
      ],
      "tip": [
       "9|Plant 5 · 1",
       "12|Plant 5 · 2",
       "15|Plant 5 · 3",
       "18|Plant 5 · 4"
      ],
      "endlabel": {
       "en": "Plant 5",
       "am": "ተክል 5"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Week",
       "am": "ሳምንት"
      },
      {
       "en": "Average of 10 plants",
       "am": "የ10 ተክሎች አማካይ"
      },
      {
       "en": "Plant 5",
       "am": "ተክል 5"
      }
     ],
     "rows": [
      [
       1.0,
       8.3,
       9.0
      ],
      [
       2.0,
       15.2,
       12.0
      ],
      [
       3.0,
       25.3,
       15.0
      ],
      [
       4.0,
       39.2,
       18.0
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "The plants grew faster every week: 6.9, 10.1, 13.9 cm.",
    "Plant 5 grew only 9 cm in 3 weeks, far behind the others.",
    "Measuring the same plants each time lets us see growth, not just differences between plants."
   ],
   "am": [
    "ተክሎቹ በየሳምንቱ በፍጥነት አድገዋል፡ 6.9, 10.1, 13.9 cm።",
    "ተክል 5 በ3 ሳምንታት 9 cm ብቻ አድጓል፣ ከሌሎቹ በጣም ወደ ኋላ።",
    "በእያንዳንዱ ጊዜ ያንኑ ተክል መለካት በተክሎች መካከል ያሉ ልዩነቶችን ብቻ ሳይሆን እድገትን እንድናይ ያደርገናል።"
   ]
  },
  "decision": {
   "en": "Check plant 5 for insects (look for holes and worms in the funnel) and dry soil; keep measuring weekly until tasselling.",
   "am": "ተክል 5ን ለነፍሳት (በፈንገሱ ውስጥ ቀዳዳዎችንና ትሎችን ፈልጉ) እና ለደረቅ አፈር ፈትሹ፤ እስኪያብብ ድረስ በየሳምንቱ መለካታችሁን ቀጥሉ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Fair shares and chance: eggs and bottle tops",
   "am": "ፍትሐዊ ድርሻና ዕድል፡ እንቁላሎችና የጠርሙስ ክዳኖች"
  },
  "goal": {
   "en": "Share eggs from five hens fairly to discover the mean, then toss a bottle top 100 times to see chance settle down.",
   "am": "ከአምስት ዶሮዎች የተገኙ እንቁላሎችን በፍትሐዊነት በማካፈል አማካይን አግኙ፤ ከዚያ ዕድል እንዴት እንደሚረጋጋ ለማየት የጠርሙስ ክዳን 100 ጊዜ ወርውሩ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Counters (stones or seeds) for eggs; a bottle top",
    "why": {
     "en": "share and toss",
     "am": "ማካፈልና መወርወር"
    },
    "get": "anywhere"
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
    "Hens laid 7, 4, 6, 3 and 5 eggs this week: put the counters in five piles.",
    "Move counters from big piles to small ones until all piles are equal: that is the fair share (the mean).",
    "Check: add all eggs and divide by 5.",
    "Toss a bottle top 100 times in pairs; record \"up\" or \"down\" each time.",
    "After every 10 tosses, work out the share of \"up\" so far."
   ],
   "am": [
    "ዶሮዎቹ በዚህ ሳምንት 7፣ 4፣ 6፣ 3 እና 5 እንቁላሎችን ጣሉ፡ ቆጣሪዎቹን በአምስት ክምሮች አስቀምጡ።",
    "ሁሉም ክምሮች እኩል እስኪሆኑ ድረስ ቆጣሪዎችን ከትላልቅ ክምሮች ወደ ትናንሽ አዛውሩ፡ ያ ፍትሐዊ ድርሻው (አማካዩ) ነው።",
    "ፈትሹ፡ ሁሉንም እንቁላሎች ደምሩና በ5 አካፍሉ።",
    "በጥንድ የጠርሙስ ክዳን 100 ጊዜ ወርውሩ፤ በእያንዳንዱ ጊዜ «ላይ» ወይም «ታች» መዝግቡ።",
    "ከእያንዳንዱ 10 ውርወራዎች በኋላ እስካሁን ያለውን የ«ላይ» ድርሻ አስሉ።"
   ]
  },
  "code": "import random\neggs = [7, 4, 6, 3, 5]; fair = sum(eggs) / len(eggs)\nprint(f\"eggs {eggs}: total {sum(eggs)}, fair share {fair:.0f} each\")\nrandom.seed(4); tosses = [random.random() < 0.35 for _ in range(100)]   # a bottle top lands \"up\" less often than \"down\"\nrunning = [sum(tosses[:n]) / n for n in range(10, 101, 10)]\nprint(\"share of 'up' after 10, 20, ... 100 tosses:\", [round(r, 2) for r in running])",
  "out": "eggs [7, 4, 6, 3, 5]: total 25, fair share 5 each\nshare of 'up' after 10, 20, ... 100 tosses: [0.5, 0.5, 0.43, 0.38, 0.38, 0.4, 0.4, 0.4, 0.4, 0.41]",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Share of \"up\" as tosses add up",
     "am": "ውርወራዎች ሲጨመሩ የ«ላይ» ድርሻ"
    },
    "x": {
     "label": {
      "en": "Tosses so far",
      "am": "እስካሁን ውርወራዎች"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Share",
      "am": "ድርሻ"
     },
     "min": 0,
     "max": 1
    },
    "series": [
     {
      "name": {
       "en": "Share up",
       "am": "የላይ ድርሻ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       10.0,
       20.0,
       30.0,
       40.0,
       50.0,
       60.0,
       70.0,
       80.0,
       90.0,
       100.0
      ],
      "y": [
       0.5,
       0.5,
       0.4333,
       0.375,
       0.38,
       0.4,
       0.4,
       0.4,
       0.4,
       0.41
      ],
      "tip": [
       "0.5|Share up · 10",
       "0.5|Share up · 20",
       "0.4333|Share up · 30",
       "0.375|Share up · 40",
       "0.38|Share up · 50",
       "0.4|Share up · 60",
       "0.4|Share up · 70",
       "0.4|Share up · 80",
       "0.4|Share up · 90",
       "0.41|Share up · 100"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Tosses so far",
       "am": "እስካሁን ውርወራዎች"
      },
      {
       "en": "Share up",
       "am": "የላይ ድርሻ"
      }
     ],
     "rows": [
      [
       10.0,
       0.5
      ],
      [
       20.0,
       0.5
      ],
      [
       30.0,
       0.433
      ],
      [
       40.0,
       0.375
      ],
      [
       50.0,
       0.38
      ],
      [
       60.0,
       0.4
      ],
      [
       70.0,
       0.4
      ],
      [
       80.0,
       0.4
      ],
      [
       90.0,
       0.4
      ],
      [
       100.0,
       0.41
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0.5,
      "label": {
       "en": "half",
       "am": "ግማሽ"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "25 eggs shared fairly among 5 hens is 5 each: the mean.",
    "After 10 tosses the share of “up” was 0.5; after 100 it settled near 0.41.",
    "A bottle top is not like a coin: it lands “up” less than half the time, and we only see that after many tosses."
   ],
   "am": [
    "25 እንቁላሎች በ5 ዶሮዎች መካከል በፍትሐዊነት ሲካፈሉ እያንዳንዳቸው 5 ናቸው፡ አማካዩ።",
    "ከ10 ውርወራዎች በኋላ የ«ላይ» ድርሻ 0.5 ነበር፤ ከ100 በኋላ በ0.41 አቅራቢያ ተረጋግቷል።",
    "የጠርሙስ ክዳን እንደ ሳንቲም አይደለም፡ ከግማሽ ያነሰ ጊዜ «ላይ» ያርፋል፤ ያንንም የምናየው ከብዙ ውርወራዎች በኋላ ብቻ ነው።"
   ]
  },
  "decision": {
   "en": "Never judge chance from a few tries: use many. Next lesson: predict how many of 50 bean seeds will sprout from the class’s sprouting test.",
   "am": "ዕድልን ከጥቂት ሙከራዎች በፍጹም አትፍረዱ፡ ብዙ ተጠቀሙ። የሚቀጥለው ትምህርት፡ ከክፍሉ የመብቀል ፈተና ከ50 የባቄላ ዘሮች ስንቱ እንደሚበቅሉ ተንብዩ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 }
];
