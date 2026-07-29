import React from 'react';
import { Rocket, CreditCard, Star, ArrowRight } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import LuminautsInteractiveCard from '../ui/LuminautsInteractiveCard';
import FeatureSection from '../ui/stack-feature-section';

export default function WaitlistFeaturesSection({ onShowDemoModal }) {
  return (
    <>
      {/* Feature Highlights Grid */}
      <section id="section-waitlist-features" className="py-20 md:py-36 bg-transparent text-white px-6 relative overflow-visible waitlist-section-features">

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal origin="bottom" reset={true}>
              <h2 className="text-3xl lg:text-4xl font-black mb-4">
                No es solo una lista de espera.
              </h2>
            </ScrollReveal>
            <ScrollReveal origin="bottom" delay={0.15} reset={true}>
              <p className="text-zinc-300 max-w-2xl mx-auto text-base font-medium">
                Es la entrada anticipada al universo Luminauts.
              </p>
            </ScrollReveal>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Misiones Jugables", desc: "Mini experiencias interactivas para aprender explorando ciencia, lógica y creatividad.", icon: Rocket, color: "text-[#E0B0FF]" },
              { title: "Tarjetas Coleccionables", desc: "Personajes, criaturas y artefactos del universo Luminauts con distintas rarezas.", icon: CreditCard, color: "text-[#8DA9C4]" },
              { title: "Recompensas Fundadoras", desc: "Contenido exclusivo para quienes se unan antes del lanzamiento oficial.", icon: Star, color: "text-[#FFE885]" }
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
      <div id="section-waitlist-details" className="feature-section-wrapper bg-transparent text-white relative overflow-visible waitlist-section-details">
        <ScrollReveal origin="bottom" distance={30} reset={true}>
          <FeatureSection onNavigate={(target) => {
            if (target === 'pricing') {
              const el = document.getElementById('section-waitlist-pricing');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              onShowDemoModal();
            }
          }} />
        </ScrollReveal>
      </div>
    </>
  );
}
