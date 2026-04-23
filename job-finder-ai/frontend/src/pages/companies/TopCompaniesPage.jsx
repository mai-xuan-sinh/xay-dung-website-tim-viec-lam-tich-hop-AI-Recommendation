// src/pages/companies/TopCompaniesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import CompanyCard from './CompanyCard';
import CompanyFilter from './CompanyFilter';
import CompanyStats from './CompanyStats';
import './TopCompaniesPage.css';
import bannerBg from '../../assets/banner_chinh.jpg';

// Import dữ liệu công ty từ các file jobs
import { 
  itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs,
  itJobsCount, tourismJobsCount, businessJobsCount, constructionJobsCount, serviceJobsCount
} from '../../data/jobs';

const TopCompaniesPage = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [expandedCompany, setExpandedCompany] = useState(null);
  const [savedCompanies, setSavedCompanies] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);

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
          founded: job.founded,
          website: job.website,
          email: job.email,
          phone: job.phone,
          description: job.description,
          culture: job.culture,
          benefits: job.benefits,
          jobs: job.jobs,
          hotJobs: job.hotJobs,
          rating: job.rating || 4.5,
          ratingCount: job.ratingCount || Math.floor(Math.random() * 200) + 50,
          recommendRate: job.recommendRate || 85,
          featured: job.featured,
          badge: job.badge,
          reviewQuote: job.reviewQuote,
          reviewAuthor: job.reviewAuthor,
          industry: job.category,
        });
      }
    });
    
    return Array.from(companiesMap.values());
  };

  // Tính tổng số liệu thống kê
  const getStats = () => {
    const allCompanies = getAllCompanies();
    const totalJobs = itJobsCount + tourismJobsCount + businessJobsCount + constructionJobsCount + serviceJobsCount;
    const totalReviews = allCompanies.reduce((sum, c) => sum + (c.ratingCount || 0), 0);
    
    return {
      totalCompanies: allCompanies.length,
      totalJobs: totalJobs,
      totalReviews: totalReviews
    };
  };

  useEffect(() => {
    const allCompanies = getAllCompanies();
    setCompanies(allCompanies);
  }, []);

  useEffect(() => {
    let filtered = [...companies];
    
    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(company => company.industry === selectedIndustry);
    }
    
    setFilteredCompanies(filtered);
  }, [companies, selectedIndustry]);

  const toggleExpand = (companyId) => {
    setExpandedCompany(expandedCompany === companyId ? null : companyId);
  };

  const toggleSaveCompany = (companyId) => {
    if (savedCompanies.includes(companyId)) {
      setSavedCompanies(savedCompanies.filter(id => id !== companyId));
    } else {
      setSavedCompanies([...savedCompanies, companyId]);
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section với background hình ảnh */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bannerBg})` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <SparklesIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm text-white">Top Công Ty Hàng Đầu Đà Nẵng 2026</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Những Công Ty Hàng Đầu
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Tại Đà Nẵng
              </span>
            </h1>
            <p className="text-gray-200 max-w-2xl mx-auto">
              Khám phá những công ty hàng đầu tại Đà Nẵng trong 5 lĩnh vực, được vinh danh nhờ văn hóa doanh nghiệp xuất sắc, 
              phúc lợi hấp dẫn và môi trường làm việc chuyên nghiệp.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Top công ty</span>
          </div>
          
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 group"
          >
            <HomeIcon className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">Quay lại trang chủ</span>
          </Link>
        </div>

        {/* Stats */}
        <CompanyStats stats={stats} />

        {/* Filter */}
        <CompanyFilter 
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
        />

        {/* Companies Grid */}
        <div className="space-y-6">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              isSaved={savedCompanies.includes(company.id)}
              onToggleSave={toggleSaveCompany}
              isExpanded={expandedCompany === company.id}
              onToggleExpand={toggleExpand}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏢</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có công ty nào</h3>
            <p className="text-gray-600">Vui lòng quay lại sau nhé!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCompaniesPage;