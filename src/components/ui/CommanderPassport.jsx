import React, { useState, useEffect, Suspense } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, Download, Share2, X, Sparkles, User, Check, RefreshCw, Gift
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

  // Disable page scroll (both body & html) and close on Escape key
  useEffect(() => {
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
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
    const shareText = `¡Acabo de registrarme como Comandante en LumiNauts! Obtén tu credencial estelar para la estación educativa del futuro. Únete a la tripulación aquí: ${window.location.origin}`;
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
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      // 1. Draw cosmic background image preserving aspect ratio (no stretch)
      const canvasW = 800;
      const canvasH = 1200;
      const imgAspect = (img.naturalWidth || img.width) / (img.naturalHeight || img.height);
      const canvasAspect = canvasW / canvasH;

      let drawW = canvasW;
      let drawH = canvasH;
      let drawX = 0;
      let drawY = 0;

      if (imgAspect > canvasAspect) {
        drawW = canvasH * imgAspect;
        drawX = (canvasW - drawW) / 2;
      } else {
        drawH = canvasW / imgAspect;
        drawY = (canvasH - drawH) / 2;
      }

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      // 2. Draw outer sci-fi technical frame
      ctx.strokeStyle = 'rgba(141, 169, 196, 0.4)';
      ctx.lineWidth = 8;
      ctx.beginPath();
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
      ctx.fillStyle = 'rgba(20, 25, 35, 0.85)';
      ctx.fillRect(50, 30, 700, 100);
      ctx.strokeStyle = 'rgba(224, 176, 255, 0.3)';
      ctx.strokeRect(50, 30, 700, 100);

      // Header Text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LUMI-NAUTS DECK PASSPORT', 400, 80);
      ctx.fillStyle = '#8DA9C4';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('OFFICIAL MISSION COMMANDER CREDENTIAL', 400, 110);

      // 4. Draw hologram logo/seal on the top right
      ctx.beginPath();
      ctx.arc(690, 80, 30, 0, 2 * Math.PI);
      ctx.fillStyle = 'rgba(224, 176, 255, 0.2)';
      ctx.fill();
      ctx.strokeStyle = '#E0B0FF';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#E0B0FF';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('L.S.A.', 690, 85);

      // 5. Draw name & details section at the bottom
      const rectY = 930;
      const rectH = 220;
      ctx.fillStyle = 'rgba(20, 25, 35, 0.95)';
      ctx.fillRect(40, rectY, 720, rectH);
      
      // Separator
      ctx.fillStyle = '#E0B0FF';
      ctx.fillRect(40, rectY, 720, 6);

      // Subtitle
      ctx.fillStyle = '#8DA9C4';
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
      ctx.fillStyle = '#8DA9C4';
      ctx.font = '18px monospace';
      const passportId = 'LM-' + Math.floor(1000 + Math.random() * 9000);
      ctx.fillText(`AGENCY: LUMINAUTS SPACE PROGRAM • PASS ID: ${passportId}`, 400, rectY + 175);

      // Decorative technical coordinates
      ctx.font = '12px monospace';
      ctx.fillStyle = 'rgba(224, 176, 255, 0.5)';
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

      let rBarX = 640;
      barPattern.reverse().forEach((width) => {
        ctx.fillRect(rBarX, barY, width, barHeight);
        rBarX += width + 3;
      });

      // 7. Robust production download & mobile save using toBlob / Web Share API
      const fileName = `pasaporte_comandante_${userName.trim().replace(/\s+/g, '_').toLowerCase()}.png`;

      canvas.toBlob(async (blob) => {
        if (!blob) {
          triggerToast('Error al procesar la imagen.');
          setDownloading(false);
          return;
        }

        // Try Web Share API for native mobile file saving (iOS Photos / Android Downloads)
        const file = new File([blob], fileName, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Pasaporte de Comandante LumiNauts',
              text: '¡Mi pasaporte de comandante estelar en LumiNauts!'
            });
            triggerToast('¡Pasaporte guardado!');
            setDownloading(false);
            return;
          } catch (shareErr) {
            if (shareErr.name === 'AbortError') {
              setDownloading(false);
              return;
            }
          }
        }

        // Fallback for desktop & traditional browsers
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 1000);

        triggerToast('¡Pasaporte descargado con éxito!');
        setDownloading(false);
      }, 'image/png', 1.0);
    };

    img.onerror = (err) => {
      console.error('Failed to load astronaut image:', err);
      triggerToast('Error al cargar plantilla de pasaporte.');
      setDownloading(false);
    };
  };

  if (!mounted) return null;

  return createPortal(
    <div 
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 backdrop-blur-md bg-black/60 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 z-50 bg-[#141923] border border-[#E0B0FF]/40 text-white px-5 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2"
          >
            <Sparkles size={14} className="text-[#E0B0FF] animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        data-lenis-prevent="true"
        style={{ backgroundColor: '#141923', color: '#ffffff' }}
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[#141923] border border-zinc-800 rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center shadow-2xl text-white custom-scrollbar"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          aria-label="Cerrar credencial"
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors bg-zinc-900 hover:bg-zinc-800 p-2 rounded-full border border-zinc-800 cursor-pointer z-30"
        >
          <X size={18} />
        </button>

        {/* Left Side: 3D Lanyard Preview OR Name Input Form */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative min-h-[220px] sm:min-h-[300px] md:min-h-[460px]">
          <AnimatePresence mode="wait">
            {!isNameSubmitted ? (
              <motion.div 
                key="name-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm space-y-4 sm:space-y-6 text-center z-10 px-2 sm:px-4 py-2"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#E0B0FF]/10 border border-[#E0B0FF]/20 rounded-xl flex items-center justify-center mx-auto text-[#E0B0FF]">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2 tracking-tight">Pase de Comandante</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed font-medium">
                    Ingresa tu nombre o el de tu cadete para personalizar tu credencial oficial de tripulación.
                  </p>
                </div>
                <form onSubmit={handleNameSubmit} className="space-y-3 sm:space-y-4">
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
                      className="w-full px-4 py-2.5 sm:py-3 bg-[#0d111a] border border-zinc-800 focus:border-[#8DA9C4] rounded-xl focus:outline-none text-xs text-center text-white placeholder-zinc-550 font-semibold transition-colors"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-2.5 sm:py-3 bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Award size={16} /> <span>Generar Credencial 3D</span>
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="lanyard-preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-[260px] sm:h-[340px] md:h-[460px] relative z-10 flex flex-col justify-center"
              >
                {/* 3D Lanyard Canvas */}
                <Suspense fallback={
                  <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3">
                    <div className="w-7 h-7 border-2 border-[#E0B0FF] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-mono text-zinc-500 tracking-wider">Cargando credencial 3D...</span>
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

                {/* Interaction hint */}
                <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-zinc-400 bg-zinc-900/90 px-2.5 py-1 rounded-full border border-zinc-800">
                    <Sparkles size={10} className="text-[#E0B0FF]" />
                    <span>Arrastra o interactúa con la credencial 3D</span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Message, Actions & Branding */}
        <div className="w-full md:w-1/2 flex flex-col justify-between space-y-5 sm:space-y-6 md:space-y-8 z-10">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              {isNameSubmitted && (
                <button 
                  onClick={handleEditName}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                >
                  <RefreshCw size={12} /> <span>Editar nombre</span>
                </button>
              )}
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight text-white">
              ¡Ahora eres un <span className="text-[#E0B0FF]">Comandante</span>!
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-medium">
              Oficialmente formas parte de la tripulación de LumiNauts. Comparte tu credencial estelar con tus cadetes y educadores para liderar la misión.
            </p>
            
            <div className="py-3 sm:py-4 border-t border-b border-zinc-800/80 space-y-2">
              <p className="font-bold text-xs text-white flex items-center gap-2">
                <Sparkles size={14} className="text-[#E0B0FF]" />
                <span>Pack Fundador y Credencial Desbloqueada</span>
              </p>
              <p className="text-xs text-zinc-400">
                Registrada para el correo: <strong className="text-white">{email}</strong>
              </p>
              <div className="mt-2 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Gift size={13} className="text-[#FFE885] shrink-0" /> Próxima recompensa: <strong>Insignia Fundador (1 amigo)</strong></span>
                <span className="text-[#E0B0FF] font-bold">0/1</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 sm:space-y-3">
            <button
              onClick={handleDownload}
              disabled={!isNameSubmitted || downloading}
              className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2.5 transition-all cursor-pointer ${
                isNameSubmitted && !downloading
                  ? 'bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              {downloading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generando PNG...</span>
                </>
              ) : (
                <>
                  <Download size={16} />
                  <span>Descargar Pasaporte</span>
                </>
              )}
            </button>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <button
                onClick={handleShare}
                disabled={!isNameSubmitted}
                className={`py-2.5 sm:py-3 rounded-xl font-bold text-xs border flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isNameSubmitted
                    ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800 text-white'
                    : 'border-zinc-850 bg-zinc-900 text-zinc-600 cursor-not-allowed'
                }`}
              >
                {copied ? <Check size={14} className="text-[#8DA9C4]" /> : <Share2 size={14} />}
                <span>{copied ? '¡Copiado!' : 'Copiar Link'}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`¡Hola! Me acabo de registrar en LumiNauts. Obtén tu Pack Fundador y credencial estelar aquí: ${window.location.origin}`)}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 sm:py-3 rounded-xl font-bold text-xs border border-[#25D366]/30 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
              >
                <Share2 size={14} />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 sm:py-3 rounded-xl font-bold text-xs border border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              Volver a Estación
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
