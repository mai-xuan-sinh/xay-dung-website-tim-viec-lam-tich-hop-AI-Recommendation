import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import JobFilter from './JobFilter';
import CategoryPills from './CategoryPills';
import SubCategoryPills from './SubCategoryPills';
import JobCard from './JobCard';
import Pagination from './Pagination';
import NoResults from './NoResults';
import ApplicationModal from '../job-detail/ApplicationModal';
import './JobsPage.css';

// Import dữ liệu jobs
import { 
  itJobs, 
  tourismJobs, 
  businessJobs, 
  constructionJobs, 
  serviceJobs,
  // IT Subcategories
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
  // Tourism Subcategories
  hotelJobs,
  restaurantJobs,
  tourJobs,
  spaJobs,
  transportJobs,
  shopJobs,
  // Business Subcategories
  retailJobs,
  telesalesJobs,
  onlineJobs,
  fieldJobs,
  adminJobs,
  // Construction Subcategories
  laborJobs,
  finishingJobs,
  technicalJobs,
  constructionSupportJobs,
  constructionAdminJobs,
  // Service Subcategories
  fbJobs,
  storeJobs,
  beautyJobs,
  serviceHotelJobs,
  cleanJobs,
  operationJobs
} from '../../data/jobs';

// Mapping tìm kiếm theo ngành
const categorySearchMap = {
  'it': ['it', 'công nghệ', 'công nghệ thông tin', 'cntt', 'tech', 'technology', 'phần mềm', 'software'],
  'tourism': ['du lịch', 'tourism', 'khách sạn', 'hotel', 'resort', 'nhà hàng', 'restaurant', 'lữ hành', 'travel'],
  'business': ['kinh doanh', 'business', 'bán hàng', 'sales', 'marketing', 'trade', 'thương mại', 'commerce'],
  'construction': ['xây dựng', 'construction', 'bất động sản', 'real estate', 'công trình', 'kiến trúc', 'architecture'],
  'service': ['dịch vụ', 'service', 'logistics', 'vận chuyển', 'chăm sóc khách hàng', 'customer service', 'spa', 'vệ sinh']
};

// Mapping subcategory cho từ khóa
const subCategoryMap = {
  'frontend': ['frontend', 'front-end', 'giao diện', 'ui', 'react', 'vue', 'angular'],
  'backend': ['backend', 'back-end', 'server', 'api', 'node', 'python', 'java', 'php'],
  'fullstack': ['fullstack', 'full-stack', 'full stack'],
  'mobile': ['mobile', 'app', 'flutter', 'react native', 'ios', 'android', 'di động'],
  'devops': ['devops', 'ci/cd', 'docker', 'kubernetes', 'k8s', 'aws', 'cloud'],
  'data': ['data', 'dữ liệu', 'analyst', 'phân tích', 'sql', 'python', 'power bi'],
  'ai': ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'trí tuệ nhân tạo'],
  'hotel': ['khách sạn', 'hotel', 'lễ tân', 'buồng phòng', 'bellman'],
  'restaurant': ['nhà hàng', 'restaurant', 'phục vụ', 'bếp', 'bartender'],
  'tour': ['tour', 'hướng dẫn viên', 'guide', 'du lịch'],
  'spa': ['spa', 'massage', 'chăm sóc sắc đẹp', 'nail', 'làm tóc'],
  'retail': ['bán hàng', 'sales', 'thu ngân', 'trưng bày', 'merchandiser'],
  'telesales': ['telesales', 'gọi điện', 'chăm sóc khách hàng', 'cskh'],
  'online': ['online', 'e-commerce', 'shopee', 'lazada', 'livestream'],
  'labor': ['thợ', 'lao động', 'xây dựng', 'phụ hồ', 'bê tông'],
  'clean': ['vệ sinh', 'dọn dẹp', 'tạp vụ', 'cleaning']
};

