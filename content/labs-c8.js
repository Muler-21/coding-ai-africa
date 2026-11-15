/* Practical labs, track c, level 8. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[8] = [
 {
  "title": {
   "en": "A one-month agent pilot: keep, change or stop?",
   "am": "የአንድ ወር የagent ሙከራ፡ ማቆየት፣ መቀየር ወይስ ማቆም?"
  },
  "goal": {
   "en": "Analyse a month of logs from an agent that drafts weekly market reports: time saved, review time, error rate and severity, and decide whether to expand it.",
   "am": "ሳምንታዊ የገበያ ሪፖርቶችን የሚያረቅቅ agent የአንድ ወር መዝገቦችን ተንትን፡ የተቆጠበ ጊዜ፣ የግምገማ ጊዜ፣ የስህተት መጠንና ክብደት፤ ማስፋት እንዳለብህ ወስን።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "pandas",
    "why": {
     "en": "tables: load, clean and summarise data",
     "am": "ሰንጠረዦች፡ ዳታን መጫን፣ ማጽዳትና ማጠቃለል"
    },
    "get": "pip install pandas"
   },
   {
    "name": "Spreadsheet",
    "why": {
     "en": "enter and check the raw data",
     "am": "ጥሬ ዳታውን ማስገባትና መፈተሽ"
    },
    "get": "LibreOffice Calc (free) or Google Sheets"
   }
  ],
  "steps": {
   "en": [
    "Log every task: date, minutes the task used to take, minutes spent reviewing, errors found and their severity.",
    "Net time saved = old time − review time − fixing time.",
    "Plot errors per day and cumulative hours saved.",
    "Check whether errors fall as prompts and checks improve.",
    "Decide with a rule set before the pilot: keep if net saving > 30% and no severe error in the last 2 weeks."
   ],
   "am": [
    "እያንዳንዱን ተግባር መዝግብ፡ ቀን፣ ተግባሩ ቀድሞ ይወስድ የነበረው ደቂቃ፣ በግምገማ የወጣ ደቂቃ፣ የተገኙ ስህተቶችና ክብደታቸው።",
    "የተጣራ የተቆጠበ ጊዜ = የድሮ ጊዜ − የግምገማ ጊዜ − የማስተካከያ ጊዜ።",
    "በቀን ስህተቶችንና የተጠራቀሙ የተቆጠቡ ሰዓታትን ቻርት አድርግ።",
    "prompts እና ፍተሻዎች ሲሻሻሉ ስህተቶች እየቀነሱ እንደሆነ ፈትሽ።",
    "ከሙከራው በፊት በተቀመጠ ሕግ ወስን፡ የተጣራ ቁጠባ > 30% ከሆነና ባለፉት 2 ሳምንታት ከባድ ስህተት ከሌለ አቆይ።"
   ]
  },
  "code": "import numpy as np, pandas as pd\nrng = np.random.default_rng(3); days = np.arange(1, 21)                                    # 20 working days\nlog = pd.DataFrame({\"day\": days, \"old_min\": rng.normal(90, 10, 20).round(), \"review_min\": np.linspace(35, 18, 20).round() + rng.integers(-3, 4, 20),\n                    \"errors\": rng.poisson(np.linspace(3, 0.8, 20)), \"severe\": [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})\nlog[\"fix_min\"] = log.errors * 4 + log.severe * 20\nlog[\"saved_min\"] = log.old_min - log.review_min - log.fix_min\nnet = log.saved_min.sum() / log.old_min.sum(); late_severe = int(log.severe[log.day > 10].sum())\nfirst, last = log.errors[:5].mean(), log.errors[-5:].mean()\nprint(f\"net time saved {log.saved_min.sum() / 60:.1f} h of {log.old_min.sum() / 60:.1f} h ({net:.0%}); errors per day {first:.1f} -> {last:.1f}; severe errors in last 2 weeks: {late_severe}\")",
  "out": "net time saved 17.2 h of 29.5 h (58%); errors per day 3.4 -> 1.6; severe errors in last 2 weeks: 0",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Errors found per day",
     "am": "በቀን የተገኙ ስህተቶች"
    },
    "x": {
     "label": {
      "en": "Working day",
      "am": "የሥራ ቀን"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Errors",
      "am": "ስህተቶች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Errors",
       "am": "ስህተቶች"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0,
       4.0,
       5.0,
       6.0,
       7.0,
       8.0,
       9.0,
       10.0,
       11.0,
       12.0,
       13.0,
       14.0,
       15.0,
       16.0,
       17.0,
       18.0,
       19.0,
       20.0
      ],
      "y": [
       1.0,
       4.0,
       5.0,
       4.0,
       3.0,
       3.0,
       3.0,
       2.0,
       2.0,
       2.0,
       5.0,
       1.0,
       0.0,
       0.0,
       1.0,
       1.0,
       3.0,
       2.0,
       1.0,
       1.0
      ],
      "tip": [
       "1|Errors · 1",
       "4|Errors · 2",
       "5|Errors · 3",
       "4|Errors · 4",
       "3|Errors · 5",
       "3|Errors · 6",
       "3|Errors · 7",
       "2|Errors · 8",
       "2|Errors · 9",
       "2|Errors · 10",
       "5|Errors · 11",
       "1|Errors · 12",
       "0|Errors · 13",
       "0|Errors · 14",
       "1|Errors · 15",
       "1|Errors · 16",
       "3|Errors · 17",
       "2|Errors · 18",
       "1|Errors · 19",
       "1|Errors · 20"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Working day",
       "am": "የሥራ ቀን"
      },
      {
       "en": "Errors",
       "am": "ስህተቶች"
      }
     ],
     "rows": [
      [
       1.0,
       1.0
      ],
      [
       2.0,
       4.0
      ],
      [
       3.0,
       5.0
      ],
      [
       4.0,
       4.0
      ],
      [
       5.0,
       3.0
      ],
      [
       6.0,
       3.0
      ],
      [
       7.0,
       3.0
      ],
      [
       8.0,
       2.0
      ],
      [
       9.0,
       2.0
      ],
      [
       10.0,
       2.0
      ],
      [
       11.0,
       5.0
      ],
      [
       12.0,
       1.0
      ],
      [
       13.0,
       0.0
      ],
      [
       14.0,
       0.0
      ],
      [
       15.0,
       1.0
      ],
      [
       16.0,
       1.0
      ],
      [
       17.0,
       3.0
      ],
      [
       18.0,
       2.0
      ],
      [
       19.0,
       1.0
      ],
      [
       20.0,
       1.0
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Cumulative hours saved (after review and fixes)",
     "am": "የተጠራቀሙ የተቆጠቡ ሰዓታት (ከግምገማና ማስተካከያ በኋላ)"
    },
    "x": {
     "label": {
      "en": "Working day",
      "am": "የሥራ ቀን"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Hours",
      "am": "ሰዓታት"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Hours",
       "am": "ሰዓታት"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0,
       4.0,
       5.0,
       6.0,
       7.0,
       8.0,
       9.0,
       10.0,
       11.0,
       12.0,
       13.0,
       14.0,
       15.0,
       16.0,
       17.0,
       18.0,
       19.0,
       20.0
      ],
      "y": [
       1.1333,
       1.0833,
       1.8167,
       2.3667,
       2.6833,
       3.45,
       3.9667,
       4.8333,
       5.6333,
       7.05,
       7.8,
       8.7333,
       9.8167,
       10.8167,
       11.7333,
       12.7,
       13.7333,
       14.7833,
       16.1,
       17.1833
      ],
      "tip": [
       "1.133|Hours · 1",
       "1.083|Hours · 2",
       "1.817|Hours · 3",
       "2.367|Hours · 4",
       "2.683|Hours · 5",
       "3.45|Hours · 6",
       "3.967|Hours · 7",
       "4.833|Hours · 8",
       "5.633|Hours · 9",
       "7.05|Hours · 10",
       "7.8|Hours · 11",
       "8.733|Hours · 12",
       "9.817|Hours · 13",
       "10.82|Hours · 14",
       "11.73|Hours · 15",
       "12.7|Hours · 16",
       "13.73|Hours · 17",
       "14.78|Hours · 18",
       "16.1|Hours · 19",
       "17.18|Hours · 20"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Working day",
       "am": "የሥራ ቀን"
      },
      {
       "en": "Hours",
       "am": "ሰዓታት"
      }
     ],
     "rows": [
      [
       1.0,
       1.133
      ],
      [
       2.0,
       1.083
      ],
      [
       3.0,
       1.817
      ],
      [
       4.0,
       2.367
      ],
      [
       5.0,
       2.683
      ],
      [
       6.0,
       3.45
      ],
      [
       7.0,
       3.967
      ],
      [
       8.0,
       4.833
      ],
      [
       9.0,
       5.633
      ],
      [
       10.0,
       7.05
      ],
      [
       11.0,
       7.8
      ],
      [
       12.0,
       8.733
      ],
      [
       13.0,
       9.817
      ],
      [
       14.0,
       10.817
      ],
      [
       15.0,
       11.733
      ],
      [
       16.0,
       12.7
      ],
      [
       17.0,
       13.733
      ],
      [
       18.0,
       14.783
      ],
      [
       19.0,
       16.1
      ],
      [
       20.0,
       17.183
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "After review and fixes the agent saved 58% of the time the reports used to take.",
    "Errors fell from 3.4 to 1.6 per day as checks were added.",
    "Both severe errors happened in week 1; there were 0 in the last two weeks."
   ],
   "am": [
    "ከግምገማና ማስተካከያ በኋላ agentኡ ሪፖርቶቹ ይወስዱት ከነበረው ጊዜ 58%ን አትርፏል።",
    "ፍተሻዎች ሲጨመሩ ስህተቶች በቀን ከ3.4 ወደ 1.6 ወርደዋል።",
    "ሁለቱም ከባድ ስህተቶች በሳምንት 1 ተከስተዋል፤ ባለፉት ሁለት ሳምንታት 0 ነበሩ።"
   ]
  },
  "decision": {
   "en": "Keep the agent (both pre-set conditions are met) and expand it to one more report type; keep human review of every report that goes outside the team.",
   "am": "agentኡን አቆይ (ሁለቱም አስቀድመው የተቀመጡ ሁኔታዎች ተሟልተዋል)፣ ወደ አንድ ተጨማሪ የሪፖርት ዓይነትም አስፋው፤ ከቡድኑ ውጭ የሚሄድ እያንዳንዱን ሪፖርት የሰው ግምገማ አቆይ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Is an AI method worth adding to a breeding programme?",
   "am": "የAI ዘዴ ወደ እርባታ ፕሮግራም መጨመሩ ያዋጣል?"
  },
  "goal": {
   "en": "Compare the genetic gain and its value from the current genomic model (accuracy 0.45) and an AI model (0.55, extra cost), including the risk that the gain does not appear.",
   "am": "ከአሁኑ genomic ሞዴል (accuracy 0.45) እና ከAI ሞዴል (0.55፣ ተጨማሪ ወጪ) የሚገኘውን የዘረመል ትርፍና ዋጋውን አወዳድር፣ ትርፉ ያለመታየት ስጋትንም ጨምሮ።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "NumPy",
    "why": {
     "en": "fast maths on arrays",
     "am": "በarrays ላይ ፈጣን ሒሳብ"
    },
    "get": "pip install numpy"
   },
   {
    "name": "Spreadsheet",
    "why": {
     "en": "enter and check the raw data",
     "am": "ጥሬ ዳታውን ማስገባትና መፈተሽ"
    },
    "get": "LibreOffice Calc (free) or Google Sheets"
   }
  ],
  "steps": {
   "en": [
    "Breeder’s equation: gain per year = i × accuracy × σA / L.",
    "Values: top 10% selected (i = 1.75), σA = 400 kg milk, generation interval 5 years.",
    "Value of 1 kg milk gain in all daughters across the herd per year.",
    "Simulate uncertainty: the AI accuracy might be 0.47–0.60 on local cows.",
    "Compare expected net value over 10 years and the chance it is negative."
   ],
   "am": [
    "የአርቢው እኩልታ፡ በዓመት ትርፍ = i × accuracy × σA / L።",
    "እሴቶች፡ ከፍተኛ 10% ተመርጠዋል (i = 1.75)፣ σA = 400 kg ወተት፣ የትውልድ ልዩነት 5 ዓመታት።",
    "በመንጋው ውስጥ ባሉ ሁሉም ሴት ልጆች በዓመት የ1 kg የወተት ትርፍ ዋጋ።",
    "እርግጠኛ አለመሆንን አስመስል፡ የAI accuracy በአካባቢያዊ ላሞች ላይ 0.47–0.60 ሊሆን ይችላል።",
    "በ10 ዓመታት የሚጠበቀውን የተጣራ ዋጋና አሉታዊ የመሆን ዕድሉን አወዳድር።"
   ]
  },
  "code": "import numpy as np\ni, sigma_a, L, cows, birr_per_kg = 1.75, 400, 5, 20000, 25\ngain = lambda acc: i * acc * sigma_a / L                                  # kg milk per cow per year\nyears = np.arange(1, 11)\ndef value(acc, extra_cost):\n    cum = gain(acc) * years * cows * birr_per_kg * 0.5                     # half the herd are daughters of selected bulls\n    return cum.sum() / 1e6 - extra_cost * len(years)                       # million birr over 10 years\nbase = value(0.45, 0)\nrng = np.random.default_rng(0); acc_ai = rng.uniform(0.47, 0.60, 10000)\nextra = gain(acc_ai)[:, None] * 0 + 0                                      # placeholder for clarity\nnet = np.array([value(a, 6.0) for a in acc_ai]) - base                     # AI costs 6 million birr per year more\nprint(f\"gain per year: current {gain(0.45):.1f} kg, AI {gain(0.55):.1f} kg per cow\")\nprint(f\"extra value of AI over 10 years: mean {net.mean():.0f} M birr, 90% range {np.percentile(net, 5):.0f} to {np.percentile(net, 95):.0f}; chance it loses money {np.mean(net < 0):.0%}\")\nbreakeven = 0.45 + 6.0 * 10 / (i * sigma_a / L * years.sum() * cows * birr_per_kg * 0.5 / 1e6)\nprint(f\"break-even AI accuracy: {breakeven:.3f}\")\nhist, edges = np.histogram(net, bins=12)",
  "out": "gain per year: current 63.0 kg, AI 77.0 kg per cow\nextra value of AI over 10 years: mean 103 M birr, 90% range -9 to 216; chance it loses money 9%\nbreak-even AI accuracy: 0.481",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Extra 10-year value of the AI model: distribution (million birr)",
     "am": "የAI ሞዴሉ ተጨማሪ የ10-ዓመት ዋጋ፡ ስርጭት (ሚሊዮን ብር)"
    },
    "x": {
     "label": {
      "en": "Million birr",
      "am": "ሚሊዮን ብር"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Number of simulations",
      "am": "የማስመሰሎች ብዛት"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Simulations",
       "am": "ማስመሰሎች"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       -11.047,
       9.8048,
       30.6566,
       51.5085,
       72.3603,
       93.2122,
       114.064,
       134.9159,
       155.7677,
       176.6196,
       197.4714,
       218.3233
      ],
      "y": [
       859.0,
       847.0,
       818.0,
       816.0,
       834.0,
       818.0,
       850.0,
       808.0,
       845.0,
       858.0,
       838.0,
       809.0
      ],
      "tip": [
       "859|Simulations · -11.047",
       "847|Simulations · 9.8048",
       "818|Simulations · 30.6566",
       "816|Simulations · 51.5085",
       "834|Simulations · 72.3603",
       "818|Simulations · 93.2122",
       "850|Simulations · 114.064",
       "808|Simulations · 134.916",
       "845|Simulations · 155.768",
       "858|Simulations · 176.62",
       "838|Simulations · 197.471",
       "809|Simulations · 218.323"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Million birr",
       "am": "ሚሊዮን ብር"
      },
      {
       "en": "Simulations",
       "am": "ማስመሰሎች"
      }
     ],
     "rows": [
      [
       -11.047,
       859.0
      ],
      [
       9.8048,
       847.0
      ],
      [
       30.6566,
       818.0
      ],
      [
       51.5085,
       816.0
      ],
      [
       72.3603,
       834.0
      ],
      [
       93.2122,
       818.0
      ],
      [
       114.064,
       850.0
      ],
      [
       134.9159,
       808.0
      ],
      [
       155.7677,
       845.0
      ],
      [
       176.6196,
       858.0
      ],
      [
       197.4714,
       838.0
      ],
      [
       218.3233,
       809.0
      ]
     ]
    },
    "refs": [
     {
      "kind": "v",
      "v": 0,
      "label": {
       "en": "break-even",
       "am": "ሚዛን"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "Raising accuracy from 0.45 to 0.55 raises the gain from 63.0 to 77.0 kg of milk per cow per year.",
    "Over 10 years the AI model adds on average 103 million birr after its extra cost; it loses money in 9% of simulations.",
    "It pays off only if local accuracy is above 0.481: that is the number to verify first."
   ],
   "am": [
    "accuracyን ከ0.45 ወደ 0.55 ማሳደግ ትርፉን በላም በዓመት ከ63.0 ወደ 77.0 kg ወተት ያሳድጋል።",
    "በ10 ዓመታት የAI ሞዴሉ ከተጨማሪ ወጪው በኋላ በአማካይ 103 ሚሊዮን ብር ይጨምራል፤ በ9% ማስመሰሎች ገንዘብ ያከስራል።",
    "የሚያዋጣው የአካባቢ accuracy ከ0.481 በላይ ከሆነ ብቻ ነው፡ መጀመሪያ መረጋገጥ ያለበት ቁጥር ይህ ነው።"
   ]
  },
  "decision": {
   "en": "Run a one-year validation on local cows; adopt the AI model only if its accuracy there exceeds 0.48 with a confidence interval that clears it.",
   "am": "በአካባቢያዊ ላሞች ላይ የአንድ ዓመት ማረጋገጫ አካሂድ፤ የAI ሞዴሉን የምትቀበለው እዚያ ያለው accuracy ከ0.48 በላይ ሆኖ confidence intervalኡም ከሱ በላይ ሲሆን ብቻ ነው።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Designing an AI advice service: channel, price and pilot",
   "am": "የAI ምክር አገልግሎትን መንደፍ፡ መንገድ፣ ዋጋና ሙከራ"
  },
  "goal": {
   "en": "Compare voice calls, SMS and a smartphone app for crop advice to 5,000 farmers on reach, adoption and cost, find the break-even price, and plan the 3-month pilot.",
   "am": "ለ5,000 ገበሬዎች የሰብል ምክርን በድምፅ ጥሪዎች፣ በSMS እና በስማርትፎን መተግበሪያ በተደራሽነት፣ በተቀባይነትና በወጪ አወዳድር፤ የሚዛን ዋጋውን ፈልግ፣ የ3-ወር ሙከራውንም አቅድ።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "pandas",
    "why": {
     "en": "tables: load, clean and summarise data",
     "am": "ሰንጠረዦች፡ ዳታን መጫን፣ ማጽዳትና ማጠቃለል"
    },
    "get": "pip install pandas"
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
    "name": "Interviews with 20 farmers",
    "why": {
     "en": "test the problem and the price before building",
     "am": "ከመገንባትህ በፊት ችግሩንና ዋጋውን መፈተሽ"
    },
    "get": "a notebook and the local language"
   }
  ],
  "steps": {
   "en": [
    "For each channel estimate: share of farmers who can receive it, share who act on advice, fixed and per-farmer monthly cost.",
    "Active users = farmers × reach × adoption.",
    "Cost per active user and break-even monthly price.",
    "Pick a channel and price; check them in farmer interviews.",
    "Pilot: 300 farmers, 3 months, measure use, payment and yield change against a comparison group."
   ],
   "am": [
    "ለእያንዳንዱ መንገድ ገምት፡ ሊቀበሉት የሚችሉ ገበሬዎች ድርሻ፣ በምክሩ የሚሠሩ ድርሻ፣ ቋሚና በገበሬ ወርሃዊ ወጪ።",
    "ንቁ ተጠቃሚዎች = ገበሬዎች × ተደራሽነት × ተቀባይነት።",
    "በንቁ ተጠቃሚ ወጪና የሚዛን ወርሃዊ ዋጋ።",
    "መንገድና ዋጋ ምረጥ፤ በገበሬ ቃለ መጠይቆች ፈትሻቸው።",
    "ሙከራ፡ 300 ገበሬዎች፣ 3 ወራት፣ አጠቃቀምን፣ ክፍያንና የምርት ለውጥን ከንጽጽር ቡድን አንፃር ለካ።"
   ]
  },
  "code": "import pandas as pd\nfarmers = 5000\nch = pd.DataFrame({\"reach\": [0.95, 0.85, 0.25], \"adoption\": [0.45, 0.30, 0.50],\n                   \"fixed_birr\": [40000, 15000, 120000], \"per_user_birr\": [6, 4, 4]}, index=[\"voice call\", \"SMS\", \"smartphone app\"])   # monthly\nch[\"active_users\"] = (farmers * ch.reach * ch.adoption).round()\nch[\"monthly_cost\"] = ch.fixed_birr + ch.per_user_birr * farmers * ch.reach\nch[\"cost_per_active\"] = (ch.monthly_cost / ch.active_users).round(1)\nprint(ch[[\"active_users\", \"monthly_cost\", \"cost_per_active\"]].to_string())\nbest = ch.cost_per_active.idxmin(); most = ch.active_users.idxmax()\nwilling = 40                                                                    # birr per month, from interviews\nviable = ch[ch.cost_per_active < willing]; pick = viable.active_users.idxmax()\nprint(f\"lowest cost per active farmer: {best}; most active farmers: {most}; farmers said they would pay about {willing} birr/month -> pick {pick}\")",
  "out": "                active_users  monthly_cost  cost_per_active\nvoice call            2138.0       68500.0             32.0\nSMS                   1275.0       32000.0             25.1\nsmartphone app         625.0      125000.0            200.0\nlowest cost per active farmer: SMS; most active farmers: voice call; farmers said they would pay about 40 birr/month -> pick voice call",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Active farmers reached (of 5,000)",
     "am": "የደረሱ ንቁ ገበሬዎች (ከ5,000)"
    },
    "x": {
     "label": {
      "en": "Farmers",
      "am": "ገበሬዎች"
     }
    },
    "fmt": 0,
    "cats": [
     "voice call",
     "SMS",
     "smartphone app"
    ],
    "series": [
     {
      "name": {
       "en": "Farmers",
       "am": "ገበሬዎች"
      },
      "slot": 1,
      "v": [
       2138.0,
       1275.0,
       625.0
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
       "en": "Farmers",
       "am": "ገበሬዎች"
      }
     ],
     "rows": [
      [
       "voice call",
       2138.0
      ],
      [
       "SMS",
       1275.0
      ],
      [
       "smartphone app",
       625.0
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Monthly cost per active farmer (birr)",
     "am": "በንቁ ገበሬ ወርሃዊ ወጪ (ብር)"
    },
    "x": {
     "label": {
      "en": "Birr per month",
      "am": "ብር በወር"
     }
    },
    "fmt": 1,
    "cats": [
     "voice call",
     "SMS",
     "smartphone app"
    ],
    "series": [
     {
      "name": {
       "en": "Birr",
       "am": "ብር"
      },
      "slot": 2,
      "v": [
       32.0,
       25.1,
       200.0
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
       "en": "Birr",
       "am": "ብር"
      }
     ],
     "rows": [
      [
       "voice call",
       32.0
      ],
      [
       "SMS",
       25.1
      ],
      [
       "smartphone app",
       200.0
      ]
     ]
    },
    "note": {
     "en": "Farmers said they would pay about 40 birr a month.",
     "am": "ገበሬዎች በወር ወደ 40 ብር እንደሚከፍሉ ተናግረዋል።"
    }
   }
  ],
  "analysis": {
   "en": [
    "Voice reaches the most active farmers (2,138) because almost everyone has a basic phone and listening is easier than reading.",
    "SMS is cheapest per active farmer (25 birr) but fewer act on text.",
    "The app costs 200 birr per active farmer: too few smartphones yet."
   ],
   "am": [
    "ድምፅ ብዙ ንቁ ገበሬዎችን ይደርሳል (2,138)፣ ሁሉም ማለት ይቻላል መሠረታዊ ስልክ ስላለውና ማዳመጥ ከማንበብ ስለሚቀል።",
    "SMS በንቁ ገበሬ በጣም ርካሹ ነው (25 ብር) ግን በጽሑፍ የሚሠሩ ጥቂት ናቸው።",
    "መተግበሪያው በንቁ ገበሬ 200 ብር ያስወጣል፡ ገና ስማርትፎኖች በጣም ጥቂት ናቸው።"
   ]
  },
  "decision": {
   "en": "Pilot voice call advice at 40 birr a month (cost 32 birr per active farmer) with 300 farmers for 3 months; continue only if at least 40% pay in month 3.",
   "am": "የvoice call ምክርን በወር 40 ብር (በንቁ ገበሬ 32 ብር ወጪ) ከ300 ገበሬዎች ጋር ለ3 ወራት ሞክር፤ በወር 3 ቢያንስ 40% ከከፈሉ ብቻ ቀጥል።"
  },
  "note": {
   "en": "Illustrative assumptions; replace them with prices from your telecom operator and answers from your interviews.",
   "am": "ለማሳያ ግምቶች፤ ከቴሌኮም ኦፕሬተርህ በሚገኙ ዋጋዎችና ከቃለ መጠይቆችህ በሚገኙ መልሶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "A weeding robot: speed, accuracy and local cost",
   "am": "የአረም ማረሚያ ሮቦት፡ ፍጥነት፣ ትክክለኛነትና የአካባቢ ወጪ"
  },
  "goal": {
   "en": "Simulate a camera robot that weeds a teff or maize row, find the speed that balances weeds removed against crops damaged, and compare its cost with hand weeding.",
   "am": "የጤፍ ወይም የበቆሎ ረድፍን የሚያርም የካሜራ ሮቦትን አስመስል፣ የተወገዱ አረሞችንና የተጎዱ ሰብሎችን የሚያመጣጥን ፍጥነትን ፈልግ፣ ወጪውን ከእጅ አረም ጋር አወዳድር።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "NumPy",
    "why": {
     "en": "fast maths on arrays",
     "am": "በarrays ላይ ፈጣን ሒሳብ"
    },
    "get": "pip install numpy"
   },
   {
    "name": "Arduino or Raspberry Pi + camera",
    "why": {
     "en": "the robot’s brain and eyes",
     "am": "የሮቦቱ አንጎልና ዓይኖች"
    },
    "get": "local electronics markets"
   },
   {
    "name": "An open detection model (e.g. YOLO)",
    "why": {
     "en": "tell weeds from crops",
     "am": "አረሞችን ከሰብሎች መለየት"
    },
    "get": "github.com/ultralytics"
   }
  ],
  "steps": {
   "en": [
    "Model detection: accuracy falls as speed rises (less time per frame).",
    "Simulate 1,000 plants per speed (30% weeds): remove what is detected as weed.",
    "Count weeds removed and crops damaged for speeds 0.1–0.8 m/s.",
    "Bill of materials from local parts; hours per hectare.",
    "Compare cost per hectare with hand weeding over 3 seasons."
   ],
   "am": [
    "detectionን ሞዴል አድርግ፡ ፍጥነት ሲጨምር accuracy ይቀንሳል (በframe ያነሰ ጊዜ)።",
    "በፍጥነት 1,000 ተክሎችን አስመስል (30% አረም)፡ እንደ አረም የተለየውን አስወግድ።",
    "ለ0.1–0.8 m/s ፍጥነቶች የተወገዱ አረሞችንና የተጎዱ ሰብሎችን ቁጠር።",
    "ከአካባቢ ክፍሎች የቁሳቁስ ዝርዝር፤ በሄክታር ሰዓታት።",
    "በ3 ወቅቶች በሄክታር ወጪን ከእጅ አረም ጋር አወዳድር።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(4); speeds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8]                 # metres per second\nremoved, damaged = [], []\nfor v in speeds:\n    acc = 0.98 - 0.12 * v ** 2                                    # detection accuracy falls with speed\n    weed = rng.random(1000) < 0.3; correct = rng.random(1000) < acc\n    called_weed = np.where(correct, weed, ~weed)\n    removed.append(np.mean(called_weed[weed])); damaged.append(np.mean(called_weed[~weed]))\n    print(f\"{v:.1f} m/s: weeds removed {removed[-1]:.0%}, crops damaged {damaged[-1]:.1%}\")\nok = [v for v, d, r in zip(speeds, damaged, removed) if d <= 0.05 and r >= 0.85]; best = max(ok)\nbom = {\"Raspberry Pi + camera\": 9000, \"motors and driver\": 6000, \"battery + solar panel\": 7000, \"frame (local welding)\": 4000, \"weeding tool\": 2000}\nrows_m = 10000 / 0.4; hours_ha = rows_m / best / 3600 * 1.3                                   # 40 cm rows, 30% turning time\nha_season = int(500 / hours_ha)                                                                # 500 working hours a season\nrobot_ha = sum(bom.values()) / (3 * ha_season) + 150                                           # parts spread over 3 seasons + upkeep\nhand_ha = 25 * 120                                                                             # 25 person-days at 120 birr\nprint(f\"chosen speed {best} m/s; {hours_ha:.0f} h per hectare; robot {robot_ha:,.0f} birr/ha vs hand weeding {hand_ha:,} birr/ha; parts {sum(bom.values()):,} birr\")",
  "out": "0.1 m/s: weeds removed 99%, crops damaged 1.5%\n0.2 m/s: weeds removed 98%, crops damaged 2.9%\n0.3 m/s: weeds removed 98%, crops damaged 3.8%\n0.4 m/s: weeds removed 97%, crops damaged 4.0%\n0.5 m/s: weeds removed 95%, crops damaged 4.4%\n0.6 m/s: weeds removed 94%, crops damaged 6.9%\n0.8 m/s: weeds removed 93%, crops damaged 8.6%\nchosen speed 0.5 m/s; 18 h per hectare; robot 496 birr/ha vs hand weeding 3,000 birr/ha; parts 28,000 birr",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Weeding quality vs robot speed",
     "am": "የአረም ጥራት vs የሮቦት ፍጥነት"
    },
    "x": {
     "label": {
      "en": "Speed (m/s)",
      "am": "ፍጥነት (m/s)"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Percent",
      "am": "መቶኛ"
     },
     "min": 0,
     "max": 100
    },
    "series": [
     {
      "name": {
       "en": "Weeds removed",
       "am": "የተወገዱ አረሞች"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       0.1,
       0.2,
       0.3,
       0.4,
       0.5,
       0.6,
       0.8
      ],
      "y": [
       98.556,
       97.6898,
       97.619,
       97.2881,
       94.964,
       94.1558,
       92.9664
      ],
      "tip": [
       "98.56|Weeds removed · 0.1",
       "97.69|Weeds removed · 0.2",
       "97.62|Weeds removed · 0.3",
       "97.29|Weeds removed · 0.4",
       "94.96|Weeds removed · 0.5",
       "94.16|Weeds removed · 0.6",
       "92.97|Weeds removed · 0.8"
      ],
      "endlabel": {
       "en": "Weeds removed",
       "am": "የተወገዱ አረሞች"
      }
     },
     {
      "name": {
       "en": "Crops damaged",
       "am": "የተጎዱ ሰብሎች"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       0.1,
       0.2,
       0.3,
       0.4,
       0.5,
       0.6,
       0.8
      ],
      "y": [
       1.5214,
       2.8694,
       3.7651,
       3.9716,
       4.4321,
       6.9364,
       8.6181
      ],
      "tip": [
       "1.521|Crops damaged · 0.1",
       "2.869|Crops damaged · 0.2",
       "3.765|Crops damaged · 0.3",
       "3.972|Crops damaged · 0.4",
       "4.432|Crops damaged · 0.5",
       "6.936|Crops damaged · 0.6",
       "8.618|Crops damaged · 0.8"
      ],
      "endlabel": {
       "en": "Crops damaged",
       "am": "የተጎዱ ሰብሎች"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Speed (m/s)",
       "am": "ፍጥነት (m/s)"
      },
      {
       "en": "Weeds removed",
       "am": "የተወገዱ አረሞች"
      },
      {
       "en": "Crops damaged",
       "am": "የተጎዱ ሰብሎች"
      }
     ],
     "rows": [
      [
       0.1,
       98.556,
       1.521
      ],
      [
       0.2,
       97.69,
       2.869
      ],
      [
       0.3,
       97.619,
       3.765
      ],
      [
       0.4,
       97.288,
       3.972
      ],
      [
       0.5,
       94.964,
       4.432
      ],
      [
       0.6,
       94.156,
       6.936
      ],
      [
       0.8,
       92.966,
       8.618
      ]
     ]
    },
    "refs": [
     {
      "kind": "v",
      "v": 0.5,
      "label": {
       "en": "chosen",
       "am": "የተመረጠ"
      }
     }
    ],
    "rpad": 90
   },
   {
    "type": "seg",
    "title": {
     "en": "Robot parts (birr)",
     "am": "የሮቦት ክፍሎች (ብር)"
    },
    "unit": {
     "en": "birr",
     "am": "ብር"
    },
    "parts": [
     {
      "name": {
       "en": "Raspberry Pi + camera",
       "am": "Raspberry Pi + camera"
      },
      "v": 9000.0,
      "slot": 0
     },
     {
      "name": {
       "en": "motors and driver",
       "am": "motors and driver"
      },
      "v": 6000.0,
      "slot": 1
     },
     {
      "name": {
       "en": "battery + solar panel",
       "am": "battery + solar panel"
      },
      "v": 7000.0,
      "slot": 2
     },
     {
      "name": {
       "en": "frame (local welding)",
       "am": "frame (local welding)"
      },
      "v": 4000.0,
      "slot": 3
     },
     {
      "name": {
       "en": "weeding tool",
       "am": "weeding tool"
      },
      "v": 2000.0,
      "slot": 0
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Part",
       "am": "ክፍል"
      },
      {
       "en": "Value",
       "am": "እሴት"
      }
     ],
     "rows": [
      [
       {
        "en": "Raspberry Pi + camera",
        "am": "Raspberry Pi + camera"
       },
       9000.0
      ],
      [
       {
        "en": "motors and driver",
        "am": "motors and driver"
       },
       6000.0
      ],
      [
       {
        "en": "battery + solar panel",
        "am": "battery + solar panel"
       },
       7000.0
      ],
      [
       {
        "en": "frame (local welding)",
        "am": "frame (local welding)"
       },
       4000.0
      ],
      [
       {
        "en": "weeding tool",
        "am": "weeding tool"
       },
       2000.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Up to 0.5 m/s the robot removes at least 85% of weeds and damages at most 5% of crop plants; faster than that, damage climbs quickly.",
    "At 0.5 m/s one hectare takes about 18 hours, so with 500 working hours one robot can cover about 27 ha a season.",
    "Built from local parts for 28,000 birr, it costs about 496 birr per hectare against 3,000 for hand weeding."
   ],
   "am": [
    "እስከ 0.5 m/s ሮቦቱ ቢያንስ 85% አረሞችን ያስወግዳል፣ ቢበዛ 5% የሰብል ተክሎችን ይጎዳል፤ ከዚያ በፍጥነት ጉዳቱ በፍጥነት ይጨምራል።",
    "በ0.5 m/s አንድ ሄክታር ወደ 18 ሰዓታት ይወስዳል፤ ስለዚህ በ500 የሥራ ሰዓታት አንድ ሮቦት በወቅት ወደ 27 ሄክታር ሊሸፍን ይችላል።",
    "ከአካባቢ ክፍሎች በ28,000 ብር ተገንብቶ በሄክታር ወደ 496 ብር ያስወጣል፤ የእጅ አረም 3,000 ብር ነው።"
   ]
  },
  "decision": {
   "en": "Build one prototype, run it at 0.5 m/s, and measure real detection on local weeds; offer it as a shared service for a cooperative rather than selling to single farmers.",
   "am": "አንድ prototype ገንባ፣ በ0.5 m/s አስኪደው፣ በአካባቢ አረሞች ላይ እውነተኛ detectionን ለካ፤ ለነጠላ ገበሬዎች ከመሸጥ ይልቅ ለማኅበር እንደ የጋራ አገልግሎት አቅርበው።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Quantum search on a simulator, and the energy cost of AI",
   "am": "በአስመሳይ ላይ የኳንተም ፍለጋና የAI የኃይል ወጪ"
  },
  "goal": {
   "en": "Simulate Grover’s search on 3 qubits with NumPy to see quantum speed-up on a tiny problem, then estimate the energy of running an AI model on a laptop versus a phone.",
   "am": "በትንሽ ችግር ላይ የኳንተም ፍጥነትን ለማየት Grover ፍለጋን በ3 qubits በNumPy አስመስል፤ ከዚያ የAI ሞዴልን በላፕቶፕና በስልክ ላይ የማስኬድ ኃይልን ገምት።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "NumPy",
    "why": {
     "en": "fast maths on arrays",
     "am": "በarrays ላይ ፈጣን ሒሳብ"
    },
    "get": "pip install numpy"
   },
   {
    "name": "Qiskit or Cirq (next step)",
    "why": {
     "en": "real quantum circuits and free cloud simulators",
     "am": "እውነተኛ የኳንተም circuits እና ነጻ የcloud አስመሳዮች"
    },
    "get": "pip install qiskit"
   }
  ],
  "steps": {
   "en": [
    "Represent 3 qubits as a vector of 8 amplitudes; start in an equal superposition.",
    "Oracle: flip the sign of the marked item (here item 5).",
    "Diffusion: reflect all amplitudes about their mean.",
    "Record the chance of measuring item 5 after 0–5 rounds.",
    "Energy: time a model on your laptop, multiply by the power draw; compare with a phone’s."
   ],
   "am": [
    "3 qubitsን እንደ 8 amplitudes vector ወክል፤ በእኩል superposition ጀምር።",
    "Oracle፡ የተመረጠውን ንጥል ምልክት ገልብጥ (እዚህ ንጥል 5)።",
    "Diffusion፡ ሁሉንም amplitudes በአማካያቸው ዙሪያ አንጸባርቅ።",
    "ከ0–5 ዙሮች በኋላ ንጥል 5ን የመለካት ዕድሉን መዝግብ።",
    "ኃይል፡ ሞዴልን በላፕቶፕህ ላይ ጊዜ ለካ፣ በኃይል ፍጆታው አባዛ፤ ከስልክ ጋር አወዳድር።"
   ]
  },
  "code": "import numpy as np, time\nN, marked = 8, 5\nstate = np.ones(N) / np.sqrt(N); probs = [state[marked] ** 2]\nfor _ in range(5):\n    state[marked] *= -1                         # oracle\n    state = 2 * state.mean() - state            # diffusion\n    probs.append(state[marked] ** 2)\nprint(\"chance of finding item 5 after k rounds:\", [round(float(p), 3) for p in probs])\nbest_k = int(np.argmax(probs)); print(f\"best after {best_k} rounds (theory: about pi/4 x sqrt(8) = {np.pi / 4 * np.sqrt(8):.1f}); classical search needs 4 looks on average\")\nW = np.random.default_rng(0).normal(size=(512, 512)).astype(np.float32); x = np.ones((64, 512), np.float32)\nt = time.perf_counter()\nfor _ in range(200): x = np.tanh(x @ W / 22.6)\nsec = (time.perf_counter() - t) / 200\nlaptop_j = sec * 30; phone_j = sec * 4 * 4                    # laptop ~30 W; phone ~4 W but about 4x slower\nprint(f\"one inference: {sec * 1000:.2f} ms; energy laptop {laptop_j * 1000:.1f} mJ, phone {phone_j * 1000:.1f} mJ\")",
  "out": "chance of finding item 5 after k rounds: [0.125, 0.781, 0.945, 0.33, 0.012, 0.548]\nbest after 2 rounds (theory: about pi/4 x sqrt(8) = 2.2); classical search needs 4 looks on average\none inference: 0.42 ms; energy laptop 12.5 mJ, phone 6.7 mJ",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Grover search: chance of finding the marked item",
     "am": "Grover ፍለጋ፡ የተመረጠውን ንጥል የማግኘት ዕድል"
    },
    "x": {
     "label": {
      "en": "Rounds",
      "am": "ዙሮች"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Probability",
      "am": "ፕሮባቢሊቲ"
     },
     "min": 0,
     "max": 1
    },
    "series": [
     {
      "name": {
       "en": "Probability",
       "am": "ፕሮባቢሊቲ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       0.0,
       1.0,
       2.0,
       3.0,
       4.0,
       5.0
      ],
      "y": [
       0.125,
       0.7812,
       0.9453,
       0.3301,
       0.0122,
       0.548
      ],
      "tip": [
       "0.125|Probability · 0",
       "0.7812|Probability · 1",
       "0.9453|Probability · 2",
       "0.3301|Probability · 3",
       "0.01221|Probability · 4",
       "0.548|Probability · 5"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Rounds",
       "am": "ዙሮች"
      },
      {
       "en": "Probability",
       "am": "ፕሮባቢሊቲ"
      }
     ],
     "rows": [
      [
       0.0,
       0.125
      ],
      [
       1.0,
       0.781
      ],
      [
       2.0,
       0.945
      ],
      [
       3.0,
       0.33
      ],
      [
       4.0,
       0.012
      ],
      [
       5.0,
       0.548
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0.125,
      "label": {
       "en": "random guess",
       "am": "የዘፈቀደ ግምት"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "After 2 rounds the marked item is found with probability 0.95, against 1/8 for a random guess.",
    "More rounds overshoot and the chance falls again: quantum algorithms need the exact number of steps.",
    "On this computer one inference used about 12.5 mJ on a laptop vs 6.7 mJ estimated on a phone: small models on phones save energy and work offline."
   ],
   "am": [
    "ከ2 ዙሮች በኋላ የተመረጠው ንጥል በ0.95 ፕሮባቢሊቲ ይገኛል፤ የዘፈቀደ ግምት 1/8 ነው።",
    "ተጨማሪ ዙሮች ያልፋሉ፣ ዕድሉም እንደገና ይወርዳል፡ የኳንተም algorithms ትክክለኛውን የእርምጃ ብዛት ይፈልጋሉ።",
    "በዚህ ኮምፒውተር ላይ አንድ inference በላፕቶፕ ወደ 12.5 mJ ተጠቅሟል፣ በስልክ 6.7 mJ ይገመታል፡ በስልኮች ላይ ያሉ ትናንሽ ሞዴሎች ኃይል ይቆጥባሉ፣ ያለ ኢንተርኔትም ይሠራሉ።"
   ]
  },
  "decision": {
   "en": "Follow quantum computing with free simulators and courses, but invest today in efficient small models on phones: that is where the energy and access gains are for African users now.",
   "am": "የኳንተም ኮምፒውቲንግን በነጻ አስመሳዮችና ኮርሶች ተከታተል፤ ዛሬ ግን በስልኮች ላይ ባሉ ቀልጣፋ ትናንሽ ሞዴሎች ላይ ኢንቨስት አድርግ፡ ለአፍሪካ ተጠቃሚዎች አሁን የኃይልና የተደራሽነት ትርፍ ያለው እዚያ ነው።"
  },
  "note": {
   "en": "Power figures are typical values (laptop 30 W, phone 4 W at about 4× slower); measure your own devices with a USB power meter.",
   "am": "የኃይል ቁጥሮቹ የተለመዱ እሴቶች ናቸው (ላፕቶፕ 30 W፣ ስልክ 4 W በ4× ገደማ ቀርፋፋ)፤ የራስህን መሣሪያዎች በUSB የኃይል መለኪያ ለካ።"
  }
 },
 {
  "title": {
   "en": "Evidence for a policy brief on local-language data",
   "am": "ስለ አካባቢያዊ-ቋንቋ ዳታ ለፖሊሲ ማጠቃለያ ማስረጃ"
  },
  "goal": {
   "en": "Analyse a stakeholder survey on who should own and license Amharic language data, with confidence intervals by group, and choose the option to recommend.",
   "am": "የአማርኛ ቋንቋ ዳታን ማን ሊይዘውና ፈቃድ ሊሰጠው እንደሚገባ በባለድርሻ አካላት ዳሰሳ ላይ በቡድን ከconfidence intervals ጋር ተንትን፤ የምትመክረውን አማራጭ ምረጥ።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "pandas",
    "why": {
     "en": "tables: load, clean and summarise data",
     "am": "ሰንጠረዦች፡ ዳታን መጫን፣ ማጽዳትና ማጠቃለል"
    },
    "get": "pip install pandas"
   },
   {
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
   },
   {
    "name": "Survey tool (KoboToolbox)",
    "why": {
     "en": "collect answers offline on phones",
     "am": "በስልኮች ላይ ያለ ኢንተርኔት መልሶችን መሰብሰብ"
    },
    "get": "kobotoolbox.org (free)"
   }
  ],
  "steps": {
   "en": [
    "Define three options: open licence, community trust with paid commercial licences, government ownership.",
    "Survey four groups: researchers, start-ups, community members, officials.",
    "Compute support for each option per group with 95% intervals.",
    "Identify options with majority support in every group.",
    "Write three recommendations with costs and risks."
   ],
   "am": [
    "ሦስት አማራጮችን ግለጽ፡ ክፍት ፈቃድ፣ የሚከፈልባቸው የንግድ ፈቃዶች ያሉት የማኅበረሰብ ትረስት፣ የመንግሥት ባለቤትነት።",
    "አራት ቡድኖችን ዳስስ፡ ተመራማሪዎች፣ start-ups፣ የማኅበረሰብ አባላት፣ ባለሥልጣናት።",
    "ለእያንዳንዱ ቡድን የእያንዳንዱን አማራጭ ድጋፍ ከ95% ክልሎች ጋር አስላ።",
    "በእያንዳንዱ ቡድን የአብላጫ ድጋፍ ያላቸውን አማራጮች ለይ።",
    "ሦስት ምክሮችን ከወጪዎችና ስጋቶች ጋር ጻፍ።"
   ]
  },
  "code": "import numpy as np, pandas as pd\ngroups = {\"researchers\": 80, \"start-ups\": 45, \"community\": 150, \"officials\": 40}\nsupport = pd.DataFrame({\"open licence\": [0.81, 0.73, 0.38, 0.35], \"community trust\": [0.66, 0.58, 0.79, 0.62], \"government ownership\": [0.21, 0.16, 0.44, 0.78]}, index=list(groups))\nn = pd.Series(groups)\nhalf = 1.96 * np.sqrt(support * (1 - support)).div(np.sqrt(n), axis=0)\nprint((support * 100).round(0).astype(int).to_string())\nlowest = (support - half).min()\nfor opt in support: print(f\"{opt:20s} lowest group support {support[opt].min():.0%}; lower 95% limit {lowest[opt]:.0%}\")\nbroad = [o for o in support if (support[o] - half[o] > 0.5).all()]\nprint(\"options with majority support in every group (lower limit above 50%):\", broad)",
  "out": "             open licence  community trust  government ownership\nresearchers            81               66                    21\nstart-ups              73               58                    16\ncommunity              38               79                    44\nofficials              35               62                    78\nopen licence         lowest group support 35%; lower 95% limit 20%\ncommunity trust      lowest group support 58%; lower 95% limit 44%\ngovernment ownership lowest group support 16%; lower 95% limit 5%\noptions with majority support in every group (lower limit above 50%): []",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Support for each option by group (%)",
     "am": "የእያንዳንዱ አማራጭ ድጋፍ በቡድን (%)"
    },
    "x": {
     "label": {
      "en": "Percent in favour",
      "am": "የሚደግፉ መቶኛ"
     }
    },
    "fmt": 0,
    "cats": [
     "researchers",
     "start-ups",
     "community",
     "officials"
    ],
    "series": [
     {
      "name": {
       "en": "open licence",
       "am": "open licence"
      },
      "slot": 1,
      "v": [
       81.0,
       73.0,
       38.0,
       35.0
      ]
     },
     {
      "name": {
       "en": "community trust",
       "am": "community trust"
      },
      "slot": 2,
      "v": [
       66.0,
       58.0,
       79.0,
       62.0
      ]
     },
     {
      "name": {
       "en": "government ownership",
       "am": "government ownership"
      },
      "slot": 3,
      "v": [
       21.0,
       16.0,
       44.0,
       78.0
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
       "en": "open licence",
       "am": "open licence"
      },
      {
       "en": "community trust",
       "am": "community trust"
      },
      {
       "en": "government ownership",
       "am": "government ownership"
      }
     ],
     "rows": [
      [
       "researchers",
       81.0,
       66.0,
       21.0
      ],
      [
       "start-ups",
       73.0,
       58.0,
       16.0
      ],
      [
       "community",
       38.0,
       79.0,
       44.0
      ],
      [
       "officials",
       35.0,
       62.0,
       78.0
      ]
     ]
    }
   },
   {
    "type": "dot",
    "title": {
     "en": "Community trust: support with 95% intervals",
     "am": "የማኅበረሰብ ትረስት፡ ድጋፍ ከ95% ክልሎች ጋር"
    },
    "x": {
     "label": {
      "en": "Percent in favour",
      "am": "የሚደግፉ መቶኛ"
     }
    },
    "cats": [
     "researchers",
     "start-ups",
     "community",
     "officials"
    ],
    "ref0": false,
    "series": [
     {
      "name": {
       "en": "Estimate with 95% interval",
       "am": "ግምት ከ95% ክልል ጋር"
      },
      "slot": 1,
      "v": [
       66.0,
       58.0,
       79.0,
       62.0
      ],
      "lo": [
       55.619,
       43.579,
       72.482,
       46.958
      ],
      "hi": [
       76.381,
       72.421,
       85.518,
       77.042
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Item",
       "am": "ንጥል"
      },
      {
       "en": "Estimate",
       "am": "ግምት"
      },
      {
       "en": "Lower 95%",
       "am": "ዝቅተኛ 95%"
      },
      {
       "en": "Upper 95%",
       "am": "ከፍተኛ 95%"
      }
     ],
     "rows": [
      [
       "researchers",
       66.0,
       55.619,
       76.381
      ],
      [
       "start-ups",
       58.0,
       43.579,
       72.421
      ],
      [
       "community",
       79.0,
       72.482,
       85.518
      ],
      [
       "officials",
       62.0,
       46.958,
       77.042
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Open licensing is popular with researchers and start-ups but not with communities (38%) or officials (35%).",
    "Government ownership is favoured only by officials (78%).",
    "Only the community trust has majority support in every group (lowest 58%), although with these small groups its lower 95% limit falls below 50% for some: a larger survey should confirm it."
   ],
   "am": [
    "ክፍት ፈቃድ በተመራማሪዎችና በstart-ups ዘንድ ተወዳጅ ነው፣ በማኅበረሰቦች (38%) ወይም በባለሥልጣናት (35%) ዘንድ ግን አይደለም።",
    "የመንግሥት ባለቤትነትን የሚመርጡት ባለሥልጣናት ብቻ ናቸው (78%)።",
    "በእያንዳንዱ ቡድን የአብላጫ ድጋፍ ያለው የማኅበረሰብ ትረስት ብቻ ነው (ዝቅተኛው 58%)፤ በእነዚህ ትናንሽ ቡድኖች ግን ለአንዳንዶቹ ዝቅተኛው 95% ገደቡ ከ50% በታች ይወርዳል፡ ትልቅ ዳሰሳ ሊያረጋግጠው ይገባል።"
   ]
  },
  "decision": {
   "en": "Recommend a community data trust: free use for research and education, paid licences for commercial use with revenue shared with contributing communities; pilot it with one language corpus for two years.",
   "am": "የማኅበረሰብ የዳታ ትረስትን ምከር፡ ለምርምርና ለትምህርት ነጻ አጠቃቀም፣ ለንግድ አጠቃቀም ከአስተዋጽዖ አበርካች ማኅበረሰቦች ጋር ገቢ የሚጋራ የሚከፈልበት ፈቃድ፤ በአንድ የቋንቋ corpus ለሁለት ዓመታት ሞክረው።"
  },
  "note": {
   "en": "Illustrative survey results; a real brief needs a sampling plan and consent from participants.",
   "am": "ለማሳያ የዳሰሳ ውጤቶች፤ እውነተኛ ማጠቃለያ የናሙና ዕቅድና የተሳታፊዎች ፈቃድ ያስፈልገዋል።"
  }
 },
 {
  "title": {
   "en": "Your AI-use log: time saved and skills at risk",
   "am": "የAI-አጠቃቀም መዝገብህ፡ የተቆጠበ ጊዜና ስጋት ላይ ያሉ ክህሎቶች"
  },
  "goal": {
   "en": "Analyse four weeks of your own log of AI use at work: time saved, mistakes the AI made that you caught, and tasks you no longer practise, and write your personal rules.",
   "am": "በሥራ ላይ የAI አጠቃቀምህን የአራት ሳምንታት የራስህ መዝገብ ተንትን፡ የተቆጠበ ጊዜ፣ ያገኘሃቸው AI የሠራቸው ስህተቶች እና ከአሁን በኋላ የማትለማመዳቸው ተግባራት፤ የግል ሕጎችህንም ጻፍ።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "pandas",
    "why": {
     "en": "tables: load, clean and summarise data",
     "am": "ሰንጠረዦች፡ ዳታን መጫን፣ ማጽዳትና ማጠቃለል"
    },
    "get": "pip install pandas"
   },
   {
    "name": "Spreadsheet",
    "why": {
     "en": "enter and check the raw data",
     "am": "ጥሬ ዳታውን ማስገባትና መፈተሽ"
    },
    "get": "LibreOffice Calc (free) or Google Sheets"
   }
  ],
  "steps": {
   "en": [
    "For each AI-assisted task log: type, minutes saved, AI mistakes you caught, and \"did I do the core thinking myself?\" (yes/no).",
    "Summarise by task type.",
    "Plot weekly time saved and mistakes caught.",
    "Flag task types with many mistakes or no self-practice.",
    "Write 3–5 personal rules."
   ],
   "am": [
    "በAI ለታገዘ ለእያንዳንዱ ተግባር መዝግብ፡ ዓይነት፣ የተቆጠቡ ደቂቃዎች፣ ያገኘሃቸው የAI ስህተቶች እና «ዋናውን አስተሳሰብ ራሴ ሠራሁ?» (አዎ/አይደለም)።",
    "በተግባር ዓይነት አጠቃልል።",
    "ሳምንታዊ የተቆጠበ ጊዜንና የተገኙ ስህተቶችን ቻርት አድርግ።",
    "ብዙ ስህተቶች ወይም የራስ ልምምድ የሌላቸውን የተግባር ዓይነቶች ምልክት አድርግ።",
    "3–5 የግል ሕጎችን ጻፍ።"
   ]
  },
  "code": "import pandas as pd\nlog = pd.DataFrame([\n    (\"email drafts\", 22, 10, 1, 18), (\"code\", 14, 40, 9, 5), (\"literature search\", 8, 25, 6, 6),\n    (\"data analysis\", 10, 30, 7, 2), (\"translation to Amharic\", 9, 15, 8, 7)],\n    columns=[\"task\", \"times\", \"min_saved_each\", \"mistakes_caught\", \"did_core_thinking\"])\nlog[\"hours_saved\"] = (log.times * log.min_saved_each / 60).round(1)\nlog[\"mistakes_per_10\"] = (log.mistakes_caught / log.times * 10).round(1)\nlog[\"self_practice\"] = (log.did_core_thinking / log.times).round(2)\nprint(log[[\"task\", \"hours_saved\", \"mistakes_per_10\", \"self_practice\"]].to_string(index=False))\nweekly_hours = [4.2, 5.1, 5.6, 6.0]; weekly_mistakes = [9, 9, 6, 7]\nrisky = log[(log.mistakes_per_10 >= 5) | (log.self_practice < 0.3)].task.tolist()\nprint(f\"total {log.hours_saved.sum():.1f} hours saved in 4 weeks; watch: {risky}\")",
  "out": "                  task  hours_saved  mistakes_per_10  self_practice\n          email drafts          3.7              0.5           0.82\n                  code          9.3              6.4           0.36\n     literature search          3.3              7.5           0.75\n         data analysis          5.0              7.0           0.20\ntranslation to Amharic          2.2              8.9           0.78\ntotal 23.5 hours saved in 4 weeks; watch: ['code', 'literature search', 'data analysis', 'translation to Amharic']",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "By task type",
     "am": "በተግባር ዓይነት"
    },
    "x": {
     "label": {
      "en": "Hours / mistakes",
      "am": "ሰዓታት / ስህተቶች"
     }
    },
    "fmt": 1,
    "cats": [
     "email drafts",
     "code",
     "literature search",
     "data analysis",
     "translation to Amharic"
    ],
    "series": [
     {
      "name": {
       "en": "Hours saved",
       "am": "የተቆጠቡ ሰዓታት"
      },
      "slot": 1,
      "v": [
       3.7,
       9.3,
       3.3,
       5.0,
       2.2
      ]
     },
     {
      "name": {
       "en": "AI mistakes per 10 uses",
       "am": "በ10 አጠቃቀሞች የAI ስህተቶች"
      },
      "slot": 2,
      "v": [
       0.5,
       6.4,
       7.5,
       7.0,
       8.9
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
       "en": "Hours saved",
       "am": "የተቆጠቡ ሰዓታት"
      },
      {
       "en": "AI mistakes per 10 uses",
       "am": "በ10 አጠቃቀሞች የAI ስህተቶች"
      }
     ],
     "rows": [
      [
       "email drafts",
       3.7,
       0.5
      ],
      [
       "code",
       9.3,
       6.4
      ],
      [
       "literature search",
       3.3,
       7.5
      ],
      [
       "data analysis",
       5.0,
       7.0
      ],
      [
       "translation to Amharic",
       2.2,
       8.9
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Share of tasks where I did the core thinking",
     "am": "ዋናውን አስተሳሰብ ራሴ የሠራሁባቸው ተግባራት ድርሻ"
    },
    "x": {
     "label": {
      "en": "Share (0–1)",
      "am": "ድርሻ (0–1)"
     }
    },
    "fmt": 2,
    "cats": [
     "email drafts",
     "code",
     "literature search",
     "data analysis",
     "translation to Amharic"
    ],
    "series": [
     {
      "name": {
       "en": "Share",
       "am": "ድርሻ"
      },
      "slot": 1,
      "v": [
       0.82,
       0.36,
       0.75,
       0.2,
       0.78
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
       "en": "Share",
       "am": "ድርሻ"
      }
     ],
     "rows": [
      [
       "email drafts",
       0.82
      ],
      [
       "code",
       0.36
      ],
      [
       "literature search",
       0.75
      ],
      [
       "data analysis",
       0.2
      ],
      [
       "translation to Amharic",
       0.78
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "AI saved 24 hours in 4 weeks, most in code and data analysis.",
    "Those same tasks had the most AI mistakes (6–9 per 10 uses): the saving is real only because the mistakes were caught.",
    "For data analysis the core thinking was mine only 20% of the time: a skill I may lose."
   ],
   "am": [
    "AI በ4 ሳምንታት 24 ሰዓታትን አትርፏል፣ በብዛት በኮድና በዳታ ትንተና።",
    "እነዚያው ተግባራት ብዙ የAI ስህተቶች ነበሯቸው (በ10 አጠቃቀሞች 6–9)፡ ቁጠባው እውነተኛ የሆነው ስህተቶቹ ስለተገኙ ብቻ ነው።",
    "ለዳታ ትንተና ዋናው አስተሳሰብ የእኔ የነበረው 20% ጊዜ ብቻ ነው፡ ላጣው የምችለው ክህሎት።"
   ]
  },
  "decision": {
   "en": "My rules: (1) plan the analysis myself before asking AI; (2) run and test all AI code; (3) check every citation in the original; (4) have Amharic translations read by a native speaker; (5) one analysis a week without AI.",
   "am": "ሕጎቼ፡ (1) AIን ከመጠየቄ በፊት ትንተናውን ራሴ አቅዳለሁ፤ (2) ሁሉንም የAI ኮድ አስኪጄ እፈትሻለሁ፤ (3) እያንዳንዱን ጥቅስ በመጀመሪያው ምንጭ እፈትሻለሁ፤ (4) የአማርኛ ትርጉሞችን የቋንቋው ተናጋሪ እንዲያነባቸው አደርጋለሁ፤ (5) በሳምንት አንድ ትንተና ያለ AI።"
  },
  "note": {
   "en": "Example log; keep your own in a spreadsheet for a month and run the same code.",
   "am": "የምሳሌ መዝገብ፤ የራስህን ለአንድ ወር በspreadsheet አቆይና ያንኑ ኮድ አስኪድ።"
  }
 },
 {
  "title": {
   "en": "90-day launch: unit economics of an AI service",
   "am": "የ90-ቀን ጅምር፡ የAI አገልግሎት unit economics"
  },
  "goal": {
   "en": "Analyse the first 90 days of a paid AI crop-advice service: sign-ups, churn, revenue, customer acquisition cost and lifetime value, and decide how much profit to reinvest and where.",
   "am": "የሚከፈልበት የAI የሰብል-ምክር አገልግሎት የመጀመሪያዎቹን 90 ቀናት ተንትን፡ ምዝገባዎች፣ churn፣ ገቢ፣ የደንበኛ ማግኛ ወጪና የዕድሜ ዘመን ዋጋ፤ ምን ያህል ትርፍ እንደገና ኢንቨስት እንደሚደረግና የት እንደሆነ ወስን።"
  },
  "time": {
   "en": "2–4 weeks",
   "am": "2–4 ሳምንታት"
  },
  "tools": [
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "pandas",
    "why": {
     "en": "tables: load, clean and summarise data",
     "am": "ሰንጠረዦች፡ ዳታን መጫን፣ ማጽዳትና ማጠቃለል"
    },
    "get": "pip install pandas"
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
    "name": "Mobile money (telebirr, M-Pesa)",
    "why": {
     "en": "collect small monthly payments",
     "am": "ትናንሽ ወርሃዊ ክፍያዎችን መሰብሰብ"
    },
    "get": "operator merchant account"
   }
  ],
  "steps": {
   "en": [
    "Record per month: new paying users, cancellations, revenue, marketing spend, running costs.",
    "Churn = cancellations ÷ users at the start of the month.",
    "Customer acquisition cost (CAC) = marketing ÷ new users; lifetime value (LTV) = monthly margin ÷ churn.",
    "Track LTV/CAC; above 3 is healthy.",
    "Publish the numbers in your public log and decide the reinvestment."
   ],
   "am": [
    "በወር መዝግብ፡ አዲስ ከፋይ ተጠቃሚዎች፣ ስረዛዎች፣ ገቢ፣ የማርኬቲንግ ወጪ፣ የሥራ ማስኬጃ ወጪዎች።",
    "Churn = ስረዛዎች ÷ በወሩ መጀመሪያ ያሉ ተጠቃሚዎች።",
    "የደንበኛ ማግኛ ወጪ (CAC) = ማርኬቲንግ ÷ አዲስ ተጠቃሚዎች፤ የዕድሜ ዘመን ዋጋ (LTV) = ወርሃዊ ትርፍ ህዳግ ÷ churn።",
    "LTV/CACን ተከታተል፤ ከ3 በላይ ጤናማ ነው።",
    "ቁጥሮቹን በሕዝባዊ መዝገብህ አትምና የእንደገና ኢንቨስትመንቱን ወስን።"
   ]
  },
  "code": "import pandas as pd\nm = pd.DataFrame({\"new_users\": [120, 210, 340], \"cancelled\": [0, 18, 31], \"marketing\": [9000, 12000, 15000]}, index=[1, 2, 3])\nprice, cost_per_user, fixed = 30, 9, 4000                                       # birr per month\nusers, start = [], 0\nfor mo in m.index:\n    start_users = start; start = start + m.new_users[mo] - m.cancelled[mo]; users.append(start)\nm[\"users_end\"] = users; m[\"users_start\"] = [0] + users[:-1]\nm[\"revenue\"] = m.users_end * price; m[\"profit\"] = m.revenue - m.users_end * cost_per_user - fixed - m.marketing\nm[\"churn\"] = (m.cancelled / m.users_start.replace(0, float(\"nan\"))).round(3)\nm[\"CAC\"] = (m.marketing / m.new_users).round(1)\nchurn = m.churn.iloc[-1]; ltv = (price - cost_per_user) / churn; cac = m.CAC.iloc[-1]\nprint(m[[\"users_end\", \"revenue\", \"profit\", \"churn\", \"CAC\"]].to_string())\nprint(f\"month 3: LTV {ltv:.0f} birr, CAC {cac:.0f} birr, LTV/CAC {ltv / cac:.1f}\")",
  "out": "   users_end  revenue  profit  churn   CAC\n1        120     3600  -10480    NaN  75.0\n2        312     9360   -9448  0.150  57.1\n3        621    18630   -5959  0.099  44.1\nmonth 3: LTV 212 birr, CAC 44 birr, LTV/CAC 4.8",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Paying users and monthly profit",
     "am": "ከፋይ ተጠቃሚዎችና ወርሃዊ ትርፍ"
    },
    "x": {
     "label": {
      "en": "Month",
      "am": "ወር"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Users / tens of birr",
      "am": "ተጠቃሚዎች / አሥሮች ብር"
     }
    },
    "series": [
     {
      "name": {
       "en": "Paying users",
       "am": "ከፋይ ተጠቃሚዎች"
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
       120.0,
       312.0,
       621.0
      ],
      "tip": [
       "120|Paying users · 1",
       "312|Paying users · 2",
       "621|Paying users · 3"
      ],
      "endlabel": {
       "en": "Paying users",
       "am": "ከፋይ ተጠቃሚዎች"
      }
     },
     {
      "name": {
       "en": "Profit (tens of birr)",
       "am": "ትርፍ (በአሥር ብር)"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       3.0
      ],
      "y": [
       -1048.0,
       -944.8,
       -595.9
      ],
      "tip": [
       "-1048|Profit (tens of birr) · 1",
       "-944.8|Profit (tens of birr) · 2",
       "-595.9|Profit (tens of birr) · 3"
      ],
      "endlabel": {
       "en": "Profit (tens of birr)",
       "am": "ትርፍ (በአሥር ብር)"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Month",
       "am": "ወር"
      },
      {
       "en": "Paying users",
       "am": "ከፋይ ተጠቃሚዎች"
      },
      {
       "en": "Profit (tens of birr)",
       "am": "ትርፍ (በአሥር ብር)"
      }
     ],
     "rows": [
      [
       1.0,
       120.0,
       -1048.0
      ],
      [
       2.0,
       312.0,
       -944.8
      ],
      [
       3.0,
       621.0,
       -595.9
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0,
      "label": ""
     }
    ],
    "rpad": 90
   },
   {
    "type": "hbar",
    "title": {
     "en": "Month 3 unit economics (birr per user)",
     "am": "የወር 3 unit economics (በተጠቃሚ ብር)"
    },
    "x": {
     "label": {
      "en": "Birr",
      "am": "ብር"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "Lifetime value (LTV)",
      "am": "የዕድሜ ዘመን ዋጋ (LTV)"
     },
     {
      "en": "Acquisition cost (CAC)",
      "am": "የማግኛ ወጪ (CAC)"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Birr",
       "am": "ብር"
      },
      "slot": 1,
      "v": [
       212.0,
       44.0
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
       "en": "Birr",
       "am": "ብር"
      }
     ],
     "rows": [
      [
       {
        "en": "Lifetime value (LTV)",
        "am": "የዕድሜ ዘመን ዋጋ (LTV)"
       },
       212.0
      ],
      [
       {
        "en": "Acquisition cost (CAC)",
        "am": "የማግኛ ወጪ (CAC)"
       },
       44.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Paying users grew to 621 by day 90; monthly profit turned less negative (-5,959 birr in month 3).",
    "Monthly churn is 9.9%, so an average user stays about 10 months and is worth 212 birr.",
    "Each new user costs 44 birr to acquire: LTV/CAC = 4.8."
   ],
   "am": [
    "ከፋይ ተጠቃሚዎች በቀን 90 ወደ 621 አድገዋል፤ ወርሃዊ ትርፍ ያነሰ አሉታዊ ሆኗል (በወር 3 -5,959 ብር)።",
    "ወርሃዊ churn 9.9% ነው፤ ስለዚህ አማካይ ተጠቃሚ ወደ 10 ወራት ይቆያል፣ ዋጋውም 212 ብር ነው።",
    "እያንዳንዱን አዲስ ተጠቃሚ ለማግኘት 44 ብር ያስወጣል፡ LTV/CAC = 4.8።"
   ]
  },
  "decision": {
   "en": "Healthy unit economics: reinvest 50% of profit in marketing through cooperatives and 20% in better advice quality; keep publishing the monthly numbers.",
   "am": "ጤናማ unit economics፡ 50% ትርፍን በማኅበራት በኩል በማርኬቲንግ፣ 20%ን በተሻለ የምክር ጥራት እንደገና ኢንቨስት አድርግ፤ ወርሃዊ ቁጥሮቹን ማተም ቀጥል።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 }
];
