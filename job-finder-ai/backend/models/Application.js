// backend/models/Application.js
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  candidateName: {
    type: String,
    required: true
  },
  candidateEmail: {
    type: String,
    required: true
  },
  candidatePhone: {
    type: String,
    default: ''
  },
  resume: {
    type: String,
    default: ''
  },
  coverLetter: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'interview', 'hired', 'rejected'],
    default: 'pending'
  },
  
  // Quiz results
  quizScore: {
    type: Number,
    default: null
  },
  quizAnswers: {
    type: Object,
    default: {}
  },
  
  // AI match score
  matchScore: {
    type: Number,
    default: 0
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
  }
}, {
  timestamps: true
});

// Compound index for unique application
applicationSchema.index({ jobId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);