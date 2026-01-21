
import React, { useState } from 'react';

interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
  onLoginClick: () => void;
  onBookClick: () => void;
}

const Header: React.FC<Props> = ({ isLoggedIn, onLogout, onLoginClick, onBookClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b-8 border-blue-600 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-4 group cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="relative">
                <div className="bg-blue-600 p-2 rounded-2xl rotate-3 group-hover:rotate-0 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-4 border-white">
                  <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-[900] text-gray-900 tracking-tighter leading-none italic uppercase">
                  DRIVE<span className="text-blue-600">READY</span>
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1 flex-1 bg-blue-100"></div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] leading-none whitespace-nowrap">
                    Safety First
                  </span>
                  <div className="h-1 flex-1 bg-blue-100"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <a href="#mission" className="text-gray-900 hover:text-blue-600 font-black text-xs uppercase italic tracking-widest transition-colors">Learning Path</a>
                <a href="#theory" className="text-gray-900 hover:text-blue-600 font-black text-xs uppercase italic tracking-widest transition-colors">Safety Quiz</a>
                <button 
                  onClick={onBookClick}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase italic hover:bg-blue-700 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900"
                >
                  Schedule Lesson
                </button>
                <button 
                  onClick={onLogout}
                  className="text-gray-400 hover:text-red-600 font-black text-[10px] uppercase italic tracking-widest"
                >
                  Exit Academy
                </button>
              </>
            ) : (
              <>
                <a href="#pricing" className="text-gray-900 hover:text-blue-600 font-black text-xs uppercase italic tracking-widest transition-colors">Programs</a>
                <button 
                  onClick={onLoginClick}
                  className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase italic hover:bg-black transition-all shadow-[6px_6px_0px_0px_rgba(37,99,235,1)] border-2 border-white"
                >
                  Student Login
                </button>
              </>
            )}
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
        <div className="lg:hidden bg-blue-50 border-t-4 border-gray-900 p-6 space-y-4 shadow-2xl">
          {isLoggedIn ? (
            <>
              <button onClick={onBookClick} className="w-full bg-blue-600 text-white px-4 py-4 rounded-2xl font-black italic uppercase border-4 border-gray-900">Schedule Lesson</button>
              <button onClick={onLogout} className="w-full text-red-600 font-black italic uppercase mt-4">Logout</button>
            </>
          ) : (
            <button onClick={onLoginClick} className="w-full bg-gray-900 text-white px-4 py-4 rounded-2xl font-black italic uppercase border-4 border-gray-900">Sign In</button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
