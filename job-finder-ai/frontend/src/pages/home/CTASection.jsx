import React from 'react';
import { Link } from 'react-router-dom';

// Pattern SVG
const patternSvg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const CTASection = () => {
  return (
    <div className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800"></div>
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${patternSvg})` }}></div>
      
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Sẵn sàng cho sự nghiệp mơ ước?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Hơn {new Date().getFullYear()} người đã tìm được việc làm qua DANANG WORK
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Đăng ký ngay - Miễn phí
          </Link>
          <Link to="/jobs" className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
            Khám phá việc làm
          </Link>
        </div>
        <p className="text-sm text-blue-200 mt-6">⚡ Không cần thẻ tín dụng | ⏱️ Đăng ký 30 giây | 🔒 Bảo mật thông tin</p>
      </div>
    </div>
  );
};

export default CTASection;