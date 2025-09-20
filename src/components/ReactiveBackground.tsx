import React, { useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";
import { useTheme } from "next-themes";

export function ReactiveBackground() {
  const { theme } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const newClick = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now()
    };
    setClicks(prev => [...prev, newClick]);
    
    // Remove click after animation
    setTimeout(() => {
      setClicks(prev => prev.filter(click => click.id !== newClick.id));
    }, 1000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPct = (clientX / innerWidth - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;
      
      setMousePosition({ x: xPct, y: yPct });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Enhanced particle system
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 4,
    speed: Math.random() * 0.5 + 0.2,
    direction: Math.random() * Math.PI * 2,
  }));

  // Floating orbs with more complex movement
  const orbs = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    speed: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div 
      className="absolute inset-0 -z-10 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Enhanced animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-60"
        style={{
          background: theme === 'light' 
            ? `radial-gradient(800px circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(14, 165, 233, 0.2), rgba(139, 92, 246, 0.1) 50%, transparent 70%)`
            : `radial-gradient(800px circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(139, 92, 246, 0.2), rgba(14, 165, 233, 0.1) 50%, transparent 70%)`
        }}
        animate={{
          opacity: isHovered ? 1 : 0.6,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Floating orbs */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full blur-xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            background: theme === 'light' 
              ? `radial-gradient(circle, rgba(14, 165, 233, 0.3) 0%, transparent 70%)`
              : `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, Math.sin(Date.now() * orb.speed) * 100, 0],
            y: [0, Math.cos(Date.now() * orb.speed) * 100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8 + orb.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: theme === 'light' 
              ? `linear-gradient(45deg, rgba(14, 165, 233, 0.8), rgba(139, 92, 246, 0.4))`
              : `linear-gradient(45deg, rgba(139, 92, 246, 0.8), rgba(14, 165, 233, 0.4))`,
            boxShadow: theme === 'light'
              ? `0 0 ${particle.size * 2}px rgba(14, 165, 233, 0.4)`
              : `0 0 ${particle.size * 2}px rgba(139, 92, 246, 0.4)`,
          }}
          animate={{
            x: [
              0, 
              Math.cos(particle.direction) * (mousePosition.x * 30 + 20), 
              Math.cos(particle.direction + Math.PI) * 15,
              0
            ],
            y: [
              0, 
              Math.sin(particle.direction) * (mousePosition.y * 30 + 20), 
              Math.sin(particle.direction + Math.PI) * 15,
              0
            ],
            scale: isHovered ? [1, 1.8, 1.2, 1] : [1, 1.4, 1],
            opacity: [0.4, 1, 0.6, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Click ripple effects */}
      {clicks.map((click) => (
        <motion.div
          key={click.id}
          className="absolute pointer-events-none"
          style={{
            left: click.x,
            top: click.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
        >
          <motion.div
            className="w-4 h-4 rounded-full border-2"
            style={{
              borderColor: theme === 'light' ? 'rgba(14, 165, 233, 0.8)' : 'rgba(139, 92, 246, 0.8)',
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 15, 25], 
              opacity: [1, 0.5, 0],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: theme === 'light' 
                ? 'radial-gradient(circle, rgba(14, 165, 233, 0.6) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
            }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ 
              scale: [0, 8, 12], 
              opacity: [0.8, 0.3, 0],
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
      ))}

      {/* Enhanced interactive grid */}
      <div className="absolute inset-0 opacity-15">
        <div className="grid grid-cols-16 grid-rows-10 h-full w-full">
          {Array.from({ length: 160 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-primary/10 relative overflow-hidden"
              whileHover={{
                backgroundColor: theme === 'light' ? "rgba(14, 165, 233, 0.15)" : "rgba(139, 92, 246, 0.15)",
                scale: 1.1,
                borderColor: theme === 'light' ? "rgba(14, 165, 233, 0.4)" : "rgba(139, 92, 246, 0.4)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                opacity: {
                  duration: 3 + (i % 10) * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              }}
            >
              <motion.div
                className="absolute inset-0 shimmer-effect"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: (i % 20) * 0.1,
                  ease: "linear",
                }}
                style={{
                  background: `linear-gradient(90deg, transparent, ${
                    theme === 'light' ? 'rgba(14, 165, 233, 0.2)' : 'rgba(139, 92, 246, 0.2)'
                  }, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cursor follower */}
      <motion.div
        className="absolute pointer-events-none z-10"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full border-2"
          style={{
            borderColor: theme === 'light' ? 'rgba(14, 165, 233, 0.8)' : 'rgba(139, 92, 246, 0.8)',
          }}
          animate={{
            scale: isHovered ? 2 : 1,
            opacity: isHovered ? 0.8 : 0.4,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Ripple effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(14, 165, 233, 0.05) 0%, transparent 50%)`
            : "transparent",
        }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}