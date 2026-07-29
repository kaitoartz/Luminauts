import React from 'react';
import { ArrowRight, Zap, Brain, FlaskConical } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import PremiumGameCard from '../ui/PremiumGameCard';

export default function WaitlistGamesSection({ games = [], onShowDemoModal }) {
  // Fallback to sample games in development
  const sampleGames = games && games.length > 0 ? games.slice(0, 3) : [
    { id: "g1", title: "Aventura Matemática", subject: "Matemáticas", level: "8-10", duration: "10 min", points: 150, color: "from-[#3B6290] to-[#6B8BB4]", bg: "bg-blue-900/10", icon: Zap, image: "g1", description: "Resuelve acertijos matemáticos y sube de nivel entrenando tu cerebro.", tag: "En Desarrollo" },
    { id: "g2", title: "Memoria Espacial", subject: "Memoria", level: "5-7", duration: "5 min", points: 100, color: "from-[#9059C8] to-[#E0B0FF]", bg: "bg-purple-900/10", icon: Brain, image: "g2", description: "Pon a prueba tu retención visual y memoriza los patrones en el espacio.", tag: "En Desarrollo" },
    { id: "g3", title: "Laboratorio Químico", subject: "Ciencias", level: "11-13", duration: "15 min", points: 200, color: "from-[#51759C] to-[#8DA9C4]", bg: "bg-green-900/10", icon: FlaskConical, image: "g3", description: "Combina elementos y experimenta en nuestro laboratorio virtual interactivo.", locked: true }
  ];

  return (
    <section id="section-waitlist-games" className="py-20 md:py-36 relative bg-transparent text-white waitlist-section-games">

      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col sm:flex-row justify-between items-center gap-4">
        <ScrollReveal origin="left" distance={30} reset={true} className="flex-1">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6B8BB4]/15 border border-[#6B8BB4]/30 text-[#8DA9C4] text-xs font-bold mb-2">
              <span>Próximamente • Demos Cortos Interactivos</span>
            </div>
            <h2 className="text-3xl font-black mb-2">Prueba las primeras misiones pronto</h2>
            <p className="text-sm text-zinc-300">Estamos preparando demos jugables cortos para que tu hijo explore Luminauts antes del lanzamiento.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal origin="right" distance={30} delay={0.1} reset={true}>
          <Button 
            variant="secondary" 
            onClick={onShowDemoModal} 
            className="gap-2 bg-[#9059C8]/20 border border-[#9059C8]/40 hover:bg-[#9059C8]/30 text-[#E0B0FF] rounded-xl text-xs py-2.5 px-5 font-bold shadow-[0_0_15px_rgba(144,89,200,0.15)]"
          >
            Avísame cuando los demos estén listos <ArrowRight size={14}/>
          </Button>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleGames.map((game) => (
            <ScrollReveal key={game.id} origin="bottom" distance={40} reset={true}>
              <div className="relative">
                <PremiumGameCard 
                  {...game} 
                  isDark={true}
                  interactive={false}
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
