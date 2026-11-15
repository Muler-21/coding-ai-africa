/* Small SVG chart renderer for the statistics track.
   Chart specs come from the build scripts (content/stats-N.js, field "viz"), computed from the
   same code run that produced each example's printed output. Themed by CSS variables (--v0..--v3).
   Every chart has a legend (2+ series), hover/focus tooltips and a data-table view. */
(function(){
const VIZ = {}; let N = 0;
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pick = x => window.APPI.pick(x), t = k => window.APPI.t(k);
const P = x => (x && typeof x === 'object' && !Array.isArray(x)) ? pick(x) : x;
const E = s => esc(P(s) ?? '');
const minus = s => String(s).replace(/^-/, '−');
function fmt(v, d){
  if(v === null || v === undefined || v === '') return '';
  if(typeof v !== 'number') return String(P(v));
  if(Math.abs(v) < 1e-12) v = 0;
  return minus(v.toLocaleString('en-US', {minimumFractionDigits: d ?? 0, maximumFractionDigits: d ?? 3}));
}
function nice(span, n){
  let step = Math.pow(10, Math.floor(Math.log10(span / n))); const e = span / n / step;
  if(e >= 7.5) step *= 10; else if(e >= 3.5) step *= 5; else if(e >= 1.5) step *= 2;
  return step;
}
function axisDomain(vals, cfg, n, int){
  let a = cfg.min ?? Math.min(...vals), b = cfg.max ?? Math.max(...vals);
  if(a === b){ a -= 1; b += 1; }
  let step = nice(b - a, n); if(int) step = Math.max(1, Math.round(step));
  if(cfg.min === undefined) a = Math.floor(a / step) * step;
  if(cfg.max === undefined) b = Math.ceil(b / step) * step;
  const ticks = []; for(let v = Math.ceil(a / step - 1e-9) * step; v <= b + step * 1e-9; v += step) ticks.push(+v.toFixed(10));
  const dec = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
  return {a, b, ticks, dec};
}
function thin(ticks, plotW, dec){
  const lw = Math.max(...ticks.map(v => fmt(v, dec).length)) * 7 + 18, max = Math.max(2, Math.floor(plotW / lw));
  if(ticks.length <= max) return ticks; const k = Math.ceil(ticks.length / max), z = Math.max(0, ticks.indexOf(0));
  return ticks.filter((_, i) => (i - z) % k === 0);
}
function wrapLines(text, maxW){
  if(text.length * 6.6 <= maxW) return [text];
  const words = text.split(' '), lines = ['']; words.forEach(w => { const l = lines[lines.length - 1];
    if(l && (l + ' ' + w).length * 6.6 > maxW) lines.push(w); else lines[lines.length - 1] = l ? l + ' ' + w : w; });
  return lines;
}
const tspans = (lines, x) => lines.map((l, i) => `<tspan x="${x}" dy="${i ? 15 : 0}">${esc(l)}</tspan>`).join('');
const lin = (a, b, r0, r1) => v => r0 + (v - a) * (r1 - r0) / ((b - a) || 1);
const tipAttr = (s, focus) => ` data-tip="${esc(s)}"${focus ? ` tabindex="0" aria-label="${esc(s.replace('|', ', '))}"` : ''}`;
const slot = s => `c${s ?? 1}`;

/* ---------- legend & table ---------- */
function legendItems(sp){
  if(sp.type === 'seg') return sp.parts.map(p => ({name: p.name, slot: p.slot, key: 'rect'}));
  const seen = new Set(), out = [];
  (sp.series || []).forEach(s => {
    if(s.legend === false) return; const k = JSON.stringify(s.name); if(seen.has(k)) return; seen.add(k);
    const key = sp.type === 'hbar' ? 'rect' : s.hollow ? 'ring' : (s.kind === 'line' || s.kind === 'band') ? 'line' : 'dot';
    out.push({name: s.name, slot: s.slot, key, sq: s.shape === 'square'});
  });
  return out;
}
function legendHTML(sp){
  const it = legendItems(sp); if(it.length < 2) return '';
  return `<div class="vizlegend">${it.map(i => `<span><i class="lk ${i.key}${i.sq ? ' sq' : ''} ${slot(i.slot)}"></i>${E(i.name)}</span>`).join('')}</div>`;
}
function tableHTML(tb){
  return `<div class="tablewrap"><table><tr>${tb.cols.map(c => `<th>${E(c)}</th>`).join('')}</tr>${tb.rows.map(r => `<tr>${r.map(c => `<td class="${typeof c === 'number' ? 'num' : ''}">${esc(fmt(c))}</td>`).join('')}</tr>`).join('')}</table></div>`;
}
window.vizHTML = function(list){
  if(!list || !list.length) return '';
  return `<div class="vizset">${list.map(sp => { const id = 'v' + (++N); VIZ[id] = sp;
    return `<figure class="viz"><figcaption><strong>${E(sp.title)}</strong>${sp.note ? `<span class="small muted">${E(sp.note)}</span>` : ''}</figcaption>
      ${legendHTML(sp)}<div class="vizplot" data-viz="${id}" role="img" aria-label="${E(sp.title)}"></div>
      ${sp.table ? `<details class="viztable"><summary>${esc(t('tableView'))}</summary>${tableHTML(sp.table)}</details>` : ''}</figure>`; }).join('')}</div>`;
};

/* ---------- xy: lines, points, bands, reference lines ---------- */
function xy(sp, W){
  const xl = wrapLines(P(sp.x.label) || '', W - 20);
  const H = (sp.h || (W < 560 ? 250 : 300)) + 15 * (xl.length - 1), m = {l: 44, r: sp.rpad || 14, t: 24, b: 40 + 15 * (xl.length - 1)};
  const xs = [], ys = [];
  sp.series.forEach(s => { (s.x || []).forEach(v => xs.push(v)); ['y', 'lo', 'hi'].forEach(k => (s[k] || []).forEach(v => v != null && ys.push(v))); });
  (sp.refs || []).forEach(r => { if(r.kind === 'h') ys.push(r.v); if(r.kind === 'v') xs.push(r.v); });
  const yd = axisDomain(ys, sp.y, H < 260 ? 4 : 5);
  m.l = Math.max(36, 10 + 7 * Math.max(...yd.ticks.map(v => fmt(v, yd.dec).length)));
  let X, xticks, xdec = 0;
  if(sp.x.log){
    const a = Math.log10(Math.min(...xs)), b = Math.log10(Math.max(...xs)), pad = (b - a) * 0.04;
    const f = lin(a - pad, b + pad, m.l, W - m.r); X = v => f(Math.log10(v)); xticks = sp.x.ticks || [];
  } else {
    const xd = axisDomain(xs, sp.x, W < 480 ? 4 : 6, sp.x.int); X = lin(xd.a, xd.b, m.l, W - m.r); xdec = xd.dec; xticks = sp.x.ticks || thin(xd.ticks, W - m.l - m.r, xdec);
  }
  const Y = lin(yd.a, yd.b, H - m.b, m.t);
  let g = '';
  yd.ticks.forEach(v => { g += `<line class="grid" x1="${m.l}" x2="${W - m.r}" y1="${Y(v)}" y2="${Y(v)}"/><text x="${m.l - 6}" y="${Y(v) + 4}" text-anchor="end">${fmt(v, yd.dec)}</text>`; });
  g += `<line class="axis" x1="${m.l}" x2="${W - m.r}" y1="${H - m.b}" y2="${H - m.b}"/>`;
  xticks.forEach(v => { g += `<text x="${X(v)}" y="${H - m.b + 16}" text-anchor="middle">${fmt(v, xdec)}</text>`; });
  g += `<text class="axt" y="${H - m.b + 34}" text-anchor="middle">${tspans(xl, (m.l + W - m.r) / 2)}</text>`;
  g += `<text class="axt" x="0" y="12">${E(sp.y.label)}</text>`;
  let refl = '';
  (sp.refs || []).forEach(r => {
    if(r.kind === 'h') g += `<line class="ref" x1="${m.l}" x2="${W - m.r}" y1="${Y(r.v)}" y2="${Y(r.v)}"/>`, refl += `<text class="lab" x="${W - m.r}" y="${Y(r.v) - 5}" text-anchor="end">${E(r.label)}</text>`;
    if(r.kind === 'v') g += `<line class="ref" x1="${X(r.v)}" x2="${X(r.v)}" y1="${m.t}" y2="${H - m.b}"/>`, refl += `<text class="lab" x="${X(r.v) + 4}" y="${H - m.b - 6}">${E(r.label)}</text>`;
    if(r.kind === 'diag'){ const a = Math.max(yd.a, Math.min(...xs)), b = Math.min(yd.b, Math.max(...xs));
      g += `<line class="ref" x1="${X(a)}" y1="${Y(a)}" x2="${X(b)}" y2="${Y(b)}"/>`; refl += `<text class="lab" x="${X(b) - 4}" y="${Y(b) + 14}" text-anchor="end">${E(r.label)}</text>`; }
  });
  let marks = '', hits = '', labs = '';
  const ends = [];
  const order = s => s.kind === 'band' ? 0 : s.kind === 'line' ? 1 : 2;
  [...sp.series].sort((a, b) => order(a) - order(b) || (a.slot === 0 ? -1 : 0) - (b.slot === 0 ? -1 : 0)).forEach(s => {
    const c = slot(s.slot);
    if(s.kind === 'band'){
      const up = s.x.map((x, i) => `${X(x)},${Y(s.hi[i])}`), dn = s.x.map((x, i) => `${X(x)},${Y(s.lo[i])}`).reverse();
      marks += `<path class="band ${c}" d="M${up.join('L')}L${dn.join('L')}Z"/>`; return;
    }
    if(s.kind === 'line'){
      marks += `<path class="ln ${c}${s.slot === 0 ? ' mute' : ''}" d="M${s.x.map((x, i) => `${X(x)},${Y(s.y[i])}`).join('L')}"/>`;
      if(s.endlabel){ const i = s.x.length - 1; ends.push({x: X(s.x[i]), y: Y(s.y[i]), text: P(s.endlabel)}); }
    }
    const pts = s.kind === 'points' || s.markers;
    const rr = s.size || 4, many = s.x.length > 60;
    s.x.forEach((x, i) => {
      const cx = X(x), cy = Y(s.y[i]);
      if(pts){
        marks += s.shape === 'square'
          ? `<rect class="pt ${c}" x="${cx - rr}" y="${cy - rr}" width="${2 * rr}" height="${2 * rr}" rx="1.5"/>`
          : `<circle class="pt ${c}${many ? ' thin' : ''}${s.slot === 0 ? ' mute' : ''}" cx="${cx}" cy="${cy}" r="${rr}"/>`;
      }
      if(s.tip && (pts || s.kind === 'line')) hits += `<circle class="hit" cx="${cx}" cy="${cy}" r="${many ? 6 : 11}"${tipAttr(s.tip[i], !many)}/>`;
    });
    (s.labels || []).forEach(([i, text, pos]) => {
      const cx = X(s.x[i]), cy = Y(s.y[i]), right = cx > W - m.r - 90, dy = pos === 'below' ? 18 : -7;
      labs += `<text class="lab" x="${right ? cx - 7 : cx + 7}" y="${cy + dy}" text-anchor="${right ? 'end' : 'start'}">${E(text)}</text>`;
    });
  });
  ends.sort((a, b) => a.y - b.y);
  for(let i = 1; i < ends.length; i++) if(ends[i].y - ends[i - 1].y < 14) ends[i].ly = (ends[i - 1].ly ?? ends[i - 1].y) + 14;
  ends.forEach(e => { const ly = e.ly ?? e.y;
    if(Math.abs(ly - e.y) > 2) labs += `<line class="leader" x1="${e.x + 3}" y1="${e.y}" x2="${e.x + 10}" y2="${ly}"/>`;
    labs += `<text class="lab" x="${e.x + 12}" y="${ly + 4}">${esc(e.text)}</text>`; });
  return `<svg class="vz" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}${marks}${refl}${labs}${hits}</svg>`;
}

/* ---------- dot: categories down, values across (caterpillar / interval plot) ---------- */
function dot(sp, W){
  const cats = sp.cats.map(P), rowH = 24, m = {t: 8, b: 40, r: 16};
  m.l = Math.min(Math.max(...cats.map(c => c.length)) * 7 + 14, W * 0.42);
  const xl = wrapLines(P(sp.x.label) || '', W - 20); m.b += 15 * (xl.length - 1);
  const H = m.t + cats.length * rowH + m.b, vals = [];
  sp.series.forEach(s => ['v', 'lo', 'hi'].forEach(k => (s[k] || []).forEach(v => v != null && vals.push(v))));
  if(sp.ref0) vals.push(0);
  const xd = axisDomain(vals, sp.x, W < 480 ? 4 : 6), X = lin(xd.a, xd.b, m.l, W - m.r);
  let g = '', marks = '', hits = '';
  thin(xd.ticks, W - m.l - m.r, xd.dec).forEach(v => { g += `<line class="grid" x1="${X(v)}" x2="${X(v)}" y1="${m.t}" y2="${H - m.b}"/><text x="${X(v)}" y="${H - m.b + 16}" text-anchor="middle">${fmt(v, xd.dec)}</text>`; });
  if(sp.ref0) g += `<line class="axis" x1="${X(0)}" x2="${X(0)}" y1="${m.t}" y2="${H - m.b}"/>`;
  g += `<text class="axt" y="${H - m.b + 34}" text-anchor="middle">${tspans(xl, Math.max((m.l + W - m.r) / 2, W / 2))}</text>`;
  cats.forEach((cat, i) => {
    const y = m.t + i * rowH + rowH / 2;
    g += `<text x="${m.l - 8}" y="${y + 4}" text-anchor="end" class="cat">${esc(cat)}</text>`;
    const parts = [];
    sp.series.forEach(s => {
      const c = slot(s.slot), v = s.v[i];
      if(s.lo) marks += `<line class="whisk ${c}" x1="${X(s.lo[i])}" x2="${X(s.hi[i])}" y1="${y}" y2="${y}"/>`;
      marks += s.hollow ? `<circle class="pt hollow ${c}" cx="${X(v)}" cy="${y}" r="4"/>` : `<circle class="pt ${c}" cx="${X(v)}" cy="${y}" r="5"/>`;
      parts.push(fmt(v, 2) + (s.lo ? ` (${fmt(s.lo[i], 2)} to ${fmt(s.hi[i], 2)})` : '') + ' ' + P(s.name));
    });
    hits += `<rect class="hitrow" x="0" y="${y - rowH / 2}" width="${W}" height="${rowH}"${tipAttr(parts[0] + '|' + cat + (parts.length > 1 ? ' · ' + parts.slice(1).join(' · ') : ''), cats.length <= 40)}/>`;
  });
  return `<svg class="vz" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}${marks}${hits}</svg>`;
}

/* ---------- hbar: grouped horizontal bars around zero ---------- */
function barPath(x0, x1, y, t){
  const w = Math.abs(x1 - x0), r = Math.min(4, w, t / 2), s = x1 >= x0 ? 1 : -1;
  if(w < 1) return `M${x0},${y}h${s}v${t}h${-s}Z`;
  return `M${x0},${y}H${x1 - s * r}Q${x1},${y} ${x1},${y + r}V${y + t - r}Q${x1},${y + t} ${x1 - s * r},${y + t}H${x0}Z`;
}
function hbar(sp, W){
  const cats = sp.cats.map(P), ns = sp.series.length, bt = 14, gap = 2, lab = 20;
  const xl = wrapLines(P(sp.x.label) || '', W - 20);
  const gh = lab + ns * bt + (ns - 1) * gap + 14, m = {l: 12, r: 12, t: 4, b: 40 + 15 * (xl.length - 1)};
  const H = m.t + cats.length * gh + m.b, vals = [0];
  sp.series.forEach(s => s.v.forEach(v => vals.push(v)));
  const lo = Math.min(...vals), hi = Math.max(...vals), padL = lo < 0 ? 64 : 0, padR = hi > 0 ? 64 : 0;
  const xd = axisDomain(vals, {}, W < 480 ? 3 : 5), X = lin(xd.a, xd.b, m.l + padL, W - m.r - padR);
  let g = '', marks = '', hits = '';
  thin(xd.ticks, W - m.l - m.r - padL - padR, xd.dec).forEach(v => { g += `<line class="grid" x1="${X(v)}" x2="${X(v)}" y1="${m.t}" y2="${H - m.b}"/><text x="${X(v)}" y="${H - m.b + 16}" text-anchor="middle">${fmt(v, xd.dec)}</text>`; });
  g += `<line class="axis" x1="${X(0)}" x2="${X(0)}" y1="${m.t}" y2="${H - m.b}"/>`;
  g += `<text class="axt" y="${H - m.b + 34}" text-anchor="middle">${tspans(xl, W / 2)}</text>`;
  cats.forEach((cat, i) => {
    const y0 = m.t + i * gh; g += `<text class="cat" x="${m.l}" y="${y0 + 14}">${esc(cat)}</text>`;
    sp.series.forEach((s, k) => {
      const v = s.v[i], y = y0 + lab + k * (bt + gap), x0 = X(0), x1 = X(v);
      marks += `<path class="bar ${slot(s.slot)}" d="${barPath(x0, x1, y, bt)}"/>`;
      marks += `<text class="val" x="${v >= 0 ? x1 + 5 : x1 - 5}" y="${y + bt - 3}" text-anchor="${v >= 0 ? 'start' : 'end'}">${fmt(v, sp.fmt)}</text>`;
      hits += `<rect class="hitbar" x="${Math.min(x0, x1) - 4}" y="${y - 1}" width="${Math.abs(x1 - x0) + 8}" height="${bt + 2}"${tipAttr(fmt(v, sp.fmt) + '|' + P(s.name) + ' · ' + cat, true)}/>`;
    });
  });
  return `<svg class="vz" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${g}${marks}${hits}</svg>`;
}

/* ---------- seg: one whole split into parts (tall segmented bar) ---------- */
function seg(sp, W){
  const tot = sp.parts.reduce((a, p) => a + p.v, 0), H = 28, gap = 2;
  let x = 0, out = '';
  sp.parts.forEach((p, i) => {
    const w = Math.max(0, (W - gap * (sp.parts.length - 1)) * p.v / tot), share = `${(100 * p.v / tot).toFixed(0)}%`;
    out += `<rect class="segb ${slot(p.slot)}" x="${x}" y="0" width="${w}" height="${H}" rx="4"/>`;
    if(w > share.length * 8 + 14) out += `<text class="inseg${p.slot === 0 ? ' dark' : ''}" x="${x + 8}" y="${H / 2 + 5}">${share}</text>`;
    out += `<rect class="hitbar" x="${x}" y="0" width="${w}" height="${H}"${tipAttr(`${fmt(p.v, 3)} ${sp.unit || ''} (${share})|${P(p.name)}`, true)}/>`;
    x += w + gap;
  });
  return `<svg class="vz" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${out}</svg>`;
}

const R = {xy, dot, hbar, seg};
window.drawViz = function(root){
  (root || document).querySelectorAll('.vizplot[data-viz]').forEach(el => {
    const sp = VIZ[el.dataset.viz]; if(!sp || !R[sp.type]) return;
    const W = Math.max(260, Math.floor(el.clientWidth));
    if(el.dataset.w == W) return; el.dataset.w = W;
    try { el.innerHTML = R[sp.type](sp, W); } catch(err) { el.textContent = ''; console.error('chart', err); }
  });
};

/* ---------- one tooltip for every chart ---------- */
let tip;
function showTip(target, x, y){
  if(!tip){ tip = document.createElement('div'); tip.id = 'vtip'; tip.setAttribute('role', 'status'); document.body.appendChild(tip); }
  const [a, b] = target.getAttribute('data-tip').split('|');
  tip.textContent = ''; const s = document.createElement('b'); s.textContent = a; tip.appendChild(s);
  if(b){ const m = document.createElement('span'); m.textContent = b; tip.appendChild(m); }
  tip.style.display = 'block';
  const r = tip.getBoundingClientRect(), vw = window.innerWidth;
  tip.style.left = Math.max(6, Math.min(vw - r.width - 6, x + 14)) + 'px';
  tip.style.top = Math.max(6, y - r.height - 12) + 'px';
}
const hide = () => { if(tip) tip.style.display = 'none'; };
document.addEventListener('pointermove', e => { const t = e.target.closest && e.target.closest('[data-tip]'); if(t) showTip(t, e.clientX, e.clientY); else hide(); });
document.addEventListener('focusin', e => { const t = e.target.closest && e.target.closest('[data-tip]'); if(t){ const r = t.getBoundingClientRect(); showTip(t, r.left + r.width / 2, r.top); } });
document.addEventListener('focusout', hide);
window.addEventListener('scroll', hide, {passive: true});
let rz; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => drawViz(), 150); });
})();
