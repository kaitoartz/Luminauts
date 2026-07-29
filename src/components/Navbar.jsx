import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Rocket, Menu, X, Shield, User, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PremiumThemeToggle from './ui/PremiumThemeToggle';
import Button from './ui/Button';

const Navbar = ({ currentView, onNavigate, apiStatus, onOpenSettings, theme, onToggleTheme, isWaitlistMode = false, onJoinClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil al cambiar de vista o cambiar tamaño de pantalla
  useEffect(() => {
    setIsOpen(false);
  }, [currentView]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navs = [
    { id: 'landing', label: 'Bitácora' },
    { id: 'catalog', label: 'Mapa Estelar' },
    { id: 'adventure', label: import.meta.env.DEV ? 'Aventura' : 'Aventura (Próximamente)' },
    { id: 'pricing', label: 'Suscripción' },
    { id: 'dashboard', label: 'Misiones' }
  ];

  const content = (
    <nav className="fixed top-0 inset-x-0 z-40 py-3 sm:py-4 transition-all duration-300">
      <div className="px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className={`flex justify-between items-center transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 ${
          scrolled 
            ? 'bg-zinc-950/90 dark:bg-[#141923]/95 backdrop-blur-xl border border-zinc-800/80 shadow-[0_10px_40px_rgba(0,0,0,0.6)] text-white' 
            : 'bg-zinc-950/60 dark:bg-[#141923]/60 backdrop-blur-md border border-white/10 text-white'
        }`}>
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group shrink-0" 
            onClick={() => {
              const el = document.getElementById('section-waitlist-hero');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else if (isWaitlistMode) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                onNavigate('landing');
              }
            }}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-linear-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/10 group-hover:scale-105 transition-transform shrink-0">
              <Rocket size={18} className="sm:w-5 sm:h-5" />
            </div>
            <span className="font-black text-base sm:text-xl md:text-2xl tracking-tight text-white">Luminauts</span>
          </div>
          
          {/* Desktop Navigation Menu (hidden on mobile/tablet) */}
          <div className="hidden lg:flex items-center gap-2">
            {!isWaitlistMode && navs.map(nav => (
              <button 
                key={nav.id} 
                onClick={() => onNavigate(nav.id)} 
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${currentView === nav.id ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}`}
              >
                {nav.label}
              </button>
            ))}
          </div>
          
          {/* Actions (Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Indicador de Conexión de API (Desktop) */}
            {!isWaitlistMode && (
              <button 
                onClick={onOpenSettings}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300 transition-all text-xs font-bold shadow-sm"
                title="Configuración de API"
              >
                <span className={`w-2.5 h-2.5 rounded-full ${apiStatus === 'connected' ? 'bg-green-500 animate-pulse' : apiStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
                <span className="text-zinc-300 hidden xl:inline">
                  {apiStatus === 'connected' ? 'API Conectada' : apiStatus === 'connecting' ? 'Conectando...' : 'API Desconectada'}
                </span>
              </button>
            )}

            {/* Premium Theme Toggle (Visible on all devices) */}
            {!isWaitlistMode && <PremiumThemeToggle isDark={theme === 'dark'} onToggle={onToggleTheme} />}

            {/* Parents / Profile Desktop Buttons */}
            {!isWaitlistMode && (
              <div className="hidden lg:flex items-center gap-2">
                <button className="text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors px-3 py-2 rounded-lg" onClick={() => onNavigate('parents')}>Padres</button>
                <button className="text-sm font-bold text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors px-3 py-2 rounded-lg" onClick={() => onNavigate('profile')}>Perfil</button>
              </div>
            )}

            {/* "Jugar Ahora" / "Unirse" Button (Visible and fluid on mobile & desktop) */}
            {isWaitlistMode ? (
              <Button 
                size="sm" 
                className="rounded-full shadow-lg shadow-blue-500/20 px-4 sm:px-8 py-2 text-xs sm:text-sm font-bold flex items-center justify-center shrink-0" 
                onClick={onJoinClick}
              >
                Unirse
              </Button>
            ) : (
              <Button 
                size="sm" 
                className="rounded-full shadow-lg shadow-blue-500/20 px-4 sm:px-8 py-2 text-xs sm:text-sm font-bold hidden sm:inline-flex shrink-0" 
                onClick={() => onNavigate('catalog')}
              >
                Jugar Ahora
              </Button>
            )}

            {/* Mobile Burger Menu Button (Visible on mobile/tablet in normal mode) */}
            {!isWaitlistMode && (
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl border border-zinc-800 bg-zinc-900/80 text-zinc-200 lg:hidden flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50 shadow-sm"
                aria-label="Abrir menú"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Slide-out Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-40 lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-zinc-950 border-l border-zinc-100 dark:border-zinc-200 z-50 p-6 shadow-2xl flex flex-col justify-between lg:hidden"
            >
              <div className="space-y-8">
                {/* Header inside drawer */}
                <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-200">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-linear-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-[14px] flex items-center justify-center text-white">
                      <Rocket size={20} />
                    </div>
                    <span className="font-black text-xl tracking-tight text-zinc-900 dark:text-white">Luminauts</span>
                  </div>
                  
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-200 text-zinc-555 dark:text-zinc-550 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {navs.map(nav => (
                    <button 
                      key={nav.id} 
                      onClick={() => onNavigate(nav.id)} 
                      className={`w-full text-left px-4 py-3 rounded-2xl text-lg font-bold transition-all flex items-center justify-between ${currentView === nav.id ? 'bg-zinc-900 dark:bg-zinc-800 text-white dark:text-white shadow-md' : 'text-zinc-650 dark:text-zinc-550 hover:bg-zinc-550/20 dark:hover:bg-zinc-200'}`}
                    >
                      {nav.label}
                    </button>
                  ))}
                  
                  <div className="h-px bg-zinc-100 dark:bg-zinc-200 my-4" />

                  <button 
                    onClick={() => onNavigate('parents')} 
                    className={`w-full text-left px-4 py-3 rounded-2xl text-lg font-bold transition-all flex items-center gap-3 ${currentView === 'parents' ? 'bg-zinc-900 dark:bg-zinc-800 text-white dark:text-white shadow-md' : 'text-zinc-650 dark:text-zinc-550 hover:bg-zinc-550/20 dark:hover:bg-zinc-200'}`}
                  >
                    <Shield size={20} /> Padres
                  </button>
                  
                  <button 
                    onClick={() => onNavigate('profile')} 
                    className={`w-full text-left px-4 py-3 rounded-2xl text-lg font-bold transition-all flex items-center gap-3 ${currentView === 'profile' ? 'bg-zinc-900 dark:bg-zinc-800 text-white dark:text-white shadow-md' : 'text-zinc-650 dark:text-zinc-550 hover:bg-zinc-550/20 dark:hover:bg-zinc-200'}`}
                  >
                    <User size={20} /> Perfil
                  </button>
                </div>
              </div>

              {/* Bottom Actions inside drawer */}
              <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-200">
                {/* Indicador de Conexión de API (Mobile) */}
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    onOpenSettings();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-200 bg-zinc-50 text-zinc-650 dark:text-zinc-350 transition-all text-sm font-bold shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${apiStatus === 'connected' ? 'bg-green-500 animate-pulse' : apiStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'}`} />
                    <span>Configuración API</span>
                  </div>
                  <span className="text-xs dark:text-zinc-550 font-medium">
                    {apiStatus === 'connected' ? 'Conectado' : apiStatus === 'connecting' ? 'Probando...' : 'Desconectado'}
                  </span>
                </button>

                <Button size="lg" className="w-full rounded-2xl shadow-lg shadow-blue-500/20 py-4" onClick={() => onNavigate('catalog')}>
                  Jugar Ahora
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
};

export default Navbar;
