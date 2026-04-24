// backend/controllers/application.controller.js
const mongoose = require('mongoose');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

// Helper function to get status text
const getStatusText = (status) => {
  const statusMap = {
    pending: 'Chờ xử lý',
    reviewed: 'Đã xem',
    interview: 'Chờ phỏng vấn',
    hired: 'Đã trúng tuyển',
    rejected: 'Từ chối'
  };
  return statusMap[status] || status;
};

// Helper function to get or create System HR
const getSystemHR = async () => {
  let systemHR = await User.findOne({ email: 'system@danangwork.vn' });
  if (!systemHR) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('System@123456', salt);
    
    systemHR = await User.create({
      name: 'Hệ thống ĐANANG WORK',
      email: 'system@danangwork.vn',
      password: hashedPassword,
      phone: '0236xxxxxxx',
      role: 'hr',
      companyName: 'ĐANANG WORK - Hệ thống',
      isActive: true,
      isVerified: true
    });
    console.log('✅ Đã tạo System HR');
  }
  return systemHR;
};

// Helper function to get System HR ID
const getSystemHRId = async () => {
  const systemHR = await getSystemHR();
  return systemHR._id;
};

// @desc    Apply for a job
// @route   POST /api/applications
const applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    
    console.log('========================================');
    console.log(`📝 Ứng tuyển nhận được:`);
    console.log(`   - Job ID: ${jobId}`);
    console.log(`   - User ID: ${req.user?.id}`);
    console.log(`   - User Name: ${req.user?.name}`);
    console.log(`   - Cover Letter: ${coverLetter?.substring(0, 50) || 'Không có'}`);
    
    // Validate jobId
    if (!jobId) {
      console.log('❌ Thiếu jobId');
      return res.status(400).json({ success: false, message: 'Thiếu jobId' });
    }
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      console.log('❌ jobId không hợp lệ:', jobId);
      return res.status(400).json({ success: false, message: 'jobId không hợp lệ' });
    }
    
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      console.log('❌ Không tìm thấy job với ID:', jobId);
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    console.log(`✅ Tìm thấy job: ${job.title} - ${job.company}`);
    
    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId,
      userId: req.user.id
    });
    
    if (existingApplication) {
      console.log('⚠️ User đã ứng tuyển job này rồi');
      return res.status(400).json({ 
        success: false, 
        message: 'Bạn đã ứng tuyển vào vị trí này rồi' 
      });
    }
    
    // Ensure job has companyId
    let companyId = job.companyId;
    if (!companyId) {
      const systemHR = await getSystemHR();
      companyId = systemHR._id;
      await Job.findByIdAndUpdate(jobId, { companyId });
      console.log(`🔧 Đã cập nhật companyId cho job: ${job.title} -> ${companyId}`);
    }
    
    // Create application
    const applicationData = {
      jobId: job._id,
      userId: req.user.id,
      jobTitle: job.title,
      companyName: job.company,
      candidateName: req.user.name,
      candidateEmail: req.user.email,
      candidatePhone: req.user.phone || '',
      coverLetter: coverLetter || '',
      status: 'pending',
      matchScore: Math.floor(Math.random() * 30) + 70
    };
    
    console.log('📝 Đang tạo application với dữ liệu:', {
      jobTitle: applicationData.jobTitle,
      candidateName: applicationData.candidateName,
      candidateEmail: applicationData.candidateEmail
    });
    
    const application = await Application.create(applicationData);
    
    console.log(`✅ Đã tạo application thành công! ID: ${application._id}`);
    
    // Increment application count
    await Job.findByIdAndUpdate(jobId, { $inc: { applications: 1 } });
    
    // Emit socket event to HR
    const io = req.app.get('io');
    if (io) {
      io.to(`hr_${companyId.toString()}`).emit('new_application', {
        applicationId: application._id,
        jobTitle: job.title,
        candidateName: req.user.name,
        message: `📢 Ứng viên "${req.user.name}" vừa ứng tuyển vào vị trí "${job.title}"`
      });
      console.log(`📢 Emitted new_application to hr_${companyId}`);
    }
    
    console.log(`✅ Ứng tuyển thành công: ${req.user.name} -> ${job.title}`);
    console.log('========================================');
    
    res.status(201).json({ 
      success: true, 
      application,
      message: 'Ứng tuyển thành công!'
    });
  } catch (error) {
    console.error('❌ LỖI CHI TIẾT:', error);
    console.error('❌ Stack trace:', error.stack);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi ứng tuyển: ' + error.message
    });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/my-applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .populate('jobId', 'title company location salary');
    
    res.json({ 
      success: true, 
      applications 
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi lấy danh sách ứng tuyển' 
    });
  }
};

// @desc    Get applications for HR (by job)
// @route   GET /api/applications/hr/applications
const getHRApplications = async (req, res) => {
  try {
    console.log(`🔍 HR ${req.user.email} đang xem danh sách ứng viên`);
    
    let applications = [];
    
    // Danh sách email được phép xem tất cả ứng viên
    const superHRs = ['hr@danangwork.vn', 'system@danangwork.vn', 'admin@danangwork.vn'];
    
    if (superHRs.includes(req.user.email) || req.user.role === 'admin') {
      // Super HR: thấy TẤT CẢ ứng viên từ mọi job
      applications = await Application.find()
        .sort({ createdAt: -1 })
        .populate('userId', 'name email phone skills')
        .populate('jobId', 'title company location');
      
      console.log(`✅ Super HR ${req.user.email} thấy ${applications.length} ứng viên (toàn hệ thống)`);
    } else {
      // HR thường: chỉ thấy ứng viên của công ty mình
      const jobs = await Job.find({ companyId: req.user.id });
      const jobIds = jobs.map(job => job._id);
      
      console.log(`📋 HR thường có ${jobs.length} job, jobIds: ${jobIds}`);
      
      let allJobIds = [...jobIds];
      if (jobIds.length === 0) {
        const systemHR = await getSystemHR();
        const systemJobs = await Job.find({ companyId: systemHR._id });
        const systemJobIds = systemJobs.map(job => job._id);
        allJobIds = [...allJobIds, ...systemJobIds];
        console.log(`📋 Thêm ${systemJobIds.length} job từ System HR`);
      }
      
      applications = await Application.find({ jobId: { $in: allJobIds } })
        .sort({ createdAt: -1 })
        .populate('userId', 'name email phone skills');
      
      console.log(`✅ HR ${req.user.email} thấy ${applications.length} ứng viên`);
    }
    
    res.json({ success: true, applications });
  } catch (error) {
    console.error('Get HR applications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi lấy danh sách ứng viên: ' + error.message
    });
  }
};

// @desc    Update application status (HR)
// @route   PUT /api/applications/:id/status
const updateApplicationStatus = async (req, res) => {
  try {
    const { status, interviewDate, interviewType, interviewLocation, hrNotes } = req.body;
    
    const application = await Application.findById(req.params.id).populate('jobId');
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy đơn ứng tuyển' 
      });
    }
    
    // Check permission
    const isOwner = application.jobId && application.jobId.companyId?.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    const isSuperHR = ['hr@danangwork.vn', 'system@danangwork.vn'].includes(req.user.email);
    
    if (!isOwner && !isAdmin && !isSuperHR) {
      return res.status(403).json({ 
        success: false, 
        message: 'Không có quyền thực hiện hành động này' 
      });
    }
    
    const updateData = { status };
    if (status === 'reviewed') updateData.reviewedAt = new Date();
    if (status === 'interview') {
      updateData.interviewDate = interviewDate;
      updateData.interviewType = interviewType;
      updateData.interviewLocation = interviewLocation;
      updateData.interviewedAt = new Date();
    }
    if (status === 'hired') updateData.hiredAt = new Date();
    if (hrNotes) updateData.hrNotes = hrNotes;
    
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    
    // Emit socket event to candidate
    const io = req.app.get('io');
    if (io) {
      io.to(`user_${application.userId}`).emit('application_status_updated', {
        applicationId: application._id,
        status,
        jobTitle: application.jobTitle,
        message: `📢 Hồ sơ ứng tuyển của bạn đã được cập nhật trạng thái: ${getStatusText(status)}`
      });
    }
    
    res.json({ 
      success: true, 
      application: updatedApplication,
      message: 'Cập nhật trạng thái thành công!'
    });
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi cập nhật trạng thái' 
    });
  }
};

// @desc    Get application by ID (HR or Admin)
// @route   GET /api/applications/:id
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('userId', 'name email phone skills experience education')
      .populate('jobId', 'title company location salary requirements');
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy đơn ứng tuyển' 
      });
    }
    
    // Check permission
    const isOwner = application.jobId && application.jobId.companyId?.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';
    const isSuperHR = ['hr@danangwork.vn', 'system@danangwork.vn'].includes(req.user.email);
    const isCandidate = application.userId.toString() === req.user.id;
    
    if (!isOwner && !isAdmin && !isSuperHR && !isCandidate) {
      return res.status(403).json({ 
        success: false, 
        message: 'Không có quyền xem thông tin này' 
      });
    }
    
    res.json({ 
      success: true, 
      application 
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi lấy thông tin ứng tuyển' 
    });
  }
};

// @desc    Delete application (Admin only)
// @route   DELETE /api/applications/:id
const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ 
        success: false, 
        message: 'Không tìm thấy đơn ứng tuyển' 
      });
    }
    
    // Decrement application count in job
    await Job.findByIdAndUpdate(application.jobId, { $inc: { applications: -1 } });
    
    await Application.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Xóa đơn ứng tuyển thành công' 
    });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi xóa đơn ứng tuyển' 
    });
  }
};

// @desc    Get all applications (Admin only)
// @route   GET /api/applications/admin/all
const getAllApplications = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Chỉ admin mới có quyền truy cập' 
      });
    }
    
    const applications = await Application.find()
      .sort({ createdAt: -1 })
      .populate('userId', 'name email phone')
      .populate('jobId', 'title company');
    
    res.json({ 
      success: true, 
      applications 
    });
  } catch (error) {
    console.error('Get all applications error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi lấy danh sách' 
    });
  }
};

// @desc    Get application statistics (Admin only)
// @route   GET /api/applications/admin/stats
const getApplicationStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Chỉ admin mới có quyền truy cập' 
      });
    }
    
    const total = await Application.countDocuments();
    const pending = await Application.countDocuments({ status: 'pending' });
    const reviewed = await Application.countDocuments({ status: 'reviewed' });
    const interview = await Application.countDocuments({ status: 'interview' });
    const hired = await Application.countDocuments({ status: 'hired' });
    const rejected = await Application.countDocuments({ status: 'rejected' });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Application.countDocuments({ 
      createdAt: { $gte: today } 
    });
    
    res.json({ 
      success: true, 
      stats: { total, pending, reviewed, interview, hired, rejected, todayCount }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi lấy thống kê' 
    });
  }
};

module.exports = {
  applyJob,
  getMyApplications,
  getHRApplications,
  updateApplicationStatus,
  getApplicationById,
  deleteApplication,
  getAllApplications,
  getApplicationStats
};