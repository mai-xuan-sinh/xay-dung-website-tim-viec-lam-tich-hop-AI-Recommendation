// backend/models/Job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Vui lòng nhập tiêu đề'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Vui lòng nhập tên công ty'],
    trim: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  location: {
    type: String,
    required: [true, 'Vui lòng nhập địa điểm']
  },
  salary: {
    type: String,
    required: [true, 'Vui lòng nhập mức lương']
  },
  type: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Part-time/Full-time', 'Cộng tác viên', 'Full-time/Part-time'],
    default: 'Full-time'
  },
  experience: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    enum: [
      'Mới tốt nghiệp', 'Nhân viên', 'Junior', 'Middle', 'Senior', 
      'Trưởng nhóm', 'Quản lý', 'Thợ', 'Kỹ sư', 'Phụ việc', 
      'Học việc', 'CTV', 'Tài xế', 'Junior - Middle', 'Middle - Senior',
      'Phụ tour', 'Giám sát', 'Thư ký', 'Phụ bếp', 'Thu ngân',
      'Kỹ thuật viên', 'Lễ tân', 'Bellman', 'Phục vụ', 'Tạp vụ',
      'Bảo vệ', 'Shipper', 'Phát triển KH', 'Sale thị trường',
      'Trưởng phòng', 'Phó phòng', 'Thực tập sinh', 'Cộng tác viên',
      'Phụ việc spa', 'CTV bán hàng', 'Giám đốc', 'Trợ lý', 'Thư ký',
      'Phụ việc spa', 'CTV', 'Nhà hàng','Khách sạn', 'dịch vụ','kinh doanh','kỹ thuật',
      'công nghệ thông tin','xây dựng','sản xuất','giáo dục','y tế','tài chính','ngân hàng',
      'bán lẻ','marketing','truyền thông','pháp lý','nhân sự','vận tải','du lịch','nông nghiệp'
    ],
    default: 'Nhân viên'
  },
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả công việc']
  },
  requirements: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  skills: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    enum: ['it', 'tourism', 'business', 'construction', 'service'],
    required: true
  },
  subCategory: {
    type: String,
    default: ''
  },
  hot: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'expired', 'rejected'],
    default: 'active'
  },
  views: {
    type: Number,
    default: 0
  },
  applications: {
    type: Number,
    default: 0
  },
  deadline: {
    type: Date,
    required: true
  },
  logo: {
    type: String,
    default: ''
  },
  postedDate: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: true
});

// Index for search
jobSchema.index({ title: 'text', description: 'text', skills: 'text' });

module.exports = mongoose.model('Job', jobSchema);