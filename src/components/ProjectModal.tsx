import { useEffect, useRef, useState } from 'react';
import { X, Sparkles, AlertCircle, ArrowUpRight, Github, ExternalLink, Workflow, Image as ImageIcon, Monitor, ZoomIn } from 'lucide-react';
import { gsap } from 'gsap';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    setShowLivePreview(project?.demoUrl && project.demoUrl !== '#' ? true : false);
    setSelectedImage(null);
    setLightboxImage(null);
  }, [project]);

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

  const currentMainImage = selectedImage || project.imageUrl;

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
        className="glass-panel-heavy rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 border border-zinc-700/80 bg-zinc-900/95 text-zinc-100"
      >
        {/* Close Button Button */}
        <button
          onClick={handleCloseAnimation}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full col-span-12 bg-zinc-800/90 hover:bg-zinc-700 text-zinc-200 hover:text-red-400 shadow-lg border border-zinc-700 transition-colors z-20 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          {/* Image & Main Info (Top / Left) */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-video shadow-md border border-zinc-800 bg-zinc-950 group">
              {showLivePreview && project.demoUrl && project.demoUrl !== '#' ? (
                <iframe
                  src={project.demoUrl}
                  title={project.title}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              ) : (
                <div className="relative w-full h-full cursor-pointer" onClick={() => setLightboxImage(currentMainImage)}>
                  <img
                    src={currentMainImage}
                    alt={project.title}
                    className={`w-full h-full ${currentMainImage.endsWith('.svg') ? 'object-contain p-2 bg-zinc-950' : 'object-cover'} transition-all duration-300`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-xs">
                    <ZoomIn className="w-5 h-5" /> Ampliar Imagen
                  </div>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm">
                {project.category}
              </div>

              {project.demoUrl && project.demoUrl !== '#' && (
                <div className="absolute bottom-3 right-3 flex gap-1 bg-zinc-900/90 backdrop-blur-sm p-1 rounded-lg border border-zinc-700/80">
                  <button
                    onClick={() => setShowLivePreview(false)}
                    className={`px-2 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-colors ${
                      !showLivePreview ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    Imagen
                  </button>
                  <button
                    onClick={() => setShowLivePreview(true)}
                    className={`px-2 py-1 text-[11px] font-bold rounded flex items-center gap-1 transition-colors ${
                      showLivePreview ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    Vista Previa
                  </button>
                </div>
              )}
            </div>

            {/* Thumbnail selector if processImages exist */}
            {project.processImages && project.processImages.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-bold block">
                  Galería de Capturas e Ilustraciones del Proceso:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => { setSelectedImage(project.imageUrl); setShowLivePreview(false); }}
                    className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                      currentMainImage === project.imageUrl ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105' : 'border-zinc-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={project.imageUrl} alt="Principal" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-zinc-950/90 text-[9px] text-zinc-200 text-center py-0.5 truncate px-1">
                      Portada
                    </span>
                  </button>
                  {project.processImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setSelectedImage(img); setShowLivePreview(false); }}
                      className={`relative rounded-xl overflow-hidden aspect-video border-2 transition-all ${
                        currentMainImage === img ? 'border-blue-500 ring-2 ring-blue-500/50 scale-105' : 'border-zinc-800 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Proceso ${idx + 1}`} className="w-full h-full object-contain bg-zinc-950 p-1" />
                      <span className="absolute bottom-0 inset-x-0 bg-zinc-950/90 text-[9px] text-zinc-200 text-center py-0.5 truncate px-1 font-bold">
                        {idx === 0 ? 'Sincronía' : idx === 1 ? 'Algoritmo' : `Proceso ${idx + 1}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                project.difficulty === 'Principiante' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/60' :
                project.difficulty === 'Intermedio' ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60' :
                'bg-rose-950/80 text-rose-300 border border-rose-800/60'
              }`}>
                Dificultad: {project.difficulty}
              </span>
            </div>

            <div className="bg-blue-950/40 border border-blue-800/50 p-4 rounded-2xl">
              <h4 className="font-display font-bold text-blue-300 text-sm flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4 text-blue-400" />
                Impacto Cuantitativo
              </h4>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                {project.impact}
              </p>
            </div>
            
            {/* Action buttons inside detail */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, rotate: 1, duration: 0.25, ease: 'back.out(1.7)' });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.25, ease: 'power2.out' });
                }}
                className="gsap-btn flex-1 py-3 text-center font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-4 h-4" />
                {project.demoUrl && project.demoUrl !== '#' ? 'Ejecutar Sitio en Vivo' : 'Demo En Vivo'}
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { scale: 1.05, duration: 0.25, ease: 'back.out(1.7)' });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'power2.out' });
                }}
                className="gsap-btn-outline py-3 px-4 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Github className="w-4 h-4" />
                Código
              </a>
            </div>
          </div>

          {/* Details & Specs (Right Column) */}
          <div className="md:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-zinc-400 block mb-1">Proyecto del Diplomado</span>
              <h3 className="font-display font-extrabold text-white text-2xl tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-2">Descripción General</h4>
              <p className="text-zinc-300 text-sm leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* Proceso de Desarrollo con Imágenes Adjuntas */}
            {(project.category === 'Despliegues' || project.developmentProcess) && (
              <div className="bg-blue-950/30 border border-blue-800/60 p-4 rounded-2xl space-y-3 shadow-xs">
                <h4 className="text-xs uppercase font-mono tracking-widest text-blue-300 font-bold flex items-center gap-1.5">
                  <Workflow className="w-4 h-4 text-blue-400" />
                  Proceso de Desarrollo del Proyecto
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {project.developmentProcess || '[Espacio reservado para la explicación manual del proceso de desarrollo]'}
                </p>

                {/* Grid interactivo de imágenes del proceso dentro de la caja de detalles */}
                {project.processImages && project.processImages.length > 0 && (
                  <div className="pt-2 border-t border-blue-800/40 space-y-2">
                    <span className="text-[11px] font-bold text-blue-300 uppercase font-mono block">
                      Ilustraciones y Cómic del Proceso:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {project.processImages.map((imgUrl, i) => (
                        <div
                          key={i}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="group relative rounded-xl overflow-hidden border border-blue-800/60 bg-zinc-950 aspect-video cursor-pointer hover:shadow-lg transition-all hover:border-blue-400"
                        >
                          <img
                            src={imgUrl}
                            alt={`Imagen del proceso ${i + 1}`}
                            className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1">
                            <ZoomIn className="w-4 h-4" /> Ampliar
                          </div>
                          <div className="absolute bottom-1 left-1 right-1 bg-zinc-950/90 text-[10px] text-zinc-200 px-2 py-0.5 rounded text-center truncate font-semibold">
                            {i === 0 ? 'Proyecto Sincronía (Portada)' : i === 1 ? 'El Algoritmo Encontrado (Cómic)' : `Ilustración ${i + 1}`}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-2.5">Características Clave</h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-300 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-md bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 mb-2">Tecnologías Clave</h4>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="font-mono text-xs text-blue-300 bg-blue-950/80 border border-blue-800/50 px-2.5 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay for Fullscreen Image View */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-5xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage}
              alt="Ampliada"
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl border border-white/20 bg-slate-950"
            />
            <p className="text-white/80 text-xs sm:text-sm mt-3 text-center font-mono">
              Haz clic en cualquier lugar fuera de la imagen o presiona la X para cerrar
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

