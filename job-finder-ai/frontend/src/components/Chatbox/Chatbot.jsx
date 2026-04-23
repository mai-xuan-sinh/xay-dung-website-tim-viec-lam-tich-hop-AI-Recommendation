// frontend/src/components/Chatbot/Chatbot.jsx
import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon, PaperAirplaneIcon, SparklesIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import aiChatbotIcon from '../../assets/ai-chatbot.webp';

const Chatbot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Xin chào! Tôi là trợ lý AI của ĐANANG WORK. Tôi có thể giúp gì cho bạn? 😊' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);
    
    try {
      const response = await api.post('/chat/send', { message: userMessage });
      setMessages(prev => [...prev, { type: 'bot', text: response.data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau! 🙏' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  // Câu hỏi gợi ý theo role
  const getQuickQuestions = () => {
    if (user?.role === 'hr') {
      return [
        { text: '👥 Lọc ứng viên', value: 'Lọc ứng viên có điểm quiz cao' },
        { text: '📝 Gợi ý Quiz', value: 'Gợi ý câu hỏi Quiz cho ngành IT' },
        { text: '📊 Đánh giá tin', value: 'Đánh giá bài đăng tin tuyển dụng của tôi' },
        { text: '⭐ Ứng viên tiềm năng', value: 'Đánh giá ứng viên tiềm năng' }
      ];
    }
    
    if (user?.role === 'admin') {
      return [
        { text: '💰 Doanh thu', value: 'Tính tổng doanh thu' },
        { text: '📅 Tin hết hạn', value: 'Kiểm tra tin tuyển dụng hết hạn' },
        { text: '📊 Thống kê', value: 'Thống kê tổng quan hệ thống' }
      ];
    }
    
    return [
      { text: '🔍 Gợi ý việc làm', value: 'Gợi ý việc làm cho tôi' },
      { text: '📊 Phân tích kỹ năng', value: 'Phân tích kỹ năng của tôi' },
      { text: '📄 Tư vấn CV', value: 'Hướng dẫn viết CV chuyên nghiệp' },
      { text: '🎯 Mẹo phỏng vấn', value: 'Bí quyết phỏng vấn thành công' }
    ];
  };

  const quickQuestions = getQuickQuestions();

  if (!isOpen) {
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 overflow-hidden bg-white p-1"
    >
      <img 
        src={aiChatbotIcon} 
        alt="AI Chatbot"
        className="w-full h-full object-cover rounded-full"
      />
    </button>
  );
}

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[450px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <SparklesIcon className="h-5 w-5 text-yellow-400" />
          </div>
          <span className="text-white font-semibold">AI Trợ lý thông minh</span>
          <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Beta</span>
          {user?.role === 'hr' && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">HR</span>}
          {user?.role === 'admin' && <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Admin</span>}
        </div>
        <button onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-lg p-1 transition">
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white text-gray-700 rounded-bl-none shadow-sm border border-gray-100'
            }`}>
              {msg.type === 'bot' && (
                <div className="flex items-center gap-1 mb-1">
                  <SparklesIcon className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-purple-500 font-medium">AI</span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick questions */}
      <div className="px-3 py-2 bg-gray-100 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
          <SparklesIcon className="h-3 w-3" />
          Câu hỏi gợi ý:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(q.value);
                setTimeout(() => sendMessage(), 100);
              }}
              className="px-3 py-1.5 bg-white rounded-full text-xs text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition whitespace-nowrap shadow-sm"
            >
              {q.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition disabled:opacity-50"
          >
            <PaperAirplaneIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;