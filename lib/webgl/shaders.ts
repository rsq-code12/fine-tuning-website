// Simplex noise — Ashima Arts / Stefan Gustavson (MIT)
const noise = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

vec3 snoiseVec3(vec3 x){
  return vec3(
    snoise(x),
    snoise(vec3(x.y - 19.1, x.z + 33.4, x.x + 47.2)),
    snoise(vec3(x.z + 74.2, x.x - 124.5, x.y + 99.4))
  );
}
`;

export const particleVertex = /* glsl */ `
uniform float uTime;
uniform float uMix;
uniform float uIntro;
uniform float uNoise;
uniform float uSwirl;
uniform float uSize;
uniform float uPixelRatio;
uniform float uWave;
uniform float uOpacity;
uniform vec2  uRotFrom;
uniform vec2  uRotTo;
uniform vec2  uMouse;
uniform float uMouseForce;
uniform vec2  uLook;    // where the hero eye is looking (shape units)
uniform float uBlink;   // 0 open .. 1 closed

attribute vec3 aFrom;
attribute vec3 aTo;
attribute vec3 aAccFrom;
attribute vec3 aAccTo;
attribute vec4 aRand;
attribute vec3 aSeed;

varying float vAcc;   // shape accent -> ember
varying float vHot;   // cursor + signal pulse -> white
varying float vAlpha;
varying float vHue;

${noise}

// Panther eye (matches EYE / eyeTop / eyeBot in shapes.ts).
// Iris particles (flag 1) follow the look target and hide behind the lids;
// lid particles (flag -1) collapse onto the slanted centre line when blinking.
const float EYE_W = 2.4;
float eyeC(float u){ return 0.12 * u; }
float eyeTop(float u){ return eyeC(u) + 0.95 * pow(max(0.0, 1.0 - u * u), 0.72); }
float eyeBot(float u){ return eyeC(u) - 0.72 * pow(max(0.0, 1.0 - u * u), 0.9) * (1.0 - 0.15 * u); }
vec3 eyeXform(vec3 p, float flag){
  float iris = clamp(flag, 0.0, 1.0);
  float lid = clamp(-flag, 0.0, 1.0);
  p.xy += uLook * iris;
  float c = eyeC(p.x / EYE_W);
  p.y = mix(p.y, c + (p.y - c) * (1.0 - uBlink * 0.96), lid);
  return p;
}
// 1 = visible, 0 = tucked behind the lids
float eyeClip(vec3 p, float flag){
  float iris = clamp(flag, 0.0, 1.0);
  if (iris <= 0.0) return 1.0;
  float u = p.x / EYE_W;
  float c = eyeC(u);
  float open = 1.0 - uBlink * 0.96;
  float topY = c + (eyeTop(u) - c) * open;
  float botY = c + (eyeBot(u) - c) * open;
  float inside = smoothstep(botY - 0.005, botY + 0.035, p.y) * (1.0 - smoothstep(topY - 0.035, topY + 0.005, p.y)) * step(abs(u), 1.0);
  return mix(1.0, inside, iris);
}

// yaw (around Y) then pitch (around X)
vec3 rot(vec3 p, vec2 r){
  float cy = cos(r.x), sy = sin(r.x);
  p = vec3(cy * p.x + sy * p.z, p.y, -sy * p.x + cy * p.z);
  float cx = cos(r.y), sx = sin(r.y);
  return vec3(p.x, cx * p.y - sx * p.z, sx * p.y + cx * p.z);
}

void main(){
  // Per-particle staggered morph so shapes "pour" into each other
  float st = clamp((uMix - aRand.x * 0.35) / 0.65, 0.0, 1.0);
  st = st * st * (3.0 - 2.0 * st);

  vec3 ea = eyeXform(aFrom, aAccFrom.z);
  vec3 eb = eyeXform(aTo, aAccTo.z);
  float clip = mix(eyeClip(ea, aAccFrom.z), eyeClip(eb, aAccTo.z), st);
  vec3 a = rot(ea, uRotFrom);
  vec3 b = rot(eb, uRotTo);
  vec3 p = mix(a, b, st);

  // Turbulence while particles are in flight
  float flight = sin(3.14159265 * st);
  p += snoiseVec3(p * 0.42 + vec3(uTime * 0.12)) * flight * uSwirl;

  // Ambient breathing on the surface
  float n = snoise(p * 0.85 + vec3(0.0, uTime * 0.22, uTime * 0.08));
  p += normalize(p + 0.0001) * n * uNoise;

  // Micro drift so nothing is ever perfectly still
  p += vec3(
    sin(uTime * 0.6 + aRand.z * 40.0),
    cos(uTime * 0.5 + aRand.w * 40.0),
    sin(uTime * 0.4 + aRand.x * 40.0)
  ) * 0.012;

  // Intro: particles start scattered and condense into the first shape
  float it = smoothstep(aRand.y * 0.4, aRand.y * 0.4 + 0.6, uIntro);
  vec3 scattered = aSeed + snoiseVec3(aSeed * 0.2 + uTime * 0.05) * 1.5;
  p = mix(p, scattered, it);

  float acc = mix(aAccFrom.x, aAccTo.x, st);
  float alpha = mix(aAccFrom.y, aAccTo.y, st);

  // Forward-pass wave travelling through the network layers (shape-space x)
  float wx = mix(aFrom.x, aTo.x, st);
  float wavePos = mod(uTime * 1.7, 9.0) - 4.5;
  float wave = exp(-pow((wx - wavePos) * 2.4, 2.0)) * uWave;
  float hot = wave;

  vec4 mv = modelViewMatrix * vec4(p, 1.0);

  // Cursor repulsion, computed in view space so it ignores rotation
  vec2 m = uMouse * -mv.z;
  vec2 d = mv.xy - m;
  float dist = length(d);
  float f = smoothstep(0.95, 0.0, dist) * uMouseForce;
  mv.xy += (d / max(dist, 0.0001)) * f * 0.38;
  hot = max(hot, f * 0.8);

  gl_Position = projectionMatrix * mv;

  float size = uSize * (0.55 + aRand.y * 1.0) * (1.0 + acc * 0.5 + wave * 0.9);
  gl_PointSize = size * uPixelRatio / -mv.z;

  float twinkle = 0.7 + 0.3 * sin(uTime * 1.7 + aRand.z * 6.2831);
  float depth = smoothstep(-15.0, -6.0, mv.z);
  vAlpha = alpha * twinkle * (0.35 + 0.65 * depth) * uOpacity * (1.0 - it * 0.45) * mix(1.0, clip, 1.0 - it);
  vAcc = acc;
  vHot = hot;
  // Steel banding coordinate: drifts across the formation and over time
  vHue = aRand.z * 0.35 + p.y * 0.09 + p.x * 0.06 + uTime * 0.035;
}
`;

export const particleFragment = /* glsl */ `
uniform vec3 uSteelDark;
uniform vec3 uSteelLight;
uniform vec3 uEmber;
varying float vAcc;
varying float vHot;
varying float vAlpha;
varying float vHue;

void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float core = pow(smoothstep(0.5, 0.0, d), 1.7);
  // brushed steel bands; the shape's own highlights glow ember (heated metal),
  // the cursor and the training pulse flash white
  float band = 0.5 + 0.5 * sin(vHue * 6.2831853);
  vec3 steel = mix(uSteelDark, uSteelLight, band * band);
  vec3 ember = uEmber * (0.8 + 0.4 * band);
  vec3 col = mix(steel, ember, clamp(vAcc, 0.0, 1.0));
  col = mix(col, vec3(1.0), clamp(vHot, 0.0, 1.0));
  gl_FragColor = vec4(col, core * vAlpha);
}
`;

export const starVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uOpacity;
attribute float aSize;
attribute float aPhase;
varying float vAlpha;
void main(){
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aSize * uPixelRatio;
  vAlpha = (0.25 + 0.75 * (0.5 + 0.5 * sin(uTime * 0.8 + aPhase))) * uOpacity;
}
`;

export const starFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  gl_FragColor = vec4(uColor, smoothstep(0.5, 0.0, d) * vAlpha * 0.5);
}
`;
