// src/pages/hr/applications/HRApplicationReview.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, UserIcon, EnvelopeIcon, PhoneIcon, 
  MapPinIcon, BriefcaseIcon, AcademicCapIcon, 
  SparklesIcon, CheckCircleIcon, XCircleIcon,
  DocumentTextIcon, CalendarIcon, ClockIcon
} from '@heroicons/react/24/outline';

const HRApplicationReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState([]);
  const [status, setStatus] = useState('pending');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setApplication({
        id: parseInt(id),
        name: "Nguyễn Văn A",
        email: "nguyenvana@email.com",
        phone: "0912345678",
        address: "123 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
        appliedDate: "2024-03-15",
        status: "pending",
        quizScore: 85,
        matchScore: 92,
        experience: [
          { company: "FPT Software", position: "Frontend Developer", startDate: "2021", endDate: "Hiện tại", description: "Phát triển giao diện người dùng với ReactJS" }
        ],
        education: [
          { school: "Đại học Bách Khoa Đà Nẵng", degree: "Kỹ sư", field: "Công nghệ thông tin", year: "2019", gpa: "3.5/4.0" }
        ],
        skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Git", "Redux"],
        cvUrl: "#",
        coverLetter: "Tôi rất quan tâm đến vị trí Frontend Developer tại công ty..."
      });
      
      setQuizAnswers([
        { question: "ReactJS sử dụng loại kiến trúc nào?", answer: "Component-based", correct: true, points: 1 },
        { question: "Hook nào dùng để quản lý state trong React?", answer: "useState", correct: true, points: 1 },
        { question: "Redux dùng để làm gì?", answer: "Quản lý state toàn cục", correct: true, points: 1 },
        { question: "JSX là gì?", answer: "Cú pháp mở rộng của JavaScript", correct: true, points: 1 },
        { question: "useEffect dùng để làm gì?", answer: "Xử lý side effects", correct: false, points: 0 }
      ]);
      
      setLoading(false);
    }, 500);
  }, [id]);

  const handleApprove = () => {
    alert(`Đã duyệt hồ sơ của ${application.name} và gửi lịch phỏng vấn!`);
    navigate('/hr/applications');
  };

  const handleReject = () => {
    alert(`Đã từ chối hồ sơ của ${application.name}`);
    navigate('/hr/applications');
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/hr/applications')} className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Quay lại danh sách</span>
          </button>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleReject}
              className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
            >
              Từ chối
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Duyệt & Gửi lịch PV
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {application.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900">{application.name}</h1>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>{application.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{application.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPinIcon className="h-4 w-4" />
                      <span>{application.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CalendarIcon className="h-4 w-4" />
                      <span>Ứng tuyển: {application.appliedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scores */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Đánh giá ứng viên</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 flex items-center">
                      <SparklesIcon className="h-4 w-4 text-yellow-500 mr-1" />
                      Điểm Quiz
                    </span>
                    <span className={`text-2xl font-bold ${getScoreColor(application.quizScore)}`}>
                      {application.quizScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${application.quizScore}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-1" />
                      Độ phù hợp (AI)
                    </span>
                    <span className={`text-2xl font-bold ${getScoreColor(application.matchScore)}`}>
                      {application.matchScore}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${application.matchScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Answers */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Chi tiết bài Quiz</h2>
              <div className="space-y-3">
                {quizAnswers.map((q, idx) => (
                  <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Câu {idx + 1}: {q.question}</p>
                      <p className="text-sm text-gray-600 mt-1">Trả lời: {q.answer}</p>
                    </div>
                    {q.correct ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  📊 Tổng điểm: {application.quizScore}% ({quizAnswers.filter(a => a.correct).length}/{quizAnswers.length} câu đúng)
                </p>
              </div>
            </div>

            {/* Cover Letter */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
                Thư giới thiệu
              </h2>
              <p className="text-gray-600 leading-relaxed">{application.coverLetter}</p>
            </div>

            {/* HR Notes */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">📝 Ghi chú</h2>
              <textarea
                rows="4"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Nhập ghi chú về ứng viên này..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">🛠️ Kỹ năng</h2>
              <div className="flex flex-wrap gap-2">
                {application.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-2" />
                Kinh nghiệm
              </h2>
              {application.experience.map((exp, idx) => (
                <div key={idx} className="mb-3 last:mb-0">
                  <p className="font-semibold text-gray-900">{exp.position}</p>
                  <p className="text-sm text-gray-600">{exp.company}</p>
                  <p className="text-xs text-gray-400">{exp.startDate} - {exp.endDate}</p>
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AcademicCapIcon className="h-5 w-5 text-blue-600 mr-2" />
                Học vấn
              </h2>
              {application.education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-semibold text-gray-900">{edu.school}</p>
                  <p className="text-sm text-gray-600">{edu.degree} - {edu.field}</p>
                  <p className="text-xs text-gray-400">Tốt nghiệp: {edu.year}</p>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">⚡ Quyết định</h2>
              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  <CheckCircleIcon className="h-5 w-5" />
                  Duyệt & Gửi lịch PV
                </button>
                <button
                  onClick={handleReject}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition"
                >
                  <XCircleIcon className="h-5 w-5" />
                  Từ chối
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRApplicationReview;