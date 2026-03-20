// ===========================================
// DỮ LIỆU VIỆC LÀM LĨNH VỰC DU LỊCH - PHỔ THÔNG
// ===========================================

export const tourismJobs = [
  // ========== NHÓM KHÁCH SẠN (HOTEL) ==========
  {
    id: "TOUR-HOTEL-001",
    title: "Nhân viên lễ tân (ca cơ bản)",
    company: "Furama Resort Đà Nẵng",
    location: "Sơn Trà",
    salary: "7-10M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Đón tiếp, hỗ trợ check-in/check-out cho khách, tư vấn dịch vụ khách sạn",
    requirements: [
      "Ngoại hình khá, giao tiếp tốt",
      "Tiếng Anh cơ bản (có thể giao tiếp)",
      "Sử dụng thành thạo vi tính văn phòng",
      "Ưu tiên có kinh nghiệm"
    ],
    benefits: [
      "Lương cơ bản + phụ cấp + tip",
      "Bảo hiểm đầy đủ",
      "Đồng phục, ăn ca",
      "Đào tạo nghiệp vụ"
    ],
    skills: ["Tiếng Anh", "Giao tiếp", "Vi tính", "Ngoại hình"],
    logo: "🏨",
    hot: true,
    category: "tourism",
    subCategory: "hotel",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "TOUR-HOTEL-002",
    title: "Nhân viên buồng phòng",
    company: "Pulchra Resort Đà Nẵng",
    location: "Sơn Trà",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Dọn dẹp phòng khách, thay ga giường, vệ sinh khu vực phòng",
    requirements: [
      "Sức khỏe tốt, chăm chỉ",
      "Có tinh thần trách nhiệm",
      "Không yêu cầu kinh nghiệm",
      "Ưu tiên có xe đi lại"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Ăn trưa tại khách sạn",
      "Đồng phục cấp phát",
      "Thưởng lễ Tết"
    ],
    skills: ["Chăm chỉ", "Trách nhiệm", "Vệ sinh", "Sắp xếp"],
    logo: "🧹",
    hot: false,
    category: "tourism",
    subCategory: "hotel",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "TOUR-HOTEL-003",
    title: "Bellman (Nhân viên xách hành lý)",
    company: "Novotel Đà Nẵng",
    location: "Hải Châu",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Hỗ trợ khách xách hành lý, mở cửa, chào đón khách, hướng dẫn phòng",
    requirements: [
      "Ngoại hình ưa nhìn, nhanh nhẹn",
      "Giao tiếp tốt, thân thiện",
      "Có thể đứng nhiều",
      "Tiếng Anh cơ bản"
    ],
    benefits: [
      "Lương cơ bản + tip",
      "Bảo hiểm đầy đủ",
      "Đồng phục đẹp",
      "Môi trường chuyên nghiệp"
    ],
    skills: ["Giao tiếp", "Nhanh nhẹn", "Tiếng Anh", "Phục vụ"],
    logo: "🛎️",
    hot: true,
    category: "tourism",
    subCategory: "hotel",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "TOUR-HOTEL-004",
    title: "Nhân viên trực sảnh",
    company: "Hilton Đà Nẵng",
    location: "Hải Châu",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-2 năm",
    level: "Nhân viên",
    description: "Trực sảnh, hỗ trợ khách, giải đáp thắc mắc, điều phối dịch vụ",
    requirements: [
      "Ngoại hình khá",
      "Tiếng Anh giao tiếp",
      "Kỹ năng xử lý tình huống",
      "Thân thiện, lịch sự"
    ],
    benefits: [
      "Lương tháng 13",
      "Bảo hiểm sức khỏe",
      "Du lịch hàng năm",
      "Đào tạo chuyên sâu"
    ],
    skills: ["Tiếng Anh", "Giao tiếp", "Xử lý tình huống", "Chuyên nghiệp"],
    logo: "🏢",
    hot: false,
    category: "tourism",
    subCategory: "hotel",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "TOUR-HOTEL-005",
    title: "Nhân viên giặt là",
    company: "Risemount Resort",
    location: "Ngũ Hành Sơn",
    salary: "5-7M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Vận hành máy giặt, là ủi đồ cho khách, phân loại và bảo quản",
    requirements: [
      "Sức khỏe tốt",
      "Tỉ mỉ, cẩn thận",
      "Có thể làm việc theo ca",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp ca",
      "Ăn trưa miễn phí",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Tỉ mỉ", "Cẩn thận", "Vận hành máy", "Sắp xếp"],
    logo: "🧺",
    hot: false,
    category: "tourism",
    subCategory: "hotel",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },
  {
    id: "TOUR-HOTEL-006",
    title: "Nhân viên tạp vụ khách sạn",
    company: "Grand Mercure",
    location: "Ngũ Hành Sơn",
    salary: "5-7M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Vệ sinh khu vực công cộng, hành lang, sảnh, nhà vệ sinh",
    requirements: [
      "Chăm chỉ, siêng năng",
      "Có trách nhiệm với công việc",
      "Sức khỏe tốt",
      "Không yêu cầu bằng cấp"
    ],
    benefits: [
      "Lương cơ bản + phụ cấp",
      "Ăn trưa",
      "Đồng phục",
      "Thưởng lễ Tết"
    ],
    skills: ["Chăm chỉ", "Vệ sinh", "Sức khỏe", "Trách nhiệm"],
    logo: "🧹",
    hot: false,
    category: "tourism",
    subCategory: "hotel",
    featured: false,
    postedDate: "2024-03-10",
    deadline: "2024-04-10"
  },

  // ========== NHÓM NHÀ HÀNG - ĂN UỐNG ==========
  {
    id: "TOUR-REST-001",
    title: "Phục vụ nhà hàng (Waiter/Waitress)",
    company: "Madame Lan Restaurant",
    location: "Ngũ Hành Sơn",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Phục vụ khách, lấy order, bưng bê, dọn bàn, chăm sóc khách",
    requirements: [
      "Nhanh nhẹn, hoạt bát",
      "Có kỹ năng giao tiếp",
      "Chịu được áp lực cao",
      "Ưu tiên biết tiếng Anh cơ bản"
    ],
    benefits: [
      "Lương cứng + tip + doanh thu",
      "Ăn 2 bữa/ngày",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Phục vụ", "Nhanh nhẹn", "Giao tiếp", "Chăm sóc khách"],
    logo: "🍽️",
    hot: true,
    category: "tourism",
    subCategory: "restaurant",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "TOUR-REST-002",
    title: "Phụ bếp",
    company: "The Rachel Restaurant",
    location: "Sơn Trà",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Phụ bếp",
    description: "Sơ chế nguyên liệu, phụ giúp bếp chính, vệ sinh khu vực bếp",
    requirements: [
      "Có sức khỏe tốt",
      "Yêu thích nấu ăn",
      "Cẩn thận, vệ sinh",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cơ bản + phụ cấp",
      "Ăn uống tại nhà hàng",
      "Đào tạo nâng cao tay nghề",
      "Thưởng doanh thu"
    ],
    skills: ["Sơ chế", "Vệ sinh", "Cẩn thận", "Hỗ trợ bếp"],
    logo: "🔪",
    hot: false,
    category: "tourism",
    subCategory: "restaurant",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "TOUR-REST-003",
    title: "Nhân viên rửa chén",
    company: "Golden Pine Restaurant",
    location: "Sơn Trà",
    salary: "5-7M",
    type: "Full-time",
    experience: "0 năm",
    level: "Nhân viên",
    description: "Vệ sinh chén đĩa, dụng cụ nhà bếp, hỗ trợ khu vực bếp",
    requirements: [
      "Chăm chỉ, siêng năng",
      "Không ngại dầu mỡ",
      "Sức khỏe tốt",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Ăn trưa",
      "Đồng phục",
      "Thưởng lễ Tết"
    ],
    skills: ["Chăm chỉ", "Vệ sinh", "Sức khỏe", "Trách nhiệm"],
    logo: "🧼",
    hot: false,
    category: "tourism",
    subCategory: "restaurant",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "TOUR-REST-004",
    title: "Thu ngân nhà hàng",
    company: "Be Man Restaurant",
    location: "Hải Châu",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-2 năm",
    level: "Nhân viên",
    description: "Tính tiền, xuất hóa đơn, tổng kết doanh thu, hỗ trợ quầy lễ tân",
    requirements: [
      "Trung thực, cẩn thận",
      "Biết sử dụng máy tính",
      "Có kinh nghiệm thu ngân",
      "Giao tiếp tốt"
    ],
    benefits: [
      "Lương cứng + thưởng",
      "Bảo hiểm",
      "Ăn trưa",
      "Đồng phục"
    ],
    skills: ["Thu ngân", "Tính toán", "Trung thực", "Vi tính"],
    logo: "💵",
    hot: true,
    category: "tourism",
    subCategory: "restaurant",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "TOUR-REST-005",
    title: "Nhân viên order món",
    company: "Sofia Restaurant",
    location: "Ngũ Hành Sơn",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Nhận order từ khách, nhập liệu vào phần mềm, phối hợp với bếp",
    requirements: [
      "Nhanh nhẹn, chính xác",
      "Biết sử dụng máy tính",
      "Nhớ tốt",
      "Có thể làm việc theo ca"
    ],
    benefits: [
      "Lương cơ bản + phụ cấp",
      "Ăn uống",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Order", "Vi tính", "Nhanh nhẹn", "Chính xác"],
    logo: "📝",
    hot: false,
    category: "tourism",
    subCategory: "restaurant",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },
  {
    id: "TOUR-REST-006",
    title: "Nhân viên chạy bàn",
    company: "Waterfront Restaurant",
    location: "Hải Châu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Bưng bê thức ăn, dọn bàn, hỗ trợ phục vụ trong giờ cao điểm",
    requirements: [
      "Nhanh nhẹn, khỏe mạnh",
      "Có tinh thần làm việc nhóm",
      "Chịu được áp lực",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + tip",
      "Ăn 2 bữa/ngày",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Bưng bê", "Nhanh nhẹn", "Phục vụ", "Hỗ trợ"],
    logo: "🏃",
    hot: false,
    category: "tourism",
    subCategory: "restaurant",
    featured: false,
    postedDate: "2024-03-10",
    deadline: "2024-04-10"
  },

  // ========== NHÓM DU LỊCH - TOUR ==========
  {
    id: "TOUR-TOUR-001",
    title: "Phụ tour (Assistant Guide)",
    company: "Saigontourist Đà Nẵng",
    location: "Hải Châu",
    salary: "5-8M + tiền tour",
    type: "Part-time/Full-time",
    experience: "0-1 năm",
    level: "Phụ tour",
    description: "Hỗ trợ hướng dẫn viên, điểm danh khách, phát quà, chăm sóc khách",
    requirements: [
      "Năng động, nhiệt tình",
      "Giao tiếp tốt",
      "Có thể đi tour dài ngày",
      "Ưu tiên biết tiếng Anh"
    ],
    benefits: [
      "Lương cứng + tiền tour",
      "Ăn ở theo tour",
      "Đào tạo nghiệp vụ",
      "Cơ hội trở thành HDV"
    ],
    skills: ["Hỗ trợ", "Năng động", "Giao tiếp", "Chăm sóc khách"],
    logo: "🧭",
    hot: true,
    category: "tourism",
    subCategory: "tour",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "TOUR-TOUR-002",
    title: "Nhân viên hỗ trợ tour",
    company: "Vietravel Đà Nẵng",
    location: "Hải Châu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Hỗ trợ khách trước và sau tour, giải đáp thắc mắc, chăm sóc khách",
    requirements: [
      "Nhiệt tình, chu đáo",
      "Kỹ năng giao tiếp",
      "Sử dụng vi tính cơ bản",
      "Có thể làm việc theo giờ"
    ],
    benefits: [
      "Lương cơ bản + thưởng",
      "Bảo hiểm",
      "Du lịch miễn phí",
      "Đào tạo chuyên môn"
    ],
    skills: ["Hỗ trợ", "Giao tiếp", "Vi tính", "Chăm sóc khách"],
    logo: "📞",
    hot: false,
    category: "tourism",
    subCategory: "tour",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "TOUR-TOUR-003",
    title: "Nhân viên phát tờ rơi tour",
    company: "Đà Nẵng Travel",
    location: "Hải Châu",
    salary: "3-5M (Part-time)",
    type: "Part-time",
    experience: "0 năm",
    level: "Nhân viên",
    description: "Phát tờ rơi quảng cáo tour du lịch tại các điểm đông người",
    requirements: [
      "Năng động, tự tin",
      "Có thể đứng nhiều",
      "Làm việc theo ca",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương theo giờ",
      "Linh hoạt thời gian",
      "Phù hợp sinh viên",
      "Thưởng theo doanh thu"
    ],
    skills: ["Năng động", "Tự tin", "Giao tiếp", "Marketing"],
    logo: "📄",
    hot: false,
    category: "tourism",
    subCategory: "tour",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "TOUR-TOUR-004",
    title: "Nhân viên trực quầy tour",
    company: "Klook Đà Nẵng",
    location: "Hải Châu",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tư vấn tour, bán tour, làm thủ tục cho khách, hỗ trợ thông tin",
    requirements: [
      "Ngoại hình khá",
      "Giao tiếp tốt",
      "Biết tiếng Anh cơ bản",
      "Sử dụng vi tính"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Du lịch miễn phí",
      "Đào tạo sản phẩm"
    ],
    skills: ["Tư vấn", "Bán hàng", "Tiếng Anh", "Vi tính"],
    logo: "🏪",
    hot: true,
    category: "tourism",
    subCategory: "tour",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "TOUR-TOUR-005",
    title: "Cộng tác viên bán tour",
    company: "Đất Việt Tour",
    location: "Làm việc tự do",
    salary: "Hoa hồng",
    type: "Cộng tác viên",
    experience: "0 năm",
    level: "CTV",
    description: "Giới thiệu khách, bán tour, nhận hoa hồng theo doanh số",
    requirements: [
      "Có mối quan hệ",
      "Năng động",
      "Không yêu cầu thời gian",
      "Được đào tạo sản phẩm"
    ],
    benefits: [
      "Hoa hồng cao",
      "Thời gian linh hoạt",
      "Du lịch miễn phí",
      "Quà tặng"
    ],
    skills: ["Bán hàng", "Quan hệ", "Giới thiệu", "Marketing"],
    logo: "🤝",
    hot: false,
    category: "tourism",
    subCategory: "tour",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== NHÓM SPA - NGHỈ DƯỠNG ==========
  {
    id: "TOUR-SPA-001",
    title: "Nhân viên spa (được đào tạo)",
    company: "Herbal Spa Đà Nẵng",
    location: "Sơn Trà",
    salary: "7-12M + tips",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Massage, chăm sóc da, tư vấn liệu trình, chăm sóc khách hàng",
    requirements: [
      "Ngoại hình ưa nhìn",
      "Có chứng chỉ spa là lợi thế",
      "Khéo tay, nhẹ nhàng",
      "Được đào tạo lại"
    ],
    benefits: [
      "Lương cứng + tips",
      "Đào tạo chuyên sâu",
      "Môi trường cao cấp",
      "Thưởng doanh thu"
    ],
    skills: ["Massage", "Chăm sóc da", "Nhẹ nhàng", "Tư vấn"],
    logo: "💆",
    hot: true,
    category: "tourism",
    subCategory: "spa",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "TOUR-SPA-002",
    title: "Lễ tân spa",
    company: "Sen Spa Đà Nẵng",
    location: "Hải Châu",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Đón tiếp khách, tư vấn dịch vụ, nhận booking, thanh toán",
    requirements: [
      "Ngoại hình sáng",
      "Giao tiếp tốt",
      "Biết tiếng Anh cơ bản",
      "Sử dụng vi tính"
    ],
    benefits: [
      "Lương cơ bản + thưởng",
      "Bảo hiểm",
      "Sử dụng dịch vụ spa",
      "Đồng phục đẹp"
    ],
    skills: ["Lễ tân", "Giao tiếp", "Tiếng Anh", "Tư vấn"],
    logo: "💅",
    hot: false,
    category: "tourism",
    subCategory: "spa",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "TOUR-SPA-003",
    title: "Nhân viên chăm sóc khách",
    company: "La Maison Spa",
    location: "Ngũ Hành Sơn",
    salary: "6-8M + tips",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Pha trà, mời nước, chuẩn bị phòng, hỗ trợ khách trong quá trình làm spa",
    requirements: [
      "Nhẹ nhàng, chu đáo",
      "Có tinh thần phục vụ",
      "Nhanh nhẹn",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + tips",
      "Ăn trưa",
      "Đồng phục",
      "Thưởng lễ Tết"
    ],
    skills: ["Chăm sóc", "Chu đáo", "Phục vụ", "Nhẹ nhàng"],
    logo: "🥂",
    hot: false,
    category: "tourism",
    subCategory: "spa",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "TOUR-SPA-004",
    title: "Phụ việc spa",
    company: "Alina Spa",
    location: "Sơn Trà",
    salary: "5-7M",
    type: "Full-time",
    experience: "0 năm",
    level: "Phụ việc",
    description: "Dọn dẹp phòng, giặt khăn, chuẩn bị dụng cụ, hỗ trợ kỹ thuật viên",
    requirements: [
      "Chăm chỉ, siêng năng",
      "Có tinh thần hỗ trợ",
      "Sức khỏe tốt",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cơ bản + phụ cấp",
      "Ăn trưa",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Chăm chỉ", "Hỗ trợ", "Dọn dẹp", "Sức khỏe"],
    logo: "🧹",
    hot: false,
    category: "tourism",
    subCategory: "spa",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== NHÓM VẬN CHUYỂN - HỖ TRỢ ==========
  {
    id: "TOUR-TRANS-001",
    title: "Tài xế du lịch (xe điện)",
    company: "Bà Nà Hills",
    location: "Hòa Vang",
    salary: "7-10M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Tài xế",
    description: "Lái xe điện chở khách tham quan, hướng dẫn điểm đến, đảm bảo an toàn",
    requirements: [
      "Có bằng lái xe B2 trở lên",
      "Lái xe an toàn",
      "Giao tiếp tốt",
      "Ưu tiên biết tiếng Anh"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng du lịch"
    ],
    skills: ["Lái xe", "An toàn", "Giao tiếp", "Chăm sóc khách"],
    logo: "🚗",
    hot: true,
    category: "tourism",
    subCategory: "transport",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "TOUR-TRANS-002",
    title: "Nhân viên điều phối xe",
    company: "Đà Nẵng Bus",
    location: "Liên Chiểu",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Điều phối lịch trình xe, sắp xếp tài xế, theo dõi hoạt động",
    requirements: [
      "Có kỹ năng tổ chức",
      "Sử dụng vi tính",
      "Giao tiếp tốt",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cơ bản + thưởng",
      "Bảo hiểm",
      "Đồng phục",
      "Du lịch hàng năm"
    ],
    skills: ["Điều phối", "Tổ chức", "Vi tính", "Giao tiếp"],
    logo: "📋",
    hot: false,
    category: "tourism",
    subCategory: "transport",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "TOUR-TRANS-003",
    title: "Nhân viên hỗ trợ khách đoàn",
    company: "Hội An Express",
    location: "Hải Châu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Hỗ trợ khách đoàn lên xuống xe, điểm danh, chăm sóc khách",
    requirements: [
      "Nhiệt tình, chu đáo",
      "Giao tiếp tốt",
      "Có thể đi theo đoàn",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cơ bản + phụ cấp",
      "Ăn ở theo tour",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Hỗ trợ", "Chu đáo", "Giao tiếp", "Chăm sóc khách"],
    logo: "👥",
    hot: false,
    category: "tourism",
    subCategory: "transport",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },

  // ========== NHÓM BÁN HÀNG DU LỊCH ==========
  {
    id: "TOUR-SHOP-001",
    title: "Nhân viên bán đồ lưu niệm",
    company: "Hội An Memories",
    location: "Ngũ Hành Sơn",
    salary: "6-8M + hoa hồng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Bán quà lưu niệm, giới thiệu sản phẩm, thu ngân, trưng bày",
    requirements: [
      "Nhanh nhẹn, thân thiện",
      "Có kỹ năng bán hàng",
      "Ngoại hình ưa nhìn",
      "Ưu tiên biết tiếng Anh"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng doanh thu"
    ],
    skills: ["Bán hàng", "Giao tiếp", "Thu ngân", "Trưng bày"],
    logo: "🎁",
    hot: true,
    category: "tourism",
    subCategory: "shop",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "TOUR-SHOP-002",
    title: "Nhân viên shop đặc sản",
    company: "Đặc sản Đà Nẵng",
    location: "Hải Châu",
    salary: "6-8M + hoa hồng",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Bán đặc sản vùng miền, tư vấn khách, đóng gói, gửi hàng",
    requirements: [
      "Có kiến thức về đặc sản",
      "Giao tiếp tốt",
      "Nhanh nhẹn",
      "Tiếng Anh cơ bản"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đồng phục",
      "Quà tặng"
    ],
    skills: ["Bán hàng", "Tư vấn", "Đóng gói", "Giao tiếp"],
    logo: "🛍️",
    hot: false,
    category: "tourism",
    subCategory: "shop",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "TOUR-SHOP-003",
    title: "Thu ngân cửa hàng du lịch",
    company: "Souvenir Đà Nẵng",
    location: "Sơn Trà",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Thu ngân",
    description: "Tính tiền, xuất hóa đơn, kiểm kê, hỗ trợ bán hàng",
    requirements: [
      "Trung thực, cẩn thận",
      "Biết sử dụng máy tính",
      "Có kinh nghiệm thu ngân",
      "Giao tiếp tốt"
    ],
    benefits: [
      "Lương cứng + thưởng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng lễ Tết"
    ],
    skills: ["Thu ngân", "Tính toán", "Trung thực", "Vi tính"],
    logo: "💵",
    hot: false,
    category: "tourism",
    subCategory: "shop",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  }
];

// ===========================================
// CÁC HÀM TIỆN ÍCH CHO LĨNH VỰC DU LỊCH
// ===========================================

// Tổng số lượng việc làm Du lịch
export const tourismJobsCount = tourismJobs.length; // 28 jobs

// Lấy tất cả việc làm Du lịch
export const getAllTourismJobs = () => tourismJobs;

// Lấy việc làm Du lịch theo ID
export const getTourismJobById = (id) => tourismJobs.find(job => job.id === id);

// Lấy việc làm Du lịch theo subCategory
export const getTourismJobsBySubCategory = (subCategory) => {
  return tourismJobs.filter(job => job.subCategory === subCategory);
};

// Lấy việc làm Du lịch nổi bật (hot)
export const getHotTourismJobs = () => tourismJobs.filter(job => job.hot === true);

// Lấy việc làm Du lịch featured
export const getFeaturedTourismJobs = () => tourismJobs.filter(job => job.featured === true);

// ===========================================
// DANH SÁCH THEO SUBCATEGORY
// ===========================================

// Nhóm khách sạn
export const hotelJobs = tourismJobs.filter(job => job.subCategory === "hotel");
// Nhóm nhà hàng
export const restaurantJobs = tourismJobs.filter(job => job.subCategory === "restaurant");
// Nhóm tour
export const tourJobs = tourismJobs.filter(job => job.subCategory === "tour");
// Nhóm spa
export const spaJobs = tourismJobs.filter(job => job.subCategory === "spa");
// Nhóm vận chuyển
export const transportJobs = tourismJobs.filter(job => job.subCategory === "transport");
// Nhóm bán hàng
export const shopJobs = tourismJobs.filter(job => job.subCategory === "shop");

// ===========================================
// SỐ LƯỢNG THEO SUBCATEGORY
// ===========================================

export const hotelJobsCount = hotelJobs.length; // 6 jobs
export const restaurantJobsCount = restaurantJobs.length; // 6 jobs
export const tourJobsCount = tourJobs.length; // 5 jobs
export const spaJobsCount = spaJobs.length; // 4 jobs
export const transportJobsCount = transportJobs.length; // 3 jobs
export const shopJobsCount = shopJobs.length; // 3 jobs