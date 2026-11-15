from labkit import *
import numpy as np
SIM = ('Simulated data with realistic patterns, so the lab runs anywhere; swap in your own data.', 'ላቡ በየትኛውም ቦታ እንዲሠራ ተጨባጭ ንድፎች ያሉት የተመሰለ ዳታ፤ በራስህ ዳታ ተካው።')
W = ('2–3 weeks', '2–3 ሳምንታት')
ASREML = T('R: ASReml-R, sommer or BLUPF90 (next step)', 'production-scale mixed models', 'በምርት-ደረጃ mixed models', 'cran.r-project.org; nce.ads.uga.edu (BLUPF90, free)')
PLINK = T('PLINK 1.9/2.0 and GCTA', 'genotype QC, GWAS, GRM', 'የgenotype QC፣ GWAS፣ GRM', 'cog-genomics.org/plink (free)')

S6 = []
S6.append(lab(('Heritability from a half-sib design', 'Heritability ከhalf-sib ንድፍ'),
 ('Estimate the heritability of goat weaning weight from 30 sires with 10 kids each by one-way ANOVA, give its standard error, and find how many sires a reliable estimate needs.', 'የፍየል የጡት መጣያ ክብደትን heritability ከ30 sires እያንዳንዳቸው 10 ጠቦቶች ጋር በone-way ANOVA ገምት፣ standard errorኡን ስጥ፣ አስተማማኝ ግምት ስንት sires እንደሚፈልግ ፈልግ።'), W,
 [PY, NP, SP, ASREML],
 (['Record weaning weight of kids from 30 unrelated sires (10 kids per sire, different dams).', 'One-way ANOVA with sire as the group: MS between and within sires.', 'σ²_sire = (MS_between − MS_within) ÷ 10; h² = 4σ²_sire ÷ (σ²_sire + σ²_within).', 'Bootstrap over sires for a standard error.', 'Repeat the simulation with 10–100 sires to see the precision.'],
  ['የ30 የማይዛመዱ sires ጠቦቶችን የጡት መጣያ ክብደት መዝግብ (በsire 10 ጠቦቶች፣ የተለያዩ dams)።', 'sire እንደ ቡድን የሆነበት one-way ANOVA፡ በsires መካከልና በውስጥ MS።', 'σ²_sire = (MS_between − MS_within) ÷ 10፤ h² = 4σ²_sire ÷ (σ²_sire + σ²_within)።', 'ለstandard error በsires ላይ bootstrap አድርግ።', 'ትክክለኛነቱን ለማየት ማስመሰሉን በ10–100 sires ድገም።']),
 '''
import numpy as np
rng = np.random.default_rng(5); H2, SD = 0.30, 1.6                       # true heritability, phenotypic SD (kg)
def data(s, k=10):
    sire = rng.normal(0, np.sqrt(H2 / 4) * SD, s); return sire[:, None] + rng.normal(0, np.sqrt(1 - H2 / 4) * SD, (s, k)) + 9.5
def h2(y):
    s, k = y.shape; msb = k * y.mean(1).var(ddof=1); msw = y.var(1, ddof=1).mean()
    vs = max((msb - msw) / k, 0); return 4 * vs / (vs + msw)
y = data(30); est = h2(y)
boot = [h2(y[rng.integers(0, 30, 30)]) for _ in range(1000)]
print(f"h2 = {est:.2f} (bootstrap SE {np.std(boot):.2f}); true value {H2}")
sires = [10, 20, 30, 50, 100]; spread = []
for s in sires:
    sims = [h2(data(s)) for _ in range(500)]; spread.append((np.mean(sims), *np.percentile(sims, [2.5, 97.5])))
    print(f"{s:3d} sires: 95% of estimates between {spread[-1][1]:.2f} and {spread[-1][2]:.2f}")
''',
 viz=lambda ns: [dots(B('Range of h² estimates by number of sires (500 simulations each)', 'የh² ግምቶች ክልል በsires ብዛት (እያንዳንዱ 500 ማስመሰሎች)'), [B(f'{s} sires', f'{s} sires') for s in ns['sires']], [v[0] for v in ns['spread']], [v[1] for v in ns['spread']], [v[2] for v in ns['spread']], 'h²', ref0=False, note=B('True heritability in the simulation: 0.30.', 'በማስመሰሉ ውስጥ እውነተኛ heritability፡ 0.30።'))],
 analysis=lambda ns: ([f"With 30 sires h² = {ns['est']:.2f} with SE {np.std(ns['boot']):.2f}: the true 0.30 is well inside ±2 SE, so the estimate is honest but very uncertain.", f"With 10 sires estimates range from {ns['spread'][0][1]:.2f} to {ns['spread'][0][2]:.2f}; with 100 sires from {ns['spread'][-1][1]:.2f} to {ns['spread'][-1][2]:.2f}.", 'Precision depends mainly on the number of sires, not the number of kids per sire.'],
                      [f"በ30 sires h² = {ns['est']:.2f} ከSE {np.std(ns['boot']):.2f} ጋር ነው፡ እውነተኛው 0.30 በ±2 SE ውስጥ ነው፤ ስለዚህ ግምቱ ታማኝ ነው ግን በጣም እርግጠኛ ያልሆነ።", f"በ10 sires ግምቶች ከ{ns['spread'][0][1]:.2f} እስከ {ns['spread'][0][2]:.2f} ይደርሳሉ፤ በ100 sires ከ{ns['spread'][-1][1]:.2f} እስከ {ns['spread'][-1][2]:.2f}።", 'ትክክለኛነቱ በዋናነት በsires ብዛት ላይ ይወሰናል እንጂ በsire በጠቦቶች ብዛት ላይ አይደለም።']),
 decision=lambda ns: ('Always report h² with its SE; for a programme decision pool records from at least 100 sires (several flocks or years) and use the animal model, which uses all relatives.', 'h²ን ሁልጊዜ ከSEው ጋር ዘግብ፤ ለፕሮግራም ውሳኔ ቢያንስ ከ100 sires (በርካታ መንጋዎች ወይም ዓመታት) መዝገቦችን አሰባስብ፣ ሁሉንም ዘመዶች የሚጠቀመውን animal model ተጠቀም።'), note=SIM))
S6.append(lab(('Animal model BLUP from a pedigree', 'ከpedigree የanimal model BLUP'),
 ('Build the relationship matrix for a 3-generation goat pedigree, solve the animal-model equations, and compare selection on BLUP breeding values with selection on own records.', 'ለ3-ትውልድ የፍየል pedigree የዝምድና ማትሪክስ ገንባ፣ የanimal-model እኩልታዎችን ፍታ፣ በBLUP breeding values ምርጫን በራስ መዝገቦች ከሚደረግ ምርጫ ጋር አወዳድር።'), W,
 [PY, NP, ASREML, T('Pedigree records (ear tags, kidding book)', 'who is whose parent', 'የማን ወላጅ ማን እንደሆነ', 'community breeding cooperative')],
 (['Pedigree: 10 founders, then 2 generations of 60 kids each from 5 bucks.', 'Build A with the tabular method.', 'Mixed-model equations: [XᵀX, XᵀZ; ZᵀX, ZᵀZ + A⁻¹λ] with λ = σ²e/σ²a.', 'Compare correlation with true breeding values: own record vs BLUP.', 'Note: animals without records (bucks) still get EBVs from their offspring.'],
  ['Pedigree፡ 10 founders፣ ከዚያ ከ5 ወንድ ፍየሎች እያንዳንዳቸው 60 ጠቦቶች ያሏቸው 2 ትውልዶች።', 'Aን በtabular ዘዴ ገንባ።', 'Mixed-model እኩልታዎች፡ [XᵀX, XᵀZ; ZᵀX, ZᵀZ + A⁻¹λ] ከλ = σ²e/σ²a ጋር።', 'ከእውነተኛ breeding values ጋር correlationን አወዳድር፡ የራስ መዝገብ vs BLUP።', 'ማስታወሻ፡ መዝገብ የሌላቸው እንስሳት (ወንድ ፍየሎች) ከዘሮቻቸው EBVs ያገኛሉ።']),
 '''
import numpy as np
rng = np.random.default_rng(2); h2 = 0.25; va, ve = h2, 1 - h2
def population():
    sire, dam, gen = [-1] * 10, [-1] * 10, [0] * 10                         # 10 founders: 0-4 bucks, 5-9 does
    bucks, does = list(range(5)), list(range(5, 10))
    for g in (1, 2):
        for _ in range(80):
            sire.append(int(rng.choice(bucks))); dam.append(int(rng.choice(does))); gen.append(g)
        kids = [i for i in range(len(sire)) if gen[i] == g]
        bucks = list(rng.choice(kids, 5, replace=False)); does = [k for k in kids if k not in bucks]
    return sire, dam, gen
def relationship(sire, dam):                                              # tabular method
    n = len(sire); A = np.zeros((n, n))
    for i in range(n):
        s, d = sire[i], dam[i]
        for j in range(i):
            A[i, j] = A[j, i] = 0.5 * ((A[j, s] if s >= 0 else 0) + (A[j, d] if d >= 0 else 0))
        A[i, i] = 1 + (0.5 * A[s, d] if s >= 0 and d >= 0 else 0)
    return A
def one_run():
    sire, dam, gen = population(); A = relationship(sire, dam); n = len(sire)
    tbv = np.linalg.cholesky(A + 1e-9 * np.eye(n)) @ rng.normal(0, np.sqrt(va), n)
    rec = np.array([g > 0 for g in gen]); y = 10 + tbv[rec] + rng.normal(0, np.sqrt(ve), rec.sum())
    Z = np.eye(n)[rec]; X = np.ones((len(y), 1))
    lhs = np.block([[X.T @ X, X.T @ Z], [Z.T @ X, Z.T @ Z + np.linalg.inv(A) * ve / va]])
    ebv = np.linalg.solve(lhs, np.concatenate([X.T @ y, Z.T @ y]))[1:]
    parents = sorted(set(s for s in sire if s >= 0)); true_top = set(np.argsort(-tbv[rec])[:15])
    return dict(tbv=tbv[rec], ebv=ebv[rec], y=y, r_own=np.corrcoef(y, tbv[rec])[0, 1], r_blup=np.corrcoef(ebv[rec], tbv[rec])[0, 1],
                r_par=np.corrcoef(ebv[parents], tbv[parents])[0, 1], top_own=len(set(np.argsort(-y)[:15]) & true_top), top_blup=len(set(np.argsort(-ebv[rec])[:15]) & true_top))
runs = [one_run() for _ in range(100)]; first = runs[0]
r_own, r_blup, r_par = (np.mean([r[k] for r in runs]) for k in ("r_own", "r_blup", "r_par"))
top_own, top_blup = (np.mean([r[k] for r in runs]) for k in ("top_own", "top_blup"))
print(f"170 animals per population, 100 populations simulated")
print(f"accuracy: own record {r_own:.2f}, animal-model BLUP {r_blup:.2f}; bucks and does used as parents {r_par:.2f}")
print(f"true top-15 of 160 kids selected: own record {top_own:.1f}, BLUP {top_blup:.1f}")
''',
 viz=lambda ns: [scatter(B('One population: BLUP breeding value vs true breeding value', 'አንድ ሕዝብ፡ BLUP breeding value vs እውነተኛ breeding value'), ns['first']['tbv'], ns['first']['ebv'], B('True breeding value', 'እውነተኛ breeding value'), 'EBV'),
                 hbar(B('Accuracy of selection criteria (100 populations)', 'የምርጫ መመዘኛዎች accuracy (100 ሕዝቦች)'), [B('Own record', 'የራስ መዝገብ'), B('Animal-model BLUP', 'Animal-model BLUP')], [(B('Correlation with true value', 'ከእውነተኛ እሴት ጋር correlation'), [ns['r_own'], ns['r_blup']], 1)], 'r', fmt=2)],
 analysis=lambda ns: ([f"Selecting on own records has accuracy {ns['r_own']:.2f} (about √h²); BLUP raises it to {ns['r_blup']:.2f} by adding information from parents, sibs and offspring.", f"Of the true top 15 kids, BLUP picks {ns['top_blup']:.1f} on average and own records {ns['top_own']:.1f}.", f"Animals used as parents get EBVs with accuracy {ns['r_par']:.2f}, even founders without own records, thanks to their offspring."],
                      [f"በራስ መዝገቦች መምረጥ {ns['r_own']:.2f} accuracy አለው (ወደ √h²)፤ BLUP ከወላጆች፣ ከወንድማማቾችና ከዘሮች መረጃ በመጨመር ወደ {ns['r_blup']:.2f} ያሳድገዋል።", f"ከእውነተኛዎቹ ከፍተኛ 15 ጠቦቶች BLUP በአማካይ {ns['top_blup']:.1f}ን፣ የራስ መዝገቦች {ns['top_own']:.1f}ን ይመርጣሉ።", f"እንደ ወላጅ ጥቅም ላይ የዋሉ እንስሳት የራሳቸው መዝገብ የሌላቸው founders እንኳን በዘሮቻቸው ምክንያት በ{ns['r_par']:.2f} accuracy EBVs ያገኛሉ።"]),
 decision=lambda ns: ('Select the next bucks on animal-model EBVs, keep the pedigree complete (every kid tagged with sire and dam), and limit any one buck to about 20% of matings to control inbreeding.', 'ቀጣዮቹን ወንድ ፍየሎች በanimal-model EBVs ምረጥ፣ pedigreeኡን ሙሉ አቆይ (እያንዳንዱ ጠቦት ከsire እና dam ጋር ምልክት ይደረግበት)፣ inbreedingን ለመቆጣጠር ማንኛውንም ወንድ ፍየል ወደ 20% የማዳቀል ገደብ አድርግ።'), note=SIM))
