import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Award, UserCheck, Gift, Crown, Quote } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const LOYALTY_ROADMAP_ITEMS = [
  {
    step: "Nivel 1",
    title: "Cofre de Avatares",
    description: "1 Cadete o 1er mes. Avatares de fundador.",
    status: "done",
    icon: UserCheck
  },
  {
    step: "Nivel 2",
    title: "Pase Estelar Gratis",
    description: "3 Cadetes o 3er mes. 1 mes de acceso libre.",
    status: "in-progress",
    icon: Gift
  },
  {
    step: "Nivel 3",
    title: "Credencial de Oro",
    description: "5 Cadetes o 6to mes. 2 meses gratis + insignia.",
    status: "upcoming",
    icon: Award
  },
  {
    step: "Nivel 4",
    title: "Acceso Prioritario VIP",
    description: "10 Cadetes o 1 año. Acceso beta ilimitado.",
    status: "upcoming",
    icon: Crown
  }
];

const TESTIMONIALS = [
  {
    text: "Mi hijo por fin disfruta hacer sumas mentales. Se conecta voluntariamente a hacer sus misiones diarias.",
    author: "María P.",
    role: "Madre de Leo (9 años)"
  },
  {
    text: "El panel de control me permite ver exactamente dónde tienen dificultades en lógica. Útil para el aula.",
    author: "Prof. Carlos R.",
    role: "Docente de Primaria"
  },
  {
    text: "Los acertijos del laboratorio químico tienen una estética increíble y son muy fáciles de comprender.",
    author: "Sofi P.",
    role: "Cadete (10 años)"
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
                <span>Programa de Fidelización Estelar</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">Niveles de Fidelidad & Recompensas</h3>
              <p className="text-sm text-zinc-400 mt-1 font-medium">
                Desbloquea beneficios invitando cadetes o manteniendo tu cuenta activa.
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

      {/* Testimoniales de Comandantes */}
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
          {TESTIMONIALS.map((test, i) => (
            <ScrollReveal key={i} origin="bottom" distance={30} delay={i * 0.15} reset={true} className="h-full">
              <div className="bg-[#141923] border border-zinc-800 rounded-xl p-6 h-full flex flex-col justify-between">
                <div className="mb-6">
                  <Quote size={18} className="text-[#8DA9C4] mb-3 opacity-60" />
                  <p className="text-zinc-300 text-sm leading-relaxed font-medium">"{test.text}"</p>
                </div>
                <div className="pt-4 border-t border-zinc-800/80">
                  <div className="font-bold text-sm text-white">{test.author}</div>
                  <div className="text-xs text-[#8DA9C4] font-semibold">{test.role}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
