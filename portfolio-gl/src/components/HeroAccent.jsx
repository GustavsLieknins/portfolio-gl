import { useLayoutEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function GlowRing({ rx = 1.15, ry = 0.42 }) {
  const geom = useMemo(() => {
    const g = new THREE.RingGeometry(0.22, 0.62, 128);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);
  const mat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#62baff",
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );
  return (
    <mesh geometry={geom} material={mat} position={[0, 0, -2.28]} scale={[rx, 0.35, 1]} />
  );
}

function EllipsePath({ rx = 1.15, ry = 0.42, segments = 220, radius = 0.02 }) {
  const curve = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * rx, Math.sin(t) * ry, -2.2));
    }
    return new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
  }, [rx, ry, segments]);

  const geom = useMemo(() => new THREE.TubeGeometry(curve, 360, radius, 16, true), [curve, radius]);
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#9ccfff"),
        emissive: new THREE.Color("#4fbfff"),
        emissiveIntensity: 0.65,
        roughness: 0.25,
        metalness: 0.15,
        transparent: true,
        opacity: 0.6,
        clearcoat: 0.85,
      }),
    []
  );

  return <mesh geometry={geom} material={mat} />;
}

function Orbs({ rx = 1.15, ry = 0.42, count = 7, baseSize = 0.085 }) {
  const phases = useMemo(() => [...Array(count)].map((_, i) => i / count), [count]);
  const groups = useRef([]);

  const haloMats = useMemo(
    () =>
      [...Array(count)].map(
        () =>
          new THREE.SpriteMaterial({
            color: "#96e3ff",
            transparent: true,
            opacity: 0.75,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          })
      ),
    [count]
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const base = (t * 0.09 + Math.sin(t * 0.7) * 0.02) % 1;

    phases.forEach((phase, i) => {
      const u = (base + phase) % 1;
      const a = u * Math.PI * 2;

      const x = Math.cos(a) * rx;
      const y = Math.sin(a) * ry;
      const z = -2.18;

      const g = groups.current[i];
      if (!g) return;

      const pulse = 1 + Math.sin(t * 1.5 + i) * 0.15;
      const s = baseSize * pulse;
      g.position.set(x, y, z);
      g.scale.setScalar(s);

      const sprite = g.children[0];
      if (sprite) {
        const front = Math.max(0, Math.cos(a));
        sprite.material.opacity = 0.45 + front * 0.55;
        sprite.scale.setScalar(s * 3.1);
      }
    });
  });

  return (
    <>
      {phases.map((_, i) => (
        <group key={i} ref={(el) => (groups.current[i] = el)} position={[0, 0, -2.18]}>
          <sprite material={haloMats[i]} />
          <mesh>
            <sphereGeometry args={[baseSize, 24, 24]} />
            <meshPhysicalMaterial
              color={"#eaf9ff"}
              emissive={"#7fd9ff"}
              emissiveIntensity={0.9}
              roughness={0.2}
              metalness={0.2}
              clearcoat={0.9}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

function AccentScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2.2, 2.4, 1.2]} intensity={1.1} />
      <group position={[0, 0.06, 0]} scale={1.16}>
        <GlowRing />
        <EllipsePath />
        <Orbs />
      </group>
    </>
  );
}

export default function HeroAccent({ targetSelector = "#accent-anchor" }) {
  const boxRef = useRef(null);
  const [style, setStyle] = useState({ opacity: 0 });

  const place = () => {
    const el = document.querySelector(targetSelector);
    const host = boxRef.current;
    if (!el || !host) return;

    const r = el.getBoundingClientRect();
    const parent = host.parentElement.getBoundingClientRect();

    // Larger pad to accommodate thicker loop
    const padX = r.width * 0.36;
    const padY = r.height * 1.25;

    const left = r.left - parent.left - padX * 0.15;
    const top = r.top - parent.top - padY * 0.64;
    const width = r.width + padX;
    const height = r.height + padY;

    setStyle({
      position: "absolute",
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
      pointerEvents: "none",
      opacity: 1,
      zIndex: 0,
      mixBlendMode: "screen",
      filter: "blur(0.15px)",
    });
  };

  useLayoutEffect(() => {
    place();
    const ro = new ResizeObserver(place);
    const el = document.querySelector(targetSelector);
    if (el) ro.observe(el);
    window.addEventListener("resize", place, { passive: true });
    window.addEventListener("scroll", place, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, []);

  return (
    <div ref={boxRef} style={style} aria-hidden>
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 3.0], fov: 42 }}
      >
        <AccentScene />
      </Canvas>
    </div>
  );
}
