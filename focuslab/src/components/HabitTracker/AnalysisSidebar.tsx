import React from 'react';
import type { Stats } from './types';

type Props = {
  stats: Stats;
};

const AnalysisSidebar: React.FC<Props> = ({ stats }) => {
  return (
    <div className="flex flex-col w-inherit bg-white p-4 border-l border-gray-300 rounded-lg mt-10">
      <h3 className="font-bold text-lg mb-4">Analysis</h3>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-xs font-bold mb-2">
          <span>Goal</span>
          <span>Actual</span>
          <span>Progress</span>
        </div>
        {stats.habitStats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex justify-between text-xs">
              <span>{stat.goal}</span>
              <span>{stat.actual}</span>
            </div>
            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 rounded-full"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisSidebar;
