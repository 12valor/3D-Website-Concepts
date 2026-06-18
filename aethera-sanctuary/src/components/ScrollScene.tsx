import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeParticles } from './ThreeParticles';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
  { num: '01', title: 'Dormant', body: 'A quiet form holds its light close.' },
  { num: '02', title: 'Awakening', body: 'Pressure becomes radiance. The shell begins to yield.' },
  { num: '03', title: 'Emergence', body: 'Light escapes first. Then the hidden form follows.' },
  { num: '04', title: 'Becoming', body: 'What was protected learns the shape of open air.' },
];

export function ScrollScene() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Cocoon elements
  const cocoonRef = useRef<HTMLDivElement>(null);
  const cocoonGlowRef = useRef<HTMLDivElement>(null);
  const crackSvgRef = useRef<SVGPathElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  // Mist / bloom layers
  const innerGlowRef = useRef<HTMLDivElement>(null);
  const mistRef = useRef<HTMLDivElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);

  // Butterfly elements
  const butterflyRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<HTMLDivElement>(null);
  const rightWingRef = useRef<HTMLDivElement>(null);
  const butterflyGlowRef = useRef<HTMLDivElement>(null);

  // UI elements
  const copyRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Master timeline pinned to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);

            // Update progress line
            if (progressLineRef.current) {
              progressLineRef.current.style.transform = `scaleX(${self.progress})`;
            }

            // Update step indicators
            const activeStep = Math.min(3, Math.floor(self.progress * 4));
            stepRefs.current.forEach((step, index) => {
              if (!step) return;
              step.style.opacity = index === activeStep ? '1' : '0.28';
              step.style.transform = index === activeStep ? 'translateY(0)' : 'translateY(8px)';
            });
          },
        },
      });

      // ═══════════════════════════════════════════════
      // PHASE 1: DORMANT (0% – 15%)
      // Cocoon sits left-center with subtle breathing pulse
      // ═══════════════════════════════════════════════

      // Cocoon gentle breathing pulse
      tl.fromTo(cocoonRef.current,
        { scale: 0.92 },
        { scale: 0.96, duration: 0.08, ease: 'sine.inOut' },
        0
      );

      // Inner glow begins to kindle
      tl.fromTo(cocoonGlowRef.current,
        { opacity: 0.08, scale: 0.6 },
        { opacity: 0.35, scale: 0.85, duration: 0.12, ease: 'power1.inOut' },
        0.02
      );

      // ═══════════════════════════════════════════════
      // PHASE 2: AWAKENING (10% – 35%)
      // Inner glow intensifies, cracks appear, core brightens
      // ═══════════════════════════════════════════════

      // Cocoon glow intensifies dramatically
      tl.to(cocoonGlowRef.current,
        { opacity: 0.85, scale: 1.2, duration: 0.18, ease: 'power2.inOut' },
        0.10
      );

      // Light cracks draw along the seam
      tl.fromTo(crackSvgRef.current,
        { strokeDashoffset: 680, opacity: 0 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.22, ease: 'power1.inOut' },
        0.10
      );

      // Core light kindles
      tl.fromTo(coreRef.current,
        { opacity: 0, scale: 0.3 },
        { opacity: 0.9, scale: 1.8, duration: 0.20, ease: 'power2.out' },
        0.14
      );

      // Cocoon begins pulsing stronger
      tl.to(cocoonRef.current,
        { scale: 1.0, duration: 0.15, ease: 'power2.inOut' },
        0.12
      );

      // ═══════════════════════════════════════════════
      // PHASE 3: VEILING (25% – 55%)
      // Mist blooms outward, cocoon dissolves into light
      // ═══════════════════════════════════════════════

      // Inner glow expands into full bloom
      tl.to(innerGlowRef.current,
        { opacity: 1, scale: 2.5, duration: 0.25, ease: 'power2.out' },
        0.22
      );

      // Volumetric mist swells outward
      tl.fromTo(mistRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.85, scale: 1.6, duration: 0.28, ease: 'power1.out' },
        0.24
      );

      // Full bloom layer expands
      tl.fromTo(bloomRef.current,
        { opacity: 0, scale: 0.3 },
        { opacity: 0.7, scale: 2.0, duration: 0.25, ease: 'power2.out' },
        0.28
      );

      // Cocoon dissolves — blur + fade, NOT mechanical open
      tl.to(cocoonRef.current,
        {
          opacity: 0,
          filter: 'blur(24px) brightness(2)',
          scale: 1.08,
          duration: 0.22,
          ease: 'power2.inOut',
        },
        0.28
      );

      // Crack lines fade as cocoon dissolves
      tl.to(crackSvgRef.current,
        { opacity: 0, duration: 0.12, ease: 'power1.in' },
        0.32
      );

      // Core overexposure then fades
      tl.to(coreRef.current,
        { opacity: 0, scale: 3.5, duration: 0.20, ease: 'power2.in' },
        0.30
      );

      // ═══════════════════════════════════════════════
      // PHASE 4: EMERGENCE (40% – 75%)
      // Butterfly materializes from within the light
      // ═══════════════════════════════════════════════

      // Butterfly fades in through the mist
      tl.fromTo(butterflyRef.current,
        {
          opacity: 0,
          scale: 0.35,
          filter: 'blur(16px) brightness(1.8)',
        },
        {
          opacity: 1,
          scale: 0.75,
          filter: 'blur(0px) brightness(1)',
          duration: 0.28,
          ease: 'power2.out',
        },
        0.38
      );

      // Wings begin to unfurl — start folded, end partially open
      tl.fromTo(leftWingRef.current,
        { scaleX: 0.1, rotateZ: -8 },
        { scaleX: 0.55, rotateZ: -2, duration: 0.25, ease: 'power2.out' },
        0.42
      );
      tl.fromTo(rightWingRef.current,
        { scaleX: 0.1, rotateZ: 8 },
        { scaleX: 0.55, rotateZ: 2, duration: 0.25, ease: 'power2.out' },
        0.42
      );

      // Butterfly glow appears
      tl.fromTo(butterflyGlowRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.6, scale: 1.0, duration: 0.22, ease: 'power1.out' },
        0.45
      );

      // Mist begins to clear
      tl.to(mistRef.current,
        { opacity: 0.25, scale: 1.8, duration: 0.22, ease: 'power1.inOut' },
        0.50
      );

      // ═══════════════════════════════════════════════
      // PHASE 5: REVELATION (65% – 100%)
      // Full butterfly revealed, atmosphere settles
      // ═══════════════════════════════════════════════

      // Wings fully open
      tl.to(leftWingRef.current,
        { scaleX: 1, rotateZ: 0, duration: 0.28, ease: 'power3.out' },
        0.62
      );
      tl.to(rightWingRef.current,
        { scaleX: 1, rotateZ: 0, duration: 0.28, ease: 'power3.out' },
        0.62
      );

      // Butterfly scales to final size + moves right
      tl.to(butterflyRef.current,
        {
          scale: 1,
          x: '15vw',
          duration: 0.32,
          ease: 'power2.out',
        },
        0.62
      );

      // Wing glow + luminance
      tl.to(leftWingRef.current,
        {
          filter: 'brightness(0.95) saturate(1.1) drop-shadow(0 0 30px rgba(198,151,238,0.45))',
          duration: 0.25,
        },
        0.68
      );
      tl.to(rightWingRef.current,
        {
          filter: 'brightness(0.95) saturate(1.1) drop-shadow(0 0 30px rgba(198,151,238,0.45))',
          duration: 0.25,
        },
        0.68
      );

      // Mist fully clears
      tl.to(mistRef.current,
        { opacity: 0, duration: 0.20, ease: 'power1.in' },
        0.68
      );

      // Bloom settles to subtle ambient
      tl.to(bloomRef.current,
        { opacity: 0.12, scale: 2.5, duration: 0.25, ease: 'power1.out' },
        0.72
      );

      // Inner glow settles
      tl.to(innerGlowRef.current,
        { opacity: 0.15, scale: 3.0, duration: 0.20, ease: 'power1.out' },
        0.72
      );

      // Butterfly glow stabilizes
      tl.to(butterflyGlowRef.current,
        { opacity: 0.45, scale: 1.2, duration: 0.18, ease: 'power1.out' },
        0.78
      );

      // Text parallax — shifts left subtly as butterfly reveals right
      tl.to(copyRef.current,
        { x: '-8vw', duration: 0.80, ease: 'none' },
        0.15
      );

      // Cocoon glow fades completely  
      tl.to(cocoonGlowRef.current,
        { opacity: 0, duration: 0.15, ease: 'power1.in' },
        0.45
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="scroll-story-section" id="story">
      <div ref={stageRef} className="scroll-story-stage">
        {/* Starfield background */}
        <div className="story-stars" />

        {/* Three.js atmospheric particles */}
        <ThreeParticles scrollProgress={scrollProgress} className="story-three-particles" />

        {/* ─── Cocoon rig ─── */}
        <div ref={cocoonRef} className="cocoon-container">
          <img
            src="/images/crystal-cocoon-cutout.png"
            alt=""
            className="cocoon-image"
            draggable={false}
          />

          {/* Glow layer behind cocoon */}
          <div ref={cocoonGlowRef} className="cocoon-inner-glow" />

          {/* Crack lines */}
          <svg className="cocoon-crack-svg" viewBox="0 0 180 560">
            <path
              ref={crackSvgRef}
              d="M94 40 77 102l24 46-30 62 28 42-39 77 35 45-24 74 18 72"
            />
          </svg>

          {/* Core light */}
          <div ref={coreRef} className="cocoon-core-light" />
        </div>

        {/* ─── Atmosphere layers ─── */}
        <div ref={innerGlowRef} className="atmo-inner-glow" />
        <div ref={mistRef} className="atmo-mist" />
        <div ref={bloomRef} className="atmo-bloom" />

        {/* ─── Butterfly rig ─── */}
        <div ref={butterflyRef} className="butterfly-container">
          <div ref={leftWingRef} className="butterfly-wing-l">
            <img src="/images/glass-butterfly-cutout.png" alt="" draggable={false} />
          </div>
          <div ref={rightWingRef} className="butterfly-wing-r">
            <img src="/images/glass-butterfly-cutout.png" alt="" draggable={false} />
          </div>
          <div ref={butterflyGlowRef} className="butterfly-aura" />
        </div>

        {/* ─── Story copy ─── */}
        <div ref={copyRef} className="story-copy">
          <p>Transformation in four movements</p>
          <h1>
            Some forms are found.
            <br />
            Others are <em>become.</em>
          </h1>
          <span className="story-copy-hint">
            Scroll slowly. The scene moves with you—and reverses when you do.
          </span>
        </div>

        {/* ─── Timeline UI ─── */}
        <div className="story-timeline">
          <div className="story-progress-track">
            <div ref={progressLineRef} className="story-progress-line" />
          </div>
          <div className="story-step-list">
            {storySteps.map(({ num, title, body }, index) => (
              <div
                key={num}
                ref={(node) => { stepRefs.current[index] = node; }}
                className="story-step"
              >
                <Badge variant="outline" className="story-step-badge">{num}</Badge>
                <strong>{title}</strong>
                <small>{body}</small>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
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
