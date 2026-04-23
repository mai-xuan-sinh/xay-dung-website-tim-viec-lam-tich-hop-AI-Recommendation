// frontend/src/components/Chatbox/SupportChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon, 
  UserIcon, CheckCircleIcon, ClockIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import io from 'socket.io-client';

const SupportChat = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Kết nối socket
  useEffect(() => {
    if (user && socketRef.current === null) {
      socketRef.current = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
      socketRef.current.emit('join', user.id);
      
      socketRef.current.on('admin_reply', (data) => {
        setMessages(prev => [...prev, {
          id: data.id,
          message: data.message,
          senderRole: 'admin',
          createdAt: new Date(),
          isRead: false
        }]);
        setUnreadCount(prev => prev + 1);
      });
    }
    
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  // Lấy lịch sử chat
  useEffect(() => {
    if (isOpen && user) {
      fetchChatHistory();
    }
  }, [isOpen, user]);

  const fetchChatHistory = async () => {
    try {
      const response = await api.get('/messages/my-chats');
      if (response.data.success) {
        setMessages(response.data.messages);
        const unread = response.data.messages.filter(m => !m.isRead && m.senderRole === 'admin').length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Fetch chat history error:', error);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    
    try {
      const response = await api.post('/messages/support', { message: userMessage });
      if (response.data.success) {
        setMessages(prev => [...prev, {
          id: response.data.data._id,
          message: userMessage,
          senderRole: user.role,
          createdAt: new Date(),
          isRead: false
        }]);
      }
    } catch (error) {
      console.error('Send message error:', error);
      alert('Gửi tin nhắn thất bại. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  if (!isOpen) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
    >
      <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  );
}

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
          <span className="text-white font-semibold">Hỗ trợ trực tuyến</span>
          <span className="text-xs bg-green-400 px-2 py-0.5 rounded-full">Online</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-lg p-1 transition">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Chưa có tin nhắn nào</p>
            <p className="text-sm text-gray-400 mt-1">Hãy gửi tin nhắn để được hỗ trợ</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.senderRole === 'admin' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.senderRole === 'admin' 
                ? 'bg-white text-gray-700 rounded-bl-none shadow-sm border border-gray-100'
                : 'bg-green-500 text-white rounded-br-none'
            }`}>
              {msg.senderRole === 'admin' && (
                <div className="flex items-center gap-1 mb-1">
                  <UserIcon className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600 font-medium">Hỗ trợ</span>
                </div>
              )}
              <p className="text-sm">{msg.message}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs ${msg.senderRole === 'admin' ? 'text-gray-400' : 'text-green-100'}`}>
                <span>{formatTime(msg.createdAt)}</span>
                {msg.senderRole !== 'admin' && (
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
            placeholder="Nhập tin nhắn hỗ trợ..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Phản hồi trong vòng 24h | Hotline: 1900 1234
        </p>
      </div>
    </div>
  );
};

export default SupportChat;