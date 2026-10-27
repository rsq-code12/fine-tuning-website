'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { services } from '@/data/services';
import { SERVICE_SLUGS } from '@/data/content/types';

const pad = (n: number) => String(n).padStart(2, '0');

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    (_ctx, contextSafe) => {
      const cards = gsap.utils.toArray<HTMLElement>('.svc-card');
      const counter = root.current!.querySelector<HTMLElement>('.js-counter')!;
      const bar = root.current!.querySelector<HTMLElement>('.js-bar')!;
      const mm = gsap.matchMedia();

      // The paper world opens out of a rounded window as it scrolls in
      gsap.fromTo(
        root.current,
        { clipPath: 'inset(16% 10% 0% 10% round 40px)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 0px)',
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'top top', scrub: true },
        }
      );
      gsap.from('.services-title, .js-intro-sub', {
        y: 120,
        opacity: 0,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'top 10%', scrub: true },
      });

      mm.add('(min-width: 900px)', () => {
        const distance = () => track.current!.scrollWidth - window.innerWidth;
        const skew = gsap.quickSetter(cards, 'skewX', 'deg');
        const proxy = { skew: 0 };

        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: pin.current,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              bar.style.transform = `scaleX(${self.progress})`;
              counter.textContent = pad(Math.min(services.length, 1 + Math.floor(self.progress * services.length)));
              // Cards lean into the scroll direction, then settle
              const v = gsap.utils.clamp(-7, 7, self.getVelocity() / -320);
              if (Math.abs(v) > Math.abs(proxy.skew)) {
                proxy.skew = v;
                gsap.to(proxy, { skew: 0, duration: 0.9, ease: 'power3', overwrite: true, onUpdate: () => skew(proxy.skew) });
              }
            },
          },
        });

        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            containerAnimation: tween,
            start: 'left 92%',
            onEnter: () => card.classList.add('is-in'),
          });
          gsap.fromTo(
            card.querySelector('.ill'),
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            }
          );
        });
      });

      mm.add('(max-width: 899px)', () => {
        cards.forEach((card) =>
          ScrollTrigger.create({ trigger: card, start: 'top 85%', onEnter: () => card.classList.add('is-in') })
        );
      });

      // 3D tilt toward the cursor
      if (window.matchMedia('(pointer: fine)').matches && contextSafe) {
        cards.forEach((card) => {
          const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
          const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
          const lift = gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3' });
          gsap.set(card, { transformPerspective: 1100 });
          const move = contextSafe((e: PointerEvent) => {
            const r = card.getBoundingClientRect();
            ry(((e.clientX - r.left) / r.width - 0.5) * 10);
            rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
            lift(-10);
          });
          const leave = contextSafe(() => {
            rx(0);
            ry(0);
            lift(0);
          });
          card.addEventListener('pointermove', move);
          card.addEventListener('pointerleave', leave);
        });
      }

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="services" data-chapter="6" data-canvas="0" className="services">
      <div ref={pin} className="relative flex flex-col justify-center overflow-hidden py-24 min-[900px]:h-svh min-[900px]:py-0">
        <div className="absolute inset-x-0 top-0 hidden justify-between border-b border-line px-gutter pt-[88px] pb-3 font-mono text-[10px] tracking-[0.2em] uppercase text-bone-4 min-[900px]:flex">
          <span>@weightcraft</span>
          <span>
            <b className="js-counter">01</b> / {services.length}
          </span>
        </div>

        <div
          ref={track}
          className="flex flex-col gap-6 px-gutter min-[900px]:mt-12 min-[900px]:w-max min-[900px]:flex-row min-[900px]:items-center min-[900px]:gap-7 min-[900px]:pr-[12vw]"
        >
          <div className="flex flex-none flex-col justify-center gap-6 pb-6 min-[900px]:w-[min(44vw,620px)] min-[900px]:pr-10 min-[900px]:pb-0">
            <p className="eyebrow">The family business</p>
            <h2 className="services-title text-[clamp(2.3rem,6vw,6.6rem)] leading-[0.92]">
              Ten ways we make AI <em>pay up.</em>
            </h2>
            <p className="js-intro-sub max-w-sm text-xl text-bone-3">Pick one. Or let the family run the whole operation.</p>
            <p className="hidden items-center gap-3 text-mono-xs text-bone-4 min-[900px]:flex">
              Keep scrolling <span className="inline-block animate-[nudge_1.6s_ease-in-out_infinite]">→</span>
            </p>
          </div>

          {services.map((s, i) => (
            <article key={s.title} className="svc-card" data-cursor-label="explore">
              <div className="svc-top">
                <span>@weightcraft</span>
                <span>
                  {pad(i + 1)} / {services.length}
                </span>
              </div>
              <div className="svc-art" dangerouslySetInnerHTML={{ __html: s.art }} />
              <div className="svc-num">{pad(i + 1)}</div>
              <h3 className="svc-title">
                {/* stretched link: the whole card opens the full service page */}
                <a href={`/services/${SERVICE_SLUGS[i]}`} className="svc-link">
                  {s.title}
                </a>
              </h3>
              <p className="svc-desc">{s.desc}</p>
              <p className="svc-pitch">{s.pitch}</p>
              <ul className="svc-tools" aria-label="Tools">
                {s.tools.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 hidden h-px bg-line min-[900px]:block">
          <span className="js-bar block h-full origin-left scale-x-0 bg-signal" />
        </div>
      </div>
    </section>
  );
}
