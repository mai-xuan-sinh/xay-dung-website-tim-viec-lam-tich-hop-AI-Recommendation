import React from 'react';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const NewsletterSection = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <EnvelopeIcon className="h-7 w-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Nhận thông báo việc làm</h3>
                <p className="text-gray-500">Cập nhật việc làm mới nhất mỗi ngày</p>
              </div>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input type="email" placeholder="Email của bạn" className="flex-1 px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200" />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition whitespace-nowrap">
                Đăng ký
              </button>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-gray-400">
            <span className="flex items-center"><CheckCircleIcon className="h-3 w-3 mr-1" /> Miễn phí 100%</span>
            <span className="flex items-center"><CheckCircleIcon className="h-3 w-3 mr-1" /> Hủy bất cứ lúc nào</span>
            <span className="flex items-center"><CheckCircleIcon className="h-3 w-3 mr-1" /> Không spam</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;