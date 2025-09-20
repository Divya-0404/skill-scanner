import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function AnimatedOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      // Rotate the orb
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      
      // Scale based on hover
      const targetScale = hovered ? 1.2 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const orbColor = theme === 'light' ? '#0EA5E9' : '#8B5CF6';

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <Sphere
        ref={meshRef}
        args={[1.5, 64, 64]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, 0, 0]}
      >
        <MeshDistortMaterial
          color={orbColor}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </Sphere>
      
      {/* Inner glow sphere */}
      <Sphere args={[1.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color={orbColor}
          transparent
          opacity={0.2}
        />
      </Sphere>
    </Float>
  );
}

function WireframeGrid() {
  const { theme } = useTheme();
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      gridRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  const gridColor = theme === 'light' ? '#0EA5E9' : '#8B5CF6';

  return (
    <group ref={gridRef}>
      {/* Rotating wireframe cubes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshBasicMaterial color={gridColor} wireframe transparent opacity={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

export function InteractiveOrb() {
  return (
    <div className="absolute inset-0 -z-10 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} color="#8B5CF6" intensity={0.5} />
        
        <AnimatedOrb />
        <WireframeGrid />
      </Canvas>
    </div>
  );
}