
import React, { useState, useEffect } from 'react';
import { generateScenario } from '../services/geminiService';
import { DrivingScenario } from '../types';

interface Props {
  onReward: (xp: number) => void;
}

const ScenarioSim: React.FC<Props> = ({ onReward }) => {
  const [scenario, setScenario] = useState<DrivingScenario | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadScenario();
  }, []);

  const loadScenario = async () => {
    setLoading(true);
    const data = await generateScenario();
    setScenario(data);
    setSelectedIdx(null);
    setLoading(false);
  };

  const handleSelect = (idx: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(idx);
    if (scenario?.options[idx].isCorrect) {
      onReward(250);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border-8 border-gray-900 rounded-[3rem] p-12 text-center">
        <div className="w-16 h-16 border-8 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="font-black italic uppercase text-gray-500">Generating New Road Scenario...</p>
      </div>
    );
  }

  if (!scenario) return null;

  return (
    <div className="bg-white border-8 border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in duration-500">
      <div className="bg-gray-900 p-4 flex justify-between items-center text-white">
        <span className="font-black italic uppercase tracking-widest text-xs">S.E.E. Mission Strategy</span>
        <span className="bg-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Level: Intermediate</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r-8 border-gray-900">
          <div className="bg-gray-100 rounded-[2rem] aspect-video mb-8 flex items-center justify-center p-6 text-center border-4 border-dashed border-gray-300 relative group overflow-hidden">
            <p className="font-bold italic text-gray-500 group-hover:text-gray-700 transition-colors">
              [Simulation Visual: {scenario.imageDescription}]
            </p>
            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-all"></div>
          </div>
          <h3 className="text-2xl font-black uppercase italic leading-tight text-gray-900 mb-4">The Situation:</h3>
          <p className="text-gray-600 font-bold leading-relaxed">{scenario.context}</p>
        </div>

        <div className="p-8 lg:p-12 bg-gray-50">
          <h3 className="text-xl font-black uppercase italic text-gray-400 mb-8">What do you do next?</h3>
          <div className="space-y-4">
            {scenario.options.map((opt, i) => {
              let style = "bg-white border-4 border-gray-900 hover:bg-gray-100 hover:-translate-y-1";
              if (selectedIdx !== null) {
                if (opt.isCorrect) style = "bg-green-100 border-green-600 text-green-900 scale-105 z-10 shadow-lg";
                else if (i === selectedIdx) style = "bg-red-100 border-red-600 text-red-900 opacity-50";
                else style = "bg-gray-100 border-gray-200 opacity-20 grayscale";
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={selectedIdx !== null}
                  className={`w-full text-left p-6 rounded-2xl font-black italic uppercase transition-all flex items-center gap-4 ${style}`}
                >
                  <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center shrink-0">{i + 1}</span>
                  {opt.text}
                </button>
              );
            })}
          </div>

          {selectedIdx !== null && (
            <div className="mt-8 animate-in slide-in-from-bottom-4">
              <div className={`p-6 rounded-3xl border-4 ${scenario.options[selectedIdx].isCorrect ? 'bg-green-600 text-white border-green-800' : 'bg-red-600 text-white border-red-800'}`}>
                <h4 className="font-black italic uppercase text-sm mb-2">
                  {scenario.options[selectedIdx].isCorrect ? 'Success!' : 'Critical Error'}
                </h4>
                <p className="text-sm font-bold leading-snug">{scenario.options[selectedIdx].feedback}</p>
              </div>
              <button 
                onClick={loadScenario}
                className="w-full mt-6 bg-gray-900 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-black transition-all shadow-xl"
              >
                Next Mission
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioSim;
