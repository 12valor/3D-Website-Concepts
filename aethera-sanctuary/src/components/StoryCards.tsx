import { useEffect, useRef } from 'react';

const cards = [
  {
    title: 'Enter the quiet',
    body: 'We shape digital sanctuaries where clear thinking, patient craft, and meaningful ideas can breathe.',
  },
  {
    title: 'Reveal the unseen',
    body: 'Layered motion and responsive depth turn each encounter into something felt—not merely observed.',
  },
  {
    title: 'Build the eternal',
    body: 'Our systems balance expressive storytelling with resilient foundations made to evolve over time.',
  },
];

export function StoryCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const grid = gridRef.current;
    const trigger = document.getElementById('story-trigger');
    if (!container || !grid || !trigger) return;

    let raf = 0;
    const update = () => {
      const top = trigger.offsetTop;
      const height = trigger.offsetHeight;
      const viewport = window.innerHeight;
      const start = top - viewport * 0.5;
      const end = top + height - viewport * 0.3;
      const progress = Math.max(
        0,
        Math.min(1, (window.scrollY - start) / Math.max(1, end - start)),
      );
      const fadeIn = Math.min(
        1,
        Math.max(0, (window.scrollY - (start - viewport * 0.2)) / (viewport * 0.2)),
      );
      const fadeOut = Math.min(
        1,
        Math.max(0, (end + viewport * 0.3 - window.scrollY) / (viewport * 0.3)),
      );
      const active =
        window.scrollY >= start - viewport * 0.2 &&
        window.scrollY <= end + viewport * 0.3;

      container.style.opacity = String(active ? Math.min(fadeIn, fadeOut) : 0);
      const reveal = progress * 125;
      const direction = window.innerWidth < 768 ? 'bottom' : 'right';
      const mask = `linear-gradient(to ${direction}, black ${reveal}%, transparent ${reveal + 18}%)`;
      grid.style.maskImage = mask;
      grid.style.webkitMaskImage = mask;
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={containerRef} className="fixed-story-cards">
      <div ref={gridRef} className="story-card-grid">
        {cards.map((card, index) => (
          <article key={card.title}>
            <span className="card-index">0{index + 1}</span>
            <h2>{card.title}</h2>
            <p>{card.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
