import React from 'react';
import { SparklesIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const FeaturesSection = () => {
  const features = [
    { icon: SparklesIcon, title: "Gợi ý thông minh", desc: "AI phân tích kỹ năng, gợi ý việc làm phù hợp" },
    { icon: ChartBarIcon, title: "Phân tích thị trường", desc: "Cập nhật xu hướng, mức lương theo thời gian thực" },
    { icon: DocumentTextIcon, title: "Tối ưu CV", desc: "AI gợi ý cải thiện CV tăng cơ hội trúng tuyển" }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Công nghệ tiên tiến</span>
        <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">Trải nghiệm AI thông minh</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12">Công nghệ AI giúp bạn tìm việc nhanh hơn, phù hợp hơn và hiệu quả hơn</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group">
              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition">
                <f.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;