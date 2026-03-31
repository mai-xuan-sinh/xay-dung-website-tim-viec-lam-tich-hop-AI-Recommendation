import React from 'react';
import { 
  UserIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  CodeBracketIcon,
  DocumentTextIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

const ProfileTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'info', label: 'Thông tin cá nhân', icon: UserIcon },
    { id: 'experience', label: 'Kinh nghiệm', icon: BriefcaseIcon },
    { id: 'education', label: 'Học vấn', icon: AcademicCapIcon },
    { id: 'skills', label: 'Kỹ năng', icon: CodeBracketIcon },
    { id: 'applications', label: 'Đơn ứng tuyển', icon: DocumentTextIcon },
    { id: 'saved', label: 'Việc đã lưu', icon: HeartIcon },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm mb-6 overflow-x-auto">
      <div className="flex border-b border-gray-100 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileTabs;