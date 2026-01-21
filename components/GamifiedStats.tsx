
import React from 'react';
import { UserStats } from '../types';

interface Props {
  stats: UserStats;
}

const GamifiedStats: React.FC<Props> = ({ stats }) => {
  const xpForNextLevel = 1000;
  const progress = (stats.xp % xpForNextLevel) / 10;

  return (
    <div className="bg-white border-4 border-gray-900 rounded-[2.5rem] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center gap-8 sticky top-28 z-40 mb-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl border-4 border-gray-900 flex items-center justify-center text-white text-3xl font-black italic shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          {stats.level}
        </div>
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Student Level</h4>
          <p className="text-xl font-black uppercase italic text-gray-900">Road Master</p>
        </div>
      </div>

      <div className="flex-1 min-w-[200px]">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 italic">XP Progress</span>
          <span className="text-xs font-black text-gray-900">{stats.xp} / {Math.ceil(stats.xp / 1000) * 1000}</span>
        </div>
        <div className="h-6 bg-gray-100 rounded-full border-4 border-gray-900 overflow-hidden relative">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] animate-pulse"></div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Daily Streak</h4>
          <p className="text-xl font-black uppercase italic text-gray-900">{stats.streak} DAYS</p>
        </div>
        <div className="w-12 h-12 bg-red-600 rounded-xl border-4 border-gray-900 flex items-center justify-center text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          🔥
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2">
        {stats.badges.map(badge => (
          <div 
            key={badge.id}
            title={`${badge.name}: ${badge.description}`}
            className={`w-10 h-10 rounded-lg border-2 border-gray-900 flex items-center justify-center text-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${badge.unlocked ? 'bg-yellow-400 grayscale-0' : 'bg-gray-100 grayscale'}`}
          >
            {badge.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamifiedStats;
