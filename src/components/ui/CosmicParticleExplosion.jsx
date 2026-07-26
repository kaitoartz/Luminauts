import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

export default function CosmicParticleExplosion({ active, x, y, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) return;

    // Generate 12 random cosmic star particles
    const newParticles = Array.from({ length: 12 }).map((_, i) => {
      const angle = (i * 30 + Math.random() * 15) * (Math.PI / 180);
      const distance = 30 + Math.random() * 40;
      const size = 6 + Math.random() * 8;
      
      return {
        id: `particle-${Date.now()}-${i}-${Math.random()}`,
        tx: Math.cos(angle) * distance,
        ty: Math.sin(angle) * distance,
        size,
        color: ['#E0B0FF', '#8DA9C4', '#FFFFFF', '#FFE885'][Math.floor(Math.random() * 4)],
        duration: 0.5 + Math.random() * 0.3
      };
    });

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setParticles([]);
      if (onComplete) onComplete();
    }, 900);

    return () => clearTimeout(timer);
  }, [active, onComplete]);

  if (particles.length === 0) return null;

  const content = (
    <div 
      className="fixed pointer-events-none z-[9999] overflow-visible"
      style={{ left: x, top: y }}
    >
      {particles.map(p => (
        <motion.svg
          key={p.id}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0, rotate: 0 }}
          animate={{ 
            opacity: 0, 
            scale: [0, 1.2, 0.2], 
            x: p.tx, 
            y: p.ty,
            rotate: 180 + Math.random() * 180
          }}
          transition={{ duration: p.duration, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            width: p.size, 
            height: p.size, 
            position: 'absolute', 
            left: 0, 
            top: 0, 
            transform: 'translate(-50%, -50%)' 
          }}
          viewBox="0 0 24 24"
        >
          <path
            fill={p.color}
            d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z"
          />
        </motion.svg>
      ))}
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(content, document.body) : null;
}
