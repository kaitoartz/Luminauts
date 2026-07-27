import React from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, Play, CreditCard, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import Button from '../ui/Button';
import ShineButton from '../ui/ShineButton';
import { BlurReveal } from '../ui/blur-reveal';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';
import lowPolyEarthGLB from '../../assets/low_poly_earth.glb';
import { getEmailSuggestion } from '../../utils/emailValidator';

export default function WaitlistHeroSection({
  modelViewerRef,
  subscriberCount,
  isSplashActive,
  status,
  handleSubmit,
  email,
  setEmail,
  loading,
  setShowPassport,
  setShowDemoModal
}) {
  const [isModelLoaded, setIsModelLoaded] = React.useState(() => {
    return typeof window !== 'undefined' && !!window.customElements?.get('model-viewer');
  });

  React.useEffect(() => {
    if (isModelLoaded) return;

    const loadScript = () => {
      if (document.querySelector('script[src*="model-viewer"]')) {
        setIsModelLoaded(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
      script.type = 'module';
      script.async = true;
      script.onload = () => setIsModelLoaded(true);
      document.head.appendChild(script);
    };

    // Defer loading to after initial page paint and CPU activity settles
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => setTimeout(loadScript, 800));
    } else {
      setTimeout(loadScript, 1200);
    }
  }, [isModelLoaded]);

  return (
    <div id="section-waitlist-hero" className="relative h-[400vh] w-full hero-scroll-container waitlist-section-hero">
      {/* Sticky Stage */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden flex flex-col justify-center items-center bg-transparent text-white z-10 transition-colors duration-300">
        
        {/* 3D Line Globe Container */}
        <div className="absolute inset-0 flex items-center justify-center lg:grid lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 lg:px-8 pointer-events-none overflow-hidden z-5">
          <div className="hidden lg:block lg:col-span-7"></div>
          <div className="flex items-center justify-center lg:col-span-5 relative w-full h-full">
            <div className="ep-orbit-wrapper relative">
              <div className="ep-model-container relative z-10">
                {isModelLoaded ? (
                  <model-viewer
                    ref={modelViewerRef}
                    src={lowPolyEarthGLB}
                    class="ep-earth-viewer pointer-events-none"
                    camera-orbit="0deg 75deg 105%"
                    interaction-prompt="none"
                    disable-zoom
                    disable-pan
                    shadow-intensity="0"
                    exposure="0.5"
                    onLoad={() => {
                      if (typeof window !== 'undefined' && window.ScrollTrigger) {
                        window.ScrollTrigger.refresh();
                      }
                    }}
                  ></model-viewer>
                ) : (
                  <div className="ep-earth-viewer flex items-center justify-center bg-transparent">
                    <div className="w-10 h-10 rounded-full border-2 border-[#E0B0FF]/20 border-t-[#E0B0FF] animate-spin" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel 1: Main Title & Initial Form */}
        <div className="panel-1 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10 lg:grid lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 lg:px-8 pointer-events-none">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7 pointer-events-auto">
            {/* Real-time Counter */}
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8DA9C4] pointer-events-auto"
            >
              <Users className="w-4 h-4 text-[#E0B0FF]" />
              <span>
                Únete a <AnimatedCounter value={subscriberCount} /> cadetes y educadores registrados
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mb-6 text-white">
              La estación <span className="text-[#E0B0FF] font-black">educativa</span> del futuro.
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-medium leading-relaxed mb-8">
              LumiNauts combina ciencia, matemáticas y juego estelar. Registra tu correo hoy y asegura tu boleto de acceso anticipado al lanzamiento oficial.
            </p>

            {status == true && (
              <Button 
                type="button"
                onClick={() => setShowPassport(true)}
                variant="shimmer"
                size="md"
                className="w-full max-w-md z-20 pointer-events-auto justify-between px-4"
              >
                <div className="flex items-center gap-2">
                  <CreditCard size={16} className="text-[#E0B0FF]" />
                  <span>Ver mi Pasaporte de Comandante</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] bg-[#E0B0FF]/10 text-[#E0B0FF] px-2 py-0.5 rounded-full border border-[#E0B0FF]/30">
                  <Sparkles size={11} />
                  <span className="font-bold">ID</span>
                </div>
              </Button>
            )}

            <div className="flex justify-center gap-6 z-25 pointer-events-auto">
              <ShineButton onClick={() => setShowDemoModal(true)} className="text-xs py-2.5 px-5 flex items-center gap-2 bg-transparent border border-[#6B8BB4]/30 text-[#8DA9C4] hover:bg-[#6B8BB4]/10">
                <Play size={14} fill="currentColor"/> Probar Demo Estelar
              </ShineButton>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5"></div>
        </div>

        {/* Panel 2: Video/Image Showcase placeholder */}
        <div className="panel-2 absolute inset-0 flex justify-center items-center z-10 opacity-0 pointer-events-none lg:grid lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 lg:px-8">
          <div className="relative w-full h-full flex flex-col justify-center items-center lg:items-start lg:col-span-7 pointer-events-auto">
            <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-4 md:p-6 max-w-xl text-center lg:text-left">
              <Rocket size={40} className="mx-auto lg:mx-0 mb-4 text-[#E0B0FF] animate-pulse" />
              <h3 className="text-2xl md:text-3xl font-black mb-2 text-white">Órbita del Aprendizaje</h3>
              <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto lg:mx-0 mb-6 font-medium leading-relaxed">
                Juegos interactivos donde los cadetes tripulan naves espaciales y resuelven acertijos analíticos alineando estrellas para avanzar.
              </p>
              <div className="w-full aspect-video bg-zinc-950 border border-zinc-800/50 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg">
                {/* Falsa interfaz de juego como video */}
                <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnBub3J5MTV1dTA2c3kzeHJ6azIwYXdoaXRlMjNjZmdpMnpiaHE3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/71fMwwGrFRszyoHhUy/giphy.gif" alt="Demo gameplay" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-lighten" />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5"></div>
        </div>

        {/* Panel 3: Premium Features & Stats */}
        <div className="panel-3 absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-0 pointer-events-none lg:grid lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 lg:px-8">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7 w-full pointer-events-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-8 text-white">
              Aprendizaje que <span className="text-[#8DA9C4]">engancha de verdad.</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-2xl mx-auto lg:mx-0">
              <LuminautsInteractiveCard
                interactive={false}
                className="hero-stat-card px-4"
                glowColor="rgba(141, 169, 196, 0.15)"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#8DA9C4] mb-0.5">+50</div>
                  <div className="font-bold text-white text-xs sm:text-sm mb-0.5">Misiones Activas</div>
                  <div className="text-zinc-400 text-[11px] sm:text-xs font-semibold leading-normal">Desarrolladas por pedagogos y expertos en lógica.</div>
                </div>
              </LuminautsInteractiveCard>
              <LuminautsInteractiveCard
                interactive={false}
                className="hero-stat-card px-4"
                glowColor="rgba(224, 176, 255, 0.15)"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#E0B0FF] mb-0.5">98%</div>
                  <div className="font-bold text-white text-xs sm:text-sm mb-0.5">Interés y Enfoque</div>
                  <div className="text-zinc-400 text-[11px] sm:text-xs font-semibold leading-normal">Asegurado mediante rachas estelares y misiones narrativas.</div>
                </div>
              </LuminautsInteractiveCard>
              <LuminautsInteractiveCard
                interactive={false}
                className="hero-stat-card col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 px-4"
                glowColor="rgba(253, 249, 226, 0.15)"
              >
                <div>
                  <div className="text-xl sm:text-2xl font-black text-[#FDF9E2] mb-0.5">100%</div>
                  <div className="font-bold text-white text-xs sm:text-sm mb-0.5">Seguro para Niños</div>
                  <div className="text-zinc-400 text-[11px] sm:text-xs font-semibold leading-normal">Sin anuncios, sin microtransacciones, con control parental.</div>
                </div>
              </LuminautsInteractiveCard>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5"></div>
        </div>

        {/* Panel 4: Final CTA Form */}
        <div className="panel-4 absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-0 pointer-events-none lg:grid lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 lg:px-8">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left lg:col-span-7 w-full pointer-events-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight text-white">¿Listo para tripular?</h2>
            <p className="text-sm md:text-base text-zinc-400 mb-6 max-w-xl font-medium leading-relaxed">
              Únete hoy al waitlist oficial. Los usuarios registrados recibirán insignias de fundadores exclusivas y acceso prioritario una semana antes del despegue.
            </p>
            <div className="flex-container w-full max-w-lg z-20 pointer-events-auto px-0">
              {status === 'success' ? (
                <Button 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassport(true);
                  }}
                  variant="shimmer"
                  size="md"
                  className="w-full justify-between px-4"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard size={16} className="text-[#E0B0FF]" />
                    <span>Ver mi Pasaporte de Comandante</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] bg-[#E0B0FF]/10 text-[#E0B0FF] px-2 py-0.5 rounded-full border border-[#E0B0FF]/30">
                    <Sparkles size={11} />
                    <span className="font-bold">ID</span>
                  </div>
                </Button>
              ) : (
                <div className="w-full flex flex-col gap-2">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800 focus-within:border-[#E0B0FF]/40 transition-colors">
                    <label htmlFor="hero-email-input" className="sr-only">Correo electrónico</label>
                    <input 
                      id="hero-email-input"
                      type="email" 
                      required 
                      aria-label="Correo electrónico"
                      placeholder="Correo de papá, mamá o profesor..." 
                      value={email}
                      onChange={(e) => {
                        e.target.setCustomValidity('');
                        setEmail(e.target.value);
                      }}
                      className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
                      disabled={loading}
                    />
                    <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-lg font-bold text-xs whitespace-nowrap">
                      {loading ? 'Registrando...' : 'Notificar Lanzamiento'}
                    </Button>
                  </form>
                  {getEmailSuggestion(email) && (
                    <div className="w-full text-left px-1">
                      <button
                        type="button"
                        onClick={() => setEmail(getEmailSuggestion(email))}
                        className="text-xs text-[#E0B0FF] hover:underline font-semibold bg-[#9059C8]/10 border border-[#9059C8]/30 px-3 py-1.5 rounded-lg cursor-pointer flex items-center justify-between gap-2 w-full sm:w-auto"
                      >
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#E0B0FF]" />
                          ¿Quisiste decir <strong className="text-white">{getEmailSuggestion(email)}</strong>?
                        </span>
                        <span className="text-[10px] bg-[#9059C8]/30 px-2 py-0.5 rounded uppercase font-bold text-white shrink-0">Corregir</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-5"></div>
        </div>
      </div>
    </div>
  );
}
