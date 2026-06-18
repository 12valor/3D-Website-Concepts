import { type CSSProperties, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const dustCount = 28;

export function HeroScene() {
  const rigRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = e.clientY / window.innerHeight;
    };

    const tick = () => {
      const { x, y } = mouseRef.current;
      const cx = (x - 0.5) * 2;
      const cy = (y - 0.5) * 2;

      if (rigRef.current) {
        rigRef.current.style.transform =
          `translateY(${-8 + cy * 3}px) scale(${0.94 + Math.abs(cx) * 0.01}) ` +
          `rotate3d(0, 1, 0, ${cx * 4}deg)`;
      }

      const wingBreathe = Math.sin(Date.now() * 0.0012) * 0.02;
      const wingOpenBase = 0.68;

      if (leftWingRef.current) {
        leftWingRef.current.style.transform =
          `scaleX(${wingOpenBase + wingBreathe + cx * 0.06}) rotateZ(${2.4 + cy * 1.2}deg)`;
      }

      if (rightWingRef.current) {
        rightWingRef.current.style.transform =
          `scaleX(${wingOpenBase + wingBreathe - cx * 0.06}) rotateZ(${-2.4 - cy * 1.2}deg)`;
      }

      if (glowRef.current) {
        glowRef.current.style.opacity = String(0.55 + Math.sin(Date.now() * 0.0008) * 0.15);
      }

      if (dustRef.current) {
        dustRef.current.style.opacity = String(0.65 + Math.sin(Date.now() * 0.001) * 0.1);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    // Fade in hero content
    const timer = setTimeout(() => {
      heroRef.current?.classList.add('is-visible');
    }, 300);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero-scene" id="hero">
      <div className="fixed-scene">
        <div ref={rigRef} className="butterfly-rig">
          <div ref={leftWingRef} className="butterfly-wing butterfly-wing-left">
            <img src="/images/glass-butterfly-cutout.png" alt="" draggable={false} />
          </div>
          <div ref={rightWingRef} className="butterfly-wing butterfly-wing-right">
            <img src="/images/glass-butterfly-cutout.png" alt="" draggable={false} />
          </div>
          <div ref={glowRef} className="butterfly-glow" />
        </div>

        <div ref={dustRef} className="butterfly-dust">
          {Array.from({ length: dustCount }, (_, i) => (
            <i
              key={i}
              style={
                {
                  '--dust-x': `${5 + ((i * 41) % 90)}%`,
                  '--dust-y': `${5 + ((i * 57) % 88)}%`,
                  '--dust-size': `${1.2 + (i % 5) * 0.5}px`,
                  '--dust-delay': `${i * -0.22}s`,
                  '--dust-duration': `${3.6 + (i % 7) * 0.6}s`,
                  '--dust-dx': `${(i % 2 === 0 ? 1 : -1) * (12 + (i % 4) * 6)}px`,
                  '--dust-dy': `${-28 - (i % 5) * 8}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="scene-violet-wash" />
        <div className="scene-vignette" />
      </div>

      <div ref={heroRef} className="scroll-hero">
        <div className="hero-bottom-gradient" />
        <div className="scroll-hero-content">
          <Badge variant="outline" className="hero-subtitle-badge mb-4 border-white/10 bg-black/40 text-purple-200/80 tracking-widest uppercase">
            A sanctuary for luminous minds
          </Badge>
          <h1>
            Where silence becomes{' '}
            <span className="violet-underline">
              <span>radiance</span>
            </span>
          </h1>
          <p className="hero-description">
            Aethera crafts immersive digital experiences that breathe with intention.
            We build sanctuaries for ideas that refuse to be ordinary—spaces where
            light, motion, and meaning converge.
          </p>
          <div className="hero-actions">
            <div className="quiet-code">
              <span>npx</span> create-aethera
            </div>
            <Button asChild className="primary-action bg-purple-600 hover:bg-purple-500 text-white rounded-lg h-12 px-6">
              <a href="#story">
                Witness the Story
                <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-2 w-4 h-4">
                  <path d="m5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
            </Button>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="m7 10 5 5 5-5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
