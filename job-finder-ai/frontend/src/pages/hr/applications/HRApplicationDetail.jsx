// src/pages/hr/applications/HRApplicationDetail.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeftIcon, EnvelopeIcon, PhoneIcon, MapPinIcon,
  BriefcaseIcon, AcademicCapIcon, SparklesIcon,
  CheckCircleIcon, XCircleIcon, CalendarIcon,
  DocumentTextIcon, UserIcon, ClockIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

const HRApplicationDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState(null);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewData, setInterviewData] = useState({
    date: '',
    time: '',
    location: '',
    meetingLink: '',
    notes: '',
    type: 'offline'
  });

 useEffect(() => {
  setLoading(true);
  setTimeout(() => {
    // Danh sách ứng viên theo ID
    const applicationsData = {
      1: {
        id: 1,
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
      },
      2: {
        id: 2,
        name: "Trần Thị B",
        email: "tranthib@email.com",
        phone: "0987654321",
        address: "456 Lê Duẩn, Thanh Khê, Đà Nẵng",
        appliedDate: "2024-03-14",
        status: "reviewed",
        quizScore: 78,
        matchScore: 88,
        experience: [
          { company: "Axon Active", position: "Backend Developer", startDate: "2020", endDate: "Hiện tại", description: "Phát triển API với Node.js" }
        ],
        education: [
          { school: "Đại học Duy Tân", degree: "Kỹ sư", field: "Công nghệ thông tin", year: "2020", gpa: "3.2/4.0" }
        ],
        skills: ["Node.js", "Express", "MongoDB", "JavaScript"],
        cvUrl: "#",
        coverLetter: "Tôi có 2 năm kinh nghiệm phát triển backend..."
      },
      3: {
        id: 3,
        name: "Lê Văn C",
        email: "levanc@email.com",
        phone: "0905123456",
        address: "789 Hùng Vương, Sơn Trà, Đà Nẵng",
        appliedDate: "2024-03-13",
        status: "interview",
        quizScore: 92,
        matchScore: 95,
        experience: [
          { company: "TMA Solutions", position: "Fullstack Developer", startDate: "2019", endDate: "Hiện tại", description: "Phát triển fullstack với React và Node.js" }
        ],
        education: [
          { school: "Đại học Bách Khoa Đà Nẵng", degree: "Kỹ sư", field: "Công nghệ thông tin", year: "2019", gpa: "3.7/4.0" }
        ],
        skills: ["React", "Node.js", "TypeScript", "MongoDB", "Express"],
        cvUrl: "#",
        coverLetter: "Tôi đam mê phát triển web fullstack..."
      },
      4: {
        id: 4,
        name: "Phạm Thị D",
        email: "phamthid@email.com",
        phone: "0933123456",
        address: "101 Ngô Quyền, Sơn Trà, Đà Nẵng",
        appliedDate: "2024-03-12",
        status: "hired",
        quizScore: 88,
        matchScore: 90,
        experience: [
          { company: "DesignBold", position: "UI/UX Designer", startDate: "2020", endDate: "Hiện tại", description: "Thiết kế giao diện người dùng" }
        ],
        education: [
          { school: "Đại học Kiến trúc", degree: "Cử nhân", field: "Thiết kế đồ họa", year: "2020", gpa: "3.4/4.0" }
        ],
        skills: ["Figma", "Adobe XD", "UI Design", "UX Research"],
        cvUrl: "#",
        coverLetter: "Tôi có kinh nghiệm thiết kế UI/UX cho nhiều dự án..."
      },
      5: {
        id: 5,
        name: "Hoàng Văn E",
        email: "hoangvane@email.com",
        phone: "0977123456",
        address: "202 Điện Biên Phủ, Hải Châu, Đà Nẵng",
        appliedDate: "2024-03-11",
        status: "rejected",
        quizScore: 45,
        matchScore: 52,
        experience: [
          { company: "Startup ABC", position: "Intern Developer", startDate: "2023", endDate: "2024", description: "Hỗ trợ phát triển web" }
        ],
        education: [
          { school: "Cao đẳng FPT", degree: "Cao đẳng", field: "Công nghệ thông tin", year: "2023", gpa: "2.8/4.0" }
        ],
        skills: ["HTML/CSS", "JavaScript"],
        cvUrl: "#",
        coverLetter: "Tôi mới ra trường, mong muốn có cơ hội học hỏi..."
      }
    };

    // Lấy dữ liệu theo id từ URL
    const selectedApplication = applicationsData[id];
    
    if (selectedApplication) {
      setApplication(selectedApplication);
    } else {
      // Nếu không tìm thấy (id > 5), tạo dữ liệu mặc định
      setApplication({
        id: parseInt(id),
        name: `Ứng viên #${id}`,
        email: `unknown${id}@email.com`,
        phone: "Chưa cập nhật",
        address: "Chưa cập nhật",
        appliedDate: new Date().toISOString().split('T')[0],
        status: "pending",
        quizScore: Math.floor(Math.random() * 100),
        matchScore: Math.floor(Math.random() * 100),
        experience: [],
        education: [],
        skills: [],
        cvUrl: "#",
        coverLetter: "Chưa có thông tin chi tiết."
      });
    }
    
    setLoading(false);
  }, 500);
}, [id]); // ← QUAN TRỌNG: giữ [id] ở cuối

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
      reviewed: { text: "Đã xem", color: "bg-blue-100 text-blue-700" },
      interview: { text: "Phỏng vấn", color: "bg-purple-100 text-purple-700" },
      hired: { text: "Đã nhận", color: "bg-green-100 text-green-700" },
      rejected: { text: "Từ chối", color: "bg-red-100 text-red-700" }
    };
    return badges[status] || badges.pending;
  };

  const handleUpdateStatus = (newStatus) => {
    setApplication(prev => ({ ...prev, status: newStatus }));
    const statusText = {
      reviewed: 'Đã xem',
      interview: 'Chờ phỏng vấn',
      hired: 'Đã nhận việc',
      rejected: 'Từ chối'
    };
    alert(`Đã cập nhật trạng thái thành: ${statusText[newStatus] || newStatus}`);
  };

  const handleSendInterview = () => {
    if (!interviewData.date || !interviewData.time) {
      alert('Vui lòng nhập đầy đủ ngày giờ phỏng vấn');
      return;
    }
    setShowInterviewModal(false);
    handleUpdateStatus('interview');
    alert(`Đã gửi lịch phỏng vấn đến ${application.name}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Đang tải thông tin ứng viên...</p>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Không tìm thấy thông tin ứng viên</p>
          <button onClick={() => navigate('/hr/applications')} className="mt-4 text-blue-600 hover:underline">
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  const status = getStatusBadge(application.status);

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
            {application.status === 'pending' && (
              <>
                <button
                  onClick={() => handleUpdateStatus('rejected')}
                  className="px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50"
                >
                  Từ chối
                </button>
                <button
                  onClick={() => setShowInterviewModal(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Duyệt & Gửi lịch PV
                </button>
              </>
            )}
            {application.status === 'reviewed' && (
              <button
                onClick={() => setShowInterviewModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Gửi lịch phỏng vấn
              </button>
            )}
            {application.status === 'interview' && (
              <button
                onClick={() => handleUpdateStatus('hired')}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Xác nhận nhận việc
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  {application.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">{application.name}</h1>
                      <p className="text-gray-500 mt-1">Ứng viên</p>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${status.color}`}>
                      {status.text}
                    </div>
                  </div>
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
                    <span className="text-2xl font-bold text-yellow-600">{application.quizScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-yellow-500 rounded-full" style={{ width: `${application.quizScore}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 flex items-center">
                      <CheckCircleIcon className="h-4 w-4 text-blue-500 mr-1" />
                      Độ phù hợp
                    </span>
                    <span className="text-2xl font-bold text-blue-600">{application.matchScore}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-blue-500 rounded-full" style={{ width: `${application.matchScore}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BriefcaseIcon className="h-5 w-5 text-blue-600 mr-2" />
                Kinh nghiệm làm việc
              </h2>
              <div className="space-y-4">
                {application.experience.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-blue-200 pl-4">
                    <p className="font-semibold text-gray-900">{exp.position}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-400">{exp.startDate} - {exp.endDate}</p>
                    <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
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
                  <p className="text-xs text-gray-400">Tốt nghiệp: {edu.year} • GPA: {edu.gpa}</p>
                </div>
              ))}
            </div>

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

            {/* Cover Letter */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-blue-600 mr-2" />
                Thư giới thiệu
              </h2>
              <p className="text-gray-600 leading-relaxed">{application.coverLetter}</p>
            </div>
          </div>

          {/* Sidebar - Right */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">⚡ Thao tác nhanh</h2>
              <div className="space-y-3">
                <a
                  href={application.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition"
                >
                  <span className="flex items-center space-x-2">
                    <DocumentTextIcon className="h-5 w-5" />
                    <span>Xem CV</span>
                  </span>
                  <span>→</span>
                </a>
                <a
                  href={`mailto:${application.email}`}
                  className="flex items-center justify-between w-full px-4 py-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition"
                >
                  <span className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5" />
                    <span>Gửi email</span>
                  </span>
                  <span>→</span>
                </a>
                <a
                  href={`tel:${application.phone}`}
                  className="flex items-center justify-between w-full px-4 py-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition"
                >
                  <span className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5" />
                    <span>Gọi điện</span>
                  </span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interview Modal */}
      {showInterviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">📅 Gửi lịch phỏng vấn</h3>
              <button onClick={() => setShowInterviewModal(false)} className="text-gray-400 hover:text-gray-600">
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hình thức phỏng vấn</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" value="offline" checked={interviewData.type === 'offline'} onChange={(e) => setInterviewData({...interviewData, type: e.target.value})} />
                    <span>Trực tiếp</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" value="online" checked={interviewData.type === 'online'} onChange={(e) => setInterviewData({...interviewData, type: e.target.value})} />
                    <span>Online</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ngày phỏng vấn *</label>
                <input type="date" value={interviewData.date} onChange={(e) => setInterviewData({...interviewData, date: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giờ phỏng vấn *</label>
                <input type="time" value={interviewData.time} onChange={(e) => setInterviewData({...interviewData, time: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
              </div>

              {interviewData.type === 'offline' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa điểm</label>
                  <textarea rows="2" value={interviewData.location} onChange={(e) => setInterviewData({...interviewData, location: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Số nhà, đường, tòa nhà..." />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link phỏng vấn</label>
                  <input type="url" value={interviewData.meetingLink} onChange={(e) => setInterviewData({...interviewData, meetingLink: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="https://meet.google.com/..." />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ghi chú thêm</label>
                <textarea rows="2" value={interviewData.notes} onChange={(e) => setInterviewData({...interviewData, notes: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="Thông tin thêm cho ứng viên..." />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button onClick={() => setShowInterviewModal(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  Hủy
                </button>
                <button onClick={handleSendInterview} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Gửi lịch phỏng vấn
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRApplicationDetail;