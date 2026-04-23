// backend/routes/admin.routes.js
const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

// @desc    Get all users
// @route   GET /api/admin/users
router.get('/users', protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách người dùng' });
  }
});

// @desc    Update user status
// @route   PUT /api/admin/users/:id/status
router.put('/users/:id/status', protect, isAdmin, async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật trạng thái' });
  }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
router.delete('/users/:id', protect, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Xóa người dùng thành công' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa người dùng' });
  }
});

// @desc    Get all jobs
// @route   GET /api/admin/jobs
router.get('/jobs', protect, isAdmin, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).populate('companyId', 'name email');
    res.json({ success: true, jobs });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách việc làm' });
  }
});

// @desc    Update job status (approve/reject)
// @route   PUT /api/admin/jobs/:id/status
router.put('/jobs/:id/status', protect, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    res.json({ success: true, job });
  } catch (error) {
    console.error('Update job status error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật trạng thái tin' });
  }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
router.get('/stats', protect, isAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalHR = await User.countDocuments({ role: 'hr' });
    const totalJobs = await Job.countDocuments();
    const activeJobs = await Job.countDocuments({ status: 'active' });
    const pendingJobs = await Job.countDocuments({ status: 'pending' });
    const totalApplications = await Application.countDocuments();
    
    res.json({
      success: true,
      stats: {
        totalUsers,
        totalHR,
        totalJobs,
        activeJobs,
        pendingJobs,
        totalApplications
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy thống kê' });
  }
});

module.exports = router;