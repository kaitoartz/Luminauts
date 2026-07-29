import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, UserCheck, Gift, Crown, ShieldCheck, Clock, Heart, Lock } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const LOYALTY_ROADMAP_ITEMS = [
  {
    step: "1 Amigo",
    title: "Insignia Fundadora",
    description: "Fondo e insignia digital exclusiva en perfil.",
    status: "done",
    icon: UserCheck
  },
  {
    step: "3 Amigos",
    title: "Holocard Exclusiva",
    description: "Tarjeta de colección edición especial de fundador.",
    status: "in-progress",
    icon: Gift
  },
  {
    step: "5 Amigos",
    title: "Acceso Demo",
    description: "Acceso anticipado a misiones jugables antes que nadie.",
    status: "upcoming",
    icon: Award
  },
  {
    step: "10 Amigos",
    title: "Pack Fundador",
    description: "Pack digital completo de fundador + beneficios.",
    status: "upcoming",
    icon: Crown
  },
  {
    step: "25 Amigos",
    title: "Muro Exploradores",
    description: "Aparición destacada del niño en Muro de Exploradores.",
    status: "upcoming",
    icon: Sparkles
  }
];

const PARENT_TRUST_PILLARS = [
  {
    icon: ShieldCheck,
    title: "100% Sin Anuncios",
    description: "Espacio protegido sin publicidad ni llamadas de atención comerciales."
  },
  {
    icon: Heart,
    title: "Contenido Curado",
    description: "Desarrollado con pedagogos para potenciar lógica, ciencia y pensamiento crítico."
  },
  {
    icon: Clock,
    title: "Sesiones Cortas",
    description: "Diseñado para pausas activas saludables de 10-15 min, sin scroll infinito."
  },
  {
    icon: Lock,
    title: "Privacidad COPPA & GDPR",
    description: "Solo solicitamos el correo del adulto responsable. Datos familiares 100% seguros."
  }
];



