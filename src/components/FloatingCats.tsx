"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Reduced elements for better performance
const catElements = ["🐾", "😺", "🐱", "☕"];

const FloatingCats: React.FC = () => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Respect user's motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldAnimate(!mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldAnimate(!e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Don't render if user prefers reduced motion
  if (!shouldAnimate) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {/* Reduced from 14 to 6 elements for better performance */}
      {Array.from({ length: 6 }).map((_, i) => {
        const delay = (i % 3) * 1.2; // Increased delay between elements
        const duration = 8 + (i % 3); // Slower animation
        const left = `${15 + (i * 15)}%`; // More spaced out
        const element = catElements[i % catElements.length];
        
        return (
          <motion.div
            key={i}
            className="absolute text-xl opacity-15" // Reduced opacity and size
            style={{ left }}
            initial={{ y: "110vh", rotate: 0, scale: 0.8 }}
            animate={{ 
              y: "-10vh", 
              rotate: element === "☕" ? 360 : 15, 
              scale: 1 
            }}
            transition={{
              delay,
              duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear", // Linear for better performance
            }}
          >
            {element}
          </motion.div>
        );
      })}

      {/* Optional: Static decorative elements for users with reduced motion */}
      <div className="absolute top-20 right-10 text-2xl opacity-10 hidden motion-safe:hidden">
        🐱
      </div>
      <div className="absolute bottom-20 left-10 text-2xl opacity-10 hidden motion-safe:hidden">
        ☕
      </div>
    </div>
  );
};

export default FloatingCats;