S6.append(lab(('GWAS with population structure', 'GWAS ከpopulation structure ጋር'),
 ('Run a genome-wide association study on 600 cattle from two breeds, see false peaks caused by breed structure, fix them with principal components, and find the true QTL.', 'በሁለት ዝርያዎች 600 ከብቶች ላይ genome-wide association study አካሂድ፣ በዝርያ መዋቅር የተፈጠሩ የሐሰት ጫፎችን ተመልከት፣ በprincipal components አስተካክላቸው፣ እውነተኛውን QTL ፈልግ።'), W,
 [PY, NP, SP, PLINK],
 (['QC: remove SNPs with call rate < 95% or MAF < 0.05 (here already clean).', 'Model 1: test each SNP alone (phenotype ~ SNP).', 'Model 2: add the first 3 genomic principal components as covariates.', 'Compute the genomic inflation factor λ (should be near 1).', 'Use a Bonferroni threshold 0.05 ÷ number of SNPs and list hits.'],
  ['QC፡ ከ95% በታች call rate ወይም ከ0.05 በታች MAF ያላቸውን SNPs አስወግድ (እዚህ አስቀድሞ ንጹሕ ነው)።', 'ሞዴል 1፡ እያንዳንዱን SNP ብቻውን ፈትሽ (phenotype ~ SNP)።', 'ሞዴል 2፡ የመጀመሪያዎቹን 3 genomic principal components እንደ covariates ጨምር።', 'የgenomic inflation factor λን አስላ (በ1 አቅራቢያ መሆን አለበት)።', 'የBonferroni ወሰን 0.05 ÷ የSNPs ብዛት ተጠቀምና ግኝቶችን ዘርዝር።']),
 '''
import numpy as np
from scipy import stats
rng = np.random.default_rng(10); n, p = 600, 3000
breed = np.repeat([0, 1], n // 2)
f0 = rng.uniform(0.05, 0.95, p); f1 = np.clip(f0 + rng.normal(0, 0.15, p), 0.02, 0.98)
G = np.where(breed[:, None] == 0, rng.binomial(2, f0, (n, p)), rng.binomial(2, f1, (n, p))).astype(float)
qtl = [800, 2100]
y = 1.5 * breed + 0.45 * G[:, qtl[0]] + 0.35 * G[:, qtl[1]] + rng.normal(0, 1, n)   # breed differs in the trait
def scan(cov):
    Xc = np.column_stack([np.ones(n)] + cov); Q, _ = np.linalg.qr(Xc)
    yr = y - Q @ (Q.T @ y); Gr = G - Q @ (Q.T @ G)
    b = (Gr * yr[:, None]).sum(0) / (Gr ** 2).sum(0); df = n - Xc.shape[1] - 1
    se = np.sqrt(((yr[:, None] - Gr * b) ** 2).sum(0) / df / (Gr ** 2).sum(0)); return 2 * stats.t.sf(abs(b / se), df)
Z = (G - G.mean(0)) / G.std(0); pcs = np.linalg.svd(Z, full_matrices=False)[0][:, :3]
p_naive, p_pc = scan([]), scan([pcs[:, i] for i in range(3)])
lam = lambda pv: np.median(stats.chi2.isf(pv, 1)) / 0.4549
thr = 0.05 / p
for name, pv in [("naive", p_naive), ("with 3 PCs", p_pc)]:
    hits = np.where(pv < thr)[0]
    print(f"{name:10s}: lambda {lam(pv):.2f}; {len(hits)} SNPs pass Bonferroni; true QTL found: {[q for q in qtl if q in hits]}")
hits_pc = [int(h) for h in np.where(p_pc < thr)[0]]
''',
 viz=lambda ns: [scatter(B('Manhattan plot, naive model: −log10(p)', 'Manhattan plot፣ ቀላል ሞዴል፡ −log10(p)'), (ix := np.union1d(np.arange(0, ns['p'], 3), np.where(ns['p_naive'] < 1e-3)[0])), (-np.log10(ns['p_naive']))[ix], B('SNP position', 'የSNP ቦታ'), '−log10(p)', fit=False, refs=[{'kind': 'h', 'v': float(-np.log10(ns['thr'])), 'label': 'Bonferroni'}]),
                 scatter(B('Manhattan plot, with 3 principal components', 'Manhattan plot፣ ከ3 principal components ጋር'), (jx := np.union1d(np.arange(0, ns['p'], 3), np.where(ns['p_pc'] < 1e-3)[0])), (-np.log10(ns['p_pc']))[jx], B('SNP position', 'የSNP ቦታ'), '−log10(p)', fit=False, refs=[{'kind': 'h', 'v': float(-np.log10(ns['thr'])), 'label': 'Bonferroni'}], note=B('Every third SNP is drawn, plus every SNP with p < 0.001; the analysis uses all 3,000.', 'እያንዳንዱ ሦስተኛ SNP እና p < 0.001 ያለው እያንዳንዱ SNP ተስለዋል፤ ትንተናው ሁሉንም 3,000 ይጠቀማል።'))],
 analysis=lambda ns: ([f"Without correction λ = {ns['lam'](ns['p_naive']):.2f}: hundreds of SNPs whose frequency differs between breeds look associated, because the breeds also differ in the trait.", f"With 3 principal components λ = {ns['lam'](ns['p_pc']):.2f} and only {len(ns['hits_pc'])} SNPs pass the threshold.", f"The real QTL at positions {', '.join(str(q) for q in ns['qtl'] if q in ns['hits_pc'])} are among them."],
                      [f"ያለ ማስተካከያ λ = {ns['lam'](ns['p_naive']):.2f}፡ ድግግሞሻቸው በዝርያዎች መካከል የሚለያይ በመቶዎች የሚቆጠሩ SNPs የተዛመዱ ይመስላሉ፣ ዝርያዎቹ በባሕሪውም ስለሚለያዩ።", f"ከ3 principal components ጋር λ = {ns['lam'](ns['p_pc']):.2f} ሲሆን {len(ns['hits_pc'])} SNPs ብቻ ወሰኑን ያልፋሉ።", f"በቦታዎች {', '.join(str(q) for q in ns['qtl'] if q in ns['hits_pc'])} ያሉት እውነተኛዎቹ QTL ከነሱ መካከል ናቸው።"]),
 decision=lambda ns: ('Always correct for structure (PCs or a mixed model with a GRM, e.g. GCTA-MLMA), report λ and a QQ plot, and validate hits in an independent herd before using them in selection.', 'ለመዋቅር ሁልጊዜ አስተካክል (PCs ወይም ከGRM ጋር mixed model፣ ለምሳሌ GCTA-MLMA)፣ λን እና QQ plotን ዘግብ፣ በምርጫ ውስጥ ከመጠቀምህ በፊት ግኝቶችን በገለልተኛ መንጋ ውስጥ አረጋግጥ።'), note=SIM))
S6.append(lab(('Genomic prediction: how big must the reference population be?', 'Genomic prediction፡ የማጣቀሻ ሕዝቡ ምን ያህል ትልቅ መሆን አለበት?'),
 ('Train GBLUP (ridge regression on SNPs) with 200 to 2,000 genotyped and recorded animals, measure accuracy on young animals, and choose a reference size.', 'GBLUPን (በSNPs ላይ ridge regression) ከ200 እስከ 2,000 genotype የተደረገላቸውና መዝገብ ያላቸው እንስሳት ጋር አሰልጥን፣ በወጣት እንስሳት ላይ accuracyን ለካ፣ የማጣቀሻ መጠን ምረጥ።'), W,
 [PY, NP, SK, PLINK, ASREML],
 (['Genotype animals (here 2,000 SNPs, 300 causal); trait h² = 0.3.', 'Reference sets of 200, 500, 1,000 and 2,000 animals; 500 young animals for validation.', 'Fit ridge regression with λ = (1 − h²) ÷ (h²/m) (equivalent to GBLUP).', 'Accuracy = correlation of GEBV with true breeding value.', 'Compare with the Daetwyler formula for planning.'],
  ['እንስሳትን genotype አድርግ (እዚህ 2,000 SNPs፣ 300 causal)፤ የባሕሪው h² = 0.3።', 'የ200፣ 500፣ 1,000 እና 2,000 እንስሳት የማጣቀሻ ስብስቦች፤ ለማረጋገጫ 500 ወጣት እንስሳት።', 'ridge regressionን ከλ = (1 − h²) ÷ (h²/m) ጋር ግጠም (ከGBLUP ጋር እኩል)።', 'Accuracy = የGEBV ከእውነተኛ breeding value ጋር correlation።', 'ለማቀድ ከDaetwyler ቀመር ጋር አወዳድር።']),
 '''
import numpy as np
from sklearn.linear_model import Ridge
rng = np.random.default_rng(4); m, h2 = 2000, 0.3
freq = rng.uniform(0.05, 0.5, m); eff = np.zeros(m); causal = rng.choice(m, 300, replace=False); eff[causal] = rng.normal(0, 1, 300)
def animals(k):
    G = rng.binomial(2, freq, (k, m)).astype(float); g = G @ eff; return G, g
Gv, gv = animals(500); scale = gv.std()
sizes, acc, theory = [200, 500, 1000, 2000], [], []
Me = m                                                                             # independent SNPs here; in real cattle Me is about 1,000-5,000
for nref in sizes:
    G, g = animals(nref); y = g / scale + rng.normal(0, np.sqrt((1 - h2) / h2), nref)
    model = Ridge(alpha=(1 - h2) / (h2 / m)).fit(G - freq * 2, y)
    acc.append(np.corrcoef(model.predict(Gv - freq * 2), gv)[0, 1])
    theory.append(np.sqrt(nref * h2 / (nref * h2 + Me)))
    print(f"reference {nref:5d}: accuracy {acc[-1]:.2f} (Daetwyler {theory[-1]:.2f})")
''',
 viz=lambda ns: [line(B('Accuracy of genomic breeding values in young animals', 'በወጣት እንስሳት ውስጥ የgenomic breeding values accuracy'), ns['sizes'], [(B('Simulated', 'የተመሰለ'), ns['acc'], 1), (B('Daetwyler formula', 'የDaetwyler ቀመር'), ns['theory'], 2)], B('Reference population size', 'የማጣቀሻ ሕዝብ መጠን'), 'Accuracy', ymin=0, ymax=1, rpad=130)],
 analysis=lambda ns: ([f"With 200 reference animals accuracy is only {ns['acc'][0]:.2f}; with 2,000 it reaches {ns['acc'][-1]:.2f}.", 'Gains slow down: each doubling adds less, as the formula predicts.', f"Selecting young animals at accuracy {ns['acc'][-1]:.2f} without waiting for their own records shortens the generation interval, which is where most of the extra gain comes from."],
                      [f"በ200 የማጣቀሻ እንስሳት accuracy {ns['acc'][0]:.2f} ብቻ ነው፤ በ2,000 {ns['acc'][-1]:.2f} ይደርሳል።", 'ትርፎች ይቀንሳሉ፡ ቀመሩ እንደሚተነብየው እያንዳንዱ እጥፍ ያነሰ ይጨምራል።', f"ወጣት እንስሳትን የራሳቸውን መዝገቦች ሳይጠብቁ በ{ns['acc'][-1]:.2f} accuracy መምረጥ የትውልድ ልዩነቱን ያሳጥራል፤ አብዛኛው ተጨማሪ ትርፍ የሚመጣው ከዚያ ነው።"]),
 decision=lambda ns: ('Do not start genomic selection with a few hundred animals; pool data across cooperatives (or with related breeds) to reach about 2,000 recorded and genotyped animals, and re-check accuracy every year.', 'ጥቂት መቶ እንስሳት ይዘህ genomic selectionን አትጀምር፤ ወደ 2,000 መዝገብ ያላቸውና genotype የተደረጉ እንስሳት ለመድረስ በማኅበራት (ወይም ከተዛማጅ ዝርያዎች ጋር) ዳታን አሰባስብ፣ accuracyን በየዓመቱ እንደገና ፈትሽ።'), note=SIM))
