import React from 'react';
import type { HeaderProps } from './types';

const Header: React.FC<HeaderProps> = ({ habitsCount, totalCompleted, percentage, month }) => {
  return (
    <div className="bg-white px-4 sm:px-6 py-4 rounded-3xl sm:rounded-4xl shadow-sm border border-gray-100">
      {/* Mobile layout */}
      <div className="md:hidden">
        <div className="flex items-center gap-3 mb-3">
          <img src='/calendar.png' className='w-7 h-7' alt='' />
          <h1 className="text-2xl font-Nunito text-gray-700">{month}</h1>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="flex flex-col items-center">
            <div className="text-base font-bold">{habitsCount}</div>
            <div className="text-xs text-gray-500">Habits</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-base font-bold">{totalCompleted}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-base font-bold">{percentage.toFixed(2)}%</div>
            <div className="text-xs text-gray-500">Progress</div>
          </div>
        </div>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-400 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Desktop layout (unchanged) */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex flex-row gap-5 items-center">
          <img src='/calendar.png' className='w-8 h-8' alt='' />
          <h1 className="text-3xl font-Nunito text-gray-700">{month}</h1>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center border-r border-gray-300 pr-4">
            <div className="text-lg font-bold">{habitsCount}</div>
            <div className="text-sm text-gray-600">Number of habits</div>
          </div>
          <div className="flex flex-col items-center border-r border-gray-300 pr-4">
            <div className="text-lg font-bold">{totalCompleted}</div>
            <div className="text-sm text-gray-600">Completed habits</div>
          </div>
          <div className="flex flex-col items-center gap-1 border-r border-gray-300 pr-4">
            <img src='/improve.png' className='w-8 h-8' alt='' />
            <div className="w-32 h-4 bg-gray-400 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 rounded-full"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </div>
          <div className="flex flex-col items-center ">
            <div className="text-lg font-bold">{percentage.toFixed(2)}%</div>
            <div className="text-sm text-gray-600">Progress in %</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
