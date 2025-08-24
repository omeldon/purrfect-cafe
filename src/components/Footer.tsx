"use client";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Coffee, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative overflow-hidden bg-gradient-to-br from-[#081f5c] via-[#334eac] to-[#081f5c] py-16 text-white">
      {/* Reduced animation elements for better performance */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-5"
            style={{ 
              left: `${20 + (i * 15)}%`, 
              top: `${20 + (i * 10) % 60}%` 
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.9, 1.1, 0.9],
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

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
        {/* Brand Section - Simplified */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">�</span>
            <h3 className="text-2xl font-bold text-[#d0e3ff]">
              Purrfect Brew
            </h3>
          </div>
          <p className="text-[#d0e3ff]/90 text-base leading-relaxed mb-6 max-w-md">
            Premium coffee meets feline comfort. Fresh roasted beans and cozy cat companionship daily.
          </p>
          <div className="flex gap-3">
            {[Coffee, Heart].map((Icon, idx) => (
              <motion.button
                key={idx}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-[#7096d1]/30 border border-[#d0e3ff]/20 hover:bg-[#7096d1]/50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                aria-label={idx === 0 ? "Coffee Info" : "Favorites"}
              >
                <Icon className="w-5 h-5 text-[#d0e3ff]" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Contact Info - Streamlined */}
        <div>
          <h4 className="text-lg font-semibold text-[#d0e3ff] mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Contact
          </h4>
          <ul className="space-y-3 text-[#d0e3ff]/80 text-sm">
            {[
              { icon: MapPin, text: "123 Cat Street, Coffee City", href: "https://maps.google.com" },
              { icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
              { icon: Mail, text: "hello@purrfectbrew.com", href: "mailto:hello@purrfectbrew.com" },
            ].map((item, idx) => (
              <li key={idx}>
                <a 
                  href={item.href}
                  className="flex items-center gap-3 hover:text-[#d0e3ff] transition-colors group"
                  rel="noopener noreferrer"
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                >
                  <item.icon className="h-4 w-4 text-[#7096d1] group-hover:text-[#d0e3ff] transition-colors flex-shrink-0" />
                  <span className="break-words">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours - Clean Design */}
        <div>
          <h4 className="text-lg font-semibold text-[#d0e3ff] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Hours
          </h4>
          <ul className="space-y-3">
            {[
              { time: "Mon–Fri", hours: "7am–9pm" },
              { time: "Sat–Sun", hours: "8am–10pm" },
              { time: "Holidays", hours: "9am–6pm" },
            ].map((schedule, idx) => (
              <li key={idx} className="flex items-center justify-between text-sm">
                <span className="font-medium text-[#d0e3ff]">{schedule.time}</span>
                <span className="text-[#d0e3ff]/80">{schedule.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer Bottom - Simplified */}
      <div className="relative z-10 mt-12 pt-6 border-t border-[#7096d1]/30 text-center">
        <p className="text-[#d0e3ff]/70 text-sm">
          © {new Date().getFullYear()} Purrfect Brew. All rights reserved.
        </p>
      </div>

      {/* Minimal decorative elements */}
      <div className="pointer-events-none absolute -right-10 bottom-10 text-6xl opacity-5 text-[#d0e3ff]">
        �
      </div>
    </footer>
  );
};

export default Footer;