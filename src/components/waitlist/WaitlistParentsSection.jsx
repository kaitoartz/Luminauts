import React from 'react';
import { Sparkles, Users, Award, Quote } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';

export default function WaitlistParentsSection() {
  return (
    <>
      {/* Sección de Características Futuras: Reclutamiento & Lealtad */}
      <section id="section-waitlist-future-perks" className="py-20 md:py-32 bg-transparent text-white text-center relative waitlist-section-future-perks">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E0B0FF]/10 border border-[#E0B0FF]/20 text-[#E0B0FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles size={13} className="text-[#E0B0FF]" /> Próximamente en el Lanzamiento
            </span>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tight">
              Sistemas de Crecimiento & <span className="text-[#E0B0FF]">Fidelización Estelar</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.2} reset={true}>
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
              Cuando despeguemos de forma oficial, los comandantes tendrán acceso a herramientas avanzadas para desbloquear juegos y reducir tarifas.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Card 1: Reclutamiento Estelar */}
            <ScrollReveal origin="bottom" distance={40} delay={0.25} reset={true} className="h-full">
              <LuminautsInteractiveCard
                interactive={false}
                glowColor="rgba(107, 139, 180, 0.15)"
                className="h-full"
              >
                <div className="space-y-5 p-2">
                  <div className="w-12 h-12 bg-[#8DA9C4]/10 border border-[#8DA9C4]/20 rounded-2xl flex items-center justify-center text-[#8DA9C4]">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Reclutamiento Estelar (Referidos)</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    Invita a otros Comandantes (padres o profesores) a unirse a la tripulación mediante tu enlace de recomendación oficial.
                  </p>
                  
                  {/* Milestones */}
                  <div className="space-y-3 pt-4 border-t border-zinc-800/60 text-xs font-semibold text-zinc-400">
                    <div className="flex justify-between items-center pb-2.5 border-b border-zinc-900/60">
                      <span className="flex items-center gap-2">👤 1 Cadete Invitado</span>
                      <span className="text-zinc-300">Cofre de Avatares Exclusivos</span>
                    </div>
                    <div className="flex justify-between items-center pb-2.5 border-b border-zinc-900/60">
                      <span className="flex items-center gap-2">👥 3 Cadetes Invitados</span>
                      <span className="text-[#8DA9C4]">1 Mes Gratis de Pase Estelar</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">🚀 5 Cadetes Invitados</span>
                      <span className="text-[#E0B0FF] font-bold">2 Meses Gratis + Credencial Oro</span>
                    </div>
                  </div>
                </div>
              </LuminautsInteractiveCard>
            </ScrollReveal>

            {/* Card 2: Rangos de Lealtad */}
            <ScrollReveal origin="bottom" distance={40} delay={0.35} reset={true} className="h-full">
              <LuminautsInteractiveCard
                interactive={false}
                glowColor="rgba(224, 176, 255, 0.15)"
                className="h-full"
              >
                <div className="space-y-5 p-2">
                  <div className="w-12 h-12 bg-[#E0B0FF]/10 border border-[#E0B0FF]/20 rounded-2xl flex items-center justify-center text-[#E0B0FF]">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Rangos de Lealtad (Fidelidad)</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    Premiaremos la constancia de tu viaje de aprendizaje. Cada mes que tu suscripción permanezca activa, tu rango aumentará.
                  </p>
                  
                  {/* Loyalty perks list */}
                  <div className="space-y-3 pt-4 border-t border-zinc-800/60 text-xs font-semibold text-zinc-400">
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#E0B0FF]/10 text-[#E0B0FF] border border-[#E0B0FF]/20 flex items-center justify-center text-[10px] font-bold">1</span>
                      <span>Descuentos acumulativos de hasta el 30% mensual.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#E0B0FF]/10 text-[#E0B0FF] border border-[#E0B0FF]/20 flex items-center justify-center text-[10px] font-bold">2</span>
                      <span>Avatares y coleccionables legendarios de fundador.</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#E0B0FF]/10 text-[#E0B0FF] border border-[#E0B0FF]/20 flex items-center justify-center text-[10px] font-bold">3</span>
                      <span>Acceso anticipado prioritario a nuevos portales de juegos.</span>
                    </div>
                  </div>
                </div>
              </LuminautsInteractiveCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="section-waitlist-testimonials" className="py-20 md:py-36 bg-transparent text-white px-6 relative waitlist-section-testimonials">
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Comentarios de Comandantes</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-400 max-w-md mx-auto font-medium">Padres y profesores que ya han probado nuestros builds de prueba.</p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {[
            { text: "Mi hijo por fin disfruta hacer sumas mentales. Se conecta voluntariamente a hacer sus misiones diarias.", author: "María P.", role: "Madre de Leo (9 años)", glow: "rgba(141, 169, 196, 0.15)" },
            { text: "El panel de control me permite ver exactamente dónde tienen dificultades en lógica. Útil para el aula.", author: "Prof. Carlos R.", role: "Docente de Primaria", glow: "rgba(224, 176, 255, 0.15)" },
            { text: "Los acertijos del laboratorio químico tienen una estética increíble y son muy fáciles de comprender.", author: "Sofi P.", role: "Cadete (10 años)", glow: "rgba(107, 139, 180, 0.15)" }
          ].map((test, i) => (
            <ScrollReveal key={i} origin="bottom" distance={30} delay={i * 0.15} reset={true} className="h-full">
              <LuminautsInteractiveCard
                interactive={false}
                glowColor={test.glow}
                className="h-full"
              >
                <div className="flex flex-col justify-between h-full p-2">
                  <div className="mb-6">
                    <Quote size={20} className="text-[#8DA9C4]/60 mb-3" />
                    <p className="text-zinc-300 text-sm leading-relaxed font-medium">"{test.text}"</p>
                  </div>
                  <div className="pt-4 border-t border-zinc-800/50">
                    <div className="font-bold text-sm text-white">{test.author}</div>
                    <div className="text-xs text-[#8DA9C4] font-semibold">{test.role}</div>
                  </div>
                </div>
              </LuminautsInteractiveCard>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
