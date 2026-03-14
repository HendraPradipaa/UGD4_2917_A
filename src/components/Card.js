import React from 'react';
import { FaQuestion } from 'react-icons/fa';

function Card({ card, isFlipped, isMatched, onFlip }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;
  const iconColor = isMatched ? '#ffffff' : card.color;

  return (
    <div
      onClick={handleClick}
      className="w-28 h-20 cursor-pointer select-none"
      style={{ perspective: '600px' }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {}
        <div
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          className={`absolute inset-0 flex items-center justify-center rounded-2xl
            bg-gradient-to-br from-violet-600 to-purple-500
            ${!isOpen ? 'shadow-lg shadow-purple-500/40' : ''}
            transition-shadow duration-300`}
        >
          <FaQuestion className="text-white/60 text-xl" />
          {}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        </div>

        {}
        <div
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
          className={`absolute inset-0 flex items-center justify-center rounded-2xl
            ${isMatched
              ? 'bg-gradient-to-br from-violet-700 to-purple-600 ring-2 ring-green-400'
              : 'bg-gradient-to-br from-yellow-400 to-amber-500 shadow-lg shadow-amber-500/40'
            }
            transition-all duration-300`}
        >
          <IconComponent style={{ color: iconColor, fontSize: '1.8rem' }} />
          {}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
          {}
          {isMatched && (
            <div className="absolute inset-0 rounded-2xl ring-2 ring-green-400 animate-pulse pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;