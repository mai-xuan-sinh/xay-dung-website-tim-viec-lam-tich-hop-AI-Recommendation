// src/pages/support/components/FAQSection.jsx
import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/24/outline';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems({
      ...openItems,
      [id]: !openItems[id]
    });
  };

  const categories = [
    { id: 'all', name: 'Tất cả', icon: '📋' },
    { id: 'account', name: 'Tài khoản', icon: '👤' },
    { id: 'cv', name: 'Tạo CV', icon: '📄' },
    { id: 'job', name: 'Tìm việc', icon: '🔍' },
    { id: 'apply', name: 'Ứng tuyển', icon: '📝' },
    { id: 'ai', name: 'AI Recommendation', icon: '🤖' },
    { id: 'payment', name: 'Thanh toán', icon: '💰' },
    { id: 'security', name: 'Bảo mật', icon: '🔒' }
  ];

  const faqs = [
    // Tài khoản & Đăng nhập
    {
      id: 'acc-1',
      category: 'account',
      question: 'Làm thế nào để đăng ký tài khoản?',
      answer: 'Bạn có thể đăng ký tài khoản bằng cách nhấn vào nút "Đăng ký" ở góc phải trên cùng. Điền đầy đủ thông tin họ tên, email, số điện thoại và mật khẩu. Sau đó nhấn "Đăng ký" để hoàn tất. Bạn sẽ nhận được email xác nhận và có thể đăng nhập ngay sau đó.'
    },
    {
      id: 'acc-2',
      category: 'account',
      question: 'Tôi quên mật khẩu phải làm sao?',
      answer: 'Bạn có thể nhấn vào "Quên mật khẩu" trên trang đăng nhập. Nhập email đã đăng ký, hệ thống sẽ gửi link đặt lại mật khẩu qua email của bạn. Hãy kiểm tra cả hộp thư Spam nếu không thấy email.'
    },
    {
      id: 'acc-3',
      category: 'account',
      question: 'Làm sao để đổi mật khẩu?',
      answer: 'Đăng nhập vào tài khoản, vào phần "Hồ sơ cá nhân" sau đó chọn "Cài đặt" hoặc "Đổi mật khẩu". Nhập mật khẩu cũ và mật khẩu mới (tối thiểu 6 ký tự, bao gồm chữ và số) để hoàn tất.'
    },
    {
      id: 'acc-4',
      category: 'account',
      question: 'Tôi có thể xóa tài khoản không?',
      answer: 'Có, bạn có thể yêu cầu xóa tài khoản bằng cách gửi email đến support@danangwork.vn với tiêu đề "Yêu cầu xóa tài khoản". Vui lòng cung cấp email đăng ký và lý do xóa. Tài khoản sẽ được xóa trong vòng 7 ngày làm việc.'
    },

    // Tạo CV
    {
      id: 'cv-1',
      category: 'cv',
      question: 'Có bao nhiêu mẫu CV để lựa chọn?',
      answer: 'Hiện tại chúng tôi có hơn 40 mẫu CV khác nhau, bao gồm: 5 mẫu phong cách Tối giản, 5 mẫu phong cách Hiện đại, 5 mẫu phong cách Chuyên nghiệp, và 25 mẫu theo ngành (IT, Du lịch, Kinh doanh, Xây dựng, Dịch vụ). Mỗi mẫu đều được thiết kế chuyên nghiệp, phù hợp với từng lĩnh vực.'
    },
    {
      id: 'cv-2',
      category: 'cv',
      question: 'Tôi có thể tải CV dưới dạng PDF không?',
      answer: 'Có, sau khi hoàn thành CV, bạn có thể nhấn nút "Tải PDF" ở góc phải màn hình xem trước. CV sẽ được xuất ra dưới dạng PDF chất lượng cao, sẵn sàng để gửi cho nhà tuyển dụng hoặc in ấn.'
    },
    {
      id: 'cv-3',
      category: 'cv',
      question: 'CV có thể chỉnh sửa sau khi đã tạo không?',
      answer: 'Có, bạn có thể vào phần "Hồ sơ cá nhân" để chỉnh sửa thông tin bất cứ lúc nào. CV sẽ tự động cập nhật theo thông tin mới nhất. Bạn cũng có thể lưu nhiều phiên bản CV khác nhau.'
    },
    {
      id: 'cv-4',
      category: 'cv',
      question: 'Làm thế nào để thêm ảnh đại diện vào CV?',
      answer: 'Khi tạo CV, bạn sẽ thấy phần ảnh đại diện ở đầu mẫu. Click vào khu vực ảnh để tải ảnh lên từ máy tính. Nên chọn ảnh thẻ hoặc ảnh chân dung lịch sự, kích thước tối thiểu 300x300px.'
    },

    // Tìm việc làm
    {
      id: 'job-1',
      category: 'job',
      question: 'Làm thế nào để tìm kiếm việc làm hiệu quả?',
      answer: 'Bạn có thể nhập từ khóa (vị trí, kỹ năng, công ty) vào ô tìm kiếm trên trang chủ. Sử dụng bộ lọc theo ngành, địa điểm, mức lương, kinh nghiệm để thu hẹp kết quả. Nên lưu lại các tìm kiếm thường xuyên để nhận thông báo việc làm mới.'
    },
    {
      id: 'job-2',
      category: 'job',
      question: 'AI Recommendation hoạt động như thế nào?',
      answer: 'AI sẽ phân tích hồ sơ của bạn (kỹ năng, kinh nghiệm, học vấn, vị trí mong muốn) để gợi ý những việc làm phù hợp nhất. Hãy cập nhật đầy đủ thông tin để nhận gợi ý chính xác. Độ chính xác của AI lên đến 90%.'
    },
    {
      id: 'job-3',
      category: 'job',
      question: 'Làm sao để nhận thông báo việc làm mới?',
      answer: 'Đăng ký nhận bản tin qua email bằng cách nhập email vào form "Nhận thông báo việc làm" ở cuối trang chủ. Bạn cũng có thể bật thông báo trình duyệt để nhận việc làm mới ngay khi đăng tải.'
    },

    // Ứng tuyển
    {
      id: 'apply-1',
      category: 'apply',
      question: 'Có thể ứng tuyển bao nhiêu công việc cùng lúc?',
      answer: 'Không giới hạn! Bạn có thể ứng tuyển vào bất kỳ công việc nào phù hợp với năng lực của mình. Chúng tôi khuyên bạn nên tập trung vào những vị trí thực sự phù hợp để tăng cơ hội thành công.'
    },
    {
      id: 'apply-2',
      category: 'apply',
      question: 'Làm sao để biết nhà tuyển dụng đã xem hồ sơ?',
      answer: 'Bạn sẽ nhận được thông báo qua email và trong phần "Đơn ứng tuyển" khi nhà tuyển dụng xem hồ sơ hoặc cập nhật trạng thái đơn ứng tuyển. Bạn có thể theo dõi trạng thái: "Đã gửi" → "Đã xem" → "Đã lọc" → "Phỏng vấn" → "Trúng tuyển/Từ chối".'
    },
    {
      id: 'apply-3',
      category: 'apply',
      question: 'Tôi có thể rút lại đơn ứng tuyển không?',
      answer: 'Có, bạn có thể rút lại đơn ứng tuyển trong vòng 24 giờ sau khi gửi. Vào phần "Đơn ứng tuyển", chọn công việc muốn rút và nhấn "Rút đơn". Sau 24 giờ, bạn cần liên hệ trực tiếp với nhà tuyển dụng qua email được cung cấp.'
    },

    // AI Recommendation
    {
      id: 'ai-1',
      category: 'ai',
      question: 'AI Recommendation có chính xác không?',
      answer: 'AI của chúng tôi được đào tạo trên dữ liệu thực tế và liên tục cập nhật. Độ chính xác lên đến 90% khi bạn cung cấp đầy đủ thông tin hồ sơ. AI sẽ học hỏi từ hành vi ứng tuyển của bạn để cải thiện độ chính xác theo thời gian.'
    },
    {
      id: 'ai-2',
      category: 'ai',
      question: 'Làm thế nào để AI gợi ý tốt hơn?',
      answer: 'Để AI gợi ý chính xác, bạn nên: 1) Cập nhật đầy đủ kỹ năng chuyên môn, 2) Mô tả chi tiết kinh nghiệm làm việc và thành tích, 3) Điền thông tin học vấn, 4) Xác định rõ vị trí mong muốn, 5) Tương tác với các gợi ý (thích, bỏ qua) để AI học hỏi.'
    },
    {
      id: 'ai-3',
      category: 'ai',
      question: 'AI có phân tích được CV tải lên không?',
      answer: 'Có, AI có thể phân tích CV bạn tải lên để trích xuất thông tin và gợi ý việc làm phù hợp. Hỗ trợ các định dạng PDF, DOC, DOCX. AI sẽ đọc và hiểu các kỹ năng, kinh nghiệm, học vấn từ CV của bạn.'
    },

    // Thanh toán & Gói dịch vụ
    {
      id: 'payment-1',
      category: 'payment',
      question: 'Dịch vụ có hoàn toàn miễn phí không?',
      answer: 'ĐANANG WORK cung cấp các tính năng cơ bản hoàn toàn miễn phí cho người tìm việc. Các gói nâng cao (như tạo CV không giới hạn, ưu tiên hiển thị hồ sơ) sẽ có phí. Nhà tuyển dụng cần đăng ký gói dịch vụ để đăng tin tuyển dụng.'
    },
    {
      id: 'payment-2',
      category: 'payment',
      question: 'Có những phương thức thanh toán nào?',
      answer: 'Chúng tôi hỗ trợ thanh toán qua: Chuyển khoản ngân hàng, Ví MoMo, ZaloPay, Thẻ tín dụng/ghi nợ (Visa, Mastercard), và thanh toán tại văn phòng. Thanh toán trực tuyến được xử lý an toàn qua cổng thanh toán bảo mật.'
    },

    // Bảo mật & Quyền riêng tư
    {
      id: 'security-1',
      category: 'security',
      question: 'Thông tin cá nhân của tôi có được bảo mật không?',
      answer: 'Tất cả thông tin của bạn đều được mã hóa SSL và lưu trữ an toàn. Chúng tôi cam kết không chia sẻ thông tin với bên thứ ba khi chưa có sự đồng ý của bạn. Bạn có thể kiểm soát quyền hiển thị thông tin trong phần "Cài đặt bảo mật".'
    },
    {
      id: 'security-2',
      category: 'security',
      question: 'Làm sao để ẩn hồ sơ khỏi một số nhà tuyển dụng?',
      answer: 'Bạn có thể chọn chế độ "Ẩn hồ sơ" trong phần Cài đặt bảo mật. Hồ sơ của bạn sẽ không hiển thị trong kết quả tìm kiếm của nhà tuyển dụng. Bạn vẫn có thể chủ động ứng tuyển vào các công việc mong muốn.'
    },
    {
      id: 'security-3',
      category: 'security',
      question: 'Thông tin thanh toán có an toàn không?',
      answer: 'Chúng tôi sử dụng cổng thanh toán uy tín và tuân thủ tiêu chuẩn bảo mật PCI DSS. Thông tin thẻ tín dụng được mã hóa và không lưu trữ trên hệ thống của chúng tôi. Mọi giao dịch đều được xác thực hai lớp.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Câu hỏi thường gặp
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tìm câu trả lời cho những thắc mắc phổ biến nhất về dịch vụ của chúng tôi
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm câu hỏi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 bg-white"
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-gray-500">Không tìm thấy câu hỏi phù hợp với từ khóa "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              Xóa tìm kiếm
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full flex justify-between items-center p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                {openItems[faq.id] ? (
                  <ChevronUpIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openItems[faq.id] && (
                <div className="px-5 pb-5 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Video Quick Tips */}
      <div className="max-w-3xl mx-auto mt-12">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <PlayIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-2">Video hướng dẫn nhanh</h3>
              <p className="text-sm text-gray-600 mb-4">
                Xem các video ngắn để hiểu rõ hơn về cách sử dụng các tính năng của ĐANANG WORK
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    // Có thể mở modal video hoặc chuyển hướng đến trang video
                    alert('Tính năng đang phát triển!');
                  }}
                >
                  <PlayIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Cách tạo CV</span>
                </a>
                <span className="text-gray-300">•</span>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Tính năng đang phát triển!');
                  }}
                >
                  <PlayIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Cách tìm việc hiệu quả</span>
                </a>
                <span className="text-gray-300">•</span>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Tính năng đang phát triển!');
                  }}
                >
                  <PlayIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Sử dụng AI Recommendation</span>
                </a>
                <span className="text-gray-300">•</span>
                <a 
                  href="#" 
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1 group"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Tính năng đang phát triển!');
                  }}
                >
                  <PlayIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Mẹo phỏng vấn thành công</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Still Need Help */}
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">Vẫn còn thắc mắc?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
          </p>
          <button
            onClick={() => {
              const contactSection = document.querySelector('#contact-channels');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/support';
              }
            }}
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span>Liên hệ hỗ trợ</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FAQSection;