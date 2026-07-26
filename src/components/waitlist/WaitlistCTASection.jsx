import React from 'react';
import { Rocket, Share2, Copy, CreditCard, Sparkles } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import Button from '../ui/Button';
import { getEmailSuggestion } from '../../utils/emailValidator';

export default function WaitlistCTASection({
  status,
  setShowPassport,
  handleSubmit,
  emailInputRef,
  email,
  setEmail,
  loading,
  isTeacher,
  setIsTeacher
}) {
  return (
    <section id="section-waitlist-final-cta" className="py-36 md:py-48 bg-transparent px-6 lg:px-8 text-center overflow-hidden relative text-zinc-900 dark:text-white waitlist-section-final-cta">

      <div className="max-w-3xl mx-auto relative z-10 text-zinc-900 dark:text-white">
        <ScrollReveal origin="top" distance={30} reset={true}>
          <Rocket size={48} className="mx-auto mb-8 text-[#51759C] dark:text-[#8DA9C4]" />
        </ScrollReveal>
        <ScrollReveal origin="bottom" distance={30} delay={0.1} reset={true}>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-zinc-900 dark:text-white">Asegura tu carta de Fundador</h2>
        </ScrollReveal>
        <ScrollReveal origin="bottom" distance={30} delay={0.2} reset={true}>
          <p className="text-xl text-zinc-650 dark:text-zinc-350 mb-10 leading-relaxed font-medium">
            Únete al waitlist oficial hoy. Obtén acceso prioritario al despegue y asegura tus beneficios exclusivos para la primera generación de cadetes.
          </p>
        </ScrollReveal>
        <ScrollReveal origin="bottom" distance={30} delay={0.3} reset={true}>
          <div className="flex-container w-full max-w-lg mx-auto z-20 pointer-events-auto">
            {status === 'success' ? (
              <div className="w-full max-w-md mx-auto flex flex-col gap-6 text-left bg-zinc-900/60 border border-zinc-800 p-6 md:p-8 rounded-2xl relative overflow-hidden">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-black text-white">¡Misión de Registro Iniciada!</h3>
                </div>

                <Button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPassport(true);
                  }}
                  className="w-full py-3.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-[#E0B0FF]" />
                  <span>Ver mi Pasaporte de Comandante</span>
                </Button>

                <div className="w-full h-px bg-zinc-800 my-1" />

                {/* Share/Referral code block directly on page */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-white flex items-center gap-1.5">
                    <Share2 size={14} className="text-[#8DA9C4]" />
                    Invita a otros Comandantes
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-semibold leading-relaxed">
                    Comparte tu invitación para desbloquear beneficios exclusivos de fundador cuando abramos la estación:
                  </p>
                  
                  <button
                    onClick={async () => {
                      const shareText = `¡Acabo de registrarme como Comandante en LumiNauts! Obtén tu credencial estelar para la estación educativa del futuro. Únete a la tripulación aquí: ${window.location.origin}`;
                      try {
                        await navigator.clipboard.writeText(shareText);
                        alert('¡Enlace de invitación copiado al portapapeles!');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    className="w-full py-3 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Copy size={14} />
                    <span>Copiar Enlace de Invitación</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="w-full flex flex-col gap-3 items-center">
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800">
                  <label htmlFor="cta-email-input" className="sr-only">Correo electrónico</label>
                  <input 
                    id="cta-email-input"
                    ref={emailInputRef}
                    type="email" 
                    required 
                    aria-label="Correo electrónico"
                    placeholder="Correo de papá, mamá o profesor..." 
                    value={email}
                    onChange={(e) => {
                      e.target.setCustomValidity('');
                      setEmail(e.target.value);
                    }}
                    className="flex-1 bg-transparent px-4 py-2.5 text-white placeholder-zinc-500 font-semibold focus:outline-none text-sm"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="py-2.5 px-5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-lg font-bold text-xs whitespace-nowrap">
                    {loading ? 'Registrando...' : 'Unirse al Waitlist'}
                  </Button>
                </form>

                {getEmailSuggestion(email) && (
                  <div className="w-full text-left px-1">
                    <button
                      type="button"
                      onClick={() => setEmail(getEmailSuggestion(email))}
                      className="text-xs text-[#E0B0FF] hover:underline font-semibold bg-[#9059C8]/10 border border-[#9059C8]/30 px-3 py-1.5 rounded-lg cursor-pointer flex items-center justify-between gap-2 w-full sm:w-auto"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E0B0FF]" />
                        ¿Quisiste decir <strong className="text-white">{getEmailSuggestion(email)}</strong>?
                      </span>
                      <span className="text-[10px] bg-[#9059C8]/30 px-2 py-0.5 rounded uppercase font-bold text-white shrink-0">Corregir</span>
                    </button>
                  </div>
                )}

                <label className="flex items-center gap-2 text-xs text-zinc-400 font-bold cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={isTeacher} 
                    onChange={(e) => setIsTeacher(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-blue-500 accent-[#6B8BB4] focus:ring-0 focus:ring-offset-0"
                  />
                  <span>¿Eres docente? (Activar para pilotos de aula)</span>
                </label>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
