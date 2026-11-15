/* Practical labs, track s, level 5. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[5] = [
 {
  "title": {
   "en": "Alpha-lattice: adjusting for incomplete blocks",
   "am": "Alpha-lattice፡ ለincomplete blocks ማስተካከል"
  },
  "goal": {
   "en": "Simulate a 36-entry trial in incomplete blocks of 6, compare simple means with block-adjusted estimates, and measure how often the true best entries are selected.",
   "am": "በ6 incomplete blocks ውስጥ የ36-ግቤት ሙከራን አስመስል፣ ቀላል አማካዮችን ከblock-የተስተካከሉ ግምቶች ጋር አወዳድር፣ እውነተኛዎቹ ምርጥ ግቤቶች ምን ያህል ጊዜ እንደሚመረጡ ለካ።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
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
    "name": "Field plots, pegs, tape, labels",
    "why": {
     "en": "lay out and mark the plots",
     "am": "plotsን ማቀድና ምልክት ማድረግ"
    },
    "get": "research station or farmer field"
   },
   {
    "name": "R with lme4 / ASReml-R (next step)",
    "why": {
     "en": "full mixed models with REML",
     "am": "ሙሉ mixed models ከREML ጋር"
    },
    "get": "cran.r-project.org; vsni.co.uk"
   }
  ],
  "steps": {
   "en": [
    "36 wheat lines, 2 replicates, each replicate split into 6 blocks of 6 plots (CycDesigN or agricolae design.alpha).",
    "Each block has its own fertility.",
    "Estimate line effects two ways: plain means, and a least-squares model with replicate and block effects.",
    "Repeat 300 times; record the correlation with the true values and how many of the true top 6 are selected.",
    "Use a mixed model (blocks random) in R for the real analysis."
   ],
   "am": [
    "36 የስንዴ መስመሮች፣ 2 replicates፣ እያንዳንዱ replicate ወደ 6 plots 6 blocks የተከፈለ (CycDesigN ወይም agricolae design.alpha)።",
    "እያንዳንዱ block የራሱ ለምነት አለው።",
    "የመስመር ውጤቶችን በሁለት መንገዶች ገምት፡ ተራ አማካዮች፣ እና ከreplicate እና block ውጤቶች ጋር least-squares ሞዴል።",
    "300 ጊዜ ድገም፤ ከእውነተኛ እሴቶቹ ጋር correlationን እና ከእውነተኛዎቹ ከፍተኛ 6 ስንቱ እንደሚመረጡ መዝግብ።",
    "ለእውነተኛው ትንተና በR ውስጥ mixed model (blocks random) ተጠቀም።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(4); L, R, K = 36, 2, 6\ndef one_trial():\n    g = rng.normal(0, 0.3, L); rows = []\n    for r in range(R):\n        order = rng.permutation(L)\n        for blk in range(L // K):\n            eff = rng.normal(0, 0.5)\n            for e in order[blk * K:(blk + 1) * K]: rows.append((e, r, r * 6 + blk, 4 + g[e] + eff + rng.normal(0, 0.25)))\n    e, r, b, y = map(np.array, zip(*rows))\n    plain = np.array([y[e == i].mean() for i in range(L)])\n    X = np.zeros((len(y), L + R * 6)); X[np.arange(len(y)), e] = 1; X[np.arange(len(y)), L + b] = 1\n    beta = np.linalg.lstsq(X, y, rcond=None)[0][:L]                                   # intra-block (blocks fixed)\n    top = set(np.argsort(-g)[:6])\n    return [np.corrcoef(est, g)[0, 1] for est in (plain, beta)] + [len(top & set(np.argsort(-est)[:6])) for est in (plain, beta)]\nres = np.array([one_trial() for _ in range(300)])\nprint(f\"correlation with true values: plain means {res[:, 0].mean():.2f}, block-adjusted {res[:, 1].mean():.2f}\")\nprint(f\"true top-6 lines selected: plain {res[:, 2].mean():.1f}, block-adjusted {res[:, 3].mean():.1f} (of 6)\")",
  "out": "correlation with true values: plain means 0.63, block-adjusted 0.82\ntrue top-6 lines selected: plain 3.0, block-adjusted 3.8 (of 6)",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Over 300 simulated trials",
     "am": "በ300 የተመሰሉ ሙከራዎች"
    },
    "x": {
     "label": {
      "en": "Proportion",
      "am": "መጠን"
     }
    },
    "fmt": 2,
    "cats": [
     {
      "en": "Correlation with true merit",
      "am": "ከእውነተኛ ብቃት ጋር correlation"
     },
     {
      "en": "True top-6 lines selected (÷6)",
      "am": "የተመረጡ እውነተኛ ከፍተኛ-6 መስመሮች (÷6)"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Plain means",
       "am": "ተራ አማካዮች"
      },
      "slot": 2,
      "v": [
       0.63,
       0.5
      ]
     },
     {
      "name": {
       "en": "Block-adjusted",
       "am": "block-የተስተካከለ"
      },
      "slot": 1,
      "v": [
       0.82,
       0.63
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
       "en": "Plain means",
       "am": "ተራ አማካዮች"
      },
      {
       "en": "Block-adjusted",
       "am": "block-የተስተካከለ"
      }
     ],
     "rows": [
      [
       {
        "en": "Correlation with true merit",
        "am": "ከእውነተኛ ብቃት ጋር correlation"
       },
       0.63,
       0.82
      ],
      [
       {
        "en": "True top-6 lines selected (÷6)",
        "am": "የተመረጡ እውነተኛ ከፍተኛ-6 መስመሮች (÷6)"
       },
       0.5,
       0.63
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Plain means correlate 0.63 with true merit; block-adjusted estimates 0.82.",
    "Adjustment picks 3.8 of the true top 6 lines on average, against 3.0 with plain means.",
    "Small blocks capture local fertility that a full replicate of 36 plots cannot; a mixed model with random blocks recovers a little more information."
   ],
   "am": [
    "ተራ አማካዮች ከእውነተኛ ብቃት ጋር 0.63 ይዛመዳሉ፤ block-የተስተካከሉ ግምቶች 0.82።",
    "ማስተካከያው በአማካይ ከእውነተኛዎቹ ከፍተኛ 6 መስመሮች 3.8ን ይመርጣል፤ በተራ አማካዮች 3.0።",
    "ትናንሽ blocks የ36 plots ሙሉ replicate ሊይዘው የማይችለውን የአካባቢ ለምነት ይይዛሉ፤ random blocks ያለው mixed model ትንሽ ተጨማሪ መረጃ ያገኛል።"
   ]
  },
  "decision": {
   "en": "For trials with more than about 15 entries use an alpha-lattice and analyse with a mixed model; never report plain means from such a design.",
   "am": "ከ15 ገደማ በላይ ግቤቶች ላሉ ሙከራዎች alpha-lattice ተጠቀምና በmixed model ተንትን፤ ከእንዲህ ዓይነት ንድፍ ተራ አማካዮችን በፍጹም አትዘግብ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Multi-environment trial: stability and G × E",
   "am": "ባለብዙ-አካባቢ ሙከራ፡ መረጋጋትና G × E"
  },
  "goal": {
   "en": "Analyse 8 maize hybrids in 6 environments: estimate means and Finlay–Wilkinson stability slopes, and decide which hybrids to recommend widely and which only for good environments.",
   "am": "8 የበቆሎ hybrids በ6 አካባቢዎች ተንትን፡ አማካዮችንና የFinlay–Wilkinson የመረጋጋት slopesን ገምት፤ የትኞቹ hybrids በሰፊው፣ የትኞቹ ደግሞ ለጥሩ አካባቢዎች ብቻ እንደሚመከሩ ወስን።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
   },
   {
    "name": "R: metan or statgenGxE (next step)",
    "why": {
     "en": "AMMI and GGE biplots",
     "am": "AMMI እና GGE biplots"
    },
    "get": "cran.r-project.org"
   }
  ],
  "steps": {
   "en": [
    "Collect hybrid means from each site (each site analysed as its own RCBD first).",
    "Environment index = mean of all hybrids at the site.",
    "For each hybrid regress its yield on the environment index: slope b and deviations.",
    "Plot mean yield against slope.",
    "Check the interaction with an SVD of the G × E table (AMMI idea)."
   ],
   "am": [
    "ከእያንዳንዱ ቦታ የhybrid አማካዮችን ሰብስብ (እያንዳንዱ ቦታ መጀመሪያ እንደ ራሱ RCBD ተተንትኖ)።",
    "የአካባቢ መለኪያ = በቦታው የሁሉም hybrids አማካይ።",
    "ለእያንዳንዱ hybrid ምርቱን በአካባቢ መለኪያው ላይ regress አድርግ፡ slope b እና ልዩነቶች።",
    "አማካይ ምርትን ከslope አንፃር ቻርት አድርግ።",
    "መስተጋብሩን በG × E ሰንጠረዡ SVD ፈትሽ (የAMMI ሐሳብ)።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(6); G, E = 8, 6\nhybrids = [f\"H{i + 1}\" for i in range(G)]; env_eff = np.array([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5])\ng_mean = np.array([0.4, 0.2, 0.0, 0.3, -0.2, 0.5, -0.4, 0.1]); slope = np.array([1.35, 0.7, 1.0, 1.1, 0.8, 1.25, 0.9, 1.0])\nY = 6 + g_mean[:, None] + slope[:, None] * env_eff[None, :] + rng.normal(0, 0.25, (G, E))\nidx = Y.mean(0) - Y.mean(); b = np.array([np.polyfit(idx, Y[i], 1)[0] for i in range(G)]); mean = Y.mean(1)\nGE = Y - Y.mean(1, keepdims=True) - Y.mean(0, keepdims=True) + Y.mean()\nsv = np.linalg.svd(GE, compute_uv=False); share = sv ** 2 / (sv ** 2).sum()\nfor h, m, s in zip(hybrids, mean, b): print(f\"{h}: mean {m:.2f} t/ha, stability slope {s:.2f}\")\nprint(f\"G x E explained by the first interaction axis: {share[0]:.0%}\")\npoor_env = Y[:, 0]; rich_env = Y[:, -1]; best_poor, best_rich = hybrids[poor_env.argmax()], hybrids[rich_env.argmax()]\nwide = [h for h, m, s in zip(hybrids, mean, b) if m > mean.mean() and abs(s - 1) < 0.15]\nprint(f\"best in the poorest site: {best_poor}; best in the richest: {best_rich}; above-average and stable: {wide}\")",
  "out": "H1: mean 6.50 t/ha, stability slope 1.31\nH2: mean 6.29 t/ha, stability slope 0.59\nH3: mean 6.14 t/ha, stability slope 1.08\nH4: mean 6.30 t/ha, stability slope 1.04\nH5: mean 5.71 t/ha, stability slope 0.88\nH6: mean 6.58 t/ha, stability slope 1.18\nH7: mean 5.64 t/ha, stability slope 0.93\nH8: mean 6.19 t/ha, stability slope 1.00\nG x E explained by the first interaction axis: 82%\nbest in the poorest site: H2; best in the richest: H1; above-average and stable: ['H4', 'H8']",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Mean yield vs stability slope (1 = average response)",
     "am": "አማካይ ምርት vs የመረጋጋት slope (1 = አማካይ ምላሽ)"
    },
    "x": {
     "label": {
      "en": "Stability slope b",
      "am": "የመረጋጋት slope b"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Mean yield (t/ha)",
      "am": "አማካይ ምርት (t/ha)"
     }
    },
    "series": [
     {
      "name": {
       "en": "Observations",
       "am": "ምልከታዎች"
      },
      "slot": 1,
      "kind": "points",
      "x": [
       1.307,
       0.586,
       1.079,
       1.039,
       0.883,
       1.177,
       0.928,
       1.0
      ],
      "y": [
       6.504,
       6.287,
       6.138,
       6.3,
       5.707,
       6.576,
       5.636,
       6.192
      ],
      "size": 4,
      "tip": [
       "6.5| x = 1.31",
       "6.29| x = 0.586",
       "6.14| x = 1.08",
       "6.3| x = 1.04",
       "5.71| x = 0.883",
       "6.58| x = 1.18",
       "5.64| x = 0.928",
       "6.19| x = 1"
      ],
      "labels": [
       "H1",
       "H2",
       "H3",
       "H4",
       "H5",
       "H6",
       "H7",
       "H8"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Stability slope b",
       "am": "የመረጋጋት slope b"
      },
      {
       "en": "Mean yield (t/ha)",
       "am": "አማካይ ምርት (t/ha)"
      }
     ],
     "rows": [
      [
       1.307,
       6.504
      ],
      [
       0.586,
       6.287
      ],
      [
       1.079,
       6.138
      ],
      [
       1.039,
       6.3
      ],
      [
       0.883,
       5.707
      ],
      [
       1.177,
       6.576
      ],
      [
       0.928,
       5.636
      ],
      [
       1.0,
       6.192
      ]
     ]
    },
    "refs": [
     {
      "kind": "v",
      "v": 1.0,
      "label": "b = 1"
     },
     {
      "kind": "h",
      "v": 6.167619943668582,
      "label": {
       "en": "average",
       "am": "አማካይ"
      }
     }
    ]
   },
   {
    "type": "xy",
    "title": {
     "en": "Hybrid yield across environments (t/ha)",
     "am": "የhybrid ምርት በአካባቢዎች (t/ha)"
    },
    "x": {
     "label": {
      "en": "Environment index (t/ha)",
      "am": "የአካባቢ መለኪያ (t/ha)"
     },
     "int": false
    },
    "y": {
     "label": "t/ha"
    },
    "series": [
     {
      "name": {
       "en": "H1",
       "am": "H1"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       -2.62,
       -1.49,
       -0.61,
       0.5,
       1.58,
       2.63
      ],
      "y": [
       3.2883,
       4.8191,
       5.0867,
       7.0405,
       8.6784,
       10.113
      ],
      "tip": [
       "3.288|H1 · -2.62",
       "4.819|H1 · -1.49",
       "5.087|H1 · -0.61",
       "7.041|H1 · 0.5",
       "8.678|H1 · 1.58",
       "10.11|H1 · 2.63"
      ],
      "endlabel": {
       "en": "H1",
       "am": "H1"
      }
     },
     {
      "name": {
       "en": "H2",
       "am": "H2"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       -2.62,
       -1.49,
       -0.61,
       0.5,
       1.58,
       2.63
      ],
      "y": [
       4.6134,
       5.5243,
       5.9225,
       6.6878,
       7.2947,
       7.6815
      ],
      "tip": [
       "4.613|H2 · -2.62",
       "5.524|H2 · -1.49",
       "5.922|H2 · -0.61",
       "6.688|H2 · 0.5",
       "7.295|H2 · 1.58",
       "7.682|H2 · 2.63"
      ],
      "endlabel": {
       "en": "H2",
       "am": "H2"
      }
     },
     {
      "name": {
       "en": "H4",
       "am": "H4"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       -2.62,
       -1.49,
       -0.61,
       0.5,
       1.58,
       2.63
      ],
      "y": [
       3.5435,
       4.9959,
       5.5235,
       6.6459,
       7.9703,
       9.1204
      ],
      "tip": [
       "3.543|H4 · -2.62",
       "4.996|H4 · -1.49",
       "5.524|H4 · -0.61",
       "6.646|H4 · 0.5",
       "7.97|H4 · 1.58",
       "9.12|H4 · 2.63"
      ],
      "endlabel": {
       "en": "H4",
       "am": "H4"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Environment index (t/ha)",
       "am": "የአካባቢ መለኪያ (t/ha)"
      },
      {
       "en": "H1",
       "am": "H1"
      },
      {
       "en": "H2",
       "am": "H2"
      },
      {
       "en": "H4",
       "am": "H4"
      }
     ],
     "rows": [
      [
       -2.62,
       3.288,
       4.613,
       3.543
      ],
      [
       -1.49,
       4.819,
       5.524,
       4.996
      ],
      [
       -0.61,
       5.087,
       5.922,
       5.524
      ],
      [
       0.5,
       7.041,
       6.688,
       6.646
      ],
      [
       1.58,
       8.678,
       7.295,
       7.97
      ],
      [
       2.63,
       10.113,
       7.682,
       9.12
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "H1 responds most to good conditions (slope 1.31) and H2 the least (0.59).",
    "The best hybrid in the poorest site is H2, in the richest H1: rankings change, which is G × E.",
    "Above-average and stable (slope near 1): H4, H8; the first interaction axis explains 82% of G × E."
   ],
   "am": [
    "H1 ለጥሩ ሁኔታዎች በብዛት ምላሽ ይሰጣል (slope 1.31)፣ H2 ደግሞ በትንሹ (0.59)።",
    "በድሃው ቦታ ምርጡ hybrid H2፣ በሀብታሙ H1 ነው፡ ደረጃዎች ይለወጣሉ፣ ይህም G × E ነው።",
    "ከአማካይ በላይና የተረጋጉ (slope ወደ 1)፡ H4, H8፤ የመጀመሪያው የመስተጋብር ዘንግ 82% G × Eን ያብራራል።"
   ]
  },
  "decision": {
   "en": "Recommend H4, H8 widely; recommend H1 only for high-potential areas with good inputs, and H2 for low-input areas.",
   "am": "H4, H8ን በሰፊው ምከር፤ H1ን ጥሩ ግብዓቶች ላሏቸው ከፍተኛ-አቅም አካባቢዎች ብቻ፣ H2ን ደግሞ ለዝቅተኛ-ግብዓት አካባቢዎች ምከር።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Spatial analysis: adjusting for neighbouring plots",
   "am": "Spatial ትንተና፡ ለጎረቤት plots ማስተካከል"
  },
  "goal": {
   "en": "Simulate a 200-plot variety trial on a field with patchy fertility, compare an RCBD analysis with a nearest-neighbour (Papadakis) adjustment, and measure the gain in accuracy.",
   "am": "የተበጣጠሰ ለምነት ባለው ማሳ ላይ የ200-plot የዝርያ ሙከራ አስመስል፣ የRCBD ትንተናን ከnearest-neighbour (Papadakis) ማስተካከያ ጋር አወዳድር፣ የaccuracy ትርፉን ለካ።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
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
    "name": "R: SpATS or ASReml AR1×AR1 (next step)",
    "why": {
     "en": "full spatial models",
     "am": "ሙሉ spatial ሞዴሎች"
    },
    "get": "cran.r-project.org"
   }
  ],
  "steps": {
   "en": [
    "Field: 20 rows × 10 columns, 50 varieties × 4 blocks (5 rows each).",
    "Fertility varies smoothly in patches (spatial correlation).",
    "Analysis 1: RCBD (variety + block).",
    "Analysis 2: add the mean residual of each plot’s row-neighbours as a covariate (Papadakis).",
    "Repeat 200 times; compare the correlation with true variety effects."
   ],
   "am": [
    "ማሳ፡ 20 ረድፎች × 10 ዓምዶች፣ 50 ዝርያዎች × 4 blocks (እያንዳንዳቸው 5 ረድፎች)።",
    "ለምነት በቁርጥራጮች በለስላሳ ይለያያል (spatial correlation)።",
    "ትንተና 1፡ RCBD (ዝርያ + block)።",
    "ትንተና 2፡ የእያንዳንዱን plot የረድፍ ጎረቤቶች አማካይ residual እንደ covariate ጨምር (Papadakis)።",
    "200 ጊዜ ድገም፤ ከእውነተኛ የዝርያ ውጤቶች ጋር ያለውን correlation አወዳድር።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(12); R, C, V = 20, 10, 50\ndef smooth(field, k=3):\n    out = field.copy()\n    for _ in range(k): out = (out + np.roll(out, 1, 0) + np.roll(out, -1, 0) + np.roll(out, 1, 1) + np.roll(out, -1, 1)) / 5\n    return out\ndef trial():\n    g = rng.normal(0, 0.25, V); fert = smooth(rng.normal(0, 1.4, (R, C)))\n    var = np.zeros((R, C), int); blk = np.repeat(np.arange(4), 5)\n    for b in range(4): var[b * 5:(b + 1) * 5] = rng.permutation(V).reshape(5, C)\n    y = 4 + g[var] + fert + rng.normal(0, 0.2, (R, C))\n    def fit(extra=None):\n        X = [np.eye(V)[var.ravel()], np.eye(4)[np.repeat(blk, C)][:, 1:]]\n        if extra is not None: X.append(extra.ravel()[:, None])\n        X = np.hstack(X); beta, *_ = np.linalg.lstsq(X, y.ravel(), rcond=None); return beta[:V], y.ravel() - X @ beta\n    rcbd, resid = fit(); res = resid.reshape(R, C)\n    nb = (np.pad(res, ((0, 0), (1, 0)))[:, :-1] + np.pad(res, ((0, 0), (0, 1)))[:, 1:]) / np.where((np.arange(C) == 0) | (np.arange(C) == C - 1), 1, 2)\n    pap, _ = fit(nb)\n    return np.corrcoef(rcbd, g)[0, 1], np.corrcoef(pap, g)[0, 1]\nres = np.array([trial() for _ in range(200)])\nprint(f\"accuracy (correlation with true variety effects): RCBD {res[:, 0].mean():.2f}, neighbour-adjusted {res[:, 1].mean():.2f}\")\nprint(f\"trials where the neighbour adjustment was better: {np.mean(res[:, 1] > res[:, 0]):.0%}\")",
  "out": "accuracy (correlation with true variety effects): RCBD 0.80, neighbour-adjusted 0.85\ntrials where the neighbour adjustment was better: 98%",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Accuracy of variety estimates (mean of 200 trials)",
     "am": "የዝርያ ግምቶች accuracy (የ200 ሙከራዎች አማካይ)"
    },
    "x": {
     "label": "r"
    },
    "fmt": 2,
    "cats": [
     {
      "en": "RCBD analysis",
      "am": "የRCBD ትንተና"
     },
     {
      "en": "Neighbour-adjusted (Papadakis)",
      "am": "በጎረቤት የተስተካከለ (Papadakis)"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Correlation",
       "am": "Correlation"
      },
      "slot": 1,
      "v": [
       0.8,
       0.85
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
       "en": "Correlation",
       "am": "Correlation"
      }
     ],
     "rows": [
      [
       {
        "en": "RCBD analysis",
        "am": "የRCBD ትንተና"
       },
       0.8
      ],
      [
       {
        "en": "Neighbour-adjusted (Papadakis)",
        "am": "በጎረቤት የተስተካከለ (Papadakis)"
       },
       0.85
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "With patchy fertility the RCBD analysis reaches accuracy 0.80: blocks of 50 plots are too big to capture the patches.",
    "Adjusting with neighbouring plots lifts accuracy to 0.85 and helps in 98% of trials.",
    "Neighbours share the same patch of soil, so their residuals tell us about the fertility under each plot."
   ],
   "am": [
    "በተበጣጠሰ ለምነት የRCBD ትንተና 0.80 accuracy ይደርሳል፡ የ50 plots blocks ቁርጥራጮቹን ለመያዝ በጣም ትልቅ ናቸው።",
    "በጎረቤት plots ማስተካከል accuracyን ወደ 0.85 ያሳድጋል፣ በ98% ሙከራዎችም ይረዳል።",
    "ጎረቤቶች ያንኑ የአፈር ቁርጥራጭ ይጋራሉ፤ ስለዚህ residualsቸው ከእያንዳንዱ plot በታች ስላለው ለምነት ይነግሩናል።"
   ]
  },
  "decision": {
   "en": "Record row and column for every plot and analyse large trials with a spatial model (SpATS or AR1×AR1); keep the RCBD as the baseline and report which model fits better.",
   "am": "ለእያንዳንዱ plot ረድፍና ዓምድ መዝግብ፣ ትላልቅ ሙከራዎችን በspatial ሞዴል (SpATS ወይም AR1×AR1) ተንትን፤ RCBDን እንደ መነሻ አቆይና የትኛው ሞዴል የተሻለ እንደሚገጥም ዘግብ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Germination with a binomial GLM",
   "am": "መብቀል ከbinomial GLM ጋር"
  },
  "goal": {
   "en": "Model the germination of sorghum seed stored four ways (50 seeds × 5 dishes each) with a logistic (binomial) GLM, check for overdispersion, and choose a storage method.",
   "am": "በአራት መንገዶች የተከማቸ የማሽላ ዘር መብቀልን (በእያንዳንዱ 50 ዘሮች × 5 ሳህኖች) በlogistic (binomial) GLM ሞዴል አድርግ፣ overdispersionን ፈትሽ፣ የማከማቻ ዘዴ ምረጥ።"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
   },
   {
    "name": "Petri dishes, filter paper, germinator or warm room",
    "why": {
     "en": "run the germination test",
     "am": "የመብቀል ፈተናውን ማካሄድ"
    },
    "get": "seed lab"
   }
  ],
  "steps": {
   "en": [
    "Storage: open sack, sack + ash, hermetic bag, hermetic bag + dried seed.",
    "Count germinated seeds of 50 per dish after 7 days.",
    "Fit a binomial GLM (logit link) by iteratively reweighted least squares.",
    "Compare predicted germination with 95% intervals; check deviance ÷ df for overdispersion.",
    "Compare storage methods on the odds scale."
   ],
   "am": [
    "ማከማቻ፡ ክፍት ከረጢት፣ ከረጢት + አመድ፣ hermetic ከረጢት፣ hermetic ከረጢት + የደረቀ ዘር።",
    "ከ7 ቀናት በኋላ በሳህን ከ50 የበቀሉ ዘሮችን ቁጠር።",
    "binomial GLMን (logit link) በiteratively reweighted least squares ግጠም።",
    "የተተነበየውን መብቀል ከ95% ክልሎች ጋር አወዳድር፤ ለoverdispersion deviance ÷ dfን ፈትሽ።",
    "የማከማቻ ዘዴዎችን በodds ሚዛን አወዳድር።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nmethods = [\"open sack\", \"sack + ash\", \"hermetic bag\", \"hermetic + dried\"]\ngerm = np.array([[31, 28, 34, 30, 27], [36, 38, 35, 39, 34], [42, 44, 41, 43, 45], [47, 46, 48, 45, 47]]); n = 50\ny = germ.ravel(); grp = np.repeat(np.arange(4), 5); X = np.eye(4)[grp]\nbeta = np.zeros(4)\nfor _ in range(25):                                                     # IRLS for the logistic GLM\n    eta = X @ beta; mu = 1 / (1 + np.exp(-eta)); w = n * mu * (1 - mu); z = eta + (y - n * mu) / w\n    beta = np.linalg.solve(X.T @ (w[:, None] * X), X.T @ (w * z))\ncov = np.linalg.inv(X.T @ (w[:, None] * X)); se = np.sqrt(np.diag(cov))\np_hat = 1 / (1 + np.exp(-beta)); lo = 1 / (1 + np.exp(-(beta - 1.96 * se))); hi = 1 / (1 + np.exp(-(beta + 1.96 * se)))\nmu = n / (1 + np.exp(-X @ beta)); dev = 2 * np.sum(y * np.log(y / mu) + (n - y) * np.log((n - y) / (n - mu))); disp = dev / (len(y) - 4)\nodds_ratio = np.exp(beta[3] - beta[0])\nfor m, p, a, b in zip(methods, p_hat, lo, hi): print(f\"{m:17s} germination {p:.1%} (95% CI {a:.1%} to {b:.1%})\")\nprint(f\"deviance / df = {disp:.2f} (near 1: no overdispersion); odds ratio hermetic + dried vs open sack = {odds_ratio:.1f}\")",
  "out": "open sack         germination 60.0% (95% CI 53.8% to 65.9%)\nsack + ash        germination 72.8% (95% CI 67.0% to 78.0%)\nhermetic bag      germination 86.0% (95% CI 81.1% to 89.8%)\nhermetic + dried  germination 93.2% (95% CI 89.3% to 95.7%)\ndeviance / df = 0.47 (near 1: no overdispersion); odds ratio hermetic + dried vs open sack = 9.1",
  "lang": "Python",
  "viz": [
   {
    "type": "dot",
    "title": {
     "en": "Predicted germination with 95% intervals (%)",
     "am": "የተተነበየ መብቀል ከ95% ክልሎች ጋር (%)"
    },
    "x": {
     "label": {
      "en": "Percent germinated",
      "am": "የበቀለ መቶኛ"
     }
    },
    "cats": [
     "open sack",
     "sack + ash",
     "hermetic bag",
     "hermetic + dried"
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
       60.0,
       72.8,
       86.0,
       93.2
      ],
      "lo": [
       53.803,
       66.95,
       81.123,
       89.335
      ],
      "hi": [
       65.892,
       77.955,
       89.776,
       95.731
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
       "open sack",
       60.0,
       53.803,
       65.892
      ],
      [
       "sack + ash",
       72.8,
       66.95,
       77.955
      ],
      [
       "hermetic bag",
       86.0,
       81.123,
       89.776
      ],
      [
       "hermetic + dried",
       93.2,
       89.335,
       95.731
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Germination rises from 60% in an open sack to 93% in a hermetic bag with dried seed.",
    "The odds of germinating are 9 times higher with hermetic storage of dried seed; intervals do not overlap.",
    "Deviance/df = 0.47: the binomial model fits; above about 1.5 you would use a quasi-binomial or a random dish effect."
   ],
   "am": [
    "መብቀል በክፍት ከረጢት ከ60% ወደ hermetic ከረጢት ከደረቀ ዘር ጋር 93% ይጨምራል።",
    "የደረቀ ዘር በhermetic ማከማቻ የመብቀል odds 9 እጥፍ ከፍ ያለ ነው፤ ክልሎቹ አይደራረቡም።",
    "Deviance/df = 0.47፡ binomial ሞዴሉ ይገጥማል፤ ከ1.5 ገደማ በላይ ቢሆን quasi-binomial ወይም የዘፈቀደ የሳህን ውጤት ትጠቀም ነበር።"
   ]
  },
  "decision": {
   "en": "Advise farmers and seed cooperatives to dry seed to below 12% moisture and store it in hermetic bags; analyse count data with a GLM, not ANOVA on percentages.",
   "am": "ገበሬዎችና የዘር ማኅበራት ዘርን ከ12% በታች እርጥበት እንዲያደርቁና በhermetic ከረጢቶች እንዲያከማቹ ምከር፤ የቆጠራ ዳታን በመቶኛዎች ላይ በANOVA ሳይሆን በGLM ተንትን።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Nitrogen response and the economic optimum rate",
   "am": "የናይትሮጅን ምላሽና ኢኮኖሚያዊ ምርጥ መጠን"
  },
  "goal": {
   "en": "Fit a quadratic response of wheat to nitrogen, find the economically optimum rate for current urea and grain prices, and see how it moves when prices change.",
   "am": "የስንዴን ለናይትሮጅን ያለውን quadratic ምላሽ ግጠም፣ ለአሁኑ የዩሪያና የእህል ዋጋዎች ኢኮኖሚያዊ ምርጥ መጠንን ፈልግ፣ ዋጋዎች ሲለወጡ እንዴት እንደሚንቀሳቀስ ተመልከት።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
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
    "name": "Field plots, pegs, tape, labels",
    "why": {
     "en": "lay out and mark the plots",
     "am": "plotsን ማቀድና ምልክት ማድረግ"
    },
    "get": "research station or farmer field"
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
    "Trial: N 0, 23, 46, 69, 92, 115, 138 kg/ha in 4 blocks.",
    "Fit yield = a + bN + cN².",
    "Price ratio = price per kg N ÷ price per kg grain.",
    "Economic optimum: N* = (ratio − b) ÷ (2c); compare with the maximum-yield rate −b ÷ 2c.",
    "Repeat for a range of price ratios."
   ],
   "am": [
    "ሙከራ፡ N 0፣ 23፣ 46፣ 69፣ 92፣ 115፣ 138 kg/ha በ4 blocks።",
    "ምርት = a + bN + cN² ግጠም።",
    "የዋጋ ሬሾ = በkg N ዋጋ ÷ በkg እህል ዋጋ።",
    "ኢኮኖሚያዊ ምርጥ፡ N* = (ሬሾ − b) ÷ (2c)፤ ከከፍተኛ-ምርት መጠኑ −b ÷ 2c ጋር አወዳድር።",
    "ለተለያዩ የዋጋ ሬሾዎች ድገም።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(1); N = np.repeat([0, 23, 46, 69, 92, 115, 138], 4)\ny = 1800 + 32 * N - 0.13 * N ** 2 + rng.normal(0, 180, N.size)            # kg/ha\nc, b, a = np.polyfit(N, y, 2)\nurea_birr_per_kg, grain_birr_per_kg = 60, 45\nprice_N = urea_birr_per_kg / 0.46; ratio = price_N / grain_birr_per_kg\nn_max = -b / (2 * c); n_opt = (ratio - b) / (2 * c)\nprofit = lambda n: (a + b * n + c * n ** 2) * grain_birr_per_kg - price_N * n\nprint(f\"fit: yield = {a:.0f} + {b:.1f} N {c:+.3f} N^2; price ratio {ratio:.2f}\")\nprint(f\"maximum-yield N {n_max:.0f} kg/ha; economic optimum N {n_opt:.0f} kg/ha; profit difference {profit(n_opt) - profit(n_max):,.0f} birr/ha\")\nratios = [1.0, 2.0, 2.9, 4.0, 6.0]; optima = [(r - b) / (2 * c) for r in ratios]\nfor r, o in zip(ratios, optima): print(f\"price ratio {r:.1f}: optimum {o:.0f} kg N/ha\")\ngrid = np.arange(0, 141, 5); curve = a + b * grid + c * grid ** 2",
  "out": "fit: yield = 1810 + 33.8 N -0.152 N^2; price ratio 2.90\nmaximum-yield N 111 kg/ha; economic optimum N 102 kg/ha; profit difference 622 birr/ha\nprice ratio 1.0: optimum 108 kg N/ha\nprice ratio 2.0: optimum 105 kg N/ha\nprice ratio 2.9: optimum 102 kg N/ha\nprice ratio 4.0: optimum 98 kg N/ha\nprice ratio 6.0: optimum 92 kg N/ha",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Wheat response to nitrogen (kg/ha)",
     "am": "የስንዴ ለናይትሮጅን ምላሽ (kg/ha)"
    },
    "x": {
     "label": {
      "en": "Nitrogen (kg/ha)",
      "am": "ናይትሮጅን (kg/ha)"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Grain (kg/ha)",
      "am": "እህል (kg/ha)"
     }
    },
    "series": [
     {
      "name": {
       "en": "Fitted yield",
       "am": "የተገጠመ ምርት"
      },
      "slot": 1,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       5.0,
       10.0,
       15.0,
       20.0,
       25.0,
       30.0,
       35.0,
       40.0,
       45.0,
       50.0,
       55.0,
       60.0,
       65.0,
       70.0,
       75.0,
       80.0,
       85.0,
       90.0,
       95.0,
       100.0,
       105.0,
       110.0,
       115.0,
       120.0,
       125.0,
       130.0,
       135.0,
       140.0
      ],
      "y": [
       1810.3492,
       1975.6306,
       2133.3128,
       2283.3957,
       2425.8795,
       2560.764,
       2688.0493,
       2807.7354,
       2919.8223,
       3024.31,
       3121.1984,
       3210.4877,
       3292.1777,
       3366.2685,
       3432.7601,
       3491.6525,
       3542.9457,
       3586.6397,
       3622.7344,
       3651.2299,
       3672.1262,
       3685.4234,
       3691.1212,
       3689.2199,
       3679.7194,
       3662.6196,
       3637.9207,
       3605.6225,
       3565.7251
      ],
      "tip": [
       "1810|Fitted yield · 0",
       "1976|Fitted yield · 5",
       "2133|Fitted yield · 10",
       "2283|Fitted yield · 15",
       "2426|Fitted yield · 20",
       "2561|Fitted yield · 25",
       "2688|Fitted yield · 30",
       "2808|Fitted yield · 35",
       "2920|Fitted yield · 40",
       "3024|Fitted yield · 45",
       "3121|Fitted yield · 50",
       "3210|Fitted yield · 55",
       "3292|Fitted yield · 60",
       "3366|Fitted yield · 65",
       "3433|Fitted yield · 70",
       "3492|Fitted yield · 75",
       "3543|Fitted yield · 80",
       "3587|Fitted yield · 85",
       "3623|Fitted yield · 90",
       "3651|Fitted yield · 95",
       "3672|Fitted yield · 100",
       "3685|Fitted yield · 105",
       "3691|Fitted yield · 110",
       "3689|Fitted yield · 115",
       "3680|Fitted yield · 120",
       "3663|Fitted yield · 125",
       "3638|Fitted yield · 130",
       "3606|Fitted yield · 135",
       "3566|Fitted yield · 140"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Nitrogen (kg/ha)",
       "am": "ናይትሮጅን (kg/ha)"
      },
      {
       "en": "Fitted yield",
       "am": "የተገጠመ ምርት"
      }
     ],
     "rows": [
      [
       0.0,
       1810.349
      ],
      [
       5.0,
       1975.631
      ],
      [
       10.0,
       2133.313
      ],
      [
       15.0,
       2283.396
      ],
      [
       20.0,
       2425.879
      ],
      [
       25.0,
       2560.764
      ],
      [
       30.0,
       2688.049
      ],
      [
       35.0,
       2807.735
      ],
      [
       40.0,
       2919.822
      ],
      [
       45.0,
       3024.31
      ],
      [
       50.0,
       3121.198
      ],
      [
       55.0,
       3210.488
      ],
      [
       60.0,
       3292.178
      ],
      [
       65.0,
       3366.269
      ],
      [
       70.0,
       3432.76
      ],
      [
       75.0,
       3491.653
      ],
      [
       80.0,
       3542.946
      ],
      [
       85.0,
       3586.64
      ],
      [
       90.0,
       3622.734
      ],
      [
       95.0,
       3651.23
      ],
      [
       100.0,
       3672.126
      ],
      [
       105.0,
       3685.423
      ],
      [
       110.0,
       3691.121
      ],
      [
       115.0,
       3689.22
      ],
      [
       120.0,
       3679.719
      ],
      [
       125.0,
       3662.62
      ],
      [
       130.0,
       3637.921
      ],
      [
       135.0,
       3605.622
      ],
      [
       140.0,
       3565.725
      ]
     ]
    },
    "refs": [
     {
      "kind": "v",
      "v": 102,
      "label": {
       "en": "economic",
       "am": "ኢኮኖሚያዊ"
      }
     },
     {
      "kind": "v",
      "v": 111,
      "label": {
       "en": "max yield",
       "am": "ከፍተኛ ምርት"
      }
     }
    ]
   },
   {
    "type": "xy",
    "title": {
     "en": "Economic optimum vs price ratio",
     "am": "ኢኮኖሚያዊ ምርጥ vs የዋጋ ሬሾ"
    },
    "x": {
     "label": {
      "en": "Price of N ÷ price of grain",
      "am": "የN ዋጋ ÷ የእህል ዋጋ"
     },
     "int": false
    },
    "y": {
     "label": "kg N/ha"
    },
    "series": [
     {
      "name": {
       "en": "Optimum N",
       "am": "ምርጥ N"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       2.9,
       4.0,
       6.0
      ],
      "y": [
       107.9592,
       104.6694,
       101.7085,
       98.0897,
       91.5101
      ],
      "tip": [
       "108|Optimum N · 1",
       "104.7|Optimum N · 2",
       "101.7|Optimum N · 2.9",
       "98.09|Optimum N · 4",
       "91.51|Optimum N · 6"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Price of N ÷ price of grain",
       "am": "የN ዋጋ ÷ የእህል ዋጋ"
      },
      {
       "en": "Optimum N",
       "am": "ምርጥ N"
      }
     ],
     "rows": [
      [
       1.0,
       107.959
      ],
      [
       2.0,
       104.669
      ],
      [
       2.9,
       101.709
      ],
      [
       4.0,
       98.09
      ],
      [
       6.0,
       91.51
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Yield peaks at 111 kg N/ha, but the last kilograms do not pay.",
    "At today’s price ratio (2.9) the economic optimum is 102 kg N/ha, earning 622 birr/ha more than the maximum-yield rate.",
    "If fertiliser becomes twice as expensive relative to grain, the optimum falls to about 92 kg N/ha."
   ],
   "am": [
    "ምርት በ111 kg N/ha ከፍተኛ ይሆናል፤ ግን የመጨረሻዎቹ ኪሎግራሞች አያዋጡም።",
    "በዛሬው የዋጋ ሬሾ (2.9) ኢኮኖሚያዊ ምርጡ 102 kg N/ha ነው፣ ከከፍተኛ-ምርት መጠኑ በ622 ብር/ha የበለጠ ያስገኛል።",
    "ማዳበሪያ ከእህል አንፃር ሁለት እጥፍ ቢወደድ ምርጡ ወደ 92 kg N/ha ገደማ ይወርዳል።"
   ]
  },
  "decision": {
   "en": "Recommend about 100 kg N/ha (about 221 kg urea), and publish the price-ratio table so extension agents can adjust the rate each season.",
   "am": "ወደ 100 kg N/ha (ወደ 221 kg ዩሪያ) ምከር፤ የኤክስቴንሽን ሠራተኞች በየወቅቱ መጠኑን እንዲያስተካክሉ የዋጋ-ሬሾ ሰንጠረዡን አትም።"
  },
  "note": {
   "en": "Prices are illustrative; use current local urea and grain prices.",
   "am": "ዋጋዎቹ ለማሳያ ናቸው፤ የአሁኑን የአካባቢ የዩሪያና የእህል ዋጋዎች ተጠቀም።"
  }
 },
 {
  "title": {
   "en": "PCA and clustering of sorghum landraces",
   "am": "የማሽላ ዝርያዎች PCA እና clustering"
  },
  "goal": {
   "en": "Summarise 6 traits of 60 sorghum landraces with principal components, group them with k-means, and pick a small core set that covers the diversity.",
   "am": "የ60 የማሽላ የአካባቢ ዝርያዎችን 6 ባሕሪያት በprincipal components አጠቃልል፣ በk-means ቡድን አድርጋቸው፣ ብዝሃነቱን የሚሸፍን ትንሽ ዋና ስብስብ ምረጥ።"
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
    "Measure days to flowering, plant height, panicle length, grain weight, grain colour score and stalk sugar.",
    "Standardise each trait (mean 0, SD 1).",
    "PCA: how much variation do PC1 and PC2 explain? Which traits load on them?",
    "k-means with k = 2–6; choose k by the silhouette score.",
    "Choose the landrace closest to each cluster centre as the core set."
   ],
   "am": [
    "የአበባ ቀናትን፣ የተክል ቁመትን፣ የዛላ ርዝመትን፣ የእህል ክብደትን፣ የእህል ቀለም ውጤትንና የአገዳ ስኳርን ለካ።",
    "እያንዳንዱን ባሕሪ standardise አድርግ (አማካይ 0፣ SD 1)።",
    "PCA፡ PC1 እና PC2 ምን ያህል ልዩነት ያብራራሉ? የትኞቹ ባሕሪያት በእነሱ ላይ ይጫናሉ?",
    "k-means በk = 2–6፤ kን በsilhouette ውጤት ምረጥ።",
    "ለእያንዳንዱ የcluster ማዕከል ቅርብ የሆነውን ዝርያ እንደ ዋና ስብስብ ምረጥ።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.cluster import KMeans\nfrom sklearn.metrics import silhouette_score\nrng = np.random.default_rng(7)\ntraits = [\"flowering days\", \"height\", \"panicle length\", \"grain weight\", \"colour score\", \"stalk sugar\"]\ncentres = np.array([[68, 150, 24, 28, 2, 7], [98, 290, 33, 21, 5, 15], [80, 170, 19, 38, 8, 6]])     # early grain / tall sweet / mid bold red\nX = np.vstack([c + rng.normal(0, [4, 15, 2.5, 1.8, 0.7, 1.2], (20, 6)) for c in centres])\nZ = (X - X.mean(0)) / X.std(0)\nU, S, Vt = np.linalg.svd(Z, full_matrices=False); pcs = Z @ Vt[:2].T; var_exp = S ** 2 / (S ** 2).sum()\nsil = {k: silhouette_score(Z, KMeans(k, n_init=10, random_state=0).fit_predict(Z)) for k in range(2, 7)}\nk = max(sil, key=sil.get); km = KMeans(k, n_init=10, random_state=0).fit(Z); lab = km.labels_\ncore = [int(np.argmin(((Z - c) ** 2).sum(1))) for c in km.cluster_centers_]\nprint(f\"PC1 explains {var_exp[0]:.0%}, PC2 {var_exp[1]:.0%}\"); print(\"PC1 loadings:\", {tr: round(float(v), 2) for tr, v in zip(traits, Vt[0])})\nprint(\"silhouette by k:\", {kk: round(v, 2) for kk, v in sil.items()}, \"-> k =\", k); print(\"core set (landrace numbers):\", [c + 1 for c in core])",
  "out": "PC1 explains 69%, PC2 27%\nPC1 loadings: {'flowering days': 0.4, 'height': 0.47, 'panicle length': 0.46, 'grain weight': -0.42, 'colour score': -0.07, 'stalk sugar': 0.48}\nsilhouette by k: {2: 0.63, 3: 0.75, 4: 0.57, 5: 0.39, 6: 0.29} -> k = 3\ncore set (landrace numbers): [31, 60, 7]",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Landraces on the first two principal components",
     "am": "ዝርያዎች በመጀመሪያዎቹ ሁለት principal components ላይ"
    },
    "x": {
     "label": "PC1 (69%)",
     "int": false
    },
    "y": {
     "label": "PC2 (27%)"
    },
    "series": [
     {
      "name": {
       "en": "Cluster 1",
       "am": "Cluster 1"
      },
      "slot": 1,
      "kind": "points",
      "x": [
       3.021,
       2.408,
       2.697,
       2.826,
       2.818,
       2.566,
       2.99,
       2.994,
       2.64,
       2.823,
       2.858,
       3.331,
       3.055,
       2.75,
       3.027,
       2.843,
       2.663,
       2.555,
       2.754,
       2.865
      ],
      "y": [
       0.112,
       -0.071,
       -0.326,
       -0.123,
       -0.318,
       -0.161,
       0.276,
       -0.032,
       -0.287,
       -0.067,
       -0.148,
       -0.149,
       -0.696,
       -0.604,
       -0.703,
       -0.309,
       -0.142,
       0.067,
       -0.155,
       -0.45
      ],
      "size": 4,
      "tip": [
       "0.112|x = 3.02",
       "-0.0709|x = 2.41",
       "-0.326|x = 2.7",
       "-0.123|x = 2.83",
       "-0.318|x = 2.82",
       "-0.161|x = 2.57",
       "0.276|x = 2.99",
       "-0.0324|x = 2.99",
       "-0.287|x = 2.64",
       "-0.0675|x = 2.82",
       "-0.148|x = 2.86",
       "-0.149|x = 3.33",
       "-0.696|x = 3.05",
       "-0.604|x = 2.75",
       "-0.703|x = 3.03",
       "-0.309|x = 2.84",
       "-0.142|x = 2.66",
       "0.0666|x = 2.56",
       "-0.155|x = 2.75",
       "-0.45|x = 2.86"
      ]
     },
     {
      "name": {
       "en": "Cluster 2",
       "am": "Cluster 2"
      },
      "slot": 2,
      "kind": "points",
      "x": [
       -1.561,
       -1.927,
       -1.683,
       -1.794,
       -2.031,
       -1.617,
       -2.099,
       -1.398,
       -2.216,
       -1.57,
       -1.201,
       -1.492,
       -1.864,
       -2.01,
       -1.41,
       -2.143,
       -1.578,
       -1.281,
       -1.866,
       -1.744
      ],
      "y": [
       -1.338,
       -0.428,
       -1.811,
       -1.604,
       -1.136,
       -1.298,
       -1.32,
       -1.35,
       -1.791,
       -1.413,
       -1.465,
       -1.387,
       -1.002,
       -1.749,
       -1.375,
       -1.146,
       -1.686,
       -1.598,
       -1.551,
       -1.497
      ],
      "size": 4,
      "tip": [
       "-1.34|x = -1.56",
       "-0.428|x = -1.93",
       "-1.81|x = -1.68",
       "-1.6|x = -1.79",
       "-1.14|x = -2.03",
       "-1.3|x = -1.62",
       "-1.32|x = -2.1",
       "-1.35|x = -1.4",
       "-1.79|x = -2.22",
       "-1.41|x = -1.57",
       "-1.47|x = -1.2",
       "-1.39|x = -1.49",
       "-1|x = -1.86",
       "-1.75|x = -2.01",
       "-1.38|x = -1.41",
       "-1.15|x = -2.14",
       "-1.69|x = -1.58",
       "-1.6|x = -1.28",
       "-1.55|x = -1.87",
       "-1.5|x = -1.74"
      ]
     },
     {
      "name": {
       "en": "Cluster 3",
       "am": "Cluster 3"
      },
      "slot": 3,
      "kind": "points",
      "x": [
       -1.107,
       -0.872,
       -1.258,
       -1.663,
       -1.423,
       -1.518,
       -1.037,
       -0.796,
       -0.563,
       -1.2,
       -0.953,
       -1.261,
       -1.013,
       -0.975,
       -1.089,
       -1.059,
       -1.381,
       -0.789,
       -1.015,
       -1.027
      ],
      "y": [
       1.756,
       1.431,
       1.841,
       2.08,
       1.483,
       1.606,
       1.499,
       1.77,
       1.712,
       1.204,
       1.821,
       1.309,
       1.73,
       1.479,
       1.419,
       1.425,
       1.921,
       1.422,
       1.831,
       1.493
      ],
      "size": 4,
      "tip": [
       "1.76|x = -1.11",
       "1.43|x = -0.872",
       "1.84|x = -1.26",
       "2.08|x = -1.66",
       "1.48|x = -1.42",
       "1.61|x = -1.52",
       "1.5|x = -1.04",
       "1.77|x = -0.796",
       "1.71|x = -0.563",
       "1.2|x = -1.2",
       "1.82|x = -0.953",
       "1.31|x = -1.26",
       "1.73|x = -1.01",
       "1.48|x = -0.975",
       "1.42|x = -1.09",
       "1.43|x = -1.06",
       "1.92|x = -1.38",
       "1.42|x = -0.789",
       "1.83|x = -1.01",
       "1.49|x = -1.03"
      ]
     }
    ],
    "table": {
     "cols": [
      "PC1 (69%)",
      "PC2 (27%)"
     ],
     "rows": [
      [
       -1.107,
       1.756
      ],
      [
       -0.872,
       1.431
      ],
      [
       -1.258,
       1.841
      ],
      [
       -1.663,
       2.08
      ],
      [
       -1.423,
       1.483
      ],
      [
       -1.518,
       1.606
      ],
      [
       -1.037,
       1.499
      ],
      [
       -0.796,
       1.77
      ],
      [
       -0.563,
       1.712
      ],
      [
       -1.2,
       1.204
      ],
      [
       -0.953,
       1.821
      ],
      [
       -1.261,
       1.309
      ],
      [
       -1.013,
       1.73
      ],
      [
       -0.975,
       1.479
      ],
      [
       -1.089,
       1.419
      ],
      [
       -1.059,
       1.425
      ],
      [
       -1.381,
       1.921
      ],
      [
       -0.789,
       1.422
      ],
      [
       -1.015,
       1.831
      ],
      [
       -1.027,
       1.493
      ],
      [
       3.021,
       0.112
      ],
      [
       2.408,
       -0.071
      ],
      [
       2.697,
       -0.326
      ],
      [
       2.826,
       -0.123
      ],
      [
       2.818,
       -0.318
      ],
      [
       2.566,
       -0.161
      ],
      [
       2.99,
       0.276
      ],
      [
       2.994,
       -0.032
      ],
      [
       2.64,
       -0.287
      ],
      [
       2.823,
       -0.067
      ],
      [
       2.858,
       -0.148
      ],
      [
       3.331,
       -0.149
      ],
      [
       3.055,
       -0.696
      ],
      [
       2.75,
       -0.604
      ],
      [
       3.027,
       -0.703
      ],
      [
       2.843,
       -0.309
      ],
      [
       2.663,
       -0.142
      ],
      [
       2.555,
       0.067
      ],
      [
       2.754,
       -0.155
      ],
      [
       2.865,
       -0.45
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Silhouette score by number of clusters",
     "am": "የsilhouette ውጤት በclusters ብዛት"
    },
    "x": {
     "label": {
      "en": "Number of clusters k",
      "am": "የclusters ብዛት k"
     },
     "int": true
    },
    "y": {
     "label": "Silhouette"
    },
    "series": [
     {
      "name": "Silhouette",
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       2.0,
       3.0,
       4.0,
       5.0,
       6.0
      ],
      "y": [
       0.6335,
       0.7463,
       0.5673,
       0.3856,
       0.2913
      ],
      "tip": [
       "0.6335|Silhouette · 2",
       "0.7463|Silhouette · 3",
       "0.5673|Silhouette · 4",
       "0.3856|Silhouette · 5",
       "0.2913|Silhouette · 6"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Number of clusters k",
       "am": "የclusters ብዛት k"
      },
      "Silhouette"
     ],
     "rows": [
      [
       2.0,
       0.634
      ],
      [
       3.0,
       0.746
      ],
      [
       4.0,
       0.567
      ],
      [
       5.0,
       0.386
      ],
      [
       6.0,
       0.291
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "PC1 and PC2 explain 95% of the variation in 6 traits.",
    "The silhouette score is highest at k = 3: there are 3 clear groups (early grain types, tall sweet-stalk types and mid-season bold red-grain types).",
    "The core set of 3 landraces represents each group."
   ],
   "am": [
    "PC1 እና PC2 በ6 ባሕሪያት ውስጥ ያለውን ልዩነት 95% ያብራራሉ።",
    "የsilhouette ውጤቱ በk = 3 ከፍተኛ ነው፡ 3 ግልጽ ቡድኖች አሉ (ቀደምት የእህል ዓይነቶች፣ ረጃጅም ጣፋጭ-አገዳ ዓይነቶችና የመካከለኛ ወቅት ደፋር ቀይ-እህል ዓይነቶች)።",
    "የ3 ዝርያዎች ዋና ስብስብ እያንዳንዱን ቡድን ይወክላል።"
   ]
  },
  "decision": {
   "en": "Use the core set as parents in the crossing block and conserve all 60 in the gene bank; repeat the analysis with molecular markers before final grouping.",
   "am": "ዋናውን ስብስብ በማዳቀያ blockኡ ውስጥ እንደ ወላጆች ተጠቀም፣ ሁሉንም 60 በዘር ባንክ ውስጥ ጠብቅ፤ ከመጨረሻው ቡድን ማውጣት በፊት ትንተናውን በሞለኪውላር ማርከሮች ድገም።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Lamb growth curves: when to sell?",
   "am": "የበግ ጠቦት የእድገት ኩርባዎች፡ መቼ መሸጥ?"
  },
  "goal": {
   "en": "Fit Gompertz growth curves to the weights of two sheep breeds from birth to 300 days, compare growth rates, and choose the sale age.",
   "am": "ከልደት እስከ 300 ቀናት ድረስ ለሁለት የበግ ዝርያዎች ክብደቶች የGompertz የእድገት ኩርባዎችን ግጠም፣ የእድገት መጠኖችን አወዳድር፣ የሽያጭ ዕድሜውን ምረጥ።"
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
    "name": "Weighing scale and ear tags",
    "why": {
     "en": "weigh the same lambs every month",
     "am": "ያንኑ ጠቦቶች በየወሩ መመዘን"
    },
    "get": "livestock market or station"
   }
  ],
  "steps": {
   "en": [
    "Weigh 15 lambs of each breed at birth and every 30 days to 300 days.",
    "Fit W(t) = A·exp(−b·exp(−k·t)) per breed with nonlinear least squares.",
    "Daily gain = derivative of the curve; find the age of fastest growth.",
    "Compare mature weight A and rate k between breeds.",
    "Choose the sale age where daily gain falls below 80 g/day."
   ],
   "am": [
    "የእያንዳንዱን ዝርያ 15 ጠቦቶች በልደትና በየ30 ቀናት እስከ 300 ቀናት መዝን።",
    "W(t) = A·exp(−b·exp(−k·t))ን በዝርያ በnonlinear least squares ግጠም።",
    "ዕለታዊ ጭማሪ = የኩርባው derivative፤ በጣም ፈጣን የእድገት ዕድሜን ፈልግ።",
    "የበሰለ ክብደት Aን እና መጠን kን በዝርያዎች መካከል አወዳድር።",
    "ዕለታዊ ጭማሪ ከ80 g/ቀን በታች የሚወርድበትን የሽያጭ ዕድሜ ምረጥ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy.optimize import curve_fit\nrng = np.random.default_rng(3); t = np.arange(0, 301, 30)\ngomp = lambda t, A, b, k: A * np.exp(-b * np.exp(-k * t))\ntruth = {\"Washera\": (38, 2.6, 0.011), \"Menz\": (28, 2.4, 0.010)}\nfits, gain_curves = {}, {}\nfor breed, (A, b, k) in truth.items():\n    W = np.concatenate([gomp(t, A, b, k) * rng.normal(1, 0.06, t.size) for _ in range(15)]); tt = np.tile(t, 15)\n    p, _ = curve_fit(gomp, tt, W, p0=(30, 2.5, 0.01)); fits[breed] = p\n    days = np.arange(0, 301); w = gomp(days, *p); gain = np.gradient(w) * 1000\n    sale = int(days[(days > np.log(p[1]) / p[2]) & (gain < 80)][0]) if (gain < 80).any() else 300\n    gain_curves[breed] = (w, gain, sale)\n    print(f\"{breed}: mature weight {p[0]:.1f} kg, rate {p[2]:.4f}/day, fastest growth at {np.log(p[1]) / p[2]:.0f} days ({gain.max():.0f} g/day); gain drops below 80 g/day at {sale} days, weight then {w[sale]:.1f} kg\")",
  "out": "Washera: mature weight 38.8 kg, rate 0.0107/day, fastest growth at 90 days (153 g/day); gain drops below 80 g/day at 221 days, weight then 30.3 kg\nMenz: mature weight 29.0 kg, rate 0.0094/day, fastest growth at 92 days (101 g/day); gain drops below 80 g/day at 173 days, weight then 18.2 kg",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Fitted weight (kg)",
     "am": "የተገጠመ ክብደት (kg)"
    },
    "x": {
     "label": {
      "en": "Age (days)",
      "am": "ዕድሜ (ቀናት)"
     },
     "int": true
    },
    "y": {
     "label": "kg",
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Washera",
       "am": "Washera"
      },
      "slot": 1,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       10.0,
       20.0,
       30.0,
       40.0,
       50.0,
       60.0,
       70.0,
       80.0,
       90.0,
       100.0,
       110.0,
       120.0,
       130.0,
       140.0,
       150.0,
       160.0,
       170.0,
       180.0,
       190.0,
       200.0,
       210.0,
       220.0,
       230.0,
       240.0,
       250.0,
       260.0,
       270.0,
       280.0,
       290.0,
       300.0
      ],
      "y": [
       2.8552,
       3.7207,
       4.72,
       5.8448,
       7.0824,
       8.4163,
       9.8279,
       11.297,
       12.8033,
       14.3274,
       15.8509,
       17.3575,
       18.8329,
       20.2652,
       21.6448,
       22.9643,
       24.2184,
       25.4035,
       26.5177,
       27.5604,
       28.5322,
       29.4346,
       30.2697,
       31.0403,
       31.7493,
       32.4002,
       32.9964,
       33.5414,
       34.0388,
       34.492,
       34.9044
      ],
      "tip": [
       "2.855|Washera · 0",
       "3.721|Washera · 10",
       "4.72|Washera · 20",
       "5.845|Washera · 30",
       "7.082|Washera · 40",
       "8.416|Washera · 50",
       "9.828|Washera · 60",
       "11.3|Washera · 70",
       "12.8|Washera · 80",
       "14.33|Washera · 90",
       "15.85|Washera · 100",
       "17.36|Washera · 110",
       "18.83|Washera · 120",
       "20.27|Washera · 130",
       "21.64|Washera · 140",
       "22.96|Washera · 150",
       "24.22|Washera · 160",
       "25.4|Washera · 170",
       "26.52|Washera · 180",
       "27.56|Washera · 190",
       "28.53|Washera · 200",
       "29.43|Washera · 210",
       "30.27|Washera · 220",
       "31.04|Washera · 230",
       "31.75|Washera · 240",
       "32.4|Washera · 250",
       "33|Washera · 260",
       "33.54|Washera · 270",
       "34.04|Washera · 280",
       "34.49|Washera · 290",
       "34.9|Washera · 300"
      ],
      "endlabel": {
       "en": "Washera",
       "am": "Washera"
      }
     },
     {
      "name": {
       "en": "Menz",
       "am": "Menz"
      },
      "slot": 2,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       10.0,
       20.0,
       30.0,
       40.0,
       50.0,
       60.0,
       70.0,
       80.0,
       90.0,
       100.0,
       110.0,
       120.0,
       130.0,
       140.0,
       150.0,
       160.0,
       170.0,
       180.0,
       190.0,
       200.0,
       210.0,
       220.0,
       230.0,
       240.0,
       250.0,
       260.0,
       270.0,
       280.0,
       290.0,
       300.0
      ],
      "y": [
       2.6897,
       3.3324,
       4.0498,
       4.8358,
       5.6827,
       6.5815,
       7.5222,
       8.4945,
       9.4878,
       10.4922,
       11.4981,
       12.4969,
       13.4808,
       14.4431,
       15.3783,
       16.2816,
       17.1495,
       17.9793,
       18.7691,
       19.5178,
       20.2249,
       20.8905,
       21.5151,
       22.0996,
       22.6452,
       23.1533,
       23.6255,
       24.0634,
       24.469,
       24.8439,
       25.1899
      ],
      "tip": [
       "2.69|Menz · 0",
       "3.332|Menz · 10",
       "4.05|Menz · 20",
       "4.836|Menz · 30",
       "5.683|Menz · 40",
       "6.582|Menz · 50",
       "7.522|Menz · 60",
       "8.494|Menz · 70",
       "9.488|Menz · 80",
       "10.49|Menz · 90",
       "11.5|Menz · 100",
       "12.5|Menz · 110",
       "13.48|Menz · 120",
       "14.44|Menz · 130",
       "15.38|Menz · 140",
       "16.28|Menz · 150",
       "17.15|Menz · 160",
       "17.98|Menz · 170",
       "18.77|Menz · 180",
       "19.52|Menz · 190",
       "20.22|Menz · 200",
       "20.89|Menz · 210",
       "21.52|Menz · 220",
       "22.1|Menz · 230",
       "22.65|Menz · 240",
       "23.15|Menz · 250",
       "23.63|Menz · 260",
       "24.06|Menz · 270",
       "24.47|Menz · 280",
       "24.84|Menz · 290",
       "25.19|Menz · 300"
      ],
      "endlabel": {
       "en": "Menz",
       "am": "Menz"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Age (days)",
       "am": "ዕድሜ (ቀናት)"
      },
      {
       "en": "Washera",
       "am": "Washera"
      },
      {
       "en": "Menz",
       "am": "Menz"
      }
     ],
     "rows": [
      [
       0.0,
       2.855,
       2.69
      ],
      [
       10.0,
       3.721,
       3.332
      ],
      [
       20.0,
       4.72,
       4.05
      ],
      [
       30.0,
       5.845,
       4.836
      ],
      [
       40.0,
       7.082,
       5.683
      ],
      [
       50.0,
       8.416,
       6.582
      ],
      [
       60.0,
       9.828,
       7.522
      ],
      [
       70.0,
       11.297,
       8.494
      ],
      [
       80.0,
       12.803,
       9.488
      ],
      [
       90.0,
       14.327,
       10.492
      ],
      [
       100.0,
       15.851,
       11.498
      ],
      [
       110.0,
       17.357,
       12.497
      ],
      [
       120.0,
       18.833,
       13.481
      ],
      [
       130.0,
       20.265,
       14.443
      ],
      [
       140.0,
       21.645,
       15.378
      ],
      [
       150.0,
       22.964,
       16.282
      ],
      [
       160.0,
       24.218,
       17.15
      ],
      [
       170.0,
       25.404,
       17.979
      ],
      [
       180.0,
       26.518,
       18.769
      ],
      [
       190.0,
       27.56,
       19.518
      ],
      [
       200.0,
       28.532,
       20.225
      ],
      [
       210.0,
       29.435,
       20.891
      ],
      [
       220.0,
       30.27,
       21.515
      ],
      [
       230.0,
       31.04,
       22.1
      ],
      [
       240.0,
       31.749,
       22.645
      ],
      [
       250.0,
       32.4,
       23.153
      ],
      [
       260.0,
       32.996,
       23.625
      ],
      [
       270.0,
       33.541,
       24.063
      ],
      [
       280.0,
       34.039,
       24.469
      ],
      [
       290.0,
       34.492,
       24.844
      ],
      [
       300.0,
       34.904,
       25.19
      ]
     ]
    },
    "rpad": 90
   },
   {
    "type": "xy",
    "title": {
     "en": "Daily gain (g/day)",
     "am": "ዕለታዊ ጭማሪ (g/ቀን)"
    },
    "x": {
     "label": {
      "en": "Age (days)",
      "am": "ዕድሜ (ቀናት)"
     },
     "int": true
    },
    "y": {
     "label": "g/day",
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Washera",
       "am": "Washera"
      },
      "slot": 1,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       10.0,
       20.0,
       30.0,
       40.0,
       50.0,
       60.0,
       70.0,
       80.0,
       90.0,
       100.0,
       110.0,
       120.0,
       130.0,
       140.0,
       150.0,
       160.0,
       170.0,
       180.0,
       190.0,
       200.0,
       210.0,
       220.0,
       230.0,
       240.0,
       250.0,
       260.0,
       270.0,
       280.0,
       290.0,
       300.0
      ],
      "y": [
       80.4003,
       93.3336,
       106.3829,
       118.3642,
       128.8689,
       137.5977,
       144.3671,
       149.1047,
       151.8357,
       152.6649,
       151.7565,
       149.3142,
       145.5637,
       140.7371,
       135.0621,
       128.7523,
       122.0023,
       114.984,
       107.8452,
       100.7099,
       93.6793,
       86.8335,
       80.234,
       73.9259,
       67.9401,
       62.2961,
       57.0034,
       52.0639,
       47.4734,
       43.2231,
       39.4886
      ],
      "tip": [
       "80.4|Washera · 0",
       "93.33|Washera · 10",
       "106.4|Washera · 20",
       "118.4|Washera · 30",
       "128.9|Washera · 40",
       "137.6|Washera · 50",
       "144.4|Washera · 60",
       "149.1|Washera · 70",
       "151.8|Washera · 80",
       "152.7|Washera · 90",
       "151.8|Washera · 100",
       "149.3|Washera · 110",
       "145.6|Washera · 120",
       "140.7|Washera · 130",
       "135.1|Washera · 140",
       "128.8|Washera · 150",
       "122|Washera · 160",
       "115|Washera · 170",
       "107.8|Washera · 180",
       "100.7|Washera · 190",
       "93.68|Washera · 200",
       "86.83|Washera · 210",
       "80.23|Washera · 220",
       "73.93|Washera · 230",
       "67.94|Washera · 240",
       "62.3|Washera · 250",
       "57|Washera · 260",
       "52.06|Washera · 270",
       "47.47|Washera · 280",
       "43.22|Washera · 290",
       "39.49|Washera · 300"
      ],
      "endlabel": {
       "en": "Washera",
       "am": "Washera"
      }
     },
     {
      "name": {
       "en": "Menz",
       "am": "Menz"
      },
      "slot": 2,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       10.0,
       20.0,
       30.0,
       40.0,
       50.0,
       60.0,
       70.0,
       80.0,
       90.0,
       100.0,
       110.0,
       120.0,
       130.0,
       140.0,
       150.0,
       160.0,
       170.0,
       180.0,
       190.0,
       200.0,
       210.0,
       220.0,
       230.0,
       240.0,
       250.0,
       260.0,
       270.0,
       280.0,
       290.0,
       300.0
      ],
      "y": [
       60.792,
       68.0853,
       75.2812,
       81.7873,
       87.4461,
       92.1459,
       95.8213,
       98.4503,
       100.049,
       100.6649,
       100.3698,
       99.253,
       97.4143,
       94.9586,
       91.9911,
       88.6137,
       84.9221,
       81.0042,
       76.9385,
       72.7941,
       68.6305,
       64.4978,
       60.4372,
       56.4821,
       52.6584,
       48.9856,
       45.478,
       42.1448,
       38.9912,
       36.0193,
       33.3634
      ],
      "tip": [
       "60.79|Menz · 0",
       "68.09|Menz · 10",
       "75.28|Menz · 20",
       "81.79|Menz · 30",
       "87.45|Menz · 40",
       "92.15|Menz · 50",
       "95.82|Menz · 60",
       "98.45|Menz · 70",
       "100|Menz · 80",
       "100.7|Menz · 90",
       "100.4|Menz · 100",
       "99.25|Menz · 110",
       "97.41|Menz · 120",
       "94.96|Menz · 130",
       "91.99|Menz · 140",
       "88.61|Menz · 150",
       "84.92|Menz · 160",
       "81|Menz · 170",
       "76.94|Menz · 180",
       "72.79|Menz · 190",
       "68.63|Menz · 200",
       "64.5|Menz · 210",
       "60.44|Menz · 220",
       "56.48|Menz · 230",
       "52.66|Menz · 240",
       "48.99|Menz · 250",
       "45.48|Menz · 260",
       "42.14|Menz · 270",
       "38.99|Menz · 280",
       "36.02|Menz · 290",
       "33.36|Menz · 300"
      ],
      "endlabel": {
       "en": "Menz",
       "am": "Menz"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Age (days)",
       "am": "ዕድሜ (ቀናት)"
      },
      {
       "en": "Washera",
       "am": "Washera"
      },
      {
       "en": "Menz",
       "am": "Menz"
      }
     ],
     "rows": [
      [
       0.0,
       80.4,
       60.792
      ],
      [
       10.0,
       93.334,
       68.085
      ],
      [
       20.0,
       106.383,
       75.281
      ],
      [
       30.0,
       118.364,
       81.787
      ],
      [
       40.0,
       128.869,
       87.446
      ],
      [
       50.0,
       137.598,
       92.146
      ],
      [
       60.0,
       144.367,
       95.821
      ],
      [
       70.0,
       149.105,
       98.45
      ],
      [
       80.0,
       151.836,
       100.049
      ],
      [
       90.0,
       152.665,
       100.665
      ],
      [
       100.0,
       151.757,
       100.37
      ],
      [
       110.0,
       149.314,
       99.253
      ],
      [
       120.0,
       145.564,
       97.414
      ],
      [
       130.0,
       140.737,
       94.959
      ],
      [
       140.0,
       135.062,
       91.991
      ],
      [
       150.0,
       128.752,
       88.614
      ],
      [
       160.0,
       122.002,
       84.922
      ],
      [
       170.0,
       114.984,
       81.004
      ],
      [
       180.0,
       107.845,
       76.938
      ],
      [
       190.0,
       100.71,
       72.794
      ],
      [
       200.0,
       93.679,
       68.631
      ],
      [
       210.0,
       86.834,
       64.498
      ],
      [
       220.0,
       80.234,
       60.437
      ],
      [
       230.0,
       73.926,
       56.482
      ],
      [
       240.0,
       67.94,
       52.658
      ],
      [
       250.0,
       62.296,
       48.986
      ],
      [
       260.0,
       57.003,
       45.478
      ],
      [
       270.0,
       52.064,
       42.145
      ],
      [
       280.0,
       47.473,
       38.991
      ],
      [
       290.0,
       43.223,
       36.019
      ],
      [
       300.0,
       39.489,
       33.363
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 80,
      "label": "80 g/day"
     }
    ],
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "Washera lambs grow toward 39 kg and Menz toward 29 kg.",
    "Both grow fastest around 90 days; after that each extra day of feed adds less weight.",
    "Daily gain falls below 80 g at 221 days (Washera, 30 kg) and 173 days (Menz, 18 kg)."
   ],
   "am": [
    "የዋሸራ ጠቦቶች ወደ 39 kg፣ መንዝ ደግሞ ወደ 29 kg ያድጋሉ።",
    "ሁለቱም በ90 ቀናት ገደማ በፍጥነት ያድጋሉ፤ ከዚያ በኋላ እያንዳንዱ ተጨማሪ የመኖ ቀን ያነሰ ክብደት ይጨምራል።",
    "ዕለታዊ ጭማሪ ከ80 g በታች የሚወርደው በ221 ቀናት (ዋሸራ፣ 30 kg) እና በ173 ቀናት (መንዝ፣ 18 kg) ነው።"
   ]
  },
  "decision": {
   "en": "Plan sales at about 221 days for Washera and 173 days for Menz, earlier if feed is scarce or prices peak (holidays); keep weighing monthly to check.",
   "am": "ለዋሸራ በ221 ቀናት፣ ለመንዝ በ173 ቀናት ገደማ ሽያጭ አቅድ፤ መኖ ከጠፋ ወይም ዋጋዎች ከፍ ካሉ (በዓላት) ቀደም ብለህ፤ ለማረጋገጥ በየወሩ መመዘን ቀጥል።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Partial budget and marginal rate of return",
   "am": "Partial budget እና marginal rate of return"
  },
  "goal": {
   "en": "Turn agronomic results for five fertiliser options into net benefits, remove dominated options, compute marginal rates of return, and pick the recommendation.",
   "am": "የአምስት የማዳበሪያ አማራጮችን አግሮኖሚያዊ ውጤቶች ወደ የተጣራ ጥቅሞች ቀይር፣ የተበለጡ አማራጮችን አስወግድ፣ marginal rates of returnን አስላ፣ ምክሩን ምረጥ።"
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
   }
  ],
  "steps": {
   "en": [
    "Adjust trial yields down 10% for farmer conditions.",
    "Gross benefit = adjusted yield × field price; costs that vary = fertiliser + labour + transport.",
    "Net benefit = gross benefit − costs that vary; sort by cost.",
    "Dominance: drop any option with higher cost but lower net benefit.",
    "MRR between neighbours = Δ net benefit ÷ Δ cost; accept if above 100%."
   ],
   "am": [
    "የሙከራ ምርቶችን ለገበሬ ሁኔታዎች በ10% ቀንስ።",
    "ጠቅላላ ጥቅም = የተስተካከለ ምርት × የመስክ ዋጋ፤ የሚለያዩ ወጪዎች = ማዳበሪያ + ጉልበት + ማጓጓዣ።",
    "የተጣራ ጥቅም = ጠቅላላ ጥቅም − የሚለያዩ ወጪዎች፤ በወጪ ደርድር።",
    "Dominance፡ ከፍ ያለ ወጪና ዝቅተኛ የተጣራ ጥቅም ያለውን ማንኛውንም አማራጭ ጣል።",
    "በጎረቤቶች መካከል MRR = Δ የተጣራ ጥቅም ÷ Δ ወጪ፤ ከ100% በላይ ከሆነ ተቀበል።"
   ]
  },
  "code": "import pandas as pd\nopt = pd.DataFrame({\"option\": [\"no fertiliser\", \"NPS 50\", \"NPS 100\", \"NPS 100 + urea 50\", \"NPS 150 + urea 100\"],\n                    \"yield_kg\": [1900, 2600, 3100, 3700, 3800], \"cost_birr\": [0, 3800, 7200, 10300, 15800]})\nprice = 40                                                                 # birr per kg at harvest\nopt[\"gross\"] = opt.yield_kg * 0.9 * price; opt[\"net\"] = opt.gross - opt.cost_birr\nopt = opt.sort_values(\"cost_birr\").reset_index(drop=True)\nbest_net, keep = -1e18, []\nfor i, r in opt.iterrows():\n    if r.net > best_net: keep.append(i); best_net = r.net\nopt[\"dominated\"] = ~opt.index.isin(keep)\nnd = opt.loc[keep].copy(); nd[\"MRR\"] = (nd.net.diff() / nd.cost_birr.diff()).round(2)\nprint(opt[[\"option\", \"cost_birr\", \"net\", \"dominated\"]].to_string(index=False)); print(nd[[\"option\", \"MRR\"]].to_string(index=False))\nchoice = nd.option.iloc[0]\nfor _, r in nd.iloc[1:].iterrows():\n    if r.MRR >= 1.0: choice = r.option\n    else: break\nprint(\"recommendation (last step with MRR >= 100%):\", choice)",
  "out": "            option  cost_birr      net  dominated\n     no fertiliser          0  68400.0      False\n            NPS 50       3800  89800.0      False\n           NPS 100       7200 104400.0      False\n NPS 100 + urea 50      10300 122900.0      False\nNPS 150 + urea 100      15800 121000.0       True\n           option  MRR\n    no fertiliser  NaN\n           NPS 50 5.63\n          NPS 100 4.29\nNPS 100 + urea 50 5.97\nrecommendation (last step with MRR >= 100%): NPS 100 + urea 50",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Net benefit vs costs that vary (birr/ha)",
     "am": "የተጣራ ጥቅም vs የሚለያዩ ወጪዎች (ብር/ha)"
    },
    "x": {
     "label": {
      "en": "Costs that vary (birr/ha)",
      "am": "የሚለያዩ ወጪዎች (ብር/ha)"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Net benefit (birr/ha)",
      "am": "የተጣራ ጥቅም (ብር/ha)"
     }
    },
    "series": [
     {
      "name": {
       "en": "Observations",
       "am": "ምልከታዎች"
      },
      "slot": 1,
      "kind": "points",
      "x": [
       0.0,
       3800.0,
       7200.0,
       10300.0,
       15800.0
      ],
      "y": [
       68400.0,
       89800.0,
       104400.0,
       122900.0,
       121000.0
      ],
      "size": 4,
      "tip": [
       "6.84e+04| x = 0",
       "8.98e+04| x = 3.8e+03",
       "1.04e+05| x = 7.2e+03",
       "1.23e+05| x = 1.03e+04",
       "1.21e+05| x = 1.58e+04"
      ],
      "labels": [
       "no fertiliser",
       "NPS 50",
       "NPS 100",
       "NPS 100 + urea 50",
       "NPS 150 + urea 100"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Costs that vary (birr/ha)",
       "am": "የሚለያዩ ወጪዎች (ብር/ha)"
      },
      {
       "en": "Net benefit (birr/ha)",
       "am": "የተጣራ ጥቅም (ብር/ha)"
      }
     ],
     "rows": [
      [
       0.0,
       68400.0
      ],
      [
       3800.0,
       89800.0
      ],
      [
       7200.0,
       104400.0
      ],
      [
       10300.0,
       122900.0
      ],
      [
       15800.0,
       121000.0
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Marginal rate of return between non-dominated options (%)",
     "am": "ባልተበለጡ አማራጮች መካከል marginal rate of return (%)"
    },
    "x": {
     "label": {
      "en": "Percent (accept above 100%)",
      "am": "መቶኛ (ከ100% በላይ ተቀበል)"
     }
    },
    "fmt": 0,
    "cats": [
     "NPS 50",
     "NPS 100",
     "NPS 100 + urea 50"
    ],
    "series": [
     {
      "name": "MRR %",
      "slot": 1,
      "v": [
       563.0,
       429.0,
       597.0
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      "MRR %"
     ],
     "rows": [
      [
       "NPS 50",
       563.0
      ],
      [
       "NPS 100",
       429.0
      ],
      [
       "NPS 100 + urea 50",
       597.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "NPS 150 + urea 100 is dominated: it costs more but earns less than a cheaper option.",
    "Marginal rates of return between successive non-dominated options: NPS 50 563%, NPS 100 429%, NPS 100 + urea 50 597%.",
    "The last step with MRR above 100% is “NPS 100 + urea 50”."
   ],
   "am": [
    "NPS 150 + urea 100 ተበልጧል፡ ከርካሹ አማራጭ የበለጠ ያስወጣል ግን ያነሰ ያስገኛል።",
    "በተከታታይ ባልተበለጡ አማራጮች መካከል ያሉ marginal rates of return፡ NPS 50 563%፣ NPS 100 429%፣ NPS 100 + urea 50 597%።",
    "MRR ከ100% በላይ ያለው የመጨረሻው እርምጃ «NPS 100 + urea 50» ነው።"
   ]
  },
  "decision": {
   "en": "Recommend “NPS 100 + urea 50”; check the result with a sensitivity analysis at 20% lower grain prices before publishing.",
   "am": "«NPS 100 + urea 50»ን ምከር፤ ከማሳተምህ በፊት ውጤቱን በ20% ዝቅተኛ የእህል ዋጋዎች sensitivity analysis ፈትሽ።"
  },
  "note": {
   "en": "CIMMYT (1988) partial-budget method; prices are illustrative.",
   "am": "የCIMMYT (1988) partial-budget ዘዴ፤ ዋጋዎቹ ለማሳያ ናቸው።"
  }
 }
];
