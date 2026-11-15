"""Chart specs for the quantitative-genetics examples.
Every number comes from the namespace of the example code that produced the printed output,
so a chart can never disagree with the output shown next to it."""
import numpy as np, pandas as pd
from scipy import stats
from lib import bi, rn


def tbl(cols, rows):
    return {'cols': cols, 'rows': rows}


# ---------------- S5: multi-environment trial (G x E) ----------------
def viz_met(ns):
    M, env_index, fw = ns['M'], ns['env_index'], ns['fw']
    U, S, Vt = ns['U'], ns['S'], ns['Vt']
    means = M.mean(axis=1).sort_values(ascending=False)
    slope = pd.Series(fw); ip1 = pd.Series(U[:, 0] * np.sqrt(S[0]), index=M.index)
    best = means.index[0]
    stable = min(list(means.index[:5]), key=lambda x: abs(ip1[x]) + abs(slope[x] - 1))
    order = env_index.sort_values().index
    xs = [float(env_index[e]) for e in order]
    xr = np.array([min(xs), max(xs)])
    series = []
    for g in M.index:
        if g in (best, stable):
            continue
        b, a = np.polyfit(env_index.values, M.loc[g].values, 1)
        series.append({'name': bi('Other genotypes', 'ሌሎች ዝርያዎች'), 'slot': 0, 'kind': 'line', 'x': rn(xr), 'y': rn(a + b * xr),
                       'legend': g == [x for x in M.index if x not in (best, stable)][0],
                       'tip': [f'{v:.2f} t/ha (fitted)|{g}' for v in a + b * xr]})
    for g, slot in [(best, 1), (stable, 2)]:
        b, a = np.polyfit(env_index.values, M.loc[g].values, 1)
        series.append({'name': bi(f'{g}: slope {slope[g]:.2f}', f'{g}፡ slope {slope[g]:.2f}'), 'slot': slot, 'kind': 'line',
                       'x': rn(xr), 'y': rn(a + b * xr), 'endlabel': g})
        series.append({'name': bi(f'{g} site means', f'{g} የቦታ አማካዮች'), 'slot': slot, 'kind': 'points', 'legend': False,
                       'x': rn(xs), 'y': rn([M.loc[g, e] for e in order]),
                       'tip': [f'{M.loc[g, e]:.2f} t/ha|{g} · {e}' for e in order]})
    fwspec = {'type': 'xy', 'title': bi('Finlay–Wilkinson stability: yield vs environment index', 'Finlay–Wilkinson መረጋጋት፡ ምርት ከአካባቢ መለኪያ ጋር'),
              'note': bi(f'Each line is a genotype’s regression on the site mean. Slope 1 = average response; steeper = responds to good sites; flatter = steady in poor sites. {best} has the highest mean; {stable} is the most stable of the top five.',
                         f'እያንዳንዱ መስመር የአንድ ዝርያ regression በቦታው አማካይ ላይ ነው። Slope 1 = አማካይ ምላሽ፤ ቁልቁል = ለጥሩ ቦታዎች ይመልሳል፤ ጠፍጣፋ = በደካማ ቦታዎች የተረጋጋ። {best} ከፍተኛ አማካይ አለው፤ {stable} ከከፍተኛዎቹ አምስት በጣም የተረጋጋ ነው።'),
              'x': {'label': bi('Environment index: site mean − grand mean (t/ha)', 'የአካባቢ መለኪያ፡ የቦታ አማካይ − ጠቅላላ አማካይ (t/ha)')},
              'y': {'label': bi('Yield (t/ha)', 'ምርት (t/ha)')}, 'series': series, 'rpad': 40,
              'table': tbl([bi('Genotype', 'ዝርያ'), bi('Mean (t/ha)', 'አማካይ (t/ha)'), bi('FW slope', 'FW slope'), bi('IPCA1', 'IPCA1')],
                           [[g, rn(means[g], 2), rn(slope[g], 2), rn(ip1[g], 2)] for g in means.index])}
    # AMMI1 biplot
    env_sc = pd.Series(Vt[0] * np.sqrt(S[0]), index=M.columns); env_mean = M.mean(axis=0)
    gm = float(M.values.mean()); share = 100 * S[0] ** 2 / (S ** 2).sum()
    ammi = {'type': 'xy', 'title': bi('AMMI1 biplot: mean yield vs interaction (IPCA1)', 'AMMI1 biplot፡ አማካይ ምርት ከinteraction (IPCA1) ጋር'),
            'note': bi(f'IPCA1 explains {share:.0f}% of G × E. Points near the horizontal line interact little with sites. A genotype and a site with IPCA1 scores of the same sign interact positively.',
                       f'IPCA1 የG × E {share:.0f}% ያብራራል። ከአግድሙ መስመር አጠገብ ያሉ ነጥቦች ከቦታዎች ጋር ትንሽ ይገናኛሉ። ተመሳሳይ ምልክት ያለው IPCA1 ያላቸው ዝርያና ቦታ በአዎንታዊ ይገናኛሉ።'),
            'x': {'label': bi('Mean yield (t/ha)', 'አማካይ ምርት (t/ha)')}, 'y': {'label': bi('IPCA1 score', 'IPCA1 ውጤት')},
            'refs': [{'kind': 'h', 'v': 0, 'label': bi('no interaction', 'interaction የለም')}, {'kind': 'v', 'v': rn(gm), 'label': bi('grand mean', 'ጠቅላላ አማካይ')}],
            'series': [{'name': bi('Genotypes', 'ዝርያዎች'), 'slot': 1, 'kind': 'points', 'x': rn(means.reindex(M.index)), 'y': rn(ip1),
                        'labels': [[i, g] for i, g in enumerate(M.index)],
                        'tip': [f'{means[g]:.2f} t/ha, IPCA1 {ip1[g]:+.2f}|{g}' for g in M.index]},
                       {'name': bi('Sites', 'ቦታዎች'), 'slot': 2, 'kind': 'points', 'shape': 'square', 'x': rn(env_mean), 'y': rn(env_sc),
                        'labels': [[i, e] for i, e in enumerate(M.columns)],
                        'tip': [f'{env_mean[e]:.2f} t/ha, IPCA1 {env_sc[e]:+.2f}|{e}' for e in M.columns]}],
            'table': tbl([bi('Name', 'ስም'), bi('Type', 'ዓይነት'), bi('Mean (t/ha)', 'አማካይ (t/ha)'), bi('IPCA1', 'IPCA1')],
                         [[g, 'G', rn(means[g], 2), rn(ip1[g], 2)] for g in M.index] + [[e, 'E', rn(env_mean[e], 2), rn(env_sc[e], 2)] for e in M.columns])}
    return [fwspec, ammi]


# ---------------- S6: heritability and sire EBVs ----------------
def viz_h2(ns):
    h2, se, var_s, var_e = ns['h2'], ns['se_h2'], ns['var_s'], ns['var_e']
    var_a, var_p = 4 * var_s, var_s + var_e
    lo, hi = max(h2 - 1.96 * se, 0), min(h2 + 1.96 * se, 1)
    seg = {'type': 'seg', 'title': bi('Where the phenotypic variance comes from', 'phenotypic variance ከየት ይመጣል'),
           'note': bi(f'σ²P = σ²sire + σ²error = {var_p:.2f} kg². In a half-sib design σ²A = 4 × σ²sire = {var_a:.2f} kg², so h² = σ²A / σ²P = {h2:.2f}.',
                      f'σ²P = σ²sire + σ²error = {var_p:.2f} kg²። በhalf-sib ንድፍ σ²A = 4 × σ²sire = {var_a:.2f} kg²፤ ስለዚህ h² = σ²A / σ²P = {h2:.2f}።'),
           'parts': [{'name': bi('Additive genetic, σ²A (passed to offspring)', 'Additive genetic, σ²A (ወደ ዘር የሚተላለፍ)'), 'v': rn(var_a), 'slot': 1},
                     {'name': bi('Environment + non-additive genetic', 'አካባቢ + non-additive genetic'), 'v': rn(var_p - var_a), 'slot': 0}],
           'unit': 'kg²',
           'table': tbl([bi('Component', 'ክፍል'), bi('Variance (kg²)', 'Variance (kg²)'), bi('Share', 'ድርሻ')],
                        [['σ²A = 4σ²sire', rn(var_a, 3), f'{100 * var_a / var_p:.1f}%'], ['σ²P − σ²A', rn(var_p - var_a, 3), f'{100 * (1 - var_a / var_p):.1f}%'], ['σ²P', rn(var_p, 3), '100%']])}
    ci = {'type': 'dot', 'title': bi('How precise is the h² estimate?', 'የh² ግምቱ ምን ያህል ትክክለኛ ነው?'),
          'note': bi('Estimate ± 1.96 × SE. The data were simulated with h² = 0.27; a design with 20 sires cannot pin it down.',
                     'ግምት ± 1.96 × SE። ዳታው በh² = 0.27 ተመስሏል፤ 20 አውራዎች ያሉት ንድፍ በትክክል ሊወስነው አይችልም።'),
          'x': {'label': bi('Heritability (h²)', 'Heritability (h²)'), 'min': 0, 'max': 1},
          'cats': [bi('This data set', 'ይህ ዳታሴት')],
          'series': [{'name': bi('Estimate with 95% interval', 'ግምት ከ95% ክልል ጋር'), 'slot': 1, 'v': [rn(h2)], 'lo': [rn(lo)], 'hi': [rn(hi)]},
                     {'name': bi('True value used in the simulation', 'በሲሙሌሽኑ የተጠቀምነው እውነተኛ እሴት'), 'slot': 2, 'v': [0.27], 'hollow': True}],
          'table': tbl([bi('Quantity', 'መጠን'), bi('Value', 'እሴት')], [['h²', rn(h2, 3)], ['SE', rn(se, 3)], [bi('95% interval', '95% ክልል'), f'{lo:.2f} – {hi:.2f}'], [bi('True (simulated)', 'እውነተኛ (የተመሰለ)'), 0.27]])}
    tab = ns['tab']; mu = ns['mu']
    sires = list(tab.index)
    ebv = ns['ebv'][sires]; sep = ns['sep'][sires]; raw = 2 * (ns['m_i'][sires] - mu); n = ns['n_i'][sires]; rel = ns['rel'][sires]
    cat = {'type': 'dot', 'title': bi('Sire EBVs with 95% intervals, and the effect of BLUP shrinkage', 'የአውራ EBVs ከ95% ክልሎች ጋር፣ እና የBLUP shrinkage ውጤት'),
           'note': bi('Filled dot = EBV (BLUP) ± 1.96 × SEP. Hollow dot = what the sire would get with no shrinkage, 2 × (progeny mean − flock mean). Sires with 4 lambs (n in brackets) are pulled hardest towards zero.',
                      'የተሞላ ነጥብ = EBV (BLUP) ± 1.96 × SEP። ባዶ ነጥብ = ያለ shrinkage የሚያገኘው፣ 2 × (የዘሮች አማካይ − የመንጋ አማካይ)። 4 ጠቦቶች ያሏቸው አውራዎች (n በቅንፍ) ወደ ዜሮ በብዛት ይጎተታሉ።'),
           'x': {'label': bi('Breeding value for weaning weight (kg, deviation from flock)', 'ለጡት መጣያ ክብደት breeding value (kg፣ ከመንጋ ልዩነት)')},
           'cats': [f'{s} ({int(n[s])})' for s in sires], 'ref0': True,
           'series': [{'name': bi('EBV (BLUP) ± 1.96 SEP', 'EBV (BLUP) ± 1.96 SEP'), 'slot': 1, 'v': rn(ebv), 'lo': rn(ebv - 1.96 * sep), 'hi': rn(ebv + 1.96 * sep)},
                      {'name': bi('No shrinkage: 2 × (mean − flock mean)', 'ያለ shrinkage፡ 2 × (አማካይ − የመንጋ አማካይ)'), 'slot': 2, 'v': rn(raw), 'hollow': True}],
           'table': tbl([bi('Sire', 'አውራ'), bi('Lambs', 'ጠቦቶች'), bi('Unshrunk (kg)', 'ያለ shrinkage (kg)'), 'EBV (kg)', bi('Reliability', 'አስተማማኝነት'), 'SEP (kg)', bi('95% interval', '95% ክልል')],
                        [[s, int(n[s]), rn(raw[s], 2), rn(ebv[s], 2), rn(rel[s], 2), rn(sep[s], 2), f'{ebv[s] - 1.96 * sep[s]:.2f} to {ebv[s] + 1.96 * sep[s]:.2f}'] for s in sires])}
    return [seg, ci, cat]


# ---------------- S6: GWAS ----------------
def viz_gwas(ns):
    pv, m = ns['pv'], ns['m']
    thr = -np.log10(0.05 / m)
    ymax = float(max((-np.log10(p)).max() for p in pv.values())) * 1.08
    out = []
    for label, am in [('No correction', 'ያለ ማስተካከያ'), ('With 3 PCs', 'ከ3 PCs ጋር')]:
        p = pv[label]; lp = -np.log10(p); idx = np.arange(1, m + 1); sig = p < 0.05 / m
        lam = np.median(stats.chi2.isf(p, 1)) / 0.4549
        top = np.argsort(p)[:2]
        out.append({'type': 'xy', 'title': bi(f'Manhattan plot: {label[0].lower() + label[1:]} (λ = {lam:.2f})', f'Manhattan plot፡ {am} (λ = {lam:.2f})'),
                    'note': bi(f'{int(sig.sum())} of {m} SNPs pass Bonferroni (p < 0.05/{m}).', f'ከ{m} SNPs {int(sig.sum())} Bonferroniን ያልፋሉ (p < 0.05/{m})።'),
                    'h': 220, 'x': {'label': bi('SNP position along the genome', 'በጂኖም ላይ የSNP ቦታ'), 'min': 0, 'max': m + 1, 'int': True},
                    'y': {'label': bi('−log₁₀(p)', '−log₁₀(p)'), 'min': 0, 'max': rn(ymax, 2)},
                    'refs': [{'kind': 'h', 'v': rn(thr), 'label': bi('Bonferroni', 'Bonferroni')}],
                    'series': [{'name': bi('Not significant', 'ጉልህ ያልሆነ'), 'slot': 0, 'kind': 'points', 'size': 2.6,
                                'x': rn(idx[~sig], 0), 'y': rn(lp[~sig], 2), 'tip': [f'{v:.2f}|snp{j:03d}' for j, v in zip(idx[~sig], lp[~sig])]},
                               {'name': bi('Significant after Bonferroni', 'ከBonferroni በኋላ ጉልህ'), 'slot': 2, 'kind': 'points', 'size': 3.4,
                                'x': rn(idx[sig], 0), 'y': rn(lp[sig], 2), 'tip': [f'{v:.2f}|snp{j:03d}' for j, v in zip(idx[sig], lp[sig])],
                                'labels': [[int(np.where(np.where(sig)[0] == q)[0][0]), f'snp{q + 1:03d}'] for q in top if sig[q]] if sig.sum() <= 6 else []}],
                    'table': tbl([bi('Rank', 'ደረጃ'), 'SNP', 'p', '−log₁₀(p)'],
                                 [[i + 1, f'snp{q + 1:03d}', f'{p[q]:.2e}', rn(lp[q], 2)] for i, q in enumerate(np.argsort(p)[:10])])})
    qq = []
    for label, am, slot in [('No correction', 'ያለ ማስተካከያ', 3), ('With 3 PCs', 'ከ3 PCs ጋር', 1)]:
        p = np.sort(pv[label]); lam = np.median(stats.chi2.isf(p, 1)) / 0.4549
        exp = -np.log10((np.arange(1, m + 1) - 0.5) / m)
        qq.append({'name': bi(f'{label} (λ = {lam:.2f})', f'{am} (λ = {lam:.2f})'), 'slot': slot, 'kind': 'points', 'size': 2.8,
                   'x': rn(exp, 3), 'y': rn(-np.log10(p), 2), 'tip': [f'{o:.2f} observed|{e:.2f} expected · {label}' for e, o in zip(exp, -np.log10(p))]})
    out.append({'type': 'xy', 'title': bi('Q–Q plot: observed vs expected p-values', 'Q–Q plot፡ የታዩ ከሚጠበቁ p-values ጋር'),
                'note': bi('Under no association the points follow the diagonal. Lifting off along the whole range = inflation from population structure; lifting only at the top = true signals.',
                           'ምንም ግንኙነት ከሌለ ነጥቦቹ ሰያፉን ይከተላሉ። በሙሉ ክልሉ መነሳት = ከሕዝብ መዋቅር የሚመጣ inflation፤ ከላይ ብቻ መነሳት = እውነተኛ ምልክቶች።'),
                'h': 260, 'x': {'label': bi('Expected −log₁₀(p)', 'የሚጠበቅ −log₁₀(p)'), 'min': 0},
                'y': {'label': bi('Observed −log₁₀(p)', 'የታየ −log₁₀(p)'), 'min': 0},
                'refs': [{'kind': 'diag', 'label': bi('y = x', 'y = x')}], 'series': qq,
                'table': tbl([bi('Analysis', 'ትንተና'), 'λ', bi('Bonferroni hits', 'Bonferroni ግኝቶች')],
                             [[lab, rn(np.median(stats.chi2.isf(pv[lab], 1)) / 0.4549, 2), int((pv[lab] < 0.05 / m).sum())] for lab in pv])})
    return out


# ---------------- S6: genomic prediction ----------------
def viz_gp(ns):
    res, h2, best = ns['res'], ns['h2'], ns['best']
    al = list(res); mean = [float(np.mean(res[a])) for a in al]
    line = {'type': 'xy', 'title': bi('Predictive ability and accuracy across shrinkage (ridge alpha)', 'Predictive ability እና ትክክለኛነት በshrinkage (ridge alpha) ላይ'),
            'note': bi(f'Band = range over the 5 folds. Accuracy = ability / √h² with h² = {h2:.2f}. Best alpha = {best}.',
                       f'ባንዱ = በ5 folds ላይ ያለ ክልል። ትክክለኛነት = ability / √h²፣ h² = {h2:.2f}። ምርጡ alpha = {best}።'),
            'x': {'label': bi('Ridge alpha (log scale): more shrinkage →', 'Ridge alpha (log scale)፡ ብዙ shrinkage →'), 'log': True, 'ticks': al},
            'y': {'label': bi('Correlation', 'ተዛምዶ')},
            'series': [{'name': bi('Fold range', 'የfold ክልል'), 'slot': 1, 'kind': 'band', 'x': al, 'lo': rn([min(res[a]) for a in al]), 'hi': rn([max(res[a]) for a in al]), 'legend': False},
                       {'name': bi('Predictive ability r(ŷ, y)', 'Predictive ability r(ŷ, y)'), 'slot': 1, 'kind': 'line', 'markers': True, 'x': al, 'y': rn(mean),
                        'tip': [f'{v:.2f}|ability · alpha {a}' for a, v in zip(al, mean)], 'endlabel': bi('ability', 'ability')},
                       {'name': bi('Accuracy r(ĝ, g) = ability / √h²', 'ትክክለኛነት r(ĝ, g) = ability / √h²'), 'slot': 2, 'kind': 'line', 'markers': True, 'x': al, 'y': rn([v / np.sqrt(h2) for v in mean]),
                        'tip': [f'{v / np.sqrt(h2):.2f}|accuracy · alpha {a}' for a, v in zip(al, mean)], 'endlabel': bi('accuracy', 'ትክክለኛነት')}],
            'rpad': 70,
            'table': tbl(['alpha', bi('Ability (mean)', 'Ability (አማካይ)'), bi('Fold min', 'Fold ዝቅተኛ'), bi('Fold max', 'Fold ከፍተኛ'), bi('Accuracy', 'ትክክለኛነት')],
                         [[a, rn(np.mean(res[a]), 3), rn(min(res[a]), 3), rn(max(res[a]), 3), rn(np.mean(res[a]) / np.sqrt(h2), 3)] for a in al])}
    pred, y, d = ns['pred'], ns['y'], ns['d']
    r = np.corrcoef(pred, y)[0, 1]; b, a = np.polyfit(pred, y, 1); xr = np.array([pred.min(), pred.max()])
    sc = {'type': 'xy', 'title': bi(f'Cross-validated GEBV vs observed trait (alpha = {best})', f'Cross-validated GEBV ከታየው ባሕሪ ጋር (alpha = {best})'),
          'note': bi(f'Each animal was predicted by a model that never saw it. r = {r:.2f}; regression slope of observed on predicted = {b:.2f} (1 = unbiased).',
                     f'እያንዳንዱ እንስሳ ፈጽሞ ባላየው ሞዴል ተተንብዮአል። r = {r:.2f}፤ የታየው በተተነበየው ላይ ያለ regression slope = {b:.2f} (1 = ያልተዛባ)።'),
          'x': {'label': bi('Predicted (GEBV)', 'የተተነበየ (GEBV)')}, 'y': {'label': bi('Observed trait', 'የታየ ባሕሪ')},
          'series': [{'name': bi('Animals', 'እንስሳት'), 'slot': 1, 'kind': 'points', 'size': 3.2, 'x': rn(pred, 2), 'y': rn(y, 2),
                      'tip': [f'{yy:.2f} observed, {pp:.2f} predicted|{i}' for i, pp, yy in zip(d.id, pred, y)]},
                     {'name': bi(f'Regression line (slope {b:.2f})', f'Regression መስመር (slope {b:.2f})'), 'slot': 2, 'kind': 'line', 'x': rn(xr, 2), 'y': rn(a + b * xr, 2)}],
          'table': tbl([bi('Statistic', 'ስታቲስቲክ'), bi('Value', 'እሴት')], [['n', len(y)], ['r(ŷ, y)', rn(r, 3)], [bi('Slope', 'Slope'), rn(b, 3)], ['h²', h2], [bi('Accuracy', 'ትክክለኛነት'), rn(r / np.sqrt(h2), 3)]])}
    return [line, sc]


