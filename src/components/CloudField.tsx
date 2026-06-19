import { useEffect, useRef } from 'react';

export function CloudField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let animationFrame = 0;
    let renderer: import('three').WebGLRenderer | undefined;
    let scene: import('three').Scene | undefined;
    let camera: import('three').PerspectiveCamera | undefined;
    let clouds: import('three').Group[] = [];

    const setup = async () => {
      if (navigator.userAgent.includes('jsdom')) return;
      const THREE = await import('three');
      if (disposed || !mountRef.current) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(32, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 8;

      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const material = new THREE.MeshStandardMaterial({
        color: 0xf3cfa8,
        roughness: 0.9,
        metalness: 0,
        transparent: true,
        opacity: 0.18,
      });
      const geometry = new THREE.SphereGeometry(1, 20, 16);

      const createCloud = (x: number, y: number, scale: number) => {
        const group = new THREE.Group();
        [
          [-0.8, 0, 0, 0.72],
          [0, 0.18, 0.08, 1],
          [0.82, -0.02, -0.04, 0.68],
          [0.15, -0.38, 0.04, 0.82],
        ].forEach(([offsetX, offsetY, offsetZ, size]) => {
          const puff = new THREE.Mesh(geometry, material);
          puff.position.set(offsetX, offsetY, offsetZ);
          puff.scale.setScalar(size);
          group.add(puff);
        });
        group.position.set(x, y, 0);
        group.scale.setScalar(scale);
        scene?.add(group);
        return group;
      };

      clouds = [
        createCloud(-3.25, 1.75, 0.3),
        createCloud(3.15, 1.85, 0.24),
        createCloud(3.3, -1.85, 0.32),
      ];

      scene.add(new THREE.HemisphereLight(0xffd9b5, 0x4d2818, 1.8));
      const warmLight = new THREE.DirectionalLight(0xffb875, 2.2);
      warmLight.position.set(4, 3, 5);
      scene.add(warmLight);

      const resize = () => {
        if (!renderer || !camera || !mountRef.current) return;
        const { clientWidth, clientHeight } = mountRef.current;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      };

      const onVisibilityChange = () => {
        if (document.hidden) cancelAnimationFrame(animationFrame);
        else animate();
      };

      const start = performance.now();
      const animate = () => {
        if (disposed || document.hidden || !renderer || !scene || !camera) return;
        const elapsed = (performance.now() - start) / 1000;
        clouds.forEach((cloud, index) => {
          cloud.position.y += Math.sin(elapsed * 0.35 + index) * 0.0008;
          cloud.rotation.y = Math.sin(elapsed * 0.16 + index) * 0.08;
        });
        renderer.render(scene, camera);
        animationFrame = requestAnimationFrame(animate);
      };

      window.addEventListener('resize', resize, { passive: true });
      document.addEventListener('visibilitychange', onVisibilityChange);
      animate();

      return () => {
        window.removeEventListener('resize', resize);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    };

    let removeListeners: (() => void) | undefined;
    setup().then((cleanup) => {
      removeListeners = cleanup;
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      removeListeners?.();
      renderer?.dispose();
      scene?.traverse((object) => {
        if (object instanceof Object && 'geometry' in object) {
          (object as import('three').Mesh).geometry?.dispose();
        }
        if (object instanceof Object && 'material' in object) {
          const meshMaterial = (object as import('three').Mesh).material;
          if (Array.isArray(meshMaterial)) meshMaterial.forEach((item) => item.dispose());
          else meshMaterial?.dispose();
        }
      });
      renderer?.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="cloud-field" aria-hidden="true" />;
}
