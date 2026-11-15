/* Level 0 module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */
window.MODX = window.MODX || {};
window.MODX[0] = [
 {
  "why": {
   "en": "A computer only does exactly what we say, in the order we say it.",
   "am": "ኮምፒውተር የምንለውን ብቻ፣ በምንለው ቅደም ተከተል ብቻ ያደርጋል።"
  },
  "dg": [
   {
    "type": "grid",
    "title": {
     "en": "Arrow cards move the robot home",
     "am": "የቀስት ካርዶች ሮቦቱን ወደ ቤት ያንቀሳቅሳሉ"
    },
    "n": 4,
    "start": [
     3,
     0,
     "N"
    ],
    "goal": [
     0,
     3
    ],
    "prog": "FFFRFFF",
    "note": {
     "en": "Each card is one step. The robot (orange) follows the cards from 1 to 7 and reaches the house.",
     "am": "እያንዳንዱ ካርድ አንድ እርምጃ ነው። ሮቦቱ (ብርቱካናማ) ካርዶቹን ከ1 እስከ 7 ይከተላል፣ ቤቱም ይደርሳል።"
    }
   },
   {
    "type": "flow",
    "title": {
     "en": "Order matters: making tea",
     "am": "ቅደም ተከተል አስፈላጊ ነው፡ ሻይ ማፍላት"
    },
    "nodes": [
     {
      "t": {
       "en": "1. Pour water",
       "am": "1. ውሃ ጨምር"
      }
     },
     {
      "t": {
       "en": "2. Boil it",
       "am": "2. አፍላው"
      }
     },
     {
      "t": {
       "en": "3. Add tea leaves",
       "am": "3. የሻይ ቅጠል ጨምር"
      }
     },
     {
      "t": {
       "en": "4. Pour into a cup",
       "am": "4. በሲኒ ቅዳ"
      },
      "hl": true
     }
    ],
    "note": {
     "en": "Swap steps 1 and 2 and you boil an empty pot. A program is the same: the order changes the result.",
     "am": "ደረጃ 1 እና 2ን ብታቀያይር ባዶ ድስት ታፈላለህ። ፕሮግራምም እንዲሁ ነው፡ ቅደም ተከተሉ ውጤቱን ይቀይራል።"
    }
   }
  ],
  "ex": {
   "title": {
    "en": "Play \"Robot teacher\" (10 minutes)",
    "am": "«ሮቦት አስተማሪ» ተጫወቱ (10 ደቂቃ)"
   },
   "steps": {
    "en": [
     "Chalk a 4×4 grid and put a \"house\" stone in one corner.",
     "One child is the robot. It may only do what a card says.",
     "The class lays out arrow cards in a line: ↑ ↑ ↑ ↻ ↑ ↑ ↑.",
     "Read the cards aloud one by one; the robot moves one square per ↑ card.",
     "Did the robot reach the house? If not, which card is wrong?"
    ],
    "am": [
     "በመሬት ላይ 4×4 ፍርግርግ በጠመኔ ሣሉ፣ በአንድ ጥግ «ቤት» ድንጋይ አስቀምጡ።",
     "አንድ ልጅ ሮቦት ይሆናል። ካርዱ የሚለውን ብቻ ማድረግ ይችላል።",
     "ክፍሉ የቀስት ካርዶችን በመስመር ያስቀምጣል፡ ↑ ↑ ↑ ↻ ↑ ↑ ↑።",
     "ካርዶቹን አንድ በአንድ ጮክ ብላችሁ አንብቡ፤ ሮቦቱ ለእያንዳንዱ ↑ ካርድ አንድ ካሬ ይንቀሳቀሳል።",
     "ሮቦቱ ቤቱ ደረሰ? ካልደረሰ የትኛው ካርድ ስህተት ነው?"
    ]
   }
  },
  "qa": {
   "en": [
    "The result changes. The robot goes the wrong way, or the tea is made wrong.",
    "Yes: for example forward, forward, turn right, forward, forward. Test it by walking it.",
    "The child who acts as the robot: it follows the instructions exactly, like a computer."
   ],
   "am": [
    "ውጤቱ ይቀየራል። ሮቦቱ በተሳሳተ መንገድ ይሄዳል፣ ወይም ሻዩ በስህተት ይሠራል።",
    "አዎ፡ ለምሳሌ ወደ ፊት፣ ወደ ፊት፣ ወደ ቀኝ ዙር፣ ወደ ፊት፣ ወደ ፊት። በመራመድ ፈትሸው።",
    "ሮቦት የሆነው ልጅ ነው፡ እንደ ኮምፒውተር መመሪያዎቹን በትክክል ይከተላል።"
   ]
  }
 },
 {
  "why": {
   "en": "Spotting a pattern lets us describe many things with one short rule.",
   "am": "ንድፍ (pattern) ማየት ብዙ ነገሮችን በአንድ አጭር ሕግ እንድንገልጽ ያስችለናል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "A repeating pattern and its rule",
     "am": "የሚደጋገም ንድፍና ሕጉ"
    },
    "nodes": [
     {
      "t": {
       "en": "👏 clap",
       "am": "👏 ማጨብጨብ"
      }
     },
     {
      "t": {
       "en": "🦶 stomp",
       "am": "🦶 መርገጥ"
      }
     },
     {
      "t": {
       "en": "👏 clap",
       "am": "👏 ማጨብጨብ"
      }
     },
     {
      "t": {
       "en": "🦶 stomp",
       "am": "🦶 መርገጥ"
      }
     },
     {
      "t": {
       "en": "? next",
       "am": "? ቀጣዩ"
      },
      "s": {
       "en": "clap",
       "am": "ማጨብጨብ"
      },
      "hl": true
     }
    ],
    "loop": {
     "en": "Rule: clap, stomp, and repeat",
     "am": "ሕግ፡ አጨብጭብ፣ እርገጥ፣ ደግመህ"
    }
   },
   {
    "type": "compare",
    "title": {
     "en": "Find the mistake in the bead pattern",
     "am": "በዶቃ ንድፉ ውስጥ ስህተቱን ፈልግ"
    },
    "cols": [
     {
      "h": {
       "en": "Correct",
       "am": "ትክክል"
      },
      "items": {
       "en": [
        "🔴 ⚪ 🔴 ⚪ 🔴 ⚪",
        "Rule: red, white, repeat"
       ],
       "am": [
        "🔴 ⚪ 🔴 ⚪ 🔴 ⚪",
        "ሕግ፡ ቀይ፣ ነጭ፣ ደግም"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "One bead is wrong",
       "am": "አንድ ዶቃ ስህተት ነው"
      },
      "items": {
       "en": [
        "🔴 ⚪ 🔴 🔴 🔴 ⚪",
        "Bead 4 breaks the rule"
       ],
       "am": [
        "🔴 ⚪ 🔴 🔴 🔴 ⚪",
        "ዶቃ 4 ሕጉን ይጥሳል"
       ]
      },
      "tone": "bad"
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Make a seed necklace pattern",
    "am": "የዘር ሐብል ንድፍ ሥራ"
   },
   "steps": {
    "en": [
     "Choose two kinds of seeds or bottle tops (for example red beans and white maize).",
     "Decide a rule, such as \"2 red, 1 white\".",
     "Thread 12 items following the rule.",
     "Swap with a friend: they must say your rule out loud.",
     "Hide one mistake and ask them to find it."
    ],
    "am": [
     "ሁለት ዓይነት ዘሮች ወይም የጠርሙስ ክዳኖች ምረጥ (ለምሳሌ ቀይ ባቄላና ነጭ በቆሎ)።",
     "ሕግ ወስን፣ ለምሳሌ «2 ቀይ፣ 1 ነጭ»።",
     "ሕጉን ተከትለህ 12 ነገሮችን በክር አስገባ።",
     "ከጓደኛህ ጋር ተቀያየሩ፡ ሕግህን ጮክ ብሎ መናገር አለበት።",
     "አንድ ስህተት ደብቅና እንዲያገኘው ጠይቀው።"
    ]
   }
  },
  "qa": {
   "en": [
    "Stomp. The pattern is clap, stomp, clap, stomp…",
    "Say what repeats, for example \"red, white, then start again\".",
    "Basket and mesob weaving, netela borders, floor tiles, songs and the days of the week."
   ],
   "am": [
    "መርገጥ። ንድፉ አጨብጭብ፣ እርገጥ፣ አጨብጭብ፣ እርገጥ… ነው።",
    "የሚደጋገመውን ተናገር፣ ለምሳሌ «ቀይ፣ ነጭ፣ ከዚያ እንደገና»።",
    "የሰፌድና የመሶብ ስራ፣ የነጠላ ጥለት፣ የወለል ንጣፎች፣ ዘፈኖችና የሳምንቱ ቀናት።"
   ]
  }
 },
 {
  "why": {
   "en": "Grids and directions are how robots, maps and games describe where things are.",
   "am": "ፍርግርጎችና አቅጣጫዎች ሮቦቶች፣ ካርታዎችና ጨዋታዎች ነገሮች የት እንዳሉ የሚገልጹበት መንገድ ናቸው።"
  },
  "dg": [
   {
    "type": "grid",
    "title": {
     "en": "Go around the wall to the treasure",
     "am": "ግድግዳውን ዞረህ ወደ ሀብቱ ሂድ"
    },
    "n": 5,
    "start": [
     4,
     0,
     "E"
    ],
    "goal": [
     0,
     4
    ],
    "prog": "FLFFFRFFFLF",
    "walls": [
     [
      4,
      2
     ],
     [
      3,
      2
     ],
     [
      2,
      2
     ]
    ],
    "note": {
     "en": "Grey squares are a wall. A turn card changes direction but does not move the robot.",
     "am": "ግራጫ ካሬዎች ግድግዳ ናቸው። የመዞሪያ ካርድ አቅጣጫ ይቀይራል እንጂ ሮቦቱን አያንቀሳቅስም።"
    }
   },
   {
    "type": "compare",
    "title": {
     "en": "Two kinds of instructions",
     "am": "ሁለት ዓይነት መመሪያዎች"
    },
    "cols": [
     {
      "h": {
       "en": "Move",
       "am": "መንቀሳቀስ"
      },
      "items": {
       "en": [
        "↑ forward one square"
       ],
       "am": [
        "↑ አንድ ካሬ ወደ ፊት"
       ]
      },
      "tone": "good"
     },
     {
      "h": {
       "en": "Turn (stay on the square)",
       "am": "መዞር (በካሬው ላይ መቆየት)"
      },
      "items": {
       "en": [
        "↻ turn right",
        "↺ turn left"
       ],
       "am": [
        "↻ ወደ ቀኝ ዙር",
        "↺ ወደ ግራ ዙር"
       ]
      },
      "tone": ""
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Treasure-map game",
    "am": "የሀብት ካርታ ጨዋታ"
   },
   "steps": {
    "en": [
     "Draw a 5×5 grid on paper; mark START and hide a \"treasure\" square.",
     "Draw the arrows a friend must follow.",
     "The friend walks the chalk grid using only your arrows.",
     "Count the steps: could a shorter path work?"
    ],
    "am": [
     "በወረቀት ላይ 5×5 ፍርግርግ ሣል፤ መነሻን ምልክት አድርግና የ«ሀብት» ካሬ ደብቅ።",
     "ጓደኛህ መከተል ያለበትን ቀስቶች ሣል።",
     "ጓደኛው ቀስቶችህን ብቻ በመጠቀም በጠመኔ ፍርግርጉ ላይ ይራመዳል።",
     "እርምጃዎቹን ቁጠር፡ አጭር መንገድ ይሠራ ነበር?"
    ]
   }
  },
  "qa": {
   "en": [
    "The hand you do not write with for most people; check by holding up the hand that makes an \"L\" shape with thumb and finger.",
    "Count the squares along the path, one step per square, plus any turns you need.",
    "Yes: draw one arrow for every square you move, and a turn arrow where the path changes direction."
   ],
   "am": [
    "ለአብዛኞቹ ሰዎች የማይጽፉበት እጅ ነው፤ በአውራ ጣትና በጣት «L» ቅርጽ የሚሠራውን እጅ ከፍ በማድረግ አረጋግጥ።",
    "በመንገዱ ላይ ያሉትን ካሬዎች ቁጠር፣ ለአንድ ካሬ አንድ እርምጃ፣ የሚያስፈልጉ መዞሪያዎችንም ጨምር።",
    "አዎ፡ ለምትንቀሳቀስበት እያንዳንዱ ካሬ አንድ ቀስት፣ መንገዱ አቅጣጫ በሚቀይርበት ደግሞ የመዞሪያ ቀስት ሣል።"
   ]
  }
 },
 {
  "why": {
   "en": "A loop repeats steps, so long programs become short and easy to check.",
   "am": "loop (ድግግሞሽ) እርምጃዎችን ይደግማል፤ ስለዚህ ረጅም ፕሮግራሞች አጭርና ለመፈተሽ ቀላል ይሆናሉ።"
  },
  "dg": [
   {
    "type": "compare",
    "title": {
     "en": "Same path, fewer cards",
     "am": "ያው መንገድ፣ ያነሱ ካርዶች"
    },
    "cols": [
     {
      "h": {
       "en": "Without a loop: 6 cards",
       "am": "ያለ loop፡ 6 ካርዶች"
      },
      "items": {
       "en": [
        "↑",
        "↑",
        "↑",
        "↑",
        "↑",
        "↑"
       ],
       "am": [
        "↑",
        "↑",
        "↑",
        "↑",
        "↑",
        "↑"
       ]
      },
      "tone": "bad"
     },
     {
      "h": {
       "en": "With a loop: 2 cards",
       "am": "ከloop ጋር፡ 2 ካርዶች"
      },
      "items": {
       "en": [
        "🔁 repeat 6 times",
        "   ↑"
       ],
       "am": [
        "🔁 6 ጊዜ ድገም",
        "   ↑"
       ]
      },
      "tone": "good"
     }
    ],
    "verdict": {
     "en": "The repeat card saved 4 cards, and the robot does exactly the same thing.",
     "am": "የድገም ካርዱ 4 ካርዶችን አዳነ፤ ሮቦቱም በትክክል ያንኑ ያደርጋል።"
    }
   },
   {
    "type": "cycle",
    "title": {
     "en": "Drawing a square with a loop",
     "am": "በloop ካሬ መሣል"
    },
    "nodes": [
     {
      "t": {
       "en": "↑ ↑ forward 2",
       "am": "↑ ↑ 2 ወደ ፊት"
      }
     },
     {
      "t": {
       "en": "↻ turn right",
       "am": "↻ ወደ ቀኝ ዙር"
      }
     }
    ],
    "loop": {
     "en": "repeat 4 times → a square",
     "am": "4 ጊዜ ድገም → ካሬ"
    }
   }
  ],
  "ex": {
   "title": {
    "en": "Loop race",
    "am": "የloop ውድድር"
   },
   "steps": {
    "en": [
     "Write a long path with arrow cards, for example 8 forwards.",
     "Rewrite it with a repeat card.",
     "Walk both versions on the grid: do they end in the same place?",
     "Count the cards saved. The team that saves the most wins."
    ],
    "am": [
     "በቀስት ካርዶች ረጅም መንገድ ጻፉ፣ ለምሳሌ 8 ወደ ፊት።",
     "በድገም ካርድ እንደገና ጻፉት።",
     "ሁለቱንም በፍርግርጉ ላይ ተራመዱ፡ በአንድ ቦታ ያልቃሉ?",
     "የዳኑትን ካርዶች ቁጠሩ። ብዙ ያዳነው ቡድን ያሸንፋል።"
    ]
   }
  },
  "qa": {
   "en": [
    "Count the cards before and after; for 6 forwards the repeat card saved 4 cards.",
    "Do the steps inside the repeat four times, one after the other.",
    "Yes: a chorus that is sung again after each verse is a loop."
   ],
   "am": [
    "ከዚያ በፊትና በኋላ ያሉትን ካርዶች ቁጠር፤ ለ6 ወደ ፊት የድገም ካርዱ 4 ካርዶችን አድኗል።",
    "በድገሙ ውስጥ ያሉትን እርምጃዎች አራት ጊዜ በተከታታይ አድርግ።",
    "አዎ፡ ከእያንዳንዱ አንጓ በኋላ እንደገና የሚዘመር አዝማች loop ነው።"
   ]
  }
 },
 {
  "why": {
   "en": "Every programmer makes mistakes. Finding and fixing them, calmly, is a skill.",
   "am": "እያንዳንዱ ፕሮግራመር ስህተት ይሠራል። በእርጋታ ማግኘትና ማስተካከል ክህሎት ነው።"
  },
  "dg": [
   {
    "type": "grid",
    "title": {
     "en": "This program has a bug",
     "am": "ይህ ፕሮግራም ስህተት አለው"
    },
    "n": 4,
    "start": [
     3,
     0,
     "N"
    ],
    "goal": [
     0,
     3
    ],
    "prog": "FFRFFF",
    "note": {
     "en": "The robot turns one square too early. Fix: add one more ↑ before the ↻ card.",
     "am": "ሮቦቱ አንድ ካሬ ቀድሞ ይዞራል። ማስተካከያ፡ ከ↻ ካርዱ በፊት አንድ ተጨማሪ ↑ ጨምር።"
    }
   },
   {
    "type": "cycle",
    "title": {
     "en": "The debugging loop",
     "am": "የስህተት ማረሚያ ዑደት"
    },
    "nodes": [
     {
      "t": {
       "en": "Test",
       "am": "ፈትሽ"
      },
      "s": {
       "en": "walk the path",
       "am": "መንገዱን ተራመድ"
      }
     },
     {
      "t": {
       "en": "Find",
       "am": "ፈልግ"
      },
      "s": {
       "en": "where did it go wrong?",
       "am": "የት ተሳሳተ?"
      }
     },
     {
      "t": {
       "en": "Fix",
       "am": "አስተካክል"
      },
      "s": {
       "en": "change one card",
       "am": "አንድ ካርድ ቀይር"
      }
     },
     {
      "t": {
       "en": "Test again",
       "am": "እንደገና ፈትሽ"
      },
      "hl": true
     }
    ],
    "loop": {
     "en": "until the robot gets home",
     "am": "ሮቦቱ ቤት እስኪደርስ"
    }
   }
  ],
  "ex": {
   "title": {
    "en": "Fix the broken robot above",
    "am": "ከላይ ያለውን የተበላሸ ሮቦት አስተካክል"
   },
   "steps": {
    "en": [
     "Walk the cards ↑ ↑ ↻ ↑ ↑ ↑ on the grid. Where does the robot stop?",
     "Point to the first step where the robot leaves the right path: the turn comes too early.",
     "Add one ↑ card before the ↻ card: ↑ ↑ ↑ ↻ ↑ ↑ ↑.",
     "Walk it again: now the robot reaches the house."
    ],
    "am": [
     "ካርዶቹን ↑ ↑ ↻ ↑ ↑ ↑ በፍርግርጉ ላይ ተራመድ። ሮቦቱ የት ይቆማል?",
     "ሮቦቱ ከትክክለኛው መንገድ የሚወጣበትን የመጀመሪያ እርምጃ አመልክት፡ መዞሪያው ቀድሞ ይመጣል።",
     "ከ↻ ካርዱ በፊት አንድ ↑ ካርድ ጨምር፡ ↑ ↑ ↑ ↻ ↑ ↑ ↑።",
     "እንደገና ተራመድ፡ አሁን ሮቦቱ ቤቱ ይደርሳል።"
    ]
   }
  },
  "qa": {
   "en": [
    "A mistake in the instructions that makes the program do the wrong thing.",
    "By walking the path step by step and stopping at the first step that went wrong.",
    "Test again, to check the fix works and did not break anything else."
   ],
   "am": [
    "ፕሮግራሙ የተሳሳተ ነገር እንዲያደርግ የሚያደርግ በመመሪያዎቹ ውስጥ ያለ ስህተት።",
    "መንገዱን እርምጃ በእርምጃ በመራመድና የተሳሳተው የመጀመሪያ እርምጃ ላይ በመቆም።",
    "ማስተካከያው መሥራቱንና ሌላ ነገር አለማበላሸቱን ለማረጋገጥ እንደገና መፈተሽ።"
   ]
  }
 },
 {
  "why": {
   "en": "The same ideas (order, loops, fixing) now work on a screen with picture blocks.",
   "am": "ያው ሐሳቦች (ቅደም ተከተል፣ ድግግሞሽ፣ ማስተካከል) አሁን በሥዕል ብሎኮች በስክሪን ላይ ይሠራሉ።"
  },
  "dg": [
   {
    "type": "blocks",
    "title": {
     "en": "A first ScratchJr-style program",
     "am": "የመጀመሪያ የScratchJr ዓይነት ፕሮግራም"
    },
    "blocks": [
     {
      "t": {
       "en": "🚩 When green flag tapped",
       "am": "🚩 አረንጓዴው ባንዲራ ሲነካ"
      },
      "c": "event"
     },
     {
      "t": {
       "en": "➡ Move right 4",
       "am": "➡ ወደ ቀኝ 4 ሂድ"
      },
      "c": "motion"
     },
     {
      "t": {
       "en": "💬 Say \"Selam! Hello!\"",
       "am": "💬 «ሰላም! Hello!» በል"
      },
      "c": "looks"
     },
     {
      "t": {
       "en": "⬆ Jump 2",
       "am": "⬆ 2 ዝለል"
      },
      "c": "motion"
     },
     {
      "t": {
       "en": "⏹ End",
       "am": "⏹ መጨረሻ"
      },
      "c": "control"
     }
    ],
    "note": {
     "en": "Blocks snap together from left to right (here top to bottom). The flag block starts the program.",
     "am": "ብሎኮች ከግራ ወደ ቀኝ (እዚህ ከላይ ወደ ታች) ይገጣጠማሉ። የባንዲራው ብሎክ ፕሮግራሙን ይጀምራል።"
    }
   },
   {
    "type": "flow",
    "title": {
     "en": "From play to screen",
     "am": "ከጨዋታ ወደ ስክሪን"
    },
    "nodes": [
     {
      "t": {
       "en": "Arrow cards on the floor",
       "am": "በወለሉ ላይ የቀስት ካርዶች"
      }
     },
     {
      "t": {
       "en": "Blocks on a tablet",
       "am": "በታብሌት ላይ ብሎኮች"
      }
     },
     {
      "t": {
       "en": "Character moves",
       "am": "ገጸ ባሕሪው ይንቀሳቀሳል"
      },
      "hl": true
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Group program: one block each",
    "am": "የቡድን ፕሮግራም፡ ለእያንዳንዱ አንድ ብሎክ"
   },
   "steps": {
    "en": [
     "Groups of three share one tablet or phone with ScratchJr.",
     "Child 1 adds the green-flag block.",
     "Child 2 adds a move block; child 3 adds a say block with a greeting in Amharic and English.",
     "Tap the flag. Did the character do what you planned? Fix one block if not.",
     "Screen time ends after 15 minutes; talk about what you made."
    ],
    "am": [
     "ሦስት ልጆች ያሉት ቡድን ScratchJr ያለው አንድ ታብሌት ወይም ስልክ ይጋራል።",
     "ልጅ 1 የአረንጓዴ ባንዲራ ብሎክ ይጨምራል።",
     "ልጅ 2 የመንቀሳቀሻ ብሎክ ይጨምራል፤ ልጅ 3 በአማርኛና በእንግሊዝኛ ሰላምታ ያለው የመናገሪያ ብሎክ ይጨምራል።",
     "ባንዲራውን ንኩ። ገጸ ባሕሪው ያቀዳችሁትን አደረገ? ካላደረገ አንድ ብሎክ አስተካክሉ።",
     "የስክሪን ጊዜ ከ15 ደቂቃ በኋላ ያበቃል፤ ስለሠራችሁት ተነጋገሩ።"
    ]
   }
  },
  "qa": {
   "en": [
    "A blue motion block, such as move right or jump.",
    "By tapping the green flag (or the start block at the beginning).",
    "Whatever was typed in the say block, for example \"Selam! Hello!\"."
   ],
   "am": [
    "ሰማያዊ የመንቀሳቀሻ ብሎክ፣ ለምሳሌ ወደ ቀኝ ሂድ ወይም ዝለል።",
    "አረንጓዴውን ባንዲራ (ወይም በመጀመሪያ ያለውን የመጀመሪያ ብሎክ) በመንካት።",
    "በመናገሪያ ብሎኩ የተጻፈው ነገር፣ ለምሳሌ «ሰላም! Hello!»።"
   ]
  }
 },
 {
  "why": {
   "en": "Planning before moving is what engineers do: think, write the plan, then test it.",
   "am": "ከመንቀሳቀስ በፊት ማቀድ መሐንዲሶች የሚያደርጉት ነው፡ አስብ፣ ዕቅዱን ጻፍ፣ ከዚያ ፈትሸው።"
  },
  "dg": [
   {
    "type": "grid",
    "title": {
     "en": "Go around the stone",
     "am": "ድንጋዩን ዞረህ ሂድ"
    },
    "n": 4,
    "start": [
     3,
     0,
     "E"
    ],
    "goal": [
     3,
     3
    ],
    "prog": "FLFRFFRF",
    "walls": [
     [
      3,
      2
     ]
    ],
    "note": {
     "en": "The stone blocks the straight path, so the robot goes up, across and down again.",
     "am": "ድንጋዩ ቀጥታውን መንገድ ስለሚዘጋ ሮቦቱ ወደ ላይ፣ ወደ ጎን፣ ከዚያ እንደገና ወደ ታች ይሄዳል።"
    }
   },
   {
    "type": "flow",
    "title": {
     "en": "Plan, program, run, check",
     "am": "አቅድ፣ ፕሮግራም አድርግ፣ አስኪድ፣ ፈትሽ"
    },
    "nodes": [
     {
      "t": {
       "en": "Plan on paper",
       "am": "በወረቀት አቅድ"
      }
     },
     {
      "t": {
       "en": "Lay the cards",
       "am": "ካርዶቹን አስቀምጥ"
      }
     },
     {
      "t": {
       "en": "Move the robot",
       "am": "ሮቦቱን አንቀሳቅስ"
      }
     },
     {
      "t": {
       "en": "Did it arrive?",
       "am": "ደረሰ?"
      },
      "hl": true
     }
    ],
    "loop": {
     "en": "if not, fix and run again",
     "am": "ካልደረሰ አስተካክልና እንደገና አስኪድ"
    }
   }
  ],
  "ex": {
   "title": {
    "en": "Build a cardboard robot",
    "am": "የካርቶን ሮቦት ሥራ"
   },
   "steps": {
    "en": [
     "Cut a box, draw a face, and draw a big arrow showing which way it faces.",
     "Put a stone on the grid as an obstacle.",
     "Plan the path on paper with arrows.",
     "One child reads the cards aloud; another moves the robot exactly as told.",
     "If you have a Bee-Bot, press the same steps on its buttons and compare."
    ],
    "am": [
     "ሳጥን ቁረጥ፣ ፊት ሣል፣ ወዴት እንደሚመለከት የሚያሳይ ትልቅ ቀስት ሣል።",
     "በፍርግርጉ ላይ እንደ እንቅፋት ድንጋይ አስቀምጥ።",
     "መንገዱን በወረቀት ላይ በቀስቶች አቅድ።",
     "አንድ ልጅ ካርዶቹን ጮክ ብሎ ያነባል፤ ሌላው ሮቦቱን በተባለው መሠረት ያንቀሳቅሳል።",
     "Bee-Bot ካለህ ያንኑ እርምጃዎች በቁልፎቹ ተጭነህ አወዳድር።"
    ]
   }
  },
  "qa": {
   "en": [
    "The path, drawn as arrows, before touching the robot.",
    "By turning before the stone, moving past it, and turning back.",
    "One card: usually a missing forward, or a left turn that should be right."
   ],
   "am": [
    "ሮቦቱን ከመንካት በፊት በቀስቶች የተሣለ መንገድ።",
    "ከድንጋዩ በፊት በመዞር፣ አልፎ በመሄድና መልሶ በመዞር።",
    "አንድ ካርድ፡ ብዙውን ጊዜ የጎደለ ወደ ፊት ወይም ቀኝ መሆን የነበረበት የግራ መዞሪያ።"
   ]
  }
 },
 {
  "why": {
   "en": "Sorting by rules is how we organise data, and how computers learn to recognise things.",
   "am": "በሕግ መደርደር ዳታን የምናደራጅበትና ኮምፒውተሮች ነገሮችን ለመለየት የሚማሩበት መንገድ ነው።"
  },
  "dg": [
   {
    "type": "tree",
    "title": {
     "en": "Sorting a fruit basket with two rules",
     "am": "የፍራፍሬ ቅርጫትን በሁለት ሕጎች መደርደር"
    },
    "root": {
     "t": {
      "en": "Basket",
      "am": "ቅርጫት"
     }
    },
    "kids": [
     {
      "t": {
       "en": "Red?  yes",
       "am": "ቀይ? አዎ"
      },
      "kids": [
       {
        "t": {
         "en": "Round: tomato, apple",
         "am": "ክብ፡ ቲማቲም፣ ፖም"
        }
       },
       {
        "t": {
         "en": "Not round: red pepper",
         "am": "ክብ ያልሆነ፡ ቀይ ቃሪያ"
        }
       }
      ]
     },
     {
      "t": {
       "en": "Red?  no",
       "am": "ቀይ? አይደለም"
      },
      "kids": [
       {
        "t": {
         "en": "Round: orange, lemon",
         "am": "ክብ፡ ብርቱካን፣ ሎሚ"
        }
       },
       {
        "t": {
         "en": "Not round: banana",
         "am": "ክብ ያልሆነ፡ ሙዝ"
        }
       }
      ]
     }
    ],
    "note": {
     "en": "This is a decision tree: the same idea a phone uses to tell a cat from a dog after seeing many examples.",
     "am": "ይህ decision tree ነው፡ ስልክ ብዙ ምሳሌዎችን ካየ በኋላ ድመትን ከውሻ ለመለየት የሚጠቀምበት ያው ሐሳብ።"
    }
   },
   {
    "type": "stack",
    "title": {
     "en": "Picture chart: how many of each?",
     "am": "የሥዕል ቻርት፡ ከእያንዳንዱ ስንት?"
    },
    "layers": [
     {
      "t": {
       "en": "🍅🍅🍅 red: 3",
       "am": "🍅🍅🍅 ቀይ፡ 3"
      }
     },
     {
      "t": {
       "en": "🍊🍊 orange: 2",
       "am": "🍊🍊 ብርቱካናማ፡ 2"
      }
     },
     {
      "t": {
       "en": "🍌🍌🍌🍌 yellow: 4",
       "am": "🍌🍌🍌🍌 ቢጫ፡ 4"
      }
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Market sorting game",
    "am": "የገበያ መደርደሪያ ጨዋታ"
   },
   "steps": {
    "en": [
     "Bring a basket of local fruit and vegetables.",
     "Sort by colour into groups on the floor.",
     "Count each group and draw one picture per item on a chart.",
     "Sort the same basket again by a new rule (size, or fruit vs vegetable).",
     "Ask: which rule did a friend use? Can they guess yours?"
    ],
    "am": [
     "የአካባቢ ፍራፍሬና አትክልት ቅርጫት አምጡ።",
     "በወለሉ ላይ በቀለም በቡድን ደርድሩ።",
     "እያንዳንዱን ቡድን ቁጠሩና በቻርቱ ላይ ለእያንዳንዱ ነገር አንድ ሥዕል ሣሉ።",
     "ያንኑ ቅርጫት በአዲስ ሕግ (በመጠን፣ ወይም ፍራፍሬ vs አትክልት) እንደገና ደርድሩ።",
     "ጠይቁ፡ ጓደኛ የትኛውን ሕግ ተጠቀመ? የእናንተን መገመት ይችላሉ?"
    ]
   }
  },
  "qa": {
   "en": [
    "By one rule, for example colour: all red ones together.",
    "Yes: by size, by shape, or fruit versus vegetable. The same things can be sorted many ways.",
    "Count the red group on the picture chart (in the example, 3)."
   ],
   "am": [
    "በአንድ ሕግ፣ ለምሳሌ በቀለም፡ ሁሉም ቀዮቹ በአንድ ላይ።",
    "አዎ፡ በመጠን፣ በቅርጽ፣ ወይም ፍራፍሬ ከአትክልት። ያው ነገሮች በብዙ መንገዶች ሊደረደሩ ይችላሉ።",
    "በሥዕል ቻርቱ ላይ ያለውን ቀዩን ቡድን ቁጠር (በምሳሌው 3)።"
   ]
  }
 },
 {
  "why": {
   "en": "A story is a program too: characters, events and an order with a beginning, middle and end.",
   "am": "ታሪክም ፕሮግራም ነው፡ ገጸ ባሕሪያት፣ ክስተቶችና መጀመሪያ፣ መካከልና መጨረሻ ያለው ቅደም ተከተል።"
  },
  "dg": [
   {
    "type": "flow",
    "title": {
     "en": "Three scenes, like three boxes",
     "am": "ሦስት ትዕይንቶች፣ እንደ ሦስት ሳጥኖች"
    },
    "nodes": [
     {
      "t": {
       "en": "Scene 1: Beginning",
       "am": "ትዕይንት 1፡ መጀመሪያ"
      },
      "s": {
       "en": "who and where: a clever hare by the river",
       "am": "ማን እና የት፡ በወንዝ ዳር ያለች ብልህ ጥንቸል"
      }
     },
     {
      "t": {
       "en": "Scene 2: Middle",
       "am": "ትዕይንት 2፡ መካከል"
      },
      "s": {
       "en": "something happens: a lion wants lunch",
       "am": "አንድ ነገር ይሆናል፡ አንበሳ ምሳ ይፈልጋል"
      }
     },
     {
      "t": {
       "en": "Scene 3: End",
       "am": "ትዕይንት 3፡ መጨረሻ"
      },
      "s": {
       "en": "how it ends: the hare tricks the lion",
       "am": "እንዴት ያበቃል፡ ጥንቸሏ አንበሳውን ታታልላለች"
      },
      "hl": true
     }
    ]
   },
   {
    "type": "blocks",
    "title": {
     "en": "Scene 2 as blocks",
     "am": "ትዕይንት 2 በብሎኮች"
    },
    "blocks": [
     {
      "t": {
       "en": "✉ When I get the message \"scene 2\"",
       "am": "✉ «ትዕይንት 2» መልእክት ስቀበል"
      },
      "c": "event"
     },
     {
      "t": {
       "en": "➡ Move right 3",
       "am": "➡ ወደ ቀኝ 3 ሂድ"
      },
      "c": "motion"
     },
     {
      "t": {
       "en": "💬 Say \"I am hungry!\"",
       "am": "💬 «ርቦኛል!» በል"
      },
      "c": "looks"
     },
     {
      "t": {
       "en": "✉ Send \"scene 3\"",
       "am": "✉ «ትዕይንት 3» ላክ"
      },
      "c": "event"
     }
    ]
   }
  ],
  "ex": {
   "title": {
    "en": "Plan your story on three boxes",
    "am": "ታሪክህን በሦስት ሳጥኖች ላይ አቅድ"
   },
   "steps": {
    "en": [
     "Fold paper into three boxes and draw one scene in each.",
     "Write one sentence under each box.",
     "Build scene 1 in ScratchJr or with paper puppets.",
     "Add scenes 2 and 3, using a message to start each new scene.",
     "Show your story and ask the audience what they would add."
    ],
    "am": [
     "ወረቀት በሦስት ሳጥኖች እጠፍና በእያንዳንዱ አንድ ትዕይንት ሣል።",
     "ከእያንዳንዱ ሳጥን በታች አንድ ዓረፍተ ነገር ጻፍ።",
     "ትዕይንት 1ን በScratchJr ወይም በወረቀት አሻንጉሊቶች ገንባ።",
     "እያንዳንዱን አዲስ ትዕይንት ለመጀመር መልእክት በመጠቀም ትዕይንት 2 እና 3ን ጨምር።",
     "ታሪክህን አሳይና ተመልካቾቹ ምን እንደሚጨምሩ ጠይቅ።"
    ]
   }
  },
  "qa": {
   "en": [
    "We meet the characters and the place.",
    "With move blocks (or by moving the puppet) in the order planned on paper.",
    "A new scene, a sound, or a second character who talks."
   ],
   "am": [
    "ገጸ ባሕሪያቱንና ቦታውን እናውቃለን።",
    "በወረቀት ላይ በታቀደው ቅደም ተከተል በመንቀሳቀሻ ብሎኮች (ወይም አሻንጉሊቱን በማንቀሳቀስ)።",
    "አዲስ ትዕይንት፣ ድምፅ፣ ወይም የሚናገር ሁለተኛ ገጸ ባሕሪ።"
   ]
  }
 }
];
