import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BAND_ASSETS } from '../../data/bandData';

interface VinylStage3DProps {
  className?: string;
}

export function VinylStage3D({ className = '' }: VinylStage3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const spinBoostRef = useRef(0);
  const flipTargetRef = useRef(0);
  const [webglSupported, setWebglSupported] = useState(true);

  const triggerSpin = () => {
    spinBoostRef.current = Math.min(spinBoostRef.current + 26, 52);
    flipTargetRef.current += Math.PI * 4;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // Lighting: Warm champagne key, dusty rose rim, and studio fill so grooves & label pop
    const ambientLight = new THREE.AmbientLight(0xd8c9b8, 0.75);
    scene.add(ambientLight);

    const champagneKey = new THREE.DirectionalLight(0xf3e5d8, 2.8);
    champagneKey.position.set(3.5, 4.5, 5);
    scene.add(champagneKey);

    const roseRim = new THREE.PointLight(0xb49a82, 4.2, 16);
    roseRim.position.set(-3.5, -2.5, 3.2);
    scene.add(roseRim);

    const warmAccent = new THREE.PointLight(0x96777b, 3.4, 14);
    warmAccent.position.set(2.8, 2.2, 3.5);
    scene.add(warmAccent);

    // Vinyl Group — centered & straight-on at rest
    const vinylGroup = new THREE.Group();
    vinylGroup.rotation.x = 0;
    vinylGroup.rotation.y = 0;
    scene.add(vinylGroup);

    // Procedural Vinyl Groove Color + Bump Texture (lighter 512px on mobile for fast Safari GPU upload)
    const texSize = isMobile ? 512 : 1024;
    const grooveCanvas = document.createElement('canvas');
    grooveCanvas.width = texSize;
    grooveCanvas.height = texSize;
    const ctx = grooveCanvas.getContext('2d');
    if (ctx) {
      const cx = texSize / 2;
      const cy = texSize / 2;
      const scale = texSize / 1024;
      ctx.fillStyle = '#1c1822';
      ctx.fillRect(0, 0, texSize, texSize);

      // Subtle radial anisotropic light reflection (classic vinyl V-sheen)
      if (typeof ctx.createConicGradient === 'function') {
        const sheenGrad = ctx.createConicGradient(0.4, cx, cy);
        sheenGrad.addColorStop(0.0, 'rgba(216, 201, 184, 0.16)');
        sheenGrad.addColorStop(0.12, 'rgba(23, 21, 27, 0.0)');
        sheenGrad.addColorStop(0.38, 'rgba(23, 21, 27, 0.0)');
        sheenGrad.addColorStop(0.5, 'rgba(180, 154, 130, 0.18)');
        sheenGrad.addColorStop(0.62, 'rgba(23, 21, 27, 0.0)');
        sheenGrad.addColorStop(0.88, 'rgba(23, 21, 27, 0.0)');
        sheenGrad.addColorStop(1.0, 'rgba(216, 201, 184, 0.16)');
        ctx.fillStyle = sheenGrad;
        ctx.fillRect(0, 0, texSize, texSize);
      }

      for (let r = 178; r < 500; r += isMobile ? 5 : 3) {
        const isTrackGap = r === 265 || r === 355 || r === 438;
        ctx.beginPath();
        ctx.arc(cx, cy, r * scale, 0, Math.PI * 2);
        if (isTrackGap) {
          ctx.strokeStyle = 'rgba(180, 154, 130, 0.35)';
          ctx.lineWidth = 2 * scale;
        } else {
          ctx.strokeStyle =
            r % 6 === 0 ? 'rgba(180, 154, 130, 0.22)' : 'rgba(16, 13, 20, 0.9)';
          ctx.lineWidth = 1.2 * scale;
        }
        ctx.stroke();
      }
    }
    const grooveTexture = new THREE.CanvasTexture(grooveCanvas);
    grooveTexture.colorSpace = THREE.SRGBColorSpace;
    grooveTexture.anisotropy = 4;

    // Main Vinyl Disc (clearcoat physical material for authentic glossy LP look)
    const discGeometry = new THREE.CylinderGeometry(1.75, 1.75, 0.036, 128);
    const discMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x26212c,
      map: grooveTexture,
      roughness: 0.26,
      metalness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.16,
      bumpMap: grooveTexture,
      bumpScale: 0.02,
    });
    const discMesh = new THREE.Mesh(discGeometry, discMaterial);
    discMesh.rotation.x = Math.PI / 2;
    vinylGroup.add(discMesh);

    // Champagne Outer Rim
    const rimGeometry = new THREE.TorusGeometry(1.75, 0.016, 20, 128);
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xcab199,
      roughness: 0.26,
      metalness: 0.65,
    });
    const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
    vinylGroup.add(rimMesh);

    // Inner Champagne Hairline Ring
    const innerRingGeo = new THREE.TorusGeometry(0.66, 0.011, 16, 96);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, rimMaterial);
    innerRingMesh.position.z = 0.02;
    vinylGroup.add(innerRingMesh);

    // Center Label with Authentic Dope Sindu Logo
    const textureLoader = new THREE.TextureLoader();
    const logoTexture = textureLoader.load(BAND_ASSETS.logo);
    logoTexture.colorSpace = THREE.SRGBColorSpace;
    logoTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    const labelGeometry = new THREE.CircleGeometry(0.64, 96);
    const labelMaterial = new THREE.MeshStandardMaterial({
      map: logoTexture,
      emissive: 0xffffff,
      emissiveMap: logoTexture,
      emissiveIntensity: 0.38,
      roughness: 0.4,
      metalness: 0.08,
    });
    const labelMesh = new THREE.Mesh(labelGeometry, labelMaterial);
    labelMesh.position.z = 0.021;
    vinylGroup.add(labelMesh);

    const labelBack = new THREE.Mesh(labelGeometry, labelMaterial);
    labelBack.rotation.y = Math.PI;
    labelBack.position.z = -0.021;
    vinylGroup.add(labelBack);

    // Center Spindle Hole
    const spindleGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.05, 24);
    const spindleMat = new THREE.MeshStandardMaterial({
      color: 0xb49a82,
      metalness: 0.9,
      roughness: 0.2,
    });
    const spindleMesh = new THREE.Mesh(spindleGeo, spindleMat);
    spindleMesh.rotation.x = Math.PI / 2;
    vinylGroup.add(spindleMesh);

    // Floating Champagne Dust Particles
    const particleCount = isMobile ? 28 : 68;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 7.5;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xb49a82,
      size: isMobile ? 0.032 : 0.028,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse & Scroll tracking (centered when cursor is at viewport center)
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handlePointerMove = (e: PointerEvent) => {
      if (prefersReducedMotion || isMobile) return;
      mouse.targetX = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth - 0.5) * 2));
      mouse.targetY = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight - 0.5) * 2));
    };
    const handlePointerLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let animationId = 0;
    let spinAngle = 0;
    let flipAngle = 0;
    let smoothScroll = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      if (!prefersReducedMotion) {
        // Decay click-triggered spin boost smoothly (fast turntable inertia)
        spinBoostRef.current *= Math.pow(0.22, delta);
        if (spinBoostRef.current < 0.01) spinBoostRef.current = 0;

        const angularSpeed = 1.45 + spinBoostRef.current;
        spinAngle += angularSpeed * delta;

        // Smooth vinyl rotation
        discMesh.rotation.y = spinAngle;
        labelMesh.rotation.z = -spinAngle;
        labelBack.rotation.z = spinAngle;

        const scaleBoost = 1 + Math.min(spinBoostRef.current * 0.0025, 0.06);
        vinylGroup.scale.setScalar(scaleBoost);

        // Subtle floating bob
        vinylGroup.position.y = Math.sin(elapsed * 1.1) * 0.04;

        // Responsive pointer tilt & fast 720° click flip
        const pointerDamp = 1 - Math.exp(-8.5 * delta);
        const flipDamp = 1 - Math.exp(-9.5 * delta);
        mouse.x += (mouse.targetX - mouse.x) * pointerDamp;
        mouse.y += (mouse.targetY - mouse.y) * pointerDamp;

        const targetScroll = Math.min(window.scrollY / 900, 1);
        smoothScroll += (targetScroll - smoothScroll) * pointerDamp;

        // Smooth 3D flip rotation on click
        flipAngle += (flipTargetRef.current - flipAngle) * flipDamp;

        vinylGroup.rotation.x = mouse.y * 0.22 + smoothScroll * 0.25;
        vinylGroup.rotation.y = flipAngle + mouse.x * 0.28 - smoothScroll * 0.2;

        particles.rotation.y = elapsed * 0.015;
        particles.position.y = Math.sin(elapsed * 0.25) * 0.12;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      discGeometry.dispose();
      discMaterial.dispose();
      rimGeometry.dispose();
      rimMaterial.dispose();
      innerRingGeo.dispose();
      labelGeometry.dispose();
      labelMaterial.dispose();
      spindleGeo.dispose();
      spindleMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      grooveTexture.dispose();
      logoTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full bg-[#17151B] border border-[#B49A82]/40 shadow-2xl flex items-center justify-center animate-vinyl-slow">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-[#B49A82]/60">
            <img
              src={BAND_ASSETS.logo}
              alt="Dope Sindu Vinyl"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      aria-label="Spin vinyl record"
      onClick={triggerSpin}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerSpin();
        }
      }}
      className={`cursor-pointer select-none focus:outline-none ${className}`}
    />
  );
}
