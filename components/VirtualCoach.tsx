
import React, { useState, useRef, useEffect } from 'react';
import { getVirtualCoachResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const VirtualCoach: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Beep beep! I'm Coach Alex. Giving you a big thumbs up as we start your driving journey! How can I help today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getVirtualCoachResponse(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || "Brakes engaged! I couldn't process that. Try again?" }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Stalled engine! Let's try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 h-[500px] rounded-[2rem] shadow-2xl flex flex-col border-4 border-blue-600 animate-in slide-in-from-bottom-4 duration-300 overflow-hidden">
          <div className="bg-blue-600 p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
              {/* Mascot Avatar Circle */}
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border-2 border-red-500 shadow-inner overflow-hidden">
                 <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                   <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                   <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10V8a1 1 0 011-1h5a1 1 0 011 1v3h.05a2.5 2.5 0 014.9 0H22a1 1 0 001-1V5a1 1 0 00-1-1h-6.1l-1.5-2.25A1 1 0 0013.6 1H6.4a1 1 0 00-.8.4L4.1 4H3z" />
                 </svg>
              </div>
              <div>
                <h3 className="font-black text-lg leading-none uppercase italic">Coach Alex</h3>
                <span className="text-[10px] text-blue-100 font-bold tracking-widest uppercase">Mascot Mode • Online</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 rounded-full p-1 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm text-sm font-medium ${
                  msg.role === 'user' 
                    ? 'bg-red-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 rounded-tl-none border-2 border-gray-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border-2 border-gray-100 flex gap-1">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t-2 border-blue-100 shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your Coach..."
                className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all border-2 border-transparent focus:border-blue-600"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-red-600 text-white p-3 rounded-xl hover:bg-red-700 transition-all disabled:opacity-50 shadow-lg"
              >
                <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group border-4 border-white"
        >
          <div className="relative">
             <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
          </div>
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-black uppercase tracking-widest text-sm">Coach Alex</span>
        </button>
      )}
    </div>
  );
};

export default VirtualCoach;
