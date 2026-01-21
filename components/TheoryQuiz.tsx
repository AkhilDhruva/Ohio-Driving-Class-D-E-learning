
import React, { useState, useEffect } from 'react';
import { generateDrivingQuiz, generateFlashcard } from '../services/geminiService';
import { QuizQuestion, Flashcard } from '../types';

interface Props {
  onReward: (xp: number) => void;
  onWrongAnswer: (card: Flashcard) => void;
}

const TheoryQuiz: React.FC<Props> = ({ onReward, onWrongAnswer }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const data = await generateDrivingQuiz();
      setQuestions(data);
      setCurrentIndex(0);
      setScore(0);
      setShowResult(false);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } catch (e) {
      console.error("Failed to load quiz:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = async (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === questions[currentIndex].correctIndex;
    setIsCorrect(correct);

    if (correct) {
      setScore(s => s + 1);
      onReward(100);
    } else {
      const topic = questions[currentIndex].question;
      try {
        const card = await generateFlashcard(topic);
        onWrongAnswer(card);
      } catch (e) {
        console.error("Failed to generate remedial flashcard:", e);
      }
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border-8 border-gray-900 rounded-[3rem] p-12 text-center text-gray-900">
        <div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="font-black italic uppercase text-gray-500">Preparing Knowledge Checkpoint...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="bg-white border-8 border-gray-900 rounded-[3rem] p-12 text-center text-gray-900 animate-in zoom-in duration-500">
        <h3 className="text-4xl font-black uppercase italic mb-4">Mastery Complete!</h3>
        <p className="text-6xl font-black text-blue-600 mb-8">{score}/{questions.length}</p>
        <p className="text-xl font-bold italic text-gray-500 mb-8 uppercase tracking-widest">
          {score === questions.length ? "Certified Mastery! Keep it up." : "Good effort. Review the missed concepts."}
        </p>
        <button 
          onClick={loadQuiz}
          className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black uppercase italic tracking-widest border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all"
        >
          Retake Module
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="bg-white border-8 border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-gray-100 p-6 flex justify-between items-center border-b-8 border-gray-900">
        <span className="text-blue-600 font-black uppercase italic tracking-widest text-sm">Knowledge Checkpoint</span>
        <span className="bg-gray-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase italic">Question {currentIndex + 1}/{questions.length}</span>
      </div>

      <div className="p-8 lg:p-12">
        <h3 className="text-3xl lg:text-4xl font-black uppercase italic leading-tight text-gray-900 mb-12">
          {current.question}
        </h3>

        <div className="space-y-4">
          {current.options.map((opt, i) => {
            let style = "bg-white border-4 border-gray-900 text-gray-900 hover:bg-gray-50 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
            
            if (selectedAnswer !== null) {
              if (i === current.correctIndex) {
                style = "bg-green-500 text-white border-gray-900 shadow-none translate-y-1";
              } else if (i === selectedAnswer && !isCorrect) {
                style = "bg-red-500 text-white border-gray-900 shadow-none translate-y-1";
              } else {
                style = "bg-gray-100 text-gray-400 border-gray-200 shadow-none opacity-50 cursor-not-allowed";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-6 rounded-2xl font-black italic uppercase transition-all flex items-center gap-6 ${style}`}
              >
                <div className="w-10 h-10 rounded-xl border-2 border-current flex items-center justify-center shrink-0 font-black">
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="text-lg font-bold">{opt}</span>
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-12 animate-in slide-in-from-bottom-4 text-gray-900">
            <div className={`p-8 rounded-[2rem] border-4 ${isCorrect ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'}`}>
              <h4 className="font-black italic uppercase text-lg mb-2 flex items-center gap-2">
                {isCorrect ? '✅ Correct Reasoning!' : '❌ Concept Review'}
              </h4>
              <p className="text-lg font-bold leading-snug italic">{current.explanation}</p>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full mt-8 bg-blue-600 text-white py-6 rounded-2xl font-black uppercase italic tracking-widest hover:bg-blue-700 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1"
            >
              {currentIndex + 1 === questions.length ? 'Final Summary' : 'Continue Module'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoryQuiz;
