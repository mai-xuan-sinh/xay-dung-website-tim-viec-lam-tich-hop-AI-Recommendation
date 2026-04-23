// backend/src/services/aiChatbot.service.js
const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

// Lưu trữ lịch sử hội thoại tạm thời (trong thực tế nên dùng Redis)
const conversationHistory = new Map();

/**
 * Phân tích kỹ năng của user và đưa ra nhận xét
 */
const analyzeUserSkills = (userSkills, allJobs) => {
  if (!userSkills || userSkills.length === 0) {
    return {
      hasSkills: false,
      message: "Bạn chưa thêm kỹ năng nào vào hồ sơ. Hãy thêm kỹ năng để nhận gợi ý việc làm chính xác hơn! 📝",
      suggestions: ["React", "JavaScript", "Python", "Giao tiếp", "Làm việc nhóm"]
    };
  }

  // Đếm số lượng job yêu cầu từng kỹ năng
  const skillDemand = {};
  allJobs.forEach(job => {
    job.skills?.forEach(skill => {
      const normalizedSkill = skill.toLowerCase();
      skillDemand[normalizedSkill] = (skillDemand[normalizedSkill] || 0) + 1;
    });
  });

  // Phân tích kỹ năng của user
  const userSkillsLower = userSkills.map(s => s.toLowerCase());
  const strongSkills = [];
  const weakSkills = [];
  const missingSkills = [];

  userSkillsLower.forEach(skill => {
    const demand = skillDemand[skill] || 0;
    if (demand > 10) {
      strongSkills.push({ skill, demand });
    } else if (demand < 3) {
      weakSkills.push({ skill, demand });
    }
  });

  // Tìm kỹ năng đang hot mà user chưa có
  const topSkills = Object.entries(skillDemand)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  topSkills.forEach(([skill, demand]) => {
    if (!userSkillsLower.includes(skill)) {
      missingSkills.push({ skill, demand });
    }
  });

  return {
    hasSkills: true,
    strongSkills,
    weakSkills,
    missingSkills,
    message: generateSkillAnalysisMessage(strongSkills, weakSkills, missingSkills)
  };
};

/**
 * Tạo thông điệp phân tích kỹ năng
 */
const generateSkillAnalysisMessage = (strongSkills, weakSkills, missingSkills) => {
  let message = "📊 **PHÂN TÍCH KỸ NĂNG CỦA BẠN**\n\n";
  
  if (strongSkills.length > 0) {
    message += "✅ **Kỹ năng mạnh:**\n";
    strongSkills.forEach(s => {
      message += `   • ${s.skill} (xuất hiện trong ${s.demand}+ tin tuyển dụng)\n`;
    });
    message += "\n";
  }
  
  if (weakSkills.length > 0) {
    message += "⚠️ **Kỹ năng cần cải thiện:**\n";
    weakSkills.forEach(s => {
      message += `   • ${s.skill} (chỉ có ${s.demand} tin yêu cầu)\n`;
    });
    message += "\n";
  }
  
  if (missingSkills.length > 0) {
    message += "💡 **Kỹ năng nên học thêm:**\n";
    missingSkills.forEach(s => {
      message += `   • ${s.skill} (${s.demand}+ tin tuyển dụng đang cần)\n`;
    });
    message += "\n";
  }
  
  message += "🎯 **Lời khuyên:** Hãy tập trung phát triển các kỹ năng đang được thị trường săn đón để tăng cơ hội việc làm!";
  
  return message;
};

/**
 * Phân tích CV/Profile của user
 */
const analyzeUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) return null;
  
  const analysis = {
    completeness: 0,
    missingFields: [],
    suggestions: []
  };
  
  // Kiểm tra thông tin cơ bản
  if (!user.phone) analysis.missingFields.push("Số điện thoại");
  if (!user.avatar) analysis.missingFields.push("Ảnh đại diện");
  if (!user.name) analysis.missingFields.push("Họ tên");
  
  // Kiểm tra kinh nghiệm
  if (!user.experience || user.experience.length === 0) {
    analysis.missingFields.push("Kinh nghiệm làm việc");
    analysis.suggestions.push("Thêm kinh nghiệm làm việc để tăng độ tin cậy với nhà tuyển dụng");
  } else {
    const hasCurrentJob = user.experience.some(exp => exp.isCurrent);
    if (!hasCurrentJob) {
      analysis.suggestions.push("Thêm công việc hiện tại để thể hiện sự chuyên nghiệp");
    }
  }
  
  // Kiểm tra học vấn
  if (!user.education || user.education.length === 0) {
    analysis.missingFields.push("Học vấn");
    analysis.suggestions.push("Thêm thông tin học vấn để nhà tuyển dụng đánh giá đúng năng lực");
  }
  
  // Kiểm tra kỹ năng
  if (!user.skills || user.skills.length === 0) {
    analysis.missingFields.push("Kỹ năng");
    analysis.suggestions.push("Thêm kỹ năng để AI có thể gợi ý việc làm phù hợp");
  } else if (user.skills.length < 3) {
    analysis.suggestions.push("Thêm nhiều kỹ năng hơn để tăng cơ hội trúng tuyển");
  }
  
  // Tính độ hoàn thiện
  const totalFields = 6; // name, phone, avatar, skills, experience, education
  const filledFields = totalFields - analysis.missingFields.length;
  analysis.completeness = Math.round((filledFields / totalFields) * 100);
  
  return analysis;
};

