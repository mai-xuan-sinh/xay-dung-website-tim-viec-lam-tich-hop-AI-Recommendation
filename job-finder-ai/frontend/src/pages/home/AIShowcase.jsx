// src/pages/home/AIShowcase.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, ChartBarIcon, DocumentTextIcon, 
  ArrowRightIcon, MapPinIcon, CurrencyDollarIcon,
  XMarkIcon, CheckCircleIcon, MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { getRecommendationsBySkills, getPopularJobs, calculateMatchScore } from '../../services/aiRecommendation';
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../data/jobs';

const patternSvg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

// ========== MAPPING TỪ KHÓA SANG CATEGORY ==========
const mapKeywordToCategory = (keyword) => {
  const keywordLower = keyword.toLowerCase().trim();
  
  const categoryMap = {
    // Nhà hàng - Ăn uống
    'nhà hàng': 'tourism',
    'restaurant': 'tourism',
    'ăn uống': 'tourism',
    'phục vụ': 'tourism',
    'bàn': 'tourism',
    'order': 'tourism',
    
    // Khách sạn - Lưu trú
    'khách sạn': 'tourism',
    'hotel': 'tourism',
    'resort': 'tourism',
    'lễ tân': 'tourism',
    'buồng phòng': 'tourism',
    'bellman': 'tourism',
    'tạp vụ khách sạn': 'tourism',
    
    // Du lịch - Tour
    'du lịch': 'tourism',
    'tour': 'tourism',
    'hướng dẫn viên': 'tourism',
    'travel': 'tourism',
    
    // Spa
    'spa': 'tourism',
    'massage': 'tourism',
    'chăm sóc da': 'tourism',
    
    // IT
    'it': 'it',
    'công nghệ': 'it',
    'cntt': 'it',
    'developer': 'it',
    'lập trình': 'it',
    'react': 'it',
    'javascript': 'it',
    'python': 'it',
    'java': 'it',
    'node': 'it',
    'frontend': 'it',
    'backend': 'it',
    'fullstack': 'it',
    
    // Kinh doanh
    'kinh doanh': 'business',
    'business': 'business',
    'bán hàng': 'business',
    'sales': 'business',
    'telesales': 'business',
    'marketing': 'business',
    
    // Xây dựng
    'xây dựng': 'construction',
    'construction': 'construction',
    'thợ xây': 'construction',
    'kỹ sư xây dựng': 'construction',
    
    // Dịch vụ
    'dịch vụ': 'service',
    'service': 'service',
    'tạp vụ': 'service',
    'bảo vệ': 'service',
    'shipper': 'service',
    'giao hàng': 'service'
  };
  
  // Kiểm tra từ khóa chính xác
  if (categoryMap[keywordLower]) {
    return categoryMap[keywordLower];
  }
  
  // Kiểm tra từ khóa chứa trong map
  for (const [key, value] of Object.entries(categoryMap)) {
    if (keywordLower.includes(key)) {
      return value;
    }
  }
  
  return null;
};

