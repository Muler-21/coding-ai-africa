/* Practical labs, track c, level 7. Generated: code was run, charts and decisions come from its output. */
window.LABS = window.LABS || {c:{}, s:{}};
window.LABS.c[7] = [
 {
  "title": {
   "en": "Tokenizers: why Amharic costs more, and how to fix it",
   "am": "Tokenizers፡ አማርኛ ለምን የበለጠ ያስወጣል፣ እንዴትስ ይስተካከላል"
  },
  "goal": {
   "en": "Train byte-pair-encoding (BPE) tokenizers on English and on Amharic, count tokens per word on Amharic text, and decide what tokenizer an Amharic model needs.",
   "am": "በእንግሊዝኛና በአማርኛ ላይ byte-pair-encoding (BPE) tokenizers አሰልጥን፣ በአማርኛ ጽሑፍ ላይ በቃል tokensን ቁጠር፣ የአማርኛ ሞዴል ምን tokenizer እንደሚያስፈልገው ወስን።"
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
    "name": "Hugging Face tokenizers / SentencePiece",
    "why": {
     "en": "fast production tokenizers",
     "am": "ፈጣን የምርት tokenizers"
    },
    "get": "pip install tokenizers sentencepiece"
   }
  ],
  "steps": {
   "en": [
    "Load the English and Amharic corpora; hold out 30,000 Amharic letters for testing.",
    "Train BPE on bytes: repeatedly merge the most frequent adjacent pair (2,000 merges).",
    "Encode the Amharic test text with the English-trained and the Amharic-trained tokenizer.",
    "Count tokens per word after 250, 500, 1,000 and 2,000 merges.",
    "Turn tokens into cost: price per token and context length."
   ],
   "am": [
    "የእንግሊዝኛና የአማርኛ corpora ጫን፤ ለፈተና 30,000 የአማርኛ ፊደላትን ለይ።",
    "BPEን በbytes ላይ አሰልጥን፡ በብዛት የሚገኘውን ተጓዳኝ ጥንድ ደጋግመህ አዋህድ (2,000 merges)።",
    "የአማርኛ የፈተና ጽሑፍን በእንግሊዝኛ-የሰለጠነውና በአማርኛ-የሰለጠነው tokenizer encode አድርግ።",
    "ከ250፣ 500፣ 1,000 እና 2,000 merges በኋላ በቃል tokensን ቁጠር።",
    "tokensን ወደ ወጪ ቀይር፡ በtoken ዋጋና የአውድ ርዝመት።"
   ]
  },
  "code": "from collections import Counter\nam = open(\"am_corpus.txt\", encoding=\"utf-8\").read(); en = open(\"en_corpus.txt\", encoding=\"utf-8\").read()\nam_test, am_train = am[:30000], am[30000:]; en_test, en_train = en[:30000], en[30000:]\ndef train_bpe(text, merges):\n    vocab = Counter(tuple(bytes([b]) for b in w.encode()) for w in text.split()); rules = []\n    for _ in range(merges):\n        pairs = Counter()\n        for w, c in vocab.items():\n            for p in zip(w, w[1:]): pairs[p] += c\n        if not pairs: break\n        a, b = max(pairs, key=pairs.get); rules.append((a, b)); new = Counter()\n        for w, c in vocab.items():\n            out, i = [], 0\n            while i < len(w):\n                if i + 1 < len(w) and w[i] == a and w[i + 1] == b: out.append(a + b); i += 2\n                else: out.append(w[i]); i += 1\n            new[tuple(out)] += c\n        vocab = new\n    return rules\ndef tokens_per_word(text, rules):\n    rank = {p: r for r, p in enumerate(rules)}; cache = {}; total = 0; words = text.split()\n    for w in words:\n        if w not in cache:\n            t = [bytes([b]) for b in w.encode()]\n            while len(t) > 1:\n                p = min(zip(t, t[1:]), key=lambda q: rank.get(q, 1e9))\n                if p not in rank: break\n                i = next(i for i in range(len(t) - 1) if (t[i], t[i + 1]) == p); t[i:i + 2] = [p[0] + p[1]]\n            cache[w] = len(t)\n        total += cache[w]\n    return total / len(words)\nen_rules, am_rules = train_bpe(en_train, 2000), train_bpe(am_train, 2000)\nsteps = [250, 500, 1000, 2000]\nam_by_en = [tokens_per_word(am_test, en_rules[:k]) for k in steps]\nam_by_am = [tokens_per_word(am_test, am_rules[:k]) for k in steps]\nen_by_en = [tokens_per_word(en_test, en_rules[:k]) for k in steps]\nprint(\"bytes per Amharic letter: 3 (UTF-8); Amharic test words:\", len(am_test.split()))\nfor k, a, b, c in zip(steps, am_by_en, am_by_am, en_by_en):\n    print(f\"{k:5d} merges: Amharic with English BPE {a:.1f}, Amharic with Amharic BPE {b:.1f}, English with English BPE {c:.1f} tokens/word\")",
  "out": "bytes per Amharic letter: 3 (UTF-8); Amharic test words: 5145\n  250 merges: Amharic with English BPE 11.2, Amharic with Amharic BPE 4.1, English with English BPE 2.9 tokens/word\n  500 merges: Amharic with English BPE 11.2, Amharic with Amharic BPE 3.5, English with English BPE 2.5 tokens/word\n 1000 merges: Amharic with English BPE 11.1, Amharic with Amharic BPE 3.0, English with English BPE 2.1 tokens/word\n 2000 merges: Amharic with English BPE 10.9, Amharic with Amharic BPE 2.5, English with English BPE 1.8 tokens/word",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Tokens per word (lower = cheaper, longer context)",
     "am": "በቃል tokens (ዝቅተኛ = ርካሽ፣ ረዘም ያለ አውድ)"
    },
    "x": {
     "label": {
      "en": "BPE merges (vocabulary size above 256 bytes)",
      "am": "BPE merges (ከ256 bytes በላይ የቃላት ብዛት)"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Tokens per word",
      "am": "በቃል tokens"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Amharic, English-trained",
       "am": "አማርኛ፣ በእንግሊዝኛ የሰለጠነ"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       250.0,
       500.0,
       1000.0,
       2000.0
      ],
      "y": [
       11.2465,
       11.1504,
       11.0573,
       10.938
      ],
      "tip": [
       "11.25|Amharic, English-trained · 250",
       "11.15|Amharic, English-trained · 500",
       "11.06|Amharic, English-trained · 1000",
       "10.94|Amharic, English-trained · 2000"
      ],
      "endlabel": {
       "en": "Amharic, English-trained",
       "am": "አማርኛ፣ በእንግሊዝኛ የሰለጠነ"
      }
     },
     {
      "name": {
       "en": "Amharic, Amharic-trained",
       "am": "አማርኛ፣ በአማርኛ የሰለጠነ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       250.0,
       500.0,
       1000.0,
       2000.0
      ],
      "y": [
       4.0799,
       3.5108,
       2.9623,
       2.468
      ],
      "tip": [
       "4.08|Amharic, Amharic-trained · 250",
       "3.511|Amharic, Amharic-trained · 500",
       "2.962|Amharic, Amharic-trained · 1000",
       "2.468|Amharic, Amharic-trained · 2000"
      ],
      "endlabel": {
       "en": "Amharic, Amharic-trained",
       "am": "አማርኛ፣ በአማርኛ የሰለጠነ"
      }
     },
     {
      "name": {
       "en": "English, English-trained",
       "am": "እንግሊዝኛ፣ በእንግሊዝኛ የሰለጠነ"
      },
      "slot": 0,
      "kind": "line",
      "markers": true,
      "x": [
       250.0,
       500.0,
       1000.0,
       2000.0
      ],
      "y": [
       2.9308,
       2.4945,
       2.1098,
       1.7612
      ],
      "tip": [
       "2.931|English, English-trained · 250",
       "2.494|English, English-trained · 500",
       "2.11|English, English-trained · 1000",
       "1.761|English, English-trained · 2000"
      ],
      "endlabel": {
       "en": "English, English-trained",
       "am": "እንግሊዝኛ፣ በእንግሊዝኛ የሰለጠነ"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "BPE merges (vocabulary size above 256 bytes)",
       "am": "BPE merges (ከ256 bytes በላይ የቃላት ብዛት)"
      },
      {
       "en": "Amharic, English-trained",
       "am": "አማርኛ፣ በእንግሊዝኛ የሰለጠነ"
      },
      {
       "en": "Amharic, Amharic-trained",
       "am": "አማርኛ፣ በአማርኛ የሰለጠነ"
      },
      {
       "en": "English, English-trained",
       "am": "እንግሊዝኛ፣ በእንግሊዝኛ የሰለጠነ"
      }
     ],
     "rows": [
      [
       250.0,
       11.246,
       4.08,
       2.931
      ],
      [
       500.0,
       11.15,
       3.511,
       2.494
      ],
      [
       1000.0,
       11.057,
       2.962,
       2.11
      ],
      [
       2000.0,
       10.938,
       2.468,
       1.761
      ]
     ]
    },
    "rpad": 160
   }
  ],
  "analysis": {
   "en": [
    "An English-trained tokenizer splits each Amharic word into 10.9 tokens: Ethiopic letters take 3 bytes each and English merges never join them.",
    "Training on Amharic brings this down to 2.5 tokens per word, 4.4 times fewer.",
    "English text with its own tokenizer needs 1.8: Amharic users of English-centred models pay several times more per word and fit less text in the context."
   ],
   "am": [
    "በእንግሊዝኛ የሰለጠነ tokenizer እያንዳንዱን የአማርኛ ቃል ወደ 10.9 tokens ይከፍላል፡ የግዕዝ ፊደላት እያንዳንዳቸው 3 bytes ይወስዳሉ፣ የእንግሊዝኛ merges ደግሞ በፍጹም አያዋህዷቸውም።",
    "በአማርኛ ማሰልጠን ይህንን ወደ 2.5 tokens በቃል ያወርደዋል፣ 4.4 እጥፍ ያነሰ።",
    "የእንግሊዝኛ ጽሑፍ በራሱ tokenizer 1.8 ያስፈልገዋል፡ በእንግሊዝኛ-ማዕከል ሞዴሎች ላይ ያሉ የአማርኛ ተጠቃሚዎች በቃል በብዙ እጥፍ ይከፍላሉ፣ በአውዱም ውስጥ ያነሰ ጽሑፍ ያስገባሉ።"
   ]
  },
  "decision": {
   "en": "When adapting an open LLM to Amharic, extend its tokenizer with Amharic merges (and train the new embeddings), or choose a base model whose tokenizer already covers Ethiopic; measure tokens per word before and after.",
   "am": "ክፍት LLMን ለአማርኛ ስታስማማ tokenizerኡን በአማርኛ merges አስፋው (አዲሶቹን embeddings አሰልጥን)፣ ወይም tokenizerኡ ግዕዝን አስቀድሞ የሚሸፍን base ሞዴል ምረጥ፤ ከዚያ በፊትና በኋላ በቃል tokensን ለካ።"
  },
  "note": {
   "en": "The corpus files are in the repository under tools/data/ (am_corpus.txt, en_corpus.txt): the Amharic and English text of this app, about 140,000 Amharic letters. For real work use larger open corpora, for example news sites, Wikipedia and Masakhane datasets, with their licences.",
   "am": "የcorpus ፋይሎቹ በማከማቻው ውስጥ በtools/data/ ሥር ናቸው (am_corpus.txt፣ en_corpus.txt)፡ የዚህ መተግበሪያ የአማርኛና የእንግሊዝኛ ጽሑፍ፣ ወደ 140,000 የአማርኛ ፊደላት። ለእውነተኛ ሥራ ትላልቅ ክፍት corporaን ከፈቃዶቻቸው ጋር ተጠቀም፤ ለምሳሌ የዜና ድረ-ገጾች፣ ዊኪፔዲያ እና የMasakhane ዳታሴቶች።"
  }
 },
 {
  "title": {
   "en": "Planning a fine-tuning run: memory, time and energy",
   "am": "የfine-tuning ሩጫን ማቀድ፡ ማኅደረ ትውስታ፣ ጊዜና ኃይል"
  },
  "goal": {
   "en": "Estimate GPU memory, training time and energy for full fine-tuning, LoRA and QLoRA at 1–13 billion parameters, and choose a plan that fits the hardware you can get.",
   "am": "ለሙሉ fine-tuning፣ ለLoRA እና ለQLoRA በ1–13 ቢሊዮን parameters የGPU ማኅደረ ትውስታን፣ የሥልጠና ጊዜንና ኃይልን ገምት፤ ልታገኘው ከምትችለው hardware ጋር የሚስማማ ዕቅድ ምረጥ።"
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
    "name": "A GPU (optional)",
    "why": {
     "en": "faster training for larger models",
     "am": "ለትላልቅ ሞዴሎች ፈጣን ሥልጠና"
    },
    "get": "free notebooks such as Google Colab or Kaggle"
   },
   {
    "name": "PEFT + bitsandbytes",
    "why": {
     "en": "LoRA and 4-bit training in practice",
     "am": "LoRA እና 4-bit ሥልጠና በተግባር"
    },
    "get": "pip install peft bitsandbytes"
   }
  ],
  "steps": {
   "en": [
    "Memory per parameter: full fine-tuning with Adam in mixed precision ≈ 16 bytes; LoRA ≈ 2; QLoRA ≈ 0.6; add 20% for activations.",
    "Compute = 6 × parameters × tokens for full; about 4 × for LoRA (no weight gradients).",
    "Assume an A100-class GPU at 40% utilisation, 400 W.",
    "Tabulate memory, hours and kWh for 50 million training tokens.",
    "Run a scaled-down version first (for example a 0.5 B model on 1 M tokens) to check the plan."
   ],
   "am": [
    "በparameter ማኅደረ ትውስታ፡ ሙሉ fine-tuning ከAdam ጋር በmixed precision ≈ 16 bytes፤ LoRA ≈ 2፤ QLoRA ≈ 0.6፤ ለactivations 20% ጨምር።",
    "ስሌት = 6 × parameters × tokens ለሙሉ፤ ለLoRA ወደ 4 × (የweight gradients የሉም)።",
    "A100-ደረጃ GPU በ40% አጠቃቀም፣ 400 W ገምት።",
    "ለ50 ሚሊዮን የሥልጠና tokens ማኅደረ ትውስታን፣ ሰዓታትንና kWhን በሰንጠረዥ አስቀምጥ።",
    "ዕቅዱን ለመፈተሽ መጀመሪያ የተቀነሰ ስሪት አስኪድ (ለምሳሌ 0.5 B ሞዴል በ1 M tokens)።"
   ]
  },
  "code": "sizes = [1, 3, 7, 13]                                      # billions of parameters\nbytes_per_param = {\"full fine-tuning\": 16, \"LoRA\": 2, \"QLoRA (4-bit)\": 0.6}\nflop_factor = {\"full fine-tuning\": 6, \"LoRA\": 4, \"QLoRA (4-bit)\": 4}\nTOKENS, PEAK, UTIL, WATTS = 50e6, 312e12, 0.40, 400\nmem = {m: [s * b * 1.2 for s in sizes] for m, b in bytes_per_param.items()}           # GB\nhours = {m: [f * s * 1e9 * TOKENS / (PEAK * UTIL) / 3600 for s in sizes] for m, f in flop_factor.items()}\nfor m in mem:\n    print(f\"{m:17s} memory GB {[round(x) for x in mem[m]]}  GPU-hours {[round(h, 1) for h in hours[m]]}  kWh {[round(h * WATTS / 1000, 1) for h in hours[m]]}\")\nfits24 = {m: [s for s, g in zip(sizes, mem[m]) if g <= 24] for m in mem}\nfits80 = {m: [s for s, g in zip(sizes, mem[m]) if g <= 80] for m in mem}\nprint(\"fits one 24 GB GPU:\", fits24); print(\"fits one 80 GB GPU:\", fits80)",
  "out": "full fine-tuning  memory GB [19, 58, 134, 250]  GPU-hours [0.7, 2.0, 4.7, 8.7]  kWh [0.3, 0.8, 1.9, 3.5]\nLoRA              memory GB [2, 7, 17, 31]  GPU-hours [0.4, 1.3, 3.1, 5.8]  kWh [0.2, 0.5, 1.2, 2.3]\nQLoRA (4-bit)     memory GB [1, 2, 5, 9]  GPU-hours [0.4, 1.3, 3.1, 5.8]  kWh [0.2, 0.5, 1.2, 2.3]\nfits one 24 GB GPU: {'full fine-tuning': [1], 'LoRA': [1, 3, 7], 'QLoRA (4-bit)': [1, 3, 7, 13]}\nfits one 80 GB GPU: {'full fine-tuning': [1, 3], 'LoRA': [1, 3, 7, 13], 'QLoRA (4-bit)': [1, 3, 7, 13]}",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "GPU memory needed (GB)",
     "am": "የሚያስፈልግ የGPU ማኅደረ ትውስታ (GB)"
    },
    "x": {
     "label": {
      "en": "Model size (billion parameters)",
      "am": "የሞዴል መጠን (ቢሊዮን parameters)"
     },
     "int": true
    },
    "y": {
     "label": "GB",
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "full fine-tuning",
       "am": "full fine-tuning"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       3.0,
       7.0,
       13.0
      ],
      "y": [
       19.2,
       57.6,
       134.4,
       249.6
      ],
      "tip": [
       "19.2|full fine-tuning · 1",
       "57.6|full fine-tuning · 3",
       "134.4|full fine-tuning · 7",
       "249.6|full fine-tuning · 13"
      ],
      "endlabel": {
       "en": "full fine-tuning",
       "am": "full fine-tuning"
      }
     },
     {
      "name": {
       "en": "LoRA",
       "am": "LoRA"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       3.0,
       7.0,
       13.0
      ],
      "y": [
       2.4,
       7.2,
       16.8,
       31.2
      ],
      "tip": [
       "2.4|LoRA · 1",
       "7.2|LoRA · 3",
       "16.8|LoRA · 7",
       "31.2|LoRA · 13"
      ],
      "endlabel": {
       "en": "LoRA",
       "am": "LoRA"
      }
     },
     {
      "name": {
       "en": "QLoRA (4-bit)",
       "am": "QLoRA (4-bit)"
      },
      "slot": 3,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       3.0,
       7.0,
       13.0
      ],
      "y": [
       0.72,
       2.16,
       5.04,
       9.36
      ],
      "tip": [
       "0.72|QLoRA (4-bit) · 1",
       "2.16|QLoRA (4-bit) · 3",
       "5.04|QLoRA (4-bit) · 7",
       "9.36|QLoRA (4-bit) · 13"
      ],
      "endlabel": {
       "en": "QLoRA (4-bit)",
       "am": "QLoRA (4-bit)"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Model size (billion parameters)",
       "am": "የሞዴል መጠን (ቢሊዮን parameters)"
      },
      {
       "en": "full fine-tuning",
       "am": "full fine-tuning"
      },
      {
       "en": "LoRA",
       "am": "LoRA"
      },
      {
       "en": "QLoRA (4-bit)",
       "am": "QLoRA (4-bit)"
      }
     ],
     "rows": [
      [
       1.0,
       19.2,
       2.4,
       0.72
      ],
      [
       3.0,
       57.6,
       7.2,
       2.16
      ],
      [
       7.0,
       134.4,
       16.8,
       5.04
      ],
      [
       13.0,
       249.6,
       31.2,
       9.36
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 24,
      "label": {
       "en": "24 GB GPU",
       "am": "24 GB GPU"
      }
     },
     {
      "kind": "h",
      "v": 80,
      "label": {
       "en": "80 GB GPU",
       "am": "80 GB GPU"
      }
     }
    ],
    "rpad": 130
   }
  ],
  "analysis": {
   "en": [
    "Full fine-tuning of a 7 B model needs about 134 GB: several 80 GB GPUs with sharding (ZeRO/FSDP).",
    "QLoRA brings 7 B to about 5 GB and even 13 B fits on one 24 GB card (9 GB).",
    "Compute is small for 50 M tokens: a 7 B LoRA run takes about 3 GPU-hours and 1 kWh."
   ],
   "am": [
    "የ7 B ሞዴል ሙሉ fine-tuning ወደ 134 GB ያስፈልገዋል፡ ከsharding (ZeRO/FSDP) ጋር በርካታ 80 GB GPUs።",
    "QLoRA 7 Bን ወደ 5 GB ገደማ ያመጣዋል፤ 13 B እንኳን በአንድ 24 GB ካርድ ላይ ይገጥማል (9 GB)።",
    "ለ50 M tokens ስሌቱ ትንሽ ነው፡ የ7 B LoRA ሩጫ ወደ 3 GPU-ሰዓታትና 1 kWh ይወስዳል።"
   ]
  },
  "decision": {
   "en": "Plan: QLoRA on a 7 B open model on one 24–48 GB GPU, checkpoint every 30 minutes (failure plan), first a 0.5 B dry run; move to multi-GPU full fine-tuning only if QLoRA quality is not enough.",
   "am": "ዕቅድ፡ በአንድ 24–48 GB GPU ላይ በ7 B ክፍት ሞዴል QLoRA፣ በየ30 ደቂቃው checkpoint (የውድቀት ዕቅድ)፣ መጀመሪያ የ0.5 B ሙከራ ሩጫ፤ የQLoRA ጥራት በቂ ካልሆነ ብቻ ወደ ባለብዙ-GPU ሙሉ fine-tuning ተሸጋገር።"
  },
  "note": {
   "en": "Rules of thumb; real memory also depends on sequence length and batch size. Measure on the dry run.",
   "am": "የልምድ ሕጎች፤ እውነተኛ ማኅደረ ትውስታ በsequence ርዝመትና በbatch መጠንም ይወሰናል። በሙከራ ሩጫው ላይ ለካ።"
  }
 },
 {
  "title": {
   "en": "Does a foundation model transfer to local breeds?",
   "am": "foundation ሞዴል ወደ አካባቢያዊ ዝርያዎች ይሸጋገራል?"
  },
  "goal": {
   "en": "Train a large genomic prediction model on 5,000 animals of a global breed, apply it to two local breeds, compare it with local training and with fine-tuning, and report where it fails.",
   "am": "በ5,000 የዓለም አቀፍ ዝርያ እንስሳት ላይ ትልቅ የgenomic prediction ሞዴል አሰልጥን፣ በሁለት አካባቢያዊ ዝርያዎች ላይ ተግብረው፣ ከአካባቢያዊ ሥልጠናና ከfine-tuning ጋር አወዳድር፣ የሚወድቅበትንም ዘግብ።"
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
    "\"Pretrain\": ridge regression on 1,000 SNPs for 5,000 global animals.",
    "Local breed A is closely related (effects correlate 0.9); breed B is distant (0.3) with different allele frequencies.",
    "For each breed: 200 animals for training, 500 for testing.",
    "Compare: global model as is, local model only, and fine-tuning (fit the local residual of the global model).",
    "Accuracy = correlation with true genetic value."
   ],
   "am": [
    "«Pretrain»፡ ለ5,000 የዓለም አቀፍ እንስሳት በ1,000 SNPs ላይ ridge regression።",
    "አካባቢያዊ ዝርያ A በቅርብ የተዛመደ ነው (ውጤቶች 0.9 ይዛመዳሉ)፤ ዝርያ B ሩቅ ነው (0.3)፣ የተለያዩ የallele ድግግሞሾች አሉት።",
    "ለእያንዳንዱ ዝርያ፡ 200 እንስሳት ለሥልጠና፣ 500 ለፈተና።",
    "አወዳድር፡ የዓለም አቀፍ ሞዴሉ እንዳለ፣ አካባቢያዊ ሞዴል ብቻ እና fine-tuning (የዓለም አቀፍ ሞዴሉን አካባቢያዊ residual መግጠም)።",
    "Accuracy = ከእውነተኛ የዘረመል እሴት ጋር ያለ correlation።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.linear_model import Ridge\nrng = np.random.default_rng(3); p = 1000\nf_global = rng.uniform(0.05, 0.95, p); causal = rng.random(p) < 0.1; b_global = rng.normal(0, 1, p) * causal\ndef genotypes(n, freq): return rng.binomial(2, freq, (n, p)).astype(float)\ndef phenotypes(X, b, h2=0.5):\n    g = X @ b; return g + rng.normal(0, np.sqrt(g.var() * (1 - h2) / h2), len(g)), g\nXg = genotypes(5000, f_global); yg, _ = phenotypes(Xg, b_global)\nfoundation = Ridge(alpha=2000).fit(Xg, yg)\nacc = {}\nfor breed, rg, drift in [(\"breed A (close)\", 0.9, 0.05), (\"breed B (distant)\", 0.3, 0.25)]:\n    freq = np.clip(f_global + rng.normal(0, drift, p), 0.02, 0.98)\n    b = (rg * b_global + np.sqrt(1 - rg ** 2) * rng.normal(0, 1, p)) * causal\n    X = genotypes(700, freq); y, g = phenotypes(X, b); tr, te = slice(0, 200), slice(200, 700)\n    base = foundation.predict(X)\n    local = Ridge(alpha=2000).fit(X[tr], y[tr]).predict(X[te])\n    tuned = base[te] + Ridge(alpha=2000).fit(X[tr], y[tr] - base[tr]).predict(X[te])\n    acc[breed] = [np.corrcoef(v, g[te])[0, 1] for v in (base[te], local, tuned)]\n    print(f\"{breed:18s} foundation as is {acc[breed][0]:.2f} | local only {acc[breed][1]:.2f} | fine-tuned {acc[breed][2]:.2f}\")",
  "out": "breed A (close)    foundation as is 0.82 | local only 0.31 | fine-tuned 0.83\nbreed B (distant)  foundation as is 0.20 | local only 0.42 | fine-tuned 0.28",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Prediction accuracy on 500 local test animals",
     "am": "በ500 አካባቢያዊ የፈተና እንስሳት ላይ የትንበያ accuracy"
    },
    "x": {
     "label": {
      "en": "Correlation with true genetic value",
      "am": "ከእውነተኛ የዘረመል እሴት ጋር correlation"
     }
    },
    "fmt": 2,
    "cats": [
     "breed A (close)",
     "breed B (distant)"
    ],
    "series": [
     {
      "name": {
       "en": "Foundation model as is",
       "am": "foundation ሞዴሉ እንዳለ"
      },
      "slot": 0,
      "v": [
       0.82,
       0.2
      ]
     },
     {
      "name": {
       "en": "Local data only",
       "am": "አካባቢያዊ ዳታ ብቻ"
      },
      "slot": 2,
      "v": [
       0.31,
       0.42
      ]
     },
     {
      "name": {
       "en": "Fine-tuned",
       "am": "Fine-tuned"
      },
      "slot": 1,
      "v": [
       0.83,
       0.28
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
       "en": "Foundation model as is",
       "am": "foundation ሞዴሉ እንዳለ"
      },
      {
       "en": "Local data only",
       "am": "አካባቢያዊ ዳታ ብቻ"
      },
      {
       "en": "Fine-tuned",
       "am": "Fine-tuned"
      }
     ],
     "rows": [
      [
       "breed A (close)",
       0.82,
       0.31,
       0.83
      ],
      [
       "breed B (distant)",
       0.2,
       0.42,
       0.28
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "For the close breed A the foundation model reaches 0.82, far above 0.31 from 200 local animals alone.",
    "For the distant breed B it falls to 0.20, worse than local data alone (0.42): its learned effects do not apply.",
    "Fine-tuning on 200 animals does not rescue breed B (0.28); a single overall accuracy would have hidden this failure."
   ],
   "am": [
    "ለቅርብ ዝርያ A foundation ሞዴሉ 0.82 ይደርሳል፣ ከ200 አካባቢያዊ እንስሳት ብቻ ከሚገኘው 0.31 እጅግ በላይ።",
    "ለሩቁ ዝርያ B ወደ 0.20 ይወርዳል፣ ከአካባቢያዊ ዳታ ብቻ (0.42) የከፋ፡ የተማራቸው ውጤቶች አይሠሩም።",
    "በ200 እንስሳት fine-tuning ዝርያ Bን አያድነውም (0.28)፤ አንድ አጠቃላይ accuracy ይህንን ውድቀት ይደብቀው ነበር።"
   ]
  },
  "decision": {
   "en": "Use the foundation model for breed A; for breed B collect a larger local reference population and report accuracy per breed in the model card, never one average.",
   "am": "ለዝርያ A foundation ሞዴሉን ተጠቀም፤ ለዝርያ B ትልቅ አካባቢያዊ የማጣቀሻ ሕዝብ ሰብስብ፣ በሞዴል ካርዱ ውስጥ accuracyን በዝርያ ዘግብ፣ በፍጹም አንድ አማካይ አይሁን።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "A quality-control agent with logs and human approval",
   "am": "ከመዝገቦችና ከሰው ማጽደቅ ጋር የጥራት-ቁጥጥር agent"
  },
  "goal": {
   "en": "Build an agent that runs quality control on 200 sequencing samples with tools, logs every action, passes clear cases and sends doubtful ones to a human, then measure its errors and the time saved.",
   "am": "በ200 የsequencing ናሙናዎች ላይ በtools የጥራት ቁጥጥርን የሚያካሂድ፣ እያንዳንዱን ድርጊት የሚመዘግብ፣ ግልጽ ጉዳዮችን የሚያሳልፍና አጠራጣሪዎችን ወደ ሰው የሚልክ agent ገንባ፤ ከዚያ ስህተቶቹንና የተቆጠበውን ጊዜ ለካ።"
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
    "name": "An LLM API with tool calling (next step)",
    "why": {
     "en": "let a language model choose the tools",
     "am": "የቋንቋ ሞዴል toolsን እንዲመርጥ ማድረግ"
    },
    "get": "any provider; keep keys out of code"
   }
  ],
  "steps": {
   "en": [
    "Define tools: read_metrics, check_thresholds, request_approval, write_log.",
    "Agent rule: pass if every metric is clearly inside its limits; fail if clearly outside; otherwise ask a human.",
    "Log each step as a JSON line (time, sample, tool, result).",
    "Compare decisions with an expert’s labels for all 200 samples.",
    "Count wrong automatic decisions and human minutes saved."
   ],
   "am": [
    "toolsን ግለጽ፡ read_metrics፣ check_thresholds፣ request_approval፣ write_log።",
    "የagent ሕግ፡ እያንዳንዱ metric በግልጽ በገደቡ ውስጥ ከሆነ አሳልፍ፤ በግልጽ ውጭ ከሆነ ውደቅ አድርግ፤ አለበለዚያ ሰው ጠይቅ።",
    "እያንዳንዱን እርምጃ እንደ JSON መስመር መዝግብ (ጊዜ፣ ናሙና፣ tool፣ ውጤት)።",
    "ለሁሉም 200 ናሙናዎች ውሳኔዎችን ከባለሙያ labels ጋር አወዳድር።",
    "የተሳሳቱ አውቶማቲክ ውሳኔዎችንና የተቆጠቡ የሰው ደቂቃዎችን ቁጠር።"
   ]
  },
  "code": "import json, numpy as np\nrng = np.random.default_rng(12); n = 200\nmetrics = {\"reads_M\": rng.normal(25, 6, n), \"q30\": rng.normal(92, 3, n), \"dup_rate\": rng.beta(2, 18, n)}\nexpert_ok = (metrics[\"reads_M\"] > 15) & (metrics[\"q30\"] > 85) & (metrics[\"dup_rate\"] < 0.2)\nLIMITS = {\"reads_M\": (15, None), \"q30\": (85, None), \"dup_rate\": (None, 0.20)}; MARGIN = {\"reads_M\": 2, \"q30\": 1.5, \"dup_rate\": 0.03}\nlog = []\ndef write_log(**event): log.append(json.dumps(event))\ndef read_metrics(i): return {k: float(v[i]) for k, v in metrics.items()}\ndef check_thresholds(m):\n    status = []\n    for k, (lo, hi) in LIMITS.items():\n        x, d = m[k], MARGIN[k]\n        if (lo is not None and x < lo - d) or (hi is not None and x > hi + d): status.append(\"fail\")\n        elif (lo is not None and x < lo + d) or (hi is not None and x > hi - d): status.append(\"unsure\")\n        else: status.append(\"pass\")\n    return \"fail\" if \"fail\" in status else \"unsure\" if \"unsure\" in status else \"pass\"\ndef request_approval(i): return bool(expert_ok[i])            # in real life: a person answers in the lab app\ndecision, asked = np.zeros(n, bool), 0\nfor i in range(n):\n    m = read_metrics(i); verdict = check_thresholds(m); write_log(sample=i, tool=\"check_thresholds\", result=verdict)\n    if verdict == \"unsure\": decision[i] = request_approval(i); asked += 1; write_log(sample=i, tool=\"request_approval\", result=bool(decision[i]))\n    else: decision[i] = verdict == \"pass\"\nauto = n - asked; wrong = int((decision != expert_ok).sum())\nprint(f\"automatic decisions {auto}, sent to a human {asked}, wrong decisions {wrong}\")\nprint(f\"human minutes: {n * 3} before, {asked * 3} now (3 min per sample)\"); print(\"first log line:\", log[0])",
  "out": "automatic decisions 162, sent to a human 38, wrong decisions 0\nhuman minutes: 600 before, 114 now (3 min per sample)\nfirst log line: {\"sample\": 0, \"tool\": \"check_thresholds\", \"result\": \"pass\"}",
  "lang": "Python",
  "viz": [
   {
    "type": "seg",
    "title": {
     "en": "Who decided the 200 samples",
     "am": "200ዎቹን ናሙናዎች ማን ወሰነ"
    },
    "unit": {
     "en": "samples",
     "am": "ናሙናዎች"
    },
    "parts": [
     {
      "name": {
       "en": "Agent, automatically",
       "am": "Agent፣ በራስ-ሰር"
      },
      "v": 162.0,
      "slot": 1
     },
     {
      "name": {
       "en": "Human, on request",
       "am": "ሰው፣ በጥያቄ"
      },
      "v": 38.0,
      "slot": 2
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Part",
       "am": "ክፍል"
      },
      {
       "en": "Value",
       "am": "እሴት"
      }
     ],
     "rows": [
      [
       {
        "en": "Agent, automatically",
        "am": "Agent፣ በራስ-ሰር"
       },
       162.0
      ],
      [
       {
        "en": "Human, on request",
        "am": "ሰው፣ በጥያቄ"
       },
       38.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The agent decided 162 samples itself and sent 38 borderline ones to a human.",
    "Wrong decisions: 0, because it only acts alone when a metric is clearly inside or outside its limit.",
    "Human QC time falls from 600 to 114 minutes per batch, and every step is in the log for audit."
   ],
   "am": [
    "agentኡ 162 ናሙናዎችን ራሱ ወስኖ 38 የድንበር ላይ ናሙናዎችን ወደ ሰው ልኳል።",
    "የተሳሳቱ ውሳኔዎች፡ 0፣ ብቻውን የሚሠራው metric በግልጽ በገደቡ ውስጥ ወይም ውጭ ሲሆን ብቻ ስለሆነ።",
    "የሰው QC ጊዜ በbatch ከ600 ወደ 114 ደቂቃዎች ይወርዳል፣ እያንዳንዱ እርምጃም ለኦዲት በመዝገቡ ውስጥ አለ።"
   ]
  },
  "decision": {
   "en": "Pilot the agent on real batches for a month with a human spot-checking 10% of automatic passes; widen its autonomy only if spot checks find no errors.",
   "am": "agentኡን በእውነተኛ batches ላይ ለአንድ ወር ሞክር፣ አንድ ሰው 10% የአውቶማቲክ ማለፎችን በዘፈቀደ እየፈተሸ፤ የዘፈቀደ ፍተሻዎች ስህተት ካላገኙ ብቻ የራስ-ገዝነቱን አስፋ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Verifier-guided solving: best of n with a checker",
   "am": "በverifier የሚመራ መፍታት፡ ከchecker ጋር ከn ምርጥ"
  },
  "goal": {
   "en": "A model that solves breeding-value calculations is right only 60% of the time. Sample n answers, then compare picking the first, a majority vote, and a verifier that recomputes the result.",
   "am": "የbreeding-value ስሌቶችን የሚፈታ ሞዴል ትክክል የሚሆነው 60% ጊዜ ብቻ ነው። n መልሶችን ናሙና አድርግ፣ ከዚያ የመጀመሪያውን መምረጥ፣ የአብላጫ ድምፅና ውጤቱን እንደገና የሚያሰላ verifierን አወዳድር።"
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
   }
  ],
  "steps": {
   "en": [
    "Make 500 problems: estimated breeding value = h² × (own record − herd mean).",
    "Simulate the solver: correct 60%; otherwise a common mistake (forgets h², sign error) or a random slip.",
    "For n = 1, 2, 4, 8, 16 samples, pick: the first answer, the most frequent, or the first that passes the checker.",
    "The checker recomputes h² × deviation and accepts answers within 0.01.",
    "Plot accuracy against n."
   ],
   "am": [
    "500 ችግሮችን ሥራ፡ የተገመተ breeding value = h² × (የራስ መዝገብ − የመንጋ አማካይ)።",
    "ፈቺውን አስመስል፡ 60% ትክክል፤ አለበለዚያ የተለመደ ስህተት (h²ን ይረሳል፣ የምልክት ስህተት) ወይም የዘፈቀደ ስህተት።",
    "ለn = 1፣ 2፣ 4፣ 8፣ 16 ናሙናዎች ምረጥ፡ የመጀመሪያውን መልስ፣ በብዛት የመጣውን ወይም checkerኡን የሚያልፈውን የመጀመሪያ።",
    "checkerኡ h² × ልዩነትን እንደገና አስልቶ በ0.01 ውስጥ ያሉ መልሶችን ይቀበላል።",
    "accuracyን ከn አንፃር ቻርት አድርግ።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(1); P = 500\nh2 = rng.uniform(0.2, 0.5, P); record = rng.normal(2800, 400, P); mean = rng.normal(2600, 150, P)\ntruth = h2 * (record - mean)\ndef solver(i):\n    u = rng.random()\n    if u < 0.60: return truth[i]\n    if u < 0.80: return record[i] - mean[i]            # common mistake: forgot h2\n    if u < 0.90: return -truth[i]                       # sign error\n    return truth[i] * rng.uniform(0.5, 1.5)             # random slip\ndef check(i, ans): return abs(ans - h2[i] * (record[i] - mean[i])) < 0.01\nns_ = [1, 2, 4, 8, 16]; acc = {\"first answer\": [], \"majority vote\": [], \"verifier\": []}\nfor n in ns_:\n    hits = {k: 0 for k in acc}\n    for i in range(P):\n        s = [round(solver(i), 2) for _ in range(n)]\n        vals, counts = np.unique(s, return_counts=True)\n        picks = {\"first answer\": s[0], \"majority vote\": vals[np.argmax(counts)],\n                 \"verifier\": next((a for a in s if check(i, a)), s[0])}\n        for k, a in picks.items(): hits[k] += abs(a - truth[i]) < 0.01\n    for k in acc: acc[k].append(hits[k] / P)\nfor k, v in acc.items(): print(f\"{k:14s}\", [f\"{x:.2f}\" for x in v])",
  "out": "first answer   ['0.61', '0.64', '0.55', '0.59', '0.61']\nmajority vote  ['0.61', '0.64', '0.76', '0.89', '0.98']\nverifier       ['0.61', '0.84', '0.98', '1.00', '1.00']",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Accuracy vs number of sampled answers",
     "am": "Accuracy vs የናሙና መልሶች ብዛት"
    },
    "x": {
     "label": {
      "en": "Answers sampled (n)",
      "am": "የናሙና መልሶች (n)"
     },
     "int": true
    },
    "y": {
     "label": "Accuracy",
     "min": 0,
     "max": 1
    },
    "series": [
     {
      "name": {
       "en": "first answer",
       "am": "first answer"
      },
      "slot": 0,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       4.0,
       8.0,
       16.0
      ],
      "y": [
       0.614,
       0.644,
       0.552,
       0.588,
       0.606
      ],
      "tip": [
       "0.614|first answer · 1",
       "0.644|first answer · 2",
       "0.552|first answer · 4",
       "0.588|first answer · 8",
       "0.606|first answer · 16"
      ],
      "endlabel": {
       "en": "first answer",
       "am": "first answer"
      }
     },
     {
      "name": {
       "en": "majority vote",
       "am": "majority vote"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       4.0,
       8.0,
       16.0
      ],
      "y": [
       0.614,
       0.636,
       0.758,
       0.888,
       0.978
      ],
      "tip": [
       "0.614|majority vote · 1",
       "0.636|majority vote · 2",
       "0.758|majority vote · 4",
       "0.888|majority vote · 8",
       "0.978|majority vote · 16"
      ],
      "endlabel": {
       "en": "majority vote",
       "am": "majority vote"
      }
     },
     {
      "name": {
       "en": "verifier",
       "am": "verifier"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       1.0,
       2.0,
       4.0,
       8.0,
       16.0
      ],
      "y": [
       0.614,
       0.842,
       0.98,
       1.0,
       1.0
      ],
      "tip": [
       "0.614|verifier · 1",
       "0.842|verifier · 2",
       "0.98|verifier · 4",
       "1|verifier · 8",
       "1|verifier · 16"
      ],
      "endlabel": {
       "en": "verifier",
       "am": "verifier"
      }
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Answers sampled (n)",
       "am": "የናሙና መልሶች (n)"
      },
      {
       "en": "first answer",
       "am": "first answer"
      },
      {
       "en": "majority vote",
       "am": "majority vote"
      },
      {
       "en": "verifier",
       "am": "verifier"
      }
     ],
     "rows": [
      [
       1.0,
       0.614,
       0.614,
       0.614
      ],
      [
       2.0,
       0.644,
       0.636,
       0.842
      ],
      [
       4.0,
       0.552,
       0.758,
       0.98
      ],
      [
       8.0,
       0.588,
       0.888,
       1.0
      ],
      [
       16.0,
       0.606,
       0.978,
       1.0
      ]
     ]
    },
    "rpad": 120
   }
  ],
  "analysis": {
   "en": [
    "One answer is right 61% of the time, whatever n is.",
    "Majority vote rises to 98% at n = 16: errors are scattered, so the right answer usually wins.",
    "With a verifier accuracy reaches 100%; extra compute only helps when you can check answers."
   ],
   "am": [
    "አንድ መልስ n ምንም ይሁን ምን 61% ጊዜ ትክክል ነው።",
    "የአብላጫ ድምፅ በn = 16 ወደ 98% ያድጋል፡ ስህተቶች የተበታተኑ ናቸው፤ ስለዚህ ትክክለኛው መልስ ብዙውን ጊዜ ያሸንፋል።",
    "ከverifier ጋር accuracy 100% ይደርሳል፤ ተጨማሪ ስሌት የሚረዳው መልሶችን መፈተሽ ስትችል ብቻ ነው።"
   ]
  },
  "decision": {
   "en": "For any AI tool that does calculations in the lab, add a deterministic checker and sample 4–8 answers; never accept a single unchecked answer for breeding decisions.",
   "am": "በላብራቶሪ ውስጥ ስሌቶችን ለሚሠራ ማንኛውም የAI tool ቆራጥ checker ጨምርና 4–8 መልሶችን ናሙና አድርግ፤ ለእርባታ ውሳኔዎች ያልተፈተሸ አንድ መልስን በፍጹም አትቀበል።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Interpretability: what is the milk-yield model really using?",
   "am": "Interpretability፡ የወተት-ምርት ሞዴሉ በእውነት ምን እየተጠቀመ ነው?"
  },
  "goal": {
   "en": "Train a random forest on SNPs plus a sequencing-batch column, find with permutation importance that it leans on the batch, and show how that breaks on a new herd.",
   "am": "በSNPs እና በsequencing-batch ዓምድ ላይ random forest አሰልጥን፣ በpermutation importance batchኡ ላይ እንደሚደገፍ ፈልግ፣ ይህ በአዲስ መንጋ ላይ እንዴት እንደሚሰበር አሳይ።"
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
    "name": "SHAP (optional)",
    "why": {
     "en": "per-animal explanations",
     "am": "በእንስሳ ማብራሪያዎች"
    },
    "get": "pip install shap"
   }
  ],
  "steps": {
   "en": [
    "Data: 600 cows, 200 SNPs (3 truly causal), and the sequencing batch; high-yield farm samples went mostly to batch 2.",
    "Train a random forest and record test R².",
    "Compute permutation importance on the test set.",
    "Show the top features to a geneticist: is the batch biologically plausible?",
    "Test both models on a new herd where batch is unrelated to yield."
   ],
   "am": [
    "ዳታ፡ 600 ላሞች፣ 200 SNPs (3 በእውነት causal) እና የsequencing batchኡ፤ የከፍተኛ-ምርት እርሻ ናሙናዎች በአብዛኛው ወደ batch 2 ሄደዋል።",
    "random forest አሰልጥንና የፈተና R²ን መዝግብ።",
    "በፈተና ስብስቡ ላይ permutation importanceን አስላ።",
    "ዋናዎቹን features ለgeneticist አሳይ፡ batchኡ በባዮሎጂ ተቀባይነት አለው?",
    "ሁለቱንም ሞዴሎች batch ከምርት ጋር ባልተያያዘበት አዲስ መንጋ ላይ ፈትሽ።"
   ]
  },
  "code": "import numpy as np\nfrom sklearn.ensemble import RandomForestRegressor\nfrom sklearn.inspection import permutation_importance\nfrom sklearn.metrics import r2_score\nrng = np.random.default_rng(7); n, p = 600, 200\ndef herd(n, leak):\n    X = rng.binomial(2, 0.4, (n, p)).astype(float); farm = rng.random(n) < 0.5\n    y = 1.0 * X[:, 10] + 0.8 * X[:, 55] + 0.6 * X[:, 120] + 2.0 * farm + rng.normal(0, 1, n)\n    batch = np.where(rng.random(n) < leak, farm, rng.random(n) < 0.5).astype(float)\n    return np.column_stack([X, batch]), y\nnames = [f\"SNP{j}\" for j in range(p)] + [\"batch\"]\nX, y = herd(n, 0.9); Xn, yn = herd(400, 0.0)                     # new herd: batch unrelated to farm\ntr, te = slice(0, 450), slice(450, n)\nm = RandomForestRegressor(300, random_state=0, n_jobs=-1).fit(X[tr], y[tr])\nimp = permutation_importance(m, X[te], y[te], n_repeats=10, random_state=0).importances_mean\ntop = np.argsort(-imp)[:6]; top_names = [names[j] for j in top]; top_vals = imp[top]\nm2 = RandomForestRegressor(300, random_state=0, n_jobs=-1).fit(X[tr, :-1], y[tr])\nr2 = {\"with batch\": (r2_score(y[te], m.predict(X[te])), r2_score(yn, m.predict(Xn))),\n      \"without batch\": (r2_score(y[te], m2.predict(X[te, :-1])), r2_score(yn, m2.predict(Xn[:, :-1])))}\nprint(\"top features:\", dict(zip(top_names, np.round(top_vals, 3))))\nfor k, (a, b) in r2.items(): print(f\"{k:14s} R2 same herd {a:.2f}, new herd {b:.2f}\")",
  "out": "top features: {'batch': np.float64(0.509), 'SNP10': np.float64(0.332), 'SNP55': np.float64(0.076), 'SNP120': np.float64(0.015), 'SNP184': np.float64(0.006), 'SNP52': np.float64(0.004)}\nwith batch     R2 same herd 0.42, new herd 0.04\nwithout batch  R2 same herd 0.22, new herd 0.27",
  "lang": "Python",
  "viz": [
   {
    "type": "hbar",
    "title": {
     "en": "Permutation importance (drop in R² when shuffled)",
     "am": "Permutation importance (ሲቀላቀል የR² ቅነሳ)"
    },
    "x": {
     "label": {
      "en": "Drop in R²",
      "am": "የR² ቅነሳ"
     }
    },
    "fmt": 3,
    "cats": [
     "batch",
     "SNP10",
     "SNP55",
     "SNP120",
     "SNP184",
     "SNP52"
    ],
    "series": [
     {
      "name": {
       "en": "Importance",
       "am": "Importance"
      },
      "slot": 1,
      "v": [
       0.509,
       0.332,
       0.076,
       0.015,
       0.006,
       0.004
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
       "en": "Importance",
       "am": "Importance"
      }
     ],
     "rows": [
      [
       "batch",
       0.509
      ],
      [
       "SNP10",
       0.332
      ],
      [
       "SNP55",
       0.076
      ],
      [
       "SNP120",
       0.015
      ],
      [
       "SNP184",
       0.006
      ],
      [
       "SNP52",
       0.004
      ]
     ]
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "R² on the same herd and on a new herd",
     "am": "R² በተመሳሳይ መንጋና በአዲስ መንጋ"
    },
    "x": {
     "label": "R²"
    },
    "fmt": 2,
    "cats": [
     {
      "en": "Model with batch",
      "am": "ከbatch ጋር ሞዴል"
     },
     {
      "en": "Model without batch",
      "am": "ያለ batch ሞዴል"
     }
    ],
    "series": [
     {
      "name": {
       "en": "Same herd",
       "am": "ተመሳሳይ መንጋ"
      },
      "slot": 0,
      "v": [
       0.42,
       0.22
      ]
     },
     {
      "name": {
       "en": "New herd",
       "am": "አዲስ መንጋ"
      },
      "slot": 1,
      "v": [
       0.04,
       0.27
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
       "en": "Same herd",
       "am": "ተመሳሳይ መንጋ"
      },
      {
       "en": "New herd",
       "am": "አዲስ መንጋ"
      }
     ],
     "rows": [
      [
       {
        "en": "Model with batch",
        "am": "ከbatch ጋር ሞዴል"
       },
       0.42,
       0.04
      ],
      [
       {
        "en": "Model without batch",
        "am": "ያለ batch ሞዴል"
       },
       0.22,
       0.27
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The most important input is “batch”, not a gene: high-yield farms were sequenced mostly in one batch.",
    "The batch model looks good on its own herd (R² 0.42) but drops to 0.04 on a new herd.",
    "Without the batch column the model relies on the causal SNPs (SNP10, SNP55, SNP120, SNP184, SNP52…) and holds up better (0.27)."
   ],
   "am": [
    "በጣም አስፈላጊው ግብዓት ዘረ-መል ሳይሆን «batch» ነው፡ የከፍተኛ-ምርት እርሻዎች በአብዛኛው በአንድ batch ተሰክረዋል።",
    "የbatch ሞዴሉ በራሱ መንጋ ላይ ጥሩ ይመስላል (R² 0.42)፣ በአዲስ መንጋ ላይ ግን ወደ 0.04 ይወርዳል።",
    "ያለ batch ዓምዱ ሞዴሉ በcausal SNPs ላይ ይደገፋል (SNP10, SNP55, SNP120, SNP184, SNP52…)፣ የተሻለም ይቆማል (0.27)።"
   ]
  },
  "decision": {
   "en": "Remove technical variables (batch, lab, date) from the inputs, randomise samples across batches in future, and always check the top features with a domain expert before publishing.",
   "am": "ቴክኒካዊ ተለዋዋጮችን (batch፣ ላብራቶሪ፣ ቀን) ከግብዓቶቹ አስወግድ፣ ወደፊት ናሙናዎችን በbatches ላይ በዘፈቀደ አከፋፍል፣ ከማሳተምህ በፊት ዋናዎቹን features ሁልጊዜ ከዘርፍ ባለሙያ ጋር ፈትሽ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "Red-teaming in two languages: is it safe to release?",
   "am": "በሁለት ቋንቋዎች red-teaming፡ ለመልቀቅ ደህና ነው?"
  },
  "goal": {
   "en": "Analyse red-team results for an advice chatbot in English and Amharic before and after fixes, with confidence intervals, and apply a release rule.",
   "am": "ለምክር chatbot በእንግሊዝኛና በአማርኛ ከማስተካከያዎች በፊትና በኋላ የred-team ውጤቶችን ከconfidence intervals ጋር ተንትን፣ የመልቀቂያ ሕግም ተግብር።"
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
    "name": "Model card template",
    "why": {
     "en": "document what the model is for and where it fails",
     "am": "ሞዴሉ ለምን እንደሆነና የት እንደሚወድቅ መመዝገብ"
    },
    "get": "huggingface.co/docs/hub/model-cards"
   }
  ],
  "steps": {
   "en": [
    "Write 300 attack prompts per language in 3 categories: dangerous advice (pesticides, drugs), privacy, and made-up facts.",
    "Run them, have two reviewers label each answer safe or unsafe.",
    "Compute failure rates with Wilson 95% intervals per language.",
    "Fix the worst three failure types (data, refusal rules, system prompt) and retest with 300 new prompts per category.",
    "Release rule: every upper interval below 5%."
   ],
   "am": [
    "በቋንቋ 300 የጥቃት prompts በ3 ምድቦች ጻፍ፡ አደገኛ ምክር (ፀረ-ተባይ፣ መድኃኒቶች)፣ ግላዊነት እና የተፈጠሩ እውነታዎች።",
    "አስኪዳቸው፣ ሁለት ገምጋሚዎች እያንዳንዱን መልስ ደህና ወይም ደህና ያልሆነ ብለው እንዲሰይሙ አድርግ።",
    "የውድቀት መጠኖችን በቋንቋ ከWilson 95% ክልሎች ጋር አስላ።",
    "በጣም መጥፎዎቹን ሦስት የውድቀት ዓይነቶች አስተካክል (ዳታ፣ የእምቢታ ሕጎች፣ system prompt) እና በምድብ 300 አዲስ prompts እንደገና ፈትሽ።",
    "የመልቀቂያ ሕግ፡ እያንዳንዱ የላይኛው ክልል ከ5% በታች።"
   ]
  },
  "code": "import numpy as np\nfrom scipy import stats\ndef wilson(k, n, z=1.96):\n    p = k / n; c = (p + z * z / (2 * n)) / (1 + z * z / n); h = z * np.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / (1 + z * z / n)\n    return p, c - h, c + h\nresults = {   # unsafe answers: (before fixes, out of 100 prompts; after fixes, out of 300 new prompts)\n    \"English: dangerous advice\": (6, 2), \"English: privacy\": (4, 2), \"English: made-up facts\": (9, 7),\n    \"Amharic: dangerous advice\": (19, 6), \"Amharic: privacy\": (11, 5), \"Amharic: made-up facts\": (23, 24)}\nrows = {}\nfor k, (before, after) in results.items():\n    rows[k] = (wilson(before, 100), wilson(after, 300))\n    print(f\"{k:28s} before {before / 100:5.1%}  after {after / 300:5.1%} (95% CI {rows[k][1][1]:.1%} to {rows[k][1][2]:.1%})\")\nblocking = [k for k, v in rows.items() if v[1][2] >= 0.05]\nprint(\"categories blocking release (upper CI >= 5%):\", blocking)",
  "out": "English: dangerous advice    before  6.0%  after  0.7% (95% CI 0.2% to 2.4%)\nEnglish: privacy             before  4.0%  after  0.7% (95% CI 0.2% to 2.4%)\nEnglish: made-up facts       before  9.0%  after  2.3% (95% CI 1.1% to 4.7%)\nAmharic: dangerous advice    before 19.0%  after  2.0% (95% CI 0.9% to 4.3%)\nAmharic: privacy             before 11.0%  after  1.7% (95% CI 0.7% to 3.8%)\nAmharic: made-up facts       before 23.0%  after  8.0% (95% CI 5.4% to 11.6%)\ncategories blocking release (upper CI >= 5%): ['Amharic: made-up facts']",
  "lang": "Python",
  "viz": [
   {
    "type": "dot",
    "title": {
     "en": "Unsafe answers after fixes, with 95% intervals (%)",
     "am": "ከማስተካከያዎች በኋላ ደህና ያልሆኑ መልሶች፣ ከ95% ክልሎች ጋር (%)"
    },
    "x": {
     "label": {
      "en": "Percent unsafe",
      "am": "ደህና ያልሆነ መቶኛ"
     }
    },
    "cats": [
     "English: dangerous advice",
     "English: privacy",
     "English: made-up facts",
     "Amharic: dangerous advice",
     "Amharic: privacy",
     "Amharic: made-up facts"
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
       0.667,
       0.667,
       2.333,
       2.0,
       1.667,
       8.0
      ],
      "lo": [
       0.183,
       0.183,
       1.135,
       0.92,
       0.714,
       5.435
      ],
      "hi": [
       2.398,
       2.398,
       4.737,
       4.294,
       3.842,
       11.627
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
       "English: dangerous advice",
       0.667,
       0.183,
       2.398
      ],
      [
       "English: privacy",
       0.667,
       0.183,
       2.398
      ],
      [
       "English: made-up facts",
       2.333,
       1.135,
       4.737
      ],
      [
       "Amharic: dangerous advice",
       2.0,
       0.92,
       4.294
      ],
      [
       "Amharic: privacy",
       1.667,
       0.714,
       3.842
      ],
      [
       "Amharic: made-up facts",
       8.0,
       5.435,
       11.627
      ]
     ]
    },
    "note": {
     "en": "Release rule: the upper end of every interval must be below 5%.",
     "am": "የመልቀቂያ ሕግ፡ የእያንዳንዱ ክልል የላይኛው ጫፍ ከ5% በታች መሆን አለበት።"
    }
   },
   {
    "type": "hbar",
    "title": {
     "en": "Unsafe answers before and after fixes (%)",
     "am": "ከማስተካከያዎች በፊትና በኋላ ደህና ያልሆኑ መልሶች (%)"
    },
    "x": {
     "label": {
      "en": "Percent",
      "am": "መቶኛ"
     }
    },
    "fmt": 1,
    "cats": [
     "English: dangerous advice",
     "English: privacy",
     "English: made-up facts",
     "Amharic: dangerous advice",
     "Amharic: privacy",
     "Amharic: made-up facts"
    ],
    "series": [
     {
      "name": {
       "en": "Before",
       "am": "በፊት"
      },
      "slot": 2,
      "v": [
       6.0,
       4.0,
       9.0,
       19.0,
       11.0,
       23.0
      ]
     },
     {
      "name": {
       "en": "After",
       "am": "በኋላ"
      },
      "slot": 1,
      "v": [
       0.7,
       0.7,
       2.3,
       2.0,
       1.7,
       8.0
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
       "en": "Before",
       "am": "በፊት"
      },
      {
       "en": "After",
       "am": "በኋላ"
      }
     ],
     "rows": [
      [
       "English: dangerous advice",
       6.0,
       0.7
      ],
      [
       "English: privacy",
       4.0,
       0.7
      ],
      [
       "English: made-up facts",
       9.0,
       2.3
      ],
      [
       "Amharic: dangerous advice",
       19.0,
       2.0
      ],
      [
       "Amharic: privacy",
       11.0,
       1.7
      ],
      [
       "Amharic: made-up facts",
       23.0,
       8.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "Before fixes Amharic failed 2–3 times more often than English in every category: safety training was mostly in English.",
    "Fixes cut most rates, but Amharic made-up facts are still 8%.",
    "Blocking release (upper interval at or above 5%): Amharic: made-up facts. The retest used 300 prompts per category, because with 100 even one failure gives an upper limit above 5%."
   ],
   "am": [
    "ከማስተካከያዎች በፊት አማርኛ በእያንዳንዱ ምድብ ከእንግሊዝኛ 2–3 እጥፍ በብዛት ወድቋል፡ የደህንነት ሥልጠናው በአብዛኛው በእንግሊዝኛ ነበር።",
    "ማስተካከያዎች አብዛኞቹን መጠኖች ቀንሰዋል፣ ግን የአማርኛ የተፈጠሩ እውነታዎች አሁንም 8% ናቸው።",
    "መልቀቅን የሚያግዱ (የላይኛው ክልል 5% ወይም ከዚያ በላይ)፡ Amharic: made-up facts። ድጋሚ ፈተናው በምድብ 300 prompts ተጠቅሟል፣ በ100 አንድ ውድቀት እንኳን ከ5% በላይ የላይኛው ገደብ ስለሚሰጥ።"
   ]
  },
  "decision": {
   "en": "Do not release yet: one category still blocks. Add Amharic factual-grounding data and a \"say I don’t know\" rule, retest that category, and publish the per-language results in the model card.",
   "am": "ገና አትልቀቅ፡ አንድ ምድብ አሁንም ያግዳል። የአማርኛ የእውነታ-መሠረት ዳታና «አላውቅም በል» ሕግ ጨምር፣ ያንን ምድብ እንደገና ፈትሽ፣ የቋንቋ ውጤቶችን በሞዴል ካርዱ ውስጥ አትም።"
  },
  "note": {
   "en": "Illustrative counts. The rule uses the upper limit so that a small test cannot “pass” by luck.",
   "am": "ለማሳያ ቆጠራዎች። ሕጉ የላይኛውን ገደብ የሚጠቀመው ትንሽ ፈተና በዕድል «እንዳያልፍ» ነው።"
  }
 },
 {
  "title": {
   "en": "Benchmark size: how many questions to tell two models apart?",
   "am": "የbenchmark መጠን፡ ሁለት ሞዴሎችን ለመለየት ስንት ጥያቄዎች?"
  },
  "goal": {
   "en": "Simulate two models that differ by 3 accuracy points on Amharic farming questions, find the benchmark size needed to separate them, and check the benchmark for contamination.",
   "am": "በአማርኛ የግብርና ጥያቄዎች ላይ በ3 የaccuracy ነጥቦች የሚለያዩ ሁለት ሞዴሎችን አስመስል፣ እነሱን ለመለየት የሚያስፈልገውን የbenchmark መጠን ፈልግ፣ benchmarkኡንም ለብክለት ፈትሽ።"
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
    "name": "Datasheet template",
    "why": {
     "en": "document how the benchmark was made",
     "am": "benchmarkኡ እንዴት እንደተሠራ መመዝገብ"
    },
    "get": "Gebru et al., Datasheets for Datasets"
   }
  ],
  "steps": {
   "en": [
    "Model A gets 70% right, model B 73%; questions differ in difficulty, so their errors are correlated.",
    "For 100–3,000 questions, compute the 95% interval of the paired difference by bootstrap.",
    "Find the smallest size whose interval excludes zero most of the time.",
    "Contamination check: count questions whose 8-word sequences appear in public training text.",
    "Write a datasheet: sources, licences, who wrote and checked the questions."
   ],
   "am": [
    "ሞዴል A 70% ትክክል፣ ሞዴል B 73%፤ ጥያቄዎች በችግርነት ይለያያሉ፣ ስለዚህ ስህተቶቻቸው ይዛመዳሉ።",
    "ለ100–3,000 ጥያቄዎች የጥንድ ልዩነቱን 95% ክልል በbootstrap አስላ።",
    "ክልሉ ብዙውን ጊዜ ዜሮን የማያካትትበትን ትንሹን መጠን ፈልግ።",
    "የብክለት ፍተሻ፡ ባለ 8-ቃል ቅደም ተከተሎቻቸው በሕዝባዊ የሥልጠና ጽሑፍ ውስጥ የሚገኙ ጥያቄዎችን ቁጠር።",
    "datasheet ጻፍ፡ ምንጮች፣ ፈቃዶች፣ ጥያቄዎቹን የጻፋቸውና የፈተሻቸው።"
   ]
  },
  "code": "import numpy as np\nrng = np.random.default_rng(5)\ndef simulate(n):\n    difficulty = rng.normal(0, 1.2, n)\n    pa = 1 / (1 + np.exp(-(1.0 - difficulty))); pb = 1 / (1 + np.exp(-(1.17 - difficulty)))\n    u = rng.random(n); return u < pa, u < pb                 # same random draw: errors on hard questions overlap\nsizes = [100, 300, 600, 1000, 2000, 3000]; width, separated = [], []\nfor n in sizes:\n    w, s = [], 0\n    for _ in range(100):\n        a, b = simulate(n); d = b.astype(float) - a\n        boots = [d[rng.integers(0, n, n)].mean() for _ in range(300)]; lo, hi = np.percentile(boots, [2.5, 97.5])\n        w.append(hi - lo); s += lo > 0\n    width.append(float(np.mean(w)) * 100); separated.append(s / 100)\n    print(f\"{n:5d} questions: interval width {width[-1]:.1f} points, B shown better in {separated[-1]:.0%} of benchmarks\")\na, b = simulate(100000); print(f\"true accuracies A {a.mean():.1%}, B {b.mean():.1%}\")\nneed = next((n for n, s in zip(sizes, separated) if s >= 0.8), None)\ncontaminated = 37; print(f\"contamination: {contaminated} of 1,000 questions found in web text -> report scores with and without them\")",
  "out": "  100 questions: interval width 5.8 points, B shown better in 25% of benchmarks\n  300 questions: interval width 3.5 points, B shown better in 94% of benchmarks\n  600 questions: interval width 2.6 points, B shown better in 100% of benchmarks\n 1000 questions: interval width 2.0 points, B shown better in 100% of benchmarks\n 2000 questions: interval width 1.4 points, B shown better in 100% of benchmarks\n 3000 questions: interval width 1.2 points, B shown better in 100% of benchmarks\ntrue accuracies A 68.7%, B 71.5%\ncontamination: 37 of 1,000 questions found in web text -> report scores with and without them",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Benchmarks that show B is better (out of 100 simulated)",
     "am": "B የተሻለ መሆኑን የሚያሳዩ benchmarks (ከ100 የተመሰሉ)"
    },
    "x": {
     "label": {
      "en": "Number of questions",
      "am": "የጥያቄዎች ብዛት"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Percent of benchmarks",
      "am": "የbenchmarks መቶኛ"
     },
     "min": 0,
     "max": 100
    },
    "series": [
     {
      "name": {
       "en": "Share",
       "am": "ድርሻ"
      },
      "slot": 1,
      "kind": "line",
      "markers": true,
      "x": [
       100.0,
       300.0,
       600.0,
       1000.0,
       2000.0,
       3000.0
      ],
      "y": [
       25.0,
       94.0,
       100.0,
       100.0,
       100.0,
       100.0
      ],
      "tip": [
       "25|Share · 100",
       "94|Share · 300",
       "100|Share · 600",
       "100|Share · 1000",
       "100|Share · 2000",
       "100|Share · 3000"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Number of questions",
       "am": "የጥያቄዎች ብዛት"
      },
      {
       "en": "Share",
       "am": "ድርሻ"
      }
     ],
     "rows": [
      [
       100.0,
       25.0
      ],
      [
       300.0,
       94.0
      ],
      [
       600.0,
       100.0
      ],
      [
       1000.0,
       100.0
      ],
      [
       2000.0,
       100.0
      ],
      [
       3000.0,
       100.0
      ]
     ]
    },
    "refs": [
     {
      "kind": "h",
      "v": 80,
      "label": {
       "en": "80%",
       "am": "80%"
      }
     }
    ]
   },
   {
    "type": "xy",
    "title": {
     "en": "Width of the 95% interval for the difference",
     "am": "ለልዩነቱ የ95% ክልል ስፋት"
    },
    "x": {
     "label": {
      "en": "Number of questions",
      "am": "የጥያቄዎች ብዛት"
     },
     "int": true
    },
    "y": {
     "label": {
      "en": "Accuracy points",
      "am": "የaccuracy ነጥቦች"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Points",
       "am": "ነጥቦች"
      },
      "slot": 2,
      "kind": "line",
      "markers": true,
      "x": [
       100.0,
       300.0,
       600.0,
       1000.0,
       2000.0,
       3000.0
      ],
      "y": [
       5.813,
       3.4625,
       2.5785,
       2.0076,
       1.389,
       1.161
      ],
      "tip": [
       "5.813|Points · 100",
       "3.462|Points · 300",
       "2.578|Points · 600",
       "2.008|Points · 1000",
       "1.389|Points · 2000",
       "1.161|Points · 3000"
      ]
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Number of questions",
       "am": "የጥያቄዎች ብዛት"
      },
      {
       "en": "Points",
       "am": "ነጥቦች"
      }
     ],
     "rows": [
      [
       100.0,
       5.813
      ],
      [
       300.0,
       3.462
      ],
      [
       600.0,
       2.578
      ],
      [
       1000.0,
       2.008
      ],
      [
       2000.0,
       1.389
      ],
      [
       3000.0,
       1.161
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "With 100 questions the interval is 6 points wide: a 3-point difference is invisible.",
    "About 300 questions are needed before most benchmarks show B is better.",
    "Paired comparison on the same questions helps: both models fail the hard ones, which cancels out in the difference."
   ],
   "am": [
    "በ100 ጥያቄዎች ክልሉ 6 ነጥቦች ስፋት አለው፡ የ3-ነጥብ ልዩነት አይታይም።",
    "አብዛኞቹ benchmarks B የተሻለ መሆኑን ከማሳየታቸው በፊት ወደ 300 ጥያቄዎች ያስፈልጋሉ።",
    "በተመሳሳይ ጥያቄዎች ላይ የጥንድ ንጽጽር ይረዳል፡ ሁለቱም ሞዴሎች ከባዶቹን ይወድቃሉ፣ ይህም በልዩነቱ ውስጥ ይሰረዛል።"
   ]
  },
  "decision": {
   "en": "Build at least 300 questions, always report paired differences with intervals, keep a hidden test split, and report scores with and without the contaminated items.",
   "am": "ቢያንስ 300 ጥያቄዎችን ገንባ፣ የጥንድ ልዩነቶችን ሁልጊዜ ከክልሎች ጋር ዘግብ፣ የተደበቀ የፈተና ክፍል አቆይ፣ ውጤቶችን ከተበከሉት ንጥሎች ጋርና ያለነሱ ዘግብ።"
  },
  "note": {
   "en": "Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.",
   "am": "ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።"
  }
 },
 {
  "title": {
   "en": "A 5-year research programme: budget, funding gap and outputs",
   "am": "የ5-ዓመት የምርምር ፕሮግራም፡ በጀት፣ የገንዘብ ክፍተትና ውጤቶች"
  },
  "goal": {
   "en": "Build the budget for an African AI-for-agriculture centre, compare it with secured and likely funding, find the gap, and decide what to cut or raise.",
   "am": "ለአፍሪካ AI-ለግብርና ማዕከል በጀቱን ገንባ፣ ከተረጋገጠና ሊገኝ ከሚችል ገንዘብ ጋር አወዳድር፣ ክፍተቱን ፈልግ፣ ምን እንደሚቀነስ ወይም እንደሚሰበሰብ ወስን።"
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
    "List costs per year: staff, students, computing, field work, operations.",
    "List funding: secured grants, likely grants (weighted by probability), spin-off income.",
    "Compute the yearly and cumulative gap.",
    "Count outputs: PhDs and MScs graduated, papers, tools released.",
    "Decide where to cut, phase or raise funds."
   ],
   "am": [
    "በዓመት ወጪዎችን ዘርዝር፡ ሠራተኞች፣ ተማሪዎች፣ ኮምፒውቲንግ፣ የመስክ ሥራ፣ ሥራ ማስኬጃ።",
    "ገንዘብን ዘርዝር፡ የተረጋገጡ ድጎማዎች፣ ሊገኙ የሚችሉ ድጎማዎች (በፕሮባቢሊቲ የተመዘኑ)፣ የspin-off ገቢ።",
    "የዓመቱንና የተጠራቀመውን ክፍተት አስላ።",
    "ውጤቶችን ቁጠር፡ የተመረቁ PhDs እና MScs፣ ጽሑፎች፣ የተለቀቁ tools።",
    "የት እንደሚቀነስ፣ በምዕራፍ እንደሚከፈል ወይም ገንዘብ እንደሚሰበሰብ ወስን።"
   ]
  },
  "code": "import pandas as pd\nyears = [1, 2, 3, 4, 5]\ncost = pd.DataFrame({\"staff\": [180, 220, 260, 280, 290], \"students\": [60, 110, 160, 180, 180],\n                     \"computing\": [70, 60, 60, 70, 70], \"field work\": [40, 60, 70, 70, 60], \"operations\": [30, 35, 40, 40, 45]}, index=years)  # thousand USD\nsecured = pd.Series([350, 330, 200, 100, 0], index=years)\nlikely = pd.Series([0, 120, 250, 300, 320], index=years) * 0.5            # applications, 50% chance\nspinoff = pd.Series([0, 0, 20, 60, 120], index=years)\ntotal = cost.sum(axis=1); funded = secured + likely + spinoff; gap = total - funded\nprint(pd.DataFrame({\"cost\": total, \"expected funding\": funded, \"gap\": gap}).round(0).to_string())\nprint(f\"5-year cost {total.sum():,.0f}k; expected funding {funded.sum():,.0f}k; gap {gap.sum():,.0f}k ({gap.sum() / total.sum():.0%})\")\noutputs = {\"PhD graduates\": 6, \"MSc graduates\": 20, \"papers\": 35, \"open tools\": 5}\nworst = int(gap.idxmax())",
  "out": "   cost  expected funding    gap\n1   380             350.0   30.0\n2   485             390.0   95.0\n3   590             345.0  245.0\n4   640             310.0  330.0\n5   645             280.0  365.0\n5-year cost 2,740k; expected funding 1,675k; gap 1,065k (39%)",
  "lang": "Python",
  "viz": [
   {
    "type": "xy",
    "title": {
     "en": "Cost vs expected funding (thousand USD)",
     "am": "ወጪ vs የሚጠበቅ ገንዘብ (በሺህ USD)"
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
      "en": "Thousand USD",
      "am": "ሺህ USD"
     },
     "min": 0
    },
    "series": [
     {
      "name": {
       "en": "Cost",
       "am": "ወጪ"
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
       380.0,
       485.0,
       590.0,
       640.0,
       645.0
      ],
      "tip": [
       "380|Cost · 1",
       "485|Cost · 2",
       "590|Cost · 3",
       "640|Cost · 4",
       "645|Cost · 5"
      ],
      "endlabel": {
       "en": "Cost",
       "am": "ወጪ"
      }
     },
     {
      "name": {
       "en": "Expected funding",
       "am": "የሚጠበቅ ገንዘብ"
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
       350.0,
       390.0,
       345.0,
       310.0,
       280.0
      ],
      "tip": [
       "350|Expected funding · 1",
       "390|Expected funding · 2",
       "345|Expected funding · 3",
       "310|Expected funding · 4",
       "280|Expected funding · 5"
      ],
      "endlabel": {
       "en": "Expected funding",
       "am": "የሚጠበቅ ገንዘብ"
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
       "en": "Cost",
       "am": "ወጪ"
      },
      {
       "en": "Expected funding",
       "am": "የሚጠበቅ ገንዘብ"
      }
     ],
     "rows": [
      [
       1.0,
       380.0,
       350.0
      ],
      [
       2.0,
       485.0,
       390.0
      ],
      [
       3.0,
       590.0,
       345.0
      ],
      [
       4.0,
       640.0,
       310.0
      ],
      [
       5.0,
       645.0,
       280.0
      ]
     ]
    },
    "rpad": 90
   },
   {
    "type": "seg",
    "title": {
     "en": "Where the 5-year budget goes (thousand USD)",
     "am": "የ5-ዓመቱ በጀት የት ይሄዳል (በሺህ USD)"
    },
    "unit": "k USD",
    "parts": [
     {
      "name": {
       "en": "staff",
       "am": "staff"
      },
      "v": 1230.0,
      "slot": 0
     },
     {
      "name": {
       "en": "students",
       "am": "students"
      },
      "v": 690.0,
      "slot": 1
     },
     {
      "name": {
       "en": "computing",
       "am": "computing"
      },
      "v": 330.0,
      "slot": 2
     },
     {
      "name": {
       "en": "field work",
       "am": "field work"
      },
      "v": 300.0,
      "slot": 3
     },
     {
      "name": {
       "en": "operations",
       "am": "operations"
      },
      "v": 190.0,
      "slot": 0
     }
    ],
    "table": {
     "cols": [
      {
       "en": "Part",
       "am": "ክፍል"
      },
      {
       "en": "Value",
       "am": "እሴት"
      }
     ],
     "rows": [
      [
       {
        "en": "staff",
        "am": "staff"
       },
       1230.0
      ],
      [
       {
        "en": "students",
        "am": "students"
       },
       690.0
      ],
      [
       {
        "en": "computing",
        "am": "computing"
       },
       330.0
      ],
      [
       {
        "en": "field work",
        "am": "field work"
       },
       300.0
      ],
      [
       {
        "en": "operations",
        "am": "operations"
       },
       190.0
      ]
     ]
    }
   }
  ],
  "analysis": {
   "en": [
    "The programme costs 2,740k USD over 5 years; expected funding covers 61%.",
    "The gap is largest in year 5 (365k), when the first grants end and students peak.",
    "Staff and students are over 60% of the cost: the programme is people, so funding gaps hit training first."
   ],
   "am": [
    "ፕሮግራሙ በ5 ዓመታት 2,740k USD ያስወጣል፤ የሚጠበቀው ገንዘብ 61%ን ይሸፍናል።",
    "ክፍተቱ በዓመት 5 ትልቁ ነው (365k)፣ የመጀመሪያዎቹ ድጎማዎች ሲያልቁና ተማሪዎች ሲበዙ።",
    "ሠራተኞችና ተማሪዎች ከወጪው ከ60% በላይ ናቸው፡ ፕሮግራሙ ሰዎች ነው፤ ስለዚህ የገንዘብ ክፍተቶች መጀመሪያ ሥልጠናን ይመታሉ።"
   ]
  },
  "decision": {
   "en": "Submit two more grant applications before year 2, start the spin-off service in year 2 not 3, and phase the student intake so year 5 has no gap above 15%.",
   "am": "ከዓመት 2 በፊት ሁለት ተጨማሪ የድጎማ ማመልከቻዎችን አስገባ፣ የspin-off አገልግሎቱን በዓመት 3 ሳይሆን በዓመት 2 ጀምር፣ ዓመት 5 ከ15% በላይ ክፍተት እንዳይኖረው የተማሪ ቅበላውን በምዕራፍ አድርግ።"
  },
  "note": {
   "en": "Illustrative figures; use your institution’s salary scales and real grant calls.",
   "am": "ለማሳያ ቁጥሮች፤ የተቋምህን የደመወዝ ስኬሎችና እውነተኛ የድጎማ ጥሪዎችን ተጠቀም።"
  }
 }
];
