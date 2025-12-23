import React from 'react';

type Props = {
  editingId: number | null;
  editValue: string;
  setEditValue: (v: string) => void;
  saveEdit: (id: number | null) => void;
  closeModal: () => void;
};

const EditModal: React.FC<Props> = ({ editingId, editValue, setEditValue, saveEdit, closeModal }) => {
  if (editingId === null) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-30" onClick={closeModal} />
      <div className="bg-white p-6 rounded shadow-lg z-10 w-full max-w-md flex flex-col">
        <h3 className="font-bold mb-2">Edit habit</h3>
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') saveEdit(editingId);
            if (e.key === 'Escape') closeModal();
          }}
          autoFocus
        />
        <div className="flex gap-2 justify-end">
          <button onClick={() => saveEdit(editingId)} className="px-3 py-1 bg-green-500 text-white rounded">Save</button>
          <button onClick={closeModal} className="px-3 py-1 bg-gray-300 rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
