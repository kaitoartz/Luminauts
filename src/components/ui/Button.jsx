import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Standardized Impeccable Button Component
 * Supports variants: 'primary', 'secondary', 'shimmer', 'ghost', 'glow'
 * Sizes: 'sm', 'md', 'lg'
 */
const Button = forwardRef(({
  children,
  as = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  shimmer = false,
  ...props
}, ref) => {
  const [ripples, setRipples] = useState([]);
  
  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - rippleSize / 2;
    const y = event.clientY - rect.top - rippleSize / 2;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: rippleSize
    };
    
    setRipples(prev => [...prev, newRipple]);
  };

  const handleButtonClick = (e) => {
    if (disabled) return;
    createRipple(e);
    if (onClick) onClick(e);
  };

  const base = "inline-flex overflow-hidden items-center justify-center font-medium transition-all duration-300 ease-out group relative select-none cursor-pointer border border-transparent";
  
  const variants = {
    primary: "bg-[#6B8BB4] hover:bg-[#8DA9C4] text-white shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 active:scale-[0.97]",
    secondary: "bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-100 border-zinc-800 dark:border-zinc-700 hover:bg-zinc-800 dark:hover:bg-zinc-700 shadow-sm active:scale-[0.97]",
    shimmer: "bg-zinc-900 dark:bg-zinc-800 text-white dark:text-zinc-100 shadow hover:bg-zinc-800 dark:hover:bg-zinc-700 border-zinc-800 dark:border-zinc-700 hover:ring-2 hover:ring-zinc-900 dark:hover:ring-zinc-700 hover:ring-offset-2 hover:ring-offset-zinc-950",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900/60",
    glow: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-[0_0_25px_rgba(107,139,180,0.25)] hover:shadow-[0_0_35px_rgba(141,169,196,0.4)] border-zinc-700 dark:border-zinc-300"
  };

  const sizes = {
    sm: "h-9 px-4 py-2 text-xs rounded-xl gap-1.5",
    md: "h-11 px-5 py-2.5 text-sm rounded-2xl gap-2",
    lg: "h-12 px-6 py-3 text-base rounded-2xl gap-2.5"
  };

  const Component = as === 'a' ? motion.a : motion.button;
  const isShimmerActive = shimmer || variant === 'shimmer';

  return (
    <Component
      ref={ref}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${className}`} 
      onClick={handleButtonClick}
      disabled={disabled}
      {...props}
    >

      {/* Light shimmer beam line effect */}
      {isShimmerActive && (
        <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40 pointer-events-none" />
      )}

      {/* Shimmer gradient for primary */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}
      
      {/* Click ripples */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 3.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onAnimationComplete={() => {
            setRipples(prev => prev.filter(r => r.id !== ripple.id));
          }}
          style={{
            position: "absolute",
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: "50%",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            pointerEvents: "none",
            zIndex: 0
          }}
        />
      ))}
      <span className="relative flex items-center justify-center gap-2 z-10 w-full">{children}</span>
    </Component>
  );
});

Button.displayName = 'Button';

export const ShimmerButton = (props) => <Button variant="shimmer" {...props} />;

export default Button;
