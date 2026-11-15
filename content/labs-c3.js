/* Practical labs, track c, level 3. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[3] = [
 {
  "title": {
   "en": "Cooperative yield records: classes and pandas",
   "am": "የማኅበር የምርት መዝገቦች፡ classes እና pandas"
  },
  "goal": {
   "en": "Model 40 member farms with a Farm class, analyse yields with pandas, and choose which farms the extension agent should visit first.",
   "am": "40 አባል እርሻዎችን በFarm class ሞዴል አድርግ፣ ምርቶችን በpandas ተንትን፣ የኤክስቴንሽን ሠራተኛው መጀመሪያ የትኞቹን እርሻዎች መጎብኘት እንዳለበት ምረጥ።"
  },
  "time": {
   "en": "1–2 weeks",
   "am": "1–2 ሳምንታት"
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
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   },
   {
    "name": "Git + GitHub",
    "why": {
     "en": "version control and sharing",
     "am": "የስሪት ቁጥጥርና ማጋራት"
    },
    "get": "git-scm.com, github.com (free)"
   }
  ],
  "steps": {
   "en": [
    "Create farm records: id, kebele, crop, area, harvest, fertilizer used (yes/no).",
    "Write a Farm class with a yield_t_ha() method; build 40 objects.",
    "Convert the objects to a pandas DataFrame.",
    "Compare yield by crop and by fertilizer use with groupby.",
    "List teff farms below the teff median: the visit list."
   ],
   "am": [
    "የእርሻ መዝገቦችን ፍጠር፡ id፣ ቀበሌ፣ ሰብል፣ ስፋት፣ ምርት፣ ማዳበሪያ ተጠቅሟል (አዎ/አይደለም)።",
    "yield_t_ha() method ያለው Farm class ጻፍ፤ 40 objects ገንባ።",
    "objectsኡን ወደ pandas DataFrame ቀይር።",
    "ምርትን በሰብልና በማዳበሪያ አጠቃቀም በgroupby አወዳድር።",
    "ከጤፍ median በታች ያሉ የጤፍ እርሻዎችን ዘርዝር፡ የጉብኝት ዝርዝሩ።"
   ]
  },
  "code": "import numpy as np, pandas as pd\nrng = np.random.default_rng(9)\nclass Farm:\n    def __init__(self, fid, kebele, crop, area_ha, harvest_t, fertilizer):\n        self.fid, self.kebele, self.crop, self.area_ha, self.harvest_t, self.fertilizer = fid, kebele, crop, area_ha, harvest_t, fertilizer\n    def yield_t_ha(self):\n        return self.harvest_t / self.area_ha\nbase = {\"teff\": 1.6, \"maize\": 4.0, \"wheat\": 2.6}\nfarms = []\nfor i in range(40):\n    crop = rng.choice(list(base), p=[0.5, 0.3, 0.2]); fert = rng.random() < 0.6; area = round(rng.uniform(0.25, 1.5), 2)\n    y = base[crop] * (1.25 if fert else 0.9) * rng.normal(1, 0.15)\n    farms.append(Farm(f\"F{i + 1:02d}\", rng.choice([\"Zenzelma\", \"Sebatamit\", \"Meshenti\"]), crop, area, round(y * area, 2), fert))\ndf = pd.DataFrame([{**vars(f), \"t_ha\": round(f.yield_t_ha(), 2)} for f in farms])\nsummary = df.groupby([\"crop\", \"fertilizer\"]).t_ha.mean().unstack().round(2)\nprint(summary)\nteff = df[df.crop == \"teff\"]; median = teff.t_ha.median()\nvisit = teff[teff.t_ha < median].sort_values(\"t_ha\")[[\"fid\", \"kebele\", \"t_ha\", \"fertilizer\"]]\nprint(f\"teff median {median:.2f} t/ha; visit list ({len(visit)} farms):\"); print(visit.to_string(index=False))\nshare_nofert = (~visit.fertilizer).mean()",
  "out": "fertilizer  False  True \ncrop                    \nmaize        3.65   4.86\nteff         1.33   2.03\nwheat        2.63   3.32\nteff median 1.59 t/ha; visit list (9 farms):\nfid    kebele  t_ha  fertilizer\nF32  Zenzelma  1.02       False\nF14  Zenzelma  1.12       False\nF22 Sebatamit  1.23       False\nF19  Meshenti  1.34       False\nF09  Zenzelma  1.36       False\nF23  Meshenti  1.40       False\nF33  Meshenti  1.46       False\nF05  Meshenti  1.48       False\nF08 Sebatamit  1.55       False",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Mean yield by crop and fertilizer use (t/ha)",
     "am": "አማካይ ምርት በሰብልና በማዳበሪያ አጠቃቀም (t/ha)"
    },
    "x": {
     "label": "t/ha"
    },
    "fmt": 2,
    "cats": [
     "maize",
     "teff",
     "wheat"
    ],
    "series": [
     {
      "name": {
       "en": "No fertilizer",
       "am": "ማዳበሪያ የለም"
      },
      "slot": 2,
      "v": [
       3.65,
       1.33,
       2.63
      ]
     },
     {
      "name": {
       "en": "With fertilizer",
       "am": "ከማዳበሪያ ጋር"
      },
      "slot": 1,
      "v": [
       4.86,
       2.03,
       3.32
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
       "en": "No fertilizer",
       "am": "ማዳበሪያ የለም"
      },
      {
       "en": "With fertilizer",
       "am": "ከማዳበሪያ ጋር"
      }
     ],
     "rows": [
      [
       "maize",
       3.65,
       4.86
      ],
      [
       "teff",
       1.33,
       2.03
      ],
      [
       "wheat",
       2.63,
       3.32
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Every crop yields more with fertilizer; teff: 2.03 vs 1.33 t/ha.",
    "9 teff farms are below the median of 1.59 t/ha.",
    "100% of the farms on the visit list used no fertilizer: the most likely cause to address."
   ],
   "am": [
    "እያንዳንዱ ሰብል ከማዳበሪያ ጋር ብዙ ምርት ይሰጣል፤ ጤፍ፡ 2.03 vs 1.33 t/ha።",
    "9 የጤፍ እርሻዎች ከ1.59 t/ha median በታች ናቸው።",
    "በጉብኝት ዝርዝሩ ላይ ካሉት እርሻዎች 100% ማዳበሪያ አልተጠቀሙም፡ ሊፈታ የሚገባው በጣም ሊሆን የሚችለው ምክንያት።"
   ]
  },
  "decision": {
   "en": "Visit the listed teff farms first, starting with those without fertilizer; offer input credit and record next season’s yields to check the effect.",
   "am": "የተዘረዘሩትን የጤፍ እርሻዎች መጀመሪያ ጎብኝ፣ ማዳበሪያ ከሌላቸው ጀምር፤ የግብዓት ብድር አቅርብ፣ ውጤቱን ለመፈተሽም የሚቀጥለውን ወቅት ምርት መዝግብ።"
  },
  "note": {
   "en": "Simulated records; fertilizer users may also differ in other ways (wealth, land), so the visit tests the cause rather than assumes it.",
   "am": "የተመሰሉ መዝገቦች፤ ማዳበሪያ ተጠቃሚዎች በሌሎች መንገዶችም (ሀብት፣ መሬት) ሊለያዩ ይችላሉ፤ ስለዚህ ጉብኝቱ ምክንያቱን ይፈትናል እንጂ አይገምትም።"
  }
 },
 {
  "title": {
   "en": "Algorithm benchmark for a price-lookup service",
   "am": "ለየዋጋ ፍለጋ አገልግሎት የalgorithm መለኪያ"
  },
  "goal": {
   "en": "Count the work done by linear vs binary search and bubble vs merge sort as data grow, and pick the algorithms for a service with 100,000 prices.",
   "am": "ዳታው ሲያድግ በlinear vs binary search እና በbubble vs merge sort የሚሠራውን ሥራ ቁጠር፣ 100,000 ዋጋዎች ላለው አገልግሎት algorithmsን ምረጥ።"
  },
  "time": {
   "en": "1–2 weeks",
   "am": "1–2 ሳምንታት"
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
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   },
   {
    "name": "Git + GitHub",
    "why": {
     "en": "version control and sharing",
     "am": "የስሪት ቁጥጥርና ማጋራት"
    },
    "get": "git-scm.com, github.com (free)"
   }
  ],
  "steps": {
   "en": [
    "Write linear_search, binary_search, bubble_sort and merge_sort that count comparisons.",
    "Run them on random price lists of size 100, 400, 1,600 and 6,400.",
    "Record comparisons in a table.",
    "Plot comparisons against list size.",
    "Estimate the work for 100,000 items and choose."
   ],
   "am": [
    "ንጽጽሮችን የሚቆጥሩ linear_search፣ binary_search፣ bubble_sort እና merge_sort ጻፍ።",
    "በ100፣ 400፣ 1,600 እና 6,400 መጠን ባሉ የዘፈቀደ የዋጋ ዝርዝሮች ላይ አስኪዳቸው።",
    "ንጽጽሮችን በሰንጠረዥ መዝግብ።",
    "ንጽጽሮችን ከዝርዝር መጠን አንፃር ቻርት አድርግ።",
    "ለ100,000 ንጥሎች ሥራውን ገምትና ምረጥ።"
   ]
  },
  "code": "import random, math\nrandom.seed(3)\ndef linear(a, x):\n    for i, v in enumerate(a, 1):\n        if v == x: return i\n    return len(a)\ndef binary(a, x):\n    lo, hi, c = 0, len(a) - 1, 0\n    while lo <= hi:\n        c += 1; mid = (lo + hi) // 2\n        if a[mid] == x: return c\n        lo, hi = (mid + 1, hi) if a[mid] < x else (lo, mid - 1)\n    return c\ndef bubble_cmp(n): return n * (n - 1) // 2\ndef merge_cmp(a):\n    if len(a) <= 1: return a, 0\n    l, cl = merge_cmp(a[:len(a) // 2]); r, cr = merge_cmp(a[len(a) // 2:]); out, c, i, j = [], cl + cr, 0, 0\n    while i < len(l) and j < len(r):\n        c += 1\n        if l[i] <= r[j]: out.append(l[i]); i += 1\n        else: out.append(r[j]); j += 1\n    return out + l[i:] + r[j:], c\nsizes = [100, 400, 1600, 6400]; res = {\"linear\": [], \"binary\": [], \"bubble\": [], \"merge\": []}\nfor n in sizes:\n    a = sorted(random.sample(range(10 * n), n)); targets = random.sample(a, 50)\n    res[\"linear\"].append(sum(linear(a, t) for t in targets) / 50)\n    res[\"binary\"].append(sum(binary(a, t) for t in targets) / 50)\n    shuffled = random.sample(a, n); res[\"bubble\"].append(bubble_cmp(n)); res[\"merge\"].append(merge_cmp(shuffled)[1])\nfor k, v in res.items(): print(f\"{k:7s}\", [round(x) for x in v])\nN = 100_000\nprint(f\"for {N:,} items: linear ~{N / 2:,.0f}, binary ~{math.log2(N):.0f} comparisons per lookup; bubble ~{N * (N - 1) / 2:,.0f}, merge ~{N * math.log2(N):,.0f} comparisons per sort\")",
  "out": "linear  [47, 180, 774, 2678]\nbinary  [6, 8, 10, 11]\nbubble  [4950, 79800, 1279200, 20476800]\nmerge   [538, 2950, 15037, 72935]\nfor 100,000 items: linear ~50,000, binary ~17 comparisons per lookup; bubble ~4,999,950,000, merge ~1,660,964 comparisons per sort",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Comparisons per lookup",
     "am": "በአንድ ፍለጋ ንጽጽሮች"
    },
    "x": {
     "label": {
      "en": "List size",
      "am": "የዝርዝር መጠን"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Comparisons",
      "am": "ንጽጽሮች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Linear search",
       "am": "Linear search"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       100.0,
       400.0,
       1600.0,
       6400.0
      ],
      "y": [
       47.04,
       180.1,
       774.1,
       2677.54
      ],
      "tip": [
       "47.04|Linear search · 100",
       "180.1|Linear search · 400",
       "774.1|Linear search · 1600",
       "2678|Linear search · 6400"
      ],
      "endlabel": {
       "en": "Linear search",
       "am": "Linear search"
      }
     },
     {
      "name": {
       "en": "Binary search",
       "am": "Binary search"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       100.0,
       400.0,
       1600.0,
       6400.0
      ],
      "y": [
       5.84,
       7.86,
       10.12,
       11.46
      ],
      "tip": [
       "5.84|Binary search · 100",
       "7.86|Binary search · 400",
       "10.12|Binary search · 1600",
       "11.46|Binary search · 6400"
      ],
      "endlabel": {
       "en": "Binary search",
       "am": "Binary search"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "List size",
       "am": "የዝርዝር መጠን"
      },
      {
       "en": "Linear search",
       "am": "Linear search"
      },
      {
       "en": "Binary search",
       "am": "Binary search"
      }
     ],
     "rows": [
      [
       100.0,
       47.04,
       5.84
      ],
      [
       400.0,
       180.1,
       7.86
      ],
      [
       1600.0,
       774.1,
       10.12
      ],
      [
       6400.0,
       2677.54,
       11.46
      ]
     ]
    },
    "rpad": 90
   },
   {
    "type": "xy",
    "title": {
     "en": "Comparisons to sort (thousands)",
     "am": "ለመደርደር ንጽጽሮች (በሺዎች)"
    },
    "x": {
     "label": {
      "en": "List size",
      "am": "የዝርዝር መጠን"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Thousand comparisons",
      "am": "ሺህ ንጽጽሮች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Bubble sort",
       "am": "Bubble sort"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       100.0,
       400.0,
       1600.0,
       6400.0
      ],
      "y": [
       4.95,
       79.8,
       1279.2,
       20476.8
      ],
      "tip": [
       "4.95|Bubble sort · 100",
       "79.8|Bubble sort · 400",
       "1279|Bubble sort · 1600",
       "2.048e+04|Bubble sort · 6400"
      ],
      "endlabel": {
       "en": "Bubble sort",
       "am": "Bubble sort"
      }
     },
     {
      "name": {
       "en": "Merge sort",
       "am": "Merge sort"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       100.0,
       400.0,
       1600.0,
       6400.0
      ],
      "y": [
       0.538,
       2.95,
       15.037,
       72.935
      ],
      "tip": [
       "0.538|Merge sort · 100",
       "2.95|Merge sort · 400",
       "15.04|Merge sort · 1600",
       "72.94|Merge sort · 6400"
      ],
      "endlabel": {
       "en": "Merge sort",
       "am": "Merge sort"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "List size",
       "am": "የዝርዝር መጠን"
      },
      {
       "en": "Bubble sort",
       "am": "Bubble sort"
      },
      {
       "en": "Merge sort",
       "am": "Merge sort"
      }
     ],
     "rows": [
      [
       100.0,
       4.95,
       0.538
      ],
      [
       400.0,
       79.8,
       2.95
      ],
      [
       1600.0,
       1279.2,
       15.037
      ],
      [
       6400.0,
       20476.8,
       72.935
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "Linear search grows in step with the list (about n/2: 2678 at 6,400); binary search barely moves (11).",
    "Bubble sort needs 281 times more comparisons than merge sort at 6,400 items, and the gap keeps widening.",
    "At 100,000 items, bubble sort would take about 5 billion comparisons: unusable for a live service."
   ],
   "am": [
    "Linear search ከዝርዝሩ ጋር አብሮ ያድጋል (ወደ n/2፡ በ6,400 2678)፤ binary search ከሞላ ጎደል አይንቀሳቀስም (11)።",
    "በ6,400 ንጥሎች bubble sort ከmerge sort 281 እጥፍ ንጽጽሮች ያስፈልገዋል፤ ልዩነቱም እየሰፋ ይሄዳል።",
    "በ100,000 ንጥሎች bubble sort ወደ 5 ቢሊዮን ንጽጽሮች ይወስዳል፡ ለቀጥታ አገልግሎት ጥቅም የለውም።"
   ]
  },
  "decision": {
   "en": "Sort the price list once with the built-in sort (an n log n algorithm) whenever prices change, and answer lookups with binary search (Python’s bisect module) or a dictionary.",
   "am": "ዋጋዎች በተለወጡ ቁጥር የዋጋ ዝርዝሩን አብሮ በተሠራው sort (n log n algorithm) አንድ ጊዜ ደርድር፤ ፍለጋዎችን በbinary search (የPython bisect module) ወይም በdictionary መልስ።"
  }
 },
 {
  "title": {
   "en": "Market API with a database: does an index help?",
   "am": "ከዳታቤዝ ጋር የገበያ API፡ index ይረዳል?"
  },
  "goal": {
   "en": "Load 200,000 price reports into SQLite behind a Flask API, measure response times with and without an index, and decide what to index.",
   "am": "200,000 የዋጋ ሪፖርቶችን ከFlask API ጀርባ ወደ SQLite ጫን፣ ከindex ጋርና ያለ index የምላሽ ጊዜዎችን ለካ፣ ምን index እንደሚደረግ ወስን።"
  },
  "time": {
   "en": "1–2 weeks",
   "am": "1–2 ሳምንታት"
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
    "name": "Flask",
    "why": {
     "en": "the web API",
     "am": "የድር APIው"
    },
    "get": "pip install flask"
   },
   {
    "name": "SQLite",
    "why": {
     "en": "the database (built into Python)",
     "am": "ዳታቤዙ (በPython ውስጥ አብሮ የተሠራ)"
    },
    "get": "nothing to install"
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
    "Create tables markets and prices; insert 200,000 synthetic reports.",
    "Write GET /prices?crop=&market= returning the latest 10 prices as JSON.",
    "Call it 50 times with the test client and record the median time.",
    "Add an index on (crop, market, day) and repeat.",
    "Read EXPLAIN QUERY PLAN before and after."
   ],
   "am": [
    "markets እና prices ሰንጠረዦችን ፍጠር፤ 200,000 ሰው ሠራሽ ሪፖርቶችን አስገባ።",
    "የቅርብ 10 ዋጋዎችን እንደ JSON የሚመልስ GET /prices?crop=&market= ጻፍ።",
    "በtest client 50 ጊዜ ጥራውና median ጊዜውን መዝግብ።",
    "በ(crop፣ market፣ day) ላይ index ጨምርና ድገም።",
    "ከዚያ በፊትና በኋላ EXPLAIN QUERY PLANን አንብብ።"
   ]
  },
  "code": "import sqlite3, random, time, statistics\nfrom flask import Flask, jsonify, request\ndb = sqlite3.connect(\":memory:\", check_same_thread=False)\ndb.execute(\"CREATE TABLE prices(market TEXT, crop TEXT, day INTEGER, birr REAL)\")\nrandom.seed(1); markets = [f\"M{i:02d}\" for i in range(40)]; crops = [\"teff\", \"maize\", \"wheat\", \"sorghum\", \"barley\"]\ndb.executemany(\"INSERT INTO prices VALUES (?,?,?,?)\", ((random.choice(markets), random.choice(crops), random.randint(1, 730), round(random.uniform(30, 140), 1)) for _ in range(200_000)))\napp = Flask(__name__)\nQ = \"SELECT day, birr FROM prices WHERE crop = ? AND market = ? ORDER BY day DESC LIMIT 10\"\n@app.get(\"/prices\")\ndef prices():\n    rows = db.execute(Q, (request.args[\"crop\"], request.args[\"market\"])).fetchall()\n    return jsonify([{\"day\": d, \"birr\": b} for d, b in rows])\nclient = app.test_client()\ndef bench():\n    ts = []\n    for _ in range(50):\n        t = time.perf_counter(); r = client.get(f\"/prices?crop={random.choice(crops)}&market={random.choice(markets)}\"); ts.append((time.perf_counter() - t) * 1000)\n    return statistics.median(ts)\nplan = lambda: db.execute(\"EXPLAIN QUERY PLAN \" + Q, (\"teff\", \"M01\")).fetchone()[-1]\nbefore, p1 = bench(), plan()\ndb.execute(\"CREATE INDEX idx ON prices(crop, market, day)\")\nafter, p2 = bench(), plan()\nprint(f\"without index: {before:.1f} ms median | plan: {p1}\")\nprint(f\"with index:    {after:.2f} ms median | plan: {p2}\")\nprint(f\"speed-up: about {before / after:.0f}x\")",
  "out": "without index: 7.0 ms median | plan: SCAN prices\nwith index:    0.17 ms median | plan: SEARCH prices USING INDEX idx (crop=? AND market=?)\nspeed-up: about 43x",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Median API response time (ms)",
     "am": "Median የAPI ምላሽ ጊዜ (ms)"
    },
    "x": {
     "label": "ms"
    },
    "fmt": 2,
    "cats": [
     {
      "en": "No index",
      "am": "index የለም"
     },
     {
      "en": "Index on crop, market, day",
      "am": "በcrop፣ market፣ day ላይ index"
     }
    ],
    "series": [
     {
      "name": {
       "en": "ms",
       "am": "ms"
      },
      "slot": 1,
      "v": [
       7.04,
       0.17
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
       "en": "ms",
       "am": "ms"
      }
     ],
     "rows": [
      [
       {
        "en": "No index",
        "am": "index የለም"
       },
       7.04
      ],
      [
       {
        "en": "Index on crop, market, day",
        "am": "በcrop፣ market፣ day ላይ index"
       },
       0.17
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Without an index SQLite scans all 200,000 rows for every request (7.0 ms).",
    "With the index it jumps straight to the matching rows, already in day order (0.17 ms), about 43 times faster.",
    "The index costs disk space and slows inserts slightly: worth it, because reads far outnumber writes here."
   ],
   "am": [
    "ያለ index SQLite ለእያንዳንዱ ጥያቄ 200,000 ረድፎችን ሁሉ ይቃኛል (7.0 ms)።",
    "ከindex ጋር አስቀድመው በቀን ቅደም ተከተል ወዳሉት ተዛማጅ ረድፎች በቀጥታ ይዘላል (0.17 ms)፣ ወደ 43 እጥፍ ፈጣን።",
    "indexኡ የዲስክ ቦታ ያስወጣል፣ ማስገባቶችንም በትንሹ ያዘገያል፡ ያዋጣል፣ እዚህ ንባቦች ከጽሑፎች በብዙ እጥፍ ስለሚበልጡ።"
   ]
  },
  "decision": {
   "en": "Create the composite index (crop, market, day) that matches the API query exactly; re-check EXPLAIN QUERY PLAN whenever a new query is added.",
   "am": "ከAPI queryው ጋር በትክክል የሚስማማውን የተዋሃደ index (crop፣ market፣ day) ፍጠር፤ አዲስ query በተጨመረ ቁጥር EXPLAIN QUERY PLANን እንደገና ፈትሽ።"
  },
  "note": {
   "en": "Timings depend on the computer; the pattern, not the exact milliseconds, is the result.",
   "am": "ጊዜዎች በኮምፒውተሩ ላይ ይወሰናሉ፤ ውጤቱ ትክክለኛዎቹ ሚሊሰከንዶች ሳይሆኑ ንድፉ ነው።"
  }
 },
 {
  "title": {
   "en": "Forecasting next week’s teff price",
   "am": "የሚቀጥለውን ሳምንት የጤፍ ዋጋ መተንበይ"
  },
  "goal": {
   "en": "Compare three models on two years of weekly prices with an honest time split, and decide which forecast to publish.",
   "am": "በሁለት ዓመታት ሳምንታዊ ዋጋዎች ላይ ሦስት ሞዴሎችን በታማኝ የጊዜ ክፍፍል አወዳድር፣ የትኛውን ትንበያ እንደምታትም ወስን።"
  },
  "time": {
   "en": "1–2 weeks",
   "am": "1–2 ሳምንታት"
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
    "name": "scikit-learn",
    "why": {
     "en": "machine-learning models and evaluation",
     "am": "የmachine-learning ሞዴሎችና ግምገማ"
    },
    "get": "pip install scikit-learn"
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
    "Build features: week number, season (sine/cosine), last week’s price, price 4 weeks ago.",
    "Train on weeks 1–88, test on the last 16 weeks (never shuffle time).",
    "Models: \"same as last week\", linear regression, random forest.",
    "Compute mean absolute error on the test weeks.",
    "Plot actual vs forecasts and decide."
   ],
   "am": [
    "features ገንባ፡ የሳምንት ቁጥር፣ ወቅት (sine/cosine)፣ የባለፈው ሳምንት ዋጋ፣ ከ4 ሳምንታት በፊት ያለ ዋጋ።",
    "በሳምንታት 1–88 አሰልጥን፣ በመጨረሻዎቹ 16 ሳምንታት ፈትሽ (ጊዜን በፍጹም አትቀላቅል)።",
    "ሞዴሎች፡ «እንደ ባለፈው ሳምንት»፣ linear regression፣ random forest።",
    "በፈተና ሳምንታቱ ላይ mean absolute error አስላ።",
    "ትክክለኛውንና ትንበያዎችን ቻርት አድርግና ወስን።"
   ]
  },
  "code": "import numpy as np, pandas as pd\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.ensemble import RandomForestRegressor\nrng = np.random.default_rng(12); w = np.arange(104)\nprice = 95 + 0.15 * w + 6 * np.sin(2 * np.pi * w / 52) + np.cumsum(rng.normal(0, 0.8, 104)) + rng.normal(0, 1.5, 104)\ndf = pd.DataFrame({\"week\": w, \"price\": price, \"s\": np.sin(2 * np.pi * w / 52), \"c\": np.cos(2 * np.pi * w / 52)})\ndf[\"lag1\"] = df.price.shift(1); df[\"lag4\"] = df.price.shift(4); df = df.dropna()\nX, y = df[[\"week\", \"s\", \"c\", \"lag1\", \"lag4\"]], df.price\ntrain, test = df.week < 88, df.week >= 88\npreds = {\"same as last week\": df.lag1[test].values,\n         \"linear regression\": LinearRegression().fit(X[train], y[train]).predict(X[test]),\n         \"random forest\": RandomForestRegressor(300, random_state=0).fit(X[train], y[train]).predict(X[test])}\nmae = {k: float(np.mean(np.abs(v - y[test].values))) for k, v in preds.items()}\nfor k, v in mae.items(): print(f\"{k:18s} MAE {v:.2f} birr/kg\")\nbest = min(mae, key=mae.get); test_weeks = df.week[test].tolist(); actual = y[test].tolist()",
  "out": "same as last week  MAE 1.69 birr/kg\nlinear regression  MAE 1.62 birr/kg\nrandom forest      MAE 1.36 birr/kg",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Last 16 weeks: actual price and forecasts",
     "am": "የመጨረሻዎቹ 16 ሳምንታት፡ ትክክለኛ ዋጋና ትንበያዎች"
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
      "en": "Birr per kg",
      "am": "ብር በኪሎ"
     }
    },
    "series": [
     {
      "name": {
       "en": "Actual",
       "am": "ትክክለኛ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       88.0,
       89.0,
       90.0,
       91.0,
       92.0,
       93.0,
       94.0,
       95.0,
       96.0,
       97.0,
       98.0,
       99.0,
       100.0,
       101.0,
       102.0,
       103.0
      ],
      "y": [
       108.87,
       105.6543,
       107.3459,
       107.0773,
       105.7014,
       108.9299,
       107.9182,
       106.5405,
       106.2727,
       107.547,
       111.7789,
       108.2808,
       109.6566,
       108.7542,
       111.0592,
       111.4911
      ],
      "tip": [
       "108.9|Actual · 88",
       "105.7|Actual · 89",
       "107.3|Actual · 90",
       "107.1|Actual · 91",
       "105.7|Actual · 92",
       "108.9|Actual · 93",
       "107.9|Actual · 94",
       "106.5|Actual · 95",
       "106.3|Actual · 96",
       "107.5|Actual · 97",
       "111.8|Actual · 98",
       "108.3|Actual · 99",
       "109.7|Actual · 100",
       "108.8|Actual · 101",
       "111.1|Actual · 102",
       "111.5|Actual · 103"
      ],
      "endlabel": {
       "en": "Actual",
       "am": "ትክክለኛ"
      }
     },
     {
      "name": {
       "en": "Linear regression",
       "am": "Linear regression"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       88.0,
       89.0,
       90.0,
       91.0,
       92.0,
       93.0,
       94.0,
       95.0,
       96.0,
       97.0,
       98.0,
       99.0,
       100.0,
       101.0,
       102.0,
       103.0
      ],
      "y": [
       107.3197,
       107.2037,
       105.701,
       106.8049,
       107.0307,
       106.2328,
       108.1023,
       108.0371,
       107.6839,
       108.5757,
       109.3833,
       111.3052,
       110.4271,
       111.7183,
       112.629,
       113.4834
      ],
      "tip": [
       "107.3|Linear regression · 88",
       "107.2|Linear regression · 89",
       "105.7|Linear regression · 90",
       "106.8|Linear regression · 91",
       "107|Linear regression · 92",
       "106.2|Linear regression · 93",
       "108.1|Linear regression · 94",
       "108|Linear regression · 95",
       "107.7|Linear regression · 96",
       "108.6|Linear regression · 97",
       "109.4|Linear regression · 98",
       "111.3|Linear regression · 99",
       "110.4|Linear regression · 100",
       "111.7|Linear regression · 101",
       "112.6|Linear regression · 102",
       "113.5|Linear regression · 103"
      ],
      "endlabel": {
       "en": "Linear regression",
       "am": "Linear regression"
      }
     },
     {
      "name": {
       "en": "Random forest",
       "am": "Random forest"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       88.0,
       89.0,
       90.0,
       91.0,
       92.0,
       93.0,
       94.0,
       95.0,
       96.0,
       97.0,
       98.0,
       99.0,
       100.0,
       101.0,
       102.0,
       103.0
      ],
      "y": [
       108.8958,
       108.6021,
       107.5871,
       108.081,
       108.2856,
       107.5979,
       108.5637,
       108.1445,
       107.63,
       108.183,
       108.546,
       109.1277,
       108.6001,
       108.8924,
       109.6294,
       108.7511
      ],
      "tip": [
       "108.9|Random forest · 88",
       "108.6|Random forest · 89",
       "107.6|Random forest · 90",
       "108.1|Random forest · 91",
       "108.3|Random forest · 92",
       "107.6|Random forest · 93",
       "108.6|Random forest · 94",
       "108.1|Random forest · 95",
       "107.6|Random forest · 96",
       "108.2|Random forest · 97",
       "108.5|Random forest · 98",
       "109.1|Random forest · 99",
       "108.6|Random forest · 100",
       "108.9|Random forest · 101",
       "109.6|Random forest · 102",
       "108.8|Random forest · 103"
      ],
      "endlabel": {
       "en": "Random forest",
       "am": "Random forest"
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
       "en": "Actual",
       "am": "ትክክለኛ"
      },
      {
       "en": "Linear regression",
       "am": "Linear regression"
      },
      {
       "en": "Random forest",
       "am": "Random forest"
      }
     ],
     "rows": [
      [
       88.0,
       108.87,
       107.32,
       108.896
      ],
      [
       89.0,
       105.654,
       107.204,
       108.602
      ],
      [
       90.0,
       107.346,
       105.701,
       107.587
      ],
      [
       91.0,
       107.077,
       106.805,
       108.081
      ],
      [
       92.0,
       105.701,
       107.031,
       108.286
      ],
      [
       93.0,
       108.93,
       106.233,
       107.598
      ],
      [
       94.0,
       107.918,
       108.102,
       108.564
      ],
      [
       95.0,
       106.54,
       108.037,
       108.145
      ],
      [
       96.0,
       106.273,
       107.684,
       107.63
      ],
      [
       97.0,
       107.547,
       108.576,
       108.183
      ],
      [
       98.0,
       111.779,
       109.383,
       108.546
      ],
      [
       99.0,
       108.281,
       111.305,
       109.128
      ],
      [
       100.0,
       109.657,
       110.427,
       108.6
      ],
      [
       101.0,
       108.754,
       111.718,
       108.892
      ],
      [
       102.0,
       111.059,
       112.629,
       109.629
      ],
      [
       103.0,
       111.491,
       113.483,
       108.751
      ]
     ]
    },
    "rpad": 110
   },
   {
    "type": "hbar",
    "title": {
     "en": "Forecast error on the test weeks (MAE, birr/kg)",
     "am": "በፈተና ሳምንታቱ ላይ የትንበያ ስህተት (MAE፣ ብር/kg)"
    },
    "x": {
     "label": {
      "en": "Birr per kg",
      "am": "ብር በኪሎ"
     }
    },
    "fmt": 2,
    "cats": [
     "same as last week",
     "linear regression",
     "random forest"
    ],
    "series": [
     {
      "name": "MAE",
      "slot": 1,
      "v": [
       1.69,
       1.62,
       1.36
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      "MAE"
     ],
     "rows": [
      [
       "same as last week",
       1.69
      ],
      [
       "linear regression",
       1.62
      ],
      [
       "random forest",
       1.36
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Best on unseen weeks: random forest (MAE 1.36 birr/kg).",
    "Linear regression 1.62 vs random forest 1.36 birr/kg; a tree model cannot predict a price above any it was trained on, so check it whenever prices trend upward.",
    "Last week’s price is a strong benchmark: any model must beat it to be worth publishing."
   ],
   "am": [
    "ባልታዩ ሳምንታት ላይ ምርጡ፡ random forest (MAE 1.36 ብር/kg)።",
    "Linear regression 1.62 vs random forest 1.36 ብር/kg፤ የዛፍ ሞዴል ከሰለጠነበት በላይ የሆነ ዋጋን መተንበይ አይችልም፤ ስለዚህ ዋጋዎች ወደ ላይ ሲያዘነብሉ ፈትሸው።",
    "የባለፈው ሳምንት ዋጋ ጠንካራ መለኪያ ነው፡ ማንኛውም ሞዴል ለመታተም ብቁ ለመሆን ማሸነፍ አለበት።"
   ]
  },
  "decision": {
   "en": "Publish the random forest forecast with a ± range equal to the test MAE, and retrain every month; never shuffle weeks when testing a forecast.",
   "am": "የrandom forest ትንበያውን ከፈተናው MAE ጋር እኩል በሆነ ± ክልል አትም፣ በየወሩ እንደገና አሰልጥን፤ ትንበያን ስትፈትሽ ሳምንታትን በፍጹም አትቀላቅል።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 }
];
