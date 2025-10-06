import { useLayoutEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Graph() {
  const g = useRef();
  const N = 10, R = 0.85;

  const nodes = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * R, Math.sin(a) * 0.20, Math.sin(a) * R);
  });

  const segs = [];
  for (let i = 0; i < N; i++) segs.push([i,(i+1)%N], [i,(i+3)%N]);
  const pos = new Float32Array(segs.length * 2 * 3);
  segs.forEach((p, i) => {
    const a = nodes[p[0]], b = nodes[p[1]];
    pos.set([a.x,a.y,a.z, b.x,b.y,b.z], i*6);
  });
  const lineGeom = new THREE.BufferGeometry();
  lineGeom.setAttribute("position", new THREE.BufferAttribute(pos, 3));

  const nodeMat = new THREE.MeshPhysicalMaterial({
    color:"#bfe3ff", emissive:"#6ec6ff", emissiveIntensity:0.35,
    roughness:0.25, metalness:0.2, clearcoat:0.6
  });
  const lineMat = new THREE.LineBasicMaterial({ color:"#6280ff", transparent:true, opacity:0.55 });

  useFrame((state, dt) => {
    if (!g.current) return;
    g.current.rotation.y += dt * 0.35;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.025;
    g.current.scale.setScalar(s);
  });

  return (
    <group ref={g} position={[0, 0, -2.5]} scale={0.9}>
      <lineSegments geometry={lineGeom} material={lineMat} />
      {nodes.map((p,i)=>(
        <mesh key={i} position={p} material={nodeMat}>
          <sphereGeometry args={[0.055, 24, 24]} />
        </mesh>
      ))}
      <mesh position={[0,0,0]} material={nodeMat}>
        <sphereGeometry args={[0.09, 28, 28]} />
      </mesh>
    </group>
  );
}

export default function HeroGraph({ targetSelector = "#accent-anchor" }){
  const boxRef = useRef(null);
  const [style, setStyle] = useState({ opacity:0 });

  const place = () => {
    const el = document.querySelector(targetSelector);
    const host = boxRef.current;
    if (!el || !host) return;

    const r = el.getBoundingClientRect();
    const parent = host.parentElement.getBoundingClientRect();

    const padX = r.width * 0.35;
    const padY = r.height * 1.4;

    const left = r.left - parent.left - padX * 0.2;
    const top  = r.top  - parent.top  - padY * 0.45;
    const width  = r.width  + padX;
    const height = r.height + padY;

    setStyle({
      position:"absolute",
      left:`${left}px`,
      top:`${top}px`,
      width:`${width}px`,
      height:`${height}px`,
      pointerEvents:"none",
      opacity:1,
      zIndex:0,
      mixBlendMode:"screen",
      filter:"blur(0.2px)"
    });
  };

  useLayoutEffect(() => {
    place();
    const ro = new ResizeObserver(place);
    const el = document.querySelector(targetSelector);
    if (el) ro.observe(el);
    window.addEventListener("resize", place, { passive:true });
    window.addEventListener("scroll", place,  { passive:true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place);
    };
  }, []);

  return (
    <div ref={boxRef} style={style} aria-hidden>
      <Canvas dpr={[1,2]} gl={{ alpha:true, antialias:true }} camera={{ position:[0,0,3], fov:45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2.2,2.4,1.2]} intensity={1.0} />
        <Graph />
      </Canvas>
    </div>
  );
}
