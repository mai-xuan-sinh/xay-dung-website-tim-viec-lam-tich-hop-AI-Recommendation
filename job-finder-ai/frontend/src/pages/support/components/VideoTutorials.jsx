// src/pages/support/components/VideoTutorials.jsx
import React, { useState } from 'react';
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline';

const VideoTutorials = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Cách tạo CV chuyên nghiệp',
      duration: '8:23',
      thumbnail: 'https://img.youtube.com/vi/y8Yv4cqO6pY/maxresdefault.jpg',
      embedId: 'y8Yv4cqO6pY',
      description: 'Hướng dẫn chi tiết cách tạo CV ấn tượng với nhiều mẫu thiết kế chuyên nghiệp, bố cục rõ ràng, thu hút nhà tuyển dụng.'
    },
    {
      id: 2,
      title: 'Cách tìm kiếm việc làm hiệu quả',
      duration: '7:15',
      thumbnail: 'https://img.youtube.com/vi/6TlHjzY7aLE/maxresdefault.jpg',
      embedId: '6TlHjzY7aLE',
      description: 'Mẹo tìm kiếm việc làm phù hợp với kỹ năng của bạn, cách sử dụng từ khóa và bộ lọc hiệu quả.'
    },
    {
      id: 3,
      title: 'Sử dụng AI Recommendation',
      duration: '6:42',
      thumbnail: 'https://img.youtube.com/vi/5s_EYuHn9ms/maxresdefault.jpg',
      embedId: '5s_EYuHn9ms',
      description: 'Cách tận dụng AI để nhận gợi ý việc làm chính xác nhất, phân tích hồ sơ và đề xuất công việc phù hợp.'
    },
    {
      id: 4,
      title: 'Cách ứng tuyển thành công',
      duration: '9:05',
      thumbnail: 'https://img.youtube.com/vi/4JkIs6aeW5A/maxresdefault.jpg',
      embedId: '4JkIs6aeW5A',
      description: 'Bí quyết để hồ sơ của bạn nổi bật giữa hàng trăm ứng viên, cách viết cover letter ấn tượng và chuẩn bị phỏng vấn.'
    },
    {
      id: 5,
      title: 'Quản lý hồ sơ cá nhân',
      duration: '5:30',
      thumbnail: 'https://img.youtube.com/vi/7qQrT_LJxvM/maxresdefault.jpg',
      embedId: '7qQrT_LJxvM',
      description: 'Cách cập nhật và quản lý thông tin hồ sơ hiệu quả, theo dõi quá trình ứng tuyển và nhận thông báo.'
    },
    {
      id: 6,
      title: 'Phân tích thị trường lao động 2026',
      duration: '10:15',
      thumbnail: 'https://img.youtube.com/vi/8nRWYpG8k6A/maxresdefault.jpg',
      embedId: '8nRWYpG8k6A',
      description: 'Xu hướng tuyển dụng và kỹ năng hot năm 2026, những ngành nghề có nhu cầu cao và mức lương hấp dẫn.'
    },
    {
      id: 7,
      title: 'Kỹ năng phỏng vấn xin việc',
      duration: '12:30',
      thumbnail: 'https://img.youtube.com/vi/T1E5Wv5Z8q0/maxresdefault.jpg',
      embedId: 'T1E5Wv5Z8q0',
      description: 'Bí quyết trả lời phỏng vấn thành công, cách xử lý câu hỏi khó và gây ấn tượng với nhà tuyển dụng.'
    },
    {
      id: 8,
      title: 'Xây dựng thương hiệu cá nhân',
      duration: '7:45',
      thumbnail: 'https://img.youtube.com/vi/9xYdXyXzY5M/maxresdefault.jpg',
      embedId: '9xYdXyXzY5M',
      description: 'Cách xây dựng thương hiệu cá nhân trên LinkedIn và các nền tảng mạng xã hội chuyên nghiệp.'
    },
    {
      id: 9,
      title: 'Xu hướng việc làm remote',
      duration: '8:20',
      thumbnail: 'https://img.youtube.com/vi/0g5HvqA8x8Q/maxresdefault.jpg',
      embedId: '0g5HvqA8x8Q',
      description: 'Cơ hội việc làm từ xa, kỹ năng cần có để làm việc hiệu quả và tìm kiếm công việc remote uy tín.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Video hướng dẫn
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Xem các video hướng dẫn chi tiết để sử dụng thành thạo các tính năng và nâng cao cơ hội việc làm
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://img.youtube.com/vi/' + video.embedId + '/mqdefault.jpg';
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <PlayIcon className="h-7 w-7 text-blue-600 ml-1" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                {video.duration}
              </div>
              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                YouTube
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{video.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{video.description}</p>
              <div className="mt-3 flex items-center text-xs text-gray-400">
                <span>▶️ Xem ngay</span>
                <span className="mx-2">•</span>
                <span>{video.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fadeIn" onClick={() => setSelectedVideo(null)}>
          <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <div>
                <h3 className="font-bold text-gray-900">{selectedVideo.title}</h3>
                <p className="text-xs text-gray-500">{selectedVideo.duration}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="aspect-video bg-gray-900">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.embedId}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <p className="text-gray-600 text-sm">{selectedVideo.description}</p>
              <div className="mt-3 flex items-center space-x-4 text-xs text-gray-400">
                <span>📺 YouTube</span>
                <span>⏱️ {selectedVideo.duration}</span>
                <span>👥 Hữu ích cho người tìm việc</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default VideoTutorials;