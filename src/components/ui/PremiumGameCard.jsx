import React, { useState } from 'react';
import { getImageUrl } from '../../data/mockData';
import CardContentLayout from './CardContentLayout';
import LuminautsInteractiveCard from './LuminautsInteractiveCard';

const PremiumGameCard = ({ id, title, subject, level, duration, points, color, bg, icon: Icon, image, description, locked, tag, onClick, isDark, interactive = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const finalImageUrl = getImageUrl(image, id, title, isHovered);

  const handleCardClick = (e) => {
    if (locked) {
      if (onClick) onClick(e);
      return;
    }

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (onClick) onClick(e);
    }, 600); // 600ms waiting for the star explosion animation
  };

  const getGlowColor = (colorStr) => {
    if (!colorStr) return 'rgba(107, 139, 180, 0.15)';
    if (colorStr.includes('#E0B0FF')) return 'rgba(224, 176, 255, 0.15)';
    if (colorStr.includes('#6B8BB4')) return 'rgba(107, 139, 180, 0.15)';
    if (colorStr.includes('#8DA9C4')) return 'rgba(141, 169, 196, 0.15)';
    return 'rgba(107, 139, 180, 0.15)';
  };

  return (
    <LuminautsInteractiveCard
      interactive={interactive}
      onMouseEnter={() => setIsHovered(false)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      glowColor={getGlowColor(color)}
      className={locked ? 'opacity-85' : ''}
      style={{ padding: 0 }} // Inner CardContentLayout handles its own padding
    >
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
        isAnimating={isAnimating}
      />
    </LuminautsInteractiveCard>
  );
};

export default PremiumGameCard;
