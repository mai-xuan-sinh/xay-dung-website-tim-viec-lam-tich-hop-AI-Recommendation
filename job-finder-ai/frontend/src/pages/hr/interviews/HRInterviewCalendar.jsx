// src/pages/hr/interviews/HRInterviewCalendar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeftIcon, ChevronRightIcon, CalendarIcon,
  ClockIcon, MapPinIcon, VideoCameraIcon
} from '@heroicons/react/24/outline';

const HRInterviewCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockInterviews = [
        { id: 1, candidateName: "Nguyễn Văn A", jobTitle: "Frontend Developer", date: "2024-03-20", time: "14:00", type: "offline" },
        { id: 2, candidateName: "Trần Thị B", jobTitle: "Backend Developer", date: "2024-03-20", time: "15:30", type: "online" },
        { id: 3, candidateName: "Lê Văn C", jobTitle: "Fullstack Developer", date: "2024-03-21", time: "09:00", type: "offline" },
        { id: 4, candidateName: "Phạm Thị D", jobTitle: "UI/UX Designer", date: "2024-03-22", time: "10:00", type: "online" },
      ];
      setInterviews(mockInterviews);
      setLoading(false);
    }, 500);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getInterviewsByDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return interviews.filter(i => i.date === dateStr);
  };

  const changeMonth = (delta) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta, 1));
  };

  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải lịch...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Lịch phỏng vấn</h1>
            <p className="text-gray-500 mt-1">Xem lịch phỏng vấn theo tháng</p>
          </div>
          <Link to="/hr/interviews" className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Xem danh sách
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-gray-900">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h2>
            <button onClick={() => changeMonth(1)} className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
              <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
            {getDaysInMonth(currentMonth).map((date, idx) => {
              const dayInterviews = getInterviewsByDate(date);
              const isToday = date.toDateString() === new Date().toDateString();
              const hasInterviews = dayInterviews.length > 0;
              return (
                <div
                  key={idx}
                  className={`bg-white p-3 min-h-[120px] cursor-pointer hover:bg-blue-50 transition
                    ${isToday ? 'bg-blue-50' : ''}
                    ${hasInterviews ? 'ring-1 ring-blue-200' : ''}`}
                  onClick={() => setSelectedDate(selectedDate?.toDateString() === date.toDateString() ? null : date)}
                >
                  <p className={`text-sm ${isToday ? 'font-bold text-blue-600' : 'text-gray-500'}`}>
                    {date.getDate()}
                  </p>
                  <div className="mt-2 space-y-1">
                    {dayInterviews.slice(0, 2).map(interview => (
                      <Link
                        key={interview.id}
                        to={`/hr/interviews/${interview.id}`}
                        className="block text-xs p-1.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        <div className="flex items-center space-x-1">
                          {interview.type === 'online' ? (
                            <VideoCameraIcon className="h-3 w-3" />
                          ) : (
                            <MapPinIcon className="h-3 w-3" />
                          )}
                          <span className="truncate">{interview.candidateName}</span>
                        </div>
                      </Link>
                    ))}
                    {dayInterviews.length > 2 && (
                      <span className="text-xs text-gray-400">+{dayInterviews.length - 2}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details */}
        {selectedDate && (
          <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Lịch phỏng vấn ngày {selectedDate.toLocaleDateString('vi-VN')}
            </h3>
            <div className="space-y-3">
              {getInterviewsByDate(selectedDate).map(interview => (
                <Link
                  key={interview.id}
                  to={`/hr/interviews/${interview.id}`}
                  className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50"
                >
                  <div>
                    <p className="font-semibold text-gray-900">{interview.candidateName}</p>
                    <p className="text-sm text-gray-500">{interview.jobTitle}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {interview.time}
                    </span>
                    {interview.type === 'online' ? (
                      <VideoCameraIcon className="h-5 w-5 text-purple-500" />
                    ) : (
                      <MapPinIcon className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRInterviewCalendar;