import { type CSSProperties, useEffect, useRef } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const range = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));
const ease = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

const storySteps = [
  ['01', 'Dormant', 'A quiet form holds its light close.'],
  ['02', 'Awakening', 'Pressure becomes radiance. The shell begins to yield.'],
  ['03', 'Emergence', 'Light escapes first. Then the hidden form follows.'],
  ['04', 'Becoming', 'What was protected learns the shape of open air.'],
];

export function ScrollScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const cocoonRef = useRef<HTMLDivElement>(null);
  const cocoonLeftRef = useRef<HTMLDivElement>(null);
  const cocoonRightRef = useRef<HTMLDivElement>(null);
  const crackRef = useRef<SVGPathElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const butterflyRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const targetRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateTarget = () => {
      const section = sectionRef.current;
      if (!section) return;
      const start = section.offsetTop;
      const distance = section.offsetHeight - window.innerHeight;
      targetRef.current = clamp((window.scrollY - start) / Math.max(1, distance));
    };

    const tick = () => {
      progressRef.current += (targetRef.current - progressRef.current) * 0.09;
      const progress = progressRef.current;

      if (
        cocoonRef.current &&
        cocoonLeftRef.current &&
        cocoonRightRef.current &&
        crackRef.current &&
        coreRef.current &&
        butterflyRef.current &&
        leftWingRef.current &&
        rightWingRef.current &&
        particlesRef.current &&
        copyRef.current &&
        progressLineRef.current
      ) {
        const pressure = ease(range(progress, 0.03, 0.25));
        const cracking = ease(range(progress, 0.1, 0.36));
        const shellOpen = ease(range(progress, 0.27, 0.52));
        const emerge = ease(range(progress, 0.36, 0.62));
        const wingsOpen = ease(range(progress, 0.48, 0.82));
        const travel = ease(range(progress, 0.58, 0.96));

        cocoonRef.current.style.transform =
          `translate3d(${-25 + shellOpen * -5}vw, ${Math.sin(progress * Math.PI * 4) * (1 - shellOpen) * 4}px, 0) ` +
          `scale(${0.92 + pressure * 0.055 - shellOpen * 0.08})`;
        cocoonRef.current.style.opacity = String(1 - range(progress, 0.62, 0.82));

        cocoonLeftRef.current.style.transform =
          `translate3d(${-shellOpen * 8.5}vw, 0, 0) rotate(${-shellOpen * 13}deg)`;
        cocoonRightRef.current.style.transform =
          `translate3d(${shellOpen * 8.5}vw, 0, 0) rotate(${shellOpen * 13}deg)`;

        crackRef.current.style.strokeDashoffset = String(680 * (1 - cracking));
        crackRef.current.style.opacity = String(cracking * (1 - shellOpen * 0.35));

        coreRef.current.style.opacity = String(
          clamp(cracking * 1.2 - range(progress, 0.68, 0.9)),
        );
        coreRef.current.style.transform =
          `translate(-50%, -50%) scale(${0.45 + cracking * 1.3 + shellOpen * 0.7})`;

        const butterflyX = -25 + emerge * 8 + travel * 37;
        const butterflyScale = 0.16 + emerge * 0.52 + travel * 0.14;
        butterflyRef.current.style.opacity = String(range(progress, 0.34, 0.5));
        butterflyRef.current.style.transform =
          `translate3d(${butterflyX}vw, ${8 - emerge * 9 - travel * 3}vh, 0) scale(${butterflyScale})`;

        const wingScale = 0.12 + wingsOpen * 0.88;
        const wingCurl = (1 - wingsOpen) * 3.2;
        leftWingRef.current.style.transform =
          `scaleX(${wingScale}) rotate(${-wingCurl}deg)`;
        rightWingRef.current.style.transform =
          `scaleX(${wingScale}) rotate(${wingCurl}deg)`;

        const butterflyLight = 0.62 + cracking * 0.24 + wingsOpen * 0.5;
        const butterflyFilter =
          `brightness(${butterflyLight}) saturate(${0.75 + wingsOpen * 0.35}) ` +
          `drop-shadow(0 0 ${8 + wingsOpen * 28}px rgba(198,151,238,${0.12 + wingsOpen * 0.35}))`;
        leftWingRef.current.style.filter = butterflyFilter;
        rightWingRef.current.style.filter = butterflyFilter;

        particlesRef.current.style.opacity = String(
          range(progress, 0.26, 0.5) * (1 - range(progress, 0.88, 1)),
        );
        particlesRef.current.style.transform =
          `translate3d(${(-23 + travel * 34)}vw, ${2 - emerge * 7}vh, 0) scale(${0.7 + emerge * 0.6})`;

        copyRef.current.style.transform =
          `translate3d(${travel * -45}vw, 0, 0)`;
        progressLineRef.current.style.transform = `scaleX(${progress})`;

        const activeStep = Math.min(3, Math.floor(progress * 4));
        stepRefs.current.forEach((step, index) => {
          if (!step) return;
          step.style.opacity = index === activeStep ? '1' : '0.28';
          step.style.transform =
            index === activeStep ? 'translateY(0)' : 'translateY(8px)';
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    updateTarget();
    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={sectionRef} className="transformation-story" id="story">
      <div className="transformation-stage">
        <div className="story-stars" />

        <div ref={cocoonRef} className="cocoon-rig">
          <div ref={cocoonLeftRef} className="cocoon-shell cocoon-shell-left">
            <img src="/images/crystal-cocoon-cutout.png" alt="" />
          </div>
          <div ref={cocoonRightRef} className="cocoon-shell cocoon-shell-right">
            <img src="/images/crystal-cocoon-cutout.png" alt="" />
          </div>
          <svg className="cocoon-crack" viewBox="0 0 180 560">
            <path
              ref={crackRef}
              d="M94 40 77 102l24 46-30 62 28 42-39 77 35 45-24 74 18 72"
            />
          </svg>
          <div ref={coreRef} className="cocoon-core" />
        </div>

        <div ref={particlesRef} className="transformation-particles">
          {Array.from({ length: 34 }, (_, index) => (
            <i
              key={index}
              style={
                {
                  '--particle-x': `${8 + ((index * 37) % 84)}%`,
                  '--particle-y': `${8 + ((index * 53) % 82)}%`,
                  '--particle-size': `${1 + (index % 4)}px`,
                  '--particle-delay': `${index * -0.17}s`,
                  '--particle-duration': `${3.8 + (index % 6) * 0.55}s`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div ref={butterflyRef} className="story-butterfly">
          <div ref={leftWingRef} className="story-wing story-wing-left">
            <img src="/images/glass-butterfly-cutout.png" alt="" />
          </div>
          <div ref={rightWingRef} className="story-wing story-wing-right">
            <img src="/images/glass-butterfly-cutout.png" alt="" />
          </div>
          <div className="story-butterfly-glow" />
        </div>

        <div ref={copyRef} className="story-copy">
          <p>Transformation in four movements</p>
          <h1>
            Some forms are found.
            <br />
            Others are <em>become.</em>
          </h1>
          <span>
            Scroll slowly. The scene moves with you—and reverses when you do.
          </span>
        </div>

        <div className="story-timeline">
          <div className="story-progress-track">
            <div ref={progressLineRef} className="story-progress-line" />
          </div>
          <div className="story-step-list">
            {storySteps.map(([number, title, body], index) => (
              <div
                key={number}
                ref={(node) => {
                  stepRefs.current[index] = node;
                }}
                className="story-step"
              >
                <b>{number}</b>
                <strong>{title}</strong>
                <small>{body}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="story-scroll-hint">
          <span>Scroll to transform</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m5 9 7 7 7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
