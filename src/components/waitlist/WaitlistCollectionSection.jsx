import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import PackOpening from '../ui/PackOpening';

export default function WaitlistCollectionSection({ onWaitlistClick }) {
  return (
    <>
      {/* Cartas de Colección Section */}
      <section id="section-waitlist-collection" className="py-20 md:py-36 relative bg-transparent text-white overflow-hidden waitlist-section-collection">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal origin="bottom" reset={true}>
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
                ¡Desbloquea y colecciona <br/><span className="text-[#E0B0FF]">cartas exclusivas!</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal origin="bottom" delay={0.15} reset={true}>
              <p className="text-zinc-400 max-w-3xl mx-auto text-lg leading-relaxed">
                Cumple con los desafíos educativos en matemáticas, ciencias y lógica para ganar XP. Descubre datos reales del cosmos y obtén cartas de distintos niveles de rareza: <strong>Nauta, Estelar, SuperEstelar, Cosmos y SuperNova</strong>. <br/><br/>
                <span className="text-[#E0B0FF] font-bold px-4 py-2 bg-[#E0B0FF]/10 rounded-full border border-[#E0B0FF]/20 inline-block mt-2 shadow-[0_0_15px_rgba(224,176,255,0.2)]">
                  ✨ ¡Suscríbete a la beta y asegura tu carta edición exclusiva de Fundador Luminauts!
                </span>
              </p>
            </ScrollReveal>
          </div>
          
          <ScrollReveal origin="bottom" delay={0.3} reset={true}>
            {/* Contenedor para @pokemon-cads-holo-effect-v2 */}
            <div className="w-full flex items-center justify-center p-4">
              <div id="pokemon-cards-holo-effect-v2-container" className="w-full flex flex-wrap justify-center gap-6 xl:gap-8 py-8">
                  <PackOpening />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Pricing Teaser section - Zeigarnik / Commitment */}
      <section id="section-waitlist-pricing" className="py-20 bg-transparent text-white text-center relative overflow-hidden waitlist-section-pricing">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl font-black mb-4">Membresías Estelares</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-400 mb-12">Acceso completo para toda la tripulación escolar o familiar (Precios informativos al lanzamiento).</p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <ScrollReveal origin="left" distance={40} reset={true} className="h-full">
              <div className="bg-zinc-900/40 border border-zinc-850/40 p-6 rounded-3xl text-left flex flex-col justify-between opacity-80 h-full">
                <div>
                  <h3 className="text-lg font-bold text-zinc-400">Plan Cadete (Mensual)</h3>
                  <div className="text-3xl font-black my-3 text-white">$9<span className="text-xs text-zinc-500 font-normal"> / mes</span></div>
                  <ul className="text-xs text-zinc-400 space-y-2 mb-6">
                    <li>• Acceso a todas las misiones (+50)</li>
                    <li>• 1 cuenta de Luminauta</li>
                    <li>• Reporte básico mensual</li>
                  </ul>
                </div>
                <Button onClick={onWaitlistClick} variant="secondary" className="w-full text-xs">Unirse al Waitlist</Button>
              </div>
            </ScrollReveal>
            
            <ScrollReveal origin="right" distance={40} delay={0.15} reset={true} className="h-full">
              <div className="bg-zinc-900/60 border border-blue-500/30 p-6 rounded-3xl text-left relative flex flex-col justify-between ring-1 ring-blue-500/20 h-full">
                <span className="absolute -top-3 right-4 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-[10px] font-black text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">Fundador</span>
                <div>
                  <h3 className="text-lg font-bold text-[#8DA9C4]">Pase Estelar (Anual)</h3>
                  <div className="text-3xl font-black my-3 text-white">$69<span className="text-xs text-zinc-500 font-normal"> / año</span></div>
                  <ul className="text-xs text-zinc-400 space-y-2 mb-6">
                    <li>• Todo el contenido de por vida</li>
                    <li>• Hasta 3 cuentas de cadetes</li>
                    <li>• Reporte estelar diario en tiempo real</li>
                    <li>• Insignias exclusivas de fundador</li>
                  </ul>
                </div>
                <Button onClick={onWaitlistClick} className="w-full text-xs bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white">Asegurar Pase de Fundador</Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
