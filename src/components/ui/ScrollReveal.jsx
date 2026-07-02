import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * ScrollReveal component to animate elements as they enter the viewport.
 * Integrates smoothly with Framer Motion and respects user accessibility settings.
 */
export default function ScrollReveal({
  children,
  origin = 'bottom',
  distance = 40,
  duration = 2,
  delay = .2,
  reset = false,
  threshold = 0.15,
  className = '',
  style = {}
}) {
  const ref = useRef(null);
  
  // Triggers visibility when the element is in view.
  // once: !reset means it won't hide again once scrolled past, unless reset = true is passed.
  const isInView = useInView(ref, {
    once: !reset,
    amount: threshold
  });
  
  const shouldReduceMotion = useReducedMotion();

  // Map direction origin to spatial transforms
  const getTransform = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (origin) {
      case 'top':
        return { x: 0, y: -distance };
      case 'bottom':
        return { x: 0, y: distance };
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      default:
        return { x: 0, y: distance };
    }
  };

  const transform = getTransform();

  const variants = {
    hidden: {
      opacity: 0,
      x: transform.x,
      y: transform.y,
      filter: shouldReduceMotion ? 'none' : 'blur(4px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
