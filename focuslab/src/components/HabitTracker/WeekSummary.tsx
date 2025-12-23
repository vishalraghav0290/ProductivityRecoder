import React from 'react';
import type { DailyProgress } from './types';

type Props = {
  dailyProgress: DailyProgress[];
};

const WeekSummary: React.FC<Props> = ({ dailyProgress }) => {
  // group into 4 weeks (7 days each)
  const weeks = [0, 1, 2, 3].map(weekIdx => {
    const start = weekIdx * 7;
    const end = start + 7; // exclusive
    const slice = dailyProgress.slice(start, end);
    const avg = slice.length > 0 ? Math.round(slice.reduce((s, d) => s + d.progress, 0) / slice.length) : 0;
    return {
      label: `Week ${weekIdx + 1}`,
      progress: avg
    };
  });

  return (
    <div className="week-summary flex flex-col bg-white p-3 rounded-mpd shadow-sm mt-3">
      <div className="text-sm font-semibold mb-2">Weekly Summary</div>
      <div className="flex gap-3">
        {weeks.map((w, i) => (
          <div key={i} className="flex-1 text-xs">
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">{w.label}</span>
              <span className="font-medium">{w.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: `${w.progress}%` }} />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default WeekSummary;
