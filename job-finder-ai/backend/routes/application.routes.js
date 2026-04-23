// backend/routes/application.routes.js
const express = require('express');
const router = express.Router();
const { protect, isHR } = require('../middleware/auth');
const Application = require('../models/Application');
const Job = require('../models/Job');

// @desc    Apply for a job
// @route   POST /api/applications
router.post('/', protect, async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;
    
    const existingApplication = await Application.findOne({
      jobId,
      userId: req.user.id
    });
    
    if (existingApplication) {
      return res.status(400).json({ success: false, message: 'Bạn đã ứng tuyển rồi' });
    }
    
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    const application = await Application.create({
      jobId,
      userId: req.user.id,
      jobTitle: job.title,
      companyName: job.company,
      candidateName: req.user.name,
      candidateEmail: req.user.email,
      candidatePhone: req.user.phone,
      coverLetter: coverLetter || '',
      status: 'pending'
    });
    
    job.applications += 1;
    await job.save();
    
    res.status(201).json({ success: true, application });
  } catch (error) {
    console.error('Apply error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi ứng tuyển' });
  }
});

// @desc    Get my applications
// @route   GET /api/applications/my-applications
router.get('/my-applications', protect, async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .sort({ createdAt: -1 });
    res.json({ success: true, applications });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách' });
  }
});

// @desc    Get HR applications
// @route   GET /api/applications/hr/applications
router.get('/hr/applications', protect, isHR, async (req, res) => {
  try {
    const jobs = await Job.find({ companyId: req.user.id });
    const jobIds = jobs.map(job => job._id);
    
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, applications });
  } catch (error) {
    console.error('Get HR applications error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách ứng viên' });
  }
});

// @desc    Update application status
// @route   PUT /api/applications/:id/status
router.put('/:id/status', protect, isHR, async (req, res) => {
  try {
    const { status, interviewDate, interviewType, interviewLocation } = req.body;
    
    const application = await Application.findById(req.params.id).populate('jobId');
    
    if (!application) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy' });
    }
    
    if (application.jobId.companyId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Không có quyền' });
    }
    
    const updateData = { status };
    if (status === 'interview') {
      updateData.interviewDate = interviewDate;
      updateData.interviewType = interviewType;
      updateData.interviewLocation = interviewLocation;
      updateData.interviewedAt = new Date();
    }
    if (status === 'hired') updateData.hiredAt = new Date();
    
    const updated = await Application.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, application: updated });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật' });
  }
});

module.exports = router;