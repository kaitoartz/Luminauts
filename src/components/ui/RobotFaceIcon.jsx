import React from 'react';

export const RobotFaceIcon = ({ className, state = 'sleep', ...props }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="4.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <defs>
        <style>{`
          @keyframes bob {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(3px);
            }
          }
          @keyframes breathe {
            0%, 100% {
              r: 6px;
            }
            50% {
              r: 3px;
            }
          }
          @keyframes float-zzz {
            0% {
              opacity: 0;
              transform: translate(0px, 0px) scale(0.6);
            }
            20% {
              opacity: 0.8;
            }
            80% {
              opacity: 0.8;
            }
            100% {
              opacity: 0;
              transform: translate(12px, -20px) scale(1.2);
            }
          }
          @keyframes shake {
            0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-1.5px, 1px) rotate(-1deg); }
            20%, 40%, 60%, 80% { transform: translate(1.5px, -1px) rotate(1deg); }
          }
          .bot-head-group {
            transform-origin: 50px 54px;
            transition: transform 0.3s ease;
          }
          .bot-head-group.state-sleep {
            animation: bob 4s ease-in-out infinite;
          }
          .bot-head-group.state-awake {
            animation: bob 6s ease-in-out infinite;
          }
          .bot-head-group.state-happy {
            animation: bob 2s ease-in-out infinite;
          }
          .bot-head-group.state-surprised {
            animation: shake 0.5s ease-in-out infinite;
          }
          .bot-mouth-sleep {
            animation: breathe 4s ease-in-out infinite;
          }
          .zzz-1 {
            animation: float-zzz 3.6s infinite ease-in-out;
            animation-delay: 0s;
            transform-origin: 56px 64px;
            font-family: system-ui, sans-serif;
            font-weight: bold;
            font-size: 11px;
            fill: currentColor;
            stroke: none;
          }
          .zzz-2 {
            animation: float-zzz 3.6s infinite ease-in-out;
            animation-delay: 1.2s;
            transform-origin: 56px 64px;
            font-family: system-ui, sans-serif;
            font-weight: bold;
            font-size: 9px;
            fill: currentColor;
            stroke: none;
          }
          .zzz-3 {
            animation: float-zzz 3.6s infinite ease-in-out;
            animation-delay: 2.4s;
            transform-origin: 56px 64px;
            font-family: system-ui, sans-serif;
            font-weight: bold;
            font-size: 7px;
            fill: currentColor;
            stroke: none;
          }
        `}</style>
      </defs>

      {/* Floating Zzz letters - Only visible in sleep state */}
      {state === 'sleep' && (
        <>
          <text x="56" y="64" className="zzz-1">z</text>
          <text x="56" y="64" className="zzz-2">z</text>
          <text x="56" y="64" className="zzz-3">z</text>
        </>
      )}

      {/* Main animated head group */}
      <g className={`bot-head-group state-${state}`}>
        {/* Antennas */}
        <path d="M 23 26 L 23 15" />
        <circle cx="23" cy="12" r="3.5" />
        
        <path d="M 77 26 L 77 15" />
        <circle cx="77" cy="12" r="3.5" />

        {/* Head Outline */}
        <path d="M 50 18 C 28 18, 15 31, 15 54 C 15 76, 30 89, 50 89 C 70 89, 85 76, 85 54 C 85 31, 72 18, 50 18 Z" />

        {/* Forehead Details */}
        <path d="M 45 28 L 55 28" />
        <path d="M 47.5 22.5 L 52.5 22.5" />

        {/* Inner Face Plate */}
        <rect x="23" y="42" width="54" height="34" rx="17" />

        {/* Eyes based on state */}
        {state === 'sleep' && (
          <>
            <path d="M 33 55 L 43 55" />
            <path d="M 57 55 L 67 55" />
          </>
        )}
        {state === 'awake' && (
          <>
            <circle cx="38" cy="54" r="3.5" />
            <circle cx="62" cy="54" r="3.5" />
          </>
        )}
        {state === 'happy' && (
          <>
            <path d="M 33 57 Q 38 51 43 57" />
            <path d="M 57 57 Q 62 51 67 57" />
          </>
        )}
        {state === 'surprised' && (
          <>
            <circle cx="38" cy="54" r="5.5" />
            <circle cx="62" cy="54" r="5.5" />
          </>
        )}

        {/* Mouth based on state */}
        {state === 'sleep' && (
          <circle cx="50" cy="68" r="6" className="bot-mouth-sleep" />
        )}
        {state === 'awake' && (
          <path d="M 45 68 L 55 68" />
        )}
        {state === 'happy' && (
          <path d="M 42 66 Q 50 74 58 66" />
        )}
        {state === 'surprised' && (
          <circle cx="50" cy="68" r="8" />
        )}
      </g>
    </svg>
  );
};
