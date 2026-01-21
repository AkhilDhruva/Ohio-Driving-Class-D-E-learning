
import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b-8 border-blue-600 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-4 group cursor-pointer">
              {/* Mascot Logo Icon Simulation */}
              <div className="relative">
                <div className="bg-blue-600 p-2 rounded-2xl rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-white">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <div className="absolute -top-2 -right-2 w-6 h-5 bg-red-600 rounded-full border-2 border-white shadow-sm"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-[900] text-gray-900 tracking-tighter leading-none italic uppercase">
                  DRIVE<span className="text-blue-600">READY</span>
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 flex-1 bg-yellow-400"></div>
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] leading-none whitespace-nowrap">
                    Academy
                  </span>
                  <div className="h-1 flex-1 bg-yellow-400"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#interactive" className="text-gray-900 hover:text-blue-600 font-black text-xs uppercase italic tracking-widest transition-colors">Road Signs</a>
            <a href="#theory" className="text-gray-900 hover:text-blue-600 font-black text-xs uppercase italic tracking-widest transition-colors">Pit Quiz</a>
            <a href="#pricing" className="text-gray-900 hover:text-blue-600 font-black text-xs uppercase italic tracking-widest transition-colors">Pricing</a>
            <a href="#booking" className="bg-red-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase italic hover:bg-red-700 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 active:scale-95 border-2 border-gray-900">
              Book Lesson
            </a>
          </div>
          <div className="lg:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-900 p-2 border-4 border-gray-900 rounded-xl">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden bg-yellow-400 border-t-4 border-gray-900 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4">
          <a href="#interactive" className="block text-gray-900 font-black italic uppercase tracking-widest px-4">Road Signs</a>
          <a href="#theory" className="block text-gray-900 font-black italic uppercase tracking-widest px-4">Pit Quiz</a>
          <a href="#pricing" className="block text-gray-900 font-black italic uppercase tracking-widest px-4">Pricing</a>
          <a href="#booking" className="block bg-blue-600 text-white px-4 py-4 rounded-2xl font-black italic uppercase text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Book Lesson</a>
        </div>
      )}
    </nav>
  );
};

export default Header;
