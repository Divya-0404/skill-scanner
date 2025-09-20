import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Target, TrendingUp } from "lucide-react";
import heroBrain from "@/assets/hero-brain.jpg";

import { ReactiveBackground } from "./ReactiveBackground";

export function HeroSection() {
  const features = [
    { icon: Target, text: "AI-Powered Skills Assessment" },
    { icon: TrendingUp, text: "Personalized Career Paths" },
    { icon: Sparkles, text: "Real-Time Job Matching" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ReactiveBackground />
      
      {/* Background Image with better overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <img 
          src={heroBrain} 
          alt="AI Brain" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-8 group hover:scale-105 transition-transform duration-300"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-accent" />
            </motion.div>
            <motion.span 
              className="text-sm font-medium shimmer-effect"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                background: "linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--primary)), hsl(var(--foreground)))",
                backgroundSize: "200% 200%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI-Powered Career Navigator
            </motion.span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Discover Your{" "}
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent glow-text">
              Future Career
            </span>
            {" "}Path
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Take our AI-powered quiz to uncover your hidden skills, explore personalized career recommendations, 
            and get matched with real opportunities in the future of work.
          </motion.p>

          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12 stagger-fade-in"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 glass-card px-6 py-3 rounded-full hover-glow magnetic-hover group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.6 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="w-5 h-5 text-accent group-hover:animate-glow-pulse" />
                  </motion.div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">
                    {feature.text}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="glow" size="xl" className="group">
                Start Your Journey
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="glass" size="xl">
                Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto"
          >
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent group-hover:animate-glow-pulse"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                50K+
              </motion.div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Skills Assessed
              </div>
            </motion.div>
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl font-bold bg-gradient-to-r from-secondary to-secondary-glow bg-clip-text text-transparent group-hover:animate-glow-pulse"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                95%
              </motion.div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Accuracy Rate
              </div>
            </motion.div>
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent group-hover:animate-glow-pulse"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                10K+
              </motion.div>
              <div className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                Career Matches
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}