from mlib import *

# ============================ LEVEL 6: Researcher ============================
L6 = []
L6.append({
 'why': B('Theory explains when learning works, and causal thinking stops us confusing correlation with effect.', 'ቲዎሪ መማር መቼ እንደሚሠራ ያብራራል፤ የምክንያት አስተሳሰብ ተዛምዶን ከውጤት ጋር እንዳናምታታ ያደርገናል።'),
 'dg': [tree(B('A confounder on the farm', 'በእርሻ ላይ ያለ confounder'), N('Wealth (confounder)', 'ሀብት (confounder)'),
             [{'t': B('→ buys more fertilizer', '→ ብዙ ማዳበሪያ ይገዛል')}, {'t': B('→ has better land and irrigation → higher yield', '→ የተሻለ መሬትና መስኖ አለው → ከፍተኛ ምርት')}],
             note=B('Fertilizer and yield move together partly because wealth drives both. Adjust for wealth, or randomise, to see fertilizer’s own effect.', 'ማዳበሪያና ምርት በከፊል አብረው የሚንቀሳቀሱት ሀብት ሁለቱንም ስለሚነዳ ነው። የማዳበሪያውን የራሱን ውጤት ለማየት ሀብትን አስተካክል ወይም በዘፈቀደ መድብ።')),
        compare(B('Bias–variance', 'Bias–variance'),
                [col(B('High bias', 'ከፍተኛ bias'), ['model too simple', 'misses real patterns'], ['ሞዴሉ በጣም ቀላል', 'እውነተኛ ንድፎችን ያመልጣል'], 'bad'),
                 col(B('High variance', 'ከፍተኛ variance'), ['model too flexible', 'fits noise, fails on new data'], ['ሞዴሉ በጣም ተለዋዋጭ', 'ጫጫታን ይገጥማል፣ በአዲስ ዳታ ይወድቃል'], 'bad'),
                 col(B('Balance', 'ሚዛን'), ['regularisation, more data, validation'], ['regularisation፣ ብዙ ዳታ፣ validation'], 'good')])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(8); n = 2000
wealth = rng.normal(0, 1, n)
fert = 50 + 20 * wealth + rng.normal(0, 10, n)                  # kg/ha: richer farms buy more
yield_ = 1.5 + 0.010 * fert + 0.40 * wealth + rng.normal(0, 0.3, n)   # true fertilizer effect: 0.010 t per kg
naive = np.polyfit(fert, yield_, 1)[0]
X = np.column_stack([np.ones(n), fert, wealth])
adjusted = np.linalg.lstsq(X, yield_, rcond=None)[0][1]
print(f"true effect 0.010 t/ha per kg | naive estimate {naive:.3f} | adjusted for wealth {adjusted:.3f}")
''', B('Confounding: the naive estimate is badly wrong', 'Confounding፡ ቀላሉ ግምት በጣም ስህተት ነው')),
 'qa': B(['It may have memorised noise (high variance) or found patterns that do not hold in new conditions; only performance on new data shows real learning.', 'A variable that affects both the cause and the outcome, such as farm wealth affecting both fertilizer use and yield.', 'MCMC when you need accurate posteriors and can afford the time; variational inference when data or models are large and a fast approximation is enough.'],
         ['ጫጫታን አስታውሶ ሊሆን ይችላል (ከፍተኛ variance) ወይም በአዲስ ሁኔታዎች የማይቆሙ ንድፎችን አግኝቶ ሊሆን ይችላል፤ እውነተኛ መማርን የሚያሳየው በአዲስ ዳታ ላይ ያለ አፈጻጸም ብቻ ነው።', 'መንስኤውንም ውጤቱንም የሚነካ variable፣ ለምሳሌ የእርሻ ሀብት በማዳበሪያ አጠቃቀምና በምርት ላይ።', 'ትክክለኛ posteriors ሲያስፈልጉና ጊዜ ሲኖር MCMC፤ ዳታ ወይም ሞዴሎች ትልቅ ሲሆኑና ፈጣን ግምት በቂ ሲሆን variational inference።'])})
L6.append({
 'why': B('Modern deep learning rests on a few ideas: good optimisers, regularisation and attention.', 'ዘመናዊ deep learning በጥቂት ሐሳቦች ላይ ያርፋል፡ ጥሩ optimisers፣ regularisation እና attention።'),
 'dg': [flow(B('Self-attention in one picture', 'Self-attention በአንድ ሥዕል'),
             [N('Each word → Q, K, V', 'እያንዳንዱ ቃል → Q፣ K፣ V', 'query, key, value vectors', 'query፣ key፣ value vectors'), N('Scores = Q·K / √d', 'Scores = Q·K / √d', 'how relevant is each other word?', 'እያንዳንዱ ሌላ ቃል ምን ያህል ተገቢ ነው?'), N('softmax → weights', 'softmax → weights', 'they sum to 1', 'ድምራቸው 1 ነው'), N('Output = weights · V', 'ውጤት = weights · V', 'a context-aware word', 'አውዱን የሚያውቅ ቃል', hl=True)]),
        flow(B('How diffusion generates an image', 'diffusion ምስልን እንዴት እንደሚፈጥር'),
             [N('Pure noise', 'ንጹሕ ጫጫታ'), N('Remove a little noise', 'ትንሽ ጫጫታ አስወግድ', 'a network predicts the noise', 'network ጫጫታውን ይተነብያል'), N('Repeat ~50 steps', '~50 እርምጃዎች ድገም'), N('Image', 'ምስል', hl=True)])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(0)
words = ["the", "cow", "gives", "milk"]
d = 8; E = rng.normal(0, 1, (4, d))
Wq, Wk, Wv = (rng.normal(0, 1 / np.sqrt(d), (d, d)) for _ in range(3))
Q, K, V = E @ Wq, E @ Wk, E @ Wv
scores = Q @ K.T / np.sqrt(d)
weights = np.exp(scores - scores.max(1, keepdims=True)); weights /= weights.sum(1, keepdims=True)
print("attention of 'milk' to each word:", {w: round(float(a), 2) for w, a in zip(words, weights[3])})

def train(opt, steps=200):       # minimise an elongated bowl f = 50 x^2 + y^2
    p = np.array([1.0, 1.0]); m = v = np.zeros(2)
    for t in range(1, steps + 1):
        g = np.array([100 * p[0], 2 * p[1]])
        if opt == "sgd":
            p = p - 0.009 * g
        else:                      # Adam: per-parameter step sizes
            m = 0.9 * m + 0.1 * g; v = 0.999 * v + 0.001 * g * g
            p = p - 0.05 * (m / (1 - 0.9 ** t)) / (np.sqrt(v / (1 - 0.999 ** t)) + 1e-8)
    return 50 * p[0] ** 2 + p[1] ** 2
print(f"loss after 200 steps: SGD {train('sgd'):.4f}, Adam {train('adam'):.6f}")
''', B('Attention weights from scratch, and Adam vs SGD', 'attention weightsን ከመነሻ፣ እና Adam vs SGD'),
     B('The weights here come from random, untrained matrices; after training, "milk" would attend strongly to "cow" and "gives".', 'እዚህ ያሉት weights ከዘፈቀደ፣ ካልሰለጠኑ ማትሪክሶች የመጡ ናቸው፤ ከሥልጠና በኋላ «milk» ለ«cow» እና ለ«gives» ጠንካራ ትኩረት ይሰጣል።')),
 'qa': B(['Adam gives each parameter its own step size from running averages of the gradient and its square, so flat and steep directions both make progress; plain SGD uses one step size for all.', 'How much one token should take information from another token, after softmax: a weight between 0 and 1.', 'It starts from random noise and repeatedly removes a little predicted noise with a trained network until an image appears.'],
         ['Adam ለእያንዳንዱ parameter ከgradient እና ከካሬው ተንቀሳቃሽ አማካዮች የራሱን የእርምጃ መጠን ይሰጣል፤ ስለዚህ ጠፍጣፋም ቁልቁልም አቅጣጫዎች ይራመዳሉ፤ ቀላል SGD ለሁሉም አንድ የእርምጃ መጠን ይጠቀማል።', 'አንድ token ከሌላ token ምን ያህል መረጃ መውሰድ እንዳለበት፣ ከsoftmax በኋላ፡ በ0 እና በ1 መካከል ያለ weight።', 'ከዘፈቀደ ጫጫታ ይጀምራል፤ በሰለጠነ network የተተነበየውን ትንሽ ጫጫታ ደጋግሞ ያስወግዳል፤ ምስል እስኪታይ ድረስ።'])})
L6.append({
 'why': B('Reinforcement learning learns decisions from rewards: useful for irrigation, energy and logistics, with care.', 'reinforcement learning ውሳኔዎችን ከሽልማቶች ይማራል፡ ለመስኖ፣ ለኃይልና ለሎጂስቲክስ ጠቃሚ ነው፣ በጥንቃቄ።'),
 'dg': [cycle(B('The agent–environment loop', 'የagent–environment ዑደት'),
              [N('State', 'ሁኔታ', 'soil is dry', 'አፈሩ ደረቅ ነው'), N('Action', 'ተግባር', 'irrigate', 'አጠጣ'), N('Reward', 'ሽልማት', '+ growth − water cost', '+ ዕድገት − የውሃ ወጪ'), N('New state', 'አዲስ ሁኔታ', hl=True)]),
        compare(B('Reward design', 'የሽልማት ንድፍ'),
                [col(B('Bad reward', 'መጥፎ ሽልማት'), ['+1 per litre pumped', '→ agent floods the field'], ['በአንድ የተቀዳ ሊትር +1', '→ agentኡ ማሳውን ያጥለቀልቃል'], 'bad'),
                 col(B('Better reward', 'የተሻለ ሽልማት'), ['crop growth − water cost − penalty if soil is waterlogged'], ['የሰብል ዕድገት − የውሃ ወጪ − አፈሩ ውሃ ከጠገበ ቅጣት'], 'good')])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(3)
states = ["dry", "ok", "wet"]; actions = ["wait", "irrigate"]
def step(s, a):
    if a == 1: s2 = min(s + 1, 2); cost = 1.0
    else:      s2 = max(s - (rng.random() < 0.6), 0); cost = 0.0      # soil dries 60% of days
    reward = {0: -2.0, 1: 3.0, 2: -1.0}[s2] - cost                      # growth is best when "ok"
    return s2, reward
Q = np.zeros((3, 2)); s = 1; gamma, alpha = 0.9, 0.1
for t in range(20000):
    a = rng.integers(2) if rng.random() < 0.1 else int(Q[s].argmax())  # explore 10%
    s2, r = step(s, a)
    Q[s, a] += alpha * (r + gamma * Q[s2].max() - Q[s, a])             # Q-learning update
    s = s2
for i, name in enumerate(states):
    print(f"soil {name:4s}: wait {Q[i,0]:6.2f}  irrigate {Q[i,1]:6.2f}  -> learned: {actions[Q[i].argmax()]}")
''', B('Q-learning a simple irrigation rule', 'ቀላል የመስኖ ሕግን በQ-learning መማር'),
     B('The learned policy (irrigate when dry, wait otherwise) is the rule an agronomist would write: when a simple rule is known, use it; RL pays off when the system is too complex for rules.', 'የተማረው ፖሊሲ (ደረቅ ሲሆን አጠጣ፣ ካልሆነ ጠብቅ) አንድ አግሮኖሚስት የሚጽፈው ሕግ ነው፡ ቀላል ሕግ ሲታወቅ ተጠቀምበት፤ RL የሚያዋጣው ሥርዓቱ ለሕጎች በጣም ውስብስብ ሲሆን ነው።')),
 'qa': B(['It sets how much future rewards count compared with immediate ones (γ near 1 = plan far ahead); it also keeps long-run sums finite.', 'The agent maximises exactly what is rewarded, so it finds loopholes (for example pumping water to earn points) that defeat the real goal.', 'When the system is well understood, data are scarce, or mistakes are costly: a tested expert rule is cheaper, safer and easier to explain.'],
         ['የወደፊት ሽልማቶች ከአሁኖቹ ጋር ሲነጻጸሩ ምን ያህል እንደሚቆጠሩ ያስቀምጣል (γ ወደ 1 ሲቀርብ = ሩቅ ማቀድ)፤ የረጅም ጊዜ ድምሮችንም ውሱን ያደርጋል።', 'agentኡ የሚሸለመውን በትክክል ከፍ ያደርጋል፤ ስለዚህ እውነተኛውን ግብ የሚያከሽፉ ቀዳዳዎችን ያገኛል (ለምሳሌ ነጥብ ለማግኘት ውሃ መቅዳት)።', 'ሥርዓቱ በደንብ ሲታወቅ፣ ዳታ ጥቂት ሲሆን፣ ወይም ስህተቶች ውድ ሲሆኑ፡ የተፈተነ የባለሙያ ሕግ ርካሽ፣ ደህንነቱ የተጠበቀና ለማብራራት ቀላል ነው።'])})
L6.append({
 'why': B('Research data outgrow laptops; clusters, workflows and containers make big analyses possible and repeatable.', 'የምርምር ዳታ ከላፕቶፖች ያልፋል፤ clusters፣ workflows እና containers ትላልቅ ትንተናዎችን የሚቻሉና የሚደገሙ ያደርጋሉ።'),
 'dg': [flow(B('Running on a cluster', 'በcluster ላይ ማስኬድ'),
             [N('Login node', 'Login node', 'edit, submit; never compute here', 'አስተካክል፣ አስገባ፤ እዚህ በፍጹም አታስላ'), N('sbatch job.sh', 'sbatch job.sh'), N('SLURM queue', 'የSLURM ወረፋ', 'waits for free nodes', 'ነጻ nodes ይጠብቃል'), N('Compute nodes', 'Compute nodes', 'array: 100 samples in parallel', 'array፡ 100 ናሙናዎች በትይዩ', hl=True)]),
        compare(B('Shell script vs workflow manager', 'Shell script vs workflow manager'),
                [col(B('Shell script', 'Shell script'), ['reruns everything after a failure', 'hard to parallelise and track'], ['ከውድቀት በኋላ ሁሉንም እንደገና ያስኬዳል', 'ለትይዩና ለመከታተል ከባድ'], 'bad'),
                 col(B('Snakemake / Nextflow', 'Snakemake / Nextflow'), ['knows which outputs exist, resumes', 'runs steps in parallel, logs everything, uses containers'], ['የትኞቹ ውጤቶች እንዳሉ ያውቃል፣ ይቀጥላል', 'እርምጃዎችን በትይዩ ያስኬዳል፣ ሁሉንም ይመዘግባል፣ containers ይጠቀማል'], 'good')])],
 'ex': ex_code('SLURM job array (bash)', '''
#!/bin/bash
#SBATCH --job-name=align
#SBATCH --array=1-100            # 100 tasks, one per sample
#SBATCH --cpus-per-task=8
#SBATCH --mem=16G
#SBATCH --time=04:00:00
#SBATCH --output=logs/%x_%A_%a.out

SAMPLE=$(sed -n "${SLURM_ARRAY_TASK_ID}p" samples.txt)     # line N of the sample list
apptainer exec tools.sif \\
  bwa mem -t $SLURM_CPUS_PER_TASK ref.fa reads/${SAMPLE}_R1.fq.gz reads/${SAMPLE}_R2.fq.gz \\
  | apptainer exec tools.sif samtools sort -o bam/${SAMPLE}.bam
''', B('Align 100 samples with one job array', '100 ናሙናዎችን በአንድ job array አሰልፍ'),
     B('Submit with sbatch align.sh; check with squeue -u $USER. The container (tools.sif) fixes the software versions.', 'በsbatch align.sh አስገባ፤ በsqueue -u $USER ፈትሽ። containerኡ (tools.sif) የሶፍትዌር ስሪቶችን ያስተካክላል።')),
 'qa': B(['It submits many similar tasks at once (for example one per sample), each with its own task ID, so they run in parallel under one job.', 'It tracks dependencies and finished outputs, resumes after failures, runs independent steps in parallel and records exactly what was run.', 'It packages the exact software and versions, so the analysis runs the same on any machine and years later.'],
         ['ብዙ ተመሳሳይ ተግባራትን በአንድ ጊዜ ያስገባል (ለምሳሌ ለእያንዳንዱ ናሙና አንድ)፤ እያንዳንዱ የራሱ task ID አለው፤ ስለዚህ በአንድ job ሥር በትይዩ ይሠራሉ።', 'ጥገኝነቶችንና የተጠናቀቁ ውጤቶችን ይከታተላል፣ ከውድቀት በኋላ ይቀጥላል፣ ገለልተኛ እርምጃዎችን በትይዩ ያስኬዳል፣ የተሠራውንም በትክክል ይመዘግባል።', 'ትክክለኛውን ሶፍትዌርና ስሪቶቹን ያሽጋል፤ ስለዚህ ትንተናው በማንኛውም ማሽን ላይና ከዓመታት በኋላም በተመሳሳይ ይሠራል።'])})
L6.append({
 'why': B('Correct statistics separate real findings from noise and give results others can trust.', 'ትክክለኛ ስታቲስቲክስ እውነተኛ ግኝቶችን ከጫጫታ ይለያል፤ ሌሎች ሊያምኗቸው የሚችሉ ውጤቶችንም ይሰጣል።'),
 'dg': [tree(B('Data with structure need a mixed model', 'መዋቅር ያለው ዳታ mixed model ይፈልጋል'), N('Region', 'ክልል'),
             [{'t': B('Herd A (random effect)', 'መንጋ A (random effect)'), 'kids': [{'t': B('cow 1, cow 2, cow 3', 'ላም 1፣ ላም 2፣ ላም 3')}]},
              {'t': B('Herd B (random effect)', 'መንጋ B (random effect)'), 'kids': [{'t': B('cow 4, cow 5', 'ላም 4፣ ላም 5')}]}],
             note=B('Cows in one herd share feed and management, so they are not independent. A herd random effect accounts for this.', 'በአንድ መንጋ ያሉ ላሞች መኖና አያያዝ ይጋራሉ፤ ስለዚህ ገለልተኛ አይደሉም። የመንጋ random effect ይህን ይይዛል።')),
        flow(B('Power analysis before the experiment', 'ከሙከራው በፊት የpower ትንተና'),
             [N('Smallest effect worth finding', 'ሊገኝ የሚገባው ትንሹ ውጤት', '0.3 t/ha', '0.3 t/ha'), N('Variation (SD)', 'ልዩነት (SD)', '0.5 t/ha', '0.5 t/ha'), N('α = 0.05, power = 0.8', 'α = 0.05፣ power = 0.8'), N('Plots needed', 'የሚያስፈልጉ ማሳዎች', hl=True)])],
 'ex': ex_py('''
import numpy as np
from scipy import stats
diff, sd, alpha = 0.3, 0.5, 0.05                       # t/ha
for n in [10, 20, 30, 45, 60]:                          # plots per treatment
    df = 2 * n - 2; ncp = diff / (sd * np.sqrt(2 / n))
    tcrit = stats.t.ppf(1 - alpha / 2, df)
    power = 1 - stats.nct.cdf(tcrit, df, ncp) + stats.nct.cdf(-tcrit, df, ncp)
    print(f"n = {n:2d} plots per treatment -> power {power:.2f}")
rng = np.random.default_rng(1)                          # check one case by simulation
sims = [stats.ttest_ind(rng.normal(0, sd, 45), rng.normal(diff, sd, 45)).pvalue < alpha for _ in range(4000)]
print(f"simulation check for n = 45: power {np.mean(sims):.2f}")
''', B('How many plots do you need?', 'ስንት ማሳዎች ያስፈልጉሃል?')),
 'qa': B(['Animals in the same herd share conditions, so their records are correlated; a random effect models this and gives honest standard errors and conclusions that extend to other herds.', 'Among all the results you call significant, about 5% are expected to be false positives.', 'When the likelihood is too complex to write down but you can simulate data from the model, for example demographic history from genomes.'],
         ['በአንድ መንጋ ያሉ እንስሳት ሁኔታዎችን ይጋራሉ፤ ስለዚህ መዝገቦቻቸው ይዛመዳሉ፤ random effect ይህን ይቀርጻል፣ ታማኝ standard errors እና ወደ ሌሎች መንጋዎች የሚዘልቁ ድምዳሜዎችን ይሰጣል።', 'ጉልህ ከምትላቸው ውጤቶች ሁሉ መካከል ወደ 5% ገደማ የሐሰት አዎንታዊ እንደሚሆኑ ይጠበቃል።', 'likelihoodኡ ለመጻፍ በጣም ውስብስብ ሲሆን ግን ከሞዴሉ ዳታ ማስመሰል ስትችል፣ ለምሳሌ ከጂኖሞች የሕዝብ ታሪክ።'])})
L6.append({
 'why': B('Good research is a craft: clear questions, fair comparisons, reproducible work and honest publishing.', 'ጥሩ ምርምር ሙያ ነው፡ ግልጽ ጥያቄዎች፣ ፍትሐዊ ንጽጽሮች፣ ሊደገም የሚችል ሥራና ታማኝ ኅትመት።'),
 'dg': [flow(B('From question to paper', 'ከጥያቄ ወደ ጽሑፍ'),
             [N('Literature map', 'የሥነ-ጽሑፍ ካርታ'), N('Hypothesis + baseline', 'መላምት + baseline'), N('Experiments + ablations', 'ሙከራዎች + ablations', 'remove one part at a time', 'አንድ ክፍልን በአንድ ጊዜ አስወግድ'), N('Code + data on GitHub / Zenodo', 'ኮድ + ዳታ በGitHub / Zenodo'), N('Paper', 'ጽሑፍ', hl=True)]),
        compare(B('Is this journal predatory?', 'ይህ ጆርናል አዳኝ (predatory) ነው?'),
                [col(B('Warning signs', 'የማስጠንቀቂያ ምልክቶች'), ['spam e-mails promising fast acceptance', 'fee before review, fake impact factor', 'not indexed in Scopus, Web of Science or DOAJ'], ['ፈጣን ተቀባይነትን የሚያረጋግጡ spam ኢሜሎች', 'ከግምገማ በፊት ክፍያ፣ የሐሰት impact factor', 'በScopus፣ Web of Science ወይም DOAJ ያልተመዘገበ'], 'bad'),
                 col(B('Good signs', 'ጥሩ ምልክቶች'), ['real editorial board you can verify', 'clear peer-review process', 'indexed; a recognised society or publisher'], ['ልታረጋግጠው የምትችለው እውነተኛ የአርታኢ ቦርድ', 'ግልጽ የአቻ ግምገማ ሂደት', 'የተመዘገበ፤ የታወቀ ማኅበር ወይም አሳታሚ'], 'good')])],
 'ex': ex_code('CITATION.cff (YAML)', '''
cff-version: 1.2.0
message: "If you use this software, please cite it as below."
title: "Teff yield model"
version: 1.0.0
date-released: 2026-11-15
doi: 10.5281/zenodo.0000000          # from the Zenodo release
authors:
  - family-names: Bitew
    given-names: Mulusew Kassa
    orcid: "https://orcid.org/0000-0001-6223-0037"
    affiliation: "University of Molise, Italy; Debre Markos University, Ethiopia"
repository-code: "https://github.com/Muler-21/teff-yield-model"
license: CC-BY-4.0
''', B('Make your code citable', 'ኮድህን የሚጠቀስ አድርግ'),
     B('Reproducibility checklist: code in Git with a release, data on Zenodo with a DOI, fixed random seeds, a container or environment file, and a README that reproduces every figure.', 'የመደገም ማረጋገጫ ዝርዝር፡ ኮድ በGit ከrelease ጋር፣ ዳታ በZenodo ከDOI ጋር፣ ቋሚ random seeds፣ container ወይም environment ፋይል፣ እና እያንዳንዱን figure የሚደግም README።')),
 'qa': B(['To show which parts of a method actually cause the improvement, by removing or replacing one component at a time and measuring the change.', 'Code (versioned), data or how to obtain it, exact software environment, parameters and random seeds, and the steps that produce each figure and table.', 'Unsolicited e-mails, promises of very fast acceptance, fees before review, unverifiable editors or impact factors, and no listing in Scopus, Web of Science or DOAJ; check before submitting.'],
         ['የአንድ ዘዴ የትኞቹ ክፍሎች በእርግጥ መሻሻሉን እንደሚያመጡ ለማሳየት፣ አንድን ክፍል በአንድ ጊዜ በማስወገድ ወይም በመተካትና ለውጡን በመለካት።', 'ኮድ (ስሪት ያለው)፣ ዳታ ወይም እንዴት እንደሚገኝ፣ ትክክለኛ የሶፍትዌር አካባቢ፣ parameters እና random seeds፣ እንዲሁም እያንዳንዱን figure እና ሰንጠረዥ የሚያፈሩ እርምጃዎች።', 'ያልተጠየቁ ኢሜሎች፣ በጣም ፈጣን ተቀባይነት የሚሉ ቃሎች፣ ከግምገማ በፊት ክፍያ፣ ሊረጋገጡ የማይችሉ አርታኢዎች ወይም impact factors፣ እና በScopus፣ Web of Science ወይም DOAJ አለመመዝገብ፤ ከማስገባትህ በፊት ፈትሽ።'])})
emit(6, L6, 6)

# ============================ LEVEL 7: Top Scientist ============================
L7 = []
L7.append({
 'why': B('Understanding how LLMs are built shows where they fail for African languages and how to fix it.', 'LLMs እንዴት እንደሚገነቡ መረዳት ለአፍሪካ ቋንቋዎች የት እንደሚወድቁና እንዴት እንደሚስተካከሉ ያሳያል።'),
 'dg': [flow(B('How an LLM is made', 'LLM እንዴት እንደሚሠራ'),
             [N('Curated text', 'የተመረጠ ጽሑፍ', 'quality, licences, consent', 'ጥራት፣ ፈቃዶች፣ ስምምነት'), N('Tokeniser', 'Tokeniser', 'text → token IDs', 'ጽሑፍ → token IDs'), N('Pre-training', 'Pre-training', 'predict the next token', 'ቀጣዩን token ተንብይ'), N('Instruction + preference tuning', 'Instruction + preference tuning', 'SFT, RLHF / DPO', 'SFT፣ RLHF / DPO'), N('Evaluation', 'ግምገማ', 'including Amharic', 'አማርኛን ጨምሮ', hl=True)]),
        compare(B('Why tokenisers matter for Amharic', 'tokenisers ለአማርኛ ለምን አስፈላጊ ናቸው'),
                [col(B('English-heavy tokeniser', 'እንግሊዝኛ የበዛበት tokeniser'), ['each Ge’ez character is 3 bytes in UTF-8', 'words split into many tokens → slower, costlier, shorter context'], ['እያንዳንዱ የግዕዝ ፊደል በUTF-8 3 bytes ነው', 'ቃላት ወደ ብዙ tokens ይከፈላሉ → ቀርፋፋ፣ ውድ፣ አጭር አውድ'], 'bad'),
                 col(B('Tokeniser trained with Amharic', 'ከአማርኛ ጋር የሰለጠነ tokeniser'), ['common syllables and words become single tokens', 'fair cost and quality'], ['የተለመዱ ፊደላትና ቃላት ነጠላ tokens ይሆናሉ', 'ፍትሐዊ ወጪና ጥራት'], 'good')])],
 'ex': ex_py('''
pairs = [("water", "ውሃ"), ("school", "ትምህርት ቤት"), ("agriculture", "ግብርና"), ("Ethiopia", "ኢትዮጵያ")]
print("word          chars  UTF-8 bytes")
for en, am in pairs:
    print(f"{en:12s} {len(en):5d} {len(en.encode()):7d}   |  {am:10s} {len(am):3d} chars {len(am.encode()):3d} bytes")
# A byte-level tokeniser that never saw Amharic needs up to one token per byte.
# Compute-optimal training (Chinchilla, 2022): about 20 training tokens per parameter.
for params in [1e9, 7e9, 70e9]:
    print(f"{params / 1e9:4.0f}B parameters -> about {20 * params / 1e12:.2f} trillion tokens")
''', B('Bytes per word, and the scaling-law rule of thumb', 'በቃል bytes፣ እና የscaling-law ግምታዊ ሕግ'),
     B('The Chinchilla ratio is a rule of thumb for compute-optimal training; many recent models train on far more tokens to make inference cheaper.', 'የChinchilla ጥምርታ ለcompute-optimal ሥልጠና ግምታዊ ሕግ ነው፤ ብዙ የቅርብ ጊዜ ሞዴሎች inferenceን ርካሽ ለማድረግ በብዙ እጥፍ tokens ይሰለጥናሉ።')),
 'qa': B(['Ge’ez characters take 3 bytes each, and tokenisers trained mostly on English split Amharic into many tokens, making models slower, costlier and weaker in Amharic.', 'How loss falls as parameters, data and compute grow, roughly as power laws, which lets you plan model and data size for a budget.', 'The model can learn to please raters (flattery, overconfident or long answers) instead of being correct; it can also lose skills or become over-cautious.'],
         ['የግዕዝ ፊደላት እያንዳንዳቸው 3 bytes ይወስዳሉ፤ በአብዛኛው በእንግሊዝኛ የሰለጠኑ tokenisers አማርኛን ወደ ብዙ tokens ይከፍላሉ፤ ሞዴሎችን በአማርኛ ቀርፋፋ፣ ውድና ደካማ ያደርጋሉ።', 'parameters፣ ዳታና compute ሲያድጉ loss እንዴት እንደሚወርድ፣ በግምት እንደ power laws፤ ይህም ለበጀት የሞዴልና የዳታ መጠን ለማቀድ ያስችላል።', 'ሞዴሉ ትክክል ከመሆን ይልቅ ገምጋሚዎችን ማስደሰት (ማሞካሸት፣ ከመጠን በላይ እርግጠኛ ወይም ረጅም መልሶች) ሊማር ይችላል፤ ክህሎቶችንም ሊያጣ ወይም ከመጠን በላይ ጠንቃቃ ሊሆን ይችላል።'])})
L7.append({
 'why': B('Large models need many GPUs working together, and smart tricks to cut memory, time and cost.', 'ትላልቅ ሞዴሎች አብረው የሚሠሩ ብዙ GPUs እና ማስታወሻን፣ ጊዜንና ወጪን የሚቀንሱ ብልሃቶች ያስፈልጋቸዋል።'),
 'dg': [stack(B('Three ways to split the work', 'ሥራውን የመከፋፈል ሦስት መንገዶች'),
              [N('Data parallel', 'Data parallel', 'each GPU has the whole model, different data', 'እያንዳንዱ GPU ሙሉውን ሞዴል፣ የተለየ ዳታ'), N('Tensor parallel', 'Tensor parallel', 'each layer’s matrices split across GPUs', 'የእያንዳንዱ ንብርብር ማትሪክሶች በGPUs መካከል ይከፈላሉ'), N('Pipeline parallel', 'Pipeline parallel', 'groups of layers on different GPUs: needed when the model does not fit on one GPU', 'የንብርብሮች ቡድኖች በተለያዩ GPUs፡ ሞዴሉ በአንድ GPU ላይ ሳይገጥም ሲቀር ያስፈልጋል')]),
        compare(B('Full fine-tuning vs LoRA', 'ሙሉ fine-tuning vs LoRA'),
                [col(B('Full fine-tuning', 'ሙሉ fine-tuning'), ['update every weight W (d × d)', 'memory for all gradients and optimiser states'], ['እያንዳንዱን weight W (d × d) አዘምን', 'ለሁሉም gradients እና optimiser states ማስታወሻ'], 'bad'),
                 col(B('LoRA', 'LoRA'), ['freeze W, learn W + A·B with rank r', 'A: d × r, B: r × d, r ≈ 8–64'], ['Wን አቀዝቅዝ፣ W + A·Bን በrank r ተማር', 'A፡ d × r፣ B፡ r × d፣ r ≈ 8–64'], 'good')])],
 'ex': ex_py('''
d, layers, r = 4096, 32, 16                     # a 7B-class model, LoRA on 4 attention matrices per layer
full = layers * 4 * d * d
lora = layers * 4 * (d * r + r * d)
print(f"trainable weights: full {full / 1e6:,.0f} M vs LoRA {lora / 1e6:.1f} M ({100 * lora / full:.2f}%)")
params = 7e9
for name, bytes_ in [("fp32", 4), ("fp16", 2), ("int8", 1), ("int4", 0.5)]:
    print(f"{name}: {params * bytes_ / 1e9:5.1f} GB of weights")
''', B('What LoRA and quantisation save', 'LoRA እና quantisation የሚያድኑት'),
     B('Inference is mostly limited by moving weights from memory; fewer bytes per weight means faster tokens and fits on smaller GPUs.', 'inference በአብዛኛው የተገደበው weightsን ከማስታወሻ በማንቀሳቀስ ነው፤ በአንድ weight ያነሱ bytes ፈጣን tokens ማለት ነው፤ በትናንሽ GPUs ላይም ይገጥማል።')),
 'qa': B(['When the model (weights and activations) is too large for one GPU even with data parallelism, so groups of layers must sit on different devices.', 'It freezes the original weights and trains only small low-rank matrices (here under 1% of the weights), cutting memory, compute and storage per fine-tuned version.', 'Fewer bytes must be read from memory for each token, and low-precision arithmetic is faster on modern hardware.'],
         ['ሞዴሉ (weights እና activations) ከdata parallelism ጋርም ለአንድ GPU በጣም ትልቅ ሲሆን፤ ስለዚህ የንብርብሮች ቡድኖች በተለያዩ መሣሪያዎች መቀመጥ አለባቸው።', 'የመጀመሪያዎቹን weights ያቀዘቅዛል፣ ትናንሽ low-rank ማትሪክሶችን ብቻ ያሰለጥናል (እዚህ ከweightsኡ ከ1% በታች)፤ ለእያንዳንዱ fine-tuned ስሪት ማስታወሻን፣ computeን እና ማከማቻን ይቀንሳል።', 'ለእያንዳንዱ token ከማስታወሻ መነበብ ያለባቸው bytes ያነሱ ናቸው፤ ዝቅተኛ ትክክለኛነት ያለው ሒሳብም በዘመናዊ hardware ላይ ፈጣን ነው።'])})
L7.append({
 'why': B('The same transformer ideas now read images, proteins, genomes, cells and satellite data.', 'ያው የtransformer ሐሳቦች አሁን ምስሎችን፣ ፕሮቲኖችን፣ ጂኖሞችን፣ ሴሎችንና የሳተላይት ዳታን ያነባሉ።'),
 'dg': [tree(B('One idea, many data types', 'አንድ ሐሳብ፣ ብዙ የዳታ ዓይነቶች'), N('Self-supervised foundation model', 'Self-supervised foundation model'),
             [{'t': B('Images + text', 'ምስሎች + ጽሑፍ'), 'kids': [{'t': B('vision–language models', 'vision–language models')}]}, {'t': B('Proteins', 'ፕሮቲኖች'), 'kids': [{'t': B('structure, function', 'መዋቅር፣ ተግባር')}]},
              {'t': B('DNA', 'DNA'), 'kids': [{'t': B('regulatory grammar, variant effects', 'የቁጥጥር ሰዋሰው፣ የvariant ውጤቶች')}]}, {'t': B('Satellites', 'ሳተላይቶች'), 'kids': [{'t': B('land use, crop type, yield', 'የመሬት አጠቃቀም፣ የሰብል ዓይነት፣ ምርት')}]}]),
        compare(B('Testing a foundation model fairly', 'foundation modelን በፍትሐዊነት መፈተሽ'),
                [col(B('Unfair', 'ፍትሐዊ ያልሆነ'), ['test regions also in pre-training', 'only European or US benchmarks'], ['የፈተና ክልሎች በpre-training ውስጥም አሉ', 'የአውሮፓ ወይም የአሜሪካ benchmarks ብቻ'], 'bad'),
                 col(B('Fair', 'ፍትሐዊ'), ['held-out African regions, breeds and seasons', 'compare with a simple local baseline'], ['የተለዩ የአፍሪካ ክልሎች፣ ዝርያዎችና ወቅቶች', 'ከቀላል የአካባቢ baseline ጋር አወዳድር'], 'good')])],
 'ex': ex_py('''
from collections import Counter
seq = "ATGGCGTACGTTAGCATGGCGTACGATAGCATGGCG"
k = 6
kmers = [seq[i:i + k] for i in range(len(seq) - k + 1)]          # how DNA models tokenise
print(f"{len(kmers)} overlapping {k}-mers; most common:", Counter(kmers).most_common(3))
masked = seq[:15] + "[MASK]" + seq[16:]
print("training task: predict the hidden base ->", masked)
print("answer:", seq[15], "(the model learns which bases fit each context)")
''', B('How a DNA language model sees a genome', 'DNA language model ጂኖምን እንዴት እንደሚያየው')),
 'qa': B(['Statistical "grammar" of DNA: which sequences tend to occur together, such as motifs, regulatory elements and conserved regions, by predicting hidden bases from context.', 'Their training data under-represent African breeds, crops, soils, landscapes and people, so the patterns differ (distribution shift).', 'Test on held-out local data never seen in pre-training, compare with simple baselines, and report results per region or group with uncertainty.'],
         ['የDNA ስታቲስቲካዊ «ሰዋሰው»፡ የትኞቹ ቅደም ተከተሎች አብረው እንደሚመጡ፣ እንደ motifs፣ የቁጥጥር ክፍሎችና የተጠበቁ ክልሎች፣ የተደበቁ basesን ከአውዱ በመተንበይ።', 'የሥልጠና ዳታቸው የአፍሪካ ዝርያዎችን፣ ሰብሎችን፣ አፈሮችን፣ መልክዓ ምድሮችንና ሰዎችን በበቂ አይወክልም፤ ስለዚህ ንድፎቹ ይለያያሉ (distribution shift)።', 'በpre-training ፈጽሞ ባልታየ የተለየ የአካባቢ ዳታ ላይ ፈትሽ፣ ከቀላል baselines ጋር አወዳድር፣ ውጤቶችን በክልል ወይም በቡድን ከእርግጠኛ አለመሆን ጋር ሪፖርት አድርግ።'])})
L7.append({
 'why': B('Agents act, not just answer, so their power must come with permissions, logs and human approval.', 'agents ይሠራሉ፣ መልስ መስጠት ብቻ አይደለም፤ ስለዚህ ኃይላቸው ከፈቃዶች፣ ከመዝገቦችና ከሰው ማጽደቅ ጋር መምጣት አለበት።'),
 'dg': [cycle(B('The agent loop', 'የagent ዑደት'),
              [N('Plan', 'አቅድ'), N('Act', 'ሥራ', 'call a tool', 'መሣሪያ ጥራ'), N('Observe', 'ተመልከት', 'read the result', 'ውጤቱን አንብብ'), N('Reflect', 'አስብ', 'done? wrong? retry?', 'ተጠናቀቀ? ተሳሳተ? እንደገና?', hl=True)]),
        compare(B('Tool permissions', 'የመሣሪያ ፈቃዶች'),
                [col(B('Allowed automatically', 'በራስ-ሰር የተፈቀደ'), ['read files, search, run tests', 'draft a message'], ['ፋይሎችን ማንበብ፣ መፈለግ፣ ፈተናዎችን ማስኬድ', 'መልእክት ማርቀቅ'], 'good'),
                 col(B('Needs human approval', 'የሰው ማጽደቅ ያስፈልገዋል'), ['send money, e-mail outsiders', 'delete data, change lab instruments', 'anything irreversible'], ['ገንዘብ መላክ፣ ለውጭ ሰዎች ኢሜል መላክ', 'ዳታ መሰረዝ፣ የላብራቶሪ መሣሪያዎችን መቀየር', 'የማይቀለበስ ማንኛውም ነገር'], 'bad')])],
 'ex': ex_py('''
LOG = []
TOOLS = {"lookup_price": {"needs_approval": False, "fn": lambda crop: {"teff": 118, "maize": 38}[crop]},
         "pay_supplier": {"needs_approval": True,  "fn": lambda amount: f"paid {amount} birr"}}
def call(tool, arg, approved_by=None):
    spec = TOOLS[tool]
    if spec["needs_approval"] and not approved_by:
        LOG.append((tool, arg, "BLOCKED: waiting for human approval")); return None
    result = spec["fn"](arg); LOG.append((tool, arg, f"ok -> {result}")); return result
plan = [("lookup_price", "teff"), ("pay_supplier", 118 * 50)]       # the agent's plan
for tool, arg in plan:
    call(tool, arg)
call("pay_supplier", 118 * 50, approved_by="cooperative manager")   # after a person approves
for entry in LOG:
    print(entry)
''', B('A permission gate and an audit log for an agent', 'ለagent የፈቃድ በርና የምርመራ መዝገብ')),
 'qa': B(['Anything irreversible or high-impact: moving money, deleting data, contacting people outside, changing physical equipment, or sharing private data.', 'Compare with a baseline on real tasks: task success rate, time saved, errors caught by reviewers, and cost per task.', 'Errors compound over many steps, costs grow, and the agent can drift from the goal or take unsafe actions unnoticed; use checkpoints, budgets and logs.'],
         ['የማይቀለበስ ወይም ከፍተኛ ተጽዕኖ ያለው ማንኛውም ነገር፡ ገንዘብ ማንቀሳቀስ፣ ዳታ መሰረዝ፣ ከውጭ ሰዎችን ማግኘት፣ አካላዊ መሣሪያን መቀየር፣ ወይም የግል ዳታ ማጋራት።', 'በእውነተኛ ተግባራት ላይ ከbaseline ጋር አወዳድር፡ የተግባር ስኬት መጠን፣ የተቆጠበ ጊዜ፣ በገምጋሚዎች የተያዙ ስህተቶች፣ እና በአንድ ተግባር ወጪ።', 'ስህተቶች በብዙ እርምጃዎች ይደራረባሉ፣ ወጪዎች ያድጋሉ፣ agentኡም ከግቡ ሊርቅ ወይም ሳይታወቅ አደገኛ እርምጃዎችን ሊወስድ ይችላል፤ checkpoints፣ በጀቶችና መዝገቦችን ተጠቀም።'])})
L7.append({
 'why': B('Models reason better when they can think longer and check their own answers with verifiers.', 'ሞዴሎች ረዘም ብለው ሲያስቡና የራሳቸውን መልሶች በverifiers ሲፈትሹ በተሻለ ያስባሉ።'),
 'dg': [flow(B('Search with a verifier', 'ከverifier ጋር መፈለግ'),
             [N('Sample many answers', 'ብዙ መልሶችን ናሙና ውሰድ', 'test-time compute', 'test-time compute'), N('Verifier checks each', 'verifier እያንዳንዱን ይፈትሻል', 'run the code, check the proof', 'ኮዱን አስኪድ፣ ማረጋገጫውን ፈትሽ'), N('Keep a passing answer', 'የሚያልፍ መልስ አቆይ', hl=True)]),
        compare(B('Reward hacking', 'Reward hacking'),
                [col(B('Intended', 'የታሰበው'), ['make the unit tests pass by fixing the bug'], ['ስህተቱን በማስተካከል unit testsን አሳልፍ'], 'good'),
                 col(B('Hacked', 'የተጠለፈው'), ['edit the tests so they always pass', 'high reward, no real progress'], ['ሁልጊዜ እንዲያልፉ ፈተናዎቹን አስተካክል', 'ከፍተኛ ሽልማት፣ ምንም እውነተኛ እድገት የለም'], 'bad')])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(2)
p_correct = 0.30                     # chance one sampled answer is right
trials = 20000
for k in [1, 2, 4, 8, 16]:
    samples = rng.random((trials, k)) < p_correct          # True = a correct answer was sampled
    solved = samples.any(axis=1)                            # a perfect verifier keeps any correct one
    print(f"k = {k:2d} samples: solved {solved.mean():.1%} (theory {1 - (1 - p_correct) ** k:.1%})")
''', B('More samples plus a verifier = more problems solved', 'ብዙ ናሙናዎች ከverifier ጋር = ብዙ የተፈቱ ችግሮች'),
     B('This assumes a perfect verifier. With an imperfect one (for example a learned reward model), more samples can find answers that fool it.', 'ይህ ፍጹም verifier ይገምታል። ፍጹም ባልሆነ (ለምሳሌ የተማረ reward model) ብዙ ናሙናዎች እሱን የሚያታልሉ መልሶችን ሊያገኙ ይችላሉ።')),
 'qa': B(['A procedure that checks whether an answer is correct, such as running tests, a proof checker or exact calculation, independent of the model that wrote it.', 'The model can explore several reasoning paths or answers and keep the best one, so a harder problem gets more effort.', 'When a model gets high reward by exploiting flaws in the reward or tests, rather than doing the intended task.'],
         ['መልሱ ትክክል መሆኑን የሚፈትሽ ሂደት፣ እንደ ፈተናዎችን ማስኬድ፣ የማረጋገጫ ፈታሽ ወይም ትክክለኛ ስሌት፣ ከጻፈው ሞዴል ነጻ የሆነ።', 'ሞዴሉ በርካታ የአስተሳሰብ መንገዶችን ወይም መልሶችን አስሶ ምርጡን ሊያቆይ ይችላል፤ ስለዚህ ከባድ ችግር ብዙ ጥረት ያገኛል።', 'ሞዴል የታሰበውን ተግባር ከማድረግ ይልቅ በሽልማቱ ወይም በፈተናዎቹ ጉድለቶች ተጠቅሞ ከፍተኛ ሽልማት ሲያገኝ።'])})
L7.append({
 'why': B('Interpretability asks why a model decided, which builds trust and finds hidden errors.', 'interpretability ሞዴሉ ለምን እንደወሰነ ይጠይቃል፤ ይህም እምነትን ይገነባል፣ የተደበቁ ስህተቶችንም ያገኛል።'),
 'dg': [compare(B('Probe vs attribution', 'Probe vs attribution'),
                [col(B('Probe', 'Probe'), ['train a small classifier on hidden states', 'asks: is this information inside the model?'], ['በhidden states ላይ ትንሽ classifier አሰልጥን', 'ይጠይቃል፡ ይህ መረጃ በሞዴሉ ውስጥ አለ?']),
                 col(B('Attribution', 'Attribution'), ['score each input for one prediction', 'asks: which inputs drove this answer?'], ['ለአንድ ትንበያ እያንዳንዱን ግብዓት አስመዝግብ', 'ይጠይቃል፡ ይህን መልስ የነዱት የትኞቹ ግብዓቶች ናቸው?'], 'good')]),
        flow(B('A good explanation for a farmer', 'ለገበሬ ጥሩ ማብራሪያ'), [N('Prediction', 'ትንበያ', 'high risk of rust', 'ከፍተኛ የዝገት አደጋ'), N('Top reasons', 'ዋና ምክንያቶች', '3 wet days, susceptible variety', '3 እርጥብ ቀናት፣ ተጋላጭ ዝርያ'), N('Action', 'እርምጃ', 'scout tomorrow; spray if pustules', 'ነገ ቃኝ፤ ብጉሮች ካሉ እርጭ', hl=True)])],
 'ex': ex_py('''
import numpy as np
from sklearn.linear_model import LogisticRegression
rng = np.random.default_rng(6); n = 600
genes = ["DRB3", "TLR4", "MHC2", "HSP70", "IFNG"]
X = rng.normal(0, 1, (n, 5))
risk = 1.5 * X[:, 1] - 1.0 * X[:, 3] + rng.normal(0, 1, n)        # only TLR4 and HSP70 truly matter
y = (risk > 0).astype(int)
m = LogisticRegression().fit(X, y)
animal = X[0]
contrib = m.coef_[0] * (animal - X.mean(0))                         # attribution for one animal (linear model)
print(f"predicted disease probability: {m.predict_proba([animal])[0, 1]:.2f}")
for g, c in sorted(zip(genes, contrib), key=lambda t: -abs(t[1])):
    print(f"  {g:6s} {c:+.2f}")
''', B('Which genes drove one animal’s disease prediction?', 'የአንድ እንስሳን የበሽታ ትንበያ የነዱት የትኞቹ ጂኖች ናቸው?'),
     B('TLR4 dominates, as it should. MHC2 has no real effect in these simulated data yet scores −0.62: a small fitted coefficient times an unusual value for this animal. For deep models use integrated gradients or SHAP, and always treat attributions as hypotheses to test.', 'TLR4 እንደሚጠበቀው ይበልጣል። MHC2 በዚህ የተመሰለ ዳታ ውስጥ እውነተኛ ውጤት የለውም፤ ግን −0.62 ያገኛል፡ ትንሽ የተገጠመ coefficient በዚህ እንስሳ ያልተለመደ እሴት ሲባዛ። ለጥልቅ ሞዴሎች integrated gradients ወይም SHAP ተጠቀም፤ attributionsንም ሁልጊዜ የሚፈተኑ መላምቶች አድርገህ ውሰዳቸው።')),
 'qa': B(['A probe tests whether some information is encoded in the model’s internal states; an attribution scores how much each input contributed to one specific output.', 'They can look convincing but be unfaithful to what the model really computed, be unstable to small changes, or reflect correlation in the data rather than causes.', 'By whether it matches what they see in the field, uses factors they know, and leads to a clear action that works when they try it.'],
         ['probe አንዳንድ መረጃ በሞዴሉ ውስጣዊ ሁኔታዎች ውስጥ መቀመጡን ይፈትሻል፤ attribution እያንዳንዱ ግብዓት ለአንድ የተወሰነ ውጤት ምን ያህል እንዳበረከተ ያስመዘግባል።', 'አሳማኝ ሊመስሉ ግን ሞዴሉ በእርግጥ ካሰላው ጋር ታማኝ ላይሆኑ፣ ለትናንሽ ለውጦች ያልተረጋጉ ሊሆኑ፣ ወይም ከመንስኤዎች ይልቅ በዳታው ውስጥ ያለ ተዛምዶን ሊያንጸባርቁ ይችላሉ።', 'በመስኩ ከሚያዩት ጋር መስማማቱ፣ የሚያውቋቸውን ምክንያቶች መጠቀሙ፣ እና ሲሞክሩት የሚሠራ ግልጽ እርምጃ ማምጣቱ።'])})
L7.append({
 'why': B('Powerful AI must stay robust, fair across languages and released responsibly.', 'ኃይለኛ AI ጠንካራ፣ በቋንቋዎች መካከል ፍትሐዊና በኃላፊነት የሚለቀቅ መሆን አለበት።'),
 'dg': [flow(B('Responsible release', 'ኃላፊነት የተሞላበት ልቀት'),
             [N('Red-team', 'Red-team', 'try to make it fail or cause harm', 'እንዲወድቅ ወይም ጉዳት እንዲያደርስ ሞክር'), N('Evaluate in many languages', 'በብዙ ቋንቋዎች ገምግም'), N('Model card', 'Model card', 'uses, limits, data, results by group', 'አጠቃቀሞች፣ ገደቦች፣ ዳታ፣ ውጤቶች በቡድን'), N('Staged access + monitoring', 'ደረጃ በደረጃ መዳረሻ + ክትትል', hl=True)]),
        compare(B('In or out of distribution?', 'በስርጭቱ ውስጥ ወይስ ውጭ?'),
                [col(B('In distribution', 'በስርጭቱ ውስጥ'), ['leaf photos like the training set'], ['እንደ ሥልጠና ስብስቡ ያሉ የቅጠል ፎቶዎች'], 'good'),
                 col(B('Out of distribution', 'ከስርጭቱ ውጭ'), ['a new crop, night-time photos, a different phone camera', 'the model should say "not sure"'], ['አዲስ ሰብል፣ የሌሊት ፎቶዎች፣ የተለየ የስልክ ካሜራ', 'ሞዴሉ «እርግጠኛ አይደለሁም» ማለት አለበት'], 'bad')])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(9)
train = rng.normal([0.6, 0.3, 120], [0.05, 0.04, 15], (500, 3))     # features of training photos: greenness, spots, brightness
mu = train.mean(0); inv = np.linalg.inv(np.cov(train.T))
def ood_score(x):
    d = x - mu
    return float(np.sqrt(d @ inv @ d))                               # Mahalanobis distance
limit = np.quantile([ood_score(x) for x in train], 0.99)
tests = {"normal leaf photo": [0.61, 0.31, 118], "night-time photo": [0.55, 0.30, 35], "different crop": [0.35, 0.05, 125]}
for name, x in tests.items():
    s = ood_score(np.array(x))
    print(f"{name:18s} score {s:5.1f} -> {'OUT of distribution: say not sure' if s > limit else 'ok to predict'}")
''', B('Flag inputs unlike the training data', 'ከሥልጠና ዳታው የተለዩ ግብዓቶችን ምልክት አድርግ')),
 'qa': B(['Inputs that differ from what the model was trained on (new places, crops, cameras, languages), where its accuracy is unknown and often poor.', 'Quality and safety often drop in languages with less training data; harms and errors can hide in Amharic, Tigrinya or Afaan Oromo if you test only English.', 'Intended uses and users, out-of-scope uses, training data, evaluation results broken down by language and group, known limitations and risks, and contact and version information.'],
         ['ሞዴሉ ከሰለጠነበት የሚለዩ ግብዓቶች (አዳዲስ ቦታዎች፣ ሰብሎች፣ ካሜራዎች፣ ቋንቋዎች)፤ ትክክለኛነቱ የማይታወቅና ብዙውን ጊዜ ደካማ የሆነበት።', 'ጥራትና ደህንነት ብዙውን ጊዜ ያነሰ የሥልጠና ዳታ ባላቸው ቋንቋዎች ይወርዳሉ፤ እንግሊዝኛን ብቻ ከፈተንክ ጉዳቶችና ስህተቶች በአማርኛ፣ በትግርኛ ወይም በአፋን ኦሮሞ ሊደበቁ ይችላሉ።', 'የታሰቡ አጠቃቀሞችና ተጠቃሚዎች፣ ከወሰን ውጭ ያሉ አጠቃቀሞች፣ የሥልጠና ዳታ፣ በቋንቋና በቡድን የተከፋፈሉ የግምገማ ውጤቶች፣ የታወቁ ገደቦችና አደጋዎች፣ እንዲሁም የመገኛና የስሪት መረጃ።'])})
L7.append({
 'why': B('A benchmark decides what the field optimises, so it must measure the right thing, honestly.', 'benchmark መስኩ ምን እንደሚያሻሽል ይወስናል፤ ስለዚህ ትክክለኛውን ነገር በታማኝነት መለካት አለበት።'),
 'dg': [flow(B('Building a benchmark for an African language', 'ለአፍሪካ ቋንቋ benchmark መገንባት'),
             [N('Define the skill', 'ክህሎቱን ግለጽ', 'e.g. extension advice in Amharic', 'ለምሳሌ በአማርኛ የኤክስቴንሽን ምክር'), N('Native-speaker experts write items', 'የአፍ መፍቻ ተናጋሪ ባለሙያዎች ንጥሎችን ይጽፋሉ'), N('Two annotators + agreement', 'ሁለት annotators + ስምምነት'), N('Keep a hidden test set', 'የተደበቀ የፈተና ስብስብ አቆይ', 'refresh it over time', 'በጊዜ ሂደት አድሰው', hl=True)]),
        compare(B('Reporting a model comparison', 'የሞዴል ንጽጽርን ሪፖርት ማድረግ'),
                [col(B('Weak', 'ደካማ'), ['"Model B: 71%, Model A: 68%, B is better"'], ['«ሞዴል B፡ 71%፣ ሞዴል A፡ 68%፣ B የተሻለ ነው»'], 'bad'),
                 col(B('Strong', 'ጠንካራ'), ['difference +3 points, 95% CI −2 to +8', 'contamination checked'], ['ልዩነት +3 ነጥቦች፣ 95% CI −2 እስከ +8', 'ብክለት ተፈትሿል'], 'good')])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(11); n = 300
a = rng.random(n) < 0.68                   # model A correct on each of 300 questions
b = np.where(rng.random(n) < 0.8, a, rng.random(n) < 0.71)   # B often agrees with A (paired data)
diffs = []
for _ in range(5000):                      # paired bootstrap over questions
    idx = rng.integers(0, n, n)
    diffs.append(b[idx].mean() - a[idx].mean())
lo, hi = np.percentile(diffs, [2.5, 97.5])
print(f"A {a.mean():.1%}, B {b.mean():.1%}, difference {b.mean() - a.mean():+.1%}, 95% CI {lo:+.1%} to {hi:+.1%}")

def ngrams(text, k=8):
    w = text.lower().split(); return {" ".join(w[i:i + k]) for i in range(len(w) - k + 1)}
test_item = "plant teff at the start of the main rains usually in july on a fine firm seedbed"
training_doc = "farmers are advised to plant teff at the start of the main rains usually in july"
print("8-gram overlap with training data:", len(ngrams(test_item) & ngrams(training_doc)), "-> possible contamination")
''', B('Confidence interval for a model comparison, and a contamination check', 'ለሞዴል ንጽጽር confidence interval፣ እና የብክለት ፍተሻ')),
 'qa': B(['Look for long word-sequence (n-gram) overlaps between test items and training data, test with fresh or rephrased items, and watch for suspiciously high scores on old items.', 'Scores on a few hundred items vary by chance; an interval shows whether a difference between models is real or within noise.', 'Native speakers with domain expertise, paid fairly and trained with clear guidelines, with agreement between annotators measured.'],
         ['በፈተና ንጥሎችና በሥልጠና ዳታ መካከል ረጅም የቃላት ቅደም ተከተል (n-gram) መደራረብን ፈልግ፣ በአዲስ ወይም በተቀየረ አገላለጽ ንጥሎች ፈትሽ፣ በአሮጌ ንጥሎች ላይ በጥርጣሬ ከፍተኛ ውጤቶችን ተከታተል።', 'በጥቂት መቶ ንጥሎች ላይ ያሉ ውጤቶች በአጋጣሚ ይለያያሉ፤ ክልል በሞዴሎች መካከል ያለ ልዩነት እውነተኛ ወይም በጫጫታ ውስጥ መሆኑን ያሳያል።', 'የዘርፍ ዕውቀት ያላቸው የአፍ መፍቻ ተናጋሪዎች፣ ፍትሐዊ ክፍያ የሚያገኙና በግልጽ መመሪያዎች የሰለጠኑ፣ በannotators መካከል ያለ ስምምነትም የሚለካ።'])})
L7.append({
 'why': B('Top scientists turn ideas into funded programmes, strong teams and organisations that last.', 'ምርጥ ሳይንቲስቶች ሐሳቦችን ወደ የገንዘብ ድጋፍ ያላቸው ፕሮግራሞች፣ ጠንካራ ቡድኖችና ዘላቂ ድርጅቶች ይቀይራሉ።'),
 'dg': [flow(B('A fundable proposal', 'ገንዘብ ሊያገኝ የሚችል ፕሮፖዛል'),
             [N('Important problem', 'አስፈላጊ ችግር', 'who suffers, how much', 'ማን እንደሚሰቃይ፣ ምን ያህል'), N('Bold, specific objectives', 'ደፋርና ግልጽ ዓላማዎች'), N('Feasible plan', 'ሊሆን የሚችል ዕቅድ', 'methods, risks, pilot data', 'ዘዴዎች፣ አደጋዎች፣ የሙከራ ዳታ'), N('Right team + budget', 'ትክክለኛ ቡድን + በጀት'), N('Impact path', 'የተጽዕኖ መንገድ', hl=True)]),
        compare(B('Research project or company?', 'የምርምር ፕሮጀክት ወይስ ኩባንያ?'),
                [col(B('Stay in research', 'በምርምር ቆይ'), ['open questions remain', 'no clear paying customer yet'], ['ክፍት ጥያቄዎች ይቀራሉ', 'እስካሁን ግልጽ የሚከፍል ደንበኛ የለም']),
                 col(B('Start a company', 'ኩባንያ ጀምር'), ['the method works and is repeatable', 'customers will pay; a team wants to build it'], ['ዘዴው ይሠራል፣ ይደገማልም', 'ደንበኞች ይከፍላሉ፤ ቡድን ሊገነባው ይፈልጋል'], 'good')])],
 'ex': ex_steps(B('Turn a result into a grant in 6 steps', 'ውጤትን በ6 እርምጃዎች ወደ ድጋፍ ቀይር'),
   ['Write the one-sentence problem and the one-sentence promise.', 'Read the call text twice and copy its evaluation criteria into your outline.', 'Show preliminary data: one figure that proves feasibility.', 'Build the work plan as work packages with deliverables, months and a risk table.', 'Cost it honestly: people, equipment, travel, open-access fees, overheads.', 'Get two colleagues to review it as panel members, then revise.'],
   ['የአንድ ዓረፍተ ነገር ችግሩንና የአንድ ዓረፍተ ነገር ቃሉን ጻፍ።', 'የጥሪውን ጽሑፍ ሁለት ጊዜ አንብብና የግምገማ መስፈርቶቹን ወደ ረቂቅህ ገልብጥ።', 'የመጀመሪያ ደረጃ ዳታ አሳይ፡ ተግባራዊነትን የሚያረጋግጥ አንድ figure።', 'የሥራ ዕቅዱን ከውጤቶች፣ ከወራትና ከአደጋ ሰንጠረዥ ጋር እንደ work packages ገንባ።', 'በታማኝነት ዋጋ አውጣ፡ ሰዎች፣ መሣሪያዎች፣ ጉዞ፣ የopen-access ክፍያዎች፣ overheads።', 'ሁለት ባልደረቦች እንደ ኮሚቴ አባላት እንዲገመግሙት አድርግ፣ ከዚያ አሻሽል።']),
 'qa': B(['An important problem, a clear and ambitious but feasible plan backed by preliminary data, the right team, a realistic budget and a convincing path to impact, all matched to the call’s criteria.', 'By the growth of the people mentored: skills gained, papers and grants they lead, jobs or companies they reach, and whether they mentor others.', 'When the result works reliably outside the lab, there is a customer who will pay, and a team ready to build and support a product.'],
         ['አስፈላጊ ችግር፣ በመጀመሪያ ደረጃ ዳታ የተደገፈ ግልጽና ታላቅ ግን ሊሆን የሚችል ዕቅድ፣ ትክክለኛ ቡድን፣ ተጨባጭ በጀትና አሳማኝ የተጽዕኖ መንገድ፣ ሁሉም ከጥሪው መስፈርቶች ጋር የሚስማሙ።', 'በተማከሩት ሰዎች ዕድገት፡ የተገኙ ክህሎቶች፣ የሚመሯቸው ጽሑፎችና ድጋፎች፣ የሚደርሱባቸው ሥራዎች ወይም ኩባንያዎች፣ እና ሌሎችን ይመክሩ እንደሆነ።', 'ውጤቱ ከላብራቶሪ ውጭ በአስተማማኝ ሁኔታ ሲሠራ፣ የሚከፍል ደንበኛ ሲኖር፣ ምርትን ለመገንባትና ለመደገፍ ዝግጁ ቡድን ሲኖር።'])})
emit(7, L7, 9)

# ============================ LEVEL 8: Future of AI ============================
L8 = []
L8.append({
 'why': B('Agents will do more of our work; knowing where to trust them is a new core skill.', 'agents ብዙ ሥራችንን ያከናውናሉ፤ የት ልናምናቸው እንደምንችል ማወቅ አዲስ ዋና ክህሎት ነው።'),
 'dg': [compare(B('Map your weekly tasks', 'የሳምንት ተግባራትህን ካርታ ሥራ'),
                [col(B('Give to an agent', 'ለagent ስጥ'), ['first drafts, data cleaning, literature search', 'routine code with tests'], ['የመጀመሪያ ረቂቆች፣ የዳታ ማጽዳት፣ የሥነ-ጽሑፍ ፍለጋ', 'ከፈተናዎች ጋር ያለ መደበኛ ኮድ'], 'good'),
                 col(B('Keep for people', 'ለሰዎች አቆይ'), ['final decisions, approvals, payments', 'talking with farmers and partners, ethics'], ['የመጨረሻ ውሳኔዎች፣ ማጽደቆች፣ ክፍያዎች', 'ከገበሬዎችና ከአጋሮች ጋር መነጋገር፣ ሥነ-ምግባር'], 'bad')]),
        flow(B('How agents fail and how you notice', 'agents እንዴት እንደሚወድቁና እንዴት እንደምታስተውል'),
             [N('Loops', 'ዑደቶች', 'same step again and again', 'ያው እርምጃ ደጋግሞ'), N('Wrong tool', 'የተሳሳተ መሣሪያ'), N('Made-up facts', 'የተፈጠሩ እውነታዎች'), N('Checks: logs, tests, spot review', 'ፍተሻዎች፡ መዝገቦች፣ ፈተናዎች፣ ናሙና ግምገማ', hl=True)])],
 'ex': ex_py('''
hours_saved_per_week = 6           # measured during a 4-week pilot
hourly_value = 250                 # birr per hour of staff time
review_hours_per_week = 1.5        # people checking the agent's work
subscription_per_month = 2500      # birr
weeks = 4
value = (hours_saved_per_week - review_hours_per_week) * hourly_value * weeks
cost = subscription_per_month
print(f"pilot value {value:,.0f} birr vs cost {cost:,.0f} birr -> net {value - cost:+,.0f} birr per month")
''', B('Did the agent pilot pay?', 'የagent ሙከራው አዋጣ?'),
     B('Count the review time honestly: an agent that saves 6 hours but needs 6 hours of checking saves nothing.', 'የግምገማ ጊዜውን በታማኝነት ቁጠር፡ 6 ሰዓት የሚያድን ግን 6 ሰዓት ፍተሻ የሚፈልግ agent ምንም አያድንም።')),
 'qa': B(['Decisions with legal, financial or ethical weight, anything irreversible, and work that depends on trust and relationships.', 'Check its logs and outputs against tests or known answers, review a random sample every week, and set alerts for unusual actions or costs.', 'In the example the pilot saved about 4.5 hours a week after review time, worth more than its monthly cost; measure yours the same way.'],
         ['ሕጋዊ፣ ገንዘባዊ ወይም ሥነ-ምግባራዊ ክብደት ያላቸው ውሳኔዎች፣ የማይቀለበስ ማንኛውም ነገር፣ እና በእምነትና በግንኙነት ላይ የሚመሠረት ሥራ።', 'መዝገቦቹንና ውጤቶቹን ከፈተናዎች ወይም ከሚታወቁ መልሶች ጋር ፈትሽ፣ በየሳምንቱ የዘፈቀደ ናሙና ገምግም፣ ለያልተለመዱ ተግባራት ወይም ወጪዎች ማንቂያዎችን አዘጋጅ።', 'በምሳሌው ሙከራው ከግምገማ ጊዜ በኋላ በሳምንት ወደ 4.5 ሰዓት አድኗል፣ ከወርሃዊ ወጪው በላይ ዋጋ አለው፤ የአንተንም በተመሳሳይ መንገድ ለካ።'])})
L8.append({
 'why': B('AI is speeding up discovery in biology, chemistry and climate; the winners own good data and good questions.', 'AI በባዮሎጂ፣ በኬሚስትሪና በአየር ንብረት ግኝትን እያፋጠነ ነው፤ አሸናፊዎቹ ጥሩ ዳታና ጥሩ ጥያቄዎች ያላቸው ናቸው።'),
 'dg': [cycle(B('A self-driving lab', 'ራሱን የሚያስኬድ ላብራቶሪ'),
              [N('AI proposes an experiment', 'AI ሙከራ ያቀርባል'), N('Robot runs it', 'ሮቦት ያካሂደዋል'), N('Instruments measure', 'መሣሪያዎች ይለካሉ'), N('Model updates', 'ሞዴሉ ይዘመናል', hl=True)]),
        compare(B('Is this AI discovery believable?', 'ይህ የAI ግኝት ተአማኒ ነው?'),
                [col(B('Doubt it', 'ተጠራጠረው'), ['only computer predictions', 'no comparison with a simple baseline', 'code and data not shared'], ['የኮምፒውተር ትንበያዎች ብቻ', 'ከቀላል baseline ጋር ንጽጽር የለም', 'ኮድና ዳታ አልተጋሩም'], 'bad'),
                 col(B('Trust grows', 'እምነት ያድጋል'), ['confirmed in the lab or field', 'beats strong baselines on held-out data', 'independent replication'], ['በላብራቶሪ ወይም በመስክ የተረጋገጠ', 'በተለየ ዳታ ላይ ጠንካራ baselinesን ያሸንፋል', 'ገለልተኛ ድግግሞሽ'], 'good')])],
 'ex': ex_steps(B('Workshop: where could AI make your field 10× faster?', 'ዎርክሾፕ፡ AI መስክህን የት 10× ሊያፋጥን ይችላል?'),
   ['List the steps of one research project from idea to paper and write how many weeks each takes.', 'Circle the slowest step.', 'Ask: is it slow because of data collection, analysis, waiting for experiments, or writing?', 'Find one AI tool or model that targets that step (for example a protein model, a weather model, an analysis agent).', 'Name the data you hold that others do not: local breeds, field trials, local-language records.', 'Design a two-week test that measures the time saved.'],
   ['የአንድ የምርምር ፕሮጀክት እርምጃዎችን ከሐሳብ እስከ ጽሑፍ ዘርዝርና እያንዳንዱ ስንት ሳምንት እንደሚወስድ ጻፍ።', 'በጣም ቀርፋፋውን እርምጃ አክብብ።', 'ጠይቅ፡ ቀርፋፋ የሆነው በዳታ መሰብሰብ፣ በትንተና፣ ሙከራዎችን በመጠበቅ ወይም በመጻፍ ነው?', 'ያንን እርምጃ ዒላማ የሚያደርግ አንድ የAI መሣሪያ ወይም ሞዴል ፈልግ (ለምሳሌ የፕሮቲን ሞዴል፣ የአየር ሁኔታ ሞዴል፣ የትንተና agent)።', 'ሌሎች የሌላቸውን ያንተን ዳታ ጥቀስ፡ የአካባቢ ዝርያዎች፣ የመስክ ሙከራዎች፣ በአካባቢ ቋንቋ ያሉ መዝገቦች።', 'የተቆጠበውን ጊዜ የሚለካ የሁለት ሳምንት ፈተና ንደፍ።']),
 'qa': B(['Experimental confirmation, strong baselines on held-out data, shared code and data, and independent replication.', 'Answer for your own project; for many field scientists it is data collection or waiting for the next season.', 'Local data such as indigenous breeds, multi-year field trials, farmer records and local-language text; these make your AI work unique.'],
         ['የሙከራ ማረጋገጫ፣ በተለየ ዳታ ላይ ጠንካራ baselines፣ የተጋሩ ኮድና ዳታ፣ እንዲሁም ገለልተኛ ድግግሞሽ።', 'ለራስህ ፕሮጀክት መልስ፤ ለብዙ የመስክ ሳይንቲስቶች የዳታ መሰብሰብ ወይም የሚቀጥለውን ወቅት መጠበቅ ነው።', 'እንደ ሀገር በቀል ዝርያዎች፣ የብዙ ዓመታት የመስክ ሙከራዎች፣ የገበሬ መዝገቦችና በአካባቢ ቋንቋ ያሉ ጽሑፎች ያሉ የአካባቢ ዳታ፤ እነዚህ የAI ሥራህን ልዩ ያደርጉታል።'])})
L8.append({
 'why': B('AI can raise smallholder income only if it reaches them by channels they already use, in their language.', 'AI የአነስተኛ ገበሬዎችን ገቢ ማሳደግ የሚችለው አስቀድመው በሚጠቀሙባቸው መንገዶች፣ በቋንቋቸው ሲደርሳቸው ብቻ ነው።'),
 'dg': [flow(B('An advisory service that works on any phone', 'በማንኛውም ስልክ የሚሠራ የምክር አገልግሎት'),
             [N('Farmer', 'ገበሬ', 'basic phone', 'መሠረታዊ ስልክ'), N('SMS / USSD / voice in Amharic', 'SMS / USSD / ድምፅ በአማርኛ'), N('AI + local data', 'AI + የአካባቢ ዳታ', 'weather, prices, crop calendar', 'የአየር ሁኔታ፣ ዋጋዎች፣ የሰብል ቀን መቁጠሪያ'), N('Short, timely advice', 'አጭርና ወቅታዊ ምክር', hl=True)]),
        stack(B('Data that feed AI-assisted breeding', 'በAI ለሚታገዝ የዝርያ ማሻሻያ የሚውል ዳታ'),
              [N('Genotypes', 'Genotypes', 'SNP chips, sequencing', 'SNP chips፣ sequencing'), N('Phenotypes', 'Phenotypes', 'trials, drones, farmer records', 'ሙከራዎች፣ ድሮኖች፣ የገበሬ መዝገቦች'), N('Environment', 'አካባቢ', 'climate, soil', 'የአየር ንብረት፣ አፈር'), N('Genomic prediction', 'ጂኖሚክ ትንበያ', 'pick climate-resilient parents', 'የአየር ንብረትን የሚቋቋሙ ወላጆችን ምረጥ')])],
 'ex': ex_py('''
farmers = 20000
price_per_season = 60          # birr per farmer per season (via cooperative or mobile money)
uptake = 0.35                  # share who pay
seasons = 2
sms_cost = 0.35 * 30           # birr: 30 SMS per farmer per season
fixed = 450000                 # staff, servers, data per year
revenue = farmers * uptake * price_per_season * seasons
variable = farmers * uptake * sms_cost * seasons
print(f"revenue {revenue:,.0f} birr, SMS {variable:,.0f}, fixed {fixed:,.0f} -> profit {revenue - variable - fixed:+,.0f} birr/year")
break_even = fixed / ((price_per_season - sms_cost) * seasons)
print(f"break-even: {break_even:,.0f} paying farmers")
''', B('Can an SMS advisory service pay for itself?', 'የSMS የምክር አገልግሎት ራሱን ሊችል ይችላል?'),
     B('The prices and costs here are illustrative assumptions; replace them with numbers from your own pilot.', 'እዚህ ያሉት ዋጋዎችና ወጪዎች ለማሳያ የተገመቱ ናቸው፤ ከራስህ ሙከራ በተገኙ ቁጥሮች ተካቸው።')),
 'qa': B(['Timely, trusted, local advice and market information that raises income or cuts losses, delivered simply and cheaply.', 'SMS, USSD menus and voice calls (IVR) in local languages, plus extension agents and radio.', 'Through small fees via cooperatives or mobile money, input companies or buyers who benefit, insurers, or government and donor contracts; check the break-even number.'],
         ['ገቢን የሚያሳድግ ወይም ኪሳራን የሚቀንስ ወቅታዊ፣ ታማኝ፣ የአካባቢ ምክርና የገበያ መረጃ፣ በቀላልና በርካሽ የሚደርስ።', 'SMS፣ USSD ምናሌዎችና የድምፅ ጥሪዎች (IVR) በአካባቢ ቋንቋዎች፣ ከኤክስቴንሽን ሠራተኞችና ከሬዲዮ ጋር።', 'በማኅበራት ወይም በሞባይል ገንዘብ በሚከፈሉ ትናንሽ ክፍያዎች፣ በሚጠቀሙ የግብዓት ኩባንያዎች ወይም ገዢዎች፣ በመድን ድርጅቶች፣ ወይም በመንግሥትና በለጋሾች ውሎች፤ የbreak-even ቁጥሩን ፈትሽ።'])})
L8.append({
 'why': B('Robots that learn from data could take on dull, dirty and dangerous farm and lab work.', 'ከዳታ የሚማሩ ሮቦቶች አሰልቺ፣ ቆሻሻና አደገኛ የእርሻና የላብራቶሪ ሥራዎችን ሊወስዱ ይችላሉ።'),
 'dg': [compare(B('Simulation vs the real field', 'ሲሙሌሽን vs እውነተኛው ማሳ'),
                [col(B('Simulation', 'ሲሙሌሽን'), ['perfect light, flat ground', 'unlimited free practice'], ['ፍጹም ብርሃን፣ ጠፍጣፋ መሬት', 'ያልተገደበ ነጻ ልምምድ'], 'good'),
                 col(B('Real field', 'እውነተኛ ማሳ'), ['dust, mud, shadows, wind', 'every weed looks different', 'breakage costs money'], ['አቧራ፣ ጭቃ፣ ጥላዎች፣ ነፋስ', 'እያንዳንዱ አረም የተለየ ይመስላል', 'መሰበር ገንዘብ ያስወጣል'], 'bad')],
                verdict=B('Bridge the gap with domain randomisation (vary everything in simulation) and real-world fine-tuning.', 'ክፍተቱን በdomain randomisation (በሲሙሌሽን ሁሉንም ነገር ቀያይር) እና በእውነተኛ ዓለም fine-tuning አጥብብ።')),
        stack(B('A low-cost weeding robot', 'ርካሽ የአረም ማረሚያ ሮቦት'),
              [N('Brain: phone or small board + camera', 'አንጎል፡ ስልክ ወይም ትንሽ ቦርድ + ካሜራ'), N('Vision model: weed vs crop', 'የምስል ሞዴል፡ አረም vs ሰብል'), N('Frame, wheels, tool', 'ፍሬም፣ ጎማዎች፣ መሣሪያ', 'made locally from steel and bicycle parts', 'ከብረትና ከብስክሌት ክፍሎች በአካባቢው የተሠራ'), N('Solar battery', 'የፀሐይ ባትሪ')])],
 'ex': ex_steps(B('Workshop: a robot for one local job', 'ዎርክሾፕ፡ ለአንድ የአካባቢ ሥራ ሮቦት'),
   ['Pick one job that is dull, dirty or dangerous: weeding, sorting coffee beans, cleaning barns, pipetting.', 'Write what the robot must sense, decide and do, step by step.', 'Choose the cheapest sensors that work (a phone camera often does).', 'List parts that can be made by local workshops and parts that must be bought.', 'Build a cardboard or wooden mock-up and test the movement by hand.', 'Estimate cost per hour compared with a person, and who would own and maintain it.'],
   ['አሰልቺ፣ ቆሻሻ ወይም አደገኛ የሆነ አንድ ሥራ ምረጥ፡ አረም ማረም፣ የቡና ፍሬ መለየት፣ በረት ማጽዳት፣ pipetting።', 'ሮቦቱ ምን መሰማት፣ መወሰንና ማድረግ እንዳለበት እርምጃ በእርምጃ ጻፍ።', 'የሚሠሩትን በጣም ርካሽ ሴንሰሮች ምረጥ (ብዙውን ጊዜ የስልክ ካሜራ ይበቃል)።', 'በአካባቢ ዎርክሾፖች ሊሠሩ የሚችሉ ክፍሎችንና መገዛት ያለባቸውን ክፍሎች ዘርዝር።', 'የካርቶን ወይም የእንጨት ሞዴል ገንባና እንቅስቃሴውን በእጅ ፈትሽ።', 'በሰዓት ወጪውን ከሰው ጋር አወዳድረህ ገምት፣ ማን እንደሚይዘውና እንደሚጠግነውም ጻፍ።']),
 'qa': B(['Real sensors are noisy, light and terrain change, objects vary and mistakes break things; simulations simplify all of this.', 'Answer for your area; common examples are weeding, sorting grain or coffee, cleaning barns and repetitive lab pipetting.', 'Frames, wheels, mounts and tools from local metal and wood workshops; electronics and motors are usually bought.'],
         ['እውነተኛ ሴንሰሮች ጫጫታ አላቸው፣ ብርሃንና መሬት ይለወጣሉ፣ ነገሮች ይለያያሉ፣ ስህተቶችም ነገሮችን ይሰብራሉ፤ ሲሙሌሽኖች ይህን ሁሉ ያቀላሉ።', 'ለአካባቢህ መልስ፤ የተለመዱ ምሳሌዎች አረም ማረም፣ እህል ወይም ቡና መለየት፣ በረት ማጽዳትና ተደጋጋሚ የላብራቶሪ pipetting ናቸው።', 'ፍሬሞች፣ ጎማዎች፣ መያዣዎችና መሣሪያዎች ከአካባቢ የብረትና የእንጨት ዎርክሾፖች፤ ኤሌክትሮኒክስና ሞተሮች ብዙውን ጊዜ ይገዛሉ።'])})
L8.append({
 'why': B('New kinds of computing and energy-efficient AI decide who can afford to use AI.', 'አዳዲስ የኮምፒውቲንግ ዓይነቶችና ኃይል ቆጣቢ AI AIን ማን ሊጠቀምበት እንደሚችል ይወስናሉ።'),
 'dg': [compare(B('Bit vs qubit', 'Bit vs qubit'),
                [col(B('Bit', 'Bit'), ['0 or 1'], ['0 ወይም 1']),
                 col(B('Qubit', 'Qubit'), ['a superposition a|0⟩ + b|1⟩', 'measuring gives 0 or 1 with probabilities |a|², |b|²', 'useful for some problems: chemistry simulation, certain searches'], ['superposition a|0⟩ + b|1⟩', 'መለካት 0 ወይም 1ን በ|a|²፣ |b|² ፕሮባቢሊቲዎች ይሰጣል', 'ለአንዳንድ ችግሮች ጠቃሚ፡ የኬሚስትሪ ሲሙሌሽን፣ የተወሰኑ ፍለጋዎች'], 'good')]),
        compare(B('Hype or progress?', 'ሆይታ ወይስ እድገት?'),
                [col(B('Hype', 'ሆይታ'), ['"will solve everything"', 'no benchmark against the best classical method'], ['«ሁሉንም ይፈታል»', 'ከምርጡ ክላሲካል ዘዴ ጋር benchmark የለም'], 'bad'),
                 col(B('Progress', 'እድገት'), ['a clear task, measured speed-up', 'independent results, error rates reported'], ['ግልጽ ተግባር፣ የተለካ ፍጥነት', 'ገለልተኛ ውጤቶች፣ የስህተት መጠኖች ሪፖርት የተደረጉ'], 'good')])],
 'ex': ex_py('''
import numpy as np
rng = np.random.default_rng(7)
H = np.array([[1, 1], [1, -1]]) / np.sqrt(2)          # Hadamard gate
state = H @ np.array([1, 0])                             # |0> -> equal superposition
probs = np.abs(state) ** 2
shots = rng.choice([0, 1], size=1000, p=probs)
print("amplitudes:", state.round(3), "| measured 1000 times:", np.bincount(shots))
print("H applied twice returns |0>:", (H @ H @ np.array([1, 0])).round(3) + 0.0)

watts, hours = 15, 8                                     # a small edge device running a local model
print(f"edge AI box: {watts * hours / 1000:.2f} kWh per day -> a 100 W solar panel (about 0.5 kWh/day) is enough")
''', B('A qubit in a few lines, and an energy budget for edge AI', 'qubit በጥቂት መስመሮች፣ እና ለedge AI የኃይል በጀት'),
     B('This simulates a qubit on an ordinary computer; real quantum hardware is noisy and still small.', 'ይህ በተራ ኮምፒውተር ላይ qubitን ያስመስላል፤ እውነተኛ የquantum hardware ጫጫታ ያለውና አሁንም ትንሽ ነው።')),
 'qa': B(['Problems with special structure, such as simulating molecules and materials, factoring, and some optimisation and search problems; not everyday computing.', 'Electricity is costly and unreliable in many places; efficient models on solar-powered edge devices make AI affordable and available offline.', 'Ask for a clear task, comparison with the best classical method, independent results and reported error rates; be wary of broad promises.'],
         ['ልዩ መዋቅር ያላቸው ችግሮች፣ እንደ ሞለኪውሎችንና ቁሳቁሶችን ማስመሰል፣ factoring፣ እና አንዳንድ የoptimisation እና የፍለጋ ችግሮች፤ የዕለት ተዕለት ኮምፒውቲንግ አይደለም።', 'በብዙ ቦታዎች ኤሌክትሪክ ውድና አስተማማኝ አይደለም፤ በፀሐይ በሚሠሩ edge መሣሪያዎች ላይ ያሉ ቀልጣፋ ሞዴሎች AIን ተመጣጣኝና ያለ ኢንተርኔት ተደራሽ ያደርጋሉ።', 'ግልጽ ተግባር፣ ከምርጡ ክላሲካል ዘዴ ጋር ንጽጽር፣ ገለልተኛ ውጤቶችና ሪፖርት የተደረጉ የስህተት መጠኖችን ጠይቅ፤ ሰፊ ቃሎችን ተጠንቀቅ።'])})
L8.append({
 'why': B('Rules on data and AI decide whether African data create African value and protect people.', 'በዳታና በAI ላይ ያሉ ሕጎች የአፍሪካ ዳታ የአፍሪካ እሴት እንደሚፈጥርና ሰዎችን እንደሚጠብቅ ይወስናሉ።'),
 'dg': [stack(B('Layers of AI governance', 'የAI አስተዳደር ንብርብሮች'),
              [N('International', 'ዓለም አቀፍ', 'UN, standards bodies', 'የተ.መ.ድ.፣ የደረጃ አካላት'), N('African Union', 'የአፍሪካ ኅብረት', 'continental AI strategy, data policy framework', 'አህጉራዊ የAI ስትራቴጂ፣ የዳታ ፖሊሲ ማዕቀፍ'), N('National', 'ብሔራዊ', 'data protection law, sector rules', 'የዳታ ጥበቃ ሕግ፣ የዘርፍ ሕጎች'), N('Organisation', 'ድርጅት', 'consent, data agreements, audits', 'ስምምነት፣ የዳታ ውሎች፣ ኦዲቶች')]),
        flow(B('A fair farmer-data agreement', 'ፍትሐዊ የገበሬ ዳታ ስምምነት'),
             [N('Informed consent', 'የተረዳ ስምምነት', 'in the farmer’s language', 'በገበሬው ቋንቋ'), N('Clear use', 'ግልጽ አጠቃቀም'), N('Benefit sharing', 'የጥቅም መጋራት', 'better advice, payment or ownership', 'የተሻለ ምክር፣ ክፍያ ወይም ባለቤትነት'), N('Right to withdraw', 'የመውጣት መብት', hl=True)])],
 'ex': ex_steps(B('Write a one-page policy brief', 'የአንድ ገጽ የፖሊሲ ማጠቃለያ ጻፍ'),
   ['Title: one problem, for example "Farmer data collected by apps".', 'Why it matters now: two facts with sources.', 'Options: list two or three policy options with costs and risks.', 'Recommendation: one clear rule, for example "apps must share aggregate insights back with the cooperatives that supplied the data".', 'Who acts and by when.', 'Ask a lawyer or policy expert to review it.'],
   ['ርዕስ፡ አንድ ችግር፣ ለምሳሌ «በመተግበሪያዎች የሚሰበሰብ የገበሬ ዳታ»።', 'ለምን አሁን አስፈላጊ ነው፡ ከምንጮች ጋር ሁለት እውነታዎች።', 'አማራጮች፡ ሁለት ወይም ሦስት የፖሊሲ አማራጮችን ከወጪዎችና ከአደጋዎች ጋር ዘርዝር።', 'ምክረ ሐሳብ፡ አንድ ግልጽ ሕግ፣ ለምሳሌ «መተግበሪያዎች አጠቃላይ ግንዛቤዎችን ዳታውን ላቀረቡት ማኅበራት መልሰው ማጋራት አለባቸው»።', 'ማን እንደሚሠራና እስከ መቼ።', 'ሕግ ባለሙያ ወይም የፖሊሲ ባለሙያ እንዲገመግመው ጠይቅ።']),
 'qa': B(['Legally it depends on the country’s data protection law and the agreement signed; ethically farmers should keep rights over data about them, with consent and a fair share of the benefits.', 'Fake audio or video in local languages can spread false health or market information, damage reputations, and fuel conflict, and fewer fact-checkers work in those languages.', 'Your own answer, for example "public AI systems must be tested in the main national languages before deployment".'],
         ['በሕግ በአገሪቱ የዳታ ጥበቃ ሕግና በተፈረመው ስምምነት ላይ ይወሰናል፤ በሥነ-ምግባር ገበሬዎች ስለእነሱ ባለው ዳታ ላይ መብታቸውን፣ ከስምምነትና ከፍትሐዊ የጥቅም ድርሻ ጋር ማቆየት አለባቸው።', 'በአካባቢ ቋንቋዎች ያሉ የሐሰት ድምፅ ወይም ቪዲዮ የሐሰት የጤና ወይም የገበያ መረጃን ሊያሰራጩ፣ ስምን ሊያጎድፉና ግጭትን ሊያባብሱ ይችላሉ፤ በእነዚያ ቋንቋዎች የሚሠሩ እውነታ አረጋጋጮችም ጥቂት ናቸው።', 'የራስህ መልስ፣ ለምሳሌ «ሕዝባዊ የAI ሥርዓቶች ከመሰማራታቸው በፊት በዋና ዋና ብሔራዊ ቋንቋዎች መፈተን አለባቸው»።'])})
L8.append({
 'why': B('The best results come from people and AI working together, each doing what they do best.', 'ምርጥ ውጤቶች ሰዎችና AI አብረው ሲሠሩ፣ እያንዳንዳቸው በጣም የሚችሉትን ሲያደርጉ ይመጣሉ።'),
 'dg': [flow(B('Checking an AI answer', 'የAI መልስን መፈተሽ'),
             [N('Ask for sources', 'ምንጮችን ጠይቅ'), N('Open and read them', 'ክፈታቸውና አንብባቸው'), N('Test it', 'ፈትሸው', 'run the code, redo the sum, try in the field', 'ኮዱን አስኪድ፣ ሒሳቡን እንደገና ሥራ፣ በመስክ ሞክር'), N('Ask an expert if it matters', 'አስፈላጊ ከሆነ ባለሙያ ጠይቅ', hl=True)]),
        compare(B('Skills that grow in value', 'ዋጋቸው የሚያድግ ክህሎቶች'),
                [col(B('Practise without AI too', 'ያለ AIም ተለማመድ'), ['reading carefully, mental maths', 'writing your own argument', 'judging quality and evidence'], ['በጥንቃቄ ማንበብ፣ የአእምሮ ሒሳብ', 'የራስህን ሙግት መጻፍ', 'ጥራትንና ማስረጃን መዳኘት'], 'good'),
                 col(B('Do with AI', 'ከAI ጋር አድርግ'), ['first drafts, translation drafts', 'boilerplate code, summaries to check'], ['የመጀመሪያ ረቂቆች፣ የትርጉም ረቂቆች', 'መደበኛ ኮድ፣ የሚፈተሹ ማጠቃለያዎች'])])],
 'ex': ex_steps(B('A 10-minute AI-answer check', 'የ10 ደቂቃ የAI መልስ ፍተሻ'),
   ['Ask the AI a question from your field and save its answer.', 'Underline every fact, number and name in the answer.', 'For each, find a reliable source (textbook, journal, official site) and mark ✓ or ✕.', 'Run any code or redo any calculation yourself.', 'Write one sentence: what was right, what was wrong, and what you will always check next time.'],
   ['ከመስክህ AIን ጥያቄ ጠይቀውና መልሱን አስቀምጥ።', 'በመልሱ ውስጥ ያለውን እያንዳንዱን እውነታ፣ ቁጥርና ስም አስምር።', 'ለእያንዳንዱ አስተማማኝ ምንጭ (የመማሪያ መጽሐፍ፣ ጆርናል፣ ይፋዊ ድረ ገጽ) ፈልግና ✓ ወይም ✕ አድርግ።', 'ማንኛውንም ኮድ አስኪድ ወይም ማንኛውንም ስሌት ራስህ እንደገና ሥራ።', 'አንድ ዓረፍተ ነገር ጻፍ፡ ምን ትክክል ነበር፣ ምን ስህተት ነበር፣ በሚቀጥለው ጊዜ ሁልጊዜ ምን ትፈትሻለህ።']),
 'qa': B(['Core skills you must judge AI with: careful reading, writing your own reasoning, basic maths and knowledge of your field.', 'Check sources, test code and numbers yourself, compare with trusted references, and ask an expert when the stakes are high.', 'Usually jobs with routine text, data entry and simple customer questions change first; jobs needing trust, hands-on skill and judgement change more slowly.'],
         ['AIን የምትዳኝባቸው ዋና ክህሎቶች፡ በጥንቃቄ ማንበብ፣ የራስህን አመክንዮ መጻፍ፣ መሠረታዊ ሒሳብና የመስክህ ዕውቀት።', 'ምንጮችን ፈትሽ፣ ኮድንና ቁጥሮችን ራስህ ፈትሽ፣ ከታመኑ ማጣቀሻዎች ጋር አወዳድር፣ ጉዳዩ ከባድ ሲሆን ባለሙያ ጠይቅ።', 'ብዙውን ጊዜ መደበኛ ጽሑፍ፣ የዳታ ማስገባትና ቀላል የደንበኛ ጥያቄዎች ያላቸው ሥራዎች መጀመሪያ ይለወጣሉ፤ እምነት፣ የእጅ ክህሎትና ፍርድ የሚፈልጉ ሥራዎች ቀስ ብለው ይለወጣሉ።'])})
L8.append({
 'why': B('A profitable AI company starts from a painful problem and a customer who pays, not from the model.', 'ትርፋማ የAI ኩባንያ ከሞዴሉ ሳይሆን ከሚያሳምም ችግርና ከሚከፍል ደንበኛ ይጀምራል።'),
 'dg': [flow(B('From problem to company', 'ከችግር ወደ ኩባንያ'),
             [N('Talk to 20 customers', 'ከ20 ደንበኞች ጋር ተነጋገር'), N('One painful problem', 'አንድ የሚያሳምም ችግር'), N('Lean product', 'ቀላል ምርት', 'open model + small local data', 'ክፍት ሞዴል + ትንሽ የአካባቢ ዳታ'), N('First 100 paying users', 'የመጀመሪያዎቹ 100 የሚከፍሉ ተጠቃሚዎች'), N('Funding to grow', 'ለማደግ የገንዘብ ድጋፍ', hl=True)]),
        compare(B('Your edge over a free chatbot', 'ከነጻ chatbot በላይ ያንተ ጥቅም'),
                [col(B('Free chatbot', 'ነጻ chatbot'), ['general answers', 'no local data, no integration'], ['አጠቃላይ መልሶች', 'የአካባቢ ዳታ የለም፣ ውህደት የለም'], 'bad'),
                 col(B('Your product', 'ምርትህ'), ['local prices, soils, breeds, language', 'works by SMS, connects to payment and inputs', 'trusted partners and support'], ['የአካባቢ ዋጋዎች፣ አፈሮች፣ ዝርያዎች፣ ቋንቋ', 'በSMS ይሠራል፣ ከክፍያና ከግብዓቶች ጋር ይገናኛል', 'የታመኑ አጋሮችና ድጋፍ'], 'good')])],
 'ex': ex_py('''
price_per_month = 150        # birr per cooperative member
gross_margin = 0.75          # after SMS, cloud and support costs
months_retained = 18         # average customer life
cac = 600                    # cost to acquire one paying member (field agents, demos)
ltv = price_per_month * gross_margin * months_retained
print(f"lifetime value {ltv:,.0f} birr vs acquisition cost {cac:,.0f} birr -> LTV/CAC = {ltv / cac:.1f}")
print(f"payback: {cac / (price_per_month * gross_margin):.1f} months")
print("rule of thumb: LTV/CAC above 3 and payback under 12 months make a healthy business")
''', B('Unit economics: will each customer make money?', 'Unit economics፡ እያንዳንዱ ደንበኛ ትርፍ ያስገኛል?'),
     B('All numbers are assumptions to replace with your own measurements after talking to customers.', 'ሁሉም ቁጥሮች ከደንበኞች ጋር ከተነጋገርክ በኋላ በራስህ ልኬቶች የምትተካቸው ግምቶች ናቸው።')),
 'qa': B(['Name the buyer (farmer, cooperative, company, government) and the price they agreed to in interviews or a pilot, not a guess.', 'Use local data, language, delivery channels and integrations (payments, inputs, extension) that a general chatbot does not have.', 'Through partners who already reach them: cooperatives, unions, input dealers, extension agents; offer a free pilot and convert satisfied users.'],
         ['ገዢውን (ገበሬ፣ ማኅበር፣ ኩባንያ፣ መንግሥት) እና በቃለ መጠይቆች ወይም በሙከራ የተስማሙበትን ዋጋ ጥቀስ፤ ግምት አይደለም።', 'አጠቃላይ chatbot የሌለውን የአካባቢ ዳታ፣ ቋንቋ፣ የአቅርቦት መንገዶችና ውህደቶች (ክፍያዎች፣ ግብዓቶች፣ ኤክስቴንሽን) ተጠቀም።', 'አስቀድመው በሚደርሱባቸው አጋሮች፡ ማኅበራት፣ ዩኒየኖች፣ የግብዓት አከፋፋዮች፣ የኤክስቴንሽን ሠራተኞች፤ ነጻ ሙከራ አቅርብና የረኩ ተጠቃሚዎችን ወደ ከፋዮች ቀይር።'])})
emit(8, L8, 8)
print('levels 6-8 written')
