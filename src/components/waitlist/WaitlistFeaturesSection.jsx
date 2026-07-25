import React from 'react';
import { Rocket, Shield, BookOpen, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';
import FeatureSection from '../ui/stack-feature-section';

export default function WaitlistFeaturesSection({ onShowDemoModal }) {
  return (
    <>
      {/* Feature Highlights Grid */}
      <section id="section-waitlist-features" className="py-20 md:py-36 bg-transparent text-white px-6 relative overflow-hidden waitlist-section-features">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal origin="bottom" reset={true}>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                Exploración que <span className="text-[#E0B0FF]">fascina.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal origin="bottom" delay={0.15} reset={true}>
              <p className="text-zinc-400 max-w-2xl mx-auto text-base">
                Un entorno gamificado para despertar el ingenio natural de los Luminautas.
              </p>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Navegación Lúdica", desc: "Ganancia de XP, rangos estelares y constelaciones que se completan al avanzar en los retos.", icon: Rocket, color: "text-[#E0B0FF]" },
              { title: "Control de Misión", desc: "Reportes automáticos para padres/profesores. Mapeo de áreas pedagógicas en tiempo real.", icon: Shield, color: "text-[#8DA9C4]" },
              { title: "Plan pedagógico", desc: "Misiones estructuradas basadas en currículos académicos internacionales de lógica y cálculo.", icon: BookOpen, color: "text-[#6B8BB4]" }
            ].map((b, i) => (
              <ScrollReveal key={i} origin="bottom" distance={30} delay={i * 0.15} reset={true}>
                <LuminautsInteractiveCard
                  onClick={onShowDemoModal}
                  glowColor={i === 0 ? 'rgba(224, 176, 255, 0.15)' : i === 1 ? 'rgba(141, 169, 196, 0.15)' : 'rgba(107, 139, 180, 0.15)'}
                >
                  <div>
                    <div className="flex items-center gap-3 text-lg font-bold mb-4">
                      <b.icon size={22} className={b.color} />
                      <span className="text-white">{b.title}</span>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">{b.desc}</p>
                  </div>
                  <div className="text-xs font-semibold text-[#8DA9C4] group-hover:text-[#E0B0FF] transition-colors flex items-center gap-1.5 mt-2 text-left self-start">
                    Probar demo <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </LuminautsInteractiveCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categories / Feature Section Accordion/Stack */}
      <div id="section-waitlist-details" className="feature-section-wrapper bg-transparent text-white relative overflow-hidden waitlist-section-details">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent"></div>
        <ScrollReveal origin="bottom" distance={30} reset={true}>
          <FeatureSection onNavigate={onShowDemoModal} />
        </ScrollReveal>
      </div>
    </>
  );
}
