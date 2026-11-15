/* Practical labs, track c, level 6. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[6] = [
 {
  "title": {
   "en": "Causal effect of improved forage on milk yield",
   "am": "የተሻሻለ መኖ በወተት ምርት ላይ ያለው causal ውጤት"
  },
  "goal": {
   "en": "Estimate how much improved forage really raises milk yield from observational farm records, where better-off farms adopt forage more often, and compare a naive estimate with adjusted ones.",
   "am": "የተሻለ ኑሮ ያላቸው እርሻዎች መኖን በብዛት በሚቀበሉበት የምልከታ የእርሻ መዝገቦች ውስጥ የተሻሻለ መኖ የወተት ምርትን በእውነት ምን ያህል እንደሚያሳድግ ገምት፤ ቀላል ግምትን ከተስተካከሉ ጋር አወዳድር።"
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
    "Draw the causal diagram: herd size and crossbred cows affect both forage adoption and milk.",
    "Naive estimate: difference in mean milk between adopters and non-adopters.",
    "Regression adjustment: regress milk on forage plus the confounders.",
    "Inverse probability weighting: model the chance of adopting, then reweight farms.",
    "Bootstrap 95% intervals for every estimate and compare them."
   ],
   "am": [
    "የcausal ንድፉን ሣል፡ የመንጋ መጠንና ድቅል ላሞች በመኖ መቀበልም በወተትም ላይ ተጽዕኖ ያደርጋሉ።",
    "ቀላል ግምት፡ በተቀባዮችና ባልተቀበሉ መካከል ያለ የአማካይ ወተት ልዩነት።",
    "Regression adjustment፡ ወተትን በመኖና በconfounders ላይ regress አድርግ።",
    "Inverse probability weighting፡ የመቀበል ዕድሉን ሞዴል አድርግ፣ ከዚያ እርሻዎችን እንደገና ክብደት ስጥ።",
    "ለእያንዳንዱ ግምት 95% ክልሎችን በbootstrap አስላና አወዳድራቸው።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.linear_model import LinearRegression, LogisticRegression\nrng = np.random.default_rng(4); n = 800\nherd = rng.poisson(4, n) + 1; cross = rng.random(n) < 0.35                     # confounders\np_adopt = 1 / (1 + np.exp(-(-2.2 + 0.25 * herd + 1.4 * cross)))\nforage = rng.random(n) < p_adopt\nmilk = 4 + 0.3 * herd + 3.0 * cross + 1.5 * forage + rng.normal(0, 1.5, n)     # true effect: +1.5 litres per cow per day\nZ = np.column_stack([herd, cross])\ndef naive(i): return milk[i][forage[i]].mean() - milk[i][~forage[i]].mean()\ndef regression(i): return LinearRegression().fit(np.column_stack([forage[i], Z[i]]), milk[i]).coef_[0]\ndef ipw(i):\n    e = LogisticRegression().fit(Z[i], forage[i]).predict_proba(Z[i])[:, 1]; f, m = forage[i], milk[i]\n    return np.sum(f * m / e) / np.sum(f / e) - np.sum((1 - f) * m / (1 - e)) / np.sum((1 - f) / (1 - e))\nest = {}\nfor name, fn in [(\"naive difference\", naive), (\"regression adjustment\", regression), (\"inverse probability weighting\", ipw)]:\n    boots = [fn(rng.integers(0, n, n)) for _ in range(500)]\n    est[name] = (fn(np.arange(n)), *np.percentile(boots, [2.5, 97.5]))\n    print(f\"{name:30s} {est[name][0]:.2f} L/day (95% CI {est[name][1]:.2f} to {est[name][2]:.2f})\")\nprint(f\"adopters: {forage.mean():.0%}; crossbred among adopters {cross[forage].mean():.0%} vs {cross[~forage].mean():.0%}\")",
  "out": "naive difference               2.50 L/day (95% CI 2.19 to 2.81)\nregression adjustment          1.46 L/day (95% CI 1.24 to 1.67)\ninverse probability weighting  1.46 L/day (95% CI 1.22 to 1.65)\nadopters: 41%; crossbred among adopters 54% vs 28%",
  "lang": "Python",
  "viz": [
   {
    "type": "dot",
    "title": {
     "en": "Estimated effect of forage on milk (litres per cow per day)",
     "am": "የመኖ በወተት ላይ የተገመተ ውጤት (በላም በቀን ሊትር)"
    },
    "x": {
     "label": {
      "en": "Litres per cow per day",
      "am": "በላም በቀን ሊትር"
     }
    },
    "cats": [
     {
      "en": "Naive difference",
      "am": "ቀላል ልዩነት"
     },
     {
      "en": "Regression adjustment",
      "am": "Regression adjustment"
     },
     {
      "en": "Inverse probability weighting",
      "am": "Inverse probability weighting"
     }
    ],
    "ref0": true,
    "series": [
     {
      "name": {
       "en": "Estimate with 95% interval",
       "am": "ግምት ከ95% ክልል ጋር"
      },
      "slot": 1,
      "v": [
       2.499,
       1.457,
       1.459
      ],
      "lo": [
       2.195,
       1.236,
       1.22
      ],
      "hi": [
       2.812,
       1.67,
       1.649
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
        "en": "Naive difference",
        "am": "ቀላል ልዩነት"
       },
       2.499,
       2.195,
       2.812
      ],
      [
       {
        "en": "Regression adjustment",
        "am": "Regression adjustment"
       },
       1.457,
       1.236,
       1.67
      ],
      [
       {
        "en": "Inverse probability weighting",
        "am": "Inverse probability weighting"
       },
       1.459,
       1.22,
       1.649
      ]
     ]
    },
    "note": {
     "en": "The true effect in this simulation is 1.5 litres.",
     "am": "በዚህ ማስመሰል ውስጥ ያለው እውነተኛ ውጤት 1.5 ሊትር ነው።"
    }
   }
  ],
  "analysis": {
   "en": [
    "The naive difference says 2.50 litres, more than the true 1.5: adopters already had more crossbred cows (54% vs 28%).",
    "Adjusting for herd size and breed brings the estimate to 1.46 (regression) and 1.46 (weighting); both intervals contain 1.5.",
    "Adjustment only removes confounders you measured; an unmeasured one (for example farmer skill) would still bias the result."
   ],
   "am": [
    "ቀላሉ ልዩነት 2.50 ሊትር ይላል፣ ከእውነተኛው 1.5 በላይ፡ ተቀባዮች አስቀድመው ብዙ ድቅል ላሞች ነበሯቸው (54% vs 28%)።",
    "ለመንጋ መጠንና ለዝርያ ማስተካከል ግምቱን ወደ 1.46 (regression) እና 1.46 (weighting) ያመጣዋል፤ ሁለቱም ክልሎች 1.5ን ይይዛሉ።",
    "ማስተካከል የለካሃቸውን confounders ብቻ ያስወግዳል፤ ያልተለካ (ለምሳሌ የገበሬ ክህሎት) አሁንም ውጤቱን ያዛባዋል።"
   ]
  },
  "decision": {
   "en": "Report the adjusted effect (about 1.5 L/day) with its interval, not the naive one; to settle it, run a randomised forage trial on 40 farms.",
   "am": "ቀላሉን ሳይሆን የተስተካከለውን ውጤት (ወደ 1.5 L/ቀን) ከክልሉ ጋር ዘግብ፤ ለማረጋገጥ በ40 እርሻዎች ላይ በዘፈቀደ የተመደበ የመኖ ሙከራ አካሂድ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "A neural language model for Amharic vs n-gram baselines",
   "am": "ለአማርኛ neural የቋንቋ ሞዴል vs n-gram መነሻዎች"
  },
  "goal": {
   "en": "Train character-level models on Amharic text, measure perplexity on held-out text as the training data grow, and decide how much data a neural model needs before it pays off.",
   "am": "በአማርኛ ጽሑፍ ላይ የፊደል-ደረጃ ሞዴሎችን አሰልጥን፣ የሥልጠና ዳታ ሲያድግ በተለየ ጽሑፍ ላይ perplexityን ለካ፣ neural ሞዴል ከመዋጣቱ በፊት ምን ያህል ዳታ እንደሚያስፈልገው ወስን።"
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
    "name": "scikit-learn",
    "why": {
     "en": "machine-learning models and evaluation",
     "am": "የmachine-learning ሞዴሎችና ግምገማ"
    },
    "get": "pip install scikit-learn"
   },
   {
    "name": "PyTorch (next step)",
    "why": {
     "en": "train a real transformer",
     "am": "እውነተኛ transformer ማሰልጠን"
    },
    "get": "pytorch.org"
   },
   {
    "name": "A GPU (optional)",
    "why": {
     "en": "faster training for larger models",
     "am": "ለትላልቅ ሞዴሎች ፈጣን ሥልጠና"
    },
    "get": "free notebooks such as Google Colab or Kaggle"
   }
  ],
  "steps": {
   "en": [
    "Load the corpus and keep Ethiopic letters, spaces and Ethiopic punctuation.",
    "Hold out the first 20,000 letters as a test set.",
    "Count n-grams (orders 2–4) with add-k smoothing.",
    "Train a small neural network that predicts the next letter from the previous 3.",
    "Compare perplexity (lower is better) at 10k, 40k and 120k training letters."
   ],
   "am": [
    "corpusኡን ጫንና የግዕዝ ፊደላትን፣ ክፍተቶችንና የግዕዝ ሥርዓተ ነጥቦችን አቆይ።",
    "የመጀመሪያዎቹን 20,000 ፊደላት እንደ የፈተና ስብስብ ለይ።",
    "n-gramsን (ደረጃዎች 2–4) በadd-k smoothing ቁጠር።",
    "ከቀደሙት 3 ፊደላት ቀጣዩን ፊደል የሚተነብይ ትንሽ neural network አሰልጥን።",
    "perplexityን (ዝቅተኛ የተሻለ ነው) በ10k፣ 40k እና 120k የሥልጠና ፊደላት አወዳድር።"
   ]
  },
  "code": "import numpy as np, math, warnings\nfrom collections import Counter, defaultdict\nfrom sklearn.neural_network import MLPClassifier\nwarnings.filterwarnings(\"ignore\")\ntext = open(\"am_corpus.txt\", encoding=\"utf-8\").read()\ntext = \"\".join(ch for ch in text if \"\\u1200\" <= ch <= \"\\u137f\" or ch in \" \\n።፣\")\ntest, pool = text[:20000], text[20000:]\nvocab = sorted(set(text)); idx = {c: i for i, c in enumerate(vocab)}; V = len(vocab)\ndef ngram_ppl(train, n, k=0.1):\n    counts = defaultdict(Counter)\n    for i in range(n - 1, len(train)): counts[train[i - n + 1:i]][train[i]] += 1\n    nll = 0.0\n    for i in range(n - 1, len(test)):\n        c = counts.get(test[i - n + 1:i], Counter()); nll -= math.log((c[test[i]] + k) / (sum(c.values()) + k * V))\n    return math.exp(nll / (len(test) - n + 1))\nCTX = 3\ndef onehot(s):\n    X = np.zeros((len(s) - CTX, CTX * V), np.float32)\n    for i in range(CTX, len(s)):\n        for j in range(CTX): X[i - CTX, j * V + idx[s[i - CTX + j]]] = 1\n    return X, np.array([idx[c] for c in s[CTX:]])\nXte, yte = onehot(test); sizes = [10000, 40000, 120000]; ppl = {\"bigram\": [], \"trigram\": [], \"4-gram\": [], \"neural (3 letters)\": []}\nfor size in sizes:\n    tr = pool[:size]\n    for name, n in [(\"bigram\", 2), (\"trigram\", 3), (\"4-gram\", 4)]: ppl[name].append(ngram_ppl(tr, n))\n    m = MLPClassifier((128,), max_iter=30, early_stopping=True, random_state=0, batch_size=256).fit(*onehot(tr))\n    P = np.full((len(yte), V), 1e-6); P[:, m.classes_] += m.predict_proba(Xte); P /= P.sum(1, keepdims=True)\n    ppl[\"neural (3 letters)\"].append(math.exp(-np.mean(np.log(P[np.arange(len(yte)), yte]))))\nprint(f\"{len(text):,} letters, {V} different characters\")\nfor k, v in ppl.items(): print(f\"{k:20s}\", [round(x, 1) for x in v])",
  "out": "141,138 letters, 214 different characters\nbigram               [29.8, 22.6, 20.7]\ntrigram              [39.7, 19.0, 12.4]\n4-gram               [74.5, 36.5, 19.2]\nneural (3 letters)   [23.0, 14.0, 10.0]",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Perplexity on held-out Amharic (lower is better)",
     "am": "በተለየ የአማርኛ ጽሑፍ ላይ perplexity (ዝቅተኛ የተሻለ ነው)"
    },
    "x": {
     "label": {
      "en": "Training letters (thousands)",
      "am": "የሥልጠና ፊደላት (በሺዎች)"
     },
     "int": true
    },
    "y": {
     "label": "Perplexity",
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "bigram",
       "am": "bigram"
      },
      "slot": 0,
      "kind": "line",
      "markers": true,
      "x": [
       10.0,
       40.0,
       120.0
      ],
      "y": [
       29.7599,
       22.6015,
       20.6859
      ],
      "tip": [
       "29.76|bigram · 10",
       "22.6|bigram · 40",
       "20.69|bigram · 120"
      ],
      "endlabel": {
       "en": "bigram",
       "am": "bigram"
      }
     },
     {
      "name": {
       "en": "trigram",
       "am": "trigram"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       10.0,
       40.0,
       120.0
      ],
      "y": [
       39.7457,
       19.0185,
       12.4333
      ],
      "tip": [
       "39.75|trigram · 10",
       "19.02|trigram · 40",
       "12.43|trigram · 120"
      ],
      "endlabel": {
       "en": "trigram",
       "am": "trigram"
      }
     },
     {
      "name": {
       "en": "4-gram",
       "am": "4-gram"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       10.0,
       40.0,
       120.0
      ],
      "y": [
       74.5281,
       36.5133,
       19.1853
      ],
      "tip": [
       "74.53|4-gram · 10",
       "36.51|4-gram · 40",
       "19.19|4-gram · 120"
      ],
      "endlabel": {
       "en": "4-gram",
       "am": "4-gram"
      }
     },
     {
      "name": {
       "en": "neural (3 letters)",
       "am": "neural (3 letters)"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       10.0,
       40.0,
       120.0
      ],
      "y": [
       22.9846,
       13.9835,
       10.0494
      ],
      "tip": [
       "22.98|neural (3 letters) · 10",
       "13.98|neural (3 letters) · 40",
       "10.05|neural (3 letters) · 120"
      ],
      "endlabel": {
       "en": "neural (3 letters)",
       "am": "neural (3 letters)"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Training letters (thousands)",
       "am": "የሥልጠና ፊደላት (በሺዎች)"
      },
      {
       "en": "bigram",
       "am": "bigram"
      },
      {
       "en": "trigram",
       "am": "trigram"
      },
      {
       "en": "4-gram",
       "am": "4-gram"
      },
      {
       "en": "neural (3 letters)",
       "am": "neural (3 letters)"
      }
     ],
     "rows": [
      [
       10.0,
       29.76,
       39.746,
       74.528,
       22.985
      ],
      [
       40.0,
       22.602,
       19.018,
       36.513,
       13.984
      ],
      [
       120.0,
       20.686,
       12.433,
       19.185,
       10.049
      ]
     ]
    },
    "rpad": 130
   }
  ],
  "analysis": {
   "en": [
    "With 10,000 letters the 4-gram is worst (75): it has seen too few of its long contexts.",
    "The neural model is best at every size and reaches 10.0 with 120,000 letters, against 12.4 for the best n-gram.",
    "It wins because it shares what it learns between similar contexts instead of counting each one separately."
   ],
   "am": [
    "በ10,000 ፊደላት 4-gram በጣም መጥፎ ነው (75)፡ ረጃጅም አውዶቹን በጣም ጥቂት አይቷል።",
    "neural ሞዴሉ በእያንዳንዱ መጠን ምርጥ ሲሆን በ120,000 ፊደላት 10.0 ይደርሳል፤ ምርጡ n-gram 12.4 ነው።",
    "የሚያሸንፈው እያንዳንዱን አውድ ለየብቻ ከመቁጠር ይልቅ በተመሳሳይ አውዶች መካከል የሚማረውን ስለሚያጋራ ነው።"
   ]
  },
  "decision": {
   "en": "Use a neural model (next: a small transformer in PyTorch with a longer context) and invest first in more clean Amharic text: perplexity is still falling steeply at 120,000 letters.",
   "am": "neural ሞዴል ተጠቀም (ቀጥሎ፡ ረዘም ያለ አውድ ያለው ትንሽ transformer በPyTorch)፤ መጀመሪያ ግን ተጨማሪ ንጹሕ የአማርኛ ጽሑፍ ላይ ኢንቨስት አድርግ፡ perplexity በ120,000 ፊደላት አሁንም በፍጥነት እየወረደ ነው።"
  },
  "note": {
   "en": "The corpus files are in the repository under tools/data/ (am_corpus.txt, en_corpus.txt): the Amharic and English text of this app, about 140,000 Amharic letters. For real work use larger open corpora, for example news sites, Wikipedia and Masakhane datasets, with their licences.",
   "am": "የcorpus ፋይሎቹ በማከማቻው ውስጥ በtools/data/ ሥር ናቸው (am_corpus.txt፣ en_corpus.txt)፡ የዚህ መተግበሪያ የአማርኛና የእንግሊዝኛ ጽሑፍ፣ ወደ 140,000 የአማርኛ ፊደላት። ለእውነተኛ ሥራ ትላልቅ ክፍት corporaን ከፈቃዶቻቸው ጋር ተጠቀም፤ ለምሳሌ የዜና ድረ-ገጾች፣ ዊኪፔዲያ እና የMasakhane ዳታሴቶች።"
  }
 },
 {
  "title": {
   "en": "Reinforcement learning for irrigation with limited water",
   "am": "በውሱን ውሃ ለመስኖ reinforcement learning"
  },
  "goal": {
   "en": "Train a Q-learning agent to decide each day whether to irrigate, with 6 waterings for a 40-day season and random rain, and compare it with the rules farmers use.",
   "am": "ለ40-ቀን ወቅት 6 ውሃ ማጠጣቶችና የዘፈቀደ ዝናብ ባሉበት በየቀኑ መስኖ ማጠጣት እንዳለበት የሚወስን Q-learning agent አሰልጥን፤ ገበሬዎች ከሚጠቀሙባቸው ሕጎች ጋር አወዳድረው።"
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
    "name": "matplotlib",
    "why": {
     "en": "draw charts to include in your report",
     "am": "በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል"
    },
    "get": "pip install matplotlib"
   },
   {
    "name": "Gymnasium (next step)",
    "why": {
     "en": "standard RL environments and agents",
     "am": "መደበኛ የRL አካባቢዎችና agents"
    },
    "get": "pip install gymnasium"
   }
  ],
  "steps": {
   "en": [
    "Build the simulator: soil moisture 0–10, daily drying, random rain, growth is best at moisture 4–8.",
    "State = (moisture, waterings left, season phase); actions = irrigate or not.",
    "Train Q-learning for 30,000 seasons with ε-greedy exploration.",
    "Every 1,000 seasons, test the greedy policy on 300 fresh seasons.",
    "Compare with \"never\", \"irrigate when moisture < 3\" and \"< 4\" on 3,000 seasons."
   ],
   "am": [
    "አስመሳዩን ገንባ፡ የአፈር እርጥበት 0–10፣ ዕለታዊ መድረቅ፣ የዘፈቀደ ዝናብ፣ እድገት በእርጥበት 4–8 ምርጥ ነው።",
    "State = (እርጥበት፣ የቀሩ ማጠጣቶች፣ የወቅት ምዕራፍ)፤ actions = ማጠጣት ወይም አለማጠጣት።",
    "Q-learningን ለ30,000 ወቅቶች በε-greedy ፍለጋ አሰልጥን።",
    "በየ1,000 ወቅቶች greedy ፖሊሲውን በ300 አዲስ ወቅቶች ፈትሽ።",
    "ከ«በፍጹም»፣ «እርጥበት < 3 ሲሆን አጠጣ» እና «< 4» ጋር በ3,000 ወቅቶች አወዳድር።"
   ]
  },
  "code": "import numpy as np\nDAYS, WATER = 40, 6\ndef step(m, a, rng):\n    rain = rng.choice([0, 0, 0, 0, 1, 2, 4], p=[.35, .15, .1, .1, .15, .1, .05])\n    m = min(10, max(0, m - 1 + rain + (3 if a else 0)))\n    return m, (1.0 if 4 <= m <= 8 else 0.5 if m in (2, 3, 9) else 0.0)     # growth units per day\ndef season(policy, rng):\n    m, w, total = 6, WATER, 0.0\n    for d in range(DAYS):\n        a = bool(policy(m, w, d)) and w > 0; w -= a; m, g = step(m, a, rng); total += g\n    return total\nphase = lambda d: min(3, d // 10)\nQ = np.zeros((11, WATER + 1, 4, 2)); rng = np.random.default_rng(0); curve = []; eps = 0.2\nfor ep in range(30000):\n    m, w = 6, WATER\n    for d in range(DAYS):\n        s = (m, w, phase(d)); a = 0 if w == 0 else (rng.integers(2) if rng.random() < eps else int(np.argmax(Q[s])))\n        m2, g = step(m, a, rng); w2 = w - a\n        target = g + (0 if d == DAYS - 1 else 0.98 * Q[m2, w2, phase(d + 1)].max())\n        Q[s + (a,)] += 0.1 * (target - Q[s + (a,)]); m, w = m2, w2\n    eps = max(0.02, eps * 0.9999)\n    if ep % 1000 == 999:\n        r2 = np.random.default_rng(99); curve.append(np.mean([season(lambda m, w, d: Q[m, w, phase(d)].argmax(), r2) for _ in range(300)]))\npolicies = {\"never irrigate\": lambda m, w, d: False, \"rule: moisture < 3\": lambda m, w, d: m < 3,\n            \"rule: moisture < 4\": lambda m, w, d: m < 4, \"RL agent\": lambda m, w, d: Q[m, w, phase(d)].argmax()}\nscore = {}\nfor k, p in policies.items():\n    r2 = np.random.default_rng(7); score[k] = np.mean([season(p, r2) for _ in range(3000)]); print(f\"{k:20s} {score[k]:.1f} growth units (max 40)\")",
  "out": "never irrigate       11.7 growth units (max 40)\nrule: moisture < 3   30.9 growth units (max 40)\nrule: moisture < 4   33.9 growth units (max 40)\nRL agent             35.1 growth units (max 40)",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Learning curve: RL agent on fresh seasons",
     "am": "የመማሪያ ኩርባ፡ RL agent በአዲስ ወቅቶች"
    },
    "x": {
     "label": {
      "en": "Training seasons",
      "am": "የሥልጠና ወቅቶች"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Growth units per season",
      "am": "በወቅት የእድገት አሃዶች"
     }
    },
    "series": [
     {
      "name": {
       "en": "RL agent",
       "am": "RL agent"
      },
      "slot": 1,
      "kind": "line",
      "markers": false,
      "x": [
       1000.0,
       2000.0,
       3000.0,
       4000.0,
       5000.0,
       6000.0,
       7000.0,
       8000.0,
       9000.0,
       10000.0,
       11000.0,
       12000.0,
       13000.0,
       14000.0,
       15000.0,
       16000.0,
       17000.0,
       18000.0,
       19000.0,
       20000.0,
       21000.0,
       22000.0,
       23000.0,
       24000.0,
       25000.0,
       26000.0,
       27000.0,
       28000.0,
       29000.0,
       30000.0
      ],
      "y": [
       33.495,
       32.7733,
       32.945,
       33.295,
       33.24,
       33.585,
       33.1483,
       33.6067,
       34.03,
       33.735,
       33.5617,
       34.5183,
       34.2833,
       33.8733,
       34.5467,
       34.7717,
       34.5183,
       34.3833,
       34.6167,
       34.69,
       34.2833,
       34.45,
       34.2433,
       34.5633,
       34.3533,
       34.3467,
       34.695,
       34.56,
       34.62,
       35.0233
      ],
      "tip": [
       "33.49|RL agent · 1000",
       "32.77|RL agent · 2000",
       "32.95|RL agent · 3000",
       "33.3|RL agent · 4000",
       "33.24|RL agent · 5000",
       "33.59|RL agent · 6000",
       "33.15|RL agent · 7000",
       "33.61|RL agent · 8000",
       "34.03|RL agent · 9000",
       "33.73|RL agent · 10000",
       "33.56|RL agent · 11000",
       "34.52|RL agent · 12000",
       "34.28|RL agent · 13000",
       "33.87|RL agent · 14000",
       "34.55|RL agent · 15000",
       "34.77|RL agent · 16000",
       "34.52|RL agent · 17000",
       "34.38|RL agent · 18000",
       "34.62|RL agent · 19000",
       "34.69|RL agent · 20000",
       "34.28|RL agent · 21000",
       "34.45|RL agent · 22000",
       "34.24|RL agent · 23000",
       "34.56|RL agent · 24000",
       "34.35|RL agent · 25000",
       "34.35|RL agent · 26000",
       "34.7|RL agent · 27000",
       "34.56|RL agent · 28000",
       "34.62|RL agent · 29000",
       "35.02|RL agent · 30000"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Training seasons",
       "am": "የሥልጠና ወቅቶች"
      },
      {
       "en": "RL agent",
       "am": "RL agent"
      }
     ],
     "rows": [
      [
       1000.0,
       33.495
      ],
      [
       2000.0,
       32.773
      ],
      [
       3000.0,
       32.945
      ],
      [
       4000.0,
       33.295
      ],
      [
       5000.0,
       33.24
      ],
      [
       6000.0,
       33.585
      ],
      [
       7000.0,
       33.148
      ],
      [
       8000.0,
       33.607
      ],
      [
       9000.0,
       34.03
      ],
      [
       10000.0,
       33.735
      ],
      [
       11000.0,
       33.562
      ],
      [
       12000.0,
       34.518
      ],
      [
       13000.0,
       34.283
      ],
      [
       14000.0,
       33.873
      ],
      [
       15000.0,
       34.547
      ],
      [
       16000.0,
       34.772
      ],
      [
       17000.0,
       34.518
      ],
      [
       18000.0,
       34.383
      ],
      [
       19000.0,
       34.617
      ],
      [
       20000.0,
       34.69
      ],
      [
       21000.0,
       34.283
      ],
      [
       22000.0,
       34.45
      ],
      [
       23000.0,
       34.243
      ],
      [
       24000.0,
       34.563
      ],
      [
       25000.0,
       34.353
      ],
      [
       26000.0,
       34.347
      ],
      [
       27000.0,
       34.695
      ],
      [
       28000.0,
       34.56
      ],
      [
       29000.0,
       34.62
      ],
      [
       30000.0,
       35.023
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 30.853,
      "label": {
       "en": "rule < 3",
       "am": "ሕግ < 3"
      }
     },
     {
      "kind": "h",
      "v": 33.85316666666667,
      "label": {
       "en": "rule < 4",
       "am": "ሕግ < 4"
      }
     }
    ]
   },
   {
    "type": "hbar",
    "title": {
     "en": "Average growth over 3,000 test seasons",
     "am": "በ3,000 የፈተና ወቅቶች አማካይ እድገት"
    },
    "x": {
     "label": {
      "en": "Growth units (max 40)",
      "am": "የእድገት አሃዶች (ከፍተኛ 40)"
     }
    },
    "fmt": 1,
    "cats": [
     "never irrigate",
     "rule: moisture < 3",
     "rule: moisture < 4",
     "RL agent"
    ],
    "series": [
     {
      "name": {
       "en": "Growth units",
       "am": "የእድገት አሃዶች"
      },
      "slot": 1,
      "v": [
       11.7,
       30.9,
       33.9,
       35.1
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
       "en": "Growth units",
       "am": "የእድገት አሃዶች"
      }
     ],
     "rows": [
      [
       "never irrigate",
       11.7
      ],
      [
       "rule: moisture < 3",
       30.9
      ],
      [
       "rule: moisture < 4",
       33.9
      ],
      [
       "RL agent",
       35.1
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Without irrigation the crop reaches only 11.7 of 40 growth units.",
    "The RL agent (35.1) beats the common rule “irrigate below 3” (30.9).",
    "A better tuned rule, “below 4”, gets 33.9: the agent adds only 1.3 more units (4%)."
   ],
   "am": [
    "ያለ መስኖ ሰብሉ ከ40 የእድገት አሃዶች 11.7 ብቻ ይደርሳል።",
    "RL agentኡ (35.1) የተለመደውን «ከ3 በታች አጠጣ» ሕግ (30.9) ያሸንፋል።",
    "የተሻለ የተስተካከለ ሕግ፣ «ከ4 በታች»፣ 33.9 ያገኛል፡ agentኡ የሚጨምረው 1.3 አሃዶች ብቻ ነው (4%)።"
   ]
  },
  "decision": {
   "en": "Advise farmers to irrigate when the soil reaches moisture level 4: a simple, explainable rule that captures most of the gain. Use the RL agent where it adds more: weather forecasts, several fields, or water prices.",
   "am": "ገበሬዎች አፈሩ የእርጥበት ደረጃ 4 ላይ ሲደርስ እንዲያጠጡ ምከር፡ አብዛኛውን ትርፍ የሚይዝ ቀላልና ሊብራራ የሚችል ሕግ። RL agentኡን የበለጠ በሚጨምርበት ቦታ ተጠቀም፡ የአየር ትንበያዎች፣ በርካታ ማሳዎች ወይም የውሃ ዋጋዎች።"
  },
  "note": {
   "en": "A simplified simulator; check any rule in a field trial before advising farmers.",
   "am": "ቀለል ያለ አስመሳይ፤ ገበሬዎችን ከመምከርህ በፊት ማንኛውንም ሕግ በመስክ ሙከራ ፈትሽ።"
  }
 },
 {
  "title": {
   "en": "A reproducible pipeline that only reruns what changed",
   "am": "የተለወጠውን ብቻ እንደገና የሚያስኪድ ተደጋጋሚ pipeline"
  },
  "goal": {
   "en": "Build a small analysis pipeline with file fingerprints (the idea behind Snakemake and Nextflow), and measure the time saved when nothing or only one input changes.",
   "am": "በፋይል የጣት አሻራዎች (ከSnakemake እና Nextflow ጀርባ ያለው ሐሳብ) ትንሽ የትንተና pipeline ገንባ፤ ምንም ሳይለወጥ ወይም አንድ ግብዓት ብቻ ሲለወጥ የሚቆጠበውን ጊዜ ለካ።"
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
    "name": "Snakemake or Nextflow",
    "why": {
     "en": "the same idea at full scale, on laptop and HPC",
     "am": "ያው ሐሳብ በሙሉ መጠን፣ በላፕቶፕና በHPC"
    },
    "get": "pip install snakemake; nextflow.io"
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
    "Write 4 regions × 3 steps: clean → summarise → model, plus a final report.",
    "Give each step its inputs; store a hash of the inputs next to each output.",
    "Run 1: everything runs. Run 2: nothing changed. Run 3: change one region’s raw data.",
    "Record which steps ran and the time.",
    "Keep the pipeline under Git so every result can be traced to code and data."
   ],
   "am": [
    "4 ክልሎች × 3 እርምጃዎች ጻፍ፡ ማጽዳት → ማጠቃለል → ሞዴል፣ እንዲሁም የመጨረሻ ሪፖርት።",
    "ለእያንዳንዱ እርምጃ ግብዓቶቹን ስጥ፤ ከእያንዳንዱ ውጤት አጠገብ የግብዓቶቹን hash አስቀምጥ።",
    "ሩጫ 1፡ ሁሉም ይሠራል። ሩጫ 2፡ ምንም አልተለወጠም። ሩጫ 3፡ የአንድ ክልልን ጥሬ ዳታ ቀይር።",
    "የትኞቹ እርምጃዎች እንደሠሩና ጊዜውን መዝግብ።",
    "እያንዳንዱ ውጤት ወደ ኮድና ዳታ እንዲከታተል pipelineኡን በGit ሥር አቆይ።"
   ]
  },
  "code": "import hashlib, json, os, time, numpy as np\nregions = [\"Amhara\", \"Oromia\", \"Sidama\", \"Tigray\"]\ndef fingerprint(paths): return hashlib.sha256(b\"\".join(open(p, \"rb\").read() for p in paths)).hexdigest()\ndef task(name, inputs, output, fn, log):\n    h = fingerprint(inputs); stamp = output + \".hash\"\n    if os.path.exists(output) and os.path.exists(stamp) and open(stamp).read() == h: return\n    fn(inputs, output); open(stamp, \"w\").write(h); log.append(name)\ndef heavy(inp, out):                                   # stands in for real work (alignment, model fitting)\n    x = np.resize(np.concatenate([np.load(p) for p in inp]), 400); s = 0.0\n    for _ in range(15): s += float(np.linalg.svd(np.outer(x, x) + np.eye(400), compute_uv=False)[0])\n    np.save(out, np.array([x.mean(), x.std(), s]))\ndef run():\n    log, t = [], time.perf_counter()\n    for r in regions:\n        task(f\"clean {r}\", [f\"raw_{r}.npy\"], f\"clean_{r}.npy\", heavy, log)\n        task(f\"summarise {r}\", [f\"clean_{r}.npy\"], f\"sum_{r}.npy\", heavy, log)\n        task(f\"model {r}\", [f\"sum_{r}.npy\", f\"clean_{r}.npy\"], f\"model_{r}.npy\", heavy, log)\n    task(\"report\", [f\"model_{r}.npy\" for r in regions], \"report.npy\", heavy, log)\n    return log, time.perf_counter() - t\nrng = np.random.default_rng(1)\nfor r in regions: np.save(f\"raw_{r}.npy\", rng.normal(size=1000))\nruns = {}\nruns[\"1: first run\"] = run(); runs[\"2: nothing changed\"] = run()\nnp.save(\"raw_Sidama.npy\", rng.normal(size=1000)); runs[\"3: Sidama data changed\"] = run()\nfor k, (log, sec) in runs.items(): print(f\"run {k:24s} {len(log):2d} steps ran in {sec:.2f} s: {', '.join(log) if len(log) < 6 else 'all'}\")",
  "out": "run 1: first run             13 steps ran in 2.78 s: all\nrun 2: nothing changed        0 steps ran in 0.00 s: \nrun 3: Sidama data changed    4 steps ran in 0.81 s: clean Sidama, summarise Sidama, model Sidama, report",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Steps that had to run (of 13)",
     "am": "መሥራት የነበረባቸው እርምጃዎች (ከ13)"
    },
    "x": {
     "label": {
      "en": "Steps",
      "am": "እርምጃዎች"
     }
    },
    "fmt": 0,
    "cats": [
     "1: first run",
     "2: nothing changed",
     "3: Sidama data changed"
    ],
    "series": [
     {
      "name": {
       "en": "Steps",
       "am": "እርምጃዎች"
      },
      "slot": 1,
      "v": [
       13.0,
       0.0,
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
       "en": "Steps",
       "am": "እርምጃዎች"
      }
     ],
     "rows": [
      [
       "1: first run",
       13.0
      ],
      [
       "2: nothing changed",
       0.0
      ],
      [
       "3: Sidama data changed",
       4.0
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Run time (seconds)",
     "am": "የሩጫ ጊዜ (ሰከንዶች)"
    },
    "x": {
     "label": {
      "en": "Seconds",
      "am": "ሰከንዶች"
     }
    },
    "fmt": 2,
    "cats": [
     "1: first run",
     "2: nothing changed",
     "3: Sidama data changed"
    ],
    "series": [
     {
      "name": {
       "en": "Seconds",
       "am": "ሰከንዶች"
      },
      "slot": 2,
      "v": [
       2.78,
       0.0,
       0.81
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
       "en": "Seconds",
       "am": "ሰከንዶች"
      }
     ],
     "rows": [
      [
       "1: first run",
       2.78
      ],
      [
       "2: nothing changed",
       0.0
      ],
      [
       "3: Sidama data changed",
       0.81
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The first run executes all 13 steps.",
    "With nothing changed, no step runs: the fingerprints match, so results are reused safely.",
    "Changing Sidama’s raw data reruns only the 4 steps that depend on it: clean Sidama, summarise Sidama, model Sidama, report."
   ],
   "am": [
    "የመጀመሪያው ሩጫ ሁሉንም 13 እርምጃዎች ያስኪዳል።",
    "ምንም ሳይለወጥ ምንም እርምጃ አይሠራም፡ የጣት አሻራዎቹ ይገጥማሉ፣ ስለዚህ ውጤቶች በደህና እንደገና ጥቅም ላይ ይውላሉ።",
    "የSidamaን ጥሬ ዳታ መቀየር በእሱ ላይ የተመሠረቱትን 4 እርምጃዎች ብቻ እንደገና ያስኪዳል፡ clean Sidama, summarise Sidama, model Sidama, report።"
   ]
  },
  "decision": {
   "en": "Move the lab’s analyses into Snakemake or Nextflow with containers, so the same command runs on a laptop and on the HPC cluster, and only changed parts are recomputed.",
   "am": "የላብራቶሪውን ትንተናዎች ከcontainers ጋር ወደ Snakemake ወይም Nextflow አዛውር፤ ያው ትእዛዝ በላፕቶፕና በHPC cluster ላይ እንዲሠራና የተለወጡት ክፍሎች ብቻ እንደገና እንዲሰሉ።"
  },
  "note": {
   "en": "Timings depend on the computer; the pattern, not the exact seconds, is the result.",
   "am": "ጊዜዎች በኮምፒውተሩ ላይ ይወሰናሉ፤ ውጤቱ ትክክለኛዎቹ ሰከንዶች ሳይሆኑ ንድፉ ነው።"
  }
 },
 {
  "title": {
   "en": "Designing a field trial by simulation: how many replicates?",
   "am": "የመስክ ሙከራን በማስመሰል መንደፍ፡ ስንት replicates?"
  },
  "goal": {
   "en": "Simulate a randomised complete block trial of 4 wheat varieties many times, find the power to detect a 0.3 t/ha difference for 2–10 blocks, and write the methods sentence.",
   "am": "የ4 የስንዴ ዝርያዎችን randomised complete block ሙከራ ብዙ ጊዜ አስመስል፣ ለ2–10 blocks የ0.3 t/ha ልዩነትን የመለየት powerን ፈልግ፣ የዘዴዎቹን ዓረፍተ ነገርም ጻፍ።"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
   },
   {
    "name": "R (optional)",
    "why": {
     "en": "the same analysis in R",
     "am": "ያው ትንተና በR"
    },
    "get": "cran.r-project.org + RStudio"
   }
  ],
  "steps": {
   "en": [
    "Take the variance from past trials: block SD 0.4 t/ha, plot SD 0.20 t/ha.",
    "Simulate the trial with the new variety 0.3 t/ha above the check.",
    "Analyse each simulated trial with the RCBD ANOVA and the contrast new vs check.",
    "Repeat 2,000 times per number of blocks; power = share of trials with p < 0.05.",
    "Choose the smallest design with at least 80% power."
   ],
   "am": [
    "ከቀደሙ ሙከራዎች varianceን ውሰድ፡ block SD 0.4 t/ha፣ የplot SD 0.20 t/ha።",
    "አዲሱ ዝርያ ከcheckኡ 0.3 t/ha በላይ ሆኖ ሙከራውን አስመስል።",
    "እያንዳንዱን የተመሰለ ሙከራ በRCBD ANOVA እና በአዲስ vs check contrast ተንትን።",
    "ለእያንዳንዱ የblocks ብዛት 2,000 ጊዜ ድገም፤ power = p < 0.05 ያላቸው ሙከራዎች ድርሻ።",
    "ቢያንስ 80% power ያለውን ትንሹን ንድፍ ምረጥ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nmeans = np.array([3.0, 3.1, 3.2, 3.3])            # check = first, new variety = last (+0.3 t/ha)\nSD_BLOCK, SD_PLOT, SIMS = 0.40, 0.20, 2000\nrng = np.random.default_rng(10); power = {}\nfor b in range(2, 11):\n    y = means[None, None, :] + rng.normal(0, SD_BLOCK, (SIMS, b, 1)) + rng.normal(0, SD_PLOT, (SIMS, b, 4))\n    resid = y - y.mean(2, keepdims=True) - y.mean(1, keepdims=True) + y.mean((1, 2), keepdims=True)\n    df = (b - 1) * 3; mse = (resid ** 2).sum((1, 2)) / df\n    diff = y[:, :, 3].mean(1) - y[:, :, 0].mean(1); t = diff / np.sqrt(2 * mse / b)\n    power[b] = float(np.mean(2 * stats.t.sf(np.abs(t), df) < 0.05))\n    print(f\"{b} blocks: power {power[b]:.2f}\")\nbest = min(b for b in power if power[b] >= 0.8)\nprint(f\"Methods: The trial will use a randomised complete block design with {best} blocks of 4 varieties; simulation (2,000 runs, block SD 0.40, plot SD 0.20 t/ha) gives {power[best]:.0%} power to detect a 0.3 t/ha difference from the check at the 5% level.\")",
  "out": "2 blocks: power 0.20\n3 blocks: power 0.34\n4 blocks: power 0.47\n5 blocks: power 0.58\n6 blocks: power 0.67\n7 blocks: power 0.76\n8 blocks: power 0.83\n9 blocks: power 0.86\n10 blocks: power 0.90\nMethods: The trial will use a randomised complete block design with 8 blocks of 4 varieties; simulation (2,000 runs, block SD 0.40, plot SD 0.20 t/ha) gives 83% power to detect a 0.3 t/ha difference from the check at the 5% level.",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Power to detect +0.3 t/ha (new variety vs check)",
     "am": "+0.3 t/haን የመለየት power (አዲስ ዝርያ vs check)"
    },
    "x": {
     "label": {
      "en": "Number of blocks",
      "am": "የblocks ብዛት"
     },
     "int": true
    },
    "y": {
     "label": "Power",
     "min": 0,
     "max": 1
    },
    "series": [
     {
      "name": "Power",
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       2.0,
       3.0,
       4.0,
       5.0,
       6.0,
       7.0,
       8.0,
       9.0,
       10.0
      ],
      "y": [
       0.2025,
       0.335,
       0.4685,
       0.579,
       0.668,
       0.7595,
       0.8255,
       0.8565,
       0.8985
      ],
      "tip": [
       "0.2025|Power · 2",
       "0.335|Power · 3",
       "0.4685|Power · 4",
       "0.579|Power · 5",
       "0.668|Power · 6",
       "0.7595|Power · 7",
       "0.8255|Power · 8",
       "0.8565|Power · 9",
       "0.8985|Power · 10"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Number of blocks",
       "am": "የblocks ብዛት"
      },
      "Power"
     ],
     "rows": [
      [
       2.0,
       0.203
      ],
      [
       3.0,
       0.335
      ],
      [
       4.0,
       0.469
      ],
      [
       5.0,
       0.579
      ],
      [
       6.0,
       0.668
      ],
      [
       7.0,
       0.759
      ],
      [
       8.0,
       0.826
      ],
      [
       9.0,
       0.857
      ],
      [
       10.0,
       0.898
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0.8,
      "label": {
       "en": "80% target",
       "am": "80% ዒላማ"
      }
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "With 2 blocks the trial finds a real 0.3 t/ha gain only 20% of the time: mostly a waste of land.",
    "8 blocks reach 83% power; each extra block adds less.",
    "Block-to-block variation does not reduce power here, because every variety is in every block: that is why we block."
   ],
   "am": [
    "በ2 blocks ሙከራው እውነተኛ የ0.3 t/ha ጭማሪን የሚያገኘው 20% ጊዜ ብቻ ነው፡ በአብዛኛው የመሬት ብክነት።",
    "8 blocks 83% power ይደርሳሉ፤ እያንዳንዱ ተጨማሪ block ያነሰ ይጨምራል።",
    "የblock-ለ-block ልዩነት እዚህ powerን አይቀንስም፣ እያንዳንዱ ዝርያ በእያንዳንዱ block ውስጥ ስላለ፡ ለዚህ ነው block የምናደርገው።"
   ]
  },
  "decision": {
   "en": "Plant 8 blocks; if land allows only fewer, either accept that a 0.3 t/ha gain may be missed or test fewer varieties. Put the printed methods sentence in the proposal.",
   "am": "8 blocks ዝራ፤ መሬቱ ጥቂት ብቻ ከፈቀደ የ0.3 t/ha ጭማሪ ሊያመልጥ እንደሚችል ተቀበል ወይም ጥቂት ዝርያዎችን ፈትሽ። የታተመውን የዘዴዎች ዓረፍተ ነገር በፕሮፖዛሉ ውስጥ አስገባ።"
  }
 },
 {
  "title": {
   "en": "Research craft: one primary outcome, or false discoveries",
   "am": "የምርምር ክህሎት፡ አንድ ዋና ውጤት፣ አለበለዚያ የሐሰት ግኝቶች"
  },
  "goal": {
   "en": "Simulate a study that measures 20 outcomes, of which only 2 truly change, and compare how often you \"discover\" something false with no correction, Holm and Benjamini–Hochberg.",
   "am": "20 ውጤቶችን የሚለካ፣ ከነሱም 2 ብቻ በእውነት የሚለወጡበትን ጥናት አስመስል፤ ያለ ማስተካከያ፣ በHolm እና በBenjamini–Hochberg የሐሰት ነገር ምን ያህል ጊዜ «እንደምታገኝ» አወዳድር።"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
   },
   {
    "name": "OSF or AsPredicted",
    "why": {
     "en": "register the plan before collecting data",
     "am": "ዳታ ከመሰብሰብህ በፊት ዕቅዱን መመዝገብ"
    },
    "get": "osf.io, aspredicted.org (free)"
   }
  ],
  "steps": {
   "en": [
    "Write the hypothesis and pick one primary outcome before the study.",
    "Simulate 2,000 studies: 20 outcomes, 30 farms per group, 2 real effects.",
    "Test each outcome with a t-test.",
    "Count studies with at least one false positive, and the share of real effects found.",
    "Register the plan (outcomes, analysis, sample size) publicly."
   ],
   "am": [
    "ከጥናቱ በፊት hypothesisኡን ጻፍና አንድ ዋና ውጤት ምረጥ።",
    "2,000 ጥናቶችን አስመስል፡ 20 ውጤቶች፣ በቡድን 30 እርሻዎች፣ 2 እውነተኛ ውጤቶች።",
    "እያንዳንዱን ውጤት በt-test ፈትሽ።",
    "ቢያንስ አንድ የሐሰት አዎንታዊ ያላቸውን ጥናቶችና የተገኙ እውነተኛ ውጤቶችን ድርሻ ቁጠር።",
    "ዕቅዱን (ውጤቶች፣ ትንተና፣ የናሙና መጠን) በይፋ መዝግብ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(2); STUDIES, K, N = 2000, 20, 30\neffect = np.zeros(K); effect[:2] = 0.8                                  # only outcomes 1 and 2 truly change (0.8 SD)\ndef holm(p):\n    order = np.argsort(p); reject = np.zeros(K, bool)\n    for rank, i in enumerate(order):\n        if p[i] <= 0.05 / (K - rank): reject[i] = True\n        else: break\n    return reject\ndef bh(p):\n    order = np.argsort(p); passed = np.where(p[order] <= 0.05 * np.arange(1, K + 1) / K)[0]\n    reject = np.zeros(K, bool)\n    if len(passed): reject[order[:passed.max() + 1]] = True\n    return reject\nmethods = {\"no correction\": lambda p: p < 0.05, \"Holm\": holm, \"Benjamini-Hochberg\": bh}\nfwer = {m: 0 for m in methods}; power = {m: 0 for m in methods}\nfor _ in range(STUDIES):\n    a = rng.normal(0, 1, (N, K)); b = rng.normal(effect, 1, (N, K)); p = stats.ttest_ind(a, b).pvalue\n    for m, f in methods.items():\n        r = f(p); fwer[m] += r[2:].any(); power[m] += r[:2].mean()\nfor m in methods: print(f\"{m:20s} studies with a false discovery {fwer[m] / STUDIES:.0%}, real effects found {power[m] / STUDIES:.0%}\")\nfwer = {m: v / STUDIES for m, v in fwer.items()}; power = {m: v / STUDIES for m, v in power.items()}",
  "out": "no correction        studies with a false discovery 61%, real effects found 86%\nHolm                 studies with a false discovery 5%, real effects found 49%\nBenjamini-Hochberg   studies with a false discovery 10%, real effects found 54%",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "20 outcomes tested: false alarms vs real findings",
     "am": "20 ውጤቶች ተፈትነዋል፡ የሐሰት ማንቂያዎች vs እውነተኛ ግኝቶች"
    },
    "x": {
     "label": {
      "en": "Percent",
      "am": "መቶኛ"
     }
    },
    "fmt": 0,
    "cats": [
     "no correction",
     "Holm",
     "Benjamini-Hochberg"
    ],
    "series": [
     {
      "name": {
       "en": "Studies with at least one false discovery",
       "am": "ቢያንስ አንድ የሐሰት ግኝት ያላቸው ጥናቶች"
      },
      "slot": 2,
      "v": [
       61.0,
       5.0,
       10.0
      ]
     },
     {
      "name": {
       "en": "Real effects found",
       "am": "የተገኙ እውነተኛ ውጤቶች"
      },
      "slot": 1,
      "v": [
       86.0,
       49.0,
       54.0
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
       "en": "Studies with at least one false discovery",
       "am": "ቢያንስ አንድ የሐሰት ግኝት ያላቸው ጥናቶች"
      },
      {
       "en": "Real effects found",
       "am": "የተገኙ እውነተኛ ውጤቶች"
      }
     ],
     "rows": [
      [
       "no correction",
       61.0,
       86.0
      ],
      [
       "Holm",
       5.0,
       49.0
      ],
      [
       "Benjamini-Hochberg",
       10.0,
       54.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Without correction 61% of studies report at least one false effect: testing 20 outcomes almost guarantees a lucky one.",
    "Holm cuts that to 5% but finds fewer real effects (49%).",
    "Benjamini–Hochberg is in between (10% false, 54% real)."
   ],
   "am": [
    "ያለ ማስተካከያ 61% ጥናቶች ቢያንስ አንድ የሐሰት ውጤት ይዘግባሉ፡ 20 ውጤቶችን መፈተሽ ዕድለኛ አንድን ከሞላ ጎደል ያረጋግጣል።",
    "Holm ያንን ወደ 5% ይቀንሳል ግን ጥቂት እውነተኛ ውጤቶችን ያገኛል (49%)።",
    "Benjamini–Hochberg በመካከል ነው (10% ሐሰት፣ 54% እውነተኛ)።"
   ]
  },
  "decision": {
   "en": "In your proposal name one primary outcome and register it; report secondary outcomes with Benjamini–Hochberg and call them exploratory.",
   "am": "በፕሮፖዛልህ አንድ ዋና ውጤት ሰይምና መዝግበው፤ ሁለተኛ ደረጃ ውጤቶችን በBenjamini–Hochberg ዘግብና ለምርመራ የሆኑ (exploratory) በላቸው።"
  }
 }
];