S6.append(lab(('A Bayesian rule for when to spray wheat rust', 'ስንዴ ዝገትን መቼ መርጨት እንዳለብህ የBayesian ሕግ'),
 ('Combine prior knowledge with a scouting sample to get the probability that rust incidence exceeds the 5% action threshold, and turn it into a spray decision with costs.', 'ዝገት ከ5% የእርምጃ ወሰን የማለፉን ፕሮባቢሊቲ ለማግኘት የቀድሞ እውቀትን ከቅኝት ናሙና ጋር አዋህድ፣ ከወጪዎች ጋር ወደ የመርጨት ውሳኔ ቀይረው።'), ('1 week', '1 ሳምንት'),
 [PY, SP, T('Scouting sheet and a W-shaped walk', 'sample leaves across the field', 'በማሳው ላይ ቅጠሎችን ናሙና ማድረግ', 'extension office')],
 (['Prior from past seasons: incidence usually 1–8% → Beta(2, 48).', 'Scout 60 random leaves in a W pattern; count leaves with pustules.', 'Posterior = Beta(2 + infected, 48 + healthy).', 'P(incidence > 5%) from the posterior.', 'Spray if the expected loss of not spraying exceeds the spray cost.'],
  ['ከቀደሙ ወቅቶች የቀድሞ እውቀት፡ ብዛቱ ብዙውን ጊዜ 1–8% → Beta(2, 48)።', 'በW ቅርጽ 60 የዘፈቀደ ቅጠሎችን ቃኝ፤ ጉድፍ ያላቸውን ቅጠሎች ቁጠር።', 'Posterior = Beta(2 + የተያዙ፣ 48 + ጤናማ)።', 'ከposteriorኡ P(ብዛት > 5%)።', 'ያለመርጨት የሚጠበቀው ኪሳራ ከመርጨት ወጪ ከበለጠ ርጭ።']),
 '''
import numpy as np
from scipy import stats
prior = (2, 48); spray_cost = 1800                                       # birr/ha
loss_if_high = 9000                                                       # birr/ha lost if incidence > 5% and not sprayed
fields = {"Field A": 1, "Field B": 4, "Field C": 9}                       # infected leaves out of 60
x = np.linspace(0, 0.25, 101); post = {}
for f, k in fields.items():
    a, b = prior[0] + k, prior[1] + 60 - k; post[f] = (a, b)
    p_high = stats.beta.sf(0.05, a, b); exp_loss = p_high * loss_if_high
    print(f"{f}: {k}/60 infected; posterior mean {a / (a + b):.1%}; P(incidence > 5%) = {p_high:.2f}; expected loss {exp_loss:,.0f} vs spray {spray_cost} -> {'SPRAY' if exp_loss > spray_cost else 'wait and re-scout'}")
p_cut = spray_cost / loss_if_high; print(f"rule: spray when P(incidence > 5%) > {p_cut:.2f}")
probs = {f: stats.beta.sf(0.05, *ab) for f, ab in post.items()}
''',
 viz=lambda ns: [line(B('Posterior for rust incidence in three fields', 'በሦስት ማሳዎች ለዝገት ብዛት posterior'), [round(100 * v, 1) for v in ns['x']], [(B(f, f), list(__import__('scipy').stats.beta.pdf(ns['x'], *ab)), i + 1) for i, (f, ab) in enumerate(ns['post'].items())], B('Incidence (%)', 'ብዛት (%)'), B('Density', 'Density'), xint=False, markers=False, refs=[{'kind': 'v', 'v': 5, 'label': B('5% threshold', '5% ወሰን')}]),
                 hbar(B('Probability that incidence exceeds 5%', 'ብዛቱ ከ5% የማለፉ ፕሮባቢሊቲ'), list(ns['probs']), [('P', list(ns['probs'].values()), 1)], 'P', fmt=2, note=B(f"Spray when P is above {ns['p_cut']:.2f} (= spray cost ÷ loss).", f"P ከ{ns['p_cut']:.2f} በላይ ሲሆን ርጭ (= የመርጨት ወጪ ÷ ኪሳራ)።"))],
 analysis=lambda ns: ([f"Field C (9 of 60 infected) is above the threshold with probability {ns['probs']['Field C']:.2f}: spray.", f"Field B is uncertain (P = {ns['probs']['Field B']:.2f}); Field A is almost surely below (P = {ns['probs']['Field A']:.2f}).", f"Because a missed outbreak costs 5 times the spray, the break-even probability is only {ns['p_cut']:.2f}: act early when losses are large."],
                      [f"ማሳ C (ከ60 9 የተያዙ) ወሰኑን በ{ns['probs']['Field C']:.2f} ፕሮባቢሊቲ ያልፋል፡ ርጭ።", f"ማሳ B እርግጠኛ አይደለም (P = {ns['probs']['Field B']:.2f})፤ ማሳ A ከሞላ ጎደል በእርግጠኝነት ከታች ነው (P = {ns['probs']['Field A']:.2f})።", f"ያመለጠ ወረርሽኝ የመርጨቱን 5 እጥፍ ስለሚያስወጣ የሚዛን ፕሮባቢሊቲው {ns['p_cut']:.2f} ብቻ ነው፡ ኪሳራዎች ትላልቅ ሲሆኑ ቀደም ብለህ ሥራ።"]),
 decision=lambda ns: ('Spray every field whose probability is above 0.20 (here B and C), re-scout A in 5 days, and update the prior each season from the scouting records.', 'ፕሮባቢሊቲው ከ0.20 በላይ የሆነውን እያንዳንዱን ማሳ ርጭ (እዚህ B እና C)፣ Aን በ5 ቀናት ውስጥ እንደገና ቃኝ፣ የቀድሞ እውቀቱን በየወቅቱ ከቅኝት መዝገቦቹ አዘምን።') if all(ns['probs'][f] > ns['p_cut'] for f in ('Field B', 'Field C')) else ('Spray only fields above the break-even probability, re-scout the others in 5 days, and update the prior each season.', 'ከሚዛን ፕሮባቢሊቲው በላይ ያሉ ማሳዎችን ብቻ ርጭ፣ ሌሎቹን በ5 ቀናት ውስጥ እንደገና ቃኝ፣ የቀድሞ እውቀቱን በየወቅቱ አዘምን።'), note=('Costs and losses are illustrative.', 'ወጪዎችና ኪሳራዎች ለማሳያ ናቸው።')))
S6.append(lab(('Forecasting district yield with machine learning', 'የወረዳ ምርትን በmachine learning መተንበይ'),
 ('Forecast maize yield for 60 districts from rainfall, NDVI and fertiliser use with linear regression and gradient boosting, test on a later year, and give a range, not just a number.', 'ለ60 ወረዳዎች የበቆሎ ምርትን ከዝናብ፣ ከNDVI እና ከማዳበሪያ አጠቃቀም በlinear regression እና በgradient boosting ተንብይ፣ በኋለኛ ዓመት ፈትሽ፣ ቁጥር ብቻ ሳይሆን ክልል ስጥ።'), W,
 [PY, SK, PD, T('Satellite NDVI and rainfall (CHIRPS)', 'free predictors for every district', 'ለእያንዳንዱ ወረዳ ነጻ መተንበያዎች', 'earthengine.google.com, chc.ucsb.edu/data/chirps')],
 (['Assemble 8 years × 60 districts: seasonal rain, rain in July, peak NDVI, fertiliser rate, yield.', 'Train on years 1–7, test on year 8 (never mix years).', 'Compare linear regression and gradient boosting by mean absolute error.', 'Fit 10% and 90% quantile models to give a forecast range; check its coverage.', 'Read the most important predictors.'],
  ['8 ዓመታት × 60 ወረዳዎችን አሰባስብ፡ የወቅት ዝናብ፣ የሐምሌ ዝናብ፣ ከፍተኛ NDVI፣ የማዳበሪያ መጠን፣ ምርት።', 'በዓመታት 1–7 አሰልጥን፣ በዓመት 8 ፈትሽ (ዓመታትን በፍጹም አትቀላቅል)።', 'linear regressionን እና gradient boostingን በmean absolute error አወዳድር።', 'የትንበያ ክልል ለመስጠት 10% እና 90% quantile ሞዴሎችን ግጠም፤ ሽፋኑን ፈትሽ።', 'በጣም አስፈላጊዎቹን መተንበያዎች አንብብ።']),
 '''
import numpy as np, pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.inspection import permutation_importance
rng = np.random.default_rng(7); rows = []
for year in range(1, 9):
    shock = rng.normal(0, 60)
    for d in range(60):
        rain = rng.normal(750, 120) + shock; july = rain * rng.uniform(0.25, 0.4); fert = rng.uniform(20, 120)
        ndvi = 0.35 + 0.0003 * rain + 0.001 * fert + rng.normal(0, 0.03)
        y = 1.2 + 0.004 * rain - 0.0000025 * (rain - 800) ** 2 + 0.012 * fert + 4 * (ndvi - 0.6) + rng.normal(0, 0.25)
        rows.append((year, d, rain, july, ndvi, fert, y))
df = pd.DataFrame(rows, columns=["year", "district", "rain", "july_rain", "ndvi", "fert", "yield"])
X = ["rain", "july_rain", "ndvi", "fert"]; tr, te = df[df.year < 8], df[df.year == 8]
lin = LinearRegression().fit(tr[X], tr["yield"]); gb = GradientBoostingRegressor(n_estimators=300, max_depth=3, learning_rate=0.05, random_state=0).fit(tr[X], tr["yield"])
mae = {"linear": float(np.mean(abs(lin.predict(te[X]) - te["yield"]))), "gradient boosting": float(np.mean(abs(gb.predict(te[X]) - te["yield"])))}
lo = GradientBoostingRegressor(loss="quantile", alpha=0.1, n_estimators=300, max_depth=3, learning_rate=0.05, random_state=0).fit(tr[X], tr["yield"]).predict(te[X])
hi = GradientBoostingRegressor(loss="quantile", alpha=0.9, n_estimators=300, max_depth=3, learning_rate=0.05, random_state=0).fit(tr[X], tr["yield"]).predict(te[X])
cover = float(np.mean((te["yield"] >= lo) & (te["yield"] <= hi)))
imp = permutation_importance(gb, te[X], te["yield"], n_repeats=10, random_state=0).importances_mean
print("test-year MAE (t/ha):", {k: round(v, 3) for k, v in mae.items()}); print(f"80% range covered {cover:.0%} of districts; mean width {np.mean(hi - lo):.2f} t/ha")
print("importance:", {k: round(float(v), 3) for k, v in zip(X, imp)})
best = min(mae, key=mae.get)
order = np.argsort(te["yield"].values)[::6]; actual = te["yield"].values[order]; pred = gb.predict(te[X])[order]; lo_s, hi_s = lo[order], hi[order]
''',
 viz=lambda ns: [dots(B('Year 8: forecast range (80%) and actual yield for 10 districts', 'ዓመት 8፡ የትንበያ ክልል (80%) እና ትክክለኛ ምርት ለ10 ወረዳዎች'), [f"D{i + 1}" for i in range(len(ns['order']))], list(ns['pred']), list(ns['lo_s']), list(ns['hi_s']), 't/ha', ref0=False, extra={'name': B('Actual', 'ትክክለኛ'), 'slot': 2, 'v': [round(float(v), 3) for v in ns['actual']], 'hollow': True}),
                 hbar(B('What drives the forecast (permutation importance)', 'ትንበያውን የሚያንቀሳቅሰው (permutation importance)'), ns['X'], [(B('Importance', 'Importance'), list(ns['imp']), 1)], B('Drop in R²', 'የR² ቅነሳ'), fmt=3)],
 analysis=lambda ns: ([f"On the unseen year gradient boosting errs by {ns['mae']['gradient boosting']:.2f} t/ha and linear regression by {ns['mae']['linear']:.2f}: with 7 years of data the simple model is as good or better, so complexity must earn its place.", f"The 80% range covered {ns['cover']:.0%} of districts, so the stated uncertainty is honest.", f"{ns['X'][int(np.argmax(ns['imp']))]} matters most, so the forecast improves as the season’s data arrive."],
                      [f"ባልታየው ዓመት gradient boosting በ{ns['mae']['gradient boosting']:.2f} t/ha፣ linear regression በ{ns['mae']['linear']:.2f} ይስታሉ፡ በ7 ዓመታት ዳታ ቀላሉ ሞዴል እኩል ወይም የተሻለ ነው፤ ስለዚህ ውስብስብነት ቦታውን ማስመስከር አለበት።", f"የ80% ክልሉ {ns['cover']:.0%} ወረዳዎችን ሸፍኗል፤ ስለዚህ የተገለጸው እርግጠኛ ያለመሆን ታማኝ ነው።", f"{ns['X'][int(np.argmax(ns['imp']))]} በጣም አስፈላጊ ነው፤ ስለዚህ የወቅቱ ዳታ ሲደርስ ትንበያው ይሻሻላል።"]),
 decision=lambda ns: (f"Publish district forecasts as ranges each month from July, using the {ns['best']} model for the point forecast and the quantile models for the range; flag districts whose lower bound is below 2 t/ha for early food-security planning, and re-compare models every year.", f"ከሐምሌ ጀምሮ በየወሩ የወረዳ ትንበያዎችን እንደ ክልሎች አትም፤ ለነጥብ ትንበያው የ{ns['best']} ሞዴሉን፣ ለክልሉ quantile ሞዴሎቹን ተጠቀም፤ የታችኛው ገደባቸው ከ2 t/ha በታች የሆኑ ወረዳዎችን ለቅድመ የምግብ-ዋስትና ዕቅድ ምልክት አድርግ፣ ሞዴሎቹን በየዓመቱ እንደገና አወዳድር።"), note=SIM))
