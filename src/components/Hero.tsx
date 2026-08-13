import React, { useEffect, useRef } from 'react';
import { Cpu, Database, Network, Sparkles, BrainCircuit, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { gsap } from 'gsap';
import { CAMILO_INFO, EXPECTATIONS } from '../data';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const expectationHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Entrance GSAP Animation
    const ctx = gsap.context(() => {
      // Intro fade in up
      gsap.fromTo(badgeRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)', delay: 0.4 }
      );

      gsap.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
      );

      gsap.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo(bioRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.7 }
      );

      // Expectations Header animation
      gsap.fromTo(expectationHeaderRef.current,
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          scrollTrigger: {
            trigger: expectationHeaderRef.current,
            start: 'top 80%',
          }
        }
      );

      // Expectations physical cards stagger animation
      gsap.fromTo('.expectation-card',
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          delay: 0.8
        }
      );

      // Image or visual graphic avatar floating effect
      gsap.to('.ai-avatar', {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-blue-400" />;
      case 'Database': return <Database className="w-6 h-6 text-blue-400" />;
      case 'Workflow': return <Network className="w-6 h-6 text-blue-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-blue-400" />;
      default: return <BrainCircuit className="w-6 h-6 text-blue-400" />;
    }
  };

  // Button hover animations using GSAP
  const handleButtonHover = (e: React.MouseEvent<HTMLElement>, action: 'enter' | 'leave') => {
    const target = e.currentTarget;
    if (action === 'enter') {
      gsap.to(target, { 
        scale: 1.06, 
        rotate: 1, 
        boxShadow: '0 10px 28px rgba(37, 99, 235, 0.45)', 
        duration: 0.3, 
        ease: 'back.out(1.7)' 
      });
    } else {
      gsap.to(target, { 
        scale: 1, 
        rotate: 0, 
        boxShadow: '0 4px 18px rgba(37, 99, 235, 0.25)', 
        duration: 0.3, 
        ease: 'power2.out' 
      });
    }
  };

  const handleScrollToProjects = () => {
    const target = document.getElementById('proyectos');
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div ref={containerRef} className="pt-24 pb-16 scroll-mt-24">
      {/* BACKGROUND DECORATIVE GLOW ELEMENT */}
      <div className="absolute top-0 right-0 w-full max-w-3xl h-[600px] bg-radial from-blue-600/20 via-indigo-900/10 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-70" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-radial from-indigo-600/20 via-zinc-900/10 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-50" />

      {/* Section 1: Presentación */}
      <section id="presentacion" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text panel left side (8/12 grid for rich hierarchy) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span 
                ref={badgeRef}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-blue-300 bg-blue-950/80 border border-blue-800/50 rounded-full"
              >
                <BrainCircuit className="w-4 h-4 animate-pulse text-blue-400" />
                Estudiante de Desarrollo Web Moderno
              </span>
            </div>

            <h1 
              ref={titleRef}
              className="font-display font-extrabold text-white tracking-tight text-4xl sm:text-5xl lg:text-6xl"
            >
              Potenciando la Web con <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-300">Inteligencia Artificial</span>
            </h1>

            <p 
              ref={subtitleRef}
              className="font-display font-semibold text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-2xl"
            >
              Hola, soy <span className="text-blue-400 underline decoration-blue-500/80 decoration-3 underline-offset-4">{CAMILO_INFO.name}</span>. 
              Estoy cursando el Diplomado de Inteligencia Artificial Generativa.
            </p>

            {/* Content panel with premium Glassmorphism */}
            <div 
              id="bio-card"
              ref={bioRef}
              className="glass-panel p-6 sm:p-8 rounded-3xl"
            >
              <h3 className="font-display font-bold text-white text-lg mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Mi Enfoque de Estudio
              </h3>
              <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                {CAMILO_INFO.bio}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={handleScrollToProjects}
                  onMouseEnter={(e) => handleButtonHover(e, 'enter')}
                  onMouseLeave={(e) => handleButtonHover(e, 'leave')}
                  className="gsap-btn px-6 py-3.5 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  Explorar Proyectos
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#contacto"
                  onMouseEnter={(e) => handleButtonHover(e, 'enter')}
                  onMouseLeave={(e) => handleButtonHover(e, 'leave')}
                  className="gsap-btn-outline px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
                >
                  Contáctame
                </a>
              </div>
            </div>
          </div>

          {/* Interactive visual graphic on the right (5/12 grid) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-square rounded-full flex items-center justify-center p-4">
              {/* Spinning circular orbit graphic */}
              <div className="absolute inset-0 rounded-full border border-dashed border-blue-500/30 animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-4 rounded-full border border-dashed border-indigo-500/20 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
              
              {/* Inner glowing core avatar card */}
              <div className="ai-avatar w-full h-full rounded-2xl glass-panel-heavy p-8 flex flex-col justify-between relative shadow-2xl border border-zinc-700/80">
                {/* Visual particles decor */}
                <div className="absolute top-4 right-4 text-blue-400/60"><Sparkles className="w-8 h-8" /></div>
                
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
                    <Layers className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-white text-xl">Diplomado IA</h4>
                    <p className="text-xs font-mono text-blue-300 bg-blue-950/80 border border-blue-800/50 inline-block px-2 py-0.5 rounded-md">
                      Materia: IA Generativa
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-zinc-800">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Estudiante</span>
                    <span className="font-semibold text-zinc-200">Camilo Caraballo</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Especialidad</span>
                    <span className="font-semibold text-zinc-200">Sistemas Cognitivos</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Año</span>
                    <span className="font-mono text-zinc-200 font-semibold">2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Expectativas */}
      <section id="expectativas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div ref={expectationHeaderRef} className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
            Mis <span className="text-blue-400">Expectativas del Diplomado</span>
          </h2>
          <p className="mt-4 text-zinc-400">
            Aprender a integrar herramientas de Inteligencia Artificial avanzadas para transformar ideas disruptivas en productos reales y funcionales.
          </p>
        </div>

        {/* Dynamic, interactive grid of expectations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPECTATIONS.map((exp, index) => (
            <div
              id={`expectation-${index}`}
              key={index}
              className="expectation-card glass-card p-6 rounded-2xl flex flex-col justify-between hover:scale-[1.03] duration-300"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
                  {getIconComponent(exp.icon)}
                </div>
                <h3 className="font-display font-bold text-white text-lg leading-tight">
                  {exp.title}
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {exp.description}
                </p>
              </div>
              
              <div className="pt-4 border-t border-zinc-800/80 mt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-950/80 border border-blue-800/50 px-2.5 py-1 rounded">
                  Expectativa {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
