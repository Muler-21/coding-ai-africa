from lib import *
from scipy import stats
rng = np.random.default_rng(404)

# ================= data =================
# CRD: chickpea shoot dry weight, 4 treatments x 5 pots
crd_means = {'Control': 4.1, 'Rhizobium': 5.0, 'Rhizobium + P': 5.9, 'Compost': 5.2}
rows = [];
for trt, m in crd_means.items():
    for r in range(5): rows.append({'pot': len(rows) + 1, 'treatment': trt, 'shoot_dw_g': round(float(rng.normal(m, 0.45)), 2)})
crd = pd.DataFrame(rows).sample(frac=1, random_state=1).reset_index(drop=True); crd['pot'] = range(1, 21)
save_csv(crd, 's4_crd_chickpea.csv')

# RCBD: 6 teff entries x 4 blocks
vm = {'V1': 2.15, 'V2': 2.45, 'V3': 1.95, 'V4': 2.30, 'V5': 2.60, 'Local': 1.70}
bm = [0.25, 0.05, -0.10, -0.20]
rows = [{'block': b + 1, 'variety': v, 'yield_t_ha': round(float(m + bm[b] + rng.normal(0, 0.13)), 2)} for b in range(4) for v, m in vm.items()]
save_csv(pd.DataFrame(rows), 's4_rcbd_teff.csv')

# Factorial N x P in RCBD, 3 blocks
rows = []
for b in range(3):
    for N in (0, 46, 92):
        for P in (0, 20, 40):
            mu = 1.8 + 0.020 * N + 0.012 * P + 0.00045 * N * P + [0.15, 0, -0.15][b]
            rows.append({'block': b + 1, 'N_kg_ha': N, 'P_kg_ha': P, 'yield_t_ha': round(float(mu + rng.normal(0, 0.18)), 2)})
save_csv(pd.DataFrame(rows), 's4_factorial_wheat.csv')

# Split-plot: irrigation (main) x potato variety (sub), 3 blocks
im = {'Rainfed': 0.0, 'Supplementary': 6.0}; pv = {'Gudene': 22, 'Belete': 26, 'Jalene': 24, 'Local': 17}
rows = []
for b in range(3):
    main_err = {i: rng.normal(0, 1.2) for i in im}
    for i, ie in im.items():
        for v, vmn in pv.items():
            bonus = 3.0 if (i == 'Supplementary' and v == 'Belete') else 0.0
            rows.append({'block': b + 1, 'irrigation': i, 'variety': v, 'tuber_t_ha': round(float(vmn + ie + bonus + [1, 0, -1][b] + main_err[i] + rng.normal(0, 1.0)), 1)})
save_csv(pd.DataFrame(rows), 's4_splitplot_potato.csv')

# Kruskal: late blight scores 1-9
probs = {'Untreated': [0, 0, 0, 0, 0.05, .15, .30, .30, .20], 'Program A': [0, 0, .1, .25, .35, .2, .1, 0, 0],
         'Program B': [0, .15, .35, .3, .15, .05, 0, 0, 0], 'Program C': [0, 0, .05, .2, .35, .25, .15, 0, 0]}
rows = [{'plot': 0, 'fungicide': f, 'blight_score_1to9': int(rng.choice(range(1, 10), p=p))} for f, p in probs.items() for _ in range(8)]
kw = pd.DataFrame(rows).sample(frac=1, random_state=2).reset_index(drop=True); kw['plot'] = range(1, 33)
save_csv(kw, 's4_kruskal_blight.csv')

# ================= examples =================
ex1 = example('s4-crd',
 {'en': 'Which biofertilizer treatment gives the heaviest chickpea shoots?', 'am': 'የትኛው የባዮማዳበሪያ ሕክምና ከባዱን የሽምብራ ቅርንጫፍ ይሰጣል?'},
 {'en': '20 pots of the same soil in a screen house; 4 treatments, 5 pots each, allocated completely at random. Shoot dry weight per plant at flowering.', 'am': 'በስክሪን ቤት ውስጥ አንድ ዓይነት አፈር ያላቸው 20 ማሰሮዎች፤ 4 ሕክምናዎች፣ እያንዳንዳቸው 5 ማሰሮ፣ ሙሉ በሙሉ በዘፈቀደ የተደለደሉ። በአበባ ጊዜ የአንድ ተክል ደረቅ ቅርንጫፍ ክብደት።'},
 {'en': 'Completely randomised design (CRD) → one-way ANOVA, assumption checks, Tukey HSD', 'am': 'Completely randomised design (CRD) → one-way ANOVA፣ የግምት ፍተሻዎች፣ Tukey HSD'},
 's4_crd_chickpea.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s4_crd_chickpea.csv")
groups = {k: g.shoot_dw_g.values for k, g in d.groupby("treatment")}
F, p = stats.f_oneway(*groups.values())
k, n = len(groups), len(d)
mse = sum(((v - v.mean())**2).sum() for v in groups.values()) / (n - k)
print(f"ANOVA: F({k-1},{n-k}) = {F:.2f}, p = {p:.2e}")
print(f"CV = {100*np.sqrt(mse)/d.shoot_dw_g.mean():.1f}%")
resid = np.concatenate([v - v.mean() for v in groups.values()])
print(f"Shapiro-Wilk on residuals p = {stats.shapiro(resid).pvalue:.2f}; Levene p = {stats.levene(*groups.values()).pvalue:.2f}")
print("Means (g/plant):", {k: round(float(v.mean()), 2) for k, v in sorted(groups.items(), key=lambda x: -x[1].mean())})
res = stats.tukey_hsd(*groups.values())
names = list(groups)
print("Tukey HSD pairs with p < 0.05:")
for i in range(k):
    for j in range(i + 1, k):
        if res.pvalue[i, j] < 0.05:
            print(f"  {names[i]} vs {names[j]}: diff {groups[names[i]].mean()-groups[names[j]].mean():+.2f}, p = {res.pvalue[i, j]:.4f}")
''',
 '''
library(agricolae)
d <- read.csv("s4_crd_chickpea.csv")
m <- aov(shoot_dw_g ~ treatment, data = d)
summary(m); cv.model(m)
shapiro.test(residuals(m)); car::leveneTest(shoot_dw_g ~ treatment, data = d)
TukeyHSD(m)                      # or HSD.test(m, "treatment", console = TRUE) for letters
''',
 None, None)

g = {k: v.shoot_dw_g.values for k, v in crd.groupby('treatment')}
best = max(g, key=lambda k: g[k].mean()); ctrl = g['Control'].mean()
ex1['read'] = {'en': [f'The ANOVA F-test is highly significant: at least one treatment differs.',
                      'Residuals pass the normality (Shapiro–Wilk) and equal-variance (Levene) checks, so the ANOVA is trustworthy.',
                      f'{best} is the best treatment ({g[best].mean():.2f} g/plant vs {ctrl:.2f} g for the control, +{100*(g[best].mean()/ctrl-1):.0f}%).',
                      'Tukey HSD compares every pair while keeping the overall error rate at 5%.'],
               'am': ['የANOVA F-test በጣም ጉልህ ነው፡ ቢያንስ አንድ ሕክምና ይለያል።',
                      'Residuals የnormality (Shapiro–Wilk) እና የእኩል variance (Levene) ፍተሻዎችን ያልፋሉ፤ ስለዚህ ANOVAው ታማኝ ነው።',
                      f'{best} ምርጡ ሕክምና ነው (በአንድ ተክል {g[best].mean():.2f} ግራም፣ መቆጣጠሪያው {ctrl:.2f} ግራም፣ +{100*(g[best].mean()/ctrl-1):.0f}%)።',
                      'Tukey HSD አጠቃላይ የስህተት መጠኑን በ5% እየጠበቀ እያንዳንዱን ጥንድ ያወዳድራል።']}
ex1['decide'] = {'en': f'Take {best} to on-farm testing next season; drop treatments that Tukey shows are no better than the control.', 'am': f'{best}ን በሚቀጥለው ወቅት ወደ እርሻ ላይ ፍተሻ ውሰዱ፤ Tukey ከመቆጣጠሪያው የተሻሉ እንዳልሆኑ ያሳያቸውን ሕክምናዎች ተዉ።'}
ex1['biz'] = {'en': 'Biofertilizer makers pay for screen-house and field efficacy testing before registration.', 'am': 'የባዮማዳበሪያ አምራቾች ከምዝገባ በፊት ለስክሪን ቤትና ለመስክ የውጤታማነት ፍተሻ ይከፍላሉ።'}

ex2 = example('s4-rcbd',
 {'en': 'Which teff entries out-yield the local check?', 'am': 'የትኞቹ የጤፍ ዝርያዎች ከአካባቢው መቆጣጠሪያ የበለጠ ምርት ይሰጣሉ?'},
 {'en': 'Six entries (five new lines and the farmers’ local variety) in 4 blocks across a slope; each block holds every entry once, in random order.', 'am': 'ስድስት ዝርያዎች (አምስት አዳዲስ መስመሮችና የገበሬዎች የአካባቢ ዝርያ) በተዳፋት ላይ በ4 ብሎኮች፤ እያንዳንዱ ብሎክ እያንዳንዱን ዝርያ አንድ ጊዜ በዘፈቀደ ቅደም ተከተል ይዟል።'},
 {'en': 'Randomised complete block design (RCBD) → two-way ANOVA (block + variety), LSD vs check, CV, blocking efficiency', 'am': 'Randomised complete block design (RCBD) → two-way ANOVA (ብሎክ + ዝርያ)፣ ከመቆጣጠሪያ ጋር LSD፣ CV፣ የብሎክ ብቃት'},
 's4_rcbd_teff.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s4_rcbd_teff.csv"); y = d.yield_t_ha
t, r = d.variety.nunique(), d.block.nunique(); G = y.mean()
ss_tot = ((y - G)**2).sum()
ss_blk = t * ((d.groupby("block").yield_t_ha.mean() - G)**2).sum()
ss_var = r * ((d.groupby("variety").yield_t_ha.mean() - G)**2).sum()
ss_err = ss_tot - ss_blk - ss_var
df_b, df_v, df_e = r - 1, t - 1, (r - 1) * (t - 1)
ms_b, ms_v, ms_e = ss_blk / df_b, ss_var / df_v, ss_err / df_e
print("Source    df     SS      MS      F       p")
for name, df_, ss, ms in [("Block", df_b, ss_blk, ms_b), ("Variety", df_v, ss_var, ms_v)]:
    F = ms / ms_e
    print(f"{name:8s} {df_:3d} {ss:7.3f} {ms:7.3f} {F:7.2f}  {stats.f.sf(F, df_, df_e):.2e}")
print(f"Error    {df_e:3d} {ss_err:7.3f} {ms_e:7.3f}")
print(f"CV = {100*np.sqrt(ms_e)/G:.1f}%")
re = ((r - 1) * ms_b + r * (t - 1) * ms_e) / ((r * t - 1) * ms_e)
print(f"Relative efficiency of blocking vs CRD = {re:.2f}")
lsd = stats.t.ppf(0.975, df_e) * np.sqrt(2 * ms_e / r)
means = d.groupby("variety").yield_t_ha.mean().sort_values(ascending=False)
check = means["Local"]
print(f"LSD(5%) = {lsd:.3f} t/ha; local check = {check:.2f} t/ha")
for v, m in means.items():
    if v != "Local":
        flag = "better than check" if m - check > lsd else "not different"
        print(f"  {v:5s} {m:.2f}  {m-check:+.2f}  {flag}")
''',
 '''
library(agricolae)
d <- read.csv("s4_rcbd_teff.csv"); d$block <- factor(d$block)
m <- aov(yield_t_ha ~ block + variety, data = d)
summary(m); cv.model(m)
LSD.test(m, "variety", console = TRUE)
# compare each entry with the check (Dunnett): library(emmeans)
# contrast(emmeans(m, "variety"), "trt.vs.ctrl", ref = "Local")
''', None, None)

rc = pd.DataFrame(rows) if False else pd.read_csv(os.path.join(DATA, 's4_rcbd_teff.csv'))
mm = rc.groupby('variety').yield_t_ha.mean(); t_, r_ = 6, 4
ss_e = ((rc.yield_t_ha - rc.groupby('variety').yield_t_ha.transform('mean') - rc.groupby('block').yield_t_ha.transform('mean') + rc.yield_t_ha.mean())**2).sum()
mse = ss_e / 15; lsd = stats.t.ppf(.975, 15) * np.sqrt(2 * mse / 4)
better = [v for v in mm.index if v != 'Local' and mm[v] - mm['Local'] > lsd]
top = mm.drop('Local').idxmax()
ex2['read'] = {'en': ['Blocks are significant: the slope really changes yield, so blocking was worth it (relative efficiency > 1 means a CRD would have needed more plots for the same precision).',
                      'Varieties differ strongly (p far below 0.05) and the CV is low, a sign of a well-managed trial.',
                      f'Entries more than one LSD above the local check: {", ".join(better)}. {top} is the top entry at {mm[top]:.2f} t/ha vs {mm["Local"]:.2f} t/ha for the check.'],
               'am': ['ብሎኮች ጉልህ ናቸው፡ ተዳፋቱ በእርግጥ ምርትን ይቀይራል፤ ስለዚህ ብሎክ ማድረግ ጠቃሚ ነበር (relative efficiency > 1 ማለት CRD ለተመሳሳይ ትክክለኛነት ብዙ ማሳዎች ያስፈልጉት ነበር ማለት ነው)።',
                      'ዝርያዎች በጣም ይለያያሉ (p ከ0.05 በጣም ያነሰ ነው)፣ CVውም ዝቅተኛ ነው፤ ይህ በደንብ የተያዘ ሙከራ ምልክት ነው።',
                      f'ከአካባቢው መቆጣጠሪያ ከአንድ LSD በላይ የሚበልጡ ዝርያዎች፡ {", ".join(better)}። {top} ምርጡ ዝርያ ሲሆን {mm[top]:.2f} t/ha ይሰጣል፤ መቆጣጠሪያው {mm["Local"]:.2f} t/ha።']}
ex2['decide'] = {'en': f'Advance {", ".join(better)} to multi-location testing (Level S5); a single site and season cannot support a release decision.', 'am': f'{", ".join(better)}ን ወደ ብዙ ቦታ ፍተሻ (ደረጃ S5) አሳድጉ፤ አንድ ቦታና አንድ ወቅት ለዝርያ መልቀቂያ ውሳኔ በቂ አይደለም።'}
ex2['biz'] = {'en': 'National variety trials and seed companies need exactly this analysis every season.', 'am': 'ብሔራዊ የዝርያ ሙከራዎችና የዘር ኩባንያዎች በየወቅቱ ይህን ትንተና በትክክል ይፈልጋሉ።'}

ex3 = example('s4-factorial',
 {'en': 'Do nitrogen and phosphorus work together on wheat?', 'am': 'ናይትሮጅንና ፎስፈረስ በስንዴ ላይ አብረው ይሠራሉ?'},
 {'en': 'All 9 combinations of 3 N rates (0, 46, 92 kg/ha) and 3 P rates (0, 20, 40 kg/ha), in an RCBD with 3 blocks (27 plots).', 'am': 'የ3 የN መጠኖች (0፣ 46፣ 92 kg/ha) እና የ3 የP መጠኖች (0፣ 20፣ 40 kg/ha) ሁሉም 9 ጥምሮች፣ በ3 ብሎኮች RCBD (27 ማሳዎች)።'},
 {'en': '3 × 3 factorial in RCBD → ANOVA with N, P and N × P interaction; table of means', 'am': '3 × 3 factorial በRCBD → ANOVA ከN፣ P እና N × P interaction ጋር፤ የአማካዮች ሰንጠረዥ'},
 's4_factorial_wheat.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s4_factorial_wheat.csv"); y = d.yield_t_ha; G = y.mean()
def ss(cols):   # sum of squares of the cell means of the given factors
    m = d.groupby(cols).yield_t_ha.transform("mean"); return ((m - G)**2).sum()
ss_b, ss_n, ss_p = ss(["block"]), ss(["N_kg_ha"]), ss(["P_kg_ha"])
ss_np = ss(["N_kg_ha", "P_kg_ha"]) - ss_n - ss_p
ss_e = ((y - G)**2).sum() - ss_b - ss_n - ss_p - ss_np
df = {"Block": 2, "N": 2, "P": 2, "N x P": 4}; df_e = 26 - sum(df.values())
ms_e = ss_e / df_e
print("Source   df     SS      F        p")
for name, s_ in zip(df, [ss_b, ss_n, ss_p, ss_np]):
    F = s_ / df[name] / ms_e
    print(f"{name:7s} {df[name]:3d} {s_:7.3f} {F:7.2f}  {stats.f.sf(F, df[name], df_e):.2e}")
print(f"Error   {df_e:3d} {ss_e:7.3f}   MSE = {ms_e:.4f}, CV = {100*np.sqrt(ms_e)/G:.1f}%")
print("\\nMean yield (t/ha): rows N, columns P")
print(d.pivot_table(index="N_kg_ha", columns="P_kg_ha", values="yield_t_ha").round(2))
''',
 '''
d <- read.csv("s4_factorial_wheat.csv")
d$block <- factor(d$block); d$N <- factor(d$N_kg_ha); d$P <- factor(d$P_kg_ha)
m <- aov(yield_t_ha ~ block + N * P, data = d)
summary(m)
with(d, interaction.plot(N, P, yield_t_ha, ylab = "Yield (t/ha)"))
library(emmeans); emmeans(m, ~ P | N)   # P effect at each N rate
''', None, None)
fw = pd.read_csv(os.path.join(DATA, 's4_factorial_wheat.csv')); tab = fw.pivot_table(index='N_kg_ha', columns='P_kg_ha', values='yield_t_ha')
gain_p_low = tab.loc[0, 40] - tab.loc[0, 0]; gain_p_high = tab.loc[92, 40] - tab.loc[92, 0]
ex3['read'] = {'en': ['N and P both raise yield strongly (very small p-values).',
                      f'The N × P interaction tells whether the P effect depends on N: here P adds {gain_p_low:.2f} t/ha without N but {gain_p_high:.2f} t/ha at 92 kg N.',
                      'When the interaction is significant, recommend the best combination from the table of means, not each nutrient separately.'],
               'am': ['N እና P ሁለቱም ምርትን በጠንካራ ሁኔታ ይጨምራሉ (በጣም ትናንሽ p-values)።',
                      f'የN × P interaction የP ውጤት በN ላይ የተመሠረተ መሆኑን ይነግራል፡ እዚህ P ያለ N {gain_p_low:.2f} t/ha ይጨምራል፤ በ92 kg N ግን {gain_p_high:.2f} t/ha።',
                      'interaction ጉልህ ሲሆን እያንዳንዱን ንጥረ ነገር ለየብቻ ሳይሆን ከአማካዮቹ ሰንጠረዥ ምርጡን ጥምር ምከሩ።']}
best_cell = tab.stack().idxmax()
ex3['decide'] = {'en': f'The highest yield is at N {best_cell[0]} + P {best_cell[1]} kg/ha; before recommending it, check profit with the economic analysis in Level S5.', 'am': f'ከፍተኛው ምርት በN {best_cell[0]} + P {best_cell[1]} kg/ha ላይ ነው፤ ከመምከራችሁ በፊት በደረጃ S5 የኢኮኖሚ ትንተና ትርፉን ፈትሹ።'}
ex3['biz'] = {'en': 'Blended-fertilizer companies and soil-testing labs sell nutrient recommendations built on factorial trials.', 'am': 'የተቀላቀለ ማዳበሪያ ኩባንያዎችና የአፈር ፍተሻ ላብራቶሪዎች በfactorial ሙከራዎች ላይ የተገነቡ የንጥረ ነገር ምክሮችን ይሸጣሉ።'}

ex4 = example('s4-splitplot',
 {'en': 'Which potato varieties benefit most from supplementary irrigation?', 'am': 'ተጨማሪ መስኖ በጣም የሚጠቅማቸው የትኞቹ የድንች ዝርያዎች ናቸው?'},
 {'en': 'Irrigation is applied to large main plots (rainfed or supplementary); each main plot is split into 4 subplots with different varieties; 3 blocks.', 'am': 'መስኖ በትላልቅ ዋና ማሳዎች ላይ ይሰጣል (በዝናብ ወይም ተጨማሪ)፤ እያንዳንዱ ዋና ማሳ የተለያዩ ዝርያዎች ባሏቸው 4 ንዑስ ማሳዎች ይከፈላል፤ 3 ብሎኮች።'},
 {'en': 'Split-plot design → ANOVA with two error terms: Error (a) for irrigation, Error (b) for variety and interaction', 'am': 'Split-plot ንድፍ → ሁለት የስህተት ክፍሎች ያሉት ANOVA፡ Error (a) ለመስኖ፣ Error (b) ለዝርያና ለinteraction'},
 's4_splitplot_potato.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s4_splitplot_potato.csv"); y = d.tuber_t_ha; G = y.mean()
def ss(cols):
    m = d.groupby(cols).tuber_t_ha.transform("mean"); return ((m - G)**2).sum()
ss_b, ss_i, ss_v = ss(["block"]), ss(["irrigation"]), ss(["variety"])
ss_a = ss(["block", "irrigation"]) - ss_b - ss_i                 # Error (a): block x irrigation
ss_iv = ss(["irrigation", "variety"]) - ss_i - ss_v
ss_eb = ((y - G)**2).sum() - ss_b - ss_i - ss_a - ss_v - ss_iv   # Error (b)
r, a, b = 3, 2, 4
df = {"Block": r-1, "Irrigation": a-1, "Error (a)": (r-1)*(a-1), "Variety": b-1, "Irr x Var": (a-1)*(b-1), "Error (b)": a*(r-1)*(b-1)}
ms = {k: v / df[k] for k, v in zip(df, [ss_b, ss_i, ss_a, ss_v, ss_iv, ss_eb])}
print("Source      df     MS       F       p")
for k in df:
    if k in ("Irrigation",):  F, den = ms[k] / ms["Error (a)"], df["Error (a)"]
    elif k in ("Variety", "Irr x Var"): F, den = ms[k] / ms["Error (b)"], df["Error (b)"]
    else: print(f"{k:10s} {df[k]:3d} {ms[k]:7.2f}"); continue
    print(f"{k:10s} {df[k]:3d} {ms[k]:7.2f} {F:7.2f}  {stats.f.sf(F, df[k], den):.4f}")
print("\\nMean tuber yield (t/ha):")
print(d.pivot_table(index="variety", columns="irrigation", values="tuber_t_ha").round(1))
''',
 '''
d <- read.csv("s4_splitplot_potato.csv")
d[c("block", "irrigation", "variety")] <- lapply(d[c("block", "irrigation", "variety")], factor)
m <- aov(tuber_t_ha ~ irrigation * variety + Error(block / irrigation), data = d)
summary(m)
# mixed-model version: lmerTest::lmer(tuber_t_ha ~ irrigation * variety + (1 | block/irrigation), data = d)
''', None, None)
sp = pd.read_csv(os.path.join(DATA, 's4_splitplot_potato.csv')); spt = sp.pivot_table(index='variety', columns='irrigation', values='tuber_t_ha')
gain = (spt['Supplementary'] - spt['Rainfed']).sort_values(ascending=False)
ex4['read'] = {'en': ['Irrigation is tested against Error (a), which has only 2 degrees of freedom: main-plot factors are always tested with less precision.',
                      'Variety and the irrigation × variety interaction use Error (b) and are estimated more precisely.',
                      f'{gain.index[0]} gains most from irrigation (+{gain.iloc[0]:.1f} t/ha), {gain.index[-1]} least (+{gain.iloc[-1]:.1f} t/ha).'],
               'am': ['መስኖ የሚፈተነው 2 degrees of freedom ብቻ ባለው Error (a) ነው፡ የዋና ማሳ ምክንያቶች ሁልጊዜ በዝቅተኛ ትክክለኛነት ይፈተናሉ።',
                      'ዝርያና የመስኖ × ዝርያ interaction Error (b)ን ይጠቀማሉ፤ በበለጠ ትክክለኛነትም ይገመታሉ።',
                      f'{gain.index[0]} ከመስኖ በብዛት ያተርፋል (+{gain.iloc[0]:.1f} t/ha)፣ {gain.index[-1]} በትንሹ (+{gain.iloc[-1]:.1f} t/ha)።']}
ex4['decide'] = {'en': f'Where farmers can irrigate, recommend {gain.index[0]}; under rainfed conditions choose the variety with the highest rainfed mean.', 'am': f'ገበሬዎች መስኖ ማድረግ በሚችሉበት ቦታ {gain.index[0]}ን ምከሩ፤ በዝናብ ብቻ በሚመረትበት ሁኔታ ከፍተኛ የዝናብ አማካይ ያለውን ዝርያ ምረጡ።'}
ex4['biz'] = {'en': 'Irrigation-equipment sellers and seed-potato producers use such results to sell variety–irrigation packages.', 'am': 'የመስኖ መሣሪያ ሻጮችና የዘር ድንች አምራቾች እንዲህ ዓይነት ውጤቶችን የዝርያ–መስኖ ጥቅሎችን ለመሸጥ ይጠቀማሉ።'}

ex5 = example('s4-kruskal',
 {'en': 'Do fungicide programmes reduce potato late blight scores?', 'am': 'የፈንገስ መድኃኒት ፕሮግራሞች የድንች late blight ነጥቦችን ይቀንሳሉ?'},
 {'en': '32 plots, 4 programmes (including untreated), 8 plots each; blight scored on a 1 (none) to 9 (dead) scale.', 'am': '32 ማሳዎች፣ 4 ፕሮግራሞች (ያልታከመውን ጨምሮ)፣ እያንዳንዳቸው 8 ማሳዎች፤ blight በ1 (የለም) እስከ 9 (የሞተ) ሚዛን ተለክቷል።'},
 {'en': 'Ordinal scores → Kruskal–Wallis test, then Mann–Whitney tests against untreated with Bonferroni correction', 'am': 'ደረጃዊ ነጥቦች → Kruskal–Wallis ፈተና፣ ከዚያ ከያልታከመው ጋር Mann–Whitney ፈተናዎች ከBonferroni እርማት ጋር'},
 's4_kruskal_blight.csv',
 '''
import pandas as pd
from scipy import stats
d = pd.read_csv("s4_kruskal_blight.csv")
g = {k: v.blight_score_1to9.values for k, v in d.groupby("fungicide")}
H, p = stats.kruskal(*g.values())
print(f"Kruskal-Wallis H = {H:.2f}, p = {p:.2e}")
print("Median score:", {k: float(pd.Series(v).median()) for k, v in g.items()})
others = [k for k in g if k != "Untreated"]
for k in others:
    u = stats.mannwhitneyu(g[k], g["Untreated"], alternative="less")
    print(f"  {k} lower than Untreated: Bonferroni p = {min(1, u.pvalue*len(others)):.4f}")
''',
 '''
d <- read.csv("s4_kruskal_blight.csv")
kruskal.test(blight_score_1to9 ~ fungicide, data = d)
pairwise.wilcox.test(d$blight_score_1to9, d$fungicide, p.adjust.method = "bonferroni")
# or agricolae::kruskal(d$blight_score_1to9, d$fungicide, console = TRUE)
''', None, None)
kb = pd.read_csv(os.path.join(DATA, 's4_kruskal_blight.csv')); med = kb.groupby('fungicide').blight_score_1to9.median()
bestf = med.drop('Untreated').idxmin()
ex5['read'] = {'en': ['Scores are ranks, not measurements, so ANOVA on means is not ideal; Kruskal–Wallis compares the distributions of ranks.',
                      'The test is significant: at least one programme changes blight scores.',
                      f'{bestf} has the lowest median score ({med[bestf]:.0f} vs {med["Untreated"]:.0f} untreated); Bonferroni keeps the risk of a false "win" at 5% across the three comparisons.'],
               'am': ['ነጥቦቹ ደረጃዎች እንጂ መለኪያዎች ስላልሆኑ በአማካዮች ላይ ANOVA ተስማሚ አይደለም፤ Kruskal–Wallis የደረጃዎችን ስርጭት ያወዳድራል።',
                      'ፈተናው ጉልህ ነው፡ ቢያንስ አንድ ፕሮግራም የblight ነጥቦችን ይቀይራል።',
                      f'{bestf} ዝቅተኛው መካከለኛ ነጥብ አለው ({med[bestf]:.0f}፣ ያልታከመው {med["Untreated"]:.0f})፤ Bonferroni በሦስቱ ንጽጽሮች የሐሰት «ድል» አደጋን በ5% ይጠብቃል።']}
ex5['decide'] = {'en': f'Recommend {bestf} if its extra cost is below the value of the yield it saves (check with a partial budget, Level S5).', 'am': f'ተጨማሪ ወጪው ከሚያድነው ምርት ዋጋ ያነሰ ከሆነ {bestf}ን ምከሩ (በpartial budget ፈትሹ፣ ደረጃ S5)።'}
ex5['biz'] = {'en': 'Crop-protection companies pay for independent efficacy trials with proper statistics.', 'am': 'የሰብል ጥበቃ ኩባንያዎች ትክክለኛ ስታቲስቲክስ ላላቸው ገለልተኛ የውጤታማነት ሙከራዎች ይከፍላሉ።'}

# ================= modules =================
M_en = [
 {'t': 'Principles of field experimentation', 'd': '3 weeks · 12 h', 'o': ['Define experimental unit, treatment, replicate and control', 'Apply the three principles: replication, randomisation, local control (blocking)', 'Plan plot size, borders, layout and data collection'],
  'l': ['Why experiments: causation needs control', 'Experimental units and pseudo-replication (plants in one plot are not replicates)', 'Randomisation with random numbers or software', 'Blocking: follow the gradient you can see', 'Plot technique: size, shape, borders, guard rows', 'Field book, labels and data entry checks'],
  'a': 'Walk a real field, map its gradients (slope, shade, old bunds), and draw a randomised layout for a 6-treatment, 4-replicate trial with plot numbers.', 'm': 'Field, pegs, string, tape measure, phone with a random-number app',
  'q': ['Why are 10 plants in one plot not 10 replicates?', 'Which way should blocks run on a slope?', 'What do border rows protect against?'], 'tip': 'Most failed trials fail in the field, not in the analysis.'},
 {'t': 'CRD and one-way ANOVA', 'd': '3 weeks · 12 h', 'o': ['Explain how ANOVA splits variation into treatment and error', 'Check assumptions with residuals', 'Transform data when assumptions fail'],
  'l': ['The ANOVA table: SS, df, MS, F', 'Coefficient of variation (CV) as a quality signal', 'Residual checks: normality, equal variance, outliers', 'Transformations: log, square root, arcsine', 'Unequal replication'],
  'a': 'Run a pot trial with 4 treatments × 5 pots and analyse it fully: ANOVA, CV, residual plots and a one-page report.', 'm': 'Pots, soil, seed, scale, Python or R',
  'q': ['What does a high CV warn you about?', 'When would you log-transform yield?', 'What is the error term in a CRD?'], 'tip': 'Have students compute one ANOVA fully by hand before using software.'},
 {'t': 'Comparing means: LSD, Tukey, Dunnett and contrasts', 'd': '2 weeks · 8 h', 'o': ['Choose the right mean-comparison method', 'Control error rates when making many comparisons', 'Plan contrasts that answer real questions'],
  'l': ['LSD: when it is acceptable (planned, few comparisons)', 'Tukey HSD for all pairs', 'Dunnett for comparisons with a check', 'Orthogonal contrasts: organic vs inorganic, linear trend in rates', 'Letter displays and their misuse'],
  'a': 'Re-analyse a published variety trial using Dunnett vs the check and compare the conclusions with the paper’s Duncan letters.', 'm': 'A published trial table, Python or R',
  'q': ['Why is LSD for all 15 pairs risky?', 'Which test compares new lines with a local check?', 'What is an orthogonal contrast?'], 'tip': 'Ask "which comparisons matter to the farmer?" before choosing a test.'},
 {'t': 'RCBD and blocking', 'd': '3 weeks · 12 h', 'o': ['Lay out and analyse an RCBD', 'Measure how much blocking helped', 'Handle a missing plot'],
  'l': ['Blocking across gradients', 'Two-way ANOVA without interaction', 'Relative efficiency of RCBD vs CRD', 'Missing plots: estimation or mixed models', 'On-farm trials: farms as blocks'],
  'a': 'Analyse a 6-variety × 4-block teff trial, compute LSD and relative efficiency, and write which entries beat the local check.', 'm': 'Trial data, Python or R',
  'q': ['What if blocks were laid along the slope instead of across it?', 'What does relative efficiency 1.4 mean?', 'Why are farms often treated as blocks?'], 'tip': 'Make every on-farm trial an RCBD with farms as blocks.'},
 {'t': 'Latin square and row–column designs', 'd': '2 weeks · 8 h', 'o': ['Use a Latin square to remove two gradients', 'Know its limits (number of treatments = rows = columns)', 'Use row–column designs for larger trials'],
  'l': ['Two-way blocking: rows and columns', 'Latin square layout and randomisation', 'ANOVA for a Latin square', 'Row–column and resolvable designs for many entries'],
  'a': 'Design a 5 × 5 Latin square for 5 sorghum fertilizer treatments on a field with a slope one way and shade the other way.', 'm': 'Squared paper, Python or R',
  'q': ['Why must rows, columns and treatments be equal in a Latin square?', 'What does a Latin square cost in error df?', 'When is it worth it?'], 'tip': 'Latin squares are great teaching tools; row–column designs are what breeders use at scale.'},
 {'t': 'Factorial experiments and interaction', 'd': '3 weeks · 12 h', 'o': ['Design factorial trials', 'Interpret main effects and interactions', 'Recommend combinations, not single factors'],
  'l': ['Why factorials beat one-factor-at-a-time', 'Two-way ANOVA with interaction', 'Interaction plots', 'Simple effects: P at each N rate', 'Three-factor factorials and confounding'],
  'a': 'Analyse a 3 × 3 N × P wheat factorial and produce a recommendation table for farmers.', 'm': 'Trial data, Python or R',
  'q': ['What does a significant N × P interaction mean in words?', 'How many plots does a 3 × 3 factorial in 4 blocks need?', 'Why not test N and P in separate trials?'], 'tip': 'Always plot the interaction before reading the F-test.'},
 {'t': 'Split-plot and strip-plot designs', 'd': '3 weeks · 12 h', 'o': ['Recognise when one factor needs large plots', 'Analyse with the correct two error terms', 'Use mixed models for split-plots'],
  'l': ['Main plots and subplots', 'Error (a) and Error (b): why two errors', 'Strip-plot for two large-plot factors', 'Split-plot as a mixed model', 'Common mistakes: analysing as a factorial'],
  'a': 'Analyse an irrigation × potato variety split-plot and explain why irrigation is tested with fewer degrees of freedom.', 'm': 'Trial data, Python or R',
  'q': ['Which factor goes on the main plot?', 'What goes wrong if you analyse a split-plot as an RCBD factorial?', 'Where is the interaction tested?'], 'tip': 'Ask how the field work was done; that decides the design, not the analyst’s wish.'},
 {'t': 'Non-parametric tests, covariates and messy data', 'd': '2 weeks · 8 h', 'o': ['Analyse scores and ranks correctly', 'Use a covariate (ANCOVA) to remove known noise', 'Deal with outliers and missing data honestly'],
  'l': ['Kruskal–Wallis and Friedman tests', 'Mann–Whitney and multiple-comparison control', 'ANCOVA: adjusting yield for plant stand', 'Outliers: check, do not delete blindly', 'Missing data and what to report'],
  'a': 'Analyse late-blight scores from a fungicide trial with Kruskal–Wallis, and redo a yield analysis with stand count as a covariate.', 'm': 'Trial data, Python or R',
  'q': ['Why not average 1–9 scores and run ANOVA?', 'What does a covariate adjust for?', 'When may an outlier be removed?'], 'tip': 'Record covariates like stand count in every trial; they rescue noisy experiments.'}]
