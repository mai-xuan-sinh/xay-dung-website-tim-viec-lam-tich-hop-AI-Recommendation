import React from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CalendarIcon,
  BriefcaseIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const PersonalInfo = ({ user }) => {
  const infoItems = [
    { label: 'Email', value: user?.email, icon: EnvelopeIcon },
    { label: 'Số điện thoại', value: user?.profile?.phone || 'Chưa cập nhật', icon: PhoneIcon },
    { label: 'Địa chỉ', value: user?.profile?.address || 'Chưa cập nhật', icon: MapPinIcon },
    { label: 'Ngày sinh', value: user?.profile?.birthDate || 'Chưa cập nhật', icon: CalendarIcon },
    { label: 'Vị trí mong muốn', value: user?.profile?.title || 'Chưa cập nhật', icon: BriefcaseIcon },
    { label: 'Website/GitHub', value: user?.profile?.website || 'Chưa cập nhật', icon: GlobeAltIcon },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 animate-fadeIn">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Thông tin cá nhân</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {infoItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">{item.label}</p>
                <p className="text-sm text-gray-900">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      {user?.profile?.bio && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 mb-1">Giới thiệu bản thân</p>
          <p className="text-sm text-gray-700">{user.profile.bio}</p>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;