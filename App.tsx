
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TheoryQuiz from './components/TheoryQuiz';
import RoadSignGame from './components/RoadSignGame';
import VirtualCoach from './components/VirtualCoach';
import GamifiedStats from './components/GamifiedStats';
import ScenarioSim from './components/ScenarioSim';
import FlashCardSystem from './components/FlashCardSystem';
import Login from './components/Login';
import BookingModule from './components/BookingModule';
import { Package, UserStats, Flashcard, Badge } from './types';

const INITIAL_BADGES: Badge[] = [
  { id: 'rookie', name: 'Safe Starter', icon: '🔰', description: 'First login to the academy!', unlocked: true },
  { id: 'sign-master', name: 'Sign Expert', icon: '🛑', description: 'Identify 5 signs correctly.', unlocked: false },
  { id: 'theory-pro', name: 'Theory Elite', icon: '🧠', description: 'Score 100% on a mastery checkpoint.', unlocked: false },
  { id: 'night-owl', name: 'Visibility Pro', icon: '🌙', description: 'Study low-visibility laws.', unlocked: false },
];

const PACKAGES: Package[] = [
  { id: 'abbreviated', name: 'Adult Mastery', price: 99, lessons: 4, features: ['ODPS 4-Hour Course', 'Adult Abbreviated Prep', 'Affidavit Processing', 'Certificate of Completion'] },
  { id: 'novice-under-21', name: 'Under 21 Elite', price: 349, lessons: 8, features: ['Mandatory for Ages 16-20', '24h Theory + 8h Wheel', '50h Practice Log App', 'Home Student Pickup'], recommended: true },
  { id: 'intensive', name: 'Confident Navigator', price: 599, lessons: 20, features: ['Daily Skill Building', 'Priority BMV Booking', 'Mock Test Simulation', 'Advanced Defensive Maneuvers'] },
];

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'booking'>('dashboard');
  
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
    if (flashcards.length >= 2) {
      setShowFlashcards(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setActiveTab('dashboard');
  };

  const triggerAuthFlow = (target: 'dashboard' | 'booking' = 'dashboard') => {
    if (!isLoggedIn) {
      setShowLogin(true);
    } else {
      setActiveTab(target);
      const content = document.getElementById('academy-content');
      if (content) content.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-yellow-200 selection:text-gray-900 overflow-x-hidden font-inter bg-white">
      <Header 
        isLoggedIn={isLoggedIn} 
        onLogout={() => setIsLoggedIn(false)} 
        onLoginClick={() => setShowLogin(true)}
        onBookClick={() => triggerAuthFlow('booking')}
      />
      
      {showLogin && <Login onSuccess={handleLoginSuccess} onClose={() => setShowLogin(false)} />}

      <main className="flex-grow">
        {!isLoggedIn && (
          <section className="relative overflow-hidden bg-white pb-24 lg:pb-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center relative z-10">
              <div className="lg:w-3/5 text-center lg:text-left">
                <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-[900] uppercase italic tracking-[0.2em] mb-8 border-4 border-blue-600 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]">
                  <span className="flex h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                  Official 2025 Safety Standards
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-[900] text-gray-900 leading-[0.85] mb-8 italic uppercase tracking-tighter">
                  MASTER THE <br/>
                  <span className="text-blue-600 drop-shadow-[8px_8px_0px_rgba(0,0,0,0.1)]">ROADWAY.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-tight font-bold italic">
                  The premier safety-first driving academy in Ohio. Build confidence, earn certifications, and master defensive driving with Coach Alex.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                  <button 
                    onClick={() => triggerAuthFlow('dashboard')}
                    className="bg-blue-600 text-white px-12 py-6 rounded-3xl text-xl font-[900] uppercase italic hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none text-center border-4 border-gray-900"
                  >
                    Daily Skill Check
                  </button>
                  <button 
                    onClick={() => triggerAuthFlow('dashboard')}
                    className="bg-white text-gray-900 border-4 border-gray-900 px-12 py-6 rounded-3xl text-xl font-[900] uppercase italic hover:bg-gray-100 transition-all text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]"
                  >
                    Theory Modules
                  </button>
                </div>
              </div>
              
              <div className="lg:w-2/5 mt-20 lg:mt-0 relative px-6">
                <div className="bg-gray-100 p-4 rounded-[4rem] border-8 border-gray-900 -rotate-3 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-600 text-white px-8 py-2 font-black italic uppercase -rotate-45 translate-x-10 translate-y-4">CERTIFIED</div>
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Safe Driver Training" 
                    className="rounded-[3rem] border-4 border-white shadow-inner grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {isLoggedIn && (
          <div id="academy-content" className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="px-4 mt-8">
              <GamifiedStats stats={stats} />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
              <div className="flex gap-4 mb-12">
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex-1 py-6 rounded-3xl font-black uppercase italic tracking-widest border-4 transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-gray-400 border-gray-200 hover:text-gray-600'}`}
                >
                  Learning Hub
                </button>
                <button 
                  onClick={() => setActiveTab('booking')}
                  className={`flex-1 py-6 rounded-3xl font-black uppercase italic tracking-widest border-4 transition-all ${activeTab === 'booking' ? 'bg-red-600 text-white border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' : 'bg-white text-gray-400 border-gray-200 hover:text-gray-600'}`}
                >
                  Lesson Schedule
                </button>
              </div>

              {activeTab === 'dashboard' ? (
                <div className="space-y-24">
                  <section id="mission">
                    <ScenarioSim onReward={handleReward} />
                  </section>
                  <section id="interactive">
                    <RoadSignGame />
                  </section>
                  <section id="theory">
                    <TheoryQuiz onReward={handleReward} onWrongAnswer={handleWrongAnswer} />
                    {flashcards.length > 0 && (
                      <div className="mt-12 text-center">
                        <button 
                          onClick={() => setShowFlashcards(true)}
                          className="bg-yellow-400 text-gray-900 px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:scale-105 transition-all"
                        >
                          Review {flashcards.length} Remedial Cards
                        </button>
                      </div>
                    )}
                  </section>
                </div>
              ) : (
                <BookingModule />
              )}
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <section id="pricing" className="py-32 bg-white border-t-8 border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-20">
                <h2 className="text-5xl lg:text-8xl font-black mb-4 uppercase italic tracking-tighter text-gray-900">ELITE <span className="text-blue-600">CERTIFICATION</span></h2>
                <p className="text-xl text-gray-500 font-bold italic uppercase tracking-widest">State-approved curriculum designed for lifelong road safety.</p>
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
                          <div className="w-3 h-3 rounded-full bg-blue-600 border-2 border-gray-900"></div>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <button 
                      onClick={() => triggerAuthFlow()}
                      className="w-full py-6 rounded-3xl font-black uppercase italic tracking-widest text-lg transition-all border-4 border-gray-900 bg-gray-100 shadow-[0_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1"
                    >
                      Begin Enrollment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {showFlashcards && (
        <FlashCardSystem cards={flashcards} onClose={() => { setShowFlashcards(false); setFlashcards([]); }} />
      )}

      <footer className="bg-gray-900 py-32 text-white border-t-[16px] border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
             <div>
               <span className="text-5xl font-black italic tracking-tighter leading-none">DRIVE<span className="text-blue-500">READY</span></span>
               <p className="mt-8 text-gray-400 text-lg font-bold italic leading-relaxed max-w-md uppercase tracking-wide">
                 Ohio's elite digital academy. 24-hour online courses built for responsible mastery.
               </p>
             </div>
             <div className="flex flex-col md:items-end justify-center">
                <p className="text-lg font-black uppercase italic text-blue-500">937-SAFE-DRIVE</p>
                <p className="text-gray-600 mt-2 font-black uppercase tracking-[0.2em] text-xs">Certified Academy #55829</p>
             </div>
          </div>
        </div>
      </footer>

      {isLoggedIn && <VirtualCoach />}
    </div>
  );
};

export default App;
