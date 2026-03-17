import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  BriefcaseIcon,
  ChartBarIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline';
import api from '../services/api';

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    applications: 0
  });

  useEffect(() => {
    fetchFeaturedJobs();
    fetchStats();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await api.get('/jobs/featured');
      setFeaturedJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/jobs?search=${searchTerm}&location=${location}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Tìm việc làm phù hợp với bạn
          </h1>
          <p className="text-xl text-center mb-10 text-blue-100">
            Với sự hỗ trợ của AI, chúng tôi giúp bạn tìm được công việc mơ ước
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Vị trí, kỹ năng, công ty..."
                  className="w-full pl-10 pr-3 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-1 relative">
                <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Địa điểm (VD: Hà Nội, Hồ Chí Minh...)"
                  className="w-full pl-10 pr-3 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.jobs}+</div>
              <div className="text-blue-200">Việc làm</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.companies}+</div>
              <div className="text-blue-200">Công ty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.applications}+</div>
              <div className="text-blue-200">Ứng viên</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Jobs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Việc làm nổi bật
          </h2>
          <Link 
            to="/jobs" 
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Xem tất cả →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Đang tải việc làm...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Link
                key={job._id}
                to={`/jobs/${job._id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={job.company?.logo || 'https://via.placeholder.com/50'}
                    alt={job.company?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 mb-2">{job.company?.name}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                      {job.salary?.min?.toLocaleString()} - {job.salary?.max?.toLocaleString()} {job.salary?.currency}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* AI Features */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Tính năng thông minh với AI
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Công nghệ AI giúp bạn tìm việc nhanh hơn, phù hợp hơn và hiệu quả hơn
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gợi ý thông minh</h3>
              <p className="text-gray-600">
                AI phân tích kỹ năng và kinh nghiệm để gợi ý việc làm phù hợp nhất với bạn
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phân tích thị trường</h3>
              <p className="text-gray-600">
                Cập nhật xu hướng tuyển dụng, mức lương theo ngành và kỹ năng hot
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tối ưu CV</h3>
              <p className="text-gray-600">
                AI gợi ý cải thiện CV để tăng cơ hội trúng tuyển lên đến 40%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sẵn sàng tìm công việc mơ ước?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Hàng ngàn cơ hội việc làm đang chờ đón bạn
          </p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition inline-block"
          >
            Đăng ký ngay - Miễn phí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;