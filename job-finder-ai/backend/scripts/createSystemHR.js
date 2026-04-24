// backend/scripts/createSystemHR.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const createSystemHR = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Kiểm tra System HR đã tồn tại chưa
    let systemHR = await User.findOne({ email: 'system@danangwork.vn' });
    
    if (!systemHR) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('System@123456', salt);
      
      systemHR = new User({
        name: 'Hệ thống ĐANANG WORK',
        email: 'system@danangwork.vn',
        password: hashedPassword,
        phone: '0236xxxxxxx',
        role: 'hr',
        companyName: 'ĐANANG WORK - Hệ thống',
        isActive: true,
        isVerified: true,
        isSystem: true  // Đánh dấu là tài khoản hệ thống
      });
      
      await systemHR.save();
      console.log('✅ Đã tạo System HR thành công!');
    } else {
      console.log('⚠️ System HR đã tồn tại');
    }
    
    console.log('📧 Email system: system@danangwork.vn (dùng cho admin quản lý)');
    console.log('🆔 System HR ID:', systemHR._id);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

createSystemHR();