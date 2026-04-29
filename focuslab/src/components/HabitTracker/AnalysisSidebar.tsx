import React from 'react';
import type { Stats } from './types';

type Props = {
  stats: Stats;
};

const AnalysisSidebar: React.FC<Props> = ({ stats }) => {
  const content = (
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
  );

  return (
    <div className="w-full lg:mt-10">
      <div className="hidden lg:flex flex-col bg-white p-4 border border-gray-100 rounded-2xl shadow-sm">
        <h3 className="font-bold text-lg mb-4">Analysis</h3>
        {content}
      </div>

      <details className="lg:hidden bg-white rounded-2xl shadow-sm border border-gray-100">
        <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-gray-800 flex items-center justify-between">
          <span>Analysis</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <div className="px-4 pb-4">{content}</div>
      </details>
    </div>
  );
};

export default AnalysisSidebar;
