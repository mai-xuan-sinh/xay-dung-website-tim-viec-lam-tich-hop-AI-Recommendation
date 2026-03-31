import React from 'react';
import { BriefcaseIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

const RoleSelector = ({ selectedRole, onChange }) => {
  const roles = [
    { 
      id: 'jobseeker', 
      label: 'Người tìm việc', 
      icon: BriefcaseIcon, 
      description: 'Tìm kiếm cơ hội việc làm phù hợp',
      color: 'blue'
    },
    { 
      id: 'employer', 
      label: 'Nhà tuyển dụng', 
      icon: BuildingOfficeIcon, 
      description: 'Đăng tin tuyển dụng và tìm kiếm ứng viên',
      color: 'purple'
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.id;
        const isJobseeker = role.id === 'jobseeker';
        
        return (
          <label
            key={role.id}
            className={`relative flex items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
              isSelected 
                ? isJobseeker 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-purple-600 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="role"
              value={role.id}
              checked={isSelected}
              onChange={() => onChange(role.id)}
              className="sr-only"
            />
            <div className="text-center">
              <Icon className={`h-8 w-8 mx-auto mb-2 ${
                isSelected 
                  ? isJobseeker ? 'text-blue-600' : 'text-purple-600'
                  : 'text-gray-400'
              }`} />
              <span className={`text-sm font-medium block ${
                isSelected 
                  ? isJobseeker ? 'text-blue-600' : 'text-purple-600'
                  : 'text-gray-700'
              }`}>
                {role.label}
              </span>
              <span className="text-xs text-gray-500 mt-1 block">{role.description}</span>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default RoleSelector;