/**
 * Đánh giá cơ hội việc làm dựa trên profile user
 */
const evaluateJobOpportunity = async (userId) => {
  const user = await User.findById(userId);
  if (!user || !user.skills || user.skills.length === 0) {
    return {
      score: 0,
      message: "Chưa đủ thông tin để đánh giá. Hãy thêm kỹ năng vào hồ sơ của bạn! 📝"
    };
  }
  
  const jobs = await Job.find({ status: 'active' }).limit(50);
  let totalMatchScore = 0;
  let suitableJobs = [];
  
  for (const job of jobs) {
    let matchScore = 0;
    const commonSkills = job.skills?.filter(skill => 
      user.skills.some(us => us.toLowerCase() === skill.toLowerCase())
    ).length || 0;
    
    matchScore = (commonSkills / Math.max(job.skills?.length || 1, user.skills.length)) * 100;
    
    if (matchScore >= 50) {
      suitableJobs.push({ job, matchScore });
    }
    totalMatchScore += matchScore;
  }
  
  const avgMatchScore = jobs.length > 0 ? Math.round(totalMatchScore / jobs.length) : 0;
  
  let evaluation = "";
  if (avgMatchScore >= 70) {
    evaluation = "🎉 **Cơ hội rất tốt!** Kỹ năng của bạn rất phù hợp với thị trường. Bạn có khả năng cao sẽ tìm được việc làm ưng ý.";
  } else if (avgMatchScore >= 50) {
    evaluation = "👍 **Cơ hội khá tốt!** Bạn có nền tảng vững chắc. Hãy tham khảo gợi ý cải thiện bên dưới để tăng cơ hội.";
  } else if (avgMatchScore >= 30) {
    evaluation = "📈 **Còn cần cố gắng!** Thị trường có nhiều cơ hội nhưng bạn cần nâng cao kỹ năng. Xem gợi ý cải thiện bên dưới.";
  } else {
    evaluation = "🌱 **Bắt đầu là tốt rồi!** Hãy thêm kỹ năng và kinh nghiệm vào hồ sơ. Tôi sẽ gợi ý những việc làm phù hợp với trình độ của bạn.";
  }
  
  return {
    score: avgMatchScore,
    suitableJobsCount: suitableJobs.length,
    evaluation,
    topSuitableJobs: suitableJobs.slice(0, 3).map(s => ({
      title: s.job.title,
      company: s.job.company,
      matchScore: Math.round(s.matchScore)
    }))
  };
};

/**
 * Tư vấn viết CV
 */
const getCVAdvice = () => {
  return {
    title: "📄 **HƯỚNG DẪN VIẾT CV CHUYÊN NGHIỆP**",
    sections: [
      {
        title: "1. Thông tin cá nhân",
        advice: "✓ Họ tên rõ ràng, số điện thoại, email chuyên nghiệp\n✓ Địa chỉ, link LinkedIn/GitHub (nếu có)\n✓ Ảnh thẻ lịch sự, chuyên nghiệp"
      },
      {
        title: "2. Tóm tắt bản thân",
        advice: "✓ 2-3 câu giới thiệu về bản thân và mục tiêu nghề nghiệp\n✓ Nêu bật điểm mạnh và giá trị bạn mang lại\n✓ Không dài quá 100 từ"
      },
      {
        title: "3. Kinh nghiệm làm việc",
        advice: "✓ Liệt kê theo thứ tự thời gian (mới nhất lên đầu)\n✓ Mô tả cụ thể thành tích, trách nhiệm\n✓ Sử dụng số liệu, % để chứng minh hiệu quả"
      },
      {
        title: "4. Kỹ năng",
        advice: "✓ Phân loại: Kỹ năng chuyên môn, kỹ năng mềm, ngoại ngữ\n✓ Chỉ liệt kê kỹ năng bạn thực sự có\n✓ Ưu tiên kỹ năng liên quan đến công việc ứng tuyển"
      },
      {
        title: "5. Học vấn & Chứng chỉ",
        advice: "✓ Bằng cấp, chứng chỉ liên quan đến công việc\n✓ GPA nếu cao (trên 3.0/4.0)\n✓ Các khóa học online (Coursera, Udemy...) nếu có"
      }
    ],
    tips: [
      "💡 CV nên dài 1-2 trang, không quá dài",
      "💡 Sử dụng font chữ chuyên nghiệp (Arial, Times New Roman, Calibri)",
      "💡 Kiểm tra lỗi chính tả trước khi gửi",
      "💡 Tùy chỉnh CV theo từng công việc ứng tuyển",
      "💡 Sử dụng mẫu CV có sẵn trên hệ thống của chúng tôi"
    ]
  };
};

