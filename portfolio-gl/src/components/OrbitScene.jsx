import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function SpinningTorus() {
  return (
    <mesh rotation={[0.6, 0.2, 0]}>
      <torusKnotGeometry args={[1.2, 0.38, 220, 32]} />
      <meshStandardMaterial
        metalness={0.7}
        roughness={0.25}
        color={new THREE.Color("#7c5cff")}
        emissive={new THREE.Color("#3a2cff")}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function FloatingParticles({ count = 160 }) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 14;
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00d4ff" />
    </points>
  );
}

export default function OrbitScene() {
  return (
    <div className="r3f-bg" aria-hidden>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#0b0f18"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={1.2} />
        <group>
          <SpinningTorus />
          <FloatingParticles />
        </group>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}
