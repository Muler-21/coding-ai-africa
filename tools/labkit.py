"""Practical-lab builder: run the lab code, then build charts, analysis and decision from its results."""
import os, io, json, contextlib, textwrap, tempfile
import numpy as np
from mlib import B, REPO
os.environ['MPLBACKEND'] = 'Agg'

def T(name, why_en, why_am, get=''):
    return {'name': name, 'why': B(why_en, why_am), 'get': get}

PY = T('Python 3', 'runs the analysis code', 'የትንተናውን ኮድ ያስኬዳል', 'python.org, Thonny (offline installer) or a phone app such as Pydroid')
PD = T('pandas', 'tables: load, clean and summarise data', 'ሰንጠረዦች፡ ዳታን መጫን፣ ማጽዳትና ማጠቃለል', 'pip install pandas')
NP = T('NumPy', 'fast maths on arrays', 'በarrays ላይ ፈጣን ሒሳብ', 'pip install numpy')
SP = T('SciPy', 'statistical tests and distributions', 'የስታቲስቲክስ ፈተናዎችና distributions', 'pip install scipy')
SK = T('scikit-learn', 'machine-learning models and evaluation', 'የmachine-learning ሞዴሎችና ግምገማ', 'pip install scikit-learn')
MPL = T('matplotlib', 'draw charts to include in your report', 'በሪፖርትህ ውስጥ የሚካተቱ ቻርቶችን መሣል', 'pip install matplotlib')
SHEET = T('Spreadsheet', 'enter and check the raw data', 'ጥሬ ዳታውን ማስገባትና መፈተሽ', 'LibreOffice Calc (free) or Google Sheets')
PAPER = T('Paper, pencil, squared paper', 'record data and draw charts by hand', 'ዳታ መመዝገብና ቻርቶችን በእጅ መሣል', 'school supplies')
R_ = T('R (optional)', 'the same analysis in R', 'ያው ትንተና በR', 'cran.r-project.org + RStudio')

DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'data')

def run_code(code, files=()):
    code = textwrap.dedent(code).strip('\n')
    d = tempfile.mkdtemp(); cwd = os.getcwd()
    for f in files:
        import shutil; shutil.copy(os.path.join(DATA, f), d)
    os.chdir(d)
    buf = io.StringIO(); ns = {'__name__': '__main__'}
    try:
        with contextlib.redirect_stdout(buf):
            exec(compile(code, '<lab>', 'exec'), ns)
    finally:
        os.chdir(cwd)
    return code, buf.getvalue().rstrip(), ns

def lab(title, goal, time, tools, steps, code, viz=None, analysis=None, decision=None, lang='Python', note=None, files=()):
    code, out, ns = run_code(code, files)
    a = analysis(ns); d = decision(ns)
    L = {'title': B(*title), 'goal': B(*goal), 'time': B(*time), 'tools': tools, 'steps': B(*steps),
         'code': code, 'out': out, 'lang': lang, 'viz': viz(ns) if viz else [],
         'analysis': B(*a), 'decision': B(*d)}
    if note: L['note'] = B(*note)
    assert len(L['steps']['en']) == len(L['steps']['am']) and len(L['analysis']['en']) == len(L['analysis']['am']), title
    return L

def r(x, d=3):
    if isinstance(x, (list, tuple, np.ndarray)):
        return [r(v, d) for v in list(x)]
    return round(float(x), d)

def _tbl(cols, rows):
    return {'cols': cols, 'rows': rows}

def hbar(title, cats, series, xlabel, fmt=1, note=None):
    """series: list of (name, values, slot); name = B() or str."""
    cats = list(cats)
    sp = {'type': 'hbar', 'title': title, 'x': {'label': xlabel}, 'fmt': fmt,
          'cats': cats, 'series': [{'name': n, 'slot': s, 'v': r(v, fmt)} for n, v, s in series],
          'table': _tbl([B('Category', 'ምድብ')] + [n for n, _, _ in series], [[c] + [r(v[i], fmt) for _, v, _ in series] for i, c in enumerate(cats)])}
    if note: sp['note'] = note
    return sp

def line(title, x, series, xlabel, ylabel, refs=None, note=None, ymin=None, ymax=None, xint=True, rpad=None, markers=True):
    x = r(x, 4)
    sp = {'type': 'xy', 'title': title, 'x': {'label': xlabel, 'int': xint}, 'y': {'label': ylabel},
          'series': [{'name': n, 'slot': s, 'kind': 'line', 'markers': markers, 'x': x, 'y': r(y, 4),
                      'tip': [f'{yy:.4g}|{(n["en"] if isinstance(n, dict) else n)} · {xx:g}' for xx, yy in zip(x, y)],
                      **({'endlabel': n} if len(series) > 1 else {})} for n, y, s in series],
          'table': _tbl([xlabel] + [n for n, _, _ in series], [[xx] + [r(y[i], 3) for _, y, _ in series] for i, xx in enumerate(x)])}
    if ymin is not None: sp['y']['min'] = ymin
    if ymax is not None: sp['y']['max'] = ymax
    if refs: sp['refs'] = refs
    if note: sp['note'] = note
    if len(series) > 1: sp['rpad'] = rpad or 90
    return sp

def scatter(title, x, y, xlabel, ylabel, fit=True, note=None, labels=None, names=None, groups=None, refs=None):
    x, y = np.asarray(x, float), np.asarray(y, float)
    series = []
    if groups is None:
        series.append({'name': B('Observations', 'ምልከታዎች'), 'slot': 1, 'kind': 'points', 'x': r(x), 'y': r(y), 'size': 4,
                       'tip': [f'{yy:.3g}|{(names[i] if names is not None else "")} x = {xx:.3g}' for i, (xx, yy) in enumerate(zip(x, y))]})
        if labels: series[-1]['labels'] = labels
    else:
        for gi, (gname, mask) in enumerate(groups):
            m = np.asarray(mask)
            series.append({'name': gname, 'slot': gi + 1, 'kind': 'points', 'x': r(x[m]), 'y': r(y[m]), 'size': 4,
                           'tip': [f'{yy:.3g}|x = {xx:.3g}' for xx, yy in zip(x[m], y[m])]})
    rows = [[r(a), r(b)] for a, b in zip(x, y)][:40]
    if fit:
        b, a = np.polyfit(x, y, 1); xr = np.array([x.min(), x.max()])
        series.append({'name': B(f'Fitted line (slope {b:.3g})', f'የተገጠመ መስመር (slope {b:.3g})'), 'slot': 2 if groups is None else 3, 'kind': 'line', 'x': r(xr), 'y': r(a + b * xr)})
    sp = {'type': 'xy', 'title': title, 'x': {'label': xlabel, 'int': False}, 'y': {'label': ylabel}, 'series': series,
          'table': _tbl([xlabel, ylabel], rows)}
    if refs: sp['refs'] = refs
    if note: sp['note'] = note
    return sp

def seg(title, parts, unit='', note=None):
    sp = {'type': 'seg', 'title': title, 'unit': unit, 'parts': [{'name': n, 'v': r(v), 'slot': s} for n, v, s in parts],
          'table': _tbl([B('Part', 'ክፍል'), B('Value', 'እሴት')], [[n, r(v)] for n, v, _ in parts])}
    if note: sp['note'] = note
    return sp

def dots(title, cats, v, lo, hi, xlabel, ref0=True, note=None, extra=None):
    series = [{'name': B('Estimate with 95% interval', 'ግምት ከ95% ክልል ጋር'), 'slot': 1, 'v': r(v), 'lo': r(lo), 'hi': r(hi)}]
    if extra: series.append(extra)
    sp = {'type': 'dot', 'title': title, 'x': {'label': xlabel}, 'cats': list(cats), 'ref0': ref0, 'series': series,
          'table': _tbl([B('Item', 'ንጥል'), B('Estimate', 'ግምት'), B('Lower 95%', 'ዝቅተኛ 95%'), B('Upper 95%', 'ከፍተኛ 95%')],
                        [[c, r(a), r(b), r(d)] for c, a, b, d in zip(cats, v, lo, hi)])}
    if note: sp['note'] = note
    return sp

def emit_labs(track, level, labs, n_expected):
    assert len(labs) == n_expected, (track, level, len(labs), n_expected)
    path = os.path.join(REPO, 'content', f'labs-{track}{level}.js')
    with open(path, 'w') as f:
        f.write(f'/* Practical labs, track {track}, level {level}. Generated: code was run, charts and decisions come from its output. */\n')
        f.write('window.LABS = window.LABS || {c:{}, s:{}};\n')
        f.write(f'window.LABS.{track}[{level}] = ' + json.dumps(labs, ensure_ascii=False, indent=1) + ';\n')
    return path