const JobsPage = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const jobsPerPage = 9;

  // Lấy params từ URL khi load trang
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    const subCategory = params.get('subcategory');
    const featured = params.get('featured');
    const search = params.get('search');
    const loc = params.get('location');
    
    if (category) setSelectedCategory(category);
    else setSelectedCategory('all');
    
    if (subCategory) setSelectedSubCategory(subCategory);
    else setSelectedSubCategory('all');
    
    if (featured === 'true') setShowOnlyFeatured(true);
    else setShowOnlyFeatured(false);
    
    if (search) setSearchTerm(search);
    else setSearchTerm('');
    
    if (loc) setLocationFilter(loc);
    else setLocationFilter('');
    
    setCurrentPage(1);
  }, [location.search]);

  // Lấy tất cả việc làm (bao gồm cả nổi bật và phổ thông)
  const getAllJobs = () => {
    return [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
  };

  // Lấy jobs theo category
  const getJobsByCategory = () => {
    let jobs = [];
    
    if (selectedCategory === 'all') {
      jobs = getAllJobs();
    } else if (selectedCategory === 'it') {
      jobs = itJobs;
    } else if (selectedCategory === 'tourism') {
      jobs = tourismJobs;
    } else if (selectedCategory === 'business') {
      jobs = businessJobs;
    } else if (selectedCategory === 'construction') {
      jobs = constructionJobs;
    } else if (selectedCategory === 'service') {
      jobs = serviceJobs;
    }
    
    // Lọc theo subcategory nếu có
    if (selectedSubCategory !== 'all' && jobs.length > 0) {
      jobs = jobs.filter(job => job.subCategory === selectedSubCategory);
    }
    
    // Nếu đang xem việc làm nổi bật (từ trang chủ)
    if (showOnlyFeatured) {
      return jobs.filter(job => job.featured === true || job.hot === true);
    }
    
    // Mặc định: Chỉ hiển thị việc làm PHỔ THÔNG (không có badge featured/hot)
    return jobs.filter(job => !job.featured && !job.hot);
  };

  const allJobs = getJobsByCategory();
  
  // Hàm kiểm tra tìm kiếm theo category
  const matchesCategorySearch = (job, searchLower) => {
    // Tìm theo category chính
    if (job.category === 'it' && (searchLower === 'it' || searchLower === 'công nghệ' || searchLower === 'công nghệ thông tin' || searchLower === 'cntt')) {
      return true;
    }
    if (job.category === 'tourism' && (searchLower === 'du lịch' || searchLower === 'tourism' || searchLower === 'khách sạn')) {
      return true;
    }
    if (job.category === 'business' && (searchLower === 'kinh doanh' || searchLower === 'business' || searchLower === 'bán hàng')) {
      return true;
    }
    if (job.category === 'construction' && (searchLower === 'xây dựng' || searchLower === 'construction' || searchLower === 'bất động sản')) {
      return true;
    }
    if (job.category === 'service' && (searchLower === 'dịch vụ' || searchLower === 'service' || searchLower === 'logistics')) {
      return true;
    }
    
    // Tìm theo mapping
    for (const [category, keywords] of Object.entries(categorySearchMap)) {
      if (keywords.some(keyword => searchLower.includes(keyword) || keyword.includes(searchLower))) {
        if (job.category === category) {
          return true;
        }
      }
    }
    return false;
  };
  
  // Hàm kiểm tra tìm kiếm theo subcategory
  const matchesSubCategorySearch = (job, searchLower) => {
    if (!job.subCategory) return false;
    
    // Tìm chính xác theo subCategory
    if (job.subCategory.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Tìm theo mapping
    for (const [subCat, keywords] of Object.entries(subCategoryMap)) {
      if (keywords.some(keyword => searchLower.includes(keyword) || keyword.includes(searchLower))) {
        if (job.subCategory === subCat) {
          return true;
        }
      }
    }
    return false;
  };
  
  // Filter jobs theo search và location - TÌM KIẾM MỞ RỘNG
  const filteredJobs = allJobs.filter(job => {
    const searchLower = searchTerm.toLowerCase().trim();
    
    // Tìm kiếm theo từ khóa (mở rộng)
    const matchesSearch = searchTerm === '' || 
      // Tìm theo tên công việc
      job.title.toLowerCase().includes(searchLower) ||
      // Tìm theo tên công ty
      job.company.toLowerCase().includes(searchLower) ||
      // Tìm theo kỹ năng
      (job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchLower))) ||
      // Tìm theo ngành (category)
      matchesCategorySearch(job, searchLower) ||
      // Tìm theo subcategory (Frontend, Backend, v.v)
      matchesSubCategorySearch(job, searchLower) ||
      // Tìm theo mức lương (nếu searchTerm là số)
      (searchTerm.match(/^\d+$/) && job.salary && job.salary.includes(searchTerm));
    
    // Lọc theo địa điểm (quận/huyện)
    let matchesLocation = true;
    if (locationFilter) {
      if (locationFilter === 'Đà Nẵng') {
        matchesLocation = job.location.includes('Đà Nẵng') || 
                          job.location === 'Hải Châu' ||
                          job.location === 'Sơn Trà' ||
                          job.location === 'Ngũ Hành Sơn' ||
                          job.location === 'Liên Chiểu' ||
                          job.location === 'Thanh Khê' ||
                          job.location === 'Cẩm Lệ' ||
                          job.location === 'Hòa Vang';
      } else {
        matchesLocation = job.location.toLowerCase().includes(locationFilter.toLowerCase());
      }
    }
    
    return matchesSearch && matchesLocation;
  });

  // Pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Categories - Số lượng dựa trên chế độ xem
  const getCategoryCount = (categoryId) => {
    let jobs = [];
    if (categoryId === 'all') {
      jobs = getAllJobs();
    } else {
      const jobsMap = {
        it: itJobs,
        tourism: tourismJobs,
        business: businessJobs,
        construction: constructionJobs,
        service: serviceJobs,
      };
      jobs = jobsMap[categoryId] || [];
    }
    
    if (showOnlyFeatured) {
      return jobs.filter(j => j.featured || j.hot).length;
    } else {
      return jobs.filter(j => !j.featured && !j.hot).length;
    }
  };

  const categories = [
    { id: 'all', name: 'Tất cả ngành', icon: '📋', count: getCategoryCount('all') },
    { id: 'it', name: 'IT', icon: '💻', count: getCategoryCount('it') },
    { id: 'tourism', name: 'Du lịch', icon: '🏖️', count: getCategoryCount('tourism') },
    { id: 'business', name: 'Kinh doanh', icon: '💼', count: getCategoryCount('business') },
    { id: 'construction', name: 'Xây dựng', icon: '🏗️', count: getCategoryCount('construction') },
    { id: 'service', name: 'Dịch vụ', icon: '🛎️', count: getCategoryCount('service') },
  ];

  // Subcategories - Số lượng dựa trên chế độ xem
  const getSubCategoryCount = (jobsList, subCategoryId) => {
    if (!jobsList) return 0;
    if (showOnlyFeatured) {
      return jobsList.filter(j => (j.featured || j.hot) && j.subCategory === subCategoryId).length;
    } else {
      return jobsList.filter(j => !j.featured && !j.hot && j.subCategory === subCategoryId).length;
    }
  };

  const subCategoriesMap = {
    it: [
      { id: 'all', name: 'Tất cả IT', icon: '💻', count: getCategoryCount('it') },
      { id: 'frontend', name: 'Frontend', icon: '⚛️', count: getSubCategoryCount(frontendJobs, 'frontend') },
      { id: 'backend', name: 'Backend', icon: '⚙️', count: getSubCategoryCount(backendJobs, 'backend') },
      { id: 'fullstack', name: 'Fullstack', icon: '🔄', count: getSubCategoryCount(fullstackJobs, 'fullstack') },
      { id: 'mobile', name: 'Mobile', icon: '📱', count: getSubCategoryCount(mobileJobs, 'mobile') },
      { id: 'uiux', name: 'UI/UX', icon: '🎨', count: getSubCategoryCount(uiuxJobs, 'uiux') },
      { id: 'qa', name: 'QA/Tester', icon: '🔍', count: getSubCategoryCount(qaJobs, 'qa') },
      { id: 'devops', name: 'DevOps', icon: '🚀', count: getSubCategoryCount(devopsJobs, 'devops') },
      { id: 'data', name: 'Data Analyst', icon: '📊', count: getSubCategoryCount(dataJobs, 'data') },
      { id: 'ai', name: 'AI Engineer', icon: '🤖', count: getSubCategoryCount(aiJobs, 'ai') },
      { id: 'support', name: 'IT Support', icon: '🖥️', count: getSubCategoryCount(supportJobs, 'support') },
      { id: 'sysadmin', name: 'System Admin', icon: '🔧', count: getSubCategoryCount(sysadminJobs, 'sysadmin') },
    ],
    tourism: [
      { id: 'all', name: 'Tất cả Du lịch', icon: '🏖️', count: getCategoryCount('tourism') },
      { id: 'hotel', name: 'Khách sạn', icon: '🏨', count: getSubCategoryCount(hotelJobs, 'hotel') },
      { id: 'restaurant', name: 'Nhà hàng', icon: '🍽️', count: getSubCategoryCount(restaurantJobs, 'restaurant') },
      { id: 'tour', name: 'Tour du lịch', icon: '🧭', count: getSubCategoryCount(tourJobs, 'tour') },
      { id: 'spa', name: 'Spa', icon: '💆', count: getSubCategoryCount(spaJobs, 'spa') },
      { id: 'transport', name: 'Vận chuyển', icon: '🚗', count: getSubCategoryCount(transportJobs, 'transport') },
      { id: 'shop', name: 'Bán hàng', icon: '🛍️', count: getSubCategoryCount(shopJobs, 'shop') },
    ],
    business: [
      { id: 'all', name: 'Tất cả Kinh doanh', icon: '💼', count: getCategoryCount('business') },
      { id: 'retail', name: 'Bán hàng trực tiếp', icon: '🏪', count: getSubCategoryCount(retailJobs, 'retail') },
      { id: 'telesales', name: 'Telesales', icon: '📞', count: getSubCategoryCount(telesalesJobs, 'telesales') },
      { id: 'online', name: 'Bán hàng online', icon: '📱', count: getSubCategoryCount(onlineJobs, 'online') },
      { id: 'field', name: 'Sale thị trường', icon: '🏍️', count: getSubCategoryCount(fieldJobs, 'field') },
      { id: 'admin', name: 'Hỗ trợ kinh doanh', icon: '📋', count: getSubCategoryCount(adminJobs, 'admin') },
    ],
    construction: [
      { id: 'all', name: 'Tất cả Xây dựng', icon: '🏗️', count: getCategoryCount('construction') },
      { id: 'labor', name: 'Lao động trực tiếp', icon: '🔨', count: getSubCategoryCount(laborJobs, 'labor') },
      { id: 'finishing', name: 'Hoàn thiện', icon: '🧱', count: getSubCategoryCount(finishingJobs, 'finishing') },
      { id: 'technical', name: 'Kỹ thuật', icon: '⚡', count: getSubCategoryCount(technicalJobs, 'technical') },
      { id: 'support', name: 'Hỗ trợ', icon: '🚚', count: getSubCategoryCount(constructionSupportJobs, 'support') },
      { id: 'admin', name: 'Phụ trợ', icon: '🏢', count: getSubCategoryCount(constructionAdminJobs, 'admin') },
    ],
    service: [
      { id: 'all', name: 'Tất cả Dịch vụ', icon: '🛎️', count: getCategoryCount('service') },
      { id: 'fb', name: 'Ăn uống', icon: '🍔', count: getSubCategoryCount(fbJobs, 'fb') },
      { id: 'store', name: 'Cửa hàng', icon: '🏪', count: getSubCategoryCount(storeJobs, 'store') },
      { id: 'beauty', name: 'Làm đẹp', icon: '💅', count: getSubCategoryCount(beautyJobs, 'beauty') },
      { id: 'hotel', name: 'Khách sạn', icon: '🏨', count: getSubCategoryCount(serviceHotelJobs, 'hotel') },
      { id: 'clean', name: 'Vệ sinh', icon: '🧹', count: getSubCategoryCount(cleanJobs, 'clean') },
      { id: 'operation', name: 'Hỗ trợ', icon: '🛵', count: getSubCategoryCount(operationJobs, 'operation') },
    ],
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleApply = (job) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  const handleSubmitApplication = (formData) => {
    console.log('Application submitted for job:', selectedJob?.title, formData);
    // TODO: Gọi API gửi đơn ứng tuyển
    setIsApplyModalOpen(false);
    setSelectedJob(null);
    alert('Ứng tuyển thành công!');
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('all');
    setCurrentPage(1);
    const params = new URLSearchParams(location.search);
    params.set('category', categoryId);
    params.delete('subcategory');
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    setCurrentPage(1);
    const params = new URLSearchParams(location.search);
    params.set('subcategory', subCategoryId);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  };

  const handleLocationChange = (value) => {
    setLocationFilter(value);
    setCurrentPage(1);
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('location', value);
    } else {
      params.delete('location');
    }
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  };

  const getCurrentSubCategories = () => {
    if (showOnlyFeatured) return [];
    return subCategoriesMap[selectedCategory] || [];
  };

  const getSubCategoryBgColor = () => {
    switch (selectedCategory) {
      case 'it': return 'blue';
      case 'tourism': return 'green';
      case 'business': return 'yellow';
      case 'construction': return 'orange';
      case 'service': return 'purple';
      default: return 'blue';
    }
  };

  const getCurrentCategoryName = () => {
    if (showOnlyFeatured) return 'Việc làm nổi bật';
    if (selectedCategory === 'all') return 'Tất cả việc làm phổ thông';
    const category = categories.find(c => c.id === selectedCategory);
    return category ? `${category.name} - Việc làm phổ thông` : 'Việc làm phổ thông';
  };

  const getSubCategoryName = () => {
    if (selectedSubCategory === 'all') return '';
    const subCat = getCurrentSubCategories().find(s => s.id === selectedSubCategory);
    return subCat ? ` - ${subCat.name}` : '';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {getCurrentCategoryName()}{getSubCategoryName()}
              {locationFilter && ` - ${locationFilter}`}
              {searchTerm && ` - Tìm kiếm: ${searchTerm}`}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            {showOnlyFeatured && (
              <Link
                to="/jobs"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200 group"
              >
                <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Xem tất cả việc làm phổ thông</span>
              </Link>
            )}
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group"
            >
              <HomeIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Quay lại trang chủ</span>
            </Link>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getCurrentCategoryName()}{getSubCategoryName()}
            {locationFilter && <span className="text-blue-600"> - {locationFilter}</span>}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredJobs.length > 0 ? (
                <>Hiển thị {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} / {filteredJobs.length} việc làm</>
              ) : (
                <>{showOnlyFeatured ? 'Không có việc làm nổi bật nào' : 'Không có việc làm phổ thông nào'}</>
              )}
            </p>
            {!showOnlyFeatured && selectedCategory !== 'all' && totalPages > 1 && (
              <p className="text-sm text-gray-500">Trang {currentPage} / {totalPages}</p>
            )}
          </div>
        </div>

        {/* Search và Filter */}
        <JobFilter 
          searchTerm={searchTerm}
          setSearchTerm={handleSearchChange}
          locationFilter={locationFilter}
          setLocationFilter={handleLocationChange}
        />

        {/* Categories Pills */}
        {!showOnlyFeatured && (
          <CategoryPills 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        )}

        {/* SubCategories Pills */}
        {!showOnlyFeatured && getCurrentSubCategories().length > 0 && (
          <SubCategoryPills 
            subCategories={getCurrentSubCategories()}
            selectedSubCategory={selectedSubCategory}
            onSelectSubCategory={handleSubCategoryChange}
            bgColor={getSubCategoryBgColor()}
          />
        )}

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onToggleSave={toggleSaveJob}
              onApply={handleApply}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <NoResults 
            message={showOnlyFeatured ? 'Không có việc làm nổi bật' : 'Không có việc làm phổ thông nào trong danh mục này'}
          />
        )}

        {/* Pagination */}
        {filteredJobs.length > 0 && totalPages > 1 && (
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* Modal ứng tuyển */}
      {selectedJob && (
        <ApplicationModal
          isOpen={isApplyModalOpen}
          onClose={() => setIsApplyModalOpen(false)}
          jobTitle={selectedJob.title}
          companyName={selectedJob.company}
          onSubmit={handleSubmitApplication}
        />
      )}
    </div>
  );
};

export default JobsPage;