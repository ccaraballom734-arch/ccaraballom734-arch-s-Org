import React, { useEffect, useRef } from 'react';
import { Sparkles, Database, Code, Palette, Terminal, Network, Binary, Wrench } from 'lucide-react';
import { gsap } from 'gsap';
import { TOOLS_LEARNED } from '../data';
import { ToolLearned } from '../types';

export default function ToolsList() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger animation on cards scroll trigger
    const ctx = gsap.context(() => {
      gsap.fromTo('.tool-card',
        { opacity: 0, y: 30, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-blue-400" />;
      case 'Workflow': return <Network className="w-5 h-5 text-blue-400" />;
      case 'Database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'Code': return <Code className="w-5 h-5 text-blue-400" />;
      case 'Palette': return <Palette className="w-5 h-5 text-blue-400" />;
      case 'Terminal': return <Terminal className="w-5 h-5 text-blue-400" />;
      default: return <Wrench className="w-5 h-5 text-blue-400" />;
    }
  };

  const handleHoverTool = (e: React.MouseEvent<HTMLDivElement>, action: 'enter' | 'leave') => {
    const card = e.currentTarget;
    const progressFill = card.querySelector('.progress-fill');
    
    if (action === 'enter') {
      gsap.to(card, {
        scale: 1.03,
        borderColor: 'rgba(59, 130, 246, 0.4)',
        backgroundColor: 'rgba(39, 39, 42, 0.85)',
        duration: 0.2,
        ease: 'power2.out'
      });
      if (progressFill) {
        gsap.to(progressFill, {
          backgroundColor: '#60a5fa', // make fill brighter blue
          duration: 0.2
        });
      }
    } else {
      gsap.to(card, {
        scale: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        backgroundColor: 'rgba(24, 24, 27, 0.65)',
        duration: 0.2,
        ease: 'power2.out'
      });
      if (progressFill) {
        gsap.to(progressFill, {
          backgroundColor: '#3b82f6', // back to standard blue-500
          duration: 0.2
        });
      }
    }
  };

  return (
    <section ref={containerRef} id="herramientas" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
      {/* Decorative background glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-radial from-blue-600/15 to-transparent -z-10 pointer-events-none rounded-full blur-3xl" />

      {/* Title Panel */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-semibold mb-2 block flex items-center justify-center gap-1.5">
          <Binary className="w-3.5 h-3.5 text-blue-400" />
          Conocimiento Técnico
        </span>
        <h2 className="font-display font-extrabold text-white text-3xl sm:text-4xl tracking-tight">
          Herramientas que he aprendido <span className="text-blue-400">en el Diplomado</span>
        </h2>
        <p className="mt-4 text-zinc-400">
          Un desglose interactivo del stack tecnológico y metodologías de inteligencia artificial cubiertas a lo largo del programa formativo.
        </p>
      </div>

      {/* Grid structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOOLS_LEARNED.map((tool, idx) => (
          <div
            id={`tool-card-${idx}`}
            key={idx}
            onMouseEnter={(e) => handleHoverTool(e, 'enter')}
            onMouseLeave={(e) => handleHoverTool(e, 'leave')}
            className="tool-card glass-card p-6 rounded-2xl flex flex-col justify-between border border-zinc-800/80 hover:cursor-pointer"
          >
            <div className="space-y-4">
              {/* Header inside card */}
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-blue-950/80 border border-blue-800/50 flex items-center justify-center">
                  {getToolIcon(tool.icon)}
                </div>
                <span className="text-[10px] font-semibold text-zinc-300 uppercase tracking-wider bg-zinc-800 border border-zinc-700/50 px-2.5 py-0.5 rounded-full">
                  {tool.category}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="space-y-1">
                <h3 className="font-display font-bold text-white text-base leading-tight">
                  {tool.name}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Proficiency metric slider */}
            <div className="pt-5 border-t border-zinc-800 mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-zinc-400">
                <span>Nivel de Dominio</span>
                <span className="font-mono text-blue-400 font-bold">{tool.proficiency}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="progress-fill h-full bg-blue-500 rounded-full transition-all duration-1000"
                  style={{ width: `${tool.proficiency}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
