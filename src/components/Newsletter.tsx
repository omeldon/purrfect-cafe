"use client";
import { motion } from "framer-motion";
import { Mail, Gift, Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast from "react-hot-toast";

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast.success("Welcome to our newsletter! 🎉", {
        icon: "📧",
      });
    }, 1500);
  };

  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Offers",
      description: "Be the first to know about special discounts and promotions"
    },
    {
      icon: Coffee,
      title: "New Arrivals",
      description: "Get updates on new coffee blends and seasonal favorites"
    },
    {
      icon: Heart,
      title: "Adoption Updates",
      description: "Hear heartwarming stories of cats finding their forever homes"
    }
  ];

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-br from-[#081f5c] to-[#334eac] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${20 + (i * 12) % 60}%`
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + (i % 3),
              repeat: Infinity,
              delay: i * 2,
              ease: "linear",
            }}
          >
            {i % 2 === 0 ? "☕" : "🐱"}
          </motion.div>
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 bg-[#d0e3ff]/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="h-5 w-5 text-[#d0e3ff]" />
            <span className="text-[#d0e3ff] font-medium">Stay Connected</span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join Our Coffee Community
          </motion.h2>

          <motion.p
            className="text-xl text-[#d0e3ff] max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get the latest updates on new coffee blends, cat adoption stories, 
            and exclusive offers delivered straight to your inbox.
          </motion.p>
        </div>

        {/* Newsletter Signup Form */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-[#d0e3ff]/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-0 text-[#081f5c] placeholder:text-[#7096d1] focus:ring-2 focus:ring-[#d0e3ff] h-12 text-base"
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#d0e3ff] text-[#081f5c] hover:bg-[#e7f1ff] hover:text-[#081f5c] font-semibold h-12 px-8 rounded-lg border-0 transition-all duration-200"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-5 w-5"
                >
                  ☕
                </motion.div>
              ) : (
                <>
                  <Mail className="mr-2 h-5 w-5" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
          
          <p className="text-[#d0e3ff]/80 text-sm mt-4 text-center">
            🔒 We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="bg-[#d0e3ff]/20 backdrop-blur-sm rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <benefit.icon className="h-8 w-8 text-[#d0e3ff]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {benefit.title}
              </h3>
              <p className="text-[#d0e3ff]/90 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Social Proof */}
        <motion.div
          className="text-center mt-12 pt-8 border-t border-[#d0e3ff]/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center gap-8 text-[#d0e3ff]/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">2,500+</span>
              <span>subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">4.9★</span>
              <span>average rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">Weekly</span>
              <span>updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;