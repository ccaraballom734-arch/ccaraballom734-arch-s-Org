import { useEffect, useRef } from 'react';
import { X, Sparkles, AlertCircle, ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      // Body scroll lock
      document.body.style.overflow = 'hidden';

      // GSAP Animations on Open
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );

      gsap.fromTo(contentRef.current,
        { y: 50, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.2)', delay: 0.1 }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const handleCloseAnimation = () => {
    gsap.to(contentRef.current, {
      y: 30,
      scale: 0.95,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: onClose
    });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in'
    });
  };

  return (
    <div
      id="project-modal"
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-slate-900/60 backdrop-blur-sm"
    >
      {/* Background click listener */}
      <div className="absolute inset-0 cursor-pointer" onClick={handleCloseAnimation} />

      {/* Main Glassmorphism Panel Container */}
      <div
        ref={contentRef}
        className="glass-panel-heavy rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 border border-white"
      >
        {/* Close Button Button */}
        <button
          onClick={handleCloseAnimation}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full col-span-12 bg-white/80 hover:bg-white text-slate-700 hover:text-red-500 shadow-md border border-slate-200 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Image & Main Info (Top / Left) */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-md border border-slate-200/50 bg-slate-900">
              {project.demoUrl && project.demoUrl.startsWith('http') ? (
                <iframe
                  src={project.demoUrl}
                  title={project.title}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                {project.category}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                project.difficulty === 'Principiante' ? 'bg-green-100 text-green-800' :
                project.difficulty === 'Intermedio' ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                Dificultad: {project.difficulty}
              </span>
            </div>

            <div className="bg-blue-50/50 border border-blue-100/50 p-4 rounded-2xl">
              <h4 className="font-display font-bold text-blue-800 text-sm flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4" />
                Impacto Cuantitativo
              </h4>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                {project.impact}
              </p>
            </div>
            
            {/* Action buttons inside detail */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                {project.demoUrl && project.demoUrl.startsWith('http') ? 'Ejecutar Sitio en Vivo' : 'Demo En Vivo'}
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm border border-slate-200 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                Código
              </a>
            </div>
          </div>

          {/* Details & Specs (Right Column) */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-slate-500 block mb-1">Proyecto del Diplomado</span>
              <h3 className="font-display font-extrabold text-slate-900 text-2xl tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2">Descripción General</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2.5">Características Clave</h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-slate-500 mb-2">Tecnologías Clave</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs text-blue-700 bg-blue-50/70 border border-blue-100/50 px-2.5 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
