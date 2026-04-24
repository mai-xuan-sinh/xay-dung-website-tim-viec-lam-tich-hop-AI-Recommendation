// backend/scripts/fixAll.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

dotenv.config();

const fixAll = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // 1. Tìm hoặc tạo HR hệ thống
    let systemHR = await User.findOne({ email: 'hr@danangwork.vn' });
    
    if (!systemHR) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('123456', salt);
      
      systemHR = await User.create({
        name: 'HR Hệ thống',
        email: 'hr@danangwork.vn',
        password: hashedPassword,
        phone: '0905123456',
        role: 'hr',
        companyName: 'ĐANANG WORK - Hệ thống',
        isActive: true
      });
      console.log('✅ Đã tạo HR hệ thống');
    }
    
    console.log(`📢 HR ID: ${systemHR._id}`);
    
    // 2. Cập nhật tất cả job với companyId
    const jobResult = await Job.updateMany(
      {},
      { $set: { companyId: systemHR._id } }
    );
    console.log(`✅ Đã cập nhật ${jobResult.modifiedCount} jobs`);
    
    // 3. Kiểm tra applications
    const applications = await Application.find();
    console.log(`📊 Hiện có ${applications.length} applications`);
    
    if (applications.length === 0) {
      console.log('⚠️ Chưa có application nào. Hãy đăng nhập User và ứng tuyển!');
    } else {
      applications.forEach(app => {
        console.log(`  - ${app.candidateName} -> ${app.jobTitle}`);
      });
    }
    
    console.log('\n🎯 Đăng nhập HR với:');
    console.log('   Email: hr@danangwork.vn');
    console.log('   Mật khẩu: 123456');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

fixAll();