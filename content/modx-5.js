/* Level 5 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[5] = [
 {
  "why": {
   "en": "Clean, tested, reviewed code is cheaper to change, and change is most of a software job.",
   "am": "ንጹሕ፣ የተፈተነና የተገመገመ ኮድ ለመቀየር ርካሽ ነው፤ መቀየርም የሶፍትዌር ሥራ አብዛኛው ክፍል ነው።"
  },
  "dg": [
   {
    "type": "stack",
    "title": {
     "en": "The testing pyramid",
     "am": "የፍተሻ ፒራሚድ"
    },
    "layers": [
     {
      "t": {
       "en": "End-to-end: a few",
       "am": "End-to-end፡ ጥቂት"
      },
      "s": {
       "en": "the whole app, like a user",
       "am": "ሙሉ መተግበሪያው፣ እንደ ተጠቃሚ"
      }
     },
     {
      "t": {
       "en": "Integration: some",
       "am": "Integration፡ አንዳንድ"
      },
      "s": {
       "en": "parts working together: API + database",
       "am": "አብረው የሚሠሩ ክፍሎች፡ API + ዳታቤዝ"
      }
     },
     {
      "t": {
       "en": "Unit: many",
       "am": "Unit፡ ብዙ"
      },
      "s": {
       "en": "one function, fast, run on every save",
       "am": "አንድ function፣ ፈጣን፣ በእያንዳንዱ ማስቀመጥ ይሠራል"
      }
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Reviewing a pull request",
     "am": "pull requestን መገምገም"
    },
    "cols": [
     {
      "h": {
       "en": "Unhelpful",
       "am": "የማይጠቅም"
      },
      "items": {
       "en": [
        "\"This is wrong.\"",
        "\"Why would you do this?\""
       ],
       "am": [
        "«ይህ ስህተት ነው።»",
        "«ይህን ለምን ታደርጋለህ?»"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Helpful",
       "am": "የሚጠቅም"
      },
      "items": {
       "en": [
        "\"This loops twice over the list; one pass with a dict would be O(n). Want me to sketch it?\"",
        "Praise what is good, too"
       ],
       "am": [
        "«ይህ ዝርዝሩን ሁለት ጊዜ ይዞራል፤ በdict አንድ ዙር O(n) ይሆናል። ልሣልልህ?»",
        "ጥሩውንም አመስግን"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "# Before: one function does everything, with unclear names\ndef f(d):\n    t = 0\n    for x in d:\n        if x[1] > 0: t += x[1] * x[2]\n    return t * 1.15\n\n# After: small, named, tested\nVAT = 0.15\ndef line_total(qty, unit_price):\n    return qty * unit_price\ndef invoice_total(lines, vat=VAT):\n    \"\"\"Sum of valid lines plus VAT. Lines with zero or negative quantity are ignored.\"\"\"\n    subtotal = sum(line_total(q, p) for _, q, p in lines if q > 0)\n    return round(subtotal * (1 + vat), 2)\n\ndef test_invoice_total():\n    lines = [(\"teff\", 2, 120.0), (\"returned\", -1, 50.0), (\"salt\", 1, 30.0)]\n    assert invoice_total(lines) == 310.5\n    assert invoice_total([]) == 0\n    assert invoice_total(lines) == round(f(lines), 2)     # same behaviour as the old code\ntest_invoice_total()\nprint(\"all tests passed; total =\", invoice_total([(\"teff\", 2, 120.0), (\"salt\", 1, 30.0)]))",
   "out": "all tests passed; total = 310.5",
   "title": {
    "en": "Refactor a function and protect it with a unit test",
    "am": "functionን አሻሽለህ በunit test ጠብቀው"
   }
  },
  "qa": {
   "en": [
    "It does one thing, has a name that says what, is short, and is easy to test.",
    "That several parts work together correctly, for example the API really writes to and reads from the database.",
    "Be specific and kind: point to the line, explain the problem and suggest a fix; ask questions rather than judge; mention what is good."
   ],
   "am": [
    "አንድ ነገር ያደርጋል፣ ምን እንደሚያደርግ የሚናገር ስም አለው፣ አጭር ነው፣ ለመፈተሽም ቀላል ነው።",
    "በርካታ ክፍሎች በትክክል አብረው እንደሚሠሩ፣ ለምሳሌ APIው በእርግጥ ወደ ዳታቤዙ እንደሚጽፍና እንደሚያነብ።",
    "ግልጽና ደግ ሁን፡ መስመሩን አመልክት፣ ችግሩን አብራራ፣ ማስተካከያ ጠቁም፤ ከመፍረድ ይልቅ ጠይቅ፤ ጥሩውንም ጥቀስ።"
   ]
  }
 },
 {
  "why": {
   "en": "Containers and automated pipelines let a small team ship reliably and pay only for what it uses.",
   "am": "containers እና በራስ-ሰር የሚሠሩ pipelines ትንሽ ቡድን በአስተማማኝ ሁኔታ እንዲያቀርብና ለሚጠቀመው ብቻ እንዲከፍል ያስችላሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "From commit to running service",
     "am": "ከcommit ወደ የሚሠራ አገልግሎት"
    },
    "nodes": [
     {
      "t": {
       "en": "git push",
       "am": "git push"
      }
     },
     {
      "t": {
       "en": "CI: run tests",
       "am": "CI፡ ፈተናዎችን አስኪድ"
      },
      "s": {
       "en": "fail → stop, nothing deployed",
       "am": "ከወደቀ → ይቆማል፣ ምንም አይቀርብም"
      }
     },
     {
      "t": {
       "en": "Build image",
       "am": "image ገንባ"
      },
      "s": {
       "en": "docker build",
       "am": "docker build"
      }
     },
     {
      "t": {
       "en": "Deploy container",
       "am": "container አቅርብ"
      },
      "s": {
       "en": "cloud region near users",
       "am": "ለተጠቃሚዎች ቅርብ የሆነ የcloud ክልል"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Image vs container",
     "am": "Image vs container"
    },
    "cols": [
     {
      "h": {
       "en": "Image",
       "am": "Image"
      },
      "items": {
       "en": [
        "a frozen recipe: OS, Python, your code",
        "built once, stored in a registry"
       ],
       "am": [
        "የቀዘቀዘ የምግብ አዘገጃጀት፡ OS፣ Python፣ ኮድህ",
        "አንድ ጊዜ ተገንብቶ በregistry ይቀመጣል"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Container",
       "am": "Container"
      },
      "items": {
       "en": [
        "a running copy of an image",
        "start many, each isolated"
       ],
       "am": [
        "የimage የሚሠራ ቅጂ",
        "ብዙ አስጀምር፣ እያንዳንዱ የተለየ"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Dockerfile + GitHub Actions",
   "code": "# Dockerfile\nFROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD [\"uvicorn\", \"main:app\", \"--host\", \"0.0.0.0\", \"--port\", \"8080\"]\n\n# .github/workflows/ci.yml\nname: ci\non: [push]\njobs:\n  test-and-build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with: {python-version: \"3.12\"}\n      - run: pip install -r requirements.txt && pytest -q     # a failing test stops the job here\n      - run: docker build -t market-api:${{ github.sha }} .",
   "title": {
    "en": "Package an API and test it on every push",
    "am": "APIን አሽገህ በእያንዳንዱ push ፈትሸው"
   },
   "note": {
    "en": "Configuration example (not run here). Add a deploy step for your cloud provider after the build, with keys stored as repository secrets.",
    "am": "የconfiguration ምሳሌ (እዚህ አልተሠራም)። ከbuild በኋላ ለcloud አቅራቢህ የdeploy እርምጃ ጨምር፤ ቁልፎቹም እንደ repository secrets ይቀመጡ።"
   }
  },
  "qa": {
   "en": [
    "An image is the packaged recipe; a container is a running instance of that image (you can run many containers from one image).",
    "The setup is written down, reviewed and versioned like code, so it can be rebuilt identically and changes are visible.",
    "The pipeline stops at the test step and marks the commit as failed; nothing is built or deployed until the test passes."
   ],
   "am": [
    "image የታሸገው የምግብ አዘገጃጀት ነው፤ container የዚያ image የሚሠራ instance ነው (ከአንድ image ብዙ containers ማስኬድ ትችላለህ)።",
    "ዝግጅቱ እንደ ኮድ ይጻፋል፣ ይገመገማል፣ ስሪትም ይኖረዋል፤ ስለዚህ በተመሳሳይ ሁኔታ እንደገና ሊገነባ ይችላል፣ ለውጦችም ይታያሉ።",
    "pipelineኑ በፈተናው እርምጃ ይቆማል፣ commitኡንም እንደወደቀ ምልክት ያደርጋል፤ ፈተናው እስኪያልፍ ምንም አይገነባም፣ አይቀርብም።"
   ]
  }
 },
 {
  "why": {
   "en": "Clean, reliable data pipelines are what every dashboard and model depends on.",
   "am": "ንጹሕና አስተማማኝ የዳታ pipelines እያንዳንዱ dashboard እና ሞዴል የሚመካባቸው ናቸው።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "ETL",
     "am": "ETL"
    },
    "nodes": [
     {
      "t": {
       "en": "Extract",
       "am": "Extract"
      },
      "s": {
       "en": "SMS reports, CSVs, APIs",
       "am": "የSMS ሪፖርቶች፣ CSVs፣ APIs"
      }
     },
     {
      "t": {
       "en": "Transform",
       "am": "Transform"
      },
      "s": {
       "en": "clean, validate, deduplicate, convert units",
       "am": "አጽዳ፣ አረጋግጥ፣ ድግግሞሽን አስወግድ፣ መለኪያዎችን ቀይር"
      }
     },
     {
      "t": {
       "en": "Load",
       "am": "Load"
      },
      "s": {
       "en": "warehouse tables, Parquet",
       "am": "የwarehouse ሰንጠረዦች፣ Parquet"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "CSV vs Parquet",
     "am": "CSV vs Parquet"
    },
    "cols": [
     {
      "h": {
       "en": "CSV",
       "am": "CSV"
      },
      "items": {
       "en": [
        "text, row by row",
        "no types, large, slow to scan"
       ],
       "am": [
        "ጽሑፍ፣ ረድፍ በረድፍ",
        "ዓይነቶች የሉም፣ ትልቅ፣ ለመቃኘት ቀርፋፋ"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Parquet",
       "am": "Parquet"
      },
      "items": {
       "en": [
        "columnar and compressed",
        "keeps types; reads only needed columns"
       ],
       "am": [
        "በዓምድ የተደራጀና የታመቀ",
        "ዓይነቶችን ይጠብቃል፤ የሚያስፈልጉትን ዓምዶች ብቻ ያነባል"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import pandas as pd\nraw = pd.DataFrame({\n    \"report_id\": [101, 102, 102, 103, 104, 105],\n    \"market\":    [\"Bahir Dar\", \"debre markos \", \"debre markos \", \"Gondar\", \"Gondar\", \"Dessie\"],\n    \"crop\":      [\"teff\", \"teff\", \"teff\", \"maize\", \"teff\", \"teff\"],\n    \"price\":     [\"118\", \"11.2\", \"11.2\", \"38\", \"\", \"121\"],       # 11.2 was sent per 100 g by mistake\n    \"unit\":      [\"kg\", \"100g\", \"100g\", \"kg\", \"kg\", \"kg\"]})\nprint(\"raw rows:\", len(raw))\ndf = raw.drop_duplicates(\"report_id\").copy()                         # duplicates\ndf[\"market\"] = df.market.str.strip().str.title()                     # consistent names\ndf[\"price\"] = pd.to_numeric(df.price, errors=\"coerce\")               # bad or missing -> NaN\ndf.loc[df.unit == \"100g\", \"price\"] *= 10; df[\"unit\"] = \"kg\"          # one unit\nproblems = df[df.price.isna() | ~df.price.between(5, 500)]           # validation rule\nclean = df.drop(problems.index)\nprint(\"duplicates removed:\", len(raw) - len(raw.drop_duplicates(\"report_id\")), \"| rejected:\", problems.report_id.tolist())\nprint(clean[[\"market\", \"crop\", \"price\"]].to_string(index=False))",
   "out": "raw rows: 6\nduplicates removed: 1 | rejected: [104]\n      market  crop  price\n   Bahir Dar  teff  118.0\nDebre Markos  teff  112.0\n      Gondar maize   38.0\n      Dessie  teff  121.0",
   "title": {
    "en": "Transform step: duplicates, units, missing values and validation",
    "am": "የTransform እርምጃ፡ ድግግሞሾች፣ መለኪያዎች፣ የጎደሉ እሴቶችና ማረጋገጫ"
   },
   "note": {
    "en": "Keep rejected rows in a separate table with the reason, so someone can fix them at the source.",
    "am": "የተከለከሉ ረድፎችን ከምክንያቱ ጋር በተለየ ሰንጠረዥ አቆይ፤ ስለዚህ አንድ ሰው ከምንጩ ሊያስተካክላቸው ይችላል።"
   }
  },
  "qa": {
   "en": [
    "Transform: cleans and reshapes the data (types, units, duplicates, joins, validation) before it is loaded.",
    "Check a unique key (drop_duplicates on report_id), or a combination of columns that should be unique; count before and after.",
    "It is columnar and compressed, keeps data types, and lets queries read only the columns they need, so it is smaller and faster than CSV."
   ],
   "am": [
    "Transform፡ ዳታውን ከመጫኑ በፊት ያጸዳዋል፣ ይቀርጸዋል (ዓይነቶች፣ መለኪያዎች፣ ድግግሞሾች፣ joins፣ ማረጋገጫ)።",
    "ልዩ ቁልፍን ፈትሽ (በreport_id ላይ drop_duplicates)፣ ወይም ልዩ መሆን ያለበት የዓምዶች ጥምረት፤ ከዚያ በፊትና በኋላ ቁጠር።",
    "በዓምድ የተደራጀና የታመቀ ነው፣ የዳታ ዓይነቶችን ይጠብቃል፣ queries የሚያስፈልጓቸውን ዓምዶች ብቻ እንዲያነቡ ያስችላል፤ ስለዚህ ከCSV ያነሰና ፈጣን ነው።"
   ]
  }
 },
 {
  "why": {
   "en": "Statistics tells you whether a change really worked or you just got lucky.",
   "am": "ስታቲስቲክስ አንድ ለውጥ በእርግጥ እንደሠራ ወይም ዝም ብሎ እድለኛ እንደሆንክ ይነግርሃል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "An A/B test",
     "am": "A/B ፈተና"
    },
    "nodes": [
     {
      "t": {
       "en": "Users",
       "am": "ተጠቃሚዎች"
      }
     },
     {
      "t": {
       "en": "Random split",
       "am": "በዘፈቀደ መከፋፈል"
      },
      "s": {
       "en": "removes bias",
       "am": "አድልዎን ያስወግዳል"
      }
     },
     {
      "t": {
       "en": "A: old screen / B: new screen",
       "am": "A፡ የድሮ ስክሪን / B፡ አዲስ ስክሪን"
      }
     },
     {
      "t": {
       "en": "Compare rates + interval",
       "am": "መጠኖችንና ክልሉን አወዳድር"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "A p-value of 0.03 …",
     "am": "p-value 0.03 …"
    },
    "cols": [
     {
      "h": {
       "en": "means",
       "am": "ማለት"
      },
      "items": {
       "en": [
        "if there were no real difference, a result this extreme would happen about 3% of the time"
       ],
       "am": [
        "እውነተኛ ልዩነት ባይኖር ኖሮ ይህን ያህል ጽንፍ ያለ ውጤት 3% ገደማ ይከሰት ነበር"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "does NOT mean",
       "am": "ማለት አይደለም"
      },
      "items": {
       "en": [
        "3% chance the idea is wrong",
        "the effect is large or important"
       ],
       "am": [
        "ሐሳቡ ስህተት የመሆን 3% ዕድል",
        "ውጤቱ ትልቅ ወይም አስፈላጊ ነው"
       ]
      },
      "tone": "bad"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nfrom scipy import stats\nn_a, buy_a = 2400, 192        # old checkout screen\nn_b, buy_b = 2400, 238        # new checkout screen (users assigned at random)\npa, pb = buy_a / n_a, buy_b / n_b\np_pool = (buy_a + buy_b) / (n_a + n_b)\nz = (pb - pa) / np.sqrt(p_pool * (1 - p_pool) * (1 / n_a + 1 / n_b))\np_value = 2 * stats.norm.sf(abs(z))\nse = np.sqrt(pa * (1 - pa) / n_a + pb * (1 - pb) / n_b)\nlo, hi = (pb - pa) - 1.96 * se, (pb - pa) + 1.96 * se\nprint(f\"A: {pa:.1%}  B: {pb:.1%}  difference: {pb - pa:+.1%}\")\nprint(f\"z = {z:.2f}, p = {p_value:.3f}, 95% interval for the difference: {lo:+.1%} to {hi:+.1%}\")",
   "out": "A: 8.0%  B: 9.9%  difference: +1.9%\nz = 2.32, p = 0.020, 95% interval for the difference: +0.3% to +3.5%",
   "title": {
    "en": "A/B test with a confidence interval",
    "am": "A/B ፈተና ከconfidence interval ጋር"
   },
   "note": {
    "en": "In plain words: the new screen most likely raises purchases by between about 0.3 and 3.5 percentage points; the best single estimate is 1.9.",
    "am": "በቀላል ቃላት፡ አዲሱ ስክሪን ግዢዎችን ከ0.3 እስከ 3.5 percentage points ገደማ ሊያሳድግ ይችላል፤ ምርጡ ነጠላ ግምት 1.9 ነው።"
   }
  },
  "qa": {
   "en": [
    "If there were truly no effect, data this extreme would appear about 3% of the time. It is not the probability that the hypothesis is true, and it says nothing about the size of the effect.",
    "Randomisation makes the groups alike in everything except the version, so a difference can be credited to the version, not to who chose it.",
    "The posterior combines the prior with the data; a strong prior pulls the result towards it, especially when there is little data."
   ],
   "am": [
    "በእርግጥ ምንም ውጤት ባይኖር ይህን ያህል ጽንፍ ያለ ዳታ 3% ገደማ ይታይ ነበር። መላምቱ እውነት የመሆን ፕሮባቢሊቲ አይደለም፣ ስለ ውጤቱ መጠንም ምንም አይልም።",
    "በዘፈቀደ መመደብ ቡድኖቹን ከስሪቱ በስተቀር በሁሉም ነገር ተመሳሳይ ያደርጋቸዋል፤ ስለዚህ ልዩነቱ ለመረጠው ሳይሆን ለስሪቱ ሊሰጥ ይችላል።",
    "posterior priorን ከዳታው ጋር ያጣምራል፤ ጠንካራ prior ውጤቱን ወደ ራሱ ይጎትታል፣ በተለይ ዳታው ጥቂት ሲሆን።"
   ]
  }
 },
 {
  "why": {
   "en": "Deep learning recognises images and text; small models bring it to cheap phones offline.",
   "am": "deep learning ምስሎችንና ጽሑፍን ይለያል፤ ትናንሽ ሞዴሎች ያለ ኢንተርኔት ርካሽ ስልኮች ላይ ያደርሱታል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Transfer learning for a leaf-disease app",
     "am": "ለቅጠል በሽታ መተግበሪያ transfer learning"
    },
    "nodes": [
     {
      "t": {
       "en": "Pretrained network",
       "am": "ቀድሞ የሰለጠነ network"
      },
      "s": {
       "en": "learned edges, textures, shapes on millions of images",
       "am": "በሚሊዮኖች ምስሎች ላይ ጠርዞችን፣ ሸካራነቶችንና ቅርጾችን የተማረ"
      }
     },
     {
      "t": {
       "en": "Freeze early layers",
       "am": "የመጀመሪያዎቹን ንብርብሮች አቀዝቅዝ"
      }
     },
     {
      "t": {
       "en": "Train a new last layer",
       "am": "አዲስ የመጨረሻ ንብርብር አሰልጥን"
      },
      "s": {
       "en": "800 local leaf photos",
       "am": "800 የአካባቢ ቅጠል ፎቶዎች"
      }
     },
     {
      "t": {
       "en": "Quantise → phone",
       "am": "Quantise → ስልክ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Model size for phones",
     "am": "ለስልኮች የሞዴል መጠን"
    },
    "cols": [
     {
      "h": {
       "en": "float32",
       "am": "float32"
      },
      "items": {
       "en": [
        "4 bytes per weight",
        "most accurate, large"
       ],
       "am": [
        "በአንድ weight 4 bytes",
        "በጣም ትክክለኛ፣ ትልቅ"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "int8 (quantised)",
       "am": "int8 (quantised)"
      },
      "items": {
       "en": [
        "1 byte per weight: 4× smaller",
        "tiny error if done well"
       ],
       "am": [
        "በአንድ weight 1 byte፡ 4× ያነሰ",
        "በትክክል ከተሠራ በጣም ትንሽ ስህተት"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(0)\nW = rng.normal(0, 0.05, (512, 256)).astype(np.float32)        # one layer's weights\nx = rng.normal(0, 1, 512).astype(np.float32)\nscale = np.abs(W).max() / 127                                   # symmetric int8 quantisation\nW8 = np.round(W / scale).astype(np.int8)\ny_full = x @ W\ny_q = x @ (W8.astype(np.float32) * scale)\nprint(f\"size: {W.nbytes / 1024:.0f} KB -> {W8.nbytes / 1024:.0f} KB ({W.nbytes / W8.nbytes:.0f}x smaller)\")\nprint(f\"relative output error: {np.linalg.norm(y_full - y_q) / np.linalg.norm(y_full):.2%}\")",
   "out": "size: 512 KB -> 128 KB (4x smaller)\nrelative output error: 1.20%",
   "title": {
    "en": "How much smaller does quantisation make a layer?",
    "am": "quantisation አንድን ንብርብር ምን ያህል ያሳንሰዋል?"
   },
   "note": {
    "en": "Real projects use PyTorch or TensorFlow Lite tools that quantise a whole trained network and then re-check accuracy on the test set.",
    "am": "እውነተኛ ፕሮጀክቶች ሙሉ የሰለጠነ networkን quantise የሚያደርጉና ከዚያ በtest set ላይ ትክክለኛነትን እንደገና የሚፈትሹ የPyTorch ወይም TensorFlow Lite መሣሪያዎችን ይጠቀማሉ።"
   }
  },
  "qa": {
   "en": [
    "It adjusts some or all of the learned weights (often only the last layers) using your smaller, local dataset.",
    "It creates realistic new examples (flips, crops, light changes), so the model learns the object, not accidents of the few photos.",
    "In the example 4 times (float32 to int8), with about 1% change in the layer output; always re-check accuracy on the test set."
   ],
   "am": [
    "በትንሹ የአካባቢ ዳታሴትህ የተወሰኑ ወይም ሁሉንም የተማሩ weights (ብዙውን ጊዜ የመጨረሻዎቹን ንብርብሮች ብቻ) ያስተካክላል።",
    "እውነተኛ የሚመስሉ አዳዲስ ምሳሌዎችን ይፈጥራል (መገልበጥ፣ መቁረጥ፣ የብርሃን ለውጦች)፤ ስለዚህ ሞዴሉ የጥቂቶቹን ፎቶዎች አጋጣሚዎች ሳይሆን ነገሩን ይማራል።",
    "በምሳሌው 4 እጥፍ (ከfloat32 ወደ int8)፣ በንብርብሩ ውጤት ላይ ወደ 1% ገደማ ለውጥ፤ ትክክለኛነትን በtest set ላይ ሁልጊዜ እንደገና ፈትሽ።"
   ]
  }
 },
 {
  "why": {
   "en": "A model is only useful if it keeps working after launch; MLOps watches and renews it.",
   "am": "ሞዴል ጠቃሚ የሚሆነው ከተለቀቀ በኋላ መሥራቱን ሲቀጥል ብቻ ነው፤ MLOps ይከታተለዋል፣ ያድሰዋልም።"
  },
  "dg": [
   {
    "type": "cycle",
    "title": {
     "en": "The model life cycle",
     "am": "የሞዴል የሕይወት ዑደት"
    },
    "nodes": [
     {
      "t": {
       "en": "Train + track",
       "am": "አሰልጥን + ተከታተል"
      },
      "s": {
       "en": "parameters, data version, metrics",
       "am": "parameters፣ የዳታ ስሪት፣ metrics"
      }
     },
     {
      "t": {
       "en": "Serve",
       "am": "አገልግል"
      },
      "s": {
       "en": "API, batch or on-device",
       "am": "API፣ batch ወይም በመሣሪያ ላይ"
      }
     },
     {
      "t": {
       "en": "Monitor",
       "am": "ተቆጣጠር"
      },
      "s": {
       "en": "accuracy, drift, cost",
       "am": "ትክክለኛነት፣ drift፣ ወጪ"
      }
     },
     {
      "t": {
       "en": "Retrain + review",
       "am": "እንደገና አሰልጥን + ገምግም"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Data drift",
     "am": "Data drift"
    },
    "cols": [
     {
      "h": {
       "en": "Training data (2025)",
       "am": "የሥልጠና ዳታ (2025)"
      },
      "items": {
       "en": [
        "rainfall mostly 600–900 mm",
        "old seed varieties"
       ],
       "am": [
        "ዝናብ በአብዛኛው 600–900 mm",
        "የድሮ የዘር ዝርያዎች"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Live data (2026)",
       "am": "የቀጥታ ዳታ (2026)"
      },
      "items": {
       "en": [
        "drought year: 350–550 mm",
        "new varieties → model unsure"
       ],
       "am": [
        "የድርቅ ዓመት፡ 350–550 mm",
        "አዳዲስ ዝርያዎች → ሞዴሉ እርግጠኛ አይደለም"
       ]
      },
      "tone": "bad"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nfrom scipy import stats\nrng = np.random.default_rng(5)\ntrain_rain = rng.normal(750, 90, 2000)                 # mm, what the model was trained on\nweeks = {\"week 1\": rng.normal(745, 90, 300), \"week 2\": rng.normal(735, 95, 300), \"week 3\": rng.normal(480, 70, 300)}\nfor name, live in weeks.items():\n    ks = stats.ks_2samp(train_rain, live)\n    # with large samples tiny shifts get small p-values, so alert on the SIZE of the shift (KS statistic)\n    alert = \"DRIFT - alert team, consider retraining\" if ks.statistic > 0.2 else \"small shift - keep watching\" if ks.statistic > 0.1 else \"ok\"\n    print(f\"{name}: mean {live.mean():5.0f} mm, KS statistic {ks.statistic:.2f}, p = {ks.pvalue:.3g} -> {alert}\")",
   "out": "week 1: mean   745 mm, KS statistic 0.07, p = 0.165 -> ok\nweek 2: mean   732 mm, KS statistic 0.12, p = 0.000648 -> small shift - keep watching\nweek 3: mean   485 mm, KS statistic 0.91, p = 1.96e-244 -> DRIFT - alert team, consider retraining",
   "title": {
    "en": "Detecting data drift with a two-sample test",
    "am": "data driftን በtwo-sample ፈተና መለየት"
   },
   "note": {
    "en": "Week 2 has a tiny p-value but a small shift: with hundreds of records almost any change is \"significant\", so the alert uses the size of the shift.",
    "am": "ሳምንት 2 በጣም ትንሽ p-value ግን ትንሽ ለውጥ አለው፡ በመቶዎች መዝገቦች ማንኛውም ለውጥ ከሞላ ጎደል «ጉልህ» ይሆናል፤ ስለዚህ ማንቂያው የለውጡን መጠን ይጠቀማል።"
   }
  },
  "qa": {
   "en": [
    "When the data the model sees in use changes from the data it was trained on (new conditions, sensors, users), so its accuracy can drop silently.",
    "To know exactly which data produced which model, so results can be reproduced, compared and audited.",
    "When monitoring shows drift or falling accuracy, when enough new labelled data has arrived, or on a planned schedule, always after review on held-out data."
   ],
   "am": [
    "ሞዴሉ በአገልግሎት ላይ የሚያየው ዳታ ከሰለጠነበት ዳታ ሲለወጥ (አዳዲስ ሁኔታዎች፣ ሴንሰሮች፣ ተጠቃሚዎች)፤ ስለዚህ ትክክለኛነቱ በዝምታ ሊወርድ ይችላል።",
    "የትኛው ዳታ የትኛውን ሞዴል እንዳፈራ በትክክል ለማወቅ፤ ስለዚህ ውጤቶች ሊደገሙ፣ ሊወዳደሩና ሊመረመሩ ይችላሉ።",
    "ክትትሉ drift ወይም እየወረደ ያለ ትክክለኛነት ሲያሳይ፣ በቂ አዲስ labelled ዳታ ሲመጣ፣ ወይም በታቀደ ጊዜ፣ ሁልጊዜ በተለየ ዳታ ላይ ከተገመገመ በኋላ።"
   ]
  }
 },
 {
  "why": {
   "en": "Language models become useful products when grounded in your documents and measured honestly.",
   "am": "የቋንቋ ሞዴሎች በሰነዶችህ ላይ ሲመሠረቱና በታማኝነት ሲለኩ ጠቃሚ ምርቶች ይሆናሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Retrieval-augmented generation (RAG)",
     "am": "Retrieval-augmented generation (RAG)"
    },
    "nodes": [
     {
      "t": {
       "en": "Question",
       "am": "ጥያቄ"
      },
      "s": {
       "en": "\"When do I plant teff?\"",
       "am": "«ጤፍ መቼ ልዝራ?»"
      }
     },
     {
      "t": {
       "en": "Search your documents",
       "am": "ሰነዶችህን ፈልግ"
      },
      "s": {
       "en": "embeddings / vector search",
       "am": "embeddings / vector search"
      }
     },
     {
      "t": {
       "en": "Model reads the top passages",
       "am": "ሞዴሉ ከፍተኛዎቹን ክፍሎች ያነባል"
      }
     },
     {
      "t": {
       "en": "Answer + source",
       "am": "መልስ + ምንጭ"
      },
      "s": {
       "en": "cites the extension guide",
       "am": "የኤክስቴንሽን መመሪያውን ይጠቅሳል"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Evaluating an assistant",
     "am": "ረዳትን መገምገም"
    },
    "cols": [
     {
      "h": {
       "en": "Impressions",
       "am": "ስሜቶች"
      },
      "items": {
       "en": [
        "\"It looked good in the demo\""
       ],
       "am": [
        "«በማሳያው ጥሩ ይመስል ነበር»"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Evaluation set",
       "am": "የግምገማ ስብስብ"
      },
      "items": {
       "en": [
        "100 real questions with correct answers",
        "score every new version the same way"
       ],
       "am": [
        "100 እውነተኛ ጥያቄዎች ከትክክለኛ መልሶች ጋር",
        "እያንዳንዱን አዲስ ስሪት በተመሳሳይ መንገድ አስመዝግብ"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "from sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.metrics.pairwise import cosine_similarity\ndocs = {\"teff-guide p.3\": \"Plant teff at the start of the main rains, usually July, on a fine firm seedbed.\",\n        \"maize-guide p.7\": \"Apply urea to maize in two splits: at planting and at knee height.\",\n        \"storage-note p.1\": \"Dry grain to below 13 percent moisture before storing in hermetic bags.\",\n        \"teff-guide p.9\": \"Harvest teff when the straw turns yellow, before grains shatter.\"}\nvec = TfidfVectorizer().fit(docs.values()); M = vec.transform(docs.values())\ndef retrieve(question):\n    s = cosine_similarity(vec.transform([question]), M)[0]\n    return list(docs)[s.argmax()]\nevalset = [(\"When should I plant teff?\", \"teff-guide p.3\"), (\"How dry must grain be for storage?\", \"storage-note p.1\"),\n           (\"When do I add urea to maize?\", \"maize-guide p.7\"), (\"When to harvest teff?\", \"teff-guide p.9\")]\nhits = 0\nfor q, gold in evalset:\n    got = retrieve(q); hits += got == gold\n    print(f\"{q:38s} -> {got:17s} {'correct' if got == gold else 'WRONG'}\")\nprint(f\"retrieval accuracy: {hits}/{len(evalset)}\")",
   "out": "When should I plant teff?              -> teff-guide p.9    WRONG\nHow dry must grain be for storage?     -> storage-note p.1  correct\nWhen do I add urea to maize?           -> maize-guide p.7   correct\nWhen to harvest teff?                  -> teff-guide p.9    correct\nretrieval accuracy: 3/4",
   "title": {
    "en": "The retrieval half of RAG, with an evaluation set",
    "am": "የRAG የretrieval ግማሽ፣ ከግምገማ ስብስብ ጋር"
   },
   "note": {
    "en": "One question fails: word matching sends \"When should I plant teff?\" to the harvest page, because both share \"when\" and \"teff\". The evaluation set caught it; meaning-based embeddings usually fix it. In production the retrieved passages and their sources go to the language model, which must answer only from them and cite them.",
    "am": "አንድ ጥያቄ ይወድቃል፡ የቃላት ማዛመድ «ጤፍ መቼ ልዝራ?»ን ወደ የአጨዳ ገጹ ይልከዋል፤ ሁለቱም «መቼ» እና «ጤፍ» ስለሚጋሩ። የግምገማ ስብስቡ ያዘው፤ በትርጉም ላይ የተመሠረቱ embeddings ብዙውን ጊዜ ያስተካክሉታል። በምርት ላይ የተገኙት ክፍሎችና ምንጮቻቸው ወደ ቋንቋ ሞዴሉ ይላካሉ፤ እሱም ከእነሱ ብቻ መመለስና መጥቀስ አለበት።"
   }
  },
  "qa": {
   "en": [
    "The model does not know your private or recent documents and may invent facts; RAG retrieves the relevant passages and makes it answer from them, with sources.",
    "Keep a fixed evaluation set of real questions with correct answers and score each version (accuracy, citation correctness), plus regular human review.",
    "Personal identifiers (names with phone numbers, ID or account numbers), health details and anything users did not agree to share; store the minimum and delete on request."
   ],
   "am": [
    "ሞዴሉ የግል ወይም የቅርብ ጊዜ ሰነዶችህን አያውቅም፣ እውነታዎችንም ሊፈጥር ይችላል፤ RAG ተገቢ ክፍሎችን አምጥቶ ከእነሱ ከምንጮች ጋር እንዲመልስ ያደርገዋል።",
    "የእውነተኛ ጥያቄዎችና የትክክለኛ መልሶች ቋሚ የግምገማ ስብስብ አቆይ፣ እያንዳንዱን ስሪት አስመዝግብ (ትክክለኛነት፣ የጥቅስ ትክክለኛነት)፣ መደበኛ የሰው ግምገማም ጨምር።",
    "የግል መለያዎች (ስሞች ከስልክ ቁጥሮች ጋር፣ የመታወቂያ ወይም የሂሳብ ቁጥሮች)፣ የጤና ዝርዝሮችና ተጠቃሚዎች ለማጋራት ያልተስማሙበት ማንኛውም ነገር፤ ዝቅተኛውን አስቀምጥ፣ ሲጠየቅ ሰርዝ።"
   ]
  }
 },
 {
  "why": {
   "en": "Users trust services with money and data only if they are secure and recover from failure.",
   "am": "ተጠቃሚዎች ገንዘብና ዳታ የሚያምኑት አገልግሎቶች ደህንነታቸው የተጠበቀና ከውድቀት የሚያገግሙ ሲሆኑ ብቻ ነው።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "SQL injection",
     "am": "SQL injection"
    },
    "cols": [
     {
      "h": {
       "en": "Unsafe: text glued into SQL",
       "am": "አደገኛ፡ ጽሑፍ ከSQL ጋር ተጣብቋል"
      },
      "items": {
       "en": [
        "\"... WHERE phone = '\" + user_input + \"'\"",
        "input: ' OR '1'='1 → returns every account"
       ],
       "am": [
        "\"... WHERE phone = '\" + user_input + \"'\"",
        "ግብዓት፡ ' OR '1'='1 → እያንዳንዱን ሂሳብ ይመልሳል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Safe: parameters",
       "am": "ደህንነቱ የተጠበቀ፡ parameters"
      },
      "items": {
       "en": [
        "\"... WHERE phone = ?\", (user_input,)",
        "the input is only ever data"
       ],
       "am": [
        "\"... WHERE phone = ?\", (user_input,)",
        "ግብዓቱ ሁልጊዜ ዳታ ብቻ ነው"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "cycle",
    "title": {
     "en": "Incident response",
     "am": "ለአደጋ ምላሽ"
    },
    "nodes": [
     {
      "t": {
       "en": "Detect",
       "am": "ለይ"
      },
      "s": {
       "en": "alerts, user reports",
       "am": "ማንቂያዎች፣ የተጠቃሚ ሪፖርቶች"
      }
     },
     {
      "t": {
       "en": "Contain",
       "am": "ገድብ"
      },
      "s": {
       "en": "block, rotate keys",
       "am": "አግድ፣ ቁልፎችን ቀይር"
      }
     },
     {
      "t": {
       "en": "Fix",
       "am": "አስተካክል"
      }
     },
     {
      "t": {
       "en": "Learn",
       "am": "ተማር"
      },
      "s": {
       "en": "blameless report",
       "am": "ማንንም የማይወቅስ ሪፖርት"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import sqlite3\ndb = sqlite3.connect(\":memory:\")\ndb.execute(\"CREATE TABLE wallets(phone TEXT, balance REAL)\")\ndb.executemany(\"INSERT INTO wallets VALUES (?, ?)\", [(\"0911000001\", 1500), (\"0911000002\", 320), (\"0911000003\", 9800)])\nattack = \"x' OR '1'='1\"\nunsafe = db.execute(\"SELECT phone, balance FROM wallets WHERE phone = '\" + attack + \"'\").fetchall()\nsafe = db.execute(\"SELECT phone, balance FROM wallets WHERE phone = ?\", (attack,)).fetchall()\nprint(\"unsafe query returned\", len(unsafe), \"accounts:\", unsafe)\nprint(\"parameterised query returned\", len(safe), \"accounts\")\nimport os\napi_key = os.environ.get(\"PAYMENT_API_KEY\", \"<not set: keys live in the environment or a secrets manager, never in code>\")\nprint(\"API key:\", api_key)",
   "out": "unsafe query returned 3 accounts: [('0911000001', 1500.0), ('0911000002', 320.0), ('0911000003', 9800.0)]\nparameterised query returned 0 accounts\nAPI key: <not set: keys live in the environment or a secrets manager, never in code>",
   "title": {
    "en": "SQL injection, shown safely on a throw-away database",
    "am": "SQL injection፣ በሚጣል ዳታቤዝ ላይ በደህንነት የሚታይ"
   }
  },
  "qa": {
   "en": [
    "Attacker input changes the meaning of an SQL query; stop it with parameterised queries (placeholders), never by gluing text into SQL.",
    "In environment variables or a secrets manager, outside the code and repository, with access limited and keys rotated.",
    "What happened and when (timeline), impact on users, root cause, how it was detected and fixed, and the actions to prevent it again, without blaming individuals."
   ],
   "am": [
    "የአጥቂ ግብዓት የSQL query ትርጉምን ይቀይራል፤ በparameterised queries (placeholders) አቁመው፣ ጽሑፍን ከSQL ጋር በማጣበቅ በፍጹም አይሆንም።",
    "በenvironment variables ወይም በsecrets manager፣ ከኮዱና ከrepositoryው ውጭ፣ መዳረሻ ተገድቦና ቁልፎች እየተቀየሩ።",
    "ምን እና መቼ እንደተፈጠረ (የጊዜ ሰሌዳ)፣ በተጠቃሚዎች ላይ ያለ ተጽዕኖ፣ ዋና ምክንያት፣ እንዴት እንደተለየና እንደተስተካከለ፣ እንዳይደገም የሚወሰዱ እርምጃዎች፣ ግለሰቦችን ሳይወቅስ።"
   ]
  }
 },
 {
  "why": {
   "en": "Great engineers build the right thing: what users need and will pay for.",
   "am": "ታላላቅ መሐንዲሶች ትክክለኛውን ነገር ይገነባሉ፡ ተጠቃሚዎች የሚያስፈልጋቸውንና የሚከፍሉበትን።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Product discovery",
     "am": "የምርት ግኝት"
    },
    "nodes": [
     {
      "t": {
       "en": "Field visit",
       "am": "የመስክ ጉብኝት"
      },
      "s": {
       "en": "watch the work today",
       "am": "ዛሬ ያለውን ሥራ ተመልከት"
      }
     },
     {
      "t": {
       "en": "Interviews",
       "am": "ቃለ መጠይቆች"
      },
      "s": {
       "en": "ask about past behaviour",
       "am": "ስላለፈ ባሕሪ ጠይቅ"
      }
     },
     {
      "t": {
       "en": "Spec",
       "am": "መግለጫ"
      },
      "s": {
       "en": "problem, users, one metric, scope",
       "am": "ችግር፣ ተጠቃሚዎች፣ አንድ መለኪያ፣ ወሰን"
      }
     },
     {
      "t": {
       "en": "Small launch → measure",
       "am": "ትንሽ ልቀት → ለካ"
      },
      "hl": true
     }
    ],
    "loop": {
     "en": "learn and improve",
     "am": "ተማርና አሻሽል"
    }
   },
   {
    "type": "compare",
    "title": {
     "en": "Prioritise by impact and effort",
     "am": "በተጽዕኖና በጥረት ቅድሚያ ስጥ"
    },
    "cols": [
     {
      "h": {
       "en": "Do first",
       "am": "መጀመሪያ አድርግ"
      },
      "items": {
       "en": [
        "high impact, low effort",
        "e.g. SMS price alerts"
       ],
       "am": [
        "ከፍተኛ ተጽዕኖ፣ ዝቅተኛ ጥረት",
        "ለምሳሌ የSMS የዋጋ ማንቂያዎች"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Cut or delay",
       "am": "ቁረጥ ወይም አዘግይ"
      },
      "items": {
       "en": [
        "low impact, high effort",
        "e.g. a 3D farm view"
       ],
       "am": [
        "ዝቅተኛ ተጽዕኖ፣ ከፍተኛ ጥረት",
        "ለምሳሌ የ3D የእርሻ እይታ"
       ]
      },
      "tone": "bad"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "features = {  # reach (users/month), impact (0.25-3), confidence (0-1), effort (person-weeks)\n    \"SMS price alerts\":        (4000, 2.0, 0.8, 2),\n    \"Offline mode\":            (2500, 2.0, 0.7, 5),\n    \"Voice input in Amharic\":  (1500, 3.0, 0.5, 8),\n    \"3D farm view\":            (300, 0.5, 0.5, 10)}\nscores = {name: r * i * c / e for name, (r, i, c, e) in features.items()}     # RICE score\nfor name, s in sorted(scores.items(), key=lambda kv: -kv[1]):\n    print(f\"{name:24s} {s:8.0f}\")",
   "out": "SMS price alerts             3200\nOffline mode                  700\nVoice input in Amharic        281\n3D farm view                    8",
   "title": {
    "en": "Rank features with a RICE score",
    "am": "ባሕሪያትን በRICE ውጤት ደርድር"
   },
   "note": {
    "en": "Numbers guide the discussion; the team still checks them against what users said in interviews.",
    "am": "ቁጥሮች ውይይቱን ይመራሉ፤ ቡድኑ አሁንም በቃለ መጠይቆች ተጠቃሚዎች ካሉት ጋር ያነጻጽራቸዋል።"
   }
  },
  "qa": {
   "en": [
    "People are poor at predicting their own future behaviour but reliable about what they actually did; past behaviour shows real needs and real spending.",
    "One number that shows the problem is solved, for example the share of farmers who sell at a better price within a month of signing up.",
    "Example: the 3D farm view, because few users need it and it costs ten weeks; it can return if interviews show demand."
   ],
   "am": [
    "ሰዎች የራሳቸውን የወደፊት ባሕሪ በመተንበይ ደካማ ናቸው፣ ግን ባደረጉት ነገር ላይ አስተማማኝ ናቸው፤ ያለፈ ባሕሪ እውነተኛ ፍላጎቶችንና እውነተኛ ወጪዎችን ያሳያል።",
    "ችግሩ መፈታቱን የሚያሳይ አንድ ቁጥር፣ ለምሳሌ ከተመዘገቡ በአንድ ወር ውስጥ በተሻለ ዋጋ የሚሸጡ ገበሬዎች ድርሻ።",
    "ምሳሌ፡ የ3D የእርሻ እይታ፣ ጥቂት ተጠቃሚዎች ስለሚፈልጉትና አሥር ሳምንታት ስለሚያስወጣ፤ ቃለ መጠይቆች ፍላጎት ካሳዩ ሊመለስ ይችላል።"
   ]
  }
 }
];
