import React, { useState, useEffect, useRef, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Copy, Download, Share2, X, Star, Sparkles, User, Check, RefreshCw
} from 'lucide-react';
import astronautCommander from '../../assets/lanyard/astronaut_commander.png';

const Lanyard = React.lazy(() => import('./Lanyard'));

export default function CommanderPassport({ 
  email, 
  onClose,
  position = [0, 0, 13],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = false,
  frontImage = undefined,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 2
}) {
  const [userName, setUserName] = useState(() => localStorage.getItem('luminauts_commander_name') || '');
  const [inputName, setInputName] = useState('');
  const [isNameSubmitted, setIsNameSubmitted] = useState(!!localStorage.getItem('luminauts_commander_name'));
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Disable page scroll and close on Escape when passport overlay is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Save name when submitted
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    const cleanName = inputName.trim();
    setUserName(cleanName);
    localStorage.setItem('luminauts_commander_name', cleanName);
    setIsNameSubmitted(true);
    triggerToast('¡Perfil de Comandante iniciado! Cargando credencial 3D...');
  };

  const handleEditName = () => {
    setInputName(userName);
    setIsNameSubmitted(false);
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Copy referral message to clipboard
  const handleShare = async () => {
    const shareText = `🚀 ¡Acabo de registrarme como Comandante en LumiNauts! Obtén tu credencial estelar para la estación educativa del futuro. Únete a la tripulación aquí: ${window.location.origin}`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      triggerToast('¡Enlace de invitación copiado al portapapeles!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Draw and download the customized passport badge
  const handleDownload = () => {
    setDownloading(true);
    triggerToast('Generando pasaporte en alta resolución...');

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = astronautCommander;
    img.crossOrigin = 'anonymous'; // Avoid taint issues if loaded over network
    
    img.onload = () => {
      // 1. Draw cosmic background image
      ctx.drawImage(img, 0, 0, 800, 1200);

      // 2. Draw outer sci-fi technical frame
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.4)'; // blue-400
      ctx.lineWidth = 8;
      ctx.beginPath();
      // Draw octagonal sci-fi corners
      ctx.moveTo(40, 10);
      ctx.lineTo(760, 10);
      ctx.lineTo(790, 40);
      ctx.lineTo(790, 1160);
      ctx.lineTo(760, 1190);
      ctx.lineTo(40, 1190);
      ctx.lineTo(10, 1160);
      ctx.lineTo(10, 40);
      ctx.closePath();
      ctx.stroke();

      // Inner subtle border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 3. Draw a header plate
      ctx.fillStyle = 'rgba(10, 15, 30, 0.7)';
      ctx.fillRect(50, 30, 700, 100);
      ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
      ctx.strokeRect(50, 30, 700, 100);

      // Header Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LUMI-NAUTS DECK PASSPORT', 400, 80);
      ctx.fillStyle = '#3b82f6';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('OFFICIAL MISSION COMMANDER CREDENTIAL', 400, 110);

      // 4. Draw hologram logo/seal on the top right
      ctx.beginPath();
      ctx.arc(690, 80, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('L.S.A.', 690, 85);

      // 5. Draw name & details section at the bottom
      const rectY = 930;
      const rectH = 220;
      ctx.fillStyle = 'rgba(8, 12, 24, 0.92)';
      ctx.fillRect(40, rectY, 720, rectH);
      
      // Neon separator
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(40, rectY, 720, 8);

      // Subtitle
      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 24px monospace';
      ctx.fillText('COMANDANTE ESTELAR', 400, rectY + 55);

      // User Name
      ctx.fillStyle = '#ffffff';
      let fontSize = 52;
      if (userName.length > 15) fontSize = 42;
      if (userName.length > 20) fontSize = 32;
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.fillText(userName.toUpperCase(), 400, rectY + 120);

      // Agency metadata details
      ctx.fillStyle = '#64748b'; // slate-500
      ctx.font = '18px monospace';
      const passportId = 'LM-' + Math.floor(1000 + Math.random() * 9000);
      ctx.fillText(`AGENCY: LUMINAUTS SPACE PROGRAM • PASS ID: ${passportId}`, 400, rectY + 175);

      // Decorative technical coordinates
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(96, 165, 250, 0.4)';
      ctx.fillText('SEC-O1: ORBITAL LEARNING STATION // GRID AXIS ALPHA-9', 400, rectY + 200);

      // 6. Draw futuristic technical barcode lines
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      let barX = 70;
      const barY = rectY + 90;
      const barHeight = 45;
      const barPattern = [2, 6, 3, 1, 8, 2, 4, 1, 6, 2, 3, 7, 2, 1, 9, 3, 2, 5];
      barPattern.forEach((width) => {
        ctx.fillRect(barX, barY, width, barHeight);
        barX += width + 3;
      });

      // Repeat barcode on the right side
      let rBarX = 640;
      barPattern.reverse().forEach((width) => {
        ctx.fillRect(rBarX, barY, width, barHeight);
        rBarX += width + 3;
      });

      // 7. Trigger image download
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `pasaporte_comandante_${userName.replace(/\s+/g, '_').toLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
        triggerToast('¡Pasaporte descargado con éxito!');
      } catch (err) {
        console.error('Canvas export error:', err);
        triggerToast('No se pudo exportar la imagen. ¡Prueba en otro navegador!');
      } finally {
        setDownloading(false);
      }
    };

    img.onerror = (err) => {
      console.error('Failed to load astronaut image:', err);
      triggerToast('Error al cargar plantilla de pasaporte.');
      setDownloading(false);
    };
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] bg-zinc-950/95 backdrop-blur-s flex flex-col items-center justify-center p-4 overflow-y-auto">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 z-[60] bg-blue-600 border border-blue-400 text-white px-5 py-3 rounded-2xl shadow-xl text-sm font-bold flex items-center gap-2"
          >
            <Sparkles size={16} className="animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-4xl w-full bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center overflow-visible shadow-2xl">
      
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Cerrar credencial"
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-zinc-850 hover:bg-zinc-800 p-2 rounded-full border border-zinc-800"
        >
          <X size={18} />
        </button>

        {/* Left Side: 3D Lanyard Preview OR Name Input Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative min-h-[350px] md:min-h-[480px]">
          
          <AnimatePresence mode="wait">
            {!isNameSubmitted ? (
              <motion.div 
                key="name-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm space-y-6 text-center z-10 px-4"
              >
                <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto text-blue-400">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Pase de Comandante</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    ¡Registrado en la lista de espera con éxito! Introduce tu nombre o el de tu cadete para imprimirlo en tu credencial estelar.
                  </p>
                </div>
                <form onSubmit={handleNameSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label htmlFor="commander-name-input" className="sr-only">Nombre del Comandante</label>
                    <input 
                      id="commander-name-input"
                      type="text" 
                      required
                      maxLength={25}
                      placeholder="Tu nombre y apellido..." 
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 focus:border-blue-500 rounded-xl focus:outline-none text-sm text-center text-white placeholder-zinc-500 font-semibold"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Award size={16} /> Generar Credencial 3D
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="lanyard-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[380px] md:h-[480px] relative z-10 flex flex-col justify-center"
              >
                {/* 3D Lanyard with React Suspense Loader */}
                <Suspense fallback={
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs font-mono text-zinc-500 tracking-wider">CALIBRANDO GRAVEDAD...</span>
                  </div>
                }>
                  <Lanyard 
                    userName={userName} 
                    position={position}
                    gravity={gravity}
                    fov={fov}
                    transparent={transparent}
                    frontImage={frontImage}
                    backImage={backImage}
                    imageFit={imageFit}
                    lanyardImage={lanyardImage}
                    lanyardWidth={lanyardWidth}
                  />
                </Suspense>

                {/* Interactiveness hint */}
                <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
                  <span className="text-[10px] font-mono text-zinc-550 bg-zinc-950/80 px-3 py-1 rounded-full border border-zinc-850">
                    🖱️ Arrastra o sacude la credencial
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Message, Actions & Branding */}
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6 md:space-y-8 z-10">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {isNameSubmitted && (
                <button 
                  onClick={handleEditName}
                  className="text-xs text-zinc-500 hover:text-zinc-300 flex items-center gap-1 font-semibold transition-colors"
                >
                  <RefreshCw size={10} /> Cambiar nombre
                </button>
              )}
            </div>
            
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-white">
              ¡Ahora eres un <span className="text-blue-400">comandante!</span>
            </h2>

            <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-medium">
              Oficialmente eres un comandante de LumiNauts. Comparte este pasaporte estelar con tus cadetes y educadores luminautas y lidera el despegue.
            </p>
            
            <div className="bg-zinc-950/60 border border-zinc-850 p-4 rounded-2xl flex items-start gap-3">
              <Award className="text-yellow-500 shrink-0 mt-0.5" size={20} />
              <div className="text-xs space-y-1">
                <p className="font-bold text-white">Insignia Especial de Fundador Desbloqueada</p>
                <p className="text-zinc-500">Se guardó en tu perfil bajo el correo: <strong className="text-zinc-400">{email}</strong>.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={!isNameSubmitted || downloading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 transition-all ${
                isNameSubmitted && !downloading
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/5 hover:-translate-y-0.5'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generando...</span>
                </>
              ) : (
                <>
                  <Download size={18} />
                  <span>Descargar Pasaporte (PNG)</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleShare}
                disabled={!isNameSubmitted}
                className={`py-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-2 transition-all ${
                  isNameSubmitted
                    ? 'border-zinc-800 bg-zinc-850 hover:bg-zinc-800 text-white hover:-translate-y-0.5'
                    : 'border-zinc-850 bg-zinc-900 text-zinc-650 cursor-not-allowed'
                }`}
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                <span>{copied ? '¡Copiado!' : 'Compartir Invitación'}</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 rounded-xl font-bold text-xs border border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-850/30 transition-colors"
              >
                Regresar a la Estación
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
