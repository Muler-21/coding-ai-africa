/* Practical labs, track c, level 2. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[2] = [
 {
  "title": {
   "en": "Market price survey and calculator",
   "am": "የገበያ ዋጋ ጥናትና ማስሊያ"
  },
  "goal": {
   "en": "Collect real prices from three markets, build a Python calculator and decide where a family should buy.",
   "am": "ከሦስት ገበያዎች እውነተኛ ዋጋዎችን ሰብስብ፣ የPython ማስሊያ ገንባ፣ ቤተሰብ የት መግዛት እንዳለበት ወስን።"
  },
  "time": {
   "en": "2 weeks · 3 h per week",
   "am": "2 ሳምንታት · በሳምንት 3 ሰዓት"
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
    "name": "Notebook",
    "why": {
     "en": "record prices at the market",
     "am": "በገበያው ዋጋዎችን መዝግብ"
    },
    "get": "school supplies"
   },
   {
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   },
   {
    "name": "micro:bit (optional)",
    "why": {
     "en": "show the cheapest market on its screen",
     "am": "በስክሪኑ ላይ በጣም ርካሹን ገበያ አሳይ"
    },
    "get": "school kit"
   }
  ],
  "steps": {
   "en": [
    "Ask an adult to help record the price per kg of teff, maize, onions and oil in three markets.",
    "Type the prices into a Python dictionary.",
    "Write a function total(basket, market) that returns the cost of a family basket.",
    "Add transport cost to each market.",
    "Print totals and draw a bar chart; decide."
   ],
   "am": [
    "በሦስት ገበያዎች የጤፍ፣ የበቆሎ፣ የሽንኩርትና የዘይት በኪሎ ዋጋ እንዲመዘግብ አንድ አዋቂ ጠይቅ።",
    "ዋጋዎቹን ወደ Python dictionary ጻፍ።",
    "የቤተሰብ ቅርጫት ወጪን የሚመልስ total(basket, market) function ጻፍ።",
    "ለእያንዳንዱ ገበያ የትራንስፖርት ወጪ ጨምር።",
    "ድምሮቹን አትምና የአሞሌ ቻርት ሣል፤ ወስን።"
   ]
  },
  "code": "prices = {\"Village\": {\"teff\": 125, \"maize\": 42, \"onion\": 60, \"oil\": 210},\n          \"Town\":    {\"teff\": 116, \"maize\": 38, \"onion\": 50, \"oil\": 195},\n          \"City\":    {\"teff\": 110, \"maize\": 36, \"onion\": 45, \"oil\": 185}}\ntransport = {\"Village\": 0, \"Town\": 60, \"City\": 180}       # return trip, birr\nbasket = {\"teff\": 10, \"maize\": 5, \"onion\": 3, \"oil\": 1}   # kg (oil in litres)\ndef total(market):\n    return sum(prices[market][item] * qty for item, qty in basket.items())\ncost = {m: total(m) + transport[m] for m in prices}\nfor m in prices:\n    print(f\"{m:8s} goods {total(m):5.0f} + transport {transport[m]:3d} = {cost[m]:5.0f} birr\")\nbest = min(cost, key=cost.get)\nprint(f\"cheapest overall: {best}, saving {max(cost.values()) - cost[best]:.0f} birr per basket\")",
  "out": "Village  goods  1850 + transport   0 =  1850 birr\nTown     goods  1695 + transport  60 =  1755 birr\nCity     goods  1600 + transport 180 =  1780 birr\ncheapest overall: Town, saving 95 birr per basket",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Cost of the family basket by market (birr)",
     "am": "የቤተሰብ ቅርጫት ወጪ በገበያ (ብር)"
    },
    "x": {
     "label": {
      "en": "Birr",
      "am": "ብር"
     }
    },
    "fmt": 0,
    "cats": [
     "Village",
     "Town",
     "City"
    ],
    "series": [
     {
      "name": {
       "en": "Goods",
       "am": "ዕቃዎች"
      },
      "slot": 1,
      "v": [
       1850.0,
       1695.0,
       1600.0
      ]
     },
     {
      "name": {
       "en": "Goods + transport",
       "am": "ዕቃዎች + ትራንስፖርት"
      },
      "slot": 2,
      "v": [
       1850.0,
       1755.0,
       1780.0
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
       "en": "Goods",
       "am": "ዕቃዎች"
      },
      {
       "en": "Goods + transport",
       "am": "ዕቃዎች + ትራንስፖርት"
      }
     ],
     "rows": [
      [
       "Village",
       1850.0,
       1850.0
      ],
      [
       "Town",
       1695.0,
       1755.0
      ],
      [
       "City",
       1600.0,
       1780.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The city has the cheapest goods, but transport (180 birr) eats much of the saving.",
    "Including transport, the cheapest is Town (1755 birr).",
    "For a smaller basket the village wins, because transport is a fixed cost."
   ],
   "am": [
    "ከተማው በጣም ርካሽ ዕቃዎች አሉት፤ ግን ትራንስፖርት (180 ብር) ቁጠባውን በብዛት ይበላል።",
    "ትራንስፖርትን ጨምሮ በጣም ርካሹ Town ነው (1755 ብር)።",
    "ለትንሽ ቅርጫት መንደሩ ያሸንፋል፣ ትራንስፖርት ቋሚ ወጪ ስለሆነ።"
   ]
  },
  "decision": {
   "en": "Buy the monthly basket in Town; buy small top-ups in the village. Re-check prices every month.",
   "am": "ወርሃዊውን ቅርጫት በTown ግዛ፤ ትናንሽ ተጨማሪዎችን በመንደሩ ግዛ። ዋጋዎችን በየወሩ እንደገና ፈትሽ።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Rain gauge to planting decision",
   "am": "ከዝናብ መለኪያ ወደ የመዝሪያ ውሳኔ"
  },
  "goal": {
   "en": "Build a bottle rain gauge, record three weeks of rain, analyse it in a spreadsheet and Python, and advise when to plant.",
   "am": "የጠርሙስ የዝናብ መለኪያ ገንባ፣ የሦስት ሳምንታት ዝናብ መዝግብ፣ በስፕሬድሺትና በPython ተንትነው፣ መቼ እንደሚዘራ ምከር።"
  },
  "time": {
   "en": "3 weeks · 15 min daily + 2 lessons",
   "am": "3 ሳምንታት · በቀን 15 ደቂቃ + 2 ትምህርቶች"
  },
  "tools": [
   {
    "name": "Plastic bottle, ruler, tape",
    "why": {
     "en": "the rain gauge",
     "am": "የዝናብ መለኪያው"
    },
    "get": "recycled bottle"
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
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   }
  ],
  "steps": {
   "en": [
    "Cut the top off a straight-sided bottle, invert it as a funnel, tape a ruler to the side.",
    "Every morning at 8:00 read the water level in mm, write it down, then empty the bottle.",
    "Enter the 21 days into a spreadsheet: day, rain_mm.",
    "In Python, compute weekly totals and a 3-day moving total.",
    "Plot daily rain and the 3-day total; apply the planting rule."
   ],
   "am": [
    "ቀጥ ያለ ጎን ያለውን ጠርሙስ አናቱን ቁረጥ፣ እንደ ፈንገስ ገልብጠው፣ በጎኑ ላይ ማስመሪያ በፕላስተር አጣብቅ።",
    "በየጠዋቱ 8፡00 ላይ የውሃውን መጠን በmm አንብብ፣ ጻፈው፣ ከዚያ ጠርሙሱን ባዶ አድርግ።",
    "21ዱን ቀናት ወደ ስፕሬድሺት አስገባ፡ day፣ rain_mm።",
    "በPython ሳምንታዊ ድምሮችንና የ3-ቀን ተንቀሳቃሽ ድምር አስላ።",
    "የዕለት ዝናብንና የ3-ቀን ድምሩን ቻርት አድርግ፤ የመዝሪያ ሕጉን ተግብር።"
   ]
  },
  "code": "rain = [0, 0, 2, 0, 5, 0, 0, 1, 0, 8, 12, 3, 0, 0, 6, 14, 9, 11, 2, 0, 7]   # mm, 21 mornings\nweeks = [sum(rain[i:i + 7]) for i in range(0, 21, 7)]\nmoving3 = [sum(rain[max(0, d - 2):d + 1]) for d in range(21)]\nRULE = 20     # local rule of thumb: plant when 3 days bring at least 20 mm and the soil is wet a hand deep\nready = [d + 1 for d, m in enumerate(moving3) if m >= RULE]\nprint(\"weekly totals (mm):\", weeks)\nprint(\"days with a 3-day total >= 20 mm:\", ready)\nfirst = ready[0] if ready else None",
  "out": "weekly totals (mm): [7, 24, 49]\ndays with a 3-day total >= 20 mm: [11, 12, 16, 17, 18, 19]",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Daily rain and the 3-day total",
     "am": "የዕለት ዝናብና የ3-ቀን ድምር"
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
      "en": "mm",
      "am": "mm"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Daily rain",
       "am": "የዕለት ዝናብ"
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
       20.0,
       21.0
      ],
      "y": [
       0.0,
       0.0,
       2.0,
       0.0,
       5.0,
       0.0,
       0.0,
       1.0,
       0.0,
       8.0,
       12.0,
       3.0,
       0.0,
       0.0,
       6.0,
       14.0,
       9.0,
       11.0,
       2.0,
       0.0,
       7.0
      ],
      "tip": [
       "0|Daily rain · 1",
       "0|Daily rain · 2",
       "2|Daily rain · 3",
       "0|Daily rain · 4",
       "5|Daily rain · 5",
       "0|Daily rain · 6",
       "0|Daily rain · 7",
       "1|Daily rain · 8",
       "0|Daily rain · 9",
       "8|Daily rain · 10",
       "12|Daily rain · 11",
       "3|Daily rain · 12",
       "0|Daily rain · 13",
       "0|Daily rain · 14",
       "6|Daily rain · 15",
       "14|Daily rain · 16",
       "9|Daily rain · 17",
       "11|Daily rain · 18",
       "2|Daily rain · 19",
       "0|Daily rain · 20",
       "7|Daily rain · 21"
      ],
      "endlabel": {
       "en": "Daily rain",
       "am": "የዕለት ዝናብ"
      }
     },
     {
      "name": {
       "en": "3-day total",
       "am": "የ3-ቀን ድምር"
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
       20.0,
       21.0
      ],
      "y": [
       0.0,
       0.0,
       2.0,
       2.0,
       7.0,
       5.0,
       5.0,
       1.0,
       1.0,
       9.0,
       20.0,
       23.0,
       15.0,
       3.0,
       6.0,
       20.0,
       29.0,
       34.0,
       22.0,
       13.0,
       9.0
      ],
      "tip": [
       "0|3-day total · 1",
       "0|3-day total · 2",
       "2|3-day total · 3",
       "2|3-day total · 4",
       "7|3-day total · 5",
       "5|3-day total · 6",
       "5|3-day total · 7",
       "1|3-day total · 8",
       "1|3-day total · 9",
       "9|3-day total · 10",
       "20|3-day total · 11",
       "23|3-day total · 12",
       "15|3-day total · 13",
       "3|3-day total · 14",
       "6|3-day total · 15",
       "20|3-day total · 16",
       "29|3-day total · 17",
       "34|3-day total · 18",
       "22|3-day total · 19",
       "13|3-day total · 20",
       "9|3-day total · 21"
      ],
      "endlabel": {
       "en": "3-day total",
       "am": "የ3-ቀን ድምር"
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
       "en": "Daily rain",
       "am": "የዕለት ዝናብ"
      },
      {
       "en": "3-day total",
       "am": "የ3-ቀን ድምር"
      }
     ],
     "rows": [
      [
       1.0,
       0.0,
       0.0
      ],
      [
       2.0,
       0.0,
       0.0
      ],
      [
       3.0,
       2.0,
       2.0
      ],
      [
       4.0,
       0.0,
       2.0
      ],
      [
       5.0,
       5.0,
       7.0
      ],
      [
       6.0,
       0.0,
       5.0
      ],
      [
       7.0,
       0.0,
       5.0
      ],
      [
       8.0,
       1.0,
       1.0
      ],
      [
       9.0,
       0.0,
       1.0
      ],
      [
       10.0,
       8.0,
       9.0
      ],
      [
       11.0,
       12.0,
       20.0
      ],
      [
       12.0,
       3.0,
       23.0
      ],
      [
       13.0,
       0.0,
       15.0
      ],
      [
       14.0,
       0.0,
       3.0
      ],
      [
       15.0,
       6.0,
       6.0
      ],
      [
       16.0,
       14.0,
       20.0
      ],
      [
       17.0,
       9.0,
       29.0
      ],
      [
       18.0,
       11.0,
       34.0
      ],
      [
       19.0,
       2.0,
       22.0
      ],
      [
       20.0,
       0.0,
       13.0
      ],
      [
       21.0,
       7.0,
       9.0
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 20,
      "label": {
       "en": "planting threshold 20 mm",
       "am": "የመዝሪያ ወሰን 20 mm"
      }
     }
    ],
    "rpad": 90
   },
   {
    "type": "hbar",
    "title": {
     "en": "Weekly rain totals",
     "am": "ሳምንታዊ የዝናብ ድምሮች"
    },
    "x": {
     "label": {
      "en": "mm",
      "am": "mm"
     }
    },
    "fmt": 0,
    "cats": [
     "Week 1",
     "Week 2",
     "Week 3"
    ],
    "series": [
     {
      "name": {
       "en": "mm",
       "am": "mm"
      },
      "slot": 1,
      "v": [
       7.0,
       24.0,
       49.0
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
       "en": "mm",
       "am": "mm"
      }
     ],
     "rows": [
      [
       "Week 1",
       7.0
      ],
      [
       "Week 2",
       24.0
      ],
      [
       "Week 3",
       49.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Weekly rain rose from 7 to 49 mm: the main rains are starting.",
    "The 3-day total first reached 20 mm on day 11.",
    "Single wet days in week 1 were false starts: planting then risks seeds drying out."
   ],
   "am": [
    "ሳምንታዊ ዝናብ ከ7 ወደ 49 mm ጨመረ፡ ዋናው ዝናብ እየጀመረ ነው።",
    "የ3-ቀን ድምሩ ለመጀመሪያ ጊዜ 20 mm የደረሰው በቀን 11 ነው።",
    "በሳምንት 1 ያሉ ነጠላ እርጥብ ቀናት የሐሰት ጅምሮች ነበሩ፡ ያኔ መዝራት ዘሮች እንዲደርቁ ያጋልጣል።"
   ]
  },
  "decision": {
   "en": "Advise planting from day 11 after checking the soil is wet a hand deep; keep recording, and compare with the extension office forecast.",
   "am": "አፈሩ የእጅ ጥልቀት ያህል እርጥብ መሆኑን ካረጋገጣችሁ በኋላ ከቀን 11 ጀምሮ እንዲዘራ ምከሩ፤ መመዝገብ ቀጥሉ፣ ከኤክስቴንሽን ቢሮ ትንበያ ጋርም አወዳድሩ።"
  },
  "note": {
   "en": "The 20 mm rule is a simple teaching rule; use your local extension office’s recommendation.",
   "am": "የ20 mm ሕጉ ቀላል የማስተማሪያ ሕግ ነው፤ የአካባቢህን የኤክስቴንሽን ቢሮ ምክረ ሐሳብ ተጠቀም።"
  }
 },
 {
  "title": {
   "en": "Class survey website with a data file",
   "am": "ከዳታ ፋይል ጋር የክፍል ጥናት ድረ ገጽ"
  },
  "goal": {
   "en": "Run a class survey, save it as CSV, analyse it in Python and publish the results on your HTML page.",
   "am": "የክፍል ጥናት አካሂድ፣ እንደ CSV አስቀምጠው፣ በPython ተንትነው፣ ውጤቶቹንም በHTML ገጽህ ላይ አትም።"
  },
  "time": {
   "en": "2 weeks · 3 h per week",
   "am": "2 ሳምንታት · በሳምንት 3 ሰዓት"
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
    "name": "Text editor + browser",
    "why": {
     "en": "build the results web page",
     "am": "የውጤቶች ድረ ገጹን ገንባ"
    },
    "get": "any computer, works offline"
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
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   }
  ],
  "steps": {
   "en": [
    "Agree 3 questions: how you travel to school, minutes of travel, favourite crop to eat.",
    "Collect answers from 30 pupils into survey.csv.",
    "In Python: load the CSV, count answers, compute average travel time per transport type.",
    "Save a chart as results.png and write results.html with a heading, the chart and three findings.",
    "Present the page to the class and agree one action."
   ],
   "am": [
    "በ3 ጥያቄዎች ተስማሙ፡ ወደ ትምህርት ቤት እንዴት እንደምትመጣ፣ የጉዞ ደቂቃዎች፣ ለመብላት የምትወደው ሰብል።",
    "ከ30 ተማሪዎች መልሶችን ወደ survey.csv ሰብስብ።",
    "በPython፡ CSVውን ጫን፣ መልሶችን ቁጠር፣ በትራንስፖርት ዓይነት አማካይ የጉዞ ጊዜን አስላ።",
    "ቻርትን እንደ results.png አስቀምጥና ርዕስ፣ ቻርቱንና ሦስት ግኝቶችን የያዘ results.html ጻፍ።",
    "ገጹን ለክፍሉ አቅርብና በአንድ እርምጃ ተስማሙ።"
   ]
  },
  "code": "import csv, io, statistics\ndata = \"\"\"travel,minutes,crop\nwalk,25,teff\nwalk,40,maize\nwalk,15,teff\nbicycle,12,teff\nwalk,55,potato\nbajaj,10,teff\nwalk,35,maize\nbicycle,18,teff\nwalk,60,teff\nwalk,30,potato\nbajaj,8,maize\nwalk,45,teff\"\"\"                       # in class: open(\"survey.csv\")\nrows = list(csv.DictReader(io.StringIO(data)))\nby_travel = {}\nfor r in rows:\n    by_travel.setdefault(r[\"travel\"], []).append(int(r[\"minutes\"]))\nfor t, mins in by_travel.items():\n    print(f\"{t:8s} {len(mins):2d} pupils, average {statistics.mean(mins):4.1f} min, longest {max(mins)} min\")\nlong_walkers = sum(1 for r in rows if r[\"travel\"] == \"walk\" and int(r[\"minutes\"]) >= 45)\nprint(\"pupils walking 45 minutes or more:\", long_walkers)\nhtml = f\"<h1>How we travel to school</h1><img src='results.png' alt='Average travel time by transport'><p>{long_walkers} pupils walk 45 minutes or more.</p>\"\nopen(\"results.html\", \"w\").write(html)",
  "out": "walk      8 pupils, average 38.1 min, longest 60 min\nbicycle   2 pupils, average 15.0 min, longest 18 min\nbajaj     2 pupils, average  9.0 min, longest 10 min\npupils walking 45 minutes or more: 3",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Average travel time to school (minutes)",
     "am": "ወደ ትምህርት ቤት አማካይ የጉዞ ጊዜ (ደቂቃዎች)"
    },
    "x": {
     "label": {
      "en": "Minutes",
      "am": "ደቂቃዎች"
     }
    },
    "fmt": 0,
    "cats": [
     "walk",
     "bicycle",
     "bajaj"
    ],
    "series": [
     {
      "name": {
       "en": "Minutes",
       "am": "ደቂቃዎች"
      },
      "slot": 1,
      "v": [
       38.0,
       15.0,
       9.0
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
       "en": "Minutes",
       "am": "ደቂቃዎች"
      }
     ],
     "rows": [
      [
       "walk",
       38.0
      ],
      [
       "bicycle",
       15.0
      ],
      [
       "bajaj",
       9.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Walkers spend on average 38 minutes, three times more than bicycle riders.",
    "3 pupils walk 45 minutes or more each way.",
    "This is a small example sample: a full class survey gives a fairer picture."
   ],
   "am": [
    "በእግር የሚመጡ በአማካይ 38 ደቂቃዎች ያሳልፋሉ፣ ከብስክሌት ነጂዎች ሦስት እጥፍ።",
    "3 ተማሪዎች በእያንዳንዱ አቅጣጫ 45 ደቂቃ ወይም ከዚያ በላይ ይራመዳሉ።",
    "ይህ ትንሽ የምሳሌ ናሙና ነው፡ ሙሉ የክፍል ጥናት ይበልጥ ፍትሐዊ ሥዕል ይሰጣል።"
   ]
  },
  "decision": {
   "en": "Share the page with the school director and propose letting long-distance walkers start 15 minutes later or join a walking group; repeat the survey next term to see if anything changed.",
   "am": "ገጹን ለትምህርት ቤቱ ዳይሬክተር አጋራና ረጅም ርቀት የሚራመዱ 15 ደቂቃ ዘግይተው እንዲጀምሩ ወይም የእግር ጉዞ ቡድን እንዲቀላቀሉ አቅርብ፤ የተለወጠ ነገር እንዳለ ለማየት ጥናቱን በሚቀጥለው ሴሚስተር ድገም።"
  },
  "note": {
   "en": "The numbers are example class results; replace them with your own class’s results.",
   "am": "ቁጥሮቹ የምሳሌ የክፍል ውጤቶች ናቸው፤ በራስህ ክፍል ውጤቶች ተካቸው።"
  }
 },
 {
  "title": {
   "en": "Smart garden monitor: from sensor to irrigation schedule",
   "am": "ብልህ የአትክልት መከታተያ፡ ከሴንሰር ወደ የመስኖ መርሐ ግብር"
  },
  "goal": {
   "en": "Log soil moisture for a week with a low-cost board, find when the soil dries, and set a watering schedule that saves water.",
   "am": "በርካሽ ቦርድ ለአንድ ሳምንት የአፈር እርጥበትን መዝግብ፣ አፈሩ መቼ እንደሚደርቅ ፈልግ፣ ውሃ የሚያድን የመጠጫ መርሐ ግብር አዘጋጅ።"
  },
  "time": {
   "en": "2 weeks",
   "am": "2 ሳምንታት"
  },
  "tools": [
   {
    "name": "Arduino Uno or Raspberry Pi Pico",
    "why": {
     "en": "reads the sensor and logs data",
     "am": "ሴንሰሩን ያነባል፣ ዳታን ይመዘግባል"
    },
    "get": "about 10–25 USD"
   },
   {
    "name": "Capacitive soil-moisture sensor",
    "why": {
     "en": "measures soil water",
     "am": "የአፈር ውሃን ይለካል"
    },
    "get": "about 2–5 USD"
   },
   {
    "name": "Solar power bank",
    "why": {
     "en": "power without the grid",
     "am": "ያለ ኤሌክትሪክ መስመር ኃይል"
    },
    "get": "local electronics shop"
   },
   {
    "name": "Python 3",
    "why": {
     "en": "runs the analysis code",
     "am": "የትንተናውን ኮድ ያስኬዳል"
    },
    "get": "python.org, Thonny (offline installer) or a phone app such as Pydroid"
   },
   {
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   }
  ],
  "steps": {
   "en": [
    "Calibrate: record the raw reading in dry soil and just after watering.",
    "Log a reading every hour for 7 days to a CSV file (time, raw).",
    "Convert raw readings to % moisture with the calibration.",
    "Plot moisture over time; mark when it drops below 30%.",
    "Compare \"water every day\" with \"water when below 30%\"."
   ],
   "am": [
    "አስተካክል፡ በደረቅ አፈርና ልክ ውሃ ካጠጣህ በኋላ ጥሬ ንባቡን መዝግብ።",
    "ለ7 ቀናት በየሰዓቱ ንባብን ወደ CSV ፋይል መዝግብ (time፣ raw)።",
    "በማስተካከያው ጥሬ ንባቦችን ወደ % እርጥበት ቀይር።",
    "እርጥበትን በጊዜ ሂደት ቻርት አድርግ፤ ከ30% በታች ሲወርድ ምልክት አድርግ።",
    "«በየቀኑ አጠጣ»ን ከ«ከ30% በታች ሲሆን አጠጣ» ጋር አወዳድር።"
   ]
  },
  "code": "import numpy as np\nDRY, WET = 820, 380\nrng = np.random.default_rng(4)\nhours = np.arange(0, 7 * 24, 6)                       # one reading every 6 hours shown (hourly in class)\nmoisture, m, waterings = [], 70.0, []\nfor h in hours:\n    hot = 2.6 if (h % 24) in (12, 18) else 1.0       # drying is faster in the afternoon\n    m -= hot * 2.2 + rng.normal(0, 0.5)\n    if m < 30:\n        waterings.append(int(h)); m = 85.0\n    moisture.append(round(m, 1))\nraw = [round(DRY - p / 100 * (DRY - WET)) for p in moisture]\nprint(\"first readings (raw -> %):\", list(zip(raw[:4], moisture[:4])))\nprint(f\"waterings needed in 7 days with the 30% rule: {len(waterings)} (at hours {waterings})\")\nlitres_per_watering = 20\nprint(f\"water used: rule {len(waterings) * litres_per_watering} L vs every day {7 * litres_per_watering} L\")",
  "out": "first readings (raw -> %): [(520, 68.1), (530, 66.0), (558, 59.5), (585, 53.4)]\nwaterings needed in 7 days with the 30% rule: 2 (at hours [60, 144])\nwater used: rule 40 L vs every day 140 L",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Soil moisture over 7 days",
     "am": "በ7 ቀናት ውስጥ የአፈር እርጥበት"
    },
    "x": {
     "label": {
      "en": "Day",
      "am": "ቀን"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Moisture (%)",
      "am": "እርጥበት (%)"
     },
     "min": 0,
     "max": 100
    },
    "series": [
     {
      "name": {
       "en": "Moisture %",
       "am": "እርጥበት %"
      },
      "slot": 1,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       0.25,
       0.5,
       0.75,
       1.0,
       1.25,
       1.5,
       1.75,
       2.0,
       2.25,
       2.5,
       2.75,
       3.0,
       3.25,
       3.5,
       3.75,
       4.0,
       4.25,
       4.5,
       4.75,
       5.0,
       5.25,
       5.5,
       5.75,
       6.0,
       6.25,
       6.5,
       6.75
      ],
      "y": [
       68.1,
       66.0,
       59.5,
       53.4,
       52.0,
       49.8,
       44.4,
       38.6,
       37.2,
       34.9,
       85.0,
       78.5,
       76.1,
       73.7,
       68.7,
       61.9,
       60.6,
       57.9,
       52.3,
       47.0,
       45.2,
       43.3,
       37.4,
       31.7,
       85.0,
       83.7,
       78.0,
       72.7
      ],
      "tip": [
       "68.1|Moisture % · 0",
       "66|Moisture % · 0.25",
       "59.5|Moisture % · 0.5",
       "53.4|Moisture % · 0.75",
       "52|Moisture % · 1",
       "49.8|Moisture % · 1.25",
       "44.4|Moisture % · 1.5",
       "38.6|Moisture % · 1.75",
       "37.2|Moisture % · 2",
       "34.9|Moisture % · 2.25",
       "85|Moisture % · 2.5",
       "78.5|Moisture % · 2.75",
       "76.1|Moisture % · 3",
       "73.7|Moisture % · 3.25",
       "68.7|Moisture % · 3.5",
       "61.9|Moisture % · 3.75",
       "60.6|Moisture % · 4",
       "57.9|Moisture % · 4.25",
       "52.3|Moisture % · 4.5",
       "47|Moisture % · 4.75",
       "45.2|Moisture % · 5",
       "43.3|Moisture % · 5.25",
       "37.4|Moisture % · 5.5",
       "31.7|Moisture % · 5.75",
       "85|Moisture % · 6",
       "83.7|Moisture % · 6.25",
       "78|Moisture % · 6.5",
       "72.7|Moisture % · 6.75"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Day",
       "am": "ቀን"
      },
      {
       "en": "Moisture %",
       "am": "እርጥበት %"
      }
     ],
     "rows": [
      [
       0.0,
       68.1
      ],
      [
       0.25,
       66.0
      ],
      [
       0.5,
       59.5
      ],
      [
       0.75,
       53.4
      ],
      [
       1.0,
       52.0
      ],
      [
       1.25,
       49.8
      ],
      [
       1.5,
       44.4
      ],
      [
       1.75,
       38.6
      ],
      [
       2.0,
       37.2
      ],
      [
       2.25,
       34.9
      ],
      [
       2.5,
       85.0
      ],
      [
       2.75,
       78.5
      ],
      [
       3.0,
       76.1
      ],
      [
       3.25,
       73.7
      ],
      [
       3.5,
       68.7
      ],
      [
       3.75,
       61.9
      ],
      [
       4.0,
       60.6
      ],
      [
       4.25,
       57.9
      ],
      [
       4.5,
       52.3
      ],
      [
       4.75,
       47.0
      ],
      [
       5.0,
       45.2
      ],
      [
       5.25,
       43.3
      ],
      [
       5.5,
       37.4
      ],
      [
       5.75,
       31.7
      ],
      [
       6.0,
       85.0
      ],
      [
       6.25,
       83.7
      ],
      [
       6.5,
       78.0
      ],
      [
       6.75,
       72.7
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 30,
      "label": {
       "en": "water below 30%",
       "am": "ከ30% በታች አጠጣ"
      }
     }
    ]
   },
   {
    "type": "hbar",
    "title": {
     "en": "Water used in one week",
     "am": "በአንድ ሳምንት የተጠቀመ ውሃ"
    },
    "x": {
     "label": {
      "en": "Litres",
      "am": "ሊትሮች"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "30% rule",
      "am": "የ30% ሕግ"
     },
     {
      "en": "Every day",
      "am": "በየቀኑ"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Litres",
       "am": "ሊትሮች"
      },
      "slot": 1,
      "v": [
       40.0,
       140.0
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
       "en": "Litres",
       "am": "ሊትሮች"
      }
     ],
     "rows": [
      [
       {
        "en": "30% rule",
        "am": "የ30% ሕግ"
       },
       40.0
      ],
      [
       {
        "en": "Every day",
        "am": "በየቀኑ"
       },
       140.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The soil fell below 30% 2 times in 7 days.",
    "It dries fastest in the afternoon, so readings at 12:00–18:00 drop most.",
    "Watering only when needed uses 40 L instead of 140 L."
   ],
   "am": [
    "አፈሩ በ7 ቀናት ውስጥ 2 ጊዜ ከ30% በታች ወርዷል።",
    "በከሰዓት በኋላ በፍጥነት ይደርቃል፤ ስለዚህ በ12፡00–18፡00 ያሉ ንባቦች በብዛት ይወርዳሉ።",
    "ሲያስፈልግ ብቻ ማጠጣት ከ140 L ይልቅ 40 L ይጠቀማል።"
   ]
  },
  "decision": {
   "en": "Water in the early morning only when the reading is below 30%; check the sensor against a hand-feel test once a week, and recalibrate if they disagree.",
   "am": "ንባቡ ከ30% በታች ሲሆን ብቻ በማለዳ አጠጣ፤ ሴንሰሩን በሳምንት አንድ ጊዜ ከእጅ-ስሜት ፈተና ጋር ፈትሸው፣ ካልተስማሙ እንደገና አስተካክል።"
  },
  "note": {
   "en": "Simulated readings with realistic daily drying; your garden’s numbers will differ.",
   "am": "ተጨባጭ የዕለት መድረቅ ያላቸው የተመሰሉ ንባቦች፤ የአትክልት ቦታህ ቁጥሮች ይለያያሉ።"
  }
 }
];
