import React from 'react';
import { FaMousePointer, FaCheck, FaSyncAlt, FaRedo, FaClock } from 'react-icons/fa';

function ScoreBoard({ moves, matchedCount, totalPairs, timeLeft, isGameOver, isWon, onReset }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  const isUrgent = timeLeft <= 30 && !isWon && !isGameOver;

  return (
    <div className="text-center mb-6 w-full max-w-md">
      <div className="flex justify-center gap-4 mb-4">

        {}
        <div className={`bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border ${isUrgent ? 'border-red-400 animate-pulse' : 'border-white/10'}`}>
          <p className="text-xs text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wide">
            <FaClock className={isUrgent ? 'text-red-400' : 'text-indigo-300'} /> Waktu
          </p>
          <p className={`text-2xl font-bold ${isUrgent ? 'text-red-400' : 'text-white'}`}>{timeStr}</p>
        </div>

        {}
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
          <p className="text-xs text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wide">
            <FaMousePointer className="text-indigo-300" /> Percobaan
          </p>
          <p className="text-2xl font-bold text-white">{moves}</p>
        </div>

        {}
        <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
          <p className="text-xs text-indigo-200 flex items-center justify-center gap-1 uppercase tracking-wide">
            <FaCheck className="text-indigo-300" /> Ditemukan
          </p>
          <p className="text-2xl font-bold text-white">{matchedCount}/{totalPairs}</p>
        </div>
      </div>

      {isWon && (
        <p className="text-yellow-300 font-bold text-lg mb-3 animate-pulse">
          🎉 Selamat! Kamu menang dalam {moves} percobaan!
        </p>
      )}

      {isGameOver && !isWon && (
        <p className="text-red-400 font-bold text-lg mb-3 animate-pulse">
          ⏰ Waktu habis! Coba lagi ya!
        </p>
      )}

      <button
        onClick={onReset}
        className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition-colors duration-200 shadow-lg flex items-center gap-2 mx-auto"
      >
        {isWon ? <FaRedo /> : <FaSyncAlt />}
        {isWon ? 'Main Lagi' : 'Acak Ulang'}
      </button>
    </div>
  );
}

export default ScoreBoard;