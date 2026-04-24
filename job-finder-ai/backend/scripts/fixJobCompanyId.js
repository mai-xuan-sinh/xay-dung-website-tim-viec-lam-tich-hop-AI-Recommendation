// backend/scripts/fixJobCompanyId.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../models/Job');
const User = require('../models/User');

dotenv.config();

const fixJobCompanyId = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Tìm HR hệ thống
    let systemHR = await User.findOne({ email: 'hr@danangwork.vn' });
    
    if (!systemHR) {
      console.log('❌ Không tìm thấy HR hr@danangwork.vn');
      console.log('📝 Hãy tạo HR bằng lệnh:');
      console.log('curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"HR Hệ thống\",\"email\":\"hr@danangwork.vn\",\"password\":\"123456\",\"role\":\"hr\",\"companyName\":\"ĐANANG WORK - Hệ thống\"}"');
      process.exit(1);
    }
    
    console.log(`📢 Tìm thấy HR: ${systemHR.email} (${systemHR._id})`);
    
    // Cập nhật companyId cho tất cả job
    const result = await Job.updateMany(
      { $or: [{ companyId: { $exists: false } }, { companyId: null }] },
      { $set: { companyId: systemHR._id } }
    );
    
    console.log(`✅ Đã cập nhật ${result.modifiedCount} jobs với companyId = ${systemHR._id}`);
    
    // Kiểm tra kết quả
    const totalJobs = await Job.countDocuments();
    const updatedJobs = await Job.countDocuments({ companyId: systemHR._id });
    console.log(`📊 Tổng jobs: ${totalJobs}, Jobs có companyId: ${updatedJobs}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

fixJobCompanyId();