// backend/utils/adminSeeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

dotenv.config();

const createAdminAccount = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Thông tin tài khoản Admin
    const adminData = {
      name: 'Quản trị viên hệ thống',
      email: 'admin@danangwork.vn',
      password: 'Admin@123456',
      phone: '0905123456',
      role: 'admin',
      isActive: true,
      isVerified: true
    };
    
    // Kiểm tra xem admin đã tồn tại chưa
    const existingAdmin = await User.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log('⚠️ Tài khoản Admin đã tồn tại!');
      console.log('📧 Email:', adminData.email);
      console.log('🔑 Mật khẩu:', adminData.password);
    } else {
      // Tạo tài khoản admin mới
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminData.password, salt);
      
      const admin = new User({
        ...adminData,
        password: hashedPassword
      });
      
      await admin.save();
      console.log('✅ Tạo tài khoản Admin thành công!');
      console.log('📧 Email:', adminData.email);
      console.log('🔑 Mật khẩu:', adminData.password);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error);
    process.exit(1);
  }
};

createAdminAccount();