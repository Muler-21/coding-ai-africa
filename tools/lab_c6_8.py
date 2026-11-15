from labkit import *
import numpy as np
W = ('2–4 weeks', '2–4 ሳምንታት')
SIM = ('Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.', 'ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።')
CORPUS = ('The corpus files are in the repository under tools/data/ (am_corpus.txt, en_corpus.txt): the Amharic and English text of this app, about 140,000 Amharic letters. For real work use larger open corpora, for example news sites, Wikipedia and Masakhane datasets, with their licences.', 'የcorpus ፋይሎቹ በማከማቻው ውስጥ በtools/data/ ሥር ናቸው (am_corpus.txt፣ en_corpus.txt)፡ የዚህ መተግበሪያ የአማርኛና የእንግሊዝኛ ጽሑፍ፣ ወደ 140,000 የአማርኛ ፊደላት። ለእውነተኛ ሥራ ትላልቅ ክፍት corporaን ከፈቃዶቻቸው ጋር ተጠቀም፤ ለምሳሌ የዜና ድረ-ገጾች፣ ዊኪፔዲያ እና የMasakhane ዳታሴቶች።')
GIT = T('Git + GitHub', 'version control and sharing', 'የስሪት ቁጥጥርና ማጋራት', 'git-scm.com, github.com (free)')
GPU = T('A GPU (optional)', 'faster training for larger models', 'ለትላልቅ ሞዴሎች ፈጣን ሥልጠና', 'free notebooks such as Google Colab or Kaggle')
pct = lambda v: 100 * np.asarray(v)

# ============================ Level 6 Research foundations ============================
C6 = []
C6.append(lab(('Causal effect of improved forage on milk yield', 'የተሻሻለ መኖ በወተት ምርት ላይ ያለው causal ውጤት'),
 ('Estimate how much improved forage really raises milk yield from observational farm records, where better-off farms adopt forage more often, and compare a naive estimate with adjusted ones.', 'የተሻለ ኑሮ ያላቸው እርሻዎች መኖን በብዛት በሚቀበሉበት የምልከታ የእርሻ መዝገቦች ውስጥ የተሻሻለ መኖ የወተት ምርትን በእውነት ምን ያህል እንደሚያሳድግ ገምት፤ ቀላል ግምትን ከተስተካከሉ ጋር አወዳድር።'), W,
 [PY, NP, SK, MPL],
 (['Draw the causal diagram: herd size and crossbred cows affect both forage adoption and milk.', 'Naive estimate: difference in mean milk between adopters and non-adopters.', 'Regression adjustment: regress milk on forage plus the confounders.', 'Inverse probability weighting: model the chance of adopting, then reweight farms.', 'Bootstrap 95% intervals for every estimate and compare them.'],
  ['የcausal ንድፉን ሣል፡ የመንጋ መጠንና ድቅል ላሞች በመኖ መቀበልም በወተትም ላይ ተጽዕኖ ያደርጋሉ።', 'ቀላል ግምት፡ በተቀባዮችና ባልተቀበሉ መካከል ያለ የአማካይ ወተት ልዩነት።', 'Regression adjustment፡ ወተትን በመኖና በconfounders ላይ regress አድርግ።', 'Inverse probability weighting፡ የመቀበል ዕድሉን ሞዴል አድርግ፣ ከዚያ እርሻዎችን እንደገና ክብደት ስጥ።', 'ለእያንዳንዱ ግምት 95% ክልሎችን በbootstrap አስላና አወዳድራቸው።']),
 '''
import numpy as np
from sklearn.linear_model import LinearRegression, LogisticRegression
rng = np.random.default_rng(4); n = 800
herd = rng.poisson(4, n) + 1; cross = rng.random(n) < 0.35                     # confounders
p_adopt = 1 / (1 + np.exp(-(-2.2 + 0.25 * herd + 1.4 * cross)))
forage = rng.random(n) < p_adopt
milk = 4 + 0.3 * herd + 3.0 * cross + 1.5 * forage + rng.normal(0, 1.5, n)     # true effect: +1.5 litres per cow per day
Z = np.column_stack([herd, cross])
def naive(i): return milk[i][forage[i]].mean() - milk[i][~forage[i]].mean()
def regression(i): return LinearRegression().fit(np.column_stack([forage[i], Z[i]]), milk[i]).coef_[0]
def ipw(i):
    e = LogisticRegression().fit(Z[i], forage[i]).predict_proba(Z[i])[:, 1]; f, m = forage[i], milk[i]
    return np.sum(f * m / e) / np.sum(f / e) - np.sum((1 - f) * m / (1 - e)) / np.sum((1 - f) / (1 - e))
est = {}
for name, fn in [("naive difference", naive), ("regression adjustment", regression), ("inverse probability weighting", ipw)]:
    boots = [fn(rng.integers(0, n, n)) for _ in range(500)]
    est[name] = (fn(np.arange(n)), *np.percentile(boots, [2.5, 97.5]))
    print(f"{name:30s} {est[name][0]:.2f} L/day (95% CI {est[name][1]:.2f} to {est[name][2]:.2f})")
print(f"adopters: {forage.mean():.0%}; crossbred among adopters {cross[forage].mean():.0%} vs {cross[~forage].mean():.0%}")
''',
 viz=lambda ns: [dots(B('Estimated effect of forage on milk (litres per cow per day)', 'የመኖ በወተት ላይ የተገመተ ውጤት (በላም በቀን ሊትር)'), [B('Naive difference', 'ቀላል ልዩነት'), B('Regression adjustment', 'Regression adjustment'), B('Inverse probability weighting', 'Inverse probability weighting')],
                      [v[0] for v in ns['est'].values()], [v[1] for v in ns['est'].values()], [v[2] for v in ns['est'].values()], B('Litres per cow per day', 'በላም በቀን ሊትር'),
                      note=B('The true effect in this simulation is 1.5 litres.', 'በዚህ ማስመሰል ውስጥ ያለው እውነተኛ ውጤት 1.5 ሊትር ነው።'))],
 analysis=lambda ns: ([f"The naive difference says {ns['est']['naive difference'][0]:.2f} litres, more than the true 1.5: adopters already had more crossbred cows ({ns['cross'][ns['forage']].mean():.0%} vs {ns['cross'][~ns['forage']].mean():.0%}).", f"Adjusting for herd size and breed brings the estimate to {ns['est']['regression adjustment'][0]:.2f} (regression) and {ns['est']['inverse probability weighting'][0]:.2f} (weighting); both intervals contain 1.5.", 'Adjustment only removes confounders you measured; an unmeasured one (for example farmer skill) would still bias the result.'],
                      [f"ቀላሉ ልዩነት {ns['est']['naive difference'][0]:.2f} ሊትር ይላል፣ ከእውነተኛው 1.5 በላይ፡ ተቀባዮች አስቀድመው ብዙ ድቅል ላሞች ነበሯቸው ({ns['cross'][ns['forage']].mean():.0%} vs {ns['cross'][~ns['forage']].mean():.0%})።", f"ለመንጋ መጠንና ለዝርያ ማስተካከል ግምቱን ወደ {ns['est']['regression adjustment'][0]:.2f} (regression) እና {ns['est']['inverse probability weighting'][0]:.2f} (weighting) ያመጣዋል፤ ሁለቱም ክልሎች 1.5ን ይይዛሉ።", 'ማስተካከል የለካሃቸውን confounders ብቻ ያስወግዳል፤ ያልተለካ (ለምሳሌ የገበሬ ክህሎት) አሁንም ውጤቱን ያዛባዋል።']),
 decision=lambda ns: (f"Report the adjusted effect (about {ns['est']['regression adjustment'][0]:.1f} L/day) with its interval, not the naive one; to settle it, run a randomised forage trial on 40 farms.", f"ቀላሉን ሳይሆን የተስተካከለውን ውጤት (ወደ {ns['est']['regression adjustment'][0]:.1f} L/ቀን) ከክልሉ ጋር ዘግብ፤ ለማረጋገጥ በ40 እርሻዎች ላይ በዘፈቀደ የተመደበ የመኖ ሙከራ አካሂድ።"), note=SIM))
C6.append(lab(('A neural language model for Amharic vs n-gram baselines', 'ለአማርኛ neural የቋንቋ ሞዴል vs n-gram መነሻዎች'),
 ('Train character-level models on Amharic text, measure perplexity on held-out text as the training data grow, and decide how much data a neural model needs before it pays off.', 'በአማርኛ ጽሑፍ ላይ የፊደል-ደረጃ ሞዴሎችን አሰልጥን፣ የሥልጠና ዳታ ሲያድግ በተለየ ጽሑፍ ላይ perplexityን ለካ፣ neural ሞዴል ከመዋጣቱ በፊት ምን ያህል ዳታ እንደሚያስፈልገው ወስን።'), W,
 [PY, NP, SK, T('PyTorch (next step)', 'train a real transformer', 'እውነተኛ transformer ማሰልጠን', 'pytorch.org'), GPU],
 (['Load the corpus and keep Ethiopic letters, spaces and Ethiopic punctuation.', 'Hold out the first 20,000 letters as a test set.', 'Count n-grams (orders 2–4) with add-k smoothing.', 'Train a small neural network that predicts the next letter from the previous 3.', 'Compare perplexity (lower is better) at 10k, 40k and 120k training letters.'],
  ['corpusኡን ጫንና የግዕዝ ፊደላትን፣ ክፍተቶችንና የግዕዝ ሥርዓተ ነጥቦችን አቆይ።', 'የመጀመሪያዎቹን 20,000 ፊደላት እንደ የፈተና ስብስብ ለይ።', 'n-gramsን (ደረጃዎች 2–4) በadd-k smoothing ቁጠር።', 'ከቀደሙት 3 ፊደላት ቀጣዩን ፊደል የሚተነብይ ትንሽ neural network አሰልጥን።', 'perplexityን (ዝቅተኛ የተሻለ ነው) በ10k፣ 40k እና 120k የሥልጠና ፊደላት አወዳድር።']),
 '''
import numpy as np, math, warnings
from collections import Counter, defaultdict
from sklearn.neural_network import MLPClassifier
warnings.filterwarnings("ignore")
text = open("am_corpus.txt", encoding="utf-8").read()
text = "".join(ch for ch in text if "\\u1200" <= ch <= "\\u137f" or ch in " \\n።፣")
test, pool = text[:20000], text[20000:]
vocab = sorted(set(text)); idx = {c: i for i, c in enumerate(vocab)}; V = len(vocab)
def ngram_ppl(train, n, k=0.1):
    counts = defaultdict(Counter)
    for i in range(n - 1, len(train)): counts[train[i - n + 1:i]][train[i]] += 1
    nll = 0.0
    for i in range(n - 1, len(test)):
        c = counts.get(test[i - n + 1:i], Counter()); nll -= math.log((c[test[i]] + k) / (sum(c.values()) + k * V))
    return math.exp(nll / (len(test) - n + 1))
CTX = 3
def onehot(s):
    X = np.zeros((len(s) - CTX, CTX * V), np.float32)
    for i in range(CTX, len(s)):
        for j in range(CTX): X[i - CTX, j * V + idx[s[i - CTX + j]]] = 1
    return X, np.array([idx[c] for c in s[CTX:]])
Xte, yte = onehot(test); sizes = [10000, 40000, 120000]; ppl = {"bigram": [], "trigram": [], "4-gram": [], "neural (3 letters)": []}
for size in sizes:
    tr = pool[:size]
    for name, n in [("bigram", 2), ("trigram", 3), ("4-gram", 4)]: ppl[name].append(ngram_ppl(tr, n))
    m = MLPClassifier((128,), max_iter=30, early_stopping=True, random_state=0, batch_size=256).fit(*onehot(tr))
    P = np.full((len(yte), V), 1e-6); P[:, m.classes_] += m.predict_proba(Xte); P /= P.sum(1, keepdims=True)
    ppl["neural (3 letters)"].append(math.exp(-np.mean(np.log(P[np.arange(len(yte)), yte]))))
print(f"{len(text):,} letters, {V} different characters")
for k, v in ppl.items(): print(f"{k:20s}", [round(x, 1) for x in v])
''',
 files=['am_corpus.txt'],
 viz=lambda ns: [line(B('Perplexity on held-out Amharic (lower is better)', 'በተለየ የአማርኛ ጽሑፍ ላይ perplexity (ዝቅተኛ የተሻለ ነው)'), [s / 1000 for s in ns['sizes']], [(B(k, k), v, i) for i, (k, v) in enumerate(ns['ppl'].items())], B('Training letters (thousands)', 'የሥልጠና ፊደላት (በሺዎች)'), 'Perplexity', ymin=0, rpad=130)],
 analysis=lambda ns: ([f"With 10,000 letters the 4-gram is worst ({ns['ppl']['4-gram'][0]:.0f}): it has seen too few of its long contexts.", f"The neural model is best at every size and reaches {ns['ppl']['neural (3 letters)'][-1]:.1f} with 120,000 letters, against {ns['ppl']['trigram'][-1]:.1f} for the best n-gram.", 'It wins because it shares what it learns between similar contexts instead of counting each one separately.'],
                      [f"በ10,000 ፊደላት 4-gram በጣም መጥፎ ነው ({ns['ppl']['4-gram'][0]:.0f})፡ ረጃጅም አውዶቹን በጣም ጥቂት አይቷል።", f"neural ሞዴሉ በእያንዳንዱ መጠን ምርጥ ሲሆን በ120,000 ፊደላት {ns['ppl']['neural (3 letters)'][-1]:.1f} ይደርሳል፤ ምርጡ n-gram {ns['ppl']['trigram'][-1]:.1f} ነው።", 'የሚያሸንፈው እያንዳንዱን አውድ ለየብቻ ከመቁጠር ይልቅ በተመሳሳይ አውዶች መካከል የሚማረውን ስለሚያጋራ ነው።']),
 decision=lambda ns: ('Use a neural model (next: a small transformer in PyTorch with a longer context) and invest first in more clean Amharic text: perplexity is still falling steeply at 120,000 letters.', 'neural ሞዴል ተጠቀም (ቀጥሎ፡ ረዘም ያለ አውድ ያለው ትንሽ transformer በPyTorch)፤ መጀመሪያ ግን ተጨማሪ ንጹሕ የአማርኛ ጽሑፍ ላይ ኢንቨስት አድርግ፡ perplexity በ120,000 ፊደላት አሁንም በፍጥነት እየወረደ ነው።'), note=CORPUS))
C6.append(lab(('Reinforcement learning for irrigation with limited water', 'በውሱን ውሃ ለመስኖ reinforcement learning'),
 ('Train a Q-learning agent to decide each day whether to irrigate, with 6 waterings for a 40-day season and random rain, and compare it with the rules farmers use.', 'ለ40-ቀን ወቅት 6 ውሃ ማጠጣቶችና የዘፈቀደ ዝናብ ባሉበት በየቀኑ መስኖ ማጠጣት እንዳለበት የሚወስን Q-learning agent አሰልጥን፤ ገበሬዎች ከሚጠቀሙባቸው ሕጎች ጋር አወዳድረው።'), W,
 [PY, NP, MPL, T('Gymnasium (next step)', 'standard RL environments and agents', 'መደበኛ የRL አካባቢዎችና agents', 'pip install gymnasium')],
 (['Build the simulator: soil moisture 0–10, daily drying, random rain, growth is best at moisture 4–8.', 'State = (moisture, waterings left, season phase); actions = irrigate or not.', 'Train Q-learning for 30,000 seasons with ε-greedy exploration.', 'Every 1,000 seasons, test the greedy policy on 300 fresh seasons.', 'Compare with "never", "irrigate when moisture < 3" and "< 4" on 3,000 seasons.'],
  ['አስመሳዩን ገንባ፡ የአፈር እርጥበት 0–10፣ ዕለታዊ መድረቅ፣ የዘፈቀደ ዝናብ፣ እድገት በእርጥበት 4–8 ምርጥ ነው።', 'State = (እርጥበት፣ የቀሩ ማጠጣቶች፣ የወቅት ምዕራፍ)፤ actions = ማጠጣት ወይም አለማጠጣት።', 'Q-learningን ለ30,000 ወቅቶች በε-greedy ፍለጋ አሰልጥን።', 'በየ1,000 ወቅቶች greedy ፖሊሲውን በ300 አዲስ ወቅቶች ፈትሽ።', 'ከ«በፍጹም»፣ «እርጥበት < 3 ሲሆን አጠጣ» እና «< 4» ጋር በ3,000 ወቅቶች አወዳድር።']),
 '''
import numpy as np
DAYS, WATER = 40, 6
def step(m, a, rng):
    rain = rng.choice([0, 0, 0, 0, 1, 2, 4], p=[.35, .15, .1, .1, .15, .1, .05])
    m = min(10, max(0, m - 1 + rain + (3 if a else 0)))
    return m, (1.0 if 4 <= m <= 8 else 0.5 if m in (2, 3, 9) else 0.0)     # growth units per day
def season(policy, rng):
    m, w, total = 6, WATER, 0.0
    for d in range(DAYS):
        a = bool(policy(m, w, d)) and w > 0; w -= a; m, g = step(m, a, rng); total += g
    return total
phase = lambda d: min(3, d // 10)
Q = np.zeros((11, WATER + 1, 4, 2)); rng = np.random.default_rng(0); curve = []; eps = 0.2
for ep in range(30000):
    m, w = 6, WATER
    for d in range(DAYS):
        s = (m, w, phase(d)); a = 0 if w == 0 else (rng.integers(2) if rng.random() < eps else int(np.argmax(Q[s])))
        m2, g = step(m, a, rng); w2 = w - a
        target = g + (0 if d == DAYS - 1 else 0.98 * Q[m2, w2, phase(d + 1)].max())
        Q[s + (a,)] += 0.1 * (target - Q[s + (a,)]); m, w = m2, w2
    eps = max(0.02, eps * 0.9999)
    if ep % 1000 == 999:
        r2 = np.random.default_rng(99); curve.append(np.mean([season(lambda m, w, d: Q[m, w, phase(d)].argmax(), r2) for _ in range(300)]))
policies = {"never irrigate": lambda m, w, d: False, "rule: moisture < 3": lambda m, w, d: m < 3,
            "rule: moisture < 4": lambda m, w, d: m < 4, "RL agent": lambda m, w, d: Q[m, w, phase(d)].argmax()}
score = {}
for k, p in policies.items():
    r2 = np.random.default_rng(7); score[k] = np.mean([season(p, r2) for _ in range(3000)]); print(f"{k:20s} {score[k]:.1f} growth units (max 40)")
''',
 viz=lambda ns: [line(B('Learning curve: RL agent on fresh seasons', 'የመማሪያ ኩርባ፡ RL agent በአዲስ ወቅቶች'), [1000 * (i + 1) for i in range(len(ns['curve']))], [(B('RL agent', 'RL agent'), ns['curve'], 1)], B('Training seasons', 'የሥልጠና ወቅቶች'), B('Growth units per season', 'በወቅት የእድገት አሃዶች'),
                      refs=[{'kind': 'h', 'v': float(ns['score']['rule: moisture < 3']), 'label': B('rule < 3', 'ሕግ < 3')}, {'kind': 'h', 'v': float(ns['score']['rule: moisture < 4']), 'label': B('rule < 4', 'ሕግ < 4')}], markers=False),
                 hbar(B('Average growth over 3,000 test seasons', 'በ3,000 የፈተና ወቅቶች አማካይ እድገት'), list(ns['score']), [(B('Growth units', 'የእድገት አሃዶች'), list(ns['score'].values()), 1)], B('Growth units (max 40)', 'የእድገት አሃዶች (ከፍተኛ 40)'), fmt=1)],
 analysis=lambda ns: ([f"Without irrigation the crop reaches only {ns['score']['never irrigate']:.1f} of 40 growth units.", f"The RL agent ({ns['score']['RL agent']:.1f}) beats the common rule “irrigate below 3” ({ns['score']['rule: moisture < 3']:.1f}).", f"A better tuned rule, \u201cbelow 4\u201d, gets {ns['score']['rule: moisture < 4']:.1f}: the agent adds only {ns['score']['RL agent'] - ns['score']['rule: moisture < 4']:.1f} more units ({(ns['score']['RL agent'] / ns['score']['rule: moisture < 4'] - 1):.0%})."],
                      [f"ያለ መስኖ ሰብሉ ከ40 የእድገት አሃዶች {ns['score']['never irrigate']:.1f} ብቻ ይደርሳል።", f"RL agentኡ ({ns['score']['RL agent']:.1f}) የተለመደውን «ከ3 በታች አጠጣ» ሕግ ({ns['score']['rule: moisture < 3']:.1f}) ያሸንፋል።", f"የተሻለ የተስተካከለ ሕግ፣ «ከ4 በታች»፣ {ns['score']['rule: moisture < 4']:.1f} ያገኛል፡ agentኡ የሚጨምረው {ns['score']['RL agent'] - ns['score']['rule: moisture < 4']:.1f} አሃዶች ብቻ ነው ({(ns['score']['RL agent'] / ns['score']['rule: moisture < 4'] - 1):.0%})።"]),
 decision=lambda ns: ('Advise farmers to irrigate when the soil reaches moisture level 4: a simple, explainable rule that captures most of the gain. Use the RL agent where it adds more: weather forecasts, several fields, or water prices.', 'ገበሬዎች አፈሩ የእርጥበት ደረጃ 4 ላይ ሲደርስ እንዲያጠጡ ምከር፡ አብዛኛውን ትርፍ የሚይዝ ቀላልና ሊብራራ የሚችል ሕግ። RL agentኡን የበለጠ በሚጨምርበት ቦታ ተጠቀም፡ የአየር ትንበያዎች፣ በርካታ ማሳዎች ወይም የውሃ ዋጋዎች።'), note=('A simplified simulator; check any rule in a field trial before advising farmers.', 'ቀለል ያለ አስመሳይ፤ ገበሬዎችን ከመምከርህ በፊት ማንኛውንም ሕግ በመስክ ሙከራ ፈትሽ።')))
C6.append(lab(('A reproducible pipeline that only reruns what changed', 'የተለወጠውን ብቻ እንደገና የሚያስኪድ ተደጋጋሚ pipeline'),
 ('Build a small analysis pipeline with file fingerprints (the idea behind Snakemake and Nextflow), and measure the time saved when nothing or only one input changes.', 'በፋይል የጣት አሻራዎች (ከSnakemake እና Nextflow ጀርባ ያለው ሐሳብ) ትንሽ የትንተና pipeline ገንባ፤ ምንም ሳይለወጥ ወይም አንድ ግብዓት ብቻ ሲለወጥ የሚቆጠበውን ጊዜ ለካ።'), W,
 [PY, NP, T('Snakemake or Nextflow', 'the same idea at full scale, on laptop and HPC', 'ያው ሐሳብ በሙሉ መጠን፣ በላፕቶፕና በHPC', 'pip install snakemake; nextflow.io'), GIT],
 (['Write 4 regions × 3 steps: clean → summarise → model, plus a final report.', 'Give each step its inputs; store a hash of the inputs next to each output.', 'Run 1: everything runs. Run 2: nothing changed. Run 3: change one region’s raw data.', 'Record which steps ran and the time.', 'Keep the pipeline under Git so every result can be traced to code and data.'],
  ['4 ክልሎች × 3 እርምጃዎች ጻፍ፡ ማጽዳት → ማጠቃለል → ሞዴል፣ እንዲሁም የመጨረሻ ሪፖርት።', 'ለእያንዳንዱ እርምጃ ግብዓቶቹን ስጥ፤ ከእያንዳንዱ ውጤት አጠገብ የግብዓቶቹን hash አስቀምጥ።', 'ሩጫ 1፡ ሁሉም ይሠራል። ሩጫ 2፡ ምንም አልተለወጠም። ሩጫ 3፡ የአንድ ክልልን ጥሬ ዳታ ቀይር።', 'የትኞቹ እርምጃዎች እንደሠሩና ጊዜውን መዝግብ።', 'እያንዳንዱ ውጤት ወደ ኮድና ዳታ እንዲከታተል pipelineኡን በGit ሥር አቆይ።']),
 '''
import hashlib, json, os, time, numpy as np
regions = ["Amhara", "Oromia", "Sidama", "Tigray"]
def fingerprint(paths): return hashlib.sha256(b"".join(open(p, "rb").read() for p in paths)).hexdigest()
def task(name, inputs, output, fn, log):
    h = fingerprint(inputs); stamp = output + ".hash"
    if os.path.exists(output) and os.path.exists(stamp) and open(stamp).read() == h: return
    fn(inputs, output); open(stamp, "w").write(h); log.append(name)
def heavy(inp, out):                                   # stands in for real work (alignment, model fitting)
    x = np.resize(np.concatenate([np.load(p) for p in inp]), 400); s = 0.0
    for _ in range(15): s += float(np.linalg.svd(np.outer(x, x) + np.eye(400), compute_uv=False)[0])
    np.save(out, np.array([x.mean(), x.std(), s]))
def run():
    log, t = [], time.perf_counter()
    for r in regions:
        task(f"clean {r}", [f"raw_{r}.npy"], f"clean_{r}.npy", heavy, log)
        task(f"summarise {r}", [f"clean_{r}.npy"], f"sum_{r}.npy", heavy, log)
        task(f"model {r}", [f"sum_{r}.npy", f"clean_{r}.npy"], f"model_{r}.npy", heavy, log)
    task("report", [f"model_{r}.npy" for r in regions], "report.npy", heavy, log)
    return log, time.perf_counter() - t
rng = np.random.default_rng(1)
for r in regions: np.save(f"raw_{r}.npy", rng.normal(size=1000))
runs = {}
runs["1: first run"] = run(); runs["2: nothing changed"] = run()
np.save("raw_Sidama.npy", rng.normal(size=1000)); runs["3: Sidama data changed"] = run()
for k, (log, sec) in runs.items(): print(f"run {k:24s} {len(log):2d} steps ran in {sec:.2f} s: {', '.join(log) if len(log) < 6 else 'all'}")
''',
 viz=lambda ns: [hbar(B('Steps that had to run (of 13)', 'መሥራት የነበረባቸው እርምጃዎች (ከ13)'), list(ns['runs']), [(B('Steps', 'እርምጃዎች'), [len(v[0]) for v in ns['runs'].values()], 1)], B('Steps', 'እርምጃዎች'), fmt=0),
                 hbar(B('Run time (seconds)', 'የሩጫ ጊዜ (ሰከንዶች)'), list(ns['runs']), [(B('Seconds', 'ሰከንዶች'), [v[1] for v in ns['runs'].values()], 2)], B('Seconds', 'ሰከንዶች'), fmt=2)],
 analysis=lambda ns: ([f"The first run executes all {len(ns['runs']['1: first run'][0])} steps.", 'With nothing changed, no step runs: the fingerprints match, so results are reused safely.', f"Changing Sidama’s raw data reruns only the {len(ns['runs']['3: Sidama data changed'][0])} steps that depend on it: {', '.join(ns['runs']['3: Sidama data changed'][0])}."],
                      [f"የመጀመሪያው ሩጫ ሁሉንም {len(ns['runs']['1: first run'][0])} እርምጃዎች ያስኪዳል።", 'ምንም ሳይለወጥ ምንም እርምጃ አይሠራም፡ የጣት አሻራዎቹ ይገጥማሉ፣ ስለዚህ ውጤቶች በደህና እንደገና ጥቅም ላይ ይውላሉ።', f"የSidamaን ጥሬ ዳታ መቀየር በእሱ ላይ የተመሠረቱትን {len(ns['runs']['3: Sidama data changed'][0])} እርምጃዎች ብቻ እንደገና ያስኪዳል፡ {', '.join(ns['runs']['3: Sidama data changed'][0])}።"]),
 decision=lambda ns: ('Move the lab’s analyses into Snakemake or Nextflow with containers, so the same command runs on a laptop and on the HPC cluster, and only changed parts are recomputed.', 'የላብራቶሪውን ትንተናዎች ከcontainers ጋር ወደ Snakemake ወይም Nextflow አዛውር፤ ያው ትእዛዝ በላፕቶፕና በHPC cluster ላይ እንዲሠራና የተለወጡት ክፍሎች ብቻ እንደገና እንዲሰሉ።'),
 note=('Timings depend on the computer; the pattern, not the exact seconds, is the result.', 'ጊዜዎች በኮምፒውተሩ ላይ ይወሰናሉ፤ ውጤቱ ትክክለኛዎቹ ሰከንዶች ሳይሆኑ ንድፉ ነው።')))
C6.append(lab(('Designing a field trial by simulation: how many replicates?', 'የመስክ ሙከራን በማስመሰል መንደፍ፡ ስንት replicates?'),
 ('Simulate a randomised complete block trial of 4 wheat varieties many times, find the power to detect a 0.3 t/ha difference for 2–10 blocks, and write the methods sentence.', 'የ4 የስንዴ ዝርያዎችን randomised complete block ሙከራ ብዙ ጊዜ አስመስል፣ ለ2–10 blocks የ0.3 t/ha ልዩነትን የመለየት powerን ፈልግ፣ የዘዴዎቹን ዓረፍተ ነገርም ጻፍ።'), W,
 [PY, NP, SP, R_],
 (['Take the variance from past trials: block SD 0.4 t/ha, plot SD 0.20 t/ha.', 'Simulate the trial with the new variety 0.3 t/ha above the check.', 'Analyse each simulated trial with the RCBD ANOVA and the contrast new vs check.', 'Repeat 2,000 times per number of blocks; power = share of trials with p < 0.05.', 'Choose the smallest design with at least 80% power.'],
  ['ከቀደሙ ሙከራዎች varianceን ውሰድ፡ block SD 0.4 t/ha፣ የplot SD 0.20 t/ha።', 'አዲሱ ዝርያ ከcheckኡ 0.3 t/ha በላይ ሆኖ ሙከራውን አስመስል።', 'እያንዳንዱን የተመሰለ ሙከራ በRCBD ANOVA እና በአዲስ vs check contrast ተንትን።', 'ለእያንዳንዱ የblocks ብዛት 2,000 ጊዜ ድገም፤ power = p < 0.05 ያላቸው ሙከራዎች ድርሻ።', 'ቢያንስ 80% power ያለውን ትንሹን ንድፍ ምረጥ።']),
 '''
import numpy as np
from scipy import stats
means = np.array([3.0, 3.1, 3.2, 3.3])            # check = first, new variety = last (+0.3 t/ha)
SD_BLOCK, SD_PLOT, SIMS = 0.40, 0.20, 2000
rng = np.random.default_rng(10); power = {}
for b in range(2, 11):
    y = means[None, None, :] + rng.normal(0, SD_BLOCK, (SIMS, b, 1)) + rng.normal(0, SD_PLOT, (SIMS, b, 4))
    resid = y - y.mean(2, keepdims=True) - y.mean(1, keepdims=True) + y.mean((1, 2), keepdims=True)
    df = (b - 1) * 3; mse = (resid ** 2).sum((1, 2)) / df
    diff = y[:, :, 3].mean(1) - y[:, :, 0].mean(1); t = diff / np.sqrt(2 * mse / b)
    power[b] = float(np.mean(2 * stats.t.sf(np.abs(t), df) < 0.05))
    print(f"{b} blocks: power {power[b]:.2f}")
best = min(b for b in power if power[b] >= 0.8)
print(f"Methods: The trial will use a randomised complete block design with {best} blocks of 4 varieties; simulation (2,000 runs, block SD 0.40, plot SD 0.20 t/ha) gives {power[best]:.0%} power to detect a 0.3 t/ha difference from the check at the 5% level.")
''',
 viz=lambda ns: [line(B('Power to detect +0.3 t/ha (new variety vs check)', '+0.3 t/haን የመለየት power (አዲስ ዝርያ vs check)'), list(ns['power']), [('Power', list(ns['power'].values()), 1)], B('Number of blocks', 'የblocks ብዛት'), 'Power', refs=[{'kind': 'h', 'v': 0.8, 'label': B('80% target', '80% ዒላማ')}], ymin=0, ymax=1)],
 analysis=lambda ns: ([f"With 2 blocks the trial finds a real 0.3 t/ha gain only {ns['power'][2]:.0%} of the time: mostly a waste of land.", f"{ns['best']} blocks reach {ns['power'][ns['best']]:.0%} power; each extra block adds less.", 'Block-to-block variation does not reduce power here, because every variety is in every block: that is why we block.'],
                      [f"በ2 blocks ሙከራው እውነተኛ የ0.3 t/ha ጭማሪን የሚያገኘው {ns['power'][2]:.0%} ጊዜ ብቻ ነው፡ በአብዛኛው የመሬት ብክነት።", f"{ns['best']} blocks {ns['power'][ns['best']]:.0%} power ይደርሳሉ፤ እያንዳንዱ ተጨማሪ block ያነሰ ይጨምራል።", 'የblock-ለ-block ልዩነት እዚህ powerን አይቀንስም፣ እያንዳንዱ ዝርያ በእያንዳንዱ block ውስጥ ስላለ፡ ለዚህ ነው block የምናደርገው።']),
 decision=lambda ns: (f"Plant {ns['best']} blocks; if land allows only fewer, either accept that a 0.3 t/ha gain may be missed or test fewer varieties. Put the printed methods sentence in the proposal.", f"{ns['best']} blocks ዝራ፤ መሬቱ ጥቂት ብቻ ከፈቀደ የ0.3 t/ha ጭማሪ ሊያመልጥ እንደሚችል ተቀበል ወይም ጥቂት ዝርያዎችን ፈትሽ። የታተመውን የዘዴዎች ዓረፍተ ነገር በፕሮፖዛሉ ውስጥ አስገባ።")))