/**
 * Tư vấn phỏng vấn
 */
const getInterviewAdvice = () => {
  return {
    title: "🎯 **BÍ QUYẾT PHỎNG VẤN THÀNH CÔNG**",
    tips: [
      "📌 **Trước phỏng vấn:**",
      "   • Nghiên cứu kỹ về công ty, văn hóa doanh nghiệp",
      "   • Đọc lại mô tả công việc, chuẩn bị câu hỏi",
      "   • Chuẩn bị trang phục lịch sự, phù hợp",
      "   • Đến sớm 10-15 phút",
      "",
      "📌 **Trong phỏng vấn:**",
      "   • Tự tin, giao tiếp bằng mắt với nhà tuyển dụng",
      "   • Lắng nghe câu hỏi kỹ trước khi trả lời",
      "   • Sử dụng phương pháp STAR để trả lời: Situation (Tình huống), Task (Nhiệm vụ), Action (Hành động), Result (Kết quả)",
      "   • Đặt câu hỏi thông minh về công ty và vị trí",
      "",
      "📌 **Sau phỏng vấn:**",
      "   • Gửi email cảm ơn trong vòng 24 giờ",
      "   • Theo dõi kết quả phỏng vấn",
      "   • Rút kinh nghiệm cho lần phỏng vấn sau"
    ],
    commonQuestions: [
      "❓ Hãy giới thiệu về bản thân bạn",
      "❓ Tại sao bạn muốn làm việc tại công ty chúng tôi?",
      "❓ Điểm mạnh và điểm yếu của bạn là gì?",
      "❓ Bạn thấy mình phù hợp với vị trí này như thế nào?",
      "❓ Mức lương bạn mong muốn là bao nhiêu?"
    ]
  };
};

/**
 * Xử lý tin nhắn từ user
 */
