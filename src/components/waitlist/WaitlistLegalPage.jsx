import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, BookOpen, Lock, FileText, CheckCircle2, Sparkles, ShieldCheck, Rocket } from 'lucide-react';
import Button from '../ui/Button';

export default function WaitlistLegalPage({ view = 'privacy', onBack }) {
  const isPrivacy = view === 'privacy';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20 text-white min-h-[80vh]"
    >
      {/* Navigation Top Bar */}
      <div className="mb-10 flex items-center justify-between">
        <Button
          onClick={onBack}
          variant="secondary"
          size="sm"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-800 hover:border-[#8DA9C4]/40 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} /> <span>Volver a la Estación</span>
        </Button>

        <div className="flex items-center gap-1.5 text-xs text-[#8DA9C4] font-semibold">
          <Sparkles size={14} className="text-[#E0B0FF]" />
          <span>Documento Oficial</span>
        </div>
      </div>

      {/* Header Banner - Plain Text Layout */}
      <div className="mb-12 border-b border-zinc-800 pb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isPrivacy ? 'border-[#8DA9C4]/30 text-[#8DA9C4]' : 'border-[#E0B0FF]/30 text-[#E0B0FF]'}`}>
            {isPrivacy ? <Shield size={20} /> : <BookOpen size={20} />}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isPrivacy ? 'Política de Privacidad y Protección Infantil' : 'Términos de Servicio del Portal LumiNauts'}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 font-semibold mt-1">
              {isPrivacy ? 'Última actualización: Julio 2026 • Estándares COPPA y GDPR-K' : 'Última actualización: Julio 2026 • Reglamento de la Estación Espacial'}
            </p>
          </div>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-medium mt-4">
          {isPrivacy
            ? 'En LumiNauts la protección de los datos de nuestros cadetes y educadores es prioridad absoluta. Conoce nuestros estándares de encriptación y cero publicidad.'
            : 'Información y compromisos de la fase de registro previo (Waitlist). Conoce tus derechos como comandante fundador e institucional.'}
        </p>
      </div>

      {/* Document Body Content - Clean Plain Text with Simple Line Dividers */}
      <div className="space-y-10 text-sm text-zinc-350 leading-relaxed font-medium">
        {isPrivacy ? (
          <>
            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-[#8DA9C4] text-base flex items-center gap-2">
                <Lock size={18} /> <span>1. Declaración de Principios de Privacidad Infantil</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                Cumplimos rigurosamente con la Ley de Protección de la Privacidad Infantil en Línea (<strong>COPPA</strong>), el Reglamento General de Protección de Datos aplicable a menores (<strong>GDPR-K</strong>) y normativas internacionales de protección de datos en entornos educativos.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-white text-base">2. Información que Recopilamos</h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                No solicitamos ni almacenamos datos de identificación personal directa de los estudiantes menores de edad (como apellidos reales, teléfonos o direcciones físicas). La información registrada incluye únicamente:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-zinc-450">
                <li><strong className="text-white">Seudónimo de Cadete:</strong> Nombre de usuario elegido o asignado para la navegación gamificada.</li>
                <li><strong className="text-white">Datos de Progreso Pedagógico:</strong> Puntuaciones de XP, niveles completados, tiempo de interacción y métricas de resolución de acertijos analíticos.</li>
                <li><strong className="text-white">Correo del Tutor/Comandante:</strong> Dirección de correo del padre, madre o docente responsable para la gestión de la suscripción y envío de reportes de progreso.</li>
              </ul>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-bold text-[#E0B0FF] text-base flex items-center gap-2">
                <ShieldCheck size={18} /> <span>3. Cero Publicidad y Cero Rastreo Comercial</span>
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-zinc-300">
                <li>No vendemos ni alquilamos datos a empresas anunciantes o corredores de datos.</li>
                <li>No utilizamos píxeles de rastreo publicitario de terceros.</li>
                <li>El portal está completamente libre de anuncios emergentes, banners comerciales o compras destructivas sin supervisión.</li>
              </ul>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-white text-base">4. Encriptación y Custodia de Datos</h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                Toda la comunicación entre el navegador del usuario y los servidores de LumiNauts está encriptada mediante protocolo SSL/TLS de 256 bits. Las bases de datos de progreso pedagógico cuentan con cifrado en reposo (AES-256) e infraestructuras con respaldo continuo.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-white text-base">5. Derechos de Padres y Educadores</h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                Los padres, madres y tutores legales tienen derecho en todo momento a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-zinc-450">
                <li>Revisar los datos de progreso registrados de sus representados.</li>
                <li>Solicitar la eliminación definitiva de cualquier cuenta asociada o historial de progreso.</li>
                <li>Revocar el consentimiento para el procesamiento de datos educativos.</li>
              </ul>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs sm:text-sm text-zinc-400">
              <div>
                <span className="font-bold text-white block mb-1">Oficial de Protección de Datos:</span>
                <p>Para ejercer sus derechos o resolver dudas legales, puede escribir a: <span className="text-[#8DA9C4] font-bold">privacidad@luminauts.app</span></p>
              </div>
              <CheckCircle2 className="text-[#8DA9C4] shrink-0" size={24} />
            </div>
          </>
        ) : (
          <>
            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-[#E0B0FF] text-base flex items-center gap-2">
                <FileText size={18} /> <span>1. Aceptación del Acuerdo</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                Al acceder, navegar o registrarte en la lista de espera de la plataforma <strong>LumiNauts</strong>, aceptas cumplir con los presentes Términos de Servicio. Si actúas en nombre de una institución educativa o familia, declaras contar con la autoridad correspondiente.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-white text-base">2. Licencia de Uso Educativo</h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                LumiNauts concede una licencia limitada, no exclusiva, revocable e intransferible para acceder al contenido interactivo, mapas estelares y mini-juegos pedagógicos con fines estrictamente educativos y personales o de aula.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-white text-base">3. Cuentas y Supervisión de Menores</h3>
              <ul className="list-disc pl-6 space-y-2 text-xs sm:text-sm text-zinc-450">
                <li>Los cadetes menores de 14 años deben contar con la autorización explícita de un padre, madre, tutor legal o docente registrado.</li>
                <li>El usuario es responsable de mantener la confidencialidad de sus credenciales de acceso a la estación.</li>
              </ul>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-bold text-[#E0B0FF] text-base flex items-center gap-2">
                <Rocket size={18} /> <span>4. Membresías Estelares y Pases de Fundador</span>
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                Los registros en la lista de espera (Waitlist) otorgan el derecho a reclamar insignias digitales de Fundador y acceso anticipado prioritario durante el lanzamiento de la versión beta. Los precios e insignias presentados son informativos y sujetos a confirmación oficial.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-white text-base">5. Propiedad Intelectual e Industrial</h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                Todos los personajes (Luminautas, Comandantes), ilustraciones 3D, código fuente, música, logotipos y diseños interactivos presentes en el portal son propiedad exclusiva de LumiNauts. Queda prohibida su reproducción o distribución sin autorización previa por escrito.
              </p>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-800/40">
              <h3 className="font-extrabold text-white text-base">6. Modificaciones de la Plataforma</h3>
              <p className="text-xs sm:text-sm text-zinc-300">
                LumiNauts se reserva el derecho de actualizar, modificar o discontinuar temporalmente módulos o misiones con el objetivo de mejorar el rendimiento pedagógico y técnico del sistema.
              </p>
            </div>

            <div className="pt-6 text-xs sm:text-sm text-zinc-400">
              <span className="font-bold text-white block mb-1">Jurisdicción Aplicable:</span>
              <p>Este acuerdo se rige por las leyes de comercio digital y protección al consumidor aplicables a plataformas educativas internacionales.</p>
            </div>
          </>
        )}
      </div>

      {/* Bottom Back Button */}
      <div className="mt-12 pt-8 border-t border-zinc-800/80 flex justify-center">
        <Button
          onClick={onBack}
          className="py-3 px-8 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl font-bold text-sm cursor-pointer"
        >
          Volver al Inicio de la Estación
        </Button>
      </div>
    </motion.div>
  );
}
