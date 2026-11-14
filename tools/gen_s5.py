from lib import *
from scipy import stats
rng = np.random.default_rng(505)

# ---------------- MET data: 10 genotypes x 6 environments x 3 reps
G = [f'G{i:02d}' for i in range(1, 11)]; E = ['Debre Zeit', 'Holetta', 'Adet', 'Bako', 'Sirinka', 'Kulumsa']
g_eff = rng.normal(0, 0.25, 10); e_eff = np.array([0.6, 0.2, -0.1, -0.4, -0.7, 0.4]); sens = rng.normal(1, 0.25, 10)
ge = rng.normal(0, 0.12, (10, 6)); ge[2, 3] += 0.45; ge[7, 4] += 0.4
rows = []
for gi, g in enumerate(G):
    for ei, e in enumerate(E):
        for r in range(3):
            y = 2.2 + g_eff[gi] + sens[gi] * e_eff[ei] + ge[gi, ei] + rng.normal(0, 0.15)
            rows.append({'env': e, 'rep': r + 1, 'genotype': g, 'yield_t_ha': round(float(y), 2)})
save_csv(pd.DataFrame(rows), 's5_met_teff.csv')

ex1 = example('s5-met',
 {'en': 'Which teff genotypes are high-yielding AND stable across locations?', 'am': 'የትኞቹ የጤፍ ዝርያዎች በቦታዎች ሁሉ ከፍተኛ ምርት የሚሰጡና የተረጋጉ ናቸው?'},
 {'en': '10 genotypes tested at 6 research sites, 3 replicates per site (180 plots). A breeder must choose which to release and where.', 'am': '10 ዝርያዎች በ6 የምርምር ጣቢያዎች፣ በእያንዳንዱ ጣቢያ 3 ድግግሞሽ (180 ማሳዎች) ተፈትነዋል። የዝርያ አሻሻዩ የትኞቹን እንደሚለቅና የት እንደሚለቅ መወሰን አለበት።'},
 {'en': 'Multi-environment trial → combined ANOVA, Finlay–Wilkinson stability, AMMI, which-won-where', 'am': 'Multi-environment trial → combined ANOVA፣ Finlay–Wilkinson stability፣ AMMI፣ which-won-where'},
 's5_met_teff.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s5_met_teff.csv"); y = d.yield_t_ha; Gm = y.mean()
g, e, r = d.genotype.nunique(), d.env.nunique(), d.rep.nunique()
def ss(cols):
    m = d.groupby(cols).yield_t_ha.transform("mean"); return ((m - Gm)**2).sum()
ss_e, ss_g = ss(["env"]), ss(["genotype"])
ss_re = ss(["env", "rep"]) - ss_e
ss_ge = ss(["env", "genotype"]) - ss_e - ss_g
ss_err = ((y - Gm)**2).sum() - ss_e - ss_re - ss_g - ss_ge
df = {"Env": e-1, "Rep(Env)": e*(r-1), "Genotype": g-1, "G x E": (g-1)*(e-1), "Error": e*(g-1)*(r-1)}
ms = dict(zip(df, [s / df[k] for k, s in zip(df, [ss_e, ss_re, ss_g, ss_ge, ss_err])]))
print("Source     df      MS        F        p")
for k, den in [("Env", "Rep(Env)"), ("Genotype", "G x E"), ("G x E", "Error")]:
    F = ms[k] / ms[den]; print(f"{k:9s} {df[k]:3d} {ms[k]:8.3f} {F:8.2f}  {stats.f.sf(F, df[k], df[den]):.2e}")
print(f"Error     {df['Error']:3d} {ms['Error']:8.3f}")
M = d.pivot_table(index="genotype", columns="env", values="yield_t_ha")      # G x E means
env_index = M.mean() - M.values.mean()
fw = {gname: stats.linregress(env_index, M.loc[gname]).slope for gname in M.index}
I = M.values - M.values.mean(axis=1, keepdims=True) - M.values.mean(axis=0, keepdims=True) + M.values.mean()
U, S, Vt = np.linalg.svd(I, full_matrices=False)
print(f"AMMI: IPCA1 explains {100*S[0]**2/(S**2).sum():.0f}% of G x E, IPCA2 {100*S[1]**2/(S**2).sum():.0f}%")
ipca1 = U[:, 0] * np.sqrt(S[0])
tab = pd.DataFrame({"mean": M.mean(axis=1), "FW_slope": pd.Series(fw), "IPCA1": ipca1}, index=M.index).round(2)
print(tab.sort_values("mean", ascending=False))
print("Which won where:", M.idxmax().to_dict())
''',
 '''
library(metan)          # MET analysis: ANOVA, AMMI, GGE, stability
d <- read.csv("s5_met_teff.csv")
joint <- anova_joint(d, env, genotype, rep, yield_t_ha); joint
ammi  <- performs_ammi(d, env, genotype, rep, yield_t_ha); plot_scores(ammi)
gge   <- gge(d, env, genotype, yield_t_ha); plot(gge, type = 3)   # which-won-where
fw    <- ge_reg(d, env, genotype, rep, yield_t_ha); fw          # Eberhart-Russell / Finlay-Wilkinson
# mixed-model BLUPs: lme4::lmer(yield_t_ha ~ env + (1|genotype) + (1|genotype:env) + (1|env:rep), d)
''', None, None)
met = pd.read_csv(os.path.join(DATA, 's5_met_teff.csv')); M = met.pivot_table(index='genotype', columns='env', values='yield_t_ha')
ei = M.mean() - M.values.mean(); slope = {g_: stats.linregress(ei, M.loc[g_]).slope for g_ in M.index}
means = M.mean(axis=1).sort_values(ascending=False); top3 = list(means.index[:3])
stable = min(top3, key=lambda x: abs(slope[x] - 1)); wins = M.idxmax().value_counts()
ex1['read'] = {'en': ['Environments, genotypes and G × E are all significant: rankings change across sites, so one-site results are not enough.',
                      'Genotype is tested against G × E, the right error when we want conclusions that hold across environments.',
                      f'Top mean yields: {", ".join(f"{x} ({means[x]:.2f})" for x in top3)} t/ha.',
                      'A Finlay–Wilkinson slope near 1 means average stability; above 1 = responds strongly to good sites; below 1 = steady in poor sites. IPCA1 near 0 means little G × E.',
                      f'{wins.index[0]} wins in {wins.iloc[0]} of 6 sites.'],
               'am': ['ቦታዎች፣ ዝርያዎችና G × E ሁሉም ጉልህ ናቸው፡ ደረጃዎች በቦታዎች ይለዋወጣሉ፤ ስለዚህ የአንድ ቦታ ውጤቶች በቂ አይደሉም።',
                      'ዝርያ በG × E ላይ ይፈተናል፤ ይህ በቦታዎች ሁሉ የሚሠራ ድምዳሜ ስንፈልግ ትክክለኛው የስህተት ክፍል ነው።',
                      f'ከፍተኛ አማካይ ምርቶች፡ {", ".join(f"{x} ({means[x]:.2f})" for x in top3)} t/ha።',
                      'ወደ 1 የቀረበ የFinlay–Wilkinson slope አማካይ መረጋጋት ማለት ነው፤ ከ1 በላይ = ለጥሩ ቦታዎች በጠንካራ ሁኔታ ምላሽ ይሰጣል፤ ከ1 በታች = በደካማ ቦታዎች የተረጋጋ። ወደ 0 የቀረበ IPCA1 ትንሽ G × E ማለት ነው።',
                      f'{wins.index[0]} ከ6 ቦታዎች በ{wins.iloc[0]}ቱ ያሸንፋል።']}
Mi = M.values - M.values.mean(axis=1, keepdims=True) - M.values.mean(axis=0, keepdims=True) + M.values.mean()
U_, S_, _ = np.linalg.svd(Mi, full_matrices=False); ip1 = pd.Series(U_[:, 0] * np.sqrt(S_[0]), index=M.index)
cand = list(means.index[:5]); stable = min(cand, key=lambda x: abs(ip1[x]) + abs(slope[x] - 1))
best = means.index[0]; nwin = int((M.idxmax() == best).sum())
ex1['decide'] = {'en': f'Two strong candidates. {stable}: among the top five, the most stable (slope {slope[stable]:.2f}, IPCA1 {ip1[stable]:+.2f}), so it is the safest release for wide adaptation. {best}: the highest mean ({means[best]:.2f} t/ha), winning {nwin} of 6 sites, with slope {slope[best]:.2f}, meaning it holds its yield in poorer sites. Confirm both in a second year before release.',
                 'am': f'ሁለት ጠንካራ ዕጩዎች። {stable}፡ ከከፍተኛዎቹ አምስት መካከል በጣም የተረጋጋው (slope {slope[stable]:.2f}፣ IPCA1 {ip1[stable]:+.2f})፤ ስለዚህ ለሰፊ መላመድ በጣም አስተማማኙ መልቀቂያ ነው። {best}፡ ከፍተኛው አማካይ ({means[best]:.2f} t/ha)፣ ከ6 ቦታዎች በ{nwin}ቱ ያሸንፋል፣ slopeው {slope[best]:.2f} ሲሆን በደካማ ቦታዎች ምርቱን ይጠብቃል ማለት ነው። ከመልቀቅ በፊት ሁለቱንም በሁለተኛ ዓመት አረጋግጡ።'}
ex1['biz'] = {'en': 'MET analysis is the core paid service for seed companies and national breeding programmes.', 'am': 'የMET ትንተና ለዘር ኩባንያዎችና ለብሔራዊ የዝርያ ማሻሻያ ፕሮግራሞች ዋናው የሚከፈልበት አገልግሎት ነው።'}

# ---------------- economic optimum N
Ns = np.repeat([0, 30, 60, 90, 120, 150], 4)
yld = 2.4 + 0.045 * Ns - 0.00017 * Ns**2 + rng.normal(0, 0.3, Ns.size)
save_csv(pd.DataFrame({'plot': range(1, 25), 'N_kg_ha': Ns, 'yield_t_ha': np.round(yld, 2)}), 's5_maize_N_response.csv')
ex2 = example('s5-eonr',
 {'en': 'What is the most profitable nitrogen rate for maize?', 'am': 'ለበቆሎ በጣም ትርፋማው የናይትሮጅን መጠን ስንት ነው?'},
 {'en': 'Six N rates (0–150 kg N/ha) × 4 replicates. Example prices: nitrogen 100 birr per kg N, maize grain 30 birr per kg (replace with today’s local prices).', 'am': 'ስድስት የN መጠኖች (0–150 kg N/ha) × 4 ድግግሞሾች። የምሳሌ ዋጋዎች፡ ናይትሮጅን በኪሎ N 100 ብር፣ የበቆሎ እህል በኪሎ 30 ብር (በዛሬው የአካባቢ ዋጋ ተኩ)።'},
 {'en': 'Quadratic response curve → agronomic maximum and economic optimum (marginal product = price ratio)', 'am': 'Quadratic የምላሽ ኩርባ → የአግሮኖሚ ከፍተኛ ነጥብና የኢኮኖሚ ምርጥ ነጥብ (marginal product = የዋጋ ምጣኔ)'},
 's5_maize_N_response.csv',
 '''
import pandas as pd, numpy as np
d = pd.read_csv("s5_maize_N_response.csv")
c, b, a = np.polyfit(d.N_kg_ha, d.yield_t_ha, 2)          # yield = a + b*N + c*N^2
pred = a + b*d.N_kg_ha + c*d.N_kg_ha**2
r2 = 1 - ((d.yield_t_ha - pred)**2).sum() / ((d.yield_t_ha - d.yield_t_ha.mean())**2).sum()
print(f"yield = {a:.3f} + {b:.5f} N {c:+.7f} N^2   (R2 = {r2:.3f})")
price_N, price_grain = 100, 30                             # birr per kg N, birr per kg grain
ratio = price_N / price_grain / 1000                        # t grain per kg N that pays for 1 kg N
n_max = -b / (2*c); n_eco = (ratio - b) / (2*c)
def profit(N): return (a + b*N + c*N**2) * 1000 * price_grain - N * price_N
for name, N in [("No N", 0), ("Economic optimum", n_eco), ("Agronomic maximum", n_max)]:
    print(f"{name:18s} N = {N:5.0f} kg/ha  yield = {a+b*N+c*N**2:.2f} t/ha  return over N cost = {profit(N):,.0f} birr/ha")
print(f"Extra profit of optimum over no N: {profit(n_eco)-profit(0):,.0f} birr/ha")
''',
 '''
d <- read.csv("s5_maize_N_response.csv")
m <- lm(yield_t_ha ~ N_kg_ha + I(N_kg_ha^2), data = d); summary(m)
b <- coef(m); ratio <- (100 / 30) / 1000
c(agronomic_max = -b[2] / (2 * b[3]), economic_opt = (ratio - b[2]) / (2 * b[3]))
# plateau models: nls(yield_t_ha ~ ifelse(N_kg_ha < x0, a + b*N_kg_ha + c*N_kg_ha^2, a + b*x0 + c*x0^2), ...)
''', None, None)
dd = pd.read_csv(os.path.join(DATA, 's5_maize_N_response.csv')); c, b, a = np.polyfit(dd.N_kg_ha, dd.yield_t_ha, 2)
nmax = -b / (2 * c); neco = (100 / 30 / 1000 - b) / (2 * c)
ex2['read'] = {'en': [f'The curve rises and then bends: the agronomic maximum is about {nmax:.0f} kg N/ha.',
                      f'The economic optimum is lower, about {neco:.0f} kg N/ha: beyond it, each extra kilogram of N costs more than the grain it adds.',
                      'If prices change, only the price ratio changes the optimum: cheaper fertilizer or dearer grain moves it up.'],
               'am': [f'ኩርባው ይወጣል ከዚያም ይታጠፋል፡ የአግሮኖሚ ከፍተኛ ነጥቡ ወደ {nmax:.0f} kg N/ha ገደማ ነው።',
                      f'የኢኮኖሚ ምርጥ ነጥቡ ዝቅ ያለ ሲሆን ወደ {neco:.0f} kg N/ha ገደማ ነው፡ ከዚያ በኋላ እያንዳንዱ ተጨማሪ ኪሎግራም N ከሚጨምረው እህል በላይ ያስወጣል።',
                      'ዋጋዎች ሲለወጡ ምርጥ ነጥቡን የሚቀይረው የዋጋ ምጣኔ ብቻ ነው፡ ርካሽ ማዳበሪያ ወይም ውድ እህል ወደ ላይ ያንቀሳቅሰዋል።']}
ex2['decide'] = {'en': f'Recommend about {neco:.0f} kg N/ha at these prices, not the yield-maximising {nmax:.0f}; publish a small price-ratio table so extension agents can update it each season.', 'am': f'በእነዚህ ዋጋዎች ምርትን የሚያበዛውን {nmax:.0f} ሳይሆን ወደ {neco:.0f} kg N/ha ገደማ ምከሩ፤ የኤክስቴንሽን ባለሙያዎች በየወቅቱ እንዲያድሱት ትንሽ የዋጋ-ምጣኔ ሰንጠረዥ አትሙ።'}
ex2['biz'] = {'en': 'A phone or SMS service that gives each farmer the optimum rate for today’s prices is a clear business.', 'am': 'ለእያንዳንዱ ገበሬ በዛሬው ዋጋ ምርጡን መጠን የሚሰጥ የስልክ ወይም የSMS አገልግሎት ግልጽ ንግድ ነው።'}

# ---------------- logistic GLM: germination after storage
rows = []
for store in ('Hermetic bag', 'Polypropylene sack'):
    for months in range(0, 12, 2):
        for lot in range(3):
            eta = 2.6 - (0.08 if store == 'Hermetic bag' else 0.32) * months
            p = 1 / (1 + np.exp(-eta)); rows.append({'storage': store, 'months': months, 'lot': lot + 1, 'seeds': 50, 'germinated': int(rng.binomial(50, p))})
save_csv(pd.DataFrame(rows), 's5_seed_storage.csv')
ex3 = example('s5-logistic',
 {'en': 'How fast does maize seed lose germination in hermetic bags vs ordinary sacks?', 'am': 'የበቆሎ ዘር በhermetic ከረጢቶችና በተራ ጆንያዎች መብቀሉን በምን ያህል ፍጥነት ያጣል?'},
 {'en': 'Seed stored for 0–10 months in two storage types; 3 lots per time point; 50 seeds tested per lot.', 'am': 'ዘር በሁለት የማከማቻ ዓይነቶች ለ0–10 ወራት ተከማችቷል፤ በእያንዳንዱ ጊዜ 3 ክምችቶች፤ በእያንዳንዱ ክምችት 50 ዘሮች ተፈትነዋል።'},
 {'en': 'Proportions → binomial GLM (logistic regression) with storage × months interaction, fitted by IRLS', 'am': 'ምጣኔዎች → binomial GLM (logistic regression) ከማከማቻ × ወራት interaction ጋር፣ በIRLS የተገጠመ'},
 's5_seed_storage.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s5_seed_storage.csv")
sack = (d.storage == "Polypropylene sack").astype(float)
X = np.column_stack([np.ones(len(d)), d.months, sack, d.months * sack])
names = ["Intercept", "months", "sack", "months x sack"]
k, n = d.germinated.values, d.seeds.values
beta = np.zeros(4)
for _ in range(25):                                   # iteratively reweighted least squares
    p = 1 / (1 + np.exp(-X @ beta)); W = n * p * (1 - p)
    z = X @ beta + (k - n * p) / W
    beta = np.linalg.solve(X.T @ (W[:, None] * X), X.T @ (W * z))
cov = np.linalg.inv(X.T @ (W[:, None] * X)); se = np.sqrt(np.diag(cov))
for nm, b, s in zip(names, beta, se):
    print(f"{nm:14s} {b:7.3f}  SE {s:.3f}  z {b/s:6.2f}  p {2*stats.norm.sf(abs(b/s)):.1e}")
dev = 2 * np.sum(k*np.log(np.maximum(k, 1e-9)/(n*p)) + (n-k)*np.log(np.maximum(n-k, 1e-9)/(n*(1-p))))
print(f"Residual deviance {dev:.1f} on {len(d)-4} df (near df = no overdispersion)")
print(f"Odds of germinating fall by {100*(1-np.exp(beta[1])):.0f}% per month in hermetic bags,")
print(f"and by {100*(1-np.exp(beta[1]+beta[3])):.0f}% per month in sacks.")
for m in (0, 6, 10):
    for s, lab in ((0, "hermetic"), (1, "sack")):
        print(f"  month {m:2d} {lab:8s}: predicted germination {100/(1+np.exp(-(beta[0]+beta[1]*m+beta[2]*s+beta[3]*m*s))):.0f}%")
''',
 '''
d <- read.csv("s5_seed_storage.csv")
m <- glm(cbind(germinated, seeds - germinated) ~ months * storage, family = binomial, data = d)
summary(m); exp(coef(m))          # odds ratios
deviance(m) / df.residual(m)      # > 1.5 suggests overdispersion: use quasibinomial or a GLMM
''', None, None)
sd_ = pd.read_csv(os.path.join(DATA, 's5_seed_storage.csv'))
g10 = sd_[sd_.months == 10].groupby('storage').apply(lambda x: x.germinated.sum() / x.seeds.sum(), include_groups=False)
ex3['read'] = {'en': ['Germination is a count out of 50 seeds, so a binomial model is right; a t-test on percentages would mislead near 0% and 100%.',
                      'The months × sack interaction is strongly negative: seed in sacks loses viability much faster.',
                      f'Observed at 10 months: {100*g10["Hermetic bag"]:.0f}% germination in hermetic bags vs {100*g10["Polypropylene sack"]:.0f}% in sacks.'],
               'am': ['መብቀል ከ50 ዘሮች የሚቆጠር ቁጥር ስለሆነ binomial ሞዴል ትክክል ነው፤ በመቶኛዎች ላይ t-test በ0% እና በ100% አካባቢ ያሳስታል።',
                      'የወራት × ጆንያ interaction በጣም አሉታዊ ነው፡ በጆንያ ውስጥ ያለ ዘር የመብቀል አቅሙን በጣም በፍጥነት ያጣል።',
                      f'በ10ኛው ወር የታየ፡ በhermetic ከረጢቶች {100*g10["Hermetic bag"]:.0f}% መብቀል፣ በጆንያዎች {100*g10["Polypropylene sack"]:.0f}%።']}
