import React, { useState } from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

const Skills = ({ skills = [], onAddSkill, onRemoveSkill }) => {
  const [newSkill, setNewSkill] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() && onAddSkill) {
      onAddSkill(newSkill.trim());
      setNewSkill('');
      setShowInput(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Kỹ năng</h2>
        <button
          onClick={() => setShowInput(true)}
          className="text-blue-600 text-sm hover:text-blue-700 flex items-center space-x-1"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Thêm kỹ năng</span>
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="inline-flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm"
          >
            <span>{skill}</span>
            {onRemoveSkill && (
              <button
                onClick={() => onRemoveSkill(skill)}
                className="hover:text-red-500 transition-colors"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </span>
        ))}
      </div>
      
      {showInput && (
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            placeholder="Nhập kỹ năng mới..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            autoFocus
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Thêm
          </button>
          <button
            onClick={() => setShowInput(false)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
};

export default Skills;