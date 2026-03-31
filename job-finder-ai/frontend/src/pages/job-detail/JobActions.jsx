import React from 'react';
import { 
  DocumentTextIcon, 
  BookmarkIcon,
  FlagIcon,
  AcademicCapIcon  // Thêm icon cho Quiz
} from '@heroicons/react/24/outline';

const JobActions = ({ onApply, onSave, isSaved, onReport, onQuiz, hasQuiz }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 animate-slideIn">
      <h3 className="font-semibold text-gray-900 mb-4">Hành động</h3>
      <div className="space-y-3">
        <button
          onClick={onApply}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
        >
          <DocumentTextIcon className="h-5 w-5" />
          <span>Ứng tuyển ngay</span>
        </button>
        
        <button
          onClick={onSave}
          className={`w-full py-2.5 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 border ${
            isSaved 
              ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <BookmarkIcon className={`h-5 w-5 ${isSaved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          <span>{isSaved ? 'Đã lưu' : 'Lưu việc làm'}</span>
        </button>
        
        {/* Quiz Button - Chỉ hiển thị cho việc làm nổi bật */}
        {hasQuiz && (
          <button
            onClick={onQuiz}
            className="w-full py-2.5 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 border border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100"
          >
            <AcademicCapIcon className="h-5 w-5" />
            <span>Bài test đánh giá năng lực</span>
          </button>
        )}
        
        <button
          onClick={onReport}
          className="w-full py-2.5 rounded-xl font-medium transition-all border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center space-x-2"
        >
          <FlagIcon className="h-5 w-5" />
          <span>Báo cáo vi phạm</span>
        </button>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Mã tin:</span>
          <span className="text-gray-700 font-mono">JD-2024-001</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-500">Ngày đăng:</span>
          <span className="text-gray-700">15/03/2024</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-gray-500">Hạn nộp:</span>
          <span className="text-red-600 font-medium">15/04/2024</span>
        </div>
      </div>
    </div>
  );
};

export default JobActions;