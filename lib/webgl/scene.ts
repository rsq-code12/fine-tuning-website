import * as THREE from 'three';
import { buildShapes, EYE, NETWORK_ANCHORS, SHAPE_CONFIG, SWARM_AGENTS, type ShapeConfig } from './shapes';
import { particleVertex, particleFragment, starVertex, starFragment } from './shaders';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const damp = (a: number, b: number, lambda: number, dt: number) => lerp(a, b, 1 - Math.exp(-lambda * dt));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export const NETWORK_INDEX = 3;
export const SWARM_INDEX = 5;
export const SHAPE_COUNT = SHAPE_CONFIG.length;

export type ScreenPoint = { x: number; y: number; z: number };
export type AgentCallback = (points: ScreenPoint[] | null, presence: number) => void;

function yawPitch(p: number[], yaw: number, pitch: number, out: THREE.Vector3) {
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x = cy * p[0] + sy * p[2];
  const z = -sy * p[0] + cy * p[2];
  const cx = Math.cos(pitch);
  const sx = Math.sin(pitch);
  return out.set(x, cx * p[1] - sx * z, sx * p[1] + cx * z);
}

function shapeYaw(cfg: ShapeConfig, time: number) {
  return cfg.base + time * cfg.spin + (cfg.osc ? Math.sin(time * 0.25) * cfg.osc : 0);
}

/**
 * One GPU particle system that morphs between story formations.
 * `state.target` is a continuous chapter value (0..6) driven by scroll;
 * the integer part picks the shape pair, the fraction is the morph.
 */
export class ParticleScene {
  state = {
    target: 0,
    s: 0,
    intro: 1,
    opacity: 1,
    targetOpacity: 1,
    boost: 0,
    time: 0,
    scroll: 0,
    mouse: new THREE.Vector2(0, 0),
    mouseSmooth: new THREE.Vector2(0, 0),
    mouseForce: 0,
    mouseForceTarget: 0,
    // hero eye
    look: new THREE.Vector2(0, 0),
    lookTarget: new THREE.Vector2(0, 0),
    lastPointer: -10,
    nextGlance: 0,
    blink: 0,
    nextBlink: 2.5,
  };
  onAgents: AgentCallback | null = null;
  onNetwork: AgentCallback | null = null;

  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(35, 1, 0.1, 120);
  private group = new THREE.Group();
  private pixelRatio: number;
  private width = 1;
  private height = 1;
  private mobile = false;
  private segment = -1;
  /** Hero eye placement fitted to the free space beside/above the headline (world units). */
  private hero: { x: number; y: number; s: number } | null = null;
  private tmp = new THREE.Vector3();
  private agentScreen: ScreenPoint[] = Array.from({ length: SWARM_AGENTS.length + 1 }, () => ({ x: 0, y: 0, z: 0 }));
  private netScreen: ScreenPoint[] = NETWORK_ANCHORS.map(() => ({ x: 0, y: 0, z: 0 }));

  private geo!: THREE.BufferGeometry;
  private attrs!: { pos: THREE.BufferAttribute; acc: THREE.BufferAttribute }[];
  private uniforms!: Record<string, THREE.IUniform>;
  private material!: THREE.ShaderMaterial;
  private stars!: THREE.Points;
  private starUniforms!: Record<string, THREE.IUniform>;
  private disposers: (() => void)[] = [];

  constructor(
    canvas: HTMLCanvasElement,
    private opts: { count: number; reducedMotion?: boolean }
  ) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
    this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(this.pixelRatio);
    this.renderer.setClearColor(0x000000, 0);
    this.camera.position.set(0, 0, 9);
    this.scene.add(this.group);

    this.buildParticles();
    this.buildStars();

    const onResize = () => this.resize();
    window.addEventListener('resize', onResize);
    this.disposers.push(() => window.removeEventListener('resize', onResize));
    this.resize();

    if (window.matchMedia('(pointer: fine)').matches) {
      const onMove = (e: PointerEvent) => {
        this.state.mouse.set((e.clientX / this.width) * 2 - 1, -(e.clientY / this.height) * 2 + 1);
        this.state.mouseForceTarget = 1;
        this.state.lastPointer = this.state.time;
      };
      const onLeave = () => (this.state.mouseForceTarget = 0);
      window.addEventListener('pointermove', onMove);
      document.documentElement.addEventListener('pointerleave', onLeave);
      this.disposers.push(() => {
        window.removeEventListener('pointermove', onMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      });
    }
  }

  private buildParticles() {
    const N = this.opts.count;
    this.attrs = buildShapes(N).map((s) => ({
      pos: new THREE.BufferAttribute(s.pos, 3),
      acc: new THREE.BufferAttribute(s.acc, 3),
    }));

    const rand = new Float32Array(N * 4);
    const seed = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      for (let k = 0; k < 4; k++) rand[i * 4 + k] = Math.random();
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 9;
      const s = Math.sqrt(1 - u * u);
      seed[i * 3] = s * Math.cos(th) * r * 1.4;
      seed[i * 3 + 1] = u * r * 0.7;
      seed[i * 3 + 2] = s * Math.sin(th) * r - 2;
    }

    this.geo = new THREE.BufferGeometry();
    this.geo.setAttribute('position', this.attrs[0].pos);
    this.geo.setAttribute('aRand', new THREE.BufferAttribute(rand, 4));
    this.geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 3));
    this.setSegment(0);

    this.uniforms = {
      uTime: { value: 0 },
      uMix: { value: 0 },
      uIntro: { value: 1 },
      uNoise: { value: 0.2 },
      uSwirl: { value: 1 },
      uSize: { value: 34 },
      uPixelRatio: { value: this.pixelRatio },
      uWave: { value: 0 },
      uOpacity: { value: 1 },
      uRotFrom: { value: new THREE.Vector2() },
      uRotTo: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uMouseForce: { value: 0 },
      uLook: { value: new THREE.Vector2() },
      uBlink: { value: 0 },
      // brushed-steel particles, colourless (DESIGN.md: monochrome only)
      uSteelDark: { value: new THREE.Color('#6f7378') },
      uSteelLight: { value: new THREE.Color('#f2f3f5') },
      uEmber: { value: new THREE.Color('#ff4a1c') },
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      uniforms: this.uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(this.geo, this.material);
    points.frustumCulled = false;
    this.group.add(points);
  }

  private buildStars() {
    const M = 1600;
    const pos = new Float32Array(M * 3);
    const size = new Float32Array(M);
    const phase = new Float32Array(M);
    for (let i = 0; i < M; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = 16 + Math.random() * 30;
      const s = Math.sqrt(1 - u * u);
      pos[i * 3] = s * Math.cos(th) * r;
      pos[i * 3 + 1] = u * r;
      pos[i * 3 + 2] = s * Math.sin(th) * r;
      size[i] = 1 + Math.random() * 2.2;
      phase[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    this.starUniforms = {
      uTime: { value: 0 },
      uPixelRatio: { value: this.pixelRatio },
      uOpacity: { value: 1 },
      uColor: { value: new THREE.Color('#bdbdbd') },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: starVertex,
      fragmentShader: starFragment,
      uniforms: this.starUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.stars = new THREE.Points(geo, mat);
    this.stars.frustumCulled = false;
    this.scene.add(this.stars);
  }

  private setSegment(i: number) {
    if (i === this.segment) return;
    this.segment = i;
    const a = this.attrs[i];
    const b = this.attrs[Math.min(i + 1, this.attrs.length - 1)];
    this.geo.setAttribute('aFrom', a.pos);
    this.geo.setAttribute('aTo', b.pos);
    this.geo.setAttribute('aAccFrom', a.acc);
    this.geo.setAttribute('aAccTo', b.acc);
  }

  /**
   * Fit the hero eye into a screen rectangle (CSS px). The page measures the free space
   * around the headline, so the eye never spills off-screen or onto the copy on any device.
   */
  setHeroRect(rect: { left: number; top: number; right: number; bottom: number } | null) {
    if (!rect) {
      this.hero = null;
      return;
    }
    const visH = 2 * Math.tan(THREE.MathUtils.degToRad(35 / 2)) * this.camera.position.z;
    const visW = visH * (this.width / this.height);
    const cx = (rect.left + rect.right) / 2;
    const cy = (rect.top + rect.bottom) / 2;
    const wWorld = ((rect.right - rect.left) / this.width) * visW;
    const hWorld = ((rect.bottom - rect.top) / this.height) * visH;
    this.hero = {
      x: (cx / this.width - 0.5) * visW,
      y: (0.5 - cy / this.height) * visH,
      // the lid opening plus its thick rims and brow must fit; only the outer fur feathers past
      s: Math.min(wWorld / (2 * EYE.W * 1.08), hWorld / ((EYE.top + EYE.bottom) * 1.55)),
    };
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mobile = this.width < 760 || this.width / this.height < 0.85;
    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  update(dt: number) {
    const st = this.state;
    const u = this.uniforms;
    st.time += dt;
    const time = st.time;

    st.s = damp(st.s, st.target, 4.5, dt);
    st.opacity = damp(st.opacity, st.targetOpacity, 3.5, dt);
    st.mouseSmooth.lerp(st.mouse, 1 - Math.exp(-dt * 7));
    st.mouseForce = damp(st.mouseForce, st.mouseForceTarget, 3, dt);

    const last = SHAPE_COUNT - 1;
    let i = Math.floor(st.s);
    let t = st.s - i;
    if (i >= last) {
      i = last - 1;
      t = 1;
    }
    if (i < 0) {
      i = 0;
      t = 0;
    }
    this.setSegment(i);
    const A = SHAPE_CONFIG[i];
    const B = SHAPE_CONFIG[i + 1];
    const e = easeInOut(clamp(t));
    const m = this.mobile;

    // Composition: where the formation sits on screen (the hero eye uses its measured fit)
    const hero = i === 0 ? this.hero : null;
    const ax = hero ? hero.x : m ? A.mx : A.x;
    const ay = hero ? hero.y : m ? A.my : A.y;
    const as = hero ? hero.s : m ? A.s * A.ms : A.s;
    this.group.position.set(lerp(ax, m ? B.mx : B.x, e), lerp(ay, m ? B.my : B.y, e), 0);
    this.group.scale.setScalar(lerp(as, m ? B.s * B.ms : B.s, e));
    this.group.rotation.x = damp(this.group.rotation.x, -st.mouseSmooth.y * 0.12, 3, dt);
    this.group.rotation.y = damp(this.group.rotation.y, st.mouseSmooth.x * 0.18, 3, dt);

    // Cinematic breathing: widen the lens mid-morph
    const flight = Math.sin(Math.PI * clamp(t));
    this.camera.fov = 35 + flight * 4;
    this.camera.updateProjectionMatrix();

    u.uTime.value = time;
    u.uMix.value = t;
    u.uIntro.value = st.intro;
    (u.uRotFrom.value as THREE.Vector2).set(shapeYaw(A, time), A.tilt);
    (u.uRotTo.value as THREE.Vector2).set(shapeYaw(B, time), B.tilt);
    u.uNoise.value = lerp(A.noise, B.noise, e);
    u.uSwirl.value = lerp(A.swirl, B.swirl, e) * (this.opts.reducedMotion ? 0.3 : 1);
    u.uSize.value = lerp(A.size, B.size, e) * (m ? 30 : 34);
    u.uWave.value = lerp(A.wave, B.wave, e) * (1 + st.boost);
    u.uOpacity.value = st.opacity;

    const tanY = Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2));
    (u.uMouse.value as THREE.Vector2).set(st.mouseSmooth.x * tanY * this.camera.aspect, st.mouseSmooth.y * tanY);
    u.uMouseForce.value = st.mouseForce * (1 - st.intro);

    // Background stars drift with scroll for depth
    this.starUniforms.uTime.value = time;
    this.starUniforms.uOpacity.value = Math.min(1, st.opacity * 1.4);
    this.stars.rotation.y = time * 0.01 + st.mouseSmooth.x * 0.03;
    this.stars.rotation.x = st.scroll * 0.9 + st.mouseSmooth.y * 0.03;

    this.updateEye(dt, time);
    this.projectAgents(time);
    this.projectNetwork(time);

    if (st.opacity > 0.004) this.renderer.render(this.scene, this.camera);
  }

  private projectAgents(time: number) {
    if (!this.onAgents) return;
    const presence = 1 - clamp(Math.abs(this.state.s - SWARM_INDEX) * 2.2);
    if (presence <= 0) {
      this.onAgents(null, 0);
      return;
    }
    const cfg = SHAPE_CONFIG[SWARM_INDEX];
    const yaw = shapeYaw(cfg, time);
    this.group.updateMatrixWorld();
    const pts = [[0, 0.82, 0], ...SWARM_AGENTS.map((p) => [p[0], p[1] + 0.32, p[2]])];
    pts.forEach((p, k) => {
      yawPitch(p, yaw, cfg.tilt, this.tmp);
      const o = this.agentScreen[k];
      o.z = this.tmp.z; // + is toward the camera, - is behind the orchestrator
      this.tmp.applyMatrix4(this.group.matrixWorld).project(this.camera);
      o.x = (this.tmp.x * 0.5 + 0.5) * this.width;
      o.y = (-this.tmp.y * 0.5 + 0.5) * this.height;
    });
    this.onAgents(this.agentScreen, presence * clamp((this.state.opacity - 0.6) / 0.4));
  }

  /** The hero eye follows the cursor; when idle (or on touch) it glances around and blinks. */
  private updateEye(dt: number, time: number) {
    const st = this.state;
    if (st.s > 1.2) return; // only while the eye is (nearly) on screen
    const pointerActive = time - st.lastPointer < 2.5;
    if (pointerActive) {
      // look from the eye's on-screen position toward the cursor
      this.tmp.copy(this.group.position).project(this.camera);
      st.lookTarget.set(
        clamp((st.mouseSmooth.x - this.tmp.x) * 0.55, -0.5, 0.55),
        clamp((st.mouseSmooth.y - this.tmp.y) * 0.3, -0.11, 0.11)
      );
    } else if (time > st.nextGlance) {
      st.lookTarget.set((Math.random() * 2 - 1) * 0.45, (Math.random() * 2 - 1) * 0.09);
      st.nextGlance = time + 1.4 + Math.random() * 2.2;
    }
    // saccade-like: quick but smooth
    st.look.lerp(st.lookTarget, 1 - Math.exp(-dt * 9));

    if (time > st.nextBlink) {
      const k = (time - st.nextBlink) / 0.2; // 200ms blink
      st.blink = k < 0.5 ? k * 2 : Math.max(0, 2 - k * 2);
      if (k >= 1) {
        st.blink = 0;
        st.nextBlink = time + 2.8 + Math.random() * 3.5;
      }
    }
    (this.uniforms.uLook.value as THREE.Vector2).copy(st.look);
    this.uniforms.uBlink.value = st.blink;
  }

  private projectNetwork(time: number) {
    if (!this.onNetwork) return;
    const presence = 1 - clamp(Math.abs(this.state.s - NETWORK_INDEX) * 2.2);
    if (presence <= 0) {
      this.onNetwork(null, 0);
      return;
    }
    const cfg = SHAPE_CONFIG[NETWORK_INDEX];
    const yaw = shapeYaw(cfg, time);
    this.group.updateMatrixWorld();
    NETWORK_ANCHORS.forEach((p, k) => {
      yawPitch(p, yaw, cfg.tilt, this.tmp);
      const o = this.netScreen[k];
      o.z = this.tmp.z;
      this.tmp.applyMatrix4(this.group.matrixWorld).project(this.camera);
      o.x = (this.tmp.x * 0.5 + 0.5) * this.width;
      o.y = (-this.tmp.y * 0.5 + 0.5) * this.height;
    });
    this.onNetwork(this.netScreen, presence * clamp((this.state.opacity - 0.6) / 0.4));
  }

  dispose() {
    this.disposers.forEach((d) => d());
    this.geo.dispose();
    this.material.dispose();
    this.stars.geometry.dispose();
    (this.stars.material as THREE.Material).dispose();
    this.renderer.dispose();
  }
}
