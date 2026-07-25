import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, BookOpen, Cookie, Mail, Send, CheckCircle2, FileText, Lock } from 'lucide-react';
import Button from './Button';

export default function LegalInfoModal({ type, isOpen, onClose }) {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', role: 'Madre/Padre' });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen || !type) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      onClose();
    }, 2200);
  };

  const getTitleAndIcon = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Política de Privacidad y Protección Infantil',
          subtitle: 'Última actualización: Julio 2026 • Estándares COPPA y GDPR-K',
          icon: Shield,
          color: 'text-[#8DA9C4]',
          bg: 'bg-[#8DA9C4]/10 border-[#8DA9C4]/20'
        };
      case 'terms':
        return {
          title: 'Términos de Servicio del Portal LumiNauts',
          subtitle: 'Última actualización: Julio 2026 • Reglamento de la Estación Espacial',
          icon: BookOpen,
          color: 'text-[#E0B0FF]',
          bg: 'bg-[#E0B0FF]/10 border-[#E0B0FF]/20'
        };
      case 'cookies':
        return {
          title: 'Declaración de Cookies y Almacenamiento Local',
          subtitle: 'Información transparente sobre el uso de almacenamiento del navegador.',
          icon: Cookie,
          color: 'text-[#FDF9E2]',
          bg: 'bg-[#FDF9E2]/10 border-[#FDF9E2]/20'
        };
      case 'contact':
        return {
          title: 'Contacto con el Centro de Misión',
          subtitle: '¿Tienes preguntas o sugerencias para nuestra tripulación pedagógica?',
          icon: Mail,
          color: 'text-[#8DA9C4]',
          bg: 'bg-[#8DA9C4]/10 border-[#8DA9C4]/20'
        };
      default:
        return { title: '', subtitle: '', icon: Shield, color: '', bg: '' };
    }
  };

  const config = getTitleAndIcon();
  const IconComponent = config.icon;

  const modalContent = (
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none"
      >
        <motion.div
          initial={{ scale: 0.95, y: 16 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 16 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          style={{ backgroundColor: '#141923', color: '#ffffff' }}
          className="bg-[#141923] border border-zinc-800 max-w-3xl w-full rounded-3xl p-6 sm:p-8 relative shadow-2xl overflow-hidden text-left text-white select-text"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors z-20 cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Ambient Glow background */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#E0B0FF]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center gap-4 mb-6 relative z-10 border-b border-zinc-800/80 pb-5">
            <div className={`w-12 h-12 rounded-2xl ${config.bg} border flex items-center justify-center shrink-0`}>
              <IconComponent size={24} className={config.color} />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">{config.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium">{config.subtitle}</p>
            </div>
          </div>

          {/* Body Content - Scroll Extenso & Ultra Fluido */}
          <div 
            data-lenis-prevent="true"
            style={{ 
              overscrollBehavior: 'contain', 
              WebkitOverflowScrolling: 'touch' 
            }}
            className="max-h-[60vh] overflow-y-auto pr-3 space-y-6 text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed custom-scrollbar relative z-10"
          >
            {type === 'privacy' && (
              <div className="space-y-6 text-zinc-300">
                <div className="p-4 bg-[#0d111a] border border-zinc-800/80 rounded-2xl space-y-2">
                  <h4 className="font-extrabold text-[#8DA9C4] text-sm flex items-center gap-2">
                    <Lock size={16} /> 1. Declaración de Principios de Privacidad Infantil
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    En <strong>LumiNauts</strong>, la seguridad y la privacidad de los cadetes son el núcleo fundamental de nuestra arquitectura de diseño. Cumplimos rigurosamente con la Ley de Protección de la Privacidad Infantil en Línea (<strong>COPPA</strong>), el Reglamento General de Protección de Datos aplicable a menores (<strong>GDPR-K</strong>) y normativas internacionales de protección de datos en entornos educativos.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">2. Información que Recopilamos</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    No solicitamos ni almacenamos datos de identificación personal directa de los estudiantes menores de edad (como apellidos reales, teléfonos o direcciones físicas). La información registrada incluye únicamente:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-400 leading-relaxed">
                    <li><strong className="text-white">Seudónimo de Cadete:</strong> Nombre de usuario elegido o asignado para la navegación gamificada.</li>
                    <li><strong className="text-white">Datos de Progreso Educativo:</strong> Puntuaciones de XP, niveles completados, tiempo de interacción y métricas de resolución de problemas analíticos y científicos.</li>
                    <li><strong className="text-white">Correo del Tutor/Comandante:</strong> Dirección de correo del padre, madre o docente responsable para la gestión de la suscripción y envío de reportes de progreso.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">3. Cero Publicidad y Cero Rastreo Comercial</h4>
                  <div className="p-4 bg-[#1a2130]/80 border border-[#8DA9C4]/20 rounded-2xl text-xs text-zinc-300 space-y-2">
                    <p className="font-bold text-[#E0B0FF]">🛡️ Garantía de Entorno Educativo Puro:</p>
                    <ul className="list-disc pl-5 space-y-1 text-zinc-300 leading-relaxed">
                      <li>No vendemos ni alquilamos datos a empresas anunciantes o corredores de datos.</li>
                      <li>No utilizamos píxeles de rastreo publicitario de terceros.</li>
                      <li>El portal está libre de anuncios emergentes, banners comerciales o compras destructivas sin supervisión.</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">4. Encriptación y Custodia de Datos</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Toda la comunicación entre el navegador del usuario y los servidores de LumiNauts está encriptada mediante protocolo SSL/TLS de 256 bits. Las bases de datos de progreso pedagógico cuentan con cifrado en reposo (AES-256) e infraestructuras con respaldo continuo.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">5. Derechos de Padres y Educadores</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Los padres, madres y tutores legales tienen derecho en todo momento a:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-zinc-400 leading-relaxed">
                    <li>Revisar los datos de progreso registrados de sus representados.</li>
                    <li>Solicitar la eliminación definitiva de cualquier cuenta asociada o historial de progreso.</li>
                    <li>Revocar el consentimiento para el procesamiento de datos educativos.</li>
                  </ul>
                </div>

                <div className="p-4 bg-[#0d111a] border border-zinc-800/80 rounded-2xl space-y-1 text-xs text-zinc-400">
                  <span className="font-bold text-white block">Oficial de Protección de Datos:</span>
                  <p>Para ejercer sus derechos o resolver dudas legales, puede escribir a: <span className="text-[#8DA9C4] font-bold">privacidad@luminauts.edu</span></p>
                </div>
              </div>
            )}

            {type === 'terms' && (
              <div className="space-y-6 text-zinc-300">
                <div className="p-4 bg-[#0d111a] border border-zinc-800/80 rounded-2xl space-y-2">
                  <h4 className="font-extrabold text-[#E0B0FF] text-sm flex items-center gap-2">
                    <FileText size={16} /> 1. Aceptación del Acuerdo
                  </h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Al acceder, navegar o registrarte en la lista de espera de la plataforma <strong>LumiNauts</strong>, aceptas cumplir con los presentes Términos de Servicio. Si actúas en nombre de una institución educativa o familia, declaras contar con la autoridad correspondiente.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">2. Licencia de Uso Educativo</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    LumiNauts concede una licencia limitada, no exclusiva, revocable e intransferible para acceder al contenido interactivo, mapas estelares y mini-juegos pedagógicos con fines estrictamente educativos y personales o de aula.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">3. Cuentas y Supervisión de Menores</h4>
                  <ul className="list-disc pl-5 space-y-2 text-xs text-zinc-400 leading-relaxed">
                    <li>Los cadetes menores de 14 años deben contar con la autorización explícita de un padre, madre, tutor legal o docente registrado.</li>
                    <li>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso a la estación.</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">4. Membresías Estelares y Pases de Fundador</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Los registros en la lista de espera (Waitlist) otorgan el derecho a reclamar insignias digitales de Fundador y descuentos exclusivos durante el lanzamiento. Los precios presentados en el portal son informativos y previa confirmación oficial.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">5. Propiedad Intelectual e Industrial</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Todos los personajes (Luminautas, Comandantes), ilustraciones 3D, código fuente, música, logotipos y diseños interactivos presentes en el portal son propiedad exclusiva de LumiNauts. Queda prohibida su reproducción o distribución sin autorización previa por escrito.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-extrabold text-white text-sm">6. Modificaciones de la Plataforma</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    LumiNauts se reserva el derecho de actualizar, modificar o discontinuar temporalmente módulos o misiones con el objetivo de mejorar el rendimiento pedagógico y técnico del sistema.
                  </p>
                </div>

                <div className="p-4 bg-[#0d111a] border border-zinc-800/80 rounded-2xl text-xs text-zinc-400">
                  <span className="font-bold text-white block">Jurisdicción Aplicable:</span>
                  <p>Este acuerdo se rige por las leyes de comercio digital y protección al consumidor aplicables a plataformas educativas internacionales.</p>
                </div>
              </div>
            )}

            {type === 'cookies' && (
              <div className="space-y-5 text-zinc-300">
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Utilizamos únicamente almacenamiento local (`localStorage`) y cookies técnicas strictly necesarias para el funcionamiento del portal espacial:
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-[#0d111a] border border-zinc-800/80 rounded-2xl">
                    <strong className="text-[#FDF9E2] block mb-1 font-bold text-xs sm:text-sm">🔑 Cookies y Estado Técnico Esencial:</strong>
                    <p className="text-zinc-400 text-xs leading-relaxed">Permiten recordar tus preferencias de tema (Día/Noche), la confirmación del aviso de cookies y la sesión del usuario de forma segura.</p>
                  </div>
                  <div className="p-4 bg-[#0d111a] border border-zinc-800/80 rounded-2xl">
                    <strong className="text-[#8DA9C4] block mb-1 font-bold text-xs sm:text-sm">🚀 Progreso de Misiones (LocalStorage):</strong>
                    <p className="text-zinc-400 text-xs leading-relaxed">Almacena localmente tu cantidad de XP acumulada, nivel de cadete y constelaciones completadas sin rastreo externo.</p>
                  </div>
                </div>
              </div>
            )}

            {type === 'contact' && (
              contactSubmitted ? (
                <div className="text-center py-10 space-y-4">
                  <CheckCircle2 size={56} className="text-[#8DA9C4] mx-auto animate-bounce" />
                  <h4 className="text-xl font-black text-white">¡Transmisión Recibida!</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
                    Gracias Comandante. Tu mensaje ha sido transmitido al centro de control. Nuestro equipo pedagógico responderá a la brevedad.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">Nombre o Identificador de Comandante</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Comandante Sofia / Prof. Carlos"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d111a] border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8DA9C4] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">Correo Electrónico de Contacto</label>
                    <input
                      type="email"
                      required
                      placeholder="tu-correo@estelar.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d111a] border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8DA9C4] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">Mensaje o Consulta</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Escribe tu consulta sobre el mapa estelar, licencias escolares o el programa de beta..."
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl bg-[#0d111a] border border-zinc-800 text-white text-xs sm:text-sm focus:outline-none focus:border-[#8DA9C4] resize-none transition-colors"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="md" className="w-full py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/10">
                    <Send size={16} /> Enviar Mensaje a Control de Misión
                  </Button>
                </form>
              )
            )}
          </div>

          {/* Footer Close Button */}
          {type !== 'contact' && (
            <div className="mt-6 pt-4 border-t border-zinc-800/80 flex justify-end relative z-10">
              <Button onClick={onClose} variant="secondary" size="sm" className="px-6 py-2.5 rounded-xl text-xs font-bold">
                Entendido y Cerrar
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
