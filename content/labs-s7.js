/* Practical labs, track s, level 7. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[7] = [
 {
  "title": {
   "en": "Designing a community goat breeding programme",
   "am": "የማኅበረሰብ የፍየል እርባታ ፕሮግራም መንደፍ"
  },
  "goal": {
   "en": "Compare three designs for a community-based goat programme (buck selection on own records, pedigree BLUP with recording, genomic selection) on genetic gain, inbreeding and cost.",
   "am": "ለማኅበረሰብ-ተኮር የፍየል ፕሮግራም ሦስት ንድፎችን (በራስ መዝገቦች የወንድ ፍየል ምርጫ፣ ከመመዝገብ ጋር pedigree BLUP፣ genomic selection) በዘረመል ትርፍ፣ በinbreeding እና በወጪ አወዳድር።"
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
    "name": "Spreadsheet",
    "why": {
     "en": "enter and check the raw data",
     "am": "ጥሬ ዳታውን ማስገባትና መፈተሽ"
    },
    "get": "LibreOffice Calc (free) or Google Sheets"
   },
   {
    "name": "Breeding-programme software (e.g. ZPLAN+, MoBPS)",
    "why": {
     "en": "detailed deterministic or stochastic designs",
     "am": "ዝርዝር deterministic ወይም stochastic ንድፎች"
    },
    "get": "mobps.de, zplan.uni-goettingen.de"
   }
  ],
  "steps": {
   "en": [
    "Define the goal trait (6-month weight) with σA = 1.5 kg and h² = 0.25.",
    "For each design set accuracy r, selection intensity i and generation interval L.",
    "Genetic gain per year ΔG = i·r·σA ÷ L.",
    "Inbreeding per generation ΔF = 1/(8Nm) + 1/(8Nf).",
    "Add yearly costs and compute cost per kg of gain across the flock."
   ],
   "am": [
    "የዒላማ ባሕሪውን (የ6-ወር ክብደት) ከσA = 1.5 kg እና h² = 0.25 ጋር ግለጽ።",
    "ለእያንዳንዱ ንድፍ accuracy r፣ የምርጫ ጥንካሬ i እና የትውልድ ልዩነት L አዘጋጅ።",
    "በዓመት የዘረመል ትርፍ ΔG = i·r·σA ÷ L።",
    "በትውልድ inbreeding ΔF = 1/(8Nm) + 1/(8Nf)።",
    "ዓመታዊ ወጪዎችን ጨምርና በመንጋው ላይ በkg ትርፍ ወጪን አስላ።"
   ]
  },
  "code": "import pandas as pd\nsigma_a, does = 1.5, 3000\nd = pd.DataFrame({\"design\": [\"own records\", \"pedigree BLUP\", \"genomic selection\"],\n                  \"accuracy\": [0.50, 0.65, 0.70], \"intensity\": [1.4, 1.6, 1.8], \"L_years\": [2.5, 2.8, 1.8],\n                  \"bucks_used\": [60, 40, 25], \"cost_birr_year\": [150_000, 420_000, 1_400_000]})\nd[\"gain_kg_year\"] = d.intensity * d.accuracy * sigma_a / d.L_years\nd[\"dF_percent_gen\"] = 100 * (1 / (8 * d.bucks_used) + 1 / (8 * does))\nd[\"dF_percent_year\"] = d.dF_percent_gen / d.L_years\nd[\"birr_per_kg_flock\"] = d.cost_birr_year / (d.gain_kg_year * does * 1.5)        # about 1.5 kids per doe a year benefit\nprint(d[[\"design\", \"gain_kg_year\", \"dF_percent_year\", \"birr_per_kg_flock\"]].round(3).to_string(index=False))\nbest = d.loc[d.birr_per_kg_flock.idxmin(), \"design\"]",
  "out": "           design  gain_kg_year  dF_percent_year  birr_per_kg_flock\n      own records         0.420            0.085             79.365\n    pedigree BLUP         0.557            0.113            167.521\ngenomic selection         1.050            0.280            296.296",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Genetic gain per year (kg of 6-month weight)",
     "am": "በዓመት የዘረመል ትርፍ (የ6-ወር ክብደት kg)"
    },
    "x": {
     "label": "kg"
    },
    "fmt": 2,
    "cats": [
     "own records",
     "pedigree BLUP",
     "genomic selection"
    ],
    "series": [
     {
      "name": "kg/year",
      "slot": 1,
      "v": [
       0.42,
       0.56,
       1.05
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Category",
       "am": "ምድብ"
      },
      "kg/year"
     ],
     "rows": [
      [
       "own records",
       0.42
      ],
      [
       "pedigree BLUP",
       0.56
      ],
      [
       "genomic selection",
       1.05
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Inbreeding per year (%) and cost per kg of flock gain (birr ÷ 10)",
     "am": "በዓመት inbreeding (%) እና በkg የመንጋ ትርፍ ወጪ (ብር ÷ 10)"
    },
    "x": {
     "label": {
      "en": "Value",
      "am": "እሴት"
     }
    },
    "fmt": 2,
    "cats": [
     "own records",
     "pedigree BLUP",
     "genomic selection"
    ],
    "series": [
     {
      "name": {
       "en": "ΔF % per year",
       "am": "ΔF % በዓመት"
      },
      "slot": 2,
      "v": [
       0.09,
       0.11,
       0.28
      ]
     },
     {
      "name": {
       "en": "Birr per kg ÷ 10",
       "am": "ብር በkg ÷ 10"
      },
      "slot": 0,
      "v": [
       7.94,
       16.75,
       29.63
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
       "en": "ΔF % per year",
       "am": "ΔF % በዓመት"
      },
      {
       "en": "Birr per kg ÷ 10",
       "am": "ብር በkg ÷ 10"
      }
     ],
     "rows": [
      [
       "own records",
       0.09,
       7.94
      ],
      [
       "pedigree BLUP",
       0.11,
       16.75
      ],
      [
       "genomic selection",
       0.28,
       29.63
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Genomic selection gives the most gain (1.05 kg/year) mainly by shortening the generation interval; pedigree BLUP gives 0.56.",
    "Using few bucks raises inbreeding: 0.50% per generation with 25 bucks, at the lower edge of the 0.5–1% limit.",
    "The cheapest gain per kg comes from “own records”."
   ],
   "am": [
    "Genomic selection ብዙ ትርፍ ይሰጣል (1.05 kg/ዓመት)፣ በዋናነት የትውልድ ልዩነቱን በማሳጠር፤ pedigree BLUP 0.56 ይሰጣል።",
    "ጥቂት ወንድ ፍየሎችን መጠቀም inbreedingን ያሳድጋል፡ በ25 ወንድ ፍየሎች በትውልድ 0.50%፣ በ0.5–1% ገደቡ ዝቅተኛ ጠርዝ።",
    "በkg በጣም ርካሹ ትርፍ ከ«own records» ይመጣል።"
   ]
  },
  "decision": {
   "en": "Start with “own records”: build recording and pedigree first, keep at least 40 bucks in use, and plan genomic selection once a reference population exists.",
   "am": "በ«own records» ጀምር፡ መጀመሪያ መዝገብና pedigree ገንባ፣ ቢያንስ 40 ወንድ ፍየሎችን በአገልግሎት አቆይ፣ የማጣቀሻ ሕዝብ ሲኖር genomic selectionን አቅድ።"
  },
  "note": {
   "en": "Parameters are typical values for community programmes; replace them with your own.",
   "am": "ፓራሜትሮቹ ለማኅበረሰብ ፕሮግራሞች የተለመዱ እሴቶች ናቸው፤ በራስህ ተካቸው።"
  }
 },
 {
  "title": {
   "en": "A selection index for milk and fertility",
   "am": "ለወተትና ለመራባት የምርጫ index"
  },
  "goal": {
   "en": "Build a selection index for dairy cattle that combines milk yield and calving interval with economic weights, and compare the response with selecting on milk alone.",
   "am": "የወተት ምርትንና የመውለጃ ልዩነትን ከኢኮኖሚያዊ ክብደቶች ጋር የሚያዋህድ ለወተት ከብቶች የምርጫ index ገንባ፣ ምላሹን በወተት ብቻ ከሚደረግ ምርጫ ጋር አወዳድር።"
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
    "Traits: milk (kg/lactation) and calving interval (days, lower is better).",
    "Economic weights: +12 birr per kg milk, −500 birr per extra day of calving interval (feed, lost milk and fewer calves).",
    "Phenotypic matrix P and genetic matrix G from the literature (unfavourable genetic correlation +0.35).",
    "Index weights b = P⁻¹ G a; response of each trait and of profit.",
    "Compare with selecting on milk only."
   ],
   "am": [
    "ባሕሪያት፡ ወተት (kg/ላክቴሽን) እና የመውለጃ ልዩነት (ቀናት፣ ዝቅተኛ የተሻለ ነው)።",
    "ኢኮኖሚያዊ ክብደቶች፡ በkg ወተት +12 ብር፣ በእያንዳንዱ ተጨማሪ የመውለጃ ልዩነት ቀን −500 ብር (መኖ፣ የጠፋ ወተትና ጥቂት ጥጆች)።",
    "የphenotypic ማትሪክስ P እና የgenetic ማትሪክስ G ከጽሑፎች (የማይመች genetic correlation +0.35)።",
    "የindex ክብደቶች b = P⁻¹ G a፤ የእያንዳንዱ ባሕሪና የትርፍ ምላሽ።",
    "በወተት ብቻ ከመምረጥ ጋር አወዳድር።"
   ]
  },
  "code": "import numpy as np\nsd_p = np.array([600.0, 45.0]); h2 = np.array([0.25, 0.05]); rg, rp = 0.35, 0.10\nsd_g = sd_p * np.sqrt(h2)\nP = np.array([[sd_p[0] ** 2, rp * sd_p[0] * sd_p[1]], [rp * sd_p[0] * sd_p[1], sd_p[1] ** 2]])\nG = np.array([[sd_g[0] ** 2, rg * sd_g[0] * sd_g[1]], [rg * sd_g[0] * sd_g[1], sd_g[1] ** 2]])\na = np.array([12.0, -500.0]); i = 1.4\ndef response(b):\n    sd_i = np.sqrt(b @ P @ b); r = i * (G @ b) / sd_i; return r, a @ r\nb_index = np.linalg.solve(P, G @ a); b_milk = np.array([1.0, 0.0])\nr_idx, profit_idx = response(b_index); r_milk, profit_milk = response(b_milk)\nprint(f\"index weights: milk {b_index[0]:.2f}, calving interval {b_index[1]:.2f}\")\nprint(f\"milk only : +{r_milk[0]:.0f} kg milk, {r_milk[1]:+.1f} days CI, profit {profit_milk:,.0f} birr per cow per generation\")\nprint(f\"index     : +{r_idx[0]:.0f} kg milk, {r_idx[1]:+.1f} days CI, profit {profit_idx:,.0f} birr per cow per generation\")",
  "out": "index weights: milk 1.69, calving interval -20.99\nmilk only : +210 kg milk, +2.5 days CI, profit 1,287 birr per cow per generation\nindex     : +138 kg milk, -0.4 days CI, profit 1,841 birr per cow per generation",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Response per generation of selection",
     "am": "በትውልድ የምርጫ ምላሽ"
    },
    "x": {
     "label": {
      "en": "Change",
      "am": "ለውጥ"
     }
    },
    "fmt": 1,
    "cats": [
     {
      "en": "Milk (kg ÷ 10)",
      "am": "ወተት (kg ÷ 10)"
     },
     {
      "en": "Calving interval (days)",
      "am": "የመውለጃ ልዩነት (ቀናት)"
     },
     {
      "en": "Profit (birr ÷ 100)",
      "am": "ትርፍ (ብር ÷ 100)"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Milk only",
       "am": "ወተት ብቻ"
      },
      "slot": 2,
      "v": [
       21.0,
       2.5,
       12.9
      ]
     },
     {
      "name": {
       "en": "Economic index",
       "am": "ኢኮኖሚያዊ index"
      },
      "slot": 1,
      "v": [
       13.8,
       -0.4,
       18.4
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
       "en": "Milk only",
       "am": "ወተት ብቻ"
      },
      {
       "en": "Economic index",
       "am": "ኢኮኖሚያዊ index"
      }
     ],
     "rows": [
      [
       {
        "en": "Milk (kg ÷ 10)",
        "am": "ወተት (kg ÷ 10)"
       },
       21.0,
       13.8
      ],
      [
       {
        "en": "Calving interval (days)",
        "am": "የመውለጃ ልዩነት (ቀናት)"
       },
       2.5,
       -0.4
      ],
      [
       {
        "en": "Profit (birr ÷ 100)",
        "am": "ትርፍ (ብር ÷ 100)"
       },
       12.9,
       18.4
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Selecting on milk alone gains 210 kg but lengthens the calving interval by 2.5 days, because the genetic correlation is unfavourable.",
    "The index gives less milk (138 kg) but holds calving interval at -0.4 days.",
    "Profit per cow per generation: 1,841 birr with the index vs 1,287 with milk only."
   ],
   "am": [
    "በወተት ብቻ መምረጥ 210 kg ያተርፋል ግን የመውለጃ ልዩነቱን በ2.5 ቀናት ያራዝማል፣ የgenetic correlation የማይመች ስለሆነ።",
    "indexኡ ያነሰ ወተት (138 kg) ይሰጣል፣ ግን የመውለጃ ልዩነቱን በ-0.4 ቀናት ይይዛል።",
    "በላም በትውልድ ትርፍ፡ ከindex ጋር 1,841 ብር vs በወተት ብቻ 1,287።"
   ]
  },
  "decision": {
   "en": "Rank bulls on the economic index, not on milk alone; record calving dates in every herd so fertility EBVs become accurate, and review the economic weights every 3 years.",
   "am": "ወይፈኖችን በወተት ብቻ ሳይሆን በኢኮኖሚያዊ indexኡ ደርድር፤ የመራባት EBVs ትክክለኛ እንዲሆኑ በእያንዳንዱ መንጋ የመውለጃ ቀኖችን መዝግብ፣ ኢኮኖሚያዊ ክብደቶቹን በየ3 ዓመቱ ገምግም።"
  },
  "note": {
   "en": "Genetic parameters are typical literature values for tropical dairy cattle.",
   "am": "የዘረመል ፓራሜትሮቹ ለሞቃታማ የወተት ከብቶች የተለመዱ የጽሑፍ እሴቶች ናቸው።"
  }
 },
 {
  "title": {
   "en": "How many locations and replicates? Optimising a testing network",
   "am": "ስንት ቦታዎችና replicates? የፈተና ኔትወርክን ማመቻቸት"
  },
  "goal": {
   "en": "With a fixed budget of 600 plots per entry-year, find the number of locations and replicates that maximises the heritability of entry means and the response to selection.",
   "am": "በዓመት በግቤት 600 plots ቋሚ በጀት፣ የግቤት አማካዮችን heritability እና የምርጫ ምላሽን ከፍተኛ የሚያደርገውን የቦታዎችና የreplicates ብዛት ፈልግ።"
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
    "Get variance components from past trials: σ²G, σ²GL (genotype × location) and σ²e.",
    "For L locations and r replicates: H² = σ²G ÷ (σ²G + σ²GL/L + σ²e/(L·r)).",
    "Total plots = entries × L × r, fixed by the budget.",
    "Evaluate all allowed combinations and the cost per location (travel, staff).",
    "Choose the design."
   ],
   "am": [
    "ከቀደሙ ሙከራዎች variance components ውሰድ፡ σ²G፣ σ²GL (genotype × ቦታ) እና σ²e።",
    "ለL ቦታዎችና r replicates፡ H² = σ²G ÷ (σ²G + σ²GL/L + σ²e/(L·r))።",
    "ጠቅላላ plots = ግቤቶች × L × r፣ በበጀቱ የተወሰነ።",
    "ሁሉንም የተፈቀዱ ጥምረቶችና በቦታ ወጪን (ጉዞ፣ ሠራተኞች) ገምግም።",
    "ንድፉን ምረጥ።"
   ]
  },
  "code": "import numpy as np\nvg, vgl, ve = 0.10, 0.12, 0.30                       # (t/ha)^2 from past maize trials\nentries, plots_budget = 50, 600\ndesigns = [(L, r) for L in range(2, 13) for r in (1, 2, 3, 4) if L * r <= plots_budget // entries]      # at most 12 plots per entry\nH2 = {(L, r): vg / (vg + vgl / L + ve / (L * r)) for L, r in designs}\nbest = max(H2, key=H2.get)\nfor r in (1, 2, 3, 4):\n    print(f\"r = {r}: \" + \", \".join(f\"L={L}: {H2[(L, rr)]:.2f}\" for (L, rr) in designs if rr == r))\nprint(f\"best with 12 plots per entry: {best[0]} locations x {best[1]} replicate(s), H2 = {H2[best]:.2f}\")\nsame_plots = {f\"{L} loc x {r} rep\": round(H2[(L, r)], 3) for (L, r) in [(3, 4), (4, 3), (6, 2), (12, 1)]}",
  "out": "r = 1: L=2: 0.32, L=3: 0.42, L=4: 0.49, L=5: 0.54, L=6: 0.59, L=7: 0.62, L=8: 0.66, L=9: 0.68, L=10: 0.70, L=11: 0.72, L=12: 0.74\nr = 2: L=2: 0.43, L=3: 0.53, L=4: 0.60, L=5: 0.65, L=6: 0.69\nr = 3: L=2: 0.48, L=3: 0.58, L=4: 0.65\nr = 4: L=2: 0.51, L=3: 0.61\nbest with 12 plots per entry: 12 locations x 1 replicate(s), H2 = 0.74",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Heritability of entry means, 12 plots per entry",
     "am": "የግቤት አማካዮች heritability፣ በግቤት 12 plots"
    },
    "x": {
     "label": {
      "en": "Locations (replicates = 12 ÷ locations)",
      "am": "ቦታዎች (replicates = 12 ÷ ቦታዎች)"
     },
     "int": true
    },
    "y": {
     "label": "H²",
     "min": 0,
     "max": 1
    },
    "series": [
     {
      "name": {
       "en": "H²",
       "am": "H²"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       3.0,
       4.0,
       6.0,
       12.0
      ],
      "y": [
       0.606,
       0.645,
       0.69,
       0.741
      ],
      "tip": [
       "0.606|H² · 3",
       "0.645|H² · 4",
       "0.69|H² · 6",
       "0.741|H² · 12"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Locations (replicates = 12 ÷ locations)",
       "am": "ቦታዎች (replicates = 12 ÷ ቦታዎች)"
      },
      {
       "en": "H²",
       "am": "H²"
      }
     ],
     "rows": [
      [
       3.0,
       0.606
      ],
      [
       4.0,
       0.645
      ],
      [
       6.0,
       0.69
      ],
      [
       12.0,
       0.741
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Heritability by locations and replicates",
     "am": "Heritability በቦታዎችና በreplicates"
    },
    "x": {
     "label": {
      "en": "Locations",
      "am": "ቦታዎች"
     },
     "int": true
    },
    "y": {
     "label": "H²",
     "min": 0,
     "max": 1
    },
    "series": [
     {
      "name": {
       "en": "1 rep",
       "am": "1 rep"
      },
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
       0.3226,
       0.4167,
       0.4878,
       0.5435,
       0.5882
      ],
      "tip": [
       "0.3226|1 rep · 2",
       "0.4167|1 rep · 3",
       "0.4878|1 rep · 4",
       "0.5435|1 rep · 5",
       "0.5882|1 rep · 6"
      ],
      "endlabel": {
       "en": "1 rep",
       "am": "1 rep"
      }
     },
     {
      "name": {
       "en": "2 rep",
       "am": "2 rep"
      },
      "slot": 2,
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
       0.4255,
       0.5263,
       0.597,
       0.6494,
       0.6897
      ],
      "tip": [
       "0.4255|2 rep · 2",
       "0.5263|2 rep · 3",
       "0.597|2 rep · 4",
       "0.6494|2 rep · 5",
       "0.6897|2 rep · 6"
      ],
      "endlabel": {
       "en": "2 rep",
       "am": "2 rep"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Locations",
       "am": "ቦታዎች"
      },
      {
       "en": "1 rep",
       "am": "1 rep"
      },
      {
       "en": "2 rep",
       "am": "2 rep"
      }
     ],
     "rows": [
      [
       2.0,
       0.323,
       0.426
      ],
      [
       3.0,
       0.417,
       0.526
      ],
      [
       4.0,
       0.488,
       0.597
      ],
      [
       5.0,
       0.543,
       0.649
      ],
      [
       6.0,
       0.588,
       0.69
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "With 12 plots per entry, 12 locations × 1 replicate gives H² = 0.74; 3 locations × 4 replicates only 0.61.",
    "G × L variance is larger than half the plot error here, so more locations beat more replicates.",
    "One replicate per site is risky (no within-site error estimate); 6 locations × 2 replicates is a safe compromise."
   ],
   "am": [
    "በግቤት 12 plots ሲሆኑ 12 ቦታዎች × 1 replicate H² = 0.74 ይሰጣሉ፤ 3 ቦታዎች × 4 replicates 0.61 ብቻ።",
    "እዚህ የG × L variance ከplot ስህተቱ ግማሽ ይበልጣል፤ ስለዚህ ተጨማሪ ቦታዎች ተጨማሪ replicatesን ያሸንፋሉ።",
    "በቦታ አንድ replicate አደገኛ ነው (በቦታ ውስጥ የስህተት ግምት የለም)፤ 6 ቦታዎች × 2 replicates ደህንነቱ የተጠበቀ ስምምነት ነው።"
   ]
  },
  "decision": {
   "en": "Run the next stage at 6 locations × 2 replicates (H² 0.69), choosing locations that represent the target environments; drop to 1 replicate at extra sites if budget allows more locations.",
   "am": "ቀጣዩን ደረጃ በ6 ቦታዎች × 2 replicates (H² 0.69) አካሂድ፣ የዒላማ አካባቢዎችን የሚወክሉ ቦታዎችን መርጠህ፤ በጀቱ ተጨማሪ ቦታዎችን ከፈቀደ በተጨማሪ ቦታዎች ወደ 1 replicate ውረድ።"
  },
  "note": {
   "en": "Variance components are typical for maize yield trials.",
   "am": "Variance components ለበቆሎ የምርት ሙከራዎች የተለመዱ ናቸው።"
  }
 },
 {
  "title": {
   "en": "20-year simulation: is the breeding programme a good investment?",
   "am": "የ20-ዓመት ማስመሰል፡ የእርባታ ፕሮግራሙ ጥሩ ኢንቨስትመንት ነው?"
  },
  "goal": {
   "en": "Simulate 20 years of a sheep breeding programme with uncertain genetic gain, adoption and prices, discount costs and benefits, and estimate the chance that it pays off.",
   "am": "እርግጠኛ ያልሆኑ የዘረመል ትርፍ፣ ተቀባይነትና ዋጋዎች ያሉትን የበግ እርባታ ፕሮግራም 20 ዓመታት አስመስል፣ ወጪዎችንና ጥቅሞችን discount አድርግ፣ የመዋጣቱን ዕድል ገምት።"
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
    "Costs: 6 M birr in year 1 (set-up), then 2.5 M per year (recording, staff, ram distribution).",
    "Gain per year ~ Normal(0.35, 0.08) kg per lamb; benefits start in year 3 and accumulate.",
    "Adoption grows from about 1% to a maximum of 10–50% of 200,000 lambs.",
    "Price per kg ~ Normal(250, 40) birr; discount rate 10%.",
    "Repeat 5,000 times; report NPV distribution and P(NPV > 0)."
   ],
   "am": [
    "ወጪዎች፡ በዓመት 1 6 M ብር (ማቋቋሚያ)፣ ከዚያ በዓመት 2.5 M (መዝገብ፣ ሠራተኞች፣ የአውራ በግ ስርጭት)።",
    "በዓመት ትርፍ ~ Normal(0.35, 0.08) kg በጠቦት፤ ጥቅሞች በዓመት 3 ይጀምራሉ፣ ይጠራቀማሉ።",
    "ተቀባይነት ከ1% ገደማ ወደ ከ200,000 ጠቦቶች ከፍተኛ 10–50% ያድጋል።",
    "በkg ዋጋ ~ Normal(250, 40) ብር፤ የdiscount መጠን 10%።",
    "5,000 ጊዜ ድገም፤ የNPV ስርጭትንና P(NPV > 0)ን ዘግብ።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(9); S, Y = 5000, 20\nyears = np.arange(1, Y + 1); disc = 1.10 ** -years\ncost = np.where(years == 1, 6.0e6, 2.5e6)\ngain = rng.normal(0.35, 0.08, S).clip(0.05)[:, None]\ncum_gain = gain * np.clip(years - 2, 0, None)[None, :]                         # kg per lamb, accumulating from year 3\nadopt_max = rng.uniform(0.10, 0.50, S)[:, None]; adopt = adopt_max / (1 + np.exp(-(years - 8) / 2))\nprice = rng.normal(250, 40, S).clip(100)[:, None]\nbenefit = cum_gain * adopt * 200_000 * price\nnpv = ((benefit - cost) * disc).sum(1) / 1e6                                  # million birr\ncum = np.cumsum((benefit - cost) * disc, axis=1) / 1e6\nmed_path = np.median(cum, 0); lo_path, hi_path = np.percentile(cum, [10, 90], axis=0)\npayback = int(years[np.argmax(med_path > 0)]) if (med_path > 0).any() else None\nprint(f\"NPV: median {np.median(npv):,.0f} M birr, 10-90% range {np.percentile(npv, 10):,.0f} to {np.percentile(npv, 90):,.0f}; P(NPV > 0) = {np.mean(npv > 0):.0%}\")\nprint(f\"median discounted payback year: {payback}\")",
  "out": "NPV: median 152 M birr, 10-90% range 53 to 296; P(NPV > 0) = 100%\nmedian discounted payback year: 8",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Cumulative discounted net value (million birr)",
     "am": "የተጠራቀመ discount የተደረገ የተጣራ ዋጋ (ሚሊዮን ብር)"
    },
    "x": {
     "label": {
      "en": "Year",
      "am": "ዓመት"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Million birr",
      "am": "ሚሊዮን ብር"
     }
    },
    "series": [
     {
      "name": {
       "en": "10th percentile",
       "am": "10ኛ percentile"
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
       -5.4545,
       -7.5207,
       -9.2764,
       -10.6337,
       -11.4551,
       -11.5603,
       -10.7597,
       -8.9159,
       -6.0018,
       -2.116,
       2.5546,
       7.7942,
       13.4032,
       19.219,
       25.1177,
       31.0088,
       36.8269,
       42.5252,
       48.0704,
       53.4392
      ],
      "tip": [
       "-5.455|10th percentile · 1",
       "-7.521|10th percentile · 2",
       "-9.276|10th percentile · 3",
       "-10.63|10th percentile · 4",
       "-11.46|10th percentile · 5",
       "-11.56|10th percentile · 6",
       "-10.76|10th percentile · 7",
       "-8.916|10th percentile · 8",
       "-6.002|10th percentile · 9",
       "-2.116|10th percentile · 10",
       "2.555|10th percentile · 11",
       "7.794|10th percentile · 12",
       "13.4|10th percentile · 13",
       "19.22|10th percentile · 14",
       "25.12|10th percentile · 15",
       "31.01|10th percentile · 16",
       "36.83|10th percentile · 17",
       "42.53|10th percentile · 18",
       "48.07|10th percentile · 19",
       "53.44|10th percentile · 20"
      ],
      "endlabel": {
       "en": "10th percentile",
       "am": "10ኛ percentile"
      }
     },
     {
      "name": {
       "en": "Median",
       "am": "Median"
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
       -5.4545,
       -7.5207,
       -9.1216,
       -10.0367,
       -9.9354,
       -8.3915,
       -4.9604,
       0.6839,
       8.6161,
       18.6251,
       30.2991,
       43.1599,
       56.7652,
       70.7552,
       84.8573,
       98.8734,
       112.6619,
       126.1226,
       139.1854,
       151.802
      ],
      "tip": [
       "-5.455|Median · 1",
       "-7.521|Median · 2",
       "-9.122|Median · 3",
       "-10.04|Median · 4",
       "-9.935|Median · 5",
       "-8.391|Median · 6",
       "-4.96|Median · 7",
       "0.6839|Median · 8",
       "8.616|Median · 9",
       "18.63|Median · 10",
       "30.3|Median · 11",
       "43.16|Median · 12",
       "56.77|Median · 13",
       "70.76|Median · 14",
       "84.86|Median · 15",
       "98.87|Median · 16",
       "112.7|Median · 17",
       "126.1|Median · 18",
       "139.2|Median · 19",
       "151.8|Median · 20"
      ],
      "endlabel": {
       "en": "Median",
       "am": "Median"
      }
     },
     {
      "name": {
       "en": "90th percentile",
       "am": "90ኛ percentile"
      },
      "slot": 0,
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
       -5.4545,
       -7.5207,
       -8.8945,
       -9.1607,
       -7.7051,
       -3.7414,
       3.55,
       14.7715,
       30.0677,
       49.0624,
       71.0139,
       95.0588,
       120.3985,
       146.384,
       172.5245,
       198.464,
       223.9489,
       248.8009,
       272.8957,
       296.1483
      ],
      "tip": [
       "-5.455|90th percentile · 1",
       "-7.521|90th percentile · 2",
       "-8.894|90th percentile · 3",
       "-9.161|90th percentile · 4",
       "-7.705|90th percentile · 5",
       "-3.741|90th percentile · 6",
       "3.55|90th percentile · 7",
       "14.77|90th percentile · 8",
       "30.07|90th percentile · 9",
       "49.06|90th percentile · 10",
       "71.01|90th percentile · 11",
       "95.06|90th percentile · 12",
       "120.4|90th percentile · 13",
       "146.4|90th percentile · 14",
       "172.5|90th percentile · 15",
       "198.5|90th percentile · 16",
       "223.9|90th percentile · 17",
       "248.8|90th percentile · 18",
       "272.9|90th percentile · 19",
       "296.1|90th percentile · 20"
      ],
      "endlabel": {
       "en": "90th percentile",
       "am": "90ኛ percentile"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Year",
       "am": "ዓመት"
      },
      {
       "en": "10th percentile",
       "am": "10ኛ percentile"
      },
      {
       "en": "Median",
       "am": "Median"
      },
      {
       "en": "90th percentile",
       "am": "90ኛ percentile"
      }
     ],
     "rows": [
      [
       1.0,
       -5.455,
       -5.455,
       -5.455
      ],
      [
       2.0,
       -7.521,
       -7.521,
       -7.521
      ],
      [
       3.0,
       -9.276,
       -9.122,
       -8.894
      ],
      [
       4.0,
       -10.634,
       -10.037,
       -9.161
      ],
      [
       5.0,
       -11.455,
       -9.935,
       -7.705
      ],
      [
       6.0,
       -11.56,
       -8.391,
       -3.741
      ],
      [
       7.0,
       -10.76,
       -4.96,
       3.55
      ],
      [
       8.0,
       -8.916,
       0.684,
       14.772
      ],
      [
       9.0,
       -6.002,
       8.616,
       30.068
      ],
      [
       10.0,
       -2.116,
       18.625,
       49.062
      ],
      [
       11.0,
       2.555,
       30.299,
       71.014
      ],
      [
       12.0,
       7.794,
       43.16,
       95.059
      ],
      [
       13.0,
       13.403,
       56.765,
       120.399
      ],
      [
       14.0,
       19.219,
       70.755,
       146.384
      ],
      [
       15.0,
       25.118,
       84.857,
       172.525
      ],
      [
       16.0,
       31.009,
       98.873,
       198.464
      ],
      [
       17.0,
       36.827,
       112.662,
       223.949
      ],
      [
       18.0,
       42.525,
       126.123,
       248.801
      ],
      [
       19.0,
       48.07,
       139.185,
       272.896
      ],
      [
       20.0,
       53.439,
       151.802,
       296.148
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
    "rpad": 120
   }
  ],
  "analysis": {
   "en": [
    "The median NPV over 20 years is 152 million birr; 80% of simulations fall between 53 and 296.",
    "The programme pays off in 100% of simulations; the median path breaks even in year 8.",
    "Benefits come late because genetic gain accumulates and adoption spreads slowly: the first years are pure cost."
   ],
   "am": [
    "በ20 ዓመታት median NPV 152 ሚሊዮን ብር ነው፤ 80% ማስመሰሎች ከ53 እስከ 296 ይወድቃሉ።",
    "ፕሮግራሙ በ100% ማስመሰሎች ያዋጣል፤ median መንገዱ በዓመት 8 ይመጣጠናል።",
    "የዘረመል ትርፍ ስለሚጠራቀምና ተቀባይነት በዝግታ ስለሚስፋፋ ጥቅሞች ዘግይተው ይመጣሉ፡ የመጀመሪያዎቹ ዓመታት ንጹሕ ወጪ ናቸው።"
   ]
  },
  "decision": {
   "en": "Fund the programme with a 10-year commitment (shorter funding would stop it before it pays), and invest early in ram distribution to speed adoption, the biggest lever.",
   "am": "ፕሮግራሙን በ10-ዓመት ቁርጠኝነት ፈንድ (አጭር ገንዘብ ከመዋጣቱ በፊት ያቆመዋል)፣ ትልቁ መሣሪያ የሆነውን ተቀባይነት ለማፋጠን በአውራ በግ ስርጭት ላይ ቀደም ብለህ ኢንቨስት አድርግ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Multi-omics integration: do metabolites add to genotypes?",
   "am": "Multi-omics ውህደት፡ metabolites በgenotypes ላይ ይጨምራሉ?"
  },
  "goal": {
   "en": "Predict a heat-tolerance trait in 400 sheep from SNPs, from blood metabolites, and from both, with cross-validation, and decide whether metabolomics is worth its cost.",
   "am": "በ400 በጎች ውስጥ የሙቀት-መቋቋም ባሕሪን ከSNPs፣ ከደም metabolites እና ከሁለቱም በcross-validation ተንብይ፣ metabolomics ለወጪው ያዋጣ እንደሆነ ወስን።"
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
    "name": "R: mixOmics or MOFA2 (next step)",
    "why": {
     "en": "multi-omics factor models",
     "am": "የmulti-omics factor ሞዴሎች"
    },
    "get": "bioconductor.org"
   }
  ],
  "steps": {
   "en": [
    "Data: 400 animals × 3,000 SNPs and × 150 metabolites (log-transformed, scaled).",
    "Model 1: ridge on SNPs; model 2: ridge on metabolites; model 3: both blocks, each scaled to equal total variance.",
    "5-fold cross-validation; accuracy = correlation with the observed trait.",
    "Look at the top metabolites in the combined model.",
    "Weigh accuracy gain against cost per animal."
   ],
   "am": [
    "ዳታ፡ 400 እንስሳት × 3,000 SNPs እና × 150 metabolites (log-transformed፣ scaled)።",
    "ሞዴል 1፡ በSNPs ላይ ridge፤ ሞዴል 2፡ በmetabolites ላይ ridge፤ ሞዴል 3፡ ሁለቱም blocks፣ እያንዳንዱ ወደ እኩል ጠቅላላ variance scaled።",
    "5-fold cross-validation፤ accuracy = ከተመለከተው ባሕሪ ጋር correlation።",
    "በተዋሃደው ሞዴል ውስጥ ዋናዎቹን metabolites ተመልከት።",
    "የaccuracy ትርፍን ከበእንስሳ ወጪ ጋር መዝን።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.linear_model import RidgeCV\nfrom sklearn.model_selection import cross_val_predict, KFold\nrng = np.random.default_rng(6); n, p, q = 400, 3000, 150\nG = rng.binomial(2, rng.uniform(0.05, 0.5, p), (n, p)).astype(float); G = (G - G.mean(0)) / (G.std(0) + 1e-9)\ng = G[:, :200] @ rng.normal(0, 1, 200); g = g / g.std() * 0.55                    # genetic part\nenv = rng.normal(0, 0.6, n)                                                       # physiology not explained by SNPs\nM = np.column_stack([0.7 * env + 0.3 * g + rng.normal(0, 0.6, n) for _ in range(12)] + [rng.normal(0, 1, n) for _ in range(q - 12)])\nM = (M - M.mean(0)) / M.std(0); y = g + env + rng.normal(0, 0.6, n)\nblocks = {\"SNPs\": G / np.sqrt(p), \"metabolites\": M / np.sqrt(q), \"SNPs + metabolites\": np.hstack([G / np.sqrt(p), M / np.sqrt(q)])}\nacc = {}\nfor k, X in blocks.items():\n    pred = cross_val_predict(RidgeCV(alphas=np.logspace(-3, 3, 13)), X, y, cv=KFold(5, shuffle=True, random_state=0))\n    acc[k] = float(np.corrcoef(pred, y)[0, 1]); print(f\"{k:20s} accuracy {acc[k]:.2f}\")\ncoef = RidgeCV(alphas=np.logspace(-3, 3, 13)).fit(blocks[\"SNPs + metabolites\"], y).coef_[p:]\ntop = np.argsort(-abs(coef))[:5]; print(\"top metabolites:\", [f\"M{j + 1}\" for j in top])\ncost = {\"SNPs\": 35, \"metabolites\": 90, \"SNPs + metabolites\": 125}                 # USD per animal",
  "out": "SNPs                 accuracy 0.08\nmetabolites          accuracy 0.65\nSNPs + metabolites   accuracy 0.65\ntop metabolites: ['M6', 'M2', 'M4', 'M7', 'M12']",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Cross-validated prediction accuracy",
     "am": "Cross-validated የትንበያ accuracy"
    },
    "x": {
     "label": "r"
    },
    "fmt": 2,
    "cats": [
     "SNPs",
     "metabolites",
     "SNPs + metabolites"
    ],
    "series": [
     {
      "name": {
       "en": "Accuracy",
       "am": "Accuracy"
      },
      "slot": 1,
      "v": [
       0.08,
       0.65,
       0.65
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
       "en": "Accuracy",
       "am": "Accuracy"
      }
     ],
     "rows": [
      [
       "SNPs",
       0.08
      ],
      [
       "metabolites",
       0.65
      ],
      [
       "SNPs + metabolites",
       0.65
      ]
     ]
    },
    "note": {
     "en": "Cost per animal: SNP chip 35 USD, metabolomics panel 90 USD.",
     "am": "በእንስሳ ወጪ፡ SNP chip 35 USD፣ metabolomics panel 90 USD።"
    }
   }
  ],
  "analysis": {
   "en": [
    "SNPs alone predict with accuracy 0.08; metabolites alone 0.65.",
    "Together they reach 0.65: metabolites capture physiological state that genotypes cannot.",
    "The top metabolites (M6, M2, M4) are candidates for a cheap targeted assay."
   ],
   "am": [
    "SNPs ብቻቸውን በ0.08 accuracy ይተነብያሉ፤ metabolites ብቻቸውን 0.65።",
    "በአንድ ላይ 0.65 ይደርሳሉ፡ metabolites genotypes ሊይዙት የማይችሉትን የፊዚዮሎጂ ሁኔታ ይይዛሉ።",
    "ዋናዎቹ metabolites (M6, M2, M4) ለርካሽ ያነጣጠረ ምርመራ ዕጩዎች ናቸው።"
   ]
  },
  "decision": {
   "en": "Use metabolomics to phenotype heat tolerance in a reference group, not on every animal; develop a targeted assay for the top metabolites, and keep genomic selection for breeding values (only SNPs are inherited).",
   "am": "የሙቀት መቋቋምን phenotype ለማድረግ metabolomicsን በማጣቀሻ ቡድን ውስጥ ተጠቀም እንጂ በእያንዳንዱ እንስሳ ላይ አይደለም፤ ለዋናዎቹ metabolites ያነጣጠረ ምርመራ አዘጋጅ፣ ለbreeding values genomic selectionን አቆይ (የሚወረሱት SNPs ብቻ ናቸው)።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Business plan for an agricultural statistics service",
   "am": "ለግብርና የስታቲስቲክስ አገልግሎት የንግድ ዕቅድ"
  },
  "goal": {
   "en": "Model the revenue, costs, capacity and break-even of a small analytics company offering trial design, data analysis and training to research centres and companies.",
   "am": "ለምርምር ማዕከላትና ለኩባንያዎች የሙከራ ንድፍ፣ የዳታ ትንተናና ሥልጠና የሚሰጥ ትንሽ የትንተና ኩባንያ ገቢን፣ ወጪዎችን፣ አቅምንና የሚመጣጠንበትን ነጥብ ሞዴል አድርግ።"
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
    "List services with price and analyst hours: trial design, full analysis, training course, monthly dashboard subscription.",
    "Estimate monthly demand for year 1 and year 2.",
    "Capacity: analysts × 120 billable hours per month.",
    "Fixed costs (salaries, office, software, computing) and variable costs.",
    "Break-even month and the hire decision."
   ],
   "am": [
    "አገልግሎቶችን ከዋጋና ከተንታኝ ሰዓታት ጋር ዘርዝር፡ የሙከራ ንድፍ፣ ሙሉ ትንተና፣ የሥልጠና ኮርስ፣ ወርሃዊ የdashboard ምዝገባ።",
    "ለዓመት 1 እና ለዓመት 2 ወርሃዊ ፍላጎትን ገምት።",
    "አቅም፡ ተንታኞች × በወር 120 የሚከፈልባቸው ሰዓታት።",
    "ቋሚ ወጪዎች (ደመወዝ፣ ቢሮ፣ ሶፍትዌር፣ ኮምፒውቲንግ) እና ተለዋዋጭ ወጪዎች።",
    "የሚመጣጠንበት ወርና የቅጥር ውሳኔ።"
   ]
  },
  "code": "import numpy as np, pandas as pd\nsvc = pd.DataFrame({\"price\": [25000, 60000, 90000, 15000], \"hours\": [20, 60, 40, 6]},\n                   index=[\"trial design\", \"full analysis\", \"training course\", \"dashboard subscription\"])\nmonths = np.arange(1, 25)\ndemand = pd.DataFrame({\"trial design\": np.minimum(1 + months // 3, 6), \"full analysis\": np.minimum(months // 4, 4),\n                       \"training course\": (months % 3 == 0).astype(int), \"dashboard subscription\": np.minimum(months // 2, 12)}, index=months)\nrevenue = demand @ svc.price; hours = demand @ svc.hours\nanalysts = np.maximum(2, np.ceil(hours.values / (120 * 0.9))).astype(int); fixed = 90000 + analysts * 45000; variable = 0.08 * revenue\nprofit = revenue - fixed - variable; cum = profit.cumsum()\nfirst_profit = int(months[np.argmax(profit.values > 0)]); breakeven = int(months[np.argmax(cum.values > 0)]) if (cum > 0).any() else None\nutil = hours / (analysts * 120)\nprint(f\"first profitable month {first_profit}; cumulative break-even month {breakeven}\")\nprint(f\"month 24: revenue {revenue.iloc[-1]:,.0f}, profit {profit.iloc[-1]:,.0f} birr; analyst utilisation {util.iloc[-1]:.0%}; recurring share {demand.iloc[-1]['dashboard subscription'] * 15000 / revenue.iloc[-1]:.0%}\")\nhire_month = int(months[np.argmax(analysts > 2)]) if (analysts > 2).any() else None; print(\"third analyst needed from month\", hire_month, \"; analysts by month 24:\", analysts[-1])",
  "out": "first profitable month 6; cumulative break-even month 12\nmonth 24: revenue 660,000, profit 292,200 birr; analyst utilisation 79%; recurring share 27%\nthird analyst needed from month 9 ; analysts by month 24: 5",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Monthly revenue, costs and cumulative profit (thousand birr)",
     "am": "ወርሃዊ ገቢ፣ ወጪዎችና የተጠራቀመ ትርፍ (በሺህ ብር)"
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
      "en": "Thousand birr",
      "am": "ሺህ ብር"
     }
    },
    "series": [
     {
      "name": {
       "en": "Revenue",
       "am": "ገቢ"
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
       21.0,
       22.0,
       23.0,
       24.0
      ],
      "y": [
       25.0,
       40.0,
       155.0,
       140.0,
       140.0,
       270.0,
       180.0,
       255.0,
       370.0,
       295.0,
       295.0,
       485.0,
       395.0,
       410.0,
       525.0,
       510.0,
       510.0,
       615.0,
       525.0,
       540.0,
       630.0,
       555.0,
       555.0,
       660.0
      ],
      "tip": [
       "25|Revenue · 1",
       "40|Revenue · 2",
       "155|Revenue · 3",
       "140|Revenue · 4",
       "140|Revenue · 5",
       "270|Revenue · 6",
       "180|Revenue · 7",
       "255|Revenue · 8",
       "370|Revenue · 9",
       "295|Revenue · 10",
       "295|Revenue · 11",
       "485|Revenue · 12",
       "395|Revenue · 13",
       "410|Revenue · 14",
       "525|Revenue · 15",
       "510|Revenue · 16",
       "510|Revenue · 17",
       "615|Revenue · 18",
       "525|Revenue · 19",
       "540|Revenue · 20",
       "630|Revenue · 21",
       "555|Revenue · 22",
       "555|Revenue · 23",
       "660|Revenue · 24"
      ],
      "endlabel": {
       "en": "Revenue",
       "am": "ገቢ"
      }
     },
     {
      "name": {
       "en": "Total costs",
       "am": "ጠቅላላ ወጪዎች"
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
       21.0,
       22.0,
       23.0,
       24.0
      ],
      "y": [
       182.0,
       183.2,
       192.4,
       191.2,
       191.2,
       201.6,
       194.4,
       200.4,
       254.6,
       248.6,
       248.6,
       308.8,
       256.6,
       257.8,
       312.0,
       310.8,
       310.8,
       364.2,
       312.0,
       313.2,
       365.4,
       314.4,
       314.4,
       367.8
      ],
      "tip": [
       "182|Total costs · 1",
       "183.2|Total costs · 2",
       "192.4|Total costs · 3",
       "191.2|Total costs · 4",
       "191.2|Total costs · 5",
       "201.6|Total costs · 6",
       "194.4|Total costs · 7",
       "200.4|Total costs · 8",
       "254.6|Total costs · 9",
       "248.6|Total costs · 10",
       "248.6|Total costs · 11",
       "308.8|Total costs · 12",
       "256.6|Total costs · 13",
       "257.8|Total costs · 14",
       "312|Total costs · 15",
       "310.8|Total costs · 16",
       "310.8|Total costs · 17",
       "364.2|Total costs · 18",
       "312|Total costs · 19",
       "313.2|Total costs · 20",
       "365.4|Total costs · 21",
       "314.4|Total costs · 22",
       "314.4|Total costs · 23",
       "367.8|Total costs · 24"
      ],
      "endlabel": {
       "en": "Total costs",
       "am": "ጠቅላላ ወጪዎች"
      }
     },
     {
      "name": {
       "en": "Cumulative profit",
       "am": "የተጠራቀመ ትርፍ"
      },
      "slot": 0,
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
       21.0,
       22.0,
       23.0,
       24.0
      ],
      "y": [
       -157.0,
       -300.2,
       -337.6,
       -388.8,
       -440.0,
       -371.6,
       -386.0,
       -331.4,
       -216.0,
       -169.6,
       -123.2,
       53.0,
       191.4,
       343.6,
       556.6,
       755.8,
       955.0,
       1205.8,
       1418.8,
       1645.6,
       1910.2,
       2150.8,
       2391.4,
       2683.6
      ],
      "tip": [
       "-157|Cumulative profit · 1",
       "-300.2|Cumulative profit · 2",
       "-337.6|Cumulative profit · 3",
       "-388.8|Cumulative profit · 4",
       "-440|Cumulative profit · 5",
       "-371.6|Cumulative profit · 6",
       "-386|Cumulative profit · 7",
       "-331.4|Cumulative profit · 8",
       "-216|Cumulative profit · 9",
       "-169.6|Cumulative profit · 10",
       "-123.2|Cumulative profit · 11",
       "53|Cumulative profit · 12",
       "191.4|Cumulative profit · 13",
       "343.6|Cumulative profit · 14",
       "556.6|Cumulative profit · 15",
       "755.8|Cumulative profit · 16",
       "955|Cumulative profit · 17",
       "1206|Cumulative profit · 18",
       "1419|Cumulative profit · 19",
       "1646|Cumulative profit · 20",
       "1910|Cumulative profit · 21",
       "2151|Cumulative profit · 22",
       "2391|Cumulative profit · 23",
       "2684|Cumulative profit · 24"
      ],
      "endlabel": {
       "en": "Cumulative profit",
       "am": "የተጠራቀመ ትርፍ"
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
       "en": "Revenue",
       "am": "ገቢ"
      },
      {
       "en": "Total costs",
       "am": "ጠቅላላ ወጪዎች"
      },
      {
       "en": "Cumulative profit",
       "am": "የተጠራቀመ ትርፍ"
      }
     ],
     "rows": [
      [
       1.0,
       25.0,
       182.0,
       -157.0
      ],
      [
       2.0,
       40.0,
       183.2,
       -300.2
      ],
      [
       3.0,
       155.0,
       192.4,
       -337.6
      ],
      [
       4.0,
       140.0,
       191.2,
       -388.8
      ],
      [
       5.0,
       140.0,
       191.2,
       -440.0
      ],
      [
       6.0,
       270.0,
       201.6,
       -371.6
      ],
      [
       7.0,
       180.0,
       194.4,
       -386.0
      ],
      [
       8.0,
       255.0,
       200.4,
       -331.4
      ],
      [
       9.0,
       370.0,
       254.6,
       -216.0
      ],
      [
       10.0,
       295.0,
       248.6,
       -169.6
      ],
      [
       11.0,
       295.0,
       248.6,
       -123.2
      ],
      [
       12.0,
       485.0,
       308.8,
       53.0
      ],
      [
       13.0,
       395.0,
       256.6,
       191.4
      ],
      [
       14.0,
       410.0,
       257.8,
       343.6
      ],
      [
       15.0,
       525.0,
       312.0,
       556.6
      ],
      [
       16.0,
       510.0,
       310.8,
       755.8
      ],
      [
       17.0,
       510.0,
       310.8,
       955.0
      ],
      [
       18.0,
       615.0,
       364.2,
       1205.8
      ],
      [
       19.0,
       525.0,
       312.0,
       1418.8
      ],
      [
       20.0,
       540.0,
       313.2,
       1645.6
      ],
      [
       21.0,
       630.0,
       365.4,
       1910.2
      ],
      [
       22.0,
       555.0,
       314.4,
       2150.8
      ],
      [
       23.0,
       555.0,
       314.4,
       2391.4
      ],
      [
       24.0,
       660.0,
       367.8,
       2683.6
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
    "rpad": 130
   }
  ],
  "analysis": {
   "en": [
    "The company makes a profit from month 6 and recovers all early losses by month 12.",
    "Demand needs a third analyst from month 9 and 5 analysts by month 24 (utilisation 79%).",
    "Dashboard subscriptions grow into a steady base of recurring income that pays the fixed costs."
   ],
   "am": [
    "ኩባንያው ከወር 6 ጀምሮ ትርፍ ያገኛል፣ ሁሉንም የመጀመሪያ ኪሳራዎች በወር 12 ያስመልሳል።",
    "ፍላጎቱ ከወር 9 ጀምሮ ሦስተኛ ተንታኝ፣ በወር 24 ደግሞ 5 ተንታኞችን ይፈልጋል (አጠቃቀም 79%)።",
    "የdashboard ምዝገባዎች ቋሚ ወጪዎችን የሚከፍል የተደጋጋሚ ገቢ መሠረት ሆነው ያድጋሉ።"
   ]
  },
  "decision": {
   "en": "Start with 2 analysts and enough cash for 12 months of losses; push subscriptions first, hire the third analyst around month 9 and grow to about 5 by month 24, adding each analyst only after 3 months of bookings confirm the demand.",
   "am": "በ2 ተንታኞችና ለ12 ወራት ኪሳራ በቂ ገንዘብ ጀምር፤ መጀመሪያ ምዝገባዎችን አስፋፋ፣ ሦስተኛውን ተንታኝ በወር 9 ገደማ ቅጠር፣ በወር 24 ወደ 5 ገደማ አሳድግ፤ እያንዳንዱን ተንታኝ የምትጨምረው የ3 ወራት ትዕዛዞች ፍላጎቱን ካረጋገጡ በኋላ ብቻ ነው።"
  },
  "note": {
   "en": "Illustrative prices and demand; replace them with quotes from your first customers.",
   "am": "ለማሳያ ዋጋዎችና ፍላጎት፤ ከመጀመሪያ ደንበኞችህ በሚገኙ ዋጋዎች ተካቸው።"
  }
 }
];
