import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Eye, ArrowUpRight, Grid } from 'lucide-react';
import { gsap } from 'gsap';
import { Project } from '../types';
import { PROJECTS } from '../data';
import ProjectModal from './ProjectModal';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = ['Todos', 'Despliegues', 'Diseño y Prototipado', 'Automatización'];

  // Filter projects
  const filteredProjects = selectedCategory === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  // Trigger grid item entries on category swap
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card-container',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  const handleHoverCard = (e: React.MouseEvent<HTMLDivElement>, action: 'enter' | 'leave') => {
    const card = e.currentTarget;
    const img = card.querySelector('.project-img');
    const badge = card.querySelector('.project-badge');

    if (action === 'enter') {
      gsap.to(card, {
        y: -8,
        borderColor: 'rgba(37, 99, 235, 0.3)',
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.06)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(img, {
        scale: 1.08,
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(badge, {
        scale: 1.05,
        backgroundColor: '#2563eb', // bright blue
        color: '#ffffff',
        duration: 0.3,
        ease: 'power2.out'
      });
    } else {
      gsap.to(card, {
        y: 0,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(img, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
      gsap.to(badge, {
        scale: 1,
        backgroundColor: 'rgba(37, 99, 235, 0.08)',
        color: '#1d4ed8',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <section id="proyectos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-radial from-blue-100/30 to-transparent -z-10 pointer-events-none rounded-full blur-3xl" />

      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-slate-500 font-semibold mb-2 block flex items-center gap-1.5 justify-center md:justify-start">
            <Grid className="w-3.5 h-3.5 text-blue-600" />
            Galería Interactiva
          </span>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight text-center md:text-left">
            Portafolio de <span className="text-blue-600">Productos & Proyectos</span>
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl text-center md:text-left">
            Explora los trabajos prácticos desarrollados utilizando modelos multimodales, agentes autónomos y bases de datos vectoriales.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-end items-center">
          {categories.map((cat, idx) => (
            <button
              id={`category-filter-${idx}`}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10'
                  : 'bg-white/60 hover:bg-white text-slate-700 hover:text-blue-600 border-slate-200/60 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Items Grid */}
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            id={`project-card-${project.id}`}
            key={project.id}
            onMouseEnter={(e) => handleHoverCard(e, 'enter')}
            onMouseLeave={(e) => handleHoverCard(e, 'leave')}
            className="project-card-container group glass-card rounded-3xl overflow-hidden flex flex-col h-full border border-white"
          >
            {/* Project Cover Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 border-b border-slate-100">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="project-img w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="project-badge absolute top-4 left-4 text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full bg-blue-50/95 text-blue-700 border border-blue-100/50 transition-colors shadow-sm">
                {project.category}
              </span>
              <span className="absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-wider text-slate-800 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded">
                {project.difficulty}
              </span>
            </div>

            {/* Project Summary info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="font-display font-bold text-slate-900 group-hover:text-blue-600 text-lg leading-snug tracking-tight transition-colors duration-200 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {project.shortDescription}
                </p>
              </div>

              <div className="space-y-4">
                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                      +{project.technologies.length - 4} mas
                    </span>
                  )}
                </div>

                {/* Detail action trigger button */}
                <button
                  onClick={() => {
                    if (project.demoUrl && project.demoUrl !== '#') {
                      window.open(project.demoUrl, '_blank');
                    }
                    setActiveProject(project);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-left bg-blue-50/70 hover:bg-blue-600 hover:text-white text-blue-700 font-semibold text-xs sm:text-sm flex items-center justify-between transition-all group/btn cursor-pointer border border-blue-100/50"
                >
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    Ver Detalle Ampliado
                  </span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details expansion modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
