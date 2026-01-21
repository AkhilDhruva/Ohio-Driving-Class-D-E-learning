
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
    const data = await generateDrivingQuiz();
    setQuestions(data);
    setLoading(false);
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswer = async (index: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(index);
    const correct = index === questions[currentIndex].correctIndex;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      onReward(100);
    } else {
      // Generate a flashcard based on the missed question topic
      const card = await generateFlashcard(questions[currentIndex].question);
      onWrongAnswer(card);
    }
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-black italic uppercase">Generating Pit Quiz...</p>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="text-center py-12 bg-white border-8 border-gray-900 rounded-[3rem] p-12 shadow-2xl">
        <div className="inline-block p-10 rounded-full bg-blue-100 mb-8 border-4 border-blue-600">
          <span className="text-6xl">🏁</span>
        </div>
        <h3 className="text-5xl font-[900] mb-4 uppercase italic tracking-tighter">Session Complete!</h3>
        <p className="text-gray-600 text-2xl mb-8 font-bold italic uppercase tracking-widest">You identified {score} out of {questions.length} accurately.</p>
        <button 
          onClick={loadQuiz}
          className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-[900] uppercase italic hover:bg-blue-700 transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-gray-900"
        >
          Restart Pit Stop
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-900 animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-gray-900 px-8 py-6 flex justify-between items-center text-white">
        <span className="text-xs font-black tracking-[0.3em] uppercase italic text-yellow-400">Theory Pit Stop</span>
        <span className="text-sm font-black italic uppercase bg-white/10 px-4 py-1 rounded-full border-2 border-white/20">Question {currentIndex + 1}/{questions.length}</span>
      </div>
      
      <div className="p-10">
        <h3 className="text-2xl font-[900] text-gray-900 mb-10 leading-[1.1] uppercase italic tracking-tighter">{current.question}</h3>
        
        <div className="space-y-4">
          {current.options.map((opt, i) => {
            let bgColor = "bg-white border-4 border-gray-900 hover:bg-gray-50 hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
            if (selectedAnswer !== null) {
              if (i === current.correctIndex) bgColor = "bg-green-100 border-green-600 text-green-900 scale-[1.02] z-10";
              else if (i === selectedAnswer) bgColor = "bg-red-100 border-red-600 text-red-900 opacity-50";
              else bgColor = "bg-gray-100 border-gray-200 opacity-20 grayscale";
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-6 rounded-2xl font-black italic uppercase transition-all flex items-center justify-between group ${bgColor}`}
              >
                <span className="font-black tracking-tight">{opt}</span>
                {selectedAnswer !== null && i === current.correctIndex && (
                  <span className="text-2xl animate-bounce">🏁</span>
                )}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-10 animate-in fade-in slide-in-from-bottom-4">
            <div className={`p-8 rounded-[2rem] border-4 shadow-lg ${isCorrect ? 'bg-green-600 text-white border-green-800' : 'bg-blue-600 text-white border-blue-800'}`}>
              <h4 className="font-black italic uppercase text-xs mb-3 tracking-widest">{isCorrect ? 'Victory Lap!' : 'Coaching Note:'}</h4>
              <p className="text-lg leading-tight font-bold italic">
                {current.explanation}
              </p>
            </div>
            <button 
              onClick={nextQuestion}
              className="mt-8 w-full bg-red-600 text-white py-6 rounded-2xl font-[900] uppercase italic tracking-widest text-xl shadow-[0_10px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all border-4 border-gray-900"
            >
              {currentIndex + 1 === questions.length ? 'See Total Time' : 'Next Sprint'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoryQuiz;
