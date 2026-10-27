// The ten service cards. Edit copy/tools here; markup is rendered by components/sections/Services.tsx.
// Each `art` is an inline SVG (400x300) drawn in the editorial ink style.

const polar = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
};

const arc = (cx: number, cy: number, r: number, a1: number, a2: number) => {
  const [x1, y1] = polar(cx, cy, r, a1);
  const [x2, y2] = polar(cx, cy, r, a2);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
};

const gear = (cx: number, cy: number, ro: number, ri: number, teeth: number) => {
  const step = 360 / teeth;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = i * step;
    const pts = [
      polar(cx, cy, ri, a),
      polar(cx, cy, ro, a + step * 0.12),
      polar(cx, cy, ro, a + step * 0.42),
      polar(cx, cy, ri, a + step * 0.55),
    ];
    d += pts.map((p, k) => `${i === 0 && k === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' ';
  }
  return d + 'Z';
};

const svg = (inner: string) =>
  `<svg class="ill" viewBox="0 0 400 300" aria-hidden="true" focusable="false">${inner}</svg>`;

/* 01 — Fine-tuning console */
const artTune = (() => {
  const xs = [72, 124, 176, 228, 280, 332];
  const a = [40, -30, 22, -46, 12, -22];
  const b = [-22, 26, -36, 14, -30, 30];
  const sliders = xs
    .map(
      (x, i) => `
      <line class="d" pathLength="1" x1="${x}" y1="122" x2="${x}" y2="268" style="--d:${0.25 + i * 0.06}s"/>
      <line class="faint" x1="${x - 6}" y1="150" x2="${x + 6}" y2="150"/>
      <line class="faint" x1="${x - 6}" y1="240" x2="${x + 6}" y2="240"/>
      <g class="knob" style="--a:${a[i]}px;--b:${b[i]}px;--t:${2.4 + i * 0.37}s">
        <rect x="${x - 14}" y="187" width="28" height="16" rx="3" class="${i === 3 ? 'accf' : 'paperf'}"/>
        <line x1="${x - 6}" y1="195" x2="${x + 6}" y2="195"/>
      </g>`
    )
    .join('');
  return svg(`
    <text class="t" x="24" y="28">LOSS · BASE</text>
    <text class="t acc-t" x="300" y="28">TUNED</text>
    <path class="d faint-s" pathLength="1" style="--d:.05s" d="M24 74 L48 54 L66 88 L88 46 L110 82 L130 60 L152 94 L176 50 L198 78 L220 58 L244 90 L266 52 L290 80 L312 64 L336 76 L376 68"/>
    <path class="d acc" pathLength="1" style="--d:.6s" stroke-width="2.6" d="M24 74 C 110 74, 150 71, 210 68 S 320 63, 376 60"/>
    ${sliders}`);
})();

/* 02 — Agent swarm with hand-offs */
const artSwarm = (() => {
  const nodes = [0, 1, 2, 3, 4]
    .map((k) => {
      const [x, y] = polar(200, 150, 112, k * 72 - 90);
      return `<line class="flow" x1="200" y1="150" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" class="${k === 2 ? 'accf' : 'paperf'}"/>
        <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" class="inkf"/>`;
    })
    .join('');
  return svg(`
    <circle class="dash" cx="200" cy="150" r="112"/>
    <g class="spin-slow" style="transform-origin:200px 150px">${nodes}</g>
    <rect class="paperf d" pathLength="1" x="158" y="108" width="84" height="84" rx="20"/>
    <circle class="dash acc" cx="200" cy="154" r="22"/>
    <path d="M190 156c-6-1-6-11 1-12 0-6 9-8 12-3 5-3 12 1 10 7 6 2 4 11-2 11-1 5-9 6-11 2-4 3-10 1-10-5z"/>
    <text class="t" x="188" y="128">LLM</text>
    <text class="t" x="22" y="290">handoff ⇄</text>
    <text class="t" x="300" y="290">24 / 7</text>`);
})();

/* 03 — Skill & system files */
const artSkills = (() => {
  const widths = [150, 104, 132, 78, 120, 140, 66];
  const bars = widths
    .map(
      (w, i) =>
        `<rect class="bar ${i === 2 ? 'accf' : 'inkf'}" x="108" y="${96 + i * 20}" width="${w}" height="6" rx="3" style="--i:${i}" opacity="${i === 2 ? 1 : 0.22}"/>`
    )
    .join('');
  return svg(`
    <rect class="paperf" x="160" y="72" width="184" height="206" rx="6" opacity=".55"/>
    <rect class="paperf" x="130" y="54" width="184" height="212" rx="6"/>
    <path class="paperf d" pathLength="1" d="M90 30 H246 L278 62 V262 H90 Z"/>
    <path d="M246 30 V62 H278"/>
    <text class="t tb" x="108" y="78"># SKILL.md</text>
    ${bars}
    <text class="t" x="108" y="250">## when_to_use</text>
    <rect class="blink inkf" x="214" y="240" width="8" height="13"/>
    <text class="t" x="296" y="96">guidelines/</text>
    <text class="t" x="296" y="116">prompts/</text>
    <text class="t acc-t" x="296" y="136">evals/</text>`);
})();

/* 04 — Enterprise adoption cycle */
const artAdopt = svg(`
  <path class="d" pathLength="1" style="--d:.1s" d="${arc(200, 150, 108, -60, 20)}"/>
  <path class="d" pathLength="1" style="--d:.35s" d="${arc(200, 150, 108, 60, 140)}"/>
  <path class="d acc" pathLength="1" style="--d:.6s" d="${arc(200, 150, 108, 180, 250)}"/>
  <path d="M296 205 l6 -14 l-15 4"/>
  <path d="M138 240 l-16 2 l8 -12"/>
  <path class="acc" d="M155 52 l15 -6 l-4 15"/>
  <g class="spin" style="transform-origin:200px 44px"><path class="paperf" d="${gear(200, 44, 30, 22, 10)}"/><circle cx="200" cy="44" r="9" class="paperf"/></g>
  <path class="paperf" d="M64 250 V196 L86 210 V196 L108 210 V196 L130 210 V250 Z"/>
  <rect x="112" y="168" width="10" height="30" class="paperf"/>
  <rect x="76" y="226" width="12" height="12"/><rect x="100" y="226" width="12" height="12"/>
  <rect class="paperf" x="282" y="188" width="58" height="58" rx="6"/>
  <path d="M296 188 v-10 M311 188 v-10 M326 188 v-10 M296 246 v10 M311 246 v10 M326 246 v10 M282 202 h-10 M282 217 h-10 M282 232 h-10 M340 202 h10 M340 217 h10 M340 232 h10"/>
  <text class="t tb" x="301" y="222">AI</text>
  <text class="t" x="168" y="146">AUDIT</text>
  <text class="t acc-t" x="160" y="166">AUTOMATE</text>
  <text class="t" x="54" y="280">manual</text>
  <text class="t" x="280" y="280">pipeline</text>`);

/* 05 — One person, many outputs */
const artMicro = (() => {
  const screens = [
    [34, 34],
    [274, 34],
    [34, 200],
    [274, 200],
  ];
  const s = screens
    .map(
      ([x, y], i) => `
    <line class="flow" x1="200" y1="150" x2="${x + 46}" y2="${y + 31}"/>
    <rect class="paperf" x="${x}" y="${y}" width="92" height="62" rx="6"/>
    ${
      i === 0
        ? `<path class="acc" d="M${x + 12} ${y + 48} L${x + 32} ${y + 34} L${x + 48} ${y + 40} L${x + 78} ${y + 16}"/>`
        : i === 1
        ? `<rect x="${x + 12}" y="${y + 14}" width="40" height="6" rx="3" class="inkf" opacity=".25"/><rect x="${x + 12}" y="${y + 28}" width="64" height="6" rx="3" class="inkf" opacity=".25"/><rect x="${x + 12}" y="${y + 42}" width="30" height="6" rx="3" class="accf"/>`
        : i === 2
        ? `<circle cx="${x + 30}" cy="${y + 31}" r="14"/><path d="M${x + 30} ${y + 17} V${y + 31} H${x + 44}" class="acc"/><rect x="${x + 54}" y="${y + 20}" width="26" height="6" rx="3" class="inkf" opacity=".25"/>`
        : `<path d="M${x + 14} ${y + 46} h10 v-12 h10 v-10 h10 v22 h10 v-30 h10 v30" />`
    }`
    )
    .join('');
  return svg(`
    ${s}
    <path class="paperf" d="M152 232 C152 192 174 172 200 172 C226 172 248 192 248 232 Z"/>
    <circle class="paperf" cx="200" cy="138" r="24"/>
    <path d="M190 140 q4 4 8 0 M204 140 q4 4 8 0"/>
    <line x1="120" y1="232" x2="280" y2="232"/>
    <text class="t" x="132" y="270">1 PERSON · <tspan class="acc-t">20× OUTPUT</tspan></text>`);
})();

/* 06 — Digital products */
const artProducts = svg(`
  <path class="paperf d" pathLength="1" d="M200 238 C 160 222, 110 222, 62 236 V 92 C 110 78, 160 78, 200 94 Z"/>
  <path class="paperf d" pathLength="1" style="--d:.2s" d="M200 238 C 240 222, 290 222, 338 236 V 92 C 290 78, 240 78, 200 94 Z"/>
  <path class="faint" d="M82 118 C 120 108, 160 108, 184 116 M82 140 C 120 130, 160 130, 184 138 M82 162 C 120 152, 150 152, 170 158 M82 184 C 120 174, 160 174, 184 182"/>
  <path class="acc" d="M82 206 C 110 198, 140 198, 160 202"/>
  <g class="flip"><path class="paperf" d="M200 94 C 240 78, 290 78, 338 92 V 236 C 290 222, 240 222, 200 238 Z"/><path class="faint" d="M220 120 h90 M220 142 h96 M220 164 h70"/></g>
  <g transform="rotate(-10 300 44)"><rect class="accf" x="262" y="26" width="78" height="36" rx="5"/><circle cx="274" cy="44" r="4" class="paperf"/><text class="t tb paper-t" x="286" y="49">$49</text></g>
  <text class="t" x="62" y="276">BLUEPRINT · v1.0</text>
  <text class="t" x="62" y="40">PLAYBOOK</text>`);

/* 07 — Multi-agent harness terminal */
const artHarness = (() => {
  const lines = [
    ['$ harness run --agents 4', ''],
    ['▸ researcher ······· ok  1.2s', ''],
    ['▸ writer ··········· ok  3.4s', ''],
    ['▸ critic ··········· retry', 'acc-t'],
    ['▸ critic ··········· ok  0.9s', ''],
    ['✓ eval 0.94   cost $0.03', 'tb'],
  ];
  const t = lines
    .map(([s, c], i) => `<text class="t tl ${c}" x="50" y="${96 + i * 26}" style="--i:${i}">${s}</text>`)
    .join('');
  return svg(`
    <rect class="paperf d" pathLength="1" x="28" y="30" width="344" height="240" rx="10"/>
    <line x1="28" y1="60" x2="372" y2="60"/>
    <circle cx="48" cy="45" r="5" class="accf"/><circle cx="66" cy="45" r="5"/><circle cx="84" cy="45" r="5"/>
    <text class="t" x="276" y="49">harness.log</text>
    ${t}
    <rect class="blink inkf" x="50" y="240" width="9" height="14"/>`);
})();

/* 08 — Dataset grid */
const artData = (() => {
  const cols = 8;
  const rows = 6;
  const on = new Set([10, 13, 19, 22, 26, 29, 35, 41, 44]);
  const off = new Set([11, 20, 30, 37]);
  let cells = '';
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const k = r * cols + c;
      const x = 48 + c * 38;
      const y = 50 + r * 32;
      const cls = r === 0 ? 'head' : on.has(k) ? 'cell-on' : '';
      cells += `<rect class="cell ${cls}" x="${x}" y="${y}" width="38" height="32" style="--i:${k % 9}"/>`;
      if (off.has(k)) cells += `<path class="faint-s" d="M${x + 10} ${y + 9} l18 14 M${x + 28} ${y + 9} l-18 14"/>`;
    }
  return svg(`
    ${cells}
    <text class="t paper-t tb" x="56" y="71">id</text>
    <text class="t paper-t tb" x="94" y="71">text</text>
    <text class="t paper-t tb" x="208" y="71">label</text>
    <g class="lens"><circle class="paperf-a" cx="300" cy="170" r="34" stroke-width="2.5"/><line x1="324" y1="194" x2="350" y2="220" stroke-width="5"/></g>
    <text class="t" x="48" y="276">clean · label · <tspan class="acc-t">license</tspan></text>`);
})();

/* 09 — Candlesticks + signal */
const artTrading = (() => {
  // [open, close, high, low] as y-coordinates (smaller = higher)
  const data = [
    [210, 180, 170, 222],
    [182, 196, 172, 206],
    [196, 160, 150, 204],
    [162, 140, 128, 170],
    [140, 158, 132, 168],
    [158, 120, 108, 164],
    [122, 132, 112, 142],
    [132, 96, 84, 140],
    [98, 76, 64, 106],
  ];
  const candles = data
    .map(([o, c, h, l], i) => {
      const x = 52 + i * 36;
      const up = c < o;
      return `<g class="candle" style="--i:${i}">
        <line x1="${x}" y1="${h}" x2="${x}" y2="${l}"/>
        <rect x="${x - 9}" y="${Math.min(o, c)}" width="18" height="${Math.max(4, Math.abs(o - c))}" class="${up ? 'paperf' : 'inkf'}"/>
      </g>`;
    })
    .join('');
  return svg(`
    <path class="faint" d="M30 80 H370 M30 130 H370 M30 180 H370 M30 230 H370"/>
    ${candles}
    <path class="d acc" pathLength="1" style="--d:.8s" stroke-width="2.4" d="M52 200 C 90 190, 110 175, 160 158 S 240 140, 268 122 S 330 96, 340 84"/>
    <g class="pop" style="--i:10"><path class="accf" d="M350 58 l10 -14 l10 14 z"/><text class="t acc-t" x="318" y="40">signal</text></g>
    <text class="t" x="30" y="276">sentiment · risk · <tspan class="tb">TA</tspan></text>`);
})();

/* 10 — Content press */
const artContent = (() => {
  const spokes = (cx: number, cy: number) =>
    [0, 60, 120].map((a) => {
      const [x1, y1] = polar(cx, cy, 30, a);
      const [x2, y2] = polar(cx, cy, 30, a + 180);
      return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
    }).join('');
  const posts = [0, 1, 2]
    .map(
      (i) => `<g class="post" style="--i:${i}">
        <rect class="paperf" x="150" y="122" width="44" height="56" rx="4"/>
        <rect x="156" y="128" width="32" height="22" class="${i === 1 ? 'accf' : 'inkf'}" opacity="${i === 1 ? 1 : 0.18}"/>
        <line x1="156" y1="158" x2="186" y2="158"/><line x1="156" y1="166" x2="176" y2="166"/>
      </g>`
    )
    .join('');
  const bars = Array.from({ length: 20 }, (_, i) => {
    const x = 160 + i * 10.5;
    return `<line class="wave" x1="${x}" y1="238" x2="${x}" y2="262" style="--i:${i}"/>`;
  }).join('');
  return svg(`
    <path d="M60 60 V250 M150 60 V250 M50 60 H160 M50 250 H160"/>
    <g class="spin" style="transform-origin:105px 112px"><circle class="paperf" cx="105" cy="112" r="38"/>${spokes(105, 112)}</g>
    <g class="spin-rev" style="transform-origin:105px 190px"><circle class="paperf" cx="105" cy="190" r="38"/>${spokes(105, 190)}</g>
    <line class="faint" x1="143" y1="150" x2="380" y2="150"/>
    ${posts}
    ${bars}
    <text class="t" x="164" y="226">voiceover</text>
    <text class="t" x="230" y="100">hooks · scripts · <tspan class="acc-t">posts</tspan></text>`);
})();

export type Service = { title: string; desc: string; pitch: string; tools: string[]; art: string };

export const services: Service[] = [
  {
    title: 'Custom Model Fine-Tuning',
    desc: 'We take a world-class model and train it on your documents, tickets and tone until it answers like your sharpest expert. Every single time.',
    pitch: 'A model that knows your business better than your competitors know theirs.',
    tools: ['PyTorch', 'Unsloth', 'Hugging Face'],
    art: artTune,
  },
  {
    title: 'AI Agent Swarms for Business Operations',
    desc: 'Agent crews that run lead gen, outreach and support around the clock. They pass work to each other and never drop the ball.',
    pitch: 'Your new night shift. And day shift. And weekend shift.',
    tools: ['n8n', 'LangChain', 'Custom frameworks'],
    art: artSwarm,
  },
  {
    title: 'Domain Skills & System Files',
    desc: 'We bottle your best people’s expertise into skill files, playbooks and prompt frameworks any agent can load in a second.',
    pitch: 'Tribal knowledge, weaponized and version-controlled.',
    tools: ['Claude Skills', 'Markdown', 'MCP'],
    art: artSkills,
  },
  {
    title: 'Enterprise AI Adoption',
    desc: 'The AI already exists. The bottleneck is your org chart. We audit the manual grind and rebuild it as pipelines that run themselves.',
    pitch: 'From copy-paste chaos to a business on autopilot.',
    tools: ['Zapier', 'Make', 'n8n'],
    art: artAdopt,
  },
  {
    title: 'One-Person & Micro-Agency Systems',
    desc: 'The agent stack that lets a team of two out-ship a 20-person agency. Same headcount, ten times the output.',
    pitch: 'Small team. Unfair advantage.',
    tools: ['Claude', 'Codex', 'Cursor'],
    art: artMicro,
  },
  {
    title: 'AI Digital Products & Frameworks',
    desc: 'We turn what you know into playbooks, blueprints and setup guides, built, tested and packaged with AI, ready to sell.',
    pitch: 'Your expertise, earning while you sleep.',
    tools: ['Gumroad', 'Notion', 'Substack'],
    art: artProducts,
  },
  {
    title: 'Multi-Agent Harnesses & Dev Tools',
    desc: 'Orchestration harnesses with real logging, retries and evals, so multi-agent systems behave in production, not just in demos.',
    pitch: 'Agents that never go rogue.',
    tools: ['LangGraph', 'GitHub', 'OpenTelemetry'],
    art: artHarness,
  },
  {
    title: 'Niche Datasets for Fine-Tuning',
    desc: 'Data is the whole game. We collect, clean, label and synthesize domain datasets that models actually learn from.',
    pitch: 'The fuel AI labs and serious companies line up for.',
    tools: ['Hugging Face', 'Label Studio', 'Kaggle'],
    art: artData,
  },
  {
    title: 'Trading & Financial Analysis Pipelines',
    desc: 'Reasoning models plus always-on data loops for technical analysis, sentiment and risk. They read every filing and headline as it lands.',
    pitch: 'A research desk that never blinks.',
    tools: ['Python', 'Perplexity', 'Reasoning models'],
    art: artTrading,
  },
  {
    title: 'AI-First Content Engine',
    desc: 'Automated pipelines that crank out graphics, scripts, hooks, voiceovers and posts for your niche. On brand. On schedule. On fire.',
    pitch: 'Build the audience. Then cash in with sponsors, affiliates or your own store.',
    tools: ['ElevenLabs', 'Runway', 'Canva AI'],
    art: artContent,
  },
];
