/* eslint-disable react/no-unknown-property */
import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';
import HoloCard from './HoloCard';
import lumipackGLB from '../../assets/lumipack.glb';

// Defer loading of GLB assets by commenting out initial preload
// useGLTF.preload(lumipackGLB);

const CARDS_DATA = [
  {
    id: 'nauta',
    rarity: 'common',
    subtypes: 'basic',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh35/56_hires.png',
    name: 'Nauta',
    desc: 'Carta Básica',
    glowColor: 'rgba(148, 163, 184, 0.4)'
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
    glowColor: 'rgba(56, 189, 248, 0.6)'
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
    glowColor: 'rgba(99, 102, 241, 0.7)'
  },
  {
    id: 'cosmos',
    rarity: 'radiant rare',
    subtypes: 'basic',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh10/27_hires.png',
    name: 'Cosmos',
    desc: 'Resplandor Radiante',
    glowColor: 'rgba(192, 132, 252, 0.8)'
  },
  {
    id: 'supernova',
    rarity: 'rare secret',
    subtypes: 'secret',
    supertype: 'pokémon',
    frontImage: 'https://images.pokemontcg.io/swsh9/186_hires.png',
    name: 'SuperNova',
    desc: 'Edición Secreta / Fundador',
    glowColor: 'rgba(250, 204, 21, 0.9)'
  }
];

function LumiPackModel({ mousePos, hitCount, isOpening }) {
  const { scene } = useGLTF(lumipackGLB);
  const modelRef = useRef();
  const spinOffset = useRef({ angle: 0 });

  // Clone scene so multiple instances don't share node transforms
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.roughness = 0.25;
          child.material.metalness = 0.75;
          child.material.envMapIntensity = 1.5;
        }
      }
    });
    return clone;
  }, [scene]);

  // Animación del acumulador de giro al hacer clic
  useEffect(() => {
    if (hitCount > 0) {
      gsap.to(spinOffset.current, {
        angle: hitCount * Math.PI * 2,
        duration: 1.65,
        ease: "back.out(1.4)"
      });
    }
  }, [hitCount]);

  useFrame(() => {
    if (!modelRef.current || isOpening) return;
    
    // Lerp suave combinando inercia de mouse + giro acumulado de clics
    const targetRx = (mousePos.current.y - 0.5) * -0.6;
    const targetRy = (mousePos.current.x - 0.5) * 0.6 + spinOffset.current.angle;

    modelRef.current.rotation.x = THREE.MathUtils.lerp(modelRef.current.rotation.x, targetRx, 0.12);
    modelRef.current.rotation.y = THREE.MathUtils.lerp(modelRef.current.rotation.y, targetRy, 0.12);
  });

  return (
    <group ref={modelRef} scale={3.2} position={[0, -0.3, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

const PackOpening = () => {
  const [openingState, setOpeningState] = useState('IDLE'); // IDLE, HIT, OPENING, REVEALING
  const [hitCount, setHitCount] = useState(0);
  const [revealedCards, setRevealedCards] = useState({});
  const [isInView, setIsInView] = useState(false);
  const MAX_HITS = 4;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '120px' }
    );
    if (sceneContainerRef.current) {
      observer.observe(sceneContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const packContainerRef = useRef(null);
  const explosionFlashRef = useRef(null);
  const centralGlowRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const particlesWrapperRef = useRef(null);
  const sceneContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!packContainerRef.current || openingState === 'OPENING') return;
    const rect = packContainerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    mousePos.current = { x: Math.max(0, Math.min(1, px)), y: Math.max(0, Math.min(1, py)) };
  };

  const handleTouchMove = (e) => {
    if (!packContainerRef.current || openingState === 'OPENING' || !e.touches || !e.touches[0]) return;
    const touch = e.touches[0];
    const rect = packContainerRef.current.getBoundingClientRect();
    const px = (touch.clientX - rect.left) / rect.width;
    const py = (touch.clientY - rect.top) / rect.height;
    mousePos.current = { x: Math.max(0, Math.min(1, px)), y: Math.max(0, Math.min(1, py)) };
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: 0.5, y: 0.5 };
  };

  // Fase 1: HIT - Feedback de toque y squish
  const handlePackTap = (e) => {
    if (openingState === 'OPENING' || openingState === 'REVEALING') return;

    const newHitCount = hitCount + 1;
    setHitCount(newHitCount);
    setOpeningState('HIT');

    // Chispas al tocar el sobre 3D
    if (particlesWrapperRef.current && sceneContainerRef.current) {
      const rect = sceneContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const spark = document.createElement('div');
      spark.className = 'absolute w-14 h-14 rounded-full pointer-events-none z-30 mix-blend-screen';
      spark.style.left = `${x - 28}px`;
      spark.style.top = `${y - 28}px`;
      spark.style.background = 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(224,176,255,0.7) 40%, rgba(56,189,248,0.4) 70%, transparent 100%)';
      particlesWrapperRef.current.appendChild(spark);

      gsap.to(spark, {
        scale: 2.8,
        opacity: 0,
        duration: 0.38,
        ease: "power2.out",
        onComplete: () => spark.remove()
      });
    }

    gsap.killTweensOf(packContainerRef.current);

    if (newHitCount >= MAX_HITS) {
      executeExplosiveTearSequence();
      return;
    }

    const intensity = 1 + (newHitCount * 0.15);
    const squishScaleX = 1 + (0.07 * intensity);
    const squishScaleY = 1 - (0.07 * intensity);

    const tl = gsap.timeline({
      onComplete: () => {
        setOpeningState('IDLE');
      }
    });

    tl.to(packContainerRef.current, {
      scaleX: squishScaleX,
      scaleY: squishScaleY,
      duration: 0.08,
      ease: "power2.in"
    }).to(packContainerRef.current, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.45,
      ease: "elastic.out(1.1, 0.4)"
    });
  };

  // Fase 2: OPENING - Animación de explosión 3D
  const executeExplosiveTearSequence = () => {
    setOpeningState('OPENING');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const numParticles = prefersReducedMotion ? 10 : 40;
    const particles = [];

    if (particlesWrapperRef.current) {
      particlesWrapperRef.current.innerHTML = '';
      for (let i = 0; i < numParticles; i++) {
        const p = document.createElement('div');
        p.className = 'absolute w-3 h-3 rounded-full bg-gradient-to-r from-[#E0B0FF] via-sky-300 to-white opacity-0 pointer-events-none z-30 mix-blend-screen';
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
      masterTimeline
        .to(packContainerRef.current, { opacity: 0, scale: 0.8, duration: 0.4, ease: "power2.out" })
        .to(explosionFlashRef.current, { opacity: 1, duration: 0.1 })
        .to(explosionFlashRef.current, { opacity: 0, duration: 0.4 });
      return;
    }

    gsap.set(particles, { x: 0, y: 0, scale: "random(0.6, 2.2)" });

    masterTimeline.addLabel("rupture")
      .to(packContainerRef.current, {
        scale: 1.4,
        rotationZ: 15,
        opacity: 0,
        duration: 0.65,
        ease: "power3.in"
      }, "rupture")
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
      .to(centralGlowRef.current, {
        scale: 8,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out"
      }, "rupture")
      .to(particles, {
        x: () => `random(-320, 320)`,
        y: () => `random(-320, 320)`,
        opacity: "random(0.8, 1)",
        duration: 0.5,
        ease: "power3.out",
        stagger: { amount: 0.06 }
      }, "rupture")
      .to(particles, {
        scale: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power1.in",
        stagger: { amount: 0.05 }
      }, "rupture+=0.3");
  };

  // Fase 3: REVEALING - Dispersión de cartas
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

  const handleCardClick = (cardId) => {
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(144,89,200,0.12)_0%,transparent_75%)] pointer-events-none" />

      {/* Contenedor de partículas */}
      <div ref={particlesWrapperRef} className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center" />

      {/* Brillo central expansivo */}
      <div
        ref={centralGlowRef}
        className="absolute w-64 h-64 rounded-full bg-[#E0B0FF]/25 opacity-0 blur-[85px] pointer-events-none z-10"
      />

      {/* FASE 1 & 2: MODELO SOBRE 3D GLB CON R3F CANVAS */}
      {openingState !== 'REVEALING' && (
        <div
          ref={packContainerRef}
          onClick={handlePackTap}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchMove}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseLeave}
          style={{ touchAction: 'pan-y' }}
          className="relative w-[320px] h-[400px] cursor-pointer z-20 select-none flex items-center justify-center touch-pan-y"
        >
          {isInView ? (
            <>
              <Canvas
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 9.2], fov: 45 }}
                gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
                className="w-full h-full pointer-events-none"
              >
                <ambientLight intensity={1.2} />
                <directionalLight position={[5, 8, 5]} intensity={2.5} color="#E0B0FF" />
                <directionalLight position={[-5, -4, -2]} intensity={1.2} color="#8DA9C4" />
                <spotLight position={[0, 10, 8]} angle={0.4} penumbra={1} intensity={3} color="#ffffff" />
                
                <Suspense fallback={null}>
                  <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
                    <LumiPackModel 
                      mousePos={mousePos} 
                      hitCount={hitCount}
                      isOpening={openingState === 'OPENING'}
                    />
                  </Float>
                  <Environment resolution={32}>
                    <mesh position={[0, 5, 0]} scale={[10, 1, 10]}>
                      <planeGeometry />
                      <meshBasicMaterial color="#E0B0FF" toneMapped={false} />
                    </mesh>
                    <mesh position={[5, 0, 0]} scale={[1, 10, 10]}>
                      <planeGeometry />
                      <meshBasicMaterial color="#8DA9C4" toneMapped={false} />
                    </mesh>
                  </Environment>
                </Suspense>

                <ContactShadows position={[0, -2.4, 0]} opacity={0.6} scale={6} blur={2.2} far={4} />
              </Canvas>
            </>
          ) : (
            <div className="w-full h-full rounded-[2.5rem] bg-zinc-900/60 border border-zinc-800 flex flex-col items-center justify-center p-6 text-center animate-pulse relative overflow-hidden backdrop-blur-md">
              <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#E0B0FF]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="w-24 h-36 bg-[#E0B0FF]/10 border border-[#E0B0FF]/20 rounded-2xl mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(224,176,255,0.1)]">
                <span className="text-3xl animate-bounce">🪐</span>
              </div>
              <p className="text-xs text-[#E0B0FF] font-mono tracking-[0.22em] uppercase font-black">
                Preparando Sobre Estelar...
              </p>
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
          {CARDS_DATA.map((card) => (
            <div
              key={card.id}
              className="card-wrapper select-none"
              onClick={() => handleCardClick(card.id)}
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
