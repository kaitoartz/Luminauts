import React from 'react';
import { 
  Rocket, Brain, FlaskConical, BookOpen, Compass, Gamepad2, 
  Trophy, Star, Sparkles, Zap, ArrowRight, Palette, Music, 
  Globe, Atom, Dna, Code, Terminal
} from 'lucide-react';
import Button from './Button';

const iconConfigs = [
  // Orbit 1: Math, Art, Logic (Inner)
  { Icon: Brain, color: '#9059C8', label: 'Lógica' }, // tertiary purple
  { Icon: Palette, color: '#D48D08', label: 'Creatividad' }, // amber/accent
  { Icon: BookOpen, color: '#EC4899', label: 'Lectura' }, // pink
  { Icon: Music, color: '#10B981', label: 'Música' }, // emerald
  { Icon: Terminal, color: '#3B6290', label: 'Código' }, // primary blue
  { Icon: Compass, color: '#6B8BB4', label: 'Exploración' }, // stellar blue

  // Orbit 2: Science & Space (Middle)
  { Icon: FlaskConical, color: '#10B981', label: 'Ciencias' },
  { Icon: Globe, color: '#6B8BB4', label: 'Geografía' },
  { Icon: Atom, color: '#9059C8', label: 'Física' },
  { Icon: Dna, color: '#EC4899', label: 'Biología' },
  { Icon: Code, color: '#D48D08', label: 'Lógica' },
  { Icon: Rocket, color: '#3B6290', label: 'Espacio' },

  // Orbit 3: Gamification & Rewards (Outer)
  { Icon: Gamepad2, color: '#10B981', label: 'Juegos' },
  { Icon: Trophy, color: '#D48D08', label: 'Premios' },
  { Icon: Star, color: '#F59E0B', label: 'Estrellas' },
  { Icon: Sparkles, color: '#9059C8', label: 'Misiones' },
  { Icon: Zap, color: '#3B6290', label: 'Energía' },
  { Icon: Rocket, color: '#6B8BB4', label: 'Aventuras' },
];

export default function FeatureSection({ onNavigate }) {
  const orbitCount = 3;
  const orbitGap = 7; // rem between orbits
  const iconsPerOrbit = 6;

  return (
    <section className="relative max-w-6xl mx-auto my-16 lg:my-32 p-6 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6 min-h-[32rem] border border-zinc-200/60 dark:border-zinc-800/30 bg-white/80 dark:bg-zinc-900/30 backdrop-blur-md overflow-hidden rounded-[2rem] shadow-xl shadow-zinc-100 dark:shadow-none transition-all duration-300">
      
      {/* Background Decorative Cosmic Glows */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 dark:bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Left side: Heading and Text */}
      <div className="w-full lg:w-1/2 z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[#3B6290] dark:text-[#8DA9C4] font-semibold text-sm mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Órbitas del Conocimiento</span>
        </div>
        
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
          Alinea tu mente con el <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 dark:from-blue-400 dark:to-purple-400">universo.</span>
        </h2>
        
        <p className="text-zinc-650 dark:text-zinc-400 mb-8 max-w-lg text-lg font-medium leading-relaxed">
          LumiNauts combina matemáticas, lógica y ciencias en una aventura gamificada interactiva. Los cadetes exploran constelaciones de retos adaptados por expertos pedagogos.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Button 
            variant="primary" 
            size="lg" 
            onClick={() => onNavigate('catalog')}
            className="w-full sm:w-auto shadow-blue-500/10"
          >
            Iniciar Aventura <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={() => onNavigate('parents')}
            className="w-full sm:w-auto"
          >
            Control de Misión
          </Button>
        </div>
      </div>

      {/* Right side: Orbit animation */}
      <div className="relative w-full lg:w-1/2 h-[26rem] sm:h-[30rem] flex items-center justify-center lg:justify-end overflow-hidden">
        {/* Orbit Wrapper Container - shifted right on large screen for a premium cropped layout, or centered on small */}
        <div className="relative w-[34rem] h-[34rem] md:w-[40rem] md:h-[40rem] lg:translate-x-[20%] flex items-center justify-center shrink-0">
          
          {/* Center Glowing Sun/Star */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center justify-center z-15 border-2 border-white dark:border-zinc-800/80 animate-pulse-slow">
            <Rocket className="w-10 h-10 text-white drop-shadow-md transform -rotate-45" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${10 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;
            const spinDuration = 16 + orbitIdx * 8; // outer orbits spin slower

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-zinc-200 dark:border-zinc-800/80 orbit-spin pointer-events-none"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${spinDuration}s linear infinite`,
                }}
              >
                {iconConfigs
                  .slice(orbitIdx * iconsPerOrbit, orbitIdx * iconsPerOrbit + iconsPerOrbit)
                  .map((cfg, iconIdx) => {
                    const angle = iconIdx * angleStep;
                    const x = 50 + 50 * Math.cos(angle);
                    const y = 50 + 50 * Math.sin(angle);

                    return (
                      <div
                        key={iconIdx}
                        className="absolute bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-full p-2 shadow-md dark:shadow-none flex items-center justify-center group pointer-events-auto cursor-pointer hover:scale-110 hover:border-blue-400/50 dark:hover:border-blue-400/50 transition-all duration-300"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      >
                        {/* Counter-rotation to keep the icon upright */}
                        <div
                          className="flex items-center justify-center relative orbit-spin-reverse"
                          style={{
                            animation: `spin-reverse ${spinDuration}s linear infinite`,
                          }}
                        >
                          <cfg.Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: cfg.color }} />
                          
                          {/* Tooltip Label */}
                          <span className="absolute bottom-full mb-2 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow pointer-events-none whitespace-nowrap z-30">
                            {cfg.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        .orbit-spin {
          animation-play-state: running;
        }
        .orbit-spin-reverse {
          animation-play-state: running;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .orbit-spin, .orbit-spin-reverse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
