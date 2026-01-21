
import React, { useState } from 'react';

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

const Login: React.FC<Props> = ({ onSuccess, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAutoFill = () => {
    setIsTyping(true);
    const demoEmail = "safety@driveready.com";
    const demoPass = "defensive2025";
    
    let i = 0;
    const interval = setInterval(() => {
      setEmail(demoEmail.slice(0, i + 1));
      i++;
      if (i >= demoEmail.length) {
        clearInterval(interval);
        setPassword(demoPass);
        setIsTyping(false);
      }
    }, 40);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "safety@driveready.com" && password === "defensive2025") {
      onSuccess();
    } else {
      alert("INCORRECT ACCESS CODE. PLEASE USE THE OFFICIAL ACADEMY HINT.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white border-8 border-gray-900 rounded-[3rem] p-8 lg:p-12 relative shadow-[24px_24px_0px_0px_rgba(37,99,235,0.3)] animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-blue-600 text-white w-14 h-14 rounded-full border-4 border-gray-900 font-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        >
          X
        </button>

        <div className="text-center mb-10">
          <div className="inline-block bg-gray-900 text-white px-6 py-2 rounded-xl font-black italic uppercase tracking-widest text-xs mb-4 border-4 border-blue-600">
            Academy Portal
          </div>
          <h2 className="text-5xl font-black italic uppercase tracking-tighter text-gray-900">SECURE <span className="text-blue-600">ACCESS</span></h2>
          <p className="text-gray-400 font-bold uppercase italic text-xs mt-2 tracking-widest">Official Student Verification</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Student ID (Email)</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 border-4 border-gray-900 rounded-2xl p-4 font-bold text-lg focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              placeholder="student@driveready.com"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 italic">Academy Access Code</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 border-4 border-gray-900 rounded-2xl p-4 font-bold text-lg focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div 
            className="relative group"
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
          >
            <button 
              type="button"
              onClick={handleAutoFill}
              disabled={isTyping}
              className="w-full py-4 rounded-xl border-4 border-dashed border-gray-300 text-gray-400 font-black uppercase italic tracking-widest text-xs hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {isTyping ? "Verifying Academy Pass..." : "Access Demo Credentials"}
            </button>
            
            {showHint && (
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full bg-yellow-400 border-4 border-gray-900 p-4 rounded-2xl shadow-xl z-10 animate-in fade-in slide-in-from-bottom-2">
                <p className="text-gray-900 text-[10px] font-black italic uppercase leading-none mb-2">Student Access Pass:</p>
                <code className="text-gray-900 font-bold text-sm block">safety@driveready.com / defensive2025</code>
                <p className="text-[10px] font-black uppercase text-blue-600 mt-2 animate-pulse">Click to Auto-Fill</p>
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-6 rounded-3xl font-[900] uppercase italic tracking-widest text-2xl border-4 border-gray-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-1 transition-all active:scale-95"
          >
            Start Learning
          </button>
        </form>

        <p className="mt-8 text-center text-gray-400 text-[10px] font-bold uppercase italic leading-tight">
          By signing in, you acknowledge that safe driving <br/> is a life-long responsibility. Stay focused.
        </p>
      </div>
    </div>
  );
};

export default Login;
