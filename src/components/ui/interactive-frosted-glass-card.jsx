import React, { useRef, useEffect, useState } from 'react';
import { Pointer, Sparkles } from 'lucide-react';
import { RobotFaceIcon } from './RobotFaceIcon';

export const FrostedGlassCard = ({ onEnter }) => {
  const cardRef = useRef(null);
  const [flipped, setFlipped] = useState(false);
  const flippedRef = useRef(false);
  const [backHovered, setBackHovered] = useState(false);
  const [ageInput, setAgeInput] = useState('');
  const [hasClicked, setHasClicked] = useState(false);
  const [particles, setParticles] = useState([]);
  const [sparkleUrl, setSparkleUrl] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSparkleUrl("https://s3-us-west-2.amazonaws.com/s.cdpn.io/13471/sparkles.gif");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (flippedRef.current) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 15;
      const rotateX = ((y - centerY) / centerY) * -15;

      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
      card.style.setProperty('--scale', `1.04`);
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
      card.style.setProperty('--rx', `0deg`);
      card.style.setProperty('--ry', `0deg`);
      card.style.setProperty('--scale', `1`);
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
    flippedRef.current = nextFlipped;
    setFlipped(nextFlipped);
    setHasClicked(true);
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }

    // Spawn Balatro premium particles from center, flying outwards
    const particleCount = 36;
    const newParticles = Array.from({ length: particleCount }).map((_, idx) => {
      const angle = (idx / particleCount) * 2 * Math.PI + (Math.random() - 0.5) * 0.15;
      const speed = 180 + Math.random() * 220; // Faster expansion to overshoot the card boundaries
      const tx = Math.cos(angle) * speed;
      const ty = Math.sin(angle) * speed + 30; // slight gravity pull downwards
      const size = 12 + Math.random() * 16;
      const rot = (Math.random() - 0.5) * 720;
      const duration = 0.6 + Math.random() * 0.4;
      const delay = Math.random() * 0.05;
      
      // Balatro / premium theme colors
      const colors = ['#E0B0FF', '#6B8BB4', '#FFD700', '#f59e0b', '#3b82f6', '#fff'];
      const color = colors[idx % colors.length];

      return {
        id: `p-${idx}-${Math.random()}`,
        startX: 0,
        startY: 0,
        tx,
        ty,
        size,
        rot,
        duration,
        delay,
        color,
      };
    });

    setParticles(newParticles);

    // Clear particles after animation completes
    setTimeout(() => {
      setParticles([]);
    }, 1200);
  };

  return (
    <div 
      className="card-container flex items-center justify-center p-4 relative"
      style={{ perspective: '1000px' }} // Critical for enabling highly noticeable 3D depth
    >
      {/* Particle Emitter Container (Balatro style, behind the card) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-visible z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute"
            style={{
              '--sx': `${p.startX}px`,
              '--sy': `${p.startY}px`,
              '--tx': `${p.tx}px`,
              '--ty': `${p.ty}px`,
              '--rot': `${p.rot}deg`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `particle-explode ${p.duration}s cubic-bezier(0.1, 0.8, 0.3, 1) ${p.delay}s forwards`,
            }}
          >
            <svg viewBox="0 0 24 24" fill={p.color} className="w-full h-full filter drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
              <path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.87L12 15.77l-6.18 3.24L7 12.14l-5-4.87 6.91-1.01L12 0z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Soft Rainbow Border & Shadow Wrapper */}
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`ludi-rainbow-wrap group w-full max-w-md cursor-pointer select-none`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          transform: flipped 
            ? 'rotateY(180deg)' 
            : 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1)) translateZ(10px)',
        }}
      >
        {/* Soft Rainbow Glow Shadow */}
        <div className="ludi-rainbow-glow" />

        <div
          style={{
            position: 'relative',
            width: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* FRONT */}
          <div
            className="card-ludi rounded-[2.45rem] p-10 text-white"
            style={{
              position: 'relative',
              width: '100%',
              background: 'rgba(9, 9, 11, 0.85)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              transformStyle: 'preserve-3d',
              transition: 'background-color 0.3s ease',
              border: 'none',
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
                backgroundImage: sparkleUrl ? `url("${sparkleUrl}")` : 'none',
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
            className="card-ludi rounded-[2.45rem] p-10 text-white flex flex-col items-center justify-center text-center"
            onMouseEnter={() => setBackHovered(true)}
            onMouseLeave={() => setBackHovered(false)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(9, 9, 11, 0.9)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              transformStyle: 'preserve-3d',
              border: 'none',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
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

      {/* Balatro / Premium custom animations */}
      <style>{`
        @keyframes balatro-flip-to-back {
          0% {
            transform: rotateY(0deg) scale(1);
          }
          25% {
            transform: rotateY(70deg) scale(1.18) skewY(2deg);
          }
          55% {
            transform: rotateY(196deg) scale(0.96) skewY(-1deg);
          }
          75% {
            transform: rotateY(174deg) scale(1.02);
          }
          100% {
            transform: rotateY(180deg) scale(1);
          }
        }

        @keyframes balatro-flip-to-front {
          0% {
            transform: rotateY(180deg) scale(1);
          }
          25% {
            transform: rotateY(110deg) scale(1.18) skewY(-2deg);
          }
          55% {
            transform: rotateY(-16deg) scale(0.96) skewY(1deg);
          }
          75% {
            transform: rotateY(6deg) scale(1.02);
          }
          100% {
            transform: rotateY(0deg) scale(1);
          }
        }

        @keyframes particle-explode {
          0% {
            transform: translate3d(var(--sx), var(--sy), 0) scale(0) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
            transform: translate3d(calc(var(--sx) + (var(--tx) - var(--sx)) * 0.25), calc(var(--sy) + (var(--ty) - var(--sy)) * 0.25), 0) scale(1.4) rotate(45deg);
          }
          100% {
            transform: translate3d(var(--tx), var(--ty), 0) scale(0) rotate(var(--rot));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
