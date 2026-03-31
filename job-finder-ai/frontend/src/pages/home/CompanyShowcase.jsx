import React from 'react';
import { Link } from 'react-router-dom';
import axonImg from '../../assets/companies/axon-active.webp';
import fptImg from '../../assets/companies/fpt-software.png';
import sunGroupImg from '../../assets/companies/sun-group.png';
import viettelImg from '../../assets/companies/viettel.webp';
import cotecconsImg from '../../assets/companies/coteccons-da-nang.png';
import theGioiDiDongImg from '../../assets/companies/the-gioi-di-dong.jpg';

const CompanyShowcase = () => {
  const companies = [
    { name: "FPT Software", logo: fptImg, jobs: 26, rating: 4.8 },
    { name: "Axon Active", logo: axonImg, jobs: 18, rating: 4.6 },
    { name: "Sun Group", logo: sunGroupImg, jobs: 45, rating: 4.9 },
    { name: "Viettel", logo: viettelImg, jobs: 35, rating: 4.5 },
    { name: "Coteccons", logo: cotecconsImg, jobs: 28, rating: 4.6 },
    { name: "Thế Giới Di Động", logo: theGioiDiDongImg, jobs: 50, rating: 4.5 }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Đối tác tin cậy</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Nhà tuyển dụng hàng đầu</h2>
          <p className="text-gray-500 mt-4">Cùng hợp tác với những doanh nghiệp uy tín tại Đà Nẵng</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {companies.map((company, i) => (
            <Link key={i} to={`/companies/${company.name}`} className="group">
              <div className="bg-gray-50 rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="h-12 mx-auto object-contain mb-3 group-hover:scale-110 transition" 
                />
                <p className="text-xs text-gray-500">{company.jobs} việc làm</p>
                <div className="flex justify-center mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <svg 
                      key={idx} 
                      className={`h-3 w-3 ${idx < Math.floor(company.rating) ? 'text-yellow-400' : 'text-gray-200'}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/top-companies" className="inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 group">
            Khám phá tất cả công ty
            <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompanyShowcase;