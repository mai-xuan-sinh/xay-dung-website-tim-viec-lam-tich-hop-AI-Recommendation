// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Vui lòng nhập jobId']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Vui lòng nhập userId']
  },
  jobTitle: {
    type: String,
    required: [true, 'Vui lòng nhập jobTitle'],
    trim: true
  },
  companyName: {
    type: String,
    required: [true, 'Vui lòng nhập companyName'],
    trim: true
  },
  candidateName: {
    type: String,
    required: [true, 'Vui lòng nhập candidateName'],
    trim: true
  },
  candidateEmail: {
    type: String,
    required: [true, 'Vui lòng nhập candidateEmail'],
    lowercase: true,
    trim: true
  },
  candidatePhone: {
    type: String,
    default: '',
    trim: true
  },
  resume: {
    type: String,
    default: ''
  },
  coverLetter: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interview', 'hired', 'rejected'],
    default: 'pending'
  },
  
  // Quiz results
  quizScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  quizAnswers: {
    type: Object,
    default: {}
  },
  quizCompletedAt: {
    type: Date,
    default: null
  },
  
  // AI match score
  matchScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  
  // Interview
  interviewDate: {
    type: Date,
    default: null
  },
  interviewType: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline'
  },
  interviewLocation: {
    type: String,
    default: ''
  },
  interviewLink: {
    type: String,
    default: ''
  },
  interviewNotes: {
    type: String,
    default: ''
  },
  
  // HR notes
  hrNotes: {
    type: String,
    default: ''
  },
  
  // Timestamps
  appliedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date,
    default: null
  },
  interviewedAt: {
    type: Date,
    default: null
  },
  hiredAt: {
    type: Date,
    default: null
  },
  rejectedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Compound index for unique application (một user chỉ ứng tuyển 1 job 1 lần)
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

// Index for faster queries
applicationSchema.index({ userId: 1, createdAt: -1 });
applicationSchema.index({ jobId: 1, createdAt: -1 });
applicationSchema.index({ status: 1, createdAt: -1 });
applicationSchema.index({ candidateEmail: 1 });

// Virtual field to get candidate's full info
applicationSchema.virtual('candidateInfo').get(function() {
  return {
    name: this.candidateName,
    email: this.candidateEmail,
    phone: this.candidatePhone
  };
});

// Method to update status with timestamp
applicationSchema.methods.updateStatus = function(status) {
  this.status = status;
  
  switch(status) {
    case 'reviewed':
      this.reviewedAt = new Date();
      break;
    case 'interview':
      this.interviewedAt = new Date();
      break;
    case 'hired':
      this.hiredAt = new Date();
      break;
    case 'rejected':
      this.rejectedAt = new Date();
      break;
  }
  
  return this.save();
};

// Static method to get statistics for a job
applicationSchema.statics.getStatsForJob = async function(jobId) {
  const stats = await this.aggregate([
    { $match: { jobId: mongoose.Types.ObjectId(jobId) } },
    { $group: {
      _id: '$status',
      count: { $sum: 1 }
    }}
  ]);
  
  const result = {
    total: 0,
    pending: 0,
    reviewed: 0,
    interview: 0,
    hired: 0,
    rejected: 0
  };
  
  stats.forEach(stat => {
    result[stat._id] = stat.count;
    result.total += stat.count;
  });
  
  return result;
};

// Static method to get statistics for a candidate
applicationSchema.statics.getStatsForCandidate = async function(userId) {
  const stats = await this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    { $group: {
      _id: '$status',
      count: { $sum: 1 }
    }}
  ]);
  
  const result = {
    total: 0,
    pending: 0,
    reviewed: 0,
    interview: 0,
    hired: 0,
    rejected: 0
  };
  
  stats.forEach(stat => {
    result[stat._id] = stat.count;
    result.total += stat.count;
  });
  
  return result;
};

module.exports = mongoose.model('Application', applicationSchema);