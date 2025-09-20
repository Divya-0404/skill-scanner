import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, Sparkles, Line } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function DNA_Helix() {
  const helixRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  const helixPoints = useMemo(() => {
    const points = [];
    for (let i = 0; i < 200; i++) {
      const t = (i / 200) * Math.PI * 4;
      const radius = 2;
      const x = Math.cos(t) * radius;
      const y = (i / 200) * 10 - 5;
      const z = Math.sin(t) * radius;
      points.push({ position: [x, y, z], delay: i * 0.01 });
    }
    return points;
  }, []);

  useFrame((state) => {
    if (helixRef.current) {
      helixRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      helixRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <group ref={helixRef}>
      {helixPoints.map((point, i) => (
        <Float
          key={i}
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={point.position as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshPhysicalMaterial
              color={theme === 'light' ? '#0EA5E9' : '#8B5CF6'}
              emissive={theme === 'light' ? '#0EA5E9' : '#8B5CF6'}
              emissiveIntensity={0.2}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function NeuralNetwork() {
  const networkRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  const nodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 30; i++) {
      nodes.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8,
        ],
      });
    }
    return nodes;
  }, []);

  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      networkRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={networkRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={1}>
          <mesh position={node.position as [number, number, number]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial
              color={theme === 'light' ? '#10B981' : '#34D399'}
              emissive={theme === 'light' ? '#10B981' : '#34D399'}
              emissiveIntensity={0.3}
              transmission={0.2}
              thickness={0.1}
            />
          </mesh>
          
          {/* Connection lines to nearby nodes */}
          {nodes.slice(0, 3).map((targetNode, j) => {
            if (i === j) return null;
            return (
              <Line
                key={j}
                points={[
                  node.position as [number, number, number],
                  targetNode.position as [number, number, number],
                ]}
                color={theme === 'light' ? '#0EA5E9' : '#8B5CF6'}
                transparent
                opacity={0.2}
                lineWidth={1}
              />
            );
          })}
        </Float>
      ))}
    </group>
  );
}

function GeometricShapes() {
  const shapesRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (shapesRef.current) {
      shapesRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      shapesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={shapesRef}>
      {/* Central glowing orb */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[0, 0, 0]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshPhysicalMaterial
            color={theme === 'light' ? '#0EA5E9' : '#8B5CF6'}
            metalness={0.8}
            roughness={0.2}
            transmission={0.3}
            thickness={0.5}
            emissive={theme === 'light' ? '#0EA5E9' : '#8B5CF6'}
            emissiveIntensity={0.1}
          />
        </mesh>
      </Float>

      {/* Orbiting geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[x, Math.sin(angle * 2) * 2, z]}>
              <octahedronGeometry args={[0.3]} />
              <meshStandardMaterial
                color={theme === 'light' ? '#10B981' : '#34D399'}
                transparent
                opacity={0.7}
                wireframe
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export function Enhanced3DScene() {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 -z-5 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Dynamic environment lighting */}
        <Environment preset={theme === 'light' ? 'sunset' : 'night'} />
        
        {/* Advanced lighting setup */}
        <ambientLight intensity={theme === 'light' ? 0.4 : 0.2} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={theme === 'light' ? 0.8 : 0.5}
          castShadow
        />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color={theme === 'light' ? '#0EA5E9' : '#8B5CF6'} />
        
        {/* 3D Components */}
        <DNA_Helix />
        <NeuralNetwork />
        <GeometricShapes />
        
        {/* Sparkles for magic effect */}
        <Sparkles
          count={100}
          scale={[20, 20, 20]}
          size={2}
          speed={0.4}
          color={theme === 'light' ? '#0EA5E9' : '#8B5CF6'}
        />
        
        {/* Interactive controls for desktop */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
        
        {/* Atmospheric fog */}
        <fog attach="fog" args={[theme === 'light' ? '#ffffff' : '#0f0f23', 10, 30]} />
      </Canvas>
    </div>
  );
}