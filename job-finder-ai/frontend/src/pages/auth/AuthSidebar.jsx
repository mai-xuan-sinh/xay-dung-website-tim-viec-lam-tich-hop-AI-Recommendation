import React from 'react';
import { CheckCircleIcon, BuildingOfficeIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const AuthSidebar = ({ totalJobs, totalCompanies }) => {
  const benefits = [
    "Truy cập hàng ngàn việc làm chất lượng",
    "Gợi ý việc làm thông minh bằng AI",
    "Kết nối trực tiếp với nhà tuyển dụng",
    "Theo dõi quá trình ứng tuyển",
    "Hoàn toàn miễn phí"
  ];

  const testimonial = {
    quote: "Tôi đã tìm được công việc mơ ước chỉ sau 2 tuần sử dụng ĐANANG WORK. Giao diện thân thiện và gợi ý việc làm rất chính xác!",
    author: "Nguyễn Thị Minh Anh",
    role: "Developer tại FPT Software",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  };

  // Nếu có totalJobs và totalCompanies thì hiển thị stats, nếu không thì chỉ hiển thị benefits
  const showStats = totalJobs !== undefined && totalCompanies !== undefined;

  return (
    <div className="lg:w-2/5 bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white animate-slideInLeft">
      <div className="h-full flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-6">Lợi ích khi tham gia</h3>
          <ul className="space-y-4">
            {benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start space-x-3">
                <CheckCircleIcon className="h-6 w-6 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {showStats && (
          <div className="mt-8 pt-6 border-t border-blue-400">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{totalJobs}+</div>
                <div className="text-xs text-blue-200">Việc làm</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{totalCompanies}+</div>
                <div className="text-xs text-blue-200">Công ty</div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial */}
        <div className="mt-8 p-4 bg-white/10 rounded-lg">
          <p className="text-sm italic mb-2">"{testimonial.quote}"</p>
          <div className="flex items-center space-x-2 mt-2">
            <img 
              src={testimonial.avatar} 
              alt={testimonial.author} 
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{testimonial.author}</p>
              <p className="text-xs opacity-80">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSidebar;