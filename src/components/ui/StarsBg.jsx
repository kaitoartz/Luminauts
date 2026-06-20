import React from 'react';
import './StarsBg.css';

const StarsBg = ({ className = '', showBg = false }) => {
  return (
    <div className={`stars-bg-container ${showBg ? 'stars-bg-with-gradient' : ''} ${className}`}>
      {/* Render 1:1 CSS pixels for sharp, non-scaling vector shapes across resolutions */}
      <svg className="stars-parallax-svg">
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

          {/* Reusable Star Template for Pooling with grouped offsets to separate stars and cover more space */}
          <g id="stars_paths" fill="#ffffff">
            {/* Cluster A: Stays in original sector */}
            <g>
              <path d="M699.71,128.24a1,1,0,1,1-1-1A1,1,0,0,1,699.71,128.24Z" />
              <path d="M643.78,37.74a1,1,0,1,1-1-1A1,1,0,0,1,643.78,37.74Z" />
              <path d="M666.33,139.16a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,666.33,139.16Z" />
              <circle cx="636.11" cy="77.24" r="1.46" />
              <path d="M714.4,31.27a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,714.4,31.27Z" />
              <path d="M725,27.36a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,725,27.36Z" />
              <path d="M468.41,65.4A1.46,1.46,0,1,1,467,63.94,1.46,1.46,0,0,1,468.41,65.4Z" />
              <path d="M710,97.11a1.46,1.46,0,1,1-1.46-1.46A1.45,1.45,0,0,1,710,97.11Z" />
              <circle cx="711.49" cy="170.22" r="1.46" />
              <path d="M677.73,260.6a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,677.73,260.6Z" />
              <path d="M731.11,208.78a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,731.11,208.78Z" />
              <path d="M447.4,234.79a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,447.4,234.79Z" />
              <path d="M523.16,200.18a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,523.16,200.18Z" />
              <path d="M624.94,167.77a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,624.94,167.77Z" />
              <path d="M562.88,139.31a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,562.88,139.31Z" />
              <path d="M372,86.87a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,372,86.87Z" />
              <circle cx="473.23" cy="34.67" r="1.46" />
              <path d="M398.74,28.36a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,398.74,28.36Z" />
            </g>

            {/* Cluster B: Shifted horizontally and vertically to create space */}
            <g transform="translate(250, -180)">
              <path d="M448.85,192.73a1.46,1.46,0,1,1-1.45-1.46A1.46,1.46,0,0,1,448.85,192.73Z" />
              <circle cx="616.73" cy="121.26" r="1.46" />
              <circle cx="559.97" cy="25.73" r="1.46" />
              <circle cx="679.95" cy="161.38" r="1.46" />
              <circle cx="558.51" cy="229.54" r="1.46" />
              <path d="M692.7,250.2a1.46,1.46,0,1,1-1.45-1.46A1.46,1.46,0,0,1,692.7,250.2Z" />
              <circle cx="616.73" cy="201.91" r="1.46" />
              <circle cx="544.82" cy="223.87" r="1.46" />
              <path d="M450.53,73.81a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,450.53,73.81Z" />
              <path d="M445.94,201.63a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,445.94,201.63Z" />
              <path d="M186.43,237.31a1,1,0,1,1-1-1A1,1,0,0,1,186.43,237.31Z" />
              <path d="M291.32,199.17a1,1,0,1,1-1-1A1,1,0,0,1,291.32,199.17Z" />
              <path d="M153.05,248.24a1.46,1.46,0,1,1-1.46-1.46A1.45,1.45,0,0,1,153.05,248.24Z" />
              <path d="M114,221.87a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,114,221.87Z" />
              <path d="M154.88,151.93a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,154.88,151.93Z" />
              <path d="M199.67,279.29a1.46,1.46,0,1,1-1.46-1.46A1.47,1.47,0,0,1,199.67,279.29Z" />
              <path d="M54.91,249.69a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,54.91,249.69Z" />
              <circle cx="166.68" cy="270.45" r="1.46" />
            </g>

            {/* Cluster C: Scattered further to fill the box and prevent clustering */}
            <g transform="translate(-320, 220)">
              <path d="M166.68,191.27a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,166.68,191.27Z" />
              <path d="M185.88,123.67a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,185.88,123.67Z" />
              <circle cx="671.95" cy="113.82" r="1.46" />
              <path d="M631.32,65.4a1.46,1.46,0,1,1-1.46-1.46A1.47,1.47,0,0,1,631.32,65.4Z" />
              <path d="M30,149a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,30,149Z" />
              <circle cx="104.05" cy="109.88" r="1.46" />
              <path d="M108.42,183a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,108.42,183Z" />
              <path d="M76.88,174.14a1.46,1.46,0,1,1-1.45-1.45A1.45,1.45,0,0,1,76.88,174.14Z" />
              <path d="M76.88,78.7a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,76.88,78.7Z" />
              <path d="M239,207.33a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,239,207.33Z" />
              <path d="M598,191.27a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,598,191.27Z" />
              <path d="M509.84,86.87a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,509.84,86.87Z" />
              <path d="M285.57,238.38a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,285.57,238.38Z" />
              <circle cx="252.58" cy="229.54" r="1.46" />
              <path d="M222.07,80.16a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,222.07,80.16Z" />
              <path d="M251.13,29.82a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,251.13,29.82Z" />
              <path d="M190.54,71.32a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,190.54,71.32Z" />
              <circle cx="351.16" cy="104.5" r="1.46" />
            </g>

            {/* Cluster D: Spread to bottom and far right boundaries */}
            <g transform="translate(420, 280)">
              <path d="M294.24,80.16a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,294.24,80.16Z" />
              <path d="M367.7,126.71a1.46,1.46,0,1,1-1.46-1.45A1.46,1.46,0,0,1,367.7,126.71Z" />
              <path d="M358.52,77.06a1.46,1.46,0,1,1-1.46-1.46A1.47,1.47,0,0,1,358.52,77.06Z" />
              <path d="M49,126.59a1.46,1.46,0,1,1-1.45-1.46A1.45,1.45,0,0,1,49,126.59Z" />
              <path d="M22.81,37.74a1.46,1.46,0,1,1-1.46-1.46A1.46,1.46,0,0,1,22.81,37.74Z" />
              <path d="M150.15,74.81a1,1,0,1,1-1-1A1,1,0,0,1,150.15,74.81Z" />
              <path d="M89.47,27.36a1,1,0,1,1-1-1A1,1,0,0,1,89.47,27.36Z" />
              <circle cx="32.33" cy="82.62" r="1" />
              <path d="M100.29,143.93a1,1,0,0,1-2,0,1,1,0,0,1,2,0Z" />
              <circle cx="48.8" cy="202.91" r="1" />
              <path d="M225.77,129.05a1,1,0,1,1-1-1A1,1,0,0,1,225.77,129.05Z" />
              <path d="M283.66,83.62a1,1,0,1,1-1-1A1,1,0,0,1,283.66,83.62Z" />
              <circle cx="474.23" cy="222.87" r="1" />
              <circle cx="663.41" cy="189.82" r="1" />
              <path d="M599.68,251.66a1,1,0,1,1-1-1A1,1,0,0,1,599.68,251.66Z" />
              <circle cx="349.25" cy="41.39" r="1" />
              <circle cx="557.51" cy="100.02" r="1" />
              <path d="M551.87,115.27a1,1,0,1,1-1-1A1,1,0,0,1,551.87,115.27Z" />
              <path d="M160.47,43.68A1.46,1.46,0,1,1,159,42.22,1.45,1.45,0,0,1,160.47,43.68Z" />
              <circle cx="122.39" cy="60.39" r="1.46" />
            </g>
          </g>
        </defs>

        {/* Comet / Shooting Star */}
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

        {/* Multi-depth 3D Parallax Star Layers */}
        
        {/* Layer 1: Far Stars (Smaller, dimmer, slower scroll speed, wraps at 960px) */}
        <g id="stars_far" style={{ opacity: .4 }}>
          {/* Row 1 */}
          <g className="stars-pool-layer" transform="scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(600, 0) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1200, 0) scale(0.8)"><use href="#stars_paths" /></g>
          {/* Row 2 */}
          <g className="stars-pool-layer" transform="translate(300, 600) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(900, 600) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1500, 600) scale(0.8)"><use href="#stars_paths" /></g>
          {/* Row 3 */}
          <g className="stars-pool-layer" transform="translate(0, 1200) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(600, 1200) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1200, 1200) scale(0.8)"><use href="#stars_paths" /></g>
          {/* Row 4 */}
          <g className="stars-pool-layer" transform="translate(300, 1800) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(900, 1800) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1500, 1800) scale(0.8)"><use href="#stars_paths" /></g>
          {/* Row 5 */}
          <g className="stars-pool-layer" transform="translate(0, 2400) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(600, 2400) scale(0.8)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1200, 2400) scale(0.8)"><use href="#stars_paths" /></g>
        </g>

        {/* Layer 2: Close Stars (Larger, brighter, faster scroll speed, wraps at 1680px) */}
        <g id="stars_close" style={{ opacity: .8 }}>
          {/* Row 1 */}
          <g className="stars-pool-layer" transform="translate(300, 300) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(900, 300) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1500, 300) scale(1.4)"><use href="#stars_paths" /></g>
          {/* Row 2 */}
          <g className="stars-pool-layer" transform="translate(0, 900) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(600, 900) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1200, 900) scale(1.4)"><use href="#stars_paths" /></g>
          {/* Row 3 */}
          <g className="stars-pool-layer" transform="translate(300, 1500) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(900, 1500) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1500, 1500) scale(1.4)"><use href="#stars_paths" /></g>
          {/* Row 4 */}
          <g className="stars-pool-layer" transform="translate(0, 2100) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(600, 2100) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1200, 2100) scale(1.4)"><use href="#stars_paths" /></g>
          {/* Row 5 */}
          <g className="stars-pool-layer" transform="translate(300, 2700) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(900, 2700) scale(1.4)"><use href="#stars_paths" /></g>
          <g className="stars-pool-layer" transform="translate(1500, 2700) scale(1.4)"><use href="#stars_paths" /></g>
        </g>
      </svg>
    </div>
  );
};

export default StarsBg;
