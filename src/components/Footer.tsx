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
        color: '#2563eb', // Active blue
        borderColor: 'rgba(37, 99, 235, 0.3)',
        backgroundColor: 'rgba(37, 99, 235, 0.05)',
        duration: 0.2
      });
    } else {
      gsap.to(icon, {
        y: 0,
        scale: 1,
        color: '#475569', // Slate-600
        borderColor: 'rgba(226, 232, 240, 0.8)',
        backgroundColor: 'transparent',
        duration: 0.2
      });
    }
  };

  return (
    <footer ref={footerRef} id="contacto" className="bg-slate-50 border-t border-slate-200/50 pt-20 pb-12 scroll-mt-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-radial from-blue-100/20 to-transparent -z-10 pointer-events-none rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start footer-animate">
          {/* Info Column (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                <Sparkles className="w-3 h-3" />
                ¿Trabajamos Juntos?
              </span>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl tracking-tight">
                Impulsemos el futuro <span className="text-blue-600">con Inteligencia Artificial</span>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-md">
                Si buscas integrar agentes conversacionales, modelos multimodales de generación o construir experiencias web modernas y reactivas de alto impacto, ¡hablemos!
              </p>
            </div>

            {/* Direct contact info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-semibold">Correo Electrónico</p>
                  <a href={`mailto:${CAMILO_INFO.email}`} className="text-sm font-medium hover:text-blue-600 transition-colors">
                    {CAMILO_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-mono text-slate-400 font-semibold">Ubicación</p>
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
                className="w-10 h-10 rounded-xl border border-slate-200/80 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={CAMILO_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={(e) => handleHoverSocial(e, 'enter')}
                onMouseLeave={(e) => handleHoverSocial(e, 'leave')}
                className="w-10 h-10 rounded-xl border border-slate-200/80 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Interactive Card Column (Right 7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white">
              <h3 className="font-display font-bold text-slate-800 text-lg mb-6 flex items-center gap-2">
                <Send className="w-4.5 h-4.5 text-blue-600" />
                Enviar Mensaje Directo
              </h3>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50/80 border border-green-200 text-green-800 rounded-2xl flex items-start gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">¡Mensaje registrado con éxito!</h4>
                    <p className="text-xs text-green-700 mt-1">Camilo recibirá tu mensaje en el almacenamiento consolidado de este portafolio.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="form-name" className="text-xs font-semibold text-slate-600">Nombre Completo</label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/60 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form-email" className="text-xs font-semibold text-slate-600">Correo Electrónico</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@correo.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200/60 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-message" className="text-xs font-semibold text-slate-600">Mensaje / Consulta</label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe tu idea, propuesta o consulta técnica..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200/60 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer"
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
                <div className="mt-8 pt-6 border-t border-slate-200/60">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-slate-400 font-semibold mb-3">
                    Historial de Mensajes Locales ({savedMessages.length})
                  </h4>
                  <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                    {savedMessages.map((msg) => (
                      <div key={msg.id} className="p-3 bg-white/60 border border-slate-100 rounded-xl text-xs space-y-1">
                        <div className="flex items-center justify-between text-slate-700">
                          <span className="font-semibold">{msg.name}</span>
                          <span className="text-slate-400 text-[10px]">{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-500 italic">"{msg.message}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Closing layout base bar */}
        <div className="border-t border-slate-200/40 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-xs text-slate-500">
            © 2026 {CAMILO_INFO.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            Diseñado con <Heart className="w-3 h-3 text-red-500 animate-pulse fill-red-500" /> para el Diplomado de IA Generativa.
          </p>
        </div>
      </div>
    </footer>
  );
}
