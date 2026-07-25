import { useRef, useEffect } from "react";
import Button from "./Button";
import { 
  Zap, FlaskConical, BookOpen, Brain, Code, Globe, Star, 
  Sparkles, Compass, Music, Heart, Award, Cpu, Shield, 
  Rocket, Target, HelpCircle
} from "lucide-react";

const iconConfigs = [
  { Icon: Zap, color: "#FDF9E2", label: "Física" },          
  { Icon: FlaskConical, color: "#8DA9C4", label: "Ciencias" }, 
  { Icon: BookOpen, color: "#6B8BB4", label: "Lectura" },     
  { Icon: Brain, color: "#E0B0FF", label: "Memoria" },        
  { Icon: Code, color: "#9059C8", label: "Programación" },    
  { Icon: Globe, color: "#51759C", label: "Geografía" },      
  { Icon: Star, color: "#FDF9E2", label: "Misiones" },         
  { Icon: Sparkles, color: "#E0B0FF", label: "Creatividad" }, 
  { Icon: Compass, color: "#8DA9C4", label: "Exploración" },  
  { Icon: Music, color: "#9059C8", label: "Música" },         
  { Icon: Heart, color: "#6B8BB4", label: "Salud" },          
  { Icon: Award, color: "#FDF9E2", label: "Logros" },         
  { Icon: Cpu, color: "#3B6290", label: "Tecnología" },       
  { Icon: Shield, color: "#51759C", label: "Seguridad" },     
  { Icon: Rocket, color: "#6B8BB4", label: "Navegación" },    
  { Icon: Target, color: "#E0B0FF", label: "Retos" },         
  { Icon: HelpCircle, color: "#9059C8", label: "Acertijos" }  
];

export default function FeatureSection({ onNavigate }) {
  const orbitCount = 3;
  const orbitGap = 6.5; // spacing in rem
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  const orbitRefs = useRef([]);
  const hoverCounts = useRef({});
  const activeTransitions = useRef({});

  useEffect(() => {
    return () => {
      Object.values(activeTransitions.current).forEach(id => cancelAnimationFrame(id));
    };
  }, []);

  const animatePlaybackRate = (orbitIdx, targetRate) => {
    const orbitEl = orbitRefs.current[orbitIdx];
    if (!orbitEl) return;

    if (activeTransitions.current[orbitIdx]) {
      cancelAnimationFrame(activeTransitions.current[orbitIdx]);
    }

    const animations = orbitEl.getAnimations({ subtree: true }).filter(
      anim => anim.animationName === "spin" || anim.animationName === "spin-reverse"
    );
    if (animations.length === 0) return;

    let currentRate = animations[0].playbackRate;
    if (currentRate === null || isNaN(currentRate)) currentRate = 1.0;

    const duration = 300;
    const startTime = performance.now();
    const startRate = currentRate;

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress);
      const newRate = startRate + (targetRate - startRate) * ease;

      animations.forEach(anim => {
        anim.playbackRate = newRate;
      });

      if (progress < 1) {
        activeTransitions.current[orbitIdx] = requestAnimationFrame(step);
      } else {
        delete activeTransitions.current[orbitIdx];
      }
    };

    activeTransitions.current[orbitIdx] = requestAnimationFrame(step);
  };

  const handleMouseEnter = (orbitIdx) => {
    hoverCounts.current[orbitIdx] = (hoverCounts.current[orbitIdx] || 0) + 1;
    animatePlaybackRate(orbitIdx, 0.2);
  };

  const handleMouseLeave = (orbitIdx) => {
    hoverCounts.current[orbitIdx] = Math.max(0, (hoverCounts.current[orbitIdx] || 0) - 1);
    if (hoverCounts.current[orbitIdx] === 0) {
      animatePlaybackRate(orbitIdx, 1.0);
    }
  };

  return (
    <section className="feature-section-container relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 my-0 flex flex-col lg:flex-row items-center justify-between min-h-[32rem] bg-transparent overflow-visible z-10">
      
      {/* Left side: Heading and Text */}
      <div className="w-full lg:w-1/2 z-20 flex flex-col items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E0B0FF]/10 text-[#E0B0FF] font-bold text-xs border border-[#E0B0FF]/20 mb-6 uppercase tracking-wider">
          <Sparkles size={14}/> Expandiéndonos por el Cosmos
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
          Expande tu mente <br className="hidden lg:inline"/>
          <span className="text-[#E0B0FF]">más allá del cielo</span>
        </h2>
        <p className="text-zinc-400 mb-8 max-w-md text-base sm:text-lg font-medium leading-relaxed">
          Navega por múltiples disciplinas diseñadas especialmente para mentes curiosas. Matemáticas, ciencias, programación y lectura en un solo universo.
        </p>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => onNavigate && onNavigate('catalog')}
            variant="primary"
            size="md"
            className="rounded-xl font-bold px-6 py-2.5"
          >
            Explorar Mapa Estelar
          </Button>
          <Button 
            variant="shimmer" 
            onClick={() => onNavigate && onNavigate('pricing')}
            size="md"
            className="rounded-xl font-bold px-6 py-2.5"
          >
            Ver Membresías
          </Button>
        </div>
      </div>

      {/* Right side: Orbit animation */}
      <div className="relative w-full lg:w-1/2 h-[26rem] md:h-[32rem] flex items-center justify-center lg:justify-center overflow-visible z-10">
        <div className="relative w-[28rem] h-[28rem] sm:w-[32rem] sm:h-[32rem] md:w-[36rem] md:h-[36rem] flex items-center justify-center pointer-events-auto">
          
          {/* Center Station Circle */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-900 shadow-[0_0_35px_rgba(107,139,180,0.3)] border border-zinc-750 flex items-center justify-center z-20 pointer-events-auto">
            <Rocket className="w-10 h-10 md:w-12 md:h-12 text-[#8DA9C4] animate-pulse" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${8.5 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                ref={(el) => (orbitRefs.current[orbitIdx] = el)}
                className="absolute rounded-full border border-dashed border-zinc-800/80 pointer-events-none"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${18 + orbitIdx * 7}s linear infinite`,
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
                        className="absolute pointer-events-auto group z-30 hover:z-50 transition-all duration-300"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onMouseEnter={() => handleMouseEnter(orbitIdx)}
                        onMouseLeave={() => handleMouseLeave(orbitIdx)}
                      >
                        <div className="relative p-3 rounded-full bg-zinc-900 border border-zinc-750/80 shadow-lg group-hover:scale-125 group-hover:border-[#E0B0FF]/60 group-hover:shadow-[0_0_20px_rgba(224,176,255,0.35)] transition-all duration-300 flex items-center justify-center">
                          {cfg.Icon && (
                            <div
                              className="flex items-center justify-center relative"
                              style={{
                                animation: `spin-reverse ${18 + orbitIdx * 7}s linear infinite`,
                              }}
                            >
                              <cfg.Icon className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:scale-110" style={{ color: cfg.color }} />
                              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 bg-zinc-900/95 border border-zinc-750 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-2xl pointer-events-none whitespace-nowrap z-50">
                                {cfg.label}
                              </span>
                            </div>
                          )}
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
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </section>
  );
}
