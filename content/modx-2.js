/* Level 2 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[2] = [
 {
  "why": {
   "en": "Text code (Python) does what blocks do, but faster to write, share and grow.",
   "am": "የጽሑፍ ኮድ (Python) ብሎኮች የሚያደርጉትን ያደርጋል፤ ግን ለመጻፍ፣ ለማጋራትና ለማሳደግ ፈጣን ነው።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "The same program in blocks and in Python",
     "am": "ያው ፕሮግራም በብሎኮችና በPython"
    },
    "cols": [
     {
      "h": {
       "en": "Scratch",
       "am": "Scratch"
      },
      "items": {
       "en": [
        "ask \"Price per kilo?\" and wait",
        "set price to answer",
        "say price × kilos"
       ],
       "am": [
        "«በኪሎ ዋጋ?» ጠይቅና ጠብቅ",
        "priceን answer አድርግ",
        "price × kilos በል"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Python",
       "am": "Python"
      },
      "items": {
       "en": [
        "price = float(input(\"Price per kilo? \"))",
        "total = price * kilos",
        "print(total)"
       ],
       "am": [
        "price = float(input(\"Price per kilo? \"))",
        "total = price * kilos",
        "print(total)"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "Every program: input → process → output",
     "am": "እያንዳንዱ ፕሮግራም፡ ግብዓት → ሂደት → ውጤት"
    },
    "nodes": [
     {
      "t": {
       "en": "Input",
       "am": "ግብዓት"
      },
      "s": {
       "en": "input(), a sensor, a button",
       "am": "input()፣ ሴንሰር፣ ቁልፍ"
      }
     },
     {
      "t": {
       "en": "Process",
       "am": "ሂደት"
      },
      "s": {
       "en": "variables and maths",
       "am": "variables እና ሒሳብ"
      }
     },
     {
      "t": {
       "en": "Output",
       "am": "ውጤት"
      },
      "s": {
       "en": "print(), the micro:bit screen",
       "am": "print()፣ የmicro:bit ስክሪን"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Types matter",
     "am": "ዓይነቶች አስፈላጊ ናቸው"
    },
    "cols": [
     {
      "h": {
       "en": "Text (str)",
       "am": "ጽሑፍ (str)"
      },
      "items": {
       "en": [
        "\"3\" + \"4\" → \"34\"",
        "input() always gives text"
       ],
       "am": [
        "\"3\" + \"4\" → \"34\"",
        "input() ሁልጊዜ ጽሑፍ ይሰጣል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Numbers (int, float)",
       "am": "ቁጥሮች (int፣ float)"
      },
      "items": {
       "en": [
        "3 + 4 → 7",
        "convert: int(\"3\"), float(\"3.5\")"
       ],
       "am": [
        "3 + 4 → 7",
        "ቀይር፡ int(\"3\")፣ float(\"3.5\")"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "# Market price calculator (in class, use input(); here the values are typed in)\nitem = \"teff\"\nprice_per_kilo = float(\"120\")     # input() gives text, so we convert it to a number\nkilos = float(\"3.5\")\ntotal = price_per_kilo * kilos\nprint(f\"{kilos} kg of {item} at {price_per_kilo:.0f} birr/kg = {total:.2f} birr\")\nprint(\"Selam! Your total is\", round(total), \"birr\")\nprint(2 + int(\"3\"))               # works: both are numbers\ntry:\n    print(2 + \"3\")                # mixing a number and text\nexcept TypeError as err:\n    print(\"Error:\", err)",
   "out": "3.5 kg of teff at 120 birr/kg = 420.00 birr\nSelam! Your total is 420 birr\n5\nError: unsupported operand type(s) for +: 'int' and 'str'",
   "title": {
    "en": "Market price calculator",
    "am": "የገበያ ዋጋ ማስሊያ"
   }
  },
  "qa": {
   "en": [
    "Always a string (text), even if the user types digits; convert with int() or float().",
    "Python cannot add a number and text; convert one of them first (2 + int(\"3\") is 5).",
    "The temperature sensor (inside the processor chip), read with temperature()."
   ],
   "am": [
    "ሁልጊዜ string (ጽሑፍ)፣ ተጠቃሚው አሃዞችን ቢጽፍም፤ በint() ወይም float() ቀይር።",
    "Python ቁጥርንና ጽሑፍን መደመር አይችልም፤ መጀመሪያ አንዱን ቀይር (2 + int(\"3\") 5 ነው)።",
    "የሙቀት ሴንሰሩ (በprocessor ቺፑ ውስጥ)፣ በtemperature() ይነበባል።"
   ]
  }
 },
 {
  "why": {
   "en": "Decisions, loops and functions are the three tools behind almost every program.",
   "am": "ውሳኔዎች፣ loops እና functions ከሞላ ጎደል ከእያንዳንዱ ፕሮግራም ጀርባ ያሉ ሦስቱ መሣሪያዎች ናቸው።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "for or while?",
     "am": "for ወይስ while?"
    },
    "cols": [
     {
      "h": {
       "en": "for",
       "am": "for"
      },
      "items": {
       "en": [
        "You know how many times",
        "for day in range(7):"
       ],
       "am": [
        "ስንት ጊዜ እንደሆነ ታውቃለህ",
        "for day in range(7):"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "while",
       "am": "while"
      },
      "items": {
       "en": [
        "Repeat until something changes",
        "while guess != secret:"
       ],
       "am": [
        "አንድ ነገር እስኪለወጥ ድገም",
        "while guess != secret:"
       ]
      },
      "tone": ""
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "A function is a small machine",
     "am": "function ትንሽ ማሽን ነው"
    },
    "nodes": [
     {
      "t": {
       "en": "Inputs (parameters)",
       "am": "ግብዓቶች (parameters)"
      },
      "s": {
       "en": "length = 40, width = 25",
       "am": "length = 40፣ width = 25"
      }
     },
     {
      "t": {
       "en": "def area(length, width):",
       "am": "def area(length, width):"
      },
      "s": {
       "en": "return length * width",
       "am": "return length * width"
      }
     },
     {
      "t": {
       "en": "Output (return value)",
       "am": "ውጤት (return value)"
      },
      "s": {
       "en": "1000 m²",
       "am": "1000 m²"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "From data to a chart",
     "am": "ከዳታ ወደ ቻርት"
    },
    "nodes": [
     {
      "t": {
       "en": "Measure",
       "am": "ለካ"
      },
      "s": {
       "en": "rain gauge, 7 days",
       "am": "የዝናብ መለኪያ፣ 7 ቀናት"
      }
     },
     {
      "t": {
       "en": "Spreadsheet",
       "am": "ስፕሬድሺት"
      }
     },
     {
      "t": {
       "en": "Bar chart",
       "am": "የአሞሌ ቻርት"
      }
     },
     {
      "t": {
       "en": "Explain",
       "am": "አብራራ"
      },
      "s": {
       "en": "which day was wettest?",
       "am": "የትኛው ቀን በጣም ዝናባማ ነበር?"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "rain_mm = {\"Mon\": 0, \"Tue\": 12, \"Wed\": 30, \"Thu\": 4, \"Fri\": 0, \"Sat\": 18, \"Sun\": 7}\n\ndef area(length, width):               # a function returns a value\n    return length * width\n\ndef describe(mm):                      # if / elif / else\n    if mm == 0:\n        return \"dry\"\n    elif mm < 10:\n        return \"light rain\"\n    elif mm < 25:\n        return \"moderate rain\"\n    else:\n        return \"heavy rain\"\n\nfor day, mm in rain_mm.items():        # for: we know there are 7 days\n    print(f\"{day}: {mm:2d} mm {'#' * (mm // 2):15s} {describe(mm)}\")\n\ntotal = sum(rain_mm.values())\nplot = area(40, 25)                    # a 40 m x 25 m plot\nprint(f\"Week total: {total} mm on a {plot} m2 plot = {total * plot / 1000:.0f} m3 of water\")",
   "out": "Mon:  0 mm                 dry\nTue: 12 mm ######          moderate rain\nWed: 30 mm ############### heavy rain\nThu:  4 mm ##              light rain\nFri:  0 mm                 dry\nSat: 18 mm #########       moderate rain\nSun:  7 mm ###             light rain\nWeek total: 71 mm on a 1000 m2 plot = 71 m3 of water",
   "title": {
    "en": "A week of rain: decisions, a loop, functions and a text bar chart",
    "am": "የሳምንት ዝናብ፡ ውሳኔዎች፣ loop፣ functions እና የጽሑፍ የአሞሌ ቻርት"
   },
   "note": {
    "en": "1 mm of rain on 1 m² is 1 litre, so mm × m² ÷ 1000 gives cubic metres.",
    "am": "1 mm ዝናብ በ1 m² ላይ 1 ሊትር ነው፤ ስለዚህ mm × m² ÷ 1000 ኪዩቢክ ሜትር ይሰጣል።"
   }
  },
  "qa": {
   "en": [
    "When you do not know in advance how many repeats are needed, for example keep asking until the guess is right.",
    "The value after return, which the caller can store or print (area(40, 25) returns 1000).",
    "Answer from your chart, for example: Wednesday was the wettest day with 30 mm, and two days were dry."
   ],
   "am": [
    "ስንት ድግግሞሽ እንደሚያስፈልግ አስቀድመህ ሳታውቅ፣ ለምሳሌ ግምቱ ትክክል እስኪሆን መጠየቅ።",
    "ከreturn በኋላ ያለው እሴት፣ ጠሪው ሊያስቀምጠው ወይም ሊያትመው ይችላል (area(40, 25) 1000 ይመልሳል)።",
    "ከቻርትህ መልስ፣ ለምሳሌ፡ ረቡዕ በ30 mm በጣም ዝናባማ ቀን ነበር፣ ሁለት ቀናት ደረቅ ነበሩ።"
   ]
  }
 },
 {
  "why": {
   "en": "Lists and dictionaries organise data; files keep it; HTML and CSS show it on the web.",
   "am": "lists እና dictionaries ዳታን ያደራጃሉ፤ ፋይሎች ያስቀምጡታል፤ HTML እና CSS በድር ላይ ያሳዩታል።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "List or dictionary?",
     "am": "list ወይስ dictionary?"
    },
    "cols": [
     {
      "h": {
       "en": "List: ordered items",
       "am": "list፡ በቅደም ተከተል ያሉ ንጥሎች"
      },
      "items": {
       "en": [
        "names = [\"Abebe\", \"Hana\", \"Sara\"]",
        "names[0] → \"Abebe\" (by position)"
       ],
       "am": [
        "names = [\"Abebe\", \"Hana\", \"Sara\"]",
        "names[0] → \"Abebe\" (በቦታ)"
       ]
      },
      "tone": ""
     },
     {
      "h": {
       "en": "Dictionary: key → value",
       "am": "dictionary፡ ቁልፍ → እሴት"
      },
      "items": {
       "en": [
        "words = {\"ውሃ\": \"water\"}",
        "words[\"ውሃ\"] → \"water\" (by key)"
       ],
       "am": [
        "words = {\"ውሃ\": \"water\"}",
        "words[\"ውሃ\"] → \"water\" (በቁልፍ)"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "stack",
    "title": {
     "en": "A web page has three layers",
     "am": "ድረ ገጽ ሦስት ንብርብሮች አሉት"
    },
    "layers": [
     {
      "t": {
       "en": "HTML: content",
       "am": "HTML፡ ይዘት"
      },
      "s": {
       "en": "<h1>, <p>, <img>, <a href=\"…\">",
       "am": "<h1>፣ <p>፣ <img>፣ <a href=\"…\">"
      }
     },
     {
      "t": {
       "en": "CSS: style",
       "am": "CSS፡ ዘይቤ"
      },
      "s": {
       "en": "colours, fonts, layout",
       "am": "ቀለሞች፣ ፊደላት፣ አቀማመጥ"
      }
     },
     {
      "t": {
       "en": "JavaScript: behaviour",
       "am": "JavaScript፡ ባሕሪ"
      },
      "s": {
       "en": "buttons that react (Grade 8)",
       "am": "ምላሽ የሚሰጡ ቁልፎች (8ኛ ክፍል)"
      }
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "Why save to a file",
     "am": "ለምን በፋይል ማስቀመጥ"
    },
    "nodes": [
     {
      "t": {
       "en": "Program runs",
       "am": "ፕሮግራሙ ይሠራል"
      }
     },
     {
      "t": {
       "en": "Write to words.json",
       "am": "ወደ words.json ጻፍ"
      }
     },
     {
      "t": {
       "en": "Program closes",
       "am": "ፕሮግራሙ ይዘጋል"
      }
     },
     {
      "t": {
       "en": "Next day: load it back",
       "am": "በሚቀጥለው ቀን፡ መልሰህ ጫን"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import json, os, tempfile\nwords = {\"ውሃ\": \"water\", \"ዳቦ\": \"bread\", \"ትምህርት ቤት\": \"school\"}   # dictionary: key -> value\nclass_list = [\"Abebe\", \"Hana\"]                                       # list: ordered items\nclass_list.append(\"Sara\"); class_list.remove(\"Hana\")\nprint(\"Class:\", class_list, \"| first:\", class_list[0])\n\npath = os.path.join(tempfile.gettempdir(), \"words.json\")\nwith open(path, \"w\", encoding=\"utf-8\") as f:                         # save\n    json.dump(words, f, ensure_ascii=False)\nwith open(path, encoding=\"utf-8\") as f:                              # load again later\n    loaded = json.load(f)\nfor am, en in loaded.items():\n    print(f\"{am} -> {en}\")\nprint(\"Unknown word:\", loaded.get(\"ጤፍ\", \"not in the dictionary yet\"))",
   "out": "Class: ['Abebe', 'Sara'] | first: Abebe\nውሃ -> water\nዳቦ -> bread\nትምህርት ቤት -> school\nUnknown word: not in the dictionary yet",
   "title": {
    "en": "Lists, a bilingual dictionary and saving to a file",
    "am": "lists፣ ባለሁለት ቋንቋ dictionary እና በፋይል ማስቀመጥ"
   }
  },
  "qa": {
   "en": [
    "A list keeps items in order and you find them by position; a dictionary stores pairs and you find a value by its key.",
    "Variables disappear when the program stops; a file keeps the data for next time and for other programs.",
    "The <a> tag, with the address in href: <a href=\"page2.html\">Next</a>."
   ],
   "am": [
    "list ንጥሎችን በቅደም ተከተል ይይዛል፣ በቦታ ታገኛቸዋለህ፤ dictionary ጥንዶችን ያስቀምጣል፣ እሴትን በቁልፉ ታገኛለህ።",
    "ፕሮግራሙ ሲቆም variables ይጠፋሉ፤ ፋይል ዳታውን ለሚቀጥለው ጊዜና ለሌሎች ፕሮግራሞች ያስቀምጣል።",
    "<a> tag፣ አድራሻው በhref ውስጥ፡ <a href=\"page2.html\">ቀጣይ</a>።"
   ]
  }
 },
 {
  "why": {
   "en": "Real programs handle errors, talk to other services and read the physical world.",
   "am": "እውነተኛ ፕሮግራሞች ስህተቶችን ይይዛሉ፣ ከሌሎች አገልግሎቶች ጋር ይነጋገራሉ፣ አካላዊውን ዓለም ያነባሉ።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Smart garden monitor",
     "am": "ብልህ የአትክልት ቦታ መከታተያ"
    },
    "nodes": [
     {
      "t": {
       "en": "Soil sensor",
       "am": "የአፈር ሴንሰር"
      },
      "s": {
       "en": "reading 0–1023",
       "am": "ንባብ 0–1023"
      }
     },
     {
      "t": {
       "en": "Board (Arduino / Pi)",
       "am": "ቦርድ (Arduino / Pi)"
      },
      "s": {
       "en": "is it below the threshold?",
       "am": "ከወሰኑ በታች ነው?"
      }
     },
     {
      "t": {
       "en": "Log file",
       "am": "የመዝገብ ፋይል"
      },
      "s": {
       "en": "time, reading",
       "am": "ጊዜ፣ ንባብ"
      }
     },
     {
      "t": {
       "en": "Web page",
       "am": "ድረ ገጽ"
      },
      "s": {
       "en": "\"Water now!\"",
       "am": "«አሁን አጠጣ!»"
      },
      "hl": true
     }
    ],
    "note": {
     "en": "Powered by a solar power bank: no grid electricity needed.",
     "am": "በፀሐይ ኃይል ባንክ የሚሠራ፡ የኤሌክትሪክ መስመር አያስፈልግም።"
    }
   },
   {
    "type": "flow",
    "title": {
     "en": "An API: ask a server, get data back",
     "am": "API፡ ሰርቨርን ጠይቅ፣ ዳታ መልሰህ አግኝ"
    },
    "nodes": [
     {
      "t": {
       "en": "Your program",
       "am": "ፕሮግራምህ"
      }
     },
     {
      "t": {
       "en": "Request",
       "am": "ጥያቄ"
      },
      "s": {
       "en": "GET /forecast?city=Bahir Dar",
       "am": "GET /forecast?city=Bahir Dar"
      }
     },
     {
      "t": {
       "en": "Weather server",
       "am": "የአየር ሁኔታ ሰርቨር"
      }
     },
     {
      "t": {
       "en": "JSON reply",
       "am": "የJSON መልስ"
      },
      "s": {
       "en": "{\"rain_mm\": 6}",
       "am": "{\"rain_mm\": 6}"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "try / except",
     "am": "try / except"
    },
    "cols": [
     {
      "h": {
       "en": "Without",
       "am": "ያለ እሱ"
      },
      "items": {
       "en": [
        "User types \"abc\" → program crashes"
       ],
       "am": [
        "ተጠቃሚው «abc» ይጽፋል → ፕሮግራሙ ይወድቃል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "With",
       "am": "ከእሱ ጋር"
      },
      "items": {
       "en": [
        "except ValueError: ask again",
        "Program keeps running"
       ],
       "am": [
        "except ValueError፡ እንደገና ጠይቅ",
        "ፕሮግራሙ መሥራቱን ይቀጥላል"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "lang": "Python",
   "code": "import json\nDRY_BELOW = 400                       # sensor value below this = dry soil (calibrate with dry and wet soil)\nlog_lines = [\"06:00,612\", \"09:00,540\", \"12:00,455\", \"15:00,381\", \"18:00,oops\", \"21:00,372\"]\n\ndef parse(line):\n    time, value = line.split(\",\")\n    try:\n        return time, int(value)       # may fail on bad data\n    except ValueError:\n        print(f\"skipped bad reading at {time}: {value!r}\")\n        return None\n\nfor line in log_lines:\n    r = parse(line)\n    if r:\n        time, v = r\n        print(f\"{time}  {v:4d}  {'DRY - water now' if v < DRY_BELOW else 'ok'}\")\n\n# An API answers in JSON. Here we read a saved sample answer instead of calling the internet:\nreply = '{\"city\": \"Bahir Dar\", \"tomorrow\": {\"rain_mm\": 6, \"max_c\": 27}}'\ndata = json.loads(reply)\nprint(f\"Tomorrow in {data['city']}: {data['tomorrow']['rain_mm']} mm rain, {data['tomorrow']['max_c']} C\")",
   "out": "06:00   612  ok\n09:00   540  ok\n12:00   455  ok\n15:00   381  DRY - water now\nskipped bad reading at 18:00: 'oops'\n21:00   372  DRY - water now\nTomorrow in Bahir Dar: 6 mm rain, 27 C",
   "title": {
    "en": "Sensor log with try/except, and reading an API reply",
    "am": "የሴንሰር መዝገብ ከtry/except ጋር፣ እና የAPI መልስ ማንበብ"
   },
   "note": {
    "en": "The API reply here is a saved sample, so the example runs without internet. In class, use the requests library with a free weather API.",
    "am": "እዚህ ያለው የAPI መልስ የተቀመጠ ናሙና ነው፤ ስለዚህ ምሳሌው ያለ ኢንተርኔት ይሠራል። በክፍል ውስጥ የrequests library ከነጻ የአየር ሁኔታ API ጋር ተጠቀም።"
   }
  },
  "qa": {
   "en": [
    "Python jumps to the except block instead of crashing, so you can handle the problem (for example ask again or skip the value).",
    "An Application Programming Interface: a set of rules for asking another program or server for data or actions, usually over the internet with JSON replies.",
    "It compares the reading with a threshold measured beforehand in dry and wet soil; below the threshold means dry."
   ],
   "am": [
    "Python ከመውደቅ ይልቅ ወደ except ብሎኩ ይዘላል፤ ስለዚህ ችግሩን መያዝ ትችላለህ (ለምሳሌ እንደገና መጠየቅ ወይም እሴቱን መዝለል)።",
    "Application Programming Interface፡ ሌላ ፕሮግራምን ወይም ሰርቨርን ዳታ ወይም ተግባር የመጠየቂያ ሕጎች፣ ብዙውን ጊዜ በኢንተርኔት በJSON መልሶች።",
    "ንባቡን በደረቅና በእርጥብ አፈር አስቀድሞ ከተለካ ወሰን ጋር ያወዳድራል፤ ከወሰኑ በታች ማለት ደረቅ ነው።"
   ]
  }
 }
];
