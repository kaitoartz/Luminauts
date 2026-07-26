import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './HoloCard.css';
import backcardPokemon from '../../assets/backcard-pokemon.webp';

const HoloCard = ({
  rarity = 'rare holo',
  subtypes = 'basic',
  supertype = 'pokémon',
  gallery = false,
  frontImage = 'https://images.pokemontcg.io/swsh9/171_hires.png',
  backImage = null,
  masked = false,
  mask = '',
  foil = '',
  seedX = 0.5954854002286756,
  seedY = 0.6665155683907131,
  cosmosBg = '437px 853px',
  className = '',
  style = {},
  initialFlipped = false,
  name = '',
  desc = ''
}) => {
  const cardRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(initialFlipped);
  const [frontError, setFrontError] = useState(false);
  const glowColor = style?.['--glow'] || '#69d1e9';
  const [dynamicVars, setDynamicVars] = useState({
    '--mx': '50%',
    '--my': '50%',
    '--posx': '50%',
    '--posy': '50%',
    '--pos': '50% 50%',
    '--rx': initialFlipped ? '180deg' : '0deg',
    '--ry': '0deg',
    '--hyp': '0',
    '--o': '0',
    '--s': '1',
    '--glow': glowColor,
    '--border-angle': '0deg'
  });

  const currentValues = useRef({ rx: initialFlipped ? 180 : 0, ry: 0, mx: 50, my: 50, hyp: 0, o: 0, s: 1 });
  const leaveTimeoutRef = useRef(null);
  const gsapAnimRef = useRef(null);

  const handleMouseMove = (e) => {
    if (isFlipped) return; // Disable hover interaction when flipped
    if (!cardRef.current) return;

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (gsapAnimRef.current) {
      gsapAnimRef.current.kill();
      gsapAnimRef.current = null;
    }
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    
    const x = px / width - 0.5;
    const y = py / height - 0.5;
    
    const posx = (px / width) * 100;
    const posy = (py / height) * 100;
    
    const hyp = Math.min(Math.sqrt(x * x + y * y) * 2, 1);
    
    const rx = x * -36;
    const ry = y * 36;

    // Compute radial border angle from mouse position (0-360deg)
    const angleRad = Math.atan2(py - height / 2, px - width / 2);
    const angleDeg = (angleRad * 180) / Math.PI;

    setIsInteracting(true);
    currentValues.current = { rx, ry, mx: posx, my: posy, hyp, o: 1, s: 1.05 };
    
    setDynamicVars({
      '--mx': `${posx}%`,
      '--my': `${posy}%`,
      '--posx': `${posx}%`,
      '--posy': `${posy}%`,
      '--pos': `${posx}% ${posy}%`,
      '--rx': `${rx}deg`,
      '--ry': `${ry}deg`,
      '--hyp': hyp.toString(),
      '--o': '1',
      '--s': '1.05',
      '--glow': glowColor,
      '--border-angle': `${angleDeg}deg`
    });
  };

  const handleMouseLeave = () => {
    if (isFlipped) return; // Disable hover interaction when flipped
    setIsInteracting(false);
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);

    leaveTimeoutRef.current = setTimeout(() => {
      const target = { ...currentValues.current };
      gsapAnimRef.current = gsap.to(target, {
        rx: 0,
        ry: 0,
        mx: 50,
        my: 50,
        hyp: 0,
        o: 0,
        s: 1,
        duration: 0.9,
        ease: "elastic.out(1.1, 0.6)",
        onUpdate: () => {
          setDynamicVars({
            '--mx': `${target.mx}%`,
            '--my': `${target.my}%`,
            '--posx': `${target.mx}%`,
            '--posy': `${target.my}%`,
            '--pos': `${target.mx}% ${target.my}%`,
            '--rx': `${target.rx}deg`,
            '--ry': `${target.ry}deg`,
            '--hyp': target.hyp.toString(),
            '--o': target.o.toString(),
            '--s': target.s.toString()
          });
        }
      });
    }, 200); // Retener por 200ms antes de volver con bounce
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const nextFlipped = !isFlipped;

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (gsapAnimRef.current) {
      gsapAnimRef.current.kill();
      gsapAnimRef.current = null;
    }

    const startRx = currentValues.current.rx;
    const midRx = nextFlipped ? 90 : 90;  // always pivot through 90
    const endRx = nextFlipped ? 180 : 0;

    const target = {
      rx: startRx,
      ry: currentValues.current.ry,
      mx: currentValues.current.mx,
      my: currentValues.current.my,
      hyp: currentValues.current.hyp,
      o: currentValues.current.o,
      s: currentValues.current.s
    };

    setIsInteracting(false);

    const updateVars = () => {
      currentValues.current = { rx: target.rx, ry: target.ry, mx: target.mx, my: target.my, hyp: target.hyp, o: target.o, s: target.s };
      setDynamicVars(prev => ({
        ...prev,
        '--mx': `${target.mx}%`,
        '--my': `${target.my}%`,
        '--posx': `${target.mx}%`,
        '--posy': `${target.my}%`,
        '--pos': `${target.mx}% ${target.my}%`,
        '--rx': `${target.rx}deg`,
        '--ry': `${target.ry}deg`,
        '--hyp': target.hyp.toString(),
        '--o': target.o.toString(),
        '--s': target.s.toString()
      }));
    };

    // Phase 1: rush to 90° (midpoint) — card edge-on
    gsapAnimRef.current = gsap.to(target, {
      rx: midRx,
      ry: 0,
      mx: 50,
      my: 50,
      hyp: 0,
      o: 0,
      s: 1.06,
      duration: 0.35,
      ease: 'power2.in',
      onUpdate: updateVars,
      onComplete: () => {
        // Swap face at the 90° blind spot
        setIsFlipped(nextFlipped);
        // Phase 2: complete from 90° to final angle
        gsapAnimRef.current = gsap.to(target, {
          rx: endRx,
          s: 1.0,
          duration: 0.45,
          ease: 'back.out(1.5)',
          onUpdate: updateVars,
          onComplete: () => {
            currentValues.current.rx = endRx;
          }
        });
      }
    });
  };

  useEffect(() => {
    return () => {
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
      if (gsapAnimRef.current) gsapAnimRef.current.kill();
    };
  }, []);

  const frontStyle = {};
  if (masked) {
    frontStyle['--seedx'] = seedX;
    frontStyle['--seedy'] = seedY;
    if (cosmosBg) frontStyle['--cosmosbg'] = cosmosBg;
    if (mask) frontStyle['--mask'] = `url(${mask})`;
    if (foil) frontStyle['--foil'] = `url(${foil})`;
  }

  return (
    <div
      ref={cardRef}
      className={`card interactive ${masked ? 'masked' : ''} ${isInteracting ? 'interacting' : ''} ${isFlipped ? 'flipped' : ''} ${className}`}
      data-rarity={rarity}
      data-subtypes={subtypes}
      data-supertype={supertype}
      data-gallery={gallery}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchMove={(e) => e.touches && e.touches[0] && handleMouseMove(e.touches[0])}
      onTouchEnd={handleMouseLeave}
      style={{
        touchAction: 'pan-y',
        ...dynamicVars,
        ...style
      }}
    >
      <div className="card__translater">
        <div className="card__rotator">
          <img
            className="card__back"
            src={backImage || backcardPokemon}
            alt="Card Back"
            loading="lazy"
          />
          <div className="card__front" style={frontStyle}>
            {frontError ? (
              <div className="w-full h-full !flex flex-col items-center justify-between p-6 bg-zinc-950 border-4 border-indigo-500/80 rounded-[var(--radius)] text-white relative overflow-hidden select-none">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.08)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,176,255,0.12)_0%,transparent_60%)] pointer-events-none" />
                
                <div className="w-full border border-indigo-500/20 rounded-lg flex flex-col items-center justify-between py-6 px-3 h-full relative z-10 bg-zinc-900/60 backdrop-blur-xs">
                  <div className="text-[9px] uppercase font-mono tracking-widest text-indigo-400 font-bold">{rarity}</div>
                  
                  {/* Space Icon */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-b from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)] my-4">
                    <span className="text-3xl text-indigo-400">✨</span>
                  </div>
                  
                  <div className="text-center w-full">
                    <div className="text-sm font-black tracking-tight text-white">{name || 'Luminaut'}</div>
                    <div className="text-[10px] text-zinc-400 mt-1 font-semibold">{desc || 'Edición Limitada'}</div>
                  </div>
                </div>
              </div>
            ) : (
              <img
                src={frontImage}
                alt="Pokemon Card Front"
                loading="lazy"
                onError={() => setFrontError(true)}
              />
            )}
            <div className="card__shine"></div>
            <div className="card__glare"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoloCard;
