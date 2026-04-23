// backend/routes/ai.routes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Job = require('../models/Job');
const User = require('../models/User');

// Helper functions
const normalizeText = (text) => {
  if (!text) return '';
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w\s]/g, ' ').trim();
};

const calculateMatchScore = (userSkills, job) => {
  if (!userSkills?.length || !job) return 0;
  
  let score = 0;
  const normalizedUserSkills = userSkills.map(s => normalizeText(s));
  const normalizedJobSkills = job.skills?.map(s => normalizeText(s)) || [];
  
  const commonSkills = normalizedUserSkills.filter(skill => 
    normalizedJobSkills.some(js => js.includes(skill) || skill.includes(js))
  );
  
  const maxSkills = Math.max(normalizedUserSkills.length, normalizedJobSkills.length);
  const skillsScore = maxSkills > 0 ? (commonSkills.length / maxSkills) * 60 : 0;
  score += skillsScore;
  
  if (job.hot || job.featured) score += 10;
  
  return Math.min(100, Math.round(score));
};

// @desc    Get AI job recommendations
// @route   GET /api/ai/recommendations
router.get('/recommendations', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const limit = parseInt(req.query.limit) || 10;
    
    let jobs = await Job.find({ status: 'active' }).limit(50);
    
    if (user.skills && user.skills.length > 0) {
      const scoredJobs = jobs.map(job => ({
        ...job.toObject(),
        matchScore: calculateMatchScore(user.skills, job)
      }));
      scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
      jobs = scoredJobs.slice(0, limit);
    }
    
    res.json({ success: true, recommendations: jobs });
  } catch (error) {
    console.error('AI recommendations error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy gợi ý việc làm' });
  }
});

// @desc    Get similar jobs
// @route   GET /api/ai/similar/:jobId
router.get('/similar/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;
    const limit = parseInt(req.query.limit) || 5;
    
    const currentJob = await Job.findById(jobId);
    if (!currentJob) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy việc làm' });
    }
    
    const allJobs = await Job.find({ status: 'active', _id: { $ne: jobId } }).limit(30);
    
    const similarJobs = allJobs.map(job => {
      let score = 0;
      if (currentJob.category === job.category) score += 40;
      if (currentJob.subCategory === job.subCategory) score += 30;
      
      const commonSkills = currentJob.skills?.filter(skill => 
        job.skills?.some(s => normalizeText(s) === normalizeText(skill))
      ).length || 0;
      const maxSkills = Math.max(currentJob.skills?.length || 1, job.skills?.length || 1);
      score += (commonSkills / maxSkills) * 30;
      
      return { ...job.toObject(), similarityScore: Math.min(100, Math.round(score)) };
    });
    
    similarJobs.sort((a, b) => b.similarityScore - a.similarityScore);
    res.json({ success: true, similarJobs: similarJobs.slice(0, limit) });
  } catch (error) {
    console.error('Similar jobs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy việc làm tương tự' });
  }
});

// @desc    Smart search
// @route   POST /api/ai/search
router.post('/search', async (req, res) => {
  try {
    const { keyword, filters } = req.body;
    
    let query = { status: 'active' };
    
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { skills: { $in: [new RegExp(keyword, 'i')] } }
      ];
    }
    
    if (filters?.category) query.category = filters.category;
    if (filters?.location) query.location = filters.location;
    
    let jobs = await Job.find(query).sort({ createdAt: -1 }).limit(50);
    
    res.json({ success: true, jobs, total: jobs.length });
  } catch (error) {
    console.error('Smart search error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi tìm kiếm' });
  }
});

// @desc    Get trending skills
// @route   GET /api/ai/trending-skills
router.get('/trending-skills', async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' }).limit(100);
    const skillCount = new Map();
    
    for (const job of jobs) {
      if (job.skills) {
        for (const skill of job.skills) {
          const normalized = normalizeText(skill);
          skillCount.set(normalized, (skillCount.get(normalized) || 0) + 1);
        }
      }
    }
    
    const trendingSkills = Array.from(skillCount.entries())
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
    
    res.json({ success: true, trendingSkills });
  } catch (error) {
    console.error('Trending skills error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy kỹ năng thịnh hành' });
  }
});

module.exports = router;