const AIShowcase = () => {
  const { userSkills, isAuthenticated, updateUserSkills } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [popularJobs, setPopularJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('recommend');

  const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];

  useEffect(() => {
    // Load popular jobs
    setPopularJobs(getPopularJobs(allJobs, 6));
    
    // Nếu user đã đăng nhập và có kỹ năng, tự động gợi ý
    if (isAuthenticated() && userSkills && userSkills.length > 0) {
      loadRecommendations(userSkills);
      setShowResults(true);
    }
  }, []);

  const loadRecommendations = (skills) => {
    setLoading(true);
    setTimeout(() => {
      const recs = getRecommendationsBySkills(skills, allJobs, 6, 30);
      setRecommendations(recs);
      setLoading(false);
    }, 300);
  };

  const handleSearchBySkills = () => {
    if (!skillInput.trim()) return;
    
    const searchText = skillInput.trim().toLowerCase();
    
    // Kiểm tra xem có phải từ khóa ngành nghề không
    const mappedCategory = mapKeywordToCategory(searchText);
    
    if (mappedCategory) {
      // Nếu là từ khóa ngành, lấy tất cả jobs trong ngành đó
      setLoading(true);
      setTimeout(() => {
        const categoryJobs = allJobs.filter(job => job.category === mappedCategory);
        // Gán matchScore mặc định là 85 cho các job trong ngành
        const jobsWithScore = categoryJobs.map(job => ({ ...job, matchScore: 85 }));
        setRecommendations(jobsWithScore);
        setLoading(false);
        setShowResults(true);
      }, 300);
      return;
    }
    
    // Xử lý bình thường: tách kỹ năng từ dấu phẩy
    const skillsArray = searchText.split(',').map(s => s.trim()).filter(s => s);
    if (skillsArray.length > 0) {
      loadRecommendations(skillsArray);
      setShowResults(true);
      
      if (isAuthenticated() && updateUserSkills) {
        updateUserSkills(skillsArray);
      }
    } else {
      // Nếu không có dấu phẩy, coi như một kỹ năng duy nhất
      loadRecommendations([searchText]);
      setShowResults(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchBySkills();
    }
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 70) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const features = [
    { icon: SparklesIcon, title: "Gợi ý siêu thông minh", desc: "AI phân tích kỹ năng của bạn để đề xuất việc làm phù hợp nhất", color: "blue" },
    { icon: ChartBarIcon, title: "Phân tích thị trường", desc: "Cập nhật xu hướng tuyển dụng và kỹ năng hot theo thời gian thực", color: "purple" },
    { icon: DocumentTextIcon, title: "Tối ưu CV thông minh", desc: "AI đánh giá và gợi ý cải thiện CV, tăng cơ hội trúng tuyển", color: "green" }
  ];

  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${patternSvg})` }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white text-sm">
            <SparklesIcon className="h-4 w-4 text-yellow-400" />
            Công nghệ AI tiên tiến
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-6 mb-4">
            Trải nghiệm AI
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              thông minh vượt trội
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Công nghệ AI giúp bạn tìm việc nhanh hơn, chính xác hơn và hiệu quả hơn
          </p>
        </div>

        {/* AI Search Box */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-1 border border-white/20">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-yellow-400" />
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isAuthenticated && userSkills?.length > 0 
                    ? `Kỹ năng của bạn: ${userSkills.join(', ')}` 
                    : "Nhập kỹ năng hoặc ngành nghề (VD: nhà hàng, khách sạn, React...)"}
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-white placeholder:text-gray-400 rounded-xl focus:outline-none"
                />
              </div>
              <button
                onClick={handleSearchBySkills}
                disabled={loading}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50 whitespace-nowrap"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Đang phân tích...
                  </div>
                ) : (
                  'Gợi ý việc làm'
                )}
              </button>
            </div>
          </div>
          <p className="text-gray-400 text-sm text-center mt-3">
            💡 Ví dụ: "nhà hàng", "khách sạn", "React", "Python", "kinh doanh", "xây dựng", "dịch vụ"
          </p>
        </div>

        {/* Kết quả gợi ý */}
        {showResults && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab('recommend')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'recommend'
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🎯 Gợi ý cho bạn
                </button>
                <button
                  onClick={() => setActiveTab('popular')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeTab === 'popular'
                      ? 'bg-white/20 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🔥 Việc làm phổ biến
                </button>
              </div>
              {activeTab === 'recommend' && recommendations.length > 0 && (
                <span className="text-sm text-gray-400">
                  {recommendations.length} việc làm phù hợp
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeTab === 'recommend' ? (
                loading ? (
                  [...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 animate-pulse">
                      <div className="h-5 bg-white/20 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-white/20 rounded w-1/2 mb-4"></div>
                      <div className="h-16 bg-white/20 rounded mb-3"></div>
                      <div className="h-4 bg-white/20 rounded w-1/3"></div>
                    </div>
                  ))
                ) : recommendations.length > 0 ? (
                  recommendations.map((job) => (
                    <Link
                      key={job.id}
                      to={`/jobs/${job.id}`}
                      className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                            {job.title}
                          </h3>
                          <p className="text-sm text-gray-400">{job.company}</p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreBg(job.matchScore)} ${getScoreColor(job.matchScore)}`}>
                          {job.matchScore}% phù hợp
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPinIcon className="h-3 w-3" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <CurrencyDollarIcon className="h-3 w-3 text-green-400" />
                          <span className="text-green-400">{job.salary}</span>
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {job.skills?.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            job.matchScore >= 70 ? 'bg-green-500' : job.matchScore >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${job.matchScore}%` }}
                        ></div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <SparklesIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">Chưa có gợi ý nào. Hãy nhập kỹ năng hoặc ngành nghề của bạn!</p>
                  </div>
                )
              ) : (
                popularJobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/jobs/${job.id}`}
                    className="group bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-blue-400 transition">
                          {job.title}
                        </h3>
                        <p className="text-sm text-gray-400">{job.company}</p>
                      </div>
                      {job.hot && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded-full">
                          🔥 Hot
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <MapPinIcon className="h-3 w-3" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <CurrencyDollarIcon className="h-3 w-3 text-green-400" />
                        <span className="text-green-400">{job.salary}</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {job.skills?.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}

        {/* Features Grid - Chỉ hiển thị khi chưa có kết quả */}
        {!showResults && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => {
              const Icon = f.icon;
              const colorMap = {
                blue: "from-blue-500/20 to-blue-600/20",
                purple: "from-purple-500/20 to-purple-600/20",
                green: "from-green-500/20 to-green-600/20"
              };
              const textColorMap = {
                blue: "text-blue-400",
                purple: "text-purple-400",
                green: "text-green-400"
              };
              return (
                <div key={i} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[f.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                    <Icon className={`h-7 w-7 ${textColorMap[f.color]}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        {!isAuthenticated() && !showResults && (
          <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 text-center">
            <p className="text-white font-semibold mb-2">🚀 Đăng ký ngay để nhận gợi ý việc làm cá nhân hóa!</p>
            <p className="text-gray-400 text-sm mb-4">AI sẽ phân tích kỹ năng và kinh nghiệm của bạn để đề xuất việc làm phù hợp nhất</p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition"
            >
              Đăng ký ngay
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIShowcase;