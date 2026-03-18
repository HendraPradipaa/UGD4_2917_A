'use client';
import React, { useState, useEffect, useRef } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaCar, FaBell, FaGuitar } from 'react-icons/fa';
import { GiButterfly } from 'react-icons/gi';

const ALL_ICONS = [
  { icon: FaAppleAlt,  color: '#e6d2d2' },
  { icon: FaLemon,     color: '#eeffd0' },
  { icon: FaHeart,     color: '#fb00c5' },
  { icon: FaStar,      color: '#f06400' },
  { icon: FaCar,       color: '#7710ff' },
  { icon: FaBell,      color: '#00ffaa' },
  { icon: FaGuitar,    color: '#60a5fa' },
  { icon: GiButterfly, color: '#f9a8d4' },
];

const LEVELS = {
  easy:   { label: 'Easy',   emoji: '😊', pairs: 4, time: 120, cols: 4 },
  medium: { label: 'Medium', emoji: '😐', pairs: 6, time: 180, cols: 4 }, 
  hard:   { label: 'Hard',   emoji: '💀', pairs: 8, time: 300, cols: 4 },
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (level) => {
  const { pairs } = LEVELS[level];
  const selected = shuffleArray(ALL_ICONS).slice(0, pairs);
  const paired = selected.flatMap((item, index) => [
    { id: index * 2,     icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

export default function Home() {
  const [level, setLevel]               = useState('hard');
  const [cards, setCards]               = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves]               = useState(0);
  const [timeLeft, setTimeLeft]         = useState(LEVELS['hard'].time);
  const [isGameOver, setIsGameOver]     = useState(false);
  const [isWon, setIsWon]               = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    startNewGame('hard');
  }, []);

  useEffect(() => {
    if (isGameOver || isWon) {
      clearInterval(timerRef.current);
      return;
    }
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isGameOver, isWon, cards]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard  = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      setMoves((prev) => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        playMatchSound(); 
        setMatchedCards((prev) => {
          const next = [...prev, firstId, secondId];
          if (next.length === LEVELS[level].pairs * 2) {
            clearInterval(timerRef.current);
            setIsWon(true);
          }
          return next;
        });
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => setFlippedCards([]), 800);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  const handleCardFlip = (id) => {
    if (isGameOver || isWon) return;
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  const startNewGame = (lvl) => {
    clearInterval(timerRef.current);
    setCards(createCards(lvl));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimeLeft(LEVELS[lvl].time);
    setIsGameOver(false);
    setIsWon(false);
  };

  const handleSetLevel = (lvl) => {
    setLevel(lvl);
    startNewGame(lvl);
  };

  const resetGame = () => startNewGame(level);

const playMatchSound = () => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const notes = [523, 659, 784]; 
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

    gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);

    osc.start(ctx.currentTime + i * 0.12);
    osc.stop(ctx.currentTime + i * 0.12 + 0.3);
  });
};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{
  background: 'radial-gradient(ellipse at top, #3b1d6e 0%, #1a0933 40%, #0d0d1a 100%)'
}}>
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3">
        <GiCardJoker className="text-yellow-300 text-4xl" />
        <span className="bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
          Memory Card
        </span>
      </h1>

      {}
      <div className="flex gap-3 mb-6">
        {Object.entries(LEVELS).map(([key, cfg]) => (
          <button
            key={key}
            onClick={() => handleSetLevel(key)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 border-2
              ${level === key
                ? 'bg-yellow-400 text-indigo-900 border-yellow-400 shadow-lg'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
          >
            {cfg.emoji} {cfg.label} ({cfg.pairs})
          </button>
        ))}
      </div>

      <ScoreBoard
        moves={moves}
        matchedCount={matchedCards.length / 2}
        totalPairs={LEVELS[level].pairs}
        timeLeft={timeLeft}
        isGameOver={isGameOver}
        isWon={isWon}
        onReset={resetGame}
      />

      <div className="bg-black/20 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/10">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
          cols={LEVELS[level].cols}
          disabled={isGameOver || isWon}
        />
      </div>
    </div>
  );
}