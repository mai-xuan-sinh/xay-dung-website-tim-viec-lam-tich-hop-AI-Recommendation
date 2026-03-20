import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon,
  BuildingOfficeIcon,
  StarIcon,
  HomeIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { 
  // IT Jobs
  itJobs, 
  itJobsCount,
  frontendJobs,
  backendJobs,
  fullstackJobs,
  mobileJobs,
  uiuxJobs,
  qaJobs,
  devopsJobs,
  dataJobs,
  aiJobs,
  supportJobs,
  sysadminJobs,
  
  // Tourism Jobs
  tourismJobs,
  tourismJobsCount,
  hotelJobs,
  restaurantJobs,
  tourJobs,
  spaJobs,
  transportJobs,
  shopJobs,
  
  // Business Jobs
  businessJobs,
  businessJobsCount,
  retailJobs,
  telesalesJobs,
  onlineJobs,
  fieldJobs,
  adminJobs,
  
  // Construction Jobs
  constructionJobs,
  constructionJobsCount,
  laborJobs,
  finishingJobs,
  technicalJobs,
  constructionSupportJobs,
  constructionAdminJobs,
  
  // Service Jobs
  serviceJobs,
  serviceJobsCount,
  fbJobs,
  storeJobs,
  beautyJobs,
  serviceHotelJobs,
  cleanJobs,
  operationJobs,
  
  // Functions
  getHotItJobs,
  getFeaturedItJobs
} from '../data/jobs';

