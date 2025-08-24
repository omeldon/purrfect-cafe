"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, Heart, Star, Clock, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Hero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Reduced parallax for better performance

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleScrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToCats = () => {
    const catsElement = document.getElementById('cats');
    if (catsElement) {
      catsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!mounted) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#081f5c] to-[#334eac]">
        <div className="text-center text-white">
          <div className="text-4xl mb-4">☕</div>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#081f5c] via-[#334eac] to-[#7096d1]"
    >
      {/* Simplified background elements - better performance */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div 
          className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-[#d0e3ff]/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-[#e7f1ff]/25 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Minimal decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`coffee-${i}`}
            className="absolute text-3xl opacity-10"
            style={{ 
              left: `${20 + i * 20}%`, 
              top: `${30 + (i * 15) % 40}%` 
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 12 + (i % 3),
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            ☕
          </motion.div>
        ))}
      </div>

      <motion.div
        style={{ y: parallaxY }}
        className="relative z-10 mx-6 max-w-5xl text-center"
      >
        {/* Main heading - simplified animation */}
        <motion.h1
          className="text-6xl font-bold text-white sm:text-7xl lg:text-8xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Coffee. Cats.{" "}
          <motion.span 
            className="bg-gradient-to-r from-[#d0e3ff] to-[#e7f1ff] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Purrfection.
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mx-auto max-w-3xl text-xl text-[#d0e3ff] leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Premium artisan coffee meets cozy feline companionship. 
          Experience the perfect blend of exceptional beans and adorable cats in our unique café.
          <br />
          <motion.span
            className="text-[#e7f1ff] font-medium inline-block mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            It&apos;s a whole latte love in every cup! ☕ 🐱
          </motion.span>
        </motion.p>

        {/* CTA buttons - improved for mobile */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Button 
            onClick={handleScrollToMenu}
            size="lg"
            className="w-full sm:w-auto bg-[#d0e3ff] text-[#081f5c] hover:bg-[#e7f1ff] hover:text-[#081f5c] font-semibold px-8 py-4 rounded-full shadow-lg border-0 transition-all duration-200"
          >
            <Coffee className="mr-2 h-5 w-5" />
            Shop Our Coffee
          </Button>

          <Button 
            onClick={handleScrollToCats}
            variant="outline"
            size="lg"
            className="w-full sm:w-auto border-2 border-[#d0e3ff] text-[#d0e3ff] hover:bg-[#d0e3ff] hover:text-[#081f5c] font-semibold px-8 py-4 rounded-full backdrop-blur-sm transition-all duration-200"
          >
            <Heart className="mr-2 h-5 w-5" />
            Meet Our Cats
          </Button>
        </motion.div>

        {/* Feature highlights - simplified */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {[
            { icon: Star, text: "5-Star Rated", color: "text-[#e7f1ff]" },
            { icon: Coffee, text: "Fresh Daily", color: "text-[#d0e3ff]" },
            { icon: Clock, text: "Open 7 Days", color: "text-[#e7f1ff]" },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 rounded-full bg-[#081f5c]/30 backdrop-blur-sm px-4 py-2 border border-[#7096d1]/30"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(112, 150, 209, 0.2)",
                borderColor: "rgba(112, 150, 209, 0.5)"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.1 }}
            >
              <feature.icon className={`h-4 w-4 ${feature.color}`} />
              <span className="text-[#d0e3ff] font-medium text-sm">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator - improved */}
      <motion.button
        onClick={handleScrollToMenu}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#d0e3ff] hover:text-[#e7f1ff] transition-colors cursor-pointer group"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to menu"
      >
        <motion.div
          className="text-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-sm mb-2 group-hover:text-[#e7f1ff]">Explore Menu</div>
          <ArrowDown className="h-6 w-6 mx-auto" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;