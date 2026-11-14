/* Statistics for Agriculture: overview content (chooser, tools, businesses), English + Amharic. */
window.STATS_CORE = {
 intro: {
  en: ['<strong>Statistics turns field observations into decisions that make money.</strong> This track takes learners from counting seeds at KG to designing national breeding programmes and AI-driven experiments.',
       'Every level uses agricultural data from field to market: crops, livestock, soil, water, farmers and prices. From Level S1 up, worked examples show the data, the code that was run, the real output, how to read it, and the decision it supports.'],
  am: ['<strong>ስታቲስቲክስ የመስክ ምልከታዎችን ገንዘብ ወደሚያስገኙ ውሳኔዎች ይቀይራል።</strong> ይህ መስመር ተማሪዎችን በKG ዘር ከመቁጠር እስከ ብሔራዊ የዝርያ ማሻሻያ ፕሮግራሞችንና በAI የሚመሩ ሙከራዎችን መንደፍ ድረስ ይወስዳል።',
       'እያንዳንዱ ደረጃ ከመስክ እስከ ገበያ የግብርና ዳታን ይጠቀማል፡ ሰብሎች፣ እንስሳት፣ አፈር፣ ውሃ፣ ገበሬዎችና ዋጋዎች። ከደረጃ S1 ጀምሮ የተሠሩ ምሳሌዎች ዳታውን፣ የተሠራውን ኮድ፣ እውነተኛውን ውጤት፣ እንዴት እንደሚነበብና የሚደግፈውን ውሳኔ ያሳያሉ።']
 },
 /* question · design or test · level */
 chooser: {
  en: [
   ['Compare two groups on a measure (yield of two varieties)', 'Two-sample t-test (paired t-test if the same farms got both)', 'S3'],
   ['Compare categories or counts (adopted yes/no by region)', 'Chi-square test; Fisher’s exact test for small counts', 'S3'],
   ['How an input changes an output (yield vs N rate)', 'Correlation and regression; response curves and economic optimum', 'S3 · S5'],
   ['3+ treatments in uniform pots or a lab', 'Completely randomised design (CRD) + one-way ANOVA + mean separation', 'S4'],
   ['Treatments in a field with a slope or fertility gradient', 'Randomised complete block design (RCBD) + ANOVA', 'S4'],
   ['Field with two gradients (rows and columns)', 'Latin square or row–column design', 'S4'],
   ['Two or more factors together (N × P, variety × spacing)', 'Factorial design + two-way ANOVA, interaction plots', 'S4'],
   ['One factor needs big plots (irrigation, tillage)', 'Split-plot or strip-plot design', 'S4'],
   ['Scores or ranks (disease severity 1–9)', 'Kruskal–Wallis or Friedman test; ordinal regression', 'S4 · S5'],
   ['Many varieties (50–1000) with little seed or land', 'Alpha-lattice, augmented or p-rep design + mixed model (BLUP)', 'S5'],
   ['Varieties across locations and years', 'Multi-environment trial (MET): combined ANOVA, G×E, stability, AMMI and GGE biplots', 'S5'],
   ['Proportions and counts (germination, mortality, insects)', 'Generalised linear models: binomial (logistic), Poisson, negative binomial', 'S5'],
   ['Many traits at once (yield, height, maturity, quality)', 'PCA, cluster analysis, correlation networks', 'S5'],
   ['The same animals or plots measured over time', 'Repeated measures, mixed models, growth curves', 'S5'],
   ['Is it profitable?', 'Partial budget, cost–benefit, marginal rate of return, economic optimum', 'S5'],
   ['How much is genetic? Which animal or plant is best to breed from?', 'Variance components, heritability, animal model, BLUP breeding values', 'S6'],
   ['Which DNA regions control a trait?', 'GWAS with mixed models, multiple-testing control', 'S6'],
   ['Predict performance from DNA', 'Genomic prediction (GBLUP, ridge, Bayesian), cross-validation', 'S6'],
   ['Predict yield, prices or disease outbreaks', 'Machine learning (random forest, boosting) and time-series forecasting', 'S6'],
   ['Use prior knowledge and quantify uncertainty', 'Bayesian models', 'S6'],
   ['Design a whole breeding programme for maximum gain per year and per birr', 'Breeder’s equation, selection index, optimal resource allocation, simulation', 'S7'],
   ['Run experiments that learn and adapt as data arrive', 'Adaptive and Bayesian-optimisation designs, conformal prediction', 'S8']],
  am: [
   ['በአንድ መለኪያ ሁለት ቡድኖችን ማወዳደር (የሁለት ዝርያዎች ምርት)', 'ባለ ሁለት ናሙና t-test (አንድ ዓይነት እርሻዎች ሁለቱንም ካገኙ paired t-test)', 'S3'],
   ['ምድቦችን ወይም ቁጥሮችን ማወዳደር (በክልል መቀበል አዎ/አይ)', 'Chi-square ፈተና፤ ለትናንሽ ቁጥሮች Fisher exact test', 'S3'],
   ['ግብዓት ውጤትን እንዴት እንደሚቀይር (ምርት vs የN መጠን)', 'ተዛምዶና regression፤ የምላሽ ኩርባዎችና የኢኮኖሚ ምርጥ ነጥብ', 'S3 · S5'],
   ['3+ ሕክምናዎች በተመሳሳይ ማሰሮዎች ወይም በላብራቶሪ', 'Completely randomised design (CRD) + one-way ANOVA + የአማካዮች ንጽጽር', 'S4'],
   ['ተዳፋት ወይም የለምነት ልዩነት ባለው ማሳ ውስጥ ሕክምናዎች', 'Randomised complete block design (RCBD) + ANOVA', 'S4'],
   ['ሁለት ዓይነት ልዩነቶች ያሉት ማሳ (ረድፎችና ዓምዶች)', 'Latin square ወይም row–column ንድፍ', 'S4'],
   ['ሁለት ወይም ከዚያ በላይ ምክንያቶች በአንድ ላይ (N × P፣ ዝርያ × ርቀት)', 'Factorial ንድፍ + two-way ANOVA፣ የinteraction ፕሎቶች', 'S4'],
   ['አንድ ምክንያት ትልቅ ማሳ ይፈልጋል (መስኖ፣ እርሻ አስተራረስ)', 'Split-plot ወይም strip-plot ንድፍ', 'S4'],
   ['ነጥቦች ወይም ደረጃዎች (የበሽታ ክብደት 1–9)', 'Kruskal–Wallis ወይም Friedman ፈተና፤ ordinal regression', 'S4 · S5'],
   ['ብዙ ዝርያዎች (50–1000) በትንሽ ዘር ወይም መሬት', 'Alpha-lattice፣ augmented ወይም p-rep ንድፍ + mixed model (BLUP)', 'S5'],
   ['ዝርያዎች በቦታዎችና በዓመታት', 'Multi-environment trial (MET)፡ combined ANOVA፣ G×E፣ stability፣ AMMI እና GGE biplots', 'S5'],
   ['ምጣኔዎችና ቁጥሮች (መብቀል፣ ሞት፣ ነፍሳት)', 'Generalised linear models፡ binomial (logistic)፣ Poisson፣ negative binomial', 'S5'],
   ['ብዙ ባሕሪያት በአንድ ጊዜ (ምርት፣ ቁመት፣ የመድረሻ ጊዜ፣ ጥራት)', 'PCA፣ cluster analysis፣ የተዛምዶ ኔትወርኮች', 'S5'],
   ['አንድ ዓይነት እንስሳት ወይም ማሳዎች በጊዜ ሂደት ሲለኩ', 'Repeated measures፣ mixed models፣ የዕድገት ኩርባዎች', 'S5'],
   ['ትርፋማ ነው?', 'Partial budget፣ cost–benefit፣ marginal rate of return፣ የኢኮኖሚ ምርጥ ነጥብ', 'S5'],
   ['ምን ያህሉ በዘር የሚወረስ ነው? ለዝርያ ማሻሻያ የተሻለው እንስሳ ወይም ተክል የትኛው ነው?', 'Variance components፣ heritability፣ animal model፣ BLUP breeding values', 'S6'],
   ['የትኞቹ የDNA ክፍሎች ባሕሪን ይቆጣጠራሉ?', 'GWAS ከmixed models ጋር፣ የmultiple-testing ቁጥጥር', 'S6'],
   ['አፈጻጸምን ከDNA መተንበይ', 'Genomic prediction (GBLUP፣ ridge፣ Bayesian)፣ cross-validation', 'S6'],
   ['ምርትን፣ ዋጋን ወይም የበሽታ ወረርሽኝን መተንበይ', 'ማሽን ለርኒንግ (random forest፣ boosting) እና የtime-series ትንበያ', 'S6'],
   ['ቀደምት ዕውቀትን መጠቀምና እርግጠኛ አለመሆንን መለካት', 'Bayesian ሞዴሎች', 'S6'],
   ['በዓመትና በብር ከፍተኛ ትርፍ የሚሰጥ ሙሉ የዝርያ ማሻሻያ ፕሮግራም መንደፍ', 'Breeder’s equation፣ selection index፣ ምርጥ የሀብት ድልድል፣ ሲሙሌሽን', 'S7'],
   ['ዳታ ሲመጣ የሚማሩና የሚለዋወጡ ሙከራዎችን ማካሄድ', 'Adaptive እና Bayesian-optimisation ንድፎች፣ conformal prediction', 'S8']]
 },
 /* level · tools (free unless marked) */
 tools: {
  en: [
   ['S0–S1', 'Fingers, tally marks, picture charts, squared paper, rulers and kitchen scales'],
   ['S2', 'Spreadsheets (LibreOffice Calc, Google Sheets, Excel): AVERAGE, MEDIAN, charts'],
   ['S3', 'JASP or jamovi (point-and-click), Python (pandas, scipy), R basics'],
   ['S4', 'R: agricolae, emmeans, car · Python: scipy, statsmodels · field-book apps on phones'],
   ['S5', 'R: lme4, lmerTest, metan (MET, AMMI, GGE), SpATS (spatial), nlme · ASReml-R (commercial) · Python: statsmodels, scikit-learn'],
   ['S6', 'BLUPF90 family, rrBLUP, sommer, GCTA, PLINK, GAPIT · brms and Stan (Bayesian) · scikit-learn, XGBoost, PyTorch'],
   ['S7', 'Breeding databases (BMS, BrAPI standard), simulation (AlphaSimR), workflow managers, high-throughput phenotyping pipelines'],
   ['S8', 'AutoML, foundation models for agriculture, federated learning, Bayesian optimisation, digital twins, real-time sensor streams']],
  am: [
   ['S0–S1', 'ጣቶች፣ የመቁጠሪያ ምልክቶች፣ የሥዕል ቻርቶች፣ ካሬ ወረቀት፣ ማስመሪያዎችና የኩሽና ሚዛኖች'],
   ['S2', 'ስፕሬድሺቶች (LibreOffice Calc፣ Google Sheets፣ Excel)፡ AVERAGE፣ MEDIAN፣ ቻርቶች'],
   ['S3', 'JASP ወይም jamovi (ጠቅ አድርግ)፣ Python (pandas፣ scipy)፣ የR መሠረቶች'],
   ['S4', 'R፡ agricolae፣ emmeans፣ car · Python፡ scipy፣ statsmodels · በስልክ የመስክ መዝገብ አፖች'],
   ['S5', 'R፡ lme4፣ lmerTest፣ metan (MET፣ AMMI፣ GGE)፣ SpATS (spatial)፣ nlme · ASReml-R (የሚከፈልበት) · Python፡ statsmodels፣ scikit-learn'],
   ['S6', 'የBLUPF90 ቤተሰብ፣ rrBLUP፣ sommer፣ GCTA፣ PLINK፣ GAPIT · brms እና Stan (Bayesian) · scikit-learn፣ XGBoost፣ PyTorch'],
   ['S7', 'የዝርያ ማሻሻያ ዳታቤዞች (BMS፣ BrAPI ደረጃ)፣ ሲሙሌሽን (AlphaSimR)፣ የሥራ ፍሰት አስተዳዳሪዎች፣ ከፍተኛ መጠን phenotyping pipelines'],
   ['S8', 'AutoML፣ ለግብርና መሠረታዊ ሞዴሎች፣ federated learning፣ Bayesian optimisation፣ ዲጂታል መንታዎች፣ የቅጽበታዊ ሴንሰር ዳታ']]
 },
 /* business · what it sells · who pays · from level */
 biz: {
  en: [
   ['Seed and input quality testing', 'Germination and purity tests, simple certificates', 'Farmers, cooperatives, agro-dealers', 'S1'],
   ['On-farm trial and variety testing service', 'Designed trials, ANOVA reports, recommendation sheets', 'Seed companies, NGOs, government', 'S4'],
   ['Fertilizer and agronomy recommendations', 'Response curves and economic optimum rates per area', 'Farmers, unions, input suppliers', 'S5'],
   ['Monitoring and evaluation (M&E) consulting', 'Survey design, sampling, impact analysis', 'NGOs, donors, projects', 'S5'],
   ['Breeding analytics for seed and livestock companies', 'MET analysis, BLUP breeding values, selection decisions', 'Seed firms, breeding centres, ranches', 'S6'],
   ['Price and yield forecasting', 'SMS forecasts, dashboards, early warnings', 'Traders, cooperatives, insurers, governments', 'S6'],
   ['Index insurance and climate-risk analytics', 'Designing payout indices from weather and satellite data', 'Insurers, banks, microfinance', 'S6'],
   ['Breeding programme design and genomic services', 'Programme design, genomic prediction, data platforms', 'National programmes, large companies, investors', 'S7'],
   ['AI experimentation platforms', 'Adaptive trial software, digital twins, automated phenotyping', 'Agribusiness, research institutes worldwide', 'S8']],
  am: [
   ['የዘርና የግብዓት ጥራት ፍተሻ', 'የመብቀልና የንጽሕና ፈተናዎች፣ ቀላል የምስክር ወረቀቶች', 'ገበሬዎች፣ ማኅበራት፣ የግብርና ግብዓት ነጋዴዎች', 'S1'],
   ['የእርሻ ላይ ሙከራና የዝርያ ፍተሻ አገልግሎት', 'የተነደፉ ሙከራዎች፣ የANOVA ሪፖርቶች፣ የምክር ሉሆች', 'የዘር ኩባንያዎች፣ NGOዎች፣ መንግሥት', 'S4'],
   ['የማዳበሪያና የግብርና አሠራር ምክሮች', 'የምላሽ ኩርባዎችና በአካባቢ የኢኮኖሚ ምርጥ መጠኖች', 'ገበሬዎች፣ ዩኒየኖች፣ የግብዓት አቅራቢዎች', 'S5'],
   ['የክትትልና ግምገማ (M&E) ማማከር', 'የዳሰሳ ንድፍ፣ ናሙና አወሳሰድ፣ የተጽዕኖ ትንተና', 'NGOዎች፣ ለጋሾች፣ ፕሮጀክቶች', 'S5'],
   ['ለዘርና ለእንስሳት ኩባንያዎች የዝርያ ማሻሻያ ትንተና', 'የMET ትንተና፣ BLUP breeding values፣ የምርጫ ውሳኔዎች', 'የዘር ድርጅቶች፣ የዝርያ ማሻሻያ ማዕከላት፣ ራንቾች', 'S6'],
   ['የዋጋና የምርት ትንበያ', 'በSMS ትንበያዎች፣ ዳሽቦርዶች፣ ቅድመ ማስጠንቀቂያዎች', 'ነጋዴዎች፣ ማኅበራት፣ የመድን ድርጅቶች፣ መንግሥታት', 'S6'],
   ['የኢንዴክስ መድንና የአየር ንብረት አደጋ ትንተና', 'ከአየር ሁኔታና ከሳተላይት ዳታ የክፍያ ኢንዴክሶችን መንደፍ', 'የመድን ድርጅቶች፣ ባንኮች፣ አነስተኛ የፋይናንስ ተቋማት', 'S6'],
   ['የዝርያ ማሻሻያ ፕሮግራም ንድፍና የጂኖሚክ አገልግሎቶች', 'የፕሮግራም ንድፍ፣ ጂኖሚክ ትንበያ፣ የዳታ መድረኮች', 'ብሔራዊ ፕሮግራሞች፣ ትላልቅ ኩባንያዎች፣ ባለሀብቶች', 'S7'],
   ['የAI ሙከራ መድረኮች', 'Adaptive የሙከራ ሶፍትዌር፣ ዲጂታል መንታዎች፣ በራስ-ሰር phenotyping', 'የግብርና ንግዶች፣ በዓለም ዙሪያ ያሉ የምርምር ተቋማት', 'S8']]
 }
};
