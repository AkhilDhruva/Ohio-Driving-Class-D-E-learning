
import React, { useState } from 'react';
import { Flashcard } from '../types';

interface Props {
  cards: Flashcard[];
  onClose: () => void;
}

const FlashCardSystem: React.FC<Props> = ({ cards, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (cards.length === 0) return null;

  const current = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex + 1 < cards.length) {
        setCurrentIndex(prev => prev + 1);
      } else {
        onClose();
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="bg-red-600 text-white px-6 py-2 rounded-full font-black uppercase italic text-sm border-4 border-white shadow-xl">
            Remedial Flashcards
          </span>
          <p className="text-white/60 mt-4 text-xs font-bold uppercase tracking-widest">Master what you missed</p>
        </div>

        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          className={`relative w-full aspect-[4/3] cursor-pointer perspective-1000 transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-white border-8 border-gray-900 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl">
            <span className="text-4xl mb-4">❓</span>
            <h3 className="text-2xl font-black uppercase italic text-gray-900 leading-tight">
              {current.front}
            </h3>
            <p className="mt-8 text-xs font-black text-blue-600 uppercase tracking-widest animate-pulse">Tap to Reveal Answer</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-yellow-400 border-8 border-gray-900 rounded-[3rem] p-8 flex flex-col items-center justify-center text-center shadow-2xl rotate-y-180">
            <span className="text-4xl mb-4">💡</span>
            <h3 className="text-sm font-black uppercase text-gray-500 mb-2 tracking-widest">Key Takeaway</h3>
            <p className="text-xl font-bold text-gray-900 leading-relaxed italic">
              {current.back}
            </p>
            <div className="mt-6 text-[10px] font-black uppercase bg-gray-900 text-white px-3 py-1 rounded-lg">
              Category: {current.category}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between items-center px-4">
          <span className="text-white font-black italic">Card {currentIndex + 1} of {cards.length}</span>
          <button 
            onClick={handleNext}
            className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-black uppercase italic border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:bg-gray-100 active:translate-y-1 active:shadow-none"
          >
            {currentIndex + 1 === cards.length ? 'Finish Session' : 'Next Card'}
          </button>
        </div>
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashCardSystem;
