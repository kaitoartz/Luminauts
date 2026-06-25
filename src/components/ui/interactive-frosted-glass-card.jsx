import React, { useRef, useEffect, useState } from 'react';
import { Pointer, Sparkles } from 'lucide-react';
import { RobotFaceIcon } from './RobotFaceIcon';

export const FrostedGlassCard = ({ onEnter }) => {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const [backHovered, setBackHovered] = useState(false);
  const [ageInput, setAgeInput] = useState('');

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      // If flipped, let the CSS flip animation take control completely
      if (card.classList.contains('flipped')) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((y - centerY) / centerY) * -15;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04) translateZ(10px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const h = rect.height;
      const w = rect.width;
      const lp = Math.abs(Math.floor((100 / w) * x) - 100);
      const tp = Math.abs(Math.floor((100 / h) * y) - 100);
      card.style.setProperty('--holo-x', `${lp}%`);
      card.style.setProperty('--holo-y', `${tp}%`);
    };

    const handleMouseLeave = () => {
      if (card.classList.contains('flipped')) return;
      card.style.transform = '';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleCardClick = () => {
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  return (
    <div 
      className="card-container flex items-center justify-center p-4"
      style={{ perspective: '1000px' }} // Critical for enabling highly noticeable 3D depth
    >
      {/* Soft Rainbow Border & Shadow Wrapper */}
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`ludi-rainbow-wrap group w-full max-w-md cursor-pointer select-none ${flipped ? 'flipped' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Soft Rainbow Glow Shadow */}
        <div className="ludi-rainbow-glow" />

        <div className="flip-card-inner" style={{ transformStyle: 'preserve-3d' }}>
          {/* FRONT */}
          <div
            className="flip-card-front card-ludi relative w-full h-full rounded-[2.45rem] p-10 text-white"
            style={{
              background: 'rgba(9, 9, 11, 0.85)', // Darker backing to contrast with the rainbow border
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              transformStyle: 'preserve-3d',
              transition: 'background-color 0.3s ease',
              border: 'none', // Removed border since the rainbow wrapper acts as the border
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Holographic Gradient Overlay masked with cursor-following spotlight (Ludinauts soft colors) */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2.45rem]"
              style={{
                backgroundImage: 'linear-gradient(115deg, transparent 0%, rgba(107, 139, 180, 0.8) 30%, rgba(224, 176, 255, 0.8) 70%, transparent 100%)',
                backgroundPosition: 'var(--holo-x, 50%) var(--holo-y, 50%)',
                backgroundSize: '250% 250%',
                mixBlendMode: 'color-dodge',
                zIndex: 1,
                maskImage: 'radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(180px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), black 20%, transparent 100%)',
              }}
            />

            {/* Holographic Sparkles Overlay (Always Active, No Masking) */}
            <div 
              className="pointer-events-none absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-300 rounded-[2.45rem]"
              style={{
                backgroundImage: 'url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif")',
                backgroundPosition: 'center',
                backgroundSize: '180%',
                mixBlendMode: 'color-dodge',
                zIndex: 2,
              }}
            />

            {/* Content Box with layered 3D TranslateZ Staggering */}
            <div 
              className="relative z-10 flex flex-col items-center text-center" 
              style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
            >
              {/* Astronaut Badge / Icon - Staggered at 30px */}
              <div 
                className="w-20 h-20 bg-gradient-to-tr from-[#6B8BB4] to-[#E0B0FF] rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(224,176,255,0.4)] transition-transform duration-700 ease-out group-hover:scale-110"
                style={{ transform: 'translateZ(30px)' }}
              >
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>

              {/* H2 Title - Staggered at 45px */}
              <h2 
                className="text-3xl font-display font-black tracking-tight mb-4 bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E0B0FF]"
                style={{ transform: 'translateZ(45px)' }}
              >
                ¡Bienvenido Luminauta!
              </h2>

              {/* Interactive Button CTA - Staggered at 60px */}
              <div 
                className="ep-shine-btn w-full max-w-xs py-4 px-6 bg-gradient-to-r from-[#6B8BB4] to-[#91aed4] hover:from-[#E0B0FF] hover:to-[#dfc8ef] border-2 border-white/30 text-white rounded-full font-bold shadow-[0_10px_25px_rgba(107,139,180,0.3)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
                style={{ transform: 'translateZ(60px)' }}
              >
                <Pointer size={18} className="text-white animate-bounce" />
                <span>Haz clic aquí</span>
              </div>
            </div>
          </div>

          {/* BACK */}
          <div
            className="flip-card-back card-ludi relative w-full h-full rounded-[2.45rem] p-10 text-white flex flex-col items-center justify-center text-center"
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
            style={{
              background: 'rgba(9, 9, 11, 0.9)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              transformStyle: 'preserve-3d',
              border: 'none',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Back Content Box with staggered 3D TranslateZ */}
            <div 
              className="relative z-10 flex flex-col items-center text-center w-full" 
              style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
              onClick={(e) => e.stopPropagation()} // Evita que hacer clic en el input de la vuelta al card
            >
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ transform: 'translateZ(30px)' }}
              >
                <RobotFaceIcon 
                  state={
                    (() => {
                      if (ageInput.trim() !== '') {
                        const ageNum = parseInt(ageInput, 10);
                        if (ageInput.length > 3 || (!isNaN(ageNum) && ageNum > 30)) {
                          return 'surprised';
                        }
                        return 'happy';
                      }
                      return backHovered ? 'awake' : 'sleep';
                    })()
                  } 
                  className="w-20 h-20 text-white" 
                />
              </div>
              
              <h2 
                className="text-3xl font-display font-black tracking-tight mb-4 bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#E0B0FF]"
                style={{ transform: 'translateZ(45px)' }}
              >
                ¿Cuál es tu edad?
              </h2>

              <div className="flex flex-col gap-3 w-full max-w-xs" style={{ transform: 'translateZ(55px)' }}>
                <input 
                  type="text" 
                  placeholder="Tu edad..." 
                  value={ageInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d*$/.test(val) && val.length <= 3) {
                      setAgeInput(val);
                    }
                  }}
                  className="w-full px-4 py-3 rounded-full bg-zinc-900 border-2 border-white/20 text-white text-center focus:outline-none focus:border-[#E0B0FF] transition-colors"
                />
                <button 
                  onClick={onEnter}
                  className="py-3 px-6 bg-gradient-to-r from-[#6B8BB4] to-[#E0B0FF] text-white rounded-full font-bold shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200"
                >
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
