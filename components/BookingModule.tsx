
import React, { useState } from 'react';

const BookingModule: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date;
  });

  const timeSlots = ["08:00 AM", "10:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];

  const handleConfirm = () => {
    if (selectedDay !== null && selectedTime) {
      alert(`Lesson Scheduled! You are booked for ${days[selectedDay].toLocaleDateString()} at ${selectedTime}. Please arrive 10 minutes early for your safety briefing.`);
    }
  };

  return (
    <div className="bg-white border-8 border-gray-900 rounded-[3.5rem] p-8 lg:p-16 shadow-2xl animate-in slide-in-from-right-12 duration-700">
      <div className="text-center mb-16">
        <h2 className="text-4xl lg:text-7xl font-black uppercase italic tracking-tighter text-gray-900 mb-4">
          LESSON <span className="text-blue-600">SCHEDULE</span>
        </h2>
        <p className="text-gray-500 font-bold italic uppercase tracking-widest text-sm">Select your next in-car instructional session.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-16">
        {days.map((date, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDay(idx)}
            className={`p-6 rounded-3xl border-4 transition-all flex flex-col items-center gap-1 ${
              selectedDay === idx 
                ? 'bg-blue-600 text-white border-gray-900 scale-105 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]' 
                : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-900 hover:text-gray-900'
            }`}
          >
            <span className="text-[10px] font-black uppercase tracking-widest mb-1">
              {date.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <span className="text-3xl font-black italic">
              {date.getDate()}
            </span>
          </button>
        ))}
      </div>

      {selectedDay !== null && (
        <div className="animate-in fade-in slide-in-from-bottom-6">
          <h3 className="text-2xl font-black uppercase italic text-gray-900 mb-8 flex items-center gap-4">
            <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
            Select Session Time:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {timeSlots.map((time, i) => (
              <button 
                key={i}
                onClick={() => setSelectedTime(time)}
                className={`p-6 rounded-2xl font-black uppercase italic text-sm transition-all border-4 ${
                  selectedTime === time 
                    ? 'bg-yellow-400 text-gray-900 border-gray-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-105'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-gray-900 hover:text-gray-900'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button 
              onClick={handleConfirm}
              disabled={!selectedTime}
              className="bg-gray-900 text-white px-16 py-6 rounded-3xl font-black uppercase italic tracking-widest text-xl hover:bg-black transition-all shadow-[12px_12px_0px_0px_rgba(37,99,235,0.3)] disabled:opacity-20 disabled:grayscale"
            >
              Confirm Enrollment
            </button>
          </div>
        </div>
      )}

      <div className="mt-20 p-10 bg-gray-50 rounded-[3rem] border-8 border-gray-900 shadow-inner">
        <div className="flex flex-col md:flex-row items-center gap-10">
           <div className="w-24 h-24 bg-gray-900 rounded-[2rem] flex items-center justify-center text-5xl shadow-xl shrink-0">
             🛡️
           </div>
           <div>
             <h4 className="font-black italic uppercase text-gray-900 text-2xl mb-2">Academic Note: Visibility Training</h4>
             <p className="text-gray-600 font-bold italic leading-relaxed text-lg">
               Scheduling a 5:00 PM session allows for mandatory sunset/dusk visibility training. 
               This satisfies Ohio's requirement for low-light proficiency and earns the 
               <span className="text-blue-600"> Visibility Pro Badge</span>.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModule;
