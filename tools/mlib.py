"""Helpers for module visual content: bilingual labels, diagram specs, running Python examples."""
import io, json, contextlib, textwrap, os
REPO = '/home/claude/repo-cafa'

def B(en, am):
    return {'en': en, 'am': am}

def N(en, am, s_en=None, s_am=None, hl=False):
    n = {'t': B(en, am)}
    if s_en: n['s'] = B(s_en, s_am)
    if hl: n['hl'] = True
    return n

def flow(title, nodes, loop=None, note=None):
    d = {'type': 'flow', 'title': title, 'nodes': nodes}
    if loop: d['loop'] = loop
    if note: d['note'] = note
    return d

def cycle(title, nodes, loop=None, note=None):
    d = {'type': 'cycle', 'title': title, 'nodes': nodes}
    if loop: d['loop'] = loop
    if note: d['note'] = note
    return d

def stack(title, layers, note=None):
    d = {'type': 'stack', 'title': title, 'layers': layers}
    if note: d['note'] = note
    return d

def tree(title, root, kids, note=None):
    d = {'type': 'tree', 'title': title, 'root': root, 'kids': kids}
    if note: d['note'] = note
    return d

def compare(title, cols, verdict=None):
    d = {'type': 'compare', 'title': title, 'cols': cols}
    if verdict: d['verdict'] = verdict
    return d

def col(h, items_en, items_am, tone=''):
    return {'h': h, 'items': B(items_en, items_am), 'tone': tone}

def blocks(title, bl, note=None):
    d = {'type': 'blocks', 'title': title, 'blocks': bl}
    if note: d['note'] = note
    return d

def bk(en, am, c, kids=None):
    b = {'t': B(en, am), 'c': c}
    if kids: b['kids'] = kids
    return b

def grid(title, n, start, goal, prog, walls=None, note=None):
    d = {'type': 'grid', 'title': title, 'n': n, 'start': start, 'goal': goal, 'prog': prog}
    if walls: d['walls'] = walls
    if note: d['note'] = note
    return d

def run_py(code):
    code = textwrap.dedent(code).strip('\n')
    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        exec(compile(code, '<example>', 'exec'), {'__name__': '__main__'})
    return code, buf.getvalue().rstrip()

def ex_py(code, title=None, note=None):
    code, out = run_py(code)
    e = {'lang': 'Python', 'code': code, 'out': out}
    if title: e['title'] = title
    if note: e['note'] = note
    return e

def ex_code(lang, code, title=None, note=None):
    e = {'lang': lang, 'code': textwrap.dedent(code).strip('\n')}
    if title: e['title'] = title
    if note: e['note'] = note
    return e

def ex_steps(title, steps_en, steps_am, note=None):
    e = {'title': title, 'steps': B(steps_en, steps_am)}
    if note: e['note'] = note
    return e

def emit(level, mods, n_expected):
    assert len(mods) == n_expected, (level, len(mods), n_expected)
    for m in mods:
        assert len(m['qa']['en']) == 3 and len(m['qa']['am']) == 3, (level, m['why']['en'][:40])
    path = os.path.join(REPO, 'content', f'modx-{level}.js')
    with open(path, 'w') as f:
        f.write(f'/* Level {level} module visuals: diagrams, worked examples, answers. Generated; Python outputs come from running the code. */\n')
        f.write('window.MODX = window.MODX || {};\n')
        f.write(f'window.MODX[{level}] = ' + json.dumps(mods, ensure_ascii=False, indent=1) + ';\n')
    return path

# ---------------- units (Levels 1–4) ----------------
import subprocess, tempfile

def U(t, d, o, l, a, m, q, dg=None, ex=None):
    """t, d, a, m: (en, am). o, l: list of (en, am). q: list of (q_en, q_am, ans_en, ans_am)."""
    return {'t': B(*t), 'd': B(*d), 'o': B([x[0] for x in o], [x[1] for x in o]), 'l': B([x[0] for x in l], [x[1] for x in l]),
            'a': B(*a), 'm': B(*m), 'q': B([x[0] for x in q], [x[1] for x in q]), 'qa': B([x[2] for x in q], [x[3] for x in q]),
            'dg': dg or [], 'ex': ex}

def ex_js(code, title=None, note=None):
    code = textwrap.dedent(code).strip('\n')
    with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as f:
        f.write(code); path = f.name
    out = subprocess.run(['node', path], capture_output=True, text=True, timeout=30)
    assert out.returncode == 0, out.stderr
    e = {'lang': 'JavaScript (Node.js)', 'code': code, 'out': out.stdout.rstrip()}
    if title: e['title'] = title
    if note: e['note'] = note
    return e

def ex_c(code, title=None, note=None):
    code = textwrap.dedent(code).strip('\n')
    d = tempfile.mkdtemp(); src = os.path.join(d, 'main.c'); exe = os.path.join(d, 'main')
    open(src, 'w').write(code)
    c = subprocess.run(['gcc', '-Wall', '-O1', '-o', exe, src], capture_output=True, text=True)
    assert c.returncode == 0, c.stderr
    out = subprocess.run([exe], capture_output=True, text=True, timeout=30)
    e = {'lang': 'C (gcc)', 'code': code, 'out': out.stdout.rstrip()}
    if title: e['title'] = title
    if note: e['note'] = note
    return e

def emit_units(level, mods):
    for k, us in enumerate(mods):
        assert len(us) == 6, (level, k, len(us))
        for u in us:
            assert len(u['qa']['en']) == len(u['q']['en']) >= 2 and len(u['o']['am']) == len(u['o']['en']), (level, k, u['t']['en'])
            assert u['dg'] and u['ex'], (level, k, u['t']['en'])
    path = os.path.join(REPO, 'content', f'units-{level}.js')
    with open(path, 'w') as f:
        f.write(f'/* Level {level}: each year-long module split into 6 units. Generated; code outputs come from running the code. */\n')
        f.write('window.UNITS = window.UNITS || {};\n')
        f.write(f'window.UNITS[{level}] = ' + json.dumps(mods, ensure_ascii=False, indent=1) + ';\n')
    return path

def ex_sh(script, setup=None, title=None, note=None):
    """Run a bash script in a fresh temp folder (setup = dict of filename -> content)."""
    script = textwrap.dedent(script).strip('\n'); d = tempfile.mkdtemp()
    for name, content in (setup or {}).items():
        open(os.path.join(d, name), 'w').write(textwrap.dedent(content).lstrip('\n'))
    out = subprocess.run(['bash', '-c', script], cwd=d, capture_output=True, text=True, timeout=30)
    assert out.returncode == 0, out.stderr
    e = {'lang': 'Bash', 'code': script, 'out': out.stdout.rstrip()}
    if title: e['title'] = title
    if note: e['note'] = note
    return e
