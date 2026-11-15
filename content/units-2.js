/* Level 2: each year-long module split into 6 units. Generated; code outputs come from running the code. */
window.UNITS = window.UNITS || {};
window.UNITS[2] = [
 [
  {
   "t": {
    "en": "Same idea, new language",
    "am": "ያው ሐሳብ፣ አዲስ ቋንቋ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Translate a Scratch script into Python line by line",
     "Run a Python file and read an error message"
    ],
    "am": [
     "የScratch ስክሪፕትን መስመር በመስመር ወደ Python መተርጎም",
     "የPython ፋይል ማስኬድና የስህተት መልእክት ማንበብ"
    ]
   },
   "l": {
    "en": [
     "Install Thonny or open an online Python",
     "Blocks → lines: say → print, repeat → for",
     "Indentation shows what is inside a loop",
     "Read and fix your first error message"
    ],
    "am": [
     "Thonnyን ጫን ወይም በኢንተርኔት Python ክፈት",
     "ብሎኮች → መስመሮች፡ say → print፣ repeat → for",
     "ወደ ውስጥ መግባት (indentation) በloop ውስጥ ያለውን ያሳያል",
     "የመጀመሪያ የስህተት መልእክትህን አንብበህ አስተካክል"
    ]
   },
   "a": {
    "en": "Rebuild your Grade 1 \"repeat 4\" square program in Python, using text instead of drawing: print the four steps the sprite would take.",
    "am": "የ1ኛ ክፍል «repeat 4» የካሬ ፕሮግራምህን በPython እንደገና ገንባ፣ ከሥዕል ይልቅ ጽሑፍ በመጠቀም፡ spriteኡ የሚወስዳቸውን አራት እርምጃዎች አትም።"
   },
   "m": {
    "en": "Computer with Thonny (free) or a phone with an online Python",
    "am": "Thonny (ነጻ) ያለው ኮምፒውተር ወይም በኢንተርኔት Python ያለው ስልክ"
   },
   "q": {
    "en": [
     "What does indentation mean in Python?",
     "Which Python word does what Scratch’s \"repeat 4\" does?"
    ],
    "am": [
     "በPython ውስጥ indentation ምን ማለት ነው?",
     "የScratchን «repeat 4» የሚያደርገው የትኛው የPython ቃል ነው?"
    ]
   },
   "qa": {
    "en": [
     "The indented lines belong inside the loop or if above them, like blocks inside a C-block in Scratch.",
     "for, as in: for i in range(4):"
    ],
    "am": [
     "ወደ ውስጥ የገቡት መስመሮች ከላያቸው ባለው loop ወይም if ውስጥ ናቸው፣ በScratch ውስጥ በC-block ውስጥ እንዳሉ ብሎኮች።",
     "for፣ እንደ፡ for i in range(4):"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Scratch blocks and Python lines",
      "am": "የScratch ብሎኮችና የPython መስመሮች"
     },
     "cols": [
      {
       "h": {
        "en": "Scratch",
        "am": "Scratch"
       },
       "items": {
        "en": [
         "repeat 4",
         "   move 100 steps",
         "   turn 90 degrees"
        ],
        "am": [
         "4 ጊዜ ድገም",
         "   100 እርምጃ ሂድ",
         "   90 ዲግሪ ዙር"
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
         "for side in range(4):",
         "    print(\"move 100\")",
         "    print(\"turn 90\")"
        ],
        "am": [
         "for side in range(4):",
         "    print(\"move 100\")",
         "    print(\"turn 90\")"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "for side in range(1, 5):          # the indented lines repeat 4 times\n    print(f\"side {side}: move 100 steps, turn right 90 degrees\")\nprint(\"square finished: 4 x 90 =\", 4 * 90, \"degrees\")",
    "out": "side 1: move 100 steps, turn right 90 degrees\nside 2: move 100 steps, turn right 90 degrees\nside 3: move 100 steps, turn right 90 degrees\nside 4: move 100 steps, turn right 90 degrees\nsquare finished: 4 x 90 = 360 degrees",
    "title": {
     "en": "Scratch’s square, written in Python",
     "am": "የScratch ካሬ በPython ተጽፎ"
    }
   }
  },
  {
   "t": {
    "en": "print and input: talking programs",
    "am": "print እና input፡ የሚነጋገሩ ፕሮግራሞች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Show text with print and get text with input",
     "Join text with f-strings"
    ],
    "am": [
     "በprint ጽሑፍ ማሳየትና በinput ጽሑፍ መቀበል",
     "ጽሑፍን በf-strings ማገናኘት"
    ]
   },
   "l": {
    "en": [
     "print(\"Selam\")",
     "name = input(\"Your name? \")",
     "f\"Selam {name}!\" joins text and variables",
     "A bilingual greeting program"
    ],
    "am": [
     "print(\"ሰላም\")",
     "name = input(\"ስምህ? \")",
     "f\"ሰላም {name}!\" ጽሑፍንና variablesን ያገናኛል",
     "ባለሁለት ቋንቋ የሰላምታ ፕሮግራም"
    ]
   },
   "a": {
    "en": "Write a program that asks for a name and a language (am/en) and greets the user in that language.",
    "am": "ስምና ቋንቋ (am/en) የሚጠይቅና ተጠቃሚውን በዚያ ቋንቋ ሰላም የሚል ፕሮግራም ጻፍ።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What does input() give back?",
     "What does the f in f\"…\" do?"
    ],
    "am": [
     "input() ምን ይመልሳል?",
     "በf\"…\" ውስጥ ያለው f ምን ያደርጋል?"
    ]
   },
   "qa": {
    "en": [
     "Always text (a string), whatever the user types.",
     "It lets you put variables inside the text with curly brackets, like {name}."
    ],
    "am": [
     "ተጠቃሚው ምንም ቢጽፍ ሁልጊዜ ጽሑፍ (string)።",
     "በጽሑፉ ውስጥ variablesን በዘንባባ ቅንፎች እንድታስገባ ያስችላል፣ እንደ {name}።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A talking program",
      "am": "የሚነጋገር ፕሮግራም"
     },
     "nodes": [
      {
       "t": {
        "en": "input()",
        "am": "input()"
       },
       "s": {
        "en": "user types \"Hana\", \"am\"",
        "am": "ተጠቃሚው «Hana»፣ «am» ይጽፋል"
       }
      },
      {
       "t": {
        "en": "if language == \"am\"",
        "am": "if language == \"am\""
       }
      },
      {
       "t": {
        "en": "print()",
        "am": "print()"
       },
       "s": {
        "en": "\"ሰላም Hana!\"",
        "am": "«ሰላም Hana!»"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "def greet(name, language):\n    if language == \"am\":\n        return f\"ሰላም {name}! እንኳን ደህና መጣህ።\"\n    return f\"Hello {name}! Welcome.\"\n# in class: name = input(\"Name? \") and language = input(\"am or en? \")\nfor name, language in [(\"Hana\", \"am\"), (\"Tesfaye\", \"en\")]:\n    print(greet(name, language))",
    "out": "ሰላም Hana! እንኳን ደህና መጣህ።\nHello Tesfaye! Welcome.",
    "title": {
     "en": "A bilingual greeting",
     "am": "ባለሁለት ቋንቋ ሰላምታ"
    }
   }
  },
  {
   "t": {
    "en": "Variables and maths: market calculator",
    "am": "Variables እና ሒሳብ፡ የገበያ ማስሊያ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Store numbers in variables and calculate",
     "Convert text to numbers with int() and float()"
    ],
    "am": [
     "ቁጥሮችን በvariables ማስቀመጥና ማስላት",
     "ጽሑፍን በint() እና float() ወደ ቁጥሮች መቀየር"
    ]
   },
   "l": {
    "en": [
     "+ − × ÷ and // and %",
     "int vs float",
     "Convert input to a number",
     "Market calculator with change"
    ],
    "am": [
     "+ − × ÷ እና // እና %",
     "int vs float",
     "inputን ወደ ቁጥር ቀይር",
     "ከመልስ ገንዘብ ጋር የገበያ ማስሊያ"
    ]
   },
   "a": {
    "en": "Build a market calculator: price per kilo, kilos, money paid → total and change in birr.",
    "am": "የገበያ ማስሊያ ገንባ፡ በኪሎ ዋጋ፣ ኪሎዎች፣ የተከፈለ ገንዘብ → ጠቅላላና መልስ በብር።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why does 2 + \"3\" give an error?",
     "What does 17 // 5 give, and 17 % 5?"
    ],
    "am": [
     "2 + \"3\" ለምን ስህተት ይሰጣል?",
     "17 // 5 ምን ይሰጣል፣ 17 % 5ስ?"
    ]
   },
   "qa": {
    "en": [
     "You cannot add a number and text; convert first: 2 + int(\"3\") is 5.",
     "3 (whole times) and 2 (the remainder)."
    ],
    "am": [
     "ቁጥርንና ጽሑፍን መደመር አትችልም፤ መጀመሪያ ቀይር፡ 2 + int(\"3\") 5 ነው።",
     "3 (ሙሉ ጊዜያት) እና 2 (ቀሪው)።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "From text to money",
      "am": "ከጽሑፍ ወደ ገንዘብ"
     },
     "nodes": [
      {
       "t": {
        "en": "\"120\"",
        "am": "\"120\""
       },
       "s": {
        "en": "text from input()",
        "am": "ከinput() የመጣ ጽሑፍ"
       }
      },
      {
       "t": {
        "en": "float(\"120\")",
        "am": "float(\"120\")"
       }
      },
      {
       "t": {
        "en": "120.0 × 3.5",
        "am": "120.0 × 3.5"
       }
      },
      {
       "t": {
        "en": "420.0 birr",
        "am": "420.0 ብር"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "price_per_kilo = float(\"120\")      # from input() in class\nkilos = float(\"3.5\")\npaid = int(\"1000\")\ntotal = price_per_kilo * kilos\nchange = paid - total\nprint(f\"total {total:.2f} birr, paid {paid}, change {change:.2f} birr\")\nprint(\"100-birr notes in the change:\", int(change) // 100, \"| remainder:\", int(change) % 100, \"birr\")",
    "out": "total 420.00 birr, paid 1000, change 580.00 birr\n100-birr notes in the change: 5 | remainder: 80 birr",
    "title": {
     "en": "Market calculator with change",
     "am": "ከመልስ ገንዘብ ጋር የገበያ ማስሊያ"
    }
   }
  },
  {
   "t": {
    "en": "micro:bit with blocks",
    "am": "micro:bit በብሎኮች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Program a micro:bit with MakeCode blocks",
     "Use buttons as events and the LED screen as output"
    ],
    "am": [
     "micro:bitን በMakeCode ብሎኮች ፕሮግራም ማድረግ",
     "ቁልፎችን እንደ ክስተቶች፣ የLED ስክሪኑን እንደ ውጤት መጠቀም"
    ]
   },
   "l": {
    "en": [
     "Meet the micro:bit: buttons, LEDs, sensors",
     "On button A: show a smiley",
     "Simulator first, then download to the board",
     "A dice on shake"
    ],
    "am": [
     "ከmicro:bit ጋር ተዋወቅ፡ ቁልፎች፣ LEDs፣ ሴንሰሮች",
     "በቁልፍ A፡ ፈገግታ አሳይ",
     "መጀመሪያ simulator፣ ከዚያ ወደ ቦርዱ አውርድ",
     "ሲነቀነቅ ዳይስ"
    ]
   },
   "a": {
    "en": "Make a micro:bit \"class vote\": button A counts yes, button B counts no, shake shows the totals.",
    "am": "የmicro:bit «የክፍል ድምፅ» ሥራ፡ ቁልፍ A አዎን ይቆጥራል፣ ቁልፍ B አይደለምን ይቆጥራል፣ መነቅነቅ ድምሮቹን ያሳያል።"
   },
   "m": {
    "en": "micro:bit (or the free online simulator), USB cable",
    "am": "micro:bit (ወይም ነጻው የኢንተርኔት simulator)፣ USB ገመድ"
   },
   "q": {
    "en": [
     "Which part of the micro:bit is the input and which the output?",
     "Why test in the simulator first?"
    ],
    "am": [
     "የmicro:bit የትኛው ክፍል ግብዓት፣ የትኛውስ ውጤት ነው?",
     "ለምን መጀመሪያ በsimulator እንፈትሻለን?"
    ]
   },
   "qa": {
    "en": [
     "Buttons and sensors are inputs; the 5×5 LED screen (and sound) are outputs.",
     "It is fast and free, and you only download when the program works."
    ],
    "am": [
     "ቁልፎችና ሴንሰሮች ግብዓቶች ናቸው፤ 5×5 የLED ስክሪኑ (እና ድምፅ) ውጤቶች ናቸው።",
     "ፈጣንና ነጻ ነው፤ ፕሮግራሙ ሲሠራ ብቻ ታወርዳለህ።"
    ]
   },
   "dg": [
    {
     "type": "blocks",
     "title": {
      "en": "Class vote in MakeCode",
      "am": "የክፍል ድምፅ በMakeCode"
     },
     "blocks": [
      {
       "t": {
        "en": "on start: set yes to 0, set no to 0",
        "am": "ሲጀምር፡ yesን 0፣ noን 0 አድርግ"
       },
       "c": "data"
      },
      {
       "t": {
        "en": "on button A pressed: change yes by 1",
        "am": "ቁልፍ A ሲጫን፡ yesን በ1 ቀይር"
       },
       "c": "event"
      },
      {
       "t": {
        "en": "on button B pressed: change no by 1",
        "am": "ቁልፍ B ሲጫን፡ noን በ1 ቀይር"
       },
       "c": "event"
      },
      {
       "t": {
        "en": "on shake: show \"Y\" yes \"N\" no",
        "am": "ሲነቀነቅ፡ \"Y\" yes \"N\" no አሳይ"
       },
       "c": "looks"
      }
     ]
    }
   ],
   "ex": {
    "lang": "MicroPython (micro:bit)",
    "code": "from microbit import *\nyes = no = 0\nwhile True:\n    if button_a.was_pressed():\n        yes += 1\n    if button_b.was_pressed():\n        no += 1\n    if accelerometer.was_gesture(\"shake\"):\n        display.scroll(\"Y\" + str(yes) + \" N\" + str(no))",
    "title": {
     "en": "The same vote in MicroPython",
     "am": "ያው ድምፅ በMicroPython"
    },
    "note": {
     "en": "Runs on the micro:bit or its online simulator (not run in this build).",
     "am": "በmicro:bit ወይም በኢንተርኔት simulatorኡ ላይ ይሠራል (በዚህ ግንባታ አልተሠራም)።"
    }
   }
  },
  {
   "t": {
    "en": "micro:bit sensors",
    "am": "የmicro:bit ሴንሰሮች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Read temperature and light level",
     "Log readings over time and look for patterns"
    ],
    "am": [
     "ሙቀትንና የብርሃን መጠንን ማንበብ",
     "ንባቦችን በጊዜ ሂደት መመዝገብና ንድፎችን መፈለግ"
    ]
   },
   "l": {
    "en": [
     "temperature(): degrees Celsius",
     "display.read_light_level(): 0–255",
     "Record every 10 minutes for a day",
     "Is it warmer in the sun or the shade?"
    ],
    "am": [
     "temperature()፡ ዲግሪ ሴልሲየስ",
     "display.read_light_level()፡ 0–255",
     "ለአንድ ቀን በየ10 ደቂቃው መዝግብ",
     "በፀሐይ ወይስ በጥላ ይሞቃል?"
    ]
   },
   "a": {
    "en": "Compare temperature in a sunny spot and under a tree, every 30 minutes for one school day, and explain why farmers use shade for seedlings.",
    "am": "በፀሐያማ ቦታና በዛፍ ሥር ያለውን ሙቀት በአንድ የትምህርት ቀን በየ30 ደቂቃው አወዳድር፤ ገበሬዎች ለችግኞች ለምን ጥላ እንደሚጠቀሙ አብራራ።"
   },
   "m": {
    "en": "micro:bit, battery pack, notebook",
    "am": "micro:bit፣ የባትሪ ጥቅል፣ ማስታወሻ ደብተር"
   },
   "q": {
    "en": [
     "Which micro:bit sensor measures temperature?",
     "Why take readings at the same times in both places?"
    ],
    "am": [
     "የትኛው የmicro:bit ሴንሰር ሙቀትን ይለካል?",
     "በሁለቱም ቦታዎች በተመሳሳይ ጊዜ ለምን ንባቦችን እንወስዳለን?"
    ]
   },
   "qa": {
    "en": [
     "The temperature sensor inside the processor chip, read with temperature(); it reads a little high when the board is busy.",
     "So the only difference is the place (sun or shade), making it a fair test."
    ],
    "am": [
     "በprocessor ቺፑ ውስጥ ያለው የሙቀት ሴንሰር፣ በtemperature() ይነበባል፤ ቦርዱ ሥራ ሲበዛበት ትንሽ ከፍ ብሎ ያነባል።",
     "ብቸኛው ልዩነት ቦታው (ፀሐይ ወይም ጥላ) እንዲሆን፣ ፍትሐዊ ፈተና እንዲሆን።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A tiny weather station",
      "am": "ትንሽ የአየር ሁኔታ ጣቢያ"
     },
     "nodes": [
      {
       "t": {
        "en": "Sensor",
        "am": "ሴንሰር"
       },
       "s": {
        "en": "temperature, light",
        "am": "ሙቀት፣ ብርሃን"
       }
      },
      {
       "t": {
        "en": "Every 30 min",
        "am": "በየ30 ደቂቃ"
       }
      },
      {
       "t": {
        "en": "Write in the notebook",
        "am": "በማስታወሻ ደብተሩ ጻፍ"
       }
      },
      {
       "t": {
        "en": "Chart + conclusion",
        "am": "ቻርት + ድምዳሜ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "sun   = [22, 25, 29, 32, 34, 33, 30]      # degrees C, readings from 08:00 to 14:00\nshade = [21, 22, 24, 26, 27, 27, 26]\ntimes = [\"08\", \"09\", \"10\", \"11\", \"12\", \"13\", \"14\"]\nfor t, s, h in zip(times, sun, shade):\n    print(f\"{t}:00  sun {s:2d}  shade {h:2d}  difference {s - h:+d}\")\nprint(f\"average difference: {sum(sun) / 7 - sum(shade) / 7:.1f} degrees warmer in the sun\")",
    "out": "08:00  sun 22  shade 21  difference +1\n09:00  sun 25  shade 22  difference +3\n10:00  sun 29  shade 24  difference +5\n11:00  sun 32  shade 26  difference +6\n12:00  sun 34  shade 27  difference +7\n13:00  sun 33  shade 27  difference +6\n14:00  sun 30  shade 26  difference +4\naverage difference: 4.6 degrees warmer in the sun",
    "title": {
     "en": "Sun vs shade readings",
     "am": "የፀሐይ vs የጥላ ንባቦች"
    },
    "note": {
     "en": "Example readings for practice; use your own measurements in class.",
     "am": "ለልምምድ የምሳሌ ንባቦች፤ በክፍል ውስጥ የራስህን ልኬቶች ተጠቀም።"
    }
   }
  },
  {
   "t": {
    "en": "micro:bit in Python",
    "am": "micro:bit በPython"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Write MicroPython for the micro:bit",
     "Use a loop and if to build an alarm"
    ],
    "am": [
     "ለmicro:bit MicroPython መጻፍ",
     "ማንቂያ ለመገንባት loop እና if መጠቀም"
    ]
   },
   "l": {
    "en": [
     "from microbit import *",
     "while True: the forever loop",
     "if light < 50: show a moon",
     "Project: chicken-coop light alarm"
    ],
    "am": [
     "from microbit import *",
     "while True፡ የforever loop",
     "light < 50 ከሆነ፡ ጨረቃ አሳይ",
     "ፕሮጀክት፡ የዶሮ ቤት የብርሃን ማንቂያ"
    ]
   },
   "a": {
    "en": "Build a light alarm for a chicken coop: when it gets dark, the micro:bit beeps so the door is closed against predators.",
    "am": "ለዶሮ ቤት የብርሃን ማንቂያ ገንባ፡ ሲጨልም micro:bitኡ ይጮኻል፤ ስለዚህ በሩ ከአዳኞች ይዘጋል።"
   },
   "m": {
    "en": "micro:bit, speaker or buzzer, battery pack",
    "am": "micro:bit፣ ድምፅ ማጉያ ወይም buzzer፣ የባትሪ ጥቅል"
   },
   "q": {
    "en": [
     "What does while True do?",
     "How did you choose the darkness threshold?"
    ],
    "am": [
     "while True ምን ያደርጋል?",
     "የጨለማውን ወሰን እንዴት መረጥክ?"
    ]
   },
   "qa": {
    "en": [
     "It repeats forever, like Scratch’s forever block.",
     "By reading the light level at dusk on a few evenings and picking a value just above it."
    ],
    "am": [
     "ለዘላለም ይደግማል፣ እንደ የScratch forever ብሎክ።",
     "ለጥቂት ምሽቶች በመሸ ጊዜ የብርሃን መጠኑን በማንበብና ከእሱ ትንሽ ከፍ ያለ እሴት በመምረጥ።"
    ]
   },
   "dg": [
    {
     "type": "blocks",
     "title": {
      "en": "Coop alarm logic",
      "am": "የዶሮ ቤት ማንቂያ ሎጂክ"
     },
     "blocks": [
      {
       "t": {
        "en": "while True (forever)",
        "am": "while True (ለዘላለም)"
       },
       "c": "control",
       "kids": [
        {
         "t": {
          "en": "light = display.read_light_level()",
          "am": "light = display.read_light_level()"
         },
         "c": "data"
        },
        {
         "t": {
          "en": "if light < 40: beep and show a moon",
          "am": "light < 40 ከሆነ፡ ጩህና ጨረቃ አሳይ"
         },
         "c": "sound"
        },
        {
         "t": {
          "en": "else: show a sun · sleep 60 seconds",
          "am": "ካልሆነ፡ ፀሐይ አሳይ · 60 ሰከንድ ተኛ"
         },
         "c": "looks"
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "DARK = 40                                     # chosen from readings at dusk\nreadings = [180, 150, 110, 70, 45, 38, 30]    # light level every 10 minutes in the evening\nfor minute, light in zip(range(0, 70, 10), readings):\n    action = \"BEEP - close the coop\" if light < DARK else \"ok\"\n    print(f\"+{minute:2d} min  light {light:3d}  {action}\")",
    "out": "+ 0 min  light 180  ok\n+10 min  light 150  ok\n+20 min  light 110  ok\n+30 min  light  70  ok\n+40 min  light  45  ok\n+50 min  light  38  BEEP - close the coop\n+60 min  light  30  BEEP - close the coop",
    "title": {
     "en": "Testing the alarm rule on evening readings",
     "am": "የማንቂያ ሕጉን በምሽት ንባቦች መፈተሽ"
    },
    "note": {
     "en": "Test the rule on recorded numbers first; then copy the same if into the micro:bit program.",
     "am": "መጀመሪያ ሕጉን በተመዘገቡ ቁጥሮች ፈትሽ፤ ከዚያ ያንኑ ifን ወደ micro:bit ፕሮግራም ቅዳ።"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "if / elif / else: a grade calculator",
    "am": "if / elif / else፡ የውጤት ማስሊያ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Choose between many options with elif",
     "Order conditions correctly"
    ],
    "am": [
     "በelif ከብዙ አማራጮች መምረጥ",
     "ሁኔታዎችን በትክክል መደርደር"
    ]
   },
   "l": {
    "en": [
     "Comparison: == != < > <= >=",
     "if / elif / else chain",
     "Why order matters: test the highest first",
     "and / or / not"
    ],
    "am": [
     "ንጽጽር፡ == != < > <= >=",
     "የif / elif / else ሰንሰለት",
     "ቅደም ተከተል ለምን አስፈላጊ ነው፡ ከፍተኛውን መጀመሪያ ፈትሽ",
     "and / or / not"
    ]
   },
   "a": {
    "en": "Write a grade calculator for your school’s grading scale and test it with marks at every boundary (89, 90, 79, 80…).",
    "am": "ለትምህርት ቤትህ የውጤት መለኪያ የውጤት ማስሊያ ጻፍና በእያንዳንዱ ወሰን (89፣ 90፣ 79፣ 80…) ባሉ ውጤቶች ፈትሸው።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why test 89 and 90?",
     "What happens if you check \"mark >= 50\" before \"mark >= 90\"?"
    ],
    "am": [
     "89 እና 90ን ለምን እንፈትሻለን?",
     "«mark >= 90»ን ከመፈተሽህ በፊት «mark >= 50»ን ብትፈትሽ ምን ይሆናል?"
    ]
   },
   "qa": {
    "en": [
     "Bugs hide at boundaries: > vs >= changes the grade exactly there.",
     "Every mark of 50 or more stops at the first test, so nobody gets an A."
    ],
    "am": [
     "ስህተቶች በወሰኖች ላይ ይደበቃሉ፡ > vs >= ውጤቱን በትክክል እዚያ ይቀይራል።",
     "50 ወይም ከዚያ በላይ የሆነ እያንዳንዱ ውጤት በመጀመሪያው ፈተና ይቆማል፤ ስለዚህ ማንም A አያገኝም።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Checks from top to bottom",
      "am": "ፍተሻዎች ከላይ ወደ ታች"
     },
     "nodes": [
      {
       "t": {
        "en": "mark ≥ 90 → A",
        "am": "mark ≥ 90 → A"
       }
      },
      {
       "t": {
        "en": "elif ≥ 80 → B",
        "am": "elif ≥ 80 → B"
       }
      },
      {
       "t": {
        "en": "elif ≥ 65 → C",
        "am": "elif ≥ 65 → C"
       }
      },
      {
       "t": {
        "en": "elif ≥ 50 → D",
        "am": "elif ≥ 50 → D"
       }
      },
      {
       "t": {
        "en": "else → F",
        "am": "else → F"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "def grade(mark):\n    if mark >= 90:   return \"A\"\n    elif mark >= 80: return \"B\"\n    elif mark >= 65: return \"C\"\n    elif mark >= 50: return \"D\"\n    else:            return \"F\"\nfor m in [100, 90, 89, 80, 79, 65, 64, 50, 49, 0]:     # test every boundary\n    print(m, grade(m), end=\" | \")\nprint()",
    "out": "100 A | 90 A | 89 B | 80 B | 79 C | 65 C | 64 D | 50 D | 49 F | 0 F |",
    "title": {
     "en": "Grade calculator tested at the boundaries",
     "am": "በወሰኖቹ የተፈተነ የውጤት ማስሊያ"
    }
   }
  },
  {
   "t": {
    "en": "for loops: tables and patterns",
    "am": "for loops፡ ሰንጠረዦችና ንድፎች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Repeat with for and range()",
     "Nest one loop inside another"
    ],
    "am": [
     "በfor እና range() መድገም",
     "አንዱን loop በሌላው ውስጥ ማስገባት"
    ]
   },
   "l": {
    "en": [
     "range(5), range(1, 13), range(0, 100, 10)",
     "Multiplication table for one number",
     "Nested loops: the full 12×12 table",
     "Patterns with * characters"
    ],
    "am": [
     "range(5)፣ range(1, 13)፣ range(0, 100, 10)",
     "ለአንድ ቁጥር የማባዛት ሰንጠረዥ",
     "የተደራረቡ loops፡ ሙሉው 12×12 ሰንጠረዥ",
     "በ* ፊደላት ንድፎች"
    ]
   },
   "a": {
    "en": "Print a neat multiplication table for 1–9 that younger pupils can use, and a triangle pattern.",
    "am": "ታናናሽ ተማሪዎች ሊጠቀሙበት የሚችሉ ንጹሕ የ1–9 የማባዛት ሰንጠረዥና የሦስት ማዕዘን ንድፍ አትም።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What numbers does range(1, 13) give?",
     "In a nested loop, how many times does the inner line run for 9 × 9?"
    ],
    "am": [
     "range(1, 13) ምን ቁጥሮች ይሰጣል?",
     "በተደራረበ loop ውስጥ ለ9 × 9 የውስጠኛው መስመር ስንት ጊዜ ይሠራል?"
    ]
   },
   "qa": {
    "en": [
     "1 to 12: the end number is not included.",
     "81 times: 9 for each of the 9 outer steps."
    ],
    "am": [
     "ከ1 እስከ 12፡ የመጨረሻው ቁጥር አይካተትም።",
     "81 ጊዜ፡ ለእያንዳንዱ 9 የውጭ እርምጃዎች 9።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Nested loops",
      "am": "የተደራረቡ loops"
     },
     "nodes": [
      {
       "t": {
        "en": "outer: row 1…9",
        "am": "ውጭ፡ ረድፍ 1…9"
       }
      },
      {
       "t": {
        "en": "inner: column 1…9",
        "am": "ውስጥ፡ ዓምድ 1…9"
       }
      },
      {
       "t": {
        "en": "print row × column",
        "am": "ረድፍ × ዓምድ አትም"
       },
       "hl": true
      }
     ],
     "loop": {
      "en": "inner loop finishes, then the outer moves on",
      "am": "የውስጠኛው loop ይጨርሳል፣ ከዚያ የውጩ ይቀጥላል"
     }
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "for row in range(1, 10):\n    print(\" \".join(f\"{row * col:2d}\" for col in range(1, 10)))\nprint()\nfor n in range(1, 6):\n    print(\" \" * (5 - n) + \"*\" * (2 * n - 1))",
    "out": " 1  2  3  4  5  6  7  8  9\n 2  4  6  8 10 12 14 16 18\n 3  6  9 12 15 18 21 24 27\n 4  8 12 16 20 24 28 32 36\n 5 10 15 20 25 30 35 40 45\n 6 12 18 24 30 36 42 48 54\n 7 14 21 28 35 42 49 56 63\n 8 16 24 32 40 48 56 64 72\n 9 18 27 36 45 54 63 72 81\n\n    *\n   ***\n  *****\n *******\n*********",
    "title": {
     "en": "A 9 × 9 table and a triangle",
     "am": "9 × 9 ሰንጠረዥና ሦስት ማዕዘን"
    }
   }
  },
  {
   "t": {
    "en": "while loops: keep going until …",
    "am": "while loops፡ … እስኪሆን ቀጥል"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Repeat while a condition is true",
     "Avoid infinite loops"
    ],
    "am": [
     "ሁኔታ እውነት እስከሆነ ድረስ መድገም",
     "ማለቂያ የሌላቸውን loops ማስወገድ"
    ]
   },
   "l": {
    "en": [
     "while vs for",
     "A guessing game with hints",
     "Savings: how many weeks to reach a goal?",
     "Infinite loops and how to stop them (Ctrl+C)"
    ],
    "am": [
     "while vs for",
     "ፍንጮች ያሉት የግምት ጨዋታ",
     "ቁጠባ፡ ግብ ለመድረስ ስንት ሳምንታት?",
     "ማለቂያ የሌላቸው loops እና እንዴት እንደሚቆሙ (Ctrl+C)"
    ]
   },
   "a": {
    "en": "Write a savings planner: a pupil saves a fixed amount each week; how many weeks until they can buy a bicycle?",
    "am": "የቁጠባ ዕቅድ አውጪ ጻፍ፡ ተማሪ በየሳምንቱ የተወሰነ መጠን ይቆጥባል፤ ብስክሌት ለመግዛት ስንት ሳምንታት ያስፈልጋሉ?"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "When do we use while instead of for?",
     "What causes an infinite loop?"
    ],
    "am": [
     "ከfor ይልቅ whileን መቼ እንጠቀማለን?",
     "ማለቂያ የሌለው loop ምን ያመጣል?"
    ]
   },
   "qa": {
    "en": [
     "When we do not know how many repeats are needed, for example until the guess is right or the goal is reached.",
     "The condition never becomes false, usually because the variable inside the loop is never changed."
    ],
    "am": [
     "ስንት ድግግሞሽ እንደሚያስፈልግ ሳናውቅ፣ ለምሳሌ ግምቱ ትክክል እስኪሆን ወይም ግቡ እስኪደረስ።",
     "ሁኔታው በፍጹም ሐሰት አይሆንም፣ ብዙውን ጊዜ በloopኡ ውስጥ ያለው variable በፍጹም ስለማይቀየር።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A while loop",
      "am": "while loop"
     },
     "nodes": [
      {
       "t": {
        "en": "check: saved < price?",
        "am": "ፈትሽ፡ saved < price?"
       }
      },
      {
       "t": {
        "en": "yes → save one more week",
        "am": "አዎ → አንድ ተጨማሪ ሳምንት ቆጥብ"
       }
      },
      {
       "t": {
        "en": "no → stop, print weeks",
        "am": "አይደለም → አቁም፣ ሳምንታትን አትም"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "price, saved, weekly, weeks = 3500, 400, 150, 0     # birr\nwhile saved < price:\n    saved += weekly\n    weeks += 1\nprint(f\"after {weeks} weeks you have {saved} birr: enough for the {price}-birr bicycle\")\n\nsecret, guesses = 37, [50, 25, 40, 35, 37]          # in class the guesses come from input()\nfor tries, g in enumerate(guesses, 1):\n    if g == secret: print(f\"guess {g}: correct in {tries} tries\"); break\n    print(f\"guess {g}: {'too high' if g > secret else 'too low'}\")",
    "out": "after 21 weeks you have 3550 birr: enough for the 3500-birr bicycle\nguess 50: too high\nguess 25: too low\nguess 40: too high\nguess 35: too low\nguess 37: correct in 5 tries",
    "title": {
     "en": "Savings planner and a guessing game",
     "am": "የቁጠባ ዕቅድ አውጪና የግምት ጨዋታ"
    }
   }
  },
  {
   "t": {
    "en": "Functions: reusable tools",
    "am": "Functions፡ ደጋግመው የሚያገለግሉ መሣሪያዎች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Define functions with parameters and return values",
     "Reuse one function many times"
    ],
    "am": [
     "ከparameters እና return values ጋር functions መግለጽ",
     "አንድን function ብዙ ጊዜ መጠቀም"
    ]
   },
   "l": {
    "en": [
     "def name(parameters):",
     "return sends a value back",
     "area() and seed_needed() for a farm plot",
     "Functions calling functions"
    ],
    "am": [
     "def name(parameters):",
     "return እሴት መልሶ ይልካል",
     "ለእርሻ ማሳ area() እና seed_needed()",
     "functions ሌሎች functionsን ሲጠሩ"
    ]
   },
   "a": {
    "en": "Write farm-plot functions: area in m², area in hectares, and kilograms of teff seed needed at 15 kg per hectare.",
    "am": "የእርሻ ማሳ functions ጻፍ፡ ስፋት በm²፣ ስፋት በሄክታር፣ እና በሄክታር 15 kg ሲሆን የሚያስፈልግ የጤፍ ዘር ኪሎግራም።"
   },
   "m": {
    "en": "Python, tape measure for a real plot",
    "am": "Python፣ ለእውነተኛ ማሳ ሜትር"
   },
   "q": {
    "en": [
     "What does a function return?",
     "Why write a function instead of repeating the calculation?"
    ],
    "am": [
     "function ምን ይመልሳል?",
     "ስሌቱን ከመድገም ይልቅ ለምን function እንጽፋለን?"
    ]
   },
   "qa": {
    "en": [
     "The value after the word return, which the caller can store or print.",
     "Write it once, test it once, use it everywhere; a fix in one place fixes every use."
    ],
    "am": [
     "ከreturn ቃል በኋላ ያለው እሴት፣ ጠሪው ሊያስቀምጠው ወይም ሊያትመው ይችላል።",
     "አንድ ጊዜ ጻፈው፣ አንድ ጊዜ ፈትሸው፣ በሁሉም ቦታ ተጠቀምበት፤ በአንድ ቦታ ያለ ማስተካከያ እያንዳንዱን አጠቃቀም ያስተካክላል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Functions working together",
      "am": "አብረው የሚሠሩ functions"
     },
     "nodes": [
      {
       "t": {
        "en": "area(40, 25)",
        "am": "area(40, 25)"
       },
       "s": {
        "en": "→ 1000 m²",
        "am": "→ 1000 m²"
       }
      },
      {
       "t": {
        "en": "hectares(1000)",
        "am": "hectares(1000)"
       },
       "s": {
        "en": "→ 0.1 ha",
        "am": "→ 0.1 ha"
       }
      },
      {
       "t": {
        "en": "seed_needed(0.1)",
        "am": "seed_needed(0.1)"
       },
       "s": {
        "en": "→ 1.5 kg",
        "am": "→ 1.5 kg"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "def area(length_m, width_m):\n    return length_m * width_m\ndef hectares(m2):\n    return m2 / 10_000\ndef seed_needed(ha, kg_per_ha=15):\n    return ha * kg_per_ha\nfor plot, (l, w) in {\"home plot\": (40, 25), \"river plot\": (120, 60)}.items():\n    a = area(l, w)\n    print(f\"{plot}: {a} m2 = {hectares(a):.2f} ha -> {seed_needed(hectares(a)):.1f} kg teff seed\")",
    "out": "home plot: 1000 m2 = 0.10 ha -> 1.5 kg teff seed\nriver plot: 7200 m2 = 0.72 ha -> 10.8 kg teff seed",
    "title": {
     "en": "Farm-plot functions",
     "am": "የእርሻ ማሳ functions"
    }
   }
  },
  {
   "t": {
    "en": "Spreadsheets: data in rows and columns",
    "am": "ስፕሬድሺቶች፡ ዳታ በረድፎችና በዓምዶች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Enter data in a table with one row per record",
     "Use formulas: SUM, AVERAGE, MAX"
    ],
    "am": [
     "በሰንጠረዥ ውስጥ ለእያንዳንዱ መዝገብ አንድ ረድፍ ዳታ ማስገባት",
     "ቀመሮችን መጠቀም፡ SUM፣ AVERAGE፣ MAX"
    ]
   },
   "l": {
    "en": [
     "Rows, columns, cells: B3",
     "A bottle rain gauge: a week of data",
     "=SUM(B2:B8), =AVERAGE(), =MAX()",
     "The same totals in Python"
    ],
    "am": [
     "ረድፎች፣ ዓምዶች፣ ሴሎች፡ B3",
     "የጠርሙስ የዝናብ መለኪያ፡ የሳምንት ዳታ",
     "=SUM(B2:B8)፣ =AVERAGE()፣ =MAX()",
     "ያው ድምሮች በPython"
    ]
   },
   "a": {
    "en": "Make a rain gauge from a plastic bottle, record rainfall every morning for a week, and enter it into a spreadsheet with formulas.",
    "am": "ከፕላስቲክ ጠርሙስ የዝናብ መለኪያ ሥራ፣ ለአንድ ሳምንት በየጠዋቱ የዝናብ መጠን መዝግብ፣ ከቀመሮች ጋር በስፕሬድሺት አስገባው።"
   },
   "m": {
    "en": "Plastic bottle, ruler, a free spreadsheet (LibreOffice or Google Sheets)",
    "am": "የፕላስቲክ ጠርሙስ፣ ማስመሪያ፣ ነጻ ስፕሬድሺት (LibreOffice ወይም Google Sheets)"
   },
   "q": {
    "en": [
     "What is the cell address of row 3, column B?",
     "Why one row per day?"
    ],
    "am": [
     "የረድፍ 3፣ ዓምድ B ሴል አድራሻ ምንድነው?",
     "ለምን ለእያንዳንዱ ቀን አንድ ረድፍ?"
    ]
   },
   "qa": {
    "en": [
     "B3.",
     "Each row is one record, so formulas, sorting and charts work on whole columns."
    ],
    "am": [
     "B3።",
     "እያንዳንዱ ረድፍ አንድ መዝገብ ነው፤ ስለዚህ ቀመሮች፣ መደርደርና ቻርቶች በሙሉ ዓምዶች ላይ ይሠራሉ።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "A tidy table",
      "am": "ንጹሕ ሰንጠረዥ"
     },
     "layers": [
      {
       "t": {
        "en": "A1: day · B1: rain_mm",
        "am": "A1፡ ቀን · B1፡ rain_mm"
       },
       "s": {
        "en": "header row",
        "am": "የርዕስ ረድፍ"
       }
      },
      {
       "t": {
        "en": "A2: Mon · B2: 0",
        "am": "A2፡ ሰኞ · B2፡ 0"
       }
      },
      {
       "t": {
        "en": "… one row per day …",
        "am": "… ለእያንዳንዱ ቀን አንድ ረድፍ …"
       }
      },
      {
       "t": {
        "en": "B10: =SUM(B2:B8)",
        "am": "B10፡ =SUM(B2:B8)"
       },
       "s": {
        "en": "total",
        "am": "ድምር"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "rain = {\"Mon\": 0, \"Tue\": 12, \"Wed\": 30, \"Thu\": 4, \"Fri\": 0, \"Sat\": 18, \"Sun\": 7}   # mm\nprint(\"SUM     =\", sum(rain.values()))\nprint(\"AVERAGE =\", round(sum(rain.values()) / len(rain), 1))\nprint(\"MAX     =\", max(rain.values()), \"on\", max(rain, key=rain.get))\nprint(\"dry days:\", [d for d, mm in rain.items() if mm == 0])",
    "out": "SUM     = 71\nAVERAGE = 10.1\nMAX     = 30 on Wed\ndry days: ['Mon', 'Fri']",
    "title": {
     "en": "Spreadsheet formulas, the same in Python",
     "am": "የስፕሬድሺት ቀመሮች፣ ያው በPython"
    }
   }
  },
  {
   "t": {
    "en": "Charts: tell the story of data",
    "am": "ቻርቶች፡ የዳታውን ታሪክ ንገር"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Choose a bar or line chart for the data",
     "Write one sentence that explains the chart"
    ],
    "am": [
     "ለዳታው የአሞሌ ወይም የመስመር ቻርት መምረጥ",
     "ቻርቱን የሚያብራራ አንድ ዓረፍተ ነገር መጻፍ"
    ]
   },
   "l": {
    "en": [
     "Bar chart for categories, line chart for time",
     "Title, axis labels, units",
     "A text bar chart in Python",
     "Present: what does the chart show?"
    ],
    "am": [
     "ለምድቦች የአሞሌ ቻርት፣ ለጊዜ የመስመር ቻርት",
     "ርዕስ፣ የaxis ምልክቶች፣ መለኪያዎች",
     "በPython የጽሑፍ የአሞሌ ቻርት",
     "አቅርብ፡ ቻርቱ ምን ያሳያል?"
    ]
   },
   "a": {
    "en": "Chart your week of rainfall (or class attendance) and present it to the class with one clear sentence and one question it raises.",
    "am": "የሳምንት የዝናብ መጠንህን (ወይም የክፍል መገኘትን) ቻርት አድርግና በአንድ ግልጽ ዓረፍተ ነገርና በሚያስነሳው አንድ ጥያቄ ለክፍሉ አቅርበው።"
   },
   "m": {
    "en": "Spreadsheet or Python, paper for drawing",
    "am": "ስፕሬድሺት ወይም Python፣ ለመሣል ወረቀት"
   },
   "q": {
    "en": [
     "What does your chart show?",
     "When should you use a line chart?"
    ],
    "am": [
     "ቻርትህ ምን ያሳያል?",
     "የመስመር ቻርት መቼ መጠቀም አለብህ?"
    ]
   },
   "qa": {
    "en": [
     "Answer in one sentence with a number, for example: \"Wednesday had the most rain, 30 mm; two days were dry.\"",
     "When the data change over time and the order matters, such as temperature through a day."
    ],
    "am": [
     "በአንድ ዓረፍተ ነገር ከቁጥር ጋር መልስ፣ ለምሳሌ፡ «ረቡዕ ብዙ ዝናብ ነበረው፣ 30 mm፤ ሁለት ቀናት ደረቅ ነበሩ።»",
     "ዳታው በጊዜ ሂደት ሲለወጥና ቅደም ተከተሉ ሲያስፈልግ፣ እንደ በአንድ ቀን ውስጥ ያለ ሙቀት።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Which chart?",
      "am": "የትኛው ቻርት?"
     },
     "cols": [
      {
       "h": {
        "en": "Bar chart",
        "am": "የአሞሌ ቻርት"
       },
       "items": {
        "en": [
         "compare categories",
         "crops, classes, markets"
        ],
        "am": [
         "ምድቦችን አወዳድር",
         "ሰብሎች፣ ክፍሎች፣ ገበያዎች"
        ]
       },
       "tone": "good"
      },
      {
       "h": {
        "en": "Line chart",
        "am": "የመስመር ቻርት"
       },
       "items": {
        "en": [
         "change over time",
         "days, months, years"
        ],
        "am": [
         "በጊዜ ሂደት ለውጥ",
         "ቀናት፣ ወራት፣ ዓመታት"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "attendance = {\"Mon\": 38, \"Tue\": 40, \"Wed\": 31, \"Thu\": 39, \"Fri\": 36}   # pupils present out of 40\nprint(\"Class attendance (out of 40)\")\nfor day, n in attendance.items():\n    print(f\"{day} | {'#' * n:40s} {n}\")\nlow = min(attendance, key=attendance.get)\nprint(f\"Story: attendance was lowest on {low} ({attendance[low]}); ask why (market day? rain?).\")",
    "out": "Class attendance (out of 40)\nMon | ######################################   38\nTue | ######################################## 40\nWed | ###############################          31\nThu | #######################################  39\nFri | ####################################     36\nStory: attendance was lowest on Wed (31); ask why (market day? rain?).",
    "title": {
     "en": "A text bar chart and its one-sentence story",
     "am": "የጽሑፍ የአሞሌ ቻርትና የአንድ ዓረፍተ ነገር ታሪኩ"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "Lists: a class list",
    "am": "Lists፡ የክፍል ዝርዝር"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Create, index, add to and remove from lists",
     "Loop over a list and sort it"
    ],
    "am": [
     "lists መፍጠር፣ ማመልከት፣ መጨመርና ማስወገድ",
     "በlist ላይ loop ማድረግና መደርደር"
    ]
   },
   "l": {
    "en": [
     "names = [\"Abebe\", \"Hana\"]; names[0]",
     "append, remove, len, in",
     "for name in names:",
     "sorted() and slicing names[1:3]"
    ],
    "am": [
     "names = [\"Abebe\", \"Hana\"]፤ names[0]",
     "append፣ remove፣ len፣ in",
     "for name in names:",
     "sorted() እና slicing names[1:3]"
    ]
   },
   "a": {
    "en": "Build a class register: add pupils, mark who is present, and print the absent list in alphabetical order.",
    "am": "የክፍል መዝገብ ገንባ፡ ተማሪዎችን ጨምር፣ የተገኙትን ምልክት አድርግ፣ የቀሩትን ዝርዝር በፊደል ቅደም ተከተል አትም።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What is names[0]?",
     "How do you check if \"Sara\" is in the list?"
    ],
    "am": [
     "names[0] ምንድነው?",
     "«Sara» በlistኡ ውስጥ መኖሩን እንዴት ትፈትሻለህ?"
    ]
   },
   "qa": {
    "en": [
     "The first item: Python counts positions from 0.",
     "With \"Sara\" in names, which gives True or False."
    ],
    "am": [
     "የመጀመሪያው ንጥል፡ Python ቦታዎችን ከ0 ይቆጥራል።",
     "በ\"Sara\" in names፣ True ወይም False ይሰጣል።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "A list has positions",
      "am": "list ቦታዎች አሉት"
     },
     "layers": [
      {
       "t": {
        "en": "names[0] → \"Abebe\"",
        "am": "names[0] → \"Abebe\""
       }
      },
      {
       "t": {
        "en": "names[1] → \"Hana\"",
        "am": "names[1] → \"Hana\""
       }
      },
      {
       "t": {
        "en": "names[2] → \"Sara\"",
        "am": "names[2] → \"Sara\""
       }
      },
      {
       "t": {
        "en": "len(names) → 3",
        "am": "len(names) → 3"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "register = [\"Tsion\", \"Abebe\", \"Hana\", \"Dawit\", \"Sara\"]\nregister.append(\"Liya\")\npresent = [\"Abebe\", \"Sara\", \"Liya\", \"Tsion\"]\nabsent = sorted(name for name in register if name not in present)\nprint(f\"{len(register)} pupils, {len(present)} present\")\nprint(\"absent (A-Z):\", absent)\nprint(\"first two on the register:\", register[:2])",
    "out": "6 pupils, 4 present\nabsent (A-Z): ['Dawit', 'Hana']\nfirst two on the register: ['Tsion', 'Abebe']",
    "title": {
     "en": "Class register",
     "am": "የክፍል መዝገብ"
    }
   }
  },
  {
   "t": {
    "en": "Dictionaries: Amharic → English",
    "am": "Dictionaries፡ አማርኛ → እንግሊዝኛ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Store key → value pairs",
     "Look up, add and loop over a dictionary"
    ],
    "am": [
     "የkey → value ጥንዶችን ማስቀመጥ",
     "dictionaryን መፈለግ፣ መጨመርና በላዩ loop ማድረግ"
    ]
   },
   "l": {
    "en": [
     "words = {\"ውሃ\": \"water\"}",
     "words[\"ውሃ\"] and words.get(key, default)",
     "Add and update entries",
     "Count things with a dictionary"
    ],
    "am": [
     "words = {\"ውሃ\": \"water\"}",
     "words[\"ውሃ\"] እና words.get(key, default)",
     "ግቤቶችን ጨምርና አዘምን",
     "በdictionary ነገሮችን ቁጠር"
    ]
   },
   "a": {
    "en": "Make a 50-word Amharic–English dictionary for one topic (farm, kitchen or school) and a quiz that asks random words.",
    "am": "ለአንድ ርዕስ (እርሻ፣ ወጥ ቤት ወይም ትምህርት ቤት) የ50 ቃላት አማርኛ–እንግሊዝኛ dictionary እና የዘፈቀደ ቃላትን የሚጠይቅ quiz ሥራ።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What is the difference between a list and a dictionary?",
     "Why use .get() instead of [ ]?"
    ],
    "am": [
     "በlist እና በdictionary መካከል ያለው ልዩነት ምንድነው?",
     "ከ[ ] ይልቅ .get() ለምን እንጠቀማለን?"
    ]
   },
   "qa": {
    "en": [
     "A list is found by position (0, 1, 2…); a dictionary is found by key (\"ውሃ\").",
     ".get() returns a default when the key is missing instead of crashing with an error."
    ],
    "am": [
     "list በቦታ (0፣ 1፣ 2…) ይገኛል፤ dictionary በkey («ውሃ») ይገኛል።",
     "key ሲጎድል በስህተት ከመውደቅ ይልቅ .get() ነባሪ እሴት ይመልሳል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Look up a word",
      "am": "ቃል ፈልግ"
     },
     "nodes": [
      {
       "t": {
        "en": "key: \"ዳቦ\"",
        "am": "key፡ «ዳቦ»"
       }
      },
      {
       "t": {
        "en": "words[key]",
        "am": "words[key]"
       }
      },
      {
       "t": {
        "en": "value: \"bread\"",
        "am": "value፡ «bread»"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "words = {\"ውሃ\": \"water\", \"ዳቦ\": \"bread\", \"ላም\": \"cow\", \"እርሻ\": \"farm\"}\nwords[\"ጤፍ\"] = \"teff\"                                  # add\nprint(words[\"ላም\"], \"|\", words.get(\"በግ\", \"not found yet\"))\ncounts = {}\nfor crop in [\"teff\", \"maize\", \"teff\", \"barley\", \"teff\"]:\n    counts[crop] = counts.get(crop, 0) + 1            # counting with a dictionary\nprint(counts)\nfor am, en in sorted(words.items(), key=lambda kv: kv[1]):\n    print(f\"{en:6s} = {am}\")",
    "out": "cow | not found yet\n{'teff': 3, 'maize': 1, 'barley': 1}\nbread  = ዳቦ\ncow    = ላም\nfarm   = እርሻ\nteff   = ጤፍ\nwater  = ውሃ",
    "title": {
     "en": "Dictionary lookups and counting",
     "am": "የdictionary ፍለጋዎችና ቆጠራ"
    }
   }
  },
  {
   "t": {
    "en": "Files: save and load",
    "am": "ፋይሎች፡ ማስቀመጥና መጫን"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Write and read text and CSV files",
     "Keep data between program runs"
    ],
    "am": [
     "የጽሑፍና የCSV ፋይሎችን መጻፍና ማንበብ",
     "በፕሮግራም ሩጫዎች መካከል ዳታን ማቆየት"
    ]
   },
   "l": {
    "en": [
     "open(), with, \"w\" and \"r\"",
     "Save game high scores",
     "CSV files: one line per record",
     "UTF-8 for Amharic text"
    ],
    "am": [
     "open()፣ with፣ \"w\" እና \"r\"",
     "የጨዋታ ከፍተኛ ውጤቶችን አስቀምጥ",
     "CSV ፋይሎች፡ ለእያንዳንዱ መዝገብ አንድ መስመር",
     "ለአማርኛ ጽሑፍ UTF-8"
    ]
   },
   "a": {
    "en": "Save your dictionary to a CSV file so it can be opened in a spreadsheet, and load it back next lesson.",
    "am": "dictionaryህን በስፕሬድሺት እንዲከፈት ወደ CSV ፋይል አስቀምጥ፣ በሚቀጥለው ትምህርት መልሰህ ጫነው።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why save data in a file?",
     "Why add encoding=\"utf-8\"?"
    ],
    "am": [
     "ዳታን በፋይል ለምን እናስቀምጣለን?",
     "encoding=\"utf-8\" ለምን እንጨምራለን?"
    ]
   },
   "qa": {
    "en": [
     "Variables are lost when the program ends; a file keeps the data for next time and for other programs.",
     "So Amharic characters are saved and read correctly on every computer."
    ],
    "am": [
     "ፕሮግራሙ ሲያበቃ variables ይጠፋሉ፤ ፋይል ዳታውን ለሚቀጥለው ጊዜና ለሌሎች ፕሮግራሞች ያቆያል።",
     "የአማርኛ ፊደላት በእያንዳንዱ ኮምፒውተር ላይ በትክክል እንዲቀመጡና እንዲነበቡ።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Data that survives",
      "am": "የሚቆይ ዳታ"
     },
     "nodes": [
      {
       "t": {
        "en": "Program",
        "am": "ፕሮግራም"
       }
      },
      {
       "t": {
        "en": "write words.csv",
        "am": "words.csv ጻፍ"
       }
      },
      {
       "t": {
        "en": "Program ends",
        "am": "ፕሮግራሙ ያበቃል"
       }
      },
      {
       "t": {
        "en": "Next day: read words.csv",
        "am": "በሚቀጥለው ቀን፡ words.csv አንብብ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import csv, os, tempfile\npath = os.path.join(tempfile.gettempdir(), \"words.csv\")\nwords = {\"ውሃ\": \"water\", \"ዳቦ\": \"bread\", \"ላም\": \"cow\"}\nwith open(path, \"w\", newline=\"\", encoding=\"utf-8\") as f:\n    w = csv.writer(f); w.writerow([\"amharic\", \"english\"]); w.writerows(words.items())\nwith open(path, encoding=\"utf-8\") as f:\n    print(f.read().strip())\nwith open(path, encoding=\"utf-8\") as f:\n    loaded = {row[\"amharic\"]: row[\"english\"] for row in csv.DictReader(f)}\nprint(\"loaded back:\", loaded)",
    "out": "amharic,english\nውሃ,water\nዳቦ,bread\nላም,cow\nloaded back: {'ውሃ': 'water', 'ዳቦ': 'bread', 'ላም': 'cow'}",
    "title": {
     "en": "Save a dictionary as CSV and load it again",
     "am": "dictionaryን እንደ CSV አስቀምጥና እንደገና ጫን"
    }
   }
  },
  {
   "t": {
    "en": "Turtle graphics: flags and patterns",
    "am": "Turtle graphics፡ ባንዲራዎችና ንድፎች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Draw with turtle commands and loops",
     "Use angles to draw regular shapes and stars"
    ],
    "am": [
     "በturtle ትዕዛዞችና loops መሣል",
     "መደበኛ ቅርጾችንና ኮከቦችን ለመሣል ማዕዘኖችን መጠቀም"
    ]
   },
   "l": {
    "en": [
     "forward, left, right, penup, color",
     "Polygons: turn 360 / n",
     "A 5-pointed star: turn 144",
     "A mesob or basket pattern"
    ],
    "am": [
     "forward፣ left፣ right፣ penup፣ color",
     "ባለብዙ ጎኖች፡ 360 / n ዙር",
     "ባለ 5 ጫፍ ኮከብ፡ 144 ዙር",
     "የመሶብ ወይም የሰፌድ ንድፍ"
    ]
   },
   "a": {
    "en": "Draw a flag with stripes and a star, and a circular basket-weave pattern from repeated shapes.",
    "am": "ሰንሰለቶችና ኮከብ ያለው ባንዲራ፣ እንዲሁም ከተደጋገሙ ቅርጾች ክብ የሰፌድ ንድፍ ሣል።"
   },
   "m": {
    "en": "Python with turtle (built in)",
    "am": "Python ከturtle ጋር (አብሮ የተሠራ)"
   },
   "q": {
    "en": [
     "Why does a star use 144 degrees?",
     "How do you draw any regular polygon?"
    ],
    "am": [
     "ኮከብ ለምን 144 ዲግሪ ይጠቀማል?",
     "ማንኛውንም መደበኛ ባለብዙ ጎን እንዴት ትሥላለህ?"
    ]
   },
   "qa": {
    "en": [
     "Five turns of 144° add up to 720°, two full turns, which draws the points of the star.",
     "Repeat n times: forward(size), left(360 / n)."
    ],
    "am": [
     "አምስት የ144° መዞሪያዎች 720° ይሆናሉ፣ ሁለት ሙሉ ዙሮች፣ ይህም የኮከቡን ጫፎች ይሥላል።",
     "n ጊዜ ድገም፡ forward(size)፣ left(360 / n)።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Turning angles",
      "am": "የመዞሪያ ማዕዘኖች"
     },
     "cols": [
      {
       "h": {
        "en": "Square",
        "am": "ካሬ"
       },
       "items": {
        "en": [
         "4 × 90° = 360°"
        ],
        "am": [
         "4 × 90° = 360°"
        ]
       },
       "tone": ""
      },
      {
       "h": {
        "en": "Hexagon",
        "am": "ባለ ስድስት ጎን"
       },
       "items": {
        "en": [
         "6 × 60° = 360°"
        ],
        "am": [
         "6 × 60° = 360°"
        ]
       },
       "tone": ""
      },
      {
       "h": {
        "en": "Star",
        "am": "ኮከብ"
       },
       "items": {
        "en": [
         "5 × 144° = 720°"
        ],
        "am": [
         "5 × 144° = 720°"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import math\ndef star_points(size=100, turn=144, n=5):\n    x, y, heading, pts = 0.0, 0.0, 0.0, [(0.0, 0.0)]\n    for _ in range(n):                                # what turtle.forward/right would do\n        x += size * math.cos(math.radians(heading)); y += size * math.sin(math.radians(heading))\n        heading -= turn; pts.append((round(x, 1) + 0.0, round(y, 1) + 0.0))\n    return pts\nprint(\"star corners:\", star_points())\nprint(\"total turning:\", 5 * 144, \"degrees\")\n# In class:  import turtle; t = turtle.Turtle()\n#            for _ in range(5): t.forward(100); t.right(144)",
    "out": "star corners: [(0.0, 0.0), (100.0, 0.0), (19.1, -58.8), (50.0, 36.3), (80.9, -58.8), (0.0, 0.0)]\ntotal turning: 720 degrees",
    "title": {
     "en": "The star’s corners, computed the way turtle draws them",
     "am": "የኮከቡ ማዕዘኖች፣ turtle በሚሥልበት መንገድ የተሰሉ"
    },
    "note": {
     "en": "turtle opens a drawing window, so here the same path is computed and printed; run the two commented lines in Thonny to see it drawn.",
     "am": "turtle የመሣያ መስኮት ይከፍታል፤ ስለዚህ እዚህ ያው መንገድ ተሰልቶ ታትሟል፤ ሲሣል ለማየት በThonny ውስጥ ሁለቱን የአስተያየት መስመሮች አስኪድ።"
    }
   }
  },
  {
   "t": {
    "en": "HTML: your first web page",
    "am": "HTML፡ የመጀመሪያ ድረ ገጽህ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Structure a page with headings, paragraphs, images and links",
     "Make a 3-page site with navigation"
    ],
    "am": [
     "ገጽን በርዕሶች፣ በአንቀጾች፣ በምስሎችና በማገናኛዎች ማዋቀር",
     "ከአሰሳ ጋር ባለ 3 ገጽ ድረ ገጽ መሥራት"
    ]
   },
   "l": {
    "en": [
     "Tags: <h1>, <p>, <img>, <a>",
     "Lists and tables in HTML",
     "Links between pages",
     "Alt text for images"
    ],
    "am": [
     "Tags፡ <h1>፣ <p>፣ <img>፣ <a>",
     "በHTML ውስጥ lists እና ሰንጠረዦች",
     "በገጾች መካከል ማገናኛዎች",
     "ለምስሎች alt ጽሑፍ"
    ]
   },
   "a": {
    "en": "Make a 3-page website about your village: home, farming, and people; link the pages to each other.",
    "am": "ስለ መንደርህ ባለ 3 ገጽ ድረ ገጽ ሥራ፡ መነሻ፣ ግብርና እና ሰዎች፤ ገጾቹን እርስ በርሳቸው አገናኛቸው።"
   },
   "m": {
    "en": "A text editor and a browser (works offline)",
    "am": "የጽሑፍ አርታኢና አሳሽ (ያለ ኢንተርኔት ይሠራል)"
   },
   "q": {
    "en": [
     "Which HTML tag makes a link?",
     "Why write alt text for an image?"
    ],
    "am": [
     "የትኛው የHTML tag ማገናኛ ይሠራል?",
     "ለምስል ለምን alt ጽሑፍ እንጽፋለን?"
    ]
   },
   "qa": {
    "en": [
     "<a href=\"farming.html\">Farming</a>.",
     "Screen readers read it to blind users, and it shows if the image does not load."
    ],
    "am": [
     "<a href=\"farming.html\">ግብርና</a>።",
     "የስክሪን አንባቢዎች ለዓይነ ስውራን ተጠቃሚዎች ያነቡታል፤ ምስሉ ካልተጫነም ይታያል።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "A 3-page site",
      "am": "ባለ 3 ገጽ ድረ ገጽ"
     },
     "root": {
      "t": {
       "en": "index.html",
       "am": "index.html"
      }
     },
     "kids": [
      {
       "t": {
        "en": "farming.html",
        "am": "farming.html"
       }
      },
      {
       "t": {
        "en": "people.html",
        "am": "people.html"
       }
      },
      {
       "t": {
        "en": "images/",
        "am": "images/"
       },
       "kids": [
        {
         "t": {
          "en": "teff.jpg",
          "am": "teff.jpg"
         }
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "HTML",
    "code": "<!DOCTYPE html>\n<html lang=\"am\">\n<head><meta charset=\"utf-8\"><title>Our village</title></head>\n<body>\n  <h1>Welcome to Dangila</h1>\n  <p>Our village grows teff, maize and potatoes.</p>\n  <img src=\"images/teff.jpg\" alt=\"A teff field ready for harvest\" width=\"300\">\n  <ul>\n    <li><a href=\"farming.html\">Farming</a></li>\n    <li><a href=\"people.html\">People</a></li>\n  </ul>\n</body>\n</html>",
    "title": {
     "en": "index.html",
     "am": "index.html"
    },
    "note": {
     "en": "Save as index.html and open it in any browser; no internet needed.",
     "am": "እንደ index.html አስቀምጥና በማንኛውም አሳሽ ክፈተው፤ ኢንተርኔት አያስፈልግም።"
    }
   }
  },
  {
   "t": {
    "en": "CSS: style and layout",
    "am": "CSS፡ ዘይቤና አቀማመጥ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Change colours, fonts and spacing with CSS",
     "Make a page that works on a phone"
    ],
    "am": [
     "ቀለሞችን፣ ፊደላትንና ክፍተትን በCSS መቀየር",
     "በስልክ ላይ የሚሠራ ገጽ መሥራት"
    ]
   },
   "l": {
    "en": [
     "Selectors, properties, values",
     "Colours and fonts (including Ethiopic fonts)",
     "The box model: margin, border, padding",
     "Flexbox and a phone-friendly layout"
    ],
    "am": [
     "Selectors፣ properties፣ values",
     "ቀለሞችና ፊደላት (የኢትዮጵያ ፊደላትን ጨምሮ)",
     "የሳጥን ሞዴል፡ margin፣ border፣ padding",
     "Flexbox እና ለስልክ ተስማሚ አቀማመጥ"
    ]
   },
   "a": {
    "en": "Style your village website with one shared style.css: a colour theme, readable fonts, and cards that stack on a phone.",
    "am": "የመንደርህን ድረ ገጽ በአንድ የጋራ style.css አስጌጥ፡ የቀለም ገጽታ፣ የሚነበቡ ፊደላት፣ በስልክ ላይ የሚደራረቡ ካርዶች።"
   },
   "m": {
    "en": "Text editor, browser, a phone to test",
    "am": "የጽሑፍ አርታኢ፣ አሳሽ፣ ለመፈተሽ ስልክ"
   },
   "q": {
    "en": [
     "What do margin and padding do?",
     "Why put CSS in a separate file?"
    ],
    "am": [
     "margin እና padding ምን ያደርጋሉ?",
     "CSSን ለምን በተለየ ፋይል እናስቀምጣለን?"
    ]
   },
   "qa": {
    "en": [
     "Padding is space inside the border; margin is space outside it, between boxes.",
     "All pages share one style, so one change updates the whole site."
    ],
    "am": [
     "padding ከድንበሩ ውስጥ ያለ ክፍተት ነው፤ margin ከውጭው፣ በሳጥኖች መካከል ያለ ክፍተት ነው።",
     "ሁሉም ገጾች አንድ ዘይቤ ይጋራሉ፤ ስለዚህ አንድ ለውጥ ሙሉውን ድረ ገጽ ያዘምናል።"
    ]
   },
   "dg": [
    {
     "type": "stack",
     "title": {
      "en": "The box model",
      "am": "የሳጥን ሞዴል"
     },
     "layers": [
      {
       "t": {
        "en": "margin",
        "am": "margin"
       },
       "s": {
        "en": "space outside",
        "am": "የውጭ ክፍተት"
       }
      },
      {
       "t": {
        "en": "border",
        "am": "border"
       }
      },
      {
       "t": {
        "en": "padding",
        "am": "padding"
       },
       "s": {
        "en": "space inside",
        "am": "የውስጥ ክፍተት"
       }
      },
      {
       "t": {
        "en": "content",
        "am": "ይዘት"
       },
       "s": {
        "en": "text and images",
        "am": "ጽሑፍና ምስሎች"
       }
      }
     ]
    }
   ],
   "ex": {
    "lang": "CSS",
    "code": "body { font-family: \"Noto Sans Ethiopic\", sans-serif; margin: 0; background: #f5f7f2; color: #18221c; }\nh1   { background: #1e6b47; color: white; padding: 16px; margin: 0; }\n.cards { display: flex; flex-wrap: wrap; gap: 12px; padding: 12px; }\n.card  { flex: 1 1 250px; background: white; border: 1px solid #d8ded4; border-radius: 10px; padding: 12px; }\nimg    { max-width: 100%; height: auto; }          /* images shrink on small phones */",
    "title": {
     "en": "style.css shared by all pages",
     "am": "በሁሉም ገጾች የሚጋራ style.css"
    },
    "note": {
     "en": "Link it in each page’s head: <link rel=\"stylesheet\" href=\"style.css\">.",
     "am": "በእያንዳንዱ ገጽ head ውስጥ አገናኘው፡ <link rel=\"stylesheet\" href=\"style.css\">።"
    }
   }
  }
 ],
 [
  {
   "t": {
    "en": "Modules: split a big program",
    "am": "Modules፡ ትልቅ ፕሮግራምን መከፋፈል"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Import from the standard library",
     "Split your own code into files and import it"
    ],
    "am": [
     "ከstandard library ማስገባት",
     "የራስህን ኮድ ወደ ፋይሎች ከፍለህ ማስገባት"
    ]
   },
   "l": {
    "en": [
     "import math, random, datetime",
     "from module import name",
     "Your own module: farm_tools.py",
     "if __name__ == \"__main__\":"
    ],
    "am": [
     "import math፣ random፣ datetime",
     "from module import name",
     "የራስህ module፡ farm_tools.py",
     "if __name__ == \"__main__\":"
    ]
   },
   "a": {
    "en": "Move your farm functions from Grade 6 into farm_tools.py and import them in a new planting-calendar program.",
    "am": "የ6ኛ ክፍል የእርሻ functionsህን ወደ farm_tools.py አንቀሳቅስና በአዲስ የመዝሪያ ቀን መቁጠሪያ ፕሮግራም ውስጥ አስገባቸው።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "Why split a program into modules?",
     "What does datetime help with?"
    ],
    "am": [
     "ፕሮግራምን ለምን ወደ modules እንከፍላለን?",
     "datetime በምን ይረዳል?"
    ]
   },
   "qa": {
    "en": [
     "Each file has one job, so the code is easier to find, test, reuse and share.",
     "Working with dates: today’s date, adding days, the weekday of a date."
    ],
    "am": [
     "እያንዳንዱ ፋይል አንድ ሥራ አለው፤ ስለዚህ ኮዱ ለማግኘት፣ ለመፈተሽ፣ እንደገና ለመጠቀምና ለማጋራት ቀላል ነው።",
     "ከቀናት ጋር መሥራት፡ የዛሬው ቀን፣ ቀናትን መጨመር፣ የአንድ ቀን የሳምንት ቀን።"
    ]
   },
   "dg": [
    {
     "type": "tree",
     "title": {
      "en": "A program made of modules",
      "am": "ከmodules የተሠራ ፕሮግራም"
     },
     "root": {
      "t": {
       "en": "calendar.py (main)",
       "am": "calendar.py (ዋና)"
      }
     },
     "kids": [
      {
       "t": {
        "en": "import farm_tools",
        "am": "import farm_tools"
       },
       "kids": [
        {
         "t": {
          "en": "area(), seed_needed()",
          "am": "area()፣ seed_needed()"
         }
        }
       ]
      },
      {
       "t": {
        "en": "import datetime",
        "am": "import datetime"
       },
       "kids": [
        {
         "t": {
          "en": "dates and weekdays",
          "am": "ቀናትና የሳምንት ቀናት"
         }
        }
       ]
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import datetime, math, random\nplanting = datetime.date(2026, 7, 10)\nfor crop, days in {\"teff\": 90, \"maize\": 120, \"barley\": 100}.items():\n    harvest = planting + datetime.timedelta(days=days)\n    print(f\"{crop:6s} planted {planting:%d %b}, harvest about {harvest:%d %b %Y} ({harvest:%A})\")\nprint(\"square root of 2 from math:\", round(math.sqrt(2), 4))\nrandom.seed(1); print(\"random plot to inspect:\", random.choice([\"A\", \"B\", \"C\", \"D\"]))",
    "out": "teff   planted 10 Jul, harvest about 08 Oct 2026 (Thursday)\nmaize  planted 10 Jul, harvest about 07 Nov 2026 (Saturday)\nbarley planted 10 Jul, harvest about 18 Oct 2026 (Sunday)\nsquare root of 2 from math: 1.4142\nrandom plot to inspect: B",
    "title": {
     "en": "A harvest calendar with datetime, math and random",
     "am": "በdatetime፣ math እና random የአጨዳ ቀን መቁጠሪያ"
    }
   }
  },
  {
   "t": {
    "en": "try / except: programs that do not crash",
    "am": "try / except፡ የማይወድቁ ፕሮግራሞች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Catch errors with try/except",
     "Validate user input and ask again"
    ],
    "am": [
     "ስህተቶችን በtry/except መያዝ",
     "የተጠቃሚ ግብዓትን ማረጋገጥና እንደገና መጠየቅ"
    ]
   },
   "l": {
    "en": [
     "Read a traceback: type, message, line",
     "ValueError, ZeroDivisionError, KeyError",
     "try / except / else / finally",
     "Keep asking until the input is valid"
    ],
    "am": [
     "traceback አንብብ፡ ዓይነት፣ መልእክት፣ መስመር",
     "ValueError፣ ZeroDivisionError፣ KeyError",
     "try / except / else / finally",
     "ግብዓቱ ትክክል እስኪሆን መጠየቅ ቀጥል"
    ]
   },
   "a": {
    "en": "Make your market calculator crash-proof: it must survive empty input, letters, negative numbers and zero kilos.",
    "am": "የገበያ ማስሊያህን የማይወድቅ አድርገው፡ ባዶ ግብዓትን፣ ፊደላትን፣ አሉታዊ ቁጥሮችንና ዜሮ ኪሎዎችን መቋቋም አለበት።"
   },
   "m": {
    "en": "Python",
    "am": "Python"
   },
   "q": {
    "en": [
     "What happens in try/except when an error occurs?",
     "Why catch a specific error like ValueError instead of every error?"
    ],
    "am": [
     "በtry/except ውስጥ ስህተት ሲፈጠር ምን ይሆናል?",
     "ሁሉንም ስህተት ከመያዝ ይልቅ እንደ ValueError ያለ የተወሰነ ስህተት ለምን እንይዛለን?"
    ]
   },
   "qa": {
    "en": [
     "Python stops the try block at the error and runs the matching except block instead of crashing.",
     "So real bugs elsewhere are not hidden; you only handle the problem you expect."
    ],
    "am": [
     "Python የtry ብሎኩን በስህተቱ ላይ ያቆማል፣ ከመውደቅ ይልቅ ተዛማጁን except ብሎክ ያስኬዳል።",
     "በሌላ ቦታ ያሉ እውነተኛ ስህተቶች እንዳይደበቁ፤ የምትጠብቀውን ችግር ብቻ ትይዛለህ።"
    ]
   },
   "dg": [
    {
     "type": "compare",
     "title": {
      "en": "Without and with try/except",
      "am": "ያለ እና ከtry/except ጋር"
     },
     "cols": [
      {
       "h": {
        "en": "Without",
        "am": "ያለ"
       },
       "items": {
        "en": [
         "user types \"abc\"",
         "ValueError → program stops"
        ],
        "am": [
         "ተጠቃሚው «abc» ይጽፋል",
         "ValueError → ፕሮግራሙ ይቆማል"
        ]
       },
       "tone": "bad"
      },
      {
       "h": {
        "en": "With",
        "am": "ከጋር"
       },
       "items": {
        "en": [
         "except ValueError:",
         "print a hint, ask again"
        ],
        "am": [
         "except ValueError:",
         "ፍንጭ አትም፣ እንደገና ጠይቅ"
        ]
       },
       "tone": "good"
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "def read_kilos(text):\n    try:\n        kilos = float(text)\n    except ValueError:\n        return None, \"please type a number, for example 2.5\"\n    if kilos <= 0:\n        return None, \"kilos must be more than 0\"\n    return kilos, \"ok\"\nfor typed in [\"2.5\", \"\", \"abc\", \"-3\", \"0\", \"4\"]:      # in class each comes from input()\n    value, message = read_kilos(typed)\n    print(f\"input {typed!r:6s} -> {message}\" + (f\" ({value} kg)\" if value else \"\"))",
    "out": "input '2.5'  -> ok (2.5 kg)\ninput ''     -> please type a number, for example 2.5\ninput 'abc'  -> please type a number, for example 2.5\ninput '-3'   -> kilos must be more than 0\ninput '0'    -> kilos must be more than 0\ninput '4'    -> ok (4.0 kg)",
    "title": {
     "en": "Validating input without crashing",
     "am": "ሳይወድቅ ግብዓትን ማረጋገጥ"
    }
   }
  },
  {
   "t": {
    "en": "APIs: data from the internet",
    "am": "APIs፡ ከኢንተርኔት ዳታ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Explain requests, responses and JSON",
     "Read values out of a JSON reply"
    ],
    "am": [
     "requestsን፣ responsesን እና JSONን ማብራራት",
     "ከJSON መልስ እሴቶችን ማንበብ"
    ]
   },
   "l": {
    "en": [
     "What an API is: a menu of requests",
     "URL, parameters and status codes",
     "JSON: dictionaries and lists as text",
     "Tomorrow’s forecast for your town"
    ],
    "am": [
     "API ምንድነው፡ የጥያቄዎች ምናሌ",
     "URL፣ parameters እና status codes",
     "JSON፡ dictionaries እና lists እንደ ጽሑፍ",
     "ለከተማህ የነገው ትንበያ"
    ]
   },
   "a": {
    "en": "Fetch tomorrow’s rain forecast for your town from a free weather API and print a one-line farming tip.",
    "am": "ለከተማህ የነገውን የዝናብ ትንበያ ከነጻ የአየር ሁኔታ API አምጥተህ የአንድ መስመር የእርሻ ምክር አትም።"
   },
   "m": {
    "en": "Python with the requests library, internet (or a saved sample reply)",
    "am": "Python ከrequests library ጋር፣ ኢንተርኔት (ወይም የተቀመጠ የናሙና መልስ)"
   },
   "q": {
    "en": [
     "What is an API?",
     "What does status code 200 mean?"
    ],
    "am": [
     "API ምንድነው?",
     "status code 200 ምን ማለት ነው?"
    ]
   },
   "qa": {
    "en": [
     "A defined way for one program to ask another for data or actions, often over the internet with JSON replies.",
     "OK: the request worked and the reply contains the data."
    ],
    "am": [
     "አንድ ፕሮግራም ሌላውን ዳታ ወይም ተግባር የሚጠይቅበት የተወሰነ መንገድ፣ ብዙውን ጊዜ በኢንተርኔት በJSON መልሶች።",
     "እሺ፡ ጥያቄው ሠርቷል፣ መልሱም ዳታውን ይዟል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Request and response",
      "am": "ጥያቄና መልስ"
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
        "en": "GET …/forecast?lat=11.6&lon=37.4",
        "am": "GET …/forecast?lat=11.6&lon=37.4"
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
        "en": "200 OK + JSON",
        "am": "200 OK + JSON"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import json\nreply = \"\"\"{\"place\": \"Bahir Dar\", \"daily\": {\"date\": [\"2026-11-16\", \"2026-11-17\"],\n            \"rain_mm\": [0.0, 6.4], \"t_max\": [27.1, 24.3]}}\"\"\"      # a saved sample reply\ndata = json.loads(reply)\nd = data[\"daily\"]\nrain, t = d[\"rain_mm\"][1], d[\"t_max\"][1]\ntip = \"good day to plant or top-dress\" if 2 <= rain <= 15 else \"irrigate if seedlings are wilting\" if rain < 2 else \"delay fertilizer: heavy rain\"\nprint(f\"{data['place']} on {d['date'][1]}: {rain} mm rain, max {t} C -> {tip}\")\n# Live version:  import requests\n# r = requests.get(\"https://api.open-meteo.com/v1/forecast\", params={\"latitude\": 11.6, \"longitude\": 37.4,\n#                  \"daily\": \"precipitation_sum,temperature_2m_max\", \"timezone\": \"auto\"}); data = r.json()",
    "out": "Bahir Dar on 2026-11-17: 6.4 mm rain, max 24.3 C -> good day to plant or top-dress",
    "title": {
     "en": "Reading a forecast reply",
     "am": "የትንበያ መልስ ማንበብ"
    },
    "note": {
     "en": "The example parses a saved reply so it runs without internet; the commented lines call a real free API.",
     "am": "ምሳሌው ያለ ኢንተርኔት እንዲሠራ የተቀመጠ መልስን ይተነትናል፤ የአስተያየት መስመሮቹ እውነተኛ ነጻ APIን ይጠራሉ።"
    }
   }
  },
  {
   "t": {
    "en": "JavaScript: interactive pages",
    "am": "JavaScript፡ በይነተገናኝ ገጾች"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Write JavaScript variables, functions and events",
     "Change a web page when a button is clicked"
    ],
    "am": [
     "የJavaScript variablesን፣ functionsን እና ክስተቶችን መጻፍ",
     "ቁልፍ ሲጫን ድረ ገጽን መቀየር"
    ]
   },
   "l": {
    "en": [
     "let, const, functions, arrays",
     "The console: test code quickly",
     "document.querySelector and textContent",
     "addEventListener(\"click\", …)"
    ],
    "am": [
     "let፣ const፣ functions፣ arrays",
     "console፡ ኮድን በፍጥነት ፈትሽ",
     "document.querySelector እና textContent",
     "addEventListener(\"click\", …)"
    ]
   },
   "a": {
    "en": "Add a \"word of the day\" button to your village website: each click shows a new Amharic word with its English meaning.",
    "am": "ለመንደርህ ድረ ገጽ የ«የዕለቱ ቃል» ቁልፍ ጨምር፡ እያንዳንዱ ጠቅታ አዲስ የአማርኛ ቃል ከእንግሊዝኛ ትርጉሙ ጋር ያሳያል።"
   },
   "m": {
    "en": "Browser, text editor",
    "am": "አሳሽ፣ የጽሑፍ አርታኢ"
   },
   "q": {
    "en": [
     "What does addEventListener do?",
     "What is the difference between let and const?"
    ],
    "am": [
     "addEventListener ምን ያደርጋል?",
     "በlet እና በconst መካከል ያለው ልዩነት ምንድነው?"
    ]
   },
   "qa": {
    "en": [
     "It runs a function every time an event (such as a click) happens on an element.",
     "let can be reassigned later; const cannot."
    ],
    "am": [
     "በአንድ element ላይ ክስተት (እንደ ጠቅታ) በተፈጠረ ቁጥር functionን ያስኬዳል።",
     "let በኋላ እንደገና ሊመደብ ይችላል፤ const አይችልም።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "A button that changes the page",
      "am": "ገጹን የሚቀይር ቁልፍ"
     },
     "nodes": [
      {
       "t": {
        "en": "click",
        "am": "ጠቅታ"
       }
      },
      {
       "t": {
        "en": "event listener",
        "am": "event listener"
       }
      },
      {
       "t": {
        "en": "function nextWord()",
        "am": "function nextWord()"
       }
      },
      {
       "t": {
        "en": "textContent changes",
        "am": "textContent ይቀየራል"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "JavaScript (Node.js)",
    "code": "const words = [[\"ውሃ\", \"water\"], [\"ዳቦ\", \"bread\"], [\"ላም\", \"cow\"], [\"ፀሐይ\", \"sun\"]];\nlet i = 0;\nfunction nextWord() {                    // in the page this runs on each click\n  const [am, en] = words[i % words.length];\n  i += 1;\n  return `${am} = ${en}`;\n}\nfor (let click = 1; click <= 5; click++) console.log(`click ${click}: ${nextWord()}`);\n// In the page:\n// document.querySelector(\"#next\").addEventListener(\"click\", () => {\n//   document.querySelector(\"#word\").textContent = nextWord();\n// });",
    "out": "click 1: ውሃ = water\nclick 2: ዳቦ = bread\nclick 3: ላም = cow\nclick 4: ፀሐይ = sun\nclick 5: ውሃ = water",
    "title": {
     "en": "Word-of-the-day logic",
     "am": "የዕለቱ ቃል ሎጂክ"
    },
    "note": {
     "en": "The logic runs in Node.js here; the commented lines connect it to a button in your page.",
     "am": "ሎጂኩ እዚህ በNode.js ይሠራል፤ የአስተያየት መስመሮቹ በገጽህ ካለ ቁልፍ ጋር ያገናኙታል።"
    }
   }
  },
  {
   "t": {
    "en": "How the internet works",
    "am": "ኢንተርኔት እንዴት እንደሚሠራ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Explain IP addresses, DNS, servers and packets",
     "Trace what happens when you open a website"
    ],
    "am": [
     "IP አድራሻዎችን፣ DNSን፣ ሰርቨሮችንና packetsን ማብራራት",
     "ድረ ገጽ ስትከፍት የሚሆነውን መከታተል"
    ]
   },
   "l": {
    "en": [
     "Clients and servers",
     "IP addresses and DNS names",
     "Packets: messages cut into pieces",
     "Unplugged: pass packets around the class"
    ],
    "am": [
     "Clients እና servers",
     "IP አድራሻዎችና የDNS ስሞች",
     "Packets፡ ወደ ቁርጥራጮች የተቆረጡ መልእክቶች",
     "ያለ ኮምፒውተር፡ packetsን በክፍሉ ዙሪያ አስተላልፉ"
    ]
   },
   "a": {
    "en": "Unplugged network: cut a message into numbered paper packets, pass them through \"routers\" (pupils) by different paths, and rebuild it at the destination.",
    "am": "ያለ ኮምፒውተር ኔትወርክ፡ መልእክትን ወደ ቁጥር የተሰጣቸው የወረቀት packets ቁረጥ፣ በተለያዩ መንገዶች በ«routers» (ተማሪዎች) በኩል አስተላልፍ፣ በመድረሻው እንደገና ገንባው።"
   },
   "m": {
    "en": "Paper slips, pens",
    "am": "የወረቀት ቁርጥራጮች፣ እስክሪብቶዎች"
   },
   "q": {
    "en": [
     "What does DNS do?",
     "Why number the packets?"
    ],
    "am": [
     "DNS ምን ያደርጋል?",
     "packetsን ለምን ቁጥር እንሰጣቸዋለን?"
    ]
   },
   "qa": {
    "en": [
     "It turns a name like example.org into the IP address the computer needs, like a phone book.",
     "They can arrive out of order by different paths; numbers let the receiver rebuild the message and ask for missing ones."
    ],
    "am": [
     "እንደ example.org ያለ ስምን ኮምፒውተሩ ወደሚፈልገው IP አድራሻ ይቀይራል፣ እንደ ስልክ ማውጫ።",
     "በተለያዩ መንገዶች ያለ ቅደም ተከተል ሊደርሱ ይችላሉ፤ ቁጥሮች ተቀባዩ መልእክቱን እንደገና እንዲገነባና የጎደሉትን እንዲጠይቅ ያስችላሉ።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "Opening a website",
      "am": "ድረ ገጽ መክፈት"
     },
     "nodes": [
      {
       "t": {
        "en": "Type the name",
        "am": "ስሙን ጻፍ"
       }
      },
      {
       "t": {
        "en": "DNS → IP address",
        "am": "DNS → IP አድራሻ"
       }
      },
      {
       "t": {
        "en": "Packets travel via routers",
        "am": "packets በrouters በኩል ይጓዛሉ"
       }
      },
      {
       "t": {
        "en": "Server replies with the page",
        "am": "ሰርቨሩ በገጹ ይመልሳል"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "import random\nmessage = \"MEET AT THE MARKET AT NINE\"\npackets = [(i, message[i * 5:(i + 1) * 5]) for i in range((len(message) + 4) // 5)]   # number + piece\nrandom.seed(3); random.shuffle(packets)                                             # different routes\nprint(\"arrived:\", packets)\nprint(\"rebuilt:\", \"\".join(piece for _, piece in sorted(packets)))",
    "out": "arrived: [(0, 'MEET '), (2, 'E MAR'), (3, 'KET A'), (5, 'E'), (4, 'T NIN'), (1, 'AT TH')]\nrebuilt: MEET AT THE MARKET AT NINE",
    "title": {
     "en": "Packets arrive out of order and are rebuilt",
     "am": "packets ያለ ቅደም ተከተል ደርሰው እንደገና ይገነባሉ"
    }
   }
  },
  {
   "t": {
    "en": "Physical computing: a soil-moisture logger",
    "am": "Physical computing፡ የአፈር እርጥበት መዝጋቢ"
   },
   "d": {
    "en": "5 weeks · 3 h per week",
    "am": "5 ሳምንታት · በሳምንት 3 ሰዓት"
   },
   "o": {
    "en": [
     "Read a sensor with a low-cost board",
     "Calibrate a sensor and log readings to a file"
    ],
    "am": [
     "በርካሽ ቦርድ ሴንሰር ማንበብ",
     "ሴንሰርን ማስተካከልና ንባቦችን በፋይል መመዝገብ"
    ]
   },
   "l": {
    "en": [
     "Arduino or Raspberry Pi: what each is good at",
     "Wire a soil-moisture sensor safely",
     "Calibrate: dry soil vs wet soil",
     "Log with time, power with a solar bank"
    ],
    "am": [
     "Arduino ወይም Raspberry Pi፡ እያንዳንዱ በምን ጥሩ ነው",
     "የአፈር እርጥበት ሴንሰርን በደህንነት አገናኝ",
     "አስተካክል፡ ደረቅ አፈር vs እርጥብ አፈር",
     "ከጊዜ ጋር መዝግብ፣ በፀሐይ ባንክ አንቀሳቅስ"
    ]
   },
   "a": {
    "en": "Build the smart garden monitor for the school garden: log moisture every 30 minutes and show \"water now\" when dry.",
    "am": "ለትምህርት ቤቱ የአትክልት ቦታ ብልህ መከታተያውን ገንባ፡ በየ30 ደቂቃው እርጥበትን መዝግብ፣ ሲደርቅ «አሁን አጠጣ» አሳይ።"
   },
   "m": {
    "en": "Arduino Uno or Raspberry Pi Pico, capacitive soil sensor, jumper wires, solar power bank",
    "am": "Arduino Uno ወይም Raspberry Pi Pico፣ capacitive የአፈር ሴንሰር፣ የመገናኛ ሽቦዎች፣ የፀሐይ ኃይል ባንክ"
   },
   "q": {
    "en": [
     "How does your sensor decide the soil is dry?",
     "Why calibrate instead of using the number from the internet?"
    ],
    "am": [
     "ሴንሰርህ አፈሩ ደረቅ መሆኑን እንዴት ይወስናል?",
     "ከኢንተርኔት ያገኘኸውን ቁጥር ከመጠቀም ይልቅ ለምን እናስተካክላለን?"
    ]
   },
   "qa": {
    "en": [
     "It compares the reading with a threshold set from your own dry and wet measurements.",
     "Every sensor and every soil type reads differently."
    ],
    "am": [
     "ንባቡን ከራስህ የደረቅና የእርጥብ ልኬቶች ከተዘጋጀ ወሰን ጋር ያወዳድራል።",
     "እያንዳንዱ ሴንሰርና እያንዳንዱ የአፈር ዓይነት በተለየ ሁኔታ ያነባል።"
    ]
   },
   "dg": [
    {
     "type": "flow",
     "title": {
      "en": "From soil to decision",
      "am": "ከአፈር ወደ ውሳኔ"
     },
     "nodes": [
      {
       "t": {
        "en": "Sensor",
        "am": "ሴንሰር"
       },
       "s": {
        "en": "raw 0–1023",
        "am": "ጥሬ 0–1023"
       }
      },
      {
       "t": {
        "en": "Calibrate",
        "am": "አስተካክል"
       },
       "s": {
        "en": "dry = 0%, wet = 100%",
        "am": "ደረቅ = 0%፣ እርጥብ = 100%"
       }
      },
      {
       "t": {
        "en": "Log",
        "am": "መዝግብ"
       },
       "s": {
        "en": "time, %",
        "am": "ጊዜ፣ %"
       }
      },
      {
       "t": {
        "en": "Below 30% → water",
        "am": "ከ30% በታች → አጠጣ"
       },
       "hl": true
      }
     ]
    }
   ],
   "ex": {
    "lang": "Python",
    "code": "DRY_RAW, WET_RAW = 820, 380          # measured with the sensor in dry soil and in just-watered soil\ndef to_percent(raw):\n    pct = 100 * (DRY_RAW - raw) / (DRY_RAW - WET_RAW)\n    return max(0, min(100, round(pct)))\nlog = [(\"06:00\", 450), (\"09:00\", 520), (\"12:00\", 640), (\"15:00\", 715), (\"18:00\", 702)]\nfor time, raw in log:\n    p = to_percent(raw)\n    print(f\"{time}  raw {raw}  moisture {p:3d}%  {'WATER NOW' if p < 30 else 'ok'}\")",
    "out": "06:00  raw 450  moisture  84%  ok\n09:00  raw 520  moisture  68%  ok\n12:00  raw 640  moisture  41%  ok\n15:00  raw 715  moisture  24%  WATER NOW\n18:00  raw 702  moisture  27%  WATER NOW",
    "title": {
     "en": "Calibrated moisture readings",
     "am": "የተስተካከሉ የእርጥበት ንባቦች"
    },
    "note": {
     "en": "Capacitive sensors read higher numbers when drier, so the formula is reversed; check yours.",
     "am": "Capacitive ሴንሰሮች ሲደርቁ ከፍ ያሉ ቁጥሮችን ያነባሉ፤ ስለዚህ ቀመሩ ተገልብጧል፤ የአንተን ፈትሽ።"
    }
   }
  }
 ]
];
