// backend/scripts/updateJobsWithSystemHR.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../models/Job');
const User = require('../models/User');

dotenv.config();

const updateJobs = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Tìm System HR
    const systemHR = await User.findOne({ email: 'system@danangwork.vn' });
    if (!systemHR) {
      console.log('❌ Không tìm thấy System HR. Hãy chạy createSystemHR.js trước!');
      process.exit(1);
    }
    
    console.log(`📢 System HR ID: ${systemHR._id}`);
    
    // Cập nhật tất cả job chưa có companyId
    const result = await Job.updateMany(
      { $or: [{ companyId: { $exists: false } }, { companyId: null }] },
      { $set: { companyId: systemHR._id } }
    );
    
    console.log(`✅ Đã cập nhật ${result.modifiedCount} jobs`);
    
    // Thống kê
    const totalJobs = await Job.countDocuments();
    const updatedJobs = await Job.countDocuments({ companyId: systemHR._id });
    console.log(`📊 Tổng jobs: ${totalJobs}, Jobs có companyId: ${updatedJobs}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

updateJobs();