import React, { useRef, useState } from "react";

type Habit = { id: number; name: string; icon: string; goal: number; };

export default function HabitTrackerModalEdit() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 0, name: 'Wake up at 05:00', icon: '⏰', goal: 30 },
    { id: 1, name: 'Gym', icon: '💪', goal: 30 },
    // ...
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const clickTimer = useRef<number | null>(null);
  const CLICK_DELAY = 250;

  const onNameClick = (habit: Habit) => {
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    clickTimer.current = window.setTimeout(() => {
      console.log("single click", habit.id);
      clickTimer.current = null;
    }, CLICK_DELAY);
  };

  const onNameDoubleClick = (habit: Habit) => {
    if (clickTimer.current) {
      window.clearTimeout(clickTimer.current);
      clickTimer.current = null;
    }
    setEditingId(habit.id);
    setEditValue(habit.name);
  };

  const saveEdit = (id: number) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, name: editValue } : h));
    setEditingId(null);
  };

  const closeModal = () => {
    setEditingId(null);
  };

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {habits.map(habit => (
          <li
            key={habit.id}
            onClick={() => onNameClick(habit)}
            onDoubleClick={() => onNameDoubleClick(habit)}
            className="p-3 bg-white shadow-sm rounded cursor-pointer flex justify-between items-center"
          >
            <div><span className="mr-2">{habit.icon}</span>{habit.name}</div>
            <div className="text-sm text-gray-500">Goal: {habit.goal}</div>
          </li>
        ))}
      </ul>

      {/* Very small modal implementation */}
      {editingId !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-30" onClick={closeModal} />
          <div className="bg-white p-6 rounded shadow-lg z-10 w-full max-w-md">
            <h3 className="font-bold mb-2">Edit habit</h3>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") saveEdit(editingId);
                if (e.key === "Escape") closeModal();
              }}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => saveEdit(editingId)} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
              <button onClick={closeModal} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