ex3['decide'] = {'en': 'Store seed longer than 2–3 months only in hermetic bags; the model gives a "safe storage time" table for each storage type.', 'am': 'ዘርን ከ2–3 ወራት በላይ በhermetic ከረጢቶች ብቻ አከማቹ፤ ሞዴሉ ለእያንዳንዱ የማከማቻ ዓይነት «ደኅንነቱ የተጠበቀ የማከማቻ ጊዜ» ሰንጠረዥ ይሰጣል።'}
ex3['biz'] = {'en': 'Hermetic-bag sellers and seed cooperatives use this evidence to sell storage solutions.', 'am': 'የhermetic ከረጢት ሻጮችና የዘር ማኅበራት የማከማቻ መፍትሔዎችን ለመሸጥ ይህን ማስረጃ ይጠቀማሉ።'}

# ---------------- PCA sorghum landraces
n_acc = 30
lat = rng.normal(0, 1, (n_acc, 2))
traits = {'days_to_flower': 75 + 8 * lat[:, 0] + rng.normal(0, 2, n_acc), 'plant_height_cm': 210 + 35 * lat[:, 0] + rng.normal(0, 10, n_acc),
          'panicle_length_cm': 25 + 3 * lat[:, 0] + rng.normal(0, 1.5, n_acc), 'grain_yield_t_ha': 3 + 0.6 * lat[:, 1] + rng.normal(0, 0.25, n_acc),
          'thousand_grain_wt_g': 30 + 4 * lat[:, 1] + rng.normal(0, 1.5, n_acc), 'striga_count': np.clip(12 - 4 * lat[:, 1] + rng.normal(0, 2, n_acc), 0, None)}
