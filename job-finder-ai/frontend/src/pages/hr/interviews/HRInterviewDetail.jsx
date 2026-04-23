// src/pages/hr/interviews/HRInterviewDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeftIcon, CalendarIcon, ClockIcon, MapPinIcon, VideoCameraIcon,
  UserIcon, BriefcaseIcon, SparklesIcon, CheckCircleIcon,
  EnvelopeIcon, PhoneIcon, ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

const HRInterviewDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockInterview = {
        id: parseInt(id),
        candidateName: "Nguyễn Văn A",
        candidateEmail: "nguyenvana@email.com",
        candidatePhone: "0912345678",
        jobTitle: "Frontend Developer",
        date: "2024-03-20",
        time: "14:00",
        location: "Văn phòng FPT Software - Tầng 5, Tòa nhà Indochina",
        type: "offline",
        status: "scheduled",
        quizScore: 85,
        matchScore: 92,
        notes: "Mang theo CV bản cứng và portfolio",
        feedback: "",
        result: null
      };
      setInterview(mockInterview);
      setLoading(false);
    }, 500);
  }, [id]);

  const updateStatus = (newStatus) => {
    setInterview(prev => ({ ...prev, status: newStatus }));
    alert(`Đã cập nhật trạng thái thành: ${newStatus}`);
  };

  const submitFeedback = (result, feedback) => {
    setInterview(prev => ({ ...prev, result, feedback }));
    alert('Đã lưu đánh giá phỏng vấn!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate('/hr/interviews')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6">
          <ArrowLeftIcon className="h-5 w-5" />
          <span>Quay lại danh sách</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-6">
            <h1 className="text-2xl font-bold text-white">Chi tiết buổi phỏng vấn</h1>
            <p className="text-purple-100 mt-1">Thông tin chi tiết về lịch phỏng vấn</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Candidate Info */}
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-100">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {interview.candidateName.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{interview.candidateName}</h2>
                <p className="text-gray-500">{interview.jobTitle}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <span className="flex items-center text-gray-500">
                    <EnvelopeIcon className="h-4 w-4 mr-1" /> {interview.candidateEmail}
                  </span>
                  <span className="flex items-center text-gray-500">
                    <PhoneIcon className="h-4 w-4 mr-1" /> {interview.candidatePhone}
                  </span>
                </div>
              </div>
            </div>

            {/* Interview Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CalendarIcon className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Ngày phỏng vấn</p>
                  <p className="font-medium">{interview.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <ClockIcon className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Giờ phỏng vấn</p>
                  <p className="font-medium">{interview.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                {interview.type === 'online' ? (
                  <VideoCameraIcon className="h-5 w-5 text-purple-500" />
                ) : (
                  <MapPinIcon className="h-5 w-5 text-purple-500" />
                )}
                <div>
                  <p className="text-xs text-gray-500">Hình thức</p>
                  <p className="font-medium">{interview.type === 'online' ? 'Online' : 'Trực tiếp'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircleIcon className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-xs text-gray-500">Trạng thái</p>
                  <p className={`font-medium ${
                    interview.status === 'scheduled' ? 'text-yellow-600' :
                    interview.status === 'confirmed' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {interview.status === 'scheduled' ? 'Đã lên lịch' :
                     interview.status === 'confirmed' ? 'Đã xác nhận' : 'Đã hoàn thành'}
                  </p>
                </div>
              </div>
            </div>

            {/* Location / Meeting Link */}
            <div className="pb-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-2">📍 Địa điểm</h3>
              {interview.type === 'online' ? (
                <a href={interview.location} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {interview.location}
                </a>
              ) : (
                <p className="text-gray-600">{interview.location}</p>
              )}
            </div>

            {/* Notes */}
            {interview.notes && (
              <div className="pb-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-2">📝 Ghi chú</h3>
                <p className="text-gray-600">{interview.notes}</p>
              </div>
            )}

            {/* Scores */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-100">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <SparklesIcon className="h-4 w-4 text-yellow-500 mr-1" /> Điểm Quiz
                </p>
                <p className="text-2xl font-bold text-yellow-600">{interview.quizScore}%</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-1" /> Độ phù hợp
                </p>
                <p className="text-2xl font-bold text-blue-600">{interview.matchScore}%</p>
              </div>
            </div>

            {/* Actions */}
            {interview.status !== 'completed' && (
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => updateStatus('confirmed')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Xác nhận lịch
                </button>
                <button
                  onClick={() => updateStatus('scheduled')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Chưa xác nhận
                </button>
              </div>
            )}

            {/* Feedback Form */}
            {interview.status === 'completed' && !interview.feedback && (
              <div className="pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">📝 Đánh giá kết quả</h3>
                <textarea
                  rows="3"
                  placeholder="Nhập đánh giá về ứng viên..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 mb-3"
                />
                <div className="flex space-x-3">
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Đậu
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Rớt
                  </button>
                </div>
              </div>
            )}

            {/* Feedback Result */}
            {interview.feedback && (
              <div className="pt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📋 Kết quả phỏng vấn</h3>
                <p className={`text-sm font-medium mb-2 ${interview.result === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                  {interview.result === 'passed' ? '✓ ĐẬU' : '✗ RỚT'}
                </p>
                <p className="text-gray-600 text-sm">{interview.feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRInterviewDetail;