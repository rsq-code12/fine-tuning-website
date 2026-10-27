// Procedural particle formations, one per story chapter.
// Every builder returns { pos: Float32Array(N*3), acc: Float32Array(N*3) }
// where acc = (accent 0..1, alpha 0..1, eye flag) per particle.
// Eye flag: 1 = iris (follows the look target, hidden behind the lids), -1 = eyelid (closes on blink), 0 = static.

export type Shape = { pos: Float32Array; acc: Float32Array };
type Vec3 = [number, number, number];

const TAU = Math.PI * 2;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeTools(seed: number) {
  const r = mulberry32(seed);
  const gauss = () => {
    const u = 1 - r();
    const v = r();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
  };
  const onSphere = (): Vec3 => {
    const u = r() * 2 - 1;
    const th = r() * TAU;
    const s = Math.sqrt(1 - u * u);
    return [s * Math.cos(th), u, s * Math.sin(th)];
  };
  const inSphere = (): Vec3 => {
    const [x, y, z] = onSphere();
    const k = Math.cbrt(r());
    return [x * k, y * k, z * k];
  };
  return { r, gauss, onSphere, inSphere };
}

function alloc(N: number): Shape {
  return { pos: new Float32Array(N * 3), acc: new Float32Array(N * 3) };
}

function put(out: Shape, i: number, x: number, y: number, z: number, accent: number, alpha: number, flag = 0) {
  out.pos[i * 3] = x;
  out.pos[i * 3 + 1] = y;
  out.pos[i * 3 + 2] = z;
  out.acc[i * 3] = accent;
  out.acc[i * 3 + 1] = alpha;
  out.acc[i * 3 + 2] = flag;
}

/* 00 · The Watcher (hero): a panther's eye. Slit pupil, textured iris, slanted lids, fur.
   Iris particles follow the cursor and hide behind the lids; lid particles close on blink. */
export const EYE = { W: 2.4, slant: 0.12, top: 0.95, bottom: 0.72, iris: 1.04, pupilW: 0.13, pupilH: 0.92 };
export const eyeTop = (u: number) => EYE.slant * u + EYE.top * Math.pow(Math.max(0, 1 - u * u), 0.72);
export const eyeBot = (u: number) => EYE.slant * u - EYE.bottom * Math.pow(Math.max(0, 1 - u * u), 0.9) * (1 - 0.15 * u);

function eye(N: number) {
  const { r, gauss } = makeTools(11);
  const out = alloc(N);
  const { W, iris: IRIS, pupilW: PW, pupilH: PH } = EYE;
  const inside = (x: number, y: number) => {
    const u = x / W;
    return Math.abs(u) < 1 && y < eyeTop(u) && y > eyeBot(u);
  };
  // distance from the centre to the slit pupil's edge along angle a
  const slitR = (a: number) => 1 / Math.sqrt((Math.cos(a) / PW) ** 2 + (Math.sin(a) / PH) ** 2);

  // iris freckles
  const freckles = Array.from({ length: 70 }, () => {
    const a = r() * TAU;
    const rad = slitR(a) + 0.1 + r() * (IRIS - slitR(a) - 0.14);
    return [Math.cos(a) * rad, Math.sin(a) * rad];
  });

  // fur strokes around the eye, flowing outward and swept toward the outer (right) corner
  const strokes = Array.from({ length: 3400 }, (_, n) => {
    const brow = n % 4 === 0;
    for (;;) {
      const ang = brow ? 0.18 * Math.PI + r() * 0.72 * Math.PI : r() * TAU;
      const d = Math.pow(r(), brow ? 1.2 : 1.7);
      const bx = Math.cos(ang) * (W * 1.0 + 0.06 + d * 1.55);
      const by = Math.sin(ang) * ((brow ? 1.08 : 0.95) + d * 1.35) + EYE.slant * (bx / W);
      if (inside(bx, by)) continue;
      let dx = Math.cos(ang) + 0.6;
      let dy = Math.sin(ang) * 0.85 + (brow ? 0.45 : 0.2);
      const l = Math.hypot(dx, dy) || 1;
      dx /= l;
      dy /= l;
      return { bx, by, dx, dy, len: 0.09 + r() * 0.2 + d * 0.18 + (brow ? 0.08 : 0), d, brow };
    }
  });

  for (let i = 0; i < N; i++) {
    const k = r();
    if (k < 0.4) {
      // iris fibres from the slit to the limbus, with wobble and crypts (sparse pockets)
      const f = (r() * 360) | 0;
      let x = 0;
      let y = 0;
      let z = 0;
      let accent = 0;
      for (let tries = 0; tries < 8; tries++) {
        let a = (f / 360) * TAU + gauss() * 0.004;
        const rb = slitR(a);
        const t = Math.pow(r(), 0.9);
        const rad = rb + 0.015 + t * (IRIS - rb - 0.015);
        a += Math.sin(rad * 14 + f * 0.7) * 0.028;
        const crypt = Math.sin(a * 9 + 1.3) * Math.sin(rad * 16);
        if (crypt > 0.7 && r() < 0.85) continue;
        x = Math.cos(a) * rad;
        y = Math.sin(a) * rad;
        z = 0.16 * (1 - (rad / IRIS) ** 2);
        accent = t < 0.13 ? 0.55 * (1 - t / 0.13) : 0; // heat bleeding out of the slit
        break;
      }
      const fibreTone = 0.3 + 0.7 * (Math.sin(f * 12.9898) * 43758.5453 - Math.floor(Math.sin(f * 12.9898) * 43758.5453));
      put(out, i, x, y, z, accent, (0.3 + 0.6 * r()) * fibreTone + 0.15, 1);
    } else if (k < 0.45) {
      // jagged collarette + concentric contraction furrows
      const a = r() * TAU;
      if (r() < 0.5) {
        const rad = slitR(a) + 0.2 + 0.035 * Math.sin(a * 26) + gauss() * 0.006;
        put(out, i, Math.cos(a) * rad, Math.sin(a) * rad, 0.12, 0, 1, 1);
      } else {
        const ring = [0.62, 0.7, 0.78][(r() * 3) | 0] * IRIS;
        const rad = ring + gauss() * 0.005;
        put(out, i, Math.cos(a) * rad, Math.sin(a) * rad, 0.08, 0, 0.5, 1);
      }
    } else if (k < 0.48) {
      const c = freckles[(r() * freckles.length) | 0];
      put(out, i, c[0] + gauss() * 0.013, c[1] + gauss() * 0.013, 0.1, 0, 1, 1);
    } else if (k < 0.54) {
      // limbal ring: crisp edge plus a soft outer haze
      const a = r() * TAU;
      const soft = r() < 0.35;
      const rad = IRIS + gauss() * (soft ? 0.035 : 0.01);
      put(out, i, Math.cos(a) * rad, Math.sin(a) * rad, 0.02, 0, soft ? 0.35 : 1, 1);
    } else if (k < 0.58) {
      // slit pupil rim: ember
      const a = r() * TAU;
      const rad = slitR(a) + Math.abs(gauss()) * 0.012;
      put(out, i, Math.cos(a) * rad, Math.sin(a) * rad, 0.17, 1, 1, 1);
    } else if (k < 0.588) {
      // corneal catch-lights: a window highlight and a small secondary
      if (r() < 0.75) put(out, i, -0.34 + (r() - 0.5) * 0.14, 0.34 + (r() - 0.5) * 0.08, 0.24, 0, 1, 1);
      else put(out, i, 0.26 + gauss() * 0.02, -0.24 + gauss() * 0.02, 0.24, 0, 0.9, 1);
    } else if (k < 0.7) {
      // thick lid rims; upper lid heavier; pointed inner corner with a tear-duct notch
      const upper = r() < 0.6;
      const u = r() * 2 - 1;
      const m = r();
      let y = upper ? eyeTop(u) + m * 0.11 : eyeBot(u) - m * 0.07;
      if (!upper && u < -0.84) y -= 0.1 * ((-0.84 - u) / 0.16);
      put(out, i, u * W, y + gauss() * 0.006, 0.3, 0, 1 - m * 0.55, -1);
    } else if (k < 0.71) {
      // tear duct
      put(out, i, -W * 0.95 + gauss() * 0.04, eyeBot(-0.95) - 0.02 + gauss() * 0.03, 0.25, 0, 0.8, 0);
    } else if (k < 0.725) {
      // a whisper of sclera in the corners
      let x = 0;
      let y = 0;
      for (let t = 0; t < 12; t++) {
        x = (r() * 2 - 1) * W * 0.97;
        y = (r() * 2 - 1);
        if (inside(x, y) && Math.hypot(x, y) > IRIS * 1.05) break;
      }
      put(out, i, x, y, -0.05 - 0.3 * (x / W) ** 2, 0, 0.1, 0);
    } else {
      // fur
      const st = strokes[(r() * strokes.length) | 0];
      const t = r();
      put(
        out,
        i,
        st.bx + st.dx * st.len * t,
        st.by + st.dy * st.len * t,
        -0.1 - st.d * 0.5,
        0,
        ((st.brow ? 0.85 : 0.72) * Math.pow(1 - st.d, 1.4) + 0.06) * (1 - 0.55 * t),
        0
      );
    }
  }
  return out;
}

/* 01 · Raw internet chaos */
function chaos(N: number) {
  const { r, gauss } = makeTools(23);
  const out = alloc(N);
  const streams = Array.from({ length: 30 }, () => {
    const start: Vec3 = [(r() - 0.5) * 10, (r() - 0.5) * 5, (r() - 0.5) * 6];
    const dir: Vec3 = [r() - 0.5, (r() - 0.5) * 0.6, r() - 0.5];
    const l = Math.hypot(...dir);
    const len = 2 + r() * 4;
    return { start, dir: dir.map((d) => (d / l) * len) as Vec3 };
  });
  for (let i = 0; i < N; i++) {
    const accent = r() < 0.012 ? 1 : 0;
    const alpha = 0.35 + r() * 0.6;
    if (r() < 0.68) {
      put(out, i, gauss() * 3.4, gauss() * 1.7, gauss() * 2.4, accent, alpha);
    } else {
      const s = streams[(r() * streams.length) | 0];
      const t = r();
      put(
        out,
        i,
        s.start[0] + s.dir[0] * t + gauss() * 0.04,
        s.start[1] + s.dir[1] * t + gauss() * 0.04,
        s.start[2] + s.dir[2] * t + gauss() * 0.04,
        accent,
        alpha
      );
    }
  }
  return out;
}

/* 02 · Curated data blocks */
function dataBlocks(N: number) {
  const { r, gauss, onSphere } = makeTools(37);
  const out = alloc(N);
  const n = 3;
  const size = 0.66;
  const gap = 0.2;
  const total = n * size + (n - 1) * gap;
  const off = -total / 2;
  const cubes: Vec3[] = [];
  for (let x = 0; x < n; x++)
    for (let y = 0; y < n; y++)
      for (let z = 0; z < n; z++) cubes.push([off + x * (size + gap), off + y * (size + gap), off + z * (size + gap)]);
  const highlighted = new Set([7, 13, 19]);
  const edges: [number, number][] = [];
  for (let a = 0; a < 8; a++)
    for (let b = a + 1; b < 8; b++) {
      const diff = a ^ b;
      if (diff === 1 || diff === 2 || diff === 4) edges.push([a, b]);
    }
  const corner = (o: Vec3, c: number): Vec3 => [o[0] + (c & 1) * size, o[1] + ((c >> 1) & 1) * size, o[2] + ((c >> 2) & 1) * size];

  for (let i = 0; i < N; i++) {
    if (r() < 0.85) {
      const ci = (r() * cubes.length) | 0;
      const o = cubes[ci];
      const accent = highlighted.has(ci) ? 1 : 0;
      if (r() < 0.74) {
        const [a, b] = edges[(r() * edges.length) | 0];
        const A = corner(o, a);
        const B = corner(o, b);
        const t = r();
        put(out, i, A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t, accent, 1);
      } else {
        const axis = (r() * 3) | 0;
        const p: Vec3 = [0, 0, 0];
        p[axis] = r() < 0.5 ? 0 : size;
        p[(axis + 1) % 3] = r() * size;
        p[(axis + 2) % 3] = r() * size;
        put(out, i, o[0] + p[0], o[1] + p[1], o[2] + p[2], accent, 0.3);
      }
    } else {
      // rejected samples drifting away from the dataset
      const [x, y, z] = onSphere();
      const R = 2.7 + r() * 2.6;
      put(out, i, x * R * 1.3, y * R * 0.7, z * R, 0, 0.16 + gauss() * 0.03);
    }
  }
  return out;
}

/* 03 · Neural network */
export const NETWORK_LAYERS = [4, 6, 8, 8, 6, 3];
/** Points just below the input layer, the hidden-layer block and the output layer (for HTML labels). */
export const NETWORK_ANCHORS: Vec3[] = [
  [-3.4, -(0.15 * 4) - 0.35, 0],
  [0, -(0.15 * 8) - 0.35, 0],
  [3.4, -(0.15 * 3) - 0.35, 0],
];
function network(N: number) {
  const { r, gauss } = makeTools(51);
  const out = alloc(N);
  const L = NETWORK_LAYERS.length;
  const nodes = NETWORK_LAYERS.map((count, l) => {
    const x = -3.4 + (6.8 / (L - 1)) * l;
    const R = 0.15 * count;
    return Array.from({ length: count }, (_, j): Vec3 => {
      const a = (j / count) * TAU + l * 0.35;
      return [x, Math.cos(a) * R, Math.sin(a) * R];
    });
  });
  const path = NETWORK_LAYERS.map((c) => (r() * c) | 0);
  const edges: { A: Vec3; B: Vec3; active: boolean }[] = [];
  for (let l = 0; l < L - 1; l++)
    for (let a = 0; a < nodes[l].length; a++)
      for (let b = 0; b < nodes[l + 1].length; b++)
        edges.push({ A: nodes[l][a], B: nodes[l + 1][b], active: path[l] === a && path[l + 1] === b });
  const flatNodes = nodes.flatMap((layer, l) => layer.map((p, j) => ({ p, active: path[l] === j })));

  for (let i = 0; i < N; i++) {
    if (r() < 0.26) {
      const nd = flatNodes[(r() * flatNodes.length) | 0];
      const s = 0.065;
      put(out, i, nd.p[0] + gauss() * s, nd.p[1] + gauss() * s, nd.p[2] + gauss() * s, nd.active ? 1 : 0, 1);
    } else {
      const e = edges[(r() * edges.length) | 0];
      const t = r();
      const j = 0.012;
      put(
        out,
        i,
        e.A[0] + (e.B[0] - e.A[0]) * t + gauss() * j,
        e.A[1] + (e.B[1] - e.A[1]) * t + gauss() * j,
        e.A[2] + (e.B[2] - e.A[2]) * t + gauss() * j,
        e.active ? 1 : 0,
        e.active ? 1 : 0.42
      );
    }
  }
  return out;
}

/* 04 · The brain (the fine-tuned region glows) */
function brain(N: number) {
  const { r, gauss, onSphere, inSphere } = makeTools(73);
  const out = alloc(N);
  const smooth = (a: number, b: number, x: number) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  for (let i = 0; i < N; i++) {
    const k = r();
    if (k < 0.74) {
      // cortex: two hemispheres, gyri via rejection sampling on a fold field
      let tries = 0;
      for (;;) {
        const side = r() < 0.5 ? 1 : -1;
        const [dx, dy, dz] = onSphere();
        const f =
          Math.sin(dy * 10 + Math.sin(dz * 6) * 2.2) * Math.sin(dz * 9 + dx * 4) + 0.5 * Math.sin(dx * 14 + dy * 7);
        const keep = 0.25 + 0.75 * smooth(-0.35, 0.7, f);
        if (r() > keep && tries++ < 6) continue;
        const g = 1 + 0.06 * f;
        let lx = dx * 0.58 * g;
        let y = dy * 0.86 * g;
        const z = dz * 1.42 * g;
        if (lx * side < 0) lx *= 0.92; // flatter medial wall
        if (y < -0.42) y = -0.42 + (y + 0.42) * 0.35; // flat base
        if (z > 0) lx *= 1 - z * 0.07; // narrower frontal pole
        lx += side * 0.12 * Math.exp(-((y + 0.25) ** 2) * 8 - (z - 0.15) ** 2 * 3) * Math.abs(dx); // temporal bulge
        const x = lx + side * 0.63;
        // a small 'fine-tuned' patch on the upper frontal lobe
        const accent = z > 0.98 && y > -0.05 ? (r() < 0.7 ? 1 : 0) : r() < 0.004 ? 1 : 0;
        put(out, i, x, y, z, accent, 0.95);
        break;
      }
    } else if (k < 0.85) {
      // cerebellum with folia stripes
      let d: Vec3;
      do d = onSphere();
      while (Math.sin(d[1] * 24) < -0.25);
      put(out, i, d[0] * 0.85, -0.6 + d[1] * 0.4, -1.0 + d[2] * 0.5, 0, 0.8);
    } else if (k < 0.9) {
      // brain stem
      const t = r();
      const a = r() * TAU;
      const R = 0.17 - t * 0.03;
      put(out, i, Math.cos(a) * R, -0.55 - t * 1.0, -0.45 - t * 0.28 + Math.sin(a) * R, 0, 0.75);
    } else {
      const [x, y, z] = inSphere();
      put(out, i, x, y * 0.7 - 0.05, z * 1.2, 0, 0.22 + gauss() * 0.02);
    }
  }
  return out;
}

/* 05 · Agent swarm */
export const SWARM_AGENTS: Vec3[] = Array.from({ length: 6 }, (_, k) => {
  const a = (k / 6) * TAU + 0.3;
  return [Math.cos(a) * 2.15, k % 2 ? 0.3 : -0.25, Math.sin(a) * 2.15];
});
function swarm(N: number) {
  const { r, gauss, onSphere, inSphere } = makeTools(97);
  const out = alloc(N);
  for (let i = 0; i < N; i++) {
    const k = r();
    if (k < 0.22) {
      // orchestrator core
      if (r() < 0.75) {
        const [x, y, z] = onSphere();
        put(out, i, x * 0.5, y * 0.5, z * 0.5, r() < 0.18 ? 1 : 0, 1);
      } else {
        const [x, y, z] = inSphere();
        put(out, i, x * 0.45, y * 0.45, z * 0.45, r() < 0.18 ? 1 : 0, 0.5);
      }
    } else if (k < 0.62) {
      const c = SWARM_AGENTS[(r() * SWARM_AGENTS.length) | 0];
      const [x, y, z] = r() < 0.8 ? onSphere() : inSphere();
      const R = 0.24;
      put(out, i, c[0] + x * R, c[1] + y * R, c[2] + z * R, 0, 1);
    } else if (k < 0.72) {
      const a = r() * TAU;
      put(out, i, Math.cos(a) * 2.15 + gauss() * 0.015, gauss() * 0.015, Math.sin(a) * 2.15 + gauss() * 0.015, 0, 0.28);
    } else {
      // hand-off streams from orchestrator to agents (quadratic bezier)
      const c = SWARM_AGENTS[(r() * SWARM_AGENTS.length) | 0];
      const t = r();
      const ctrl: Vec3 = [c[0] * 0.5, c[1] + 0.75, c[2] * 0.5];
      const u = 1 - t;
      const j = 0.018;
      put(
        out,
        i,
        2 * u * t * ctrl[0] + t * t * c[0] + gauss() * j,
        2 * u * t * ctrl[1] + t * t * c[1] + gauss() * j,
        2 * u * t * ctrl[2] + t * t * c[2] + gauss() * j,
        r() < 0.04 ? 1 : 0,
        0.5
      );
    }
  }
  return out;
}

/* 06 · Galaxy (final call to action) */
function galaxy(N: number) {
  const { r, gauss, onSphere } = makeTools(131);
  const out = alloc(N);
  for (let i = 0; i < N; i++) {
    const k = r();
    if (k < 0.14) {
      put(out, i, gauss() * 0.28, gauss() * 0.12, gauss() * 0.28, r() < 0.08 ? 1 : 0, 1);
    } else if (k < 0.9) {
      const arm = (r() * 3) | 0;
      const rr = 0.2 + Math.pow(r(), 1.5) * 3.4;
      const ang = (arm * TAU) / 3 + rr * 1.35 + gauss() * 0.11;
      const spread = 0.06 * (1 + rr * 0.3);
      const accent = rr < 0.5 && r() < 0.05 ? 1 : 0;
      put(
        out,
        i,
        Math.cos(ang) * rr + gauss() * spread,
        gauss() * 0.07 * (1.4 - rr / 3.6),
        Math.sin(ang) * rr + gauss() * spread,
        accent,
        0.45 + 0.55 * (1 - rr / 3.8)
      );
    } else {
      const [x, y, z] = onSphere();
      const R = 3.4 + r() * 1.8;
      put(out, i, x * R, y * R * 0.5, z * R, 0, 0.16);
    }
  }
  return out;
}

export function buildShapes(N: number): Shape[] {
  return [eye(N), chaos(N), dataBlocks(N), network(N), brain(N), swarm(N), galaxy(N)];
}

export type ShapeConfig = {
  x: number; y: number; s: number; // desktop placement + scale
  mx: number; my: number; ms: number; // mobile overrides
  spin: number; base: number; tilt: number; osc?: number; // rotation
  noise: number; swirl: number; size: number; wave: number; // material feel
};

export const SHAPE_CONFIG: ShapeConfig[] = [
  { x: 2.08, y: 0.06, s: 0.82, spin: 0, base: 0, osc: 0.1, tilt: 0.05, noise: 0.012, swirl: 1.2, size: 0.95, wave: 0, mx: 0, my: 1.48, ms: 0.5 },
  { x: 0.0, y: 0.0, s: 1.0, spin: 0.025, base: 0, tilt: 0.1, noise: 0.06, swirl: 1.4, size: 0.8, wave: 0, mx: 0, my: 0.2, ms: 0.65 },
  { x: 2.25, y: 0.05, s: 0.95, spin: 0.16, base: 0.6, tilt: 0.42, noise: 0.0, swirl: 1.0, size: 0.9, wave: 0, mx: 0, my: 1.15, ms: 0.55 },
  { x: 0.0, y: 0.48, s: 0.88, spin: 0, base: -0.3, osc: 0.2, tilt: 0.1, noise: 0.0, swirl: 1.0, size: 0.95, wave: 1, mx: 0, my: 0.82, ms: 0.38 },
  { x: -2.2, y: 0.05, s: 1.08, spin: 0.12, base: 1.4, tilt: 0.18, noise: 0.015, swirl: 1.1, size: 1.0, wave: 0, mx: 0, my: 1.2, ms: 0.6 },
  { x: 1.75, y: 0.0, s: 0.86, spin: 0.14, base: 0, tilt: 0.42, noise: 0.02, swirl: 1.2, size: 1.0, wave: 0, mx: 0, my: 1.1, ms: 0.52 },
  { x: 0.0, y: -1.75, s: 1.55, spin: 0.06, base: 0, tilt: 1.24, noise: 0.015, swirl: 1.4, size: 1.0, wave: 0, mx: 0, my: -0.9, ms: 0.75 },
];
