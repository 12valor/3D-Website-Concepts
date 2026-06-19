import { useCallback, useEffect, useRef } from 'react';
import { animate, type AnimationPlaybackControls } from 'framer-motion';

const clampScroll = (value: number) => {
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(maxScroll, Math.max(0, value));
};

const normalizeWheelDelta = (event: WheelEvent) => {
  if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) return event.deltaY * 16;
  if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) return event.deltaY * window.innerHeight;
  return event.deltaY;
};

export function useFramerSmoothScroll() {
  const animationRef = useRef<AnimationPlaybackControls | null>(null);
  const targetRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const reduceMotionRef = useRef(false);

  const smoothScrollTo = useCallback((target: number, duration?: number) => {
    const destination = clampScroll(target);
    targetRef.current = destination;
    animationRef.current?.stop();

    if (reduceMotionRef.current) {
      window.scrollTo(0, destination);
      return;
    }

    const start = window.scrollY;
    const distance = Math.abs(destination - start);
    if (distance < 1) return;

    isAnimatingRef.current = true;
    animationRef.current = animate(start, destination, {
      duration: duration ?? Math.min(0.85, Math.max(0.38, distance / 1800)),
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => window.scrollTo(0, latest),
      onComplete: () => {
        isAnimatingRef.current = false;
        targetRef.current = window.scrollY;
      },
    });
  }, []);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    targetRef.current = window.scrollY;

    const syncTarget = () => {
      if (!isAnimatingRef.current) targetRef.current = window.scrollY;
    };

    const stopAnimation = () => {
      animationRef.current?.stop();
      isAnimatingRef.current = false;
      targetRef.current = window.scrollY;
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        reduceMotionRef.current ||
        !finePointer ||
        event.ctrlKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ) {
        return;
      }

      event.preventDefault();
      const delta = normalizeWheelDelta(event);
      smoothScrollTo(targetRef.current + delta, 0.58);
    };

    window.addEventListener('scroll', syncTarget, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', stopAnimation);
    window.addEventListener('pointerdown', stopAnimation);

    return () => {
      animationRef.current?.stop();
      window.removeEventListener('scroll', syncTarget);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', stopAnimation);
      window.removeEventListener('pointerdown', stopAnimation);
    };
  }, [smoothScrollTo]);

  return smoothScrollTo;
}