const processUserMessage = async (message, userId, role, conversationId) => {
  const lowerMsg = message.toLowerCase();
  
  // Lấy lịch sử hội thoại
  let history = conversationHistory.get(conversationId) || [];
  
  // Phân tích ý định
  if (lowerMsg.includes('phân tích') || lowerMsg.includes('kỹ năng') && lowerMsg.includes('của tôi')) {
    const user = await User.findById(userId);
    const allJobs = await Job.find({ status: 'active' });
    const analysis = analyzeUserSkills(user?.skills || [], allJobs);
    return analysis.message;
  }
  
  if (lowerMsg.includes('đánh giá hồ sơ') || lowerMsg.includes('profile')) {
    const analysis = await analyzeUserProfile(userId);
    if (!analysis) return "Không tìm thấy hồ sơ của bạn. Hãy cập nhật thông tin cá nhân trước nhé!";
    
    return `📊 **ĐÁNH GIÁ HỒ SƠ CỦA BẠN**\n\n✅ Độ hoàn thiện: ${analysis.completeness}%\n\n⚠️ **Thiếu thông tin:**\n${analysis.missingFields.map(f => `   • ${f}`).join('\n')}\n\n💡 **Gợi ý cải thiện:**\n${analysis.suggestions.map(s => `   • ${s}`).join('\n')}`;
  }
  
  if (lowerMsg.includes('cơ hội việc làm') || lowerMsg.includes('đánh giá cơ hội')) {
    const opportunity = await evaluateJobOpportunity(userId);
    let response = `🎯 **ĐÁNH GIÁ CƠ HỘI VIỆC LÀM**\n\n📊 Điểm phù hợp: ${opportunity.score}%\n\n${opportunity.evaluation}\n\n`;
    
    if (opportunity.suitableJobsCount > 0) {
      response += `\n📌 **Top ${opportunity.topSuitableJobs.length} việc làm phù hợp nhất:**\n`;
      opportunity.topSuitableJobs.forEach((job, idx) => {
        response += `${idx + 1}. **${job.title}** tại ${job.company} (${job.matchScore}% phù hợp)\n`;
      });
      response += `\n👉 Tổng cộng có ${opportunity.suitableJobsCount} việc làm phù hợp với bạn!`;
    }
    return response;
  }
  
  if (lowerMsg.includes('cv') || lowerMsg.includes('hồ sơ xin việc')) {
    const advice = getCVAdvice();
    return `${advice.title}\n\n${advice.sections.map(s => `${s.title}\n${s.advice}`).join('\n\n')}\n\n✨ **MẸO NHỎ:**\n${advice.tips.join('\n')}`;
  }
  
  if (lowerMsg.includes('phỏng vấn') || lowerMsg.includes('interview')) {
    const advice = getInterviewAdvice();
    return `${advice.title}\n\n${advice.tips.join('\n')}\n\n📝 **CÂU HỎI THƯỜNG GẶP:**\n${advice.commonQuestions.join('\n')}`;
  }
  
  if (lowerMsg.includes('gợi ý việc làm') || lowerMsg.includes('tìm việc')) {
    const user = await User.findById(userId);
    if (!user?.skills || user.skills.length === 0) {
      return "🔍 Bạn chưa thêm kỹ năng vào hồ sơ. Hãy vào **Trang cá nhân → Kỹ năng** để thêm kỹ năng, tôi sẽ gợi ý việc làm phù hợp cho bạn!";
    }
    
    const jobs = await Job.find({ 
      status: 'active',
      skills: { $in: user.skills.map(s => new RegExp(s, 'i')) }
    }).limit(5);
    
    if (jobs.length === 0) {
      return "😅 Rất tiếc, hiện tại chưa có việc làm phù hợp với kỹ năng của bạn. Hãy thử cập nhật thêm kỹ năng khác hoặc thử lại sau!";
    }
    
    let response = "🎯 **GỢI Ý VIỆC LÀM DÀNH CHO BẠN**\n\n";
    jobs.forEach((job, idx) => {
      response += `${idx + 1}. **${job.title}**\n   📍 ${job.company} - ${job.location}\n   💰 ${job.salary}\n   🔥 Yêu cầu: ${job.skills?.slice(0, 3).join(', ')}${job.skills?.length > 3 ? '...' : ''}\n\n`;
    });
    response += "👉 Nhấn vào tên việc làm để xem chi tiết và ứng tuyển!";
    return response;
  }
  
  // Lưu lịch sử hội thoại
  history.push({ role: 'user', content: message, timestamp: new Date() });
  conversationHistory.set(conversationId, history.slice(-10)); // Chỉ lưu 10 tin nhắn cuối
  
  // Trả lời thông thường
  return getDefaultResponse(message, role);
};

/**
 * Trả lời mặc định
 */
const getDefaultResponse = (message, role) => {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.includes('xin chào') || lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return "Xin chào! Tôi là trợ lý AI của ĐANANG WORK. Tôi có thể:\n\n🔍 **Gợi ý việc làm** phù hợp với kỹ năng của bạn\n📊 **Phân tích kỹ năng** và đưa ra nhận xét\n📄 **Tư vấn viết CV** chuyên nghiệp\n🎯 **Hướng dẫn phỏng vấn** thành công\n📈 **Đánh giá cơ hội** việc làm của bạn\n\nBạn cần tôi giúp gì hôm nay? 😊";
  }
  
  if (lowerMsg.includes('cảm ơn')) {
    return "Rất vui được giúp bạn! Nếu cần thêm hỗ trợ, hãy gọi cho tôi bất cứ lúc nào. Chúc bạn thành công! 💪";
  }
  
  if (role === 'hr') {
    return "Xin chào! Tôi là trợ lý AI dành cho Nhà tuyển dụng. Tôi có thể giúp bạn:\n\n📢 **Viết tin tuyển dụng** hấp dẫn\n👥 **Tìm kiếm ứng viên** phù hợp\n📊 **Phân tích thị trường** tuyển dụng\n💡 **Mẹo tối ưu** quy trình HR\n\nBạn cần tôi hỗ trợ gì?";
  }
  
  if (role === 'admin') {
    return "Xin chào Quản trị viên! Tôi có thể giúp bạn:\n\n📊 **Xem thống kê** hệ thống\n✅ **Duyệt tin tuyển dụng** chờ\n🏢 **Duyệt công ty** mới\n👥 **Quản lý người dùng**\n📈 **Phân tích dữ liệu** tuyển dụng\n\nBạn muốn kiểm tra thông tin gì?";
  }
  
  return "Tôi có thể giúp gì cho bạn hôm nay? Hãy thử hỏi tôi về:\n• Gợi ý việc làm\n• Phân tích kỹ năng\n• Đánh giá hồ sơ\n• Tư vấn CV/phỏng vấn\n• Cơ hội việc làm của bạn";
};

module.exports = {
  processUserMessage,
  analyzeUserSkills,
  analyzeUserProfile,
  evaluateJobOpportunity,
  getCVAdvice,
  getInterviewAdvice
};