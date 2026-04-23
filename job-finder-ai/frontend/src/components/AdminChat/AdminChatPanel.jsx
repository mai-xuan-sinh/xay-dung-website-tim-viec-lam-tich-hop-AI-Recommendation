// frontend/src/components/AdminChat/AdminChatPanel.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon, UserIcon, BuildingOfficeIcon,
  CheckCircleIcon, ClockIcon, ChatBubbleLeftRightIcon,
  TrashIcon, XMarkIcon  // ✅ THÊM ICON XÓA
} from '@heroicons/react/24/outline';
import api from '../../services/api';
import io from 'socket.io-client';

const AdminChatPanel = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Kết nối socket
  useEffect(() => {
    socketRef.current = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    socketRef.current.emit('join_admin', 'admin');
    
    socketRef.current.on('new_support_message', (data) => {
      fetchConversations();
      if (selectedUser && selectedUser.user._id === data.senderId) {
        setMessages(prev => [...prev, {
          id: data.id,
          message: data.message,
          senderRole: 'user',
          createdAt: data.createdAt,
          isRead: false
        }]);
      }
    });
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [selectedUser]);

  const fetchConversations = async () => {
    try {
      const response = await api.get('/messages/admin/support');
      if (response.data.success) {
        setConversations(response.data.conversations);
      }
    } catch (error) {
      console.error('Fetch conversations error:', error);
    }
  };

  const handleSelectUser = async (conversation) => {
    setSelectedUser(conversation);
    setMessages(conversation.messages);
    await api.put(`/messages/admin/read/${conversation.user._id}`);
    fetchConversations();
  };

  const sendReply = async () => {
    if (!input.trim() || !selectedUser) return;
    
    const replyMessage = input.trim();
    const lastMessage = selectedUser.messages[0];
    setInput('');
    setLoading(true);
    
    try {
      const response = await api.post(`/messages/reply/${lastMessage._id}`, { message: replyMessage });
      if (response.data.success) {
        setMessages(prev => [...prev, {
          id: response.data.data._id,
          message: replyMessage,
          senderRole: 'admin',
          createdAt: new Date(),
          isRead: false
        }]);
        
        socketRef.current.emit('send_admin_reply', {
          userId: selectedUser.user._id,
          message: replyMessage,
          adminName: 'Admin',
          originalMessageId: lastMessage._id
        });
        
        fetchConversations();
      }
    } catch (error) {
      console.error('Send reply error:', error);
      alert('Gửi phản hồi thất bại!');
    } finally {
      setLoading(false);
    }
  };

  // ✅ HÀM XÓA HỘI THOẠI
  const handleDeleteConversation = async (userId, userName) => {
    if (window.confirm(`Bạn có chắc muốn xóa toàn bộ hội thoại với "${userName}"? Hành động này không thể hoàn tác.`)) {
      try {
        await api.delete(`/messages/admin/conversation/${userId}`);
        alert('Đã xóa hội thoại thành công!');
        
        // Nếu đang xem hội thoại này thì đóng
        if (selectedUser && selectedUser.user._id === userId) {
          setSelectedUser(null);
          setMessages([]);
        }
        
        fetchConversations();
      } catch (error) {
        console.error('Delete conversation error:', error);
        alert('Xóa hội thoại thất bại!');
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendReply();
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now - d;
    const hours = diff / (1000 * 60 * 60);
    
    if (hours < 24) {
      return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${d.getDate()}/${d.getMonth() + 1}`;
    }
  };

  const getRoleIcon = (role) => {
    if (role === 'hr') return <BuildingOfficeIcon className="h-4 w-4" />;
    return <UserIcon className="h-4 w-4" />;
  };

  const getRoleName = (role) => {
    if (role === 'hr') return 'Nhà tuyển dụng';
    return 'Ứng viên';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden h-[600px] flex">
      {/* Left Panel - Danh sách hội thoại */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-transparent">
          <h3 className="font-semibold text-gray-800 flex items-center gap-2">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-500" />
            Hỗ trợ khách hàng
          </h3>
          <p className="text-xs text-gray-500 mt-1">{conversations.length} cuộc hội thoại</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv, idx) => (
            <div
              key={idx}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition ${
                selectedUser?.user._id === conv.user._id ? 'bg-green-50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div 
                  className="flex items-center gap-3 flex-1"
                  onClick={() => handleSelectUser(conv)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                    conv.user.role === 'hr' ? 'bg-purple-500' : 'bg-blue-500'
                  }`}>
                    {conv.user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-800 truncate">{conv.user.name}</p>
                      <span className="text-xs text-gray-400">{formatTime(conv.lastMessage.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {getRoleIcon(conv.user.role)}
                      <span className="text-xs text-gray-500">{getRoleName(conv.user.role)}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate mt-1">{conv.lastMessage.message}</p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                {/* ✅ NÚT XÓA HỘI THOẠI */}
                <button
                  onClick={() => handleDeleteConversation(conv.user._id, conv.user.name)}
                  className="ml-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                  title="Xóa hội thoại"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {conversations.length === 0 && (
            <div className="text-center py-12">
              <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Chưa có tin nhắn hỗ trợ</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Chat với user */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Header với nút xóa */}
            <div className="p-4 border-b border-gray-200 bg-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  selectedUser.user.role === 'hr' ? 'bg-purple-500' : 'bg-blue-500'
                }`}>
                  {selectedUser.user.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedUser.user.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500">{selectedUser.user.email}</span>
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                      {selectedUser.user.phone || 'Chưa có SĐT'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteConversation(selectedUser.user._id, selectedUser.user.name)}
                className="flex items-center gap-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
              >
                <TrashIcon className="h-4 w-4" />
                Xóa hội thoại
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.senderRole === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.senderRole === 'admin' 
                      ? 'bg-green-500 text-white rounded-br-none'
                      : 'bg-white text-gray-700 rounded-bl-none shadow-sm border border-gray-100'
                  }`}>
                    {msg.senderRole !== 'admin' && (
                      <div className="flex items-center gap-1 mb-1">
                        <UserIcon className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-blue-600 font-medium">Khách hàng</span>
                      </div>
                    )}
                    <p className="text-sm">{msg.message}</p>
                    <div className={`flex items-center gap-1 mt-1 text-xs ${
                      msg.senderRole === 'admin' ? 'text-green-100' : 'text-gray-400'
                    }`}>
                      <span>{formatTime(msg.createdAt)}</span>
                      {msg.senderRole === 'admin' && (
                        msg.isRead ? <CheckCircleIcon className="h-3 w-3" /> : <ClockIcon className="h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-end">
                  <div className="bg-green-500 p-3 rounded-2xl rounded-br-none">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Nhập phản hồi..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  disabled={loading}
                />
                <button
                  onClick={sendReply}
                  disabled={loading || !input.trim()}
                  className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chọn một cuộc hội thoại để bắt đầu</p>
              <p className="text-sm text-gray-400 mt-1">Hỗ trợ khách hàng từ chatbox</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChatPanel;