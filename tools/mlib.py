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
