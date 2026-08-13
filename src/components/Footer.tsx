import React, { useState, useEffect, useRef } from 'react';
import { Send, Github, Linkedin, Mail, MessageSquare, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { CAMILO_INFO } from '../data';

export default function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedMessages, setSavedMessages] = useState<any[]>([]);
  const footerRef = useRef<HTMLElement>(null);

  // Load saved contacts to test interactivity if they wish
  useEffect(() => {
    try {
      const stored = localStorage.getItem('camilo_portfolio_messages');
      if (stored) setSavedMessages(JSON.parse(stored));
    } catch (e) {
      console.warn('Could not read localStorage', e);
    }
  }, []);

  useEffect(() => {
    // Scroll Entrance Animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-animate',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);

    // Simulate network lag
    setTimeout(() => {
      const newMessage = {
        ...formData,
        id: Date.now().toString(),
        timestamp: new Date().toLocaleDateString()
      };
      
      const updated = [...savedMessages, newMessage];
      setSavedMessages(updated);
      try {
        localStorage.setItem('camilo_portfolio_messages', JSON.stringify(updated));
      } catch (err) {
        console.error(err);
      }

      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // Reset success banner after 4s
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handleHoverSocial = (e: React.MouseEvent<HTMLAnchorElement>, action: 'enter' | 'leave') => {
    const icon = e.currentTarget;
    if (action === 'enter') {
      gsap.to(icon, {
        y: -4,
        scale: 1.1,
        color: '#60a5fa', // Active blue
        borderColor: 'rgba(59, 130, 246, 0.5)',
        backgroundColor: 'rgba(37, 99, 235, 0.15)',
        duration: 0.2
      });
    } else {
      gsap.to(icon, {
        y: 0,
        scale: 1,
        color: '#a1a1aa', // Zinc-400
        borderColor: 'rgba(39, 39, 42, 0.8)',
        backgroundColor: 'transparent',
        duration: 0.2
      });
    }
  };

  return (
    <footer ref={footerRef} id="contacto" className="bg-black border-t border-zinc-800/80 pt-20 pb-12 scroll-mt-24 relative overflow-hidden text-zinc-300">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-radial from-blue-600/15 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start footer-animate">
          {/* Info Column (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/50">
                <Sparkles className="w-3 h-3 text-blue-400" />
                ¿Trabajamos Juntos?
              </span>
              <h2 className="font-display font-extrabold text-white text-3xl tracking-tight">
                Impulsemos el futuro <span className="text-blue-400">con Inteligencia Artificial</span>
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                Si buscas integrar agentes conversacionales, modelos multimodales de generación o construir experiencias web modernas y reactivas de alto impacto, ¡hablemos!
              </p>
            </div>

            {/* Direct contact info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">Correo Electrónico</p>
                  <a href={`mailto:${CAMILO_INFO.email}`} className="text-sm font-medium hover:text-blue-400 transition-colors">
                    {CAMILO_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-zinc-300">
                <div className="w-9 h-9 rounded-lg bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-mono text-zinc-500 font-semibold">Ubicación</p>
                  <p className="text-sm font-medium">{CAMILO_INFO.location}</p>
                </div>
              </div>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-3">
              <a
                href={CAMILO_INFO.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={(e) => handleHoverSocial(e, 'enter')}
                onMouseLeave={(e) => handleHoverSocial(e, 'leave')}
                className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-400 transition-all cursor-pointer bg-zinc-900/50"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={CAMILO_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={(e) => handleHoverSocial(e, 'enter')}
                onMouseLeave={(e) => handleHoverSocial(e, 'leave')}
                className="w-10 h-10 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-400 transition-all cursor-pointer bg-zinc-900/50"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Interactive Card Column (Right 7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-zinc-800 bg-zinc-900/70">
              <h3 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2">
                <Send className="w-4.5 h-4.5 text-blue-400" />
                Enviar Mensaje Directo
              </h3>

              {submitted && (
                <div className="mb-6 p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-2xl flex items-start gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">¡Mensaje registrado con éxito!</h4>
                    <p className="text-xs text-emerald-400/90 mt-1">Camilo recibirá tu mensaje en el almacenamiento consolidado de este portafolio.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-semibold text-zinc-300">Nombre Completo</label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/80 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm text-white placeholder-zinc-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-semibold text-zinc-300">Correo Electrónico</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/80 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm text-white placeholder-zinc-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="text-xs font-semibold text-zinc-300">Mensaje / Consulta</label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe tu idea, propuesta o consulta técnica..."
                    className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-950/80 focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 text-sm text-white placeholder-zinc-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  onMouseEnter={(e) => {
                    if (!submitting) {
                      gsap.to(e.currentTarget, { scale: 1.03, rotate: 0.5, duration: 0.25, ease: 'back.out(1.7)' });
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!submitting) {
                      gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.25, ease: 'power2.out' });
                    }
                  }}
                  className="gsap-btn w-full py-3.5 px-4 font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? 'Enviando...' : (
                    <>
                      Enviar Formulario
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Stored contacts reader option for dynamic demonstration */}
              {savedMessages.length > 0 && (
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-zinc-400 font-semibold mb-3">
                    Historial de Mensajes Locales ({savedMessages.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                    {savedMessages.map((msg) => (
                      <div key={msg.id} className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between text-zinc-300">
                          <span className="font-semibold">{msg.name}</span>
                          <span className="text-zinc-500 text-[10px]">{msg.timestamp}</span>
                        </div>
                        <p className="text-zinc-400 italic">"{msg.message}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Closing layout base bar */}
        <div className="border-t border-zinc-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-zinc-500">
            © 2026 {CAMILO_INFO.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            Diseñado con <Heart className="w-3 h-3 text-red-500 animate-pulse fill-red-500" /> para el Diplomado de IA Generativa.
          </p>
        </div>
      </div>
    </footer>
  );
}
