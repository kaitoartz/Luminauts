import React, { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';
import PremiumThemeToggle from './ui/PremiumThemeToggle';
import Button from './ui/Button';

const Navbar = ({ currentView, onNavigate, apiStatus, onOpenSettings, theme, onToggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navs = [
    { id: 'landing', label: 'Bitácora' },
    { id: 'catalog', label: 'Mapa Estelar' },
    { id: 'pricing', label: 'Suscripción' },
    { id: 'dashboard', label: 'Misiones' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`max-w-7xl mx-auto flex justify-between items-center transition-all duration-500 rounded-full px-6 ${scrolled ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-lg py-3' : 'bg-transparent py-2'}`}>
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate('landing')}>
            <div className="w-12 h-12 bg-gradient-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-[18px] flex items-center justify-center text-white shadow-lg shadow-indigo-500/10 group-hover:scale-105 group-hover:rotate-3 transition-transform"><Rocket size={24} /></div>
            <span className="font-black text-2xl tracking-tight text-zinc-900 dark:text-white hidden sm:block">LumiNauts</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {navs.map(nav => (
              <button key={nav.id} onClick={() => onNavigate(nav.id)} className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${currentView === nav.id ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 shadow-md' : 'text-zinc-550 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-zinc-800'}`}>
                {nav.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Indicador de Conexión de API */}
            <button 
              onClick={onOpenSettings}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-zinc-550/50 dark:bg-zinc-900/50 hover:bg-zinc-100/80 dark:hover:bg-zinc-800 text-zinc-650 dark:text-zinc-300 transition-all text-xs font-bold shadow-sm"
              title="Configuración de API"
            >
              <span className={`w-2.5 h-2.5 rounded-full ${apiStatus === 'connected' ? 'bg-green-500 animate-pulse' : apiStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 'bg-red-450'}`} />
              <span className="text-zinc-600 dark:text-zinc-300 hidden sm:inline">
                {apiStatus === 'connected' ? 'API Conectada' : apiStatus === 'connecting' ? 'Conectando...' : 'API Desconectada'}
              </span>
            </button>

            {/* Premium Theme Toggle */}
            <PremiumThemeToggle isDark={theme === 'dark'} onToggle={onToggleTheme} />

            <div className="hidden lg:flex items-center gap-2">
              <button className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/85 dark:hover:bg-zinc-800 transition-colors px-3 py-2 rounded-lg" onClick={() => onNavigate('parents')}>Padres</button>
              <button className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/85 dark:hover:bg-zinc-800 transition-colors px-3 py-2 rounded-lg" onClick={() => onNavigate('profile')}>Perfil</button>
            </div>
            <Button size="md" className="rounded-full shadow-lg shadow-blue-500/20 px-8" onClick={() => onNavigate('catalog')}>Jugar Ahora</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
