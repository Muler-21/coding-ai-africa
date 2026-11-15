/* Level 3 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[3] = [
 {
  "why": {
   "en": "Objects model real things; binary and logic show how the machine itself works; pandas turns data into answers.",
   "am": "objects እውነተኛ ነገሮችን ይወክላሉ፤ binary እና logic ማሽኑ ራሱ እንዴት እንደሚሠራ ያሳያሉ፤ pandas ዳታን ወደ መልስ ይቀይራል።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Class vs object",
     "am": "Class vs object"
    },
    "cols": [
     {
      "h": {
       "en": "Class: the blueprint",
       "am": "Class፡ ንድፉ"
      },
      "items": {
       "en": [
        "class Farm:",
        "says what every farm has (name, crops)",
        "and can do (add_crop)"
       ],
       "am": [
        "class Farm:",
        "እያንዳንዱ እርሻ ያለውን (ስም፣ ሰብሎች)",
        "እና ሊያደርገው የሚችለውን (add_crop) ይገልጻል"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Objects: real farms",
       "am": "Objects፡ እውነተኛ እርሻዎች"
      },
      "items": {
       "en": [
        "Farm(\"Abay\") with teff, maize",
        "Farm(\"Gojjam\") with barley",
        "many objects, one class"
       ],
       "am": [
        "Farm(\"Abay\") ከጤፍ፣ በቆሎ ጋር",
        "Farm(\"Gojjam\") ከገብስ ጋር",
        "ብዙ objects፣ አንድ class"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "stack",
    "title": {
     "en": "From switches to programs",
     "am": "ከማብሪያ ማጥፊያዎች ወደ ፕሮግራሞች"
    },
    "layers": [
     {
      "t": {
       "en": "Python program",
       "am": "የPython ፕሮግራም"
      },
      "s": {
       "en": "farm.add_crop(\"teff\")",
       "am": "farm.add_crop(\"teff\")"
      }
     },
     {
      "t": {
       "en": "CPU instructions",
       "am": "የCPU መመሪያዎች"
      },
      "s": {
       "en": "load, add, store, jump",
       "am": "ጫን፣ ደምር፣ አስቀምጥ፣ ዝለል"
      }
     },
     {
      "t": {
       "en": "Logic gates",
       "am": "Logic gates"
      },
      "s": {
       "en": "AND, OR, NOT built from transistors",
       "am": "ከtransistors የተገነቡ AND፣ OR፣ NOT"
      }
     },
     {
      "t": {
       "en": "Binary: 0 and 1",
       "am": "Binary፡ 0 እና 1"
      },
      "s": {
       "en": "1011 = 8 + 0 + 2 + 1 = 11",
       "am": "1011 = 8 + 0 + 2 + 1 = 11"
      }
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import pandas as pd\n\nclass Farm:                                   # a class: the blueprint\n    def __init__(self, name):\n        self.name, self.crops = name, []\n    def add_crop(self, crop):\n        self.crops.append(crop)\n    def __repr__(self):\n        return f\"Farm({self.name}: {', '.join(self.crops)})\"\n\nabay = Farm(\"Abay\"); abay.add_crop(\"teff\"); abay.add_crop(\"maize\")   # an object\nprint(abay)\n\nprint(\"1011 in decimal =\", int(\"1011\", 2), \"| 11 in binary =\", bin(11))\nprint(\"AND:\", [a & b for a in (0, 1) for b in (0, 1)], \" OR:\", [a | b for a in (0, 1) for b in (0, 1)])\n\nyields = pd.DataFrame({\"farm\": [\"Abay\", \"Abay\", \"Gojjam\", \"Gojjam\", \"Dangila\"],\n                       \"crop\": [\"teff\", \"maize\", \"teff\", \"barley\", \"teff\"],\n                       \"t_per_ha\": [1.6, 4.2, 1.9, 2.4, 1.4]})\nprint(yields.groupby(\"crop\").t_per_ha.mean().round(2))\nprint(\"Average of the whole column:\", round(yields.t_per_ha.mean(), 2))",
   "out": "Farm(Abay: teff, maize)\n1011 in decimal = 11 | 11 in binary = 0b1011\nAND: [0, 0, 0, 1]  OR: [0, 1, 1, 1]\ncrop\nbarley    2.40\nmaize     4.20\nteff      1.63\nName: t_per_ha, dtype: float64\nAverage of the whole column: 2.3",
   "title": {
    "en": "A class, binary, logic gates and averages with pandas",
    "am": "class፣ binary፣ logic gates እና በpandas አማካዮች"
   }
  },
  "qa": {
   "en": [
    "A class is the blueprint (what data and actions exist); an object is one real thing made from it, with its own data.",
    "1·8 + 0·4 + 1·2 + 1·1 = 11.",
    "df[\"column\"].mean(); for averages per group use df.groupby(\"crop\")[\"column\"].mean()."
   ],
   "am": [
    "class ንድፉ ነው (ምን ዳታና ተግባራት እንዳሉ)፤ object ከእሱ የተሠራ የራሱ ዳታ ያለው አንድ እውነተኛ ነገር ነው።",
    "1·8 + 0·4 + 1·2 + 1·1 = 11።",
    "df[\"column\"].mean()፤ ለቡድን አማካዮች df.groupby(\"crop\")[\"column\"].mean() ተጠቀም።"
   ]
  }
 },
 {
  "why": {
   "en": "Good algorithms make programs fast; Git keeps every version safe; the DOM makes pages interactive.",
   "am": "ጥሩ algorithms ፕሮግራሞችን ፈጣን ያደርጋሉ፤ Git እያንዳንዱን ስሪት ይጠብቃል፤ DOM ገጾችን በይነተገናኝ ያደርጋል።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Finding a name in 1,000,000 sorted records",
     "am": "በ1,000,000 የተደረደሩ መዝገቦች ውስጥ ስም መፈለግ"
    },
    "cols": [
     {
      "h": {
       "en": "Linear search: O(n)",
       "am": "Linear search፡ O(n)"
      },
      "items": {
       "en": [
        "check one by one",
        "up to 1,000,000 checks"
       ],
       "am": [
        "አንድ በአንድ ፈትሽ",
        "እስከ 1,000,000 ፍተሻዎች"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Binary search: O(log n)",
       "am": "Binary search፡ O(log n)"
      },
      "items": {
       "en": [
        "look in the middle, throw away half",
        "at most 20 checks"
       ],
       "am": [
        "መሀሉን ተመልከት፣ ግማሹን ጣል",
        "ቢበዛ 20 ፍተሻዎች"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "A day with Git",
     "am": "ከGit ጋር አንድ ቀን"
    },
    "nodes": [
     {
      "t": {
       "en": "edit files",
       "am": "ፋይሎችን አስተካክል"
      }
     },
     {
      "t": {
       "en": "git add",
       "am": "git add"
      },
      "s": {
       "en": "choose changes",
       "am": "ለውጦችን ምረጥ"
      }
     },
     {
      "t": {
       "en": "git commit",
       "am": "git commit"
      },
      "s": {
       "en": "save a snapshot + message",
       "am": "ፎቶ + መልእክት አስቀምጥ"
      }
     },
     {
      "t": {
       "en": "git push",
       "am": "git push"
      },
      "s": {
       "en": "send to GitHub",
       "am": "ወደ GitHub ላክ"
      }
     },
     {
      "t": {
       "en": "pull request",
       "am": "pull request"
      },
      "s": {
       "en": "review, then merge",
       "am": "ገምግም፣ ከዚያ አዋህድ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "Recursion: factorial(4)",
     "am": "Recursion፡ factorial(4)"
    },
    "nodes": [
     {
      "t": {
       "en": "4 × f(3)",
       "am": "4 × f(3)"
      }
     },
     {
      "t": {
       "en": "3 × f(2)",
       "am": "3 × f(2)"
      }
     },
     {
      "t": {
       "en": "2 × f(1)",
       "am": "2 × f(1)"
      }
     },
     {
      "t": {
       "en": "f(1) = 1",
       "am": "f(1) = 1"
      },
      "s": {
       "en": "base case: stop",
       "am": "base case፡ አቁም"
      },
      "hl": true
     }
    ],
    "loop": {
     "en": "then multiply back up: 1 → 2 → 6 → 24",
     "am": "ከዚያ ወደ ላይ አባዛ፡ 1 → 2 → 6 → 24"
    }
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import random\ndef linear_search(items, target):\n    for steps, x in enumerate(items, 1):\n        if x == target: return steps\ndef binary_search(items, target):\n    lo, hi, steps = 0, len(items) - 1, 0\n    while lo <= hi:\n        steps += 1; mid = (lo + hi) // 2\n        if items[mid] == target: return steps\n        if items[mid] < target: lo = mid + 1\n        else: hi = mid - 1\ndef factorial(n):\n    return 1 if n <= 1 else n * factorial(n - 1)     # base case, then recursive case\n\nrecords = list(range(1_000_000)); random.seed(1); target = random.choice(records)\nprint(f\"target {target}: linear search {linear_search(records, target):,} steps, binary search {binary_search(records, target)} steps\")\nprint(\"factorial(4) =\", factorial(4), \"| factorial(10) =\", factorial(10))",
   "out": "target 140891: linear search 140,892 steps, binary search 20 steps\nfactorial(4) = 24 | factorial(10) = 3628800",
   "title": {
    "en": "Linear vs binary search, and recursion",
    "am": "Linear vs binary search፣ እና recursion"
   },
   "note": {
    "en": "The DOM part in JavaScript: document.querySelector(\"#add\").addEventListener(\"click\", addNotice) runs addNotice each time the button is clicked.",
    "am": "የDOM ክፍሉ በJavaScript፡ document.querySelector(\"#add\").addEventListener(\"click\", addNotice) ቁልፉ በተጫነ ቁጥር addNoticeን ያስኬዳል።"
   }
  },
  "qa": {
   "en": [
    "Each step halves the remaining list, so 1,000,000 items need at most about 20 checks; it only works on sorted data.",
    "It saves a snapshot of the staged changes with a message, so you can see or return to that version later.",
    "The simplest input that is answered directly without calling the function again (for factorial, n ≤ 1 returns 1)."
   ],
   "am": [
    "እያንዳንዱ እርምጃ የቀረውን ዝርዝር በግማሽ ይቀንሳል፤ ስለዚህ 1,000,000 ንጥሎች ቢበዛ ወደ 20 ፍተሻዎች ያስፈልጋቸዋል፤ የሚሠራው በተደረደረ ዳታ ላይ ብቻ ነው።",
    "የተዘጋጁትን ለውጦች ፎቶ ከመልእክት ጋር ያስቀምጣል፤ ስለዚህ በኋላ ያንን ስሪት ማየት ወይም መመለስ ትችላለህ።",
    "function እንደገና ሳይጠራ በቀጥታ የሚመለስ በጣም ቀላሉ ግብዓት (ለfactorial n ≤ 1 1 ይመልሳል)።"
   ]
  }
 },
 {
  "why": {
   "en": "The back end stores data and answers requests; the right data structure makes it fast.",
   "am": "back end ዳታ ያስቀምጣል፣ ለጥያቄዎችም ይመልሳል፤ ትክክለኛው data structure ፈጣን ያደርገዋል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "A request to your API",
     "am": "ወደ APIህ የሚመጣ ጥያቄ"
    },
    "nodes": [
     {
      "t": {
       "en": "Phone app",
       "am": "የስልክ መተግበሪያ"
      },
      "s": {
       "en": "GET /prices?crop=teff",
       "am": "GET /prices?crop=teff"
      }
     },
     {
      "t": {
       "en": "FastAPI / Flask",
       "am": "FastAPI / Flask"
      },
      "s": {
       "en": "route → function",
       "am": "route → function"
      }
     },
     {
      "t": {
       "en": "SQLite",
       "am": "SQLite"
      },
      "s": {
       "en": "SELECT … JOIN …",
       "am": "SELECT … JOIN …"
      }
     },
     {
      "t": {
       "en": "200 OK + JSON",
       "am": "200 OK + JSON"
      },
      "s": {
       "en": "404 if not found",
       "am": "ካልተገኘ 404"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Stack or queue?",
     "am": "Stack ወይስ queue?"
    },
    "cols": [
     {
      "h": {
       "en": "Stack: last in, first out",
       "am": "Stack፡ መጨረሻ የገባ፣ መጀመሪያ ይወጣል"
      },
      "items": {
       "en": [
        "undo button",
        "browser back button"
       ],
       "am": [
        "የundo ቁልፍ",
        "የአሳሹ ወደ ኋላ ቁልፍ"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Queue: first in, first out",
       "am": "Queue፡ መጀመሪያ የገባ፣ መጀመሪያ ይወጣል"
      },
      "items": {
       "en": [
        "customers at a bank",
        "print jobs, SMS sending"
       ],
       "am": [
        "በባንክ ያሉ ደንበኞች",
        "የህትመት ሥራዎች፣ SMS መላክ"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import sqlite3\nfrom collections import deque\ndb = sqlite3.connect(\":memory:\")\ndb.executescript(\"\"\"\nCREATE TABLE markets(id INTEGER PRIMARY KEY, town TEXT);\nCREATE TABLE prices(market_id INTEGER REFERENCES markets(id), crop TEXT, birr_per_kg REAL);\nINSERT INTO markets VALUES (1,'Bahir Dar'),(2,'Debre Markos'),(3,'Gondar');\nINSERT INTO prices VALUES (1,'teff',118),(2,'teff',112),(3,'teff',125),(2,'maize',38);\n\"\"\")\nrows = db.execute(\"\"\"SELECT m.town, p.birr_per_kg FROM prices p\n                     JOIN markets m ON m.id = p.market_id\n                     WHERE p.crop = ? ORDER BY p.birr_per_kg\"\"\", (\"teff\",)).fetchall()\nprint(\"teff prices:\", rows)\n\nline = deque([\"Almaz\", \"Bekele\"]); line.append(\"Chaltu\")     # queue: first in, first out\nprint(\"served first:\", line.popleft())\nundo = [\"type A\", \"type B\"]; undo.append(\"delete\")            # stack: last in, first out\nprint(\"undo removes:\", undo.pop())",
   "out": "teff prices: [('Debre Markos', 112.0), ('Bahir Dar', 118.0), ('Gondar', 125.0)]\nserved first: Almaz\nundo removes: delete",
   "title": {
    "en": "SQL JOIN with SQLite, a queue and a stack",
    "am": "SQL JOIN ከSQLite ጋር፣ queue እና stack"
   },
   "note": {
    "en": "In the full project this query sits inside an API route that returns the rows as JSON.",
    "am": "በሙሉ ፕሮጀክቱ ይህ query ረድፎቹን እንደ JSON በሚመልስ API route ውስጥ ይቀመጣል።"
   }
  },
  "qa": {
   "en": [
    "When order of arrival must be respected, such as customers waiting or messages to send.",
    "It combines rows from two tables where a key matches, for example each price with its market’s town.",
    "Not found: the server is working but the requested address or item does not exist."
   ],
   "am": [
    "የመድረሻ ቅደም ተከተል መከበር ሲኖርበት፣ ለምሳሌ የሚጠብቁ ደንበኞች ወይም የሚላኩ መልእክቶች።",
    "ቁልፍ በሚመሳሰልበት ከሁለት ሰንጠረዦች ረድፎችን ያጣምራል፣ ለምሳሌ እያንዳንዱን ዋጋ ከገበያው ከተማ ጋር።",
    "አልተገኘም፡ ሰርቨሩ እየሠራ ነው ግን የተጠየቀው አድራሻ ወይም ንጥል የለም።"
   ]
  }
 },
 {
  "why": {
   "en": "Professionals work in teams, on Linux, safely and ethically, and use machine learning with honest testing.",
   "am": "ባለሙያዎች በቡድን፣ በLinux ላይ፣ በደኅንነትና በሥነ-ምግባር ይሠራሉ፤ machine learningንም በታማኝ ፍተሻ ይጠቀማሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Shell pipes join small tools",
     "am": "የshell pipes ትናንሽ መሣሪያዎችን ያገናኛሉ"
    },
    "nodes": [
     {
      "t": {
       "en": "cat sales.csv",
       "am": "cat sales.csv"
      }
     },
     {
      "t": {
       "en": "| grep teff",
       "am": "| grep teff"
      },
      "s": {
       "en": "keep teff lines",
       "am": "የጤፍ መስመሮችን አቆይ"
      }
     },
     {
      "t": {
       "en": "| cut -d, -f3",
       "am": "| cut -d, -f3"
      },
      "s": {
       "en": "take column 3",
       "am": "ዓምድ 3ን ውሰድ"
      }
     },
     {
      "t": {
       "en": "| sort -n | tail -1",
       "am": "| sort -n | tail -1"
      },
      "s": {
       "en": "highest price",
       "am": "ከፍተኛው ዋጋ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "Honest machine learning",
     "am": "ታማኝ machine learning"
    },
    "nodes": [
     {
      "t": {
       "en": "All data",
       "am": "ሁሉም ዳታ"
      }
     },
     {
      "t": {
       "en": "Train set (80%)",
       "am": "የሥልጠና ስብስብ (80%)"
      },
      "s": {
       "en": "the model learns here",
       "am": "ሞዴሉ እዚህ ይማራል"
      }
     },
     {
      "t": {
       "en": "Test set (20%)",
       "am": "የፈተና ስብስብ (20%)"
      },
      "s": {
       "en": "never seen in training",
       "am": "በሥልጠና ፈጽሞ ያልታየ"
      }
     },
     {
      "t": {
       "en": "Score on test",
       "am": "በፈተናው ላይ ውጤት"
      },
      "s": {
       "en": "the honest number",
       "am": "ታማኙ ቁጥር"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import mean_absolute_error\nrng = np.random.default_rng(12)\nweeks = np.arange(104)\nprice = 95 + 0.15 * weeks + 6 * np.sin(2 * np.pi * weeks / 52) + rng.normal(0, 2.5, 104)   # birr/kg\nX = np.column_stack([weeks, np.sin(2 * np.pi * weeks / 52), np.cos(2 * np.pi * weeks / 52)])\nX_tr, X_te, y_tr, y_te = train_test_split(X, price, test_size=0.2, shuffle=False)   # keep time order\nmodel = LinearRegression().fit(X_tr, y_tr)\nprint(f\"error on training weeks: {mean_absolute_error(y_tr, model.predict(X_tr)):.2f} birr/kg\")\nprint(f\"error on unseen weeks:   {mean_absolute_error(y_te, model.predict(X_te)):.2f} birr/kg\")\nnxt = 104\nprint(f\"next week forecast: {model.predict([[nxt, np.sin(2*np.pi*nxt/52), np.cos(2*np.pi*nxt/52)]])[0]:.1f} birr/kg\")",
   "out": "error on training weeks: 1.80 birr/kg\nerror on unseen weeks:   2.29 birr/kg\nnext week forecast: 111.9 birr/kg",
   "title": {
    "en": "Predict next week’s market price and test it honestly",
    "am": "የሚቀጥለውን ሳምንት የገበያ ዋጋ ተንብይና በታማኝነት ፈትሸው"
   },
   "note": {
    "en": "Limits: the data are simulated; real prices also jump with rainfall, holidays and fuel costs, which this model does not know.",
    "am": "ገደቦች፡ ዳታው የተመሰለ ነው፤ እውነተኛ ዋጋዎች በዝናብ፣ በበዓላትና በነዳጅ ዋጋ ይዘላሉ፤ ይህ ሞዴል እነዚህን አያውቅም።"
   }
  },
  "qa": {
   "en": [
    "It sends the output of one command as the input of the next, so small tools can be chained.",
    "To measure performance on data the model has never seen; the training score is always too optimistic.",
    "The people it describes have rights over it; follow the national data protection law, collect only what you need and ask for consent."
   ],
   "am": [
    "የአንዱን ትዕዛዝ ውጤት የቀጣዩ ግብዓት አድርጎ ይልካል፤ ስለዚህ ትናንሽ መሣሪያዎች ሊያያዙ ይችላሉ።",
    "ሞዴሉ ፈጽሞ ባላየው ዳታ ላይ አፈጻጸሙን ለመለካት፤ የሥልጠና ውጤቱ ሁልጊዜ ከልክ በላይ ተስፋ ሰጪ ነው።",
    "የሚገልጻቸው ሰዎች መብት አላቸው፤ የብሔራዊ የዳታ ጥበቃ ሕግን ተከተል፣ የሚያስፈልግህን ብቻ ሰብስብ፣ ፈቃድም ጠይቅ።"
   ]
  }
 }
];
