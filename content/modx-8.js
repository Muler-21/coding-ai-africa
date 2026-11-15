/* Level 8 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[8] = [
 {
  "why": {
   "en": "Agents will do more of our work; knowing where to trust them is a new core skill.",
   "am": "agents ብዙ ሥራችንን ያከናውናሉ፤ የት ልናምናቸው እንደምንችል ማወቅ አዲስ ዋና ክህሎት ነው።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Map your weekly tasks",
     "am": "የሳምንት ተግባራትህን ካርታ ሥራ"
    },
    "cols": [
     {
      "h": {
       "en": "Give to an agent",
       "am": "ለagent ስጥ"
      },
      "items": {
       "en": [
        "first drafts, data cleaning, literature search",
        "routine code with tests"
       ],
       "am": [
        "የመጀመሪያ ረቂቆች፣ የዳታ ማጽዳት፣ የሥነ-ጽሑፍ ፍለጋ",
        "ከፈተናዎች ጋር ያለ መደበኛ ኮድ"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Keep for people",
       "am": "ለሰዎች አቆይ"
      },
      "items": {
       "en": [
        "final decisions, approvals, payments",
        "talking with farmers and partners, ethics"
       ],
       "am": [
        "የመጨረሻ ውሳኔዎች፣ ማጽደቆች፣ ክፍያዎች",
        "ከገበሬዎችና ከአጋሮች ጋር መነጋገር፣ ሥነ-ምግባር"
       ]
      },
      "tone": "bad"
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "How agents fail and how you notice",
     "am": "agents እንዴት እንደሚወድቁና እንዴት እንደምታስተውል"
    },
    "nodes": [
     {
      "t": {
       "en": "Loops",
       "am": "ዑደቶች"
      },
      "s": {
       "en": "same step again and again",
       "am": "ያው እርምጃ ደጋግሞ"
      }
     },
     {
      "t": {
       "en": "Wrong tool",
       "am": "የተሳሳተ መሣሪያ"
      }
     },
     {
      "t": {
       "en": "Made-up facts",
       "am": "የተፈጠሩ እውነታዎች"
      }
     },
     {
      "t": {
       "en": "Checks: logs, tests, spot review",
       "am": "ፍተሻዎች፡ መዝገቦች፣ ፈተናዎች፣ ናሙና ግምገማ"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "hours_saved_per_week = 6           # measured during a 4-week pilot\nhourly_value = 250                 # birr per hour of staff time\nreview_hours_per_week = 1.5        # people checking the agent's work\nsubscription_per_month = 2500      # birr\nweeks = 4\nvalue = (hours_saved_per_week - review_hours_per_week) * hourly_value * weeks\ncost = subscription_per_month\nprint(f\"pilot value {value:,.0f} birr vs cost {cost:,.0f} birr -> net {value - cost:+,.0f} birr per month\")",
   "out": "pilot value 4,500 birr vs cost 2,500 birr -> net +2,000 birr per month",
   "title": {
    "en": "Did the agent pilot pay?",
    "am": "የagent ሙከራው አዋጣ?"
   },
   "note": {
    "en": "Count the review time honestly: an agent that saves 6 hours but needs 6 hours of checking saves nothing.",
    "am": "የግምገማ ጊዜውን በታማኝነት ቁጠር፡ 6 ሰዓት የሚያድን ግን 6 ሰዓት ፍተሻ የሚፈልግ agent ምንም አያድንም።"
   }
  },
  "qa": {
   "en": [
    "Decisions with legal, financial or ethical weight, anything irreversible, and work that depends on trust and relationships.",
    "Check its logs and outputs against tests or known answers, review a random sample every week, and set alerts for unusual actions or costs.",
    "In the example the pilot saved about 4.5 hours a week after review time, worth more than its monthly cost; measure yours the same way."
   ],
   "am": [
    "ሕጋዊ፣ ገንዘባዊ ወይም ሥነ-ምግባራዊ ክብደት ያላቸው ውሳኔዎች፣ የማይቀለበስ ማንኛውም ነገር፣ እና በእምነትና በግንኙነት ላይ የሚመሠረት ሥራ።",
    "መዝገቦቹንና ውጤቶቹን ከፈተናዎች ወይም ከሚታወቁ መልሶች ጋር ፈትሽ፣ በየሳምንቱ የዘፈቀደ ናሙና ገምግም፣ ለያልተለመዱ ተግባራት ወይም ወጪዎች ማንቂያዎችን አዘጋጅ።",
    "በምሳሌው ሙከራው ከግምገማ ጊዜ በኋላ በሳምንት ወደ 4.5 ሰዓት አድኗል፣ ከወርሃዊ ወጪው በላይ ዋጋ አለው፤ የአንተንም በተመሳሳይ መንገድ ለካ።"
   ]
  }
 },
 {
  "why": {
   "en": "AI is speeding up discovery in biology, chemistry and climate; the winners own good data and good questions.",
   "am": "AI በባዮሎጂ፣ በኬሚስትሪና በአየር ንብረት ግኝትን እያፋጠነ ነው፤ አሸናፊዎቹ ጥሩ ዳታና ጥሩ ጥያቄዎች ያላቸው ናቸው።"
  },
  "dg": [
   {
    "type": "cycle",
    "title": {
     "en": "A self-driving lab",
     "am": "ራሱን የሚያስኬድ ላብራቶሪ"
    },
    "nodes": [
     {
      "t": {
       "en": "AI proposes an experiment",
       "am": "AI ሙከራ ያቀርባል"
      }
     },
     {
      "t": {
       "en": "Robot runs it",
       "am": "ሮቦት ያካሂደዋል"
      }
     },
     {
      "t": {
       "en": "Instruments measure",
       "am": "መሣሪያዎች ይለካሉ"
      }
     },
     {
      "t": {
       "en": "Model updates",
       "am": "ሞዴሉ ይዘመናል"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Is this AI discovery believable?",
     "am": "ይህ የAI ግኝት ተአማኒ ነው?"
    },
    "cols": [
     {
      "h": {
       "en": "Doubt it",
       "am": "ተጠራጠረው"
      },
      "items": {
       "en": [
        "only computer predictions",
        "no comparison with a simple baseline",
        "code and data not shared"
       ],
       "am": [
        "የኮምፒውተር ትንበያዎች ብቻ",
        "ከቀላል baseline ጋር ንጽጽር የለም",
        "ኮድና ዳታ አልተጋሩም"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Trust grows",
       "am": "እምነት ያድጋል"
      },
      "items": {
       "en": [
        "confirmed in the lab or field",
        "beats strong baselines on held-out data",
        "independent replication"
       ],
       "am": [
        "በላብራቶሪ ወይም በመስክ የተረጋገጠ",
        "በተለየ ዳታ ላይ ጠንካራ baselinesን ያሸንፋል",
        "ገለልተኛ ድግግሞሽ"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Workshop: where could AI make your field 10× faster?",
    "am": "ዎርክሾፕ፡ AI መስክህን የት 10× ሊያፋጥን ይችላል?"
   },
   "steps": {
    "en": [
     "List the steps of one research project from idea to paper and write how many weeks each takes.",
     "Circle the slowest step.",
     "Ask: is it slow because of data collection, analysis, waiting for experiments, or writing?",
     "Find one AI tool or model that targets that step (for example a protein model, a weather model, an analysis agent).",
     "Name the data you hold that others do not: local breeds, field trials, local-language records.",
     "Design a two-week test that measures the time saved."
    ],
    "am": [
     "የአንድ የምርምር ፕሮጀክት እርምጃዎችን ከሐሳብ እስከ ጽሑፍ ዘርዝርና እያንዳንዱ ስንት ሳምንት እንደሚወስድ ጻፍ።",
     "በጣም ቀርፋፋውን እርምጃ አክብብ።",
     "ጠይቅ፡ ቀርፋፋ የሆነው በዳታ መሰብሰብ፣ በትንተና፣ ሙከራዎችን በመጠበቅ ወይም በመጻፍ ነው?",
     "ያንን እርምጃ ዒላማ የሚያደርግ አንድ የAI መሣሪያ ወይም ሞዴል ፈልግ (ለምሳሌ የፕሮቲን ሞዴል፣ የአየር ሁኔታ ሞዴል፣ የትንተና agent)።",
     "ሌሎች የሌላቸውን ያንተን ዳታ ጥቀስ፡ የአካባቢ ዝርያዎች፣ የመስክ ሙከራዎች፣ በአካባቢ ቋንቋ ያሉ መዝገቦች።",
     "የተቆጠበውን ጊዜ የሚለካ የሁለት ሳምንት ፈተና ንደፍ።"
    ]
   }
  },
  "qa": {
   "en": [
    "Experimental confirmation, strong baselines on held-out data, shared code and data, and independent replication.",
    "Answer for your own project; for many field scientists it is data collection or waiting for the next season.",
    "Local data such as indigenous breeds, multi-year field trials, farmer records and local-language text; these make your AI work unique."
   ],
   "am": [
    "የሙከራ ማረጋገጫ፣ በተለየ ዳታ ላይ ጠንካራ baselines፣ የተጋሩ ኮድና ዳታ፣ እንዲሁም ገለልተኛ ድግግሞሽ።",
    "ለራስህ ፕሮጀክት መልስ፤ ለብዙ የመስክ ሳይንቲስቶች የዳታ መሰብሰብ ወይም የሚቀጥለውን ወቅት መጠበቅ ነው።",
    "እንደ ሀገር በቀል ዝርያዎች፣ የብዙ ዓመታት የመስክ ሙከራዎች፣ የገበሬ መዝገቦችና በአካባቢ ቋንቋ ያሉ ጽሑፎች ያሉ የአካባቢ ዳታ፤ እነዚህ የAI ሥራህን ልዩ ያደርጉታል።"
   ]
  }
 },
 {
  "why": {
   "en": "AI can raise smallholder income only if it reaches them by channels they already use, in their language.",
   "am": "AI የአነስተኛ ገበሬዎችን ገቢ ማሳደግ የሚችለው አስቀድመው በሚጠቀሙባቸው መንገዶች፣ በቋንቋቸው ሲደርሳቸው ብቻ ነው።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "An advisory service that works on any phone",
     "am": "በማንኛውም ስልክ የሚሠራ የምክር አገልግሎት"
    },
    "nodes": [
     {
      "t": {
       "en": "Farmer",
       "am": "ገበሬ"
      },
      "s": {
       "en": "basic phone",
       "am": "መሠረታዊ ስልክ"
      }
     },
     {
      "t": {
       "en": "SMS / USSD / voice in Amharic",
       "am": "SMS / USSD / ድምፅ በአማርኛ"
      }
     },
     {
      "t": {
       "en": "AI + local data",
       "am": "AI + የአካባቢ ዳታ"
      },
      "s": {
       "en": "weather, prices, crop calendar",
       "am": "የአየር ሁኔታ፣ ዋጋዎች፣ የሰብል ቀን መቁጠሪያ"
      }
     },
     {
      "t": {
       "en": "Short, timely advice",
       "am": "አጭርና ወቅታዊ ምክር"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "stack",
    "title": {
     "en": "Data that feed AI-assisted breeding",
     "am": "በAI ለሚታገዝ የዝርያ ማሻሻያ የሚውል ዳታ"
    },
    "layers": [
     {
      "t": {
       "en": "Genotypes",
       "am": "Genotypes"
      },
      "s": {
       "en": "SNP chips, sequencing",
       "am": "SNP chips፣ sequencing"
      }
     },
     {
      "t": {
       "en": "Phenotypes",
       "am": "Phenotypes"
      },
      "s": {
       "en": "trials, drones, farmer records",
       "am": "ሙከራዎች፣ ድሮኖች፣ የገበሬ መዝገቦች"
      }
     },
     {
      "t": {
       "en": "Environment",
       "am": "አካባቢ"
      },
      "s": {
       "en": "climate, soil",
       "am": "የአየር ንብረት፣ አፈር"
      }
     },
     {
      "t": {
       "en": "Genomic prediction",
       "am": "ጂኖሚክ ትንበያ"
      },
      "s": {
       "en": "pick climate-resilient parents",
       "am": "የአየር ንብረትን የሚቋቋሙ ወላጆችን ምረጥ"
      }
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "farmers = 20000\nprice_per_season = 60          # birr per farmer per season (via cooperative or mobile money)\nuptake = 0.35                  # share who pay\nseasons = 2\nsms_cost = 0.35 * 30           # birr: 30 SMS per farmer per season\nfixed = 450000                 # staff, servers, data per year\nrevenue = farmers * uptake * price_per_season * seasons\nvariable = farmers * uptake * sms_cost * seasons\nprint(f\"revenue {revenue:,.0f} birr, SMS {variable:,.0f}, fixed {fixed:,.0f} -> profit {revenue - variable - fixed:+,.0f} birr/year\")\nbreak_even = fixed / ((price_per_season - sms_cost) * seasons)\nprint(f\"break-even: {break_even:,.0f} paying farmers\")",
   "out": "revenue 840,000 birr, SMS 147,000, fixed 450,000 -> profit +243,000 birr/year\nbreak-even: 4,545 paying farmers",
   "title": {
    "en": "Can an SMS advisory service pay for itself?",
    "am": "የSMS የምክር አገልግሎት ራሱን ሊችል ይችላል?"
   },
   "note": {
    "en": "The prices and costs here are illustrative assumptions; replace them with numbers from your own pilot.",
    "am": "እዚህ ያሉት ዋጋዎችና ወጪዎች ለማሳያ የተገመቱ ናቸው፤ ከራስህ ሙከራ በተገኙ ቁጥሮች ተካቸው።"
   }
  },
  "qa": {
   "en": [
    "Timely, trusted, local advice and market information that raises income or cuts losses, delivered simply and cheaply.",
    "SMS, USSD menus and voice calls (IVR) in local languages, plus extension agents and radio.",
    "Through small fees via cooperatives or mobile money, input companies or buyers who benefit, insurers, or government and donor contracts; check the break-even number."
   ],
   "am": [
    "ገቢን የሚያሳድግ ወይም ኪሳራን የሚቀንስ ወቅታዊ፣ ታማኝ፣ የአካባቢ ምክርና የገበያ መረጃ፣ በቀላልና በርካሽ የሚደርስ።",
    "SMS፣ USSD ምናሌዎችና የድምፅ ጥሪዎች (IVR) በአካባቢ ቋንቋዎች፣ ከኤክስቴንሽን ሠራተኞችና ከሬዲዮ ጋር።",
    "በማኅበራት ወይም በሞባይል ገንዘብ በሚከፈሉ ትናንሽ ክፍያዎች፣ በሚጠቀሙ የግብዓት ኩባንያዎች ወይም ገዢዎች፣ በመድን ድርጅቶች፣ ወይም በመንግሥትና በለጋሾች ውሎች፤ የbreak-even ቁጥሩን ፈትሽ።"
   ]
  }
 },
 {
  "why": {
   "en": "Robots that learn from data could take on dull, dirty and dangerous farm and lab work.",
   "am": "ከዳታ የሚማሩ ሮቦቶች አሰልቺ፣ ቆሻሻና አደገኛ የእርሻና የላብራቶሪ ሥራዎችን ሊወስዱ ይችላሉ።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Simulation vs the real field",
     "am": "ሲሙሌሽን vs እውነተኛው ማሳ"
    },
    "cols": [
     {
      "h": {
       "en": "Simulation",
       "am": "ሲሙሌሽን"
      },
      "items": {
       "en": [
        "perfect light, flat ground",
        "unlimited free practice"
       ],
       "am": [
        "ፍጹም ብርሃን፣ ጠፍጣፋ መሬት",
        "ያልተገደበ ነጻ ልምምድ"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Real field",
       "am": "እውነተኛ ማሳ"
      },
      "items": {
       "en": [
        "dust, mud, shadows, wind",
        "every weed looks different",
        "breakage costs money"
       ],
       "am": [
        "አቧራ፣ ጭቃ፣ ጥላዎች፣ ነፋስ",
        "እያንዳንዱ አረም የተለየ ይመስላል",
        "መሰበር ገንዘብ ያስወጣል"
       ]
      },
      "tone": "bad"
     }
    ],
    "verdict": {
     "en": "Bridge the gap with domain randomisation (vary everything in simulation) and real-world fine-tuning.",
     "am": "ክፍተቱን በdomain randomisation (በሲሙሌሽን ሁሉንም ነገር ቀያይር) እና በእውነተኛ ዓለም fine-tuning አጥብብ።"
    }
   },
   {
    "type": "stack",
    "title": {
     "en": "A low-cost weeding robot",
     "am": "ርካሽ የአረም ማረሚያ ሮቦት"
    },
    "layers": [
     {
      "t": {
       "en": "Brain: phone or small board + camera",
       "am": "አንጎል፡ ስልክ ወይም ትንሽ ቦርድ + ካሜራ"
      }
     },
     {
      "t": {
       "en": "Vision model: weed vs crop",
       "am": "የምስል ሞዴል፡ አረም vs ሰብል"
      }
     },
     {
      "t": {
       "en": "Frame, wheels, tool",
       "am": "ፍሬም፣ ጎማዎች፣ መሣሪያ"
      },
      "s": {
       "en": "made locally from steel and bicycle parts",
       "am": "ከብረትና ከብስክሌት ክፍሎች በአካባቢው የተሠራ"
      }
     },
     {
      "t": {
       "en": "Solar battery",
       "am": "የፀሐይ ባትሪ"
      }
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Workshop: a robot for one local job",
    "am": "ዎርክሾፕ፡ ለአንድ የአካባቢ ሥራ ሮቦት"
   },
   "steps": {
    "en": [
     "Pick one job that is dull, dirty or dangerous: weeding, sorting coffee beans, cleaning barns, pipetting.",
     "Write what the robot must sense, decide and do, step by step.",
     "Choose the cheapest sensors that work (a phone camera often does).",
     "List parts that can be made by local workshops and parts that must be bought.",
     "Build a cardboard or wooden mock-up and test the movement by hand.",
     "Estimate cost per hour compared with a person, and who would own and maintain it."
    ],
    "am": [
     "አሰልቺ፣ ቆሻሻ ወይም አደገኛ የሆነ አንድ ሥራ ምረጥ፡ አረም ማረም፣ የቡና ፍሬ መለየት፣ በረት ማጽዳት፣ pipetting።",
     "ሮቦቱ ምን መሰማት፣ መወሰንና ማድረግ እንዳለበት እርምጃ በእርምጃ ጻፍ።",
     "የሚሠሩትን በጣም ርካሽ ሴንሰሮች ምረጥ (ብዙውን ጊዜ የስልክ ካሜራ ይበቃል)።",
     "በአካባቢ ዎርክሾፖች ሊሠሩ የሚችሉ ክፍሎችንና መገዛት ያለባቸውን ክፍሎች ዘርዝር።",
     "የካርቶን ወይም የእንጨት ሞዴል ገንባና እንቅስቃሴውን በእጅ ፈትሽ።",
     "በሰዓት ወጪውን ከሰው ጋር አወዳድረህ ገምት፣ ማን እንደሚይዘውና እንደሚጠግነውም ጻፍ።"
    ]
   }
  },
  "qa": {
   "en": [
    "Real sensors are noisy, light and terrain change, objects vary and mistakes break things; simulations simplify all of this.",
    "Answer for your area; common examples are weeding, sorting grain or coffee, cleaning barns and repetitive lab pipetting.",
    "Frames, wheels, mounts and tools from local metal and wood workshops; electronics and motors are usually bought."
   ],
   "am": [
    "እውነተኛ ሴንሰሮች ጫጫታ አላቸው፣ ብርሃንና መሬት ይለወጣሉ፣ ነገሮች ይለያያሉ፣ ስህተቶችም ነገሮችን ይሰብራሉ፤ ሲሙሌሽኖች ይህን ሁሉ ያቀላሉ።",
    "ለአካባቢህ መልስ፤ የተለመዱ ምሳሌዎች አረም ማረም፣ እህል ወይም ቡና መለየት፣ በረት ማጽዳትና ተደጋጋሚ የላብራቶሪ pipetting ናቸው።",
    "ፍሬሞች፣ ጎማዎች፣ መያዣዎችና መሣሪያዎች ከአካባቢ የብረትና የእንጨት ዎርክሾፖች፤ ኤሌክትሮኒክስና ሞተሮች ብዙውን ጊዜ ይገዛሉ።"
   ]
  }
 },
 {
  "why": {
   "en": "New kinds of computing and energy-efficient AI decide who can afford to use AI.",
   "am": "አዳዲስ የኮምፒውቲንግ ዓይነቶችና ኃይል ቆጣቢ AI AIን ማን ሊጠቀምበት እንደሚችል ይወስናሉ።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Bit vs qubit",
     "am": "Bit vs qubit"
    },
    "cols": [
     {
      "h": {
       "en": "Bit",
       "am": "Bit"
      },
      "items": {
       "en": [
        "0 or 1"
       ],
       "am": [
        "0 ወይም 1"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Qubit",
       "am": "Qubit"
      },
      "items": {
       "en": [
        "a superposition a|0⟩ + b|1⟩",
        "measuring gives 0 or 1 with probabilities |a|², |b|²",
        "useful for some problems: chemistry simulation, certain searches"
       ],
       "am": [
        "superposition a|0⟩ + b|1⟩",
        "መለካት 0 ወይም 1ን በ|a|²፣ |b|² ፕሮባቢሊቲዎች ይሰጣል",
        "ለአንዳንድ ችግሮች ጠቃሚ፡ የኬሚስትሪ ሲሙሌሽን፣ የተወሰኑ ፍለጋዎች"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Hype or progress?",
     "am": "ሆይታ ወይስ እድገት?"
    },
    "cols": [
     {
      "h": {
       "en": "Hype",
       "am": "ሆይታ"
      },
      "items": {
       "en": [
        "\"will solve everything\"",
        "no benchmark against the best classical method"
       ],
       "am": [
        "«ሁሉንም ይፈታል»",
        "ከምርጡ ክላሲካል ዘዴ ጋር benchmark የለም"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Progress",
       "am": "እድገት"
      },
      "items": {
       "en": [
        "a clear task, measured speed-up",
        "independent results, error rates reported"
       ],
       "am": [
        "ግልጽ ተግባር፣ የተለካ ፍጥነት",
        "ገለልተኛ ውጤቶች፣ የስህተት መጠኖች ሪፖርት የተደረጉ"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import numpy as np\nrng = np.random.default_rng(7)\nH = np.array([[1, 1], [1, -1]]) / np.sqrt(2)          # Hadamard gate\nstate = H @ np.array([1, 0])                             # |0> -> equal superposition\nprobs = np.abs(state) ** 2\nshots = rng.choice([0, 1], size=1000, p=probs)\nprint(\"amplitudes:\", state.round(3), \"| measured 1000 times:\", np.bincount(shots))\nprint(\"H applied twice returns |0>:\", (H @ H @ np.array([1, 0])).round(3) + 0.0)\n\nwatts, hours = 15, 8                                     # a small edge device running a local model\nprint(f\"edge AI box: {watts * hours / 1000:.2f} kWh per day -> a 100 W solar panel (about 0.5 kWh/day) is enough\")",
   "out": "amplitudes: [0.707 0.707] | measured 1000 times: [502 498]\nH applied twice returns |0>: [1. 0.]\nedge AI box: 0.12 kWh per day -> a 100 W solar panel (about 0.5 kWh/day) is enough",
   "title": {
    "en": "A qubit in a few lines, and an energy budget for edge AI",
    "am": "qubit በጥቂት መስመሮች፣ እና ለedge AI የኃይል በጀት"
   },
   "note": {
    "en": "This simulates a qubit on an ordinary computer; real quantum hardware is noisy and still small.",
    "am": "ይህ በተራ ኮምፒውተር ላይ qubitን ያስመስላል፤ እውነተኛ የquantum hardware ጫጫታ ያለውና አሁንም ትንሽ ነው።"
   }
  },
  "qa": {
   "en": [
    "Problems with special structure, such as simulating molecules and materials, factoring, and some optimisation and search problems; not everyday computing.",
    "Electricity is costly and unreliable in many places; efficient models on solar-powered edge devices make AI affordable and available offline.",
    "Ask for a clear task, comparison with the best classical method, independent results and reported error rates; be wary of broad promises."
   ],
   "am": [
    "ልዩ መዋቅር ያላቸው ችግሮች፣ እንደ ሞለኪውሎችንና ቁሳቁሶችን ማስመሰል፣ factoring፣ እና አንዳንድ የoptimisation እና የፍለጋ ችግሮች፤ የዕለት ተዕለት ኮምፒውቲንግ አይደለም።",
    "በብዙ ቦታዎች ኤሌክትሪክ ውድና አስተማማኝ አይደለም፤ በፀሐይ በሚሠሩ edge መሣሪያዎች ላይ ያሉ ቀልጣፋ ሞዴሎች AIን ተመጣጣኝና ያለ ኢንተርኔት ተደራሽ ያደርጋሉ።",
    "ግልጽ ተግባር፣ ከምርጡ ክላሲካል ዘዴ ጋር ንጽጽር፣ ገለልተኛ ውጤቶችና ሪፖርት የተደረጉ የስህተት መጠኖችን ጠይቅ፤ ሰፊ ቃሎችን ተጠንቀቅ።"
   ]
  }
 },
 {
  "why": {
   "en": "Rules on data and AI decide whether African data create African value and protect people.",
   "am": "በዳታና በAI ላይ ያሉ ሕጎች የአፍሪካ ዳታ የአፍሪካ እሴት እንደሚፈጥርና ሰዎችን እንደሚጠብቅ ይወስናሉ።"
  },
  "dg": [
   {
    "type": "stack",
    "title": {
     "en": "Layers of AI governance",
     "am": "የAI አስተዳደር ንብርብሮች"
    },
    "layers": [
     {
      "t": {
       "en": "International",
       "am": "ዓለም አቀፍ"
      },
      "s": {
       "en": "UN, standards bodies",
       "am": "የተ.መ.ድ.፣ የደረጃ አካላት"
      }
     },
     {
      "t": {
       "en": "African Union",
       "am": "የአፍሪካ ኅብረት"
      },
      "s": {
       "en": "continental AI strategy, data policy framework",
       "am": "አህጉራዊ የAI ስትራቴጂ፣ የዳታ ፖሊሲ ማዕቀፍ"
      }
     },
     {
      "t": {
       "en": "National",
       "am": "ብሔራዊ"
      },
      "s": {
       "en": "data protection law, sector rules",
       "am": "የዳታ ጥበቃ ሕግ፣ የዘርፍ ሕጎች"
      }
     },
     {
      "t": {
       "en": "Organisation",
       "am": "ድርጅት"
      },
      "s": {
       "en": "consent, data agreements, audits",
       "am": "ስምምነት፣ የዳታ ውሎች፣ ኦዲቶች"
      }
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "A fair farmer-data agreement",
     "am": "ፍትሐዊ የገበሬ ዳታ ስምምነት"
    },
    "nodes": [
     {
      "t": {
       "en": "Informed consent",
       "am": "የተረዳ ስምምነት"
      },
      "s": {
       "en": "in the farmer’s language",
       "am": "በገበሬው ቋንቋ"
      }
     },
     {
      "t": {
       "en": "Clear use",
       "am": "ግልጽ አጠቃቀም"
      }
     },
     {
      "t": {
       "en": "Benefit sharing",
       "am": "የጥቅም መጋራት"
      },
      "s": {
       "en": "better advice, payment or ownership",
       "am": "የተሻለ ምክር፣ ክፍያ ወይም ባለቤትነት"
      }
     },
     {
      "t": {
       "en": "Right to withdraw",
       "am": "የመውጣት መብት"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Write a one-page policy brief",
    "am": "የአንድ ገጽ የፖሊሲ ማጠቃለያ ጻፍ"
   },
   "steps": {
    "en": [
     "Title: one problem, for example \"Farmer data collected by apps\".",
     "Why it matters now: two facts with sources.",
     "Options: list two or three policy options with costs and risks.",
     "Recommendation: one clear rule, for example \"apps must share aggregate insights back with the cooperatives that supplied the data\".",
     "Who acts and by when.",
     "Ask a lawyer or policy expert to review it."
    ],
    "am": [
     "ርዕስ፡ አንድ ችግር፣ ለምሳሌ «በመተግበሪያዎች የሚሰበሰብ የገበሬ ዳታ»።",
     "ለምን አሁን አስፈላጊ ነው፡ ከምንጮች ጋር ሁለት እውነታዎች።",
     "አማራጮች፡ ሁለት ወይም ሦስት የፖሊሲ አማራጮችን ከወጪዎችና ከአደጋዎች ጋር ዘርዝር።",
     "ምክረ ሐሳብ፡ አንድ ግልጽ ሕግ፣ ለምሳሌ «መተግበሪያዎች አጠቃላይ ግንዛቤዎችን ዳታውን ላቀረቡት ማኅበራት መልሰው ማጋራት አለባቸው»።",
     "ማን እንደሚሠራና እስከ መቼ።",
     "ሕግ ባለሙያ ወይም የፖሊሲ ባለሙያ እንዲገመግመው ጠይቅ።"
    ]
   }
  },
  "qa": {
   "en": [
    "Legally it depends on the country’s data protection law and the agreement signed; ethically farmers should keep rights over data about them, with consent and a fair share of the benefits.",
    "Fake audio or video in local languages can spread false health or market information, damage reputations, and fuel conflict, and fewer fact-checkers work in those languages.",
    "Your own answer, for example \"public AI systems must be tested in the main national languages before deployment\"."
   ],
   "am": [
    "በሕግ በአገሪቱ የዳታ ጥበቃ ሕግና በተፈረመው ስምምነት ላይ ይወሰናል፤ በሥነ-ምግባር ገበሬዎች ስለእነሱ ባለው ዳታ ላይ መብታቸውን፣ ከስምምነትና ከፍትሐዊ የጥቅም ድርሻ ጋር ማቆየት አለባቸው።",
    "በአካባቢ ቋንቋዎች ያሉ የሐሰት ድምፅ ወይም ቪዲዮ የሐሰት የጤና ወይም የገበያ መረጃን ሊያሰራጩ፣ ስምን ሊያጎድፉና ግጭትን ሊያባብሱ ይችላሉ፤ በእነዚያ ቋንቋዎች የሚሠሩ እውነታ አረጋጋጮችም ጥቂት ናቸው።",
    "የራስህ መልስ፣ ለምሳሌ «ሕዝባዊ የAI ሥርዓቶች ከመሰማራታቸው በፊት በዋና ዋና ብሔራዊ ቋንቋዎች መፈተን አለባቸው»።"
   ]
  }
 },
 {
  "why": {
   "en": "The best results come from people and AI working together, each doing what they do best.",
   "am": "ምርጥ ውጤቶች ሰዎችና AI አብረው ሲሠሩ፣ እያንዳንዳቸው በጣም የሚችሉትን ሲያደርጉ ይመጣሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Checking an AI answer",
     "am": "የAI መልስን መፈተሽ"
    },
    "nodes": [
     {
      "t": {
       "en": "Ask for sources",
       "am": "ምንጮችን ጠይቅ"
      }
     },
     {
      "t": {
       "en": "Open and read them",
       "am": "ክፈታቸውና አንብባቸው"
      }
     },
     {
      "t": {
       "en": "Test it",
       "am": "ፈትሸው"
      },
      "s": {
       "en": "run the code, redo the sum, try in the field",
       "am": "ኮዱን አስኪድ፣ ሒሳቡን እንደገና ሥራ፣ በመስክ ሞክር"
      }
     },
     {
      "t": {
       "en": "Ask an expert if it matters",
       "am": "አስፈላጊ ከሆነ ባለሙያ ጠይቅ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Skills that grow in value",
     "am": "ዋጋቸው የሚያድግ ክህሎቶች"
    },
    "cols": [
     {
      "h": {
       "en": "Practise without AI too",
       "am": "ያለ AIም ተለማመድ"
      },
      "items": {
       "en": [
        "reading carefully, mental maths",
        "writing your own argument",
        "judging quality and evidence"
       ],
       "am": [
        "በጥንቃቄ ማንበብ፣ የአእምሮ ሒሳብ",
        "የራስህን ሙግት መጻፍ",
        "ጥራትንና ማስረጃን መዳኘት"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Do with AI",
       "am": "ከAI ጋር አድርግ"
      },
      "items": {
       "en": [
        "first drafts, translation drafts",
        "boilerplate code, summaries to check"
       ],
       "am": [
        "የመጀመሪያ ረቂቆች፣ የትርጉም ረቂቆች",
        "መደበኛ ኮድ፣ የሚፈተሹ ማጠቃለያዎች"
       ]
      },
      "tone": ""
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "A 10-minute AI-answer check",
    "am": "የ10 ደቂቃ የAI መልስ ፍተሻ"
   },
   "steps": {
    "en": [
     "Ask the AI a question from your field and save its answer.",
     "Underline every fact, number and name in the answer.",
     "For each, find a reliable source (textbook, journal, official site) and mark ✓ or ✕.",
     "Run any code or redo any calculation yourself.",
     "Write one sentence: what was right, what was wrong, and what you will always check next time."
    ],
    "am": [
     "ከመስክህ AIን ጥያቄ ጠይቀውና መልሱን አስቀምጥ።",
     "በመልሱ ውስጥ ያለውን እያንዳንዱን እውነታ፣ ቁጥርና ስም አስምር።",
     "ለእያንዳንዱ አስተማማኝ ምንጭ (የመማሪያ መጽሐፍ፣ ጆርናል፣ ይፋዊ ድረ ገጽ) ፈልግና ✓ ወይም ✕ አድርግ።",
     "ማንኛውንም ኮድ አስኪድ ወይም ማንኛውንም ስሌት ራስህ እንደገና ሥራ።",
     "አንድ ዓረፍተ ነገር ጻፍ፡ ምን ትክክል ነበር፣ ምን ስህተት ነበር፣ በሚቀጥለው ጊዜ ሁልጊዜ ምን ትፈትሻለህ።"
    ]
   }
  },
  "qa": {
   "en": [
    "Core skills you must judge AI with: careful reading, writing your own reasoning, basic maths and knowledge of your field.",
    "Check sources, test code and numbers yourself, compare with trusted references, and ask an expert when the stakes are high.",
    "Usually jobs with routine text, data entry and simple customer questions change first; jobs needing trust, hands-on skill and judgement change more slowly."
   ],
   "am": [
    "AIን የምትዳኝባቸው ዋና ክህሎቶች፡ በጥንቃቄ ማንበብ፣ የራስህን አመክንዮ መጻፍ፣ መሠረታዊ ሒሳብና የመስክህ ዕውቀት።",
    "ምንጮችን ፈትሽ፣ ኮድንና ቁጥሮችን ራስህ ፈትሽ፣ ከታመኑ ማጣቀሻዎች ጋር አወዳድር፣ ጉዳዩ ከባድ ሲሆን ባለሙያ ጠይቅ።",
    "ብዙውን ጊዜ መደበኛ ጽሑፍ፣ የዳታ ማስገባትና ቀላል የደንበኛ ጥያቄዎች ያላቸው ሥራዎች መጀመሪያ ይለወጣሉ፤ እምነት፣ የእጅ ክህሎትና ፍርድ የሚፈልጉ ሥራዎች ቀስ ብለው ይለወጣሉ።"
   ]
  }
 },
 {
  "why": {
   "en": "A profitable AI company starts from a painful problem and a customer who pays, not from the model.",
   "am": "ትርፋማ የAI ኩባንያ ከሞዴሉ ሳይሆን ከሚያሳምም ችግርና ከሚከፍል ደንበኛ ይጀምራል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "From problem to company",
     "am": "ከችግር ወደ ኩባንያ"
    },
    "nodes": [
     {
      "t": {
       "en": "Talk to 20 customers",
       "am": "ከ20 ደንበኞች ጋር ተነጋገር"
      }
     },
     {
      "t": {
       "en": "One painful problem",
       "am": "አንድ የሚያሳምም ችግር"
      }
     },
     {
      "t": {
       "en": "Lean product",
       "am": "ቀላል ምርት"
      },
      "s": {
       "en": "open model + small local data",
       "am": "ክፍት ሞዴል + ትንሽ የአካባቢ ዳታ"
      }
     },
     {
      "t": {
       "en": "First 100 paying users",
       "am": "የመጀመሪያዎቹ 100 የሚከፍሉ ተጠቃሚዎች"
      }
     },
     {
      "t": {
       "en": "Funding to grow",
       "am": "ለማደግ የገንዘብ ድጋፍ"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Your edge over a free chatbot",
     "am": "ከነጻ chatbot በላይ ያንተ ጥቅም"
    },
    "cols": [
     {
      "h": {
       "en": "Free chatbot",
       "am": "ነጻ chatbot"
      },
      "items": {
       "en": [
        "general answers",
        "no local data, no integration"
       ],
       "am": [
        "አጠቃላይ መልሶች",
        "የአካባቢ ዳታ የለም፣ ውህደት የለም"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Your product",
       "am": "ምርትህ"
      },
      "items": {
       "en": [
        "local prices, soils, breeds, language",
        "works by SMS, connects to payment and inputs",
        "trusted partners and support"
       ],
       "am": [
        "የአካባቢ ዋጋዎች፣ አፈሮች፣ ዝርያዎች፣ ቋንቋ",
        "በSMS ይሠራል፣ ከክፍያና ከግብዓቶች ጋር ይገናኛል",
        "የታመኑ አጋሮችና ድጋፍ"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "price_per_month = 150        # birr per cooperative member\ngross_margin = 0.75          # after SMS, cloud and support costs\nmonths_retained = 18         # average customer life\ncac = 600                    # cost to acquire one paying member (field agents, demos)\nltv = price_per_month * gross_margin * months_retained\nprint(f\"lifetime value {ltv:,.0f} birr vs acquisition cost {cac:,.0f} birr -> LTV/CAC = {ltv / cac:.1f}\")\nprint(f\"payback: {cac / (price_per_month * gross_margin):.1f} months\")\nprint(\"rule of thumb: LTV/CAC above 3 and payback under 12 months make a healthy business\")",
   "out": "lifetime value 2,025 birr vs acquisition cost 600 birr -> LTV/CAC = 3.4\npayback: 5.3 months\nrule of thumb: LTV/CAC above 3 and payback under 12 months make a healthy business",
   "title": {
    "en": "Unit economics: will each customer make money?",
    "am": "Unit economics፡ እያንዳንዱ ደንበኛ ትርፍ ያስገኛል?"
   },
   "note": {
    "en": "All numbers are assumptions to replace with your own measurements after talking to customers.",
    "am": "ሁሉም ቁጥሮች ከደንበኞች ጋር ከተነጋገርክ በኋላ በራስህ ልኬቶች የምትተካቸው ግምቶች ናቸው።"
   }
  },
  "qa": {
   "en": [
    "Name the buyer (farmer, cooperative, company, government) and the price they agreed to in interviews or a pilot, not a guess.",
    "Use local data, language, delivery channels and integrations (payments, inputs, extension) that a general chatbot does not have.",
    "Through partners who already reach them: cooperatives, unions, input dealers, extension agents; offer a free pilot and convert satisfied users."
   ],
   "am": [
    "ገዢውን (ገበሬ፣ ማኅበር፣ ኩባንያ፣ መንግሥት) እና በቃለ መጠይቆች ወይም በሙከራ የተስማሙበትን ዋጋ ጥቀስ፤ ግምት አይደለም።",
    "አጠቃላይ chatbot የሌለውን የአካባቢ ዳታ፣ ቋንቋ፣ የአቅርቦት መንገዶችና ውህደቶች (ክፍያዎች፣ ግብዓቶች፣ ኤክስቴንሽን) ተጠቀም።",
    "አስቀድመው በሚደርሱባቸው አጋሮች፡ ማኅበራት፣ ዩኒየኖች፣ የግብዓት አከፋፋዮች፣ የኤክስቴንሽን ሠራተኞች፤ ነጻ ሙከራ አቅርብና የረኩ ተጠቃሚዎችን ወደ ከፋዮች ቀይር።"
   ]
  }
 }
];
