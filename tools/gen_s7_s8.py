from lib import *
from qgviz import *
from scipy import stats
rng = np.random.default_rng(707)

# ===================== S7 =====================
sc = pd.DataFrame({'scenario': ['Phenotypic selection on own weight', 'BLUP with relatives (records + pedigree)', 'Genomic selection on young rams'],
                   'intensity_i': [1.40, 1.40, 1.75], 'accuracy_r': [0.45, 0.65, 0.60], 'generation_interval_yr': [3.5, 3.5, 2.0],
                   'extra_cost_birr_per_year': [0, 60000, 450000]})
save_csv(sc, 's7_breeding_scenarios.csv')
ex71 = example('s7-gain',
 {'en': 'Which breeding strategy gives the most genetic gain per year, and does it pay?', 'am': 'የትኛው የዝርያ ማሻሻያ ስትራቴጂ በዓመት ከፍተኛ የዘረመል ትርፍ ይሰጣል? ያዋጣልስ?'},
 {'en': 'A sheep breeding cooperative (6-month weight: phenotypic SD 3.5 kg, h² 0.25) sells 8,000 lambs a year at 120 birr per kg live weight. Three strategies differ in selection intensity, accuracy, generation interval and cost.', 'am': 'የበግ ዝርያ ማሻሻያ ማኅበር (የ6 ወር ክብደት፡ phenotypic SD 3.5 kg፣ h² 0.25) በዓመት 8,000 ጠቦቶችን በኪሎ የቁም ክብደት 120 ብር ይሸጣል። ሦስት ስትራቴጂዎች በምርጫ መጠን፣ በትክክለኛነት፣ በትውልድ ልዩነትና በወጪ ይለያያሉ።'},
 {'en': 'Breeder’s equation ΔG/year = i · r · σA / L, turned into money and compared with cost', 'am': 'የBreeder እኩልታ ΔG/ዓመት = i · r · σA / L፣ ወደ ገንዘብ ተቀይሮ ከወጪ ጋር የተወዳደረ'},
 's7_breeding_scenarios.csv',
 '''
import pandas as pd, numpy as np
d = pd.read_csv("s7_breeding_scenarios.csv")
sd_p, h2, lambs, price = 3.5, 0.25, 8000, 120
sd_a = np.sqrt(h2) * sd_p
d["gain_kg_per_yr"] = d.intensity_i * d.accuracy_r * sd_a / d.generation_interval_yr   # breeder's equation
d["value_of_1yr_gain"] = d.gain_kg_per_yr * lambs * price      # extra revenue per year from ONE year of gain
pd.set_option("display.width", 120)
print(d[["scenario", "gain_kg_per_yr", "value_of_1yr_gain", "extra_cost_birr_per_year"]].round(2).to_string(index=False))
# Gains are permanent and add up: in year t the lambs carry t years of gain.
# Assumptions: no time lag before gain reaches lambs sold, no discounting (NPV is covered in the module).
years = np.arange(1, 11)
cum = {r.scenario: np.cumsum(years * r.value_of_1yr_gain - r.extra_cost_birr_per_year) for r in d.itertuples()}
print("\\nCumulative net benefit (million birr):")
for name, c in cum.items():
    print(f"  {name:42s} year 1: {c[0]/1e6:5.2f}   year 5: {c[4]/1e6:5.2f}   year 10: {c[9]/1e6:6.2f}")
''',
 '''
d <- read.csv("s7_breeding_scenarios.csv")
sd_a <- sqrt(0.25) * 3.5
d$gain <- with(d, intensity_i * accuracy_r * sd_a / generation_interval_yr)
d$value <- d$gain * 8000 * 120
cum <- sapply(seq_len(nrow(d)), function(i) cumsum((1:10) * d$value[i] - d$extra_cost_birr_per_year[i]))
colnames(cum) <- d$scenario; round(cum / 1e6, 2)
# whole-programme stochastic simulation: AlphaSimR
''', None, None)
ns71 = ex71['_ns']; cum71 = ns71['cum']; g71 = ns71['d'].set_index('scenario').gain_kg_per_yr
bestg = g71.idxmax(); bestn = max(cum71, key=lambda k: cum71[k][-1]); second = sorted(cum71, key=lambda k: -cum71[k][-1])[1]
ex71['read'] = {'en': ['ΔG per year = i × r × σA / L: it rises with selection intensity (i) and accuracy (r), and falls with the generation interval (L). Here σA = √0.25 × 3.5 = 1.75 kg.',
                       f'{bestg} gives the most gain ({g71.max():.2f} kg per year), because it shortens L from 3.5 to 2 years and allows a higher intensity (i = 1.75 vs 1.40), even though its accuracy (0.60) is lower than BLUP (0.65).',
                       f'Because each year of gain stays in the flock, benefits grow every year while costs stay flat. After 10 years the cumulative net benefit is highest for {bestn} ({cum71[bestn][-1]/1e6:.1f} million birr) versus {cum71[second][-1]/1e6:.1f} million for {second}.'],
                'am': ['ΔG በዓመት = i × r × σA / L፡ በምርጫ መጠን (i) እና በትክክለኛነት (r) ይጨምራል፣ በትውልድ ልዩነት (L) ይቀንሳል። እዚህ σA = √0.25 × 3.5 = 1.75 kg ነው።',
                       f'{bestg} ከፍተኛውን ትርፍ ይሰጣል (በዓመት {g71.max():.2f} kg)፤ Lን ከ3.5 ወደ 2 ዓመት ስለሚያሳጥርና ከፍተኛ የምርጫ መጠን (i = 1.75 vs 1.40) ስለሚፈቅድ ነው፤ ምንም እንኳ ትክክለኛነቱ (0.60) ከBLUP (0.65) ያነሰ ቢሆንም።',
                       f'እያንዳንዱ ዓመት ትርፍ በመንጋው ውስጥ ስለሚቆይ ጥቅሞች በየዓመቱ ያድጋሉ፣ ወጪዎች ግን አይለወጡም። ከ10 ዓመት በኋላ ድምር የተጣራ ጥቅም ለ{bestn} ከፍተኛ ነው ({cum71[bestn][-1]/1e6:.1f} ሚሊዮን ብር)፤ ለ{second} ደግሞ {cum71[second][-1]/1e6:.1f} ሚሊዮን።']}
ex71['decide'] = {'en': f'Choose {bestn}: it pays back its extra cost from the first year and leads by a wide margin after 10 years. Secure genotyping funds for at least 10 years and keep recording weights, because genomic predictions need a phenotyped training flock.',
                  'am': f'{bestn}ን ምረጡ፡ ተጨማሪ ወጪውን ከመጀመሪያው ዓመት ጀምሮ ይመልሳል፣ ከ10 ዓመት በኋላም በሰፊ ልዩነት ይመራል። የgenotyping ገንዘብ ቢያንስ ለ10 ዓመታት አረጋግጡ፤ ክብደትንም መመዝገብ ቀጥሉ፤ ጂኖሚክ ትንበያዎች phenotype የተደረገ የሥልጠና መንጋ ይፈልጋሉና።'}
ex71['biz'] = {'en': 'Breeding-programme design and evaluation is a high-value consulting service for cooperatives, ranches and investors.', 'am': 'የዝርያ ማሻሻያ ፕሮግራም ንድፍና ግምገማ ለማኅበራት፣ ለራንቾችና ለባለሀብቶች ከፍተኛ ዋጋ ያለው የማማከር አገልግሎት ነው።'}

vc = pd.DataFrame({'component': ['genotype', 'genotype_x_location', 'genotype_x_year', 'genotype_x_location_x_year', 'plot_error'], 'variance': [0.080, 0.040, 0.030, 0.050, 0.100]})
save_csv(vc, 's7_variance_components.csv')
ex72 = example('s7-allocation',
 {'en': 'How many locations, years and replicates give the most reliable variety ranking for the money?', 'am': 'ለገንዘቡ በጣም አስተማማኝ የዝርያ ደረጃ የሚሰጡት ስንት ቦታዎች፣ ዓመታትና ድግግሞሾች ናቸው?'},
 {'en': 'Variance components from past teff METs; each plot costs 400 birr; the budget is 30,000 birr per entry over the testing cycle.', 'am': 'ከያለፉት የጤፍ METs የተገኙ variance components፤ እያንዳንዱ ማሳ 400 ብር ያስወጣል፤ በፍተሻ ዑደቱ በአንድ ዝርያ በጀቱ 30,000 ብር ነው።'},
 {'en': 'Optimal resource allocation → heritability of the entry mean H² = σ²G / (σ²G + σ²GL/l + σ²GY/y + σ²GLY/(l·y) + σ²e/(l·y·r)) under a budget', 'am': 'ምርጥ የሀብት ድልድል → የዝርያ አማካይ heritability H² = σ²G / (σ²G + σ²GL/l + σ²GY/y + σ²GLY/(l·y) + σ²e/(l·y·r)) በበጀት ውስጥ'},
 's7_variance_components.csv',
 '''
import pandas as pd, itertools
v = pd.read_csv("s7_variance_components.csv").set_index("component").variance
cost_plot, budget = 400, 30000
rows = []
for l, y, r in itertools.product(range(1, 13), range(1, 4), range(1, 5)):
    plots = l * y * r
    if plots * cost_plot > budget: continue
    H2 = v.genotype / (v.genotype + v.genotype_x_location / l + v.genotype_x_year / y
                       + v.genotype_x_location_x_year / (l * y) + v.plot_error / (l * y * r))
    rows.append((l, y, r, plots, plots * cost_plot, H2))
t = pd.DataFrame(rows, columns=["locations", "years", "reps", "plots", "cost_birr", "H2"]).sort_values("H2", ascending=False)
print("Best designs within budget:"); print(t.head(5).round(3).to_string(index=False))
print("\\nCommon practice (3 locations x 1 year x 3 reps):")
print(t[(t.locations == 3) & (t.years == 1) & (t.reps == 3)].round(3).to_string(index=False))
''',
 '''
v <- setNames(read.csv("s7_variance_components.csv")$variance, read.csv("s7_variance_components.csv")$component)
g <- expand.grid(l = 1:12, y = 1:3, r = 1:4); g <- g[g$l * g$y * g$r * 400 <= 30000, ]
g$H2 <- with(g, v["genotype"] / (v["genotype"] + v["genotype_x_location"]/l + v["genotype_x_year"]/y +
              v["genotype_x_location_x_year"]/(l*y) + v["plot_error"]/(l*y*r)))
head(g[order(-g$H2), ])
''', None, None)
v_ = vc.set_index('component').variance; best = None
for l in range(1, 13):
    for y in range(1, 4):
        for r in range(1, 5):
            if l * y * r * 400 > 30000: continue
            H = v_.genotype / (v_.genotype + v_.genotype_x_location / l + v_.genotype_x_year / y + v_.genotype_x_location_x_year / (l * y) + v_.plot_error / (l * y * r))
            if best is None or H > best[3]: best = (l, y, r, H)
Hc = v_.genotype / (v_.genotype + v_.genotype_x_location / 3 + v_.genotype_x_year / 1 + v_.genotype_x_location_x_year / 3 + v_.plot_error / 9)
ex72['read'] = {'en': ['Replicates only shrink plot error; locations and years shrink the G × E terms, which are larger here.',
                       f'The best design spends the budget on {best[0]} locations × {best[1]} years × {best[2]} replicate(s), H² = {best[3]:.2f}.',
                       f'The common "3 locations × 1 year × 3 reps" gives H² = {Hc:.2f}: replicates are a weak use of money when G × E is large.'],
                'am': ['ድግግሞሾች የማሳ ስህተትን ብቻ ይቀንሳሉ፤ ቦታዎችና ዓመታት እዚህ ትልቅ የሆኑትን የG × E ክፍሎች ይቀንሳሉ።',
                       f'ምርጡ ንድፍ በጀቱን በ{best[0]} ቦታዎች × {best[1]} ዓመታት × {best[2]} ድግግሞሽ ላይ ያውላል፤ H² = {best[3]:.2f}።',
                       f'የተለመደው «3 ቦታዎች × 1 ዓመት × 3 ድግግሞሾች» H² = {Hc:.2f} ይሰጣል፡ G × E ትልቅ ሲሆን ድግግሞሾች ደካማ የገንዘብ አጠቃቀም ናቸው።']}
ex72['decide'] = {'en': 'Test in more locations with fewer replicates (even one replicate per site in an augmented or p-rep design), and spread testing over at least two years.', 'am': 'በጥቂት ድግግሞሾች በብዙ ቦታዎች ፈትኑ (በaugmented ወይም p-rep ንድፍ በአንድ ቦታ አንድ ድግግሞሽም ቢሆን)፤ ፍተሻውን ቢያንስ በሁለት ዓመታት አሰራጩ።'}
ex72['biz'] = {'en': 'Seed companies save millions by optimising trial networks; this analysis is the product.', 'am': 'የዘር ኩባንያዎች የሙከራ ኔትወርኮቻቸውን በማመቻቸት በሚሊዮኖች ይቆጥባሉ፤ ይህ ትንተና ራሱ ምርቱ ነው።'}

tr = pd.DataFrame({'trait': ['milk_kg_per_lactation', 'fat_percent', 'calving_interval_days'], 'sd_phenotypic': [450.0, 0.45, 40.0], 'heritability': [0.30, 0.45, 0.05], 'economic_value_birr_per_unit': [25.0, 3000.0, -500.0]})
save_csv(tr, 's7_selection_index.csv')
ex73 = example('s7-index',
 {'en': 'How should a dairy breeder weigh milk, fat and fertility when choosing bulls?', 'am': 'የወተት ዝርያ አሻሻይ ኮርማዎችን ሲመርጥ ወተትን፣ ስብንና የመራባት አቅምን እንዴት ማመዛዘን አለበት?'},
 {'en': 'Three traits with their variation, heritability and economic value per unit (longer calving interval loses money). Phenotypic and genetic correlations are given in the code.', 'am': 'ሦስት ባሕሪያት ከልዩነታቸው፣ ከheritabilityያቸውና በአንድ መለኪያ ካላቸው የኢኮኖሚ ዋጋ ጋር (ረዥም የመውለጃ ልዩነት ገንዘብ ያሳጣል)። የphenotypic እና የዘረመል ተዛምዶዎች በኮዱ ውስጥ ተሰጥተዋል።'},
 {'en': 'Smith–Hazel selection index: b = P⁻¹ G a; accuracy and expected response in each trait, vs selecting on milk alone', 'am': 'የSmith–Hazel selection index፡ b = P⁻¹ G a፤ ትክክለኛነትና በእያንዳንዱ ባሕሪ የሚጠበቅ ምላሽ፣ በወተት ብቻ ከመምረጥ ጋር ሲነጻጸር'},
 's7_selection_index.csv',
 '''
import pandas as pd, numpy as np
t = pd.read_csv("s7_selection_index.csv")
sp, h2, a = t.sd_phenotypic.values, t.heritability.values, t.economic_value_birr_per_unit.values
sg = np.sqrt(h2) * sp
rp = np.array([[1, -0.30, 0.10], [-0.30, 1, 0.00], [0.10, 0.00, 1]])   # phenotypic correlations
rg = np.array([[1, -0.40, 0.35], [-0.40, 1, 0.00], [0.35, 0.00, 1]])   # genetic correlations (milk worsens fertility)
P = rp * np.outer(sp, sp); G = rg * np.outer(sg, sg)
i = 1.75                                                              # top ~10% selected
def evaluate(b, label):
    sd_I = np.sqrt(b @ P @ b); resp = i * (G @ b) / sd_I             # response in each trait
    value = resp @ a; acc = (b @ G @ a) / (sd_I * np.sqrt(a @ G @ a))   # correlation of index with true merit
    print(f"{label}: accuracy {acc:.2f}, value per generation {value:,.0f} birr/cow")
    for name, r_ in zip(t.trait, resp): print(f"    {name:24s} {r_:+.3f}")
    return value, resp
b_index = np.linalg.solve(P, G @ a)
print("Index weights b:", {k: round(float(v), 3) for k, v in zip(t.trait, b_index)})
v_idx, r_idx = evaluate(b_index, "Selection index")
v_milk, r_milk = evaluate(np.array([1.0, 0, 0]), "Milk only      ")
print(f"Index advantage: {100 * (v_idx / v_milk - 1):.1f}% more value per generation")
''',
 '''
t <- read.csv("s7_selection_index.csv")
sp <- t$sd_phenotypic; sg <- sqrt(t$heritability) * sp; a <- t$economic_value_birr_per_unit
rp <- matrix(c(1,-.3,.1, -.3,1,0, .1,0,1), 3); rg <- matrix(c(1,-.4,.35, -.4,1,0, .35,0,1), 3)
P <- rp * outer(sp, sp); G <- rg * outer(sg, sg)
b <- solve(P, G %*% a); b
resp <- 1.75 * G %*% b / sqrt(t(b) %*% P %*% b); resp; sum(resp * a)
''', None, None)
import re as _re
_o = ex73['out']; _adv = _re.search(r'advantage: ([0-9.]+)%', _o).group(1)
_ci = [c.lstrip('+') for c in _re.findall(r'calving_interval_days\s+([+-][0-9.]+)', _o)]
ex73['read'] = {'en': ['The index puts a price on every trait and lets correlations work for the breeder.',
                       f'Selecting on milk alone lengthens the calving interval by {_ci[1]} days per generation (the genetic correlation is unfavourable); the index holds it to {_ci[0]} days while milk gain is almost the same.',
                       f'The index earns {_adv}% more value per generation. Milk still dominates because it has the largest genetic variation times price; fat falls slightly in both because of its negative correlation with milk.'],
                'am': ['index ለእያንዳንዱ ባሕሪ ዋጋ ያስቀምጣል፤ ተዛምዶዎች ለአሻሻዩ እንዲሠሩ ያደርጋል።',
                       f'በወተት ብቻ መምረጥ የመውለጃ ልዩነቱን በትውልድ በ{_ci[1]} ቀናት ያረዝማል (የዘረመል ተዛምዶው የማይመች ነው)፤ index ደግሞ የወተት ትርፉ ተመሳሳይ ሆኖ ወደ {_ci[0]} ቀናት ይገድበዋል።',
                       f'index በትውልድ {_adv}% ተጨማሪ ዋጋ ያስገኛል። የዘረመል ልዩነቱ ከዋጋው ጋር ሲባዛ ትልቁ ስለሆነ ወተት አሁንም ይበልጣል፤ ስብ ከወተት ጋር አሉታዊ ተዛምዶ ስላለው በሁለቱም በትንሹ ይቀንሳል።']}
ex73['decide'] = {'en': 'Rank bulls on the economic index, not on milk alone; update economic values when prices change.', 'am': 'ኮርማዎችን በወተት ብቻ ሳይሆን በኢኮኖሚ index ደርድሩ፤ ዋጋዎች ሲለወጡ የኢኮኖሚ ዋጋዎቹን አድሱ።'}
ex73['biz'] = {'en': 'Bull-ranking and semen-catalogue services built on economic indices are sold by AI centres and breed societies.', 'am': 'በኢኮኖሚ indices ላይ የተገነቡ የኮርማ ደረጃና የዘር ፈሳሽ ካታሎግ አገልግሎቶች በሰው ሠራሽ ማዳቀያ ማዕከላትና በዝርያ ማኅበራት ይሸጣሉ።'}

M7_en = [
 {'t': 'Designing breeding programmes', 'd': 'Seminar · 6 weeks', 'o': ['Set breeding goals with farmers and markets', 'Use the breeder’s equation to compare strategies', 'Balance gain, inbreeding and cost'],
  'l': ['Breeding goals: participatory definition', 'Gain per year: intensity, accuracy, variation, generation interval', 'Community-based and nucleus breeding schemes', 'Managing inbreeding and effective population size', 'Turning gain into money over 10–20 years'],
  'a': 'Compare phenotypic, BLUP and genomic strategies for a sheep or dairy cooperative in birr per year and recommend one.', 'm': 'Programme parameters, spreadsheet or Python',
  'q': ['Which term of the breeder’s equation does genomics change most?', 'Why can a cheaper strategy be better?', 'How do you limit inbreeding?'], 'tip': 'Start from what farmers can sell; a breeding goal without a market fails.'},
 {'t': 'Selection indices and economic values', 'd': 'Seminar · 4 weeks', 'o': ['Derive economic values for traits', 'Build Smith–Hazel and desired-gains indices', 'Explain trade-offs from genetic correlations'],
  'l': ['Profit functions and economic values', 'P and G matrices', 'Index weights, accuracy and responses', 'Desired-gains and restricted indices', 'Indices for crops: yield, quality, resistance'],
  'a': 'Build an index for dairy (milk, fat, fertility) and compare it with single-trait selection.', 'm': 'Parameter estimates, Python or R',
  'q': ['What happens if economic values are wrong?', 'Why can a trait with low heritability still matter?', 'What is a restricted index?'], 'tip': 'Revisit economic values whenever markets change.'},
 {'t': 'Optimising testing networks', 'd': 'Seminar · 4 weeks', 'o': ['Allocate locations, years and replicates under a budget', 'Use sparse testing and genomic prediction to test more entries', 'Define target populations of environments'],
  'l': ['Variance components to H² of entry means', 'Locations vs years vs replicates', 'Sparse testing and p-rep designs', 'Genomic prediction to fill the gaps', 'Environmental characterisation with climate data'],
  'a': 'Use variance components from a past MET to choose the best design within a fixed budget.', 'm': 'MET variance components, Python or R',
  'q': ['Why do more replicates help little when G × E is large?', 'What is sparse testing?', 'What is a target population of environments?'], 'tip': 'Most programmes over-replicate and under-locate; check yours.'},
 {'t': 'Simulation and decision science', 'd': 'Seminar · 4 weeks', 'o': ['Simulate whole breeding programmes before investing', 'Use stochastic simulation to compare risks', 'Combine biology, statistics and economics in one model'],
  'l': ['Deterministic vs stochastic simulation', 'AlphaSimR in practice', 'Cost–benefit and net present value of programmes', 'Risk and uncertainty in long programmes', 'Presenting results to investors and ministries'],
  'a': 'Simulate 20 years of a teff or sheep programme under two strategies and present the net present value to a mock investor panel.', 'm': 'R (AlphaSimR), spreadsheet',
  'q': ['Why simulate rather than run a pilot?', 'What is net present value?', 'Which assumptions drive your result most?'], 'tip': 'Show investors the range of outcomes, not just the average.'},
 {'t': 'Big data, phenomics and multi-omics integration', 'd': 'Seminar · 6 weeks', 'o': ['Handle high-throughput phenotypes from drones and sensors', 'Integrate genomics, transcriptomics, metabolomics and environment', 'Apply FAIR data standards and breeding databases'],
  'l': ['Drone and sensor phenotyping pipelines', 'Multi-omics integration methods', 'Breeding databases and the BrAPI standard', 'FAIR principles and data sovereignty', 'Reproducible, scalable workflows'],
  'a': 'Integrate drone-based canopy data with genomic and weather data to improve prediction of yield in a multi-site trial.', 'm': 'Drone images or vegetation indices, genomic and weather data',
  'q': ['What does FAIR stand for?', 'How can secondary traits improve prediction?', 'Who owns data collected on farmers’ fields?'], 'tip': 'Build the data platform before the data flood arrives.'},
 {'t': 'Leading a statistics-driven enterprise', 'd': 'Seminar · 4 weeks', 'o': ['Turn statistical expertise into products and services', 'Lead consortia and win large grants', 'Protect and license methods and data'],
  'l': ['Service lines: trial analytics, breeding design, forecasting', 'Pricing analytics services', 'Consortia, grants and partnerships', 'Licensing, IP and open science together', 'Building and keeping a team of analysts'],
  'a': 'Write a business plan for an agricultural analytics company serving seed companies and cooperatives in your region.', 'm': 'Business-plan template, market data',
  'q': ['Which client pays most for analytics, and why?', 'How do you price a variety-trial analysis?', 'What can be open-source and still profitable?'], 'tip': 'Sell decisions and money saved, not statistics.'}]
M7_am = [
 {'t': 'የዝርያ ማሻሻያ ፕሮግራሞችን መንደፍ', 'd': 'ሴሚናር · 6 ሳምንት', 'o': ['ከገበሬዎችና ከገበያዎች ጋር የዝርያ ማሻሻያ ግቦችን ማስቀመጥ', 'ስትራቴጂዎችን ለማወዳደር የbreeder እኩልታን መጠቀም', 'ትርፍን፣ inbreedingን እና ወጪን ማመጣጠን'],
  'l': ['የዝርያ ማሻሻያ ግቦች፡ አሳታፊ ትርጓሜ', 'በዓመት ትርፍ፡ መጠን፣ ትክክለኛነት፣ ልዩነት፣ የትውልድ ልዩነት', 'በማኅበረሰብ ላይ የተመሠረቱና የnucleus የዝርያ ማሻሻያ ዕቅዶች', 'inbreedingን እና effective population sizeን ማስተዳደር', 'ትርፍን በ10–20 ዓመታት ወደ ገንዘብ መቀየር'],
  'a': 'ለበግ ወይም ለወተት ማኅበር phenotypic፣ BLUP እና genomic ስትራቴጂዎችን በዓመት በብር አወዳድራችሁ አንዱን ምከሩ።', 'm': 'የፕሮግራም parameters፣ ስፕሬድሺት ወይም Python',
  'q': ['genomics የbreeder እኩልታ የትኛውን ክፍል በብዛት ይቀይራል?', 'ርካሽ ስትራቴጂ ለምን የተሻለ ሊሆን ይችላል?', 'inbreedingን እንዴት ትገድባለህ?'], 'tip': 'ገበሬዎች ሊሸጡት ከሚችሉት ጀምር፤ ገበያ የሌለው የዝርያ ግብ ይወድቃል።'},
 {'t': 'Selection indices እና የኢኮኖሚ ዋጋዎች', 'd': 'ሴሚናር · 4 ሳምንት', 'o': ['ለባሕሪያት የኢኮኖሚ ዋጋዎችን ማውጣት', 'Smith–Hazel እና desired-gains indicesን መገንባት', 'ከዘረመል ተዛምዶዎች የሚመጡ ምርጫዎችን ማብራራት'],
  'l': ['የትርፍ ፋንክሽኖችና የኢኮኖሚ ዋጋዎች', 'P እና G ማትሪክሶች', 'የindex ክብደቶች፣ ትክክለኛነትና ምላሾች', 'Desired-gains እና restricted indices', 'ለሰብሎች indices፡ ምርት፣ ጥራት፣ መቋቋም'],
  'a': 'ለወተት (ወተት፣ ስብ፣ የመራባት አቅም) index ገንብታችሁ ከነጠላ-ባሕሪ ምርጫ ጋር አወዳድሩ።', 'm': 'የparameter ግምቶች፣ Python ወይም R',
  'q': ['የኢኮኖሚ ዋጋዎች ስህተት ቢሆኑ ምን ይሆናል?', 'ዝቅተኛ heritability ያለው ባሕሪ አሁንም ለምን ሊያስፈልግ ይችላል?', 'restricted index ምንድነው?'], 'tip': 'ገበያዎች በተለወጡ ቁጥር የኢኮኖሚ ዋጋዎችን እንደገና ተመልከት።'},
 {'t': 'የፍተሻ ኔትወርኮችን ማመቻቸት', 'd': 'ሴሚናር · 4 ሳምንት', 'o': ['በበጀት ውስጥ ቦታዎችን፣ ዓመታትንና ድግግሞሾችን መደልደል', 'ብዙ ዝርያዎችን ለመፈተሽ sparse testing እና ጂኖሚክ ትንበያ መጠቀም', 'የአካባቢዎችን ዒላማ ሕዝቦች መግለጽ'],
  'l': ['ከvariance components ወደ የዝርያ አማካዮች H²', 'ቦታዎች vs ዓመታት vs ድግግሞሾች', 'Sparse testing እና p-rep ንድፎች', 'ክፍተቶቹን ለመሙላት ጂኖሚክ ትንበያ', 'በአየር ንብረት ዳታ የአካባቢ መለያ'],
  'a': 'ከያለፈ MET የvariance components በመጠቀም በተወሰነ በጀት ውስጥ ምርጡን ንድፍ ምረጡ።', 'm': 'የMET variance components፣ Python ወይም R',
  'q': ['G × E ትልቅ ሲሆን ተጨማሪ ድግግሞሾች ለምን ትንሽ ይረዳሉ?', 'sparse testing ምንድነው?', 'target population of environments ምንድነው?'], 'tip': 'አብዛኞቹ ፕሮግራሞች ከመጠን በላይ ይደግማሉ፣ ቦታዎችን ግን ያሳንሳሉ፤ የአንተን ፈትሽ።'},
 {'t': 'ሲሙሌሽንና የውሳኔ ሳይንስ', 'd': 'ሴሚናር · 4 ሳምንት', 'o': ['ኢንቨስት ከማድረግ በፊት ሙሉ የዝርያ ማሻሻያ ፕሮግራሞችን ማስመሰል', 'አደጋዎችን ለማወዳደር stochastic simulation መጠቀም', 'ባዮሎጂን፣ ስታቲስቲክስንና ኢኮኖሚክስን በአንድ ሞዴል ማጣመር'],
  'l': ['Deterministic vs stochastic simulation', 'AlphaSimR በተግባር', 'የፕሮግራሞች cost–benefit እና net present value', 'በረጅም ፕሮግራሞች ውስጥ አደጋና እርግጠኛ አለመሆን', 'ውጤቶችን ለባለሀብቶችና ለሚኒስቴሮች ማቅረብ'],
  'a': 'የጤፍ ወይም የበግ ፕሮግራምን 20 ዓመታት በሁለት ስትራቴጂዎች አስመስላችሁ net present valueን ለአስመሳይ የባለሀብቶች ኮሚቴ አቅርቡ።', 'm': 'R (AlphaSimR)፣ ስፕሬድሺት',
  'q': ['ሙከራ ከማካሄድ ይልቅ ለምን እናስመስላለን?', 'net present value ምንድነው?', 'ውጤትህን በብዛት የሚወስኑት የትኞቹ ግምቶች ናቸው?'], 'tip': 'ለባለሀብቶች አማካዩን ብቻ ሳይሆን የውጤቶችን ክልል አሳይ።'},
 {'t': 'ትልቅ ዳታ፣ phenomics እና multi-omics ውህደት', 'd': 'ሴሚናር · 6 ሳምንት', 'o': ['ከድሮኖችና ከሴንሰሮች የሚመጡ ከፍተኛ መጠን phenotypesን መያዝ', 'genomicsን፣ transcriptomicsን፣ metabolomicsን እና አካባቢን ማዋሃድ', 'የFAIR ዳታ ደረጃዎችንና የዝርያ ማሻሻያ ዳታቤዞችን መተግበር'],
  'l': ['የድሮንና የሴንሰር phenotyping pipelines', 'የMulti-omics ውህደት ዘዴዎች', 'የዝርያ ማሻሻያ ዳታቤዞችና የBrAPI ደረጃ', 'የFAIR መርሆዎችና የዳታ ሉዓላዊነት', 'ተደጋግመው ሊረጋገጡና ሊሰፉ የሚችሉ የሥራ ፍሰቶች'],
  'a': 'በብዙ ቦታ ሙከራ ውስጥ የምርት ትንበያን ለማሻሻል በድሮን የተገኘ የቅጠል ሽፋን ዳታን ከጂኖሚክና ከአየር ሁኔታ ዳታ ጋር አዋህዱ።', 'm': 'የድሮን ምስሎች ወይም vegetation indices፣ ጂኖሚክና የአየር ሁኔታ ዳታ',
  'q': ['FAIR ምን ማለት ነው?', 'ሁለተኛ ደረጃ ባሕሪያት ትንበያን እንዴት ሊያሻሽሉ ይችላሉ?', 'በገበሬዎች ማሳ ላይ የተሰበሰበ ዳታ ባለቤት ማነው?'], 'tip': 'የዳታ ጎርፉ ከመምጣቱ በፊት የዳታ መድረኩን ገንባ።'},
 {'t': 'በስታቲስቲክስ የሚመራ ድርጅትን መምራት', 'd': 'ሴሚናር · 4 ሳምንት', 'o': ['የስታቲስቲክስ ዕውቀትን ወደ ምርቶችና አገልግሎቶች መቀየር', 'ጥምረቶችን (consortia) መምራትና ትላልቅ ድጋፎችን ማሸነፍ', 'ዘዴዎችንና ዳታን መጠበቅና በፈቃድ መስጠት'],
  'l': ['የአገልግሎት መስመሮች፡ የሙከራ ትንተና፣ የዝርያ ማሻሻያ ንድፍ፣ ትንበያ', 'የትንተና አገልግሎቶችን ዋጋ ማውጣት', 'ጥምረቶች፣ ድጋፎችና አጋርነቶች', 'ፈቃድ መስጠት፣ አእምሯዊ ንብረትና ክፍት ሳይንስ በአንድ ላይ', 'የተንታኞች ቡድን መገንባትና ማቆየት'],
  'a': 'በክልልህ ላሉ የዘር ኩባንያዎችና ማኅበራት አገልግሎት ለሚሰጥ የግብርና ትንተና ኩባንያ የንግድ ዕቅድ ጻፍ።', 'm': 'የንግድ ዕቅድ አብነት፣ የገበያ ዳታ',
  'q': ['ለትንተና በብዛት የሚከፍለው የትኛው ደንበኛ ነው፣ ለምን?', 'የዝርያ ሙከራ ትንተናን ዋጋ እንዴት ታወጣለህ?', 'ክፍት ምንጭ ሆኖ አሁንም ትርፋማ የሚሆነው ምንድነው?'], 'tip': 'ስታቲስቲክስን ሳይሆን ውሳኔዎችንና የተቆጠበ ገንዘብን ሽጥ።'}]

ex71['viz'] = viz_gain(ex71['_ns'])
ex72['viz'] = viz_alloc(ex72['_ns'])
ex73['viz'] = viz_index(ex73['_ns'])
S7 = {'name': {'en': 'Leading Scientist', 'am': 'መሪ ሳይንቲስት'},
      'stage': {'en': 'Postdoc → principal investigator → enterprise leader', 'am': 'Postdoc → ዋና ተመራማሪ → የድርጅት መሪ'},
      'goal': {'en': 'Leaders design whole breeding and testing programmes for maximum gain per year and per birr, integrate big data and multi-omics, simulate before investing, and build organisations that sell statistical decisions.',
               'am': 'መሪዎች በዓመትና በብር ከፍተኛ ትርፍ የሚሰጡ ሙሉ የዝርያ ማሻሻያና የፍተሻ ፕሮግራሞችን ይነድፋሉ፣ ትልቅ ዳታንና multi-omicsን ያዋህዳሉ፣ ኢንቨስት ከማድረጋቸው በፊት ያስመስላሉ፣ የስታቲስቲክስ ውሳኔዎችን የሚሸጡ ድርጅቶችን ይገነባሉ።'},
      'mods': {'en': M7_en, 'am': M7_am}, 'ex': [ex71, ex72, ex73]}
emit(7, S7)

