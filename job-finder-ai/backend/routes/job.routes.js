// backend/routes/job.routes.js
const express = require('express');
const router = express.Router();
const { protect, isHR } = require('../middleware/auth');
const Job = require('../models/Job');

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
    const jobData = {
      ...req.body,
      companyId: req.user.id,
      company: req.user.companyName || req.body.company,
      status: 'pending'
    };
    
    const job = await Job.create(jobData);
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
      req.body,
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

module.exports = router;