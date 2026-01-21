
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TheoryQuiz from './components/TheoryQuiz';
import RoadSignGame from './components/RoadSignGame';
import VirtualCoach from './components/VirtualCoach';
import GamifiedStats from './components/GamifiedStats';
import ScenarioSim from './components/ScenarioSim';
import FlashCardSystem from './components/FlashCardSystem';
import { Package, UserStats, Flashcard, Badge } from './types';

const INITIAL_BADGES: Badge[] = [
  { id: 'rookie', name: 'Road Rookie', icon: '🐣', description: 'First login to the academy!', unlocked: true },
  { id: 'sign-master', name: 'Sign Master', icon: '🛑', description: 'Identify 5 signs correctly.', unlocked: false },
  { id: 'theory-pro', name: 'Theory Pro', icon: '🧠', description: 'Score 100% on a pit quiz.', unlocked: false },
  { id: 'night-owl', name: 'Night Owl', icon: '🌙', description: 'Study after 10 PM.', unlocked: false },
];

const PACKAGES: Package[] = [
  { id: 'abbreviated', name: 'Failed Remedial', price: 99, lessons: 4, features: ['ODPS 4-Hour Course', 'Adult Abbreviated Prep', 'Affidavit Processing', 'Certificate of Completion'] },
  { id: 'novice-under-21', name: 'Under 21 Pro', price: 349, lessons: 8, features: ['Mandatory for Ages 16-20', '24h Theory + 8h Wheel', '50h Practice Log App', 'Home Student Pickup'], recommended: true },
  { id: 'intensive', name: 'Speed Racer', price: 599, lessons: 20, features: ['Daily Intensive Training', 'Priority BMV Booking', 'Mock Test Simulation', 'Advanced Maneuvers'] },
];

const App: React.FC = () => {
  const [stats, setStats] = useState<UserStats>({
    xp: 250,
    level: 1,
    streak: 3,
    badges: INITIAL_BADGES
  });

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [showFlashcards, setShowFlashcards] = useState(false);

  const handleReward = (amount: number) => {
    setStats(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 1000) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  };

  const handleWrongAnswer = (card: Flashcard) => {
    setFlashcards(prev => [...prev, card]);
    // Optionally trigger immediate popup if list grows
    if (flashcards.length >= 2) {
      setShowFlashcards(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-yellow-200 selection:text-gray-900 overflow-x-hidden font-inter bg-white">
      <Header />
      
      {/* Gamified Stats Bar - Sticky */}
      <div className="px-4 mt-8">
        <GamifiedStats stats={stats} />
      </div>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pb-24 lg:pb-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center relative z-10">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-yellow-400 text-gray-900 text-sm font-[900] uppercase italic tracking-[0.2em] mb-8 border-4 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="flex h-3 w-3 bg-red-600 rounded-full animate-ping"></span>
                2025 Mandate Training Ready
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-[900] text-gray-900 leading-[0.85] mb-8 italic uppercase tracking-tighter">
                DRIVE TO <br/>
                <span className="text-blue-600 drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]">VICTORY.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-tight font-bold italic">
                Experience the first gamified driving academy in Ohio. Earn XP, unlock badges, and master the road with Coach Alex.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <a href="#mission" className="bg-red-600 text-white px-12 py-6 rounded-3xl text-xl font-[900] uppercase italic hover:bg-red-700 transition-all transform hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none text-center border-4 border-gray-900">
                  Daily Mission
                </a>
                <a href="#theory" className="bg-white text-gray-900 border-4 border-gray-900 px-12 py-6 rounded-3xl text-xl font-[900] uppercase italic hover:bg-gray-100 transition-all text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                  Pit Quiz
                </a>
              </div>
            </div>
            
            <div className="lg:w-2/5 mt-20 lg:mt-0 relative px-6">
              <div className="bg-yellow-400 p-4 rounded-[4rem] border-8 border-gray-900 rotate-3 shadow-2xl relative">
                <div className="absolute -top-10 -right-10 bg-blue-600 text-white p-6 rounded-[2rem] border-4 border-gray-900 z-20 shadow-xl font-black italic uppercase leading-none text-center">
                  <span className="text-4xl block">24H</span>
                  <span className="text-[10px] tracking-widest">Theory</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop" 
                  alt="DriveReady Performance Car" 
                  className="rounded-[3rem] border-4 border-white shadow-inner grayscale hover:grayscale-0 transition-all duration-1000"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Daily Mission / Scenario Section */}
        <section id="mission" className="py-24 bg-gray-50 border-y-8 border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs">interactive simulation</span>
              <h2 className="text-5xl lg:text-8xl font-black mb-4 uppercase italic tracking-tighter text-gray-900">DAILY <span className="text-red-600">MISSION</span></h2>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto font-bold italic">Solve road scenarios and earn high-tier XP rewards.</p>
            </div>
            <ScenarioSim onReward={handleReward} />
          </div>
        </section>

        {/* Interactive Road Sign Challenge */}
        <section id="interactive" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-7xl font-black mb-4 uppercase italic tracking-tighter text-gray-900">SIGN <span className="text-blue-600">PIT</span></h2>
              <RoadSignGame />
            </div>
          </div>
        </section>

        {/* Theory Pit Stop */}
        <section id="theory" className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:32px_32px] opacity-5"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-7xl font-black mb-4 uppercase italic tracking-tighter">THEORY <span className="text-yellow-400">PIT STOP</span></h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-bold italic uppercase tracking-widest">Wrong answers trigger remedial flashcards. No student left behind!</p>
            </div>
            <TheoryQuiz onReward={handleReward} onWrongAnswer={handleWrongAnswer} />
            
            {flashcards.length > 0 && (
              <div className="mt-12 text-center">
                <button 
                  onClick={() => setShowFlashcards(true)}
                  className="bg-yellow-400 text-gray-900 px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:scale-105 transition-all"
                >
                  Review {flashcards.length} Remedial Cards
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-8xl font-black mb-4 uppercase italic tracking-tighter">PLAN YOUR <span className="text-red-600">VICTORY</span></h2>
              <p className="text-xl text-gray-500 font-bold italic uppercase tracking-widest">All plans include the full 2025 Mandate Curriculum.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {PACKAGES.map((pkg) => (
                <div key={pkg.id} className={`p-12 rounded-[4rem] border-8 flex flex-col transition-all hover:-translate-y-4 ${pkg.recommended ? 'border-blue-600 bg-white shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] relative' : 'border-gray-900 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]'}`}>
                  {pkg.recommended && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-black px-8 py-3 rounded-full uppercase tracking-widest border-4 border-gray-900 italic">BEST FOR UNDER-21</div>
                  )}
                  <h3 className="text-4xl font-[900] mb-4 text-gray-900 uppercase italic tracking-tighter leading-none">{pkg.name}</h3>
                  <div className="mb-10">
                    <span className="text-6xl font-black text-gray-900">${pkg.price}</span>
                  </div>
                  <ul className="space-y-6 mb-12 flex-grow">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-4 text-gray-900 text-sm font-bold uppercase italic">
                        <div className="w-3 h-3 rounded-full bg-red-600 border-2 border-gray-900"></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-6 rounded-3xl font-black uppercase italic tracking-widest text-lg transition-all border-4 border-gray-900 bg-gray-100 shadow-[0_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1">
                    Join Pit Crew
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Global Flashcard Modal */}
      {showFlashcards && (
        <FlashCardSystem cards={flashcards} onClose={() => { setShowFlashcards(false); setFlashcards([]); }} />
      )}

      <footer className="bg-gray-900 py-32 text-white border-t-[16px] border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
             <div>
               <span className="text-5xl font-black italic tracking-tighter leading-none">DRIVE<span className="text-blue-500">READY</span></span>
               <p className="mt-8 text-gray-400 text-lg font-bold italic leading-relaxed max-w-md uppercase tracking-wide">
                 Ohio's elite digital academy. 24-hour online courses built for the next generation of champions.
               </p>
             </div>
             <div className="flex flex-col md:items-end justify-center">
                <p className="text-lg font-black uppercase italic text-blue-500">937-PIT-STOP</p>
                <p className="text-gray-600 mt-2 font-black uppercase tracking-[0.2em] text-xs">Certified Academy #55829</p>
             </div>
          </div>
        </div>
      </footer>

      <VirtualCoach />
    </div>
  );
};

export default App;
