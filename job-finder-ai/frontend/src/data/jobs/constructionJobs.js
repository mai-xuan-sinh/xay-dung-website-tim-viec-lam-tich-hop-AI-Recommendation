// ===========================================
// DỮ LIỆU VIỆC LÀM LĨNH VỰC XÂY DỰNG - PHỔ THÔNG
// ===========================================

export const constructionJobs = [
  // ========== NHÓM LAO ĐỘNG TRỰC TIẾP ==========
  {
    id: "CON-LAB-001",
    title: "Thợ xây (xây tường, trát)",
    company: "Coteccons Đà Nẵng",
    location: "Liên Chiểu",
    salary: "8-12M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Thợ",
    description: "Xây tường, trát tường, hoàn thiện công trình xây dựng",
    requirements: [
      "Có kinh nghiệm xây dựng",
      "Sức khỏe tốt",
      "Làm việc theo nhóm",
      "Có trách nhiệm với công việc"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Xây tường", "Trát tường", "Đọc bản vẽ", "Làm việc nhóm"],
    logo: "🧱",
    hot: true,
    category: "construction",
    subCategory: "labor",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "CON-LAB-002",
    title: "Phụ hồ (hỗ trợ thợ chính)",
    company: "Hoa Binh Construction",
    location: "Ngũ Hành Sơn",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Phụ việc",
    description: "Hỗ trợ thợ chính, trộn hồ, vận chuyển vật liệu, dọn dẹp",
    requirements: [
      "Sức khỏe tốt",
      "Chăm chỉ, siêng năng",
      "Không yêu cầu kinh nghiệm",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Hỗ trợ", "Chăm chỉ", "Trộn hồ", "Vận chuyển"],
    logo: "🔨",
    hot: false,
    category: "construction",
    subCategory: "labor",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "CON-LAB-003",
    title: "Thợ bê tông",
    company: "Ricons Construction",
    location: "Hòa Vang",
    salary: "9-13M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Thợ",
    description: "Đổ bê tông, đầm bê tông, hoàn thiện bề mặt bê tông",
    requirements: [
      "Có kinh nghiệm đổ bê tông",
      "Sức khỏe tốt",
      "Làm việc theo nhóm",
      "Có trách nhiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn ca",
      "Thưởng công trình"
    ],
    skills: ["Đổ bê tông", "Đầm bê tông", "Đọc bản vẽ", "Làm việc nhóm"],
    logo: "🏗️",
    hot: true,
    category: "construction",
    subCategory: "labor",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "CON-LAB-004",
    title: "Thợ sắt (gia công cốt thép)",
    company: "MCC Đà Nẵng",
    location: "Liên Chiểu",
    salary: "8-12M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Thợ",
    description: "Gia công cốt thép, uốn sắt, buộc thép cho công trình",
    requirements: [
      "Có kinh nghiệm gia công thép",
      "Sức khỏe tốt",
      "Cẩn thận, chính xác",
      "Đọc được bản vẽ cơ bản"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng tháng 13"
    ],
    skills: ["Gia công thép", "Uốn sắt", "Buộc thép", "Đọc bản vẽ"],
    logo: "🔧",
    hot: false,
    category: "construction",
    subCategory: "labor",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "CON-LAB-005",
    title: "Thợ cốp pha (lắp khuôn bê tông)",
    company: "Phú Mỹ Construction",
    location: "Cẩm Lệ",
    salary: "9-13M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Thợ",
    description: "Lắp đặt và tháo dỡ cốp pha cho công trình bê tông",
    requirements: [
      "Có kinh nghiệm lắp cốp pha",
      "Sức khỏe tốt",
      "Cẩn thận, chính xác",
      "Đọc được bản vẽ"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Lắp cốp pha", "Tháo cốp pha", "Đọc bản vẽ", "An toàn"],
    logo: "🪚",
    hot: true,
    category: "construction",
    subCategory: "labor",
    featured: true,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== NHÓM HOÀN THIỆN CÔNG TRÌNH ==========
  {
    id: "CON-FIN-001",
    title: "Thợ sơn",
    company: "Sơn Đà Nẵng",
    location: "Hải Châu",
    salary: "7-11M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Thợ",
    description: "Sơn tường, sơn nhà, sơn nội ngoại thất, hoàn thiện bề mặt",
    requirements: [
      "Có kinh nghiệm sơn",
      "Tỉ mỉ, cẩn thận",
      "Pha màu cơ bản",
      "Làm việc trên cao"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Sơn tường", "Pha màu", "Hoàn thiện", "Tỉ mỉ"],
    logo: "🎨",
    hot: true,
    category: "construction",
    subCategory: "finishing",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "CON-FIN-002",
    title: "Thợ ốp lát gạch",
    company: "Tân Á Đại Thành",
    location: "Ngũ Hành Sơn",
    salary: "8-12M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Thợ",
    description: "Ốp lát gạch nền, gạch tường, hoàn thiện công trình",
    requirements: [
      "Có kinh nghiệm ốp lát",
      "Tỉ mỉ, chính xác",
      "Đọc bản vẽ",
      "Có thẩm mỹ"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Ốp gạch", "Lát gạch", "Đọc bản vẽ", "Thẩm mỹ"],
    logo: "🧩",
    hot: true,
    category: "construction",
    subCategory: "finishing",
    featured: true,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "CON-FIN-003",
    title: "Thợ chống thấm",
    company: "Chống Thấm Đà Nẵng",
    location: "Hải Châu",
    salary: "8-12M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Thợ",
    description: "Xử lý chống thấm sàn, mái, tường, hồ bơi",
    requirements: [
      "Có kinh nghiệm chống thấm",
      "Hiểu về hóa chất",
      "Cẩn thận, tỉ mỉ",
      "Làm việc trên cao"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Chống thấm", "Xử lý vết nứt", "Hóa chất", "Tỉ mỉ"],
    logo: "💧",
    hot: false,
    category: "construction",
    subCategory: "finishing",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "CON-FIN-004",
    title: "Thợ trần thạch cao",
    company: "Trần Thạch Cao Đà Nẵng",
    location: "Hải Châu",
    salary: "8-12M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Thợ",
    description: "Lắp đặt trần thạch cao, vách ngăn thạch cao, trang trí",
    requirements: [
      "Có kinh nghiệm thi công thạch cao",
      "Đọc bản vẽ",
      "Tỉ mỉ, thẩm mỹ",
      "Làm việc trên cao"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Lắp trần", "Vách ngăn", "Đọc bản vẽ", "Thẩm mỹ"],
    logo: "🏠",
    hot: false,
    category: "construction",
    subCategory: "finishing",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "CON-FIN-005",
    title: "Thợ lắp cửa (nhôm kính)",
    company: "Nhôm Kính Đà Nẵng",
    location: "Thanh Khê",
    salary: "7-11M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Thợ",
    description: "Lắp đặt cửa nhôm kính, vách kính, lan can kính",
    requirements: [
      "Có kinh nghiệm lắp cửa",
      "Đo đạc chính xác",
      "Tỉ mỉ, cẩn thận",
      "Làm việc trên cao"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Lắp cửa", "Đo đạc", "Nhôm kính", "Tỉ mỉ"],
    logo: "🚪",
    hot: false,
    category: "construction",
    subCategory: "finishing",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== NHÓM KỸ THUẬT ĐƠN GIẢN ==========
  {
    id: "CON-TEC-001",
    title: "Thợ điện dân dụng",
    company: "Điện Lực Đà Nẵng",
    location: "Hải Châu",
    salary: "7-10M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Thợ",
    description: "Lắp đặt hệ thống điện dân dụng, sửa chữa điện gia đình",
    requirements: [
      "Có kiến thức điện cơ bản",
      "An toàn lao động",
      "Có thể làm theo ca",
      "Sức khỏe tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Điện dân dụng", "Sửa chữa", "Lắp đặt", "An toàn"],
    logo: "⚡",
    hot: true,
    category: "construction",
    subCategory: "technical",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "CON-TEC-002",
    title: "Thợ nước (ống nước)",
    company: "Cấp Thoát Nước Đà Nẵng",
    location: "Liên Chiểu",
    salary: "7-10M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Thợ",
    description: "Lắp đặt, sửa chữa hệ thống ống nước dân dụng",
    requirements: [
      "Có kinh nghiệm về nước",
      "Sức khỏe tốt",
      "Cẩn thận",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Ống nước", "Sửa chữa", "Lắp đặt", "An toàn"],
    logo: "💧",
    hot: false,
    category: "construction",
    subCategory: "technical",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "CON-TEC-003",
    title: "Lắp đặt thiết bị (đèn, quạt, máy lạnh)",
    company: "Điện Máy Xanh",
    location: "Hải Châu",
    salary: "7-11M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Thợ",
    description: "Lắp đặt đèn, quạt, máy lạnh, thiết bị gia dụng",
    requirements: [
      "Có kiến thức cơ bản",
      "An toàn lao động",
      "Có thể làm theo ca",
      "Giao tiếp tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng doanh số"
    ],
    skills: ["Lắp máy lạnh", "Lắp đèn", "Sửa chữa", "An toàn"],
    logo: "❄️",
    hot: true,
    category: "construction",
    subCategory: "technical",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "CON-TEC-004",
    title: "Nhân viên bảo trì công trình",
    company: "Bảo Trì Đà Nẵng",
    location: "Hải Châu",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Bảo trì, sửa chữa các hạng mục công trình",
    requirements: [
      "Có kiến thức cơ bản",
      "Sức khỏe tốt",
      "Cẩn thận",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Bảo trì", "Sửa chữa", "Kiểm tra", "An toàn"],
    logo: "🔧",
    hot: false,
    category: "construction",
    subCategory: "technical",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== NHÓM HỖ TRỢ CÔNG TRÌNH ==========
  {
    id: "CON-SUP-001",
    title: "Nhân viên vận chuyển vật liệu",
    company: "Vật Liệu Xây Dựng Đà Nẵng",
    location: "Liên Chiểu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Vận chuyển vật liệu xây dựng trong công trình",
    requirements: [
      "Sức khỏe tốt",
      "Chăm chỉ",
      "Có xe máy",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp xăng",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Vận chuyển", "Sức khỏe", "Chăm chỉ", "An toàn"],
    logo: "🚚",
    hot: false,
    category: "construction",
    subCategory: "support",
    featured: false,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "CON-SUP-002",
    title: "Bốc xếp công trình",
    company: "Coteccons Đà Nẵng",
    location: "Hòa Vang",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Bốc xếp vật liệu, dọn dẹp công trình",
    requirements: [
      "Sức khỏe tốt",
      "Chăm chỉ, siêng năng",
      "Có thể làm theo ca",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Bốc xếp", "Dọn dẹp", "Sức khỏe", "Chăm chỉ"],
    logo: "📦",
    hot: false,
    category: "construction",
    subCategory: "support",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "CON-SUP-003",
    title: "Lái xe công trình (xe tải nhỏ)",
    company: "Vận Tải Đà Nẵng",
    location: "Liên Chiểu",
    salary: "7-10M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Tài xế",
    description: "Lái xe tải vận chuyển vật liệu trong công trình",
    requirements: [
      "Có bằng lái xe B2",
      "Kinh nghiệm lái xe tải",
      "Sức khỏe tốt",
      "An toàn giao thông"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng công trình"
    ],
    skills: ["Lái xe tải", "Bằng B2", "An toàn", "Vận chuyển"],
    logo: "🚛",
    hot: true,
    category: "construction",
    subCategory: "support",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "CON-SUP-004",
    title: "Nhân viên kho vật tư",
    company: "Vật Tư Xây Dựng Đà Nẵng",
    location: "Liên Chiểu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Quản lý vật tư, xuất nhập kho, kiểm kê",
    requirements: [
      "Có trách nhiệm",
      "Cẩn thận",
      "Biết vi tính cơ bản",
      "Sức khỏe tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Ăn trưa",
      "Thưởng tháng 13"
    ],
    skills: ["Quản lý kho", "Nhập xuất", "Kiểm kê", "Vi tính"],
    logo: "📋",
    hot: false,
    category: "construction",
    subCategory: "support",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== NHÓM PHỤ TRỢ ==========
  {
    id: "CON-ADM-001",
    title: "Giám sát công trình cơ bản",
    company: "Ricons Construction",
    location: "Hải Châu",
    salary: "8-12M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Giám sát",
    description: "Giám sát thi công, đảm bảo tiến độ và chất lượng",
    requirements: [
      "Có kiến thức xây dựng",
      "Đọc bản vẽ",
      "Kỹ năng quản lý",
      "Giao tiếp tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Xe đưa đón",
      "Thưởng công trình"
    ],
    skills: ["Giám sát", "Đọc bản vẽ", "Quản lý", "Giao tiếp"],
    logo: "👷",
    hot: true,
    category: "construction",
    subCategory: "admin",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "CON-ADM-002",
    title: "Nhân viên đo đạc đơn giản",
    company: "Trắc Địa Đà Nẵng",
    location: "Hải Châu",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Đo đạc, khảo sát công trình, hỗ trợ kỹ thuật",
    requirements: [
      "Có kiến thức đo đạc",
      "Cẩn thận, chính xác",
      "Sử dụng máy đo",
      "Sức khỏe tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng công trình"
    ],
    skills: ["Đo đạc", "Khảo sát", "Máy đo", "Chính xác"],
    logo: "📐",
    hot: false,
    category: "construction",
    subCategory: "admin",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "CON-ADM-003",
    title: "Nhân viên an toàn lao động",
    company: "An Toàn Xây Dựng",
    location: "Hải Châu",
    salary: "7-10M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Đảm bảo an toàn lao động, kiểm tra trang thiết bị",
    requirements: [
      "Có kiến thức an toàn",
      "Có trách nhiệm",
      "Giao tiếp tốt",
      "Sức khỏe tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["An toàn lao động", "Kiểm tra", "Đào tạo", "Báo cáo"],
    logo: "🛡️",
    hot: true,
    category: "construction",
    subCategory: "admin",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  }
];

// ===========================================
// CÁC HÀM TIỆN ÍCH CHO LĨNH VỰC XÂY DỰNG
// ===========================================

// Tổng số lượng việc làm Xây dựng
export const constructionJobsCount = constructionJobs.length; // 22 jobs

// Lấy tất cả việc làm Xây dựng
export const getAllConstructionJobs = () => constructionJobs;

// Lấy việc làm Xây dựng theo ID
export const getConstructionJobById = (id) => constructionJobs.find(job => job.id === id);

// Lấy việc làm Xây dựng theo subCategory
export const getConstructionJobsBySubCategory = (subCategory) => {
  return constructionJobs.filter(job => job.subCategory === subCategory);
};

// Lấy việc làm Xây dựng nổi bật (hot)
export const getHotConstructionJobs = () => constructionJobs.filter(job => job.hot === true);

// Lấy việc làm Xây dựng featured
export const getFeaturedConstructionJobs = () => constructionJobs.filter(job => job.featured === true);

// ===========================================
// DANH SÁCH THEO SUBCATEGORY
// ===========================================

// Nhóm lao động trực tiếp
export const laborJobs = constructionJobs.filter(job => job.subCategory === "labor");
// Nhóm hoàn thiện
export const finishingJobs = constructionJobs.filter(job => job.subCategory === "finishing");
// Nhóm kỹ thuật
export const technicalJobs = constructionJobs.filter(job => job.subCategory === "technical");
// Nhóm hỗ trợ công trình (đổi tên để tránh trùng với IT)
export const constructionSupportJobs = constructionJobs.filter(job => job.subCategory === "support");
// Nhóm phụ trợ (đổi tên để tránh trùng với IT)
export const constructionAdminJobs = constructionJobs.filter(job => job.subCategory === "admin");

// ===========================================
// SỐ LƯỢNG THEO SUBCATEGORY
// ===========================================

export const laborJobsCount = laborJobs.length;
export const finishingJobsCount = finishingJobs.length;
export const technicalJobsCount = technicalJobs.length;
export const constructionSupportJobsCount = constructionSupportJobs.length;
export const constructionAdminJobsCount = constructionAdminJobs.length;