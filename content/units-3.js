/* Level 3: each year-long module split into 6 units. Generated; code outputs come from running the code. */
window.UNITS = window.UNITS || {};
window.UNITS[3] = [
 [
  {
   "t": {
    "en": "Classes and objects",
    "am": "Classes እና objects"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Design a class with attributes and methods",
     "Create and use several objects from one class"
    ],
    "am": [
     "ከattributes እና methods ጋር class መንደፍ",
     "ከአንድ class በርካታ objects መፍጠርና መጠቀም"
    ]
   },
   "l": {
    "en": [
     "Why objects: bundle data with behaviour",
     "__init__, self and attributes",
     "Methods that change the object",
     "A Farm class with crops and animals"
    ],
    "am": [
     "ለምን objects፡ ዳታን ከባሕሪ ጋር ማሰር",
     "__init__፣ self እና attributes",
     "objectኡን የሚቀይሩ methods",
     "ሰብሎችና እንስሳት ያሉት Farm class"
    ]
   },
   "a": {
    "en": "Model a cooperative: a Farm class (name, crops, animals, yield records) and a Cooperative class that holds many farms and reports totals.",
    "am": "ማኅበርን ሞዴል አድርግ፡ Farm class (ስም፣ ሰብሎች፣ እንስሳት፣ የምርት መዝገቦች) እና ብዙ እርሻዎችን የሚይዝና ድምሮችን የሚዘግብ Cooperative class።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What is the difference between a class and an object?",
     "What is self?"
    ],
    "am": [
     "በclass እና በobject መካከል ያለው ልዩነት ምንድነው?",
     "self ምንድነው?"
    ]
   },
   "qa": {
    "en": [
     "The class is the blueprint; each object is one real thing built from it with its own data.",
     "The object the method is working on, so farm1.add_crop() changes farm1, not farm2."
    ],
    "am": [
     "classኡ ንድፉ ነው፤ እያንዳንዱ object ከእሱ የተገነባ የራሱ ዳታ ያለው አንድ እውነተኛ ነገር ነው።",
     "methodኡ የሚሠራበት object፣ ስለዚህ farm1.add_crop() farm1ን ይቀይራል እንጂ farm2ን አይደለም።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "Objects inside objects",
      "am": "በobjects ውስጥ ያሉ objects"
     },
     "root": {
      "t": {
       "en": "Cooperative \"Abay\"",
       "am": "Cooperative «ዓባይ»"
      }
     },
     "kids": [
      {
       "t": {
        "en": "Farm \"Hana\"",
        "am": "Farm «ሐና»"
       },
       "kids": [
        {
         "t": {
          "en": "teff 1.6 t, maize 4.2 t",
          "am": "ጤፍ 1.6 t፣ በቆሎ 4.2 t"
         }
        }
       ]
      },
      {
       "t": {
        "en": "Farm \"Dawit\"",
        "am": "Farm «ዳዊት»"
       },
       "kids": [
        {
         "t": {
          "en": "teff 1.9 t",
          "am": "ጤፍ 1.9 t"
         }
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "class Farm:\n    def __init__(self, owner):\n        self.owner, self.harvest = owner, {}          # attributes\n    def record(self, crop, tonnes):                 # a method that changes the object\n        self.harvest[crop] = self.harvest.get(crop, 0) + tonnes\nclass Cooperative:\n    def __init__(self, name):\n        self.name, self.farms = name, []\n    def join(self, farm):\n        self.farms.append(farm)\n    def total(self, crop):\n        return sum(f.harvest.get(crop, 0) for f in self.farms)\ncoop = Cooperative(\"Abay\")\nhana, dawit = Farm(\"Hana\"), Farm(\"Dawit\")\nhana.record(\"teff\", 1.6); hana.record(\"maize\", 4.2); dawit.record(\"teff\", 1.9)\ncoop.join(hana); coop.join(dawit)\nprint(f\"{coop.name}: {len(coop.farms)} farms, teff {coop.total('teff')} t, maize {coop.total('maize')} t\")",
    "out": "Abay: 2 farms, teff 3.5 t, maize 4.2 t",
    "title": {
     "en": "A cooperative of farm objects",
     "am": "የfarm objects ማኅበር"
    }
   }
  },
  {
   "t": {
    "en": "Testing with pytest",
    "am": "በpytest መፈተሽ"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Write automatic tests for functions",
     "Use a failing test to find and fix a bug"
    ],
    "am": [
     "ለfunctions አውቶማቲክ ፈተናዎችን መጻፍ",
     "ስህተትን ለማግኘትና ለማስተካከል የሚወድቅ ፈተና መጠቀም"
    ]
   },
   "l": {
    "en": [
     "Why test: computers check faster than people",
     "assert and test_ functions",
     "Run pytest; read the failure",
     "Write the test first, then fix"
    ],
    "am": [
     "ለምን መፈተሽ፡ ኮምፒውተሮች ከሰዎች በፍጥነት ይፈትሻሉ",
     "assert እና test_ functions",
     "pytestን አስኪድ፤ ውድቀቱን አንብብ",
     "መጀመሪያ ፈተናውን ጻፍ፣ ከዚያ አስተካክል"
    ]
   },
   "a": {
    "en": "A grade function has a hidden bug at 90 marks; write tests for every boundary, find the bug with pytest, fix it and see all tests pass.",
    "am": "የውጤት function በ90 ውጤት የተደበቀ ስህተት አለው፤ ለእያንዳንዱ ወሰን ፈተናዎችን ጻፍ፣ ስህተቱን በpytest ፈልግ፣ አስተካክለውና ሁሉም ፈተናዎች ሲያልፉ ተመልከት።"
   },
   "m": {
    "en": "Python with pytest",
    "am": "Python ከpytest ጋር"
   },
   "q": {
    "en": [
     "What does a failing test tell you?",
     "Why keep tests after the bug is fixed?"
    ],
    "am": [
     "የሚወድቅ ፈተና ምን ይነግርሃል?",
     "ስህተቱ ከተስተካከለ በኋላ ፈተናዎችን ለምን እናቆያለን?"
    ]
   },
   "qa": {
    "en": [
     "Which input gave which wrong result, so you know where to look.",
     "They warn you immediately if a later change brings the bug back."
    ],
    "am": [
     "የትኛው ግብዓት የትኛውን የተሳሳተ ውጤት እንደሰጠ፣ ስለዚህ የት እንደምትመለከት ታውቃለህ።",
     "በኋላ ያለ ለውጥ ስህተቱን ቢመልሰው ወዲያው ያስጠነቅቁሃል።"
    ]
   },
   "dg": [
    {
     "type": "cycle",
     "title": {
      "en": "Test, fix, re-test",
      "am": "ፈትሽ፣ አስተካክል፣ እንደገና ፈትሽ"
     },
     "nodes": [
      {
       "t": {
        "en": "Write a test",
        "am": "ፈተና ጻፍ"
       }
      },
      {
       "t": {
        "en": "Run: it fails",
        "am": "አስኪድ፡ ይወድቃል"
       },
       "s": {
        "en": "red",
        "am": "ቀይ"
       }
      },
      {
       "t": {
        "en": "Fix the code",
        "am": "ኮዱን አስተካክል"
       }
      },
      {
       "t": {
        "en": "Run: it passes",
        "am": "አስኪድ፡ ያልፋል"
       },
       "s": {
        "en": "green",
        "am": "አረንጓዴ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Bash",
    "code": "python3 -m pytest -q test_grades.py 2>&1 | tail -4 || true\nsed -i 's/mark > 90/mark >= 90/' grades.py          # the fix\necho \"--- after the fix ---\"\npython3 -m pytest -q test_grades.py 2>&1 | tail -1",
    "out": "test_grades.py:4: AssertionError\n=========================== short test summary info ============================\nFAILED test_grades.py::test_boundaries - AssertionError: assert 'B' == 'A'\n1 failed in 0.01s\n--- after the fix ---\n1 passed in 0.00s",
    "title": {
     "en": "pytest finds the boundary bug, then confirms the fix",
     "am": "pytest የወሰን ስህተቱን ያገኛል፣ ከዚያ ማስተካከያውን ያረጋግጣል"
    }
   }
  },
  {
   "t": {
    "en": "Binary and number systems",
    "am": "Binary እና የቁጥር ሥርዓቶች"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Convert between decimal, binary and hexadecimal",
     "Explain bits, bytes and why text needs encoding"
    ],
    "am": [
     "በdecimal፣ binary እና hexadecimal መካከል መቀየር",
     "bitsን፣ bytesን እና ጽሑፍ ለምን encoding እንደሚያስፈልገው ማብራራት"
    ]
   },
   "l": {
    "en": [
     "Place value: 1, 2, 4, 8, 16…",
     "Count to 31 on one hand",
     "Hexadecimal: 0–9, A–F",
     "Text as numbers: ASCII and UTF-8 for Ge’ez"
    ],
    "am": [
     "የቦታ እሴት፡ 1፣ 2፣ 4፣ 8፣ 16…",
     "በአንድ እጅ እስከ 31 ቁጠር",
     "Hexadecimal፡ 0–9፣ A–F",
     "ጽሑፍ እንደ ቁጥሮች፡ ASCII እና UTF-8 ለግዕዝ"
    ]
   },
   "a": {
    "en": "Binary bracelets: write each pupil’s initials in 8-bit binary with two colours of beads.",
    "am": "የbinary አምባሮች፡ የእያንዳንዱን ተማሪ የስም መጀመሪያ ፊደላት በሁለት ቀለም ዶቃዎች በ8-bit binary ጻፍ።"
   },
   "m": {
    "en": "Beads in two colours, string, Python",
    "am": "በሁለት ቀለም ዶቃዎች፣ ክር፣ Python"
   },
   "q": {
    "en": [
     "What is 1011 in decimal?",
     "Why does an Amharic letter need more bytes than an English letter?"
    ],
    "am": [
     "1011 በdecimal ስንት ነው?",
     "የአማርኛ ፊደል ከእንግሊዝኛ ፊደል ለምን ብዙ bytes ያስፈልገዋል?"
    ]
   },
   "qa": {
    "en": [
     "8 + 0 + 2 + 1 = 11.",
     "UTF-8 uses 1 byte for basic Latin letters but 3 bytes for Ge’ez characters because their code numbers are larger."
    ],
    "am": [
     "8 + 0 + 2 + 1 = 11።",
     "UTF-8 ለመሠረታዊ የላቲን ፊደላት 1 byte ይጠቀማል፣ ለግዕዝ ፊደላት ግን 3 bytes፣ የኮድ ቁጥሮቻቸው ስለሚበልጡ።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Place values in binary",
      "am": "በbinary ያሉ የቦታ እሴቶች"
     },
     "layers": [
      {
       "t": {
        "en": "8 · 4 · 2 · 1",
        "am": "8 · 4 · 2 · 1"
       }
      },
      {
       "t": {
        "en": "1  0  1  1",
        "am": "1  0  1  1"
       }
      },
      {
       "t": {
        "en": "8 + 0 + 2 + 1 = 11",
        "am": "8 + 0 + 2 + 1 = 11"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "for n in [5, 11, 31, 200, 255]:\n    print(f\"{n:3d} = binary {n:08b} = hex {n:02X}\")\nprint(\"binary 1011 ->\", int(\"1011\", 2))\nfor ch in [\"A\", \"a\", \"ሀ\", \"ጤ\"]:\n    print(f\"{ch!r}: code {ord(ch):5d}, UTF-8 bytes {ch.encode('utf-8').hex(' ')} ({len(ch.encode())} bytes)\")",
    "out": "  5 = binary 00000101 = hex 05\n 11 = binary 00001011 = hex 0B\n 31 = binary 00011111 = hex 1F\n200 = binary 11001000 = hex C8\n255 = binary 11111111 = hex FF\nbinary 1011 -> 11\n'A': code    65, UTF-8 bytes 41 (1 bytes)\n'a': code    97, UTF-8 bytes 61 (1 bytes)\n'ሀ': code  4608, UTF-8 bytes e1 88 80 (3 bytes)\n'ጤ': code  4900, UTF-8 bytes e1 8c a4 (3 bytes)",
    "title": {
     "en": "Converting numbers and seeing text as bytes",
     "am": "ቁጥሮችን መቀየርና ጽሑፍን እንደ bytes ማየት"
    }
   }
  },
  {
   "t": {
    "en": "Logic gates",
    "am": "Logic gates"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Describe AND, OR, NOT and XOR with truth tables",
     "Build a half adder that adds two bits"
    ],
    "am": [
     "AND፣ OR፣ NOT እና XORን በtruth tables መግለጽ",
     "ሁለት bits የሚደምር half adder መገንባት"
    ]
   },
   "l": {
    "en": [
     "Switches and a bulb: AND in series, OR in parallel",
     "Truth tables",
     "XOR and the half adder",
     "Gates in Python with & | ^"
    ],
    "am": [
     "ማብሪያ ማጥፊያዎችና አምፖል፡ AND በተከታታይ፣ OR በትይዩ",
     "Truth tables",
     "XOR እና half adder",
     "Gates በPython በ& | ^"
    ]
   },
   "a": {
    "en": "Build AND and OR circuits with two switches, a torch bulb and a battery; then write their truth tables and check them in Python.",
    "am": "በሁለት ማብሪያ ማጥፊያዎች፣ በባትሪ ድንጋይ አምፖልና በባትሪ AND እና OR circuits ገንባ፤ ከዚያ truth tablesቸውን ጻፍና በPython ፈትሻቸው።"
   },
   "m": {
    "en": "2 switches, torch bulb, 3 V battery, wires, Python",
    "am": "2 ማብሪያ ማጥፊያዎች፣ የባትሪ ድንጋይ አምፖል፣ 3 V ባትሪ፣ ሽቦዎች፣ Python"
   },
   "q": {
    "en": [
     "When is A AND B true?",
     "Which two gates make a half adder?"
    ],
    "am": [
     "A AND B መቼ እውነት ነው?",
     "half adder የሚሠሩት የትኞቹ ሁለት gates ናቸው?"
    ]
   },
   "qa": {
    "en": [
     "Only when both A and B are true (both switches closed).",
     "XOR gives the sum bit and AND gives the carry bit."
    ],
    "am": [
     "A እና B ሁለቱም እውነት ሲሆኑ ብቻ (ሁለቱም ማብሪያ ማጥፊያዎች ሲዘጉ)።",
     "XOR የድምር bitኡን፣ AND ደግሞ የcarry bitኡን ይሰጣል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A half adder",
      "am": "Half adder"
     },
     "nodes": [
      {
       "t": {
        "en": "inputs A, B",
        "am": "ግብዓቶች A፣ B"
       }
      },
      {
       "t": {
        "en": "XOR → sum",
        "am": "XOR → ድምር"
       }
      },
      {
       "t": {
        "en": "AND → carry",
        "am": "AND → carry"
       }
      },
      {
       "t": {
        "en": "1 + 1 = 10 in binary",
        "am": "1 + 1 = 10 በbinary"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "print(\"A B | AND OR XOR | half adder: carry sum\")\nfor a in (0, 1):\n    for b in (0, 1):\n        print(f\"{a} {b} |  {a & b}   {a | b}   {a ^ b}  |              {a & b}    {a ^ b}\")",
    "out": "A B | AND OR XOR | half adder: carry sum\n0 0 |  0   0   0  |              0    0\n0 1 |  0   1   1  |              0    1\n1 0 |  0   1   1  |              0    1\n1 1 |  1   1   0  |              1    0",
    "title": {
     "en": "Truth tables and a half adder",
     "am": "Truth tables እና half adder"
    }
   }
  },
  {
   "t": {
    "en": "CPU and memory: how a program runs",
    "am": "CPU እና ማስታወሻ፡ ፕሮግራም እንዴት እንደሚሠራ"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Describe the fetch–decode–execute cycle",
     "Trace a tiny machine program step by step"
    ],
    "am": [
     "የfetch–decode–execute ዑደትን መግለጽ",
     "ትንሽ የማሽን ፕሮግራምን እርምጃ በእርምጃ መከታተል"
    ]
   },
   "l": {
    "en": [
     "CPU, RAM, storage: what each does",
     "Registers and the program counter",
     "Fetch, decode, execute",
     "Simulate a tiny CPU in Python"
    ],
    "am": [
     "CPU፣ RAM፣ ማከማቻ፡ እያንዳንዱ የሚያደርገው",
     "Registers እና program counter",
     "Fetch፣ decode፣ execute",
     "ትንሽ CPUን በPython አስመስል"
    ]
   },
   "a": {
    "en": "Role-play a CPU: one pupil is the program counter, one the memory, one the ALU; run a 5-instruction program on paper.",
    "am": "CPUን ተውኑ፡ አንድ ተማሪ program counter፣ አንዱ ማስታወሻ፣ አንዱ ALU ይሆናል፤ ባለ 5 መመሪያ ፕሮግራምን በወረቀት ላይ አስኪዱ።"
   },
   "m": {
    "en": "Paper cards, Python",
    "am": "የወረቀት ካርዶች፣ Python"
   },
   "q": {
    "en": [
     "What does the program counter hold?",
     "Why is RAM faster than storage but lost when power goes off?"
    ],
    "am": [
     "program counter ምን ይይዛል?",
     "RAM ከማከማቻ ለምን ፈጣን ሆኖ ኃይል ሲጠፋ ይጠፋል?"
    ]
   },
   "qa": {
    "en": [
     "The memory address of the next instruction to fetch.",
     "RAM keeps data in electric charge for quick access; it needs power. Storage (SSD, disk) keeps data without power but is slower."
    ],
    "am": [
     "ቀጥሎ የሚመጣው መመሪያ የማስታወሻ አድራሻ።",
     "RAM ለፈጣን መዳረሻ ዳታን በኤሌክትሪክ ኃይል ያቆያል፤ ኃይል ያስፈልገዋል። ማከማቻ (SSD፣ disk) ያለ ኃይል ዳታን ያቆያል ግን ቀርፋፋ ነው።"
    ]
   },
   "dg": [
    {
     "type": "cycle",
     "title": {
      "en": "The instruction cycle",
      "am": "የመመሪያ ዑደት"
     },
     "nodes": [
      {
       "t": {
        "en": "Fetch",
        "am": "Fetch"
       },
       "s": {
        "en": "read instruction at PC",
        "am": "በPC ያለውን መመሪያ አንብብ"
       }
      },
      {
       "t": {
        "en": "Decode",
        "am": "Decode"
       },
       "s": {
        "en": "what does it mean?",
        "am": "ምን ማለት ነው?"
       }
      },
      {
       "t": {
        "en": "Execute",
        "am": "Execute"
       },
       "s": {
        "en": "ALU adds, memory stores",
        "am": "ALU ይደምራል፣ ማስታወሻ ያስቀምጣል"
       }
      },
      {
       "t": {
        "en": "PC + 1",
        "am": "PC + 1"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "program = [(\"LOAD\", 7), (\"ADD\", 5), (\"STORE\", \"x\"), (\"ADD\", 1), (\"PRINT\", None)]   # a tiny machine language\nacc, pc, memory = 0, 0, {}\nwhile pc < len(program):\n    op, arg = program[pc]                         # fetch + decode\n    if op == \"LOAD\": acc = arg                    # execute\n    elif op == \"ADD\": acc += arg\n    elif op == \"STORE\": memory[arg] = acc\n    elif op == \"PRINT\": print(\"output:\", acc)\n    print(f\"PC={pc} {op:5s} {str(arg):4s} -> ACC={acc} memory={memory}\")\n    pc += 1",
    "out": "PC=0 LOAD  7    -> ACC=7 memory={}\nPC=1 ADD   5    -> ACC=12 memory={}\nPC=2 STORE x    -> ACC=12 memory={'x': 12}\nPC=3 ADD   1    -> ACC=13 memory={'x': 12}\noutput: 13\nPC=4 PRINT None -> ACC=13 memory={'x': 12}",
    "title": {
     "en": "A tiny CPU, step by step",
     "am": "ትንሽ CPU፣ እርምጃ በእርምጃ"
    }
   }
  },
  {
   "t": {
    "en": "NumPy and pandas: data basics",
    "am": "NumPy እና pandas፡ የዳታ መሠረታዊ ነገሮች"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Load a CSV into a DataFrame and summarise it",
     "Filter, group and sort data"
    ],
    "am": [
     "CSVን ወደ DataFrame መጫንና ማጠቃለል",
     "ዳታን ማጣራት፣ በቡድን መከፋፈልና መደርደር"
    ]
   },
   "l": {
    "en": [
     "NumPy arrays: fast maths on many numbers",
     "pandas: read_csv, head, describe",
     "Filter rows, select columns",
     "groupby and mean: yield by crop"
    ],
    "am": [
     "NumPy arrays፡ በብዙ ቁጥሮች ላይ ፈጣን ሒሳብ",
     "pandas፡ read_csv፣ head፣ describe",
     "ረድፎችን አጣራ፣ ዓምዶችን ምረጥ",
     "groupby እና mean፡ ምርት በሰብል"
    ]
   },
   "a": {
    "en": "Collect yields from 10 local farms (or use the sample data), load them into pandas and answer: which crop yields most per hectare, and which farm is above average?",
    "am": "ከ10 የአካባቢ እርሻዎች ምርትን ሰብስብ (ወይም የናሙና ዳታውን ተጠቀም)፣ ወደ pandas ጫንና መልስ፡ የትኛው ሰብል በሄክታር ብዙ ምርት ይሰጣል፣ የትኛውስ እርሻ ከአማካይ በላይ ነው?"
   },
   "m": {
    "en": "Python with pandas",
    "am": "Python ከpandas ጋር"
   },
   "q": {
    "en": [
     "How do you find the average of a column in pandas?",
     "Why are NumPy arrays faster than Python lists for maths?"
    ],
    "am": [
     "በpandas የአንድን ዓምድ አማካይ እንዴት ታገኛለህ?",
     "ለሒሳብ NumPy arrays ከPython lists ለምን ፈጣን ናቸው?"
    ]
   },
   "qa": {
    "en": [
     "df[\"column\"].mean(), or df.groupby(\"crop\")[\"column\"].mean() for each group.",
     "They store numbers in one block of memory and do the maths in compiled code, on all numbers at once."
    ],
    "am": [
     "df[\"column\"].mean()፣ ወይም ለእያንዳንዱ ቡድን df.groupby(\"crop\")[\"column\"].mean()።",
     "ቁጥሮችን በአንድ የማስታወሻ ብሎክ ያስቀምጣሉ፣ ሒሳቡንም በተጠናቀረ ኮድ በሁሉም ቁጥሮች ላይ በአንድ ጊዜ ይሠራሉ።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A pandas analysis",
      "am": "የpandas ትንተና"
     },
     "nodes": [
      {
       "t": {
        "en": "read_csv",
        "am": "read_csv"
       }
      },
      {
       "t": {
        "en": "clean / filter",
        "am": "አጽዳ / አጣራ"
       }
      },
      {
       "t": {
        "en": "groupby + mean",
        "am": "groupby + mean"
       }
      },
      {
       "t": {
        "en": "answer + chart",
        "am": "መልስ + ቻርት"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import io\nimport pandas as pd\ncsv = \"\"\"farm,crop,area_ha,harvest_t\nHana,teff,0.5,0.8\nDawit,teff,1.0,1.9\nLiya,maize,0.8,3.6\nAbebe,maize,0.4,1.5\nSara,teff,0.6,0.9\nTsion,barley,0.5,1.1\"\"\"\ndf = pd.read_csv(io.StringIO(csv))\ndf[\"t_per_ha\"] = (df.harvest_t / df.area_ha).round(2)\nprint(df.groupby(\"crop\").t_per_ha.mean().round(2).sort_values(ascending=False))\navg = df.t_per_ha.mean()\nprint(f\"average {avg:.2f} t/ha; above average:\", df[df.t_per_ha > avg].farm.tolist())",
    "out": "crop\nmaize     4.12\nbarley    2.20\nteff      1.67\nName: t_per_ha, dtype: float64\naverage 2.57 t/ha; above average: ['Liya', 'Abebe']",
    "title": {
     "en": "Yield per hectare by crop and farm",
     "am": "ምርት በሄክታር በሰብልና በእርሻ"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "JavaScript basics",
    "am": "የJavaScript መሠረታዊ ነገሮች"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Use variables, arrays, objects and functions in JavaScript",
     "Loop over data with for and array methods"
    ],
    "am": [
     "በJavaScript variablesን፣ arraysን፣ objectsን እና functionsን መጠቀም",
     "በfor እና በarray methods በዳታ ላይ loop ማድረግ"
    ]
   },
   "l": {
    "en": [
     "let/const, numbers, strings, booleans",
     "Arrays and objects (like lists and dictionaries)",
     "Functions and arrow functions",
     "map, filter, reduce"
    ],
    "am": [
     "let/const፣ ቁጥሮች፣ strings፣ booleans",
     "Arrays እና objects (እንደ lists እና dictionaries)",
     "Functions እና arrow functions",
     "map፣ filter፣ reduce"
    ]
   },
   "a": {
    "en": "Rewrite your Grade 9 yield analysis in JavaScript with an array of farm objects and map/filter/reduce.",
    "am": "የ9ኛ ክፍል የምርት ትንተናህን በJavaScript ከfarm objects array እና ከmap/filter/reduce ጋር እንደገና ጻፍ።"
   },
   "m": {
    "en": "Node.js or a browser console",
    "am": "Node.js ወይም የአሳሽ console"
   },
   "q": {
    "en": [
     "What does filter return?",
     "How is a JavaScript object like a Python dictionary?"
    ],
    "am": [
     "filter ምን ይመልሳል?",
     "የJavaScript object እንዴት የPython dictionaryን ይመስላል?"
    ]
   },
   "qa": {
    "en": [
     "A new array with only the items for which the test function returns true.",
     "Both store key–value pairs: farm.crop or farm[\"crop\"]."
    ],
    "am": [
     "የፈተና functionኡ true የሚመልስላቸውን ንጥሎች ብቻ የያዘ አዲስ array።",
     "ሁለቱም የkey–value ጥንዶችን ያስቀምጣሉ፡ farm.crop ወይም farm[\"crop\"]።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Array methods in a chain",
      "am": "የarray methods በሰንሰለት"
     },
     "nodes": [
      {
       "t": {
        "en": "farms",
        "am": "farms"
       }
      },
      {
       "t": {
        "en": ".filter(teff only)",
        "am": ".filter(ጤፍ ብቻ)"
       }
      },
      {
       "t": {
        "en": ".map(t per ha)",
        "am": ".map(t በha)"
       }
      },
      {
       "t": {
        "en": ".reduce(sum) / n",
        "am": ".reduce(ድምር) / n"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "JavaScript (Node.js)",
    "code": "const farms = [\n  {farm: \"Hana\", crop: \"teff\", area: 0.5, harvest: 0.8},\n  {farm: \"Dawit\", crop: \"teff\", area: 1.0, harvest: 1.9},\n  {farm: \"Liya\", crop: \"maize\", area: 0.8, harvest: 3.6},\n  {farm: \"Sara\", crop: \"teff\", area: 0.6, harvest: 0.9},\n];\nconst teff = farms.filter(f => f.crop === \"teff\");\nconst yields = teff.map(f => f.harvest / f.area);\nconst mean = yields.reduce((a, b) => a + b, 0) / yields.length;\nconsole.log(\"teff yields (t/ha):\", yields.map(y => y.toFixed(2)).join(\", \"));\nconsole.log(`mean teff yield: ${mean.toFixed(2)} t/ha`);",
    "out": "teff yields (t/ha): 1.60, 1.90, 1.50\nmean teff yield: 1.67 t/ha",
    "title": {
     "en": "Yield analysis with map, filter and reduce",
     "am": "በmap፣ filter እና reduce የምርት ትንተና"
    }
   }
  },
  {
   "t": {
    "en": "The DOM: change a page with code",
    "am": "DOM፡ ገጽን በኮድ መቀየር"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Select elements and change their text and style",
     "Respond to clicks and form input"
    ],
    "am": [
     "elementsን መምረጥና ጽሑፋቸውንና ዘይቤያቸውን መቀየር",
     "ለጠቅታዎችና ለቅጽ ግብዓት ምላሽ መስጠት"
    ]
   },
   "l": {
    "en": [
     "The page as a tree of elements",
     "querySelector, textContent, classList",
     "Events: click, input, submit",
     "Build a notice board that adds and sorts notices"
    ],
    "am": [
     "ገጹ እንደ elements ዛፍ",
     "querySelector፣ textContent፣ classList",
     "ክስተቶች፡ click፣ input፣ submit",
     "ማስታወቂያዎችን የሚጨምርና የሚደረድር የማስታወቂያ ሰሌዳ ገንባ"
    ]
   },
   "a": {
    "en": "Make a school notice board page: a form adds a notice with a date; notices appear sorted by date, newest first.",
    "am": "የትምህርት ቤት የማስታወቂያ ሰሌዳ ገጽ ሥራ፡ ቅጽ ከቀን ጋር ማስታወቂያ ይጨምራል፤ ማስታወቂያዎች በቀን ተደርድረው፣ አዲሱ መጀመሪያ ይታያሉ።"
   },
   "m": {
    "en": "Browser, text editor",
    "am": "አሳሽ፣ የጽሑፍ አርታኢ"
   },
   "q": {
    "en": [
     "What is the DOM?",
     "Why use textContent instead of innerHTML for user text?"
    ],
    "am": [
     "DOM ምንድነው?",
     "ለተጠቃሚ ጽሑፍ ከinnerHTML ይልቅ textContent ለምን እንጠቀማለን?"
    ]
   },
   "qa": {
    "en": [
     "The browser’s tree of objects for every element on the page, which JavaScript can read and change.",
     "textContent shows text as text, so a user cannot inject HTML or scripts into the page."
    ],
    "am": [
     "በገጹ ላይ ላለው እያንዳንዱ element የአሳሹ የobjects ዛፍ፣ JavaScript ሊያነበውና ሊቀይረው የሚችል።",
     "textContent ጽሑፍን እንደ ጽሑፍ ያሳያል፤ ስለዚህ ተጠቃሚ HTML ወይም scripts ወደ ገጹ ማስገባት አይችልም።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "The page as a tree",
      "am": "ገጹ እንደ ዛፍ"
     },
     "root": {
      "t": {
       "en": "html",
       "am": "html"
      }
     },
     "kids": [
      {
       "t": {
        "en": "head",
        "am": "head"
       },
       "kids": [
        {
         "t": {
          "en": "title",
          "am": "title"
         }
        }
       ]
      },
      {
       "t": {
        "en": "body",
        "am": "body"
       },
       "kids": [
        {
         "t": {
          "en": "form#add",
          "am": "form#add"
         }
        },
        {
         "t": {
          "en": "ul#notices",
          "am": "ul#notices"
         }
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "JavaScript (Node.js)",
    "code": "// The sorting and rendering logic, tested in Node.js\nconst notices = [];\nfunction addNotice(date, text) {\n  notices.push({date, text});\n  notices.sort((a, b) => b.date.localeCompare(a.date));      // newest first\n}\naddNotice(\"2026-11-10\", \"Science fair entries due\");\naddNotice(\"2026-11-14\", \"Parents' meeting on Friday\");\naddNotice(\"2026-11-03\", \"Library open on Saturday\");\nnotices.forEach(n => console.log(`${n.date}  ${n.text}`));\n// In the page: form.addEventListener(\"submit\", e => { e.preventDefault(); addNotice(d.value, t.value); render(); });\n// render() clears ul#notices and adds one <li> per notice using textContent.",
    "out": "2026-11-14  Parents' meeting on Friday\n2026-11-10  Science fair entries due\n2026-11-03  Library open on Saturday",
    "title": {
     "en": "Notice-board logic",
     "am": "የማስታወቂያ ሰሌዳ ሎጂክ"
    },
    "note": {
     "en": "Keep logic in functions you can test, and keep DOM code thin.",
     "am": "ሎጂክን ልትፈትሻቸው በምትችላቸው functions ውስጥ አቆይ፣ የDOM ኮድን ቀጭን አድርግ።"
    }
   }
  },
  {
   "t": {
    "en": "Git and GitHub",
    "am": "Git እና GitHub"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Track changes with commits and branches",
     "Collaborate with push, pull requests and merges"
    ],
    "am": [
     "ለውጦችን በcommits እና branches መከታተል",
     "በpush፣ pull requests እና merges መተባበር"
    ]
   },
   "l": {
    "en": [
     "init, add, commit, log",
     "Branches for new features",
     "Merge and resolve a conflict",
     "GitHub: push, pull request, review"
    ],
    "am": [
     "init፣ add፣ commit፣ log",
     "ለአዳዲስ ባሕሪያት branches",
     "አዋህድና ግጭትን ፍታ",
     "GitHub፡ push፣ pull request፣ review"
    ]
   },
   "a": {
    "en": "Put your notice board on GitHub; a partner adds a feature on a branch and opens a pull request that you review and merge.",
    "am": "የማስታወቂያ ሰሌዳህን በGitHub ላይ አስቀምጥ፤ አጋርህ በbranch ላይ ባሕሪ ጨምሮ አንተ የምትገመግመውና የምታዋህደው pull request ይከፍታል።"
   },
   "m": {
    "en": "Git, a free GitHub account",
    "am": "Git፣ ነጻ የGitHub መለያ"
   },
   "q": {
    "en": [
     "What does git commit do?",
     "Why work on a branch?"
    ],
    "am": [
     "git commit ምን ያደርጋል?",
     "በbranch ላይ ለምን እንሠራለን?"
    ]
   },
   "qa": {
    "en": [
     "Saves a snapshot of the staged changes with a message in the project history.",
     "So unfinished work does not break the main version; it is merged only after review."
    ],
    "am": [
     "የተዘጋጁትን ለውጦች ፎቶ ከመልእክት ጋር በፕሮጀክቱ ታሪክ ውስጥ ያስቀምጣል።",
     "ያልተጠናቀቀ ሥራ ዋናውን ስሪት እንዳያበላሸው፤ የሚዋሃደው ከግምገማ በኋላ ብቻ ነው።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "The branch workflow",
      "am": "የbranch የሥራ ፍሰት"
     },
     "nodes": [
      {
       "t": {
        "en": "main",
        "am": "main"
       }
      },
      {
       "t": {
        "en": "git switch -c dark-mode",
        "am": "git switch -c dark-mode"
       }
      },
      {
       "t": {
        "en": "commit, commit",
        "am": "commit፣ commit"
       }
      },
      {
       "t": {
        "en": "pull request + review",
        "am": "pull request + ግምገማ"
       }
      },
      {
       "t": {
        "en": "merge into main",
        "am": "ወደ main አዋህድ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Bash",
    "code": "git init -q board && cd board\ngit config user.email \"pupil@school.et\" && git config user.name \"Pupil\"\necho \"Notice board\" > README.md && git add README.md && git commit -qm \"Start the notice board\"\ngit switch -q -c dark-mode\necho \"body { background: #111; color: #eee; }\" > style.css && git add style.css && git commit -qm \"Add dark mode\"\ngit switch -q main && git merge -q dark-mode\ngit log --oneline --graph | sed 's/^\\* [0-9a-f]\\{7\\}/* <id>/'\nls",
    "out": "* <id> Add dark mode\n* <id> Start the notice board\nREADME.md\nstyle.css",
    "title": {
     "en": "A branch, a commit and a merge",
     "am": "branch፣ commit እና merge"
    }
   }
  },
  {
   "t": {
    "en": "Searching and sorting",
    "am": "መፈለግና መደርደር"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Implement linear and binary search",
     "Compare bubble sort and merge sort by counting steps"
    ],
    "am": [
     "linear እና binary searchን መተግበር",
     "bubble sortን እና merge sortን እርምጃዎችን በመቁጠር ማወዳደር"
    ]
   },
   "l": {
    "en": [
     "Linear search",
     "Binary search on sorted data",
     "Bubble sort",
     "Merge sort: divide and conquer"
    ],
    "am": [
     "Linear search",
     "በተደረደረ ዳታ ላይ binary search",
     "Bubble sort",
     "Merge sort፡ ከፋፍለህ አሸንፍ"
    ]
   },
   "a": {
    "en": "Unplugged: sort 16 pupils by height with bubble sort, then with merge sort in groups; count comparisons for each.",
    "am": "ያለ ኮምፒውተር፡ 16 ተማሪዎችን በቁመት በbubble sort ደርድሩ፣ ከዚያ በቡድን በmerge sort፤ ለእያንዳንዱ ንጽጽሮችን ቁጠሩ።"
   },
   "m": {
    "en": "Python, the class itself",
    "am": "Python፣ ክፍሉ ራሱ"
   },
   "q": {
    "en": [
     "Why is binary search faster than linear search?",
     "Why does merge sort beat bubble sort on big lists?"
    ],
    "am": [
     "binary search ከlinear search ለምን ፈጣን ነው?",
     "በትላልቅ ዝርዝሮች merge sort ለምን bubble sortን ያሸንፋል?"
    ]
   },
   "qa": {
    "en": [
     "Each check throws away half of what is left, so a million sorted items need about 20 checks.",
     "Merge sort needs about n·log n comparisons; bubble sort about n², which grows much faster."
    ],
    "am": [
     "እያንዳንዱ ፍተሻ የቀረውን ግማሽ ይጥላል፤ ስለዚህ አንድ ሚሊዮን የተደረደሩ ንጥሎች ወደ 20 ፍተሻዎች ገደማ ያስፈልጋቸዋል።",
     "merge sort ወደ n·log n ንጽጽሮች ያስፈልገዋል፤ bubble sort ወደ n²፣ ይህም በጣም በፍጥነት ያድጋል።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Two ways to sort",
      "am": "ለመደርደር ሁለት መንገዶች"
     },
     "cols": [
      {
       "h": {
        "en": "Bubble sort",
        "am": "Bubble sort"
       },
       "items": {
        "en": [
         "swap neighbours again and again",
         "≈ n² comparisons"
        ],
        "am": [
         "ጎረቤቶችን ደጋግመህ አቀያይር",
         "≈ n² ንጽጽሮች"
        ]
       },
       "tone": "bad"
      },
      {
       "h": {
        "en": "Merge sort",
        "am": "Merge sort"
       },
       "items": {
        "en": [
         "split in halves, sort, merge",
         "≈ n log n comparisons"
        ],
        "am": [
         "በግማሽ ክፈል፣ ደርድር፣ አዋህድ",
         "≈ n log n ንጽጽሮች"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import random\ndef bubble(a):\n    a, c = a[:], 0\n    for i in range(len(a)):\n        for j in range(len(a) - 1 - i):\n            c += 1\n            if a[j] > a[j + 1]: a[j], a[j + 1] = a[j + 1], a[j]\n    return a, c\ndef merge_sort(a):\n    if len(a) <= 1: return a, 0\n    l, cl = merge_sort(a[:len(a) // 2]); r, cr = merge_sort(a[len(a) // 2:])\n    out, c, i, j = [], cl + cr, 0, 0\n    while i < len(l) and j < len(r):\n        c += 1\n        if l[i] <= r[j]: out.append(l[i]); i += 1\n        else: out.append(r[j]); j += 1\n    return out + l[i:] + r[j:], c\nrandom.seed(0)\nfor n in [16, 256, 2048]:\n    data = random.sample(range(10 * n), n)\n    b, cb = bubble(data); m, cm = merge_sort(data)\n    assert b == m == sorted(data)\n    print(f\"n = {n:5d}: bubble {cb:9,d} comparisons | merge {cm:6,d}\")",
    "out": "n =    16: bubble       120 comparisons | merge     46\nn =   256: bubble    32,640 comparisons | merge  1,734\nn =  2048: bubble 2,096,128 comparisons | merge 19,968",
    "title": {
     "en": "Counting comparisons: bubble vs merge sort",
     "am": "ንጽጽሮችን መቁጠር፡ bubble vs merge sort"
    }
   }
  },
  {
   "t": {
    "en": "Big-O: why programs slow down",
    "am": "Big-O፡ ፕሮግራሞች ለምን ይቀዘቅዛሉ"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Describe growth with O(1), O(log n), O(n), O(n²)",
     "Predict running time for bigger data"
    ],
    "am": [
     "ዕድገትን በO(1)፣ O(log n)፣ O(n)፣ O(n²) መግለጽ",
     "ለትልቅ ዳታ የሩጫ ጊዜን መተንበይ"
    ]
   },
   "l": {
    "en": [
     "Count operations, not seconds",
     "Common growth rates",
     "Nested loops are often O(n²)",
     "Choose the right data structure: set vs list"
    ],
    "am": [
     "ሰከንዶችን ሳይሆን ተግባራትን ቁጠር",
     "የተለመዱ የዕድገት መጠኖች",
     "የተደራረቡ loops ብዙውን ጊዜ O(n²) ናቸው",
     "ትክክለኛውን data structure ምረጥ፡ set vs list"
    ]
   },
   "a": {
    "en": "Time two ways of finding duplicate phone numbers in a list of 20,000: a double loop vs a set; predict and measure the difference.",
    "am": "በ20,000 ዝርዝር ውስጥ የተደጋገሙ የስልክ ቁጥሮችን የማግኛ ሁለት መንገዶችን ጊዜ ለካ፡ ድርብ loop vs set፤ ልዩነቱን ተንብይና ለካ።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "If an O(n²) program takes 1 second for 1,000 items, about how long for 10,000?",
     "Why is \"x in a_set\" faster than \"x in a_list\"?"
    ],
    "am": [
     "O(n²) ፕሮግራም ለ1,000 ንጥሎች 1 ሰከንድ ቢወስድ ለ10,000 ገደማ ስንት ይወስዳል?",
     "«x in a_set» ከ«x in a_list» ለምን ፈጣን ነው?"
    ]
   },
   "qa": {
    "en": [
     "About 100 seconds: 10 times more data, 10² = 100 times more work.",
     "A set uses hashing to jump straight to where x would be (about O(1)); a list checks items one by one (O(n))."
    ],
    "am": [
     "ወደ 100 ሰከንድ ገደማ፡ 10 እጥፍ ዳታ፣ 10² = 100 እጥፍ ሥራ።",
     "set x ሊኖርበት ወደሚችልበት በቀጥታ ለመዝለል hashing ይጠቀማል (ወደ O(1))፤ list ንጥሎችን አንድ በአንድ ይፈትሻል (O(n))።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Growth rates for n = 1,000,000",
      "am": "ለn = 1,000,000 የዕድገት መጠኖች"
     },
     "layers": [
      {
       "t": {
        "en": "O(1): 1 step",
        "am": "O(1)፡ 1 እርምጃ"
       },
       "s": {
        "en": "look up in a set",
        "am": "በset ውስጥ መፈለግ"
       }
      },
      {
       "t": {
        "en": "O(log n): ~20 steps",
        "am": "O(log n)፡ ~20 እርምጃዎች"
       },
       "s": {
        "en": "binary search",
        "am": "binary search"
       }
      },
      {
       "t": {
        "en": "O(n): 1 million steps",
        "am": "O(n)፡ 1 ሚሊዮን እርምጃዎች"
       },
       "s": {
        "en": "one loop",
        "am": "አንድ loop"
       }
      },
      {
       "t": {
        "en": "O(n²): 1 trillion steps",
        "am": "O(n²)፡ 1 ትሪሊዮን እርምጃዎች"
       },
       "s": {
        "en": "double loop: too slow",
        "am": "ድርብ loop፡ በጣም ቀርፋፋ"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import random, time\nrandom.seed(2)\nphones = [f\"09{random.randint(10_000_000, 99_999_999)}\" for _ in range(3000)] + [\"0911223344\"] * 2\ndef dup_double_loop(xs):\n    return {x for i, x in enumerate(xs) for y in xs[i + 1:] if x == y}\ndef dup_set(xs):\n    seen, dups = set(), set()\n    for x in xs:\n        (dups if x in seen else seen).add(x)\n    return dups\nfor f in (dup_double_loop, dup_set):\n    t = time.perf_counter(); d = f(phones); ms = (time.perf_counter() - t) * 1000\n    print(f\"{f.__name__:16s} found {sorted(d)} in about {ms:.0f} ms\" if ms >= 1 else f\"{f.__name__:16s} found {sorted(d)} in under 1 ms\")",
    "out": "dup_double_loop  found ['0911223344'] in about 108 ms\ndup_set          found ['0911223344'] in under 1 ms",
    "title": {
     "en": "O(n²) vs O(n) on 3,002 phone numbers",
     "am": "O(n²) vs O(n) በ3,002 የስልክ ቁጥሮች"
    },
    "note": {
     "en": "Times depend on the computer; the gap grows with n² vs n.",
     "am": "ጊዜዎቹ በኮምፒውተሩ ላይ ይወሰናሉ፤ ልዩነቱ ከn² vs n ጋር ያድጋል።"
    }
   }
  },
  {
   "t": {
    "en": "Recursion and charts",
    "am": "Recursion እና ቻርቶች"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Write recursive functions with a base case",
     "Make clear charts of real data with matplotlib"
    ],
    "am": [
     "ከbase case ጋር recursive functions መጻፍ",
     "በmatplotlib የእውነተኛ ዳታ ግልጽ ቻርቶችን መሥራት"
    ]
   },
   "l": {
    "en": [
     "Recursion: a function calling itself",
     "Base case and recursive case",
     "Folder sizes: a natural recursion",
     "matplotlib: line and bar charts with labels"
    ],
    "am": [
     "Recursion፡ ራሱን የሚጠራ function",
     "Base case እና recursive case",
     "የፎልደር መጠኖች፡ ተፈጥሯዊ recursion",
     "matplotlib፡ ምልክት ያላቸው የመስመርና የአሞሌ ቻርቶች"
    ]
   },
   "a": {
    "en": "Plot 10 years of rainfall for your zone (from the meteorology office or a sample file) with a title, axis labels and units, and write two sentences about the trend.",
    "am": "የዞንህን የ10 ዓመታት የዝናብ መጠን (ከሚቲዎሮሎጂ ቢሮ ወይም ከናሙና ፋይል) ከርዕስ፣ ከaxis ምልክቶችና ከመለኪያዎች ጋር ቻርት አድርግ፣ ስለ አዝማሚያው ሁለት ዓረፍተ ነገሮች ጻፍ።"
   },
   "m": {
    "en": "Python with matplotlib",
    "am": "Python ከmatplotlib ጋር"
   },
   "q": {
    "en": [
     "What is the base case in recursion?",
     "What must every chart have?"
    ],
    "am": [
     "በrecursion ውስጥ base case ምንድነው?",
     "እያንዳንዱ ቻርት ምን ሊኖረው ይገባል?"
    ]
   },
   "qa": {
    "en": [
     "The simplest input that is answered directly, which stops the function from calling itself forever.",
     "A title, labelled axes with units, and a source for the data."
    ],
    "am": [
     "በቀጥታ የሚመለስ በጣም ቀላሉ ግብዓት፣ functionኡ ራሱን ለዘላለም እንዳይጠራ የሚያቆመው።",
     "ርዕስ፣ ከመለኪያዎች ጋር ምልክት ያላቸው axes፣ እና የዳታው ምንጭ።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "Recursion on folders",
      "am": "በፎልደሮች ላይ recursion"
     },
     "root": {
      "t": {
       "en": "size(project) = 13 MB",
       "am": "size(project) = 13 MB"
      }
     },
     "kids": [
      {
       "t": {
        "en": "size(photos) = 9 MB",
        "am": "size(photos) = 9 MB"
       },
       "kids": [
        {
         "t": {
          "en": "2020/ = 4 MB",
          "am": "2020/ = 4 MB"
         }
        },
        {
         "t": {
          "en": "2021/ = 5 MB",
          "am": "2021/ = 5 MB"
         }
        }
       ]
      },
      {
       "t": {
        "en": "size(docs) = 4 MB",
        "am": "size(docs) = 4 MB"
       },
       "kids": [
        {
         "t": {
          "en": "base case: a file",
          "am": "base case፡ ፋይል"
         }
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "def size(item):                          # item: a number (file size) or a dict (folder)\n    if isinstance(item, int):            # base case: a file\n        return item\n    return sum(size(child) for child in item.values())    # recursive case: a folder\nproject = {\"photos\": {\"2020\": {\"a.jpg\": 2, \"b.jpg\": 2}, \"2021\": {\"c.jpg\": 5}}, \"docs\": {\"report.pdf\": 4}}\nprint(\"project size:\", size(project), \"MB\")\n\nimport matplotlib; matplotlib.use(\"Agg\")\nimport matplotlib.pyplot as plt\nyears = list(range(2016, 2026)); rain = [1150, 1320, 1080, 1260, 1390, 1010, 1230, 1180, 1300, 1120]\nfig, ax = plt.subplots(figsize=(6, 3))\nax.plot(years, rain, marker=\"o\"); ax.set_title(\"Annual rainfall (sample data)\")\nax.set_xlabel(\"Year\"); ax.set_ylabel(\"Rainfall (mm)\")\nfig.savefig(\"rainfall.png\", dpi=120, bbox_inches=\"tight\")\nprint(f\"chart saved: rainfall.png | wettest {years[rain.index(max(rain))]} ({max(rain)} mm), driest {years[rain.index(min(rain))]} ({min(rain)} mm)\")",
    "out": "project size: 13 MB\nchart saved: rainfall.png | wettest 2020 (1390 mm), driest 2021 (1010 mm)",
    "title": {
     "en": "Recursive folder sizes and a labelled rainfall chart",
     "am": "recursive የፎልደር መጠኖችና ምልክት ያለው የዝናብ ቻርት"
    },
    "note": {
     "en": "The rainfall numbers are sample data for practice; use your zone’s records in class.",
     "am": "የዝናብ ቁጥሮቹ ለልምምድ የናሙና ዳታ ናቸው፤ በክፍል ውስጥ የዞንህን መዝገቦች ተጠቀም።"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "HTTP and REST",
    "am": "HTTP እና REST"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Explain requests, methods and status codes",
     "Design REST URLs for a resource"
    ],
    "am": [
     "requestsን፣ methodsን እና status codesን ማብራራት",
     "ለresource የREST URLs መንደፍ"
    ]
   },
   "l": {
    "en": [
     "Request = method + URL + headers + body",
     "GET, POST, PUT, DELETE",
     "Status codes: 200, 201, 400, 404, 500",
     "Design: /markets/3/prices"
    ],
    "am": [
     "Request = method + URL + headers + body",
     "GET፣ POST፣ PUT፣ DELETE",
     "Status codes፡ 200፣ 201፣ 400፣ 404፣ 500",
     "ንድፍ፡ /markets/3/prices"
    ]
   },
   "a": {
    "en": "Design the API for a market-price service on paper: list each URL, method, example request and example JSON reply.",
    "am": "ለየገበያ ዋጋ አገልግሎት APIውን በወረቀት ላይ ንደፍ፡ እያንዳንዱን URL፣ method፣ የምሳሌ ጥያቄና የምሳሌ JSON መልስ ዘርዝር።"
   },
   "m": {
    "en": "Paper, a browser’s developer tools",
    "am": "ወረቀት፣ የአሳሽ የገንቢ መሣሪያዎች"
   },
   "q": {
    "en": [
     "What does a 404 status code mean?",
     "When do you use POST instead of GET?"
    ],
    "am": [
     "404 status code ምን ማለት ነው?",
     "ከGET ይልቅ POSTን መቼ ትጠቀማለህ?"
    ]
   },
   "qa": {
    "en": [
     "Not found: the server works, but nothing exists at that URL.",
     "To create something new (send data); GET only reads and must not change anything."
    ],
    "am": [
     "አልተገኘም፡ ሰርቨሩ ይሠራል፣ ግን በዚያ URL ምንም የለም።",
     "አዲስ ነገር ለመፍጠር (ዳታ ለመላክ)፤ GET የሚያነበው ብቻ ነው፣ ምንም መቀየር የለበትም።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Status code families",
      "am": "የstatus code ቤተሰቦች"
     },
     "layers": [
      {
       "t": {
        "en": "2xx success",
        "am": "2xx ስኬት"
       },
       "s": {
        "en": "200 OK, 201 Created",
        "am": "200 OK፣ 201 Created"
       }
      },
      {
       "t": {
        "en": "3xx redirect",
        "am": "3xx አቅጣጫ መቀየር"
       }
      },
      {
       "t": {
        "en": "4xx your mistake",
        "am": "4xx የአንተ ስህተት"
       },
       "s": {
        "en": "400 bad request, 404 not found",
        "am": "400 የተሳሳተ ጥያቄ፣ 404 አልተገኘም"
       }
      },
      {
       "t": {
        "en": "5xx server problem",
        "am": "5xx የሰርቨር ችግር"
       },
       "s": {
        "en": "500 internal error",
        "am": "500 የውስጥ ስህተት"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "from http import HTTPStatus\nfor code in [200, 201, 400, 401, 404, 500]:\n    print(code, HTTPStatus(code).phrase)\ndesign = [(\"GET\", \"/markets\", \"list markets\"), (\"GET\", \"/markets/3/prices?crop=teff\", \"teff prices in market 3\"),\n          (\"POST\", \"/markets/3/prices\", \"a trader reports a new price -> 201 Created\"), (\"GET\", \"/markets/99\", \"no such market -> 404\")]\nfor method, url, meaning in design:\n    print(f\"{method:5s} {url:32s} {meaning}\")",
    "out": "200 OK\n201 Created\n400 Bad Request\n401 Unauthorized\n404 Not Found\n500 Internal Server Error\nGET   /markets                         list markets\nGET   /markets/3/prices?crop=teff      teff prices in market 3\nPOST  /markets/3/prices                a trader reports a new price -> 201 Created\nGET   /markets/99                      no such market -> 404",
    "title": {
     "en": "Status codes and a REST design",
     "am": "Status codes እና የREST ንድፍ"
    }
   }
  },
  {
   "t": {
    "en": "A small API with Flask",
    "am": "በFlask ትንሽ API"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Build API routes that return JSON",
     "Test the API automatically"
    ],
    "am": [
     "JSON የሚመልሱ API routes መገንባት",
     "APIውን በራስ-ሰር መፈተሽ"
    ]
   },
   "l": {
    "en": [
     "Flask app and @app.get routes",
     "Return JSON with jsonify",
     "Validate input; return 400 or 404",
     "Test with the test client"
    ],
    "am": [
     "የFlask መተግበሪያና @app.get routes",
     "በjsonify JSON መልስ",
     "ግብዓትን አረጋግጥ፤ 400 ወይም 404 መልስ",
     "በtest client ፈትሽ"
    ]
   },
   "a": {
    "en": "Build the market-price API you designed: GET prices by crop and POST a new price, with input checks and tests.",
    "am": "የነደፍከውን የገበያ ዋጋ API ገንባ፡ በሰብል ዋጋዎችን GET እና አዲስ ዋጋ POST፣ ከግብዓት ፍተሻዎችና ከፈተናዎች ጋር።"
   },
   "m": {
    "en": "Python with Flask",
    "am": "Python ከFlask ጋር"
   },
   "q": {
    "en": [
     "What does a route do?",
     "Why return 400 for a negative price?"
    ],
    "am": [
     "route ምን ያደርጋል?",
     "ለአሉታዊ ዋጋ ለምን 400 እንመልሳለን?"
    ]
   },
   "qa": {
    "en": [
     "It connects a URL and method to a Python function that builds the response.",
     "The client sent invalid data; 400 tells it the request must be fixed, and bad data never reaches the database."
    ],
    "am": [
     "URLን እና methodን ምላሹን ከሚገነባ የPython function ጋር ያገናኛል።",
     "ደንበኛው የተሳሳተ ዳታ ልኳል፤ 400 ጥያቄው መስተካከል እንዳለበት ይነግረዋል፣ መጥፎ ዳታም ወደ ዳታቤዙ በፍጹም አይደርስም።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Inside the API",
      "am": "በAPIው ውስጥ"
     },
     "nodes": [
      {
       "t": {
        "en": "GET /prices?crop=teff",
        "am": "GET /prices?crop=teff"
       }
      },
      {
       "t": {
        "en": "route function",
        "am": "route function"
       }
      },
      {
       "t": {
        "en": "look up data",
        "am": "ዳታ ፈልግ"
       }
      },
      {
       "t": {
        "en": "jsonify(...) + status",
        "am": "jsonify(...) + status"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "from flask import Flask, jsonify, request\napp = Flask(__name__)\nPRICES = [{\"market\": \"Bahir Dar\", \"crop\": \"teff\", \"birr_per_kg\": 118}, {\"market\": \"Gondar\", \"crop\": \"maize\", \"birr_per_kg\": 38}]\n\n@app.get(\"/prices\")\ndef get_prices():\n    crop = request.args.get(\"crop\")\n    rows = [p for p in PRICES if crop is None or p[\"crop\"] == crop]\n    return (jsonify(rows), 200) if rows else (jsonify(error=f\"no prices for {crop}\"), 404)\n\n@app.post(\"/prices\")\ndef add_price():\n    p = request.get_json()\n    if not p or p.get(\"birr_per_kg\", -1) <= 0:\n        return jsonify(error=\"birr_per_kg must be a positive number\"), 400\n    PRICES.append(p); return jsonify(p), 201\n\nclient = app.test_client()                      # automatic tests, no server needed\nr = client.get(\"/prices?crop=teff\"); print(r.status_code, r.get_json())\nr = client.get(\"/prices?crop=coffee\"); print(r.status_code, r.get_json())\nr = client.post(\"/prices\", json={\"market\": \"Dessie\", \"crop\": \"teff\", \"birr_per_kg\": -5}); print(r.status_code, r.get_json())\nr = client.post(\"/prices\", json={\"market\": \"Dessie\", \"crop\": \"teff\", \"birr_per_kg\": 121}); print(r.status_code, r.get_json())",
    "out": "200 [{'birr_per_kg': 118, 'crop': 'teff', 'market': 'Bahir Dar'}]\n404 {'error': 'no prices for coffee'}\n400 {'error': 'birr_per_kg must be a positive number'}\n201 {'birr_per_kg': 121, 'crop': 'teff', 'market': 'Dessie'}",
    "title": {
     "en": "A market-price API, tested with Flask’s test client",
     "am": "የገበያ ዋጋ API፣ በFlask test client የተፈተነ"
    }
   }
  },
  {
   "t": {
    "en": "Stacks and queues",
    "am": "Stacks እና queues"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Use a stack (LIFO) and a queue (FIFO)",
     "Choose the right one for a problem"
    ],
    "am": [
     "stack (LIFO) እና queue (FIFO) መጠቀም",
     "ለአንድ ችግር ትክክለኛውን መምረጥ"
    ]
   },
   "l": {
    "en": [
     "Stack: push and pop; undo",
     "Queue: enqueue and dequeue; waiting lines",
     "Check balanced brackets with a stack",
     "Simulate a clinic queue"
    ],
    "am": [
     "Stack፡ push እና pop፤ undo",
     "Queue፡ enqueue እና dequeue፤ የወረፋ መስመሮች",
     "በstack የተመጣጠኑ ቅንፎችን ፈትሽ",
     "የክሊኒክ ወረፋን አስመስል"
    ]
   },
   "a": {
    "en": "Simulate a health-centre queue with a deque: patients arrive, are served in order, and you report average waiting time.",
    "am": "በdeque የጤና ጣቢያ ወረፋ አስመስል፡ ታካሚዎች ይመጣሉ፣ በቅደም ተከተል ይስተናገዳሉ፣ አንተ አማካይ የመጠበቂያ ጊዜን ትዘግባለህ።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "When is a queue better than a stack?",
     "How does a stack check brackets?"
    ],
    "am": [
     "queue ከstack መቼ የተሻለ ነው?",
     "stack ቅንፎችን እንዴት ይፈትሻል?"
    ]
   },
   "qa": {
    "en": [
     "When the first to arrive must be the first served, such as patients, print jobs or messages.",
     "Push each opening bracket; each closing bracket must match the top one, which is popped; at the end the stack must be empty."
    ],
    "am": [
     "መጀመሪያ የደረሰ መጀመሪያ መስተናገድ ሲኖርበት፣ እንደ ታካሚዎች፣ የህትመት ሥራዎች ወይም መልእክቶች።",
     "እያንዳንዱን የመክፈቻ ቅንፍ push አድርግ፤ እያንዳንዱ የመዝጊያ ቅንፍ ከላይኛው ጋር መመሳሰል አለበት፣ እሱም pop ይደረጋል፤ በመጨረሻ stackኡ ባዶ መሆን አለበት።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "LIFO vs FIFO",
      "am": "LIFO vs FIFO"
     },
     "cols": [
      {
       "h": {
        "en": "Stack (LIFO)",
        "am": "Stack (LIFO)"
       },
       "items": {
        "en": [
         "plates in a pile",
         "last in, first out"
        ],
        "am": [
         "የተደራረቡ ሳህኖች",
         "መጨረሻ የገባ፣ መጀመሪያ ይወጣል"
        ]
       },
       "tone": ""
      },
      {
       "h": {
        "en": "Queue (FIFO)",
        "am": "Queue (FIFO)"
       },
       "items": {
        "en": [
         "line at the bank",
         "first in, first out"
        ],
        "am": [
         "በባንክ ያለ ወረፋ",
         "መጀመሪያ የገባ፣ መጀመሪያ ይወጣል"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "from collections import deque\ndef balanced(text):\n    pairs, stack = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}, []\n    for ch in text:\n        if ch in \"([{\": stack.append(ch)\n        elif ch in \")]}\":\n            if not stack or stack.pop() != pairs[ch]: return False\n    return not stack\nprint([balanced(s) for s in [\"(a[b]{c})\", \"(a[b)]\", \"((x)\"]])\n\narrivals = [0, 2, 3, 5, 6, 6, 9]          # minutes when patients arrive\nservice = 3                                # minutes per patient\nqueue, clock, waits = deque(arrivals), 0, []\nwhile queue:\n    t = queue.popleft()                    # first in, first out\n    start = max(clock, t); waits.append(start - t); clock = start + service\nprint(\"waits (min):\", waits, \"| average:\", round(sum(waits) / len(waits), 1))",
    "out": "[True, False, False]\nwaits (min): [0, 1, 3, 4, 6, 9, 9] | average: 4.6",
    "title": {
     "en": "Bracket checker (stack) and a clinic queue (queue)",
     "am": "የቅንፍ ፈታሽ (stack) እና የክሊኒክ ወረፋ (queue)"
    }
   }
  },
  {
   "t": {
    "en": "Trees and graphs",
    "am": "Trees እና graphs"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Represent trees and graphs in code",
     "Find shortest routes with breadth-first search"
    ],
    "am": [
     "treesን እና graphsን በኮድ መወከል",
     "በbreadth-first search አጭር መንገዶችን መፈለግ"
    ]
   },
   "l": {
    "en": [
     "Trees: family trees, folders",
     "Graphs: towns and roads",
     "Adjacency lists in a dictionary",
     "BFS: fewest stops between towns"
    ],
    "am": [
     "Trees፡ የቤተሰብ ዛፎች፣ ፎልደሮች",
     "Graphs፡ ከተሞችና መንገዶች",
     "በdictionary ውስጥ adjacency lists",
     "BFS፡ በከተሞች መካከል ጥቂቱ ማቆሚያዎች"
    ]
   },
   "a": {
    "en": "Draw a road map of 8 towns in your region as a graph and find the route with the fewest stops between two of them.",
    "am": "በክልልህ ያሉ 8 ከተሞችን የመንገድ ካርታ እንደ graph ሣልና በሁለቱ መካከል ጥቂት ማቆሚያዎች ያሉትን መንገድ ፈልግ።"
   },
   "m": {
    "en": "Paper map, Python",
    "am": "የወረቀት ካርታ፣ Python"
   },
   "q": {
    "en": [
     "What is the difference between a tree and a graph?",
     "Why does BFS find the route with the fewest stops?"
    ],
    "am": [
     "በtree እና በgraph መካከል ያለው ልዩነት ምንድነው?",
     "BFS ጥቂት ማቆሚያዎች ያሉትን መንገድ ለምን ያገኛል?"
    ]
   },
   "qa": {
    "en": [
     "A tree has one root and no loops; a graph can have loops and many paths between nodes.",
     "It explores all towns 1 step away, then 2 steps, and so on, so the first time it reaches the goal is by the fewest steps."
    ],
    "am": [
     "tree አንድ root አለው፣ loops የለውም፤ graph loops እና በnodes መካከል ብዙ መንገዶች ሊኖሩት ይችላል።",
     "በ1 እርምጃ ርቀት ያሉትን ከተሞች ሁሉ፣ ከዚያ በ2 እርምጃ፣ እንዲህ እያለ ያስሳል፤ ስለዚህ ግቡን ለመጀመሪያ ጊዜ የሚደርሰው በጥቂቱ እርምጃዎች ነው።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "A road graph as adjacency lists",
      "am": "የመንገድ graph እንደ adjacency lists"
     },
     "root": {
      "t": {
       "en": "Bahir Dar",
       "am": "ባሕር ዳር"
      }
     },
     "kids": [
      {
       "t": {
        "en": "Gondar",
        "am": "ጎንደር"
       },
       "kids": [
        {
         "t": {
          "en": "Debark",
          "am": "ደባርቅ"
         }
        }
       ]
      },
      {
       "t": {
        "en": "Debre Tabor",
        "am": "ደብረ ታቦር"
       },
       "kids": [
        {
         "t": {
          "en": "Woldia",
          "am": "ወልዲያ"
         }
        }
       ]
      },
      {
       "t": {
        "en": "Debre Markos",
        "am": "ደብረ ማርቆስ"
       },
       "kids": [
        {
         "t": {
          "en": "Addis Ababa",
          "am": "አዲስ አበባ"
         }
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "from collections import deque\nroads = {\"Bahir Dar\": [\"Gondar\", \"Debre Tabor\", \"Injibara\", \"Debre Markos\"], \"Gondar\": [\"Bahir Dar\", \"Debark\"],\n         \"Debre Tabor\": [\"Bahir Dar\", \"Woldia\"], \"Injibara\": [\"Bahir Dar\", \"Debre Markos\"],\n         \"Debre Markos\": [\"Bahir Dar\", \"Injibara\", \"Addis Ababa\"], \"Woldia\": [\"Debre Tabor\", \"Dessie\"],\n         \"Dessie\": [\"Woldia\", \"Addis Ababa\"], \"Addis Ababa\": [\"Debre Markos\", \"Dessie\"], \"Debark\": [\"Gondar\"]}\ndef fewest_stops(start, goal):\n    frontier, came_from = deque([start]), {start: None}\n    while frontier:\n        town = frontier.popleft()\n        if town == goal: break\n        for nxt in roads[town]:\n            if nxt not in came_from:\n                came_from[nxt] = town; frontier.append(nxt)\n    path = [goal]\n    while path[-1] != start: path.append(came_from[path[-1]])\n    return path[::-1]\nprint(\" -> \".join(fewest_stops(\"Gondar\", \"Addis Ababa\")))\nprint(\" -> \".join(fewest_stops(\"Debark\", \"Dessie\")))",
    "out": "Gondar -> Bahir Dar -> Debre Markos -> Addis Ababa\nDebark -> Gondar -> Bahir Dar -> Debre Tabor -> Woldia -> Dessie",
    "title": {
     "en": "Fewest stops between towns with BFS",
     "am": "በBFS በከተሞች መካከል ጥቂቱ ማቆሚያዎች"
    },
    "note": {
     "en": "A simplified road network for practice; real route planning also uses distances (Dijkstra, Level 4).",
     "am": "ለልምምድ የቀለለ የመንገድ ኔትወርክ፤ እውነተኛ የመንገድ ዕቅድ ርቀቶችንም ይጠቀማል (Dijkstra፣ ደረጃ 4)።"
    }
   }
  },
  {
   "t": {
    "en": "Hashing: fast lookup",
    "am": "Hashing፡ ፈጣን ፍለጋ"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Explain how a hash table finds data quickly",
     "Use hashes to check data has not changed"
    ],
    "am": [
     "hash table ዳታን በፍጥነት እንዴት እንደሚያገኝ ማብራራት",
     "ዳታ እንዳልተለወጠ ለመፈተሽ hashes መጠቀም"
    ]
   },
   "l": {
    "en": [
     "Hash function: key → bucket number",
     "Collisions and how they are handled",
     "Python dict and set are hash tables",
     "Checksums: SHA-256 for file integrity"
    ],
    "am": [
     "Hash function፡ key → የbucket ቁጥር",
     "Collisions እና እንዴት እንደሚያዙ",
     "የPython dict እና set hash tables ናቸው",
     "Checksums፡ SHA-256 ለፋይል ታማኝነት"
    ]
   },
   "a": {
    "en": "Build a tiny hash table of student IDs by hand on the board (10 buckets, id % 10), then check a downloaded file with SHA-256.",
    "am": "በሰሌዳው ላይ በእጅ የተማሪ IDs ትንሽ hash table ገንባ (10 buckets፣ id % 10)፣ ከዚያ የወረደ ፋይልን በSHA-256 ፈትሽ።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why is looking up a key in a dictionary fast?",
     "What does a checksum prove?"
    ],
    "am": [
     "በdictionary ውስጥ key መፈለግ ለምን ፈጣን ነው?",
     "checksum ምን ያረጋግጣል?"
    ]
   },
   "qa": {
    "en": [
     "The hash of the key tells Python which bucket to look in, so it does not scan every item.",
     "That the file is exactly the same as the original: any change, even one character, gives a different hash."
    ],
    "am": [
     "የkeyው hash Python የትኛውን bucket እንደሚመለከት ይነግረዋል፤ ስለዚህ እያንዳንዱን ንጥል አይቃኝም።",
     "ፋይሉ ከመጀመሪያው ጋር በትክክል አንድ መሆኑን፡ ማንኛውም ለውጥ፣ አንድ ፊደል እንኳ ቢሆን፣ የተለየ hash ይሰጣል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "How a hash table stores a key",
      "am": "hash table keyን እንዴት እንደሚያስቀምጥ"
     },
     "nodes": [
      {
       "t": {
        "en": "key \"S-1043\"",
        "am": "key «S-1043»"
       }
      },
      {
       "t": {
        "en": "hash(key) % 10",
        "am": "hash(key) % 10"
       }
      },
      {
       "t": {
        "en": "bucket 3",
        "am": "bucket 3"
       }
      },
      {
       "t": {
        "en": "store / find here",
        "am": "እዚህ አስቀምጥ / ፈልግ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import hashlib\nbuckets = [[] for _ in range(10)]                 # a tiny hash table\nfor sid, name in [(1043, \"Hana\"), (2051, \"Dawit\"), (3013, \"Liya\"), (1777, \"Sara\")]:\n    buckets[sid % 10].append((sid, name))          # hash function: id % 10\nprint(\"bucket 3:\", buckets[3], \"<- a collision, kept in a list\")\nprint(\"find 3013 ->\", next(n for s, n in buckets[3013 % 10] if s == 3013))\n\nreport = b\"Teff yield: 1.6 t/ha\"\nprint(\"sha256:\", hashlib.sha256(report).hexdigest()[:16], \"...\")\nprint(\"changed:\", hashlib.sha256(b\"Teff yield: 1.9 t/ha\").hexdigest()[:16], \"... (completely different)\")",
    "out": "bucket 3: [(1043, 'Hana'), (3013, 'Liya')] <- a collision, kept in a list\nfind 3013 -> Liya\nsha256: 993209da94bc5e2d ...\nchanged: 8efa968938f7b775 ... (completely different)",
    "title": {
     "en": "A hand-made hash table and file checksums",
     "am": "በእጅ የተሠራ hash table እና የፋይል checksums"
    }
   }
  },
  {
   "t": {
    "en": "SQL and databases",
    "am": "SQL እና ዳታቤዞች"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Design tables with keys",
     "Query with SELECT, WHERE, JOIN, GROUP BY"
    ],
    "am": [
     "ከkeys ጋር ሰንጠረዦችን መንደፍ",
     "በSELECT፣ WHERE፣ JOIN፣ GROUP BY መጠየቅ"
    ]
   },
   "l": {
    "en": [
     "Tables, rows, primary and foreign keys",
     "SELECT … WHERE … ORDER BY",
     "JOIN two tables",
     "GROUP BY and connect the API to SQLite"
    ],
    "am": [
     "ሰንጠረዦች፣ ረድፎች፣ primary እና foreign keys",
     "SELECT … WHERE … ORDER BY",
     "ሁለት ሰንጠረዦችን JOIN አድርግ",
     "GROUP BY እና APIውን ከSQLite ጋር አገናኝ"
    ]
   },
   "a": {
    "en": "Move your market-price API from a Python list to an SQLite database with two tables (markets, prices) and answer three questions with SQL.",
    "am": "የገበያ ዋጋ APIህን ከPython list ወደ ሁለት ሰንጠረዦች (markets፣ prices) ያሉት SQLite ዳታቤዝ አንቀሳቅስና ሦስት ጥያቄዎችን በSQL መልስ።"
   },
   "m": {
    "en": "Python with sqlite3 (built in)",
    "am": "Python ከsqlite3 ጋር (አብሮ የተሠራ)"
   },
   "q": {
    "en": [
     "What does a JOIN do in SQL?",
     "Why store the town once in markets instead of in every price row?"
    ],
    "am": [
     "በSQL ውስጥ JOIN ምን ያደርጋል?",
     "ከተማውን በእያንዳንዱ የዋጋ ረድፍ ውስጥ ከማስቀመጥ ይልቅ በmarkets ውስጥ አንድ ጊዜ ለምን እናስቀምጣለን?"
    ]
   },
   "qa": {
    "en": [
     "It combines rows from two tables where a key matches, such as each price with its market’s town.",
     "No repeated data, so a correction is made in one place and cannot become inconsistent."
    ],
    "am": [
     "key በሚመሳሰልበት ከሁለት ሰንጠረዦች ረድፎችን ያጣምራል፣ ለምሳሌ እያንዳንዱን ዋጋ ከገበያው ከተማ ጋር።",
     "የተደጋገመ ዳታ የለም፤ ስለዚህ ማስተካከያ በአንድ ቦታ ይደረጋል፣ ወጥነት የሌለውም ሊሆን አይችልም።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "Two linked tables",
      "am": "ሁለት የተገናኙ ሰንጠረዦች"
     },
     "root": {
      "t": {
       "en": "markets (id, town)",
       "am": "markets (id፣ town)"
      }
     },
     "kids": [
      {
       "t": {
        "en": "prices (market_id → markets.id, crop, birr_per_kg, date)",
        "am": "prices (market_id → markets.id፣ crop፣ birr_per_kg፣ date)"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import sqlite3\ndb = sqlite3.connect(\":memory:\")\ndb.executescript(\"\"\"\nCREATE TABLE markets(id INTEGER PRIMARY KEY, town TEXT NOT NULL);\nCREATE TABLE prices(market_id INTEGER REFERENCES markets(id), crop TEXT, birr_per_kg REAL, day TEXT);\nINSERT INTO markets VALUES (1,'Bahir Dar'),(2,'Debre Markos'),(3,'Gondar');\nINSERT INTO prices VALUES (1,'teff',118,'2026-11-10'),(2,'teff',112,'2026-11-10'),(3,'teff',125,'2026-11-10'),\n                          (1,'maize',40,'2026-11-10'),(2,'maize',38,'2026-11-10'),(1,'teff',120,'2026-11-14');\n\"\"\")\nprint(\"cheapest teff:\", db.execute(\"\"\"SELECT m.town, p.birr_per_kg FROM prices p JOIN markets m ON m.id = p.market_id\n                                       WHERE crop = 'teff' ORDER BY birr_per_kg LIMIT 1\"\"\").fetchone())\nfor row in db.execute(\"SELECT crop, COUNT(*), ROUND(AVG(birr_per_kg), 1) FROM prices GROUP BY crop\"):\n    print(\"crop, reports, average:\", row)",
    "out": "cheapest teff: ('Debre Markos', 112.0)\ncrop, reports, average: ('maize', 2, 39.0)\ncrop, reports, average: ('teff', 4, 118.8)",
    "title": {
     "en": "JOIN and GROUP BY on a market database",
     "am": "JOIN እና GROUP BY በየገበያ ዳታቤዝ"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "Linux and the shell",
    "am": "Linux እና shell"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Navigate and manage files from the command line",
     "Combine tools with pipes and write a script"
    ],
    "am": [
     "ፋይሎችን ከትዕዛዝ መስመር ማሰስና ማስተዳደር",
     "መሣሪያዎችን በpipes ማጣመርና script መጻፍ"
    ]
   },
   "l": {
    "en": [
     "pwd, ls, cd, mkdir, cp, mv",
     "cat, head, grep, sort, uniq, wc",
     "Pipes | and redirection >",
     "A bash script to automate a report"
    ],
    "am": [
     "pwd፣ ls፣ cd፣ mkdir፣ cp፣ mv",
     "cat፣ head፣ grep፣ sort፣ uniq፣ wc",
     "Pipes | እና redirection >",
     "ሪፖርትን በራስ-ሰር ለመሥራት bash script"
    ]
   },
   "a": {
    "en": "Write a shell script that reads a market-price CSV and prints the number of reports and the highest teff price per town.",
    "am": "የገበያ ዋጋ CSV የሚያነብና የሪፖርቶችን ቁጥርና በከተማ ከፍተኛውን የጤፍ ዋጋ የሚያትም shell script ጻፍ።"
   },
   "m": {
    "en": "A Linux computer, Raspberry Pi, or WSL on Windows",
    "am": "Linux ኮምፒውተር፣ Raspberry Pi፣ ወይም በWindows ላይ WSL"
   },
   "q": {
    "en": [
     "What does the pipe | do in the shell?",
     "What does > do?"
    ],
    "am": [
     "በshell ውስጥ pipe | ምን ያደርጋል?",
     "> ምን ያደርጋል?"
    ]
   },
   "qa": {
    "en": [
     "It sends the output of one command into the next command as its input.",
     "Writes the output into a file (replacing it); >> adds to the end instead."
    ],
    "am": [
     "የአንዱን ትዕዛዝ ውጤት ወደ ቀጣዩ ትዕዛዝ እንደ ግብዓቱ ይልካል።",
     "ውጤቱን ወደ ፋይል ይጽፋል (ይተካዋል)፤ >> ደግሞ በምትኩ መጨረሻው ላይ ይጨምራል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A pipeline",
      "am": "pipeline"
     },
     "nodes": [
      {
       "t": {
        "en": "grep teff prices.csv",
        "am": "grep teff prices.csv"
       }
      },
      {
       "t": {
        "en": "| cut -d, -f1,3",
        "am": "| cut -d, -f1,3"
       }
      },
      {
       "t": {
        "en": "| sort -t, -k2 -n",
        "am": "| sort -t, -k2 -n"
       }
      },
      {
       "t": {
        "en": "| tail -1",
        "am": "| tail -1"
       },
       "s": {
        "en": "highest price",
        "am": "ከፍተኛው ዋጋ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Bash",
    "code": "echo \"reports per crop:\"\ntail -n +2 prices.csv | cut -d, -f2 | sort | uniq -c\necho \"highest teff price:\"\ngrep ',teff,' prices.csv | sort -t, -k3 -n | tail -1",
    "out": "reports per crop:\n      2 maize\n      3 teff\nhighest teff price:\nGondar,teff,125",
    "title": {
     "en": "Counting and finding with pipes",
     "am": "በpipes መቁጠርና መፈለግ"
    }
   }
  },
  {
   "t": {
    "en": "Team project: issues, branches and review",
    "am": "የቡድን ፕሮጀክት፡ issues፣ branches እና ግምገማ"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Plan work as issues with clear owners",
     "Review a teammate’s pull request helpfully"
    ],
    "am": [
     "ሥራን ግልጽ ባለቤቶች ባሏቸው issues ማቀድ",
     "የቡድን አጋርን pull request በጠቃሚ መንገድ መገምገም"
    ]
   },
   "l": {
    "en": [
     "Roles: product owner, developers, tester",
     "Issues and a simple board: to do, doing, done",
     "One branch and one pull request per issue",
     "Code review checklist"
    ],
    "am": [
     "ሚናዎች፡ product owner፣ developers፣ tester",
     "Issues እና ቀላል ሰሌዳ፡ የሚሠራ፣ እየተሠራ፣ የተሠራ",
     "ለእያንዳንዱ issue አንድ branch እና አንድ pull request",
     "የኮድ ግምገማ ማረጋገጫ ዝርዝር"
    ]
   },
   "a": {
    "en": "In teams of four, build a feature for the market-price app over three weeks using issues, branches, pull requests and a weekly demo.",
    "am": "በአራት ሰዎች ቡድን በሦስት ሳምንታት ውስጥ issuesን፣ branchesን፣ pull requestsን እና ሳምንታዊ ማሳያን በመጠቀም ለየገበያ ዋጋ መተግበሪያው ባሕሪ ገንቡ።"
   },
   "m": {
    "en": "GitHub (free), a shared board",
    "am": "GitHub (ነጻ)፣ የጋራ ሰሌዳ"
   },
   "q": {
    "en": [
     "What makes a good issue?",
     "What should a reviewer check?"
    ],
    "am": [
     "ጥሩ issue ምንድነው?",
     "ገምጋሚ ምን መፈተሽ አለበት?"
    ]
   },
   "qa": {
    "en": [
     "A clear title, what done looks like (acceptance criteria), and one owner.",
     "That it does what the issue asks, has tests, is readable, and has no secrets or obvious bugs; comments are specific and kind."
    ],
    "am": [
     "ግልጽ ርዕስ፣ የተጠናቀቀው ምን እንደሚመስል (acceptance criteria)፣ እና አንድ ባለቤት።",
     "issueኡ የሚጠይቀውን እንደሚያደርግ፣ ፈተናዎች እንዳሉት፣ እንደሚነበብ፣ ሚስጥሮች ወይም ግልጽ ስህተቶች እንደሌሉት፤ አስተያየቶች ግልጽና ደግ ናቸው።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "From issue to merged feature",
      "am": "ከissue ወደ የተዋሃደ ባሕሪ"
     },
     "nodes": [
      {
       "t": {
        "en": "Issue #12",
        "am": "Issue #12"
       },
       "s": {
        "en": "acceptance criteria",
        "am": "acceptance criteria"
       }
      },
      {
       "t": {
        "en": "Branch",
        "am": "Branch"
       }
      },
      {
       "t": {
        "en": "Pull request",
        "am": "Pull request"
       },
       "s": {
        "en": "tests pass",
        "am": "ፈተናዎች ያልፋሉ"
       }
      },
      {
       "t": {
        "en": "Review",
        "am": "ግምገማ"
       }
      },
      {
       "t": {
        "en": "Merge + close #12",
        "am": "አዋህድ + #12ን ዝጋ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Markdown (pull request description)",
    "code": "## What\nAdds a \"lowest price this week\" card to the market page (closes #12).\n\n## How\n- New function `lowest_this_week(rows)` in prices.py\n- Card rendered with textContent (no innerHTML)\n\n## Tests\n- test_lowest_this_week: empty list, one market, ties\n- Manual: checked on a phone in Amharic and English\n\n## Screenshots\n(attach before / after)",
    "title": {
     "en": "A pull request a reviewer can understand",
     "am": "ገምጋሚ ሊረዳው የሚችል pull request"
    }
   }
  },
  {
   "t": {
    "en": "Networks and security",
    "am": "ኔትወርኮችና ደህንነት"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Protect accounts with strong passwords and two-factor authentication",
     "Explain encryption and recognise phishing"
    ],
    "am": [
     "መለያዎችን በጠንካራ የይለፍ ቃሎችና በtwo-factor authentication መጠበቅ",
     "ምስጠራን ማብራራትና phishingን መለየት"
    ]
   },
   "l": {
    "en": [
     "Passwords: length beats complexity; password managers",
     "Hashing passwords with a salt",
     "Encryption: HTTPS and the padlock",
     "Phishing: SMS and mobile-money scams"
    ],
    "am": [
     "የይለፍ ቃሎች፡ ርዝመት ከውስብስብነት ይበልጣል፤ password managers",
     "የይለፍ ቃሎችን ከsalt ጋር hash ማድረግ",
     "ምስጠራ፡ HTTPS እና ቁልፉ",
     "Phishing፡ የSMS እና የሞባይል ገንዘብ ማጭበርበሮች"
    ]
   },
   "a": {
    "en": "Run a \"spot the scam\" session with real-looking (made-up) SMS and e-mail examples, then set up two-factor authentication on a school account.",
    "am": "እውነተኛ በሚመስሉ (የተፈጠሩ) የSMS እና የኢሜል ምሳሌዎች የ«ማጭበርበሩን ለይ» ክፍለ ጊዜ አካሂዱ፣ ከዚያ በትምህርት ቤት መለያ ላይ two-factor authentication አዘጋጁ።"
   },
   "m": {
    "en": "Python, example messages on cards",
    "am": "Python፣ በካርዶች ላይ የምሳሌ መልእክቶች"
   },
   "q": {
    "en": [
     "Why store a password hash instead of the password?",
     "Name two signs of a phishing message."
    ],
    "am": [
     "ከየይለፍ ቃሉ ይልቅ የይለፍ ቃሉን hash ለምን እናስቀምጣለን?",
     "የphishing መልእክት ሁለት ምልክቶችን ጥቀስ።"
    ]
   },
   "qa": {
    "en": [
     "If the database leaks, attackers get hashes, not passwords; a salt and a slow hash make guessing very costly.",
     "Urgency or threats (\"your account closes today\"), and a request for your PIN, password or a code; also odd links or senders."
    ],
    "am": [
     "ዳታቤዙ ቢወጣ አጥቂዎች የይለፍ ቃሎችን ሳይሆን hashesን ያገኛሉ፤ salt እና ቀርፋፋ hash መገመትን በጣም ውድ ያደርጋሉ።",
     "ችኮላ ወይም ማስፈራሪያ («መለያህ ዛሬ ይዘጋል»)፣ እና የPIN፣ የይለፍ ቃል ወይም ኮድ ጥያቄ፤ እንዲሁም እንግዳ ማገናኛዎች ወይም ላኪዎች።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Spot the scam",
      "am": "ማጭበርበሩን ለይ"
     },
     "cols": [
      {
       "h": {
        "en": "Scam",
        "am": "ማጭበርበር"
       },
       "items": {
        "en": [
         "\"You won 50,000 birr! Send your PIN to claim today\"",
         "urgency + asks for a secret"
        ],
        "am": [
         "«50,000 ብር አሸንፈሃል! ዛሬ ለመቀበል PINህን ላክ»",
         "ችኮላ + ሚስጥር ይጠይቃል"
        ]
       },
       "tone": "bad"
      },
      {
       "h": {
        "en": "Genuine",
        "am": "እውነተኛ"
       },
       "items": {
        "en": [
         "\"You received 300 birr from Hana. Balance: …\"",
         "never asks for your PIN"
        ],
        "am": [
         "«ከሐና 300 ብር ተቀብለሃል። ቀሪ ሂሳብ፡ …»",
         "PINህን በፍጹም አይጠይቅም"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import hashlib, os, math\ndef hash_password(pw, salt=None):\n    salt = salt or os.urandom(16)\n    return salt, hashlib.pbkdf2_hmac(\"sha256\", pw.encode(), salt, 200_000)   # slow on purpose\nsalt, stored = hash_password(\"teff-harvest-2026-blue\")\nprint(\"login correct:\", hash_password(\"teff-harvest-2026-blue\", salt)[1] == stored)\nprint(\"login wrong:  \", hash_password(\"teff-harvest-2026-blu\", salt)[1] == stored)\nfor pw, alphabet in [(\"Tz#9q\", 94), (\"teffharvestbluemoon\", 26), (\"teff-harvest-2026-blue\", 40)]:\n    print(f\"{pw:24s} ~{len(pw) * math.log2(alphabet):4.0f} bits of guessing work\")",
    "out": "login correct: True\nlogin wrong:   False\nTz#9q                    ~  33 bits of guessing work\nteffharvestbluemoon      ~  89 bits of guessing work\nteff-harvest-2026-blue   ~ 117 bits of guessing work",
    "title": {
     "en": "Salted password hashing, and why length matters",
     "am": "ከsalt ጋር የይለፍ ቃል hashing፣ እና ርዝመት ለምን አስፈላጊ ነው"
    },
    "note": {
     "en": "The \"bits\" are a rough upper estimate for random characters; real passwords made of common words are weaker.",
     "am": "«bits» ለዘፈቀደ ፊደላት ግምታዊ ከፍተኛ ግምት ነው፤ ከተለመዱ ቃላት የተሠሩ እውነተኛ የይለፍ ቃሎች ደካማ ናቸው።"
    }
   }
  },
  {
   "t": {
    "en": "Ethics and law in computing",
    "am": "በኮምፒውቲንግ ውስጥ ሥነ-ምግባርና ሕግ"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Apply privacy, consent and data ownership to a real app",
     "Spot bias in data and decisions"
    ],
    "am": [
     "ግላዊነትን፣ ስምምነትንና የዳታ ባለቤትነትን በእውነተኛ መተግበሪያ ላይ መተግበር",
     "በዳታና በውሳኔዎች ውስጥ አድልዎን መለየት"
    ]
   },
   "l": {
    "en": [
     "Privacy and data protection law",
     "Consent and data minimisation",
     "Who owns farmer data?",
     "Bias: whose data is missing?"
    ],
    "am": [
     "ግላዊነትና የዳታ ጥበቃ ሕግ",
     "ስምምነትና የዳታ መቀነስ",
     "የገበሬ ዳታ ባለቤት ማነው?",
     "አድልዎ፡ የማን ዳታ ጠፍቷል?"
    ]
   },
   "a": {
    "en": "Debate: an app collects farmers’ locations and yields for free advice and sells summaries to traders. Who benefits, what is fair, and what rules should apply?",
    "am": "ክርክር፡ መተግበሪያ ለነጻ ምክር የገበሬዎችን ቦታና ምርት ይሰበስባል፣ ማጠቃለያዎችንም ለነጋዴዎች ይሸጣል። ማን ይጠቀማል፣ ፍትሐዊ የሆነው ምንድነው፣ የትኞቹ ሕጎች መተግበር አለባቸው?"
   },
   "m": {
    "en": "Case study cards, the national data protection law (summary)",
    "am": "የጉዳይ ጥናት ካርዶች፣ የብሔራዊ የዳታ ጥበቃ ሕግ (ማጠቃለያ)"
   },
   "q": {
    "en": [
     "Who owns the data your app collects?",
     "How can a model trained on data from towns be unfair to rural users?"
    ],
    "am": [
     "መተግበሪያህ የሚሰበስበው ዳታ ባለቤት ማነው?",
     "ከከተሞች በተገኘ ዳታ የሰለጠነ ሞዴል ለገጠር ተጠቃሚዎች እንዴት ፍትሐዊ ያልሆነ ሊሆን ይችላል?"
    ]
   },
   "qa": {
    "en": [
     "The people it describes have rights over it under data protection law; the app should collect only what it needs, with clear consent, and share benefits fairly.",
     "Rural patterns are missing or rare in its training data, so its predictions are worse for them."
    ],
    "am": [
     "የሚገልጻቸው ሰዎች በዳታ ጥበቃ ሕግ መሠረት መብት አላቸው፤ መተግበሪያው የሚያስፈልገውን ብቻ፣ በግልጽ ስምምነት መሰብሰብና ጥቅሞችን በፍትሐዊነት ማጋራት አለበት።",
     "የገጠር ንድፎች በሥልጠና ዳታው ውስጥ ጠፍተዋል ወይም ጥቂት ናቸው፤ ስለዚህ ትንበያዎቹ ለእነሱ የከፋ ናቸው።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Privacy by design",
      "am": "በንድፍ ግላዊነት"
     },
     "nodes": [
      {
       "t": {
        "en": "Collect only what you need",
        "am": "የሚያስፈልግህን ብቻ ሰብስብ"
       }
      },
      {
       "t": {
        "en": "Clear consent in their language",
        "am": "በቋንቋቸው ግልጽ ስምምነት"
       }
      },
      {
       "t": {
        "en": "Protect and limit access",
        "am": "ጠብቅና መዳረሻን ገድብ"
       }
      },
      {
       "t": {
        "en": "Let people see and delete",
        "am": "ሰዎች እንዲያዩና እንዲሰርዙ ፍቀድ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "records = [{\"name\": \"Hana Tesfaye\", \"phone\": \"0911223344\", \"kebele\": \"Zenzelma\", \"teff_t_ha\": 1.6},\n           {\"name\": \"Dawit Alemu\", \"phone\": \"0922334455\", \"kebele\": \"Zenzelma\", \"teff_t_ha\": 1.9},\n           {\"name\": \"Liya Bekele\", \"phone\": \"0933445566\", \"kebele\": \"Sebatamit\", \"teff_t_ha\": 1.4}]\n# data minimisation: traders only need the average per kebele, not names or phones\nfrom collections import defaultdict\nby_kebele = defaultdict(list)\nfor r in records:\n    by_kebele[r[\"kebele\"]].append(r[\"teff_t_ha\"])\nshared = {k: {\"farms\": len(v), \"avg_teff_t_ha\": round(sum(v) / len(v), 2)} for k, v in by_kebele.items() if len(v) >= 2}\nprint(\"shared with traders:\", shared)\nprint(\"withheld: kebeles with fewer than 2 farms (a single farm could be identified)\")",
    "out": "shared with traders: {'Zenzelma': {'farms': 2, 'avg_teff_t_ha': 1.75}}\nwithheld: kebeles with fewer than 2 farms (a single farm could be identified)",
    "title": {
     "en": "Sharing summaries, not personal data",
     "am": "የግል ዳታን ሳይሆን ማጠቃለያዎችን ማጋራት"
    }
   }
  },
  {
   "t": {
    "en": "Machine learning with scikit-learn",
    "am": "Machine learning በscikit-learn"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Train, test and evaluate a model honestly",
     "Read accuracy and a confusion matrix"
    ],
    "am": [
     "ሞዴልን በታማኝነት ማሰልጠን፣ መፈተሽና መገምገም",
     "accuracyን እና confusion matrixን ማንበብ"
    ]
   },
   "l": {
    "en": [
     "Features, labels, train/test split",
     "A decision tree classifier",
     "Accuracy and the confusion matrix",
     "Compare with a simple baseline"
    ],
    "am": [
     "Features፣ labels፣ train/test split",
     "Decision tree classifier",
     "Accuracy እና confusion matrix",
     "ከቀላል baseline ጋር አወዳድር"
    ]
   },
   "a": {
    "en": "Predict whether a farm’s seedlings are at risk of rust from weather features, and compare your model with a \"always say no risk\" baseline.",
    "am": "የአንድ እርሻ ችግኞች ከአየር ሁኔታ features ለዝገት አደጋ የተጋለጡ መሆናቸውን ተንብይ፣ ሞዴልህንም ከ«ሁልጊዜ አደጋ የለም በል» baseline ጋር አወዳድር።"
   },
   "m": {
    "en": "Python with scikit-learn",
    "am": "Python ከscikit-learn ጋር"
   },
   "q": {
    "en": [
     "Why do we split data into train and test sets?",
     "Why compare with a baseline?"
    ],
    "am": [
     "ዳታን ለምን ወደ train እና test sets እንከፍላለን?",
     "ከbaseline ጋር ለምን እናወዳድራለን?"
    ]
   },
   "qa": {
    "en": [
     "To measure performance on data the model has never seen; training accuracy is too optimistic.",
     "If most farms have no rust, \"always no\" already scores high; the model must beat that to be useful."
    ],
    "am": [
     "ሞዴሉ ፈጽሞ ባላየው ዳታ ላይ አፈጻጸሙን ለመለካት፤ የሥልጠና accuracy ከልክ በላይ ተስፋ ሰጪ ነው።",
     "አብዛኞቹ እርሻዎች ዝገት ከሌላቸው «ሁልጊዜ አይደለም» አስቀድሞ ከፍተኛ ውጤት ያገኛል፤ ሞዴሉ ጠቃሚ ለመሆን ያንን ማሸነፍ አለበት።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "Reading a confusion matrix",
      "am": "confusion matrixን ማንበብ"
     },
     "layers": [
      {
       "t": {
        "en": "True negatives: no rust, predicted no",
        "am": "እውነተኛ አሉታዎች፡ ዝገት የለም፣ አይደለም ተብሏል"
       }
      },
      {
       "t": {
        "en": "False positives: predicted rust, none",
        "am": "የሐሰት አዎንታዎች፡ ዝገት ተብሏል፣ የለም"
       }
      },
      {
       "t": {
        "en": "False negatives: missed rust (costly!)",
        "am": "የሐሰት አሉታዎች፡ ያመለጠ ዝገት (ውድ!)"
       }
      },
      {
       "t": {
        "en": "True positives: rust caught",
        "am": "እውነተኛ አዎንታዎች፡ የተያዘ ዝገት"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import accuracy_score, confusion_matrix\nrng = np.random.default_rng(5); n = 600\nwet_days = rng.integers(0, 8, n); temp = rng.normal(18, 4, n); resistant = rng.integers(0, 2, n)\nrisk = (wet_days >= 4) & (temp > 15) & (resistant == 0)\nrust = np.where(rng.random(n) < 0.9, risk, ~risk)                 # 10% label noise\nX = np.column_stack([wet_days, temp, resistant])\nX_tr, X_te, y_tr, y_te = train_test_split(X, rust, test_size=0.3, random_state=0, stratify=rust)\nmodel = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_tr, y_tr)\npred = model.predict(X_te)\nprint(f\"baseline 'always no rust': {accuracy_score(y_te, np.zeros_like(y_te)):.2f}\")\nprint(f\"decision tree:             {accuracy_score(y_te, pred):.2f}\")\nprint(\"confusion matrix [[TN FP] [FN TP]]:\", confusion_matrix(y_te, pred).tolist())",
    "out": "baseline 'always no rust': 0.72\ndecision tree:             0.89\nconfusion matrix [[TN FP] [FN TP]]: [[128, 2], [17, 33]]",
    "title": {
     "en": "Rust-risk classifier vs a baseline",
     "am": "የዝገት አደጋ classifier vs baseline"
    },
    "note": {
     "en": "Simulated data for practice: the real rule is \"4+ wet days, warm, susceptible variety\", with 10% noise.",
     "am": "ለልምምድ የተመሰለ ዳታ፡ እውነተኛው ሕግ «4+ እርጥብ ቀናት፣ ሞቃት፣ ተጋላጭ ዝርያ» ነው፣ ከ10% ጫጫታ ጋር።"
    }
   }
  },
  {
   "t": {
    "en": "Model project: forecast and explain its limits",
    "am": "የሞዴል ፕሮጀክት፡ ተንብይና ገደቦቹን አብራራ"
   },
   "d": {
    "en": "6 weeks · 4–6 h per week",
    "am": "6 ሳምንታት · በሳምንት 4–6 ሰዓት"
   },
   "o": {
    "en": [
     "Build a forecasting model end to end",
     "Report error honestly and state limits"
    ],
    "am": [
     "የትንበያ ሞዴልን ከመጀመሪያ እስከ መጨረሻ መገንባት",
     "ስህተትን በታማኝነት መዘገብና ገደቦችን መግለጽ"
    ]
   },
   "l": {
    "en": [
     "Define the question and the decision it supports",
     "A baseline: last week’s price",
     "A model with trend and season; test on the latest weeks",
     "A one-page report with limits"
    ],
    "am": [
     "ጥያቄውንና የሚደግፈውን ውሳኔ ግለጽ",
     "baseline፡ የባለፈው ሳምንት ዋጋ",
     "ከአዝማሚያና ከወቅት ጋር ያለ ሞዴል፤ በቅርብ ሳምንታት ላይ ፈትሽ",
     "ከገደቦች ጋር የአንድ ገጽ ሪፖርት"
    ]
   },
   "a": {
    "en": "Forecast next week’s teff price for your market, compare with the \"same as last week\" baseline, and present a one-page report with the error and three limits.",
    "am": "ለገበያህ የሚቀጥለውን ሳምንት የጤፍ ዋጋ ተንብይ፣ ከ«እንደ ባለፈው ሳምንት» baseline ጋር አወዳድር፣ ከስህተቱና ከሦስት ገደቦች ጋር የአንድ ገጽ ሪፖርት አቅርብ።"
   },
   "m": {
    "en": "Python with scikit-learn, two years of weekly prices",
    "am": "Python ከscikit-learn ጋር፣ የሁለት ዓመታት ሳምንታዊ ዋጋዎች"
   },
   "q": {
    "en": [
     "Why test on the most recent weeks, not random weeks?",
     "Name a limit of a price model."
    ],
    "am": [
     "በዘፈቀደ ሳምንታት ሳይሆን በቅርብ ሳምንታት ለምን እንፈትሻለን?",
     "የዋጋ ሞዴልን አንድ ገደብ ጥቀስ።"
    ]
   },
   "qa": {
    "en": [
     "A forecast is always about the future, so the test must also be later than the training data.",
     "It cannot foresee shocks it has never seen, such as a drought, a road closure or a new policy."
    ],
    "am": [
     "ትንበያ ሁልጊዜ ስለ ወደፊት ነው፤ ስለዚህ ፈተናውም ከሥልጠና ዳታው በኋላ መሆን አለበት።",
     "አይቶ የማያውቃቸውን ድንገተኛ ክስተቶች፣ እንደ ድርቅ፣ የመንገድ መዘጋት ወይም አዲስ ፖሊሲ፣ መተንበይ አይችልም።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "An honest forecast project",
      "am": "ታማኝ የትንበያ ፕሮጀክት"
     },
     "nodes": [
      {
       "t": {
        "en": "Question + decision",
        "am": "ጥያቄ + ውሳኔ"
       }
      },
      {
       "t": {
        "en": "Baseline",
        "am": "Baseline"
       }
      },
      {
       "t": {
        "en": "Model",
        "am": "ሞዴል"
       }
      },
      {
       "t": {
        "en": "Test on the latest weeks",
        "am": "በቅርብ ሳምንታት ፈትሽ"
       }
      },
      {
       "t": {
        "en": "Report error + limits",
        "am": "ስህተት + ገደቦችን ዘግብ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import numpy as np\nfrom sklearn.linear_model import LinearRegression\nrng = np.random.default_rng(12); w = np.arange(104)\nprice = 95 + 0.15 * w + 6 * np.sin(2 * np.pi * w / 52) + rng.normal(0, 2.5, 104)\nfeats = lambda t: np.column_stack([t, np.sin(2 * np.pi * t / 52), np.cos(2 * np.pi * t / 52)])\ntrain, test = w < 92, w >= 92                                 # the last 12 weeks are the test\nmodel = LinearRegression().fit(feats(w[train]), price[train])\nmae_model = np.mean(np.abs(model.predict(feats(w[test])) - price[test]))\nmae_naive = np.mean(np.abs(price[test][1:] - price[test][:-1]))   # \"same as last week\"\nprint(f\"error on the last 12 weeks: model {mae_model:.2f} birr/kg, baseline {mae_naive:.2f} birr/kg\")\nprint(f\"forecast for week 105: {model.predict(feats(np.array([104])))[0]:.1f} birr/kg\")",
    "out": "error on the last 12 weeks: model 2.16 birr/kg, baseline 2.98 birr/kg\nforecast for week 105: 111.7 birr/kg",
    "title": {
     "en": "Model vs \"same as last week\"",
     "am": "ሞዴል vs «እንደ ባለፈው ሳምንት»"
    },
    "note": {
     "en": "Simulated prices for practice. Limits to report: shocks (drought, roads, policy), missing holidays, and that the error grows further ahead.",
     "am": "ለልምምድ የተመሰሉ ዋጋዎች። የሚዘገቡ ገደቦች፡ ድንገተኛ ክስተቶች (ድርቅ፣ መንገዶች፣ ፖሊሲ)፣ የጎደሉ በዓላት፣ እና ስህተቱ ወደ ፊት በራቀ ቁጥር እንደሚያድግ።"
    }
   }
  }
 ]
];