pc = pd.DataFrame({'accession': [f'ETS{i:03d}' for i in range(1, n_acc + 1)], **{k: np.round(v, 1) for k, v in traits.items()}})
save_csv(pc, 's5_sorghum_traits.csv')
ex4 = example('s5-pca',
 {'en': 'Which sorghum landraces combine high yield with Striga resistance?', 'am': 'የትኞቹ የማሽላ የሀገር በቀል ዝርያዎች ከፍተኛ ምርትንና የStriga መቋቋምን ያጣምራሉ?'},
 {'en': '30 landrace accessions measured for 6 traits in a characterisation trial.', 'am': '30 የሀገር በቀል ናሙናዎች በመለያ ሙከራ ውስጥ ለ6 ባሕሪያት ተለክተዋል።'},
 {'en': 'Many traits at once → principal component analysis (PCA) on standardised traits', 'am': 'ብዙ ባሕሪያት በአንድ ጊዜ → በstandardised ባሕሪያት ላይ principal component analysis (PCA)'},
 's5_sorghum_traits.csv',
 '''
import pandas as pd, numpy as np
d = pd.read_csv("s5_sorghum_traits.csv").set_index("accession")
Z = (d - d.mean()) / d.std()                       # standardise: traits have different units
U, S, Vt = np.linalg.svd(Z.values, full_matrices=False)
var = S**2 / (S**2).sum()
print("Variance explained:", [f"PC{i+1} {100*v:.0f}%" for i, v in enumerate(var[:3])])
load = pd.DataFrame(Vt[:2].T, index=d.columns, columns=["PC1", "PC2"]).round(2)
print(load)
scores = pd.DataFrame(U[:, :2] * S[:2], index=d.index, columns=["PC1", "PC2"])
sign = np.sign(load.loc["grain_yield_t_ha", "PC2"])          # make high PC2 = high yield
top = (sign * scores.PC2).sort_values(ascending=False).head(5).index
print("Top 5 on the yield/Striga axis:")
print(d.loc[top, ["grain_yield_t_ha", "striga_count", "days_to_flower"]])
''',
 '''
d <- read.csv("s5_sorghum_traits.csv", row.names = "accession")
p <- prcomp(d, scale. = TRUE)
summary(p); p$rotation[, 1:2]
biplot(p)                      # or factoextra::fviz_pca_biplot(p)
''', None, None)
ex4['read'] = {'en': ['Two components summarise most of the variation in six traits.',
                      'One axis groups maturity, height and panicle length (late, tall types vs early, short types).',
                      'The other axis groups grain yield and grain weight against Striga count: accessions high on it yield well and resist Striga.'],
               'am': ['ሁለት components በስድስት ባሕሪያት ውስጥ ያለውን አብዛኛውን ልዩነት ያጠቃልላሉ።',
                      'አንዱ ዘንግ የመድረሻ ጊዜን፣ ቁመትንና የዛላ ርዝመትን ያቧድናል (ዘግይተው የሚደርሱ ረጃጅም vs ቀድመው የሚደርሱ አጫጭር)።',
                      'ሌላው ዘንግ የእህል ምርትንና የፍሬ ክብደትን ከStriga ብዛት ጋር ያነጻጽራል፡ በዚህ ዘንግ ላይ ከፍ ያሉ ናሙናዎች ጥሩ ምርት ይሰጣሉ፣ Strigaንም ይቋቋማሉ።']}
