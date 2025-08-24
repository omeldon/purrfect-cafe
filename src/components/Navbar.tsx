"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Menu, X, Coffee, Cat, Home, BookOpen, Star, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { getTotalItems, wishlist } = useCartStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'menu', 'cats', 'testimonials', 'newsletter'];
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section) as HTMLElement;
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on scroll or resize
  useEffect(() => {
    const closeMobileMenu = () => setMobileMenuOpen(false);
    
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('resize', closeMobileMenu);
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', closeMobileMenu);
    };
  }, [mobileMenuOpen]);

  const navigationItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: BookOpen },
  { label: "Menu", href: "#menu", icon: Coffee },
  { label: "Our Cats", href: "#cats", icon: Cat },
  { label: "Testimonials", href: "#testimonials", icon: Star }, 
  { label: "Newsletter", href: "#newsletter", icon: Mail },     
];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const sectionId = href.replace('#', '');
    setActiveSection(sectionId);
    
    // Smooth scroll to section with offset for fixed navbar
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const isActive = (href: string) => activeSection === href.replace('#', '');

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-[#d0e3ff]" 
            : "bg-gradient-to-b from-[#081f5c]/95 to-[#334eac]/80 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Enhanced Logo */}
          <motion.a 
            href="#home" 
            className="flex items-center gap-3 z-10"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <span className="text-3xl"></span>
              <span className="absolute -top-1 -right-1 text-lg"></span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold transition-colors leading-none ${
                scrolled ? "text-[#081f5c]" : "text-white"
              }`}>
                Purrfect Brew
              </span>
              <span className={`text-xs transition-colors ${
                scrolled ? "text-[#7096d1]" : "text-[#d0e3ff]"
              }`}>
                Cat Café & Coffee
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? scrolled
                      ? "bg-[#334eac] text-white shadow-md"
                      : "bg-white/20 text-white backdrop-blur-sm"
                    : scrolled 
                      ? "text-[#334eac] hover:bg-[#e7f1ff] hover:text-[#081f5c]" 
                      : "text-white hover:bg-white/10 hover:text-[#d0e3ff]"
                }`}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -2 }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Wishlist Button - Desktop */}
            <motion.button 
              className={`relative hidden lg:flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-200 ${
                scrolled 
                  ? "hover:bg-[#e7f1ff] text-[#334eac]" 
                  : "hover:bg-white/10 text-white"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="h-5 w-5" />
              <span className="text-sm font-medium">Wishlist</span>
              {wishlist.length > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white px-1.5 py-0.5 text-xs font-bold min-w-[20px] text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {wishlist.length}
                </motion.span>
              )}
            </motion.button>

            {/* Enhanced Cart Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onOpenCart}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-full border-0 shadow-lg transition-all duration-200 font-medium ${
                  scrolled
                    ? "bg-[#334eac] hover:bg-[#081f5c] text-white"
                    : "bg-white text-[#334eac] hover:bg-[#e7f1ff]"
                }`}
                size="sm"
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {getTotalItems() > 0 && (
                  <motion.span 
                    className={`rounded-full px-2 py-0.5 text-xs font-bold min-w-[20px] text-center ${
                      scrolled 
                        ? "bg-white text-[#334eac]"
                        : "bg-[#334eac] text-white"
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </Button>
            </motion.div>

            {/* Mobile menu toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                scrolled 
                  ? "hover:bg-[#e7f1ff] text-[#334eac]" 
                  : "hover:bg-white/10 text-white"
              }`}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Enhanced Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#081f5c]/80 to-[#334eac]/80 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Enhanced Menu Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl border-l border-[#d0e3ff]"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="p-6 pt-20 border-b border-[#e7f1ff]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <span className="text-2xl">☕</span>
                      <span className="absolute -top-1 -right-1 text-sm">🐱</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#081f5c]">Purrfect Brew</div>
                      <div className="text-xs text-[#7096d1]">Cat Café & Coffee</div>
                    </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-4">
                  <div className="space-y-2">
                    {navigationItems.map((item, i) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-base ${
                          isActive(item.href)
                            ? "bg-[#334eac] text-white shadow-md"
                            : "text-[#334eac] hover:bg-[#e7f1ff] hover:text-[#081f5c]"
                        }`}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="mt-8 space-y-3">
                    {/* Wishlist - Mobile */}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#f9fcff] border border-[#d0e3ff]"
                    >
                      <div className="flex items-center gap-3">
                        <Heart className="h-5 w-5 text-[#334eac]" />
                        <span className="font-medium text-[#334eac]">Wishlist</span>
                      </div>
                      {wishlist.length > 0 && (
                        <span className="rounded-full bg-[#334eac] text-white px-2 py-1 text-sm font-medium">
                          {wishlist.length}
                        </span>
                      )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#e7f1ff] to-[#d0e3ff]"
                    >
                      <div className="text-sm text-[#334eac] font-medium mb-1">Visit Us Today!</div>
                      <div className="text-xs text-[#7096d1]">
                        📍 123 Coffee Street<br/>
                        ☎️ (555) 123-PURR<br/>
                        🕐 Daily 7AM - 9PM
                      </div>
                    </motion.div>
                  </div>
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;