import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// No extend needed; using native THREE elements

function ParticleSystem({ count = 2000 }) {
  const points = useRef<THREE.Points>(null);
  
  // Generate random particle positions
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;     // x
      positions[i + 1] = (Math.random() - 0.5) * 100; // y  
      positions[i + 2] = (Math.random() - 0.5) * 100; // z
    }
    return positions;
  }, [count]);

  // Animate particles
  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05;
      points.current.rotation.y = state.clock.elapsedTime * 0.08;
      
      // Add breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      points.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.8}
        sizeAttenuation
        transparent
        opacity={0.6}
        color="#0EA5E9"
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ParticleField() {
  return (
    <div className="absolute inset-0 -z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ParticleSystem />
      </Canvas>
    </div>
  );
}