S6.append(lab(('Mapping soil acidity by kriging, then measuring a lime programme', 'የአፈር አሲዳማነትን በkriging ካርታ ማድረግ፣ ከዚያ የኖራ ፕሮግራምን መለካት'),
 ('Interpolate soil pH from 120 samples with ordinary kriging, compare it with inverse-distance weighting by cross-validation, then estimate the effect of liming with difference-in-differences.', 'ከ120 ናሙናዎች የአፈር pHን በordinary kriging አስላ፣ ከinverse-distance weighting ጋር በcross-validation አወዳድር፣ ከዚያ የኖራን ውጤት በdifference-in-differences ገምት።'), W,
 [PY, NP, SP, T('GPS and soil auger; QGIS', 'locate samples and draw maps', 'ናሙናዎችን ማግኘትና ካርታዎችን መሣል', 'qgis.org (free)'), T('R: gstat (next step)', 'full geostatistics', 'ሙሉ geostatistics', 'cran.r-project.org')],
 (['Sample 120 GPS points across the watershed; measure pH.', 'Compute the empirical variogram and fit an exponential model.', 'Ordinary kriging vs inverse-distance weighting: leave-one-out errors.', 'Map pH on a grid; share of area below pH 5.5 (needs lime).', 'Lime programme: compare yield change in limed vs non-limed kebeles before and after (difference-in-differences).'],
  ['በተፋሰሱ ላይ 120 የGPS ነጥቦችን ናሙና አድርግ፤ pHን ለካ።', 'empirical variogramን አስላና exponential ሞዴል ግጠም።', 'Ordinary kriging vs inverse-distance weighting፡ leave-one-out ስህተቶች።', 'pHን በፍርግርግ ላይ ካርታ አድርግ፤ ከpH 5.5 በታች ያለ የቦታ ድርሻ (ኖራ ያስፈልገዋል)።', 'የኖራ ፕሮግራም፡ በኖራ የተደረጉና ያልተደረጉ ቀበሌዎች ውስጥ የምርት ለውጥን ከዚያ በፊትና በኋላ አወዳድር (difference-in-differences)።']),
 '''
import numpy as np
from scipy.optimize import curve_fit
rng = np.random.default_rng(3); n = 120
xy = rng.uniform(0, 10, (n, 2))                                                  # km
trend = 5.2 + 0.12 * xy[:, 0]                                                    # more acid in the west (wet highlands)
D = np.linalg.norm(xy[:, None] - xy[None], axis=2)
C = 0.25 * np.exp(-D / 2.0); ph = trend + np.linalg.cholesky(C + 1e-8 * np.eye(n)) @ rng.normal(size=n) + rng.normal(0, 0.1, n)
bins = np.arange(0.5, 6.5, 0.5); iu = np.triu_indices(n, 1); d, sq = D[iu], 0.5 * (ph[:, None] - ph[None]) [iu] ** 2
gamma = [sq[(d >= b - 0.25) & (d < b + 0.25)].mean() for b in bins]
expo = lambda h, nug, sill, r: nug + sill * (1 - np.exp(-h / r))
(nug, sill, rng_), _ = curve_fit(expo, bins, gamma, p0=(0.01, 0.3, 2), bounds=(0, [1, 2, 20]))
cov = lambda h: sill * np.exp(-h / rng_) + nug * (h == 0)
def krige(train, target):
    K = np.ones((len(train) + 1, len(train) + 1)); K[-1, -1] = 0; K[:-1, :-1] = cov(D[np.ix_(train, train)])
    k = np.append(cov(np.linalg.norm(xy[train] - target, axis=1)), 1); w = np.linalg.solve(K, k)[:-1]; return w @ ph[train]
def idw(train, target):
    dd = np.linalg.norm(xy[train] - target, axis=1) + 1e-9; w = 1 / dd ** 2; return (w @ ph[train]) / w.sum()
errs = {"kriging": [], "IDW": []}
for i in range(n):
    tr = np.delete(np.arange(n), i); errs["kriging"].append(krige(tr, xy[i]) - ph[i]); errs["IDW"].append(idw(tr, xy[i]) - ph[i])
rmse = {k: float(np.sqrt(np.mean(np.square(v)))) for k, v in errs.items()}
grid = np.array([[gx, gy] for gx in np.arange(0.25, 10, 0.5) for gy in np.arange(0.25, 10, 0.5)])
acid = np.mean([krige(np.arange(n), g) < 5.5 for g in grid])
before = {"limed": 1.9, "not limed": 2.1}; after = {"limed": 2.7, "not limed": 2.3}             # t/ha, kebele means
did = (after["limed"] - before["limed"]) - (after["not limed"] - before["not limed"])
print(f"variogram: nugget {nug:.3f}, sill {sill:.3f}, range {rng_:.1f} km"); print("leave-one-out RMSE:", {k: round(v, 3) for k, v in rmse.items()})
print(f"area with pH < 5.5: {acid:.0%}"); print(f"difference-in-differences: lime raised yield by {did:.1f} t/ha")
''',
 viz=lambda ns: [line(B('Empirical variogram and fitted exponential model', 'Empirical variogram እና የተገጠመ exponential ሞዴል'), list(ns['bins']), [(B('Empirical', 'Empirical'), ns['gamma'], 1), (B('Exponential fit', 'Exponential fit'), list(ns['expo'](ns['bins'], ns['nug'], ns['sill'], ns['rng_'])), 2)], B('Distance (km)', 'ርቀት (km)'), 'Semivariance', xint=False, ymin=0, rpad=110),
                 line(B('Difference-in-differences: mean yield (t/ha)', 'Difference-in-differences፡ አማካይ ምርት (t/ha)'), [1, 2], [(B('Limed kebeles', 'ኖራ የተደረገባቸው ቀበሌዎች'), [ns['before']['limed'], ns['after']['limed']], 1), (B('Not limed', 'ኖራ ያልተደረገባቸው'), [ns['before']['not limed'], ns['after']['not limed']], 2)], B('1 = before, 2 = after', '1 = በፊት፣ 2 = በኋላ'), 't/ha', rpad=110)],
 analysis=lambda ns: ([f"pH values are spatially correlated over several kilometres (range parameter {ns['rng_']:.1f} km); the nugget is small, so nearby samples are informative.", f"Kriging predicts left-out samples with RMSE {ns['rmse']['kriging']:.2f} pH units against {ns['rmse']['IDW']:.2f} for IDW; {ns['acid']:.0%} of the area is below pH 5.5.", f"Limed kebeles gained {ns['after']['limed'] - ns['before']['limed']:.1f} t/ha and others {ns['after']['not limed'] - ns['before']['not limed']:.1f}: the lime effect is about {ns['did']:.1f} t/ha, if both groups would have followed the same trend."],
                      [f"የpH እሴቶች በበርካታ ኪሎሜትሮች ላይ በቦታ ይዛመዳሉ (የክልል ፓራሜትር {ns['rng_']:.1f} km)፤ nuggetኡ ትንሽ ነው፤ ስለዚህ አቅራቢያ ናሙናዎች መረጃ ሰጪ ናቸው።", f"Kriging የተተዉ ናሙናዎችን በRMSE {ns['rmse']['kriging']:.2f} የpH አሃዶች ይተነብያል፤ IDW {ns['rmse']['IDW']:.2f}፤ {ns['acid']:.0%} ቦታው ከpH 5.5 በታች ነው።", f"ኖራ የተደረገባቸው ቀበሌዎች {ns['after']['limed'] - ns['before']['limed']:.1f} t/ha፣ ሌሎቹ {ns['after']['not limed'] - ns['before']['not limed']:.1f} አትርፈዋል፡ ሁለቱም ቡድኖች ተመሳሳይ አዝማሚያ ይከተሉ ነበር ከተባለ የኖራው ውጤት ወደ {ns['did']:.1f} t/ha ነው።"]),
 decision=lambda ns: ('Target lime to the mapped pH < 5.5 zone, and roll it out kebele by kebele in a random order so the next evaluation can be a true experiment.', 'ኖራን በካርታው ላይ ወዳለው pH < 5.5 ዞን አነጣጥር፣ ቀጣዩ ግምገማ እውነተኛ ሙከራ እንዲሆን በዘፈቀደ ቅደም ተከተል ቀበሌ በቀበሌ አስፋው።'), note=SIM))
emit_labs('s', 6, S6, 7)

S7 = []
S7.append(lab(('Designing a community goat breeding programme', 'የማኅበረሰብ የፍየል እርባታ ፕሮግራም መንደፍ'),
 ('Compare three designs for a community-based goat programme (buck selection on own records, pedigree BLUP with recording, genomic selection) on genetic gain, inbreeding and cost.', 'ለማኅበረሰብ-ተኮር የፍየል ፕሮግራም ሦስት ንድፎችን (በራስ መዝገቦች የወንድ ፍየል ምርጫ፣ ከመመዝገብ ጋር pedigree BLUP፣ genomic selection) በዘረመል ትርፍ፣ በinbreeding እና በወጪ አወዳድር።'), W,
 [PY, NP, SHEET, T('Breeding-programme software (e.g. ZPLAN+, MoBPS)', 'detailed deterministic or stochastic designs', 'ዝርዝር deterministic ወይም stochastic ንድፎች', 'mobps.de, zplan.uni-goettingen.de')],
 (['Define the goal trait (6-month weight) with σA = 1.5 kg and h² = 0.25.', 'For each design set accuracy r, selection intensity i and generation interval L.', 'Genetic gain per year ΔG = i·r·σA ÷ L.', 'Inbreeding per generation ΔF = 1/(8Nm) + 1/(8Nf).', 'Add yearly costs and compute cost per kg of gain across the flock.'],
  ['የዒላማ ባሕሪውን (የ6-ወር ክብደት) ከσA = 1.5 kg እና h² = 0.25 ጋር ግለጽ።', 'ለእያንዳንዱ ንድፍ accuracy r፣ የምርጫ ጥንካሬ i እና የትውልድ ልዩነት L አዘጋጅ።', 'በዓመት የዘረመል ትርፍ ΔG = i·r·σA ÷ L።', 'በትውልድ inbreeding ΔF = 1/(8Nm) + 1/(8Nf)።', 'ዓመታዊ ወጪዎችን ጨምርና በመንጋው ላይ በkg ትርፍ ወጪን አስላ።']),
 '''
import pandas as pd
sigma_a, does = 1.5, 3000
d = pd.DataFrame({"design": ["own records", "pedigree BLUP", "genomic selection"],
                  "accuracy": [0.50, 0.65, 0.70], "intensity": [1.4, 1.6, 1.8], "L_years": [2.5, 2.8, 1.8],
                  "bucks_used": [60, 40, 25], "cost_birr_year": [150_000, 420_000, 1_400_000]})
d["gain_kg_year"] = d.intensity * d.accuracy * sigma_a / d.L_years
d["dF_percent_gen"] = 100 * (1 / (8 * d.bucks_used) + 1 / (8 * does))
d["dF_percent_year"] = d.dF_percent_gen / d.L_years
d["birr_per_kg_flock"] = d.cost_birr_year / (d.gain_kg_year * does * 1.5)        # about 1.5 kids per doe a year benefit
print(d[["design", "gain_kg_year", "dF_percent_year", "birr_per_kg_flock"]].round(3).to_string(index=False))
best = d.loc[d.birr_per_kg_flock.idxmin(), "design"]
''',
 viz=lambda ns: [hbar(B('Genetic gain per year (kg of 6-month weight)', 'በዓመት የዘረመል ትርፍ (የ6-ወር ክብደት kg)'), list(ns['d'].design), [('kg/year', list(ns['d'].gain_kg_year), 1)], 'kg', fmt=2),
                 hbar(B('Inbreeding per year (%) and cost per kg of flock gain (birr ÷ 10)', 'በዓመት inbreeding (%) እና በkg የመንጋ ትርፍ ወጪ (ብር ÷ 10)'), list(ns['d'].design), [(B('ΔF % per year', 'ΔF % በዓመት'), list(ns['d'].dF_percent_year), 2), (B('Birr per kg ÷ 10', 'ብር በkg ÷ 10'), list(ns['d'].birr_per_kg_flock / 10), 0)], B('Value', 'እሴት'), fmt=2)],
 analysis=lambda ns: ([f"Genomic selection gives the most gain ({ns['d'].gain_kg_year[2]:.2f} kg/year) mainly by shortening the generation interval; pedigree BLUP gives {ns['d'].gain_kg_year[1]:.2f}.", f"Using few bucks raises inbreeding: {ns['d'].dF_percent_gen[2]:.2f}% per generation with 25 bucks, at the lower edge of the 0.5–1% limit.", f"The cheapest gain per kg comes from “{ns['best']}”."],
                      [f"Genomic selection ብዙ ትርፍ ይሰጣል ({ns['d'].gain_kg_year[2]:.2f} kg/ዓመት)፣ በዋናነት የትውልድ ልዩነቱን በማሳጠር፤ pedigree BLUP {ns['d'].gain_kg_year[1]:.2f} ይሰጣል።", f"ጥቂት ወንድ ፍየሎችን መጠቀም inbreedingን ያሳድጋል፡ በ25 ወንድ ፍየሎች በትውልድ {ns['d'].dF_percent_gen[2]:.2f}%፣ በ0.5–1% ገደቡ ዝቅተኛ ጠርዝ።", f"በkg በጣም ርካሹ ትርፍ ከ«{ns['best']}» ይመጣል።"]),
 decision=lambda ns: (f"Start with “{ns['best']}”: build recording and pedigree first, keep at least 40 bucks in use, and plan genomic selection once a reference population exists.", f"በ«{ns['best']}» ጀምር፡ መጀመሪያ መዝገብና pedigree ገንባ፣ ቢያንስ 40 ወንድ ፍየሎችን በአገልግሎት አቆይ፣ የማጣቀሻ ሕዝብ ሲኖር genomic selectionን አቅድ።"), note=('Parameters are typical values for community programmes; replace them with your own.', 'ፓራሜትሮቹ ለማኅበረሰብ ፕሮግራሞች የተለመዱ እሴቶች ናቸው፤ በራስህ ተካቸው።')))
S7.append(lab(('A selection index for milk and fertility', 'ለወተትና ለመራባት የምርጫ index'),
 ('Build a selection index for dairy cattle that combines milk yield and calving interval with economic weights, and compare the response with selecting on milk alone.', 'የወተት ምርትንና የመውለጃ ልዩነትን ከኢኮኖሚያዊ ክብደቶች ጋር የሚያዋህድ ለወተት ከብቶች የምርጫ index ገንባ፣ ምላሹን በወተት ብቻ ከሚደረግ ምርጫ ጋር አወዳድር።'), W,
 [PY, NP, SHEET],
 (['Traits: milk (kg/lactation) and calving interval (days, lower is better).', 'Economic weights: +12 birr per kg milk, −500 birr per extra day of calving interval (feed, lost milk and fewer calves).', 'Phenotypic matrix P and genetic matrix G from the literature (unfavourable genetic correlation +0.35).', 'Index weights b = P⁻¹ G a; response of each trait and of profit.', 'Compare with selecting on milk only.'],
  ['ባሕሪያት፡ ወተት (kg/ላክቴሽን) እና የመውለጃ ልዩነት (ቀናት፣ ዝቅተኛ የተሻለ ነው)።', 'ኢኮኖሚያዊ ክብደቶች፡ በkg ወተት +12 ብር፣ በእያንዳንዱ ተጨማሪ የመውለጃ ልዩነት ቀን −500 ብር (መኖ፣ የጠፋ ወተትና ጥቂት ጥጆች)።', 'የphenotypic ማትሪክስ P እና የgenetic ማትሪክስ G ከጽሑፎች (የማይመች genetic correlation +0.35)።', 'የindex ክብደቶች b = P⁻¹ G a፤ የእያንዳንዱ ባሕሪና የትርፍ ምላሽ።', 'በወተት ብቻ ከመምረጥ ጋር አወዳድር።']),
 '''
import numpy as np
sd_p = np.array([600.0, 45.0]); h2 = np.array([0.25, 0.05]); rg, rp = 0.35, 0.10
sd_g = sd_p * np.sqrt(h2)
P = np.array([[sd_p[0] ** 2, rp * sd_p[0] * sd_p[1]], [rp * sd_p[0] * sd_p[1], sd_p[1] ** 2]])
G = np.array([[sd_g[0] ** 2, rg * sd_g[0] * sd_g[1]], [rg * sd_g[0] * sd_g[1], sd_g[1] ** 2]])
a = np.array([12.0, -500.0]); i = 1.4
def response(b):
    sd_i = np.sqrt(b @ P @ b); r = i * (G @ b) / sd_i; return r, a @ r
b_index = np.linalg.solve(P, G @ a); b_milk = np.array([1.0, 0.0])
r_idx, profit_idx = response(b_index); r_milk, profit_milk = response(b_milk)
print(f"index weights: milk {b_index[0]:.2f}, calving interval {b_index[1]:.2f}")
print(f"milk only : +{r_milk[0]:.0f} kg milk, {r_milk[1]:+.1f} days CI, profit {profit_milk:,.0f} birr per cow per generation")
print(f"index     : +{r_idx[0]:.0f} kg milk, {r_idx[1]:+.1f} days CI, profit {profit_idx:,.0f} birr per cow per generation")
''',
 viz=lambda ns: [hbar(B('Response per generation of selection', 'በትውልድ የምርጫ ምላሽ'), [B('Milk (kg ÷ 10)', 'ወተት (kg ÷ 10)'), B('Calving interval (days)', 'የመውለጃ ልዩነት (ቀናት)'), B('Profit (birr ÷ 100)', 'ትርፍ (ብር ÷ 100)')], [(B('Milk only', 'ወተት ብቻ'), [ns['r_milk'][0] / 10, ns['r_milk'][1], ns['profit_milk'] / 100], 2), (B('Economic index', 'ኢኮኖሚያዊ index'), [ns['r_idx'][0] / 10, ns['r_idx'][1], ns['profit_idx'] / 100], 1)], B('Change', 'ለውጥ'), fmt=1)],
 analysis=lambda ns: ([f"Selecting on milk alone gains {ns['r_milk'][0]:.0f} kg but lengthens the calving interval by {ns['r_milk'][1]:.1f} days, because the genetic correlation is unfavourable.", f"The index gives less milk ({ns['r_idx'][0]:.0f} kg) but holds calving interval at {ns['r_idx'][1]:+.1f} days.", f"Profit per cow per generation: {ns['profit_idx']:,.0f} birr with the index vs {ns['profit_milk']:,.0f} with milk only."],
                      [f"በወተት ብቻ መምረጥ {ns['r_milk'][0]:.0f} kg ያተርፋል ግን የመውለጃ ልዩነቱን በ{ns['r_milk'][1]:.1f} ቀናት ያራዝማል፣ የgenetic correlation የማይመች ስለሆነ።", f"indexኡ ያነሰ ወተት ({ns['r_idx'][0]:.0f} kg) ይሰጣል፣ ግን የመውለጃ ልዩነቱን በ{ns['r_idx'][1]:+.1f} ቀናት ይይዛል።", f"በላም በትውልድ ትርፍ፡ ከindex ጋር {ns['profit_idx']:,.0f} ብር vs በወተት ብቻ {ns['profit_milk']:,.0f}።"]),
 decision=lambda ns: ('Rank bulls on the economic index, not on milk alone; record calving dates in every herd so fertility EBVs become accurate, and review the economic weights every 3 years.', 'ወይፈኖችን በወተት ብቻ ሳይሆን በኢኮኖሚያዊ indexኡ ደርድር፤ የመራባት EBVs ትክክለኛ እንዲሆኑ በእያንዳንዱ መንጋ የመውለጃ ቀኖችን መዝግብ፣ ኢኮኖሚያዊ ክብደቶቹን በየ3 ዓመቱ ገምግም።'), note=('Genetic parameters are typical literature values for tropical dairy cattle.', 'የዘረመል ፓራሜትሮቹ ለሞቃታማ የወተት ከብቶች የተለመዱ የጽሑፍ እሴቶች ናቸው።')))
S7.append(lab(('How many locations and replicates? Optimising a testing network', 'ስንት ቦታዎችና replicates? የፈተና ኔትወርክን ማመቻቸት'),
 ('With a fixed budget of 600 plots per entry-year, find the number of locations and replicates that maximises the heritability of entry means and the response to selection.', 'በዓመት በግቤት 600 plots ቋሚ በጀት፣ የግቤት አማካዮችን heritability እና የምርጫ ምላሽን ከፍተኛ የሚያደርገውን የቦታዎችና የreplicates ብዛት ፈልግ።'), W,
 [PY, NP, SHEET],
 (['Get variance components from past trials: σ²G, σ²GL (genotype × location) and σ²e.', 'For L locations and r replicates: H² = σ²G ÷ (σ²G + σ²GL/L + σ²e/(L·r)).', 'Total plots = entries × L × r, fixed by the budget.', 'Evaluate all allowed combinations and the cost per location (travel, staff).', 'Choose the design.'],
  ['ከቀደሙ ሙከራዎች variance components ውሰድ፡ σ²G፣ σ²GL (genotype × ቦታ) እና σ²e።', 'ለL ቦታዎችና r replicates፡ H² = σ²G ÷ (σ²G + σ²GL/L + σ²e/(L·r))።', 'ጠቅላላ plots = ግቤቶች × L × r፣ በበጀቱ የተወሰነ።', 'ሁሉንም የተፈቀዱ ጥምረቶችና በቦታ ወጪን (ጉዞ፣ ሠራተኞች) ገምግም።', 'ንድፉን ምረጥ።']),
 '''
import numpy as np
vg, vgl, ve = 0.10, 0.12, 0.30                       # (t/ha)^2 from past maize trials
entries, plots_budget = 50, 600
designs = [(L, r) for L in range(2, 13) for r in (1, 2, 3, 4) if L * r <= plots_budget // entries]      # at most 12 plots per entry
H2 = {(L, r): vg / (vg + vgl / L + ve / (L * r)) for L, r in designs}
best = max(H2, key=H2.get)
for r in (1, 2, 3, 4):
    print(f"r = {r}: " + ", ".join(f"L={L}: {H2[(L, rr)]:.2f}" for (L, rr) in designs if rr == r))
print(f"best with 12 plots per entry: {best[0]} locations x {best[1]} replicate(s), H2 = {H2[best]:.2f}")
same_plots = {f"{L} loc x {r} rep": round(H2[(L, r)], 3) for (L, r) in [(3, 4), (4, 3), (6, 2), (12, 1)]}
''',
 viz=lambda ns: [line(B('Heritability of entry means, 12 plots per entry', 'የግቤት አማካዮች heritability፣ በግቤት 12 plots'), [3, 4, 6, 12], [(B('H²', 'H²'), list(ns['same_plots'].values()), 1)], B('Locations (replicates = 12 ÷ locations)', 'ቦታዎች (replicates = 12 ÷ ቦታዎች)'), 'H²', ymin=0, ymax=1),
                 line(B('Heritability by locations and replicates', 'Heritability በቦታዎችና በreplicates'), list(range(2, 7)), [(B(f'{r} rep', f'{r} rep'), [ns['H2'][(L, r)] for L in range(2, 7)], r) for r in (1, 2)], B('Locations', 'ቦታዎች'), 'H²', ymin=0, ymax=1)],
 analysis=lambda ns: ([f"With 12 plots per entry, 12 locations × 1 replicate gives H² = {ns['same_plots']['12 loc x 1 rep']:.2f}; 3 locations × 4 replicates only {ns['same_plots']['3 loc x 4 rep']:.2f}.", 'G × L variance is larger than half the plot error here, so more locations beat more replicates.', 'One replicate per site is risky (no within-site error estimate); 6 locations × 2 replicates is a safe compromise.'],
                      [f"በግቤት 12 plots ሲሆኑ 12 ቦታዎች × 1 replicate H² = {ns['same_plots']['12 loc x 1 rep']:.2f} ይሰጣሉ፤ 3 ቦታዎች × 4 replicates {ns['same_plots']['3 loc x 4 rep']:.2f} ብቻ።", 'እዚህ የG × L variance ከplot ስህተቱ ግማሽ ይበልጣል፤ ስለዚህ ተጨማሪ ቦታዎች ተጨማሪ replicatesን ያሸንፋሉ።', 'በቦታ አንድ replicate አደገኛ ነው (በቦታ ውስጥ የስህተት ግምት የለም)፤ 6 ቦታዎች × 2 replicates ደህንነቱ የተጠበቀ ስምምነት ነው።']),
 decision=lambda ns: (f"Run the next stage at 6 locations × 2 replicates (H² {ns['same_plots']['6 loc x 2 rep']:.2f}), choosing locations that represent the target environments; drop to 1 replicate at extra sites if budget allows more locations.", f"ቀጣዩን ደረጃ በ6 ቦታዎች × 2 replicates (H² {ns['same_plots']['6 loc x 2 rep']:.2f}) አካሂድ፣ የዒላማ አካባቢዎችን የሚወክሉ ቦታዎችን መርጠህ፤ በጀቱ ተጨማሪ ቦታዎችን ከፈቀደ በተጨማሪ ቦታዎች ወደ 1 replicate ውረድ።"), note=('Variance components are typical for maize yield trials.', 'Variance components ለበቆሎ የምርት ሙከራዎች የተለመዱ ናቸው።')))
S7.append(lab(('20-year simulation: is the breeding programme a good investment?', 'የ20-ዓመት ማስመሰል፡ የእርባታ ፕሮግራሙ ጥሩ ኢንቨስትመንት ነው?'),
 ('Simulate 20 years of a sheep breeding programme with uncertain genetic gain, adoption and prices, discount costs and benefits, and estimate the chance that it pays off.', 'እርግጠኛ ያልሆኑ የዘረመል ትርፍ፣ ተቀባይነትና ዋጋዎች ያሉትን የበግ እርባታ ፕሮግራም 20 ዓመታት አስመስል፣ ወጪዎችንና ጥቅሞችን discount አድርግ፣ የመዋጣቱን ዕድል ገምት።'), W,
 [PY, NP, SHEET],
 (['Costs: 6 M birr in year 1 (set-up), then 2.5 M per year (recording, staff, ram distribution).', 'Gain per year ~ Normal(0.35, 0.08) kg per lamb; benefits start in year 3 and accumulate.', 'Adoption grows from about 1% to a maximum of 10–50% of 200,000 lambs.', 'Price per kg ~ Normal(250, 40) birr; discount rate 10%.', 'Repeat 5,000 times; report NPV distribution and P(NPV > 0).'],
  ['ወጪዎች፡ በዓመት 1 6 M ብር (ማቋቋሚያ)፣ ከዚያ በዓመት 2.5 M (መዝገብ፣ ሠራተኞች፣ የአውራ በግ ስርጭት)።', 'በዓመት ትርፍ ~ Normal(0.35, 0.08) kg በጠቦት፤ ጥቅሞች በዓመት 3 ይጀምራሉ፣ ይጠራቀማሉ።', 'ተቀባይነት ከ1% ገደማ ወደ ከ200,000 ጠቦቶች ከፍተኛ 10–50% ያድጋል።', 'በkg ዋጋ ~ Normal(250, 40) ብር፤ የdiscount መጠን 10%።', '5,000 ጊዜ ድገም፤ የNPV ስርጭትንና P(NPV > 0)ን ዘግብ።']),
 '''
import numpy as np
rng = np.random.default_rng(9); S, Y = 5000, 20
years = np.arange(1, Y + 1); disc = 1.10 ** -years
cost = np.where(years == 1, 6.0e6, 2.5e6)
gain = rng.normal(0.35, 0.08, S).clip(0.05)[:, None]
cum_gain = gain * np.clip(years - 2, 0, None)[None, :]                         # kg per lamb, accumulating from year 3
adopt_max = rng.uniform(0.10, 0.50, S)[:, None]; adopt = adopt_max / (1 + np.exp(-(years - 8) / 2))
price = rng.normal(250, 40, S).clip(100)[:, None]
benefit = cum_gain * adopt * 200_000 * price
npv = ((benefit - cost) * disc).sum(1) / 1e6                                  # million birr
cum = np.cumsum((benefit - cost) * disc, axis=1) / 1e6
med_path = np.median(cum, 0); lo_path, hi_path = np.percentile(cum, [10, 90], axis=0)
payback = int(years[np.argmax(med_path > 0)]) if (med_path > 0).any() else None
print(f"NPV: median {np.median(npv):,.0f} M birr, 10-90% range {np.percentile(npv, 10):,.0f} to {np.percentile(npv, 90):,.0f}; P(NPV > 0) = {np.mean(npv > 0):.0%}")
print(f"median discounted payback year: {payback}")
''',
 viz=lambda ns: [line(B('Cumulative discounted net value (million birr)', 'የተጠራቀመ discount የተደረገ የተጣራ ዋጋ (ሚሊዮን ብር)'), list(ns['years']), [(B('10th percentile', '10ኛ percentile'), list(ns['lo_path']), 2), (B('Median', 'Median'), list(ns['med_path']), 1), (B('90th percentile', '90ኛ percentile'), list(ns['hi_path']), 0)], B('Year', 'ዓመት'), B('Million birr', 'ሚሊዮን ብር'), refs=[{'kind': 'h', 'v': 0, 'label': ''}], rpad=120)],
 analysis=lambda ns: ([f"The median NPV over 20 years is {np.median(ns['npv']):,.0f} million birr; 80% of simulations fall between {np.percentile(ns['npv'], 10):,.0f} and {np.percentile(ns['npv'], 90):,.0f}.", f"The programme pays off in {np.mean(ns['npv'] > 0):.0%} of simulations; the median path breaks even in year {ns['payback']}.", 'Benefits come late because genetic gain accumulates and adoption spreads slowly: the first years are pure cost.'],
                      [f"በ20 ዓመታት median NPV {np.median(ns['npv']):,.0f} ሚሊዮን ብር ነው፤ 80% ማስመሰሎች ከ{np.percentile(ns['npv'], 10):,.0f} እስከ {np.percentile(ns['npv'], 90):,.0f} ይወድቃሉ።", f"ፕሮግራሙ በ{np.mean(ns['npv'] > 0):.0%} ማስመሰሎች ያዋጣል፤ median መንገዱ በዓመት {ns['payback']} ይመጣጠናል።", 'የዘረመል ትርፍ ስለሚጠራቀምና ተቀባይነት በዝግታ ስለሚስፋፋ ጥቅሞች ዘግይተው ይመጣሉ፡ የመጀመሪያዎቹ ዓመታት ንጹሕ ወጪ ናቸው።']),
 decision=lambda ns: ('Fund the programme with a 10-year commitment (shorter funding would stop it before it pays), and invest early in ram distribution to speed adoption, the biggest lever.', 'ፕሮግራሙን በ10-ዓመት ቁርጠኝነት ፈንድ (አጭር ገንዘብ ከመዋጣቱ በፊት ያቆመዋል)፣ ትልቁ መሣሪያ የሆነውን ተቀባይነት ለማፋጠን በአውራ በግ ስርጭት ላይ ቀደም ብለህ ኢንቨስት አድርግ።'), note=SIM))
S7.append(lab(('Multi-omics integration: do metabolites add to genotypes?', 'Multi-omics ውህደት፡ metabolites በgenotypes ላይ ይጨምራሉ?'),
 ('Predict a heat-tolerance trait in 400 sheep from SNPs, from blood metabolites, and from both, with cross-validation, and decide whether metabolomics is worth its cost.', 'በ400 በጎች ውስጥ የሙቀት-መቋቋም ባሕሪን ከSNPs፣ ከደም metabolites እና ከሁለቱም በcross-validation ተንብይ፣ metabolomics ለወጪው ያዋጣ እንደሆነ ወስን።'), W,
 [PY, NP, SK, T('R: mixOmics or MOFA2 (next step)', 'multi-omics factor models', 'የmulti-omics factor ሞዴሎች', 'bioconductor.org')],
 (['Data: 400 animals × 3,000 SNPs and × 150 metabolites (log-transformed, scaled).', 'Model 1: ridge on SNPs; model 2: ridge on metabolites; model 3: both blocks, each scaled to equal total variance.', '5-fold cross-validation; accuracy = correlation with the observed trait.', 'Look at the top metabolites in the combined model.', 'Weigh accuracy gain against cost per animal.'],
  ['ዳታ፡ 400 እንስሳት × 3,000 SNPs እና × 150 metabolites (log-transformed፣ scaled)።', 'ሞዴል 1፡ በSNPs ላይ ridge፤ ሞዴል 2፡ በmetabolites ላይ ridge፤ ሞዴል 3፡ ሁለቱም blocks፣ እያንዳንዱ ወደ እኩል ጠቅላላ variance scaled።', '5-fold cross-validation፤ accuracy = ከተመለከተው ባሕሪ ጋር correlation።', 'በተዋሃደው ሞዴል ውስጥ ዋናዎቹን metabolites ተመልከት።', 'የaccuracy ትርፍን ከበእንስሳ ወጪ ጋር መዝን።']),
 '''
import numpy as np
from sklearn.linear_model import RidgeCV
from sklearn.model_selection import cross_val_predict, KFold
rng = np.random.default_rng(6); n, p, q = 400, 3000, 150
G = rng.binomial(2, rng.uniform(0.05, 0.5, p), (n, p)).astype(float); G = (G - G.mean(0)) / (G.std(0) + 1e-9)
g = G[:, :200] @ rng.normal(0, 1, 200); g = g / g.std() * 0.55                    # genetic part
env = rng.normal(0, 0.6, n)                                                       # physiology not explained by SNPs
M = np.column_stack([0.7 * env + 0.3 * g + rng.normal(0, 0.6, n) for _ in range(12)] + [rng.normal(0, 1, n) for _ in range(q - 12)])
M = (M - M.mean(0)) / M.std(0); y = g + env + rng.normal(0, 0.6, n)
blocks = {"SNPs": G / np.sqrt(p), "metabolites": M / np.sqrt(q), "SNPs + metabolites": np.hstack([G / np.sqrt(p), M / np.sqrt(q)])}
acc = {}
for k, X in blocks.items():
    pred = cross_val_predict(RidgeCV(alphas=np.logspace(-3, 3, 13)), X, y, cv=KFold(5, shuffle=True, random_state=0))
    acc[k] = float(np.corrcoef(pred, y)[0, 1]); print(f"{k:20s} accuracy {acc[k]:.2f}")
coef = RidgeCV(alphas=np.logspace(-3, 3, 13)).fit(blocks["SNPs + metabolites"], y).coef_[p:]
top = np.argsort(-abs(coef))[:5]; print("top metabolites:", [f"M{j + 1}" for j in top])
cost = {"SNPs": 35, "metabolites": 90, "SNPs + metabolites": 125}                 # USD per animal
''',
 viz=lambda ns: [hbar(B('Cross-validated prediction accuracy', 'Cross-validated የትንበያ accuracy'), list(ns['acc']), [(B('Accuracy', 'Accuracy'), list(ns['acc'].values()), 1)], 'r', fmt=2, note=B('Cost per animal: SNP chip 35 USD, metabolomics panel 90 USD.', 'በእንስሳ ወጪ፡ SNP chip 35 USD፣ metabolomics panel 90 USD።'))],
 analysis=lambda ns: ([f"SNPs alone predict with accuracy {ns['acc']['SNPs']:.2f}; metabolites alone {ns['acc']['metabolites']:.2f}.", f"Together they reach {ns['acc']['SNPs + metabolites']:.2f}: metabolites capture physiological state that genotypes cannot.", f"The top metabolites ({', '.join('M' + str(j + 1) for j in ns['top'][:3])}) are candidates for a cheap targeted assay."],
                      [f"SNPs ብቻቸውን በ{ns['acc']['SNPs']:.2f} accuracy ይተነብያሉ፤ metabolites ብቻቸውን {ns['acc']['metabolites']:.2f}።", f"በአንድ ላይ {ns['acc']['SNPs + metabolites']:.2f} ይደርሳሉ፡ metabolites genotypes ሊይዙት የማይችሉትን የፊዚዮሎጂ ሁኔታ ይይዛሉ።", f"ዋናዎቹ metabolites ({', '.join('M' + str(j + 1) for j in ns['top'][:3])}) ለርካሽ ያነጣጠረ ምርመራ ዕጩዎች ናቸው።"]),
 decision=lambda ns: ('Use metabolomics to phenotype heat tolerance in a reference group, not on every animal; develop a targeted assay for the top metabolites, and keep genomic selection for breeding values (only SNPs are inherited).', 'የሙቀት መቋቋምን phenotype ለማድረግ metabolomicsን በማጣቀሻ ቡድን ውስጥ ተጠቀም እንጂ በእያንዳንዱ እንስሳ ላይ አይደለም፤ ለዋናዎቹ metabolites ያነጣጠረ ምርመራ አዘጋጅ፣ ለbreeding values genomic selectionን አቆይ (የሚወረሱት SNPs ብቻ ናቸው)።'), note=SIM))
S7.append(lab(('Business plan for an agricultural statistics service', 'ለግብርና የስታቲስቲክስ አገልግሎት የንግድ ዕቅድ'),
 ('Model the revenue, costs, capacity and break-even of a small analytics company offering trial design, data analysis and training to research centres and companies.', 'ለምርምር ማዕከላትና ለኩባንያዎች የሙከራ ንድፍ፣ የዳታ ትንተናና ሥልጠና የሚሰጥ ትንሽ የትንተና ኩባንያ ገቢን፣ ወጪዎችን፣ አቅምንና የሚመጣጠንበትን ነጥብ ሞዴል አድርግ።'), W,
 [PY, PD, SHEET],
 (['List services with price and analyst hours: trial design, full analysis, training course, monthly dashboard subscription.', 'Estimate monthly demand for year 1 and year 2.', 'Capacity: analysts × 120 billable hours per month.', 'Fixed costs (salaries, office, software, computing) and variable costs.', 'Break-even month and the hire decision.'],
  ['አገልግሎቶችን ከዋጋና ከተንታኝ ሰዓታት ጋር ዘርዝር፡ የሙከራ ንድፍ፣ ሙሉ ትንተና፣ የሥልጠና ኮርስ፣ ወርሃዊ የdashboard ምዝገባ።', 'ለዓመት 1 እና ለዓመት 2 ወርሃዊ ፍላጎትን ገምት።', 'አቅም፡ ተንታኞች × በወር 120 የሚከፈልባቸው ሰዓታት።', 'ቋሚ ወጪዎች (ደመወዝ፣ ቢሮ፣ ሶፍትዌር፣ ኮምፒውቲንግ) እና ተለዋዋጭ ወጪዎች።', 'የሚመጣጠንበት ወርና የቅጥር ውሳኔ።']),
 '''
import numpy as np, pandas as pd
svc = pd.DataFrame({"price": [25000, 60000, 90000, 15000], "hours": [20, 60, 40, 6]},
                   index=["trial design", "full analysis", "training course", "dashboard subscription"])
months = np.arange(1, 25)
demand = pd.DataFrame({"trial design": np.minimum(1 + months // 3, 6), "full analysis": np.minimum(months // 4, 4),
                       "training course": (months % 3 == 0).astype(int), "dashboard subscription": np.minimum(months // 2, 12)}, index=months)
revenue = demand @ svc.price; hours = demand @ svc.hours
analysts = np.maximum(2, np.ceil(hours.values / (120 * 0.9))).astype(int); fixed = 90000 + analysts * 45000; variable = 0.08 * revenue
profit = revenue - fixed - variable; cum = profit.cumsum()
first_profit = int(months[np.argmax(profit.values > 0)]); breakeven = int(months[np.argmax(cum.values > 0)]) if (cum > 0).any() else None
util = hours / (analysts * 120)
print(f"first profitable month {first_profit}; cumulative break-even month {breakeven}")
print(f"month 24: revenue {revenue.iloc[-1]:,.0f}, profit {profit.iloc[-1]:,.0f} birr; analyst utilisation {util.iloc[-1]:.0%}; recurring share {demand.iloc[-1]['dashboard subscription'] * 15000 / revenue.iloc[-1]:.0%}")
hire_month = int(months[np.argmax(analysts > 2)]) if (analysts > 2).any() else None; print("third analyst needed from month", hire_month, "; analysts by month 24:", analysts[-1])
''',
 viz=lambda ns: [line(B('Monthly revenue, costs and cumulative profit (thousand birr)', 'ወርሃዊ ገቢ፣ ወጪዎችና የተጠራቀመ ትርፍ (በሺህ ብር)'), list(ns['months']), [(B('Revenue', 'ገቢ'), list(ns['revenue'] / 1000), 1), (B('Total costs', 'ጠቅላላ ወጪዎች'), list((ns['fixed'] + ns['variable']) / 1000), 2), (B('Cumulative profit', 'የተጠራቀመ ትርፍ'), list(ns['cum'] / 1000), 0)], B('Month', 'ወር'), B('Thousand birr', 'ሺህ ብር'), refs=[{'kind': 'h', 'v': 0, 'label': ''}], rpad=130)],
 analysis=lambda ns: ([f"The company makes a profit from month {ns['first_profit']} and recovers all early losses by month {ns['breakeven']}.", f"Demand needs a third analyst from month {ns['hire_month']} and {ns['analysts'][-1]} analysts by month 24 (utilisation {ns['util'].iloc[-1]:.0%}).", 'Dashboard subscriptions grow into a steady base of recurring income that pays the fixed costs.'],
                      [f"ኩባንያው ከወር {ns['first_profit']} ጀምሮ ትርፍ ያገኛል፣ ሁሉንም የመጀመሪያ ኪሳራዎች በወር {ns['breakeven']} ያስመልሳል።", f"ፍላጎቱ ከወር {ns['hire_month']} ጀምሮ ሦስተኛ ተንታኝ፣ በወር 24 ደግሞ {ns['analysts'][-1]} ተንታኞችን ይፈልጋል (አጠቃቀም {ns['util'].iloc[-1]:.0%})።", 'የdashboard ምዝገባዎች ቋሚ ወጪዎችን የሚከፍል የተደጋጋሚ ገቢ መሠረት ሆነው ያድጋሉ።']),
 decision=lambda ns: (f"Start with 2 analysts and enough cash for {ns['breakeven']} months of losses; push subscriptions first, hire the third analyst around month {ns['hire_month']} and grow to about {ns['analysts'][-1]} by month 24, adding each analyst only after 3 months of bookings confirm the demand.", f"በ2 ተንታኞችና ለ{ns['breakeven']} ወራት ኪሳራ በቂ ገንዘብ ጀምር፤ መጀመሪያ ምዝገባዎችን አስፋፋ፣ ሦስተኛውን ተንታኝ በወር {ns['hire_month']} ገደማ ቅጠር፣ በወር 24 ወደ {ns['analysts'][-1]} ገደማ አሳድግ፤ እያንዳንዱን ተንታኝ የምትጨምረው የ3 ወራት ትዕዛዞች ፍላጎቱን ካረጋገጡ በኋላ ብቻ ነው።"), note=('Illustrative prices and demand; replace them with quotes from your first customers.', 'ለማሳያ ዋጋዎችና ፍላጎት፤ ከመጀመሪያ ደንበኞችህ በሚገኙ ዋጋዎች ተካቸው።')))
emit_labs('s', 7, S7, 6)

S8 = []
S8.append(lab(('Adaptive on-farm trials with Thompson sampling', 'በThompson sampling ተለዋዋጭ በእርሻ ላይ ሙከራዎች'),
 ('Test 5 bean varieties on 60 farms entering one by one: compare equal allocation with Thompson sampling, which sends more farms to varieties that look good, on farmer yield and on finding the best variety.', 'አንድ በአንድ በሚገቡ 60 እርሻዎች ላይ 5 የባቄላ ዝርያዎችን ፈትሽ፡ እኩል ምደባን ጥሩ ወደሚመስሉ ዝርያዎች ብዙ እርሻዎችን ከሚልከው Thompson sampling ጋር በገበሬ ምርትና ምርጡን ዝርያ በማግኘት አወዳድር።'), W,
 [PY, NP, T('A phone form for each farm’s result', 'send results as they come', 'ውጤቶችን እንደደረሱ መላክ', 'KoboToolbox or ODK')],
 (['Define success: yield above the local check on that farm.', 'Equal allocation: 12 farms per variety, in random order.', 'Thompson sampling: for each new farm draw from each variety’s Beta posterior and plant the best draw.', 'Simulate 2,000 seasons: average success rate for farmers and the chance of naming the true best variety.', 'Keep a minimum share per variety so every variety is still tested.'],
  ['ስኬትን ግለጽ፡ በዚያ እርሻ ላይ ከአካባቢያዊ checkኡ በላይ ምርት።', 'እኩል ምደባ፡ በዝርያ 12 እርሻዎች፣ በዘፈቀደ ቅደም ተከተል።', 'Thompson sampling፡ ለእያንዳንዱ አዲስ እርሻ ከእያንዳንዱ ዝርያ Beta posterior አውጣና ምርጡን ዝራ።', '2,000 ወቅቶችን አስመስል፡ ለገበሬዎች አማካይ የስኬት መጠንና እውነተኛውን ምርጥ ዝርያ የመሰየም ዕድል።', 'እያንዳንዱ ዝርያ አሁንም እንዲፈተን በዝርያ ዝቅተኛ ድርሻ አቆይ።']),
 '''
import numpy as np
rng = np.random.default_rng(1); p_true = np.array([0.45, 0.55, 0.60, 0.70, 0.50]); K, F = 5, 60
def season(adaptive):
    a, b = np.ones(K), np.ones(K); wins = 0; count = np.zeros(K)
    order = rng.permutation(np.repeat(np.arange(K), F // K))
    for f in range(F):
        if adaptive:
            v = int(np.argmax(rng.beta(a, b))) if f >= 2 * K else f % K           # first 2 farms each, then Thompson
        else: v = order[f]
        s = rng.random() < p_true[v]; a[v] += s; b[v] += 1 - s; wins += s; count[v] += 1
    return wins / F, int(np.argmax(a / (a + b))) == 3, count
res = {name: [season(ad) for _ in range(2000)] for name, ad in [("equal allocation", False), ("Thompson sampling", True)]}
for k, v in res.items():
    print(f"{k:18s} farmers better than check {np.mean([x[0] for x in v]):.0%}; best variety identified {np.mean([x[1] for x in v]):.0%}; farms per variety {np.mean([x[2] for x in v], 0).round(1)}")
summary = {k: (np.mean([x[0] for x in v]), np.mean([x[1] for x in v])) for k, v in res.items()}; alloc = np.mean([x[2] for x in res["Thompson sampling"]], 0)
''',
 viz=lambda ns: [hbar(B('Outcome over 2,000 simulated seasons', 'በ2,000 የተመሰሉ ወቅቶች ውጤት'), [B('Farmers beating the check', 'checkኡን ያሸነፉ ገበሬዎች'), B('Best variety identified', 'ምርጡ ዝርያ ተለይቷል')], [(B('Equal allocation', 'እኩል ምደባ'), [100 * x for x in ns['summary']['equal allocation']], 2), (B('Thompson sampling', 'Thompson sampling'), [100 * x for x in ns['summary']['Thompson sampling']], 1)], B('Percent', 'መቶኛ'), fmt=0),
                 hbar(B('Average farms per variety with Thompson sampling', 'በThompson sampling በዝርያ አማካይ እርሻዎች'), [f"V{i + 1} (true {p:.0%})" for i, p in enumerate(ns['p_true'])], [(B('Farms', 'እርሻዎች'), list(ns['alloc']), 1)], B('Farms', 'እርሻዎች'), fmt=1)],
 analysis=lambda ns: ([f"With Thompson sampling {ns['summary']['Thompson sampling'][0]:.0%} of participating farmers beat their check, against {ns['summary']['equal allocation'][0]:.0%} with equal allocation.", f"It still names the true best variety (V4) in {ns['summary']['Thompson sampling'][1]:.0%} of seasons vs {ns['summary']['equal allocation'][1]:.0%}.", f"Most farms go to V4 ({ns['alloc'][3]:.0f} on average) while weak varieties get few, so estimates for the weak ones are less precise."],
                      [f"በThompson sampling ከተሳታፊ ገበሬዎች {ns['summary']['Thompson sampling'][0]:.0%} checkቸውን አሸንፈዋል፤ በእኩል ምደባ {ns['summary']['equal allocation'][0]:.0%}።", f"አሁንም እውነተኛውን ምርጥ ዝርያ (V4) በ{ns['summary']['Thompson sampling'][1]:.0%} ወቅቶች ይሰይማል vs {ns['summary']['equal allocation'][1]:.0%}።", f"አብዛኞቹ እርሻዎች ወደ V4 ይሄዳሉ (በአማካይ {ns['alloc'][3]:.0f})፣ ደካማ ዝርያዎች ደግሞ ጥቂት ያገኛሉ፤ ስለዚህ ለደካሞቹ ግምቶች ያነሰ ትክክለኛ ናቸው።"]),
 decision=lambda ns: ('Use Thompson sampling with a 10% minimum per variety for participatory trials where farmer benefit matters; use equal allocation when precise estimates of every variety are needed (official release).', 'የገበሬ ጥቅም አስፈላጊ ለሆነባቸው አሳታፊ ሙከራዎች በዝርያ ከ10% ዝቅተኛ ጋር Thompson samplingን ተጠቀም፤ የእያንዳንዱ ዝርያ ትክክለኛ ግምቶች ሲያስፈልጉ (ኦፊሴላዊ መልቀቅ) እኩል ምደባን ተጠቀም።'), note=SIM))
S8.append(lab(('Trustworthy prediction: conformal intervals', 'ታማኝ ትንበያ፡ conformal intervals'),
 ('Wrap a yield-prediction model with split conformal intervals, check that 90% intervals really cover 90% of new farms, and fix the under-coverage on dry farms.', 'የምርት-ትንበያ ሞዴልን በsplit conformal intervals ጠቅልል፣ 90% ክልሎች በእውነት 90% አዲስ እርሻዎችን እንደሚሸፍኑ ፈትሽ፣ በደረቅ እርሻዎች ላይ ያለውን ዝቅተኛ ሽፋን አስተካክል።'), W,
 [PY, NP, SK, T('MAPIE (optional)', 'conformal prediction in scikit-learn', 'conformal prediction በscikit-learn', 'pip install mapie')],
 (['Split data: train (1,000 farms), calibration (1,000), test (2,000).', 'Fit a random forest on the training set.', 'Calibration residuals → the 90% quantile q; interval = prediction ± q.', 'Check coverage on test farms overall and for dry vs wet farms.', 'Mondrian (group-wise) conformal: separate q for dry and wet farms.'],
  ['ዳታን ክፈል፡ ሥልጠና (1,000 እርሻዎች)፣ calibration (1,000)፣ ፈተና (2,000)።', 'በሥልጠና ስብስቡ ላይ random forest ግጠም።', 'Calibration residuals → 90% quantile q፤ ክልል = ትንበያ ± q።', 'በፈተና እርሻዎች ላይ በአጠቃላይና ለደረቅ vs እርጥብ እርሻዎች ሽፋኑን ፈትሽ።', 'Mondrian (በቡድን) conformal፡ ለደረቅና ለእርጥብ እርሻዎች የተለየ q።']),
 '''
import numpy as np
from sklearn.ensemble import RandomForestRegressor
rng = np.random.default_rng(2)
def farms(n):
    rain = rng.uniform(300, 1100, n); fert = rng.uniform(0, 150, n); dry = rain < 550
    sd = np.where(dry, 0.8, 0.3)                                               # dry farms are much less predictable
    y = 0.5 + 0.003 * rain + 0.008 * fert + rng.normal(0, sd); return np.column_stack([rain, fert]), y, dry
(Xt, yt, _), (Xc, yc, dc), (Xs, ys, ds) = farms(1000), farms(1000), farms(2000)
m = RandomForestRegressor(300, min_samples_leaf=10, random_state=0).fit(Xt, yt)
rc, ps = np.abs(yc - m.predict(Xc)), m.predict(Xs)
q = np.quantile(rc, 0.9 * (1 + 1 / len(rc))); inside = np.abs(ys - ps) <= q
q_g = {g: np.quantile(rc[dc == g], 0.9 * (1 + 1 / (dc == g).sum())) for g in (True, False)}
inside_g = np.abs(ys - ps) <= np.where(ds, q_g[True], q_g[False])
cov = {"standard": (inside.mean(), inside[ds].mean(), inside[~ds].mean()), "group-wise": (inside_g.mean(), inside_g[ds].mean(), inside_g[~ds].mean())}
for k, (a, b, c) in cov.items(): print(f"{k:10s} coverage: all {a:.0%}, dry farms {b:.0%}, wet farms {c:.0%}")
print(f"interval half-width: standard {q:.2f}; group-wise dry {q_g[True]:.2f}, wet {q_g[False]:.2f} t/ha")
''',
 viz=lambda ns: [hbar(B('Coverage of 90% prediction intervals on 2,000 new farms', 'በ2,000 አዲስ እርሻዎች ላይ የ90% prediction intervals ሽፋን'), [B('All farms', 'ሁሉም እርሻዎች'), B('Dry farms', 'ደረቅ እርሻዎች'), B('Wet farms', 'እርጥብ እርሻዎች')], [(B('Standard conformal', 'መደበኛ conformal'), [100 * x for x in ns['cov']['standard']], 2), (B('Group-wise conformal', 'በቡድን conformal'), [100 * x for x in ns['cov']['group-wise']], 1)], B('Percent covered (target 90)', 'የተሸፈነ መቶኛ (ዒላማ 90)'), fmt=0)],
 analysis=lambda ns: ([f"Standard conformal intervals cover {ns['cov']['standard'][0]:.0%} of all new farms, as promised.", f"But they cover only {ns['cov']['standard'][1]:.0%} of dry farms and {ns['cov']['standard'][2]:.0%} of wet ones: one width cannot fit both.", f"Group-wise intervals restore about 90% in each group: ±{ns['q_g'][True]:.2f} t/ha for dry farms, ±{ns['q_g'][False]:.2f} for wet."],
                      [f"መደበኛ conformal ክልሎች ቃል እንደተገባው {ns['cov']['standard'][0]:.0%} አዲስ እርሻዎችን ይሸፍናሉ።", f"ግን ደረቅ እርሻዎችን {ns['cov']['standard'][1]:.0%} ብቻ፣ እርጥቦቹን {ns['cov']['standard'][2]:.0%} ይሸፍናሉ፡ አንድ ስፋት ሁለቱንም ሊገጥም አይችልም።", f"በቡድን ክልሎች በእያንዳንዱ ቡድን ወደ 90% ይመልሳሉ፡ ለደረቅ እርሻዎች ±{ns['q_g'][True]:.2f} t/ha፣ ለእርጥብ ±{ns['q_g'][False]:.2f}።"]),
 decision=lambda ns: ('Give farmers group-wise conformal ranges (wider for dry areas) instead of single numbers, and audit coverage by region and gender of farmer every season.', 'ለገበሬዎች ነጠላ ቁጥሮች ሳይሆን በቡድን conformal ክልሎችን (ለደረቅ አካባቢዎች ሰፋ ያሉ) ስጥ፤ ሽፋኑን በየወቅቱ በክልልና በገበሬ ጾታ ኦዲት አድርግ።'), note=SIM))
S8.append(lab(('Federated learning: training together without sharing data', 'Federated learning፡ ዳታን ሳይጋሩ በአንድ ላይ ማሰልጠን'),
 ('Five regional labs want a disease-risk model but cannot share farm records. Compare local models, federated averaging and a central model trained on pooled data.', 'አምስት የክልል ላብራቶሪዎች የበሽታ-ስጋት ሞዴል ይፈልጋሉ ግን የእርሻ መዝገቦችን ማጋራት አይችሉም። የአካባቢ ሞዴሎችን፣ federated averagingን እና በተሰበሰበ ዳታ የሰለጠነ ማዕከላዊ ሞዴልን አወዳድር።'), W,
 [PY, NP, SK, T('Flower (next step)', 'a real federated-learning framework', 'እውነተኛ የfederated-learning framework', 'flower.ai, pip install flwr')],
 (['Each region has 80–400 records with 6 risk factors and a disease outcome; regions differ a little.', 'Local: each region trains logistic regression on its own data.', 'Federated averaging: each round, regions train a few steps from the shared model and send only weights; the server averages them by sample size.', 'Central: one model on all data pooled (the upper bound).', 'Evaluate every model on each region’s held-out data.'],
  ['እያንዳንዱ ክልል 6 የስጋት ምክንያቶችና የበሽታ ውጤት ያላቸው 80–400 መዝገቦች አሉት፤ ክልሎች በትንሹ ይለያያሉ።', 'አካባቢያዊ፡ እያንዳንዱ ክልል logistic regressionን በራሱ ዳታ ያሰለጥናል።', 'Federated averaging፡ በእያንዳንዱ ዙር ክልሎች ከጋራ ሞዴሉ ጥቂት እርምጃዎችን ያሰለጥናሉ፣ weights ብቻ ይልካሉ፤ ሰርቨሩ በናሙና መጠን አማካይ ያደርጋቸዋል።', 'ማዕከላዊ፡ በተሰበሰበ ዳታ ሁሉ ላይ አንድ ሞዴል (የላይኛው ገደብ)።', 'እያንዳንዱን ሞዴል በእያንዳንዱ ክልል በተለየ ዳታ ላይ ገምግም።']),
 '''
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score
rng = np.random.default_rng(3); w_true = np.array([1.2, -0.8, 0.6, 0.0, 0.9, -0.5])
sizes = [80, 120, 200, 300, 400]; regions = []
for n in sizes:
    shift = rng.normal(0, 0.2, 6); X = rng.normal(0, 1, (n + 300, 6))
    y = rng.random(n + 300) < 1 / (1 + np.exp(-(X @ (w_true + shift) - 0.3)))
    regions.append((X[:n], y[:n], X[n:], y[n:]))
sig = lambda z: 1 / (1 + np.exp(-z))
def local_steps(w, X, y, steps=20, lr=0.1):
    Xb = np.column_stack([np.ones(len(X)), X])
    for _ in range(steps): w = w - lr * Xb.T @ (sig(Xb @ w) - y) / len(y)
    return w
w = np.zeros(7)
for rnd in range(60):                                                          # FedAvg: only weights travel
    w = np.average([local_steps(w.copy(), X, y) for X, y, _, _ in regions], axis=0, weights=sizes)
auc = {"local only": [], "federated": [], "central (pooled)": []}
central = LogisticRegression().fit(np.vstack([r[0] for r in regions]), np.concatenate([r[1] for r in regions]))
for X, y, Xt, yt in regions:
    auc["local only"].append(roc_auc_score(yt, LogisticRegression().fit(X, y).decision_function(Xt)))
    auc["federated"].append(roc_auc_score(yt, np.column_stack([np.ones(len(Xt)), Xt]) @ w))
    auc["central (pooled)"].append(roc_auc_score(yt, central.decision_function(Xt)))
for k, v in auc.items(): print(f"{k:17s} AUC by region {np.round(v, 3)}; mean {np.mean(v):.3f}")
''',
 viz=lambda ns: [hbar(B('Model quality (AUC) on each region’s held-out farms', 'በእያንዳንዱ ክልል በተለዩ እርሻዎች ላይ የሞዴል ጥራት (AUC)'), [B(f'Region {i + 1} (n={n})', f'ክልል {i + 1} (n={n})') for i, n in enumerate(ns['sizes'])], [(B(k, k), v, i) for i, (k, v) in enumerate(ns['auc'].items())], 'AUC', fmt=3)],
 analysis=lambda ns: ([f"Small regions suffer most alone: region 1 (80 records) reaches AUC {ns['auc']['local only'][0]:.3f} with its own data and {ns['auc']['federated'][0]:.3f} with the federated model.", f"Federated learning averages {np.mean(ns['auc']['federated']):.3f}, almost the same as pooling all data ({np.mean(ns['auc']['central (pooled)']):.3f}).", 'No farm record left its region: only model weights were exchanged.'],
                      [f"ትናንሽ ክልሎች ብቻቸውን በብዛት ይጎዳሉ፡ ክልል 1 (80 መዝገቦች) በራሱ ዳታ AUC {ns['auc']['local only'][0]:.3f}፣ በfederated ሞዴሉ {ns['auc']['federated'][0]:.3f} ይደርሳል።", f"Federated learning በአማካይ {np.mean(ns['auc']['federated']):.3f} ያገኛል፣ ሁሉንም ዳታ ከመሰብሰብ ({np.mean(ns['auc']['central (pooled)']):.3f}) ጋር ከሞላ ጎደል እኩል።", 'ምንም የእርሻ መዝገብ ክልሉን አልለቀቀም፡ የተለዋወጡት የሞዴል weights ብቻ ናቸው።']),
 decision=lambda ns: ('Build the national model by federated learning under a data-sharing agreement that keeps records in each region; add secure aggregation so even the weights of one region cannot be inspected.', 'ብሔራዊ ሞዴሉን መዝገቦችን በእያንዳንዱ ክልል በሚያቆይ የዳታ-ማጋራት ስምምነት ሥር በfederated learning ገንባ፤ የአንድ ክልል weights እንኳን እንዳይመረመሩ secure aggregation ጨምር።'), note=SIM))
S8.append(lab(('Early warning from soil sensors: EWMA and CUSUM', 'ከአፈር sensors ቅድመ ማስጠንቀቂያ፡ EWMA እና CUSUM'),
 ('Monitor hourly soil-moisture readings from a field sensor, detect a slow sensor drift and a sudden irrigation failure, and tune the alarm to balance speed against false alarms.', 'ከመስክ sensor በየሰዓቱ የሚመጡ የአፈር-እርጥበት ንባቦችን ተከታተል፣ ቀርፋፋ የsensor driftን እና ድንገተኛ የመስኖ ውድቀትን ለይ፣ ፍጥነትን ከሐሰት ማንቂያዎች ጋር ለማመጣጠን ማንቂያውን አስተካክል።'), W,
 [PY, NP, T('Soil-moisture sensor + microcontroller (ESP32)', 'collect readings and send by GSM/LoRa', 'ንባቦችን መሰብሰብና በGSM/LoRa መላክ', 'electronics suppliers')],
 (['Learn normal behaviour from 7 days: mean and SD of the hourly change after removing the daily cycle.', 'EWMA chart: smoothed residual; alarm outside ±L standard errors.', 'CUSUM chart: accumulates small deviations; alarm above h.', 'Test on a series with a drift from day 10 and a failure on day 16.', 'Count detection delay and false alarms per month for several thresholds.'],
  ['ከ7 ቀናት መደበኛ ባሕሪን ተማር፡ የዕለት ዑደቱን ካስወገድክ በኋላ የሰዓት ለውጥ አማካይና SD።', 'የEWMA ቻርት፡ የለሰለሰ residual፤ ከ±L standard errors ውጭ ማንቂያ።', 'የCUSUM ቻርት፡ ትናንሽ ልዩነቶችን ያጠራቅማል፤ ከh በላይ ማንቂያ።', 'ከቀን 10 drift እና በቀን 16 ውድቀት ባለው ተከታታይ ላይ ፈትሽ።', 'ለበርካታ ወሰኖች የመለየት መዘግየትንና በወር የሐሰት ማንቂያዎችን ቁጠር።']),
 '''
import numpy as np
rng = np.random.default_rng(8); hours = np.arange(24 * 20)
cycle = 1.5 * np.sin(2 * np.pi * hours / 24)
x = 32 + cycle + rng.normal(0, 0.5, hours.size)
x[hours >= 24 * 10] += 0.02 * (hours[hours >= 24 * 10] - 24 * 10)                  # sensor drift from day 10
x[hours >= 24 * 16] -= 6                                                            # irrigation failure on day 16
resid = x - (32 + cycle); mu, sd = resid[:24 * 7].mean(), resid[:24 * 7].std()
lam_, L = 0.1, 3.0
ewma = np.zeros_like(resid); s = mu
for i, r in enumerate(resid): s = lam_ * r + (1 - lam_) * s; ewma[i] = s
lim = L * sd * np.sqrt(lam_ / (2 - lam_)); alarm_e = np.where(np.abs(ewma - mu) > lim)[0]
k, h = 0.5 * sd, 5 * sd; cp, cn = 0.0, 0.0; alarm_c = []
for i, r in enumerate(resid):
    cp = max(0, cp + r - mu - k); cn = max(0, cn - (r - mu) - k)
    if cp > h or cn > h: alarm_c.append(i); cp = cn = 0
first = lambda arr, start: next((int(a) for a in arr if a >= start), None)
for name, arr in [("EWMA", alarm_e), ("CUSUM", np.array(alarm_c))]:
    false_ = int(np.sum(np.asarray(arr) < 24 * 10)); d1 = first(arr, 24 * 10)
    print(f"{name}: false alarms in days 1-10: {false_}; drift detected after {f'{(d1 - 240) / 24:.1f}' if d1 is not None else 'never'} days; alarm active at the failure within {first(arr, 24 * 16) - 384 if first(arr, 24 * 16) is not None else 'never'} h")
delay_drift = {"EWMA": (first(alarm_e, 240) - 240) / 24, "CUSUM": (first(alarm_c, 240) - 240) / 24}
''',
 viz=lambda ns: [line(B('Soil moisture (%), hourly over 20 days', 'የአፈር እርጥበት (%)፣ በ20 ቀናት በየሰዓቱ'), [round(h / 24, 2) for h in ns['hours'][::3]], [(B('Reading', 'ንባብ'), list(ns['x'][::3]), 1)], B('Day', 'ቀን'), '%', xint=False, markers=False, refs=[{'kind': 'v', 'v': 10, 'label': B('drift starts', 'drift ይጀምራል')}, {'kind': 'v', 'v': 16, 'label': B('failure', 'ውድቀት')}]),
                 line(B('EWMA of the de-seasonalised reading, with control limits', 'የዕለት ዑደት የተወገደለት ንባብ EWMA፣ ከቁጥጥር ገደቦች ጋር'), [round(h / 24, 2) for h in ns['hours'][::3]], [('EWMA', list(ns['ewma'][::3]), 2)], B('Day', 'ቀን'), B('Deviation (%)', 'ልዩነት (%)'), xint=False, markers=False, refs=[{'kind': 'h', 'v': float(ns['mu'] + ns['lim']), 'label': B('upper limit', 'የላይኛው ገደብ')}, {'kind': 'h', 'v': float(ns['mu'] - ns['lim']), 'label': B('lower limit', 'የታችኛው ገደብ')}])],
 analysis=lambda ns: ([f"The slow drift is invisible on the raw chart but the EWMA flags it after {ns['delay_drift']['EWMA']:.1f} days and CUSUM after {ns['delay_drift']['CUSUM']:.1f} days.", 'The irrigation failure is caught within hours by both.', 'Removing the daily cycle first is essential: otherwise every afternoon would raise an alarm.'],
                      [f"ቀርፋፋው drift በጥሬው ቻርት ላይ አይታይም፤ EWMA ግን ከ{ns['delay_drift']['EWMA']:.1f} ቀናት በኋላ፣ CUSUM ከ{ns['delay_drift']['CUSUM']:.1f} ቀናት በኋላ ምልክት ያደርጉበታል።", 'የመስኖ ውድቀቱ በሁለቱም በሰዓታት ውስጥ ይያዛል።', 'መጀመሪያ የዕለት ዑደቱን ማስወገድ አስፈላጊ ነው፡ አለበለዚያ እያንዳንዱ ከሰዓት በኋላ ማንቂያ ያስነሳ ነበር።']),
 decision=lambda ns: ('Run both: CUSUM for slow sensor drift (send a "recalibrate" message) and a simple threshold on hourly change for sudden failures (send an SMS to the farmer immediately).', 'ሁለቱንም አስኪድ፡ CUSUM ለቀርፋፋ የsensor drift («እንደገና አስተካክል» መልእክት ላክ) እና ለድንገተኛ ውድቀቶች በሰዓት ለውጥ ላይ ቀላል ወሰን (ለገበሬው ወዲያውኑ SMS ላክ)።'), note=SIM))
S8.append(lab(('Causal AI: who benefits most from advice?', 'Causal AI፡ ከምክር በብዛት የሚጠቀመው ማን ነው?'),
 ('Use a randomised trial of SMS agronomy advice to estimate how the benefit varies between farmers (uplift modelling), and decide whom to target when budget covers only 40% of farmers.', 'የSMS የአግሮኖሚ ምክር በዘፈቀደ የተመደበ ሙከራን ተጠቅመህ ጥቅሙ በገበሬዎች መካከል እንዴት እንደሚለያይ ገምት (uplift modelling)፣ በጀቱ 40% ገበሬዎችን ብቻ ሲሸፍን ማንን እንደምታነጣጥር ወስን።'), W,
 [PY, NP, SK, T('EconML or CausalML (next step)', 'causal forests and meta-learners', 'causal forests እና meta-learners', 'pip install econml causalml')],
 (['Randomise 4,000 farmers: half get advice, half do not; record yield change.', 'T-learner: fit one model for treated and one for control; uplift = difference of predictions.', 'Rank farmers by predicted uplift on held-out data.', 'Compare the average gain if you target the top 40% by uplift, at random, or by farm size.', 'Check that the ranking is real: observed treated−control gap in each uplift quintile.'],
  ['4,000 ገበሬዎችን በዘፈቀደ መድብ፡ ግማሹ ምክር ያገኛሉ፣ ግማሹ አያገኙም፤ የምርት ለውጥን መዝግብ።', 'T-learner፡ ለታከሙት አንድ ሞዴልና ለcontrol አንድ ሞዴል ግጠም፤ uplift = የትንበያዎች ልዩነት።', 'ገበሬዎችን በተለየ ዳታ ላይ በተተነበየ uplift ደርድር።', 'ከፍተኛዎቹን 40% በuplift፣ በዘፈቀደ ወይም በእርሻ መጠን ብታነጣጥር አማካይ ትርፉን አወዳድር።', 'ደረጃው እውነተኛ መሆኑን ፈትሽ፡ በእያንዳንዱ የuplift quintile የታየ treated−control ክፍተት።']),
 '''
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
rng = np.random.default_rng(4); n = 4000
size = rng.gamma(2, 0.6, n); literacy = rng.random(n) < 0.55; distance = rng.uniform(0, 20, n)
X = np.column_stack([size, literacy, distance]); T = rng.random(n) < 0.5
effect = 0.05 + 0.25 * literacy + 0.015 * (20 - distance) - 0.03 * size               # SMS helps literate farmers near markets
y = 0.4 * size + effect * T + rng.normal(0, 0.35, n)
tr, te = np.arange(n) < 2500, np.arange(n) >= 2500
gb = lambda: GradientBoostingRegressor(n_estimators=200, max_depth=3, random_state=0)
m1, m0 = gb().fit(X[tr & T], y[tr & T]), gb().fit(X[tr & ~T], y[tr & ~T])
uplift = m1.predict(X[te]) - m0.predict(X[te]); true_eff = effect[te]
k = int(0.4 * te.sum())
gain = {"top 40% by uplift": true_eff[np.argsort(-uplift)[:k]].mean(), "random 40%": true_eff.mean(), "largest 40% of farms": true_eff[np.argsort(-size[te])[:k]].mean()}
for g, v in gain.items(): print(f"{g:22s} average gain {v:.3f} t/ha per farmer")
q = np.quantile(uplift, [0.2, 0.4, 0.6, 0.8]); grp = np.digitize(uplift, q); Tt, yt = T[te], y[te]
observed = [yt[(grp == g) & Tt].mean() - yt[(grp == g) & ~Tt].mean() for g in range(5)]
print("observed effect by predicted-uplift quintile (low to high):", np.round(observed, 3))
''',
 viz=lambda ns: [hbar(B('Average yield gain per targeted farmer (t/ha)', 'በታለመ ገበሬ አማካይ የምርት ትርፍ (t/ha)'), list(ns['gain']), [(B('t/ha', 't/ha'), list(ns['gain'].values()), 1)], 't/ha', fmt=3),
                 line(B('Observed effect in the trial by predicted-uplift group', 'በተተነበየ-uplift ቡድን በሙከራው ውስጥ የታየ ውጤት'), [1, 2, 3, 4, 5], [(B('Treated − control (t/ha)', 'የታከሙ − control (t/ha)'), [float(v) for v in ns['observed']], 1)], B('Uplift quintile (1 = lowest)', 'Uplift quintile (1 = ዝቅተኛ)'), 't/ha')],
 analysis=lambda ns: ([f"Targeting the 40% with the highest predicted uplift gives {ns['gain']['top 40% by uplift']:.3f} t/ha per farmer, against {ns['gain']['random 40%']:.3f} at random.", f"Targeting the largest farms gives only {ns['gain']['largest 40% of farms']:.3f}: the farmers who benefit most are not the obvious ones.", 'The observed treated−control gap rises across predicted-uplift groups, so the model’s ranking holds in the randomised data.'],
                      [f"ከፍተኛ የተተነበየ uplift ያላቸውን 40% ማነጣጠር በገበሬ {ns['gain']['top 40% by uplift']:.3f} t/ha ይሰጣል፤ በዘፈቀደ {ns['gain']['random 40%']:.3f}።", f"ትላልቆቹን እርሻዎች ማነጣጠር {ns['gain']['largest 40% of farms']:.3f} ብቻ ይሰጣል፡ በብዛት የሚጠቀሙት ገበሬዎች ግልጽ የሆኑት አይደሉም።", 'የታየው የታከሙ−control ክፍተት በተተነበየ-uplift ቡድኖች ላይ ይጨምራል፤ ስለዚህ የሞዴሉ ደረጃ በዘፈቀደ ዳታው ውስጥ ይዘልቃል።']),
 decision=lambda ns: ('Send SMS advice to the 40% with the highest predicted uplift, offer voice messages to farmers who cannot read, and keep a small random control group every season to re-check the targeting.', 'የSMS ምክርን ከፍተኛ የተተነበየ uplift ላላቸው 40% ላክ፣ ማንበብ ለማይችሉ ገበሬዎች የድምፅ መልእክቶችን አቅርብ፣ ማነጣጠሩን እንደገና ለመፈተሽ በየወቅቱ ትንሽ የዘፈቀደ control ቡድን አቆይ።'), note=SIM))
emit_labs('s', 8, S8, 5)
print('labs s6-s8 written')
