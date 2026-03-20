// ===========================================
// DỮ LIỆU VIỆC LÀM LĨNH VỰC DỊCH VỤ - PHỔ THÔNG
// ===========================================

export const serviceJobs = [
  // ========== NHÓM ĂN UỐNG (F&B) ==========
  {
    id: "SERV-FB-001",
    title: "Phục vụ (quán ăn, nhà hàng)",
    company: "Nhà hàng Madame Lan",
    location: "Ngũ Hành Sơn",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Phục vụ khách, lấy order, dọn bàn, chăm sóc khách hàng",
    requirements: [
      "Nhanh nhẹn, hoạt bát",
      "Giao tiếp tốt",
      "Chịu được áp lực",
      "Ưu tiên có kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + tip + doanh thu",
      "Ăn 2 bữa/ngày",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Phục vụ", "Giao tiếp", "Nhanh nhẹn", "Chăm sóc khách"],
    logo: "🍽️",
    hot: true,
    category: "service",
    subCategory: "fb",
    featured: true,
    postedDate: "2024-03-20",
    deadline: "2024-04-20"
  },
  {
    id: "SERV-FB-002",
    title: "Nhân viên chạy bàn",
    company: "The Rachel Restaurant",
    location: "Sơn Trà",
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
    category: "service",
    subCategory: "fb",
    featured: false,
    postedDate: "2024-03-19",
    deadline: "2024-04-19"
  },
  {
    id: "SERV-FB-003",
    title: "Phụ bếp",
    company: "Golden Pine Restaurant",
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
    category: "service",
    subCategory: "fb",
    featured: false,
    postedDate: "2024-03-18",
    deadline: "2024-04-18"
  },
  {
    id: "SERV-FB-004",
    title: "Nhân viên rửa chén",
    company: "Be Man Restaurant",
    location: "Hải Châu",
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
    category: "service",
    subCategory: "fb",
    featured: false,
    postedDate: "2024-03-17",
    deadline: "2024-04-17"
  },
  {
    id: "SERV-FB-005",
    title: "Thu ngân",
    company: "Sofia Restaurant",
    location: "Ngũ Hành Sơn",
    salary: "7-9M",
    type: "Full-time",
    experience: "0-1 năm",
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
    category: "service",
    subCategory: "fb",
    featured: true,
    postedDate: "2024-03-16",
    deadline: "2024-04-16"
  },
  {
    id: "SERV-FB-006",
    title: "Pha chế (trà sữa, cà phê)",
    company: "The Coffee House",
    location: "Hải Châu",
    salary: "7-10M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Pha chế đồ uống, tư vấn menu, phục vụ khách",
    requirements: [
      "Ngoại hình ưa nhìn",
      "Thích pha chế",
      "Giao tiếp tốt",
      "Được đào tạo"
    ],
    benefits: [
      "Lương cứng + thưởng",
      "Bảo hiểm",
      "Đồng phục",
      "Đào tạo pha chế"
    ],
    skills: ["Pha chế", "Giao tiếp", "Tư vấn", "Nhanh nhẹn"],
    logo: "☕",
    hot: true,
    category: "service",
    subCategory: "fb",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },

  // ========== NHÓM CỬA HÀNG – SIÊU THỊ ==========
  {
    id: "SERV-STORE-001",
    title: "Nhân viên bán hàng",
    company: "Vincom Đà Nẵng",
    location: "Hải Châu",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Tư vấn và bán sản phẩm, chăm sóc khách hàng, trưng bày sản phẩm",
    requirements: [
      "Ngoại hình khá",
      "Giao tiếp tốt",
      "Năng động, nhiệt tình",
      "Có kỹ năng bán hàng"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng doanh thu"
    ],
    skills: ["Bán hàng", "Tư vấn", "Giao tiếp", "Chăm sóc khách"],
    logo: "🛒",
    hot: true,
    category: "service",
    subCategory: "store",
    featured: true,
    postedDate: "2024-03-20",
    deadline: "2024-04-20"
  },
  {
    id: "SERV-STORE-002",
    title: "Thu ngân siêu thị",
    company: "Lotte Mart",
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
    category: "service",
    subCategory: "store",
    featured: false,
    postedDate: "2024-03-19",
    deadline: "2024-04-19"
  },
  {
    id: "SERV-STORE-003",
    title: "Nhân viên trưng bày hàng hóa",
    company: "Co.opmart",
    location: "Thanh Khê",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Trưng bày hàng hóa, sắp xếp kệ, kiểm tra hạn sử dụng",
    requirements: [
      "Cẩn thận, tỉ mỉ",
      "Có thẩm mỹ",
      "Sức khỏe tốt",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Trưng bày", "Sắp xếp", "Thẩm mỹ", "Kiểm kho"],
    logo: "📦",
    hot: false,
    category: "service",
    subCategory: "store",
    featured: false,
    postedDate: "2024-03-18",
    deadline: "2024-04-18"
  },
  {
    id: "SERV-STORE-004",
    title: "Nhân viên kiểm kho đơn giản",
    company: "Big C",
    location: "Hải Châu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Kiểm kê hàng hóa, nhập xuất kho, báo cáo tồn kho",
    requirements: [
      "Cẩn thận, chính xác",
      "Biết vi tính cơ bản",
      "Có trách nhiệm",
      "Sức khỏe tốt"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Kiểm kho", "Nhập xuất", "Vi tính", "Trách nhiệm"],
    logo: "📋",
    hot: false,
    category: "service",
    subCategory: "store",
    featured: false,
    postedDate: "2024-03-17",
    deadline: "2024-04-17"
  },

  // ========== NHÓM LÀM ĐẸP – CHĂM SÓC CÁ NHÂN ==========
  {
    id: "SERV-BEAUTY-001",
    title: "Nhân viên spa (được đào tạo)",
    company: "Herbal Spa",
    location: "Sơn Trà",
    salary: "7-12M",
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
    category: "service",
    subCategory: "beauty",
    featured: true,
    postedDate: "2024-03-20",
    deadline: "2024-04-20"
  },
  {
    id: "SERV-BEAUTY-002",
    title: "Kỹ thuật viên nail",
    company: "Tiệm Nail Đà Nẵng",
    location: "Hải Châu",
    salary: "8-15M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Kỹ thuật viên",
    description: "Làm nail, sơn gel, vẽ móng, chăm sóc khách hàng",
    requirements: [
      "Có tay nghề nail",
      "Có thẩm mỹ",
      "Khéo tay, tỉ mỉ",
      "Giao tiếp tốt"
    ],
    benefits: [
      "Lương cứng + hoa hồng",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng doanh thu"
    ],
    skills: ["Nail", "Sơn gel", "Vẽ móng", "Thẩm mỹ"],
    logo: "💅",
    hot: true,
    category: "service",
    subCategory: "beauty",
    featured: true,
    postedDate: "2024-03-19",
    deadline: "2024-04-19"
  },
  {
    id: "SERV-BEAUTY-003",
    title: "Thợ làm tóc (học việc)",
    company: "Salon Đà Nẵng",
    location: "Hải Châu",
    salary: "4-7M",
    type: "Full-time",
    experience: "0 năm",
    level: "Học việc",
    description: "Học cắt, gội, nhuộm tóc, hỗ trợ thợ chính",
    requirements: [
      "Đam mê làm tóc",
      "Chăm chỉ, ham học hỏi",
      "Ngoại hình sáng",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương học việc + phụ cấp",
      "Đào tạo bài bản",
      "Đồng phục",
      "Cơ hội thăng tiến"
    ],
    skills: ["Học việc", "Chăm chỉ", "Ham học", "Hỗ trợ"],
    logo: "✂️",
    hot: false,
    category: "service",
    subCategory: "beauty",
    featured: false,
    postedDate: "2024-03-18",
    deadline: "2024-04-18"
  },
  {
    id: "SERV-BEAUTY-004",
    title: "Nhân viên massage",
    company: "Sen Spa",
    location: "Ngũ Hành Sơn",
    salary: "7-11M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Nhân viên",
    description: "Massage thư giãn, tẩy tế bào chết, chăm sóc khách",
    requirements: [
      "Có kinh nghiệm massage",
      "Khéo tay, nhẹ nhàng",
      "Sức khỏe tốt",
      "Giao tiếp tốt"
    ],
    benefits: [
      "Lương cứng + tips",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng doanh thu"
    ],
    skills: ["Massage", "Chăm sóc", "Nhẹ nhàng", "Sức khỏe"],
    logo: "💆",
    hot: false,
    category: "service",
    subCategory: "beauty",
    featured: false,
    postedDate: "2024-03-17",
    deadline: "2024-04-17"
  },

  // ========== NHÓM KHÁCH SẠN – LƯU TRÚ ==========
  {
    id: "SERV-HOTEL-001",
    title: "Lễ tân khách sạn",
    company: "Novotel Đà Nẵng",
    location: "Hải Châu",
    salary: "7-10M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Đón tiếp, check-in/check-out, tư vấn dịch vụ khách sạn",
    requirements: [
      "Ngoại hình khá",
      "Giao tiếp tốt",
      "Tiếng Anh cơ bản",
      "Sử dụng vi tính"
    ],
    benefits: [
      "Lương cơ bản + phụ cấp + tip",
      "Bảo hiểm",
      "Đồng phục",
      "Đào tạo nghiệp vụ"
    ],
    skills: ["Lễ tân", "Tiếng Anh", "Giao tiếp", "Vi tính"],
    logo: "🏨",
    hot: true,
    category: "service",
    subCategory: "hotel",
    featured: true,
    postedDate: "2024-03-20",
    deadline: "2024-04-20"
  },
  {
    id: "SERV-HOTEL-002",
    title: "Nhân viên buồng phòng",
    company: "Furama Resort",
    location: "Sơn Trà",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Dọn dẹp phòng khách, thay ga giường, vệ sinh khu vực phòng",
    requirements: [
      "Sức khỏe tốt",
      "Chăm chỉ",
      "Có trách nhiệm",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Ăn trưa",
      "Đồng phục",
      "Thưởng lễ Tết"
    ],
    skills: ["Dọn dẹp", "Chăm chỉ", "Trách nhiệm", "Vệ sinh"],
    logo: "🧹",
    hot: false,
    category: "service",
    subCategory: "hotel",
    featured: false,
    postedDate: "2024-03-19",
    deadline: "2024-04-19"
  },
  {
    id: "SERV-HOTEL-003",
    title: "Bellman (xách hành lý)",
    company: "Hilton Đà Nẵng",
    location: "Hải Châu",
    salary: "6-9M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Hỗ trợ khách xách hành lý, mở cửa, chào đón khách",
    requirements: [
      "Ngoại hình ưa nhìn",
      "Nhanh nhẹn, thân thiện",
      "Giao tiếp tốt",
      "Tiếng Anh cơ bản"
    ],
    benefits: [
      "Lương cơ bản + tip",
      "Bảo hiểm",
      "Đồng phục",
      "Môi trường chuyên nghiệp"
    ],
    skills: ["Giao tiếp", "Nhanh nhẹn", "Tiếng Anh", "Phục vụ"],
    logo: "🛎️",
    hot: false,
    category: "service",
    subCategory: "hotel",
    featured: false,
    postedDate: "2024-03-18",
    deadline: "2024-04-18"
  },
  {
    id: "SERV-HOTEL-004",
    title: "Tạp vụ khách sạn",
    company: "Grand Mercure",
    location: "Ngũ Hành Sơn",
    salary: "5-7M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Vệ sinh khu vực công cộng, hành lang, sảnh, nhà vệ sinh",
    requirements: [
      "Chăm chỉ, siêng năng",
      "Có trách nhiệm",
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
    category: "service",
    subCategory: "hotel",
    featured: false,
    postedDate: "2024-03-17",
    deadline: "2024-04-17"
  },

  // ========== NHÓM VỆ SINH – LAO ĐỘNG DỊCH VỤ ==========
  {
    id: "SERV-CLEAN-001",
    title: "Nhân viên vệ sinh",
    company: "Dịch Vụ Vệ Sinh Đà Nẵng",
    location: "Toàn Đà Nẵng",
    salary: "5-7M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Vệ sinh văn phòng, tòa nhà, công ty, trung tâm thương mại",
    requirements: [
      "Chăm chỉ, cẩn thận",
      "Sức khỏe tốt",
      "Có thể làm theo ca",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Vệ sinh", "Chăm chỉ", "Sức khỏe", "Cẩn thận"],
    logo: "🧹",
    hot: false,
    category: "service",
    subCategory: "clean",
    featured: false,
    postedDate: "2024-03-20",
    deadline: "2024-04-20"
  },
  {
    id: "SERV-CLEAN-002",
    title: "Tạp vụ",
    company: "Văn Phòng Đà Nẵng",
    location: "Hải Châu",
    salary: "5-7M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Dọn dẹp, pha nước, hỗ trợ văn phòng",
    requirements: [
      "Chăm chỉ, trung thực",
      "Có trách nhiệm",
      "Sức khỏe tốt",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Dọn dẹp", "Chăm chỉ", "Trách nhiệm", "Hỗ trợ"],
    logo: "🧹",
    hot: false,
    category: "service",
    subCategory: "clean",
    featured: false,
    postedDate: "2024-03-19",
    deadline: "2024-04-19"
  },
  {
    id: "SERV-CLEAN-003",
    title: "Dọn dẹp văn phòng",
    company: "Tòa nhà Indochina",
    location: "Hải Châu",
    salary: "5-7M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Vệ sinh văn phòng, lau bàn ghế, hút bụi, đổ rác",
    requirements: [
      "Chăm chỉ, cẩn thận",
      "Sức khỏe tốt",
      "Làm việc theo ca",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Vệ sinh", "Dọn dẹp", "Chăm chỉ", "Cẩn thận"],
    logo: "🧹",
    hot: false,
    category: "service",
    subCategory: "clean",
    featured: false,
    postedDate: "2024-03-18",
    deadline: "2024-04-18"
  },
  {
    id: "SERV-CLEAN-004",
    title: "Vệ sinh công nghiệp",
    company: "Công Ty Vệ Sinh Xanh",
    location: "Toàn Đà Nẵng",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Vệ sinh nhà xưởng, công trình, khu công nghiệp",
    requirements: [
      "Sức khỏe tốt",
      "Chịu khó",
      "Có thể làm thêm giờ",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng công trình"
    ],
    skills: ["Vệ sinh", "Sức khỏe", "Chịu khó", "Làm việc nhóm"],
    logo: "🏭",
    hot: false,
    category: "service",
    subCategory: "clean",
    featured: false,
    postedDate: "2024-03-17",
    deadline: "2024-04-17"
  },

  // ========== NHÓM HỖ TRỢ – VẬN HÀNH ==========
  {
    id: "SERV-OP-001",
    title: "Nhân viên giữ xe",
    company: "Vincom Đà Nẵng",
    location: "Hải Châu",
    salary: "5-7M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Hướng dẫn khách gửi xe, sắp xếp xe, đảm bảo an toàn",
    requirements: [
      "Sức khỏe tốt",
      "Trung thực",
      "Giao tiếp tốt",
      "Có thể làm theo ca"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Giữ xe", "Sắp xếp", "Trung thực", "Giao tiếp"],
    logo: "🅿️",
    hot: false,
    category: "service",
    subCategory: "operation",
    featured: false,
    postedDate: "2024-03-20",
    deadline: "2024-04-20"
  },
  {
    id: "SERV-OP-002",
    title: "Bảo vệ",
    company: "Bảo Vệ Đà Nẵng",
    location: "Toàn Đà Nẵng",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Đảm bảo an ninh trật tự, kiểm soát ra vào, tuần tra",
    requirements: [
      "Sức khỏe tốt",
      "Trung thực",
      "Có trách nhiệm",
      "Có chứng chỉ bảo vệ là lợi thế"
    ],
    benefits: [
      "Lương cứng + phụ cấp",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Bảo vệ", "An ninh", "Trung thực", "Trách nhiệm"],
    logo: "🛡️",
    hot: true,
    category: "service",
    subCategory: "operation",
    featured: true,
    postedDate: "2024-03-19",
    deadline: "2024-04-19"
  },
  {
    id: "SERV-OP-003",
    title: "Giao hàng (shipper)",
    company: "ShopeeFood",
    location: "Toàn Đà Nẵng",
    salary: "7-15M",
    type: "Full-time/Part-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Giao đồ ăn, hàng hóa cho khách, đảm bảo đúng giờ",
    requirements: [
      "Có xe máy",
      "Có bằng lái",
      "Thông thạo đường Đà Nẵng",
      "Sức khỏe tốt"
    ],
    benefits: [
      "Lương theo đơn hàng",
      "Phụ cấp xăng",
      "Bảo hiểm",
      "Thưởng doanh số"
    ],
    skills: ["Giao hàng", "Lái xe", "Đường phố", "Nhanh nhẹn"],
    logo: "🛵",
    hot: true,
    category: "service",
    subCategory: "operation",
    featured: true,
    postedDate: "2024-03-18",
    deadline: "2024-04-18"
  },
  {
    id: "SERV-OP-004",
    title: "Nhân viên trực quầy",
    company: "Circle K",
    location: "Hải Châu",
    salary: "6-8M",
    type: "Full-time",
    experience: "0-1 năm",
    level: "Nhân viên",
    description: "Trực quầy thanh toán, tư vấn sản phẩm, kiểm kho",
    requirements: [
      "Nhanh nhẹn, thân thiện",
      "Giao tiếp tốt",
      "Có thể làm theo ca",
      "Không yêu cầu kinh nghiệm"
    ],
    benefits: [
      "Lương cứng + phụ cấp ca",
      "Bảo hiểm",
      "Đồng phục",
      "Thưởng tháng 13"
    ],
    skills: ["Thu ngân", "Tư vấn", "Giao tiếp", "Nhanh nhẹn"],
    logo: "🏪",
    hot: false,
    category: "service",
    subCategory: "operation",
    featured: false,
    postedDate: "2024-03-17",
    deadline: "2024-04-17"
  }
];

// ===========================================
// CÁC HÀM TIỆN ÍCH CHO LĨNH VỰC DỊCH VỤ
// ===========================================

// Tổng số lượng việc làm Dịch vụ
export const serviceJobsCount = serviceJobs.length; // 28 jobs

// Lấy tất cả việc làm Dịch vụ
export const getAllServiceJobs = () => serviceJobs;

// Lấy việc làm Dịch vụ theo ID
export const getServiceJobById = (id) => serviceJobs.find(job => job.id === id);

// Lấy việc làm Dịch vụ theo subCategory
export const getServiceJobsBySubCategory = (subCategory) => {
  return serviceJobs.filter(job => job.subCategory === subCategory);
};

// Lấy việc làm Dịch vụ nổi bật (hot)
export const getHotServiceJobs = () => serviceJobs.filter(job => job.hot === true);

// Lấy việc làm Dịch vụ featured
export const getFeaturedServiceJobs = () => serviceJobs.filter(job => job.featured === true);

// ===========================================
// DANH SÁCH THEO SUBCATEGORY
// ===========================================

// Nhóm ăn uống
export const fbJobs = serviceJobs.filter(job => job.subCategory === "fb");
// Nhóm cửa hàng - siêu thị
export const storeJobs = serviceJobs.filter(job => job.subCategory === "store");
// Nhóm làm đẹp
export const beautyJobs = serviceJobs.filter(job => job.subCategory === "beauty");
// Nhóm khách sạn
export const serviceHotelJobs = serviceJobs.filter(job => job.subCategory === "hotel");
// Nhóm vệ sinh
export const cleanJobs = serviceJobs.filter(job => job.subCategory === "clean");
// Nhóm hỗ trợ - vận hành
export const operationJobs = serviceJobs.filter(job => job.subCategory === "operation");

// ===========================================
// SỐ LƯỢNG THEO SUBCATEGORY
// ===========================================

export const fbJobsCount = fbJobs.length; // 6 jobs
export const storeJobsCount = storeJobs.length; // 4 jobs
export const beautyJobsCount = beautyJobs.length; // 4 jobs
export const serviceHotelJobsCount = serviceHotelJobs.length; // 4 jobs
export const cleanJobsCount = cleanJobs.length; // 4 jobs
export const operationJobsCount = operationJobs.length; // 4 jobs