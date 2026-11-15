/* Practical labs, track s, level 4. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[4] = [
 {
  "title": {
   "en": "Why we randomise: a field with a fertility gradient",
   "am": "ለምን በዘፈቀደ እንመድባለን፡ የለምነት ልዩነት ያለው ማሳ"
  },
  "goal": {
   "en": "Simulate 2,000 trials of 6 equal treatments on a sloping field, laid out systematically or randomised within blocks, and see which layout gives false differences.",
   "am": "በተዳፋት ማሳ ላይ የ6 እኩል ሕክምናዎችን 2,000 ሙከራዎች አስመስል፣ በሥርዓት ወይም በblocks ውስጥ በዘፈቀደ ተቀምጠው፣ የትኛው አቀማመጥ የሐሰት ልዩነቶችን እንደሚሰጥ ተመልከት።"
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
    "name": "Field plots, pegs, tape, labels",
    "why": {
     "en": "lay out and mark the plots",
     "am": "plotsን ማቀድና ምልክት ማድረግ"
    },
    "get": "research station or farmer field"
   },
   {
    "name": "Random number table or app",
    "why": {
     "en": "draw the plot order",
     "am": "የplot ቅደም ተከተሉን ማውጣት"
    },
    "get": "any phone, or R: sample()"
   }
  ],
  "steps": {
   "en": [
    "Map the field: fertility falls by 0.05 t/ha per plot across the slope.",
    "Systematic layout: in every block, treatments 1–6 always run left to right.",
    "Randomised layout: a new random order in every block; blocks run across the gradient.",
    "Simulate 2,000 trials where all treatments are truly equal; estimate T6 − T1 each time.",
    "Print a randomised field plan to use."
   ],
   "am": [
    "ማሳውን ካርታ አድርግ፡ ለምነት በተዳፋቱ ላይ በplot 0.05 t/ha ይቀንሳል።",
    "የሥርዓት አቀማመጥ፡ በእያንዳንዱ block ሕክምናዎች 1–6 ሁልጊዜ ከግራ ወደ ቀኝ ይሄዳሉ።",
    "የዘፈቀደ አቀማመጥ፡ በእያንዳንዱ block አዲስ የዘፈቀደ ቅደም ተከተል፤ blocks በልዩነቱ ላይ ይሄዳሉ።",
    "ሁሉም ሕክምናዎች በእውነት እኩል የሆኑበትን 2,000 ሙከራዎች አስመስል፤ በእያንዳንዱ ጊዜ T6 − T1ን ገምት።",
    "የምትጠቀምበትን የዘፈቀደ የማሳ ዕቅድ አትም።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(11); t, blocks = 6, 4\ngradient = -0.05 * np.arange(t)                                          # plots 1..6 within a block, along the slope\ndef trial(randomise):\n    est = np.zeros(t)\n    for b in range(blocks):\n        order = rng.permutation(t) if randomise else np.arange(t)            # order[i] = treatment in plot i\n        y = 3.0 + gradient + rng.normal(0, 0.15, t)                          # every treatment truly equal\n        est[order] += y / blocks\n    return est[5] - est[0]\nsys_ = np.array([trial(False) for _ in range(2000)]); ran = np.array([trial(True) for _ in range(2000)])\nfor name, d in [(\"systematic\", sys_), (\"randomised\", ran)]:\n    print(f\"{name:10s}: mean T6 - T1 = {d.mean():+.3f} t/ha (truth 0), share of trials with |difference| > 0.2: {np.mean(abs(d) > 0.2):.0%}\")\nplan = [[int(x) for x in rng.permutation(t) + 1] for _ in range(blocks)]\nfor b, row in enumerate(plan, 1): print(f\"block {b}: plots 1-6 get treatments {row}\")",
  "out": "systematic: mean T6 - T1 = -0.253 t/ha (truth 0), share of trials with |difference| > 0.2: 70%\nrandomised: mean T6 - T1 = +0.001 t/ha (truth 0), share of trials with |difference| > 0.2: 10%\nblock 1: plots 1-6 get treatments [3, 1, 5, 6, 4, 2]\nblock 2: plots 1-6 get treatments [3, 5, 1, 2, 4, 6]\nblock 3: plots 1-6 get treatments [3, 2, 4, 5, 1, 6]\nblock 4: plots 1-6 get treatments [6, 5, 2, 3, 1, 4]",
  "lang": "Python",
  "viz": [
   {
    "type": "dot",
    "title": {
     "en": "Estimated T6 − T1 when there is no real difference (t/ha)",
     "am": "እውነተኛ ልዩነት በሌለበት የተገመተ T6 − T1 (t/ha)"
    },
    "x": {
     "label": "t/ha"
    },
    "cats": [
     {
      "en": "Systematic layout",
      "am": "የሥርዓት አቀማመጥ"
     },
     {
      "en": "Randomised in blocks",
      "am": "በblocks ውስጥ በዘፈቀደ"
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
       -0.253,
       0.001
      ],
      "lo": [
       -0.459,
       -0.244
      ],
      "hi": [
       -0.056,
       0.242
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
        "en": "Systematic layout",
        "am": "የሥርዓት አቀማመጥ"
       },
       -0.253,
       -0.459,
       -0.056
      ],
      [
       {
        "en": "Randomised in blocks",
        "am": "በblocks ውስጥ በዘፈቀደ"
       },
       0.001,
       -0.244,
       0.242
      ]
     ]
    },
    "note": {
     "en": "Dots: average over 2,000 trials; bars: where 95% of trials fall.",
     "am": "ነጥቦች፡ የ2,000 ሙከራዎች አማካይ፤ አሞሌዎች፡ 95% ሙከራዎች የሚወድቁበት።"
    }
   }
  ],
  "analysis": {
   "en": [
    "The systematic layout always puts T6 on the poorer end: it reports T6 about 0.25 t/ha worse every time, although the treatments are equal.",
    "Randomised layouts are unbiased on average (+0.001); single trials still vary by chance, which the ANOVA error term measures.",
    "70% of systematic trials show a gap above 0.2 t/ha, against 10% of randomised ones."
   ],
   "am": [
    "የሥርዓት አቀማመጡ T6ን ሁልጊዜ በደካማው ጫፍ ያስቀምጣል፡ ሕክምናዎቹ እኩል ቢሆኑም T6ን በእያንዳንዱ ጊዜ ወደ 0.25 t/ha የከፋ አድርጎ ይዘግባል።",
    "የዘፈቀደ አቀማመጦች በአማካይ ያልተዛቡ ናቸው (+0.001)፤ ነጠላ ሙከራዎች አሁንም በዕድል ይለያያሉ፣ ይህንንም የANOVA ስህተት ይለካል።",
    "ከሥርዓት ሙከራዎች 70% ከ0.2 t/ha በላይ ክፍተት ያሳያሉ፤ ከዘፈቀደዎቹ 10%።"
   ]
  },
  "decision": {
   "en": "Use the printed randomised plan: blocks across the slope, a new random order in each block, and keep the plan and seed with the data.",
   "am": "የታተመውን የዘፈቀደ ዕቅድ ተጠቀም፡ blocks በተዳፋቱ ላይ፣ በእያንዳንዱ block አዲስ የዘፈቀደ ቅደም ተከተል፣ ዕቅዱንና seedኡን ከዳታው ጋር አቆይ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "CRD and one-way ANOVA: five rations for broilers",
   "am": "CRD እና one-way ANOVA፡ ለዶሮዎች አምስት ራሽኖች"
  },
  "goal": {
   "en": "Compare weight gain of chickens on five rations in a completely randomised design, build the ANOVA table, and check the assumptions.",
   "am": "በcompletely randomised design ውስጥ በአምስት ራሽኖች ላይ ያሉ ዶሮዎችን የክብደት ጭማሪ አወዳድር፣ የANOVA ሰንጠረዡን ገንባ፣ ግምቶቹን ፈትሽ።"
  },
  "time": {
   "en": "6 weeks + analysis",
   "am": "6 ሳምንታት + ትንተና"
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
    "name": "Pens and a scale",
    "why": {
     "en": "house birds and weigh them",
     "am": "ዶሮዎችን ማኖርና መመዘን"
    },
    "get": "poultry unit"
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
    "Assign 30 similar chicks at random to 5 rations (6 pens of one bird each).",
    "Record weight gain over 6 weeks (g).",
    "Compute treatment means and the ANOVA: between-ration and within-ration variation.",
    "Check equal variances (Levene) and normal residuals (Shapiro).",
    "If F is significant, compare rations (next lab)."
   ],
   "am": [
    "30 ተመሳሳይ ጫጩቶችን በዘፈቀደ ወደ 5 ራሽኖች መድብ (በአንድ ዶሮ 6 ጎጆዎች)።",
    "በ6 ሳምንታት የክብደት ጭማሪን መዝግብ (g)።",
    "የሕክምና አማካዮችንና ANOVAን አስላ፡ በራሽኖች መካከልና በራሽን ውስጥ ያለ ልዩነት።",
    "እኩል variancesን (Levene) እና normal residualsን (Shapiro) ፈትሽ።",
    "F ጉልህ ከሆነ ራሽኖችን አወዳድር (ቀጣዩ ላብ)።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(5)\nrations = [\"maize-soy (control)\", \"+ 10% fish meal\", \"+ 15% noug cake\", \"+ 10% sorghum\", \"+ enzyme\"]\ntrue = [1650, 1780, 1720, 1600, 1700]\ndata = {r: rng.normal(m, 70, 6).round() for r, m in zip(rations, true)}\ny = np.concatenate(list(data.values())); g = np.repeat(np.arange(5), 6); grand = y.mean()\nss_t = sum(6 * (v.mean() - grand) ** 2 for v in data.values()); ss_e = sum(((v - v.mean()) ** 2).sum() for v in data.values())\ndf_t, df_e = 4, 25; F = (ss_t / df_t) / (ss_e / df_e); p = stats.f.sf(F, df_t, df_e)\nprint(f\"{'source':9s} {'df':>3s} {'SS':>9s} {'MS':>8s}\"); print(f\"rations   {df_t:3d} {ss_t:9.0f} {ss_t / df_t:8.0f}  F = {F:.2f}, p = {p:.4f}\"); print(f\"error     {df_e:3d} {ss_e:9.0f} {ss_e / df_e:8.0f}\")\nlev = stats.levene(*data.values()).pvalue; resid = y - np.array([data[rations[i]].mean() for i in g]); shap = stats.shapiro(resid).pvalue\nprint(f\"Levene p = {lev:.2f} (equal variances OK if > 0.05); Shapiro p = {shap:.2f} (normal residuals OK if > 0.05)\")\nmeans = {r: float(v.mean()) for r, v in data.items()}; cv = np.sqrt(ss_e / df_e) / grand\nprint(f\"CV = {cv:.1%}\")",
  "out": "source     df        SS       MS\nrations     4    133175    33294  F = 7.74, p = 0.0003\nerror      25    107533     4301\nLevene p = 0.33 (equal variances OK if > 0.05); Shapiro p = 0.67 (normal residuals OK if > 0.05)\nCV = 3.9%",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Mean weight gain over 6 weeks (g)",
     "am": "በ6 ሳምንታት አማካይ የክብደት ጭማሪ (g)"
    },
    "x": {
     "label": {
      "en": "Grams",
      "am": "ግራም"
     }
    },
    "fmt": 0,
    "cats": [
     "maize-soy (control)",
     "+ 10% fish meal",
     "+ 15% noug cake",
     "+ 10% sorghum",
     "+ enzyme"
    ],
    "series": [
     {
      "name": {
       "en": "Grams",
       "am": "ግራም"
      },
      "slot": 1,
      "v": [
       1642.0,
       1781.0,
       1695.0,
       1578.0,
       1679.0
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
       "en": "Grams",
       "am": "ግራም"
      }
     ],
     "rows": [
      [
       "maize-soy (control)",
       1642.0
      ],
      [
       "+ 10% fish meal",
       1781.0
      ],
      [
       "+ 15% noug cake",
       1695.0
      ],
      [
       "+ 10% sorghum",
       1578.0
      ],
      [
       "+ enzyme",
       1679.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "F = 7.74, p = 0.0003: rations differ more than chance would explain.",
    "Assumptions hold: Levene p = 0.33, Shapiro p = 0.67; CV = 3.9%, typical for animal trials.",
    "Fish meal gives the highest mean (1781 g) and sorghum the lowest (1578 g); which pairs differ needs a comparison test."
   ],
   "am": [
    "F = 7.74፣ p = 0.0003፡ ራሽኖች ዕድል ከሚያብራራው በላይ ይለያያሉ።",
    "ግምቶቹ ይሠራሉ፡ Levene p = 0.33፣ Shapiro p = 0.67፤ CV = 3.9%፣ ለእንስሳት ሙከራዎች የተለመደ።",
    "fish meal ከፍተኛውን አማካይ (1781 g)፣ sorghum ዝቅተኛውን (1578 g) ይሰጣሉ፤ የትኞቹ ጥንዶች እንደሚለያዩ የንጽጽር ፈተና ያስፈልገዋል።"
   ]
  },
  "decision": {
   "en": "Go on to pairwise comparisons (Tukey) and to a cost per kg gain before recommending a ration; with 6 birds per ration, differences under about 100 g cannot be detected.",
   "am": "ራሽን ከመምከርህ በፊት ወደ የጥንድ ንጽጽሮች (Tukey) እና በkg ጭማሪ ወጪ ቀጥል፤ በራሽን 6 ዶሮዎች ሲሆኑ ከ100 g በታች ያሉ ልዩነቶች ሊታወቁ አይችሉም።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "LSD, Tukey or Dunnett? False alarms and the right comparison",
   "am": "LSD፣ Tukey ወይስ Dunnett? የሐሰት ማንቂያዎችና ትክክለኛው ንጽጽር"
  },
  "goal": {
   "en": "Simulate trials of 6 equal sorghum varieties to count false alarms from each method, then compare 5 new varieties with the standard check on real-looking data.",
   "am": "ከእያንዳንዱ ዘዴ የሐሰት ማንቂያዎችን ለመቁጠር የ6 እኩል የማሽላ ዝርያዎችን ሙከራዎች አስመስል፤ ከዚያ 5 አዲስ ዝርያዎችን ከመደበኛው check ጋር በእውነተኛ መሰል ዳታ ላይ አወዳድር።"
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
    "Simulate 1,000 trials: 6 varieties, 4 reps, no true differences.",
    "In each trial run all 15 pairwise LSD tests, Tukey HSD, and Dunnett (each new vs check).",
    "Count trials with at least one false \"significant\" result.",
    "Analyse the real trial with Dunnett, because the question is \"which new varieties beat the check?\"",
    "Report means with the method named."
   ],
   "am": [
    "1,000 ሙከራዎችን አስመስል፡ 6 ዝርያዎች፣ 4 reps፣ ምንም እውነተኛ ልዩነት የለም።",
    "በእያንዳንዱ ሙከራ ሁሉንም 15 የጥንድ LSD ፈተናዎች፣ Tukey HSD እና Dunnett (እያንዳንዱ አዲስ vs check) አስኪድ።",
    "ቢያንስ አንድ የሐሰት «ጉልህ» ውጤት ያላቸውን ሙከራዎች ቁጠር።",
    "ጥያቄው «የትኞቹ አዲስ ዝርያዎች checkኡን ያሸንፋሉ?» ስለሆነ እውነተኛውን ሙከራ በDunnett ተንትን።",
    "አማካዮችን ከተጠቀምክበት ዘዴ ስም ጋር ዘግብ።"
   ]
  },
  "code": "import numpy as np, itertools\nfrom scipy import stats\nrng = np.random.default_rng(8); k, r = 6, 4\nfalse = {\"LSD (all pairs)\": 0, \"Tukey HSD\": 0, \"Dunnett (vs check)\": 0}\nfor _ in range(1000):\n    groups = [rng.normal(3.0, 0.4, r) for _ in range(k)]\n    mse = np.mean([g.var(ddof=1) for g in groups]); df = k * (r - 1); lsd = stats.t.ppf(0.975, df) * np.sqrt(2 * mse / r)\n    m = [g.mean() for g in groups]\n    false[\"LSD (all pairs)\"] += any(abs(a - b) > lsd for a, b in itertools.combinations(m, 2))\n    false[\"Tukey HSD\"] += (stats.tukey_hsd(*groups).pvalue < 0.05).any()\n    false[\"Dunnett (vs check)\"] += (stats.dunnett(*groups[1:], control=groups[0]).pvalue < 0.05).any()\nfor k_, v in false.items(): print(f\"{k_:20s} trials with a false alarm: {v / 10:.1f}%\")\nnames = [\"Check (Teshale)\", \"ETSC-1\", \"ETSC-2\", \"ETSC-3\", \"ETSC-4\", \"ETSC-5\"]\ntrue = [3.0, 3.1, 3.7, 3.0, 3.6, 2.9]\ntrial = [rng.normal(m, 0.3, 4) for m in true]\nres = stats.dunnett(*trial[1:], control=trial[0])\nmeans = [float(g.mean()) for g in trial]\nfor n, m, p in zip(names[1:], means[1:], res.pvalue): print(f\"{n}: {m:.2f} t/ha vs check {means[0]:.2f}; Dunnett p = {p:.3f}\")\nwinners = [n for n, p, m in zip(names[1:], res.pvalue, means[1:]) if p < 0.05 and m > means[0]]",
  "out": "LSD (all pairs)      trials with a false alarm: 31.9%\nTukey HSD            trials with a false alarm: 5.8%\nDunnett (vs check)   trials with a false alarm: 4.4%\nETSC-1: 2.99 t/ha vs check 3.12; Dunnett p = 0.981\nETSC-2: 3.93 t/ha vs check 3.12; Dunnett p = 0.024\nETSC-3: 3.19 t/ha vs check 3.12; Dunnett p = 0.999\nETSC-4: 3.63 t/ha vs check 3.12; Dunnett p = 0.223\nETSC-5: 2.89 t/ha vs check 3.12; Dunnett p = 0.839",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Trials with at least one false \"significant\" difference (no real differences)",
     "am": "ቢያንስ አንድ የሐሰት «ጉልህ» ልዩነት ያላቸው ሙከራዎች (እውነተኛ ልዩነት የለም)"
    },
    "x": {
     "label": {
      "en": "Percent",
      "am": "መቶኛ"
     }
    },
    "fmt": 1,
    "cats": [
     "LSD (all pairs)",
     "Tukey HSD",
     "Dunnett (vs check)"
    ],
    "series": [
     {
      "name": {
       "en": "Percent of 1,000 trials",
       "am": "ከ1,000 ሙከራዎች መቶኛ"
      },
      "slot": 2,
      "v": [
       31.9,
       5.8,
       4.4
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
       "en": "Percent of 1,000 trials",
       "am": "ከ1,000 ሙከራዎች መቶኛ"
      }
     ],
     "rows": [
      [
       "LSD (all pairs)",
       31.9
      ],
      [
       "Tukey HSD",
       5.8
      ],
      [
       "Dunnett (vs check)",
       4.4
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Sorghum yields (t/ha); Dunnett vs check",
     "am": "የማሽላ ምርቶች (t/ha)፤ Dunnett vs check"
    },
    "x": {
     "label": "t/ha"
    },
    "fmt": 2,
    "cats": [
     "Check (Teshale)",
     "ETSC-1",
     "ETSC-2",
     "ETSC-3",
     "ETSC-4",
     "ETSC-5"
    ],
    "series": [
     {
      "name": {
       "en": "Mean yield",
       "am": "አማካይ ምርት"
      },
      "slot": 1,
      "v": [
       3.12,
       2.99,
       3.93,
       3.19,
       3.63,
       2.89
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
       "en": "Mean yield",
       "am": "አማካይ ምርት"
      }
     ],
     "rows": [
      [
       "Check (Teshale)",
       3.12
      ],
      [
       "ETSC-1",
       2.99
      ],
      [
       "ETSC-2",
       3.93
      ],
      [
       "ETSC-3",
       3.19
      ],
      [
       "ETSC-4",
       3.63
      ],
      [
       "ETSC-5",
       2.89
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Unprotected LSD on all 15 pairs raises a false alarm in 32% of trials, although no variety differs.",
    "Tukey (6%) and Dunnett (4%) keep the rate near the promised 5%.",
    "In the real trial Dunnett finds ETSC-2 significantly better than the check."
   ],
   "am": [
    "ያልተጠበቀ LSD በሁሉም 15 ጥንዶች ላይ ምንም ዝርያ ባይለያይም በ32% ሙከራዎች የሐሰት ማንቂያ ያስነሳል።",
    "Tukey (6%) እና Dunnett (4%) መጠኑን በቃል በተገባው 5% አቅራቢያ ያቆያሉ።",
    "በእውነተኛው ሙከራ Dunnett ETSC-2ን ከcheckኡ በጉልህ የተሻለ ሆኖ ያገኛል።"
   ]
  },
  "decision": {
   "en": "Advance ETSC-2 to multi-location testing. Use Dunnett when comparing with a check, Tukey for all pairs, and LSD only for one or two planned comparisons.",
   "am": "ETSC-2ን ወደ ባለብዙ-ቦታ ፈተና አሳልፍ። ከcheck ጋር ስታወዳድር Dunnettን፣ ለሁሉም ጥንዶች Tukeyን፣ LSDን ደግሞ ለአንድ ወይም ለሁለት የታቀዱ ንጽጽሮች ብቻ ተጠቀም።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "RCBD: how much does blocking gain?",
   "am": "RCBD፡ blocking ምን ያህል ያተርፋል?"
  },
  "goal": {
   "en": "Analyse the same wheat trial as a CRD and as an RCBD, compute the relative efficiency of blocking, and decide how to block next season.",
   "am": "ያንኑ የስንዴ ሙከራ እንደ CRD እና እንደ RCBD ተንትን፣ የblockingን አንጻራዊ ቅልጥፍና አስላ፣ በሚቀጥለው ወቅት እንዴት block እንደሚደረግ ወስን።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
  },
  "tools": [
   {
    "name": "Field plots, pegs, tape, labels",
    "why": {
     "en": "lay out and mark the plots",
     "am": "plotsን ማቀድና ምልክት ማድረግ"
    },
    "get": "research station or farmer field"
   },
   {
    "name": "Field balance",
    "why": {
     "en": "weigh plot yields",
     "am": "የplot ምርቶችን መመዘን"
    },
    "get": "station store"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
   }
  ],
  "steps": {
   "en": [
    "Field: 5 fertiliser treatments × 5 blocks; blocks follow the drainage gradient.",
    "Analyse ignoring blocks (CRD ANOVA).",
    "Analyse with blocks (RCBD ANOVA).",
    "Relative efficiency RE = MSE(CRD-equivalent) ÷ MSE(RCBD).",
    "Interpret: how many CRD replicates would equal the RCBD?"
   ],
   "am": [
    "ማሳ፡ 5 የማዳበሪያ ሕክምናዎች × 5 blocks፤ blocks የፍሳሽ ልዩነቱን ይከተላሉ።",
    "blocksን ችላ ብለህ ተንትን (CRD ANOVA)።",
    "ከblocks ጋር ተንትን (RCBD ANOVA)።",
    "አንጻራዊ ቅልጥፍና RE = MSE(CRD-አቻ) ÷ MSE(RCBD)።",
    "ተርጉም፡ ስንት የCRD replicates ከRCBDው ጋር እኩል ይሆናሉ?"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(14); t, b = 5, 5\nblock_eff = np.array([-0.6, -0.3, 0.0, 0.3, 0.6]); trt_eff = np.array([0.0, 0.25, 0.45, 0.55, 0.5])\ny = 3.2 + block_eff[:, None] + trt_eff[None, :] + rng.normal(0, 0.18, (b, t))       # rows = blocks\ng = y.mean(); ss_tot = ((y - g) ** 2).sum(); ss_t = b * ((y.mean(0) - g) ** 2).sum(); ss_b = t * ((y.mean(1) - g) ** 2).sum()\nmse_crd = (ss_tot - ss_t) / (t * (b - 1)); mse_rcbd = (ss_tot - ss_t - ss_b) / ((t - 1) * (b - 1))\nF_crd = (ss_t / (t - 1)) / mse_crd; F_rcbd = (ss_t / (t - 1)) / mse_rcbd\np_crd = stats.f.sf(F_crd, t - 1, t * (b - 1)); p_rcbd = stats.f.sf(F_rcbd, t - 1, (t - 1) * (b - 1))\nre = ((b - 1) * (ss_b / (b - 1)) + b * (t - 1) * mse_rcbd) / ((t * b - 1) * mse_rcbd)            # Cochran & Cox\nprint(f\"CRD analysis:  MSE {mse_crd:.3f}, F {F_crd:.2f}, p {p_crd:.3f}\"); print(f\"RCBD analysis: MSE {mse_rcbd:.3f}, F {F_rcbd:.2f}, p {p_rcbd:.3f}\")\nprint(f\"relative efficiency of blocking: {re:.1f} -> a CRD would need about {re * b:.0f} replicates to match 5 blocks\")",
  "out": "CRD analysis:  MSE 0.331, F 0.33, p 0.853\nRCBD analysis: MSE 0.035, F 3.16, p 0.043\nrelative efficiency of blocking: 8.1 -> a CRD would need about 41 replicates to match 5 blocks",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Error mean square (t/ha)²: smaller is more precise",
     "am": "Error mean square (t/ha)²፡ ያነሰ የበለጠ ትክክለኛ ነው"
    },
    "x": {
     "label": "MSE"
    },
    "fmt": 3,
    "cats": [
     {
      "en": "Analysed as CRD",
      "am": "እንደ CRD የተተነተነ"
     },
     {
      "en": "Analysed as RCBD",
      "am": "እንደ RCBD የተተነተነ"
     }
    ],
    "series": [
     {
      "name": "MSE",
      "slot": 1,
      "v": [
       0.331,
       0.035
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      "MSE"
     ],
     "rows": [
      [
       {
        "en": "Analysed as CRD",
        "am": "እንደ CRD የተተነተነ"
       },
       0.331
      ],
      [
       {
        "en": "Analysed as RCBD",
        "am": "እንደ RCBD የተተነተነ"
       },
       0.035
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Block means follow the drainage gradient (t/ha)",
     "am": "የblock አማካዮች የፍሳሽ ልዩነቱን ይከተላሉ (t/ha)"
    },
    "x": {
     "label": "Block",
     "int": true
    },
    "y": {
     "label": "t/ha"
    },
    "series": [
     {
      "name": {
       "en": "Block mean",
       "am": "የblock አማካይ"
      },
      "slot": 2,
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
       2.7651,
       3.3196,
       3.7219,
       3.7479,
       4.2383
      ],
      "tip": [
       "2.765|Block mean · 1",
       "3.32|Block mean · 2",
       "3.722|Block mean · 3",
       "3.748|Block mean · 4",
       "4.238|Block mean · 5"
      ]
     }
    ],
    "table": {
     "cols": [
      "Block",
      {
       "en": "Block mean",
       "am": "የblock አማካይ"
      }
     ],
     "rows": [
      [
       1.0,
       2.765
      ],
      [
       2.0,
       3.32
      ],
      [
       3.0,
       3.722
      ],
      [
       4.0,
       3.748
      ],
      [
       5.0,
       4.238
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Ignoring blocks, the error mean square is 0.331 and treatments look non-significant (p = 0.853).",
    "With blocks, MSE falls to 0.035 and p = 0.043: the gradient was hiding the treatment effects.",
    "Relative efficiency 8.1: these 5 blocks are worth about 41 replicates in a CRD."
   ],
   "am": [
    "blocksን ችላ ስትል error mean square 0.331 ሲሆን ሕክምናዎች ጉልህ ያልሆኑ ይመስላሉ (p = 0.853)።",
    "ከblocks ጋር MSE ወደ 0.035 ይወርዳል፣ p = 0.043፡ ልዩነቱ የሕክምና ውጤቶቹን ይደብቅ ነበር።",
    "አንጻራዊ ቅልጥፍና 8.1፡ እነዚህ 5 blocks በCRD ውስጥ ወደ 41 replicates ያህል ዋጋ አላቸው።"
   ]
  },
  "decision": {
   "en": "Keep blocking along the drainage gradient, with blocks as compact as possible; walk the field before each trial to find the main gradient.",
   "am": "blockingን በፍሳሽ ልዩነቱ ላይ ቀጥል፣ blocks በተቻለ መጠን የታመቁ ይሁኑ፤ ዋናውን ልዩነት ለማግኘት ከእያንዳንዱ ሙከራ በፊት ማሳውን ተዘዋውረህ ተመልከት።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Latin square: two gradients at once",
   "am": "Latin square፡ ሁለት ልዩነቶች በአንድ ጊዜ"
  },
  "goal": {
   "en": "Test 5 potato fertiliser rates on a hillside with a slope gradient and a shade gradient using a 5 × 5 Latin square, and compare with an RCBD analysis.",
   "am": "የተዳፋትና የጥላ ልዩነት ባለው ኮረብታ ላይ 5 የድንች ማዳበሪያ መጠኖችን በ5 × 5 Latin square ፈትሽ፣ ከRCBD ትንተና ጋርም አወዳድር።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
  },
  "tools": [
   {
    "name": "Field plots, pegs, tape, labels",
    "why": {
     "en": "lay out and mark the plots",
     "am": "plotsን ማቀድና ምልክት ማድረግ"
    },
    "get": "research station or farmer field"
   },
   {
    "name": "Field balance",
    "why": {
     "en": "weigh plot yields",
     "am": "የplot ምርቶችን መመዘን"
    },
    "get": "station store"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
   }
  ],
  "steps": {
   "en": [
    "Build a 5 × 5 square: each treatment once in every row (slope) and once in every column (shade).",
    "Randomise by shuffling rows, columns and treatment labels.",
    "Harvest and weigh each plot.",
    "ANOVA with rows, columns and treatments.",
    "Compare the error mean square with an analysis that blocks on rows only."
   ],
   "am": [
    "5 × 5 ካሬ ገንባ፡ እያንዳንዱ ሕክምና በእያንዳንዱ ረድፍ (ተዳፋት) አንድ ጊዜና በእያንዳንዱ ዓምድ (ጥላ) አንድ ጊዜ።",
    "ረድፎችን፣ ዓምዶችንና የሕክምና መለያዎችን በማቀላቀል በዘፈቀደ አድርግ።",
    "እያንዳንዱን plot አጭድና መዝን።",
    "ከረድፎች፣ ከዓምዶችና ከሕክምናዎች ጋር ANOVA።",
    "error mean squareን በረድፎች ብቻ block ከሚያደርግ ትንተና ጋር አወዳድር።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(21); n = 5\nbase = (np.arange(n)[:, None] + np.arange(n)[None, :]) % n                       # cyclic square\nsq = base[rng.permutation(n)][:, rng.permutation(n)]; labels = rng.permutation(n); sq = labels[sq]\nrates = [0, 50, 100, 150, 200]; trt = np.array([0, 4.0, 6.5, 7.5, 7.8])\ny = 18 + np.linspace(-3, 3, n)[:, None] + np.linspace(-2.5, 2.5, n)[None, :] + trt[sq] + rng.normal(0, 1.0, (n, n))   # t/ha\ng = y.mean(); ss_tot = ((y - g) ** 2).sum()\nss_r = n * ((y.mean(1) - g) ** 2).sum(); ss_c = n * ((y.mean(0) - g) ** 2).sum()\ntm = np.array([y[sq == k].mean() for k in range(n)]); ss_t = n * ((tm - g) ** 2).sum()\nmse_ls = (ss_tot - ss_r - ss_c - ss_t) / ((n - 1) * (n - 2)); mse_rows = (ss_tot - ss_r - ss_t) / ((n - 1) * (n - 1))\nF = (ss_t / (n - 1)) / mse_ls; p = stats.f.sf(F, n - 1, (n - 1) * (n - 2))\nprint(\"layout (treatment index per plot):\"); print(sq)\nprint(\"treatment means (t/ha):\", {r: round(float(m), 1) for r, m in zip(rates, tm)})\nprint(f\"MSE Latin square {mse_ls:.2f}; MSE blocking rows only {mse_rows:.2f}; F = {F:.1f}, p = {p:.2g}\")",
  "out": "layout (treatment index per plot):\n[[3 2 1 0 4]\n [0 3 2 4 1]\n [1 4 0 2 3]\n [2 1 4 3 0]\n [4 0 3 1 2]]\ntreatment means (t/ha): {0: 18.4, 50: 22.0, 100: 24.7, 150: 25.7, 200: 26.2}\nMSE Latin square 1.01; MSE blocking rows only 6.74; F = 52.4, p = 1.7e-07",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Potato yield by fertiliser rate (t/ha)",
     "am": "የድንች ምርት በማዳበሪያ መጠን (t/ha)"
    },
    "x": {
     "label": {
      "en": "Fertiliser (kg/ha)",
      "am": "ማዳበሪያ (kg/ha)"
     },
     "int": true
    },
    "y": {
     "label": "t/ha"
    },
    "series": [
     {
      "name": {
       "en": "Mean yield",
       "am": "አማካይ ምርት"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       0.0,
       50.0,
       100.0,
       150.0,
       200.0
      ],
      "y": [
       18.3503,
       21.9516,
       24.6678,
       25.7267,
       26.1783
      ],
      "tip": [
       "18.35|Mean yield · 0",
       "21.95|Mean yield · 50",
       "24.67|Mean yield · 100",
       "25.73|Mean yield · 150",
       "26.18|Mean yield · 200"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Fertiliser (kg/ha)",
       "am": "ማዳበሪያ (kg/ha)"
      },
      {
       "en": "Mean yield",
       "am": "አማካይ ምርት"
      }
     ],
     "rows": [
      [
       0.0,
       18.35
      ],
      [
       50.0,
       21.952
      ],
      [
       100.0,
       24.668
      ],
      [
       150.0,
       25.727
      ],
      [
       200.0,
       26.178
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Error mean square: Latin square vs rows only",
     "am": "Error mean square፡ Latin square vs ረድፎች ብቻ"
    },
    "x": {
     "label": "MSE"
    },
    "fmt": 2,
    "cats": [
     {
      "en": "Rows and columns (Latin square)",
      "am": "ረድፎችና ዓምዶች (Latin square)"
     },
     {
      "en": "Rows only (RCBD)",
      "am": "ረድፎች ብቻ (RCBD)"
     }
    ],
    "series": [
     {
      "name": "MSE",
      "slot": 1,
      "v": [
       1.01,
       6.74
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      "MSE"
     ],
     "rows": [
      [
       {
        "en": "Rows and columns (Latin square)",
        "am": "ረድፎችና ዓምዶች (Latin square)"
       },
       1.01
      ],
      [
       {
        "en": "Rows only (RCBD)",
        "am": "ረድፎች ብቻ (RCBD)"
       },
       6.74
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Removing both gradients gives MSE 1.01, against 6.74 when only the slope is blocked.",
    "Fertiliser effects are clear (F = 52); yield rises steeply to 100 kg/ha and flattens after 150 kg/ha.",
    "A Latin square needs as many replicates as treatments, so it suits 4–8 treatments, not large variety trials."
   ],
   "am": [
    "ሁለቱንም ልዩነቶች ማስወገድ MSE 1.01 ይሰጣል፤ ተዳፋቱ ብቻ block ሲደረግ 6.74።",
    "የማዳበሪያ ውጤቶች ግልጽ ናቸው (F = 52)፤ ምርት እስከ 100 kg/ha በፍጥነት ይጨምራል፣ ከ150 kg/ha በኋላ ይረጋጋል።",
    "Latin square እንደ ሕክምናዎች ብዛት replicates ይፈልጋል፤ ስለዚህ ለ4–8 ሕክምናዎች ይስማማል እንጂ ለትላልቅ የዝርያ ሙከራዎች አይደለም።"
   ]
  },
  "decision": {
   "en": "Use a Latin square when there are two clear gradients and few treatments; for this hillside recommend 100–150 kg/ha and test the economics next.",
   "am": "ሁለት ግልጽ ልዩነቶችና ጥቂት ሕክምናዎች ሲኖሩ Latin square ተጠቀም፤ ለዚህ ኮረብታ 100–150 kg/ha ምከርና ቀጥሎ ኢኮኖሚውን ፈትሽ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Factorial N × P: is there an interaction?",
   "am": "Factorial N × P፡ መስተጋብር አለ?"
  },
  "goal": {
   "en": "Run a 3 × 3 factorial of nitrogen and phosphorus on teff in 3 blocks, test main effects and the interaction, and choose the best combination.",
   "am": "በጤፍ ላይ የናይትሮጅንና የፎስፈረስ 3 × 3 factorialን በ3 blocks አካሂድ፣ ዋና ውጤቶችንና መስተጋብርን ፈትሽ፣ ምርጡን ጥምረት ምረጥ።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
  },
  "tools": [
   {
    "name": "Field plots, pegs, tape, labels",
    "why": {
     "en": "lay out and mark the plots",
     "am": "plotsን ማቀድና ምልክት ማድረግ"
    },
    "get": "research station or farmer field"
   },
   {
    "name": "Field balance",
    "why": {
     "en": "weigh plot yields",
     "am": "የplot ምርቶችን መመዘን"
    },
    "get": "station store"
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
    "Treatments: N 0, 46, 92 kg/ha × P 0, 20, 40 kg/ha = 9 combinations, randomised in each of 3 blocks.",
    "Harvest grain yield per plot.",
    "Two-way ANOVA with blocks: N, P and N × P.",
    "Draw the interaction plot: yield vs N, one line per P level.",
    "Choose the combination; if the interaction is significant, do not judge N without P."
   ],
   "am": [
    "ሕክምናዎች፡ N 0፣ 46፣ 92 kg/ha × P 0፣ 20፣ 40 kg/ha = 9 ጥምረቶች፣ በእያንዳንዱ ከ3 blocks በዘፈቀደ።",
    "የእህል ምርትን በplot አጭድ።",
    "ከblocks ጋር two-way ANOVA፡ N፣ P እና N × P።",
    "የመስተጋብር ቻርቱን ሣል፡ ምርት vs N፣ በP ደረጃ አንድ መስመር።",
    "ጥምረቱን ምረጥ፤ መስተጋብሩ ጉልህ ከሆነ Nን ያለ P አትፍረድ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(3); N, P, b = [0, 46, 92], [0, 20, 40], 3\nmean = np.array([[0.9, 1.1, 1.2], [1.2, 1.7, 1.9], [1.3, 2.0, 2.4]])         # rows N, cols P (t/ha): N works only with P\ny = mean[None] + rng.normal(0, 0.12, (b, 3, 3)) + np.array([-0.1, 0, 0.1])[:, None, None]\ng = y.mean(); ss_tot = ((y - g) ** 2).sum()\nss_blk = 9 * ((y.mean((1, 2)) - g) ** 2).sum(); ss_n = 9 * ((y.mean((0, 2)) - g) ** 2).sum(); ss_p = 9 * ((y.mean((0, 1)) - g) ** 2).sum()\ncell = y.mean(0); ss_cells = b * ((cell - g) ** 2).sum(); ss_np = ss_cells - ss_n - ss_p\nss_e = ss_tot - ss_blk - ss_cells; df_e = (b - 1) * 8; mse = ss_e / df_e\ntests = {\"N\": (ss_n, 2), \"P\": (ss_p, 2), \"N x P\": (ss_np, 4)}\npv = {}\nfor k, (ss, df) in tests.items():\n    F = (ss / df) / mse; pv[k] = stats.f.sf(F, df, df_e); print(f\"{k:6s} F = {F:6.1f}, p = {pv[k]:.2g}\")\nbest = np.unravel_index(cell.argmax(), cell.shape); print(f\"best: N {N[best[0]]} + P {P[best[1]]} = {cell.max():.2f} t/ha\")\ngainN_P0, gainN_P40 = cell[2, 0] - cell[0, 0], cell[2, 2] - cell[0, 2]",
  "out": "N      F =  111.1, p = 4.1e-10\nP      F =   74.6, p = 7.8e-09\nN x P  F =   25.5, p = 9e-07\nbest: N 92 + P 40 = 2.43 t/ha",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Interaction plot: teff yield (t/ha)",
     "am": "የመስተጋብር ቻርት፡ የጤፍ ምርት (t/ha)"
    },
    "x": {
     "label": {
      "en": "Nitrogen (kg/ha)",
      "am": "ናይትሮጅን (kg/ha)"
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
       "en": "P 0 kg/ha",
       "am": "P 0 kg/ha"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       0.0,
       46.0,
       92.0
      ],
      "y": [
       1.1529,
       1.2279,
       1.1963
      ],
      "tip": [
       "1.153|P 0 kg/ha · 0",
       "1.228|P 0 kg/ha · 46",
       "1.196|P 0 kg/ha · 92"
      ],
      "endlabel": {
       "en": "P 0 kg/ha",
       "am": "P 0 kg/ha"
      }
     },
     {
      "name": {
       "en": "P 20 kg/ha",
       "am": "P 20 kg/ha"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       0.0,
       46.0,
       92.0
      ],
      "y": [
       0.9988,
       1.677,
       2.0316
      ],
      "tip": [
       "0.9988|P 20 kg/ha · 0",
       "1.677|P 20 kg/ha · 46",
       "2.032|P 20 kg/ha · 92"
      ],
      "endlabel": {
       "en": "P 20 kg/ha",
       "am": "P 20 kg/ha"
      }
     },
     {
      "name": {
       "en": "P 40 kg/ha",
       "am": "P 40 kg/ha"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       0.0,
       46.0,
       92.0
      ],
      "y": [
       1.2036,
       1.829,
       2.4333
      ],
      "tip": [
       "1.204|P 40 kg/ha · 0",
       "1.829|P 40 kg/ha · 46",
       "2.433|P 40 kg/ha · 92"
      ],
      "endlabel": {
       "en": "P 40 kg/ha",
       "am": "P 40 kg/ha"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Nitrogen (kg/ha)",
       "am": "ናይትሮጅን (kg/ha)"
      },
      {
       "en": "P 0 kg/ha",
       "am": "P 0 kg/ha"
      },
      {
       "en": "P 20 kg/ha",
       "am": "P 20 kg/ha"
      },
      {
       "en": "P 40 kg/ha",
       "am": "P 40 kg/ha"
      }
     ],
     "rows": [
      [
       0.0,
       1.153,
       0.999,
       1.204
      ],
      [
       46.0,
       1.228,
       1.677,
       1.829
      ],
      [
       92.0,
       1.196,
       2.032,
       2.433
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "The N × P interaction is significant (p = 9e-07): the lines are not parallel.",
    "Without P, 92 kg N adds only 0.04 t/ha; with 40 kg P it adds 1.23 t/ha.",
    "The best combination is N 92 + P 40 (2.43 t/ha)."
   ],
   "am": [
    "የN × P መስተጋብር ጉልህ ነው (p = 9e-07)፡ መስመሮቹ ትይዩ አይደሉም።",
    "ያለ P፣ 92 kg N የሚጨምረው 0.04 t/ha ብቻ ነው፤ ከ40 kg P ጋር 1.23 t/ha ይጨምራል።",
    "ምርጡ ጥምረት N 92 + P 40 ነው (2.43 t/ha)።"
   ]
  },
  "decision": {
   "en": "Recommend nitrogen and phosphorus together, never nitrogen alone on these soils; next test whether 92 N + 40 P is also the economic optimum.",
   "am": "በእነዚህ አፈሮች ላይ ናይትሮጅንን ብቻውን በፍጹም ሳይሆን ናይትሮጅንና ፎስፈረስን በአንድ ላይ ምከር፤ ቀጥሎ 92 N + 40 P ኢኮኖሚያዊ ምርጥም መሆኑን ፈትሽ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Split-plot: irrigation × variety with the right error terms",
   "am": "Split-plot፡ መስኖ × ዝርያ ከትክክለኛ የስህተት ቃላት ጋር"
  },
  "goal": {
   "en": "Analyse an onion trial with irrigation on large main plots and varieties on subplots, and show what goes wrong if you analyse it as an ordinary factorial.",
   "am": "መስኖ በትላልቅ ዋና plots ላይና ዝርያዎች በsubplots ላይ ያሉበትን የሽንኩርት ሙከራ ተንትን፣ እንደ ተራ factorial ብትተነትነው ምን እንደሚበላሽ አሳይ።"
  },
  "time": {
   "en": "One season of field work + 1 week of analysis",
   "am": "አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና"
  },
  "tools": [
   {
    "name": "Field plots, pegs, tape, labels",
    "why": {
     "en": "lay out and mark the plots",
     "am": "plotsን ማቀድና ምልክት ማድረግ"
    },
    "get": "research station or farmer field"
   },
   {
    "name": "Field balance",
    "why": {
     "en": "weigh plot yields",
     "am": "የplot ምርቶችን መመዘን"
    },
    "get": "station store"
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
    "name": "SciPy",
    "why": {
     "en": "statistical tests and distributions",
     "am": "የስታቲስቲክስ ፈተናዎችና distributions"
    },
    "get": "pip install scipy"
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
    "Main plots: 3 irrigation intervals (5, 10, 15 days) in 4 blocks (hard to change, so big plots).",
    "Subplots: 4 onion varieties randomised inside each main plot.",
    "Error A (block × irrigation) tests irrigation; error B tests variety and the interaction.",
    "Compare with the wrong analysis that uses one error for everything.",
    "Draw conclusions for each factor."
   ],
   "am": [
    "ዋና plots፡ 3 የመስኖ ክፍተቶች (5፣ 10፣ 15 ቀናት) በ4 blocks (ለመቀየር ከባድ ስለሆኑ ትላልቅ plots)።",
    "Subplots፡ በእያንዳንዱ ዋና plot ውስጥ በዘፈቀደ የተቀመጡ 4 የሽንኩርት ዝርያዎች።",
    "Error A (block × መስኖ) መስኖን ይፈትናል፤ error B ዝርያንና መስተጋብሩን ይፈትናል።",
    "ለሁሉም ነገር አንድ ስህተት ከሚጠቀመው የተሳሳተ ትንተና ጋር አወዳድር።",
    "ለእያንዳንዱ ፋክተር መደምደሚያዎችን አውጣ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(9); b, a, v = 4, 3, 4\nirr = np.array([0.0, -2.0, -6.0]); var = np.array([0.0, 2.5, 1.0, -1.0])\nwhole = rng.normal(0, 2.2, (b, a))                                            # main-plot error: big plots differ a lot\ny = 30 + rng.normal(0, 1, b)[:, None, None] + irr[None, :, None] + var[None, None, :] + whole[:, :, None] + rng.normal(0, 1.0, (b, a, v))\ng = y.mean(); ss_tot = ((y - g) ** 2).sum()\nss_b = a * v * ((y.mean((1, 2)) - g) ** 2).sum(); ss_a = b * v * ((y.mean((0, 2)) - g) ** 2).sum()\nss_main = v * ((y.mean(2) - g) ** 2).sum(); ss_ea = ss_main - ss_b - ss_a\nss_v = b * a * ((y.mean((0, 1)) - g) ** 2).sum(); ss_av = b * ((y.mean(0) - g) ** 2).sum() - ss_a - ss_v\nss_eb = ss_tot - ss_main - ss_v - ss_av\ndf = {\"A\": a - 1, \"Ea\": (b - 1) * (a - 1), \"V\": v - 1, \"AV\": (a - 1) * (v - 1), \"Eb\": a * (b - 1) * (v - 1)}\nms_ea, ms_eb = ss_ea / df[\"Ea\"], ss_eb / df[\"Eb\"]\nright = {\"irrigation\": stats.f.sf((ss_a / df[\"A\"]) / ms_ea, df[\"A\"], df[\"Ea\"]), \"variety\": stats.f.sf((ss_v / df[\"V\"]) / ms_eb, df[\"V\"], df[\"Eb\"]), \"irr x var\": stats.f.sf((ss_av / df[\"AV\"]) / ms_eb, df[\"AV\"], df[\"Eb\"])}\npooled = (ss_ea + ss_eb) / (df[\"Ea\"] + df[\"Eb\"])\nwrong_irr = stats.f.sf((ss_a / df[\"A\"]) / pooled, df[\"A\"], df[\"Ea\"] + df[\"Eb\"])\nprint(f\"error A (main plots) MS {ms_ea:.1f}; error B (subplots) MS {ms_eb:.1f}\")\nprint(\"correct split-plot p-values:\", {k: f\"{p:.2g}\" for k, p in right.items()}); print(f\"wrong analysis, irrigation p = {wrong_irr:.2g}\")\nirr_means = y.mean((0, 2)).round(1); var_means = y.mean((0, 1)).round(1)",
  "out": "error A (main plots) MS 35.1; error B (subplots) MS 1.1\ncorrect split-plot p-values: {'irrigation': '0.061', 'variety': '7.5e-07', 'irr x var': '0.6'}\nwrong analysis, irrigation p = 7.5e-07",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Error mean squares: main plots vs subplots",
     "am": "Error mean squares፡ ዋና plots vs subplots"
    },
    "x": {
     "label": "MS"
    },
    "fmt": 1,
    "cats": [
     {
      "en": "Error A (main plots)",
      "am": "Error A (ዋና plots)"
     },
     {
      "en": "Error B (subplots)",
      "am": "Error B (subplots)"
     }
    ],
    "series": [
     {
      "name": "MS",
      "slot": 1,
      "v": [
       35.1,
       1.1
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      "MS"
     ],
     "rows": [
      [
       {
        "en": "Error A (main plots)",
        "am": "Error A (ዋና plots)"
       },
       35.1
      ],
      [
       {
        "en": "Error B (subplots)",
        "am": "Error B (subplots)"
       },
       1.1
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Onion yield by irrigation interval (t/ha)",
     "am": "የሽንኩርት ምርት በመስኖ ክፍተት (t/ha)"
    },
    "x": {
     "label": "t/ha"
    },
    "fmt": 1,
    "cats": [
     {
      "en": "Every 5 days",
      "am": "በየ5 ቀናት"
     },
     {
      "en": "Every 10 days",
      "am": "በየ10 ቀናት"
     },
     {
      "en": "Every 15 days",
      "am": "በየ15 ቀናት"
     }
    ],
    "series": [
     {
      "name": {
       "en": "t/ha",
       "am": "t/ha"
      },
      "slot": 2,
      "v": [
       31.1,
       29.1,
       24.9
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
       {
        "en": "Every 5 days",
        "am": "በየ5 ቀናት"
       },
       31.1
      ],
      [
       {
        "en": "Every 10 days",
        "am": "በየ10 ቀናት"
       },
       29.1
      ],
      [
       {
        "en": "Every 15 days",
        "am": "በየ15 ቀናት"
       },
       24.9
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Main plots vary much more than subplots (error A 35.1 vs error B 1.1), so irrigation is estimated less precisely.",
    "Correct analysis: irrigation p = 0.061; the wrong single-error analysis gives p = 7.5e-07, far too confident.",
    "Varieties are compared precisely within main plots (p = 7.5e-07)."
   ],
   "am": [
    "ዋና plots ከsubplots በጣም ይለያያሉ (error A 35.1 vs error B 1.1)፤ ስለዚህ መስኖ በያነሰ ትክክለኛነት ይገመታል።",
    "ትክክለኛ ትንተና፡ መስኖ p = 0.061፤ የተሳሳተው ባለአንድ-ስህተት ትንተና p = 7.5e-07 ይሰጣል፣ በጣም ከልክ በላይ እርግጠኛ።",
    "ዝርያዎች በዋና plots ውስጥ በትክክል ይወዳደራሉ (p = 7.5e-07)።"
   ]
  },
  "decision": {
   "en": "Always analyse split-plots with two error terms (or a mixed model with main plot as random); for irrigation conclusions, add main-plot replicates, not subplots.",
   "am": "split-plotsን ሁልጊዜ በሁለት የስህተት ቃላት ተንትን (ወይም ዋና plot random የሆነበት mixed model)፤ ለመስኖ መደምደሚያዎች subplots ሳይሆን የዋና-plot replicates ጨምር።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Messy data: disease scores and a covariate",
   "am": "የተዘበራረቀ ዳታ፡ የበሽታ ውጤቶችና covariate"
  },
  "goal": {
   "en": "Compare fungicides with ordinal rust scores using a Kruskal–Wallis test, and compare pig diets using starting weight as a covariate (ANCOVA).",
   "am": "ፈንገስ መድኃኒቶችን በደረጃ የዝገት ውጤቶች በKruskal–Wallis ፈተና አወዳድር፤ የአሳማ አመጋገቦችንም የመነሻ ክብደትን እንደ covariate (ANCOVA) በመጠቀም አወዳድር።"
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
    "Rust is scored 1–9 on 10 plots per fungicide: scores are ranks, not measurements.",
    "Use Kruskal–Wallis (rank-based) instead of ANOVA.",
    "Pigs: 3 diets × 8 pigs; record starting and final weights.",
    "ANOVA on gain vs ANCOVA adjusting for starting weight.",
    "Report adjusted means."
   ],
   "am": [
    "ዝገት በእያንዳንዱ ፈንገስ መድኃኒት በ10 plots ላይ 1–9 ይመዘገባል፡ ውጤቶቹ ደረጃዎች ናቸው እንጂ ልኬቶች አይደሉም።",
    "ከANOVA ይልቅ Kruskal–Wallis (በደረጃ ላይ የተመሠረተ) ተጠቀም።",
    "አሳማዎች፡ 3 አመጋገቦች × 8 አሳማዎች፤ የመነሻና የመጨረሻ ክብደቶችን መዝግብ።",
    "በጭማሪ ላይ ANOVA vs ለመነሻ ክብደት የሚያስተካክል ANCOVA።",
    "የተስተካከሉ አማካዮችን ዘግብ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nscores = {\"none\": [7, 8, 6, 9, 7, 8, 7, 6, 8, 9], \"fungicide A\": [4, 5, 3, 6, 4, 5, 4, 5, 3, 4], \"fungicide B\": [5, 6, 5, 7, 6, 4, 6, 5, 6, 7]}\nH, p_kw = stats.kruskal(*scores.values()); med = {k: float(np.median(v)) for k, v in scores.items()}\nprint(f\"Kruskal-Wallis H = {H:.1f}, p = {p_kw:.2g}; medians {med}\")\nrng = np.random.default_rng(2); diet = np.repeat([0, 1, 2], 8)\nstart = rng.normal(20, 3, 24); gain = 30 + 1.2 * (start - 20) + np.array([0, 2.0, 3.5])[diet] + rng.normal(0, 1.5, 24)\nF_anova, p_anova = stats.f_oneway(*[gain[diet == d] for d in range(3)])\nX = np.column_stack([np.ones(24), diet == 1, diet == 2, start - start.mean()])\nbeta, res, *_ = np.linalg.lstsq(X, gain, rcond=None); X0 = X[:, [0, 3]]; res0 = np.sum((gain - X0 @ np.linalg.lstsq(X0, gain, rcond=None)[0]) ** 2)\nF_anc = ((res0 - res[0]) / 2) / (res[0] / 20); p_anc = stats.f.sf(F_anc, 2, 20)\nadj = [beta[0], beta[0] + beta[1], beta[0] + beta[2]]; raw = [gain[diet == d].mean() for d in range(3)]\nprint(f\"ANOVA on gain: p = {p_anova:.3f}; ANCOVA with starting weight: p = {p_anc:.2g}, slope {beta[3]:.2f} kg gain per kg start\")\nprint(\"raw means\", np.round(raw, 1), \"adjusted means\", np.round(adj, 1))",
  "out": "Kruskal-Wallis H = 19.6, p = 5.5e-05; medians {'none': 7.5, 'fungicide A': 4.0, 'fungicide B': 6.0}\nANOVA on gain: p = 0.041; ANCOVA with starting weight: p = 0.00023, slope 1.09 kg gain per kg start\nraw means [29.7 32.1 34.2] adjusted means [29.7 32.4 34. ]",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Median rust score (1 = clean, 9 = severe)",
     "am": "Median የዝገት ውጤት (1 = ንጹሕ፣ 9 = ከባድ)"
    },
    "x": {
     "label": {
      "en": "Score",
      "am": "ውጤት"
     }
    },
    "fmt": 1,
    "cats": [
     "none",
     "fungicide A",
     "fungicide B"
    ],
    "series": [
     {
      "name": {
       "en": "Median score",
       "am": "Median ውጤት"
      },
      "slot": 2,
      "v": [
       7.5,
       4.0,
       6.0
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
       "en": "Median score",
       "am": "Median ውጤት"
      }
     ],
     "rows": [
      [
       "none",
       7.5
      ],
      [
       "fungicide A",
       4.0
      ],
      [
       "fungicide B",
       6.0
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Pig weight gain: raw and adjusted for starting weight (kg)",
     "am": "የአሳማ ክብደት ጭማሪ፡ ጥሬና ለመነሻ ክብደት የተስተካከለ (kg)"
    },
    "x": {
     "label": "kg"
    },
    "fmt": 1,
    "cats": [
     {
      "en": "Diet 1",
      "am": "አመጋገብ 1"
     },
     {
      "en": "Diet 2",
      "am": "አመጋገብ 2"
     },
     {
      "en": "Diet 3",
      "am": "አመጋገብ 3"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Raw",
       "am": "ጥሬ"
      },
      "slot": 0,
      "v": [
       29.7,
       32.1,
       34.2
      ]
     },
     {
      "name": {
       "en": "Adjusted",
       "am": "የተስተካከለ"
      },
      "slot": 1,
      "v": [
       29.7,
       32.4,
       34.0
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
       "en": "Raw",
       "am": "ጥሬ"
      },
      {
       "en": "Adjusted",
       "am": "የተስተካከለ"
      }
     ],
     "rows": [
      [
       {
        "en": "Diet 1",
        "am": "አመጋገብ 1"
       },
       29.7,
       29.7
      ],
      [
       {
        "en": "Diet 2",
        "am": "አመጋገብ 2"
       },
       32.1,
       32.4
      ],
      [
       {
        "en": "Diet 3",
        "am": "አመጋገብ 3"
       },
       34.2,
       34.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Fungicides differ in rust scores (Kruskal–Wallis p = 5.5e-05); A gives the lowest median (4).",
    "Plain ANOVA on pig gain gives p = 0.041; adjusting for starting weight gives p = 0.00023, because heavier pigs grow faster and that variation is removed.",
    "Ranks and covariates rescue messy data without throwing away observations."
   ],
   "am": [
    "ፈንገስ መድኃኒቶች በዝገት ውጤቶች ይለያያሉ (Kruskal–Wallis p = 5.5e-05)፤ A ዝቅተኛውን median ይሰጣል (4)።",
    "በአሳማ ጭማሪ ላይ ተራ ANOVA p = 0.041 ይሰጣል፤ ለመነሻ ክብደት ማስተካከል p = 0.00023 ይሰጣል፣ ከበድ ያሉ አሳማዎች በፍጥነት ስለሚያድጉና ያ ልዩነት ስለሚወገድ።",
    "ደረጃዎችና covariates ምልከታዎችን ሳይጥሉ የተዘበራረቀ ዳታን ያድናሉ።"
   ]
  },
  "decision": {
   "en": "Recommend fungicide A; for animal trials always record starting weight and analyse with ANCOVA. Report medians for scores, adjusted means for gains.",
   "am": "ፈንገስ መድኃኒት Aን ምከር፤ ለእንስሳት ሙከራዎች የመነሻ ክብደትን ሁልጊዜ መዝግብና በANCOVA ተንትን። ለውጤቶች mediansን፣ ለጭማሪዎች የተስተካከሉ አማካዮችን ዘግብ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 }
];
