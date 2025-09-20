import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Box, Octahedron, Trail } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  color: string;
  shape: 'sphere' | 'box' | 'octahedron';
}

function FloatingShape({ position, color, shape }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      // Complex 3D rotation with multiple axes
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4 + Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + Math.cos(state.clock.elapsedTime * 0.15) * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * 0.2;
      
      // 3D orbital motion
      const time = state.clock.elapsedTime * 0.1;
      const radius = 0.5;
      meshRef.current.position.x = position[0] + Math.sin(time + position[0]) * radius;
      meshRef.current.position.y = position[1] + Math.cos(time + position[1]) * radius;
      meshRef.current.position.z = position[2] + Math.sin(time * 0.5 + position[2]) * radius;
    }
  });

  // Adaptive colors based on theme
  const adaptiveColor = theme === 'light'
    ? color
    : `#${new THREE.Color(color).multiplyScalar(1.2).getHexString()}`;

  return (
    <Trail
      width={2}
      length={8}
      color={adaptiveColor}
      attenuation={(t) => t * t}
    >
      <Float
        speed={3}
        rotationIntensity={2}
        floatIntensity={3}
        floatingRange={[-2, 2]}
      >
        <mesh ref={meshRef}>
          {shape === 'sphere' && <sphereGeometry args={[0.8, 32, 32]} />}
          {shape === 'box' && <boxGeometry args={[1.2, 1.2, 1.2]} />}
          {shape === 'octahedron' && <octahedronGeometry args={[1]} />}
          <meshPhysicalMaterial
            color={adaptiveColor}
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.9}
            transmission={0.1}
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
      </Float>
    </Trail>
  );
}

function HolographicRings() {
  const ringsRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      ringsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  const ringColor = theme === 'light' ? '#0EA5E9' : '#8B5CF6';

  return (
    <group ref={ringsRef}>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
          <torusGeometry args={[3 + i * 0.5, 0.02, 16, 100]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.4 - i * 0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export function FloatingElements() {
  const { theme } = useTheme();
  
  const shapes: FloatingShapeProps[] = [
    { position: [-6, 3, -4], color: theme === 'light' ? "#0EA5E9" : "#00D4FF", shape: 'sphere' },
    { position: [5, -2, -3], color: theme === 'light' ? "#8B5CF6" : "#A855F7", shape: 'box' },
    { position: [-3, -4, -2], color: theme === 'light' ? "#10B981" : "#34D399", shape: 'octahedron' },
    { position: [4, 4, -5], color: theme === 'light' ? "#F59E0B" : "#FCD34D", shape: 'sphere' },
    { position: [1, 5, -3], color: theme === 'light' ? "#EF4444" : "#F87171", shape: 'box' },
    { position: [-5, 1, -6], color: theme === 'light' ? "#EC4899" : "#F472B6", shape: 'octahedron' },
  ];

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={theme === 'light' ? 0.6 : 0.3} />
        <pointLight position={[10, 10, 10]} intensity={theme === 'light' ? 0.8 : 0.6} />
        <pointLight position={[-10, -10, -10]} color={theme === 'light' ? "#0EA5E9" : "#8B5CF6"} intensity={0.4} />
        <spotLight
          position={[0, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={theme === 'light' ? 0.5 : 0.3}
          color={theme === 'light' ? "#F59E0B" : "#A855F7"}
        />
        
        <HolographicRings />
        
        {shapes.map((shape, index) => (
          <FloatingShape key={index} {...shape} />
        ))}
        
        {/* Fog for depth */}
        <fog attach="fog" args={[theme === 'light' ? '#ffffff' : '#0f0f23', 8, 20]} />
      </Canvas>
    </div>
  );
}