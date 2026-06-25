import React from 'react';
import StarsBg from './StarsBg';

const AstronautLoader = ({ text = '', className = '' }) => {
  return (
    <div className={`ep-astro-container ${className}`}>
      <StarsBg showBg={true} />
      <div className="ep-astro-float-wrapper">
        <div className="ep-astro-astronaut">
          <div className="ep-astro-head" />
          <div className="ep-astro-arm ep-astro-arm-left" />
          <div className="ep-astro-arm ep-astro-arm-right" />
          <div className="ep-astro-body">
            <div className="ep-astro-panel" />
          </div>
          <div className="ep-astro-leg ep-astro-leg-left" />
          <div className="ep-astro-leg ep-astro-leg-right" />
          <div className="ep-astro-schoolbag" />
        </div>
      </div>
      <div className="ep-astro-status">{text}</div>
    </div>
  );
};

export default AstronautLoader;
