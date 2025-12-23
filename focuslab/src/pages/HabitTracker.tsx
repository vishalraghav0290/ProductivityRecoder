import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  Header,
  HabitsTable,
  ProgressSummary,
  ProgressChart,
  MentalState,
  AnalysisSidebar,
  EditModal,
  WeekSummary
} from '../components/HabitTracker';
import type { Habit, HabitData, Stats } from '../components/HabitTracker/types';

const HabitTracker: React.FC = () => {
  const daysInMonth = 30;
  const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

  // compute current month name dynamically
  const monthName = new Date().toLocaleString(undefined, { month: 'long' });

  // Default dummy data to initialize localStorage
  const defaultHabits: Habit[] = [
    { id: 0, name: 'Wake up at 05:00', icon: '⏰', goal: 30 },
    { id: 1, name: 'Gym', icon: '💪', goal: 30 },
    { id: 2, name: 'Reading Learning', icon: '📚', goal: 30 },
    { id: 3, name: 'Day Planning', icon: '📝', goal: 30 },
    { id: 4, name: 'Budget Tracking', icon: '💰', goal: 30 },
    { id: 5, name: 'Project Work', icon: '💼', goal: 30 },
    { id: 6, name: 'No Alcohol', icon: '🚫', goal: 30 },
    { id: 7, name: 'Social Media Detox', icon: '📱', goal: 30 },
    { id: 8, name: 'Goal Journaling', icon: '📔', goal: 30 },
    { id: 9, name: 'Cold Shower', icon: '🚿', goal: 30 }
  ];

  const defaultHabitData: HabitData = {
    0: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    1: [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
    2: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    3: [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    4: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    5: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    6: [1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1],
    7: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0],
    8: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    9: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  // Initialize from localStorage or use defaults
  const [habits, setHabits] = useState<Habit[]>(() => {
    const stored = localStorage.getItem('habitTracker_habits');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with default data
    localStorage.setItem('habitTracker_habits', JSON.stringify(defaultHabits));
    return defaultHabits;
  });

  const [habitData, setHabitData] = useState<HabitData>(() => {
    const stored = localStorage.getItem('habitTracker_data');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize localStorage with default data
    localStorage.setItem('habitTracker_data', JSON.stringify(defaultHabitData));
    return defaultHabitData;
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habitTracker_habits', JSON.stringify(habits));
  }, [habits]);

  // Save habitData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('habitTracker_data', JSON.stringify(habitData));
  }, [habitData]);

  const moodData: Array<number | null> = [9, null, 4, null, 6, null, 9, null, 9, null, 7, null, 9, null, 8, null, 6, null, 6, null, 4, null, 7, null, 3, null, 7, null, 2, null, 5];
  const motivationData: Array<number | null> = [7, null, 8, null, 8, null, 8, null, null, null, null, null, 5, null, 5, null, 9, null, 7, null, 6, null, 7, null, 8, null, 5, null, 6, null, 8];

  const toggleHabit = (habitIndex: number, day: number) => {
    setHabitData(prev => {
      const prevRow = prev[habitIndex] ?? new Array<number>(daysInMonth).fill(0);
      const newRow = prevRow.map((val, i) => (i === day ? (val ? 0 : 1) : val));
      return {
        ...prev,
        [habitIndex]: newRow
      };
    });
  };

  const stats: Stats = useMemo(() => {
    let totalCompleted = 0;
    const totalPossible = habits.length * daysInMonth;

    const values = Object.values(habitData) as number[][];
    values.forEach(days => {
      totalCompleted += days.reduce((sum, val) => sum + val, 0);
    });

    const dailyProgress = [] as { day: number; progress: number }[];
    for (let day = 0; day < daysInMonth; day++) {
      let dayCompleted = 0;
      values.forEach(days => {
        dayCompleted += days[day] ?? 0;
      });
      dailyProgress.push({
        day: day + 1,
        progress: (dayCompleted / habits.length) * 100
      });
    }

    const habitStats = habits.map((habit, i) => {
      const row = habitData[i] ?? new Array<number>(daysInMonth).fill(0);
      const actual = row.reduce((sum, val) => sum + val, 0);
      const progress = habit.goal > 0 ? (actual / habit.goal) * 100 : 0;
      return {
        goal: habit.goal,
        actual,
        progress
      };
    });

    return {
      totalCompleted,
      totalPossible,
      percentage: totalPossible > 0 ? (totalCompleted / totalPossible) * 100 : 0,
      dailyProgress,
      habitStats
    };
  }, [habitData, habits.length]);

  const renderWeekHeader = (weekNum: number) => {
    const weeks = [
      { label: 'Week 1', days: [1, 2, 3, 4, 5, 6, 7] },
      { label: 'Week 2', days: [8, 9, 10, 11, 12, 13, 14] },
      { label: 'Week 3', days: [15, 16, 17, 18, 19, 20, 21] },
      { label: 'Week 4', days: [22, 23, 24, 25, 26, 27, 28] }
    ];
    return weeks[weekNum];
  };

  const getDayOfWeek = (day: number): string => {
    return daysOfWeek[day % 7];
  };

  // --------- editing (modal) state & single/double click logic ----------
  const clickTimer = useRef<number | null>(null);
  const CLICK_DELAY = 250; // ms

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const onNameClick = (_habitId: number) => {
    // start a timer for single-click action
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    clickTimer.current = window.setTimeout(() => {
      // single click action (example: you can highlight or show details)
      // currently we don't do anything for single click; placeholder:
      // console.log('single click on', habitId);
      clickTimer.current = null;
    }, CLICK_DELAY);
  };

  const onNameDoubleClick = (habitId: number) => {
    // cancel single-click timer and open modal to edit
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
      setEditingId(habitId);
      setEditValue(habit.name);
    }
  };

  const saveEdit = (id: number | null) => {
    if (id === null) return;
    setHabits(prev => prev.map(h => (h.id === id ? { ...h, name: editValue } : h)));
    setEditingId(null);
    setEditValue('');
  };

  const closeModal = () => {
    setEditingId(null);
    setEditValue('');
  };

  // ---------------------------------------------------------------------

  return (
    <div className="flex  min-h-screen bg-gray-100 p-4 justify-center items-center ">
      <div className="flex flex-col w-[95%] mx-auto bg-gray-100  shadow-lg rounded-4xl">
        <Header
          habitsCount={habits.length}
          totalCompleted={stats.totalCompleted}
          percentage={stats.percentage}
          month={monthName}
        />

        <div className="tracker-flex">
          <div className=" flex flex-col p-6 gap-4 bg-gray-100">
            {/* week summary (visible on small screens) */}
            <div className="flex w-full bg-white justify-center items-center rounded-2xl p-3">
              <WeekSummary dailyProgress={stats.dailyProgress} />
              <HabitsTable
                habits={habits}
                daysInMonth={daysInMonth}
                getDayOfWeek={getDayOfWeek}
                renderWeekHeader={renderWeekHeader}
                habitData={habitData}
                toggleHabit={toggleHabit}
                onNameClick={onNameClick}
                onNameDoubleClick={onNameDoubleClick}
              />
            </div>


            <div className="flex flex-col gap-4 rounded-3xl bg-white p-4">
              <ProgressSummary dailyProgress={stats.dailyProgress} habitData={habitData} daysInMonth={daysInMonth} />
              <ProgressChart dailyProgress={stats.dailyProgress} />
            </div>

            <div className="flex flex-col gap-4 rounded-3xl bg-white p-4">
              <MentalState moodData={moodData} motivationData={motivationData} />
            </div>
          </div>

          <div className=" w-[20%]">
            <AnalysisSidebar stats={stats} />
          </div>
        </div>

        <EditModal
          editingId={editingId}
          editValue={editValue}
          setEditValue={setEditValue}
          saveEdit={saveEdit}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default HabitTracker;