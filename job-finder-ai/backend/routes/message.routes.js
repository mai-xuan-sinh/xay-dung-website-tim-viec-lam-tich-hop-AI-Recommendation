// backend/routes/message.routes.js
const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middleware/auth');
const Message = require('../models/Message');
const User = require('../models/User');

// ========== USER GỬI TIN NHẮN HỖ TRỢ ==========

// @desc    Gửi tin nhắn hỗ trợ (User gửi đến Admin)
// @route   POST /api/messages/support
router.post('/support', protect, async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tin nhắn' });
    }
    
    const newMessage = await Message.create({
      senderId: req.user.id,
      senderName: req.user.name,
      senderRole: req.user.role,
      receiverRole: 'admin',
      message: message,
      isRead: false
    });
    
    // Emit socket event cho admin
    const io = req.app.get('io');
    io.emit('new_support_message', {
      id: newMessage._id,
      senderName: req.user.name,
      message: message,
      createdAt: newMessage.createdAt
    });
    
    res.status(201).json({
      success: true,
      message: 'Tin nhắn đã được gửi đến bộ phận hỗ trợ',
      data: newMessage
    });
  } catch (error) {
    console.error('Send support message error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi gửi tin nhắn' });
  }
});

// @desc    User lấy lịch sử chat với admin
// @route   GET /api/messages/my-chats
router.get('/my-chats', protect, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverRole: 'admin' },
        { receiverId: req.user.id, senderRole: 'admin' }
      ]
    }).sort({ createdAt: 1 });
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Get my chats error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy lịch sử chat' });
  }
});

// @desc    User đánh dấu đã đọc tin nhắn admin
// @route   PUT /api/messages/read/:messageId
router.put('/read/:messageId', protect, async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.messageId, { isRead: true });
    res.json({ success: true, message: 'Đã đánh dấu đã đọc' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi đánh dấu đã đọc' });
  }
});

// ========== ADMIN QUẢN LÝ TIN NHẮN ==========

// @desc    Admin lấy danh sách tin nhắn hỗ trợ
// @route   GET /api/messages/admin/support
router.get('/admin/support', protect, isAdmin, async (req, res) => {
  try {
    const messages = await Message.find({ receiverRole: 'admin' })
      .sort({ createdAt: -1 })
      .populate('senderId', 'name email phone role');
    
    // Nhóm tin nhắn theo người gửi
    const groupedMessages = {};
    messages.forEach(msg => {
      const senderId = msg.senderId._id.toString();
      if (!groupedMessages[senderId]) {
        groupedMessages[senderId] = {
          user: msg.senderId,
          messages: [],
          unreadCount: 0,
          lastMessage: msg
        };
      }
      groupedMessages[senderId].messages.push(msg);
      if (!msg.isRead) groupedMessages[senderId].unreadCount++;
    });
    
    res.json({
      success: true,
      conversations: Object.values(groupedMessages)
    });
  } catch (error) {
    console.error('Get support messages error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy tin nhắn' });
  }
});

// @desc    Admin lấy chi tiết tin nhắn của một user
// @route   GET /api/messages/admin/support/:userId
router.get('/admin/support/:userId', protect, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverRole: 'admin' },
        { receiverId: userId, senderRole: 'admin' }
      ]
    }).sort({ createdAt: 1 });
    
    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('Get user messages error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi lấy tin nhắn' });
  }
});

// @desc    Admin đánh dấu đã đọc tin nhắn của user
// @route   PUT /api/messages/admin/read/:userId
router.put('/admin/read/:userId', protect, isAdmin, async (req, res) => {
  try {
    await Message.updateMany(
      { senderId: req.params.userId, receiverRole: 'admin', isRead: false },
      { isRead: true }
    );
    
    res.json({ success: true, message: 'Đã đánh dấu đã đọc' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi đánh dấu đã đọc' });
  }
});

// @desc    Admin trả lời tin nhắn
// @route   POST /api/messages/reply/:messageId
router.post('/reply/:messageId', protect, isAdmin, async (req, res) => {
  try {
    const { message } = req.body;
    const { messageId } = req.params;
    
    if (!message) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập nội dung phản hồi' });
    }
    
    const originalMessage = await Message.findById(messageId);
    if (!originalMessage) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin nhắn' });
    }
    
    const replyMessage = await Message.create({
      senderId: req.user.id,
      senderName: req.user.name,
      senderRole: 'admin',
      receiverId: originalMessage.senderId,
      receiverRole: originalMessage.senderRole,
      message: message,
      replyTo: messageId,
      isRead: false
    });
    
    // Đánh dấu tin nhắn gốc đã được trả lời
    await Message.findByIdAndUpdate(messageId, { isReplied: true });
    
    // Emit socket event cho user
    const io = req.app.get('io');
    io.to(`user_${originalMessage.senderId}`).emit('admin_reply', {
      id: replyMessage._id,
      message: message,
      originalMessage: originalMessage.message,
      createdAt: replyMessage.createdAt
    });
    
    res.status(201).json({
      success: true,
      message: 'Đã gửi phản hồi',
      data: replyMessage
    });
  } catch (error) {
    console.error('Reply message error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi gửi phản hồi' });
  }
});

// @desc    Admin xóa toàn bộ hội thoại với user
// @route   DELETE /api/messages/admin/conversation/:userId
router.delete('/admin/conversation/:userId', protect, isAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Kiểm tra user tồn tại
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    
    // Xóa tất cả tin nhắn giữa admin và user này
    const result = await Message.deleteMany({
      $or: [
        { senderId: userId, receiverRole: 'admin' },
        { receiverId: userId, senderRole: 'admin' }
      ]
    });
    
    res.json({ 
      success: true, 
      message: `Đã xóa ${result.deletedCount} tin nhắn trong hội thoại với ${user.name}`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Delete conversation error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa hội thoại' });
  }
});

// @desc    Admin xóa một tin nhắn cụ thể
// @route   DELETE /api/messages/admin/message/:messageId
router.delete('/admin/message/:messageId', protect, isAdmin, async (req, res) => {
  try {
    const { messageId } = req.params;
    
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy tin nhắn' });
    }
    
    await Message.findByIdAndDelete(messageId);
    
    res.json({ 
      success: true, 
      message: 'Đã xóa tin nhắn thành công'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa tin nhắn' });
  }
});

// @desc    Admin xóa tất cả tin nhắn (xóa toàn bộ hệ thống)
// @route   DELETE /api/messages/admin/all
router.delete('/admin/all', protect, isAdmin, async (req, res) => {
  try {
    const result = await Message.deleteMany({});
    res.json({ 
      success: true, 
      message: `Đã xóa toàn bộ ${result.deletedCount} tin nhắn trong hệ thống`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Delete all messages error:', error);
    res.status(500).json({ success: false, message: 'Lỗi khi xóa tin nhắn' });
  }
});

module.exports = router;