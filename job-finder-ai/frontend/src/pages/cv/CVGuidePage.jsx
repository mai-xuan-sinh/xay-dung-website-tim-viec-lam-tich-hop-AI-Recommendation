import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, 
  ComputerDesktopIcon, 
  CameraIcon, 
  ShoppingBagIcon, 
  HomeModernIcon, 
  TruckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  DocumentTextIcon,
  LightBulbIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const GuideCard = ({ industry, icon: Icon, color, tips, samples, doList, dontList }) => {
  const [expanded, setExpanded] = useState(false);
  
  const colorClasses = {
    cyan: 'from-cyan-500 to-blue-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    orange: 'from-orange-500 to-red-500',
    purple: 'from-purple-500 to-pink-500'
  };
  
  const bgColorClasses = {
    cyan: 'bg-cyan-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50'
  };
  
  const textColorClasses = {
    cyan: 'text-cyan-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600'
  };
  
  return (
    <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${expanded ? 'ring-2 ring-blue-300' : ''}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900">{industry}</h3>
            <p className="text-sm text-gray-500">Hướng dẫn chi tiết viết CV chuyên ngành</p>
          </div>
        </div>
        <div className={`p-2 rounded-full transition-all ${expanded ? 'bg-blue-50' : 'bg-gray-100'}`}>
          {expanded ? (
            <ChevronUpIcon className="h-5 w-5 text-blue-600" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </button>
      
      {expanded && (
        <div className="p-6 pt-0 border-t border-gray-100 animate-fadeIn">
          {/* Tips */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <LightBulbIcon className={`h-5 w-5 ${textColorClasses[color]}`} />
              <h4 className="font-bold text-gray-800">✨ Mẹo viết CV {industry}</h4>
            </div>
            <ul className="space-y-2 ml-6">
              {tips.map((tip, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Sample Content */}
          <div className={`mb-6 ${bgColorClasses[color]} rounded-xl p-4`}>
            <div className="flex items-center space-x-2 mb-3">
              <DocumentTextIcon className={`h-5 w-5 ${textColorClasses[color]}`} />
              <h4 className="font-bold text-gray-800">📄 Nội dung mẫu</h4>
            </div>
            <ul className="space-y-2 ml-6">
              {samples.map((sample, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                  <span className="text-blue-500">•</span>
                  <span>{sample}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
                <h4 className="font-bold text-gray-800">NÊN làm</h4>
              </div>
              <ul className="space-y-2">
                {doList.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <XCircleIcon className="h-5 w-5 text-red-600" />
                <h4 className="font-bold text-gray-800">KHÔNG NÊN làm</h4>
              </div>
              <ul className="space-y-2">
                {dontList.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                    <span className="text-red-500">✗</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CVGuidePage = () => {
  const guides = [
    {
      industry: 'Công nghệ thông tin (IT)',
      icon: ComputerDesktopIcon,
      color: 'cyan',
      tips: [
        'Liệt kê các dự án đã thực hiện, nêu rõ công nghệ sử dụng và kết quả đạt được',
        'Nhấn mạnh kỹ năng lập trình, framework, database, cloud services',
        'Thêm link GitHub, portfolio cá nhân để nhà tuyển dụng tham khảo',
        'Chứng chỉ chuyên môn (AWS, Google Cloud, Microsoft...) là điểm cộng lớn',
        'Thành thạo tiếng Anh (đọc tài liệu, giao tiếp cơ bản)'
      ],
      samples: [
        'Kinh nghiệm làm việc với React, Node.js, Python trong 3 năm',
        'Đã triển khai thành công 5+ dự án web hoàn chỉnh từ frontend đến backend',
        'Tham gia phát triển hệ thống quản lý với 10.000+ người dùng',
        'Tối ưu hiệu suất website giảm 40% thời gian tải trang',
        'Đóng góp vào dự án open source với 100+ stars trên GitHub'
      ],
      doList: [
        'Sử dụng số liệu cụ thể để chứng minh thành tích',
        'Thêm link GitHub, LinkedIn, Portfolio',
        'Cập nhật kỹ năng mới nhất theo xu hướng',
        'Trình bày rõ ràng, có cấu trúc'
      ],
      dontList: [
        'Liệt kê quá nhiều kỹ năng không liên quan',
        'Sao chép CV mẫu không chỉnh sửa',
        'Bỏ qua phần mô tả dự án',
        'Để lỗi chính tả và ngữ pháp'
      ]
    },
    {
      industry: 'Du lịch - Khách sạn',
      icon: CameraIcon,
      color: 'green',
      tips: [
        'Nhấn mạnh kỹ năng giao tiếp và ngoại ngữ (tiếng Anh, tiếng Hàn, tiếng Nhật...)',
        'Liệt kê kinh nghiệm làm việc với khách quốc tế',
        'Thể hiện sự thân thiện, chu đáo và kỹ năng xử lý tình huống',
        'Chứng chỉ nghiệp vụ khách sạn, du lịch là điểm cộng',
        'Kinh nghiệm sử dụng phần mềm quản lý khách sạn (PMS)'
      ],
      samples: [
        '3 năm kinh nghiệm lễ tân khách sạn 5 sao tại Đà Nẵng',
        'Tiếng Anh giao tiếp thành thạo (TOEIC 850)',
        'Xử lý thành công 95% khiếu nại của khách hàng',
        'Được khách hàng đánh giá 4.9/5 trên TripAdvisor',
        'Thành thạo Opera PMS, Microsoft Office'
      ],
      doList: [
        'Thể hiện sự chuyên nghiệp và thân thiện',
        'Nhấn mạnh kỹ năng ngoại ngữ',
        'Đưa ra ví dụ xử lý tình huống cụ thể',
        'Cập nhật chứng chỉ nghiệp vụ'
      ],
      dontList: [
        'Thiếu tính chuyên nghiệp trong cách trình bày',
        'Bỏ qua kỹ năng ngoại ngữ',
        'Chỉ liệt kê công việc mà không có thành tích',
        'Sử dụng ảnh đại diện không phù hợp'
      ]
    },
    {
      industry: 'Kinh doanh - Bán hàng',
      icon: ShoppingBagIcon,
      color: 'yellow',
      tips: [
        'Nhấn mạnh thành tích doanh số, phần trăm tăng trưởng cụ thể',
        'Thể hiện kỹ năng đàm phán, thuyết phục khách hàng',
        'Kinh nghiệm quản lý nhóm, chăm sóc khách hàng',
        'Hiểu biết về thị trường và xu hướng',
        'Sử dụng thành thạo CRM, Excel, PowerPoint'
      ],
      samples: [
        'Đạt 120% chỉ tiêu doanh số 3 năm liên tiếp',
        'Phát triển 50+ khách hàng mới, tăng doanh thu 45% trong năm đầu',
        'Quản lý đội nhóm 10 nhân viên, đào tạo thành công 5 nhân viên mới',
        'Xây dựng chiến lược bán hàng giúp tăng thị phần 15%',
        'Đạt giải "Nhân viên xuất sắc" quý 4/2023'
      ],
      doList: [
        'Dùng số liệu cụ thể để chứng minh thành tích',
        'Nhấn mạnh kỹ năng đàm phán và thuyết phục',
        'Thể hiện khả năng làm việc dưới áp lực',
        'Cập nhật kiến thức về CRM, công cụ bán hàng'
      ],
      dontList: [
        'Chỉ liệt kê công việc mà không có kết quả',
        'Nói chung chung, thiếu số liệu cụ thể',
        'Thiếu kỹ năng mềm',
        'Trình bày rối mắt, thiếu logic'
      ]
    },
    {
      industry: 'Xây dựng - Bất động sản',
      icon: HomeModernIcon,
      color: 'orange',
      tips: [
        'Nhấn mạnh các công trình đã tham gia, quy mô dự án',
        'Liệt kê kỹ năng đọc bản vẽ, quản lý công trình',
        'Chứng chỉ an toàn lao động, kỹ sư xây dựng là điểm cộng',
        'Kinh nghiệm quản lý tiến độ, chi phí, chất lượng',
        'Thành thạo phần mềm AutoCAD, Revit, MS Project'
      ],
      samples: [
        'Tham gia thi công 5 công trình cao tầng tại Đà Nẵng',
        'Quản lý đội ngũ 30 công nhân, đảm bảo tiến độ và an toàn',
        'Giảm 15% chi phí vật liệu nhờ tối ưu quy trình thi công',
        'Hoàn thành dự án trước tiến độ 2 tháng',
        'Đạt chứng chỉ an toàn lao động bậc 3'
      ],
      doList: [
        'Nhấn mạnh quy mô dự án đã tham gia',
        'Thể hiện kỹ năng quản lý và lãnh đạo',
        'Cập nhật chứng chỉ chuyên môn',
        'Sử dụng hình ảnh công trình (nếu có)'
      ],
      dontList: [
        'Thiếu thông tin về dự án cụ thể',
        'Bỏ qua chứng chỉ an toàn lao động',
        'Không thể hiện khả năng làm việc nhóm',
        'Trình bày quá sơ sài'
      ]
    },
    {
      industry: 'Dịch vụ - Logistics',
      icon: TruckIcon,
      color: 'purple',
      tips: [
        'Nhấn mạnh kỹ năng phục vụ và chăm sóc khách hàng',
        'Thể hiện sự linh hoạt, chịu áp lực tốt',
        'Kinh nghiệm làm việc theo ca, xử lý tình huống nhanh',
        'Kỹ năng làm việc nhóm, phối hợp hiệu quả',
        'Hiểu biết về quy trình vận hành dịch vụ'
      ],
      samples: [
        '3 năm kinh nghiệm tại chuỗi nhà hàng cao cấp',
        'Xử lý thành công 200+ đơn hàng/ngày trong giờ cao điểm',
        'Được khách hàng khen ngợi về thái độ phục vụ chuyên nghiệp',
        'Đào tạo 15 nhân viên mới về quy trình dịch vụ',
        'Đạt danh hiệu "Nhân viên xuất sắc" 2 năm liên tiếp'
      ],
      doList: [
        'Nhấn mạnh kỹ năng xử lý tình huống',
        'Thể hiện sự kiên nhẫn và chu đáo',
        'Liệt kê các kỹ năng mềm',
        'Cập nhật kiến thức về quy trình dịch vụ'
      ],
      dontList: [
        'Thiếu kỹ năng mềm',
        'Không thể hiện khả năng làm việc nhóm',
        'Bỏ qua kinh nghiệm xử lý khách hàng khó',
        'Trình bày thiếu chuyên nghiệp'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1600')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <BookOpenIcon className="h-5 w-5 text-yellow-400 mr-2" />
              <span className="text-sm text-white">Hướng dẫn chi tiết từ A-Z</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Bí Quyết Viết CV
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Chinh Phục Nhà Tuyển Dụng
              </span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Hướng dẫn chi tiết cách viết CV ấn tượng theo từng ngành nghề,
              giúp bạn nổi bật giữa hàng trăm ứng viên
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Hướng dẫn viết CV</span>
        </div>

        {/* Intro */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <SparklesIcon className="h-10 w-10 text-white" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tại sao CV quan trọng?</h2>
              <p className="text-gray-600">
                CV là ấn tượng đầu tiên của bạn với nhà tuyển dụng. Một CV chuyên nghiệp,
                phù hợp với ngành nghề sẽ giúp bạn tăng 70% cơ hội được gọi phỏng vấn.
                Hãy đầu tư thời gian để tạo CV thật ấn tượng!
              </p>
            </div>
            <Link
              to="/create-cv"
              className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              <span>Tạo CV ngay</span>
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Guides */}
        <div className="space-y-6">
          {guides.map((guide, idx) => (
            <GuideCard key={idx} {...guide} />
          ))}
        </div>

        {/* General Tips */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📝 Lưu ý chung khi viết CV</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                NÊN
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• CV nên dài tối đa 2 trang A4</li>
                <li>• Sử dụng font chữ chuyên nghiệp (Arial, Times New Roman, Calibri)</li>
                <li>• Trình bày rõ ràng, có cấu trúc, dễ đọc</li>
                <li>• Tập trung vào thành tích, kết quả đạt được</li>
                <li>• Kiểm tra chính tả và ngữ pháp trước khi gửi</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <XCircleIcon className="h-5 w-5 text-red-400 mr-2" />
                KHÔNG NÊN
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Viết CV quá dài (trên 3 trang)</li>
                <li>• Sử dụng quá nhiều màu sắc, font chữ rối mắt</li>
                <li>• Chỉ liệt kê công việc mà không có kết quả</li>
                <li>• Để lỗi chính tả, ngữ pháp</li>
                <li>• Sử dụng ảnh đại diện không phù hợp</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVGuidePage;