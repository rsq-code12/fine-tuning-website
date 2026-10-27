import type Lenis from 'lenis';
import type { ParticleScene } from './webgl/scene';

type Fn = () => void;

/**
 * Tiny shared runtime for the scroll experience. Kept outside React so
 * per-frame readers (HUD, canvas) never trigger re-renders.
 */
class Experience {
  lenis: Lenis | null = null;
  scene: ParticleScene | null = null;
  /** continuous story position 0..6, mirrored from the particle scene */
  progress = 0;
  chapter = 0;
  /** true while the pinned training section is on screen (gates the network layer labels) */
  trainingActive = false;
  introStarted = false;
  private introFns = new Set<Fn>();
  private chapterFns = new Set<(c: number) => void>();

  onIntro(fn: Fn) {
    if (this.introStarted) {
      fn();
      return () => {};
    }
    this.introFns.add(fn);
    return () => {
      this.introFns.delete(fn);
    };
  }

  startIntro() {
    if (this.introStarted) return;
    this.introStarted = true;
    this.introFns.forEach((f) => f());
    this.introFns.clear();
  }

  setChapter(c: number) {
    if (c === this.chapter) return;
    this.chapter = c;
    this.chapterFns.forEach((f) => f(c));
  }

  onChapter(fn: (c: number) => void) {
    this.chapterFns.add(fn);
    return () => {
      this.chapterFns.delete(fn);
    };
  }
}

export const experience = new Experience();
