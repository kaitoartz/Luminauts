import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './HoloCard.css';

const HoloCard = ({
  rarity = 'rare holo',
  subtypes = 'basic',
  supertype = 'pokémon',
  gallery = false,
  frontImage = 'https://images.pokemontcg.io/swsh9/171_hires.png',
  backImage = 'https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg',
  masked = false,
  mask = '',
  foil = '',
  seedX = 0.5954854002286756,
  seedY = 0.6665155683907131,
  cosmosBg = '437px 853px',
  className = '',
  style = {},
  initialFlipped = false
}) => {
  const cardRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isFlipped, setIsFlipped] = useState(initialFlipped);
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
    '--s': '1'
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
      '--s': '1.05'
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
    setIsFlipped(nextFlipped);

    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    if (gsapAnimRef.current) {
      gsapAnimRef.current.kill();
      gsapAnimRef.current = null;
    }

    const target = {
      rx: parseFloat(dynamicVars['--rx']) || 0,
      ry: parseFloat(dynamicVars['--ry']) || 0,
      mx: parseFloat(dynamicVars['--mx']) || 50,
      my: parseFloat(dynamicVars['--my']) || 50,
      hyp: parseFloat(dynamicVars['--hyp']) || 0,
      o: parseFloat(dynamicVars['--o']) || 0,
      s: parseFloat(dynamicVars['--s']) || 1
    };

    const targetRx = nextFlipped ? 180 : 0;

    setIsInteracting(false);

    gsapAnimRef.current = gsap.to(target, {
      rx: targetRx,
      ry: 0,
      mx: 50,
      my: 50,
      hyp: 0,
      o: 0,
      s: 1.04, // slight scale effect during flip
      duration: 0.8,
      ease: "back.out(1.4)",
      onUpdate: () => {
        currentValues.current = { rx: target.rx, ry: target.ry, mx: target.mx, my: target.my, hyp: target.hyp, o: target.o, s: target.s };
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
      },
      onComplete: () => {
        gsap.to(target, {
          s: 1.0,
          duration: 0.15,
          onUpdate: () => {
            setDynamicVars(prev => ({
              ...prev,
              '--s': target.s.toString()
            }));
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
      onTouchMove={(e) => handleMouseMove(e.touches[0])}
      onTouchEnd={handleMouseLeave}
      style={{
        ...dynamicVars,
        ...style
      }}
    >
      <div className="card__translater">
        <div className="card__rotator">
          <img
            className="card__back"
            src={backImage}
            alt="Pokemon Card Back"
            loading="lazy"
          />
          <div className="card__front" style={frontStyle}>
            <img
              src={frontImage}
              alt="Pokemon Card Front"
              loading="lazy"
            />
            <div className="card__shine"></div>
            <div className="card__glare"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoloCard;
