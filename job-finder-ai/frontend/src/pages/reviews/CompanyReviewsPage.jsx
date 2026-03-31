import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import CompanyReviewCard from './CompanyReviewCard';
import ReviewFilter from './ReviewFilter';
import ReviewStats from './ReviewStats';
import ReviewForm from './ReviewForm';
import './CompanyReviewsPage.css';

// Import tất cả công ty từ các file dữ liệu
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../data/jobs';

const CompanyReviewsPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating_desc');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Lấy danh sách công ty duy nhất từ tất cả jobs
  const getAllCompanies = () => {
    const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];
    const companiesMap = new Map();
    
    allJobs.forEach(job => {
      if (!companiesMap.has(job.company)) {
        companiesMap.set(job.company, {
          id: job.id,
          name: job.company,
          logo: job.logo,
          location: job.location,
          employees: job.employees,
          industry: job.category,
          rating: job.rating || 4.5,
          reviewCount: job.ratingCount || Math.floor(Math.random() * 200) + 50,
          recommendRate: job.recommendRate || 85,
          reviewAuthor: job.reviewAuthor || 'Nhân viên cũ',
          reviewDate: '15/03/2024',
          reviewRating: job.rating || 4.5,
          reviewContent: job.reviewQuote || 'Môi trường làm việc chuyên nghiệp, nhiều cơ hội phát triển.',
          helpfulCount: Math.floor(Math.random() * 50) + 10,
          pros: 'Môi trường trẻ trung, năng động. Lương thưởng hấp dẫn. Đào tạo chuyên sâu.',
          cons: 'Áp lực công việc cao. Yêu cầu làm thêm giờ khi có dự án.',
        });
      }
    });
    
    return Array.from(companiesMap.values());
  };

  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    const allCompanies = getAllCompanies();
    setCompanies(allCompanies);
  }, []);

  useEffect(() => {
    let filtered = [...companies];
    
    // Filter by industry
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating_desc':
          return b.rating - a.rating;
        case 'rating_asc':
          return a.rating - b.rating;
        case 'reviews_desc':
          return b.reviewCount - a.reviewCount;
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
    
    setFilteredCompanies(filtered);
  }, [companies, selectedIndustry, searchTerm, sortBy]);

  const industries = [
    { id: 'it', name: 'IT', icon: '💻' },
    { id: 'tourism', name: 'Du lịch', icon: '🏖️' },
    { id: 'business', name: 'Kinh doanh', icon: '💼' },
    { id: 'construction', name: 'Xây dựng', icon: '🏗️' },
    { id: 'service', name: 'Dịch vụ', icon: '🛎️' },
  ];

  // Calculate overall stats
  const overallStats = {
    averageRating: (filteredCompanies.reduce((sum, c) => sum + c.rating, 0) / filteredCompanies.length).toFixed(1) || 0,
    totalReviews: filteredCompanies.reduce((sum, c) => sum + c.reviewCount, 0)
  };

  const handleWriteReview = (company) => {
    setSelectedCompany(company);
    setShowReviewForm(true);
  };

  const handleSubmitReview = async (reviewData) => {
    // TODO: Gọi API lưu review
    console.log('Review submitted:', reviewData);
    // Cập nhật lại danh sách review
  };

  const handleHelpful = (companyId) => {
    // TODO: Gọi API đánh dấu hữu ích
    console.log('Marked helpful for company:', companyId);
  };

  const handleReport = (companyId) => {
    // TODO: Gọi API báo cáo review
    console.log('Reported review for company:', companyId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Đánh giá công ty</span>
          </div>
          
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group"
          >
            <HomeIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Quay lại trang chủ</span>
          </Link>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đánh giá công ty</h1>
          <p className="text-gray-600">
            Khám phá những đánh giá thực tế từ nhân viên về các công ty hàng đầu tại Đà Nẵng
          </p>
        </div>

        {/* Stats */}
        <ReviewStats stats={overallStats} />

        {/* Filter */}
        <ReviewFilter 
          industries={industries}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Write Review Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => handleWriteReview(null)}
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            <PencilSquareIcon className="h-5 w-5" />
            <span>Viết đánh giá</span>
          </button>
        </div>

        {/* Companies Reviews Grid */}
        <div className="space-y-4">
          {filteredCompanies.map(company => (
            <CompanyReviewCard
              key={company.id}
              company={company}
              onHelpful={handleHelpful}
              onReport={handleReport}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy công ty</h3>
            <p className="text-gray-600">Thử tìm kiếm với từ khóa khác nhé!</p>
          </div>
        )}

        {/* Review Form Modal */}
        {showReviewForm && (
          <ReviewForm
            company={selectedCompany || { name: 'Công ty' }}
            onSubmit={handleSubmitReview}
            onClose={() => setShowReviewForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyReviewsPage;