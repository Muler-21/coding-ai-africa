/* Level 6 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[6] = [
 {
  "why": {
   "en": "Theory explains when learning works, and causal thinking stops us confusing correlation with effect.",
   "am": "ቲዎሪ መማር መቼ እንደሚሠራ ያብራራል፤ የምክንያት አስተሳሰብ ተዛምዶን ከውጤት ጋር እንዳናምታታ ያደርገናል።"
  },
  "dg": [
   {
    "type": "tree",
    "title": {
     "en": "A confounder on the farm",
     "am": "በእርሻ ላይ ያለ confounder"
    },
    "root": {
     "t": {
      "en": "Wealth (confounder)",
      "am": "ሀብት (confounder)"
     }
    },
    "kids": [
     {
      "t": {
       "en": "→ buys more fertilizer",
       "am": "→ ብዙ ማዳበሪያ ይገዛል"
      }
     },
     {
      "t": {
       "en": "→ has better land and irrigation → higher yield",
       "am": "→ የተሻለ መሬትና መስኖ አለው → ከፍተኛ ምርት"
      }
     }
    ],
    "note": {
     "en": "Fertilizer and yield move together partly because wealth drives both. Adjust for wealth, or randomise, to see fertilizer’s own effect.",
     "am": "ማዳበሪያና ምርት በከፊል አብረው የሚንቀሳቀሱት ሀብት ሁለቱንም ስለሚነዳ ነው። የማዳበሪያውን የራሱን ውጤት ለማየት ሀብትን አስተካክል ወይም በዘፈቀደ መድብ።"
    }
   },
   {
    "type": "compare",
    "title": {
     "en": "Bias–variance",
     "am": "Bias–variance"
    },
    "cols": [
     {
      "h": {
       "en": "High bias",
       "am": "ከፍተኛ bias"
      },
      "items": {
       "en": [
        "model too simple",
        "misses real patterns"
       ],
       "am": [
        "ሞዴሉ በጣም ቀላል",
        "እውነተኛ ንድፎችን ያመልጣል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "High variance",
       "am": "ከፍተኛ variance"
      },
      "items": {
       "en": [
        "model too flexible",
        "fits noise, fails on new data"
       ],
       "am": [
        "ሞዴሉ በጣም ተለዋዋጭ",
        "ጫጫታን ይገጥማል፣ በአዲስ ዳታ ይወድቃል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Balance",
       "am": "ሚዛን"
      },
      "items": {
       "en": [
        "regularisation, more data, validation"
       ],
       "am": [
        "regularisation፣ ብዙ ዳታ፣ validation"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(8); n = 2000\nwealth = rng.normal(0, 1, n)\nfert = 50 + 20 * wealth + rng.normal(0, 10, n)                  # kg/ha: richer farms buy more\nyield_ = 1.5 + 0.010 * fert + 0.40 * wealth + rng.normal(0, 0.3, n)   # true fertilizer effect: 0.010 t per kg\nnaive = np.polyfit(fert, yield_, 1)[0]\nX = np.column_stack([np.ones(n), fert, wealth])\nadjusted = np.linalg.lstsq(X, yield_, rcond=None)[0][1]\nprint(f\"true effect 0.010 t/ha per kg | naive estimate {naive:.3f} | adjusted for wealth {adjusted:.3f}\")",
   "out": "true effect 0.010 t/ha per kg | naive estimate 0.026 | adjusted for wealth 0.009",
   "title": {
    "en": "Confounding: the naive estimate is badly wrong",
    "am": "Confounding፡ ቀላሉ ግምት በጣም ስህተት ነው"
   }
  },
  "qa": {
   "en": [
    "It may have memorised noise (high variance) or found patterns that do not hold in new conditions; only performance on new data shows real learning.",
    "A variable that affects both the cause and the outcome, such as farm wealth affecting both fertilizer use and yield.",
    "MCMC when you need accurate posteriors and can afford the time; variational inference when data or models are large and a fast approximation is enough."
   ],
   "am": [
    "ጫጫታን አስታውሶ ሊሆን ይችላል (ከፍተኛ variance) ወይም በአዲስ ሁኔታዎች የማይቆሙ ንድፎችን አግኝቶ ሊሆን ይችላል፤ እውነተኛ መማርን የሚያሳየው በአዲስ ዳታ ላይ ያለ አፈጻጸም ብቻ ነው።",
    "መንስኤውንም ውጤቱንም የሚነካ variable፣ ለምሳሌ የእርሻ ሀብት በማዳበሪያ አጠቃቀምና በምርት ላይ።",
    "ትክክለኛ posteriors ሲያስፈልጉና ጊዜ ሲኖር MCMC፤ ዳታ ወይም ሞዴሎች ትልቅ ሲሆኑና ፈጣን ግምት በቂ ሲሆን variational inference።"
   ]
  }
 },
 {
  "why": {
   "en": "Modern deep learning rests on a few ideas: good optimisers, regularisation and attention.",
   "am": "ዘመናዊ deep learning በጥቂት ሐሳቦች ላይ ያርፋል፡ ጥሩ optimisers፣ regularisation እና attention።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Self-attention in one picture",
     "am": "Self-attention በአንድ ሥዕል"
    },
    "nodes": [
     {
      "t": {
       "en": "Each word → Q, K, V",
       "am": "እያንዳንዱ ቃል → Q፣ K፣ V"
      },
      "s": {
       "en": "query, key, value vectors",
       "am": "query፣ key፣ value vectors"
      }
     },
     {
      "t": {
       "en": "Scores = Q·K / √d",
       "am": "Scores = Q·K / √d"
      },
      "s": {
       "en": "how relevant is each other word?",
       "am": "እያንዳንዱ ሌላ ቃል ምን ያህል ተገቢ ነው?"
      }
     },
     {
      "t": {
       "en": "softmax → weights",
       "am": "softmax → weights"
      },
      "s": {
       "en": "they sum to 1",
       "am": "ድምራቸው 1 ነው"
      }
     },
     {
      "t": {
       "en": "Output = weights · V",
       "am": "ውጤት = weights · V"
      },
      "s": {
       "en": "a context-aware word",
       "am": "አውዱን የሚያውቅ ቃል"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "How diffusion generates an image",
     "am": "diffusion ምስልን እንዴት እንደሚፈጥር"
    },
    "nodes": [
     {
      "t": {
       "en": "Pure noise",
       "am": "ንጹሕ ጫጫታ"
      }
     },
     {
      "t": {
       "en": "Remove a little noise",
       "am": "ትንሽ ጫጫታ አስወግድ"
      },
      "s": {
       "en": "a network predicts the noise",
       "am": "network ጫጫታውን ይተነብያል"
      }
     },
     {
      "t": {
       "en": "Repeat ~50 steps",
       "am": "~50 እርምጃዎች ድገም"
      }
     },
     {
      "t": {
       "en": "Image",
       "am": "ምስል"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(0)\nwords = [\"the\", \"cow\", \"gives\", \"milk\"]\nd = 8; E = rng.normal(0, 1, (4, d))\nWq, Wk, Wv = (rng.normal(0, 1 / np.sqrt(d), (d, d)) for _ in range(3))\nQ, K, V = E @ Wq, E @ Wk, E @ Wv\nscores = Q @ K.T / np.sqrt(d)\nweights = np.exp(scores - scores.max(1, keepdims=True)); weights /= weights.sum(1, keepdims=True)\nprint(\"attention of 'milk' to each word:\", {w: round(float(a), 2) for w, a in zip(words, weights[3])})\n\ndef train(opt, steps=200):       # minimise an elongated bowl f = 50 x^2 + y^2\n    p = np.array([1.0, 1.0]); m = v = np.zeros(2)\n    for t in range(1, steps + 1):\n        g = np.array([100 * p[0], 2 * p[1]])\n        if opt == \"sgd\":\n            p = p - 0.009 * g\n        else:                      # Adam: per-parameter step sizes\n            m = 0.9 * m + 0.1 * g; v = 0.999 * v + 0.001 * g * g\n            p = p - 0.05 * (m / (1 - 0.9 ** t)) / (np.sqrt(v / (1 - 0.999 ** t)) + 1e-8)\n    return 50 * p[0] ** 2 + p[1] ** 2\nprint(f\"loss after 200 steps: SGD {train('sgd'):.4f}, Adam {train('adam'):.6f}\")",
   "out": "attention of 'milk' to each word: {'the': 0.22, 'cow': 0.28, 'gives': 0.21, 'milk': 0.29}\nloss after 200 steps: SGD 0.0007, Adam 0.000000",
   "title": {
    "en": "Attention weights from scratch, and Adam vs SGD",
    "am": "attention weightsን ከመነሻ፣ እና Adam vs SGD"
   },
   "note": {
    "en": "The weights here come from random, untrained matrices; after training, \"milk\" would attend strongly to \"cow\" and \"gives\".",
    "am": "እዚህ ያሉት weights ከዘፈቀደ፣ ካልሰለጠኑ ማትሪክሶች የመጡ ናቸው፤ ከሥልጠና በኋላ «milk» ለ«cow» እና ለ«gives» ጠንካራ ትኩረት ይሰጣል።"
   }
  },
  "qa": {
   "en": [
    "Adam gives each parameter its own step size from running averages of the gradient and its square, so flat and steep directions both make progress; plain SGD uses one step size for all.",
    "How much one token should take information from another token, after softmax: a weight between 0 and 1.",
    "It starts from random noise and repeatedly removes a little predicted noise with a trained network until an image appears."
   ],
   "am": [
    "Adam ለእያንዳንዱ parameter ከgradient እና ከካሬው ተንቀሳቃሽ አማካዮች የራሱን የእርምጃ መጠን ይሰጣል፤ ስለዚህ ጠፍጣፋም ቁልቁልም አቅጣጫዎች ይራመዳሉ፤ ቀላል SGD ለሁሉም አንድ የእርምጃ መጠን ይጠቀማል።",
    "አንድ token ከሌላ token ምን ያህል መረጃ መውሰድ እንዳለበት፣ ከsoftmax በኋላ፡ በ0 እና በ1 መካከል ያለ weight።",
    "ከዘፈቀደ ጫጫታ ይጀምራል፤ በሰለጠነ network የተተነበየውን ትንሽ ጫጫታ ደጋግሞ ያስወግዳል፤ ምስል እስኪታይ ድረስ።"
   ]
  }
 },
 {
  "why": {
   "en": "Reinforcement learning learns decisions from rewards: useful for irrigation, energy and logistics, with care.",
   "am": "reinforcement learning ውሳኔዎችን ከሽልማቶች ይማራል፡ ለመስኖ፣ ለኃይልና ለሎጂስቲክስ ጠቃሚ ነው፣ በጥንቃቄ።"
  },
  "dg": [
   {
    "type": "cycle",
    "title": {
     "en": "The agent–environment loop",
     "am": "የagent–environment ዑደት"
    },
    "nodes": [
     {
      "t": {
       "en": "State",
       "am": "ሁኔታ"
      },
      "s": {
       "en": "soil is dry",
       "am": "አፈሩ ደረቅ ነው"
      }
     },
     {
      "t": {
       "en": "Action",
       "am": "ተግባር"
      },
      "s": {
       "en": "irrigate",
       "am": "አጠጣ"
      }
     },
     {
      "t": {
       "en": "Reward",
       "am": "ሽልማት"
      },
      "s": {
       "en": "+ growth − water cost",
       "am": "+ ዕድገት − የውሃ ወጪ"
      }
     },
     {
      "t": {
       "en": "New state",
       "am": "አዲስ ሁኔታ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Reward design",
     "am": "የሽልማት ንድፍ"
    },
    "cols": [
     {
      "h": {
       "en": "Bad reward",
       "am": "መጥፎ ሽልማት"
      },
      "items": {
       "en": [
        "+1 per litre pumped",
        "→ agent floods the field"
       ],
       "am": [
        "በአንድ የተቀዳ ሊትር +1",
        "→ agentኡ ማሳውን ያጥለቀልቃል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Better reward",
       "am": "የተሻለ ሽልማት"
      },
      "items": {
       "en": [
        "crop growth − water cost − penalty if soil is waterlogged"
       ],
       "am": [
        "የሰብል ዕድገት − የውሃ ወጪ − አፈሩ ውሃ ከጠገበ ቅጣት"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(3)\nstates = [\"dry\", \"ok\", \"wet\"]; actions = [\"wait\", \"irrigate\"]\ndef step(s, a):\n    if a == 1: s2 = min(s + 1, 2); cost = 1.0\n    else:      s2 = max(s - (rng.random() < 0.6), 0); cost = 0.0      # soil dries 60% of days\n    reward = {0: -2.0, 1: 3.0, 2: -1.0}[s2] - cost                      # growth is best when \"ok\"\n    return s2, reward\nQ = np.zeros((3, 2)); s = 1; gamma, alpha = 0.9, 0.1\nfor t in range(20000):\n    a = rng.integers(2) if rng.random() < 0.1 else int(Q[s].argmax())  # explore 10%\n    s2, r = step(s, a)\n    Q[s, a] += alpha * (r + gamma * Q[s2].max() - Q[s, a])             # Q-learning update\n    s = s2\nfor i, name in enumerate(states):\n    print(f\"soil {name:4s}: wait {Q[i,0]:6.2f}  irrigate {Q[i,1]:6.2f}  -> learned: {actions[Q[i].argmax()]}\")",
   "out": "soil dry : wait   4.82  irrigate   7.98  -> learned: irrigate\nsoil ok  : wait   6.49  irrigate   4.69  -> learned: wait\nsoil wet : wait   7.07  irrigate   4.89  -> learned: wait",
   "title": {
    "en": "Q-learning a simple irrigation rule",
    "am": "ቀላል የመስኖ ሕግን በQ-learning መማር"
   },
   "note": {
    "en": "The learned policy (irrigate when dry, wait otherwise) is the rule an agronomist would write: when a simple rule is known, use it; RL pays off when the system is too complex for rules.",
    "am": "የተማረው ፖሊሲ (ደረቅ ሲሆን አጠጣ፣ ካልሆነ ጠብቅ) አንድ አግሮኖሚስት የሚጽፈው ሕግ ነው፡ ቀላል ሕግ ሲታወቅ ተጠቀምበት፤ RL የሚያዋጣው ሥርዓቱ ለሕጎች በጣም ውስብስብ ሲሆን ነው።"
   }
  },
  "qa": {
   "en": [
    "It sets how much future rewards count compared with immediate ones (γ near 1 = plan far ahead); it also keeps long-run sums finite.",
    "The agent maximises exactly what is rewarded, so it finds loopholes (for example pumping water to earn points) that defeat the real goal.",
    "When the system is well understood, data are scarce, or mistakes are costly: a tested expert rule is cheaper, safer and easier to explain."
   ],
   "am": [
    "የወደፊት ሽልማቶች ከአሁኖቹ ጋር ሲነጻጸሩ ምን ያህል እንደሚቆጠሩ ያስቀምጣል (γ ወደ 1 ሲቀርብ = ሩቅ ማቀድ)፤ የረጅም ጊዜ ድምሮችንም ውሱን ያደርጋል።",
    "agentኡ የሚሸለመውን በትክክል ከፍ ያደርጋል፤ ስለዚህ እውነተኛውን ግብ የሚያከሽፉ ቀዳዳዎችን ያገኛል (ለምሳሌ ነጥብ ለማግኘት ውሃ መቅዳት)።",
    "ሥርዓቱ በደንብ ሲታወቅ፣ ዳታ ጥቂት ሲሆን፣ ወይም ስህተቶች ውድ ሲሆኑ፡ የተፈተነ የባለሙያ ሕግ ርካሽ፣ ደህንነቱ የተጠበቀና ለማብራራት ቀላል ነው።"
   ]
  }
 },
 {
  "why": {
   "en": "Research data outgrow laptops; clusters, workflows and containers make big analyses possible and repeatable.",
   "am": "የምርምር ዳታ ከላፕቶፖች ያልፋል፤ clusters፣ workflows እና containers ትላልቅ ትንተናዎችን የሚቻሉና የሚደገሙ ያደርጋሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Running on a cluster",
     "am": "በcluster ላይ ማስኬድ"
    },
    "nodes": [
     {
      "t": {
       "en": "Login node",
       "am": "Login node"
      },
      "s": {
       "en": "edit, submit; never compute here",
       "am": "አስተካክል፣ አስገባ፤ እዚህ በፍጹም አታስላ"
      }
     },
     {
      "t": {
       "en": "sbatch job.sh",
       "am": "sbatch job.sh"
      }
     },
     {
      "t": {
       "en": "SLURM queue",
       "am": "የSLURM ወረፋ"
      },
      "s": {
       "en": "waits for free nodes",
       "am": "ነጻ nodes ይጠብቃል"
      }
     },
     {
      "t": {
       "en": "Compute nodes",
       "am": "Compute nodes"
      },
      "s": {
       "en": "array: 100 samples in parallel",
       "am": "array፡ 100 ናሙናዎች በትይዩ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Shell script vs workflow manager",
     "am": "Shell script vs workflow manager"
    },
    "cols": [
     {
      "h": {
       "en": "Shell script",
       "am": "Shell script"
      },
      "items": {
       "en": [
        "reruns everything after a failure",
        "hard to parallelise and track"
       ],
       "am": [
        "ከውድቀት በኋላ ሁሉንም እንደገና ያስኬዳል",
        "ለትይዩና ለመከታተል ከባድ"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Snakemake / Nextflow",
       "am": "Snakemake / Nextflow"
      },
      "items": {
       "en": [
        "knows which outputs exist, resumes",
        "runs steps in parallel, logs everything, uses containers"
       ],
       "am": [
        "የትኞቹ ውጤቶች እንዳሉ ያውቃል፣ ይቀጥላል",
        "እርምጃዎችን በትይዩ ያስኬዳል፣ ሁሉንም ይመዘግባል፣ containers ይጠቀማል"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "SLURM job array (bash)",
   "code": "#!/bin/bash\n#SBATCH --job-name=align\n#SBATCH --array=1-100            # 100 tasks, one per sample\n#SBATCH --cpus-per-task=8\n#SBATCH --mem=16G\n#SBATCH --time=04:00:00\n#SBATCH --output=logs/%x_%A_%a.out\n\nSAMPLE=$(sed -n \"${SLURM_ARRAY_TASK_ID}p\" samples.txt)     # line N of the sample list\napptainer exec tools.sif \\\n  bwa mem -t $SLURM_CPUS_PER_TASK ref.fa reads/${SAMPLE}_R1.fq.gz reads/${SAMPLE}_R2.fq.gz \\\n  | apptainer exec tools.sif samtools sort -o bam/${SAMPLE}.bam",
   "title": {
    "en": "Align 100 samples with one job array",
    "am": "100 ናሙናዎችን በአንድ job array አሰልፍ"
   },
   "note": {
    "en": "Submit with sbatch align.sh; check with squeue -u $USER. The container (tools.sif) fixes the software versions.",
    "am": "በsbatch align.sh አስገባ፤ በsqueue -u $USER ፈትሽ። containerኡ (tools.sif) የሶፍትዌር ስሪቶችን ያስተካክላል።"
   }
  },
  "qa": {
   "en": [
    "It submits many similar tasks at once (for example one per sample), each with its own task ID, so they run in parallel under one job.",
    "It tracks dependencies and finished outputs, resumes after failures, runs independent steps in parallel and records exactly what was run.",
    "It packages the exact software and versions, so the analysis runs the same on any machine and years later."
   ],
   "am": [
    "ብዙ ተመሳሳይ ተግባራትን በአንድ ጊዜ ያስገባል (ለምሳሌ ለእያንዳንዱ ናሙና አንድ)፤ እያንዳንዱ የራሱ task ID አለው፤ ስለዚህ በአንድ job ሥር በትይዩ ይሠራሉ።",
    "ጥገኝነቶችንና የተጠናቀቁ ውጤቶችን ይከታተላል፣ ከውድቀት በኋላ ይቀጥላል፣ ገለልተኛ እርምጃዎችን በትይዩ ያስኬዳል፣ የተሠራውንም በትክክል ይመዘግባል።",
    "ትክክለኛውን ሶፍትዌርና ስሪቶቹን ያሽጋል፤ ስለዚህ ትንተናው በማንኛውም ማሽን ላይና ከዓመታት በኋላም በተመሳሳይ ይሠራል።"
   ]
  }
 },
 {
  "why": {
   "en": "Correct statistics separate real findings from noise and give results others can trust.",
   "am": "ትክክለኛ ስታቲስቲክስ እውነተኛ ግኝቶችን ከጫጫታ ይለያል፤ ሌሎች ሊያምኗቸው የሚችሉ ውጤቶችንም ይሰጣል።"
  },
  "dg": [
   {
    "type": "tree",
    "title": {
     "en": "Data with structure need a mixed model",
     "am": "መዋቅር ያለው ዳታ mixed model ይፈልጋል"
    },
    "root": {
     "t": {
      "en": "Region",
      "am": "ክልል"
     }
    },
    "kids": [
     {
      "t": {
       "en": "Herd A (random effect)",
       "am": "መንጋ A (random effect)"
      },
      "kids": [
       {
        "t": {
         "en": "cow 1, cow 2, cow 3",
         "am": "ላም 1፣ ላም 2፣ ላም 3"
        }
       }
      ]
     },
     {
      "t": {
       "en": "Herd B (random effect)",
       "am": "መንጋ B (random effect)"
      },
      "kids": [
       {
        "t": {
         "en": "cow 4, cow 5",
         "am": "ላም 4፣ ላም 5"
        }
       }
      ]
     }
    ],
    "note": {
     "en": "Cows in one herd share feed and management, so they are not independent. A herd random effect accounts for this.",
     "am": "በአንድ መንጋ ያሉ ላሞች መኖና አያያዝ ይጋራሉ፤ ስለዚህ ገለልተኛ አይደሉም። የመንጋ random effect ይህን ይይዛል።"
    }
   },
   {
    "type": "flow",
    "title": {
     "en": "Power analysis before the experiment",
     "am": "ከሙከራው በፊት የpower ትንተና"
    },
    "nodes": [
     {
      "t": {
       "en": "Smallest effect worth finding",
       "am": "ሊገኝ የሚገባው ትንሹ ውጤት"
      },
      "s": {
       "en": "0.3 t/ha",
       "am": "0.3 t/ha"
      }
     },
     {
      "t": {
       "en": "Variation (SD)",
       "am": "ልዩነት (SD)"
      },
      "s": {
       "en": "0.5 t/ha",
       "am": "0.5 t/ha"
      }
     },
     {
      "t": {
       "en": "α = 0.05, power = 0.8",
       "am": "α = 0.05፣ power = 0.8"
      }
     },
     {
      "t": {
       "en": "Plots needed",
       "am": "የሚያስፈልጉ ማሳዎች"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nfrom scipy import stats\ndiff, sd, alpha = 0.3, 0.5, 0.05                       # t/ha\nfor n in [10, 20, 30, 45, 60]:                          # plots per treatment\n    df = 2 * n - 2; ncp = diff / (sd * np.sqrt(2 / n))\n    tcrit = stats.t.ppf(1 - alpha / 2, df)\n    power = 1 - stats.nct.cdf(tcrit, df, ncp) + stats.nct.cdf(-tcrit, df, ncp)\n    print(f\"n = {n:2d} plots per treatment -> power {power:.2f}\")\nrng = np.random.default_rng(1)                          # check one case by simulation\nsims = [stats.ttest_ind(rng.normal(0, sd, 45), rng.normal(diff, sd, 45)).pvalue < alpha for _ in range(4000)]\nprint(f\"simulation check for n = 45: power {np.mean(sims):.2f}\")",
   "out": "n = 10 plots per treatment -> power 0.25\nn = 20 plots per treatment -> power 0.46\nn = 30 plots per treatment -> power 0.63\nn = 45 plots per treatment -> power 0.80\nn = 60 plots per treatment -> power 0.90\nsimulation check for n = 45: power 0.81",
   "title": {
    "en": "How many plots do you need?",
    "am": "ስንት ማሳዎች ያስፈልጉሃል?"
   }
  },
  "qa": {
   "en": [
    "Animals in the same herd share conditions, so their records are correlated; a random effect models this and gives honest standard errors and conclusions that extend to other herds.",
    "Among all the results you call significant, about 5% are expected to be false positives.",
    "When the likelihood is too complex to write down but you can simulate data from the model, for example demographic history from genomes."
   ],
   "am": [
    "በአንድ መንጋ ያሉ እንስሳት ሁኔታዎችን ይጋራሉ፤ ስለዚህ መዝገቦቻቸው ይዛመዳሉ፤ random effect ይህን ይቀርጻል፣ ታማኝ standard errors እና ወደ ሌሎች መንጋዎች የሚዘልቁ ድምዳሜዎችን ይሰጣል።",
    "ጉልህ ከምትላቸው ውጤቶች ሁሉ መካከል ወደ 5% ገደማ የሐሰት አዎንታዊ እንደሚሆኑ ይጠበቃል።",
    "likelihoodኡ ለመጻፍ በጣም ውስብስብ ሲሆን ግን ከሞዴሉ ዳታ ማስመሰል ስትችል፣ ለምሳሌ ከጂኖሞች የሕዝብ ታሪክ።"
   ]
  }
 },
 {
  "why": {
   "en": "Good research is a craft: clear questions, fair comparisons, reproducible work and honest publishing.",
   "am": "ጥሩ ምርምር ሙያ ነው፡ ግልጽ ጥያቄዎች፣ ፍትሐዊ ንጽጽሮች፣ ሊደገም የሚችል ሥራና ታማኝ ኅትመት።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "From question to paper",
     "am": "ከጥያቄ ወደ ጽሑፍ"
    },
    "nodes": [
     {
      "t": {
       "en": "Literature map",
       "am": "የሥነ-ጽሑፍ ካርታ"
      }
     },
     {
      "t": {
       "en": "Hypothesis + baseline",
       "am": "መላምት + baseline"
      }
     },
     {
      "t": {
       "en": "Experiments + ablations",
       "am": "ሙከራዎች + ablations"
      },
      "s": {
       "en": "remove one part at a time",
       "am": "አንድ ክፍልን በአንድ ጊዜ አስወግድ"
      }
     },
     {
      "t": {
       "en": "Code + data on GitHub / Zenodo",
       "am": "ኮድ + ዳታ በGitHub / Zenodo"
      }
     },
     {
      "t": {
       "en": "Paper",
       "am": "ጽሑፍ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Is this journal predatory?",
     "am": "ይህ ጆርናል አዳኝ (predatory) ነው?"
    },
    "cols": [
     {
      "h": {
       "en": "Warning signs",
       "am": "የማስጠንቀቂያ ምልክቶች"
      },
      "items": {
       "en": [
        "spam e-mails promising fast acceptance",
        "fee before review, fake impact factor",
        "not indexed in Scopus, Web of Science or DOAJ"
       ],
       "am": [
        "ፈጣን ተቀባይነትን የሚያረጋግጡ spam ኢሜሎች",
        "ከግምገማ በፊት ክፍያ፣ የሐሰት impact factor",
        "በScopus፣ Web of Science ወይም DOAJ ያልተመዘገበ"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Good signs",
       "am": "ጥሩ ምልክቶች"
      },
      "items": {
       "en": [
        "real editorial board you can verify",
        "clear peer-review process",
        "indexed; a recognised society or publisher"
       ],
       "am": [
        "ልታረጋግጠው የምትችለው እውነተኛ የአርታኢ ቦርድ",
        "ግልጽ የአቻ ግምገማ ሂደት",
        "የተመዘገበ፤ የታወቀ ማኅበር ወይም አሳታሚ"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "CITATION.cff (YAML)",
   "code": "cff-version: 1.2.0\nmessage: \"If you use this software, please cite it as below.\"\ntitle: \"Teff yield model\"\nversion: 1.0.0\ndate-released: 2026-11-15\ndoi: 10.5281/zenodo.0000000          # from the Zenodo release\nauthors:\n  - family-names: Bitew\n    given-names: Mulusew Kassa\n    orcid: \"https://orcid.org/0000-0001-6223-0037\"\n    affiliation: \"University of Molise, Italy; Debre Markos University, Ethiopia\"\nrepository-code: \"https://github.com/Muler-21/teff-yield-model\"\nlicense: CC-BY-4.0",
   "title": {
    "en": "Make your code citable",
    "am": "ኮድህን የሚጠቀስ አድርግ"
   },
   "note": {
    "en": "Reproducibility checklist: code in Git with a release, data on Zenodo with a DOI, fixed random seeds, a container or environment file, and a README that reproduces every figure.",
    "am": "የመደገም ማረጋገጫ ዝርዝር፡ ኮድ በGit ከrelease ጋር፣ ዳታ በZenodo ከDOI ጋር፣ ቋሚ random seeds፣ container ወይም environment ፋይል፣ እና እያንዳንዱን figure የሚደግም README።"
   }
  },
  "qa": {
   "en": [
    "To show which parts of a method actually cause the improvement, by removing or replacing one component at a time and measuring the change.",
    "Code (versioned), data or how to obtain it, exact software environment, parameters and random seeds, and the steps that produce each figure and table.",
    "Unsolicited e-mails, promises of very fast acceptance, fees before review, unverifiable editors or impact factors, and no listing in Scopus, Web of Science or DOAJ; check before submitting."
   ],
   "am": [
    "የአንድ ዘዴ የትኞቹ ክፍሎች በእርግጥ መሻሻሉን እንደሚያመጡ ለማሳየት፣ አንድን ክፍል በአንድ ጊዜ በማስወገድ ወይም በመተካትና ለውጡን በመለካት።",
    "ኮድ (ስሪት ያለው)፣ ዳታ ወይም እንዴት እንደሚገኝ፣ ትክክለኛ የሶፍትዌር አካባቢ፣ parameters እና random seeds፣ እንዲሁም እያንዳንዱን figure እና ሰንጠረዥ የሚያፈሩ እርምጃዎች።",
    "ያልተጠየቁ ኢሜሎች፣ በጣም ፈጣን ተቀባይነት የሚሉ ቃሎች፣ ከግምገማ በፊት ክፍያ፣ ሊረጋገጡ የማይችሉ አርታኢዎች ወይም impact factors፣ እና በScopus፣ Web of Science ወይም DOAJ አለመመዝገብ፤ ከማስገባትህ በፊት ፈትሽ።"
   ]
  }
 }
];
