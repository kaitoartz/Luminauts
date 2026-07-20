import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import HoloCard from './HoloCard';

const CARDS_DATA = [
  {
    id: 'nauta',
    rarity: 'common',
    subtypes: 'basic',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh35/56_hires.png',
    name: 'Nauta',
    desc: 'Carta Básica',
    glowColor: 'rgba(148, 163, 184, 0.4)' // Slate
  },
  {
    id: 'estelar',
    rarity: 'rare holo',
    gallery: true,
    subtypes: 'stage 1',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh9/171_hires.png',
    name: 'Estelar',
    desc: 'Efecto Metálico / Trainer Gallery',
    glowColor: 'rgba(56, 189, 248, 0.6)' // Sky blue
  },
  {
    id: 'superestelar',
    rarity: 'rare holo v',
    gallery: true,
    subtypes: 'stage 2',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh9/171_hires.png',
    name: 'SuperEstelar',
    desc: 'Full Art / Shimmer V',
    glowColor: 'rgba(99, 102, 241, 0.7)' // Indigo
  },
  {
    id: 'cosmos',
    rarity: 'radiant rare',
    subtypes: 'basic',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh10/27_hires.png',
    name: 'Cosmos',
    desc: 'Resplandor Radiante',
    glowColor: 'rgba(192, 132, 252, 0.8)' // Purple
  },
  {
    id: 'supernova',
    rarity: 'rare secret',
    subtypes: 'secret',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh9/186_hires.png',
    name: 'SuperNova',
    desc: 'Edición Secreta / Fundador',
    glowColor: 'rgba(250, 204, 21, 0.9)' // Gold
  }
];

const PackOpening = ({ boosterArtUrl = '/src/assets/genetic-apex-mewtwo.png' }) => {
  const [openingState, setOpeningState] = useState('IDLE'); // 'IDLE', 'HITTING', 'OPENING', 'REVEALING'
  const [hitCount, setHitCount] = useState(0);
  const [revealedCards, setRevealedCards] = useState({}); // Track which cards have been flipped
  
  const MAX_HITS = 4;
  
  const sceneContainerRef = useRef(null);
  const packRef = useRef(null);
  const packTopHalfRef = useRef(null);
  const packBottomHalfRef = useRef(null);
  const explosionFlashRef = useRef(null);
  const centralGlowRef = useRef(null);
  const particlesWrapperRef = useRef(null);
  const cardsContainerRef = useRef(null);

  // Polígonos de corte en zigzag para simular costura rota
  const zigzagClipPathTop = "polygon(0% 0%, 100% 0%, 100% 59%, 85% 56%, 70% 61%, 55% 57%, 40% 60%, 25% 56%, 10% 59%, 0% 56%)";
  const zigzagClipPathBottom = "polygon(0% 56%, 10% 59%, 25% 56%, 40% 60%, 55% 57%, 70% 61%, 85% 56%, 100% 59%, 100% 100%, 0% 100%)";

  // Fase 1: IDLE - Animación de flote suave
  useEffect(() => {
    const gsapCtx = gsap.context(() => {
      if (openingState === 'IDLE') {
        gsap.to(packRef.current, {
          y: "-=12",
          rotationZ: 1.5,
          rotationY: 3,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    }, sceneContainerRef);

    return () => gsapCtx.revert();
  }, [openingState]);

  // Fase 1: HITTING - Squash & Stretch
  const handlePackTap = (e) => {
    if (openingState !== 'IDLE') return;

    const newHitCount = hitCount + 1;
    setHitCount(newHitCount);

    // Audio de impacto comentado
    /*
    const playHitSound = () => {
      const audio = new Audio('/assets/sounds/pack_crunch.mp3');
      audio.playbackRate = 1 + (newHitCount * 0.08);
      audio.play();
    };
    playHitSound();
    */

    gsap.killTweensOf(packRef.current);

    // Transición definitiva al 4º golpe
    if (newHitCount >= MAX_HITS) {
      executeExplosiveTearSequence();
      return;
    }

    const intensity = 1 + (newHitCount * 0.15);
    const squishScaleX = 1 + (0.06 * intensity);
    const squishScaleY = 1 - (0.06 * intensity);

    const tl = gsap.timeline({
      onComplete: () => {
        setOpeningState('IDLE');
      }
    });

    tl.to(packRef.current, {
      scaleX: squishScaleX,
      scaleY: squishScaleY,
      rotationZ: `random(-4, 4)`,
      duration: 0.08,
      ease: "power2.in"
    }).to(packRef.current, {
      scaleX: 1,
      scaleY: 1,
      rotationZ: 0,
      duration: 0.45,
      ease: "elastic.out(1.1, 0.4)"
    });

    // Brillo en coordenadas de impacto
    if (particlesWrapperRef.current) {
      const rect = sceneContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const spark = document.createElement('div');
      spark.className = 'absolute w-12 h-12 rounded-full pointer-events-none z-30 mix-blend-screen';
      spark.style.left = `${x - 24}px`;
      spark.style.top = `${y - 24}px`;
      spark.style.background = 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0.5) 50%, transparent 100%)';
      particlesWrapperRef.current.appendChild(spark);

      gsap.to(spark, {
        scale: 2.5,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => spark.remove()
      });
    }
  };

  // Fase 2: OPENING - Animación de desgarro y explosión física
  const executeExplosiveTearSequence = () => {
    setOpeningState('OPENING');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Audio de ruptura comentado
    /*
    const playTearSound = () => {
      const audio = new Audio('/assets/sounds/pack_rip.mp3');
      audio.play();
    };
    playTearSound();
    */

    // Crear partículas dinámicas
    const numParticles = prefersReducedMotion ? 10 : 35;
    const particles = [];
    if (particlesWrapperRef.current) {
      particlesWrapperRef.current.innerHTML = '';
      for (let i = 0; i < numParticles; i++) {
        const p = document.createElement('div');
        p.className = 'absolute w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-200 to-white opacity-0 pointer-events-none z-30 mix-blend-screen';
        particlesWrapperRef.current.appendChild(p);
        particles.push(p);
      }
    }

    const masterTimeline = gsap.timeline({
      onComplete: () => {
        setOpeningState('REVEALING');
      }
    });

    if (prefersReducedMotion) {
      // Alternativa simplificada sin movimientos bruscos
      masterTimeline
        .to(packRef.current, { opacity: 0, scale: 0.9, duration: 0.4, ease: "power2.out" })
        .to(explosionFlashRef.current, { opacity: 1, duration: 0.1 })
        .to(explosionFlashRef.current, { opacity: 0, duration: 0.4 });
      return;
    }

    gsap.set(particles, { x: 0, y: 0, scale: "random(0.6, 1.8)" });

    masterTimeline.addLabel("rupture")
      // Separación agresiva de mitades
      .to(packTopHalfRef.current, {
        y: -500,
        rotationZ: -25,
        rotationX: -35,
        opacity: 0,
        duration: 0.85,
        ease: "power3.in"
      }, "rupture")
      .to(packBottomHalfRef.current, {
        y: 500,
        rotationZ: 15,
        rotationX: 25,
        opacity: 0,
        duration: 0.85,
        ease: "power3.in"
      }, "rupture")
      // Flash de luz expansivo
      .to(explosionFlashRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power4.in"
      }, "rupture")
      .to(explosionFlashRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "rupture+=0.1")
      // Brillo nebula central
      .to(centralGlowRef.current, {
        scale: 7,
        opacity: 0,
        duration: 0.65,
        ease: "expo.out"
      }, "rupture")
      // Explosión de partículas vectoriales
      .to(particles, {
        x: () => `random(-280, 280)`,
        y: () => `random(-280, 280)`,
        opacity: "random(0.8, 1)",
        duration: 0.45,
        ease: "power3.out",
        stagger: { amount: 0.05 }
      }, "rupture")
      .to(particles, {
        scale: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power1.in",
        stagger: { amount: 0.05 }
      }, "rupture+=0.25");
  };

  // Fase 3: REVEALING - Dispersión de cartas tipo poker en grid
  useEffect(() => {
    if (openingState === 'REVEALING') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.fromTo('.card-wrapper', 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 }
        );
        return;
      }

      // Animación de dispersión desde el centro de la pantalla
      const timer = setTimeout(() => {
        gsap.fromTo('.card-wrapper',
          { 
            scale: 0.1, 
            x: (index, target) => {
              if (!cardsContainerRef.current) return 0;
              const containerRect = cardsContainerRef.current.getBoundingClientRect();
              const cardRect = target.getBoundingClientRect();
              const containerCenter = containerRect.left + containerRect.width / 2;
              const cardCenter = cardRect.left + cardRect.width / 2;
              return containerCenter - cardCenter;
            },
            y: (index, target) => {
              if (!cardsContainerRef.current) return 0;
              const containerRect = cardsContainerRef.current.getBoundingClientRect();
              const cardRect = target.getBoundingClientRect();
              const containerCenter = containerRect.top + containerRect.height / 2;
              const cardCenter = cardRect.top + cardRect.height / 2;
              return containerCenter - cardCenter + 100;
            },
            rotationX: 45, 
            rotationY: 0, 
            opacity: 0 
          },
          {
            scale: 1,
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.12,
            ease: "power4.out",
            force3D: true
          }
        );
      }, 60);

      return () => clearTimeout(timer);
    }
  }, [openingState]);

  // Fase 4: Volteo y feedback de audio de rareza al hacer clic
  const handleCardClick = (cardId, rarity) => {
    if (revealedCards[cardId]) return;

    setRevealedCards(prev => ({
      ...prev,
      [cardId]: true
    }));
  };

  return (
    <div 
      ref={sceneContainerRef} 
      className="relative flex items-center justify-center w-full min-h-[650px] overflow-hidden select-none rounded-[2.5rem]"
    >
      {/* Fondo estelar sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_75%)] pointer-events-none" />

      {/* Contenedor de partículas */}
      <div ref={particlesWrapperRef} className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center" />

      {/* Brillo central expansivo */}
      <div
        ref={centralGlowRef}
        className="absolute w-64 h-64 rounded-full bg-sky-500/25 opacity-0 blur-[85px] pointer-events-none z-10"
      />

      {/* FASE 1 & 2: SOBRE FÍSICO */}
      {openingState !== 'REVEALING' && (
        <div
          ref={packRef}
          onClick={handlePackTap}
          className="relative w-[290px] h-[415px] cursor-pointer z-20 select-none"
          style={{ transformStyle: 'preserve-3d', perspective: '1100px' }}
        >
          {/* Mitad Superior del Sobre */}
          <div
            ref={packTopHalfRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              clipPath: zigzagClipPathTop,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.5))'
            }}
          >
            <img
              src={boosterArtUrl}
              alt="Sobre Mitad Superior"
              className="w-full h-full object-contain pointer-events-none saturate-[1.05] brightness-95"
            />
          </div>

          {/* Mitad Inferior del Sobre */}
          <div
            ref={packBottomHalfRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              clipPath: zigzagClipPathBottom,
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden',
              filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.5))'
            }}
          >
            <img
              src={boosterArtUrl}
              alt="Sobre Mitad Inferior"
              className="w-full h-full object-contain pointer-events-none saturate-[1.05] brightness-95"
            />
          </div>
          
          {/* Guía de gesto */}
          {hitCount === 0 && (
            <div className="absolute -bottom-14 w-full text-center pointer-events-none animate-pulse">
              <span className="text-xs text-sky-400 font-mono tracking-[0.2em] uppercase bg-zinc-900/90 border border-sky-500/30 px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.25)]">
                Toca para abrir
              </span>
            </div>
          )}
        </div>
      )}

      {/* FASE 3 & 4: DISPERSIÓN DE CARTAS */}
      {openingState === 'REVEALING' && (
        <div 
          ref={cardsContainerRef}
          className="relative flex flex-wrap justify-center gap-6 xl:gap-8 items-center z-20 w-full max-w-6xl py-8 px-4"
        >
          {CARDS_DATA.map((card, index) => (
            <div
              key={card.id}
              className="card-wrapper select-none"
              onClick={() => handleCardClick(card.id, card.rarity)}
            >
              <HoloCard
                rarity={card.rarity}
                gallery={card.gallery}
                subtypes={card.subtypes}
                supertype={card.supertype}
                frontImage={card.frontImage}
                initialFlipped={true}
                name={card.name}
                desc={card.desc}
                style={{
                  '--glow': card.glowColor
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Flash cegador superior */}
      <div
        ref={explosionFlashRef}
        className="absolute inset-0 bg-white opacity-0 pointer-events-none z-50 transition-opacity duration-75"
      />
    </div>
  );
};

export default PackOpening;
