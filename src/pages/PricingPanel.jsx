import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, XCircle, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';
import '../components/ui/PricingCards.css';
import PageSkeleton from '../components/ui/PageSkeleton';

const PricingPanel = ({ onNavigate, isLoading }) => {
  if (isLoading) {
    return <PageSkeleton view="pricing" />;
  }
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'annual'
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('form');
  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'Misión de reconocimiento inicial para pequeños reclutas galácticos.',
      priceMonthly: 0,
      priceAnnual: 0,
      features: [
        '3 Simulaciones demo autorizadas',
        'Soporte básico de la base',
        '1 Baliza de Aventurero activa',
        'Escaneo de progreso estándar'
      ],
      buttonText: 'Iniciar Reconocimiento',
      color: 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white',
      badge: null
    },
    {
      id: 'pro',
      name: 'Star',
      description: 'Acceso completo a todos los portales de conocimiento y retos de la galaxia.',
      priceMonthly: 4.99,
      priceAnnual: 3.99,
      features: [
        'Acceso ilimitado a más de 30 portales',
        'Consola de control para padres/tutores',
        'Hasta 5 tripulantes registrados',
        'Análisis IA de habilidades estelares',
        'Bitácora de progreso en PDF',
        'Desafíos e incursiones semanales'
      ],
      buttonText: 'Ascender a Comandante',
      color: 'border-blue-500 bg-gradient-to-b from-white to-blue-50/50 dark:from-zinc-900 dark:to-blue-950/20 hover:shadow-blue-500/10 text-zinc-900 dark:text-white ring-2 ring-blue-600/15 dark:ring-blue-500/30',
      badge: 'NIVEL RECOMENDADO'
    },
    {
      id: 'classroom',
      name: 'Astronaut',
      description: 'Licencia de operaciones completas para academias y escuelas de alto rango.',
      priceMonthly: 19.99,
      priceAnnual: 15.99,
      features: [
        'Reclutamiento ilimitado de cadetes',
        'Asignación de misiones and tareas',
        'Consola general de comandancia docente',
        'Canal de soporte prioritario instantáneo',
        'Enlace con sistemas de la Federación',
        'Entrenamiento para instructores'
      ],
      buttonText: 'Desplegar Flota',
      color: 'border-zinc-900 dark:border-zinc-800 hover:border-zinc-800 dark:hover:border-zinc-700 bg-zinc-950 text-white',
      badge: 'ACADEMIAS'
    }
  ];

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCheckoutStep('success');
      // Guardar estado de suscripción mockeado
      localStorage.setItem('eduplay_subscribed_plan', checkoutPlan.name);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-zinc-55 via-white to-zinc-55 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-blue-300/15 to-purple-300/15 dark:from-blue-900/10 dark:to-purple-900/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-cyan-300/10 to-indigo-300/15 dark:from-cyan-900/10 dark:to-indigo-900/10 rounded-full blur-[140px] -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-955/30 border border-blue-100 dark:border-blue-900/30 text-blue-700 dark:text-blue-400 font-bold text-sm shadow-sm mb-6">
          <Sparkles size={16} className="text-yellow-500 animate-pulse"/> Planes simples, sin sorpresas
        </span>

        <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight mb-6">
          Invierte en su <span className="gradient-text">futuro digital</span>
        </h1>
        <p className="text-xl text-zinc-555 dark:text-zinc-400 font-medium max-w-2xl mb-12">
          Elige el plan ideal para expandir la mente de tus hijos y profesores. Cancela en cualquier momento con un solo clic.
        </p>

        {/* Toggle Anual/Mensual */}
        <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200/65 dark:border-zinc-800 shadow-sm mb-16 relative z-10">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow' : 'text-zinc-555 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${billingCycle === 'annual' ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow' : 'text-zinc-555 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'}`}
          >
            Anual
            <span className="absolute -top-3 -right-6 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow border border-white dark:border-zinc-900">
              -20%
            </span>
          </button>
        </div>

        {/* Cards Grid */}
        <div className="pricing-grid relative z-10">
          {plans.map(plan => {
            const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceAnnual;
            const totalAnnually = price * 12;

            return (
              <div key={plan.id} className="pricing-card-wrap card-effect">
                <div className="pricing-card">
                  <div className="card__liquid" />
                  <div className="card__shine" />
                  <div className="card__glow" />
                  <div className="card__content">
                    {plan.badge && <div className="card__badge">{plan.badge}</div>}
                    
                    {/* Visual Area at the top */}
                    <div 
                      className="card__image" 
                      style={{ 
                        '--bg-color': plan.id === 'pro' 
                          ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)' 
                          : plan.id === 'classroom' 
                            ? 'linear-gradient(135deg, #18181b, #27272a)' 
                            : 'linear-gradient(135deg, #94a3b8, #cbd5e1)' 
                      }}
                    >
                      <div className="flex flex-col items-center justify-center h-full text-white p-4">
                        <h2 className="text-xl font-black uppercase tracking-wider text-shadow-sm">{plan.name}</h2>
                      </div>
                    </div>

                    {/* Text Container */}
                    <div className="card__text flex-grow flex flex-col gap-4 text-left">
                      <p className="card__description text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                        {plan.description}
                      </p>
                      
                      {/* Price Display */}
                      <div className="card__price flex items-baseline gap-2">
                        <span className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                          ${price}
                        </span>
                        <span className="text-zinc-400 font-bold text-xs">/ mes</span>
                      </div>
                      
                      {billingCycle === 'annual' && price > 0 && (
                        <div className="text-[10px] text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-950/30 border border-green-200/50 dark:border-green-900/30 px-2.5 py-0.5 rounded-lg inline-block self-start">
                          Facturado anualmente (${totalAnnually.toFixed(2)}/año)
                        </div>
                      )}

                      <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />

                      {/* Feature list */}
                      <ul className="space-y-2.5 text-left flex-grow">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            <span className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-blue-50 dark:bg-blue-955/30 text-blue-600 dark:text-blue-400">
                              <Check size={10} strokeWidth={3}/>
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Footer / CTA Area */}
                    <div className="card__footer pt-4">
                      <Button
                        variant={plan.id === 'classroom' ? 'glow' : plan.id === 'pro' ? 'primary' : 'secondary'}
                        className="w-full py-2.5 text-sm rounded-xl font-bold shadow-lg"
                        onClick={() => setCheckoutPlan(plan)}
                      >
                        {plan.buttonText}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Checkout Simulator Modal */}
      <AnimatePresence>
        {checkoutPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-md"
            style={{ zIndex: 120 }}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 p-8 md:p-10 w-full max-w-md shadow-2xl relative overflow-hidden"
            >
              <button
                onClick={() => { setCheckoutPlan(null); setCheckoutStep('form'); }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-555 dark:text-zinc-400 flex items-center justify-center transition-colors"
                aria-label="Cerrar modal"
              >
                <XCircle size={20} />
              </button>

              {checkoutStep === 'form' ? (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-955/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <Sparkles size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-zinc-900 dark:text-white">Activar {checkoutPlan.name}</h3>
                      <p className="text-sm text-zinc-555 dark:text-zinc-400 font-medium">Prueba simulada de suscripción</p>
                    </div>
                  </div>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="checkout-email" className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                        Correo Electrónico
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="ejemplo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:border-blue-500 focus:outline-none font-medium transition-colors text-base"
                        disabled={loading}
                      />
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-100 dark:border-zinc-800 space-y-2">
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-zinc-500 dark:text-zinc-400">Plan:</span>
                        <span className="text-zinc-950 dark:text-white font-bold">{checkoutPlan.name}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-zinc-500 dark:text-zinc-400">Precio:</span>
                        <span className="text-zinc-950 dark:text-white font-bold">${billingCycle === 'monthly' ? checkoutPlan.priceMonthly : checkoutPlan.priceAnnual} / mes</span>
                      </div>
                      <div className="w-full h-px bg-zinc-250 dark:bg-zinc-700 my-2" />
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-relaxed">
                        Esta es una pasarela de pago simulada. No se realizarán cargos reales a tu tarjeta de crédito o cuenta.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => setCheckoutPlan(null)}
                        className="flex-1 py-4"
                        disabled={loading}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        variant="primary"
                        className="flex-1 py-4 shadow-blue-500/20"
                        disabled={loading}
                      >
                        {loading ? 'Procesando...' : 'Confirmar'}
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-955/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-2">¡Suscripción Activada!</h3>
                  <p className="text-zinc-555 dark:text-zinc-400 font-medium text-sm mb-8">
                    Felicidades, has activado tu membresía simulada para <strong className="text-zinc-800 dark:text-zinc-200">{checkoutPlan.name}</strong>. Disfruta de la mejor experiencia educativa.
                  </p>
                  <Button
                    variant="primary"
                    className="w-full py-4 text-base rounded-2xl"
                    onClick={() => { setCheckoutPlan(null); setCheckoutStep('form'); onNavigate('landing'); }}
                  >
                    Ir al Inicio
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PricingPanel;
