from lib import *
from qgviz import *
from scipy import stats
rng = np.random.default_rng(606)

# ---------- heritability (sire half-sib) + sire BLUP
n_s, n_p = 20, 8; s_eff = rng.normal(0, np.sqrt(0.6), n_s)   # sigma2_s = 0.6, sigma2_e = 8.4 -> h2 ~ 0.27
rows = []
for i in range(n_s):
    k = n_p if i % 5 else 4                                     # some sires have fewer lambs
    for j in range(k):
        rows.append({'sire': f'S{i+1:02d}', 'lamb': f'S{i+1:02d}-{j+1}', 'weaning_wt_kg': round(float(14 + s_eff[i] + rng.normal(0, np.sqrt(8.4))), 1)})
save_csv(pd.DataFrame(rows), 's6_sheep_halfsib.csv')
ex1 = example('s6-h2',
 {'en': 'How heritable is lamb weaning weight, and which rams should be kept as sires?', 'am': 'የጠቦት ጡት መጣያ ክብደት ምን ያህል በዘር ይወረሳል? የትኞቹ አውራ በጎች እንደ ወላጅ መቆየት አለባቸው?'},
 {'en': 'A community breeding programme recorded weaning weight of lambs from 20 rams (4–8 lambs each, unrelated ewes).', 'am': 'የማኅበረሰብ የዝርያ ማሻሻያ ፕሮግራም ከ20 አውራ በጎች (እያንዳንዳቸው 4–8 ጠቦቶች፣ ዝምድና የሌላቸው በጎች) የጠቦቶችን ጡት መጣያ ክብደት መዘገበ።'},
 {'en': 'Paternal half-sib design → variance components by ANOVA, heritability h² = 4σ²s/(σ²s+σ²e), sire BLUPs with shrinkage', 'am': 'የአባት ግማሽ ወንድማማች ንድፍ → variance components በANOVA፣ heritability h² = 4σ²s/(σ²s+σ²e)፣ የአውራ BLUPs ከshrinkage ጋር'},
 's6_sheep_halfsib.csv',
 '''
import pandas as pd, numpy as np
d = pd.read_csv("s6_sheep_halfsib.csv"); y = d.weaning_wt_kg; mu = y.mean()
g = d.groupby("sire").weaning_wt_kg; n_i, m_i = g.size(), g.mean()
s, N = len(n_i), len(d)
ss_s = (n_i * (m_i - mu)**2).sum(); ss_e = ((y - g.transform("mean"))**2).sum()
ms_s, ms_e = ss_s / (s - 1), ss_e / (N - s)
k = (N - (n_i**2).sum() / N) / (s - 1)                  # average family size for unbalanced data
var_s = max((ms_s - ms_e) / k, 0); var_e = ms_e
h2 = 4 * var_s / (var_s + var_e)
print(f"MS sire = {ms_s:.2f}, MS error = {ms_e:.2f}, k = {k:.2f}")
print(f"sigma2_sire = {var_s:.3f}, sigma2_error = {var_e:.3f}, h2 = {h2:.2f}")
t = var_s / (var_s + var_e)                              # intraclass correlation = h2 / 4
se_h2 = 4 * np.sqrt(2 * (1 - t)**2 * (1 + (k - 1) * t)**2 / (k * (k - 1) * (s - 1)))   # Falconer & Mackay
print(f"SE(h2) = {se_h2:.2f}; approx. 95% CI {max(h2 - 1.96*se_h2, 0):.2f} to {min(h2 + 1.96*se_h2, 1):.2f}")
var_a = 4 * var_s                                        # additive genetic variance
lam = var_e / var_s                                      # shrinkage ratio = (4 - h2) / h2
rel = n_i / (n_i + lam)                                  # reliability of each sire's EBV
ebv = 2 * rel * (m_i - mu)                               # EBV = 2 x BLUP of the sire effect
sep = np.sqrt((1 - rel) * var_a)                         # standard error of prediction
tab = pd.DataFrame({"lambs": n_i, "raw_mean": m_i, "EBV_kg": ebv, "reliab": rel, "SEP_kg": sep}).round(2)
tab = tab.sort_values("EBV_kg", ascending=False)
print(tab.head(5)); print("..."); print(tab.tail(3))
''',
 '''
library(lme4)
d <- read.csv("s6_sheep_halfsib.csv")
m <- lmer(weaning_wt_kg ~ 1 + (1 | sire), data = d)        # REML variance components
vc <- as.data.frame(VarCorr(m)); s2s <- vc$vcov[1]; s2e <- vc$vcov[2]
h2 <- 4 * s2s / (s2s + s2e); h2
ebv <- 2 * ranef(m)$sire; head(ebv[order(-ebv[, 1]), , drop = FALSE])
# full animal model with pedigree: MCMCglmm, sommer, BLUPF90
''', None, None)
d6 = pd.read_csv(os.path.join(DATA, 's6_sheep_halfsib.csv')); g6 = d6.groupby('sire').weaning_wt_kg; mu6 = d6.weaning_wt_kg.mean()
ni, mi = g6.size(), g6.mean(); s_, N_ = len(ni), len(d6)
mss = (ni * (mi - mu6)**2).sum() / (s_ - 1); mse = ((d6.weaning_wt_kg - g6.transform('mean'))**2).sum() / (N_ - s_)
k_ = (N_ - (ni**2).sum() / N_) / (s_ - 1); vs = max((mss - mse) / k_, 0); h2 = 4 * vs / (vs + mse)
ebv = 2 * (ni / (ni + mse / vs)) * (mi - mu6); top = ebv.sort_values(ascending=False)
ns1 = ex1['_ns']; se1 = ns1['se_h2']; lo1, hi1 = max(h2 - 1.96*se1, 0), min(h2 + 1.96*se1, 1); rel1 = ns1['rel']; sep1 = ns1['sep']
rawtop = mi.idxmax()
ex1['read'] = {'en': [f'h² = {h2:.2f} ± {se1:.2f} (SE): {100*h2:.0f}% of the phenotypic variance in weaning weight is additive genetic, but with only {s_} sires the 95% interval runs from {lo1:.2f} to {hi1:.2f}. These data were simulated with a true h² of 0.27, which lies inside it. A precise half-sib estimate needs 50–100+ sires.',
                      f'Reliability of a sire EBV = n / (n + λ), with λ = (4 − h²)/h² = {mse/vs:.0f}. Here reliabilities are only {rel1.min():.2f}–{rel1.max():.2f}, so the error bars (EBV ± 1.96 × SEP) overlap for most sires.',
                      'A sire’s EBV is its estimated genetic merit passed to offspring, in kg above or below the flock average.',
                      'BLUP shrinks sires with few lambs towards zero: a high raw mean from 4 lambs is less trustworthy than the same mean from 8.',
                      f'Top sires by EBV: {", ".join(top.index[:3])}. The sire with the highest raw mean is {rawtop}{" (also top by EBV)" if rawtop == top.index[0] else ", but shrinkage moves it down"}.'],
               'am': [f'h² = {h2:.2f} ± {se1:.2f} (SE)፡ በጡት መጣያ ክብደት የphenotypic variance {100*h2:.0f}% additive genetic ነው፤ ግን {s_} አውራዎች ብቻ ስላሉ 95% ክልሉ ከ{lo1:.2f} እስከ {hi1:.2f} ይደርሳል። ይህ ዳታ በእውነተኛ h² 0.27 የተመሰለ ነው፤ ይህም በክልሉ ውስጥ ነው። ትክክለኛ የhalf-sib ግምት 50–100+ አውራዎች ይፈልጋል።',
                      f'የአውራ EBV አስተማማኝነት (reliability) = n / (n + λ)፣ λ = (4 − h²)/h² = {mse/vs:.0f}። እዚህ አስተማማኝነቶቹ {rel1.min():.2f}–{rel1.max():.2f} ብቻ ናቸው፤ ስለዚህ የስህተት መስመሮቹ (EBV ± 1.96 × SEP) ለአብዛኞቹ አውራዎች ይደራረባሉ።',
                      'የአውራ EBV ለዘሮቹ የሚያስተላልፈው የተገመተ የዘረመል ብቃት ነው፤ ከመንጋው አማካይ በላይ ወይም በታች በኪሎግራም።',
                      'BLUP ጥቂት ጠቦቶች ያሏቸውን አውራዎች ወደ ዜሮ ያጠጋል፡ ከ4 ጠቦቶች የተገኘ ከፍተኛ ጥሬ አማካይ ከ8 ጠቦቶች ከተገኘ ተመሳሳይ አማካይ ያነሰ ታማኝ ነው።',
                      f'በEBV ከፍተኛዎቹ አውራዎች፡ {", ".join(top.index[:3])}። ከፍተኛ ጥሬ አማካይ ያለው አውራ {rawtop} ነው{" (በEBVም ከፍተኛ)" if rawtop == top.index[0] else "፤ ግን shrinkage ወደ ታች ያወርደዋል"}።']}