# ===================== S8 =====================
true_profit = {'Blend A': 41000, 'Blend B': 46000, 'Blend C': 52000, 'Blend D': 44000, 'Blend E': 38000}
rows = [{'round': r + 1, 'blend': b, 'profit_birr_ha': round(float(rng.normal(mu, 9000)))} for r in range(60) for b, mu in true_profit.items()]
save_csv(pd.DataFrame(rows), 's8_blend_outcomes.csv')
ex81 = example('s8-bandit',
 {'en': 'Can an adaptive trial find the best fertilizer blend while losing less money than a fixed trial?', 'am': 'አንድ adaptive ሙከራ ከቋሚ ሙከራ ያነሰ ገንዘብ እያጣ ምርጡን የማዳበሪያ ቅልቅል ማግኘት ይችላል?'},
 {'en': 'Five blends; 60 farmers join one after another, and each farmer can try one blend. The file holds the profit each blend would give each farmer (in real life you only see the one tried).', 'am': 'አምስት ቅልቅሎች፤ 60 ገበሬዎች አንድ በአንድ ይቀላቀላሉ፣ እያንዳንዱ ገበሬ አንድ ቅልቅል መሞከር ይችላል። ፋይሉ እያንዳንዱ ቅልቅል ለእያንዳንዱ ገበሬ የሚሰጠውን ትርፍ ይዟል (በእውነተኛ ሕይወት የሚታየው የተሞከረው ብቻ ነው)።'},
 {'en': 'Response-adaptive design → Thompson sampling (Bayesian bandit) vs equal allocation', 'am': 'Response-adaptive ንድፍ → Thompson sampling (Bayesian bandit) vs እኩል ድልድል'},
 's8_blend_outcomes.csv',
 '''
import pandas as pd, numpy as np
d = pd.read_csv("s8_blend_outcomes.csv").pivot(index="round", columns="blend", values="profit_birr_ha")
blends = list(d.columns); rng = np.random.default_rng(1)
def run(policy):
    sums, counts, total, picks = np.zeros(5), np.zeros(5), 0, []
    for r, row in enumerate(d.values):
        if policy == "equal" or r < 5:
            k = r % 5                                            # rotate through the blends
        else:                                                    # Thompson: sample a plausible mean for each blend
            post_mean = (0 + sums / 9000**2) / (1 / 20000**2 + counts / 9000**2)
            post_sd = np.sqrt(1 / (1 / 20000**2 + counts / 9000**2))
            k = int(np.argmax(rng.normal(post_mean, post_sd)))
        sums[k] += row[k]; counts[k] += 1; total += row[k]; picks.append(blends[k])
    best = blends[int(np.argmax(sums / np.maximum(counts, 1)))]
    return total, best, pd.Series(picks).value_counts().reindex(blends, fill_value=0).to_dict()
for policy in ["equal", "thompson"]:
    total, best, picks = run(policy)
    print(f"{policy:9s} total profit {total:,.0f} birr  | judged best: {best} | farmers per blend: {picks}")
''',
 '''
d <- read.csv("s8_blend_outcomes.csv")
# Thompson sampling with normal priors; see also the R package 'contextual' for bandit simulations
''', None, None)
ex81['read'] = {'en': ['An equal trial gives every blend 12 farmers, even the poor ones, to learn which is best.',
                       'Thompson sampling keeps learning but sends more farmers to blends that look best so far, so total profit during the trial is higher.',
                       'Both find the best blend here; the adaptive design pays less "tuition" to learn it.'],
                'am': ['እኩል ሙከራ ምርጡን ለማወቅ ለእያንዳንዱ ቅልቅል፣ ደካሞቹንም ጨምሮ፣ 12 ገበሬዎችን ይሰጣል።',
                       'Thompson sampling መማሩን ይቀጥላል፤ ግን እስካሁን ምርጥ ወደሚመስሉ ቅልቅሎች ብዙ ገበሬዎችን ይልካል፤ ስለዚህ በሙከራው ወቅት ጠቅላላ ትርፉ ከፍ ይላል።',
                       'እዚህ ሁለቱም ምርጡን ቅልቅል ያገኛሉ፤ adaptive ንድፉ ለመማር ያነሰ «ክፍያ» ይከፍላል።']}
ex81['decide'] = {'en': 'Use adaptive allocation for on-farm testing programmes where farmers bear the cost of poor treatments; keep a minimum share for every option so learning never stops.', 'am': 'ገበሬዎች የደካማ ሕክምናዎችን ወጪ በሚሸከሙበት የእርሻ ላይ የፍተሻ ፕሮግራሞች adaptive ድልድልን ተጠቀሙ፤ መማሩ እንዳይቆም ለእያንዳንዱ አማራጭ ዝቅተኛ ድርሻ አቆዩ።'}
ex81['biz'] = {'en': 'Adaptive-trial platforms are a new product for input companies and digital advisory services.', 'am': 'የadaptive ሙከራ መድረኮች ለግብዓት ኩባንያዎችና ለዲጂታል የምክር አገልግሎቶች አዲስ ምርት ናቸው።'}

ex82 = example('s8-conformal',
 {'en': 'Can we give each farm a yield prediction with an honest range, not just a number?', 'am': 'ለእያንዳንዱ እርሻ ቁጥር ብቻ ሳይሆን ታማኝ ክልል ያለው የምርት ትንበያ መስጠት እንችላለን?'},
 {'en': 'The 400-farm dataset from Level S6. Insurers and lenders need to know how wrong a prediction might be.', 'am': 'ከደረጃ S6 የ400 እርሻዎች ዳታሴት። የመድን ድርጅቶችና አበዳሪዎች ትንበያ ምን ያህል ሊሳሳት እንደሚችል ማወቅ ያስፈልጋቸዋል።'},
 {'en': 'Uncertainty quantification → split conformal prediction intervals around a random forest; check coverage on unseen farms', 'am': 'እርግጠኛ ያለመሆን መለኪያ → በrandom forest ዙሪያ split conformal prediction intervals፤ በማይታዩ እርሻዎች ላይ ሽፋኑን መፈተሽ'},
 's6_farm_yield_ml.csv',
 '''
import pandas as pd, numpy as np
from sklearn.ensemble import RandomForestRegressor
d = pd.read_csv("s6_farm_yield_ml.csv").sample(frac=1, random_state=3)
X, y = d.drop(columns=["farm", "yield_t_ha"]).values, d.yield_t_ha.values
fit, cal, test = slice(0, 200), slice(200, 300), slice(300, 400)
rf = RandomForestRegressor(300, min_samples_leaf=5, random_state=0).fit(X[fit], y[fit])
resid = np.abs(y[cal] - rf.predict(X[cal]))                     # calibration errors on unseen farms
for level in (0.80, 0.90):
    q = np.quantile(resid, np.ceil((len(resid) + 1) * level) / len(resid))
    pred = rf.predict(X[test]); covered = np.mean((y[test] >= pred - q) & (y[test] <= pred + q))
    print(f"{int(level*100)}% interval: prediction +/- {q:.2f} t/ha; coverage on 100 new farms = {covered:.0%}")
print("Example farm:", f"predicted {pred[0]:.2f} t/ha, 90% range {pred[0]-q:.2f} to {pred[0]+q:.2f}, actual {y[test][0]:.2f}")
''',
 '''
# R: package 'probably' (tidymodels) or manual split conformal
d <- read.csv("s6_farm_yield_ml.csv")[sample(400), ]
fit <- ranger::ranger(yield_t_ha ~ . - farm, data = d[1:200, ], min.node.size = 5)
res <- abs(d$yield_t_ha[201:300] - predict(fit, d[201:300, ])$predictions)
q <- quantile(res, 0.90 * (1 + 1/100)); q
''', None, None)
ex82['read'] = {'en': ['Split conformal prediction uses errors on farms the model did not train on to set the width of the range.',
                       'The promise: about 80% or 90% of new farms fall inside their range, whatever the model; the test coverage checks that promise.',
                       'A range is more honest and more useful for risk decisions than a single number.' + (' The example farm fell just outside its 90% range: about 1 farm in 10 will, and that is what the promise allows.' if 'actual' in ex82['out'] and float(ex82['out'].split('actual ')[1].split()[0]) < float(ex82['out'].split('range ')[1].split()[0]) else '')],
                'am': ['Split conformal prediction የክልሉን ስፋት ለማስቀመጥ ሞዴሉ ባልሰለጠነባቸው እርሻዎች ላይ ያሉ ስህተቶችን ይጠቀማል።',
                       'ቃሉ፡ ሞዴሉ ምንም ይሁን ምን ከአዳዲስ እርሻዎች ወደ 80% ወይም 90% ገደማ በክልላቸው ውስጥ ይወድቃሉ፤ የፈተናው ሽፋን ይህን ቃል ያረጋግጣል።',
                       'ክልል ከነጠላ ቁጥር ይበልጥ ታማኝና ለአደጋ ውሳኔዎች ጠቃሚ ነው።' + (' ምሳሌው እርሻ ከ90% ክልሉ ትንሽ ወጣ ብሏል፡ ከ10 እርሻዎች አንዱ ገደማ እንዲህ ይሆናል፤ ቃሉም ይህን ይፈቅዳል።' if float(ex82['out'].split('actual ')[1].split()[0]) < float(ex82['out'].split('range ')[1].split()[0]) else '')]}
ex82['decide'] = {'en': 'Report yield forecasts to lenders and insurers as ranges; price products from the lower bound, not the average.', 'am': 'የምርት ትንበያዎችን ለአበዳሪዎችና ለመድን ድርጅቶች እንደ ክልል ሪፖርት አድርጉ፤ ምርቶችን በአማካዩ ሳይሆን በዝቅተኛው ወሰን ዋጋ አውጡ።'}
ex82['biz'] = {'en': 'Trustworthy uncertainty is what turns a yield model into a sellable credit or insurance product.', 'am': 'ታማኝ የእርግጠኛ አለመሆን መለኪያ የምርት ሞዴልን ወደሚሸጥ የብድር ወይም የመድን ምርት የሚቀይረው ነው።'}

M8_en = [
 {'t': 'AI-driven and adaptive experimentation', 'd': 'Yearly seminar · 4 sessions', 'o': ['Use designs that learn as data arrive', 'Apply bandits and Bayesian optimisation to agronomy', 'Keep adaptive designs fair and valid'],
  'l': ['Response-adaptive and sequential designs', 'Multi-armed bandits and Thompson sampling', 'Bayesian optimisation for input recipes', 'Self-driving labs and automated phenotyping'],
  'a': 'Simulate an on-farm programme where an adaptive design chooses fertilizer blends, and compare profit with a fixed design.', 'm': 'Python, trial data',
  'q': ['What does an adaptive design trade off?', 'Why keep a minimum share for each option?', 'Where would you not use an adaptive design?'], 'tip': 'Pre-register the adaptation rule so results stay credible.'},
 {'t': 'Trustworthy prediction and uncertainty', 'd': 'Yearly seminar · 3 sessions', 'o': ['Quantify uncertainty for any model', 'Check calibration and coverage', 'Communicate risk to farmers, lenders and insurers'],
  'l': ['Conformal prediction', 'Calibration of probabilities', 'Ensembles and Bayesian deep learning', 'Communicating ranges and risk'],
  'a': 'Add conformal intervals to a yield model and check their coverage on new farms and a new season.', 'm': 'Python, yield data',
  'q': ['What does 90% coverage mean?', 'Why can coverage fail in a new season?', 'How would you explain a range to a farmer?'], 'tip': 'Never ship a prediction without a range.'},
 {'t': 'Federated learning and data sovereignty', 'd': 'Yearly seminar · 3 sessions', 'o': ['Train models without moving private data', 'Protect privacy with aggregation and differential privacy', 'Design fair data-sharing agreements for African data'],
  'l': ['Federated learning across cooperatives or countries', 'Privacy techniques', 'Data sovereignty, consent and benefit sharing', 'Data trusts and cooperatives'],
  'a': 'Design a federated yield-prediction scheme for three cooperatives that keeps each one’s farmer data local.', 'm': 'Diagrams, policy documents, Python',
  'q': ['What moves in federated learning, data or models?', 'Who should benefit from farmer data?', 'What is differential privacy?'], 'tip': 'African data should create African value; design for that from day one.'},
 {'t': 'Digital twins, sensors and real-time statistics', 'd': 'Yearly seminar · 3 sessions', 'o': ['Stream and analyse sensor and satellite data in real time', 'Build digital twins of farms and herds', 'Detect anomalies and send early warnings'],
  'l': ['IoT sensors, satellites and drones', 'Streaming statistics and change detection', 'Digital twins that combine crop models and data', 'Early-warning systems for disease and drought'],
  'a': 'Build a simple early-warning rule from soil-moisture sensor streams and test how early it would have warned in past dry spells.', 'm': 'Sensor data or open satellite data, Python',
  'q': ['What is a digital twin?', 'How do you avoid false alarms?', 'Who acts on an early warning?'], 'tip': 'A warning is only useful if someone can act on it in time.'},
 {'t': 'Foundation models, causal AI and the statistician-entrepreneur', 'd': 'Yearly seminar · 4 sessions', 'o': ['Follow foundation models for genomics, remote sensing and agronomy', 'Combine machine learning with causal reasoning', 'Build profitable products on statistical expertise'],
  'l': ['Foundation models for agriculture: what they can and cannot do', 'Causal machine learning for heterogeneous effects', 'Ethics, bias and accountability', 'From analysis to product: pricing, delivery, scale'],
  'a': 'Write a "future brief": which statistical product will your region’s agriculture need in 5 years, and how will you build and sell it?', 'm': 'Recent papers, market notes, mentor',
  'q': ['What is a heterogeneous treatment effect?', 'When is a foundation model not worth it?', 'What will you sell, to whom, at what price?'], 'tip': 'Revisit this module every year; the field moves fast.'}]
M8_am = [
 {'t': 'በAI የሚመሩና adaptive ሙከራዎች', 'd': 'ዓመታዊ ሴሚናር · 4 ክፍለ ጊዜዎች', 'o': ['ዳታ ሲመጣ የሚማሩ ንድፎችን መጠቀም', 'banditsን እና Bayesian optimisationን በአግሮኖሚ ላይ መተግበር', 'adaptive ንድፎችን ፍትሐዊና ትክክለኛ ማድረግ'],
  'l': ['Response-adaptive እና sequential ንድፎች', 'Multi-armed bandits እና Thompson sampling', 'ለግብዓት ቀመሮች Bayesian optimisation', 'ራሳቸውን የሚያስኬዱ ላብራቶሪዎችና በራስ-ሰር phenotyping'],
  'a': 'adaptive ንድፍ የማዳበሪያ ቅልቅሎችን የሚመርጥበትን የእርሻ ላይ ፕሮግራም አስመስላችሁ ትርፉን ከቋሚ ንድፍ ጋር አወዳድሩ።', 'm': 'Python፣ የሙከራ ዳታ',
  'q': ['adaptive ንድፍ ምንን ከምን ጋር ያመጣጥናል?', 'ለእያንዳንዱ አማራጭ ዝቅተኛ ድርሻ ለምን ይቆያል?', 'adaptive ንድፍ የማትጠቀመው የት ነው?'], 'tip': 'ውጤቶች ተአማኒ እንዲሆኑ የማላመጃ ሕጉን አስቀድመህ መዝግብ።'},
 {'t': 'ታማኝ ትንበያና እርግጠኛ አለመሆን', 'd': 'ዓመታዊ ሴሚናር · 3 ክፍለ ጊዜዎች', 'o': ['ለማንኛውም ሞዴል እርግጠኛ አለመሆንን መለካት', 'calibrationን እና ሽፋንን መፈተሽ', 'አደጋን ለገበሬዎች፣ ለአበዳሪዎችና ለመድን ድርጅቶች ማሳወቅ'],
  'l': ['Conformal prediction', 'የፕሮባቢሊቲዎች Calibration', 'Ensembles እና Bayesian deep learning', 'ክልሎችንና አደጋን ማሳወቅ'],
  'a': 'በምርት ሞዴል ላይ conformal intervals ጨምራችሁ በአዳዲስ እርሻዎችና በአዲስ ወቅት ሽፋናቸውን ፈትሹ።', 'm': 'Python፣ የምርት ዳታ',
  'q': ['90% ሽፋን ምን ማለት ነው?', 'በአዲስ ወቅት ሽፋን ለምን ሊወድቅ ይችላል?', 'ክልልን ለገበሬ እንዴት ታብራራለህ?'], 'tip': 'ያለ ክልል ትንበያን በፍጹም አታቅርብ።'},
 {'t': 'Federated learning እና የዳታ ሉዓላዊነት', 'd': 'ዓመታዊ ሴሚናር · 3 ክፍለ ጊዜዎች', 'o': ['የግል ዳታን ሳያንቀሳቅሱ ሞዴሎችን ማሰልጠን', 'ግላዊነትን በaggregation እና በdifferential privacy መጠበቅ', 'ለአፍሪካ ዳታ ፍትሐዊ የዳታ መጋራት ስምምነቶችን መንደፍ'],
  'l': ['በማኅበራት ወይም በአገሮች መካከል Federated learning', 'የግላዊነት ቴክኒኮች', 'የዳታ ሉዓላዊነት፣ ስምምነትና የጥቅም መጋራት', 'የዳታ አደራዎችና ማኅበራት'],
  'a': 'የእያንዳንዳቸውን የገበሬ ዳታ በአካባቢው እንዲቆይ የሚያደርግ ለሦስት ማኅበራት federated የምርት ትንበያ ዕቅድ ንደፉ።', 'm': 'ንድፎች፣ የፖሊሲ ሰነዶች፣ Python',
  'q': ['በfederated learning ውስጥ የሚንቀሳቀሰው ዳታ ነው ወይስ ሞዴል?', 'ከገበሬ ዳታ መጠቀም ያለበት ማነው?', 'differential privacy ምንድነው?'], 'tip': 'የአፍሪካ ዳታ የአፍሪካ እሴት መፍጠር አለበት፤ ከመጀመሪያው ቀን ጀምሮ ለዚያ ንደፍ።'},
 {'t': 'ዲጂታል መንታዎች፣ ሴንሰሮችና የቅጽበት ስታቲስቲክስ', 'd': 'ዓመታዊ ሴሚናር · 3 ክፍለ ጊዜዎች', 'o': ['የሴንሰርና የሳተላይት ዳታን በቅጽበት መቀበልና መተንተን', 'የእርሻዎችንና የመንጋዎችን ዲጂታል መንታዎች መገንባት', 'ያልተለመዱ ነገሮችን መለየትና ቅድመ ማስጠንቀቂያ መላክ'],
  'l': ['የIoT ሴንሰሮች፣ ሳተላይቶችና ድሮኖች', 'Streaming ስታቲስቲክስና የለውጥ መለየት', 'የሰብል ሞዴሎችንና ዳታን የሚያጣምሩ ዲጂታል መንታዎች', 'ለበሽታና ለድርቅ የቅድመ ማስጠንቀቂያ ሥርዓቶች'],
  'a': 'ከአፈር እርጥበት ሴንሰር ዳታ ቀላል የቅድመ ማስጠንቀቂያ ሕግ ገንብታችሁ ባለፉት ደረቅ ወቅቶች ምን ያህል ቀድሞ እንደሚያስጠነቅቅ ፈትሹ።', 'm': 'የሴንሰር ዳታ ወይም ክፍት የሳተላይት ዳታ፣ Python',
  'q': ['ዲጂታል መንታ ምንድነው?', 'የሐሰት ማንቂያዎችን እንዴት ታስወግዳለህ?', 'በቅድመ ማስጠንቀቂያ ላይ እርምጃ የሚወስደው ማነው?'], 'tip': 'ማስጠንቀቂያ ጠቃሚ የሚሆነው አንድ ሰው በጊዜ እርምጃ መውሰድ ሲችል ብቻ ነው።'},
 {'t': 'መሠረታዊ ሞዴሎች፣ causal AI እና ስታቲስቲሺያን-ሥራ ፈጣሪ', 'd': 'ዓመታዊ ሴሚናር · 4 ክፍለ ጊዜዎች', 'o': ['ለጂኖሚክስ፣ ለremote sensing እና ለአግሮኖሚ መሠረታዊ ሞዴሎችን መከታተል', 'ማሽን ለርኒንግን ከምክንያታዊ አስተሳሰብ ጋር ማጣመር', 'በስታቲስቲክስ ዕውቀት ላይ ትርፋማ ምርቶችን መገንባት'],
  'l': ['ለግብርና መሠረታዊ ሞዴሎች፡ ምን ማድረግ እንደሚችሉና እንደማይችሉ', 'ለተለያዩ ውጤቶች Causal machine learning', 'ሥነ-ምግባር፣ አድልዎና ተጠያቂነት', 'ከትንተና ወደ ምርት፡ ዋጋ፣ አቅርቦት፣ መስፋፋት'],
  'a': '«የወደፊት ማጠቃለያ» ጻፍ፡ የክልልህ ግብርና በ5 ዓመት ውስጥ የትኛው የስታቲስቲክስ ምርት ያስፈልገዋል፣ እንዴትስ ገንብተህ ትሸጠዋለህ?', 'm': 'የቅርብ ጊዜ ጽሑፎች፣ የገበያ ማስታወሻዎች፣ አማካሪ',
  'q': ['heterogeneous treatment effect ምንድነው?', 'መሠረታዊ ሞዴል የማያዋጣው መቼ ነው?', 'ምን፣ ለማን፣ በምን ዋጋ ትሸጣለህ?'], 'tip': 'ይህን ሞጁል በየዓመቱ እንደገና ተመልከት፤ መስኩ በፍጥነት ይንቀሳቀሳል።'}]

S8 = {'name': {'en': 'Future of Agricultural Data Science', 'am': 'የግብርና ዳታ ሳይንስ መጪው ዘመን'},
      'stage': {'en': 'Lifelong · renewed every year', 'am': 'ዕድሜ ልክ · በየዓመቱ የሚታደስ'},
      'goal': {'en': 'Stay ahead as statistics merges with AI: experiments that adapt as they run, predictions that state their uncertainty honestly, models trained without moving private data, real-time digital twins, and statistical products that African enterprises sell to the world.',
               'am': 'ስታቲስቲክስ ከAI ጋር ሲዋሃድ ቀድሞ መገኘት፡ ሲካሄዱ የሚላመዱ ሙከራዎች፣ እርግጠኛ አለመሆናቸውን በታማኝነት የሚገልጹ ትንበያዎች፣ የግል ዳታን ሳያንቀሳቅሱ የሚሰለጥኑ ሞዴሎች፣ የቅጽበት ዲጂታል መንታዎች፣ እንዲሁም የአፍሪካ ድርጅቶች ለዓለም የሚሸጧቸው የስታቲስቲክስ ምርቶች።'},
      'mods': {'en': M8_en, 'am': M8_am}, 'ex': [ex81, ex82]}
emit(8, S8)
for e in S7['ex'] + S8['ex']:
    print(f"--- {e['id']}\n{e['out']}\n")
