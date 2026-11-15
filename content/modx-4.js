/* Level 4 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[4] = [
 {
  "why": {
   "en": "Memory, proof and mathematics are the base under every advanced topic, including AI.",
   "am": "ማስታወሻ፣ ማረጋገጫና ሒሳብ AIን ጨምሮ ከእያንዳንዱ የላቀ ርዕስ ሥር ያሉ መሠረቶች ናቸው።"
  },
  "dg": [
   {
    "type": "stack",
    "title": {
     "en": "A pointer is an address",
     "am": "pointer አድራሻ ነው"
    },
    "layers": [
     {
      "t": {
       "en": "int x = 42;",
       "am": "int x = 42;"
      },
      "s": {
       "en": "value 42 stored at address 0x1000",
       "am": "እሴት 42 በአድራሻ 0x1000 ተቀምጧል"
      }
     },
     {
      "t": {
       "en": "int *p = &x;",
       "am": "int *p = &x;"
      },
      "s": {
       "en": "p holds 0x1000, the address of x",
       "am": "p 0x1000ን ይይዛል፣ የx አድራሻ"
      }
     },
     {
      "t": {
       "en": "*p = 7;",
       "am": "*p = 7;"
      },
      "s": {
       "en": "follow the address and change x to 7",
       "am": "አድራሻውን ተከትለህ xን 7 አድርግ"
      }
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "Proof by induction",
     "am": "በinduction ማረጋገጥ"
    },
    "nodes": [
     {
      "t": {
       "en": "Base case",
       "am": "Base case"
      },
      "s": {
       "en": "n = 1: 1 = 1·2/2 ✓",
       "am": "n = 1፡ 1 = 1·2/2 ✓"
      }
     },
     {
      "t": {
       "en": "Assume for n",
       "am": "ለn አስብ"
      },
      "s": {
       "en": "1 + … + n = n(n+1)/2",
       "am": "1 + … + n = n(n+1)/2"
      }
     },
     {
      "t": {
       "en": "Show for n + 1",
       "am": "ለn + 1 አሳይ"
      },
      "s": {
       "en": "n(n+1)/2 + (n+1) = (n+1)(n+2)/2",
       "am": "n(n+1)/2 + (n+1) = (n+1)(n+2)/2"
      }
     },
     {
      "t": {
       "en": "True for all n",
       "am": "ለሁሉም n እውነት ነው"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "What a matrix does",
     "am": "ማትሪክስ የሚያደርገው"
    },
    "cols": [
     {
      "h": {
       "en": "Matrix × vector",
       "am": "ማትሪክስ × vector"
      },
      "items": {
       "en": [
        "transforms a point: rotate, stretch, project"
       ],
       "am": [
        "ነጥብን ይቀይራል፡ ማዞር፣ መለጠጥ፣ መዘርጋት"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Matrix × matrix",
       "am": "ማትሪክስ × ማትሪክስ"
      },
      "items": {
       "en": [
        "one transformation after another",
        "order matters: AB ≠ BA"
       ],
       "am": [
        "አንድ ለውጥ ከሌላው በኋላ",
        "ቅደም ተከተል አስፈላጊ ነው፡ AB ≠ BA"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\n# check the induction formula for many n (a check, not a proof)\nprint(all(sum(range(1, n + 1)) == n * (n + 1) // 2 for n in range(1, 10_001)))\n\nrotate90 = np.array([[0, -1], [1, 0]])       # rotate by 90 degrees\nstretch = np.array([[2, 0], [0, 1]])          # double the x direction\np = np.array([1, 0])\nprint(\"rotate then stretch:\", stretch @ rotate90 @ p)\nprint(\"stretch then rotate:\", rotate90 @ stretch @ p, \"(order matters)\")",
   "out": "True\nrotate then stretch: [0 1]\nstretch then rotate: [0 2] (order matters)",
   "title": {
    "en": "Checking a formula and composing transformations",
    "am": "ቀመርን መፈተሽና ለውጦችን ማጣመር"
   },
   "note": {
    "en": "A computer check over 10,000 cases supports the formula; only the induction proof shows it for every n.",
    "am": "በ10,000 ጉዳዮች ላይ የተደረገ የኮምፒውተር ፍተሻ ቀመሩን ይደግፋል፤ ለእያንዳንዱ n የሚያሳየው የinduction ማረጋገጫው ብቻ ነው።"
   }
  },
  "qa": {
   "en": [
    "A variable that stores the memory address of another value; *p reads or changes the value at that address.",
    "Base: n = 1 gives 1 = 1. Step: if it holds for n, then 1 + … + n + (n+1) = n(n+1)/2 + (n+1) = (n+1)(n+2)/2, which is the formula for n + 1.",
    "Applying one linear transformation after another (for example rotate then stretch); the product is the combined transformation."
   ],
   "am": [
    "የሌላ እሴትን የማስታወሻ አድራሻ የሚያስቀምጥ variable፤ *p በዚያ አድራሻ ያለውን እሴት ያነባል ወይም ይቀይራል።",
    "Base፡ n = 1 1 = 1 ይሰጣል። እርምጃ፡ ለn እውነት ከሆነ 1 + … + n + (n+1) = n(n+1)/2 + (n+1) = (n+1)(n+2)/2፣ ይህም ለn + 1 ቀመሩ ነው።",
    "አንድ linear ለውጥን ከሌላው በኋላ መተግበር (ለምሳሌ ማዞር ከዚያ መለጠጥ)፤ ውጤቱ የተጣመረው ለውጥ ነው።"
   ]
  }
 },
 {
  "why": {
   "en": "Choosing the right algorithm and understanding the hardware decide whether a system scales.",
   "am": "ትክክለኛውን algorithm መምረጥና hardwareን መረዳት አንድ ሥርዓት ማደግ ይችል እንደሆነ ይወስናሉ።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Greedy vs dynamic programming: make 6 birr with coins 1, 3, 4",
     "am": "Greedy vs dynamic programming፡ በ1፣ 3፣ 4 ሳንቲሞች 6 ብር ሥራ"
    },
    "cols": [
     {
      "h": {
       "en": "Greedy: take the biggest coin",
       "am": "Greedy፡ ትልቁን ሳንቲም ውሰድ"
      },
      "items": {
       "en": [
        "4 + 1 + 1 = 3 coins"
       ],
       "am": [
        "4 + 1 + 1 = 3 ሳንቲሞች"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Dynamic programming",
       "am": "Dynamic programming"
      },
      "items": {
       "en": [
        "3 + 3 = 2 coins (optimal)",
        "solves every smaller amount once"
       ],
       "am": [
        "3 + 3 = 2 ሳንቲሞች (ምርጥ)",
        "እያንዳንዱን ትንሽ መጠን አንድ ጊዜ ይፈታል"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "stack",
    "title": {
     "en": "The memory hierarchy",
     "am": "የማስታወሻ ተዋረድ"
    },
    "layers": [
     {
      "t": {
       "en": "Registers",
       "am": "Registers"
      },
      "s": {
       "en": "< 1 ns",
       "am": "< 1 ns"
      }
     },
     {
      "t": {
       "en": "Cache (L1–L3)",
       "am": "Cache (L1–L3)"
      },
      "s": {
       "en": "1–10 ns; a miss means going further down",
       "am": "1–10 ns፤ miss ማለት ወደ ታች መሄድ ማለት ነው"
      }
     },
     {
      "t": {
       "en": "RAM",
       "am": "RAM"
      },
      "s": {
       "en": "≈ 100 ns",
       "am": "≈ 100 ns"
      }
     },
     {
      "t": {
       "en": "SSD / disk",
       "am": "SSD / disk"
      },
      "s": {
       "en": "≈ 100,000 ns and more",
       "am": "≈ 100,000 ns እና ከዚያ በላይ"
      }
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "from fractions import Fraction\ndef greedy(amount, coins):\n    used = []\n    for c in sorted(coins, reverse=True):\n        while amount >= c:\n            amount -= c; used.append(c)\n    return used\ndef dp(amount, coins):\n    best = [[]] + [None] * amount                  # best[a] = fewest coins for amount a\n    for a in range(1, amount + 1):\n        options = [best[a - c] + [c] for c in coins if c <= a and best[a - c] is not None]\n        best[a] = min(options, key=len) if options else None\n    return best[amount]\nprint(\"greedy:\", greedy(6, [1, 3, 4]), \" dynamic programming:\", dp(6, [1, 3, 4]))\nprint(\"expected value of a fair die:\", sum(Fraction(k, 6) for k in range(1, 7)), \"=\", 3.5)",
   "out": "greedy: [4, 1, 1]  dynamic programming: [3, 3]\nexpected value of a fair die: 7/2 = 3.5",
   "title": {
    "en": "When greedy fails, and an expected value",
    "am": "greedy ሲወድቅ፣ እና expected value"
   }
  },
  "qa": {
   "en": [
    "When the best local choice now blocks a better overall solution, as with coins 1, 3, 4 for 6.",
    "The data the CPU needs is not in the cache, so it must wait for slower memory (RAM), which can cost about 100 times more time.",
    "(1+2+3+4+5+6)/6 = 3.5."
   ],
   "am": [
    "አሁን ያለው ምርጥ የአካባቢ ምርጫ የተሻለ አጠቃላይ መፍትሔን ሲዘጋ፣ ለ6 በ1፣ 3፣ 4 ሳንቲሞች እንዳለው።",
    "CPU የሚፈልገው ዳታ በcache ውስጥ የለም፤ ስለዚህ ቀርፋፋውን ማስታወሻ (RAM) መጠበቅ አለበት፤ ይህም ወደ 100 እጥፍ ጊዜ ሊወስድ ይችላል።",
    "(1+2+3+4+5+6)/6 = 3.5።"
   ]
  }
 },
 {
  "why": {
   "en": "Operating systems, databases, networks and numerical methods are what keep real systems correct and fast.",
   "am": "የoperating systems፣ የዳታቤዞች፣ የኔትወርኮችና የnumerical methods እውቀት እውነተኛ ሥርዓቶችን ትክክለኛና ፈጣን የሚያደርጋቸው ነው።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Process vs thread",
     "am": "Process vs thread"
    },
    "cols": [
     {
      "h": {
       "en": "Process",
       "am": "Process"
      },
      "items": {
       "en": [
        "own memory space",
        "safe isolation, heavier to start"
       ],
       "am": [
        "የራሱ የማስታወሻ ቦታ",
        "ደህንነቱ የተጠበቀ መለያየት፣ ለመጀመር ከባድ"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Thread",
       "am": "Thread"
      },
      "items": {
       "en": [
        "shares memory with its process",
        "light and fast, but needs locks"
       ],
       "am": [
        "ማስታወሻን ከprocessኡ ጋር ይጋራል",
        "ቀላልና ፈጣን፣ ግን locks ያስፈልገዋል"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "A bank transfer is a transaction",
     "am": "የባንክ ዝውውር transaction ነው"
    },
    "nodes": [
     {
      "t": {
       "en": "BEGIN",
       "am": "BEGIN"
      }
     },
     {
      "t": {
       "en": "take 500 from A",
       "am": "ከA 500 ውሰድ"
      }
     },
     {
      "t": {
       "en": "add 500 to B",
       "am": "ለB 500 ጨምር"
      }
     },
     {
      "t": {
       "en": "COMMIT",
       "am": "COMMIT"
      },
      "s": {
       "en": "both happen, or neither (ROLLBACK)",
       "am": "ሁለቱም ይሆናሉ፣ ወይም አንዳቸውም (ROLLBACK)"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "stack",
    "title": {
     "en": "The internet stack",
     "am": "የኢንተርኔት ቁልል"
    },
    "layers": [
     {
      "t": {
       "en": "Application: HTTP, DNS",
       "am": "Application፡ HTTP፣ DNS"
      }
     },
     {
      "t": {
       "en": "Transport: TCP, UDP",
       "am": "Transport፡ TCP፣ UDP"
      }
     },
     {
      "t": {
       "en": "Internet: IP addresses, routing",
       "am": "Internet፡ IP አድራሻዎች፣ routing"
      }
     },
     {
      "t": {
       "en": "Link: Wi-Fi, 4G, fibre",
       "am": "Link፡ Wi-Fi፣ 4G፣ fibre"
      }
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "f = lambda x: x * x - 2                 # find sqrt(2): the root of x^2 - 2\nx = 1.0\nfor i in range(1, 6):                   # Newton's method: x <- x - f(x) / f'(x)\n    x = x - f(x) / (2 * x)\n    print(f\"Newton step {i}: x = {x:.12f}, error = {abs(x - 2 ** 0.5):.1e}\")\ny, lr = 1.0, 0.1\nfor i in range(200):                    # gradient descent on (y^2 - 2)^2\n    y -= lr * 4 * y * (y * y - 2)\nprint(f\"gradient descent after 200 steps: {y:.12f}, error = {abs(y - 2 ** 0.5):.1e}\")",
   "out": "Newton step 1: x = 1.500000000000, error = 8.6e-02\nNewton step 2: x = 1.416666666667, error = 2.5e-03\nNewton step 3: x = 1.414215686275, error = 2.1e-06\nNewton step 4: x = 1.414213562375, error = 1.6e-12\nNewton step 5: x = 1.414213562373, error = 0.0e+00\ngradient descent after 200 steps: 1.414213562373, error = 0.0e+00",
   "title": {
    "en": "Newton’s method vs gradient descent for √2",
    "am": "ለ√2 የNewton ዘዴ vs gradient descent"
   },
   "note": {
    "en": "Newton roughly doubles the correct digits each step; gradient descent is slower but needs only the gradient, which is why it trains neural networks.",
    "am": "Newton በእያንዳንዱ እርምጃ ትክክለኛ አሃዞችን ከሞላ ጎደል በእጥፍ ያሳድጋል፤ gradient descent ቀርፋፋ ነው ግን gradient ብቻ ያስፈልገዋል፤ ለዚህም ነው neural networksን የሚያሰለጥነው።"
   }
  },
  "qa": {
   "en": [
    "A process has its own memory; threads inside one process share memory, so they are lighter but must coordinate with locks.",
    "So that a group of changes either all happen or none do, even if power or the network fails in the middle (for example a money transfer).",
    "No. The halting problem, deciding for every program whether it stops, cannot be solved by any algorithm."
   ],
   "am": [
    "process የራሱ ማስታወሻ አለው፤ በአንድ process ውስጥ ያሉ threads ማስታወሻ ይጋራሉ፤ ስለዚህ ቀላል ናቸው ግን በlocks መቀናጀት አለባቸው።",
    "የለውጦች ቡድን ሁሉም እንዲሆኑ ወይም አንዳቸውም እንዳይሆኑ፣ ኃይል ወይም ኔትወርክ በመሀል ቢቋረጥም (ለምሳሌ የገንዘብ ዝውውር)።",
    "አይደለም። halting problem፣ ለእያንዳንዱ ፕሮግራም ይቆማል ወይ ብሎ መወሰን፣ በማንኛውም algorithm ሊፈታ አይችልም።"
   ]
  }
 },
 {
  "why": {
   "en": "Classical AI searches; machine learning fits data; honest evaluation tells you if it works.",
   "am": "ክላሲካል AI ይፈልጋል፤ machine learning ዳታን ይገጥማል፤ ታማኝ ግምገማ ይሠራ እንደሆነ ይነግርሃል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "The supervised learning loop",
     "am": "የsupervised learning ዑደት"
    },
    "nodes": [
     {
      "t": {
       "en": "Data + labels",
       "am": "ዳታ + labels"
      }
     },
     {
      "t": {
       "en": "Model",
       "am": "ሞዴል"
      },
      "s": {
       "en": "regression, tree, network",
       "am": "regression፣ tree፣ network"
      }
     },
     {
      "t": {
       "en": "Loss",
       "am": "Loss"
      },
      "s": {
       "en": "how wrong?",
       "am": "ምን ያህል ተሳሳተ?"
      }
     },
     {
      "t": {
       "en": "Update",
       "am": "አዘምን"
      },
      "s": {
       "en": "gradient step",
       "am": "gradient እርምጃ"
      },
      "hl": true
     }
    ],
    "loop": {
     "en": "repeat, then evaluate on held-out data",
     "am": "ድገም፣ ከዚያ በተለየ ዳታ ገምግም"
    }
   },
   {
    "type": "compare",
    "title": {
     "en": "Underfit, good fit, overfit",
     "am": "Underfit፣ ጥሩ fit፣ overfit"
    },
    "cols": [
     {
      "h": {
       "en": "Too simple",
       "am": "በጣም ቀላል"
      },
      "items": {
       "en": [
        "high train error",
        "high test error"
       ],
       "am": [
        "ከፍተኛ የሥልጠና ስህተት",
        "ከፍተኛ የፈተና ስህተት"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Just right",
       "am": "ልክ"
      },
      "items": {
       "en": [
        "low train error",
        "low test error"
       ],
       "am": [
        "ዝቅተኛ የሥልጠና ስህተት",
        "ዝቅተኛ የፈተና ስህተት"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Too complex",
       "am": "በጣም ውስብስብ"
      },
      "items": {
       "en": [
        "very low train error",
        "test error rises: memorised noise"
       ],
       "am": [
        "በጣም ዝቅተኛ የሥልጠና ስህተት",
        "የፈተና ስህተት ይጨምራል፡ ጫጫታን አስታውሷል"
       ]
      },
      "tone": "bad"
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "A* search",
     "am": "A* search"
    },
    "nodes": [
     {
      "t": {
       "en": "Start",
       "am": "መነሻ"
      }
     },
     {
      "t": {
       "en": "pick node with lowest f = g + h",
       "am": "ዝቅተኛ f = g + h ያለውን node ምረጥ"
      },
      "s": {
       "en": "g: cost so far, h: estimate to goal",
       "am": "g፡ እስካሁን ዋጋ፣ h፡ እስከ ግቡ ግምት"
      }
     },
     {
      "t": {
       "en": "Goal reached",
       "am": "ግቡ ደረሰ"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nfrom sklearn.tree import DecisionTreeRegressor\nfrom sklearn.model_selection import train_test_split\nrng = np.random.default_rng(4)\nx = rng.uniform(0, 10, 300).reshape(-1, 1)\ny = np.sin(x).ravel() + rng.normal(0, 0.3, 300)\nx_tr, x_te, y_tr, y_te = train_test_split(x, y, test_size=0.3, random_state=0)\nprint(\"depth  train error  test error\")\nfor depth in [1, 3, 5, 10, 20]:\n    m = DecisionTreeRegressor(max_depth=depth, random_state=0).fit(x_tr, y_tr)\n    tr = np.mean((m.predict(x_tr) - y_tr) ** 2); te = np.mean((m.predict(x_te) - y_te) ** 2)\n    print(f\"{depth:5d}  {tr:11.3f}  {te:10.3f}\")\n\nX = np.array([[0, 0], [0, 1], [1, 0], [1, 1]]); t = np.array([[0], [1], [1], [0]])    # XOR\nW1, W2 = rng.normal(0, 1, (2, 4)), rng.normal(0, 1, (4, 1))\nsig = lambda z: 1 / (1 + np.exp(-z))\nfor _ in range(5000):                      # 2-layer network, plain gradient descent\n    h = sig(X @ W1); out = sig(h @ W2)\n    d2 = (out - t) * out * (1 - out); d1 = d2 @ W2.T * h * (1 - h)\n    W2 -= 1.0 * h.T @ d2; W1 -= 1.0 * X.T @ d1\nprint(\"XOR predictions:\", out.round(2).ravel())",
   "out": "depth  train error  test error\n    1        0.447       0.414\n    3        0.101       0.130\n    5        0.058       0.123\n   10        0.006       0.141\n   20        0.000       0.152\nXOR predictions: [0.03 0.98 0.98 0.02]",
   "title": {
    "en": "Detecting overfitting, and a 2-layer network in NumPy",
    "am": "overfittingን መለየት፣ እና በNumPy ባለ 2-ንብርብር network"
   },
   "note": {
    "en": "Test error is lowest at a middle depth; deeper trees keep lowering training error but get worse on new data.",
    "am": "የፈተና ስህተቱ በመካከለኛ ጥልቀት ዝቅተኛ ነው፤ ጥልቅ trees የሥልጠና ስህተትን መቀነሳቸውን ይቀጥላሉ ግን በአዲስ ዳታ ላይ ይባባሳሉ።"
   }
  },
  "qa": {
   "en": [
    "The model learns noise in the training data, so it scores well there but badly on new data; detect it when training error keeps falling while validation error rises.",
    "The heuristic decides which nodes to explore first; a good (admissible) one finds the best path while exploring far fewer nodes.",
    "It rotates the data onto new axes ordered by how much variance they explain, so you can keep the first few and reduce dimensions."
   ],
   "am": [
    "ሞዴሉ በሥልጠና ዳታ ውስጥ ያለ ጫጫታን ይማራል፤ ስለዚህ እዚያ ጥሩ ውጤት ያገኛል ግን በአዲስ ዳታ ላይ መጥፎ፤ የሥልጠና ስህተት እየቀነሰ የvalidation ስህተት ሲጨምር ትለየዋለህ።",
    "heuristicኡ የትኞቹን nodes መጀመሪያ እንደሚያስስ ይወስናል፤ ጥሩ (admissible) heuristic በጣም ጥቂት nodes እያሰሰ ምርጡን መንገድ ያገኛል።",
    "ዳታውን በሚያብራሩት variance መጠን ወደ ተደረደሩ አዳዲስ axes ያዞረዋል፤ ስለዚህ የመጀመሪያዎቹን ጥቂቶች አቆይተህ dimensionsን መቀነስ ትችላለህ።"
   ]
  }
 }
];
