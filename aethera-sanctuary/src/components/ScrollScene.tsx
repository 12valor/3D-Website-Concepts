import { useEffect, useRef } from 'react';

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const range = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

export function ScrollScene() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const closedRef = useRef<HTMLImageElement>(null);
  const openingRef = useRef<HTMLImageElement>(null);
  const openRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const easedProgressRef = useRef(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const updateTarget = () => {
      const start = window.innerHeight * 0.35;
      const end = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = clamp(
        (window.scrollY - start) / Math.max(1, end - start),
      );
    };

    const tick = () => {
      easedProgressRef.current +=
        (progressRef.current - easedProgressRef.current) * 0.08;
      const progress = easedProgressRef.current;

      if (
        sceneRef.current &&
        closedRef.current &&
        openingRef.current &&
        openRef.current &&
        glowRef.current
      ) {
        const openingMix = range(progress, 0.06, 0.38);
        const openMix = range(progress, 0.34, 0.72);

        closedRef.current.style.opacity = String(1 - openingMix);
        openingRef.current.style.opacity = String(
          openingMix * (1 - openMix),
        );
        openRef.current.style.opacity = String(openMix);
        glowRef.current.style.opacity = String(range(progress, 0.2, 0.78));

        const scale = 1.015 + progress * 0.045;
        const lift = progress * -14;
        sceneRef.current.style.transform = `translate3d(0, ${lift}px, 0) scale(${scale})`;
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
      <div ref={sceneRef} className="butterfly-sequence">
        <img
          ref={closedRef}
          src="/images/glass-butterfly-closed.png"
          alt=""
          className="butterfly-frame"
        />
        <img
          ref={openingRef}
          src="/images/glass-butterfly-opening.png"
          alt=""
          className="butterfly-frame opacity-0"
        />
        <img
          ref={openRef}
          src="/images/glass-butterfly-open.png"
          alt=""
          className="butterfly-frame opacity-0"
        />
        <div ref={glowRef} className="butterfly-glow" />
      </div>
      <div className="scene-violet-wash" />
      <div className="scene-vignette" />
    </div>
  );
}
