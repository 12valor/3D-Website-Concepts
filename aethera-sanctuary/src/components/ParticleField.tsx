import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let particles: Particle[] = [];
    let raf = 0;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(scale, 0, 0, scale, 0, 0);

      const count = Math.floor(
        (window.innerWidth * window.innerHeight) / 18000,
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -Math.random() * 0.2 - 0.04,
        size: Math.random() * 1.2 + 0.35,
        opacity: Math.random() * 0.42 + 0.12,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const particle of particles) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.y < -4) particle.y = window.innerHeight + 4;
        if (particle.x < -4) particle.x = window.innerWidth + 4;
        if (particle.x > window.innerWidth + 4) particle.x = -4;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = `rgba(211, 176, 242, ${particle.opacity})`;
        context.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
