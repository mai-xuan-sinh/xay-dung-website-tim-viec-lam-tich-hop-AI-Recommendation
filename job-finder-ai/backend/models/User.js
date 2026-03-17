const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['jobseeker', 'employer'],
    default: 'jobseeker'
  },
  profile: {
    title: String,
    skills: [String],
    experience: [{
      company: String,
      position: String,
      startDate: Date,
      endDate: Date,
      description: String
    }],
    education: [{
      school: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date
    }],
    resume: String,
    avatar: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);