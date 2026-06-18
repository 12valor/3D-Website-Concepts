import { useEffect, useRef } from 'react';

export function FinaleSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="finale-section" id="journey">
      <div className="finale-ambient" />
      <div ref={contentRef} className="finale-content">
        <p className="section-label">Aethera Eternal</p>
        <h2>
          What opens can never
          <br />
          return unchanged.
        </h2>
        <div className="finale-actions">
          <a href="#hero" className="finale-link">
            <span>Experience it again</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m7 14 5-5 5 5" />
            </svg>
          </a>
        </div>
        <div className="finale-sigil">✦</div>
      </div>
    </section>
  );
}
