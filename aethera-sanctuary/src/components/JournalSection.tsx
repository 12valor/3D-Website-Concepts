import { useEffect, useRef } from 'react';

const entries = [
  {
    date: 'June 2026',
    tag: 'Philosophy',
    title: 'On the Architecture of Silence',
    excerpt:
      'We spend so much of our craft filling space—every pixel accounted for, every viewport edge guarded. But what if the most powerful thing a designer could build was emptiness? This is a meditation on negative space as narrative.',
    readTime: '8 min read',
  },
  {
    date: 'May 2026',
    tag: 'Process',
    title: 'Scroll as Storytelling: A Manifesto',
    excerpt:
      'The scroll is the most intimate gesture in digital design—a continuous, unbroken thread between intention and discovery. Here we explore how scroll-driven animation transforms passive viewers into active participants in a living narrative.',
    readTime: '12 min read',
  },
  {
    date: 'April 2026',
    tag: 'Craft',
    title: 'Particles, Light, and the Illusion of Life',
    excerpt:
      'Behind every luminous interface lies mathematics disguised as magic. We deconstruct the generative particle systems, blend modes, and temporal easing that make digital objects appear to breathe, drift, and glow.',
    readTime: '10 min read',
  },
  {
    date: 'March 2026',
    tag: 'Reflection',
    title: 'What the Butterfly Knows',
    excerpt:
      'Transformation is not addition—it is release. The Aethera project began as a technical exercise and became a meditation on emergence, patience, and the courage required to let a form dissolve so another can appear.',
    readTime: '6 min read',
  },
];

export function JournalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    if (headerRef.current) observer.observe(headerRef.current);
    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="journal-section" id="journal">
      <div className="journal-glow" />

      <div ref={headerRef} className="journal-header reveal-up">
        <p className="section-label">Journal</p>
        <h2>
          Thoughts from
          <br />
          the <em>sanctuary</em>
        </h2>
      </div>

      <div className="journal-list">
        {entries.map(({ date, tag, title, excerpt, readTime }, i) => (
          <article
            key={title}
            ref={(node) => {
              itemRefs.current[i] = node;
            }}
            className="journal-entry reveal-up"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <div className="journal-entry-meta">
              <time>{date}</time>
              <span className="journal-tag">{tag}</span>
            </div>
            <div className="journal-entry-body">
              <h3>{title}</h3>
              <p>{excerpt}</p>
              <span className="journal-read-link">
                {readTime}
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 5 7 7-7 7" />
                </svg>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
