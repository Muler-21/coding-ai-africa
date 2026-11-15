/* Level 7 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[7] = [
 {
  "why": {
   "en": "Understanding how LLMs are built shows where they fail for African languages and how to fix it.",
   "am": "LLMs እንዴት እንደሚገነቡ መረዳት ለአፍሪካ ቋንቋዎች የት እንደሚወድቁና እንዴት እንደሚስተካከሉ ያሳያል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "How an LLM is made",
     "am": "LLM እንዴት እንደሚሠራ"
    },
    "nodes": [
     {
      "t": {
       "en": "Curated text",
       "am": "የተመረጠ ጽሑፍ"
      },
      "s": {
       "en": "quality, licences, consent",
       "am": "ጥራት፣ ፈቃዶች፣ ስምምነት"
      }
     },
     {
      "t": {
       "en": "Tokeniser",
       "am": "Tokeniser"
      },
      "s": {
       "en": "text → token IDs",
       "am": "ጽሑፍ → token IDs"
      }
     },
     {
      "t": {
       "en": "Pre-training",
       "am": "Pre-training"
      },
      "s": {
       "en": "predict the next token",
       "am": "ቀጣዩን token ተንብይ"
      }
     },
     {
      "t": {
       "en": "Instruction + preference tuning",
       "am": "Instruction + preference tuning"
      },
      "s": {
       "en": "SFT, RLHF / DPO",
       "am": "SFT፣ RLHF / DPO"
      }
     },
     {
      "t": {
       "en": "Evaluation",
       "am": "ግምገማ"
      },
      "s": {
       "en": "including Amharic",
       "am": "አማርኛን ጨምሮ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Why tokenisers matter for Amharic",
     "am": "tokenisers ለአማርኛ ለምን አስፈላጊ ናቸው"
    },
    "cols": [
     {
      "h": {
       "en": "English-heavy tokeniser",
       "am": "እንግሊዝኛ የበዛበት tokeniser"
      },
      "items": {
       "en": [
        "each Ge’ez character is 3 bytes in UTF-8",
        "words split into many tokens → slower, costlier, shorter context"
       ],
       "am": [
        "እያንዳንዱ የግዕዝ ፊደል በUTF-8 3 bytes ነው",
        "ቃላት ወደ ብዙ tokens ይከፈላሉ → ቀርፋፋ፣ ውድ፣ አጭር አውድ"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Tokeniser trained with Amharic",
       "am": "ከአማርኛ ጋር የሰለጠነ tokeniser"
      },
      "items": {
       "en": [
        "common syllables and words become single tokens",
        "fair cost and quality"
       ],
       "am": [
        "የተለመዱ ፊደላትና ቃላት ነጠላ tokens ይሆናሉ",
        "ፍትሐዊ ወጪና ጥራት"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "pairs = [(\"water\", \"ውሃ\"), (\"school\", \"ትምህርት ቤት\"), (\"agriculture\", \"ግብርና\"), (\"Ethiopia\", \"ኢትዮጵያ\")]\nprint(\"word          chars  UTF-8 bytes\")\nfor en, am in pairs:\n    print(f\"{en:12s} {len(en):5d} {len(en.encode()):7d}   |  {am:10s} {len(am):3d} chars {len(am.encode()):3d} bytes\")\n# A byte-level tokeniser that never saw Amharic needs up to one token per byte.\n# Compute-optimal training (Chinchilla, 2022): about 20 training tokens per parameter.\nfor params in [1e9, 7e9, 70e9]:\n    print(f\"{params / 1e9:4.0f}B parameters -> about {20 * params / 1e12:.2f} trillion tokens\")",
   "out": "word          chars  UTF-8 bytes\nwater            5       5   |  ውሃ           2 chars   6 bytes\nschool           6       6   |  ትምህርት ቤት     8 chars  22 bytes\nagriculture     11      11   |  ግብርና         4 chars  12 bytes\nEthiopia         8       8   |  ኢትዮጵያ        5 chars  15 bytes\n   1B parameters -> about 0.02 trillion tokens\n   7B parameters -> about 0.14 trillion tokens\n  70B parameters -> about 1.40 trillion tokens",
   "title": {
    "en": "Bytes per word, and the scaling-law rule of thumb",
    "am": "በቃል bytes፣ እና የscaling-law ግምታዊ ሕግ"
   },
   "note": {
    "en": "The Chinchilla ratio is a rule of thumb for compute-optimal training; many recent models train on far more tokens to make inference cheaper.",
    "am": "የChinchilla ጥምርታ ለcompute-optimal ሥልጠና ግምታዊ ሕግ ነው፤ ብዙ የቅርብ ጊዜ ሞዴሎች inferenceን ርካሽ ለማድረግ በብዙ እጥፍ tokens ይሰለጥናሉ።"
   }
  },
  "qa": {
   "en": [
    "Ge’ez characters take 3 bytes each, and tokenisers trained mostly on English split Amharic into many tokens, making models slower, costlier and weaker in Amharic.",
    "How loss falls as parameters, data and compute grow, roughly as power laws, which lets you plan model and data size for a budget.",
    "The model can learn to please raters (flattery, overconfident or long answers) instead of being correct; it can also lose skills or become over-cautious."
   ],
   "am": [
    "የግዕዝ ፊደላት እያንዳንዳቸው 3 bytes ይወስዳሉ፤ በአብዛኛው በእንግሊዝኛ የሰለጠኑ tokenisers አማርኛን ወደ ብዙ tokens ይከፍላሉ፤ ሞዴሎችን በአማርኛ ቀርፋፋ፣ ውድና ደካማ ያደርጋሉ።",
    "parameters፣ ዳታና compute ሲያድጉ loss እንዴት እንደሚወርድ፣ በግምት እንደ power laws፤ ይህም ለበጀት የሞዴልና የዳታ መጠን ለማቀድ ያስችላል።",
    "ሞዴሉ ትክክል ከመሆን ይልቅ ገምጋሚዎችን ማስደሰት (ማሞካሸት፣ ከመጠን በላይ እርግጠኛ ወይም ረጅም መልሶች) ሊማር ይችላል፤ ክህሎቶችንም ሊያጣ ወይም ከመጠን በላይ ጠንቃቃ ሊሆን ይችላል።"
   ]
  }
 },
 {
  "why": {
   "en": "Large models need many GPUs working together, and smart tricks to cut memory, time and cost.",
   "am": "ትላልቅ ሞዴሎች አብረው የሚሠሩ ብዙ GPUs እና ማስታወሻን፣ ጊዜንና ወጪን የሚቀንሱ ብልሃቶች ያስፈልጋቸዋል።"
  },
  "dg": [
   {
    "type": "stack",
    "title": {
     "en": "Three ways to split the work",
     "am": "ሥራውን የመከፋፈል ሦስት መንገዶች"
    },
    "layers": [
     {
      "t": {
       "en": "Data parallel",
       "am": "Data parallel"
      },
      "s": {
       "en": "each GPU has the whole model, different data",
       "am": "እያንዳንዱ GPU ሙሉውን ሞዴል፣ የተለየ ዳታ"
      }
     },
     {
      "t": {
       "en": "Tensor parallel",
       "am": "Tensor parallel"
      },
      "s": {
       "en": "each layer’s matrices split across GPUs",
       "am": "የእያንዳንዱ ንብርብር ማትሪክሶች በGPUs መካከል ይከፈላሉ"
      }
     },
     {
      "t": {
       "en": "Pipeline parallel",
       "am": "Pipeline parallel"
      },
      "s": {
       "en": "groups of layers on different GPUs: needed when the model does not fit on one GPU",
       "am": "የንብርብሮች ቡድኖች በተለያዩ GPUs፡ ሞዴሉ በአንድ GPU ላይ ሳይገጥም ሲቀር ያስፈልጋል"
      }
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Full fine-tuning vs LoRA",
     "am": "ሙሉ fine-tuning vs LoRA"
    },
    "cols": [
     {
      "h": {
       "en": "Full fine-tuning",
       "am": "ሙሉ fine-tuning"
      },
      "items": {
       "en": [
        "update every weight W (d × d)",
        "memory for all gradients and optimiser states"
       ],
       "am": [
        "እያንዳንዱን weight W (d × d) አዘምን",
        "ለሁሉም gradients እና optimiser states ማስታወሻ"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "LoRA",
       "am": "LoRA"
      },
      "items": {
       "en": [
        "freeze W, learn W + A·B with rank r",
        "A: d × r, B: r × d, r ≈ 8–64"
       ],
       "am": [
        "Wን አቀዝቅዝ፣ W + A·Bን በrank r ተማር",
        "A፡ d × r፣ B፡ r × d፣ r ≈ 8–64"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "d, layers, r = 4096, 32, 16                     # a 7B-class model, LoRA on 4 attention matrices per layer\nfull = layers * 4 * d * d\nlora = layers * 4 * (d * r + r * d)\nprint(f\"trainable weights: full {full / 1e6:,.0f} M vs LoRA {lora / 1e6:.1f} M ({100 * lora / full:.2f}%)\")\nparams = 7e9\nfor name, bytes_ in [(\"fp32\", 4), (\"fp16\", 2), (\"int8\", 1), (\"int4\", 0.5)]:\n    print(f\"{name}: {params * bytes_ / 1e9:5.1f} GB of weights\")",
   "out": "trainable weights: full 2,147 M vs LoRA 16.8 M (0.78%)\nfp32:  28.0 GB of weights\nfp16:  14.0 GB of weights\nint8:   7.0 GB of weights\nint4:   3.5 GB of weights",
   "title": {
    "en": "What LoRA and quantisation save",
    "am": "LoRA እና quantisation የሚያድኑት"
   },
   "note": {
    "en": "Inference is mostly limited by moving weights from memory; fewer bytes per weight means faster tokens and fits on smaller GPUs.",
    "am": "inference በአብዛኛው የተገደበው weightsን ከማስታወሻ በማንቀሳቀስ ነው፤ በአንድ weight ያነሱ bytes ፈጣን tokens ማለት ነው፤ በትናንሽ GPUs ላይም ይገጥማል።"
   }
  },
  "qa": {
   "en": [
    "When the model (weights and activations) is too large for one GPU even with data parallelism, so groups of layers must sit on different devices.",
    "It freezes the original weights and trains only small low-rank matrices (here under 1% of the weights), cutting memory, compute and storage per fine-tuned version.",
    "Fewer bytes must be read from memory for each token, and low-precision arithmetic is faster on modern hardware."
   ],
   "am": [
    "ሞዴሉ (weights እና activations) ከdata parallelism ጋርም ለአንድ GPU በጣም ትልቅ ሲሆን፤ ስለዚህ የንብርብሮች ቡድኖች በተለያዩ መሣሪያዎች መቀመጥ አለባቸው።",
    "የመጀመሪያዎቹን weights ያቀዘቅዛል፣ ትናንሽ low-rank ማትሪክሶችን ብቻ ያሰለጥናል (እዚህ ከweightsኡ ከ1% በታች)፤ ለእያንዳንዱ fine-tuned ስሪት ማስታወሻን፣ computeን እና ማከማቻን ይቀንሳል።",
    "ለእያንዳንዱ token ከማስታወሻ መነበብ ያለባቸው bytes ያነሱ ናቸው፤ ዝቅተኛ ትክክለኛነት ያለው ሒሳብም በዘመናዊ hardware ላይ ፈጣን ነው።"
   ]
  }
 },
 {
  "why": {
   "en": "The same transformer ideas now read images, proteins, genomes, cells and satellite data.",
   "am": "ያው የtransformer ሐሳቦች አሁን ምስሎችን፣ ፕሮቲኖችን፣ ጂኖሞችን፣ ሴሎችንና የሳተላይት ዳታን ያነባሉ።"
  },
  "dg": [
   {
    "type": "tree",
    "title": {
     "en": "One idea, many data types",
     "am": "አንድ ሐሳብ፣ ብዙ የዳታ ዓይነቶች"
    },
    "root": {
     "t": {
      "en": "Self-supervised foundation model",
      "am": "Self-supervised foundation model"
     }
    },
    "kids": [
     {
      "t": {
       "en": "Images + text",
       "am": "ምስሎች + ጽሑፍ"
      },
      "kids": [
       {
        "t": {
         "en": "vision–language models",
         "am": "vision–language models"
        }
       }
      ]
     },
     {
      "t": {
       "en": "Proteins",
       "am": "ፕሮቲኖች"
      },
      "kids": [
       {
        "t": {
         "en": "structure, function",
         "am": "መዋቅር፣ ተግባር"
        }
       }
      ]
     },
     {
      "t": {
       "en": "DNA",
       "am": "DNA"
      },
      "kids": [
       {
        "t": {
         "en": "regulatory grammar, variant effects",
         "am": "የቁጥጥር ሰዋሰው፣ የvariant ውጤቶች"
        }
       }
      ]
     },
     {
      "t": {
       "en": "Satellites",
       "am": "ሳተላይቶች"
      },
      "kids": [
       {
        "t": {
         "en": "land use, crop type, yield",
         "am": "የመሬት አጠቃቀም፣ የሰብል ዓይነት፣ ምርት"
        }
       }
      ]
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Testing a foundation model fairly",
     "am": "foundation modelን በፍትሐዊነት መፈተሽ"
    },
    "cols": [
     {
      "h": {
       "en": "Unfair",
       "am": "ፍትሐዊ ያልሆነ"
      },
      "items": {
       "en": [
        "test regions also in pre-training",
        "only European or US benchmarks"
       ],
       "am": [
        "የፈተና ክልሎች በpre-training ውስጥም አሉ",
        "የአውሮፓ ወይም የአሜሪካ benchmarks ብቻ"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Fair",
       "am": "ፍትሐዊ"
      },
      "items": {
       "en": [
        "held-out African regions, breeds and seasons",
        "compare with a simple local baseline"
       ],
       "am": [
        "የተለዩ የአፍሪካ ክልሎች፣ ዝርያዎችና ወቅቶች",
        "ከቀላል የአካባቢ baseline ጋር አወዳድር"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "from collections import Counter\nseq = \"ATGGCGTACGTTAGCATGGCGTACGATAGCATGGCG\"\nk = 6\nkmers = [seq[i:i + k] for i in range(len(seq) - k + 1)]          # how DNA models tokenise\nprint(f\"{len(kmers)} overlapping {k}-mers; most common:\", Counter(kmers).most_common(3))\nmasked = seq[:15] + \"[MASK]\" + seq[16:]\nprint(\"training task: predict the hidden base ->\", masked)\nprint(\"answer:\", seq[15], \"(the model learns which bases fit each context)\")",
   "out": "31 overlapping 6-mers; most common: [('ATGGCG', 3), ('TGGCGT', 2), ('GGCGTA', 2)]\ntraining task: predict the hidden base -> ATGGCGTACGTTAGC[MASK]TGGCGTACGATAGCATGGCG\nanswer: A (the model learns which bases fit each context)",
   "title": {
    "en": "How a DNA language model sees a genome",
    "am": "DNA language model ጂኖምን እንዴት እንደሚያየው"
   }
  },
  "qa": {
   "en": [
    "Statistical \"grammar\" of DNA: which sequences tend to occur together, such as motifs, regulatory elements and conserved regions, by predicting hidden bases from context.",
    "Their training data under-represent African breeds, crops, soils, landscapes and people, so the patterns differ (distribution shift).",
    "Test on held-out local data never seen in pre-training, compare with simple baselines, and report results per region or group with uncertainty."
   ],
   "am": [
    "የDNA ስታቲስቲካዊ «ሰዋሰው»፡ የትኞቹ ቅደም ተከተሎች አብረው እንደሚመጡ፣ እንደ motifs፣ የቁጥጥር ክፍሎችና የተጠበቁ ክልሎች፣ የተደበቁ basesን ከአውዱ በመተንበይ።",
    "የሥልጠና ዳታቸው የአፍሪካ ዝርያዎችን፣ ሰብሎችን፣ አፈሮችን፣ መልክዓ ምድሮችንና ሰዎችን በበቂ አይወክልም፤ ስለዚህ ንድፎቹ ይለያያሉ (distribution shift)።",
    "በpre-training ፈጽሞ ባልታየ የተለየ የአካባቢ ዳታ ላይ ፈትሽ፣ ከቀላል baselines ጋር አወዳድር፣ ውጤቶችን በክልል ወይም በቡድን ከእርግጠኛ አለመሆን ጋር ሪፖርት አድርግ።"
   ]
  }
 },
 {
  "why": {
   "en": "Agents act, not just answer, so their power must come with permissions, logs and human approval.",
   "am": "agents ይሠራሉ፣ መልስ መስጠት ብቻ አይደለም፤ ስለዚህ ኃይላቸው ከፈቃዶች፣ ከመዝገቦችና ከሰው ማጽደቅ ጋር መምጣት አለበት።"
  },
  "dg": [
   {
    "type": "cycle",
    "title": {
     "en": "The agent loop",
     "am": "የagent ዑደት"
    },
    "nodes": [
     {
      "t": {
       "en": "Plan",
       "am": "አቅድ"
      }
     },
     {
      "t": {
       "en": "Act",
       "am": "ሥራ"
      },
      "s": {
       "en": "call a tool",
       "am": "መሣሪያ ጥራ"
      }
     },
     {
      "t": {
       "en": "Observe",
       "am": "ተመልከት"
      },
      "s": {
       "en": "read the result",
       "am": "ውጤቱን አንብብ"
      }
     },
     {
      "t": {
       "en": "Reflect",
       "am": "አስብ"
      },
      "s": {
       "en": "done? wrong? retry?",
       "am": "ተጠናቀቀ? ተሳሳተ? እንደገና?"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Tool permissions",
     "am": "የመሣሪያ ፈቃዶች"
    },
    "cols": [
     {
      "h": {
       "en": "Allowed automatically",
       "am": "በራስ-ሰር የተፈቀደ"
      },
      "items": {
       "en": [
        "read files, search, run tests",
        "draft a message"
       ],
       "am": [
        "ፋይሎችን ማንበብ፣ መፈለግ፣ ፈተናዎችን ማስኬድ",
        "መልእክት ማርቀቅ"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Needs human approval",
       "am": "የሰው ማጽደቅ ያስፈልገዋል"
      },
      "items": {
       "en": [
        "send money, e-mail outsiders",
        "delete data, change lab instruments",
        "anything irreversible"
       ],
       "am": [
        "ገንዘብ መላክ፣ ለውጭ ሰዎች ኢሜል መላክ",
        "ዳታ መሰረዝ፣ የላብራቶሪ መሣሪያዎችን መቀየር",
        "የማይቀለበስ ማንኛውም ነገር"
       ]
      },
      "tone": "bad"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "LOG = []\nTOOLS = {\"lookup_price\": {\"needs_approval\": False, \"fn\": lambda crop: {\"teff\": 118, \"maize\": 38}[crop]},\n         \"pay_supplier\": {\"needs_approval\": True,  \"fn\": lambda amount: f\"paid {amount} birr\"}}\ndef call(tool, arg, approved_by=None):\n    spec = TOOLS[tool]\n    if spec[\"needs_approval\"] and not approved_by:\n        LOG.append((tool, arg, \"BLOCKED: waiting for human approval\")); return None\n    result = spec[\"fn\"](arg); LOG.append((tool, arg, f\"ok -> {result}\")); return result\nplan = [(\"lookup_price\", \"teff\"), (\"pay_supplier\", 118 * 50)]       # the agent's plan\nfor tool, arg in plan:\n    call(tool, arg)\ncall(\"pay_supplier\", 118 * 50, approved_by=\"cooperative manager\")   # after a person approves\nfor entry in LOG:\n    print(entry)",
   "out": "('lookup_price', 'teff', 'ok -> 118')\n('pay_supplier', 5900, 'BLOCKED: waiting for human approval')\n('pay_supplier', 5900, 'ok -> paid 5900 birr')",
   "title": {
    "en": "A permission gate and an audit log for an agent",
    "am": "ለagent የፈቃድ በርና የምርመራ መዝገብ"
   }
  },
  "qa": {
   "en": [
    "Anything irreversible or high-impact: moving money, deleting data, contacting people outside, changing physical equipment, or sharing private data.",
    "Compare with a baseline on real tasks: task success rate, time saved, errors caught by reviewers, and cost per task.",
    "Errors compound over many steps, costs grow, and the agent can drift from the goal or take unsafe actions unnoticed; use checkpoints, budgets and logs."
   ],
   "am": [
    "የማይቀለበስ ወይም ከፍተኛ ተጽዕኖ ያለው ማንኛውም ነገር፡ ገንዘብ ማንቀሳቀስ፣ ዳታ መሰረዝ፣ ከውጭ ሰዎችን ማግኘት፣ አካላዊ መሣሪያን መቀየር፣ ወይም የግል ዳታ ማጋራት።",
    "በእውነተኛ ተግባራት ላይ ከbaseline ጋር አወዳድር፡ የተግባር ስኬት መጠን፣ የተቆጠበ ጊዜ፣ በገምጋሚዎች የተያዙ ስህተቶች፣ እና በአንድ ተግባር ወጪ።",
    "ስህተቶች በብዙ እርምጃዎች ይደራረባሉ፣ ወጪዎች ያድጋሉ፣ agentኡም ከግቡ ሊርቅ ወይም ሳይታወቅ አደገኛ እርምጃዎችን ሊወስድ ይችላል፤ checkpoints፣ በጀቶችና መዝገቦችን ተጠቀም።"
   ]
  }
 },
 {
  "why": {
   "en": "Models reason better when they can think longer and check their own answers with verifiers.",
   "am": "ሞዴሎች ረዘም ብለው ሲያስቡና የራሳቸውን መልሶች በverifiers ሲፈትሹ በተሻለ ያስባሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Search with a verifier",
     "am": "ከverifier ጋር መፈለግ"
    },
    "nodes": [
     {
      "t": {
       "en": "Sample many answers",
       "am": "ብዙ መልሶችን ናሙና ውሰድ"
      },
      "s": {
       "en": "test-time compute",
       "am": "test-time compute"
      }
     },
     {
      "t": {
       "en": "Verifier checks each",
       "am": "verifier እያንዳንዱን ይፈትሻል"
      },
      "s": {
       "en": "run the code, check the proof",
       "am": "ኮዱን አስኪድ፣ ማረጋገጫውን ፈትሽ"
      }
     },
     {
      "t": {
       "en": "Keep a passing answer",
       "am": "የሚያልፍ መልስ አቆይ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Reward hacking",
     "am": "Reward hacking"
    },
    "cols": [
     {
      "h": {
       "en": "Intended",
       "am": "የታሰበው"
      },
      "items": {
       "en": [
        "make the unit tests pass by fixing the bug"
       ],
       "am": [
        "ስህተቱን በማስተካከል unit testsን አሳልፍ"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Hacked",
       "am": "የተጠለፈው"
      },
      "items": {
       "en": [
        "edit the tests so they always pass",
        "high reward, no real progress"
       ],
       "am": [
        "ሁልጊዜ እንዲያልፉ ፈተናዎቹን አስተካክል",
        "ከፍተኛ ሽልማት፣ ምንም እውነተኛ እድገት የለም"
       ]
      },
      "tone": "bad"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(2)\np_correct = 0.30                     # chance one sampled answer is right\ntrials = 20000\nfor k in [1, 2, 4, 8, 16]:\n    samples = rng.random((trials, k)) < p_correct          # True = a correct answer was sampled\n    solved = samples.any(axis=1)                            # a perfect verifier keeps any correct one\n    print(f\"k = {k:2d} samples: solved {solved.mean():.1%} (theory {1 - (1 - p_correct) ** k:.1%})\")",
   "out": "k =  1 samples: solved 30.2% (theory 30.0%)\nk =  2 samples: solved 50.9% (theory 51.0%)\nk =  4 samples: solved 76.0% (theory 76.0%)\nk =  8 samples: solved 94.5% (theory 94.2%)\nk = 16 samples: solved 99.7% (theory 99.7%)",
   "title": {
    "en": "More samples plus a verifier = more problems solved",
    "am": "ብዙ ናሙናዎች ከverifier ጋር = ብዙ የተፈቱ ችግሮች"
   },
   "note": {
    "en": "This assumes a perfect verifier. With an imperfect one (for example a learned reward model), more samples can find answers that fool it.",
    "am": "ይህ ፍጹም verifier ይገምታል። ፍጹም ባልሆነ (ለምሳሌ የተማረ reward model) ብዙ ናሙናዎች እሱን የሚያታልሉ መልሶችን ሊያገኙ ይችላሉ።"
   }
  },
  "qa": {
   "en": [
    "A procedure that checks whether an answer is correct, such as running tests, a proof checker or exact calculation, independent of the model that wrote it.",
    "The model can explore several reasoning paths or answers and keep the best one, so a harder problem gets more effort.",
    "When a model gets high reward by exploiting flaws in the reward or tests, rather than doing the intended task."
   ],
   "am": [
    "መልሱ ትክክል መሆኑን የሚፈትሽ ሂደት፣ እንደ ፈተናዎችን ማስኬድ፣ የማረጋገጫ ፈታሽ ወይም ትክክለኛ ስሌት፣ ከጻፈው ሞዴል ነጻ የሆነ።",
    "ሞዴሉ በርካታ የአስተሳሰብ መንገዶችን ወይም መልሶችን አስሶ ምርጡን ሊያቆይ ይችላል፤ ስለዚህ ከባድ ችግር ብዙ ጥረት ያገኛል።",
    "ሞዴል የታሰበውን ተግባር ከማድረግ ይልቅ በሽልማቱ ወይም በፈተናዎቹ ጉድለቶች ተጠቅሞ ከፍተኛ ሽልማት ሲያገኝ።"
   ]
  }
 },
 {
  "why": {
   "en": "Interpretability asks why a model decided, which builds trust and finds hidden errors.",
   "am": "interpretability ሞዴሉ ለምን እንደወሰነ ይጠይቃል፤ ይህም እምነትን ይገነባል፣ የተደበቁ ስህተቶችንም ያገኛል።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Probe vs attribution",
     "am": "Probe vs attribution"
    },
    "cols": [
     {
      "h": {
       "en": "Probe",
       "am": "Probe"
      },
      "items": {
       "en": [
        "train a small classifier on hidden states",
        "asks: is this information inside the model?"
       ],
       "am": [
        "በhidden states ላይ ትንሽ classifier አሰልጥን",
        "ይጠይቃል፡ ይህ መረጃ በሞዴሉ ውስጥ አለ?"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Attribution",
       "am": "Attribution"
      },
      "items": {
       "en": [
        "score each input for one prediction",
        "asks: which inputs drove this answer?"
       ],
       "am": [
        "ለአንድ ትንበያ እያንዳንዱን ግብዓት አስመዝግብ",
        "ይጠይቃል፡ ይህን መልስ የነዱት የትኞቹ ግብዓቶች ናቸው?"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "A good explanation for a farmer",
     "am": "ለገበሬ ጥሩ ማብራሪያ"
    },
    "nodes": [
     {
      "t": {
       "en": "Prediction",
       "am": "ትንበያ"
      },
      "s": {
       "en": "high risk of rust",
       "am": "ከፍተኛ የዝገት አደጋ"
      }
     },
     {
      "t": {
       "en": "Top reasons",
       "am": "ዋና ምክንያቶች"
      },
      "s": {
       "en": "3 wet days, susceptible variety",
       "am": "3 እርጥብ ቀናት፣ ተጋላጭ ዝርያ"
      }
     },
     {
      "t": {
       "en": "Action",
       "am": "እርምጃ"
      },
      "s": {
       "en": "scout tomorrow; spray if pustules",
       "am": "ነገ ቃኝ፤ ብጉሮች ካሉ እርጭ"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\nrng = np.random.default_rng(6); n = 600\ngenes = [\"DRB3\", \"TLR4\", \"MHC2\", \"HSP70\", \"IFNG\"]\nX = rng.normal(0, 1, (n, 5))\nrisk = 1.5 * X[:, 1] - 1.0 * X[:, 3] + rng.normal(0, 1, n)        # only TLR4 and HSP70 truly matter\ny = (risk > 0).astype(int)\nm = LogisticRegression().fit(X, y)\nanimal = X[0]\ncontrib = m.coef_[0] * (animal - X.mean(0))                         # attribution for one animal (linear model)\nprint(f\"predicted disease probability: {m.predict_proba([animal])[0, 1]:.2f}\")\nfor g, c in sorted(zip(genes, contrib), key=lambda t: -abs(t[1])):\n    print(f\"  {g:6s} {c:+.2f}\")",
   "out": "predicted disease probability: 0.99\n  TLR4   +4.94\n  MHC2   -0.62\n  HSP70  +0.31\n  IFNG   -0.06\n  DRB3   +0.01",
   "title": {
    "en": "Which genes drove one animal’s disease prediction?",
    "am": "የአንድ እንስሳን የበሽታ ትንበያ የነዱት የትኞቹ ጂኖች ናቸው?"
   },
   "note": {
    "en": "TLR4 dominates, as it should. MHC2 has no real effect in these simulated data yet scores −0.62: a small fitted coefficient times an unusual value for this animal. For deep models use integrated gradients or SHAP, and always treat attributions as hypotheses to test.",
    "am": "TLR4 እንደሚጠበቀው ይበልጣል። MHC2 በዚህ የተመሰለ ዳታ ውስጥ እውነተኛ ውጤት የለውም፤ ግን −0.62 ያገኛል፡ ትንሽ የተገጠመ coefficient በዚህ እንስሳ ያልተለመደ እሴት ሲባዛ። ለጥልቅ ሞዴሎች integrated gradients ወይም SHAP ተጠቀም፤ attributionsንም ሁልጊዜ የሚፈተኑ መላምቶች አድርገህ ውሰዳቸው።"
   }
  },
  "qa": {
   "en": [
    "A probe tests whether some information is encoded in the model’s internal states; an attribution scores how much each input contributed to one specific output.",
    "They can look convincing but be unfaithful to what the model really computed, be unstable to small changes, or reflect correlation in the data rather than causes.",
    "By whether it matches what they see in the field, uses factors they know, and leads to a clear action that works when they try it."
   ],
   "am": [
    "probe አንዳንድ መረጃ በሞዴሉ ውስጣዊ ሁኔታዎች ውስጥ መቀመጡን ይፈትሻል፤ attribution እያንዳንዱ ግብዓት ለአንድ የተወሰነ ውጤት ምን ያህል እንዳበረከተ ያስመዘግባል።",
    "አሳማኝ ሊመስሉ ግን ሞዴሉ በእርግጥ ካሰላው ጋር ታማኝ ላይሆኑ፣ ለትናንሽ ለውጦች ያልተረጋጉ ሊሆኑ፣ ወይም ከመንስኤዎች ይልቅ በዳታው ውስጥ ያለ ተዛምዶን ሊያንጸባርቁ ይችላሉ።",
    "በመስኩ ከሚያዩት ጋር መስማማቱ፣ የሚያውቋቸውን ምክንያቶች መጠቀሙ፣ እና ሲሞክሩት የሚሠራ ግልጽ እርምጃ ማምጣቱ።"
   ]
  }
 },
 {
  "why": {
   "en": "Powerful AI must stay robust, fair across languages and released responsibly.",
   "am": "ኃይለኛ AI ጠንካራ፣ በቋንቋዎች መካከል ፍትሐዊና በኃላፊነት የሚለቀቅ መሆን አለበት።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Responsible release",
     "am": "ኃላፊነት የተሞላበት ልቀት"
    },
    "nodes": [
     {
      "t": {
       "en": "Red-team",
       "am": "Red-team"
      },
      "s": {
       "en": "try to make it fail or cause harm",
       "am": "እንዲወድቅ ወይም ጉዳት እንዲያደርስ ሞክር"
      }
     },
     {
      "t": {
       "en": "Evaluate in many languages",
       "am": "በብዙ ቋንቋዎች ገምግም"
      }
     },
     {
      "t": {
       "en": "Model card",
       "am": "Model card"
      },
      "s": {
       "en": "uses, limits, data, results by group",
       "am": "አጠቃቀሞች፣ ገደቦች፣ ዳታ፣ ውጤቶች በቡድን"
      }
     },
     {
      "t": {
       "en": "Staged access + monitoring",
       "am": "ደረጃ በደረጃ መዳረሻ + ክትትል"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "In or out of distribution?",
     "am": "በስርጭቱ ውስጥ ወይስ ውጭ?"
    },
    "cols": [
     {
      "h": {
       "en": "In distribution",
       "am": "በስርጭቱ ውስጥ"
      },
      "items": {
       "en": [
        "leaf photos like the training set"
       ],
       "am": [
        "እንደ ሥልጠና ስብስቡ ያሉ የቅጠል ፎቶዎች"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Out of distribution",
       "am": "ከስርጭቱ ውጭ"
      },
      "items": {
       "en": [
        "a new crop, night-time photos, a different phone camera",
        "the model should say \"not sure\""
       ],
       "am": [
        "አዲስ ሰብል፣ የሌሊት ፎቶዎች፣ የተለየ የስልክ ካሜራ",
        "ሞዴሉ «እርግጠኛ አይደለሁም» ማለት አለበት"
       ]
      },
      "tone": "bad"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(9)\ntrain = rng.normal([0.6, 0.3, 120], [0.05, 0.04, 15], (500, 3))     # features of training photos: greenness, spots, brightness\nmu = train.mean(0); inv = np.linalg.inv(np.cov(train.T))\ndef ood_score(x):\n    d = x - mu\n    return float(np.sqrt(d @ inv @ d))                               # Mahalanobis distance\nlimit = np.quantile([ood_score(x) for x in train], 0.99)\ntests = {\"normal leaf photo\": [0.61, 0.31, 118], \"night-time photo\": [0.55, 0.30, 35], \"different crop\": [0.35, 0.05, 125]}\nfor name, x in tests.items():\n    s = ood_score(np.array(x))\n    print(f\"{name:18s} score {s:5.1f} -> {'OUT of distribution: say not sure' if s > limit else 'ok to predict'}\")",
   "out": "normal leaf photo  score   0.4 -> ok to predict\nnight-time photo   score   5.9 -> OUT of distribution: say not sure\ndifferent crop     score   8.3 -> OUT of distribution: say not sure",
   "title": {
    "en": "Flag inputs unlike the training data",
    "am": "ከሥልጠና ዳታው የተለዩ ግብዓቶችን ምልክት አድርግ"
   }
  },
  "qa": {
   "en": [
    "Inputs that differ from what the model was trained on (new places, crops, cameras, languages), where its accuracy is unknown and often poor.",
    "Quality and safety often drop in languages with less training data; harms and errors can hide in Amharic, Tigrinya or Afaan Oromo if you test only English.",
    "Intended uses and users, out-of-scope uses, training data, evaluation results broken down by language and group, known limitations and risks, and contact and version information."
   ],
   "am": [
    "ሞዴሉ ከሰለጠነበት የሚለዩ ግብዓቶች (አዳዲስ ቦታዎች፣ ሰብሎች፣ ካሜራዎች፣ ቋንቋዎች)፤ ትክክለኛነቱ የማይታወቅና ብዙውን ጊዜ ደካማ የሆነበት።",
    "ጥራትና ደህንነት ብዙውን ጊዜ ያነሰ የሥልጠና ዳታ ባላቸው ቋንቋዎች ይወርዳሉ፤ እንግሊዝኛን ብቻ ከፈተንክ ጉዳቶችና ስህተቶች በአማርኛ፣ በትግርኛ ወይም በአፋን ኦሮሞ ሊደበቁ ይችላሉ።",
    "የታሰቡ አጠቃቀሞችና ተጠቃሚዎች፣ ከወሰን ውጭ ያሉ አጠቃቀሞች፣ የሥልጠና ዳታ፣ በቋንቋና በቡድን የተከፋፈሉ የግምገማ ውጤቶች፣ የታወቁ ገደቦችና አደጋዎች፣ እንዲሁም የመገኛና የስሪት መረጃ።"
   ]
  }
 },
 {
  "why": {
   "en": "A benchmark decides what the field optimises, so it must measure the right thing, honestly.",
   "am": "benchmark መስኩ ምን እንደሚያሻሽል ይወስናል፤ ስለዚህ ትክክለኛውን ነገር በታማኝነት መለካት አለበት።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Building a benchmark for an African language",
     "am": "ለአፍሪካ ቋንቋ benchmark መገንባት"
    },
    "nodes": [
     {
      "t": {
       "en": "Define the skill",
       "am": "ክህሎቱን ግለጽ"
      },
      "s": {
       "en": "e.g. extension advice in Amharic",
       "am": "ለምሳሌ በአማርኛ የኤክስቴንሽን ምክር"
      }
     },
     {
      "t": {
       "en": "Native-speaker experts write items",
       "am": "የአፍ መፍቻ ተናጋሪ ባለሙያዎች ንጥሎችን ይጽፋሉ"
      }
     },
     {
      "t": {
       "en": "Two annotators + agreement",
       "am": "ሁለት annotators + ስምምነት"
      }
     },
     {
      "t": {
       "en": "Keep a hidden test set",
       "am": "የተደበቀ የፈተና ስብስብ አቆይ"
      },
      "s": {
       "en": "refresh it over time",
       "am": "በጊዜ ሂደት አድሰው"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Reporting a model comparison",
     "am": "የሞዴል ንጽጽርን ሪፖርት ማድረግ"
    },
    "cols": [
     {
      "h": {
       "en": "Weak",
       "am": "ደካማ"
      },
      "items": {
       "en": [
        "\"Model B: 71%, Model A: 68%, B is better\""
       ],
       "am": [
        "«ሞዴል B፡ 71%፣ ሞዴል A፡ 68%፣ B የተሻለ ነው»"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Strong",
       "am": "ጠንካራ"
      },
      "items": {
       "en": [
        "difference +3 points, 95% CI −2 to +8",
        "contamination checked"
       ],
       "am": [
        "ልዩነት +3 ነጥቦች፣ 95% CI −2 እስከ +8",
        "ብክለት ተፈትሿል"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(11); n = 300\na = rng.random(n) < 0.68                   # model A correct on each of 300 questions\nb = np.where(rng.random(n) < 0.8, a, rng.random(n) < 0.71)   # B often agrees with A (paired data)\ndiffs = []\nfor _ in range(5000):                      # paired bootstrap over questions\n    idx = rng.integers(0, n, n)\n    diffs.append(b[idx].mean() - a[idx].mean())\nlo, hi = np.percentile(diffs, [2.5, 97.5])\nprint(f\"A {a.mean():.1%}, B {b.mean():.1%}, difference {b.mean() - a.mean():+.1%}, 95% CI {lo:+.1%} to {hi:+.1%}\")\n\ndef ngrams(text, k=8):\n    w = text.lower().split(); return {\" \".join(w[i:i + k]) for i in range(len(w) - k + 1)}\ntest_item = \"plant teff at the start of the main rains usually in july on a fine firm seedbed\"\ntraining_doc = \"farmers are advised to plant teff at the start of the main rains usually in july\"\nprint(\"8-gram overlap with training data:\", len(ngrams(test_item) & ngrams(training_doc)), \"-> possible contamination\")",
   "out": "A 70.3%, B 73.0%, difference +2.7%, 95% CI -0.7% to +6.0%\n8-gram overlap with training data: 5 -> possible contamination",
   "title": {
    "en": "Confidence interval for a model comparison, and a contamination check",
    "am": "ለሞዴል ንጽጽር confidence interval፣ እና የብክለት ፍተሻ"
   }
  },
  "qa": {
   "en": [
    "Look for long word-sequence (n-gram) overlaps between test items and training data, test with fresh or rephrased items, and watch for suspiciously high scores on old items.",
    "Scores on a few hundred items vary by chance; an interval shows whether a difference between models is real or within noise.",
    "Native speakers with domain expertise, paid fairly and trained with clear guidelines, with agreement between annotators measured."
   ],
   "am": [
    "በፈተና ንጥሎችና በሥልጠና ዳታ መካከል ረጅም የቃላት ቅደም ተከተል (n-gram) መደራረብን ፈልግ፣ በአዲስ ወይም በተቀየረ አገላለጽ ንጥሎች ፈትሽ፣ በአሮጌ ንጥሎች ላይ በጥርጣሬ ከፍተኛ ውጤቶችን ተከታተል።",
    "በጥቂት መቶ ንጥሎች ላይ ያሉ ውጤቶች በአጋጣሚ ይለያያሉ፤ ክልል በሞዴሎች መካከል ያለ ልዩነት እውነተኛ ወይም በጫጫታ ውስጥ መሆኑን ያሳያል።",
    "የዘርፍ ዕውቀት ያላቸው የአፍ መፍቻ ተናጋሪዎች፣ ፍትሐዊ ክፍያ የሚያገኙና በግልጽ መመሪያዎች የሰለጠኑ፣ በannotators መካከል ያለ ስምምነትም የሚለካ።"
   ]
  }
 },
 {
  "why": {
   "en": "Top scientists turn ideas into funded programmes, strong teams and organisations that last.",
   "am": "ምርጥ ሳይንቲስቶች ሐሳቦችን ወደ የገንዘብ ድጋፍ ያላቸው ፕሮግራሞች፣ ጠንካራ ቡድኖችና ዘላቂ ድርጅቶች ይቀይራሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "A fundable proposal",
     "am": "ገንዘብ ሊያገኝ የሚችል ፕሮፖዛል"
    },
    "nodes": [
     {
      "t": {
       "en": "Important problem",
       "am": "አስፈላጊ ችግር"
      },
      "s": {
       "en": "who suffers, how much",
       "am": "ማን እንደሚሰቃይ፣ ምን ያህል"
      }
     },
     {
      "t": {
       "en": "Bold, specific objectives",
       "am": "ደፋርና ግልጽ ዓላማዎች"
      }
     },
     {
      "t": {
       "en": "Feasible plan",
       "am": "ሊሆን የሚችል ዕቅድ"
      },
      "s": {
       "en": "methods, risks, pilot data",
       "am": "ዘዴዎች፣ አደጋዎች፣ የሙከራ ዳታ"
      }
     },
     {
      "t": {
       "en": "Right team + budget",
       "am": "ትክክለኛ ቡድን + በጀት"
      }
     },
     {
      "t": {
       "en": "Impact path",
       "am": "የተጽዕኖ መንገድ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Research project or company?",
     "am": "የምርምር ፕሮጀክት ወይስ ኩባንያ?"
    },
    "cols": [
     {
      "h": {
       "en": "Stay in research",
       "am": "በምርምር ቆይ"
      },
      "items": {
       "en": [
        "open questions remain",
        "no clear paying customer yet"
       ],
       "am": [
        "ክፍት ጥያቄዎች ይቀራሉ",
        "እስካሁን ግልጽ የሚከፍል ደንበኛ የለም"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Start a company",
       "am": "ኩባንያ ጀምር"
      },
      "items": {
       "en": [
        "the method works and is repeatable",
        "customers will pay; a team wants to build it"
       ],
       "am": [
        "ዘዴው ይሠራል፣ ይደገማልም",
        "ደንበኞች ይከፍላሉ፤ ቡድን ሊገነባው ይፈልጋል"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Turn a result into a grant in 6 steps",
    "am": "ውጤትን በ6 እርምጃዎች ወደ ድጋፍ ቀይር"
   },
   "steps": {
    "en": [
     "Write the one-sentence problem and the one-sentence promise.",
     "Read the call text twice and copy its evaluation criteria into your outline.",
     "Show preliminary data: one figure that proves feasibility.",
     "Build the work plan as work packages with deliverables, months and a risk table.",
     "Cost it honestly: people, equipment, travel, open-access fees, overheads.",
     "Get two colleagues to review it as panel members, then revise."
    ],
    "am": [
     "የአንድ ዓረፍተ ነገር ችግሩንና የአንድ ዓረፍተ ነገር ቃሉን ጻፍ።",
     "የጥሪውን ጽሑፍ ሁለት ጊዜ አንብብና የግምገማ መስፈርቶቹን ወደ ረቂቅህ ገልብጥ።",
     "የመጀመሪያ ደረጃ ዳታ አሳይ፡ ተግባራዊነትን የሚያረጋግጥ አንድ figure።",
     "የሥራ ዕቅዱን ከውጤቶች፣ ከወራትና ከአደጋ ሰንጠረዥ ጋር እንደ work packages ገንባ።",
     "በታማኝነት ዋጋ አውጣ፡ ሰዎች፣ መሣሪያዎች፣ ጉዞ፣ የopen-access ክፍያዎች፣ overheads።",
     "ሁለት ባልደረቦች እንደ ኮሚቴ አባላት እንዲገመግሙት አድርግ፣ ከዚያ አሻሽል።"
    ]
   }
  },
  "qa": {
   "en": [
    "An important problem, a clear and ambitious but feasible plan backed by preliminary data, the right team, a realistic budget and a convincing path to impact, all matched to the call’s criteria.",
    "By the growth of the people mentored: skills gained, papers and grants they lead, jobs or companies they reach, and whether they mentor others.",
    "When the result works reliably outside the lab, there is a customer who will pay, and a team ready to build and support a product."
   ],
   "am": [
    "አስፈላጊ ችግር፣ በመጀመሪያ ደረጃ ዳታ የተደገፈ ግልጽና ታላቅ ግን ሊሆን የሚችል ዕቅድ፣ ትክክለኛ ቡድን፣ ተጨባጭ በጀትና አሳማኝ የተጽዕኖ መንገድ፣ ሁሉም ከጥሪው መስፈርቶች ጋር የሚስማሙ።",
    "በተማከሩት ሰዎች ዕድገት፡ የተገኙ ክህሎቶች፣ የሚመሯቸው ጽሑፎችና ድጋፎች፣ የሚደርሱባቸው ሥራዎች ወይም ኩባንያዎች፣ እና ሌሎችን ይመክሩ እንደሆነ።",
    "ውጤቱ ከላብራቶሪ ውጭ በአስተማማኝ ሁኔታ ሲሠራ፣ የሚከፍል ደንበኛ ሲኖር፣ ምርትን ለመገንባትና ለመደገፍ ዝግጁ ቡድን ሲኖር።"
   ]
  }
 }
];