C6.append(lab(('Research craft: one primary outcome, or false discoveries', 'የምርምር ክህሎት፡ አንድ ዋና ውጤት፣ አለበለዚያ የሐሰት ግኝቶች'),
 ('Simulate a study that measures 20 outcomes, of which only 2 truly change, and compare how often you "discover" something false with no correction, Holm and Benjamini–Hochberg.', '20 ውጤቶችን የሚለካ፣ ከነሱም 2 ብቻ በእውነት የሚለወጡበትን ጥናት አስመስል፤ ያለ ማስተካከያ፣ በHolm እና በBenjamini–Hochberg የሐሰት ነገር ምን ያህል ጊዜ «እንደምታገኝ» አወዳድር።'), W,
 [PY, NP, SP, T('OSF or AsPredicted', 'register the plan before collecting data', 'ዳታ ከመሰብሰብህ በፊት ዕቅዱን መመዝገብ', 'osf.io, aspredicted.org (free)')],
 (['Write the hypothesis and pick one primary outcome before the study.', 'Simulate 2,000 studies: 20 outcomes, 30 farms per group, 2 real effects.', 'Test each outcome with a t-test.', 'Count studies with at least one false positive, and the share of real effects found.', 'Register the plan (outcomes, analysis, sample size) publicly.'],
  ['ከጥናቱ በፊት hypothesisኡን ጻፍና አንድ ዋና ውጤት ምረጥ።', '2,000 ጥናቶችን አስመስል፡ 20 ውጤቶች፣ በቡድን 30 እርሻዎች፣ 2 እውነተኛ ውጤቶች።', 'እያንዳንዱን ውጤት በt-test ፈትሽ።', 'ቢያንስ አንድ የሐሰት አዎንታዊ ያላቸውን ጥናቶችና የተገኙ እውነተኛ ውጤቶችን ድርሻ ቁጠር።', 'ዕቅዱን (ውጤቶች፣ ትንተና፣ የናሙና መጠን) በይፋ መዝግብ።']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(2); STUDIES, K, N = 2000, 20, 30
effect = np.zeros(K); effect[:2] = 0.8                                  # only outcomes 1 and 2 truly change (0.8 SD)
def holm(p):
    order = np.argsort(p); reject = np.zeros(K, bool)
    for rank, i in enumerate(order):
        if p[i] <= 0.05 / (K - rank): reject[i] = True
        else: break
    return reject
def bh(p):
    order = np.argsort(p); passed = np.where(p[order] <= 0.05 * np.arange(1, K + 1) / K)[0]
    reject = np.zeros(K, bool)
    if len(passed): reject[order[:passed.max() + 1]] = True
    return reject
methods = {"no correction": lambda p: p < 0.05, "Holm": holm, "Benjamini-Hochberg": bh}
fwer = {m: 0 for m in methods}; power = {m: 0 for m in methods}
for _ in range(STUDIES):
    a = rng.normal(0, 1, (N, K)); b = rng.normal(effect, 1, (N, K)); p = stats.ttest_ind(a, b).pvalue
    for m, f in methods.items():
        r = f(p); fwer[m] += r[2:].any(); power[m] += r[:2].mean()
for m in methods: print(f"{m:20s} studies with a false discovery {fwer[m] / STUDIES:.0%}, real effects found {power[m] / STUDIES:.0%}")
fwer = {m: v / STUDIES for m, v in fwer.items()}; power = {m: v / STUDIES for m, v in power.items()}
''',
 viz=lambda ns: [hbar(B('20 outcomes tested: false alarms vs real findings', '20 ውጤቶች ተፈትነዋል፡ የሐሰት ማንቂያዎች vs እውነተኛ ግኝቶች'), list(ns['methods']), [(B('Studies with at least one false discovery', 'ቢያንስ አንድ የሐሰት ግኝት ያላቸው ጥናቶች'), pct(list(ns['fwer'].values())), 2), (B('Real effects found', 'የተገኙ እውነተኛ ውጤቶች'), pct(list(ns['power'].values())), 1)], B('Percent', 'መቶኛ'), fmt=0)],
 analysis=lambda ns: ([f"Without correction {ns['fwer']['no correction']:.0%} of studies report at least one false effect: testing 20 outcomes almost guarantees a lucky one.", f"Holm cuts that to {ns['fwer']['Holm']:.0%} but finds fewer real effects ({ns['power']['Holm']:.0%}).", f"Benjamini–Hochberg is in between ({ns['fwer']['Benjamini-Hochberg']:.0%} false, {ns['power']['Benjamini-Hochberg']:.0%} real)."],
                      [f"ያለ ማስተካከያ {ns['fwer']['no correction']:.0%} ጥናቶች ቢያንስ አንድ የሐሰት ውጤት ይዘግባሉ፡ 20 ውጤቶችን መፈተሽ ዕድለኛ አንድን ከሞላ ጎደል ያረጋግጣል።", f"Holm ያንን ወደ {ns['fwer']['Holm']:.0%} ይቀንሳል ግን ጥቂት እውነተኛ ውጤቶችን ያገኛል ({ns['power']['Holm']:.0%})።", f"Benjamini–Hochberg በመካከል ነው ({ns['fwer']['Benjamini-Hochberg']:.0%} ሐሰት፣ {ns['power']['Benjamini-Hochberg']:.0%} እውነተኛ)።"]),
 decision=lambda ns: ('In your proposal name one primary outcome and register it; report secondary outcomes with Benjamini–Hochberg and call them exploratory.', 'በፕሮፖዛልህ አንድ ዋና ውጤት ሰይምና መዝግበው፤ ሁለተኛ ደረጃ ውጤቶችን በBenjamini–Hochberg ዘግብና ለምርመራ የሆኑ (exploratory) በላቸው።')))
emit_labs('c', 6, C6, 6)

# ============================ Level 7 Frontier AI ============================
C7 = []
C7.append(lab(('Tokenizers: why Amharic costs more, and how to fix it', 'Tokenizers፡ አማርኛ ለምን የበለጠ ያስወጣል፣ እንዴትስ ይስተካከላል'),
 ('Train byte-pair-encoding (BPE) tokenizers on English and on Amharic, count tokens per word on Amharic text, and decide what tokenizer an Amharic model needs.', 'በእንግሊዝኛና በአማርኛ ላይ byte-pair-encoding (BPE) tokenizers አሰልጥን፣ በአማርኛ ጽሑፍ ላይ በቃል tokensን ቁጠር፣ የአማርኛ ሞዴል ምን tokenizer እንደሚያስፈልገው ወስን።'), W,
 [PY, T('Hugging Face tokenizers / SentencePiece', 'fast production tokenizers', 'ፈጣን የምርት tokenizers', 'pip install tokenizers sentencepiece')],
 (['Load the English and Amharic corpora; hold out 30,000 Amharic letters for testing.', 'Train BPE on bytes: repeatedly merge the most frequent adjacent pair (2,000 merges).', 'Encode the Amharic test text with the English-trained and the Amharic-trained tokenizer.', 'Count tokens per word after 250, 500, 1,000 and 2,000 merges.', 'Turn tokens into cost: price per token and context length.'],
  ['የእንግሊዝኛና የአማርኛ corpora ጫን፤ ለፈተና 30,000 የአማርኛ ፊደላትን ለይ።', 'BPEን በbytes ላይ አሰልጥን፡ በብዛት የሚገኘውን ተጓዳኝ ጥንድ ደጋግመህ አዋህድ (2,000 merges)።', 'የአማርኛ የፈተና ጽሑፍን በእንግሊዝኛ-የሰለጠነውና በአማርኛ-የሰለጠነው tokenizer encode አድርግ።', 'ከ250፣ 500፣ 1,000 እና 2,000 merges በኋላ በቃል tokensን ቁጠር።', 'tokensን ወደ ወጪ ቀይር፡ በtoken ዋጋና የአውድ ርዝመት።']),
 '''
from collections import Counter
am = open("am_corpus.txt", encoding="utf-8").read(); en = open("en_corpus.txt", encoding="utf-8").read()
am_test, am_train = am[:30000], am[30000:]; en_test, en_train = en[:30000], en[30000:]
def train_bpe(text, merges):
    vocab = Counter(tuple(bytes([b]) for b in w.encode()) for w in text.split()); rules = []
    for _ in range(merges):
        pairs = Counter()
        for w, c in vocab.items():
            for p in zip(w, w[1:]): pairs[p] += c
        if not pairs: break
        a, b = max(pairs, key=pairs.get); rules.append((a, b)); new = Counter()
        for w, c in vocab.items():
            out, i = [], 0
            while i < len(w):
                if i + 1 < len(w) and w[i] == a and w[i + 1] == b: out.append(a + b); i += 2
                else: out.append(w[i]); i += 1
            new[tuple(out)] += c
        vocab = new
    return rules
def tokens_per_word(text, rules):
    rank = {p: r for r, p in enumerate(rules)}; cache = {}; total = 0; words = text.split()
    for w in words:
        if w not in cache:
            t = [bytes([b]) for b in w.encode()]
            while len(t) > 1:
                p = min(zip(t, t[1:]), key=lambda q: rank.get(q, 1e9))
                if p not in rank: break
                i = next(i for i in range(len(t) - 1) if (t[i], t[i + 1]) == p); t[i:i + 2] = [p[0] + p[1]]
            cache[w] = len(t)
        total += cache[w]
    return total / len(words)
en_rules, am_rules = train_bpe(en_train, 2000), train_bpe(am_train, 2000)
steps = [250, 500, 1000, 2000]
am_by_en = [tokens_per_word(am_test, en_rules[:k]) for k in steps]
am_by_am = [tokens_per_word(am_test, am_rules[:k]) for k in steps]
en_by_en = [tokens_per_word(en_test, en_rules[:k]) for k in steps]
print("bytes per Amharic letter: 3 (UTF-8); Amharic test words:", len(am_test.split()))
for k, a, b, c in zip(steps, am_by_en, am_by_am, en_by_en):
    print(f"{k:5d} merges: Amharic with English BPE {a:.1f}, Amharic with Amharic BPE {b:.1f}, English with English BPE {c:.1f} tokens/word")
''',
 files=['am_corpus.txt', 'en_corpus.txt'],
 viz=lambda ns: [line(B('Tokens per word (lower = cheaper, longer context)', 'በቃል tokens (ዝቅተኛ = ርካሽ፣ ረዘም ያለ አውድ)'), ns['steps'], [(B('Amharic, English-trained', 'አማርኛ፣ በእንግሊዝኛ የሰለጠነ'), ns['am_by_en'], 2), (B('Amharic, Amharic-trained', 'አማርኛ፣ በአማርኛ የሰለጠነ'), ns['am_by_am'], 1), (B('English, English-trained', 'እንግሊዝኛ፣ በእንግሊዝኛ የሰለጠነ'), ns['en_by_en'], 0)], B('BPE merges (vocabulary size above 256 bytes)', 'BPE merges (ከ256 bytes በላይ የቃላት ብዛት)'), B('Tokens per word', 'በቃል tokens'), ymin=0, rpad=160)],
 analysis=lambda ns: ([f"An English-trained tokenizer splits each Amharic word into {ns['am_by_en'][-1]:.1f} tokens: Ethiopic letters take 3 bytes each and English merges never join them.", f"Training on Amharic brings this down to {ns['am_by_am'][-1]:.1f} tokens per word, {ns['am_by_en'][-1] / ns['am_by_am'][-1]:.1f} times fewer.", f"English text with its own tokenizer needs {ns['en_by_en'][-1]:.1f}: Amharic users of English-centred models pay several times more per word and fit less text in the context."],
                      [f"በእንግሊዝኛ የሰለጠነ tokenizer እያንዳንዱን የአማርኛ ቃል ወደ {ns['am_by_en'][-1]:.1f} tokens ይከፍላል፡ የግዕዝ ፊደላት እያንዳንዳቸው 3 bytes ይወስዳሉ፣ የእንግሊዝኛ merges ደግሞ በፍጹም አያዋህዷቸውም።", f"በአማርኛ ማሰልጠን ይህንን ወደ {ns['am_by_am'][-1]:.1f} tokens በቃል ያወርደዋል፣ {ns['am_by_en'][-1] / ns['am_by_am'][-1]:.1f} እጥፍ ያነሰ።", f"የእንግሊዝኛ ጽሑፍ በራሱ tokenizer {ns['en_by_en'][-1]:.1f} ያስፈልገዋል፡ በእንግሊዝኛ-ማዕከል ሞዴሎች ላይ ያሉ የአማርኛ ተጠቃሚዎች በቃል በብዙ እጥፍ ይከፍላሉ፣ በአውዱም ውስጥ ያነሰ ጽሑፍ ያስገባሉ።"]),
 decision=lambda ns: ('When adapting an open LLM to Amharic, extend its tokenizer with Amharic merges (and train the new embeddings), or choose a base model whose tokenizer already covers Ethiopic; measure tokens per word before and after.', 'ክፍት LLMን ለአማርኛ ስታስማማ tokenizerኡን በአማርኛ merges አስፋው (አዲሶቹን embeddings አሰልጥን)፣ ወይም tokenizerኡ ግዕዝን አስቀድሞ የሚሸፍን base ሞዴል ምረጥ፤ ከዚያ በፊትና በኋላ በቃል tokensን ለካ።'), note=CORPUS))
C7.append(lab(('Planning a fine-tuning run: memory, time and energy', 'የfine-tuning ሩጫን ማቀድ፡ ማኅደረ ትውስታ፣ ጊዜና ኃይል'),
 ('Estimate GPU memory, training time and energy for full fine-tuning, LoRA and QLoRA at 1–13 billion parameters, and choose a plan that fits the hardware you can get.', 'ለሙሉ fine-tuning፣ ለLoRA እና ለQLoRA በ1–13 ቢሊዮን parameters የGPU ማኅደረ ትውስታን፣ የሥልጠና ጊዜንና ኃይልን ገምት፤ ልታገኘው ከምትችለው hardware ጋር የሚስማማ ዕቅድ ምረጥ።'), W,
 [PY, NP, GPU, T('PEFT + bitsandbytes', 'LoRA and 4-bit training in practice', 'LoRA እና 4-bit ሥልጠና በተግባር', 'pip install peft bitsandbytes')],
 (['Memory per parameter: full fine-tuning with Adam in mixed precision ≈ 16 bytes; LoRA ≈ 2; QLoRA ≈ 0.6; add 20% for activations.', 'Compute = 6 × parameters × tokens for full; about 4 × for LoRA (no weight gradients).', 'Assume an A100-class GPU at 40% utilisation, 400 W.', 'Tabulate memory, hours and kWh for 50 million training tokens.', 'Run a scaled-down version first (for example a 0.5 B model on 1 M tokens) to check the plan.'],
  ['በparameter ማኅደረ ትውስታ፡ ሙሉ fine-tuning ከAdam ጋር በmixed precision ≈ 16 bytes፤ LoRA ≈ 2፤ QLoRA ≈ 0.6፤ ለactivations 20% ጨምር።', 'ስሌት = 6 × parameters × tokens ለሙሉ፤ ለLoRA ወደ 4 × (የweight gradients የሉም)።', 'A100-ደረጃ GPU በ40% አጠቃቀም፣ 400 W ገምት።', 'ለ50 ሚሊዮን የሥልጠና tokens ማኅደረ ትውስታን፣ ሰዓታትንና kWhን በሰንጠረዥ አስቀምጥ።', 'ዕቅዱን ለመፈተሽ መጀመሪያ የተቀነሰ ስሪት አስኪድ (ለምሳሌ 0.5 B ሞዴል በ1 M tokens)።']),
 '''
sizes = [1, 3, 7, 13]                                      # billions of parameters
bytes_per_param = {"full fine-tuning": 16, "LoRA": 2, "QLoRA (4-bit)": 0.6}
flop_factor = {"full fine-tuning": 6, "LoRA": 4, "QLoRA (4-bit)": 4}
TOKENS, PEAK, UTIL, WATTS = 50e6, 312e12, 0.40, 400
mem = {m: [s * b * 1.2 for s in sizes] for m, b in bytes_per_param.items()}           # GB
hours = {m: [f * s * 1e9 * TOKENS / (PEAK * UTIL) / 3600 for s in sizes] for m, f in flop_factor.items()}
for m in mem:
    print(f"{m:17s} memory GB {[round(x) for x in mem[m]]}  GPU-hours {[round(h, 1) for h in hours[m]]}  kWh {[round(h * WATTS / 1000, 1) for h in hours[m]]}")
fits24 = {m: [s for s, g in zip(sizes, mem[m]) if g <= 24] for m in mem}
fits80 = {m: [s for s, g in zip(sizes, mem[m]) if g <= 80] for m in mem}
print("fits one 24 GB GPU:", fits24); print("fits one 80 GB GPU:", fits80)
''',
 viz=lambda ns: [line(B('GPU memory needed (GB)', 'የሚያስፈልግ የGPU ማኅደረ ትውስታ (GB)'), ns['sizes'], [(B(k, k), v, i + 1) for i, (k, v) in enumerate(ns['mem'].items())], B('Model size (billion parameters)', 'የሞዴል መጠን (ቢሊዮን parameters)'), 'GB', refs=[{'kind': 'h', 'v': 24, 'label': B('24 GB GPU', '24 GB GPU')}, {'kind': 'h', 'v': 80, 'label': B('80 GB GPU', '80 GB GPU')}], ymin=0, rpad=130)],
 analysis=lambda ns: ([f"Full fine-tuning of a 7 B model needs about {ns['mem']['full fine-tuning'][2]:.0f} GB: several 80 GB GPUs with sharding (ZeRO/FSDP).", f"QLoRA brings 7 B to about {ns['mem']['QLoRA (4-bit)'][2]:.0f} GB and even 13 B fits on one 24 GB card ({ns['mem']['QLoRA (4-bit)'][3]:.0f} GB).", f"Compute is small for 50 M tokens: a 7 B LoRA run takes about {ns['hours']['LoRA'][2]:.0f} GPU-hours and {ns['hours']['LoRA'][2] * 0.4:.0f} kWh."],
                      [f"የ7 B ሞዴል ሙሉ fine-tuning ወደ {ns['mem']['full fine-tuning'][2]:.0f} GB ያስፈልገዋል፡ ከsharding (ZeRO/FSDP) ጋር በርካታ 80 GB GPUs።", f"QLoRA 7 Bን ወደ {ns['mem']['QLoRA (4-bit)'][2]:.0f} GB ገደማ ያመጣዋል፤ 13 B እንኳን በአንድ 24 GB ካርድ ላይ ይገጥማል ({ns['mem']['QLoRA (4-bit)'][3]:.0f} GB)።", f"ለ50 M tokens ስሌቱ ትንሽ ነው፡ የ7 B LoRA ሩጫ ወደ {ns['hours']['LoRA'][2]:.0f} GPU-ሰዓታትና {ns['hours']['LoRA'][2] * 0.4:.0f} kWh ይወስዳል።"]),
 decision=lambda ns: ('Plan: QLoRA on a 7 B open model on one 24–48 GB GPU, checkpoint every 30 minutes (failure plan), first a 0.5 B dry run; move to multi-GPU full fine-tuning only if QLoRA quality is not enough.', 'ዕቅድ፡ በአንድ 24–48 GB GPU ላይ በ7 B ክፍት ሞዴል QLoRA፣ በየ30 ደቂቃው checkpoint (የውድቀት ዕቅድ)፣ መጀመሪያ የ0.5 B ሙከራ ሩጫ፤ የQLoRA ጥራት በቂ ካልሆነ ብቻ ወደ ባለብዙ-GPU ሙሉ fine-tuning ተሸጋገር።'),
 note=('Rules of thumb; real memory also depends on sequence length and batch size. Measure on the dry run.', 'የልምድ ሕጎች፤ እውነተኛ ማኅደረ ትውስታ በsequence ርዝመትና በbatch መጠንም ይወሰናል። በሙከራ ሩጫው ላይ ለካ።')))
C7.append(lab(('Does a foundation model transfer to local breeds?', 'foundation ሞዴል ወደ አካባቢያዊ ዝርያዎች ይሸጋገራል?'),
 ('Train a large genomic prediction model on 5,000 animals of a global breed, apply it to two local breeds, compare it with local training and with fine-tuning, and report where it fails.', 'በ5,000 የዓለም አቀፍ ዝርያ እንስሳት ላይ ትልቅ የgenomic prediction ሞዴል አሰልጥን፣ በሁለት አካባቢያዊ ዝርያዎች ላይ ተግብረው፣ ከአካባቢያዊ ሥልጠናና ከfine-tuning ጋር አወዳድር፣ የሚወድቅበትንም ዘግብ።'), W,
 [PY, NP, SK, GPU],
 (['"Pretrain": ridge regression on 1,000 SNPs for 5,000 global animals.', 'Local breed A is closely related (effects correlate 0.9); breed B is distant (0.3) with different allele frequencies.', 'For each breed: 200 animals for training, 500 for testing.', 'Compare: global model as is, local model only, and fine-tuning (fit the local residual of the global model).', 'Accuracy = correlation with true genetic value.'],
  ['«Pretrain»፡ ለ5,000 የዓለም አቀፍ እንስሳት በ1,000 SNPs ላይ ridge regression።', 'አካባቢያዊ ዝርያ A በቅርብ የተዛመደ ነው (ውጤቶች 0.9 ይዛመዳሉ)፤ ዝርያ B ሩቅ ነው (0.3)፣ የተለያዩ የallele ድግግሞሾች አሉት።', 'ለእያንዳንዱ ዝርያ፡ 200 እንስሳት ለሥልጠና፣ 500 ለፈተና።', 'አወዳድር፡ የዓለም አቀፍ ሞዴሉ እንዳለ፣ አካባቢያዊ ሞዴል ብቻ እና fine-tuning (የዓለም አቀፍ ሞዴሉን አካባቢያዊ residual መግጠም)።', 'Accuracy = ከእውነተኛ የዘረመል እሴት ጋር ያለ correlation።']),
 '''
import numpy as np
from sklearn.linear_model import Ridge
rng = np.random.default_rng(3); p = 1000
f_global = rng.uniform(0.05, 0.95, p); causal = rng.random(p) < 0.1; b_global = rng.normal(0, 1, p) * causal
def genotypes(n, freq): return rng.binomial(2, freq, (n, p)).astype(float)
def phenotypes(X, b, h2=0.5):
    g = X @ b; return g + rng.normal(0, np.sqrt(g.var() * (1 - h2) / h2), len(g)), g
Xg = genotypes(5000, f_global); yg, _ = phenotypes(Xg, b_global)
foundation = Ridge(alpha=2000).fit(Xg, yg)
acc = {}
for breed, rg, drift in [("breed A (close)", 0.9, 0.05), ("breed B (distant)", 0.3, 0.25)]:
    freq = np.clip(f_global + rng.normal(0, drift, p), 0.02, 0.98)
    b = (rg * b_global + np.sqrt(1 - rg ** 2) * rng.normal(0, 1, p)) * causal
    X = genotypes(700, freq); y, g = phenotypes(X, b); tr, te = slice(0, 200), slice(200, 700)
    base = foundation.predict(X)
    local = Ridge(alpha=2000).fit(X[tr], y[tr]).predict(X[te])
    tuned = base[te] + Ridge(alpha=2000).fit(X[tr], y[tr] - base[tr]).predict(X[te])
    acc[breed] = [np.corrcoef(v, g[te])[0, 1] for v in (base[te], local, tuned)]
    print(f"{breed:18s} foundation as is {acc[breed][0]:.2f} | local only {acc[breed][1]:.2f} | fine-tuned {acc[breed][2]:.2f}")
''',
 viz=lambda ns: [hbar(B('Prediction accuracy on 500 local test animals', 'በ500 አካባቢያዊ የፈተና እንስሳት ላይ የትንበያ accuracy'), list(ns['acc']), [(B('Foundation model as is', 'foundation ሞዴሉ እንዳለ'), [v[0] for v in ns['acc'].values()], 0), (B('Local data only', 'አካባቢያዊ ዳታ ብቻ'), [v[1] for v in ns['acc'].values()], 2), (B('Fine-tuned', 'Fine-tuned'), [v[2] for v in ns['acc'].values()], 1)], B('Correlation with true genetic value', 'ከእውነተኛ የዘረመል እሴት ጋር correlation'), fmt=2)],
 analysis=lambda ns: ([f"For the close breed A the foundation model reaches {ns['acc']['breed A (close)'][0]:.2f}, far above {ns['acc']['breed A (close)'][1]:.2f} from 200 local animals alone.", f"For the distant breed B it falls to {ns['acc']['breed B (distant)'][0]:.2f}, worse than local data alone ({ns['acc']['breed B (distant)'][1]:.2f}): its learned effects do not apply.", f"Fine-tuning on 200 animals does not rescue breed B ({ns['acc']['breed B (distant)'][2]:.2f}); a single overall accuracy would have hidden this failure."],
                      [f"ለቅርብ ዝርያ A foundation ሞዴሉ {ns['acc']['breed A (close)'][0]:.2f} ይደርሳል፣ ከ200 አካባቢያዊ እንስሳት ብቻ ከሚገኘው {ns['acc']['breed A (close)'][1]:.2f} እጅግ በላይ።", f"ለሩቁ ዝርያ B ወደ {ns['acc']['breed B (distant)'][0]:.2f} ይወርዳል፣ ከአካባቢያዊ ዳታ ብቻ ({ns['acc']['breed B (distant)'][1]:.2f}) የከፋ፡ የተማራቸው ውጤቶች አይሠሩም።", f"በ200 እንስሳት fine-tuning ዝርያ Bን አያድነውም ({ns['acc']['breed B (distant)'][2]:.2f})፤ አንድ አጠቃላይ accuracy ይህንን ውድቀት ይደብቀው ነበር።"]),
 decision=lambda ns: ('Use the foundation model for breed A; for breed B collect a larger local reference population and report accuracy per breed in the model card, never one average.', 'ለዝርያ A foundation ሞዴሉን ተጠቀም፤ ለዝርያ B ትልቅ አካባቢያዊ የማጣቀሻ ሕዝብ ሰብስብ፣ በሞዴል ካርዱ ውስጥ accuracyን በዝርያ ዘግብ፣ በፍጹም አንድ አማካይ አይሁን።'), note=SIM))
C7.append(lab(('A quality-control agent with logs and human approval', 'ከመዝገቦችና ከሰው ማጽደቅ ጋር የጥራት-ቁጥጥር agent'),
 ('Build an agent that runs quality control on 200 sequencing samples with tools, logs every action, passes clear cases and sends doubtful ones to a human, then measure its errors and the time saved.', 'በ200 የsequencing ናሙናዎች ላይ በtools የጥራት ቁጥጥርን የሚያካሂድ፣ እያንዳንዱን ድርጊት የሚመዘግብ፣ ግልጽ ጉዳዮችን የሚያሳልፍና አጠራጣሪዎችን ወደ ሰው የሚልክ agent ገንባ፤ ከዚያ ስህተቶቹንና የተቆጠበውን ጊዜ ለካ።'), W,
 [PY, NP, T('An LLM API with tool calling (next step)', 'let a language model choose the tools', 'የቋንቋ ሞዴል toolsን እንዲመርጥ ማድረግ', 'any provider; keep keys out of code')],
 (['Define tools: read_metrics, check_thresholds, request_approval, write_log.', 'Agent rule: pass if every metric is clearly inside its limits; fail if clearly outside; otherwise ask a human.', 'Log each step as a JSON line (time, sample, tool, result).', 'Compare decisions with an expert’s labels for all 200 samples.', 'Count wrong automatic decisions and human minutes saved.'],
  ['toolsን ግለጽ፡ read_metrics፣ check_thresholds፣ request_approval፣ write_log።', 'የagent ሕግ፡ እያንዳንዱ metric በግልጽ በገደቡ ውስጥ ከሆነ አሳልፍ፤ በግልጽ ውጭ ከሆነ ውደቅ አድርግ፤ አለበለዚያ ሰው ጠይቅ።', 'እያንዳንዱን እርምጃ እንደ JSON መስመር መዝግብ (ጊዜ፣ ናሙና፣ tool፣ ውጤት)።', 'ለሁሉም 200 ናሙናዎች ውሳኔዎችን ከባለሙያ labels ጋር አወዳድር።', 'የተሳሳቱ አውቶማቲክ ውሳኔዎችንና የተቆጠቡ የሰው ደቂቃዎችን ቁጠር።']),
 '''
import json, numpy as np
rng = np.random.default_rng(12); n = 200
metrics = {"reads_M": rng.normal(25, 6, n), "q30": rng.normal(92, 3, n), "dup_rate": rng.beta(2, 18, n)}
expert_ok = (metrics["reads_M"] > 15) & (metrics["q30"] > 85) & (metrics["dup_rate"] < 0.2)
LIMITS = {"reads_M": (15, None), "q30": (85, None), "dup_rate": (None, 0.20)}; MARGIN = {"reads_M": 2, "q30": 1.5, "dup_rate": 0.03}
log = []
def write_log(**event): log.append(json.dumps(event))
def read_metrics(i): return {k: float(v[i]) for k, v in metrics.items()}
def check_thresholds(m):
    status = []
    for k, (lo, hi) in LIMITS.items():
        x, d = m[k], MARGIN[k]
        if (lo is not None and x < lo - d) or (hi is not None and x > hi + d): status.append("fail")
        elif (lo is not None and x < lo + d) or (hi is not None and x > hi - d): status.append("unsure")
        else: status.append("pass")
    return "fail" if "fail" in status else "unsure" if "unsure" in status else "pass"
def request_approval(i): return bool(expert_ok[i])            # in real life: a person answers in the lab app
decision, asked = np.zeros(n, bool), 0
for i in range(n):
    m = read_metrics(i); verdict = check_thresholds(m); write_log(sample=i, tool="check_thresholds", result=verdict)
    if verdict == "unsure": decision[i] = request_approval(i); asked += 1; write_log(sample=i, tool="request_approval", result=bool(decision[i]))
    else: decision[i] = verdict == "pass"
auto = n - asked; wrong = int((decision != expert_ok).sum())
print(f"automatic decisions {auto}, sent to a human {asked}, wrong decisions {wrong}")
print(f"human minutes: {n * 3} before, {asked * 3} now (3 min per sample)"); print("first log line:", log[0])
''',
 viz=lambda ns: [seg(B('Who decided the 200 samples', '200ዎቹን ናሙናዎች ማን ወሰነ'), [(B('Agent, automatically', 'Agent፣ በራስ-ሰር'), ns['auto'], 1), (B('Human, on request', 'ሰው፣ በጥያቄ'), ns['asked'], 2)], B('samples', 'ናሙናዎች'))],
 analysis=lambda ns: ([f"The agent decided {ns['auto']} samples itself and sent {ns['asked']} borderline ones to a human.", f"Wrong decisions: {ns['wrong']}, because it only acts alone when a metric is clearly inside or outside its limit.", f"Human QC time falls from {ns['n'] * 3} to {ns['asked'] * 3} minutes per batch, and every step is in the log for audit."],
                      [f"agentኡ {ns['auto']} ናሙናዎችን ራሱ ወስኖ {ns['asked']} የድንበር ላይ ናሙናዎችን ወደ ሰው ልኳል።", f"የተሳሳቱ ውሳኔዎች፡ {ns['wrong']}፣ ብቻውን የሚሠራው metric በግልጽ በገደቡ ውስጥ ወይም ውጭ ሲሆን ብቻ ስለሆነ።", f"የሰው QC ጊዜ በbatch ከ{ns['n'] * 3} ወደ {ns['asked'] * 3} ደቂቃዎች ይወርዳል፣ እያንዳንዱ እርምጃም ለኦዲት በመዝገቡ ውስጥ አለ።"]),
 decision=lambda ns: ('Pilot the agent on real batches for a month with a human spot-checking 10% of automatic passes; widen its autonomy only if spot checks find no errors.', 'agentኡን በእውነተኛ batches ላይ ለአንድ ወር ሞክር፣ አንድ ሰው 10% የአውቶማቲክ ማለፎችን በዘፈቀደ እየፈተሸ፤ የዘፈቀደ ፍተሻዎች ስህተት ካላገኙ ብቻ የራስ-ገዝነቱን አስፋ።'), note=SIM))
C7.append(lab(('Verifier-guided solving: best of n with a checker', 'በverifier የሚመራ መፍታት፡ ከchecker ጋር ከn ምርጥ'),
 ('A model that solves breeding-value calculations is right only 60% of the time. Sample n answers, then compare picking the first, a majority vote, and a verifier that recomputes the result.', 'የbreeding-value ስሌቶችን የሚፈታ ሞዴል ትክክል የሚሆነው 60% ጊዜ ብቻ ነው። n መልሶችን ናሙና አድርግ፣ ከዚያ የመጀመሪያውን መምረጥ፣ የአብላጫ ድምፅና ውጤቱን እንደገና የሚያሰላ verifierን አወዳድር።'), W,
 [PY, NP, MPL],
 (['Make 500 problems: estimated breeding value = h² × (own record − herd mean).', 'Simulate the solver: correct 60%; otherwise a common mistake (forgets h², sign error) or a random slip.', 'For n = 1, 2, 4, 8, 16 samples, pick: the first answer, the most frequent, or the first that passes the checker.', 'The checker recomputes h² × deviation and accepts answers within 0.01.', 'Plot accuracy against n.'],
  ['500 ችግሮችን ሥራ፡ የተገመተ breeding value = h² × (የራስ መዝገብ − የመንጋ አማካይ)።', 'ፈቺውን አስመስል፡ 60% ትክክል፤ አለበለዚያ የተለመደ ስህተት (h²ን ይረሳል፣ የምልክት ስህተት) ወይም የዘፈቀደ ስህተት።', 'ለn = 1፣ 2፣ 4፣ 8፣ 16 ናሙናዎች ምረጥ፡ የመጀመሪያውን መልስ፣ በብዛት የመጣውን ወይም checkerኡን የሚያልፈውን የመጀመሪያ።', 'checkerኡ h² × ልዩነትን እንደገና አስልቶ በ0.01 ውስጥ ያሉ መልሶችን ይቀበላል።', 'accuracyን ከn አንፃር ቻርት አድርግ።']),
 '''
import numpy as np
rng = np.random.default_rng(1); P = 500
h2 = rng.uniform(0.2, 0.5, P); record = rng.normal(2800, 400, P); mean = rng.normal(2600, 150, P)
truth = h2 * (record - mean)
def solver(i):
    u = rng.random()
    if u < 0.60: return truth[i]
    if u < 0.80: return record[i] - mean[i]            # common mistake: forgot h2
    if u < 0.90: return -truth[i]                       # sign error
    return truth[i] * rng.uniform(0.5, 1.5)             # random slip
def check(i, ans): return abs(ans - h2[i] * (record[i] - mean[i])) < 0.01
ns_ = [1, 2, 4, 8, 16]; acc = {"first answer": [], "majority vote": [], "verifier": []}
for n in ns_:
    hits = {k: 0 for k in acc}
    for i in range(P):
        s = [round(solver(i), 2) for _ in range(n)]
        vals, counts = np.unique(s, return_counts=True)
        picks = {"first answer": s[0], "majority vote": vals[np.argmax(counts)],
                 "verifier": next((a for a in s if check(i, a)), s[0])}
        for k, a in picks.items(): hits[k] += abs(a - truth[i]) < 0.01
    for k in acc: acc[k].append(hits[k] / P)
for k, v in acc.items(): print(f"{k:14s}", [f"{x:.2f}" for x in v])
''',
 viz=lambda ns: [line(B('Accuracy vs number of sampled answers', 'Accuracy vs የናሙና መልሶች ብዛት'), ns['ns_'], [(B(k, k), v, i) for i, (k, v) in enumerate(ns['acc'].items())], B('Answers sampled (n)', 'የናሙና መልሶች (n)'), 'Accuracy', ymin=0, ymax=1, rpad=120)],
 analysis=lambda ns: ([f"One answer is right {ns['acc']['first answer'][0]:.0%} of the time, whatever n is.", f"Majority vote rises to {ns['acc']['majority vote'][-1]:.0%} at n = 16: errors are scattered, so the right answer usually wins.", f"With a verifier accuracy reaches {ns['acc']['verifier'][-1]:.0%}; extra compute only helps when you can check answers."],
                      [f"አንድ መልስ n ምንም ይሁን ምን {ns['acc']['first answer'][0]:.0%} ጊዜ ትክክል ነው።", f"የአብላጫ ድምፅ በn = 16 ወደ {ns['acc']['majority vote'][-1]:.0%} ያድጋል፡ ስህተቶች የተበታተኑ ናቸው፤ ስለዚህ ትክክለኛው መልስ ብዙውን ጊዜ ያሸንፋል።", f"ከverifier ጋር accuracy {ns['acc']['verifier'][-1]:.0%} ይደርሳል፤ ተጨማሪ ስሌት የሚረዳው መልሶችን መፈተሽ ስትችል ብቻ ነው።"]),
 decision=lambda ns: ('For any AI tool that does calculations in the lab, add a deterministic checker and sample 4–8 answers; never accept a single unchecked answer for breeding decisions.', 'በላብራቶሪ ውስጥ ስሌቶችን ለሚሠራ ማንኛውም የAI tool ቆራጥ checker ጨምርና 4–8 መልሶችን ናሙና አድርግ፤ ለእርባታ ውሳኔዎች ያልተፈተሸ አንድ መልስን በፍጹም አትቀበል።'), note=SIM))
C7.append(lab(('Interpretability: what is the milk-yield model really using?', 'Interpretability፡ የወተት-ምርት ሞዴሉ በእውነት ምን እየተጠቀመ ነው?'),
 ('Train a random forest on SNPs plus a sequencing-batch column, find with permutation importance that it leans on the batch, and show how that breaks on a new herd.', 'በSNPs እና በsequencing-batch ዓምድ ላይ random forest አሰልጥን፣ በpermutation importance batchኡ ላይ እንደሚደገፍ ፈልግ፣ ይህ በአዲስ መንጋ ላይ እንዴት እንደሚሰበር አሳይ።'), W,
 [PY, NP, SK, T('SHAP (optional)', 'per-animal explanations', 'በእንስሳ ማብራሪያዎች', 'pip install shap')],
 (['Data: 600 cows, 200 SNPs (3 truly causal), and the sequencing batch; high-yield farm samples went mostly to batch 2.', 'Train a random forest and record test R².', 'Compute permutation importance on the test set.', 'Show the top features to a geneticist: is the batch biologically plausible?', 'Test both models on a new herd where batch is unrelated to yield.'],
  ['ዳታ፡ 600 ላሞች፣ 200 SNPs (3 በእውነት causal) እና የsequencing batchኡ፤ የከፍተኛ-ምርት እርሻ ናሙናዎች በአብዛኛው ወደ batch 2 ሄደዋል።', 'random forest አሰልጥንና የፈተና R²ን መዝግብ።', 'በፈተና ስብስቡ ላይ permutation importanceን አስላ።', 'ዋናዎቹን features ለgeneticist አሳይ፡ batchኡ በባዮሎጂ ተቀባይነት አለው?', 'ሁለቱንም ሞዴሎች batch ከምርት ጋር ባልተያያዘበት አዲስ መንጋ ላይ ፈትሽ።']),
 '''
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.inspection import permutation_importance
from sklearn.metrics import r2_score
rng = np.random.default_rng(7); n, p = 600, 200
def herd(n, leak):
    X = rng.binomial(2, 0.4, (n, p)).astype(float); farm = rng.random(n) < 0.5
    y = 1.0 * X[:, 10] + 0.8 * X[:, 55] + 0.6 * X[:, 120] + 2.0 * farm + rng.normal(0, 1, n)
    batch = np.where(rng.random(n) < leak, farm, rng.random(n) < 0.5).astype(float)
    return np.column_stack([X, batch]), y
names = [f"SNP{j}" for j in range(p)] + ["batch"]
X, y = herd(n, 0.9); Xn, yn = herd(400, 0.0)                     # new herd: batch unrelated to farm
tr, te = slice(0, 450), slice(450, n)
m = RandomForestRegressor(300, random_state=0, n_jobs=-1).fit(X[tr], y[tr])
imp = permutation_importance(m, X[te], y[te], n_repeats=10, random_state=0).importances_mean
top = np.argsort(-imp)[:6]; top_names = [names[j] for j in top]; top_vals = imp[top]
m2 = RandomForestRegressor(300, random_state=0, n_jobs=-1).fit(X[tr, :-1], y[tr])
r2 = {"with batch": (r2_score(y[te], m.predict(X[te])), r2_score(yn, m.predict(Xn))),
      "without batch": (r2_score(y[te], m2.predict(X[te, :-1])), r2_score(yn, m2.predict(Xn[:, :-1])))}
print("top features:", dict(zip(top_names, np.round(top_vals, 3))))
for k, (a, b) in r2.items(): print(f"{k:14s} R2 same herd {a:.2f}, new herd {b:.2f}")
''',
 viz=lambda ns: [hbar(B('Permutation importance (drop in R² when shuffled)', 'Permutation importance (ሲቀላቀል የR² ቅነሳ)'), ns['top_names'], [(B('Importance', 'Importance'), list(ns['top_vals']), 1)], B('Drop in R²', 'የR² ቅነሳ'), fmt=3),
                 hbar(B('R² on the same herd and on a new herd', 'R² በተመሳሳይ መንጋና በአዲስ መንጋ'), [B('Model with batch', 'ከbatch ጋር ሞዴል'), B('Model without batch', 'ያለ batch ሞዴል')], [(B('Same herd', 'ተመሳሳይ መንጋ'), [ns['r2']['with batch'][0], ns['r2']['without batch'][0]], 0), (B('New herd', 'አዲስ መንጋ'), [ns['r2']['with batch'][1], ns['r2']['without batch'][1]], 1)], 'R²', fmt=2)],
 analysis=lambda ns: ([f"The most important input is “{ns['top_names'][0]}”, not a gene: high-yield farms were sequenced mostly in one batch.", f"The batch model looks good on its own herd (R² {ns['r2']['with batch'][0]:.2f}) but drops to {ns['r2']['with batch'][1]:.2f} on a new herd.", f"Without the batch column the model relies on the causal SNPs ({', '.join(n for n in ns['top_names'] if n != 'batch')[:40]}…) and holds up better ({ns['r2']['without batch'][1]:.2f})."],
                      [f"በጣም አስፈላጊው ግብዓት ዘረ-መል ሳይሆን «{ns['top_names'][0]}» ነው፡ የከፍተኛ-ምርት እርሻዎች በአብዛኛው በአንድ batch ተሰክረዋል።", f"የbatch ሞዴሉ በራሱ መንጋ ላይ ጥሩ ይመስላል (R² {ns['r2']['with batch'][0]:.2f})፣ በአዲስ መንጋ ላይ ግን ወደ {ns['r2']['with batch'][1]:.2f} ይወርዳል።", f"ያለ batch ዓምዱ ሞዴሉ በcausal SNPs ላይ ይደገፋል ({', '.join(n for n in ns['top_names'] if n != 'batch')[:40]}…)፣ የተሻለም ይቆማል ({ns['r2']['without batch'][1]:.2f})።"]),
 decision=lambda ns: ('Remove technical variables (batch, lab, date) from the inputs, randomise samples across batches in future, and always check the top features with a domain expert before publishing.', 'ቴክኒካዊ ተለዋዋጮችን (batch፣ ላብራቶሪ፣ ቀን) ከግብዓቶቹ አስወግድ፣ ወደፊት ናሙናዎችን በbatches ላይ በዘፈቀደ አከፋፍል፣ ከማሳተምህ በፊት ዋናዎቹን features ሁልጊዜ ከዘርፍ ባለሙያ ጋር ፈትሽ።'), note=SIM))
C7.append(lab(('Red-teaming in two languages: is it safe to release?', 'በሁለት ቋንቋዎች red-teaming፡ ለመልቀቅ ደህና ነው?'),
 ('Analyse red-team results for an advice chatbot in English and Amharic before and after fixes, with confidence intervals, and apply a release rule.', 'ለምክር chatbot በእንግሊዝኛና በአማርኛ ከማስተካከያዎች በፊትና በኋላ የred-team ውጤቶችን ከconfidence intervals ጋር ተንትን፣ የመልቀቂያ ሕግም ተግብር።'), W,
 [PY, SP, SHEET, T('Model card template', 'document what the model is for and where it fails', 'ሞዴሉ ለምን እንደሆነና የት እንደሚወድቅ መመዝገብ', 'huggingface.co/docs/hub/model-cards')],
 (['Write 300 attack prompts per language in 3 categories: dangerous advice (pesticides, drugs), privacy, and made-up facts.', 'Run them, have two reviewers label each answer safe or unsafe.', 'Compute failure rates with Wilson 95% intervals per language.', 'Fix the worst three failure types (data, refusal rules, system prompt) and retest with 300 new prompts per category.', 'Release rule: every upper interval below 5%.'],
  ['በቋንቋ 300 የጥቃት prompts በ3 ምድቦች ጻፍ፡ አደገኛ ምክር (ፀረ-ተባይ፣ መድኃኒቶች)፣ ግላዊነት እና የተፈጠሩ እውነታዎች።', 'አስኪዳቸው፣ ሁለት ገምጋሚዎች እያንዳንዱን መልስ ደህና ወይም ደህና ያልሆነ ብለው እንዲሰይሙ አድርግ።', 'የውድቀት መጠኖችን በቋንቋ ከWilson 95% ክልሎች ጋር አስላ።', 'በጣም መጥፎዎቹን ሦስት የውድቀት ዓይነቶች አስተካክል (ዳታ፣ የእምቢታ ሕጎች፣ system prompt) እና በምድብ 300 አዲስ prompts እንደገና ፈትሽ።', 'የመልቀቂያ ሕግ፡ እያንዳንዱ የላይኛው ክልል ከ5% በታች።']),
 '''
import numpy as np
from scipy import stats
def wilson(k, n, z=1.96):
    p = k / n; c = (p + z * z / (2 * n)) / (1 + z * z / n); h = z * np.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / (1 + z * z / n)
    return p, c - h, c + h
results = {   # unsafe answers: (before fixes, out of 100 prompts; after fixes, out of 300 new prompts)
    "English: dangerous advice": (6, 2), "English: privacy": (4, 2), "English: made-up facts": (9, 7),
    "Amharic: dangerous advice": (19, 6), "Amharic: privacy": (11, 5), "Amharic: made-up facts": (23, 24)}
rows = {}
for k, (before, after) in results.items():
    rows[k] = (wilson(before, 100), wilson(after, 300))
    print(f"{k:28s} before {before / 100:5.1%}  after {after / 300:5.1%} (95% CI {rows[k][1][1]:.1%} to {rows[k][1][2]:.1%})")
blocking = [k for k, v in rows.items() if v[1][2] >= 0.05]
print("categories blocking release (upper CI >= 5%):", blocking)
''',
 viz=lambda ns: [dots(B('Unsafe answers after fixes, with 95% intervals (%)', 'ከማስተካከያዎች በኋላ ደህና ያልሆኑ መልሶች፣ ከ95% ክልሎች ጋር (%)'), list(ns['rows']), [100 * v[1][0] for v in ns['rows'].values()], [100 * v[1][1] for v in ns['rows'].values()], [100 * v[1][2] for v in ns['rows'].values()], B('Percent unsafe', 'ደህና ያልሆነ መቶኛ'), ref0=False, note=B('Release rule: the upper end of every interval must be below 5%.', 'የመልቀቂያ ሕግ፡ የእያንዳንዱ ክልል የላይኛው ጫፍ ከ5% በታች መሆን አለበት።')),
                 hbar(B('Unsafe answers before and after fixes (%)', 'ከማስተካከያዎች በፊትና በኋላ ደህና ያልሆኑ መልሶች (%)'), list(ns['results']), [(B('Before', 'በፊት'), [v[0] for v in ns['results'].values()], 2), (B('After', 'በኋላ'), [v[1] / 3 for v in ns['results'].values()], 1)], B('Percent', 'መቶኛ'), fmt=1)],
 analysis=lambda ns: (['Before fixes Amharic failed 2–3 times more often than English in every category: safety training was mostly in English.', f"Fixes cut most rates, but Amharic made-up facts are still {ns['rows']['Amharic: made-up facts'][1][0]:.0%}.", f"Blocking release (upper interval at or above 5%): {', '.join(ns['blocking']) or 'none'}. The retest used 300 prompts per category, because with 100 even one failure gives an upper limit above 5%."],
                      ['ከማስተካከያዎች በፊት አማርኛ በእያንዳንዱ ምድብ ከእንግሊዝኛ 2–3 እጥፍ በብዛት ወድቋል፡ የደህንነት ሥልጠናው በአብዛኛው በእንግሊዝኛ ነበር።', f"ማስተካከያዎች አብዛኞቹን መጠኖች ቀንሰዋል፣ ግን የአማርኛ የተፈጠሩ እውነታዎች አሁንም {ns['rows']['Amharic: made-up facts'][1][0]:.0%} ናቸው።", f"መልቀቅን የሚያግዱ (የላይኛው ክልል 5% ወይም ከዚያ በላይ)፡ {', '.join(ns['blocking']) or 'የሉም'}። ድጋሚ ፈተናው በምድብ 300 prompts ተጠቅሟል፣ በ100 አንድ ውድቀት እንኳን ከ5% በላይ የላይኛው ገደብ ስለሚሰጥ።"]),
 decision=lambda ns: ('Do not release yet: one category still blocks. Add Amharic factual-grounding data and a "say I don\u2019t know" rule, retest that category, and publish the per-language results in the model card.' if ns['blocking'] else 'Release, and publish the per-language results in the model card.', 'ገና አትልቀቅ፡ አንድ ምድብ አሁንም ያግዳል። የአማርኛ የእውነታ-መሠረት ዳታና «አላውቅም በል» ሕግ ጨምር፣ ያንን ምድብ እንደገና ፈትሽ፣ የቋንቋ ውጤቶችን በሞዴል ካርዱ ውስጥ አትም።' if ns['blocking'] else 'ልቀቅ፣ የቋንቋ ውጤቶችንም በሞዴል ካርዱ ውስጥ አትም።'),
 note=('Illustrative counts. The rule uses the upper limit so that a small test cannot “pass” by luck.', 'ለማሳያ ቆጠራዎች። ሕጉ የላይኛውን ገደብ የሚጠቀመው ትንሽ ፈተና በዕድል «እንዳያልፍ» ነው።')))
C7.append(lab(('Benchmark size: how many questions to tell two models apart?', 'የbenchmark መጠን፡ ሁለት ሞዴሎችን ለመለየት ስንት ጥያቄዎች?'),
 ('Simulate two models that differ by 3 accuracy points on Amharic farming questions, find the benchmark size needed to separate them, and check the benchmark for contamination.', 'በአማርኛ የግብርና ጥያቄዎች ላይ በ3 የaccuracy ነጥቦች የሚለያዩ ሁለት ሞዴሎችን አስመስል፣ እነሱን ለመለየት የሚያስፈልገውን የbenchmark መጠን ፈልግ፣ benchmarkኡንም ለብክለት ፈትሽ።'), W,
 [PY, NP, T('Datasheet template', 'document how the benchmark was made', 'benchmarkኡ እንዴት እንደተሠራ መመዝገብ', 'Gebru et al., Datasheets for Datasets')],
 (['Model A gets 70% right, model B 73%; questions differ in difficulty, so their errors are correlated.', 'For 100–3,000 questions, compute the 95% interval of the paired difference by bootstrap.', 'Find the smallest size whose interval excludes zero most of the time.', 'Contamination check: count questions whose 8-word sequences appear in public training text.', 'Write a datasheet: sources, licences, who wrote and checked the questions.'],
  ['ሞዴል A 70% ትክክል፣ ሞዴል B 73%፤ ጥያቄዎች በችግርነት ይለያያሉ፣ ስለዚህ ስህተቶቻቸው ይዛመዳሉ።', 'ለ100–3,000 ጥያቄዎች የጥንድ ልዩነቱን 95% ክልል በbootstrap አስላ።', 'ክልሉ ብዙውን ጊዜ ዜሮን የማያካትትበትን ትንሹን መጠን ፈልግ።', 'የብክለት ፍተሻ፡ ባለ 8-ቃል ቅደም ተከተሎቻቸው በሕዝባዊ የሥልጠና ጽሑፍ ውስጥ የሚገኙ ጥያቄዎችን ቁጠር።', 'datasheet ጻፍ፡ ምንጮች፣ ፈቃዶች፣ ጥያቄዎቹን የጻፋቸውና የፈተሻቸው።']),
 '''
import numpy as np
rng = np.random.default_rng(5)
def simulate(n):
    difficulty = rng.normal(0, 1.2, n)
    pa = 1 / (1 + np.exp(-(1.0 - difficulty))); pb = 1 / (1 + np.exp(-(1.17 - difficulty)))
    u = rng.random(n); return u < pa, u < pb                 # same random draw: errors on hard questions overlap
sizes = [100, 300, 600, 1000, 2000, 3000]; width, separated = [], []
for n in sizes:
    w, s = [], 0
    for _ in range(100):
        a, b = simulate(n); d = b.astype(float) - a
        boots = [d[rng.integers(0, n, n)].mean() for _ in range(300)]; lo, hi = np.percentile(boots, [2.5, 97.5])
        w.append(hi - lo); s += lo > 0
    width.append(float(np.mean(w)) * 100); separated.append(s / 100)
    print(f"{n:5d} questions: interval width {width[-1]:.1f} points, B shown better in {separated[-1]:.0%} of benchmarks")
a, b = simulate(100000); print(f"true accuracies A {a.mean():.1%}, B {b.mean():.1%}")
need = next((n for n, s in zip(sizes, separated) if s >= 0.8), None)
contaminated = 37; print(f"contamination: {contaminated} of 1,000 questions found in web text -> report scores with and without them")
''',
 viz=lambda ns: [line(B('Benchmarks that show B is better (out of 100 simulated)', 'B የተሻለ መሆኑን የሚያሳዩ benchmarks (ከ100 የተመሰሉ)'), ns['sizes'], [(B('Share', 'ድርሻ'), [100 * x for x in ns['separated']], 1)], B('Number of questions', 'የጥያቄዎች ብዛት'), B('Percent of benchmarks', 'የbenchmarks መቶኛ'), refs=[{'kind': 'h', 'v': 80, 'label': B('80%', '80%')}], ymin=0, ymax=100),
                 line(B('Width of the 95% interval for the difference', 'ለልዩነቱ የ95% ክልል ስፋት'), ns['sizes'], [(B('Points', 'ነጥቦች'), ns['width'], 2)], B('Number of questions', 'የጥያቄዎች ብዛት'), B('Accuracy points', 'የaccuracy ነጥቦች'), ymin=0)],
 analysis=lambda ns: ([f"With 100 questions the interval is {ns['width'][0]:.0f} points wide: a 3-point difference is invisible.", f"About {ns['need']:,} questions are needed before most benchmarks show B is better." if ns['need'] else 'Even 3,000 questions are not enough.', 'Paired comparison on the same questions helps: both models fail the hard ones, which cancels out in the difference.'],
                      [f"በ100 ጥያቄዎች ክልሉ {ns['width'][0]:.0f} ነጥቦች ስፋት አለው፡ የ3-ነጥብ ልዩነት አይታይም።", f"አብዛኞቹ benchmarks B የተሻለ መሆኑን ከማሳየታቸው በፊት ወደ {ns['need']:,} ጥያቄዎች ያስፈልጋሉ።" if ns['need'] else '3,000 ጥያቄዎች እንኳን በቂ አይደሉም።', 'በተመሳሳይ ጥያቄዎች ላይ የጥንድ ንጽጽር ይረዳል፡ ሁለቱም ሞዴሎች ከባዶቹን ይወድቃሉ፣ ይህም በልዩነቱ ውስጥ ይሰረዛል።']),
 decision=lambda ns: (f"Build at least {ns['need']:,} questions, always report paired differences with intervals, keep a hidden test split, and report scores with and without the contaminated items.", f"ቢያንስ {ns['need']:,} ጥያቄዎችን ገንባ፣ የጥንድ ልዩነቶችን ሁልጊዜ ከክልሎች ጋር ዘግብ፣ የተደበቀ የፈተና ክፍል አቆይ፣ ውጤቶችን ከተበከሉት ንጥሎች ጋርና ያለነሱ ዘግብ።"), note=SIM))
C7.append(lab(('A 5-year research programme: budget, funding gap and outputs', 'የ5-ዓመት የምርምር ፕሮግራም፡ በጀት፣ የገንዘብ ክፍተትና ውጤቶች'),
 ('Build the budget for an African AI-for-agriculture centre, compare it with secured and likely funding, find the gap, and decide what to cut or raise.', 'ለአፍሪካ AI-ለግብርና ማዕከል በጀቱን ገንባ፣ ከተረጋገጠና ሊገኝ ከሚችል ገንዘብ ጋር አወዳድር፣ ክፍተቱን ፈልግ፣ ምን እንደሚቀነስ ወይም እንደሚሰበሰብ ወስን።'), W,
 [PY, PD, SHEET],
 (['List costs per year: staff, students, computing, field work, operations.', 'List funding: secured grants, likely grants (weighted by probability), spin-off income.', 'Compute the yearly and cumulative gap.', 'Count outputs: PhDs and MScs graduated, papers, tools released.', 'Decide where to cut, phase or raise funds.'],
  ['በዓመት ወጪዎችን ዘርዝር፡ ሠራተኞች፣ ተማሪዎች፣ ኮምፒውቲንግ፣ የመስክ ሥራ፣ ሥራ ማስኬጃ።', 'ገንዘብን ዘርዝር፡ የተረጋገጡ ድጎማዎች፣ ሊገኙ የሚችሉ ድጎማዎች (በፕሮባቢሊቲ የተመዘኑ)፣ የspin-off ገቢ።', 'የዓመቱንና የተጠራቀመውን ክፍተት አስላ።', 'ውጤቶችን ቁጠር፡ የተመረቁ PhDs እና MScs፣ ጽሑፎች፣ የተለቀቁ tools።', 'የት እንደሚቀነስ፣ በምዕራፍ እንደሚከፈል ወይም ገንዘብ እንደሚሰበሰብ ወስን።']),
 '''
import pandas as pd
years = [1, 2, 3, 4, 5]
cost = pd.DataFrame({"staff": [180, 220, 260, 280, 290], "students": [60, 110, 160, 180, 180],
                     "computing": [70, 60, 60, 70, 70], "field work": [40, 60, 70, 70, 60], "operations": [30, 35, 40, 40, 45]}, index=years)  # thousand USD
secured = pd.Series([350, 330, 200, 100, 0], index=years)
likely = pd.Series([0, 120, 250, 300, 320], index=years) * 0.5            # applications, 50% chance
spinoff = pd.Series([0, 0, 20, 60, 120], index=years)
total = cost.sum(axis=1); funded = secured + likely + spinoff; gap = total - funded
print(pd.DataFrame({"cost": total, "expected funding": funded, "gap": gap}).round(0).to_string())
print(f"5-year cost {total.sum():,.0f}k; expected funding {funded.sum():,.0f}k; gap {gap.sum():,.0f}k ({gap.sum() / total.sum():.0%})")
outputs = {"PhD graduates": 6, "MSc graduates": 20, "papers": 35, "open tools": 5}
worst = int(gap.idxmax())
''',
 viz=lambda ns: [line(B('Cost vs expected funding (thousand USD)', 'ወጪ vs የሚጠበቅ ገንዘብ (በሺህ USD)'), ns['years'], [(B('Cost', 'ወጪ'), list(ns['total']), 2), (B('Expected funding', 'የሚጠበቅ ገንዘብ'), list(ns['funded']), 1)], B('Year', 'ዓመት'), B('Thousand USD', 'ሺህ USD'), ymin=0),
                 seg(B('Where the 5-year budget goes (thousand USD)', 'የ5-ዓመቱ በጀት የት ይሄዳል (በሺህ USD)'), [(B(k, k), float(ns['cost'][k].sum()), i % 4) for i, k in enumerate(ns['cost'].columns)], 'k USD')],
 analysis=lambda ns: ([f"The programme costs {ns['total'].sum():,.0f}k USD over 5 years; expected funding covers {1 - ns['gap'].sum() / ns['total'].sum():.0%}.", f"The gap is largest in year {ns['worst']} ({ns['gap'][ns['worst']]:,.0f}k), when the first grants end and students peak.", 'Staff and students are over 60% of the cost: the programme is people, so funding gaps hit training first.'],
                      [f"ፕሮግራሙ በ5 ዓመታት {ns['total'].sum():,.0f}k USD ያስወጣል፤ የሚጠበቀው ገንዘብ {1 - ns['gap'].sum() / ns['total'].sum():.0%}ን ይሸፍናል።", f"ክፍተቱ በዓመት {ns['worst']} ትልቁ ነው ({ns['gap'][ns['worst']]:,.0f}k)፣ የመጀመሪያዎቹ ድጎማዎች ሲያልቁና ተማሪዎች ሲበዙ።", 'ሠራተኞችና ተማሪዎች ከወጪው ከ60% በላይ ናቸው፡ ፕሮግራሙ ሰዎች ነው፤ ስለዚህ የገንዘብ ክፍተቶች መጀመሪያ ሥልጠናን ይመታሉ።']),
 decision=lambda ns: (f"Submit two more grant applications before year 2, start the spin-off service in year 2 not 3, and phase the student intake so year {ns['worst']} has no gap above 15%.", f"ከዓመት 2 በፊት ሁለት ተጨማሪ የድጎማ ማመልከቻዎችን አስገባ፣ የspin-off አገልግሎቱን በዓመት 3 ሳይሆን በዓመት 2 ጀምር፣ ዓመት {ns['worst']} ከ15% በላይ ክፍተት እንዳይኖረው የተማሪ ቅበላውን በምዕራፍ አድርግ።"), note=('Illustrative figures; use your institution’s salary scales and real grant calls.', 'ለማሳያ ቁጥሮች፤ የተቋምህን የደመወዝ ስኬሎችና እውነተኛ የድጎማ ጥሪዎችን ተጠቀም።')))
emit_labs('c', 7, C7, 9)

# ============================ Level 8 Future ============================
C8 = []
C8.append(lab(('A one-month agent pilot: keep, change or stop?', 'የአንድ ወር የagent ሙከራ፡ ማቆየት፣ መቀየር ወይስ ማቆም?'),
 ('Analyse a month of logs from an agent that drafts weekly market reports: time saved, review time, error rate and severity, and decide whether to expand it.', 'ሳምንታዊ የገበያ ሪፖርቶችን የሚያረቅቅ agent የአንድ ወር መዝገቦችን ተንትን፡ የተቆጠበ ጊዜ፣ የግምገማ ጊዜ፣ የስህተት መጠንና ክብደት፤ ማስፋት እንዳለብህ ወስን።'), W,
 [PY, PD, SHEET],
 (['Log every task: date, minutes the task used to take, minutes spent reviewing, errors found and their severity.', 'Net time saved = old time − review time − fixing time.', 'Plot errors per day and cumulative hours saved.', 'Check whether errors fall as prompts and checks improve.', 'Decide with a rule set before the pilot: keep if net saving > 30% and no severe error in the last 2 weeks.'],
  ['እያንዳንዱን ተግባር መዝግብ፡ ቀን፣ ተግባሩ ቀድሞ ይወስድ የነበረው ደቂቃ፣ በግምገማ የወጣ ደቂቃ፣ የተገኙ ስህተቶችና ክብደታቸው።', 'የተጣራ የተቆጠበ ጊዜ = የድሮ ጊዜ − የግምገማ ጊዜ − የማስተካከያ ጊዜ።', 'በቀን ስህተቶችንና የተጠራቀሙ የተቆጠቡ ሰዓታትን ቻርት አድርግ።', 'prompts እና ፍተሻዎች ሲሻሻሉ ስህተቶች እየቀነሱ እንደሆነ ፈትሽ።', 'ከሙከራው በፊት በተቀመጠ ሕግ ወስን፡ የተጣራ ቁጠባ > 30% ከሆነና ባለፉት 2 ሳምንታት ከባድ ስህተት ከሌለ አቆይ።']),
 '''
import numpy as np, pandas as pd
rng = np.random.default_rng(3); days = np.arange(1, 21)                                    # 20 working days
log = pd.DataFrame({"day": days, "old_min": rng.normal(90, 10, 20).round(), "review_min": np.linspace(35, 18, 20).round() + rng.integers(-3, 4, 20),
                    "errors": rng.poisson(np.linspace(3, 0.8, 20)), "severe": [0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]})
log["fix_min"] = log.errors * 4 + log.severe * 20
log["saved_min"] = log.old_min - log.review_min - log.fix_min
net = log.saved_min.sum() / log.old_min.sum(); late_severe = int(log.severe[log.day > 10].sum())
first, last = log.errors[:5].mean(), log.errors[-5:].mean()
print(f"net time saved {log.saved_min.sum() / 60:.1f} h of {log.old_min.sum() / 60:.1f} h ({net:.0%}); errors per day {first:.1f} -> {last:.1f}; severe errors in last 2 weeks: {late_severe}")
''',
 viz=lambda ns: [line(B('Errors found per day', 'በቀን የተገኙ ስህተቶች'), list(ns['days']), [(B('Errors', 'ስህተቶች'), list(ns['log'].errors), 2)], B('Working day', 'የሥራ ቀን'), B('Errors', 'ስህተቶች'), ymin=0),
                 line(B('Cumulative hours saved (after review and fixes)', 'የተጠራቀሙ የተቆጠቡ ሰዓታት (ከግምገማና ማስተካከያ በኋላ)'), list(ns['days']), [(B('Hours', 'ሰዓታት'), list(ns['log'].saved_min.cumsum() / 60), 1)], B('Working day', 'የሥራ ቀን'), B('Hours', 'ሰዓታት'), ymin=0)],
 analysis=lambda ns: ([f"After review and fixes the agent saved {ns['net']:.0%} of the time the reports used to take.", f"Errors fell from {ns['first']:.1f} to {ns['last']:.1f} per day as checks were added.", f"Both severe errors happened in week 1; there were {ns['late_severe']} in the last two weeks."],
                      [f"ከግምገማና ማስተካከያ በኋላ agentኡ ሪፖርቶቹ ይወስዱት ከነበረው ጊዜ {ns['net']:.0%}ን አትርፏል።", f"ፍተሻዎች ሲጨመሩ ስህተቶች በቀን ከ{ns['first']:.1f} ወደ {ns['last']:.1f} ወርደዋል።", f"ሁለቱም ከባድ ስህተቶች በሳምንት 1 ተከስተዋል፤ ባለፉት ሁለት ሳምንታት {ns['late_severe']} ነበሩ።"]),
 decision=lambda ns: ('Keep the agent (both pre-set conditions are met) and expand it to one more report type; keep human review of every report that goes outside the team.', 'agentኡን አቆይ (ሁለቱም አስቀድመው የተቀመጡ ሁኔታዎች ተሟልተዋል)፣ ወደ አንድ ተጨማሪ የሪፖርት ዓይነትም አስፋው፤ ከቡድኑ ውጭ የሚሄድ እያንዳንዱን ሪፖርት የሰው ግምገማ አቆይ።') if ns['net'] > 0.3 and ns['late_severe'] == 0 else ('Do not expand yet: the pre-set conditions are not met. Improve checks and repeat the pilot.', 'ገና አታስፋ፡ አስቀድመው የተቀመጡት ሁኔታዎች አልተሟሉም። ፍተሻዎችን አሻሽልና ሙከራውን ድገም።'), note=SIM))
C8.append(lab(('Is an AI method worth adding to a breeding programme?', 'የAI ዘዴ ወደ እርባታ ፕሮግራም መጨመሩ ያዋጣል?'),
 ('Compare the genetic gain and its value from the current genomic model (accuracy 0.45) and an AI model (0.55, extra cost), including the risk that the gain does not appear.', 'ከአሁኑ genomic ሞዴል (accuracy 0.45) እና ከAI ሞዴል (0.55፣ ተጨማሪ ወጪ) የሚገኘውን የዘረመል ትርፍና ዋጋውን አወዳድር፣ ትርፉ ያለመታየት ስጋትንም ጨምሮ።'), W,
 [PY, NP, SHEET],
 (['Breeder’s equation: gain per year = i × accuracy × σA / L.', 'Values: top 10% selected (i = 1.75), σA = 400 kg milk, generation interval 5 years.', 'Value of 1 kg milk gain in all daughters across the herd per year.', 'Simulate uncertainty: the AI accuracy might be 0.47–0.60 on local cows.', 'Compare expected net value over 10 years and the chance it is negative.'],
  ['የአርቢው እኩልታ፡ በዓመት ትርፍ = i × accuracy × σA / L።', 'እሴቶች፡ ከፍተኛ 10% ተመርጠዋል (i = 1.75)፣ σA = 400 kg ወተት፣ የትውልድ ልዩነት 5 ዓመታት።', 'በመንጋው ውስጥ ባሉ ሁሉም ሴት ልጆች በዓመት የ1 kg የወተት ትርፍ ዋጋ።', 'እርግጠኛ አለመሆንን አስመስል፡ የAI accuracy በአካባቢያዊ ላሞች ላይ 0.47–0.60 ሊሆን ይችላል።', 'በ10 ዓመታት የሚጠበቀውን የተጣራ ዋጋና አሉታዊ የመሆን ዕድሉን አወዳድር።']),
 '''
import numpy as np
i, sigma_a, L, cows, birr_per_kg = 1.75, 400, 5, 20000, 25
gain = lambda acc: i * acc * sigma_a / L                                  # kg milk per cow per year
years = np.arange(1, 11)
def value(acc, extra_cost):
    cum = gain(acc) * years * cows * birr_per_kg * 0.5                     # half the herd are daughters of selected bulls
    return cum.sum() / 1e6 - extra_cost * len(years)                       # million birr over 10 years
base = value(0.45, 0)
rng = np.random.default_rng(0); acc_ai = rng.uniform(0.47, 0.60, 10000)
extra = gain(acc_ai)[:, None] * 0 + 0                                      # placeholder for clarity
net = np.array([value(a, 6.0) for a in acc_ai]) - base                     # AI costs 6 million birr per year more
print(f"gain per year: current {gain(0.45):.1f} kg, AI {gain(0.55):.1f} kg per cow")
print(f"extra value of AI over 10 years: mean {net.mean():.0f} M birr, 90% range {np.percentile(net, 5):.0f} to {np.percentile(net, 95):.0f}; chance it loses money {np.mean(net < 0):.0%}")
breakeven = 0.45 + 6.0 * 10 / (i * sigma_a / L * years.sum() * cows * birr_per_kg * 0.5 / 1e6)
print(f"break-even AI accuracy: {breakeven:.3f}")
hist, edges = np.histogram(net, bins=12)
''',
 viz=lambda ns: [line(B('Extra 10-year value of the AI model: distribution (million birr)', 'የAI ሞዴሉ ተጨማሪ የ10-ዓመት ዋጋ፡ ስርጭት (ሚሊዮን ብር)'), list((ns['edges'][:-1] + ns['edges'][1:]) / 2), [(B('Simulations', 'ማስመሰሎች'), list(ns['hist']), 1)], B('Million birr', 'ሚሊዮን ብር'), B('Number of simulations', 'የማስመሰሎች ብዛት'), xint=False, ymin=0, refs=[{'kind': 'v', 'v': 0, 'label': B('break-even', 'ሚዛን')}])],
 analysis=lambda ns: ([f"Raising accuracy from 0.45 to 0.55 raises the gain from {ns['gain'](0.45):.1f} to {ns['gain'](0.55):.1f} kg of milk per cow per year.", f"Over 10 years the AI model adds on average {ns['net'].mean():.0f} million birr after its extra cost; it loses money in {np.mean(ns['net'] < 0):.0%} of simulations.", f"It pays off only if local accuracy is above {ns['breakeven']:.3f}: that is the number to verify first."],
                      [f"accuracyን ከ0.45 ወደ 0.55 ማሳደግ ትርፉን በላም በዓመት ከ{ns['gain'](0.45):.1f} ወደ {ns['gain'](0.55):.1f} kg ወተት ያሳድጋል።", f"በ10 ዓመታት የAI ሞዴሉ ከተጨማሪ ወጪው በኋላ በአማካይ {ns['net'].mean():.0f} ሚሊዮን ብር ይጨምራል፤ በ{np.mean(ns['net'] < 0):.0%} ማስመሰሎች ገንዘብ ያከስራል።", f"የሚያዋጣው የአካባቢ accuracy ከ{ns['breakeven']:.3f} በላይ ከሆነ ብቻ ነው፡ መጀመሪያ መረጋገጥ ያለበት ቁጥር ይህ ነው።"]),
 decision=lambda ns: (f"Run a one-year validation on local cows; adopt the AI model only if its accuracy there exceeds {ns['breakeven']:.2f} with a confidence interval that clears it.", f"በአካባቢያዊ ላሞች ላይ የአንድ ዓመት ማረጋገጫ አካሂድ፤ የAI ሞዴሉን የምትቀበለው እዚያ ያለው accuracy ከ{ns['breakeven']:.2f} በላይ ሆኖ confidence intervalኡም ከሱ በላይ ሲሆን ብቻ ነው።"), note=SIM))
C8.append(lab(('Designing an AI advice service: channel, price and pilot', 'የAI ምክር አገልግሎትን መንደፍ፡ መንገድ፣ ዋጋና ሙከራ'),
 ('Compare voice calls, SMS and a smartphone app for crop advice to 5,000 farmers on reach, adoption and cost, find the break-even price, and plan the 3-month pilot.', 'ለ5,000 ገበሬዎች የሰብል ምክርን በድምፅ ጥሪዎች፣ በSMS እና በስማርትፎን መተግበሪያ በተደራሽነት፣ በተቀባይነትና በወጪ አወዳድር፤ የሚዛን ዋጋውን ፈልግ፣ የ3-ወር ሙከራውንም አቅድ።'), W,
 [PY, PD, SHEET, T('Interviews with 20 farmers', 'test the problem and the price before building', 'ከመገንባትህ በፊት ችግሩንና ዋጋውን መፈተሽ', 'a notebook and the local language')],
 (['For each channel estimate: share of farmers who can receive it, share who act on advice, fixed and per-farmer monthly cost.', 'Active users = farmers × reach × adoption.', 'Cost per active user and break-even monthly price.', 'Pick a channel and price; check them in farmer interviews.', 'Pilot: 300 farmers, 3 months, measure use, payment and yield change against a comparison group.'],
  ['ለእያንዳንዱ መንገድ ገምት፡ ሊቀበሉት የሚችሉ ገበሬዎች ድርሻ፣ በምክሩ የሚሠሩ ድርሻ፣ ቋሚና በገበሬ ወርሃዊ ወጪ።', 'ንቁ ተጠቃሚዎች = ገበሬዎች × ተደራሽነት × ተቀባይነት።', 'በንቁ ተጠቃሚ ወጪና የሚዛን ወርሃዊ ዋጋ።', 'መንገድና ዋጋ ምረጥ፤ በገበሬ ቃለ መጠይቆች ፈትሻቸው።', 'ሙከራ፡ 300 ገበሬዎች፣ 3 ወራት፣ አጠቃቀምን፣ ክፍያንና የምርት ለውጥን ከንጽጽር ቡድን አንፃር ለካ።']),
 '''
import pandas as pd
farmers = 5000
ch = pd.DataFrame({"reach": [0.95, 0.85, 0.25], "adoption": [0.45, 0.30, 0.50],
                   "fixed_birr": [40000, 15000, 120000], "per_user_birr": [6, 4, 4]}, index=["voice call", "SMS", "smartphone app"])   # monthly
ch["active_users"] = (farmers * ch.reach * ch.adoption).round()
ch["monthly_cost"] = ch.fixed_birr + ch.per_user_birr * farmers * ch.reach
ch["cost_per_active"] = (ch.monthly_cost / ch.active_users).round(1)
print(ch[["active_users", "monthly_cost", "cost_per_active"]].to_string())
best = ch.cost_per_active.idxmin(); most = ch.active_users.idxmax()
willing = 40                                                                    # birr per month, from interviews
viable = ch[ch.cost_per_active < willing]; pick = viable.active_users.idxmax()
print(f"lowest cost per active farmer: {best}; most active farmers: {most}; farmers said they would pay about {willing} birr/month -> pick {pick}")
''',
 viz=lambda ns: [hbar(B('Active farmers reached (of 5,000)', 'የደረሱ ንቁ ገበሬዎች (ከ5,000)'), list(ns['ch'].index), [(B('Farmers', 'ገበሬዎች'), list(ns['ch'].active_users), 1)], B('Farmers', 'ገበሬዎች'), fmt=0),
                 hbar(B('Monthly cost per active farmer (birr)', 'በንቁ ገበሬ ወርሃዊ ወጪ (ብር)'), list(ns['ch'].index), [(B('Birr', 'ብር'), list(ns['ch'].cost_per_active), 2)], B('Birr per month', 'ብር በወር'), fmt=1, note=B(f"Farmers said they would pay about {ns['willing']} birr a month.", f"ገበሬዎች በወር ወደ {ns['willing']} ብር እንደሚከፍሉ ተናግረዋል።"))],
 analysis=lambda ns: ([f"Voice reaches the most active farmers ({ns['ch'].active_users['voice call']:,.0f}) because almost everyone has a basic phone and listening is easier than reading.", f"SMS is cheapest per active farmer ({ns['ch'].cost_per_active['SMS']:.0f} birr) but fewer act on text.", f"The app costs {ns['ch'].cost_per_active['smartphone app']:.0f} birr per active farmer: too few smartphones yet."],
                      [f"ድምፅ ብዙ ንቁ ገበሬዎችን ይደርሳል ({ns['ch'].active_users['voice call']:,.0f})፣ ሁሉም ማለት ይቻላል መሠረታዊ ስልክ ስላለውና ማዳመጥ ከማንበብ ስለሚቀል።", f"SMS በንቁ ገበሬ በጣም ርካሹ ነው ({ns['ch'].cost_per_active['SMS']:.0f} ብር) ግን በጽሑፍ የሚሠሩ ጥቂት ናቸው።", f"መተግበሪያው በንቁ ገበሬ {ns['ch'].cost_per_active['smartphone app']:.0f} ብር ያስወጣል፡ ገና ስማርትፎኖች በጣም ጥቂት ናቸው።"]),
 decision=lambda ns: (f"Pilot {ns['pick']} advice at {ns['willing']} birr a month (cost {ns['ch'].cost_per_active[ns['pick']]:.0f} birr per active farmer) with 300 farmers for 3 months; continue only if at least 40% pay in month 3.", f"የ{ns['pick']} ምክርን በወር {ns['willing']} ብር (በንቁ ገበሬ {ns['ch'].cost_per_active[ns['pick']]:.0f} ብር ወጪ) ከ300 ገበሬዎች ጋር ለ3 ወራት ሞክር፤ በወር 3 ቢያንስ 40% ከከፈሉ ብቻ ቀጥል።"), note=('Illustrative assumptions; replace them with prices from your telecom operator and answers from your interviews.', 'ለማሳያ ግምቶች፤ ከቴሌኮም ኦፕሬተርህ በሚገኙ ዋጋዎችና ከቃለ መጠይቆችህ በሚገኙ መልሶች ተካቸው።')))
C8.append(lab(('A weeding robot: speed, accuracy and local cost', 'የአረም ማረሚያ ሮቦት፡ ፍጥነት፣ ትክክለኛነትና የአካባቢ ወጪ'),
 ('Simulate a camera robot that weeds a teff or maize row, find the speed that balances weeds removed against crops damaged, and compare its cost with hand weeding.', 'የጤፍ ወይም የበቆሎ ረድፍን የሚያርም የካሜራ ሮቦትን አስመስል፣ የተወገዱ አረሞችንና የተጎዱ ሰብሎችን የሚያመጣጥን ፍጥነትን ፈልግ፣ ወጪውን ከእጅ አረም ጋር አወዳድር።'), W,
 [PY, NP, T('Arduino or Raspberry Pi + camera', 'the robot’s brain and eyes', 'የሮቦቱ አንጎልና ዓይኖች', 'local electronics markets'), T('An open detection model (e.g. YOLO)', 'tell weeds from crops', 'አረሞችን ከሰብሎች መለየት', 'github.com/ultralytics')],
 (['Model detection: accuracy falls as speed rises (less time per frame).', 'Simulate 1,000 plants per speed (30% weeds): remove what is detected as weed.', 'Count weeds removed and crops damaged for speeds 0.1–0.8 m/s.', 'Bill of materials from local parts; hours per hectare.', 'Compare cost per hectare with hand weeding over 3 seasons.'],
  ['detectionን ሞዴል አድርግ፡ ፍጥነት ሲጨምር accuracy ይቀንሳል (በframe ያነሰ ጊዜ)።', 'በፍጥነት 1,000 ተክሎችን አስመስል (30% አረም)፡ እንደ አረም የተለየውን አስወግድ።', 'ለ0.1–0.8 m/s ፍጥነቶች የተወገዱ አረሞችንና የተጎዱ ሰብሎችን ቁጠር።', 'ከአካባቢ ክፍሎች የቁሳቁስ ዝርዝር፤ በሄክታር ሰዓታት።', 'በ3 ወቅቶች በሄክታር ወጪን ከእጅ አረም ጋር አወዳድር።']),
 '''
import numpy as np
rng = np.random.default_rng(4); speeds = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8]                 # metres per second
removed, damaged = [], []
for v in speeds:
    acc = 0.98 - 0.12 * v ** 2                                    # detection accuracy falls with speed
    weed = rng.random(1000) < 0.3; correct = rng.random(1000) < acc
    called_weed = np.where(correct, weed, ~weed)
    removed.append(np.mean(called_weed[weed])); damaged.append(np.mean(called_weed[~weed]))
    print(f"{v:.1f} m/s: weeds removed {removed[-1]:.0%}, crops damaged {damaged[-1]:.1%}")
ok = [v for v, d, r in zip(speeds, damaged, removed) if d <= 0.05 and r >= 0.85]; best = max(ok)
bom = {"Raspberry Pi + camera": 9000, "motors and driver": 6000, "battery + solar panel": 7000, "frame (local welding)": 4000, "weeding tool": 2000}
rows_m = 10000 / 0.4; hours_ha = rows_m / best / 3600 * 1.3                                   # 40 cm rows, 30% turning time
ha_season = int(500 / hours_ha)                                                                # 500 working hours a season
robot_ha = sum(bom.values()) / (3 * ha_season) + 150                                           # parts spread over 3 seasons + upkeep
hand_ha = 25 * 120                                                                             # 25 person-days at 120 birr
print(f"chosen speed {best} m/s; {hours_ha:.0f} h per hectare; robot {robot_ha:,.0f} birr/ha vs hand weeding {hand_ha:,} birr/ha; parts {sum(bom.values()):,} birr")
''',
 viz=lambda ns: [line(B('Weeding quality vs robot speed', 'የአረም ጥራት vs የሮቦት ፍጥነት'), ns['speeds'], [(B('Weeds removed', 'የተወገዱ አረሞች'), [100 * x for x in ns['removed']], 1), (B('Crops damaged', 'የተጎዱ ሰብሎች'), [100 * x for x in ns['damaged']], 2)], B('Speed (m/s)', 'ፍጥነት (m/s)'), B('Percent', 'መቶኛ'), xint=False, ymin=0, ymax=100, refs=[{'kind': 'v', 'v': ns['best'], 'label': B('chosen', 'የተመረጠ')}]),
                 seg(B('Robot parts (birr)', 'የሮቦት ክፍሎች (ብር)'), [(B(k, k), v, i % 4) for i, (k, v) in enumerate(ns['bom'].items())], B('birr', 'ብር'))],
 analysis=lambda ns: ([f"Up to {ns['best']} m/s the robot removes at least 85% of weeds and damages at most 5% of crop plants; faster than that, damage climbs quickly.", f"At {ns['best']} m/s one hectare takes about {ns['hours_ha']:.0f} hours, so with 500 working hours one robot can cover about {ns['ha_season']} ha a season.", f"Built from local parts for {sum(ns['bom'].values()):,} birr, it costs about {ns['robot_ha']:,.0f} birr per hectare against {ns['hand_ha']:,} for hand weeding."],
                      [f"እስከ {ns['best']} m/s ሮቦቱ ቢያንስ 85% አረሞችን ያስወግዳል፣ ቢበዛ 5% የሰብል ተክሎችን ይጎዳል፤ ከዚያ በፍጥነት ጉዳቱ በፍጥነት ይጨምራል።", f"በ{ns['best']} m/s አንድ ሄክታር ወደ {ns['hours_ha']:.0f} ሰዓታት ይወስዳል፤ ስለዚህ በ500 የሥራ ሰዓታት አንድ ሮቦት በወቅት ወደ {ns['ha_season']} ሄክታር ሊሸፍን ይችላል።", f"ከአካባቢ ክፍሎች በ{sum(ns['bom'].values()):,} ብር ተገንብቶ በሄክታር ወደ {ns['robot_ha']:,.0f} ብር ያስወጣል፤ የእጅ አረም {ns['hand_ha']:,} ብር ነው።"]),
 decision=lambda ns: (f"Build one prototype, run it at {ns['best']} m/s, and measure real detection on local weeds; offer it as a shared service for a cooperative rather than selling to single farmers.", f"አንድ prototype ገንባ፣ በ{ns['best']} m/s አስኪደው፣ በአካባቢ አረሞች ላይ እውነተኛ detectionን ለካ፤ ለነጠላ ገበሬዎች ከመሸጥ ይልቅ ለማኅበር እንደ የጋራ አገልግሎት አቅርበው።"), note=SIM))
C8.append(lab(('Quantum search on a simulator, and the energy cost of AI', 'በአስመሳይ ላይ የኳንተም ፍለጋና የAI የኃይል ወጪ'),
 ('Simulate Grover’s search on 3 qubits with NumPy to see quantum speed-up on a tiny problem, then estimate the energy of running an AI model on a laptop versus a phone.', 'በትንሽ ችግር ላይ የኳንተም ፍጥነትን ለማየት Grover ፍለጋን በ3 qubits በNumPy አስመስል፤ ከዚያ የAI ሞዴልን በላፕቶፕና በስልክ ላይ የማስኬድ ኃይልን ገምት።'), W,
 [PY, NP, T('Qiskit or Cirq (next step)', 'real quantum circuits and free cloud simulators', 'እውነተኛ የኳንተም circuits እና ነጻ የcloud አስመሳዮች', 'pip install qiskit')],
 (['Represent 3 qubits as a vector of 8 amplitudes; start in an equal superposition.', 'Oracle: flip the sign of the marked item (here item 5).', 'Diffusion: reflect all amplitudes about their mean.', 'Record the chance of measuring item 5 after 0–5 rounds.', 'Energy: time a model on your laptop, multiply by the power draw; compare with a phone’s.'],
  ['3 qubitsን እንደ 8 amplitudes vector ወክል፤ በእኩል superposition ጀምር።', 'Oracle፡ የተመረጠውን ንጥል ምልክት ገልብጥ (እዚህ ንጥል 5)።', 'Diffusion፡ ሁሉንም amplitudes በአማካያቸው ዙሪያ አንጸባርቅ።', 'ከ0–5 ዙሮች በኋላ ንጥል 5ን የመለካት ዕድሉን መዝግብ።', 'ኃይል፡ ሞዴልን በላፕቶፕህ ላይ ጊዜ ለካ፣ በኃይል ፍጆታው አባዛ፤ ከስልክ ጋር አወዳድር።']),
 '''
import numpy as np, time
N, marked = 8, 5
state = np.ones(N) / np.sqrt(N); probs = [state[marked] ** 2]
for _ in range(5):
    state[marked] *= -1                         # oracle
    state = 2 * state.mean() - state            # diffusion
    probs.append(state[marked] ** 2)
print("chance of finding item 5 after k rounds:", [round(float(p), 3) for p in probs])
best_k = int(np.argmax(probs)); print(f"best after {best_k} rounds (theory: about pi/4 x sqrt(8) = {np.pi / 4 * np.sqrt(8):.1f}); classical search needs 4 looks on average")
W = np.random.default_rng(0).normal(size=(512, 512)).astype(np.float32); x = np.ones((64, 512), np.float32)
t = time.perf_counter()
for _ in range(200): x = np.tanh(x @ W / 22.6)
sec = (time.perf_counter() - t) / 200
laptop_j = sec * 30; phone_j = sec * 4 * 4                    # laptop ~30 W; phone ~4 W but about 4x slower
print(f"one inference: {sec * 1000:.2f} ms; energy laptop {laptop_j * 1000:.1f} mJ, phone {phone_j * 1000:.1f} mJ")
''',
 viz=lambda ns: [line(B('Grover search: chance of finding the marked item', 'Grover ፍለጋ፡ የተመረጠውን ንጥል የማግኘት ዕድል'), list(range(len(ns['probs']))), [(B('Probability', 'ፕሮባቢሊቲ'), [float(p) for p in ns['probs']], 1)], B('Rounds', 'ዙሮች'), B('Probability', 'ፕሮባቢሊቲ'), ymin=0, ymax=1, refs=[{'kind': 'h', 'v': 0.125, 'label': B('random guess', 'የዘፈቀደ ግምት')}])],
 analysis=lambda ns: ([f"After {ns['best_k']} rounds the marked item is found with probability {ns['probs'][ns['best_k']]:.2f}, against 1/8 for a random guess.", 'More rounds overshoot and the chance falls again: quantum algorithms need the exact number of steps.', f"On this computer one inference used about {ns['laptop_j'] * 1000:.1f} mJ on a laptop vs {ns['phone_j'] * 1000:.1f} mJ estimated on a phone: small models on phones save energy and work offline."],
                      [f"ከ{ns['best_k']} ዙሮች በኋላ የተመረጠው ንጥል በ{ns['probs'][ns['best_k']]:.2f} ፕሮባቢሊቲ ይገኛል፤ የዘፈቀደ ግምት 1/8 ነው።", 'ተጨማሪ ዙሮች ያልፋሉ፣ ዕድሉም እንደገና ይወርዳል፡ የኳንተም algorithms ትክክለኛውን የእርምጃ ብዛት ይፈልጋሉ።', f"በዚህ ኮምፒውተር ላይ አንድ inference በላፕቶፕ ወደ {ns['laptop_j'] * 1000:.1f} mJ ተጠቅሟል፣ በስልክ {ns['phone_j'] * 1000:.1f} mJ ይገመታል፡ በስልኮች ላይ ያሉ ትናንሽ ሞዴሎች ኃይል ይቆጥባሉ፣ ያለ ኢንተርኔትም ይሠራሉ።"]),
 decision=lambda ns: ('Follow quantum computing with free simulators and courses, but invest today in efficient small models on phones: that is where the energy and access gains are for African users now.', 'የኳንተም ኮምፒውቲንግን በነጻ አስመሳዮችና ኮርሶች ተከታተል፤ ዛሬ ግን በስልኮች ላይ ባሉ ቀልጣፋ ትናንሽ ሞዴሎች ላይ ኢንቨስት አድርግ፡ ለአፍሪካ ተጠቃሚዎች አሁን የኃይልና የተደራሽነት ትርፍ ያለው እዚያ ነው።'),
 note=('Power figures are typical values (laptop 30 W, phone 4 W at about 4× slower); measure your own devices with a USB power meter.', 'የኃይል ቁጥሮቹ የተለመዱ እሴቶች ናቸው (ላፕቶፕ 30 W፣ ስልክ 4 W በ4× ገደማ ቀርፋፋ)፤ የራስህን መሣሪያዎች በUSB የኃይል መለኪያ ለካ።')))
C8.append(lab(('Evidence for a policy brief on local-language data', 'ስለ አካባቢያዊ-ቋንቋ ዳታ ለፖሊሲ ማጠቃለያ ማስረጃ'),
 ('Analyse a stakeholder survey on who should own and license Amharic language data, with confidence intervals by group, and choose the option to recommend.', 'የአማርኛ ቋንቋ ዳታን ማን ሊይዘውና ፈቃድ ሊሰጠው እንደሚገባ በባለድርሻ አካላት ዳሰሳ ላይ በቡድን ከconfidence intervals ጋር ተንትን፤ የምትመክረውን አማራጭ ምረጥ።'), W,
 [PY, PD, SP, T('Survey tool (KoboToolbox)', 'collect answers offline on phones', 'በስልኮች ላይ ያለ ኢንተርኔት መልሶችን መሰብሰብ', 'kobotoolbox.org (free)')],
 (['Define three options: open licence, community trust with paid commercial licences, government ownership.', 'Survey four groups: researchers, start-ups, community members, officials.', 'Compute support for each option per group with 95% intervals.', 'Identify options with majority support in every group.', 'Write three recommendations with costs and risks.'],
  ['ሦስት አማራጮችን ግለጽ፡ ክፍት ፈቃድ፣ የሚከፈልባቸው የንግድ ፈቃዶች ያሉት የማኅበረሰብ ትረስት፣ የመንግሥት ባለቤትነት።', 'አራት ቡድኖችን ዳስስ፡ ተመራማሪዎች፣ start-ups፣ የማኅበረሰብ አባላት፣ ባለሥልጣናት።', 'ለእያንዳንዱ ቡድን የእያንዳንዱን አማራጭ ድጋፍ ከ95% ክልሎች ጋር አስላ።', 'በእያንዳንዱ ቡድን የአብላጫ ድጋፍ ያላቸውን አማራጮች ለይ።', 'ሦስት ምክሮችን ከወጪዎችና ስጋቶች ጋር ጻፍ።']),
 '''
import numpy as np, pandas as pd
groups = {"researchers": 80, "start-ups": 45, "community": 150, "officials": 40}
support = pd.DataFrame({"open licence": [0.81, 0.73, 0.38, 0.35], "community trust": [0.66, 0.58, 0.79, 0.62], "government ownership": [0.21, 0.16, 0.44, 0.78]}, index=list(groups))
n = pd.Series(groups)
half = 1.96 * np.sqrt(support * (1 - support)).div(np.sqrt(n), axis=0)
print((support * 100).round(0).astype(int).to_string())
lowest = (support - half).min()
for opt in support: print(f"{opt:20s} lowest group support {support[opt].min():.0%}; lower 95% limit {lowest[opt]:.0%}")
broad = [o for o in support if (support[o] - half[o] > 0.5).all()]
print("options with majority support in every group (lower limit above 50%):", broad)
''',
 viz=lambda ns: [hbar(B('Support for each option by group (%)', 'የእያንዳንዱ አማራጭ ድጋፍ በቡድን (%)'), list(ns['support'].index), [(B(c, c), list(100 * ns['support'][c]), i + 1) for i, c in enumerate(ns['support'].columns)], B('Percent in favour', 'የሚደግፉ መቶኛ'), fmt=0),
                 dots(B('Community trust: support with 95% intervals', 'የማኅበረሰብ ትረስት፡ ድጋፍ ከ95% ክልሎች ጋር'), list(ns['support'].index), list(100 * ns['support']['community trust']), list(100 * (ns['support']['community trust'] - ns['half']['community trust'])), list(100 * (ns['support']['community trust'] + ns['half']['community trust'])), B('Percent in favour', 'የሚደግፉ መቶኛ'), ref0=False)],
 analysis=lambda ns: (['Open licensing is popular with researchers and start-ups but not with communities (38%) or officials (35%).', 'Government ownership is favoured only by officials (78%).', f"Only the community trust has majority support in every group (lowest {ns['support']['community trust'].min():.0%})" + (f", and it stays above 50% even at the lower 95% limits." if 'community trust' in ns['broad'] else ", although with these small groups its lower 95% limit falls below 50% for some: a larger survey should confirm it.")],
                      ['ክፍት ፈቃድ በተመራማሪዎችና በstart-ups ዘንድ ተወዳጅ ነው፣ በማኅበረሰቦች (38%) ወይም በባለሥልጣናት (35%) ዘንድ ግን አይደለም።', 'የመንግሥት ባለቤትነትን የሚመርጡት ባለሥልጣናት ብቻ ናቸው (78%)።', f"በእያንዳንዱ ቡድን የአብላጫ ድጋፍ ያለው የማኅበረሰብ ትረስት ብቻ ነው (ዝቅተኛው {ns['support']['community trust'].min():.0%})" + ("፣ በዝቅተኛዎቹ 95% ገደቦችም ከ50% በላይ ይቆያል።" if 'community trust' in ns['broad'] else "፤ በእነዚህ ትናንሽ ቡድኖች ግን ለአንዳንዶቹ ዝቅተኛው 95% ገደቡ ከ50% በታች ይወርዳል፡ ትልቅ ዳሰሳ ሊያረጋግጠው ይገባል።")]),
 decision=lambda ns: ('Recommend a community data trust: free use for research and education, paid licences for commercial use with revenue shared with contributing communities; pilot it with one language corpus for two years.', 'የማኅበረሰብ የዳታ ትረስትን ምከር፡ ለምርምርና ለትምህርት ነጻ አጠቃቀም፣ ለንግድ አጠቃቀም ከአስተዋጽዖ አበርካች ማኅበረሰቦች ጋር ገቢ የሚጋራ የሚከፈልበት ፈቃድ፤ በአንድ የቋንቋ corpus ለሁለት ዓመታት ሞክረው።'), note=('Illustrative survey results; a real brief needs a sampling plan and consent from participants.', 'ለማሳያ የዳሰሳ ውጤቶች፤ እውነተኛ ማጠቃለያ የናሙና ዕቅድና የተሳታፊዎች ፈቃድ ያስፈልገዋል።')))
C8.append(lab(('Your AI-use log: time saved and skills at risk', 'የAI-አጠቃቀም መዝገብህ፡ የተቆጠበ ጊዜና ስጋት ላይ ያሉ ክህሎቶች'),
 ('Analyse four weeks of your own log of AI use at work: time saved, mistakes the AI made that you caught, and tasks you no longer practise, and write your personal rules.', 'በሥራ ላይ የAI አጠቃቀምህን የአራት ሳምንታት የራስህ መዝገብ ተንትን፡ የተቆጠበ ጊዜ፣ ያገኘሃቸው AI የሠራቸው ስህተቶች እና ከአሁን በኋላ የማትለማመዳቸው ተግባራት፤ የግል ሕጎችህንም ጻፍ።'), W,
 [PY, PD, SHEET],
 (['For each AI-assisted task log: type, minutes saved, AI mistakes you caught, and "did I do the core thinking myself?" (yes/no).', 'Summarise by task type.', 'Plot weekly time saved and mistakes caught.', 'Flag task types with many mistakes or no self-practice.', 'Write 3–5 personal rules.'],
  ['በAI ለታገዘ ለእያንዳንዱ ተግባር መዝግብ፡ ዓይነት፣ የተቆጠቡ ደቂቃዎች፣ ያገኘሃቸው የAI ስህተቶች እና «ዋናውን አስተሳሰብ ራሴ ሠራሁ?» (አዎ/አይደለም)።', 'በተግባር ዓይነት አጠቃልል።', 'ሳምንታዊ የተቆጠበ ጊዜንና የተገኙ ስህተቶችን ቻርት አድርግ።', 'ብዙ ስህተቶች ወይም የራስ ልምምድ የሌላቸውን የተግባር ዓይነቶች ምልክት አድርግ።', '3–5 የግል ሕጎችን ጻፍ።']),
 '''
import pandas as pd
log = pd.DataFrame([
    ("email drafts", 22, 10, 1, 18), ("code", 14, 40, 9, 5), ("literature search", 8, 25, 6, 6),
    ("data analysis", 10, 30, 7, 2), ("translation to Amharic", 9, 15, 8, 7)],
    columns=["task", "times", "min_saved_each", "mistakes_caught", "did_core_thinking"])
log["hours_saved"] = (log.times * log.min_saved_each / 60).round(1)
log["mistakes_per_10"] = (log.mistakes_caught / log.times * 10).round(1)
log["self_practice"] = (log.did_core_thinking / log.times).round(2)
print(log[["task", "hours_saved", "mistakes_per_10", "self_practice"]].to_string(index=False))
weekly_hours = [4.2, 5.1, 5.6, 6.0]; weekly_mistakes = [9, 9, 6, 7]
risky = log[(log.mistakes_per_10 >= 5) | (log.self_practice < 0.3)].task.tolist()
print(f"total {log.hours_saved.sum():.1f} hours saved in 4 weeks; watch: {risky}")
''',
 viz=lambda ns: [hbar(B('By task type', 'በተግባር ዓይነት'), list(ns['log'].task), [(B('Hours saved', 'የተቆጠቡ ሰዓታት'), list(ns['log'].hours_saved), 1), (B('AI mistakes per 10 uses', 'በ10 አጠቃቀሞች የAI ስህተቶች'), list(ns['log'].mistakes_per_10), 2)], B('Hours / mistakes', 'ሰዓታት / ስህተቶች'), fmt=1),
                 hbar(B('Share of tasks where I did the core thinking', 'ዋናውን አስተሳሰብ ራሴ የሠራሁባቸው ተግባራት ድርሻ'), list(ns['log'].task), [(B('Share', 'ድርሻ'), list(ns['log'].self_practice), 1)], B('Share (0–1)', 'ድርሻ (0–1)'), fmt=2)],
 analysis=lambda ns: ([f"AI saved {ns['log'].hours_saved.sum():.0f} hours in 4 weeks, most in code and data analysis.", 'Those same tasks had the most AI mistakes (6–9 per 10 uses): the saving is real only because the mistakes were caught.', f"For data analysis the core thinking was mine only {ns['log'].self_practice[ns['log'].task == 'data analysis'].iloc[0]:.0%} of the time: a skill I may lose."],
                      [f"AI በ4 ሳምንታት {ns['log'].hours_saved.sum():.0f} ሰዓታትን አትርፏል፣ በብዛት በኮድና በዳታ ትንተና።", 'እነዚያው ተግባራት ብዙ የAI ስህተቶች ነበሯቸው (በ10 አጠቃቀሞች 6–9)፡ ቁጠባው እውነተኛ የሆነው ስህተቶቹ ስለተገኙ ብቻ ነው።', f"ለዳታ ትንተና ዋናው አስተሳሰብ የእኔ የነበረው {ns['log'].self_practice[ns['log'].task == 'data analysis'].iloc[0]:.0%} ጊዜ ብቻ ነው፡ ላጣው የምችለው ክህሎት።"]),
 decision=lambda ns: ('My rules: (1) plan the analysis myself before asking AI; (2) run and test all AI code; (3) check every citation in the original; (4) have Amharic translations read by a native speaker; (5) one analysis a week without AI.', 'ሕጎቼ፡ (1) AIን ከመጠየቄ በፊት ትንተናውን ራሴ አቅዳለሁ፤ (2) ሁሉንም የAI ኮድ አስኪጄ እፈትሻለሁ፤ (3) እያንዳንዱን ጥቅስ በመጀመሪያው ምንጭ እፈትሻለሁ፤ (4) የአማርኛ ትርጉሞችን የቋንቋው ተናጋሪ እንዲያነባቸው አደርጋለሁ፤ (5) በሳምንት አንድ ትንተና ያለ AI።'), note=('Example log; keep your own in a spreadsheet for a month and run the same code.', 'የምሳሌ መዝገብ፤ የራስህን ለአንድ ወር በspreadsheet አቆይና ያንኑ ኮድ አስኪድ።')))
C8.append(lab(('90-day launch: unit economics of an AI service', 'የ90-ቀን ጅምር፡ የAI አገልግሎት unit economics'),
 ('Analyse the first 90 days of a paid AI crop-advice service: sign-ups, churn, revenue, customer acquisition cost and lifetime value, and decide how much profit to reinvest and where.', 'የሚከፈልበት የAI የሰብል-ምክር አገልግሎት የመጀመሪያዎቹን 90 ቀናት ተንትን፡ ምዝገባዎች፣ churn፣ ገቢ፣ የደንበኛ ማግኛ ወጪና የዕድሜ ዘመን ዋጋ፤ ምን ያህል ትርፍ እንደገና ኢንቨስት እንደሚደረግና የት እንደሆነ ወስን።'), W,
 [PY, PD, SHEET, T('Mobile money (telebirr, M-Pesa)', 'collect small monthly payments', 'ትናንሽ ወርሃዊ ክፍያዎችን መሰብሰብ', 'operator merchant account')],
 (['Record per month: new paying users, cancellations, revenue, marketing spend, running costs.', 'Churn = cancellations ÷ users at the start of the month.', 'Customer acquisition cost (CAC) = marketing ÷ new users; lifetime value (LTV) = monthly margin ÷ churn.', 'Track LTV/CAC; above 3 is healthy.', 'Publish the numbers in your public log and decide the reinvestment.'],
  ['በወር መዝግብ፡ አዲስ ከፋይ ተጠቃሚዎች፣ ስረዛዎች፣ ገቢ፣ የማርኬቲንግ ወጪ፣ የሥራ ማስኬጃ ወጪዎች።', 'Churn = ስረዛዎች ÷ በወሩ መጀመሪያ ያሉ ተጠቃሚዎች።', 'የደንበኛ ማግኛ ወጪ (CAC) = ማርኬቲንግ ÷ አዲስ ተጠቃሚዎች፤ የዕድሜ ዘመን ዋጋ (LTV) = ወርሃዊ ትርፍ ህዳግ ÷ churn።', 'LTV/CACን ተከታተል፤ ከ3 በላይ ጤናማ ነው።', 'ቁጥሮቹን በሕዝባዊ መዝገብህ አትምና የእንደገና ኢንቨስትመንቱን ወስን።']),
 '''
import pandas as pd
m = pd.DataFrame({"new_users": [120, 210, 340], "cancelled": [0, 18, 31], "marketing": [9000, 12000, 15000]}, index=[1, 2, 3])
price, cost_per_user, fixed = 30, 9, 4000                                       # birr per month
users, start = [], 0
for mo in m.index:
    start_users = start; start = start + m.new_users[mo] - m.cancelled[mo]; users.append(start)
m["users_end"] = users; m["users_start"] = [0] + users[:-1]
m["revenue"] = m.users_end * price; m["profit"] = m.revenue - m.users_end * cost_per_user - fixed - m.marketing
m["churn"] = (m.cancelled / m.users_start.replace(0, float("nan"))).round(3)
m["CAC"] = (m.marketing / m.new_users).round(1)
churn = m.churn.iloc[-1]; ltv = (price - cost_per_user) / churn; cac = m.CAC.iloc[-1]
print(m[["users_end", "revenue", "profit", "churn", "CAC"]].to_string())
print(f"month 3: LTV {ltv:.0f} birr, CAC {cac:.0f} birr, LTV/CAC {ltv / cac:.1f}")
''',
 viz=lambda ns: [line(B('Paying users and monthly profit', 'ከፋይ ተጠቃሚዎችና ወርሃዊ ትርፍ'), list(ns['m'].index), [(B('Paying users', 'ከፋይ ተጠቃሚዎች'), list(ns['m'].users_end), 1), (B('Profit (tens of birr)', 'ትርፍ (በአሥር ብር)'), list(ns['m'].profit / 10), 2)], B('Month', 'ወር'), B('Users / tens of birr', 'ተጠቃሚዎች / አሥሮች ብር'), refs=[{'kind': 'h', 'v': 0, 'label': ''}]),
                 hbar(B('Month 3 unit economics (birr per user)', 'የወር 3 unit economics (በተጠቃሚ ብር)'), [B('Lifetime value (LTV)', 'የዕድሜ ዘመን ዋጋ (LTV)'), B('Acquisition cost (CAC)', 'የማግኛ ወጪ (CAC)')], [(B('Birr', 'ብር'), [ns['ltv'], ns['cac']], 1)], B('Birr', 'ብር'), fmt=0)],
 analysis=lambda ns: ([f"Paying users grew to {ns['m'].users_end.iloc[-1]} by day 90; monthly profit turned {'positive' if ns['m'].profit.iloc[-1] > 0 else 'less negative'} ({ns['m'].profit.iloc[-1]:,.0f} birr in month 3).", f"Monthly churn is {ns['churn']:.1%}, so an average user stays about {1 / ns['churn']:.0f} months and is worth {ns['ltv']:.0f} birr.", f"Each new user costs {ns['cac']:.0f} birr to acquire: LTV/CAC = {ns['ltv'] / ns['cac']:.1f}."],
                      [f"ከፋይ ተጠቃሚዎች በቀን 90 ወደ {ns['m'].users_end.iloc[-1]} አድገዋል፤ ወርሃዊ ትርፍ {'አዎንታዊ' if ns['m'].profit.iloc[-1] > 0 else 'ያነሰ አሉታዊ'} ሆኗል (በወር 3 {ns['m'].profit.iloc[-1]:,.0f} ብር)።", f"ወርሃዊ churn {ns['churn']:.1%} ነው፤ ስለዚህ አማካይ ተጠቃሚ ወደ {1 / ns['churn']:.0f} ወራት ይቆያል፣ ዋጋውም {ns['ltv']:.0f} ብር ነው።", f"እያንዳንዱን አዲስ ተጠቃሚ ለማግኘት {ns['cac']:.0f} ብር ያስወጣል፡ LTV/CAC = {ns['ltv'] / ns['cac']:.1f}።"]),
 decision=lambda ns: (('Healthy unit economics: reinvest 50% of profit in marketing through cooperatives and 20% in better advice quality; keep publishing the monthly numbers.', 'ጤናማ unit economics፡ 50% ትርፍን በማኅበራት በኩል በማርኬቲንግ፣ 20%ን በተሻለ የምክር ጥራት እንደገና ኢንቨስት አድርግ፤ ወርሃዊ ቁጥሮቹን ማተም ቀጥል።') if ns['ltv'] / ns['cac'] >= 3 else ('LTV/CAC is below 3: do not spend more on marketing yet. Reinvest in reducing churn (better, more timely advice) and cheaper channels such as cooperative referrals.', 'LTV/CAC ከ3 በታች ነው፡ ገና በማርኬቲንግ ላይ ተጨማሪ አታውጣ። churnን በመቀነስ (የተሻለና ወቅታዊ ምክር) እና እንደ የማኅበር ሪፈራሎች ባሉ ርካሽ መንገዶች ላይ እንደገና ኢንቨስት አድርግ።')), note=SIM))
emit_labs('c', 8, C8, 8)
print('labs c6-c8 written')
