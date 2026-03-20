// ===========================================
// DỮ LIỆU VIỆC LÀM LĨNH VỰC IT - PHỔ THÔNG
// ===========================================

export const itJobs = [
  // ========== FRONTEND DEVELOPER ==========
  {
    id: "IT-FE-001",
    title: "Frontend Developer (React)",
    company: "FPT Software",
    location: "Hải Châu",
    salary: "12-20M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Junior - Middle",
    description: "Phát triển giao diện người dùng với ReactJS, làm việc với team Agile",
    requirements: [
      "Thành thạo HTML5, CSS3, JavaScript",
      "Có kinh nghiệm với ReactJS và các thư viện liên quan",
      "Hiểu biết về RESTful API",
      "Tối ưu hiệu suất website"
    ],
    benefits: [
      "Lương tháng 13, thưởng dự án",
      "Bảo hiểm sức khỏe",
      "Đào tạo chuyên sâu",
      "Môi trường trẻ trung, năng động"
    ],
    skills: ["React", "JavaScript", "HTML/CSS", "Redux"],
    logo: "⚛️",
    hot: true,
    category: "it",
    subCategory: "frontend",
    featured: true,
    postedDate: "2024-03-15",
    deadline: "2024-04-15"
  },
  {
    id: "IT-FE-002",
    title: "Frontend Developer (Vue.js)",
    company: "TMA Solutions",
    location: "Ngũ Hành Sơn",
    salary: "10-18M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Junior",
    description: "Xây dựng ứng dụng web sử dụng Vue.js và Nuxt.js",
    requirements: [
      "Có kinh nghiệm với Vue.js hoặc Nuxt.js",
      "Hiểu về state management (Vuex)",
      "Có kiến thức về TypeScript là lợi thế",
      "Làm việc nhóm tốt"
    ],
    benefits: [
      "Lương tháng 13",
      "Du lịch hàng năm",
      "Team building thường xuyên"
    ],
    skills: ["Vue.js", "JavaScript", "TypeScript", "Vuex"],
    logo: "🟢",
    hot: false,
    category: "it",
    subCategory: "frontend",
    featured: false,
    postedDate: "2024-03-10",
    deadline: "2024-04-10"
  },
  {
    id: "IT-FE-003",
    title: "Frontend Developer (Angular)",
    company: "Axon Active",
    location: "Hải Châu",
    salary: "15-25M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Phát triển ứng dụng doanh nghiệp với Angular",
    requirements: [
      "Kinh nghiệm thực tế với Angular 2+",
      "Hiểu về RxJS và state management",
      "Kinh nghiệm làm việc với RESTful APIs",
      "Tiếng Anh giao tiếp cơ bản"
    ],
    benefits: [
      "Lương cạnh tranh",
      "Bảo hiểm cao cấp",
      "Cơ hội học tập quốc tế"
    ],
    skills: ["Angular", "TypeScript", "RxJS", "NgRx"],
    logo: "🔺",
    hot: true,
    category: "it",
    subCategory: "frontend",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== BACKEND DEVELOPER ==========
  {
    id: "IT-BE-001",
    title: "Backend Developer (Node.js)",
    company: "Axon Active",
    location: "Ngũ Hành Sơn",
    salary: "15-25M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Phát triển API và microservices với Node.js",
    requirements: [
      "Thành thạo Node.js và Express.js",
      "Kinh nghiệm với MongoDB hoặc PostgreSQL",
      "Hiểu về RESTful API design",
      "Có kiến thức về Docker"
    ],
    benefits: [
      "Lương tháng 13",
      "Bảo hiểm sức khỏe",
      "Đào tạo chuyên môn"
    ],
    skills: ["Node.js", "Express", "MongoDB", "Docker"],
    logo: "🟢",
    hot: true,
    category: "it",
    subCategory: "backend",
    featured: true,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "IT-BE-002",
    title: "Backend Developer (Python)",
    company: "GAMELOFT",
    location: "Sơn Trà",
    salary: "14-22M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Junior - Middle",
    description: "Phát triển backend game với Python/Django",
    requirements: [
      "Thành thạo Python",
      "Kinh nghiệm với Django hoặc Flask",
      "Hiểu về database (PostgreSQL, MySQL)",
      "Có niềm đam mê với game"
    ],
    benefits: [
      "Môi trường làm việc trẻ trung",
      "Ăn trưa miễn phí",
      "Hoạt động thể thao hàng tuần"
    ],
    skills: ["Python", "Django", "PostgreSQL", "REST API"],
    logo: "🐍",
    hot: false,
    category: "it",
    subCategory: "backend",
    featured: false,
    postedDate: "2024-03-08",
    deadline: "2024-04-08"
  },
  {
    id: "IT-BE-003",
    title: "Backend Developer (Java)",
    company: "FPT Software",
    location: "Hòa Vang",
    salary: "16-26M",
    type: "Full-time",
    experience: "2-5 năm",
    level: "Middle - Senior",
    description: "Phát triển hệ thống ngân hàng với Java Spring Boot",
    requirements: [
      "Kinh nghiệm với Java và Spring Boot",
      "Hiểu về microservices architecture",
      "Kinh nghiệm với Oracle/MySQL",
      "Tiếng Anh tốt"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cơ hội onsite nước ngoài"
    ],
    skills: ["Java", "Spring Boot", "Microservices", "Oracle"],
    logo: "☕",
    hot: true,
    category: "it",
    subCategory: "backend",
    featured: true,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== FULLSTACK DEVELOPER ==========
  {
    id: "IT-FS-001",
    title: "Fullstack Developer (MERN)",
    company: "OX Consulting",
    location: "Hải Châu",
    salary: "18-28M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Phát triển full-stack với MongoDB, Express, React, Node.js",
    requirements: [
      "Kinh nghiệm với MERN stack",
      "Hiểu về RESTful APIs",
      "Có kiến thức về authentication/authorization",
      "Kinh nghiệm làm việc với Git"
    ],
    benefits: [
      "Lương thưởng hấp dẫn",
      "Macbook Pro cho dev",
      "Flexible working hours"
    ],
    skills: ["MongoDB", "Express", "React", "Node.js"],
    logo: "⚛️",
    hot: true,
    category: "it",
    subCategory: "fullstack",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },
  {
    id: "IT-FS-002",
    title: "Fullstack Developer (PHP)",
    company: "TMA Solutions",
    location: "Liên Chiểu",
    salary: "14-22M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Junior - Middle",
    description: "Phát triển website thương mại điện tử với Laravel và Vue.js",
    requirements: [
      "Thành thạo PHP và Laravel",
      "Có kinh nghiệm với Vue.js",
      "Hiểu về MySQL",
      "Làm việc nhóm tốt"
    ],
    benefits: [
      "Lương tháng 13",
      "Bảo hiểm sức khỏe",
      "Đào tạo nội bộ"
    ],
    skills: ["PHP", "Laravel", "Vue.js", "MySQL"],
    logo: "🐘",
    hot: false,
    category: "it",
    subCategory: "fullstack",
    featured: false,
    postedDate: "2024-03-09",
    deadline: "2024-04-09"
  },

  // ========== MOBILE DEVELOPER ==========
  {
    id: "IT-MB-001",
    title: "Mobile Developer (Flutter)",
    company: "GAMELOFT",
    location: "Sơn Trà",
    salary: "14-22M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Junior - Middle",
    description: "Phát triển ứng dụng di động đa nền tảng với Flutter",
    requirements: [
      "Kinh nghiệm với Flutter và Dart",
      "Hiểu về state management (Provider, Bloc)",
      "Có kiến thức về RESTful APIs",
      "Đã từng publish app lên CH Play/App Store"
    ],
    benefits: [
      "Môi trường startup năng động",
      "Cơ hội học hỏi công nghệ mới",
      "Team building hàng tháng"
    ],
    skills: ["Flutter", "Dart", "Firebase", "REST API"],
    logo: "📱",
    hot: true,
    category: "it",
    subCategory: "mobile",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "IT-MB-002",
    title: "Mobile Developer (React Native)",
    company: "OX Consulting",
    location: "Hải Châu",
    salary: "15-23M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Phát triển ứng dụng mobile với React Native",
    requirements: [
      "Kinh nghiệm với React Native",
      "Hiểu về Redux/MobX",
      "Có kiến thức về native modules",
      "Kinh nghiệm tối ưu hiệu suất app"
    ],
    benefits: [
      "Lương cứng + thưởng dự án",
      "Bảo hiểm sức khỏe cao cấp",
      "Macbook Pro"
    ],
    skills: ["React Native", "Redux", "JavaScript", "iOS/Android"],
    logo: "📱",
    hot: true,
    category: "it",
    subCategory: "mobile",
    featured: true,
    postedDate: "2024-03-10",
    deadline: "2024-04-10"
  },
  {
    id: "IT-MB-003",
    title: "Mobile Developer (iOS)",
    company: "Axon Active",
    location: "Ngũ Hành Sơn",
    salary: "18-28M",
    type: "Full-time",
    experience: "2-5 năm",
    level: "Middle - Senior",
    description: "Phát triển ứng dụng iOS native với Swift",
    requirements: [
      "Thành thạo Swift và UIKit/SwiftUI",
      "Kinh nghiệm với Combine và async/await",
      "Hiểu về kiến trúc MVVM, VIPER",
      "Đã có app trên App Store"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Macbook Pro + iPhone"
    ],
    skills: ["Swift", "iOS", "UIKit", "SwiftUI"],
    logo: "🍎",
    hot: true,
    category: "it",
    subCategory: "mobile",
    featured: true,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "IT-MB-004",
    title: "Mobile Developer (Android)",
    company: "GAMELOFT",
    location: "Sơn Trà",
    salary: "16-24M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Phát triển ứng dụng Android với Kotlin",
    requirements: [
      "Thành thạo Kotlin và Android SDK",
      "Kinh nghiệm với Coroutines và Flow",
      "Hiểu về Material Design guidelines",
      "Đã có app trên CH Play"
    ],
    benefits: [
      "Lương thưởng hấp dẫn",
      "Môi trường quốc tế",
      "Du lịch hàng năm"
    ],
    skills: ["Kotlin", "Android", "Jetpack", "Material Design"],
    logo: "🤖",
    hot: false,
    category: "it",
    subCategory: "mobile",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== UI/UX DESIGNER ==========
  {
    id: "IT-UX-001",
    title: "UI/UX Designer",
    company: "DesignBold",
    location: "Hải Châu",
    salary: "12-18M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Junior - Middle",
    description: "Thiết kế giao diện và trải nghiệm người dùng cho web/app",
    requirements: [
      "Thành thạo Figma, Adobe XD",
      "Hiểu về nguyên lý thiết kế và UX research",
      "Có portfolio các dự án đã làm",
      "Kỹ năng presentation tốt"
    ],
    benefits: [
      "Lương tháng 13",
      "Môi trường sáng tạo",
      "Đào tạo chuyên sâu"
    ],
    skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
    logo: "🎨",
    hot: false,
    category: "it",
    subCategory: "uiux",
    featured: false,
    postedDate: "2024-03-08",
    deadline: "2024-04-08"
  },
  {
    id: "IT-UX-002",
    title: "UI/UX Designer (Senior)",
    company: "FPT Software",
    location: "Hòa Vang",
    salary: "18-25M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Lead design cho các dự án lớn, mentor junior",
    requirements: [
      "Kinh nghiệm lead design projects",
      "Thành thạo design system",
      "Kỹ năng research và testing",
      "Tiếng Anh giao tiếp tốt"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cơ hội onsite"
    ],
    skills: ["Design System", "User Research", "Figma", "Team Lead"],
    logo: "🎯",
    hot: true,
    category: "it",
    subCategory: "uiux",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },

  // ========== QA/TESTER ==========
  {
    id: "IT-QA-001",
    title: "QA/Tester",
    company: "LogiGear",
    location: "Ngũ Hành Sơn",
    salary: "10-16M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Junior",
    description: "Kiểm thử chất lượng sản phẩm phần mềm",
    requirements: [
      "Hiểu về quy trình kiểm thử",
      "Kinh nghiệm viết test cases",
      "Có kiến thức về automation test là lợi thế",
      "Cẩn thận, tỉ mỉ"
    ],
    benefits: [
      "Lương tháng 13",
      "Đào tạo chuyên môn",
      "Bảo hiểm sức khỏe"
    ],
    skills: ["Manual Test", "Test Cases", "Bug Tracking", "SQL"],
    logo: "🔍",
    hot: false,
    category: "it",
    subCategory: "qa",
    featured: false,
    postedDate: "2024-03-09",
    deadline: "2024-04-09"
  },
  {
    id: "IT-QA-002",
    title: "QA Automation",
    company: "Axon Active",
    location: "Hải Châu",
    salary: "14-22M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Xây dựng framework automation test",
    requirements: [
      "Kinh nghiệm với Selenium/Cypress",
      "Biết lập trình JavaScript/Python",
      "Hiểu về CI/CD",
      "Kinh nghiệm performance test là lợi thế"
    ],
    benefits: [
      "Lương cạnh tranh",
      "Macbook Pro",
      "Đào tạo chuyên sâu"
    ],
    skills: ["Selenium", "Cypress", "JavaScript", "CI/CD"],
    logo: "🤖",
    hot: true,
    category: "it",
    subCategory: "qa",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== DEVOPS ==========
  {
    id: "IT-DO-001",
    title: "DevOps Engineer",
    company: "Viettel",
    location: "Liên Chiểu",
    salary: "20-30M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Quản lý hạ tầng và tự động hóa deployment",
    requirements: [
      "Kinh nghiệm với AWS/Azure/GCP",
      "Thành thạo Docker và Kubernetes",
      "Hiểu về CI/CD (Jenkins, GitLab CI)",
      "Kinh nghiệm với Terraform/Ansible"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cổ phiếu thưởng"
    ],
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    logo: "🚀",
    hot: true,
    category: "it",
    subCategory: "devops",
    featured: true,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  {
    id: "IT-DO-002",
    title: "DevOps Engineer (Junior)",
    company: "TMA Solutions",
    location: "Ngũ Hành Sơn",
    salary: "12-18M",
    type: "Full-time",
    experience: "1-2 năm",
    level: "Junior",
    description: "Hỗ trợ quản lý hạ tầng và CI/CD",
    requirements: [
      "Có kiến thức về Linux",
      "Biết về Docker cơ bản",
      "Hiểu về networking",
      "Ham học hỏi"
    ],
    benefits: [
      "Lương tháng 13",
      "Đào tạo chuyên môn",
      "Môi trường trẻ"
    ],
    skills: ["Linux", "Docker", "Git", "Networking"],
    logo: "⚙️",
    hot: false,
    category: "it",
    subCategory: "devops",
    featured: false,
    postedDate: "2024-03-10",
    deadline: "2024-04-10"
  },

  // ========== DATA ANALYST ==========
  {
    id: "IT-DA-001",
    title: "Data Analyst",
    company: "DataHouse",
    location: "Hải Châu",
    salary: "14-22M",
    type: "Full-time",
    experience: "1-3 năm",
    level: "Junior - Middle",
    description: "Phân tích dữ liệu và tạo báo cáo business",
    requirements: [
      "Thành thạo SQL",
      "Kinh nghiệm với Python (Pandas, NumPy)",
      "Biết sử dụng Power BI/Tableau",
      "Kỹ năng phân tích tốt"
    ],
    benefits: [
      "Lương tháng 13",
      "Bảo hiểm sức khỏe",
      "Đào tạo chuyên môn"
    ],
    skills: ["SQL", "Python", "Power BI", "Excel"],
    logo: "📊",
    hot: true,
    category: "it",
    subCategory: "data",
    featured: true,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },
  {
    id: "IT-DA-002",
    title: "Data Analyst (Senior)",
    company: "VinAI",
    location: "Ngũ Hành Sơn",
    salary: "22-30M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Lead data analysis team và xây dựng chiến lược data",
    requirements: [
      "Kinh nghiệm lead team",
      "Thành thạo Python và SQL",
      "Kinh nghiệm với machine learning cơ bản",
      "Kỹ năng presentation tốt"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cổ phiếu"
    ],
    skills: ["Python", "SQL", "Machine Learning", "Team Lead"],
    logo: "📈",
    hot: true,
    category: "it",
    subCategory: "data",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },

  // ========== AI ENGINEER ==========
  {
    id: "IT-AI-001",
    title: "AI Engineer",
    company: "VinAI",
    location: "Ngũ Hành Sơn",
    salary: "18-28M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Xây dựng và triển khai mô hình AI/ML",
    requirements: [
      "Thành thạo Python và TensorFlow/PyTorch",
      "Hiểu về các thuật toán ML cơ bản",
      "Kinh nghiệm xử lý dữ liệu lớn",
      "Có kiến thức về computer vision/NLP"
    ],
    benefits: [
      "Lương cạnh tranh",
      "Môi trường nghiên cứu",
      "Cơ hội học tập quốc tế"
    ],
    skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning"],
    logo: "🤖",
    hot: true,
    category: "it",
    subCategory: "ai",
    featured: true,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  {
    id: "IT-AI-002",
    title: "AI Engineer (Junior)",
    company: "FPT Software",
    location: "Hòa Vang",
    salary: "12-18M",
    type: "Full-time",
    experience: "0-2 năm",
    level: "Junior",
    description: "Hỗ trợ phát triển và triển khai mô hình AI",
    requirements: [
      "Có kiến thức về Python",
      "Hiểu cơ bản về ML",
      "Ham học hỏi",
      "Giải thuật tốt"
    ],
    benefits: [
      "Lương tháng 13",
      "Đào tạo bài bản",
      "Mentor giàu kinh nghiệm"
    ],
    skills: ["Python", "Machine Learning Basics", "Mathematics", "Statistics"],
    logo: "🧠",
    hot: false,
    category: "it",
    subCategory: "ai",
    featured: false,
    postedDate: "2024-03-09",
    deadline: "2024-04-09"
  },

  // ========== IT SUPPORT ==========
  {
    id: "IT-IS-001",
    title: "IT Support",
    company: "UniNet",
    location: "Thanh Khê",
    salary: "8-12M",
    type: "Full-time",
    experience: "0-2 năm",
    level: "Junior",
    description: "Hỗ trợ kỹ thuật cho nhân viên văn phòng",
    requirements: [
      "Có kiến thức về hardware cơ bản",
      "Biết cài đặt và cấu hình Windows/Mac",
      "Kỹ năng giao tiếp tốt",
      "Sẵn sàng học hỏi"
    ],
    benefits: [
      "Lương tháng 13",
      "Bảo hiểm sức khỏe",
      "Đào tạo nội bộ"
    ],
    skills: ["Windows", "Networking", "Hardware", "Troubleshooting"],
    logo: "🖥️",
    hot: false,
    category: "it",
    subCategory: "support",
    featured: false,
    postedDate: "2024-03-08",
    deadline: "2024-04-08"
  },
  {
    id: "IT-IS-002",
    title: "IT Support (Senior)",
    company: "VNPT",
    location: "Hải Châu",
    salary: "12-18M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Quản lý hệ thống IT và support team",
    requirements: [
      "Kinh nghiệm quản trị hệ thống",
      "Hiểu về network và security",
      "Kỹ năng quản lý team",
      "Tiếng Anh giao tiếp"
    ],
    benefits: [
      "Lương cạnh tranh",
      "Bảo hiểm gia đình",
      "Du lịch hàng năm"
    ],
    skills: ["System Admin", "Network", "Security", "Team Management"],
    logo: "🔧",
    hot: true,
    category: "it",
    subCategory: "support",
    featured: true,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== SYSTEM ADMIN ==========
  {
    id: "IT-SA-001",
    title: "System Administrator",
    company: "VNPT",
    location: "Hải Châu",
    salary: "12-18M",
    type: "Full-time",
    experience: "2-4 năm",
    level: "Middle",
    description: "Quản trị hệ thống server và network",
    requirements: [
      "Kinh nghiệm với Linux/Windows Server",
      "Hiểu về networking (CCNA là lợi thế)",
      "Kinh nghiệm với ảo hóa (VMware)",
      "Kỹ năng troubleshooting tốt"
    ],
    benefits: [
      "Lương tháng 13",
      "Bảo hiểm sức khỏe",
      "Đào tạo chuyên sâu"
    ],
    skills: ["Linux", "Windows Server", "Networking", "VMware"],
    logo: "🔧",
    hot: false,
    category: "it",
    subCategory: "sysadmin",
    featured: false,
    postedDate: "2024-03-10",
    deadline: "2024-04-10"
  },
  {
    id: "IT-SA-002",
    title: "System Administrator (Senior)",
    company: "Viettel",
    location: "Liên Chiểu",
    salary: "18-25M",
    type: "Full-time",
    experience: "4-6 năm",
    level: "Senior",
    description: "Quản lý hệ thống lớn, bảo mật và hiệu suất",
    requirements: [
      "Kinh nghiệm quản trị hệ thống lớn",
      "Thành thạo Linux và scripting",
      "Hiểu về cloud (AWS/Azure)",
      "Kỹ năng quản lý dự án"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cổ phiếu"
    ],
    skills: ["Linux", "Cloud", "Automation", "Security"],
    logo: "⚙️",
    hot: true,
    category: "it",
    subCategory: "sysadmin",
    featured: true,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  }
];

// ===========================================
// CÁC HÀM TIỆN ÍCH CHO LĨNH VỰC IT
// ===========================================

// Tổng số lượng việc làm IT
export const itJobsCount = itJobs.length; // 26 jobs

// Lấy tất cả việc làm IT
export const getAllItJobs = () => itJobs;

// Lấy việc làm IT theo ID
export const getItJobById = (id) => itJobs.find(job => job.id === id);

// Lấy việc làm IT theo subCategory
export const getItJobsBySubCategory = (subCategory) => {
  return itJobs.filter(job => job.subCategory === subCategory);
};

// Lấy việc làm IT nổi bật (hot)
export const getHotItJobs = () => itJobs.filter(job => job.hot === true);

// Lấy việc làm IT featured
export const getFeaturedItJobs = () => itJobs.filter(job => job.featured === true);

// ===========================================
// DANH SÁCH THEO SUBCATEGORY
// ===========================================

export const frontendJobs = itJobs.filter(job => job.subCategory === "frontend");
export const backendJobs = itJobs.filter(job => job.subCategory === "backend");
export const fullstackJobs = itJobs.filter(job => job.subCategory === "fullstack");
export const mobileJobs = itJobs.filter(job => job.subCategory === "mobile");
export const uiuxJobs = itJobs.filter(job => job.subCategory === "uiux");
export const qaJobs = itJobs.filter(job => job.subCategory === "qa");
export const devopsJobs = itJobs.filter(job => job.subCategory === "devops");
export const dataJobs = itJobs.filter(job => job.subCategory === "data");
export const aiJobs = itJobs.filter(job => job.subCategory === "ai");
export const supportJobs = itJobs.filter(job => job.subCategory === "support");
export const sysadminJobs = itJobs.filter(job => job.subCategory === "sysadmin");

// ===========================================
// SỐ LƯỢNG THEO SUBCATEGORY
// ===========================================

export const frontendJobsCount = frontendJobs.length; // 3
export const backendJobsCount = backendJobs.length; // 3
export const fullstackJobsCount = fullstackJobs.length; // 2
export const mobileJobsCount = mobileJobs.length; // 4
export const uiuxJobsCount = uiuxJobs.length; // 2
export const qaJobsCount = qaJobs.length; // 2
export const devopsJobsCount = devopsJobs.length; // 2
export const dataJobsCount = dataJobs.length; // 2
export const aiJobsCount = aiJobs.length; // 2
export const supportJobsCount = supportJobs.length; // 2
export const sysadminJobsCount = sysadminJobs.length; // 2