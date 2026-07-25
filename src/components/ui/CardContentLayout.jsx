import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lock, Star, User, Play } from 'lucide-react';
import Badge from './Badge';
import FavouriteToggle from './FavouriteToggle';

const StarSVG = ({ fill = "currentColor" }) => (
  <svg viewBox="0 0 784.11 815.53" style={{ shapeRendering: 'geometricPrecision', textRendering: 'geometricPrecision', imageRendering: 'optimizeQuality', fillRule: 'evenodd', clipRule: 'evenodd' }} version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Layer_x0020_1">
      <path d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z" fill={fill} />
    </g>
  </svg>
);

const CardContentLayout = ({ id, title, subject, level, duration, points, bg, icon: Icon, finalImageUrl, description, locked, isDarkTheme, tag, isAnimating }) => {
  return (

    <div className={`relative p-6 h-full flex flex-col z-10 overflow-hidden group ${isDarkTheme ? 'bg-transparent text-white' : 'bg-white text-zinc-900'}`}>
      {!isDarkTheme && <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${bg} opacity-50 blur-2xl group-hover:blur-3xl transition-all duration-500`} />}

      {/* Image Preview Banner */}
      {finalImageUrl && (
        <div className={`relative w-full h-44 rounded-2xl overflow-hidden mb-5 border shadow-inner z-20 ${isDarkTheme ? 'border-zinc-800' : 'border-zinc-100/80'}`} style={{ transform: "translateZ(30px)" }}>
          {/* Animated Badge */}
          {tag && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
              className="absolute top-3 left-3 z-30"
            >
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-md ${
                tag === 'Nuevo' ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white' :
                tag === 'Trending' ? 'bg-linear-to-r from-amber-500 to-orange-500 text-white' :
                'bg-linear-to-r from-purple-500 to-pink-500 text-white'
              }`}>
                <Sparkles size={10} className="animate-pulse" /> {tag}
              </span>
            </motion.div>
          )}
          <img 
            src={finalImageUrl} 
            alt={title} 
            width={400}
            height={192}
            loading="lazy"
            decoding="async"
            className={`w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-105 ${locked ? 'filter grayscale contrast-125 opacity-70' : ''} ${isDarkTheme ? 'opacity-85' : ''}`}
          />
          {locked && (
            <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white">
                <Lock size={20} />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none" />
        </div>
      )}

      <div className="flex justify-between items-start mb-4 relative z-20" style={{ transform: "translateZ(30px)" }}>
        <Badge className={isDarkTheme ? 'bg-zinc-800 text-zinc-300 border border-zinc-700/50 shadow-sm' : 'bg-zinc-100 text-zinc-700 border border-zinc-200/50 shadow-sm'}>
          {Icon && <Icon size={14} className="opacity-70"/>} {subject}
        </Badge>
        {locked ? (
          <Badge className="bg-purple-100 text-purple-700 border border-purple-200 shadow-sm font-bold flex items-center gap-1">
            <Lock size={10} /> Próximamente
          </Badge>
        ) : (
          <Badge className={isDarkTheme ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-sm' : 'bg-yellow-50 text-yellow-600 border border-yellow-200 shadow-sm'}>
            <Star size={14} fill="currentColor" /> {points}
          </Badge>
        )}
      </div>

      <div className="flex-grow relative z-20" style={{ transform: "translateZ(40px)" }}>
        <h3 className={`text-2xl font-bold mb-2 transition-colors ${isDarkTheme ? 'text-white group-hover:text-cyan-400' : 'text-zinc-900 group-hover:text-blue-600'}`}>{title}</h3>

        {/* Expandable Footer Container using Grid dynamic row sizing */}
        <div className="card-description-collapse">
          <div className="overflow-hidden">
            {description && (
              <p className={`text-sm mb-4 leading-relaxed ${isDarkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>{description}</p>
            )}
          </div>
        </div>

        <div className={`flex items-center gap-4 text-sm font-medium ${isDarkTheme ? 'text-zinc-400' : 'text-zinc-500'}`}>
          <span className="flex items-center gap-1.5"><User size={16}/> Lvl {level}</span>
          <span className="flex items-center gap-1.5"><Play size={16}/> {duration}</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between relative z-20" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {[1,2,3].map(i => (
              <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+title}&backgroundColor=e2e8f0`} className={`w-10 h-10 rounded-full border-2 shadow-sm ${isDarkTheme ? 'border-zinc-800' : 'border-white'}`} alt="player" />
            ))}
          </div>
          {!locked && <FavouriteToggle id={id} />}
        </div>
        {locked ? (
          <div className={`h-10 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-sm border ${isDarkTheme ? 'bg-zinc-800 text-zinc-500 border-zinc-700/50' : 'bg-zinc-100 text-zinc-400 border-zinc-200/50'}`}>
            <Lock size={16}/>
            <span className="text-xs font-bold uppercase tracking-wider">Bloqueado</span>
          </div>
        ) : (
          <button className={`ep-card-play-btn ${isAnimating ? 'animating' : ''}`}>
            <div className="flex items-center gap-1.5 relative z-10">
              <Play size={14} fill="currentColor" className="transition-transform group-hover:scale-110" />
              <span>Jugar</span>
            </div>
            <div className="star-1 text-[#6B8BB4]"><StarSVG fill="currentColor" /></div>
            <div className="star-2 text-[#E0B0FF]"><StarSVG fill="currentColor" /></div>
            <div className="star-3 text-blue-400"><StarSVG fill="currentColor" /></div>
            <div className="star-4 text-purple-400"><StarSVG fill="currentColor" /></div>
            <div className="star-5 text-yellow-500"><StarSVG fill="currentColor" /></div>
            <div className="star-6 text-pink-400"><StarSVG fill="currentColor" /></div>
          </button>
        )}
      </div>
    </div>

  );
};

export default CardContentLayout;
