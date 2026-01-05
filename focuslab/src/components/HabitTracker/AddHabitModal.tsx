import React, { useState } from 'react';

type Props = {
  open: boolean;
  onCreate: (payload: { name: string; icon?: string; goal?: number }) => void;
  onClose: () => void;
};

const AddHabitModal: React.FC<Props> = ({ open, onCreate, onClose }) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('✅');
  const [goal, setGoal] = useState<number>(30);

  if (!open) return null;

  const submit = () => {
    if (!name.trim()) {
      alert('Please enter a habit name');
      return;
    }
    onCreate({ name: name.trim(), icon, goal });
    setName('');
    setIcon('✅');
    setGoal(30);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-3">Add habit</h3>
        <div className="flex flex-col gap-3">
          <label className="text-sm">Name</label>
          <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} />

          <label className="text-sm">Icon (emoji)</label>
          <input className="w-full border rounded px-3 py-2" value={icon} onChange={e => setIcon(e.target.value)} />

          <label className="text-sm">Goal (days)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={goal}
            onChange={e => setGoal(Number(e.target.value) || 0)}
            min={1}
          />

          <div className="flex justify-end gap-2 mt-2">
            <button onClick={onClose} className="px-3 py-1 rounded bg-gray-200">Cancel</button>
            <button onClick={submit} className="px-3 py-1 rounded bg-green-600 text-white">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHabitModal;
