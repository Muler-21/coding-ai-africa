/* Level 1 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[1] = [
 {
  "why": {
   "en": "Programs react to events (a click, a key) and use loops to repeat actions.",
   "am": "ፕሮግራሞች ለክስተቶች (ጠቅታ፣ ቁልፍ) ምላሽ ይሰጣሉ፤ ተግባራትን ለመድገም loops ይጠቀማሉ።"
  },
  "dg": [
   {
    "type": "blocks",
    "title": {
     "en": "Draw a square with a repeat loop",
     "am": "በrepeat loop ካሬ መሣል"
    },
    "blocks": [
     {
      "t": {
       "en": "🚩 when green flag clicked",
       "am": "🚩 አረንጓዴው ባንዲራ ሲጫን"
      },
      "c": "event"
     },
     {
      "t": {
       "en": "pen down",
       "am": "ብዕር አውርድ"
      },
      "c": "operator"
     },
     {
      "t": {
       "en": "repeat 4",
       "am": "4 ጊዜ ድገም"
      },
      "c": "control",
      "kids": [
       {
        "t": {
         "en": "move 100 steps",
         "am": "100 እርምጃ ሂድ"
        },
        "c": "motion"
       },
       {
        "t": {
         "en": "turn ↻ 90 degrees",
         "am": "↻ 90 ዲግሪ ዙር"
        },
        "c": "motion"
       }
      ]
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "repeat or forever?",
     "am": "repeat ወይስ forever?"
    },
    "cols": [
     {
      "h": {
       "en": "repeat 4",
       "am": "4 ጊዜ ድገም"
      },
      "items": {
       "en": [
        "Runs the inside 4 times, then goes on",
        "Use for shapes and counted actions"
       ],
       "am": [
        "ውስጡን 4 ጊዜ ያስኬዳል፣ ከዚያ ይቀጥላል",
        "ለቅርጾችና ለተቆጠሩ ተግባራት"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "forever",
       "am": "ለዘላለም"
      },
      "items": {
       "en": [
        "Runs until you press stop",
        "Use for animations and games"
       ],
       "am": [
        "stop እስክትጫን ይሠራል",
        "ለአኒሜሽኖችና ለጨዋታዎች"
       ]
      },
      "tone": ""
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "What makes a Scratch program run",
     "am": "የScratch ፕሮግራምን የሚያስኬደው"
    },
    "nodes": [
     {
      "t": {
       "en": "Event",
       "am": "ክስተት"
      },
      "s": {
       "en": "flag, key, click",
       "am": "ባንዲራ፣ ቁልፍ፣ ጠቅታ"
      }
     },
     {
      "t": {
       "en": "Script",
       "am": "ስክሪፕት"
      },
      "s": {
       "en": "blocks in order",
       "am": "በቅደም ተከተል ያሉ ብሎኮች"
      }
     },
     {
      "t": {
       "en": "Sprite acts",
       "am": "sprite ይሠራል"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "A windmill that turns forever",
    "am": "ለዘላለም የሚዞር የንፋስ ወፍጮ"
   },
   "steps": {
    "en": [
     "Draw a windmill sprite (or choose one) and a village backdrop.",
     "Add: when green flag clicked → forever → turn 15 degrees → wait 0.1 seconds.",
     "Add a second script: when space key pressed → change colour effect by 25.",
     "Click the flag; press space. Then press stop.",
     "Change the angle and wait time: what happens to the speed?"
    ],
    "am": [
     "የንፋስ ወፍጮ sprite ሣል (ወይም ምረጥ) እና የመንደር ዳራ።",
     "ጨምር፡ አረንጓዴው ባንዲራ ሲጫን → forever → 15 ዲግሪ ዙር → 0.1 ሰከንድ ጠብቅ።",
     "ሁለተኛ ስክሪፕት ጨምር፡ space ቁልፍ ሲጫን → የቀለም ውጤቱን በ25 ቀይር።",
     "ባንዲራውን ጫን፤ spaceን ጫን። ከዚያ stopን ጫን።",
     "ማዕዘኑንና የመጠበቂያ ጊዜውን ቀይር፡ ፍጥነቱ ምን ይሆናል?"
    ]
   }
  },
  "qa": {
   "en": [
    "An event block, usually \"when green flag clicked\" (or a key press or a click on a sprite).",
    "repeat runs a fixed number of times and then continues; forever never stops until you press stop.",
    "Four times: one for each side of the square, turning 90 degrees each time."
   ],
   "am": [
    "የክስተት ብሎክ፣ ብዙውን ጊዜ «አረንጓዴው ባንዲራ ሲጫን» (ወይም የቁልፍ መጫን ወይም sprite ላይ ጠቅታ)።",
    "repeat የተወሰነ ጊዜ ይሠራና ይቀጥላል፤ forever stop እስክትጫን አያቆምም።",
    "አራት ጊዜ፡ ለካሬው እያንዳንዱ ጎን አንድ፣ በእያንዳንዱ ጊዜ 90 ዲግሪ እየዞረ።"
   ]
  }
 },
 {
  "why": {
   "en": "Conditions let a program decide: do this if something is true, otherwise do that.",
   "am": "ሁኔታዎች (conditions) ፕሮግራም እንዲወስን ያስችላሉ፡ አንድ ነገር እውነት ከሆነ ይህን አድርግ፣ ካልሆነ ያንን።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "if … else, like the weather",
     "am": "if … else፣ እንደ አየር ሁኔታ"
    },
    "nodes": [
     {
      "t": {
       "en": "Is it raining?",
       "am": "ዝናብ እየዘነበ ነው?"
      }
     },
     {
      "t": {
       "en": "yes → take an umbrella",
       "am": "አዎ → ጃንጥላ ያዝ"
      },
      "hl": true
     },
     {
      "t": {
       "en": "no → take a hat",
       "am": "አይደለም → ኮፍያ ያዝ"
      }
     }
    ]
   },
   {
    "type": "blocks",
    "title": {
     "en": "Hand-washing game logic",
     "am": "የእጅ መታጠቢያ ጨዋታ ሎጂክ"
    },
    "blocks": [
     {
      "t": {
       "en": "🚩 when green flag clicked",
       "am": "🚩 አረንጓዴው ባንዲራ ሲጫን"
      },
      "c": "event"
     },
     {
      "t": {
       "en": "forever",
       "am": "ለዘላለም"
      },
      "c": "control",
      "kids": [
       {
        "t": {
         "en": "if touching Soap? then",
         "am": "ሳሙና ከነካ? ከሆነ"
        },
        "c": "control",
        "kids": [
         {
          "t": {
           "en": "switch costume to clean-hands",
           "am": "ልብሱን ወደ ንጹሕ-እጆች ቀይር"
          },
          "c": "looks"
         },
         {
          "t": {
           "en": "play sound \"well done\"",
           "am": "«ጎበዝ» ድምፅ አጫውት"
          },
          "c": "sound"
         }
        ]
       },
       {
        "t": {
         "en": "else: if touching Mud? then show germ",
         "am": "ካልሆነ፡ ጭቃ ከነካ? ጀርም አሳይ"
        },
        "c": "control"
       }
      ]
     }
    ]
   },
   {
    "type": "compare",
    "title": {
     "en": "Walking with two costumes",
     "am": "በሁለት ልብሶች መራመድ"
    },
    "cols": [
     {
      "h": {
       "en": "One picture",
       "am": "አንድ ሥዕል"
      },
      "items": {
       "en": [
        "Sprite slides like a sticker"
       ],
       "am": [
        "sprite እንደ ተለጣፊ ይንሸራተታል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "Two costumes, switched",
       "am": "ሁለት ልብሶች፣ ተቀያያሪ"
      },
      "items": {
       "en": [
        "legs forward, legs back",
        "looks like walking"
       ],
       "am": [
        "እግሮች ወደ ፊት፣ እግሮች ወደ ኋላ",
        "እንደ መራመድ ይመስላል"
       ]
      },
      "tone": "good"
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Catch-the-ball mini-game",
    "am": "ኳስ የመያዝ ትንሽ ጨዋታ"
   },
   "steps": {
    "en": [
     "Make a ball that falls from the top of the stage and a basket the player moves with the arrow keys.",
     "In the ball: forever → change y by −5 → if touching Basket then play sound and go to the top.",
     "Add: if y < −170 then go to the top (the ball was missed).",
     "Record your own voice saying \"Well done!\" in Amharic for the catch sound.",
     "Test with a friend and adjust the falling speed."
    ],
    "am": [
     "ከመድረኩ አናት የሚወድቅ ኳስና ተጫዋቹ በቀስት ቁልፎች የሚያንቀሳቅሰው ቅርጫት ሥራ።",
     "በኳሱ ውስጥ፡ forever → yን በ−5 ቀይር → ቅርጫት ከነካ ድምፅ አጫውትና ወደ ላይ ሂድ።",
     "ጨምር፡ y < −170 ከሆነ ወደ ላይ ሂድ (ኳሱ አመለጠ)።",
     "ለመያዣው ድምፅ በአማርኛ «ጎበዝ!» የሚል የራስህን ድምፅ ቅዳ።",
     "ከጓደኛ ጋር ፈትሽና የመውደቂያ ፍጥነቱን አስተካክል።"
    ]
   }
  },
  "qa": {
   "en": [
    "It checks a condition: if it is true the first blocks run, otherwise the blocks under else run.",
    "With the sensing block \"touching edge?\" (or touching a wall sprite) inside an if.",
    "Switching between two pictures quickly makes the legs look like they move."
   ],
   "am": [
    "ሁኔታን ይፈትሻል፡ እውነት ከሆነ የመጀመሪያዎቹ ብሎኮች ይሠራሉ፣ ካልሆነ ከelse በታች ያሉት ይሠራሉ።",
    "በif ውስጥ ባለው «ጠርዙን ነካ?» (ወይም የግድግዳ spriteን ነካ) በሚለው የsensing ብሎክ።",
    "በሁለት ሥዕሎች መካከል በፍጥነት መቀያየር እግሮቹ የሚንቀሳቀሱ ያስመስላል።"
   ]
  }
 },
 {
  "why": {
   "en": "Variables remember numbers (score, lives, time); coordinates tell where things are.",
   "am": "variables ቁጥሮችን (ውጤት፣ ሕይወቶች፣ ጊዜ) ያስታውሳሉ፤ coordinates ነገሮች የት እንዳሉ ይነግራሉ።"
  },
  "dg": [
   {
    "type": "stack",
    "title": {
     "en": "The Scratch stage is a coordinate grid",
     "am": "የScratch መድረክ የcoordinate ፍርግርግ ነው"
    },
    "layers": [
     {
      "t": {
       "en": "Top edge: y = 180",
       "am": "የላይኛው ጠርዝ፡ y = 180"
      }
     },
     {
      "t": {
       "en": "Centre: x = 0, y = 0",
       "am": "መሀል፡ x = 0፣ y = 0"
      }
     },
     {
      "t": {
       "en": "Left edge x = −240, right edge x = 240",
       "am": "የግራ ጠርዝ x = −240፣ የቀኝ ጠርዝ x = 240"
      }
     },
     {
      "t": {
       "en": "Bottom edge: y = −180",
       "am": "የታችኛው ጠርዝ፡ y = −180"
      }
     }
    ],
    "note": {
     "en": "x grows to the right, y grows upwards.",
     "am": "x ወደ ቀኝ ያድጋል፣ y ወደ ላይ ያድጋል።"
    }
   },
   {
    "type": "blocks",
    "title": {
     "en": "Score, lives and game over",
     "am": "ውጤት፣ ሕይወቶችና ጨዋታው አበቃ"
    },
    "blocks": [
     {
      "t": {
       "en": "🚩 when green flag clicked",
       "am": "🚩 አረንጓዴው ባንዲራ ሲጫን"
      },
      "c": "event"
     },
     {
      "t": {
       "en": "set score to 0",
       "am": "scoreን 0 አድርግ"
      },
      "c": "data"
     },
     {
      "t": {
       "en": "set lives to 3",
       "am": "livesን 3 አድርግ"
      },
      "c": "data"
     },
     {
      "t": {
       "en": "go to x: (pick random −220 to 220) y: 170",
       "am": "ወደ x: (ከ−220 እስከ 220 በዘፈቀደ) y: 170 ሂድ"
      },
      "c": "motion"
     },
     {
      "t": {
       "en": "repeat until lives = 0",
       "am": "lives = 0 እስኪሆን ድገም"
      },
      "c": "control",
      "kids": [
       {
        "t": {
         "en": "if touching Basket: change score by 1",
         "am": "ቅርጫት ከነካ፡ scoreን በ1 ቀይር"
        },
        "c": "data"
       },
       {
        "t": {
         "en": "if y < −170: change lives by −1",
         "am": "y < −170 ከሆነ፡ livesን በ−1 ቀይር"
        },
        "c": "data"
       }
      ]
     },
     {
      "t": {
       "en": "say \"Game over!\"",
       "am": "«ጨዋታው አበቃ!» በል"
      },
      "c": "looks"
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Count-the-money game",
    "am": "ገንዘብ የመቁጠር ጨዋታ"
   },
   "steps": {
    "en": [
     "Draw coin and note sprites (1, 5, 10, 50 birr).",
     "Make variables: target (random 10–100) and total.",
     "When a coin is clicked, change total by its value.",
     "If total = target, say \"Correct!\" and change score by 1; if total > target, say \"Too much!\" and reset total.",
     "Add a 30-second timer variable that counts down."
    ],
    "am": [
     "የሳንቲምና የብር ኖት sprites ሣል (1፣ 5፣ 10፣ 50 ብር)።",
     "variables ሥራ፡ target (በዘፈቀደ 10–100) እና total።",
     "ሳንቲም ሲጫን totalን በዋጋው ቀይር።",
     "total = target ከሆነ «ትክክል!» በልና scoreን በ1 ቀይር፤ total > target ከሆነ «በዛ!» በልና totalን እንደገና ጀምር።",
     "የሚቆጥር የ30 ሰከንድ timer variable ጨምር።"
    ]
   }
  },
  "qa": {
   "en": [
    "A named box that stores a value, such as score, which the program can read and change.",
    "In the centre of the stage.",
    "A variable (lives or time) reaches 0, and an if or repeat-until block checks for it."
   ],
   "am": [
    "ፕሮግራሙ ሊያነበውና ሊቀይረው የሚችል እሴት የሚያስቀምጥ ስም ያለው ሳጥን፣ ለምሳሌ score።",
    "በመድረኩ መሀል።",
    "variable (lives ወይም ጊዜ) 0 ይደርሳል፣ የif ወይም repeat-until ብሎክ ይፈትሸዋል።"
   ]
  }
 },
 {
  "why": {
   "en": "Lists hold many values under one name; messages let sprites work together.",
   "am": "lists ብዙ እሴቶችን በአንድ ስም ይይዛሉ፤ መልእክቶች sprites አብረው እንዲሠሩ ያስችላሉ።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Ten variables or one list?",
     "am": "አሥር variables ወይስ አንድ list?"
    },
    "cols": [
     {
      "h": {
       "en": "Ten variables",
       "am": "አሥር variables"
      },
      "items": {
       "en": [
        "question1, question2, … question10",
        "Ten blocks to change, easy to make mistakes"
       ],
       "am": [
        "question1፣ question2፣ … question10",
        "የሚቀየሩ አሥር ብሎኮች፣ ለስህተት ቀላል"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "One list",
       "am": "አንድ list"
      },
      "items": {
       "en": [
        "questions: item 1 … item 10",
        "One loop reads them all; add more anytime"
       ],
       "am": [
        "questions፡ ንጥል 1 … ንጥል 10",
        "አንድ loop ሁሉንም ያነባል፤ በማንኛውም ጊዜ ጨምር"
       ]
      },
      "tone": "good"
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "Broadcast: one sprite tells others to start",
     "am": "Broadcast፡ አንድ sprite ሌሎች እንዲጀምሩ ይነግራል"
    },
    "nodes": [
     {
      "t": {
       "en": "Host sprite",
       "am": "አስተናጋጅ sprite"
      },
      "s": {
       "en": "broadcast \"next question\"",
       "am": "«ቀጣይ ጥያቄ» ያሰራጫል"
      }
     },
     {
      "t": {
       "en": "Message",
       "am": "መልእክት"
      }
     },
     {
      "t": {
       "en": "Quiz board",
       "am": "የጥያቄ ሰሌዳ"
      },
      "s": {
       "en": "shows question n",
       "am": "ጥያቄ nን ያሳያል"
      },
      "hl": true
     },
     {
      "t": {
       "en": "Timer",
       "am": "ሰዓት ቆጣሪ"
      },
      "s": {
       "en": "restarts at 20 s",
       "am": "በ20 ሰ እንደገና ይጀምራል"
      }
     }
    ]
   },
   {
    "type": "flow",
    "title": {
     "en": "Plan → build → test → swap",
     "am": "አቅድ → ገንባ → ፈትሽ → ተቀያየሩ"
    },
    "nodes": [
     {
      "t": {
       "en": "Storyboard on paper",
       "am": "በወረቀት የታሪክ ሰሌዳ"
      }
     },
     {
      "t": {
       "en": "Build in pairs",
       "am": "በጥንድ ገንቡ"
      }
     },
     {
      "t": {
       "en": "Friend tests",
       "am": "ጓደኛ ይፈትናል"
      }
     },
     {
      "t": {
       "en": "Fix bugs",
       "am": "ስህተቶችን አስተካክሉ"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "A quiz about your region",
    "am": "ስለ ክልልህ ጥያቄ"
   },
   "steps": {
    "en": [
     "Make two lists: questions and answers (for example rivers, crops, animals).",
     "Set n to 1. The host broadcasts \"ask\".",
     "When I receive \"ask\": ask (item n of questions) and wait; if answer = item n of answers, change score by 1.",
     "Change n by 1 and broadcast \"ask\" again until n > length of questions.",
     "Bonus: train Teachable Machine to recognise two crops and use it as a picture question."
    ],
    "am": [
     "ሁለት lists ሥራ፡ questions እና answers (ለምሳሌ ወንዞች፣ ሰብሎች፣ እንስሳት)።",
     "nን 1 አድርግ። አስተናጋጁ «ask» ያሰራጫል።",
     "«ask» ስቀበል፡ (የquestions ንጥል n) ጠይቅና ጠብቅ፤ መልሱ = የanswers ንጥል n ከሆነ scoreን በ1 ቀይር።",
     "n > የquestions ርዝመት እስኪሆን nን በ1 ቀይርና «ask»ን እንደገና አሰራጭ።",
     "ተጨማሪ፡ ሁለት ሰብሎችን እንዲለይ Teachable Machineን አሰልጥነውና እንደ የሥዕል ጥያቄ ተጠቀምበት።"
    ]
   }
  },
  "qa": {
   "en": [
    "One list can hold any number of items and one loop can process them all; ten variables need ten separate blocks.",
    "It sends a message to all sprites; every script that starts \"when I receive\" that message runs.",
    "Usually unclear instructions, a wrong answer check, or a timer that did not reset; testers find what the builder misses."
   ],
   "am": [
    "አንድ list ማንኛውንም ቁጥር ንጥሎች ሊይዝ ይችላል፣ አንድ loop ሁሉንም ሊያስኬድ ይችላል፤ አሥር variables አሥር የተለያዩ ብሎኮች ያስፈልጋቸዋል።",
    "ለሁሉም sprites መልእክት ይልካል፤ በ«ያንን መልእክት ስቀበል» የሚጀምር እያንዳንዱ ስክሪፕት ይሠራል።",
    "ብዙውን ጊዜ ግልጽ ያልሆኑ መመሪያዎች፣ የተሳሳተ የመልስ ፍተሻ፣ ወይም እንደገና ያልጀመረ timer፤ ፈታኞች ገንቢው ያመለጠውን ያገኛሉ።"
   ]
  }
 }
];
