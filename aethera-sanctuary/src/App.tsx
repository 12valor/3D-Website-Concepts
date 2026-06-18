import { useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { ParticleField } from './components/ParticleField';
import { ScrollScene } from './components/ScrollScene';
import { StoryCards } from './components/StoryCards';

function App() {
  const heroRef = useRef<HTMLElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHero = () => {
      if (!heroRef.current) return;
      heroRef.current.style.opacity = String(
        Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.36)),
      );
    };

    window.addEventListener('scroll', updateHero, { passive: true });
    return () => window.removeEventListener('scroll', updateHero);
  }, []);

  useEffect(() => {
    const finale = finaleRef.current;
    if (!finale) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          finale.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(finale);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative bg-[#010101] text-white">
      <ScrollScene />
      <ParticleField />
      <StoryCards />
      <Navigation />

      <div className="relative z-10">
        <section ref={heroRef} className="scroll-hero">
          <div className="hero-bottom-gradient" />
          <div className="scroll-hero-content">
            <p className="hero-subtitle">A quiet digital sanctuary</p>
            <h1>
              Beyond silence, we build{' '}
              <span className="violet-underline">
                <span>the eternal.</span>
              </span>
            </h1>
            <p className="hero-description">
              Platforms for brilliant minds, fearless makers, and thoughtful souls,
              designed for deep work and pure flow.
            </p>
            <div className="hero-actions">
              <div className="quiet-code">
                <span aria-hidden="true">*</span>
                <code>enter the stillness</code>
              </div>
              <a href="#journey" className="primary-action">
                Begin Journey
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
          <a href="#story-trigger" className="scroll-cue" aria-label="Explore">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 9 7 7 7-7" />
            </svg>
          </a>
        </section>

        <div className="h-[150vh]" />
        <div id="story-trigger" className="h-[200vh]" />
        <div className="h-screen" />

        <section id="journey" className="finale-section">
          <div ref={finaleRef} className="finale-content">
            <p>Presenting</p>
            <h2>Aethera Eternal</h2>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
