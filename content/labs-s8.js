/* Practical labs, track s, level 8. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[8] = [
 {
  "title": {
   "en": "Adaptive on-farm trials with Thompson sampling",
   "am": "በThompson sampling ተለዋዋጭ በእርሻ ላይ ሙከራዎች"
  },
  "goal": {
   "en": "Test 5 bean varieties on 60 farms entering one by one: compare equal allocation with Thompson sampling, which sends more farms to varieties that look good, on farmer yield and on finding the best variety.",
   "am": "አንድ በአንድ በሚገቡ 60 እርሻዎች ላይ 5 የባቄላ ዝርያዎችን ፈትሽ፡ እኩል ምደባን ጥሩ ወደሚመስሉ ዝርያዎች ብዙ እርሻዎችን ከሚልከው Thompson sampling ጋር በገበሬ ምርትና ምርጡን ዝርያ በማግኘት አወዳድር።"
  },
  "time": {
   "en": "2–3 weeks",
   "am": "2–3 ሳምንታት"
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
    "name": "A phone form for each farm’s result",
    "why": {
     "en": "send results as they come",
     "am": "ውጤቶችን እንደደረሱ መላክ"
    },
    "get": "KoboToolbox or ODK"
   }
  ],
  "steps": {
   "en": [
    "Define success: yield above the local check on that farm.",
    "Equal allocation: 12 farms per variety, in random order.",
    "Thompson sampling: for each new farm draw from each variety’s Beta posterior and plant the best draw.",
    "Simulate 2,000 seasons: average success rate for farmers and the chance of naming the true best variety.",
    "Keep a minimum share per variety so every variety is still tested."
   ],
   "am": [
    "ስኬትን ግለጽ፡ በዚያ እርሻ ላይ ከአካባቢያዊ checkኡ በላይ ምርት።",
    "እኩል ምደባ፡ በዝርያ 12 እርሻዎች፣ በዘፈቀደ ቅደም ተከተል።",
    "Thompson sampling፡ ለእያንዳንዱ አዲስ እርሻ ከእያንዳንዱ ዝርያ Beta posterior አውጣና ምርጡን ዝራ።",
    "2,000 ወቅቶችን አስመስል፡ ለገበሬዎች አማካይ የስኬት መጠንና እውነተኛውን ምርጥ ዝርያ የመሰየም ዕድል።",
    "እያንዳንዱ ዝርያ አሁንም እንዲፈተን በዝርያ ዝቅተኛ ድርሻ አቆይ።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(1); p_true = np.array([0.45, 0.55, 0.60, 0.70, 0.50]); K, F = 5, 60\ndef season(adaptive):\n    a, b = np.ones(K), np.ones(K); wins = 0; count = np.zeros(K)\n    order = rng.permutation(np.repeat(np.arange(K), F // K))\n    for f in range(F):\n        if adaptive:\n            v = int(np.argmax(rng.beta(a, b))) if f >= 2 * K else f % K           # first 2 farms each, then Thompson\n        else: v = order[f]\n        s = rng.random() < p_true[v]; a[v] += s; b[v] += 1 - s; wins += s; count[v] += 1\n    return wins / F, int(np.argmax(a / (a + b))) == 3, count\nres = {name: [season(ad) for _ in range(2000)] for name, ad in [(\"equal allocation\", False), (\"Thompson sampling\", True)]}\nfor k, v in res.items():\n    print(f\"{k:18s} farmers better than check {np.mean([x[0] for x in v]):.0%}; best variety identified {np.mean([x[1] for x in v]):.0%}; farms per variety {np.mean([x[2] for x in v], 0).round(1)}\")\nsummary = {k: (np.mean([x[0] for x in v]), np.mean([x[1] for x in v])) for k, v in res.items()}; alloc = np.mean([x[2] for x in res[\"Thompson sampling\"]], 0)",
  "out": "equal allocation   farmers better than check 56%; best variety identified 47%; farms per variety [12. 12. 12. 12. 12.]\nThompson sampling  farmers better than check 60%; best variety identified 58%; farms per variety [ 7.3 10.5 12.7 20.8  8.7]",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Outcome over 2,000 simulated seasons",
     "am": "በ2,000 የተመሰሉ ወቅቶች ውጤት"
    },
    "x": {
     "label": {
      "en": "Percent",
      "am": "መቶኛ"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "Farmers beating the check",
      "am": "checkኡን ያሸነፉ ገበሬዎች"
     },
     {
      "en": "Best variety identified",
      "am": "ምርጡ ዝርያ ተለይቷል"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Equal allocation",
       "am": "እኩል ምደባ"
      },
      "slot": 2,
      "v": [
       56.0,
       47.0
      ]
     },
     {
      "name": {
       "en": "Thompson sampling",
       "am": "Thompson sampling"
      },
      "slot": 1,
      "v": [
       60.0,
       58.0
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
       "en": "Equal allocation",
       "am": "እኩል ምደባ"
      },
      {
       "en": "Thompson sampling",
       "am": "Thompson sampling"
      }
     ],
     "rows": [
      [
       {
        "en": "Farmers beating the check",
        "am": "checkኡን ያሸነፉ ገበሬዎች"
       },
       56.0,
       60.0
      ],
      [
       {
        "en": "Best variety identified",
        "am": "ምርጡ ዝርያ ተለይቷል"
       },
       47.0,
       58.0
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Average farms per variety with Thompson sampling",
     "am": "በThompson sampling በዝርያ አማካይ እርሻዎች"
    },
    "x": {
     "label": {
      "en": "Farms",
      "am": "እርሻዎች"
     }
    },
    "fmt": 1,
    "cats": [
     "V1 (true 45%)",
     "V2 (true 55%)",
     "V3 (true 60%)",
     "V4 (true 70%)",
     "V5 (true 50%)"
    ],
    "series": [
     {
      "name": {
       "en": "Farms",
       "am": "እርሻዎች"
      },
      "slot": 1,
      "v": [
       7.3,
       10.5,
       12.7,
       20.8,
       8.7
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
       "en": "Farms",
       "am": "እርሻዎች"
      }
     ],
     "rows": [
      [
       "V1 (true 45%)",
       7.3
      ],
      [
       "V2 (true 55%)",
       10.5
      ],
      [
       "V3 (true 60%)",
       12.7
      ],
      [
       "V4 (true 70%)",
       20.8
      ],
      [
       "V5 (true 50%)",
       8.7
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "With Thompson sampling 60% of participating farmers beat their check, against 56% with equal allocation.",
    "It still names the true best variety (V4) in 58% of seasons vs 47%.",
    "Most farms go to V4 (21 on average) while weak varieties get few, so estimates for the weak ones are less precise."
   ],
   "am": [
    "በThompson sampling ከተሳታፊ ገበሬዎች 60% checkቸውን አሸንፈዋል፤ በእኩል ምደባ 56%።",
    "አሁንም እውነተኛውን ምርጥ ዝርያ (V4) በ58% ወቅቶች ይሰይማል vs 47%።",
    "አብዛኞቹ እርሻዎች ወደ V4 ይሄዳሉ (በአማካይ 21)፣ ደካማ ዝርያዎች ደግሞ ጥቂት ያገኛሉ፤ ስለዚህ ለደካሞቹ ግምቶች ያነሰ ትክክለኛ ናቸው።"
   ]
  },
  "decision": {
   "en": "Use Thompson sampling with a 10% minimum per variety for participatory trials where farmer benefit matters; use equal allocation when precise estimates of every variety are needed (official release).",
   "am": "የገበሬ ጥቅም አስፈላጊ ለሆነባቸው አሳታፊ ሙከራዎች በዝርያ ከ10% ዝቅተኛ ጋር Thompson samplingን ተጠቀም፤ የእያንዳንዱ ዝርያ ትክክለኛ ግምቶች ሲያስፈልጉ (ኦፊሴላዊ መልቀቅ) እኩል ምደባን ተጠቀም።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Trustworthy prediction: conformal intervals",
   "am": "ታማኝ ትንበያ፡ conformal intervals"
  },
  "goal": {
   "en": "Wrap a yield-prediction model with split conformal intervals, check that 90% intervals really cover 90% of new farms, and fix the under-coverage on dry farms.",
   "am": "የምርት-ትንበያ ሞዴልን በsplit conformal intervals ጠቅልል፣ 90% ክልሎች በእውነት 90% አዲስ እርሻዎችን እንደሚሸፍኑ ፈትሽ፣ በደረቅ እርሻዎች ላይ ያለውን ዝቅተኛ ሽፋን አስተካክል።"
  },
  "time": {
   "en": "2–3 weeks",
   "am": "2–3 ሳምንታት"
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
    "name": "MAPIE (optional)",
    "why": {
     "en": "conformal prediction in scikit-learn",
     "am": "conformal prediction በscikit-learn"
    },
    "get": "pip install mapie"
   }
  ],
  "steps": {
   "en": [
    "Split data: train (1,000 farms), calibration (1,000), test (2,000).",
    "Fit a random forest on the training set.",
    "Calibration residuals → the 90% quantile q; interval = prediction ± q.",
    "Check coverage on test farms overall and for dry vs wet farms.",
    "Mondrian (group-wise) conformal: separate q for dry and wet farms."
   ],
   "am": [
    "ዳታን ክፈል፡ ሥልጠና (1,000 እርሻዎች)፣ calibration (1,000)፣ ፈተና (2,000)።",
    "በሥልጠና ስብስቡ ላይ random forest ግጠም።",
    "Calibration residuals → 90% quantile q፤ ክልል = ትንበያ ± q።",
    "በፈተና እርሻዎች ላይ በአጠቃላይና ለደረቅ vs እርጥብ እርሻዎች ሽፋኑን ፈትሽ።",
    "Mondrian (በቡድን) conformal፡ ለደረቅና ለእርጥብ እርሻዎች የተለየ q።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.ensemble import RandomForestRegressor\nrng = np.random.default_rng(2)\ndef farms(n):\n    rain = rng.uniform(300, 1100, n); fert = rng.uniform(0, 150, n); dry = rain < 550\n    sd = np.where(dry, 0.8, 0.3)                                               # dry farms are much less predictable\n    y = 0.5 + 0.003 * rain + 0.008 * fert + rng.normal(0, sd); return np.column_stack([rain, fert]), y, dry\n(Xt, yt, _), (Xc, yc, dc), (Xs, ys, ds) = farms(1000), farms(1000), farms(2000)\nm = RandomForestRegressor(300, min_samples_leaf=10, random_state=0).fit(Xt, yt)\nrc, ps = np.abs(yc - m.predict(Xc)), m.predict(Xs)\nq = np.quantile(rc, 0.9 * (1 + 1 / len(rc))); inside = np.abs(ys - ps) <= q\nq_g = {g: np.quantile(rc[dc == g], 0.9 * (1 + 1 / (dc == g).sum())) for g in (True, False)}\ninside_g = np.abs(ys - ps) <= np.where(ds, q_g[True], q_g[False])\ncov = {\"standard\": (inside.mean(), inside[ds].mean(), inside[~ds].mean()), \"group-wise\": (inside_g.mean(), inside_g[ds].mean(), inside_g[~ds].mean())}\nfor k, (a, b, c) in cov.items(): print(f\"{k:10s} coverage: all {a:.0%}, dry farms {b:.0%}, wet farms {c:.0%}\")\nprint(f\"interval half-width: standard {q:.2f}; group-wise dry {q_g[True]:.2f}, wet {q_g[False]:.2f} t/ha\")",
  "out": "standard   coverage: all 92%, dry farms 75%, wet farms 100%\ngroup-wise coverage: all 90%, dry farms 90%, wet farms 90%\ninterval half-width: standard 0.92; group-wise dry 1.35, wet 0.50 t/ha",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Coverage of 90% prediction intervals on 2,000 new farms",
     "am": "በ2,000 አዲስ እርሻዎች ላይ የ90% prediction intervals ሽፋን"
    },
    "x": {
     "label": {
      "en": "Percent covered (target 90)",
      "am": "የተሸፈነ መቶኛ (ዒላማ 90)"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "All farms",
      "am": "ሁሉም እርሻዎች"
     },
     {
      "en": "Dry farms",
      "am": "ደረቅ እርሻዎች"
     },
     {
      "en": "Wet farms",
      "am": "እርጥብ እርሻዎች"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Standard conformal",
       "am": "መደበኛ conformal"
      },
      "slot": 2,
      "v": [
       92.0,
       75.0,
       100.0
      ]
     },
     {
      "name": {
       "en": "Group-wise conformal",
       "am": "በቡድን conformal"
      },
      "slot": 1,
      "v": [
       90.0,
       90.0,
       90.0
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
       "en": "Standard conformal",
       "am": "መደበኛ conformal"
      },
      {
       "en": "Group-wise conformal",
       "am": "በቡድን conformal"
      }
     ],
     "rows": [
      [
       {
        "en": "All farms",
        "am": "ሁሉም እርሻዎች"
       },
       92.0,
       90.0
      ],
      [
       {
        "en": "Dry farms",
        "am": "ደረቅ እርሻዎች"
       },
       75.0,
       90.0
      ],
      [
       {
        "en": "Wet farms",
        "am": "እርጥብ እርሻዎች"
       },
       100.0,
       90.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Standard conformal intervals cover 92% of all new farms, as promised.",
    "But they cover only 75% of dry farms and 100% of wet ones: one width cannot fit both.",
    "Group-wise intervals restore about 90% in each group: ±1.35 t/ha for dry farms, ±0.50 for wet."
   ],
   "am": [
    "መደበኛ conformal ክልሎች ቃል እንደተገባው 92% አዲስ እርሻዎችን ይሸፍናሉ።",
    "ግን ደረቅ እርሻዎችን 75% ብቻ፣ እርጥቦቹን 100% ይሸፍናሉ፡ አንድ ስፋት ሁለቱንም ሊገጥም አይችልም።",
    "በቡድን ክልሎች በእያንዳንዱ ቡድን ወደ 90% ይመልሳሉ፡ ለደረቅ እርሻዎች ±1.35 t/ha፣ ለእርጥብ ±0.50።"
   ]
  },
  "decision": {
   "en": "Give farmers group-wise conformal ranges (wider for dry areas) instead of single numbers, and audit coverage by region and gender of farmer every season.",
   "am": "ለገበሬዎች ነጠላ ቁጥሮች ሳይሆን በቡድን conformal ክልሎችን (ለደረቅ አካባቢዎች ሰፋ ያሉ) ስጥ፤ ሽፋኑን በየወቅቱ በክልልና በገበሬ ጾታ ኦዲት አድርግ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Federated learning: training together without sharing data",
   "am": "Federated learning፡ ዳታን ሳይጋሩ በአንድ ላይ ማሰልጠን"
  },
  "goal": {
   "en": "Five regional labs want a disease-risk model but cannot share farm records. Compare local models, federated averaging and a central model trained on pooled data.",
   "am": "አምስት የክልል ላብራቶሪዎች የበሽታ-ስጋት ሞዴል ይፈልጋሉ ግን የእርሻ መዝገቦችን ማጋራት አይችሉም። የአካባቢ ሞዴሎችን፣ federated averagingን እና በተሰበሰበ ዳታ የሰለጠነ ማዕከላዊ ሞዴልን አወዳድር።"
  },
  "time": {
   "en": "2–3 weeks",
   "am": "2–3 ሳምንታት"
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
    "name": "Flower (next step)",
    "why": {
     "en": "a real federated-learning framework",
     "am": "እውነተኛ የfederated-learning framework"
    },
    "get": "flower.ai, pip install flwr"
   }
  ],
  "steps": {
   "en": [
    "Each region has 80–400 records with 6 risk factors and a disease outcome; regions differ a little.",
    "Local: each region trains logistic regression on its own data.",
    "Federated averaging: each round, regions train a few steps from the shared model and send only weights; the server averages them by sample size.",
    "Central: one model on all data pooled (the upper bound).",
    "Evaluate every model on each region’s held-out data."
   ],
   "am": [
    "እያንዳንዱ ክልል 6 የስጋት ምክንያቶችና የበሽታ ውጤት ያላቸው 80–400 መዝገቦች አሉት፤ ክልሎች በትንሹ ይለያያሉ።",
    "አካባቢያዊ፡ እያንዳንዱ ክልል logistic regressionን በራሱ ዳታ ያሰለጥናል።",
    "Federated averaging፡ በእያንዳንዱ ዙር ክልሎች ከጋራ ሞዴሉ ጥቂት እርምጃዎችን ያሰለጥናሉ፣ weights ብቻ ይልካሉ፤ ሰርቨሩ በናሙና መጠን አማካይ ያደርጋቸዋል።",
    "ማዕከላዊ፡ በተሰበሰበ ዳታ ሁሉ ላይ አንድ ሞዴል (የላይኛው ገደብ)።",
    "እያንዳንዱን ሞዴል በእያንዳንዱ ክልል በተለየ ዳታ ላይ ገምግም።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\nrng = np.random.default_rng(3); w_true = np.array([1.2, -0.8, 0.6, 0.0, 0.9, -0.5])\nsizes = [80, 120, 200, 300, 400]; regions = []\nfor n in sizes:\n    shift = rng.normal(0, 0.2, 6); X = rng.normal(0, 1, (n + 300, 6))\n    y = rng.random(n + 300) < 1 / (1 + np.exp(-(X @ (w_true + shift) - 0.3)))\n    regions.append((X[:n], y[:n], X[n:], y[n:]))\nsig = lambda z: 1 / (1 + np.exp(-z))\ndef local_steps(w, X, y, steps=20, lr=0.1):\n    Xb = np.column_stack([np.ones(len(X)), X])\n    for _ in range(steps): w = w - lr * Xb.T @ (sig(Xb @ w) - y) / len(y)\n    return w\nw = np.zeros(7)\nfor rnd in range(60):                                                          # FedAvg: only weights travel\n    w = np.average([local_steps(w.copy(), X, y) for X, y, _, _ in regions], axis=0, weights=sizes)\nauc = {\"local only\": [], \"federated\": [], \"central (pooled)\": []}\ncentral = LogisticRegression().fit(np.vstack([r[0] for r in regions]), np.concatenate([r[1] for r in regions]))\nfor X, y, Xt, yt in regions:\n    auc[\"local only\"].append(roc_auc_score(yt, LogisticRegression().fit(X, y).decision_function(Xt)))\n    auc[\"federated\"].append(roc_auc_score(yt, np.column_stack([np.ones(len(Xt)), Xt]) @ w))\n    auc[\"central (pooled)\"].append(roc_auc_score(yt, central.decision_function(Xt)))\nfor k, v in auc.items(): print(f\"{k:17s} AUC by region {np.round(v, 3)}; mean {np.mean(v):.3f}\")",
  "out": "local only        AUC by region [0.83  0.849 0.86  0.868 0.822]; mean 0.846\nfederated         AUC by region [0.861 0.857 0.845 0.868 0.832]; mean 0.853\ncentral (pooled)  AUC by region [0.861 0.857 0.845 0.868 0.832]; mean 0.853",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Model quality (AUC) on each region’s held-out farms",
     "am": "በእያንዳንዱ ክልል በተለዩ እርሻዎች ላይ የሞዴል ጥራት (AUC)"
    },
    "x": {
     "label": "AUC"
    },
    "fmt": 3,
    "cats": [
     {
      "en": "Region 1 (n=80)",
      "am": "ክልል 1 (n=80)"
     },
     {
      "en": "Region 2 (n=120)",
      "am": "ክልል 2 (n=120)"
     },
     {
      "en": "Region 3 (n=200)",
      "am": "ክልል 3 (n=200)"
     },
     {
      "en": "Region 4 (n=300)",
      "am": "ክልል 4 (n=300)"
     },
     {
      "en": "Region 5 (n=400)",
      "am": "ክልል 5 (n=400)"
     }
    ],
    "series": [
     {
      "name": {
       "en": "local only",
       "am": "local only"
      },
      "slot": 0,
      "v": [
       0.83,
       0.849,
       0.86,
       0.868,
       0.822
      ]
     },
     {
      "name": {
       "en": "federated",
       "am": "federated"
      },
      "slot": 1,
      "v": [
       0.861,
       0.857,
       0.845,
       0.868,
       0.832
      ]
     },
     {
      "name": {
       "en": "central (pooled)",
       "am": "central (pooled)"
      },
      "slot": 2,
      "v": [
       0.861,
       0.857,
       0.845,
       0.868,
       0.832
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
       "en": "local only",
       "am": "local only"
      },
      {
       "en": "federated",
       "am": "federated"
      },
      {
       "en": "central (pooled)",
       "am": "central (pooled)"
      }
     ],
     "rows": [
      [
       {
        "en": "Region 1 (n=80)",
        "am": "ክልል 1 (n=80)"
       },
       0.83,
       0.861,
       0.861
      ],
      [
       {
        "en": "Region 2 (n=120)",
        "am": "ክልል 2 (n=120)"
       },
       0.849,
       0.857,
       0.857
      ],
      [
       {
        "en": "Region 3 (n=200)",
        "am": "ክልል 3 (n=200)"
       },
       0.86,
       0.845,
       0.845
      ],
      [
       {
        "en": "Region 4 (n=300)",
        "am": "ክልል 4 (n=300)"
       },
       0.868,
       0.868,
       0.868
      ],
      [
       {
        "en": "Region 5 (n=400)",
        "am": "ክልል 5 (n=400)"
       },
       0.822,
       0.832,
       0.832
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Small regions suffer most alone: region 1 (80 records) reaches AUC 0.830 with its own data and 0.861 with the federated model.",
    "Federated learning averages 0.853, almost the same as pooling all data (0.853).",
    "No farm record left its region: only model weights were exchanged."
   ],
   "am": [
    "ትናንሽ ክልሎች ብቻቸውን በብዛት ይጎዳሉ፡ ክልል 1 (80 መዝገቦች) በራሱ ዳታ AUC 0.830፣ በfederated ሞዴሉ 0.861 ይደርሳል።",
    "Federated learning በአማካይ 0.853 ያገኛል፣ ሁሉንም ዳታ ከመሰብሰብ (0.853) ጋር ከሞላ ጎደል እኩል።",
    "ምንም የእርሻ መዝገብ ክልሉን አልለቀቀም፡ የተለዋወጡት የሞዴል weights ብቻ ናቸው።"
   ]
  },
  "decision": {
   "en": "Build the national model by federated learning under a data-sharing agreement that keeps records in each region; add secure aggregation so even the weights of one region cannot be inspected.",
   "am": "ብሔራዊ ሞዴሉን መዝገቦችን በእያንዳንዱ ክልል በሚያቆይ የዳታ-ማጋራት ስምምነት ሥር በfederated learning ገንባ፤ የአንድ ክልል weights እንኳን እንዳይመረመሩ secure aggregation ጨምር።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Early warning from soil sensors: EWMA and CUSUM",
   "am": "ከአፈር sensors ቅድመ ማስጠንቀቂያ፡ EWMA እና CUSUM"
  },
  "goal": {
   "en": "Monitor hourly soil-moisture readings from a field sensor, detect a slow sensor drift and a sudden irrigation failure, and tune the alarm to balance speed against false alarms.",
   "am": "ከመስክ sensor በየሰዓቱ የሚመጡ የአፈር-እርጥበት ንባቦችን ተከታተል፣ ቀርፋፋ የsensor driftን እና ድንገተኛ የመስኖ ውድቀትን ለይ፣ ፍጥነትን ከሐሰት ማንቂያዎች ጋር ለማመጣጠን ማንቂያውን አስተካክል።"
  },
  "time": {
   "en": "2–3 weeks",
   "am": "2–3 ሳምንታት"
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
    "name": "Soil-moisture sensor + microcontroller (ESP32)",
    "why": {
     "en": "collect readings and send by GSM/LoRa",
     "am": "ንባቦችን መሰብሰብና በGSM/LoRa መላክ"
    },
    "get": "electronics suppliers"
   }
  ],
  "steps": {
   "en": [
    "Learn normal behaviour from 7 days: mean and SD of the hourly change after removing the daily cycle.",
    "EWMA chart: smoothed residual; alarm outside ±L standard errors.",
    "CUSUM chart: accumulates small deviations; alarm above h.",
    "Test on a series with a drift from day 10 and a failure on day 16.",
    "Count detection delay and false alarms per month for several thresholds."
   ],
   "am": [
    "ከ7 ቀናት መደበኛ ባሕሪን ተማር፡ የዕለት ዑደቱን ካስወገድክ በኋላ የሰዓት ለውጥ አማካይና SD።",
    "የEWMA ቻርት፡ የለሰለሰ residual፤ ከ±L standard errors ውጭ ማንቂያ።",
    "የCUSUM ቻርት፡ ትናንሽ ልዩነቶችን ያጠራቅማል፤ ከh በላይ ማንቂያ።",
    "ከቀን 10 drift እና በቀን 16 ውድቀት ባለው ተከታታይ ላይ ፈትሽ።",
    "ለበርካታ ወሰኖች የመለየት መዘግየትንና በወር የሐሰት ማንቂያዎችን ቁጠር።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(8); hours = np.arange(24 * 20)\ncycle = 1.5 * np.sin(2 * np.pi * hours / 24)\nx = 32 + cycle + rng.normal(0, 0.5, hours.size)\nx[hours >= 24 * 10] += 0.02 * (hours[hours >= 24 * 10] - 24 * 10)                  # sensor drift from day 10\nx[hours >= 24 * 16] -= 6                                                            # irrigation failure on day 16\nresid = x - (32 + cycle); mu, sd = resid[:24 * 7].mean(), resid[:24 * 7].std()\nlam_, L = 0.1, 3.0\newma = np.zeros_like(resid); s = mu\nfor i, r in enumerate(resid): s = lam_ * r + (1 - lam_) * s; ewma[i] = s\nlim = L * sd * np.sqrt(lam_ / (2 - lam_)); alarm_e = np.where(np.abs(ewma - mu) > lim)[0]\nk, h = 0.5 * sd, 5 * sd; cp, cn = 0.0, 0.0; alarm_c = []\nfor i, r in enumerate(resid):\n    cp = max(0, cp + r - mu - k); cn = max(0, cn - (r - mu) - k)\n    if cp > h or cn > h: alarm_c.append(i); cp = cn = 0\nfirst = lambda arr, start: next((int(a) for a in arr if a >= start), None)\nfor name, arr in [(\"EWMA\", alarm_e), (\"CUSUM\", np.array(alarm_c))]:\n    false_ = int(np.sum(np.asarray(arr) < 24 * 10)); d1 = first(arr, 24 * 10)\n    print(f\"{name}: false alarms in days 1-10: {false_}; drift detected after {f'{(d1 - 240) / 24:.1f}' if d1 is not None else 'never'} days; alarm active at the failure within {first(arr, 24 * 16) - 384 if first(arr, 24 * 16) is not None else 'never'} h\")\ndelay_drift = {\"EWMA\": (first(alarm_e, 240) - 240) / 24, \"CUSUM\": (first(alarm_c, 240) - 240) / 24}",
  "out": "EWMA: false alarms in days 1-10: 0; drift detected after 1.2 days; alarm active at the failure within 0 h\nCUSUM: false alarms in days 1-10: 0; drift detected after 1.4 days; alarm active at the failure within 0 h",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Soil moisture (%), hourly over 20 days",
     "am": "የአፈር እርጥበት (%)፣ በ20 ቀናት በየሰዓቱ"
    },
    "x": {
     "label": {
      "en": "Day",
      "am": "ቀን"
     },
     "int": false
    },
    "y": {
     "label": "%"
    },
    "series": [
     {
      "name": {
       "en": "Reading",
       "am": "ንባብ"
      },
      "slot": 1,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       0.12,
       0.25,
       0.38,
       0.5,
       0.62,
       0.75,
       0.88,
       1.0,
       1.12,
       1.25,
       1.38,
       1.5,
       1.62,
       1.75,
       1.88,
       2.0,
       2.12,
       2.25,
       2.38,
       2.5,
       2.62,
       2.75,
       2.88,
       3.0,
       3.12,
       3.25,
       3.38,
       3.5,
       3.62,
       3.75,
       3.88,
       4.0,
       4.12,
       4.25,
       4.38,
       4.5,
       4.62,
       4.75,
       4.88,
       5.0,
       5.12,
       5.25,
       5.38,
       5.5,
       5.62,
       5.75,
       5.88,
       6.0,
       6.12,
       6.25,
       6.38,
       6.5,
       6.62,
       6.75,
       6.88,
       7.0,
       7.12,
       7.25,
       7.38,
       7.5,
       7.62,
       7.75,
       7.88,
       8.0,
       8.12,
       8.25,
       8.38,
       8.5,
       8.62,
       8.75,
       8.88,
       9.0,
       9.12,
       9.25,
       9.38,
       9.5,
       9.62,
       9.75,
       9.88,
       10.0,
       10.12,
       10.25,
       10.38,
       10.5,
       10.62,
       10.75,
       10.88,
       11.0,
       11.12,
       11.25,
       11.38,
       11.5,
       11.62,
       11.75,
       11.88,
       12.0,
       12.12,
       12.25,
       12.38,
       12.5,
       12.62,
       12.75,
       12.88,
       13.0,
       13.12,
       13.25,
       13.38,
       13.5,
       13.62,
       13.75,
       13.88,
       14.0,
       14.12,
       14.25,
       14.38,
       14.5,
       14.62,
       14.75,
       14.88,
       15.0,
       15.12,
       15.25,
       15.38,
       15.5,
       15.62,
       15.75,
       15.88,
       16.0,
       16.12,
       16.25,
       16.38,
       16.5,
       16.62,
       16.75,
       16.88,
       17.0,
       17.12,
       17.25,
       17.38,
       17.5,
       17.62,
       17.75,
       17.88,
       18.0,
       18.12,
       18.25,
       18.38,
       18.5,
       18.62,
       18.75,
       18.88,
       19.0,
       19.12,
       19.25,
       19.38,
       19.5,
       19.62,
       19.75,
       19.88
      ],
      "y": [
       31.1309,
       32.8849,
       33.0214,
       33.7568,
       32.4299,
       31.2445,
       30.0816,
       31.0684,
       31.9408,
       33.1701,
       33.0693,
       33.7894,
       32.7785,
       30.3217,
       29.7447,
       30.9263,
       31.5339,
       33.0966,
       34.5617,
       34.3297,
       32.0273,
       30.7742,
       30.3232,
       31.0328,
       32.1451,
       33.327,
       33.1827,
       33.2758,
       32.9092,
       30.4884,
       30.3886,
       31.0193,
       32.3316,
       32.7506,
       33.3498,
       33.0259,
       32.0888,
       30.9881,
       30.8557,
       31.3659,
       31.8452,
       33.1996,
       33.6493,
       32.4974,
       31.5448,
       31.2946,
       30.9875,
       31.3992,
       31.5059,
       32.72,
       33.6208,
       32.8844,
       31.3496,
       31.0575,
       30.1141,
       30.8362,
       32.5575,
       33.2258,
       31.925,
       32.0679,
       31.9827,
       31.1683,
       30.409,
       31.4243,
       32.9528,
       32.7535,
       33.4351,
       32.8455,
       31.3668,
       29.9898,
       29.9175,
       31.113,
       32.5093,
       31.8446,
       33.367,
       32.4246,
       31.5491,
       30.0661,
       30.5995,
       31.1711,
       32.2056,
       32.7044,
       33.5527,
       32.8588,
       32.4088,
       30.776,
       30.6204,
       31.1392,
       32.1934,
       33.9816,
       33.6205,
       33.5645,
       32.8397,
       31.5902,
       30.8893,
       31.5226,
       32.8296,
       33.7913,
       34.3091,
       33.3107,
       32.8553,
       31.5593,
       31.0353,
       31.5481,
       33.1955,
       34.1035,
       34.2526,
       34.2185,
       33.888,
       32.3837,
       32.1959,
       32.2974,
       34.3851,
       35.0249,
       35.2697,
       35.3999,
       34.8699,
       33.4795,
       33.0272,
       32.4737,
       33.6388,
       35.6319,
       36.1955,
       35.5258,
       34.8306,
       33.7014,
       33.6516,
       33.3004,
       29.0297,
       30.9723,
       30.6709,
       29.5065,
       29.6071,
       27.9476,
       27.6632,
       28.3761,
       29.9145,
       30.8822,
       30.0334,
       31.1107,
       29.9426,
       28.0971,
       28.4566,
       29.0115,
       29.8975,
       31.6998,
       31.7469,
       31.0294,
       30.1314,
       28.8037,
       28.8523,
       29.1693,
       29.9322,
       32.739,
       31.6195,
       31.7425,
       29.7646,
       29.7179,
       29.1615,
       30.0282
      ],
      "tip": [
       "31.13|Reading · 0",
       "32.88|Reading · 0.12",
       "33.02|Reading · 0.25",
       "33.76|Reading · 0.38",
       "32.43|Reading · 0.5",
       "31.24|Reading · 0.62",
       "30.08|Reading · 0.75",
       "31.07|Reading · 0.88",
       "31.94|Reading · 1",
       "33.17|Reading · 1.12",
       "33.07|Reading · 1.25",
       "33.79|Reading · 1.38",
       "32.78|Reading · 1.5",
       "30.32|Reading · 1.62",
       "29.74|Reading · 1.75",
       "30.93|Reading · 1.88",
       "31.53|Reading · 2",
       "33.1|Reading · 2.12",
       "34.56|Reading · 2.25",
       "34.33|Reading · 2.38",
       "32.03|Reading · 2.5",
       "30.77|Reading · 2.62",
       "30.32|Reading · 2.75",
       "31.03|Reading · 2.88",
       "32.15|Reading · 3",
       "33.33|Reading · 3.12",
       "33.18|Reading · 3.25",
       "33.28|Reading · 3.38",
       "32.91|Reading · 3.5",
       "30.49|Reading · 3.62",
       "30.39|Reading · 3.75",
       "31.02|Reading · 3.88",
       "32.33|Reading · 4",
       "32.75|Reading · 4.12",
       "33.35|Reading · 4.25",
       "33.03|Reading · 4.38",
       "32.09|Reading · 4.5",
       "30.99|Reading · 4.62",
       "30.86|Reading · 4.75",
       "31.37|Reading · 4.88",
       "31.85|Reading · 5",
       "33.2|Reading · 5.12",
       "33.65|Reading · 5.25",
       "32.5|Reading · 5.38",
       "31.54|Reading · 5.5",
       "31.29|Reading · 5.62",
       "30.99|Reading · 5.75",
       "31.4|Reading · 5.88",
       "31.51|Reading · 6",
       "32.72|Reading · 6.12",
       "33.62|Reading · 6.25",
       "32.88|Reading · 6.38",
       "31.35|Reading · 6.5",
       "31.06|Reading · 6.62",
       "30.11|Reading · 6.75",
       "30.84|Reading · 6.88",
       "32.56|Reading · 7",
       "33.23|Reading · 7.12",
       "31.92|Reading · 7.25",
       "32.07|Reading · 7.38",
       "31.98|Reading · 7.5",
       "31.17|Reading · 7.62",
       "30.41|Reading · 7.75",
       "31.42|Reading · 7.88",
       "32.95|Reading · 8",
       "32.75|Reading · 8.12",
       "33.44|Reading · 8.25",
       "32.85|Reading · 8.38",
       "31.37|Reading · 8.5",
       "29.99|Reading · 8.62",
       "29.92|Reading · 8.75",
       "31.11|Reading · 8.88",
       "32.51|Reading · 9",
       "31.84|Reading · 9.12",
       "33.37|Reading · 9.25",
       "32.42|Reading · 9.38",
       "31.55|Reading · 9.5",
       "30.07|Reading · 9.62",
       "30.6|Reading · 9.75",
       "31.17|Reading · 9.88",
       "32.21|Reading · 10",
       "32.7|Reading · 10.12",
       "33.55|Reading · 10.25",
       "32.86|Reading · 10.38",
       "32.41|Reading · 10.5",
       "30.78|Reading · 10.62",
       "30.62|Reading · 10.75",
       "31.14|Reading · 10.88",
       "32.19|Reading · 11",
       "33.98|Reading · 11.12",
       "33.62|Reading · 11.25",
       "33.56|Reading · 11.38",
       "32.84|Reading · 11.5",
       "31.59|Reading · 11.62",
       "30.89|Reading · 11.75",
       "31.52|Reading · 11.88",
       "32.83|Reading · 12",
       "33.79|Reading · 12.12",
       "34.31|Reading · 12.25",
       "33.31|Reading · 12.38",
       "32.86|Reading · 12.5",
       "31.56|Reading · 12.62",
       "31.04|Reading · 12.75",
       "31.55|Reading · 12.88",
       "33.2|Reading · 13",
       "34.1|Reading · 13.12",
       "34.25|Reading · 13.25",
       "34.22|Reading · 13.38",
       "33.89|Reading · 13.5",
       "32.38|Reading · 13.62",
       "32.2|Reading · 13.75",
       "32.3|Reading · 13.88",
       "34.39|Reading · 14",
       "35.02|Reading · 14.12",
       "35.27|Reading · 14.25",
       "35.4|Reading · 14.38",
       "34.87|Reading · 14.5",
       "33.48|Reading · 14.62",
       "33.03|Reading · 14.75",
       "32.47|Reading · 14.88",
       "33.64|Reading · 15",
       "35.63|Reading · 15.12",
       "36.2|Reading · 15.25",
       "35.53|Reading · 15.38",
       "34.83|Reading · 15.5",
       "33.7|Reading · 15.62",
       "33.65|Reading · 15.75",
       "33.3|Reading · 15.88",
       "29.03|Reading · 16",
       "30.97|Reading · 16.12",
       "30.67|Reading · 16.25",
       "29.51|Reading · 16.38",
       "29.61|Reading · 16.5",
       "27.95|Reading · 16.62",
       "27.66|Reading · 16.75",
       "28.38|Reading · 16.88",
       "29.91|Reading · 17",
       "30.88|Reading · 17.12",
       "30.03|Reading · 17.25",
       "31.11|Reading · 17.38",
       "29.94|Reading · 17.5",
       "28.1|Reading · 17.62",
       "28.46|Reading · 17.75",
       "29.01|Reading · 17.88",
       "29.9|Reading · 18",
       "31.7|Reading · 18.12",
       "31.75|Reading · 18.25",
       "31.03|Reading · 18.38",
       "30.13|Reading · 18.5",
       "28.8|Reading · 18.62",
       "28.85|Reading · 18.75",
       "29.17|Reading · 18.88",
       "29.93|Reading · 19",
       "32.74|Reading · 19.12",
       "31.62|Reading · 19.25",
       "31.74|Reading · 19.38",
       "29.76|Reading · 19.5",
       "29.72|Reading · 19.62",
       "29.16|Reading · 19.75",
       "30.03|Reading · 19.88"
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
       "en": "Reading",
       "am": "ንባብ"
      }
     ],
     "rows": [
      [
       0.0,
       31.131
      ],
      [
       0.12,
       32.885
      ],
      [
       0.25,
       33.021
      ],
      [
       0.38,
       33.757
      ],
      [
       0.5,
       32.43
      ],
      [
       0.62,
       31.245
      ],
      [
       0.75,
       30.082
      ],
      [
       0.88,
       31.068
      ],
      [
       1.0,
       31.941
      ],
      [
       1.12,
       33.17
      ],
      [
       1.25,
       33.069
      ],
      [
       1.38,
       33.789
      ],
      [
       1.5,
       32.778
      ],
      [
       1.62,
       30.322
      ],
      [
       1.75,
       29.745
      ],
      [
       1.88,
       30.926
      ],
      [
       2.0,
       31.534
      ],
      [
       2.12,
       33.097
      ],
      [
       2.25,
       34.562
      ],
      [
       2.38,
       34.33
      ],
      [
       2.5,
       32.027
      ],
      [
       2.62,
       30.774
      ],
      [
       2.75,
       30.323
      ],
      [
       2.88,
       31.033
      ],
      [
       3.0,
       32.145
      ],
      [
       3.12,
       33.327
      ],
      [
       3.25,
       33.183
      ],
      [
       3.38,
       33.276
      ],
      [
       3.5,
       32.909
      ],
      [
       3.62,
       30.488
      ],
      [
       3.75,
       30.389
      ],
      [
       3.88,
       31.019
      ],
      [
       4.0,
       32.332
      ],
      [
       4.12,
       32.751
      ],
      [
       4.25,
       33.35
      ],
      [
       4.38,
       33.026
      ],
      [
       4.5,
       32.089
      ],
      [
       4.62,
       30.988
      ],
      [
       4.75,
       30.856
      ],
      [
       4.88,
       31.366
      ],
      [
       5.0,
       31.845
      ],
      [
       5.12,
       33.2
      ],
      [
       5.25,
       33.649
      ],
      [
       5.38,
       32.497
      ],
      [
       5.5,
       31.545
      ],
      [
       5.62,
       31.295
      ],
      [
       5.75,
       30.988
      ],
      [
       5.88,
       31.399
      ],
      [
       6.0,
       31.506
      ],
      [
       6.12,
       32.72
      ],
      [
       6.25,
       33.621
      ],
      [
       6.38,
       32.884
      ],
      [
       6.5,
       31.35
      ],
      [
       6.62,
       31.057
      ],
      [
       6.75,
       30.114
      ],
      [
       6.88,
       30.836
      ],
      [
       7.0,
       32.558
      ],
      [
       7.12,
       33.226
      ],
      [
       7.25,
       31.925
      ],
      [
       7.38,
       32.068
      ],
      [
       7.5,
       31.983
      ],
      [
       7.62,
       31.168
      ],
      [
       7.75,
       30.409
      ],
      [
       7.88,
       31.424
      ],
      [
       8.0,
       32.953
      ],
      [
       8.12,
       32.753
      ],
      [
       8.25,
       33.435
      ],
      [
       8.38,
       32.846
      ],
      [
       8.5,
       31.367
      ],
      [
       8.62,
       29.99
      ],
      [
       8.75,
       29.917
      ],
      [
       8.88,
       31.113
      ],
      [
       9.0,
       32.509
      ],
      [
       9.12,
       31.845
      ],
      [
       9.25,
       33.367
      ],
      [
       9.38,
       32.425
      ],
      [
       9.5,
       31.549
      ],
      [
       9.62,
       30.066
      ],
      [
       9.75,
       30.599
      ],
      [
       9.88,
       31.171
      ],
      [
       10.0,
       32.206
      ],
      [
       10.12,
       32.704
      ],
      [
       10.25,
       33.553
      ],
      [
       10.38,
       32.859
      ],
      [
       10.5,
       32.409
      ],
      [
       10.62,
       30.776
      ],
      [
       10.75,
       30.62
      ],
      [
       10.88,
       31.139
      ],
      [
       11.0,
       32.193
      ],
      [
       11.12,
       33.982
      ],
      [
       11.25,
       33.621
      ],
      [
       11.38,
       33.565
      ],
      [
       11.5,
       32.84
      ],
      [
       11.62,
       31.59
      ],
      [
       11.75,
       30.889
      ],
      [
       11.88,
       31.523
      ],
      [
       12.0,
       32.83
      ],
      [
       12.12,
       33.791
      ],
      [
       12.25,
       34.309
      ],
      [
       12.38,
       33.311
      ],
      [
       12.5,
       32.855
      ],
      [
       12.62,
       31.559
      ],
      [
       12.75,
       31.035
      ],
      [
       12.88,
       31.548
      ],
      [
       13.0,
       33.196
      ],
      [
       13.12,
       34.104
      ],
      [
       13.25,
       34.253
      ],
      [
       13.38,
       34.218
      ],
      [
       13.5,
       33.888
      ],
      [
       13.62,
       32.384
      ],
      [
       13.75,
       32.196
      ],
      [
       13.88,
       32.297
      ],
      [
       14.0,
       34.385
      ],
      [
       14.12,
       35.025
      ],
      [
       14.25,
       35.27
      ],
      [
       14.38,
       35.4
      ],
      [
       14.5,
       34.87
      ],
      [
       14.62,
       33.479
      ],
      [
       14.75,
       33.027
      ],
      [
       14.88,
       32.474
      ],
      [
       15.0,
       33.639
      ],
      [
       15.12,
       35.632
      ],
      [
       15.25,
       36.196
      ],
      [
       15.38,
       35.526
      ],
      [
       15.5,
       34.831
      ],
      [
       15.62,
       33.701
      ],
      [
       15.75,
       33.652
      ],
      [
       15.88,
       33.3
      ],
      [
       16.0,
       29.03
      ],
      [
       16.12,
       30.972
      ],
      [
       16.25,
       30.671
      ],
      [
       16.38,
       29.506
      ],
      [
       16.5,
       29.607
      ],
      [
       16.62,
       27.948
      ],
      [
       16.75,
       27.663
      ],
      [
       16.88,
       28.376
      ],
      [
       17.0,
       29.914
      ],
      [
       17.12,
       30.882
      ],
      [
       17.25,
       30.033
      ],
      [
       17.38,
       31.111
      ],
      [
       17.5,
       29.943
      ],
      [
       17.62,
       28.097
      ],
      [
       17.75,
       28.457
      ],
      [
       17.88,
       29.012
      ],
      [
       18.0,
       29.897
      ],
      [
       18.12,
       31.7
      ],
      [
       18.25,
       31.747
      ],
      [
       18.38,
       31.029
      ],
      [
       18.5,
       30.131
      ],
      [
       18.62,
       28.804
      ],
      [
       18.75,
       28.852
      ],
      [
       18.88,
       29.169
      ],
      [
       19.0,
       29.932
      ],
      [
       19.12,
       32.739
      ],
      [
       19.25,
       31.619
      ],
      [
       19.38,
       31.742
      ],
      [
       19.5,
       29.765
      ],
      [
       19.62,
       29.718
      ],
      [
       19.75,
       29.162
      ],
      [
       19.88,
       30.028
      ]
     ]
    },
    "refs": [
     {
      "kind": "v",
      "v": 10,
      "label": {
       "en": "drift starts",
       "am": "drift ይጀምራል"
      }
     },
     {
      "kind": "v",
      "v": 16,
      "label": {
       "en": "failure",
       "am": "ውድቀት"
      }
     }
    ]
   },
   {
    "type": "xy",
    "title": {
     "en": "EWMA of the de-seasonalised reading, with control limits",
     "am": "የዕለት ዑደት የተወገደለት ንባብ EWMA፣ ከቁጥጥር ገደቦች ጋር"
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
      "en": "Deviation (%)",
      "am": "ልዩነት (%)"
     }
    },
    "series": [
     {
      "name": "EWMA",
      "slot": 2,
      "kind": "line",
      "markers": false,
      "x": [
       0.0,
       0.12,
       0.25,
       0.38,
       0.5,
       0.62,
       0.75,
       0.88,
       1.0,
       1.12,
       1.25,
       1.38,
       1.5,
       1.62,
       1.75,
       1.88,
       2.0,
       2.12,
       2.25,
       2.38,
       2.5,
       2.62,
       2.75,
       2.88,
       3.0,
       3.12,
       3.25,
       3.38,
       3.5,
       3.62,
       3.75,
       3.88,
       4.0,
       4.12,
       4.25,
       4.38,
       4.5,
       4.62,
       4.75,
       4.88,
       5.0,
       5.12,
       5.25,
       5.38,
       5.5,
       5.62,
       5.75,
       5.88,
       6.0,
       6.12,
       6.25,
       6.38,
       6.5,
       6.62,
       6.75,
       6.88,
       7.0,
       7.12,
       7.25,
       7.38,
       7.5,
       7.62,
       7.75,
       7.88,
       8.0,
       8.12,
       8.25,
       8.38,
       8.5,
       8.62,
       8.75,
       8.88,
       9.0,
       9.12,
       9.25,
       9.38,
       9.5,
       9.62,
       9.75,
       9.88,
       10.0,
       10.12,
       10.25,
       10.38,
       10.5,
       10.62,
       10.75,
       10.88,
       11.0,
       11.12,
       11.25,
       11.38,
       11.5,
       11.62,
       11.75,
       11.88,
       12.0,
       12.12,
       12.25,
       12.38,
       12.5,
       12.62,
       12.75,
       12.88,
       13.0,
       13.12,
       13.25,
       13.38,
       13.5,
       13.62,
       13.75,
       13.88,
       14.0,
       14.12,
       14.25,
       14.38,
       14.5,
       14.62,
       14.75,
       14.88,
       15.0,
       15.12,
       15.25,
       15.38,
       15.5,
       15.62,
       15.75,
       15.88,
       16.0,
       16.12,
       16.25,
       16.38,
       16.5,
       16.62,
       16.75,
       16.88,
       17.0,
       17.12,
       17.25,
       17.38,
       17.5,
       17.62,
       17.75,
       17.88,
       18.0,
       18.12,
       18.25,
       18.38,
       18.5,
       18.62,
       18.75,
       18.88,
       19.0,
       19.12,
       19.25,
       19.38,
       19.5,
       19.62,
       19.75,
       19.88
      ],
      "y": [
       -0.0951,
       -0.2023,
       -0.2975,
       -0.068,
       0.0221,
       0.0782,
       0.0782,
       0.074,
       -0.0022,
       -0.0073,
       -0.0521,
       -0.0596,
       0.0832,
       -0.147,
       -0.1713,
       -0.1804,
       -0.0983,
       -0.1254,
       -0.0859,
       0.0946,
       0.0984,
       0.0743,
       0.0923,
       0.0878,
       0.1092,
       0.1739,
       0.1836,
       0.1795,
       0.2514,
       0.1615,
       0.0996,
       -0.0072,
       -0.0194,
       -0.0855,
       -0.1083,
       -0.0929,
       -0.0119,
       -0.0983,
       -0.0716,
       -0.1009,
       -0.024,
       -0.0005,
       0.0694,
       0.0112,
       -0.0347,
       -0.0026,
       0.0714,
       0.0496,
       -0.0973,
       -0.1609,
       -0.1565,
       -0.0595,
       -0.0292,
       -0.0391,
       0.0308,
       0.0842,
       0.0691,
       0.1666,
       -0.0022,
       -0.0944,
       -0.059,
       0.0098,
       -0.0492,
       -0.0124,
       0.2075,
       0.1604,
       0.1194,
       0.18,
       0.0899,
       -0.0952,
       -0.0394,
       0.0445,
       0.0795,
       -0.0991,
       -0.1645,
       -0.102,
       -0.054,
       -0.069,
       -0.0372,
       -0.1157,
       0.0226,
       0.0606,
       0.0917,
       0.1338,
       0.0831,
       0.1378,
       0.1388,
       0.243,
       0.2424,
       0.3202,
       0.3301,
       0.3869,
       0.5167,
       0.5956,
       0.6011,
       0.7181,
       0.8669,
       0.9404,
       0.9386,
       0.9738,
       1.0052,
       0.968,
       0.9931,
       0.9553,
       0.9868,
       1.0423,
       1.0148,
       1.0814,
       1.3516,
       1.3454,
       1.5064,
       1.5001,
       1.72,
       1.8505,
       1.7849,
       1.9613,
       2.132,
       2.1829,
       2.2286,
       2.1828,
       2.1738,
       2.2916,
       2.3836,
       2.3431,
       2.3567,
       2.5121,
       2.6555,
       2.7691,
       2.3552,
       0.9479,
       -0.1257,
       -1.0214,
       -1.461,
       -1.8274,
       -2.1298,
       -2.3846,
       -2.3768,
       -2.3086,
       -2.5493,
       -2.3935,
       -2.379,
       -2.3874,
       -2.3333,
       -2.2677,
       -2.1834,
       -2.0772,
       -1.9908,
       -2.0721,
       -2.0713,
       -1.9302,
       -1.8639,
       -1.7927,
       -1.8343,
       -1.6781,
       -1.6691,
       -1.5441,
       -1.647,
       -1.4655,
       -1.4374,
       -1.3132
      ],
      "tip": [
       "-0.09514|EWMA · 0",
       "-0.2023|EWMA · 0.12",
       "-0.2975|EWMA · 0.25",
       "-0.06803|EWMA · 0.38",
       "0.02209|EWMA · 0.5",
       "0.07818|EWMA · 0.62",
       "0.07822|EWMA · 0.75",
       "0.07402|EWMA · 0.88",
       "-0.002152|EWMA · 1",
       "-0.007319|EWMA · 1.12",
       "-0.05211|EWMA · 1.25",
       "-0.05958|EWMA · 1.38",
       "0.08322|EWMA · 1.5",
       "-0.147|EWMA · 1.62",
       "-0.1713|EWMA · 1.75",
       "-0.1804|EWMA · 1.88",
       "-0.09828|EWMA · 2",
       "-0.1254|EWMA · 2.12",
       "-0.08588|EWMA · 2.25",
       "0.09456|EWMA · 2.38",
       "0.09835|EWMA · 2.5",
       "0.07428|EWMA · 2.62",
       "0.09234|EWMA · 2.75",
       "0.08784|EWMA · 2.88",
       "0.1092|EWMA · 3",
       "0.1739|EWMA · 3.12",
       "0.1836|EWMA · 3.25",
       "0.1795|EWMA · 3.38",
       "0.2514|EWMA · 3.5",
       "0.1615|EWMA · 3.62",
       "0.0996|EWMA · 3.75",
       "-0.007186|EWMA · 3.88",
       "-0.01941|EWMA · 4",
       "-0.08551|EWMA · 4.12",
       "-0.1083|EWMA · 4.25",
       "-0.09293|EWMA · 4.38",
       "-0.01192|EWMA · 4.5",
       "-0.09828|EWMA · 4.62",
       "-0.07165|EWMA · 4.75",
       "-0.1009|EWMA · 4.88",
       "-0.02399|EWMA · 5",
       "-0.0004783|EWMA · 5.12",
       "0.06945|EWMA · 5.25",
       "0.01116|EWMA · 5.38",
       "-0.03468|EWMA · 5.5",
       "-0.002572|EWMA · 5.62",
       "0.07137|EWMA · 5.75",
       "0.04957|EWMA · 5.88",
       "-0.09731|EWMA · 6",
       "-0.1609|EWMA · 6.12",
       "-0.1565|EWMA · 6.25",
       "-0.05947|EWMA · 6.38",
       "-0.02921|EWMA · 6.5",
       "-0.03913|EWMA · 6.62",
       "0.03078|EWMA · 6.75",
       "0.08422|EWMA · 6.88",
       "0.06906|EWMA · 7",
       "0.1666|EWMA · 7.12",
       "-0.002217|EWMA · 7.25",
       "-0.09442|EWMA · 7.38",
       "-0.05904|EWMA · 7.5",
       "0.009847|EWMA · 7.62",
       "-0.0492|EWMA · 7.75",
       "-0.01242|EWMA · 7.88",
       "0.2075|EWMA · 8",
       "0.1604|EWMA · 8.12",
       "0.1194|EWMA · 8.25",
       "0.18|EWMA · 8.38",
       "0.08986|EWMA · 8.5",
       "-0.09519|EWMA · 8.62",
       "-0.03945|EWMA · 8.75",
       "0.04453|EWMA · 8.88",
       "0.07955|EWMA · 9",
       "-0.09907|EWMA · 9.12",
       "-0.1645|EWMA · 9.25",
       "-0.102|EWMA · 9.38",
       "-0.05402|EWMA · 9.5",
       "-0.06896|EWMA · 9.62",
       "-0.03722|EWMA · 9.75",
       "-0.1157|EWMA · 9.88",
       "0.02257|EWMA · 10",
       "0.06062|EWMA · 10.12",
       "0.0917|EWMA · 10.25",
       "0.1338|EWMA · 10.38",
       "0.08313|EWMA · 10.5",
       "0.1378|EWMA · 10.62",
       "0.1388|EWMA · 10.75",
       "0.243|EWMA · 10.88",
       "0.2424|EWMA · 11",
       "0.3202|EWMA · 11.12",
       "0.3301|EWMA · 11.25",
       "0.3869|EWMA · 11.38",
       "0.5167|EWMA · 11.5",
       "0.5956|EWMA · 11.62",
       "0.6011|EWMA · 11.75",
       "0.7181|EWMA · 11.88",
       "0.8669|EWMA · 12",
       "0.9404|EWMA · 12.12",
       "0.9386|EWMA · 12.25",
       "0.9738|EWMA · 12.38",
       "1.005|EWMA · 12.5",
       "0.968|EWMA · 12.62",
       "0.9931|EWMA · 12.75",
       "0.9553|EWMA · 12.88",
       "0.9868|EWMA · 13",
       "1.042|EWMA · 13.12",
       "1.015|EWMA · 13.25",
       "1.081|EWMA · 13.38",
       "1.352|EWMA · 13.5",
       "1.345|EWMA · 13.62",
       "1.506|EWMA · 13.75",
       "1.5|EWMA · 13.88",
       "1.72|EWMA · 14",
       "1.851|EWMA · 14.12",
       "1.785|EWMA · 14.25",
       "1.961|EWMA · 14.38",
       "2.132|EWMA · 14.5",
       "2.183|EWMA · 14.62",
       "2.229|EWMA · 14.75",
       "2.183|EWMA · 14.88",
       "2.174|EWMA · 15",
       "2.292|EWMA · 15.12",
       "2.384|EWMA · 15.25",
       "2.343|EWMA · 15.38",
       "2.357|EWMA · 15.5",
       "2.512|EWMA · 15.62",
       "2.655|EWMA · 15.75",
       "2.769|EWMA · 15.88",
       "2.355|EWMA · 16",
       "0.9479|EWMA · 16.12",
       "-0.1257|EWMA · 16.25",
       "-1.021|EWMA · 16.38",
       "-1.461|EWMA · 16.5",
       "-1.827|EWMA · 16.62",
       "-2.13|EWMA · 16.75",
       "-2.385|EWMA · 16.88",
       "-2.377|EWMA · 17",
       "-2.309|EWMA · 17.12",
       "-2.549|EWMA · 17.25",
       "-2.393|EWMA · 17.38",
       "-2.379|EWMA · 17.5",
       "-2.387|EWMA · 17.62",
       "-2.333|EWMA · 17.75",
       "-2.268|EWMA · 17.88",
       "-2.183|EWMA · 18",
       "-2.077|EWMA · 18.12",
       "-1.991|EWMA · 18.25",
       "-2.072|EWMA · 18.38",
       "-2.071|EWMA · 18.5",
       "-1.93|EWMA · 18.62",
       "-1.864|EWMA · 18.75",
       "-1.793|EWMA · 18.88",
       "-1.834|EWMA · 19",
       "-1.678|EWMA · 19.12",
       "-1.669|EWMA · 19.25",
       "-1.544|EWMA · 19.38",
       "-1.647|EWMA · 19.5",
       "-1.466|EWMA · 19.62",
       "-1.437|EWMA · 19.75",
       "-1.313|EWMA · 19.88"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Day",
       "am": "ቀን"
      },
      "EWMA"
     ],
     "rows": [
      [
       0.0,
       -0.095
      ],
      [
       0.12,
       -0.202
      ],
      [
       0.25,
       -0.298
      ],
      [
       0.38,
       -0.068
      ],
      [
       0.5,
       0.022
      ],
      [
       0.62,
       0.078
      ],
      [
       0.75,
       0.078
      ],
      [
       0.88,
       0.074
      ],
      [
       1.0,
       -0.002
      ],
      [
       1.12,
       -0.007
      ],
      [
       1.25,
       -0.052
      ],
      [
       1.38,
       -0.06
      ],
      [
       1.5,
       0.083
      ],
      [
       1.62,
       -0.147
      ],
      [
       1.75,
       -0.171
      ],
      [
       1.88,
       -0.18
      ],
      [
       2.0,
       -0.098
      ],
      [
       2.12,
       -0.125
      ],
      [
       2.25,
       -0.086
      ],
      [
       2.38,
       0.095
      ],
      [
       2.5,
       0.098
      ],
      [
       2.62,
       0.074
      ],
      [
       2.75,
       0.092
      ],
      [
       2.88,
       0.088
      ],
      [
       3.0,
       0.109
      ],
      [
       3.12,
       0.174
      ],
      [
       3.25,
       0.184
      ],
      [
       3.38,
       0.18
      ],
      [
       3.5,
       0.251
      ],
      [
       3.62,
       0.161
      ],
      [
       3.75,
       0.1
      ],
      [
       3.88,
       -0.007
      ],
      [
       4.0,
       -0.019
      ],
      [
       4.12,
       -0.086
      ],
      [
       4.25,
       -0.108
      ],
      [
       4.38,
       -0.093
      ],
      [
       4.5,
       -0.012
      ],
      [
       4.62,
       -0.098
      ],
      [
       4.75,
       -0.072
      ],
      [
       4.88,
       -0.101
      ],
      [
       5.0,
       -0.024
      ],
      [
       5.12,
       -0.0
      ],
      [
       5.25,
       0.069
      ],
      [
       5.38,
       0.011
      ],
      [
       5.5,
       -0.035
      ],
      [
       5.62,
       -0.003
      ],
      [
       5.75,
       0.071
      ],
      [
       5.88,
       0.05
      ],
      [
       6.0,
       -0.097
      ],
      [
       6.12,
       -0.161
      ],
      [
       6.25,
       -0.157
      ],
      [
       6.38,
       -0.059
      ],
      [
       6.5,
       -0.029
      ],
      [
       6.62,
       -0.039
      ],
      [
       6.75,
       0.031
      ],
      [
       6.88,
       0.084
      ],
      [
       7.0,
       0.069
      ],
      [
       7.12,
       0.167
      ],
      [
       7.25,
       -0.002
      ],
      [
       7.38,
       -0.094
      ],
      [
       7.5,
       -0.059
      ],
      [
       7.62,
       0.01
      ],
      [
       7.75,
       -0.049
      ],
      [
       7.88,
       -0.012
      ],
      [
       8.0,
       0.208
      ],
      [
       8.12,
       0.16
      ],
      [
       8.25,
       0.119
      ],
      [
       8.38,
       0.18
      ],
      [
       8.5,
       0.09
      ],
      [
       8.62,
       -0.095
      ],
      [
       8.75,
       -0.039
      ],
      [
       8.88,
       0.045
      ],
      [
       9.0,
       0.08
      ],
      [
       9.12,
       -0.099
      ],
      [
       9.25,
       -0.165
      ],
      [
       9.38,
       -0.102
      ],
      [
       9.5,
       -0.054
      ],
      [
       9.62,
       -0.069
      ],
      [
       9.75,
       -0.037
      ],
      [
       9.88,
       -0.116
      ],
      [
       10.0,
       0.023
      ],
      [
       10.12,
       0.061
      ],
      [
       10.25,
       0.092
      ],
      [
       10.38,
       0.134
      ],
      [
       10.5,
       0.083
      ],
      [
       10.62,
       0.138
      ],
      [
       10.75,
       0.139
      ],
      [
       10.88,
       0.243
      ],
      [
       11.0,
       0.242
      ],
      [
       11.12,
       0.32
      ],
      [
       11.25,
       0.33
      ],
      [
       11.38,
       0.387
      ],
      [
       11.5,
       0.517
      ],
      [
       11.62,
       0.596
      ],
      [
       11.75,
       0.601
      ],
      [
       11.88,
       0.718
      ],
      [
       12.0,
       0.867
      ],
      [
       12.12,
       0.94
      ],
      [
       12.25,
       0.939
      ],
      [
       12.38,
       0.974
      ],
      [
       12.5,
       1.005
      ],
      [
       12.62,
       0.968
      ],
      [
       12.75,
       0.993
      ],
      [
       12.88,
       0.955
      ],
      [
       13.0,
       0.987
      ],
      [
       13.12,
       1.042
      ],
      [
       13.25,
       1.015
      ],
      [
       13.38,
       1.081
      ],
      [
       13.5,
       1.352
      ],
      [
       13.62,
       1.345
      ],
      [
       13.75,
       1.506
      ],
      [
       13.88,
       1.5
      ],
      [
       14.0,
       1.72
      ],
      [
       14.12,
       1.851
      ],
      [
       14.25,
       1.785
      ],
      [
       14.38,
       1.961
      ],
      [
       14.5,
       2.132
      ],
      [
       14.62,
       2.183
      ],
      [
       14.75,
       2.229
      ],
      [
       14.88,
       2.183
      ],
      [
       15.0,
       2.174
      ],
      [
       15.12,
       2.292
      ],
      [
       15.25,
       2.384
      ],
      [
       15.38,
       2.343
      ],
      [
       15.5,
       2.357
      ],
      [
       15.62,
       2.512
      ],
      [
       15.75,
       2.655
      ],
      [
       15.88,
       2.769
      ],
      [
       16.0,
       2.355
      ],
      [
       16.12,
       0.948
      ],
      [
       16.25,
       -0.126
      ],
      [
       16.38,
       -1.021
      ],
      [
       16.5,
       -1.461
      ],
      [
       16.62,
       -1.827
      ],
      [
       16.75,
       -2.13
      ],
      [
       16.88,
       -2.385
      ],
      [
       17.0,
       -2.377
      ],
      [
       17.12,
       -2.309
      ],
      [
       17.25,
       -2.549
      ],
      [
       17.38,
       -2.393
      ],
      [
       17.5,
       -2.379
      ],
      [
       17.62,
       -2.387
      ],
      [
       17.75,
       -2.333
      ],
      [
       17.88,
       -2.268
      ],
      [
       18.0,
       -2.183
      ],
      [
       18.12,
       -2.077
      ],
      [
       18.25,
       -1.991
      ],
      [
       18.38,
       -2.072
      ],
      [
       18.5,
       -2.071
      ],
      [
       18.62,
       -1.93
      ],
      [
       18.75,
       -1.864
      ],
      [
       18.88,
       -1.793
      ],
      [
       19.0,
       -1.834
      ],
      [
       19.12,
       -1.678
      ],
      [
       19.25,
       -1.669
      ],
      [
       19.38,
       -1.544
      ],
      [
       19.5,
       -1.647
      ],
      [
       19.62,
       -1.466
      ],
      [
       19.75,
       -1.437
      ],
      [
       19.88,
       -1.313
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0.35059910528102933,
      "label": {
       "en": "upper limit",
       "am": "የላይኛው ገደብ"
      }
     },
     {
      "kind": "h",
      "v": -0.36889062242385373,
      "label": {
       "en": "lower limit",
       "am": "የታችኛው ገደብ"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "The slow drift is invisible on the raw chart but the EWMA flags it after 1.2 days and CUSUM after 1.4 days.",
    "The irrigation failure is caught within hours by both.",
    "Removing the daily cycle first is essential: otherwise every afternoon would raise an alarm."
   ],
   "am": [
    "ቀርፋፋው drift በጥሬው ቻርት ላይ አይታይም፤ EWMA ግን ከ1.2 ቀናት በኋላ፣ CUSUM ከ1.4 ቀናት በኋላ ምልክት ያደርጉበታል።",
    "የመስኖ ውድቀቱ በሁለቱም በሰዓታት ውስጥ ይያዛል።",
    "መጀመሪያ የዕለት ዑደቱን ማስወገድ አስፈላጊ ነው፡ አለበለዚያ እያንዳንዱ ከሰዓት በኋላ ማንቂያ ያስነሳ ነበር።"
   ]
  },
  "decision": {
   "en": "Run both: CUSUM for slow sensor drift (send a \"recalibrate\" message) and a simple threshold on hourly change for sudden failures (send an SMS to the farmer immediately).",
   "am": "ሁለቱንም አስኪድ፡ CUSUM ለቀርፋፋ የsensor drift («እንደገና አስተካክል» መልእክት ላክ) እና ለድንገተኛ ውድቀቶች በሰዓት ለውጥ ላይ ቀላል ወሰን (ለገበሬው ወዲያውኑ SMS ላክ)።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Causal AI: who benefits most from advice?",
   "am": "Causal AI፡ ከምክር በብዛት የሚጠቀመው ማን ነው?"
  },
  "goal": {
   "en": "Use a randomised trial of SMS agronomy advice to estimate how the benefit varies between farmers (uplift modelling), and decide whom to target when budget covers only 40% of farmers.",
   "am": "የSMS የአግሮኖሚ ምክር በዘፈቀደ የተመደበ ሙከራን ተጠቅመህ ጥቅሙ በገበሬዎች መካከል እንዴት እንደሚለያይ ገምት (uplift modelling)፣ በጀቱ 40% ገበሬዎችን ብቻ ሲሸፍን ማንን እንደምታነጣጥር ወስን።"
  },
  "time": {
   "en": "2–3 weeks",
   "am": "2–3 ሳምንታት"
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
    "name": "EconML or CausalML (next step)",
    "why": {
     "en": "causal forests and meta-learners",
     "am": "causal forests እና meta-learners"
    },
    "get": "pip install econml causalml"
   }
  ],
  "steps": {
   "en": [
    "Randomise 4,000 farmers: half get advice, half do not; record yield change.",
    "T-learner: fit one model for treated and one for control; uplift = difference of predictions.",
    "Rank farmers by predicted uplift on held-out data.",
    "Compare the average gain if you target the top 40% by uplift, at random, or by farm size.",
    "Check that the ranking is real: observed treated−control gap in each uplift quintile."
   ],
   "am": [
    "4,000 ገበሬዎችን በዘፈቀደ መድብ፡ ግማሹ ምክር ያገኛሉ፣ ግማሹ አያገኙም፤ የምርት ለውጥን መዝግብ።",
    "T-learner፡ ለታከሙት አንድ ሞዴልና ለcontrol አንድ ሞዴል ግጠም፤ uplift = የትንበያዎች ልዩነት።",
    "ገበሬዎችን በተለየ ዳታ ላይ በተተነበየ uplift ደርድር።",
    "ከፍተኛዎቹን 40% በuplift፣ በዘፈቀደ ወይም በእርሻ መጠን ብታነጣጥር አማካይ ትርፉን አወዳድር።",
    "ደረጃው እውነተኛ መሆኑን ፈትሽ፡ በእያንዳንዱ የuplift quintile የታየ treated−control ክፍተት።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.ensemble import GradientBoostingRegressor\nrng = np.random.default_rng(4); n = 4000\nsize = rng.gamma(2, 0.6, n); literacy = rng.random(n) < 0.55; distance = rng.uniform(0, 20, n)\nX = np.column_stack([size, literacy, distance]); T = rng.random(n) < 0.5\neffect = 0.05 + 0.25 * literacy + 0.015 * (20 - distance) - 0.03 * size               # SMS helps literate farmers near markets\ny = 0.4 * size + effect * T + rng.normal(0, 0.35, n)\ntr, te = np.arange(n) < 2500, np.arange(n) >= 2500\ngb = lambda: GradientBoostingRegressor(n_estimators=200, max_depth=3, random_state=0)\nm1, m0 = gb().fit(X[tr & T], y[tr & T]), gb().fit(X[tr & ~T], y[tr & ~T])\nuplift = m1.predict(X[te]) - m0.predict(X[te]); true_eff = effect[te]\nk = int(0.4 * te.sum())\ngain = {\"top 40% by uplift\": true_eff[np.argsort(-uplift)[:k]].mean(), \"random 40%\": true_eff.mean(), \"largest 40% of farms\": true_eff[np.argsort(-size[te])[:k]].mean()}\nfor g, v in gain.items(): print(f\"{g:22s} average gain {v:.3f} t/ha per farmer\")\nq = np.quantile(uplift, [0.2, 0.4, 0.6, 0.8]); grp = np.digitize(uplift, q); Tt, yt = T[te], y[te]\nobserved = [yt[(grp == g) & Tt].mean() - yt[(grp == g) & ~Tt].mean() for g in range(5)]\nprint(\"observed effect by predicted-uplift quintile (low to high):\", np.round(observed, 3))",
  "out": "top 40% by uplift      average gain 0.420 t/ha per farmer\nrandom 40%             average gain 0.299 t/ha per farmer\nlargest 40% of farms   average gain 0.274 t/ha per farmer\nobserved effect by predicted-uplift quintile (low to high): [0.284 0.268 0.312 0.377 0.503]",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Average yield gain per targeted farmer (t/ha)",
     "am": "በታለመ ገበሬ አማካይ የምርት ትርፍ (t/ha)"
    },
    "x": {
     "label": "t/ha"
    },
    "fmt": 3,
    "cats": [
     "top 40% by uplift",
     "random 40%",
     "largest 40% of farms"
    ],
    "series": [
     {
      "name": {
       "en": "t/ha",
       "am": "t/ha"
      },
      "slot": 1,
      "v": [
       0.42,
       0.299,
       0.274
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
       "en": "t/ha",
       "am": "t/ha"
      }
     ],
     "rows": [
      [
       "top 40% by uplift",
       0.42
      ],
      [
       "random 40%",
       0.299
      ],
      [
       "largest 40% of farms",
       0.274
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Observed effect in the trial by predicted-uplift group",
     "am": "በተተነበየ-uplift ቡድን በሙከራው ውስጥ የታየ ውጤት"
    },
    "x": {
     "label": {
      "en": "Uplift quintile (1 = lowest)",
      "am": "Uplift quintile (1 = ዝቅተኛ)"
     },
     "int": true
    },
    "y": {
     "label": "t/ha"
    },
    "series": [
     {
      "name": {
       "en": "Treated − control (t/ha)",
       "am": "የታከሙ − control (t/ha)"
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
       0.2836,
       0.2676,
       0.3119,
       0.3771,
       0.5029
      ],
      "tip": [
       "0.2836|Treated − control (t/ha) · 1",
       "0.2676|Treated − control (t/ha) · 2",
       "0.3119|Treated − control (t/ha) · 3",
       "0.3771|Treated − control (t/ha) · 4",
       "0.5029|Treated − control (t/ha) · 5"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Uplift quintile (1 = lowest)",
       "am": "Uplift quintile (1 = ዝቅተኛ)"
      },
      {
       "en": "Treated − control (t/ha)",
       "am": "የታከሙ − control (t/ha)"
      }
     ],
     "rows": [
      [
       1.0,
       0.284
      ],
      [
       2.0,
       0.268
      ],
      [
       3.0,
       0.312
      ],
      [
       4.0,
       0.377
      ],
      [
       5.0,
       0.503
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Targeting the 40% with the highest predicted uplift gives 0.420 t/ha per farmer, against 0.299 at random.",
    "Targeting the largest farms gives only 0.274: the farmers who benefit most are not the obvious ones.",
    "The observed treated−control gap rises across predicted-uplift groups, so the model’s ranking holds in the randomised data."
   ],
   "am": [
    "ከፍተኛ የተተነበየ uplift ያላቸውን 40% ማነጣጠር በገበሬ 0.420 t/ha ይሰጣል፤ በዘፈቀደ 0.299።",
    "ትላልቆቹን እርሻዎች ማነጣጠር 0.274 ብቻ ይሰጣል፡ በብዛት የሚጠቀሙት ገበሬዎች ግልጽ የሆኑት አይደሉም።",
    "የታየው የታከሙ−control ክፍተት በተተነበየ-uplift ቡድኖች ላይ ይጨምራል፤ ስለዚህ የሞዴሉ ደረጃ በዘፈቀደ ዳታው ውስጥ ይዘልቃል።"
   ]
  },
  "decision": {
   "en": "Send SMS advice to the 40% with the highest predicted uplift, offer voice messages to farmers who cannot read, and keep a small random control group every season to re-check the targeting.",
   "am": "የSMS ምክርን ከፍተኛ የተተነበየ uplift ላላቸው 40% ላክ፣ ማንበብ ለማይችሉ ገበሬዎች የድምፅ መልእክቶችን አቅርብ፣ ማነጣጠሩን እንደገና ለመፈተሽ በየወቅቱ ትንሽ የዘፈቀደ control ቡድን አቆይ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 }
];
