// backend/scripts/assignCompanyIdToAllJobs.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Job = require('../models/Job');
const User = require('../models/User');

dotenv.config();

const assignCompanyId = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Kiểm tra xem đã có HR mặc định chưa
    let defaultHR = await User.findOne({ email: 'default.hr@danangwork.vn' });
    
    if (!defaultHR) {
      // Hash mật khẩu đúng cách
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Default@123', salt);
      
      defaultHR = await User.create({
        name: 'Default HR - Quản lý job hệ thống',
        email: 'default.hr@danangwork.vn',
        password: hashedPassword,
        role: 'hr',
        companyName: 'ĐANANG WORK - Hệ thống',
        isSystem: true,
        isActive: true
      });
      console.log('✅ Đã tạo HR mặc định');
      console.log('📧 Email: default.hr@danangwork.vn');
      console.log('🔑 Mật khẩu: Default@123');
    } else {
      console.log('⚠️ HR mặc định đã tồn tại');
      console.log('📧 Email: default.hr@danangwork.vn');
      console.log('🔑 Mật khẩu: Default@123');
    }
    
    // Gán companyId cho tất cả job chưa có
    const result = await Job.updateMany(
      { $or: [{ companyId: { $exists: false } }, { companyId: null }] },
      { $set: { companyId: defaultHR._id } }
    );
    
    console.log(`✅ Đã gán companyId cho ${result.modifiedCount} jobs`);
    console.log(`🆔 HR ID: ${defaultHR._id}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

assignCompanyId();