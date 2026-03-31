// src/pages/support/components/ContactChannels.jsx
import React from 'react';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  ChatBubbleLeftRightIcon, 
  ChatBubbleLeftIcon,
  GlobeAltIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const ContactChannels = () => {
  const channels = [
    {
      icon: PhoneIcon,
      title: 'Hotline',
      description: 'Hỗ trợ khẩn cấp 24/7',
      contact: '1900 1234',
      action: 'tel:19001234',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      description: 'Phản hồi trong 24h',
      contact: 'support@danangwork.vn',
      action: 'mailto:support@danangwork.vn',
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Chat trực tuyến',
      description: 'Hỗ trợ tức thì',
      contact: 'Nhấn để chat',
      action: '#',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: ChatBubbleLeftIcon,
      title: 'Zalo Official',
      description: 'Kết nối nhanh',
      contact: 'zalo.me/danangwork',
      action: 'https://zalo.me/danangwork',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: GlobeAltIcon,
      title: 'Facebook Messenger',
      description: 'Nhắn tin qua Fanpage',
      contact: 'm.me/danangwork',
      action: 'https://m.me/danangwork',
      color: 'from-blue-500 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: MapPinIcon,
      title: 'Văn phòng',
      description: 'Đến trực tiếp',
      contact: '123 Nguyễn Văn Linh, Đà Nẵng',
      action: '#',
      color: 'from-gray-500 to-gray-700',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Các kênh hỗ trợ
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Chọn kênh liên hệ phù hợp nhất với bạn, chúng tôi luôn sẵn sàng hỗ trợ
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel, idx) => {
          const Icon = channel.icon;
          return (
            <a
              key={idx}
              href={channel.action}
              target={channel.action.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-transparent"
            >
              <div className={`w-14 h-14 ${channel.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`h-7 w-7 ${channel.textColor}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{channel.title}</h3>
              <p className="text-sm text-gray-500 mb-3">{channel.description}</p>
              <p className={`font-semibold ${channel.textColor} group-hover:underline`}>{channel.contact}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactChannels;