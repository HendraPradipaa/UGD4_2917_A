import React from 'react';
import Card from './Card';

const COL_CLASSES = {
  4: 'grid-cols-4',
  6: 'grid-cols-6',
};

function GameBoard({ cards, flippedCards, matchedCards, onFlip, cols = 6, disabled }) {
  return (
    <div className={`grid ${COL_CLASSES[cols] ?? 'grid-cols-4'} gap-3 justify-items-center`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.id)}
          onFlip={disabled ? () => {} : onFlip}
        />
      ))}
    </div>
  );
}

export default GameBoard;