ex4['decide'] = {'en': 'Use the top accessions on the yield/Striga axis as parents in a crossing block; keep early types for drought-prone areas.', 'am': 'በምርት/Striga ዘንግ ላይ ከፍተኛዎቹን ናሙናዎች በማዳቀያ ብሎክ ውስጥ እንደ ወላጆች ተጠቀሙ፤ ቀድመው የሚደርሱትን ለድርቅ ተጋላጭ አካባቢዎች አቆዩ።'}
ex4['biz'] = {'en': 'Gene banks and breeders pay for characterisation analytics that turn collections into parent lists.', 'am': 'የጂን ባንኮችና የዝርያ አሻሻዮች ስብስቦችን ወደ የወላጅ ዝርዝሮች ለሚቀይሩ የመለያ ትንተናዎች ይከፍላሉ።'}

# ---------------- partial budget & MRR
pb = pd.DataFrame({'treatment': ['No fertilizer', 'Compost 5 t', 'NPS 100 kg + Urea 50 kg', 'NPS 100 kg + Urea 100 kg'],
                   'mean_yield_t_ha': [2.10, 2.65, 3.70, 4.05], 'variable_cost_birr_ha': [0, 2500, 9000, 12500]})
save_csv(pb, 's5_partial_budget.csv')
ex5 = example('s5-mrr',
 {'en': 'Which fertilizer option should farmers adopt, based on profit not yield?', 'am': 'ገበሬዎች በምርት ሳይሆን በትርፍ ላይ ተመሥርተው የትኛውን የማዳበሪያ አማራጭ መቀበል አለባቸው?'},
 {'en': 'Mean wheat yields of 4 options from on-farm trials, and the costs that vary between options. Example field price of grain: 28 birr per kg (replace with local prices).', 'am': 'ከእርሻ ላይ ሙከራዎች የ4 አማራጮች አማካይ የስንዴ ምርቶችና በአማራጮች መካከል የሚለያዩ ወጪዎች። የምሳሌ የእህል የመስክ ዋጋ፡ በኪሎ 28 ብር (በአካባቢ ዋጋ ተኩ)።'},
 {'en': 'CIMMYT partial budget → yield adjustment, net benefit, dominance analysis, marginal rate of return (MRR)', 'am': 'የCIMMYT partial budget → የምርት ማስተካከያ፣ የተጣራ ጥቅም፣ dominance ትንተና፣ marginal rate of return (MRR)'},
 's5_partial_budget.csv',
 '''
import pandas as pd
d = pd.read_csv("s5_partial_budget.csv")
price = 28                                           # birr per kg grain at the farm gate
d["adj_yield_kg"] = d.mean_yield_t_ha * 1000 * 0.9   # 10% down: trial plots out-yield farmers' fields
d["gross_benefit"] = d.adj_yield_kg * price
d["net_benefit"] = d.gross_benefit - d.variable_cost_birr_ha
d = d.sort_values("variable_cost_birr_ha").reset_index(drop=True)
d["dominated"] = d.net_benefit < d.net_benefit.cummax().shift(1).fillna(-1e9)
print(d[["treatment", "variable_cost_birr_ha", "net_benefit", "dominated"]].to_string(index=False))
nd = d[~d.dominated].reset_index(drop=True)
for i in range(1, len(nd)):
    mrr = (nd.net_benefit[i] - nd.net_benefit[i-1]) / (nd.variable_cost_birr_ha[i] - nd.variable_cost_birr_ha[i-1])
    print(f"{nd.treatment[i-1]} -> {nd.treatment[i]}: MRR = {100*mrr:.0f}%")
print("Rule: adopt a step only if its MRR beats the minimum acceptable return (often 100%).")
''',
 '''
d <- read.csv("s5_partial_budget.csv")
d$net <- d$mean_yield_t_ha * 1000 * 0.9 * 28 - d$variable_cost_birr_ha
d <- d[order(d$variable_cost_birr_ha), ]
d$mrr <- c(NA, diff(d$net) / diff(d$variable_cost_birr_ha)) * 100
d
''', None, None)
pbd = pd.read_csv(os.path.join(DATA, 's5_partial_budget.csv')); pbd['net'] = pbd.mean_yield_t_ha * 900 * 28 - pbd.variable_cost_birr_ha
pbd = pbd.sort_values('variable_cost_birr_ha').reset_index(drop=True)
mrr_last = (pbd.net[3] - pbd.net[2]) / (pbd.variable_cost_birr_ha[3] - pbd.variable_cost_birr_ha[2])
mrr_3 = (pbd.net[2] - pbd.net[1]) / (pbd.variable_cost_birr_ha[2] - pbd.variable_cost_birr_ha[1])
choice = pbd.treatment[3] if mrr_last >= 1 else pbd.treatment[2]
ex5['read'] = {'en': ['Yields are cut by 10% because farmers usually get less than well-managed trial plots.',
                      'A dominated option costs more but earns a lower net benefit than a cheaper option; it is dropped.',
                      f'MRR is the extra net benefit per extra birr invested: {100*mrr_3:.0f}% for moving to the third option, {100*mrr_last:.0f}% for the most expensive one.'],
               'am': ['ገበሬዎች ብዙውን ጊዜ በደንብ ከተያዙ የሙከራ ማሳዎች ያነሰ ስለሚያገኙ ምርቶች በ10% ይቀነሳሉ።',
                      'dominated አማራጭ የበለጠ ያስወጣል፣ ግን ከርካሹ አማራጭ ያነሰ የተጣራ ጥቅም ያስገኛል፤ ይወገዳል።',
                      f'MRR በተጨማሪ በተፈሰሰ ብር የሚገኝ ተጨማሪ የተጣራ ጥቅም ነው፡ ወደ ሦስተኛው አማራጭ ለመሸጋገር {100*mrr_3:.0f}%፣ ለውዱ አማራጭ {100*mrr_last:.0f}%።']}
