import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, AcademicCapIcon, BriefcaseIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import HeroGuide from './HeroGuide';
import GuideSection from './GuideSection';
import FAQSection from './FAQSection';
import GuideSidebar from './GuideSidebar';
import './GuidePage.css';

const GuidePage = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const sections = [
    { id: 'intro', title: 'Giới thiệu' },
    { id: 'register', title: 'Đăng ký tài khoản' },
    { id: 'profile', title: 'Tạo hồ sơ & CV' },
    { id: 'search', title: 'Tìm kiếm việc làm' },
    { id: 'apply', title: 'Ứng tuyển' },
    { id: 'ai', title: 'AI gợi ý việc làm' },
    { id: 'interview', title: 'Chuẩn bị phỏng vấn' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroGuide />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Điều hướng nhanh */}
          <div className="lg:w-1/4">
            <GuideSidebar 
              sections={sections} 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 space-y-12">
            <GuideSection id="intro" title="Giới thiệu" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Chào mừng bạn đến với ĐANANG WORK - nền tảng kết nối việc làm thông minh tại Đà Nẵng. 
                  Hướng dẫn này sẽ giúp bạn làm quen với các tính năng và tận dụng tối đa công nghệ AI để tìm kiếm công việc mơ ước.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🎯</div>
                    <p className="font-semibold text-gray-800">Tìm việc nhanh</p>
                    <p className="text-sm text-gray-500">Hơn 1000+ việc làm</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">🤖</div>
                    <p className="font-semibold text-gray-800">Gợi ý thông minh</p>
                    <p className="text-sm text-gray-500">AI phân tích kỹ năng</p>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-4 text-center">
                    <div className="text-3xl mb-2">💼</div>
                    <p className="font-semibold text-gray-800">Kết nối trực tiếp</p>
                    <p className="text-sm text-gray-500">Với nhà tuyển dụng</p>
                  </div>
                </div>
              </div>
            </GuideSection>

            <GuideSection id="register" title="Đăng ký tài khoản" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-gray-600">Để bắt đầu, bạn cần có tài khoản ĐANANG WORK. Quy trình đăng ký rất đơn giản:</p>
                <ol className="mt-4 space-y-3 list-decimal list-inside text-gray-600">
                  <li>Nhấp vào nút <span className="font-medium text-blue-600">"Đăng ký"</span> ở góc phải trên cùng</li>
                  <li>Điền đầy đủ thông tin: Họ tên, Email, Số điện thoại, Mật khẩu</li>
                  <li>Chọn vai trò: <span className="font-medium">Người tìm việc</span> hoặc <span className="font-medium">Nhà tuyển dụng</span></li>
                  <li>Đồng ý với điều khoản và nhấn <span className="font-medium text-blue-600">"Đăng ký"</span></li>
                  <li>Kiểm tra email để xác nhận tài khoản (nếu có)</li>
                </ol>
                <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <p className="text-sm text-yellow-800">💡 Mẹo: Sử dụng email thường xuyên kiểm tra để nhận thông báo việc làm phù hợp.</p>
                </div>
              </div>
            </GuideSection>

            <GuideSection id="profile" title="Tạo hồ sơ & CV" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-gray-600">Hồ sơ là chìa khóa giúp bạn thu hút nhà tuyển dụng. Hãy làm theo các bước sau:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">📝</span>
                      <h4 className="font-semibold text-gray-800">Thông tin cá nhân</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Họ tên đầy đủ</li>
                      <li>✓ Ảnh đại diện chuyên nghiệp</li>
                      <li>✓ Số điện thoại liên hệ</li>
                      <li>✓ Địa chỉ tại Đà Nẵng</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">💼</span>
                      <h4 className="font-semibold text-gray-800">Kinh nghiệm</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Công ty đã làm việc</li>
                      <li>✓ Vị trí công việc</li>
                      <li>✓ Thời gian làm việc</li>
                      <li>✓ Mô tả công việc chi tiết</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">🎓</span>
                      <h4 className="font-semibold text-gray-800">Học vấn</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Trường học</li>
                      <li>✓ Bằng cấp đạt được</li>
                      <li>✓ Chuyên ngành</li>
                      <li>✓ Thời gian học</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">⚡</span>
                      <h4 className="font-semibold text-gray-800">Kỹ năng</h4>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Kỹ năng chuyên môn</li>
                      <li>✓ Kỹ năng mềm</li>
                      <li>✓ Ngoại ngữ</li>
                      <li>✓ Chứng chỉ (nếu có)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">✨ Mẹo: Sử dụng AI của chúng tôi để tối ưu CV, tăng 40% cơ hội trúng tuyển!</p>
                </div>
              </div>
            </GuideSection>

            <GuideSection id="search" title="Tìm kiếm việc làm" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-gray-600">Có nhiều cách để tìm việc làm phù hợp trên ĐANANG WORK:</p>
                <div className="space-y-4 mt-4">
                  <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">🔍</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Tìm kiếm cơ bản</h4>
                      <p className="text-sm text-gray-600">Nhập từ khóa (vị trí, kỹ năng, công ty) và địa điểm để tìm kiếm nhanh</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">🎯</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Lọc nâng cao</h4>
                      <p className="text-sm text-gray-600">Lọc theo ngành nghề, mức lương, kinh nghiệm, loại hình công việc</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-2xl">🤖</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">Gợi ý từ AI</h4>
                      <p className="text-sm text-gray-600">AI sẽ phân tích hồ sơ và gợi ý việc làm phù hợp nhất cho bạn</p>
                    </div>
                  </div>
                </div>
              </div>
            </GuideSection>

            <GuideSection id="apply" title="Ứng tuyển" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-gray-600">Khi tìm được công việc phù hợp, hãy ứng tuyển ngay:</p>
                <ol className="mt-4 space-y-3 list-decimal list-inside text-gray-600">
                  <li>Nhấp vào nút <span className="font-medium text-blue-600">"Xem chi tiết"</span> để xem thông tin công việc</li>
                  <li>Đọc kỹ mô tả, yêu cầu và phúc lợi</li>
                  <li>Nhấp vào nút <span className="font-medium text-blue-600">"Ứng tuyển"</span></li>
                  <li>Điền thông tin liên hệ và tải lên CV của bạn</li>
                  <li>Viết thư giới thiệu ngắn gọn, ấn tượng</li>
                  <li>Nhấp <span className="font-medium text-blue-600">"Gửi ứng tuyển"</span> và chờ phản hồi</li>
                </ol>
                <div className="mt-4 p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-800">📌 Lưu ý: Bạn có thể lưu việc làm để ứng tuyển sau bằng nút ⭐ bên cạnh mỗi bài đăng.</p>
                </div>
              </div>
            </GuideSection>

            <GuideSection id="ai" title="AI gợi ý việc làm" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-gray-600">Công nghệ AI của chúng tôi sẽ giúp bạn tìm việc thông minh hơn:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="text-2xl mb-2">📊</div>
                    <h4 className="font-semibold text-gray-800">Phân tích hồ sơ</h4>
                    <p className="text-sm text-gray-600 mt-1">AI đọc và hiểu kỹ năng, kinh nghiệm của bạn</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-semibold text-gray-800">Gợi ý cá nhân hóa</h4>
                    <p className="text-sm text-gray-600 mt-1">Nhận việc làm phù hợp nhất với profile của bạn</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="text-2xl mb-2">📈</div>
                    <h4 className="font-semibold text-gray-800">Xu hướng thị trường</h4>
                    <p className="text-sm text-gray-600 mt-1">Cập nhật kỹ năng và ngành nghề hot</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4">
                    <div className="text-2xl mb-2">✨</div>
                    <h4 className="font-semibold text-gray-800">Tối ưu CV</h4>
                    <p className="text-sm text-gray-600 mt-1">Gợi ý cải thiện CV để nổi bật hơn</p>
                  </div>
                </div>
              </div>
            </GuideSection>

            <GuideSection id="interview" title="Chuẩn bị phỏng vấn" setActiveSection={setActiveSection}>
              <div className="prose max-w-none">
                <p className="text-gray-600">Chúc mừng! Bạn đã được mời phỏng vấn. Dưới đây là một số mẹo:</p>
                <ul className="mt-4 space-y-3 list-disc list-inside text-gray-600">
                  <li>📝 Nghiên cứu kỹ về công ty và vị trí ứng tuyển</li>
                  <li>👔 Ăn mặc lịch sự, chuyên nghiệp</li>
                  <li>⏰ Đến sớm 10-15 phút trước giờ hẹn</li>
                  <li>📋 Chuẩn bị sẵn CV và portfolio (nếu có)</li>
                  <li>💬 Trả lời trung thực, tự tin và thể hiện đam mê</li>
                  <li>❓ Chuẩn bị câu hỏi cho nhà tuyển dụng</li>
                  <li>📧 Gửi email cảm ơn sau buổi phỏng vấn</li>
                </ul>
                <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                  <p className="text-sm text-purple-800">🎯 Mẹo: Hãy thể hiện sự hiểu biết về văn hóa công ty và cách bạn có thể đóng góp.</p>
                </div>
              </div>
            </GuideSection>

            {/* FAQ Section */}
            <FAQSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;