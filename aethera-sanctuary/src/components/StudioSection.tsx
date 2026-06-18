import { useEffect, useRef } from 'react';

const capabilities = [
  {
    number: '01',
    title: 'Design Philosophy',
    body: "We don't decorate screens—we compose atmospheres. Every gradient, every motion curve, every breath of whitespace is an act of intention. Our philosophy is rooted in the belief that digital spaces can hold the same reverence as physical sanctuaries.",
  },
  {
    number: '02',
    title: 'Our Process',
    body: 'Each project begins in silence. We listen before we design, observe before we build. From concept through code, we move with deliberation—prototyping in light, iterating in shadow, and shipping only when the work speaks for itself.',
  },
  {
    number: '03',
    title: 'Digital Craft',
    body: 'We treat pixels like pigment and code like prose. Our craft lives at the intersection of engineering precision and artistic intuition—scroll-driven narratives, generative visuals, and interfaces that feel alive in your hands.',
  },
];

const values = [
  { icon: '◆', label: 'Intentional Design', desc: 'Every element earns its place' },
  { icon: '◇', label: 'Quiet Innovation', desc: 'Technology that whispers, never shouts' },
  { icon: '○', label: 'Luminous Craft', desc: 'Code as art, interfaces as experience' },
  { icon: '△', label: 'Deep Focus', desc: 'Slow work that moves the world forward' },
];

export function StudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    [headerRef.current, cardsRef.current, valuesRef.current].forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="studio-section" id="studio">
      <div className="studio-glow" />

      <div ref={headerRef} className="studio-header reveal-up">
        <p className="section-label">The Studio</p>
        <h2>
          We build quiet spaces
          <br />
          for <em>extraordinary</em> things.
        </h2>
        <p className="studio-intro">
          Aethera is a design studio for those who believe the digital world
          deserves the same care, craft, and intentionality as the physical one.
        </p>
      </div>

      <div ref={cardsRef} className="studio-capabilities reveal-up">
        {capabilities.map(({ number, title, body }) => (
          <article key={number} className="studio-card">
            <span className="studio-card-index">{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
            <div className="studio-card-line" />
          </article>
        ))}
      </div>

      <div ref={valuesRef} className="studio-values reveal-up">
        <p className="section-label">Our Values</p>
        <div className="values-grid">
          {values.map(({ icon, label, desc }) => (
            <div key={label} className="value-item">
              <span className="value-icon">{icon}</span>
              <strong>{label}</strong>
              <small>{desc}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
