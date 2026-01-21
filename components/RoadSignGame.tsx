
import React, { useState, useEffect } from 'react';
import { RoadSign } from '../types';

const OHIO_SIGNS: RoadSign[] = [
  {
    id: 'stop',
    name: 'Stop Sign',
    description: 'Come to a complete stop and yield the right-of-way.',
    category: 'Regulatory',
    shape: 'octagon',
    color: 'bg-red-600',
    svgPath: 'M6 2L18 2L22 6L22 18L18 22L6 22L2 18L2 6Z'
  },
  {
    id: 'yield',
    name: 'Yield Sign',
    description: 'Slow down and yield to oncoming traffic.',
    category: 'Regulatory',
    shape: 'triangle',
    color: 'bg-red-600',
    svgPath: 'M12 2L2 20L22 20Z'
  },
  {
    id: 'merge',
    name: 'Merge',
    description: 'Prepare to blend with traffic from another lane.',
    category: 'Warning',
    shape: 'diamond',
    color: 'bg-yellow-400',
    svgPath: 'M12 2L22 12L12 22L2 12Z'
  },
  {
    id: 'speed-limit',
    name: 'Speed Limit',
    description: 'Maximum legal speed allowed under ideal conditions.',
    category: 'Regulatory',
    shape: 'rectangle',
    color: 'bg-white',
    svgPath: 'M4 2H20V22H4Z'
  },
  {
    id: 'interstate',
    name: 'Interstate Shield',
    description: 'Indicates a high-speed divided highway.',
    category: 'Guide',
    shape: 'shield',
    color: 'bg-blue-700',
    svgPath: 'M4 4C4 4 4 10 12 20C20 10 20 4 20 4H4Z'
  },
  {
    id: 'pedestrian',
    name: 'Pedestrian Crossing',
    description: 'Watch for people crossing the street ahead.',
    category: 'Warning',
    shape: 'diamond',
    color: 'bg-yellow-400',
    svgPath: 'M12 2L22 12L12 22L2 12Z'
  }
];

const RoadSignGame: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'Regulatory' | 'Warning' | 'Guide' | null>(null);
  const [currentSignIndex, setCurrentSignIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const currentSign = OHIO_SIGNS[currentSignIndex];

  const handleGuess = (category: 'Regulatory' | 'Warning' | 'Guide') => {
    if (feedback) return;

    const isCorrect = category === currentSign.category;
    if (isCorrect) setScore(s => s + 1);

    setFeedback({
      isCorrect,
      message: isCorrect 
        ? `Correct! This is a ${currentSign.category} sign.` 
        : `Not quite. This is actually a ${currentSign.category} sign.`
    });
  };

  const nextSign = () => {
    setFeedback(null);
    if (currentSignIndex + 1 < OHIO_SIGNS.length) {
      setCurrentSignIndex(prev => prev + 1);
    } else {
      setGameComplete(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentSignIndex(0);
    setFeedback(null);
    setGameComplete(false);
  };

  if (gameComplete) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100 max-w-2xl mx-auto">
        <h3 className="text-3xl font-bold mb-4">Training Complete!</h3>
        <p className="text-xl text-gray-600 mb-8">You identified {score} out of {OHIO_SIGNS.length} signs correctly.</p>
        <div className="flex justify-center gap-4">
          <button onClick={resetGame} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Sign Visual Area */}
          <div className="bg-gray-50 p-12 flex flex-col items-center justify-center border-r border-gray-100">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className={`w-full h-full drop-shadow-xl ${currentSign.color.replace('bg-', 'text-')}`}>
                <path d={currentSign.svgPath} fill="currentColor" stroke={currentSign.id === 'speed-limit' ? '#333' : 'white'} strokeWidth="0.5" />
                {currentSign.id === 'stop' && <text x="12" y="14" fill="white" fontSize="4" fontWeight="bold" textAnchor="middle">STOP</text>}
                {currentSign.id === 'yield' && <text x="12" y="16" fill="white" fontSize="3" fontWeight="bold" textAnchor="middle">YIELD</text>}
                {currentSign.id === 'speed-limit' && (
                  <g>
                    <text x="12" y="8" fill="#333" fontSize="2.5" fontWeight="bold" textAnchor="middle">SPEED</text>
                    <text x="12" y="11" fill="#333" fontSize="2.5" fontWeight="bold" textAnchor="middle">LIMIT</text>
                    <text x="12" y="19" fill="#333" fontSize="7" fontWeight="bold" textAnchor="middle">55</text>
                  </g>
                )}
                {currentSign.id === 'merge' && (
                  <path d="M12 18V8M12 8L10 10M12 8L14 10M15 15C15 15 15 12 12 10" stroke="#333" strokeWidth="1" fill="none" />
                )}
                {currentSign.id === 'pedestrian' && (
                  <circle cx="12" cy="7" r="1.5" fill="#333" />
                )}
              </svg>
            </div>
            <div className="mt-8 text-center">
              <h4 className="text-2xl font-bold text-gray-900">{currentSign.name}</h4>
              <p className="text-gray-500 mt-2 italic">Identify the category of this Ohio road sign.</p>
            </div>
          </div>

          {/* Interaction Area */}
          <div className="p-12 flex flex-col">
            <div className="mb-6 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Level 1: Categorization</span>
              <span className="text-sm font-mono bg-blue-50 text-blue-700 px-3 py-1 rounded-full">Sign {currentSignIndex + 1}/{OHIO_SIGNS.length}</span>
            </div>

            <div className="space-y-4 flex-grow">
              {(['Regulatory', 'Warning', 'Guide'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleGuess(cat)}
                  disabled={!!feedback}
                  className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group
                    ${feedback ? (cat === currentSign.category ? 'bg-green-50 border-green-500 text-green-700' : 'bg-gray-50 border-gray-100 opacity-50') : 'bg-white border-gray-200 hover:border-blue-500 hover:bg-blue-50'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${
                      cat === 'Regulatory' ? 'bg-red-500' : cat === 'Warning' ? 'bg-yellow-400' : 'bg-blue-600'
                    }`}></div>
                    <span className="font-bold">{cat}</span>
                  </div>
                  {!feedback && (
                    <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </button>
              ))}
            </div>

            {feedback && (
              <div className="mt-8 animate-in slide-in-from-bottom-2">
                <div className={`p-4 rounded-xl mb-4 ${feedback.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <p className="font-bold text-sm">{feedback.message}</p>
                  <p className="text-sm mt-1 opacity-90">{currentSign.description}</p>
                </div>
                <button 
                  onClick={nextSign}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
                >
                  {currentSignIndex + 1 === OHIO_SIGNS.length ? 'Final Score' : 'Next Sign'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h5 className="font-bold text-red-600 mb-1">Regulatory</h5>
          <p className="text-xs text-gray-500">Rules of the road. Must be obeyed. Red, White, or Black.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h5 className="font-bold text-yellow-500 mb-1">Warning</h5>
          <p className="text-xs text-gray-500">Alerts to hazards ahead. Typically yellow and diamond-shaped.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h5 className="font-bold text-blue-600 mb-1">Guide</h5>
          <p className="text-xs text-gray-500">Route info, destinations, and services. Green or Blue.</p>
        </div>
      </div>
    </div>
  );
};

export default RoadSignGame;
