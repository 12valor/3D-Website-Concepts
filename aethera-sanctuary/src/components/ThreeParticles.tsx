import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeParticlesProps {
  scrollProgress?: number;
  className?: string;
}

const PARTICLE_COUNT = 180;
const DEPTH_LAYERS = {
  background: { count: 54, speedMul: 0.3, sizeRange: [0.4, 1.0], opacityRange: [0.08, 0.22] },
  midground:  { count: 90, speedMul: 0.6, sizeRange: [0.6, 1.8], opacityRange: [0.12, 0.35] },
  foreground: { count: 36, speedMul: 1.0, sizeRange: [1.2, 3.0], opacityRange: [0.18, 0.48] },
};

export function ThreeParticles({ scrollProgress = 0, className }: ThreeParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.OrthographicCamera;
    particles: THREE.Points;
    velocities: Float32Array;
    phases: Float32Array;
    layerIndices: Float32Array;
    baseOpacities: Float32Array;
    time: number;
    raf: number;
  } | null>(null);
  const progressRef = useRef(scrollProgress);

  // Keep progress ref updated
  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Camera — orthographic for 2D-like particles
    const camera = new THREE.OrthographicCamera(
      -width / 2, width / 2,
      height / 2, -height / 2,
      0.1, 1000
    );
    camera.position.z = 100;

    const scene = new THREE.Scene();

    // Particle geometry
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const opacities = new Float32Array(PARTICLE_COUNT);
    const velocities = new Float32Array(PARTICLE_COUNT * 2); // vx, vy
    const phases = new Float32Array(PARTICLE_COUNT * 2); // phase offset for sine wobble
    const layerIndices = new Float32Array(PARTICLE_COUNT);
    const baseOpacities = new Float32Array(PARTICLE_COUNT);

    let idx = 0;
    for (const [layerName, layer] of Object.entries(DEPTH_LAYERS)) {
      const zBase = layerName === 'background' ? 0 : layerName === 'midground' ? 10 : 20;
      for (let i = 0; i < layer.count; i++) {
        const pi = idx;

        // Spread across viewport
        positions[pi * 3] = (Math.random() - 0.5) * width;
        positions[pi * 3 + 1] = (Math.random() - 0.5) * height;
        positions[pi * 3 + 2] = zBase + Math.random() * 8;

        // Size from layer range
        sizes[pi] = layer.sizeRange[0] + Math.random() * (layer.sizeRange[1] - layer.sizeRange[0]);
        sizes[pi] *= dpr;

        // Opacity from layer range
        const baseOp = layer.opacityRange[0] + Math.random() * (layer.opacityRange[1] - layer.opacityRange[0]);
        opacities[pi] = baseOp;
        baseOpacities[pi] = baseOp;

        // Velocity — slow drift, scaled by layer
        const speed = layer.speedMul;
        velocities[pi * 2] = (Math.random() - 0.5) * 0.25 * speed;
        velocities[pi * 2 + 1] = -(Math.random() * 0.15 + 0.05) * speed;

        // Phase for sinusoidal wobble
        phases[pi * 2] = Math.random() * Math.PI * 2;
        phases[pi * 2 + 1] = 0.3 + Math.random() * 0.8; // wobble frequency

        layerIndices[pi] = layerName === 'background' ? 0 : layerName === 'midground' ? 1 : 2;

        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

    // Custom shader material for soft glow particles
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aOpacity;
        varying float vOpacity;
        void main() {
          vOpacity = aOpacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vOpacity;
        void main() {
          // Soft circle with glow falloff
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.08, dist) * vOpacity;
          // Violet-white glow
          vec3 color = mix(vec3(0.78, 0.6, 0.93), vec3(0.94, 0.88, 1.0), smoothstep(0.3, 0.0, dist));
          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let time = 0;

    const state = {
      renderer, scene, camera, particles,
      velocities, phases, layerIndices, baseOpacities,
      time, raf: 0,
    };
    stateRef.current = state;

    const animate = () => {
      state.time += 0.016; // ~60fps timestep
      const t = state.time;
      const progress = progressRef.current;

      const posAttr = geometry.getAttribute('position') as THREE.BufferAttribute;
      const opAttr = geometry.getAttribute('aOpacity') as THREE.BufferAttribute;
      const posArr = posAttr.array as Float32Array;
      const opArr = opAttr.array as Float32Array;

      // Particle density boost during veiling phase (25-55% scroll)
      const veilingBoost = progress > 0.2 && progress < 0.6
        ? 1.0 + Math.sin((progress - 0.2) / 0.4 * Math.PI) * 0.6
        : 1.0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const vx = velocities[i * 2];
        const vy = velocities[i * 2 + 1];
        const phaseOffset = phases[i * 2];
        const wobbleFreq = phases[i * 2 + 1];

        // Sinusoidal wobble on X
        const wobbleX = Math.sin(t * wobbleFreq + phaseOffset) * 0.35;
        // Brownian-like micro noise
        const noiseX = (Math.random() - 0.5) * 0.04;
        const noiseY = (Math.random() - 0.5) * 0.03;

        posArr[i * 3] += vx + wobbleX + noiseX;
        posArr[i * 3 + 1] += vy + noiseY;

        // Wrap around edges
        const halfW = width / 2;
        const halfH = height / 2;
        if (posArr[i * 3] < -halfW - 10) posArr[i * 3] = halfW + 10;
        if (posArr[i * 3] > halfW + 10) posArr[i * 3] = -halfW - 10;
        if (posArr[i * 3 + 1] < -halfH - 10) posArr[i * 3 + 1] = halfH + 10;
        if (posArr[i * 3 + 1] > halfH + 10) posArr[i * 3 + 1] = -halfH - 10;

        // Modulate opacity based on veiling phase + breathing
        const breathe = 0.85 + Math.sin(t * 0.5 + phaseOffset) * 0.15;
        opArr[i] = baseOpacities[i] * breathe * veilingBoost;
      }

      posAttr.needsUpdate = true;
      opAttr.needsUpdate = true;

      (material.uniforms.uTime as { value: number }).value = t;

      renderer.render(scene, camera);
      state.raf = requestAnimationFrame(animate);
    };

    state.raf = requestAnimationFrame(animate);

    // Handle resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(state.raf);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  );
}