ex1['decide'] = {'en': f'Use {top.index[0]} most widely; keep {", ".join(top.index[1:4])} as breeding rams and cull the bottom sires, treating the middle of the ranking as provisional. Record 20+ lambs per ram and more sires to raise reliability.', 'am': f'{top.index[0]}ን በብዛት ተጠቀሙ፤ {", ".join(top.index[1:4])}ን የዝርያ አውራዎች አድርጋችሁ አቆዩ፣ ዝቅተኛዎቹን አስወግዱ፤ የደረጃው መካከለኛ ክፍል ጊዜያዊ መሆኑን አስታውሱ። አስተማማኝነትን ለማሳደግ በአንድ አውራ 20+ ጠቦቶችንና ብዙ አውራዎችን መዝግቡ።'}
ex1['biz'] = {'en': 'Selling performance-recorded rams with EBVs earns more than selling unrecorded rams; breeders pay for the EBV service.', 'am': 'EBV ያላቸው በአፈጻጸም የተመዘገቡ አውራዎችን መሸጥ ካልተመዘገቡት ይበልጥ ያስገኛል፤ አርቢዎች ለEBV አገልግሎቱ ይከፍላሉ።'}

# ---------- GWAS
n, m = 240, 300
pops = np.repeat([0, 1], n // 2)
freqs = np.vstack([rng.uniform(0.1, 0.5, m), rng.uniform(0.1, 0.9, m)])
Xg = np.array([rng.binomial(2, freqs[p]) for p in pops])
qtl = [57, 211]; beta = np.zeros(m); beta[qtl] = [1.1, -0.9]
yv = 30 + Xg @ beta + 2.0 * pops + rng.normal(0, 1.2, n)          # population effect = confounding
geno = pd.DataFrame(Xg, columns=[f'snp{i:03d}' for i in range(1, m + 1)])
geno.insert(0, 'trait', np.round(yv, 2)); geno.insert(0, 'id', [f'A{i:03d}' for i in range(1, n + 1)])
save_csv(geno, 's6_gwas_snps.csv')
ex2 = example('s6-gwas',
 {'en': 'Which DNA markers are linked to body weight, after correcting for population structure?', 'am': 'የሕዝብ መዋቅር ከተስተካከለ በኋላ ከሰውነት ክብደት ጋር የተያያዙት የትኞቹ የDNA ምልክቶች ናቸው?'},
 {'en': '240 animals from two populations genotyped for 300 SNPs (coded 0/1/2) and weighed.', 'am': 'ከሁለት ሕዝቦች የተውጣጡ 240 እንስሳት ለ300 SNPs (0/1/2 ተብለው የተሰየሙ) genotype ተደርገው ተመዝነዋል።'},
 {'en': 'GWAS: single-SNP regression with genomic principal components as covariates; Bonferroni and Benjamini–Hochberg FDR', 'am': 'GWAS፡ ጂኖሚክ principal components እንደ covariates ያሉበት ነጠላ-SNP regression፤ Bonferroni እና Benjamini–Hochberg FDR'},
 's6_gwas_snps.csv',
 '''
import pandas as pd, numpy as np
from scipy import stats
d = pd.read_csv("s6_gwas_snps.csv")
y = d.trait.values; X = d.filter(like="snp").values.astype(float); n, m = X.shape
Z = (X - X.mean(0)) / X.std(0)
pcs = np.linalg.svd(Z, full_matrices=False)[0][:, :3]           # population structure
def scan(cov):
    p = np.empty(m)
    for j in range(m):
        D = np.column_stack([np.ones(n), cov, X[:, j]]) if cov is not None else np.column_stack([np.ones(n), X[:, j]])
        b, *_ = np.linalg.lstsq(D, y, rcond=None); r = y - D @ b
        df = n - D.shape[1]; se = np.sqrt(r @ r / df * np.linalg.inv(D.T @ D)[-1, -1])
        p[j] = 2 * stats.t.sf(abs(b[-1] / se), df)
    return p
pv = {}
for label, cov in [("No correction", None), ("With 3 PCs", pcs)]:
    p = pv[label] = scan(cov)
    order = np.argsort(p); bh = p[order] * m / np.arange(1, m + 1)
    fdr_hits = order[: (np.where(bh < 0.05)[0].max() + 1) if (bh < 0.05).any() else 0]
    bonf = np.where(p < 0.05 / m)[0]
    lam = np.median(stats.chi2.isf(p, 1)) / 0.4549               # genomic inflation factor
    names = [f"snp{i+1:03d}" for i in bonf]
    shown = names if len(names) <= 6 else names[:5] + [f"... {len(names)-5} more"]
    print(f"{label}: lambda = {lam:.2f}, Bonferroni hits ({len(bonf)}) = {shown}, FDR hits = {len(fdr_hits)}")
''',
 '''
# R with rrBLUP (mixed-model GWAS with kinship and PCs)
library(rrBLUP)
d <- read.csv("s6_gwas_snps.csv")
M <- as.matrix(d[, grep("snp", names(d))]) - 1                  # code -1/0/1
geno <- data.frame(marker = colnames(M), chrom = 1, pos = seq_len(ncol(M)), t(M))
pheno <- data.frame(id = colnames(geno)[-(1:3)], trait = d$trait)
scores <- GWAS(pheno, geno, n.PC = 3, plot = TRUE)              # Manhattan + QQ plots
# large data: GAPIT, GEMMA, PLINK --linear with --covar
''', None, None)
ex2['read'] = {'en': ['Without correction, the population difference makes many unrelated markers look significant; the inflation factor λ is well above 1.',
                      'Adding 3 genomic principal components brings λ close to 1, and only the true signals remain.',
                      'Bonferroni divides 0.05 by 300 tests; FDR controls the share of false discoveries among hits and is less strict.'],
               'am': ['ያለ ማስተካከያ የሕዝቦቹ ልዩነት ብዙ ያልተያያዙ ምልክቶችን ጉልህ አስመስሎ ያሳያል፤ የinflation factor λ ከ1 በላይ በጣም ከፍ ይላል።',
                      '3 ጂኖሚክ principal components መጨመር λን ወደ 1 ያቀርበዋል፤ እውነተኛዎቹ ምልክቶች ብቻ ይቀራሉ።',
                      'Bonferroni 0.05ን በ300 ፈተናዎች ያካፍላል፤ FDR ከተገኙት መካከል የሐሰት ግኝቶችን ድርሻ ይቆጣጠራል፣ ያነሰ ጥብቅ ነው።']}
hits = ' and '.join(f'snp{q+1:03d}' for q in qtl)
ex2['decide'] = {'en': f'Validate the corrected hits ({hits} regions) in an independent population before using them in marker-assisted selection.', 'am': f'የተስተካከሉትን ግኝቶች (የ{hits} ክልሎች) በmarker-assisted selection ከመጠቀማችሁ በፊት በገለልተኛ ሕዝብ ውስጥ አረጋግጡ።'}
ex2['biz'] = {'en': 'Validated markers become diagnostic tests that genotyping labs sell to breeders.', 'am': 'የተረጋገጡ ምልክቶች የgenotyping ላብራቶሪዎች ለአርቢዎች የሚሸጧቸው የምርመራ ፈተናዎች ይሆናሉ።'}

# ---------- genomic prediction (same genotypes, polygenic trait)
bpoly = rng.normal(0, 0.12, m); gp_y = 50 + Xg @ bpoly + rng.normal(0, 1.0, n)
gp = geno.copy(); gp['trait'] = np.round(gp_y, 2); save_csv(gp, 's6_genomic_prediction.csv')
ex3 = example('s6-gp',
 {'en': 'How accurately can we predict an animal’s merit from its DNA alone?', 'am': 'የእንስሳን ብቃት ከDNAው ብቻ በምን ያህል ትክክለኛነት መተንበይ እንችላለን?'},
 {'en': 'The same 240 genotyped animals, now with a trait controlled by many small genes.', 'am': 'እነዚያው 240 genotype የተደረጉ እንስሳት፣ አሁን በብዙ ትናንሽ ጂኖች የሚቆጣጠር ባሕሪ ያላቸው።'},
 {'en': 'Genomic prediction → ridge regression (equivalent to rrBLUP/GBLUP) with 5-fold cross-validation; predictive ability = cor(predicted, observed); accuracy = ability / √h²', 'am': 'Genomic prediction → ridge regression (ከrrBLUP/GBLUP ጋር ተመጣጣኝ) ከ5-fold cross-validation ጋር፤ predictive ability = cor(የተተነበየ, የታየ)፤ ትክክለኛነት (accuracy) = ability / √h²'},
 's6_genomic_prediction.csv',
 '''
import pandas as pd, numpy as np
from sklearn.linear_model import Ridge
from sklearn.model_selection import KFold, cross_val_predict
d = pd.read_csv("s6_genomic_prediction.csv")
y = d.trait.values; X = d.filter(like="snp").values.astype(float); X = X - X.mean(0)
kf = KFold(5, shuffle=True, random_state=1)
res = {}
for alpha in [1, 30, 100, 300, 1000]:
    ability = []                                                 # predictive ability = cor(predicted, observed)
    for tr, te in kf.split(X):
        model = Ridge(alpha=alpha).fit(X[tr], y[tr])
        ability.append(np.corrcoef(model.predict(X[te]), y[te])[0, 1])
    res[alpha] = ability
    print(f"ridge alpha = {alpha:5d}: predictive ability = {np.mean(ability):.2f} (folds {min(ability):.2f}-{max(ability):.2f})")
best = max(res, key=lambda a: np.mean(res[a])); h2 = 0.78     # h2 of this trait (from REML; here known from the simulation)
pred = cross_val_predict(Ridge(alpha=best), X, y, cv=kf)
print(f"best alpha = {best}: accuracy of GEBV = ability / sqrt(h2) = {np.mean(res[best]):.2f} / {np.sqrt(h2):.2f} = {np.mean(res[best]) / np.sqrt(h2):.2f}")
''',
 '''
library(rrBLUP)
d <- read.csv("s6_genomic_prediction.csv")
M <- as.matrix(d[, grep("snp", names(d))]) - 1
folds <- sample(rep(1:5, length.out = nrow(d))); acc <- c()
for (k in 1:5) {
  tr <- folds != k
  fit <- mixed.solve(d$trait[tr], Z = M[tr, ])                  # REML picks the shrinkage
  pred <- M[!tr, ] %*% fit$u
  acc[k] <- cor(pred, d$trait[!tr])
}
mean(acc)        # Bayesian alternatives: BGLR (BayesA, BayesB, BayesC)
''', None, None)
Xc = Xg - Xg.mean(0)
from sklearn.linear_model import Ridge
from sklearn.model_selection import KFold
ns3 = ex3['_ns']; res3 = ns3['res']; best_a = ns3['best']; ab = float(np.mean(res3[best_a])); acc3 = ab / np.sqrt(ns3['h2'])
ex3['read'] = {'en': ['Cross-validation hides one fifth of the animals, predicts them from the rest, and repeats five times: an honest test of prediction.',
                      f'Predictive ability (the correlation between predicted and observed values) peaks at alpha = {best_a} ({ab:.2f}); too little shrinkage overfits, too much ignores real signals.',
                      f'The observed value contains environmental noise, so the accuracy of the genomic breeding value (correlation with the TRUE breeding value) is ability / √h² = {ab:.2f} / {np.sqrt(ns3["h2"]):.2f} = {acc3:.2f}. Always say which of the two you report.',
                      'Accuracy grows with the size of the training population, with heritability and with relatedness between training and selection candidates; 240 animals is a small start.'],
               'am': ['Cross-validation ከእንስሳቱ አንድ አምስተኛውን ደብቆ ከሌሎቹ ይተነብያቸዋል፣ አምስት ጊዜ ይደግማል፡ የትንበያ ታማኝ ፈተና ነው።',
                      f'Predictive ability (በተተነበየውና በታየው እሴት መካከል ያለ ተዛምዶ) በalpha = {best_a} ላይ ከፍተኛ ነው ({ab:.2f})፤ በጣም ትንሽ shrinkage ከመጠን በላይ ይገጥማል፣ በጣም ብዙ እውነተኛ ምልክቶችን ችላ ይላል።',
                      f'የታየው እሴት የአካባቢ ጫጫታ ስላለው የጂኖሚክ breeding value ትክክለኛነት (ከእውነተኛው breeding value ጋር ያለ ተዛምዶ) = ability / √h² = {ab:.2f} / {np.sqrt(ns3["h2"]):.2f} = {acc3:.2f} ነው። ከሁለቱ የትኛውን እንደምትዘግብ ሁልጊዜ ግለጽ።',
                      'ትክክለኛነት በሥልጠና ሕዝቡ መጠን፣ በheritability እና በሥልጠና ሕዝቡና በምርጫ ዕጩዎች መካከል ባለው ዝምድና ይጨምራል፤ 240 እንስሳት ትንሽ ጅምር ነው።']}
ex3['decide'] = {'en': 'Use genomic predictions to pre-select young animals before they have their own records, and grow the training population every year.', 'am': 'ወጣት እንስሳትን የራሳቸው መዝገብ ከመኖራቸው በፊት ቀድመው ለመምረጥ ጂኖሚክ ትንበያዎችን ተጠቀሙ፤ የሥልጠና ሕዝቡንም በየዓመቱ አሳድጉ።'}
ex3['biz'] = {'en': 'Genomic evaluation services (genotype + prediction) are a growing business for breeding companies and cooperatives.', 'am': 'የጂኖሚክ ግምገማ አገልግሎቶች (genotype + ትንበያ) ለዝርያ ማሻሻያ ኩባንያዎችና ለማኅበራት እያደገ ያለ ንግድ ናቸው።'}

# ---------- random forest yield prediction
nf = 400
rain = rng.normal(900, 180, nf); ndvi = np.clip(0.35 + 0.0003 * (rain - 900) + rng.normal(0, 0.06, nf), 0.1, 0.9)
nrate = rng.choice([0, 46, 92], nf); soc = rng.normal(1.6, 0.4, nf); improved = rng.binomial(1, 0.5, nf)
yy = 1.2 + 0.0019 * np.minimum(rain, 1050) + 3.0 * ndvi + 0.014 * nrate * (soc > 1.3) + 0.006 * nrate + 0.5 * improved + rng.normal(0, 0.35, nf)
farms = pd.DataFrame({'farm': range(1, nf + 1), 'rain_mm': rain.round(0), 'ndvi_flowering': ndvi.round(3), 'N_kg_ha': nrate, 'soil_org_carbon_pct': soc.round(2), 'improved_seed': improved, 'yield_t_ha': yy.round(2)})
save_csv(farms, 's6_farm_yield_ml.csv')
ex4 = example('s6-rf',
 {'en': 'Can we predict farm wheat yield from rainfall, satellite NDVI, fertilizer and soil?', 'am': 'የእርሻ ስንዴ ምርትን ከዝናብ፣ ከሳተላይት NDVI፣ ከማዳበሪያና ከአፈር መተንበይ እንችላለን?'},
 {'en': '400 farms with season rainfall, NDVI at flowering, N rate, soil organic carbon, seed type and measured yield.', 'am': 'የወቅት ዝናብ፣ በአበባ ጊዜ NDVI፣ የN መጠን፣ የአፈር ኦርጋኒክ ካርቦን፣ የዘር ዓይነትና የተለካ ምርት ያላቸው 400 እርሻዎች።'},
 {'en': 'Prediction → random forest vs linear regression, 5-fold cross-validated R² and RMSE, permutation feature importance', 'am': 'ትንበያ → random forest vs linear regression፣ በ5-fold cross-validation R² እና RMSE፣ permutation feature importance'},
 's6_farm_yield_ml.csv',
 '''
import pandas as pd, numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import cross_val_predict, KFold
from sklearn.inspection import permutation_importance
d = pd.read_csv("s6_farm_yield_ml.csv")
X = d.drop(columns=["farm", "yield_t_ha"]); y = d.yield_t_ha
cv = KFold(5, shuffle=True, random_state=0)
for name, model in [("Linear regression", LinearRegression()), ("Random forest", RandomForestRegressor(300, min_samples_leaf=5, random_state=0))]:
    pred = cross_val_predict(model, X, y, cv=cv)
    r2 = 1 - ((y - pred)**2).sum() / ((y - y.mean())**2).sum(); rmse = np.sqrt(((y - pred)**2).mean())
    print(f"{name:18s} CV R2 = {r2:.2f}, RMSE = {rmse:.2f} t/ha")
rf = RandomForestRegressor(300, min_samples_leaf=5, random_state=0).fit(X, y)
imp = permutation_importance(rf, X, y, n_repeats=10, random_state=0)
print("Importance (drop in R2 when shuffled):")
for f, v in sorted(zip(X.columns, imp.importances_mean), key=lambda t: -t[1]):
    print(f"  {f:20s} {v:.3f}")
''',
 '''
library(ranger); library(caret)
d <- read.csv("s6_farm_yield_ml.csv")[, -1]
ctrl <- trainControl(method = "cv", number = 5)
lm_fit <- train(yield_t_ha ~ ., data = d, method = "lm", trControl = ctrl)
rf_fit <- train(yield_t_ha ~ ., data = d, method = "ranger", importance = "permutation", trControl = ctrl)
resamples(list(lm = lm_fit, rf = rf_fit)) |> summary()
varImp(rf_fit)
''', None, None)
ex4['read'] = {'en': ['Cross-validated R² is the honest measure: the share of yield variation predicted on farms the model never saw.',
                      'Random forest captures thresholds and interactions (for example, nitrogen pays more on soils with more organic carbon) that a straight-line model misses.',
                      'Permutation importance shows which inputs the predictions rely on most; it is not proof of cause.'],
               'am': ['በcross-validation የተገኘ R² ታማኙ መለኪያ ነው፡ ሞዴሉ አይቷቸው በማያውቃቸው እርሻዎች ላይ የተተነበየ የምርት ልዩነት ድርሻ።',
                      'Random forest ቀጥተኛ-መስመር ሞዴል የሚያመልጡትን ገደቦችና interactions ይይዛል (ለምሳሌ ናይትሮጅን ብዙ ኦርጋኒክ ካርቦን ባለው አፈር ላይ የበለጠ ይከፍላል)።',
                      'Permutation importance ትንበያዎቹ በብዛት የሚደገፉት በየትኞቹ ግብዓቶች እንደሆነ ያሳያል፤ የምክንያት ማረጋገጫ አይደለም።']}
ex4['decide'] = {'en': 'Use the model for early yield estimates per district (for planning, credit and insurance), and keep testing it on new seasons before trusting it.', 'am': 'ሞዴሉን በየወረዳው ቅድመ የምርት ግምቶች ለማግኘት ተጠቀሙበት (ለዕቅድ፣ ለብድርና ለመድን)፤ ከማመናችሁ በፊት በአዳዲስ ወቅቶች መፈተሹን ቀጥሉ።'}
ex4['biz'] = {'en': 'Yield-forecast services sell to insurers, banks, traders and food-security agencies.', 'am': 'የምርት ትንበያ አገልግሎቶች ለመድን ድርጅቶች፣ ለባንኮች፣ ለነጋዴዎችና ለምግብ ዋስትና ኤጀንሲዎች ይሸጣሉ።'}

# ---------- price forecasting
months = pd.period_range('2016-01', '2025-12', freq='M')
tt = np.arange(len(months)); season = np.array([-4, -6, -5, -2, 2, 6, 9, 10, 6, 0, -7, -9])[months.month - 1]
price = 25 + 0.32 * tt + season * (1 + tt / 120) + rng.normal(0, 2.2, len(tt))
save_csv(pd.DataFrame({'month': months.astype(str), 'teff_price_birr_kg': price.round(1)}), 's6_teff_prices.csv')
ex5 = example('s6-forecast',
 {'en': 'Can we forecast next year’s monthly teff price well enough to plan selling?', 'am': 'መቼ እንደምንሸጥ ለማቀድ የሚበቃ የሚቀጥለውን ዓመት ወርሃዊ የጤፍ ዋጋ መተንበይ እንችላለን?'},
 {'en': '10 years of monthly market prices (2016–2025). The last 12 months are held back to test the forecasts honestly. (Teaching data, not official prices.)', 'am': 'የ10 ዓመት ወርሃዊ የገበያ ዋጋዎች (2016–2025)። ትንበያዎቹን በታማኝነት ለመፈተሽ የመጨረሻዎቹ 12 ወራት ተይዘዋል። (የማስተማሪያ ዳታ እንጂ ይፋዊ ዋጋ አይደለም።)'},
 {'en': 'Time series → trend + seasonal regression vs seasonal-naive benchmark, evaluated on a 12-month hold-out (MAPE)', 'am': 'Time series → trend + seasonal regression vs seasonal-naive መለኪያ፣ በ12 ወር hold-out (MAPE) የተገመገመ'},
 's6_teff_prices.csv',
 '''
import pandas as pd, numpy as np
d = pd.read_csv("s6_teff_prices.csv"); y = d.teff_price_birr_kg.values
month = pd.PeriodIndex(d.month, freq="M").month.values; t = np.arange(len(y))
train, test = slice(0, len(y) - 12), slice(len(y) - 12, len(y))
D = np.column_stack([np.ones(len(y)), t] + [(month == k).astype(float) for k in range(2, 13)])
b, *_ = np.linalg.lstsq(D[train], np.log(y[train]), rcond=None)      # log scale: seasonality grows with level
f_reg = np.exp(D[test] @ b)
f_naive = y[len(y) - 24: len(y) - 12]                                # same month last year
def mape(f): return 100 * np.mean(np.abs(f - y[test]) / y[test])
print(f"Seasonal naive MAPE = {mape(f_naive):.1f}%")
print(f"Trend + season MAPE = {mape(f_reg):.1f}%")
peak, low = month[test][np.argmax(f_reg)], month[test][np.argmin(f_reg)]
print(f"Forecast lowest month: {low}, highest month: {peak}, gap = {f_reg.max()/f_reg.min()-1:.0%}")
''',
 '''
library(forecast)
d <- read.csv("s6_teff_prices.csv")
y <- ts(d$teff_price_birr_kg, start = c(2016, 1), frequency = 12)
train <- window(y, end = c(2024, 12)); test <- window(y, start = c(2025, 1))
fit <- ets(train, lambda = 0)                 # or auto.arima(train, lambda = 0)
fc <- forecast(fit, h = 12)
accuracy(fc, test); accuracy(snaive(train, h = 12), test)
plot(fc)
''', None, None)
yp = price.round(1); mo = months.month.values; tt_ = np.arange(len(yp)); tr_ = slice(0, len(yp)-12); te_ = slice(len(yp)-12, len(yp))
Dm = np.column_stack([np.ones(len(yp)), tt_] + [(mo == k_).astype(float) for k_ in range(2, 13)])
bb, *_ = np.linalg.lstsq(Dm[tr_], np.log(yp[tr_]), rcond=None); fr = np.exp(Dm[te_] @ bb)
mape_r = 100*np.mean(np.abs(fr - yp[te_])/yp[te_]); mape_n = 100*np.mean(np.abs(yp[len(yp)-24:len(yp)-12] - yp[te_])/yp[te_])
beats = mape_r < mape_n
ex5['read'] = {'en': ['A forecast is only useful if it beats a simple benchmark; "same month last year" (seasonal naive) is the benchmark here.',
                      (f'The trend + season model beats the benchmark ({mape_r:.1f}% vs {mape_n:.1f}% error).' if beats else f'Here the trend + season model ({mape_r:.1f}% error) does not beat the simple benchmark ({mape_n:.1f}%). That is an honest and common result: a simple method is good enough, and you should not pay for complexity that does not help.'),
                      'Both forecasts show the same strong seasonal pattern, which is what matters for selling: prices are lowest after harvest and highest before the next one.'],
               'am': ['ትንበያ ጠቃሚ የሚሆነው ቀላል መለኪያን ሲያሸንፍ ብቻ ነው፤ እዚህ መለኪያው «ባለፈው ዓመት ተመሳሳይ ወር» (seasonal naive) ነው።',
                      (f'የtrend + season ሞዴሉ መለኪያውን ያሸንፋል ({mape_r:.1f}% vs {mape_n:.1f}% ስህተት)።' if beats else f'እዚህ የtrend + season ሞዴሉ ({mape_r:.1f}% ስህተት) ቀላሉን መለኪያ ({mape_n:.1f}%) አያሸንፍም። ይህ ታማኝና የተለመደ ውጤት ነው፡ ቀላል ዘዴ በቂ ነው፣ ለማይረዳ ውስብስብነት መክፈል የለብህም።'),
                      'ሁለቱም ትንበያዎች አንድ ዓይነት ጠንካራ ወቅታዊ ንድፍ ያሳያሉ፤ ለሽያጭ የሚያስፈልገው ይህ ነው፡ ዋጋዎች ከምርት ስብሰባ በኋላ ዝቅተኛ፣ ከሚቀጥለው ስብሰባ በፊት ከፍተኛ ናቸው።']}
ex5['decide'] = {'en': 'If storage costs per month are below the forecast seasonal price rise, store after harvest and sell in the high-price months; update the forecast every month.', 'am': 'የወር የማከማቻ ወጪ ከተተነበየው የወቅት የዋጋ ጭማሪ ያነሰ ከሆነ ከምርት ስብሰባ በኋላ አከማችታችሁ በከፍተኛ ዋጋ ወራት ሽጡ፤ ትንበያውን በየወሩ አድሱ።'}
ex5['biz'] = {'en': 'Price-forecast SMS subscriptions for cooperatives and traders are a proven African business model.', 'am': 'ለማኅበራትና ለነጋዴዎች የዋጋ ትንበያ የSMS ደንበኝነት በአፍሪካ የተረጋገጠ የንግድ ሞዴል ነው።'}

# ---------- Bayesian beta-binomial
save_csv(pd.DataFrame({'field': range(1, 41), 'infected_plants_in_50': rng.binomial(50, 0.17, 40)}), 's6_rust_scouting.csv')
ex6 = example('s6-bayes',
 {'en': 'Should a cooperative spray against wheat rust this week?', 'am': 'አንድ ማኅበር በዚህ ሳምንት በስንዴ ዋግ ላይ መርጨት አለበት?'},
 {'en': 'Past seasons suggest about 8% of plants infected at this stage. This week scouts checked 50 plants in each of 40 fields. Spraying pays if true incidence is above 15%.', 'am': 'ያለፉት ወቅቶች በዚህ ደረጃ ወደ 8% ገደማ ተክሎች እንደሚበከሉ ያመለክታሉ። በዚህ ሳምንት ተመልካቾች በ40 ማሳዎች ውስጥ እያንዳንዳቸው 50 ተክሎችን ፈትሸዋል። እውነተኛው የመበከል መጠን ከ15% በላይ ከሆነ መርጨት ያዋጣል።'},
 {'en': 'Bayesian beta-binomial: prior from past seasons + this week’s data → posterior probability that incidence exceeds the threshold', 'am': 'Bayesian beta-binomial፡ ከያለፉት ወቅቶች prior + የዚህ ሳምንት ዳታ → የመበከል መጠኑ ከገደቡ የሚበልጥበት posterior ፕሮባቢሊቲ'},
 's6_rust_scouting.csv',
 '''
import pandas as pd
from scipy import stats
d = pd.read_csv("s6_rust_scouting.csv")
k, n = d.infected_plants_in_50.sum(), 50 * len(d)
a0, b0 = 4, 46                                  # prior: mean 8%, worth about 50 plants of evidence
post = stats.beta(a0 + k, b0 + n - k)
print(f"Data: {k} infected of {n} plants ({100*k/n:.1f}%)")
print(f"Prior mean 8.0% -> posterior mean {100*post.mean():.1f}%, 95% credible interval {100*post.ppf(.025):.1f}-{100*post.ppf(.975):.1f}%")
print(f"P(incidence > 15%) = {post.sf(0.15):.3f}")
''',
 '''
d <- read.csv("s6_rust_scouting.csv")
k <- sum(d$infected_plants_in_50); n <- 50 * nrow(d)
a <- 4 + k; b <- 46 + n - k
c(mean = a / (a + b), lower = qbeta(.025, a, b), upper = qbeta(.975, a, b))
1 - pbeta(0.15, a, b)          # P(incidence > 15%)
# hierarchical version (field effects): brms::brm(infected | trials(50) ~ 1 + (1|field), family = binomial)
''', None, None)
rs = pd.read_csv(os.path.join(DATA, 's6_rust_scouting.csv')); kk = rs.infected_plants_in_50.sum(); nn = 50 * len(rs)
pp = stats.beta(4 + kk, 46 + nn - kk).sf(0.15)
ex6['read'] = {'en': ['The prior carries what past seasons taught; the data update it. With 2000 plants checked, the data dominate.',
                      'The credible interval is a direct probability statement: the true incidence lies in it with 95% probability.',
                      f'The probability that incidence is above 15% is {pp:.2f}, which is what the spray decision needs.'],
               'am': ['prior ያለፉት ወቅቶች ያስተማሩትን ይይዛል፤ ዳታው ያዘምነዋል። 2000 ተክሎች ስለተፈተሹ ዳታው ይበልጣል።',
                      'credible interval ቀጥተኛ የፕሮባቢሊቲ መግለጫ ነው፡ እውነተኛው የመበከል መጠን በ95% ፕሮባቢሊቲ በውስጡ ይገኛል።',
                      f'የመበከል መጠኑ ከ15% በላይ የመሆኑ ፕሮባቢሊቲ {pp:.2f} ነው፤ የመርጨት ውሳኔው የሚያስፈልገው ይህ ነው።']}
ex6['decide'] = {'en': ('Spray now: incidence is very likely above the economic threshold.' if pp > 0.8 else 'Do not spray yet; scout again next week.' if pp < 0.3 else 'Borderline: spray the worst fields and re-scout the rest in 3–4 days.'),
                 'am': ('አሁን ርጩ፡ የመበከል መጠኑ ከኢኮኖሚ ገደቡ በላይ የመሆን ዕድሉ በጣም ከፍተኛ ነው።' if pp > 0.8 else 'ገና አትርጩ፤ በሚቀጥለው ሳምንት እንደገና ፈትሹ።' if pp < 0.3 else 'በገደቡ ላይ ነው፡ በጣም የተበከሉትን ማሳዎች ርጩ፣ የቀሩትን በ3–4 ቀናት ውስጥ እንደገና ፈትሹ።')}
ex6['biz'] = {'en': 'Scouting apps with Bayesian alerts sell to cooperatives, estates and crop-protection firms.', 'am': 'Bayesian ማንቂያ ያላቸው የመቃኘት አፖች ለማኅበራት፣ ለእርሻ ድርጅቶችና ለሰብል ጥበቃ ኩባንያዎች ይሸጣሉ።'}

M_en = [
 {'t': 'Variance components and heritability', 'd': '1 semester module · 30 h', 'o': ['Estimate variance components by ANOVA and REML', 'Calculate heritability and repeatability with standard errors', 'Design half-sib and full-sib experiments'],
  'l': ['Genetic models: additive, dominance, environment', 'Half-sib and full-sib designs', 'ANOVA vs REML estimates', 'Heritability, repeatability and their uses', 'Genetic correlations between traits'],
  'a': 'Estimate the heritability of weaning weight from a community sheep breeding programme and report sire EBVs to the breeders’ cooperative.', 'm': 'Performance records, R (lme4) or Python',
  'q': ['Why multiply the sire variance by 4?', 'What does h² = 0.25 mean for selection?', 'Why is REML preferred for unbalanced data?'], 'tip': 'Pair every variance estimate with its standard error; small herds give uncertain h².'},
 {'t': 'Animal model and BLUP', 'd': '1 semester module · 30 h', 'o': ['Build the numerator relationship matrix from pedigree', 'Solve mixed-model equations for breeding values', 'Use EBVs and their accuracies for selection'],
  'l': ['Pedigree and the A matrix', 'Henderson’s mixed-model equations', 'Sire model vs animal model', 'Accuracy and reliability of EBVs', 'Software: BLUPF90, sommer, MCMCglmm'],
  'a': 'Run an animal-model evaluation for a small goat or dairy herd with pedigree and publish a ranked EBV list with accuracies.', 'm': 'Pedigree and records, BLUPF90 or R',
  'q': ['Why does BLUP use relatives’ records?', 'What is EBV accuracy?', 'How does inbreeding enter the A matrix?'], 'tip': 'Clean pedigree errors first; they distort every EBV.'},
 {'t': 'GWAS and QTL mapping', 'd': '1 semester module · 30 h', 'o': ['Run GWAS with mixed models and population-structure control', 'Control false discoveries', 'Interpret Manhattan and QQ plots honestly'],
  'l': ['Genotype quality control: call rate, MAF, HWE', 'Population structure: PCs and kinship', 'Single-marker and mixed-model GWAS', 'Bonferroni, FDR and genomic inflation', 'From hits to candidate genes and validation'],
  'a': 'Run a GWAS with and without structure correction on a real or simulated dataset and explain why the uncorrected hits are false.', 'm': 'Genotype data, PLINK, GAPIT or Python',
  'q': ['What does λ = 1.8 tell you?', 'Why validate hits in another population?', 'Why is a GWAS hit not yet a gene?'], 'tip': 'Always show the QQ plot next to the Manhattan plot.'},
 {'t': 'Genomic prediction and selection', 'd': '1 semester module · 30 h', 'o': ['Fit GBLUP, ridge and Bayesian models', 'Measure accuracy with proper cross-validation', 'Plan training populations'],
  'l': ['From markers to breeding values', 'GBLUP and the genomic relationship matrix', 'Ridge, LASSO and Bayes A/B/C', 'Cross-validation designs that match real use', 'Training-population size and relatedness'],
  'a': 'Compare ridge with different shrinkage on a genomic dataset using 5-fold cross-validation and recommend a training-population plan.', 'm': 'Genomic data, R (rrBLUP, BGLR) or Python',
  'q': ['Why does more shrinkage sometimes help?', 'What makes cross-validation optimistic?', 'How does relatedness affect accuracy?'], 'tip': 'Match the cross-validation to the real decision: new animals, new sites or new years.'},
 {'t': 'Bayesian statistics', 'd': '1 semester module · 30 h', 'o': ['Combine prior knowledge with data', 'Fit hierarchical models with MCMC', 'Make decisions from posterior probabilities'],
  'l': ['Bayes’ theorem with conjugate priors', 'MCMC and diagnostics', 'Hierarchical models: farms within districts', 'brms and Stan in practice', 'Decision analysis with posterior probabilities'],
  'a': 'Build a Bayesian spray-decision rule for wheat rust from scouting data and a prior from past seasons.', 'm': 'Scouting data, R (brms) or Python',
  'q': ['What does a 95% credible interval mean?', 'When does the prior matter most?', 'How do you check MCMC convergence?'], 'tip': 'State the prior openly and test how much it changes the decision.'},
 {'t': 'Machine learning and forecasting', 'd': '1 semester module · 30 h', 'o': ['Build and validate prediction models without fooling yourself', 'Use satellite and weather data', 'Forecast prices and yields with honest benchmarks'],
  'l': ['Train, validation and test; data leakage', 'Random forests and gradient boosting', 'Feature importance and its limits', 'Remote sensing: NDVI and crop models', 'Time series: trend, seasonality, ETS and ARIMA', 'Always beat a simple benchmark'],
  'a': 'Predict farm yields from rainfall, NDVI, fertilizer and soil, and forecast monthly grain prices with a hold-out test.', 'm': 'Farm and price data, Python (scikit-learn) or R',
  'q': ['What is data leakage?', 'Why compare with a seasonal-naive forecast?', 'Does feature importance prove cause?'], 'tip': 'Split by time or place when predicting the future or new places.'},
 {'t': 'Causal inference and spatial statistics', 'd': '1 semester module · 30 h', 'o': ['Estimate effects from observational data carefully', 'Model spatial and spatio-temporal data', 'Link climate data to crop and livestock outcomes'],
  'l': ['DAGs and confounding', 'Difference-in-differences and matching', 'Instrumental variables (overview)', 'Geostatistics: variograms and kriging', 'Spatio-temporal models for climate and disease'],
  'a': 'Map soil organic carbon from sampled points by kriging, and estimate the effect of a soil-conservation programme with difference-in-differences.', 'm': 'Geo-referenced samples, R (gstat, sf) or Python',
  'q': ['Draw a DAG for fertilizer, rainfall and yield.', 'What assumption does difference-in-differences need?', 'What does a variogram range tell you?'], 'tip': 'Draw the causal diagram before choosing the method.'}]
M_am = [
 {'t': 'Variance components እና heritability', 'd': 'የሴሚስተር ሞጁል · 30 ሰዓት', 'o': ['variance componentsን በANOVA እና በREML መገመት', 'heritabilityን እና repeatabilityን ከstandard errors ጋር ማስላት', 'የhalf-sib እና full-sib ሙከራዎችን መንደፍ'],
  'l': ['የዘረመል ሞዴሎች፡ additive፣ dominance፣ አካባቢ', 'Half-sib እና full-sib ንድፎች', 'የANOVA vs REML ግምቶች', 'Heritability፣ repeatability እና አጠቃቀማቸው', 'በባሕሪያት መካከል የዘረመል ተዛምዶ'],
  'a': 'ከማኅበረሰብ የበግ ዝርያ ማሻሻያ ፕሮግራም የጡት መጣያ ክብደትን heritability ገምታችሁ የአውራዎችን EBVs ለአርቢዎች ማኅበር ሪፖርት አድርጉ።', 'm': 'የአፈጻጸም መዝገቦች፣ R (lme4) ወይም Python',
  'q': ['የአውራውን variance በ4 ለምን እናባዛለን?', 'h² = 0.25 ለምርጫ ምን ማለት ነው?', 'ለሚዛናዊ ላልሆነ ዳታ REML ለምን ይመረጣል?'], 'tip': 'እያንዳንዱን የvariance ግምት ከstandard errorው ጋር አጣምር፤ ትናንሽ መንጋዎች እርግጠኛ ያልሆነ h² ይሰጣሉ።'},
 {'t': 'Animal model እና BLUP', 'd': 'የሴሚስተር ሞጁል · 30 ሰዓት', 'o': ['ከዘር ሐረግ (pedigree) numerator relationship matrix መገንባት', 'ለbreeding values የmixed-model እኩልታዎችን መፍታት', 'ለምርጫ EBVsን እና ትክክለኛነታቸውን መጠቀም'],
  'l': ['Pedigree እና A matrix', 'የHenderson mixed-model እኩልታዎች', 'Sire model vs animal model', 'የEBVs ትክክለኛነትና አስተማማኝነት', 'ሶፍትዌር፡ BLUPF90፣ sommer፣ MCMCglmm'],
  'a': 'የዘር ሐረግ ላለው ትንሽ የፍየል ወይም የወተት መንጋ የanimal-model ግምገማ አካሂዳችሁ ከትክክለኛነታቸው ጋር የተደረደረ የEBV ዝርዝር አትሙ።', 'm': 'የዘር ሐረግና መዝገቦች፣ BLUPF90 ወይም R',
  'q': ['BLUP የዘመዶችን መዝገቦች ለምን ይጠቀማል?', 'የEBV ትክክለኛነት ምንድነው?', 'inbreeding ወደ A matrix እንዴት ይገባል?'], 'tip': 'መጀመሪያ የዘር ሐረግ ስህተቶችን አጽዳ፤ እያንዳንዱን EBV ያዛባሉ።'},
 {'t': 'GWAS እና QTL mapping', 'd': 'የሴሚስተር ሞጁል · 30 ሰዓት', 'o': ['GWASን ከmixed models እና የሕዝብ መዋቅር ቁጥጥር ጋር ማካሄድ', 'የሐሰት ግኝቶችን መቆጣጠር', 'Manhattan እና QQ ፕሎቶችን በታማኝነት መተርጎም'],
  'l': ['የgenotype ጥራት ቁጥጥር፡ call rate፣ MAF፣ HWE', 'የሕዝብ መዋቅር፡ PCs እና kinship', 'ነጠላ-ምልክትና mixed-model GWAS', 'Bonferroni፣ FDR እና genomic inflation', 'ከግኝቶች ወደ እጩ ጂኖችና ማረጋገጫ'],
  'a': 'በእውነተኛ ወይም በሲሙሌት የተደረገ ዳታሴት ላይ GWASን ከመዋቅር ማስተካከያ ጋርና ያለ ማስተካከያ አካሂዳችሁ ያልተስተካከሉት ግኝቶች ለምን ሐሰት እንደሆኑ አብራሩ።', 'm': 'የgenotype ዳታ፣ PLINK፣ GAPIT ወይም Python',
  'q': ['λ = 1.8 ምን ይነግርሃል?', 'ግኝቶችን በሌላ ሕዝብ ውስጥ ለምን እናረጋግጣለን?', 'የGWAS ግኝት ለምን ገና ጂን አይደለም?'], 'tip': 'ሁልጊዜ የQQ ፕሎቱን ከManhattan ፕሎቱ ጎን አሳይ።'},
 {'t': 'ጂኖሚክ ትንበያና ምርጫ', 'd': 'የሴሚስተር ሞጁል · 30 ሰዓት', 'o': ['GBLUP፣ ridge እና Bayesian ሞዴሎችን መገጣጠም', 'ትክክለኛነትን በትክክለኛ cross-validation መለካት', 'የሥልጠና ሕዝቦችን ማቀድ'],
  'l': ['ከምልክቶች ወደ breeding values', 'GBLUP እና genomic relationship matrix', 'Ridge፣ LASSO እና Bayes A/B/C', 'ከእውነተኛ አጠቃቀም ጋር የሚዛመዱ የcross-validation ንድፎች', 'የሥልጠና ሕዝብ መጠንና ዝምድና'],
  'a': 'በጂኖሚክ ዳታሴት ላይ ridgeን በተለያዩ shrinkage በ5-fold cross-validation አወዳድራችሁ የሥልጠና ሕዝብ ዕቅድ ምከሩ።', 'm': 'ጂኖሚክ ዳታ፣ R (rrBLUP፣ BGLR) ወይም Python',
  'q': ['ተጨማሪ shrinkage አንዳንዴ ለምን ይረዳል?', 'cross-validationን ከመጠን በላይ ብሩህ ተስፋ የሚያደርገው ምንድነው?', 'ዝምድና ትክክለኛነትን እንዴት ይነካል?'], 'tip': 'cross-validationን ከእውነተኛው ውሳኔ ጋር አዛምድ፡ አዳዲስ እንስሳት፣ አዳዲስ ቦታዎች ወይም አዳዲስ ዓመታት።'},
 {'t': 'Bayesian ስታቲስቲክስ', 'd': 'የሴሚስተር ሞጁል · 30 ሰዓት', 'o': ['ቀደምት ዕውቀትን ከዳታ ጋር ማጣመር', 'hierarchical ሞዴሎችን በMCMC መገጣጠም', 'ከposterior ፕሮባቢሊቲዎች ውሳኔ መስጠት'],
  'l': ['የBayes ቲዎረም ከconjugate priors ጋር', 'MCMC እና ምርመራዎቹ', 'Hierarchical ሞዴሎች፡ በወረዳዎች ውስጥ ያሉ እርሻዎች', 'brms እና Stan በተግባር', 'በposterior ፕሮባቢሊቲዎች የውሳኔ ትንተና'],
  'a': 'ከመቃኛ ዳታና ከያለፉት ወቅቶች prior ለስንዴ ዋግ Bayesian የመርጨት ውሳኔ ሕግ ገንቡ።', 'm': 'የመቃኛ ዳታ፣ R (brms) ወይም Python',
  'q': ['95% credible interval ምን ማለት ነው?', 'prior በጣም የሚያስፈልገው መቼ ነው?', 'የMCMC መረጋጋትን (convergence) እንዴት ትፈትሻለህ?'], 'tip': 'priorን በግልጽ ተናገር፤ ውሳኔውን ምን ያህል እንደሚቀይር ፈትሽ።'},
 {'t': 'ማሽን ለርኒንግና ትንበያ', 'd': 'የሴሚስተር ሞጁል · 30 ሰዓት', 'o': ['ራስን ሳያታልሉ የትንበያ ሞዴሎችን መገንባትና ማረጋገጥ', 'የሳተላይትና የአየር ሁኔታ ዳታ መጠቀም', 'ዋጋዎችንና ምርቶችን በታማኝ መለኪያዎች መተንበይ'],
  'l': ['Train፣ validation እና test፤ data leakage', 'Random forests እና gradient boosting', 'Feature importance እና ገደቦቹ', 'Remote sensing፡ NDVI እና የሰብል ሞዴሎች', 'Time series፡ አዝማሚያ፣ ወቅታዊነት፣ ETS እና ARIMA', 'ሁልጊዜ ቀላል መለኪያን አሸንፍ'],
  'a': 'የእርሻ ምርቶችን ከዝናብ፣ ከNDVI፣ ከማዳበሪያና ከአፈር ተንብዩ፤ ወርሃዊ የእህል ዋጋዎችንም በhold-out ፈተና ተንብዩ።', 'm': 'የእርሻና የዋጋ ዳታ፣ Python (scikit-learn) ወይም R',
  'q': ['data leakage ምንድነው?', 'ከseasonal-naive ትንበያ ጋር ለምን እናወዳድራለን?', 'feature importance ምክንያትን ያረጋግጣል?'], 'tip': 'የወደፊቱን ወይም አዳዲስ ቦታዎችን ስትተነብይ በጊዜ ወይም በቦታ ክፈል።'},
 {'t': 'Causal inference እና spatial ስታቲስቲክስ', 'd': 'የሴሚስተር ሞጁል · 30 ሰዓት', 'o': ['ከምልከታ ዳታ ውጤቶችን በጥንቃቄ መገመት', 'spatial እና spatio-temporal ዳታን ሞዴል ማድረግ', 'የአየር ንብረት ዳታን ከሰብልና ከእንስሳት ውጤቶች ጋር ማገናኘት'],
  'l': ['DAGs እና confounding', 'Difference-in-differences እና matching', 'Instrumental variables (አጠቃላይ እይታ)', 'Geostatistics፡ variograms እና kriging', 'ለአየር ንብረትና ለበሽታ spatio-temporal ሞዴሎች'],
  'a': 'የአፈር ኦርጋኒክ ካርቦንን ከናሙና ነጥቦች በkriging ካርታ አድርጉ፤ የአፈር ጥበቃ ፕሮግራምን ውጤት በdifference-in-differences ገምቱ።', 'm': 'ጂኦ-ማጣቀሻ ያላቸው ናሙናዎች፣ R (gstat፣ sf) ወይም Python',
  'q': ['ለማዳበሪያ፣ ለዝናብና ለምርት DAG ሥል።', 'difference-in-differences ምን ግምት ይፈልጋል?', 'የvariogram range ምን ይነግርሃል?'], 'tip': 'ዘዴውን ከመምረጥህ በፊት የምክንያት ንድፉን ሥል።'}]

ex1['viz'] = viz_h2(ex1['_ns'])
ex2['viz'] = viz_gwas(ex2['_ns'])
ex3['viz'] = viz_gp(ex3['_ns'])
S6 = {'name': {'en': 'Quantitative Researcher', 'am': 'የቁጥር ተመራማሪ'},
      'stage': {'en': 'PhD · 3–5 years', 'am': 'PhD · 3–5 ዓመት'},
      'goal': {'en': 'Researchers estimate genetic parameters and breeding values, map genes, predict merit from DNA, build and honestly validate prediction and forecasting models, reason with Bayesian methods, and separate cause from correlation in agricultural data.',
               'am': 'ተመራማሪዎች የዘረመል parametersን እና breeding valuesን ይገምታሉ፣ ጂኖችን ካርታ ያደርጋሉ፣ ብቃትን ከDNA ይተነብያሉ፣ የትንበያ ሞዴሎችን ይገነባሉ በታማኝነትም ያረጋግጣሉ፣ በBayesian ዘዴዎች ያመዛዝናሉ፣ በግብርና ዳታ ውስጥ ምክንያትን ከተዛምዶ ይለያሉ።'},
      'mods': {'en': M_en, 'am': M_am}, 'ex': [ex1, ex2, ex3, ex4, ex5, ex6]}
emit(6, S6)
for e in S6['ex']:
    print(f"--- {e['id']}\n{e['out']}\n")
