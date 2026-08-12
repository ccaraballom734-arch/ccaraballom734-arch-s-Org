import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import ToolsList from './components/ToolsList';
import Footer from './components/Footer';

// Register GSAP plugins globally once
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Global reveal animation or custom settings
    gsap.fromTo('body',
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-blue-600/10 selection:text-blue-600 antialiased overflow-x-hidden">
      {/* Dynamic Ambient Background Sparkles */}
      <div className="fixed inset-0 -z-50 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-sky-100/20 blur-3xl" />
      </div>

      {/* Global Navigation Header Bar */}
      <Navbar />

      {/* Main Container Sections */}
      <main className="relative">
        {/* Section 1: Presentación & Section 2: Expectativas */}
        <Hero />

        {/* Section 3: Portafolio de productos / galería interactiva */}
        <Gallery />

        {/* Section 4: Herramientas Aprendidas */}
        <ToolsList />
      </main>

      {/* Standard Interactive Footer */}
      <Footer />
    </div>
  );
}
