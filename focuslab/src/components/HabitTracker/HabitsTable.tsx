import React from 'react';
import { Plus } from 'lucide-react';
import type { Habit, HabitData } from './types';

type Props = {
  habits: Habit[];
  daysInMonth: number;
  getDayOfWeek: (day: number) => string;
  renderWeekHeader: (weekNum: number) => { label: string; days: number[] };
  habitData: HabitData;
  toggleHabit: (habitIndex: number, day: number) => void;
  onNameClick: (habitId: number) => void;
  onNameDoubleClick: (habitId: number) => void;
    onAddHabit?: (name?: string) => void;
};

const HabitsTable: React.FC<Props> = ({
  habits,
  daysInMonth,
  getDayOfWeek,
  renderWeekHeader,
  habitData,
  toggleHabit,
  onNameClick,
  onNameDoubleClick,
  onAddHabit,
}) => {
  return (
    <div className="flex flex-col overflow-x-auto bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-2 font-bold bg-gray-100">
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span>My Habits</span>
                   <div className="flex">
                    <button
                      aria-label="Add habit"
                      onClick={() => {
                        if (onAddHabit) onAddHabit();
                        else alert('Add habit');
                      }}
                      className=" rounded-md hover:bg-gray-100 text-gray-600"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                </div>
                </div>
                
              </div>
            </th>
            
            {[0, 1, 2, 3].map(weekNum => {
              const week = renderWeekHeader(weekNum);
              return (
                <React.Fragment key={weekNum}>
                  <th colSpan={7} className="text-center p-2 bg-gray-100 border-l border-gray-300">
                    {week.label}
                  </th>
                </React.Fragment>
              );
            })}
            <th colSpan={2} className="text-center p-2 bg-gray-100 border-l border-gray-300"></th>
          </tr>
          <tr>
           
            <th className="p-2 bg-gray-50"></th>
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <th key={i} className="text-center text-xs p-1 bg-gray-50 border-l border-gray-200">
                {getDayOfWeek(i)}
              </th>
            ))}
          </tr>
          <tr>
            <th className="p-2 bg-gray-50"></th>
            {Array.from({ length: daysInMonth }).map((_, i) => (
              <th key={i} className="text-center text-xs p-1 bg-gray-50 border-l border-gray-200">
                {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit, habitIndex) => (
            <tr key={habit.id} className="border-t border-gray-200">
              <td className="p-2 text-sm font-medium whitespace-nowrap">
                <div
                  onClick={() => onNameClick(habit.id)}
                  onDoubleClick={() => onNameDoubleClick(habit.id)}
                  className="cursor-pointer select-none inline-flex items-center gap-2"
                  title="Double click to edit"
                >
                  <span>{habit.name}</span>
                  <span>{habit.icon}</span>
                </div>
              </td>
              {Array.from({ length: daysInMonth }).map((_, day) => {
                const checked = (habitData[habitIndex] ?? [])[day] === 1;
                return (
                  <td key={day} className="text-center p-1 border-l border-gray-200">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleHabit(habitIndex, day)}
                      className="w-4 h-4 cursor-pointer accent-gray-500"
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitsTable;
