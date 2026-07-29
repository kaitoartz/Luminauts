import React from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, Play, CreditCard, Sparkles } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import Button from '../ui/Button';
import ShineButton from '../ui/ShineButton';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';
import lowPolyEarthGLB from '../../assets/low_poly_earth.glb';
import { getEmailSuggestion } from '../../utils/emailValidator';

export default function WaitlistHeroSectionDebug({
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

  const [layoutMode, setLayoutMode] = React.useState('sticky'); // 'sticky' or 'stacked'

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

    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => setTimeout(loadScript, 800));
    } else {
      setTimeout(loadScript, 1200);
    }
  }, [isModelLoaded]);

  return (
    <div id="section-waitlist-hero" className={`relative ${layoutMode === 'sticky' ? 'h-[200vh]' : 'h-auto py-12'} w-full hero-scroll-container waitlist-section-hero`}>
      
      {/* Debug Controls HUD */}
      <div className="sticky top-16 z-50 bg-amber-500/20 border border-amber-500/50 backdrop-blur-md p-3 mx-4 rounded-xl text-amber-200 text-xs flex flex-wrap items-center justify-between gap-2 shadow-lg">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <strong>DEBUG HERO CONTROLS:</strong>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setLayoutMode(prev => prev === 'sticky' ? 'stacked' : 'sticky')}
            className="px-3 py-1 bg-amber-500/30 hover:bg-amber-500/50 border border-amber-400/40 rounded-lg text-white font-bold transition-colors cursor-pointer"
          >
            Modo Layout: {layoutMode.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Hero Container */}
      <div 
        style={layoutMode === 'sticky' ? { height: 'var(--app-height, 100vh)' } : { height: 'auto' }}
        className={`${layoutMode === 'sticky' ? 'sticky top-0 overflow-hidden min-h-screen' : 'relative'} w-full flex flex-col justify-center items-center text-white z-10`}
      >
        
        {/* 3D Line Globe Container */}
        <div className="relative lg:grid lg:grid-cols-12 max-w-7xl mx-auto w-full px-6 lg:px-8 pointer-events-none z-5 py-8">
          <div className="hidden lg:block lg:col-span-7"></div>
          <div className="flex items-center justify-center lg:col-span-5 relative w-full h-64">
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
        <div className="panel-1 relative w-full flex flex-col justify-center items-center text-center p-6 z-10 max-w-7xl mx-auto opacity-100 pointer-events-auto">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left pointer-events-auto">
            <motion.div 
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8 flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8DA9C4]"
            >
              <Users className="w-4 h-4 text-[#E0B0FF]" />
              <span>
                Únete a <AnimatedCounter value={subscriberCount} /> cadetes y educadores registrados
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] max-w-5xl mb-6 text-white">
              La estación <span className="text-[#E0B0FF] font-black">educativa</span> del futuro.
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-400 max-w-xl font-medium leading-relaxed mb-8">
              LumiNauts combina ciencia, matemáticas y juego estelar. Registra tu correo hoy y asegura tu boleto de acceso anticipado al lanzamiento oficial.
            </p>

            <div className="flex justify-center gap-6 z-25 pointer-events-auto">
              <ShineButton onClick={() => setShowDemoModal(true)} className="text-xs py-2.5 px-5 flex items-center gap-2 bg-transparent border border-[#6B8BB4]/30 text-[#8DA9C4] hover:bg-[#6B8BB4]/10">
                <Play size={14} fill="currentColor"/> Probar Demo Estelar
              </ShineButton>
            </div>
          </div>
        </div>

        {/* Panel 2: Video/Image Showcase */}
        <div className="panel-2 relative w-full flex justify-center items-center p-6 z-10 opacity-100 pointer-events-auto my-8">
          <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-4 md:p-6 max-w-xl text-center lg:text-left">
            <Rocket size={40} className="mx-auto lg:mx-0 mb-4 text-[#E0B0FF]" />
            <h3 className="text-2xl md:text-3xl font-black mb-2 text-white">Órbita del Aprendizaje</h3>
            <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto lg:mx-0 mb-6 font-medium leading-relaxed">
              Juegos interactivos donde los cadetes tripulan naves espaciales y resuelven acertijos analíticos alineando estrellas para avanzar.
            </p>
          </div>
        </div>

        {/* Panel 3: Premium Features & Stats */}
        <div className="panel-3 relative w-full flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-100 pointer-events-auto my-8">
          <h2 className="text-2xl md:text-3xl font-black mb-8 text-white">
            Aprendizaje que <span className="text-[#8DA9C4]">engancha de verdad.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full max-w-3xl">
            <LuminautsInteractiveCard interactive={false} className="hero-stat-card px-4" glowColor="rgba(141, 169, 196, 0.15)">
              <div>
                <div className="text-xl font-black text-[#8DA9C4] mb-0.5">+50</div>
                <div className="font-bold text-white text-xs mb-0.5">Misiones Activas</div>
              </div>
            </LuminautsInteractiveCard>
            <LuminautsInteractiveCard interactive={false} className="hero-stat-card px-4" glowColor="rgba(224, 176, 255, 0.15)">
              <div>
                <div className="text-xl font-black text-[#E0B0FF] mb-0.5">98%</div>
                <div className="font-bold text-white text-xs mb-0.5">Interés y Enfoque</div>
              </div>
            </LuminautsInteractiveCard>
            <LuminautsInteractiveCard interactive={false} className="hero-stat-card px-4" glowColor="rgba(253, 249, 226, 0.15)">
              <div>
                <div className="text-xl font-black text-[#FDF9E2] mb-0.5">100%</div>
                <div className="font-bold text-white text-xs mb-0.5">Seguro para Niños</div>
              </div>
            </LuminautsInteractiveCard>
          </div>
        </div>

        {/* Panel 4: Final CTA Form */}
        <div className="panel-4 relative w-full flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-100 pointer-events-auto my-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white">¿Listo para tripular?</h2>
          <div className="w-full max-w-lg z-20">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800">
              <input 
                type="email" 
                required 
                placeholder="Correo de papá, mamá o profesor..." 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
              />
              <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-[#6B8BB4] text-white rounded-lg font-bold text-xs">
                {loading ? 'Registrando...' : 'Notificar Lanzamiento'}
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
