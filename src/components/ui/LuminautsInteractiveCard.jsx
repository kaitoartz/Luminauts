import React, { useRef, useEffect } from 'react';

/**
 * Reusable, premium 3D interactive glass card component.
 * Features:
 * - 3D Tilt interaction following the mouse.
 * - Dynamic spotlight glow overlay following the cursor.
 * - Nebula ambient glow shadow matching the Zero-Gravity rule.
 * - Perfect accessibility and high-end visual design.
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

    const handleMouseLeave = () => {
      card.style.setProperty('--rx', `0deg`);
      card.style.setProperty('--ry', `0deg`);
      card.style.setProperty('--scale', `1`);
      card.style.setProperty('--glow-opacity', '0');
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [interactive]);

  return (
    <div 
      className={`w-full h-full flex flex-col ${className}`}
      style={{ perspective: '1000px', ...style }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        className="relative w-full h-full flex-grow rounded-[2rem] border border-zinc-800/40 bg-zinc-900/35 backdrop-blur-lg transition-all duration-300 ease-out select-none cursor-pointer group flex flex-col justify-between overflow-hidden p-8"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--scale, 1))',
          boxShadow: '0 10px 45px rgba(0, 0, 0, 0.35)',
          willChange: 'transform'
        }}
        {...props}
      >
        {/* Glow overlay using cheap radial gradient instead of blur filter */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
            borderRadius: '2rem'
          }}
        />
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

        {/* Ambient Nebula backglow */}
        <div
          className="absolute -inset-[2px] rounded-[2rem] bg-gradient-to-r from-[#6B8BB4]/20 via-transparent to-[#E0B0FF]/20 opacity-40 group-hover:opacity-150 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent)'
          }}
        />

        {/* Inner Content wrapper with depth */}
        <div 
          className="relative z-10 w-full h-full flex flex-col justify-between"
          style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
