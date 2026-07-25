import React from 'react';
import { Sparkles, Users, Award } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';

export default function WaitlistParentsSection() {
  return (
    <>
      {/* Sección de Características Futuras: Reclutamiento & Lealtad */}
      <section id="section-waitlist-future-perks" className="py-20 md:py-32 bg-transparent text-white text-center relative overflow-hidden waitlist-section-future-perks">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[#e0b0ff] text-[10px] font-bold uppercase tracking-wider mb-4">
              <Sparkles size={12} className="text-yellow-400" /> Próximamente en el Lanzamiento
            </span>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <h2 className="text-3xl md:text-4xl font-black mb-6 text-white tracking-tight">
              Sistemas de Crecimiento & <span className="text-[#e0b0ff]">Fidelización Estelar</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.2} reset={true}>
            <p className="text-sm text-zinc-400 max-w-2xl mx-auto mb-16 font-semibold">
              Cuando despeguemos de forma oficial, los comandantes tendrán acceso a herramientas avanzadas para desbloquear juegos y reducir tarifas.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Card 1: Reclutamiento Estelar */}
            <ScrollReveal origin="bottom" distance={40} delay={0.25} reset={true} className="h-full">
              <LuminautsInteractiveCard
                glowColor="rgba(107, 139, 180, 0.15)"
                className="h-full"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-[#8da9c4]">
                    <Users size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Reclutamiento Estelar (Referidos)</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    Invita a otros Comandantes (padres o profesores) a unirse a la tripulación mediante tu enlace de recomendación oficial.
                  </p>
                  
                  {/* Milestones */}
                  <div className="space-y-3 pt-4 border-t border-zinc-850/60 text-xs font-semibold text-zinc-400">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-900/50">
                      <span className="flex items-center gap-2">👤 1 Cadete Invitado</span>
                      <span className="text-zinc-300">Cofre de Avatares Exclusivos</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-900/50">
                      <span className="flex items-center gap-2">👥 3 Cadetes Invitados</span>
                      <span className="text-blue-400">1 Mes Gratis de Pase Estelar</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2">🚀 5 Cadetes Invitados</span>
                      <span className="text-[#e0b0ff]">2 Meses Gratis + Credencial Oro</span>
                    </div>
                  </div>
                </div>
              </LuminautsInteractiveCard>
            </ScrollReveal>

            {/* Card 2: Rangos de Lealtad */}
            <ScrollReveal origin="bottom" distance={40} delay={0.35} reset={true} className="h-full">
              <LuminautsInteractiveCard
                glowColor="rgba(224, 176, 255, 0.15)"
                className="h-full"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-[#e0b0ff]">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Rangos de Lealtad (Fidelidad)</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed font-medium">
                    Premiaremos la constancia de tu viaje de aprendizaje. Cada mes que tu suscripción permanezca activa, tu rango aumentará.
                  </p>
                  
                  {/* Loyalty perks list */}
                  <div className="space-y-3 pt-4 border-t border-zinc-850/60 text-xs font-semibold text-zinc-400">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold">1</span>
                      <span>Descuentos acumulativos de hasta el 30% mensual.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold">2</span>
                      <span>Avatares y coleccionables legendarios de fundador.</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center text-[10px] font-bold">3</span>
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
      <section id="section-waitlist-testimonials" className="py-20 md:py-36 bg-transparent text-white px-6 relative overflow-hidden waitlist-section-testimonials">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl font-black text-white mb-2">Comentarios de Comandantes</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-400">Padres y profesores que ya han probado nuestros builds de prueba.</p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { text: "Mi hijo por fin disfruta hacer sumas mentales. Se conecta voluntariamente a hacer sus misiones diarias.", author: "María P.", role: "Madre de Leo (9 años)" },
            { text: "El panel de control me permite ver exactamente dónde tienen dificultades en lógica. Útil para el aula.", author: "Prof. Carlos R.", role: "Docente de Primaria" },
            { text: "Los acertijos del laboratorio químico tienen una estética increíble y son muy fáciles de comprender.", author: "Sofi P.", role: "Cadete (10 años)" }
          ].map((test, i) => (
            <ScrollReveal key={i} origin="bottom" distance={30} delay={i * 0.15} reset={true}>
              <div className="bg-zinc-900/30 border border-zinc-850 p-6 rounded-2xl flex flex-col justify-between h-full">
                <p className="text-zinc-300 text-sm italic leading-relaxed mb-6">"{test.text}"</p>
                <div>
                  <div className="font-bold text-sm text-white">{test.author}</div>
                  <div className="text-[11px] text-zinc-550 font-semibold">{test.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
