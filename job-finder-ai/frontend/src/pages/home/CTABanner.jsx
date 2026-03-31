import React from 'react';
import { Link } from 'react-router-dom';

const CTABanner = () => {
  return (
    <div className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Sẵn sàng tìm việc?</h2>
        <p className="text-blue-100 text-lg mb-8">Hàng ngàn cơ hội việc làm đang chờ đón bạn</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg">
            Đăng ký ngay
          </Link>
          <Link to="/jobs" className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition">
            Khám phá việc làm
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTABanner;