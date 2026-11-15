/* Practical labs, track c, level 5. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[5] = [
 {
  "title": {
   "en": "Refactor with tests and measure complexity",
   "am": "በፈተናዎች አሻሽልና ውስብስብነትን ለካ"
  },
  "goal": {
   "en": "Refactor a tangled invoice function, prove behaviour is unchanged with tests, and measure the drop in cyclomatic complexity.",
   "am": "የተጠላለፈ የደረሰኝ functionን አሻሽል፣ ባሕሪው እንዳልተለወጠ በፈተናዎች አረጋግጥ፣ የcyclomatic complexity ቅነሳን ለካ።"
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
    "name": "pytest",
    "why": {
     "en": "automatic tests",
     "am": "አውቶማቲክ ፈተናዎች"
    },
    "get": "pip install pytest"
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
    "Write characterisation tests that pin down what the old function does today.",
    "Refactor into small functions with clear names.",
    "Run the tests after every small change.",
    "Measure cyclomatic complexity (number of decision points + 1) per function with Python’s ast module.",
    "Open a pull request with before/after numbers."
   ],
   "am": [
    "የድሮው function ዛሬ የሚያደርገውን የሚያረጋግጡ characterisation tests ጻፍ።",
    "ግልጽ ስሞች ወዳሏቸው ትናንሽ functions አሻሽለው።",
    "ከእያንዳንዱ ትንሽ ለውጥ በኋላ ፈተናዎቹን አስኪድ።",
    "በPython ast module የእያንዳንዱን function cyclomatic complexity (የውሳኔ ነጥቦች ብዛት + 1) ለካ።",
    "ከበፊት/በኋላ ቁጥሮች ጋር pull request ክፈት።"
   ]
  },
  "code": "import ast, textwrap\nOLD = \"\"\"\ndef invoice(lines, member, coupon):\n    t = 0\n    for l in lines:\n        if l[1] > 0:\n            if l[0] == \"fertilizer\" and member:\n                t += l[1] * l[2] * 0.9\n            elif l[0] == \"seed\" and member and l[1] >= 10:\n                t += l[1] * l[2] * 0.85\n            else:\n                t += l[1] * l[2]\n    if coupon and t > 1000:\n        t -= 100\n    elif coupon:\n        t -= 20\n    return round(t * 1.15, 2)\n\"\"\"\nNEW = \"\"\"\nDISCOUNTS = {\"fertilizer\": (0, 0.10), \"seed\": (10, 0.15)}   # item: (minimum quantity, member discount)\ndef line_price(item, qty, price, member):\n    min_qty, rate = DISCOUNTS.get(item, (0, 0.0))\n    discount = rate if member and qty >= min_qty else 0.0\n    return qty * price * (1 - discount)\ndef coupon_value(subtotal, coupon):\n    if not coupon:\n        return 0\n    return 100 if subtotal > 1000 else 20\ndef invoice(lines, member, coupon):\n    subtotal = sum(line_price(i, q, p, member) for i, q, p in lines if q > 0)\n    return round((subtotal - coupon_value(subtotal, coupon)) * 1.15, 2)\n\"\"\"\ndef complexity(src):\n    out = {}\n    for fn in [n for n in ast.walk(ast.parse(src)) if isinstance(n, ast.FunctionDef)]:\n        points = sum(isinstance(n, (ast.If, ast.For, ast.While, ast.IfExp, ast.comprehension)) for n in ast.walk(fn))\n        points += sum(len(n.values) - 1 for n in ast.walk(fn) if isinstance(n, ast.BoolOp))\n        out[fn.name] = points + 1\n    return out\nold_ns, new_ns = {}, {}; exec(OLD, old_ns); exec(NEW, new_ns)\ncases = [([(\"fertilizer\", 4, 300.0), (\"salt\", 2, 30.0)], True, False), ([(\"seed\", 12, 90.0)], True, True), ([(\"seed\", 5, 90.0), (\"oil\", -1, 200.0)], False, True), ([], False, False)]\nfor c in cases: assert old_ns[\"invoice\"](*c) == new_ns[\"invoice\"](*c), c     # behaviour unchanged\ncx_old, cx_new = complexity(OLD), complexity(NEW)\nprint(\"tests passed:\", len(cases)); print(\"complexity before:\", cx_old); print(\"complexity after: \", cx_new)",
  "out": "tests passed: 4\ncomplexity before: {'invoice': 11}\ncomplexity after:  {'line_price': 3, 'coupon_value': 3, 'invoice': 2}",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Cyclomatic complexity per function",
     "am": "Cyclomatic complexity በfunction"
    },
    "x": {
     "label": {
      "en": "Decision points + 1",
      "am": "የውሳኔ ነጥቦች + 1"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "invoice (before)",
      "am": "invoice (በፊት)"
     },
     {
      "en": "line_price (after)",
      "am": "line_price (በኋላ)"
     },
     {
      "en": "coupon_value (after)",
      "am": "coupon_value (በኋላ)"
     },
     {
      "en": "invoice (after)",
      "am": "invoice (በኋላ)"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Complexity",
       "am": "ውስብስብነት"
      },
      "slot": 1,
      "v": [
       11.0,
       3.0,
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
       "en": "Complexity",
       "am": "ውስብስብነት"
      }
     ],
     "rows": [
      [
       {
        "en": "invoice (before)",
        "am": "invoice (በፊት)"
       },
       11.0
      ],
      [
       {
        "en": "line_price (after)",
        "am": "line_price (በኋላ)"
       },
       3.0
      ],
      [
       {
        "en": "coupon_value (after)",
        "am": "coupon_value (በኋላ)"
       },
       3.0
      ],
      [
       {
        "en": "invoice (after)",
        "am": "invoice (በኋላ)"
       },
       2.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The old function had complexity 11: many paths to test and to break.",
    "After refactoring no function is above 3; discounts are data, not nested ifs.",
    "All 4 characterisation tests pass, so customers are charged exactly as before."
   ],
   "am": [
    "የድሮው function 11 ውስብስብነት ነበረው፡ ለመፈተሽና ለመስበር ብዙ መንገዶች።",
    "ከማሻሻያው በኋላ ምንም function ከ3 በላይ አይደለም፤ ቅናሾች ዳታ ናቸው እንጂ የተደራረቡ ifs አይደሉም።",
    "ሁሉም 4 characterisation tests ያልፋሉ፤ ስለዚህ ደንበኞች በትክክል እንደበፊቱ ይከፍላሉ።"
   ]
  },
  "decision": {
   "en": "Merge the refactor; add a CI rule that flags functions with complexity above 10, and add a new discount by editing the DISCOUNTS table, not the code.",
   "am": "ማሻሻያውን አዋህድ፤ ውስብስብነታቸው ከ10 በላይ የሆኑ functionsን ምልክት የሚያደርግ የCI ሕግ ጨምር፣ አዲስ ቅናሽን ኮዱን ሳይሆን የDISCOUNTS ሰንጠረዥን በማስተካከል ጨምር።"
  }
 },
 {
  "title": {
   "en": "Hosting an API: which option costs least?",
   "am": "APIን ማስተናገድ፡ የትኛው አማራጭ ርካሽ ነው?"
  },
  "goal": {
   "en": "Model monthly cost of a small VPS, serverless functions and a managed container service as traffic grows, and choose a hosting plan with a budget alert.",
   "am": "ትራፊክ ሲያድግ የትንሽ VPS፣ የserverless functions እና የmanaged container አገልግሎትን ወርሃዊ ወጪ ሞዴል አድርግ፣ ከበጀት ማንቂያ ጋር የማስተናገጃ ዕቅድ ምረጥ።"
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
    "name": "Your cloud provider’s price calculator",
    "why": {
     "en": "real prices for your region",
     "am": "ለክልልህ እውነተኛ ዋጋዎች"
    },
    "get": "provider websites"
   },
   {
    "name": "Docker",
    "why": {
     "en": "package the API once, run it anywhere",
     "am": "APIውን አንድ ጊዜ አሽገህ በየትኛውም ቦታ አስኪደው"
    },
    "get": "docker.com"
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
    "Estimate traffic: requests per month now and in 12 months.",
    "Write a cost function for each option (fixed + per-request + data transfer).",
    "Evaluate from 0.1 to 50 million requests per month.",
    "Find where the cheapest option changes.",
    "Add a budget alert at 80% of the monthly budget."
   ],
   "am": [
    "ትራፊክን ገምት፡ በወር ጥያቄዎች አሁንና በ12 ወራት ውስጥ።",
    "ለእያንዳንዱ አማራጭ የወጪ function ጻፍ (ቋሚ + በጥያቄ + የዳታ ዝውውር)።",
    "በወር ከ0.1 እስከ 50 ሚሊዮን ጥያቄዎች ገምግም።",
    "በጣም ርካሹ አማራጭ የሚቀየርበትን ቦታ ፈልግ።",
    "በወርሃዊ በጀቱ 80% ላይ የበጀት ማንቂያ ጨምር።"
   ]
  },
  "code": "import numpy as np\nmillions = np.array([0.1, 0.5, 1, 2, 5, 10, 20, 50])\ndef vps(m):        return 12 + 0 * m + (24 if m > 20 else 0)            # USD: one small server, a second above 20 M\ndef serverless(m): return np.maximum(0, m - 1) * 0.20 + m * 1.6 + 0.0  # first 1 M free, then per-request + compute\ndef container(m):  return 25 + m * 0.35                                # managed service base + usage\ncost = {\"VPS\": [vps(m) for m in millions], \"Serverless\": list(serverless(millions)), \"Managed container\": list(container(millions))}\nfor i, m in enumerate(millions):\n    cheapest = min(cost, key=lambda k: cost[k][i])\n    print(f\"{m:5.1f} M req/month: \" + \", \".join(f\"{k} {v[i]:6.1f}\" for k, v in cost.items()) + f\" -> {cheapest}\")\ngrid = np.linspace(0.1, 50, 5000); cross = float(grid[np.argmax(serverless(grid) > np.array([vps(m) for m in grid]))])\ncross_c = float(grid[np.argmax(serverless(grid) > container(grid))])\nprint(f\"serverless stops being cheapest at about {cross:.1f} M requests/month; it passes the managed container at {cross_c:.1f} M\")",
  "out": "  0.1 M req/month: VPS   12.0, Serverless    0.2, Managed container   25.0 -> Serverless\n  0.5 M req/month: VPS   12.0, Serverless    0.8, Managed container   25.2 -> Serverless\n  1.0 M req/month: VPS   12.0, Serverless    1.6, Managed container   25.4 -> Serverless\n  2.0 M req/month: VPS   12.0, Serverless    3.4, Managed container   25.7 -> Serverless\n  5.0 M req/month: VPS   12.0, Serverless    8.8, Managed container   26.8 -> Serverless\n 10.0 M req/month: VPS   12.0, Serverless   17.8, Managed container   28.5 -> VPS\n 20.0 M req/month: VPS   12.0, Serverless   35.8, Managed container   32.0 -> VPS\n 50.0 M req/month: VPS   36.0, Serverless   89.8, Managed container   42.5 -> VPS\nserverless stops being cheapest at about 6.8 M requests/month; it passes the managed container at 17.4 M",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Monthly cost by traffic (USD, illustrative prices)",
     "am": "ወርሃዊ ወጪ በትራፊክ (USD፣ ለማሳያ ዋጋዎች)"
    },
    "x": {
     "label": {
      "en": "Million requests per month",
      "am": "በወር ሚሊዮን ጥያቄዎች"
     },
     "int": false
    },
    "y": {
     "label": "USD",
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "VPS",
       "am": "VPS"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       0.1,
       0.5,
       1.0,
       2.0,
       5.0,
       10.0,
       20.0,
       50.0
      ],
      "y": [
       12.0,
       12.0,
       12.0,
       12.0,
       12.0,
       12.0,
       12.0,
       36.0
      ],
      "tip": [
       "12|VPS · 0.1",
       "12|VPS · 0.5",
       "12|VPS · 1",
       "12|VPS · 2",
       "12|VPS · 5",
       "12|VPS · 10",
       "12|VPS · 20",
       "36|VPS · 50"
      ],
      "endlabel": {
       "en": "VPS",
       "am": "VPS"
      }
     },
     {
      "name": {
       "en": "Serverless",
       "am": "Serverless"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       0.1,
       0.5,
       1.0,
       2.0,
       5.0,
       10.0,
       20.0,
       50.0
      ],
      "y": [
       0.16,
       0.8,
       1.6,
       3.4,
       8.8,
       17.8,
       35.8,
       89.8
      ],
      "tip": [
       "0.16|Serverless · 0.1",
       "0.8|Serverless · 0.5",
       "1.6|Serverless · 1",
       "3.4|Serverless · 2",
       "8.8|Serverless · 5",
       "17.8|Serverless · 10",
       "35.8|Serverless · 20",
       "89.8|Serverless · 50"
      ],
      "endlabel": {
       "en": "Serverless",
       "am": "Serverless"
      }
     },
     {
      "name": {
       "en": "Managed container",
       "am": "Managed container"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       0.1,
       0.5,
       1.0,
       2.0,
       5.0,
       10.0,
       20.0,
       50.0
      ],
      "y": [
       25.035,
       25.175,
       25.35,
       25.7,
       26.75,
       28.5,
       32.0,
       42.5
      ],
      "tip": [
       "25.04|Managed container · 0.1",
       "25.18|Managed container · 0.5",
       "25.35|Managed container · 1",
       "25.7|Managed container · 2",
       "26.75|Managed container · 5",
       "28.5|Managed container · 10",
       "32|Managed container · 20",
       "42.5|Managed container · 50"
      ],
      "endlabel": {
       "en": "Managed container",
       "am": "Managed container"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Million requests per month",
       "am": "በወር ሚሊዮን ጥያቄዎች"
      },
      {
       "en": "VPS",
       "am": "VPS"
      },
      {
       "en": "Serverless",
       "am": "Serverless"
      },
      {
       "en": "Managed container",
       "am": "Managed container"
      }
     ],
     "rows": [
      [
       0.1,
       12.0,
       0.16,
       25.035
      ],
      [
       0.5,
       12.0,
       0.8,
       25.175
      ],
      [
       1.0,
       12.0,
       1.6,
       25.35
      ],
      [
       2.0,
       12.0,
       3.4,
       25.7
      ],
      [
       5.0,
       12.0,
       8.8,
       26.75
      ],
      [
       10.0,
       12.0,
       17.8,
       28.5
      ],
      [
       20.0,
       12.0,
       35.8,
       32.0
      ],
      [
       50.0,
       36.0,
       89.8,
       42.5
      ]
     ]
    },
    "rpad": 120
   }
  ],
  "analysis": {
   "en": [
    "Below about 1 million requests serverless is almost free, but its cost grows fastest with traffic.",
    "A small VPS has a flat cost and becomes the cheapest above about 6.8 million requests a month, but someone must patch and monitor it.",
    "The managed container is the most expensive at low traffic, beats serverless above about 17 million, and needs no server maintenance."
   ],
   "am": [
    "ከ1 ሚሊዮን ጥያቄዎች በታች serverless ከሞላ ጎደል ነጻ ነው፤ ግን ወጪው ከትራፊክ ጋር በፍጥነት ያድጋል።",
    "ትንሽ VPS ቋሚ ወጪ አለው፣ በወር ከ6.8 ሚሊዮን ጥያቄዎች ገደማ በላይም በጣም ርካሹ ይሆናል፤ ግን አንድ ሰው patch ማድረግና መከታተል አለበት።",
    "managed containerኡ በዝቅተኛ ትራፊክ በጣም ውዱ ነው፣ ከ17 ሚሊዮን ገደማ በላይ serverlessን ያሸንፋል፣ የሰርቨር ጥገናም አያስፈልገውም።"
   ]
  },
  "decision": {
   "en": "Start serverless at today’s 0.8 M requests; package the API in Docker from day one so you can move to a VPS (or a managed container if nobody can maintain a server) when traffic passes about 7 M requests a month. Set a budget alert at 80%.",
   "am": "በዛሬው 0.8 M ጥያቄዎች በserverless ጀምር፤ ትራፊኩ በወር ወደ 7 M ጥያቄዎች ገደማ ሲያልፍ ወደ VPS (ሰርቨርን የሚጠግን ሰው ከሌለ ወደ managed container) እንድትሸጋገር APIውን ከመጀመሪያው ቀን ጀምሮ በDocker አሽገው። በ80% የበጀት ማንቂያ አዘጋጅ።"
  },
  "note": {
   "en": "Prices are illustrative; take real numbers from your provider’s calculator for your region before deciding.",
   "am": "ዋጋዎቹ ለማሳያ ናቸው፤ ከመወሰንህ በፊት ለክልልህ እውነተኛ ቁጥሮችን ከአቅራቢህ ማስሊያ ውሰድ።"
  }
 },
 {
  "title": {
   "en": "ETL pipeline with a data-quality report",
   "am": "ከዳታ-ጥራት ሪፖርት ጋር የETL pipeline"
  },
  "goal": {
   "en": "Build a pipeline for 5,000 messy SMS price reports with validation checks, a quality report and clean output, and decide what to fix at the source.",
   "am": "ለ5,000 የተዘበራረቁ የSMS የዋጋ ሪፖርቶች ከማረጋገጫ ፍተሻዎች፣ ከጥራት ሪፖርትና ከንጹሕ ውጤት ጋር pipeline ገንባ፣ ከምንጩ ምን እንደሚስተካከል ወስን።"
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
    "name": "Parquet (pyarrow)",
    "why": {
     "en": "compact, typed output files",
     "am": "የታመቁ፣ ዓይነት ያላቸው የውጤት ፋይሎች"
    },
    "get": "pip install pyarrow"
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
    "Extract: read the raw CSV.",
    "Validate: duplicates, missing price, wrong unit, impossible price, unknown market.",
    "Transform: fix what can be fixed (units, names), quarantine the rest with a reason.",
    "Load: write clean data (Parquet or CSV) and a quality report.",
    "Rank problems by count and trace them to their source."
   ],
   "am": [
    "Extract፡ ጥሬውን CSV አንብብ።",
    "አረጋግጥ፡ ድግግሞሾች፣ የጎደለ ዋጋ፣ የተሳሳተ መለኪያ፣ የማይቻል ዋጋ፣ ያልታወቀ ገበያ።",
    "Transform፡ ሊስተካከል የሚችለውን አስተካክል (መለኪያዎች፣ ስሞች)፣ ቀሪውን ከምክንያት ጋር ለይ።",
    "Load፡ ንጹሕ ዳታን (Parquet ወይም CSV) እና የጥራት ሪፖርትን ጻፍ።",
    "ችግሮችን በብዛት ደርድርና ወደ ምንጫቸው ተከታተላቸው።"
   ]
  },
  "code": "import numpy as np, pandas as pd\nrng = np.random.default_rng(2); n = 5000\nmarkets = [\"Bahir Dar\", \"Gondar\", \"Dessie\", \"Debre Markos\", \"Woldia\"]\nraw = pd.DataFrame({\"report_id\": np.arange(n), \"sender\": rng.integers(1, 120, n),\n                    \"market\": rng.choice(markets + [\"bahir dar \", \"Gonder\", \"XYZ\"], n, p=[.17, .17, .17, .17, .17, .06, .06, .03]),\n                    \"unit\": rng.choice([\"kg\", \"100g\", \"quintal\"], n, p=[.9, .06, .04])})\nper_kg = rng.normal(118, 8, n); scale = raw.unit.map({\"kg\": 1, \"100g\": 0.1, \"quintal\": 100})\nraw[\"price\"] = (per_kg * scale).round(1).astype(str)                          # senders report in their own unit\nraw.loc[rng.choice(n, 150, replace=False), \"price\"] = \"\"\nraw.loc[rng.choice(n, 40, replace=False), \"price\"] = \"9999\"\nraw = pd.concat([raw, raw.sample(120, random_state=1)])                       # duplicates\nissues = {}\ndf = raw.drop_duplicates(\"report_id\"); issues[\"duplicate\"] = len(raw) - len(df)\ndf = df.assign(market=df.market.str.strip().str.title().replace({\"Gonder\": \"Gondar\"}))\ndf[\"price\"] = pd.to_numeric(df.price, errors=\"coerce\")\ndf.loc[df.unit == \"100g\", \"price\"] *= 10; df.loc[df.unit == \"quintal\", \"price\"] /= 100\nissues[\"unit converted\"] = int((df.unit != \"kg\").sum())\nbad = pd.Series(\"\", index=df.index)\nbad[df.price.isna()] = \"missing price\"; bad[(bad == \"\") & ~df.price.between(20, 400)] = \"impossible price\"\nbad[(bad == \"\") & ~df.market.isin(markets)] = \"unknown market\"\nfor reason in [\"missing price\", \"impossible price\", \"unknown market\"]: issues[reason] = int((bad == reason).sum())\nclean, quarantine = df[bad == \"\"], df[bad != \"\"].assign(reason=bad[bad != \"\"])\nprint(f\"raw {len(raw)} -> clean {len(clean)}, quarantined {len(quarantine)}\"); print(issues)\ntop_senders = quarantine.groupby(\"sender\").size().sort_values(ascending=False).head(3)\nprint(\"senders with most rejected reports:\", top_senders.to_dict())",
  "out": "raw 5120 -> clean 4686, quarantined 314\n{'duplicate': 120, 'unit converted': 520, 'missing price': 148, 'impossible price': 38, 'unknown market': 128}\nsenders with most rejected reports: {15: 7, 76: 7, 70: 7}",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Data-quality issues found",
     "am": "የተገኙ የዳታ-ጥራት ችግሮች"
    },
    "x": {
     "label": {
      "en": "Rows",
      "am": "ረድፎች"
     }
    },
    "fmt": 0,
    "cats": [
     "duplicate",
     "unit converted",
     "missing price",
     "impossible price",
     "unknown market"
    ],
    "series": [
     {
      "name": {
       "en": "Rows",
       "am": "ረድፎች"
      },
      "slot": 1,
      "v": [
       120.0,
       520.0,
       148.0,
       38.0,
       128.0
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
       "en": "Rows",
       "am": "ረድፎች"
      }
     ],
     "rows": [
      [
       "duplicate",
       120.0
      ],
      [
       "unit converted",
       520.0
      ],
      [
       "missing price",
       148.0
      ],
      [
       "impossible price",
       38.0
      ],
      [
       "unknown market",
       128.0
      ]
     ]
    }
   },
   {
    "type": "seg",
    "title": {
     "en": "What happened to the raw rows",
     "am": "በጥሬዎቹ ረድፎች ላይ የሆነው"
    },
    "unit": "rows",
    "parts": [
     {
      "name": {
       "en": "Clean",
       "am": "ንጹሕ"
      },
      "v": 4686.0,
      "slot": 1
     },
     {
      "name": {
       "en": "Quarantined",
       "am": "የተለዩ"
      },
      "v": 314.0,
      "slot": 2
     },
     {
      "name": {
       "en": "Duplicates removed",
       "am": "የተወገዱ ድግግሞሾች"
      },
      "v": 120.0,
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
        "en": "Clean",
        "am": "ንጹሕ"
       },
       4686.0
      ],
      [
       {
        "en": "Quarantined",
        "am": "የተለዩ"
       },
       314.0
      ],
      [
       {
        "en": "Duplicates removed",
        "am": "የተወገዱ ድግግሞሾች"
       },
       120.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "4,686 of 5,120 rows are usable; 314 are quarantined with a reason, none silently dropped.",
    "The biggest problems: missing price (148), unknown market (128).",
    "520 reports used 100 g or quintal units and were converted, not lost."
   ],
   "am": [
    "ከ5,120 ረድፎች 4,686 ጥቅም ላይ የሚውሉ ናቸው፤ 314 ከምክንያት ጋር ተለይተዋል፣ አንዳቸውም በዝምታ አልተጣሉም።",
    "ትልቁ ችግሮች፡ missing price (148)፣ unknown market (128)።",
    "520 ሪፖርቶች የ100 g ወይም የኩንታል መለኪያዎችን ተጠቅመው ተቀይረዋል እንጂ አልጠፉም።"
   ]
  },
  "decision": {
   "en": "Fix at the source: make the SMS form reject empty prices, use market codes instead of typed names, and send a receipt with the report ID (stops resends); retrain the top senders; keep the quarantine table and review it weekly.",
   "am": "ከምንጩ አስተካክል፡ የSMS ቅጹ ባዶ ዋጋዎችን እንዲከለክል፣ በተተየቡ ስሞች ፋንታ የገበያ ኮዶችን እንዲጠቀምና ከሪፖርቱ ID ጋር ደረሰኝ እንዲልክ አድርግ (እንደገና መላክን ያቆማል)፤ ዋናዎቹን ላኪዎች እንደገና አሰልጥን፤ የተለየውን ሰንጠረዥ አቆይና በየሳምንቱ ገምግመው።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "A/B test: do SMS reminders raise vaccination?",
   "am": "A/B ፈተና፡ የSMS ማስታወሻዎች ክትባትን ያሳድጋሉ?"
  },
  "goal": {
   "en": "Plan the sample size, run a randomised SMS-reminder test for livestock vaccination, analyse the difference with a confidence interval, and decide on rollout.",
   "am": "የናሙና መጠኑን አቅድ፣ ለእንስሳት ክትባት በዘፈቀደ የተመደበ የSMS-ማስታወሻ ፈተና አካሂድ፣ ልዩነቱን ከconfidence interval ጋር ተንትን፣ ስለ ማስፋፋት ወስን።"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
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
    "Choose the smallest effect worth acting on (here +5 points from a 40% baseline).",
    "Compute the sample size for 80% power at α = 0.05.",
    "Randomise households to reminder or no reminder.",
    "After 4 weeks, count vaccinated herds in each group.",
    "Report the difference, its 95% CI and the cost per extra vaccination."
   ],
   "am": [
    "ለመሥራት የሚያዋጣውን ትንሹን ውጤት ምረጥ (እዚህ ከ40% መነሻ +5 ነጥቦች)።",
    "ለ80% power በα = 0.05 የናሙና መጠኑን አስላ።",
    "ቤተሰቦችን ወደ ማስታወሻ ወይም ያለ ማስታወሻ በዘፈቀደ መድብ።",
    "ከ4 ሳምንታት በኋላ በእያንዳንዱ ቡድን የተከተቡ መንጋዎችን ቁጠር።",
    "ልዩነቱን፣ 95% CIውን እና በአንድ ተጨማሪ ክትባት ወጪውን ዘግብ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\np0, lift, alpha, power = 0.40, 0.05, 0.05, 0.80\nz = stats.norm.ppf(1 - alpha / 2) + stats.norm.ppf(power)\nn_per_group = int(np.ceil(z ** 2 * (p0 * (1 - p0) + (p0 + lift) * (1 - p0 - lift)) / lift ** 2))\nprint(\"households needed per group:\", n_per_group)\nrng = np.random.default_rng(8)\ncontrol = rng.random(n_per_group) < 0.40; sms = rng.random(n_per_group) < 0.465       # results after 4 weeks\npa, pb = control.mean(), sms.mean(); diff = pb - pa\nse = np.sqrt(pa * (1 - pa) / n_per_group + pb * (1 - pb) / n_per_group); lo, hi = diff - 1.96 * se, diff + 1.96 * se\npval = 2 * stats.norm.sf(abs(diff / np.sqrt((pa + pb) / 2 * (1 - (pa + pb) / 2) * 2 / n_per_group)))\ncost_sms = 3 * 0.5                                                                   # 3 SMS at 0.5 birr\nprint(f\"control {pa:.1%}, SMS {pb:.1%}, difference {diff:+.1%} (95% CI {lo:+.1%} to {hi:+.1%}), p = {pval:.4f}\")\nprint(f\"cost per extra vaccinated herd: {cost_sms / diff:.1f} birr\")",
  "out": "households needed per group: 1531\ncontrol 40.2%, SMS 44.7%, difference +4.6% (95% CI +1.1% to +8.1%), p = 0.0105\ncost per extra vaccinated herd: 32.8 birr",
  "lang": "Python",
  "viz": [
   {
    "type": "dot",
    "title": {
     "en": "Vaccination rate with 95% intervals",
     "am": "የክትባት መጠን ከ95% ክልሎች ጋር"
    },
    "x": {
     "label": {
      "en": "Percent of herds vaccinated",
      "am": "የተከተቡ መንጋዎች መቶኛ"
     }
    },
    "cats": [
     {
      "en": "No reminder",
      "am": "ማስታወሻ የለም"
     },
     {
      "en": "SMS reminder",
      "am": "የSMS ማስታወሻ"
     }
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
       40.17,
       44.742
      ],
      "lo": [
       37.714,
       42.251
      ],
      "hi": [
       42.626,
       47.233
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
       {
        "en": "No reminder",
        "am": "ማስታወሻ የለም"
       },
       40.17,
       37.714,
       42.626
      ],
      [
       {
        "en": "SMS reminder",
        "am": "የSMS ማስታወሻ"
       },
       44.742,
       42.251,
       47.233
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "1,531 households per group were needed to detect a 5-point lift reliably.",
    "Reminders raised vaccination by +4.6% (95% CI +1.1% to +8.1%).",
    "Each extra vaccinated herd cost about 33 birr in SMS."
   ],
   "am": [
    "የ5-ነጥብ ጭማሪን በአስተማማኝ ሁኔታ ለመለየት በቡድን 1,531 ቤተሰቦች አስፈልገዋል።",
    "ማስታወሻዎች ክትባትን በ+4.6% አሳድገዋል (95% CI +1.1% እስከ +8.1%)።",
    "እያንዳንዱ ተጨማሪ የተከተበ መንጋ በSMS ወደ 33 ብር ገደማ አስወጥቷል።"
   ]
  },
  "decision": {
   "en": "Roll out the reminders: the whole interval is above zero and the cost per extra herd is far below the value of preventing an outbreak. Keep 5% of households as a control to keep measuring.",
   "am": "ማስታወሻዎቹን አስፋፋ፡ ሙሉው ክልል ከዜሮ በላይ ነው፣ በአንድ ተጨማሪ መንጋ ያለው ወጪም ወረርሽኝን ከመከላከል ዋጋ በጣም ያነሰ ነው። መለካቱን ለመቀጠል 5% ቤተሰቦችን እንደ control አቆይ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Image classifier with augmentation and quantisation",
   "am": "ከaugmentation እና quantisation ጋር የምስል classifier"
  },
  "goal": {
   "en": "Train a small neural network on 8×8 digit images (a stand-in for leaf photos), measure how training size and augmentation change accuracy, then quantise it for a phone.",
   "am": "በ8×8 የአሃዝ ምስሎች (ለቅጠል ፎቶዎች ምትክ) ላይ ትንሽ neural network አሰልጥን፣ የሥልጠና መጠንና augmentation accuracyን እንዴት እንደሚቀይሩ ለካ፣ ከዚያ ለስልክ quantise አድርገው።"
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
    "name": "scikit-learn",
    "why": {
     "en": "machine-learning models and evaluation",
     "am": "የmachine-learning ሞዴሎችና ግምገማ"
    },
    "get": "pip install scikit-learn"
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
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   },
   {
    "name": "PyTorch or TensorFlow Lite (next step)",
    "why": {
     "en": "real CNNs and phone export",
     "am": "እውነተኛ CNNs እና ወደ ስልክ መላክ"
    },
    "get": "pytorch.org, tensorflow.org"
   }
  ],
  "steps": {
   "en": [
    "Load the digits dataset (1,797 images) and hold out 30% as a test set; make a “field” copy of the test set with every image framed one pixel off.",
    "Train an MLP with 50, 100, 200 and 400 training images; test on both copies.",
    "Augment: add copies shifted one pixel left/right/up/down and retrain.",
    "Quantise the trained weights to 8-bit integers and re-test.",
    "Plot accuracy against training size with and without augmentation."
   ],
   "am": [
    "የdigits ዳታሴትን (1,797 ምስሎች) ጫንና 30%ን እንደ የፈተና ስብስብ ለይ፤ እያንዳንዱ ምስል አንድ pixel ተዛብቶ የተቀረጸበት የፈተና ስብስቡን «የመስክ» ቅጂ ሥራ።",
    "MLPን በ50፣ 100፣ 200 እና 400 የሥልጠና ምስሎች አሰልጥን፤ በሁለቱም ቅጂዎች ፈትሽ።",
    "Augment፡ ወደ ግራ/ቀኝ/ላይ/ታች አንድ pixel የተዛወሩ ቅጂዎችን ጨምርና እንደገና አሰልጥን።",
    "የሰለጠኑትን weights ወደ 8-bit integers quantise አድርግና እንደገና ፈትሽ።",
    "accuracyን ከሥልጠና መጠን አንፃር ከaugmentation ጋርና ያለ augmentation ቻርት አድርግ።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.datasets import load_digits\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.neural_network import MLPClassifier\nX, y = load_digits(return_X_y=True); X = X / 16\nXtr_all, Xte, ytr_all, yte = train_test_split(X, y, test_size=0.3, random_state=0, stratify=y)\ndef shift(imgs, dx, dy):\n    im = imgs.reshape(-1, 8, 8); out = np.zeros_like(im)\n    out[:, max(dy, 0):8 + min(dy, 0), max(dx, 0):8 + min(dx, 0)] = im[:, max(-dy, 0):8 + min(-dy, 0), max(-dx, 0):8 + min(-dx, 0)]\n    return out.reshape(-1, 64)\nmoves = [(1, 0), (-1, 0), (0, 1), (0, -1)]; pick = np.random.default_rng(1).integers(0, 4, len(Xte))\nXfield = np.vstack([shift(Xte[i:i + 1], *moves[pick[i]]) for i in range(len(Xte))])   # \"field photos\": framed 1 pixel off\nsizes, neat, plain, aug = [50, 100, 200, 400], [], [], []\nfor n in sizes:\n    Xs, ys = Xtr_all[:n], ytr_all[:n]\n    m0 = MLPClassifier((64,), max_iter=3000, random_state=0).fit(Xs, ys); neat.append(m0.score(Xte, yte)); plain.append(m0.score(Xfield, yte))\n    Xa = np.vstack([Xs] + [shift(Xs, dx, dy) for dx, dy in moves]); ya = np.tile(ys, 5)\n    aug.append(MLPClassifier((64,), max_iter=3000, random_state=0).fit(Xa, ya).score(Xfield, yte))\nfor n, a, b, c in zip(sizes, neat, plain, aug): print(f\"{n:3d} images: plain on neat test {a:.3f}, plain on field test {b:.3f}, augmented on field test {c:.3f}\")\nm = MLPClassifier((64,), max_iter=3000, random_state=0).fit(Xtr_all, ytr_all); full = m.score(Xte, yte)\nfor i, W in enumerate(m.coefs_):\n    s = np.abs(W).max() / 127; m.coefs_[i] = np.round(W / s).astype(np.int8).astype(float) * s\nquant = m.score(Xte, yte)\nprint(f\"all {len(Xtr_all)} images: float32 {full:.3f} -> int8 {quant:.3f}; weights 4x smaller\")",
  "out": " 50 images: plain on neat test 0.850, plain on field test 0.354, augmented on field test 0.726\n100 images: plain on neat test 0.917, plain on field test 0.376, augmented on field test 0.807\n200 images: plain on neat test 0.930, plain on field test 0.370, augmented on field test 0.869\n400 images: plain on neat test 0.957, plain on field test 0.424, augmented on field test 0.924\nall 1257 images: float32 0.978 -> int8 0.978; weights 4x smaller",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Test accuracy vs training images",
     "am": "የፈተና accuracy vs የሥልጠና ምስሎች"
    },
    "x": {
     "label": {
      "en": "Training images",
      "am": "የሥልጠና ምስሎች"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Accuracy",
      "am": "Accuracy"
     },
     "min": 0,
     "max": 1
    },
    "series": [
     {
      "name": {
       "en": "Plain, neat test photos",
       "am": "ተራ፣ ንጹሕ የፈተና ፎቶዎች"
      },
      "slot": 0,
      "kind": "line",
      "markers": true,
      "x": [
       50.0,
       100.0,
       200.0,
       400.0
      ],
      "y": [
       0.85,
       0.9167,
       0.9296,
       0.9574
      ],
      "tip": [
       "0.85|Plain, neat test photos · 50",
       "0.9167|Plain, neat test photos · 100",
       "0.9296|Plain, neat test photos · 200",
       "0.9574|Plain, neat test photos · 400"
      ],
      "endlabel": {
       "en": "Plain, neat test photos",
       "am": "ተራ፣ ንጹሕ የፈተና ፎቶዎች"
      }
     },
     {
      "name": {
       "en": "Plain, field photos",
       "am": "ተራ፣ የመስክ ፎቶዎች"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       50.0,
       100.0,
       200.0,
       400.0
      ],
      "y": [
       0.3537,
       0.3759,
       0.3704,
       0.4241
      ],
      "tip": [
       "0.3537|Plain, field photos · 50",
       "0.3759|Plain, field photos · 100",
       "0.3704|Plain, field photos · 200",
       "0.4241|Plain, field photos · 400"
      ],
      "endlabel": {
       "en": "Plain, field photos",
       "am": "ተራ፣ የመስክ ፎቶዎች"
      }
     },
     {
      "name": {
       "en": "Augmented, field photos",
       "am": "Augmented፣ የመስክ ፎቶዎች"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       50.0,
       100.0,
       200.0,
       400.0
      ],
      "y": [
       0.7259,
       0.8074,
       0.8685,
       0.9241
      ],
      "tip": [
       "0.7259|Augmented, field photos · 50",
       "0.8074|Augmented, field photos · 100",
       "0.8685|Augmented, field photos · 200",
       "0.9241|Augmented, field photos · 400"
      ],
      "endlabel": {
       "en": "Augmented, field photos",
       "am": "Augmented፣ የመስክ ፎቶዎች"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Training images",
       "am": "የሥልጠና ምስሎች"
      },
      {
       "en": "Plain, neat test photos",
       "am": "ተራ፣ ንጹሕ የፈተና ፎቶዎች"
      },
      {
       "en": "Plain, field photos",
       "am": "ተራ፣ የመስክ ፎቶዎች"
      },
      {
       "en": "Augmented, field photos",
       "am": "Augmented፣ የመስክ ፎቶዎች"
      }
     ],
     "rows": [
      [
       50.0,
       0.85,
       0.354,
       0.726
      ],
      [
       100.0,
       0.917,
       0.376,
       0.807
      ],
      [
       200.0,
       0.93,
       0.37,
       0.869
      ],
      [
       400.0,
       0.957,
       0.424,
       0.924
      ]
     ]
    },
    "rpad": 150
   }
  ],
  "analysis": {
   "en": [
    "A model trained on neat images scores 95.7% on neat test images but only 42.4% when the same images are framed one pixel off.",
    "Shift augmentation raises field accuracy to 92.4% with 400 images (from 35.4% to 72.6% with only 50).",
    "Using all 1257 images gives 97.8% on neat test photos.",
    "8-bit weights give 97.8%: almost no loss for a 4× smaller model."
   ],
   "am": [
    "በንጹሕ ምስሎች የሰለጠነ ሞዴል በንጹሕ የፈተና ምስሎች 95.7% ያገኛል፤ ያው ምስሎች አንድ pixel ተዛብተው ሲቀረጹ ግን 42.4% ብቻ።",
    "Shift augmentation የመስክ accuracyን በ400 ምስሎች ወደ 92.4% ያሳድጋል (በ50 ብቻ ከ35.4% ወደ 72.6%)።",
    "ሁሉንም 1257 ምስሎች መጠቀም በንጹሕ የፈተና ፎቶዎች 97.8% ይሰጣል።",
    "የ8-bit weights 97.8% ይሰጣሉ፡ ለ4× ያነሰ ሞዴል ከሞላ ጎደል ምንም ኪሳራ የለም።"
   ]
  },
  "decision": {
   "en": "Test on photos taken the way farmers will take them, not on neat lab photos; augment with the variation you expect in the field (position, angle, light), and ship the int8 model to phones.",
   "am": "በንጹሕ የላብራቶሪ ፎቶዎች ሳይሆን ገበሬዎች በሚያነሱበት መንገድ በተነሱ ፎቶዎች ፈትሽ፤ በመስክ በምትጠብቀው ልዩነት (ቦታ፣ ማዕዘን፣ ብርሃን) augment አድርግ፣ የint8 ሞዴሉንም ወደ ስልኮች ላክ።"
  }
 },
 {
  "title": {
   "en": "Monitoring a deployed model for drift",
   "am": "የተሰማራ ሞዴልን ለdrift መከታተል"
  },
  "goal": {
   "en": "Track 12 weeks of a yield-advice model in production with input drift (PSI) and accuracy, find when it broke, and set alert and retraining rules.",
   "am": "በምርት ላይ ያለ የምርት-ምክር ሞዴልን ለ12 ሳምንታት በinput drift (PSI) እና በaccuracy ተከታተል፣ መቼ እንደተበላሸ ፈልግ፣ የማንቂያና የእንደገና ማሰልጠኛ ሕጎችን አዘጋጅ።"
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
    "name": "NumPy",
    "why": {
     "en": "fast maths on arrays",
     "am": "በarrays ላይ ፈጣን ሒሳብ"
    },
    "get": "pip install numpy"
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
    "name": "MLflow (optional)",
    "why": {
     "en": "track model versions and metrics",
     "am": "የሞዴል ስሪቶችንና metricsን መከታተል"
    },
    "get": "pip install mlflow"
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
    "Train the model on last season’s data and save the training feature distribution.",
    "Each week, compute PSI for rainfall against training.",
    "When labels arrive, compute weekly error.",
    "Plot both; mark the alert thresholds (PSI 0.2, error +30%).",
    "Retrain with recent data and compare."
   ],
   "am": [
    "ሞዴሉን በባለፈው ወቅት ዳታ አሰልጥንና የሥልጠና feature ስርጭቱን አስቀምጥ።",
    "በየሳምንቱ ለዝናብ ከሥልጠናው አንፃር PSI አስላ።",
    "labels ሲደርሱ ሳምንታዊ ስህተትን አስላ።",
    "ሁለቱንም ቻርት አድርግ፤ የማንቂያ ወሰኖችን ምልክት አድርግ (PSI 0.2፣ ስህተት +30%)።",
    "በቅርብ ዳታ እንደገና አሰልጥንና አወዳድር።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.linear_model import LinearRegression\nrng = np.random.default_rng(6)\ndef season(n, rain_mean, effect=0.004):\n    rain = rng.normal(rain_mean, 90, n); fert = rng.uniform(0, 100, n)\n    y = 0.8 + effect * rain + 0.01 * fert - 0.0000025 * (rain - 800) ** 2 + rng.normal(0, 0.2, n)\n    return np.column_stack([rain, fert]), y\nXtr, ytr = season(2000, 780); model = LinearRegression().fit(Xtr, ytr)\nedges = np.quantile(Xtr[:, 0], np.linspace(0, 1, 11)); edges[0], edges[-1] = -1e9, 1e9\nbase = np.histogram(Xtr[:, 0], edges)[0] / len(Xtr)\ndef psi(x):\n    cur = np.clip(np.histogram(x, edges)[0] / len(x), 1e-4, None)\n    return float(np.sum((cur - base) * np.log(cur / np.clip(base, 1e-4, None))))\nweeks = list(range(1, 13)); psis, errs = [], []\nfor wk in weeks:\n    mean = 780 if wk < 8 else 520                      # drought begins in week 8\n    Xw, yw = season(150, mean)\n    psis.append(psi(Xw[:, 0])); errs.append(float(np.mean(np.abs(model.predict(Xw) - yw))))\nbase_err = np.mean(errs[:4]); alert = next(w for w, p, e in zip(weeks, psis, errs) if p > 0.2 or e > 1.3 * base_err)\nXn, yn = season(600, 520); retrained = LinearRegression().fit(np.vstack([Xtr[:600], Xn]), np.r_[ytr[:600], yn])\nXt, yt = season(300, 520)\nprint(f\"baseline error {base_err:.3f}; first alert in week {alert}\")\nprint(f\"week 12: old model error {np.mean(np.abs(model.predict(Xt) - yt)):.3f}, retrained {np.mean(np.abs(retrained.predict(Xt) - yt)):.3f}\")\nold_e, new_e = np.mean(np.abs(model.predict(Xt) - yt)), np.mean(np.abs(retrained.predict(Xt) - yt))",
  "out": "baseline error 0.153; first alert in week 8\nweek 12: old model error 0.213, retrained 0.159",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Input drift (PSI for rainfall)",
     "am": "የinput drift (ለዝናብ PSI)"
    },
    "x": {
     "label": {
      "en": "Week",
      "am": "ሳምንት"
     },
     "int": true
    },
    "y": {
     "label": "PSI",
     "min": 0
    },
    "series": [
     {
      "name": "PSI",
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
       12.0
      ],
      "y": [
       0.1103,
       0.0717,
       0.0726,
       0.0607,
       0.0881,
       0.0248,
       0.0382,
       6.3036,
       7.1672,
       6.1834,
       6.4377,
       7.0473
      ],
      "tip": [
       "0.1103|PSI · 1",
       "0.07172|PSI · 2",
       "0.07255|PSI · 3",
       "0.06066|PSI · 4",
       "0.0881|PSI · 5",
       "0.02476|PSI · 6",
       "0.03817|PSI · 7",
       "6.304|PSI · 8",
       "7.167|PSI · 9",
       "6.183|PSI · 10",
       "6.438|PSI · 11",
       "7.047|PSI · 12"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Week",
       "am": "ሳምንት"
      },
      "PSI"
     ],
     "rows": [
      [
       1.0,
       0.11
      ],
      [
       2.0,
       0.072
      ],
      [
       3.0,
       0.073
      ],
      [
       4.0,
       0.061
      ],
      [
       5.0,
       0.088
      ],
      [
       6.0,
       0.025
      ],
      [
       7.0,
       0.038
      ],
      [
       8.0,
       6.304
      ],
      [
       9.0,
       7.167
      ],
      [
       10.0,
       6.183
      ],
      [
       11.0,
       6.438
      ],
      [
       12.0,
       7.047
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0.2,
      "label": {
       "en": "alert 0.2",
       "am": "ማንቂያ 0.2"
      }
     }
    ]
   },
   {
    "type": "xy",
    "title": {
     "en": "Model error (t/ha)",
     "am": "የሞዴል ስህተት (t/ha)"
    },
    "x": {
     "label": {
      "en": "Week",
      "am": "ሳምንት"
     },
     "int": true
    },
    "y": {
     "label": "t/ha",
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Mean absolute error",
       "am": "Mean absolute error"
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
       12.0
      ],
      "y": [
       0.1565,
       0.1557,
       0.1481,
       0.152,
       0.1818,
       0.1739,
       0.1784,
       0.2555,
       0.2139,
       0.2238,
       0.2201,
       0.2097
      ],
      "tip": [
       "0.1565|Mean absolute error · 1",
       "0.1557|Mean absolute error · 2",
       "0.1481|Mean absolute error · 3",
       "0.152|Mean absolute error · 4",
       "0.1818|Mean absolute error · 5",
       "0.1739|Mean absolute error · 6",
       "0.1784|Mean absolute error · 7",
       "0.2555|Mean absolute error · 8",
       "0.2139|Mean absolute error · 9",
       "0.2238|Mean absolute error · 10",
       "0.2201|Mean absolute error · 11",
       "0.2097|Mean absolute error · 12"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Week",
       "am": "ሳምንት"
      },
      {
       "en": "Mean absolute error",
       "am": "Mean absolute error"
      }
     ],
     "rows": [
      [
       1.0,
       0.156
      ],
      [
       2.0,
       0.156
      ],
      [
       3.0,
       0.148
      ],
      [
       4.0,
       0.152
      ],
      [
       5.0,
       0.182
      ],
      [
       6.0,
       0.174
      ],
      [
       7.0,
       0.178
      ],
      [
       8.0,
       0.255
      ],
      [
       9.0,
       0.214
      ],
      [
       10.0,
       0.224
      ],
      [
       11.0,
       0.22
      ],
      [
       12.0,
       0.21
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0.1989840445234223,
      "label": {
       "en": "alert +30%",
       "am": "ማንቂያ +30%"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "PSI stays near 0 until the drought, then jumps above 0.2 in week 8.",
    "Error rises in the same week: the model never saw such dry conditions.",
    "Retraining with drought data cuts error from 0.21 to 0.16 t/ha."
   ],
   "am": [
    "PSI እስከ ድርቁ ድረስ በ0 አቅራቢያ ይቆያል፣ ከዚያ በሳምንት 8 ከ0.2 በላይ ይዘላል።",
    "ስህተቱ በተመሳሳይ ሳምንት ይጨምራል፡ ሞዴሉ እንዲህ ያሉ ደረቅ ሁኔታዎችን አይቶ አያውቅም።",
    "በድርቅ ዳታ እንደገና ማሰልጠን ስህተትን ከ0.21 ወደ 0.16 t/ha ይቀንሳል።"
   ]
  },
  "decision": {
   "en": "Alert when PSI > 0.2 (labels are slow; drift is fast); then pause automatic advice, show a \"conditions unusual\" message, and retrain with recent data after human review.",
   "am": "PSI > 0.2 ሲሆን አስጠንቅቅ (labels ቀርፋፋ ናቸው፤ drift ፈጣን ነው)፤ ከዚያ አውቶማቲክ ምክርን አቁም፣ «ሁኔታዎች ያልተለመዱ ናቸው» መልእክት አሳይ፣ ከሰው ግምገማ በኋላ በቅርብ ዳታ እንደገና አሰልጥን።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Evaluating a retrieval assistant for extension advice",
   "am": "ለኤክስቴንሽን ምክር የretrieval ረዳትን መገምገም"
  },
  "goal": {
   "en": "Build an evaluation set of 12 farmer questions, compare two retrieval methods by recall@1 and recall@3, and decide which to put behind the assistant.",
   "am": "የ12 የገበሬ ጥያቄዎች የግምገማ ስብስብ ገንባ፣ ሁለት የretrieval ዘዴዎችን በrecall@1 እና recall@3 አወዳድር፣ ከረዳቱ ጀርባ የትኛውን እንደምታስቀምጥ ወስን።"
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
    "name": "scikit-learn",
    "why": {
     "en": "machine-learning models and evaluation",
     "am": "የmachine-learning ሞዴሎችና ግምገማ"
    },
    "get": "pip install scikit-learn"
   },
   {
    "name": "An LLM API (next step)",
    "why": {
     "en": "writes the answer from retrieved passages",
     "am": "ከተገኙ ክፍሎች መልሱን ይጽፋል"
    },
    "get": "any provider; keep keys in environment variables"
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
    "Split extension guides into short passages with source names.",
    "Write 12 real questions and mark the passage that answers each.",
    "Method A: word matching (TF-IDF). Method B: TF-IDF on 3–5 letter pieces (handles spelling variants).",
    "Compute recall@1 and recall@3 for each method.",
    "Read the failures and decide."
   ],
   "am": [
    "የኤክስቴንሽን መመሪያዎችን ከምንጭ ስሞች ጋር ወደ አጫጭር ክፍሎች ክፈል።",
    "12 እውነተኛ ጥያቄዎችን ጻፍና እያንዳንዱን የሚመልሰውን ክፍል ምልክት አድርግ።",
    "ዘዴ A፡ የቃላት ማዛመድ (TF-IDF)። ዘዴ B፡ TF-IDF በ3–5 ፊደላት ቁርጥራጮች ላይ (የፊደል ልዩነቶችን ይይዛል)።",
    "ለእያንዳንዱ ዘዴ recall@1 እና recall@3 አስላ።",
    "ውድቀቶቹን አንብብና ወስን።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\ndocs = [\"Plant teff when the main rains start, usually in July, on a fine and firm seedbed.\",\n        \"Harvest teff when the straw turns yellow and before the seeds shatter.\",\n        \"Apply urea to maize in two splits: at planting and when the plant is knee high.\",\n        \"Store grain only after drying it below 13 percent moisture, in hermetic bags.\",\n        \"Wheat rust shows orange pustules on leaves; spray fungicide if more than 5 percent of leaves are infected.\",\n        \"Vaccinate cattle against lumpy skin disease every year before the rainy season.\",\n        \"Faba bean fixes nitrogen; rotating it with wheat raises the next wheat yield.\",\n        \"Use 15 kg of teff seed per hectare when broadcasting, less when row planting.\",\n        \"Fall armyworm makes ragged holes in maize leaves; scout 20 plants per field each week.\",\n        \"Give dairy cows clean water all day; a cow needs about 60 litres a day.\"]\nqs = [(\"when to plant teff\", 0), (\"teff harvest time\", 1), (\"how to split urea for maize\", 2), (\"moisture before storing grain\", 3),\n      (\"orange spots on wheat leaves\", 4), (\"lumpy skin vaccine timing\", 5), (\"why rotate faba bean and wheat\", 6),\n      (\"seed rate of teff per hectare\", 7), (\"holes in maize leaves\", 8), (\"how much water for a dairy cow\", 9),\n      (\"tef planting month\", 0), (\"armyworm scouting\", 8)]\nmethods = {\"A: words\": TfidfVectorizer(), \"B: character pieces\": TfidfVectorizer(analyzer=\"char_wb\", ngram_range=(3, 5))}\nres, fails = {}, {}\nfor name, vec in methods.items():\n    M = vec.fit_transform(docs); r1 = r3 = 0; fails[name] = []\n    for q, gold in qs:\n        rank = np.argsort(-cosine_similarity(vec.transform([q]), M)[0])\n        r1 += rank[0] == gold; r3 += gold in rank[:3]\n        if rank[0] != gold: fails[name].append(q)\n    res[name] = (r1 / len(qs), r3 / len(qs))\n    print(f\"{name:30s} recall@1 {res[name][0]:.2f}  recall@3 {res[name][1]:.2f}  misses: {fails[name]}\")\nbest = max(res, key=lambda k: res[k])",
  "out": "A: words                       recall@1 0.83  recall@3 0.92  misses: ['when to plant teff', 'tef planting month']\nB: character pieces            recall@1 0.83  recall@3 1.00  misses: ['when to plant teff', 'tef planting month']",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Retrieval quality on 12 questions",
     "am": "በ12 ጥያቄዎች ላይ የretrieval ጥራት"
    },
    "x": {
     "label": {
      "en": "Share of questions",
      "am": "የጥያቄዎች ድርሻ"
     }
    },
    "fmt": 2,
    "cats": [
     "A: words",
     "B: character pieces"
    ],
    "series": [
     {
      "name": "recall@1",
      "slot": 1,
      "v": [
       0.83,
       0.83
      ]
     },
     {
      "name": "recall@3",
      "slot": 2,
      "v": [
       0.92,
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
      "recall@1",
      "recall@3"
     ],
     "rows": [
      [
       "A: words",
       0.83,
       0.92
      ],
      [
       "B: character pieces",
       0.83,
       1.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "recall@3: A 0.92, B 1.00; recall@1 is 0.83 for A and 0.83 for B.",
    "Misses at rank 1: A: when to plant teff, tef planting month; B: when to plant teff, tef planting month. Passages that share key words get confused; a short title on each passage (“Teff: planting time”) separates them.",
    "recall@3 is what matters when the model reads the top 3 passages; aim for 1.0 there."
   ],
   "am": [
    "recall@3፡ A 0.92፣ B 1.00፤ recall@1 ለA 0.83፣ ለB 0.83 ነው።",
    "በደረጃ 1 ያመለጡ፡ A: when to plant teff, tef planting month፤ B: when to plant teff, tef planting month። ዋና ቃላትን የሚጋሩ ክፍሎች ይምታታሉ፤ በእያንዳንዱ ክፍል ላይ አጭር ርዕስ («ጤፍ፡ የመዝሪያ ጊዜ») ይለያቸዋል።",
    "ሞዴሉ ከፍተኛዎቹን 3 ክፍሎች ሲያነብ አስፈላጊው recall@3 ነው፤ እዚያ 1.0 ለማግኘት ዓላም።"
   ]
  },
  "decision": {
   "en": "Use B: character pieces and send the top 3 passages to the language model; grow the evaluation set to 100 questions in Amharic and English before launch, and re-run it on every change.",
   "am": "B: character piecesን ተጠቀምና ከፍተኛዎቹን 3 ክፍሎች ወደ ቋንቋ ሞዴሉ ላክ፤ ከመልቀቅህ በፊት የግምገማ ስብስቡን በአማርኛና በእንግሊዝኛ ወደ 100 ጥያቄዎች አሳድግ፣ በእያንዳንዱ ለውጥም እንደገና አስኪደው።"
  }
 },
 {
  "title": {
   "en": "Detecting brute-force logins in server logs",
   "am": "በሰርቨር መዝገቦች ውስጥ የbrute-force መግቢያዎችን መለየት"
  },
  "goal": {
   "en": "Parse a day of authentication logs, find IP addresses with bursts of failed logins, choose a rate-limit threshold from the data, and estimate false blocks.",
   "am": "የአንድ ቀን የማረጋገጫ መዝገቦችን ተንትን፣ የወደቁ መግቢያዎች ፍንዳታ ያላቸውን IP አድራሻዎች ፈልግ፣ ከዳታው የrate-limit ወሰን ምረጥ፣ የሐሰት እገዳዎችን ገምት።"
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
    "name": "fail2ban / your API gateway",
    "why": {
     "en": "enforce the block automatically",
     "am": "እገዳውን በራስ-ሰር ማስፈጸም"
    },
    "get": "apt install fail2ban"
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
    "Read the auth log: time, IP, user, success.",
    "Count failures per IP per 10-minute window.",
    "Plot the distribution of the maximum failures per IP.",
    "Choose a threshold that separates normal users from attackers.",
    "Count how many real users the threshold would have blocked."
   ],
   "am": [
    "የማረጋገጫ መዝገቡን አንብብ፡ ጊዜ፣ IP፣ ተጠቃሚ፣ ስኬት።",
    "በእያንዳንዱ IP በ10-ደቂቃ መስኮት ውድቀቶችን ቁጠር።",
    "በእያንዳንዱ IP የከፍተኛ ውድቀቶችን ስርጭት ቻርት አድርግ።",
    "መደበኛ ተጠቃሚዎችን ከአጥቂዎች የሚለይ ወሰን ምረጥ።",
    "ወሰኑ ስንት እውነተኛ ተጠቃሚዎችን ያግድ እንደነበር ቁጠር።"
   ]
  },
  "code": "import numpy as np, pandas as pd\nrng = np.random.default_rng(13); rows = []\nfor ip in range(300):                                     # normal users: a few logins, occasional typo\n    for _ in range(rng.integers(1, 6)):\n        t = rng.uniform(0, 1440); rows.append((t, f\"10.0.{ip // 250}.{ip % 250}\", rng.random() < 0.12))\n        if rng.random() < 0.1: rows.append((t + 0.5, f\"10.0.{ip // 250}.{ip % 250}\", True))\nfor a in range(6):                                        # attackers: bursts of failures\n    start = rng.uniform(0, 1400)\n    for k in range(rng.integers(40, 200)): rows.append((start + k * 0.05, f\"203.0.113.{a + 10}\", True))\nlog = pd.DataFrame(rows, columns=[\"minute\", \"ip\", \"failed\"])\nlog[\"window\"] = (log.minute // 10).astype(int)\nper = log[log.failed].groupby([\"ip\", \"window\"]).size().groupby(\"ip\").max()\nattackers = per.index.str.startswith(\"203.\")\nfor thr in [3, 5, 10, 20]:\n    blocked = per >= thr\n    print(f\"threshold {thr:2d} failures/10 min: blocks {int((blocked & attackers).sum())} of {int(attackers.sum())} attackers, {int((blocked & ~attackers).sum())} real users\")\nnormal_max = int(per[~attackers].max()); attack_min = int(per[attackers].min())",
  "out": "threshold  3 failures/10 min: blocks 6 of 6 attackers, 1 real users\nthreshold  5 failures/10 min: blocks 6 of 6 attackers, 0 real users\nthreshold 10 failures/10 min: blocks 6 of 6 attackers, 0 real users\nthreshold 20 failures/10 min: blocks 6 of 6 attackers, 0 real users",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Most failed logins in any 10 minutes, per IP (top 12)",
     "am": "በማንኛውም 10 ደቂቃ ውስጥ በብዛት የወደቁ መግቢያዎች፣ በIP (ከፍተኛ 12)"
    },
    "x": {
     "label": {
      "en": "Failures in 10 minutes",
      "am": "በ10 ደቂቃ ውስጥ ውድቀቶች"
     }
    },
    "fmt": 0,
    "cats": [
     "203.0.113.12",
     "203.0.113.14",
     "203.0.113.15",
     "203.0.113.10",
     "203.0.113.11",
     "203.0.113.13",
     "10.0.0.129",
     "10.0.0.28",
     "10.0.0.150",
     "10.0.0.113",
     "10.0.0.79",
     "10.0.1.46"
    ],
    "series": [
     {
      "name": {
       "en": "Failures",
       "am": "ውድቀቶች"
      },
      "slot": 1,
      "v": [
       156.0,
       93.0,
       92.0,
       85.0,
       71.0,
       30.0,
       3.0,
       2.0,
       2.0,
       2.0,
       2.0,
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
       "en": "Failures",
       "am": "ውድቀቶች"
      }
     ],
     "rows": [
      [
       "203.0.113.12",
       156.0
      ],
      [
       "203.0.113.14",
       93.0
      ],
      [
       "203.0.113.15",
       92.0
      ],
      [
       "203.0.113.10",
       85.0
      ],
      [
       "203.0.113.11",
       71.0
      ],
      [
       "203.0.113.13",
       30.0
      ],
      [
       "10.0.0.129",
       3.0
      ],
      [
       "10.0.0.28",
       2.0
      ],
      [
       "10.0.0.150",
       2.0
      ],
      [
       "10.0.0.113",
       2.0
      ],
      [
       "10.0.0.79",
       2.0
      ],
      [
       "10.0.1.46",
       2.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Real users never failed more than 3 times in 10 minutes.",
    "Every attacker failed at least 30 times: a huge gap between the two groups.",
    "A threshold anywhere in the gap catches all attackers with no false blocks in this log."
   ],
   "am": [
    "እውነተኛ ተጠቃሚዎች በ10 ደቂቃ ውስጥ ከ3 ጊዜ በላይ በፍጹም አልወደቁም።",
    "እያንዳንዱ አጥቂ ቢያንስ 30 ጊዜ ወድቋል፡ በሁለቱ ቡድኖች መካከል ትልቅ ክፍተት።",
    "በክፍተቱ ውስጥ የትም ያለ ወሰን በዚህ መዝገብ ውስጥ ያለ የሐሰት እገዳ ሁሉንም አጥቂዎች ይይዛል።"
   ]
  },
  "decision": {
   "en": "Block an IP for 30 minutes after 10 failures in 10 minutes (well above normal, far below attacks); add two-factor login for staff, and review the threshold monthly as usage grows.",
   "am": "በ10 ደቂቃ ውስጥ ከ10 ውድቀቶች በኋላ IPን ለ30 ደቂቃዎች አግድ (ከመደበኛው በጣም በላይ፣ ከጥቃቶች በጣም በታች)፤ ለሠራተኞች two-factor መግቢያ ጨምር፣ አጠቃቀሙ ሲያድግም ወሰኑን በየወሩ ገምግም።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Pilot analysis: funnel, retention and what to build next",
   "am": "የሙከራ ትንተና፡ funnel፣ retention እና ቀጥሎ የሚገነባው"
  },
  "goal": {
   "en": "Analyse a 6-week pilot of a market-price SMS service: the sign-up funnel, weekly retention, and interview themes, then prioritise the next feature with RICE.",
   "am": "የገበያ-ዋጋ SMS አገልግሎትን የ6-ሳምንት ሙከራ ተንትን፡ የምዝገባ funnelን፣ ሳምንታዊ retentionን እና የቃለ መጠይቅ ጭብጦችን፣ ከዚያ ቀጣዩን ባሕሪ በRICE ቅድሚያ ስጥ።"
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
    "Export pilot events: invited, signed up, first alert opened, active in week 6, paid.",
    "Draw the funnel and find the biggest drop.",
    "Compute weekly retention for the sign-up cohort.",
    "Code 20 interview notes into themes.",
    "Score candidate features with RICE and choose."
   ],
   "am": [
    "የሙከራ ክስተቶችን ላክ፡ የተጋበዙ፣ የተመዘገቡ፣ የመጀመሪያ ማንቂያ የከፈቱ፣ በሳምንት 6 ንቁ የነበሩ፣ የከፈሉ።",
    "funnelኡን ሣልና ትልቁን ውድቀት ፈልግ።",
    "ለምዝገባ ቡድኑ ሳምንታዊ retentionን አስላ።",
    "20 የቃለ መጠይቅ ማስታወሻዎችን ወደ ጭብጦች ኮድ አድርግ።",
    "የዕጩ ባሕሪያትን በRICE አስመዝግብና ምረጥ።"
   ]
  },
  "code": "funnel = {\"invited\": 1200, \"signed up\": 640, \"opened first alert\": 590, \"active in week 6\": 270, \"paid\": 95}\nsteps = list(funnel); drops = {f\"{a} -> {b}\": 1 - funnel[b] / funnel[a] for a, b in zip(steps, steps[1:])}\nretention = [1.00, 0.78, 0.66, 0.55, 0.48, 0.44, 0.42]                      # share of sign-ups active each week\nthemes = {\"prices arrive too late in the day\": 9, \"want more markets\": 6, \"SMS in Amharic hard to read on old phones\": 4, \"trust the source\": 3}\nfeatures = {\"morning alerts by 7:00\": (600, 2, 0.8, 1), \"add 10 more markets\": (400, 1, 0.7, 3), \"voice message option\": (250, 2, 0.5, 4)}\nrice = {k: r * i * c / e for k, (r, i, c, e) in features.items()}\nfor k, v in drops.items(): print(f\"{k:38s} drop {v:.0%}\")\nprint(\"RICE:\", {k: round(v) for k, v in rice.items()})\nworst = max(drops, key=drops.get); choice = max(rice, key=rice.get)",
  "out": "invited -> signed up                   drop 47%\nsigned up -> opened first alert        drop 8%\nopened first alert -> active in week 6 drop 54%\nactive in week 6 -> paid               drop 65%\nRICE: {'morning alerts by 7:00': 960, 'add 10 more markets': 93, 'voice message option': 62}",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Pilot funnel (people)",
     "am": "የሙከራ funnel (ሰዎች)"
    },
    "x": {
     "label": {
      "en": "People",
      "am": "ሰዎች"
     }
    },
    "fmt": 0,
    "cats": [
     "invited",
     "signed up",
     "opened first alert",
     "active in week 6",
     "paid"
    ],
    "series": [
     {
      "name": {
       "en": "People",
       "am": "ሰዎች"
      },
      "slot": 1,
      "v": [
       1200.0,
       640.0,
       590.0,
       270.0,
       95.0
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
       "en": "People",
       "am": "ሰዎች"
      }
     ],
     "rows": [
      [
       "invited",
       1200.0
      ],
      [
       "signed up",
       640.0
      ],
      [
       "opened first alert",
       590.0
      ],
      [
       "active in week 6",
       270.0
      ],
      [
       "paid",
       95.0
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Weekly retention of sign-ups",
     "am": "የተመዘገቡ ሳምንታዊ retention"
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
      "en": "Percent active",
      "am": "ንቁ መቶኛ"
     },
     "min": 0,
     "max": 100
    },
    "series": [
     {
      "name": {
       "en": "Active share",
       "am": "ንቁ ድርሻ"
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
       5.0,
       6.0
      ],
      "y": [
       100.0,
       78.0,
       66.0,
       55.0,
       48.0,
       44.0,
       42.0
      ],
      "tip": [
       "100|Active share · 0",
       "78|Active share · 1",
       "66|Active share · 2",
       "55|Active share · 3",
       "48|Active share · 4",
       "44|Active share · 5",
       "42|Active share · 6"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Week",
       "am": "ሳምንት"
      },
      {
       "en": "Active share",
       "am": "ንቁ ድርሻ"
      }
     ],
     "rows": [
      [
       0.0,
       100.0
      ],
      [
       1.0,
       78.0
      ],
      [
       2.0,
       66.0
      ],
      [
       3.0,
       55.0
      ],
      [
       4.0,
       48.0
      ],
      [
       5.0,
       44.0
      ],
      [
       6.0,
       42.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The biggest drop is “active in week 6 -> paid” (65%), but people pay only after they keep using the service, and 54% stop using it before week 6.",
    "Retention flattens at about 42% after week 5: a loyal core uses the service.",
    "The top interview theme (9 of 20) is that prices arrive too late to decide where to sell that day."
   ],
   "am": [
    "ትልቁ ውድቀት «active in week 6 -> paid» ነው (65%)፤ ግን ሰዎች የሚከፍሉት አገልግሎቱን መጠቀም ከቀጠሉ በኋላ ብቻ ነው፣ 54% ደግሞ ከሳምንት 6 በፊት መጠቀም ያቆማሉ።",
    "retention ከሳምንት 5 በኋላ በ42% ገደማ ይረጋጋል፡ ታማኝ ዋና ቡድን አገልግሎቱን ይጠቀማል።",
    "ዋናው የቃለ መጠይቅ ጭብጥ (ከ20 9) ዋጋዎች በዚያ ቀን የት እንደሚሸጥ ለመወሰን በጣም ዘግይተው ይደርሳሉ የሚል ነው።"
   ]
  },
  "decision": {
   "en": "Build “morning alerts by 7:00” next (highest RICE, matches the top interview theme); measure week-6 activity again after 4 weeks. Do not add markets until the timing problem is solved.",
   "am": "ቀጥሎ «morning alerts by 7:00»ን ገንባ (ከፍተኛ RICE፣ ከዋናው የቃለ መጠይቅ ጭብጥ ጋር ይስማማል)፤ ከ4 ሳምንታት በኋላ የሳምንት-6 እንቅስቃሴን እንደገና ለካ። የጊዜ ችግሩ እስኪፈታ ገበያዎችን አትጨምር።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 }
];
