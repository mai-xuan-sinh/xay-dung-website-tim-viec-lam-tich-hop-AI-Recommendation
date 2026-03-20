// ===========================================
// DỮ LIỆU VIỆC LÀM LĨNH VỰC KINH DOANH - PHỔ THÔNG
// ===========================================

export const businessJobs = [
  // ========== NHÓM BÁN HÀNG TRỰC TIẾP ==========
  {
    id: "BUS-SALE-001",
    title: "Nhân viên bán hàng (shop quần áo, điện thoại)",
    company: "Thế Giới Di Động",
    location: "Hải Châu",
    salary: "7-12M + hoa hồng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tư vấn và bán sản phẩm tại cửa hàng, chăm sóc khách hàng, trưng bày sản phẩm",
    requirements: [
      "Ngoại hình khá, giao tiếp tốt",
      "Năng động, nhiệt tình",
      "Có kỹ năng bán hàng",
      "Ưu tiên có kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm đầy đủ",
      "Đồng phục",
      "Thưởng doanh thu"
    ],
    skills: ["Bán hàng", "Tư vấn", "Giao tiếp", "Chăm sóc khách"],
    logo: "🛒",
    hot: true,
    category: "business",
    subCategory: "retail",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "BUS-SALE-002",
    title: "Nhân viên tư vấn tại cửa hàng",
    company: "CellphoneS",
    location: "Hải Châu",
    salary: "6-10M + thưởng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tư vấn sản phẩm, hỗ trợ khách hàng, giải đáp thắc mắc về sản phẩm",
    requirements: [
      "Hiểu biết về sản phẩm",
      "Giao tiếp tốt",
      "Kiên nhẫn, thân thiện",
      "Ngoại hình ưa nhìn"
    ],
    benefits: [
      "Lương cơ bản + thưởng",
      "Bảo hiểm",
      "Đào tạo sản phẩm",
      "Thưởng lễ Tết"
    ],
    skills: ["Tư vấn", "Giao tiếp", "Hiểu sản phẩm", "Kiên nhẫn"],
    logo: "💬",
    hot: false,
    category: "business",
    subCategory: "retail",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "BUS-SALE-003",
    title: "Thu ngân",
    company: "Lotte Mart Đà Nẵng",
    location: "Hải Châu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tính tiền, xuất hóa đơn, kiểm kê, hỗ trợ bán hàng",
    requirements: [
      "Trung thực, cẩn thận",
      "Biết sử dụng máy tính",
      "Nhanh nhẹn, chính xác",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cứng + phụ cấp ca",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Thu ngân", "Tính toán", "Trung thực", "Vi tính"],
    logo: "💵",
    hot: false,
    category: "business",
    subCategory: "retail",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "BUS-SALE-004",
    title: "Nhân viên trưng bày sản phẩm (Merchandiser)",
    company: "Unilever",
    location: "Liên Chiểu",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Trưng bày sản phẩm tại các điểm bán, kiểm tra hàng hóa, chụp ảnh báo cáo",
    requirements: [
      "Sức khỏe tốt",
      "Có thể đi lại nhiều",
      "Cẩn thận, tỉ mỉ",
      "Có xe máy"
    ],
    benefits: [
      "Lương cứng + phụ cấp xăng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Trưng bày", "Sắp xếp", "Quan sát", "Báo cáo"],
    logo: "📦",
    hot: false,
    category: "business",
    subCategory: "retail",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "BUS-SALE-005",
    title: "Nhân viên phát hàng dùng thử",
    company: "P&G",
    location: "Hải Châu",
    salary: "5-7M + thưởng",
    type: "Part-time/Full-time",
    experience: "0 năm",
    level: "Nhân viên",
    description: "Phát hàng mẫu dùng thử tại các điểm đông người, tư vấn sản phẩm",
    requirements: [
      "Năng động, thân thiện",
      "Giao tiếp tốt",
      "Có thể đứng nhiều",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương theo giờ + thưởng",
      "Đào tạo sản phẩm",
      "Thời gian linh hoạt",
      "Phù hợp sinh viên"
    ],
    skills: ["Phát hàng", "Tư vấn", "Năng động", "Giao tiếp"],
    logo: "🎁",
    hot: false,
    category: "business",
    subCategory: "retail",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== NHÓM TELESALES – CHĂM SÓC KHÁCH ==========
  {
    id: "BUS-TELE-001",
    title: "Nhân viên telesales",
    company: "VNPT Đà Nẵng",
    location: "Thanh Khê",
    salary: "6-12M + hoa hồng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Gọi điện tư vấn sản phẩm, chốt đơn hàng, chăm sóc khách hàng",
    requirements: [
      "Giọng nói dễ nghe",
      "Kỹ năng giao tiếp qua điện thoại",
      "Kiên nhẫn, chịu áp lực",
      "Sử dụng máy tính cơ bản"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng doanh số"
    ],
    skills: ["Telesales", "Giao tiếp", "Kiên nhẫn", "Chốt đơn"],
    logo: "📞",
    hot: true,
    category: "business",
    subCategory: "telesales",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "BUS-TELE-002",
    title: "Nhân viên chăm sóc khách hàng (CSKH)",
    company: "Viettel",
    location: "Hải Châu",
    salary: "7-10M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tiếp nhận và xử lý khiếu nại, giải đáp thắc mắc, chăm sóc khách hàng",
    requirements: [
      "Giọng nói truyền cảm",
      "Kiên nhẫn, lắng nghe",
      "Kỹ năng xử lý tình huống",
      "Sử dụng vi tính"
    ],
    benefits: [
      "Lương cứng + thưởng",
      "Bảo hiểm",
      "Đào tạo kỹ năng",
      "Thưởng tháng 13"
    ],
    skills: ["CSKH", "Xử lý tình huống", "Lắng nghe", "Giải quyết vấn đề"],
    logo: "💬",
    hot: true,
    category: "business",
    subCategory: "telesales",
    featured: true,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "BUS-TELE-003",
    title: "Nhân viên gọi điện tư vấn",
    company: "BIDV Insurance",
    location: "Hải Châu",
    salary: "6-10M + thưởng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Gọi điện tư vấn bảo hiểm, giới thiệu sản phẩm, lấy thông tin khách hàng",
    requirements: [
      "Giọng nói dễ nghe",
      "Kỹ năng giao tiếp",
      "Kiên trì",
      "Không ngại từ chối"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đào tạo sản phẩm",
      "Thưởng doanh số"
    ],
    skills: ["Tư vấn", "Giao tiếp", "Kiên trì", "Thuyết phục"],
    logo: "📱",
    hot: false,
    category: "business",
    subCategory: "telesales",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "BUS-TELE-004",
    title: "Nhân viên chốt đơn online",
    company: "Haravan",
    location: "Ngũ Hành Sơn",
    salary: "7-12M + hoa hồng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Xử lý đơn hàng online, gọi xác nhận, chăm sóc sau bán",
    requirements: [
      "Nhanh nhẹn, cẩn thận",
      "Giao tiếp tốt",
      "Sử dụng máy tính",
      "Có kinh nghiệm bán hàng online"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Chốt đơn", "Xử lý đơn", "Giao tiếp", "Vi tính"],
    logo: "🛍️",
    hot: true,
    category: "business",
    subCategory: "telesales",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== NHÓM BÁN HÀNG ONLINE ==========
  {
    id: "BUS-ONLINE-001",
    title: "Nhân viên bán hàng online (Facebook, Shopee)",
    company: "Shopee Đà Nẵng",
    location: "Hải Châu",
    salary: "6-10M + hoa hồng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Quản lý gian hàng online, tư vấn khách, xử lý đơn hàng",
    requirements: [
      "Hiểu về các nền tảng TMĐT",
      "Kỹ năng tư vấn online",
      "Sử dụng máy tính tốt",
      "Chăm sóc khách hàng"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Làm việc online linh hoạt",
      "Thưởng doanh số"
    ],
    skills: ["Bán hàng online", "Tư vấn", "Xử lý đơn", "Vi tính"],
    logo: "📱",
    hot: true,
    category: "business",
    subCategory: "online",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "BUS-ONLINE-002",
    title: "Nhân viên livestream bán hàng",
    company: "TikTok Shop Đà Nẵng",
    location: "Hải Châu",
    salary: "8-15M + hoa hồng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Livestream giới thiệu sản phẩm, tương tác khách hàng, chốt đơn",
    requirements: [
      "Tự tin trước ống kính",
      "Ngoại hình ưa nhìn",
      "Kỹ năng giao tiếp tốt",
      "Có khả năng thuyết phục"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng theo lượt xem"
    ],
    skills: ["Livestream", "Giao tiếp", "Thuyết phục", "Bán hàng"],
    logo: "🎥",
    hot: true,
    category: "business",
    subCategory: "online",
    featured: true,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "BUS-ONLINE-003",
    title: "Nhân viên xử lý đơn hàng",
    company: "Lazada",
    location: "Liên Chiểu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "In đơn, đóng gói, kiểm hàng, gửi hàng cho đối tác vận chuyển",
    requirements: [
      "Cẩn thận, tỉ mỉ",
      "Sức khỏe tốt",
      "Làm việc nhóm",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Đóng gói", "Kiểm hàng", "Cẩn thận", "Tổ chức"],
    logo: "📦",
    hot: false,
    category: "business",
    subCategory: "online",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "BUS-ONLINE-004",
    title: "Quản lý page bán hàng cơ bản",
    company: "Hoa Đà Nẵng Shop",
    location: "Hải Châu",
    salary: "8-12M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Trưởng nhóm",
    description: "Quản lý fanpage, đăng bài, tương tác khách, xử lý đơn hàng",
    requirements: [
      "Có kinh nghiệm quản trị page",
      "Hiểu về Facebook Ads",
      "Kỹ năng viết content",
      "Quản lý thời gian"
    ],
    benefits: [
      "Lương cứng + thưởng",
      "Bảo hiểm",
      "Đào tạo nâng cao",
      "Thưởng doanh thu"
    ],
    skills: ["Quản lý page", "Content", "Facebook Ads", "Xử lý đơn"],
    logo: "📊",
    hot: true,
    category: "business",
    subCategory: "online",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== NHÓM THỊ TRƯỜNG – SALES CƠ BẢN ==========
  {
    id: "BUS-FIELD-001",
    title: "Nhân viên sale thị trường",
    company: "Coca-Cola",
    location: "Toàn Đà Nẵng",
    salary: "7-12M + phụ cấp",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tiếp cận khách hàng, giới thiệu sản phẩm, đặt hàng, chăm sóc điểm bán",
    requirements: [
      "Có xe máy",
      "Năng động, chịu khó",
      "Giao tiếp tốt",
      "Sức khỏe tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp xăng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng doanh số"
    ],
    skills: ["Sale thị trường", "Giao tiếp", "Năng động", "Chốt đơn"],
    logo: "🏍️",
    hot: true,
    category: "business",
    subCategory: "field",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "BUS-FIELD-002",
    title: "Nhân viên phát triển khách hàng",
    company: "PepsiCo",
    location: "Toàn Đà Nẵng",
    salary: "7-11M + thưởng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tìm kiếm khách hàng mới, duy trì khách hàng cũ, phát triển thị trường",
    requirements: [
      "Có xe máy",
      "Kỹ năng đàm phán",
      "Năng động, nhiệt tình",
      "Không ngại đi xa"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đào tạo kỹ năng",
      "Thưởng doanh số"
    ],
    skills: ["Phát triển KH", "Đàm phán", "Tìm kiếm", "Duy trì"],
    logo: "🤝",
    hot: false,
    category: "business",
    subCategory: "field",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "BUS-FIELD-003",
    title: "Nhân viên đi thị trường (FMCG)",
    company: "Masan Consumer",
    location: "Liên Chiểu",
    salary: "6-10M + phụ cấp",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Kiểm tra hàng hóa, hỗ trợ điểm bán, thu thập thông tin thị trường",
    requirements: [
      "Có xe máy",
      "Năng động",
      "Quan sát tốt",
      "Có thể đi lại nhiều"
    ],
    benefits: [
      "Lương cứng + phụ cấp xăng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Đi thị trường", "Quan sát", "Báo cáo", "Hỗ trợ"],
    logo: "🏪",
    hot: false,
    category: "business",
    subCategory: "field",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "BUS-FIELD-004",
    title: "Cộng tác viên bán hàng",
    company: "Vingroup",
    location: "Toàn Đà Nẵng",
    salary: "Hoa hồng",
    type: "Cộng tác viên",
    experience: "0 năm",
    level: "CTV",
    description: "Giới thiệu sản phẩm, tìm kiếm khách hàng, nhận hoa hồng theo đơn",
    requirements: [
      "Năng động",
      "Có mối quan hệ",
      "Không yêu cầu thời gian",
      "Được đào tạo sản phẩm"
    ],
    benefits: [
      "Hoa hồng cao",
      "Thời gian linh hoạt",
      "Quà tặng",
      "Cơ hội thăng tiến"
    ],
    skills: ["Bán hàng", "Giới thiệu", "Quan hệ", "Năng động"],
    logo: "🤝",
    hot: false,
    category: "business",
    subCategory: "field",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== NHÓM HỖ TRỢ KINH DOANH ==========
  {
    id: "BUS-ADMIN-001",
    title: "Sales Admin",
    company: "Đất Xanh",
    location: "Hải Châu",
    salary: "7-10M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Hỗ trợ phòng kinh doanh, nhập liệu, soạn hợp đồng, báo cáo",
    requirements: [
      "Sử dụng thành thạo vi tính",
      "Cẩn thận, tỉ mỉ",
      "Kỹ năng tổ chức",
      "Tin học văn phòng"
    ],
    benefits: [
      "Lương cứng + thưởng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Admin", "Vi tính", "Nhập liệu", "Báo cáo"],
    logo: "📋",
    hot: false,
    category: "business",
    subCategory: "admin",
    featured: false,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "BUS-ADMIN-002",
    title: "Nhân viên nhập đơn hàng",
    company: "Thế Giới Di Động",
    location: "Hải Châu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Nhập đơn hàng vào hệ thống, kiểm tra tồn kho, phối hợp kho hàng",
    requirements: [
      "Sử dụng máy tính",
      "Cẩn thận, chính xác",
      "Làm việc nhóm",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Nhập đơn", "Vi tính", "Kiểm kho", "Chính xác"],
    logo: "📝",
    hot: false,
    category: "business",
    subCategory: "admin",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "BUS-ADMIN-003",
    title: "Nhân viên hỗ trợ kinh doanh",
    company: "PNJ",
    location: "Hải Châu",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Hỗ trợ đội ngũ kinh doanh, soạn tài liệu, lịch hẹn, báo cáo",
    requirements: [
      "Kỹ năng tổ chức",
      "Sử dụng vi tính",
      "Giao tiếp tốt",
      "Cẩn thận"
    ],
    benefits: [
      "Lương cứng + thưởng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Hỗ trợ", "Tổ chức", "Vi tính", "Giao tiếp"],
    logo: "💼",
    hot: false,
    category: "business",
    subCategory: "admin",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "BUS-ADMIN-004",
    title: "Nhân viên chăm sóc đại lý",
    company: "Vinamilk",
    location: "Liên Chiểu",
    salary: "7-10M + thưởng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Chăm sóc đại lý, hỗ trợ đặt hàng, giải đáp thắc mắc, thu thập thông tin",
    requirements: [
      "Giao tiếp tốt",
      "Có xe máy",
      "Kiên nhẫn",
      "Sử dụng vi tính"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Chăm sóc", "Giao tiếp", "Hỗ trợ", "Thu thập"],
    logo: "🏪",
    hot: false,
    category: "business",
    subCategory: "admin",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  }
];

// ===========================================
// CÁC HÀM TIỆN ÍCH CHO LĨNH VỰC KINH DOANH
// ===========================================

// Tổng số lượng việc làm Kinh doanh
export const businessJobsCount = businessJobs.length; // 21 jobs

// Lấy tất cả việc làm Kinh doanh
export const getAllBusinessJobs = () => businessJobs;

// Lấy việc làm Kinh doanh theo ID
export const getBusinessJobById = (id) => businessJobs.find(job => job.id === id);

// Lấy việc làm Kinh doanh theo subCategory
export const getBusinessJobsBySubCategory = (subCategory) => {
  return businessJobs.filter(job => job.subCategory === subCategory);
};

// Lấy việc làm Kinh doanh nổi bật (hot)
export const getHotBusinessJobs = () => businessJobs.filter(job => job.hot === true);

// Lấy việc làm Kinh doanh featured
export const getFeaturedBusinessJobs = () => businessJobs.filter(job => job.featured === true);

// ===========================================
// DANH SÁCH THEO SUBCATEGORY
// ===========================================

// Nhóm bán hàng trực tiếp
export const retailJobs = businessJobs.filter(job => job.subCategory === "retail");
// Nhóm telesales
export const telesalesJobs = businessJobs.filter(job => job.subCategory === "telesales");
// Nhóm bán hàng online
export const onlineJobs = businessJobs.filter(job => job.subCategory === "online");
// Nhóm thị trường
export const fieldJobs = businessJobs.filter(job => job.subCategory === "field");
// Nhóm hỗ trợ kinh doanh
export const adminJobs = businessJobs.filter(job => job.subCategory === "admin");

// ===========================================
// SỐ LƯỢNG THEO SUBCATEGORY
// ===========================================

export const retailJobsCount = retailJobs.length; // 5 jobs
export const telesalesJobsCount = telesalesJobs.length; // 4 jobs
export const onlineJobsCount = onlineJobs.length; // 4 jobs
export const fieldJobsCount = fieldJobs.length; // 4 jobs
export const adminJobsCount = adminJobs.length; // 4 jobs