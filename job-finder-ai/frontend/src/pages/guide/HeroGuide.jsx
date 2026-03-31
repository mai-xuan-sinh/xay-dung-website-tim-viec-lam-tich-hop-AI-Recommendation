import React from 'react';
import { BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';

const HeroGuide = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
            <BookOpenIcon className="h-5 w-5 text-white" />
            <span className="text-sm text-white">Hướng dẫn sử dụng</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Bắt đầu hành trình
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              tìm việc thành công
            </span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Hướng dẫn chi tiết từ A-Z giúp bạn làm quen và sử dụng hiệu quả các tính năng của ĐANANG WORK
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroGuide;