/* Concept diagrams for module pages. HTML/CSS (so text wraps in Amharic and on phones), plus an
   SVG grid for robot-path programs. Specs live in content/modx-N.js (window.MODX[level][module]). */
(function(){
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const P = x => (x && typeof x === 'object' && !Array.isArray(x)) ? window.APPI.pick(x) : (x ?? '');
const E = x => esc(P(x));
const T = k => window.APPI.t(k);

function node(n, cls){ return `<div class="dg-node ${cls||''}${n.hl ? ' hl' : ''}"><strong>${E(n.t)}</strong>${n.s ? `<span>${E(n.s)}</span>` : ''}</div>`; }

const R = {
  flow(d){
    return `<div class="dg-flow">${d.nodes.map((n, i) => (i ? '<span class="dg-arrow" aria-hidden="true"></span>' : '') + node(n)).join('')}</div>`
      + (d.loop ? `<div class="dg-loop"><span aria-hidden="true">↺</span> ${E(d.loop)}</div>` : '');
  },
  stack(d){
    return `<div class="dg-stack">${d.layers.map((n, i) => `<div class="dg-layer l${i % 4}"><strong>${E(n.t)}</strong>${n.s ? `<span>${E(n.s)}</span>` : ''}</div>`).join('')}</div>`;
  },
  tree(d){
    const kid = k => `<li>${node(k, 'small')}${k.kids && k.kids.length ? `<ul>${k.kids.map(kid).join('')}</ul>` : ''}</li>`;
    return `<div class="dg-tree"><ul><li>${node(d.root, 'root')}<ul>${d.kids.map(kid).join('')}</ul></li></ul></div>`;
  },
  compare(d){
    return `<div class="dg-compare">${d.cols.map(c => `<div class="dg-col ${c.tone || ''}"><strong>${E(c.h)}</strong><ul>${P(c.items).map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div>`
      + (d.verdict ? `<p class="dg-verdict">${E(d.verdict)}</p>` : '');
  },
  blocks(d){
    const blk = b => `<div class="blk ${b.c}"><span>${E(b.t)}</span>${b.kids ? `<div class="blk-in">${b.kids.map(blk).join('')}</div><div class="blk-end"></div>` : ''}</div>`;
    return `<div class="dg-blocks">${d.blocks.map(blk).join('')}</div>`;
  },
  cycle(d){
    const n = d.nodes.length;
    return `<div class="dg-cycle" style="--n:${n}">${d.nodes.map((x, i) => `<div class="dg-cnode">${node(x)}${i < n - 1 ? '<span class="dg-arrow" aria-hidden="true"></span>' : ''}</div>`).join('')}</div><div class="dg-loop"><span aria-hidden="true">↺</span> ${E(d.loop || {en: 'and round again', am: 'እንደገና ይዞራል'})}</div>`;
  },
  grid(d){
    const n = d.n, c = 44, pad = 6, W = n * c + 2 * pad;
    const dirs = {N: [-1, 0], E: [0, 1], S: [1, 0], W: [0, -1]}, order = ['N', 'E', 'S', 'W'];
    let [r, col, dir] = d.start; const pts = [[r, col]]; let bump = null;
    for(const ch of d.prog){
      if(ch === 'R') dir = order[(order.indexOf(dir) + 1) % 4];
      else if(ch === 'L') dir = order[(order.indexOf(dir) + 3) % 4];
      else if(ch === 'F'){ const [dr, dc] = dirs[dir]; const nr = r + dr, nc = col + dc;
        if(nr < 0 || nc < 0 || nr >= n || nc >= n || (d.walls || []).some(([a, b]) => a === nr && b === nc)){ bump = [nr, nc]; break; }
        r = nr; col = nc; pts.push([r, col]); }
    }
    const cx = k => pad + k * c + c / 2;
    let g = '';
    for(let i = 0; i < n; i++) for(let j = 0; j < n; j++) g += `<rect class="gcell" x="${pad + j * c}" y="${pad + i * c}" width="${c}" height="${c}"/>`;
    (d.walls || []).forEach(([a, b]) => { g += `<rect class="gwall" x="${pad + b * c + 5}" y="${pad + a * c + 5}" width="${c - 10}" height="${c - 10}" rx="6"/>`; });
    const [gr, gc] = d.goal;
    g += `<path class="ggoal" transform="translate(${cx(gc)},${cx(gr)})" d="M-13,1 L0,-12 L13,1 L9,1 L9,12 L3,12 L3,5 L-3,5 L-3,12 L-9,12 L-9,1 Z"/>`;
    g += `<polyline class="gpath" points="${pts.map(([a, b]) => `${cx(b)},${cx(a)}`).join(' ')}"/>`;
    pts.forEach(([a, b], k) => { if(k) g += `<circle class="gstep" cx="${cx(b)}" cy="${cx(a)}" r="4"/>`; });
    const rot = {N: 0, E: 90, S: 180, W: 270}[d.start[2]];
    g += `<g transform="translate(${cx(d.start[1])},${cx(d.start[0])}) rotate(${rot})"><circle class="gbot" r="13"/><path class="gnose" d="M0,-9 L6,1 L-6,1 Z"/></g>`;
    if(bump) g += `<text class="gbump" x="${cx(Math.max(0, Math.min(n - 1, bump[1])))}" y="${cx(Math.max(0, Math.min(n - 1, bump[0]))) + 6}" text-anchor="middle">✕</text>`;
    const card = ch => ({F: ['↑', T('cardF')], R: ['↻', T('cardR')], L: ['↺', T('cardL')]}[ch]);
    const reached = r === gr && col === gc;
    return `<div class="dg-grid"><svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" role="img" aria-label="${E(d.title)}">${g}</svg>
      <div><div class="cards">${[...d.prog].map((ch, i) => { const [ic, lab] = card(ch); return `<span class="acard"><b>${ic}</b><small>${i + 1}. ${esc(lab)}</small></span>`; }).join('')}</div>
      <p class="small ${reached ? 'ok' : 'warn'}">${reached ? '✓ ' + esc(T('gridOk')) : '✕ ' + esc(T('gridBug'))}</p></div></div>`;
  }
};

window.diagramHTML = function(list){
  if(!list || !list.length) return '';
  return list.map(d => `<figure class="dg"><figcaption>${E(d.title)}</figcaption>${(R[d.type] || (() => ''))(d)}${d.note ? `<p class="small muted dg-note">${E(d.note)}</p>` : ''}</figure>`).join('');
};
})();