const JobsPage = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const jobsPerPage = 9;

  // Dữ liệu jobs theo ngành
  const jobsData = {
    it: itJobs,
    tourism: tourismJobs,
    business: businessJobs,
    construction: constructionJobs,
    service: serviceJobs,
  };

  // Danh sách subcategory cho IT
  const itSubCategories = [
    { id: 'all', name: 'Tất cả IT', icon: '💻', count: itJobs.length },
    { id: 'frontend', name: 'Frontend', icon: '⚛️', count: frontendJobs.length },
    { id: 'backend', name: 'Backend', icon: '⚙️', count: backendJobs.length },
    { id: 'fullstack', name: 'Fullstack', icon: '🔄', count: fullstackJobs.length },
    { id: 'mobile', name: 'Mobile', icon: '📱', count: mobileJobs.length },
    { id: 'uiux', name: 'UI/UX', icon: '🎨', count: uiuxJobs.length },
    { id: 'qa', name: 'QA/Tester', icon: '🔍', count: qaJobs.length },
    { id: 'devops', name: 'DevOps', icon: '🚀', count: devopsJobs.length },
    { id: 'data', name: 'Data Analyst', icon: '📊', count: dataJobs.length },
    { id: 'ai', name: 'AI Engineer', icon: '🤖', count: aiJobs.length },
    { id: 'support', name: 'IT Support', icon: '🖥️', count: supportJobs.length },
    { id: 'sysadmin', name: 'System Admin', icon: '🔧', count: sysadminJobs.length },
  ];

  // Danh sách subcategory cho Du lịch
  const tourismSubCategories = [
    { id: 'all', name: 'Tất cả Du lịch', icon: '🏖️', count: tourismJobs.length },
    { id: 'hotel', name: 'Khách sạn', icon: '🏨', count: hotelJobs.length },
    { id: 'restaurant', name: 'Nhà hàng', icon: '🍽️', count: restaurantJobs.length },
    { id: 'tour', name: 'Tour du lịch', icon: '🧭', count: tourJobs.length },
    { id: 'spa', name: 'Spa', icon: '💆', count: spaJobs.length },
    { id: 'transport', name: 'Vận chuyển', icon: '🚗', count: transportJobs.length },
    { id: 'shop', name: 'Bán hàng', icon: '🛍️', count: shopJobs.length },
  ];

  // Danh sách subcategory cho Kinh doanh
  const businessSubCategories = [
    { id: 'all', name: 'Tất cả Kinh doanh', icon: '💼', count: businessJobs.length },
    { id: 'retail', name: 'Bán hàng trực tiếp', icon: '🏪', count: retailJobs.length },
    { id: 'telesales', name: 'Telesales', icon: '📞', count: telesalesJobs.length },
    { id: 'online', name: 'Bán hàng online', icon: '📱', count: onlineJobs.length },
    { id: 'field', name: 'Sale thị trường', icon: '🏍️', count: fieldJobs.length },
    { id: 'admin', name: 'Hỗ trợ kinh doanh', icon: '📋', count: adminJobs.length },
  ];

  // Danh sách subcategory cho Xây dựng
  const constructionSubCategories = [
    { id: 'all', name: 'Tất cả Xây dựng', icon: '🏗️', count: constructionJobs.length },
    { id: 'labor', name: 'Lao động trực tiếp', icon: '🔨', count: laborJobs.length },
    { id: 'finishing', name: 'Hoàn thiện', icon: '🧱', count: finishingJobs.length },
    { id: 'technical', name: 'Kỹ thuật', icon: '⚡', count: technicalJobs.length },
    { id: 'support', name: 'Hỗ trợ', icon: '🚚', count: constructionSupportJobs.length },
    { id: 'admin', name: 'Phụ trợ', icon: '🏢', count: constructionAdminJobs.length },
  ];

  // Danh sách subcategory cho Dịch vụ
  const serviceSubCategories = [
    { id: 'all', name: 'Tất cả Dịch vụ', icon: '🛎️', count: serviceJobs.length },
    { id: 'fb', name: 'Ăn uống', icon: '🍔', count: fbJobs.length },
    { id: 'store', name: 'Cửa hàng', icon: '🏪', count: storeJobs.length },
    { id: 'beauty', name: 'Làm đẹp', icon: '💅', count: beautyJobs.length },
    { id: 'hotel', name: 'Khách sạn', icon: '🏨', count: serviceHotelJobs.length },
    { id: 'clean', name: 'Vệ sinh', icon: '🧹', count: cleanJobs.length },
    { id: 'operation', name: 'Hỗ trợ', icon: '🛵', count: operationJobs.length },
  ];

  // Lấy category từ URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const subCategory = params.get('subcategory');
    const featured = params.get('featured');
    
    if (category) {
      setSelectedCategory(category);
    }
    if (subCategory) {
      setSelectedSubCategory(subCategory);
    }
    if (featured === 'true') {
      setShowOnlyFeatured(true);
    } else {
      setShowOnlyFeatured(false);
    }
    setCurrentPage(1);
  }, [location]);

  // Lấy jobs theo category và subcategory
  const getJobsByCategory = () => {
    let jobs = [];
    
    if (selectedCategory === 'all') {
      jobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
    } else if (selectedCategory === 'it') {
      if (selectedSubCategory === 'all') {
        jobs = itJobs;
      } else {
        jobs = itJobs.filter(job => job.subCategory === selectedSubCategory);
      }
    } else if (selectedCategory === 'tourism') {
      if (selectedSubCategory === 'all') {
        jobs = tourismJobs;
      } else {
        jobs = tourismJobs.filter(job => job.subCategory === selectedSubCategory);
      }
    } else if (selectedCategory === 'business') {
      if (selectedSubCategory === 'all') {
        jobs = businessJobs;
      } else {
        jobs = businessJobs.filter(job => job.subCategory === selectedSubCategory);
      }
    } else if (selectedCategory === 'construction') {
      if (selectedSubCategory === 'all') {
        jobs = constructionJobs;
      } else {
        jobs = constructionJobs.filter(job => job.subCategory === selectedSubCategory);
      }
    } else if (selectedCategory === 'service') {
      if (selectedSubCategory === 'all') {
        jobs = serviceJobs;
      } else {
        jobs = serviceJobs.filter(job => job.subCategory === selectedSubCategory);
      }
    }
    
    // Lọc chỉ hiển thị việc làm nổi bật
    if (showOnlyFeatured) {
      return jobs.filter(job => job.featured === true || job.hot === true);
    }
    
    return jobs;
  };

  const allJobs = getJobsByCategory();
  
  // Filter jobs theo search và location
  const filteredJobs = allJobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
                         job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (job.skills && job.skills.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    
    const matchesLocation = locationFilter === '' || 
                           job.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesLocation;
  });

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Danh sách categories chính
  const categories = [
    { id: 'all', name: 'Tất cả ngành', icon: '📋', count: itJobs.length + tourismJobs.length + businessJobs.length + constructionJobs.length + serviceJobs.length },
    { id: 'it', name: 'IT', icon: '💻', count: itJobs.length },
    { id: 'tourism', name: 'Du lịch', icon: '🏖️', count: tourismJobs.length },
    { id: 'business', name: 'Kinh doanh', icon: '💼', count: businessJobs.length },
    { id: 'construction', name: 'Xây dựng', icon: '🏗️', count: constructionJobs.length },
    { id: 'service', name: 'Dịch vụ', icon: '🛎️', count: serviceJobs.length },
  ];

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  // Render phân trang
  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`w-10 h-10 rounded-lg transition-all ${
            currentPage === i
              ? 'bg-blue-600 text-white shadow-md'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDownIcon className="h-5 w-5 rotate-90 mx-auto" />
        </button>
        
        {startPage > 1 && (
          <>
            <button
              onClick={() => setCurrentPage(1)}
              className="w-10 h-10 rounded-lg hover:bg-gray-100"
            >
              1
            </button>
            {startPage > 2 && <span className="text-gray-500">...</span>}
          </>
        )}
        
        {pages}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-gray-500">...</span>}
            <button
              onClick={() => setCurrentPage(totalPages)}
              className="w-10 h-10 rounded-lg hover:bg-gray-100"
            >
              {totalPages}
            </button>
          </>
        )}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDownIcon className="h-5 w-5 -rotate-90 mx-auto" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb và nút quay lại */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {showOnlyFeatured ? 'Việc làm nổi bật' : 
                (selectedCategory === 'all' ? 'Tất cả việc làm' : 
                 categories.find(c => c.id === selectedCategory)?.name)}
            </span>
            {!showOnlyFeatured && selectedCategory === 'it' && selectedSubCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {itSubCategories.find(s => s.id === selectedSubCategory)?.name}
                </span>
              </>
            )}
            {!showOnlyFeatured && selectedCategory === 'tourism' && selectedSubCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {tourismSubCategories.find(s => s.id === selectedSubCategory)?.name}
                </span>
              </>
            )}
            {!showOnlyFeatured && selectedCategory === 'business' && selectedSubCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {businessSubCategories.find(s => s.id === selectedSubCategory)?.name}
                </span>
              </>
            )}
            {!showOnlyFeatured && selectedCategory === 'construction' && selectedSubCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {constructionSubCategories.find(s => s.id === selectedSubCategory)?.name}
                </span>
              </>
            )}
            {!showOnlyFeatured && selectedCategory === 'service' && selectedSubCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="text-gray-900 font-medium">
                  {serviceSubCategories.find(s => s.id === selectedSubCategory)?.name}
                </span>
              </>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            {showOnlyFeatured && (
              <Link
                to="/jobs"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200 group"
              >
                <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Xem tất cả việc làm</span>
              </Link>
            )}
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group"
            >
              <HomeIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                Quay lại trang chủ
              </span>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {showOnlyFeatured 
              ? 'Việc làm nổi bật tại Đà Nẵng' 
              : (selectedCategory === 'all' 
                ? 'Tất cả việc làm tại Đà Nẵng' 
                : categories.find(c => c.id === selectedCategory)?.name + ' - Việc làm tại Đà Nẵng')}
            {!showOnlyFeatured && selectedCategory === 'it' && selectedSubCategory !== 'all' && 
              ` - ${itSubCategories.find(s => s.id === selectedSubCategory)?.name}`
            }
            {!showOnlyFeatured && selectedCategory === 'tourism' && selectedSubCategory !== 'all' && 
              ` - ${tourismSubCategories.find(s => s.id === selectedSubCategory)?.name}`
            }
            {!showOnlyFeatured && selectedCategory === 'business' && selectedSubCategory !== 'all' && 
              ` - ${businessSubCategories.find(s => s.id === selectedSubCategory)?.name}`
            }
            {!showOnlyFeatured && selectedCategory === 'construction' && selectedSubCategory !== 'all' && 
              ` - ${constructionSubCategories.find(s => s.id === selectedSubCategory)?.name}`
            }
            {!showOnlyFeatured && selectedCategory === 'service' && selectedSubCategory !== 'all' && 
              ` - ${serviceSubCategories.find(s => s.id === selectedSubCategory)?.name}`
            }
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredJobs.length > 0 ? (
                <>Hiển thị {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} / {filteredJobs.length} việc làm</>
              ) : (
                <>Không có việc làm nào</>
              )}
            </p>
            {!showOnlyFeatured && selectedCategory !== 'all' && totalPages > 1 && (
              <p className="text-sm text-gray-500">
                Trang {currentPage} / {totalPages}
              </p>
            )}
          </div>
        </div>

        {/* Search và Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm theo tên công việc, công ty, kỹ năng..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Địa điểm (Hải Châu, Sơn Trà...)"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FunnelIcon className="h-5 w-5" />
              <span>Bộ lọc</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <select className="p-2 border rounded-lg">
                  <option>Kinh nghiệm</option>
                  <option>0-1 năm</option>
                  <option>1-3 năm</option>
                  <option>3-5 năm</option>
                  <option>5+ năm</option>
                </select>
                <select className="p-2 border rounded-lg">
                  <option>Mức lương</option>
                  <option>Dưới 10M</option>
                  <option>10-15M</option>
                  <option>15-20M</option>
                  <option>20-30M</option>
                  <option>Trên 30M</option>
                </select>
                <select className="p-2 border rounded-lg">
                  <option>Loại hình</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Remote</option>
                </select>
                <select className="p-2 border rounded-lg">
                  <option>Sắp xếp</option>
                  <option>Mới nhất</option>
                  <option>Lương cao nhất</option>
                  <option>Phù hợp nhất</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Categories Pills - Chỉ hiển thị khi không phải xem việc làm nổi bật */}
        {!showOnlyFeatured && (
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedSubCategory('all');
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* SubCategories Pills - Chỉ hiển thị khi không phải xem việc làm nổi bật */}
        {!showOnlyFeatured && selectedCategory === 'it' && (
          <div className="flex flex-wrap gap-2 mb-6 ml-4">
            {itSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubCategory(sub.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 text-sm flex items-center space-x-1 ${
                  selectedSubCategory === sub.id
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
                <span className="text-xs ml-1">({sub.count})</span>
              </button>
            ))}
          </div>
        )}

        {!showOnlyFeatured && selectedCategory === 'tourism' && (
          <div className="flex flex-wrap gap-2 mb-6 ml-4">
            {tourismSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubCategory(sub.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 text-sm flex items-center space-x-1 ${
                  selectedSubCategory === sub.id
                    ? 'bg-green-100 text-green-700 font-medium'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
                <span className="text-xs ml-1">({sub.count})</span>
              </button>
            ))}
          </div>
        )}

        {!showOnlyFeatured && selectedCategory === 'business' && (
          <div className="flex flex-wrap gap-2 mb-6 ml-4">
            {businessSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubCategory(sub.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 text-sm flex items-center space-x-1 ${
                  selectedSubCategory === sub.id
                    ? 'bg-yellow-100 text-yellow-700 font-medium'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
                <span className="text-xs ml-1">({sub.count})</span>
              </button>
            ))}
          </div>
        )}

        {!showOnlyFeatured && selectedCategory === 'construction' && (
          <div className="flex flex-wrap gap-2 mb-6 ml-4">
            {constructionSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubCategory(sub.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 text-sm flex items-center space-x-1 ${
                  selectedSubCategory === sub.id
                    ? 'bg-orange-100 text-orange-700 font-medium'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
                <span className="text-xs ml-1">({sub.count})</span>
              </button>
            ))}
          </div>
        )}

        {!showOnlyFeatured && selectedCategory === 'service' && (
          <div className="flex flex-wrap gap-2 mb-6 ml-4">
            {serviceSubCategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubCategory(sub.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full transition-all duration-300 text-sm flex items-center space-x-1 ${
                  selectedSubCategory === sub.id
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{sub.icon}</span>
                <span>{sub.name}</span>
                <span className="text-xs ml-1">({sub.count})</span>
              </button>
            ))}
          </div>
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 relative group"
            >
              {/* Hot Badge */}
              {job.hot && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
                  🔥 Hot
                </span>
              )}

              {/* Featured Badge */}
              {job.featured && (
                <span className="absolute -top-2 -left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-md z-10">
                  ⭐ Nổi bật
                </span>
              )}

              {/* Save Button */}
              <button
                onClick={() => toggleSaveJob(job.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-yellow-500 transition-colors z-10"
              >
                {savedJobs.includes(job.id) ? (
                  <StarIconSolid className="h-5 w-5 text-yellow-500" />
                ) : (
                  <StarIcon className="h-5 w-5" />
                )}
              </button>

              {/* Job Header */}
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-2xl">
                  {job.logo}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center mt-1">
                    <BuildingOfficeIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{job.company}</span>
                  </p>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="font-medium text-green-600">{job.salary}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BriefcaseIcon className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span>{job.type} - {job.experience}</span>
                </div>
                {job.skills && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        +{job.skills.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  to={`/jobs/${job.id}`}
                  className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Xem chi tiết
                </Link>
                <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  Ứng tuyển
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {showOnlyFeatured ? 'Không có việc làm nổi bật' : 'Không tìm thấy việc làm'}
            </h3>
            <p className="text-gray-600">
              {showOnlyFeatured 
                ? 'Hiện tại chưa có việc làm nổi bật nào. Vui lòng quay lại sau!'
                : 'Thử tìm kiếm với từ khóa khác hoặc bộ lọc khác nhé!'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            {renderPagination()}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;