# ---------------- S7: breeder's equation economics ----------------
def viz_gain(ns):
    d, cum = ns['d'], ns['cum']
    short = {'Phenotypic selection on own weight': bi('Phenotypic', 'Phenotypic'), 'BLUP with relatives (records + pedigree)': bi('BLUP + pedigree', 'BLUP + pedigree'),
             'Genomic selection on young rams': bi('Genomic', 'Genomic')}
    bar = {'type': 'hbar', 'title': bi('Genetic gain per year, ΔG = i · r · σA / L', 'በዓመት የዘረመል ትርፍ፣ ΔG = i · r · σA / L'),
           'note': bi('σA = 1.75 kg for all three; they differ in intensity i, accuracy r and generation interval L (years).', 'σA = 1.75 kg ለሦስቱም፤ በመጠን i፣ በትክክለኛነት r እና በትውልድ ልዩነት L (ዓመታት) ይለያያሉ።'),
           'x': {'label': bi('kg of weaning weight per year', 'በዓመት የጡት መጣያ ክብደት kg')}, 'fmt': 2,
           'cats': [bi(f"{short[s]['en']} (i {i:.2f}, r {r_:.2f}, L {L:.1f})", f"{short[s]['am']} (i {i:.2f}, r {r_:.2f}, L {L:.1f})") for s, i, r_, L in zip(d.scenario, d.intensity_i, d.accuracy_r, d.generation_interval_yr)],
           'series': [{'name': bi('ΔG per year', 'ΔG በዓመት'), 'slot': 1, 'v': rn(d.gain_kg_per_yr, 2)}],
           'table': tbl([bi('Strategy', 'ስትራቴጂ'), 'i', 'r', 'L', bi('ΔG (kg/yr)', 'ΔG (kg/ዓመት)'), bi('Extra cost (birr/yr)', 'ተጨማሪ ወጪ (ብር/ዓመት)')],
                        [[s, i, r_, L, rn(g, 3), int(c)] for s, i, r_, L, g, c in zip(d.scenario, d.intensity_i, d.accuracy_r, d.generation_interval_yr, d.gain_kg_per_yr, d.extra_cost_birr_per_year)])}
    yrs = list(range(1, 11))
    lines = {'type': 'xy', 'title': bi('Cumulative net benefit over 10 years', 'በ10 ዓመታት ድምር የተጣራ ጥቅም'),
             'note': bi('Year t revenue gain = t × ΔG × 8,000 lambs × 120 birr/kg, minus the yearly extra cost. No lag, no discounting.',
                        'የዓመት t ገቢ ትርፍ = t × ΔG × 8,000 ጠቦቶች × 120 ብር/kg፣ ዓመታዊ ተጨማሪ ወጪ ተቀንሶ። መዘግየትና discounting የለም።'),
             'x': {'label': bi('Year', 'ዓመት'), 'int': True, 'min': 1, 'max': 10}, 'y': {'label': bi('Million birr', 'ሚሊዮን ብር'), 'min': 0},
             'rpad': 122,
             'series': [{'name': short[s], 'slot': k + 1, 'kind': 'line', 'markers': True, 'x': yrs, 'y': rn(cum[s] / 1e6, 2), 'endlabel': short[s],
                         'tip': [f'{v / 1e6:.2f} M birr|{short[s]["en"]} · year {t}' for t, v in zip(yrs, cum[s])]} for k, s in enumerate(cum)],
             'table': tbl([bi('Year', 'ዓመት')] + [short[s] for s in cum], [[t] + [rn(cum[s][t - 1] / 1e6, 2) for s in cum] for t in yrs])}
    return [bar, lines]


def viz_alloc(ns):
    t = ns['t']
    series = []
    for y, slot in [(1, 1), (2, 2), (3, 3)]:
        sub = t[t.years == y].sort_values('H2', ascending=False).groupby('locations').head(1).sort_values('locations')
        series.append({'name': bi(f'{y} year{"s" if y > 1 else ""}', f'{y} ዓመት'), 'slot': slot, 'kind': 'line', 'markers': True,
                       'x': rn(sub.locations, 0), 'y': rn(sub.H2, 3), 'endlabel': bi(f'{y} yr', f'{y} ዓመት'),
                       'tip': [f'H² {h:.3f}|{l} loc × {y} yr × {r_} reps · {c:,} birr' for l, r_, h, c in zip(sub.locations, sub.reps, sub.H2, sub.cost_birr)]})
    b = t.iloc[0]; c = t[(t.locations == 3) & (t.years == 1) & (t.reps == 3)].iloc[0]
    series.append({'name': bi('Marked designs', 'ምልክት የተደረገባቸው ንድፎች'), 'slot': 0, 'kind': 'points', 'size': 5, 'legend': False,
                   'x': [int(b.locations), int(c.locations)], 'y': [rn(b.H2), rn(c.H2)],
                   'labels': [[0, bi(f'best: {int(b.locations)}×{int(b.years)}×{int(b.reps)}', f'ምርጥ፡ {int(b.locations)}×{int(b.years)}×{int(b.reps)}')], [1, bi('common: 3×1×3', 'የተለመደ፡ 3×1×3'), 'below']],
                   'tip': [f'H² {b.H2:.3f}|best design', f'H² {c.H2:.3f}|3 loc × 1 yr × 3 reps']})
    return [{'type': 'xy', 'title': bi('Heritability of entry means vs number of locations', 'የዝርያ አማካዮች heritability ከቦታዎች ብዛት ጋር'),
             'note': bi('Each point uses the most replicates the 30,000-birr budget allows. Years and locations raise H² far more than replicates, because σ²GL, σ²GY and σ²GLY are larger than plot error.',
                        'እያንዳንዱ ነጥብ የ30,000 ብር በጀቱ የሚፈቅደውን ከፍተኛ ድግግሞሽ ይጠቀማል። ዓመታትና ቦታዎች H²ን ከድግግሞሾች በብዙ እጥፍ ያሳድጋሉ፤ σ²GL፣ σ²GY እና σ²GLY ከማሳ ስህተት ስለሚበልጡ።'),
             'x': {'label': bi('Number of locations', 'የቦታዎች ብዛት'), 'int': True, 'min': 1, 'max': 12}, 'y': {'label': bi('H² of the entry mean', 'የዝርያ አማካይ H²'), 'min': 0, 'max': 1},
             'rpad': 46, 'series': series,
             'table': tbl([bi('Locations', 'ቦታዎች'), bi('Years', 'ዓመታት'), bi('Reps', 'ድግግሞሾች'), bi('Plots', 'ማሳዎች'), bi('Cost (birr)', 'ወጪ (ብር)'), 'H²'],
                          [[int(x.locations), int(x.years), int(x.reps), int(x.plots), int(x.cost_birr), rn(x.H2, 3)] for x in t.head(10).itertuples()])}]


def viz_index(ns):
    t, a, r_idx, r_milk = ns['t'], ns['a'], ns['r_idx'], ns['r_milk']
    names = [bi('Milk', 'ወተት'), bi('Fat %', 'ስብ %'), bi('Calving interval', 'የመውለጃ ልዩነት')]
    vi, vm = list(r_idx * a), list(r_milk * a)
    spec = {'type': 'hbar', 'title': bi('Economic response per generation, by trait (birr per cow)', 'በትውልድ የኢኮኖሚ ምላሽ በባሕሪ (ብር በላም)'),
            'note': bi('Response in each trait × its economic value. Negative = money lost (a longer calving interval or lower fat).',
                       'በእያንዳንዱ ባሕሪ ያለ ምላሽ × የኢኮኖሚ ዋጋው። አሉታዊ = የጠፋ ገንዘብ (ረዥም የመውለጃ ልዩነት ወይም ዝቅተኛ ስብ)።'),
            'x': {'label': bi('Birr per cow per generation', 'ብር በላም በትውልድ')}, 'fmt': 0,
            'cats': names + [bi('Total', 'ድምር')],
            'series': [{'name': bi('Economic selection index', 'የኢኮኖሚ selection index'), 'slot': 1, 'v': rn(vi + [sum(vi)], 0)},
                       {'name': bi('Selection on milk only', 'በወተት ብቻ ምርጫ'), 'slot': 2, 'v': rn(vm + [sum(vm)], 0)}],
            'table': tbl([bi('Trait', 'ባሕሪ'), bi('Response: index', 'ምላሽ፡ index'), bi('Response: milk only', 'ምላሽ፡ ወተት ብቻ'), bi('Value (birr/unit)', 'ዋጋ (ብር/መለኪያ)'), bi('Birr: index', 'ብር፡ index'), bi('Birr: milk only', 'ብር፡ ወተት ብቻ')],
                         [[t.trait[k], rn(r_idx[k], 3), rn(r_milk[k], 3), a[k], rn(vi[k], 0), rn(vm[k], 0)] for k in range(3)] + [[bi('Total', 'ድምር'), '', '', '', rn(sum(vi), 0), rn(sum(vm), 0)]])}
    return [spec]
