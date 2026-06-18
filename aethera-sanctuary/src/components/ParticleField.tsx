import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseSize: number;
  size: number;
  opacity: number;
  phase: number;
  wobbleSpeed: number;
  depth: number;
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let particles: Particle[] = [];
    let raf = 0;
    let time = 0;

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
      
      particles = Array.from({ length: count }, () => {
        // depth is roughly 0.2 to 1.0. Higher depth = closer = larger, faster, more opaque.
        const depth = 0.2 + Math.random() * 0.8;
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          // base velocities, scaled by depth
          vx: (Math.random() - 0.5) * 0.08 * depth,
          vy: -(Math.random() * 0.15 + 0.05) * depth,
          baseSize: (Math.random() * 1.5 + 0.3) * depth,
          size: 0,
          opacity: (Math.random() * 0.3 + 0.1) * depth,
          phase: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.02 + 0.01,
          depth,
        };
      });
      // Initialize size
      particles.forEach(p => { p.size = p.baseSize; });
    };

    const draw = () => {
      time += 1;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      for (const particle of particles) {
        // Apply sinusoidal wobble to x
        const wobble = Math.sin(time * particle.wobbleSpeed + particle.phase) * (0.3 * particle.depth);
        particle.x += particle.vx + wobble;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.y < -10) particle.y = window.innerHeight + 10;
        if (particle.x < -10) particle.x = window.innerWidth + 10;
        if (particle.x > window.innerWidth + 10) particle.x = -10;

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
