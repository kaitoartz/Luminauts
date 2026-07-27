import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Rocket, FlaskConical, Award, Lock, CreditCard, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { getEmailSuggestion, validateEmailSyntax } from '../../utils/emailValidator';

export default function WaitlistDemoModal({
  isOpen,
  onClose,
  status,
  onSubmitEmail,
  loading,
  setShowPassport
}) {
  const [demoStep, setDemoStep] = useState(1); // 1: Welcome, 2: Trivia, 3: Success
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [email, setEmail] = useState('');
  const [isTeacher, setIsTeacher] = useState(false);

  const handleRestartDemo = () => {
    setDemoStep(1);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleOptionClick = (idx) => {
    setSelectedOption(idx);
    setShowExplanation(true);
    if (idx === 1) {
      setTimeout(() => {
        setDemoStep(3);
      }, 2000);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    if (!validateEmailSyntax(email)) {
      const emailInput = e.target.querySelector('input[type="email"]');
      if (emailInput) {
        emailInput.setCustomValidity("Por favor, ingresa una dirección de correo válida (ejemplo: usuario@dominio.com).");
        emailInput.reportValidity();
      }
      return;
    }
    
    onSubmitEmail({ email, isTeacher });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        data-lenis-prevent="true"
        style={{
          backgroundColor: 'rgba(10, 12, 18, 0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)'
        }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          style={{ backgroundColor: '#141923', color: '#ffffff' }}
          className="bg-[#141923] text-white border border-zinc-800 max-w-md w-full rounded-3xl p-6 relative overflow-hidden"
        >
          {/* Close button */}
          <button 
            onClick={() => { onClose(); handleRestartDemo(); }}
            aria-label="Cerrar demo"
            className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1"
          >
            <X size={18}/>
          </button>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6B8BB4]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Step 1: Welcome & Mission briefing */}
          {demoStep === 1 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-blue-500/15 border border-blue-500/25 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                <Rocket className="text-[#8DA9C4]" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Misión: Aventura Estelar</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  ¡Bienvenido Cadete! Estás a punto de pilotar tu primera prueba orbital. Resuelve la coordenada estelar para completar la misión piloto.
                </p>
              </div>
              <Button 
                onClick={() => setDemoStep(2)}
                className="w-full py-3 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl text-sm font-bold shadow-lg"
              >
                Comenzar Misión Piloto
              </Button>
            </div>
          )}

          {/* Step 2: Interactive Trivia */}
          {demoStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-800 pb-3">
                <span className="flex items-center gap-1"><FlaskConical size={12}/> Sistema: Álgebra Orbital</span>
                <span className="font-mono text-[#E0B0FF]">Misión 1/1</span>
              </div>
              
              <div>
                <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-2">Pregunta de Misión</h4>
                <p className="text-base font-extrabold text-white leading-relaxed">
                  ¿Cuánto es 7 + 8?
                </p>
              </div>

              <div className="grid gap-2.5">
                {["14", "15", "16", "13"].map((opt, idx) => {
                  const isCorrect = idx === 1;
                  const isSelected = selectedOption === idx;
                  let btnStyle = "bg-zinc-950/60 border-zinc-800 hover:border-zinc-700 text-zinc-300";
                  
                  if (isSelected) {
                    btnStyle = isCorrect 
                      ? "bg-green-950/20 border-green-500/50 text-green-300"
                      : "bg-red-950/20 border-red-500/50 text-red-300";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionClick(idx)}
                      className={`w-full py-3.5 px-4 rounded-xl border text-left text-sm font-semibold transition-all flex justify-between items-center ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isSelected && isCorrect && <span className="text-xs text-green-400 font-bold">¡Correcto! +50 XP</span>}
                      {isSelected && !isCorrect && <span className="text-xs text-red-400 font-bold">Desviación orbital</span>}
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-zinc-950/40 border border-zinc-850 rounded-xl text-xs text-zinc-400"
                >
                  {selectedOption === 1 
                    ? "Excelente cálculo. Al alinear estas coordenadas, la nave acelera con precisión hacia la próxima estrella."
                    : "Cálculo orbital incorrecto. El resultado adecuado era 15. ¡Intenta de nuevo para realinear!"
                  }
                  {selectedOption !== 1 && (
                    <button onClick={handleRestartDemo} className="block mt-2 text-[#8DA9C4] font-bold hover:underline">Reiniciar Misión</button>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* Step 3: Success Screen & Waitlist Capture */}
          {demoStep === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-green-500/15 border border-green-500/25 rounded-2xl flex items-center justify-center mx-auto">
                <Award className="text-green-400" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">¡Racha Estelar Iniciada!</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  Has completado tu misión inicial y ganado <span className="text-green-400 font-bold">+50 XP</span>. Tu perfil de Cadete está listo.
                </p>
                
                {/* Visual progress bar */}
                <div className="w-full bg-zinc-950 h-3 rounded-full border border-zinc-800 overflow-hidden mb-6 relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "35%" }}
                    transition={{ duration: 1 }}
                    className="bg-linear-to-r from-blue-500 to-green-400 h-full rounded-full"
                  />
                  <span className="absolute right-2 top-0 text-[8px] font-mono text-zinc-500 leading-none">Nivel 1 (35%)</span>
                </div>

                <div className="bg-zinc-950/60 border border-zinc-800 p-4 rounded-xl text-left space-y-3">
                  <p className="text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5">
                    <Lock size={12} className="text-zinc-400 shrink-0" />
                    <span>Misiones de Lógica, Memoria y Programación bloqueadas en esta demo de prueba.</span>
                  </p>
                  
                  {status === 'success' ? (
                    <Button 
                      type="button"
                      onClick={() => setShowPassport(true)}
                      variant="shimmer"
                      size="md"
                      className="w-full justify-between px-4"
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard size={16} className="text-[#E0B0FF]" />
                        <span>Ver mi Pasaporte de Comandante</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] bg-[#E0B0FF]/10 text-[#E0B0FF] px-2 py-0.5 rounded-full border border-[#E0B0FF]/30">
                        <Sparkles size={11} />
                        <span className="font-bold">ID</span>
                      </div>
                    </Button>
                  ) : (
                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <input 
                        type="email" 
                        required
                        aria-label="Correo electrónico"
                        placeholder="Email para guardar racha y notificar..." 
                        value={email}
                        onChange={(e) => {
                          e.target.setCustomValidity('');
                          setEmail(e.target.value);
                        }}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-blue-500 text-xs text-white"
                      />
                      {getEmailSuggestion(email) && (
                        <div className="w-full text-left">
                          <button
                            type="button"
                            onClick={() => setEmail(getEmailSuggestion(email))}
                            className="text-[11px] text-[#E0B0FF] hover:underline font-semibold bg-[#9059C8]/10 border border-[#9059C8]/30 px-3 py-1.5 rounded-lg cursor-pointer flex items-center justify-between gap-2 w-full"
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles size={12} className="text-[#E0B0FF]" />
                              ¿Quisiste decir <strong className="text-white">{getEmailSuggestion(email)}</strong>?
                            </span>
                            <span className="text-[9px] bg-[#9059C8]/30 px-2 py-0.5 rounded uppercase font-bold text-white shrink-0">Corregir</span>
                          </button>
                        </div>
                      )}
                      <label className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold cursor-pointer select-none">
                        <input 
                          type="checkbox" 
                          checked={isTeacher} 
                          onChange={(e) => setIsTeacher(e.target.checked)}
                          className="w-3.5 h-3.5 rounded border-zinc-800 bg-zinc-900 text-blue-500 accent-[#6B8BB4] focus:ring-0 focus:ring-offset-0"
                        />
                        <span>¿Eres docente? (Activar para pilotos de aula)</span>
                      </label>
                      <Button type="submit" disabled={loading} className="w-full py-2.5 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl text-xs font-bold">
                        {loading ? 'Guardando...' : 'Guardar Racha y Notificarme'}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
