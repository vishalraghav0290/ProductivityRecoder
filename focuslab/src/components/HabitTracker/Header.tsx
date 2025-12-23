import React from 'react';
import type { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ habitsCount, totalCompleted, percentage, month }) => {
  return (
    <div className="bg-gray-200 px-6 py-4 flex items-center justify-between">
      <h1 className="text-3xl font-Nunito text-gray-700">{month}</h1>
      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="text-sm text-gray-600">Number of habits</div>
          <div className="text-lg font-bold">{habitsCount}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Completed habits</div>
          <div className="text-lg font-bold">{totalCompleted}</div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Progress</div>
          <div className="w-32 h-4 bg-gray-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-400 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600">Progress in %</div>
          <div className="text-lg font-bold">{percentage.toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
