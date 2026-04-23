// backend/routes/user.routes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// @desc    Update user skills
// @route   PUT /api/users/skills
router.put('/skills', protect, async (req, res) => {
  try {
    const { skills } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Update skills error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật kỹ năng' });
  }
});

// @desc    Save/unsave a job
// @route   POST /api/users/save-job/:jobId
router.post('/save-job/:jobId', protect, async (req, res) => {
  try {
    const { jobId } = req.params;
    const user = await User.findById(req.user.id);
    
    if (user.savedJobs.includes(jobId)) {
      user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
      await user.save();
      return res.json({ success: true, saved: false, message: 'Đã bỏ lưu' });
    }
    
    user.savedJobs.push(jobId);
    await user.save();
    res.json({ success: true, saved: true, message: 'Đã lưu việc làm' });
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lưu việc làm' });
  }
});

// @desc    Get saved jobs
// @route   GET /api/users/saved-jobs
router.get('/saved-jobs', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');
    res.json({ success: true, savedJobs: user.savedJobs });
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy danh sách đã lưu' });
  }
});

// @desc    Update HR company profile
// @route   PUT /api/users/company-profile
router.put('/company-profile', protect, async (req, res) => {
  try {
    const { companyName, companyAddress, companyPhone, companyDescription } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { companyName, companyAddress, companyPhone, companyDescription },
      { new: true }
    ).select('-password');
    
    res.json({ success: true, user });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi cập nhật thông tin công ty' });
  }
});

module.exports = router;