import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  MapPinIcon, 
  CurrencyDollarIcon,
  BriefcaseIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import api from '../services/api';
import { 
  itJobsCount, 
  tourismJobsCount, 
  businessJobsCount,
  constructionJobsCount,
  serviceJobsCount,
  itJobs,
  tourismJobs,
  businessJobs,
  constructionJobs,
  serviceJobs
} from '../data/jobs';

// Import hình ảnh các quận (bạn cần thêm các file ảnh vào thư mục assets)
import haiChauImg from '../assets/quan-hai-chau.png';
import thanhKheImg from '../assets/quan-thanh-khe.png';
import sonTraImg from '../assets/quan-son-tra.png';
import nguHanhSonImg from '../assets/quan-ngu-hanh-son.png';
import lienChieuImg from '../assets/quan-lien-chieu.png';
import camLeImg from '../assets/quan-cam-le.png';
import hoaVangImg from '../assets/huyen-hoa-vang.png';

const HomePage = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hàm lấy danh sách công ty duy nhất từ tất cả jobs
  const getAllUniqueCompanies = () => {
    const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
    const uniqueCompanies = [...new Map(allJobs.map(job => [job.company, job])).values()];
    return uniqueCompanies;
  };
  
  // Tính tổng số việc làm thực tế
  const totalJobs = itJobs.length + tourismJobs.length + businessJobs.length + 
                     constructionJobs.length + serviceJobs.length;
  
  // Tính số công ty duy nhất
  const totalCompanies = getAllUniqueCompanies().length;
  
  const [stats, setStats] = useState({
    jobs: totalJobs,
    companies: totalCompanies,
    jobsByCategory: {
      it: itJobs.length,
      tourism: tourismJobs.length,
      business: businessJobs.length,
      construction: constructionJobs.length,
      service: serviceJobs.length
    }
  });

  // Cập nhật stats khi component render (sẽ tự động cập nhật khi dữ liệu thay đổi)
  useEffect(() => {
    const newTotalJobs = itJobs.length + tourismJobs.length + businessJobs.length + 
                         constructionJobs.length + serviceJobs.length;
    const newCompanies = getAllUniqueCompanies().length;
    
    setStats({
      jobs: newTotalJobs,
      companies: newCompanies,
      jobsByCategory: {
        it: itJobs.length,
        tourism: tourismJobs.length,
        business: businessJobs.length,
        construction: constructionJobs.length,
        service: serviceJobs.length
      }
    });
  }, [itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs]);

  // Danh sách các slide với hình ảnh các quận
  const slides = [
    {
      image: haiChauImg,
      title: "Quận Hải Châu",
    },
    {
      image: thanhKheImg,
      title: "Quận Thanh Khê",
    },
    {
      image: sonTraImg,
      title: "Quận Sơn Trà",
    },
    {
      image: nguHanhSonImg,
      title: "Quận Ngũ Hành Sơn",
    },
    {
      image: lienChieuImg,
      title: "Quận Liên Chiểu",
    },
    {
      image: camLeImg,
      title: "Quận Cẩm Lệ",
    },
    {
      image: hoaVangImg,
      title: "Huyện Hòa Vang",
    }
  ];

  // Tự động chuyển slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchFeaturedJobs();
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

  const handleSearch = (e) => {
    e.preventDefault();
    window.location.href = `/jobs?search=${searchTerm}&location=${location}`;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section với Slideshow */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Slideshow Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              {/* Overlay nhẹ để text dễ đọc */}
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            {/* Title ở góc phải trên banner */}
            <div className="absolute top-10 right-10 z-10">
              <h3 className="text-4xl font-bold text-white drop-shadow-lg text-right">
                {slide.title}
              </h3>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Search Form - Nổi trên slideshow */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="max-w-4xl w-full mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-white drop-shadow-lg">
              Tìm việc làm tại Đà Nẵng
            </h1>
            <p className="text-xl text-center mb-10 text-blue-100 drop-shadow">
              Kết nối cơ hội việc làm chất lượng tại thành phố biển Đà Nẵng
            </p>

            <form onSubmit={handleSearch} className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-2xl">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Vị trí, kỹ năng, công ty..."
                    className="w-full pl-10 pr-3 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 border-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Địa điểm (VD: Hải Châu, Ngũ Hành Sơn...)"
                    className="w-full pl-10 pr-3 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-300 border-0"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  Tìm kiếm
                </button>
              </div>
            </form>

            {/* Stats - Hiển thị số thực tế từ dữ liệu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mt-12">
              <div className="text-center bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                <div className="text-4xl font-bold text-white">{stats.jobs}</div>
                <div className="text-blue-200 font-medium mt-2 flex items-center justify-center">
                  <BriefcaseIcon className="h-5 w-5 mr-2" />
                  Việc làm tại Đà Nẵng
                </div>
                <p className="text-sm text-yellow-300 mt-1">{stats.jobs}+ việc làm</p>
              </div>
              <div className="text-center bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                <div className="text-4xl font-bold text-white">{stats.companies}</div>
                <div className="text-blue-200 font-medium mt-2 flex items-center justify-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-2" />
                  Công ty tuyển dụng
                </div>
                <p className="text-sm text-yellow-300 mt-1">{stats.companies}+ công ty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Categories - Đà Nẵng */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Việc làm phổ biến tại Đà Nẵng
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá cơ hội việc làm trong các ngành nghề hot nhất tại thành phố biển Đà Nẵng
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* IT - Công nghệ thông tin */}
          <Link
            to="/jobs?category=it&location=Đà Nẵng"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-blue-100 transition-colors"></div>
            <div className="relative z-10">
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">💻</span>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">IT</h3>
              <p className="text-sm text-gray-500">
                {stats.jobsByCategory.it} việc làm
              </p>
              <span className="inline-block mt-3 text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Xem việc làm →
              </span>
            </div>
          </Link>

          {/* Du lịch - Nhà hàng - Khách sạn */}
          <Link
            to="/jobs?category=tourism&location=Đà Nẵng"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-green-100 transition-colors"></div>
            <div className="relative z-10">
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">🏖️</span>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Du lịch</h3>
              <p className="text-sm text-gray-500">
                {stats.jobsByCategory.tourism} việc làm
              </p>
              <span className="inline-block mt-3 text-xs text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Xem việc làm →
              </span>
            </div>
          </Link>

          {/* Kinh doanh - Bán hàng */}
          <Link
            to="/jobs?category=business&location=Đà Nẵng"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-yellow-100 transition-colors"></div>
            <div className="relative z-10">
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">💼</span>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Kinh doanh</h3>
              <p className="text-sm text-gray-500">
                {stats.jobsByCategory.business} việc làm
              </p>
              <span className="inline-block mt-3 text-xs text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Xem việc làm →
              </span>
            </div>
          </Link>

          {/* Xây dựng - Kiến trúc */}
          <Link
            to="/jobs?category=construction&location=Đà Nẵng"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-orange-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-orange-100 transition-colors"></div>
            <div className="relative z-10">
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">🏗️</span>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Xây dựng</h3>
              <p className="text-sm text-gray-500">
                {stats.jobsByCategory.construction} việc làm
              </p>
              <span className="inline-block mt-3 text-xs text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Xem việc làm →
              </span>
            </div>
          </Link>

          {/* Dịch vụ */}
          <Link
            to="/jobs?category=service&location=Đà Nẵng"
            className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-bl-full -z-0 opacity-50 group-hover:bg-purple-100 transition-colors"></div>
            <div className="relative z-10">
              <span className="text-4xl mb-3 block group-hover:scale-110 transition-transform">🛎️</span>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">Dịch vụ</h3>
              <p className="text-sm text-gray-500">
                {stats.jobsByCategory.service} việc làm
              </p>
              <span className="inline-block mt-3 text-xs text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Xem việc làm →
              </span>
            </div>
          </Link>
        </div>

        {/* Xem tất cả việc làm tại Đà Nẵng */}
        <div className="text-center mt-8">
          <Link 
            to="/jobs?location=Đà Nẵng"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group"
          >
            <span>Xem tất cả việc làm tại Đà Nẵng</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>

      {/* Featured Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header với decoration */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 w-1 h-12 rounded-full"></div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <SparklesIcon className="h-8 w-8 text-yellow-500 mr-2" />
                  Việc làm nổi bật tại Đà Nẵng
                </h2>
                <p className="text-gray-600 mt-1">
                  Những cơ hội việc làm hấp dẫn nhất tại thành phố biển
                </p>
              </div>
            </div>
            <Link 
              to="/jobs?featured=true"
              className="group flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-5 py-2.5 rounded-full transition-all duration-300"
            >
              <span className="font-semibold">Xem tất cả</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Jobs Grid - Hiển thị theo ngành */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* IT Jobs */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">💻</span>
              </div>
              <span className="bg-white text-blue-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {stats.jobsByCategory.it} việc
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">IT</h3>
            <p className="text-gray-600 text-sm mb-3">Công nghệ thông tin</p>
            <div className="space-y-2">
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Frontend Developer</p>
                  <p className="text-xs text-gray-500">React, Vue, Angular</p>
                </div>
                <span className="text-green-600 text-sm">12-20M</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Backend Developer</p>
                  <p className="text-xs text-gray-500">Node.js, Python, Java</p>
                </div>
                <span className="text-green-600 text-sm">15-25M</span>
              </div>
            </div>
            <Link to="/jobs?category=it" className="mt-3 text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group">
              Xem thêm IT
              <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
            </Link>
          </div>

          {/* Du lịch Jobs */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏖️</span>
              </div>
              <span className="bg-white text-green-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {stats.jobsByCategory.tourism} việc
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Du lịch</h3>
            <p className="text-gray-600 text-sm mb-3">Nhà hàng - Khách sạn</p>
            <div className="space-y-2">
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Hướng dẫn viên</p>
                  <p className="text-xs text-gray-500">Tiếng Anh, Hàn, Nhật</p>
                </div>
                <span className="text-green-600 text-sm">10-15M</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Lễ tân khách sạn</p>
                  <p className="text-xs text-gray-500">Tiếng Anh giao tiếp</p>
                </div>
                <span className="text-green-600 text-sm">8-12M</span>
              </div>
            </div>
            <Link to="/jobs?category=tourism" className="mt-3 text-xs text-green-600 hover:text-green-700 font-medium inline-flex items-center group">
              Xem thêm Du lịch
              <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
            </Link>
          </div>

          {/* Kinh doanh Jobs */}
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">💼</span>
              </div>
              <span className="bg-white text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {stats.jobsByCategory.business} việc
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Kinh doanh</h3>
            <p className="text-gray-600 text-sm mb-3">BĐS - Bán hàng</p>
            <div className="space-y-2">
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Sales BĐS</p>
                  <p className="text-xs text-gray-500">Hoa hồng cao</p>
                </div>
                <span className="text-green-600 text-sm">20-50M</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Nhân viên telesales</p>
                  <p className="text-xs text-gray-500">Gọi điện tư vấn</p>
                </div>
                <span className="text-green-600 text-sm">7-12M</span>
              </div>
            </div>
            <Link to="/jobs?category=business" className="mt-3 text-xs text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center group">
              Xem thêm Kinh doanh
              <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
            </Link>
          </div>

          {/* Xây dựng Jobs */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏗️</span>
              </div>
              <span className="bg-white text-orange-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {stats.jobsByCategory.construction} việc
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Xây dựng</h3>
            <p className="text-gray-600 text-sm mb-3">Kiến trúc - Công trình</p>
            <div className="space-y-2">
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Kỹ sư xây dựng</p>
                  <p className="text-xs text-gray-500">AutoCAD, Revit</p>
                </div>
                <span className="text-green-600 text-sm">12-18M</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Thợ xây dựng</p>
                  <p className="text-xs text-gray-500">Xây tường, trát</p>
                </div>
                <span className="text-green-600 text-sm">8-12M</span>
              </div>
            </div>
            <Link to="/jobs?category=construction" className="mt-3 text-xs text-orange-600 hover:text-orange-700 font-medium inline-flex items-center group">
              Xem thêm Xây dựng
              <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
            </Link>
          </div>

          {/* Dịch vụ Jobs */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🛎️</span>
              </div>
              <span className="bg-white text-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                {stats.jobsByCategory.service} việc
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Dịch vụ</h3>
            <p className="text-gray-600 text-sm mb-3">Lễ tân - Chăm sóc KH</p>
            <div className="space-y-2">
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Phục vụ nhà hàng</p>
                  <p className="text-xs text-gray-500">Kỹ năng giao tiếp</p>
                </div>
                <span className="text-green-600 text-sm">6-9M</span>
              </div>
              <div className="bg-white/80 rounded-lg p-2 flex justify-between items-center hover:bg-white transition-colors cursor-pointer">
                <div>
                  <p className="font-medium text-gray-800">Lễ tân khách sạn</p>
                  <p className="text-xs text-gray-500">Tiếng Anh giao tiếp</p>
                </div>
                <span className="text-green-600 text-sm">7-10M</span>
              </div>
            </div>
            <Link to="/jobs?category=service" className="mt-3 text-xs text-purple-600 hover:text-purple-700 font-medium inline-flex items-center group">
              Xem thêm Dịch vụ
              <span className="group-hover:translate-x-1 transition-transform ml-1">→</span>
            </Link>
          </div>
        </div>

        {/* Quick Stats Bar - Hiển thị số thực tế */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center border-r border-blue-400 last:border-0">
              <div className="text-3xl font-bold">{stats.jobsByCategory.it}</div>
              <div className="text-sm text-blue-200">IT</div>
            </div>
            <div className="text-center border-r border-blue-400 last:border-0">
              <div className="text-3xl font-bold">{stats.jobsByCategory.tourism}</div>
              <div className="text-sm text-blue-200">Du lịch</div>
            </div>
            <div className="text-center border-r border-blue-400 last:border-0">
              <div className="text-3xl font-bold">{stats.jobsByCategory.business}</div>
              <div className="text-sm text-blue-200">Kinh doanh</div>
            </div>
            <div className="text-center border-r border-blue-400 last:border-0">
              <div className="text-3xl font-bold">{stats.jobsByCategory.construction}</div>
              <div className="text-sm text-blue-200">Xây dựng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{stats.jobsByCategory.service}</div>
              <div className="text-sm text-blue-200">Dịch vụ</div>
            </div>
          </div>
          
          {/* Tổng số */}
          <div className="text-center mt-4 pt-4 border-t border-blue-400">
            <div className="text-2xl font-bold">
              Tổng: {stats.jobsByCategory.it + stats.jobsByCategory.tourism + 
                     stats.jobsByCategory.business + stats.jobsByCategory.construction + 
                     stats.jobsByCategory.service} việc làm
            </div>
          </div>
        </div>

        {/* Hot Tags */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-gray-500">Từ khóa hot:</span>
          <Link to="/jobs?keyword=react" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
            #React
          </Link>
          <Link to="/jobs?keyword=nodejs" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
            #NodeJS
          </Link>
          <Link to="/jobs?keyword=tieng-anh" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
            #Tiếng Anh
          </Link>
          <Link to="/jobs?keyword=kinh-doanh" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
            #Kinh doanh
          </Link>
          <Link to="/jobs?keyword=xay-dung" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors">
            #Xây dựng
          </Link>
        </div>
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
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Gợi ý thông minh</h3>
              <p className="text-gray-600">
                AI phân tích kỹ năng và kinh nghiệm để gợi ý việc làm phù hợp nhất với bạn
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <BriefcaseIcon className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phân tích thị trường</h3>
              <p className="text-gray-600">
                Cập nhật xu hướng tuyển dụng, mức lương theo ngành và kỹ năng hot tại Đà Nẵng
              </p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition">
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
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          {/* Badge */}
          <span className="inline-block px-4 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-6 backdrop-blur-sm">
            ✨ Hơn {stats.jobs}+ người tìm việc đã tin tưởng
          </span>
          
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sẵn sàng tìm việc làm tại Đà Nẵng?
          </h2>
          
          {/* Description */}
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Hàng ngàn cơ hội việc làm đang chờ đón bạn tại thành phố biển. 
            Đăng ký ngay để không bỏ lỡ cơ hội việc làm phù hợp!
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.jobs}+</div>
              <div className="text-sm text-blue-200">Việc làm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.companies}+</div>
              <div className="text-sm text-blue-200">Công ty</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5000+</div>
              <div className="text-sm text-blue-200">Ứng viên</div>
            </div>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group relative px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto"
            >
              <span className="relative z-10">Đăng ký ngay - Miễn phí</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            
            <Link
              to="/jobs?location=Đà Nẵng"
              className="group relative px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-full sm:w-auto overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center">
                Khám phá việc làm Đà Nẵng
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-75">
            <span className="text-sm text-blue-200">Được tin tưởng bởi</span>
            <div className="flex items-center space-x-6">
              <span className="text-white font-semibold">FPT Software</span>
              <span className="text-white font-semibold">Viettel</span>
              <span className="text-white font-semibold">VinGroup</span>
              <span className="text-white font-semibold">Sun Group</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;