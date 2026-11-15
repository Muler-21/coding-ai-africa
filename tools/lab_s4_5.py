from labkit import *
import numpy as np
SIM = ('Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.', 'ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።')
W = ('One season of field work + 1 week of analysis', 'አንድ ወቅት የመስክ ሥራ + 1 ሳምንት ትንተና')
W1 = ('1–2 weeks', '1–2 ሳምንታት')
FIELD = T('Field plots, pegs, tape, labels', 'lay out and mark the plots', 'plotsን ማቀድና ምልክት ማድረግ', 'research station or farmer field')
SCALE = T('Field balance', 'weigh plot yields', 'የplot ምርቶችን መመዘን', 'station store')
ASREML = T('R with lme4 / ASReml-R (next step)', 'full mixed models with REML', 'ሙሉ mixed models ከREML ጋር', 'cran.r-project.org; vsni.co.uk')

S4 = []
S4.append(lab(('Why we randomise: a field with a fertility gradient', 'ለምን በዘፈቀደ እንመድባለን፡ የለምነት ልዩነት ያለው ማሳ'),
 ('Simulate 2,000 trials of 6 equal treatments on a sloping field, laid out systematically or randomised within blocks, and see which layout gives false differences.', 'በተዳፋት ማሳ ላይ የ6 እኩል ሕክምናዎችን 2,000 ሙከራዎች አስመስል፣ በሥርዓት ወይም በblocks ውስጥ በዘፈቀደ ተቀምጠው፣ የትኛው አቀማመጥ የሐሰት ልዩነቶችን እንደሚሰጥ ተመልከት።'), W1,
 [PY, NP, FIELD, T('Random number table or app', 'draw the plot order', 'የplot ቅደም ተከተሉን ማውጣት', 'any phone, or R: sample()')],
 (['Map the field: fertility falls by 0.05 t/ha per plot across the slope.', 'Systematic layout: in every block, treatments 1–6 always run left to right.', 'Randomised layout: a new random order in every block; blocks run across the gradient.', 'Simulate 2,000 trials where all treatments are truly equal; estimate T6 − T1 each time.', 'Print a randomised field plan to use.'],
  ['ማሳውን ካርታ አድርግ፡ ለምነት በተዳፋቱ ላይ በplot 0.05 t/ha ይቀንሳል።', 'የሥርዓት አቀማመጥ፡ በእያንዳንዱ block ሕክምናዎች 1–6 ሁልጊዜ ከግራ ወደ ቀኝ ይሄዳሉ።', 'የዘፈቀደ አቀማመጥ፡ በእያንዳንዱ block አዲስ የዘፈቀደ ቅደም ተከተል፤ blocks በልዩነቱ ላይ ይሄዳሉ።', 'ሁሉም ሕክምናዎች በእውነት እኩል የሆኑበትን 2,000 ሙከራዎች አስመስል፤ በእያንዳንዱ ጊዜ T6 − T1ን ገምት።', 'የምትጠቀምበትን የዘፈቀደ የማሳ ዕቅድ አትም።']),
 '''
import numpy as np
rng = np.random.default_rng(11); t, blocks = 6, 4
gradient = -0.05 * np.arange(t)                                          # plots 1..6 within a block, along the slope
def trial(randomise):
    est = np.zeros(t)
    for b in range(blocks):
        order = rng.permutation(t) if randomise else np.arange(t)            # order[i] = treatment in plot i
        y = 3.0 + gradient + rng.normal(0, 0.15, t)                          # every treatment truly equal
        est[order] += y / blocks
    return est[5] - est[0]
sys_ = np.array([trial(False) for _ in range(2000)]); ran = np.array([trial(True) for _ in range(2000)])
for name, d in [("systematic", sys_), ("randomised", ran)]:
    print(f"{name:10s}: mean T6 - T1 = {d.mean():+.3f} t/ha (truth 0), share of trials with |difference| > 0.2: {np.mean(abs(d) > 0.2):.0%}")
plan = [[int(x) for x in rng.permutation(t) + 1] for _ in range(blocks)]
for b, row in enumerate(plan, 1): print(f"block {b}: plots 1-6 get treatments {row}")
''',
 viz=lambda ns: [dots(B('Estimated T6 − T1 when there is no real difference (t/ha)', 'እውነተኛ ልዩነት በሌለበት የተገመተ T6 − T1 (t/ha)'), [B('Systematic layout', 'የሥርዓት አቀማመጥ'), B('Randomised in blocks', 'በblocks ውስጥ በዘፈቀደ')],
                      [ns['sys_'].mean(), ns['ran'].mean()], [np.percentile(ns['sys_'], 2.5), np.percentile(ns['ran'], 2.5)], [np.percentile(ns['sys_'], 97.5), np.percentile(ns['ran'], 97.5)], 't/ha', note=B('Dots: average over 2,000 trials; bars: where 95% of trials fall.', 'ነጥቦች፡ የ2,000 ሙከራዎች አማካይ፤ አሞሌዎች፡ 95% ሙከራዎች የሚወድቁበት።'))],
 analysis=lambda ns: ([f"The systematic layout always puts T6 on the poorer end: it reports T6 about {abs(ns['sys_'].mean()):.2f} t/ha worse every time, although the treatments are equal.", f"Randomised layouts are unbiased on average ({ns['ran'].mean():+.3f}); single trials still vary by chance, which the ANOVA error term measures.", f"{np.mean(abs(ns['sys_']) > 0.2):.0%} of systematic trials show a gap above 0.2 t/ha, against {np.mean(abs(ns['ran']) > 0.2):.0%} of randomised ones."],
                      [f"የሥርዓት አቀማመጡ T6ን ሁልጊዜ በደካማው ጫፍ ያስቀምጣል፡ ሕክምናዎቹ እኩል ቢሆኑም T6ን በእያንዳንዱ ጊዜ ወደ {abs(ns['sys_'].mean()):.2f} t/ha የከፋ አድርጎ ይዘግባል።", f"የዘፈቀደ አቀማመጦች በአማካይ ያልተዛቡ ናቸው ({ns['ran'].mean():+.3f})፤ ነጠላ ሙከራዎች አሁንም በዕድል ይለያያሉ፣ ይህንንም የANOVA ስህተት ይለካል።", f"ከሥርዓት ሙከራዎች {np.mean(abs(ns['sys_']) > 0.2):.0%} ከ0.2 t/ha በላይ ክፍተት ያሳያሉ፤ ከዘፈቀደዎቹ {np.mean(abs(ns['ran']) > 0.2):.0%}።"]),
 decision=lambda ns: ('Use the printed randomised plan: blocks across the slope, a new random order in each block, and keep the plan and seed with the data.', 'የታተመውን የዘፈቀደ ዕቅድ ተጠቀም፡ blocks በተዳፋቱ ላይ፣ በእያንዳንዱ block አዲስ የዘፈቀደ ቅደም ተከተል፣ ዕቅዱንና seedኡን ከዳታው ጋር አቆይ።'), note=SIM))
S4.append(lab(('CRD and one-way ANOVA: five rations for broilers', 'CRD እና one-way ANOVA፡ ለዶሮዎች አምስት ራሽኖች'),
 ('Compare weight gain of chickens on five rations in a completely randomised design, build the ANOVA table, and check the assumptions.', 'በcompletely randomised design ውስጥ በአምስት ራሽኖች ላይ ያሉ ዶሮዎችን የክብደት ጭማሪ አወዳድር፣ የANOVA ሰንጠረዡን ገንባ፣ ግምቶቹን ፈትሽ።'), ('6 weeks + analysis', '6 ሳምንታት + ትንተና'),
 [PY, NP, SP, T('Pens and a scale', 'house birds and weigh them', 'ዶሮዎችን ማኖርና መመዘን', 'poultry unit'), R_],
 (['Assign 30 similar chicks at random to 5 rations (6 pens of one bird each).', 'Record weight gain over 6 weeks (g).', 'Compute treatment means and the ANOVA: between-ration and within-ration variation.', 'Check equal variances (Levene) and normal residuals (Shapiro).', 'If F is significant, compare rations (next lab).'],
  ['30 ተመሳሳይ ጫጩቶችን በዘፈቀደ ወደ 5 ራሽኖች መድብ (በአንድ ዶሮ 6 ጎጆዎች)።', 'በ6 ሳምንታት የክብደት ጭማሪን መዝግብ (g)።', 'የሕክምና አማካዮችንና ANOVAን አስላ፡ በራሽኖች መካከልና በራሽን ውስጥ ያለ ልዩነት።', 'እኩል variancesን (Levene) እና normal residualsን (Shapiro) ፈትሽ።', 'F ጉልህ ከሆነ ራሽኖችን አወዳድር (ቀጣዩ ላብ)።']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(5)
rations = ["maize-soy (control)", "+ 10% fish meal", "+ 15% noug cake", "+ 10% sorghum", "+ enzyme"]
true = [1650, 1780, 1720, 1600, 1700]
data = {r: rng.normal(m, 70, 6).round() for r, m in zip(rations, true)}
y = np.concatenate(list(data.values())); g = np.repeat(np.arange(5), 6); grand = y.mean()
ss_t = sum(6 * (v.mean() - grand) ** 2 for v in data.values()); ss_e = sum(((v - v.mean()) ** 2).sum() for v in data.values())
df_t, df_e = 4, 25; F = (ss_t / df_t) / (ss_e / df_e); p = stats.f.sf(F, df_t, df_e)
print(f"{'source':9s} {'df':>3s} {'SS':>9s} {'MS':>8s}"); print(f"rations   {df_t:3d} {ss_t:9.0f} {ss_t / df_t:8.0f}  F = {F:.2f}, p = {p:.4f}"); print(f"error     {df_e:3d} {ss_e:9.0f} {ss_e / df_e:8.0f}")
lev = stats.levene(*data.values()).pvalue; resid = y - np.array([data[rations[i]].mean() for i in g]); shap = stats.shapiro(resid).pvalue
print(f"Levene p = {lev:.2f} (equal variances OK if > 0.05); Shapiro p = {shap:.2f} (normal residuals OK if > 0.05)")
means = {r: float(v.mean()) for r, v in data.items()}; cv = np.sqrt(ss_e / df_e) / grand
print(f"CV = {cv:.1%}")
''',
 viz=lambda ns: [hbar(B('Mean weight gain over 6 weeks (g)', 'በ6 ሳምንታት አማካይ የክብደት ጭማሪ (g)'), list(ns['means']), [(B('Grams', 'ግራም'), list(ns['means'].values()), 1)], B('Grams', 'ግራም'), fmt=0)],
 analysis=lambda ns: ([f"F = {ns['F']:.2f}, p = {ns['p']:.4f}: rations differ more than chance would explain." if ns['p'] < 0.05 else f"F = {ns['F']:.2f}, p = {ns['p']:.2f}: no clear evidence that rations differ.", f"Assumptions hold: Levene p = {ns['lev']:.2f}, Shapiro p = {ns['shap']:.2f}; CV = {ns['cv']:.1%}, typical for animal trials.", f"Fish meal gives the highest mean ({ns['means']['+ 10% fish meal']:.0f} g) and sorghum the lowest ({ns['means']['+ 10% sorghum']:.0f} g); which pairs differ needs a comparison test."],
                      [f"F = {ns['F']:.2f}፣ p = {ns['p']:.4f}፡ ራሽኖች ዕድል ከሚያብራራው በላይ ይለያያሉ።" if ns['p'] < 0.05 else f"F = {ns['F']:.2f}፣ p = {ns['p']:.2f}፡ ራሽኖች እንደሚለያዩ ግልጽ ማስረጃ የለም።", f"ግምቶቹ ይሠራሉ፡ Levene p = {ns['lev']:.2f}፣ Shapiro p = {ns['shap']:.2f}፤ CV = {ns['cv']:.1%}፣ ለእንስሳት ሙከራዎች የተለመደ።", f"fish meal ከፍተኛውን አማካይ ({ns['means']['+ 10% fish meal']:.0f} g)፣ sorghum ዝቅተኛውን ({ns['means']['+ 10% sorghum']:.0f} g) ይሰጣሉ፤ የትኞቹ ጥንዶች እንደሚለያዩ የንጽጽር ፈተና ያስፈልገዋል።"]),
 decision=lambda ns: ('Go on to pairwise comparisons (Tukey) and to a cost per kg gain before recommending a ration; with 6 birds per ration, differences under about 100 g cannot be detected.', 'ራሽን ከመምከርህ በፊት ወደ የጥንድ ንጽጽሮች (Tukey) እና በkg ጭማሪ ወጪ ቀጥል፤ በራሽን 6 ዶሮዎች ሲሆኑ ከ100 g በታች ያሉ ልዩነቶች ሊታወቁ አይችሉም።'), note=SIM))
S4.append(lab(('LSD, Tukey or Dunnett? False alarms and the right comparison', 'LSD፣ Tukey ወይስ Dunnett? የሐሰት ማንቂያዎችና ትክክለኛው ንጽጽር'),
 ('Simulate trials of 6 equal sorghum varieties to count false alarms from each method, then compare 5 new varieties with the standard check on real-looking data.', 'ከእያንዳንዱ ዘዴ የሐሰት ማንቂያዎችን ለመቁጠር የ6 እኩል የማሽላ ዝርያዎችን ሙከራዎች አስመስል፤ ከዚያ 5 አዲስ ዝርያዎችን ከመደበኛው check ጋር በእውነተኛ መሰል ዳታ ላይ አወዳድር።'), W1,
 [PY, SP, NP, R_],
 (['Simulate 1,000 trials: 6 varieties, 4 reps, no true differences.', 'In each trial run all 15 pairwise LSD tests, Tukey HSD, and Dunnett (each new vs check).', 'Count trials with at least one false "significant" result.', 'Analyse the real trial with Dunnett, because the question is "which new varieties beat the check?"', 'Report means with the method named.'],
  ['1,000 ሙከራዎችን አስመስል፡ 6 ዝርያዎች፣ 4 reps፣ ምንም እውነተኛ ልዩነት የለም።', 'በእያንዳንዱ ሙከራ ሁሉንም 15 የጥንድ LSD ፈተናዎች፣ Tukey HSD እና Dunnett (እያንዳንዱ አዲስ vs check) አስኪድ።', 'ቢያንስ አንድ የሐሰት «ጉልህ» ውጤት ያላቸውን ሙከራዎች ቁጠር።', 'ጥያቄው «የትኞቹ አዲስ ዝርያዎች checkኡን ያሸንፋሉ?» ስለሆነ እውነተኛውን ሙከራ በDunnett ተንትን።', 'አማካዮችን ከተጠቀምክበት ዘዴ ስም ጋር ዘግብ።']),
 '''
import numpy as np, itertools
from scipy import stats
rng = np.random.default_rng(8); k, r = 6, 4
false = {"LSD (all pairs)": 0, "Tukey HSD": 0, "Dunnett (vs check)": 0}
for _ in range(1000):
    groups = [rng.normal(3.0, 0.4, r) for _ in range(k)]
    mse = np.mean([g.var(ddof=1) for g in groups]); df = k * (r - 1); lsd = stats.t.ppf(0.975, df) * np.sqrt(2 * mse / r)
    m = [g.mean() for g in groups]
    false["LSD (all pairs)"] += any(abs(a - b) > lsd for a, b in itertools.combinations(m, 2))
    false["Tukey HSD"] += (stats.tukey_hsd(*groups).pvalue < 0.05).any()
    false["Dunnett (vs check)"] += (stats.dunnett(*groups[1:], control=groups[0]).pvalue < 0.05).any()
for k_, v in false.items(): print(f"{k_:20s} trials with a false alarm: {v / 10:.1f}%")
names = ["Check (Teshale)", "ETSC-1", "ETSC-2", "ETSC-3", "ETSC-4", "ETSC-5"]
true = [3.0, 3.1, 3.7, 3.0, 3.6, 2.9]
trial = [rng.normal(m, 0.3, 4) for m in true]
res = stats.dunnett(*trial[1:], control=trial[0])
means = [float(g.mean()) for g in trial]
for n, m, p in zip(names[1:], means[1:], res.pvalue): print(f"{n}: {m:.2f} t/ha vs check {means[0]:.2f}; Dunnett p = {p:.3f}")
winners = [n for n, p, m in zip(names[1:], res.pvalue, means[1:]) if p < 0.05 and m > means[0]]
''',
 viz=lambda ns: [hbar(B('Trials with at least one false "significant" difference (no real differences)', 'ቢያንስ አንድ የሐሰት «ጉልህ» ልዩነት ያላቸው ሙከራዎች (እውነተኛ ልዩነት የለም)'), list(ns['false']), [(B('Percent of 1,000 trials', 'ከ1,000 ሙከራዎች መቶኛ'), [v / 10 for v in ns['false'].values()], 2)], B('Percent', 'መቶኛ'), fmt=1),
                 hbar(B('Sorghum yields (t/ha); Dunnett vs check', 'የማሽላ ምርቶች (t/ha)፤ Dunnett vs check'), ns['names'], [(B('Mean yield', 'አማካይ ምርት'), ns['means'], 1)], 't/ha', fmt=2)],
 analysis=lambda ns: ([f"Unprotected LSD on all 15 pairs raises a false alarm in {ns['false']['LSD (all pairs)'] / 10:.0f}% of trials, although no variety differs.", f"Tukey ({ns['false']['Tukey HSD'] / 10:.0f}%) and Dunnett ({ns['false']['Dunnett (vs check)'] / 10:.0f}%) keep the rate near the promised 5%.", f"In the real trial Dunnett finds {', '.join(ns['winners']) or 'no variety'} significantly better than the check."],
                      [f"ያልተጠበቀ LSD በሁሉም 15 ጥንዶች ላይ ምንም ዝርያ ባይለያይም በ{ns['false']['LSD (all pairs)'] / 10:.0f}% ሙከራዎች የሐሰት ማንቂያ ያስነሳል።", f"Tukey ({ns['false']['Tukey HSD'] / 10:.0f}%) እና Dunnett ({ns['false']['Dunnett (vs check)'] / 10:.0f}%) መጠኑን በቃል በተገባው 5% አቅራቢያ ያቆያሉ።", f"በእውነተኛው ሙከራ Dunnett {', '.join(ns['winners']) or 'ምንም ዝርያ'}ን ከcheckኡ በጉልህ የተሻለ ሆኖ ያገኛል።"]),
 decision=lambda ns: (f"Advance {', '.join(ns['winners'])} to multi-location testing. Use Dunnett when comparing with a check, Tukey for all pairs, and LSD only for one or two planned comparisons.", f"{', '.join(ns['winners'])}ን ወደ ባለብዙ-ቦታ ፈተና አሳልፍ። ከcheck ጋር ስታወዳድር Dunnettን፣ ለሁሉም ጥንዶች Tukeyን፣ LSDን ደግሞ ለአንድ ወይም ለሁለት የታቀዱ ንጽጽሮች ብቻ ተጠቀም።"), note=SIM))
S4.append(lab(('RCBD: how much does blocking gain?', 'RCBD፡ blocking ምን ያህል ያተርፋል?'),
 ('Analyse the same wheat trial as a CRD and as an RCBD, compute the relative efficiency of blocking, and decide how to block next season.', 'ያንኑ የስንዴ ሙከራ እንደ CRD እና እንደ RCBD ተንትን፣ የblockingን አንጻራዊ ቅልጥፍና አስላ፣ በሚቀጥለው ወቅት እንዴት block እንደሚደረግ ወስን።'), W,
 [FIELD, SCALE, PY, SP],
 (['Field: 5 fertiliser treatments × 5 blocks; blocks follow the drainage gradient.', 'Analyse ignoring blocks (CRD ANOVA).', 'Analyse with blocks (RCBD ANOVA).', 'Relative efficiency RE = MSE(CRD-equivalent) ÷ MSE(RCBD).', 'Interpret: how many CRD replicates would equal the RCBD?'],
  ['ማሳ፡ 5 የማዳበሪያ ሕክምናዎች × 5 blocks፤ blocks የፍሳሽ ልዩነቱን ይከተላሉ።', 'blocksን ችላ ብለህ ተንትን (CRD ANOVA)።', 'ከblocks ጋር ተንትን (RCBD ANOVA)።', 'አንጻራዊ ቅልጥፍና RE = MSE(CRD-አቻ) ÷ MSE(RCBD)።', 'ተርጉም፡ ስንት የCRD replicates ከRCBDው ጋር እኩል ይሆናሉ?']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(14); t, b = 5, 5
block_eff = np.array([-0.6, -0.3, 0.0, 0.3, 0.6]); trt_eff = np.array([0.0, 0.25, 0.45, 0.55, 0.5])
y = 3.2 + block_eff[:, None] + trt_eff[None, :] + rng.normal(0, 0.18, (b, t))       # rows = blocks
g = y.mean(); ss_tot = ((y - g) ** 2).sum(); ss_t = b * ((y.mean(0) - g) ** 2).sum(); ss_b = t * ((y.mean(1) - g) ** 2).sum()
mse_crd = (ss_tot - ss_t) / (t * (b - 1)); mse_rcbd = (ss_tot - ss_t - ss_b) / ((t - 1) * (b - 1))
F_crd = (ss_t / (t - 1)) / mse_crd; F_rcbd = (ss_t / (t - 1)) / mse_rcbd
p_crd = stats.f.sf(F_crd, t - 1, t * (b - 1)); p_rcbd = stats.f.sf(F_rcbd, t - 1, (t - 1) * (b - 1))
re = ((b - 1) * (ss_b / (b - 1)) + b * (t - 1) * mse_rcbd) / ((t * b - 1) * mse_rcbd)            # Cochran & Cox
print(f"CRD analysis:  MSE {mse_crd:.3f}, F {F_crd:.2f}, p {p_crd:.3f}"); print(f"RCBD analysis: MSE {mse_rcbd:.3f}, F {F_rcbd:.2f}, p {p_rcbd:.3f}")
print(f"relative efficiency of blocking: {re:.1f} -> a CRD would need about {re * b:.0f} replicates to match 5 blocks")
''',
 viz=lambda ns: [hbar(B('Error mean square (t/ha)²: smaller is more precise', 'Error mean square (t/ha)²፡ ያነሰ የበለጠ ትክክለኛ ነው'), [B('Analysed as CRD', 'እንደ CRD የተተነተነ'), B('Analysed as RCBD', 'እንደ RCBD የተተነተነ')], [('MSE', [ns['mse_crd'], ns['mse_rcbd']], 1)], 'MSE', fmt=3),
                 line(B('Block means follow the drainage gradient (t/ha)', 'የblock አማካዮች የፍሳሽ ልዩነቱን ይከተላሉ (t/ha)'), [1, 2, 3, 4, 5], [(B('Block mean', 'የblock አማካይ'), list(ns['y'].mean(1)), 2)], 'Block', 't/ha')],
 analysis=lambda ns: ([f"Ignoring blocks, the error mean square is {ns['mse_crd']:.3f} and treatments look {'non-' if ns['p_crd'] > 0.05 else ''}significant (p = {ns['p_crd']:.3f}).", f"With blocks, MSE falls to {ns['mse_rcbd']:.3f} and p = {ns['p_rcbd']:.3f}: the gradient was hiding the treatment effects.", f"Relative efficiency {ns['re']:.1f}: these 5 blocks are worth about {ns['re'] * 5:.0f} replicates in a CRD."],
                      [f"blocksን ችላ ስትል error mean square {ns['mse_crd']:.3f} ሲሆን ሕክምናዎች {'ጉልህ ያልሆኑ' if ns['p_crd'] > 0.05 else 'ጉልህ'} ይመስላሉ (p = {ns['p_crd']:.3f})።", f"ከblocks ጋር MSE ወደ {ns['mse_rcbd']:.3f} ይወርዳል፣ p = {ns['p_rcbd']:.3f}፡ ልዩነቱ የሕክምና ውጤቶቹን ይደብቅ ነበር።", f"አንጻራዊ ቅልጥፍና {ns['re']:.1f}፡ እነዚህ 5 blocks በCRD ውስጥ ወደ {ns['re'] * 5:.0f} replicates ያህል ዋጋ አላቸው።"]),
 decision=lambda ns: ('Keep blocking along the drainage gradient, with blocks as compact as possible; walk the field before each trial to find the main gradient.', 'blockingን በፍሳሽ ልዩነቱ ላይ ቀጥል፣ blocks በተቻለ መጠን የታመቁ ይሁኑ፤ ዋናውን ልዩነት ለማግኘት ከእያንዳንዱ ሙከራ በፊት ማሳውን ተዘዋውረህ ተመልከት።'), note=SIM))
S4.append(lab(('Latin square: two gradients at once', 'Latin square፡ ሁለት ልዩነቶች በአንድ ጊዜ'),
 ('Test 5 potato fertiliser rates on a hillside with a slope gradient and a shade gradient using a 5 × 5 Latin square, and compare with an RCBD analysis.', 'የተዳፋትና የጥላ ልዩነት ባለው ኮረብታ ላይ 5 የድንች ማዳበሪያ መጠኖችን በ5 × 5 Latin square ፈትሽ፣ ከRCBD ትንተና ጋርም አወዳድር።'), W,
 [FIELD, SCALE, PY, SP],
 (['Build a 5 × 5 square: each treatment once in every row (slope) and once in every column (shade).', 'Randomise by shuffling rows, columns and treatment labels.', 'Harvest and weigh each plot.', 'ANOVA with rows, columns and treatments.', 'Compare the error mean square with an analysis that blocks on rows only.'],
  ['5 × 5 ካሬ ገንባ፡ እያንዳንዱ ሕክምና በእያንዳንዱ ረድፍ (ተዳፋት) አንድ ጊዜና በእያንዳንዱ ዓምድ (ጥላ) አንድ ጊዜ።', 'ረድፎችን፣ ዓምዶችንና የሕክምና መለያዎችን በማቀላቀል በዘፈቀደ አድርግ።', 'እያንዳንዱን plot አጭድና መዝን።', 'ከረድፎች፣ ከዓምዶችና ከሕክምናዎች ጋር ANOVA።', 'error mean squareን በረድፎች ብቻ block ከሚያደርግ ትንተና ጋር አወዳድር።']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(21); n = 5
base = (np.arange(n)[:, None] + np.arange(n)[None, :]) % n                       # cyclic square
sq = base[rng.permutation(n)][:, rng.permutation(n)]; labels = rng.permutation(n); sq = labels[sq]
rates = [0, 50, 100, 150, 200]; trt = np.array([0, 4.0, 6.5, 7.5, 7.8])
y = 18 + np.linspace(-3, 3, n)[:, None] + np.linspace(-2.5, 2.5, n)[None, :] + trt[sq] + rng.normal(0, 1.0, (n, n))   # t/ha
g = y.mean(); ss_tot = ((y - g) ** 2).sum()
ss_r = n * ((y.mean(1) - g) ** 2).sum(); ss_c = n * ((y.mean(0) - g) ** 2).sum()
tm = np.array([y[sq == k].mean() for k in range(n)]); ss_t = n * ((tm - g) ** 2).sum()
mse_ls = (ss_tot - ss_r - ss_c - ss_t) / ((n - 1) * (n - 2)); mse_rows = (ss_tot - ss_r - ss_t) / ((n - 1) * (n - 1))
F = (ss_t / (n - 1)) / mse_ls; p = stats.f.sf(F, n - 1, (n - 1) * (n - 2))
print("layout (treatment index per plot):"); print(sq)
print("treatment means (t/ha):", {r: round(float(m), 1) for r, m in zip(rates, tm)})
print(f"MSE Latin square {mse_ls:.2f}; MSE blocking rows only {mse_rows:.2f}; F = {F:.1f}, p = {p:.2g}")
''',
 viz=lambda ns: [line(B('Potato yield by fertiliser rate (t/ha)', 'የድንች ምርት በማዳበሪያ መጠን (t/ha)'), ns['rates'], [(B('Mean yield', 'አማካይ ምርት'), list(ns['tm']), 1)], B('Fertiliser (kg/ha)', 'ማዳበሪያ (kg/ha)'), 't/ha'),
                 hbar(B('Error mean square: Latin square vs rows only', 'Error mean square፡ Latin square vs ረድፎች ብቻ'), [B('Rows and columns (Latin square)', 'ረድፎችና ዓምዶች (Latin square)'), B('Rows only (RCBD)', 'ረድፎች ብቻ (RCBD)')], [('MSE', [ns['mse_ls'], ns['mse_rows']], 1)], 'MSE', fmt=2)],
 analysis=lambda ns: ([f"Removing both gradients gives MSE {ns['mse_ls']:.2f}, against {ns['mse_rows']:.2f} when only the slope is blocked.", f"Fertiliser effects are clear (F = {ns['F']:.0f}); yield rises steeply to 100 kg/ha and flattens after 150 kg/ha.", 'A Latin square needs as many replicates as treatments, so it suits 4–8 treatments, not large variety trials.'],
                      [f"ሁለቱንም ልዩነቶች ማስወገድ MSE {ns['mse_ls']:.2f} ይሰጣል፤ ተዳፋቱ ብቻ block ሲደረግ {ns['mse_rows']:.2f}።", f"የማዳበሪያ ውጤቶች ግልጽ ናቸው (F = {ns['F']:.0f})፤ ምርት እስከ 100 kg/ha በፍጥነት ይጨምራል፣ ከ150 kg/ha በኋላ ይረጋጋል።", 'Latin square እንደ ሕክምናዎች ብዛት replicates ይፈልጋል፤ ስለዚህ ለ4–8 ሕክምናዎች ይስማማል እንጂ ለትላልቅ የዝርያ ሙከራዎች አይደለም።']),
 decision=lambda ns: ('Use a Latin square when there are two clear gradients and few treatments; for this hillside recommend 100–150 kg/ha and test the economics next.', 'ሁለት ግልጽ ልዩነቶችና ጥቂት ሕክምናዎች ሲኖሩ Latin square ተጠቀም፤ ለዚህ ኮረብታ 100–150 kg/ha ምከርና ቀጥሎ ኢኮኖሚውን ፈትሽ።'), note=SIM))
S4.append(lab(('Factorial N × P: is there an interaction?', 'Factorial N × P፡ መስተጋብር አለ?'),
 ('Run a 3 × 3 factorial of nitrogen and phosphorus on teff in 3 blocks, test main effects and the interaction, and choose the best combination.', 'በጤፍ ላይ የናይትሮጅንና የፎስፈረስ 3 × 3 factorialን በ3 blocks አካሂድ፣ ዋና ውጤቶችንና መስተጋብርን ፈትሽ፣ ምርጡን ጥምረት ምረጥ።'), W,
 [FIELD, SCALE, PY, SP, R_],
 (['Treatments: N 0, 46, 92 kg/ha × P 0, 20, 40 kg/ha = 9 combinations, randomised in each of 3 blocks.', 'Harvest grain yield per plot.', 'Two-way ANOVA with blocks: N, P and N × P.', 'Draw the interaction plot: yield vs N, one line per P level.', 'Choose the combination; if the interaction is significant, do not judge N without P.'],
  ['ሕክምናዎች፡ N 0፣ 46፣ 92 kg/ha × P 0፣ 20፣ 40 kg/ha = 9 ጥምረቶች፣ በእያንዳንዱ ከ3 blocks በዘፈቀደ።', 'የእህል ምርትን በplot አጭድ።', 'ከblocks ጋር two-way ANOVA፡ N፣ P እና N × P።', 'የመስተጋብር ቻርቱን ሣል፡ ምርት vs N፣ በP ደረጃ አንድ መስመር።', 'ጥምረቱን ምረጥ፤ መስተጋብሩ ጉልህ ከሆነ Nን ያለ P አትፍረድ።']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(3); N, P, b = [0, 46, 92], [0, 20, 40], 3
mean = np.array([[0.9, 1.1, 1.2], [1.2, 1.7, 1.9], [1.3, 2.0, 2.4]])         # rows N, cols P (t/ha): N works only with P
y = mean[None] + rng.normal(0, 0.12, (b, 3, 3)) + np.array([-0.1, 0, 0.1])[:, None, None]
g = y.mean(); ss_tot = ((y - g) ** 2).sum()
ss_blk = 9 * ((y.mean((1, 2)) - g) ** 2).sum(); ss_n = 9 * ((y.mean((0, 2)) - g) ** 2).sum(); ss_p = 9 * ((y.mean((0, 1)) - g) ** 2).sum()
cell = y.mean(0); ss_cells = b * ((cell - g) ** 2).sum(); ss_np = ss_cells - ss_n - ss_p
ss_e = ss_tot - ss_blk - ss_cells; df_e = (b - 1) * 8; mse = ss_e / df_e
tests = {"N": (ss_n, 2), "P": (ss_p, 2), "N x P": (ss_np, 4)}
pv = {}
for k, (ss, df) in tests.items():
    F = (ss / df) / mse; pv[k] = stats.f.sf(F, df, df_e); print(f"{k:6s} F = {F:6.1f}, p = {pv[k]:.2g}")
best = np.unravel_index(cell.argmax(), cell.shape); print(f"best: N {N[best[0]]} + P {P[best[1]]} = {cell.max():.2f} t/ha")
gainN_P0, gainN_P40 = cell[2, 0] - cell[0, 0], cell[2, 2] - cell[0, 2]
''',
 viz=lambda ns: [line(B('Interaction plot: teff yield (t/ha)', 'የመስተጋብር ቻርት፡ የጤፍ ምርት (t/ha)'), ns['N'], [(B(f'P {p} kg/ha', f'P {p} kg/ha'), list(ns['cell'][:, j]), j + 1) for j, p in enumerate(ns['P'])], B('Nitrogen (kg/ha)', 'ናይትሮጅን (kg/ha)'), 't/ha', ymin=0)],
 analysis=lambda ns: ([f"The N × P interaction is significant (p = {ns['pv']['N x P']:.2g}): the lines are not parallel.", f"Without P, 92 kg N adds only {ns['gainN_P0']:.2f} t/ha; with 40 kg P it adds {ns['gainN_P40']:.2f} t/ha.", f"The best combination is N {ns['N'][ns['best'][0]]} + P {ns['P'][ns['best'][1]]} ({ns['cell'].max():.2f} t/ha)."],
                      [f"የN × P መስተጋብር ጉልህ ነው (p = {ns['pv']['N x P']:.2g})፡ መስመሮቹ ትይዩ አይደሉም።", f"ያለ P፣ 92 kg N የሚጨምረው {ns['gainN_P0']:.2f} t/ha ብቻ ነው፤ ከ40 kg P ጋር {ns['gainN_P40']:.2f} t/ha ይጨምራል።", f"ምርጡ ጥምረት N {ns['N'][ns['best'][0]]} + P {ns['P'][ns['best'][1]]} ነው ({ns['cell'].max():.2f} t/ha)።"]),
 decision=lambda ns: ('Recommend nitrogen and phosphorus together, never nitrogen alone on these soils; next test whether 92 N + 40 P is also the economic optimum.', 'በእነዚህ አፈሮች ላይ ናይትሮጅንን ብቻውን በፍጹም ሳይሆን ናይትሮጅንና ፎስፈረስን በአንድ ላይ ምከር፤ ቀጥሎ 92 N + 40 P ኢኮኖሚያዊ ምርጥም መሆኑን ፈትሽ።'), note=SIM))
S4.append(lab(('Split-plot: irrigation × variety with the right error terms', 'Split-plot፡ መስኖ × ዝርያ ከትክክለኛ የስህተት ቃላት ጋር'),
 ('Analyse an onion trial with irrigation on large main plots and varieties on subplots, and show what goes wrong if you analyse it as an ordinary factorial.', 'መስኖ በትላልቅ ዋና plots ላይና ዝርያዎች በsubplots ላይ ያሉበትን የሽንኩርት ሙከራ ተንትን፣ እንደ ተራ factorial ብትተነትነው ምን እንደሚበላሽ አሳይ።'), W,
 [FIELD, SCALE, PY, SP, ASREML],
 (['Main plots: 3 irrigation intervals (5, 10, 15 days) in 4 blocks (hard to change, so big plots).', 'Subplots: 4 onion varieties randomised inside each main plot.', 'Error A (block × irrigation) tests irrigation; error B tests variety and the interaction.', 'Compare with the wrong analysis that uses one error for everything.', 'Draw conclusions for each factor.'],
  ['ዋና plots፡ 3 የመስኖ ክፍተቶች (5፣ 10፣ 15 ቀናት) በ4 blocks (ለመቀየር ከባድ ስለሆኑ ትላልቅ plots)።', 'Subplots፡ በእያንዳንዱ ዋና plot ውስጥ በዘፈቀደ የተቀመጡ 4 የሽንኩርት ዝርያዎች።', 'Error A (block × መስኖ) መስኖን ይፈትናል፤ error B ዝርያንና መስተጋብሩን ይፈትናል።', 'ለሁሉም ነገር አንድ ስህተት ከሚጠቀመው የተሳሳተ ትንተና ጋር አወዳድር።', 'ለእያንዳንዱ ፋክተር መደምደሚያዎችን አውጣ።']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(9); b, a, v = 4, 3, 4
irr = np.array([0.0, -2.0, -6.0]); var = np.array([0.0, 2.5, 1.0, -1.0])
whole = rng.normal(0, 2.2, (b, a))                                            # main-plot error: big plots differ a lot
y = 30 + rng.normal(0, 1, b)[:, None, None] + irr[None, :, None] + var[None, None, :] + whole[:, :, None] + rng.normal(0, 1.0, (b, a, v))
g = y.mean(); ss_tot = ((y - g) ** 2).sum()
ss_b = a * v * ((y.mean((1, 2)) - g) ** 2).sum(); ss_a = b * v * ((y.mean((0, 2)) - g) ** 2).sum()
ss_main = v * ((y.mean(2) - g) ** 2).sum(); ss_ea = ss_main - ss_b - ss_a
ss_v = b * a * ((y.mean((0, 1)) - g) ** 2).sum(); ss_av = b * ((y.mean(0) - g) ** 2).sum() - ss_a - ss_v
ss_eb = ss_tot - ss_main - ss_v - ss_av
df = {"A": a - 1, "Ea": (b - 1) * (a - 1), "V": v - 1, "AV": (a - 1) * (v - 1), "Eb": a * (b - 1) * (v - 1)}
ms_ea, ms_eb = ss_ea / df["Ea"], ss_eb / df["Eb"]
right = {"irrigation": stats.f.sf((ss_a / df["A"]) / ms_ea, df["A"], df["Ea"]), "variety": stats.f.sf((ss_v / df["V"]) / ms_eb, df["V"], df["Eb"]), "irr x var": stats.f.sf((ss_av / df["AV"]) / ms_eb, df["AV"], df["Eb"])}
pooled = (ss_ea + ss_eb) / (df["Ea"] + df["Eb"])
wrong_irr = stats.f.sf((ss_a / df["A"]) / pooled, df["A"], df["Ea"] + df["Eb"])
print(f"error A (main plots) MS {ms_ea:.1f}; error B (subplots) MS {ms_eb:.1f}")
print("correct split-plot p-values:", {k: f"{p:.2g}" for k, p in right.items()}); print(f"wrong analysis, irrigation p = {wrong_irr:.2g}")
irr_means = y.mean((0, 2)).round(1); var_means = y.mean((0, 1)).round(1)
''',
 viz=lambda ns: [hbar(B('Error mean squares: main plots vs subplots', 'Error mean squares፡ ዋና plots vs subplots'), [B('Error A (main plots)', 'Error A (ዋና plots)'), B('Error B (subplots)', 'Error B (subplots)')], [('MS', [ns['ms_ea'], ns['ms_eb']], 1)], 'MS', fmt=1),
                 hbar(B('Onion yield by irrigation interval (t/ha)', 'የሽንኩርት ምርት በመስኖ ክፍተት (t/ha)'), [B('Every 5 days', 'በየ5 ቀናት'), B('Every 10 days', 'በየ10 ቀናት'), B('Every 15 days', 'በየ15 ቀናት')], [(B('t/ha', 't/ha'), list(ns['irr_means']), 2)], 't/ha', fmt=1)],
 analysis=lambda ns: ([f"Main plots vary much more than subplots (error A {ns['ms_ea']:.1f} vs error B {ns['ms_eb']:.1f}), so irrigation is estimated less precisely.", f"Correct analysis: irrigation p = {ns['right']['irrigation']:.2g}; the wrong single-error analysis gives p = {ns['wrong_irr']:.2g}, far too confident.", f"Varieties are compared precisely within main plots (p = {ns['right']['variety']:.2g})."],
                      [f"ዋና plots ከsubplots በጣም ይለያያሉ (error A {ns['ms_ea']:.1f} vs error B {ns['ms_eb']:.1f})፤ ስለዚህ መስኖ በያነሰ ትክክለኛነት ይገመታል።", f"ትክክለኛ ትንተና፡ መስኖ p = {ns['right']['irrigation']:.2g}፤ የተሳሳተው ባለአንድ-ስህተት ትንተና p = {ns['wrong_irr']:.2g} ይሰጣል፣ በጣም ከልክ በላይ እርግጠኛ።", f"ዝርያዎች በዋና plots ውስጥ በትክክል ይወዳደራሉ (p = {ns['right']['variety']:.2g})።"]),
 decision=lambda ns: ('Always analyse split-plots with two error terms (or a mixed model with main plot as random); for irrigation conclusions, add main-plot replicates, not subplots.', 'split-plotsን ሁልጊዜ በሁለት የስህተት ቃላት ተንትን (ወይም ዋና plot random የሆነበት mixed model)፤ ለመስኖ መደምደሚያዎች subplots ሳይሆን የዋና-plot replicates ጨምር።'), note=SIM))
S4.append(lab(('Messy data: disease scores and a covariate', 'የተዘበራረቀ ዳታ፡ የበሽታ ውጤቶችና covariate'),
 ('Compare fungicides with ordinal rust scores using a Kruskal–Wallis test, and compare pig diets using starting weight as a covariate (ANCOVA).', 'ፈንገስ መድኃኒቶችን በደረጃ የዝገት ውጤቶች በKruskal–Wallis ፈተና አወዳድር፤ የአሳማ አመጋገቦችንም የመነሻ ክብደትን እንደ covariate (ANCOVA) በመጠቀም አወዳድር።'), W1,
 [PY, SP, NP, R_],
 (['Rust is scored 1–9 on 10 plots per fungicide: scores are ranks, not measurements.', 'Use Kruskal–Wallis (rank-based) instead of ANOVA.', 'Pigs: 3 diets × 8 pigs; record starting and final weights.', 'ANOVA on gain vs ANCOVA adjusting for starting weight.', 'Report adjusted means.'],
  ['ዝገት በእያንዳንዱ ፈንገስ መድኃኒት በ10 plots ላይ 1–9 ይመዘገባል፡ ውጤቶቹ ደረጃዎች ናቸው እንጂ ልኬቶች አይደሉም።', 'ከANOVA ይልቅ Kruskal–Wallis (በደረጃ ላይ የተመሠረተ) ተጠቀም።', 'አሳማዎች፡ 3 አመጋገቦች × 8 አሳማዎች፤ የመነሻና የመጨረሻ ክብደቶችን መዝግብ።', 'በጭማሪ ላይ ANOVA vs ለመነሻ ክብደት የሚያስተካክል ANCOVA።', 'የተስተካከሉ አማካዮችን ዘግብ።']),
 '''
import numpy as np
from scipy import stats
scores = {"none": [7, 8, 6, 9, 7, 8, 7, 6, 8, 9], "fungicide A": [4, 5, 3, 6, 4, 5, 4, 5, 3, 4], "fungicide B": [5, 6, 5, 7, 6, 4, 6, 5, 6, 7]}
H, p_kw = stats.kruskal(*scores.values()); med = {k: float(np.median(v)) for k, v in scores.items()}
print(f"Kruskal-Wallis H = {H:.1f}, p = {p_kw:.2g}; medians {med}")
rng = np.random.default_rng(2); diet = np.repeat([0, 1, 2], 8)
start = rng.normal(20, 3, 24); gain = 30 + 1.2 * (start - 20) + np.array([0, 2.0, 3.5])[diet] + rng.normal(0, 1.5, 24)
F_anova, p_anova = stats.f_oneway(*[gain[diet == d] for d in range(3)])
X = np.column_stack([np.ones(24), diet == 1, diet == 2, start - start.mean()])
beta, res, *_ = np.linalg.lstsq(X, gain, rcond=None); X0 = X[:, [0, 3]]; res0 = np.sum((gain - X0 @ np.linalg.lstsq(X0, gain, rcond=None)[0]) ** 2)
F_anc = ((res0 - res[0]) / 2) / (res[0] / 20); p_anc = stats.f.sf(F_anc, 2, 20)
adj = [beta[0], beta[0] + beta[1], beta[0] + beta[2]]; raw = [gain[diet == d].mean() for d in range(3)]
print(f"ANOVA on gain: p = {p_anova:.3f}; ANCOVA with starting weight: p = {p_anc:.2g}, slope {beta[3]:.2f} kg gain per kg start")
print("raw means", np.round(raw, 1), "adjusted means", np.round(adj, 1))
''',
 viz=lambda ns: [hbar(B('Median rust score (1 = clean, 9 = severe)', 'Median የዝገት ውጤት (1 = ንጹሕ፣ 9 = ከባድ)'), list(ns['med']), [(B('Median score', 'Median ውጤት'), list(ns['med'].values()), 2)], B('Score', 'ውጤት'), fmt=1),
                 hbar(B('Pig weight gain: raw and adjusted for starting weight (kg)', 'የአሳማ ክብደት ጭማሪ፡ ጥሬና ለመነሻ ክብደት የተስተካከለ (kg)'), [B('Diet 1', 'አመጋገብ 1'), B('Diet 2', 'አመጋገብ 2'), B('Diet 3', 'አመጋገብ 3')], [(B('Raw', 'ጥሬ'), ns['raw'], 0), (B('Adjusted', 'የተስተካከለ'), ns['adj'], 1)], 'kg', fmt=1)],
 analysis=lambda ns: ([f"Fungicides differ in rust scores (Kruskal–Wallis p = {ns['p_kw']:.2g}); A gives the lowest median ({ns['med']['fungicide A']:.0f}).", f"Plain ANOVA on pig gain gives p = {ns['p_anova']:.3f}; adjusting for starting weight gives p = {ns['p_anc']:.2g}, because heavier pigs grow faster and that variation is removed.", 'Ranks and covariates rescue messy data without throwing away observations.'],
                      [f"ፈንገስ መድኃኒቶች በዝገት ውጤቶች ይለያያሉ (Kruskal–Wallis p = {ns['p_kw']:.2g})፤ A ዝቅተኛውን median ይሰጣል ({ns['med']['fungicide A']:.0f})።", f"በአሳማ ጭማሪ ላይ ተራ ANOVA p = {ns['p_anova']:.3f} ይሰጣል፤ ለመነሻ ክብደት ማስተካከል p = {ns['p_anc']:.2g} ይሰጣል፣ ከበድ ያሉ አሳማዎች በፍጥነት ስለሚያድጉና ያ ልዩነት ስለሚወገድ።", 'ደረጃዎችና covariates ምልከታዎችን ሳይጥሉ የተዘበራረቀ ዳታን ያድናሉ።']),
 decision=lambda ns: ('Recommend fungicide A; for animal trials always record starting weight and analyse with ANCOVA. Report medians for scores, adjusted means for gains.', 'ፈንገስ መድኃኒት Aን ምከር፤ ለእንስሳት ሙከራዎች የመነሻ ክብደትን ሁልጊዜ መዝግብና በANCOVA ተንትን። ለውጤቶች mediansን፣ ለጭማሪዎች የተስተካከሉ አማካዮችን ዘግብ።'), note=SIM))
emit_labs('s', 4, S4, 8)

S5 = []
S5.append(lab(('Alpha-lattice: adjusting for incomplete blocks', 'Alpha-lattice፡ ለincomplete blocks ማስተካከል'),
 ('Simulate a 36-entry trial in incomplete blocks of 6, compare simple means with block-adjusted estimates, and measure how often the true best entries are selected.', 'በ6 incomplete blocks ውስጥ የ36-ግቤት ሙከራን አስመስል፣ ቀላል አማካዮችን ከblock-የተስተካከሉ ግምቶች ጋር አወዳድር፣ እውነተኛዎቹ ምርጥ ግቤቶች ምን ያህል ጊዜ እንደሚመረጡ ለካ።'), W,
 [PY, NP, FIELD, ASREML],
 (['36 wheat lines, 2 replicates, each replicate split into 6 blocks of 6 plots (CycDesigN or agricolae design.alpha).', 'Each block has its own fertility.', 'Estimate line effects two ways: plain means, and a least-squares model with replicate and block effects.', 'Repeat 300 times; record the correlation with the true values and how many of the true top 6 are selected.', 'Use a mixed model (blocks random) in R for the real analysis.'],
  ['36 የስንዴ መስመሮች፣ 2 replicates፣ እያንዳንዱ replicate ወደ 6 plots 6 blocks የተከፈለ (CycDesigN ወይም agricolae design.alpha)።', 'እያንዳንዱ block የራሱ ለምነት አለው።', 'የመስመር ውጤቶችን በሁለት መንገዶች ገምት፡ ተራ አማካዮች፣ እና ከreplicate እና block ውጤቶች ጋር least-squares ሞዴል።', '300 ጊዜ ድገም፤ ከእውነተኛ እሴቶቹ ጋር correlationን እና ከእውነተኛዎቹ ከፍተኛ 6 ስንቱ እንደሚመረጡ መዝግብ።', 'ለእውነተኛው ትንተና በR ውስጥ mixed model (blocks random) ተጠቀም።']),
 '''
import numpy as np
rng = np.random.default_rng(4); L, R, K = 36, 2, 6
def one_trial():
    g = rng.normal(0, 0.3, L); rows = []
    for r in range(R):
        order = rng.permutation(L)
        for blk in range(L // K):
            eff = rng.normal(0, 0.5)
            for e in order[blk * K:(blk + 1) * K]: rows.append((e, r, r * 6 + blk, 4 + g[e] + eff + rng.normal(0, 0.25)))
    e, r, b, y = map(np.array, zip(*rows))
    plain = np.array([y[e == i].mean() for i in range(L)])
    X = np.zeros((len(y), L + R * 6)); X[np.arange(len(y)), e] = 1; X[np.arange(len(y)), L + b] = 1
    beta = np.linalg.lstsq(X, y, rcond=None)[0][:L]                                   # intra-block (blocks fixed)
    top = set(np.argsort(-g)[:6])
    return [np.corrcoef(est, g)[0, 1] for est in (plain, beta)] + [len(top & set(np.argsort(-est)[:6])) for est in (plain, beta)]
res = np.array([one_trial() for _ in range(300)])
print(f"correlation with true values: plain means {res[:, 0].mean():.2f}, block-adjusted {res[:, 1].mean():.2f}")
print(f"true top-6 lines selected: plain {res[:, 2].mean():.1f}, block-adjusted {res[:, 3].mean():.1f} (of 6)")
''',
 viz=lambda ns: [hbar(B('Over 300 simulated trials', 'በ300 የተመሰሉ ሙከራዎች'), [B('Correlation with true merit', 'ከእውነተኛ ብቃት ጋር correlation'), B('True top-6 lines selected (÷6)', 'የተመረጡ እውነተኛ ከፍተኛ-6 መስመሮች (÷6)')], [(B('Plain means', 'ተራ አማካዮች'), [ns['res'][:, 0].mean(), ns['res'][:, 2].mean() / 6], 2), (B('Block-adjusted', 'block-የተስተካከለ'), [ns['res'][:, 1].mean(), ns['res'][:, 3].mean() / 6], 1)], B('Proportion', 'መጠን'), fmt=2)],
 analysis=lambda ns: ([f"Plain means correlate {ns['res'][:, 0].mean():.2f} with true merit; block-adjusted estimates {ns['res'][:, 1].mean():.2f}.", f"Adjustment picks {ns['res'][:, 3].mean():.1f} of the true top 6 lines on average, against {ns['res'][:, 2].mean():.1f} with plain means.", 'Small blocks capture local fertility that a full replicate of 36 plots cannot; a mixed model with random blocks recovers a little more information.'],
                      [f"ተራ አማካዮች ከእውነተኛ ብቃት ጋር {ns['res'][:, 0].mean():.2f} ይዛመዳሉ፤ block-የተስተካከሉ ግምቶች {ns['res'][:, 1].mean():.2f}።", f"ማስተካከያው በአማካይ ከእውነተኛዎቹ ከፍተኛ 6 መስመሮች {ns['res'][:, 3].mean():.1f}ን ይመርጣል፤ በተራ አማካዮች {ns['res'][:, 2].mean():.1f}።", 'ትናንሽ blocks የ36 plots ሙሉ replicate ሊይዘው የማይችለውን የአካባቢ ለምነት ይይዛሉ፤ random blocks ያለው mixed model ትንሽ ተጨማሪ መረጃ ያገኛል።']),
 decision=lambda ns: ('For trials with more than about 15 entries use an alpha-lattice and analyse with a mixed model; never report plain means from such a design.', 'ከ15 ገደማ በላይ ግቤቶች ላሉ ሙከራዎች alpha-lattice ተጠቀምና በmixed model ተንትን፤ ከእንዲህ ዓይነት ንድፍ ተራ አማካዮችን በፍጹም አትዘግብ።'), note=SIM))
S5.append(lab(('Multi-environment trial: stability and G × E', 'ባለብዙ-አካባቢ ሙከራ፡ መረጋጋትና G × E'),
 ('Analyse 8 maize hybrids in 6 environments: estimate means and Finlay–Wilkinson stability slopes, and decide which hybrids to recommend widely and which only for good environments.', '8 የበቆሎ hybrids በ6 አካባቢዎች ተንትን፡ አማካዮችንና የFinlay–Wilkinson የመረጋጋት slopesን ገምት፤ የትኞቹ hybrids በሰፊው፣ የትኞቹ ደግሞ ለጥሩ አካባቢዎች ብቻ እንደሚመከሩ ወስን።'), W,
 [PY, NP, SP, T('R: metan or statgenGxE (next step)', 'AMMI and GGE biplots', 'AMMI እና GGE biplots', 'cran.r-project.org')],
 (['Collect hybrid means from each site (each site analysed as its own RCBD first).', 'Environment index = mean of all hybrids at the site.', 'For each hybrid regress its yield on the environment index: slope b and deviations.', 'Plot mean yield against slope.', 'Check the interaction with an SVD of the G × E table (AMMI idea).'],
  ['ከእያንዳንዱ ቦታ የhybrid አማካዮችን ሰብስብ (እያንዳንዱ ቦታ መጀመሪያ እንደ ራሱ RCBD ተተንትኖ)።', 'የአካባቢ መለኪያ = በቦታው የሁሉም hybrids አማካይ።', 'ለእያንዳንዱ hybrid ምርቱን በአካባቢ መለኪያው ላይ regress አድርግ፡ slope b እና ልዩነቶች።', 'አማካይ ምርትን ከslope አንፃር ቻርት አድርግ።', 'መስተጋብሩን በG × E ሰንጠረዡ SVD ፈትሽ (የAMMI ሐሳብ)።']),
 '''
import numpy as np
rng = np.random.default_rng(6); G, E = 8, 6
hybrids = [f"H{i + 1}" for i in range(G)]; env_eff = np.array([-2.5, -1.5, -0.5, 0.5, 1.5, 2.5])
g_mean = np.array([0.4, 0.2, 0.0, 0.3, -0.2, 0.5, -0.4, 0.1]); slope = np.array([1.35, 0.7, 1.0, 1.1, 0.8, 1.25, 0.9, 1.0])
Y = 6 + g_mean[:, None] + slope[:, None] * env_eff[None, :] + rng.normal(0, 0.25, (G, E))
idx = Y.mean(0) - Y.mean(); b = np.array([np.polyfit(idx, Y[i], 1)[0] for i in range(G)]); mean = Y.mean(1)
GE = Y - Y.mean(1, keepdims=True) - Y.mean(0, keepdims=True) + Y.mean()
sv = np.linalg.svd(GE, compute_uv=False); share = sv ** 2 / (sv ** 2).sum()
for h, m, s in zip(hybrids, mean, b): print(f"{h}: mean {m:.2f} t/ha, stability slope {s:.2f}")
print(f"G x E explained by the first interaction axis: {share[0]:.0%}")
poor_env = Y[:, 0]; rich_env = Y[:, -1]; best_poor, best_rich = hybrids[poor_env.argmax()], hybrids[rich_env.argmax()]
wide = [h for h, m, s in zip(hybrids, mean, b) if m > mean.mean() and abs(s - 1) < 0.15]
print(f"best in the poorest site: {best_poor}; best in the richest: {best_rich}; above-average and stable: {wide}")
''',
 viz=lambda ns: [scatter(B('Mean yield vs stability slope (1 = average response)', 'አማካይ ምርት vs የመረጋጋት slope (1 = አማካይ ምላሽ)'), ns['b'], ns['mean'], B('Stability slope b', 'የመረጋጋት slope b'), B('Mean yield (t/ha)', 'አማካይ ምርት (t/ha)'), fit=False, labels=ns['hybrids'], refs=[{'kind': 'v', 'v': 1.0, 'label': 'b = 1'}, {'kind': 'h', 'v': float(ns['mean'].mean()), 'label': B('average', 'አማካይ')}]),
                 line(B('Hybrid yield across environments (t/ha)', 'የhybrid ምርት በአካባቢዎች (t/ha)'), [round(float(x), 2) for x in ns['idx']], [(B(ns['hybrids'][i], ns['hybrids'][i]), list(ns['Y'][i]), j + 1) for j, i in enumerate([int(ns['b'].argmax()), int(ns['b'].argmin()), 3])], B('Environment index (t/ha)', 'የአካባቢ መለኪያ (t/ha)'), 't/ha', xint=False)],
 analysis=lambda ns: ([f"{ns['hybrids'][int(ns['b'].argmax())]} responds most to good conditions (slope {ns['b'].max():.2f}) and {ns['hybrids'][int(ns['b'].argmin())]} the least ({ns['b'].min():.2f}).", f"The best hybrid in the poorest site is {ns['best_poor']}, in the richest {ns['best_rich']}: rankings change, which is G × E.", f"Above-average and stable (slope near 1): {', '.join(ns['wide']) or 'none'}; the first interaction axis explains {ns['share'][0]:.0%} of G × E."],
                      [f"{ns['hybrids'][int(ns['b'].argmax())]} ለጥሩ ሁኔታዎች በብዛት ምላሽ ይሰጣል (slope {ns['b'].max():.2f})፣ {ns['hybrids'][int(ns['b'].argmin())]} ደግሞ በትንሹ ({ns['b'].min():.2f})።", f"በድሃው ቦታ ምርጡ hybrid {ns['best_poor']}፣ በሀብታሙ {ns['best_rich']} ነው፡ ደረጃዎች ይለወጣሉ፣ ይህም G × E ነው።", f"ከአማካይ በላይና የተረጋጉ (slope ወደ 1)፡ {', '.join(ns['wide']) or 'የሉም'}፤ የመጀመሪያው የመስተጋብር ዘንግ {ns['share'][0]:.0%} G × Eን ያብራራል።"]),
 decision=lambda ns: (f"Recommend {', '.join(ns['wide']) or ns['best_poor']} widely; recommend {ns['best_rich']} only for high-potential areas with good inputs, and {ns['best_poor']} for low-input areas.", f"{', '.join(ns['wide']) or ns['best_poor']}ን በሰፊው ምከር፤ {ns['best_rich']}ን ጥሩ ግብዓቶች ላሏቸው ከፍተኛ-አቅም አካባቢዎች ብቻ፣ {ns['best_poor']}ን ደግሞ ለዝቅተኛ-ግብዓት አካባቢዎች ምከር።"), note=SIM))
S5.append(lab(('Spatial analysis: adjusting for neighbouring plots', 'Spatial ትንተና፡ ለጎረቤት plots ማስተካከል'),
 ('Simulate a 200-plot variety trial on a field with patchy fertility, compare an RCBD analysis with a nearest-neighbour (Papadakis) adjustment, and measure the gain in accuracy.', 'የተበጣጠሰ ለምነት ባለው ማሳ ላይ የ200-plot የዝርያ ሙከራ አስመስል፣ የRCBD ትንተናን ከnearest-neighbour (Papadakis) ማስተካከያ ጋር አወዳድር፣ የaccuracy ትርፉን ለካ።'), W,
 [PY, NP, T('R: SpATS or ASReml AR1×AR1 (next step)', 'full spatial models', 'ሙሉ spatial ሞዴሎች', 'cran.r-project.org')],
 (['Field: 20 rows × 10 columns, 50 varieties × 4 blocks (5 rows each).', 'Fertility varies smoothly in patches (spatial correlation).', 'Analysis 1: RCBD (variety + block).', 'Analysis 2: add the mean residual of each plot’s row-neighbours as a covariate (Papadakis).', 'Repeat 200 times; compare the correlation with true variety effects.'],
  ['ማሳ፡ 20 ረድፎች × 10 ዓምዶች፣ 50 ዝርያዎች × 4 blocks (እያንዳንዳቸው 5 ረድፎች)።', 'ለምነት በቁርጥራጮች በለስላሳ ይለያያል (spatial correlation)።', 'ትንተና 1፡ RCBD (ዝርያ + block)።', 'ትንተና 2፡ የእያንዳንዱን plot የረድፍ ጎረቤቶች አማካይ residual እንደ covariate ጨምር (Papadakis)።', '200 ጊዜ ድገም፤ ከእውነተኛ የዝርያ ውጤቶች ጋር ያለውን correlation አወዳድር።']),
 '''
import numpy as np
rng = np.random.default_rng(12); R, C, V = 20, 10, 50
def smooth(field, k=3):
    out = field.copy()
    for _ in range(k): out = (out + np.roll(out, 1, 0) + np.roll(out, -1, 0) + np.roll(out, 1, 1) + np.roll(out, -1, 1)) / 5
    return out
def trial():
    g = rng.normal(0, 0.25, V); fert = smooth(rng.normal(0, 1.4, (R, C)))
    var = np.zeros((R, C), int); blk = np.repeat(np.arange(4), 5)
    for b in range(4): var[b * 5:(b + 1) * 5] = rng.permutation(V).reshape(5, C)
    y = 4 + g[var] + fert + rng.normal(0, 0.2, (R, C))
    def fit(extra=None):
        X = [np.eye(V)[var.ravel()], np.eye(4)[np.repeat(blk, C)][:, 1:]]
        if extra is not None: X.append(extra.ravel()[:, None])
        X = np.hstack(X); beta, *_ = np.linalg.lstsq(X, y.ravel(), rcond=None); return beta[:V], y.ravel() - X @ beta
    rcbd, resid = fit(); res = resid.reshape(R, C)
    nb = (np.pad(res, ((0, 0), (1, 0)))[:, :-1] + np.pad(res, ((0, 0), (0, 1)))[:, 1:]) / np.where((np.arange(C) == 0) | (np.arange(C) == C - 1), 1, 2)
    pap, _ = fit(nb)
    return np.corrcoef(rcbd, g)[0, 1], np.corrcoef(pap, g)[0, 1]
res = np.array([trial() for _ in range(200)])
print(f"accuracy (correlation with true variety effects): RCBD {res[:, 0].mean():.2f}, neighbour-adjusted {res[:, 1].mean():.2f}")
print(f"trials where the neighbour adjustment was better: {np.mean(res[:, 1] > res[:, 0]):.0%}")
''',
 viz=lambda ns: [hbar(B('Accuracy of variety estimates (mean of 200 trials)', 'የዝርያ ግምቶች accuracy (የ200 ሙከራዎች አማካይ)'), [B('RCBD analysis', 'የRCBD ትንተና'), B('Neighbour-adjusted (Papadakis)', 'በጎረቤት የተስተካከለ (Papadakis)')], [(B('Correlation', 'Correlation'), [ns['res'][:, 0].mean(), ns['res'][:, 1].mean()], 1)], 'r', fmt=2)],
 analysis=lambda ns: ([f"With patchy fertility the RCBD analysis reaches accuracy {ns['res'][:, 0].mean():.2f}: blocks of 50 plots are too big to capture the patches.", f"Adjusting with neighbouring plots lifts accuracy to {ns['res'][:, 1].mean():.2f} and helps in {np.mean(ns['res'][:, 1] > ns['res'][:, 0]):.0%} of trials.", 'Neighbours share the same patch of soil, so their residuals tell us about the fertility under each plot.'],
                      [f"በተበጣጠሰ ለምነት የRCBD ትንተና {ns['res'][:, 0].mean():.2f} accuracy ይደርሳል፡ የ50 plots blocks ቁርጥራጮቹን ለመያዝ በጣም ትልቅ ናቸው።", f"በጎረቤት plots ማስተካከል accuracyን ወደ {ns['res'][:, 1].mean():.2f} ያሳድጋል፣ በ{np.mean(ns['res'][:, 1] > ns['res'][:, 0]):.0%} ሙከራዎችም ይረዳል።", 'ጎረቤቶች ያንኑ የአፈር ቁርጥራጭ ይጋራሉ፤ ስለዚህ residualsቸው ከእያንዳንዱ plot በታች ስላለው ለምነት ይነግሩናል።']),
 decision=lambda ns: ('Record row and column for every plot and analyse large trials with a spatial model (SpATS or AR1×AR1); keep the RCBD as the baseline and report which model fits better.', 'ለእያንዳንዱ plot ረድፍና ዓምድ መዝግብ፣ ትላልቅ ሙከራዎችን በspatial ሞዴል (SpATS ወይም AR1×AR1) ተንትን፤ RCBDን እንደ መነሻ አቆይና የትኛው ሞዴል የተሻለ እንደሚገጥም ዘግብ።'), note=SIM))
S5.append(lab(('Germination with a binomial GLM', 'መብቀል ከbinomial GLM ጋር'),
 ('Model the germination of sorghum seed stored four ways (50 seeds × 5 dishes each) with a logistic (binomial) GLM, check for overdispersion, and choose a storage method.', 'በአራት መንገዶች የተከማቸ የማሽላ ዘር መብቀልን (በእያንዳንዱ 50 ዘሮች × 5 ሳህኖች) በlogistic (binomial) GLM ሞዴል አድርግ፣ overdispersionን ፈትሽ፣ የማከማቻ ዘዴ ምረጥ።'), W1,
 [PY, NP, SP, T('Petri dishes, filter paper, germinator or warm room', 'run the germination test', 'የመብቀል ፈተናውን ማካሄድ', 'seed lab')],
 (['Storage: open sack, sack + ash, hermetic bag, hermetic bag + dried seed.', 'Count germinated seeds of 50 per dish after 7 days.', 'Fit a binomial GLM (logit link) by iteratively reweighted least squares.', 'Compare predicted germination with 95% intervals; check deviance ÷ df for overdispersion.', 'Compare storage methods on the odds scale.'],
  ['ማከማቻ፡ ክፍት ከረጢት፣ ከረጢት + አመድ፣ hermetic ከረጢት፣ hermetic ከረጢት + የደረቀ ዘር።', 'ከ7 ቀናት በኋላ በሳህን ከ50 የበቀሉ ዘሮችን ቁጠር።', 'binomial GLMን (logit link) በiteratively reweighted least squares ግጠም።', 'የተተነበየውን መብቀል ከ95% ክልሎች ጋር አወዳድር፤ ለoverdispersion deviance ÷ dfን ፈትሽ።', 'የማከማቻ ዘዴዎችን በodds ሚዛን አወዳድር።']),
 '''
import numpy as np
from scipy import stats
methods = ["open sack", "sack + ash", "hermetic bag", "hermetic + dried"]
germ = np.array([[31, 28, 34, 30, 27], [36, 38, 35, 39, 34], [42, 44, 41, 43, 45], [47, 46, 48, 45, 47]]); n = 50
y = germ.ravel(); grp = np.repeat(np.arange(4), 5); X = np.eye(4)[grp]
beta = np.zeros(4)
for _ in range(25):                                                     # IRLS for the logistic GLM
    eta = X @ beta; mu = 1 / (1 + np.exp(-eta)); w = n * mu * (1 - mu); z = eta + (y - n * mu) / w
    beta = np.linalg.solve(X.T @ (w[:, None] * X), X.T @ (w * z))
cov = np.linalg.inv(X.T @ (w[:, None] * X)); se = np.sqrt(np.diag(cov))
p_hat = 1 / (1 + np.exp(-beta)); lo = 1 / (1 + np.exp(-(beta - 1.96 * se))); hi = 1 / (1 + np.exp(-(beta + 1.96 * se)))
mu = n / (1 + np.exp(-X @ beta)); dev = 2 * np.sum(y * np.log(y / mu) + (n - y) * np.log((n - y) / (n - mu))); disp = dev / (len(y) - 4)
odds_ratio = np.exp(beta[3] - beta[0])
for m, p, a, b in zip(methods, p_hat, lo, hi): print(f"{m:17s} germination {p:.1%} (95% CI {a:.1%} to {b:.1%})")
print(f"deviance / df = {disp:.2f} (near 1: no overdispersion); odds ratio hermetic + dried vs open sack = {odds_ratio:.1f}")
''',
 viz=lambda ns: [dots(B('Predicted germination with 95% intervals (%)', 'የተተነበየ መብቀል ከ95% ክልሎች ጋር (%)'), ns['methods'], list(100 * ns['p_hat']), list(100 * ns['lo']), list(100 * ns['hi']), B('Percent germinated', 'የበቀለ መቶኛ'), ref0=False)],
 analysis=lambda ns: ([f"Germination rises from {ns['p_hat'][0]:.0%} in an open sack to {ns['p_hat'][3]:.0%} in a hermetic bag with dried seed.", f"The odds of germinating are {ns['odds_ratio']:.0f} times higher with hermetic storage of dried seed; intervals do not overlap.", f"Deviance/df = {ns['disp']:.2f}: the binomial model fits; above about 1.5 you would use a quasi-binomial or a random dish effect."],
                      [f"መብቀል በክፍት ከረጢት ከ{ns['p_hat'][0]:.0%} ወደ hermetic ከረጢት ከደረቀ ዘር ጋር {ns['p_hat'][3]:.0%} ይጨምራል።", f"የደረቀ ዘር በhermetic ማከማቻ የመብቀል odds {ns['odds_ratio']:.0f} እጥፍ ከፍ ያለ ነው፤ ክልሎቹ አይደራረቡም።", f"Deviance/df = {ns['disp']:.2f}፡ binomial ሞዴሉ ይገጥማል፤ ከ1.5 ገደማ በላይ ቢሆን quasi-binomial ወይም የዘፈቀደ የሳህን ውጤት ትጠቀም ነበር።"]),
 decision=lambda ns: ('Advise farmers and seed cooperatives to dry seed to below 12% moisture and store it in hermetic bags; analyse count data with a GLM, not ANOVA on percentages.', 'ገበሬዎችና የዘር ማኅበራት ዘርን ከ12% በታች እርጥበት እንዲያደርቁና በhermetic ከረጢቶች እንዲያከማቹ ምከር፤ የቆጠራ ዳታን በመቶኛዎች ላይ በANOVA ሳይሆን በGLM ተንትን።'), note=SIM))
S5.append(lab(('Nitrogen response and the economic optimum rate', 'የናይትሮጅን ምላሽና ኢኮኖሚያዊ ምርጥ መጠን'),
 ('Fit a quadratic response of wheat to nitrogen, find the economically optimum rate for current urea and grain prices, and see how it moves when prices change.', 'የስንዴን ለናይትሮጅን ያለውን quadratic ምላሽ ግጠም፣ ለአሁኑ የዩሪያና የእህል ዋጋዎች ኢኮኖሚያዊ ምርጥ መጠንን ፈልግ፣ ዋጋዎች ሲለወጡ እንዴት እንደሚንቀሳቀስ ተመልከት።'), W,
 [PY, NP, FIELD, SHEET],
 (['Trial: N 0, 23, 46, 69, 92, 115, 138 kg/ha in 4 blocks.', 'Fit yield = a + bN + cN².', 'Price ratio = price per kg N ÷ price per kg grain.', 'Economic optimum: N* = (ratio − b) ÷ (2c); compare with the maximum-yield rate −b ÷ 2c.', 'Repeat for a range of price ratios.'],
  ['ሙከራ፡ N 0፣ 23፣ 46፣ 69፣ 92፣ 115፣ 138 kg/ha በ4 blocks።', 'ምርት = a + bN + cN² ግጠም።', 'የዋጋ ሬሾ = በkg N ዋጋ ÷ በkg እህል ዋጋ።', 'ኢኮኖሚያዊ ምርጥ፡ N* = (ሬሾ − b) ÷ (2c)፤ ከከፍተኛ-ምርት መጠኑ −b ÷ 2c ጋር አወዳድር።', 'ለተለያዩ የዋጋ ሬሾዎች ድገም።']),
 '''
import numpy as np
rng = np.random.default_rng(1); N = np.repeat([0, 23, 46, 69, 92, 115, 138], 4)
y = 1800 + 32 * N - 0.13 * N ** 2 + rng.normal(0, 180, N.size)            # kg/ha
c, b, a = np.polyfit(N, y, 2)
urea_birr_per_kg, grain_birr_per_kg = 60, 45
price_N = urea_birr_per_kg / 0.46; ratio = price_N / grain_birr_per_kg
n_max = -b / (2 * c); n_opt = (ratio - b) / (2 * c)
profit = lambda n: (a + b * n + c * n ** 2) * grain_birr_per_kg - price_N * n
print(f"fit: yield = {a:.0f} + {b:.1f} N {c:+.3f} N^2; price ratio {ratio:.2f}")
print(f"maximum-yield N {n_max:.0f} kg/ha; economic optimum N {n_opt:.0f} kg/ha; profit difference {profit(n_opt) - profit(n_max):,.0f} birr/ha")
ratios = [1.0, 2.0, 2.9, 4.0, 6.0]; optima = [(r - b) / (2 * c) for r in ratios]
for r, o in zip(ratios, optima): print(f"price ratio {r:.1f}: optimum {o:.0f} kg N/ha")
grid = np.arange(0, 141, 5); curve = a + b * grid + c * grid ** 2
''',
 viz=lambda ns: [line(B('Wheat response to nitrogen (kg/ha)', 'የስንዴ ለናይትሮጅን ምላሽ (kg/ha)'), list(ns['grid']), [(B('Fitted yield', 'የተገጠመ ምርት'), list(ns['curve']), 1)], B('Nitrogen (kg/ha)', 'ናይትሮጅን (kg/ha)'), B('Grain (kg/ha)', 'እህል (kg/ha)'), markers=False, refs=[{'kind': 'v', 'v': round(float(ns['n_opt'])), 'label': B('economic', 'ኢኮኖሚያዊ')}, {'kind': 'v', 'v': round(float(ns['n_max'])), 'label': B('max yield', 'ከፍተኛ ምርት')}]),
                 line(B('Economic optimum vs price ratio', 'ኢኮኖሚያዊ ምርጥ vs የዋጋ ሬሾ'), ns['ratios'], [(B('Optimum N', 'ምርጥ N'), ns['optima'], 2)], B('Price of N ÷ price of grain', 'የN ዋጋ ÷ የእህል ዋጋ'), 'kg N/ha', xint=False)],
 analysis=lambda ns: ([f"Yield peaks at {ns['n_max']:.0f} kg N/ha, but the last kilograms do not pay.", f"At today’s price ratio ({ns['ratio']:.1f}) the economic optimum is {ns['n_opt']:.0f} kg N/ha, earning {ns['profit'](ns['n_opt']) - ns['profit'](ns['n_max']):,.0f} birr/ha more than the maximum-yield rate.", f"If fertiliser becomes twice as expensive relative to grain, the optimum falls to about {(2 * ns['ratio'] - ns['b']) / (2 * ns['c']):.0f} kg N/ha."],
                      [f"ምርት በ{ns['n_max']:.0f} kg N/ha ከፍተኛ ይሆናል፤ ግን የመጨረሻዎቹ ኪሎግራሞች አያዋጡም።", f"በዛሬው የዋጋ ሬሾ ({ns['ratio']:.1f}) ኢኮኖሚያዊ ምርጡ {ns['n_opt']:.0f} kg N/ha ነው፣ ከከፍተኛ-ምርት መጠኑ በ{ns['profit'](ns['n_opt']) - ns['profit'](ns['n_max']):,.0f} ብር/ha የበለጠ ያስገኛል።", f"ማዳበሪያ ከእህል አንፃር ሁለት እጥፍ ቢወደድ ምርጡ ወደ {(2 * ns['ratio'] - ns['b']) / (2 * ns['c']):.0f} kg N/ha ገደማ ይወርዳል።"]),
 decision=lambda ns: (f"Recommend about {round(ns['n_opt'] / 5) * 5:.0f} kg N/ha (about {ns['n_opt'] / 0.46:.0f} kg urea), and publish the price-ratio table so extension agents can adjust the rate each season.", f"ወደ {round(ns['n_opt'] / 5) * 5:.0f} kg N/ha (ወደ {ns['n_opt'] / 0.46:.0f} kg ዩሪያ) ምከር፤ የኤክስቴንሽን ሠራተኞች በየወቅቱ መጠኑን እንዲያስተካክሉ የዋጋ-ሬሾ ሰንጠረዡን አትም።"), note=('Prices are illustrative; use current local urea and grain prices.', 'ዋጋዎቹ ለማሳያ ናቸው፤ የአሁኑን የአካባቢ የዩሪያና የእህል ዋጋዎች ተጠቀም።')))
S5.append(lab(('PCA and clustering of sorghum landraces', 'የማሽላ ዝርያዎች PCA እና clustering'),
 ('Summarise 6 traits of 60 sorghum landraces with principal components, group them with k-means, and pick a small core set that covers the diversity.', 'የ60 የማሽላ የአካባቢ ዝርያዎችን 6 ባሕሪያት በprincipal components አጠቃልል፣ በk-means ቡድን አድርጋቸው፣ ብዝሃነቱን የሚሸፍን ትንሽ ዋና ስብስብ ምረጥ።'), W1,
 [PY, NP, SK, MPL],
 (['Measure days to flowering, plant height, panicle length, grain weight, grain colour score and stalk sugar.', 'Standardise each trait (mean 0, SD 1).', 'PCA: how much variation do PC1 and PC2 explain? Which traits load on them?', 'k-means with k = 2–6; choose k by the silhouette score.', 'Choose the landrace closest to each cluster centre as the core set.'],
  ['የአበባ ቀናትን፣ የተክል ቁመትን፣ የዛላ ርዝመትን፣ የእህል ክብደትን፣ የእህል ቀለም ውጤትንና የአገዳ ስኳርን ለካ።', 'እያንዳንዱን ባሕሪ standardise አድርግ (አማካይ 0፣ SD 1)።', 'PCA፡ PC1 እና PC2 ምን ያህል ልዩነት ያብራራሉ? የትኞቹ ባሕሪያት በእነሱ ላይ ይጫናሉ?', 'k-means በk = 2–6፤ kን በsilhouette ውጤት ምረጥ።', 'ለእያንዳንዱ የcluster ማዕከል ቅርብ የሆነውን ዝርያ እንደ ዋና ስብስብ ምረጥ።']),
 '''
import numpy as np
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
rng = np.random.default_rng(7)
traits = ["flowering days", "height", "panicle length", "grain weight", "colour score", "stalk sugar"]
centres = np.array([[68, 150, 24, 28, 2, 7], [98, 290, 33, 21, 5, 15], [80, 170, 19, 38, 8, 6]])     # early grain / tall sweet / mid bold red
X = np.vstack([c + rng.normal(0, [4, 15, 2.5, 1.8, 0.7, 1.2], (20, 6)) for c in centres])
Z = (X - X.mean(0)) / X.std(0)
U, S, Vt = np.linalg.svd(Z, full_matrices=False); pcs = Z @ Vt[:2].T; var_exp = S ** 2 / (S ** 2).sum()
sil = {k: silhouette_score(Z, KMeans(k, n_init=10, random_state=0).fit_predict(Z)) for k in range(2, 7)}
k = max(sil, key=sil.get); km = KMeans(k, n_init=10, random_state=0).fit(Z); lab = km.labels_
core = [int(np.argmin(((Z - c) ** 2).sum(1))) for c in km.cluster_centers_]
print(f"PC1 explains {var_exp[0]:.0%}, PC2 {var_exp[1]:.0%}"); print("PC1 loadings:", {tr: round(float(v), 2) for tr, v in zip(traits, Vt[0])})
print("silhouette by k:", {kk: round(v, 2) for kk, v in sil.items()}, "-> k =", k); print("core set (landrace numbers):", [c + 1 for c in core])
''',
 viz=lambda ns: [scatter(B('Landraces on the first two principal components', 'ዝርያዎች በመጀመሪያዎቹ ሁለት principal components ላይ'), ns['pcs'][:, 0], ns['pcs'][:, 1], f"PC1 ({ns['var_exp'][0]:.0%})", f"PC2 ({ns['var_exp'][1]:.0%})", fit=False, groups=[(B(f'Cluster {i + 1}', f'Cluster {i + 1}'), ns['lab'] == i) for i in range(ns['k'])]),
                 line(B('Silhouette score by number of clusters', 'የsilhouette ውጤት በclusters ብዛት'), list(ns['sil']), [('Silhouette', list(ns['sil'].values()), 1)], B('Number of clusters k', 'የclusters ብዛት k'), 'Silhouette')],
 analysis=lambda ns: ([f"PC1 and PC2 explain {ns['var_exp'][0] + ns['var_exp'][1]:.0%} of the variation in 6 traits.", f"The silhouette score is highest at k = {ns['k']}: there are {ns['k']} clear groups (early grain types, tall sweet-stalk types and mid-season bold red-grain types).", f"The core set of {len(ns['core'])} landraces represents each group."],
                      [f"PC1 እና PC2 በ6 ባሕሪያት ውስጥ ያለውን ልዩነት {ns['var_exp'][0] + ns['var_exp'][1]:.0%} ያብራራሉ።", f"የsilhouette ውጤቱ በk = {ns['k']} ከፍተኛ ነው፡ {ns['k']} ግልጽ ቡድኖች አሉ (ቀደምት የእህል ዓይነቶች፣ ረጃጅም ጣፋጭ-አገዳ ዓይነቶችና የመካከለኛ ወቅት ደፋር ቀይ-እህል ዓይነቶች)።", f"የ{len(ns['core'])} ዝርያዎች ዋና ስብስብ እያንዳንዱን ቡድን ይወክላል።"]),
 decision=lambda ns: ('Use the core set as parents in the crossing block and conserve all 60 in the gene bank; repeat the analysis with molecular markers before final grouping.', 'ዋናውን ስብስብ በማዳቀያ blockኡ ውስጥ እንደ ወላጆች ተጠቀም፣ ሁሉንም 60 በዘር ባንክ ውስጥ ጠብቅ፤ ከመጨረሻው ቡድን ማውጣት በፊት ትንተናውን በሞለኪውላር ማርከሮች ድገም።'), note=SIM))
S5.append(lab(('Lamb growth curves: when to sell?', 'የበግ ጠቦት የእድገት ኩርባዎች፡ መቼ መሸጥ?'),
 ('Fit Gompertz growth curves to the weights of two sheep breeds from birth to 300 days, compare growth rates, and choose the sale age.', 'ከልደት እስከ 300 ቀናት ድረስ ለሁለት የበግ ዝርያዎች ክብደቶች የGompertz የእድገት ኩርባዎችን ግጠም፣ የእድገት መጠኖችን አወዳድር፣ የሽያጭ ዕድሜውን ምረጥ።'), W1,
 [PY, SP, NP, T('Weighing scale and ear tags', 'weigh the same lambs every month', 'ያንኑ ጠቦቶች በየወሩ መመዘን', 'livestock market or station')],
 (['Weigh 15 lambs of each breed at birth and every 30 days to 300 days.', 'Fit W(t) = A·exp(−b·exp(−k·t)) per breed with nonlinear least squares.', 'Daily gain = derivative of the curve; find the age of fastest growth.', 'Compare mature weight A and rate k between breeds.', 'Choose the sale age where daily gain falls below 80 g/day.'],
  ['የእያንዳንዱን ዝርያ 15 ጠቦቶች በልደትና በየ30 ቀናት እስከ 300 ቀናት መዝን።', 'W(t) = A·exp(−b·exp(−k·t))ን በዝርያ በnonlinear least squares ግጠም።', 'ዕለታዊ ጭማሪ = የኩርባው derivative፤ በጣም ፈጣን የእድገት ዕድሜን ፈልግ።', 'የበሰለ ክብደት Aን እና መጠን kን በዝርያዎች መካከል አወዳድር።', 'ዕለታዊ ጭማሪ ከ80 g/ቀን በታች የሚወርድበትን የሽያጭ ዕድሜ ምረጥ።']),
 '''
import numpy as np
from scipy.optimize import curve_fit
rng = np.random.default_rng(3); t = np.arange(0, 301, 30)
gomp = lambda t, A, b, k: A * np.exp(-b * np.exp(-k * t))
truth = {"Washera": (38, 2.6, 0.011), "Menz": (28, 2.4, 0.010)}
fits, gain_curves = {}, {}
for breed, (A, b, k) in truth.items():
    W = np.concatenate([gomp(t, A, b, k) * rng.normal(1, 0.06, t.size) for _ in range(15)]); tt = np.tile(t, 15)
    p, _ = curve_fit(gomp, tt, W, p0=(30, 2.5, 0.01)); fits[breed] = p
    days = np.arange(0, 301); w = gomp(days, *p); gain = np.gradient(w) * 1000
    sale = int(days[(days > np.log(p[1]) / p[2]) & (gain < 80)][0]) if (gain < 80).any() else 300
    gain_curves[breed] = (w, gain, sale)
    print(f"{breed}: mature weight {p[0]:.1f} kg, rate {p[2]:.4f}/day, fastest growth at {np.log(p[1]) / p[2]:.0f} days ({gain.max():.0f} g/day); gain drops below 80 g/day at {sale} days, weight then {w[sale]:.1f} kg")
''',
 viz=lambda ns: [line(B('Fitted weight (kg)', 'የተገጠመ ክብደት (kg)'), list(range(0, 301, 10)), [(B(k, k), list(v[0][::10]), i + 1) for i, (k, v) in enumerate(ns['gain_curves'].items())], B('Age (days)', 'ዕድሜ (ቀናት)'), 'kg', markers=False, ymin=0),
                 line(B('Daily gain (g/day)', 'ዕለታዊ ጭማሪ (g/ቀን)'), list(range(0, 301, 10)), [(B(k, k), list(v[1][::10]), i + 1) for i, (k, v) in enumerate(ns['gain_curves'].items())], B('Age (days)', 'ዕድሜ (ቀናት)'), 'g/day', markers=False, ymin=0, refs=[{'kind': 'h', 'v': 80, 'label': '80 g/day'}])],
 analysis=lambda ns: ([f"Washera lambs grow toward {ns['fits']['Washera'][0]:.0f} kg and Menz toward {ns['fits']['Menz'][0]:.0f} kg.", f"Both grow fastest around {np.log(ns['fits']['Washera'][1]) / ns['fits']['Washera'][2]:.0f} days; after that each extra day of feed adds less weight.", f"Daily gain falls below 80 g at {ns['gain_curves']['Washera'][2]} days (Washera, {ns['gain_curves']['Washera'][0][ns['gain_curves']['Washera'][2]]:.0f} kg) and {ns['gain_curves']['Menz'][2]} days (Menz, {ns['gain_curves']['Menz'][0][ns['gain_curves']['Menz'][2]]:.0f} kg)."],
                      [f"የዋሸራ ጠቦቶች ወደ {ns['fits']['Washera'][0]:.0f} kg፣ መንዝ ደግሞ ወደ {ns['fits']['Menz'][0]:.0f} kg ያድጋሉ።", f"ሁለቱም በ{np.log(ns['fits']['Washera'][1]) / ns['fits']['Washera'][2]:.0f} ቀናት ገደማ በፍጥነት ያድጋሉ፤ ከዚያ በኋላ እያንዳንዱ ተጨማሪ የመኖ ቀን ያነሰ ክብደት ይጨምራል።", f"ዕለታዊ ጭማሪ ከ80 g በታች የሚወርደው በ{ns['gain_curves']['Washera'][2]} ቀናት (ዋሸራ፣ {ns['gain_curves']['Washera'][0][ns['gain_curves']['Washera'][2]]:.0f} kg) እና በ{ns['gain_curves']['Menz'][2]} ቀናት (መንዝ፣ {ns['gain_curves']['Menz'][0][ns['gain_curves']['Menz'][2]]:.0f} kg) ነው።"]),
 decision=lambda ns: (f"Plan sales at about {ns['gain_curves']['Washera'][2]} days for Washera and {ns['gain_curves']['Menz'][2]} days for Menz, earlier if feed is scarce or prices peak (holidays); keep weighing monthly to check.", f"ለዋሸራ በ{ns['gain_curves']['Washera'][2]} ቀናት፣ ለመንዝ በ{ns['gain_curves']['Menz'][2]} ቀናት ገደማ ሽያጭ አቅድ፤ መኖ ከጠፋ ወይም ዋጋዎች ከፍ ካሉ (በዓላት) ቀደም ብለህ፤ ለማረጋገጥ በየወሩ መመዘን ቀጥል።"), note=SIM))
S5.append(lab(('Partial budget and marginal rate of return', 'Partial budget እና marginal rate of return'),
 ('Turn agronomic results for five fertiliser options into net benefits, remove dominated options, compute marginal rates of return, and pick the recommendation.', 'የአምስት የማዳበሪያ አማራጮችን አግሮኖሚያዊ ውጤቶች ወደ የተጣራ ጥቅሞች ቀይር፣ የተበለጡ አማራጮችን አስወግድ፣ marginal rates of returnን አስላ፣ ምክሩን ምረጥ።'), W1,
 [PY, PD, SHEET],
 (['Adjust trial yields down 10% for farmer conditions.', 'Gross benefit = adjusted yield × field price; costs that vary = fertiliser + labour + transport.', 'Net benefit = gross benefit − costs that vary; sort by cost.', 'Dominance: drop any option with higher cost but lower net benefit.', 'MRR between neighbours = Δ net benefit ÷ Δ cost; accept if above 100%.'],
  ['የሙከራ ምርቶችን ለገበሬ ሁኔታዎች በ10% ቀንስ።', 'ጠቅላላ ጥቅም = የተስተካከለ ምርት × የመስክ ዋጋ፤ የሚለያዩ ወጪዎች = ማዳበሪያ + ጉልበት + ማጓጓዣ።', 'የተጣራ ጥቅም = ጠቅላላ ጥቅም − የሚለያዩ ወጪዎች፤ በወጪ ደርድር።', 'Dominance፡ ከፍ ያለ ወጪና ዝቅተኛ የተጣራ ጥቅም ያለውን ማንኛውንም አማራጭ ጣል።', 'በጎረቤቶች መካከል MRR = Δ የተጣራ ጥቅም ÷ Δ ወጪ፤ ከ100% በላይ ከሆነ ተቀበል።']),
 '''
import pandas as pd
opt = pd.DataFrame({"option": ["no fertiliser", "NPS 50", "NPS 100", "NPS 100 + urea 50", "NPS 150 + urea 100"],
                    "yield_kg": [1900, 2600, 3100, 3700, 3800], "cost_birr": [0, 3800, 7200, 10300, 15800]})
price = 40                                                                 # birr per kg at harvest
opt["gross"] = opt.yield_kg * 0.9 * price; opt["net"] = opt.gross - opt.cost_birr
opt = opt.sort_values("cost_birr").reset_index(drop=True)
best_net, keep = -1e18, []
for i, r in opt.iterrows():
    if r.net > best_net: keep.append(i); best_net = r.net
opt["dominated"] = ~opt.index.isin(keep)
nd = opt.loc[keep].copy(); nd["MRR"] = (nd.net.diff() / nd.cost_birr.diff()).round(2)
print(opt[["option", "cost_birr", "net", "dominated"]].to_string(index=False)); print(nd[["option", "MRR"]].to_string(index=False))
choice = nd.option.iloc[0]
for _, r in nd.iloc[1:].iterrows():
    if r.MRR >= 1.0: choice = r.option
    else: break
print("recommendation (last step with MRR >= 100%):", choice)
''',
 viz=lambda ns: [scatter(B('Net benefit vs costs that vary (birr/ha)', 'የተጣራ ጥቅም vs የሚለያዩ ወጪዎች (ብር/ha)'), list(ns['opt'].cost_birr), list(ns['opt'].net), B('Costs that vary (birr/ha)', 'የሚለያዩ ወጪዎች (ብር/ha)'), B('Net benefit (birr/ha)', 'የተጣራ ጥቅም (ብር/ha)'), fit=False, labels=list(ns['opt'].option)),
                 hbar(B('Marginal rate of return between non-dominated options (%)', 'ባልተበለጡ አማራጮች መካከል marginal rate of return (%)'), list(ns['nd'].option[1:]), [('MRR %', list(100 * ns['nd'].MRR[1:]), 1)], B('Percent (accept above 100%)', 'መቶኛ (ከ100% በላይ ተቀበል)'), fmt=0)],
 analysis=lambda ns: ([f"{', '.join(ns['opt'].option[ns['opt'].dominated]) or 'No option'} is dominated: it costs more but earns less than a cheaper option." if ns['opt'].dominated.any() else 'No option is dominated.', 'Marginal rates of return between successive non-dominated options: ' + ', '.join(f"{o} {m:.0%}" for o, m in zip(ns['nd'].option[1:], ns['nd'].MRR[1:])) + '.', f"The last step with MRR above 100% is “{ns['choice']}”."],
                      [f"{', '.join(ns['opt'].option[ns['opt'].dominated]) or 'ምንም አማራጭ'} ተበልጧል፡ ከርካሹ አማራጭ የበለጠ ያስወጣል ግን ያነሰ ያስገኛል።" if ns['opt'].dominated.any() else 'ምንም አማራጭ አልተበለጠም።', 'በተከታታይ ባልተበለጡ አማራጮች መካከል ያሉ marginal rates of return፡ ' + '፣ '.join(f"{o} {m:.0%}" for o, m in zip(ns['nd'].option[1:], ns['nd'].MRR[1:])) + '።', f"MRR ከ100% በላይ ያለው የመጨረሻው እርምጃ «{ns['choice']}» ነው።"]),
 decision=lambda ns: (f"Recommend “{ns['choice']}”; check the result with a sensitivity analysis at 20% lower grain prices before publishing.", f"«{ns['choice']}»ን ምከር፤ ከማሳተምህ በፊት ውጤቱን በ20% ዝቅተኛ የእህል ዋጋዎች sensitivity analysis ፈትሽ።"), note=('CIMMYT (1988) partial-budget method; prices are illustrative.', 'የCIMMYT (1988) partial-budget ዘዴ፤ ዋጋዎቹ ለማሳያ ናቸው።')))
emit_labs('s', 5, S5, 8)
print('labs s4-s5 written')
