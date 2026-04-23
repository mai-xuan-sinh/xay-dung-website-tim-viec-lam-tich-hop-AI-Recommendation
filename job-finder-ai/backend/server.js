// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const aiRoutes = require('./routes/ai.routes');
const chatRoutes = require('./routes/chat.routes');
const adminRoutes = require('./routes/admin.routes');
const messageRoutes = require('./routes/message.routes'); // ✅ THÊM ROUTE MESSAGE

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Quá nhiều request, vui lòng thử lại sau 15 phút',
  skip: (req) => req.path === '/api/health' // skip health check
});

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));
app.use('/api/', limiter);

// Make io available to routes
app.set('io', io);

// ========== ROUTES ==========
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/messages', messageRoutes); // ✅ THÊM ROUTE MESSAGE

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    message: 'DANANG WORK API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'DANANG WORK API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      jobs: '/api/jobs',
      applications: '/api/applications',
      ai: '/api/ai',
      chat: '/api/chat',
      admin: '/api/admin',
      messages: '/api/messages',
      health: '/api/health'
    }
  });
});

// ========== SOCKET.IO ==========
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);
  
  // User join room
  socket.on('join', (userId) => {
    if (userId) {
      socket.join(`user_${userId}`);
      console.log(`📢 User ${userId} joined room user_${userId}`);
    }
  });
  
  // HR join room
  socket.on('join_hr', (hrId) => {
    if (hrId) {
      socket.join(`hr_${hrId}`);
      console.log(`📢 HR ${hrId} joined room hr_${hrId}`);
    }
  });
  
  // Admin join room
  socket.on('join_admin', (adminId) => {
    if (adminId) {
      socket.join(`admin_${adminId}`);
      console.log(`📢 Admin ${adminId} joined room admin_${adminId}`);
    }
  });
  
  // ✅ Xử lý tin nhắn realtime
  socket.on('send_support_message', async (data) => {
    const { userId, message, userName, userRole } = data;
    
    // Lưu tin nhắn vào database
    const Message = require('./models/Message');
    const newMessage = await Message.create({
      senderId: userId,
      senderName: userName,
      senderRole: userRole,
      receiverRole: 'admin',
      message: message,
      isRead: false
    });
    
    // Gửi tin nhắn đến admin
    io.emit('new_support_message', {
      id: newMessage._id,
      senderName: userName,
      message: message,
      createdAt: newMessage.createdAt
    });
    
    console.log(`💬 New support message from ${userName}: ${message.substring(0, 50)}`);
  });
  
  // ✅ Admin trả lời tin nhắn realtime
  socket.on('send_admin_reply', async (data) => {
    const { userId, message, adminName, originalMessageId } = data;
    
    // Lưu tin nhắn reply vào database
    const Message = require('./models/Message');
    const replyMessage = await Message.create({
      senderId: 'admin',
      senderName: adminName,
      senderRole: 'admin',
      receiverId: userId,
      receiverRole: 'user',
      message: message,
      replyTo: originalMessageId,
      isRead: false
    });
    
    // Đánh dấu tin nhắn gốc đã được trả lời
    await Message.findByIdAndUpdate(originalMessageId, { isReplied: true });
    
    // Gửi phản hồi đến user
    io.to(`user_${userId}`).emit('admin_reply', {
      id: replyMessage._id,
      message: message,
      originalMessageId: originalMessageId,
      createdAt: replyMessage.createdAt
    });
    
    console.log(`💬 Admin replied to user ${userId}: ${message.substring(0, 50)}`);
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// ========== ERROR HANDLERS ==========

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot find ${req.originalUrl} on this server`
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.stack);
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', ')
    });
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      success: false,
      message: `${field} đã tồn tại trong hệ thống`
    });
  }
  
  // JWT error
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }
  
  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ========== CONNECT TO MONGODB ==========
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/danang_work';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`📁 Database: ${mongoose.connection.name}`);
  
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
    console.log(`📍 API URL: http://localhost:${PORT}/api/health`);
  });
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n📴 Shutting down gracefully...');
  await mongoose.connection.close();
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});