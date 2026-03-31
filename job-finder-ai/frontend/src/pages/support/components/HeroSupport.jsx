// src/pages/support/components/HeroSupport.jsx
import React from 'react';
import { LifebuoyIcon, ChatBubbleLeftRightIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const HeroSupport = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
            <LifebuoyIcon className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-sm text-white">Hỗ trợ 24/7</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Chúng tôi luôn sẵn sàng
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              giúp đỡ bạn
            </span>
          </h1>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Có bất kỳ câu hỏi hay vấn đề nào? Đội ngũ hỗ trợ của chúng tôi luôn ở đây để giúp bạn 24/7.
            Hãy liên hệ với chúng tôi qua các kênh bên dưới.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center space-x-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <PhoneIcon className="h-5 w-5" />
              <span>Hotline: 1900 1234</span>
            </div>
            <div className="flex items-center space-x-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <EnvelopeIcon className="h-5 w-5" />
              <span>Email: support@danangwork.vn</span>
            </div>
            <div className="flex items-center space-x-2 text-white bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              <span>Chat trực tuyến</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSupport;