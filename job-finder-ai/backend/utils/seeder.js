// backend/utils/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../models/Job');

dotenv.config();

// ========== IMPORT DỮ LIỆU TỪ CÁC FILE ==========
// Bạn cần copy nội dung của 5 file jobs vào đây

const itJobs = [
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
  // JOB NỔI BẬT 2 - Frontend
  {
    id: "IT-FE-004",
    title: "Senior Frontend Developer (Next.js)",
    company: "Viettel",
    location: "Liên Chiểu",
    salary: "20-30M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Xây dựng ứng dụng web với Next.js và TypeScript",
    requirements: [
      "Thành thạo Next.js và TypeScript",
      "Kinh nghiệm với TailwindCSS",
      "Hiểu về SSR và SSG",
      "Tối ưu SEO"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cổ phiếu thưởng",
      "Đào tạo chuyên sâu"
    ],
    skills: ["Next.js", "TypeScript", "TailwindCSS", "React"],
    logo: "⚡",
    hot: true,
    category: "it",
    subCategory: "frontend",
    featured: true,
    postedDate: "2024-03-16",
    deadline: "2024-04-16"
  },
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "frontend",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== BACKEND DEVELOPER ==========
  // JOB NỔI BẬT 3
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
  // JOB NỔI BẬT 4 - Backend
  {
    id: "IT-BE-004",
    title: "Senior Backend Developer (Go)",
    company: "VinAI",
    location: "Ngũ Hành Sơn",
    salary: "25-35M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Phát triển hệ thống high-performance với Golang",
    requirements: [
      "Thành thạo Golang",
      "Kinh nghiệm với gRPC và microservices",
      "Hiểu về hệ thống phân tán",
      "Kinh nghiệm với Kafka/RabbitMQ"
    ],
    benefits: [
      "Lương rất cao",
      "Bảo hiểm gia đình",
      "Cổ phiếu",
      "Cơ hội onsite nước ngoài"
    ],
    skills: ["Golang", "gRPC", "Microservices", "Kafka"],
    logo: "🐹",
    hot: true,
    category: "it",
    subCategory: "backend",
    featured: true,
    postedDate: "2024-03-17",
    deadline: "2024-04-17"
  },
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "backend",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== FULLSTACK DEVELOPER ==========
  // JOB NỔI BẬT 5
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
  // JOB NỔI BẬT 6 - Fullstack
  {
    id: "IT-FS-003",
    title: "Fullstack Developer (Java/React)",
    company: "FPT Software",
    location: "Hòa Vang",
    salary: "20-30M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Phát triển hệ thống doanh nghiệp với Spring Boot và React",
    requirements: [
      "Thành thạo Java Spring Boot",
      "Kinh nghiệm với React",
      "Hiểu về microservices",
      "Tiếng Anh giao tiếp"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cơ hội onsite",
      "Đào tạo chuyên sâu"
    ],
    skills: ["Java", "Spring Boot", "React", "Microservices"],
    logo: "☕",
    hot: true,
    category: "it",
    subCategory: "fullstack",
    featured: true,
    postedDate: "2024-03-18",
    deadline: "2024-04-18"
  },
  // JOB PHỔ THÔNG
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
  // JOB NỔI BẬT 7 - Mobile
  {
    id: "IT-MB-005",
    title: "Senior Mobile Developer (Flutter)",
    company: "GAMELOFT",
    location: "Sơn Trà",
    salary: "20-30M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Phát triển ứng dụng game mobile với Flutter",
    requirements: [
      "Thành thạo Flutter và Dart",
      "Kinh nghiệm với game development",
      "Hiểu về animation và performance",
      "Đã có game trên CH Play/App Store"
    ],
    benefits: [
      "Lương cao",
      "Môi trường game",
      "Thưởng theo sản phẩm",
      "Du lịch hàng năm"
    ],
    skills: ["Flutter", "Dart", "Game Development", "Animation"],
    logo: "🎮",
    hot: true,
    category: "it",
    subCategory: "mobile",
    featured: true,
    postedDate: "2024-03-19",
    deadline: "2024-04-19"
  },
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "mobile",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "mobile",
    featured: false,
    postedDate: "2024-03-10",
    deadline: "2024-04-10"
  },
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "mobile",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "uiux",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },

  // ========== QA/TESTER ==========
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "qa",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },

  // ========== DEVOPS ==========
  // JOB NỔI BẬT 8 - DevOps
  {
    id: "IT-DO-003",
    title: "Senior DevOps Engineer (AWS/K8s)",
    company: "Viettel",
    location: "Liên Chiểu",
    salary: "25-35M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Quản lý hạ tầng cloud và Kubernetes quy mô lớn",
    requirements: [
      "Thành thạo AWS (EC2, EKS, S3)",
      "Kinh nghiệm với Kubernetes",
      "Hiểu về Infrastructure as Code (Terraform)",
      "Kinh nghiệm CI/CD (Jenkins, GitLab CI)"
    ],
    benefits: [
      "Lương cao",
      "Bảo hiểm gia đình",
      "Cổ phiếu",
      "Đào tạo chuyên sâu"
    ],
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    logo: "☁️",
    hot: true,
    category: "it",
    subCategory: "devops",
    featured: true,
    postedDate: "2024-03-21",
    deadline: "2024-04-21"
  },
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "devops",
    featured: false,
    postedDate: "2024-03-14",
    deadline: "2024-04-14"
  },
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "data",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "data",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  },

  // ========== AI ENGINEER ==========
  // JOB NỔI BẬT 9 - AI
  {
    id: "IT-AI-003",
    title: "Senior AI Engineer (Computer Vision)",
    company: "VinAI",
    location: "Ngũ Hành Sơn",
    salary: "25-35M",
    type: "Full-time",
    experience: "3-5 năm",
    level: "Senior",
    description: "Phát triển các mô hình Computer Vision cho sản phẩm AI",
    requirements: [
      "Thành thạo Python và PyTorch/TensorFlow",
      "Kinh nghiệm với Computer Vision",
      "Hiểu về CNN, YOLO, Detectron2",
      "Có sản phẩm AI thực tế"
    ],
    benefits: [
      "Lương rất cao",
      "Môi trường nghiên cứu",
      "Cơ hội công bố paper",
      "Cổ phiếu"
    ],
    skills: ["Python", "PyTorch", "Computer Vision", "Deep Learning"],
    logo: "👁️",
    hot: true,
    category: "it",
    subCategory: "ai",
    featured: true,
    postedDate: "2024-03-20",
    deadline: "2024-04-20"
  },
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "ai",
    featured: false,
    postedDate: "2024-03-12",
    deadline: "2024-04-12"
  },
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "support",
    featured: false,
    postedDate: "2024-03-11",
    deadline: "2024-04-11"
  },

  // ========== SYSTEM ADMIN ==========
  // JOB PHỔ THÔNG
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
  // JOB PHỔ THÔNG
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
    hot: false,
    category: "it",
    subCategory: "sysadmin",
    featured: false,
    postedDate: "2024-03-13",
    deadline: "2024-04-13"
  }
];

const tourismJobs = [
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

const businessJobs = [
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

const constructionJobs = [
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

const serviceJobs = [
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

// Gộp tất cả jobs
const allJobs = [...itJobs, ...tourismJobs, ...businessJobs, ...constructionJobs, ...serviceJobs];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing jobs
    const deleted = await Job.deleteMany();
    console.log(`🗑️ Cleared ${deleted.deletedCount} existing jobs`);
    
    // Insert new jobs
    const inserted = await Job.insertMany(allJobs);
    console.log(`✅ Inserted ${inserted.length} jobs`);
    
    // Stats by category
    const stats = {};
    allJobs.forEach(job => {
      stats[job.category] = (stats[job.category] || 0) + 1;
    });
    console.log('📊 Jobs by category:', stats);
    
    console.log('🎉 Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();