// backend/routes/chat.routes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

// Hàm xử lý tin nhắn thông minh
const getSmartResponse = async (message, userId, userRole, userName) => {
  const lowerMsg = message.toLowerCase().trim();
  
  // Lấy thông tin user
  const user = await User.findById(userId);
  
  // ========== CHÀO HỎI ==========
  if (lowerMsg.match(/^(chào|hi|hello|xin chào|hey)$/i)) {
    const greetings = [
      `Xin chào ${userName || 'bạn'}! 👋 Rất vui được gặp bạn! Tôi là trợ lý AI của ĐANANG WORK. Hôm nay tôi có thể giúp gì cho bạn?`,
      `Chào ${userName || 'bạn'}! 😊 Tôi có thể giúp bạn tìm việc, tư vấn CV, hay giải đáp thắc mắc gì không?`,
      `Hello ${userName || 'bạn'}! 🌟 Chúc bạn một ngày tốt lành! Bạn cần tôi hỗ trợ gì hôm nay?`
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // ========== GIỚI THIỆU BẢN THÂN ==========
  if (lowerMsg.match(/bạn là ai|giới thiệu|bạn có thể làm gì/i)) {
    return `🤖 **Tôi là AI Trợ lý thông minh của ĐANANG WORK!**

Tôi có thể giúp bạn:

🔍 **Tìm kiếm việc làm** - Gợi ý việc làm phù hợp với kỹ năng của bạn
📊 **Phân tích kỹ năng** - Đánh giá điểm mạnh, yếu của bạn
📄 **Tư vấn viết CV** - Hướng dẫn viết CV chuyên nghiệp
🎯 **Mẹo phỏng vấn** - Bí quyết vượt qua phỏng vấn
📝 **Đánh giá hồ sơ** - Nhận xét và gợi ý cải thiện hồ sơ

Bạn muốn tôi giúp gì? Hãy thử hỏi tôi nhé! 😊`;
  }
  
  // ========== GỢI Ý VIỆC LÀM ==========
  if (lowerMsg.includes('gợi ý việc làm') || lowerMsg.includes('tìm việc') || lowerMsg.includes('việc làm cho tôi')) {
    if (!user?.skills || user.skills.length === 0) {
      return `🔍 **Bạn chưa thêm kỹ năng vào hồ sơ!**

Để tôi có thể gợi ý việc làm phù hợp, bạn vui lòng:
1️⃣ Vào **Trang cá nhân** → **Kỹ năng**
2️⃣ Thêm các kỹ năng bạn có (VD: React, JavaScript, Giao tiếp...)

Sau đó quay lại hỏi tôi nhé! 💪`;
    }
    
    const jobs = await Job.find({ 
      status: 'active',
      skills: { $in: user.skills.map(s => new RegExp(s, 'i')) }
    }).limit(5);
    
    if (jobs.length === 0) {
      return `😅 **Rất tiếc!** Hiện tại chưa có việc làm phù hợp với kỹ năng ${user.skills.join(', ')} của bạn.

💡 **Gợi ý:** Hãy thử học thêm các kỹ năng đang hot như: React, Python, Node.js, hoặc thử tìm kiếm với từ khóa khác nhé!`;
    }
    
    let response = `🎯 **GỢI Ý VIỆC LÀM DÀNH CHO BẠN**\n\n`;
    response += `Dựa trên kỹ năng **${user.skills.slice(0, 3).join(', ')}**${user.skills.length > 3 ? '...' : ''} của bạn, tôi tìm thấy:\n\n`;
    
    jobs.forEach((job, idx) => {
      response += `${idx + 1}. **${job.title}**\n`;
      response += `   📍 ${job.company} - ${job.location}\n`;
      response += `   💰 ${job.salary}\n`;
      response += `   🔥 Kỹ năng: ${job.skills?.slice(0, 3).join(', ')}${job.skills?.length > 3 ? '...' : ''}\n\n`;
    });
    
    response += `👉 **Lời khuyên:** Hãy nhấp vào tên việc làm để xem chi tiết và ứng tuyển ngay! Chúc bạn may mắn! 🍀`;
    return response;
  }
  
  // ========== PHÂN TÍCH KỸ NĂNG ==========
  if (lowerMsg.includes('phân tích kỹ năng') || lowerMsg.includes('đánh giá kỹ năng')) {
    if (!user?.skills || user.skills.length === 0) {
      return `📊 **Bạn chưa có kỹ năng nào trong hồ sơ!**

Hãy vào **Trang cá nhân** → **Kỹ năng** để thêm kỹ năng của bạn. Tôi sẽ phân tích và đưa ra nhận xét chi tiết!`;
    }
    
    const allJobs = await Job.find({ status: 'active' });
    const skillDemand = {};
    
    allJobs.forEach(job => {
      job.skills?.forEach(skill => {
        const normalized = skill.toLowerCase();
        skillDemand[normalized] = (skillDemand[normalized] || 0) + 1;
      });
    });
    
    const strongSkills = [];
    const weakSkills = [];
    
    user.skills.forEach(skill => {
      const demand = skillDemand[skill.toLowerCase()] || 0;
      if (demand >= 10) {
        strongSkills.push({ skill, demand });
      } else if (demand < 3) {
        weakSkills.push({ skill, demand });
      }
    });
    
    let response = `📊 **PHÂN TÍCH KỸ NĂNG CỦA ${user.name?.toUpperCase()}**\n\n`;
    
    if (strongSkills.length > 0) {
      response += `✅ **Kỹ năng mạnh (đang hot trên thị trường):**\n`;
      strongSkills.forEach(s => {
        response += `   • ${s.skill} - ${s.demand}+ tin tuyển dụng đang cần\n`;
      });
      response += `\n`;
    }
    
    if (weakSkills.length > 0) {
      response += `⚠️ **Kỹ năng cần cải thiện (ít được yêu cầu):**\n`;
      weakSkills.forEach(s => {
        response += `   • ${s.skill} - chỉ ${s.demand} tin yêu cầu\n`;
      });
      response += `\n`;
    }
    
    response += `💡 **Lời khuyên:** Hãy tập trung phát triển các kỹ năng đang được thị trường săn đón để tăng cơ hội việc làm! 🚀`;
    return response;
  }
  
  // ========== TƯ VẤN CV ==========
  if (lowerMsg.includes('cv') || lowerMsg.includes('viết cv') || lowerMsg.includes('hồ sơ xin việc')) {
    return `📄 **HƯỚNG DẪN VIẾT CV CHUYÊN NGHIỆP**

**1. Thông tin cá nhân**
✓ Họ tên, số điện thoại, email chuyên nghiệp
✓ Địa chỉ, LinkedIn/GitHub (nếu có)

**2. Mục tiêu nghề nghiệp**
✓ 2-3 câu ngắn gọn về định hướng của bạn

**3. Kinh nghiệm làm việc**
✓ Liệt kê từ mới nhất đến cũ nhất
✓ Mô tả thành tích cụ thể bằng số liệu

**4. Kỹ năng**
✓ Chia thành: Chuyên môn, Kỹ năng mềm, Ngoại ngữ

**5. Học vấn & Chứng chỉ**
✓ Bằng cấp, chứng chỉ liên quan

✨ **Mẹo:** Sử dụng công cụ **Tạo CV** trên hệ thống để có mẫu CV đẹp và chuyên nghiệp!`;
  }
  
  // ========== MẸO PHỎNG VẤN ==========
  if (lowerMsg.includes('phỏng vấn') || lowerMsg.includes('interview')) {
    return `🎯 **BÍ QUYẾT PHỎNG VẤN THÀNH CÔNG**

**📌 Trước phỏng vấn:**
• Nghiên cứu kỹ về công ty và vị trí
• Chuẩn bị câu trả lời cho câu hỏi thường gặp
• Ăn mặc lịch sự, đến sớm 10-15 phút

**📌 Trong phỏng vấn:**
• Tự tin, giao tiếp bằng mắt
• Lắng nghe kỹ trước khi trả lời
• Dùng phương pháp STAR để trả lời

**📌 Sau phỏng vấn:**
• Gửi email cảm ơn trong 24h
• Theo dõi kết quả

💪 Chúc bạn phỏng vấn thành công!`;
  }
  
  // ========== CẢM ƠN ==========
  if (lowerMsg.includes('cảm ơn') || lowerMsg.includes('thank')) {
    const thanks = [
      `Rất vui được giúp bạn! ${userName || 'Bạn'} có cần thêm gì nữa không? 😊`,
      `Không có gì! Chúc ${userName || 'bạn'} thành công nhé! 🌟`,
      `Cảm ơn ${userName || 'bạn'} đã tin tưởng! Hãy gọi tôi khi cần hỗ trợ nhé! 💪`
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }
  
  // ========== HỎI THĂM ==========
  if (lowerMsg.match(/bạn khỏe không|dạo này thế nào/i)) {
    return `Cảm ơn ${userName || 'bạn'} đã hỏi thăm! Tôi vẫn khỏe và luôn sẵn sàng giúp đỡ bạn. Còn bạn thì sao? Công việc tìm việc thế nào rồi? 😊`;
  }
  
  // ========== CHÚC NGỦ ==========
  if (lowerMsg.includes('chúc ngủ') || lowerMsg.includes('ngủ ngon')) {
    return `Chúc ${userName || 'bạn'} ngủ ngon và có những giấc mơ đẹp! 😴🌙 Ngày mai tôi vẫn ở đây để giúp bạn nhé!`;
  }
  
  // ========== DEFAULT - TRẢ LỜI THÔNG MINH ==========
  return `🤔 **Tôi chưa hiểu rõ câu hỏi của bạn lắm.**

${userName || 'Bạn'} có thể thử hỏi tôi những câu sau:

🔍 "Gợi ý việc làm cho tôi"
📊 "Phân tích kỹ năng của tôi"
📄 "Hướng dẫn viết CV"
🎯 "Bí quyết phỏng vấn"
📝 "Đánh giá hồ sơ của tôi"

Hoặc bạn có thể hỏi tôi bất cứ điều gì về trang web ĐANANG WORK! 😊`;
};

// API Endpoint
router.post('/send', protect, async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;
    const userName = req.user.name;
    
    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập tin nhắn' 
      });
    }
    
    const response = await getSmartResponse(message, userId, userRole, userName);
    
    res.json({
      success: true,
      response
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau!' 
    });
  }
});

module.exports = router;