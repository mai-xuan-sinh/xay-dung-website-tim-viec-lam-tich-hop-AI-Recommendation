// src/pages/hr/notifications/HRNotificationList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, CheckCircleIcon, XCircleIcon, SparklesIcon, UserGroupIcon, CalendarIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const HRNotificationList = () => {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockNotifications = [
        { id: 1, type: "quiz", message: "Ứng viên Nguyễn Văn A đã hoàn thành bài quiz cho vị trí Frontend Developer", time: "5 phút trước", read: false },
        { id: 2, type: "application", message: "Có 12 ứng viên mới ứng tuyển vào vị trí Backend Developer", time: "1 giờ trước", read: false },
        { id: 3, type: "interview", message: "Ứng viên Trần Thị B đã xác nhận lịch phỏng vấn ngày 20/03", time: "2 giờ trước", read: true },
        { id: 4, type: "job", message: "Tin tuyển dụng Frontend Developer đã hết hạn", time: "3 giờ trước", read: true },
        { id: 5, type: "quiz", message: "Ứng viên Lê Văn C đạt 92% trong bài quiz Frontend", time: "5 giờ trước", read: true },
        { id: 6, type: "application", message: "Ứng viên mới ứng tuyển vào vị trí UI/UX Designer", time: "1 ngày trước", read: true },
      ];
      setNotifications(mockNotifications);
      setLoading(false);
    }, 500);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'quiz': return <SparklesIcon className="h-5 w-5 text-yellow-500" />;
      case 'application': return <UserGroupIcon className="h-5 w-5 text-blue-500" />;
      case 'interview': return <CalendarIcon className="h-5 w-5 text-purple-500" />;
      case 'job': return <BriefcaseIcon className="h-5 w-5 text-green-500" />;
      default: return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const filteredNotifications = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải thông báo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Thông báo</h1>
            <p className="text-gray-500 mt-1">Cập nhật hoạt động tuyển dụng</p>
          </div>
          <button onClick={markAllAsRead} className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg">
            Đánh dấu đã đọc tất cả
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          {['all', 'quiz', 'application', 'interview', 'job'].map(type => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === type ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {type === 'all' ? 'Tất cả' : type === 'quiz' ? 'Quiz' : type === 'application' ? 'Ứng tuyển' : type === 'interview' ? 'Phỏng vấn' : 'Tin tuyển dụng'}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map(notif => (
            <div key={notif.id} className={`bg-white rounded-xl shadow-sm p-4 transition ${!notif.read ? 'border-l-4 border-blue-500' : ''}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getTypeIcon(notif.type)}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {!notif.read && (
                    <button onClick={() => markAsRead(notif.id)} className="text-xs text-blue-600 hover:underline">
                      Đánh dấu đã đọc
                    </button>
                  )}
                  <button onClick={() => deleteNotification(notif.id)} className="text-gray-400 hover:text-red-500">
                    <XCircleIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <BellIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không có thông báo nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRNotificationList;