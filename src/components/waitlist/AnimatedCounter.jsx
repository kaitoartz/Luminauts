import React, { useState, useEffect, useRef } from 'react';

/**
 * AnimatedCounter displays a progressively increasing number with a smooth quintic ease-out transition.
 * Uses requestAnimationFrame for native 60fps rendering without jank.
 */
export default function AnimatedCounter({ value }) {
  const [displayValue, setDisplayValue] = useState(() => Math.max(0, value - 120));
  const prevValueRef = useRef(0);
  const animationRef = useRef(null);

  useEffect(() => {
    const startValue = prevValueRef.current === 0 
      ? Math.max(0, value - 120) 
      : displayValue;

    prevValueRef.current = value;

    const startTime = performance.now();
    const duration = startValue === value - 120 ? 3000 : 1500; // longer animation on mount

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quintic easeOut
      const easeProgress = 1 - Math.pow(1 - progress, 5);
      const current = Math.floor(startValue + (value - startValue) * easeProgress);
      
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value]);

  useEffect(() => {
    setDisplayValue(Math.max(0, value - 120));
  }, []);

  return (
    <span className="font-extrabold text-white text-sm tabular-nums">
      {displayValue.toLocaleString()}
    </span>
  );
}
