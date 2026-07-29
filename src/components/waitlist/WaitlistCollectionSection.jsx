import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import PackOpening from '../ui/PackOpening';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';
import { Sparkles, Check } from 'lucide-react';

export default function WaitlistCollectionSection({ onWaitlistClick }) {
  return (
    <>
      {/* Cartas de Colección Section */}
      <section id="section-waitlist-collection" className="py-20 md:py-36 relative bg-transparent text-white waitlist-section-collection">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal origin="bottom" reset={true}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E0B0FF]/10 border border-[#E0B0FF]/30 text-[#E0B0FF] text-xs font-extrabold mb-4 uppercase tracking-wider">
                <Sparkles size={14} className="text-[#FFE885]" /> Sello de Colección Fundador
              </div>
              <h2 className="text-4xl lg:text-5xl font-black mb-6">
                Colecciona exploradores, criaturas y <br/><span className="text-[#E0B0FF]">artefactos del universo Luminauts</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal origin="bottom" delay={0.15} reset={true}>
              <p className="text-zinc-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-medium mb-6">
                Cada misión completada desbloquea tarjetas educativas con personajes, curiosidades científicas y desafíos de lógica. Descubre cartas de distintas rarezas: <strong className="text-[#8DA9C4]">Común</strong>, <strong className="text-[#E0B0FF]">Rara</strong> y la codiciada <strong className="text-[#FFE885]">Founder Edition</strong>.
              </p>
              
              {/* Founder Pack Offer Highlights */}
              <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 text-left my-8">
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-[#E0B0FF] uppercase tracking-wider">Beneficio 1</span>
                  <span className="text-xs font-bold text-white mt-1">Demos Jugables</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-[#FFE885] uppercase tracking-wider">Beneficio 2</span>
                  <span className="text-xs font-bold text-white mt-1">Holocard Founder</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-[#8DA9C4] uppercase tracking-wider">Beneficio 3</span>
                  <span className="text-xs font-bold text-white mt-1">Nombre Reservado</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
                  <span className="text-[10px] font-bold text-[#9059C8] uppercase tracking-wider">Beneficio 4</span>
                  <span className="text-xs font-bold text-white mt-1">Premios por Invitar</span>
                </div>
              </div>

              <span className="text-[#FFE885] font-bold px-4 py-2.5 bg-[#FFE885]/10 rounded-full border border-[#FFE885]/30 inline-flex items-center gap-2 mt-2 shadow-[0_0_25px_rgba(255,232,133,0.15)] text-xs sm:text-sm">
                <Sparkles size={15} className="text-[#FFE885]" /> Reserva tu lugar antes del lanzamiento para desbloquear la Holocard Founder exclusivas.
              </span>
            </ScrollReveal>
          </div>
          
          <ScrollReveal origin="bottom" delay={0.3} reset={true}>
            {/* Contenedor para @pokemon-cards-holo-effect-v2 */}
            <div className="w-full flex items-center justify-center">
              <div id="pokemon-cards-holo-effect-v2-container" className="w-full flex flex-wrap justify-center gap-6 xl:gap-8">
                <PackOpening />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
      
      {/* Pricing Teaser section */}
      <section id="section-waitlist-pricing" className="py-20 bg-transparent text-white text-center relative waitlist-section-pricing">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Membresías Estelares</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-400 mb-12 max-w-xl mx-auto font-medium">Acceso completo para toda la tripulación escolar o familiar. Precios informativos al lanzamiento.</p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            {/* Plan Cadete */}
            <ScrollReveal origin="left" distance={40} reset={true} className="h-full">
              <LuminautsInteractiveCard
                interactive={true}
                glowColor="rgba(107, 139, 180, 0.25)"
                className="h-full cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col justify-between h-full p-2">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-300 mb-1">Plan Cadete</h3>
                    <p className="text-xs text-zinc-500 font-semibold mb-4">Pase mensual flexible</p>
                    <div className="text-4xl font-black my-4 text-white">$9<span className="text-xs text-zinc-500 font-normal"> / mes</span></div>
                    <ul className="text-xs text-zinc-400 space-y-3 mb-8 font-medium">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8DA9C4]" /> Acceso a todas las misiones (+50)</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8DA9C4]" /> 1 cuenta de Luminauta</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#8DA9C4]" /> Reporte básico mensual</li>
                    </ul>
                  </div>
                  <Button onClick={onWaitlistClick} variant="secondary" size="sm" className="w-full text-xs py-3 rounded-xl font-bold">Unirse al Waitlist</Button>
                </div>
              </LuminautsInteractiveCard>
            </ScrollReveal>
            
            {/* Pase Estelar (Fundador) */}
            <ScrollReveal origin="right" distance={40} delay={0.15} reset={true} className="h-full">
              <LuminautsInteractiveCard
                interactive={true}
                glowColor="rgba(224, 176, 255, 0.3)"
                className="h-full relative cursor-pointer transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col justify-between h-full p-2">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-lg font-bold text-[#E0B0FF]">Pase Estelar</h3>
                      <span className="bg-[#E0B0FF]/15 text-[#E0B0FF] border border-[#E0B0FF]/30 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider uppercase">Fundador</span>
                    </div>
                    <p className="text-xs text-zinc-400 font-semibold mb-4">Pase anual de acceso completo</p>
                    <div className="text-4xl font-black my-4 text-white">$69<span className="text-xs text-zinc-500 font-normal"> / año</span></div>
                    <ul className="text-xs text-zinc-300 space-y-3 mb-8 font-medium">
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#E0B0FF]" /> Todo el contenido de por vida</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#E0B0FF]" /> Hasta 3 cuentas de cadetes</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#E0B0FF]" /> Reporte estelar diario en tiempo real</li>
                      <li className="flex items-center gap-2"><Check size={14} className="text-[#E0B0FF]" /> Insignias exclusivas de fundador</li>
                    </ul>
                  </div>
                  <Button onClick={onWaitlistClick} variant="primary" size="sm" className="w-full text-xs py-3 rounded-xl font-bold">Asegurar Pase de Fundador</Button>
                </div>
              </LuminautsInteractiveCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