ex5['decide'] = {'en': f'Recommend "{choice}": it is the most intensive option whose marginal return still beats 100%.', 'am': f'«{choice}»ን ምከሩ፡ marginal returnው አሁንም ከ100% የሚበልጥ በጣም የተጠናከረው አማራጭ ነው።'}
ex5['biz'] = {'en': 'Input companies and microfinance lenders need profit evidence like this before they invest or lend.', 'am': 'የግብዓት ኩባንያዎችና አነስተኛ የፋይናንስ አበዳሪዎች ኢንቨስት ከማድረጋቸው ወይም ከማበደራቸው በፊት እንዲህ ዓይነት የትርፍ ማስረጃ ያስፈልጋቸዋል።'}

M_en = [
 {'t': 'Linear mixed models and incomplete-block designs', 'd': '4 weeks · 16 h', 'o': ['Decide what is fixed and what is random', 'Fit mixed models with REML; read BLUEs and BLUPs', 'Design and analyse alpha-lattice and augmented trials'],
  'l': ['Fixed vs random effects: the question decides', 'REML variance components', 'BLUEs for comparing entries, BLUPs for predicting', 'Alpha-lattice designs for 50–500 entries', 'Augmented designs when seed is scarce', 'Missing data: why mixed models cope'],
  'a': 'Re-analyse an alpha-lattice variety trial both as RCBD and as a mixed model with incomplete blocks; compare standard errors and rankings.', 'm': 'R (lme4, lmerTest) or Python (statsmodels), trial data',
  'q': ['When should genotype be random?', 'Why do incomplete blocks raise precision?', 'What is shrinkage in a BLUP?'], 'tip': 'Draw the design on paper before writing the model formula.'},
 {'t': 'Multi-environment trials and G × E', 'd': '4 weeks · 16 h', 'o': ['Analyse trials across locations and years', 'Measure stability and adaptation', 'Identify mega-environments and target genotypes'],
  'l': ['Combined ANOVA and the right error terms', 'Finlay–Wilkinson and Eberhart–Russell stability', 'AMMI and GGE biplots', 'Which-won-where and mega-environments', 'Mixed models with G × E variance', 'Linking G × E to weather and soil covariates'],
  'a': 'Analyse a 10-genotype × 6-site teff MET, choose a release candidate for wide adaptation and target one genotype to a specific region.', 'm': 'R (metan) or Python, MET data',
  'q': ['What does a stability slope of 1.3 mean?', 'Why test genotype against G × E?', 'What is a mega-environment?'], 'tip': 'Map the sites and their weather beside every biplot.'},
 {'t': 'Spatial analysis of field trials', 'd': '2 weeks · 8 h', 'o': ['Detect field trends and patches in residuals', 'Fit spatial models (AR1 × AR1, splines)', 'Improve precision without more plots'],
  'l': ['Residual heat maps by row and column', 'Moving-average and nearest-neighbour adjustment', 'AR1 × AR1 correlation models', 'P-spline surfaces (SpATS)', 'Choosing models with AIC'],
  'a': 'Map residuals of a large variety trial by row and column, fit a spatial model, and show how rankings and heritability change.', 'm': 'R (SpATS, ASReml-R if available), field coordinates',
  'q': ['What does a residual heat map reveal?', 'Why record row and column for every plot?', 'How does spatial modelling raise heritability?'], 'tip': 'Insist on row and column coordinates in every field book.'},
 {'t': 'Generalised linear models', 'd': '3 weeks · 12 h', 'o': ['Model proportions, counts and binary outcomes', 'Check and handle overdispersion', 'Report odds ratios and rate ratios clearly'],
  'l': ['Binomial (logistic) models for germination and survival', 'Poisson and negative binomial for insect and weed counts', 'Overdispersion and quasi-likelihood', 'GLMMs: random blocks in a GLM', 'Odds ratios in plain words'],
  'a': 'Model seed germination after storage in hermetic bags vs sacks, and produce a safe-storage-time table for seed cooperatives.', 'm': 'R (glm, lme4::glmer) or Python, storage data',
  'q': ['Why not run ANOVA on germination percentages?', 'What does an odds ratio of 0.7 per month mean?', 'How do you detect overdispersion?'], 'tip': 'Choose the model from how the data were generated: counts of successes out of n trials are binomial.'},
 {'t': 'Response curves and economic optimum', 'd': '2 weeks · 8 h', 'o': ['Fit quadratic, plateau and Mitscherlich response models', 'Find agronomic and economic optimum rates', 'Turn results into price-ratio tables'],
  'l': ['Linear-plateau and quadratic-plateau models', 'Mitscherlich (diminishing returns)', 'Marginal product and the price ratio', 'Uncertainty in the optimum (bootstrap)', 'Site-specific recommendations'],
  'a': 'Fit a maize nitrogen response curve and build a table of optimum rates for 5 different fertilizer-to-grain price ratios.', 'm': 'Response trial data, Python or R',
  'q': ['Why is the economic optimum below the agronomic maximum?', 'What happens to the optimum when grain prices rise?', 'Which model fits a clear plateau?'], 'tip': 'Every response curve should end in a money table farmers can use.'},
 {'t': 'Multivariate analysis', 'd': '3 weeks · 12 h', 'o': ['Summarise many traits with PCA', 'Group accessions with cluster analysis', 'Use multivariate tools for genetic diversity and selection'],
  'l': ['Correlation matrices among traits', 'PCA: scores, loadings, biplots', 'Hierarchical and k-means clustering', 'Discriminant analysis', 'Diversity studies for gene banks'],
  'a': 'Run PCA and clustering on 30 sorghum landraces and propose 5 parents that combine yield and Striga resistance.', 'm': 'Characterisation data, Python or R',
  'q': ['Why standardise traits before PCA?', 'What does a loading tell you?', 'How many clusters are justified?'], 'tip': 'Always read loadings before naming a component.'},
 {'t': 'Repeated measures and growth curves', 'd': '2 weeks · 8 h', 'o': ['Analyse the same animals or plots over time', 'Fit growth curves for livestock and crops', 'Choose correlation structures for repeated data'],
  'l': ['Why repeated measures are not independent', 'Mixed models with time and animal effects', 'Gompertz and logistic growth curves', 'Lactation curves (Wood model)', 'Missing time points'],
  'a': 'Fit growth curves to monthly weights of lambs on two feeding systems and estimate the age at which each reaches market weight.', 'm': 'Animal weight records, R (nlme) or Python',
  'q': ['Why is a t-test at each month misleading?', 'What do Gompertz parameters mean?', 'How do you handle a missed weighing?'], 'tip': 'Livestock data are almost always repeated measures; treat them that way.'},
 {'t': 'Surveys, impact and economics', 'd': '4 weeks · 16 h', 'o': ['Design stratified and multistage farmer surveys', 'Model adoption with logistic regression', 'Judge profitability with partial budgets and MRR'],
  'l': ['Sampling frames and sample size', 'Stratified, cluster and multistage designs; survey weights', 'Logistic models of adoption', 'Impact evaluation basics: randomised trials, difference-in-differences, matching', 'Partial budget, dominance and marginal rate of return'],
  'a': 'Run a partial budget and MRR analysis for four fertilizer options and write a one-page profit recommendation.', 'm': 'Trial means, local prices, spreadsheet, Python or R',
  'q': ['What is a dominated treatment?', 'Why adjust trial yields down?', 'Why are survey weights needed in stratified samples?'], 'tip': 'A recommendation without a profit test is not a recommendation.'}]
