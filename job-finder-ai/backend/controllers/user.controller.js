// backend/controllers/user.controller.js
const User = require('../models/User');
const Job = require('../models/Job');

// @desc    Update user skills
// @route   PUT /api/users/skills
const updateSkills = async (req, res) => {
  try {
    const { skills } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { skills },
      { new: true }
    ).select('-password');
    
    res.json({ 
      success: true, 
      user 
    });
  } catch (error) {
    console.error('Update skills error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi cập nhật kỹ năng' 
    });
  }
};

// @desc    Save a job
// @route   POST /api/users/save-job/:jobId
const saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const user = await User.findById(req.user.id);
    const job = await Job.findById(jobId);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    if (!job) {
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    
    const isSaved = user.savedJobs.includes(jobId);
    
    if (isSaved) {
      user.savedJobs = user.savedJobs.filter(id => id.toString() !== jobId);
      await user.save();
      return res.json({ 
        success: true, 
        saved: false, 
        message: 'Đã bỏ lưu việc làm' 
      });
    } else {
      user.savedJobs.push(jobId);
      await user.save();
      return res.json({ 
        success: true, 
        saved: true, 
        message: 'Đã lưu việc làm' 
      });
    }
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi lưu việc làm' 
    });
  }
};

// @desc    Get saved jobs
// @route   GET /api/users/saved-jobs
const getSavedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('savedJobs');
    
    res.json({ 
      success: true, 
      savedJobs: user.savedJobs 
    });
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi lấy danh sách đã lưu' 
    });
  }
};

// @desc    Update HR company profile
// @route   PUT /api/users/company-profile
const updateCompanyProfile = async (req, res) => {
  try {
    const { companyName, companyAddress, companyPhone, companyDescription } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { companyName, companyAddress, companyPhone, companyDescription },
      { new: true }
    ).select('-password');
    
    res.json({ 
      success: true, 
      user 
    });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Lỗi khi cập nhật thông tin công ty' 
    });
  }
};

module.exports = {
  updateSkills,
  saveJob,
  getSavedJobs,
  updateCompanyProfile
};