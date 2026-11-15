/* Practical labs, track s, level 3. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.s[3] = [
 {
  "title": {
   "en": "Variability and sample size: teff panicle lengths",
   "am": "ልዩነትና የናሙና መጠን፡ የጤፍ ዛላ ርዝመቶች"
  },
  "goal": {
   "en": "Measure teff panicles, describe their distribution, then simulate how the spread of sample means shrinks as sample size grows.",
   "am": "የጤፍ ዛላዎችን ለኩ፣ ስርጭታቸውን ግለጹ፣ ከዚያ የናሙና መጠን ሲያድግ የናሙና አማካዮች ስርጭት እንዴት እንደሚቀንስ አስመስሉ።"
  },
  "time": {
   "en": "1–2 weeks",
   "am": "1–2 ሳምንታት"
  },
  "tools": [
   {
    "name": "Ruler or tape measure",
    "why": {
     "en": "measure in centimetres",
     "am": "በሴንቲሜትር መለካት"
    },
    "get": "school supplies"
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
    "Measure 200 panicles from one field (cm); draw a histogram.",
    "Compute mean and standard deviation (SD).",
    "Simulate: draw 1,000 samples of n = 5, 10, 20, 50 and compute each sample mean.",
    "Measure the SD of the sample means for each n.",
    "Compare with the formula SD / √n."
   ],
   "am": [
    "ከአንድ ማሳ 200 ዛላዎችን ለኩ (cm)፤ histogram ሣሉ።",
    "አማካይንና standard deviationን (SD) አስሉ።",
    "አስመስሉ፡ የn = 5፣ 10፣ 20፣ 50 1,000 ናሙናዎችን አውጡና የእያንዳንዱን ናሙና አማካይ አስሉ።",
    "ለእያንዳንዱ n የናሙና አማካዮችን SD ለኩ።",
    "ከቀመሩ SD / √n ጋር አወዳድሩ።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(1)\npanicles = rng.normal(38, 6, 200).round(1)                  # cm, measured in the field\nm, sd = panicles.mean(), panicles.std(ddof=1)\nprint(f\"200 panicles: mean {m:.1f} cm, SD {sd:.1f} cm, min {panicles.min()}, max {panicles.max()}\")\nsizes = [5, 10, 20, 50]; sim_sd, theory = [], []\nfor n in sizes:\n    means = [rng.choice(panicles, n).mean() for _ in range(1000)]\n    sim_sd.append(np.std(means)); theory.append(sd / np.sqrt(n))\n    print(f\"n = {n:2d}: SD of sample means {sim_sd[-1]:.2f} (formula {theory[-1]:.2f})\")\nhist, edges = np.histogram(panicles, bins=np.arange(20, 58, 3))",
  "out": "200 panicles: mean 37.6 cm, SD 5.6 cm, min 21.7, max 55.2\nn =  5: SD of sample means 2.49 (formula 2.49)\nn = 10: SD of sample means 1.74 (formula 1.76)\nn = 20: SD of sample means 1.23 (formula 1.24)\nn = 50: SD of sample means 0.81 (formula 0.79)",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Distribution of 200 panicle lengths",
     "am": "የ200 ዛላ ርዝመቶች ስርጭት"
    },
    "x": {
     "label": {
      "en": "Length (cm)",
      "am": "ርዝመት (cm)"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Number of panicles",
      "am": "የዛላዎች ብዛት"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Panicles",
       "am": "ዛላዎች"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       21.5,
       24.5,
       27.5,
       30.5,
       33.5,
       36.5,
       39.5,
       42.5,
       45.5,
       48.5,
       51.5,
       54.5
      ],
      "y": [
       2.0,
       3.0,
       9.0,
       19.0,
       25.0,
       40.0,
       48.0,
       37.0,
       9.0,
       4.0,
       2.0,
       2.0
      ],
      "tip": [
       "2|Panicles · 21.5",
       "3|Panicles · 24.5",
       "9|Panicles · 27.5",
       "19|Panicles · 30.5",
       "25|Panicles · 33.5",
       "40|Panicles · 36.5",
       "48|Panicles · 39.5",
       "37|Panicles · 42.5",
       "9|Panicles · 45.5",
       "4|Panicles · 48.5",
       "2|Panicles · 51.5",
       "2|Panicles · 54.5"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Length (cm)",
       "am": "ርዝመት (cm)"
      },
      {
       "en": "Panicles",
       "am": "ዛላዎች"
      }
     ],
     "rows": [
      [
       21.5,
       2.0
      ],
      [
       24.5,
       3.0
      ],
      [
       27.5,
       9.0
      ],
      [
       30.5,
       19.0
      ],
      [
       33.5,
       25.0
      ],
      [
       36.5,
       40.0
      ],
      [
       39.5,
       48.0
      ],
      [
       42.5,
       37.0
      ],
      [
       45.5,
       9.0
      ],
      [
       48.5,
       4.0
      ],
      [
       51.5,
       2.0
      ],
      [
       54.5,
       2.0
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Spread of the sample mean shrinks with n",
     "am": "የናሙና አማካይ ስርጭት ከn ጋር ይቀንሳል"
    },
    "x": {
     "label": {
      "en": "Sample size n",
      "am": "የናሙና መጠን n"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "SD of the mean (cm)",
      "am": "የአማካዩ SD (cm)"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Simulated",
       "am": "የተመሰለ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       5.0,
       10.0,
       20.0,
       50.0
      ],
      "y": [
       2.4887,
       1.7394,
       1.2327,
       0.8121
      ],
      "tip": [
       "2.489|Simulated · 5",
       "1.739|Simulated · 10",
       "1.233|Simulated · 20",
       "0.8121|Simulated · 50"
      ],
      "endlabel": {
       "en": "Simulated",
       "am": "የተመሰለ"
      }
     },
     {
      "name": {
       "en": "Formula SD/√n",
       "am": "ቀመር SD/√n"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       5.0,
       10.0,
       20.0,
       50.0
      ],
      "y": [
       2.4875,
       1.7589,
       1.2437,
       0.7866
      ],
      "tip": [
       "2.487|Formula SD/√n · 5",
       "1.759|Formula SD/√n · 10",
       "1.244|Formula SD/√n · 20",
       "0.7866|Formula SD/√n · 50"
      ],
      "endlabel": {
       "en": "Formula SD/√n",
       "am": "ቀመር SD/√n"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Sample size n",
       "am": "የናሙና መጠን n"
      },
      {
       "en": "Simulated",
       "am": "የተመሰለ"
      },
      {
       "en": "Formula SD/√n",
       "am": "ቀመር SD/√n"
      }
     ],
     "rows": [
      [
       5.0,
       2.489,
       2.487
      ],
      [
       10.0,
       1.739,
       1.759
      ],
      [
       20.0,
       1.233,
       1.244
      ],
      [
       50.0,
       0.812,
       0.787
      ]
     ]
    },
    "rpad": 90
   }
  ],
  "analysis": {
   "en": [
    "Panicles average 37.6 cm with SD 5.6 cm; the histogram is roughly bell-shaped.",
    "The mean of 5 panicles varies by about 2.5 cm; the mean of 50 by only 0.8 cm.",
    "The simulation matches SD/√n: to halve the uncertainty you need four times as many plants."
   ],
   "am": [
    "ዛላዎች በአማካይ 37.6 cm ከSD 5.6 cm ጋር ናቸው፤ histogramኡ በግምት የደወል ቅርጽ አለው።",
    "የ5 ዛላዎች አማካይ በ2.5 cm ገደማ ይለያያል፤ የ50 ግን በ0.8 cm ብቻ።",
    "ማስመሰሉ ከSD/√n ጋር ይስማማል፡ እርግጠኛ ያለመሆንን ለማካፈል አራት እጥፍ ተክሎች ያስፈልጉሃል።"
   ]
  },
  "decision": {
   "en": "For field measurements, sample at least 20 random plants per plot (uncertainty about 1.3 cm); going to 50 adds work but little precision.",
   "am": "ለመስክ ልኬቶች በplot ቢያንስ 20 የዘፈቀደ ተክሎችን ናሙና አድርግ (እርግጠኛ ያለመሆን ወደ 1.3 cm)፤ ወደ 50 መሄድ ሥራ ይጨምራል ግን ትንሽ ትክክለኛነት።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "On-farm test: confidence interval and paired t-test",
   "am": "በእርሻ ላይ ፈተና፡ confidence interval እና paired t-test"
  },
  "goal": {
   "en": "Twelve farmers each grew a new wheat variety next to their local one; estimate the gain with a 95% confidence interval and test it.",
   "am": "አሥራ ሁለት ገበሬዎች እያንዳንዳቸው አዲስ የስንዴ ዝርያን ከአካባቢያቸው ዝርያ አጠገብ አብቅለዋል፤ ትርፉን በ95% confidence interval ገምቱና ፈትሹት።"
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
    "name": "Spreadsheet",
    "why": {
     "en": "enter and check the raw data",
     "am": "ጥሬ ዳታውን ማስገባትና መፈተሽ"
    },
    "get": "LibreOffice Calc (free) or Google Sheets"
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
    "Each farmer harvests a 5 m × 5 m plot of each variety and converts to t/ha.",
    "Compute the difference (new − local) for each farm.",
    "Mean difference, its standard error and 95% CI: mean ± t × SE.",
    "Paired t-test: is the mean difference zero?",
    "Also count how many farms gained."
   ],
   "am": [
    "እያንዳንዱ ገበሬ የእያንዳንዱን ዝርያ 5 m × 5 m plot አጭዶ ወደ t/ha ይቀይራል።",
    "ለእያንዳንዱ እርሻ ልዩነቱን (አዲስ − አካባቢያዊ) አስሉ።",
    "አማካይ ልዩነት፣ standard errorኡ እና 95% CI፡ አማካይ ± t × SE።",
    "Paired t-test፡ አማካይ ልዩነቱ ዜሮ ነው?",
    "ስንት እርሻዎች እንዳተረፉም ቁጠሩ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nlocal = np.array([2.1, 2.8, 1.9, 3.2, 2.5, 2.2, 3.0, 2.6, 1.8, 2.9, 2.4, 2.7])\nnew   = np.array([2.6, 3.1, 2.5, 3.4, 3.0, 2.4, 3.5, 2.7, 2.4, 3.3, 2.5, 3.2])\nd = new - local; n = len(d); se = d.std(ddof=1) / np.sqrt(n); tcrit = stats.t.ppf(0.975, n - 1)\nlo, hi = d.mean() - tcrit * se, d.mean() + tcrit * se; t, p = stats.ttest_rel(new, local)\nprint(f\"mean gain {d.mean():.2f} t/ha, 95% CI {lo:.2f} to {hi:.2f}; t = {t:.2f}, p = {p:.1g}; farms that gained: {(d > 0).sum()} of {n}\")\nprint(f\"relative gain {d.mean() / local.mean():.0%}\")",
  "out": "mean gain 0.38 t/ha, 95% CI 0.26 to 0.49; t = 6.97, p = 2e-05; farms that gained: 12 of 12\nrelative gain 15%",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Each farm: local vs new variety (t/ha)",
     "am": "እያንዳንዱ እርሻ፡ አካባቢያዊ vs አዲስ ዝርያ (t/ha)"
    },
    "x": {
     "label": {
      "en": "Local variety (t/ha)",
      "am": "አካባቢያዊ ዝርያ (t/ha)"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "New variety (t/ha)",
      "am": "አዲስ ዝርያ (t/ha)"
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
       2.1,
       2.8,
       1.9,
       3.2,
       2.5,
       2.2,
       3.0,
       2.6,
       1.8,
       2.9,
       2.4,
       2.7
      ],
      "y": [
       2.6,
       3.1,
       2.5,
       3.4,
       3.0,
       2.4,
       3.5,
       2.7,
       2.4,
       3.3,
       2.5,
       3.2
      ],
      "size": 4,
      "tip": [
       "2.6| x = 2.1",
       "3.1| x = 2.8",
       "2.5| x = 1.9",
       "3.4| x = 3.2",
       "3| x = 2.5",
       "2.4| x = 2.2",
       "3.5| x = 3",
       "2.7| x = 2.6",
       "2.4| x = 1.8",
       "3.3| x = 2.9",
       "2.5| x = 2.4",
       "3.2| x = 2.7"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Local variety (t/ha)",
       "am": "አካባቢያዊ ዝርያ (t/ha)"
      },
      {
       "en": "New variety (t/ha)",
       "am": "አዲስ ዝርያ (t/ha)"
      }
     ],
     "rows": [
      [
       2.1,
       2.6
      ],
      [
       2.8,
       3.1
      ],
      [
       1.9,
       2.5
      ],
      [
       3.2,
       3.4
      ],
      [
       2.5,
       3.0
      ],
      [
       2.2,
       2.4
      ],
      [
       3.0,
       3.5
      ],
      [
       2.6,
       2.7
      ],
      [
       1.8,
       2.4
      ],
      [
       2.9,
       3.3
      ],
      [
       2.4,
       2.5
      ],
      [
       2.7,
       3.2
      ]
     ]
    },
    "refs": [
     {
      "kind": "diag",
      "label": {
       "en": "same yield",
       "am": "እኩል ምርት"
      }
     }
    ],
    "note": {
     "en": "Points above the diagonal are farms where the new variety yielded more.",
     "am": "ከዲያጎናሉ በላይ ያሉ ነጥቦች አዲሱ ዝርያ ብዙ ምርት የሰጠባቸው እርሻዎች ናቸው።"
    }
   },
   {
    "type": "dot",
    "title": {
     "en": "Mean gain with 95% confidence interval (t/ha)",
     "am": "አማካይ ትርፍ ከ95% confidence interval ጋር (t/ha)"
    },
    "x": {
     "label": "t/ha"
    },
    "cats": [
     {
      "en": "New − local",
      "am": "አዲስ − አካባቢያዊ"
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
       0.375
      ],
      "lo": [
       0.257
      ],
      "hi": [
       0.493
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
        "en": "New − local",
        "am": "አዲስ − አካባቢያዊ"
       },
       0.375,
       0.257,
       0.493
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The new variety yielded 0.38 t/ha more on average (15%); 95% CI 0.26 to 0.49.",
    "The paired t-test gives p = 2e-05: a gain this large would be very unlikely if the varieties were equal.",
    "12 of 12 farms gained, so the result holds across farms, not just on average."
   ],
   "am": [
    "አዲሱ ዝርያ በአማካይ 0.38 t/ha ብልጫ ሰጥቷል (15%)፤ 95% CI 0.26 እስከ 0.49።",
    "paired t-test p = 2e-05 ይሰጣል፡ ዝርያዎቹ እኩል ቢሆኑ እንዲህ ያለ ትልቅ ትርፍ በጣም የማይመስል ነበር።",
    "ከ12 እርሻዎች 12 አትርፈዋል፤ ስለዚህ ውጤቱ በአማካይ ብቻ ሳይሆን በእርሻዎች ሁሉ ይዘልቃል።"
   ]
  },
  "decision": {
   "en": "Recommend the new variety; tell farmers to expect a gain of about 0.3–0.5 t/ha, and check whether the extra seed cost is covered.",
   "am": "አዲሱን ዝርያ ምከር፤ ገበሬዎች ወደ 0.3–0.5 t/ha ትርፍ እንዲጠብቁ ንገራቸው፣ ተጨማሪው የዘር ወጪ መሸፈኑንም ፈትሽ።"
  },
  "note": {
   "en": "Example data from a typical on-farm trial.",
   "am": "ከተለመደ በእርሻ ላይ ሙከራ የተወሰደ የምሳሌ ዳታ።"
  }
 },
 {
  "title": {
   "en": "Who adopts row planting? A chi-square test",
   "am": "የመስመር ተከላን ማን ይቀበላል? የchi-square ፈተና"
  },
  "goal": {
   "en": "Survey 200 teff farmers on extension contact and row planting, test whether adoption depends on contact, and decide where to focus.",
   "am": "በኤክስቴንሽን ግንኙነትና በመስመር ተከላ ላይ 200 የጤፍ ገበሬዎችን ዳስሱ፣ ተቀባይነት በግንኙነት ላይ የተመሠረተ መሆኑን ፈትሹ፣ ትኩረቱ የት እንደሚሆን ወስኑ።"
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
    "name": "Questionnaire (paper or KoboToolbox)",
    "why": {
     "en": "collect the answers",
     "am": "መልሶቹን መሰብሰብ"
    },
    "get": "kobotoolbox.org"
   }
  ],
  "steps": {
   "en": [
    "Ask: \"Did an extension agent visit you this year?\" and \"Did you row-plant teff?\"",
    "Make a 2 × 2 table of counts.",
    "Compute the adoption rate in each group.",
    "Chi-square test of independence; check all expected counts are above 5.",
    "Interpret: association, not proof of cause."
   ],
   "am": [
    "ጠይቁ፡ «በዚህ ዓመት የኤክስቴንሽን ሠራተኛ ጎብኝቶሃል?» እና «ጤፍን በመስመር ዘርተሃል?»",
    "የ2 × 2 የቆጠራ ሰንጠረዥ ሥሩ።",
    "በእያንዳንዱ ቡድን የተቀባይነት መጠኑን አስሉ።",
    "የchi-square የነፃነት ፈተና፤ ሁሉም የሚጠበቁ ቆጠራዎች ከ5 በላይ መሆናቸውን ፈትሹ።",
    "ተርጉሙ፡ ግንኙነት እንጂ የምክንያት ማረጋገጫ አይደለም።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\ntable = np.array([[58, 32],     # visited:     row-planted, did not\n                  [34, 76]])    # not visited: row-planted, did not\nchi2, p, dof, expected = stats.chi2_contingency(table, correction=False)\nrate = table[:, 0] / table.sum(1)\nprint(f\"adoption: visited {rate[0]:.0%}, not visited {rate[1]:.0%}\")\nprint(f\"chi-square {chi2:.1f}, df {dof}, p = {p:.2g}; smallest expected count {expected.min():.1f}\")",
  "out": "adoption: visited 64%, not visited 31%\nchi-square 22.4, df 1, p = 2.2e-06; smallest expected count 41.4",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Share of farmers who row-planted teff",
     "am": "ጤፍን በመስመር የዘሩ ገበሬዎች ድርሻ"
    },
    "x": {
     "label": {
      "en": "Percent who adopted",
      "am": "የተቀበሉ መቶኛ"
     }
    },
    "fmt": 0,
    "cats": [
     {
      "en": "Visited by extension",
      "am": "በኤክስቴንሽን የተጎበኙ"
     },
     {
      "en": "Not visited",
      "am": "ያልተጎበኙ"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Percent",
       "am": "መቶኛ"
      },
      "slot": 1,
      "v": [
       64.0,
       31.0
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
       "en": "Percent",
       "am": "መቶኛ"
      }
     ],
     "rows": [
      [
       {
        "en": "Visited by extension",
        "am": "በኤክስቴንሽን የተጎበኙ"
       },
       64.0
      ],
      [
       {
        "en": "Not visited",
        "am": "ያልተጎበኙ"
       },
       31.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "64% of visited farmers row-planted, against 31% of the others.",
    "Chi-square = 22.4, p = 2e-06: adoption is clearly linked to extension contact; all expected counts are above 5, so the test is valid.",
    "Agents may visit the more progressive farmers first, so this is an association, not proof that visits cause adoption."
   ],
   "am": [
    "ከተጎበኙ ገበሬዎች 64% በመስመር ዘርተዋል፤ ከሌሎቹ 31%።",
    "Chi-square = 22.4፣ p = 2e-06፡ ተቀባይነት ከኤክስቴንሽን ግንኙነት ጋር በግልጽ የተያያዘ ነው፤ ሁሉም የሚጠበቁ ቆጠራዎች ከ5 በላይ ስለሆኑ ፈተናው ትክክል ነው።",
    "ሠራተኞች መጀመሪያ የበለጠ ተራማጅ ገበሬዎችን ሊጎበኙ ይችላሉ፤ ስለዚህ ይህ ግንኙነት ነው እንጂ ጉብኝቶች ተቀባይነትን እንደሚያስከትሉ ማረጋገጫ አይደለም።"
   ]
  },
  "decision": {
   "en": "Prioritise visits to farmers not yet reached; to measure the real effect, randomly choose which villages get visits first next season.",
   "am": "እስካሁን ያልደረሱ ገበሬዎችን ጉብኝት አስቀድም፤ እውነተኛውን ውጤት ለመለካት በሚቀጥለው ወቅት የትኞቹ መንደሮች መጀመሪያ ጉብኝት እንደሚያገኙ በዘፈቀደ ምረጥ።"
  },
  "note": {
   "en": "Example survey counts.",
   "am": "የምሳሌ የዳሰሳ ቆጠራዎች።"
  }
 },
 {
  "title": {
   "en": "Yield and nitrogen: correlation and regression",
   "am": "ምርትና ናይትሮጅን፡ correlation እና regression"
  },
  "goal": {
   "en": "Relate maize yield to nitrogen rate on 30 plots, fit a line, check the residuals, and decide whether a straight line is good enough.",
   "am": "በ30 plots ላይ የበቆሎ ምርትን ከናይትሮጅን መጠን ጋር አዛምዱ፣ መስመር ግጠሙ፣ residualsን ፈትሹ፣ ቀጥተኛ መስመር በቂ መሆኑን ወስኑ።"
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
    "Data: nitrogen 0, 30, 60, 90, 120, 150 kg/ha, 5 plots each.",
    "Plot yield against N; compute the correlation r.",
    "Fit yield = a + b × N; read the slope b (t/ha per kg N).",
    "Plot residuals against N: do they curve?",
    "Fit a quadratic and compare."
   ],
   "am": [
    "ዳታ፡ ናይትሮጅን 0፣ 30፣ 60፣ 90፣ 120፣ 150 kg/ha፣ እያንዳንዱ 5 plots።",
    "ምርትን ከN አንፃር ቻርት አድርጉ፤ correlation rን አስሉ።",
    "ምርት = a + b × N ግጠሙ፤ slope bን አንብቡ (t/ha በkg N)።",
    "residualsን ከN አንፃር ቻርት አድርጉ፡ ይታጠፋሉ?",
    "quadratic ግጠሙና አወዳድሩ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(2)\nN = np.repeat([0, 30, 60, 90, 120, 150], 5)\nyield_ = 2.0 + 0.045 * N - 0.00017 * N ** 2 + rng.normal(0, 0.35, N.size)\nr, p = stats.pearsonr(N, yield_); lin = stats.linregress(N, yield_)\nresid = yield_ - (lin.intercept + lin.slope * N)\nquad = np.polyfit(N, yield_, 2); r2_lin = r ** 2\nr2_quad = 1 - np.sum((yield_ - np.polyval(quad, N)) ** 2) / np.sum((yield_ - yield_.mean()) ** 2)\nmean_resid = [round(float(resid[N == n].mean()), 2) for n in sorted(set(N))]\nprint(f\"r = {r:.2f}; line: yield = {lin.intercept:.2f} + {lin.slope:.4f} N; R2 line {r2_lin:.2f}, quadratic {r2_quad:.2f}\")\nprint(\"mean residual by N:\", mean_resid)",
  "out": "r = 0.87; line: yield = 2.51 + 0.0191 N; R2 line 0.76, quadratic 0.90\nmean residual by N: [-0.61, 0.2, 0.43, 0.38, 0.2, -0.6]",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Maize yield vs nitrogen (30 plots)",
     "am": "የበቆሎ ምርት vs ናይትሮጅን (30 plots)"
    },
    "x": {
     "label": {
      "en": "Nitrogen (kg/ha)",
      "am": "ናይትሮጅን (kg/ha)"
     },
     "int": false
    },
    "y": {
     "label": {
      "en": "Yield (t/ha)",
      "am": "ምርት (t/ha)"
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
       0.0,
       0.0,
       0.0,
       0.0,
       30.0,
       30.0,
       30.0,
       30.0,
       30.0,
       60.0,
       60.0,
       60.0,
       60.0,
       60.0,
       90.0,
       90.0,
       90.0,
       90.0,
       90.0,
       120.0,
       120.0,
       120.0,
       120.0,
       120.0,
       150.0,
       150.0,
       150.0,
       150.0,
       150.0
      ],
      "y": [
       2.066,
       1.817,
       1.855,
       1.145,
       2.63,
       3.597,
       3.083,
       3.468,
       3.295,
       3.003,
       4.43,
       3.979,
       3.973,
       3.811,
       4.247,
       4.638,
       4.864,
       4.46,
       4.717,
       4.361,
       5.247,
       5.018,
       5.068,
       5.096,
       4.598,
       5.199,
       5.645,
       4.352,
       4.32,
       4.398
      ],
      "size": 4,
      "tip": [
       "2.07| x = 0",
       "1.82| x = 0",
       "1.86| x = 0",
       "1.15| x = 0",
       "2.63| x = 0",
       "3.6| x = 30",
       "3.08| x = 30",
       "3.47| x = 30",
       "3.3| x = 30",
       "3| x = 30",
       "4.43| x = 60",
       "3.98| x = 60",
       "3.97| x = 60",
       "3.81| x = 60",
       "4.25| x = 60",
       "4.64| x = 90",
       "4.86| x = 90",
       "4.46| x = 90",
       "4.72| x = 90",
       "4.36| x = 90",
       "5.25| x = 120",
       "5.02| x = 120",
       "5.07| x = 120",
       "5.1| x = 120",
       "4.6| x = 120",
       "5.2| x = 150",
       "5.64| x = 150",
       "4.35| x = 150",
       "4.32| x = 150",
       "4.4| x = 150"
      ]
     },
     {
      "name": {
       "en": "Fitted line (slope 0.0191)",
       "am": "የተገጠመ መስመር (slope 0.0191)"
      },
      "slot": 2,
      "kind": "line",
      "x": [
       0.0,
       150.0
      ],
      "y": [
       2.513,
       5.379
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
       "en": "Yield (t/ha)",
       "am": "ምርት (t/ha)"
      }
     ],
     "rows": [
      [
       0.0,
       2.066
      ],
      [
       0.0,
       1.817
      ],
      [
       0.0,
       1.855
      ],
      [
       0.0,
       1.145
      ],
      [
       0.0,
       2.63
      ],
      [
       30.0,
       3.597
      ],
      [
       30.0,
       3.083
      ],
      [
       30.0,
       3.468
      ],
      [
       30.0,
       3.295
      ],
      [
       30.0,
       3.003
      ],
      [
       60.0,
       4.43
      ],
      [
       60.0,
       3.979
      ],
      [
       60.0,
       3.973
      ],
      [
       60.0,
       3.811
      ],
      [
       60.0,
       4.247
      ],
      [
       90.0,
       4.638
      ],
      [
       90.0,
       4.864
      ],
      [
       90.0,
       4.46
      ],
      [
       90.0,
       4.717
      ],
      [
       90.0,
       4.361
      ],
      [
       120.0,
       5.247
      ],
      [
       120.0,
       5.018
      ],
      [
       120.0,
       5.068
      ],
      [
       120.0,
       5.096
      ],
      [
       120.0,
       4.598
      ],
      [
       150.0,
       5.199
      ],
      [
       150.0,
       5.645
      ],
      [
       150.0,
       4.352
      ],
      [
       150.0,
       4.32
      ],
      [
       150.0,
       4.398
      ]
     ]
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Average residual from the straight line",
     "am": "ከቀጥተኛው መስመር አማካይ residual"
    },
    "x": {
     "label": {
      "en": "Nitrogen (kg/ha)",
      "am": "ናይትሮጅን (kg/ha)"
     },
     "int": true
    },
    "y": {
     "label": "t/ha"
    },
    "series": [
     {
      "name": {
       "en": "Residual (t/ha)",
       "am": "Residual (t/ha)"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       0.0,
       30.0,
       60.0,
       90.0,
       120.0,
       150.0
      ],
      "y": [
       -0.61,
       0.2,
       0.43,
       0.38,
       0.2,
       -0.6
      ],
      "tip": [
       "-0.61|Residual (t/ha) · 0",
       "0.2|Residual (t/ha) · 30",
       "0.43|Residual (t/ha) · 60",
       "0.38|Residual (t/ha) · 90",
       "0.2|Residual (t/ha) · 120",
       "-0.6|Residual (t/ha) · 150"
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
       "en": "Residual (t/ha)",
       "am": "Residual (t/ha)"
      }
     ],
     "rows": [
      [
       0.0,
       -0.61
      ],
      [
       30.0,
       0.2
      ],
      [
       60.0,
       0.43
      ],
      [
       90.0,
       0.38
      ],
      [
       120.0,
       0.2
      ],
      [
       150.0,
       -0.6
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 0,
      "label": ""
     }
    ]
   }
  ],
  "analysis": {
   "en": [
    "Yield rises with N (r = 0.87); the line says 19 kg of grain per extra kg of N on average.",
    "The residuals are negative at both ends and positive in the middle: the response curves and levels off.",
    "A quadratic explains more of the variation (R² 0.90 vs 0.76)."
   ],
   "am": [
    "ምርት ከN ጋር ይጨምራል (r = 0.87)፤ መስመሩ በአማካይ በእያንዳንዱ ተጨማሪ kg N 19 kg እህል ይላል።",
    "residuals በሁለቱም ጫፎች አሉታዊ፣ በመካከል አዎንታዊ ናቸው፡ ምላሹ ይታጠፋል፣ ይረጋጋልም።",
    "quadratic የበለጠ ልዩነትን ያብራራል (R² 0.90 vs 0.76)።"
   ]
  },
  "decision": {
   "en": "Do not use the straight line to recommend high N rates: it overstates gains at high N. Use the curved model and find the economic optimum (Level S5).",
   "am": "ከፍተኛ የN መጠኖችን ለመምከር ቀጥተኛውን መስመር አትጠቀሙ፡ በከፍተኛ N ትርፎችን ያጋንናል። የታጠፈውን ሞዴል ተጠቀሙና ኢኮኖሚያዊ ምርጡን ፈልጉ (ደረጃ S5)።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Your first field experiment: 4 varieties in 4 blocks",
   "am": "የመጀመሪያው የመስክ ሙከራህ፡ 4 ዝርያዎች በ4 blocks"
  },
  "goal": {
   "en": "Lay out, run and analyse a 4 × 4 trial of bean varieties in the school field with blocks along the slope, and pick the variety to grow.",
   "am": "በትምህርት ቤቱ ማሳ በተዳፋቱ ላይ ከblocks ጋር የባቄላ ዝርያዎችን 4 × 4 ሙከራ አቅዱ፣ አካሂዱ፣ ተንትኑ፣ የሚበቅለውን ዝርያ ምረጡ።"
  },
  "time": {
   "en": "One season",
   "am": "አንድ ወቅት"
  },
  "tools": [
   {
    "name": "16 plots of 2 m × 2 m, pegs and string",
    "why": {
     "en": "the field layout",
     "am": "የማሳ አቀማመጡ"
    },
    "get": "school field"
   },
   {
    "name": "Kitchen or spring scale",
    "why": {
     "en": "weigh in grams or kilograms",
     "am": "በግራም ወይም በኪሎግራም መመዘን"
    },
    "get": "market"
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
    "Make 4 blocks across the slope; each block has 4 plots.",
    "In each block, draw lots to place the 4 varieties.",
    "Grow, then weigh the dry beans from each plot.",
    "Compute variety means and block means; run the RCBD analysis of variance.",
    "Compare the best variety with the others using the LSD."
   ],
   "am": [
    "በተዳፋቱ ላይ 4 blocks ሥሩ፤ እያንዳንዱ block 4 plots አሉት።",
    "በእያንዳንዱ block ውስጥ 4ቱን ዝርያዎች ለማስቀመጥ ዕጣ አውጡ።",
    "አብቅሉ፣ ከዚያ ከእያንዳንዱ plot ደረቅ ባቄላውን መዝኑ።",
    "የዝርያ አማካዮችንና የblock አማካዮችን አስሉ፤ የRCBD analysis of varianceን አካሂዱ።",
    "ምርጡን ዝርያ ከሌሎቹ ጋር በLSD አወዳድሩ።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\nvarieties = [\"Local\", \"Nasir\", \"Hawassa Dume\", \"Ibbado\"]\ny = np.array([[1.6, 2.1, 2.2, 2.0],      # block 1 (top of slope) - kg per plot, columns = varieties\n              [1.9, 2.0, 2.7, 1.9],\n              [2.1, 2.5, 2.6, 2.2],\n              [2.0, 2.4, 3.0, 2.5]])     # block 4 (bottom, deeper soil)\nb, t = y.shape; grand = y.mean()\nss_t = b * ((y.mean(0) - grand) ** 2).sum(); ss_b = t * ((y.mean(1) - grand) ** 2).sum(); ss_tot = ((y - grand) ** 2).sum()\nss_e = ss_tot - ss_t - ss_b; df_e = (b - 1) * (t - 1); ms_e = ss_e / df_e\nF = (ss_t / (t - 1)) / ms_e; p = stats.f.sf(F, t - 1, df_e)\nlsd = stats.t.ppf(0.975, df_e) * np.sqrt(2 * ms_e / b)\nmeans = {v: round(float(m), 2) for v, m in zip(varieties, y.mean(0))}; best = max(means, key=means.get)\nprint(\"variety means (kg/plot):\", means); print(\"block means:\", y.mean(1).round(2))\nprint(f\"F = {F:.1f}, p = {p:.4f}; LSD(5%) = {lsd:.2f} kg\"); print(f\"block share of total variation: {ss_b / ss_tot:.0%}\")\nbeats = [v for v in varieties if v != best and means[best] - means[v] > lsd]",
  "out": "variety means (kg/plot): {'Local': 1.9, 'Nasir': 2.25, 'Hawassa Dume': 2.62, 'Ibbado': 2.15}\nblock means: [1.98 2.12 2.35 2.48]\nF = 13.3, p = 0.0012; LSD(5%) = 0.26 kg\nblock share of total variation: 31%",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Mean yield per variety (kg per 4 m² plot)",
     "am": "አማካይ ምርት በዝርያ (kg በ4 m² plot)"
    },
    "x": {
     "label": "kg"
    },
    "fmt": 2,
    "cats": [
     "Local",
     "Nasir",
     "Hawassa Dume",
     "Ibbado"
    ],
    "series": [
     {
      "name": {
       "en": "kg per plot",
       "am": "kg በplot"
      },
      "slot": 1,
      "v": [
       1.9,
       2.25,
       2.62,
       2.15
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
       "en": "kg per plot",
       "am": "kg በplot"
      }
     ],
     "rows": [
      [
       "Local",
       1.9
      ],
      [
       "Nasir",
       2.25
      ],
      [
       "Hawassa Dume",
       2.62
      ],
      [
       "Ibbado",
       2.15
      ]
     ]
    },
    "note": {
     "en": "Differences larger than the LSD (0.26 kg) are real at the 5% level.",
     "am": "ከLSD (0.26 kg) የሚበልጡ ልዩነቶች በ5% ደረጃ እውነተኛ ናቸው።"
    }
   },
   {
    "type": "xy",
    "title": {
     "en": "Block means down the slope (kg per plot)",
     "am": "የblock አማካዮች በተዳፋቱ ወደ ታች (kg በplot)"
    },
    "x": {
     "label": {
      "en": "Block (1 = top)",
      "am": "Block (1 = ላይ)"
     },
     "int": true
    },
    "y": {
     "label": "kg"
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
       4.0
      ],
      "y": [
       1.975,
       2.125,
       2.35,
       2.475
      ],
      "tip": [
       "1.975|Block mean · 1",
       "2.125|Block mean · 2",
       "2.35|Block mean · 3",
       "2.475|Block mean · 4"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Block (1 = top)",
       "am": "Block (1 = ላይ)"
      },
      {
       "en": "Block mean",
       "am": "የblock አማካይ"
      }
     ],
     "rows": [
      [
       1.0,
       1.975
      ],
      [
       2.0,
       2.125
      ],
      [
       3.0,
       2.35
      ],
      [
       4.0,
       2.475
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Hawassa Dume gave the most (2.62 kg/plot); F = 13.3, p = 0.0012.",
    "It beats Local, Nasir, Ibbado by more than the LSD of 0.26 kg.",
    "Blocks explain 31% of the variation: the bottom of the slope is better. Blocking removed this from the error, making the test sharper."
   ],
   "am": [
    "Hawassa Dume ብዙ ሰጥቷል (2.62 kg/plot)፤ F = 13.3፣ p = 0.0012።",
    "Local, Nasir, Ibbadoን ከLSD 0.26 kg በላይ ያሸንፋል።",
    "blocks 31% ልዩነቱን ያብራራሉ፡ የተዳፋቱ ታች የተሻለ ነው። blocking ይህንን ከስህተቱ አስወግዶ ፈተናውን የበለጠ ስለታም አድርጎታል።"
   ]
  },
  "decision": {
   "en": "Grow Hawassa Dume in the school garden next season, and repeat the trial once more before telling families: one season and one field are not enough.",
   "am": "በሚቀጥለው ወቅት Hawassa Dumeን በትምህርት ቤቱ የአትክልት ቦታ አብቅሉ፤ ለቤተሰቦች ከመናገራችሁ በፊት ሙከራውን አንድ ጊዜ ድገሙ፡ አንድ ወቅትና አንድ ማሳ በቂ አይደሉም።"
  },
  "note": {
   "en": "Example results; variety names are Ethiopian released common-bean varieties.",
   "am": "የምሳሌ ውጤቶች፤ የዝርያ ስሞቹ የተለቀቁ የኢትዮጵያ የቦሎቄ ዝርያዎች ናቸው።"
  }
 }
];