M_am = [
 {'t': 'የመስክ ሙከራ መርሆዎች', 'd': '3 ሳምንት · 12 ሰዓት', 'o': ['የሙከራ ክፍልን፣ ሕክምናን፣ ድግግሞሽንና መቆጣጠሪያን መግለጽ', 'ሦስቱን መርሆዎች መተግበር፡ ድግግሞሽ፣ በዘፈቀደ ድልድል፣ የአካባቢ ቁጥጥር (ብሎክ)', 'የማሳ መጠንን፣ ዳርቻዎችን፣ አቀማመጥንና የዳታ ስብሰባን ማቀድ'],
  'l': ['ለምን ሙከራዎች፡ ምክንያትን ለማረጋገጥ ቁጥጥር ያስፈልጋል', 'የሙከራ ክፍሎችና pseudo-replication (በአንድ ማሳ ውስጥ ያሉ ተክሎች ድግግሞሾች አይደሉም)', 'በዘፈቀደ ቁጥሮች ወይም በሶፍትዌር መደልደል', 'ብሎክ ማድረግ፡ የምታየውን ልዩነት ተከተል', 'የማሳ ቴክኒክ፡ መጠን፣ ቅርጽ፣ ዳርቻዎች፣ የጥበቃ ረድፎች', 'የመስክ መዝገብ፣ መለያዎችና የዳታ ማስገቢያ ፍተሻዎች'],
  'a': 'እውነተኛ ማሳ ውስጥ ተዘዋውራችሁ ልዩነቶቹን (ተዳፋት፣ ጥላ፣ አሮጌ እርከኖች) ካርታ ሥሩ፤ ለ6 ሕክምና፣ 4 ድግግሞሽ ሙከራ የማሳ ቁጥሮች ያሉት በዘፈቀደ የተደለደለ አቀማመጥ ሥሉ።', 'm': 'ማሳ፣ ካስማዎች፣ ገመድ፣ ሜትር፣ የዘፈቀደ ቁጥር አፕ ያለው ስልክ',
  'q': ['በአንድ ማሳ ውስጥ ያሉ 10 ተክሎች ለምን 10 ድግግሞሾች አይደሉም?', 'በተዳፋት ላይ ብሎኮች በየትኛው አቅጣጫ መሄድ አለባቸው?', 'የዳርቻ ረድፎች ከምን ይጠብቃሉ?'], 'tip': 'አብዛኞቹ ያልተሳኩ ሙከራዎች የሚወድቁት በትንተና ሳይሆን በመስክ ላይ ነው።'},
 {'t': 'CRD እና one-way ANOVA', 'd': '3 ሳምንት · 12 ሰዓት', 'o': ['ANOVA ልዩነትን ወደ ሕክምናና ስህተት እንዴት እንደሚከፍል ማብራራት', 'ግምቶችን በresiduals መፈተሽ', 'ግምቶች ሲወድቁ ዳታን መቀየር (transform)'],
  'l': ['የANOVA ሰንጠረዥ፡ SS፣ df፣ MS፣ F', 'Coefficient of variation (CV) እንደ የጥራት ምልክት', 'የResidual ፍተሻዎች፡ normality፣ እኩል variance፣ ከመደበኛ ውጭ ዋጋዎች', 'Transformations፡ log፣ square root፣ arcsine', 'እኩል ያልሆነ ድግግሞሽ'],
  'a': 'የ4 ሕክምና × 5 ማሰሮ ሙከራ አካሂዳችሁ ሙሉ በሙሉ ተንትኑ፡ ANOVA፣ CV፣ የresidual ፕሎቶችና የአንድ ገጽ ሪፖርት።', 'm': 'ማሰሮዎች፣ አፈር፣ ዘር፣ ሚዛን፣ Python ወይም R',
  'q': ['ከፍተኛ CV ስለምን ያስጠነቅቅሃል?', 'ምርትን መቼ log-transform ታደርጋለህ?', 'በCRD ውስጥ የስህተት ክፍሉ ምንድነው?'], 'tip': 'ተማሪዎች ሶፍትዌር ከመጠቀማቸው በፊት አንድ ANOVAን ሙሉ በሙሉ በእጅ እንዲያሰሉ አድርግ።'},
 {'t': 'አማካዮችን ማወዳደር፡ LSD፣ Tukey፣ Dunnett እና contrasts', 'd': '2 ሳምንት · 8 ሰዓት', 'o': ['ትክክለኛውን የአማካይ ንጽጽር ዘዴ መምረጥ', 'ብዙ ንጽጽሮች ሲደረጉ የስህተት መጠንን መቆጣጠር', 'እውነተኛ ጥያቄዎችን የሚመልሱ contrastsን ማቀድ'],
  'l': ['LSD፡ መቼ ተቀባይነት አለው (የታቀዱ፣ ጥቂት ንጽጽሮች)', 'Tukey HSD ለሁሉም ጥንዶች', 'Dunnett ከመቆጣጠሪያ ጋር ለሚደረግ ንጽጽር', 'Orthogonal contrasts፡ ኦርጋኒክ vs ኢ-ኦርጋኒክ፣ በመጠኖች ቀጥተኛ አዝማሚያ', 'የፊደል ማሳያዎችና አላግባብ አጠቃቀማቸው'],
  'a': 'የታተመ የዝርያ ሙከራን ከመቆጣጠሪያው ጋር በDunnett እንደገና ተንትናችሁ ድምዳሜዎቹን ከጽሑፉ የDuncan ፊደላት ጋር አወዳድሩ።', 'm': 'የታተመ የሙከራ ሰንጠረዥ፣ Python ወይም R',
  'q': ['ለሁሉም 15 ጥንዶች LSD ለምን አደገኛ ነው?', 'አዳዲስ መስመሮችን ከአካባቢ መቆጣጠሪያ ጋር የሚያወዳድረው የትኛው ፈተና ነው?', 'orthogonal contrast ምንድነው?'], 'tip': 'ፈተና ከመምረጥህ በፊት «ለገበሬው የትኞቹ ንጽጽሮች አስፈላጊ ናቸው?» ብለህ ጠይቅ።'},
 {'t': 'RCBD እና ብሎክ ማድረግ', 'd': '3 ሳምንት · 12 ሰዓት', 'o': ['RCBDን ማዘጋጀትና መተንተን', 'ብሎክ ማድረግ ምን ያህል እንደረዳ መለካት', 'የጎደለ ማሳን መያዝ'],
  'l': ['ልዩነቶችን አቋርጦ ብሎክ ማድረግ', 'Two-way ANOVA ያለ interaction', 'የRCBD vs CRD relative efficiency', 'የጎደሉ ማሳዎች፡ ግምት ወይም mixed models', 'የእርሻ ላይ ሙከራዎች፡ እርሻዎች እንደ ብሎክ'],
  'a': 'የ6 ዝርያ × 4 ብሎክ የጤፍ ሙከራን ተንትናችሁ LSDንና relative efficiencyን አስሉ፣ የትኞቹ ዝርያዎች የአካባቢውን መቆጣጠሪያ እንደሚበልጡ ጻፉ።', 'm': 'የሙከራ ዳታ፣ Python ወይም R',
  'q': ['ብሎኮቹ ተዳፋቱን አቋርጠው ሳይሆን በተዳፋቱ አቅጣጫ ቢቀመጡ ምን ይሆናል?', 'relative efficiency 1.4 ምን ማለት ነው?', 'እርሻዎች ብዙውን ጊዜ እንደ ብሎክ ለምን ይወሰዳሉ?'], 'tip': 'እያንዳንዱን የእርሻ ላይ ሙከራ እርሻዎች ብሎክ የሆኑበት RCBD አድርግ።'},
 {'t': 'Latin square እና row–column ንድፎች', 'd': '2 ሳምንት · 8 ሰዓት', 'o': ['ሁለት ልዩነቶችን ለማስወገድ Latin square መጠቀም', 'ገደቦቹን ማወቅ (የሕክምናዎች ብዛት = ረድፎች = ዓምዶች)', 'ለትላልቅ ሙከራዎች row–column ንድፎችን መጠቀም'],
  'l': ['ባለ ሁለት አቅጣጫ ብሎክ፡ ረድፎችና ዓምዶች', 'የLatin square አቀማመጥና በዘፈቀደ ድልድል', 'ANOVA ለLatin square', 'ለብዙ ዝርያዎች row–column እና resolvable ንድፎች'],
  'a': 'በአንድ አቅጣጫ ተዳፋት፣ በሌላ አቅጣጫ ጥላ ባለው ማሳ ላይ ለ5 የማሽላ ማዳበሪያ ሕክምናዎች 5 × 5 Latin square ንደፉ።', 'm': 'ካሬ ወረቀት፣ Python ወይም R',
  'q': ['በLatin square ውስጥ ረድፎች፣ ዓምዶችና ሕክምናዎች ለምን እኩል መሆን አለባቸው?', 'Latin square በerror df ምን ያስከፍላል?', 'መቼ ዋጋ አለው?'], 'tip': 'Latin squares ለማስተማር ምርጥ ናቸው፤ የዝርያ አሻሻዮች በትልቅ መጠን የሚጠቀሙት row–column ንድፎችን ነው።'},
 {'t': 'Factorial ሙከራዎችና interaction', 'd': '3 ሳምንት · 12 ሰዓት', 'o': ['factorial ሙከራዎችን መንደፍ', 'ዋና ውጤቶችንና interactionsን መተርጎም', 'ነጠላ ምክንያቶችን ሳይሆን ጥምሮችን መምከር'],
  'l': ['factorials አንድ በአንድ ከመሞከር ለምን ይበልጣሉ', 'Two-way ANOVA ከinteraction ጋር', 'የInteraction ፕሎቶች', 'Simple effects፡ P በእያንዳንዱ የN መጠን', 'ባለ ሦስት ምክንያት factorials እና confounding'],
  'a': 'የ3 × 3 N × P የስንዴ factorialን ተንትናችሁ ለገበሬዎች የምክር ሰንጠረዥ አዘጋጁ።', 'm': 'የሙከራ ዳታ፣ Python ወይም R',
  'q': ['ጉልህ የN × P interaction በቃላት ምን ማለት ነው?', 'በ4 ብሎኮች 3 × 3 factorial ስንት ማሳ ያስፈልገዋል?', 'N እና Pን በተለያዩ ሙከራዎች ለምን አንፈትንም?'], 'tip': 'የF-testን ከማንበብህ በፊት ሁልጊዜ interactionን ሥለው።'},
 {'t': 'Split-plot እና strip-plot ንድፎች', 'd': '3 ሳምንት · 12 ሰዓት', 'o': ['አንድ ምክንያት ትልቅ ማሳ ሲፈልግ መለየት', 'በትክክለኛዎቹ ሁለት የስህተት ክፍሎች መተንተን', 'ለsplit-plots mixed models መጠቀም'],
  'l': ['ዋና ማሳዎችና ንዑስ ማሳዎች', 'Error (a) እና Error (b)፡ ለምን ሁለት ስህተቶች', 'ለሁለት ትልቅ-ማሳ ምክንያቶች Strip-plot', 'Split-plot እንደ mixed model', 'የተለመዱ ስህተቶች፡ እንደ factorial መተንተን'],
  'a': 'የመስኖ × የድንች ዝርያ split-plotን ተንትናችሁ መስኖ ለምን በአነስተኛ degrees of freedom እንደሚፈተን አብራሩ።', 'm': 'የሙከራ ዳታ፣ Python ወይም R',
  'q': ['በዋናው ማሳ ላይ የሚሄደው የትኛው ምክንያት ነው?', 'split-plotን እንደ RCBD factorial ብትተነትን ምን ይሳሳታል?', 'interaction የሚፈተነው የት ነው?'], 'tip': 'የመስክ ሥራው እንዴት እንደተሠራ ጠይቅ፤ ንድፉን የሚወስነው እሱ ነው እንጂ የተንታኙ ፍላጎት አይደለም።'},
 {'t': 'Non-parametric ፈተናዎች፣ covariates እና የተዘበራረቀ ዳታ', 'd': '2 ሳምንት · 8 ሰዓት', 'o': ['ነጥቦችንና ደረጃዎችን በትክክል መተንተን', 'የሚታወቅ ጫጫታን ለማስወገድ covariate (ANCOVA) መጠቀም', 'ከመደበኛ ውጭ ዋጋዎችንና የጎደለ ዳታን በታማኝነት መያዝ'],
  'l': ['Kruskal–Wallis እና Friedman ፈተናዎች', 'Mann–Whitney እና የብዙ ንጽጽሮች ቁጥጥር', 'ANCOVA፡ ምርትን በተክል ብዛት ማስተካከል', 'ከመደበኛ ውጭ ዋጋዎች፡ ፈትሽ፣ በጭፍን አትሰርዝ', 'የጎደለ ዳታና ምን ሪፖርት መደረግ እንዳለበት'],
  'a': 'ከፈንገስ መድኃኒት ሙከራ የlate-blight ነጥቦችን በKruskal–Wallis ተንትኑ፤ የምርት ትንተናን ደግሞ የተክል ብዛትን እንደ covariate በመጠቀም እንደገና ሥሩ።', 'm': 'የሙከራ ዳታ፣ Python ወይም R',
  'q': ['የ1–9 ነጥቦችን አማካይ ወስደህ ለምን ANOVA አታካሂድም?', 'covariate ምንን ያስተካክላል?', 'ከመደበኛ ውጭ ዋጋ መቼ ሊወገድ ይችላል?'], 'tip': 'በእያንዳንዱ ሙከራ እንደ የተክል ብዛት ያሉ covariatesን መዝግብ፤ ጫጫታ ያላቸውን ሙከራዎች ያድናሉ።'}]

S4 = {'name': {'en': 'Field Experiment Designer', 'am': 'የመስክ ሙከራ ንድፍ አውጪ'},
      'stage': {'en': 'BSc years 1–3', 'am': 'የመጀመሪያ ዲግሪ 1ኛ–3ኛ ዓመት'},
      'goal': {'en': 'Graduates design, lay out and analyse the core agricultural experiments correctly: CRD, RCBD, Latin square, factorial, split-plot and non-parametric analyses. They choose the right mean comparisons and turn ANOVA tables into field recommendations.',
               'am': 'ተመራቂዎች ዋና ዋናዎቹን የግብርና ሙከራዎች በትክክል ይነድፋሉ፣ ያዘጋጃሉ፣ ይተነትናሉ፡ CRD፣ RCBD፣ Latin square፣ factorial፣ split-plot እና non-parametric ትንተናዎች። ትክክለኛውን የአማካይ ንጽጽር ይመርጣሉ፣ የANOVA ሰንጠረዦችን ወደ የመስክ ምክሮች ይቀይራሉ።'},
      'mods': {'en': M_en, 'am': M_am}, 'ex': [ex1, ex2, ex3, ex4, ex5]}
emit(4, S4)
for e in S4['ex']:
    print(f"--- {e['id']}\n{e['out']}\n")