M_am = [
 {'t': 'Linear mixed models እና ያልተሟሉ-ብሎክ ንድፎች', 'd': '4 ሳምንት · 16 ሰዓት', 'o': ['የትኛው fixed የትኛው random እንደሆነ መወሰን', 'mixed modelsን በREML መገጣጠም፤ BLUEsን እና BLUPsን ማንበብ', 'alpha-lattice እና augmented ሙከራዎችን መንደፍና መተንተን'],
  'l': ['Fixed vs random effects፡ ጥያቄው ይወስናል', 'የREML variance components', 'ዝርያዎችን ለማወዳደር BLUEs፣ ለመተንበይ BLUPs', 'ለ50–500 ዝርያዎች Alpha-lattice ንድፎች', 'ዘር እጥረት ሲኖር Augmented ንድፎች', 'የጎደለ ዳታ፡ mixed models ለምን ይቋቋማሉ'],
  'a': 'የalpha-lattice የዝርያ ሙከራን እንደ RCBD እና ያልተሟሉ ብሎኮች ያሉት mixed model አድርጋችሁ እንደገና ተንትኑ፤ standard errorsን እና ደረጃዎችን አወዳድሩ።', 'm': 'R (lme4፣ lmerTest) ወይም Python (statsmodels)፣ የሙከራ ዳታ',
  'q': ['ዝርያ random መሆን ያለበት መቼ ነው?', 'ያልተሟሉ ብሎኮች ትክክለኛነትን ለምን ይጨምራሉ?', 'በBLUP ውስጥ shrinkage ምንድነው?'], 'tip': 'የሞዴሉን ቀመር ከመጻፍህ በፊት ንድፉን በወረቀት ላይ ሥለው።'},
 {'t': 'Multi-environment ሙከራዎችና G × E', 'd': '4 ሳምንት · 16 ሰዓት', 'o': ['በቦታዎችና በዓመታት ሙከራዎችን መተንተን', 'መረጋጋትንና መላመድን መለካት', 'mega-environmentsን መለየትና ዝርያዎችን ማነጣጠር'],
  'l': ['Combined ANOVA እና ትክክለኛዎቹ የስህተት ክፍሎች', 'Finlay–Wilkinson እና Eberhart–Russell stability', 'AMMI እና GGE biplots', 'Which-won-where እና mega-environments', 'Mixed models ከG × E variance ጋር', 'G × Eን ከአየር ሁኔታና ከአፈር covariates ጋር ማገናኘት'],
  'a': 'የ10 ዝርያ × 6 ቦታ የጤፍ METን ተንትናችሁ ለሰፊ መላመድ የመልቀቂያ ዕጩ ምረጡ፣ አንድ ዝርያንም ለተወሰነ ክልል አነጣጥሩ።', 'm': 'R (metan) ወይም Python፣ የMET ዳታ',
  'q': ['1.3 የstability slope ምን ማለት ነው?', 'ዝርያ በG × E ላይ ለምን ይፈተናል?', 'mega-environment ምንድነው?'], 'tip': 'ከእያንዳንዱ biplot ጎን ቦታዎቹንና የአየር ሁኔታቸውን ካርታ አስቀምጥ።'},
 {'t': 'የመስክ ሙከራዎች spatial ትንተና', 'd': '2 ሳምንት · 8 ሰዓት', 'o': ['በresiduals ውስጥ የመስክ አዝማሚያዎችንና ጠጋኝ ቦታዎችን መለየት', 'spatial ሞዴሎችን መገጣጠም (AR1 × AR1፣ splines)', 'ተጨማሪ ማሳ ሳይኖር ትክክለኛነትን ማሻሻል'],
  'l': ['በረድፍና በዓምድ የresidual heat maps', 'Moving-average እና nearest-neighbour ማስተካከያ', 'AR1 × AR1 የተዛምዶ ሞዴሎች', 'P-spline ገጽታዎች (SpATS)', 'ሞዴሎችን በAIC መምረጥ'],
  'a': 'የአንድ ትልቅ የዝርያ ሙከራ residualsን በረድፍና በዓምድ ካርታ አድርጋችሁ spatial ሞዴል ገጥሙ፤ ደረጃዎችና heritability እንዴት እንደሚለወጡ አሳዩ።', 'm': 'R (SpATS፣ ካለ ASReml-R)፣ የመስክ መጋጠሚያዎች',
  'q': ['የresidual heat map ምን ይገልጻል?', 'ለእያንዳንዱ ማሳ ረድፍና ዓምድ ለምን ይመዘገባል?', 'spatial ሞዴሊንግ heritabilityን እንዴት ይጨምራል?'], 'tip': 'በእያንዳንዱ የመስክ መዝገብ ውስጥ የረድፍና የዓምድ መጋጠሚያዎች ላይ አጥብቅ።'},
 {'t': 'Generalised linear models', 'd': '3 ሳምንት · 12 ሰዓት', 'o': ['ምጣኔዎችን፣ ቁጥሮችንና ባለ ሁለት ውጤቶችን ሞዴል ማድረግ', 'overdispersionን መፈተሽና መያዝ', 'odds ratiosን እና rate ratiosን በግልጽ ሪፖርት ማድረግ'],
  'l': ['Binomial (logistic) ሞዴሎች ለመብቀልና ለመትረፍ', 'Poisson እና negative binomial ለነፍሳትና ለአረም ቁጥሮች', 'Overdispersion እና quasi-likelihood', 'GLMMs፡ random ብሎኮች በGLM ውስጥ', 'Odds ratios በቀላል ቃላት'],
  'a': 'ዘር በhermetic ከረጢቶችና በጆንያዎች ከተከማቸ በኋላ ያለውን መብቀል ሞዴል አድርጋችሁ ለዘር ማኅበራት ደኅንነቱ የተጠበቀ የማከማቻ ጊዜ ሰንጠረዥ አዘጋጁ።', 'm': 'R (glm፣ lme4::glmer) ወይም Python፣ የማከማቻ ዳታ',
  'q': ['በመብቀል መቶኛዎች ላይ ለምን ANOVA አታካሂድም?', 'በወር 0.7 odds ratio ምን ማለት ነው?', 'overdispersionን እንዴት ታውቃለህ?'], 'tip': 'ሞዴሉን ዳታው በተፈጠረበት መንገድ ምረጥ፡ ከn ሙከራዎች የተሳኩ ቁጥሮች binomial ናቸው።'},
 {'t': 'የምላሽ ኩርባዎችና የኢኮኖሚ ምርጥ ነጥብ', 'd': '2 ሳምንት · 8 ሰዓት', 'o': ['quadratic፣ plateau እና Mitscherlich የምላሽ ሞዴሎችን መገጣጠም', 'የአግሮኖሚና የኢኮኖሚ ምርጥ መጠኖችን ማግኘት', 'ውጤቶችን ወደ የዋጋ-ምጣኔ ሰንጠረዦች መቀየር'],
  'l': ['Linear-plateau እና quadratic-plateau ሞዴሎች', 'Mitscherlich (እየቀነሰ የሚሄድ ተመላሽ)', 'Marginal product እና የዋጋ ምጣኔ', 'በምርጥ ነጥቡ ውስጥ ያለ እርግጠኛ አለመሆን (bootstrap)', 'ቦታ-ተኮር ምክሮች'],
  'a': 'የበቆሎ ናይትሮጅን ምላሽ ኩርባን ገጥማችሁ ለ5 የተለያዩ የማዳበሪያ-ለእህል የዋጋ ምጣኔዎች የምርጥ መጠኖች ሰንጠረዥ ገንቡ።', 'm': 'የምላሽ ሙከራ ዳታ፣ Python ወይም R',
  'q': ['የኢኮኖሚ ምርጥ ነጥብ ከአግሮኖሚ ከፍተኛ ነጥብ ለምን ያንሳል?', 'የእህል ዋጋ ሲጨምር ምርጥ ነጥቡ ምን ይሆናል?', 'ግልጽ plateauን የሚስማማው የትኛው ሞዴል ነው?'], 'tip': 'እያንዳንዱ የምላሽ ኩርባ ገበሬዎች ሊጠቀሙበት በሚችሉት የገንዘብ ሰንጠረዥ መጠናቀቅ አለበት።'},
 {'t': 'Multivariate ትንተና', 'd': '3 ሳምንት · 12 ሰዓት', 'o': ['ብዙ ባሕሪያትን በPCA ማጠቃለል', 'ናሙናዎችን በcluster analysis ማቧደን', 'ለዘረመል ብዝኃነትና ለምርጫ multivariate መሣሪያዎችን መጠቀም'],
  'l': ['በባሕሪያት መካከል የተዛምዶ ማትሪክሶች', 'PCA፡ scores፣ loadings፣ biplots', 'Hierarchical እና k-means clustering', 'Discriminant analysis', 'ለጂን ባንኮች የብዝኃነት ጥናቶች'],
  'a': 'በ30 የማሽላ የሀገር በቀል ዝርያዎች ላይ PCA እና clustering አካሂዳችሁ ምርትንና የStriga መቋቋምን የሚያጣምሩ 5 ወላጆችን አቅርቡ።', 'm': 'የመለያ ዳታ፣ Python ወይም R',
  'q': ['ከPCA በፊት ባሕሪያትን ለምን standardise እናደርጋለን?', 'loading ምን ይነግርሃል?', 'ስንት clusters ተገቢ ናቸው?'], 'tip': 'componentን ከመሰየምህ በፊት ሁልጊዜ loadingsን አንብብ።'},
 {'t': 'Repeated measures እና የዕድገት ኩርባዎች', 'd': '2 ሳምንት · 8 ሰዓት', 'o': ['አንድ ዓይነት እንስሳትን ወይም ማሳዎችን በጊዜ ሂደት መተንተን', 'ለእንስሳትና ለሰብሎች የዕድገት ኩርባዎችን መገጣጠም', 'ለተደጋጋሚ ዳታ የተዛምዶ መዋቅሮችን መምረጥ'],
  'l': ['repeated measures ለምን ነፃ አይደሉም', 'የጊዜና የእንስሳ ውጤቶች ያሏቸው mixed models', 'Gompertz እና logistic የዕድገት ኩርባዎች', 'የወተት ምርት ኩርባዎች (Wood ሞዴል)', 'የጎደሉ የጊዜ ነጥቦች'],
  'a': 'በሁለት የመኖ ሥርዓቶች ላይ ያሉ ጠቦቶችን ወርሃዊ ክብደቶች የዕድገት ኩርባዎች ገጥማችሁ እያንዳንዳቸው የገበያ ክብደት የሚደርሱበትን ዕድሜ ገምቱ።', 'm': 'የእንስሳት ክብደት መዝገቦች፣ R (nlme) ወይም Python',
  'q': ['በእያንዳንዱ ወር t-test ለምን ያሳስታል?', 'የGompertz parameters ምን ማለት ናቸው?', 'ያመለጠ ሚዛንን እንዴት ትይዛለህ?'], 'tip': 'የእንስሳት ዳታ ሁልጊዜ ማለት ይቻላል repeated measures ነው፤ እንደዚያው ያዘው።'},
 {'t': 'ዳሰሳዎች፣ ተጽዕኖና ኢኮኖሚክስ', 'd': '4 ሳምንት · 16 ሰዓት', 'o': ['stratified እና multistage የገበሬ ዳሰሳዎችን መንደፍ', 'መቀበልን በlogistic regression ሞዴል ማድረግ', 'ትርፋማነትን በpartial budgets እና በMRR መዳኘት'],
  'l': ['የናሙና ማዕቀፎችና የናሙና መጠን', 'Stratified፣ cluster እና multistage ንድፎች፤ የዳሰሳ ክብደቶች', 'የመቀበል logistic ሞዴሎች', 'የተጽዕኖ ግምገማ መሠረቶች፡ በዘፈቀደ ሙከራዎች፣ difference-in-differences፣ matching', 'Partial budget፣ dominance እና marginal rate of return'],
  'a': 'ለአራት የማዳበሪያ አማራጮች partial budget እና MRR ትንተና አካሂዳችሁ የአንድ ገጽ የትርፍ ምክር ጻፉ።', 'm': 'የሙከራ አማካዮች፣ የአካባቢ ዋጋዎች፣ ስፕሬድሺት፣ Python ወይም R',
  'q': ['dominated ሕክምና ምንድነው?', 'የሙከራ ምርቶችን ለምን ዝቅ እናደርጋለን?', 'በstratified ናሙናዎች ውስጥ የዳሰሳ ክብደቶች ለምን ያስፈልጋሉ?'], 'tip': 'የትርፍ ፈተና የሌለው ምክር ምክር አይደለም።'}]

S5 = {'name': {'en': 'Applied Agricultural Analyst', 'am': 'የግብርና ተግባራዊ ተንታኝ'},
      'stage': {'en': 'MSc / professional · 1–3 years', 'am': 'ሁለተኛ ዲግሪ / ባለሙያ · 1–3 ዓመት'},
      'goal': {'en': 'Analysts handle the data agriculture really produces: unbalanced and incomplete trials, many sites and years, counts and proportions, many traits, repeated measures, surveys and money. Every analysis ends in a recommendation with a profit test.',
               'am': 'ተንታኞች ግብርና በእውነት የሚያመነጨውን ዳታ ይይዛሉ፡ ሚዛናዊ ያልሆኑና ያልተሟሉ ሙከራዎች፣ ብዙ ቦታዎችና ዓመታት፣ ቁጥሮችና ምጣኔዎች፣ ብዙ ባሕሪያት፣ repeated measures፣ ዳሰሳዎችና ገንዘብ። እያንዳንዱ ትንተና የትርፍ ፈተና ባለው ምክር ይጠናቀቃል።'},
      'mods': {'en': M_en, 'am': M_am}, 'ex': [ex1, ex2, ex3, ex4, ex5]}
emit(5, S5)
for e in S5['ex']:
    print(f"--- {e['id']}\n{e['out']}\n")
