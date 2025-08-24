"use client";
import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Menu from "./Menu";
import Cats from "./Cats";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import CartDrawer from "./CartDrawer";
import Footer from "./Footer";
import FloatingCats from "./FloatingCats";
import { Toaster } from "react-hot-toast";

// Create stable QueryClient instance
const qc = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimize initial load performance
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Prevent scroll when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  // Loading state for better UX
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f9fcff]">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">☕</div>
          <p className="text-[#334eac] font-medium">Loading Purrfect Brew...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={qc}>
      <div className="font-sans antialiased bg-[#f9fcff]">
        {/* Toast notifications with custom styling */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#334eac',
              color: '#fff',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            success: {
              style: {
                background: '#7096d1',
              },
            },
            error: {
              style: {
                background: '#dc2626',
              },
            },
          }}
        />
        
        {/* Reduced floating elements for performance */}
        <FloatingCats />
        
        {/* Sticky navigation */}
        <Navbar onOpenCart={() => setCartOpen(true)} />
        
        {/* Main content sections */}
        <main>
          <Hero />
          <About />
          <Menu />
          <Cats />
          <Testimonials />
          <Newsletter />
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Cart drawer */}
        <CartDrawer 
          open={cartOpen} 
          onClose={() => setCartOpen(false)} 
        />
      </div>
    </QueryClientProvider>
  );
};

export default App;