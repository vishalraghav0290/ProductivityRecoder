import React from 'react';
import { Plus } from 'lucide-react';
import type { DailyProgress, HabitData } from './types';

type Props = {
  dailyProgress: DailyProgress[];
  habitData: HabitData;
  daysInMonth: number;
  onAddHabit?: (name?: string) => void;
};

const ProgressSummary: React.FC<Props> = ({ dailyProgress, habitData, daysInMonth, onAddHabit }) => {
  return (
    <div className="flex flex-col mt-4 border-t border-gray-300 pt-2 gap-2">
      <div className="flex items-center text-xs">
        <div className="w-48 font-bold flex items-center gap-2">
          <span>Progress</span>
          {/* small add-habit icon to use empty space below heading */}
          <button
            aria-label="Add habit"
            onClick={() => {
              if (onAddHabit) onAddHabit();
              else alert('Add habit');
            }}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {dailyProgress.map((dp, i) => (
          <div key={i} className="flex-1 text-center">
            {Math.round(dp.progress)}%
          </div>
        ))}
      </div>
      <div className="flex text-xs mt-1">
        <div className="w-48 font-bold">Done</div>
        {Array.from({ length: daysInMonth }).map((_, day) => {
          let done = 0;
          Object.values(habitData).forEach(row => {
            done += row[day] ?? 0;
          });
          return <div key={day} className="flex-1 text-center">{done}</div>;
        })}
      </div>
      <div className="flex text-xs mt-1">
        <div className="w-48 font-bold">Not Done</div>
        {Array.from({ length: daysInMonth }).map((_, day) => {
          let notDone = 0;
          Object.values(habitData).forEach(row => {
            notDone += ((row[day] ?? 0) === 1 ? 0 : 1);
          });
          return <div key={day} className="flex-1 text-center">{notDone}</div>;
        })}
      </div>
    </div>
  );
};

export default ProgressSummary;