export default function WaitlistParentsSection() {
  return (
    <>
      {/* Sección: Línea de Tiempo de Fidelidad & Recompensas */}
      <section id="section-waitlist-future-perks" className="py-20 md:py-32 bg-transparent text-white text-center relative waitlist-section-future-perks">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Card Container */}
          <div className="bg-[#141923] border border-zinc-800 rounded-2xl p-6 sm:p-10 text-left max-w-4xl mx-auto">
            
            {/* Header inside Card */}
            <div className="mb-10">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E0B0FF] mb-2">
                <Sparkles size={14} />
                <span>Recompensas por Invitar</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Invita familias. Desbloquea recompensas.</h3>
              <p className="text-sm text-zinc-300 mt-1 font-medium">
                Después de registrarte recibirás un enlace único. Compártelo con otros padres y desbloquea recompensas para tu hijo.
              </p>
            </div>

            {/* Timeline Area */}
            <div className="relative">
              
              {/* Desktop Timeline Lines */}
              <div className="hidden md:block absolute left-0 right-0 top-[18px] h-0.5 bg-zinc-850" />
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block absolute left-0 right-0 top-[18px] h-0.5 bg-[#E0B0FF] origin-left"
              />

              {/* Mobile Timeline Lines */}
              <div className="block md:hidden absolute left-3 top-[18px] bottom-[18px] w-0.5 bg-zinc-850" />
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="block md:hidden absolute left-3 top-[18px] bottom-[18px] w-0.5 bg-[#E0B0FF] origin-top"
              />

              {/* Timeline Grid */}
              <div className="relative flex flex-col md:grid md:grid-cols-4 gap-8 md:gap-4 z-10">
                {LOYALTY_ROADMAP_ITEMS.map((item, index) => {
                  const IconComponent = item.icon;
                  const isActive = item.status === "done" || item.status === "in-progress";

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      className="relative pt-0 md:pt-10 flex flex-col md:items-center text-left md:text-center"
                    >
                      {/* Timeline Dot (Reference Style centered on both views) */}
                      <div className="absolute left-3 md:left-1/2 top-[18px] -translate-x-1/2 -translate-y-1/2 z-20">
                        {isActive ? (
                          // Active Dot: Double circle using token color #E0B0FF
                          <div className="h-5.5 w-5.5 rounded-full bg-[#E0B0FF] flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-[#141923]" />
                          </div>
                        ) : (
                          // Inactive Dot: Muted circle
                          <div className="h-5.5 w-5.5 rounded-full bg-[#1e2530] border border-zinc-800 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-zinc-700" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 md:w-full flex flex-col md:items-center pl-10 md:pl-0">
                        <div className="mb-2">
                          {isActive ? (
                            <span className="inline-block text-[11px] font-extrabold px-3 py-1 rounded-full bg-[#E0B0FF] text-[#141923]">
                              {item.step}
                            </span>
                          ) : (
                            <span className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-[#1e2530] border border-zinc-800 text-zinc-450">
                              {item.step}
                            </span>
                          )}
                        </div>

                        {/* Title & Description */}
                        <h4 className="text-sm font-bold text-white mt-1 flex items-center gap-1.5 justify-start md:justify-center">
                          <IconComponent size={14} className={isActive ? "text-[#E0B0FF]" : "text-zinc-500"} />
                          <span>{item.title}</span>
                        </h4>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed font-medium">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sección: Confianza Parental */}
      <section id="section-waitlist-parent-trust" className="py-20 bg-transparent text-white px-6 relative waitlist-section-parent-trust">
        <div className="max-w-6xl mx-auto text-center">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B8BB4]/15 border border-[#6B8BB4]/30 text-[#8DA9C4] text-xs font-extrabold mb-4 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-[#8DA9C4]" /> Seguridad y Filosofía Parental
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Diseñado para niños. Pensado para padres.</h2>
            <p className="text-sm text-zinc-300 max-w-2xl mx-auto font-medium mb-12">
              Un entorno seguro, libre de distracciones y diseñado para estimular la curiosidad sin crear dependencia digital.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {PARENT_TRUST_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={idx} origin="bottom" distance={30} delay={idx * 0.1} reset={true}>
                  <div className="bg-[#141923] border border-zinc-800/80 hover:border-[#6B8BB4]/40 rounded-2xl p-6 h-full flex flex-col justify-between transition-colors">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#6B8BB4]/15 border border-[#6B8BB4]/30 flex items-center justify-center text-[#8DA9C4] mb-4">
                        <Icon size={20} />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Honesto */}
      <section id="section-waitlist-testimonials" className="py-20 md:py-36 bg-transparent text-white px-6 relative waitlist-section-testimonials">
        <div className="max-w-5xl mx-auto text-center">
          <ScrollReveal origin="bottom" distance={30} reset={true}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">Construido junto a familias curiosas</h2>
          </ScrollReveal>
          <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
            <p className="text-sm text-zinc-300 max-w-lg mx-auto font-medium mb-12">
              Estamos invitando a los primeros padres, madres y niños exploradores a probar Luminauts antes del lanzamiento.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
              <div className="bg-[#141923] border border-zinc-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-[#E0B0FF] mb-2">+320</div>
                <div className="text-xs text-zinc-300 font-bold">Familias en lista de espera</div>
              </div>
            </ScrollReveal>
            <ScrollReveal origin="bottom" distance={30} delay={0.2} reset={true}>
              <div className="bg-[#141923] border border-zinc-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-[#8DA9C4] mb-2">+80</div>
                <div className="text-xs text-zinc-300 font-bold">Tarjetas desbloqueadas</div>
              </div>
            </ScrollReveal>
            <ScrollReveal origin="bottom" distance={30} delay={0.3} reset={true}>
              <div className="bg-[#141923] border border-zinc-800 rounded-2xl p-6 text-center">
                <div className="text-3xl font-black text-[#FFE885] mb-2">3</div>
                <div className="text-xs text-zinc-300 font-bold">Demos en prueba privada</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
