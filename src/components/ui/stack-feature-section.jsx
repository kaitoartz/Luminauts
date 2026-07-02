import Button from "./Button";
import { 
  Zap, FlaskConical, BookOpen, Brain, Code, Globe, Star, 
  Sparkles, Compass, Music, Heart, Award, Cpu, Shield, 
  Rocket, Target, HelpCircle
} from "lucide-react";

const iconConfigs = [
  { Icon: Zap, color: "#f59e0b", label: "Física" },          // Rayos/Física
  { Icon: FlaskConical, color: "#10b981", label: "Ciencias" }, // Ciencia/Laboratorio
  { Icon: BookOpen, color: "#3b82f6", label: "Lectura" },     // Lectura/Bitácoras
  { Icon: Brain, color: "#E0B0FF", label: "Memoria" },        // Memoria/Sistemas Estelares
  { Icon: Code, color: "#ec4899", label: "Programación" },    // Programación/Código
  { Icon: Globe, color: "#06b6d4", label: "Geografía" },      // Cartografía
  { Icon: Star, color: "#eab308", label: "Misiones" },         // Misiones/Estrellas
  { Icon: Sparkles, color: "#a855f7", label: "Creatividad" }, // Magia/Creatividad
  { Icon: Compass, color: "#14b8a6", label: "Exploración" },  // Exploración
  { Icon: Music, color: "#f43f5e", label: "Música" },         // Frecuencias Cósmicas
  { Icon: Heart, color: "#ef4444", label: "Salud" },          // Salud/Vida
  { Icon: Award, color: "#f59e0b", label: "Logros" },         // Premios/Rachas
  { Icon: Cpu, color: "#6366f1", label: "Tecnología" },       // Tecnología/IA
  { Icon: Shield, color: "#3b82f6", label: "Seguridad" },     // Seguridad/Padres
  { Icon: Rocket, color: "#6B8BB4", label: "Navegación" },    // Navegación
  { Icon: Target, color: "#ef4444", label: "Retos" },         // Retos diarios
  { Icon: HelpCircle, color: "#a855f7", label: "Acertijos" }  // Acertijos
];

export default function FeatureSection({ onNavigate }) {
  const orbitCount = 3;
  const orbitGap = 7; // spacing in rem
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className="feature-section-container relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-16 my-0 flex flex-col md:flex-row items-center justify-between min-h-[30rem] bg-transparent shadow-none border-none dark:border-none backdrop-blur-none rounded-none">
      
      {/* Background gradients for premium feel */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      
      {/* Left side: Heading and Text */}
      <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 font-bold text-sm border border-blue-100 dark:border-blue-900/30 mb-6">
          <Sparkles size={14}/> EXPANDIENDO FRONTERAS
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
          Expande tu mente <br className="hidden md:inline"/>
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent">más allá del cielo</span>
        </h2>
        <p className="text-zinc-550 dark:text-zinc-550 mb-8 max-w-md text-base sm:text-lg font-medium leading-relaxed">
          Navega por múltiples disciplinas diseñadas especialmente para mentes curiosas. Matemáticas, ciencias, programación y lectura en un solo universo.
        </p>
        <div className="flex items-center gap-3">
          <Button 
            onClick={() => onNavigate('catalog')}
            className="rounded-full shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5"
          >
            Explorar Mapa
          </Button>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('pricing')}
            className="rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-white font-bold px-6 py-2.5"
          >
            Suscripción
          </Button>
        </div>
      </div>

      {/* Right side: Orbit animation cropped to 1/4 */}
      <div className="relative w-full md:w-1/2 h-80 md:h-[28rem] flex items-center justify-center md:justify-start overflow-hidden">
        <div className="relative w-[36rem] h-[36rem] md:w-[48rem] md:h-[48rem] translate-y-12 md:translate-y-0 md:translate-x-[40%] flex items-center justify-center">
          
          {/* Center Circle */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-50 dark:bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-center z-20">
            <Rocket className="w-10 h-10 md:w-12 md:h-12 text-[#6B8BB4] animate-pulse" />
          </div>

          {/* Generate Orbits */}
          {[...Array(orbitCount)].map((_, orbitIdx) => {
            const size = `${10 + orbitGap * (orbitIdx + 1)}rem`;
            const angleStep = (2 * Math.PI) / iconsPerOrbit;

            return (
              <div
                key={orbitIdx}
                className="absolute rounded-full border border-dashed border-zinc-250 dark:border-zinc-800"
                style={{
                  width: size,
                  height: size,
                  animation: `spin ${15 + orbitIdx * 8}s linear infinite`,
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
                        className="absolute bg-white dark:bg-zinc-900 rounded-full p-2 border border-zinc-150 dark:border-zinc-800 shadow-lg cursor-pointer hover:scale-110 group transition-all duration-300"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {cfg.Icon && (
                          <div
                            className="flex items-center justify-center relative"
                            style={{
                              animation: `spin-reverse ${15 + orbitIdx * 8}s linear infinite`,
                            }}
                          >
                            <cfg.Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: cfg.color }} />
                            <span className="absolute bottom-full mb-2 bg-zinc-900 dark:bg-zinc-800 text-white text-[10px] font-bold px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow pointer-events-none whitespace-nowrap z-30">
                              {cfg.label}
                            </span>
                          </div>
                        )}
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
