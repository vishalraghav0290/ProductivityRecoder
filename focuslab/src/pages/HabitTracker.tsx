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
import { AddHabitModal } from '../components/HabitTracker';
import type { Habit, HabitData, Stats } from '../components/HabitTracker/types';
import habitStorage from '../utils/habitStorage';
import { getCurrentUser } from '../utils/auth';

const HabitTracker: React.FC = () => {
  // compute days in current month dynamically
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysOfWeek = ['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr'];

  // compute current month name dynamically
  const monthName = new Date().toLocaleString(undefined, { month: 'long' });

  // Load per-user data from habitStorage; when no user (anon) we fall back to 'anon'
  const currentUser = getCurrentUser();
  const userId = currentUser?.id ?? 'anon';

  // Try to load persisted user-specific habits + data
  const storedHabits = habitStorage.loadHabitsForUser(userId);
  const storedData = habitStorage.loadHabitDataForUser(userId);
  const meta = habitStorage.loadMetaForUser(userId);

  // Initialize state with stored data or initialize a clean dataset for new users
  const [habits, setHabits] = useState<Habit[]>(() => {
    if (storedHabits && Array.isArray(storedHabits)) return storedHabits;
    const result = habitStorage.initializeUserData(userId, daysInMonth).habits;
    return result;
  });

  const [habitData, setHabitData] = useState<HabitData>(() => {
    if (storedData) return storedData;
    return habitStorage.initializeUserData(userId, daysInMonth).data;
  });

  const [userMeta] = useState<{ createdAt: string } | null>(() => {
    if (meta) return meta;
    const m = { createdAt: new Date().toISOString() };
    habitStorage.saveMetaForUser(userId, m);
    return m;
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    habitStorage.saveHabitsForUser(userId, habits);
  }, [habits, userId]);

  // Save habitData to localStorage whenever it changes
  useEffect(() => {
    habitStorage.saveHabitDataForUser(userId, habitData);
  }, [habitData, userId]);

  // meta is saved on initialization. If you need to update meta later, call
  // habitStorage.saveMetaForUser(userId, { createdAt: ... }) directly.

  const moodData: Array<number | null> = [9, null, 4, null, 6, null, 9, null, 9, null, 7, null, 9, null, 8, null, 6, null, 6, null, 4, null, 7, null, 3, null, 7, null, 2, null, 5];
  const motivationData: Array<number | null> = [7, null, 8, null, 8, null, 8, null, null, null, null, null, 5, null, 5, null, 9, null, 7, null, 6, null, 7, null, 8, null, 5, null, 6, null, 8];

  const toggleHabit = (habitIndex: number, day: number) => {
    const now = new Date();
    const todayIndex = now.getDate() - 1; // zero-based index for arrays

    // Disallow toggling future dates
    if (day > todayIndex) {
      // User attempted to mark a future date
      alert('gogi beta masti nai');
      return;
    }

    // Allow only today and yesterday
    if (day < todayIndex - 1) {
      alert('You can only mark today or yesterday');
      return;
    }

    // Prevent toggling days earlier than the account creation date in the same month.
    if (userMeta && userMeta.createdAt) {
      const created = new Date(userMeta.createdAt);
      const now2 = new Date();
      if (created.getFullYear() === now2.getFullYear() && created.getMonth() === now2.getMonth()) {
        const createdDay = created.getDate();
        // day is zero-based index, createdDay is 1-based
        if (day + 1 < createdDay) {
          // Disallow toggling earlier than account creation
          alert('Cannot edit before account creation');
          return;
        }
      }
    }

    setHabitData(prev => {
      const prevRow = prev[habitIndex] ?? new Array<number>(daysInMonth).fill(0);
      const newRow = prevRow.map((val, i) => (i === day ? (val ? 0 : 1) : val));
      const next = {
        ...prev,
        [habitIndex]: newRow
      };
      // persist immediately via effect, but ensure we also persist here in case
      // effect ordering changes
      habitStorage.saveHabitDataForUser(userId, next);
      return next;
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
  }, [habitData, habits, daysInMonth]);

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
    void _habitId;
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

  const deleteHabit = (id: number | null) => {
    if (id === null) return;
    // Remove habit and rebuild habitData so indices remain contiguous
    setHabits(prevHabits => {
      const indexMap = new Map(prevHabits.map((h, i) => [h.id, i]));
      const updated = prevHabits.filter(h => h.id !== id);

      // rebuild habitData using previous data rows copied to new indices
      setHabitData(prevData => {
        const newData: HabitData = {};
        updated.forEach((h, newIndex) => {
          const oldIndex = indexMap.get(h.id)!;
          newData[newIndex] = prevData[oldIndex] ?? new Array<number>(daysInMonth).fill(0);
        });
        // persist immediately
        habitStorage.saveHabitsForUser(userId, updated);
        habitStorage.saveHabitDataForUser(userId, newData);
        return newData;
      });

      return updated;
    });

    // close modal if open
    closeModal();
  };

  // Add-habit modal state
  const [addOpen, setAddOpen] = useState(false);

  const addHabit = (payload: { name: string; icon?: string; goal?: number }) => {
    const { name, icon = '✅', goal = 30 } = payload;
    // create new habit with unique id
    setHabits(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(h => h.id)) + 1 : 0;
      const newHabit: Habit = { id: nextId, name, icon, goal };
      const updated = [...prev, newHabit];

      // persist habits
      habitStorage.saveHabitsForUser(userId, updated);

      // update habitData to add an empty row at the end
      setHabitData(prevData => {
        const newData: HabitData = { ...prevData };
        newData[updated.length - 1] = new Array<number>(daysInMonth).fill(0);
        habitStorage.saveHabitDataForUser(userId, newData);
        return newData;
      });

      return updated;
    });

    setAddOpen(false);
  };

  const closeModal = () => {
    setEditingId(null);
    setEditValue('');
  };

  // ---------------------------------------------------------------------

  return (
    <div className="flex min-h-screen bg-gray-100 px-3 py-4 sm:px-4 sm:py-6">
      <div className="flex flex-col w-full max-w-6xl mx-auto gap-4">
        <Header
          habitsCount={habits.length}
          totalCompleted={stats.totalCompleted}
          percentage={stats.percentage}
          month={monthName}
        />

        <div className="tracker-flex">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col w-full bg-white justify-center items-stretch rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 gap-3">
              <div className="hidden sm:block">
                <WeekSummary dailyProgress={stats.dailyProgress} />
              </div>
              <div className="w-full overflow-x-auto">
                <HabitsTable
                  habits={habits}
                  daysInMonth={daysInMonth}
                  getDayOfWeek={getDayOfWeek}
                  renderWeekHeader={renderWeekHeader}
                  habitData={habitData}
                  toggleHabit={toggleHabit}
                  onNameClick={onNameClick}
                  onNameDoubleClick={onNameDoubleClick}
                  onAddHabit={() => setAddOpen(true)}
                />
              </div>
            </div>

            {/* Mobile-only Analysis (shown before Progress to match design) */}
            <div className="lg:hidden">
              <AnalysisSidebar stats={stats} />
            </div>

            <div className="hidden md:flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <ProgressSummary
                dailyProgress={stats.dailyProgress}
                habitData={habitData}
                daysInMonth={daysInMonth}
                onAddHabit={() => setAddOpen(true)}
              />
              <ProgressChart dailyProgress={stats.dailyProgress} />
            </div>

            <details className="md:hidden bg-white rounded-2xl shadow-sm border border-gray-100">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-gray-800 flex items-center justify-between">
                <span>Progress</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <ProgressSummary
                  dailyProgress={stats.dailyProgress}
                  habitData={habitData}
                  daysInMonth={daysInMonth}
                  onAddHabit={() => setAddOpen(true)}
                />
                <ProgressChart dailyProgress={stats.dailyProgress} />
              </div>
            </details>

            {/* Mental State - desktop card */}
            <div className="hidden md:flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <MentalState moodData={moodData} motivationData={motivationData} />
            </div>

            {/* Mental State - mobile accordion */}
            <details className="md:hidden bg-white rounded-2xl shadow-sm border border-gray-100">
              <summary className="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-gray-800 flex items-center justify-between">
                <span>Mental State</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-4 pb-4">
                <MentalState moodData={moodData} motivationData={motivationData} />
              </div>
            </details>
          </div>

          {/* Desktop sidebar */}
          <div className="hidden lg:block w-full lg:w-[22%]">
            <AnalysisSidebar stats={stats} />
          </div>
        </div>

        <EditModal
          editingId={editingId}
          editValue={editValue}
          setEditValue={setEditValue}
          saveEdit={saveEdit}
          deleteHabit={deleteHabit}
          closeModal={closeModal}
        />
        <AddHabitModal open={addOpen} onCreate={addHabit} onClose={() => setAddOpen(false)} />
      </div>
    </div>
  );
};

export default HabitTracker;