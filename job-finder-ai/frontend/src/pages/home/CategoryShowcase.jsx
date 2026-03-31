import React from 'react';
import { Link } from 'react-router-dom';
import { ComputerDesktopIcon, CameraIcon, ShoppingBagIcon, HomeModernIcon, TruckIcon } from '@heroicons/react/24/outline';
import { itJobs, tourismJobs, businessJobs, constructionJobs, serviceJobs } from '../../data/jobs';

const CategoryShowcase = () => {
  const categories = [
    { id: 'it', name: 'Công nghệ thông tin', icon: ComputerDesktopIcon, count: itJobs.length, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', jobs: ['Frontend', 'Backend', 'DevOps', 'AI'] },
    { id: 'tourism', name: 'Du lịch - Khách sạn', icon: CameraIcon, count: tourismJobs.length, color: 'from-green-500 to-emerald-500', bg: 'bg-green-50', jobs: ['Hướng dẫn viên', 'Lễ tân', 'Quản lý resort'] },
    { id: 'business', name: 'Kinh doanh - Bán lẻ', icon: ShoppingBagIcon, count: businessJobs.length, color: 'from-yellow-500 to-orange-500', bg: 'bg-yellow-50', jobs: ['Sales', 'Marketing', 'Quản lý'] },
    { id: 'construction', name: 'Xây dựng - BĐS', icon: HomeModernIcon, count: constructionJobs.length, color: 'from-orange-500 to-red-500', bg: 'bg-orange-50', jobs: ['Kỹ sư', 'Kiến trúc sư', 'Giám sát'] },
    { id: 'service', name: 'Dịch vụ - Logistics', icon: TruckIcon, count: serviceJobs.length, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-50', jobs: ['Shipper', 'CSKH', 'Vận hành'] }
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
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cat.color}`}></div>
              <div className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto ${cat.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className={`h-8 w-8 text-${cat.color.split('-')[1]}-600`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.count} việc làm</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1">
                  {cat.jobs.map((job, i) => (
                    <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
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