/* Practical labs, track s, level 2. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[2] = [
 {
  "title": {
   "en": "Goats per household: mean, median, mode and range",
   "am": "በቤተሰብ ፍየሎች፡ አማካይ፣ ሚዲያን፣ ሞድና ክልል"
  },
  "goal": {
   "en": "Survey 30 households about their goats, compute the four summaries, and see how one big herd changes the mean but not the median.",
   "am": "ስለ ፍየሎቻቸው 30 ቤተሰቦችን ጠይቁ፣ አራቱን ማጠቃለያዎች አስሉ፣ አንድ ትልቅ መንጋ አማካዩን እንዴት እንደሚቀይርና ሚዲያኑን እንደማይቀይር ተመልከቱ።"
  },
  "time": {
   "en": "1–2 weeks",
   "am": "1–2 ሳምንታት"
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
    "name": "Spreadsheet",
    "why": {
     "en": "enter and check the raw data",
     "am": "ጥሬ ዳታውን ማስገባትና መፈተሽ"
    },
    "get": "LibreOffice Calc (free) or Google Sheets"
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
    "Each student asks 2–3 neighbours: \"How many goats do you keep?\"",
    "Sort the 30 numbers from smallest to largest.",
    "Mean = total ÷ 30; median = middle value; mode = most common; range = largest − smallest.",
    "Recompute without the one very large herd.",
    "Decide which number best describes a \"typical\" household."
   ],
   "am": [
    "እያንዳንዱ ተማሪ 2–3 ጎረቤቶችን ይጠይቃል፡ «ስንት ፍየሎች ታረባለህ?»",
    "30ዎቹን ቁጥሮች ከትንሹ እስከ ትልቁ ደርድሩ።",
    "አማካይ = ድምር ÷ 30፤ ሚዲያን = መካከለኛው እሴት፤ ሞድ = በብዛት የሚገኘው፤ ክልል = ትልቁ − ትንሹ።",
    "ያለ አንዱ በጣም ትልቅ መንጋ እንደገና አስሉ።",
    "የትኛው ቁጥር «የተለመደውን» ቤተሰብ በተሻለ እንደሚገልጽ ወስኑ።"
   ]
  },
  "code": "from statistics import mean, median, mode\ngoats = [0, 2, 3, 3, 4, 1, 5, 3, 2, 6, 3, 0, 4, 2, 3, 5, 1, 3, 4, 2, 7, 3, 2, 4, 3, 1, 5, 2, 3, 60]\ns = sorted(goats)\nsummary = lambda x: (round(mean(x), 1), median(x), mode(x), max(x) - min(x))\nwith_big, without_big = summary(goats), summary(goats[:-1])\nprint(\"sorted:\", s)\nprint(\"with the 60-goat herd:    mean %s, median %s, mode %s, range %s\" % with_big)\nprint(\"without the 60-goat herd: mean %s, median %s, mode %s, range %s\" % without_big)\ncounts = {k: goats.count(k) for k in range(0, 8)}",
  "out": "sorted: [0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 6, 7, 60]\nwith the 60-goat herd:    mean 4.9, median 3.0, mode 3, range 60\nwithout the 60-goat herd: mean 3.0, median 3, mode 3, range 7",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Households by number of goats (the 60-goat herd not shown)",
     "am": "ቤተሰቦች በፍየሎች ብዛት (የ60-ፍየል መንጋው አልታየም)"
    },
    "x": {
     "label": {
      "en": "Households",
      "am": "ቤተሰቦች"
     }
    },
    "fmt": 0,
    "cats": [
     "0",
     "1",
     "2",
     "3",
     "4",
     "5",
     "6",
     "7"
    ],
    "series": [
     {
      "name": {
       "en": "Households",
       "am": "ቤተሰቦች"
      },
      "slot": 1,
      "v": [
       2.0,
       3.0,
       6.0,
       9.0,
       4.0,
       3.0,
       1.0,
       1.0
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
       "en": "Households",
       "am": "ቤተሰቦች"
      }
     ],
     "rows": [
      [
       "0",
       2.0
      ],
      [
       "1",
       3.0
      ],
      [
       "2",
       6.0
      ],
      [
       "3",
       9.0
      ],
      [
       "4",
       4.0
      ],
      [
       "5",
       3.0
      ],
      [
       "6",
       1.0
      ],
      [
       "7",
       1.0
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Summaries with and without the 60-goat herd",
     "am": "ማጠቃለያዎች ከ60-ፍየል መንጋው ጋርና ያለ እሱ"
    },
    "x": {
     "label": {
      "en": "Goats",
      "am": "ፍየሎች"
     }
    },
    "fmt": 1,
    "cats": [
     {
      "en": "Mean",
      "am": "አማካይ"
     },
     {
      "en": "Median",
      "am": "ሚዲያን"
     },
     {
      "en": "Mode",
      "am": "ሞድ"
     }
    ],
    "series": [
     {
      "name": {
       "en": "With",
       "am": "ጋር"
      },
      "slot": 2,
      "v": [
       4.9,
       3.0,
       3.0
      ]
     },
     {
      "name": {
       "en": "Without",
       "am": "ያለ"
      },
      "slot": 1,
      "v": [
       3.0,
       3.0,
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
       "en": "With",
       "am": "ጋር"
      },
      {
       "en": "Without",
       "am": "ያለ"
      }
     ],
     "rows": [
      [
       {
        "en": "Mean",
        "am": "አማካይ"
       },
       4.9,
       3.0
      ],
      [
       {
        "en": "Median",
        "am": "ሚዲያን"
       },
       3.0,
       3.0
      ],
      [
       {
        "en": "Mode",
        "am": "ሞድ"
       },
       3.0,
       3.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "With the 60-goat herd the mean is 4.9 goats; without it 3.0.",
    "The median stays at 3.0 and the mode at 3: they ignore one extreme value.",
    "The range jumps from 7 to 60, which warns us that one household is very different."
   ],
   "am": [
    "ከ60-ፍየል መንጋው ጋር አማካዩ 4.9 ፍየሎች ነው፤ ያለ እሱ 3.0።",
    "ሚዲያኑ በ3.0፣ ሞዱ በ3 ይቆያሉ፡ አንድን ጽንፈኛ እሴት ችላ ይላሉ።",
    "ክልሉ ከ7 ወደ 60 ይዘላል፤ ይህም አንድ ቤተሰብ በጣም የተለየ መሆኑን ያስጠነቅቀናል።"
   ]
  },
  "decision": {
   "en": "Report the median (3.0 goats) as the typical household, and mention the large herd separately. Use the mean only when you need the total (mean × households).",
   "am": "ሚዲያኑን (3.0 ፍየሎች) እንደ የተለመደ ቤተሰብ ዘግቡ፣ ትልቁን መንጋ ለብቻው ጥቀሱ። አማካዩን ተጠቀሙ ድምሩን (አማካይ × ቤተሰቦች) ስትፈልጉ ብቻ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Graphs that tell the truth: the cut-off axis",
   "am": "እውነትን የሚናገሩ ግራፎች፡ የተቆረጠው ዘንግ"
  },
  "goal": {
   "en": "Draw the same yields of two maize varieties twice, once from zero and once with a cut axis, measure how much the cut graph exaggerates, and choose the honest one.",
   "am": "የሁለት የበቆሎ ዝርያዎችን ያንኑ ምርት ሁለት ጊዜ ሣሉ፣ አንዴ ከዜሮ አንዴ በተቆረጠ ዘንግ፣ የተቆረጠው ግራፍ ምን ያህል እንደሚያጋንን ለኩ፣ ታማኙን ምረጡ።"
  },
  "time": {
   "en": "2 sessions of 30 min",
   "am": "2 ክፍለ ጊዜዎች፣ እያንዳንዱ 30 ደቂቃ"
  },
  "tools": [
   {
    "name": "Squared paper and ruler",
    "why": {
     "en": "draw both graphs by hand",
     "am": "ሁለቱንም ግራፎች በእጅ መሣል"
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
    "Data: variety A 2.9 t/ha, variety B 3.1 t/ha.",
    "Graph 1: bars starting at 0. Graph 2: axis starting at 2.8.",
    "Measure the bar lengths with a ruler in both graphs.",
    "Lie factor = (difference shown by the bars) ÷ (real difference).",
    "Decide which graph to put in the school report."
   ],
   "am": [
    "ዳታ፡ ዝርያ A 2.9 t/ha፣ ዝርያ B 3.1 t/ha።",
    "ግራፍ 1፡ ከ0 የሚጀምሩ አሞሌዎች። ግራፍ 2፡ ከ2.8 የሚጀምር ዘንግ።",
    "በሁለቱም ግራፎች የአሞሌዎቹን ርዝመቶች በማስመሪያ ለኩ።",
    "የውሸት መጠን = (አሞሌዎቹ የሚያሳዩት ልዩነት) ÷ (እውነተኛ ልዩነት)።",
    "በትምህርት ቤቱ ሪፖርት ውስጥ የትኛውን ግራፍ እንደምታስገቡ ወስኑ።"
   ]
  },
  "code": "a, b = 2.9, 3.1\nreal = (b - a) / a                                      # B is 6.9% higher\ndef shown(start): return ((b - start) - (a - start)) / (a - start)\nfor start in [0, 2.0, 2.5, 2.8]:\n    print(f\"axis starts at {start}: bar B looks {shown(start):.0%} longer than bar A; lie factor {shown(start) / real:.1f}\")\nlie = shown(2.8) / real",
  "out": "axis starts at 0: bar B looks 7% longer than bar A; lie factor 1.0\naxis starts at 2.0: bar B looks 22% longer than bar A; lie factor 3.2\naxis starts at 2.5: bar B looks 50% longer than bar A; lie factor 7.3\naxis starts at 2.8: bar B looks 200% longer than bar A; lie factor 29.0",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Honest: axis from zero (t/ha)",
     "am": "ታማኝ፡ ዘንግ ከዜሮ (t/ha)"
    },
    "x": {
     "label": {
      "en": "Variety A = 1, B = 2",
      "am": "ዝርያ A = 1፣ B = 2"
     },
     "int": true
    },
    "y": {
     "label": "t/ha",
     "min": 0,
     "max": 3.5
    },
    "series": [
     {
      "name": {
       "en": "Yield",
       "am": "ምርት"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0
      ],
      "y": [
       2.9,
       3.1
      ],
      "tip": [
       "2.9|Yield · 1",
       "3.1|Yield · 2"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Variety A = 1, B = 2",
       "am": "ዝርያ A = 1፣ B = 2"
      },
      {
       "en": "Yield",
       "am": "ምርት"
      }
     ],
     "rows": [
      [
       1.0,
       2.9
      ],
      [
       2.0,
       3.1
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Misleading: axis from 2.8 (t/ha)",
     "am": "አሳሳች፡ ዘንግ ከ2.8 (t/ha)"
    },
    "x": {
     "label": {
      "en": "Variety A = 1, B = 2",
      "am": "ዝርያ A = 1፣ B = 2"
     },
     "int": true
    },
    "y": {
     "label": "t/ha",
     "min": 2.8,
     "max": 3.15
    },
    "series": [
     {
      "name": {
       "en": "Yield",
       "am": "ምርት"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0
      ],
      "y": [
       2.9,
       3.1
      ],
      "tip": [
       "2.9|Yield · 1",
       "3.1|Yield · 2"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Variety A = 1, B = 2",
       "am": "ዝርያ A = 1፣ B = 2"
      },
      {
       "en": "Yield",
       "am": "ምርት"
      }
     ],
     "rows": [
      [
       1.0,
       2.9
      ],
      [
       2.0,
       3.1
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Variety B yields 6.9% more than A: a small difference.",
    "With the axis cut at 2.8, B’s bar looks 200% longer: the graph exaggerates 29 times (lie factor).",
    "Bars show size by length, so bar charts must start at zero; line charts of change over time may zoom in if the axis is clearly labelled."
   ],
   "am": [
    "ዝርያ B ከA 6.9% ብልጫ ያለው ምርት ይሰጣል፡ ትንሽ ልዩነት።",
    "ዘንጉ በ2.8 ሲቆረጥ የB አሞሌ 200% ረጅም ይመስላል፡ ግራፉ 29 እጥፍ ያጋንናል (የውሸት መጠን)።",
    "አሞሌዎች መጠንን በርዝመት ያሳያሉ፤ ስለዚህ የአሞሌ ቻርቶች ከዜሮ መጀመር አለባቸው፤ የጊዜ ለውጥ የመስመር ቻርቶች ዘንጉ በግልጽ ከተሰየመ ማቅረብ ይችላሉ።"
   ]
  },
  "decision": {
   "en": "Use the zero-based bar chart in the report and write the numbers on the bars; check every chart in newspapers and adverts for a cut axis.",
   "am": "በሪፖርቱ ውስጥ ከዜሮ የሚጀምረውን የአሞሌ ቻርት ተጠቀሙና ቁጥሮቹን በአሞሌዎቹ ላይ ጻፉ፤ በጋዜጦችና በማስታወቂያዎች ውስጥ ያለውን እያንዳንዱን ቻርት ለተቆረጠ ዘንግ ፈትሹ።"
  }
 },
 {
  "title": {
   "en": "Sampling 100 plants: random or by the road?",
   "am": "100 ተክሎችን ናሙና ማድረግ፡ በዘፈቀደ ወይስ በመንገዱ አጠገብ?"
  },
  "goal": {
   "en": "Estimate the share of diseased plants in a 2,000-plant field from 100 plants, comparing plants picked near the road with plants picked at random, many times over.",
   "am": "በ2,000-ተክል ማሳ ውስጥ ያሉ የታመሙ ተክሎችን ድርሻ ከ100 ተክሎች ገምቱ፤ በመንገዱ አጠገብ የተመረጡ ተክሎችን በዘፈቀደ ከተመረጡ ጋር ብዙ ጊዜ አወዳድሩ።"
  },
  "time": {
   "en": "1–2 weeks",
   "am": "1–2 ሳምንታት"
  },
  "tools": [
   {
    "name": "Field map with numbered rows; dice or random numbers",
    "why": {
     "en": "pick plants at random",
     "am": "ተክሎችን በዘፈቀደ መምረጥ"
    },
    "get": "squared paper, two dice"
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
    "Draw the field as 40 rows × 50 plants; the road runs along row 1.",
    "Road sample: check the first 100 plants along the road.",
    "Random sample: roll dice (or use random numbers) to pick 100 row/plant positions.",
    "Count diseased plants in each sample and compute the share.",
    "Repeat the random sample many times (the computer helps) and compare with the true share."
   ],
   "am": [
    "ማሳውን እንደ 40 ረድፎች × 50 ተክሎች ሣሉ፤ መንገዱ በረድፍ 1 በኩል ያልፋል።",
    "የመንገድ ናሙና፡ በመንገዱ አጠገብ ያሉትን የመጀመሪያዎቹን 100 ተክሎች ፈትሹ።",
    "የዘፈቀደ ናሙና፡ 100 የረድፍ/የተክል ቦታዎችን ለመምረጥ ዳይስ ጣሉ (ወይም የዘፈቀደ ቁጥሮችን ተጠቀሙ)።",
    "በእያንዳንዱ ናሙና ውስጥ የታመሙ ተክሎችን ቁጠሩና ድርሻውን አስሉ።",
    "የዘፈቀደ ናሙናውን ብዙ ጊዜ ድገሙ (ኮምፒውተሩ ይረዳል) እና ከእውነተኛው ድርሻ ጋር አወዳድሩ።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(3); rows, per_row = 40, 50\nrisk = np.linspace(0.35, 0.08, rows)[:, None]                 # dust and traffic: more disease near the road (row 0)\nfield = rng.random((rows, per_row)) < risk; true_share = field.mean()\nroad = field[:2].ravel()[:100].mean()\nrandom_est = [field.ravel()[rng.choice(rows * per_row, 100, replace=False)].mean() for _ in range(500)]\nlo, hi = np.percentile(random_est, [2.5, 97.5])\nprint(f\"true share diseased: {true_share:.1%}\"); print(f\"road sample: {road:.0%}\")\nprint(f\"random samples: average {np.mean(random_est):.1%}, 95% of them between {lo:.0%} and {hi:.0%}\")\nhist, edges = np.histogram(random_est, bins=np.arange(0.05, 0.40, 0.025))",
  "out": "true share diseased: 22.2%\nroad sample: 33%\nrandom samples: average 22.1%, 95% of them between 15% and 30%",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "500 random samples of 100 plants: estimated share diseased",
     "am": "500 የ100 ተክሎች የዘፈቀደ ናሙናዎች፡ የተገመተ የታመሙ ድርሻ"
    },
    "x": {
     "label": {
      "en": "Estimated percent diseased",
      "am": "የተገመተ የታመሙ መቶኛ"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Samples",
      "am": "ናሙናዎች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Number of samples",
       "am": "የናሙናዎች ብዛት"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       6.2,
       8.8,
       11.3,
       13.8,
       16.3,
       18.8,
       21.3,
       23.8,
       26.3,
       28.8,
       31.3,
       33.8,
       36.3
      ],
      "y": [
       0.0,
       0.0,
       3.0,
       15.0,
       37.0,
       122.0,
       93.0,
       143.0,
       51.0,
       27.0,
       7.0,
       2.0,
       0.0
      ],
      "tip": [
       "0|Number of samples · 6.2",
       "0|Number of samples · 8.8",
       "3|Number of samples · 11.3",
       "15|Number of samples · 13.8",
       "37|Number of samples · 16.3",
       "122|Number of samples · 18.8",
       "93|Number of samples · 21.3",
       "143|Number of samples · 23.8",
       "51|Number of samples · 26.3",
       "27|Number of samples · 28.8",
       "7|Number of samples · 31.3",
       "2|Number of samples · 33.8",
       "0|Number of samples · 36.3"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Estimated percent diseased",
       "am": "የተገመተ የታመሙ መቶኛ"
      },
      {
       "en": "Number of samples",
       "am": "የናሙናዎች ብዛት"
      }
     ],
     "rows": [
      [
       6.2,
       0.0
      ],
      [
       8.8,
       0.0
      ],
      [
       11.3,
       3.0
      ],
      [
       13.8,
       15.0
      ],
      [
       16.3,
       37.0
      ],
      [
       18.8,
       122.0
      ],
      [
       21.3,
       93.0
      ],
      [
       23.8,
       143.0
      ],
      [
       26.3,
       51.0
      ],
      [
       28.8,
       27.0
      ],
      [
       31.3,
       7.0
      ],
      [
       33.8,
       2.0
      ],
      [
       36.3,
       0.0
      ]
     ]
    },
    "refs": [
     {
      "kind": "v",
      "v": 22.2,
      "label": {
       "en": "true",
       "am": "እውነተኛ"
      }
     },
     {
      "kind": "v",
      "v": 33.0,
      "label": {
       "en": "road sample",
       "am": "የመንገድ ናሙና"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "The true share of diseased plants is 22%.",
    "The road sample says 33%: far too high, because disease is worst near the road.",
    "Random samples scatter around the truth (95% between 15% and 30%); they are sometimes a bit off but not always off in the same direction."
   ],
   "am": [
    "እውነተኛው የታመሙ ተክሎች ድርሻ 22% ነው።",
    "የመንገድ ናሙናው 33% ይላል፡ በጣም ከፍተኛ፣ በሽታው በመንገዱ አጠገብ የከፋ ስለሆነ።",
    "የዘፈቀደ ናሙናዎች በእውነቱ ዙሪያ ይበተናሉ (95% ከ15% እስከ 30%)፤ አንዳንዴ ትንሽ ይስታሉ ግን ሁልጊዜ በአንድ አቅጣጫ አይስቱም።"
   ]
  },
  "decision": {
   "en": "Always pick sample plants at random from the whole field (dice, random numbers or a zig-zag walk), never only the easy ones by the road.",
   "am": "የናሙና ተክሎችን ሁልጊዜ ከመላው ማሳ በዘፈቀደ ምረጡ (ዳይስ፣ የዘፈቀደ ቁጥሮች ወይም የዚግ-ዛግ ጉዞ)፤ በመንገዱ አጠገብ ያሉትን ቀላሎቹን ብቻ በፍጹም አትምረጡ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "A fair test: does compost help tomato seedlings?",
   "am": "ፍትሐዊ ፈተና፡ ኮምፖስት የቲማቲም ችግኞችን ይረዳል?"
  },
  "goal": {
   "en": "Run a fair test with 8 pots with compost and 8 without, placed at random, and decide from the difference and the spread whether compost helps.",
   "am": "ኮምፖስት ያላቸው 8 ማሰሮዎችና የሌላቸው 8 ማሰሮዎች በዘፈቀደ ተቀምጠው ፍትሐዊ ፈተና አካሂዱ፤ ከልዩነቱና ከስርጭቱ ኮምፖስት ይረዳ እንደሆነ ወስኑ።"
  },
  "time": {
   "en": "3–5 weeks",
   "am": "3–5 ሳምንታት"
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
    "name": "Compost",
    "why": {
     "en": "the treatment",
     "am": "ሕክምናው"
    },
    "get": "school compost heap"
   },
   {
    "name": "Ruler or tape measure",
    "why": {
     "en": "measure in centimetres",
     "am": "በሴንቲሜትር መለካት"
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
    "Change only one thing (compost); keep seed, pot size, water and place the same.",
    "Number 16 pots and draw lots: 8 get compost, 8 do not.",
    "Place the pots in a random order on the bench.",
    "After 4 weeks measure the height of each seedling.",
    "Compare the means and look at the spread with a dot plot."
   ],
   "am": [
    "አንድ ነገር ብቻ ቀይሩ (ኮምፖስት)፤ ዘሩን፣ የማሰሮ መጠኑን፣ ውሃውንና ቦታውን አንድ ዓይነት አድርጉ።",
    "16 ማሰሮዎችን ቁጥር ስጡና ዕጣ አውጡ፡ 8 ኮምፖስት ያገኛሉ፣ 8 አያገኙም።",
    "ማሰሮዎቹን በጠረጴዛው ላይ በዘፈቀደ ቅደም ተከተል አስቀምጡ።",
    "ከ4 ሳምንታት በኋላ የእያንዳንዱን ችግኝ ቁመት ለኩ።",
    "አማካዮቹን አወዳድሩና ስርጭቱን በነጥብ ቻርት ተመልከቱ።"
   ]
  },
  "code": "import random\nrandom.seed(7); pots = list(range(1, 17)); random.shuffle(pots)\ncompost_pots, plain_pots = sorted(pots[:8]), sorted(pots[8:])\ncompost = [21, 24, 19, 26, 23, 22, 25, 20]; plain = [17, 19, 15, 20, 18, 16, 21, 17]     # cm after 4 weeks\nmc, mp = sum(compost) / 8, sum(plain) / 8\noverlap = sum(c <= max(plain) for c in compost)\nprint(\"compost pots:\", compost_pots, \"| plain pots:\", plain_pots)\nprint(f\"mean height: compost {mc:.1f} cm, plain {mp:.1f} cm, difference {mc - mp:.1f} cm\")\nprint(f\"range: compost {min(compost)}-{max(compost)}, plain {min(plain)}-{max(plain)}; compost pots no taller than the tallest plain pot: {overlap} of 8\")",
  "out": "compost pots: [4, 5, 6, 8, 10, 12, 14, 15] | plain pots: [1, 2, 3, 7, 9, 11, 13, 16]\nmean height: compost 22.5 cm, plain 17.9 cm, difference 4.6 cm\nrange: compost 19-26, plain 15-21; compost pots no taller than the tallest plain pot: 3 of 8",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Height of every seedling after 4 weeks (cm)",
     "am": "ከ4 ሳምንታት በኋላ የእያንዳንዱ ችግኝ ቁመት (cm)"
    },
    "x": {
     "label": {
      "en": "1 = no compost, 2 = compost",
      "am": "1 = ኮምፖስት የለም፣ 2 = ኮምፖስት"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Height (cm)",
      "am": "ቁመት (cm)"
     }
    },
    "series": [
     {
      "name": {
       "en": "No compost",
       "am": "ኮምፖስት የለም"
      },
      "slot": 1,
      "kind": "points",
      "x": [
       1.0,
       1.0,
       1.0,
       1.0,
       1.0,
       1.0,
       1.0,
       1.0
      ],
      "y": [
       17.0,
       19.0,
       15.0,
       20.0,
       18.0,
       16.0,
       21.0,
       17.0
      ],
      "size": 4,
      "tip": [
       "17|x = 1",
       "19|x = 1",
       "15|x = 1",
       "20|x = 1",
       "18|x = 1",
       "16|x = 1",
       "21|x = 1",
       "17|x = 1"
      ]
     },
     {
      "name": {
       "en": "Compost",
       "am": "ኮምፖስት"
      },
      "slot": 2,
      "kind": "points",
      "x": [
       2.0,
       2.0,
       2.0,
       2.0,
       2.0,
       2.0,
       2.0,
       2.0
      ],
      "y": [
       21.0,
       24.0,
       19.0,
       26.0,
       23.0,
       22.0,
       25.0,
       20.0
      ],
      "size": 4,
      "tip": [
       "21|x = 2",
       "24|x = 2",
       "19|x = 2",
       "26|x = 2",
       "23|x = 2",
       "22|x = 2",
       "25|x = 2",
       "20|x = 2"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "1 = no compost, 2 = compost",
       "am": "1 = ኮምፖስት የለም፣ 2 = ኮምፖስት"
      },
      {
       "en": "Height (cm)",
       "am": "ቁመት (cm)"
      }
     ],
     "rows": [
      [
       1.0,
       17.0
      ],
      [
       1.0,
       19.0
      ],
      [
       1.0,
       15.0
      ],
      [
       1.0,
       20.0
      ],
      [
       1.0,
       18.0
      ],
      [
       1.0,
       16.0
      ],
      [
       1.0,
       21.0
      ],
      [
       1.0,
       17.0
      ],
      [
       2.0,
       21.0
      ],
      [
       2.0,
       24.0
      ],
      [
       2.0,
       19.0
      ],
      [
       2.0,
       26.0
      ],
      [
       2.0,
       23.0
      ],
      [
       2.0,
       22.0
      ],
      [
       2.0,
       25.0
      ],
      [
       2.0,
       20.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Compost seedlings average 22.5 cm, plain ones 17.9 cm: 4.6 cm taller.",
    "The groups overlap only a little: 3 of 8 compost pots are no taller than the tallest plain pot.",
    "Because pots were chosen by lot and placed at random, sun or shade on the bench cannot explain the difference."
   ],
   "am": [
    "የኮምፖስት ችግኞች በአማካይ 22.5 cm፣ ተራዎቹ 17.9 cm ናቸው፡ 4.6 cm ይረዝማሉ።",
    "ቡድኖቹ በጥቂቱ ብቻ ይደራረባሉ፡ ከ8 የኮምፖስት ማሰሮዎች 3 ከረጅሙ ተራ ማሰሮ አይረዝሙም።",
    "ማሰሮዎቹ በዕጣ ስለተመረጡና በዘፈቀደ ስለተቀመጡ በጠረጴዛው ላይ ያለ ፀሐይ ወይም ጥላ ልዩነቱን ሊያብራራ አይችልም።"
   ]
  },
  "decision": {
   "en": "Use compost for the school tomato seedlings. Next: test two amounts of compost to find how much is enough.",
   "am": "ለትምህርት ቤቱ የቲማቲም ችግኞች ኮምፖስት ተጠቀሙ። ቀጣይ፡ ምን ያህል በቂ እንደሆነ ለማግኘት ሁለት የኮምፖስት መጠኖችን ፈትሹ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 }
];
