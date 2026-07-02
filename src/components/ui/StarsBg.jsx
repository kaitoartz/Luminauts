import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StarsBg.css';

gsap.registerPlugin(ScrollTrigger);

const StarsBg = ({ className = '', showBg = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const isLowEnd = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);

    // 1. Generate Stars (Adjust count to control star density across the page)
    const count = isMobile || isLowEnd ? 45 : 180;
    const starsData = [];
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      // Parent wrapper handles position, wrapping and velocity stretching
      const wrapper = document.createElement('div');
      wrapper.className = 'star-wrapper';

      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // 30% chance to be completely static (distant stars)
      const isStatic = Math.random() < 0.3;
      const speed = isStatic ? 0 : 0.2 + Math.random() * 0.6;
      // Stars size range: static stars are smaller (0.8 - 1.4px), moving stars are larger (1.2 - 3px)
      const size = isStatic ? 0.8 + Math.random() * 0.6 : 1.2 + Math.random() * 1.8;

      wrapper.style.left = `${x}%`;
      wrapper.style.top = `${y}%`;
      wrapper.style.width = `${size}px`;
      wrapper.style.height = `${size}px`;

      // Child inner element handles the twinkle keyframe animation (prevents override by parent scaleY)
      const inner = document.createElement('div');
      inner.className = 'star-inner';

      // Custom twinkle variables
      const twinkleDuration = 2 + Math.random() * 4;
      const delay = Math.random() * 5;
      inner.style.setProperty('--duration', `${twinkleDuration}s`);
      inner.style.animationDelay = `${delay}s`;

      wrapper.appendChild(inner);
      container.appendChild(wrapper);
      starsData.push({ el: wrapper, initialY: y, speed });
    }

    // 2. Animate on Scroll via GSAP ScrollTrigger (Only on high-end/desktop)
    let trigger = null;
    if (!isMobile && !isLowEnd) {
      trigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const scroll = self.scroll();

          starsData.forEach((star) => {
            if (star.speed === 0) return;

            // Calculate wrapped position with infinite pooling (0.05 speed factor)
            let pos = (star.initialY - (scroll * star.speed * 0.05)) % 100;
            if (pos < 0) pos += 100;

            star.el.style.top = `${pos}%`;
          });
        }
      });
    }

    return () => {
      if (trigger) trigger.kill();
    };
  }, []);

  return (
    <div className={`stars-bg-container ${showBg ? 'stars-bg-with-gradient' : ''} ${className}`}>
      {/* Dynamic Star Container */}
      <div id="star-container" ref={containerRef} />

      {/* SVG Overlay for Comet */}
      <svg className="comet-overlay-svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        <defs>
          <radialGradient
            id="fstar-grad"
            cx="1362.39"
            cy="-53.7"
            r="39.39"
            gradientTransform="matrix(0.89, -0.45, -0.45, -0.89, -473.7, 640.57)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.06" stopColor="#fff" stopOpacity="0.8" />
            <stop offset="0.12" stopColor="#fff" stopOpacity="0.62" />
            <stop offset="0.19" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="0.26" stopColor="#fff" stopOpacity="0.31" />
            <stop offset="0.33" stopColor="#fff" stopOpacity="0.2" />
            <stop offset="0.41" stopColor="#fff" stopOpacity="0.11" />
            <stop offset="0.49" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="0.59" stopColor="#fff" stopOpacity="0.01" />
            <stop offset="0.72" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g id="fstar" style={{ opacity: 0 }}>
          <image
            width="707"
            height="429"
            transform="translate(728.46 16.5) scale(0.24)"
            href="https://i.ibb.co/TWfhqRG/fstar.png"
          />
          <circle
            cx="768.6"
            cy="78.72"
            r="39.39"
            transform="translate(64.22 396.2) rotate(-30.11)"
            fill="url(#fstar-grad)"
            style={{ mixBlendMode: 'overlay' }}
          />
        </g>
      </svg>
    </div>
  );
};

export default StarsBg;
