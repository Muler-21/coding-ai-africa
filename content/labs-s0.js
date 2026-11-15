/* Practical labs, track s, level 0. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[0] = [
 {
  "title": {
   "en": "Counting seeds: by ones or in groups of five?",
   "am": "ዘሮችን መቁጠር፡ አንድ በአንድ ወይስ በአምስት ቡድን?"
  },
  "goal": {
   "en": "Children count the same cup of beans two ways and discover that grouping in fives gives fewer mistakes.",
   "am": "ልጆች አንድን ጽዋ ባቄላ በሁለት መንገዶች ይቆጥራሉ፤ በአምስት መቧደን ስህተቶችን እንደሚቀንስ ያገኛሉ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Cups and dry beans or maize seeds",
    "why": {
     "en": "things to count",
     "am": "የሚቆጠሩ ነገሮች"
    },
    "get": "kitchen or market"
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
    "Put 23 beans in a cup for each pair of children (the teacher knows the number).",
    "First count one by one; write the number.",
    "Then make piles of five, count the piles, add the rest.",
    "Teacher writes each pair’s two answers on the board.",
    "Count together: who was right, and with which way?"
   ],
   "am": [
    "ለእያንዳንዱ ጥንድ ልጆች በጽዋ ውስጥ 23 ባቄላዎችን አስቀምጡ (መምህሩ ቁጥሩን ያውቃል)።",
    "መጀመሪያ አንድ በአንድ ቁጠሩ፤ ቁጥሩን ጻፉ።",
    "ከዚያ የአምስት ክምሮች ሥሩ፣ ክምሮቹን ቁጠሩ፣ ቀሪውን ጨምሩ።",
    "መምህሩ የእያንዳንዱን ጥንድ ሁለት መልሶች በሰሌዳው ላይ ይጽፋል።",
    "አብራችሁ ቁጠሩ፡ ማን ትክክል ነበር፣ በየትኛው መንገድ?"
   ]
  },
  "code": "true_count = 23\nby_ones  = {\"Abebe & Sara\": 21, \"Hana & Yonas\": 23, \"Kidist & Dawit\": 25, \"Meron & Tola\": 22, \"Lily & Amanuel\": 23, \"Fikir & Nahom\": 20}\nby_fives = {\"Abebe & Sara\": 23, \"Hana & Yonas\": 23, \"Kidist & Dawit\": 23, \"Meron & Tola\": 24, \"Lily & Amanuel\": 23, \"Fikir & Nahom\": 23}\nright_ones = sum(v == true_count for v in by_ones.values()); right_fives = sum(v == true_count for v in by_fives.values())\nmiss_ones = sum(abs(v - true_count) for v in by_ones.values()); miss_fives = sum(abs(v - true_count) for v in by_fives.values())\nprint(f\"right by ones: {right_ones} of 6 pairs (total miss {miss_ones} beans)\")\nprint(f\"right in fives: {right_fives} of 6 pairs (total miss {miss_fives} beans)\")",
  "out": "right by ones: 2 of 6 pairs (total miss 8 beans)\nright in fives: 5 of 6 pairs (total miss 1 beans)",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Each pair’s count (the cup had 23 beans)",
     "am": "የእያንዳንዱ ጥንድ ቆጠራ (ጽዋው 23 ባቄላዎች ነበሩት)"
    },
    "x": {
     "label": {
      "en": "Beans counted",
      "am": "የተቆጠሩ ባቄላዎች"
     }
    },
    "fmt": 0,
    "cats": [
     "Abebe & Sara",
     "Hana & Yonas",
     "Kidist & Dawit",
     "Meron & Tola",
     "Lily & Amanuel",
     "Fikir & Nahom"
    ],
    "series": [
     {
      "name": {
       "en": "Counting by ones",
       "am": "አንድ በአንድ መቁጠር"
      },
      "slot": 2,
      "v": [
       21.0,
       23.0,
       25.0,
       22.0,
       23.0,
       20.0
      ]
     },
     {
      "name": {
       "en": "Counting in fives",
       "am": "በአምስት መቁጠር"
      },
      "slot": 1,
      "v": [
       23.0,
       23.0,
       23.0,
       24.0,
       23.0,
       23.0
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
       "en": "Counting by ones",
       "am": "አንድ በአንድ መቁጠር"
      },
      {
       "en": "Counting in fives",
       "am": "በአምስት መቁጠር"
      }
     ],
     "rows": [
      [
       "Abebe & Sara",
       21.0,
       23.0
      ],
      [
       "Hana & Yonas",
       23.0,
       23.0
      ],
      [
       "Kidist & Dawit",
       25.0,
       23.0
      ],
      [
       "Meron & Tola",
       22.0,
       24.0
      ],
      [
       "Lily & Amanuel",
       23.0,
       23.0
      ],
      [
       "Fikir & Nahom",
       20.0,
       23.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Counting one by one, 2 of 6 pairs got 23; in fives, 5 of 6 did.",
    "All mistakes together: 8 beans by ones, only 1 in fives.",
    "Piles of five are easy to see and check, so we lose our place less often."
   ],
   "am": [
    "አንድ በአንድ ሲቆጠር ከ6 ጥንዶች 2 23 አግኝተዋል፤ በአምስት ሲቆጠር 5።",
    "ሁሉም ስህተቶች በአንድ ላይ፡ አንድ በአንድ 8 ባቄላዎች፣ በአምስት ግን 1 ብቻ።",
    "የአምስት ክምሮች ለማየትና ለመፈተሽ ቀላል ናቸው፤ ስለዚህ ቦታችንን ብዙ ጊዜ አናጣም።"
   ]
  },
  "decision": {
   "en": "Class rule: when there are many things, count in groups of five. Next time count bigger cups (about 50 seeds) and eggs or bottle tops in the same way.",
   "am": "የክፍል ሕግ፡ ብዙ ነገሮች ሲኖሩ በአምስት ቡድን ቁጠሩ። በሚቀጥለው ጊዜ ትላልቅ ጽዋዎችን (ወደ 50 ዘሮች) እና እንቁላሎችን ወይም የጠርሙስ ክዳኖችን በተመሳሳይ መንገድ ቁጠሩ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Beans in the sun and in the shade: more, less or the same?",
   "am": "ባቄላ በፀሐይና በጥላ፡ ብዙ፣ ትንሽ ወይስ እኩል?"
  },
  "goal": {
   "en": "Children grow beans in sunny and shady places, count leaves after two weeks and say which group has more.",
   "am": "ልጆች ባቄላን ፀሐያማና ጥላ በሆኑ ቦታዎች ያሳድጋሉ፣ ከሁለት ሳምንታት በኋላ ቅጠሎችን ይቆጥራሉ፣ የትኛው ቡድን ብዙ እንዳለው ይናገራሉ።"
  },
  "time": {
   "en": "2–3 weeks, 20 min a day",
   "am": "2–3 ሳምንታት፣ በቀን 20 ደቂቃ"
  },
  "tools": [
   {
    "name": "Pots or cut plastic bottles, soil, bean seeds",
    "why": {
     "en": "grow the plants",
     "am": "ተክሎቹን ማሳደግ"
    },
    "get": "home, market, school garden"
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
    "Plant 2 beans in each of 10 pots, same soil and same water.",
    "Put 5 pots in the sun and 5 in the shade under a tree.",
    "Water every pot with the same cup each morning.",
    "After two weeks count the leaves on each pot; draw a leaf on the chart for each one.",
    "Compare: more, less or the same?"
   ],
   "am": [
    "በ10 ማሰሮዎች ውስጥ በእያንዳንዳቸው 2 ባቄላዎችን ዝሩ፣ ያው አፈር፣ ያው ውሃ።",
    "5 ማሰሮዎችን በፀሐይ፣ 5ን በዛፍ ሥር ጥላ አስቀምጡ።",
    "በየጠዋቱ እያንዳንዱን ማሰሮ በአንድ ዓይነት ጽዋ አጠጡ።",
    "ከሁለት ሳምንታት በኋላ በእያንዳንዱ ማሰሮ ላይ ያሉ ቅጠሎችን ቁጠሩ፤ ለእያንዳንዱ በቻርቱ ላይ ቅጠል ሣሉ።",
    "አወዳድሩ፡ ብዙ፣ ትንሽ ወይስ እኩል?"
   ]
  },
  "code": "sun = [9, 11, 10, 12, 8]; shade = [6, 5, 7, 4, 6]          # leaves per pot after two weeks\nprint(\"sun:  \", \" \".join(str(x) for x in sun), \"-> total\", sum(sun))\nprint(\"shade:\", \" \".join(str(x) for x in shade), \"-> total\", sum(shade))\nmore = \"sun\" if sum(sun) > sum(shade) else \"shade\" if sum(shade) > sum(sun) else \"the same\"\nsmallest_sun, biggest_shade = min(sun), max(shade)\nprint(f\"more leaves in: {more}; even the smallest sun pot ({smallest_sun}) beats the biggest shade pot ({biggest_shade}): {smallest_sun > biggest_shade}\")",
  "out": "sun:   9 11 10 12 8 -> total 50\nshade: 6 5 7 4 6 -> total 28\nmore leaves in: sun; even the smallest sun pot (8) beats the biggest shade pot (7): True",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Leaves on each pot after two weeks",
     "am": "ከሁለት ሳምንታት በኋላ በእያንዳንዱ ማሰሮ ላይ ያሉ ቅጠሎች"
    },
    "x": {
     "label": {
      "en": "Leaves",
      "am": "ቅጠሎች"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "Pot 1",
      "am": "ማሰሮ 1"
     },
     {
      "en": "Pot 2",
      "am": "ማሰሮ 2"
     },
     {
      "en": "Pot 3",
      "am": "ማሰሮ 3"
     },
     {
      "en": "Pot 4",
      "am": "ማሰሮ 4"
     },
     {
      "en": "Pot 5",
      "am": "ማሰሮ 5"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Sun",
       "am": "ፀሐይ"
      },
      "slot": 1,
      "v": [
       9.0,
       11.0,
       10.0,
       12.0,
       8.0
      ]
     },
     {
      "name": {
       "en": "Shade",
       "am": "ጥላ"
      },
      "slot": 2,
      "v": [
       6.0,
       5.0,
       7.0,
       4.0,
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
       "en": "Sun",
       "am": "ፀሐይ"
      },
      {
       "en": "Shade",
       "am": "ጥላ"
      }
     ],
     "rows": [
      [
       {
        "en": "Pot 1",
        "am": "ማሰሮ 1"
       },
       9.0,
       6.0
      ],
      [
       {
        "en": "Pot 2",
        "am": "ማሰሮ 2"
       },
       11.0,
       5.0
      ],
      [
       {
        "en": "Pot 3",
        "am": "ማሰሮ 3"
       },
       10.0,
       7.0
      ],
      [
       {
        "en": "Pot 4",
        "am": "ማሰሮ 4"
       },
       12.0,
       4.0
      ],
      [
       {
        "en": "Pot 5",
        "am": "ማሰሮ 5"
       },
       8.0,
       6.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Sun pots have 50 leaves together; shade pots 28.",
    "Every sun pot has more leaves than any shade pot (smallest sun 8, biggest shade 7).",
    "All pots had the same soil, seeds and water, so the place is what made the difference."
   ],
   "am": [
    "የፀሐይ ማሰሮዎች በአንድ ላይ 50 ቅጠሎች አሏቸው፤ የጥላ ማሰሮዎች 28።",
    "እያንዳንዱ የፀሐይ ማሰሮ ከማንኛውም የጥላ ማሰሮ የበለጠ ቅጠሎች አሉት (ትንሹ ፀሐይ 8፣ ትልቁ ጥላ 7)።",
    "ሁሉም ማሰሮዎች ያው አፈር፣ ዘርና ውሃ ነበራቸው፤ ስለዚህ ልዩነቱን ያመጣው ቦታው ነው።"
   ]
  },
  "decision": {
   "en": "Plant the school beans in the sunny corner. Next: does more water help in the shade? Keep everything the same except the water.",
   "am": "የትምህርት ቤቱን ባቄላ በፀሐያማው ጥግ ዝሩ። ቀጣይ፡ በጥላ ውስጥ ተጨማሪ ውሃ ይረዳል? ከውሃው በስተቀር ሁሉንም ነገር አንድ ዓይነት አድርጉ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Our weather picture chart",
   "am": "የአየር ሁኔታ የሥዕል ቻርታችን"
  },
  "goal": {
   "en": "Children record the weather every school day for four weeks with symbols, count each kind, and decide when to plant the school garden.",
   "am": "ልጆች ለአራት ሳምንታት በየትምህርት ቀኑ የአየር ሁኔታን በምልክቶች ይመዘግባሉ፣ እያንዳንዱን ዓይነት ይቆጥራሉ፣ የትምህርት ቤቱን የአትክልት ቦታ መቼ እንደሚተክሉ ይወስናሉ።"
  },
  "time": {
   "en": "4 weeks, 5 min a day",
   "am": "4 ሳምንታት፣ በቀን 5 ደቂቃ"
  },
  "tools": [
   {
    "name": "Wall chart and three symbol cards (sun, cloud, rain)",
    "why": {
     "en": "record each day",
     "am": "እያንዳንዱን ቀን መመዝገብ"
    },
    "get": "paper, crayons"
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
    "Each morning one child looks at the sky and sticks a symbol in the day’s box.",
    "At the end of each week, count each symbol.",
    "Make a picture chart: one symbol per day, in rows.",
    "Compare week 1 and week 4: are rainy days becoming more?",
    "Decide when to plant."
   ],
   "am": [
    "በየጠዋቱ አንድ ልጅ ሰማዩን አይቶ በቀኑ ሳጥን ውስጥ ምልክት ይለጥፋል።",
    "በእያንዳንዱ ሳምንት መጨረሻ እያንዳንዱን ምልክት ቁጠሩ።",
    "የሥዕል ቻርት ሥሩ፡ በቀን አንድ ምልክት፣ በረድፎች።",
    "ሳምንት 1ን እና ሳምንት 4ን አወዳድሩ፡ ዝናባማ ቀናት እየበዙ ነው?",
    "መቼ እንደምትተክሉ ወስኑ።"
   ]
  },
  "code": "weeks = {1: \"SSSCS\", 2: \"SCSCR\", 3: \"CRCRR\", 4: \"RRCRR\"}       # S = sunny, C = cloudy, R = rain\nsymbol = {\"S\": \"☀\", \"C\": \"☁\", \"R\": \"🌧\"}\ncounts = {k: [w.count(k) for w in weeks.values()] for k in \"SCR\"}\nfor w, days in weeks.items(): print(f\"week {w}: {' '.join(symbol[d] for d in days)}\")\nprint(\"sunny\", counts[\"S\"], \"cloudy\", counts[\"C\"], \"rain\", counts[\"R\"])",
  "out": "week 1: ☀ ☀ ☀ ☁ ☀\nweek 2: ☀ ☁ ☀ ☁ 🌧\nweek 3: ☁ 🌧 ☁ 🌧 🌧\nweek 4: 🌧 🌧 ☁ 🌧 🌧\nsunny [4, 2, 0, 0] cloudy [1, 2, 2, 1] rain [0, 1, 3, 4]",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Days of each weather, week by week",
     "am": "የእያንዳንዱ የአየር ሁኔታ ቀናት፣ በየሳምንቱ"
    },
    "x": {
     "label": {
      "en": "Days",
      "am": "ቀናት"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "Week 1",
      "am": "ሳምንት 1"
     },
     {
      "en": "Week 2",
      "am": "ሳምንት 2"
     },
     {
      "en": "Week 3",
      "am": "ሳምንት 3"
     },
     {
      "en": "Week 4",
      "am": "ሳምንት 4"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Sunny",
       "am": "ፀሐያማ"
      },
      "slot": 0,
      "v": [
       4.0,
       2.0,
       0.0,
       0.0
      ]
     },
     {
      "name": {
       "en": "Cloudy",
       "am": "ደመናማ"
      },
      "slot": 2,
      "v": [
       1.0,
       2.0,
       2.0,
       1.0
      ]
     },
     {
      "name": {
       "en": "Rain",
       "am": "ዝናብ"
      },
      "slot": 1,
      "v": [
       0.0,
       1.0,
       3.0,
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
       "en": "Sunny",
       "am": "ፀሐያማ"
      },
      {
       "en": "Cloudy",
       "am": "ደመናማ"
      },
      {
       "en": "Rain",
       "am": "ዝናብ"
      }
     ],
     "rows": [
      [
       {
        "en": "Week 1",
        "am": "ሳምንት 1"
       },
       4.0,
       1.0,
       0.0
      ],
      [
       {
        "en": "Week 2",
        "am": "ሳምንት 2"
       },
       2.0,
       2.0,
       1.0
      ],
      [
       {
        "en": "Week 3",
        "am": "ሳምንት 3"
       },
       0.0,
       2.0,
       3.0
      ],
      [
       {
        "en": "Week 4",
        "am": "ሳምንት 4"
       },
       0.0,
       1.0,
       4.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Rainy days went from 0 in week 1 to 4 in week 4.",
    "Sunny days went down from 4 to 0.",
    "The rainy season is starting: the ground is getting wet."
   ],
   "am": [
    "ዝናባማ ቀናት ከሳምንት 1 0 ወደ ሳምንት 4 4 ሄደዋል።",
    "ፀሐያማ ቀናት ከ4 ወደ 0 ወርደዋል።",
    "የዝናብ ወቅት እየጀመረ ነው፡ መሬቱ እየረጠበ ነው።"
   ]
  },
  "decision": {
   "en": "Plant the school garden next week, now that most days are rainy. Keep the chart going to see when the rains stop.",
   "am": "አብዛኞቹ ቀናት ዝናባማ ስለሆኑ የትምህርት ቤቱን የአትክልት ቦታ በሚቀጥለው ሳምንት ትከሉ። ዝናቡ መቼ እንደሚቆም ለማየት ቻርቱን ቀጥሉ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 }
];
