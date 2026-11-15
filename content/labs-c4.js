/* Practical labs, track c, level 4. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[4] = [
 {
  "title": {
   "en": "Numerical integration: how accurate is enough?",
   "am": "Numerical integration፡ ምን ያህል ትክክለኛነት በቂ ነው?"
  },
  "goal": {
   "en": "Integrate a rainfall-rate curve with the trapezoid and Simpson rules in Python and C, measure error against step size and runtime, and choose a method.",
   "am": "የዝናብ መጠን ኩርባን በtrapezoid እና በSimpson ሕጎች በPython እና በC integrate አድርግ፣ ስህተትን ከእርምጃ መጠንና ከሩጫ ጊዜ አንፃር ለካ፣ ዘዴም ምረጥ።"
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
    "name": "gcc",
    "why": {
     "en": "compile the C version",
     "am": "የC ስሪቱን አጠናቅር"
    },
    "get": "apt install gcc / MinGW on Windows"
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
    "Define rain(t) = 12·exp(−(t−2)²/2) mm/h; the exact total over 0–6 h is known.",
    "Implement trapezoid and Simpson rules.",
    "Compute the error for n = 4, 8, 16, …, 1024 intervals.",
    "Plot log error against log n; read the slope (order of accuracy).",
    "Time the same loop in C for n = 10⁷ to see the cost of Python loops."
   ],
   "am": [
    "rain(t) = 12·exp(−(t−2)²/2) mm/h ግለጽ፤ በ0–6 ሰ ያለው ትክክለኛ ድምር ይታወቃል።",
    "trapezoid እና Simpson ሕጎችን ተግብር።",
    "ለn = 4፣ 8፣ 16፣ …፣ 1024 intervals ስህተቱን አስላ።",
    "log ስህተትን ከlog n አንፃር ቻርት አድርግ፤ slopeውን (የትክክለኛነት ደረጃ) አንብብ።",
    "የPython loops ዋጋን ለማየት ያንኑ loop በC ለn = 10⁷ ጊዜ ለካ።"
   ]
  },
  "code": "import numpy as np, math\nf = lambda t: 12 * np.exp(-((t - 2) ** 2) / 2)\nexact = 12 * math.sqrt(2 * math.pi) * 0.5 * (math.erf(4 / math.sqrt(2)) + math.erf(2 / math.sqrt(2)))\ndef trap(n):\n    x = np.linspace(0, 6, n + 1); y = f(x); return (6 / n) * (y[0] / 2 + y[1:-1].sum() + y[-1] / 2)\ndef simpson(n):\n    x = np.linspace(0, 6, n + 1); y = f(x); return (6 / n) / 3 * (y[0] + 4 * y[1:-1:2].sum() + 2 * y[2:-1:2].sum() + y[-1])\nns_ = [4, 8, 16, 32, 64, 128, 256, 1024]\nerr_t = [abs(trap(n) - exact) for n in ns_]; err_s = [max(abs(simpson(n) - exact), 1e-16) for n in ns_]\nslope_t = np.polyfit(np.log10(ns_[:5]), np.log10(err_t[:5]), 1)[0]; slope_s = np.polyfit(np.log10(ns_[1:5]), np.log10(err_s[1:5]), 1)[0]\nprint(f\"exact total {exact:.6f} mm\")\nfor n, a, b in zip(ns_, err_t, err_s): print(f\"n={n:5d}  trapezoid error {a:.2e}  Simpson error {b:.2e}\")\nprint(f\"error slope on log-log: trapezoid {slope_t:.1f}, Simpson {slope_s:.1f}\")",
  "out": "exact total 29.394273 mm\nn=    4  trapezoid error 5.80e-01  Simpson error 9.33e-01\nn=    8  trapezoid error 1.51e-01  Simpson error 8.46e-03\nn=   16  trapezoid error 3.82e-02  Simpson error 4.34e-04\nn=   32  trapezoid error 9.56e-03  Simpson error 2.45e-05\nn=   64  trapezoid error 2.39e-03  Simpson error 1.50e-06\nn=  128  trapezoid error 5.98e-04  Simpson error 9.29e-08\nn=  256  trapezoid error 1.49e-04  Simpson error 5.80e-09\nn= 1024  trapezoid error 9.34e-06  Simpson error 2.26e-11\nerror slope on log-log: trapezoid -2.0, Simpson -4.2",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Error vs number of intervals (log10 scales)",
     "am": "ስህተት vs የintervals ብዛት (log10 መለኪያዎች)"
    },
    "x": {
     "label": {
      "en": "log10(intervals)",
      "am": "log10(intervals)"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "log10(error, mm)",
      "am": "log10(ስህተት፣ mm)"
     }
    },
    "series": [
     {
      "name": {
       "en": "Trapezoid",
       "am": "Trapezoid"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       0.6021,
       0.9031,
       1.2041,
       1.5051,
       1.8062,
       2.1072,
       2.4082,
       3.0103
      ],
      "y": [
       -0.2367,
       -0.8201,
       -1.4185,
       -2.0197,
       -2.6215,
       -3.2235,
       -3.8256,
       -5.0297
      ],
      "tip": [
       "-0.2367|Trapezoid · 0.6021",
       "-0.8201|Trapezoid · 0.9031",
       "-1.418|Trapezoid · 1.2041",
       "-2.02|Trapezoid · 1.5051",
       "-2.622|Trapezoid · 1.8062",
       "-3.224|Trapezoid · 2.1072",
       "-3.826|Trapezoid · 2.4082",
       "-5.03|Trapezoid · 3.0103"
      ],
      "endlabel": {
       "en": "Trapezoid",
       "am": "Trapezoid"
      }
     },
     {
      "name": {
       "en": "Simpson",
       "am": "Simpson"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       0.6021,
       0.9031,
       1.2041,
       1.5051,
       1.8062,
       2.1072,
       2.4082,
       3.0103
      ],
      "y": [
       -0.0303,
       -2.0726,
       -3.3622,
       -4.6101,
       -5.825,
       -7.0319,
       -8.2367,
       -10.6451
      ],
      "tip": [
       "-0.03034|Simpson · 0.6021",
       "-2.073|Simpson · 0.9031",
       "-3.362|Simpson · 1.2041",
       "-4.61|Simpson · 1.5051",
       "-5.825|Simpson · 1.8062",
       "-7.032|Simpson · 2.1072",
       "-8.237|Simpson · 2.4082",
       "-10.65|Simpson · 3.0103"
      ],
      "endlabel": {
       "en": "Simpson",
       "am": "Simpson"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "log10(intervals)",
       "am": "log10(intervals)"
      },
      {
       "en": "Trapezoid",
       "am": "Trapezoid"
      },
      {
       "en": "Simpson",
       "am": "Simpson"
      }
     ],
     "rows": [
      [
       0.6021,
       -0.237,
       -0.03
      ],
      [
       0.9031,
       -0.82,
       -2.073
      ],
      [
       1.2041,
       -1.418,
       -3.362
      ],
      [
       1.5051,
       -2.02,
       -4.61
      ],
      [
       1.8062,
       -2.622,
       -5.825
      ],
      [
       2.1072,
       -3.224,
       -7.032
      ],
      [
       2.4082,
       -3.826,
       -8.237
      ],
      [
       3.0103,
       -5.03,
       -10.645
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "Trapezoid error falls with slope about -2.0: doubling n divides the error by about 4 (second order).",
    "Simpson falls with slope about -4.2: doubling n divides the error by about 16 (fourth order).",
    "With only 32 intervals Simpson is already far more accurate than any rain gauge."
   ],
   "am": [
    "የtrapezoid ስህተት በ-2.0 ገደማ slope ይወርዳል፡ nን በእጥፍ ማሳደግ ስህተቱን በ4 ገደማ ያካፍላል (second order)።",
    "Simpson በ-4.2 ገደማ slope ይወርዳል፡ nን በእጥፍ ማሳደግ ስህተቱን በ16 ገደማ ያካፍላል (fourth order)።",
    "በ32 intervals ብቻ Simpson ከማንኛውም የዝናብ መለኪያ በጣም ትክክለኛ ነው።"
   ]
  },
  "decision": {
   "en": "Use Simpson’s rule (scipy.integrate.simpson) with a few dozen intervals for smooth data; with real gauge readings the measurement error, not the method, limits accuracy, so do not over-refine.",
   "am": "ለለስላሳ ዳታ Simpson ሕግን (scipy.integrate.simpson) ከጥቂት ደርዘን intervals ጋር ተጠቀም፤ በእውነተኛ የመለኪያ ንባቦች ትክክለኛነትን የሚገድበው ዘዴው ሳይሆን የልኬት ስህተቱ ነው፤ ስለዚህ ከልክ በላይ አታጥራ።"
  }
 },
 {
  "title": {
   "en": "Milk-collection routing: exact, greedy and 2-opt",
   "am": "የወተት መሰብሰቢያ መንገድ፡ ትክክለኛ፣ greedy እና 2-opt"
  },
  "goal": {
   "en": "Plan a daily truck route through 12 villages, compare nearest-neighbour, 2-opt improvement and the exact optimum on a smaller case, and decide what to run every morning.",
   "am": "በ12 መንደሮች በኩል የዕለት የመኪና መንገድ አቅድ፣ nearest-neighbourን፣ 2-opt ማሻሻያንና በትንሽ ጉዳይ ላይ ትክክለኛውን ምርጥ አወዳድር፣ በየጠዋቱ ምን እንደሚሠራ ወስን።"
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
    "Place the cooling centre and 12 villages with coordinates (from a map or GPS).",
    "Build a distance matrix.",
    "Route 1: nearest neighbour from the centre.",
    "Route 2: improve it with 2-opt (reverse segments while the tour gets shorter); route 3: run 2-opt from 30 random starting tours and keep the best.",
    "For 8 villages, compute the exact optimum by brute force and compare the gaps."
   ],
   "am": [
    "የማቀዝቀዣ ማዕከሉንና 12 መንደሮችን ከcoordinates ጋር አስቀምጥ (ከካርታ ወይም ከGPS)።",
    "የርቀት ማትሪክስ ገንባ።",
    "መንገድ 1፡ ከማዕከሉ nearest neighbour።",
    "መንገድ 2፡ በ2-opt አሻሽለው (ጉዞው እያጠረ እስከሄደ ድረስ ክፍሎችን ገልብጥ)፤ መንገድ 3፡ 2-optን ከ30 የዘፈቀደ መነሻ ጉዞዎች አስኪድና ምርጡን አቆይ።",
    "ለ8 መንደሮች ትክክለኛውን ምርጥ በbrute force አስልተህ ክፍተቶቹን አወዳድር።"
   ]
  },
  "code": "import numpy as np, itertools\nrng = np.random.default_rng(11)\npts = np.vstack([[15, 15], rng.uniform(0, 30, (12, 2))])        # 0 = cooling centre; km\nD = np.linalg.norm(pts[:, None] - pts[None], axis=2)\nlength = lambda t: sum(D[t[i], t[(i + 1) % len(t)]] for i in range(len(t)))\ndef nearest(nodes):\n    tour, left = [0], set(nodes) - {0}\n    while left: nxt = min(left, key=lambda j: D[tour[-1], j]); tour.append(nxt); left.remove(nxt)\n    return tour\ndef two_opt(t):\n    t, better = t[:], True\n    while better:\n        better = False\n        for i in range(1, len(t) - 1):\n            for j in range(i + 1, len(t)):\n                new = t[:i] + t[i:j + 1][::-1] + t[j + 1:]\n                if length(new) < length(t) - 1e-9: t, better = new, True\n    return t\ndef restarts(nodes, k=30):                                         # 2-opt from many random starting tours\n    r = np.random.default_rng(0); best = two_opt(nearest(nodes))\n    for _ in range(k):\n        t = two_opt([0] + list(r.permutation([x for x in nodes if x])))\n        if length(t) < length(best): best = t\n    return best\nres = {}\nfor name, nodes in [(\"12 villages\", list(range(13))), (\"8 villages\", list(range(9)))]:\n    nn = nearest(nodes); res[name] = [length(nn), length(two_opt(nn)), length(restarts(nodes))]\nres[\"8 villages\"].append(length(min(([0] + list(p) for p in itertools.permutations(range(1, 9))), key=length)))\nfor k, v in res.items():\n    print(f\"{k}: nearest neighbour {v[0]:.1f} km, 2-opt {v[1]:.1f} km, 2-opt x30 starts {v[2]:.1f} km\" + (f\", exact optimum {v[3]:.1f} km\" if len(v) > 3 else \"\"))\nsaving = res[\"12 villages\"][0] - res[\"12 villages\"][2]\nprint(f\"2-opt saves {saving:.1f} km per day = {saving * 365:,.0f} km per year\")",
  "out": "12 villages: nearest neighbour 121.5 km, 2-opt 108.4 km, 2-opt x30 starts 102.7 km\n8 villages: nearest neighbour 99.4 km, 2-opt 93.5 km, 2-opt x30 starts 93.5 km, exact optimum 93.5 km\n2-opt saves 18.8 km per day = 6,875 km per year",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Route length (km)",
     "am": "የመንገድ ርዝመት (km)"
    },
    "x": {
     "label": "km"
    },
    "fmt": 1,
    "cats": [
     {
      "en": "12 villages",
      "am": "12 መንደሮች"
     },
     {
      "en": "8 villages",
      "am": "8 መንደሮች"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Nearest neighbour",
       "am": "Nearest neighbour"
      },
      "slot": 2,
      "v": [
       121.5,
       99.4
      ]
     },
     {
      "name": {
       "en": "2-opt",
       "am": "2-opt"
      },
      "slot": 0,
      "v": [
       108.4,
       93.5
      ]
     },
     {
      "name": {
       "en": "2-opt, 30 starts",
       "am": "2-opt፣ 30 መነሻዎች"
      },
      "slot": 1,
      "v": [
       102.7,
       93.5
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
       "en": "Nearest neighbour",
       "am": "Nearest neighbour"
      },
      {
       "en": "2-opt",
       "am": "2-opt"
      },
      {
       "en": "2-opt, 30 starts",
       "am": "2-opt፣ 30 መነሻዎች"
      }
     ],
     "rows": [
      [
       {
        "en": "12 villages",
        "am": "12 መንደሮች"
       },
       121.5,
       108.4,
       102.7
      ],
      [
       {
        "en": "8 villages",
        "am": "8 መንደሮች"
       },
       99.4,
       93.5,
       93.5
      ]
     ]
    },
    "note": {
     "en": "Exact optimum for 8 villages (brute force): 93.5 km.",
     "am": "ለ8 መንደሮች ትክክለኛ ምርጥ (brute force)፡ 93.5 km።"
    }
   }
  ],
  "analysis": {
   "en": [
    "For 12 villages: nearest neighbour 121.5 km, 2-opt 108.4 km, 2-opt from 30 starts 102.7 km.",
    "On 8 villages, 2-opt from 30 starts finds 93.5 km, the same as the exact optimum (93.5 km); a single 2-opt run can stop in a worse local optimum.",
    "Brute force already checks 40,320 orders for 8 villages; for 12 it would be 39.9 million, and it explodes beyond that."
   ],
   "am": [
    "ለ12 መንደሮች፡ nearest neighbour 121.5 km፣ 2-opt 108.4 km፣ 2-opt ከ30 መነሻዎች 102.7 km።",
    "በ8 መንደሮች 2-opt ከ30 መነሻዎች 93.5 km ያገኛል፣ ከትክክለኛው ምርጥ (93.5 km) ጋር እኩል፤ አንድ የ2-opt ሩጫ በከፋ local optimum ሊቆም ይችላል።",
    "brute force ለ8 መንደሮች አስቀድሞ 40,320 ቅደም ተከተሎችን ይፈትሻል፤ ለ12 39.9 ሚሊዮን ይሆናል፣ ከዚያ በላይ ደግሞ ይፈነዳል።"
   ]
  },
  "decision": {
   "en": "Run 2-opt from 30 random starts every morning (it takes well under a second); it saves about 6,875 km of driving a year here. Re-plan when villages join or roads close.",
   "am": "በየጠዋቱ 2-opt ከ30 የዘፈቀደ መነሻዎች አስኪድ (ከአንድ ሰከንድ በታች ይወስዳል)፤ እዚህ በዓመት ወደ 6,875 km ገደማ መንዳትን ያድናል። መንደሮች ሲቀላቀሉ ወይም መንገዶች ሲዘጉ እንደገና አቅድ።"
  },
  "note": {
   "en": "Straight-line distances on simulated coordinates; with real roads use road distances (for example from OpenStreetMap).",
   "am": "በተመሰሉ coordinates ላይ ቀጥተኛ-መስመር ርቀቶች፤ በእውነተኛ መንገዶች የመንገድ ርቀቶችን ተጠቀም (ለምሳሌ ከOpenStreetMap)።"
  }
 },
 {
  "title": {
   "en": "Scheduling a shared lab server",
   "am": "የጋራ የላብራቶሪ ሰርቨርን ማቀድ"
  },
  "goal": {
   "en": "Simulate FCFS, shortest-job-first and round-robin scheduling on a realistic mix of short and long analysis jobs, and choose a policy for the department server.",
   "am": "በአጭርና ረጅም የትንተና ስራዎች ተጨባጭ ቅልቅል ላይ FCFSን፣ shortest-job-firstን እና round-robin schedulingን አስመስል፣ ለዲፓርትመንቱ ሰርቨር ፖሊሲ ምረጥ።"
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
    "Generate a day of jobs: 80% short (1–5 min), 20% long (30–180 min), random arrivals.",
    "Implement the three schedulers as event simulations.",
    "Measure average waiting time and the 95th percentile for short jobs.",
    "Repeat at three load levels (jobs per hour).",
    "Plot and choose."
   ],
   "am": [
    "የአንድ ቀን ስራዎችን አመንጭ፡ 80% አጭር (1–5 ደቂቃ)፣ 20% ረጅም (30–180 ደቂቃ)፣ የዘፈቀደ መድረሻዎች።",
    "ሦስቱን schedulers እንደ event simulations ተግብር።",
    "ለአጭር ስራዎች አማካይ የመጠበቂያ ጊዜንና 95ኛ percentileን ለካ።",
    "በሦስት የጭነት ደረጃዎች (በሰዓት ስራዎች) ድገም።",
    "ቻርት አድርግና ምረጥ።"
   ]
  },
  "code": "import numpy as np\ndef jobs(rate, rng, hours=8):                 # average job is about 23 min, so 2.4 jobs/hour keeps the server ~94% busy\n    t, out = 0.0, []\n    while True:\n        t += rng.exponential(60 / rate)\n        if t > hours * 60: return out\n        out.append((t, rng.uniform(1, 5) if rng.random() < 0.8 else rng.uniform(30, 180)))\ndef simulate(js, policy, q=5):\n    js = sorted(js); t, i, ready, waits, done = 0.0, 0, [], [], []\n    rem = {k: b for k, (a, b) in enumerate(js)}; last_start = {}\n    while i < len(js) or ready:\n        if not ready: t = max(t, js[i][0])\n        while i < len(js) and js[i][0] <= t: ready.append(i); i += 1\n        if policy == \"SJF\": ready.sort(key=lambda k: rem[k])\n        k = ready.pop(0); run = rem[k] if policy != \"RR\" else min(q, rem[k])\n        t += run; rem[k] -= run\n        while i < len(js) and js[i][0] <= t: ready.append(i); i += 1\n        if rem[k] > 1e-9: ready.append(k)\n        else: done.append((k, t - js[k][0] - js[k][1]))\n    short = [w for k, w in done if js[k][1] <= 5]\n    return np.mean(short), np.percentile(short, 95)\nloads = [1.5, 2.0, 2.4]; res = {p: [] for p in [\"FCFS\", \"SJF\", \"RR\"]}\nfor rate in loads:\n    for p in res:\n        vals = [simulate(jobs(rate, np.random.default_rng(s)), p) for s in range(20)]\n        res[p].append(tuple(np.mean(vals, axis=0)))\nfor p, v in res.items(): print(p, [\"avg %.1f / p95 %.1f min\" % x for x in v])",
  "out": "FCFS ['avg 61.6 / p95 134.4 min', 'avg 95.0 / p95 176.6 min', 'avg 116.8 / p95 219.4 min']\nSJF ['avg 31.5 / p95 78.1 min', 'avg 41.4 / p95 96.7 min', 'avg 39.9 / p95 105.2 min']\nRR ['avg 3.6 / p95 8.4 min', 'avg 6.0 / p95 12.8 min', 'avg 7.2 / p95 14.8 min']",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Short jobs: average wait (minutes)",
     "am": "አጭር ስራዎች፡ አማካይ መጠበቂያ (ደቂቃዎች)"
    },
    "x": {
     "label": {
      "en": "Jobs per hour",
      "am": "በሰዓት ስራዎች"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Minutes",
      "am": "ደቂቃዎች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "FCFS",
       "am": "FCFS"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.5,
       2.0,
       2.4
      ],
      "y": [
       61.5663,
       95.0135,
       116.7691
      ],
      "tip": [
       "61.57|FCFS · 1.5",
       "95.01|FCFS · 2",
       "116.8|FCFS · 2.4"
      ],
      "endlabel": {
       "en": "FCFS",
       "am": "FCFS"
      }
     },
     {
      "name": {
       "en": "SJF",
       "am": "SJF"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.5,
       2.0,
       2.4
      ],
      "y": [
       31.4835,
       41.3806,
       39.9084
      ],
      "tip": [
       "31.48|SJF · 1.5",
       "41.38|SJF · 2",
       "39.91|SJF · 2.4"
      ],
      "endlabel": {
       "en": "SJF",
       "am": "SJF"
      }
     },
     {
      "name": {
       "en": "RR",
       "am": "RR"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       1.5,
       2.0,
       2.4
      ],
      "y": [
       3.6183,
       6.0481,
       7.2327
      ],
      "tip": [
       "3.618|RR · 1.5",
       "6.048|RR · 2",
       "7.233|RR · 2.4"
      ],
      "endlabel": {
       "en": "RR",
       "am": "RR"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Jobs per hour",
       "am": "በሰዓት ስራዎች"
      },
      {
       "en": "FCFS",
       "am": "FCFS"
      },
      {
       "en": "SJF",
       "am": "SJF"
      },
      {
       "en": "RR",
       "am": "RR"
      }
     ],
     "rows": [
      [
       1.5,
       61.566,
       31.483,
       3.618
      ],
      [
       2.0,
       95.014,
       41.381,
       6.048
      ],
      [
       2.4,
       116.769,
       39.908,
       7.233
      ]
     ]
    },
    "rpad": 90
   },
   {
    "type": "xy",
    "title": {
     "en": "Short jobs: 95th-percentile wait (minutes)",
     "am": "አጭር ስራዎች፡ 95ኛ-percentile መጠበቂያ (ደቂቃዎች)"
    },
    "x": {
     "label": {
      "en": "Jobs per hour",
      "am": "በሰዓት ስራዎች"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Minutes",
      "am": "ደቂቃዎች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "FCFS",
       "am": "FCFS"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.5,
       2.0,
       2.4
      ],
      "y": [
       134.4257,
       176.5753,
       219.4306
      ],
      "tip": [
       "134.4|FCFS · 1.5",
       "176.6|FCFS · 2",
       "219.4|FCFS · 2.4"
      ],
      "endlabel": {
       "en": "FCFS",
       "am": "FCFS"
      }
     },
     {
      "name": {
       "en": "SJF",
       "am": "SJF"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.5,
       2.0,
       2.4
      ],
      "y": [
       78.103,
       96.6812,
       105.23
      ],
      "tip": [
       "78.1|SJF · 1.5",
       "96.68|SJF · 2",
       "105.2|SJF · 2.4"
      ],
      "endlabel": {
       "en": "SJF",
       "am": "SJF"
      }
     },
     {
      "name": {
       "en": "RR",
       "am": "RR"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       1.5,
       2.0,
       2.4
      ],
      "y": [
       8.3916,
       12.8061,
       14.807
      ],
      "tip": [
       "8.392|RR · 1.5",
       "12.81|RR · 2",
       "14.81|RR · 2.4"
      ],
      "endlabel": {
       "en": "RR",
       "am": "RR"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Jobs per hour",
       "am": "በሰዓት ስራዎች"
      },
      {
       "en": "FCFS",
       "am": "FCFS"
      },
      {
       "en": "SJF",
       "am": "SJF"
      },
      {
       "en": "RR",
       "am": "RR"
      }
     ],
     "rows": [
      [
       1.5,
       134.426,
       78.103,
       8.392
      ],
      [
       2.0,
       176.575,
       96.681,
       12.806
      ],
      [
       2.4,
       219.431,
       105.23,
       14.807
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "Under FCFS, short jobs wait on average 117 minutes at the highest load: they get stuck behind long jobs.",
    "Round robin keeps short-job waits near 7 minutes without needing to know job lengths.",
    "Shortest-job-first (without interrupting a running job) still leaves short jobs waiting 40 minutes behind long jobs that have already started, needs job lengths in advance and can starve long jobs."
   ],
   "am": [
    "በFCFS ሥር አጭር ስራዎች በከፍተኛው ጭነት በአማካይ 117 ደቂቃዎች ይጠብቃሉ፡ ከረጅም ስራዎች ጀርባ ይቀረቀራሉ።",
    "Round robin የስራ ርዝመቶችን ማወቅ ሳያስፈልገው የአጭር-ስራ መጠበቂያዎችን በ7 ደቂቃዎች አቅራቢያ ያቆያል።",
    "Shortest-job-first (እየሠራ ያለን ስራ ሳያቋርጥ) አጭር ስራዎችን አስቀድመው ከጀመሩ ረጅም ስራዎች ጀርባ 40 ደቂቃዎች ያስጠብቃል፣ የስራ ርዝመቶችን አስቀድሞ ይፈልጋል፣ ረጅም ስራዎችንም ሊያስርብ ይችላል።"
   ]
  },
  "decision": {
   "en": "Use time-sliced (round-robin style) scheduling with a separate queue or partition for long jobs (as SLURM does with partitions); ask users to state a time limit so the scheduler can also favour short jobs.",
   "am": "ለረጅም ስራዎች የተለየ ወረፋ ወይም partition ያለው በጊዜ የተከፋፈለ (round-robin ዓይነት) scheduling ተጠቀም (SLURM በpartitions እንደሚያደርገው)፤ schedulerኡ አጭር ስራዎችንም እንዲያስቀድም ተጠቃሚዎች የጊዜ ገደብ እንዲገልጹ ጠይቅ።"
  }
 },
 {
  "title": {
   "en": "Crop-disease classifier: build and evaluate properly",
   "am": "የሰብል-በሽታ classifier፡ በትክክል ገንባና ገምግም"
  },
  "goal": {
   "en": "Train three classifiers on leaf measurements for healthy, rust and blight, evaluate with cross-validation and per-class recall, and choose one for field use.",
   "am": "ለጤናማ፣ ለዝገትና ለblight በቅጠል ልኬቶች ላይ ሦስት classifiers አሰልጥን፣ በcross-validation እና በክፍል recall ገምግም፣ ለመስክ አጠቃቀም አንዱን ምረጥ።"
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
   }
  ],
  "steps": {
   "en": [
    "Assemble features per leaf: spot count, spot size, yellow index, brown index, leaf area.",
    "Split by farm (group k-fold) so leaves from one farm are never in both train and test.",
    "Train logistic regression, random forest and a small neural network (MLP).",
    "Report cross-validated accuracy and recall for each disease.",
    "Choose using the cost of missing a disease."
   ],
   "am": [
    "በቅጠል features አሰባስብ፡ የነጠብጣብ ብዛት፣ የነጠብጣብ መጠን፣ የቢጫ መለኪያ፣ የቡናማ መለኪያ፣ የቅጠል ስፋት።",
    "ከአንድ እርሻ የመጡ ቅጠሎች በፍጹም በሥልጠናም በፈተናም እንዳይሆኑ በእርሻ ክፈል (group k-fold)።",
    "logistic regressionን፣ random forestን እና ትንሽ neural network (MLP) አሰልጥን።",
    "የcross-validated accuracyን እና ለእያንዳንዱ በሽታ recallን ዘግብ።",
    "በሽታን የማምለጥ ዋጋን በመጠቀም ምረጥ።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.model_selection import GroupKFold, cross_val_predict\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.neural_network import MLPClassifier\nfrom sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.metrics import accuracy_score, recall_score\nfrom sklearn.model_selection import KFold\nrng = np.random.default_rng(5); n = 900\nfarm = rng.integers(0, 30, n); mix = rng.dirichlet([1.2, 1, 0.7], 30)       # each farm has its own disease mix\ncls = np.array([rng.choice(3, p=mix[f]) for f in farm]); sig = rng.normal(0, 1, (30, 2))   # farm signature: soil colour, leaf size\nspots = np.where(cls == 0, rng.poisson(2, n), np.where(cls == 1, rng.poisson(6, n), rng.poisson(4, n)))\nsize = np.where(cls == 2, rng.normal(3.5, 1.5, n), rng.normal(2, 1.0, n)).clip(0.1)\nyellow = 0.3 + 0.25 * (cls == 1) + 0.15 * sig[farm, 0] + rng.normal(0, 0.15, n)\nbrown = 0.2 + 0.25 * (cls == 2) + 0.1 * sig[farm, 0] + rng.normal(0, 0.2, n); area = 40 + 6 * sig[farm, 1] + rng.normal(0, 3, n)\nX = np.column_stack([spots, size, yellow, brown, area]); names = [\"healthy\", \"rust\", \"blight\"]\nmodels = {\"logistic\": make_pipeline(StandardScaler(), LogisticRegression(max_iter=2000)),\n          \"random forest\": RandomForestClassifier(300, random_state=0),\n          \"neural net\": make_pipeline(StandardScaler(), MLPClassifier((32,), max_iter=2000, random_state=0))}\nres = {}\nfor k, m in models.items():\n    p = cross_val_predict(m, X, cls, cv=GroupKFold(5), groups=farm)\n    q = cross_val_predict(m, X, cls, cv=KFold(5, shuffle=True, random_state=0))       # the wrong way: leaves from one farm on both sides\n    res[k] = (accuracy_score(cls, p), recall_score(cls, p, average=None), accuracy_score(cls, q))\n    print(f\"{k:13s} accuracy by farm {res[k][0]:.3f} (random split {res[k][2]:.3f}) | recall healthy/rust/blight {np.round(res[k][1], 3)}\")\nbest = max(res, key=lambda k: res[k][1][2])",
  "out": "logistic      accuracy by farm 0.800 (random split 0.814) | recall healthy/rust/blight [0.83  0.821 0.725]\nrandom forest accuracy by farm 0.776 (random split 0.790) | recall healthy/rust/blight [0.822 0.794 0.677]\nneural net    accuracy by farm 0.773 (random split 0.796) | recall healthy/rust/blight [0.8   0.787 0.712]",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Recall per class (share of each class correctly found)",
     "am": "Recall በክፍል (በትክክል የተገኘ የእያንዳንዱ ክፍል ድርሻ)"
    },
    "x": {
     "label": "Recall"
    },
    "fmt": 3,
    "cats": [
     "healthy",
     "rust",
     "blight"
    ],
    "series": [
     {
      "name": {
       "en": "logistic",
       "am": "logistic"
      },
      "slot": 1,
      "v": [
       0.83,
       0.821,
       0.725
      ]
     },
     {
      "name": {
       "en": "random forest",
       "am": "random forest"
      },
      "slot": 2,
      "v": [
       0.822,
       0.794,
       0.677
      ]
     },
     {
      "name": {
       "en": "neural net",
       "am": "neural net"
      },
      "slot": 3,
      "v": [
       0.8,
       0.787,
       0.712
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
       "en": "logistic",
       "am": "logistic"
      },
      {
       "en": "random forest",
       "am": "random forest"
      },
      {
       "en": "neural net",
       "am": "neural net"
      }
     ],
     "rows": [
      [
       "healthy",
       0.83,
       0.822,
       0.8
      ],
      [
       "rust",
       0.821,
       0.794,
       0.787
      ],
      [
       "blight",
       0.725,
       0.677,
       0.712
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "On farms they never saw, the models reach 77.3% to 80.0% accuracy.",
    "Blight is the class most often missed; the best blight recall is 72% (logistic).",
    "A random split looks up to 2.2 points better, because the model recognises each farm’s soil colour and leaf size: an over-optimistic score."
   ],
   "am": [
    "ፈጽሞ ባላዩአቸው እርሻዎች ላይ ሞዴሎቹ ከ77.3% እስከ 80.0% accuracy ይደርሳሉ።",
    "Blight በብዛት የሚያመልጠው ክፍል ነው፤ ምርጡ የblight recall 72% ነው (logistic)።",
    "የዘፈቀደ ክፍፍል እስከ 2.2 ነጥቦች የተሻለ ይመስላል፣ ሞዴሉ የእያንዳንዱን እርሻ የአፈር ቀለምና የቅጠል መጠን ስለሚያውቅ፡ ከልክ በላይ ተስፈኛ ውጤት።"
   ]
  },
  "decision": {
   "en": "Deploy logistic because it misses the fewest blight cases (the costliest error); add an “unsure, ask an expert” result when the top probability is below 0.7, collect more blight images, and report only the by-farm score.",
   "am": "logisticን አሰማራ፣ ጥቂቱን የblight ጉዳዮች ስለሚያመልጥ (በጣም ውዱ ስህተት)፤ ከፍተኛው ፕሮባቢሊቲ ከ0.7 በታች ሲሆን «እርግጠኛ አይደለሁም፣ ባለሙያ ጠይቅ» ውጤት ጨምር፣ ተጨማሪ የblight ምስሎችንም ሰብስብ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 }
];
