// src/pages/home/CategoryShowcase.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ComputerDesktopIcon, CameraIcon, ShoppingBagIcon, HomeModernIcon, TruckIcon } from '@heroicons/react/24/outline';
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../data/jobs';

// Import hình ảnh background cho từng ngành - BẠN CẦN THÊM ẢNH VÀO THƯ MỤC assets/
import itBg from '../../assets/categories/it-bg.jpg';
import tourismBg from '../../assets/categories/tourism-bg.webp';
import businessBg from '../../assets/categories/business-bg.jpg';
import constructionBg from '../../assets/categories/construction-bg.jpg';
import serviceBg from '../../assets/categories/service-bg.jpg';

const CategoryShowcase = () => {
  const categories = [
    { 
      id: 'it', 
      name: 'Công nghệ thông tin', 
      icon: ComputerDesktopIcon, 
      count: itJobs.length, 
      bgImage: itBg,
      color: 'from-blue-600 to-cyan-600',
      jobs: ['Frontend', 'Backend', 'DevOps', 'AI']
    },
    { 
      id: 'tourism', 
      name: 'Du lịch - Khách sạn', 
      icon: CameraIcon, 
      count: tourismJobs.length, 
      bgImage: tourismBg,
      color: 'from-green-600 to-emerald-600',
      jobs: ['Hướng dẫn viên', 'Lễ tân', 'Quản lý resort']
    },
    { 
      id: 'business', 
      name: 'Kinh doanh - Bán lẻ', 
      icon: ShoppingBagIcon, 
      count: businessJobs.length, 
      bgImage: businessBg,
      color: 'from-yellow-600 to-orange-600',
      jobs: ['Sales', 'Marketing', 'Quản lý']
    },
    { 
      id: 'construction', 
      name: 'Xây dựng - BĐS', 
      icon: HomeModernIcon, 
      count: constructionJobs.length, 
      bgImage: constructionBg,
      color: 'from-orange-600 to-red-600',
      jobs: ['Kỹ sư', 'Kiến trúc sư', 'Giám sát']
    },
    { 
      id: 'service', 
      name: 'Dịch vụ - Logistics', 
      icon: TruckIcon, 
      count: serviceJobs.length, 
      bgImage: serviceBg,
      color: 'from-purple-600 to-pink-600',
      jobs: ['Shipper', 'CSKH', 'Vận hành']
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Ngành nghề</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Khám phá theo lĩnh vực</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Chọn ngành bạn yêu thích để tìm kiếm cơ hội phù hợp nhất</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/jobs?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.bgImage})` }}
              />
              
              {/* Overlay gradient */}
              <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80 group-hover:opacity-70 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative p-6 text-white z-10">
                <div className="mb-4">
                  <cat.icon className="h-10 w-10 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-bold mb-1">{cat.name}</h3>
                <p className="text-sm text-white/80 mb-3">{cat.count} việc làm</p>
                <div className="flex flex-wrap gap-2">
                  {cat.jobs.map((job, i) => (
                    <span key={i} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      {job}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryShowcase;