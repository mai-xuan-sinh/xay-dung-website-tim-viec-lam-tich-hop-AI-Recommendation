import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const BlogCard = ({ post }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs text-white bg-blue-600/80 px-2 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            {post.date}
          </span>
          <span className="flex items-center">
            <UserIcon className="h-3 w-3 mr-1" />
            {post.author}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        <Link to={`/blog/${post.id}`} className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group">
          <span>Đọc tiếp</span>
          <ArrowRightIcon className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const BlogPreview = () => {
  const posts = [
    {
      id: 1,
      title: "Xu hướng tuyển dụng IT 2026: Những kỹ năng được săn đón nhất",
      excerpt: "AI, Machine Learning, và Blockchain đang thống trị thị trường lao động IT trong năm 2026...",
      category: "Xu hướng",
      date: "15/03/2026",
      author: "Đội ngũ DANANG WORK"
    },
    {
      id: 2,
      title: "Bí quyết viết CV ấn tượng thu hút nhà tuyển dụng",
      excerpt: "Những mẹo đơn giản giúp CV của bạn nổi bật giữa hàng trăm ứng viên khác...",
      category: "Hướng dẫn",
      date: "12/03/2026",
      author: "Chuyên gia CV"
    },
    {
      id: 3,
      title: "Top 10 công ty có môi trường làm việc tốt nhất Đà Nẵng 2026",
      excerpt: "Danh sách những công ty được đánh giá cao về văn hóa doanh nghiệp và phúc lợi...",
      category: "Đánh giá",
      date: "10/03/2026",
      author: "Đội ngũ đánh giá"
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Bài viết <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">nổi bật</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cập nhật những thông tin mới nhất về thị trường lao động và bí quyết thành công
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/blog"
            className="inline-flex items-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
          >
            <span>Xem tất cả bài viết</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPreview;