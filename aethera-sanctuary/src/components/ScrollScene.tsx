import { useEffect, useRef } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));

const smoothstep = (value: number) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

export function ScrollScene() {
  const rigRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef(0);
  const progressRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateTarget = () => {
      const start = window.innerHeight * 0.28;
      const end = document.documentElement.scrollHeight - window.innerHeight;
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
        bodyRef.current &&
        glowRef.current &&
        dustRef.current
      ) {
        const fold = 72 * (1 - progress);
        const flutter = Math.sin(progress * Math.PI * 3) * (1 - progress) * 1.6;
        const wingBrightness = 0.72 + progress * 0.48;
        const wingSaturation = 0.82 + progress * 0.3;

        leftWingRef.current.style.transform =
          `perspective(1200px) rotateY(${fold + flutter}deg)`;
        rightWingRef.current.style.transform =
          `perspective(1200px) rotateY(${-fold - flutter}deg)`;

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

        bodyRef.current.style.filter =
          `brightness(${0.82 + progress * 0.35}) drop-shadow(0 0 ${8 + progress * 18}px rgba(215,184,244,${0.18 + progress * 0.28}))`;
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
        <img
          ref={bodyRef}
          src="/images/glass-butterfly-open.png"
          alt=""
          className="butterfly-body"
        />
        <div ref={glowRef} className="butterfly-glow" />
        <div ref={dustRef} className="butterfly-dust">
          {Array.from({ length: 18 }, (_, index) => (
            <i key={index} style={{ '--dust-index': index } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="scene-violet-wash" />
      <div className="scene-vignette" />
    </div>
  );
}
