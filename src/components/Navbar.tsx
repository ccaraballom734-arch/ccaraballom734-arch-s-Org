import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, Code } from 'lucide-react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for header background adjustment
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Entry Animation
  useEffect(() => {
    // Initial entrance for header
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );
  }, []);

  const handleHoverLink = (e: React.MouseEvent<HTMLAnchorElement>, action: 'enter' | 'leave') => {
    const target = e.currentTarget;
    if (action === 'enter') {
      gsap.to(target, {
        scale: 1.05,
        color: '#60a5fa', // bright blue-400
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(target, {
        scale: 1,
        color: '#cbd5e1', // slate-300
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  const handleScrollToSegment = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav
      id="main-nav"
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-black/80 backdrop-blur-md border-b border-zinc-800/80 shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Student presentation */}
          <div 
            onClick={() => handleScrollToSegment('presentacion')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                Camilo Caraballo
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/50 rounded-md tracking-wider">
                  Diplomado IA
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div ref={linksRef} className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleScrollToSegment('presentacion')}
              className="font-medium text-sm text-zinc-300 hover:text-blue-400 cursor-pointer transition-colors"
            >
              Presentación
            </button>
            <button
              onClick={() => handleScrollToSegment('expectativas')}
              className="font-medium text-sm text-zinc-300 hover:text-blue-400 cursor-pointer transition-colors"
            >
              Expectativas
            </button>
            <button
              onClick={() => handleScrollToSegment('proyectos')}
              className="font-medium text-sm text-zinc-300 hover:text-blue-400 cursor-pointer transition-colors"
            >
              Portafolio Proyectos
            </button>
            <button
              onClick={() => handleScrollToSegment('herramientas')}
              className="font-medium text-sm text-zinc-300 hover:text-blue-400 cursor-pointer transition-colors"
            >
              Herramientas
            </button>

            <button
              onClick={() => handleScrollToSegment('contacto')}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, { scale: 1.08, rotate: 1, duration: 0.25, ease: 'back.out(1.7)' });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.25, ease: 'power2.out' });
              }}
              className="gsap-btn px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl cursor-pointer shadow-md"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg text-zinc-300 hover:text-blue-400 hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel-heavy border-t border-zinc-800 mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl bg-zinc-900/95 animate-fade-in">
          <div className="px-2 pt-3 pb-4 space-y-1 sm:px-3">
            <button
              onClick={() => handleScrollToSegment('presentacion')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-zinc-200 hover:text-blue-400 hover:bg-zinc-800/60 transition-all"
            >
              Presentación
            </button>
            <button
              onClick={() => handleScrollToSegment('expectativas')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-zinc-200 hover:text-blue-400 hover:bg-zinc-800/60 transition-all"
            >
              Expectativas
            </button>
            <button
              onClick={() => handleScrollToSegment('proyectos')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-zinc-200 hover:text-blue-400 hover:bg-zinc-800/60 transition-all"
            >
              Portafolio Proyectos
            </button>
            <button
              onClick={() => handleScrollToSegment('herramientas')}
              className="block w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-zinc-200 hover:text-blue-400 hover:bg-zinc-800/60 transition-all"
            >
              Herramientas
            </button>
            <div className="pt-2 px-3">
              <button
                onClick={() => handleScrollToSegment('contacto')}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md cursor-pointer block"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
