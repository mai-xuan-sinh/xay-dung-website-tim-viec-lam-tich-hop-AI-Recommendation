// backend/routes/job.routes.js
const express = require('express');
const router = express.Router();
const { protect, isHR, isAdmin } = require('../middleware/auth');
const Job = require('../models/Job');
const User = require('../models/User');

// Helper function to get System HR ID
const getSystemHRId = async () => {
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
  return systemHR._id;
};

// @desc    Get all jobs
// @route   GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const { category, location, search, page = 1, limit = 10 } = req.query;
    
    let query = { status: 'active' };
    
    if (category && category !== 'all') query.category = category;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const jobs = await Job.find(query)
      .sort({ hot: -1, featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Job.countDocuments(query);
    
    res.json({
      success: true,
      jobs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách việc làm' });
  }
});

// @desc    Get featured jobs (for homepage)
// @route   GET /api/jobs/featured
router.get('/featured', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    
    const jobs = await Job.find({ 
      status: 'active',
      featured: true 
    })
    .sort({ createdAt: -1 })
    .limit(limit);
    
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('Get featured jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy việc làm nổi bật' });
  }
});

// @desc    Get hot jobs (for homepage)
// @route   GET /api/jobs/hot
router.get('/hot', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;
    
    const jobs = await Job.find({ 
      status: 'active',
      hot: true 
    })
    .sort({ views: -1, createdAt: -1 })
    .limit(limit);
    
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('Get hot jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy việc làm hot' });
  }
});

// @desc    Get jobs by category
// @route   GET /api/jobs/category/:category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const jobs = await Job.find({ 
      status: 'active',
      category: category 
    })
    .sort({ createdAt: -1 })
    .limit(limit);
    
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('Get jobs by category error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy việc làm theo ngành' });
  }
});

// @desc    Get related jobs (by skills and category)
// @route   GET /api/jobs/:id/related
router.get('/:id/related', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    const relatedJobs = await Job.find({
      _id: { $ne: job._id },
      status: 'active',
      $or: [
        { category: job.category },
        { skills: { $in: job.skills } }
      ]
    })
    .sort({ hot: -1, featured: -1 })
    .limit(5);
    
    res.json({ success: true, jobs: relatedJobs });
  } catch (error) {
    console.error('Get related jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy việc làm liên quan' });
  }
});

// @desc    Search jobs with advanced filters
// @route   POST /api/jobs/search
router.post('/search', async (req, res) => {
  try {
    const { keyword, category, location, type, experience } = req.body;
    
    let query = { status: 'active' };
    
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { skills: { $in: [new RegExp(keyword, 'i')] } }
      ];
    }
    
    if (category && category !== 'all') query.category = category;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = type;
    if (experience) query.experience = { $regex: experience, $options: 'i' };
    
    const jobs = await Job.find(query)
      .sort({ hot: -1, featured: -1, createdAt: -1 });
    
    res.json({ success: true, jobs, total: jobs.length });
  } catch (error) {
    console.error('Search jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tìm kiếm việc làm' });
  }
});

// @desc    Get job by ID
// @route   GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    job.views += 1;
    await job.save();
    
    res.json({ success: true, job });
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy thông tin việc làm' });
  }
});

// @desc    Create job (HR only)
// @route   POST /api/jobs
router.post('/', protect, isHR, async (req, res) => {
  try {
    let companyId = req.user.id;
    
    // Danh sách công ty hệ thống
    const systemCompanies = [
      'FPT Software', 'Axon Active', 'TMA Solutions', 'GAMELOFT', 'Viettel',
      'VinAI', 'OX Consulting', 'DesignBold', 'Furama Resort', 'Novotel Đà Nẵng',
      'Thế Giới Di Động', 'CellphoneS', 'Coteccons', 'ĐANANG WORK - Hệ thống'
    ];
    
    // Nếu công ty thuộc danh sách hệ thống, gán cho System HR
    if (systemCompanies.includes(req.body.company)) {
      const systemHRId = await getSystemHRId();
      companyId = systemHRId;
    }
    
    const jobData = {
      ...req.body,
      companyId: companyId,
      company: req.body.company,
      status: req.user.role === 'admin' ? 'active' : 'pending',
      postedDate: new Date().toISOString().split('T')[0]
    };
    
    const job = await Job.create(jobData);
    console.log(`✅ Job created: ${job.title} by ${req.user.email}`);
    
    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tạo tin tuyển dụng' });
  }
});

// @desc    Update job
// @route   PUT /api/jobs/:id
router.put('/:id', protect, isHR, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    if (job.companyId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền chỉnh sửa' });
    }
    
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    
    res.json({ success: true, job: updatedJob });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật tin' });
  }
});

// @desc    Delete job
// @route   DELETE /api/jobs/:id
router.delete('/:id', protect, isHR, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    if (job.companyId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền xóa' });
    }
    
    await job.deleteOne();
    res.json({ success: true, message: 'Xóa tin thành công' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa tin' });
  }
});

// @desc    Get HR jobs (for HR dashboard)
// @route   GET /api/jobs/hr/jobs
router.get('/hr/jobs', protect, isHR, async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.user.id })
      .sort({ createdAt: -1 });
    
    let allJobs = [...jobs];
    
    // Super HR thấy cả job hệ thống
    const superEmails = ['hr@danangwork.vn', 'system@danangwork.vn', 'admin@danangwork.vn'];
    if (superEmails.includes(req.user.email)) {
      const systemHRId = await getSystemHRId();
      const systemJobs = await Job.find({ companyId: systemHRId })
        .sort({ createdAt: -1 });
      allJobs = [...allJobs, ...systemJobs];
    }
    
    res.json({ success: true, jobs: allJobs });
  } catch (error) {
    console.error('Get HR jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách tin tuyển dụng' });
  }
});

// @desc    Get HR job stats
// @route   GET /api/jobs/hr/stats
router.get('/hr/stats', protect, isHR, async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.user.id });
    
    const stats = {
      total: jobs.length,
      active: jobs.filter(j => j.status === 'active').length,
      pending: jobs.filter(j => j.status === 'pending').length,
      expired: jobs.filter(j => j.status === 'expired').length,
      totalViews: jobs.reduce((sum, j) => sum + (j.views || 0), 0),
      totalApplications: jobs.reduce((sum, j) => sum + (j.applications || 0), 0)
    };
    
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Get HR job stats error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy thống kê' });
  }
});

// @desc    Update job status (approve/reject) - Admin only
// @route   PUT /api/jobs/:id/status
router.put('/:id/status', protect, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!job) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    res.json({ success: true, job });
  } catch (error) {
    console.error('Update job status error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật trạng thái' });
  }
});

module.exports = router;