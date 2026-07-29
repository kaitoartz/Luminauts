import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, ShieldCheck, Sparkles, GraduationCap, CreditCard, Clock } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    icon: HelpCircle,
    question: '¿Para qué edad es Luminauts?',
    answer: 'Ideal para niños curiosos en etapa escolar (6 a 14 años). Ajustaremos las misiones según el feedback de las primeras familias fundadoras.'
  },
  {
    id: 'faq-2',
    icon: CreditCard,
    question: '¿Tiene costo registrarse?',
    answer: 'No. El registro anticipado es completamente gratis. Solo necesitas el correo de un adulto responsable.'
  },
  {
    id: 'faq-3',
    icon: Sparkles,
    question: '¿Qué recibo si me uno ahora?',
    answer: 'Acceso anticipado, novedades de lanzamiento, una tarjeta Founder Edition exclusiva y la posibilidad de desbloquear más premios invitando familias.'
  },
  {
    id: 'faq-4',
    icon: ShieldCheck,
    question: '¿Mi hijo necesita registrarse?',
    answer: 'No. El correo debe ser de un adulto responsable. Luminauts cumple con COPPA y GDPR-K para protección de datos de menores.'
  },
  {
    id: 'faq-5',
    icon: Clock,
    question: '¿Cuándo estarán los demos?',
    answer: 'Estamos preparando las primeras misiones jugables. Los inscritos serán los primeros en recibir acceso cuando estén disponibles.'
  },
  {
    id: 'faq-6',
    icon: GraduationCap,
    question: '¿Cómo funcionan las recompensas?',
    answer: 'Después de registrarte recibirás un enlace único. Cada familia que se una desde tu enlace suma progreso para desbloquear recompensas exclusivas para tu hijo.'
  }
];

export default function WaitlistFAQSection() {
  const [openId, setOpenId] = useState('faq-1');

  const toggleItem = (id) => {
    setOpenId(prev => prev === id ? null : id);
  };

  return (
    <section id="section-waitlist-faq" className="py-24 px-6 lg:px-8 relative z-10 max-w-5xl mx-auto waitlist-section-faq text-left">
      <ScrollReveal origin="bottom" distance={30}>
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-[#8DA9C4] font-medium">
            <HelpCircle size={14} className="text-[#E0B0FF]" />
            <span>Centro de Misión • Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
            Respuestas para <span className="text-[#8DA9C4]">Padres y Educadores</span>
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto font-medium leading-relaxed">
            Todo lo que necesitas saber sobre la seguridad, el modelo pedagógico y los beneficios del registro anticipado.
          </p>
        </div>
      </ScrollReveal>

      <div className="space-y-4 max-w-3xl mx-auto">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openId === item.id;
          const IconComp = item.icon;

          return (
            <ScrollReveal key={item.id} origin="bottom" distance={20} delay={index * 0.08}>
              <div 
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-zinc-900/80 border-[#8DA9C4]/40 shadow-[0_4px_25px_rgba(141,169,196,0.1)]' 
                    : 'bg-zinc-900/35 border-zinc-800/60 hover:border-zinc-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isOpen 
                        ? 'bg-[#8DA9C4]/20 border-[#8DA9C4]/40 text-[#8DA9C4]' 
                        : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-400'
                    }`}>
                      <IconComp size={18} />
                    </div>
                    <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-zinc-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#8DA9C4]' : ''}`} 
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/40 font-medium">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
