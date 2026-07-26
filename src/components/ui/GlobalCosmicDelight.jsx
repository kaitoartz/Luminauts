import React, { useState, useEffect } from 'react';
import CosmicParticleExplosion from './CosmicParticleExplosion';

export default function GlobalCosmicDelight() {
  const [delights, setDelights] = useState([]);

  useEffect(() => {
    let lastTime = 0;

    const handlePointerDown = (e) => {
      // Don't trigger on input/textarea focus typing
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      const now = Date.now();
      if (now - lastTime < 180) return; // Throttle to prevent double-bursts
      lastTime = now;

      // Only trigger if valid screen coordinates exist
      if (typeof e.clientX !== 'number' || typeof e.clientY !== 'number') return;

      const newDelight = {
        id: `delight-${now}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY
      };

      setDelights(prev => [...prev, newDelight]);
    };

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  return (
    <>
      {delights.map(d => (
        <CosmicParticleExplosion
          key={d.id}
          active={true}
          x={d.x}
          y={d.y}
          onComplete={() => {
            setDelights(prev => prev.filter(item => item.id !== d.id));
          }}
        />
      ))}
    </>
  );
}
