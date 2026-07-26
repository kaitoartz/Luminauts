import React, { useRef, useEffect } from 'react';

/**
 * Reusable, premium 3D interactive glass card component.
 * Features:
 * - 3D Tilt interaction following the mouse (when interactive={true}).
 * - Dynamic spotlight glow overlay following the cursor.
 * - Nebula ambient glow shadow matching the Zero-Gravity rule.
 * - Perfectly static when interactive={false}.
 */
export default function LuminautsInteractiveCard({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(107, 139, 180, 0.25)', // default Cosmic Blue glow
  interactive = true,
  onClick,
  ...props
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !interactive) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Safe bounds to prevent excessive tilt
      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = ((y - centerY) / centerY) * -12;

      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
      card.style.setProperty('--scale', `1.03`);
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--glow-opacity', '1');
    };

    const handleTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const touch = e.touches[0];
      const rect = card.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * 12;
      const rotateX = ((y - centerY) / centerY) * -12;

      card.style.setProperty('--rx', `${rotateX}deg`);
      card.style.setProperty('--ry', `${rotateY}deg`);
      card.style.setProperty('--scale', `1.03`);
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--glow-opacity', '1');
    };

    const handleMouseLeave = () => {
      card.style.setProperty('--rx', `0deg`);
      card.style.setProperty('--ry', `0deg`);
      card.style.setProperty('--scale', `1`);
      card.style.setProperty('--glow-opacity', '0');
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('touchmove', handleTouchMove, { passive: true });
    card.addEventListener('touchend', handleMouseLeave, { passive: true });

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleMouseLeave);
    };
  }, [interactive]);

  const cursorClass = interactive || onClick ? 'cursor-pointer' : 'cursor-default';

  return (
    <div 
      className={`w-full h-full flex flex-col ${className}`}
      style={{ perspective: interactive ? '1000px' : 'none', ...style }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        className={`relative w-full h-full flex-grow rounded-[2rem] border border-zinc-800/40 bg-zinc-900/35 transition-all duration-300 ease-out select-none ${cursorClass} ${interactive ? 'group' : ''} flex flex-col justify-between overflow-hidden p-8 touch-pan-y`}
        style={{
          transformStyle: interactive ? 'preserve-3d' : 'flat',
          transform: interactive ? 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1))' : 'none',
          willChange: interactive ? 'transform' : 'auto',
          touchAction: 'pan-y'
        }}
        {...props}
      >
        {/* Glow overlay - only active when interactive */}
        {interactive && (
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0"
            style={{
              background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
              borderRadius: '2rem'
            }}
          />
        )}

        {/* Spotlight overlay following the cursor */}
        {interactive && (
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle 220px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 80%)`,
              mixBlendMode: 'screen',
              zIndex: 1
            }}
          />
        )}

        {/* Ambient Nebula backglow - only active when interactive */}
        {interactive && (
          <div
            className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-[#6B8BB4]/20 via-transparent to-[#E0B0FF]/20 opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{
              maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent)',
              WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent)'
            }}
          />
        )}

        {/* Inner Content wrapper */}
        <div 
          className="relative z-10 w-full h-full flex flex-col justify-between"
          style={{ transform: interactive ? 'translateZ(20px)' : 'none', transformStyle: interactive ? 'preserve-3d' : 'flat' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
