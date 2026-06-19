import React, { useState } from 'react';
import { getImageUrl } from '../../data/mockData';
import CardContentLayout from './CardContentLayout';

const PremiumGameCard = ({ id, title, subject, level, duration, points, color, bg, icon: Icon, image, description, locked, tag, onClick, isDark }) => {
  const [isHovered, setIsHovered] = useState(false);

  const finalImageUrl = getImageUrl(image, id, title, isHovered);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative w-full rounded-[2rem] p-1 cursor-pointer group bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all duration-300 ${locked ? 'opacity-85' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-white dark:bg-zinc-900 rounded-[1.8rem] h-full flex flex-col z-10 overflow-hidden">
        <CardContentLayout
          id={id}
          title={title}
          subject={subject}
          level={level}
          duration={duration}
          points={points}
          bg={bg}
          icon={Icon}
          finalImageUrl={finalImageUrl}
          description={description}
          locked={locked}
          isDarkTheme={isDark}
          tag={tag}
        />
      </div>
    </div>
  );
};

export default PremiumGameCard;
