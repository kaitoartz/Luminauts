import React from 'react';
import { motion } from 'framer-motion';
import { Users, Rocket, Play } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import Button from '../ui/Button';
import ShineButton from '../ui/ShineButton';
import { BlurReveal } from '../ui/blur-reveal';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';

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
  return (
    <div id="section-waitlist-hero" className="relative h-[400vh] w-full hero-scroll-container waitlist-section-hero">
      {/* Sticky Stage */}
      <div className="sticky top-0 h-dvh w-full overflow-hidden flex flex-col justify-center items-center bg-transparent text-white z-10 transition-colors duration-300">
        
        {/* 3D Line Globe Container */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-5">
          <div className="ep-orbit-wrapper">
            <div className="ep-model-container">
              <model-viewer
                ref={modelViewerRef}
                src="/low_poly_earth.glb"
                class="ep-earth-viewer pointer-events-none"
                camera-orbit="0deg 75deg 105%"
                interaction-prompt="none"
                disable-zoom
                disable-pan
                shadow-intensity="0"
                exposure="0.5"
              ></model-viewer>
            </div>
          </div>
        </div>
        
        {/* Panel 1: Main Title & Initial Form */}
        <div className="panel-1 absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-10">
          
          {/* Real-time Simulated Counter */}
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 flex items-center gap-2.5 bg-white/2 border border-white/6 hover:border-white/12 rounded-full px-5 py-2 text-xs sm:text-sm font-medium text-[#8DA9C4] backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_30px_rgba(144,89,200,0.1)] transition-all duration-500 group pointer-events-auto"
          >
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-br from-[#9059C8]/25 to-blue-500/10 border border-[#9059C8]/20 group-hover:scale-105 transition-transform duration-300">
              <Users className="w-3.5 h-3.5 text-[#E0B0FF]" />
            </div>
            <span>
              Únete a <AnimatedCounter value={subscriberCount} /> cadetes y educadores registrados
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] max-w-5xl mb-6 text-white">
            <BlurReveal trigger={!isSplashActive} delay={0.15}>La&nbsp;</BlurReveal>
            <BlurReveal trigger={!isSplashActive} delay={0.25}>estación&nbsp;</BlurReveal>
            <BlurReveal trigger={!isSplashActive} className="text-[#E0B0FF] font-black" delay={0.35}>educativa&nbsp;</BlurReveal>
            <BlurReveal trigger={!isSplashActive} delay={0.45}>del&nbsp;</BlurReveal>
            <BlurReveal trigger={!isSplashActive} delay={0.55}>futuro.</BlurReveal>
          </h1>
          
          <BlurReveal trigger={!isSplashActive} delay={0.7} duration={1.2}>
            <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-medium leading-relaxed mb-8">
              LumiNauts combina ciencia, matemáticas y juego estelar. Registra tu correo hoy y asegura tu boleto de acceso anticipado al lanzamiento oficial.
            </p>
          </BlurReveal>

          {status == true && (
            <Button 
              type="button"
              onClick={() => setShowPassport(true)}
              className="w-full max-w-md z-20 pointer-events-auto px-2 py-3.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.97]"
            >
              Ver mi Pasaporte de Comandante 💳
            </Button>
          )}

          <div className="flex justify-center gap-6 z-25 pointer-events-auto">
            <ShineButton onClick={() => setShowDemoModal(true)} className="text-xs py-2.5 px-5 flex items-center gap-2 bg-transparent border border-[#6B8BB4]/30 text-[#8DA9C4] hover:bg-[#6B8BB4]/10">
              <Play size={14} fill="currentColor"/> Probar Demo Estelar
            </ShineButton>
          </div>
        </div>

        {/* Panel 2: Video/Image Showcase placeholder */}
        <div className="panel-2 absolute inset-0 flex justify-center items-center z-10 opacity-0 pointer-events-none">
          <div className="relative w-full max-w-6xl h-full flex flex-col justify-center items-center px-6 pointer-events-auto">
            <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-4 md:p-8 backdrop-blur-md max-w-3xl text-center">
              <Rocket size={48} className="mx-auto mb-4 text-[#E0B0FF] animate-pulse" />
              <h3 className="text-2xl md:text-3xl font-black mb-2 text-white">Órbita del Aprendizaje</h3>
              <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-6">
                Juegos interactivos donde los cadetes tripulan naves espaciales y resuelven acertijos analíticos alineando estrellas para avanzar.
              </p>
              <div className="w-full aspect-video bg-zinc-950 border border-zinc-800/50 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-lg">
                {/* Falsa interfaz de juego como video */}
                <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnBub3J5MTV1dTA2c3kzeHJ6azIwYXdoaXRlMjNjZmdpMnpiaHE3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/71fMwwGrFRszyoHhUy/giphy.gif" alt="Demo gameplay" className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-lighten" />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent opacity-80"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Premium Features & Stats */}
        <div className="panel-3 absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-0 pointer-events-none">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-12 text-white">
            Aprendizaje que <span className="text-[#8DA9C4]">engancha de verdad.</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full">
            <LuminautsInteractiveCard
              interactive={false}
              className="hero-stat-card"
              glowColor="rgba(141, 169, 196, 0.15)"
            >
              <div>
                <div className="text-3xl md:text-4xl font-black text-[#8DA9C4] mb-1">+50</div>
                <div className="font-bold text-white text-base mb-1">Misiones Activas</div>
                <div className="text-zinc-400 text-xs font-semibold">Desarrolladas por pedagogos y expertos en lógica.</div>
              </div>
            </LuminautsInteractiveCard>
            <LuminautsInteractiveCard
              interactive={false}
              className="hero-stat-card"
              glowColor="rgba(224, 176, 255, 0.15)"
            >
              <div>
                <div className="text-3xl md:text-4xl font-black text-[#E0B0FF] mb-1">98%</div>
                <div className="font-bold text-white text-base mb-1">Interés y Enfoque</div>
                <div className="text-zinc-400 text-xs font-semibold">Asegurado mediante rachas estelares y misiones narrativas.</div>
              </div>
            </LuminautsInteractiveCard>
            <LuminautsInteractiveCard
              interactive={false}
              className="hero-stat-card col-span-1 sm:col-span-2 md:col-span-1"
              glowColor="rgba(253, 249, 226, 0.15)"
            >
              <div>
                <div className="text-3xl md:text-4xl font-black text-[#FDF9E2] mb-1">100%</div>
                <div className="font-bold text-white text-base mb-1">Seguro para Niños</div>
                <div className="text-zinc-400 text-xs font-semibold">Sin anuncios, sin microtransacciones, con control parental.</div>
              </div>
            </LuminautsInteractiveCard>
          </div>
        </div>

        {/* Panel 4: Final CTA Form */}
        <div className="panel-4 absolute inset-0 flex flex-col justify-center items-center text-center p-4 md:p-6 z-10 opacity-0 pointer-events-none">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tight text-white">¿Listo para tripular?</h2>
          <p className="text-sm md:text-base text-zinc-400 mb-6 max-w-xl">
            Únete hoy al waitlist oficial. Los usuarios registrados recibirán insignias de fundadores exclusivas y acceso prioritario una semana antes del despegue.
          </p>
          <div className="flex-container w-full max-w-lg z-20 pointer-events-auto px-2">
            {status === 'success' ? (
              <Button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassport(true);
                }}
                className="w-full py-3.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/10 active:scale-[0.97]"
              >
                Ver mi Pasaporte de Comandante 💳
              </Button>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-zinc-200/20 shadow-md focus-within:border-[#E0B0FF]/40 focus-within:shadow-[0_0_25px_rgba(224,176,255,0.15)] transition-all duration-500">
                <input 
                  type="email" 
                  required 
                  aria-label="Correo electrónico"
                  placeholder="Correo de papá, mamá o profesor..." 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-400/60 font-semibold focus:outline-none text-sm"
                  disabled={loading}
                />
                <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl font-bold text-xs whitespace-nowrap">
                  {loading ? 'Registrando...' : 'Notificar Lanzamiento'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
