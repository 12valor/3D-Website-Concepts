import { type CSSProperties, useEffect, useRef } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

const smoothstep = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

export function ScrollScene() {
  const rigRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateTarget = () => {
      const start = window.innerHeight * 0.28;
      const trigger = document.getElementById('story-trigger');
      const end = trigger
        ? trigger.offsetTop + trigger.offsetHeight * 0.55
        : document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = clamp(
        (window.scrollY - start) / Math.max(1, end - start),
      );
    };

    const tick = () => {
      progressRef.current += (targetRef.current - progressRef.current) * 0.075;
      const progress = smoothstep(progressRef.current);

      if (
        rigRef.current &&
        leftWingRef.current &&
        rightWingRef.current &&
        glowRef.current &&
        dustRef.current
      ) {
        const wingScale = 0.24 + progress * 0.76;
        const curl = (1 - progress) * 2.4;
        const flutter = Math.sin(progress * Math.PI * 3) * (1 - progress) * 0.7;
        const wingBrightness = 0.72 + progress * 0.48;
        const wingSaturation = 0.82 + progress * 0.3;

        leftWingRef.current.style.transform =
          `scaleX(${wingScale}) rotateZ(${curl + flutter}deg)`;
        rightWingRef.current.style.transform =
          `scaleX(${wingScale}) rotateZ(${-curl - flutter}deg)`;

        const filter =
          `brightness(${wingBrightness}) saturate(${wingSaturation}) ` +
          `drop-shadow(0 0 ${12 + progress * 24}px rgba(187,137,229,${0.14 + progress * 0.28}))`;
        leftWingRef.current.style.filter = filter;
        rightWingRef.current.style.filter = filter;

        const scale = 0.94 + progress * 0.1;
        const lift = -8 - progress * 18;
        const drift = Math.sin(progress * Math.PI) * 4;
        rigRef.current.style.transform =
          `translate3d(${drift}px, ${lift}px, 0) scale(${scale})`;

        glowRef.current.style.opacity = String(progress * 0.92);
        dustRef.current.style.opacity = String(clamp((progress - 0.24) / 0.48));
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
    <div className="fixed-scene" aria-hidden="true">
      <div ref={rigRef} className="butterfly-rig">
        <div ref={leftWingRef} className="butterfly-wing butterfly-wing-left">
          <img src="/images/glass-butterfly-open.png" alt="" />
        </div>
        <div ref={rightWingRef} className="butterfly-wing butterfly-wing-right">
          <img src="/images/glass-butterfly-open.png" alt="" />
        </div>
        <div ref={glowRef} className="butterfly-glow" />
        <div ref={dustRef} className="butterfly-dust">
          {Array.from({ length: 18 }, (_, index) => {
            const side = index % 2 === 0 ? -1 : 1;
            const lane = index % 9;
            return (
              <i
                key={index}
                style={
                  {
                    '--dust-x': `${12 + lane * 9}%`,
                    '--dust-y': `${16 + (index % 5) * 13}%`,
                    '--dust-dx': `${side * (18 + (index % 4) * 8)}px`,
                    '--dust-dy': `${-28 - (index % 5) * 9}px`,
                    '--dust-size': `${2 + (index % 3)}px`,
                    '--dust-duration': `${4.8 + (index % 5) * 0.55}s`,
                    '--dust-delay': `${index * -0.31}s`,
                  } as CSSProperties
                }
              />
            );
          })}
        </div>
      </div>
      <div className="scene-violet-wash" />
      <div className="scene-vignette" />
    </div>
  );
}
