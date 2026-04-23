// src/pages/hr/candidates/HRCandidateSearch.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, SparklesIcon, CheckCircleIcon,
  MapPinIcon, BriefcaseIcon, AcademicCapIcon,
  FunnelIcon, XMarkIcon, EyeIcon
} from '@heroicons/react/24/outline';

const HRCandidateSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);

  // Mock data - sẽ thay bằng API sau
  const mockCandidates = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      avatar: "NA",
      title: "Frontend Developer",
      experience: "3 năm",
      location: "Đà Nẵng",
      education: "Đại học Bách Khoa",
      skills: ["React", "JavaScript", "TypeScript", "HTML/CSS"],
      matchScore: 92,
      available: true
    },
    {
      id: 2,
      name: "Trần Thị B",
      avatar: "TB",
      title: "Backend Developer",
      experience: "2 năm",
      location: "Đà Nẵng",
      education: "Đại học Duy Tân",
      skills: ["Node.js", "Python", "MongoDB", "Express"],
      matchScore: 88,
      available: true
    },
    {
      id: 3,
      name: "Lê Văn C",
      avatar: "LC",
      title: "Fullstack Developer",
      experience: "4 năm",
      location: "Đà Nẵng",
      education: "Đại học Bách Khoa",
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
      matchScore: 95,
      available: false
    },
    {
      id: 4,
      name: "Phạm Thị D",
      avatar: "PD",
      title: "UI/UX Designer",
      experience: "2 năm",
      location: "Đà Nẵng",
      education: "Đại học Kiến trúc",
      skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
      matchScore: 85,
      available: true
    }
  ];

  const addSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      let filtered = [...mockCandidates];
      
      if (searchTerm) {
        filtered = filtered.filter(c => 
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (skills.length > 0) {
        filtered = filtered.filter(c => 
          skills.some(skill => c.skills.includes(skill))
        );
      }
      
      if (experience) {
        const expYears = parseInt(experience);
        filtered = filtered.filter(c => parseInt(c.experience) >= expYears);
      }
      
      if (location) {
        filtered = filtered.filter(c => c.location.toLowerCase().includes(location.toLowerCase()));
      }
      
      setResults(filtered);
      setSearching(false);
    }, 1000);
  };

  const experienceOptions = ['1 năm', '2 năm', '3 năm', '4 năm', '5 năm+'];
  const locationOptions = ['Hải Châu', 'Thanh Khê', 'Sơn Trà', 'Ngũ Hành Sơn', 'Liên Chiểu', 'Cẩm Lệ', 'Hòa Vang'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tìm kiếm ứng viên</h1>
          <p className="text-gray-500 mt-1">Tìm kiếm hồ sơ ứng viên phù hợp với nhu cầu tuyển dụng</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên, vị trí, kỹ năng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Bộ lọc</span>
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800"
            >
              Tìm kiếm
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kỹ năng</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map(skill => (
                      <span key={skill} className="inline-flex items-center space-x-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm">
                        <span>{skill}</span>
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-500">
                          <XMarkIcon className="h-4 w-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={currentSkill}
                      onChange={(e) => setCurrentSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Thêm kỹ năng..."
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <button onClick={addSkill} className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                      Thêm
                    </button>
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kinh nghiệm</label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Tất cả</option>
                    {experienceOptions.map(exp => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Tất cả</option>
                    {locationOptions.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {searching ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Đang tìm kiếm ứng viên...</p>
          </div>
        ) : results.length > 0 ? (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Tìm thấy <span className="font-semibold text-gray-900">{results.length}</span> ứng viên phù hợp
              </p>
            </div>
            <div className="space-y-4">
              {results.map((candidate) => (
                <div key={candidate.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                        {candidate.avatar}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                          {candidate.available && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">Sẵn sàng</span>
                          )}
                        </div>
                        <p className="text-gray-600">{candidate.title}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                          <span className="flex items-center">
                            <BriefcaseIcon className="h-4 w-4 mr-1" />
                            {candidate.experience}
                          </span>
                          <span className="flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {candidate.location}
                          </span>
                          <span className="flex items-center">
                            <AcademicCapIcon className="h-4 w-4 mr-1" />
                            {candidate.education}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {candidate.skills.map((skill, idx) => (
                            <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className="text-center">
                        <div className="flex items-center space-x-1">
                          <SparklesIcon className="h-4 w-4 text-yellow-500" />
                          <span className="text-xs text-gray-500">Độ phù hợp</span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{candidate.matchScore}%</p>
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-1">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${candidate.matchScore}%` }}></div>
                        </div>
                      </div>
                      <Link
                        to={`/hr/candidates/${candidate.id}`}
                        className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        <EyeIcon className="h-4 w-4" />
                        <span>Xem hồ sơ</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : searchTerm || skills.length > 0 || experience || location ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không tìm thấy ứng viên nào phù hợp</p>
            <p className="text-sm text-gray-400 mt-1">Hãy thử thay đổi bộ lọc tìm kiếm</p>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <MagnifyingGlassIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nhập từ khóa để tìm kiếm ứng viên</p>
            <p className="text-sm text-gray-400 mt-1">Tìm kiếm theo kỹ năng, vị trí, kinh nghiệm...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRCandidateSearch;